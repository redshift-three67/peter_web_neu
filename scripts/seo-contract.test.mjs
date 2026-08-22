import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";

const ROOT = resolve(import.meta.dirname, "..");
const BUILDER_PATH = join(ROOT, "src", "lib", "practice-json-ld.ts");
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

const practiceFixture = {
  name: "Naturheilpraxis Rauch",
  person: "Peter Rauch",
  role: "Heilpraktiker und Physiotherapeut",
  street: "Friedrich-Deffner-Straße 19a",
  zip: "86163",
  city: "Augsburg",
  district: "Hochzoll",
  phoneTel: "+498212621462",
  email: "praxis_rauch@icloud.com",
  geo: { lat: 48.33937, lng: 10.94893 },
  reach: ["Augsburg-Hochzoll", "Friedberg", "Lechhausen-Ost"],
  association: "Bund Deutscher Heilpraktiker und Naturheilkundiger e.V.",
  social: {
    facebook:
      "https://www.facebook.com/heilpraktiker.naturheilpraxis.bioresonanz.rauch/",
    googlePlaces: "https://g.page/RauchHeilpraktikerAugsburg",
  },
  schemaImage: EXPECTED_IMAGE,
  openingDays: EXPECTED_DAYS,
  openingIntervals: [
    { opens: "10:00", closes: "12:30" },
    { opens: "13:00", closes: "19:00" },
  ],
};

async function loadBuilder() {
  const source = readFileSync(BUILDER_PATH, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: basename(BUILDER_PATH),
  });
  const dataUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  return import(dataUrl);
}

async function buildFixtureGraph() {
  const { buildPracticeJsonLd } = await loadBuilder();
  return buildPracticeJsonLd(practiceFixture);
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

test("production source does not define or use FaqJsonLd", () => {
  const sourceFiles = filesBelow(join(ROOT, "src")).filter((file) =>
    [".ts", ".tsx"].includes(extname(file)),
  );
  const offenders = sourceFiles
    .filter((file) => readFileSync(file, "utf8").includes("FaqJsonLd"))
    .map((file) => relative(ROOT, file));

  assert.deepEqual(offenders, []);
});
