# Task 2: Evidence-Based 64-URL Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deterministic, test-first 64-row migration matrix that preserves missing SEO evidence as `unknown` and blocks unapproved redirects or deindexing.

**Architecture:** A single dependency-free Node ESM module owns URL normalization, optional GSC CSV parsing, conservative row construction, matrix validation, CSV serialization, and the CLI. A companion Node test imports the real functions and invokes the real CLI; the committed CSV is a generated, reproducible artifact.

**Tech Stack:** Node.js 22, `node:test`, `node:assert/strict`, ESM, JSON, RFC-4180-compatible CSV, Git.

---

## File map

- Create `scripts/build-url-matrix.mjs`: pure transformation and validation functions plus a thin CLI.
- Create `scripts/build-url-matrix.test.mjs`: real manifest, generated CSV, optional GSC fixtures, and unsafe-decision tests.
- Create `docs/migration/url-migration-matrix.csv`: deterministic 64-row output.
- Modify `.gitignore`: protect the three private evidence directories.
- Modify `docs/relaunch-2026/00-MASTERPLAN.md`: record the structural gate separately from the pending SEO approval gate.
- Modify `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`: replace “matrix absent” with the exact provisional state.
- Modify `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json`: set `STAT-011` to `bestätigt mit Einschränkungen`; keep `STAT-012` unchanged.
- Modify `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`: mirror the `STAT-011` status.

### Task 1: Protect private evidence directories

**Files:**
- Modify: `.gitignore`
- Create: `scripts/build-url-matrix.test.mjs`

- [ ] **Step 1: Write the failing private-path test**

Create the test file with repository-root discovery and this first contract:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```text
node --test scripts/build-url-matrix.test.mjs
```

Expected: one failed test because all three private paths are absent from `.gitignore`.

- [ ] **Step 3: Add the minimal ignore entries**

Append exactly:

```gitignore
data/private/gsc/
data/private/plesk/
data/private/wordpress-backup/
```

- [ ] **Step 4: Run the test and verify GREEN**

Expected: 1/1 passing.

- [ ] **Step 5: Commit**

```text
git add .gitignore scripts/build-url-matrix.test.mjs
git commit -m "test: protect private migration evidence"
```

### Task 2: Generate the conservative 64-row baseline

**Files:**
- Create: `scripts/build-url-matrix.mjs`
- Modify: `scripts/build-url-matrix.test.mjs`
- Create: `docs/migration/url-migration-matrix.csv`

- [ ] **Step 1: Add the failing real-CLI baseline test**

Append imports for `existsSync`, `mkdtemp`, `readFile`, `rm`, `spawnSync`, and `tmpdir`. Invoke the missing CLI into a temporary output and assert:

```js
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
```

Define the test-only parser before the test:

```js
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
```

- [ ] **Step 2: Run the test and verify RED**

Expected: the private-path test passes; the CLI test fails with exit 1 because `scripts/build-url-matrix.mjs` does not exist.

- [ ] **Step 3: Implement the minimal generator and CLI**

Define and export these exact interfaces:

```js
export const MATRIX_COLUMNS = [
  "old_url", "old_path", "manifest_class", "manifest_status",
  "old_http_status", "old_canonical", "in_old_sitemap",
  "gsc_clicks", "gsc_impressions", "gsc_position", "backlinks",
  "business_value", "content_risk", "decision", "target_path",
  "target_http_status", "new_canonical", "in_new_sitemap", "owner",
  "approval_status", "approved_by", "evidence_status", "notes",
];

export function normalizePath(value) {
  const url = new URL(value, "https://rauch-heilpraktiker.de");
  const pathname = url.pathname.replace(/\/{2,}/g, "/");
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}

export function buildBaselineRows(manifest, gscByPath = new Map()) {
  return manifest.pages.map((page) => {
    const oldPath = normalizePath(page.sourceUrl);
    const gsc = gscByPath.get(oldPath);
    const keep = page.status === "mapped";
    return {
      old_url: page.sourceUrl,
      old_path: oldPath,
      manifest_class: page.class,
      manifest_status: page.status,
      old_http_status: "unknown",
      old_canonical: "unknown",
      in_old_sitemap: "unknown",
      gsc_clicks: gsc?.clicks ?? "unknown",
      gsc_impressions: gsc?.impressions ?? "unknown",
      gsc_position: gsc?.position ?? "unknown",
      backlinks: "unknown",
      business_value: "unknown",
      content_risk: "unknown",
      decision: keep ? "keep_200_index" : "temporary_noindex_review",
      target_path: keep ? oldPath : "",
      target_http_status: keep ? "200" : "pending",
      new_canonical: keep
        ? `https://rauch-heilpraktiker.de${oldPath === "/" ? "/" : oldPath}`
        : "unknown",
      in_new_sitemap: "pending",
      owner: "SEO / Product Owner",
      approval_status: "pending",
      approved_by: "",
      evidence_status: gsc ? "manifest_plus_gsc" : "manifest_only",
      notes: keep
        ? "Manifest status mapped; final SEO approval pending."
        : "Manifest status draft; blocked pending GSC and Product Owner review.",
    };
  });
}
```

Add these serializer and initial structural-validator functions:

```js
function escapeCsvCell(value) {
  const string = String(value ?? "");
  return /[",\r\n]/.test(string)
    ? `"${string.replaceAll('"', '""')}"`
    : string;
}

export function serializeCsv(rows) {
  const lines = [MATRIX_COLUMNS.join(",")];
  for (const row of rows) {
    lines.push(MATRIX_COLUMNS.map((column) => escapeCsvCell(row[column])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function validateMatrix(rows, manifest) {
  if (rows.length !== 64 || manifest.pages.length !== 64) {
    throw new Error(`expected exactly 64 rows, received ${rows.length}`);
  }
  const expectedUrls = new Set(manifest.pages.map((page) => page.sourceUrl));
  const urls = new Set(rows.map((row) => row.old_url));
  const paths = new Set(rows.map((row) => row.old_path));
  if (urls.size !== 64) throw new Error("old_url values must be unique");
  if (paths.size !== 64) throw new Error("old_path values must be unique");
  if ([...expectedUrls].some((url) => !urls.has(url))) {
    throw new Error("matrix URL set differs from manifest");
  }
  const allowed = new Set([
    "keep_200_index", "merge_301", "remove_410", "temporary_noindex_review",
  ]);
  for (const row of rows) {
    if (!allowed.has(row.decision)) throw new Error(`invalid decision: ${row.decision}`);
  }
  return Object.freeze({
    rows: rows.length,
    keep: rows.filter((row) => row.decision === "keep_200_index").length,
    review: rows.filter((row) => row.decision === "temporary_noindex_review").length,
    redirects: rows.filter((row) => row.decision === "merge_301").length,
    removals: rows.filter((row) => row.decision === "remove_410").length,
  });
}
```

Use these defaults and CLI functions:

```js
const defaults = {
  manifest: path.join(root, "content/wordpress/manifest.json"),
  output: path.join(root, "docs/migration/url-migration-matrix.csv"),
  gscPages: undefined,
};

function parseArgs(argv) {
  const options = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (!["--manifest", "--output", "--gsc-pages"].includes(flag)) {
      throw new Error(`unknown argument: ${flag}`);
    }
    const value = argv[index + 1];
    if (!value) throw new Error(`missing value for ${flag}`);
    if (flag === "--manifest") options.manifest = path.resolve(value);
    if (flag === "--output") options.output = path.resolve(value);
    if (flag === "--gsc-pages") options.gscPages = path.resolve(value);
    index += 1;
  }
  return options;
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.gscPages) {
    throw new Error("--gsc-pages is not available until the GSC parser contract is green");
  }
  const manifest = JSON.parse(await readFile(options.manifest, "utf8"));
  const rows = buildBaselineRows(manifest);
  const summary = validateMatrix(rows, manifest);
  await mkdir(path.dirname(options.output), { recursive: true });
  await writeFile(options.output, serializeCsv(rows), "utf8");
  process.stdout.write(`${JSON.stringify(summary)}\n`);
  return summary;
}
```

Import `readFile`, `mkdir`, and `writeFile` from `node:fs/promises`; `path` from `node:path`; `fileURLToPath` and `pathToFileURL` from `node:url`. Derive `root` from `import.meta.url`. The CLI writes only after `validateMatrix(rows, manifest)` returns without an exception. Use this direct-run guard:

```js
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
```

- [ ] **Step 4: Generate the committed matrix and verify GREEN**

Run:

```text
node scripts/build-url-matrix.mjs
node --test scripts/build-url-matrix.test.mjs
```

Expected: `docs/migration/url-migration-matrix.csv` exists; 2/2 tests pass; CLI summary reports 64 rows, 5 keep decisions, 59 pending reviews, 0 redirects, and 0 removals.

- [ ] **Step 5: Commit**

```text
git add scripts/build-url-matrix.mjs scripts/build-url-matrix.test.mjs docs/migration/url-migration-matrix.csv
git commit -m "feat: generate conservative URL migration baseline"
```

### Task 3: Import optional GSC page evidence safely

**Files:**
- Modify: `scripts/build-url-matrix.mjs`
- Modify: `scripts/build-url-matrix.test.mjs`

- [ ] **Step 1: Add failing GSC parser tests**

Create a temporary quoted CSV containing German headers and verify real zero versus missing values:

```js
const generatorModule = await import(pathToFileURL(
  path.join(root, "scripts/build-url-matrix.mjs"),
).href);

test("optional GSC CSV preserves real zero and missing evidence", async () => {
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
    () => generatorModule.parseGscPagesCsv("URL,Visits\nhttps://rauch-heilpraktiker.de/,1"),
    /required GSC columns/i,
  );
});
```

Also invoke the CLI with `--gsc-pages <fixture>` and assert only matching manifest rows change to `manifest_plus_gsc`.

- [ ] **Step 2: Run the focused tests and verify RED**

Expected: failures because `parseGscPagesCsv` is not exported and `--gsc-pages` is not implemented.

- [ ] **Step 3: Implement the parser**

Implement the parser with this exact state machine and header contract:

```js
export function parseCsv(text) {
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
  return records.filter((values) => values.some((value) => value !== ""));
}

const aliases = {
  page: ["page", "top_pages", "seite", "haufigste_seiten"],
  clicks: ["clicks", "klicks"],
  impressions: ["impressions", "impressionen"],
  position: ["position", "average_position", "durchschnittliche_position"],
};

function normalizeHeader(value) {
  return value
    .replace(/^\uFEFF/, "")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseMetric(value, label, integer = false) {
  const trimmed = value.trim();
  if (trimmed === "") return "unknown";
  if (!/^\d+(?:[.,]\d+)?$/.test(trimmed)) {
    throw new Error(`invalid ${label}: ${value}`);
  }
  const parsed = Number(trimmed.replace(",", "."));
  if (!Number.isFinite(parsed) || parsed < 0 || (integer && !Number.isInteger(parsed))) {
    throw new Error(`invalid ${label}: ${value}`);
  }
  return parsed;
}

export function parseGscPagesCsv(text) {
  const [headers, ...records] = parseCsv(text);
  if (!headers) throw new Error("required GSC columns are missing");
  const normalized = headers.map(normalizeHeader);
  const indexes = Object.fromEntries(Object.entries(aliases).map(([key, names]) => [
    key,
    normalized.findIndex((header) => names.includes(header)),
  ]));
  if (Object.values(indexes).some((index) => index < 0)) {
    throw new Error("required GSC columns are missing");
  }
  const result = new Map();
  for (const record of records) {
    const page = record[indexes.page]?.trim();
    if (!page) continue;
    const url = new URL(page);
    if (url.hostname.toLowerCase() !== "rauch-heilpraktiker.de") continue;
    const pathname = normalizePath(url.href);
    if (result.has(pathname)) throw new Error(`duplicate GSC page: ${pathname}`);
    result.set(pathname, {
      clicks: parseMetric(record[indexes.clicks] ?? "", "clicks", true),
      impressions: parseMetric(record[indexes.impressions] ?? "", "impressions", true),
      position: parseMetric(record[indexes.position] ?? "", "position"),
    });
  }
  return result;
}
```

Replace the temporary `--gsc-pages` rejection plus the following manifest/row declarations in `main()` with:

```js
const manifest = JSON.parse(await readFile(options.manifest, "utf8"));
const gscByPath = options.gscPages
  ? parseGscPagesCsv(await readFile(options.gscPages, "utf8"))
  : new Map();
const rows = buildBaselineRows(manifest, gscByPath);
```

Normalize headers with Unicode NFKD, remove combining marks, lowercase, and replace non-alphanumerics with `_`. `parseMetric()` returns `unknown` for blank cells, retains numeric zero, accepts a single decimal comma, and throws for negative or nonnumeric values. Ignore rows whose hostname is not `rauch-heilpraktiker.de`; reject duplicate normalized in-scope paths.

- [ ] **Step 4: Run focused and full tests**

Expected: all URL-matrix tests pass; the committed no-GSC matrix remains byte-identical after `node scripts/build-url-matrix.mjs`.

- [ ] **Step 5: Commit**

```text
git add scripts/build-url-matrix.mjs scripts/build-url-matrix.test.mjs
git commit -m "feat: ingest optional GSC page evidence"
```

### Task 4: Enforce redirect and deindexing safety

**Files:**
- Modify: `scripts/build-url-matrix.mjs`
- Modify: `scripts/build-url-matrix.test.mjs`

- [ ] **Step 1: Add failing table-driven validation tests**

Load the real manifest once and define a full-matrix mutation helper:

```js
const manifest = JSON.parse(await readFile(
  path.join(root, "content/wordpress/manifest.json"),
  "utf8",
));
const { buildBaselineRows, validateMatrix } = generatorModule;
const baselineRows = buildBaselineRows(manifest);

function matrixWith(index, overrides) {
  const rows = structuredClone(baselineRows);
  rows[index] = { ...rows[index], ...overrides };
  return rows;
}
```

Use cloned baseline rows and assert these exact violations throw:

```js
const unsafeCases = [
  ["missing redirect target", matrixWith(1, {
    decision: "merge_301", target_path: "", target_http_status: "301",
  }), /target_path/],
  ["self redirect", matrixWith(1, {
    decision: "merge_301",
    target_path: baselineRows[1].old_path,
    target_http_status: "301",
  }), /self redirect/],
  ["mass redirect to root", matrixWith(1, {
    decision: "merge_301", target_path: "/", target_http_status: "301",
  }), /root/],
  ["unapproved removal", matrixWith(1, {
    decision: "remove_410", target_http_status: "410",
  }), /approved_by/],
  ["deployable pending review", matrixWith(1, {
    decision: "temporary_noindex_review",
    approval_status: "approved",
    target_http_status: "200",
  }), /pending review/],
];

for (const [name, rows, pattern] of unsafeCases) {
  test(name, () => assert.throws(() => validateMatrix(rows, manifest), pattern));
}
```

Add the multi-row redirect fixtures explicitly:

```js
test("redirect chains are rejected", () => {
  const rows = structuredClone(baselineRows);
  rows[1] = { ...rows[1], decision: "merge_301", target_path: rows[2].old_path, target_http_status: "301" };
  rows[2] = { ...rows[2], decision: "merge_301", target_path: rows[3].old_path, target_http_status: "301" };
  assert.throws(() => validateMatrix(rows, manifest), /chain or cycle/);
});

test("redirect cycles are rejected", () => {
  const rows = structuredClone(baselineRows);
  rows[1] = { ...rows[1], decision: "merge_301", target_path: rows[2].old_path, target_http_status: "301" };
  rows[2] = { ...rows[2], decision: "merge_301", target_path: rows[1].old_path, target_http_status: "301" };
  assert.throws(() => validateMatrix(rows, manifest), /chain or cycle/);
});

```

- [ ] **Step 2: Run and verify RED**

Expected: every newly added unsafe fixture is accepted by the incomplete validator, so the assertions fail.

- [ ] **Step 3: Complete `validateMatrix()`**

Replace the initial validator with this complete safety contract:

```js
export function validateMatrix(rows, manifest) {
  if (rows.length !== 64 || manifest.pages.length !== 64) {
    throw new Error(`expected exactly 64 rows, received ${rows.length}`);
  }
  const expectedUrls = new Set(manifest.pages.map((page) => page.sourceUrl));
  const expectedPaths = new Set(manifest.pages.map((page) => normalizePath(page.sourceUrl)));
  const urls = new Set(rows.map((row) => row.old_url));
  const paths = new Set(rows.map((row) => row.old_path));
  if (urls.size !== 64) throw new Error("old_url values must be unique");
  if (paths.size !== 64) throw new Error("old_path values must be unique");
  if ([...expectedUrls].some((url) => !urls.has(url))) {
    throw new Error("matrix URL set differs from manifest");
  }
  if ([...expectedPaths].some((pathname) => !paths.has(pathname))) {
    throw new Error("matrix path set differs from manifest");
  }

  const allowed = new Set([
    "keep_200_index", "merge_301", "remove_410", "temporary_noindex_review",
  ]);
  for (const row of rows) {
    if (!allowed.has(row.decision)) throw new Error(`invalid decision: ${row.decision}`);
    if (row.evidence_status === "manifest_only") {
      for (const field of ["gsc_clicks", "gsc_impressions", "gsc_position"]) {
        if (row[field] !== "unknown") {
          throw new Error(`missing evidence must remain unknown: ${row.old_path} ${field}`);
        }
      }
    }
    if (row.decision === "keep_200_index") {
      if (row.target_path !== row.old_path || row.target_http_status !== "200") {
        throw new Error(`keep decision must retain its path with 200: ${row.old_path}`);
      }
    }
    if (row.decision === "merge_301") {
      if (!row.target_path?.startsWith("/")) {
        throw new Error(`merge_301 requires target_path: ${row.old_path}`);
      }
      if (normalizePath(row.target_path) !== row.target_path || /[?#]/.test(row.target_path)) {
        throw new Error(`invalid target_path: ${row.target_path}`);
      }
      if (row.target_path === row.old_path) throw new Error(`self redirect: ${row.old_path}`);
      if (row.target_path === "/" && row.old_path !== "/") {
        throw new Error(`mass redirect to root is forbidden: ${row.old_path}`);
      }
      if (row.target_http_status !== "301") {
        throw new Error(`merge_301 requires target_http_status 301: ${row.old_path}`);
      }
    }
    if (row.decision === "remove_410") {
      if (row.target_http_status !== "410"
        || row.approval_status !== "approved"
        || !row.approved_by.trim()) {
        throw new Error(`remove_410 requires approved_by: ${row.old_path}`);
      }
    }
    if (row.decision === "temporary_noindex_review") {
      if (row.approval_status !== "pending"
        || row.approved_by !== ""
        || row.target_path !== ""
        || row.target_http_status !== "pending") {
        throw new Error(`pending review must remain non-deployable: ${row.old_path}`);
      }
    }
  }

  const byPath = new Map(rows.map((row) => [row.old_path, row]));
  for (const row of rows.filter((candidate) => candidate.decision === "merge_301")) {
    const target = byPath.get(row.target_path);
    if (target?.decision === "merge_301") {
      throw new Error(`redirect chain or cycle: ${row.old_path} -> ${row.target_path}`);
    }
  }

return Object.freeze({
  rows: rows.length,
  keep: rows.filter((row) => row.decision === "keep_200_index").length,
  review: rows.filter((row) => row.decision === "temporary_noindex_review").length,
  redirects: rows.filter((row) => row.decision === "merge_301").length,
  removals: rows.filter((row) => row.decision === "remove_410").length,
});
```

- [ ] **Step 4: Run focused tests, generator, and byte-stability check**

Run the generator twice and compare the output hash. Expected: identical SHA-256 hashes and all focused tests passing.

- [ ] **Step 5: Commit**

```text
git add scripts/build-url-matrix.mjs scripts/build-url-matrix.test.mjs docs/migration/url-migration-matrix.csv
git commit -m "test: enforce URL migration safety invariants"
```

### Task 5: Synchronize truthful status documentation

**Files:**
- Modify: `docs/relaunch-2026/00-MASTERPLAN.md`
- Modify: `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json`
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`

- [ ] **Step 1: Update `STAT-011` without overstating readiness**

Set:

```json
"status": "bestätigt mit Einschränkungen"
```

Record the exact generated counts and test evidence. State that 59 rows remain `temporary_noindex_review`, no redirects/removals are authorized, and GSC/owner evidence is outstanding. Keep `STAT-012` unchanged at `derzeit nicht prüfbar`.

- [ ] **Step 2: Update Masterplan checkboxes**

Mark private ignores, RED/GREEN generator, 64-row structural checks, and quality gates complete. Add an unchecked Gate-B item requiring GSC and Product Owner approval before Task 5 can consume the matrix.

- [ ] **Step 3: Update the full report and Markdown matrix**

Replace statements that the matrix is absent with the exact provisional state. Do not describe the SEO migration itself as approved.

- [ ] **Step 4: Validate documentation**

Run:

```text
node -e "JSON.parse(require('fs').readFileSync('docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json','utf8'))"
rg -n "STAT-011|STAT-012|temporary_noindex_review|64" docs/relaunch-2026 docs/tiefenanalyse-2026-08-21
git diff --check
```

Expected: valid JSON, consistent statuses, and no whitespace errors.

- [ ] **Step 5: Commit**

```text
git add docs/relaunch-2026/00-MASTERPLAN.md docs/tiefenanalyse-2026-08-21
git commit -m "docs: record provisional URL migration gate"
```

### Task 6: Run final gates and prepare review handoff

**Files:**
- Create: `docs/developer-handoffs/2026-08-22-task-02-url-matrix/01-FERTIGMELDUNG.md`
- Create: `docs/developer-handoffs/2026-08-22-task-02-url-matrix/02-LLM-PRUEFAUFTRAG.md`
- Create after first sync: `docs/developer-handoffs/2026-08-22-task-02-url-matrix/03-VERIFIKATIONSSTATUS.json`

- [ ] **Step 1: Run fresh quality gates**

```text
node --test scripts/build-url-matrix.test.mjs
node scripts/build-url-matrix.mjs
npm test
node scripts/parity-audit.mjs
npm run typecheck
npm run lint
git diff --check
```

Record the parity audit honestly: `FETCH` findings without a reachable local site are not a positive parity result even if the script exits 0.

- [ ] **Step 2: Perform independent read-only review**

Review the complete Task-2 diff for correctness, private-data leakage, unsafe inferred decisions, CSV/URL edge cases, and documentation consistency. Resolve all blocking findings through new RED/GREEN cycles.

- [ ] **Step 3: Create exact developer and LLM handoff**

The handoff must include base and source commits, RED evidence, all fresh gate outputs, the 5/59/0/0 decision counts, the absence of GSC data, and the explicit prohibition on consuming provisional rows in Task 5.

- [ ] **Step 4: Commit the handoff**

```text
git add docs/developer-handoffs/2026-08-22-task-02-url-matrix
git commit -m "docs: add task 2 developer handoff"
```

- [ ] **Step 5: Integrate and synchronize safely**

Fetch `origin/relaunch-konzept`; require clean canonical and feature worktrees; compare local and origin base; merge with `--ff-only`; push without force; fetch again and require local SHA equals origin SHA.

- [ ] **Step 6: Record and synchronize the verification checkpoint**

Create syntactically valid `03-VERIFIKATIONSSTATUS.json`, commit it separately, push without force, fetch again, and require a clean canonical worktree with identical local and GitHub SHA.

- [ ] **Step 7: Stop for external review**

Do not start Task 5 or another Masterplan task. The external developer/LLM must return `freigegeben`, `freigegeben_mit_auflagen`, or `nicht_freigegeben` for the exact reviewed commit.
