# Stand 18. August 2026, Abend — nach Rollback

**Repo:** [redshift-three67/peter_web_neu](https://github.com/redshift-three67/peter_web_neu)  
**Branch `main`:** `8af29ad` · Tag **`rp-20-pre-palette`**  
**Live WordPress:** unverändert auf rauch-heilpraktiker.de  
**Neue App:** TanStack Start, diese Codebasis, Preview parallel

---

## Was jetzt sichtbar ist

| Bereich | Zustand |
|---|---|
| Start `/` | **HomeLegacy** — alter Header, voller Slider, Lovable-Grün |
| NLS und alle Hubs | **HubFromArchive** — gleiche Haut wie Start |
| Farben | Lovable-Tokens (`#faf8f5`, Sage `#457358`) |
| Default-Look | `look=alt` — Original vor A+C |
| A+C-Muster | Code liegt noch da, **nicht aktiv**. Nur `/?look=ac` bzw. `/nls-diagnostik?look=ac` |
| Oura-Header / Neko-Petrol / gerahmter Slider | **nicht auf `main`**. Liegen nur auf Tags (siehe unten) |

Auftraggeber hat ausdrücklich auf **`rp-20-pre-palette`** zurückgesetzt. Alles danach (Farbtabelle, Oura-Rahmen, Neko-Grün-Band) ist Versuch, nicht der aktuelle Auftrag.

---

## Produktstand (unverändert gültig)

- 18 Hub-URLs = alte WordPress-Pfade, Draft/noindex wo vereinbart
- Texte aus dem Archiv, HWG-Disclaimer, NAP Hochzoll
- Lovable-App bleibt standalone (nur Link)
- WordPress bleibt live bis Cutover-Freigabe

## Technisch

```
TanStack Start · React 19 · Tailwind v4 · Vite
npm run dev   → Preview
npm run build → Production
```

Umschalter (nur Start + NLS):

- ohne Parameter oder `?look=alt` → Original (aktueller Default)
- `?look=ac` → älteres A+C-Muster (HomeAc / NlsNeko), **nicht** der Oura-Versuch

---

## Git-Landkarte für Entwickler

### `main` jetzt

`8af29ad` `chore: Original vor A+C als Default`  
= Tag `rp-20-pre-palette`

### Versuche danach (nicht gemergt, Tags behalten)

| Tag | Inhalt | Nutzen |
|---|---|---|
| `rp-20-palette` | Farbtabelle paper/ink/field/sage/clay/signal global | Farben ohne Oura-Chrome |
| `rp-21-oura-chrome` | Oura-Pille auf Start/NLS/Schmerz, Slider-Wisch | Header-Versuch |
| `rp-22-oura-frame` | Pille auf Neko-Hintergrund, Original-Logo | Rahmen sichtbar machen |
| `rp-23-framed-inset` | Slider+Menü in einem Rahmen, Neko-Grün nur unten | Letzter Versuch vor Rollback |
| `rp-24-pre-rollback` | Alias auf `rp-23-framed-inset` vor dem Reset | Sicherheitsnetz |

Wiederherstellen eines Versuchs, ohne `main` zu verschieben:

```bash
git checkout rp-23-framed-inset -- src public/media/brand
# oder ganzer Stand:
git switch -c versuch-oura rp-23-framed-inset
```

Hart zurück auf diesen Abendstand:

```bash
git checkout rp-20-pre-palette
# bzw. main nach dem Push
```

---

## Festgelegte, aber noch nicht live geschaltete Richtung

Beschlossen, **nicht** in diesem `main` umgesetzt:

1. Inhaltsmaschine Breitenberger (Anliegen-Hubs), Optik A+C, HWG strenger
2. Farbtabelle (verbindlich, Datei `docs/design-a-plus-c/00-FESTLEGUNG.md`):

| Token | Hex | Darf |
|---|---|---|
| paper | `#F7F1E8` | ganzer Grund |
| ink | `#1D2C38` | Text, H1 auf Hell |
| field | `#16332C` | nur Hero Gespräch |
| sage / Kreisgrün | `#3A6B4F` bzw. `#3F6B52` | Icon, Steg, Hover — keine Fläche |
| clay | `#C07859` | ein Knopf Anamnese/Nachricht |
| signal | `#8A4B32` | HWG-Hinweis |
| Neko-Hintergrund | `#3A5258` | nur untere Bänder/Buttons, **nicht** Menü |

3. Original-Logo: `public/media/originals/Peter-Logo-gross.svg` (auf späteren Tags nachgefärbt unter `public/media/brand/`)
4. Slider grundsätzlich mit Wisch (Google: `touch-action: pan-y`, 44px) — liegt auf `rp-21` ff.

## Nicht anfassen ohne Rückfrage

- Live-Domain, Plesk, WordPress
- Wortlaut der WP-Texte
- Lovable-App-Funktionen
- Hub-URLs / Rankings

## Nächster sinnvoller Schritt (Vorschlag)

Neu ansetzen **auf diesem `main`**, nicht die Oura-Tags weiterflicken:

1. Farbtabelle aus der Festlegung **ohne** Header-Umbau
2. Slider einrahmen (nicht randlos), Menü getrennt
3. Neko-Grün nur unten (Erstgespräch)
4. Original-Logo in den bestehenden Header

Details zur Migration: [`docs/migration/00-README.md`](../migration/00-README.md)  
Ältere Übergabe (Mittag, rp-14): [`docs/handover-2026-08-18/00-START-HIER.md`](../handover-2026-08-18/00-START-HIER.md)
