# Changelog — Migration

## 2026-08-20 (Breitenberger-Anliegen-Hubs)

- Umsetzung der fachlichen Vorgabe `docs/design-a-plus-c/07-breitenberger-inhaltsmaschine.md` für die drei Anliegen-Hubs (`/schmerztherapie-augsburg`, `/psychotherapie-augsburg`, `/naet-methode-allergie-behandlung`) auf Branch `breitenberger-hubs` (Basis `main` = `1d535b3`).
- Neu: `src/content/anliegen.ts` (Inhaltsmaschine je Anliegen) + `src/components/site/AnliegenHub.tsx`.
- Akzeptanz je Seite erfüllt: Title = Anliegen + Augsburg; Above-the-fold wer/für wen/wo/was-nicht (4 Kacheln); zitierfähige Kurzdefinition (GEO); Symptom-Karten ohne Claims; Einordnung mit Red Flags; Archiv-Tiefe als Hintergrund; Verfahrens-Spokes (Geräte-URLs stützen Anliegen); Bietet/Bietet-nicht-Listen; 3 Schritte + Clay-CTA; hub-spezifische FAQ (3–5); NAP + Byline + Quellen/Redaktion; Disclaimer.
- Schema erweitert: `FAQPage` + `BreadcrumbList` jetzt auf allen drei Hubs.
- Title-Formel umgestellt (Leistung/Anliegen + Ort, nicht Gerät + Ort):
  - `/schmerztherapie-augsburg` → „Heilpraktiker für Schmerz in Augsburg | Peter Rauch“
  - `/psychotherapie-augsburg` → „Erschöpfung & Burnout – Heilpraktiker Augsburg | Peter Rauch“ (Anliegen statt geschützter Berufsbezeichnung „Psychotherapie“; URL unverändert, Weiterleitung/Redirects unberührt)
  - `/naet-methode-allergie-behandlung` → „Allergie & Unverträglichkeit – Heilpraktiker Augsburg | Peter Rauch“
- Nav-/Footer-Label „Psychotherapie Augsburg“ → „Erschöpfung & Burnout“; Slider-CTA angepasst; Header-Icon-Map mitgezogen.
- HWG-strenger: NAET ausdrücklich als nicht schulmedizinisch anerkannt eingeordnet; Notfallwege (112/116 117/Telefonseelsorge) zitierfähig benannt.
- Verifikation: `npm run typecheck`, `npm run lint` (0 Fehler), `npm run build` grün; Dev-Render aller drei Hubs geprüft (Titel, Sektionen, FAQ-Schema, keine Console-Errors). Screenshots: `screenshots/anliegen-*.png`.
- Nicht berührt: URLs/Rankings, Live-WordPress, Lovable-App, Design/Tokens (Rollback-Stand bleibt).

## 2026-08-18 (Abend / Rollback)

- Auftraggeber: zurück auf `rp-20-pre-palette` (`8af29ad`).
- `main` zeigt Original (Lovable-Grün, alter Header, voller Slider). Default `look=alt`.
- Oura-Rahmen, Neko-Menügrün, Farbtabelle-Live **nicht** auf `main`; Tags `rp-20-palette` … `rp-24-pre-rollback` behalten.
- Doku: `docs/handover-2026-08-18-abend/00-STAND.md`.

## 2026-08-18 (Pause / Übergabe)

- Ordner `docs/handover-2026-08-18/` für Dev, Grafik, Technik.
- Push nach GitHub `main`, Tag `rp-14-hub-rhythm`.

## 2026-08-18 (Hub-Rhythmus Startseite)

- Hubs wie Start: Zitat, drei Schritte, Warnband, 2-Spalten-Karten, Bildreihe, Stimmen, FAQ+Praxis.
- Stimmung je Thema (Diagnostik, Natur, Hände, Psyche, Frequenz).

## 2026-08-18 (Hub-UX volle Breite)

- Keine 2:1-Spalte mehr. Praxis-Karte unter dem Text.
- Scan-/Gerätebilder als große Karten (wie Anliegen auf der Startseite).
- Lange H3-Sätze sind wieder Fließtext, nicht Kartentitel.
- Atmosphäre-Bilder im Einleitungsteil.

## 2026-08-18 (Hub-UX)

- 18 Inhalts-Hubs nutzen Start-Module: IconCards, Warnhinweise, Themenkarten, FAQ, CTA.
- Footer-Chrome und Generic-FAQ aus WP entfernt. Texte bleiben.

## 2026-08-18 (Hubs Welle 3)

- 18 Hubs vollständig auf alten URLs.
- `/datenschutz` → `/datenschutzerklaerung`, `/rechtshinweise` → `/rechtshinweise-therapieverfahren`.
- Downloadbereich ohne PDF-Binaries (offen).

## 2026-08-18 (Hubs Welle 2)

- Psychotherapie, NLS, Osteopathie auf alten URLs.
- Kontakt/Impressum/Anamnesebogen live, `/anamnese` → `/online-anamnesebogen`.

## 2026-08-18 (Hubs Welle 1)

- Plan: [14-hubs-geo-seo.md](./14-hubs-geo-seo.md)
- Menü = alte WP-Gruppen, Ranking-URLs.
- Hubs live: Naturheilkunde, Manuell, Bioresonanz, Schmerz, Hypnose + Start.
- 301 von Kurz-URLs. Sitemap nur indexierte Hubs.
- Hero fetchPriority / Dimensionen (PageSpeed).

## 2026-08-18 (Archiv-Haut)

- RP-08 vor dem Rollout (`rp-08-pre-archive-skin`).
- Alle 64 Archivseiten: Start-Slider-Logik, Phone-Chip, Warnkarte, CTA-Spalte.
- Texte/Bilder unverändert, weiter noindex.

## 2026-08-18 (Slider-Karten Glas)

- Titel- und Overlay-Karte: 55% Sage-50, Backdrop-Blur, Sage-700.
- Breite `w-fit`, links am Slider-Rand (kein zentrierter max-w-6xl-Versatz).
- Schriftstufen mobil 21px+ / Desktop ~34px.

## 2026-08-18 (Menü + Slider-Schrift)

- Slider-H1: Sage-700 auf Sage-50-Karte (kein Weiß mehr, Kontrast AA).
- Menü im Infothek-Look: Icon-Zeilen, Kurztext, `rounded-2xl`. Neu: Wissen (nur öffentliche Seiten, kein Login/Gesperrt).

## 2026-08-18 (Slider-Karten)

- Overlay-Karten: `rounded-2xl`, Sage-50, Sage-700-Titel, Sage-Button (Grün wie Quote-Kreis).
- Mobil: Karte unter dem Bild (kein Überdecken), Tap-Ziele 44px, Fließtext ≥16px.
- Fließtexte in Schritt-/Anliegen-/FAQ-Karten von `text-sm` auf `text-base`.

## 2026-08-18 (mittag, Slider-Feinschliff)

- RP-03 vor Änderung (`rp-03-pre-slider-refine`).
- Slider-Höhe ca. −⅓, Viewport `42–52svh`.
- Grünlayer abgeschwächt; Live-Overlay-Karten unten rechts (5 Slides, Texte vom WP-Home).
- Bedienelement nach links.
- Praxis-Mail überall im CMS: `praxis_rauch@icloud.com`.

## 2026-08-18 (nachmittags)

- RP-01 gesetzt (`rp-01-design-tokens`).
- Öffentliche App-Strukturen übernommen: Phone-Chip, Quote-Panel, Hinweis-Karte, Icon-Karten, zentrierter Seitentitel.
- Alter Start-Slider: 5 Originale + Grünlayer `sage-700→500`, H1 fest, Untertitel je Motiv.
- Neu: `/quellenhinweis` (E-E-A-T). Erstgespräch mit Kassen-Hinweis + GebüH-Karte.
- Footer wie App (Kontakt-Icons, 4 Spalten).
- RP-02 folgt auf diesen Stand.

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
