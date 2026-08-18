# Architektur für Entwickler

## Stack

- **TanStack Start** (Vite, file-based Routes, SSR)
- React 19, TypeScript
- Tailwind v4 (`src/styles.css`, `@theme`)
- Kein WordPress, kein PHP in der neuen App
- Später: Payload CMS 3 (Felder = heutiges JSON)

## Wichtige Pfade

```
src/routes/                 Datei = URL
src/routes/$slug.tsx        Fallback Archiv (noindex wenn nicht Hub)
src/routes/index.tsx        Startseite (Referenz-UI)
src/components/site/        Header, Footer, Slider, HubFromArchive, Design
src/content/site.ts         Praxis, NAP, Nav, Footer, Reviews
src/content/hubs.ts         Wellen, Meta, Redirects, Chrome-Filter
src/content/hub-themes.ts   Stimmung je Hub-Thema
src/content/archive/        Katalog + dedicatedRoutes
src/lib/hub-blocks.ts       WP-Teile → Karten / Warnung / Scans
src/lib/seo.ts              Title, Description, Canonical, robots
public/sitemap.xml          Nur indexierte Hubs
public/media/wp|originals   Bilder
content/wordpress/          Crawl-Rohdaten
docs/migration/             Arbeitsprotokoll
docs/handover-2026-08-18/   Diese Übergabe
```

## Wie eine Hub-Seite entsteht

1. WP-Text liegt in `src/content/archive` (aus `catalog.json`).
2. Datei `src/routes/<alter-slug>.tsx` ruft `HubFromArchive` mit GEO-H1/Lead.
3. Slug steht in `dedicatedRoutes` → `$slug` greift nicht.
4. `hubMeta` liefert Title/Description.
5. Eintrag in `public/sitemap.xml`.

Rechtliche Seiten (Impressum, Datenschutz, Rechtshinweise) sind **handgeschrieben**,
weil der WP-Text veraltet war (u. a. Google Fonts).

## Redirects (Client `beforeLoad`)

Siehe `legacyRedirects` in `src/content/hubs.ts`, u. a.:

- `/anamnese` → `/online-anamnesebogen`
- `/datenschutz` → `/datenschutzerklaerung`
- `/rechtshinweise` → `/rechtshinweise-therapieverfahren`
- `/bioresonanz-augsburg` → `/bioresonanz-therapie`
- `/verfahren/*` → jeweilige alte Übersicht

Beim echten Cutover zusätzlich **Server-301** (nginx/Caddy) + Search Console.

## Menü vs. Routen

Nav in `site.ts` enthält auch Slugs, die **noch Archiv** sind
(Vieva, EAV, Darmsanierung, BIT). Die landen über `$slug.tsx` im Archiv-Skin,
nicht im vollen Hub-Rhythmus. Gewollt bis Welle „Rest“.

## CMS-Gedanke (nicht gebaut)

Collections später: Pages, Redirects, Media, Practice.
Admin analog WP: Entwürfe, noindex, 301-Tabelle.
Details: [`docs/migration/14-hubs-geo-seo.md`](../migration/14-hubs-geo-seo.md).
