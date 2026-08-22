# Rauch-Pilot Headless-CMS Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die fortgeschrittene TanStack-Start-Version von `rauch-heilpraktiker.de` ohne SEO-, Inhalts- oder Betriebsverlust als erste reale Website in die Headless-Plattform aufnehmen, produktionsfähig machen und anschließend schrittweise an Payload CMS anbinden.

**Architecture:** Die freigegebene Zielarchitektur ist zweistufig. Stufe 1 behält die TanStack-Anwendung als eigenständige `external-app` und registriert/deployt sie als verwalteten Plattform-Workload. Stufe 2 überführt Inhalte, Medien, Redirects und E-E-A-T-Governance über einen versionierten Adapter in Payload CMS; Gesundheits- und Anamnesedaten bleiben außerhalb des allgemeinen CMS und der allgemeinen Plattformdatenbank.

**Tech Stack:** TanStack Start, React 19, TypeScript, Vite 8, Nitro 3, Tailwind CSS 4, Node.js, PostgreSQL/PGLite, Better Auth, Playwright, Payload CMS 3, Next.js, Caddy, Docker, Google Search Console.

---

```yaml
document:
  id: rauch-pilot-headless-implementation-plan
  version: 2.1.0
  status: approved_architecture_execution_plan
  updated_at: 2026-08-22
  audience: [product_owner, developer, devops, seo, editor, reviewer, llm_agent]
  production_cutover_authorized: false
  destructive_url_changes_authorized: false
```

## 1. Verbindlicher Ausgangsstand

### 1.1 Git und Quellen der Wahrheit

```yaml
source_repository: https://github.com/redshift-three67/peter_web_neu.git
canonical_branch: relaunch-konzept
audited_head_before_plan_sync: 2287908a032d97c72b3a7fc5e59b0d9cb052cb98
audited_product_head_before_deep_analysis_integration: c6aa58ef980bdd4d84be3fcc9b237e1296693722
deep_analysis_source_head: c6aa58ef980bdd4d84be3fcc9b237e1296693722
deep_analysis_integration_path: docs/tiefenanalyse-2026-08-21/
platform_repository_path: C:\Projekte\Headless_Platform_CMS
platform_base_head_at_deep_analysis: 2d233564ca98ed48a0a118a3165c242150448436
platform_worktree_state_at_deep_analysis: dirty_unversioned_contract_work
audited_tag: rp-31-uebergabe-abend
remote_main_at_audit: 1d535b38d5146675288c483f835bfa8ea29a9995
commits_ahead_of_remote_main_at_deep_analysis: 11
remote_read_access_verified: true
audit_vercel_artifacts_cleaned: true
source_tree_clean_after_cleanup: true
```

`relaunch-konzept` ist die maßgebliche neue Website. `main` bleibt bis zu einer gesondert freigegebenen Integration unverändert. Experimentelle lokale Branches sind keine Produktionsquelle.

#### Dokumentenhierarchie und Übergabevertrag

| Rang | Dokument                                                              | Verbindliche Rolle                                                                            |
| ---: | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
|    1 | `docs/relaunch-2026/00-MASTERPLAN.md`                                 | handlungsleitende Quelle für Architektur, Reihenfolge, Zielverträge und Definition of Done    |
|    2 | `docs/tiefenanalyse-2026-08-21/01-VOLLBERICHT-TIEFENANALYSE.md`       | beweisgestützte Verifikationsakte des Quellcommits `c6aa58e`, Prüfgrenzen und Reifegrad       |
|    3 | `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.json` | kanonische maschinenlesbare Statusquelle für Entwicklerwerkzeuge und LLMs                     |
|    4 | `docs/tiefenanalyse-2026-08-21/02-MASCHINENLESBARE-STATUSMATRIX.md`   | menschenlesbare Erklärung und vollständige Statusübersicht                                    |
|    5 | ältere Übergabe-, Design- und Migrationsakten                         | historische Evidenz, soweit die vier vorgenannten Quellen sie nicht ersetzen oder präzisieren |

Der Tiefenbericht prüft einen festen Quellcommit. Sein enthaltender Integrationscommit verändert ausschließlich die Dokumentationsbasis und darf nicht rückwirkend als neu geprüfter Produktcode ausgegeben werden. Bei Statusänderungen sind Masterplan, Bericht und Statusmatrix konsistent fortzuschreiben; reine Umsetzungshistorie gehört zusätzlich in Commit und Changelog.

| System             | Verifizierter Stand                                                 | Rolle                                         |
| ------------------ | ------------------------------------------------------------------- | --------------------------------------------- |
| alte Live-Website  | WordPress/YOOtheme, Rank Math, nginx/PHP/Plesk                      | Produktion und Rollback bis Cutover           |
| neue Website       | TanStack Start/React/TypeScript/Vite/Nitro                          | Relaunch und externer Plattform-Workload      |
| Headless-Plattform | Payload/Next/Caddy/Docker unter `C:\Projekte\Headless_Platform_CMS` | Registry, Governance, Routing, später Content |

### 1.2 Freigegebene Entscheidungen

1. Rauch wird die erste reale Website der Headless-Plattform.
2. Hybridarchitektur: zuerst `external-app`, danach schrittweise CMS-Inhalte.
3. WordPress bleibt bis zum kontrollierten Cutover unverändert live.
4. Kein sofortiger Vollport in Next/Payload.
5. Bevorzugter Zielbetrieb: `managed-container`; `external-upstream`/Vercel nur als begründeter Rückfallweg.
6. Gerätebilder nur nach ausdrücklicher Freigabe ersetzen.
7. Keine Deindexierung, Massenweiterleitung oder Umschaltung ohne freigegebene 64-URL-Matrix.

### 1.3 Nicht autorisiert

- kein Force-Push, kein Merge nach `main` ohne Freigabe,
- keine Änderung von Live-Domain, DNS, WordPress oder Plesk in der Planphase,
- keine pauschale Weiterleitung entfernter URLs auf `/`,
- keine Gesundheitsdaten in Payload oder allgemeiner Plattformdatenbank,
- keine Logs/PHP-Debugdateien/Formulareinsendungen als Medien,
- keine ungeprüften medizinischen Wirk-, Diagnose- oder Erfolgsbehauptungen.

## 2. Verifizierter Ist-Stand

### 2.1 Alte Live-Seite

```yaml
canonical_host: https://rauch-heilpraktiker.de
http_to_https: 301
www_to_non_www: 301
cms: WordPress
seo: Rank_Math
server: nginx
runtime_observed: PHP_8.2.33
control_panel: Plesk
live_page_sitemap_urls: 64
```

Stärken: etablierte Domain, indexierte Fachseiten, funktionierende Canonicals, langjähriger Inhalt und lokale Profile. Risiken: alte Wirk-/Diagnoseaussagen, 64 unterschiedlich wertvolle Index-URLs, veraltete Snippets, NAP-Abweichungen, große Navigation und mobile/accessibility Schwächen.

Lighthouse-Momentaufnahme der alten Startseite vom 21.08.2026, mobiles Einzel-Labormodell:

| Performance | Accessibility | Best Practices | SEO |   FCP |   LCP |    TBT |   CLS |
| ----------: | ------------: | -------------: | --: | ----: | ----: | -----: | ----: |
|          78 |            95 |            100 | 100 | 2,3 s | 4,4 s | 200 ms | 0,055 |

Dies sind keine CrUX-Felddaten. Das Feld-Gate bleibt Search Console/CWV am 75. Perzentil.

### 2.2 Neue Seite und Checks

```yaml
framework: TanStack_Start
react: 19
vite: 8
nitro: 3.0.260610-beta
current_build_preset: vercel
new_sitemap_urls: 19
primary_hubs: 18
profile_page: /ueber-mich
browser_runs_desktop_and_mobile: 20
browser_errors_or_failed_requests: 0
horizontal_overflow: 0
missing_image_alt_attributes: 0
```

| Check                            | Frisches Ergebnis                                  | Einordnung                                         |
| -------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `npm ci`                         | 418 Pakete installiert                             | reproduzierbar                                     |
| `npm run typecheck`              | Exit 0                                             | grün                                               |
| `npm run lint`                   | Exit 0, 3 Warnungen                                | keine Fehler; Warnungen offen                      |
| `npm test`                       | Exit 0, 44/44 Tests                                | rekursiver Runner und Nulltreffer-Gate bestätigt   |
| `node --test scripts/*.test.mjs` | 41/41 bestanden (historische Ausgangsprüfung)      | Tests existierten bereits                          |
| `npm run build:dev`              | erfolgreich                                        | Vercel-Build möglich                               |
| `npm run build`                  | Exit 0; Migration ohne `DATABASE_URL` übersprungen | Vercel-Build bestätigt; kein Node-Containervertrag |
| `npm run preview`                | HTTP 500                                           | falscher Build-/Startvertrag; P0                   |
| Hauptchunk                       | 1.016,88 kB minifiziert / 200,65 kB gzip           | Code-Splitting P1                                  |

Lint-Warnungen: `scripts/wp-public-crawl.mjs` (ungenutzter Import), `src/components/site/DesignSkin.tsx` (Fast-Refresh-Grenze), `src/lib/auth/use-current-user.ts` (ungenutzte ESLint-Deaktivierung).

Bereits umgesetzt und zu bewahren:

- Relaunch-Design ist seit Tag `rp-29-default-relaunch-design` der Default; `?look=alt` bleibt als visueller Fallback.
- verbindliche Tokens: Paper `#F7F1E8`, Ink `#1D2C38`, Field `#16332C`, Sage `#3F6B52`, Clay `#C07859`, Signal `#8A4B32`; NLS-Diagnosevariante mit Petrol `#3A5258`.
- lokale Playfair- und Source-Sans-3-Schriften, Body 18 px/1,65, Playfair nur für H1/Kapitelüberschriften.
- Sticky Mobile-CTA mit mindestens 44-px-Touchzielen und Safe-Area-Berücksichtigung.
- 18 Hub-URLs auf alten WordPress-Pfaden, Archivroute für weitere Slugs und 19 URLs in der neuen Sitemap.
- Startseite mit WordPress-Sliderinhalten, Verfahrensverzeichnis, Sprechzeiten und Schlussbereich.
- Anliegen-Hubs Schmerz, Erschöpfung/Burnout und Allergie/NAET mit Einordnung, Grenzen, Quellen, FAQ, NAP und CTA.
- Archivbilder als thematische Karten im Inhaltsfluss; keine nachgelagerte Ersatzgalerie.
- `node scripts/parity-audit.mjs` als erneuerbares Prüfwerkzeug; Prozentwerte sind Hinweise, keine Qualitätsnoten.

Historische Detailakten bleiben verbindliche Ergänzungen, soweit dieser Masterplan sie nicht ausdrücklich ersetzt: `docs/design-a-plus-c/00-FESTLEGUNG.md`, `docs/relaunch-2026/03-design-system-relaunch.md`, `04-paritaetsabgleich-welle1.md`, `05-tiefenanalyse-paritaet.md` und `docs/migration/changelog.md`.

### 2.3 WordPress, Rank Math und Medien

| Artefakt         | Pfad                                                | Umfang                                              |
| ---------------- | --------------------------------------------------- | --------------------------------------------------- |
| WordPress-Crawl  | `content/wordpress/manifest.json`                   | 64 Seiten, 80 Live-Medien, 0 Fehler                 |
| Seiten-JSON      | `content/wordpress/pages/*.json`                    | Meta, Robots, Headings, Text, Links, Bilder         |
| HTML-Archiv      | `content/wordpress/html/*.html`                     | öffentliche Renderbasis                             |
| Live-Snapshot    | `content/wordpress/live-snapshot-2026-08-21/`       | 18 Seiten                                           |
| Rank-Math-Export | `content/wordpress/rank-math-settings.json`         | General, Titles, Sitemap, Local SEO, Robots, Module |
| Uploadinventar   | `content/wordpress/uploads-incoming-inventory.json` | 661 Dateien                                         |
| Bildmapping      | `content/wordpress/image-map.json`                  | Quell-/Zielzuordnung                                |

Der Rank-Math-Redirect-Array ist leer. URL-Level-Fokuskeywords und interne Einzelfelder fehlen; öffentlich wirksame Titles, Descriptions, Robots und Canonicals wurden gecrawlt. WXR/XML fehlt, ist für die aktuelle Analyse nicht blockierend, muss aber vor WordPress-Abschaltung als Archiv erzeugt werden.

`bilder.zip` enthält 666 Einträge, davon 657 Bilder. 607 Rasterdateien sind byteidentisch im Repo, alle 50 SVGs nach Textnormalisierung identisch; neue Bilder: 0. Sechs MP3 fehlen, werden aber nicht automatisch importiert. Log, Fortschritts-JSON und leere PHP-Debugdatei bleiben ausgeschlossen. Bildrechte müssen separat belegt werden.

### 2.4 Search Console und Plesk

Die Search-Console-Property wurde am 21.08.2026 neu verbunden. `gsc_property_connected=true`, `gsc_baseline_received=false`. Benötigt werden maximal verfügbare Exporte für Queries, Pages, Devices, Countries, Search Appearance sowie Indexierung, Sitemaps, CWV, Links, manuelle Maßnahmen und Sicherheit. Fehlende Werte werden niemals geschätzt.

Von Plesk/nginx werden vor Cutover benötigt: Hosting/Document Root, Host-/HTTPS-Regeln, zusätzliche Direktiven und Redirects, DNS/TTLs, TLS-Metadaten ohne Schlüssel, PHP/Proxy/Cache, anonymisierte 404-/Bot-/Error-Auswertung, Backup-/Restoreweg, Cronjobs und WAF/CDN-Schicht.

## 3. Kritische Befunde und Gates

| Prio | Befund                                           | Verbindliche Reaktion                                |
| ---- | ------------------------------------------------ | ---------------------------------------------------- |
| P0   | 64 alte gegen 19 neue Sitemap-URLs               | GSC-gestützte 64-Zeilen-Matrix                       |
| P0   | Slashvarianten liefern 200, Canonical ohne Slash | direkte 301-Normalisierung                           |
| P0   | selbstbezogenes `aggregateRating`                | aus `MedicalBusiness` entfernen                      |
| P0   | relative Schema-Bild-URL                         | absolute kanonische URL                              |
| P0   | Mittagspause fehlt im Schema                     | zwei Öffnungsintervalle                              |
| P0   | Vercel-Preset/defekter Previewpfad               | Node-Build, Start und `/healthz`                     |
| Info | Test-Gate (historischer P0-Befund)               | geschlossen: 44/44 plus Nulltreffer-Exitcode 1       |
| Info | Anamnese-Gesundheitsdatenpfad (historischer P0)  | geschlossen: lokale Funktion entfernt, externe App   |
| P0   | medizinisch-werbliche Altsätze                   | seitenweise HWG-/Fachprüfung                         |
| P1   | FAQPage-Markup ohne Google-Mehrwert              | FAQ sichtbar lassen, Markup nicht strategisch führen |
| P1   | fehlende Autor-/Review-/Quellenfelder            | Governance-Schema                                    |
| P1   | NAP/Öffnungszeiten widersprüchlich               | autoritative Werte und Profilbereinigung             |
| P1   | Hauptchunk zu groß                               | Auth/DB/App vom Marketingpfad trennen                |
| P1   | NLS/Kontakt/Linkprofil offen                     | Welle 2 abschließen                                  |

## 4. Zielverträge

```yaml
url_policy:
  scheme: https
  host: rauch-heilpraktiker.de
  path_style: no_trailing_slash_except_root
  redirect_status: 301
  redirect_chains: forbidden
  mass_redirect_to_home: forbidden
```

Jeder Datensatz in der 64-URL-Matrix enthält mindestens: `old_url`, Status, altes Canonical, Sitemapstatus, GSC-Klicks/Impressionen/Position, Backlinks, Businesswert, Inhaltsrisiko, Entscheidung (`keep_200_index|merge_301|remove_410|temporary_noindex_review`), Ziel, Code, neues Canonical, Sitemapaufnahme, Owner und Freigabe.

```yaml
site_registration:
  slug: rauch-heilpraktiker-de
  title: Naturheilpraxis Peter Rauch
  status: staging
  primaryDomain: rauch-heilpraktiker.de
  domainAliases: [www.rauch-heilpraktiker.de]
  runtimeType: external-app
  deploymentMode: managed-container
  repositoryUrl: https://github.com/redshift-three67/peter_web_neu.git
  repositoryBranch: relaunch-konzept
  buildOutputType: node-app
  installCommand: npm ci
  buildCommand: npm run build:node
  startCommand: npm run start:node
  upstreamServiceName: rauch-site
  upstreamPort: 3000
  publicBasePath: /
  healthcheckPath: /healthz
```

```yaml
health_data_boundary:
  payload_cms: forbidden
  general_platform_database: forbidden
  marketing_analytics: forbidden
  logs_and_error_tracking: forbidden
  enablement_requires:
    - legal_basis_and_purpose
    - separate_store
    - encryption
    - least_privilege
    - audit_log
    - retention_and_deletion
    - data_subject_process
    - processor_review
    - tested_backup_restore
    - dsfa_assessment
```

Payload verwaltet später `sites`, `pages`, `seoEntries`, `authors`, `contentReviews`, `evidenceReferences`, `redirects`, `businessLocations`, `media`, `testimonials` und `migrationRecords`. Gesundheitsdaten gehören in keine dieser Sammlungen.

## 5. Geplante Dateien

### Rauch-Repository

- `docs/migration/url-migration-matrix.csv`: 64 freigegebene URL-Entscheidungen.
- `docs/migration/content-review-matrix.csv`: fachliche/HWG-/SEO-Freigabe je Zielseite.
- `docs/migration/media-rights.csv`: Quelle, Recht, Nutzung, Alt-Text, Freigabe.
- `data/private/gsc/`, `data/private/plesk/`, `data/private/wordpress-backup/`: lokal, niemals Git.
- `scripts/build-url-matrix.mjs` + Test: deterministische Matrix.
- `scripts/seo-contract.test.mjs`: Schema-/SEO-Tripwires.
- `tests/e2e/seo-routes.spec.ts`, `mobile-critical.spec.ts`: Releaseprüfung.
- `src/content/site.ts`, `src/components/site/JsonLd.tsx`, `src/lib/seo.ts`, `src/content/hubs.ts`: SEO-/Stammdatenvertrag.
- `server/middleware/redirects.ts`: serverseitige Normalisierung.
- `src/routes/healthz.ts`, `vite.config.ts`, `Dockerfile`, `package.json`: Node-Containervertrag.
- `scripts/health-data-boundary.test.mjs`, `src/content/external-links.ts`, `src/routes/online-anamnesebogen.tsx`: externe Gesundheitsdatengrenze ohne lokale Anamnese-Funktionalität.

### Headless-Plattform

- `src/collections/Sites.ts`, `src/utilities/siteRuntimeManifest.ts`: im lokalen, noch unversionierten Plattform-Arbeitsbaum vorhandener External-App-Vertrag.
- `src/endpoints/seed/rauch-site.ts` + `seed/index.ts`: idempotente Registrierung.
- `tests/int/rauch-runtime-manifest.int.spec.ts`: Manifestvertrag.
- `docker-compose.yml` und generierte Caddy-Konfiguration: separater `rauch-site`-Service.

Der Plattform-Arbeitsbaum basiert bei dieser Tiefenprüfung auf `2d233564ca98ed48a0a118a3165c242150448436` (`main`/`origin/main`), enthält jedoch 50 veränderte und 22 unversionierte Statuspositionen. `Sites.ts`, Runtime-Manifest-Route und `siteRuntimeManifest.ts` sind darin noch unversioniert. Diese Dateien belegen die lokale Vertragsrichtung, aber noch keinen reproduzierbaren Plattform-Quellstand. Vor Task 10 sind die Plattformänderungen separat zu prüfen, zu testen und zu versionieren.

## 6. Ausführungsplan

### Task 1: Test-Gate reparieren

**Files:** Modify `package.json`; create `scripts/run-tests.mjs`, `scripts/run-tests.test.mjs`; verify `scripts/**/*.test.mjs`.

- [x] `npm test` ausführen; erwartet derzeit Exit 0 mit `tests 0` und gilt als fehlgeschlagen.
- [x] `node --test scripts/*.test.mjs` ausführen; Baseline: 41/41 grün.
- [x] Script auf den deterministischen Runner ändern:

```json
"test": "node scripts/run-tests.mjs"
```

- [x] Runner-Test rot ausführen; fehlendes Modul als erwartete Ursache bestätigen.
- [x] Rekursive Ermittlung, Nulltreffer-Exitcode 1 und Child-Exitcode-Weitergabe implementieren und testen.
- [x] `npm test` erneut ausführen; 44 Tests, 44 bestanden, 0 Fehler.
- [x] Commitfolge: `fix: make test gate execute all node tests` und korrigierender Abschluss `fix: enforce nonzero test gate`.

### Task 2: GSC- und 64-URL-Matrix

**Files:** Modify `.gitignore`; create `scripts/build-url-matrix.mjs`, `scripts/build-url-matrix.test.mjs`, `docs/migration/url-migration-matrix.csv`.

- [x] Private Pfade ignorieren:

```gitignore
data/private/gsc/
data/private/plesk/
data/private/wordpress-backup/
```

- [x] Test zuerst schreiben: exakt 64 eindeutige Alt-URLs, erlaubte Entscheidungen, Redirectzielpflicht, keine Ketten, keine Massenweiterleitung `/`.

```js
test("one valid decision exists per live URL", () => {
  assert.equal(rows.length, 64);
  assert.equal(new Set(rows.map((row) => row.old_url)).size, 64);
  rows.forEach(validateMigrationRow);
  assert.equal(findRedirectChains(rows).length, 0);
});
```

- [x] Test rot ausführen; Generator implementieren: Manifest + optionale GSC-Seitenexporte, fehlende Werte als `unknown`, niemals als `0`.
- [x] Strukturelle Baseline erzeugen: 64 eindeutige Zeilen, davon 5 `keep_200_index` und 59 nicht deploybare `temporary_noindex_review`; keine unbelegten 301-/410-Entscheidungen. Jede 410-Entscheidung verlangt eine namentliche Freigabe in `approved_by`.
- [ ] **Gate B:** Privaten GSC-Export einlesen, alle 59 Prüfzeilen fachlich bewerten und produktverantwortlich freigeben. Bis dahin darf die Matrix nicht von Redirect-, Sitemap- oder Deindexierungslogik konsumiert werden.
- [x] `npm test` ausführen; 74 Tests, 74 bestanden, 0 Fehler, darunter 19/19 Task-2-Vertragstests. `node scripts/parity-audit.mjs` wurde gegen den lokalen Server ausgeführt (18 Seiten, Exitcode 0); der Bericht weist weiterhin 49–95 % fehlende Inhaltsmerkmale aus. Diese offenen Paritätsbefunde gehören zu Task 6 und sind keine positive Inhaltsfreigabe.
- [x] Implementierungs-Commits: `0492ca2`, `822f7b8`, `780f12d`, `904c9fa`, `f4393af`, `9a86e39`, `f34c7fd`.
- [x] Gate A extern ohne Findings freigegeben: `RAUCH-TASK-02-GATE-A-REVIEW`; Nachweis `docs/developer-handoffs/2026-08-22-task-02-url-matrix/04-EXTERNES-REVIEW.json`.

### Task 3: Abschaltarchiv WordPress/Plesk

**Files:** Update `docs/migration/07-offene-punkte.md`; Rohdaten nur unter `data/private/`.

- [ ] WXR unter `Werkzeuge -> Daten exportieren -> Alle Inhalte` erzeugen.
- [ ] Plugins/Themes/MU-Plugins/Snippets, Lesen-/Permalinkscreens, Seitenhierarchie dokumentieren.
- [ ] Rank-Math global nicht erneut verlangen, sofern vorhandener Exporthash bestätigt ist.
- [ ] Plesk/nginx-Paket aus §2.4 erfassen; Secrets, Schlüssel und personenbezogene Logs ausschließen.
- [ ] Dokument je Paket mit `received`, `verified`, Datum und Prüfer aktualisieren.
- [ ] Nur bereinigte Dokumentation committen: `docs: record verified migration evidence`.

### Task 4: NAP und strukturierte Daten

**Files:** Modify `src/content/site.ts`, `src/components/site/JsonLd.tsx`, FAQPage-Caller; create `scripts/seo-contract.test.mjs`.

- [x] Roten Test schreiben: kein `aggregateRating`, absolute Bild-URL, zwei Öffnungsintervalle, keine produktive FAQPage-Strategie.
- [x] `node --test scripts/seo-contract.test.mjs` muss zunächst fehlschlagen.
- [x] JSON-LD implementieren:

```ts
image: "https://rauch-heilpraktiker.de/images/hero-praxis.jpg",
openingHoursSpecification: [
  { "@type": "OpeningHoursSpecification", dayOfWeek, opens: "10:00", closes: "12:30" },
  { "@type": "OpeningHoursSpecification", dayOfWeek, opens: "13:00", closes: "19:00" },
],
```

- [x] `aggregateRating` vollständig entfernen; sichtbare belegte Portalbewertungen dürfen bleiben.
- [ ] Product Owner bestätigt E-Mail, Öffnungszeiten und Bewertungszahlen; sonst bleibt Gate geschlossen.
- [x] `npm test && npm run typecheck && npm run lint`; Commit `fix: align practice structured data with search policies`.

Code- und Teststand am 2026-08-22 nach Task 7: 55/55 Tests, Typecheck Exit 0, Lint Exit 0 mit drei bekannten Warnungen und Build Exit 0. Der externe Entwicklerreview `RAUCH-TASK-04-REVIEW` ist ohne Findings freigegeben. `STAT-017` und `STAT-026` bleiben wegen ausstehender Schema-Validator-, NAP- beziehungsweise fachlich-redaktioneller Freigaben bewusst `bestätigt mit Einschränkungen`; die autoritative NAP-/Profilfreigabe wird separat unter `STAT-027` geführt.

### Task 5: Canonicals und Redirects

**Files:** Modify `src/lib/seo.ts`, `src/content/hubs.ts`, `public/sitemap.xml`; create `server/middleware/redirects.ts`, `tests/e2e/seo-routes.spec.ts`.

- [ ] E2E-Test zuerst:

```ts
test("slash variant redirects directly", async ({ request }) => {
  const response = await request.get("/schmerztherapie-augsburg/", { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(response.headers().location).toBe("/schmerztherapie-augsburg");
});
```

- [ ] Test rot gegen Node-Releasebuild ausführen.
- [ ] Middleware nur für `GET`/`HEAD`, nicht Assets/API/Auth; Slash entfernen und ausschließlich freigegebene Matrix anwenden.
- [ ] Canonical, Sitemap, interne Links und Redirectziele auf identische Host-/Slashpolitik bringen.
- [ ] Alle `merge_301`-Zeilen auf genau einen Hop testen; `npm test` + E2E.
- [ ] Commit `feat: enforce canonical URL and redirect contract`.

### Task 6: Welle 2, E-E-A-T und HWG

**Files:** Modify `NlsNeko.tsx`, `kontakt.tsx`, `Header.tsx`, betroffene `src/content/`/`src/routes/`; create Review- und Medienmatrizen.

- [ ] 19 Zielseiten mit Autor, medizinischem/rechtlichem Reviewer, Datum, Evidenz, Risiko, Quellen und Freigabe erfassen.
- [ ] Fehlende NLS-Kapitel aus `content/wordpress/pages/nls-diagnostik.json` sichtbar machen, ohne Diagnosesicherheit/Laborersatz.
- [ ] Kontaktseite um Praxis-, Termin-, Notfall- und Datenschutzhinweise ergänzen; keine ausführlichen Gesundheitsdaten im Freitext anfordern.
- [ ] Menü nur mit realen, geprüften Routen vervollständigen; keine Doorway-URLs.
- [ ] Aussagen „positive Wirkung“, „Vorteile“, „helfen kann“, sichere Erkennung/Beseitigung, Krankheitslisten und Heilungszitate einzeln belegen, neutralisieren oder entfernen.
- [ ] Medienrechte für verwendete Dateien dokumentieren; Gerätebilder ohne Freigabe nicht ersetzen.
- [ ] Paritätsaudit, Typecheck, Lint und mobile Sichtprüfung; jede Abweichung begründen.
- [ ] Commit `feat: complete reviewed content migration wave two`.

### Task 7: Externe Online-Anamnese-Grenze

**Files:** Create `scripts/health-data-boundary.test.mjs`, `src/content/external-links.ts`; delete `src/components/site/AnamneseWizard.tsx`; modify `.gitignore`, `src/lib/actions.ts`, `src/routes/online-anamnesebogen.tsx`, `src/routes/praxis.tsx` und aktive Grenztexte; remove generated `.vercel/output` from version control; verify unchanged `migrations/0002_practice.sql`.

- [x] Roten Boundary-Test gegen Wizard, Submit, Tabellenzugriff, lokalen Inbox-Pfad und unzutreffende aktive Grenztexte ausführen.
- [x] Lokalen Wizard, Submit-Endpunkt und Anamnese-Inbox vollständig entfernen.
- [x] Interne Informationsseite mit prominentem, sicherem externem Link zur eigenständigen Lovable-App ausgeben.
- [x] `/anamnese` als Kompatibilitätsweiterleitung erhalten.
- [x] Historische Migration und bestehende Daten unverändert lassen.
- [x] Getracktes historisches `.vercel/output` entfernen und generierte Prebuilds ignorieren, damit kein alter Gesundheitsdatenpfad per `--prebuilt` deploybar bleibt.
- [x] 7/7 Boundary-Tests, 55/55 Gesamttests, Typecheck, Lint, Build und Chrome-Liveprüfung ausführen.
- [x] Externen Entwickler-/LLM-Review `RAUCH-TASK-07-REVIEW` ohne Findings abschließen; Task 2 ist als nächster Schritt freigegeben.

Die externe Lovable-App ist ein getrenntes System. Datenschutz, Authentisierung, Speicherung, Einwilligung, Aufbewahrung und Löschung innerhalb dieser App wurden in Task 7 nicht geprüft und dürfen aus dem bestätigten Website-Gate nicht abgeleitet werden. Der externe Repository-Review ist unter `docs/developer-handoffs/2026-08-22-task-07-external-anamnese/04-EXTERNES-REVIEW.json` dokumentiert.

### Task 8: Node-/Containervertrag

**Files:** Modify `vite.config.ts`, `package.json`; create `src/routes/healthz.ts`, `Dockerfile`, `.dockerignore`.

- [ ] Health-E2E-Test schreiben: `/healthz` = 200 und exakt `{status:"ok"}`.
- [ ] Buildziele konfigurieren:

```ts
nitro({ preset: mode === "node" ? "node-server" : "vercel", serverDir: "./server" });
```

```json
"build:node": "vite build --mode node",
"start:node": "node .output/server/index.mjs"
```

- [ ] Tatsächlichen Nitro-Artefaktpfad prüfen; fehlender Startpfad ist hartes Stop-Gate.
- [ ] `healthz.ts` als nicht sensitiven Serverhandler implementieren.
- [ ] Multi-Stage-Dockerfile: `npm ci`, `build:node`, minimale Non-root-Runtime, Port 3000, Healthcheck.
- [ ] `docker build`, Containerstart, Health/Startseite/kritische SSR-Routen prüfen.
- [ ] Commit `feat: add managed Node container deployment`.

### Task 9: Release-, Mobile- und Performancegates

**Files:** Create `playwright.config.ts`, `tests/e2e/mobile-critical.spec.ts`; extend SEO-E2E; modify Bundlegrenzen.

- [ ] Start, Schmerz, NLS, NAET, Naturheilkunde, Kontakt, Über mich, Anamnese, Impressum, Datenschutz desktop/mobil prüfen.
- [ ] Je Route: 200, eine H1, `<main>`, Canonical, Robots, kein Overflow, keine fehlenden Alts, keine Browser-/Requestfehler, CTA.
- [ ] Auth, DB-Adapter, Charts und interne Praxisfunktionen aus unnötigen öffentlichen Bundles entfernen.
- [ ] `npm run build:node`, `npm run start:node`, `npx playwright test`.
- [ ] Lighthouse gegen echten Releasebuild; Ziel mobil LCP <=2,5 s, INP <=200 ms, CLS <=0,1; Lab nicht als Feld ausgeben.
- [ ] Commit `test: add mobile SEO and release quality gates`.

### Task 10: Plattformregistrierung

**Files in `C:\Projekte\Headless_Platform_CMS`:** create `src/endpoints/seed/rauch-site.ts`, `tests/int/rauch-runtime-manifest.int.spec.ts`; modify Seedindex und `docker-compose.yml`.

- [ ] Plattformtest zuerst: Vertrag aus §4, Ziel `rauch-site:3000`, `/healthz`, Branch `relaunch-konzept`, keine Runtime-Warnung.
- [ ] Test rot ausführen.
- [ ] Idempotenten Seed per `slug=rauch-heilpraktiker-de` implementieren; Status `staging`, `isDefault=false`.
- [ ] Compose-Service mit Healthcheck und minimalen Runtime-Secrets ergänzen.
- [ ] Runtime-Manifest/Caddy muss beide Hosts auf `rauch-site:3000` routen; Live noch nicht umschalten.
- [ ] Plattformtests vollständig; Commit `feat: register Rauch pilot external application`.

### Task 11: CMS-Adapter Stufe 2

**Files:** Create `src/content/provider/{types,local-provider,payload-provider,index}.ts`; modify Route-Loader erst nach Contract-Tests; erweitere Payload-Governance.

- [ ] Vertrag definieren:

```ts
export interface ContentProvider {
  getPage(path: string): Promise<PageContent | null>;
  getSeo(path: string): Promise<SeoEntry | null>;
  getRedirects(): Promise<RedirectEntry[]>;
}
```

- [ ] Local/Payload-Provider müssen für gleiche Fixture identische Normalform liefern; ungeprüfter CMS-Inhalt bleibt unsichtbar.
- [ ] Lokalen Provider ohne sichtbare Änderung als Default einsetzen.
- [ ] Erst eine unkritische Inhaltsart migrieren, mit Quellhash, Ziel-ID, Reviewer, Freigabe und lokalem Fallback.
- [ ] Jede Inhaltsart erhält Contract-, Preview- und E2E-Test sowie kleinen Commit. Kein Big-Bang.

### Task 12: Cutover, Monitoring und Rollback

**Files:** Finalize beide Matrizen; create `docs/migration/cutover-runbook.md`, `rollback-runbook.md`.

- [ ] Gates: NAP, GSC-Baseline, URL-Matrix, medizinisch/rechtlicher Review, Schema, Deployment, Tests >0, Gesundheitsdatengrenze, Accessibility, Performance, Rollback jeweils mit Prüfer/Evidenz `true`.
- [ ] WordPress-Dateien/DB/Plesk sichern und Restore isoliert testen.
- [ ] Nicht indexierbare Releasevorschau gegen alle 64 Entscheidungen und 19 Zielseiten testen.
- [ ] Wartungsfenster: Upstream/DNS gemäß Runbook, Smoke, Sitemap, URL-Prüfungen. Keine Change-of-Address-Meldung bei gleicher Domain.
- [ ] Monitoring: 24h Technik/CTA; 7 Tage Bot/Index/Canonical/CWV; mindestens 4 Wochen Queries, Seiten, Klicks, CTR, Conversions gegen Baseline.
- [ ] Rollback bei anhaltenden 5xx, falschen Canonicals/Robots, defekten Formularen, Verlust kritischer URLs oder ungeklärtem organischem Einbruch.

## 7. GitHub-Synchronisationsvertrag

Der sichere fachliche Vollsync umfasst:

1. `relaunch-konzept` einschließlich Plan und bisheriger zehn Relaunch-Commits,
2. `breitenberger-hubs`,
3. alle `rp-*`-Tags und `handover-2026-08-18`,
4. keine experimentellen `claude/*`, `wellenreiter` oder temporären Arbeitsbranches,
5. keine Änderung von Remote-`main`, kein Force-Push.

Nach Push:

```bash
git ls-remote --heads origin main relaunch-konzept breitenberger-hubs
git ls-remote --tags origin
git rev-parse relaunch-konzept
git rev-parse origin/relaunch-konzept
git status --short
```

Erwartung: lokal/remote `relaunch-konzept` identisch und sauber; Remote-`main` bleibt `1d535b38d5146675288c483f835bfa8ea29a9995`.

Tokens niemals in Chat, Commit, `.env`, Shellhistorie oder Dokumentation. Zuerst Git Credential Manager. Falls nötig Browser-/Device-Login. Nur falls unvermeidbar: kurzlebiger Fine-grained Token ausschließlich für dieses Repo mit `Contents: Read and write`, nur über echte Secret-Eingabe/Credential Manager, anschließend widerrufen.

## 8. Leitquellen

- Search Essentials: <https://developers.google.com/search/docs/essentials>
- People-first/E-E-A-T/YMYL: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- AI Search: <https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>
- Mobile-first: <https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing>
- Site Moves/Redirects/Canonicals: <https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes>, <https://developers.google.com/search/docs/crawling-indexing/301-redirects>, <https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>
- Review-Markup: <https://developers.google.com/search/docs/appearance/structured-data/review-snippet>
- FAQ-Update 2026: <https://developers.google.com/search/updates#removing-faq-rich-result>
- TanStack Hosting/Node/Docker: <https://tanstack.com/start/latest/docs/framework/react/guide/hosting>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- §3 HWG: <https://www.gesetze-im-internet.de/heilmwerbg/__3.html>
- DSGVO: <https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:02016R0679-20160504>

## 9. Definition of Done

Abgeschlossen ist der Pilot erst, wenn GitHub-Branch/Tags nachvollziehbar synchronisiert, die 64-URL-Matrix GSC-gestützt freigegeben, alle 19 Zielseiten fachlich/rechtlich/technisch/mobil abgenommen, Schema/NAP/Canonicals/Robots/Sitemap/Redirects konsistent, Gesundheitsdaten getrennt, Node-Container und `/healthz` produktionsnah getestet, echte E2E-/Accessibility-/Performancegates grün, WordPress-Restore getestet und vier Wochen Search-Console-Nachsorge ohne ungeklärte kritische Verschlechterung erfolgt sind.

Bis dahin bleibt der Status `migration/staging`; WordPress ist die Produktionsquelle.
