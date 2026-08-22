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

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
