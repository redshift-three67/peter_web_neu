# Maschinenlesbare Statusmatrix

**Dokument-ID:** `STATUSMATRIX-RAUCH-2026-08-21`<br>
**Rauch-Quellprüfung:** Commit `c6aa58ef980bdd4d84be3fcc9b237e1296693722`<br>
**Plattform-Prüfgrundlage:** Basiscommit `2d233564ca98ed48a0a118a3165c242150448436` plus nicht versionierter lokaler Arbeitsstand<br>
**Kanonische Maschinenfassung:** [`02-MASCHINENLESBARE-STATUSMATRIX.json`](./02-MASCHINENLESBARE-STATUSMATRIX.json)<br>
**Schema:** JSON-Objekt mit Provenienz und flacher `items`-Liste; 29 Statusobjekte; UTF-8; keine Kommentare

## Verwendungsregel

Die `.json`-Datei ist die verbindliche Eingabe für LLMs, Agenten, Auswerteskripte und Statusimporte. Dieses Markdown-Dokument erklärt die Matrix für Menschen und bildet jeden Datensatz einmal kompakt ab. Bei einer Statusänderung müssen JSON, diese Übersicht, der Vollbericht und – falls die Änderung den Ausführungsweg betrifft – der Masterplan gemeinsam aktualisiert werden.

Zulässige Statuswerte sind:

- `bestätigt`
- `bestätigt mit Einschränkungen`
- `teilweise bestätigt`
- `nicht bestätigt`
- `derzeit nicht prüfbar`

## Vollständigkeitsübersicht

| ID       | Bereich                    | Gegenstand                                       | Status                        | Priorität          |
| -------- | -------------------------- | ------------------------------------------------ | ----------------------------- | ------------------ |
| STAT-001 | Git und Synchronisation    | Kanonischer Quellstand der Prüfung               | bestätigt                     | Info               |
| STAT-002 | Dokumentation              | Kanonische Übergabequellen                       | bestätigt                     | Info               |
| STAT-003 | Qualitätssicherung         | npm-Testskript                                   | bestätigt                     | P0                 |
| STAT-004 | Qualitätssicherung         | Direkte Node-Testsuite                           | bestätigt                     | Info               |
| STAT-005 | Qualitätssicherung         | Typecheck und Lint                               | bestätigt mit Einschränkungen | P2                 |
| STAT-006 | Deployment                 | Node-Containervertrag                            | nicht bestätigt               | P0                 |
| STAT-007 | Headless-CMS-Integration   | Integrationsstufe 1 external-app                 | teilweise bestätigt           | P1                 |
| STAT-008 | Headless-CMS-Integration   | Integrationsstufe 2 Payload-Content-Adapter      | nicht bestätigt               | P2                 |
| STAT-009 | SEO und Migration          | Live-Seiten-Sitemap der alten Website            | bestätigt                     | Info               |
| STAT-010 | SEO und Migration          | Neue statische Sitemap                           | teilweise bestätigt           | P0                 |
| STAT-011 | SEO und Migration          | 64-URL-Migrationsmatrix                          | nicht bestätigt               | P0                 |
| STAT-012 | Google Search Console      | GSC-Baseline                                     | derzeit nicht prüfbar         | P0                 |
| STAT-013 | WordPress                  | Öffentlicher Inhalts-Snapshot                    | bestätigt mit Einschränkungen | P1                 |
| STAT-014 | WordPress                  | WXR- und Abschaltarchiv                          | nicht bestätigt               | P0 vor Abschaltung |
| STAT-015 | Rank Math                  | SEO-Plugin-Daten                                 | bestätigt mit Einschränkungen | P1                 |
| STAT-016 | Medien                     | Repository-Medieninventar                        | bestätigt mit Einschränkungen | P1                 |
| STAT-017 | SEO und Schema.org         | MedicalBusiness JSON-LD                          | bestätigt mit Einschränkungen | P0                 |
| STAT-018 | Datenschutz und Sicherheit | Online-Anamnese                                  | bestätigt                     | P0                 |
| STAT-019 | Accessibility              | Barrierefreiheitsnachweis der neuen Website      | teilweise bestätigt           | P1                 |
| STAT-020 | Performance                | Release-Performance der neuen Website            | teilweise bestätigt           | P1                 |
| STAT-021 | Design und Mobile UX       | Relaunch-Design als Standard                     | bestätigt mit Einschränkungen | Info               |
| STAT-022 | Inhalt und E-E-A-T         | Gesundheitsinhalte und Freigabegovernance        | teilweise bestätigt           | P0 vor Go-live     |
| STAT-023 | Infrastruktur              | Plesk- und nginx-Cutoverdaten                    | derzeit nicht prüfbar         | P0 vor Cutover     |
| STAT-024 | Release                    | Produktiver Domainwechsel                        | nicht bestätigt               | P0                 |
| STAT-025 | SEO und Migration          | Slash-, Canonical- und Redirectvertrag           | nicht bestätigt               | P0                 |
| STAT-026 | Strukturierte Daten        | FAQPage-Strategie                                | bestätigt mit Einschränkungen | P1                 |
| STAT-027 | Lokale Auffindbarkeit      | NAP- und Öffnungszeiten-Konsistenz               | derzeit nicht prüfbar         | P1                 |
| STAT-028 | SEO und Migration          | NLS-Diagnostik-, Kontakt- und Linkprofil-Welle 2 | nicht bestätigt               | P1                 |
| STAT-029 | Headless-CMS-Integration   | Reproduzierbarer Plattform-Quellstand            | nicht bestätigt               | P0 vor Integration |

## Feldvertrag

Die JSON-Datei enthält einen Provenienzblock mit `schema_version`, `document_id`, Prüfdatum, Quellreferenzen und erlaubten Status-/Prioritätswerten. Jedes Objekt unter `items` enthält vollständig:

- `id`: stabile Statuskennung;
- `bereich`: fachlicher oder technischer Verantwortungsbereich;
- `gegenstand`: eindeutig abgegrenzter Prüfgegenstand;
- `soll_zustand`: messbarer Zielzustand;
- `ist_zustand`: belegter Zustand des Quellcommits;
- `status`: einer der oben definierten Werte;
- `verifikationsgrad`: Art und Grenze der Prüfung;
- `nachweis`: reproduzierbare Quelle oder Prüfkommando;
- `prioritaet`: Info, P0, P1 oder P2 einschließlich gegebenenfalls zeitlichem Gate;
- `abhaengigkeiten`: stabile IDs oder benannte externe Eingaben;
- `naechster_schritt`: konkrete nächste Maßnahme;
- `abnahmekriterium`: messbare Bedingung zum Schließen des Befunds;
- `verantwortungsrolle`: zuständige Rolle, keine ungeprüfte Personenzuweisung.

## Kritische Leseregeln

1. `bestätigt` bedeutet nur, dass der ausdrücklich beschriebene Soll-Zustand mit dem genannten Nachweis belegt wurde.
2. `teilweise bestätigt` darf nicht als Go-live-Freigabe interpretiert werden.
3. `derzeit nicht prüfbar` darf weder als Fehlerfreiheit noch als optionaler Punkt interpretiert werden.
4. Eine Sitemap-Differenz von 64 zu 19 belegt nicht automatisch 45 unerreichbare oder deindexierte URLs.
5. Erfolgreiches SSR oder ein erfolgreicher Build belegt keine guten Core Web Vitals.
6. Vorhandene Alt-Attribute belegen keine vollständige WCAG-Konformität.
7. Rechtliche und medizinische Inhaltsfreigaben können nicht durch eine technische Codeprüfung ersetzt werden.
