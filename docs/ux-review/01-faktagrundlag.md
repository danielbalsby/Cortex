# 01 – Faktagrundlag for UX-gennemgangen af Cortex

Dato: 2026-11-15 · Grundlag: commit `973034f` (main) · Kun læsning; ingen app-kode er ændret.

**Evidensmærker**
- `[KODE]` = verificeret i koden (fil:linje)
- `[APP]` = observeret ved kørsel af `cortex.html` i Chromium (Playwright, tastatur og mus, 1920×1080 og 1366×768)
- `[UDLEDT]` = vurdering uden direkte verifikation

**Forbehold for hele dokumentet**
- Skærmbilledet `docs/screenshots/cortex-knae-2026-11-15.png` findes ikke i repoet (mappen `docs/screenshots/` findes ikke) `[KODE]`. Jeg har i stedet taget egne skærmbilleder: `docs/ux-review/skaermbilleder/01`–`05`.
- Afprøvet i Chromium fra `file://`. Klinikkens browser og journalsystem er ikke afprøvet.
- `cortex-phi-seven.vercel.app` svarer (HTTP 200) og leverer en fil på præcis samme størrelse som repoets `cortex.html` (381.296 bytes) `[APP]`. At den er identisk byte for byte er `[UDLEDT]`. `docs/plan.md:201` siger, at Vercel-koblingen "har fejlet siden juli og bruges ikke" – det er altså ikke længere korrekt.
- Jeg har ikke åbnet nogen kliniske kilder. Intet i dette dokument er en vurdering af, om det kliniske indhold er fagligt rigtigt.

---

## 1. Datamodel

Typerne står i `indhold/typer.ts`. Én datafil pr. region (`indhold/knae.ts` m.fl.), samlet i `indhold/index.ts:9-15`. `[KODE]`

| Begreb | Indhold | Reference |
|---|---|---|
| `Region` | `grupper` (felter), `notat` (skabelon), `kilder`, `roedeFlag`, `differentialdiagnoser`, `behandling`, `henvisning` | `typer.ts:79-89` |
| `Felt` | `type`: `enkelt` / `flere` / `tekst`. `valg[]` med `label` (knap), `notat` (sætning) og evt. `normal: true`. `visHvis` skjuler feltet, til betingelsen passer | `typer.ts:27-41` |
| `Svar` | `Record<feltId, string \| string[]>`. Et felt er enten **besvaret med ét valg** eller **fraværende** | `typer.ts:92` |
| `Kildebelagt` | `kilder[]`, `status`, `godkendtDato?`, `konflikt?{beskrivelse, kilder}` | `typer.ts:17-22` |
| `RoedtFlag` | `tekst`, `handling`, `fremhaevHvis?` (ELLER-grupper af OG-betingelser) | `typer.ts:47-54` |
| `Differentialdiagnose` | `navn`, `kendetegn[]`, `notat` (sætning til V) | `typer.ts:56-61` |
| `Behandling` | `tekst`, `gaelderFor?` (diagnose-id'er), `notat` (sætning til P) | `typer.ts:63-68` |
| `Henvisning` | `til`, `kriterier`, `hast?`, `gyldighed`, `notat` (sætning til P) | `typer.ts:70-77` |

**Tre tilstande pr. fund findes ikke i modellen.** Et fund kan være "valgt værdi" eller "ikke besvaret". "Undersøgt og negativt" og "sat via N" kan ikke skelnes fra hinanden, og der er ingen tilstand for "ikke undersøgt" ud over fravær. `[KODE]` `typer.ts:92`, `lib/tastatur.ts:45-53`

### Knæmodulets omfang `[KODE]` `indhold/knae.ts`
- **Anamnese:** 12 felter, heraf 4 kun synlige ved `traume = ja` (mekanisme, hævelse straks, hørt/følt knæk, alder). Linje 33-152.
- **Objektivt:** 12 felter, heraf 5 kun synlige ved `traume = ja` (ømhed patella, ømhed caput fibulae, fleksion til 90°, 4 skridt nu, strakt benløft). Linje 158-273. Alle 11 valgfelter har et normalfund.
- **Beslutningsstøtte:** 10 røde flag (alle GODKENDT), 14 differentialdiagnoser, 17 behandlingspunkter, 12 henvisningspunkter (alle 43 UDKAST). 16 kilder. 6 konflikter (2 på røde flag, 1 på behandling, 3 på henvisning).
- Alle felter i knæ er enkeltvalg eller fritekst. Flervalg (`flere`) bruges kun i andre regioner (fx `ryg.ts:122`).
- Alle fem regioner tilsammen: 37 røde flag, alle GODKENDT (knæ 10, ryg 8, ankel 7, skulder 6, albue 6).

### Det, der ikke kan registreres i knæ `[KODE]`
- **Alder uden traume.** Feltet `alder` har `visHvis: traume = ja` (`knae.ts:108-111`). En 61-årig eller et barn uden traume kan ikke aldersregistreres.
- **Halten, ledalloplastik, risikofaktorer for infektion, instabilitetsfølelse (anamnestisk), tidligere knæskade.** Ingen felter. Kun fritekst.
- **Hævelse efter timer.** Feltet hedder "Hævelse straks" (ja/nej); notatteksten er "Hævelse opstod umiddelbart efter traumet" (`knae.ts:86-93`). Flagteksten taler om "hæmartron i løbet af få timer" (`knae.ts:513`). Feltet og flaget bruger altså ikke samme tidsbegreb.

---

## 2. Notatgenerering

`bygNotat` i `lib/notat.ts:63-86`. `[KODE]`

- Notatet bygges på ny ved hvert valg (ingen knap, ingen forsinkelse). `App.tsx:39`
- Rækkefølgen følger regionens skabelon (`knae.ts:277-312`), ikke klikrækkefølgen. Hvert valg bidrager med sin faste `notat`-sætning; sætningerne sættes sammen med mellemrum.
- **Ubesvarede felter udelades helt.** Tomme afsnit udelades. Intet valgt giver tom tekst (testet: `lib/notat.test.ts:16`). `lib/notat.ts:45, 80-82`
- `V:` = `notat`-sætningerne fra de differentialdiagnoser, lægen har trykket `+ V` på. `P:` = sætningerne fra afkrydset behandling og henvisning. `lib/notat.ts:66-71`
- Fritekst: ét felt under anamnese og ét under objektivt, højst 200 tegn, får punktum tilføjet. `Felter.tsx:79`, `lib/notat.ts:37-41`
- Der er **ingen fritekst til V eller P**, og notatet kan **ikke redigeres** i Cortex (det vises i et `<pre>`-element). Rettelser skal ske i journalsystemet. `src/Notat.tsx:24`
- Skifter et styrende felt (fx traume fra ja til nej), slettes svarene i de felter, der forsvinder – uden besked. `lib/notat.ts:22-35`

**Eksempel, scenarie B, 14 tastetryk** `[APP]`
```
S: Højresidige knæsmerter. Gradvist indsættende. Varighed flere måneder. Intet traume. Reduceret belastningsevne. Ingen låsning.
O: Ingen hævelse. Ingen rødme. Ingen varmeøgning. Medial ledlinjeømhed. Fuld bevægelighed. Stabilt ved klinisk ligamenttest.
```
Fire af de seks O-sætninger er sat af `N`.

Aldersvalget skrives i S som "Alder 12–50 år." (`knae.ts:113-116`) `[APP]`.

---

## 3. De konkrete verifikationer

### 3.1 "N = normalfund i ubesvarede"

**Hvad den gør** `[KODE]` `lib/tastatur.ts:45-53`, `src/tast.ts:50`, `App.tsx:114-116`
- Ét tryk på `N` sætter normalværdien i **alle synlige valgfelter i hele regionen**, som har et `normal`-valg og ikke er besvaret. Den overskriver aldrig et eksisterende svar. Anamnesefelter har ingen normalværdi og røres ikke.
- Den er ikke bundet til sektionen "Objektivt". Den virker, uanset hvilket felt der er aktivt – også fra første anamnesefelt, og også når fokus står på selve siden (fx efter klik på bundlinjen). Den virker ikke i tekstfelter (dér skrives "n") og ikke, når fokus står på en knap eller i beslutningsstøtten. `[APP]`
- `N` som **allerførste** tast efter regionsvalg giver dette notat `[APP]`:
  `O: Ingen hævelse. Ingen rødme. Ingen varmeøgning. Ingen ledlinjeømhed. Fuld bevægelighed. Stabilt ved klinisk ligamenttest.`
- Ved `traume = ja` tilføjer `N` yderligere `[APP]`:
  `Ingen direkte ømhed på patella. Ingen ømhed på caput fibulae. Kan flektere knæet til 90 grader. Går fire vægtbærende skridt ved undersøgelsen. Kan løfte strakt ben mod tyngdekraften.`
  Det er netop de fem fund, der afgør reglerne for akut røntgen og flaget om strækkeapparatet (`knae.ts:468-480, 542`).
- Felter, der først bliver synlige senere (traumefelterne), udfyldes ikke af et tidligere `N`. Trykkes `N` før `traume = ja`, står de fem traumefund tomme `[APP]`.

**Forholdet til kravet om, at ikke-undersøgt aldrig må fremstå som normalt**
- Kravet er opfyldt i den forstand, at intet udfyldes uden et tastetryk, og at notatet skriver de konkrete fund ud og ikke "intet abnormt" (`docs/plan.md:11`; test `lib/tastatur.test.ts:52`). `[KODE]`
- Kravet er **ikke** opfyldt i den forstand, at ét tastetryk dokumenterer op til 11 undersøgelser som udført og normale, herunder ligamenttest, gangtest og strakt benløft, uden at lægen har taget stilling til hvert fund. `[KODE]`/`[APP]`
- **Man kan ikke se, hvilke fund der er sat via N** – hverken i notatet (teksten er identisk) eller på skærmen (knappen ser ud som en, lægen selv har valgt). Der gemmes ingen oplysning om, hvordan et svar er opstået. `[KODE]` `typer.ts:92`, `Felter.tsx:117-118` · `[APP]`
- `N` kan ikke fortrydes samlet. Hvert felt skal fravælges enkeltvis. `[KODE]`
- Der findes en præcedens for at holde et felt ude af `N`: rektaleksploration i ryg har ingen normalværdi (test `lib/notat.test.ts:139`). `[KODE]`

### 3.2 "GODKENDT 2026-11-15"

- **Hvad status er:** en tekststreng `status: "GODKENDT"` og en tekststreng `godkendtDato: "2026-11-15"`, skrevet direkte i indholdsfilen ved hvert punkt (fx `knae.ts:457-458`). `[KODE]`
- **Datoen er hardcodet.** Den er ikke genereret og følger ikke dags dato. Appen læser ikke uret til andet end dobbelt-Esc (`App.tsx:91`). `[KODE]`
- **Hvem:** Feltet siger ikke, hvem der har godkendt. Git-historikken viser, at alle 37 flag blev sat til GODKENDT i ét commit (`ef09802`, forfatter "Claude", 2026-11-15 04:45 UTC) med teksten "efter lægens besked 'godkend alle 37 røde flag'". `[KODE]`
- **Tidsforløb:** Commit `6c32444` (02:48 UTC samme nat) tilføjede tre nye rygflag, ét nyt knæfelt og ændrede flagtekster. Samlegodkendelsen kom knap to timer senere. `[KODE]` Om hvert flag er læst enkeltvis, kan ikke ses af koden.
- **Mod hvilken kildeversion:** Det er ikke registreret. Kilden har `aar` og `sidstTjekket` (`typer.ts:11-13`), men godkendelsen peger ikke på en bestemt version, og der gemmes intet fingeraftryk af den godkendte tekst. `[KODE]`
- **Hvad godkendelsen dækker:** uklart i data. Punktet indeholder `tekst`, `handling`, `fremhaevHvis` og evt. `konflikt`. Gennemgangssiden skriver selv, at "Fremhæves når" er Claudes oversættelse, som "også skal godkendes" (`Gennemgang.tsx:27`). Der er ét fælles statusfelt for det hele. `[KODE]`
- **Reglen "ændret tekst → tilbage til UDKAST" håndhæves ikke teknisk.** Testen kræver kun, at GODKENDT har mindst én kilde og en dato (`indhold.test.ts:83-88`). Reglen afhænger af disciplin. `[KODE]`
- **Godkendte punkter med Claude-beslutninger i sig:** `flag-fraktur` er GODKENDT og indeholder i konfliktteksten "Beslutning (truffet af Claude 2026-11-15 efter lægens anmodning)" og "Originalstudierne bag reglerne er ikke læst" (`knae.ts:486`). `[KODE]`
- **Visning:** grønt mærke `✓ GODKENDT 2026-11-15` på hvert af de 10 flag; UDKAST vises med stiplet kant og gråt mærke (`Beslutningsstoette.tsx:164-166`, `styles.css:173-174`). `[KODE]`/`[APP]`
- **Statuslinjen** viser "Knæ: 53 punkter · 43 UDKAST · 0 kilde mangler · 6 konflikt · ældste kildetjek 2026-11-14" (`App.tsx:182-184`). `[KODE]`

### 3.3 Kildeårstal (fx Lægehåndbogen 2024 og 2026 på samme skærm)

- **Bevidst i datamodellen, men vist misvisende.** Hver artikel i Lægehåndbogen er sin egen kilde med eget årstal: "Artrit, bakteriel" 2024, "Artrose, knæ" 2025, "Knæsmerter" 2026 osv. (`knae.ts:315-442`). `aar` er defineret som "årstal for den version, der er læst" (`typer.ts:11`). `[KODE]`
- Linket viser kun **udgiver + år** ("Lægehåndbogen 2024"). Artiklens titel og tjekdato står kun i et tooltip ved mus-over (`Beslutningsstoette.tsx:191-193`). To forskellige artikler ligner derfor to udgaver af samme værk; i konfliktboksen for aflåst knæ står "Lægehåndbogen 2026" to gange efter hinanden uden mulighed for at se forskel `[APP]`.
- Om årstallene svarer til artiklernes faktiske revisionsår, er ikke kontrolleret her. `[UDLEDT]`
- Kildelinks åbner sundhed.dk i en ny fane. Det er lægens eget klik og ikke et netværkskald fra appen. På en pc uden netværk virker de ikke. `[KODE]` `Beslutningsstoette.tsx:186-190`

### 3.4 "Kilderne er uenige"

- Et `<details>`-element. Udfoldet vises `konflikt.beskrivelse` som fri tekst og derefter kildelinks (`Beslutningsstoette.tsx:168-178`). `[KODE]`
- **Aflåst knæ** (scenarie E), udfoldet `[APP]`:
  > Lægehåndbogens side om meniskskade skriver "henvises til akut ortopædkirurgisk vurdering" ved aflåst knæ. Lægehåndbogens side om knæsmerter skriver "subakut henvisning ... ved aflåsning". Region Hovedstaden angiver "subakut henvisning til CVI snarest muligt < 1 uge" ved aflåst knæ med strækkemangel.
  >
  > Lægehåndbogen 2026 · Lægehåndbogen 2026 · Region Hovedstaden 2026
- **Ikke handlingsorienteret.** Flagets handling lyder "Ortopædkirurgisk vurdering – akut eller subakut, se konflikt" (`knae.ts:494`). Konflikten citerer tre kilder og konkluderer ikke. Der står ikke, hvad der gælder i Region Hovedstaden, eller hvad lægen skal gøre. `[KODE]`
- Det regionale svar findes et andet sted: henvisningspunktet "CVI, subakut (snarest, < 1 uge)" (`knae.ts:973-986`), status UDKAST, ca. 5.500 px nede i et panel med 1.054 px synlig højde `[APP]`. Flaget linker ikke dertil.
- **Fraktur-flaget** er anderledes: her indeholder konflikten en beslutning ("ét opfyldt kriterie i én af reglerne udløser akut røntgen"), og den er skrevet ind i handlingen (`knae.ts:464-465, 486`). Konflikterne er altså ikke ens opbygget. `[KODE]`
- Konflikten har ingen struktur for "kilde A siger / kilde B siger / praktisk konsekvens / regionalt gældende" – kun ét tekstfelt (`typer.ts:21`). `[KODE]`
- "CVI" forklares ikke i appen, og knæmodulet indeholder intet telefonnummer til CVI `[KODE]` (søgning i `indhold/knae.ts`). Reumatologisk hotline har numre (`knae.ts:1072`).

### 3.5 Røde flag

- **Alle vises altid**, i indholdsfilens faste rækkefølge, uanset input (`Beslutningsstoette.tsx:40-52`). Beslutningsstøtten er synlig straks efter regionsvalg. `[KODE]`/`[APP]`
- **De reagerer på input, men kun ved at blive fremhævet:** lyserød baggrund, rød kant og teksten "MATCHER DINE VALG" (`Beslutningsstoette.tsx:43-48`, `styles.css:176`). De flyttes ikke op, og intet skjules. Der står aldrig "ingen røde flag". `[KODE]`
- 6 af knæets 10 flag kan fremhæves. **4 kan aldrig fremhæves:** patellaluksation, store akutte skader (neurovaskulær status), læghævelse (DVT-differentialdiagnose) og **barn med knæsmerter** (`knae.ts:547-593`). `[KODE]`
- **Synlighed uden at rulle** `[APP]` (tomt notat): 6 af 10 flag ved 1920×1080; 3 af 10 ved 1366×768. Jo længere notatet bliver, jo færre: i scenarie A ved 1920×1080 er 5 synlige; i scenarie C ved 1366×768 er 2 synlige. Flaget om børn er nr. 10 og er aldrig synligt uden at rulle.
- Et fremhævet flag uden for det synlige område giver intet signal. I scenarie C fremhæves flag nr. 1 (bakteriel artrit, synligt) og nr. 8 (septisk bursit, ikke synligt). `[APP]`
- Et flag, der **ikke** er fremhævet, kan betyde tre ting, som ikke kan skelnes på skærmen: betingelsen er ikke opfyldt, de relevante felter er ikke udfyldt, eller flaget har slet ingen betingelse. `[KODE]`
- Fremhævningen har ingen forbindelse til handling: der er ingen knap på et flag, og et flag kan ikke sendes til notatet. `+ P` findes kun på behandling og henvisning (`Beslutningsstoette.tsx:45`). `[KODE]`

**Fremhævning i scenarierne** `[APP]`

| Scenarie | Registreret | Fremhævet | Bemærkning |
|---|---|---|---|
| A | traume, vrid, hævelse straks = ja, moderat hævelse, instabilitet | Akut ligamentskade | Fraktur-flaget fremhæves ikke (12–50 år, går 4 skridt) |
| B | gradvis, måneder, intet traume, medial ledlinjeømhed | Ingen | Ingen alarmer – som ønsket |
| C | akut, dage, feber, rødme, varme | Bakteriel artrit + septisk bursit | Alloplastik kan ikke registreres; står kun som risikofaktor i flagteksten. Feber er ja/nej (subfebril kan ikke angives) |
| D | gradvis, intet traume | Ingen | Alder og halten kan ikke registreres. Flaget om børn nævner hoftelidelse og røntgen af hofter, men står nederst og fremhæves aldrig |
| E | vrid, låsning = ja, svært nedsat bevægelighed | Aflåst knæ | Kræver begge fund. Låsning = ja alene fremhæver intet |

### 3.6 Henvisning og opfølgning på en handlingsanbefaling

- **Der findes ingen henvisningsfunktion.** Ingen henvisningstekst, ingen skabelon. Fravalgt i planen (`docs/plan.md:187`). `[KODE]`
- Det eneste er `+ P` på et henvisningspunkt, som sætter én fast sætning i notatets plan, fx "Henvist akut til CVI." (`knae.ts:952`). `[KODE]`
- Henvisningspunktet "CVI, elektiv" opremser, hvad en henvisning bør indeholde (skadetidspunkt, mekanisme, side, ømhed, hævelse, strakt benløft, strækkemangel, løshed – `knae.ts:991`). Næsten alt dette er registreret i felterne, men bruges ikke til at danne en henvisningstekst. `[KODE]`
- **Vejen fra flag til handling skal lægen selv gå.** I scenarie C står "Indlægges akut ved mistanke" i det fremhævede flag øverst. Det tilhørende henvisningspunkt ("Akut indlæggelse (ortopædkirurgi via CVI)") ligger 5.030 px nede (1920×1080) hhv. 5.965 px (1366×768) `[APP]`. Imellem ligger 14 differentialdiagnoser og 17 behandlingspunkter. Der er ingen genvej, intet link og intet telefonnummer.
- Efter `+ V` på en diagnose vises behandling for den først; resten foldes sammen under "Øvrig behandling (n)" (`Beslutningsstoette.tsx:24-27`). Henvisningerne filtreres ikke. `[KODE]`

### 3.7 "Esc Esc = ryd"

- To tryk på `Esc` inden for 1.000 ms rydder alt og går til startskærmen: region, svar, V/P-valg og kopikvittering (`App.tsx:17, 90-100, 42-49`). `[KODE]`/`[APP]`
- **Ingen bekræftelse og ingen fortryd.** Tilstanden overskrives; der gemmes ingen kopi. `[KODE]`
- Virker også fra tekstfelter `[APP]`. `Esc` – pause over 1 s – `Esc` rydder ikke; et tredje `Esc` lige efter gør `[APP]`.
- **Regionsknapperne rydder også alt med ét museklik, uden varsel.** Klik på "Ankel" og tilbage på "Knæ" giver tomt notat (`App.tsx:42-49, 134`) `[APP]`. Det er en større risiko end dobbelt-Esc, fordi det kun kræver ét klik. Klik på den region, der allerede er åben, rydder også. `[KODE]`
- Genindlæsning (F5) og lukning af fanen rydder alt (ingen persistens) – tilsigtet. `[KODE]`
- Hvor ofte `Esc` trykkes to gange ved en fejl i praksis (fx for at lukke noget i journalsystemet med forkert vindue i fokus), kan ikke afgøres her. `[UDLEDT]`

### 3.8 Tastaturnavigation

`src/tast.ts:26-52`, `lib/tastatur.ts`, `App.tsx:66-122`. `[KODE]`

| Tast | Virkning |
|---|---|
| `1`–`5` på startskærm | Åbn region. Virker ikke, når en region er åben (`tast.ts:33-39`) |
| `1`–`9` i et felt | Vælg; enkeltvalg rykker selv til næste felt. Samme tal igen fravælger |
| `↓` / `Enter` / `↑` | Næste / forrige felt |
| `N` | Normalfund i alle ubesvarede (se 3.1) |
| `Ctrl/⌘+Enter` | Kopiér notat – virker fra alle fokus |
| `Esc Esc` | Ryd |
| `G`, `0` på startskærm | Gennemgangsside, eksempelregion |

**Hvor meget kan klares uden mus?** `[APP]`
- **Anamnese, objektivt og kopiering: alt.** Scenarie A 21 tastetryk (inkl. ét fritekstfelt talt som 1) til og med `N`; B 14; C 14; E 18. Dertil `Ctrl+Enter`.
- **Vurdering og plan: kun i teorien.** `+ V` og `+ P` har ingen genvej. De kan nås med `Tab`: i scenarie A 32 tryk fra feltområdet til `+ V` ved forreste korsbånd og yderligere 44 til `+ P` ved "CVI, akut". I praksis kræver V og P musen.
- **Skift af region** kræver mus eller `Esc Esc` + tal (som rydder).
- **Udfoldning af konflikt og kildelinks:** `Tab` + `Enter`; i praksis mus.
- **Fokusfælde:** Efter museklik på `+ V`/`+ P` eller et link står fokus i beslutningsstøtten, og tal, `N` og piletaster gør ingenting (`tast.ts:43`). Det er tilsigtet (taster må ikke ændre felter derfra), men lægen skal klikke på et felt for at få tastaturet tilbage. Der er ingen tast, der hopper tilbage til felterne. `[KODE]`/`[APP]`
- Tastaturhjælpen på et felt (tallene på knapperne) vises kun i det aktive felt (`Felter.tsx:124`). `[KODE]`

### 3.9 State, persistens og hvor data ligger

- **Al tilstand ligger i React-state i hukommelsen:** `region`, `svar`, `valgte`, `aktivFelt`, `kopiStatus` (`App.tsx:29-33`). `[KODE]`
- **Ingen lagring.** Ingen forekomster af `localStorage`, `sessionStorage`, cookies, `indexedDB`, `fetch`, `XMLHttpRequest`, `sendBeacon`, `console.*` eller analytics i `src/`, `lib/`, `indhold/`, `index.html` `[KODE]`. Efter en fuld gennemspilning: localStorage 0, sessionStorage 0, ingen cookies, ingen IndexedDB `[APP]`.
- **Ingen netværkskald.** Eneste forespørgsel er selve filen `[APP]`. Content-Security-Policy i `index.html:8-11` er `default-src 'none'`, så browseren blokerer teknisk for kald, selv hvis koden skulle forsøge. `[KODE]`
- **Udklipsholderen er det ene sted, data forlader appen.** Notatet (inkl. fritekst) lægges i systemets udklipsholder (`lib/kopier.ts:6-31`) og bliver liggende efter `Esc Esc` `[APP]`. Appen kan ikke tømme den. Er Windows' udklipshistorik (Win+V) eller synkronisering mellem enheder slået til på klinik-pc'en, gemmes notatet dér `[UDLEDT]` – kan kun afgøres på pc'en.
- **Fritekstfelterne** er den eneste vej, identificerbare oplysninger kan komme ind. Pladsholderen siger "(ingen navn/CPR)" (`knae.ts:151`); der er ingen teknisk kontrol. `autoComplete="off"` er sat (`Felter.tsx:80`). `[KODE]`
- **Skærmen er synlig for patienten.** Den viser alle røde flag med tekster som "osteosarkom og Ewings sarkom, artralgi pga. leukæmi" (`knae.ts:587`) uanset patient. `[KODE]` Hvordan patienter reagerer, er `[KRÆVER BRUGERTEST]`.
- Vercel-udgaven er offentligt tilgængelig for enhver med adressen (med `noindex`, `vercel.json:5-13`). Den indeholder ingen patientdata, men det kliniske indhold inkl. UDKAST ligger åbent. `[APP]`/`[KODE]`

### 3.10 Tests

50 testtilfælde i syv filer (heraf 7 i `indhold.test.ts`, som køres for hver region) `[KODE]`. De dækker: tomt notat ved tomt input, notatrækkefølge, rydning af skjulte felter, talvalg og fremrykning, at `N` kun rører ubesvarede og skriver konkrete fund, tastaturfortolkningen (`src/tast.test.ts`), og indholdsfilernes sammenhæng (unikke id'er, gyldige kildehenvisninger, GODKENDT kræver kilde og dato, ens kilder på tværs).

Ikke testet: at en ændret tekst i et godkendt punkt nulstiller status; at et bestemt sæt fund fremhæver bestemte flag (kun for felter med id `roedeflag`, som knæ ikke har – `indhold.test.ts:101`); selve brugerfladen. Testene er ikke kørt i denne gennemgang (afhængigheder er ikke installeret); at de er grønne er `[UDLEDT]` fra seneste commit.

---

## 4. Måltal fra gennemspilningen `[APP]`

Tastetryk = taster til registrering inkl. regionsvalg og `N`, ekskl. V/P og kopiering. Fritekst tæller som 1.

| Scenarie | Tastetryk | Museklik for V + P | Fremhævede flag | Afstand til relevant henvisningspunkt (1920×1080) |
|---|---|---|---|---|
| A | 21 | 2 + rulning | 1 | "CVI, akut": ca. 5.000 px (ikke målt særskilt; står lige efter "Akut indlæggelse") |
| B | 14 | 2–3 + rulning | 0 | Artrosebehandling: 3.282 px |
| C | 14 | 1–2 + rulning | 2 | "Akut indlæggelse": 5.030 px |
| D | 4 (derefter mangler felter) | – | 0 | Flag om børn: 1.270 px; "Henført smerte": 2.710 px |
| E | 18 | 1–2 + rulning | 1 | "CVI, subakut": 5.531 px |

Højre panel er 5.700–6.850 px højt mod 1.054 px synligt (1920×1080), dvs. ca. 6 skærmhøjder; ved 1366×768 ca. 10 skærmhøjder.

Tidsforbrug, antal blik væk fra patienten og sammenligning med at diktere eller skrive direkte i journalsystemet er ikke målt og kan ikke måles her. `[KRÆVER BRUGERTEST]`

---

## 5. Kort svar på de syv verifikationsspørgsmål

| Spørgsmål | Svar |
|---|---|
| Hvad gør N? | Sætter normalfund i alle synlige, ubesvarede objektive felter i hele regionen med ét tryk – uanset hvor fokus står. Op til 11 fund i knæ ved traume |
| Kan man se, hvad N har sat? | Nej. Hverken i notat eller på skærm |
| Hvad betyder GODKENDT + dato? | En hardcodet tekststreng. Siger ikke hvem, ikke mod hvilken kildeversion, og ikke hvilke dele af punktet. Sat for alle 37 flag i ét commit |
| Forskellige kildeårstal? | Bevidst: hver Lægehåndbogs-artikel har eget år. Men visningen ("Lægehåndbogen 2024") skjuler artikelnavnet, så det ligner en fejl |
| "Kilderne er uenige"? | Viser citater fra kilderne. For aflåst knæ uden konklusion og uden regional anvisning. Ikke handlingsorienteret |
| Røde flag altid? Reagerer de? | Alle vises altid i fast rækkefølge. 6 af 10 kan fremhæves; ingen flyttes op. 3–6 af 10 er synlige uden at rulle |
| Esc Esc? | Rydder alt uden bekræftelse og uden fortryd. Et enkelt klik på en regionsknap gør det samme |
| Tastatur? | Registrering og kopiering 100 %. Vurdering, plan, konflikter og kilder kræver i praksis mus |
