# Plan: 18 Hubs, alte URLs, GEO/SEO (18.08.2026)

## Entscheidung

- **18 Hubs live**, Rest bleibt Entwurf (`noindex`) in der neuen Haut.
- **URLs = WordPress-Pfade.** Neue Kurz-URLs leiten um (301).
- Texte der Hubs kommen aus dem Archiv (Menü-Chrome gefiltert), UI wie Startseite.
- Redaktion (Punkt 1) folgt zeitnah – Wortlaut ist noch WP, HWG-Review offen.
- Lovable (6) und Deploy (7) später. PDFs (5) bleiben.

## Die 18 Hubs

### Welle 1 (diese Session)

| Alte URL | Keyword-Fokus |
|---|---|
| `/` | heilpraktiker augsburg |
| `/schmerztherapie-augsburg` | schmerztherapie augsburg |
| `/hypnotherapie-augsburg` | hypnotherapie augsburg |
| `/naturheilkunde` | naturheilkunde augsburg |
| `/manuelle-therapieverfahren-uebersicht` | manuelle therapie / osteopathie augsburg |
| `/bioresonanz-therapie` | bioresonanz augsburg |

### Welle 3 (umgesetzt, `rp-11-hubs-wave3`)

Datenschutz und Rechtshinweise auf alten Slugs (moderne DSGVO/HWG-Fassung, nicht der WP-Google-Fonts-Text).
Homöopathie, NAET, Diagnostik-Übersicht als HubFromArchive.
Downloadbereich vorbereitet – PDF-Binaries lagen nicht im Crawl, werden 1:1 nachgelegt.

Die 18 Hubs sind damit auf den WordPress-Pfaden angelegt.

Danach: Hub-UX-Konsolidierung (`rp-12-hub-ux`) – gleiche Module wie die Startseite
(Karten, Warnhinweis, Themenraster, FAQ), ohne den archivierten Wortlaut zu ersetzen.

### Welle 2 (umgesetzt, `rp-10-hubs-wave2`)

`/psychotherapie-augsburg`, `/nls-diagnostik`, `/osteopathie-techniken` als HubFromArchive.
`/kontakt` Formular + Slider + NAP. `/impressum` DDG + Steuernummer.
`/online-anamnesebogen` Archiv + Wizard; `/anamnese` leitet um.

### Welle 3

`/datenschutzerklaerung`, `/rechtshinweise-therapieverfahren`, `/klassische-homoeopathie`, `/naet-methode-allergie-behandlung`, `/diagnostik-informationstherapie`, `/downloadbereich-naturheilpraxis-rauch`

## GEO vs. SERP „heilpraktiker augsburg“

Muster der Seite 1 (Gaigl, Arendt, Prüfer, Polinacea, Weis):

- Title/H1: **„Heilpraktiker Augsburg“ + Name** (wie [buerofuenf.de](https://buerofuenf.de): „Werbeagentur Augsburg | Büro 5“)
- Ort in Title, H1, Lead, Footer, Schema
- NAP sichtbar, Bewertungen, klare Leistungshubs

Was wir daraus **jetzt** umsetzen:

- Title der Startseite bleibt `Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch`
- Geo-Meta, Canonical, MedicalBusiness + Person, `areaServed` Hochzoll/Friedberg/Lechhausen
- Hub-Titles nach Formel `[Leistung] Augsburg – Heilpraktiker Peter Rauch`
- Menü = alte WP-Gruppen (Diagnostik, Manuell, Naturheilkunde, Bioresonanz)
- Sitemap nur indexierte Hubs; Archiv bleibt noindex
- 301 von Kurz-URLs auf die Ranking-URLs

Noch **nicht** ohne Ihre Texte: Unique Long-Copy gegen Gaigl/Arendt, Google-Posts, GBP-Feinschliff.

Google „wird umgebaut“: nicht nötig, solange die URL gleich bleibt. Erst beim Cutover in der Search Console die Property behalten und Sitemap neu einreichen.

## PageSpeed (vorbereitet)

- Hero: `fetchPriority=high`, `width/height`, `decoding=async`
- Galerie: `loading=lazy`
- Schriften lokal, WebP-Originale
- Kein Drittanbieter-Slider

## Admin (Punkt 8)

| Jetzt | Als Nächstes (Payload) |
|---|---|
| `/archiv` – alle 64 Entwürfe | Collections: Seiten, Medien, Weiterleitungen, SEO |
| `/praxis` – Formulareingänge | Rollen: Redaktion / Admin |
| Git + Docs als Changelog | Medienbibliothek (Originale) |
| | Draft/Publish-Toggle (ersetzt noindex per Hand) |
| | Rank-Math-Felder: Title, Description, Robots |

WordPress-ähnlich wird das **Payload-Admin** (selbst gehostet auf Plesk/Root). Nicht noch ein zweites WP.

## 301 (aktiv)

- `/bioresonanz-augsburg` → `/bioresonanz-therapie`
- `/verfahren/naturheilkunde` → `/naturheilkunde`
- `/verfahren/manuell` → `/manuelle-therapieverfahren-uebersicht`
- `/verfahren/frequenz` → `/diagnostik-informationstherapie`
- `/allergie-augsburg` → `/naet-methode-allergie-behandlung`
- `/erschoepfung-augsburg` → `/psychotherapie-augsburg`
