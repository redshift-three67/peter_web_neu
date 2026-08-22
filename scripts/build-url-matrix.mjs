import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const MATRIX_COLUMNS = [
  "old_url",
  "old_path",
  "manifest_class",
  "manifest_status",
  "old_http_status",
  "old_canonical",
  "in_old_sitemap",
  "gsc_clicks",
  "gsc_impressions",
  "gsc_position",
  "backlinks",
  "business_value",
  "content_risk",
  "decision",
  "target_path",
  "target_http_status",
  "new_canonical",
  "in_new_sitemap",
  "owner",
  "approval_status",
  "approved_by",
  "evidence_status",
  "notes",
];

const DEFAULTS = {
  manifest: path.join(root, "content/wordpress/manifest.json"),
  output: path.join(root, "docs/migration/url-migration-matrix.csv"),
  gscPages: undefined,
};

export function normalizePath(value) {
  const url = new URL(value, "https://rauch-heilpraktiker.de");
  const pathname = url.pathname.replace(/\/{2,}/g, "/");
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}

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

const GSC_HEADER_ALIASES = {
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

  const normalizedHeaders = headers.map(normalizeHeader);
  const indexes = Object.fromEntries(
    Object.entries(GSC_HEADER_ALIASES).map(([key, names]) => [
      key,
      normalizedHeaders.findIndex((header) => names.includes(header)),
    ]),
  );
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
    "keep_200_index",
    "merge_301",
    "remove_410",
    "temporary_noindex_review",
  ]);
  for (const row of rows) {
    if (!allowed.has(row.decision)) {
      throw new Error(`invalid decision: ${row.decision}`);
    }
  }

  return Object.freeze({
    rows: rows.length,
    keep: rows.filter((row) => row.decision === "keep_200_index").length,
    review: rows.filter((row) => row.decision === "temporary_noindex_review").length,
    redirects: rows.filter((row) => row.decision === "merge_301").length,
    removals: rows.filter((row) => row.decision === "remove_410").length,
  });
}

function parseArgs(argv) {
  const options = { ...DEFAULTS };

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
  const manifest = JSON.parse(await readFile(options.manifest, "utf8"));
  const gscByPath = options.gscPages
    ? parseGscPagesCsv(await readFile(options.gscPages, "utf8"))
    : new Map();
  const rows = buildBaselineRows(manifest, gscByPath);
  const summary = validateMatrix(rows, manifest);

  await mkdir(path.dirname(options.output), { recursive: true });
  await writeFile(options.output, serializeCsv(rows), "utf8");
  process.stdout.write(`${JSON.stringify(summary)}\n`);
  return summary;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
