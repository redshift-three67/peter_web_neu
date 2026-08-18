# Inhalte und URLs

## Regel

**Alte URL bleibt.** Google soll `/nls-diagnostik` sehen, nicht `/verfahren/frequenz`.
Neue Kurzpfade nur als Redirect auf den WP-Slug.

Volles Inventar: [`docs/migration/02-inventar-urls.md`](../migration/02-inventar-urls.md).

## Datenfluss Text

```
WP live
  → content/wordpress/html + pages/*.json
  → src/content/archive/catalog.json
  → editorialParts / hub-blocks (Chrome weg)
  → HubFromArchive oder Archiv-Artikel
```

Texte der 18 Hubs sind **WP-Wortlaut**, nur strukturiert. Kein Umschreiben
ohne HWG-Freigabe des Auftraggebers.

## Online-Anamnese

- Kanonisch: `/online-anamnesebogen` (alte URL)
- On-Site-Wizard in der neuen App
- `/anamnese` leitet um
- Lovable-App bleibt extern, nur historisch von der **alten** WP verlinkt

## Medien

| Ort | Inhalt |
|---|---|
| `public/media/wp/` | Crawl, bereits WebP |
| `public/media/originals/` | vom Auftraggeber, oft noch ungetrackt vor diesem Push |
| `public/images/` | Start-Motive (Hände, Kräuter, Wald, Anfahrt) |

Zuordnung Live → Datei: [`docs/migration/10-bildzuordnung.md`](../migration/10-bildzuordnung.md).

## Mail / NAP

```
Peter Rauch
Naturheilpraxis Rauch
Friedrich-Deffner-Straße 19a
86163 Augsburg-Hochzoll
Tel 0821 2621462
praxis_rauch@icloud.com
```

Keine `info@rauch-heilpraktiker.de` mehr in der neuen App.
