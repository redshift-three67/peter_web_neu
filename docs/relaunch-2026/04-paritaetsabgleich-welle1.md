# Paritätsabgleich Welle 1: Live-Seite vs. Neubau (Startseite + 17 Hub-Seiten)

Datum: 2026-08-21 · Snapshot: `content/wordpress/live-snapshot-2026-08-21/` (18 Dateien)
Datenquelle Neubau: `src/content/archive/catalog.json` (64 Seiten) · Renderer: `src/lib/hub-blocks.ts`, `src/components/site/HubFromArchive.tsx`, `src/components/site/AnliegenHub.tsx`, `src/routes/index.tsx`, `src/content/slides.ts`, `src/content/site.ts`, `src/content/anliegen.ts`

## Methode

- **Live-Parsing:** Inhaltsregion je Seite = erstes `<h1>` bis Footer-Builder (`<!-- Builder #builderwidget -->`); Header/Nav/Footer-Chrome ignoriert. FAQ-Sektion (`#eeat-faq`) separat extrahiert (liegt im Live-DOM hinter dem Footer-Builder, ist aber sichtbarer Seiteninhalt). Versteckte HFCM-Snippets (`display:none`, z. B. Corona-Hinweis) wurden identifiziert und nicht als sichtbaren Inhalt gewertet.
- **Katalog-Vergleich (GAP-A):** Live-H2/H3/Absätze fuzzy gegen `catalog.json`-Parts desselben Slugs gematcht; Bilder über Dateinamen-Basis.
- **Renderer-Simulation (GAP-B):** exakter Port von `editorialParts`/`blocksFromParts` inkl. `NAV_CHROME`, `SKIP_START`, FAQ-Abbruch, `/^mit der /`-Regel, Card/Topics-Kollaps, `classifyImage`; danach die Anzeige-Logik von HubFromArchive (Hero-Device-Filter, Galerie ≤ 6, Intro ≤ 3 Absätze, Scans-Unterdrückung) und AnliegenHub (Tiefe = nur h2/p/quote, Blöcke > 3) mit den echten `heading`-Props nachgerechnet.
- Zählweise „H2 live": echte Inhalts-Überschriften; der seitenübergreifende Subtitel „Naturheilkundlich begleiten – Stark im Leben" und der Adressblock-H2 sind Chrom und gekennzeichnet.

---

## 1. Ergebnistabelle je Seite

Legende: H2/H3/P = Anzahl; W = sichtbare Textwörter (inkl. Überschriften). „gerendert" = was der Neubau laut Renderer-Logik tatsächlich zeigt (plus kuratierte Neubau-Inhalte, separat vermerkt).

| Seite | H2 live/archiv | H2 gerendert | H3 live/gerendert als Struktur | P live (W) | gerendert (W) | FAQ live/neubau | Bilder live/gerendert | Gesamturteil |
|---|---|---|---|---|---|---|---|---|
| **Startseite** (`home`) | 2/3 | eigene Sektionen (HomeLegacy) | 22/– | 22 (342) | ~300 kuratiert | 6 / 5 `practiceFaqs` (JSON-LD ✓) | Slider 5/5 ✓ · 3 Inhaltsbilder → eigene Motive | ⚠️ Lücke: Verfahrens-Verzeichnis fehlt komplett |
| **schmerztherapie-augsburg** (Anliegen) | 3/4 | 2 (nur Chrome-H2) | 8 → 6 Cards, **alle verworfen** | 16 (513) | **26 Archiv-W** + ~450 kuratiert | 6 / 5 kuratiert (JSON-LD ✓) | 3 live → 0 im Archiv-Fluss (Hero-Fallback 1; Slider fehlt im Katalog) | ❌ wesentlicher Verlust (5 Live-Kapitel nur noch kuratiert) |
| **psychotherapie-augsburg** (Anliegen) | 3/4 | Tiefe **gar nicht gerendert** (≤3 Blöcke) | 5 → 2 Cards, verworfen | 16 (549) | **10 Archiv-W** + ~400 kuratiert | 6 / 5 kuratiert (JSON-LD ✓) | 5 live → 2 im Katalog, 0 im Fluss | ❌ wesentlicher Verlust (573-W-Hauptkapitel weg) |
| **naet-methode-allergie-behandlung** (Anliegen) | 2/3 | Tiefe **gar nicht gerendert** | 6 → 4 Cards, verworfen | 9 (1050) | **4 Archiv-W** + ~350 kuratiert | 6 / 5 kuratiert (JSON-LD ✓) | 3 live → 0 im Fluss (Hero 3 ✓) | ❌ wesentlicher Verlust (723-W-Kapitel „Allergen-Kategorien" weg) |
| **bioresonanz-therapie** | 2/3 | 1 (Karten-Titel) | 3 → 1 Card + 1 Related | 9 (192) | 189 | 6 / 5 `practiceFaqs`, **kein FAQ-JSON-LD** | 4 live / 2 Katalog → Hero 1, Galerie 0; Slider live 4, Katalog 0 (GAP-A) | ⚠️ Lücke (Slider + 2 Bilder, FAQ-JSON-LD) |
| **diagnostik-informationstherapie** | 2/3 | 1 | 16 → 1 Card: **13 von 15 H3-Titeln fallen weg** | 4 (56) + H3-Texte | 107 | 6 / 5, kein FAQ-JSON-LD | 15 live (12 davon SVG-Icons) / 8 Katalog → Hero 1 + Galerie 6 | ❌ Verlust der 13 Verfahrens-Links/Überschriften |
| **downloadbereich-naturheilpraxis-rauch** | 2/3 | 1 | 1/– | 17 (370) | 772 (Katalog enthält HFCM-Text) | 6 / 5, kein FAQ-JSON-LD | 3 live / 8 Katalog → Galerie 6; Slider 4 → Hero 1 | ⚠️ Slider auf 1 Motiv reduziert |
| **hypnotherapie-augsburg** | 2/3 | 1 | 3 → 1 Card | 11 (286) | 301 | 6 / 5, kein FAQ-JSON-LD | 3 live / 7 Katalog → Galerie 6; Slider 3 → Hero 1 | ⚠️ Slider auf 1 Motiv reduziert |
| **klassische-homoeopathie** | 2/3 | 1 | 4 → 2 Cards | 3 (99) | 112 | 6 / 5, kein FAQ-JSON-LD | 3 live / 8 Katalog → Galerie 6; Slider 4 → Hero 1 | ⚠️ Slider auf 1 Motiv reduziert |
| **manuelle-therapieverfahren-uebersicht** | 2/3 | 1 | 7 → 4 Cards + Topics | 20 (480) | 518 | 6 / 5, kein FAQ-JSON-LD | 3 live / 3 Katalog → Galerie 2; Slider live 3, Katalog 0 (GAP-A) | ⚠️ Slider fehlt im Katalog |
| **naturheilkunde** | 2/3 | 1 | 14 → 4 Cards + 1 Topics(4) | 18 (420) | 451 | 6 / 5, kein FAQ-JSON-LD | 3 live / 8 Katalog → Galerie 6; Slider 4 → Hero 1 | ⚠️ H3-Kapitel werden zu Chips (Heading-Struktur weg) |
| **nls-diagnostik** | 2/3 | **0** (H2 „mit der NLS-Diagnostik" wird gedroppt) | 6 → 2 Cards | 17 (316) | 307 | 6 / 5, kein FAQ-JSON-LD | 4 Scan-Bilder ✓ (Scans-Block); Slider 4/4 ✓ | ⚠️ H2-Verlust durch Filter |
| **osteopathie-techniken** | 2/3 | 1 | 6 → 1 Card | 12 (544) | 619 | 6 / 5, kein FAQ-JSON-LD | 3 live / 6 Katalog → Galerie 5; Slider 3 → Hero 1 | ⚠️ Slider auf 1 Motiv reduziert |
| **online-anamnesebogen** | 0/1 | 0 | –/– | 7 (80) | 97 + eigener AnamneseWizard | 6 / 5, kein FAQ-JSON-LD | Slider 4/4 ✓ | ✅ paritätisch (funktional besser als Live-iFrame) |
| **impressum** | 2/3 | eigene Route | –/– | 12 (450) | ~200 kondensiert aus `practice` | 6 / – | 3 live → eigene Route ohne Galerie | ⚠️ bewusst kondensiert, Pflichtangaben vollständig |
| **datenschutzerklaerung** | 2/3 | eigene Route | –/– | 7 (1490) | ~250 stark gekürzt | 6 / – | 3 live → ohne | ⚠️ starke Kürzung (ca. −83 %) |
| **rechtshinweise-therapieverfahren** | 2/3 | eigene Route | –/– | 12 (427) | ~300 kuratiert (IconCards) | 6 / – | 3 live → ohne | ⚠️ kuratiert, Live-Verfahrensliste gekürzt |
| **kontakt** | 2/3 | eigene Route | –/– | 0 (11) | ContactForm + Praxisdaten | 6 / – | – | ✅ paritätisch |

**Text-Parität GAP-A (Katalog vs. Live):** strukturvollständig. Alle Live-H2/H3 und (nach Entity-Normalisierung) praktisch alle Live-Absätze sind im Katalog enthalten. Einzige Text-Lücke: Home-H3 „Jetzt Termin buchen" (JS-gesteuerter Button, funktional im Neubau via CtaBand/Buttons vorhanden). **Der Katalog enthält umgekehrt mehr als die Live-Seite zeigt** (Nav-Cluster, Footer-Adressblock, versteckte HFCM-Texte wie „Vor dem Termin…" / „Corona-Hinweis", FAQ-Lead) — das ist Renderer-Chrome, kein Verlust.

**GAP-A wirklich betroffen: Slider und Bilder**
- **Slider im Katalog fehlend, obwohl live vorhanden (3–4 Motive):** `bioresonanz-therapie`, `schmerztherapie-augsburg`, `psychotherapie-augsburg`, `manuelle-therapieverfahren-uebersicht`, `rechtshinweise-therapieverfahren`.
- **Bilder live ohne Katalog-Pendant (Basisname):** bioresonanz (Trikombin-Logo, Akupunktur-ohne-Nadeln-Motiv), psychotherapie („Bilder-Psyche-Frau-2", 2 SVG-Icons, Praxis-Motiv), schmerztherapie (1 Doppel-Motiv), osteopathie (1 Motiv nur im Slider), manuelle-übersicht (2 Motive), diagnostik (12 dekorative SVG-Icons — irrelevant).

---

## 2. Konkrete fehlende Inhalte (Wortlaut-Kurzform)

### Startseite (❌ Verfahrens-Verzeichnis + Schluss-Texte)
- **Therapieverfahren-Verzeichnis fehlt komplett:** Live-H3-Kacheln „Biophysikalische Informationstherapie", „Bioresonanztherapie nach Baklayan", „Elektroakupunktur nach Doktor Voll", „Bioresonanztherapie vs Elektroakupunktur", „NLS Diagnostik", „Vitalfeldtherapie", „150 MHz Körperliche Befeldung nach Broers", „Frequenz-Akupunkt oder HEAL-Therapie nach Baklayan", „Osteopathie Techniken", „Manuelle Therapieverfahren", „Vitamin- und Nährstoffberatung", „Kinesiologie Behandlung", „Klassische | Komplexe Homöpathie", „Schmerztherapie", „Allergie Behandlung", „Orthomolekulare Therapie" + „Weitere mögliche Therapieverfahren meiner Naturheilpraxis sind:" — je mit 1 Beschreibungsabsatz (P8–P16, z. B. „Die NLS-Diagnostik ist ein ergänzendes Hinweisverfahren. Sie ersetzt keine ärztliche Diagnose.", „Entspannen Sie sich mit Frequenz Akupunktur – Wie die HP Baklayan Heal Therapie Ihnen helfen kann."). **Das ist das internale Linknetz der Startseite.**
- Live-H2-Zitat „… das ist der zentrale Fokus der therapeutischen Arbeit in meiner Praxis." fehlt (Ersatz: Schopenhauer-Zitat).
- Willkommens-Textwand gekürzt: „Herzlich willkommen in meiner Naturheilpraxis … 20 Jahren Berufserfahrung und Hypnotherapeut …" → als „Person, nicht Gerät"-Sektion vorhanden, aber umformuliert.
- Schlussabsätze fehlen: P17 „Auf meiner Webseite können Sie mich und meine Therapieverfahren gerne … Verbesserungsvorschläge sind herzlich willkommen", P19 „Gerne stehe ich Ihnen auch für alle Ihre Fragen zur Verfügung", P20 „Ich freue mich auf Ihren Besuch", P21 „Ihr Peter Rauch", P22 „Viel Freude, gute Erkenntnisse und eine gute Gesundheit wünscht Ihnen …".
- Öffnungszeiten: Live eigener Block inkl. „Mittagsruhe 12:30–13:00"; Neubau nur Deko-Zeile im Header bzw. Kontakt-Seite, kein Block auf Home/Footer.

### schmerztherapie-augsburg (❌ — Archiv-Kapitel nur noch kuratiert)
Live-Kapitel, deren Originaltext im Neubau **nicht** erscheint (in Cards gepackt und vom Tiefen-Filter verworfen; thematisch teils von `anliegen.ts` abgedeckt):
- „Schmerztherapie Augsburg / Sanft heilen" (110 W)
- „Schmerztherapie mittels Injektion:" (53 W — „In der ärztlichen Schmerztherapie werden unter anderem Schmerzmittel oder Cortison ins Gewebe gegeben. Heilpraktikern ist der Einsatz von Betäubungsmitteln untersagt.")
- „Kinesiologie und Schmerztherapie:" (103 W)
- „Meditation und Schmerztherapie:" (67 W)
- „Psychologische Beratung und Schmerztherapie:" (165 W)
Gerenderte Archiv-Tiefe: nur „Schmerztherapie" (H2) + Einleitungsabsatz (21 W) + Adress-H2 + „Naturheilkunde" (1 W).

### psychotherapie-augsburg (❌)
- Hauptkapitel „Psychotherapie Augsburg / Burnout Therapie Augsburg" mit **15 Absätzen (573 W)** vollständig verworfen; „Hintergrund"-Sektion erscheint wegen ≤3 Tiefen-Blöcken **gar nicht**.

### naet-methode-allergie-behandlung (❌)
- „Worum geht es bei dieser Allergie Behandlung? / NAET Methode" (68 W), „Die Geschichte der NAET Methode:" (91 W), „Grundlagen:" (169 W) und vor allem **„Einteilung der möglichen Allergenen in Hauptkategorien:" (723 W — die komplette Allergen-Liste: „Eingenommene Allergene wie Nahrungsmittel, Medikamente …", „Inhalierte Allergen wie Pollen, Umwelt schadstoffe, Parfüm …")** verworfen; Tiefe erscheint nicht.

### diagnostik-informationstherapie (❌ bei den Links)
- 13 von 15 H3-Titeln fallen beim Card-Kollaps: „Hinweisdiagnostik – Irisdiagnose", „Hinweisdiagnostik – Zahndiagnose", „Hinweisdiagnostik – Verträglichkeitsprüfung von Materialien", „Speichel – Diagnostik", „Labor – Blut und Analyse", „Stuhl – Diagnostik", „Urin – Diagnostik" usw. — live sind das **Links auf Unterseiten**, im Neubau weg (Nav deckt nur 4 Diagnostik-Links).

### nls-diagnostik (⚠️)
- H2 „mit der NLS-Diagnostik" wird von der Skip-Regel `/^mit der /i` entfernt → die Seite hat im Archiv-Rendering **keine einzige H2**; Gliederung fehlt.

### bioresonanz-therapie (⚠️)
- Live-Hero-Slider (4 Motive) fehlt im Katalog → Hero = 1 statisches Ersatzbild; Inhaltsbilder „Trikombin Logo" (als `skip` klassifiziert) und „Akupunktur ohne Nadeln" nicht im Katalog.

---

## 3. Anhang: Live-FAQs „Häufige Fragen zur Praxis" (komplett, Frage/Antwort-Paar-Wortlaut)

**Befund:** Auf allen 18 Live-Seiten pixel-identisch (6 Q&A), plus `FAQPage`-JSON-LD auf jeder Seite. Die dt/dd-Paare sind **nicht** im catalog.json enthalten (der Crawl erfasste nur H2 + Lead); der Renderer bricht bei „Häufige Fragen" ab. Neubau: `practiceFaqs` (5 Q&A, umgeschrieben) auf Home + 10 HubFromArchive-Seiten; kuratierte `faqs` (5) auf den 3 Anliegen-Hubs. **Fehlend als eigene Fragen:** Nr. 3 (Anamnesebogen) und Nr. 4 (Notfall — nur noch in Antwort 1 von `practiceFaqs` versteckt). **Neu im Neubau:** „Geben Sie Heilversprechen?".

1. **Ersetzt die Naturheilpraxis einen Arztbesuch?**
   Nein. Die Naturheilpraxis Rauch arbeitet ergänzend. Die dargestellten Verfahren ersetzen keine ärztliche Diagnose, Beratung oder Behandlung.
2. **Wie vereinbare ich einen Termin?**
   Telefonisch unter 0821 2621462 oder über die Seite Kontakt. Unter „Jetzt Termin buchen" ist die Online-Terminabfrage verlinkt. Sprechzeiten: montags bis freitags 10–12:30 und 13–19 Uhr, nach Vereinbarung.
3. **Wozu dient der Online-Anamnesebogen?**
   Zur Patientenaufnahme vor dem Termin bei Heilpraktiker Peter Rauch. Der Bogen stellt keine Diagnose und gibt kein Behandlungsergebnis. Erklärung und Zugang: Online-Anamnesebogen.
4. **Was tun im Notfall?**
   Diese Website ist kein Notfallweg. Bei lebensbedrohlichen Beschwerden wählen Sie 112. Bei dringenden medizinischen Fragen außerhalb der Sprechzeit den kassenärztlichen Bereitschaftsdienst 116 117 oder eine Arztpraxis.
5. **Wie sind die Kosten?**
   Die Behandlung ist eine Privatleistung. Ob Ihre Krankenkasse oder Versicherung etwas erstattet, hängt von Ihrem Vertrag ab. Konkrete Beträge nennen wir im Gespräch, nicht auf der Website.
6. **Wo liegt die Praxis?**
   In Augsburg-Hochzoll, Friedrich-Deffner-Straße 19a, 86163 Augsburg. Von Friedberg und Lechhausen-Ost ist die Praxis gut zu erreichen.

---

## 4. Renderer-Filter, die Live-Inhalt verwerfen (GAP-B, mit Beispiel)

| # | Filter (Ort) | Verwirft | Beispiel |
|---|---|---|---|
| 1 | **AnliegenHub-Tiefenfilter** `blocks.filter(b => b.type === "h2" \|\| "p" \|\| "quote")` (AnliegenHub.tsx) | **allen Card-Inhalt** — da `blocksFromParts` jede H3-Sektion zu einer Card baut, überlebt fast kein Archivtext | psychotherapie: Card „Psychotherapie Augsburg" mit 15 Absätzen (573 W) → Tiefe = 10 W; naet: „Einteilung der möglichen Allergene" (723 W) → weg |
| 2 | **`depth.length > 3`-Gate** (AnliegenHub.tsx) | ganze „Hintergrund"-Sektion, wenn ≤ 3 Blöcke | psychotherapie (2 Blöcke) und naet (1 Block): Sektion erscheint gar nicht |
| 3 | **FAQ-Abbruch** `if (part.tag === "h2" && /Häufige Fragen/.test(text)) break;` (hub-blocks.ts) | alle Live-FAQs (6 Q&A je Seite, identisch) | ersetzt durch `practiceFaqs` (5) bzw. kuratierte `faqs` — 2 Live-Fragen fehlen; **HubFromArchive-Seiten haben kein `FaqJsonLd`**, obwohl live FAQPage-JSON-LD auf jeder Seite stand |
| 4 | **H2-Skip `/^mit der /i`** (hub-blocks.ts) | echte Inhalts-H2 | nls-diagnostik: „mit der NLS-Diagnostik" → Seite ohne H2 |
| 5 | **Card-Kollaps** `titles[2..]` werden nie gerendert (blocksFromParts) | H3-Überschriften + deren Links | diagnostik: 15 H3-Titel → Card zeigt 2, **13 fallen weg** |
| 6 | **Topics-Kollaps** (≥4 H3 + ≤3 P → Chip-Grid ohne H3-Semantik) | Heading-Struktur (Text bleibt) | naturheilkunde: 14 H3-Kapitel → Chips/Karten ohne H3 |
| 7 | **Hero-Device-Filter** `slider.filter(classifyImage === "device")` (HubFromArchive.tsx) | Live-Slider-Motive + Overlay-Titel/CTA | klassische-homoeopathie: 4 Live-Motive („Phytotherapie – Sanfte Therapie mit Pflanzen" …) → 1 statisches Trikombin-Bild |
| 8 | **Galerie-Limit & Scans-Unterdrückung** `[...scans, ...photos, ...atmosphere].slice(0,6)`; `!usedScan &&` (HubFromArchive.tsx) | Bilder über 6, ganze Galerie bei Scans-Block; **Position im Textfluss** geht immer verloren (Galerie steht am Seitenende) | nls: nur 4 Scan-Bilder, keine Galerie; bioresonanz: Galerie 0 |
| 9 | **`classifyImage` "skip"** (Logo/Verband/Peter-Rauch) | Praxis-/Gerätelogos als Inhalt | bioresonanz: „Trikombin Logo Final" |
| 10 | **Intro-Kappung** `intro.slice(0, 3)` (HubFromArchive.tsx) | 4.+ Absatz vor der ersten Karte | betrifft aktuell kaum Seiten (Intro meist ≤1 P) |
| 11 | **NAV_CHROME / SKIP_START** (hub-blocks.ts, hubs.ts) | Subtitel-H2, Adressblock, E-Mail, Mittagsruhe, „Zurück zur Startseite", versteckte HFCM-Texte | korrekt/Chrome — kein Inhaltsverlust |
| 12 | **AnliegenHub zeigt keine `images[]`** | alle Archiv-Inhaltsbilder der 3 Anliegen-Seiten | schmerztherapie: 3 Live-Bilder → 0 |

**GAP-A (Katalog-Lücken, kein Renderer):** Slider fehlen komplett für bioresonanz-therapie, schmerztherapie-augsburg, psychotherapie-augsburg, manuelle-therapieverfahren-uebersicht (rechtshinweise hat eigene Route); vereinzelte Inhaltsbilder fehlen (psychotherapie „Bilder-Psyche-Frau-2", bioresonanz „Akupunktur ohne Nadeln", osteopathie/manuelle-übersicht je 1–2 Motive).

---

## 5. Empfehlungen für Welle 1 (priorisiert)

1. **P0 — AnliegenHub-Tiefe reparieren:** im Tiefen-Filter zusätzlich `card`/`list`/`topics`/`related` zulassen (Cards als Abschnitt mit Titel + Absätze rendern) **oder** für Anliegen-Seiten `blocksFromParts` ohne Card-Bündelung fahren. Sonst verlieren die 3 stärksten Money-Pages 88–99 % ihres Live-Textes (inkl. 723-W-NAET-Allergenliste). Schnellster Fix: `depth = blocks` (alles außer `warning`) und Cards in der Sektion als `<h3>`+Prose rendern.
2. **P0 — FAQ-Parität:** `practiceFaqs` um die zwei fehlenden Live-Fragen ergänzen („Wozu dient der Online-Anamnesebogen?", „Was tun im Notfall?" als eigene Q) und `FaqJsonLd` auch in `HubFromArchive` einbauen — live hatte jede der 18 Seiten FAQPage-JSON-LD (Rich-Result-Verlust auf 10 Seiten).
3. **P1 — Startseiten-Verfahrens-Verzeichnis nachziehen:** Sektion mit den ~18 Live-Kacheln + Kurzbeschreibungen (P8–P16 aus dem Archiv) als Link-Grid; bewahrt das interne Linkprofil und die Longtail-Beschreibungen.
4. **P1 — `/^mit der /`-Regel entfernen** (nls-H2 „mit der NLS-Diagnostik") oder auf exakten Chrome-String präzisieren.
5. **P1 — Card-Titel-Kollaps beheben:** `titles[2..]` als Link-/Topic-Liste unter der Card rendern (diagnostik-informationstherapie: 13 Unterseiten-Links wiederherstellen).
6. **P2 — Hero-Slider:** Device-Filter lockern (alle Archiv-Slider-Motive zeigen, wie es AnliegenHub bereits tut); für die 4 Hub-Seiten ohne Katalog-Slider (bioresonanz, schmerztherapie, psychotherapie, manuelle-übersicht) Slider nachtragen (GAP-A).
7. **P2 — Bild-Parität:** Galerie-Limit 6 → 9; Galerie nicht bei Scans-Block unterdrücken; AnliegenHub zumindest 3–6 Archivbilder zeigen; fehlende Katalog-Bilder (psychotherapie/bioresonanz/osteo/manuelle) nachcrawlen.
8. **P3 — Datenschutz/Impressum/Rechtshinweise:** Kürzungen sind bewusst und juristisch ok; Datenschutz −83 % dokumentieren und ggf. Volltext als einklappbaren Abschnitt hinterlegen.
9. **P3 — Intro-Kappung** `intro.slice(0,3)` entfernen (aktuell fast wirkungslos, aber zukünftssicher).

---

*Analyse-Skript (Einmal-Ausführung, nicht eingecheckt): Live-Parser + exakter Renderer-Port; Zahlen aus `parity.json` vom 2026-08-21.*
