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
| [08-rank-math.md](./08-rank-math.md) | Settings-Export, was übernommen wurde |
| [09-uploads-inventar.md](./09-uploads-inventar.md) | Originale aus GitHub, Umlaut-Dateien, Kuratierung |
| [10-bildzuordnung.md](./10-bildzuordnung.md) | Live-Bilder je Seite → Original + Slider |
| [11-lovable-design-pruefung.md](./11-lovable-design-pruefung.md) | App-Look vs. CMS: was adaptierbar ist |
| [12-wiederherstellungspunkte.md](./12-wiederherstellungspunkte.md) | Git-Tags RP-01 bis RP-24, **main = rp-20-pre-palette** |
| [13-archiv-design.md](./13-archiv-design.md) | Archiv-Rollout: Slider, UX, E-E-A-T |
| [14-hubs-geo-seo.md](./14-hubs-geo-seo.md) | 18 Hubs, alte URLs, GEO, Wellen, Admin |
| [changelog.md](./changelog.md) | Chronologisches Protokoll |
| **[handover-2026-08-18-abend/](../handover-2026-08-18-abend/00-STAND.md)** | **Aktueller Abendstand nach Rollback** |
| [handover-2026-08-18/](../handover-2026-08-18/00-START-HIER.md) | Mittag-Übergabe (rp-14) |

Quelldaten des Crawls liegen unter:

- `content/wordpress/pages/*.json` — strukturierter Seitenexport
- `content/wordpress/html/*.html` — Roh-Snapshots
- `content/wordpress/manifest.json` — Gesamtindex
- `public/media/wp/` — öffentlich erreichbare Bilder (optimiert)
- `public/media/originals/` — kuratierte WP-Originale + WebP
- `content/wordpress/uploads-incoming/INVENTAR.json` — Upload-Maschinenindex
- `src/content/archive/` — von der App gelesene Entwürfe
