# Task 8 Node and Container Deployment Implementation Plan

> **Execution rule:** Do not begin production-code work until both external
> Task-3 reviews (Gate B and Gate C) are present, machine-readable, target the
> recorded commits/evidence, and have verdict `freigegeben`. Implement every
> code change test-first.

**Goal:** Add a reproducible managed-Node build and a minimal non-root container
with a dependency-free `/healthz` liveness contract while preserving the
existing Vercel build.

**Architecture:** TanStack owns the public health route. Vite selects Nitro
`node-server` only for mode `node`; all other builds retain preset `vercel`.
The multi-stage Node 22 Alpine image contains only Nitro `.output` at runtime.

**Tech stack:** TypeScript, TanStack Start/Router, Vite, Nitro, Node test runner,
Docker, Node 22 Alpine.

---

### Task 0: Enforce predecessor and resource gates

**Files:**
- Verify: `docs/developer-handoffs/2026-08-22-task-03-wordpress-archive/`
- Verify: canonical branch and system resources

- [ ] **Step 1: Verify both external Task-3 reviews**

Require separate Gate-B and Gate-C review JSON documents. Parse each as JSON
and require `verdict` to equal `freigegeben`, no unresolved blocking finding,
and the reviewed commit/evidence identity to match the corresponding handoff.

If either review is missing, stop before creating the failing test.

- [ ] **Step 2: Re-establish the canonical Git baseline**

Run:

```bash
git fetch origin relaunch-konzept
git status --short --branch
git rev-parse HEAD
git rev-parse origin/relaunch-konzept
```

Expected: branch `relaunch-konzept`, clean worktree, identical local and remote
SHAs. Do not merge, reset, or overwrite an unexpected state.

- [ ] **Step 3: Record resource baseline**

Record free space on D and E, total/free RAM, memory utilization, and Docker
process state. Before Docker work require D free space at least 3 GB, available
RAM at least 1.5 GB, and memory utilization below 90%.

### Task 1: Add the failing deployment contract

**Files:**
- Create: `scripts/node-deployment-contract.test.mjs`
- Test: `scripts/node-deployment-contract.test.mjs`

- [ ] **Step 1: Write source-contract tests**

Use `node:test`, `node:assert/strict`, `node:fs`, and `node:path`. Read the real
files from the repository root and assert:

```js
test("health route is a dependency-free exact liveness response", () => {
  assert.equal(existsSync(HEALTH_ROUTE), true);
  const source = readFileSync(HEALTH_ROUTE, "utf8");
  assert.match(source, /createFileRoute\("\/healthz"\)/);
  assert.match(source, /Response\.json\(\{\s*status:\s*"ok"\s*\}/);
  assert.doesNotMatch(
    source,
    /@\/lib\/(?:db|auth)|@\/content|payload|process\.env|timestamp/i,
  );
});

test("vite preserves vercel and adds explicit node-server mode", () => {
  const source = readFileSync(VITE_CONFIG, "utf8");
  assert.match(source, /defineConfig\(\(\{\s*command,\s*mode\s*\}\)/);
  assert.match(source, /mode\s*===\s*"node"\s*\?\s*"node-server"\s*:\s*"vercel"/);
  assert.match(source, /serverDir:\s*"\.\/server"/);
});

test("package scripts use the verified Nitro artifact", () => {
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON, "utf8"));
  assert.equal(pkg.scripts["build:node"], "vite build --mode node");
  assert.equal(pkg.scripts["start:node"], "node .output/server/index.mjs");
});
```

Add Dockerfile assertions for two Node 22 Alpine stages, `npm ci`,
`npm run build:node`, `.output` copy, `USER node`, `EXPOSE 3000`, `/healthz`,
and the emitted start path. Add `.dockerignore` assertions for `.git`,
`node_modules`, `.env*`, `.vercel`, `.output`, and `data/private`.

- [ ] **Step 2: Run the focused test and record RED**

Run:

```bash
node --test scripts/node-deployment-contract.test.mjs
```

Expected: nonzero exit caused by the missing health route, Node scripts,
Dockerfile, `.dockerignore`, and dual-preset configuration. Do not edit
production/configuration files before recording this failure.

### Task 2: Implement the liveness route and dual build target

**Files:**
- Create: `src/routes/healthz.ts`
- Modify: `vite.config.ts`
- Modify: `package.json`
- Test: `scripts/node-deployment-contract.test.mjs`

- [ ] **Step 1: Add the dependency-free health handler**

Create:

```ts
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/healthz")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(
          { status: "ok" },
          { headers: { "cache-control": "no-store" } },
        ),
    },
  },
});
```

Do not add a loader, component, database call, environment output, timestamp,
authentication, or CMS dependency.

- [ ] **Step 2: Make the Nitro preset mode-aware**

Add `mode` to the existing `defineConfig` callback. Preserve the current
conditional build plugin, plugin order, and `serverDir`. Change only the preset
selection to:

```ts
preset: mode === "node" ? "node-server" : "vercel",
```

- [ ] **Step 3: Add explicit Node scripts**

Add to `package.json` without changing the default `build` script:

```json
"build:node": "vite build --mode node",
"start:node": "node .output/server/index.mjs"
```

- [ ] **Step 4: Run focused tests**

Run the contract test. Route/build-script assertions should become green;
Docker assertions remain red until Task 3.

### Task 3: Add the minimal non-root image contract

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`
- Test: `scripts/node-deployment-contract.test.mjs`

- [ ] **Step 1: Create the multi-stage Dockerfile**

Use this contract, adapting only if the real build proves an explicit required
asset is missing:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:node

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /app/.output ./.output
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/healthz >/dev/null || exit 1
CMD ["node", ".output/server/index.mjs"]
```

Do not copy `.env`, private evidence, database files, or the full source tree
into the runtime stage.

- [ ] **Step 2: Create a conservative `.dockerignore`**

Exclude at minimum:

```text
.git
.gitignore
node_modules
.vercel
.output
.env
.env.*
data/private
npm-debug.log*
```

Do not exclude `package-lock.json`, `src`, `server`, `public`, `scripts`, or
other inputs required by the real build.

- [ ] **Step 3: Run the focused test and verify GREEN**

Run:

```bash
node --test scripts/node-deployment-contract.test.mjs
```

Expected: all deployment-contract tests pass.

### Task 4: Verify both release builds and the raw Node runtime

**Files:**
- Verify: Task-8 source/configuration changes
- Generated/ignored: `.vercel/output`, `.output`

- [ ] **Step 1: Run static and regression gates**

Run in order:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run build:node
```

Expected: zero test/type/build errors; lint has no new warning. The existing
Vercel build must remain successful.

- [ ] **Step 2: Verify the emitted artifact exactly**

Require `.output/server/index.mjs` to exist. If it does not exist, stop and
investigate the Nitro output; do not change `start:node` to an unverified guess.

- [ ] **Step 3: Run a loopback Node smoke test**

Choose an unused local port, start the emitted Node server with loopback-safe
test environment, and request:

- `/healthz`: HTTP 200, JSON content type, parsed body deep-equal to
  `{ status: "ok" }`, no extra key;
- `/`: HTTP 200 and non-empty HTML;
- `/kontakt` and `/online-anamnesebogen`: HTTP 200 and non-empty HTML.

Record process exit/logs and stop the process after the checks. A database or
Alpine/WASM error is a hard failure requiring systematic diagnosis.

### Task 5: Build and smoke-test the container within resource limits

**Files:**
- Verify: `Dockerfile`, `.dockerignore`, built image

- [ ] **Step 1: Recheck resources and Docker state**

Record D/E free space and RAM immediately before the build. If a threshold in
the design document is crossed, pause without pruning or deleting anything.

- [ ] **Step 2: Build the image**

Build a task-specific local tag. Record build duration, final image size, and
free D-space after the build. Do not use `--no-cache` unless debugging proves
it necessary.

- [ ] **Step 3: Run a constrained test container**

Run with an explicit temporary name, approximately `--cpus=2`,
`--memory=768m`, and `127.0.0.1:13000:3000` (or another verified free
loopback port). Do not publish the container beyond loopback.

- [ ] **Step 4: Verify runtime identity and routes**

Confirm the process user is non-root, Docker health becomes `healthy`, and the
same health/home/critical-SSR route checks pass through the mapped port.

- [ ] **Step 5: Stop and remove only the temporary container**

Remove the named task container after evidence is recorded. Do not prune
images, volumes, build cache, networks, WSL data, or unrelated containers.

### Task 6: Synchronize canonical status and handoff evidence

**Files:**
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json`
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`
- Modify: `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`
- Modify: `docs/relaunch-2026/00-MASTERPLAN.md`
- Create: `docs/developer-handoffs/2026-08-22-task-08-node-container/01-FERTIGMELDUNG.md`
- Create: `docs/developer-handoffs/2026-08-22-task-08-node-container/02-LLM-PRUEFAUFTRAG.md`
- Create: `docs/developer-handoffs/2026-08-22-task-08-node-container/03-VERIFIKATIONSSTATUS.json`

- [ ] **Step 1: Update `STAT-006` only from fresh evidence**

Set status to `bestätigt` only after Node and Docker runtime checks pass.
Record exact test counts, artifact path, health response, non-root identity,
build compatibility, and resource constraints in `ist_zustand` and `nachweis`.

- [ ] **Step 2: Complete Masterplan Task 8**

Check every Task-8 item only when its evidence exists. Do not mark Task 9 or
Task 10 complete and do not claim a production deployment.

- [ ] **Step 3: Create exact developer/LLM handoff artifacts**

The completion report and JSON verification record must identify files,
commits, RED/GREEN evidence, full gates, Docker commands/results, runtime user,
resource readings, known warnings, production non-interference, and remaining
scope. The review prompt must require fresh independent execution.

- [ ] **Step 4: Commit the implementation**

After a clean focused diff and `git diff --check`, commit with:

```bash
git commit -m "feat: add managed Node container deployment"
```

- [ ] **Step 5: Synchronize without history rewriting**

Fetch the canonical branch, require the expected unchanged remote base, push
without force, fetch again, and prove:

```bash
git status --short --branch
git rev-parse HEAD
git rev-parse origin/relaunch-konzept
```

Expected: clean worktree and identical SHAs.

- [ ] **Step 6: Obtain external approval**

Task 8 is not externally released until the developer/LLM returns a
machine-readable review with the exact reviewed commit, `verdict` equal to
`freigegeben`, all required checks confirmed, and no unresolved finding.
