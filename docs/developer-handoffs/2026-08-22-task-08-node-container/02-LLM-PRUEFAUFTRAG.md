# Read-only-Prüfauftrag – Task 8 Node-/Containervertrag

## Verbindlicher Scope

Prüfe ausschließlich den Branch `codex/task-08-node-container` im Repository:

`C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Vergleichsbasis ist
`5403669650e365fd84aee78a9eb8e2f2be0e1eb0`. Der zu prüfende Commit darf
nicht aus diesem Dokument übernommen werden, sondern muss nach einem echten
Fetch mit `git rev-parse origin/codex/task-08-node-container` ermittelt und im
JSON-Feld `reviewed_commit` vollständig ausgegeben werden.

Keine Dateien verändern, keinen Commit erzeugen, nichts pushen und keine
Produktivsysteme bedienen. WordPress, Plesk und DNS bleiben read-only. Keine
privaten GSC-/Plesk-/Backupdaten öffnen oder ausgeben.

## Pflichtprüfung

1. Git-Synchronität und sauberer Arbeitsbaum.
2. Vollständigen Diff von der Vergleichsbasis zum Review-Commit prüfen.
3. Verifizieren, dass Vercel der Standard bleibt und nur Modus `node` das
   Nitro-Preset `node-server` setzt.
4. `/healthz` muss dependency-frei, nicht sensitiv, HTTP 200, exakt
   `{"status":"ok"}` und `Cache-Control: no-store` liefern.
5. `package-lock.json` muss unter npm 10 einen sauberen `npm ci` erlauben;
   kein `legacy-peer-deps`. AJV 8 muss den optionalen Root-Peer erfüllen und
   AJV 6 für ESLint getrennt aufgelöst sein.
6. PGlite-Laufzeitdateien müssen nach `build:node` vollständig vorhanden sein.
7. Dockerfile: Multi-Stage, Node 22 Alpine, minimale Runtime, `USER node`, Port
   3000 und Healthcheck.
8. Echter Container: `healthy`, effektive UID ungleich 0, Ressourcenlimits,
   vier HTTP-200-Routen und fehlerfreies Laufzeitlog.
9. JSON-/Markdown-Statusmatrix, Vollbericht und Masterplan müssen denselben
   Task-8-Stand wiedergeben, ohne Task 10 oder Go-live fälschlich freizugeben.

## Reproduzierbare Befehle

```powershell
$repo = 'C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main'
$worktree = Join-Path $repo '.worktrees\task-08-node-container'

git -C $repo fetch origin codex/task-08-node-container
git -C $worktree status --short --branch
git -C $worktree rev-parse HEAD
git -C $worktree rev-parse origin/codex/task-08-node-container
git -C $worktree diff 5403669650e365fd84aee78a9eb8e2f2be0e1eb0..HEAD
git -C $worktree diff --check

Set-Location -LiteralPath $worktree
node --test scripts/node-deployment-contract.test.mjs
npm test
npm run typecheck
npm run lint
npm run build:node
npm run test:node-smoke
npm run build
```

Den Docker-Teil nur bei mindestens 5 GB freiem RAM und 3 GB freiem Speicher
auf dem Docker-Datenlaufwerk ausführen. Einen eigenen Namen und Loopback-Port
verwenden; ausschließlich den eigenen Prüfcontainer wieder entfernen und kein
`docker system prune` ausführen:

```powershell
$docker = 'C:\Users\Hubert111\AppData\Local\Programs\DockerDesktop\resources\bin\docker.exe'

& $docker build --tag rauch-site:task08-review .
& $docker run --detach --name rauch-task08-review --cpus 2 --memory 768m --publish 127.0.0.1:13002:3000 rauch-site:task08-review
& $docker inspect rauch-task08-review
& $docker exec rauch-task08-review id -u
curl.exe --silent --show-error --dump-header - http://127.0.0.1:13002/healthz
curl.exe --silent --show-error --fail http://127.0.0.1:13002/
curl.exe --silent --show-error --fail http://127.0.0.1:13002/kontakt
curl.exe --silent --show-error --fail http://127.0.0.1:13002/online-anamnesebogen
& $docker logs rauch-task08-review
& $docker stop rauch-task08-review
& $docker rm rauch-task08-review
```

## Exaktes Antwortformat

Nur valides JSON ohne Markdown-Zaun ausgeben:

```json
{
  "review_id": "RAUCH-TASK-08-REVIEW",
  "reviewed_commit": "<vollständiger SHA aus origin/codex/task-08-node-container>",
  "verdict": "freigegeben | nicht_freigegeben",
  "summary": "<präzise Zusammenfassung>",
  "checks": {
    "git_sync": "bestätigt | nicht_bestätigt",
    "node_and_vercel_presets": "bestätigt | nicht_bestätigt",
    "clean_npm_10_install": "bestätigt | nicht_bestätigt",
    "health_contract": "bestätigt | nicht_bestätigt",
    "pglite_runtime_assets": "bestätigt | nicht_bestätigt",
    "docker_non_root_and_limits": "bestätigt | nicht_bestätigt",
    "critical_routes": "bestätigt | nicht_bestätigt",
    "runtime_logs": "bestätigt | nicht_bestätigt",
    "npm_test": "bestätigt | nicht_bestätigt",
    "typecheck": "bestätigt | nicht_bestätigt",
    "lint": "bestätigt | nicht_bestätigt",
    "node_build_and_smoke": "bestätigt | nicht_bestätigt",
    "vercel_build": "bestätigt | nicht_bestätigt",
    "documentation_consistency": "bestätigt | nicht_bestätigt",
    "production_systems_unchanged": "bestätigt | nicht_bestätigt"
  },
  "findings": [],
  "known_non_blocking_warnings": [],
  "recommended_next_step": {
    "task": "<nächster Schritt>",
    "decision": "<starten | nachbessern | blockiert>",
    "reason": "<Begründung>"
  }
}
```

Bei jedem Befund `verdict` auf `nicht_freigegeben` setzen und unter
`findings` mindestens Schweregrad, Datei, Zeile, Evidenz und erforderliche
Korrektur nennen. Die Review-Antwort ist anschließend unverändert als
`04-EXTERNES-REVIEW.json` in diesem Übergabeordner abzulegen.
