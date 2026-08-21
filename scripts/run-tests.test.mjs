import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import test from "node:test";

import { discoverTestFiles, runTestSuite } from "./run-tests.mjs";

async function withTempDirectory(run) {
  const directory = await mkdtemp(join(tmpdir(), "rauch-test-runner-"));

  try {
    await run(directory);
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
}

test("discovers test files recursively in deterministic order", async () => {
  await withTempDirectory(async (directory) => {
    const nested = join(directory, "nested");
    await mkdir(nested);
    await writeFile(join(directory, "zeta.test.mjs"), "");
    await writeFile(join(nested, "alpha.test.mjs"), "");
    await writeFile(join(directory, "ignored.mjs"), "");

    const files = await discoverTestFiles(directory);
    const relativeFiles = files.map((file) => relative(directory, file).replaceAll("\\", "/"));

    assert.deepEqual(relativeFiles, ["nested/alpha.test.mjs", "zeta.test.mjs"]);
  });
});

test("fails without spawning Node when no test files exist", async () => {
  await withTempDirectory(async (directory) => {
    let spawnCalled = false;
    let errorOutput = "";

    const exitCode = await runTestSuite({
      rootDirectory: directory,
      spawnSyncImpl: () => {
        spawnCalled = true;
        return { status: 0 };
      },
      stderr: {
        write(chunk) {
          errorOutput += chunk;
        },
      },
    });

    assert.equal(exitCode, 1);
    assert.equal(spawnCalled, false);
    assert.match(errorOutput, /No test files found/);
  });
});

test("passes discovered files to Node and propagates its exit code", async () => {
  await withTempDirectory(async (directory) => {
    const testFile = join(directory, "sample.test.mjs");
    await writeFile(testFile, "");
    let invocation;

    const exitCode = await runTestSuite({
      rootDirectory: directory,
      spawnSyncImpl: (...args) => {
        invocation = args;
        return { status: 7 };
      },
    });

    assert.equal(exitCode, 7);
    assert.equal(invocation[0], process.execPath);
    assert.deepEqual(invocation[1], ["--test", testFile]);
    assert.deepEqual(invocation[2], { stdio: "inherit" });
  });
});
