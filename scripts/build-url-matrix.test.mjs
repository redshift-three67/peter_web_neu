import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

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
