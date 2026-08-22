import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");

export const PGLITE_RUNTIME_ASSETS = [
  "pglite.data",
  "pglite.wasm",
  "initdb.wasm",
];

export async function copyPgliteAssets({
  sourceDir = resolve(ROOT, "node_modules/@electric-sql/pglite/dist"),
  outputDir = resolve(ROOT, ".output/server/_libs"),
} = {}) {
  await mkdir(outputDir, { recursive: true });

  await Promise.all(
    PGLITE_RUNTIME_ASSETS.map((asset) =>
      copyFile(resolve(sourceDir, asset), resolve(outputDir, asset)),
    ),
  );
}

const invokedAsScript =
  process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedAsScript) {
  await copyPgliteAssets();
}
