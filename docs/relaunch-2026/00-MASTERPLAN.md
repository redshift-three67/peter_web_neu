# Masterplan Relaunch rauch-heilpraktiker.de

**Stand:** 20./21.08.2026 · **Basis:** `main` = `1d535b3` · **Arbeitsbranches:** `breitenberger-hubs` (Inhalt), `relaunch-konzept` (Design, basiert auf `breitenberger-hubs`)
**Gültig alongside:** `docs/migration/` (Technik), `docs/design-a-plus-c/` (Festlegungen)
**Auftraggeber-Vorgaben (21.08.2026):**

- **(a)** Die kürzlich nach Google-Richtlinien optimierte WordPress-Seite bleibt live, bis der Neubau in professioneller E-E-A-T-/Google-Struktur steht. Der inhaltlich-strukturelle Stand (Start, Hubs, sukzessive Kindseiten) wird **nahtlos** übernommen — kein Rankingverlust.
- **(b)** Es gab einen UI/UX-Versuch (Farben, Textstrukturen, professionelle Elemente, Schriften). Ein optimales, auf die Thematik abgestimmtes modernes Design ist zu entwickeln und im Plan sichtbar zu halten. **Bilder dürfen ersetzt werden — therapiebezogene Geräte NICHT; Ersetzungen nur in Absprache.**
- **(c)** Umsetzung, die im lokalen Umfeld ihresgleichen sucht. Breitenberger-Inhaltsmaschine **sanft und googletauglich** umsetzen — ohne deren UI/UX.
- **(d)** Optimale SEO/GEO relativ zum lokalen Wettbewerbsumfeld.

---

## 1. Zielbild

Eine lokal führende, E-E-A-T-feste Praxis-Website: ruhiges, hochwertiges Design (Festlegung A+C), Inhaltsmaschine aus Anliegen- und Verfahrensseiten, zitierfähige ehrliche Texte (HWG-strenger als der Wettbewerb), nahtlose Übernahme aller rankingsrelevanten URLs und Inhalte von WordPress, mobil erstklassig, barrierefrei nach WCAG 2.2 AA.

**Leitentscheidungen (bestätigt durch Tiefenrecherche, s. 01/02):**

1. WordPress bleibt bis Cutover unangetastet live; Neubau parallel (TanStack Start). Kein Big-Bang ohne Redirect-Sicherung.
2. Alle 18 Hub-URLs behalten ihre Pfade (alte WP-Pfade). Archiv-/Kindseiten laufen unter denselben Pfaden weiter (`$slug`), nicht-hubs noindex (gewollt).
3. Inhaltsarchitektur dreischichtig nach Breitenberger-Logik (Anliegen → Money-/Verfahrensseiten → Ratgeber-Spokes) — mit unserer Optik und strengerer Ehrlichkeit.
4. Design nach der verbindlichen Festlegung `docs/design-a-plus-c/00-FESTLEGUNG.md`, jetzt als `look=neu`-Skin umgesetzt und erweiterbar.

---

## 2. Phasenplan

### Phase 0 — Absicherung (vor jedem weiteren Schritt)

- [ ] Vollständiges URL-Inventar der Live-WP-Seite abgleichen mit `docs/migration/02-inventar-urls.md` (Crawl, Stand August 2026).
- [ ] 301-Map finalisieren: jede alte URL → neue URL (Ident-Pfade für die 18 Hubs; Redirects für Altlasten gemäß `legacyRedirects` in `src/content/hubs.ts`).
- [ ] GSC + Bing Webmaster: beide Properties prüfen, Cutover-Tag vorbereitet, Ranking-Report als Snapshot (Top-Keywords/URLs) ablegen.
- [ ] WP-Seite einfrieren: keine strukturellen Änderungen mehr (Content-Pflege weiterhin erlaubt, aber Änderungen in die Inhaltsquelle `content/wordpress/` nachziehen).
- [ ] Backups: WP-DB + Dateien (Plesk), Repo-Tags (`rp-*`-Konvention weiterführen).

### Phase 1 — Nahtlose Übernahme (Struktur/Content) — *weitgehend erledigt*

- [x] 18 Hub-URLs auf alten Pfaden (Wellen 1–3, `hubWaves`).
- [x] Archiv-Kindseiten über `$slug`-Route (noindex,follow, außer Hubs).
- [x] Startseite mit allen WP-Slider-Inhalten (`slides.ts`, Overlay-Texte 1:1).
- [x] Texte aus Archiv (HWG-Disclaimer, NAP Hochzoll) eingebunden.
- [ ] **Offen:** Verfeinerung der Hub-Titel/Metas für die verbleibenden 15 Hubs nach Title-Formel (Leistung + Augsburg + Name; Gerät + Ort nur noch für echte Geräte-Seiten als Stütze).
- [ ] **Offen:** Je Hub prüfen: Alle WP-Inhaltsteile im Archiv-Renderer sichtbar? (Stichprobe je Seite, `docs/migration/05-crawl-protokoll.md` ergänzen.)

### Phase 2 — Anliegen-Hubs / Inhaltsmaschine — *auf Branch `breitenberger-hubs` fertig*

- [x] Drei Anliegen-Hubs (Schmerz, Erschöpfung/Burnout, Allergie/NAET) mit Akzeptanzkatalog: Anliegen+Ort-Titel, Above-the-fold-Kacheln, zitierfähiger Kurzdefinition, Symptom-Karten, Einordnung mit Red Flags, Archiv-Tiefe, Verfahrens-Spokes, Bietet/Bietet-nicht, 3 Schritte, FAQ, NAP, Byline, Quellen, Clay-CTA.
- [x] FAQPage- + Breadcrumb-Schema auf diesen Hubs.
- [x] „Psychotherapie"-Titel → „Erschöpfung & Burnout" (Rechtssicherheit PsychThG; URL unverändert).
- [ ] **Sanft weiterbauen (nur wo Suchintend existiert):** Ratgeber-Spokes je Anliegen (4–6 Artikel), beginnend mit dem stärksten Whitespace: **NAET Augsburg hat null lokale Konkurrenz** (01-Wettbewerbsanalyse). Danach Burnout/Erschöpfung (kein Naturheilpraktiker-Angebot in der SERP). Kein „Ratgeber-Friedhof": jeder Artikel stützt genau einen Hub, intern verlinkt, mit Byline + Datum.
- [ ] Kostenübersicht je Leistungsbereich ausbauen (`/erstgespraech` → echte Rahmentabelle, in Absprache).

### Phase 3 — Design-Relaunch — *Prototyp auf Branch `relaunch-konzept` (`?look=neu`)*

- [x] Skin `theme-neu` nach Festlegung: paper `#F7F1E8`, ink `#1D2C38`, field `#16332C` (dunkles Hero-Feld), sage `#3F6B52` nur Akzent, clay `#C07859` ein CTA, signal `#8A4B32` für HWG-/Grenzen-Hinweise; Diagnose-Variante `theme-neu-diag` (Neko-Petrol-Akzent `#3A5258`, sage fast weg).
- [x] Typografie: Playfair 500/600 nur H1/Kapitel-H2; Source Sans 3 für Fließtext/Karten; **Body 18px / lh 1,65**; Playfair-Italic 500 lokal gehostet nachgezogen.
- [x] Sticky Mobile-CTA (Anrufen + Termin anfragen, 44px-Touch-Ziele, safe-area).
- [x] Vorschau-Schalter (Design-Leiste): Relaunch-Design 2026 · Muster A+C · Bisheriges Design — Default bleibt der Bestandslook.
- [ ] **Nach Freigabe:** Übertragung auf alle Seiten (Tokens sind seitenweit per Klasse aktivierbar), Startseiten-Feinschliff (ein Playfair-Italic-Wort im H1, Trust-Leiste unter Hero: Erlaubnis seit 2006 · PT seit 2001 · Bewertungen · BDHN), Geräteslider entschlacken.
- [ ] **Bilder — Regeln (Absprache-Pflicht):** Geräte (Trikombin, NLS-Scans, Slider-Geräte) bleiben **unverändert**; `ruhe.jpg` ersetzen (Kopfhörer-Stock); `hero-praxis.jpg` nicht als Identität; Unsplash-Freilizenzen für Raum/Wald/Gespräch sind vorbereitet (`public/images/free/`). Jede Ersetzung vorher mit Auftraggeber abstimmen und ALT-Texte führen („kein Hochzoll-Behauptung" außer `anfahrt.jpg`).

### Phase 4 — SEO/GEO-Ausbau (parallel zur Design-Freigabe)

Priorisiert nach 02-Kriterien:

1. **GBP (Google Business Profile) komplett:** Kategorie Heilpraktiker/in + sekundäre; alle Verfahren in Beschreibung; wöchentliche Posts; Q&A selbst bespielen; echte Fotos (dieselben wie Website); Bewertungen innerhalb 48h beantworten. Ziel: Map-Pack „Heilpraktiker Hochzoll" (aktuell #1 organisch) verteidigen, „Augsburg"-Sichtbarkeit ausbauen.
2. **Bewertungsroutine:** jeder 4.–5. zufriedene Patient persönlich um Google-Bewertung bitten (keine Anreize — Abmahnrisiko). ProvenExpert/Jameda-Profile pflegen. **Kein AggregateRating-Selbstmarkup erweitern** (Google „self-serving"-Regel; Portal-Badges ja, Sterne-Markup für eigene Reviews nein — bestehendes Markup bei Cutover rechtlich/inhaltlich prüfen).
3. **NAP-Konsistenz** überall identisch (Site, GBP, Jameda, ProvenExpert, Gelbe Seiten, 11880, mapquest-Listing bereinigen).
4. **Quartiers-Signale:** Hochzoll/Friedberg/Lechhausen in Titles/H1/Leads der Bezugsseiten (umgesetzt in Anliegen-Hubs); optional später 1 echte Stadtteil-Seite „Naturheilpraxis Hochzoll — Anfahrt/Parken/ÖPNV" (keine Doorway-Duplikate).
5. **GEO/Zitierfähigkeit:** jede Money-Page beginnt mit 40–60-Wörter-Definitionssatz (umgesetzt: „In einem Satz"-Panel); FAQ-Inhalte wörtlich auch in die GBP-Q&A übernehmen; konkrete, belegbare Fakten (Erlaubnisdaten, Erfahrungsjahre) nennen; quartalsweises KI-Monitoring („Welche Heilpraktiker empfiehlt ChatGPT/Gemini für Augsburg?") + GSC AI-Referrer beobachten. **Kein llms.txt** (Google nutzt es nachweislich nicht).
6. **E-E-A-T-Framing pro Verfahren:** standardisierter Einordnungs-Kasten (schulmedizinischer Status ehrlich, z. B. NAET „nicht anerkannt" — umgesetzt; auf alle Verfahrensseiten ausweiten), Quellenangaben wo vorhanden (Cochrane/PubMed für manuelle Therapie), Aktualisierungsdaten sichtbar.
7. **Technik:** CWV-Budget LCP < 2,5s / INP < 200ms mobil (Hero-Bild `fetchpriority=high`, WebP/AVIF — Renderer macht bereits .webp-Ersatz; Font-Subsetting geprüft), WCAG 2.2 AA (Kontraste nach Token-Tabelle gegeben; Fokus-Ringe, 44px-Ziele, reduced-motion umgesetzt), XML-Sitemap + robots konsistent halten (`src/lib/seo.ts` + `public/robots.txt`).

### Phase 5 — Cutover & Nachsorge

- [ ] Launch-Checkliste: 301-Map live, alle Hubs indexierbar, Schema validiert (Rich Results Test), GSC-Bestätigung, GBP-Website-Link, Uptime-Monitoring.
- [ ] 4 Wochen nach Cutover: GSC-Vergleich gegen Snapshot (Klicks/Impressionen je URL); Auffälligkeiten → Redirects/Content nachbessern.
- [ ] Google Ads erst danach (HWG-feste Leistungsseiten + Consent Mode vorausgesetzt).
- [ ] WordPress als Inhaltsquelle archivieren (Read-only); Lovable-App bleibt standalone verlinkt.

---

## 3. Akzeptanz „nahtlos" (Kriterium a)

Der Cutover gilt als nahtlos, wenn:

1. Jede URL der Live-Seite mit 200 (gleicher Pfad, gleiche/intendierte Inhalte) oder 301 (gemäß Map) antwortet — keine 404.
2. Title/H1/Lead der 18 Hubs inhaltlich äquivalent oder stärker (Anliegen+Ort) sind als die WP-Fassung.
3. Der WP-Textbestand je Seite vollständig im Neubau vorliegt (Archiv-Renderer oder Anliegen-Überarbeitung) — Stichprobe 100% der Hubs.
4. Schema (LocalBusiness/MedicalBusiness, NAP, Bewertungen-Links) vor und nach identisch oder vollständiger.
5. GSC zeigt binnen 4 Wochen keine Verschlechterung der Top-20-Keywords je Hub.

## 4. Governance

| Thema | Regel |
|---|---|
| Branches | `main` = freigegebener Stand; Feature-Branches (`breitenberger-hubs`, `relaunch-konzept`) + `rp-*`-Tags für Wiederherstellungspunkte |
| Design-Freigabe | Default-Look wechselt nur nach ausdrücklicher Freigabe (Leiste zeigt alle drei Varianten zur Auswahl) |
| Bilder | Ersetzungen nur in Absprache; **Geräte nie**; ALT-Texte vorher festlegen |
| WP-live | Keine strukturellen Eingriffe ohne Rückfrage (Plesk, Domain, Plugins) |
| Recht | HWG-Textprüfung vor jedem Livegang; „Psychotherapie"-Bezeichnung bleibt außen vor; Disclaimer/Byline auf jeder Money-Page |

## 5. Verweise

- Wettbewerbsanalyse: `01-wettbewerbsanalyse-augsburg.md`
- Google-Kriterien 2026 (E-E-A-T/GEO/Local/Technik): `02-google-kriterien-2026.md`
- Design-System Relaunch: `03-design-system-relaunch.md`
- Bestehende Akten: `docs/migration/` (URL-Inventar, Rank Math, Uploads), `docs/design-a-plus-c/` (Festlegungen), `docs/handover-2026-08-18*/`
