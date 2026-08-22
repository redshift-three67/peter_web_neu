# LLM-Prüfauftrag – Task 7: Externe Online-Anamnese-Grenze

## Exakter Wortlaut für das prüfende LLM

Prüfe den folgenden Implementierungsstand unabhängig, präzise, read-only und ausschließlich anhand des Repository-Inhalts sowie frisch ausgeführter Nachweise.

Repository: `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Branch: `relaunch-konzept`

Ausgangscommit: `46e67a96fb0c46bb9d9d3349e73eecbe84ca61ba`

Zu prüfender Quellcommit: `d36cb51928d06c185aee32422f18dd4f8173138e`

Verbindliche Produktentscheidung: Die Relaunch-Website enthält keinen eigenen Online-Anamnesebogen. Sie verlinkt ausschließlich auf die unabhängige Anwendung `https://naturheilpraxis-rauch.lovable.app/`. Die externe App ist kein Teil dieses Repository-Reviews und darf aus dieser Prüfung nicht als Website-Komponente, eingebettetes System oder gemeinsam betriebener Datenpfad interpretiert werden.

Prüfumfang:

1. Vergleiche den vollständigen Diff `46e67a96fb0c46bb9d9d3349e73eecbe84ca61ba..d36cb51928d06c185aee32422f18dd4f8173138e`.
2. Prüfe Design und Umsetzungsplan unter `docs/superpowers/` auf vollständige Erfüllung.
3. Prüfe, dass `src/components/site/AnamneseWizard.tsx` nicht existiert und in produktiven Quellen kein lokales Anamneseformular gerendert wird.
4. Prüfe, dass `submitAnamnese`, `anamnesis_submissions` und jeder lokale Anamnese-Speicher-/Listenpfad aus den produktiven Website-Quellen entfernt sind.
5. Prüfe, dass die Praxis-Inbox nur Kontaktanfragen und keine Anamnesedaten beziehungsweise Anamneseformulare enthält.
6. Prüfe `/online-anamnesebogen`: kanonische externe URL aus `src/content/external-links.ts`, prominente Intro-Platzierung, `target="_blank"`, `rel="noopener noreferrer"`, kein `iframe` und kein lokaler Submit.
7. Prüfe, dass `/anamnese` als interne Kompatibilitätsweiterleitung erhalten bleibt.
8. Prüfe Datenschutz-, Download- und Hinweistexte auf die korrekte externe Systemgrenze.
9. Prüfe, dass vorhandene Migrationen und historische Daten gegenüber dem Ausgangscommit unverändert sind.
10. Prüfe, dass `git ls-files -- .vercel/output` keine Datei ausgibt, `.vercel/output/` ignoriert ist und ein frischer Build ausschließlich ungetrackte Artefakte erzeugt.
11. Prüfe den Boundary-Test auf aggregierte und vollständige Fehlermeldungen. Reproduziere den RED-Lauf nur in einem sicheren, unveränderten Basis-Worktree; verändere den kanonischen Arbeitsbaum nicht.
12. Führe frisch aus: `node --test scripts/health-data-boundary.test.mjs`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` und `git diff --check`.
13. Stelle nach dem Build den unveränderten Arbeitsbaum wieder her, ohne Quelländerungen zu verwerfen; `.vercel/output` ist ein ignoriertes, regenerierbares Build-Artefakt.
14. Parse die JSON-Statusmatrix und gleiche `STAT-018` mit Markdown-Matrix, Vollbericht und Masterplan ab. Alte Submit-Beschreibungen dürfen nur eindeutig als historischer Ausgangsbefund vorkommen.
15. Führe einen echten `git fetch origin relaunch-konzept` aus und vergleiche lokalen Branch und `origin/relaunch-konzept`.
16. Verändere keine Dateien. Nenne jedes Finding mit relativem Pfad und Zeile.

Antworte ausschließlich mit einem syntaktisch gültigen JSON-Objekt nach diesem Schema:

```json
{
  "review_id": "RAUCH-TASK-07-REVIEW",
  "reviewed_commit": "d36cb51928d06c185aee32422f18dd4f8173138e",
  "verdict": "freigegeben | freigegeben_mit_auflagen | nicht_freigegeben",
  "summary": "kurze, präzise Gesamtbewertung",
  "checks": {
    "local_anamnesis_ui_absent": "bestätigt | nicht_bestätigt",
    "local_submit_and_storage_absent": "bestätigt | nicht_bestätigt",
    "practice_inbox_contacts_only": "bestätigt | nicht_bestätigt",
    "external_link_contract_secure": "bestätigt | nicht_bestätigt",
    "legacy_redirect_preserved": "bestätigt | nicht_bestätigt",
    "active_copy_boundary_accurate": "bestätigt | nicht_bestätigt",
    "historical_migrations_unchanged": "bestätigt | nicht_bestätigt",
    "tracked_prebuild_absent": "bestätigt | nicht_bestätigt",
    "boundary_test": "bestätigt | nicht_bestätigt",
    "npm_test": "bestätigt | nicht_bestätigt",
    "typecheck": "bestätigt | nicht_bestätigt",
    "lint": "bestätigt | nicht_bestätigt",
    "production_build": "bestätigt | nicht_bestätigt",
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
  "external_app_scope": {
    "reviewed_as_part_of_website_repository": false,
    "separate_review_required": true,
    "note": "knappe Abgrenzung"
  },
  "recommended_next_step": {
    "task": "Task 2: GSC- und 64-URL-Matrix",
    "decision": "starten | zuerst_auflagen_beheben",
    "reason": "knappe Begründung"
  }
}
```

Wenn keine Findings vorliegen, muss `findings` ein leeres Array sein. Erfinde keine Nachweise und markiere nicht ausgeführte Prüfungen als `nicht_bestätigt`.

