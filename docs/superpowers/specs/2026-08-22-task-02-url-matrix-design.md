# Task 2: Evidenzbasierte 64-URL-Migrationsmatrix – Design

## 1. Ziel und Ausgangslage

Task 2 erzeugt aus dem kanonischen WordPress-Manifest eine deterministische, maschinenprüfbare Migrationsmatrix für exakt 64 Live-URLs. Die Matrix ist die spätere Quelle für Redirect-, Canonical-, Sitemap- und Deindexierungsentscheidungen. Sie verändert weder die produktive WordPress-Website noch Plesk, DNS, Search Console oder Redirectregeln.

Geprüfter Ausgangsstand am 2026-08-22:

- Ausgangscommit: `35ad22503d6f4c67ced12df343bff7cbaa8ea346`;
- `content/wordpress/manifest.json` enthält exakt 64 eindeutige Seiten;
- fünf Manifestzeilen tragen `status: mapped`;
- 59 Manifestzeilen tragen `status: draft`;
- `data/private/gsc/` ist nicht vorhanden;
- `STAT-012` bestätigt deshalb weiterhin keine GSC-Baseline.

Fehlende GSC-, Backlink- oder Fachwerte werden niemals als `0` interpretiert. `0` ist ein Messwert; `unknown` bezeichnet fehlende Evidenz.

## 2. Genehmigte Sicherheitsstrategie

Die initiale Matrix ist bewusst konservativ:

- die fünf bereits im Manifest als `mapped` gekennzeichneten URLs erhalten `keep_200_index`;
- die übrigen 59 URLs erhalten `temporary_noindex_review` als **nicht deploybare Prüfentscheidung**;
- ohne GSC-Evidenz und Product-Owner-Freigabe wird keine URL automatisch auf `merge_301` oder `remove_410` gesetzt;
- keine URL wird pauschal nach `/` weitergeleitet;
- eine noch offene Prüfentscheidung darf nicht in Redirect- oder Deindexierungsregeln übernommen werden.

`temporary_noindex_review` bedeutet in dieser Baseline nicht, dass unmittelbar ein `noindex` live geschaltet wird. Es bedeutet: Die URL benötigt vor jeder Indexierungsänderung eine dokumentierte fachliche Entscheidung. Der Datensatz bleibt mit `approval_status=pending` gesperrt.

## 3. Artefakte und Verantwortungsgrenzen

### 3.1 Generator

`scripts/build-url-matrix.mjs` übernimmt ausschließlich:

1. Manifest laden und strukturell validieren;
2. optional einen privaten GSC-Seitenexport einlesen;
3. Manifest- und GSC-Werte per normalisierter URL verbinden;
4. konservative Baselineentscheidungen erzeugen;
5. alle Matrixinvarianten validieren;
6. CSV deterministisch schreiben.

Der Generator enthält keine Live-Crawl-, Netzwerk-, WordPress-, Plesk- oder GitHub-Schreibfunktion.

### 3.2 Vertragstest

`scripts/build-url-matrix.test.mjs` importiert die realen Generatorfunktionen und prüft das reale Manifest sowie die erzeugte CSV. Hilfsfixtures dürfen GSC-Eingaben simulieren, ohne private Daten zu committen.

### 3.3 Kanonische Matrix

`docs/migration/url-migration-matrix.csv` ist das versionierte Ergebnis. Es enthält keine Suchanfragen, Patientendaten, Zugangsdaten oder rohen privaten GSC-Exporte.

### 3.4 Private Evidenz

Folgende Verzeichnisse bleiben lokal und werden in `.gitignore` eingetragen:

```text
data/private/gsc/
data/private/plesk/
data/private/wordpress-backup/
```

## 4. CSV-Vertrag

Die CSV verwendet UTF-8, Komma als Trennzeichen, RFC-4180-kompatible Maskierung und eine stabile Sortierung nach der Reihenfolge des Manifests. Sie enthält mindestens folgende Spalten:

| Spalte | Vertrag |
| --- | --- |
| `old_url` | kanonische absolute Alt-URL aus dem Manifest |
| `old_path` | normalisierter Pfad, Root als `/`, sonst Non-Slash |
| `manifest_class` | vorhandene Manifestklasse |
| `manifest_status` | vorhandener Manifeststatus |
| `old_http_status` | `unknown`, solange kein belastbarer Statusnachweis importiert wurde |
| `old_canonical` | `unknown`, solange kein belastbarer Canonicalnachweis importiert wurde |
| `in_old_sitemap` | `unknown`, solange kein belastbarer Sitemapnachweis importiert wurde |
| `gsc_clicks` | nicht negative Zahl oder `unknown` |
| `gsc_impressions` | nicht negative Zahl oder `unknown` |
| `gsc_position` | nicht negative Zahl oder `unknown` |
| `backlinks` | nicht negative Zahl oder `unknown` |
| `business_value` | `unknown`, bis fachlich bewertet |
| `content_risk` | `unknown`, bis fachlich/rechtlich bewertet |
| `decision` | ausschließlich `keep_200_index`, `merge_301`, `remove_410` oder `temporary_noindex_review` |
| `target_path` | Pflicht bei `merge_301`; bei `keep_200_index` identisch zu `old_path`; sonst leer |
| `target_http_status` | `200`, `301`, `410` oder `pending` passend zur Entscheidung |
| `new_canonical` | Zielcanonical oder `unknown` |
| `in_new_sitemap` | `true`, `false` oder `pending` |
| `owner` | verantwortliche Rolle |
| `approval_status` | `approved` oder `pending` |
| `approved_by` | reale Freigabeperson; niemals erfunden |
| `evidence_status` | `manifest_only` oder `manifest_plus_gsc` |
| `notes` | knappe Begründung ohne private Rohdaten |

## 5. GSC-Import

Der GSC-Import ist optional. Ohne Datei erzeugt der Generator die vollständige Matrix mit `unknown`-Werten.

Eine optionale GSC-Seiten-CSV darf über einen expliziten CLI-Parameter übergeben werden. Unterstützt werden die üblichen englischen beziehungsweise deutschen Spaltenbezeichnungen für Seite, Klicks, Impressionen und Position. URLs werden auf HTTPS-Host, Pfad und Non-Slash normalisiert; Querystrings und Fragmente werden nicht als eigene Alt-URL gewertet.

Sicherheitsregeln:

- nicht erkannte Spalten führen zu einem klaren Fehler statt zu Schätzwerten;
- leere Messwerte werden `unknown`;
- echte numerische Nullen bleiben `0`;
- URLs außerhalb von `rauch-heilpraktiker.de` werden ignoriert beziehungsweise als Diagnose gemeldet;
- der private Eingabeexport wird nie kopiert oder in Git geschrieben.

## 6. Validierungsinvarianten

Die Generierung bricht mit Exitcode ungleich null ab, wenn eine der folgenden Bedingungen verletzt ist:

1. Zeilenanzahl ist nicht exakt 64.
2. `old_url` oder `old_path` ist nicht eindeutig.
3. Eine Manifest-URL fehlt oder eine fremde URL wurde ergänzt.
4. `decision` liegt außerhalb der vier erlaubten Werte.
5. `merge_301` besitzt kein valides internes `target_path`.
6. Ein Redirectziel verweist selbst auf eine `merge_301`-Zeile; Redirectketten sind verboten.
7. Eine `merge_301`-Zeile verweist pauschal auf `/`, außer die Quell-URL ist bereits `/`; die Baseline erzeugt keine solche Zeile.
8. `remove_410` besitzt keine echte Freigabe mit `approval_status=approved` und nicht leerem `approved_by`.
9. `temporary_noindex_review` ist fälschlich als freigegeben oder deploybar markiert.
10. Fehlende Evidenz wurde als numerische Null ausgegeben.

Zirkuläre Redirects und Selbstredirects werden ebenfalls abgewiesen.

## 7. Status- und Freigabemodell

Task 2 besitzt zwei getrennte Gates:

### Gate A – strukturelle Matrix

Bestätigt, sobald Generator, Testvertrag und exakt 64 konservative Zeilen reproduzierbar vorliegen.

### Gate B – SEO-Migrationsfreigabe

Bleibt geschlossen, solange:

- `STAT-012` keine GSC-Baseline besitzt;
- URLs mit `temporary_noindex_review` existieren;
- fachliche Bewertungen oder reale Freigaben fehlen.

Darum wird `STAT-011` nach der technischen Baseline höchstens auf `bestätigt mit Einschränkungen` gesetzt. Eine vollständige Bestätigung wäre ohne GSC- und Product-Owner-Evidenz sachlich falsch. `STAT-012` bleibt `derzeit nicht prüfbar`.

## 8. TDD- und Verifikationsstrategie

Der erste Testlauf muss vor dem Generator fehlschlagen und mindestens den fehlenden Generator beziehungsweise die fehlende Matrix belegen. Danach werden nur die minimal nötigen Funktionen implementiert.

Abschlussprüfungen:

```text
node --test scripts/build-url-matrix.test.mjs
node scripts/build-url-matrix.mjs
npm test
node scripts/parity-audit.mjs
npm run typecheck
npm run lint
git diff --check
```

Der Paritätsaudit wird nur bei laufender, erreichbarer lokaler Website als Inhaltsnachweis gewertet. Ein Exitcode 0 mit `FETCH`-Hinweisen ohne lokalen Server ist kein positiver Paritätsbeleg und wird entsprechend dokumentiert.

## 9. Nicht-Ziele

Task 2 implementiert noch keine Server-Redirects, Canonical-Middleware, Sitemapumschaltung oder Live-Deindexierung. Diese Schritte gehören zu Task 5 und dürfen erst nach Gate B erfolgen. Ebenso werden keine privaten GSC-, Plesk- oder WordPress-Backupdateien versioniert.
