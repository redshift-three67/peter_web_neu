# Fertigmeldung – Task 4: NAP und strukturierte Daten

## Exakter Wortlaut für den Entwickler

Task 4 „NAP und strukturierte Daten“ ist im freigegebenen Codeumfang implementiert, testgetrieben verifiziert und intern ohne P0-/P1-/P2-Findings freigegeben. `STAT-017` und `STAT-026` stehen bewusst auf `bestätigt mit Einschränkungen`, weil der externe Entwicklerreview, die Schema-Validatorprüfung und die autoritative NAP-/Profilfreigabe noch ausstehen.

Kanonisches Repository:

`C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Kanonischer Branch: `relaunch-konzept`

Ausgangscommit:

`a5ec8fe454416322720777f8f83d8ec8a135e22c`

Task-4-Designcommit:

`841ecf96362d2eb47328ce585d6f97749fb79857`

Task-4-Plancommit:

`96a9b0d`

Task-4-Implementierungscommit:

`d3fedcba401cb722c442a792b294d544d2920a70`

Task-4-Reviewhärtung:

`2ad965f65a94622b4070063ba9787bd594bff08d`

## Umgesetzter Umfang

1. `scripts/seo-contract.test.mjs`
   - testet den realen Produktions-Builder mit dem realen `practice`-Export;
   - prüft exakt ein `MedicalBusiness` und eine `Person`;
   - verbietet `aggregateRating`;
   - verlangt die absolute Bild-URL `https://rauch-heilpraktiker.de/images/hero-praxis.jpg` und die vorhandene lokale Bilddatei;
   - verlangt exakt zwei Intervalle Montag bis Freitag: `10:00–12:30` und `13:00–19:00`;
   - verbietet produktives `FaqJsonLd` beziehungsweise `FAQPage`-Markup und belegt gleichzeitig den Erhalt der vier sichtbaren `FaqList`-Caller.
2. `src/lib/practice-json-ld.ts`
   - enthält den reinen, typisierten JSON-LD-Builder für `MedicalBusiness` und `Person`.
3. `src/content/site.ts`
   - enthält die kanonische absolute Schema-Bild-URL, Wochentage und beide Öffnungsintervalle.
4. `src/components/site/JsonLd.tsx`
   - serialisiert den Builder;
   - enthält weder `aggregateRating` noch die frühere FAQPage-Komponente.
5. FAQPage-Caller
   - nur die JSON-LD-Imports und -Aufrufe wurden aus Startseite, NLS/NEKO, Anliegen-Hub und Archiv-Hub entfernt;
   - sichtbare FAQs und Portalbewertungen bleiben unverändert erhalten.
6. Kanonische Dokumentation
   - JSON-Matrix, Markdown-Matrix, Vollbericht und Masterplan sind konsistent fortgeschrieben;
   - `STAT-017` und `STAT-026` sind `bestätigt mit Einschränkungen`;
   - `STAT-027` bleibt für die autoritative NAP-/Profilfreigabe separat offen.

## Frische Verifikation

| Prüfung | Ergebnis |
| --- | --- |
| TDD-Red-Lauf | 1/4 bestanden, 3/4 erwartungsgemäß fehlgeschlagen: fehlender Builder und fünf `FaqJsonLd`-Fundstellen |
| gezielter SEO-Vertragstest | 4/4 bestanden, Exit 0 |
| `npm test` | 48/48 bestanden, 0 Fehler, Exit 0 |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0, 0 Fehler, 3 bereits bekannte Warnungen |
| `npm run build` | Exit 0; Datenbankmigration mangels `DATABASE_URL` erwartungsgemäß übersprungen |
| Statusmatrix-JSON | syntaktisch gültig |
| `git diff --check` | Exit 0 |
| interner Code-Review | APPROVE, hohe Sicherheit, keine verbleibenden P0-/P1-/P2-Findings |

## Chrome-Live-View

Die lokale Startseite wurde unter `http://localhost:8080/` frisch in Chrome geprüft:

- Titel: `Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch`;
- exakt ein gerendertes `MedicalBusiness` und eine `Person`;
- absolute Bild-URL korrekt;
- kein `aggregateRating`;
- exakt zwei korrekte Öffnungsintervalle;
- kein `FAQPage`-Block;
- sichtbare Überschrift `Häufige Fragen zur Praxis` vorhanden;
- keine Console-Warnungen oder -Fehler.

Die produktive WordPress-Website, Plesk und DNS wurden nicht verändert.

## Verbindliche Einschränkungen und Restpunkte

1. Die im Repository vorhandene `.vercel/output`-Momentaufnahme ist historisch und ausdrücklich kein freigegebenes Prebuilt-Releaseartefakt. `vercel deploy --prebuilt` darf damit nicht verwendet werden. Bis Task 8 den Deploymentvertrag schließt, muss jedes Release aus dem geprüften Quellstand neu gebaut werden.
2. Der externe Entwickler-/LLM-Review wurde am 2026-08-22 mit `freigegeben` und ohne Findings abgeschlossen; die separate Schema.org-Validatorprüfung steht weiterhin aus.
3. Die autoritative Bestätigung von E-Mail, NAP, Öffnungszeiten und externen Profilen bleibt unter `STAT-027` offen.
4. Die drei bekannten Lintwarnungen liegen außerhalb von Task 4:
   - `scripts/wp-public-crawl.mjs`: ungenutzter `readFile`-Import;
   - `src/components/site/DesignSkin.tsx`: Fast-Refresh-Grenze;
   - `src/lib/auth/use-current-user.ts`: ungenutzte ESLint-Deaktivierung.

Bitte prüfen Sie den dokumentierten Task-4-Umfang auf Akkuranz, Regressionen und Vollständigkeit. Melden Sie anschließend ausdrücklich `freigegeben`, `freigegeben mit Auflagen` oder `nicht freigegeben`. Bestätigen Sie außerdem, ob nach Freigabe als nächster priorisierter Masterplan-Schritt Task 7 „Gesundheitsdaten-Schutz / STAT-018“ oder Task 2 „GSC- und 64-URL-Matrix / STAT-011“ ausgeführt werden soll.
