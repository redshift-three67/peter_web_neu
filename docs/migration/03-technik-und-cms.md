# Technik und CMS

## Ist (alt)

- WordPress 6.9.7
- Theme YOOtheme Pro, UIkit, Style Florence / dark-brown
- SEO: Rank Math
- Weitere: Site Kit, GDPR-Framework, Performance Lab
- Slider: `uk-slideshow`
- Bilder: `/wp-content/uploads/` plus YOOtheme-`/cache/`-Derivate

## Soll (neu)

- TanStack Start, React 19, TypeScript, Tailwind v4
- Inhalte typisiert in `src/content/` + Archiv `src/content/archive/`
- Später Payload CMS 3 (Felder = heutiges JSON-Schema)
- Hosting Alt: Plesk, unangetastet
- Hosting Neu: später Linux-VPS (Hetzner/Docker) oder die bestehende Preview-Pipeline

## Entwurfsstatus einer portierten Seite

```text
slug            WordPress-Pfad ohne Domain
status          draft | mapped | published
robots          noindex,follow  (draft)
sourceUrl       kanonische WP-URL
extracted       title, h1, description, headings, parts, bodyText
images[]        url, alt, local, fromCache
wordCount
class           A-active-same-slug | A-maps-to-new-hub | B-inactive-archive | C-special
```

`mapped` = Leitseite existiert schon neu (Start, Kontakt, …). Der WP-Text
liegt trotzdem im Archiv zum Abgleich.

`draft` = sichtbar unter dem **gleichen Slug** in der Vorschau, aber
`noindex`, nicht in Nav, nicht in `public/sitemap.xml`.

## Routen

- Feste Leitseiten: `src/routes/*.tsx`
- Alle übrigen WP-Slugs: `src/routes/$slug.tsx` liest das Archiv
- `/archiv` — interne Übersicht aller portierten Seiten (noindex)
- `/online-anamnesebogen` — Hülle, **keine** Lovable-Integration

## Aktivieren einer Seite (Entwickler)

1. In `src/content/archive/status.ts` den Slug auf `published` setzen
   (später: Payload-Feld).
2. Optional in `src/content/site.ts` ins Menü aufnehmen.
3. In `public/sitemap.xml` ergänzen.
4. `robots` auf `index,follow`.
5. Inhalt gegen HWG/E-E-A-T prüfen — erst dann.

## Trailing Slash

WP: `/nls-diagnostik/`  
Neue App: `/nls-diagnostik`  
Beim Cutover eine kanonische Form + 301. Bis dahin in der Vorschau ohne Slash.
