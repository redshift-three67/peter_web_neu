# Festlegung A+C — Farbe und Schrift

**Status: verbindlich** · 18.08.2026 · Live-Seite noch unverändert  
**Richtung:** Parsley-Stimmung (A) + Neko nur auf Diagnose (C)  
**Nicht:** Breitenberger-Look · Lanserhof als Ganzes · Sage als Tapezierfarbe

Die Inhalts-Maschine (Anliegen-Hubs, Person, Kosten/FAQ, Quellen) bleibt die SEO-Schiene.  
Dieses Blatt legt nur **Optik** fest.

---

## 1. Schriftpaar (bleibt lokal gehostet)

| Rolle | Familie | Schnitt | Größe / Maß |
|---|---|---|---|
| Display | **Playfair Display** | 500, selten 600 | H1 2.5–3.25rem, lh 1.15, tracking −0.02em |
| Fließ / UI | **Source Sans 3** | 400 / 500 / 600 | Body **18px** (1.125rem), lh **1.65** |
| Karten-Titel, H3 | Source Sans 600 | nicht Playfair | 1.05–1.2rem |
| Nav, Buttons | Source Sans 500 | — | 0.95rem |
| Eine Betonung | Playfair *italic* 500 | ein Wort im H1 | wie Oura *trusted* |

**Schon im Repo:** `public/fonts/playfair-500|600`, `source-sans-400|500|600`.  
**Nachziehen vor Umsetzung:** `playfair-italic-500.woff2` (ein File, OFL).

### Disziplin

- Playfair **nur** H1 und ausgewählte H2 (Kapitel). Nicht auf jeder Karte.
- Kein drittes Fancy-Font. Keine Google Fonts.
- Rechts/Impressum: nur Source Sans.
- Diagnose-Seiten (C): dieselben Familien, H1 etwas kleiner, mehr Source-Gewicht — kühler, nicht andere Marke.

---

## 2. Farbpaar

Zwei Temperaturen, **eine** Marke.

### Feld und Text (immer)

| Token | Hex | Rolle |
|---|---|---|
| `paper` | `#F7F1E8` | Seitengrund (Oura-Creme, nicht Klinikweiß) |
| `paper-deep` | `#EFE8DC` | Wechselband, Zitatfläche hell |
| `ink` | `#1D2C38` | Fließtext, H1 auf Hell (Oura-Tinte) |
| `ink-soft` | `#4A5863` | Sekundär, Meta, Captions |
| `line` | `#D9D1C4` | Linien, 1px |

### Akzente (sparsam)

| Token | Hex | Rolle |
|---|---|---|
| `field` | `#16332C` | Parsley-Hero, dunkles ruhiges Feld, **nicht** Vollseiten-Grün |
| `sage` | `#3F6B52` | **Nur Akzent:** Icon, Link-Hover, dünner Steg, Blatt |
| `sage-deep` | `#274935` | Link-Text (Kontrast klein) |
| `clay` | `#C07859` | **Ein** CTA: Anamnese / Nachricht. Sonst nicht |
| `signal` | `#8A4B32` | HWG-Hinweis (Terracotta dunkler, kein Rot-Alarm) |

### Diagnose (C) — dieselben Tokens, andere Mischung

- Grund weiter `paper`, Text `ink`
- Hero darf `ink` statt `field` (kühler, Neko)
- `sage` auf Diagnose-Seiten **weg** oder 1 Icon
- Kein Clay außer der eine Anamnese-Button im Footer/Header

### Kontrast (WCAG AA, E-E-A-T)

- `ink` auf `paper` — großzügig über AA
- Weiß `#F7F1E8` auf `field` `#16332C` — AA für große Schrift
- `sage` `#3F6B52` **nicht** für Fließtext unter 18px → dafür `sage-deep` oder `ink`
- Glas-Karten: Text immer `ink`, nie Weiß auf hellem Foto

---

## 3. Wo welche Temperatur

| Fläche | Feld | H1 | Akzent |
|---|---|---|---|
| Start, Über mich, Schmerz, Psyche, Hypnose, Kontakt | `paper`, Hero darf `field` + Gesprächsfoto | Playfair auf Hell **oder** Creme auf `field` | sage dünn, clay 1× |
| NLS, EAV, Vieva, Bioresonanz, Diagnostik-Übersicht | `paper`, Hero `ink` | Playfair `paper` auf `ink` | fast ohne sage |
| Impressum, Datenschutz, Recht | `paper` | Source Sans 600 | keiner |

---

## 4. Form (kurz, damit Farbe/Schrift halten)

- Ecken `1rem`, nicht 2xl-Blasen überall
- Hero: ein Foto (Begegnung oder Raum), kein Geräte-Slider als Identität
- Karten: wenige, vollbreit, nicht 6× Sage-Kachel
- Warnung: `signal` auf `paper-deep`, Fließtext 17px+
- Alpine (B) nur im **Foto**: Licht, Holz, Fenster — nicht als UI-Stil

---

## 5. Was sich gegenüber heute ändert (später, nicht jetzt)

| Heute | Festlegung |
|---|---|
| Sage-50-Flächen, grüne Layer | `paper` + `field` nur im Hero |
| Playfair auf fast jeder Karten-H3 | Playfair nur Kapitel |
| Slider-Glas sage/weiß | H1 `ink` oder Creme auf Foto, Overlay wie Token `paper` 55 % |
| Clay + Sage-Buttons gleich laut | ein Clay, Rest Textlink oder `field` |

Live-CSS und Komponenten bleiben bis zur Umsetzungsfreigabe.

---

## 6. Nächster Schritt nach Freigabe

1. Italic-Datei legen  
2. Tokens in `src/styles.css` umbenennen/ersetzen  
3. Start + ein Diagnose-Hub (NLS) als Muster  
4. Rest der 18 Hubs über das Muster
