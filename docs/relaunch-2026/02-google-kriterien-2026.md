# Google-Kriterien 2026 — E-E-A-T, GEO, Local, Technik (Tiefenrecherche August 2026)

*Recherche-Agentenlauf 21.08.2026. Umstrittene Punkte sind als solche markiert.*

## 1. E-E-A-T & YMYL für Komplementärmedizin

**Befund:** Die Quality Rater Guidelines (zuletzt Sept. 2025) definieren YMYL schadensbasiert; Trust ist das zentrale Kriterium. Für Gesundheitsinfos gilt: Hoch bewertete Seiten müssen den „well-established scientific/medical consensus" repräsentieren; Widerspruch gegen Konsens ist ein explizites Low-Quality-Signal, raterschädlich wird es, wenn Inhalte Menschen von notwendiger Behandlung abhalten könnten. Wichtig: Die QRG unterscheiden **harmlos vs. schädlich** — risikoarme komplementärmedizinische Infos sind nicht „harmful", werden aber ohne E-E-A-T-Signale abgewertet. Disclaimers allein reichen nicht; zu viele Off-Consensus-Seiten können siteweite Wirkung haben. Helpful-Content ist seit März 2024 kein separates System mehr, sondern in die Core-Rankings integriert; Site-Reputation-Abuse wird seit Jan. 2025 verschärft durchgesetzt.

**Empfehlungen:**
1. **Ehrlichkeits-Framing pro Verfahrensseite** (standardisierter Einordnungs-Block: schulmedizinischer Status + „ersetzt keinen Arztbesuch") — HWG-konform UND E-E-A-T-stärkend. *(In Anliegen-Hubs umgesetzt; auf alle Verfahrensseiten ausweiten.)*
2. Qualifikationsnachweise sichtbar (Erlaubnis mit Datum, Ausbildungen, Verbände) + Kurzversion im Footer.
3. Bylines + `datePublished`/`dateModified` sichtbar und als Schema; quartalsweises Review.
4. Keine Erfahrungsberichte mit Wirkungsbezug (§ 3/§ 11 HWG — abmahnfähig); nur neutrale Prozess-Bewertungen.
5. Quellenhygiene: Studien verlinken, wo sie existieren (manuelle Therapie); wo nicht (Bioresonanz): „Hinweisdiagnostik" sauber definieren statt Wirksamkeit zu implizieren.
6. Trust-Seiten komplett (Impressum, Datenschutz, Kosten, Beschwerdeweg).

## 2. GEO / Generative Engine Optimization

**Befund:** AI Overviews in DE seit 26.03.2025 live, AI Mode seit 07.10.2025. Bis zu 265 Mio. verlorene Klicks in DE geschätzt, Position-1-CTR −59 % (*Branchenschätzung, unsicher*). Lokale Queries: 57–80 % AI-Overview-Prävalenz (Studie Whitespark). KDD-2024-Studie (Princeton/IIT): Statistiken, Zitate, Belegstellen steigern Zitierfähigkeit um bis zu 40 %; Keyword-Stuffing wirkt nicht. FAQ-Rich-Results wurden 2023 auf Behörden-/Gesundheitsseiten beschränkt und Berichten zufolge 2025/26 ganz eingestellt (*unsicher*), aber FAQPage-Schema bleibt für maschinelles Verstehen nützlich. `llms.txt` wird von Google explizit nicht verwendet (97 % nie abgerufen) — **nicht bauen**.

**Empfehlungen:**
1. **Antwort-First-Struktur:** 40–60-Wörter-Definitionssatz nach der H1, dann Frage-H2s. *(In Anliegen-Hubs als „In einem Satz"-Panel umgesetzt.)*
2. LocalBusiness-/MedicalBusiness-Schema vollständig (name, address, geo, hours, telephone, priceRange, `sameAs` zu GBP/Jameda/ProvenExpert/Verbänden).
3. FAQ-Sektionen mit FAQPage-Markup; Inhalte wörtlich in die GBP-Q&A übernehmen.
4. Digitale Entität aufbauen: konsistente Präsentation auf GBP, Jameda, ProvenExpert, Verband, Verzeichnisse.
5. Konkrete, belegbare Fakten einbauen (Erlaubnisdaten, Behandlungsjahre, Lage) — werden bevorzugt zitiert. Quartalsweises KI-Monitoring + GSC-AI-Referrer beobachten.
6. Kein GEO-Spam, keine KI-generierten Massenseiten.

## 3. Local SEO 2026

**Befund:** GBP bleibt der stärkste lokale Kanal; Bewertungssignale ~20 % der Local-Rankingfaktoren (*Schätzung*). Offizielle Faktoren: Relevanz, Distanz, Prominenz. AggregateRating für LocalBusiness/Organization ist seit 2019 „self-serving" ausgeschlossen — ProvenExpert-Sterne-Widgets auf der eigenen Site verstoßen dagegen bzw. werden ignoriert (*Grey Area; Risiko gering, Wirkung null*).

**Empfehlungen:**
1. **GBP komplett:** Kategorie(n), Verfahren in Beschreibung, Sprechzeiten, Leistungen, Parken; wöchentliche Posts; Q&A selbst bespielen (5–8 Fragen); echte Fotos.
2. **Bewertungsroutine:** jeder 4.–5. zufriedene Patient persönlich um Google-Bewertung bitten (keine Anreize — Abmahnrisiko); alle Bewertungen binnen 48 h beantworten; QR-Karte am Empfang.
3. Portale als Trust-Layer pflegen (Jameda, ProvenExpert) — Sterne wirken im Portal, nicht als Rich Snippet der eigenen Site.
4. **NAP-Konsistenz** exakt identisch überall (inkl. mapquest-Listing bereinigen).
5. Stadtteil-Landingpages maßvoll: max. 3–5 echte Seiten, keine Doorway-Duplikate; Verfahrens-Landingpages haben besseres Kosten-Nutzen-Verhältnis.
6. GBP-Insights monatlich als KPI (Anrufe, Routen, Website-Klicks).

## 4. Technik, Mobile, Accessibility, Conversion

**Befund:** CWV 2026: LCP ≤ 2,5 s, **INP ≤ 200 ms**, CLS ≤ 0,1 (75. Perzentil mobil). BFSG seit 28.06.2025 verbindlich — Gesundheitsdienstleistungen sind **nicht** im Katalog betroffener Dienste, Kleinstunternehmen (< 10 MA) für Dienste ausgenommen; betroffen v. a. Shops (*rechtlich umstritten — anwaltlich gegenchecken*). WCAG 2.2 AA bleibt der sinnvolle Baumaßstab (Zielgruppe 50+). Benchmarks: Healthcare-CVR Ø ~3,2 %, Top-Performer ~11–21 %; 64 % der Deutschen buchen Arzttermine online (Bitkom).

**Empfehlungen:**
1. Mobile-First-Leistungsbudget: Hero AVIF/WebP + `fetchpriority="high"`, Font-Subsetting + swap, < 200 KB JS auf Landingpages, Third-Party-Widgets reduzieren.
2. WCAG 2.2 AA: Kontrast ≥ 4,5:1, sichtbare Fokusringe, Touch-Ziele ≥ 44 px, Formular-Labels, Tastaturbedienung, Alt-Texte, `prefers-reduced-motion`, 16–18 px Grundschrift. *(18px + 44px-CTA + reduced-motion im Relaunch-Skin umgesetzt.)*
3. Conversion-Grundgerüst: Sticky Mobile-CTA „Anrufen" + „Termin anfragen" *(umgesetzt)*; Anfrage-Formular max. 4–5 Felder; Buchungsanbieter nur DSGVO-konform (AV-Vertrag, EU-Hosting, kein Tracking vor Consent).
4. Messung: tel:-Klicks + Formular-Submissions als Ziele; Ziel 3–5 % Anfrage-Quote auf Local-Landingpages.
5. Technik-Hygiene: einzigartige Titles/Metas, XML-Sitemap, **301-Redirect-Map beim Relaunch (kritisch!)**, GSC + Bing.

## 5. Design-/Trust-Patterns

- Echte Fotos schneiden in A/B-Tests ~35 % besser ab als Stock (*einzelner Test, Richtung plausibel*): echtes Personen-/Praxisfotos auf Start/Über/Kontakt, dieselben im GBP.
- Trust-Leiste unter Hero (Erlaubnis, Jahre, Score als Portal-Badge, Verbände).
- Transparente Kosten — selten im Markt, starker Hebel.
- Ruhige visuelle Sprache: max. zwei Farbtöne (gedämpftes Grün/Teal + warmes Off-White), Navy/Dunkelgrau-Text, viel Weißraum, keine animierten Slider/Autoplay, Serifen für Überschriften + gut lesbare Sans 16–18 px. *(Entspricht exakt der Festlegung A+C / theme-neu.)*
- Furchtabbau: klare Erstgesprächs-Beschreibung (Dauer, Ablauf, Kosten) — wichtig bei Hypnotherapie/Bioresonanz.

## Gesamt-Roadmap (aus dieser Recherche)

- **P0 (vor Launch):** HWG-Textprüfung, 301-Map, LocalBusiness-Schema, Trust-Seiten, Bylines/Qualifikationen.
- **P1 (Launch +4 Wochen):** GBP komplett, Foto-Shooting, Sticky-CTA + Formular, CWV-Budget, WCAG-Basics.
- **P2 (3–6 Monate):** Bewertungs-Routine, Verfahrens-Landingpages mit Ehrlichkeits-Framing + FAQ, Portale, KI-Zitierungs-Monitoring.

## Quellen

services.google.com (HSW Search Quality Rater Guidelines PDF) · developers.google.com/search (site reputation abuse, local business, review snippets, CWV, FAQ-Änderungen 2023) · blog.google (März-2024-Update) · mariehaynes.com (scientific consensus) · searchengineland.com (QRG 2022) · paracelsus.de (HWG Werbung mit Krankengeschichten) · heilpraktikerverband.de (Bewertungslinks) · evergreen.media + smartlemon.de (AI Overviews/AI Mode DE) · whitespark.ca (lokale AIO-Prävalenz) · arxiv.org/html/2311.09735v3 (GEO-Studie KDD 2024) · seroundtable.com + ahrefs.com (llms.txt) · support.google.com/business (Rankingfaktoren) · smartratings.ai (Jameda) · web.dev (CWV-Schwellen) · bundesfachstelle-barrierefreiheit.de (BFSG-FAQ) · ecovis-kso.com (BFSG für Praxen) · ruleranalytics.com + bitkom.org (Healthcare-Conversion) · go.photoshelter.com (echte Fotos) · foduu.com + progress.com (Medical Design/color psychology)
