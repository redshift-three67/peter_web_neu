# Übergabe 18. August 2026 — Pause

**Repo:** [redshift-three67/peter_web_neu](https://github.com/redshift-three67/peter_web_neu)  
**Branch:** `main`  
**Stand-Tag:** `rp-14-hub-rhythm`  
**Dieser Ordner** ist der Einstieg für Entwickler, Grafik und Technik.
Die laufende Migrationsakte liegt zusätzlich in [`docs/migration/`](../migration/00-README.md).

| Rolle | Zuerst lesen |
|---|---|
| Alle | dieses Blatt + [01-lagebild.md](./01-lagebild.md) |
| Grafik / UX | [03-design-system.md](./03-design-system.md) |
| Entwickler | [02-architektur.md](./02-architektur.md) + [04-inhalte-und-urls.md](./04-inhalte-und-urls.md) |
| SEO / Recht | [05-seo-eeat-geo.md](./05-seo-eeat-geo.md) |
| Technik / Hosting | [06-betrieb.md](./06-betrieb.md) |
| Weiterarbeiten | [07-naechste-schritte.md](./07-naechste-schritte.md) |

## Eine Minute Lage

Paralleler Neuaufbau von **rauch-heilpraktiker.de** (WordPress + YOOtheme bleibt live).
Neue App: TanStack Start, React 19, Tailwind v4. **18 Hub-URLs** liegen auf den
**alten WordPress-Pfaden**. Design-Referenz ist die Startseite und die Lovable-App
(nur Look). Lovable-Funktionen sind **nicht** angebunden.

## Nicht anfassen ohne Rückfrage

- Alte Domain / Plesk / WordPress (Cutover erst nach Freigabe)
- Wortlaut der WP-Texte (HWG-Review durch Auftraggeber)
- Lovable-App unter naturheilpraxis-rauch.lovable.app
- Rankings: keine neuen Kurz-URLs für die 18 Hubs

## Start lokal

```bash
git clone https://github.com/redshift-three67/peter_web_neu.git
cd peter_web_neu
git checkout main
git tag --list 'rp-*'
npm install
npm run dev
```

Vorschau folgt der Projekt-Pipeline. Production-Build: `npm run build`.
