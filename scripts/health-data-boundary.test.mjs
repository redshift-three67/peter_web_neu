import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import test from "node:test";

const ROOT = process.env.HEALTH_BOUNDARY_ROOT
  ? resolve(process.env.HEALTH_BOUNDARY_ROOT)
  : resolve(import.meta.dirname, "..");
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

test("local anamnesis wizard is absent", () => {
  assert.equal(
    existsSync(WIZARD_PATH),
    false,
    "the local anamnesis wizard must be removed",
  );
});

test("relaunch source contains no local anamnesis submit or database path", () => {
  const productionSources = filesBelow(SRC).filter((filePath) =>
    [".ts", ".tsx"].includes(extname(filePath)),
  );
  const offenders = [];

  for (const filePath of productionSources) {
    const source = readFileSync(filePath, "utf8");
    if (/\bsubmitAnamnese\b/.test(source)) {
      offenders.push(`${relative(ROOT, filePath)}:submitAnamnese`);
    }
    if (/\banamnesis_submissions\b/.test(source)) {
      offenders.push(`${relative(ROOT, filePath)}:anamnesis_submissions`);
    }
  }

  assert.deepEqual(offenders, []);
});

test("information route opens the independent app securely without embedding it", () => {
  const route = readFileSync(INFO_ROUTE_PATH, "utf8");
  const violations = [];

  if (!existsSync(EXTERNAL_LINKS_PATH)) {
    violations.push("missing canonical external-links source");
  } else if (
    !/anamneseApp:\s*["']https:\/\/naturheilpraxis-rauch\.lovable\.app\/["']/.test(
      readFileSync(EXTERNAL_LINKS_PATH, "utf8"),
    )
  ) {
    violations.push("incorrect canonical external app URL");
  }
  if (!/externalLinks\.anamneseApp/.test(route)) {
    violations.push("route does not use canonical external app URL");
  }
  if (!/introAction=\{/.test(route)) {
    violations.push("external action is not in the prominent hub intro");
  }
  if (!/target=["']_blank["']/.test(route)) {
    violations.push("external action lacks target=_blank");
  }
  if (!/rel=["']noopener noreferrer["']/.test(route)) {
    violations.push("external action lacks noopener noreferrer");
  }
  if (/AnamneseWizard/.test(route)) {
    violations.push("route still renders AnamneseWizard");
  }
  if (/<(?:form|input|textarea|select|iframe)\b/i.test(route)) {
    violations.push("route contains local form or embedded-app markup");
  }

  assert.deepEqual(violations, []);
});

test("authenticated practice inbox contains contact messages only", () => {
  const actions = readFileSync(ACTIONS_PATH, "utf8");
  const practiceRoute = readFileSync(PRACTICE_ROUTE_PATH, "utf8");
  const violations = [];

  if (/\banamneseSchema\b/.test(actions)) {
    violations.push("actions retains anamneseSchema");
  }
  if (/\bforms\b/.test(actions)) {
    violations.push("actions retains forms inbox data");
  }
  if (/\bAnamnesen\b/.test(practiceRoute)) {
    violations.push("practice inbox retains Anamnesen section");
  }
  if (/\.forms\b/.test(practiceRoute)) {
    violations.push("practice inbox retains forms access");
  }

  assert.deepEqual(violations, []);
});

test("active website copy states the external health-data boundary accurately", () => {
  const privacyRoute = readFileSync(PRIVACY_ROUTE_PATH, "utf8");
  const downloadRoute = readFileSync(DOWNLOAD_ROUTE_PATH, "utf8");
  const violations = [];

  if (/Kontakt- und Anamnesedaten/.test(privacyRoute)) {
    violations.push("privacy copy conflates contact and anamnesis data");
  }
  if (/Übermittlung erfolgt über diese Domain/.test(privacyRoute)) {
    violations.push("privacy copy claims local anamnesis transmission");
  }
  if (!/eigenständigen externen App/.test(privacyRoute)) {
    violations.push("privacy copy omits independent external app boundary");
  }
  if (!/keine\s+Gesundheitsdaten/.test(privacyRoute)) {
    violations.push("privacy copy omits contact-form health-data warning");
  }
  if (!/eigenständige Patienten-App/.test(downloadRoute)) {
    violations.push("download copy omits independent patient app");
  }
  if (!/keine\s+Gesundheitsdaten erfasst oder\s+gespeichert/.test(downloadRoute)) {
    violations.push("download copy claims or permits local health-data handling");
  }

  assert.deepEqual(violations, []);
});

test("legacy route stays compatible while the historical migration stays untouched", () => {
  const legacyRoute = readFileSync(LEGACY_ROUTE_PATH, "utf8");

  assert.match(
    legacyRoute,
    /redirect\(\{\s*href:\s*["']\/online-anamnesebogen["']\s*\}\)/,
  );
  assert.equal(existsSync(MIGRATION_PATH), true);
});

test("deployable prebuilt output is not tracked", () => {
  const trackedOutput = execFileSync(
    "git",
    ["ls-files", "--", ".vercel/output"],
    { cwd: ROOT, encoding: "utf8" },
  )
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  assert.equal(
    trackedOutput.length,
    0,
    "generated .vercel/output must not be deployable from repository history",
  );
});
