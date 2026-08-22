# Offene Punkte und Lieferungen

## Task 3: Abschaltarchiv – verifizierter Zwischenstand vom 22.08.2026

| Paket | Received | Verified | Datum | Prüfer | Nachweis und Grenze |
|---|---:|---:|---|---|---|
| Vollständiger WordPress-WXR-Export | ja | ja | 22.08.2026 | Codex | XML wohlgeformt; 796 Objekte, darunter 91 Seiten, 544 Anhänge und 153 Menüeinträge; SHA-256 `8AB2ABFB482EFD31621EE9FD47ED1A925107DC339C9BAB93C7EE085BD8DBF755` |
| Bestehender UpdraftPlus-Satz vom 14.08.2026 | ja | ja, Dateiintegrität und isolierter Restore | 22.08.2026 | Codex | Datenbank, Plugins, Themes, MU-Plugins, sonstige Dateien und fünf Upload-Archive vollständig lokal; 32.257 Nutzdateien und 166 Tabellen isoliert wiederhergestellt; Einzelhashes im privaten Inventar |
| WordPress-Admininventar | ja | ja | 22.08.2026 | Codex | 50 Plugins (34 aktiv, 16 inaktiv), 1 MU-Plugin, 3 Drop-ins, 4 Themes, 17 HFCM-Snippets (12 aktiv), Lesen-/Permalinkwerte, drei Administratorrollen ohne Personenangaben und flache Seitenhierarchie erfasst |
| Rank-Math-Globalexport | ja | ja | 22.08.2026 | Codex | Vorhandener Export erneut gehasht; SHA-256 `DE3A7E86DF1ED7AE93ACBB32EB0839DAC1AE7888E80838B121EDBD502F68CCEC`; kein erneuter Export erforderlich |
| Plesk-/nginx-/DNS-/TLS-Paket | ja | ja, mit Grenzen | 22.08.2026 | Codex | Read-only in Plesk 18.0.79 erfasst: `httpdocs`, HTTPS-301, leere zusätzliche Apache-Direktiven, nginx-Proxy/HTTP3/Static-Serving/Cache, PHP-FPM 8.2.33, 18 DNS-Einträge und TTL/SOA, TLS/HSTS ohne Schlüssel, WAF, keine Cronjobs, sieben gültige Plesk-Backups und vorhandener Restoreweg; Plesk-Satz nur vom 03.–09.06.2026 und Abo-Zeitplan deaktiviert; bereinigtes Inventar privat; aktuelle Rollbackbasis und zeitlich abgegrenzte Logbaseline offen |
| Isolierter Restore des Updraft-Satzes vom 14.08.2026 | ja | ja, mit Altersgrenze | 22.08.2026 | Codex | Docker-Netz `--internal`, keine Default-Route, DB ohne Hostport, WordPress-HTTP intern geprüft: 200, kein Redirect, `noindex`; 166 Tabellen, 544 Attachments, 90 Seiten und 150 Menüeinträge. WXR vom 22.08.2026 enthält 91 Seiten und 153 Menüeinträge; daher keine aktuelle Cutover-Rollbackfreigabe |
| Externe Gate-B-/Gate-C-Reviews | ja | ja, ohne Findings | 22.08.2026 | unabhängiger Entwickler/LLM | `RAUCH-TASK-03-GATE-B-INFRA-REVIEW` und `RAUCH-TASK-03-GATE-C-RESTORE-REVIEW` jeweils `freigegeben`; die Reviews bestätigen ausschließlich Inventarisierung und historischen Restore, nicht aktuelle Rollbackbasis oder Cutover |

Die Roharchive und die bereinigten Vollinventare liegen ausschließlich unter
`data/private/wordpress-backup/2026-08-22/` und
`data/private/plesk/2026-08-22/`. Diese Pfade sind durch `.gitignore` gesperrt.
Keine Rohdatei, Datenbank, Benutzerangabe, Schlüssel, personenbezogene
Logzeile oder interne Serverkennung wird in Git übernommen.

Der bestehende Updraft-Satz wurde erfolgreich isoliert wiederhergestellt. Das
ist noch **keine Abschalt- oder Cutover-Freigabe**: Die Datenbank stammt vom
14.08.2026 und liegt gegenüber dem WXR vom 22.08.2026 um eine Seite und drei
Menüeinträge zurück. `STAT-014` bleibt deshalb bis zu einer aktuellen,
wiederhergestellten Cutover-Sicherung teilweise bestätigt. `STAT-023` bleibt
ebenfalls teilweise bestätigt; zusätzlich fehlen die zeitlich abgegrenzte
anonymisierte Logbaseline, eine aktuelle Rollbackbasis und die
DevOps-Cutover-Freigabe.

Die externen Gate-B- und Gate-C-Reviews wurden ohne Findings freigegeben und
sind unter `docs/developer-handoffs/2026-08-22-task-03-wordpress-archive/`
maschinenlesbar dokumentiert. Die genannten Restgates bleiben dadurch
unverändert bestehen.

## Erhalten

1. Rank-Math-Settings — [08-rank-math.md](./08-rank-math.md)
2. WP-Uploads — [09-uploads-inventar.md](./09-uploads-inventar.md)
3. Bild-Freigabe Archiv — [10-bildzuordnung.md](./10-bildzuordnung.md)
4. Design-Referenz Lovable (Look, nicht Runtime)

## Noch von Ihrer Seite

1. **Aktivierungsreihenfolge** der Archivseiten (welche zuerst öffentlich)
2. Optional: Rank-Math-**Seiten**-Export (Title/Description je URL)
3. **PDFs** aus dem Downloadbereich – Binaries fehlten im Crawl, Seite `/downloadbereich-naturheilpraxis-rauch` ist vorbereitet.
4. ProvenExpert-Widget (optional)
5. Freigabe der **HWG-Texte** Seite für Seite (Wortlaut ist noch WP-Original)
6. Unmittelbar vor Cutover eine **aktuelle WordPress-/Plesk-Rollbackbasis** erzeugen, isoliert wiederherstellen und fachlich freigeben; niemals gegen die laufende Produktionswebsite testen
7. Unmittelbar vor Cutover eine zeitlich abgegrenzte, anonymisierte **404-/Bot-/Error-Baseline** erzeugen; keine IPs, Referrer oder vollständigen Logzeilen versionieren

## Wiedervorlage / später

- Lovable-App (Workflow, Login, Infothek) — weiter standalone
- Cutover (DNS, 301, Search Console)
- Payload-CMS / Multi-Mandant
