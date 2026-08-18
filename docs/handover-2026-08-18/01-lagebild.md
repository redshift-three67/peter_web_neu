# Lagebild 1:1 — 18.08.2026, Pause nach RP-14

## Was fertig ist

1. Öffentlicher Crawl der WP-Site (64 URLs, HTML + JSON).
2. Medien: Crawl-WebP unter `public/media/wp/`, Originale unter `public/media/originals/`.
3. Design-Tokens Sage/Sand/Terracotta, lokale Fonts, keine Google Fonts.
4. Startseite als Referenz-UI (Slider, Zitat, Anliegen-Karten, Schritte, Stimmen, FAQ+Praxis, CTA).
5. Hero-Slider: Höhe reduziert, Glas-Karten, Sage-Text, Controls links, Live-Overlay-Texte.
6. Menü ≈ alte WP-Gruppen (Diagnostik, Manuell, Naturheilkunde, Bioresonanz).
7. **18 Hubs live** auf exakt den alten Slugs, drei Wellen.
8. Hub-Layout im Start-Rhythmus, Stimmung je Thema (`src/content/hub-themes.ts`).
9. 301 von kurzen Neu-URLs auf alte Pfade (`legacyRedirects` in `src/content/hubs.ts`).
10. Mail überall: `praxis_rauch@icloud.com`.
11. Sitemap enthält die 18 Hubs. Archiv-Reste: `noindex`.

## Was bewusst nicht fertig ist

| Thema | Status |
|---|---|
| ~46 Nicht-Hub-Seiten | Archiv unter gleichem Slug, `noindex`, vorbereitet |
| PDF-Downloadbereich | Seite da, Binaries fehlten im Crawl |
| HWG-Textreview | Wortlaut noch WP-Original |
| Lovable-Workflow | standalone, nur Link |
| Payload-CMS | geplant, nicht eingebaut |
| Cutover DNS / GSC | Wiedervorlage |
| PageSpeed live | vorbereitet (WebP, lazy, fetchpriority Start) |

## Die 18 Hubs

| Welle | URLs |
|---|---|
| 1 | `/` `/schmerztherapie-augsburg` `/hypnotherapie-augsburg` `/naturheilkunde` `/manuelle-therapieverfahren-uebersicht` `/bioresonanz-therapie` |
| 2 | `/psychotherapie-augsburg` `/nls-diagnostik` `/osteopathie-techniken` `/kontakt` `/online-anamnesebogen` `/impressum` |
| 3 | `/datenschutzerklaerung` `/rechtshinweise-therapieverfahren` `/klassische-homoeopathie` `/naet-methode-allergie-behandlung` `/diagnostik-informationstherapie` `/downloadbereich-naturheilpraxis-rauch` |

Recht/Kontakt/Impressum/Datenschutz sind **eigene Layouts**, keine reinen Archiv-Güsse.
Inhalts-Hubs nutzen `HubFromArchive`.

## Git

Lokal 17 Commits vor dem Push gegenüber `origin/main` (Stand vor dieser Übergabe).
Wiederherstellung: Tags `rp-01-…` bis `rp-14-hub-rhythm`. Siehe
[`docs/migration/12-wiederherstellungspunkte.md`](../migration/12-wiederherstellungspunkte.md)
und [07-naechste-schritte.md](./07-naechste-schritte.md).
