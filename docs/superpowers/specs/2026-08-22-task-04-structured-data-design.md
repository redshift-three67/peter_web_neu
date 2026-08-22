# Task 4 Structured Data Contract Design

## Context

Task 1 closed the nonzero test gate on commit `a5ec8fe454416322720777f8f83d8ec8a135e22c`. Task 4 now addresses `STAT-017`: the current `MedicalBusiness` JSON-LD contains a relative image URL, a self-referential `aggregateRating`, and one continuous weekday interval despite the documented lunch break.

The public practice page and the repository snapshot agree on the practice address, telephone, email, and weekday hours. The public page states Monday through Friday, 10:00–19:00, with a break from 12:30–13:00. The asset `public/images/hero-praxis.jpg` exists.

## Goal

Produce deterministic, testable practice JSON-LD with only evidenced data:

- no `aggregateRating` in `MedicalBusiness`;
- absolute image URL `https://rauch-heilpraktiker.de/images/hero-praxis.jpg`;
- exactly two `OpeningHoursSpecification` objects;
- both objects apply to Monday through Friday;
- intervals are 10:00–12:30 and 13:00–19:00;
- visible FAQ content remains, but no production `FAQPage` JSON-LD is emitted.

## Non-goals

- No change to visible review cards or quotations.
- No change to the production WordPress site, Plesk, DNS, redirects, sitemap, or URL matrix.
- No new ratings, opening days, contact data, or other business claims.
- No attempt to close unrelated SEO, content, accessibility, deployment, or migration gates.

## Considered approaches

### A. Static source assertions only

`scripts/seo-contract.test.mjs` could search `JsonLd.tsx` for expected text. This is fast and dependency-free, but it can pass on comments or dead code and does not verify the generated object.

### B. Extract a pure structured-data builder

Move the practice graph construction into `src/lib/practice-json-ld.ts`. `PracticeJsonLd` renders the returned object, while the Node test transpiles and imports this pure TypeScript module using the already installed `typescript` package. This tests the production builder without adding runtime dependencies or booting the application.

This is the selected approach because it verifies behavior rather than formatting and keeps JSX rendering separate from schema construction.

### C. Browser-only assertion

A browser test could inspect the rendered script element. This is valuable as a final smoke check but is too slow and environment-dependent to be the only regression gate.

## Architecture

### Authoritative practice data

`src/content/site.ts` remains the single source for practice data and gains three explicit structured fields:

- `schemaImage` with the absolute canonical image URL;
- `openingDays` containing Monday through Friday;
- `openingIntervals` containing the two evidenced time ranges.

The existing human-readable `hours` and `hoursShort` strings remain unchanged.

### Pure JSON-LD builder

`src/lib/practice-json-ld.ts` exports:

- a minimal `PracticeSchemaInput` interface;
- `buildPracticeJsonLd(practice: PracticeSchemaInput)`.

The function produces the current `@context` and `@graph`, preserves all evidenced practice and person properties, maps both opening intervals, and never accepts or emits review data.

### React rendering

`src/components/site/JsonLd.tsx` imports `practice` and `buildPracticeJsonLd`. `PracticeJsonLd` only serializes the returned object into the `application/ld+json` script element.

The unused `FaqJsonLd` export is removed. Its production imports and JSX calls are removed from:

- `src/routes/index.tsx`;
- `src/components/site/NlsNeko.tsx`;
- `src/components/site/AnliegenHub.tsx`;
- `src/components/site/HubFromArchive.tsx`.

The visible FAQ arrays and rendered FAQ sections remain unchanged.

## Test design

`scripts/seo-contract.test.mjs` loads the production builder and asserts the generated graph directly.

The regression tests cover:

1. the graph contains exactly one `MedicalBusiness` and one `Person`;
2. `aggregateRating` is absent;
3. `image` equals the absolute canonical URL;
4. `openingHoursSpecification` is an array of exactly two objects;
5. both objects apply to the five weekdays;
6. the two exact intervals are emitted in order;
7. the referenced hero image exists;
8. no production source file imports, calls, or defines `FaqJsonLd`.

The first targeted run must fail against the current implementation for the expected contract violations. Only then may production code change.

## Verification

After implementation, run:

```text
node --test scripts/seo-contract.test.mjs
npm test
npm run typecheck
npm run lint
npx prettier --check <all Task-4 files>
git diff --check
```

A local browser smoke check must additionally confirm:

- one `MedicalBusiness` graph;
- no `aggregateRating`;
- absolute image URL;
- two correct opening intervals;
- no `FAQPage` object;
- no browser console warnings or errors introduced by Task 4.

## Status and evidence rules

`STAT-017` is updated only to the strongest status supported by fresh evidence. Code and local browser verification do not silently stand in for an external schema-validator or Product Owner decision. Any remaining external validation is stated explicitly in `ist_zustand`, `nachweis`, `naechster_schritt`, and the Task-4 handoff.

The Markdown matrix and Masterplan are updated consistently. Historical findings remain documented as historical evidence rather than current defects.

## Delivery

Task 4 is delivered as focused commits on `codex/task-04-schema-contract`, followed by a dedicated handoff folder:

`docs/developer-handoffs/2026-08-22-task-04-structured-data/`

After all local gates pass, the branch is fast-forwarded into `relaunch-konzept`, pushed without force, and local plus fetched GitHub SHAs are compared. The next Masterplan task does not begin before the external review requested by the project workflow.

## Acceptance criteria

- The targeted regression test has a documented red-green cycle.
- All structured-data assertions pass against the production builder.
- The visible site content is unchanged.
- Full tests and static checks pass with no new warnings.
- Status documents do not overstate external validation.
- Local and GitHub SHAs are equal after integration and fetch.
