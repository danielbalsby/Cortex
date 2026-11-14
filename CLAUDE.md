# Cortex – regler for arbejdet

Cortex er ét personligt klinisk værktøj til brug i egne konsultationer i dansk almen praksis (Region Hovedstaden). Det dækker kun bevægeapparatet: skulder, albue, lænderyg, knæ og ankel. Brugeren er læge, ikke udvikler, og har ca. 2 timers udviklingstid ad gangen. Skriv til brugeren på dansk.

Læs `docs/plan.md` før du ændrer noget. `arkiv/` er historik og er ikke retningsgivende.

## Hvad Cortex gør
For den valgte region, i ét flow:
1. **Notat:** hurtig registrering af anamnese og objektive fund → kort notat (`S: / O: / V: / P:`) til at kopiere ind i journalsystemet.
2. **Beslutningsstøtte:** røde flag, differentialdiagnoser, behandling og henvisningskriterier – alt kildebelagt.

## Faste principper (må ikke brydes)
- Cortex supplerer journalsystemet. Det erstatter det ikke.
- Ingen patientidentificerbare data: ingen felter til navn/CPR, intet gemmes efter sessionen (ingen localStorage, cookies eller filer), og intet sendes til eksterne tjenester. Appen foretager ingen netværkskald.
- Hver funktion skal mindske kognitiv belastning i konsultationen eller automatisere arbejde uden klinisk skøn. Ellers ryger den ud.
- Fra regionsvalg til brugbart output: under 10 sekunder. Alt skal kunne betjenes med tastatur.
- Det enkleste, der virker, slår det mest komplette. Foreslå ikke nye frameworks, database eller backend, medmindre det løser et konkret problem bedre end det, der findes.
- Slet ingen filer eller mapper. Det, der ikke længere hører til, flyttes til `arkiv/` og listes for brugeren.
- Notatet indeholder kun det, lægen aktivt har valgt. Tomt input giver tomt notat. Ingen forudfyldte værdier.

## Klinisk indhold
- Ligger adskilt fra kode: én datafil pr. region i `indhold/`. Ingen klinisk logik eller kliniske tekster i komponenter.
- Hvert klinisk punkt (rødt flag, differentialdiagnose, behandling, henvisning) har kilde med årstal og status `UDKAST` eller `GODKENDT`.
- **Kun brugeren sætter `GODKENDT`.** Alt, du skriver eller ændrer, er `UDKAST`. Ændrer du den kliniske tekst i et godkendt punkt, går det tilbage til `UDKAST`.
- Bedste aktuelle evidens gælder. Danske kilder vejer tungest (DSAM, Lægehåndbogen, SST's nationale kliniske retningslinjer, pro.medicin.dk, regionale vejledninger). Udenlandske kilder og alment accepterede beslutningsregler (fx Ottawa) må bruges og mærkes som ikke-danske.
- Er kilder uenige, navngives konflikten. Den harmoniseres ikke.
- Opfind aldrig tal, kriterier eller kilder. Uden kilde: tom kildeliste, som vises "KILDE MANGLER".
- En kilde må kun anføres, hvis den er åbnet og læst i sessionen; notér datoen for tjekket.
- Røde flag vises altid. Betingelser må kun fremhæve et flag, aldrig skjule eller afkræfte det. Skriv aldrig "ingen røde flag".
- Ingen fritekst-ræsonnement uden kilde, ingen diagnosescore, ingen automatiske kliniske beslutninger.

## Teknik
- React + TypeScript, bygget med Vite til **én selvstændig HTML-fil** (`cortex.html` i roden), som åbnes med dobbeltklik på klinikkens pc. Ingen installation, intet netværk.
- `src/` = app, `lib/` = små hjælpefunktioner med tests, `indhold/` = klinisk indhold, `docs/` = plan og gennemgang.
- Kilder, der bruges i flere regioner, står i `indhold/faelles.ts` (en test fanger, hvis samme kilde-id har forskellige oplysninger).
- Tastaturbetjeningen afgøres i `src/tast.ts` (ren funktion med tests); ændringer i tasterne skal have en test dér.
- Efter kodeændringer: `npm run check` (typecheck, tests, build). Buildet opdaterer `cortex.html`, som committes sammen med ændringen.

## Arbejdsgang
- Ét trin ad gangen fra `docs/plan.md`, hvert højst ca. 2 timer. Commit efter hvert trin med en klar besked på dansk.
- Afslut hvert trin med: hvad der er gjort, hvordan det testes på 1 minut, og hvad næste trin er.
- Skeln tydeligt mellem hvad du ved fra koden, hvad du udleder, og hvad du gætter.
