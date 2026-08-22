import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const ROOT = resolve(import.meta.dirname, "..");

function pathFromRoot(relativePath) {
  return resolve(ROOT, relativePath);
}

function readSource(relativePath) {
  return readFileSync(pathFromRoot(relativePath), "utf8");
}

test("health route is a dependency-free exact liveness response", () => {
  const routePath = pathFromRoot("src/routes/healthz.ts");
  assert.equal(existsSync(routePath), true, "src/routes/healthz.ts must exist");

  const source = readFileSync(routePath, "utf8");
  assert.match(source, /createFileRoute\(["']\/healthz["']\)/);
  assert.match(source, /GET\s*:/);
  assert.match(
    source,
    /Response\.json\(\s*\{\s*status:\s*["']ok["']\s*\}/,
  );
  assert.doesNotMatch(
    source,
    /@\/lib\/(?:db|auth)|@\/content|payload|process\.env|timestamp/i,
  );
});

test("Vite preserves Vercel and adds an explicit Node server target", () => {
  const source = readSource("vite.config.ts");
  assert.match(
    source,
    /defineConfig\(\(\{\s*command\s*,\s*mode\s*\}\)\s*=>/,
  );
  assert.match(
    source,
    /preset:\s*mode\s*===\s*["']node["']\s*\?\s*["']node-server["']\s*:\s*["']vercel["']/,
  );
  assert.match(source, /serverDir:\s*["']\.\/server["']/);

  const pkg = JSON.parse(readSource("package.json"));
  assert.equal(
    pkg.scripts["build:node"],
    "vite build --mode node && node scripts/copy-pglite-assets.mjs",
  );
  assert.equal(pkg.scripts["start:node"], "node .output/server/index.mjs");
});

test("Docker image is multi-stage, non-root, and health checked", () => {
  const dockerfilePath = pathFromRoot("Dockerfile");
  assert.equal(existsSync(dockerfilePath), true, "Dockerfile must exist");

  const source = readFileSync(dockerfilePath, "utf8");
  assert.match(source, /^FROM node:22-alpine AS build$/m);
  assert.match(source, /^FROM node:22-alpine AS runtime$/m);
  assert.match(source, /^RUN npm ci$/m);
  assert.match(source, /^RUN npm run build:node$/m);
  assert.match(source, /COPY --from=build .*\/app\/\.output \.\/\.output/);
  assert.match(source, /^USER node$/m);
  assert.match(source, /^EXPOSE 3000$/m);
  assert.match(source, /^HEALTHCHECK\b/m);
  assert.match(source, /http:\/\/127\.0\.0\.1:3000\/healthz/);
  assert.match(
    source,
    /^CMD \["node", "\.output\/server\/index\.mjs"\]$/m,
  );
});

test("Docker context excludes secrets, private evidence, and generated output", () => {
  const ignorePath = pathFromRoot(".dockerignore");
  assert.equal(existsSync(ignorePath), true, ".dockerignore must exist");

  const entries = new Set(
    readFileSync(ignorePath, "utf8")
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")),
  );

  for (const required of [
    ".git",
    ".worktrees",
    "node_modules",
    ".vercel",
    ".output",
    ".env",
    ".env.*",
    "data/private",
  ]) {
    assert.equal(entries.has(required), true, `${required} must be ignored`);
  }
});

test("generated Node output is ignored by Git", () => {
  const ignored = execFileSync(
    "git",
    ["check-ignore", ".output/server/index.mjs"],
    { cwd: ROOT, encoding: "utf8" },
  ).trim();
  assert.equal(ignored, ".output/server/index.mjs");
});
