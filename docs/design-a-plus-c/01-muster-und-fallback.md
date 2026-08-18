# Muster Start + NLS und Fallback

Tag vor dem Muster: **`rp-15-pre-aplus-c`** (`ab1d654`)  
Muster-Tag: **`rp-15-aplus-c-muster`**

## Im Browser (ohne Git)

Oben auf `/` und `/nls-diagnostik`:

- **Zurück zum vorherigen Design** → `?look=alt` + localStorage
- **Muster A+C zeigen** → `?look=ac`

Direkt:

- Vorher: `/?look=alt` · `/nls-diagnostik?look=alt`
- Muster: `/?look=ac` · `/nls-diagnostik?look=ac`

Andere Seiten bleiben im alten Look.

## Hart zurück (Git)

```bash
git checkout rp-15-pre-aplus-c -- src src/styles.css
```

Oder ganzen Stand: `git checkout rp-15-pre-aplus-c`
