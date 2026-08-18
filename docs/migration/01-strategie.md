# Strategie — paralleler Neuaufbau

## Ziel

Die öffentliche Website `rauch-heilpraktiker.de` wird **nicht** auf der
bestehenden WordPress-/YOOtheme-Installation „repariert“. Es entsteht ein
zweiter, moderner Auftritt mit gleicher Domain-Logik. Die alte Seite bleibt
bis zum Cutover die öffentliche Wahrheit.

## Leitplanken

1. **Domain und Slugs sind Kapital.** Jede bisher indexierte URL wird
   übernommen. Umbenennung nur per bewusstem 301 nach Freigabe.
2. **64 Seiten zuerst inaktiv.** Status `draft`, `robots: noindex,follow`,
   nicht in der Hauptnavigation, nicht in der öffentlichen Sitemap der neuen
   Site. Layout bereits neu.
3. **Texte 1:1 portieren.** Keine inhaltliche Umschreibung, bis eine Seite
   zur Aktivierung freigegeben ist. Der neue Rahmen (Byline, Disclaimer, CTA)
   umschließt den Alttext, verfälscht ihn nicht.
4. **Lovable-App bleibt standalone.**
   `https://naturheilpraxis-rauch.lovable.app/` wird **nicht** in den neuen
   Auftritt integriert. Sie bleibt über den bestehenden Link der **alten**
   WordPress-Seite erreichbar. `/online-anamnesebogen/` ist auf der neuen
   Site nur eine vorbereitete Hülle.
5. **Designreferenz:** Lovable-UI (Playfair Display, Source Sans 3,
   Salbei/Sand/Terrakotta), sofern E-E-A-T 2026 eingehalten wird — das ist
   der Fall. YOOtheme Florence / UIkit wird nicht nachgebaut.
6. **Bilder:** öffentlich crawlbare Dateien sofort ins Archiv + optimieren.
   Originale aus dem späteren Uploads-ZIP ersetzen Cache-Derivate.
7. **Slider:** Motive übernehmen, Darstellung neu (editoriale Strecke, kein
   `uk-slideshow`).
8. **Keine Heilversprechen, keine App-Gesundheitsdaten** auf der neuen Site,
   solange die App nicht gesondert abgenommen ist.

## Phasen

| Phase | Inhalt | Gate |
|---|---|---|
| 0 | Neue Shell, Leitseiten, Schema | erledigt (Vorschau) |
| 1 | Öffentlicher Crawl, 64 Entwürfe, Medienarchiv | **läuft jetzt** |
| 1b | Rank-Math-Export + Uploads-ZIP einspielen | wartet auf Auftraggeber |
| 2 | Entwürfe im neuen Design sichtbar (intern/Vorschau) | nach Phase 1 |
| 3 | Freigabe Seite für Seite → `published` | Auftraggeber |
| 4 | Bild-Freigabe einzeln | Auftraggeber |
| 5 | Cutover (301, Search Console, GBP) | eigene Freigabe |
| 6 | Lovable-App — eigene Sicherheits- und Funktionsanalyse | ausdrücklich später |

## Cutover (nicht jetzt)

- Alte WP auf Plesk bleibt Fallback.
- Nur `published`-Seiten in die Sitemap.
- Trailing Slash: WordPress nutzt `/slug/`. Eine Richtung festlegen, die
  andere 301en. Nie beide indexieren.
- Lovable-App unangetastet.

## Was dieser Ordner beweist

Jeder Schritt ist nachvollziehbar: Crawl-Manifest mit Zeitstempel,
HTML-Snapshots, JSON je Seite, Changelog. Ein späterer Entwickler kann den
Stand ohne Chatverlauf rekonstruieren.
