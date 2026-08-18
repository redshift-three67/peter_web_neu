# Hier die WordPress-Originale ablegen

Pfad im Repo:

```text
content/wordpress/uploads-incoming/
```

## Was hierhin kommt

- Originale aus `wp-content/uploads/` (Jahre als Unterordner sind in Ordnung)
- Formate: `.jpg` `.jpeg` `.png` `.webp` `.svg` `.pdf`
- Besonders Dateien mit Umlauten

## Was nicht hierhin kommt

- WordPress-Zuschnitte (`-150x150`, `-300x…`, `-1024x…`, `-scaled`)
- nichts nach `public/media/wp/` (das sind bereits verarbeitete Kopien)
- nichts nach `public/images/` (neue Leitbilder)

Einzelne Datei unter 100 MB. Nach dem Upload kurz Bescheid geben.
