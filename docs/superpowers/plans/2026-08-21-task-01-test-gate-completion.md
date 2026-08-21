# Task 1 Test-Gate Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das plattformübergreifende npm-Test-Gate rekursiv, nulltreffersicher und vollständig dokumentiert abschließen.

**Architecture:** Ein fokussierter Node-Runner ermittelt Testdateien unabhängig von Shell-Glob-Semantik und startet den eingebauten Node-Testprozess. Exportierte Funktionen erlauben echte Regressionstests für leere, verschachtelte und fehlschlagende Testläufe.

**Tech Stack:** Node.js 22 ESM, `node:test`, `node:assert`, Git, Markdown, JSON, Prettier.

---

### Task 1: Runner testgetrieben implementieren

**Files:**

- Create: `scripts/run-tests.test.mjs`
- Create: `scripts/run-tests.mjs`
- Modify: `package.json:16`

- [ ] **Step 1:** Regressionstests für rekursive Ermittlung, Nulltreffer-Exitcode 1 und Child-Exitcode-Weitergabe schreiben.
- [ ] **Step 2:** `node --test scripts/run-tests.test.mjs` ausführen und den erwarteten Importfehler für das noch fehlende Modul bestätigen.
- [ ] **Step 3:** Minimalen Runner mit `discoverTestFiles()` und `runTestSuite()` implementieren.
- [ ] **Step 4:** `package.json` auf `node scripts/run-tests.mjs` umstellen.
- [ ] **Step 5:** Regressionstest und vollständiges `npm test` grün ausführen.

### Task 2: Kanonische Statusdokumente konsolidieren

**Files:**

- Modify: `docs/relaunch-2026/00-MASTERPLAN.md`
- Modify: `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json`
- Modify: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`

- [ ] **Step 1:** Historische Null-Test-Baseline von der aktuellen Statusfortschreibung unterscheiden.
- [ ] **Step 2:** `STAT-003` erst nach grünem Nulltreffer-Test bestätigen, `STAT-004` fortschreiben und `STAT-003` aus offenen `STAT-024`-Abhängigkeiten entfernen.
- [ ] **Step 3:** Masterplan Task 1, Risikoübersicht, Vollbericht und nächste Maßnahme widerspruchsfrei aktualisieren.

### Task 3: Verifizieren, übergeben und synchronisieren

**Files:**

- Create: `docs/developer-handoffs/2026-08-21-task-01-test-gate/01-FERTIGMELDUNG.md`
- Create: `docs/developer-handoffs/2026-08-21-task-01-test-gate/02-LLM-PRUEFAUFTRAG.md`
- Create: `docs/developer-handoffs/2026-08-21-task-01-test-gate/03-VERIFIKATIONSSTATUS.json`

- [ ] **Step 1:** Tests, leeren Testordner, Typecheck, Lint, Prettier, JSON-/Markdown-Deckung und Diff prüfen.
- [ ] **Step 2:** Implementierungscommit mit exakt dokumentiertem Umfang erstellen.
- [ ] **Step 3:** Übergabeordner mit Commit, Prüfwerten, Restwarnungen und nächstem Prüfauftrag erstellen und committen.
- [ ] **Step 4:** Feature-Branch per Fast-forward integrieren, ohne Force pushen und lokalen/echten Remote-SHA vergleichen.
