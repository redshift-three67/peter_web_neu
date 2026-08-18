# Rank Math — eingespielter Settings-Export

Datei: `content/wordpress/rank-math-settings.json`  
Quelle: Rank Math → Status & Tools → Export, 18.08.2026, 06:10 UTC.

## Was diese Datei ist — und was nicht

| Enthalten | Nicht enthalten |
|---|---|
| Globale Titles-Templates | **Keine** Seitentitel / Meta-Descriptions je URL |
| Local-SEO (Adresse, Telefon, E-Mail) | Keine Fokus-Keywords je Seite |
| robots.txt der alten WP | Keine 301-Tabelle (Array ist **leer**) |
| Google-Site-Verification | Kein Medienkatalog |
| Social-URLs, Logo, OG-Bild | Keine Alt-Texte der Bilder |

Für Einzelseiten bräuchte es einen **zweiten** Export (WP All Export / SQL)
der Felder `_rank_math_title` und `_rank_math_description`. Das ist
optional: die öffentlichen Title-Tags haben wir bereits mitgecrawlt.

## Übernommen ins neue System

- E-Mail bestätigt: `info@rauch-heilpraktiker.de`
- Google-Site-Verification (Search Console bleibt gültig)
- Facebook- und Google-Places-URL in Schema `sameAs`
- NAP bleibt: Friedrich-Deffner-Straße 19a, 86163 Augsburg, 0821 2621462

## Bewusst **nicht** 1:1 übernommen

1. **robots.txt** der alten Site ist schädlich:
   - `Googlebot` darf `page-sitemap.xml` nicht crawlen
   - `Googlebot-Image` darf `/wp-content/uploads/` nicht crawlen
   - Applebot, Yandex, Qwantify komplett gesperrt
   - Dutzende Theme-Demo-URLs (YOOtheme-Reste, WooCommerce-Dummies)
   - Tippfehler-Slugs und XML-Müll als Disallow
   Neue robots.txt bleibt schlank (siehe `public/robots.txt`).
2. **Schema-Typ** `HealthAndBeautyBusiness` + Knowledge Graph `company`
   ist für eine Heilpraktiker-Praxis zu schwach. Neu: `MedicalBusiness`
   + `Person`.
3. **Öffnungszeiten** in Rank Math: 10–19 ohne Mittagspause. Die
   Website und das Impressum nennen 10–12:30 / 13–19. Wir behalten
   die genauere Variante.
4. **Content-AI-Sprache** stand auf *Dutch* — ignorieren.
5. **Seitentitel-Template** `%title% | %sitename%` und Description
   `%title%` sind generisch. Öffentlich gecrawlte Titles bleiben die
   Basis, bis ein Seiten-Export kommt.
6. **Homepage-Description** war leer. Die neue Startseite hat einen
   eigenen Text.

## Historische Disallows (für 301-Planung relevant)

Aus der alten robots.txt lesen wir **alte, nicht mehr in der Sitemap
stehende Slugs**, die beim Cutover 301 brauchen, falls sie noch
Backlinks haben, u. a.:

- `/naet-allergie-behandlung/` → `/naet-methode-allergie-behandlung/`
- `/coaching-und-burnout/` → `/psychotherapie-augsburg/`
- `/osteopathie-augsburg/` → `/osteopathie-techniken/` bzw. Manuell-Hub
- `/lowen-systems-frueher-biovalent-system/` → `/lowen-systems-biovalent-system/`
- `/vieva-pro-vitalanalyse/` → `/vieva-pro-herzratenvariabilitaet/`
- `/datenschutzerklaerung-2/` → `/datenschutz`
- `/schmerzbehandlung/` → `/schmerztherapie-augsburg/`
- `/allergie-behandlung/` → Allergie-Hub
- diverse Tippfehler (`darmsaniereung`, `behandlunsgmoeglichkeiten`)

Diese Liste gehört in die Cutover-301-Tabelle, nicht in robots.txt.
