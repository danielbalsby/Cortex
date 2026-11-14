# Cortex – gennemgang før MSK-omlægning

Dato: 2026-11-13 · Grundlag: commit `c002b93` · Ingen kode er ændret i denne fase.

Mærkning i teksten:
**[KODE]** = læst i filerne eller kørt i dag. **[UDLEDT]** = min slutning ud fra koden. **[GÆT]** = antagelse, jeg ikke kan verificere i repoet.

## Konklusion

Cortex er i dag et velbygget, men overdimensioneret fundament til et produkt, du ikke længere vil lave. Koden er ren og testet, men ca. 90 % af repoet er generel platform, proces og dokumentation omkring én enkelt knæ-formular uden kilder i koden. Min anbefaling er at **beholde værktøjskæden (Next.js/React/TypeScript/Vitest), arkivere næsten alt andet og bygge den nye MSK-app som en lille ny kerne** (anslået 600–900 linjer kode plus én indholdsfil pr. region). Det er hurtigere og billigere at vedligeholde end at tilpasse den eksisterende motor.

## 1. Hvad Cortex er i dag

### Stack [KODE]
- Next.js 15.2.4 (App Router), React 19, TypeScript 5.8, Vitest 4, Playwright. Eneste øvrige runtime-afhængighed: `lucide-react` (ikoner).
- Ingen backend, database, API-kald, `fetch`, `localStorage`, cookies eller analytics i koden (søgt med grep, ingen træffere). Begge sider bygges som statiske sider.
- `npm ci`, `npm run typecheck`, `npm test` (159 tests i 11 filer) og `npm run build` er kørt i dag og er grønne. Playwright-suiten (`e2e/`, 552 linjer) er **ikke** kørt.
- npm advarer ved installation om, at `next@15.2.4` har en kendt sikkerhedssårbarhed (CVE-2025-66478) og bør opgraderes.

### To parallelle apps i samme repo [KODE]
| Rute | Hvad | Datamodel |
|---|---|---|
| `/` | "Cortex Encounter": knæ-formular med chips → PSOAP-notat + udkast til fysioterapi-, røntgen- og ortopædkirurgisk henvisning. Regelbaserede advarsler og diagnoseforslag. | Generisk `ClinicalPathway` (`clinical/types`), drevet af `engine/` |
| `/prototype/clinical-document-workspace` | "Clinical Document Workspace v2": nyere knæ-prototype med Quick/Standard-tilstand, "normal undersøgelse"-gruppe, redigerbart journaludkast. | Helt separat, håndskrevet knæ-model i `clinical/prototypes/` |

De to deler ingen kode. Den nyeste udvikling (de seneste 5 commits) er sket i prototypen, ikke i hovedappen.

### Størrelser [KODE]
| Område | Linjer | Bemærkning |
|---|---|---|
| `docs/` | 14.560 i 59 filer | Vision, governance, RFC'er, design review-rammeværk, knæ-specifikation (1.551) og evidensregister (901) |
| `engine/` kode | 1.605 | Heraf 867 i `pathway-validation-engine.ts` |
| `engine/` tests | 2.123 | |
| `clinical/` (pathway, typer, generatorer) | 674 | Knæ-indholdet selv er 277 linjer |
| Prototype v2 (logik + komponenter + CSS + tests) | ca. 4.000 | |
| `components/encounter/EncounterEngine.tsx` | 365 | Hele hovedappens UI |
| `data/phrases/` | 1.873 | Importeres ikke af noget (se døde dele) |
| `app/globals.css` | 785 | |

### Hvad virker [KODE]
- Hovedappen: vælg chips → notat opdateres straks → kopiér til udklipsholder. Tom konsultation giver tomt notat (ingen implicitte kliniske fakta). Skjulte felter ryddes, når forudsætningen ændres.
- Henvisningsudkast aktiveres af valgte plan-tiltag og viser "mangler"-liste.
- Prototype v2 fungerer isoleret med syntetiske data.

### Hvad virker ikke / mangler i forhold til den nye retning
- **Kun knæ.** Ingen regionsvælger, ingen skulder/albue/ryg/ankel. [KODE]
- **Ingen kilder i koden.** Regler, diagnoseforslag (`reason`) og planforslag (`rationale`) i `clinical/pathways/knee-pain.ts` er fritekst uden kildefelt, årstal eller status. Evidensregistret findes kun som et Markdown-dokument uden kobling til koden. [KODE]
- **Ingen tastaturbetjening** ud over browserens Tab. Ingen genveje (grep efter `onKeyDown` giver nul træffere). Knæ-flowet har ca. 20 felter; med mus er det langsomt, med Tab endnu langsommere. [KODE]
- **Intet punkt opfylder "under 10 sekunder".** Notatet markeres "mangler data", indtil side, forløb og arbejdsdiagnose er valgt. [KODE]
- Henvisningskriterier findes ikke – kun generering af henvisningstekst. [KODE]

## 2. Kritisk vurdering

### Kodekvalitet
Håndværket er godt: stram TypeScript, rene funktioner, klar adskillelse mellem motor og indhold, ingen skjult tilstand, god testdækning af motoren. Det er ikke rodet kode. Problemet er proportioner, ikke kvalitet.

### Kompleksitet – for meget maskineri til for lidt indhold [KODE/UDLEDT]
- 1.605 linjer generisk motor og 2.123 linjer tests driver ét forløb på 277 linjer. Motoren er bygget til "ét genbrugeligt workflow på tværs af akut, kronisk og knæ" (ROADMAP), som nu er fravalgt.
- `pathway-validation-engine.ts` (867 linjer) validerer en statisk, håndskrevet datafil ved kørsel – og `deriveValidatedWorkflow` kører valideringen igen ved hvert klik. En typetjekket datafil plus én test løser det samme på få linjer.
- Generator-registry med `generatorId`-opslag er en indirektion, der kun har én bruger (knæ).
- Diagnoseforslagene viser "2 af 3 støttende fund". Det ligner en vægtning, men tallene er optalte betingelser uden kilde. Det er præcis den type ræsonnement uden kilde, du nu forbyder.
- Prototype v2 lægger knæ-specifik klinisk logik direkte i TypeScript (`selectors.ts`, `journal.ts`) og i knæ-specifikke React-komponenter. Den bryder dermed repoets egen regel om, at klinisk indhold ikke må ligge i komponenter, og den kan ikke genbruges til fire andre regioner uden at blive skrevet om.

### Døde eller forældede dele [KODE]
- `data/phrases.ts` og `data/phrases/*` (1.873 linjer: journal-, henvisnings-, patient- og attestfraser): ingen fil importerer dem. Rester af en tidligere "frasebank"; indeholder bl.a. otoskopi- og sygemeldingsfraser.
- `app/layout.tsx` beskriver stadig appen som "Din personlige kliniske frasebank".
- Versionsnumre er uenige: topbjælken siger v0.2, `package.json` 0.4.0, pathway 0.3.0.
- `FIRST-COMMIT.md` henviser til et GitHub Actions-workflow, men der findes ingen `.github/`-mappe. `FIX-NOTE.md` beskriver en for længst løst byggefejl.
- `docs/archive/` rummer bl.a. dubletter af visionsdokumenterne.
- Git-historikken har en commit (`85dade3`), hvor et helt dokument er indsat som commit-besked, og en (`f74b528`) med beskeden "Update greeting from 'Hello' to 'Goodbye'", som ikke svarer til noget i appen. Harmløst, men tegn på, at processen har været tungere end overblikket.

### Teknisk og proces-gæld
- **Dokumentationen er den største gæld.** 14.560 linjer dokumenter mod ca. 5.000 linjer produktionskode. Der er en 7-faset udviklingsproces, et design review-rammeværk med reviewer-roller og en "Engineering Constitution" – til et værktøj med én bruger og 2 timers udviklingstid ad gangen. Hver AI-session bliver via `AGENTS.md` bedt om at læse otte dokumenter først, hvoraf flere peger mod et produkt (bred klinisk platform, pilot med flere klinikere), du nu har fravalgt. [KODE]
- To UI'er og to datamodeller skal holdes i live samtidig. [KODE]
- Playwright-suiten er bundet til de nuværende skærmbilleder og vil skulle skrives om ved enhver UI-ændring. [UDLEDT]

### Skal det bygges om fra bunden?
**Ja for app-koden, nej for værktøjskæden.** Den nye app har et andet omdrejningspunkt (region → felter → notat + kildebelagt opslag) og en datamodel, hvor kilde og status er obligatoriske på hvert klinisk punkt. Det er mindre arbejde at skrive 600–900 nye linjer end at ombygge typer, validering, registry og UI i den gamle motor – og resultatet bliver noget, du selv kan overskue. Next.js/React/TypeScript/Vitest bliver, fordi de virker og ikke koster noget at beholde.

## 3. Genbrug og arkivering

### Genbruges
| Hvad | Hvordan |
|---|---|
| Værktøjskæde: `package.json`, `tsconfig.json`, Vitest-opsætning, Prettier/EditorConfig | Uændret (Next opgraderes til en rettet version) |
| Knæ-felter og danske notatfraser i `clinical/pathways/knee-pain.ts` | Udgangspunkt for den nye `knae`-indholdsfil. Alt klinisk markeres UDKAST |
| Ideen "Normal basisundersøgelse" fra prototype v2 | Bliver til en "normal"-genvej pr. region – den største enkeltgevinst for hastighed |
| Chip-udseende og kopiér-knap fra `EncounterEngine.tsx` / `globals.css` | Stil og mønster genbruges, komponenten skrives ny og mindre |
| `matchesCondition` (10 linjer i `rule-engine.ts`) | Samme simple betingelseslogik til at fremhæve røde flag |
| Princippet og testen "tom konsultation er klinisk tom" | Føres videre som test |
| Evidensregistrets danske kilder S1–S3 (SST NKR meniskpatologi, Lægehåndbogen bakteriel artrit, Patienthåndbogen knæskade) | Startliste til knæ-indholdet. Skal genbesøges og dateres, før de bruges – jeg har ikke åbnet linkene i dag |

### Arkiveres (flyttes, slettes ikke) – og hvorfor
| Hvad | Hvorfor |
|---|---|
| `engine/` (hele mappen inkl. tests) | Generisk workflow-motor til et fravalgt produkt; erstattes af langt mindre kode |
| `encounter/`, `clinical/types/`, `clinical/output-generator-registry.ts`, `clinical/pathways/` | Hører til den gamle motor. Henvisningstekst-generatorerne er uden for det nye mål |
| `clinical/prototypes/`, `components/prototype/`, `app/prototype/` | Knæ-specifik prototype med klinisk logik i kode |
| `components/encounter/` | Erstattes af ny, mindre UI |
| `data/` | Død kode, og meget af indholdet er ikke bevægeapparat |
| `e2e/`, `playwright.config.ts` | Tester skærmbilleder, der forsvinder |
| `docs/vision/`, `docs/governance/`, `docs/architecture/`, `docs/design/`, `docs/design-review/`, `docs/product/`, `docs/archive/` | Beskriver et andet produkt og en proces, der er for tung til formålet |
| `docs/clinical/` (KNEE-001 og evidensregister) | Arkiveres som opslagsværk; relevante danske kilder overføres til knæ-indholdsfilen |
| `FIX-NOTE.md`, `FIRST-COMMIT.md`, `CHANGELOG.md`, `CONTRIBUTING.md` | Forældede |
| `AGENTS.md` (nuværende indhold) | Peger fremtidige sessioner mod de gamle dokumenter; erstattes af `CLAUDE.md` |

Den præcise flytteliste står i `docs/plan.md`, trin 1. `docs/vision/` er i dag beskyttet af `AGENTS.md` ("må ikke ændres uden eksplicit instruks"); jeg flytter den kun, når du har godkendt planen.

## 4. Største risici

### Klinisk
1. **Ukildebelagt indhold fremstår autoritativt.** Den nuværende app viser "Rødt flag", diagnoseforslag og planforslag uden kilde. [KODE]
2. **Falsk tryghed ved for snævre regler.** Reglen for septisk artrit udløses kun, når feber *og* udtalt hævelse *og* svært nedsat bevægelighed alle er valgt; ellers står der "Ingen regelbaserede akutte opmærksomhedspunkter udløst". Repoets eget evidensregister noterer, at feber kan mangle (S2 og afsnit 9.4). Koden modsiger altså sin egen dokumentation. Tilsvarende bruger "Ottawa"-reglen 2 af de 5 kriterier, registret oplister. [KODE] Læren til det nye design: røde flag vises altid som liste; betingelser må kun *fremhæve*, aldrig *afkræfte*.
3. **AI-udkast med opdigtede eller forkert gengivne kilder.** Det er den største risiko i den nye retning, fordi jeg skal udkaste indhold til fem regioner. Modtræk i planen: hver kilde åbnes og dateres i sessionen, alt fødes som UDKAST, og kun du godkender.
4. **Kildekonflikt med dit eget princip.** Evidensregistrets kilder til bl.a. Ottawa-reglerne og artrosebehandling er udenlandske (NICE, AAOS, ACR, valideringsstudier). Hvis kun danske kilder må bruges, vil en del punkter stå som "kilde mangler", indtil en dansk kilde er fundet. Det kræver din stillingtagen (se plan, åbne spørgsmål).
5. **Forældelse.** Kilder ændres (registret noterer, at SST's NKR for meniskpatologi er "under revision"). Uden en dato for seneste tjek pr. kilde opdager man det ikke. [KODE for noten, UDLEDT for risikoen]
6. **Automationsbias.** Et notat, der er hurtigt at kopiere, er også hurtigt at kopiere forkert. Modtræk: notatet indeholder kun det, du aktivt har valgt.

### Data
1. I dag gemmes og sendes intet. [KODE] Det skal forblive sådan og skrives ind i `CLAUDE.md`.
2. **Fritekstfelter** er det eneste sted, identificerbare oplysninger kan havne. De kan ikke fjernes helt uden at gøre notatet ubrugeligt; de skal holdes få, korte og uden browser-autofuldførelse.
3. **Udklipsholderen** indeholder notatet, indtil den overskrives. Det er uundgåeligt, men notatet er uden navn/CPR.
4. **Hvor appen kører** er ikke fastlagt i repoet. [GÆT: lokalt via `npm run dev`.] Lokalt eller som statiske filer er uproblematisk; ekstern hosting kræver, at der fortsat ikke findes nogen form for logning af input.

### Vedligeholdelse
1. Dokument- og procesbyrden (se ovenfor) er den største trussel mod, at projektet overlever travle perioder.
2. Kendt sårbarhed i den installerede Next.js-version. Lav praktisk risiko for en lokal, statisk app, men billig at lukke.
3. Fem regioner × kildebelagt indhold er først og fremmest en *indholds*opgave. Koden bliver lille; din review-tid er flaskehalsen. Planen bygger derfor knæ helt færdigt og lader dig bruge det, før de fire andre begyndes.
4. Fremtidige AI-sessioner følger `AGENTS.md`. Hvis den ikke udskiftes tidligt, vil de arbejde efter den gamle retning.
