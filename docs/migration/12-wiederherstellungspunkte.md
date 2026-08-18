# Wiederherstellungspunkte

Lokales Git-Repo. Identität nur lokal: `Rauch Migration <dev@rauch-heilpraktiker.local>`.

| Punkt | Tag | Commit | Wann | Inhalt |
|---|---|---|---|---|
| RP-01 | `rp-01-design-tokens` | `ddabd0c` | 18.08.2026 | Look-Angleichung Schritt 1. |
| RP-02 | `rp-02-slider-strukturen` | `c88df55` | 18.08.2026 | Hero-Slider, App-Strukturen. |
| RP-03 | `rp-03-pre-slider-refine` | `f6c54fe` | 18.08.2026 | Vor Höhe/Overlays/Mail. |
| RP-04 | `rp-04-slider-overlays` | `214920f` | 18.08.2026 | Höhe −⅓, Live-Overlays, iCloud-Mail. |
| RP-05 | `rp-05-overlay-type` | `15d44d9` | 18.08.2026 | Sage-Karten, 16px-Fließtext. |
| RP-06 | `rp-06-menu-type` | `b7e803d` | 18.08.2026 | Slider-H1 Sage, Infothek-Menü. |
| RP-07 | `rp-07-card-transparency` | `5a20227` | 18.08.2026 | Glas-Karten, w-fit. |
| RP-08 | `rp-08-pre-archive-skin` | `5a20227` | 18.08.2026 | **Vor** Archiv-Rollout. |
| RP-08b | `rp-08-archive-skin` | `2d2cab7` | 18.08.2026 | Archivseiten in Start-Haut. |
| RP-09 | `rp-09-hubs-wave1` | `ab97cbe` | 18.08.2026 | Welle 1 Hubs, GEO, Menü. |
| RP-10 | `rp-10-hubs-wave2` | `8427359` | 18.08.2026 | Welle 2. |
| RP-11 | `rp-11-hubs-wave3` | `1d86301` | 18.08.2026 | 18 Hubs vollständig. |
| RP-12 | `rp-12-hub-ux` | `8704b09` | 18.08.2026 | Start-Module auf Hubs. |
| RP-13 | `rp-13-hub-fullwidth` | `c5e3ca2` | 18.08.2026 | Volle Breite, Scan-Karten. |
| RP-14 | `rp-14-hub-rhythm` | `23c5751` | 18.08.2026 | Start-Rhythmus + Themenstimmung. **Pause.** |

## Zurücksetzen

```bash
# Nur Quellcode vor dem Archiv-Rollout
git checkout rp-08-pre-archive-skin -- src

# Früherer Designstand
git checkout rp-07-card-transparency -- src
```

`public/media/originals/` bleibt beim Checkout erhalten (meist ungetrackt).

## Was der Archiv-Rollout nicht anfasst

- Wortlaut der portierten Texte
- noindex / draft
- Login, Infothek, gesperrte App-Inhalte
