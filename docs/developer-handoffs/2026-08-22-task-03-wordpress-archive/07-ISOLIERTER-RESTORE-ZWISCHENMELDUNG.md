# Zwischenmeldung – Task 3 Gate C: isolierter WordPress-Restore

## Ergebnis

Der vorhandene UpdraftPlus-Satz vom 14.08.2026 wurde am 22.08.2026
vollständig in einer lokalen Docker-Umgebung wiederhergestellt. Die
Produktionswebsite, Plesk, DNS und TLS blieben unverändert. Der technische
Restore ist bestätigt; eine aktuelle Cutover-Rollbackbasis ist damit noch
nicht bestätigt.

## Kanonischer Stand

- Repository: `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`
- Branch: `relaunch-konzept`
- Ausgangscommit: `953450230120048f1175b5efd3e8794e5cb22940`
- Lokaler Restore: `E:\Rauch-Restore-2026-08-22`
- Private Quellarchive: `data/private/wordpress-backup/2026-08-22/`
- Produktionssysteme: read-only und unverändert

Der Restore-Pfad und sämtliche Datenbank-/Dateiinhalte liegen außerhalb von
Git. Es wurden keine Datenbankzeilen, Benutzerangaben, Passwörter, Tokens,
Schlüssel oder Logrohdaten versioniert.

## Archiv- und Extraktionsnachweis

- neun ZIP-Archive mit insgesamt 35.466 Einträgen vor Extraktion geprüft;
- keine Pfad-Traversal-Einträge, absoluten Pfade, Symlinks oder doppelten
  Dateiziele;
- fünf verschachtelte, leere und unter Windows inkompatible
  Doppelpunkt-Verzeichnismarker ohne Nutzdateien kontrolliert übersprungen;
- 32.257 Nutzdateien und 3.204 reguläre Verzeichnismarker extrahiert;
- 2.189,09 MB Archivdateien und 66,89 MB SQL wiederhergestellt;
- SQL-Kopie vor dem Import per SHA-256 zwischen Host und Container verglichen;
- temporäre SQL-Kopie im Datenbankcontainer nach dem Import entfernt.

## Isolationsvertrag

- Docker-Netz: `rauch-restore-internal`, `Internal=true`;
- kein Default-Route-Eintrag im WordPress-Container;
- MariaDB ohne veröffentlichten Hostport;
- kein effektiver WordPress-Hostport im internen Netz;
- Containerlimits: jeweils 768 MB RAM und zwei CPUs;
- kurzlebige WP-CLI-Läufe: 512 MB RAM, zwei CPUs und 128 Prozesse;
- WordPress-Konstanten: lokale Umgebung, Cron aus, automatische Updates aus,
  Debug aus und externe WordPress-HTTP-Ziele blockiert;
- normales Plugin-Array auf `[]` gesetzt;
- ein MU-Plugin im Restore reversibel nach `mu-plugins.disabled` verschoben;
- WP-CLI stets mit `--skip-plugins --skip-themes` ausgeführt.
- beide Restore-Container nach der Prüfung mit Exitcode 0 angehalten; Docker
  Desktop und WSL beendet; Container, Volume und Restore-Dateien bleiben für
  den unabhängigen Review erhalten.

## Datenbank- und HTTP-Nachweis

- 166 Tabellen importiert und per `mysqlcheck --skip-ssl` geprüft;
- `siteurl` und `home`: `http://127.0.0.1:18080`;
- `blog_public=0`;
- 1.362 HTTPS- und eine HTTP-Produktionsdomain-Vorkommen in zehn
  WordPress-Kerntabellen serialisierungssicher ersetzt;
- keine Produktionsdomain-Vorkommen in diesen zehn Kerntabellen nach dem
  Ersatz;
- Plugin-spezifische Tabellen und nicht initialisierbare serialisierte
  Plugin-Objekte bewusst unverändert gelassen;
- containerinterner Startseitenabruf: HTTP 200, kein Redirect, 105.560 Bytes,
  `noindex` vorhanden;
- gerendertes HTML: kein Produktionsbezug in `src`, `action`, `iframe`,
  `canonical`, `srcset`, `data-src` oder CSS-URL; ein einzelner manueller
  `href`-Link verbleibt und löst ohne Benutzerinteraktion keinen Request aus.

## Bestandsabgleich und verbindliche Grenze

Der Datenbanksatz vom 14.08.2026 enthält:

- 544 Attachments;
- 90 Seiten;
- 150 Menüeinträge.

Der WXR vom 22.08.2026 enthält 544 Attachments, 91 Seiten und 153
Menüeinträge. Damit ist die technische Wiederherstellbarkeit des vorhandenen
Satzes belegt, nicht aber seine Aktualität als Cutover-Rollbackbasis.

`STAT-014` und `STAT-023` bleiben daher `teilweise bestätigt`. Offen bleiben:

1. externer Review von Gate B und Gate C;
2. aktuelle WordPress-/Plesk-Sicherung unmittelbar vor Cutover;
3. erneuter isolierter Restore dieser aktuellen Sicherung samt Inhaltsabgleich;
4. zeitlich abgegrenzte anonymisierte 404-/Bot-/Error-Baseline;
5. DevOps-Rollback- und Cutover-Freigabe.

Eine WordPress-Abschaltung oder produktive Umschaltung ist nicht autorisiert.
