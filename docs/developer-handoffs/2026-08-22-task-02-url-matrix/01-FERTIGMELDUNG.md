# Fertigmeldung – Task 2: GSC- und 64-URL-Matrix (Gate A)

## Exakter Wortlaut für den Entwickler

Task 2 „GSC- und 64-URL-Matrix / STAT-011“ ist im technisch ausführbaren Umfang testgetrieben implementiert sowie intern und extern ohne verbleibende Findings freigegeben. Der externe Review `RAUCH-TASK-02-GATE-A-REVIEW` bestätigt Gate A vollständig. Eine deterministische Strukturmatrix enthält exakt 64 Alt-URLs, alle Sicherheitsinvarianten sind automatisiert, und keine unbelegte URL-Änderung ist deploybar. Gate B bleibt ausdrücklich offen, weil weder ein privater GSC-Seitenexport noch die fachliche Product-Owner-Freigabe der 59 Prüfzeilen vorliegt.

Die aktuelle Matrix ist **keine Freigabe für Redirects, Deindexierung, Canonicals oder Sitemap-Umschaltung**. Sie enthält 5 konservative `keep_200_index`-Zeilen und 59 gesperrte `temporary_noindex_review`-Zeilen sowie 0 Redirects und 0 Löschungen. Task 5 darf diese Matrix erst nach abgeschlossenem Gate B konsumieren.

Kanonisches Repository:

`C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Kanonischer Branch: `relaunch-konzept`

Ausgangscommit:

`35ad22503d6f4c67ced12df343bff7cbaa8ea346`

Zu prüfender Task-2-Implementierungscommit:

`f34c7fd5cee648ebdd65109fd324fe859fe14369`

## Commitfolge

- `22311db079eb4d11d08c0bed2b42919b580504ea` – evidenzbasiertes Matrixdesign;
- `aafa75ea86a86a7cf824bdf01fe1c80c27c7a394` – vollständiger TDD-Ausführungsplan;
- `0492ca26182a478b3dca6decb5b4038d4a62103b` – private Evidenzpfade geschützt;
- `822f7b87b66476bf3a2d4c2dc44982fb9b71d11b` – konservative 64-Zeilen-Baseline;
- `780f12d1ad00c994c386d90ecdb7ef3abbf85e52` – optionaler GSC-Seitenimport;
- `904c9fa0e049063d4c874db1daa93dcae76a23d7` – Redirect-/Deindex-Sicherheitsinvarianten;
- `e8773041cf65c26f506dac25909e7f0a8c1d8615` – vorläufiges Gate in Statusdokumenten;
- `4664b0feaf0abcc3e784f67f2fa00da798f78088` – Verifikation und Paritätsbefund dokumentiert;
- `f4393afa885bea31fe67bd5ee38f8859ea45f222` – interne Review-Härtung;
- `36d2b58819aed08e1defd7a4ed2109229928922f` – Prüfprovenienz und Testzahlen konsolidiert.
- `9a86e39d436a2d279fc96516d52ca6c9eaac372c` – `eol=lf`-Policy und deren Attributvertrag ergänzt.
- `f34c7fd5cee648ebdd65109fd324fe859fe14369` – Bytevergleich auf den versionierten Git-Blob statt die checkoutabhängige Arbeitskopie ausgerichtet.

## Umgesetzter Umfang

1. Private Evidenzgrenze
   - `data/private/gsc/`, `data/private/plesk/` und `data/private/wordpress-backup/` sind ignoriert;
   - private GSC-Rohdaten werden weder kopiert noch versioniert.
2. Deterministische Matrix
   - `scripts/build-url-matrix.mjs` erzeugt `docs/migration/url-migration-matrix.csv` aus `content/wordpress/manifest.json`;
   - exakt 64 eindeutige Alt-URLs in stabiler Manifestreihenfolge;
   - 5 `mapped`-Datensätze werden konservativ `keep_200_index`;
   - 59 `draft`-Datensätze bleiben `temporary_noindex_review` und nicht deploybar;
   - fehlende Messwerte bleiben `unknown`; echte numerische Nullen bleiben `0`.
3. Optionaler GSC-Seitenimport
   - expliziter Parameter `--gsc-pages`;
   - deutsche und englische Kernspalten für Seite, Klicks, Impressionen und Position;
   - quote-aware CSV-Parsing, Query-/Fragment-Normalisierung und Ausschluss fremder Hosts;
   - fehlende oder ungültige Pflichtspalten führen zu einem Fehler.
4. Sicherheitsverträge
   - URL- und Pfadmenge sowie die konkrete URL↔Pfad-Bindung müssen dem Manifest entsprechen;
   - erlaubte Entscheidungen und Evidenzstatus sind auf dokumentierte Werte begrenzt;
   - Selbstredirects, Root-Massenredirects, Ketten und Zyklen werden abgewiesen;
   - 301 und 410 verlangen GSC-Evidenz, `approval_status=approved` und eine reale Freigabeperson;
   - Pending-Zeilen dürfen weder Zielpfad/HTTP-Status noch Canonical/Sitemap-Felder deploybar setzen;
   - der versionierte CSV-Git-Blob muss byte-identisch zum Generatorergebnis sein;
   - `.gitattributes` deklariert für künftige Materialisierungen `eol=lf`; der Bytevertrag selbst ist ausdrücklich unabhängig von der checkoutabhängigen Arbeitskopie.
5. Statuskonsistenz
   - `STAT-011` steht auf `bestätigt mit Einschränkungen`;
   - `STAT-012` bleibt `derzeit nicht prüfbar`;
   - Masterplan, Vollbericht sowie JSON- und Markdown-Statusmatrix unterscheiden Gate A und Gate B ausdrücklich.

## Frische Verifikation auf `f34c7fd5cee648ebdd65109fd324fe859fe14369`

| Prüfung | Ergebnis |
| --- | --- |
| TDD RED – private Pfade | 0/1; erwartete fehlende Ignore-Regel |
| TDD RED – Baseline | 1/2; erwartetes fehlendes Generatorskript |
| TDD RED – GSC-Import | 2/5; drei erwartete fehlende Parser-/CLI-Verträge |
| TDD RED – Sicherheitsinvarianten | 5/13; acht erwartete Sicherheitsverletzungen noch akzeptiert |
| TDD RED – Review-Härtung | 14/18, später 17/18; reproduzierbare Bypässe abgewiesen nach Implementierung |
| TDD RED – Windows-Bytevertrag | 18/19; der Arbeitskopie-Vergleich reproduzierte die CRLF-Abweichung im kanonischen Checkout und belegte die notwendige Trennung von Git-Blob und Checkoutdarstellung |
| Task-2-Vertragstest | 19/19 bestanden, Exit 0 |
| `npm test` | 74/74 bestanden, 0 Fehler, Exit 0 |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0, 0 Fehler, 3 bekannte nicht blockierende Warnungen |
| Generator | 64 Zeilen; 5 Keep; 59 Review; 0 Redirects; 0 Löschungen |
| CSV-SHA-256 | `6B8B0A1E136ECCF6CA055817CDC5A426C4D2C5BB253555053A9E5D79C30A2A00` |
| CSV-Bytevertrag | versionierter Git-Blob byte-identisch zum Generator; `eol=lf` als Checkout-Policy bestätigt |
| Statusmatrix-JSON | syntaktisch gültig |
| Paritätsaudit gegen lokalen Server | 18 Seiten geprüft, Exit 0; weiterhin 49–95 % fehlende Merkmale, deshalb **keine** positive Inhaltsfreigabe; Task 6 |
| `git diff --check` | Exit 0 |
| interner Erst- und Follow-up-Review | abschließend APPROVE, hohe Sicherheit, keine verbleibenden Findings |
| externer Entwickler-/LLM-Review | `RAUCH-TASK-02-GATE-A-REVIEW`, freigegeben, keine Findings; Nachweis `04-EXTERNES-REVIEW.json` |

## Live- und Produktionsgrenze

Task 2 verändert keine sichtbare Website-Funktion. Deshalb ist ein eigener Chrome-UI-Abnahmepunkt nicht einschlägig. Der lokale Entwicklungsserver wurde ausschließlich read-only für den Paritätsaudit verwendet. Die produktive WordPress-Website, Plesk, DNS, Search Console, Redirects, Sitemap, Canonicals und Deindexierung wurden nicht verändert.

## Verbindliche Restpunkte

1. Der externe Entwickler-/LLM-Review ist ohne Findings abgeschlossen; Nachweis: `04-EXTERNES-REVIEW.json`.
2. Gate B bleibt geschlossen, bis ein datierter privater GSC-Seitenexport vorliegt und alle 59 Prüfzeilen fachlich bewertet und durch reale Verantwortliche freigegeben sind.
3. Aus `temporary_noindex_review` darf weder technisch noch redaktionell eine Deindexierungsentscheidung abgeleitet werden.
4. Redirect-Zielerreichbarkeit sowie vollständige Canonical-/Sitemap-Konsistenz werden erst in Task 5 geprüft und umgesetzt.
5. Der Paritätsaudit dokumentiert weiterhin offene Inhalte und bleibt Task 6 zugeordnet.

Bekannte, nicht blockierende Lintwarnungen außerhalb von Task 2:

- `scripts/wp-public-crawl.mjs`: ungenutzter `readFile`-Import;
- `src/components/site/DesignSkin.tsx`: Fast-Refresh-Grenze;
- `src/lib/auth/use-current-user.ts`: ungenutzte ESLint-Deaktivierung.
