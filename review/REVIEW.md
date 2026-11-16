# Cortex – gennemgang (fase 1)

Branch `review/fable` fra `main` (9c451d5), 2026-11-16. Kun nye filer i `review/`; intet eksisterende er ændret.
Mærkning: **[KØRT]** verificeret ved at køre koden eller appen · **[KODE]** læst i koden · **[KILDE]** slået op i kilden i dag · **[ANTAGET]** min vurdering.

Leverancer: denne fil · `TJEKLISTE.md` (alle 200 kliniske punkter) · `cases/` (21 fiktive konsultationer med snapshots, kører med Vitest) · `mockups/` (2 skærme + skærmbillede af i dag).

---

## 1. Samlet dom

Om Cortex slår at skrive notatet selv, er **ikke målt** (testarket `docs/ux-review/test-frase-mod-cortex.md` er ikke kørt). Det, jeg kan sige ud fra kørte cases [KØRT]:
- **Det sparer:** et ukompliceret notat koster 16–19 tastetryk + 4–5 museklik og giver et komplet, ensartet S/O med konkrete fund og (ved valg) V/P. Røde flag, Ottawa/knee rules og regionale henvisningsveje står klar uden opslag. Ingen data forlader maskinen.
- **Det koster:** faste sætninger, der ikke lyder som en læge ("Forudgående traume. Traume ved vrid. Alder 12–50 år."), ingen tidsangivelse, ingen nuancer uden fritekst, og V/P kræver mus.
- **Største problem:** i den situation du beskriver – Cortex i et halvt vindue ved siden af journalen – ligger **notatet og alle røde flag under skærmkanten** (≤ 800 px bredde: notat 747 px, første flag 863 px nede i et 768 px højt vindue). Næststørst: ét klik kan dokumentere undersøgelser, der ikke er udført, og en rettelse kan slette fund uden besked.
- **Skær ned?** Ja, i ambition, ikke i kode: kernen er notat + røde flag + beslutningsregler + Region H-henvisning. De 163 differentialdiagnoser/behandlinger/henvisninger er UDKAST og ligner i dag godkendte punkter. Byg ikke mere indhold, før de er gennemgået eller bevidst nedprioriteret.

## 2. Top 5 – det jeg ville lave først

| # | Hvad | Hvorfor | Indsats |
|---|---|---|---|
| 1 | **Smalt vindue:** under 800 px vises røde flag som stribe øverst og notatet fast nederst (mockup 1) | I din brugssituation er flag og notat i dag usynlige uden rulning. Klinisk sikkerhed + kerneflow | M |
| 2 | **Ret undervejs uden tavst datatab:** skjul svar i stedet for at slette dem, og vis én linje "4 svar skjult … Fortryd" (mockup 2A) | Knæ: Traume Ja → "4 skridt: Kan ikke" → Traume Nej sletter fundet, og fraktur-flaget mister fremhævningen uden besked [KØRT, case knae-5] | S–M |
| 3 | **Knapper, der viser hele notatpåstanden** (7 valg, mockup 2B) | Fx "Uømt" skriver "negativ crossover-test", "Udtalt" skriver "og hæmatom". Journalnotatet påstår fund, der ikke er undersøgt. Kræver din godkendelse af ordlyden | S |
| 4 | **Felter, så flag kan fremhæves:** feber/rødme/varme i skulder og ankel; alder uden traume i knæ | Septisk artrit (skulder, ankel) og barn med knæsmerter kan i dag aldrig fremhæves eller dokumenteres [KØRT, case skulder-3, ankel-4, knae-4]. Kræver godkendelse | M |
| 5 | **Værn mod patientdata i fritekst:** `spellcheck={false}` på fritekstfelterne + diskret advarsel ved CPR-mønster | Browserens udvidede stavekontrol og udvidelser (fx Grammarly) kan sende fritekst ud, uden om CSP. CPR går i dag ordret i notat og udklipsholder [KØRT, case knae-6] | S |

Uden for koden, men før alt andet: **tag stilling til knæ-flagets handling "akut røntgen, hvis blot ét kriterie i én af reglerne er opfyldt"** – den står ikke i nogen kilde, men er Claudes beslutning i et GODKENDT flag (se §4).

## 3a. Klinisk sikkerhed

**Bliver røde flag altid vist?** Ja [KODE+KØRT]. `Beslutningsstoette` renderer alle `region.roedeFlag` uanset valg; `sorterFlag` flytter kun matchende øverst (test: ingen flag forsvinder). Alle 5 regioner: alle flagtitler synlige uden rulning ved 1366×768 og 1920×1080 med tomt notat. Ingen kode skjuler eller afkræfter et flag; "ikke opfyldt af registreret" viser ingen markering og skriver "udelukker ikke flaget" ved udfoldning.

**Men – konkrete problemer:**

| # | Problem | Klikvej | Alvor |
|---|---|---|---|
| K1 | Smalt vindue skjuler flag og notat | Vindue ≤ 800 px bredt (fx halv skærm 683×768) → tast 4 (Knæ) → notat starter 747 px nede, første flag 863 px nede. Skærmbillede `mockups/foer-smal-683.png` | Kritisk |
| K2 | Rettelse sletter fund tavst og fjerner fremhævning | Knæ: Traume **Ja** → Mekanisme Fald → Alder Over 55 → Ømhed patella **Øm** → 4 skridt **Kan ikke** (flag "Akut knæskade" = MATCHER) → Traume **Nej** → notat "S: Intet traume.", flaget = "ikke vurderet". Samme mønster i alle felter med `visHvis` (skulder traumetype/axillaris, albue mekanisme/ekstensionstest/caput radii/neurovaskulært, ryg udstrålingsside/hoste/rektal, knæ 8 traumefelter) | Høj |
| K3 | Septisk artrit kan ikke fremhæves eller dokumenteres i skulder og ankel | Skulder/Ankel: der findes intet felt for feber, rødme eller varme. Flaget står altid neutralt; feber kan kun skrives i fritekst | Høj |
| K4 | Barn med knæsmerter uden traume | Knæ: Traume Nej → feltet Alder vises ikke → flaget om børn (hoftelidelse, sarkom, leukæmi) kan aldrig fremhæves. Det står nederst som flag nr. 10 | Middel |
| K5 | Henført smerte ved skulder (hjerte, lunge, galdeveje) mangler | Skulder: Venstre → Spontant → Også i hvile → normal objektiv undersøgelse → ingen flag eller differentialdiagnose nævner kardiel/abdominal årsag. Pancoast står i "faldgruber". Ikke i skulderens hovedkilde (LH Skuldersmerter 2019) [KILDE] | Høj (indhold – kræver kilde) |
| K6 | DVT nævnes kun i Baker-flaget (knæ) og slet ikke i ankel | Ankel: hævet ankel uden traume → intet om DVT | Middel (indhold) |
| K7 | Polymyalgia rheumatica og proksimal humerusfraktur mangler som differentialdiagnoser i skulder | – (statisk liste) | Middel (indhold) |
| K8 | Hastegrad i data modsiger den navngivne konflikt | Ryg: henvisning "Akutmodtagelse / pakkeforløb" har `hast: akut`, men malignitet skal efter LH og RH's billedvejledning i pakkeforløb (ikke akut). Konflikten står i teksten; mærket "akut" vælger side | Middel |
| K9 | Knæ "Akut røntgen"-henvisning lister kun Pittsburgh | Knæ → Henvisning → "Akut røntgen af knæ": kriterierne er kun Region H's (Pittsburgh). Flaget siger "ét kriterie i én af reglerne". Knee rules står i konfliktteksten (kun udfoldet) | Lav–middel |
| K10 | Esc Esc rydder alt uden fortryd | Esc, Esc inden for 1 s → hele konsultationen væk | Middel (kendt, UX-rapport F-fund) |

**Kan en alvorlig differentialdiagnose falde ud?** Ikke ved klik [KODE]: listerne er statiske, intet filtreres. Behandling for ikke-valgte diagnoser lægges i "Øvrig behandling" (sammenfoldet, ikke væk). Det, der kan "falde ud", er det, der **aldrig er skrevet ind** (K5–K7) og flag, der **aldrig kan fremhæves** (9 af 37 flag har ingen fremhævningsbetingelse: skulder septisk artrit, albue faldgruber, ryg indre organer og øvrige alarmforhold, knæ patellaluksation, store akutte skader, læghævelse og børn, ankel akut artrit).

Gennemgået mod opgavens eksempler: cauda equina ✓ (felt + flag + akut henvisning; case ryg-2 matcher) · malignitet ryg ✓ (case ryg-3) / skulder delvist (faldgruber) / knæ kun børn · infektion/septisk ✓ knæ, albue, ryg; ✗ skulder, ankel (K3) · fraktur: Ottawa ankel ✓ (case ankel-2), knee rules + Pittsburgh ✓ (K9), skulder ✓, ryg ✓ · akillesruptur ✓ (case ankel-3) · DVT delvist (K6) · henført smerte fra hjerte/abdomen ved skulder ✗ (K5).

**Konsistens i hastegrader [KODE]:** Septisk artrit: akut/CVI i alle fem regioner (albue og ankel formulerer "hurtig"/"samme dag" i den nationale del, men har en akut-henvisning). Fraktur: akut i alle. `hast` kender kun akut/subakut/elektiv, så "straks" (truet ben), "samme dag" og "akut indlæggelse" er samme mærke – ankel skelner i teksten, de andre ikke. Ingen direkte modstrid ud over K8.

## 3b. Kildeforankring

**Generering af klinisk tekst ved kørsel: nej.** Cortex kalder ingen LLM og ingen ekstern tjeneste [KODE]: differentialdiagnoser, behandling og henvisning er kuraterede lister pr. region med kilde-id, status og dato; notatet sammensættes af faste sætninger. CSP `default-src 'none'` blokerer netværk. Den "enkleste løsning" i opgaven er altså allerede bygget.

**Men princippet rammes et andet sted:** indholdet er **skrevet af en model i udviklingen** (`docs/plan.md` §4: "AI bruges kun til at udkaste indhold"). Konsekvenser:
- 163 af 200 punkter er UDKAST – modeltekst, som ingen læge har godkendt. Efter #42 er status kun synlig ved udfoldning, så i konsultationen ligner de godkendte punkter (statuslinjen nederst viser fx "43 UDKAST").
- De 37 røde flag er godkendt samlet 2026-11-15 på grundlag af Claudes egen sammenligning (`docs/plan.md` §7). Jeg har i dag sammenholdt hvert flag sætning for sætning med kilden: 36 er tæt på ordret kildetekst; **1 afviger** (knæ fraktur, handlingen er Claudes beslutning).
- Notatsætningerne (valgenes `notat`) er ikke kildebelagt og har ingen status. Det er efter planen (de beskriver observationer), men 7 af dem påstår mere end knappen (§2 nr. 3).

**Kildetjek i dag [KILDE]:** 44 kildesider hentet fra sundhed.dk (alle tilgængelige). 0 af 200 punkter uden kilde. Alle tal og telefonnumre findes i de citerede kilder. Lægehåndbogens opdateringsdatoer passer med årstallene i data. Region H's forløbsbeskrivelser viser ingen dato → ikke verificeret. Ældste kilder: LH Skuldersmerter (09.08.2019) og LH Albuesmerter (08.02.2019) – begge hovedkilder for deres region.

Risiko ved modeltekst: plausible, flydende formuleringer, der lyder kildetro, men forskyder vægten (fx "akut" frem for "pakkeforløb", K8). Enkleste værn – som allerede er delvist bygget: **kun citater fra kilden i flag og henvisning; modellen må kun vælge og forkorte, ikke formulere** – og din gennemgang via `TJEKLISTE.md`.

## 3c. Patientdata

**Dataflow [KODE+KØRT]:** tastatur/klik → React-hukommelse (fanen) → notattekst på skærmen → **udklipsholder** (Ctrl+Enter) → journalsystemet. Intet skrives til localStorage, cookies, IndexedDB, filer, konsol, analytics eller fejlrapportering. Ingen netværkskald (CSP). Genindlæsning rydder alt.

**Skriver du navn eller CPR i fritekst** [KØRT, case knae-6]: det står ordret i notatet ("S: Højresidige knæsmerter. Jens Hansen 010100-0000.") og kopieres med. Det gemmes ikke og sendes ikke af Cortex. Det ender i journalen, hvor CPR alligevel står.

**Veje ud, som CSP ikke stopper [ANTAGET – afhænger af klinik-pc'en]:**
1. **Browserens udvidede stavekontrol** (Chrome/Edge kan sende tastet tekst til Google/Microsoft) og **browserudvidelser** med adgang til siden (stavekontrol, oversættelse, AI-assistenter). Fritekstfelterne har ikke `spellcheck="false"` [KODE].
2. **Udklipsholderhistorik og -synkronisering** i Windows (Win+V, "synkroniser på tværs af enheder") kan gemme og synkronisere hele notatet.
3. **Vercel-adressen:** bruges den i stedet for den lokale fil, logger Vercel IP og tidspunkt for sidevisning (ingen indhold). Indirekte: tidspunkter for konsultationer.
4. **Indirekte identifikation i fritekst** (erhverv, arbejdsplads, datoer, sjældne detaljer): kun fritekst kan bære det; de strukturerede felter er grove (aldersintervaller, ingen datoer).

**Enkleste værn:** (a) `spellcheck={false}` og `autoCorrect="off"` på fritekstfelter [S]; (b) diskret advarsel ved CPR-mønster (6+4 cifre) i fritekst – ikke blokering [S]; (c) brug den lokale `cortex.html` i en browserprofil uden udvidelser, og slå udklipsholderhistorik fra på klinik-pc'en (instruktion, ingen kode); (d) overvej at gøre Vercel-projektet privat eller fjerne det, når du ikke bruger forhåndsvisningerne.

## 4. Tjekliste over klinisk indhold

Fuld liste: **`review/TJEKLISTE.md`** (200 punkter: kilde, kildedato, status i Cortex, maskinelt tjek, min status). Uddrag:

| Status | Antal | Hvad |
|---|---|---|
| Verificeret (tekst står i kilden) | 36 | Røde flag, sætning for sætning |
| **Afviger** | **1** | Knæ `flag-fraktur`: "Akut røntgen af knæ, hvis blot ét kriterie i én af reglerne er opfyldt" – ikke i kilden; Claudes beslutning (plan.md §7) |
| Ikke verificeret (kun maskinelt: tal ok, ordoverlap målt) | 163 | Differentialdiagnoser, behandling, henvisning (alle UDKAST) |
| Kildedato ikke verificerbar | 11 kilder | Region H's forløbsbeskrivelser viser ingen dato |

Spørgsmål til dig (kræver kilde; jeg skriver ikke indholdet): K5 henført skuldersmerte · K6 DVT · K7 PMR og proksimal humerusfraktur · malignitet hos voksne med knæsmerter · ældste kilder (LH Skuldersmerter og Albuesmerter, 2019) – findes nyere?

Prioritér din verifikation: (1) knæ-fraktur-handlingen, (2) de 14 akutte henvisninger, (3) doser (dicloxacillin, paracetamol/NSAID-doser i ryg og ankel), (4) telefonnumre i ryg (fundet i kilderne i dag; én konflikt om Frederiksberg-nummeret er navngivet).

## 5. Øvrige fund pr. område

Alvor: K kritisk · H høj · M middel · L lav. Indsats: S ≤ 1 time · M ≤ 2 timer · L flere trin.

**Journalnotat**
| Fund | Alvor | Indsats | Ændring |
|---|---|---|---|
| 7 valg dokumenterer mere end knappen (crossover, hæmatom, squeeze, Thompson, 3 nerver + puls, rektal 3 fund) | H | S | Knaptekst = hele påstanden, eller del valget (mockup 2B). Kræver godkendelse |
| Sætninger, der ikke lyder som en læge: "Forudgående traume. Traume ved vrid." / "Alder 12–50 år." / "Anden skademekanisme." | M | S | Notatskabelon: udelad alder i notatet (bruges kun til flag); udelad "Forudgående traume", når mekanisme er valgt. Kræver godkendelse |
| Ingen tidsanker ("varighed få dage") | L | – | Fritekst. Ikke værd at bygge |
| Relevante negative fund kommer kun med, hvis de klikkes; "N" udfylder nu kun 4 fund | – | – | Korrekt efter princippet "kun det, lægen aktivt har valgt". Ingen ændring |
| Kan kopieres uden rettelser? Ja teknisk (ren tekst, én linje pr. S/O/V/P) [KØRT]. Sprogligt: kræver typisk 1–2 rettelser pr. notat [ANTAGET] | M | – | Se ovenfor |

**Flow**
| Fund | Alvor | Indsats | Ændring |
|---|---|---|---|
| V/P kræver mus: 2 klik for første punkt i en sektion (fold ud + klik), derefter 1 | M | M | Tast `V`/`P` på det fokuserede punkt, eller tal i åben sektion |
| Ingen obligatoriske felter, ingen standardværdier, alt kan springes over (↓/Tab) [KØRT] | – | – | God. Bevar |
| Fokusfælde: efter museklik i højre side virker tal/N ikke, før man klikker et felt | L | S | `Esc` (én gang) flytter fokus tilbage til aktivt felt |
| `docs/plan.md` beskriver stadig N som "regionens normalværdier" (forældet efter #41) | L | S | Ret én linje |

**Design og UI**
| Fund | Alvor | Indsats | Ændring |
|---|---|---|---|
| Smalt vindue (K1) | K | M | Mockup 1 |
| UDKAST ligner GODKENDT i sammenfoldet visning | M | S | Antal i sektionsoverskrift: "Behandling (17 · 17 udkast)" – neutral tekst, ét signal |
| Røde flag: farve er ikke eneste signal (venstrekant + tekst "MATCHER" + egen overskrift) [KØRT] | – | – | OK. I mockup 1 tilføjes "!" |
| Notatets maksimale højde (40 %) skubber sektioner ned ved langt notat | L | S | Lad være (din afgørelse i #42) |

**Vedligehold**
| Fund | Alvor | Indsats | Ændring |
|---|---|---|---|
| Indholdet ligger allerede som data adskilt fra kode med kilde, år og `sidstTjekket` pr. kilde og status pr. punkt; tests fanger brudte referencer | – | – | God struktur. Behold |
| Ingen dato pr. punkt for, hvornår *punktet* sidst er sammenholdt (kun pr. kilde) | L | S | Ikke nødvendigt for én bruger |
| Ingen automatisk påmindelse, når en kilde opdateres | L | S | Kør `review/`-scriptet (kildedato vs. `aar`) hver 3. måned; en 10-linjers test kan sammenligne mod en gemt dato. Kræver netværk → manuelt |
| 2 hovedkilder fra 2019 | M | – | Din vurdering (tjekliste) |
| Testsættet kører ikke med `npm run check` | L | S | Flyt ind i `vite.config.ts` i fase 2 |

## 6. Interaktioner pr. region

Kørt med tastaturet i den byggede `cortex.html` (1366×768); alle 21 notater identiske med snapshots [KØRT]. Tastetryk inkl. regionsvalg, piletaster, tal, Enter efter fritekst og Ctrl+Enter. Fritekst tælles som 1. V/P med mus. Obligatoriske felter: 0 i alle regioner.

| Region | Case (ukompliceret) | Felter | Tastetryk | Museklik (V/P) | Rødt flag-case | Tastetryk | Klik |
|---|---|---|---|---|---|---|---|
| Skulder | impingement | 15 | 18 | 5 (3 punkter) | traumatisk cuff | 19 | 5 |
| Albue | lateral epikondylit | 10 | 17 | 4 (2) | caput radii | 20 | 4 |
| Ryg | uspecifik | 12 | 18 | 5 (3) | cauda equina | 21 | 4 |
| Knæ | degenerativ | 13 | 16 | 4 (2) | vridtraume | 25 | 4 |
| Ankel | distorsion | 15 | 19 | 4 (2) | akillesruptur | 19 | 6 |

Planens mål var 8–12 tastetryk for en ukompliceret patient; den reelle pris er 16–19, fordi hvert besvaret felt koster ét tryk, og overspringede felter koster en pil. Rettelse undervejs er dyrt: knæ-5 (6 svar, én rettelse) kostede 44 tryk, fordi man skal pile tilbage.

**Estimat efter forbedringerne:** tastetryk stort set uændret (±2); museklik 4–6 → 0, hvis V/P får tastatur (§5). Mine top 5 handler om sikkerhed, ikke hastighed. Hastighed vindes kun ved at fjerne felter – det bør afgøres af testarket, ikke af mig.

## 7. Nye funktioner

**Gør det**
- **Sikkerhedsnet i P** ("kontakt igen hvis …") som afkrydsningspunkter pr. region med kilde – samme mekanisme som behandling (ankel har allerede `beh-opfoelgning`). Automatiserer dokumentation uden skøn.
- **V/P med tastatur.** Fjerner de sidste museklik.

**Måske senere** (efter testarket)
- **Henvisningstekst efter Region H's kriterier** – kun som omformatering af de allerede registrerede fund (RH's knæforløb lister selv, hvad henvisningen skal indeholde). Ingen ny klinisk tekst.
- **Regionsspecifikke tests med udførelse/fortolkning** – kun som kildebelagt fold-ud ved de felter, der navngiver en test. Mest værdi for yngre læger; du kender testene.

**Lad være**
- **Automatisk "udelukket"-sektion:** strider mod princippet "skriv aldrig ingen røde flag". Fravær af registrering er ikke udelukkelse; de negative fund, du aktivt klikker, står allerede i notatet.
- **Øvelsesark/patientinformation:** nyt indhold at vedligeholde og uden for de to mål. Link evt. i P-sætningen til eksisterende materiale.
- **Ydelseskoder:** journalsystemet håndterer det, overenskomsten ændrer sig, og det mindsker ikke belastningen i konsultationen.

## 8. Journalnotat før og efter (knæ, case `knae-2-vridtraume`)

**Før [KØRT]:**
```
S: Venstresidige knæsmerter. Akut debut. Varighed få dage. Forudgående traume. Traume ved vrid. Hævelse opstod umiddelbart efter traumet. Hørt eller følt et knæk ved traumet. Alder 12–50 år. Reduceret belastningsevne.
O: Moderat hævelse. Klinisk mistanke om instabilitet. Ingen direkte ømhed på patella. Ingen ømhed på caput fibulae. Kan flektere knæet til 90 grader. Går fire vægtbærende skridt ved undersøgelsen. Kan løfte strakt ben mod tyngdekraften.
V: Foreneligt med skade på forreste korsbånd.
P: Henvist akut til CVI.
```
**Efter (kun strukturelle forslag; samme sætninger, intet nyt indhold):** alder udelades af notatet (feltet bruges stadig til fraktur-flaget), "Forudgående traume" udelades, når mekanisme er valgt.
```
S: Venstresidige knæsmerter. Akut debut. Varighed få dage. Traume ved vrid. Hævelse opstod umiddelbart efter traumet. Hørt eller følt et knæk ved traumet. Reduceret belastningsevne.
O: Moderat hævelse. Klinisk mistanke om instabilitet. Ingen direkte ømhed på patella. Ingen ømhed på caput fibulae. Kan flektere knæet til 90 grader. Går fire vægtbærende skridt ved undersøgelsen. Kan løfte strakt ben mod tyngdekraften.
V: Foreneligt med skade på forreste korsbånd.
P: Henvist akut til CVI.
```
Yderligere forkortelse (fx "Vridtraume for få dage siden med straks hævelse og knæk") kræver nye sætninger og dermed din formulering.

## 9. Implementeringsplan (fase 2 – ét trin ad gangen, hvert testet og committet for sig)

| Trin | Indhold | Test | Kræver din godkendelse af klinisk tekst |
|---|---|---|---|
| 1 | Testsættet ind i `npm run check` (include `review/cases`) | Alle 21 snapshots grønne | Nej |
| 2 | `spellcheck={false}` + CPR-mønster-advarsel i fritekst | Ny test i `lib/` for mønstret; case knae-6 viser advarsel (snapshot uændret) | Nej |
| 3 | Smalt vindue (< 800 px): flagstribe øverst, notat fast nederst | Playwright-måling 683×768: alle matchende flag + notat synlige uden rulning | Nej |
| 4 | Ret undervejs: skjulte svar bevares (vises ikke, indgår ikke i notat eller flag) + linje "N svar skjult … Fortryd" | Case knae-5 og ryg-4 ændres bevidst (vis forskel) | Nej |
| 5 | UDKAST-antal i sektionsoverskrifter | Visuel | Nej |
| 6 | Knaptekster = hele notatpåstanden (7 valg) | Snapshots uændrede (kun knaptekst) | **Ja, pr. valg** |
| 7 | Nye felter: feber/rødme/varme (skulder, ankel), alder uden traume (knæ) + fremhævning | Case skulder-3, ankel-4, knae-4 ændres bevidst | **Ja** (felt, notatsætning, betingelse) |
| 8 | Notatskabelon: udelad alder og "Forudgående traume" | Snapshots ændres bevidst | **Ja** |
| 9 | V/P med tastatur | Ny test i `src/tast.ts` | Nej |
| 10 | Sikkerhedsnet-punkter i P pr. region | Nye punkter = UDKAST | **Ja, ordlyd + kilde** |
| – | Ret `docs/plan.md` (N-beskrivelse) | – | Nej |

Det, der bør slettes eller arkiveres (din afgørelse, intet er rørt): intet i denne omgang. `dist/` ligger i arbejdsmappen, men er ikke versioneret.

---

## Arbejdsnoter (trin 1: systemet)

- **Struktur:** React 19 + TypeScript, Vite bygger én selvstændig `cortex.html` (≈380 kB). `src/` app (≈800 linjer), `lib/` logik med tests (≈260 linjer), `indhold/` kliniske data (≈4.000 linjer i 5 regionsfiler + `faelles.ts`), `docs/`, `arkiv/` (gammel Next.js-udgave, udelukket fra build).
- **Klinisk indhold er data, ikke kode.** Én TS-fil pr. region med typerne i `indhold/typer.ts`: felter (valg med fast notatsætning), notatskabelon, kilder (udgiver, år, url, `sidstTjekket`), røde flag (tekst, handling, `fremhaevHvis`), differentialdiagnoser, behandling, henvisning. Hvert klinisk punkt har `kilder[]`, `status` (UDKAST/GODKENDT), evt. `godkendtDato` og `konflikt`. `indhold/indhold.test.ts` validerer referencer, datoer, at GODKENDT har kilde og dato, og at hvert valg i et flag-felt fremhæver noget.
- **Logik:** `lib/notat.ts` (`bygNotat`, `saetSvar`, `passer`), `lib/flag.ts` (flagstatus: matcher / ikke vurderet / ikke opfyldt / uden betingelse), `lib/tastatur.ts` (tal, N, pile), `src/tast.ts` (tastetolkning, ren funktion).
- **Notatet:** genereres deterministisk. Hvert valgt svar bidrager med sin faste sætning fra indholdsfilen, i skabelonens rækkefølge (S/O). V og P er de faste `notat`-sætninger fra de diagnoser/behandlinger/henvisninger, lægen selv krydser af. Fritekst (2 felter, max 200 tegn) indsættes ordret. Ubesvarede felter udelades. Intet valgt = tomt notat.
- **LLM: ingen.** Ingen kald til nogen model eller ekstern tjeneste. `grep` efter fetch/XMLHttpRequest/WebSocket/sendBeacon/openai/anthropic i `src`, `lib`, `indhold`: 0 fund. CSP i `index.html`: `default-src 'none'` – browseren blokerer alle netværkskald. Planens fravalg (docs/plan.md §4) bekræftes. Differentialdiagnoser og anbefalinger er altså kuraterede lister pr. region med kilde – det, opgaven foreslår som "enkleste løsning", er allerede bygget.
- **Lagring: ingen.** Ingen localStorage/sessionStorage/IndexedDB/cookies/console-logning/analytics/fejlrapportering (0 fund). State lever kun i React-hukommelsen; genindlæsning rydder. Eneste udgang er udklipsholderen (`lib/kopier.ts`, med `execCommand`-reserve).
- **Deploy:** (1) `cortex.html` i repo-roden åbnes lokalt med dobbeltklik på klinik-pc'en (tiltænkt driftssted). (2) Vercel bygger hver branch og `main` til en offentlig adresse med `noindex`-header (`vercel.json`). Offentlig adresse betyder ikke datalæk (appen sender intet), men koden og det kliniske indhold er offentligt tilgængeligt, og en kollega kan finde og bruge en UDKAST-version.
- **Allerede gennemført før denne gennemgang:** UX-gennemgang (`docs/ux-review/rapport.md`), N-begrænsning (#41) og kompakt beslutningsstøtte (#42). Jeg genbruger fund derfra og henviser i stedet for at gentage.
