# Tjekliste: klinisk indhold til lægens verifikation

Genereret 2026-11-16 fra `indhold/*.ts` (200 punkter). 44 kildesider hentet i dag fra sundhed.dk (alle tilgængelige). Script: `review/kildetjek/kildetjek.py`, rådata: `review/kildetjek/resultat.json`.

## Sådan læses kolonnerne

- **Status i Cortex:** GODKENDT/UDKAST som i indholdsfilen.
- **Kildedato:** "Opdateret" på kildesiden i dag. Alle 44 sider har en dato, og den passer med årstallet i data.
- **Tal:** tal med enhed ("10 dage", "1 g", "55 år", telefonnumre) søgt i de citerede kilder. Alle 200 punkter: alle tal fundet – 19 punkter først efter manuelt opslag, fordi kilden skriver tallet anderledes (fx "1g gange 4" mod "1 g × 4", "20- til 40-årsalderen" mod "20–40 år").
- **Frase:** andel af punktets 3-ords-fraser, der står ordret i én citeret kilde. Lav værdi = omskrevet, ikke nødvendigvis forkert. Flagene ligger på 0,0–0,7: **de er omskrevet, ikke citeret.**
- **Min status:**
  - *handling verificeret* – flagets handlingslinje er læst op mod det relevante kildeafsnit (alle 37 flag).
  - *tekst læst* – hele flagteksten er læst op mod kilden (11 flag).
  - *afviger* – siger noget, kilden ikke siger.
  - *ikke verificeret* – kun maskinelt tjek. Det er dig, der verificerer klinisk.

## Resultat

| | Antal |
|---|---|
| Punkter med kilde | 200/200 |
| Tal og telefonnumre fundet i kilden | 200/200 |
| Kildedato = årstal i data | 44/44 kilder |
| Røde flag: handlingslinje svarer til kilden | 36/37 |
| Røde flag: **afviger** | **1** (knæ fraktur) |
| Røde flag: hele teksten læst mod kilden | 11/37 (alle uden afvigelse) |
| Differentialdiagnoser, behandling, henvisning: ikke verificeret | 163 (alle UDKAST) |

Mindre: `ryg/diff-rod` skriver "Hyppigst 20–40 år"; samme LH-side skriver både "fra 20- til 40-årsalderen" og "hyppigst … mellem 25 og 45". Ikke navngivet som konflikt.

## Afviger

- **knae/flag-fraktur (GODKENDT):** handlingen "Akut røntgen af knæ, hvis blot ét kriterie i én af reglerne er opfyldt" står ikke i nogen kilde. Den er Claudes beslutning (`docs/plan.md` §7, 2026-11-15). Tag aktivt stilling: behold, omformulér eller fjern.

## Mangler i indholdet – spørgsmål til dig

Jeg skriver ikke indholdet. Kolonnen "Hvorfor" er min vurdering [ANTAGET], ikke kildebelagt.

| Region | Hvad mangler | Hvorfor [ANTAGET] | Kilde at undersøge |
|---|---|---|---|
| Skulder | Henført smerte fra hjerte, lever/galde (lungetumor/Pancoast står allerede i faldgruber) | Kan forveksles med skulderlidelse | **Står i en kilde, Cortex allerede citerer:** LH Subacromielt smertesyndrom (2021), differentialdiagnoser: "Andre (hjerte, lungetumor, lever/galde)" [KILDE] |
| Skulder | Polymyalgia rheumatica som differentialdiagnose | Bilaterale skuldersmerter; anden behandling | LH Polymyalgia rheumatica (ikke åbnet) |
| Skulder | Proksimal humerusfraktur som differentialdiagnose | Står kun i flaget | LH Skulderluksation (2025): differentialdiagnoser [KILDE] |
| Skulder, ankel | Felter til feber/rødme/varme | Flaget om septisk/akut artrit kan aldrig fremhæves eller dokumenteres | – (felt) |
| Ankel | DVT ved hævet underben uden passende traume | Ikke nævnt i ankelregionen | LH Ankelsmerter (2026); RH Akut monoartritis nævner DVT som differentialdiagnose [KILDE] |
| Knæ | DVT som differentialdiagnose | Nævnes kun i flaget om Bakers cyste | LH Bakers cyste (2026) [KILDE] |
| Knæ | Alder uden traume | Flaget om børn (hoftelidelse) kan aldrig fremhæves | – (felt) |
| Knæ | Malignitet hos voksne | Kun nævnt for børn | LH Knæsmerter (2026) (ikke undersøgt) |

## Hele listen

### Skulder

| Type | Id | Kort tekst | Kilder (opdateret) | Status i Cortex | Frase (tekst/handling) | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-luksation` | Akut skulderluksation: armen immobiliseres, skulderen kan hverken bevæges aktivt… | Lægehåndbogen 2025 (28.07.2025) | GODKENDT | 0.18 / 0.05 | handling verificeret · tekst læst |
| Rødt flag | `flag-fraktur` | Brud eller seneruptur efter kraftigt traume eller overbelastning: bevægeindskræn… | Lægehåndbogen 2019 (09.08.2019); Region Hovedstaden 2024 (16.07.2024) | GODKENDT | 0.64 / 0.22 | handling verificeret |
| Rødt flag | `flag-traumatisk-cuff` | Traumatisk rotator cuff-ruptur (tidskritisk): relevant traume og nedsat kraft i … | Region Hovedstaden 2025 (01.03.2025); Lægehåndbogen 2025 (28.07.2025); Lægehåndbogen 2019 (09.08.2019) | GODKENDT | 0.28 / 0.12 | handling verificeret |
| Rødt flag | `flag-cuff-efter-luksation` | Over 40 år efter skulderluksation: øget risiko for rotator cuff-skade. Nedsat st… | Lægehåndbogen 2025 (28.07.2025) | GODKENDT | 0.59 / 0.0 | handling verificeret |
| Rødt flag | `flag-faldgruber` | Diagnostiske faldgruber: thoracic outlet syndrom, radikulopati, leukæmi, sarkom,… | Lægehåndbogen 2019 (09.08.2019); Region Hovedstaden 2024 (16.07.2024) | GODKENDT | 0.23 / 0.14 | handling verificeret |
| Rødt flag | `flag-septisk` | Septisk artrit: varmt, rødt, betydeligt hævet led, feber eller medtaget almentil… | Region Hovedstaden 2025 (10.04.2025); Lægehåndbogen 2019 (09.08.2019) | GODKENDT | 0.17 / 0.6 | handling verificeret |
| Diff.diagnose | `diff-impingement` | Subacromielt smertesyndrom / rotator cuff-tendinopati (impingement) | Lægehåndbogen 2021 (16.12.2021); Lægehåndbogen 2019 (09.08.2019); Region Hovedstaden 2025 (01.03.2025) | UDKAST | 0.18 | ikke verificeret |
| Diff.diagnose | `diff-bursit` | Akut bursit (evt. bursitis calcarea) | Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.38 | ikke verificeret |
| Diff.diagnose | `diff-kapsulit` | Kapsulit (frossen skulder) | Lægehåndbogen 2024 (07.06.2024); Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.27 | ikke verificeret |
| Diff.diagnose | `diff-traumatisk-cuff` | Traumatisk rotator cuff-ruptur | Region Hovedstaden 2025 (01.03.2025); Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.08 | ikke verificeret |
| Diff.diagnose | `diff-degenerativ-cuff` | Degenerativ (ikke-traumatisk) rotator cuff-skade | Lægehåndbogen 2025 (28.07.2025); Region Hovedstaden 2025 (01.03.2025); Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.11 | ikke verificeret |
| Diff.diagnose | `diff-instabilitet` | Skulderluksation / posttraumatisk instabilitet | Lægehåndbogen 2019 (09.08.2019); Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.21 | ikke verificeret |
| Diff.diagnose | `diff-ac` | AC-ledslidelse (artrose, artrit, ledbåndsskade) | Lægehåndbogen 2026 (14.03.2026); Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.15 | ikke verificeret |
| Diff.diagnose | `diff-gh-artrose` | Artrose i glenohumeralleddet | Lægehåndbogen 2025 (28.07.2025); Lægehåndbogen 2019 (09.08.2019); Region Hovedstaden 2024 (16.07.2024) | UDKAST | 0.29 | ikke verificeret |
| Diff.diagnose | `diff-cervikal` | Cervikal lidelse / radikulopati | Lægehåndbogen 2019 (09.08.2019); Region Hovedstaden 2025 (01.03.2025) | UDKAST | 0.06 | ikke verificeret |
| Diff.diagnose | `diff-suprascapularis` | Indklemning af n. suprascapularis | Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.16 | ikke verificeret |
| Behandling | `beh-generelt` | De fleste skulderlidelser behandles konservativt i almen praksis. Råd om aflastn… | Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.52 | ikke verificeret |
| Behandling | `beh-analgetika` | Smertestillende afpasses efter behov: paracetamol og/eller NSAID initialt; NSAID… | Lægehåndbogen 2019 (09.08.2019); Region Hovedstaden 2025 (01.03.2025) | UDKAST | 0.31 | ikke verificeret |
| Behandling | `beh-traening` | Impingement og rotator cuff-lidelse: træning i mindst 3 måneder – holdningskorre… | Lægehåndbogen 2021 (16.12.2021); Region Hovedstaden 2025 (01.03.2025); Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.15 | ikke verificeret |
| Behandling | `beh-subakromiel` | Subakromiel glukokortikoid (med lokalanæstesi) som hjælp til at komme i gang med… | Lægehåndbogen 2021 (16.12.2021); Lægehåndbogen 2019 (09.08.2019); Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.05 | ikke verificeret |
| Behandling | `beh-ingen-effekt` | Shockwave, laser, ultralydsbehandling og lignende har ingen dokumenteret effekt … | Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.4 | ikke verificeret |
| Behandling | `beh-kapsulit` | Kapsulit: røntgen for at udelukke anden årsag; NSAID/paracetamol; intraartikulær… | Lægehåndbogen 2024 (07.06.2024) | UDKAST | 0.27 | ikke verificeret |
| Behandling | `beh-luksation` | Efter reponeret luksation: amslynge 2–3 uger (hospitalets plan), tidlig bevægetr… | Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.11 | ikke verificeret |
| Behandling | `beh-ac` | AC-ledsartrose: aktivitetstilpasning (tunge belastninger med albuerne ind til si… | Lægehåndbogen 2026 (14.03.2026) | UDKAST | 0.25 | ikke verificeret |
| Behandling | `beh-roentgen` | Billeddiagnostik er almindeligvis ikke indiceret initialt. Røntgen ved traume (f… | Lægehåndbogen 2019 (09.08.2019); Region Hovedstaden 2024 (16.07.2024); Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.13 | ikke verificeret |
| Behandling | `beh-arbejde` | Ved arbejdsbetinget belastning: undgå ensidigt arbejde, find bedre arbejdsstilli… | Lægehåndbogen 2019 (09.08.2019) | UDKAST | 0.25 | ikke verificeret |
| Henvisning | `hen-luksation-akut` | Hospital (skadestue) | Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.0 | ikke verificeret |
| Henvisning | `hen-traume-roentgen` | Røntgen af skulder | Lægehåndbogen 2025 (28.07.2025); Region Hovedstaden 2024 (16.07.2024) | UDKAST | 0.18 | ikke verificeret |
| Henvisning | `hen-ul` | Ultralydsscanning af skulder | Region Hovedstaden 2024 (16.07.2024) | UDKAST · konflikt | 0.29 | ikke verificeret |
| Henvisning | `hen-traumatisk-cuff` | Ortopædkirurgisk afdeling (traumatisk rotator cuff-ruptur) | Region Hovedstaden 2025 (01.03.2025); Lægehåndbogen 2025 (28.07.2025) | UDKAST · konflikt | 0.55 | ikke verificeret |
| Henvisning | `hen-cuff-efter-luksation` | Ultralyd eller ortopædkirurg | Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.5 | ikke verificeret |
| Henvisning | `hen-instabilitet` | Skulderspecialist (ortopædkirurg) | Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.12 | ikke verificeret |
| Henvisning | `hen-impingement` | Ortopædkirurgisk afdeling (impingement / ikke-traumatisk cuff-lidelse) | Region Hovedstaden 2025 (01.03.2025); Lægehåndbogen 2025 (28.07.2025) | UDKAST | 0.17 | ikke verificeret |
| Henvisning | `hen-kapsulit` | Ortopædkirurg | Lægehåndbogen 2024 (07.06.2024) | UDKAST | 0.38 | ikke verificeret |
| Henvisning | `hen-ac` | Ortopædkirurg (AC-ledsresektion) | Lægehåndbogen 2026 (14.03.2026) | UDKAST | 0.31 | ikke verificeret |
| Henvisning | `hen-arbejdsmedicin` | Arbejdsmedicinsk afdeling | Region Hovedstaden 2025 (01.03.2025) | UDKAST | 0.1 | ikke verificeret |
| Henvisning | `hen-idraet` | Idrætsmedicinsk afdeling | Region Hovedstaden 2025 (01.03.2025) | UDKAST | 0.0 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) | Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.14 | ikke verificeret |

### Albue

| Type | Id | Kort tekst | Kilder (opdateret) | Status i Cortex | Frase (tekst/handling) | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-fraktur-luksation` | Fraktur eller luksation efter traume (ofte fald på strakt arm): smerter, hævelse… | Lægehåndbogen 2021 (08.03.2021); Lægehåndbogen 2024 (25.01.2024) | GODKENDT | 0.15 / 0.2 | handling verificeret |
| Rødt flag | `flag-neurovaskulaer` | Neurovaskulær påvirkning ved fraktur eller luksation: undersøg a. brachialis (pu… | Lægehåndbogen 2021 (08.03.2021) | GODKENDT | 0.21 / 0.0 | handling verificeret |
| Rødt flag | `flag-muskelsene` | Muskel-seneskade efter hyperekstensions- eller hyperfleksionstraume: muskeldisko… | Lægehåndbogen 2021 (08.03.2021) | GODKENDT | 0.45 / 0.17 | handling verificeret |
| Rødt flag | `flag-septisk` | Septisk artrit eller hæmartrose efter traume: varmt, rødt, hævet led, feber elle… | Lægehåndbogen 2019 (08.02.2019); Region Hovedstaden 2025 (10.04.2025) | GODKENDT | 0.19 / 0.26 | handling verificeret · tekst læst |
| Rødt flag | `flag-septisk-bursit` | Septisk bursitis olecrani hos patient med albueprotese eller reumatoid artrit (o… | Lægehåndbogen 2023 (21.08.2023) | GODKENDT | 0.25 / 0.4 | handling verificeret |
| Rødt flag | `flag-faldgruber` | Diagnostiske faldgruber: fraktur og brusklæsion efter traume; skader i nakke, sk… | Lægehåndbogen 2019 (08.02.2019); Lægehåndbogen 2025 (08.04.2025) | GODKENDT | 0.73 / 0.56 | handling verificeret |
| Diff.diagnose | `diff-lateral-epikondylit` | Lateral epikondylit (tennisalbue) | Lægehåndbogen 2025 (08.04.2025); Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.31 | ikke verificeret |
| Diff.diagnose | `diff-medial-epikondylit` | Medial epikondylit (golfalbue) | Lægehåndbogen 2025 (08.04.2025); Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.24 | ikke verificeret |
| Diff.diagnose | `diff-bursit` | Bursitis olecrani (aseptisk eller septisk) | Lægehåndbogen 2023 (21.08.2023); Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.06 | ikke verificeret |
| Diff.diagnose | `diff-ulnaris` | Ulnarisneuropati | Lægehåndbogen 2025 (31.07.2025); Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.39 | ikke verificeret |
| Diff.diagnose | `diff-radialis` | Kompression af n. radialis (radialt tunnelsyndrom / supinatorsyndrom) | Lægehåndbogen 2019 (08.02.2019); Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.25 | ikke verificeret |
| Diff.diagnose | `diff-caput-radii` | Caput radii fraktur | Lægehåndbogen 2024 (25.01.2024) | UDKAST | 0.35 | ikke verificeret |
| Diff.diagnose | `diff-fraktur-luksation` | Anden albuefraktur eller albueluksation | Lægehåndbogen 2021 (08.03.2021) | UDKAST | 0.16 | ikke verificeret |
| Diff.diagnose | `diff-brusk` | Bruskskade / osteochondritis dissecans / løst legeme | Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.11 | ikke verificeret |
| Diff.diagnose | `diff-biceps-tendinose` | Biceps tendinose | Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.29 | ikke verificeret |
| Diff.diagnose | `diff-medial-ligament` | Medial ligamentskade (ulnare kollateralligament) | Lægehåndbogen 2019 (08.02.2019); Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.28 | ikke verificeret |
| Diff.diagnose | `diff-henfoert` | Henført smerte (cervikal radikulopati, skulder, håndled) | Lægehåndbogen 2025 (08.04.2025); Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.07 | ikke verificeret |
| Behandling | `beh-generelt` | Undgå aktivitet, der giver smerter – specielt den belastning, der udløste dem. I… | Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.45 | ikke verificeret |
| Behandling | `beh-epik-aflastning-traening` | Epikondylit: aflastning (tilpasning af arbejde; håndledsortose ved stærke akutte… | Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.16 | ikke verificeret |
| Behandling | `beh-epik-nsaid` | NSAID kan lindre i den akutte fase, men har ikke bedre effekt end placebo på oph… | Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.62 | ikke verificeret |
| Behandling | `beh-epik-steroid` | Glukokortikoidinjektion (med lidokain) tenoperiostealt: bedre korttidseffekt, me… | Lægehåndbogen 2025 (08.04.2025) | UDKAST · konflikt | 0.12 | ikke verificeret |
| Behandling | `beh-epik-ikke` | Chokbølgebehandling, elektroterapi, ultralyd og injektion med blodpladekoncentra… | Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.55 | ikke verificeret |
| Behandling | `beh-bursit-aseptisk` | Aseptisk bursitis olecrani: trykaflastning (albuebeskytter, skift arbejdsstillin… | Lægehåndbogen 2023 (21.08.2023) | UDKAST | 0.2 | ikke verificeret |
| Behandling | `beh-bursit-septisk` | Septisk bursitis olecrani hos patient, der ikke er almen påvirket eller septisk:… | Lægehåndbogen 2023 (21.08.2023) | UDKAST | 0.25 | ikke verificeret |
| Behandling | `beh-ulnaris` | Ulnarisneuropati: aflastning af albue og håndled, særligt ved skrivebordsarbejde… | Lægehåndbogen 2025 (31.07.2025) | UDKAST | 0.31 | ikke verificeret |
| Behandling | `beh-caput-radii` | Caput radii fraktur (konservativt behandlet): armslynge 1–2 uger og tidlig bevæg… | Lægehåndbogen 2024 (25.01.2024) | UDKAST | 0.27 | ikke verificeret |
| Behandling | `beh-efterforloeb` | Efterforløb efter albuefraktur, luksation eller opereret muskel-seneskade: ved s… | Lægehåndbogen 2021 (08.03.2021) | UDKAST | 0.26 | ikke verificeret |
| Henvisning | `hen-akut-traume` | Akutmodtagelsen | Lægehåndbogen 2021 (08.03.2021); Lægehåndbogen 2024 (25.01.2024) | UDKAST | 0.25 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) | Region Hovedstaden 2025 (10.04.2025); Lægehåndbogen 2019 (08.02.2019) | UDKAST | 0.19 | ikke verificeret |
| Henvisning | `hen-bursit` | Ortopædkirurgisk afdeling (bursitis olecrani) | Lægehåndbogen 2023 (21.08.2023) | UDKAST | 0.33 | ikke verificeret |
| Henvisning | `hen-epikondylit` | Ortopædkirurgi | Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.43 | ikke verificeret |
| Henvisning | `hen-ulnaris` | Neurolog | Lægehåndbogen 2025 (31.07.2025) | UDKAST | 0.18 | ikke verificeret |
| Henvisning | `hen-caput-radii-sen` | Albuespecialist / ortopædkirurgisk afdeling | Lægehåndbogen 2024 (25.01.2024) | UDKAST · konflikt | 0.16 | ikke verificeret |
| Henvisning | `hen-komplikationer` | Ortopædkirurgisk ambulatorium | Lægehåndbogen 2021 (08.03.2021) | UDKAST | 0.53 | ikke verificeret |

### Ryg

| Type | Id | Kort tekst | Kilder (opdateret) | Status i Cortex | Frase (tekst/handling) | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-cauda` | Cauda equina eller betydende nyopstået parese: blæretømningsbesvær, afføringsink… | Region Hovedstaden 2025 (05.02.2025); Lægehåndbogen 2026 (07.04.2026); Lægehåndbogen 2024 (15.01.2024) | GODKENDT | 0.26 / 0.54 | handling verificeret · tekst læst |
| Rødt flag | `flag-malignitet` | Mulig malignitet: tidligere kræftsygdom, ryggener der debuterer eller opfattes a… | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (10.04.2025) | GODKENDT · konflikt | 0.18 / 0.0 | handling verificeret |
| Rødt flag | `flag-infektion` | Mulig infektion (spondylodiscitis): feber, generel sygdomsfølelse, stofmisbrug, … | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (10.04.2025); Region Hovedstaden 2025 (14.04.2025) | GODKENDT · konflikt | 0.0 / 0.17 | handling verificeret · tekst læst |
| Rødt flag | `flag-fraktur` | Mulig fraktur: traume, osteoporose, brug af steroid. Ved spondylartrit med ankyl… | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (10.04.2025); Region Hovedstaden 2025 (14.04.2025); Region Hovedstaden 2025 (10.04.2025) | GODKENDT | 0.0 / 0.5 | handling verificeret · tekst læst |
| Rødt flag | `flag-udbredte-udfald` | Udbredte og evt. progredierende neurologiske udfald, eller deformitet i rygsøjle… | Lægehåndbogen 2024 (15.01.2024) | GODKENDT | 0.5 / 0.6 | handling verificeret |
| Rødt flag | `flag-inflammatorisk` | Mulig inflammatorisk rygsygdom: udtalt morgenstivhed over en time, høj SR. | Lægehåndbogen 2024 (15.01.2024); Lægehåndbogen 2025 (24.03.2025); Region Hovedstaden 2025 (10.04.2025) | GODKENDT | 0.12 / 0.24 | handling verificeret · tekst læst |
| Rødt flag | `flag-indre-organer` | Smerter fra indre organer: aortaaneurisme (også dissekerende), pankreatit, ulcus… | Lægehåndbogen 2024 (15.01.2024); Lægehåndbogen 2025 (24.03.2025); Lægehåndbogen 2026 (07.04.2026) | GODKENDT | 0.32 / 0.69 | handling verificeret · tekst læst |
| Rødt flag | `flag-oevrige-alarm` | Øvrige forhold i anamnesen ved akutte rygsmerter: alder under 20 eller over 55 å… | Lægehåndbogen 2025 (24.03.2025) | GODKENDT | 0.5 / 0.08 | handling verificeret |
| Diff.diagnose | `diff-uspecifik` | Uspecifikke lænderygsmerter | Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.33 | ikke verificeret |
| Diff.diagnose | `diff-rod` | Lumbal rodaffektion / diskusprolaps | Lægehåndbogen 2026 (07.04.2026); Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.07 | ikke verificeret |
| Diff.diagnose | `diff-cauda` | Cauda equina-syndrom | Lægehåndbogen 2026 (07.04.2026); Region Hovedstaden 2025 (05.02.2025) | UDKAST | 0.25 | ikke verificeret |
| Diff.diagnose | `diff-stenose` | Lumbal spinalstenose | Lægehåndbogen 2026 (26.03.2026); Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.29 | ikke verificeret |
| Diff.diagnose | `diff-sammenfald` | Vertebralt kompressionsbrud | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.77 | ikke verificeret |
| Diff.diagnose | `diff-spa` | Spondylartrit / Bechterews sygdom | Region Hovedstaden 2025 (10.04.2025); Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.16 | ikke verificeret |
| Diff.diagnose | `diff-malignitet` | Malignitet (metastaser, myelomatose, spinal tumor) | Lægehåndbogen 2024 (15.01.2024); Lægehåndbogen 2026 (07.04.2026) | UDKAST | 0.06 | ikke verificeret |
| Diff.diagnose | `diff-infektion` | Infektion (spondylodiscitis) | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (14.04.2025) | UDKAST | 0.08 | ikke verificeret |
| Diff.diagnose | `diff-spondylolistese` | Spondylolistese | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (14.04.2025) | UDKAST | 0.0 | ikke verificeret |
| Diff.diagnose | `diff-andet` | Anden årsag til ben- og lændesmerter | Lægehåndbogen 2026 (07.04.2026); Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.1 | ikke verificeret |
| Behandling | `beh-aktivitet` | Patientuddannelse: tryghedsskabende dialog om den gode prognose. Fortsæt vanlig … | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.34 | ikke verificeret |
| Behandling | `beh-medicin-akut` | Nyopståede lænderygsmerter: paracetamol og NSAID, hvis der ikke er kontraindikat… | Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.24 | ikke verificeret |
| Behandling | `beh-medicin-rod` | Lumbal rodaffektion: paracetamol 1 g × 4 dagligt alene eller med NSAID (fx ibupr… | Lægehåndbogen 2026 (07.04.2026) | UDKAST | 0.39 | ikke verificeret |
| Behandling | `beh-manuel-traening` | Overvej manuel ledmobilisering og superviseret fysisk træning i tillæg til vanli… | Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.53 | ikke verificeret |
| Behandling | `beh-rod-traening` | Lumbal rodaffektion: let aktivitet frem for sengeleje; superviseret øvelsesterap… | Lægehåndbogen 2026 (07.04.2026) | UDKAST | 0.4 | ikke verificeret |
| Behandling | `beh-ikke-anbefalet` | Anbefales ikke: traktion, TENS, ultralydsbehandling, korset/rygstøtte. Akupunktu… | Lægehåndbogen 2024 (15.01.2024) | UDKAST · konflikt | 0.0 | ikke verificeret |
| Behandling | `beh-billed` | Ingen rutinemæssig røntgen eller MR ved nyopståede lænderygsmerter eller initial… | Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (14.04.2025); Lægehåndbogen 2026 (07.04.2026) | UDKAST | 0.16 | ikke verificeret |
| Behandling | `beh-blodprover` | Ved usikkerhed om underliggende sygdom: Hb, leukocytter med differentialtælling,… | Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.24 | ikke verificeret |
| Behandling | `beh-stenose` | Spinalstenose: nedsæt smerteprovokerende aktiviteter og erstat med anden aktivit… | Lægehåndbogen 2026 (26.03.2026) | UDKAST | 0.07 | ikke verificeret |
| Behandling | `beh-spa` | Sandsynliggjort spondylartrit: NSAID og evt. fysioterapi kan iværksættes forud f… | Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.09 | ikke verificeret |
| Behandling | `beh-langvarig` | Langvarige gener: genvurder efter 1–2 uger, identificér gule flag og komorbidite… | Lægehåndbogen 2024 (15.01.2024) | UDKAST | 0.12 | ikke verificeret |
| Henvisning | `hen-cauda` | Akut indlæggelse via CVI | Region Hovedstaden 2025 (05.02.2025); Lægehåndbogen 2026 (07.04.2026) | UDKAST | 0.51 | ikke verificeret |
| Henvisning | `hen-hotline` | Reumatologisk hotline | Region Hovedstaden 2025 (04.09.2025); Region Hovedstaden 2025 (05.02.2025) | UDKAST · konflikt | 0.26 | ikke verificeret |
| Henvisning | `hen-infektion-malignitet` | Akutmodtagelse / pakkeforløb | Region Hovedstaden 2025 (10.04.2025); Lægehåndbogen 2024 (15.01.2024); Region Hovedstaden 2025 (14.04.2025) | UDKAST · konflikt | 0.2 | ikke verificeret |
| Henvisning | `hen-fraktur` | Rygsektionen, Rigshospitalet (konference) / Akut Modtagelse | Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.4 | ikke verificeret |
| Henvisning | `hen-fys` | Fysioterapeut eller kiropraktor | Lægehåndbogen 2026 (07.04.2026) | UDKAST | 0.41 | ikke verificeret |
| Henvisning | `hen-mr` | MR af columna lumbalis (fra almen praksis) | Region Hovedstaden 2025 (14.04.2025) | UDKAST | 0.22 | ikke verificeret |
| Henvisning | `hen-rod-kirurgi` | Rygkirurgisk vurdering | Lægehåndbogen 2026 (07.04.2026) | UDKAST · konflikt | 0.32 | ikke verificeret |
| Henvisning | `hen-reumatologi` | Reumatologisk rygfunktion, Rigshospitalet, Valdemar Hansens Vej (elektiv) | Region Hovedstaden 2025 (10.04.2025); Region Hovedstaden 2025 (04.09.2025) | UDKAST | 0.27 | ikke verificeret |
| Henvisning | `hen-stenose` | Lokal neurologisk eller rygmedicinsk afdeling | Lægehåndbogen 2026 (26.03.2026) | UDKAST | 0.12 | ikke verificeret |
| Henvisning | `hen-spa` | Reumatolog (hospital eller speciallægepraksis) | Region Hovedstaden 2025 (10.04.2025); Region Hovedstaden 2025 (04.09.2025) | UDKAST | 0.2 | ikke verificeret |
| Henvisning | `hen-recidiv` | Rygkirurgisk funktion, Glostrup | Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.33 | ikke verificeret |

### Knae

| Type | Id | Kort tekst | Kilder (opdateret) | Status i Cortex | Frase (tekst/handling) | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-bakteriel-artrit` | Bakteriel artrit: akut monoartrit med hævelse, varme, rødme, smerte og bevægeind… | Lægehåndbogen 2024 (29.01.2024); Region Hovedstaden 2025 (10.04.2025) | GODKENDT | 0.31 / 0.3 | handling verificeret · tekst læst |
| Rødt flag | `flag-fraktur` | Akut knæskade: udeluk fraktur, før stabiliteten testes. Lægehåndbogen (knee rule… | Lægehåndbogen 2026 (12.08.2026) | GODKENDT · konflikt | 0.16 / 0.18 | **afviger** (handling) |
| Rødt flag | `flag-aflaast-knae` | Aflåst knæ: vridtraume med efterfølgende udtalt nedsat bevægelighed, typisk låst… | Lægehåndbogen 2026 (14.08.2026); Lægehåndbogen 2026 (12.08.2026); Region Hovedstaden 2026 (10.03.2026) | GODKENDT · konflikt | 0.44 / 0.17 | handling verificeret |
| Rødt flag | `flag-akut-ligamentskade` | Akut ligamentskade eller stor ledansamling: vridtraume, hvor knæet knækker samme… | Lægehåndbogen 2026 (14.08.2026); Lægehåndbogen 2026 (12.08.2026); Region Hovedstaden 2026 (10.03.2026) | GODKENDT | 0.21 / 0.0 | handling verificeret · tekst læst |
| Rødt flag | `flag-straekkeapparat` | Strækkeapparat: efter traume kan benet ikke løftes mod tyngdekraften (strakt ben… | Region Hovedstaden 2026 (10.03.2026) | GODKENDT | 0.2 / 0.5 | handling verificeret |
| Rødt flag | `flag-patellaluksation` | Akut patellaluksation: knæet "gik af led", ofte efter rotation på let flekteret … | Lægehåndbogen 2025 (08.04.2025); Region Hovedstaden 2026 (10.03.2026) | GODKENDT | 0.22 / 0.0 | handling verificeret |
| Rødt flag | `flag-stor-akut-skade` | Store og akutte knæskader: neurologisk og vaskulær status skal indgå i vurdering… | Lægehåndbogen 2026 (14.08.2026) | GODKENDT | 0.3 / 0.5 | handling verificeret |
| Rødt flag | `flag-septisk-bursit` | Bursit med stærke smerter, varme, rødme, kraftig hævelse og feber indikerer sept… | Lægehåndbogen 2026 (14.09.2026); Lægehåndbogen 2026 (12.08.2026) | GODKENDT | 0.35 / 0.46 | handling verificeret |
| Rødt flag | `flag-laeg-haevelse` | Akut indsættende hævelse og evt. rødme i øvre læg kan være en bristet Bakers cys… | Lægehåndbogen 2026 (17.08.2026) | GODKENDT | 0.39 / 1.0 | handling verificeret |
| Rødt flag | `flag-boern` | Barn med knæsmerter – diagnostiske faldgruber: hoftelidelse (projicerede smerter… | Lægehåndbogen 2026 (12.08.2026) | GODKENDT | 0.21 / 0.29 | handling verificeret |
| Diff.diagnose | `diff-artrose` | Gonartrose | Lægehåndbogen 2025 (31.01.2025); Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.14 | ikke verificeret |
| Diff.diagnose | `diff-menisk` | Meniskskade / meniskdegeneration | Lægehåndbogen 2026 (14.08.2026); Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.06 | ikke verificeret |
| Diff.diagnose | `diff-acl` | Forreste korsbåndsskade | Lægehåndbogen 2026 (14.08.2026); Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.4 | ikke verificeret |
| Diff.diagnose | `diff-mcl` | Skade på mediale kollaterale ligament | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.29 | ikke verificeret |
| Diff.diagnose | `diff-patellofemoralt` | Patellofemoralt smertesyndrom | Lægehåndbogen 2026 (17.08.2026); Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.22 | ikke verificeret |
| Diff.diagnose | `diff-patellaluksation` | Patellaluksation (akut eller recidiverende) | Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.19 | ikke verificeret |
| Diff.diagnose | `diff-tendinopati` | Tendinopati / overbelastning | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.35 | ikke verificeret |
| Diff.diagnose | `diff-bursit` | Knæbursit (præpatellar / infrapatellar) | Lægehåndbogen 2026 (14.09.2026); Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.24 | ikke verificeret |
| Diff.diagnose | `diff-baker` | Bakers cyste | Lægehåndbogen 2026 (17.08.2026) | UDKAST | 0.44 | ikke verificeret |
| Diff.diagnose | `diff-bakteriel-artrit` | Bakteriel artrit | Lægehåndbogen 2024 (29.01.2024); Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.24 | ikke verificeret |
| Diff.diagnose | `diff-artrit` | Artrit (krystalartrit, reaktiv, reumatisk) | Lægehåndbogen 2026 (12.08.2026); Lægehåndbogen 2024 (29.01.2024) | UDKAST | 0.2 | ikke verificeret |
| Diff.diagnose | `diff-henfoert` | Henført smerte fra hofte eller ryg | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.23 | ikke verificeret |
| Diff.diagnose | `diff-ocd` | Osteochondritis dissecans | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.29 | ikke verificeret |
| Diff.diagnose | `diff-apofysit` | Osgood-Schlatter / Sinding-Larsen | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.21 | ikke verificeret |
| Behandling | `beh-aflastning` | Aflastning fra uhensigtsmæssige arbejds- og sportsbelastninger. Instruktion i qu… | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.43 | ikke verificeret |
| Behandling | `beh-analgetika` | Smertestillende: paracetamol er oftest førstevalg, evt. NSAID. | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.6 | ikke verificeret |
| Behandling | `beh-akut-traume` | Akut knæskade: hvile, afkøling, kompression og elevation (RICE). NSAID kan give … | Lægehåndbogen 2026 (12.08.2026); Lægehåndbogen 2026 (14.08.2026); Lægehåndbogen 2026 (12.08.2026); Lægehåndbogen 2026 (14.08.2026) | UDKAST | 0.17 | ikke verificeret |
| Behandling | `beh-lettere-skade` | Lettere knæskade (fx forstuvning af MCL): afventende holdning i ca. 6 uger, mobi… | Region Hovedstaden 2026 (10.03.2026) | UDKAST | 0.41 | ikke verificeret |
| Behandling | `beh-artrose-basis` | Knæartrose: skriftlig og mundtlig information og undervisning. Superviseret træn… | Lægehåndbogen 2025 (31.01.2025); Region Hovedstaden 2024 (03.10.2024) | UDKAST | 0.18 | ikke verificeret |
| Behandling | `beh-artrose-medicin` | Knæartrose, medicin: paracetamol som førstevalg i perioder med smerter. NSAID gi… | Lægehåndbogen 2025 (31.01.2025); Region Hovedstaden 2024 (03.10.2024) | UDKAST | 0.35 | ikke verificeret |
| Behandling | `beh-artrose-steroid` | Intraartikulær glukokortikoid giver kortvarig lindring (få uger) ved opblussen m… | Lægehåndbogen 2025 (31.01.2025); Region Hovedstaden 2024 (03.10.2024) | UDKAST | 0.08 | ikke verificeret |
| Behandling | `beh-artrose-roentgen` | Røntgen ved mistanke om artrose: stående optagelse med let flekteret knæ. Lægehå… | Lægehåndbogen 2025 (31.01.2025) | UDKAST · konflikt | 0.29 | ikke verificeret |
| Behandling | `beh-ingen-mr-artroskopi` | MR af knæ ordineres ikke fra almen praksis i Region Hovedstaden. Artroskopi har … | Region Hovedstaden 2026 (19.02.2026); Lægehåndbogen 2025 (31.01.2025) | UDKAST | 0.38 | ikke verificeret |
| Behandling | `beh-menisk-fys` | Menisklæsion uden traume (degenerativ) og traumatisk menisklæsion uden aflåsning… | Lægehåndbogen 2026 (14.08.2026); Region Hovedstaden 2026 (19.02.2026) | UDKAST | 0.35 | ikke verificeret |
| Behandling | `beh-acl` | Forreste korsbåndsskade: fysioterapeutisk vejledt træningsforløb; rekonstruktion… | Lægehåndbogen 2026 (14.08.2026) | UDKAST | 0.25 | ikke verificeret |
| Behandling | `beh-mcl` | MCL-læsion uden løshed: aflastning og smertebehandling. Med løshed: hængslet ban… | Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.46 | ikke verificeret |
| Behandling | `beh-pfs` | Patellofemoralt smertesyndrom: aflastning og aktivitetsmodifikation (undgå hugsi… | Lægehåndbogen 2026 (17.08.2026) | UDKAST | 0.16 | ikke verificeret |
| Behandling | `beh-patellaluksation` | Akut patellaluksation: reponeres, hvis den ikke er gået på plads; stabiliseres m… | Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.37 | ikke verificeret |
| Behandling | `beh-patellatendinopati` | Patellar tendinopati: afstå fra smerteprovokerende aktivitet; langsom, tung styr… | Lægehåndbogen 2026 (17.08.2026) | UDKAST | 0.27 | ikke verificeret |
| Behandling | `beh-bursit` | Bursit: minimér knæliggende aktivitet, brug knæbeskytter; evt. is og kompression… | Lægehåndbogen 2026 (14.09.2026) | UDKAST | 0.07 | ikke verificeret |
| Behandling | `beh-baker` | Bakers cyste: ved mistanke om DVT eller anden alvorlig lidelse iværksættes relev… | Lægehåndbogen 2026 (17.08.2026) | UDKAST | 0.46 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) | Region Hovedstaden 2025 (10.04.2025); Lægehåndbogen 2024 (29.01.2024) | UDKAST | 0.12 | ikke verificeret |
| Henvisning | `hen-akut-traume` | CVI, akut | Region Hovedstaden 2026 (10.03.2026) | UDKAST | 0.21 | ikke verificeret |
| Henvisning | `hen-akut-roentgen` | Akut røntgen af knæ | Region Hovedstaden 2026 (10.03.2026) | UDKAST · konflikt | 0.33 | ikke verificeret |
| Henvisning | `hen-aflaast` | CVI, subakut (snarest, < 1 uge) | Region Hovedstaden 2026 (10.03.2026); Lægehåndbogen 2026 (14.08.2026) | UDKAST · konflikt | 0.64 | ikke verificeret |
| Henvisning | `hen-lettere-traume` | CVI, elektiv | Region Hovedstaden 2026 (10.03.2026) | UDKAST | 0.15 | ikke verificeret |
| Henvisning | `hen-non-traumatisk` | CVI eller praktiserende ortopædkirurg, elektiv | Region Hovedstaden 2026 (19.02.2026) | UDKAST | 0.09 | ikke verificeret |
| Henvisning | `hen-artrose` | Ortopædkirurgisk afdeling (knæartrose) | Region Hovedstaden 2024 (03.10.2024); Lægehåndbogen 2025 (31.01.2025) | UDKAST | 0.11 | ikke verificeret |
| Henvisning | `hen-menisk` | Ortopædkirurgisk vurdering (menisk) | Lægehåndbogen 2026 (14.08.2026); Region Hovedstaden 2026 (19.02.2026) | UDKAST · konflikt | 0.17 | ikke verificeret |
| Henvisning | `hen-ligament-kronisk` | Ortopædkirurgisk vurdering (kronisk instabilitet) | Lægehåndbogen 2026 (14.08.2026); Lægehåndbogen 2026 (12.08.2026) | UDKAST | 0.11 | ikke verificeret |
| Henvisning | `hen-patellaluksation-recidiv` | Ortopædkirurgisk vurdering | Lægehåndbogen 2025 (08.04.2025) | UDKAST | 0.0 | ikke verificeret |
| Henvisning | `hen-bursit` | Ortopædkirurgi | Lægehåndbogen 2026 (14.09.2026) | UDKAST | 0.47 | ikke verificeret |
| Henvisning | `hen-reumatolog` | Reumatologisk hotline / reumatolog | Region Hovedstaden 2025 (10.04.2025); Region Hovedstaden 2025 (04.09.2025) | UDKAST | 0.21 | ikke verificeret |

### Ankel

| Type | Id | Kort tekst | Kilder (opdateret) | Status i Cortex | Frase (tekst/handling) | Min status |
|---|---|---|---|---|---|---|
| Rødt flag | `flag-straks` | Truet ben: åben skade med mistanke om dyb skade, fejlstilling med truet hud, kre… | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2026 (23.10.2026) | GODKENDT | 0.67 / 0.52 | handling verificeret · tekst læst |
| Rødt flag | `flag-fraktur` | Fraktur (Ottawa-reglerne): røntgen af anklen ved smerter i malleolområdet og kno… | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2026 (23.10.2026) | GODKENDT · konflikt | 0.64 / 0.4 | handling verificeret |
| Rødt flag | `flag-akilles` | Akillesseneruptur: smæld eller følelse af spark bag på læggen ved afsæt, svækket… | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2025 (24.09.2025) | GODKENDT | 0.34 / 0.45 | handling verificeret |
| Rødt flag | `flag-syndesmose` | Syndesmose- eller Maisonneuve-skade: smerter mellem distale tibia og fibula, oft… | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2025 (10.06.2025) | GODKENDT | 0.66 / 0.68 | handling verificeret |
| Rødt flag | `flag-artrit` | Akut artrit, herunder infektion: rødme, varme og udtalt bevægeømhed uden en pass… | Lægehåndbogen 2026 (02.11.2026); Region Hovedstaden 2025 (10.04.2025) | GODKENDT | 0.73 / 0.29 | handling verificeret · tekst læst |
| Rødt flag | `flag-neuropati` | Diabetes eller nedsat følesans: Ottawa-reglerne gælder ikke ved upålidelig under… | Lægehåndbogen 2026 (02.11.2026) | GODKENDT | 0.45 / 0.0 | handling verificeret |
| Rødt flag | `flag-stressfraktur` | Stressfraktur: belastningssmerter og fokal knogleømhed, ofte efter øget aktivite… | Lægehåndbogen 2026 (02.11.2026) | GODKENDT | 0.45 / 0.56 | handling verificeret |
| Diff.diagnose | `diff-distorsion` | Lateral ankeldistorsion | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2025 (10.06.2025) | UDKAST | 0.16 | ikke verificeret |
| Diff.diagnose | `diff-fraktur` | Fraktur (malleol, fod eller bagfod) | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2026 (23.10.2026); Lægehåndbogen 2025 (10.06.2025) | UDKAST | 0.43 | ikke verificeret |
| Diff.diagnose | `diff-syndesmose` | Syndesmoseskade / Maisonneuve-skade | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2025 (10.06.2025) | UDKAST | 0.32 | ikke verificeret |
| Diff.diagnose | `diff-medial` | Medial ligamentskade (lig. deltoideum) | Lægehåndbogen 2025 (10.06.2025) | UDKAST | 0.25 | ikke verificeret |
| Diff.diagnose | `diff-akilles` | Akillesseneruptur | Lægehåndbogen 2025 (24.09.2025); Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.38 | ikke verificeret |
| Diff.diagnose | `diff-sene` | Anden seneskade / peroneusluksation | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2025 (10.06.2025) | UDKAST | 0.45 | ikke verificeret |
| Diff.diagnose | `diff-stressfraktur` | Stressfraktur | Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.45 | ikke verificeret |
| Diff.diagnose | `diff-brusk` | Osteokondral skade (bruskskade i anklen) | Lægehåndbogen 2024 (28.11.2024); Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.13 | ikke verificeret |
| Diff.diagnose | `diff-instabilitet` | Kronisk lateral ankelinstabilitet | Lægehåndbogen 2025 (27.10.2025) | UDKAST | 0.29 | ikke verificeret |
| Diff.diagnose | `diff-artrit` | Akut artrit, herunder septisk | Lægehåndbogen 2026 (02.11.2026); Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.23 | ikke verificeret |
| Behandling | `beh-initial` | Første smertefulde fase: ro, aflastning, beskyttelse og elevation. RICE kan anve… | Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.52 | ikke verificeret |
| Behandling | `beh-fraktur-mistanke` | Ved mistanke om fraktur eller ustabil skade: aflast og immobiliser indtil akut v… | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2026 (23.10.2026) | UDKAST | 0.37 | ikke verificeret |
| Behandling | `beh-akilles-skinne` | Ved mistanke om akillesseneruptur: anklen plantarflekteret i egnet skinne; undgå… | Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.69 | ikke verificeret |
| Behandling | `beh-distorsion` | Ukompliceret lateral distorsion: behovet for ro er størst de første 1–2 døgn; de… | Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.59 | ikke verificeret |
| Behandling | `beh-distorsion-medicin` | Akut ankelskade: NSAID, evt. suppleret med paracetamol, de første dage – fx para… | Lægehåndbogen 2025 (10.06.2025) | UDKAST · konflikt | 0.21 | ikke verificeret |
| Behandling | `beh-proprioceptiv` | Efter den akutte fase: mobilisering, ankeløvelser og proprioceptiv træning. Tape… | Lægehåndbogen 2025 (10.06.2025) | UDKAST | 0.26 | ikke verificeret |
| Behandling | `beh-instabilitet` | Kronisk lateral instabilitet: balance-, proprioceptions- og styrketræning af per… | Lægehåndbogen 2025 (27.10.2025) | UDKAST | 0.58 | ikke verificeret |
| Behandling | `beh-overbelastning` | Overbelastning: den udløsende aktivitet standses eller reduceres. Ved mistanke o… | Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.96 | ikke verificeret |
| Behandling | `beh-brusk` | Mistanke om bruskskade: undgå kraftig belastning, indtil diagnosen er afklaret. | Lægehåndbogen 2024 (28.11.2024) | UDKAST | 0.62 | ikke verificeret |
| Behandling | `beh-vte` | Voksne med immobiliserende bandage eller markant nedsat mobilitet bør have en in… | Lægehåndbogen 2026 (23.10.2026) | UDKAST | 0.78 | ikke verificeret |
| Behandling | `beh-opfoelgning` | Ny klinisk vurdering efter 3–5 dage ved usikker diagnose eller smertebegrænset f… | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2025 (10.06.2025) | UDKAST | 0.77 | ikke verificeret |
| Henvisning | `hen-straks` | Akut vurdering / indlæggelse straks | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2026 (23.10.2026) | UDKAST | 0.63 | ikke verificeret |
| Henvisning | `hen-samme-dag` | Røntgen eller akutmodtagelse samme dag | Lægehåndbogen 2026 (02.11.2026); Lægehåndbogen 2026 (23.10.2026); Lægehåndbogen 2025 (24.09.2025) | UDKAST | 0.57 | ikke verificeret |
| Henvisning | `hen-hurtig` | Billeddiagnostik eller ortopædkirurgisk vurdering (hurtigt) | Lægehåndbogen 2026 (02.11.2026) | UDKAST | 0.55 | ikke verificeret |
| Henvisning | `hen-langvarig` | Ortopædkirurg | Lægehåndbogen 2025 (10.06.2025); Lægehåndbogen 2024 (28.11.2024) | UDKAST | 0.61 | ikke verificeret |
| Henvisning | `hen-brusk` | Ortopædkirurg (bruskskade) | Lægehåndbogen 2024 (28.11.2024) | UDKAST | 0.23 | ikke verificeret |
| Henvisning | `hen-instabilitet` | Ortopædkirurg (instabilitet) | Lægehåndbogen 2025 (27.10.2025) | UDKAST | 0.59 | ikke verificeret |
| Henvisning | `hen-septisk` | Akut indlæggelse (ortopædkirurgi via CVI) | Region Hovedstaden 2025 (10.04.2025) | UDKAST | 0.14 | ikke verificeret |
