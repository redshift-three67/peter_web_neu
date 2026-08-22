# Task 7 External Anamnese Boundary Design

## Context and authoritative correction

Task 7 was originally described as a feature-flagged local health-form submission. The Product Owner clarified on 2026-08-22 that this architecture is incorrect: the relaunched `rauch-heilpraktiker.de` website must not contain, embed, submit, store, list, or otherwise operate an online anamnesis form. It only links to the independently developed application at `https://naturheilpraxis-rauch.lovable.app/`.

Read-only verification found that the current production WordPress page already follows the intended boundary:

- `https://rauch-heilpraktiker.de/online-anamnesebogen/` is an indexable informational page;
- it contains no form, input, textarea, select, or iframe;
- its call to action opens the independent Lovable application in a new window;
- the external application owns its own new-patient and anamnesis/document workflow.

The current relaunch source contradicts that boundary. It contains a local `AnamneseWizard`, a server-side `submitAnamnese` action, a plaintext JSON insert into `anamnesis_submissions`, a local inbox query, and a local “Anamnesen” inbox section. Task 7 removes this accidental architecture rather than placing it behind a feature flag.

## Decision

Use the complete-removal model approved by the Product Owner:

1. retain the internal informational route `/online-anamnesebogen` as a normal HTTP 200 page and SEO target;
2. link from that page to the independent Lovable application with an ordinary external anchor;
3. retain `/anamnese` as a compatibility redirect to the internal informational route;
4. remove every local health-form UI, submit action, write path, and inbox read path;
5. do not embed, proxy, frame, copy, or recreate Lovable application functionality;
6. do not delete or rewrite existing database tables or stored data during this task.

## Considered approaches

### A. Complete local removal with informational bridge page — selected

This matches the Product Owner directive and current production behavior. It removes the attack and privacy surface while preserving the established public URL, its explanation, and internal link equity.

### B. Keep local functionality behind `HEALTH_FORM_SUBMISSION_ENABLED`

Rejected. Dead health-data code, fields, SQL, and UI would remain in the website and could be reactivated accidentally. It also misrepresents the actual product boundary.

### C. Redirect every website link directly to Lovable and remove the internal page

Rejected. This would discard an existing indexed information page, weaken user orientation, and couple SEO/navigation behavior directly to an independently deployed application.

## Architecture

### Internal informational route

`src/routes/online-anamnesebogen.tsx` remains the canonical internal page. It renders explanatory content and one prominent external call to action. The copy explicitly states:

- the anamnesis workflow is not processed on this website;
- the link opens the independent practice application;
- the form is not an emergency channel;
- appointments remain available by telephone.

The route must render no local form controls and must not import any health-data action or wizard.

### External application contract

Create `src/content/external-links.ts` with one canonical constant:

```ts
export const externalLinks = {
  anamneseApp: "https://naturheilpraxis-rauch.lovable.app/",
} as const;
```

The informational route and existing home-slider link use this constant. The anchor contract is:

```tsx
<a
  href={externalLinks.anamneseApp}
  target="_blank"
  rel="noopener noreferrer"
>
  Zur eigenständigen Patienten-App
</a>
```

There is no iframe, script bridge, API proxy, shared database, shared authentication, or automatic data transfer between the website and Lovable app in this task.

### Local functionality removal

Delete `src/components/site/AnamneseWizard.tsx`.

Remove from `src/lib/actions.ts`:

- `anamneseSchema`;
- `AnamneseInput`;
- `submitAnamnese`;
- the `anamnesis_submissions` query inside `listInbox`;
- the `forms` property returned by `listInbox`.

Update `src/routes/praxis.tsx` so the authenticated inbox displays contact messages only. Remove the “Anamnesen” section and all `forms` fallback/data handling.

Update `src/routes/downloadbereich-naturheilpraxis-rauch.tsx` so it no longer claims that the intake form is hosted on the website. Its call to action may lead to the retained internal information page; the external boundary is then explicit before the user leaves the domain.

Update `src/routes/datenschutzerklaerung.tsx` so the active privacy copy no longer claims that anamnesis data is transmitted through the relaunch domain. It must distinguish the website contact form from the independently operated external application and direct visitors to the privacy information provided by that application for its processing.

### Existing database migration

`migrations/0002_practice.sql` remains unchanged. It is historical and may already have been applied. Task 7 does not drop `anamnesis_submissions`, delete rows, or rewrite migration history. After the code removal, the website has no production read or write path to that table.

Any later database-retention or deletion decision requires a separate, authorized data-governance task with backup, retention, and recovery evidence.

Generated deployable output is not a source artifact. `.vercel/output` must not be tracked because a historical prebuilt bundle could otherwise retain and redeploy removed health-data functionality. Release output is rebuilt from the verified source commit.

## Route and navigation behavior

- `/online-anamnesebogen` remains a local 200 information page and remains in the sitemap.
- `/anamnese` continues to redirect to `/online-anamnesebogen`.
- Existing internal navigation links may continue to target `/online-anamnesebogen`.
- The external CTA visibly identifies the destination as the independent practice application and opens a new browser context.
- No website route presents local anamnesis input fields or a local submission-success state.

## Test strategy

Create `scripts/health-data-boundary.test.mjs` so the existing `npm test` runner discovers it without changing the Task-1 test-gate contract.

The contract test reads the real production sources and verifies:

1. `src/components/site/AnamneseWizard.tsx` does not exist;
2. no TypeScript/TSX production source contains `submitAnamnese`;
3. no TypeScript/TSX production source contains `anamnesis_submissions`;
4. the informational route contains the canonical external-link constant and no `<form`, `<input`, `<textarea`, `<select`, `<iframe`, or wizard reference;
5. the external anchor uses `target="_blank"` and `rel="noopener noreferrer"`;
6. `src/routes/praxis.tsx` contains no local anamnesis inbox section or `forms` access;
7. the compatibility route `/anamnese` still redirects to `/online-anamnesebogen`;
8. the historical migration file still exists.
9. `.vercel/output` contains no tracked deployable files.

The implementation diff is separately checked to prove that the historical migration was not modified. The source contract does not infer database history from file contents.

The test is written and run before any production code change. Its initial RED result must identify the currently present local wizard/action/table access and missing external-only route contract.

## Live verification

After implementation, start the isolated local site and inspect `/online-anamnesebogen` in Chrome:

- HTTP/render succeeds;
- one clear page heading is present;
- the external CTA resolves exactly to `https://naturheilpraxis-rauch.lovable.app/`;
- `target` and `rel` are correct;
- form/input/textarea/select/iframe counts are all zero;
- no health-data request is sent;
- browser console contains no new warnings or errors.

The external app is checked only for reachability and correct destination. No fields are completed, no files are downloaded, and no forms are submitted.

## Documentation and status

Synchronize:

- `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json`;
- `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`;
- `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`;
- `docs/relaunch-2026/00-MASTERPLAN.md`;
- `docs/relaunch-2026/04-paritaetsabgleich-welle1.md` where it currently describes the local wizard as a parity improvement.

`STAT-018` may be marked `bestätigt` for the relaunch website only when fresh tests prove there is no local health-data UI, write path, or inbox read path. The independent Lovable application's privacy, authentication, storage, and lifecycle remain outside this repository's Task-7 verification and must not be silently claimed as reviewed.

## Non-goals

- modifying or deploying the Lovable application;
- testing restricted Lovable workflows with real or synthetic health data;
- changing WordPress, Plesk, DNS, or production content;
- deleting the historical database table or any existing records;
- implementing a PDF download on the relaunch website;
- redesigning unrelated contact-form or authentication behavior;
- changing URL migration, redirect middleware, or sitemap policy beyond preserving the current information route.

## Acceptance criteria

Task 7 is code-complete when:

- the local wizard and all local anamnesis actions are absent;
- the website has no TypeScript/TSX reference to `anamnesis_submissions`;
- the authenticated inbox no longer queries or displays anamnesis submissions;
- `/online-anamnesebogen` is an informational page with a secure external link and no embedded functionality;
- `/anamnese` still resolves to the information route;
- no database table or stored data was destructively changed;
- targeted tests, `npm test`, typecheck, lint, build, and Chrome live verification pass;
- canonical status documents and the dedicated developer/LLM handoff state the website/app boundary accurately;
- local and GitHub SHAs match after a real fetch.
