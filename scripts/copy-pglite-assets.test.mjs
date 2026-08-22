import assert from "node:assert/strict";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const ROOT = resolve(import.meta.dirname, "..");
const SCRIPT_PATH = resolve(ROOT, "scripts/copy-pglite-assets.mjs");
const REQUIRED_ASSETS = ["pglite.data", "pglite.wasm", "initdb.wasm"];

test("copyPgliteAssets installs every binary referenced by the Node bundle", async () => {
  assert.equal(
    existsSync(SCRIPT_PATH),
    true,
    "scripts/copy-pglite-assets.mjs must exist",
  );

  const temporaryRoot = mkdtempSync(join(tmpdir(), "rauch-pglite-assets-"));
  const sourceDir = resolve(temporaryRoot, "source");
  const outputDir = resolve(temporaryRoot, "output");
  mkdirSync(sourceDir, { recursive: true });

  try {
    for (const asset of REQUIRED_ASSETS) {
      writeFileSync(resolve(sourceDir, asset), `fixture:${asset}`);
    }

    const moduleUrl = `${pathToFileURL(SCRIPT_PATH).href}?test=${Date.now()}`;
    const { PGLITE_RUNTIME_ASSETS, copyPgliteAssets } = await import(moduleUrl);

    assert.deepEqual(PGLITE_RUNTIME_ASSETS, REQUIRED_ASSETS);
    await copyPgliteAssets({ sourceDir, outputDir });

    for (const asset of REQUIRED_ASSETS) {
      assert.equal(
        readFileSync(resolve(outputDir, asset), "utf8"),
        `fixture:${asset}`,
      );
    }
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
});
