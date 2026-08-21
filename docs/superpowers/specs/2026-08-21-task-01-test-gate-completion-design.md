# Task 1 Test-Gate Completion Design

## Ziel

`npm test` muss alle vorhandenen `scripts/**/*.test.mjs` plattformübergreifend ausführen, den Exitcode des Node-Testprozesses weiterreichen und bei null gefundenen Testdateien hart fehlschlagen.

## Entscheidung

Ein eigenständiger Runner `scripts/run-tests.mjs` übernimmt rekursive, deterministisch sortierte Testdatei-Ermittlung und Prozesssteuerung. Diese Lösung wird einer festen Dateiliste und einem Shell-Glob vorgezogen: Eine feste Liste übersieht neue Tests, während Shell-/Node-Globs auf Windows und im Nulltrefferfall nicht den benötigten Fehlervertrag garantieren.

## Komponenten

- `scripts/run-tests.mjs`: exportiert Testdatei-Ermittlung und Suite-Ausführung; als CLI setzt es den resultierenden Exitcode.
- `scripts/run-tests.test.mjs`: prüft rekursive Ermittlung, harten Nulltrefferfehler und Exitcode-Weitergabe.
- `package.json`: ruft ausschließlich den Runner auf.
- Masterplan, Vollbericht und beide Statusmatrizen: unterscheiden historische Baseline und belegten Abschlusszustand widerspruchsfrei.
- `docs/developer-handoffs/2026-08-21-task-01-test-gate/`: enthält Fertigmeldung, maschinenlesbaren Status und unabhängigen Prüfauftrag.

## Fehlervertrag

- Keine `*.test.mjs`-Datei gefunden: verständliche Meldung auf stderr, Exitcode 1, kein Child-Prozess.
- Child-Prozess kann nicht gestartet werden: verständliche Meldung, Exitcode 1.
- Child-Prozess endet ungleich null: derselbe Exitcode wird weitergegeben.
- Testdateien werden absolut und sortiert an `node --test` übergeben.

## Abnahme

1. Der Regressionstest wird vor der Implementierung rot beobachtet.
2. `npm test` führt nach Implementierung mindestens 44 Tests aus und meldet 0 Fehler.
3. Ein explizit leerer Testordner liefert Exitcode 1.
4. Typecheck, Lint, Prettier, JSON-/Markdown-Deckung und `git diff --check` bestehen.
5. Der kanonische Branch und GitHub besitzen nach Fast-forward/Push denselben SHA.
6. Die lokale Liveansicht lädt in Chrome ohne Browserfehler.
