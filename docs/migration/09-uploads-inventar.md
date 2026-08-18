# Uploads-Inventar (18.08.2026)

Quelle: GitHub `content/wordpress/uploads-incoming/`  
7 Commits *Add files via upload* (`ba35db2` … `01b5d4b`).

## Mengen

| Menge | Zahl |
|---|---|
| Dateien gesamt | 660 + README |
| Volumen | 131,7 MB |
| JPG/JPEG | 557 |
| PNG | 39 |
| SVG | 50 |
| WP-Zuschnitte (`-300x200` etc.) | 135 |
| Theme-Dummies (YOOTheme Florence) | 184 Originale |
| Praxis-relevante Originale übernommen | 120 |
| WebP erzeugt | 117 |

## Umlaut-Dateien ( endlich vollständig)

GitHub zeigt sie mojibake (`Ф`/`Д`/`Ъ`). Inhaltlich sind das die fehlenden Originale:

- `Homöopathie_Augsburg_1.jpg`
- `Klassische-Homöopathie-nach-Hahnemann-Augsburg.jpg`
- `Vital_und_Nährstoffanalyse.jpg`
- `Naet-Allergiebehandlung-Pollen-Gräser.jpg`
- `Wirbelsäule-Halswirbel-Schmerztherapie-Behandlung.jpg`
- `Zhineng_Qi_Gong_Übung_Augsburg_*.jpg` (5 Varianten)
- `AdobeStock_…-Herzvariabilität-Vieva.jpeg`

Sanitized-Kopien liegen unter `public/media/originals/`  
z. B. `Homoeopathie_Augsburg_1.jpg` + `.webp`.

## Bewusst nicht übernommen

- WordPress-Zuschnitte
- YOOTheme-Dummies (`home-*`, `company-*`, `lexa-*`, `motorcycle-*`, `yoga-*`, `work-*`)
- Pixabay/Pexels-Masse (Stock, oft thematisch unpassend)
- `mc4wp-debug-log.php`, `fgj2wpp.log`, leere Datei `motorcycle-image-bg-02.jpg`
- BMP `Hörorgang-rechts.bmp` (Sonderformat, bei Bedarf konvertieren)

## Ablage

- Roh-Upload bleibt nur auf GitHub: `content/wordpress/uploads-incoming/`
- Kuratiert + WebP: `public/media/originals/`
- Maschinen-Inventar: `content/wordpress/uploads-incoming/INVENTAR.json`

Einzelbild-Freigabe fürs Frontend folgt schrittweise (Praxisporträt, Slider, Verfahren).
