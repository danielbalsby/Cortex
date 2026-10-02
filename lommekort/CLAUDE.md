# Lommekort – instruks til Claude Code

Lille statisk side (`template.html` + `build.py` → `dist/index.html`). Hold den lille.

## Ufravigelige regler
- Ingen backend, ingen tracking, ingen localStorage af feltindhold, ingen eksterne scripts/fonte. Intet patientindhold må forlade fanen.
- Urørte felter skal komme ud som "Ikke vurderet" – aldrig udelades stiltiende og aldrig blive "normal"/"negativ".
- Ingen AI-kald og ingen patientspecifik klinisk logik (forslag, røde flag ud fra input). Kortene er emnevalgt opslag.
- Klinisk indhold ændres kun i Obsidian-kortene, aldrig i koden.

## Arbejdsgang
- Byg: `python3 build.py` (eller `--src <mappe>`).
- Test i browser efter ændringer: søg, Tab-flow, `Ctrl+Enter`-kopi, "Ny patient" rydder alt.
- Commit ikke uden at Daniel beder om det.
