# Wiederherstellungspunkte

Lokales Git-Repo. Identität nur lokal: `Rauch Migration <dev@rauch-heilpraktiker.local>`.

| Punkt | Tag | Commit | Wann | Inhalt |
|---|---|---|---|---|
| RP-01 | `rp-01-design-tokens` | `ddabd0c` | 18.08.2026 | Look-Angleichung Schritt 1: Tokens, Header, heller Footer, Karten. **Vor** Slider und App-Strukturen. |
| RP-03 | `rp-03-pre-slider-refine` | `f6c54fe` | 18.08.2026 | Stand vor Slider-Höhe, Overlay-Karten und Mail-Wechsel. |

## Zurücksetzen

Nur Dateien dieses Punkts wiederherstellen (Arbeitsbaum):

```bash
git checkout rp-01-design-tokens -- src docs
```

Kompletten Stand (vorsichtig, verwirft spätere lokale Änderungen an getrackten Dateien):

```bash
git reset --hard rp-01-design-tokens
```

Nicht löschen: `public/media/originals/` liegt oft ungetrackt und bleibt beim Reset erhalten.

## Was bewusst nicht im Slider/Design steckt

- Kein Login, keine Infothek, kein DE/EN, keine gesperrten Inhalte
- Kein Claim „ohne belastende Nebenwirkungen“
- H1 der Startseite bleibt SEO-stabil, Slider ändert Motiv + Untertitel
