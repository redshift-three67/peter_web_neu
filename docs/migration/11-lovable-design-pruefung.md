# Prüfung Lovable-App vs. öffentliches CMS (18.08.2026)

Quelle: `https://naturheilpraxis-rauch.lovable.app/` (HTML, CSS `index-rUued3Fq.css`, JS `index-6-yH4dIq.js`).  
Frage: Kann das App-Design technisch akkurat, Google-konform (E-E-A-T 2026) und sauber ins bestehende CMS?

## Status

Schritt 1 (18.08.2026, nachmittags): Design-Tokens und Leitkomponenten im CMS
angepasst. App-Runtime unverändert standalone. Archivseiten erben die Haut.

## Kurzantwort

| Schicht | Übernehmen? | Begründung |
|---|---|---|
| Form, Farbe, Typo, Karten, Schatten | **Ja** | Gleicher Satz, schon zu ~90 % im CMS |
| Öffentliche Seitenstruktur / IA | **Nein 1:1** | App ist Portal, nicht Local-SEO-Site |
| App-Runtime (Auth, Infothek, SPA) | **Nein** | CSR, noindex, YMYL hinter Login |
| Workflow der App | **Weiter standalone** | wie vereinbart, Sicherheitsanalyse später |

Zwei Schritte bleiben richtig: zuerst Design-Tokens/Komponenten im CMS angleichen, danach dieselbe Haut auf die 64 Archivseiten.

## Was die App technisch ist

- Vite/React-CSR: HTML ist nur `<div id="root">`. Inhalt entsteht im Browser.
- `robots: noindex, nofollow` im statischen HTML; Indexierung wird erst per JS umgeschaltet. Google sieht oft die leere Hülle.
- ~1,2 MB JS, 123 KB CSS, plus `/~flock.js` (Lovable-Analytics) und `gtag`.
- Backend-Spuren: **Supabase** (68 Treffer), Lovable-Hosting, `dpo@lovable.dev`.
- Routen: `/auth`, `/dashboard`, `/neupatient`, `/anamnesebogen`, `/infothek`, `/patienten`, `/wikidatenbank` … — Patientenportal, nicht Praxis-Website.

Das CMS (TanStack Start, SSR, selbst gehostete Fonts, Person/MedicalBusiness-Schema, sichtbare Texte) ist die Google-taugliche Schicht. Die App ist die geschützte Funktionsschicht.

## Design: Form, Farbe, UX

Beide Systeme sprechen dieselbe Sprache:

| Token | Lovable | CMS jetzt |
|---|---|---|
| Display | Playfair Display (self-hosted) | gleich |
| Fließtext | Source Sans 3 (self-hosted) | gleich |
| Sage/Primary | `hsl(145 25% 36%)` ≈ `#457A5C` | `#457a5a` |
| Sand/Background | `hsl(40 30% 97%)` ≈ `#F8F5EF` | `#f8f6f1` |
| Terracotta/Clay | `hsl(18 45% 55%)` ≈ `#C47A50` | `#c2754f` |
| Radius | `0.75rem` | `--radius-md: 0.75rem` |
| Schatten | `shadow-soft` / `shadow-card` | dieselben Werte |

Die App hat zusätzlich: Sage-Skala 50–700, Hero-Verlauf, `shadow-elevated`, Sidebar-Tokens (fürs Portal). Das ist **adaptierbar**, ohne die App einzubetten.

Intuition der App-Startseite: Zugangswahl (Informieren / Neupatient / Anmelden). Gut für ein Portal, schlecht als einzige öffentliche Praxis-Home. Local-SEO braucht H1, NAP, Anliegen, Autor, Disclaimer — das leistet die CMS-Startseite bereits.

## E-E-A-T / Recht / SEO — nicht 1:1 übernahmefähig

Aus dem App-Schema und Meta:

- E-Mail im Schema war `praxis_rauch@icloud.com` — das ist seit 18.08.2026 die gültige Praxisadresse und im CMS übernommen.
- Geo: `48.3561, 10.9056` (Innenstadt), Praxis liegt in **Hochzoll** (`48.33937, 10.94893`)
- Öffnungszeiten Schema: 09:00–18:00 — live: 10:00–12:30 und 13:00–19:00
- `sameAs: []` — kein Facebook, kein Google-Profil
- `MedicalTherapy`: „Irisdiagnose = Diagnose durch Analyse der Iris“, Darmsanierung, Entgiftung
- Claim auf der Home: **„Sanfte Therapien ohne belastende Nebenwirkungen“** — HWG-kritisch
- Meta beschreibt Methodenlexikon (Irisdiagnose, Darmsanierung), nicht Patientenanliegen
- Keine ProvenExpert/Jameda-Einbindung, keine sichtbare Byline mit Zulassung/Aufsicht
- Infothek hinter Login — Google kann YMYL-Tiefe nicht bewerten (fürs Portal gewollt, fürs Ranking der Domain falsch)

Barrierefreiheit: im Bundle kein substanzielles A11y-Konzept (`barriere` = 0 Treffer). CMS hat Fokusringe, Skip-Logik in Planung, semantische Header.

Performance als öffentliche Site: CSR + 1,2 MB JS fällt bei LCP/INP und bei Googlebot durch. CMS liefert HTML serverseitig.

## Saubere Integrationsgrenze

```
Öffentlich (CMS, SSR)          App (standalone, später)
-------------------------      ---------------------------
Start, Anliegen, Verfahren     Login / Rollen
Über mich, Anfahrt, Recht      Anamnese-Workflow
Archivseiten (noindex)         Infothek / Bibliothek
Schema, Reviews, NAP           interne PDFs / Handouts
Design-Tokens = App-Look       bleibt auf lovable.app
Link: „Anamnesebogen“  ----->  bestehender Deep-Link
```

Nicht tun: App-Router, Supabase-Auth oder die CSR-Hülle ins öffentliche CMS ziehen. Das würde E-E-A-T und Indexierung der Domain beschädigen.

## Empfohlene Schritte (unverändert, jetzt bestätigt)

1. **Design im CMS angleichen** (ohne App-Code): Sage-Skala, Terracotta, Hero-Verlauf, Karten, Abstände — Look der App, Semantik des CMS.
2. **Dieselbe Haut auf Archivseiten** (bereits im neuen Layout; Tokens nachziehen).
3. **App bleibt standalone**, bis Workflow/Sicherheit geprüft sind.
4. Slider-Entscheidung später, unabhängig vom Design- paletten-Abgleich.

## Kriterien 2026 — wer erfüllt was

| Kriterium | App live | CMS jetzt | Nach Token-Abgleich |
|---|---|---|---|
| E-E-A-T sichtbar | schwach / falsch NAP | stark | bleibt stark |
| HWG-sichere Claims | nein (Nebenwirkungen) | ja | ja |
| SSR / indexierbarer Content | nein | ja | ja |
| Local SEO / Geo korrekt | nein | ja | ja |
| Form & Farbe | Referenz | 90 % | 100 % Look |
| UX Praxisbesucher | Portal-Onboarding | Anliegen-geführt | Anliegen + App-Look |
| Performance / CWV | CSR-Risiko | SSR-tauglich | SSR-tauglich |
| Barrierefreiheit | unklar | Grundgerüst | weiter ausbauen |
| Zukunft (mehr Praxen) | Lovable-Lock-in | eigenes CMS | eigenes CMS |
