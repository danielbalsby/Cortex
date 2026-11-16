# Testsæt: fiktive konsultationer

21 fiktive konsultationer (3–6 pr. region) i `cases.ts`. Hver køres gennem samme logik som appen (`saetSvar`, `bygNotat`, `flagStatus`), og output gemmes som læsbart snapshot i `snapshots/<id>.md`: notat, alle røde flag med status, differentialdiagnoser og henvisninger (afkrydsede markeret).

Kør (fra repo-roden):

```bash
npx vitest run --config review/vitest.config.ts
```

Fejler en test, har et notat, et flag eller en liste ændret sig. Se forskellen i den fejlende test. Er ændringen tilsigtet, opdateres snapshots med `-u`:

```bash
npx vitest run --config review/vitest.config.ts -u
```

Desuden ét fuldt indholdssnapshot pr. region (`snapshots/indhold-<region>.md`): alle felter med notatsætninger, røde flag med tekst, handling og betingelse, differentialdiagnoser, behandling, henvisning og kilder. Enhver ændring af klinisk tekst gør testen rød (afprøvet ved at ændre én flaghandling).

Typer: *ukompliceret*, *rødt flag* (flaget kan registreres), *rødt flag, kan ikke registreres* (flaget vises, men intet felt kan fremhæve det), *ret undervejs* (et styrende felt ændres, og afhængige svar ryddes), *patientdata* (CPR i fritekst).

Testsættet kører også med `npm run check` (fra fase 2, trin 1).
