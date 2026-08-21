import { spawnSync } from "node:child_process";
import { readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DEFAULT_TEST_ROOT = dirname(fileURLToPath(import.meta.url));

export async function discoverTestFiles(rootDirectory) {
  const files = [];

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (entry.isFile() && entry.name.endsWith(".test.mjs")) {
        files.push(entryPath);
      }
    }
  }

  await visit(resolve(rootDirectory));
  return files.sort();
}

export async function runTestSuite({
  rootDirectory = DEFAULT_TEST_ROOT,
  spawnSyncImpl = spawnSync,
  stderr = process.stderr,
} = {}) {
  const testFiles = await discoverTestFiles(rootDirectory);

  if (testFiles.length === 0) {
    stderr.write(`[test-runner] No test files found under ${resolve(rootDirectory)}.\n`);
    return 1;
  }

  const result = spawnSyncImpl(process.execPath, ["--test", ...testFiles], {
    stdio: "inherit",
  });

  if (result.error) {
    stderr.write(`[test-runner] Failed to start Node test process: ${result.error.message}\n`);
    return 1;
  }

  return Number.isInteger(result.status) ? result.status : 1;
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;

if (invokedPath === import.meta.url) {
  process.exitCode = await runTestSuite();
}
