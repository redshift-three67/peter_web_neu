# Migrationsarchiv — Naturheilpraxis Rauch

Dieser Ordner ist die **verbindliche Dokumentation** für den parallelen
Neuaufbau von `rauch-heilpraktiker.de`. Er richtet sich an Entwicklung,
Redaktion und späteres Payload-CMS.

Stand des Protokolls: **18. August 2026**.

| Dokument | Inhalt |
|---|---|
| [01-strategie.md](./01-strategie.md) | Ziele, Leitplanken, Phasen, Cutover, App-Grenze |
| [02-inventar-urls.md](./02-inventar-urls.md) | Alle WP-URLs, Klassen A/B/C, Mapping neu |
| [03-technik-und-cms.md](./03-technik-und-cms.md) | Stack, Entwurfsstatus, Slugs, Schema, Hosting |
| [04-medien-und-slider.md](./04-medien-und-slider.md) | Bilder, YOOtheme-Cache vs. Originale, Slider |
| [05-crawl-protokoll.md](./05-crawl-protokoll.md) | Was der öffentliche Crawl holt, Grenzen, Nachziehen |
| [06-entwickler-handbuch.md](./06-entwickler-handbuch.md) | Dateien, Routen, wie man eine Seite aktiviert |
| [07-offene-punkte.md](./07-offene-punkte.md) | Lieferungen Auftraggeber, Wiedervorlage |
| [changelog.md](./changelog.md) | Chronologisches Protokoll |

Quelldaten des Crawls liegen unter:

- `content/wordpress/pages/*.json` — strukturierter Seitenexport
- `content/wordpress/html/*.html` — Roh-Snapshots
- `content/wordpress/manifest.json` — Gesamtindex
- `public/media/wp/` — öffentlich erreichbare Bilder (optimiert)
- `src/content/archive/` — von der App gelesene Entwürfe
