# Zwischenmeldung – Task 3 Gate B: Plesk-/nginx-Infrastruktur

## Entscheidungsstand

Das Plesk-/nginx-Paket aus Masterplan §2.4 ist am 22.08.2026 read-only
erfasst und im Evidenzcommit
`e22b715cd90739c6eb9406b231a4edb659a97055` dokumentiert.

Dieser Stand schließt **nur die Inventarisierung der Infrastruktur**. Er ist
keine WordPress-Abschalt-, Restore-, Rollback- oder Cutover-Freigabe.
`STAT-023` ist deshalb korrekt auf `teilweise bestätigt` gesetzt;
`STAT-014` bleibt `teilweise bestätigt`.

## Kanonischer Prüfbereich

- Repository:
  `C:\Users\Hubert111\Documents\rauch_18_08_26_19_42\repo-main`
- Branch: `relaunch-konzept`
- Evidenzcommit: `e22b715cd90739c6eb9406b231a4edb659a97055`
- Privates, ignoriertes Inventar:
  `data/private/plesk/2026-08-22/plesk-inventory.json`

## Read-only bestätigte Infrastruktur

- Plesk Obsidian 18.0.79; Abo und beide Domains aktiv.
- Hosting-Typ Website, Document Root `httpdocs`, bevorzugte Domain
  `rauch-heilpraktiker.de`.
- SSL/TLS und direkte HTTP-zu-HTTPS-301-Weiterleitung aktiv.
- Zusätzliche Apache-Anweisungen für HTTP und HTTPS leer; allgemeine
  Apache-Werte auf Serverstandard.
- nginx-Proxymodus, HTTP/3, intelligente statische Verarbeitung, direkte
  nginx-Auslieferung statischer Dateien und nginx-Cache aktiv.
- nginx-Cache: 64 MB, 30 Tage; maximale HTTP-Anfragegröße 128 MB.
- PHP 8.2.33 als dedizierte FPM-Anwendung über nginx; OPcache aktiv.
- Lokaler DNS-Dienst aktiv; 18 Einträge; Standard-TTL 1 Tag; SOA-Werte
  erfasst. Token-/Schlüsselwerte wurden nicht übernommen.
- Let’s-Encrypt-Zertifikat bis 13.10.2026 mit automatischer Verlängerung;
  HSTS und automatische Absicherung aktiv; OCSP-Stapling aus.
- Hauptdomain, `www` und `peter` geschützt; Plesk meldet `webmail` noch als
  nicht geschützt und eine automatische Ausstellung als ausstehend.
- Web Application Firewall im Blockiermodus mit Comodo-Regelsatz auf Apache
  ModSecurity 2.9; keine sichtbaren Regelausschlüsse.
- Keine geplanten Aufgaben im Abo.
- Sieben von Plesk als gültig ausgewiesene Backups: Vollbackup vom 03.06.2026
  plus sechs Inkremente bis 09.06.2026; Restorelinks vorhanden.
- Der abonnementspezifische Backupzeitplan ist deaktiviert. Der Plesk-Satz ist
  deshalb keine aktuelle Cutover-Rollbackbasis.
- Access-/Warning-/Error-Logs sind verfügbar. Eine Stichprobe mit 1.000
  sichtbaren Datensätzen wurde ausschließlich im Browser aggregiert;
  IP-Adressen, URLs, Referrer, User-Agents und Logrohdaten wurden weder
  gespeichert noch versioniert. Die Werte sind Vorkommensindikatoren, keine
  eindeutigen Requestzahlen und keine zeitlich abgegrenzte Betriebsbaseline.

## Produktions- und Datenschutzgrenze

- Kein Speichern, Anwenden, Erneuern oder Ändern einer Plesk-, DNS-, TLS-,
  PHP-, nginx-, Apache-, WAF-, Cron- oder Backup-Einstellung.
- Kein neues Backup, kein Backupdownload, kein Restore, kein Löschen.
- Kein Zugriff auf private Schlüssel und keine Zertifikatsdownloads.
- Keine Rohlogs, IP-Adressen, Benutzerkennungen, Passwörter oder Tokens in
  Git beziehungsweise in der bereinigten Dokumentation.

## Frische Verifikation

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 74/74 bestanden |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0; 3 bekannte Warnungen |
| `npm run build` | Exit 0; bekannte Chunkgrößenwarnung |
| Statusmatrix-JSON | gültig |
| privates Plesk-Inventar-JSON | gültig |
| `git diff --check` | Exit 0 |
| privater Evidenzpfad | durch `.gitignore` bestätigt |
| Evidenzcommit auf GitHub | synchronisiert |

## Verbindliche Restgates

1. Den vorhandenen WordPress-Archivsatz ausschließlich in einer isolierten
   Umgebung wiederherstellen und das Ergebnis protokollieren.
2. Vor Cutover eine zeitlich abgegrenzte, anonymisierte
   404-/Bot-/Error-Baseline erstellen.
3. Eine aktuelle, getestete Rollbackbasis festlegen; der Plesk-Satz vom Juni
   allein genügt nicht.
4. Erst danach `STAT-014` und `STAT-023` erneut bewerten. Bis dahin bleiben
   WordPress-Abschaltung und Cutover gesperrt.
