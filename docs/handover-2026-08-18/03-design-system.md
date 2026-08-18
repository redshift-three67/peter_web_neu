# Design-System für Grafik und UX

## Referenz, nicht die Lovable-Runtime

1. **Startseite `/`** — verbindliche Rhythmik und Optik.
2. **Lovable** https://naturheilpraxis-rauch.lovable.app/ — Look (Sage, Karten, Warnung).
   Funktionen, Login, Infothek: **aus**.
3. Alte WP-Live-Site — nur für Overlay-Texte, Bildreihenfolge, URL-Bestand.

## Tokens (`src/styles.css`)

- Sage (Grün, Kreis aus Auftraggeber-Screenshot): Text, Buttons, Layer
- Sand / Paper: Flächen
- Terracotta / Clay: Warnung, Anamnesebogen-Button
- Display-Schrift + Fließtext lokal gehostet
- Karten: `rounded-2xl`, `shadow-card`, Hover `-translate-y`
- Fließtext Ziel: mind. ~16–17px (`text-base` / `text-[1.05rem]`)

## Verbindliche Module (`src/components/site/`)

| Modul | Nutzen |
|---|---|
| `HeroSlider` / `PageHeroSlider` | Glas-H1 oben, Overlay unten rechts, Dots **links** |
| `PhoneChip` | unter jedem Hero |
| `QuotePanel` | große Sage-Zitatkarte |
| `FeatureRow` | Icon + Titel + Satz |
| `IconCard` / Schritt-Karten | 3er-Raster wie Start |
| `WarningNote` | HWG / „kein Labor“ |
| `ReviewStrip` | 4,85 / 103, drei Zitate |
| `FaqList` + Praxis-Karte | wie Start unten |
| `AuthorByline` | E-E-A-T Person |
| `CtaBand` | Sage-Verlauf, Telefon + Nachricht |
| `HubFromArchive` | setzt das für Inhalts-Hubs zusammen |

## Slider-Regeln (nicht zurückdrehen)

- Höhe ca. ⅓ niedriger als erste Version
- Grünes Layer **schwach**, Bild muss durchscheinen
- Titelkarte und Overlay: `bg-sage-50/55`, `backdrop-blur`, `w-fit`
- Schrift in den Karten: Sage, nicht Weiß
- Overlay-Texte = Live-WP, nicht neu erfinden
- Controls bleiben links

## Hub-Rhythmus (RP-14)

```
Hero-Slider
Phone-Chip
Einleitung + FeatureRows | QuotePanel     ← wie „Herz und Verstand“
Warnhinweise gebündelt
Drei Schritte (themenspezifisch)
Inhaltskarten 2-spaltig
Bildreihe 3-spaltig (Anliegen-Stil)
ReviewStrip
FAQ | Praxis-Karte mit Anfahrtfoto
Author + Disclaimer
CtaBand
```

Stimmung in `src/content/hub-themes.ts`:
`diagnostic` | `frequency` | `nature` | `manual` | `psyche` | `intake` | `legal`.

## Typografie-Fallen (schon passiert)

- Lange WP-`h3` dürfen **keine** Kartentitel werden (`hub-blocks.ts`, >90 Zeichen → Absatz).
- Footer-Chrome, Corona-Hinweis, „Viel Freude…“ werden gefiltert.
- Keine 2:1-Spalte „Fließtext | Gerätebilder“. Bilder als große Karten.

## Grafik-Aufgaben offen

- Fehlende Atmosphäre-Bilder (Wasserfall/Baum der alten Start) waren im Crawl
  oft nur YOOtheme-Cache — Originale zuordnen oder ersetzen.
- Scanbilder NLS: bleiben Hinweisbilder, Caption „kein Befund“.
- PDF-Icons/Cover für Downloadbereich, sobald Dateien da sind.
- Optional: einheitliche Alt-Texte ohne Hash-Suffixe.
