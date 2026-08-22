# Zwischenmeldung – Task 3: WordPress-Abschaltarchiv (Gate A)

## Exakter Wortlaut für den Entwickler

Task 3 „Abschaltarchiv WordPress/Plesk“ ist im WordPress-Teil read-only
umgesetzt und lokal verifiziert. Das ist **Gate A** und noch keine vollständige
Task-3-Freigabe: Plesk-/nginx-Cutoverdaten sowie ein isoliert getesteter Restore
bleiben offen.

Kanonisches Repository:

`C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`

Kanonischer Branch: `relaunch-konzept`

Ausgangscommit:

`444d7dac67577e53e4785d2e6625789468448cf4`

Zu prüfender Evidenzcommit:

`a4a2bba49e4defbd174206d74c48b14c43f03bf7`

## Verifizierter Umfang

1. Vollständiger WXR-Export
   - 5.240.009 Bytes;
   - XML wohlgeformt;
   - 796 Objekte: 91 Seiten, 6 Beiträge, 544 Anhänge, 153 Menüeinträge,
     1 Global-Styles-Objekt und 1 Rank-Math-Content-Editor-Objekt;
   - 84 veröffentlichte und 7 als Entwurf geführte Seiten;
   - SHA-256
     `8AB2ABFB482EFD31621EE9FD47ED1A925107DC339C9BAB93C7EE085BD8DBF755`.
2. Bestehender UpdraftPlus-Satz vom 14.08.2026
   - Datenbank, Plugins, Themes, MU-Plugins, sonstige Dateien und fünf
     Upload-Archive lokal vorhanden;
   - zehn Archivdateien vollständig gehasht;
   - jeder ZIP- und GZIP-Datenstrom vollständig gelesen, keine Lesefehler;
   - kein neuer Backup-Lauf auf Produktion gestartet.
3. WordPress-Admininventar
   - 50 Plugins: 34 aktiv, 16 inaktiv, 9 Updates sichtbar;
   - 1 MU-Plugin und 3 Drop-ins;
   - 4 Themes, aktiv: YOOtheme 2.7.26;
   - 17 HFCM-Snippets, davon 12 aktiv; nur Metadaten inventarisiert;
   - Startseite `Home`, 4 Beiträge je Seite, Suchmaschinen-Abhalteoption aus;
   - Permalinkstruktur `/%postname%/`;
   - drei Administratorrollen nur als anonymisierte Anzahl erfasst;
   - 91 WordPress-Seiten besitzen im WXR keinen Parent-Eintrag.
4. Rank Math
   - vorhandener Globalexport erneut bestätigt;
   - SHA-256
     `DE3A7E86DF1ED7AE93ACBB32EB0839DAC1AE7888E80838B121EDBD502F68CCEC`;
   - kein unnötiger erneuter Export.
5. Vorläufige GSC-Evidenz
   - privater Export vom 22.08.2026 gesichert;
   - trotz Dreimonatsfilter nur ein Datentag, 17 Seitenzeilen und 16/64
     Manifesttreffer;
   - Gate B von Task 2 bleibt geschlossen; fehlende URLs bleiben `unknown`.

## Private Evidenzgrenze

Rohdaten liegen ausschließlich unter:

`C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main\data\private\wordpress-backup\2026-08-22`

Vorläufige GSC-Evidenz liegt ausschließlich unter:

`C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main\data\private\gsc\2026-08-22-preliminary`

Beide Pfade sind Git-ignoriert. Keine Datenbank, kein Backup, kein
Benutzername, kein Schlüssel, kein Log und keine Serverkonfiguration wurde
versioniert.

## Statusgrenzen

- `STAT-012`: `teilweise bestätigt`; belastbare GSC-Baseline offen.
- `STAT-014`: `teilweise bestätigt`; Archivintegrität belegt, Restore offen.
- `STAT-023`: `derzeit nicht prüfbar`; Plesk-/nginx-Paket fehlt.
- Keine Freigabe zur WordPress-Abschaltung.
- Keine Freigabe für Redirects, Deindexierung, Task 5 oder Cutover.
- Produktive WordPress-Inhalte, Plugins, Themes, Plesk, DNS und GSC wurden
  nicht verändert.

## Frische Projektgates

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 74/74 bestanden, Exit 0 |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0, 0 Fehler, 3 bekannte Warnungen |
| Statusmatrix-JSON | syntaktisch gültig |
| `git diff --check` | Exit 0 |
| Private Evidenzpfade | durch `.gitignore` bestätigt |

## Verbindliche Restpunkte

1. Gültigen Plesk-Zugang oder bereinigten Betreiberexport bereitstellen.
2. Host-, nginx-, Redirect-, DNS/TTL-, TLS-, Cache/Proxy-, WAF/CDN-, Cron-,
   Log- und Plesk-Backup-/Rollbackdaten erfassen.
3. Den Archivsatz ausschließlich in einer isolierten Umgebung wiederherstellen
   und den Restore protokollieren.
4. Erst danach Task 3 vollständig freigeben und `STAT-014` beziehungsweise
   `STAT-023` neu bewerten.
