# Medien und Slider

## Ablage

| Ort | Inhalt |
|---|---|
| `public/media/wp/` | öffentlich geholte Originale + WebP |
| `content/wordpress/pages/*.json` → `images[]` | Zuordnung Seite ↔ Datei |
| `public/images/` | neue Leitbilder (kein WP, kein Portrait) |

Dateiname: `{sha1-10}-{sprechender-stamm}.{ext}`  
WebP: gleicher Stamm, Endung `.webp`, max. Kante 1800 px, Qualität 78.

## Slider (Startseite, alt)

YOOtheme `uk-slideshow`, Motive u. a.:

- Naturheilpraxis Augsburg (Raum)
- Bioresonanz / Trikombin
- Körperliche und emotionale Gesundheit
- Zen / Ruhe
- Sanft heilen

**Neu:** keine UIkit-Kopie. Die Motive liegen im Archiv und können als
editoriale Bildstrecke auf der Startseite eingesetzt werden, sobald die
Bild-Freigabe (Phase 4) erfolgt. Bis dahin nutzt die Leit-Startseite die
neuen atmosphärischen Fotos ohne Personenporträt.

## Nachziehen des Uploads-ZIP

1. ZIP nach `content/wordpress/uploads-incoming/` entpacken
2. Script (folgt mit dem ZIP): Originale bevorzugen, Cache-Derivate
   ersetzen, Umlaut-404s schließen
3. Katalog neu bauen
4. Freigabeliste je Bild: behalten / ersetzen / nur Archiv
