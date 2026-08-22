import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";

const ROOT = resolve(import.meta.dirname, "..");
const BUILDER_PATH = join(ROOT, "src", "lib", "practice-json-ld.ts");
const SITE_CONTENT_PATH = join(ROOT, "src", "content", "site.ts");
const HERO_PATH = join(ROOT, "public", "images", "hero-praxis.jpg");
const EXPECTED_IMAGE =
  "https://rauch-heilpraktiker.de/images/hero-praxis.jpg";
const EXPECTED_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

async function loadTypeScriptModule(filePath) {
  const source = readFileSync(filePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: basename(filePath),
  });
  const dataUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  return import(dataUrl);
}

async function buildFixtureGraph() {
  const [{ buildPracticeJsonLd }, { practice }] = await Promise.all([
    loadTypeScriptModule(BUILDER_PATH),
    loadTypeScriptModule(SITE_CONTENT_PATH),
  ]);
  return buildPracticeJsonLd(practice);
}

function filesBelow(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(fullPath) : [fullPath];
  });
}

test("practice JSON-LD emits the canonical graph without aggregateRating", async () => {
  const data = await buildFixtureGraph();
  const medicalBusinesses = data["@graph"].filter(
    (entry) => entry["@type"] === "MedicalBusiness",
  );
  const people = data["@graph"].filter(
    (entry) => entry["@type"] === "Person",
  );

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(medicalBusinesses.length, 1);
  assert.equal(people.length, 1);
  assert.equal(medicalBusinesses[0].image, EXPECTED_IMAGE);
  assert.equal("aggregateRating" in medicalBusinesses[0], false);
});

test("practice JSON-LD emits exactly two weekday opening intervals", async () => {
  const data = await buildFixtureGraph();
  const business = data["@graph"].find(
    (entry) => entry["@type"] === "MedicalBusiness",
  );

  assert.ok(business);
  assert.deepEqual(business.openingHoursSpecification, [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: EXPECTED_DAYS,
      opens: "10:00",
      closes: "12:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: EXPECTED_DAYS,
      opens: "13:00",
      closes: "19:00",
    },
  ]);
});

test("the absolute structured-data image has a matching public asset", () => {
  assert.equal(existsSync(HERO_PATH), true, relative(ROOT, HERO_PATH));
});

test("production source emits no FAQPage markup and retains visible FAQ lists", () => {
  const sourceFiles = filesBelow(join(ROOT, "src")).filter((file) =>
    [".ts", ".tsx"].includes(extname(file)),
  );
  const offenders = sourceFiles
    .filter((file) => /FaqJsonLd|["']FAQPage["']/.test(readFileSync(file, "utf8")))
    .map((file) => relative(ROOT, file));
  const visibleFaqCallers = [
    "src/routes/index.tsx",
    "src/components/site/NlsNeko.tsx",
    "src/components/site/AnliegenHub.tsx",
    "src/components/site/HubFromArchive.tsx",
  ];

  assert.deepEqual(offenders, []);
  for (const caller of visibleFaqCallers) {
    assert.match(readFileSync(join(ROOT, caller), "utf8"), /<FaqList\b/);
  }
});
