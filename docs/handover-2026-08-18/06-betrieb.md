# Betrieb und Technik

## Jetzt

- Alte Site: WordPress auf **Plesk**, unangetastet
- Neue Site: dieser Repo, Preview-Pipeline des Projekts
- Parallelbetrieb gewollt, bis Cutover

## Später empfohlen

Linux-Root/VPS (z. B. Hetzner) + Node/Docker, wenn mehrere alte WP-Sites
so umgebaut werden. Plesk kann Node hosten, Root ist für Multi-Mandant
und Payload sauberer.

## Env / Geheimnisse

Keine Produktions-Secrets im Repo. `.env` ist gitignored.
Kontaktformular/Anamnese: derzeit App-intern, kein fremder Host.

## Quality-Checks vor Cutover

```bash
npx tsc --noEmit
npm run build
```

Manuell: Mobile Slider, Kontrast Glas-Karten, alle 18 Hubs, Redirects,
Impressum-Mail, Anamnesebogen-Absenden.

## Restore

```bash
git checkout rp-14-hub-rhythm          # dieser Pause-Stand
git checkout rp-13-hub-fullwidth -- src  # nur Code zurück
```

Tags nicht löschen. Liste: [`docs/migration/12-wiederherstellungspunkte.md`](../migration/12-wiederherstellungspunkte.md).
