# Medien und Slider

## Ablage

| Ort | Inhalt |
|---|---|
| `public/media/originals/` | kuratierte WP-Originale + WebP |
| `public/media/wp/` | älterer öffentlicher Crawl (Cache-Kopien, Fallback) |
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

## Nachziehen der Originale (GitHub, privat)

Das komplette `uploads`-ZIP ist oft zu groß (WordPress speichert pro Bild
5–10 Zuschnitte). **Nicht den ganzen Ordner roh hochladen.**

### Was wir wirklich brauchen

- Originale: `.jpg` `.jpeg` `.png` `.webp` `.svg` `.pdf`
- **Ohne** WordPress-Zuschnitte (`-150x150`, `-300x…`, `-768x…`, `-1024x…`,
  `-scaled`, `-rotated`)
- Besonders: Dateien mit Umlauten (die der öffentliche Crawl nicht holen konnte)

### Empfohlener Weg

1. Neues **privates** GitHub-Repository, z. B. `rauch-uploads-2026`
2. Nur die gefilterten Originale hinein (siehe Handbuch)
3. Repository-Namen hier nennen — der Import holt die Dateien von dort

GitHub-Limits: einzelne Datei unter 100 MB, Repo besser unter ~1 GB.
PDFs und große TIFFs bei Bedarf separat.

