# Task 7 External Anamnese Boundary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the accidental local anamnesis form, storage, and inbox functionality while preserving the internal information page and linking securely to the independent Lovable application.

**Architecture:** The relaunch website owns only an informational route and a canonical external link constant. The Lovable application remains a completely separate system. Historical database migration files remain untouched, but no production TypeScript/TSX source may read from or write to `anamnesis_submissions`.

**Tech Stack:** TypeScript, React, TanStack Start/Router, Node test runner, ESLint, Chrome live verification.

---

### Task 1: Add the failing health-data boundary contract

**Files:**
- Create: `scripts/health-data-boundary.test.mjs`
- Test: `scripts/health-data-boundary.test.mjs`

- [ ] **Step 1: Write the source-contract tests**

Create tests using `node:test`, `node:assert/strict`, and `node:fs`. Define absolute paths from `import.meta.dirname` and recursively scan `src/**/*.ts` and `src/**/*.tsx`.

The tests must implement these assertions:

```js
test("production source contains no local anamnesis implementation", () => {
  assert.equal(existsSync(WIZARD_PATH), false);
  const offenders = sourceFiles
    .filter((file) => /submitAnamnese|anamnesis_submissions/.test(readFileSync(file, "utf8")))
    .map((file) => relative(ROOT, file));
  assert.deepEqual(offenders, []);
});

test("information route links securely to the independent application", () => {
  const route = readFileSync(INFO_ROUTE_PATH, "utf8");
  assert.match(route, /externalLinks\.anamneseApp/);
  assert.match(route, /target="_blank"/);
  assert.match(route, /rel="noopener noreferrer"/);
  assert.doesNotMatch(route, /<\/?(?:form|input|textarea|select|iframe)\b/i);
  assert.doesNotMatch(route, /AnamneseWizard|submitAnamnese/);
});

test("authenticated inbox contains contact messages only", () => {
  const actions = readFileSync(ACTIONS_PATH, "utf8");
  const inbox = readFileSync(INBOX_ROUTE_PATH, "utf8");
  assert.doesNotMatch(actions, /anamnesis_submissions|forms/);
  assert.doesNotMatch(inbox, /Anamnesen|\.forms/);
});

test("legacy route and historical migration remain intact", () => {
  assert.match(
    readFileSync(LEGACY_ROUTE_PATH, "utf8"),
    /redirect\(\{ href: "\/online-anamnesebogen" \}\)/,
  );
  assert.equal(existsSync(MIGRATION_PATH), true);
});
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```bash
node --test scripts/health-data-boundary.test.mjs
```

Expected: nonzero exit. The failure output must identify the existing wizard, `submitAnamnese`, `anamnesis_submissions`, missing external-only route contract, and inbox `forms` path. Do not change production code before this result is recorded.

### Task 2: Establish the external application contract and information page

**Files:**
- Create: `src/content/external-links.ts`
- Modify: `src/content/slides.ts`
- Modify: `src/routes/online-anamnesebogen.tsx`
- Modify: `src/routes/downloadbereich-naturheilpraxis-rauch.tsx`
- Modify: `src/routes/datenschutzerklaerung.tsx`
- Test: `scripts/health-data-boundary.test.mjs`

- [ ] **Step 1: Add the canonical external link**

Create:

```ts
export const externalLinks = {
  anamneseApp: "https://naturheilpraxis-rauch.lovable.app/",
} as const;
```

- [ ] **Step 2: Use the constant in the home slider**

Add:

```ts
import { externalLinks } from "@/content/external-links";
```

Replace the hard-coded slider URL with:

```ts
href: externalLinks.anamneseApp,
```

- [ ] **Step 3: Replace the local wizard section with an external-only explanation**

Remove the `AnamneseWizard` import. Import `ExternalLink`, `Phone`, `Button`, `practice`, and `externalLinks`. Keep `HubFromArchive`, `Container`, `Disclaimer`, metadata, and the route definition.

The local section must render this content and anchor contract:

```tsx
<Container className="max-w-3xl pb-16">
  <h2 className="font-display text-3xl font-semibold text-sage-700">
    Eigenständige Patienten-App
  </h2>
  <p className="mt-3 text-base leading-relaxed text-muted">
    Der Anamnesebogen wird nicht auf dieser Website ausgefüllt oder gespeichert.
    Über den folgenden Link wechseln Sie zur eigenständigen App der
    Naturheilpraxis Rauch.
  </p>
  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    <Button asChild variant="clay" size="lg">
      <a
        href={externalLinks.anamneseApp}
        target="_blank"
        rel="noopener noreferrer"
      >
        Zur eigenständigen Patienten-App
        <ExternalLink aria-hidden="true" />
      </a>
    </Button>
    <Button asChild variant="outline" size="lg">
      <a href={`tel:${practice.phoneTel}`}>
        <Phone aria-hidden="true" />
        Telefonisch anfragen
      </a>
    </Button>
  </div>
  <p className="mt-4 text-sm text-muted">
    Die externe App öffnet in einem neuen Fenster. Bei Notfällen wählen Sie 112;
    das Formular ist kein Notfallweg.
  </p>
  <Disclaimer className="mt-8" />
</Container>
```

- [ ] **Step 4: Correct the download-page statement**

Replace the claim that the intake form is hosted on the website with:

```tsx
<p>
  Der Anamnesebogen und weitere Unterlagen werden über die eigenständige
  Patienten-App der Naturheilpraxis bereitgestellt. Auf dieser Website werden
  keine Gesundheitsdaten erfasst oder gespeichert.
</p>
```

Keep its existing internal `<Link to="/online-anamnesebogen">` so visitors see the boundary explanation before leaving the domain.

- [ ] **Step 5: Correct the active privacy statement**

Remove the incorrect claim that anamnesis data is transmitted through the relaunch domain. State that the contact form is for general organizational requests without health data and that the independently operated external app provides its own privacy information.

### Task 3: Remove every local health-data code path

**Files:**
- Delete: `src/components/site/AnamneseWizard.tsx`
- Modify: `src/lib/actions.ts`
- Modify: `src/routes/praxis.tsx`
- Verify unchanged: `migrations/0002_practice.sql`
- Test: `scripts/health-data-boundary.test.mjs`

- [ ] **Step 1: Delete the local wizard**

Delete `src/components/site/AnamneseWizard.tsx`. Do not retain a disabled or hidden version.

- [ ] **Step 2: Remove the local server submission contract**

Delete `anamneseSchema`, `AnamneseInput`, and `submitAnamnese` from `src/lib/actions.ts`.

Replace the `listInbox` handler body with the contact-only contract:

```ts
export const listInbox = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const contacts = await sql<{
      id: string;
      created_at: string;
      name: string;
      email: string;
      phone: string;
      topic: string;
      message: string;
    }>`
      select id, created_at, name, email, phone, topic, message
      from contact_messages
      order by created_at desc
      limit 50
    `;
    return { contacts };
  });
```

- [ ] **Step 3: Remove the local anamnesis inbox UI**

Change the rejected-load fallback to:

```ts
.catch(() => setData({ contacts: [] }));
```

Replace the two-column messages/anamneses grid with one messages section. Remove the entire “Anamnesen” section and every `data?.forms` reference.

- [ ] **Step 4: Verify the historical migration was not changed**

Run:

```bash
git diff -- migrations/0002_practice.sql
```

Expected: no output. Do not drop the table and do not delete stored rows.

- [ ] **Step 5: Run the targeted test and verify GREEN**

Run:

```bash
node --test scripts/health-data-boundary.test.mjs
```

Expected: all four boundary tests pass.

- [ ] **Step 6: Commit the focused source boundary**

Stage the boundary test, external-link contract, route corrections, wizard deletion, action cleanup, and inbox cleanup. Commit with:

```bash
git commit -m "fix: remove local health data handling"
```

### Task 4: Synchronize the canonical status documents

**Files:**
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json`
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`
- Modify: `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`
- Modify: `docs/relaunch-2026/00-MASTERPLAN.md`
- Modify: `docs/relaunch-2026/04-paritaetsabgleich-welle1.md`

- [ ] **Step 1: Correct the historical architecture statements**

Record the prior wizard/SQL path as a historical finding and the Product Owner correction as the current contract. Remove claims that a local wizard is “functionally better” or intended.

- [ ] **Step 2: Rewrite Masterplan Task 7 to the approved boundary**

Replace the feature-flag steps with completed, evidence-based checklist items for:

```md
- [x] Roten Boundary-Test gegen Wizard, Submit, Tabellenzugriff und lokalen Inbox-Pfad ausführen.
- [x] Lokalen Wizard, Submit-Endpunkt und Anamnese-Inbox vollständig entfernen.
- [x] Interne Informationsseite mit sicherem externen Link zur eigenständigen Lovable-App ausgeben.
- [x] `/anamnese` als Kompatibilitätsweiterleitung erhalten.
- [x] Historische Migration und bestehende Daten unverändert lassen.
- [x] Tests, Typecheck, Lint, Build und Chrome-Liveprüfung ausführen.
```

- [ ] **Step 3: Update `STAT-018` conservatively**

Set `STAT-018.status` to `bestätigt` only for the relaunch website. State explicitly in `ist_zustand`, `nachweis`, and `naechster_schritt` that the external Lovable application's privacy/storage lifecycle is a separate system and was not reviewed by this repository task.

- [ ] **Step 4: Validate documentation consistency**

Parse the JSON matrix and run targeted searches proving that active documentation no longer instructs implementation of `HEALTH_FORM_SUBMISSION_ENABLED` or a local wizard. Historical sections must be labeled as historical.

- [ ] **Step 5: Commit the synchronized status documents**

Commit with:

```bash
git commit -m "docs: align anamnesis boundary status"
```

### Task 5: Run release-proportionate verification and Chrome live inspection

**Files:**
- Verify: all Task-7 changes

- [ ] **Step 1: Run all automated gates**

Run:

```bash
node --test scripts/health-data-boundary.test.mjs
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: targeted tests and full suite pass; typecheck and build exit 0; lint has 0 errors and only the three documented baseline warnings.

The build rewrites tracked generator output in this repository. After recording the successful build, restore only `.vercel/output` and `src/routeTree.gen.ts` to the current source commit; confirm no Task-7 source or documentation file is discarded.

- [ ] **Step 2: Inspect the local route in Chrome**

Start the isolated development server and inspect `http://localhost:8080/online-anamnesebogen` without submitting data. Confirm:

- page renders successfully;
- external href is exact;
- `target="_blank"` and `rel` contains `noopener` and `noreferrer`;
- counts for form, input, textarea, select, and iframe are zero;
- no local health-data request occurs;
- console has no new warnings or errors.

- [ ] **Step 3: Review the focused diff**

Run `git diff --check`, verify `migrations/0002_practice.sql` is absent from the diff, and request a read-only code review before integration.

### Task 6: Create the developer/LLM handoff and synchronize Git

**Files:**
- Create: `docs/developer-handoffs/2026-08-22-task-07-external-anamnese/01-FERTIGMELDUNG.md`
- Create: `docs/developer-handoffs/2026-08-22-task-07-external-anamnese/02-LLM-PRUEFAUFTRAG.md`
- Create after first sync: `docs/developer-handoffs/2026-08-22-task-07-external-anamnese/03-VERIFIKATIONSSTATUS.json`

- [ ] **Step 1: Record exact implementation evidence**

Document base/design/plan/implementation/review SHAs, RED and GREEN results, full gates, Chrome evidence, files deleted/modified, and the unchanged migration.

- [ ] **Step 2: State the external-system boundary**

The handoff must say that Lovable was checked only for public reachability/destination. It must not claim review of restricted forms, authentication, storage, consent, PDF access, or deletion processes.

- [ ] **Step 3: Integrate without history rewriting**

Fetch `origin/relaunch-konzept`, require a clean canonical worktree and unchanged remote base, fast-forward the Task-7 branch, push without force, fetch again, and compare local and remote SHAs.

- [ ] **Step 4: Add final machine-readable synchronization evidence**

Create the valid JSON verification artifact, commit it, fast-forward/push once more, and repeat the final fetch/SHA/clean-worktree verification.
