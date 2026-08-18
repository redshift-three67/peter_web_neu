# Entwicklerhandbuch

## Verzeichnisbaum

```text
docs/migration/                 diese Dokumentation
scripts/wp-public-crawl.py      öffentlicher Crawl
scripts/wp-reextract-text.py    Text aus HTML-Snapshots
content/wordpress/html/         Roh-HTML je Seite
content/wordpress/pages/        JSON je Seite
content/wordpress/manifest.json Crawl-Index
public/media/wp/                geholte + optimierte Bilder
src/content/archive/catalog.json  von der App gelesen
src/content/archive/index.ts      Zugriffsschicht
src/routes/$slug.tsx              Entwurfsseiten
src/routes/archiv.tsx             Übersicht
src/routes/online-anamnesebogen.tsx  App-Hülle ohne Integration
```

## Eine archivierte Seite ansehen

In der Vorschau: `/archiv` oder direkt z. B. `/nls-diagnostik`,
`/klassische-homoeopathie`, `/lowen-systems-allgemeines`.

Alle diese Routen senden `noindex,follow`.

## Seite aktivieren (nach Freigabe)

1. Inhalt gegen HWG und E-E-A-T prüfen.
2. In `src/content/archive/catalog.json` (später Payload) `status` auf
   `published` setzen und `robots` auf `index,follow`.
3. Optional festen Eintrag in `src/content/site.ts` (Navigation).
4. Slug in `public/sitemap.xml` aufnehmen.
5. Nicht den Slug ändern. Wollen Sie einen neuen Slug, zuerst 301 planen.

## Leitseiten vs. Archiv

Existiert eine feste Route (`/kontakt`, `/schmerztherapie-augsburg`, …),
gewinnt diese. Der WP-Text bleibt trotzdem im Archiv zum Abgleich.

## App-Grenze

`https://naturheilpraxis-rauch.lovable.app/` nicht importieren, nicht
iframe, nicht nachbauen. `/online-anamnesebogen` erklärt nur den Status.

## Typecheck / Build

```text
npm run typecheck
npm run build
```

Preview-Server nicht für den Build-Preview umbiegen, solange die Live-
Vorschau laufen soll.
