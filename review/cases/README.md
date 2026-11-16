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

Typer: *ukompliceret*, *rødt flag* (flaget kan registreres), *rødt flag, kan ikke registreres* (flaget vises, men intet felt kan fremhæve det), *ret undervejs* (et styrende felt ændres, og afhængige svar ryddes), *patientdata* (CPR i fritekst).

Testsættet kører ikke med `npm run check`, fordi `vite.config.ts` kun medtager `src`, `lib` og `indhold`. Det kan flyttes ind i den almindelige testkørsel i fase 2.
