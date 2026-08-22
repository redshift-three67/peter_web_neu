# Vollständige technische, inhaltliche, SEO- und migrationsbezogene Tiefenanalyse

**Projekt:** Relaunch und Integration von `rauch-heilpraktiker.de` als erste produktive Website der Headless-CMS-Plattform<br>
**Dokument-ID:** `TIEFENANALYSE-RAUCH-RELAUNCH-2026-08-21`<br>
**Prüfdatum:** 2026-08-21, Zeitzone Europe/Berlin<br>
**Geprüfter Rauch-Quellcommit:** `c6aa58ef980bdd4d84be3fcc9b237e1296693722`<br>
**Statusfortschreibung:** 2026-08-22; Task-2-Implementierung geprüft bis `f4393af` (die ursprüngliche Prüfprovenienz bleibt unverändert)<br>
**Kanonischer Branch:** `relaunch-konzept`<br>
**Repository:** `https://github.com/redshift-three67/peter_web_neu.git`<br>
**Geprüfter Plattform-Basiscommit:** `2d233564ca98ed48a0a118a3165c242150448436`, ergänzt um einen nicht versionierten lokalen Arbeitsstand<br>
**Prüfmodus:** beweisgestützte Quellprüfung, frische Verifikationskommandos und redaktionelle Konsolidierung<br>
**Klassifikation:** technischer Prüf- und Übergabebericht; keine Rechts- oder medizinische Beratung

---

## 1. Dokumentmetadaten

### 1.1 Dokumentenrolle

Dieser Bericht ist die zeitpunktbezogene Verifikationsakte zum oben genannten Quellcommit. Er ersetzt nicht den Ausführungsplan, sondern prüft und präzisiert dessen Ausgangslage.

Die Dokumentenhierarchie lautet:

1. `docs/relaunch-2026/00-MASTERPLAN.md` ist die handlungsleitende Quelle für Reihenfolge, Architektur, Zielverträge und Definition of Done.
2. Dieser Bericht dokumentiert den belegten Ist-Zustand, Prüfgrenzen, Abweichungen und Reifegrad.
3. `02-MASCHINENLESBARE-STATUSMATRIX.json` ist die maschinenlesbare Statusquelle.
4. `02-MASCHINENLESBARE-STATUSMATRIX.md` erklärt die Statusquelle für Menschen.
5. Ältere Übergabe- und Designakten bleiben historische Evidenz, soweit der Masterplan oder dieser Bericht sie nicht ausdrücklich präzisiert.

### 1.2 Verifikationswerte

| Wert                         | Bedeutung                                                                   |
| ---------------------------- | --------------------------------------------------------------------------- |
| `verifiziert`                | direkt durch Datei, Kommando, Git-Referenz oder Live-Abruf belegt           |
| `teilweise verifiziert`      | ein Teil ist belegt; ein erforderliches Gate oder eine externe Quelle fehlt |
| `plausible Schlussfolgerung` | aus belegten Fakten abgeleitet, aber nicht selbst vollständig gemessen      |
| `extern gemeldet`            | vom Auftraggeber mitgeteilt, im Workspace nicht unabhängig belegt           |
| `nicht prüfbar`              | notwendiger Zugriff oder Datensatz fehlt                                    |

### 1.3 Korrektur gegenüber dem eingereichten Entwicklerbericht

Der eingereichte Bericht wurde nicht ungeprüft übernommen. Korrigiert wurden insbesondere:

- kein unbelegter pauschaler Genauigkeitswert von „95 %“ für den Masterplan;
- 19 Komponenten insgesamt unter `src/components`, davon 16 unter `site`, 2 unter `ui` und 1 Preview-Bridge;
- acht statt zehn Dateien größer als 1 MiB;
- 87.574.282 Bytes unter `public/media`, davon 67.880.409 Bytes unter `public/media/originals`, nicht pauschal „85 MB Originals“;
- keine Gleichsetzung der Sitemap-Differenz 64 zu 19 mit 45 technischen 404 oder einer bereits eingetretenen Deindexierung;
- keine Ableitung guter Performance allein aus SSR;
- keine vollständige WCAG-, HWG-, Rechts- oder fachmedizinische Freigabe aus bloßer Codeinspektion;
- kein belegter Status „visuell freigegeben“;
- klare Trennung zwischen öffentlichem WordPress-Crawl und vollständigem administrativem WXR-/Datenbankarchiv.

## 2. Executive Summary

### 2.1 Gesamturteil

Die neue Rauch-Website ist eine fortgeschrittene, lauffähige Relaunch-Codebasis und eignet sich als technische Grundlage für die erste Plattformintegration. Sie ist jedoch weder fertig in die Headless-Plattform integriert noch für den produktiven Domainwechsel freigegeben.

### 2.2 Bestätigte Stärken

- Der geprüfte lokale Branch und `origin/relaunch-konzept` waren zu Prüfungsbeginn auf demselben Commit `c6aa58e`; der Arbeitsbaum war sauber.
- Die direkte Testsuite umfasst 41 Tests; alle 41 bestanden frisch im isolierten Windows-Worktree.
- Task 1 ist fortgeschrieben: `npm test` verwendet einen deterministischen rekursiven Runner, führte 44 Tests aus und scheitert bei einem leeren Testbestand mit Exitcode 1.
- TypeScript-Typecheck meldete Exitcode 0.
- ESLint meldete Exitcode 0, 0 Fehler und 3 bekannte Warnungen.
- Der öffentliche WordPress-Crawl enthält 64 Seiten, 80 Medienreferenzen und 0 Crawlfehler.
- Die alte Live-Seitensitemap war erreichbar und enthielt am Prüfdatum 64 URLs.
- Die neue statische Sitemap enthält 19 URLs.
- Relaunch-Design `neu` ist Server- und Client-Fallback; ein gespeicherter `alt`-/`ac`-Wert kann es clientseitig ohne URL-Parameter weiterhin überschreiben, und `?look=alt` bleibt explizit verfügbar.
- WordPress-, Rank-Math-, Seiten-, HTML- und Medienzuordnungsdaten liegen in erheblichem Umfang bereits im Repository.

### 2.3 Kritische offene Gates

1. Die strukturelle 64-URL-Migrationsmatrix ist deterministisch erzeugt und technisch abgesichert; die GSC-gestützte fachliche Freigabe der 59 Prüfzeilen fehlt noch.
2. GSC-Baseline-Exporte liegen nicht im Workspace.
3. Der Node-/Containervertrag für den bevorzugten `managed-container`-Betrieb fehlt.
4. Der Codevertrag für `MedicalBusiness`-JSON-LD ist korrigiert, mit 4/4 Vertragstests und dem externen Entwicklerreview `RAUCH-TASK-04-REVIEW` belegt; Schema-Validator- und autoritative NAP-Freigaben stehen noch aus.
5. Ein vollständiges WXR-/WordPress-/Plesk-Abschalt- und Restorepaket fehlt.
6. Vollständige fachlich-rechtliche Inhalts-, Accessibility-, Performance- und Cutover-Abnahmen fehlen.

Das frühere P0-Gate zur lokalen Online-Anamnese ist am 2026-08-22 geschlossen worden: Der lokale Wizard, der Submit-/Tabellenpfad und die Anamnese-Inbox sind entfernt. Die Website zeigt eine Informationsroute und verlinkt ausschließlich die eigenständige externe App. Deren interne Datenschutz- und Speicherprozesse waren nicht Gegenstand dieser Repository-Prüfung.

### 2.4 Verbindliche Statusantworten

| Frage                                         | Antwort                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| Quellcommit lokal/remote synchron?            | bestätigt für den geprüften Ausgangscommit                              |
| Masterplan als Ausführungsgrundlage geeignet? | bestätigt mit den Präzisierungen dieses Berichts                        |
| Kann Entwicklung sofort beginnen?             | bestätigt; P0-Tasks 1, 4, 7 und 8 sind lokal ausführbar                 |
| Kann eine LLM ohne Chatkontext übernehmen?    | bestätigt, wenn sie Masterplan, Bericht und JSON-Matrix gemeinsam liest |
| Headless-CMS-Integration fertig?              | nicht bestätigt                                                         |
| Produktiver Domainwechsel freigegeben?        | nicht bestätigt                                                         |

## 3. Prüfauftrag und Umfang

Geprüft wurden:

- Git- und Synchronisationszustand;
- Masterplan, historische Übergaben und projektrelevante Dokumentation;
- Framework-, Build-, Routing-, Content-, Daten- und Deploymentarchitektur;
- Seiten-, Komponenten-, Script-, WordPress-, Rank-Math- und Medieninventare;
- alte Live-Website über öffentliche URLs und Header;
- neue Website anhand des Quellcodes und vorhandener historischer Prüfnachweise;
- SEO, URL-Migration, Schema.org, E-E-A-T-Governance, Performance, Accessibility, Datenschutz und Sicherheit;
- Test-, Typecheck- und Lintzustand;
- externe Abhängigkeiten für GSC, WordPress, Plesk und Cutover.

Nicht Gegenstand dieser reinen Dokumentintegration waren Änderungen am Produktcode, DNS, Live-WordPress, Plesk, Search Console oder der Headless-Plattform. Der vorhandene Plattformvertrag wurde zur Einordnung der Integrationsreife jedoch read-only geprüft.

## 4. Geprüfte Quellen und Zugänge

### 4.1 Lokale Primärquellen

- Git-Repository und Branch `relaunch-konzept`;
- `docs/relaunch-2026/00-MASTERPLAN.md` Version 2.0.0 als Ausgangsdokument;
- externer Entwickler-/LLM-Bericht `01-VOLLBERICHT-TIEFENANALYSE.md`, SHA-256 `643408D043281C52E9C48B7C7390E54239B26346B95AB52561C8855D4E53F80E`;
- externe Entwickler-/LLM-Matrix `02-MASCHINENLESBARE-STATUSMATRIX.md`, SHA-256 `A95D3F9043061ED582C2B95B59812ADD2CC275B81A23B97F44049A1B2A63691B`;
- `src/routes` mit 38 Routendateien;
- `src/components` mit 19 Komponentendateien;
- `scripts` mit 16 Scriptdateien;
- `package.json`, `vite.config.ts`, Migrationen und Serverfunktionen;
- `content/wordpress/manifest.json` mit 64 Seiten, 80 Medien und 0 Fehlern;
- 64 JSON-Seitendateien unter `content/wordpress/pages`;
- HTML-Archiv und 18 HTML-Live-Snapshots;
- `rank-math-settings.json`, `image-map.json` und Uploadinventar;
- `public` mit 426 Dateien, davon 398 unter `public/media`.
- Headless-Plattform unter `C:\Projekte\Headless_Platform_CMS` auf Basiscommit `2d23356`;
- lokaler Plattform-Arbeitsstand mit `Sites.ts`, `siteRuntimeManifest.ts`, Runtime-Manifest-Route, `docker-compose.yml` und Caddy-Konfiguration.

Die beiden externen Übergabedateien lagen zum Prüfzeitpunkt unter `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\docs\tiefenanalyse-2026-08-21`. Die Hashes identifizieren exakt den analysierten Eingangszustand; die im Repository integrierte Fassung enthält die in diesem Bericht dokumentierten Korrekturen.

### 4.2 Öffentliche Live-Quellen

Am 2026-08-21 direkt geprüft:

- `https://rauch-heilpraktiker.de/` → HTTP 200;
- `https://rauch-heilpraktiker.de/robots.txt` → HTTP 200, verweist auf `sitemap_index.xml`;
- `https://rauch-heilpraktiker.de/page-sitemap.xml` → HTTP 200, 64 URL-Einträge;
- `http://rauch-heilpraktiker.de/` → HTTP 301 auf HTTPS/non-www;
- `https://www.rauch-heilpraktiker.de/` → HTTP 301 auf non-www;
- `https://rauch-heilpraktiker.de/kontakt` → HTTP 301 auf `/kontakt/`;
- `/kontakt/` → HTTP 200;
- öffentliche Header: nginx; auf WordPress-Seiten `PHP/8.2.33 PleskLin`.

Live-Werte sind zeitpunktbezogen und vor Cutover erneut zu prüfen.

## 5. Nicht verfügbare Quellen und Prüfgrenzen

| Quelle                                             | Status                      | Auswirkung                                                                                           |
| -------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| GSC-Performance- und Indexierungsexporte           | nicht vorhanden             | kein belegtes Ranking-, Klick-, Impressionen-, CTR- oder CWV-Baselineurteil                          |
| Plesk/nginx-vHost-Konfiguration                    | nicht vorhanden             | Redirectreihenfolge, Cache, TLS, Proxy, WAF und Restore intern nicht vollständig prüfbar             |
| WXR/XML-Export                                     | nicht vorhanden             | öffentlicher Inhalt ist erfasst, administrativer WordPress-Vollbestand nicht abschließend archiviert |
| WordPress-Datenbank-/Plugin-/Theme-/Snippet-Archiv | nicht vorhanden             | nicht öffentliche Metadaten und Wiederherstellbarkeit nicht vollständig belegt                       |
| Medienrechtsnachweise                              | nicht vollständig vorhanden | produktive Verwendung einzelner Bilder nicht abschließend freigabefähig                              |
| fachmedizinische und rechtliche Einzelabnahme      | nicht vorhanden             | keine vollständige E-E-A-T-/HWG-/Inhaltsfreigabe                                                     |
| produktionsnaher Node-Container                    | nicht implementiert         | kein abschließender E2E-, Performance- oder Cutovernachweis                                          |
| versionierter Plattform-Integrationsstand          | nicht vorhanden             | External-App-Vertrag lokal sichtbar, aber noch keinem reproduzierbaren Plattform-Commit zugeordnet   |

Die Meldung, dass die Search-Console-Property neu verbunden wurde, ist als Auftraggeberangabe dokumentiert, aber ohne Export nicht technisch verifizierbar.

## 6. Git- und Synchronisationsstatus

### 6.1 Ausgangsprüfung

| Element                   | Befund                                     |
| ------------------------- | ------------------------------------------ |
| lokaler Branch            | `relaunch-konzept`                         |
| lokaler HEAD              | `c6aa58ef980bdd4d84be3fcc9b237e1296693722` |
| `origin/relaunch-konzept` | identischer Commit                         |
| `origin/main`             | `1d535b38d5146675288c483f835bfa8ea29a9995` |
| Abstand zu `origin/main`  | 11 Commits                                 |
| lokale Tags               | 48                                         |
| Arbeitsbaum               | sauber                                     |

Der Begriff „vollständig synchron“ gilt für den vereinbarten kanonischen Umfang. Experimentelle lokale Branches wie `wellenreiter` und `claude/*` gehören nicht zur Produktionsquelle. `main` blieb absichtlich unverändert.

### 6.2 Integrationsregel für diesen Bericht

Der Quellcommit bleibt die Prüfgrundlage. Der Commit, der diesen Bericht enthält, ist die Dokumentintegration und darf nicht rückwirkend als geprüfter Produktcode ausgegeben werden. Nach Push müssen lokaler und entfernter `relaunch-konzept` erneut identisch sein.

## 7. Dokumentations- und Masterplanabgleich

### 7.1 Ergebnis

Der Masterplan deckt Architektur, P0/P1-Risiken, Zielverträge, zwölf Umsetzungstasks, GitHub-Synchronisation und Definition of Done substantiiert ab. Eine pauschale Prozentzahl für seine Genauigkeit ist methodisch nicht belastbar und wird nicht verwendet.

### 7.2 Wesentliche bestätigte Aussagen

| Masterplan-Aussage                 | Gegenprüfung                  | Ergebnis                                 |
| ---------------------------------- | ----------------------------- | ---------------------------------------- |
| 64 Live-Sitemap-URLs               | Direktabruf der XML-Sitemap   | bestätigt                                |
| 19 neue Sitemap-URLs               | lokales XML-Parsing           | bestätigt                                |
| 18 Hubpfade in drei Wellen         | `src/content/hubs.ts`         | bestätigt                                |
| `npm test` = 0 Tests (Baseline)    | Ausgangsprüfung               | historisch bestätigt                     |
| direkter Node-Test = 41/41         | Ausgangsprüfung               | historisch bestätigt                     |
| `npm test` = 48/48 plus Null-Gate  | Task-4-Fortschreibung         | bestätigt                                |
| `npm test` = 55/55 plus Null-Gate  | Task-7-Fortschreibung         | bestätigt                                |
| `npm test` = 73/73 plus Null-Gate  | Task-2-Strukturfortschreibung | bestätigt                                |
| Nitro-Preset Vercel                | `vite.config.ts:148-150`      | bestätigt                                |
| Rating und relative Bild-URL       | historischer Ausgangsbefund; `practice-json-ld.ts` und SEO-Vertragstest | code-seitig geschlossen, externe Freigabe offen |
| Gesundheits-JSON in allgemeiner DB | historischer Ausgangsbefund; Boundary-Test und aktuelle Produktionsquellen | geschlossen; kein lokaler Anamnese-Schreib- oder Lesepfad |
| Relaunch-Default                   | `design-skin.ts:27,39-46`     | bestätigt mit localStorage-Einschränkung |
| WXR und GSC-Baseline fehlen        | Dateiinventar                 | bestätigt                                |

### 7.3 Präzisierungen

- Die 45-URL-Differenz ist ein SEO-Migrationsrisiko, keine Zählung bereits bestehender 404.
- Die Catch-all-Route kann Archivseiten rendern, setzt aber `noindex,follow`; eine gerenderte Seite ist daher nicht automatisch ein freigegebenes Indexziel.
- Der Build- und Hauptchunkbefund ist ein technischer Hinweis; reale CWV benötigen Release- und Felddaten.
- Historische Browserläufe sind nützlich, ersetzen aber kein versioniertes Releasegate.
- Der öffentliche Crawl ist kein Ersatz für WXR, Datenbank, Plugin-/Themeinventar und Restoreprüfung.

## 8. Technische Architektur

### 8.1 Verifizierter Stack

- TanStack Start `^1.168.0`;
- TanStack Router `^1.170.0`;
- React `^19.2.0`;
- Vite `^8.2.0`;
- Tailwind CSS `^4.3.0`;
- Nitro `3.0.260610-beta`;
- Better Auth `^1.6.0`;
- PostgreSQL über `pg`, lokaler PGLite-Fallback;
- TypeScript, Zod und serverseitige TanStack-Funktionen.

### 8.2 Rendering und Routing

Die Anwendung nutzt dateibasiertes TanStack-Routing und serverseitiges Rendering über Nitro. Der Quellbaum enthält 38 Routendateien einschließlich Root, dynamischer Archivroute und Auth-API.

Die dynamische Route `/$slug`:

- sucht Inhalte im lokalen Archivkatalog;
- blockiert Slugs, die als dedizierte Route existieren;
- liefert unbekannte Slugs als Not Found;
- setzt Archivtreffer auf `noindex,follow`;
- verwendet lokale Archivdaten, nicht Payload CMS.

### 8.3 Daten und Authentifizierung

- Kontakt- und Anamneseformulare schreiben über Serverfunktionen in PostgreSQL/PGLite.
- `listInbox` ist mit `authMiddleware` geschützt.
- Die beiden öffentlichen Submitfunktionen besitzen Validierung, aber kein sichtbares Auth-, Rate-Limit- oder separates Gesundheitsdatengate.
- Eine Produktionsbewertung von Session-, Cookie-, CSRF- und Proxyverhalten erfordert den tatsächlichen Zielbetrieb.

### 8.4 Harte Kopplungen

- Praxisstammdaten in `src/content/site.ts`;
- Domain- und Schema-IDs in `JsonLd.tsx`;
- lokaler Archivkatalog;
- statische Sitemap;
- Vercel-Preset im Build.

Diese Kopplungen verhindern die Integrationsstufe 1 nicht, müssen vor einer allgemeinen Mehrmandanten- oder Payload-Inhaltsarchitektur jedoch abstrahiert werden.

## 9. Headless-CMS-Integrationsreife

### 9.1 Stufe 1: External App

**Status:** teilweise bestätigt.

Das Architekturmodell ist klar: Rauch bleibt zunächst eine eigenständige TanStack-App und wird als Plattform-Workload registriert. Offen sind:

- `node-server`-Build;
- `start:node`;
- Dockerfile und `.dockerignore`;
- `/healthz`;
- Plattform-Site-Seed;
- Compose-Service;
- Caddy-Routing und Staging-Abnahme.

Read-only bestätigt ist, dass der lokale Plattform-Arbeitsbaum bereits `external-app`, `managed-container`, Upstream-Service/-Port, Healthcheckpfad, Runtime-Warnungen und Caddy-Fragmente modelliert. Diese Vertragsdateien sind dort jedoch noch unversioniert; außerdem fehlen ein Rauch-Site-Seed und ein Runtime-Manifest-Integrationstest. Damit ist die Architektur technisch konkret, aber noch nicht reproduzierbar abgenommen.

### 9.2 Stufe 2: Payload-Inhalte

**Status:** nicht bestätigt.

Der geplante `ContentProvider` existiert noch nicht. Payload-Collections, Review-Governance, Redirects und MigrationRecords sind Zielarchitektur. Gesundheits- und Anamnesedaten bleiben ausdrücklich außerhalb des allgemeinen CMS.

### 9.3 Mandantenfähigkeit

Die Plattform kann perspektivisch mehrere Websites verwalten; die Rauch-App selbst ist derzeit fachlich und technisch auf eine Praxis zugeschnitten. Das ist für einen ersten isolierten Workload zulässig, aber noch kein Nachweis allgemeiner Mandantenfähigkeit innerhalb dieses Repositories.

## 10. Funktions- und Seiteninventar

### 10.1 Quantitatives Inventar

| Kategorie                 | Anzahl | Nachweis                                 |
| ------------------------- | -----: | ---------------------------------------- |
| Routendateien             |     38 | `src/routes`, rekursiv                   |
| Komponenten gesamt        |     19 | `src/components`, rekursiv               |
| Site-Komponenten          |     16 | `src/components/site`                    |
| UI-Komponenten            |      2 | `src/components/ui`                      |
| Preview-Bridge-Komponente |      1 | `src/components/preview-host-bridge.tsx` |
| Scripts                   |     16 | `scripts`                                |
| statische Sitemap-URLs    |     19 | `public/sitemap.xml`                     |
| Hubpfade                  |     18 | `src/content/hubs.ts`                    |

### 10.2 Funktionsgruppen

- öffentliche Start-, Praxis-, Kontakt-, Anfahrt-, Über-mich- und Rechtsseiten;
- Therapie-, Diagnose- und Anliegen-Hubs;
- neun Redirectrouten mit TanStack `redirect`;
- dynamisches noindex-Archiv für weitere bekannte Slugs;
- Kontaktformular;
- Informationsroute zum Online-Anamnesebogen mit sicherem Link zur eigenständigen externen App, ohne lokale Formfunktion;
- Login- und Auth-API;
- strukturierte Daten für Praxis, FAQ und Breadcrumbs;
- Design-Skin-Auswahl mit Relaunch-Default;
- Header, Footer, Slider, Karten, Hubs und mobile CTAs.

Eine vollständige Funktionsfreigabe folgt nicht allein aus Dateivorhandensein. Die Release-E2E-Tests aus Masterplan Task 9 fehlen.

## 11. Vergleich alte und neue Website

| Kriterium          | Alte Live-Website                          | Neue Codebasis                         | Bewertung                                      |
| ------------------ | ------------------------------------------ | -------------------------------------- | ---------------------------------------------- |
| Produktion         | WordPress bleibt live                      | Relaunch/Stagingcode                   | kein Cutover autorisiert                       |
| Live-Seitensitemap | 64 URLs                                    | 19 statische URLs                      | Migrationsmatrix P0                            |
| weitere Altinhalte | WordPress indexierbar je Livekonfiguration | lokales Catch-all mit `noindex,follow` | seitenweise Entscheidung erforderlich          |
| Pfadstil           | Live normalisiert auf Trailing Slash       | Zielvertrag ohne Trailing Slash        | direkte Redirectregeln erforderlich            |
| Design             | YOOtheme/WordPress                         | eigenes Token-/Komponentensystem       | fortgeschritten, nicht abschließend abgenommen |
| mobile CTA         | Live abhängig vom Theme                    | im Relaunch vorgesehen/implementiert   | in Release-E2E zu prüfen                       |
| Schema             | Rank-Math-/WordPress-Ausgabe               | eigenes JSON-LD                        | eigenes Markup enthält P0-Korrekturen          |
| Inhalte            | umfangreicher Altbestand                   | 18 Hubs plus Archiv                    | Parität und Risiko je URL entscheiden          |

Die alte Seite enthält weiterhin mehrere werbliche oder medizinisch sensible Formulierungen. Dass der Relaunch Hinweise wie „kein Heilversprechen“ enthält, ersetzt keine seitenweise fachlich-rechtliche Prüfung.

Das Entfernen des selbstbezogenen `aggregateRating` ist ein internes SEO-, Datenqualitäts- und Freigabegate. Aus dem Quellbefund wird ausdrücklich keine manuelle Google-Maßnahme oder Sanktion abgeleitet. Ebenso müssen `FAQPage`, NAP und Öffnungszeiten nur aus sichtbaren, belegten und autoritativ freigegebenen Daten erzeugt werden.

## 12. WordPress- und Rank-Math-Migrationsstatus

### 12.1 Vorhanden

- `manifest.json`: 64 Seiten, 80 Medien, 0 Crawlfehler;
- 64 Seiten-JSON-Dateien mit öffentlich ermittelbaren Metadaten und Inhalten;
- HTML-Archiv;
- 18 aktuelle Live-Snapshot-HTML-Dateien;
- Rank-Math-Exportbereiche `general`, `modules`, `redirections`, `role-manager`, `sitemap`, `titles`;
- Bildmapping und Uploadinventar.

### 12.2 Nicht vollständig vorhanden

- WXR/XML;
- vollständige WordPress-Datenbank;
- Plugin-, Theme-, MU-Plugin- und Snippetinventar;
- administrative Seitenhierarchie-/Permalinknachweise;
- alle nicht öffentlichen URL-spezifischen Rank-Math-Felder;
- getesteter Restore.

### 12.3 Einordnung

Die vorhandenen Daten reichen für die Fortsetzung der Entwicklung und eine belastbare öffentliche Inhaltsinventur. Für die Abschaltung von WordPress und die vollständige Archiv-/Restorefähigkeit reichen sie nicht.

## 13. Medieninventar

### 13.1 Verifizierte Werte

| Bereich                        | Dateien |                                          Bytes |     gerundet |
| ------------------------------ | ------: | ---------------------------------------------: | -----------: |
| `public` gesamt                |     426 | nicht als einheitlicher Medienbestand bewertet |            — |
| `public/media`                 |     398 |                                     87.574.282 | ca. 83,5 MiB |
| `public/media/originals`       |     255 |                                     67.880.409 | ca. 64,7 MiB |
| Dateien über 1 MiB in `public` |       8 |                                              — |            — |

### 13.2 Vorhandene Zuordnung

`content/wordpress/image-map.json` enthält die Bereiche `matched`, `pages`, `total` und `unmatched`. Der Masterplan dokumentiert zusätzlich die bereits erfolgte Prüfung von `bilder.zip`: keine neuen Bildmotive gegenüber dem Repository, sechs MP3 nicht automatisch importiert, Debug-/Logartefakte ausgeschlossen.

### 13.3 Offene Gates

- Bildrechte und Quellen je produktivem Medium;
- fachlich passender Alt-Text;
- Zielseite und Verwendungszweck;
- responsive Größen;
- WebP-/AVIF-Ableitungen;
- Vermeidung unnötiger Originalauslieferung;
- Gerätebilder nur nach ausdrücklicher Freigabe ersetzen.

## 14. SEO- und Search-Console-Status

### 14.1 Technisch verifiziert

- alte `robots.txt` erreichbar und verweist auf `sitemap_index.xml`;
- alte `page-sitemap.xml` enthält 64 URLs;
- neue `public/robots.txt` erlaubt öffentliche Inhalte und sperrt unter anderem Login, Praxis, Archiv und API;
- neue `public/sitemap.xml` enthält 19 URLs;
- neue Catch-all-Archivroute setzt `noindex,follow`;
- alte Live-Seite normalisiert non-www/HTTPS und Trailing Slash;
- Zielvertrag des Relaunches verwendet non-www/HTTPS und keine Trailing Slashes außer Root.

### 14.2 Nicht verifiziert

Ohne GSC-Export sind nicht belastbar bekannt:

- aktuelle Rankings;
- Klicks, Impressionen und CTR;
- URL-bezogene Suchanfragen;
- Indexierungs- und Canonicalentscheidungen von Google;
- Core Web Vitals im Feld;
- interne/externe Links aus GSC;
- manuelle Maßnahmen und Sicherheitsmeldungen.

### 14.3 Konsequenz

Keine Alt-URL darf nur aufgrund der neuen Sitemap gelöscht oder pauschal weitergeleitet werden. Die strukturelle 64-URL-Matrix liegt vor: 5 URLs bleiben auf 200/indexierbar, 59 URLs verbleiben als nicht deploybare Prüfentscheidungen. GSC-, Backlink-, Inhaltsrisiko- und Businessdaten müssen diese 59 Entscheidungen noch evidenzbasiert vervollständigen; fehlende Werte sind `unknown` und nicht `0`.

## 15. E-E-A-T- und Gesundheitsinhaltsprüfung

### 15.1 Vorhandene positive Signale

- sichtbare Praxisidentität und Kontaktangaben;
- Qualifikations- und Rolleninformationen;
- Praxis-, Impressums-, Datenschutz- und Rechtshinweisseiten;
- Hinweise zur Abgrenzung gegenüber ärztlicher Diagnose und Behandlung;
- Quellen- und FAQ-Elemente auf Teilen der Relaunchseiten;
- Notfallhinweise auf der Live-Seite.

### 15.2 Offene Governance

Für die 19 Zielseiten fehlt eine vollständig versionierte Matrix mit:

- Autor;
- fachlichem Reviewer;
- rechtlichem Reviewer;
- Review- und Aktualisierungsdatum;
- Quellen und Evidenz;
- Risikoklasse;
- Entscheidung zu Wirk-, Diagnose- und Erfolgsbehauptungen;
- Medienrechten;
- Freigabestatus.

### 15.3 Urteil

**Status:** teilweise bestätigt. Technische Transparenzsignale sind vorhanden; vollständige E-E-A-T-, medizinische und rechtliche Freigabe ist nicht belegt. Aussagen zur HWG-Konformität bleiben fachjuristisch zu prüfen.

## 16. Performance und mobile Qualität

### 16.1 Belegte Ausgangsdaten

Der Masterplan dokumentiert für die alte Startseite eine mobile Lighthouse-Momentaufnahme mit Performance 78, Accessibility 95, Best Practices 100, SEO 100, FCP 2,3 s, LCP 4,4 s, TBT 200 ms und CLS 0,055. Diese Werte sind Labordaten, keine CrUX-Felddaten.

Für die neue Codebasis dokumentiert der Masterplan einen großen Hauptchunk von rund 1.016,88 kB minifiziert beziehungsweise 200,65 kB gzip. Dieser Befund ist als Optimierungssignal zu behandeln.

### 16.2 Nicht zulässige Schlussfolgerungen

- SSR garantiert keine guten FCP-/LCP-Werte.
- Ein erfolgreicher Build garantiert keine mobile Qualität.
- Historische Browserläufe garantieren keine aktuelle Releasequalität.

### 16.3 Releasegate

Erforderlich sind Messungen gegen den echten Node-Releasebuild auf den im Masterplan benannten Kernrouten, mehreren Viewports und anschließend GSC-/CrUX-Feldüberwachung.

## 17. Barrierefreiheit

### 17.1 Codebefunde

- Bildkomponenten besitzen Alt-Attribute; dekorative Bilder verwenden teilweise bewusst `alt=""`.
- semantische Komponenten und Mainbereiche sind im Quellcode vorhanden;
- der Masterplan dokumentiert historische Desktop-/Mobileläufe ohne Overflow und fehlende Alt-Attribute;
- eine versionierte Playwright-Konfiguration und vollständige Accessibility-Tests fehlen.

### 17.2 Nicht belegte Aussagen

Nicht abschließend belegt sind:

- vollständige WCAG-2.2-Konformität;
- Tastaturablauf aller Interaktionen;
- Screenreader-Verständlichkeit;
- Fokusreihenfolge und Fokusmanagement;
- 200-%-/400-%-Zoom und Reflow;
- Kontraste aller Zustände;
- Fehlermeldungs- und Formularzugänglichkeit;
- reduzierte Bewegung.

### 17.3 Status

**Teilweise bestätigt.** Ein guter Codeausgangspunkt ist sichtbar; die vollständige automatisierte und manuelle Abnahme bleibt P1.

## 18. Datenschutz und Sicherheit

### 18.1 Historischer Gesundheitsdatenbefund und geschlossene Website-Grenze

Im geprüften Ausgangsstand verarbeitete `submitAnamnese` unter anderem Geburtsdatum, Anliegen, Diagnosen, Medikation, Allergien und weitere Gesundheitsinformationen. Die damalige Funktion:

1. validiert die Eingabe;
2. serialisiert sie vollständig mit `JSON.stringify`;
3. schreibt sie in `anamnesis_submissions.payload` als `text`;
4. besitzt im geprüften Code kein Auth-, Verschlüsselungs-, Retention- oder separates Freigabegate.

Dieser historische Stand verletzte den Gesundheitsdaten-Grenzvertrag. Seit Task 7 enthält die Relaunch-Website keinen lokalen Anamnese-Wizard, Submit-, Tabellen- oder Inbox-Pfad mehr. `/online-anamnesebogen` informiert über die Grenze und verlinkt ausschließlich die eigenständige externe App; eine spätere lokale Reaktivierung ist nicht vorgesehen. Der externe Repository-Review `RAUCH-TASK-07-REVIEW` bestätigte den Website-Grenzvertrag ohne Findings. Die externe App und ihre Datenschutz-, Authentisierungs-, Speicher-, Aufbewahrungs- und Löschprozesse wurden in diesem Repository-Task nicht abgenommen.

### 18.2 Weitere technische Prüfpunkte

- öffentliches Kontaktformular ebenfalls ohne sichtbares Rate-Limit/Captcha;
- Server- und Sicherheitsheader müssen am tatsächlichen Zielbetrieb geprüft werden;
- CSP darf notwendige Plattformskripte nicht unbeabsichtigt blockieren;
- Logs und Error-Tracking dürfen keine Gesundheits- oder Formulardaten enthalten;
- Secrets dürfen nicht in Git, Bericht oder Frontendvariablen gelangen.

### 18.3 Prüfgrenze

Dies ist eine technische Risikobewertung. Rechtsgrundlage, Auftragsverarbeitung, DSFA, Aufbewahrung und Betroffenenprozesse benötigen Datenschutzprüfung.

## 19. Infrastruktur und Deployment

### 19.1 Alte Produktion

Öffentlich verifiziert wurden nginx, PHP 8.2.33 und PleskLin. Nicht öffentlich prüfbar sind vHost-Regeln, Cache, TLS-Konfiguration, DNS/TTL, WAF/CDN, Backups, Cronjobs und Restore.

### 19.2 Neue Zielumgebung

Der bevorzugte Vertrag ist:

- `managed-container`;
- Node-Server-Build;
- Service `rauch-site`;
- Port 3000;
- `/healthz`;
- Routing beider Hosts über die Plattform;
- Staging vor Live-Umschaltung.

Der Quellcommit besitzt weder `Dockerfile` noch `/healthz` noch passende Build-/Startskripte. Die Plattformintegration ist daher noch nicht ausführbar abgeschlossen.

## 20. Tests und Qualitätssicherung

### 20.1 Frische Baseline im isolierten Worktree

| Befehl                           | Exit |             Ausgeführt | Bestanden | Fehler | Bewertung                                          |
| -------------------------------- | ---: | ---------------------: | --------: | -----: | -------------------------------------------------- |
| `npm ci`                         |    0 | 418 Pakete installiert |         — |      — | reproduzierbar; Recharts-Deprecationwarnung        |
| `npm test` (Ausgangsprüfung)     |    0 |                      0 |         0 |      0 | historischer Defekt: keine Tests liefen            |
| `node --test scripts/*.test.mjs` |    0 |                     41 |        41 |      0 | bestanden                                          |
| `npm test` (Task 1)              |    0 |                     44 |        44 |      0 | bestanden; rekursive Testermittlung                |
| Nulltreffer-Regressionstest      |    1 |                      0 |         0 |      0 | bestanden; leere Testsuite wird abgewiesen         |
| `npm run typecheck`              |    0 |                      — |         — |      0 | bestanden                                          |
| `npm run lint`                   |    0 |                      — |         — |      0 | bestanden mit 3 Warnungen                          |
| `npm run build`                  |    0 |                      — |         — |      0 | Vercel-Build bestanden; DB-Migration übersprungen  |
| `npm run preview` + HTTP-Abruf   |    — |                      1 |         0 |      1 | HTTP 500; erwartetes `dist/server/server.js` fehlt |

Der Preview-Befund wurde nach dem frischen Build reproduziert: Vite meldete `ERR_MODULE_NOT_FOUND` für `dist/server/server.js`. Damit ist nicht der Vercel-Build selbst fehlgeschlagen, sondern der lokale Build-/Startvertrag inkonsistent.

Task 1 schließt das frühere npm-Nichtnull-Gate: `scripts/run-tests.mjs` ermittelt `scripts/**/*.test.mjs` rekursiv und deterministisch, propagiert den Node-Test-Exitcode und liefert bei null gefundenen Testdateien Exitcode 1. Die Baseline-Zeilen bleiben ausschließlich als historische Evidenz erhalten.

### 20.2 Bestehende Lintwarnungen

1. ungenutzter `readFile`-Import in `scripts/wp-public-crawl.mjs`;
2. Fast-Refresh-Grenze in `src/components/site/DesignSkin.tsx`;
3. ungenutzte ESLint-Deaktivierung in `src/lib/auth/use-current-user.ts`.

### 20.3 Fehlende Releasegates

- Redirect-/Canonical-E2E;
- Node-Container- und Healthchecktest;
- mobile Kernrouten-E2E;
- Accessibility- und Performancegate.

Der SEO-/Schema-Codevertrag ist seit Task 4 automatisiert (4/4 Zieltests); der aktuelle Gesamtstand umfasst 73/73 Tests, darunter 18/18 Task-2-Vertragstests. Der externe Entwicklerreview für Task 4 ist freigegeben. Schema-Validator- und autoritative NAP-Freigaben bleiben getrennte offene Abnahmen. Das historische `.vercel/output` wurde aus der Versionskontrolle entfernt und wird ignoriert; Releases müssen aus dem geprüften Quellstand neu gebaut werden, bis Task 8 den Deploymentvertrag verbindlich regelt.

Der Paritätsaudit wurde im Task-2-Abschluss gegen den lokalen Entwicklungsserver vollständig ausgeführt (18 Seiten, Exitcode 0). Seine inhaltlichen Befunde sind ausdrücklich kein positives Paritätsgate: Je Seite fehlen weiterhin 49–95 % der geprüften Merkmale. Die Behebung und fachliche Abnahme bleiben Task 6 zugeordnet.

## 21. Widersprüche und veraltete Informationen

| Quelle oder Aussage                                                    | Bewertung             | Aktuelle Regel                                                                                       |
| ---------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| ältere Übergabe: GitHub nicht erforderlich                             | veraltet              | GitHub-Sync ist verbindlich                                                                          |
| externer Bericht: Masterplan 95 % exakt                                | nicht belastbar       | einzelne Aussagen werden belegt, nicht pauschal prozentual bewertet                                  |
| externer Bericht: 45 URLs drohen als technische Seiten zu verschwinden | zu pauschal           | 45 URLs fehlen in der statischen Sitemap; Catch-all kann noindex-Inhalte liefern; Matrix entscheidet |
| externer Bericht: 19 Komponenten in `site` und `ui`                    | unpräzise             | 18 dort, 19 inklusive Preview-Bridge                                                                 |
| externer Bericht: 10 Dateien >1 MB                                     | falsch                | 8 Dateien >1 MiB                                                                                     |
| externer Bericht: 85 MB in Originals                                   | falsch                | 67.880.409 Bytes, ca. 64,7 MiB                                                                       |
| externer Bericht: SSR sorgt für schnellen FCP/LCP                      | nicht belegt          | messen statt ableiten                                                                                |
| externer Bericht: Alt-Texte 100 % und WCAG AAA                         | zu weitgehend         | Attribute teilweise verifiziert; vollständige Abnahme offen                                          |
| externer Bericht: HWG-Konformität weitgehend abgeschlossen             | fachlich nicht belegt | seitenweise medizinisch-rechtliche Freigabe erforderlich                                             |
| externer Bericht: visuell freigegeben                                  | nicht belegt          | Product-Owner-/QA-Freigabe dokumentieren                                                             |
| `src/styles.css:204`: Alt-Design als Default                           | veraltet              | Laufzeitvertrag und Release-E2E müssen Relaunch-Design als Default belegen                           |
| `docs/relaunch-2026/03-design-system-relaunch.md:84`: Alt-Default      | veraltet              | Dokument an tatsächlichen Default und den localStorage-Fallback angleichen                           |

## 22. Fehlende Daten und Zugänge

### 22.1 Zwingend vor URL- und SEO-Entscheidungen

- GSC Queries und Pages mit maximal sinnvollem Zeitraum;
- Devices, Countries und Search Appearance;
- Indexierung, Sitemaps, CWV, Links, manuelle Maßnahmen und Sicherheit;
- Backlinkdaten, sofern außerhalb GSC vorhanden.

### 22.2 Zwingend vor WordPress-Abschaltung

- WXR/XML;
- Datenbank- und `wp-content`-Backup;
- Plugin-, Theme-, MU-Plugin- und Snippetinventar;
- Permalink-, Lesen-, Benutzerrollen- und Seitenhierarchienachweis;
- getesteter Restore.

### 22.3 Zwingend vor Cutover

- Plesk/nginx-Host- und Redirectregeln;
- DNS/TTL und TLS-Metadaten ohne private Schlüssel;
- Cache/Proxy/WAF/CDN;
- anonymisierte 404-/Bot-/Errorauswertung;
- Backup-/Rollbackweg;
- fachlich-rechtliche Inhaltsfreigaben;
- Medienrechte;
- Datenschutzfreigabe des Formularwegs.

### 22.4 Hilfreich oder ersetzbar

- nicht öffentliche Rank-Math-Fokuskeywords, sofern öffentlich wirksame Metadaten vollständig belegt sind;
- direkter WordPress-Adminzugang, wenn vollständige Exporte bereitgestellt werden;
- Plesk-Passwort, wenn alle benötigten sicheren Exporte durch den Betreiber geliefert werden.

Zugangsdaten dürfen niemals im Chat oder Repository übermittelt werden.

## 23. Priorisiertes Risiko- und Blockerregister

| ID   | Bereich       | Risiko                                        | Prio               | Abnahme                                     |
| ---- | ------------- | --------------------------------------------- | ------------------ | ------------------------------------------- |
| R-01 | QA            | `npm test` kann mit null Tests grün wirken    | geschlossen        | aktuell 73/73 über Standardscript; Nulltreffer = 1 |
| R-02 | SEO           | 59 Alt-URLs ohne GSC-/Product-Owner-Freigabe  | P0                 | strukturelle Matrix steht; Gate B verlangt evidenzbasierte Freigabe ohne Ketten |
| R-03 | GSC           | Ranking-/Indexdaten fehlen                    | P0                 | datierte private Baseline                   |
| R-04 | Schema        | Rating, relative Bild-URL, Öffnungszeiten     | P0 Validator/NAP   | Codevertrag 4/4 und Entwicklerreview freigegeben; Validator/NAP offen |
| R-05 | Datenschutz   | Gesundheits-JSON in allgemeiner DB            | geschlossen        | lokale Funktion und getracktes Alt-Prebuild entfernt; 7/7 Boundary-Tests |
| R-06 | Deployment    | kein Node-/Containervertrag                   | P0                 | produktionsnaher Container und `/healthz`   |
| R-07 | WordPress     | kein vollständiges Abschaltarchiv             | P0 vor Abschaltung | isoliert getesteter Restore                 |
| R-08 | Infrastruktur | interne Cutoverdaten fehlen                   | P0 vor Cutover     | freigegebenes Infrastruktur-/Rollbackpaket  |
| R-09 | Inhalt        | fachlich-rechtliche Welle 2/Governance offen  | P0 vor Go-live     | 19-Seiten-Reviewmatrix                      |
| R-10 | Accessibility | kein vollständiges Releasegate                | P1                 | automatisierte und manuelle Abnahme         |
| R-11 | Performance   | großer Hauptchunk, keine Felddaten            | P1                 | Release- und CWV-Gates                      |
| R-12 | Medien        | Rechte/Varianten nicht vollständig belegt     | P1                 | Medienrechte- und Ableitungsmatrix          |
| R-13 | CMS           | ContentProvider und Payload-Stufe 2 fehlen    | P2                 | Contract-getesteter Pilotinhalt             |
| R-14 | SEO           | Slash-/Canonical-Vertrag nicht umgesetzt      | P0                 | direkte 301-Normalisierung ohne Ketten      |
| R-15 | Schema        | FAQPage-Strategie nicht bereinigt             | P1 externe Freigabe | Markup entfernt, sichtbare FAQs erhalten     |
| R-16 | Local SEO     | NAP-/Öffnungszeiten nicht autoritativ geklärt | P1                 | bestätigte Stammdaten und Profilabgleich    |
| R-17 | Inhalt        | NLS-Diagnostik/Kontakt/Linkprofil noch offen  | P1                 | fachlich abgenommene Welle 2                |
| R-18 | Plattform     | External-App-Vertrag noch unversioniert       | P0 vor Integration | reproduzierbarer Plattform-Commit und Tests |

Die detaillierten maschinenlesbaren Datensätze stehen in `02-MASCHINENLESBARE-STATUSMATRIX.json`.

## 24. Vollständiger Umsetzungsplan

Der verbindliche Ausführungsplan ist `docs/relaunch-2026/00-MASTERPLAN.md`. Seine zwölf Tasks bleiben in folgender Abhängigkeitslogik maßgeblich:

1. Test-Gate reparieren (geschlossen).
2. GSC- und 64-URL-Matrix: strukturelle Baseline erzeugt; GSC-/Product-Owner-Gate für 59 Prüfzeilen offen.
3. WordPress-/Plesk-Abschaltarchiv erfassen.
4. NAP und strukturierte Daten korrigieren (Codevertrag umgesetzt; externe Validator-/NAP-Freigabe offen).
5. Canonicals und Redirects implementieren.
6. Welle 2, E-E-A-T und HWG-Review abschließen.
7. Externe Online-Anamnese-Grenze herstellen (geschlossen und extern ohne Findings freigegeben; lokale Funktion entfernt).
8. Node-/Containervertrag implementieren.
9. Release-, Mobile-, Accessibility- und Performancegates etablieren.
10. Rauch als external-app in der Plattform registrieren.
11. Payload-ContentProvider stufenweise einführen.
12. Cutover, Monitoring und Rollback durchführen.

Sofort parallelisierbar nach separaten Branches beziehungsweise klaren Dateigrenzen:

- Task 4 und Task 7;
- Beschaffung externer Daten für Task 2 und 3;
- Vorbereitung des Node-Vertrags Task 8;
- redaktionelle Reviewmatrix aus Task 6.

Nicht vorziehen:

- Redirects und Sitemap ohne URL-Matrix;
- Plattform-Live-Routing ohne Container-/Healthvertrag;
- Payload-Contentmigration ohne Review-Governance;
- Domainwechsel ohne vollständige Gates und Rollback.

## 25. Abnahme- und Go-live-Kriterien

Vor einer produktiven Freigabe müssen mindestens erfüllt sein:

1. Standardscript führt eine Nichtnull-Testsuite aus; alle Tests bestehen.
2. Typecheck, Lint, Build, Node-Start und Healthcheck bestehen.
3. Alle 64 Alt-URLs besitzen freigegebene Entscheidungen.
4. Redirects sind direkt, kettenfrei und nicht pauschal auf Root gerichtet.
5. Canonicals, Robots, Sitemap und interne Links sind konsistent.
6. GSC-Baseline ist gesichert.
7. strukturierte Daten enthalten nur belegte Praxiswerte.
8. Gesundheitsdaten bleiben außerhalb allgemeiner CMS-/Plattformdatenbanken.
9. 19 Zielseiten sind fachlich, rechtlich, redaktionell, mobil und technisch freigegeben.
10. Medienrechte und responsive Varianten sind dokumentiert.
11. Accessibility- und Performancegates sind bestanden oder ausdrücklich risikobewertet freigegeben.
12. WordPress-/Plesk-Backup und Restore sind getestet.
13. Plattform-Staging ist gesund und nicht unbeabsichtigt indexierbar.
14. Cutover- und Rollbackverantwortliche sind benannt.

## 26. Rollback- und Überwachungsplan

### 26.1 Vor Cutover

- WordPress und Plesk unverändert als Produktions-/Rollbackquelle erhalten;
- vollständige Backups und Restoretest;
- DNS-TTL und Umschaltfenster dokumentieren;
- 64-URL-Probe gegen Staging;
- Formulare, Call-to-Actions und kritische Routen testen;
- Staging vor Indexierung schützen.

### 26.2 Nach Cutover

- erste 24 Stunden: Verfügbarkeit, 5xx, Formulare, Redirects, Canonicals, Robots und Sitemap;
- erste 7 Tage: Botzugriffe, Indexierung, Canonicals, CWV und kritische Zielseiten;
- mindestens 4 Wochen: Queries, Pages, Klicks, CTR, Rankings und Conversions gegen Baseline.

### 26.3 Rollbacktrigger

- anhaltende 5xx-Fehler;
- falsche Canonicals, Robots oder Sitemap;
- defekte Terminanfrage beziehungsweise Kontaktwege;
- unerwartete 404/410 auf kritischen Alt-URLs;
- ungeklärte Gesundheitsdatenübertragung;
- erheblicher organischer Einbruch außerhalb der definierten Toleranz.

## 27. Abschließendes Reifegradurteil

| Entscheidung                  | Urteil                        | Begründung                                                    |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Git-Ausgangsstand synchron    | bestätigt                     | HEAD und origin/relaunch identisch auf `c6aa58e`              |
| Masterplan übergabefähig      | bestätigt mit Einschränkungen | mit diesem Bericht und Matrix eindeutig präzisiert            |
| Entwickler kann beginnen      | bestätigt                     | lokale P0-Tasks sind ausführbar                               |
| LLM kann ohne Chat übernehmen | bestätigt                     | Dokumentenhierarchie und strukturierte Statusmatrix vorhanden |
| WordPress-Daten vollständig   | nicht bestätigt               | Crawl umfangreich; WXR/Admin-/Restorepaket fehlt              |
| SEO-Migration freigegeben     | nicht bestätigt               | Strukturmatrix vorhanden; GSC und fachliche Freigabe für 59 Prüfzeilen fehlen |
| Headless-Stufe 1 fertig       | nicht bestätigt               | Container-/Health-/Plattformvertrag offen                     |
| Headless-Stufe 2 fertig       | nicht bestätigt               | ContentProvider/Payload-Migration offen                       |
| Go-live bereit                | nicht bestätigt               | mehrere P0-/P1-Gates offen                                    |

**Nächste Maßnahme mit hohem Nutzen und geringem Risiko:** Die Task-2-Strukturmatrix unabhängig prüfen lassen und anschließend den privaten GSC-Seitenexport sowie die fachliche Product-Owner-Freigabe für die 59 Prüfzeilen beschaffen. Task 5 darf die Matrix erst nach diesem Gate konsumieren. JSON-LD und die Gesundheitsdatengrenze sind code-seitig bereits geschlossen und extern freigegeben; WordPress-/Plesk-Evidenzpakete bleiben parallel offen.

## 28. Quellen- und Nachweisverzeichnis

### 28.1 Repository

- Quellcommit `c6aa58ef980bdd4d84be3fcc9b237e1296693722`;
- Task-1-Fortschreibung: `package.json`, `scripts/run-tests.mjs`, `scripts/run-tests.test.mjs`;
- Plattform-Basiscommit `2d233564ca98ed48a0a118a3165c242150448436` plus als nicht reproduzierbar gekennzeichneter lokaler Arbeitsstand;
- ursprünglicher externer Entwickler-/LLM-Bericht, SHA-256 `643408D043281C52E9C48B7C7390E54239B26346B95AB52561C8855D4E53F80E`;
- ursprüngliche externe Markdown-Matrix, SHA-256 `A95D3F9043061ED582C2B95B59812ADD2CC275B81A23B97F44049A1B2A63691B`;
- `docs/relaunch-2026/00-MASTERPLAN.md`;
- `package.json`;
- `vite.config.ts`;
- `src/routes`;
- `src/components`;
- `src/content/hubs.ts`;
- `src/content/site.ts`;
- `src/content/archive/catalog.json`;
- `src/components/site/JsonLd.tsx`;
- `src/lib/actions.ts`;
- `src/lib/design-skin.ts`;
- `migrations/0002_practice.sql`;
- `content/wordpress/manifest.json`;
- `content/wordpress/pages`;
- `content/wordpress/rank-math-settings.json`;
- `content/wordpress/image-map.json`;
- `public/robots.txt`;
- `public/sitemap.xml`;
- `scripts/*.test.mjs`.

### 28.2 Öffentliche Livequellen

- `https://rauch-heilpraktiker.de/`;
- `https://rauch-heilpraktiker.de/robots.txt`;
- `https://rauch-heilpraktiker.de/page-sitemap.xml`;
- HTTP-, Host- und Slashvarianten wie in Kapitel 4 dokumentiert.

### 28.3 Leitquellen

Die aktuellen offiziellen Leitquellen zu Google Search, Redirects, Canonicals, Mobile-first, Reviews, TanStack Hosting, WCAG, HWG und DSGVO sind im Masterplan Kapitel 8 verlinkt und bleiben für die Umsetzung maßgeblich. Dynamische Richtlinien sind zum jeweiligen Implementierungs- und Freigabezeitpunkt erneut gegen die offiziellen Primärquellen zu prüfen.
