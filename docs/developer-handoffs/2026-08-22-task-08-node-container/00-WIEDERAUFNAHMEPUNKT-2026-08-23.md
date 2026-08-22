# Fortführung Rauch-Website – Task 8 am 23.08.2026

Setze die Arbeit exakt am folgenden gesicherten Stand fort. Beginne nicht erneut
mit einer allgemeinen Analyse und verändere die produktive WordPress-Website,
Plesk oder DNS nicht.

## 1. Kanonischer und isolierter Git-Stand

- Kanonisches Repository:
  `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`
- Kanonischer Branch: `relaunch-konzept`
- Kanonischer lokaler und GitHub-HEAD vor Task-8-Integration:
  `5403669650e365fd84aee78a9eb8e2f2be0e1eb0`
- Isolierter Task-8-Worktree:
  `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main\.worktrees\task-08-node-container`
- Gesicherter Feature-Branch: `codex/task-08-node-container`
- Gesicherter Implementierungscommit:
  `c2c9a1be03a0e9cffeb3b91cf53b0df04b7fc529`
- Task 8 ist noch **nicht** in `relaunch-konzept` integriert.
- Die Task-8-Statusdokumentation ist noch nicht auf abgeschlossen gesetzt.

Prüfe beim Einstieg zuerst:

```powershell
git -C "C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main" fetch origin relaunch-konzept
git -C "C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main" status --short --branch
git -C "C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main" rev-parse HEAD
git -C "C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main" rev-parse origin/relaunch-konzept
git -C "C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main\.worktrees\task-08-node-container" status --short --branch
git -C "C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main\.worktrees\task-08-node-container" rev-parse HEAD
```

## 2. Bereits umgesetzt und frisch bestätigt

- `src/routes/healthz.ts`: dependency-freier Liveness-Endpunkt;
- `vite.config.ts`: Vercel bleibt Standard, Modus `node` erzeugt das
  Nitro-Preset `node-server`;
- `package.json`: `build:node` und `start:node`;
- `Dockerfile`: Node 22 Alpine, Multi-Stage, Runtime-Benutzer `node`, Port 3000
  und Healthcheck;
- `.dockerignore`: Git, Worktrees, Abhängigkeiten, Buildausgaben, Environment-
  Dateien und private Evidenz ausgeschlossen;
- `.output/` wird von Git ignoriert;
- `scripts/node-deployment-contract.test.mjs`: Deployment-Vertragstests;
- `scripts/copy-pglite-assets.mjs` und zugehöriger Test: die von PGlite zur
  Laufzeit benötigten Dateien `pglite.data`, `pglite.wasm` und `initdb.wasm`
  werden deterministisch in `.output/server/_libs` übernommen.

Frische Nachweise:

| Prüfung | Ergebnis |
| --- | --- |
| fokussierte Deploymenttests | 6/6 bestanden |
| `npm test` | 80/80 bestanden |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0, 0 Fehler, 3 bekannte Warnungen |
| `npm run build:node` | Exit 0 |
| lokaler Node-Smoke-Test | `/healthz`, `/`, `/kontakt` und `/online-anamnesebogen` jeweils HTTP 200 |
| Health-Vertrag | exakt `{"status":"ok"}`, `Cache-Control: no-store` |
| Node-Laufzeitprotokoll | kein PGlite- oder sonstiger Laufzeitfehler |
| `npm run build` | Exit 0; bestehender Vercel-Pfad unverändert funktionsfähig |

Bekannte, unveränderte Lintwarnungen:

- `scripts/wp-public-crawl.mjs`: ungenutzter `readFile`-Import;
- `src/components/site/DesignSkin.tsx`: Fast-Refresh-Grenze;
- `src/lib/auth/use-current-user.ts`: ungenutzte ESLint-Deaktivierung.

## 3. Exakt offener Befund

Nur der echte Docker-Build und Container-Smoke-Test fehlen. Docker Desktop ist
benutzerspezifisch installiert unter:

`C:\Users\Hubert111\AppData\Local\Programs\DockerDesktop`

Zwei Startversuche wurden sauber beendet. Die WSL-VM scheiterte mit
`Wsl/Service/CreateInstance/CreateVm/HCS/0x800705aa` und der Meldung, dass nicht
genügend Systemressourcen verfügbar seien. Zu diesem Zeitpunkt waren 3,43 GB
RAM frei, die RAM-Auslastung lag bei 77,5 Prozent. D: hatte 8,04 GB und E:
23,80 GB freien Speicher. Firefox belegte zusammen ungefähr 1,9 GB. Docker und
die Testserver wurden danach wieder beendet.

Es wurden keine Container, Images, Volumes, Restore-Dateien oder produktiven
Systeme gelöscht beziehungsweise verändert.

## 4. Verbindlicher nächster Schritt

1. Benutzer bestätigen lassen, dass Firefox vollständig geschlossen ist.
2. RAM erneut prüfen. Docker nur starten, wenn mindestens 5 GB RAM frei sind;
   bei weiterhin knappen Ressourcen nicht erzwingen.
3. Docker Desktop über den exakten Benutzerpfad ausgeblendet starten.
4. Docker-Engine wirklich über die Serverversion verifizieren.
5. Im isolierten Task-8-Worktree bauen:

```powershell
& "C:\Users\Hubert111\AppData\Local\Programs\DockerDesktop\resources\bin\docker.exe" build --tag rauch-site:task08 .
```

6. Ausschließlich einen temporären Testcontainer mit zwei CPUs und 768 MB RAM
   starten, gebunden an `127.0.0.1:13000`:

```powershell
& "C:\Users\Hubert111\AppData\Local\Programs\DockerDesktop\resources\bin\docker.exe" run --detach --name rauch-task08-smoke --cpus 2 --memory 768m --publish 127.0.0.1:13000:3000 rauch-site:task08
```

7. Prüfen:
   - Containerstatus `healthy`;
   - konfigurierter Laufzeitbenutzer `node` und effektive UID ungleich 0;
   - `/healthz` = HTTP 200 und exakt `{"status":"ok"}`;
   - `/`, `/kontakt` und `/online-anamnesebogen` = HTTP 200;
   - Containerlog ohne PGlite-, Start- oder Laufzeitfehler.
8. Nur den temporären Container `rauch-task08-smoke` stoppen und entfernen.
   Kein `docker system prune`, keine Images oder Volumes löschen. Docker Desktop
   und WSL anschließend wieder sauber beenden.
9. Bei grünem Docker-Test:
   - `STAT-006` in JSON- und Markdown-Statusmatrix auf `bestätigt` setzen und
     Nachweise aktualisieren;
   - die Task-8-Checkboxen im Masterplan abschließen;
   - Fertigmeldung, Verifikationsstatus und LLM-Prüfauftrag unter diesem
     Übergabeordner erstellen;
   - `npm test`, `npm run typecheck`, `npm run lint`, `npm run build:node`,
     `npm run build` und `git diff --check` nochmals frisch ausführen;
   - Task-8-Dokumentationscommit erstellen;
   - externen read-only Entwickler-/LLM-Review anfordern;
   - erst nach erfolgreicher interner Abnahme den Feature-Branch per
     Fast-Forward in `relaunch-konzept` integrieren und zu GitHub pushen.

## 5. Sicherheitsgrenzen

- Die produktive WordPress-Website, Plesk und DNS bleiben read-only.
- Keine Patientendaten oder privaten GSC-/Plesk-Nachweise ausgeben.
- Task 2 Gate B bleibt bis zu vollständiger GSC-Evidenz und fachlicher Freigabe
  geschlossen.
- Task 3 bleibt hinsichtlich aktueller Cutover-Sicherung und Logbaseline bis
  unmittelbar vor dem realen Cutover teilweise offen.
- Task 8 darf erst nach dem echten grünen Containerlauf als vollständig
  `bestätigt` bezeichnet werden.
