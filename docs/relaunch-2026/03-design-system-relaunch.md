# Design-System Relaunch 2026 — „Fachpraxis im Quartier"

**Umsetzung der verbindlichen Festlegung** `docs/design-a-plus-c/00-FESTLEGUNG.md` **als lauffähiger Skin** (`?look=neu`, Branch `relaunch-konzept`). Position: ruhig, hochwertig, ehrlich — die unbesetzte Design-Position im Augsburger Umfeld (Wettbewerber: entweder Katalog-WordPress oder Marketing-Wärme).

## 0. Teil-Freigaben des Auftraggebers (21.08.2026, nach Sichtung `?look=neu`)

| Entscheidung | Festlegung |
|---|---|
| **Farb-Tokens** | ✅ freigegeben (paper/ink/field/sage/clay/signal wie implementiert) |
| **Startseiten-Struktur** | **Original-Struktur maßgeblich** (`HomeLegacy`): Slider, Sektionen, intelligenter Einsatz von Texten/Bildern/Symbolen — `look=neu` zeigt diese Struktur mit neuen Tokens (nicht mehr `HomeAc`) |
| **Slider** | **Wie auf der alten Seite, an gleichen Stellen**: Startseite 5-Motive-Slider; Anliegen-Hubs nutzen jetzt den Archiv-Slider (NAET: 3 echte Motive; Schmerz/Psyche: statisches Titelbild wie im WP-Original) |
| **Petrol-Akzent** | ✅ in dieser Form freigegeben: sparsam, nur als Akzent — NLS-Diagnostik ist die Referenz; keine petrolfarbenen Vollflächen |

Folgeregel: Slider-Optik im Modern-Look (field-Gradient `#16332C`, Paper-Glas, Clay-CTA) einheitlich in `HeroSlider` + `PageHeroSlider` über `modern = ac || neu`.

## 1. Design-Token (implementiert in `src/styles.css` unter `.theme-neu`)

| Token | Wert | Rolle |
|---|---|---|
| `paper` / `bg` | `#F7F1E8` | Seitengrund (Oura-Creme, nicht Klinikweiß) |
| `paper-deep` (Band) | `#EFE8DC` | Wechselbänder, Zitatflächen, Karten-Hintergrund `#F3EDE1` |
| `ink` / `fg` | `#1D2C38` | Fließtext, H1 auf Hell |
| `ink-soft` / `muted` | `#4A5863` | Sekundärtext, Captions |
| `line` | `#D9D1C4` | 1px-Linien |
| `field` | `#16332C` | dunkles Hero-Feld, Sticky-Mobile-CTA (nicht Vollseiten-Grün) |
| `sage` | `#3F6B52` | **nur Akzent:** Icons, Link-Hover, dünner Steg |
| `sage-deep` | `#274935` | Link-Text klein |
| `clay` | `#C07859` | **ein** CTA (Anrufen/Anamnese) |
| `signal` | `#8A4B32` | HWG-/Grenzen-Hinweise („Das biete ich bewusst nicht"), ersetzt Alarm-Rot |
| Neko-Petrol | `#3A5258` | nur Diagnose-Seiten als Akzent (`.theme-neu-diag`) |

**Diagnose-Variante** (`.theme-neu-diag`, z. Zt. NLS): sage → Petrol `#3A5258`, sage-600/700 → Ink — kühler, dieselbe Marke.

## 2. Typografie (lokal gehostet, DSGVO)

| Rolle | Familie | Schnitt | Größe |
|---|---|---|---|
| Display (H1, Kapitel-H2) | Playfair Display | 500/600 | H1 2.5–3.25rem, lh 1.15, tracking −0.02em |
| Betonung | Playfair Display *italic* 500 | 1 Wort im H1 (`.neu-em`) | — |
| Fließtext/UI | Source Sans 3 | 400/500/600 | **Body 18px, lh 1.65** (im Skin gesetzt) |
| Karten-Titel/H3/H4 | Source Sans 600 | — | 1.05–1.2rem |

Disziplin: Playfair **nur** H1/Kapitel; H3/H4 immer Sans (im Skin erzwungen); kein drittes Font; Recht/Impressum nur Sans. `playfair-italic-500.woff2` ist nachgezogen (OFL, `public/fonts/`).

## 3. Form & Komponenten-Regeln

- Ecken max. `1rem` (`--radius-3xl` im Skin auf 1rem gezogen) — keine 2xl-Blasen.
- Hero: **ein** Foto (Begegnung oder Raum), kein Geräte-Slider als Identität; Overlay wie Token paper 55 %.
- Karten: wenige, groß, ruhig; keine 6×-Kachel-Wände.
- Schatten weich/dezent (bestehende soft/card/elevated bleiben).
- Warn-/Grenzen-Blöcke: `signal` auf `paper-deep`, Fließtext ≥17px.
- **Sticky Mobile-CTA-Leiste** (`md:hidden`): „Anrufen" (clay, `tel:`) + „Termin anfragen" (paper auf field), min-height 44px, safe-area — Conversion- und WCAG-2.2-Anforderung.
- Reveal-Animation nur `prefers-reduced-motion: no-preference` (`.neu-rise`).

## 4. Seitentypen

| Typ | Feld/Hero | H1 | Akzent |
|---|---|---|---|
| Gesprächsseiten (Start, Über mich, Schmerz, Erschöpfung, Allergie, Hypnose, Kontakt) | paper, Hero darf field + Gesprächsfoto | Playfair auf Hell oder Creme auf field | sage dünn, clay 1× |
| Diagnose-Seiten (NLS, EAV, Vieva, Bioresonanz, Diagnostik-Übersicht) | paper, Hero kühler (ink/Petrol-Akzent) | Playfair paper auf ink | fast ohne sage |
| Recht/Impressum/Datenschutz | paper | Source Sans 600 | keiner |

## 5. Bilder — Regeln (Absprache-Pflicht bei Ersetzung)

| Datei | Urteil |
|---|---|
| Slider-Geräte, Trikombin, NLS-Scans | **fix — nie ersetzen** (nur Caption „kein Befund") |
| `anfahrt.jpg` | behalten (echter Ort, GEO-Gold) |
| `gespraech.jpg`, `manuelle-therapie.jpg` | behalten (Wärme/Hände, thematisch richtig) |
| `naturheilkunde.jpg` | behalten als Akzent, nicht Hero |
| `ruhe.jpg` | **ersetzen** (Kopfhörer-Stock) — Kandidat: `/images/free/raum-licht.jpg` |
| `hero-praxis.jpg` | nicht als Identität (Spa-Pflanze) |

Vorbereitete Unsplash-Freilizenzen: `raum-licht.jpg`, `wald-licht.jpg`, `gespraech-seite.jpg`. ALT-Texte führen; kein Foto behauptet Hochzoll außer `anfahrt.jpg`. **Jede Ersetzung vorher mit Auftraggeber abstimmen.** Mittelfristig: echtes Foto-Shooting (Person + Praxis) — schlägt Stock nachweislich (~35 %, s. 02-Kriterien).

## 6. Barrierefreiheit (WCAG 2.2 AA — Baumaßstab)

- Kontraste: ink/paper ≈ 12:1 ✅; paper auf field ≈ 10:1 ✅; sage `#3F6B52` nicht für Fließtext < 18px → sage-deep/ink (Regel aus Festlegung, eingehalten).
- Fokus-Ringe sichtbar (global 2px sage) ✅; Touch-Ziele ≥ 44px (Mobile-CTA) ✅; Skip-Link vorhanden ✅; `prefers-reduced-motion` ✅; Body 18px ✅.
- Offen bei Vollumsetzung: Kontrast-Audit aller Komponenten, Formular-Labels prüfen, Slider-Tastatursteuerung falls Slider bleibt.

## 7. Konvention & Vorschau

- Skin-Klassen: `.theme-neu` (+ `.theme-neu-diag`), aktiv per `?look=neu` (oder Leiste). **Default bleibt `look=alt`** bis zur ausdrücklichen Design-Freigabe — dann Tokens als neue Defaults und Legacy-Skins entfernen.
- Vorschau-Flächen: Start, NLS, die drei Anliegen-Hubs (Design-Leiste schaltet um).
- Nach Freigabe: Übertragung auf alle Seiten ist reine Klassen-Aktivierung; Startseiten-Feinschliff (Trust-Leiste unter Hero: „Erlaubnis seit 26.12.2006 · Physiotherapeut seit 2001 · 4,85/103 ProvenExpert · BDHN"; ein Playfair-Italic-Wort im H1).

## 8. Verifikation (21.08.2026, `?look=neu`)

Computed-Styles-Messung (Playwright, Mobil-Viewport 390px): bg `rgb(247,241,232)` ✅, fg `rgb(29,44,56)` ✅, Body 18px ✅, H1 Playfair ✅, H3 Source Sans ✅, Mobile-CTA vorhanden, tel-Target 44px ✅. Screenshots: `screenshots/neu-*.png` (Start, Schmerz, Erschöpfung, Allergie, NLS, Mobil). Typecheck grün.
