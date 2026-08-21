# Übergabe 21. August 2026 — Relaunch-Stand nach Design-Teilfreigaben

**Für:** Entwickler, die das Projekt ab hier übernehmen
**Repo:** `redshift-three67/peter_web_neu` (lokal: `repo-main/`, Worktree des Embedded-Repos — **noch nicht gepusht**, GitHub nicht erforderlich laut Auftraggeber)
**Live:** WordPress auf rauch-heilpraktiker.de unverändert · **Nicht anfassen ohne Rückfrage:** Live-Domain, Plesk, WordPress, Lovable-App, Hub-URLs/Rankings

---

## 1. Git-Landkarte (alles lokal)

| Ref | Commit | Inhalt |
|---|---|---|
| `origin/main` | `1d535b3` | GitHub-Stand (Breitenberger-Entwicklerbrief), lokal gefetcht |
| Branch **`breitenberger-hubs`** | `3450b33` | Drei Anliegen-Hubs (Schmerz, Erschöpfung/Burnout, Allergie/NAET) nach Brief `docs/design-a-plus-c/07-*.md`, Title-Formel, FAQPage/Breadcrumb-Schema, „Psychotherapie"→„Erschöpfung & Burnout" (URL unverändert) |
| Branch **`relaunch-konzept`** (= aktuell ausgecheckt) | `53570b1` | Alles aus `breitenberger-hubs` **plus** Masterplan-Doku + Design-Prototyp `?look=neu` + Teil-Freigaben-Umsetzung (Original-Struktur, Slider wie alte Seite, Petrol wie NLS) |
| Tag `rp-25-anliegen-hubs` | `3450b33` | Wiederherstellungspunkt Inhalt |
| Tag `rp-26-relaunch-design-stand` | `53570b1` | Wiederherstellungspunkt Design |
| Ältere Tags `rp-01`–`rp-24` | — | Design-Iterationsgeschichte (siehe `docs/handover-2026-08-18-abend/00-STAND.md`) |

**Arbeitsbaum ist clean.** Dev-Server lief beim Stand `53570b1` (`routeTree.gen.ts` ist inhaltsgleich).

## 2. Was fertig ist

### Inhalt (Branch `breitenberger-hubs`)
- `src/content/anliegen.ts` + `src/components/site/AnliegenHub.tsx`: Anliegen-Hubs mit Akzeptanzkatalog des Briefs (Above-the-fold-Kacheln wer/für wen/wo/was-nicht, zitierfähige Kurzdefinition, Symptom-Karten ohne Claims, Einordnung mit Red Flags, Archiv-Tiefe, Verfahrens-Spokes, Bietet/Bietet-bewusst-nicht, 3 Schritte, FAQ 5/Seite, NAP, Byline, Quellen, Clay-CTA).
- Title-Formel Anliegen+Ort in `src/content/hubs.ts` für die drei Hubs; Nav/Footer/Slider-Labels mitgezogen (`site.ts`, `slides.ts`, `Header.tsx`-Icon-Map).
- NAET-Seite ordnet NAET ausdrücklich als nicht schulmedizinisch anerkannt ein (HWG-strenger = gewollter Vorsprung).

### Plan & Recherche (Branch `relaunch-konzept`)
- `docs/relaunch-2026/00-MASTERPLAN.md` — Phasen 0–5, Akzeptanz „nahtlos", Governance (u. a. Bilder nur in Absprache, **Geräte nie ersetzen**).
- `docs/relaunch-2026/01-wettbewerbsanalyse-augsburg.md` — SERPs, 6 Wettbewerber, Muster, Differenzierungshebel (Kern: „NAET Augsburg" ohne lokale Konkurrenz; Burnout-SERP ohne Naturheilpraktiker; kein Augsburger Wettbewerber mit echtem Schema-Stack; Rauch #1 „Heilpraktiker Hochzoll").
- `docs/relaunch-2026/02-google-kriterien-2026.md` — E-E-A-T/YMYL, GEO/AI Overviews, Local, CWV/BFSG/WCAG 2.2, Conversion; jeweils priorisierte Empfehlungen.
- `docs/relaunch-2026/03-design-system-relaunch.md` — Design-System inkl. **Teil-Freigaben (s. §3)**.

### Design-Prototyp `?look=neu`
- Skin `.theme-neu` / `.theme-neu-diag` in `src/styles.css` nach `docs/design-a-plus-c/00-FESTLEGUNG.md` (paper `#F7F1E8`, ink `#1D2C38`, field `#16332C`, sage nur Akzent, clay 1 CTA, signal statt rot; Diagnose: Petrol `#3A5258`).
- Typo: Playfair nur H1/Kapitel (H3/H4 erzwungen Source Sans), **Body 18px/1.65**, `playfair-italic-500.woff2` lokal gehostet (OFL).
- Sticky Mobile-CTA (Anrufen/Termin, 44px, safe-area) in `SiteShell.tsx`.
- Design-Leiste (drei Looks) in `DesignSkin.tsx`; Umschalter-Logik `src/lib/design-skin.ts` (`look=alt|ac|neu`, Default bleibt `alt`).
- Start bei `look=neu` = **Original-Struktur** (`HomeLegacy`) mit neuen Tokens; Slider-Optik modern in `HeroSlider`/`PageHeroSlider` (`modern = ac || neu`).
- Anliegen-Hubs mit `PageHeroSlider` aus **echten Archiv-Slides** (NAET 3 Motive mit Punkte-Navigation; Schmerz → Osteopathie-Bild; Psyche → Archivmotiv — je wie WP-Original).

**Verifikation:** `npm run typecheck` ✅, `npm run lint` (0 Fehler, 3 vorbestehende Warnungen) ✅, `npm run build` ✅ (drei `✓ built`), SSR-Checks der Slider (3 Punkte NAET), Computed-Styles (Farben/Fonts/18px/44px-CTA) ✅. Screenshots: `screenshots/neu*.png`, `anliegen-*.png`.

## 3. Freigaben des Auftraggebers (21.08.2026, verbindlich)

1. **Farb-Tokens freigegeben** (wie implementiert).
2. **Petrol-Akzent freigegeben**: sparsam, nur Akzent — NLS-Diagnostik ist die Referenz, keine Vollflächen.
3. **Startseiten-Struktur: Original ist maßgeblich** (`HomeLegacy`), nicht `HomeAc`.
4. **Slider wie auf der alten Seite, an gleichen Stellen** (umgesetzt, s. o.).

**Ausstehende Entscheidung:** `look=neu` flächendeckend als Default aktivieren (Tokens zu @theme-Defaults erheben, Legacy-Skins entfernen) — erst nach Restsichtung durch Auftraggeber.

## 4. Nächste sinnvolle Schritte (Priorität)

1. **Default-Umschaltung** nach Freigabe: `resolveLook`-Default auf `neu`, `.theme-neu`-Tokens in `@theme` überführen, `theme-ac`-Altlasten entfernen, Startseiten-Feinschliff (Trust-Leiste unter Hero, ein Playfair-Italic-Wort im H1 via `.neu-em`).
2. **Restliche 15 Hub-Titel** nach Title-Formel Leistung+Ort überarbeiten (`hubMeta`).
3. **Ratgeber-Spokes** je Anliegen (4–6 Artikel, beginnend NAET-Whitespace, dann Burnout) — nur suchintend-gestützte Themen, kein Ratgeber-Friedhof.
4. **Phase 0 des Masterplans**: URL-Inventar-Abgleich, 301-Map finalisieren, GSC-Snapshot, WP einfrieren.
5. Bild-Ersetzung `ruhe.jpg` (Kopfhörer-Stock) vorbereitet — **Absprache vor Umsetzung** (Kandidat: `/images/free/raum-licht.jpg`).

## 5. Betrieb auf dieser Maschine (Windows, Git Bash)

```bash
cd repo-main
npm run dev        # Preview auf http://127.0.0.1:8080  (derzeit LAUFEND gelassen)
```

- `?look=neu` bzw. Design-Leiste oben auf: `/`, `/nls-diagnostik`, `/schmerztherapie-augsburg`, `/psychotherapie-augsburg`, `/naet-methode-allergie-behandlung`. Auswahl persistiert (localStorage `rauch-look`).
- **RAM-Falle:** Läuft der Dev-Server lange, stirbt `npm run build`/`lint` an OOM. Dann: Dev-Server stoppen, `NODE_OPTIONS="--max-old-space-size=4096" npm run build|lint`, Dev-Server neu starten (tut es).
- Playwright ist installiert (Chromium-Headless-Shell vorhanden). Screenshots landen in `screenshots/`.
- `.vercel/`-Output ist regenerierbar (`git clean -fd .vercel .tanstack` bei Flackern; `routeTree.gen.ts` wird vom Dev-Server neu geschrieben — nur bei echten Änderungen committen).

## 6. Prozesse/Agenten (Stand Abschluss)

- **Keine Agenten mehr aktiv.** Vier Agentenverzeichnisse im Session-Ordner: zwei tote Leichen vom Netzwerkfehler (21.08. früh), zwei **abgeschlossene** Rechercheläufe (Ergebnisse in `docs/relaunch-2026/01+02`).
- Laufende Prozesse: Dev-Server (node) + eigener Chrome des Nutzers (Vorschau). Keine Chromium-Leichen.

## 7. Einstiegspunkte

| Frage | Datei |
|---|---|
| Was ist der Plan? | `docs/relaunch-2026/00-MASTERPLAN.md` |
| Warum diese Entscheidungen? | `01-…augsburg.md`, `02-…kriterien.md` |
| Design-Regeln/Freigaben | `03-design-system-relaunch.md` + `docs/design-a-plus-c/00-FESTLEGUNG.md` |
| Inhalts-Vorgabe Anliegen | `docs/design-a-plus-c/07-breitenberger-inhaltsmaschine.md` |
| Ältere Historik | `docs/migration/changelog.md`, `docs/handover-2026-08-18*/` |
