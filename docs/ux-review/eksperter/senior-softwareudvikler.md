# Ekspertevaluering: Senior softwareudvikler

Simuleret perspektiv. Dato 2026-11-15, commit `0066f2b`. Egne kørsler: Playwright/Chromium mod `cortex.html` (1920×1080). Tests og build er ikke kørt. Timeestimater er skøn for én ikke-udvikler med AI-assistent.

## 1. Samlet dom

Kodebasen er lille, ren og usædvanligt vedligeholdbar (ca. 1.000 linjer logik, indhold adskilt fra kode), og garantien "ingen patientdata" holder teknisk.
Men de to ting, lægen skal kunne stole blindt på, er ikke teknisk sikret: at et registreret fund ikke forsvinder uden varsel, og at "GODKENDT" betyder det samme som den tekst, der vises.
Dommen er derfor: frigiver overskud i registreringen, men koster tillid. Det kan rettes på 4–5 aftener uden ny arkitektur.

## 2. Top 5 problemer

**1. Registrerede fund kan forsvinde med ét tryk – fire forskellige veje, ingen fortryd. Alvorlighed: høj.** Scenarie A og E.
- `[APP]` Klik på det allerede valgte "Traume = Ja" fravælger det og sletter 9 svar (notat fra 552 til 237 tegn). Sættes Ja igen, kommer de ikke tilbage. `[KODE]` `lib/notat.ts:28-33`, `Felter.tsx:97`, `lib/tastatur.ts:37`.
- `[APP]` Holdt `Esc` rydder alt: to `keydown` fra tastaturets autogentagelse tæller som dobbelt-Esc. `[KODE]` `App.tsx:90-98` tjekker ikke `event.repeat`.
- `[APP]` Holdt taltast besvarer felt efter felt: 6 gentagelser af `1` gav seks svar, herunder "Intet traume" og "Ingen låsning". Samme årsag.
- `[APP]` Klik på den aktive regionsknap rydder alt (jf. faktagrundlag 3.7, genprøvet).
- Konsekvens: lægen opdager det først, når notatet er kopieret, eller slet ikke. Et notat, der mangler fund, uden at lægen ved det, er værre end intet notat.
- Forslag: ignorér `event.repeat` (0,5 t inkl. test i `tast.test.ts`). Ét fortrydelsestrin i hukommelsen, `Ctrl+Z` gendanner forrige `svar`/`valgte`/`region` (1–1,5 t). Klik på aktiv region gør ingenting (10 min). Risiko: lav.

**2. GODKENDT er en håndskrevet tekststreng uden binding til den godkendte tekst. Alvorlighed: høj.** Alle scenarier.
- `[KODE]` `indhold.test.ts:83-88` kræver kun kilde og dato. Reglen "ændret tekst → UDKAST" i `CLAUDE.md` håndhæves af ingen test. En AI-assistent, der retter en stavefejl eller en `fremhaevHvis`-betingelse i et godkendt flag, efterlader det grønne mærke.
- `[KODE]` Status dækker `tekst`, `handling`, `fremhaevHvis` og `konflikt` under ét (`typer.ts:17-22`), og en ændret kilde (`aar`, `sidstTjekket`) påvirker ingen af de punkter, der bruger den.
- Konsekvens: det grønne mærke kan med tiden komme til at stå på tekst, lægen aldrig har læst. Det er projektets vigtigste sikkerhedsløfte.
- Forslag: fingeraftryk pr. punkt (se punkt 6). Mindste udgave: en test, der sammenligner en hash af hvert godkendt punkts indhold med en gemt værdi og fejler med punktets id (2 t). Risiko: lav; ingen ændring i appens opførsel.

**3. Fremhævningen af røde flag er utestet klinisk logik. Alvorlighed: høj.** Scenarie A, C, E.
- `[KODE]` Selve reglen ligger i en komponent (`Beslutningsstoette.tsx:43`), ikke i `lib/`. Testene kontrollerer, at betingelser peger på eksisterende felter (`indhold.test.ts:94-96`), ikke at et bestemt sæt fund fremhæver et bestemt flag.
- `[APP]` Scenarie A med "Hævelse straks = Nej" (patienten fik hævelse efter timer) og moderat hævelse fremhæver intet, selv om flagteksten nævner "hæmartron i løbet af få timer". Om det er rigtigt, er et fagligt spørgsmål `[KRÆVER FAGLIG KILDEKONTROL]`: skal hævelse inden for timer kunne registreres og fremhæve?
- `[APP]` Scenarie E: låsning alene fremhæver intet; kræver også "svært nedsat bevægelighed".
- Konsekvens: en fejlrettelse i et felt-id eller en betingelse kan slukke en fremhævning, uden at noget bliver rødt i `npm run check`.
- Forslag: flyt reglen til `lib/` (15 min) og skriv én tabeltest med scenarie A–E som faste eksempler: "disse svar → disse flag-id'er" (1,5 t). Lægen godkender tabellen én gang.

**4. Man kan ikke se, hvad `N` har sat. Alvorlighed: høj** (klinisk), men billig. Scenarie A, B.
- `[KODE]` `Svar` gemmer kun værdien (`typer.ts:92`). `[APP]` I scenarie A dokumenterer ét `N` ti fund, heraf de fem, der afgør akut røntgen.
- En egentlig tre-tilstands-model er efter min vurdering unødvendig: modellen har allerede "positivt" (valg), "undersøgt og negativt" (valg med `normal`) og "ikke undersøgt" (fravær). Det, der mangler, er oprindelsen. `[UDLEDT]`
- Billig løsning (2 t): en liste `satViaN` i `App.tsx` ved siden af `svar`; `udfyldNormale` returnerer, hvilke felter den satte; et felt forlader listen, når lægen rører det; knappen får en afvigende kant, og `N` igen fortryder dem samlet. Notatteksten ændres ikke. Rører `App.tsx`, `tastatur.ts`, `Felter.tsx`, `styles.css` og to tests.
- Dyr løsning (5–8 t, 3–4 aftener, frarådes): `Svar` ændres til `{vaerdi, kilde}`. Rører `passer`, `feltTekst`, `saetSvar`, `vaelgMedTal`, alle komponenter og ca. 25 tests. Høj risiko for at ødelægge noget, der virker.
- Hvilke felter `N` må sætte, er et fagligt valg `[KRÆVER FAGLIG KILDEKONTROL]`; teknisk koster det én linje pr. felt (præcedens: rektaleksploration).

**5. Det er ukendt, hvilken version der kører, og den offentlige udgave udrulles uden kontrol. Alvorlighed: middel.**
- `[KODE]` Appen viser intet build-tidspunkt eller commit. Klinikkens `cortex.html` er en kopieret fil; intet fortæller, om den er forældet.
- `[APP]` (jf. faktagrundlag) Vercel-udgaven svarer, selv om `docs/plan.md:213` siger, at den ikke bruges. `[UDLEDT]` Den følger formentlig `main` automatisk, altså også UDKAST og fejl.
- Forslag: build-dato og commit i bundlinjen via Vite `define` (0,5–1 t). Beslut Vercel: afbryd koblingen, eller skriv i planen, at den bruges. Ingen kode.

## 3. Måltal pr. scenarie

Tastetryk er målt i appen af mig (inkl. regionsvalg og `N`). Museklik og rulning er fra faktagrundlaget. Resten er skøn.

| Scenarie | Tastetryk (målt) | Museklik V+P (jf. faktagrundlag) | Opslag uden for Cortex (skøn) | Blik væk fra patient (skøn) | Tid (skøn) |
|---|---|---|---|---|---|
| A | 20 | 2 + rulning ca. 5 skærmhøjder | 0–1 (CVI-kontakt) | 3–4 | 60–90 s |
| B | 14 | 2–3 + rulning | 0 | 2–3 | 40–60 s |
| C | 12 (13 med `N`) | 1–2 + rulning | 1 (telefonnummer) | 2–3 | 30–45 s, heraf mest rulning |
| D | 5, derefter fritekst | – | 1–2 (børn/hofte) | ukendt | ikke meningsfuldt |
| E | 18 | 1–2 + rulning | 1 (akut eller subakut?) | 3–4 | 60–90 s |

`[APP]` Beslutningsstøtten er 6.536 px høj ved tomt knæ. Tid og blik er `[KRÆVER BRUGERTEST]`.

## 4. Hvad der virker og skal bevares

- **Adskillelsen indhold/kode.** `indhold/*.ts` er rene data; `describe.each` kører alle indholdstests for hver ny region automatisk. Et nyt modul kræver teknisk én datafil plus to linjer (`indhold/index.ts`, `src/regioner.ts`): 1 aften for skelettet. Kildelæsningen er den reelle omkostning, ikke koden.
- **`tolkTast` som ren funktion med tests** (`src/tast.ts`). Det er grunden til, at rettelserne i problem 1 er billige.
- **Ingen patientdata.** `[APP]` 0 i localStorage/sessionStorage/cookies, eneste forespørgsel er filen selv, og `fetch` blev blokeret af CSP i min kørsel. `[KODE]` Ingen logning. Bevar `default-src 'none'`.
- **Én HTML-fil, to afhængigheder (React).** Rigtigt niveau for én person. Tilføj ikke router, state-bibliotek eller backend.
- **Notatet som ren funktion af valgene** (`bygNotat`), genberegnet hver gang. Ingen skjult tilstand at komme ud af takt med.

## 5. Hvad der bør fjernes

- **Claudes beslutningsnotat inde i den kliniske tekst** (`knae.ts:486`: "Beslutning (truffet af Claude …)", "Originalstudierne … er ikke læst"). Det er proceshistorik i et godkendt punkt, vist for læge og patient. Hører til i commit-beskeden eller et særskilt felt. Ændringen sender punktet tilbage til UDKAST, og det er korrekt.
- **Statuslinjens optælling** ("53 punkter · 43 UDKAST …") fra konsultationsskærmen til gennemgangssiden. Det er udviklerinformation.
- **Det grønne GODKENDT-mærke på hvert flag.** Vis kun afvigelsen (UDKAST, KILDE MANGLER). Ti ens mærker bærer ingen information – og slet ingen, før problem 2 er løst.
- **Vercel-koblingen**, medmindre den bevidst bruges.
- Gør ingenting ved: tre-tilstands-model, redigerbart notat, lagring mellem sessioner.

## 6. Én radikal idé

**Fjern `status` og `godkendtDato` fra indholdsfilerne og erstat dem med en godkendelsesfil, som kun lægen opdaterer.** `indhold/godkendt.json` indeholder pr. punkt-id: dato, fingeraftryk (hash af tekst, handling, betingelser, konflikt og de brugte kilders år) og evt. "godkendt mod kildetjek af dato". Appen udleder status: matcher fingeraftrykket, er punktet GODKENDT; ellers UDKAST – automatisk, uden disciplin. Lægen godkender med én kommando, der viser teksten og beder om bekræftelse pr. punkt. Samlegodkendelse af 37 flag i ét commit bliver dermed synlig som det, den er. Skøn: 3–4 t over to aftener; risiko middel (rører alle fem indholdsfiler mekanisk). Det er `package-lock.json`-mønstret, som allerede findes i repoet, og det gør reglen "kun brugeren sætter GODKENDT" til en egenskab ved systemet frem for en instruks til assistenten.

## 7. Usikkerhed og brugertest

- Tests er ikke kørt; at de er grønne, er `[UDLEDT]`. At `cortex.html` svarer til kilden, er kun stikprøvet (én flagtekst genfundet).
- Autogentagelse er simuleret med gentagne `keydown` i Playwright; forsinkelsen på klinikkens tastatur er ukendt. `[KRÆVER BRUGERTEST]`: hvor ofte holdes `Esc` eller en taltast nede i praksis, og trykkes `Esc` i Cortex ved en fejl, når journalsystemet var målet?
- Udklipsholderen beholder notatet efter rydning `[APP]`. Om Windows' udklipshistorik eller synkronisering er slået til, kan kun ses på klinik-pc'en.
- Fritekstfelterne har ingen teknisk spærring mod CPR. Et simpelt mønstertjek (advarsel ved ti cifre) koster 1 t, men giver falsk tryghed mod navne. Jeg er i tvivl om, hvorvidt det er værd at bygge.
- Om kopiering virker fra `file://` i klinikkens browser (reservemetoden i `lib/kopier.ts`) er ikke afprøvet.
- Anbefalet rækkefølge, 5 aftener: (1) `event.repeat`, aktiv region, fortryd; (2) fremhævningstest; (3) `satViaN`; (4) fingeraftrykstest; (5) build-mærke og Vercel-beslutning.
