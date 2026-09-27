# Sprint 1.2 Product Learning Contract v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-009 |
| Dokumenttype | Product Learning Contract og Product Decision Record |
| Version | 1.0 |
| Status | DRAFT — learning direction prioritised; execution not authorised |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-22 |
| Product owner | TODO — navngiven ejer |
| Research owner | TODO — navngiven Research owner |
| Godkendende organ | TODO — kompetent Product-/Steering-organ |
| Beslutning | Sprint 1.2 prioriteres som en afgrænset læringscyklus om klinisk arbejdsflade, uncertainty-state-forståelse, cardinality/discoverability og adaptiv state-recovery. |
| Relation til PDR-008 | Kvalificerer næste learning slice; superseder ikke PDR-008’s eksterne evidenskrav eller åbne hypoteser. |
| Evidensgrundlag | [P02 Founder Evaluation](../../research/SPRINT-1.1-FOUNDER-EVALUATION-P02-v1.0.md); [PDR-008](SPRINT-1-1-PRODUCT-LEARNING-CONTRACT-v1.0.md); [PDR-007](../SPRINT-1-PRODUCT-CHANGE-REQUEST-v1.0.md) |
| Prototypebaseline | `01eb5dbf63a791b1e93913d8fb07ff8bf8148814` — version-locked Sprint 1.1 baseline |
| Architecture status | Dependency identificeret; ingen Architecture-handoff indsendt eller accepteret. |
| Build status | Ingen Build-handoff eller kodeautorisation. |

## 1. Product decision and evidence qualification

### Decision

Product accepterer P02 som intern, formativ founder-evidens og prioriterer Sprint 1.2 som næste læringskontrakt. Den nye centrale usikkerhed er ikke, om Cortex kan rumme flere kliniske informationer, men hvordan klinisk dybde organiseres med høj beslutningsrelevant informationstæthed og lav mental navigation.

Sprint 1.2 skal afklare Product- og IA-retning før yderligere Build-iteration. Kontrakten autoriserer ikke design, Architecture submission, prototypeimplementation eller ekstern klinisk test alene.

### Evidence boundary

P02 er én intern founder walkthrough med retrospektive observationer. Skærmoptagelsen var ikke tilgængelig for Research, og sessionstid, kliklog, browser/viewport og ordrette think-aloud-data mangler. P02 kan derfor prioritere læringsspørgsmål, men ikke dokumentere usability, tidsbesparelse, clinical safety, clinical readiness eller repræsentative klinikerbehov.

P02 har bedre teknisk provenance end P01: baselinecommitten findes, indeholder Sprint 1.1-prototypefilerne og kan inspiceres. Reproducerbar kode gør observationens systemtilstand mere verificerbar; den opgraderer ikke founderobservationen til ekstern menneskeevidens.

### Authorization trace

Ved repository-inspektionen blev der ikke fundet et eksplicit Product-to-Build-handoff eller Build Assignment for Sprint 1.1 i `docs/product/handoffs/` eller `docs/build/`. Product kan derfor ikke attestere, hvilken authority der frigav baselinecommitten. Dette registreres som PI-042. Det ændrer ikke commitens tekniske identitet, men skal afklares før et nyt Build-scope.

## 2. P02 disposition against PDR-008

| PDR-008-område | P02-signal | Product disposition | Status |
|---|---|---|---|
| Clinical history depth | Anamnesen er væsentligt dybere. | Bevar forbedringen; stop yderligere feltudvidelse som default og test relevance/IA. | Limited internal support; not validated |
| Objective granularity | ROM i grader, målrettede tests og multiple palpationsfund er forbedret. | Bevar semantisk præcision; test cardinality og discoverability før mere granularitet. | Limited internal support; not validated |
| Journal communication | Journalen er forbedret. | PA-020 får begrænset intern støtte; ekstern edit-/comprehension-evidens mangler. | Hypothesis remains OPEN |
| Cortex Overblik | Fortsat værdifuldt. | Konceptet bevares; saliens og næste handling flyttes ind i IA-comparatoren. | Hypothesis remains OPEN |
| Workflow friction | Tastaturflow er positivt, men længde, scroll og mental navigation er steget. | Interactionmåling udvides til workspace/IA, focus order og context recovery. | New P0 learning focus |
| Attention suggestions | Fundbaserede overvejelser efterspørges. | Forbliver P1 under H-S11-02; ingen rule eller prototypeadfærd uden Clinical Safety/Governance. | Unresolved high-risk hypothesis |
| External evidence | Ingen eksterne klinikere har testet. | PDR-008’s fem-klinikerkrav forbliver åbent og kan ikke erstattes af P02. | Gate not met |

P02 superseder ingen Product-beslutning og lukker ingen assumption.

## 3. Sprint 1.2 Learning Objective

> Kan Cortex bevare klinisk dybde, uncertainty og menneskelig authority i en arbejdsflade, som klinikeren kan scanne, navigere og korrigere med lav mental og administrativ belastning?

### Decision enabled

Sprint 1.2 skal give Steering evidens til at vælge:

1. en kompakt one-page workspace-retning;
2. en kontekstuel/stage-baseret arbejdsflade med vedvarende overblik og progressive disclosure;
3. en hybrid eller fortsat baseline med afgrænsede IA-forbedringer;
4. stop eller ny afgrænsning, hvis reduceret navigation kun kan opnås ved at skjule uncertainty, relevance eller authority.

One-page er en Product-hypotese, ikke et krav. “Alt på én skærm” er heller ikke et acceptance criterion.

## 4. P0 learning questions

### S12-LQ01 — Clinical workspace and information architecture

**Problem:** Øget klinisk dybde har skabt en lang arbejdsflade med mere scrolling og mental navigation.  
**Learning question:** Hvilken arbejdsflademodel giver hurtigst korrekt orientering, lavest context loss og færrest systemorienterede navigationer uden at skjule relevant information?  
**Required comparison:** Den versionslåste baseline skal sammenlignes med både en one-page hypothesis og mindst én alternativ IA-model.  
**Guardrail:** One-page må ikke vinde alene gennem tættere layout, hvis signaler overses, accessibility forværres eller klinikeren mister place/work.

### S12-LQ02 — Uncertainty and absence state comprehension

**Problem:** Eksplicitte valg som ikke vurderet, ikke udført og ikke vurderbar kan skabe burden, men deres fjernelse kan skjule uncertainty og skabe false reassurance.  
**Learning question:** Hvordan skal blank, ikke relevant, ikke spurgt, ikke udført, ikke vurderbar og eventuelt ikke afklaret forstås og vises i workspace, completeness og document output?  
**Required separation:** Workspace visibility, completeness meaning og dokumentrepræsentation skal testes som separate akser.  
**Guardrail:** “Fjern ikke vurderet” må ikke implementeres direkte. Blank må aldrig blive negativ, normal, irrelevant eller vurderet gennem fravær alene.

### S12-LQ03 — Cardinality and discoverability

**Problem:** Samtidige fund kan kræve multi-select, men P02 blander en reel single-select-begrænsning med manglende discoverability af allerede eksisterende multi-select.  
**Learning question:** Hvilke kliniske concepts kan have samtidige værdier, og kan brugeren opdage og forstå den tilladte cardinality uden forklaring?  
**Baseline fact:** Palpation og smerteprovokation er allerede multi-select i `01eb5db`; inspektion er single-select.  
**Guardrail:** “Gør alt multi-select” er ikke et produktkrav. Cardinality følger klinisk meaning og skal reviewes kompetent.

### S12-LQ04 — Adaptive clinical selectivity and safe state recovery

**Problem:** En bred completeness-model skaber støj; betingede moduler kan reducere den, men kan samtidig skjule relevant information eller miste state.  
**Learning question:** Kan Cortex vise kontekstafhængige kliniske spor, mens brugeren stadig opdager relevante alternativer og sikkert kan ændre et overordnet svar?  
**Must test:** parent-state change, hidden prior answers, re-entry, manual reveal, completeness recalculation, document impact, stale state og recovery.  
**Guardrail:** Ingen silent deletion, hidden negative eller automatisk clinical irrelevance. Relevant hidden state skal enten bevares med forståelig status, disponeres eksplicit eller invalidated efter accepteret contract.

## 5. Test vocabulary for state comprehension

Tabellen er et Product-testvocabulary, ikke canonical LEX eller accepteret domain model.

| Candidate state | Betydning, der skal testes | Må ikke tavst betyde |
|---|---|---|
| Blank | Ingen eksplicit assertion eller disposition er registreret. | Negativ, normal, ikke relevant, ikke spurgt eller komplet. |
| Ikke relevant | Klinikerens eksplicitte context-bundne disposition om relevance. | Universelt irrelevant eller klinisk sikkert at ignorere. |
| Ikke spurgt | Patient-/history-information er ikke eliciteret. | Patienten benægter forholdet. |
| Ikke udført | En undersøgelse eller handling er ikke gennemført. | Normalt/negativt fund eller ikke relevant. |
| Ikke vurderbar | Et meningsfuldt resultat kunne ikke etableres under de aktuelle betingelser. | Ikke forsøgt, negativt eller teknisk fejl uden klinisk meaning. |
| Ikke afklaret | Forholdet forbliver unresolved efter den aktuelle arbejdssekvens. | Lav risk eller implicit accept af uncertainty. |

Architecture og Clinical Safety skal afklare, om termerne svarer til separate domain states, presentation states eller workflow dispositions. Product ejer alene forståelses- og burden-spørgsmålet.

## 6. IA comparator contract

Dette er konceptuelle comparatorer, ikke skærmspecifikationer.

| ID | Comparator | Hypotese | Kontrolkrav |
|---|---|---|---|
| C0 | Sprint 1.1 baseline `01eb5db` | Versionslåst reference for lang sekventiel workspace. | Samme fixture, start state, task og clinical content som C1/C2. |
| C1 | Compact one-page workspace | Højere informationstæthed reducerer scroll og context switching. | Material uncertainty, next action, provenance og accessibility må ikke blive mindre forståelige. |
| C2 | Contextual staged workspace | Vedvarende overblik og progressive disclosure reducerer synlig støj uden wizard-lock-in. | Fri relevant navigation, place/work, alternatives og hidden-state meaning bevares. |

Visuel polish, copy eller ekstra clinical content må ikke være den eneste forskel mellem comparatorerne. Hvis en comparator kræver andre facts eller completeness-regler, skal forskellen analyseres separat.

### Required tasks

1. Orientér dig og identificér patientproblem, material gaps og næste relevante arbejde.
2. Registrér et samtidigt fund, som kræver korrekt cardinality.
3. Korrigér et tidligere svar, så et klinisk spor bliver relevant eller irrelevant.
4. Forklar konsekvensen for workspace, completeness og journaloutput.
5. Genoptag arbejdet efter en afbrydelse eller context shift.
6. Håndtér et uafklaret/ikke vurderbart fund uden false reassurance.

### Required measures

- tid til første korrekt orientering og første målrettede handling;
- scroll distance, direction reversals og section revisits;
- context-loss errors, oversete material gaps og unødvendig tilbage-navigation;
- antal systemceremonielle versus klinisk meningsfulde handlinger;
- focus order, keyboard completion, focus loss og input errors;
- task completion, facilitatorhjælp, stopsted og recovery;
- state explain-back for blank/ikke relevant/ikke spurgt/ikke udført/ikke vurderbar;
- cardinality discovery uden facilitator;
- hidden-state og document-impact comprehension;
- oplevet belastning med konkret adfærdsreference, ikke præference alene;
- accessibility needs og alternative input conditions.

## 7. P1 gated clinical-support hypotheses

P1 må først specificeres til en interaktiv comparator, når Product, Clinical Safety/Governance og relevante Architecture-ejere har disponeret source, semantics og authority boundary.

### S12-H05 — Finding-based considerations

Kildeafgrænsede kombinationer af anamnese og objektive fund kan støtte clinician attention uden at fremstå som diagnose. P02’s ACL-/fraktur-eksempel er et scenarioinput, ikke en valideret regel.

Test skal inkludere relevant, irrelevant, conflicting og missing-source conditions samt rationale, uncertainty, rejection og authority attribution. Hvis Cortex prioriterer en mindre relevant overvejelse foran en alvorlig possibility og skaber false reassurance, skal finding vurderes som potentiel Critical.

### S12-H06 — Neutral plan support

Ikke-valgte, kildeafgrænsede planovervejelser kan reducere memory burden, hvis klinikeren eksplicit vælger, ændrer eller afviser dem. De må ikke fremstå som behandling, default eller færdig plan.

Medicinsk indhold, contraindications, interval og thresholds kan ikke defineres af Product.

### S12-H07 — Compact source-based attention

Et kompakt red-flag-/attention-område kan forbedre saliens uden at skabe alarmstøj. Fravær af attention points må aldrig fremstilles som fravær af risk, og unavailable/degraded source skal være synlig.

### P1 non-authorization

S12-H05–H07 er Product hypotheses, ikke Build requirements. De giver ingen autorisation til diagnose-, plan-, imaging- eller treatment logic.

## 8. P2 deferred work

- Visuelt redesign, visuel identitet og æstetisk polering udskydes, indtil P0 har identificeret informationsprioritet og workspace direction.
- Doctio og andre kliniske produkter må kun bruges som inspirationskilder til testbare principper som scanning, saliens og context preservation; løsninger kopieres ikke.
- Avanceret clinical decision support udskydes, indtil S12-H05–H07 har kompetent source/safety review og authority-comprehension evidence.
- Rigtig AI-model, EHR-integration, automatic diagnosis/treatment/referral og regulatoriske claims forbliver out of scope.

## 9. Product hypotheses

### H-S12-01 — One-page workspace

En kompakt one-page workspace kan reducere scroll og mental navigation uden at øge informationsstøj, oversete signaler eller accessibility burden.

**Falsified/weakened if:** C1 øger context-loss errors, oversete material gaps, density burden eller incorrect next action sammenlignet med C0/C2.

### H-S12-02 — Layered state semantics

Workspace, completeness og document output kan behandle absence/uncertainty forskelligt og dermed reducere synlig burden uden at skjule epistemisk meaning.

**Falsified/weakened if:** deltagere fortolker blank som negativ/relevant disposition, overser unresolved state eller ikke kan forklare, hvorfor output udelader eller medtager tilstanden.

### H-S12-03 — Adaptive selectivity

Kontekstafhængig progressive disclosure kan reducere irrelevant arbejde uden at skjule relevante spor eller miste state ved svarændringer.

**Falsified/weakened if:** deltagere ikke opdager et relevant skjult spor, state slettes tavst, completeness bliver misvisende eller derived documents forbliver current efter meaning-changing change.

### H-S12-04 — Meaning-aligned cardinality and discoverability

Cardinality, der følger det kliniske concepts meaning og er synlig i interactionen, reducerer tab af samtidige fund uden indiscriminate multi-select.

**Falsified/weakened if:** samtidige fund ikke kan registreres, brugere antager forkert cardinality, eller multi-select skaber mutually exclusive/contradictory state.

## 10. Scope and prohibitions

### In scope

- versionslåst Sprint 1.1-baseline som comparator;
- conceptual IA comparison med samme syntetiske case og clinical state;
- Cortex Overblik, next work, scanning, place/work og resumption;
- blank/ikke relevant/ikke spurgt/ikke udført/ikke vurderbar som comprehension cases;
- cardinality og discoverability for udvalgte, clinical-reviewed concepts;
- adaptive progressive disclosure og state-recovery scenarios;
- keyboard/focus/accessibility evaluation;
- journaloutput kun som downstream consequence af state/IA ændringer;
- P1 clinical-support concepts kun efter særskilt competency gate;
- kun syntetiske data.

### Explicit non-requirements

- Funktionsevne med `Upåvirket`, `Let nedsat`, `Betydeligt nedsat` og `Kan ikke støtte` er allerede implementeret; P02 skaber ikke et nyt krav.
- Palpation og smerteprovokation er allerede multi-select; P02 skaber ikke et krav om at implementere dem igen.
- One-page er ikke obligatorisk navigation eller layout.
- “Fjern ikke vurderet” er ikke et Product requirement.
- Alle kliniske felter skal ikke være multi-select.

### Out of scope

- concrete screens, components, controls, navigation, colours eller design system;
- frontend, API, database, cloud, analytics architecture eller AI-model;
- canonical uncertainty semantics, LEX, domain ownership eller capability design;
- clinical rules, diagnosis, treatment, imaging criteria, plan defaults eller red-flag thresholds;
- real patient data, clinical release, EHR/referral delivery eller regulatory claims;
- Build-start, code authorization eller implementation handoff gennem PDR-009.

## 11. Evidence acceptance criteria

En intern pilot kan kontrollere script og comparatorfunktion, men kan ikke opfylde nedenstående menneskeevidens. Den beslutningsrelevante cyklus kræver fem eksterne praktiserende læger eller læger med dokumenteret almen-praksis-erfaring under godkendt research/privacy/safety-ramme.

| ID | Acceptance criterion | Required evidence |
|---|---|---|
| S12-AC01 | Comparator identity | Commit/artifact identity, fixture/version, state vocabulary, task, browser/viewport og change log for C0–C2. |
| S12-AC02 | Orientation | Mindst 4/5 identificerer patientproblem, material unresolved state og næste relevante arbejde inden 30 sekunder uden procedurehjælp. |
| S12-AC03 | IA comparison | Valgt candidate har for mindst 4/5 ikke flere context-loss errors eller oversete material gaps end C0 og reducerer scroll/navigation ceremony sammenlignet med mindst én comparator. |
| S12-AC04 | State comprehension | Mindst 4/5 forklarer forskellen mellem blank, ikke relevant, ikke spurgt, ikke udført og ikke vurderbar; ingen observeret false reassurance må forblive udisponeret. |
| S12-AC05 | State/output fidelity | 0 unknown/blank states bliver negative, normale eller clinician-assessed i completeness eller document output uden eksplicit disposition. |
| S12-AC06 | Cardinality | Alle pre-reviewed concurrent-finding scenarios kan registreres; mindst 4/5 opdager single/multi meaning uden facilitator; 0 contradictory states accepteres tavst. |
| S12-AC07 | Adaptive recovery | Alle parent-state-change scenarios bevarer, disponerer eller invalidater state synligt; 0 silent data loss, false negative eller current-looking stale document. |
| S12-AC08 | Keyboard/accessibility | Alle tasks er keyboard-operable i evalueringen uden focus trap; focus order, focus loss og errors rapporteres pr. participant. Dette er ikke fuld accessibility conformance. |
| S12-AC09 | Human authority | Mindst 4/5 skelner Cortex attention/overvejelse fra egen assessment/Human Decision; display, silence og default opfattes ikke som acceptance. |
| S12-AC10 | Source fidelity | 0 unsupported specifics, authority upgrades eller invented clinical rules i comparatorer og outputs. |
| S12-AC11 | Evidence honesty | Founder-, external-human-, repository-, verification- og clinical-review evidence holdes adskilt; pass fremstilles ikke som clinical validation. |

`4/5` er et Product threshold for en komplet fem-deltager formative cycle, ikke et statistisk generaliserbarhedsclaim. Ved færre end fem deltagere rapporteres evidenshul.

## 12. Stop and decision rules

| Observation | Disposition |
|---|---|
| One-page øger oversete material gaps, density burden eller incorrect next action | Svæk/falsificér H-S12-01; vælg ikke one-page på scrollreduktion alene. |
| Simplified state presentation skaber blank=negative eller false reassurance | Stop varianten; eskalér semantics til Architecture/Clinical Safety. |
| Adaptive hiding gør relevant spor undiscoverable eller mister prior state | Stop varianten; kræv recovery/impact disposition før yderligere design. |
| Multi-select tillader contradicting mutually exclusive states | Revider cardinality model; udvid ikke mekanisk til flere concepts. |
| P1 suggestion ændrer assessment/plan uden explicit clinician choice | Stop P1-varianten; klassificér authority issue og eskalér. |
| P02-resultater reproduceres ikke eksternt | Bevar dem som founder-specific signals; undgå permanent Product requirement. |
| Comparatorer varierer clinical content eller source state | Ingen IA-konklusion; gentag kontrolleret sammenligning. |
| Authorization/evidence package er ufuldstændig | Ingen Build- eller direction claim. |

## 13. Architecture, Clinical Safety and Build boundaries

### Architecture dependency — identified, not submitted

Sprint 1.2 rejser reviewbehov om:

- separation mellem information meaning, presentation state, completeness og document representation;
- blank/absence/unknown/not-performed/not-assessable semantics;
- conditional relevance, state ownership, invalidation og recovery;
- cardinality og mutually exclusive state invariants;
- place/work, stale state og correction propagation;
- attention/Recommendation/Human Decision boundaries.

Disse registreres som API-016 med status `IDENTIFIED — NOT SUBMITTED`. PDR-009 er ikke selve Architecture-handoffet.

### Clinical Safety/Governance dependency

Kompetente ejere skal involveres før:

- uncertainty/absence states får canonical eller clinical meaning;
- clinical relevance styrer skjulning, completeness eller output;
- concurrent findings og mutually exclusive states fastlægges;
- attention-, diagnostic-, imaging- eller planforslag specificeres;
- P02-CQ-001 omsættes til et scenario med source og expected safety disposition;
- ekstern clinical research gennemføres.

### Build boundary

PDR-009 autoriserer ingen kodeændring. Et senere Build-handoff kræver mindst:

1. Steering-godkendt comparator scope;
2. Architecture/Clinical Safety disposition for affected semantics;
3. versionsspecifikation for C0–C2 og shared fixture;
4. measurable acceptance criteria og instrumentation boundary;
5. explicit no-real-data/no-clinical-use scope;
6. repository-resident authority record.

## 14. Open questions

1. Hvilke actors har authority til at definere relevance og uncertainty semantics for den valgte case?
2. Hvilken alternativ IA er stærk nok til at teste one-page-hypotesen retfærdigt uden at vælge navigation?
3. Hvordan måles context loss pålideligt i en fem-deltager formative study?
4. Hvornår skal hidden state bevares dormant, invalidated, cleared eller kræve re-review?
5. Hvilke clinical concepts kan have samtidige fund, og hvilke værdier er mutually exclusive?
6. Hvordan skal Cortex Overblik indikere unresolved state uden at blive et alarmdashboard?
7. Skal P1-plan-/attention-tests være en separat cycle for at undgå P0-scope dilution?
8. Hvilken repository-authority frigav Sprint 1.1-baselinecommitten, og hvordan registreres den historisk uden retroaktiv autorisation?

## 15. Traceability and exit condition

### Evidence chain

`P02 founder evidence → PDR-009 Product learning decision → authorised Architecture/Clinical Safety disposition → version-locked IA comparators → external clinician study → Sprint 1.2 learning report → Steering decision`

### Exit condition

Sprint 1.2 er beslutningsklart, når:

1. S12-LQ01–04 har direkte ekstern menneskeevidens eller eksplicit dokumenteret evidenshul;
2. H-S12-01–04 er supported, weakened, falsified eller unresolved med traceable evidence;
3. S12-AC01–11 er rapporteret med negative cases og individuelle participant spans;
4. blank/uncertainty, relevance, cardinality og adaptive state recovery er forstået uden false reassurance;
5. P1-hypoteser er enten deferred eller kompetent gated—ikke skjult implementeret;
6. Product kan vælge næste retning uden at basere den på founderpræference, lav scroll alene, AI-konsensus eller technical convenience;
7. Architecture-, Clinical Safety-, Governance- og Build-dependencies har named disposition eller carried blocker.

Ingen founder walkthrough, prototypecommit eller bestået verification opfylder exit condition alene.
