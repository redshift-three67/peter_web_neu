import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generatorModule = await import(pathToFileURL(
  path.join(root, "scripts/build-url-matrix.mjs"),
).href);
const manifest = JSON.parse(await readFile(
  path.join(root, "content/wordpress/manifest.json"),
  "utf8",
));
const baselineRows = generatorModule.buildBaselineRows(manifest);

function matrixWith(index, overrides) {
  const rows = structuredClone(baselineRows);
  rows[index] = { ...rows[index], ...overrides };
  return rows;
}

function parseTestCsv(text) {
  const records = [];
  let record = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      record.push(cell);
      cell = "";
    } else if (char === "\n") {
      record.push(cell);
      records.push(record);
      record = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (quoted) throw new Error("unterminated CSV quote");
  if (cell !== "" || record.length > 0) {
    record.push(cell);
    records.push(record);
  }

  const [headers, ...rows] = records;
  return rows
    .filter((values) => values.some((value) => value !== ""))
    .map((values) => Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""]),
    ));
}

test("private migration evidence paths are ignored", async () => {
  const gitignore = await readFile(path.join(root, ".gitignore"), "utf8");
  for (const entry of [
    "data/private/gsc/",
    "data/private/plesk/",
    "data/private/wordpress-backup/",
  ]) {
    assert.match(gitignore, new RegExp(`^${entry.replaceAll("/", "\\/")}$`, "m"));
  }
});

test("CLI generates one conservative decision per manifest URL", async () => {
  const temp = await mkdtemp(path.join(tmpdir(), "rauch-url-matrix-"));
  const output = path.join(temp, "matrix.csv");

  try {
    const run = spawnSync(process.execPath, [
      path.join(root, "scripts/build-url-matrix.mjs"),
      "--output",
      output,
    ], { cwd: root, encoding: "utf8" });

    assert.equal(run.status, 0, run.stderr);
    assert.equal(existsSync(output), true);

    const parsed = parseTestCsv(await readFile(output, "utf8"));
    const manifest = JSON.parse(await readFile(
      path.join(root, "content/wordpress/manifest.json"),
      "utf8",
    ));

    assert.equal(parsed.length, 64);
    assert.equal(new Set(parsed.map((row) => row.old_url)).size, 64);
    assert.deepEqual(
      new Set(parsed.map((row) => row.old_url)),
      new Set(manifest.pages.map((page) => page.sourceUrl)),
    );
    assert.equal(parsed.filter((row) => row.decision === "keep_200_index").length, 5);
    assert.equal(parsed.filter((row) => row.decision === "temporary_noindex_review").length, 59);
    assert.equal(parsed.some((row) => row.decision === "merge_301"), false);
    assert.equal(parsed.some((row) => row.decision === "remove_410"), false);

    for (const row of parsed) {
      assert.equal(row.gsc_clicks, "unknown");
      assert.equal(row.gsc_impressions, "unknown");
      assert.equal(row.gsc_position, "unknown");
      assert.equal(row.approval_status, "pending");
      assert.equal(row.approved_by, "");
    }
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test("optional GSC CSV preserves real zero and missing evidence", () => {
  assert.equal(typeof generatorModule.parseGscPagesCsv, "function");
  const csv = [
    "Seite,Klicks,Impressionen,Position",
    '"https://rauch-heilpraktiker.de/",0,12,"4,5"',
    '"https://rauch-heilpraktiker.de/kontakt/?utm_source=test",,,',
  ].join("\n");

  const parsed = generatorModule.parseGscPagesCsv(csv);
  assert.deepEqual(parsed.get("/"), { clicks: 0, impressions: 12, position: 4.5 });
  assert.deepEqual(parsed.get("/kontakt"), {
    clicks: "unknown",
    impressions: "unknown",
    position: "unknown",
  });
});

test("GSC CSV rejects missing required page and metric headers", () => {
  assert.equal(typeof generatorModule.parseGscPagesCsv, "function");
  assert.throws(
    () => generatorModule.parseGscPagesCsv(
      "URL,Visits\nhttps://rauch-heilpraktiker.de/,1",
    ),
    /required GSC columns/i,
  );
});

test("CLI merges only matching in-scope GSC page evidence", async () => {
  const temp = await mkdtemp(path.join(tmpdir(), "rauch-url-matrix-gsc-"));
  const input = path.join(temp, "gsc-pages.csv");
  const output = path.join(temp, "matrix.csv");

  try {
    await writeFile(input, [
      "Page,Clicks,Impressions,Average position",
      "https://rauch-heilpraktiker.de/,0,12,4.5",
      "https://example.com/fremd/,99,999,1",
    ].join("\n"), "utf8");

    const run = spawnSync(process.execPath, [
      path.join(root, "scripts/build-url-matrix.mjs"),
      "--gsc-pages",
      input,
      "--output",
      output,
    ], { cwd: root, encoding: "utf8" });

    assert.equal(run.status, 0, run.stderr);
    const parsed = parseTestCsv(await readFile(output, "utf8"));
    const home = parsed.find((row) => row.old_path === "/");
    assert.equal(home.gsc_clicks, "0");
    assert.equal(home.gsc_impressions, "12");
    assert.equal(home.gsc_position, "4.5");
    assert.equal(home.evidence_status, "manifest_plus_gsc");
    assert.equal(
      parsed.filter((row) => row.evidence_status === "manifest_plus_gsc").length,
      1,
    );
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test("merge decisions require a target path", () => {
  const rows = matrixWith(1, {
    decision: "merge_301",
    target_path: "",
    target_http_status: "301",
  });
  assert.throws(() => generatorModule.validateMatrix(rows, manifest), /target_path/);
});

test("self redirects are rejected", () => {
  const rows = matrixWith(1, {
    decision: "merge_301",
    target_path: baselineRows[1].old_path,
    target_http_status: "301",
  });
  assert.throws(() => generatorModule.validateMatrix(rows, manifest), /self redirect/);
});

test("mass redirects to the root path are rejected", () => {
  const rows = matrixWith(1, {
    decision: "merge_301",
    target_path: "/",
    target_http_status: "301",
  });
  assert.throws(() => generatorModule.validateMatrix(rows, manifest), /root/);
});

test("remove decisions require a real approval identity", () => {
  const rows = matrixWith(1, {
    decision: "remove_410",
    target_http_status: "410",
  });
  assert.throws(() => generatorModule.validateMatrix(rows, manifest), /approved_by/);
});

test("pending noindex reviews remain non-deployable", () => {
  const rows = matrixWith(1, {
    decision: "temporary_noindex_review",
    approval_status: "approved",
    target_http_status: "200",
  });
  assert.throws(() => generatorModule.validateMatrix(rows, manifest), /pending review/);
});

test("redirect chains are rejected", () => {
  const rows = structuredClone(baselineRows);
  rows[1] = {
    ...rows[1],
    decision: "merge_301",
    target_path: rows[2].old_path,
    target_http_status: "301",
  };
  rows[2] = {
    ...rows[2],
    decision: "merge_301",
    target_path: rows[3].old_path,
    target_http_status: "301",
  };
  assert.throws(() => generatorModule.validateMatrix(rows, manifest), /chain or cycle/);
});

test("redirect cycles are rejected", () => {
  const rows = structuredClone(baselineRows);
  rows[1] = {
    ...rows[1],
    decision: "merge_301",
    target_path: rows[2].old_path,
    target_http_status: "301",
  };
  rows[2] = {
    ...rows[2],
    decision: "merge_301",
    target_path: rows[1].old_path,
    target_http_status: "301",
  };
  assert.throws(() => generatorModule.validateMatrix(rows, manifest), /chain or cycle/);
});

test("missing manifest-only evidence cannot be encoded as numeric zero", () => {
  const rows = matrixWith(1, { gsc_clicks: 0 });
  assert.throws(
    () => generatorModule.validateMatrix(rows, manifest),
    /missing evidence must remain unknown/,
  );
});
