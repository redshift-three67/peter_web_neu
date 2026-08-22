# LLM-Prüfauftrag – Task 4: NAP und strukturierte Daten

## Exakter Wortlaut für das prüfende LLM

Prüfe den folgenden Implementierungsstand unabhängig, präzise, read-only und ausschließlich anhand des Repository-Inhalts sowie frisch ausgeführter Nachweise.

Repository: `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Branch: `relaunch-konzept`

Ausgangscommit: `a5ec8fe454416322720777f8f83d8ec8a135e22c`

Zu prüfender Quellcommit: `2ad965f65a94622b4070063ba9787bd594bff08d`

Prüfumfang:

1. Vergleiche den Diff `a5ec8fe454416322720777f8f83d8ec8a135e22c..2ad965f65a94622b4070063ba9787bd594bff08d`.
2. Prüfe `docs/superpowers/specs/2026-08-22-task-04-structured-data-design.md` und den Umsetzungsplan auf vollständige Erfüllung.
3. Prüfe, ob der reale `practice`-Export über `buildPracticeJsonLd()` exakt ein `MedicalBusiness` und eine `Person` erzeugt.
4. Prüfe, ob `aggregateRating` vollständig aus dem produktiven Quellvertrag entfernt ist.
5. Prüfe die exakte absolute Bild-URL und die dazugehörige Datei unter `public/images/hero-praxis.jpg`.
6. Prüfe exakt zwei `OpeningHoursSpecification`-Objekte für Montag bis Freitag mit `10:00–12:30` und `13:00–19:00`.
7. Prüfe, ob kein produktives `FAQPage`-Markup mehr erzeugt wird und ob die sichtbaren FAQ-Listen unverändert erhalten sind.
8. Führe frisch aus: `node --test scripts/seo-contract.test.mjs`, `npm test`, `npm run typecheck`, `npm run lint` und `git diff --check`.
9. Parse die JSON-Statusmatrix und gleiche `STAT-017`, `STAT-026` und `STAT-027` mit Markdown-Matrix, Vollbericht und Masterplan ab.
10. Prüfe ausdrücklich, dass die historische `.vercel/output`-Momentaufnahme nicht als freigegebenes Prebuilt-Artefakt behandelt wird. `vercel deploy --prebuilt` ist damit unzulässig; ein Release muss neu aus dem geprüften Quellstand gebaut werden.
11. Führe einen echten `git fetch origin relaunch-konzept` aus und vergleiche lokalen Branch und `origin/relaunch-konzept`.
12. Verändere keine Dateien. Nenne jedes Finding mit relativem Pfad und Zeile.

Antworte ausschließlich mit einem syntaktisch gültigen JSON-Objekt nach diesem Schema:

```json
{
  "review_id": "RAUCH-TASK-04-REVIEW",
  "reviewed_commit": "2ad965f65a94622b4070063ba9787bd594bff08d",
  "verdict": "freigegeben | freigegeben_mit_auflagen | nicht_freigegeben",
  "summary": "kurze, präzise Gesamtbewertung",
  "checks": {
    "medical_business_and_person_graph": "bestätigt | nicht_bestätigt",
    "aggregate_rating_absent": "bestätigt | nicht_bestätigt",
    "absolute_image_and_asset": "bestätigt | nicht_bestätigt",
    "opening_intervals_exact": "bestätigt | nicht_bestätigt",
    "faqpage_absent_visible_faqs_preserved": "bestätigt | nicht_bestätigt",
    "npm_test": "bestätigt | nicht_bestätigt",
    "typecheck": "bestätigt | nicht_bestätigt",
    "lint": "bestätigt | nicht_bestätigt",
    "documentation_consistency": "bestätigt | nicht_bestätigt",
    "source_build_only_contract": "bestätigt | nicht_bestätigt",
    "git_sync": "bestätigt | nicht_bestätigt"
  },
  "findings": [
    {
      "severity": "P0 | P1 | P2 | P3",
      "file": "Repo-relativer Pfad",
      "line": 1,
      "description": "konkreter Befund",
      "recommendation": "konkrete Korrektur"
    }
  ],
  "known_non_blocking_warnings": ["nur bestätigte, nicht blockierende Restwarnungen"],
  "recommended_next_step": {
    "task": "Task 7: Gesundheitsdaten-Schutz | Task 2: GSC- und 64-URL-Matrix",
    "decision": "starten | zuerst_auflagen_beheben",
    "reason": "knappe Begründung"
  }
}
```

Wenn keine Findings vorliegen, muss `findings` ein leeres Array sein. Erfinde keine Nachweise und markiere nicht ausgeführte Prüfungen als `nicht_bestätigt`.
