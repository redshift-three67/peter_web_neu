import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const ROOT = resolve(import.meta.dirname, "..");
const SERVER_ENTRY = resolve(ROOT, ".output/server/index.mjs");
const ROUTES = ["/", "/kontakt", "/online-anamnesebogen"];

async function getFreePort() {
  const server = createServer();

  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(0, "127.0.0.1", resolveListen);
  });

  const address = server.address();
  assert.ok(address && typeof address === "object", "port must be assigned");

  await new Promise((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });

  return address.port;
}

async function waitForHealth(url, child, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Node server exited early with code ${child.exitCode}`);
    }

    try {
      const response = await fetch(url);
      if (response.status === 200) return response;
      lastError = new Error(`health returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await delay(100);
  }

  throw new Error(`Node server did not become healthy: ${lastError}`);
}

const port = await getFreePort();
const baseUrl = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, [SERVER_ENTRY], {
  cwd: ROOT,
  env: {
    ...process.env,
    HOST: "127.0.0.1",
    PORT: String(port),
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
child.stdout.setEncoding("utf8");
child.stderr.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  serverOutput += chunk;
});
child.stderr.on("data", (chunk) => {
  serverOutput += chunk;
});

try {
  const health = await waitForHealth(`${baseUrl}/healthz`, child);
  assert.equal(await health.text(), '{"status":"ok"}');
  assert.equal(health.headers.get("cache-control"), "no-store");
  assert.match(health.headers.get("content-type") ?? "", /^application\/json/u);

  for (const route of ROUTES) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, `${route} must return HTTP 200`);
    assert.ok((await response.text()).length > 0, `${route} must return a body`);
  }

  process.stdout.write(
    `${JSON.stringify({
      status: "ok",
      health: "/healthz",
      routes: ROUTES,
    })}\n`,
  );
} catch (error) {
  error.message += `\nNode server output:\n${serverOutput}`;
  throw error;
} finally {
  if (child.exitCode === null) {
    const exited = once(child, "exit");
    child.kill();
    await Promise.race([exited, delay(5_000)]);
    if (child.exitCode === null) child.kill("SIGKILL");
  }
}
