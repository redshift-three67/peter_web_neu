# Task 8 Node and Container Deployment Design

## Context

The relaunch currently builds with Nitro preset `vercel`. It has no supported
managed-Node start command, no container image contract, and no independent
health endpoint. Task 8 establishes a second, explicitly selected Node target
without changing the existing default Vercel build.

Task 3 remains a hard predecessor gate. This document may be committed as
preparation, but production-code implementation must not start until the
external Gate-B and Gate-C reviews for the WordPress archive and isolated
restore have both returned `freigegeben`.

## Decision

Use the existing TanStack file-route model for a dependency-free liveness
endpoint, select Nitro's `node-server` preset only in Vite mode `node`, and
package the resulting `.output` directory in a multi-stage Node 22 Alpine
image running as the built-in non-root `node` user.

The default build keeps preset `vercel`. The Node target is additive:

```ts
nitro({
  preset: mode === "node" ? "node-server" : "vercel",
  serverDir: "./server",
});
```

```json
"build:node": "vite build --mode node",
"start:node": "node .output/server/index.mjs"
```

## Considered approaches

### A. TanStack route plus dual Nitro preset — selected

This matches the existing `src/routes/api/auth/$.ts` server-handler pattern,
the Masterplan file contract, and Nitro's actual Node artifact layout. It
keeps application routing explicit and preserves the existing Vercel target.

### B. Nitro-native `server/routes/healthz.ts`

Technically valid, but rejected because it conflicts with the approved
`src/routes/healthz.ts` ownership model and introduces a second public-route
convention without a demonstrated need.

### C. Global middleware interception

Rejected. A middleware health response is less discoverable, runs inside the
global request path, and makes route exclusions and future readiness behavior
harder to reason about.

## Health contract

`GET /healthz` is a liveness probe only. It returns HTTP 200 and exactly:

```json
{"status":"ok"}
```

The handler may add `Cache-Control: no-store`, but it must not include a
timestamp, host name, version, environment, database state, authentication
state, filesystem path, secret, or user-derived value.

The route must not import or call database, authentication, CMS/content,
network, or migration code. Readiness checks that depend on PostgreSQL,
Payload, or other services require a separate endpoint and task.

## Build targets

`vite.config.ts` must receive `mode` from `defineConfig`. For build commands it
keeps the current Nitro plugin and `serverDir: "./server"`, selecting:

- `vercel` for the existing `npm run build`;
- `node-server` for `npm run build:node`.

The implementation must verify, rather than assume, that the Node build emits
`.output/server/index.mjs`. A missing artifact or a start failure is a hard
stop and must not be hidden by an alternate guessed path.

## Container contract

The Dockerfile uses two `node:22-alpine` stages:

1. the build stage copies lock files, runs `npm ci`, copies the required source
   tree, and runs `npm run build:node`;
2. the runtime stage copies only `.output`, sets production defaults, changes
   ownership to `node`, and executes the emitted server as `USER node`.

Runtime defaults are `HOST=0.0.0.0`, `PORT=3000`, and `NODE_ENV=production`.
Port 3000 is exposed and the image healthcheck requests
`http://127.0.0.1:3000/healthz`.

No `.env` file, private GSC/Plesk/WordPress evidence, Git metadata, local
database, generated Vercel output, development cache, or backup belongs in
the build context or runtime image. Production secrets are injected only at
runtime and are never Docker `ARG` or baked `ENV` values.

Node Alpine is mandated by the Masterplan but must be proved against the real
application, including PGlite/WASM behavior. An Alpine-specific runtime error
is investigated as a test failure; the base image is not silently changed.

## Test-first strategy

Create `scripts/node-deployment-contract.test.mjs` before production changes.
The first focused run must fail for the current missing health route, scripts,
Dockerfile, `.dockerignore`, and Node preset.

The contract test verifies:

1. the health route exists and returns only `{ status: "ok" }`;
2. it has no database, authentication, content, CMS, or environment imports;
3. Vite retains `serverDir: "./server"`, the Vercel default, and the explicit
   Node mode;
4. `build:node` and `start:node` match the approved commands;
5. the Dockerfile is multi-stage, Node 22 Alpine, non-root, port 3000, and has
   a `/healthz` healthcheck;
6. `.dockerignore` excludes secret, private-evidence, dependency, Git, and
   generated-output paths.

After implementation, verification proceeds in this order:

1. focused contract test;
2. complete `npm test` suite;
3. `npm run typecheck`;
4. `npm run lint`;
5. default `npm run build` to prove Vercel compatibility;
6. `npm run build:node` and explicit artifact check;
7. loopback Node runtime smoke test for `/healthz`, `/`, and critical SSR
   routes;
8. Docker build/run smoke test with resource monitoring.

The Node smoke test binds an available loopback port and terminates its process
after verification. The Docker smoke test binds only to `127.0.0.1`, uses a
temporary container name, and removes the test container after recording the
result.

## Resource safeguards

Docker data resides on drive D, so free space on E does not increase Docker's
image capacity. Before build and run, record free D/E space, RAM, and active
Docker processes. Abort or pause before a Docker build if D has less than 3 GB
free, available RAM is below 1.5 GB, or memory utilization exceeds 90%.

Run the smoke container with approximately two CPUs and 768 MB memory. Do not
prune images, volumes, caches, or user data automatically. Stop the temporary
container and any task-started helper process after verification.

## Documentation and review

Only after all fresh gates pass may `STAT-006` and Masterplan Task 8 be marked
confirmed/completed. The handoff must include exact commands, exit codes,
test counts, artifact path, effective container user, health response, route
smoke results, resource readings, commit SHA, and final local/remote equality.

An external developer/LLM review is required before Task 8 is treated as
released. Production WordPress, Plesk, DNS, and the external Lovable app remain
unchanged throughout Task 8.

## Non-goals

- deploying or switching production traffic;
- changing Plesk, DNS, WordPress, or Caddy;
- adding database readiness semantics to `/healthz`;
- embedding secrets or private evidence in the image;
- changing the current Vercel deployment behavior;
- implementing Task 9 performance/accessibility gates or Task 10 platform
  registration;
- deleting Docker data or unrelated build artifacts.

## Acceptance criteria

Task 8 is code-complete only when the Node artifact starts successfully,
`/healthz` returns HTTP 200 with exactly `{status:"ok"}`, representative SSR
routes render, the container runs as non-root within the resource boundary,
the default Vercel build remains green, all automated gates pass, canonical
status documents and handoff evidence are synchronized, and local and GitHub
SHAs match after a real fetch.
