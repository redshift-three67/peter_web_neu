# Fertigmeldung – Task 8 Node-/Containervertrag

## Prüfgegenstand

- Projekt: Naturheilpraxis Peter Rauch – Website-Relaunch
- Feature-Branch: `codex/task-08-node-container`
- Ausgangscommit: `5403669650e365fd84aee78a9eb8e2f2be0e1eb0`
- Implementierungscommit: `c2c9a1be03a0e9cffeb3b91cf53b0df04b7fc529`
- Exakter Review-Commit: vom Prüfer nach `git fetch` mit
  `git rev-parse origin/codex/task-08-node-container` zu ermitteln
- Produktionssysteme: unverändert; WordPress, Plesk und DNS blieben read-only

## Umgesetzt

- dependency-freier Liveness-Endpunkt `/healthz` mit exakt
  `{"status":"ok"}` und `Cache-Control: no-store`;
- expliziter Nitro-`node-server`-Build bei unverändertem Vercel-Standardpfad;
- `build:node`, `start:node` und automatisiertes `test:node-smoke`;
- deterministische Übernahme der drei PGlite-Laufzeitdateien in den
  Node-Build;
- Multi-Stage-Dockerfile auf Node 22 Alpine mit Runtime-Benutzer `node`, Port
  3000 und Healthcheck;
- `.dockerignore` und Git-Ausschluss generierter `.output`-Artefakte;
- Vertragstests für Build-/Startpfad, Healthroute, Dockergrenzen,
  PGlite-Dateien und den sauberen Node-22-Installationsbaum.

## Während der realen Abnahme geschlossener Zusatzbefund

Der erste echte Docker-Build scheiterte reproduzierbar bei `npm ci`: Der
historische Lockfile hatte `ajv@6.15.0` an der Wurzel gehoben, obwohl
`@hookform/resolvers@5.9.0` dort optional AJV 8 erwartet. npm 11 akzeptierte
den Trockenlauf, meldete den installierten Baum aber selbst als ungültig; npm
10.9.8 aus `node:22-alpine` verweigerte den Clean-Install.

Die Korrektur erfolgte Red-Green:

1. neuer Vertragstest schlug am alten Lockfile exakt wegen AJV 6 fehl;
2. `package-lock.json` wurde mit npm 10.9.8 ohne
   `--legacy-peer-deps` standardkonform regeneriert;
3. AJV 8 liegt jetzt am Root, AJV 6 getrennt unter den ESLint-Abhängigkeiten;
4. fokussierter Test und echter Docker-Clean-Build bestehen.

## Reale Docker-Abnahme vom 2026-08-25

| Check | Ergebnis |
| --- | --- |
| Docker-Server | 29.7.2 |
| Image | `rauch-site:task08`, 156550955 Bytes |
| Image-ID | `sha256:8f0c716549b554f43926d53de9e676a4d6626a447497ba1121467428057761cf` |
| Containerstatus | `healthy` |
| konfigurierter Benutzer | `node` |
| effektive UID | `1000` |
| Ressourcenlimit | 2 CPUs, 805306368 Bytes RAM |
| `/healthz` | HTTP 200, exakt `{"status":"ok"}`, `no-store` |
| `/` | HTTP 200, nicht leer |
| `/kontakt` | HTTP 200, nicht leer |
| `/online-anamnesebogen` | HTTP 200, nicht leer |
| Containerlog | nur normaler Listen-Start; keine PGlite-/Laufzeitfehler |

Der temporäre Container `rauch-task08-smoke` wurde anschließend entfernt.
Docker Desktop und WSL wurden beendet. Es wurde kein Prune ausgeführt; keine
fremden Container, Images oder Volumes wurden verändert.

## Abschließende Quellverifikation

| Prüfung | Ergebnis |
| --- | --- |
| fokussierter Deploymentvertrag | 7/7 bestanden |
| fokussierte Task-8-Verträge einschließlich PGlite | 8/8 bestanden |
| `npm test` | 82/82 bestanden |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0; 0 Fehler, 3 bekannte Warnungen |
| `npm run build:node` | Exit 0 |
| `npm run test:node-smoke` | Exit 0; vier Routen bestätigt |
| `npm run build` | Exit 0; Vercel-Preset und Migrations-Skip bestätigt |

Bekannte, unveränderte und nicht blockierende Lintwarnungen:

- ungenutzter `readFile`-Import in `scripts/wp-public-crawl.mjs`;
- Fast-Refresh-Grenze in `src/components/site/DesignSkin.tsx`;
- ungenutzte ESLint-Deaktivierung in
  `src/lib/auth/use-current-user.ts`.

## Dokumentstatus und Grenze

`STAT-006` und die Task-8-Checkboxen sind nach dem echten Containerlauf intern
auf bestätigt gesetzt. Dies ist keine Go-live-Freigabe: Externer Read-only-
Review, Integration in `relaunch-konzept`, Plattformregistrierung (Task 10),
Staging und die übrigen Releasegates bleiben separat erforderlich.
