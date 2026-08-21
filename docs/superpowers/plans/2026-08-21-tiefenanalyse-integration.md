# Tiefenanalyse Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Den extern erzeugten Tiefenbericht beweisgestützt korrigieren, als kanonische Übergabeakte einschließlich echter JSON-Statusmatrix in das Rauch-Repository aufnehmen, im Masterplan verankern und sicher zu GitHub synchronisieren.

**Architecture:** Der Bericht bleibt eine zeitpunktbezogene Prüfakte des Quellcommits `c6aa58e`; der Masterplan bleibt die handlungsleitende Quelle. Eine Markdown-Übersicht dient Menschen und eine vollständige JSON-Datei automatisierten Werkzeugen. Dynamische Live-Befunde werden mit Prüfdatum und Prüfgrenze gekennzeichnet.

**Tech Stack:** Markdown, JSON, Git, PowerShell, Node.js, npm, Prettier.

---

## Dateistruktur

- Create: `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md` — beweisgestützter 28-Kapitel-Prüfbericht.
- Create: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md` — menschenlesbare Erklärung plus eingebettete Matrix.
- Create: `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json` — direkt parsebare kanonische JSON-Matrix.
- Modify: `docs/relaunch-2026/00-MASTERPLAN.md` — Dokumentenhierarchie, Prüfstand und Verweise.
- Create: `docs/superpowers/plans/2026-08-21-tiefenanalyse-integration.md` — ausführbarer Integrationsplan.

### Task 1: Aussagen gegen Primärnachweise prüfen

- [x] **Step 1:** Git-Stand mit `git status --short --branch`, `git rev-parse HEAD`, `git rev-parse origin/relaunch-konzept` und `git rev-list --count origin/main..HEAD` erfassen.
- [x] **Step 2:** Lokale Zählwerte für Routen, Komponenten, WordPress-Seiten, Sitemap, Medien und Dateigrößen deterministisch aus dem Quellbaum ermitteln.
- [x] **Step 3:** `package.json`, `vite.config.ts`, `JsonLd.tsx`, `actions.ts`, `design-skin.ts` und `0002_practice.sql` an den im Bericht genannten Stellen lesen.
- [x] **Step 4:** Öffentliche Startseite, `robots.txt`, `page-sitemap.xml` und Redirectvarianten mit Zeitstempel prüfen; nicht zugängliche GSC-/Plesk-Daten als nicht prüfbar kennzeichnen.

### Task 2: Kanonische Tiefenanalyse erstellen

- [x] **Step 1:** Den externen Bericht in das Repository übernehmen und jede überzogene oder falsche Aussage korrigieren.
- [x] **Step 2:** Den 28-Kapitel-Bericht mit belegtem Ist-Zustand, Prüfgrenzen, Lücken und Gates erstellen; die vollständigen Soll-/Ist-/Nachweis-/Abnahmefelder je Prüfgegenstand in der JSON-Matrix führen.
- [x] **Step 3:** Sitemap-Differenz von tatsächlicher Erreichbarkeit beziehungsweise Deindexierungsgefahr unterscheiden.
- [x] **Step 4:** Recht, E-E-A-T, Accessibility, Performance und Go-live-Reife nur im Umfang der vorhandenen Evidenz bewerten.

### Task 3: Statusmatrix für Menschen und Maschinen konsolidieren

- [x] **Step 1:** Matrix um alle wesentlichen Git-, QA-, SEO-, Content-, Medien-, Datenschutz-, Deployment- und Datenabhängigkeiten erweitern.
- [x] **Step 2:** Die vollständige Statusquelle mit Provenienzblock und 29 Statusobjekten in `.json` sowie eine deckungsgleiche 29-Zeilen-Übersicht mit Feldvertrag in `.md` ablegen.
- [x] **Step 3:** Mit PowerShell `ConvertFrom-Json` die JSON-Datei parsen und Anzahl sowie IDs gegen die Markdown-Übersicht prüfen.

### Task 4: Masterplan verankern und vollständig verifizieren

- [x] **Step 1:** Masterplan-Version erhöhen und die Dokumentenhierarchie mit Rollen und Vorrangregeln ergänzen.
- [x] **Step 2:** `npx prettier --check` für alle neuen beziehungsweise geänderten Dokumente ausführen.
- [x] **Step 3:** `git diff --check`, JSON-Parsing, Geheimnismusterprüfung und Link-/Pfadprüfung ausführen.
- [x] **Step 4:** `node --test scripts/*.test.mjs`, `npm run typecheck`, `npm run lint` und den Produktions-Build frisch ausführen.
- [x] **Step 5:** Änderungen committen, ohne Force-Push in `relaunch-konzept` integrieren, zu `origin/relaunch-konzept` pushen und lokalen/entfernten Gleichstand verifizieren.
