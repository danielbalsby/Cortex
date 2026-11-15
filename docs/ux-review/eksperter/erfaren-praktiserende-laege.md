# Ekspertevaluering: Erfaren praktiserende læge

Simuleret perspektiv (20+ år i almen praksis, Region Hovedstaden). Grundlag: faktagrundlaget, `indhold/knae.ts`, `lib/notat.ts`, `src/tast.ts`, skærmbillederne og egen gennemspilning af A–E i `cortex.html` (Playwright, 1366×768, 2026-11-15). Mærker: `[KODE]`, `[APP]`, `[UDLEDT]`.

## 1. Samlet dom

CORTEX koster mig i dag overskud i fire af fem scenarier. Registreringen er hurtig, men notatet skal redigeres bagefter, og vurdering og plan kræver mus og rulning gennem 6–10 skærmhøjder.
Kun det ukomplicerede traumeknæ (A) er tæt på at være hurtigere end min egen frase i journalsystemet – og dér er `N` samtidig farligst.
Jeg ville beholde de røde flag og de regionale henvisningsveje som opslag og droppe notatet, indtil det kan kopieres ind uden rettelser.

## 2. Top 5 problemer

**1. `N` dokumenterer undersøgelser, jeg ikke har lavet, og laver selvmodsigende notater. Kritisk. `[APP]` (egen kørsel) + `[KODE]` `lib/tastatur.ts:45-53`. Scenarie A, D, E.**
I scenarie E gav `N` efter "Svært nedsat bevægelighed" og "Kan ikke støtte på benet" dette: *"Svært nedsat bevægelighed. Stabilt ved klinisk ligamenttest. … Kan flektere knæet til 90 grader. Går fire vægtbærende skridt ved undersøgelsen. Kan løfte strakt ben mod tyngdekraften."* Et aflåst knæ, der flekterer til 90° og går fire skridt, hos en patient, der ikke kan støtte. I A blev "Ingen ledlinjeømhed. Fuld bevægelighed" skrevet, fordi jeg sprang felterne over med pil ned; et akut hævet knæ med fuld bevægelighed er ikke troværdigt. Felter, jeg bevidst springer over, er netop dem, `N` udfylder. Konsekvens: fejldokumentation i et notat, der kan ende i en klagesag, og de fem fund, der afgør akut røntgen, står som normale uden stillingtagen.

**2. Notatet kan ikke kopieres ind uden redigering. Høj. `[APP]`. Alle scenarier.**
Notat A er 12 sætninger i S og 11 i O. Som kliniker ville jeg slette eller rette:
- "Forudgående traume. Traume ved vrid." – to sætninger for én oplysning.
- "Alder 12–50 år." – hører ikke hjemme i et notat; alderen står i journalen. `[KODE]` `knae.ts:114`
- "Højresidige knæsmerter. Akut debut. Varighed få dage." – telegramstil uden kontaktårsag; "i går til fodbold" kan kun skrives i fritekst.
- "Ingen låsning. Ingen feber." i et artrosenotat (B) – fyld.
- V: "Foreneligt med gonartrose." og P: "Henvist akut til CVI." kan ikke nuanceres, fordi der ikke er fritekst til V/P og notatet ikke kan rettes i Cortex `[KODE]` (jf. faktagrundlag, `src/Notat.tsx:24`).
- Der mangler altid: aftale om opfølgning, hvad patienten er informeret om, sygemelding og sikkerhedsnet.
Min egen frase eller diktering giver et kortere og mere læsbart notat. `[UDLEDT]`

**3. Vejen fra fremhævet flag til handling er for lang i det tidskritiske scenarie. Høj. `[APP]`. Scenarie C (og A, E).**
I C fremhæves bakteriel artrit øverst – godt. Men `+ V` lå ca. 3.000 px og `+ P` "Akut indlæggelse" ca. 1.350 px længere nede end det synlige område i min kørsel, og der er intet telefonnummer til CVI `[KODE]` (jf. faktagrundlag). Den erfarne læge ringer bare; så bruges Cortex ikke, og notatet skrives i journalen alligevel. Alloplastik – den vigtigste oplysning – kan kun stå i fritekst og påvirker intet.

**4. Felterne passer ikke til de patienter, jeg ser. Høj. `[KODE]` `knae.ts:86-93, 108-111`. Scenarie A, B, D.**
- A: Hævelse efter få timer kan ikke registreres. Jeg måtte vælge "Hævelse straks: ja" → notatet siger "umiddelbart efter traumet", hvilket er forkert anamnese. Instabilitetsfølelse findes kun som objektivt fund.
- B: Alder kan ikke angives uden traume; krepitation, morgenstivhed og igangsætningssmerter findes ikke som felter, selv om de står som kendetegn for gonartrose.
- D: Alder og halten kan ikke registreres. Notatet for en 12-årig blev "Ingen hævelse … Stabilt ved klinisk ligamenttest", ingen flag fremhævet, og børneflaget står som nr. 10 uden for skærmen `[APP]`. Cortex leder ikke tanken mod hoften; den ser tværtimod beroligende ud. Hofteundersøgelse kan ikke dokumenteres. `[KRÆVER FAGLIG KILDEKONTROL]`: Skal knæmodulet have et felt for hofteundersøgelse hos børn/unge, og hvad siger kilderne om hvilke fund?

**5. Konflikten ved aflåst knæ flytter arbejdet over på mig. Middel. `[APP]` skærmbillede 05 + `[KODE]` `knae.ts:494, 504-508`. Scenarie E.**
"Akut eller subakut, se konflikt" efterfulgt af tre citater og "Lægehåndbogen 2026 · Lægehåndbogen 2026" hjælper ikke midt i en konsultation. Jeg arbejder i Region Hovedstaden; den regionale forløbsbeskrivelse er den, jeg henviser efter. Svaret findes allerede i henvisningspunktet "CVI, subakut (< 1 uge)", men flaget peger ikke derhen. Det forvirrer mere, end det hjælper. Om den regionale vej skal stå først i handlingen, er lægens beslutning – ikke min og ikke Claudes.

Yderligere støj for en erfaren læge: 10 flag med fuld tekst uanset patient (jeg kan dem); "GODKENDT 2026-11-15" på hvert flag (min egen godkendelse fortæller mig intet i konsultationen); 43 UDKAST-punkter med stiplet kant; "osteosarkom, leukæmi" synligt for patienten ved artroseknæet `[KODE]` `knae.ts:587`.

## 3. Måltal pr. scenarie

Målt i appen: tastetryk og klik (egen kørsel, 1366×768). Skøn: opslag, blik og tid.

| Scenarie | Tastetryk (målt) | Museklik V+P (målt) | Opslag uden for Cortex (skøn) | Blik væk fra patienten (skøn) | Tid i Cortex (skøn) | Redigering bagefter (skøn) |
|---|---|---|---|---|---|---|
| A | 19 + 21 tegn fritekst | 2 + rulning | 1 (CVI-kontakt) | 4–6 | 60–90 s | 30–60 s |
| B | 14 | 3 + rulning | 0 | 3–4 | 45–60 s | 20–30 s |
| C | 14 + 25 tegn fritekst | 2 + rulning | 1 (telefonnummer) | 3–5 | 45–75 s | springes over; jeg ringer |
| D | 10 + 13 tegn fritekst | – | 1–2 (hofte, børn) | 3–4 | 30 s, derefter ubrugeligt | hele notatet |
| E | 19 | 2 + rulning | 1 (regional vejledning) | 4–6 | 60–90 s | 60 s (modsigelser fra `N`) |

Dertil `Ctrl+Enter` og vinduesskift. Sammenligning: en frase i journalsystemet til artroseknæ er skønsmæssigt 10–20 s plus rettelser. Om Cortex er hurtigere end frase eller diktering, er `[KRÆVER BRUGERTEST]`.

## 4. Hvad der virker og skal bevares

- Taltaster med automatisk fremrykning: 14 tryk til S+O i B er reelt hurtigt `[APP]`.
- Tomt input giver tomt notat; intet forudfyldt. `[KODE]`
- B giver nul fremhævede flag – ingen falske alarmer. `[APP]`
- Flag skjules aldrig, og der står aldrig "ingen røde flag".
- Regionsspecifikke henvisningsveje (CVI akut/subakut/elektiv, reumatologisk hotline med numre, "MR ordineres ikke fra almen praksis") er det eneste indhold, jeg som erfaren læge faktisk slår op. Det er appens største værdi.
- Frakturflaget med begge regler og en klar handling ("ét kriterie i én af reglerne") – sådan bør en konflikt se ud, når lægen selv har godkendt beslutningen.
- Ingen lagring, ingen netværkskald.

## 5. Hvad der bør fjernes

- `N` for de fem traumefund og for stabilitet (præcedens: rektaleksploration i ryg har ingen normalværdi, jf. faktagrundlag). Alternativt: fjern `N` helt og mål, om det savnes.
- "Alder x–y år" i notatteksten (behold feltet til flagene).
- GODKENDT-mærket og datoen i konsultationsvisningen; hører til på gennemgangssiden.
- Fuld tekst på ikke-fremhævede flag: overskrift er nok, tekst ved behov. `[KRÆVER BRUGERTEST]`
- Dobbeltsætninger ("Forudgående traume. Traume ved vrid.").
- Behandlingspunkter, som enhver praktiserende læge kan i søvne (paracetamol, RICE), medmindre de bruges til P-linjen.

## 6. Én radikal idé

Vend appen om: lad Cortex være et opslagskort pr. region – røde flag i overskriftsform og "hvem ringer/henviser jeg til i Region H, hvor hurtigt, og hvad skal henvisningen indeholde" på én skærm uden rulning – og lad notatet være sekundært. Notatdelen beholdes kun for scenarier, hvor den beviseligt slår frasen (formentlig traumeknæet med røntgenreglerne). Begrundelse: den erfarne læge mangler ikke hjælp til at skrive "medial ledlinjeømhed", men til at huske den regionale vej og fristen. Det kræver intet nyt klinisk indhold, kun omprioritering af det, der findes.

## 7. Usikkerhed og brugertest

- Om min egen fejlregistrering spiller ind: i A valgte jeg "Hørt/følt knæk: ja", som scenariet ikke nævner; flaget var også fremhævet uden. Tallene er fra én kørsel pr. scenarie.
- Tid, blik og sammenligning med frase/diktering er skøn. `[KRÆVER BRUGERTEST]`
- Om `N` i praksis bruges refleksmæssigt, eller om lægen når at læse notatet igennem. `[KRÆVER BRUGERTEST]`
- Om patienter reagerer på flagteksterne på skærmen. `[KRÆVER BRUGERTEST]`
- Jeg har ikke åbnet kilderne og vurderer ikke, om indholdet er fagligt korrekt. Spørgsmål til lægen `[KRÆVER FAGLIG KILDEKONTROL]`: Dækker kilderne et tidsbegreb for hævelse ("straks" vs. "inden for få timer"), som feltet bør følge? Bør alloplastik og andre risikofaktorer for infektion være felter, der fremhæver flaget?
- Hvad ville få mig til at stoppe efter en uge: første gang jeg finder et `N`-fund i journalen, som jeg ikke har undersøgt; eller når jeg tredje dag i træk retter de samme tre sætninger i hvert notat.
