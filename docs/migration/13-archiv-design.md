# Archivseiten: Design-Rollout (RP-08)

Stand: 18.08.2026 nach RP-07 (Slider-Glas).  
Wiederherstellung vor diesem Schritt: `git checkout rp-08-pre-archive-skin -- src`

## Was gilt

Alle 64 Katalogseiten (`$slug`) nutzen dieselbe Haut wie die Startseite.
**Texte und zugeordnete Bilder bleiben unverändert.** Keine Aktivierung,
kein Index.

## Struktur je Archivseite

1. **Hero-Slider** (`PageHeroSlider`) – gleiche Glas-Karten, Höhe ~38–48 svh,
   Steuerung links, Overlay rechts / mobil darunter.
2. **Phone-Chip**
3. **Fließtext** der portierten `parts` (H2/H3/P/LI), 16 px
4. **Spalte rechts:** Warnhinweis Entwurf/noindex, Portrait, Galerie,
   Archivstatus, CTA (Anruf / Kontakt / Erstgespräch)
5. **Autor + Disclaimer + CtaBand** (E-E-A-T)

## Slider

- 38 Seiten mit 2–5 Live-Overlays: Motive + Meta/Titel 1:1 aus dem Katalog
- Übrige: erstes sachliches Original als Einzelmotiv
- Keine Homepage-H1, sondern die jeweilige Seiten-H1

## E-E-A-T / Google

| Anforderung | Umsetzung |
|---|---|
| YMYL / noindex | `robots: noindex,follow` unverändert |
| Transparenz | sichtbarer Entwurfshinweis, Quellen-URL |
| Autor | AuthorByline auf jeder Archivseite |
| Grenzen | Disclaimer + kein Heilversprechen ergänzt |
| NAP / Kontakt | Phone-Chip, CTA, Footer |
| Lesbarkeit | Body ≥16 px, Tap-Ziele 44 px |
| Mobil | Overlay nicht über H1; Karte unter dem Bild |

Nicht geändert: WordPress-Wortlaut (kann HWG-Altlasten enthalten).
Freigabe bleibt redaktionell, Seite für Seite.
