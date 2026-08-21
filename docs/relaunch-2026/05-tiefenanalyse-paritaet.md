# Tiefenanalyse Inhalts-Parität — Warum Umsetzungen zunächst nicht sichtbar waren (21.08.2026, Abend)

**Anlass:** Auftraggeber meldete nach Welle 1: „Inhaltsangleichungen nicht sichtbar, Petrolanpassungen fehlen." This Dokument ist die vollständige Ursachen-Analyse mit harten Messwerten, erstellt mit dem neu gebauten Prüfinstrument `scripts/parity-audit.mjs` (Live-Snapshot vs. SSR-Render, elementgenau).

---

## 1. Warum der Auftraggeber „nichts sah" — drei Wahrnehmungs-/Tech-Ursachen

| # | Ursache | Status |
|---|---|---|
| 1 | **Default-Look fiel ohne `?look=neu` auf das alte Design zurück.** Die Design-Leiste schrieb zwar `localStorage`, aber `resolveLook()` las ihn nie (toter Code) — ohne URL-Parameter also immer Bestandslook. Der geöffnete Tab stand auf `/` ohne Parameter. | **Behoben** (`rp-29`, `1979381`): URL-Parameter > gespeicherte Auswahl > **Default `neu`**. SSR rendert theme-neu konsistent (verifiziert). |
| 2 | **Browser-Cache nach Dev-Server-Neustart**: Der Server wurde beim Build-OMB-Workaround neu gestartet; ein einfacher F5 kann alte Module zeigen. | Strg+F5 einmalig; seither HMR stabil. |
| 3 | **Petrol ist — wie freigegeben — NUR auf Diagnose-Seiten sparsam.** Messung NLS: `--color-sage: #3a5258` aktiv (`theme-neu theme-neu-diag` im DOM). Auf Start/Gesprächsseiten gibt es bewusst kein Petrol (Festlegung: sage-Akzent). Wer Petrol prüfen will: `/nls-diagnostik` (Akzente, Links, Icons) — NICHT die Startseite. | Kein Fehler; Verhalten gemäß Freigabe „sparsam wie NLS". |

## 2. Messmethodik (erneuerbar)

`scripts/parity-audit.mjs`: extrahiert h1/h2/h3/p/li aus dem Live-Snapshot (18 Seiten), normalisiert (Entities, Whitespace, Interpunktion), filtert dokumentiertes Chrome (Footer, Signaturen, Sidebar-Muster der Live-Seite, SKIP-Regeln wie im Renderer), und prüft Zeichenfolge-Präsenz im SSR-HTML des Neubaus (`?look=neu`). **Lerneffekt dieser Analyse:** naïve Vergleiche (auch der Agentenlauf) erzeugen massenhafte Scheinlücken durch (a) HTML-Entities, (b) Join-Darstellungen („A · B · C"), (c) das site-wide Mega-Menü der Live-Seite (37 der 39 „fehlenden" Elemente auf der Schmerz-Seite!).

## 3. Echte Befunde nach Chrome-Bereinigung

### 3.1 Scheinprobleme (kein Inhaltsverlust)

- **Mega-Menü der Live-Seite** (li: „+Osteopathie Allgemein", „Schmerz – Entstehung von Schmerz", „Diagnostik – Stuhluntersuchung" …) erscheint auf jeder Live-Seite und dominiert die Roh-Zahlen. Im Neubau existiert diese Navigation als Header-/Footer-Links — **aber mit anderen Labels**. Das interne **Linkprofil** ist damit schwächer als live → Empfehlung Welle 2: Header-Mega-Menü auf die echten Unterseiten-URLs erweitern (alle Ziel-URLs existieren im Neubau bereits als `$slug`-Routen!).
- H1-Wortlaute („Klassische Homöopathie **nach Dr. Samuel Hahnemann**") — im Neubau verkürzt; SEO-neutral bis leicht positiv, kann je Hub angeglichen werden.
- Bewusst gefilterte Sätze (Anamnese-Hinweis → als CTA-Band vorhanden; Corona-Historientext).

### 3.2 Echte Lücken (nach Priorität)

| Lücke | Umfang | Bewertung |
|---|---|---|
| **NLS-Seite: Archiv-Body fehlt** | NlsNeko (Custom-Komponente) rendert NICHT den Archivtext — Live-H2 „mit der NLS-Diagnostik" + H3-Kapitel („Anwendungsmöglichkeiten", „NLS Diagnose Körper/Darm" …) fehlen | **Einzige echte Content-Lücke auf einer Money-Page.** Fix: NlsNeko um Archiv-Tiefe erweitern (wie AnliegenHub) — Welle 2, P0 |
| **Kontakt-Seite: Live-Texte fehlen** | Neubau ist Formular-Neubau; Live-Texte („Naturheilkundliche Praxis in der Friedrich-Deffner-Straße…", Leistungsliste, Termin-Texte) nicht übernommen | Echte Lücke — Fix: Live-Texte in Kontakt-Layout einbauen (Welle 2) |
| **Rechtsseiten kondensiert** | Datenschutz 95 %, Rechtshinweise 94 %, Impressum 91 % (Rohmaß inkl. Rest-Chrome) | **Bewusst** (juristische Neufassung). Entscheidung dokumentiert; optional Volltext-Abschnitt einklappbar |
| **Startseite: Intro umformuliert** | Live-Willkommens-Textwände sind sprachlich überarbeitet („Über die Praxis"/„Person, nicht Gerät") — Inhalte vorhanden, Wortlaut nicht 1:1 | Bewusste redaktionelle Entscheidung der früheren Wellen; bei Bedarf Original-Absätze zusätzlich |

### 3.3 In dieser Analyse behobene echte Fehler

1. **Anliegen-Hubs verloren Card-Nebentitel** (`moreTitles` wurde im DepthBlock nicht gerendert — nur in HubFromArchive): „Homöopathie und Schmerztherapie", „Sanft heilen" usw. fehlten auf allen drei Anliegen-Seiten. → **Behoben**: Titel ab dem dritten erscheinen jetzt als verlinkte Chips.
2. **Verfahrens-Verzeichnis der Startseite zeigte 6 statt 17 Kacheln**: `topicHref`-Matcher kannte die Live-Titel nicht („Elektroakupunktur nach Doktor Voll", „Vitalfeldtherapie", „150 MHz…", „Klassische | Komplexe Homöopathie" …). → **Behoben**: Map um 13 Einträge erweitert; **17 Kacheln verifiziert**.
3. **FAQ-H2-Wortlaut**: „Klarheit vor dem ersten Anruf" → jetzt „Häufige Fragen zur Praxis" wie live (Heading-Parität, bessere SERP-Konsistenz).

## 4. Verbleibende Restrisiken / nächste Schritte

1. **Welle 2 P0:** NLS-Archivtiefe in NlsNeko; Kontakt-Live-Texte; Header-Mega-Menü mit den Unterseiten-URLs (Linkprofil-Parität).
2. **Nachcrawl (GAP-A):** 4 Hub-Slider fehlen im Katalog (bioresonanz, schmerz, psychotherapie, manuelle-übersicht — live haben sie 3–4 Motive).
3. `scripts/parity-audit.mjs` als Prüfwerkzeug etablieren: vor jedem Cutover-Lauf grün im Sinne „keine echten p/h-Lücken außer dokumentierten".

**Verifikation dieser Analyse:** Playwright-DOM-Checks (17 Kacheln, theme-neu-Diag, moreTitles-Chips), Audit-Läufe `/tmp/audit*.txt`, Typecheck grün.
