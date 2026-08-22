import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import test from "node:test";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = join(ROOT, "src");
const WIZARD_PATH = join(SRC, "components", "site", "AnamneseWizard.tsx");
const ACTIONS_PATH = join(SRC, "lib", "actions.ts");
const INFO_ROUTE_PATH = join(SRC, "routes", "online-anamnesebogen.tsx");
const LEGACY_ROUTE_PATH = join(SRC, "routes", "anamnese.tsx");
const PRACTICE_ROUTE_PATH = join(SRC, "routes", "praxis.tsx");
const PRIVACY_ROUTE_PATH = join(SRC, "routes", "datenschutzerklaerung.tsx");
const DOWNLOAD_ROUTE_PATH = join(
  SRC,
  "routes",
  "downloadbereich-naturheilpraxis-rauch.tsx",
);
const EXTERNAL_LINKS_PATH = join(SRC, "content", "external-links.ts");
const MIGRATION_PATH = join(ROOT, "migrations", "0002_practice.sql");

function filesBelow(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(fullPath) : [fullPath];
  });
}

test("relaunch source contains no local anamnesis submit or database path", () => {
  assert.equal(
    existsSync(WIZARD_PATH),
    false,
    "the local anamnesis wizard must be removed",
  );

  const productionSources = filesBelow(SRC).filter((filePath) =>
    [".ts", ".tsx"].includes(extname(filePath)),
  );

  for (const filePath of productionSources) {
    const source = readFileSync(filePath, "utf8");
    assert.doesNotMatch(source, /\bsubmitAnamnese\b/);
    assert.doesNotMatch(source, /\banamnesis_submissions\b/);
  }
});

test("information route opens the independent app securely without embedding it", () => {
  assert.equal(
    existsSync(EXTERNAL_LINKS_PATH),
    true,
    "the external app URL must have one canonical source",
  );

  const links = readFileSync(EXTERNAL_LINKS_PATH, "utf8");
  const route = readFileSync(INFO_ROUTE_PATH, "utf8");

  assert.match(
    links,
    /anamneseApp:\s*["']https:\/\/naturheilpraxis-rauch\.lovable\.app\/["']/,
  );
  assert.match(route, /externalLinks\.anamneseApp/);
  assert.match(route, /target=["']_blank["']/);
  assert.match(route, /rel=["']noopener noreferrer["']/);
  assert.doesNotMatch(route, /AnamneseWizard/);
  assert.doesNotMatch(route, /<(?:form|input|textarea|select|iframe)\b/i);
});

test("authenticated practice inbox contains contact messages only", () => {
  const actions = readFileSync(ACTIONS_PATH, "utf8");
  const practiceRoute = readFileSync(PRACTICE_ROUTE_PATH, "utf8");

  assert.doesNotMatch(actions, /\banamneseSchema\b/);
  assert.doesNotMatch(actions, /\bforms\b/);
  assert.doesNotMatch(practiceRoute, /\bAnamnesen\b/);
  assert.doesNotMatch(practiceRoute, /\.forms\b/);
});

test("active website copy states the external health-data boundary accurately", () => {
  const privacyRoute = readFileSync(PRIVACY_ROUTE_PATH, "utf8");
  const downloadRoute = readFileSync(DOWNLOAD_ROUTE_PATH, "utf8");

  assert.doesNotMatch(privacyRoute, /Kontakt- und Anamnesedaten/);
  assert.doesNotMatch(privacyRoute, /Übermittlung erfolgt über diese Domain/);
  assert.match(privacyRoute, /eigenständigen externen App/);
  assert.match(privacyRoute, /keine\s+Gesundheitsdaten/);
  assert.match(downloadRoute, /eigenständige Patienten-App/);
  assert.match(
    downloadRoute,
    /keine\s+Gesundheitsdaten erfasst oder\s+gespeichert/,
  );
});

test("legacy route stays compatible while the historical migration stays untouched", () => {
  const legacyRoute = readFileSync(LEGACY_ROUTE_PATH, "utf8");

  assert.match(
    legacyRoute,
    /redirect\(\{\s*href:\s*["']\/online-anamnesebogen["']\s*\}\)/,
  );
  assert.equal(existsSync(MIGRATION_PATH), true);
});
