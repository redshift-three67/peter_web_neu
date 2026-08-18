# Changelog — Migration

## 2026-08-18 (Mittag, Design)

- Schritt 1 umgesetzt: CMS-Look an Lovable-UI angeglichen (ohne App-Funktionen).
- Tokens: Sage 50–700, Sand, Terracotta, shadow-elevated.
- Header: rundes Blatt-Signet, „Naturheilpraxis / Peter Rauch“, Schnellzugriff-Leiste (öffentliche Links).
- Footer hell (bg-card), Hero-Verlauf sage-700→500, Karten rounded-2xl.
- Archivseiten erben dieselbe Haut.

## 2026-08-18 (Mittag)

- Lovable-App geprüft (HTML/CSS/JS): Portal/CSR, nicht öffentliche Praxis-Site.
- Design-Tokens ≈ CMS (Playfair, Source Sans 3, Sage/Sand/Terracotta).
- Nicht übernahmefähig: SPA-Hülle, noindex, falsches NAP/Geo/Schema, HWG-Claim.
- Entscheidung: Look adaptieren, App-Runtime nicht einbetten.
- Protokoll: [11-lovable-design-pruefung.md](./11-lovable-design-pruefung.md).

## 2026-08-18 (später Vormittag)

- Uploads auf GitHub vollständig: 660 Dateien, 131,7 MB, 7 Upload-Commits.
- Inventar: [09-uploads-inventar.md](./09-uploads-inventar.md).
- 120 Praxis-Originale nach `public/media/originals/`, 117 WebP.
- Umlaut-Dateien (Homöopathie, Nährstoff, Übung, Gräser, Wirbelsäule) sind drin.
- Live-Zuordnung aller 64 Seiten: 353/353 Bilder gemappt, 129 Slider-Slides auf 38 Seiten.
- Archiv-Renderer zeigt Originale + Bildstrecke statt YOOtheme-Cache.

## 2026-08-18 (vormittags)

- Rank-Math-Settings-Export archiviert (`content/wordpress/rank-math-settings.json`).
- Auswertung: [08-rank-math.md](./08-rank-math.md).
- Übernommen: Search-Console-Verification, Facebook, Google Places, E-Mail bestätigt.
- Alte robots.txt **nicht** übernommen (Googlebot-Sitemap-Sperre, Image-Sperre, Theme-Müll).
- Medienfrage geklärt: Uploads-ZIP, nicht WP-Medien-XML.

## 2026-08-18 (nachts)

- Öffentlicher Crawl aller 64 Sitemap-URLs, 0 Fehler.
- HTML-Snapshots und JSON unter `content/wordpress/`.
- Text-Nachzug, Wortzahlen 420–1935.
- 80 öffentliche Bilder nach `public/media/wp/`, WebP erzeugt.
- Archiv-Renderer: `/$slug`, Übersicht `/archiv`.
- `/online-anamnesebogen` als Hülle ohne App-Anbindung.

## 2026-08-17

- Analyse der Live-WP (YOOtheme Florence, Rank Math, 64 URLs).
- Entscheidung: paralleler Neuaufbau, nicht WP-Reparatur.
- Neue Design-Shell und Leitseiten.
