# Nächste Schritte nach der Pause

**Design A+C ist festgelegt** (Live noch unverändert):
[`docs/design-a-plus-c/00-FESTLEGUNG.md`](../design-a-plus-c/00-FESTLEGUNG.md) · Muster `/design-a-plus-c.html`

Reihenfolge vorschlagen, Auftraggeber entscheidet.

1. **Optik der 18 Hubs abnehmen** (NLS + Naturheilkunde als Muster).
2. **PDFs** in `public/downloads/` legen, Download-Seite verdrahten.
3. **HWG-Review** der 18 Texte, danach erst Feinschliff Wortlaut.
4. Archiv-Rest (~46) nur aktivieren, wenn inhaltlich gebündelt oder 301.
5. Menü-Kinder ohne Hub (Vieva, EAV, Darm, BIT) entweder Hub-Welle 4
   oder auf Übersicht belassen.
6. Lovable-Umzug: erst nach App-Fertigstellung, eigene Sicherheitsanalyse.
7. Cutover: Server-301, Sitemap an GSC, alte WP auf Redirect-only.
8. Payload-Admin, wenn Redaktion ohne Entwickler arbeiten soll.

Offene Lieferungen: [`docs/migration/07-offene-punkte.md`](../migration/07-offene-punkte.md).

## Wiederherstellungspunkte (kurz)

| Tag | Bedeutung |
|---|---|
| `rp-01` … `rp-07` | Design/Slider-Feinschliff |
| `rp-08-archive-skin` | Archiv in Start-Haut |
| `rp-09` `rp-10` `rp-11` | Hub-Wellen 1–3 |
| `rp-12` `rp-13` | Hub-UX, volle Breite |
| `rp-14-hub-rhythm` | **Pause / Übergabe** |
