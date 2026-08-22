# LLM-Prüfauftrag – Task 2: GSC- und 64-URL-Matrix (Gate A)

## Exakter Wortlaut für das prüfende LLM

Prüfe den folgenden Implementierungsstand unabhängig, präzise, read-only und ausschließlich anhand des Repository-Inhalts sowie frisch ausgeführter Nachweise. Verändere keine Datei und keine produktive oder externe Systemkonfiguration.

Repository: `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Branch: `relaunch-konzept`

Ausgangscommit: `35ad22503d6f4c67ced12df343bff7cbaa8ea346`

Zu prüfender Task-2-Implementierungscommit: `9a86e39d436a2d279fc96516d52ca6c9eaac372c`

Verbindliche Entscheidungsgrenze: Gate A umfasst nur die deterministische 64-Zeilen-Struktur, den optionalen privaten GSC-Import und die Sicherheitsverträge. Gate B ist nicht erfüllt. Die 59 `temporary_noindex_review`-Zeilen sind keine Deindexierungsfreigabe und dürfen vor GSC- sowie Product-Owner-Freigabe nicht von Task 5 konsumiert werden.

Prüfumfang:

1. Führe `git fetch origin relaunch-konzept` aus und bestätige, dass der zu prüfende Implementierungscommit im aktuellen kanonischen Branch enthalten ist. Vergleiche den vollständigen Diff `35ad22503d6f4c67ced12df343bff7cbaa8ea346..9a86e39d436a2d279fc96516d52ca6c9eaac372c`.
2. Prüfe Design und Plan unter `docs/superpowers/specs/2026-08-22-task-02-url-matrix-design.md` und `docs/superpowers/plans/2026-08-22-task-02-url-matrix.md`.
3. Prüfe `.gitignore` und bestätige, dass `data/private/gsc/`, `data/private/plesk/` und `data/private/wordpress-backup/` ignoriert werden. Suche nach versehentlich versionierten privaten Evidenzdateien.
4. Führe `node scripts/build-url-matrix.mjs` aus. Bestätige exakt 64 Zeilen, 5 `keep_200_index`, 59 `temporary_noindex_review`, 0 `merge_301` und 0 `remove_410`.
5. Bestätige, dass `docs/migration/url-migration-matrix.csv` byte-identisch zum Generatorergebnis ist, SHA-256 `6B8B0A1E136ECCF6CA055817CDC5A426C4D2C5BB253555053A9E5D79C30A2A00` besitzt und `.gitattributes` für diese Datei `text eol=lf` erzwingt.
6. Prüfe, dass jede `old_url` und jeder `old_path` eindeutig ist, die konkrete URL↔Pfad-Bindung dem Manifest entspricht und keine Manifest-URL fehlt oder fremde URL ergänzt wurde.
7. Prüfe fehlende GSC-, Backlink-, Business- und Risikowerte auf `unknown` statt numerischer Null. Verifiziere mit synthetischer Eingabe, dass eine echte GSC-Null als `0` erhalten bleibt.
8. Prüfe den GSC-Parser adversarial: deutsche/englische Pflichtspalten, Quotes, Dezimalkomma, Query/Fragment, fremder Host, doppelte Pfade, fehlende Pflichtspalten und ungültige Metriken.
9. Prüfe adversarial, dass unfreigegebene oder `manifest_only`-basierte `merge_301`- und `remove_410`-Zeilen abgewiesen werden.
10. Prüfe Selbstredirects, Root-Massenredirects, Redirectketten und Zyklen.
11. Prüfe, dass `temporary_noindex_review` nur `approval_status=pending`, leeres `approved_by`, leeres `target_path`, `target_http_status=pending`, `new_canonical=unknown` und `in_new_sitemap=pending` akzeptiert.
12. Prüfe, dass ein ungültiger `evidence_status` abgewiesen wird und der Unknown→0-Schutz nicht umgangen werden kann.
13. Führe frisch aus: `node --test scripts/build-url-matrix.test.mjs`, `npm test`, `npm run typecheck`, `npm run lint`, JSON-Parsing und `git diff --check`.
14. Gleiche `STAT-011` und `STAT-012` zwischen JSON-Matrix, Markdown-Matrix, Vollbericht und Masterplan ab. `STAT-011` darf höchstens `bestätigt mit Einschränkungen` sein; `STAT-012` muss `derzeit nicht prüfbar` bleiben.
15. Bestätige, dass der Paritätsaudit-Befund nicht als positive Inhaltsfreigabe dargestellt wird und Task 6 zugeordnet bleibt.
16. Bestätige, dass keine Live-Redirects, Sitemap-/Canonical-Umschaltungen, Deindexierungen oder Änderungen an WordPress, Plesk, DNS beziehungsweise Search Console vorgenommen wurden.
17. Nenne jedes Finding mit relativem Pfad und Zeile. Erfinde keine Nachweise und markiere nicht ausgeführte Prüfungen als `nicht_bestätigt`.

Antworte ausschließlich mit einem syntaktisch gültigen JSON-Objekt nach diesem Schema:

```json
{
  "review_id": "RAUCH-TASK-02-GATE-A-REVIEW",
  "reviewed_commit": "9a86e39d436a2d279fc96516d52ca6c9eaac372c",
  "verdict": "freigegeben | freigegeben_mit_auflagen | nicht_freigegeben",
  "summary": "kurze, präzise Gesamtbewertung",
  "checks": {
    "private_evidence_ignored": "bestätigt | nicht_bestätigt",
    "manifest_exact_64": "bestätigt | nicht_bestätigt",
    "decision_counts_5_59_0_0": "bestätigt | nicht_bestätigt",
    "committed_csv_byte_identical": "bestätigt | nicht_bestätigt",
    "unknown_not_zero_contract": "bestätigt | nicht_bestätigt",
    "gsc_parser_contract": "bestätigt | nicht_bestätigt",
    "url_path_binding": "bestätigt | nicht_bestätigt",
    "redirect_and_removal_approval_gate": "bestätigt | nicht_bestätigt",
    "no_redirect_chains_or_cycles": "bestätigt | nicht_bestätigt",
    "pending_rows_non_deployable": "bestätigt | nicht_bestätigt",
    "focused_tests": "bestätigt | nicht_bestätigt",
    "npm_test": "bestätigt | nicht_bestätigt",
    "typecheck": "bestätigt | nicht_bestätigt",
    "lint": "bestätigt | nicht_bestätigt",
    "documentation_consistency": "bestätigt | nicht_bestätigt",
    "gate_b_remains_closed": "bestätigt | nicht_bestätigt",
    "production_systems_unchanged": "bestätigt | nicht_bestätigt",
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
  "gate_b": {
    "gsc_baseline_available": false,
    "pending_rows": 59,
    "product_owner_approvals_complete": false,
    "task_5_consumption_authorized": false,
    "note": "knappe, präzise Grenzbeschreibung"
  },
  "recommended_next_step": {
    "task": "Task 2 Gate B: GSC- und Product-Owner-Freigaben",
    "decision": "evidenz_beschaffen | zuerst_auflagen_beheben",
    "reason": "knappe Begründung"
  }
}
```

Wenn keine Findings vorliegen, muss `findings` ein leeres Array sein.
