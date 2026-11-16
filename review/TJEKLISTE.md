# Tjekliste: klinisk indhold til lægens verifikation

Genereret 2026-11-16 fra `indhold/*.ts` (200 punkter). Kilderne er hentet i dag fra sundhed.dk (44 sider, alle HTTP 200).

**Sådan læses kolonnerne**
- **Status i Cortex:** GODKENDT/UDKAST som i indholdsfilen.
- **Maskinelt tjek:** *tal ok* = alle tal (doser, grader, år, uger, telefonnumre) i punktet findes i mindst én af de citerede kilder. *ord* = andel af punktets ord, der findes i kilderne (mål for, hvor tæt det er på kildeteksten; 1,00 = næsten ordret). Et maskinelt tjek er **ikke** en klinisk verifikation.
- **Min status:** *verificeret* = røde flag: hver sætning er i dag sammenholdt med kildeteksten (maskinelt sætning for sætning; de 8 sætninger med lavest overlap og 11 hele flag er læst manuelt). Det bekræfter, at teksten står i kilden – ikke at kilden er den bedste. *afviger* = punktet siger noget, kilden ikke siger. *ikke verificeret* = kun maskinelt tjekket. Det er dig, der verificerer klinisk.
- **Kildedato:** Lægehåndbogens "Opdateret"-dato på siden i dag. Region Hovedstadens forløbsbeskrivelser viser ingen dato i den hentede side → årstallet kan ikke bekræftes ("–").

**Samlet resultat:** 200/200 punkter har kilde. 0 tal og 0 telefonnumre mangler i kilderne. Årstal i data = Lægehåndbogens opdateringsår for alle LH-kilder. 37 røde flag: 36 tæt på ordret kildetekst; 1 afviger (knæ, fraktur – se nedenfor). 163 punkter (differentialdiagnoser, behandling, henvisning) er UDKAST og ikke verificeret af mig ud over det maskinelle tjek.

## Afviger

- **knae/flag-fraktur:** Handlingen "Akut røntgen, hvis blot ét kriterie i én af reglerne er opfyldt" står ikke i nogen kilde. Den er Claudes beslutning (docs/plan.md §7, 2026-11-15), indarbejdet i et GODKENDT flag. Behold, omformulér eller fjern – men tag aktivt stilling.

## Mangler i indholdet (spørgsmål til dig – kræver kilde, jeg skriver ikke indholdet)

| Region | Hvad mangler | Hvorfor det betyder noget | Kilde at undersøge |
|---|---|---|---|
| Skulder | Henført smerte fra hjerte, lunger, galdeveje/subfrenisk (fx AKS, Pancoast nævnes allerede) | Venstresidige skuldersmerter uden mekanisk mønster kan være kardielle. Ikke nævnt i LH Skuldersmerter (2019), som er skulderens hovedkilde | LH Skuldersmerter (2019 – den ældste kilde i Cortex); evt. nyere LH-side eller DSAM |
| Skulder | Polymyalgia rheumatica som differentialdiagnose | Bilaterale skulder-/bækkenbæltesmerter > 50 år; behandles helt anderledes | LH Polymyalgia rheumatica |
| Skulder | Proksimal humerusfraktur som differentialdiagnose | Står kun i flaget og i LH Skulderluksation som differentialdiagnose | LH Skulderluksation (2025) |
| Skulder | Felter til feber/rødme/varme | Flaget septisk artrit kan aldrig fremhæves og kan ikke dokumenteres i notatet | – (felt, ikke klinisk tekst) |
| Ankel | Felter til feber/rødme/varme | Som skulder: flaget akut artrit kan aldrig fremhæves | – |
| Ankel | DVT ved hævet underben uden passende traume | Ikke nævnt i ankelregionen | LH Ankelsmerter (2026) / LH DVT |
| Knæ | DVT som differentialdiagnose | Nævnes kun i flaget om Bakers cyste | LH Bakers cyste (2026) |
| Knæ | Alder uden traume (barn) | Alderfeltet vises kun ved traume, så flaget om børn (hoftelidelse) kan aldrig fremhæves | – (felt) |
| Knæ | Malignitet hos voksne (nattesmerter, hvilesmerter) | Kun nævnt for børn | LH Knæsmerter (2026) |
| Ryg | Abdominalt aortaaneurisme som felt | Flaget om indre organer kan aldrig fremhæves | – |

## Hele listen


### Skulder

| Type | Id | Kort tekst | Kilder (opd.) | Status i Cortex | Maskinelt tjek | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-luksation` | Akut skulderluksation: armen immobiliseres, skulderen kan hverken bevæges aktivt eller pas… | Lægehåndbogen 2025 (opd. 28.07.2025) | GODKENDT | tal ok · ord 0.80 | verificeret |
| Rødt flag | `flag-fraktur` | Brud eller seneruptur efter kraftigt traume eller overbelastning: bevægeindskrænkning, fej… | Lægehåndbogen 2019 (opd. 09.08.2019); Region Hovedstaden 2024 (opd. –) | GODKENDT | tal ok · ord 0.94 | verificeret |
| Rødt flag | `flag-traumatisk-cuff` | Traumatisk rotator cuff-ruptur (tidskritisk): relevant traume og nedsat kraft i et eller f… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2025 (opd. 28.07.2025); Lægehåndbogen 2019 (opd. 09.08.2019) | GODKENDT | tal ok · ord 0.84 | verificeret |
| Rødt flag | `flag-cuff-efter-luksation` | Over 40 år efter skulderluksation: øget risiko for rotator cuff-skade. Nedsat styrke i rot… | Lægehåndbogen 2025 (opd. 28.07.2025) | GODKENDT | tal ok · ord 0.96 | verificeret |
| Rødt flag | `flag-faldgruber` | Diagnostiske faldgruber: thoracic outlet syndrom, radikulopati, leukæmi, sarkom, lungetumo… | Lægehåndbogen 2019 (opd. 09.08.2019); Region Hovedstaden 2024 (opd. –) | GODKENDT | tal ok · ord 0.87 | verificeret |
| Rødt flag | `flag-septisk` | Septisk artrit: varmt, rødt, betydeligt hævet led, feber eller medtaget almentilstand. Dis… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2019 (opd. 09.08.2019) | GODKENDT | tal ok · ord 0.86 | verificeret |
| Diff.diagnose | `diff-impingement` | Subacromielt smertesyndrom / rotator cuff-tendinopati (impingement) Hyppigste årsag; oftes… | Lægehåndbogen 2021 (opd. 16.12.2021); Lægehåndbogen 2019 (opd. 09.08.2019); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.83 | ikke verificeret |
| Diff.diagnose | `diff-bursit` | Akut bursit (evt. bursitis calcarea) Meget akut indsættende smerter, der hindrer nattesøvn… | Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Diff.diagnose | `diff-kapsulit` | Kapsulit (frossen skulder) Svære smerter dag og nat uden udløsende årsag; efter et par mån… | Lægehåndbogen 2024 (opd. 07.06.2024); Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 0.75 | ikke verificeret |
| Diff.diagnose | `diff-traumatisk-cuff` | Traumatisk rotator cuff-ruptur Relevant traume (fx fald på skulderen); oftere over 40 år N… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.74 | ikke verificeret |
| Diff.diagnose | `diff-degenerativ-cuff` | Degenerativ (ikke-traumatisk) rotator cuff-skade Gradvis debut, ofte over 40 år, gentagne … | Lægehåndbogen 2025 (opd. 28.07.2025); Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 0.79 | ikke verificeret |
| Diff.diagnose | `diff-instabilitet` | Skulderluksation / posttraumatisk instabilitet Under 40 år giver traume oftere luksation T… | Lægehåndbogen 2019 (opd. 09.08.2019); Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Diff.diagnose | `diff-ac` | AC-ledslidelse (artrose, artrit, ledbåndsskade) Smerter over AC-leddet med udstråling til … | Lægehåndbogen 2026 (opd. 14.03.2026); Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 0.72 | ikke verificeret |
| Diff.diagnose | `diff-gh-artrose` | Artrose i glenohumeralleddet Både aktiv og passiv bevægelighed nedsat (stivhed) gør artros… | Lægehåndbogen 2025 (opd. 28.07.2025); Lægehåndbogen 2019 (opd. 09.08.2019); Region Hovedstaden 2024 (opd. –) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Diff.diagnose | `diff-cervikal` | Cervikal lidelse / radikulopati Smerter også i nakke eller skulderbue; udstråling og evt. … | Lægehåndbogen 2019 (opd. 09.08.2019); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Diff.diagnose | `diff-suprascapularis` | Indklemning af n. suprascapularis Idrætsudøvere (fx volleyball, svømning, kast, tennis) Ne… | Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 0.86 | ikke verificeret |
| Behandling | `beh-generelt` | De fleste skulderlidelser behandles konservativt i almen praksis. Råd om aflastning for at… | Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Behandling | `beh-analgetika` | Smertestillende afpasses efter behov: paracetamol og/eller NSAID initialt; NSAID i lavest … | Lægehåndbogen 2019 (opd. 09.08.2019); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.94 | ikke verificeret |
| Behandling | `beh-traening` | Impingement og rotator cuff-lidelse: træning i mindst 3 måneder – holdningskorrektion samt… | Lægehåndbogen 2021 (opd. 16.12.2021); Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 0.79 | ikke verificeret |
| Behandling | `beh-subakromiel` | Subakromiel glukokortikoid (med lokalanæstesi) som hjælp til at komme i gang med træning –… | Lægehåndbogen 2021 (opd. 16.12.2021); Lægehåndbogen 2019 (opd. 09.08.2019); Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.86 | ikke verificeret |
| Behandling | `beh-ingen-effekt` | Shockwave, laser, ultralydsbehandling og lignende har ingen dokumenteret effekt ved rotato… | Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Behandling | `beh-kapsulit` | Kapsulit: røntgen for at udelukke anden årsag; NSAID/paracetamol; intraartikulær blokade e… | Lægehåndbogen 2024 (opd. 07.06.2024) | UDKAST | tal ok · ord 0.96 | ikke verificeret |
| Behandling | `beh-luksation` | Efter reponeret luksation: amslynge 2–3 uger (hospitalets plan), tidlig bevægetræning, der… | Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.81 | ikke verificeret |
| Behandling | `beh-ac` | AC-ledsartrose: aktivitetstilpasning (tunge belastninger med albuerne ind til siden, undgå… | Lægehåndbogen 2026 (opd. 14.03.2026) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Behandling | `beh-roentgen` | Billeddiagnostik er almindeligvis ikke indiceret initialt. Røntgen ved traume (fraktur/luk… | Lægehåndbogen 2019 (opd. 09.08.2019); Region Hovedstaden 2024 (opd. –); Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Behandling | `beh-arbejde` | Ved arbejdsbetinget belastning: undgå ensidigt arbejde, find bedre arbejdsstilling, tag pa… | Lægehåndbogen 2019 (opd. 09.08.2019) | UDKAST | tal ok · ord 0.79 | ikke verificeret |
| Henvisning | `hen-luksation-akut` | Hospital (skadestue) Akut skulderluksation – røntgen og reposition. | Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Henvisning | `hen-traume-roentgen` | Røntgen af skulder Relevant traume – for at afklare fraktur (og luksation). | Lægehåndbogen 2025 (opd. 28.07.2025); Region Hovedstaden 2024 (opd. –) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Henvisning | `hen-ul` | Ultralydsscanning af skulder Mistanke om traumatisk seneruptur (rotator cuff eller lange b… | Region Hovedstaden 2024 (opd. –) | UDKAST | tal ok · ord 0.83 · konflikt | ikke verificeret |
| Henvisning | `hen-traumatisk-cuff` | Ortopædkirurgisk afdeling (traumatisk rotator cuff-ruptur) Traumatisk gennemgående eller t… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.84 · konflikt | ikke verificeret |
| Henvisning | `hen-cuff-efter-luksation` | Ultralyd eller ortopædkirurg Over 40 år med nedsat styrke i rotator cuffen 2–4 uger efter … | Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.94 | ikke verificeret |
| Henvisning | `hen-instabilitet` | Skulderspecialist (ortopædkirurg) 15–40 år: efter mindst 3 måneders genoptræning ved forts… | Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.84 | ikke verificeret |
| Henvisning | `hen-impingement` | Ortopædkirurgisk afdeling (impingement / ikke-traumatisk cuff-lidelse) Utilstrækkelig bedr… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2025 (opd. 28.07.2025) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Henvisning | `hen-kapsulit` | Ortopædkirurg Kapsulit uden tilstrækkelig effekt af ikke-kirurgisk behandling efter 6 måne… | Lægehåndbogen 2024 (opd. 07.06.2024) | UDKAST | tal ok · ord 0.89 | ikke verificeret |
| Henvisning | `hen-ac` | Ortopædkirurg (AC-ledsresektion) Symptomgivende AC-ledsartrose over 6 måneder uden effekt … | Lægehåndbogen 2026 (opd. 14.03.2026) | UDKAST | tal ok · ord 0.94 | ikke verificeret |
| Henvisning | `hen-arbejdsmedicin` | Arbejdsmedicinsk afdeling Skulderbelastende arbejde (nu eller tidligere): vurdering af arb… | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.82 | ikke verificeret |
| Henvisning | `hen-idraet` | Idrætsmedicinsk afdeling Skulderskade opstået ved idræt eller med betydende idrætsmæssig g… | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) Mistanke om septisk artrit. | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.89 | ikke verificeret |

### Albue

| Type | Id | Kort tekst | Kilder (opd.) | Status i Cortex | Maskinelt tjek | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-fraktur-luksation` | Fraktur eller luksation efter traume (ofte fald på strakt arm): smerter, hævelse/blødning,… | Lægehåndbogen 2021 (opd. 08.03.2021); Lægehåndbogen 2024 (opd. 25.01.2024) | GODKENDT | tal ok · ord 0.94 | verificeret |
| Rødt flag | `flag-neurovaskulaer` | Neurovaskulær påvirkning ved fraktur eller luksation: undersøg a. brachialis (puls ved hån… | Lægehåndbogen 2021 (opd. 08.03.2021) | GODKENDT | tal ok · ord 0.96 | verificeret |
| Rødt flag | `flag-muskelsene` | Muskel-seneskade efter hyperekstensions- eller hyperfleksionstraume: muskeldiskonfiguratio… | Lægehåndbogen 2021 (opd. 08.03.2021) | GODKENDT | tal ok · ord 0.88 | verificeret |
| Rødt flag | `flag-septisk` | Septisk artrit eller hæmartrose efter traume: varmt, rødt, hævet led, feber eller medtaget… | Lægehåndbogen 2019 (opd. 08.02.2019); Region Hovedstaden 2025 (opd. –) | GODKENDT | tal ok · ord 0.77 | verificeret |
| Rødt flag | `flag-septisk-bursit` | Septisk bursitis olecrani hos patient med albueprotese eller reumatoid artrit (ofte kommun… | Lægehåndbogen 2023 (opd. 21.08.2023) | GODKENDT | tal ok · ord 0.98 | verificeret |
| Rødt flag | `flag-faldgruber` | Diagnostiske faldgruber: fraktur og brusklæsion efter traume; skader i nakke, skulder og h… | Lægehåndbogen 2019 (opd. 08.02.2019); Lægehåndbogen 2025 (opd. 08.04.2025) | GODKENDT | tal ok · ord 0.89 | verificeret |
| Diff.diagnose | `diff-lateral-epikondylit` | Lateral epikondylit (tennisalbue) Hyppigste årsag til overbelastningsrelaterede albuesmert… | Lægehåndbogen 2025 (opd. 08.04.2025); Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Diff.diagnose | `diff-medial-epikondylit` | Medial epikondylit (golfalbue) Overbelastning; smerter medialt, hvor underarmens fleksorer… | Lægehåndbogen 2025 (opd. 08.04.2025); Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.96 | ikke verificeret |
| Diff.diagnose | `diff-bursit` | Bursitis olecrani (aseptisk eller septisk) Hævet, væskefyldt bursa over olecranon Septisk:… | Lægehåndbogen 2023 (opd. 21.08.2023); Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.79 | ikke verificeret |
| Diff.diagnose | `diff-ulnaris` | Ulnarisneuropati Paræstesier og nedsat sensibilitet i 4. og 5. finger Nedsat kraft ved add… | Lægehåndbogen 2025 (opd. 31.07.2025); Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.89 | ikke verificeret |
| Diff.diagnose | `diff-radialis` | Kompression af n. radialis (radialt tunnelsyndrom / supinatorsyndrom) Sjælden; udstrålende… | Lægehåndbogen 2019 (opd. 08.02.2019); Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Diff.diagnose | `diff-caput-radii` | Caput radii fraktur Fald på strakt arm med underarmen i pronation; hyppigste albuefraktur … | Lægehåndbogen 2024 (opd. 25.01.2024) | UDKAST | tal ok · ord 0.89 | ikke verificeret |
| Diff.diagnose | `diff-fraktur-luksation` | Anden albuefraktur eller albueluksation Distal humerus, capitulum, olecranon, processus co… | Lægehåndbogen 2021 (opd. 08.03.2021) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Diff.diagnose | `diff-brusk` | Bruskskade / osteochondritis dissecans / løst legeme Stivhed, klikken, låsninger og latera… | Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Diff.diagnose | `diff-biceps-tendinose` | Biceps tendinose Forreste albuesmerter efter gentagne albuefleksioner og supinationer Ømhe… | Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.96 | ikke verificeret |
| Diff.diagnose | `diff-medial-ligament` | Medial ligamentskade (ulnare kollateralligament) Kastere (fx håndbold); vage mediale smert… | Lægehåndbogen 2019 (opd. 08.02.2019); Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Diff.diagnose | `diff-henfoert` | Henført smerte (cervikal radikulopati, skulder, håndled) C7-radikulopati er differentialdi… | Lægehåndbogen 2025 (opd. 08.04.2025); Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.76 | ikke verificeret |
| Behandling | `beh-generelt` | Undgå aktivitet, der giver smerter – specielt den belastning, der udløste dem. Is kan fors… | Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Behandling | `beh-epik-aflastning-traening` | Epikondylit: aflastning (tilpasning af arbejde; håndledsortose ved stærke akutte smerter),… | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 0.80 | ikke verificeret |
| Behandling | `beh-epik-nsaid` | NSAID kan lindre i den akutte fase, men har ikke bedre effekt end placebo på opheling efte… | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-epik-steroid` | Glukokortikoidinjektion (med lidokain) tenoperiostealt: bedre korttidseffekt, men dårliger… | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 0.93 · konflikt | ikke verificeret |
| Behandling | `beh-epik-ikke` | Chokbølgebehandling, elektroterapi, ultralyd og injektion med blodpladekoncentrat har ikke… | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Behandling | `beh-bursit-aseptisk` | Aseptisk bursitis olecrani: trykaflastning (albuebeskytter, skift arbejdsstilling), let ko… | Lægehåndbogen 2023 (opd. 21.08.2023) | UDKAST | tal ok · ord 0.86 | ikke verificeret |
| Behandling | `beh-bursit-septisk` | Septisk bursitis olecrani hos patient, der ikke er almen påvirket eller septisk: tablet di… | Lægehåndbogen 2023 (opd. 21.08.2023) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Behandling | `beh-ulnaris` | Ulnarisneuropati: aflastning af albue og håndled, særligt ved skrivebordsarbejde; undgå di… | Lægehåndbogen 2025 (opd. 31.07.2025) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-caput-radii` | Caput radii fraktur (konservativt behandlet): armslynge 1–2 uger og tidlig bevægetræning i… | Lægehåndbogen 2024 (opd. 25.01.2024) | UDKAST | tal ok · ord 0.83 | ikke verificeret |
| Behandling | `beh-efterforloeb` | Efterforløb efter albuefraktur, luksation eller opereret muskel-seneskade: ved smerter og … | Lægehåndbogen 2021 (opd. 08.03.2021) | UDKAST | tal ok · ord 0.83 | ikke verificeret |
| Henvisning | `hen-akut-traume` | Akutmodtagelsen Albuetraume med mistanke om fraktur, luksation eller muskel-seneskade (den… | Lægehåndbogen 2021 (opd. 08.03.2021); Lægehåndbogen 2024 (opd. 25.01.2024) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) Mistanke om septisk artrit; hæmartrose efter tra… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2019 (opd. 08.02.2019) | UDKAST | tal ok · ord 0.78 | ikke verificeret |
| Henvisning | `hen-bursit` | Ortopædkirurgisk afdeling (bursitis olecrani) Septisk: albueprotese eller reumatoid artrit… | Lægehåndbogen 2023 (opd. 21.08.2023) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Henvisning | `hen-epikondylit` | Ortopædkirurgi Epikondylit med fortsat uacceptable gener efter nogle måneder. | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Henvisning | `hen-ulnaris` | Neurolog Vedvarende symptomer, særligt kraftnedsættelse, eller bestående sensibilitetstab … | Lægehåndbogen 2025 (opd. 31.07.2025) | UDKAST | tal ok · ord 0.84 | ikke verificeret |
| Henvisning | `hen-caput-radii-sen` | Albuespecialist / ortopædkirurgisk afdeling Efter caput radii fraktur: aflåsninger af albu… | Lægehåndbogen 2024 (opd. 25.01.2024) | UDKAST | tal ok · ord 0.80 · konflikt | ikke verificeret |
| Henvisning | `hen-komplikationer` | Ortopædkirurgisk ambulatorium Sen diagnose af albueskade, eller komplikationer: moderat ti… | Lægehåndbogen 2021 (opd. 08.03.2021) | UDKAST | tal ok · ord 0.95 | ikke verificeret |

### Ryg

| Type | Id | Kort tekst | Kilder (opd.) | Status i Cortex | Maskinelt tjek | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-cauda` | Cauda equina eller betydende nyopstået parese: blæretømningsbesvær, afføringsinkontinens, … | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2026 (opd. 07.04.2026); Lægehåndbogen 2024 (opd. 15.01.2024) | GODKENDT | tal ok · ord 0.79 | verificeret |
| Rødt flag | `flag-malignitet` | Mulig malignitet: tidligere kræftsygdom, ryggener der debuterer eller opfattes anderledes … | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –) | GODKENDT | tal ok · ord 0.95 · konflikt | verificeret |
| Rødt flag | `flag-infektion` | Mulig infektion (spondylodiscitis): feber, generel sygdomsfølelse, stofmisbrug, immunsuppr… | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –); Region Hovedstaden 2025 (opd. –) | GODKENDT | tal ok · ord 0.62 · konflikt | verificeret |
| Rødt flag | `flag-fraktur` | Mulig fraktur: traume, osteoporose, brug af steroid. Ved spondylartrit med ankylosering ka… | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –); Region Hovedstaden 2025 (opd. –); Region Hovedstaden 2025 (opd. –) | GODKENDT | tal ok · ord 0.69 | verificeret |
| Rødt flag | `flag-udbredte-udfald` | Udbredte og evt. progredierende neurologiske udfald, eller deformitet i rygsøjlen. Hurtig … | Lægehåndbogen 2024 (opd. 15.01.2024) | GODKENDT | tal ok · ord 1.00 | verificeret |
| Rødt flag | `flag-inflammatorisk` | Mulig inflammatorisk rygsygdom: udtalt morgenstivhed over en time, høj SR. Henvisning til … | Lægehåndbogen 2024 (opd. 15.01.2024); Lægehåndbogen 2025 (opd. 24.03.2025); Region Hovedstaden 2025 (opd. –) | GODKENDT | tal ok · ord 0.76 | verificeret |
| Rødt flag | `flag-indre-organer` | Smerter fra indre organer: aortaaneurisme (også dissekerende), pankreatit, ulcus perforans… | Lægehåndbogen 2024 (opd. 15.01.2024); Lægehåndbogen 2025 (opd. 24.03.2025); Lægehåndbogen 2026 (opd. 07.04.2026) | GODKENDT | tal ok · ord 0.78 | verificeret |
| Rødt flag | `flag-oevrige-alarm` | Øvrige forhold i anamnesen ved akutte rygsmerter: alder under 20 eller over 55 år, nylig s… | Lægehåndbogen 2025 (opd. 24.03.2025) | GODKENDT | tal ok · ord 0.88 | verificeret |
| Diff.diagnose | `diff-uspecifik` | Uspecifikke lænderygsmerter Den klart største gruppe (80–90 %) Smerter i lænderyg, nates o… | Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Diff.diagnose | `diff-rod` | Lumbal rodaffektion / diskusprolaps Bensmerter i dermatomalt mønster dominerer over lændes… | Lægehåndbogen 2026 (opd. 07.04.2026); Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.80 | ikke verificeret |
| Diff.diagnose | `diff-cauda` | Cauda equina-syndrom Median prolaps med tryk på flere nerverødder Nedsat sensibilitet i ri… | Lægehåndbogen 2026 (opd. 07.04.2026); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Diff.diagnose | `diff-stenose` | Lumbal spinalstenose Særligt hos ældre Tiltagende ben- eller baldesmerter ved gang med red… | Lægehåndbogen 2026 (opd. 26.03.2026); Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.89 | ikke verificeret |
| Diff.diagnose | `diff-sammenfald` | Vertebralt kompressionsbrud Som følge af osteoporose eller metastase Under 5 % af alle med… | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Diff.diagnose | `diff-spa` | Spondylartrit / Bechterews sygdom Debut før 45 år; smerter i glutealregion og/eller ryg ov… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.72 | ikke verificeret |
| Diff.diagnose | `diff-malignitet` | Malignitet (metastaser, myelomatose, spinal tumor) Tidligere kræft, nyt smertemønster, kon… | Lægehåndbogen 2024 (opd. 15.01.2024); Lægehåndbogen 2026 (opd. 07.04.2026) | UDKAST | tal ok · ord 0.79 | ikke verificeret |
| Diff.diagnose | `diff-infektion` | Infektion (spondylodiscitis) Feber, almen sygdomsfølelse, stofmisbrug, immunsuppression Rø… | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.71 | ikke verificeret |
| Diff.diagnose | `diff-spondylolistese` | Spondylolistese Kan give kroniske lænderygsmerter Røntgen er indiceret ved mistanke | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Diff.diagnose | `diff-andet` | Anden årsag til ben- og lændesmerter Hofte- og knæartrose, sygdom i hofteled eller bækken … | Lægehåndbogen 2026 (opd. 07.04.2026); Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.88 | ikke verificeret |
| Behandling | `beh-aktivitet` | Patientuddannelse: tryghedsskabende dialog om den gode prognose. Fortsæt vanlig aktivitet … | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Behandling | `beh-medicin-akut` | Nyopståede lænderygsmerter: paracetamol og NSAID, hvis der ikke er kontraindikationer. Opi… | Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Behandling | `beh-medicin-rod` | Lumbal rodaffektion: paracetamol 1 g × 4 dagligt alene eller med NSAID (fx ibuprofen 400–6… | Lægehåndbogen 2026 (opd. 07.04.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-manuel-traening` | Overvej manuel ledmobilisering og superviseret fysisk træning i tillæg til vanlig behandli… | Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.98 | ikke verificeret |
| Behandling | `beh-rod-traening` | Lumbal rodaffektion: let aktivitet frem for sengeleje; superviseret øvelsesterapi, evt. re… | Lægehåndbogen 2026 (opd. 07.04.2026) | UDKAST | tal ok · ord 0.98 | ikke verificeret |
| Behandling | `beh-ikke-anbefalet` | Anbefales ikke: traktion, TENS, ultralydsbehandling, korset/rygstøtte. Akupunktur: se konf… | Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.60 · konflikt | ikke verificeret |
| Behandling | `beh-billed` | Ingen rutinemæssig røntgen eller MR ved nyopståede lænderygsmerter eller initialt ved nerv… | Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2026 (opd. 07.04.2026) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Behandling | `beh-blodprover` | Ved usikkerhed om underliggende sygdom: Hb, leukocytter med differentialtælling, SR, CRP. … | Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.88 | ikke verificeret |
| Behandling | `beh-stenose` | Spinalstenose: nedsæt smerteprovokerende aktiviteter og erstat med anden aktivitet; parace… | Lægehåndbogen 2026 (opd. 26.03.2026) | UDKAST | tal ok · ord 0.83 | ikke verificeret |
| Behandling | `beh-spa` | Sandsynliggjort spondylartrit: NSAID og evt. fysioterapi kan iværksættes forud for henvisn… | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Behandling | `beh-langvarig` | Langvarige gener: genvurder efter 1–2 uger, identificér gule flag og komorbiditet tidligt.… | Lægehåndbogen 2024 (opd. 15.01.2024) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Henvisning | `hen-cauda` | Akut indlæggelse via CVI Sikre symptomer og fund på cauda equina, betydelig parese nyopstå… | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2026 (opd. 07.04.2026) | UDKAST | tal ok · ord 0.89 | ikke verificeret |
| Henvisning | `hen-hotline` | Reumatologisk hotline Tvivlstilfælde ved mulig cauda equina eller parese, og meget svære s… | Region Hovedstaden 2025 (opd. –); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.77 · konflikt | ikke verificeret |
| Henvisning | `hen-infektion-malignitet` | Akutmodtagelse / pakkeforløb Mistanke om infektion eller malignitet. | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2024 (opd. 15.01.2024); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.86 · konflikt | ikke verificeret |
| Henvisning | `hen-fraktur` | Rygsektionen, Rigshospitalet (konference) / Akut Modtagelse Mistanke om instabil fraktur: … | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.81 | ikke verificeret |
| Henvisning | `hen-fys` | Fysioterapeut eller kiropraktor Lumbal rodaffektion inden for de første 12 uger: rådgivnin… | Lægehåndbogen 2026 (opd. 07.04.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Henvisning | `hen-mr` | MR af columna lumbalis (fra almen praksis) Rodpåvirkning uden tilfredsstillende fremgang e… | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Henvisning | `hen-rod-kirurgi` | Rygkirurgisk vurdering Lumbal rodaffektion uden klar bedring på ikke-kirurgisk behandling.… | Lægehåndbogen 2026 (opd. 07.04.2026) | UDKAST | tal ok · ord 0.91 · konflikt | ikke verificeret |
| Henvisning | `hen-reumatologi` | Reumatologisk rygfunktion, Rigshospitalet, Valdemar Hansens Vej (elektiv) Siden 1.1.2025 s… | Region Hovedstaden 2025 (opd. –); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.70 | ikke verificeret |
| Henvisning | `hen-stenose` | Lokal neurologisk eller rygmedicinsk afdeling Mistanke om spinalstenose med manglende bedr… | Lægehåndbogen 2026 (opd. 26.03.2026) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Henvisning | `hen-spa` | Reumatolog (hospital eller speciallægepraksis) Rygsmerter i mere end 3 måneder, debut før … | Region Hovedstaden 2025 (opd. –); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.84 | ikke verificeret |
| Henvisning | `hen-recidiv` | Rygkirurgisk funktion, Glostrup Recidiv inden for 3 måneder efter lumbal prolaps- eller st… | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.86 | ikke verificeret |

### Knae

| Type | Id | Kort tekst | Kilder (opd.) | Status i Cortex | Maskinelt tjek | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-bakteriel-artrit` | Bakteriel artrit: akut monoartrit med hævelse, varme, rødme, smerte og bevægeindskrænkning… | Lægehåndbogen 2024 (opd. 29.01.2024); Region Hovedstaden 2025 (opd. –) | GODKENDT | tal ok · ord 0.79 | verificeret |
| Rødt flag | `flag-fraktur` | Akut knæskade: udeluk fraktur, før stabiliteten testes. Lægehåndbogen (knee rules): røntge… | Lægehåndbogen 2026 (opd. 12.08.2026) | GODKENDT | tal ok · ord 0.81 · konflikt | afviger |
| Rødt flag | `flag-aflaast-knae` | Aflåst knæ: vridtraume med efterfølgende udtalt nedsat bevægelighed, typisk låst mellem ca… | Lægehåndbogen 2026 (opd. 14.08.2026); Lægehåndbogen 2026 (opd. 12.08.2026); Region Hovedstaden 2026 (opd. –) | GODKENDT | tal ok · ord 0.92 · konflikt | verificeret |
| Rødt flag | `flag-akut-ligamentskade` | Akut ligamentskade eller stor ledansamling: vridtraume, hvor knæet knækker sammen, evt. me… | Lægehåndbogen 2026 (opd. 14.08.2026); Lægehåndbogen 2026 (opd. 12.08.2026); Region Hovedstaden 2026 (opd. –) | GODKENDT | tal ok · ord 0.79 | verificeret |
| Rødt flag | `flag-straekkeapparat` | Strækkeapparat: efter traume kan benet ikke løftes mod tyngdekraften (strakt benløft) – mi… | Region Hovedstaden 2026 (opd. –) | GODKENDT | tal ok · ord 0.90 | verificeret |
| Rødt flag | `flag-patellaluksation` | Akut patellaluksation: knæet "gik af led", ofte efter rotation på let flekteret knæ. Patel… | Lægehåndbogen 2025 (opd. 08.04.2025); Region Hovedstaden 2026 (opd. –) | GODKENDT | tal ok · ord 0.88 | verificeret |
| Rødt flag | `flag-stor-akut-skade` | Store og akutte knæskader: neurologisk og vaskulær status skal indgå i vurderingen. Unders… | Lægehåndbogen 2026 (opd. 14.08.2026) | GODKENDT | tal ok · ord 0.88 | verificeret |
| Rødt flag | `flag-septisk-bursit` | Bursit med stærke smerter, varme, rødme, kraftig hævelse og feber indikerer septisk bursit… | Lægehåndbogen 2026 (opd. 14.09.2026); Lægehåndbogen 2026 (opd. 12.08.2026) | GODKENDT | tal ok · ord 0.93 | verificeret |
| Rødt flag | `flag-laeg-haevelse` | Akut indsættende hævelse og evt. rødme i øvre læg kan være en bristet Bakers cyste. Er cys… | Lægehåndbogen 2026 (opd. 17.08.2026) | GODKENDT | tal ok · ord 0.91 | verificeret |
| Rødt flag | `flag-boern` | Barn med knæsmerter – diagnostiske faldgruber: hoftelidelse (projicerede smerter), osteosa… | Lægehåndbogen 2026 (opd. 12.08.2026) | GODKENDT | tal ok · ord 0.91 | verificeret |
| Diff.diagnose | `diff-artrose` | Gonartrose Belastningsrelaterede smerter, igangsætningssmerter Stivhed efter hvile; morgen… | Lægehåndbogen 2025 (opd. 31.01.2025); Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Diff.diagnose | `diff-menisk` | Meniskskade / meniskdegeneration Ledlinjerelaterede smerter, ofte efter vridtraume; hos 30… | Lægehåndbogen 2026 (opd. 14.08.2026); Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Diff.diagnose | `diff-acl` | Forreste korsbåndsskade Vridtraume, hvor knæet knækker sammen; evt. "pop" Hæmartron i løbe… | Lægehåndbogen 2026 (opd. 14.08.2026); Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Diff.diagnose | `diff-mcl` | Skade på mediale kollaterale ligament Smerter og instabilitetsfølelse efter valgustraume Ø… | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Diff.diagnose | `diff-patellofemoralt` | Patellofemoralt smertesyndrom Gradvis udvikling; smerter bag, omkring eller under patella … | Lægehåndbogen 2026 (opd. 17.08.2026); Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.82 | ikke verificeret |
| Diff.diagnose | `diff-patellaluksation` | Patellaluksation (akut eller recidiverende) Opstår ofte efter rotation på let flekteret kn… | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Diff.diagnose | `diff-tendinopati` | Tendinopati / overbelastning Patellatendinit: smerter og ømhed ved patellas nedre pol; hop… | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Diff.diagnose | `diff-bursit` | Knæbursit (præpatellar / infrapatellar) Ofte langvarigt knæliggende arbejde eller enkelttr… | Lægehåndbogen 2026 (opd. 14.09.2026); Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Diff.diagnose | `diff-baker` | Bakers cyste Stramning og evt. smerter i knæhasen; evt. smerter i læggen Blød, fluktuerend… | Lægehåndbogen 2026 (opd. 17.08.2026) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Diff.diagnose | `diff-bakteriel-artrit` | Bakteriel artrit Akut hævelse, varme, rødme, smerter og bevægeindskrænkning i ét led Feber… | Lægehåndbogen 2024 (opd. 29.01.2024); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.71 | ikke verificeret |
| Diff.diagnose | `diff-artrit` | Artrit (krystalartrit, reaktiv, reumatisk) Smerter i andre led; reumatisk sygdom hos patie… | Lægehåndbogen 2026 (opd. 12.08.2026); Lægehåndbogen 2024 (opd. 29.01.2024) | UDKAST | tal ok · ord 0.89 | ikke verificeret |
| Diff.diagnose | `diff-henfoert` | Henført smerte fra hofte eller ryg Hofte: overført smerte til forreste mediale del af låre… | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Diff.diagnose | `diff-ocd` | Osteochondritis dissecans Som regel 12–20 år, ofte meget idrætsaktive Aflåsningstilfælde, … | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Diff.diagnose | `diff-apofysit` | Osgood-Schlatter / Sinding-Larsen Osgood-Schlatter i 10–15-årsalderen, Sinding-Larsen nogl… | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.78 | ikke verificeret |
| Behandling | `beh-aflastning` | Aflastning fra uhensigtsmæssige arbejds- og sportsbelastninger. Instruktion i quadricepsøv… | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-analgetika` | Smertestillende: paracetamol er oftest førstevalg, evt. NSAID. | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-akut-traume` | Akut knæskade: hvile, afkøling, kompression og elevation (RICE). NSAID kan give smertelind… | Lægehåndbogen 2026 (opd. 12.08.2026); Lægehåndbogen 2026 (opd. 14.08.2026); Lægehåndbogen 2026 (opd. 12.08.2026); Lægehåndbogen 2026 (opd. 14.08.2026) | UDKAST | tal ok · ord 0.88 | ikke verificeret |
| Behandling | `beh-lettere-skade` | Lettere knæskade (fx forstuvning af MCL): afventende holdning i ca. 6 uger, mobilisering e… | Region Hovedstaden 2026 (opd. –) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Behandling | `beh-artrose-basis` | Knæartrose: skriftlig og mundtlig information og undervisning. Superviseret træning og pat… | Lægehåndbogen 2025 (opd. 31.01.2025); Region Hovedstaden 2024 (opd. –) | UDKAST | tal ok · ord 0.82 | ikke verificeret |
| Behandling | `beh-artrose-medicin` | Knæartrose, medicin: paracetamol som førstevalg i perioder med smerter. NSAID giver lidt b… | Lægehåndbogen 2025 (opd. 31.01.2025); Region Hovedstaden 2024 (opd. –) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Behandling | `beh-artrose-steroid` | Intraartikulær glukokortikoid giver kortvarig lindring (få uger) ved opblussen med inflamm… | Lægehåndbogen 2025 (opd. 31.01.2025); Region Hovedstaden 2024 (opd. –) | UDKAST | tal ok · ord 0.76 | ikke verificeret |
| Behandling | `beh-artrose-roentgen` | Røntgen ved mistanke om artrose: stående optagelse med let flekteret knæ. Lægehåndbogen (a… | Lægehåndbogen 2025 (opd. 31.01.2025) | UDKAST | tal ok · ord 0.94 · konflikt | ikke verificeret |
| Behandling | `beh-ingen-mr-artroskopi` | MR af knæ ordineres ikke fra almen praksis i Region Hovedstaden. Artroskopi har ingen plad… | Region Hovedstaden 2026 (opd. –); Lægehåndbogen 2025 (opd. 31.01.2025) | UDKAST | tal ok · ord 0.94 | ikke verificeret |
| Behandling | `beh-menisk-fys` | Menisklæsion uden traume (degenerativ) og traumatisk menisklæsion uden aflåsning eller væs… | Lægehåndbogen 2026 (opd. 14.08.2026); Region Hovedstaden 2026 (opd. –) | UDKAST | tal ok · ord 0.96 | ikke verificeret |
| Behandling | `beh-acl` | Forreste korsbåndsskade: fysioterapeutisk vejledt træningsforløb; rekonstruktion vurderes … | Lægehåndbogen 2026 (opd. 14.08.2026) | UDKAST | tal ok · ord 0.80 | ikke verificeret |
| Behandling | `beh-mcl` | MCL-læsion uden løshed: aflastning og smertebehandling. Med løshed: hængslet bandage i 5–6… | Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-pfs` | Patellofemoralt smertesyndrom: aflastning og aktivitetsmodifikation (undgå hugsiddende, sp… | Lægehåndbogen 2026 (opd. 17.08.2026) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Behandling | `beh-patellaluksation` | Akut patellaluksation: reponeres, hvis den ikke er gået på plads; stabiliseres med ortose,… | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 0.93 | ikke verificeret |
| Behandling | `beh-patellatendinopati` | Patellar tendinopati: afstå fra smerteprovokerende aktivitet; langsom, tung styrketræning … | Lægehåndbogen 2026 (opd. 17.08.2026) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Behandling | `beh-bursit` | Bursit: minimér knæliggende aktivitet, brug knæbeskytter; evt. is og kompression. NSAID i … | Lægehåndbogen 2026 (opd. 14.09.2026) | UDKAST | tal ok · ord 0.79 | ikke verificeret |
| Behandling | `beh-baker` | Bakers cyste: ved mistanke om DVT eller anden alvorlig lidelse iværksættes relevante under… | Lægehåndbogen 2026 (opd. 17.08.2026) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) Mistanke om bakteriel (septisk) artrit. | Region Hovedstaden 2025 (opd. –); Lægehåndbogen 2024 (opd. 29.01.2024) | UDKAST | tal ok · ord 0.80 | ikke verificeret |
| Henvisning | `hen-akut-traume` | CVI, akut Efter knætraume: akut stor ledansamling; akut førstegangs patellaluksation; kan … | Region Hovedstaden 2026 (opd. –) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Henvisning | `hen-akut-roentgen` | Akut røntgen af knæ Region Hovedstaden (Pittsburgh Knee Rules): alder under 12 eller over … | Region Hovedstaden 2026 (opd. –) | UDKAST | tal ok · ord 0.87 · konflikt | ikke verificeret |
| Henvisning | `hen-aflaast` | CVI, subakut (snarest, < 1 uge) Aflåst knæ med strækkemangel og mistanke om indeklemt ledp… | Region Hovedstaden 2026 (opd. –); Lægehåndbogen 2026 (opd. 14.08.2026) | UDKAST | tal ok · ord 1.00 · konflikt | ikke verificeret |
| Henvisning | `hen-lettere-traume` | CVI, elektiv Lettere knæskade med vedvarende symptomer over ca. 6 uger. Henvisningen bør i… | Region Hovedstaden 2026 (opd. –) | UDKAST | tal ok · ord 0.86 | ikke verificeret |
| Henvisning | `hen-non-traumatisk` | CVI eller praktiserende ortopædkirurg, elektiv Non-traumatisk: pludselig opstået strækkede… | Region Hovedstaden 2026 (opd. –) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Henvisning | `hen-artrose` | Ortopædkirurgisk afdeling (knæartrose) Symptomer i mindst 3–6 måneder, gennemført ikke-ope… | Region Hovedstaden 2024 (opd. –); Lægehåndbogen 2025 (opd. 31.01.2025) | UDKAST | tal ok · ord 0.80 | ikke verificeret |
| Henvisning | `hen-menisk` | Ortopædkirurgisk vurdering (menisk) Traumatisk menisklæsion med vedvarende generende klik … | Lægehåndbogen 2026 (opd. 14.08.2026); Region Hovedstaden 2026 (opd. –) | UDKAST | tal ok · ord 0.90 · konflikt | ikke verificeret |
| Henvisning | `hen-ligament-kronisk` | Ortopædkirurgisk vurdering (kronisk instabilitet) Objektiv løshed af forreste korsbånd ved… | Lægehåndbogen 2026 (opd. 14.08.2026); Lægehåndbogen 2026 (opd. 12.08.2026) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Henvisning | `hen-patellaluksation-recidiv` | Ortopædkirurgisk vurdering Gentagen (recidiverende) patellaluksation. | Lægehåndbogen 2025 (opd. 08.04.2025) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Henvisning | `hen-bursit` | Ortopædkirurgi Bursit med manglende effekt af konservativ behandling eller mistanke om sep… | Lægehåndbogen 2026 (opd. 14.09.2026) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Henvisning | `hen-reumatolog` | Reumatologisk hotline / reumatolog Akut monoartrit (ikke septisk mistanke) med betydelige … | Region Hovedstaden 2025 (opd. –); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.76 | ikke verificeret |

### Ankel

| Type | Id | Kort tekst | Kilder (opd.) | Status i Cortex | Maskinelt tjek | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-straks` | Truet ben: åben skade med mistanke om dyb skade, fejlstilling med truet hud, kredsløbs- el… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2026 (opd. 23.10.2026) | GODKENDT | tal ok · ord 0.80 | verificeret |
| Rødt flag | `flag-fraktur` | Fraktur (Ottawa-reglerne): røntgen af anklen ved smerter i malleolområdet og knogleømhed o… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2026 (opd. 23.10.2026) | GODKENDT | tal ok · ord 0.97 · konflikt | verificeret |
| Rødt flag | `flag-akilles` | Akillesseneruptur: smæld eller følelse af spark bag på læggen ved afsæt, svækket afsæt, of… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2025 (opd. 24.09.2025) | GODKENDT | tal ok · ord 0.90 | verificeret |
| Rødt flag | `flag-syndesmose` | Syndesmose- eller Maisonneuve-skade: smerter mellem distale tibia og fibula, ofte efter ud… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2025 (opd. 10.06.2025) | GODKENDT | tal ok · ord 1.00 | verificeret |
| Rødt flag | `flag-artrit` | Akut artrit, herunder infektion: rødme, varme og udtalt bevægeømhed uden en passende skade… | Lægehåndbogen 2026 (opd. 02.11.2026); Region Hovedstaden 2025 (opd. –) | GODKENDT | tal ok · ord 0.79 | verificeret |
| Rødt flag | `flag-neuropati` | Diabetes eller nedsat følesans: Ottawa-reglerne gælder ikke ved upålidelig undersøgelse, f… | Lægehåndbogen 2026 (opd. 02.11.2026) | GODKENDT | tal ok · ord 0.97 | verificeret |
| Rødt flag | `flag-stressfraktur` | Stressfraktur: belastningssmerter og fokal knogleømhed, ofte efter øget aktivitet; kan opl… | Lægehåndbogen 2026 (opd. 02.11.2026) | GODKENDT | tal ok · ord 0.96 | verificeret |
| Diff.diagnose | `diff-distorsion` | Lateral ankeldistorsion Typisk inversionstraume; ømhed foran og under laterale malleol Lig… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.78 | ikke verificeret |
| Diff.diagnose | `diff-fraktur` | Fraktur (malleol, fod eller bagfod) Fokal knogleømhed og belastningsbesvær Tænk ud over ma… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2026 (opd. 23.10.2026); Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Diff.diagnose | `diff-syndesmose` | Syndesmoseskade / Maisonneuve-skade Ofte udadrotation (evt. kombineret med dorsalfleksion)… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.90 | ikke verificeret |
| Diff.diagnose | `diff-medial` | Medial ligamentskade (lig. deltoideum) Eversionstraume, ofte med samtidig syndesmoseskade … | Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.91 | ikke verificeret |
| Diff.diagnose | `diff-akilles` | Akillesseneruptur Pludselige smerter og nedsat kraft ved forceret belastning; smæld Kan ik… | Lægehåndbogen 2025 (opd. 24.09.2025); Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Diff.diagnose | `diff-sene` | Anden seneskade / peroneusluksation Smerter og hævelse langs en sene Smerter bag laterale … | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.84 | ikke verificeret |
| Diff.diagnose | `diff-stressfraktur` | Stressfraktur Belastningssmerter og fokal knogleømhed efter øget aktivitet Tidlige røntgen… | Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 0.92 | ikke verificeret |
| Diff.diagnose | `diff-brusk` | Osteokondral skade (bruskskade i anklen) Efter ankeltraume: vedvarende dybe ledsmerter, st… | Lægehåndbogen 2024 (opd. 28.11.2024); Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 0.80 | ikke verificeret |
| Diff.diagnose | `diff-instabilitet` | Kronisk lateral ankelinstabilitet Tidligere distorsion; gentagne giv-way-episoder og usikk… | Lægehåndbogen 2025 (opd. 27.10.2025) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Diff.diagnose | `diff-artrit` | Akut artrit, herunder septisk Rødme, varme og udtalt bevægeømhed uden passende skademekani… | Lægehåndbogen 2026 (opd. 02.11.2026); Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.64 | ikke verificeret |
| Behandling | `beh-initial` | Første smertefulde fase: ro, aflastning, beskyttelse og elevation. RICE kan anvendes: kuld… | Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-fraktur-mistanke` | Ved mistanke om fraktur eller ustabil skade: aflast og immobiliser indtil akut vurdering; … | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2026 (opd. 23.10.2026) | UDKAST | tal ok · ord 0.81 | ikke verificeret |
| Behandling | `beh-akilles-skinne` | Ved mistanke om akillesseneruptur: anklen plantarflekteret i egnet skinne; undgå dorsalfle… | Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-distorsion` | Ukompliceret lateral distorsion: behovet for ro er størst de første 1–2 døgn; derefter gra… | Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 0.98 | ikke verificeret |
| Behandling | `beh-distorsion-medicin` | Akut ankelskade: NSAID, evt. suppleret med paracetamol, de første dage – fx paracetamol 0,… | Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.96 · konflikt | ikke verificeret |
| Behandling | `beh-proprioceptiv` | Efter den akutte fase: mobilisering, ankeløvelser og proprioceptiv træning. Tape eller ort… | Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.96 | ikke verificeret |
| Behandling | `beh-instabilitet` | Kronisk lateral instabilitet: balance-, proprioceptions- og styrketræning af peronealmusku… | Lægehåndbogen 2025 (opd. 27.10.2025) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Behandling | `beh-overbelastning` | Overbelastning: den udløsende aktivitet standses eller reduceres. Ved mistanke om stressfr… | Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-brusk` | Mistanke om bruskskade: undgå kraftig belastning, indtil diagnosen er afklaret. | Lægehåndbogen 2024 (opd. 28.11.2024) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-vte` | Voksne med immobiliserende bandage eller markant nedsat mobilitet bør have en individuel v… | Lægehåndbogen 2026 (opd. 23.10.2026) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Behandling | `beh-opfoelgning` | Ny klinisk vurdering efter 3–5 dage ved usikker diagnose eller smertebegrænset første unde… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2025 (opd. 10.06.2025) | UDKAST | tal ok · ord 0.98 | ikke verificeret |
| Henvisning | `hen-straks` | Akut vurdering / indlæggelse straks Åben skade med mistanke om dyb skade, fejlstilling med… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2026 (opd. 23.10.2026) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Henvisning | `hen-samme-dag` | Røntgen eller akutmodtagelse samme dag Mistanke om akut fraktur (Ottawa-reglerne eller and… | Lægehåndbogen 2026 (opd. 02.11.2026); Lægehåndbogen 2026 (opd. 23.10.2026); Lægehåndbogen 2025 (opd. 24.09.2025) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Henvisning | `hen-hurtig` | Billeddiagnostik eller ortopædkirurgisk vurdering (hurtigt) Fortsat mistanke om syndesmose… | Lægehåndbogen 2026 (opd. 02.11.2026) | UDKAST | tal ok · ord 0.97 | ikke verificeret |
| Henvisning | `hen-langvarig` | Ortopædkirurg Ankelskade, hvor patienten ikke er symptomfri efter 3 måneder (revurder om f… | Lægehåndbogen 2025 (opd. 10.06.2025); Lægehåndbogen 2024 (opd. 28.11.2024) | UDKAST | tal ok · ord 0.94 | ikke verificeret |
| Henvisning | `hen-brusk` | Ortopædkirurg (bruskskade) Klinisk mistanke om bruskskade og knogleavulsion, eller røntgen… | Lægehåndbogen 2024 (opd. 28.11.2024) | UDKAST | tal ok · ord 1.00 | ikke verificeret |
| Henvisning | `hen-instabilitet` | Ortopædkirurg (instabilitet) Manglende bedring efter målrettet konservativ behandling; kli… | Lægehåndbogen 2025 (opd. 27.10.2025) | UDKAST | tal ok · ord 0.95 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) Mistanke om septisk artrit. | Region Hovedstaden 2025 (opd. –) | UDKAST | tal ok · ord 0.89 | ikke verificeret |
