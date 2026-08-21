# Übergabe 21. August 2026 — Stand nach Welle 1 + Tiefenanalyse (Abend)

> **Historischer Zwischenstand:** Für alle Arbeiten ab dem GitHub-Sync ist
> `docs/relaunch-2026/00-MASTERPLAN.md` in Version 2.0.0 die einzige kanonische
> Ausführungs- und Statusquelle. Insbesondere sind die frühere Aussage „GitHub
> nicht erforderlich“ und der damalige ungepushte Branchstatus überholt.

**Für:** Entwickler, die das Projekt ab hier übernehmen
**Repo:** `redshift-three67/peter_web_neu` (lokal: `repo-main/`, Worktree des Embedded-Repos — **noch nicht gepusht**, GitHub laut Auftraggeber nicht erforderlich)
**Live:** WordPress auf rauch-heilpraktiker.de unverändert · **Nicht anfassen ohne Rückfrage:** Live-Domain, Plesk, WordPress, Lovable-App, Hub-URLs/Rankings · Bilder nur in Absprache, **Geräte nie**

> Diese Übergabe **ersetzt** den Mittag-Stand (`00-STAND.md` wurde aktualisiert; Historie siehe `docs/migration/changelog.md`).

---

## 1. Git-Landkarte (alles lokal, Reihenfolge = Entstehung)

| Ref | Commit | Inhalt |
|---|---|---|
| `rp-27-pre-inhaltsabgleich` | `688af8e` | Zustand vor Welle 1 (Fallback für die Inhaltsangleichung) |
| `rp-28-welle1-paritaet` | `50b5949` | Welle 1: Inhalts-Parität Start + Hubs (FAQ 6+1, FAQPage/Breadcrumb-Schema überall, Anliegen-Tiefe, Slider-Motive, Bilder im Fluss, Verfahrens-Verzeichnis, Card-Titel-Fix) |
| `rp-29-default-relaunch-design` | `1979381` | **Relaunch-Design ist Default** (`resolveLook`: URL > localStorage > `neu`); `?look=alt` Fallback bleibt |
| **`rp-30-tiefenanalyse`** (= HEAD, Branch `relaunch-konzept`) | `e41deaf` | Tiefenanalyse + Fixes: Prüfwerkzeug `scripts/parity-audit.mjs`, moreTitles-Chips in Anliegen-Hubs, Verfahrens-Verzeichnis 6→**17** Kacheln, FAQ-H2 Live-Wortlaut, Bericht `05-tiefenanalyse-paritaet.md` |
| älter | `rp-25/rp-26` | Anliegen-Hubs / Design-Prototyp (s. Mittag-Stand + Changelog) |

Arbeitsbaum ist **sauber** (`.vercel`/`.tanstack` regenerierbar bereinigt).

## 2. Verbindliche Entscheidungen des Auftraggebers (chronologisch)

1. **21.08. früh:** Farb-Tokens ✅ · Petrol sparsam wie NLS ✅ · Startseiten-**Struktur = Original** (HomeLegacy, nicht HomeAc) · Slider wie alte Seite an gleichen Stellen.
2. **21.08. Abend (implizit über Meldung + Freigabe des Defaults):** Relaunch-Design als Standard sichtbar; Inhaltsangleichung muss live nachvollziehbar sein.
3. Bildstruktur-Vorgabe: Archivbilder als **thematische Karten im Fließtext** (Bildstruktur_2), nicht als End-Galerie (umgesetzt).

## 3. Was aktuell im Neubau steht

- **Design (Default `neu`):** Tokens der Festlegung A+C (`00-FESTLEGUNG.md`), Body 18px, Playfair nur H1/Kapitel, Sticky Mobile-CTA, Design-Leiste (3 Looks zum Vergleichen), Diagnose-Variante mit Petrol nur auf `/nls-diagnostik`.
- **Inhalt Welle 1:** Startseite mit Original-Struktur + Verfahrens-Verzeichnis (17 Kacheln aus Live-Archiv) + Sprechzeiten + Schlussformel; Anliegen-Hubs (Schmerz/Erschöpfung/Allergie) mit vollständiger Archiv-Tiefe inkl. moreTitles-Chips; alle Hubs mit Live-Slider-Motiven, Bildern im Fließtext, FAQPage/Breadcrumb-Schema, FAQ im Live-Wortlaut.
- **Prüfwerkzeug:** `node scripts/parity-audit.mjs` — elementgenauer Live-vs-Neubau-Vergleich (Lektüre der Scheinlücken-Fallen: Entities, Menü-Chrome, Join-Strings — siehe Bericht 05!).

## 4. Offen — Welle 2 (priorisiert, aus Bericht 05)

1. **P0 NLS-Archivtiefe:** `NlsNeko` rendert den Archiv-Body nicht (Live-Kapitel „mit der NLS-Diagnostik", „NLS Diagnose Körper/Darm" fehlen) — analog AnliegenHub nachrüsten.
2. **P0 Kontakt-Seite:** Live-Texte (Praxisbeschreibung, Leistungsliste, Termin-Texte) in den Formular-Neubau einbauen.
3. **P1 Menü-Linkprofil:** Header-/Mega-Menü um die echten Unterseiten-URLs erweitern (alle Routen existieren als `$slug`; Labels der Live-Seite verwenden).
4. **P2 Nachcrawl GAP-A:** 4 Hub-Slider fehlen im Katalog (bioresonanz, schmerz, psychotherapie, manuelle-übersicht).
5. **P2 H1-Wortlaute** je Hub an Live angleichen (z. B. „Klassische Homöopathie nach Dr. Samuel Hahnemann").
6. Danach Masterplan Phase 4 (SEO/GEO: GBP, Reviews, Ratgeber-Spokes) — `docs/relaunch-2026/00-MASTERPLAN.md`.

## 5. Betrieb (Windows, Git Bash — unverändert wichtig)

```bash
cd repo-main && npm run dev    # http://127.0.0.1:8080 (läuft ggf. schon)
node scripts/parity-audit.mjs  # Paritätsmessung gegen Live-Snapshot
```

- **RAM-Falle:** läuft der Dev-Server lange, stirbt Build/Lint an OOM → Dev stoppen, `NODE_OPTIONS="--max-old-space-size=4096" npm run build`, Dev neu starten.
- Nach Dev-Restart im Browser **Strg+F5** (sonst alte Module).
- `.vercel`/`.tanstack` sind Abfall: `git clean -fd .vercel .tanstack`.
- Petrol prüfen: nur `/nls-diagnostik` (Diagnose-Skin), nicht Start/Gesprächsseiten.

## 6. Einstiegspunkte

| Frage | Datei |
|---|---|
| Gesamtplan & Phasen | `docs/relaunch-2026/00-MASTERPLAN.md` |
| Wettbewerb / Google-Kriterien | `01-wettbewerbsanalyse-augsburg.md`, `02-google-kriterien-2026.md` |
| Design-System + Freigaben | `03-design-system-relaunch.md`, `docs/design-a-plus-c/00-FESTLEGUNG.md` |
| Parität Welle 1 (Agentenbericht + Live-FAQs) | `04-paritaetsabgleich-welle1.md` |
| **Tiefenanalyse Abend (Ursachen, Messwerte, Restlücken)** | `05-tiefenanalyse-paritaet.md` |
| Live-Referenz | `content/wordpress/live-snapshot-2026-08-21/` (18 Seiten) |
| Laufende Akte | `docs/migration/changelog.md` |
