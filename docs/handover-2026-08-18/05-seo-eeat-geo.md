# SEO, GEO, E-E-A-T

## Title-Formel (wie buerofuenf.de lokal)

`Leistung + Augsburg + Name`

Beispiel: `NLS-Diagnostik Augsburg – Hinweisverfahren | Peter Rauch`

H1 auf der Seite oft: `… in Augsburg`. Lead nennt Hochzoll / Friedberg / Lechhausen.

Metas: `src/content/hubs.ts` → `hubMeta`.

## E-E-A-T / YMYL

- Person sichtbar: Byline, Erlaubnis 26.12.2006, PT 02.11.2001, BDHN, Gesundheitsamt
- Reviews auf Hubs (ProvenExpert 4,85 / 103, Jameda 5,0 / 19)
- Disclaimer + Rechtshinweise (kein Heilversprechen)
- Hinweisverfahren ≠ Labor / Arzt
- Schriften lokal (Datenschutz wahr)
- JSON-LD MedicalBusiness auf der Startseite (`src/components/site/JsonLd.tsx`)

## Indexierung

| Fläche | robots |
|---|---|
| 18 Hubs + Start | index,follow, in sitemap |
| `/archiv`, `$slug` Nicht-Hubs | noindex,follow |
| Login / interne Hüllen | noindex |

`public/robots.txt` und `src/lib/seo.ts` zusammenhalten.

## GEO vs. SERP „heilpraktiker augsburg“

Mitbewerber (Gaigl, Arendt, …): Ort in Title, H1, NAP, Bewertungen.
Umgesetzt auf Hubs. Fehlt noch: flächiges Local-Content-Review,
GSC nach Cutover, optional GBP-Posts.

Rank Math Settings: [`docs/migration/08-rank-math.md`](../migration/08-rank-math.md)
(GSC-Verify-Token, Local Business — in `site.ts` übernommen).

## Ads

Google Ads erst nach HWG-fester Leistungsseite und Consent Mode.
Keine Heilversprechen in Anzeigentexten. Zielseiten = die 18 Hubs.
