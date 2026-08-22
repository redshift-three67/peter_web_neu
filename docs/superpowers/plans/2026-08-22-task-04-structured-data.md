# Task 4 Structured Data Contract Implementation Plan

> **For Codex:** Execute this plan task-by-task with test-driven development. Do not change the production WordPress site, Plesk, or DNS.

**Goal:** Close the code-controlled part of `STAT-017` with a tested `MedicalBusiness`/`Person` JSON-LD contract while preserving visible FAQ content and removing unsupported production `FAQPage` markup.

**Architecture:** Move JSON-LD construction into a pure TypeScript builder in `src/lib/practice-json-ld.ts`. Keep canonical practice facts in `src/content/site.ts`; the React component only serializes the builder output. A Node test transpiles and imports the real TypeScript builder so the contract is tested without duplicating implementation logic.

**Tech Stack:** TypeScript, React, TanStack Start, Node test runner, TypeScript `transpileModule`, ESLint.

---

### Task 1: Add the failing SEO contract test

**Files:**
- Create: `scripts/seo-contract.test.mjs`
- Test: `scripts/seo-contract.test.mjs`

- [ ] Add a helper that transpiles and imports `src/lib/practice-json-ld.ts` from its real source file.
- [ ] Build a deterministic practice fixture with the canonical image, weekdays, and two opening intervals.
- [ ] Assert exactly one `MedicalBusiness` and one `Person` graph node.
- [ ] Assert that `aggregateRating` is absent and `image` equals `https://rauch-heilpraktiker.de/images/hero-praxis.jpg`.
- [ ] Assert exactly two weekday opening specifications with `10:00–12:30` and `13:00–19:00`.
- [ ] Assert the referenced local hero image exists.
- [ ] Scan production TypeScript/TSX sources and assert that `FaqJsonLd` is neither defined nor used.
- [ ] Run `node --test scripts/seo-contract.test.mjs` and record the expected RED result caused by the missing builder and current FAQPage implementation.

### Task 2: Implement the minimal JSON-LD contract

**Files:**
- Create: `src/lib/practice-json-ld.ts`
- Modify: `src/content/site.ts`
- Modify: `src/components/site/JsonLd.tsx`

- [ ] Add typed, readonly-compatible builder input contracts.
- [ ] Return a graph containing one `MedicalBusiness` and one `Person`.
- [ ] Use the absolute schema image and map the two canonical opening intervals.
- [ ] Preserve NAP, geo, service area, association, and social profile data.
- [ ] Do not emit `aggregateRating`.
- [ ] Make `PracticeJsonLd` serialize only the pure builder result.
- [ ] Remove the obsolete `FaqJsonLd` export.

### Task 3: Remove unsupported FAQPage markup without removing visible FAQs

**Files:**
- Modify: `src/routes/index.tsx`
- Modify: `src/components/site/NlsNeko.tsx`
- Modify: `src/components/site/AnliegenHub.tsx`
- Modify: `src/components/site/HubFromArchive.tsx`

- [ ] Remove only `FaqJsonLd` imports and JSX calls.
- [ ] Preserve all visible FAQ components, questions, answers, and navigation.
- [ ] Run `node --test scripts/seo-contract.test.mjs` and require GREEN.

### Task 4: Synchronize canonical status documentation

**Files:**
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json`
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`
- Modify: `docs/relaunch-2026/00-MASTERPLAN.md`
- Modify as needed: `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`

- [ ] Record the implemented and tested facts in JSON and Markdown consistently.
- [ ] Use `bestätigt mit Einschränkungen` while external schema-validator/developer approval remains outstanding.
- [ ] Mark only genuinely completed Task-4 checkboxes.
- [ ] Preserve historical findings as historical context instead of silently rewriting them.
- [ ] Validate the JSON file parses successfully.

### Task 5: Run all gates and verify the local live view

**Files:**
- Verify: all Task-4 changes

- [ ] Run `node --test scripts/seo-contract.test.mjs`.
- [ ] Run `npm test`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint` and distinguish known warnings from new failures.
- [ ] Start the isolated development server and open the local site in the Codex/Chrome browser.
- [ ] Inspect rendered JSON-LD, HTTP status, and browser console; do not interact with production administration.

### Task 6: Create the developer/LLM handoff and synchronize Git

**Files:**
- Create: `docs/developer-handoffs/2026-08-22-task-04-structured-data/FERTIGMELDUNG.md`
- Create: `docs/developer-handoffs/2026-08-22-task-04-structured-data/review-request.json`

- [ ] Document exact files, commits, verification commands/results, known warnings, live-view evidence, and remaining external approval.
- [ ] Commit the focused implementation and handoff artifacts.
- [ ] Fast-forward `relaunch-konzept` only after confirming its remote base is unchanged.
- [ ] Push without force, fetch again, and verify local HEAD equals `origin/relaunch-konzept`.
- [ ] Report the exact synchronized SHA and the handoff path to the user.
