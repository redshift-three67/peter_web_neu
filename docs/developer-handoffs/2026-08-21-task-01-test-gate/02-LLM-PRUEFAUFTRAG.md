# LLM-Prüfauftrag – Task 1: Test-Gate reparieren

## Exakter Wortlaut für das prüfende LLM

Prüfe den folgenden Implementierungsstand unabhängig, präzise und ausschließlich anhand des Repository-Inhalts und frisch ausgeführter Nachweise.

Repository: `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Branch: `relaunch-konzept`

Ausgangscommit: `04e6b9dc64be437787c02f1dc6d3de3a533b9240`

Zu prüfender Implementierungscommit: `7ea8a50149d5a54a45014a92f1ec265182ad5efe`

Prüfumfang:

1. Vergleiche den Diff `04e6b9dc64be437787c02f1dc6d3de3a533b9240..7ea8a50149d5a54a45014a92f1ec265182ad5efe`.
2. Prüfe, ob `npm test` plattformübergreifend alle `scripts/**/*.test.mjs` rekursiv und deterministisch ausführt.
3. Prüfe zwingend, ob ein leerer Testbestand einen Exitcode ungleich null liefert.
4. Prüfe, ob der Exitcode des Node-Testprozesses korrekt propagiert wird.
5. Führe mindestens `npm test`, `npm run typecheck`, `npm run lint` und die gezielten Runner-Tests frisch aus.
6. Prüfe Masterplan, Vollbericht, JSON-Matrix und Markdown-Matrix auf Widersprüche. Historische 0-Test-/41-Test-Evidenz darf nicht als aktueller Stand ausgegeben werden.
7. Prüfe, ob `STAT-003` korrekt geschlossen und aus den offenen Abhängigkeiten von `STAT-024` entfernt wurde.
8. Prüfe Git-Synchronisation mit einem echten Fetch; verlasse dich nicht allein auf einen lokalen Remote-Tracking-Ref.
9. Verändere keine Dateien. Gib Findings mit Datei und Zeile an.

Antworte ausschließlich mit einem syntaktisch gültigen JSON-Objekt nach diesem Schema:

```json
{
  "review_id": "RAUCH-TASK-01-REVIEW",
  "reviewed_commit": "7ea8a50149d5a54a45014a92f1ec265182ad5efe",
  "verdict": "freigegeben | freigegeben_mit_auflagen | nicht_freigegeben",
  "summary": "kurze, präzise Gesamtbewertung",
  "checks": {
    "recursive_discovery": "bestätigt | nicht_bestätigt",
    "empty_suite_exit_nonzero": "bestätigt | nicht_bestätigt",
    "child_exit_propagation": "bestätigt | nicht_bestätigt",
    "npm_test": "bestätigt | nicht_bestätigt",
    "typecheck": "bestätigt | nicht_bestätigt",
    "lint": "bestätigt | nicht_bestätigt",
    "documentation_consistency": "bestätigt | nicht_bestätigt",
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
    "task": "Task 2: GSC- und 64-URL-Matrix",
    "decision": "starten | zuerst_auflagen_beheben",
    "reason": "knappe Begründung"
  }
}
```

Wenn keine Findings vorliegen, muss `findings` ein leeres Array sein. Erfinde keine Nachweise und markiere nicht ausgeführte Prüfungen als `nicht_bestätigt`.
