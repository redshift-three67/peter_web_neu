import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
