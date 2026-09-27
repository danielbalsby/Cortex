# Sprint 1.2 Founder Evaluation P03 v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | SPRINT-1.2-P03-RE-001 |
| Dokumenttype | Formativt Research evidence- og learning-artifact |
| Version | 1.0 |
| Status | FORMATIVE — intern founder evaluation |
| Dato | 30-07-2026 |
| Tester | Daniel |
| Testtype | Internal Founder Walkthrough (P03) |
| Prototyper | Sprint 1.2 C2 Narrative og C2.2 bounded comparator |
| Routes | `/prototype/sprint-1-2-c2`; `/prototype/sprint-1-2-c2-2` |
| Branch / Git base | `prototype/sprint-0` / `01eb5dbf63a791b1e93913d8fb07ff8bf8148814` |
| C2.2 baseline | `docs/build/SPRINT-1-2-C2-2-EVALUATION-BASELINE-v1.0.md` |
| Data | Kun syntetiske data |
| Upstream | P02 Founder Evaluation; C2/C2.1 Research-syntese; C2.2 Build-baseline |

## 1. Formål og evidensgrænse

P03 registrerer founderens formative sammenligning af C2 og C2.2 og afgrænser den næste produktlæring. Evalueringen er ikke en brugerundersøgelse, usability- eller accessibility-validering, klinisk validering, clinical-readiness-evidens, produktkrav eller Build-handoff.

C2.2 er teknisk bestået i den versions- og checksumlåste Build-baseline: fokuseret Playwright 10/10, fuld Playwright 72/72, Vitest 186/186, typecheck, production build og `git diff --check` bestod. Dette er teknisk Build-evidens. Det dokumenterer ikke produktgevinst, lavere kognitiv belastning, klinisk sikkerhed eller klinisk korrekthed.

### Analyseprincip

Dokumentet adskiller:

1. **Direkte founder-observationer og udsagn** — hvad Daniel rapporterede efter walkthroughen.
2. **Skærmbilledeobservationer** — hvad der kan ses direkte i det leverede visuelle spor.
3. **Research-fortolkning** — mulige betydninger og usikkerheder.
4. **Anbefalinger til Product** — spørgsmål og eksperimentretning, ikke bindende krav.

## 2. Evidensgrundlag og provenance

### Founder-input

Der foreligger en sammenfattende founder-vurdering, men ikke et tidsstemplet observationsark, fuldt think-aloud-spor, kliklog, tidsmåling eller ordret transskription. Founderudsagn behandles derfor som interne ekspertudsagn fra én deltager.

### Skærmbilleder

| ID | Tid | SHA-256 | Direkte synligt |
|---|---|---|---|
| P03-SC-01 | 00.11.04 | `ee040ced86d187f9f61de4b139aa7d5d4856e0510b2e2d544b412814251b6c4a` | C2 Narrative-header, syntetisk knæcase, Anamnese-editor og Cortex Overblik. |
| P03-SC-02 | 00.11.12 | `e45b9dff9725dad444be9eeba47328ed21c50fd77a1adc8cca64c66ea304df46` | Anamnese med dropdowns, provokationsknapper og sektionerne Objektivt, Vurdering og Plan. |
| P03-SC-03 | 00.11.31 | `e06717854ad2a2a0b0400c248e8f46e1c38bc105f30eee41d49c52cbce469a33` | Objektivt modul med dropdowns, ROM-felter, checkbox, palpationsknapper og målrettede tests. |
| P03-SC-04 | 00.11.40 | `88b7a678b868724c95413eb0905dcd152a61f8b50fec05871d296a5fd80d518e` | Klinikerens vurderingsfelt, Plan-sektion og journaludkast. |
| P03-SC-05 | 00.11.46 | `eb5d5c306894d0df65d028c0a9a74b02ea5246f8e8ad41aa42ca6663499be354` | Plan-, opfølgnings- og safety-netfelter, billeddiagnostikvalg, journaludkast og Cortex Overblik. |

Originalkilderne er de fem PNG-filer under de oplyste midlertidige `TemporaryItems`-stier. Alle er 2880 × 1800 pixels. Safari-brugerflade og `localhost` er synlige, men browserversion og effektiv CSS-viewport er ikke dokumenteret.

Skærmbillederne viser C2 Narrative og er et visuelt spor af kontrolvarianten i sammenligningssessionen. De identificerer ikke selvstændigt C2.2. Sammenligningen med C2.2 hviler derfor på founderudsagnet samt C2.2-baselinens dokumentation af den afgrænsede comparator.

## 3. Kernesyntese

C2 og C2.2 opleves begge som et skridt i den rigtige retning. C2.2 bestod de tekniske gates, men Daniel oplevede ingen markant produktgevinst sammenlignet med C2.

C2.2 tester kun én afgrænset kontekstuel rettelse af `Smerteplacering`, mens øvrige facts fortsat redigeres i C2-editoren. P03 understøtter derfor ikke, at denne isolerede ændring i sig selv forbedrer den samlede arbejdsflade mærkbart.

Den tilbageværende friktion er mere strukturel: arbejdsfladen opleves fortsat visuelt busy med mange bokse, dropdowns og knapper. Næste læringscyklus bør derfor undersøge en roligere interaktions- og modulmodel frem for at antage, at flere isolerede inline-kontroller løser helhedsproblemet.

## 4. Direkte founder-observationer og udsagn

- C2 og C2.2 er begge et skridt i den rigtige retning.
- C2.2 giver ikke en markant oplevet produktgevinst sammenlignet med C2.
- UI'et er fortsat visuelt busy med mange bokse og knapper.
- En roligere modulvisning og mere direkte, korte valg ønskes undersøgt.
- Tastaturflowet bør forbedres yderligere.
- Quick og Standard bør undersøges som forskellige præsentationer af samme kliniske state.
- Den strukturerede vurdering skal være klinikerejet.
- Plan, opfølgning og safety-net kan undersøges som eksplicit valgte fraser.
- Henvisning, fysioterapi og kodeforslag bør senere undersøges som adskilte outputspor.
- Klinisk beslutningsstøtte kræver et separat, kildebaseret og safety-reviewet spor.

Disse udsagn er founder-input. De er ikke krav, kliniske regler eller validerede løsningsbeslutninger.

## 5. Skærmbilledeobservationer

- Flere store, indrammede sektioner vises samtidig med en separat højre kolonne til Cortex Overblik.
- Anamnese og Objektivt indeholder mange dropdowns og fristående valgknapper.
- Objektivt samler ROM, palpation, målrettede tests og røde flag i én stor editorflade.
- Vurdering, Plan og journal fremstår som yderligere separate moduler med egne handlingsknapper og tekstfelter.
- Cortex Overblik forbliver synligt og adskilt fra de klinikerredigerede facts.

Skærmbillederne dokumenterer tilstedeværelse og visuel tæthed, men ikke tidsforbrug, fejl, forståelse, kognitiv belastning eller klinisk anvendelighed.

## 6. Findings

Der er ingen bekræftede **Critical** eller selvstændige **Minor** findings i P03-grundlaget. Fravær af Critical findings er ikke evidens for klinisk sikkerhed.

### P03-001 — C2.2 giver ingen markant oplevet produktgevinst over C2

**Område:** Product learning / Workflow / Experience

**Klassifikation:** Material

**Observation**

Daniel vurderede, at C2.2 er et skridt i den rigtige retning, men ikke opleves som en markant forbedring sammenlignet med C2. Build-baselinen viser, at C2.2 er en snæver comparator, hvor kun `Smerteplacering` kan korrigeres kontekstuelt.

**Research-fortolkning**

Den afgrænsede intervention er muligvis for lille til at ændre den samlede arbejdsmodel. P03 kan ikke afgøre, om den lokale interaktion er dårlig, eller blot ikke tilstrækkelig til at skabe en mærkbar helhedsgevinst.

**Anbefaling til Product**

Behandl C2.2 som et afgrænset, teknisk bestået eksperiment uden dokumenteret produktgevinst. Formulér næste sammenligning omkring den samlede modul- og handlingsbyrde frem for at opskalere C2.2-mønstret ukritisk.

### P03-002 — Visuel modul- og kontrolbyrde består

**Område:** Information architecture / Interaction burden / Experience

**Klassifikation:** Material

**Observation**

Daniel beskrev UI'et som visuelt busy med mange bokse og knapper. De fem skærmbilleder viser gentagne modulrammer, dropdowns, chips, tekstfelter og handlingsknapper på tværs af Anamnese, Objektivt, Vurdering og Plan.

**Research-fortolkning**

Den resterende friktion kan skyldes den samlede visuelle og interaktionelle grammatik snarere end manglen på endnu en lokal kontroltype. Skærmbillederne alene kan ikke bevise kognitiv belastning.

**Anbefaling til Product**

Test en roligere modulvisning og kortere direkte valg mod C2 med samme state, case og output. Mål scanning, første handling, scroll, fejl, tilbage-navigation og oplevet belastning.

## 7. Hypoteser og Product-inputs

| ID | Founder-reporteret behov | Research-status | Anbefalet Product-afklaring |
|---|---|---|---|
| P03-H01 | Roligere modulvisning og direkte korte valg | Hypothesis | Sammenlign alternative modul- og valgpræsentationer uden at ændre clinical state. |
| P03-H02 | Forbedret tastaturflow | Hypothesis | Mål fuld Tab/Shift+Tab-rute, piletaster, focus visibility, traps, keystrokes og recovery. |
| P03-H03 | Quick/Standard fra samme kliniske state | Hypothesis | Test state-roundtrip, skjulte aktive facts, safety-information, forståelse og journalfidelitet. |
| P03-H04 | Klinikerejet struktureret vurdering | Hypothesis | Undersøg struktur og fritekst med eksplicit klinikercommitment; Cortex må ikke udfylde vurderingen autonomt. |
| P03-H05 | Klikbare plan-, opfølgnings- og safety-netfraser | Hypothesis | Test eksplicit klinikervalg, redigering, fravalg og authority attribution; indhold kræver clinical review. |
| P03-H06 | Separate outputspor for henvisning, fysioterapi og kodeforslag | Hypothesis — later | Evaluer hvert output isoleret for formål, modtager, provenance, redigering og godkendelse, før de kombineres. |
| P03-H07 | Kildebaseret klinisk beslutningsstøtte | Hypothesis — separat safety-spor | Kræv kildeprovenance, clinical safety review, false-positive/negative-scenarier og tydelig menneskelig authority før produktintegration. |

Tabellen er et Research-handoff af læringsbehov. Den specificerer ikke UI, klinisk indhold, prioriteret backlog eller implementation.

## 8. STANDARD/QUICK-eksempler

De kliniske STANDARD- og QUICK-eksempler fra founder-sessionen behandles som **mål-outputeksempler og testinput**. De er ikke validerede patientfacts, diagnoser, clinical decision rules eller behandlingsanbefalinger.

Det foreliggende P03-input indeholder ikke en ordret, versionslåst gengivelse af eksemplerne. Research rekonstruerer derfor ikke deres kliniske indhold. Hvis de anvendes i næste test, skal de:

1. mærkes som syntetiske;
2. spores til samme kliniske fact-state;
3. sammenlignes for informationstab, uncertainty og safety;
4. gennemgås klinisk før de bruges som forventet output.

## 9. Åbne spørgsmål

1. Hvilke konkrete bokse, rammer eller knapper skaber størst visuel eller handlingsmæssig burden?
2. Bevarer en roligere modulvisning discoverability, uncertainty og adgang til afvigende fund?
3. Hvilke korte valg er hurtigere uden at skabe falske defaults eller skjule “ikke vurderet”?
4. Kan Quick og Standard skifte frem og tilbage uden tab, skjulte aktive facts eller ændret safety-betydning?
5. Hvilken struktur hjælper klinikeren med at formulere egen vurdering uden at Cortex bliver author?
6. Forstår klinikeren valgte planfraser som egne commitments og ikke systemanbefalinger?
7. Hvilket output bør testes først og isoleret: henvisning, fysioterapi eller kodeforslag?
8. Hvilke kilder, reviewroller og stopregler kræves, før clinical decision support overhovedet prototypetestes?

## 10. Research conclusion og downstream disposition

P03 viser et teknisk bestået C2.2-eksperiment uden markant founder-oplevet produktgevinst sammenlignet med C2. Begge comparatorer er skridt i den rigtige retning, men den visuelle modul- og kontrolbyrde består.

Evidensen understøtter, at Product afgrænser næste learning contract omkring roligere modulvisning, direkte valg og målbar keyboardfriktion, mens Quick/Standard, klinikerens vurdering og planfraser behandles som separate hypoteser over samme clinical state. Outputspor og clinical decision support bør forblive senere, isolerede læringsspor med selvstændig provenance, authority og safety review.

- **Product:** Modtager P03-findings og hypoteser og vælger næste læringskontrakt.
- **Clinical Safety/Governance:** Skal eje review af klinisk indhold, planfraser og eventuel beslutningsstøtte.
- **Architecture:** Vurderer først konsekvenser efter Product har afgrænset læringsobjektet.
- **Build:** Ingen handoff eller kodeautorisation fra P03.
- **Steering:** Træffer beslutning om næste læringsretning.
