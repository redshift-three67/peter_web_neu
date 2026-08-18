# Crawl-Protokoll

## Lauf

| Feld | Wert |
|---|---|
| Zeitpunkt | 18. August 2026 |
| Methode | öffentlich, ohne Login |
| Script | `scripts/wp-public-crawl.py` |
| Nachzug Text | `scripts/wp-reextract-text.py` |
| Quelle | `https://rauch-heilpraktiker.de/page-sitemap.xml` + 3 Extra-URLs |
| Seiten | **64 / 64, HTTP 200, 0 Fehler** |
| Medien | 80 Dateien nach `public/media/wp/` |
| WebP | automatisch erzeugt (PIL, Qualität 78, max. 1800 px) |

## Was der Crawl **kann**

- HTML-Snapshot jeder Seite
- Title, Description, H1–H3, Absätze, Listen
- Sichtbare `img`-URLs
- Klassifizierung A / B / C
- Lokale Kopie der erreichbaren Bilder

## Was der Crawl **nicht** kann (wartet auf Ihre Lieferungen)

- Rank-Math-Felder (Title-Templates, Fokus-Keywords, Canonicals)
- Unkomprimierte Originale aus `wp-content/uploads/`
- Dateien, deren öffentliche URL wegen Umlauten 404/HTML lieferte
- YOOtheme-Builder-JSON
- Geschützte Downloads im Mitgliederbereich
- PDF-Binaries des Downloadbereichs

## Bekannte Lücken der Bild-Pipeline

Einige Dateinamen mit Umlauten (`Homöopathie`, `Übung`, `Nährstoff`) kamen
als HTML statt Bild an. Diese Einträge stehen im JSON mit `local: null`.
Das Uploads-ZIP ersetzt sie.

YOOtheme-`/cache/`-JPEGs sind bereits skalierte Derivate. Originale aus
dem ZIP haben Vorrang.

## Wiederholen

```text
python3 scripts/wp-public-crawl.py      # Netz, neu ziehen
python3 scripts/wp-reextract-text.py    # nur Text aus vorhandenen HTML
```

Danach Katalog neu erzeugen (siehe Entwicklerhandbuch).
