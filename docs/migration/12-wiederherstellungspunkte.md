# Wiederherstellungspunkte

Lokales Git-Repo, Remote [redshift-three67/peter_web_neu](https://github.com/redshift-three67/peter_web_neu).

**Aktueller Auftraggeber-Stand (`main`):** `rp-20-pre-palette` · `8af29ad`

| Punkt | Tag | Inhalt |
|---|---|---|
| RP-01 … RP-14 | `rp-01-design-tokens` … `rp-14-hub-rhythm` | Hub-Rollout, Start-Rhythmus. Siehe ältere Tabelle unten. |
| RP-15 vor | `rp-15-pre-aplus-c` | Vor A+C-Muster |
| RP-15 | `rp-15-aplus-c-muster` | A+C auf Start + NLS, Fallback `look=alt` |
| RP-16 vor | `rp-16-pre-neko-oura` | Vor Neko/Oura-Struktur |
| RP-16 | `rp-16-neko-oura` | HomeAc + NlsNeko |
| RP-17 | `rp-17-oura` | Oura nur Start |
| RP-18 | `rp-18-neko-nls` | Neko nur NLS |
| RP-19 | `rp-19-aplus-c` | Zurück auf A+C-Kombination |
| **RP-20 vor = main** | **`rp-20-pre-palette`** | **Original als Default. Aktuell.** |
| RP-20 | `rp-20-palette` | Farbtabelle global (nicht auf main) |
| RP-21 | `rp-21-oura-chrome` | Oura-Header 3 Seiten + Wisch |
| RP-22 | `rp-22-oura-frame` | Rahmen auf Neko-BG, Logo |
| RP-23 | `rp-23-framed-inset` | Slider+Menü gerahmt |
| RP-24 | `rp-24-pre-rollback` | Letzter Stand vor Reset auf RP-20 |

## Zurücksetzen

```bash
# Aktueller freigegebener Stand
git checkout rp-20-pre-palette

# Letzter Oura/Rahmen-Versuch (nicht main)
git checkout rp-23-framed-inset -- src
```

`public/media/originals/` bleibt beim Checkout erhalten (oft ungetrackt).

## RP-01 bis RP-14 (Mittag)

| Punkt | Tag | Inhalt |
|---|---|---|
| RP-01 | `rp-01-design-tokens` | Look-Angleichung Schritt 1 |
| RP-02 | `rp-02-slider-strukturen` | Hero-Slider |
| RP-08 | `rp-08-archive-skin` | Archivseiten in Start-Haut |
| RP-09–11 | `rp-09-hubs-wave1` … `rp-11-hubs-wave3` | 18 Hubs |
| RP-14 | `rp-14-hub-rhythm` | Start-Rhythmus, Pause mittags |
