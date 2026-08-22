# Fertigmeldung – Task 7: Externe Online-Anamnese-Grenze

## Exakter Wortlaut für den Entwickler

Task 7 „Externe Online-Anamnese-Grenze / STAT-018“ ist entsprechend der verbindlichen Produktentscheidung implementiert, testgetrieben verifiziert sowie intern und extern ohne verbleibende Findings freigegeben. Der externe Review `RAUCH-TASK-07-REVIEW` bestätigte am 2026-08-22 alle deklarierten Checks und empfiehlt als nächsten Schritt Task 2 „GSC- und 64-URL-Matrix / STAT-011“.

Die Relaunch-Website enthält **keinen eigenen Online-Anamnesebogen**. Sie erfasst, übermittelt, speichert und listet keine Online-Anamnesedaten. Die interne Route `/online-anamnesebogen` ist ausschließlich eine Informationsseite und öffnet per sicherem externem Link die eigenständige App unter `https://naturheilpraxis-rauch.lovable.app/`. Die externe App ist ein separates System und nicht Bestandteil dieser Repository-Abnahme.

Kanonisches Repository:

`C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Kanonischer Branch: `relaunch-konzept`

Ausgangscommit:

`46e67a96fb0c46bb9d9d3349e73eecbe84ca61ba`

Task-7-Designcommit:

`7eb532daae224aa4d098f317643154153f261631`

Task-7-Plancommit:

`ea907fd13a0ca0b6e23bb94e873bfd3e9245e5b2`

Task-7-Implementierungscommits:

- `2b64fbd5d3f46536a8c8092c2f1e943bf806bab9` – lokale Gesundheitsdatenverarbeitung entfernt;
- `65c30415f9f98953db73977e3f80822f6711872e` – externe Grenze und sichere Nutzerführung umgesetzt;
- `0aa0b919262185f225658596b6516550f9a6a5e8` – kanonische Statusdokumentation synchronisiert.

Reviewhärtung:

- `4af24268d5e4e7a435fba7738bc2502e9033dbf8` – deploybare historische Prebuild-Artefakte aus Git entfernt und Boundary-Test vervollständigt;
- `d36cb51928d06c185aee32422f18dd4f8173138e` – Review-Funde in Vollbericht, Masterplan, Design, Plan und Statusmatrix konsolidiert.

## Umgesetzter Umfang

1. Lokale Gesundheitsdatenfunktion entfernt
   - `src/components/site/AnamneseWizard.tsx` gelöscht;
   - `submitAnamnese()` und der Zugriff auf `anamnesis_submissions` aus `src/lib/actions.ts` entfernt;
   - lokale Anamnese-Formulare und -Datensätze aus der Praxis-Inbox entfernt.
2. Externe Systemgrenze umgesetzt
   - kanonische URL zentral in `src/content/external-links.ts` definiert;
   - `/online-anamnesebogen` als reine Informationsseite mit prominentem externem CTA umgesetzt;
   - Link öffnet mit `target="_blank"` und `rel="noopener noreferrer"`;
   - kein `iframe`, Proxy, Shared Login, Shared Auth oder Shared Database;
   - `/anamnese` bleibt als interne Kompatibilitätsweiterleitung erhalten.
3. Aktive Website-Texte korrigiert
   - Datenschutz- und Downloadtexte beschreiben die externe Systemgrenze korrekt;
   - telefonisches Erstgespräch bleibt als Alternative sichtbar.
4. Historische Daten unverändert
   - vorhandene Migrationen und historische Datenbestände wurden nicht verändert oder gelöscht.
5. Deploybarer Quellvertrag gehärtet
   - 119 historische Dateien unter `.vercel/output` wurden aus Git entfernt;
   - `.vercel/output/` ist ignoriert und wird ausschließlich frisch aus dem geprüften Quellstand gebaut;
   - ein historisches Prebuilt kann dadurch nicht mehr versehentlich aus dem Repository deployt werden.
6. Kanonische Dokumentation
   - Masterplan, Vollbericht, JSON-Statusmatrix, Design und Umsetzungsplan sind synchron;
   - `STAT-018` steht für den Website-Umfang auf `bestätigt`;
   - die separate Datenschutz-/Sicherheitsprüfung der Lovable-App bleibt ausdrücklich außerhalb dieses Tasks.

## Frische Verifikation auf `d36cb51928d06c185aee32422f18dd4f8173138e`

| Prüfung | Ergebnis |
| --- | --- |
| vollständiger TDD-Red-Lauf gegen Basis `46e67a9` | Exit 1; 1/7 bestanden, 6/7 erwartungsgemäß fehlgeschlagen; alle Grenzverletzungen einschließlich 119 Prebuild-Dateien ausgegeben |
| gezielter Boundary-Test | 7/7 bestanden, Exit 0 |
| `npm test` | 55/55 bestanden, 0 Fehler, Exit 0 |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0, 0 Fehler, 3 bekannte nicht blockierende Warnungen |
| `npm run build` | Exit 0; Datenbankmigration mangels `DATABASE_URL` erwartungsgemäß übersprungen |
| Statusmatrix-JSON | syntaktisch gültig |
| `git diff --check` | Exit 0 |
| getracktes `.vercel/output` | 0 Dateien |
| Migrationen gegenüber Ausgangscommit | keine Änderungen |
| interner Erst- und Follow-up-Review | abschließend APPROVE, hohe Sicherheit, keine verbleibenden Findings |

## Chrome-Live-View

Die lokale Route `http://localhost:8080/online-anamnesebogen` wurde frisch in Chrome geprüft:

- exakter Link: `https://naturheilpraxis-rauch.lovable.app/`;
- `target="_blank"`;
- `rel="noopener noreferrer"`;
- jeweils 0 `form`, `input`, `textarea`, `select` und `iframe`;
- sichtbarer Hinweis auf die eigenständige externe Anwendung;
- keine Console-Warnungen oder -Fehler.

Die produktive WordPress-Website, Plesk, DNS und die externe Lovable-App wurden nicht verändert.

## Verbindliche Restpunkte

1. Der dokumentierte Task-7-Umfang wurde extern read-only geprüft und ohne Findings freigegeben; Nachweis: `04-EXTERNES-REVIEW.json`.
2. Die externe Lovable-App ist als separates System weiterhin gesondert auf Datenschutz, Authentisierung, Speicherung, Einwilligung, Aufbewahrung und Löschung zu prüfen. Daraus darf keine lokale Website-Integration abgeleitet werden.
3. Task 2 „GSC- und 64-URL-Matrix / STAT-011“ ist als nächster Masterplan-Schritt freigegeben.

Bekannte, nicht blockierende Lintwarnungen außerhalb von Task 7:

- `scripts/wp-public-crawl.mjs`: ungenutzter `readFile`-Import;
- `src/components/site/DesignSkin.tsx`: Fast-Refresh-Grenze;
- `src/lib/auth/use-current-user.ts`: ungenutzte ESLint-Deaktivierung.
