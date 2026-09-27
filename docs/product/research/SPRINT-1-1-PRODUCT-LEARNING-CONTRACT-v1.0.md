# Sprint 1.1 Product Learning Contract v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-008 |
| Dokumenttype | Product Learning Contract og Product Decision Record |
| Version | 1.0 |
| Status | DRAFT — learning direction prioritised; execution not authorised |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-22 |
| Product owner | TODO — navngiven ejer |
| Research owner | TODO — navngiven Research owner |
| Godkendende organ | TODO — kompetent Product-/Steering-organ |
| Beslutning | Sprint 1.1 prioriteres som en afgrænset læringsiteration om klinisk informationsdybde, klinisk kommunikation, safety comprehension og målbar workflowfriktion. |
| Relation til PDR-007 | Kvalificerer og indsnævrer næste learning slice; superseder ikke Sprint 1-retningen. |
| Evidensgrundlag | [P01 Founder Evaluation](../../research/SPRINT-1-FOUNDER-EVALUATION-P01-v1.0.md); [PDR-007](../SPRINT-1-PRODUCT-CHANGE-REQUEST-v1.0.md); [P00 Learning Report](SPRINT-0-P00-LEARNING-REPORT-v1.0.md); [Sprint 0 Multi-Agent AI Evaluation](../../research/SPRINT-0-MULTI-AGENT-AI-EVALUATION-v1.0.md) |
| Architecture status | Ingen ny handoff indsendt; [API-015](../registers/architecture-product-interface-register.md) forbliver `PREPARED — NOT SUBMITTED`. |
| Build status | Ingen Build-handoff eller implementationautorisation. |

## 1. Decision and evidence qualification

### Product decision

Product accepterer P01 som **intern, formativ founder-evidens** og prioriterer et Sprint 1.1 learning contract. P01 er ikke brugerundersøgelse, usability-validering, clinical validation, clinical-readiness-evidens eller releasegrundlag.

Sprint 1.1 skal ikke være en bred visuel redesignsprint eller en udvidelse af den tekniske løsning. Den skal reducere de mest beslutningskritiske usikkerheder, før Product vælger detaljeret interaction model, informationsarkitektur eller næste capability.

### Evidence status

| Evidens | Hvad den kan støtte | Hvad den ikke kan støtte |
|---|---|---|
| P01 founder walkthrough | Intern prioritering, problemformulering og hypotesegenerering. | Frekvens, ekstern forståelse, usability, clinical safety, effekt eller adoption. |
| Repository-verifikation | At de omtalte felter, flows og formuleringer fandtes i working tree ved Research-kontrollen. | Testerens adfærd, tidsforbrug, oplevelse eller korrekt klinisk indhold. |
| P00 og Sprint 0 AI-review | Sammenligningsretning og vedvarende problemtemaer. | Uafhængig validering af Sprint 1.1 eller repræsentative klinikerbehov. |
| PDR-007 | Product-intent, scope og acceptance obligations. | Bevis for, at Sprint 1-prototypen opfylder intentionen. |

### Prototype provenance

Repositoryets HEAD var `19fd101e09e5`, mens `app/prototype/sprint-1/`, `components/prototype/sprint-1/`, `clinical/prototypes/sprint-1/` og `e2e/sprint-one.spec.ts` var untracked. P01 fastlåser derfor kun en working-tree state, ikke en reproducerbar prototypeversion.

**Product consequence:** P01 kan prioritere læringsretning, men må ikke bruges som præcis førmåling. En senere sammenligning kræver en versionsfast baseline med identitet, fixture, route, testtilstand og ændringslog. Dette er en preparation requirement, ikke Build-autorisation.

## 2. P01 disposition against PDR-007

| PDR-007-retning | P01-signal | Product disposition | Klassifikation |
|---|---|---|---|
| Assessment-centred workflow | Klinisk vurdering opleves tydeligere som centrum end i Sprint 0. | Retningen bevares; den kliniske dybde er endnu utilstrækkelig. | Product decision; limited formative support |
| Cortex Overblik | Opleves værdifuldt for orientering. | Konceptet bevares som working concept; saliens, næste handling og ekstern comprehension skal testes. | Product hypothesis; Research question |
| Kort/Standard/Udvidet | Opleves mindre belastende og bygger på samme state. | Profilerne bevares som eksperiment; effekt, forudsigelighed og information retention er uafklaret. | Product hypothesis; Research question |
| Objective structure | Målrettede tests forbedrer struktur. | Udvid ikke ukritisk; test nødvendig granularitet, multi-select og burden. | Product hypothesis; Governance dependency |
| Clinical communication | Journalen opleves fortsat maskin-/registreringspræget. | Journaltekstkvalitet løftes til P0-learning input. | Product decision; Research question |
| Clinical attention | Advisory concept findes, men coverage og saliens er utilstrækkelig. | Safety/attention forbliver P0; clinical content og thresholds ejes ikke af Product. | Product decision; Architecture/Governance dependency |
| Low-friction authority | Statussekvens er reduceret, men friktion er flyttet til disclosures og intentionstrin. | Mål handlinger og forståelse før en konkret interaction model vælges. | Research question; Architecture dependency |

P01 lukker ingen Product assumption og opfylder ingen ekstern acceptance threshold i PDR-007.

## 3. Sprint 1.1 Learning Objective

### Objective

> Kan Cortex give klinikeren et dybere, mere sammenhængende klinisk arbejdsgrundlag og bedre klinisk kommunikation med færre systemhandlinger—uden at skabe rigid formularbyrde, skjult uncertainty eller authority-glidning?

### Decision to be enabled

Sprint 1.1 skal give Steering tilstrækkelig evidens til at vælge mellem:

1. fortsat assessment-centreret iteration med en struktureret/narrativ hybrid;
2. en mere konsekvent struktureret model med forbedret kontekst og progressive disclosure;
3. delvist redesign af clinical attention og dokumentafledning;
4. stop eller ny afgrænsning, hvis klinisk dybde kun kan opnås gennem uacceptabel burden eller authority-risiko.

Learning contractet skal ikke vælge UI, komponenter, teknologi, AI-model eller domain ownership.

## 4. Prioritised learning questions

### P0 — Decision-critical

#### LCQ-01 — Clinical history depth

**Problem:** Anamnesen mangler klinisk meningsfuld dybde omkring blandt andet debut, forløb, smertekarakter, provokation, funktion samt hvile-/nattesmerter.  
**Learning question:** Hvilke anamneseinformationer søger, anvender og dokumenterer klinikeren i den syntetiske knæcase, og hvilken repræsentation bevarer dybde uden formularoverbelastning?  
**Must distinguish:** known, unknown, not asked, patient-reported, clinician-interpreted og not relevant.  
**Non-decision:** Product fastlægger ikke et universelt obligatorisk anamnesesæt.

#### LCQ-02 — Objective examination granularity

**Problem:** Den objektive model kan ikke udtrykke den ønskede granularitet for ROM, multiple palpationsfund, ligament- og meniskfund.  
**Learning question:** Hvilken granularitet og kombination af struktureret input/narrativ præcisering bevarer klinisk betydning, negative/ikke udført/ikke vurderbar og relevant uncertainty med acceptabel burden?  
**Must measure:** anvendte og ubrugte dimensioner, korrektioner, tid, eftertekst og oplevet behov.  
**Non-decision:** Product specificerer ikke undersøgelsesbatteri, thresholds eller korrekt testvalg.

#### LCQ-03 — Journal as clinical communication

**Problem:** Journalen fremstår stadig som verbaliseret registreringsmodel frem for naturlig klinisk kommunikation.  
**Learning question:** Hvilken struktur og sproglig form kræver mindst klinisk meningsændrende efterredigering, mens attribution, uncertainty, relevante negative fund, assessment, plan og safety-net bevares?  
**Comparison requirement:** Den nuværende strukturerede formulering skal sammenlignes med mindst én mere narrativ, klinisk prioriteret repræsentation over identisk source state.  
**Non-decision:** “Narrativ” betyder ikke fri generativ tekst uden struktur eller provenance.

#### LCQ-04 — Safety and clinical attention comprehension

**Problem:** Clinical attention har begrænset coverage og kan skabe falsk ro, hvis tavshed fortolkes som fravær af risiko.  
**Learning question:** Kan kilde- og policy-bundne attention points gøre relevante uafklarede risici forståelige uden alarmstøj, false reassurance eller systembeslutning?  
**Must test:** relevant signal, irrelevant/false-positive kandidat, manglende coverage, source/rationale, dismissal/defer, clinician override og degraded source.  
**Non-decision:** Product vælger ikke red flags, billeddiagnostiske regler, thresholds, diagnose eller behandling.

#### LCQ-05 — Measured workflow friction

**Problem:** Friktion er reduceret siden Sprint 0, men kan være flyttet til disclosures, planvalg og dokumentintentioner.  
**Learning question:** Hvilke handlinger er klinisk meningsfulde commitments, og hvilke er systemceremoni eller navigation?  
**Must measure:** målrettede handlinger, disclosure-åbninger, tøven, tilbage-navigation, procedurehjælp, stopsted og recovery.  
**Guardrail:** Færre klik må ikke sammenblande assessment, Human Decision, authorization, copy/delivery eller outcome.

### P1 — Secondary after P0 evidence

| ID | Learning input | Spørgsmål | Dependency |
|---|---|---|---|
| LCQ-06 | Plan, follow-up og safety-net | Hvordan bliver plan og opfølgning et sammenhængende, menneskeejet grundlag med lav interaction burden? | Clinical Safety/Governance; Architecture |
| LCQ-07 | Diagnostic considerations | Kan differentialer og billeddiagnostiske overvejelser vises som kildeafgrænset input til vurdering uden at ligne diagnose eller recommendation? | Clinical Safety/Governance; Architecture |
| LCQ-08 | Referrals | Hvilken information gør billeddiagnostik- og fysioterapihenvisninger nyttige og modtagerorienterede over samme autoriserede assessment? | Clinical stakeholder review; Architecture |

### P2 — Deferred concept hypotheses

| ID | Hypotese | Disposition |
|---|---|---|
| LCQ-09 | Stærkere visuelt hierarki kan gøre Cortex Overblik og næste handling tydeligere. | Test først efter P0-informationsprioritet er forstået; ingen visuel identitet eller screen design besluttes her. |
| LCQ-10 | Doctio-inspirerede informationsprincipper kan reducere støj og forbedre klinisk orientering. | Kun inspirationshypotese. Identificér og test konkrete principper; kopiér ikke navigation, layout, æstetik eller produktmodel. |

## 5. Product hypotheses

### H-S11-01 — Structured–narrative hybrid

**Hypothesis:** En mere narrativ klinisk arbejdsrepræsentation kombineret med bevaret struktureret meaning reducerer mental oversættelse og journalredigering uden at skjule gaps, provenance eller attribution.

**Falsified or materially weakened if:**

- klinikere overser flere material gaps eller bruger mere tid på at genfinde information;
- narrative input skaber tvetydig source/attribution eller flere correction loops;
- afledte dokumenter bliver mindre reproducerbare eller mere specifikke end input;
- den strukturerede comparator kræver mindre meningsændrende redigering.

### H-S11-02 — Structured clinical suggestions without authority drift

**Hypothesis:** Kildeafgrænsede, forklarlige kliniske forslag kan forbedre attention og assessment-kvalitet, mens klinikeren fortsat identificerer Cortex som støtte og ejer vurdering, beslutning og plan.

**Falsified or stopped if:**

- en deltager tillægger forslaget beslutningsauthority eller opfatter fravær som lav risiko;
- forslag accepteres uden source/rationale-kontrol i et material-risk scenario;
- false-positive/irrelevant forslag skaber gentaget alarmstøj eller unsafe workaround;
- forslag ændrer clinical facts eller plan uden eksplicit klinikerhandling.

### Existing assumptions

P01 giver kun begrænset, intern støtte til PA-017, PA-018 og PA-019. De forbliver `OPEN`. H-S11-01 og H-S11-02 registreres som PA-020 og PA-021.

## 6. Scope and non-scope

### In scope

- samme syntetiske knæcase som bounded comparison context;
- klinisk anamnese og objektiv undersøgelse som information needs;
- assessment-centred workflow og klinikerens explicit authority;
- Cortex Overblik som orientation hypothesis;
- journalrepræsentationer over identisk source state;
- clinical attention comprehension med source, rationale og uncertainty;
- Kort/Standard/Udvidet som fortsat eksperiment, hvor relevant for journaltesten;
- plan/follow-up/referral som P1 research, hvis P0 kan gennemføres uden scope dilution;
- instrumentering og observation, som ikke dominerer klinikerens experience;
- kun syntetiske data.

### Out of scope

- konkret screen-, navigation-, control-, component- eller visual-designbeslutning;
- Doctio-kopi eller adoption af Doctio’s informationsarkitektur;
- rigtig AI-model, modelvalg, promptarkitektur eller live-provider;
- EHR, delivery, referral destination eller anden integration;
- automatisk diagnose, behandling, billedmodalitet, referral eller clinical action;
- Product-definerede clinical rules, red flags, thresholds eller mandatory examination set;
- real patient data, clinical release, regulatory claims eller production readiness;
- capability-ID, bounded context, domain ownership, API eller technical architecture;
- Build-start eller implementation handoff gennem dette dokument.

## 7. Comparative learning design

Dette afsnit definerer evidensbehov, ikke konkrete UI-løsninger.

### Required comparators

| Comparator | Formål | Kontrolkrav |
|---|---|---|
| C0 — Version-locked Sprint 1 baseline | Måle residual friktion og outputform. | Skal først fastlåses; P01 working-tree state kan ikke anvendes som reproducerbar baseline alene. |
| C1 — Structured/narrative hybrid | Teste H-S11-01. | Samme case facts, missing states, assessment og document purpose som C0. |
| C2 — Attention support variants | Teste H-S11-02. | Samme clinical scenario med relevant, irrelevant og unavailable-source conditions. |

Der må kun konkluderes på forskelle, når comparatorerne bruger samme syntetiske source facts, task, starting state og dokumentformål. Visuel polish må ikke være den eneste forskel mellem comparatorer.

### Participants and sequence

1. Én intern pilot kan kontrollere script, instrumentation og prototypefejl; pilotdata rapporteres separat.
2. Den beslutningsrelevante cyklus kræver fem eksterne praktiserende læger eller læger med dokumenteret almen-praksis-erfaring, under godkendt research/privacy/safety-ramme.
3. Comparatorrækkefølge skal balanceres, så learning/order effect registreres.
4. Founderens P01-data må ikke indgå som en sjette ekstern deltager.

### Required measures

- tid til forståeligt overblik og første målrettede handling;
- task outcome og facilitatorhjælp;
- hvilke anamnese-/objective-dimensioner der bruges, søges, overses eller opleves som støj;
- antal og type målrettede handlinger, disclosures, tilbage-navigationer og recovery loops;
- alle journaledits kategoriseret som clinical meaning, structure/order, language, brevity eller correction;
- source-, uncertainty- og authority explain-back;
- attention-point discovery, interpretation, dismissal/defer og false-reassurance signaler;
- forskel mellem klinisk commitment og systemceremoni;
- document profile choice og information retained/omitted;
- accessibility- og role/context-forhold, der begrænser observationen.

Rapportér tællinger og individuelle spænd, ikke misvisende procenttal fra den lille population.

## 8. Evidence acceptance and decision criteria

### Minimum evidence package

| ID | Kriterium | Required evidence |
|---|---|---|
| S11-AC01 | Prototypeidentitet | Commit/artifact identity, route, fixture hash/version, browser/viewport, starttilstand og change log. |
| S11-AC02 | Source fidelity | 0 unsupported specifics, authority upgrades eller invented negatives i alle comparatoroutputs. |
| S11-AC03 | Clinical information use | For hvert history/objective element: brugt, efterspurgt, overset, ikke relevant eller støj pr. deltager; ingen universel mandatory claim fra én case. |
| S11-AC04 | Journal communication | Alle edits spores; mindst 4/5 vurderer én repræsentation som klinisk sammenhængende uden meningsændrende omskrivning, og source/uncertainty bevares. |
| S11-AC05 | Cortex Overblik | Mindst 4/5 kan inden 30 sekunder forklare purpose, identificere næste relevante arbejde og skelne source, clinician assessment og Cortex contribution uden facilitatorforklaring. |
| S11-AC06 | Attention authority | Mindst 4/5 kan forklare rationale/uncertainty og placere decision authority hos klinikeren; ingen material false-reassurance observation må forblive udisponeret. |
| S11-AC07 | Workflow friction | Handlinger er klassificeret som clinical commitment, data capture, navigation eller systemceremoni; C1 må ikke have flere ceremony actions end C0 og skal bevare authority-comprehension. |
| S11-AC08 | Documentation profiles | Samme facts, assessment og Human Decision bevares; Kort må ikke skjule defineret material safety/uncertainty; edit burden og predictability rapporteres pr. profil. |
| S11-AC09 | Failure/recovery | Missing, not assessed, unavailable, conflict og stale forbliver adskilte; safe continuation eller honest block observeres. |
| S11-AC10 | Evidence honesty | Founder-, external human-, repository-, automated-test- og AI-reviewevidens rapporteres separat med limitations. |

`4/5` er et Product decision threshold for en fuld fem-deltager-cyklus, ikke et statistisk generaliserbarhedsclaim. Hvis færre end fem gennemfører, er kriteriet ikke opfyldt og rapporteres som evidenshul.

### Steering decision rules

| Resultat | Anbefalet disposition |
|---|---|
| P0-questions har direkte evidence, source fidelity består, authority forstås, og én comparator reducerer meaning-changing edits/friktion | Kandidat til næste Product/Architecture review; stadig ingen clinical-readiness claim. |
| Klinisk dybde forbedres, men burden eller authority-friktion forværres | Iterér learning model; gå ikke videre til P2 visual redesign eller flere pathways. |
| Narrative model skjuler gaps/provenance eller øger correction risk | Svæk/falsificér H-S11-01; bevar eller revider structured model. |
| Suggestions skaber authority drift, false reassurance eller unsupported action | Stop H-S11-02-varianten; eskalér til Clinical Safety/Architecture før yderligere Product-specifikation. |
| P01-problemer kan ikke reproduceres eksternt | Bevar dem som founder-specific signals; undgå permanent product requirement uden anden evidens. |
| Evidenspakke eller prototypeversion er ufuldstændig | Ingen direction claim; gentag kontrolleret cyklus. |

## 9. Architecture, Governance and Build boundaries

### Architecture

Der oprettes ikke et nyt Architecture-handoff gennem PDR-008. PDR-007/API-015 forbliver det forberedte, ikke-indsendte interface. Før et interaktivt learning build med attention suggestions, ændret assessment meaning eller simplificeret authority transition kan autoriseres, skal Product/Steering særskilt beslutte, om relevante dele af S1-AH-01–10 sendes til Architecture.

Architecture skal fortsat eje:

- assessment/Recommendation/Human Decision/Action semantics;
- Risk/Uncertainty/Attention contracts og failure propagation;
- document representation, source/provenance og correction impact;
- state axes, authority transitions og capability sufficiency.

### Governance and Clinical Safety

Kompetente ejere skal levere eller godkende:

- clinical source/policy scope for history, objective findings og attention scenarios;
- risk/attention thresholds og protection purpose;
- privacy/research permission og participant/data handling;
- clinical content review uden at gøre research til clinical validation;
- disposition af GI-012–GI-018, hvor relevant.

### Build

PDR-008 beskriver ikke komponenter, teknologi, API’er eller implementation. Build må ikke starte eller ændre prototypen på baggrund af learning contractet alene.

Et senere særskilt Build-handoff skal mindst indeholde:

- autoriseret comparator-scope og stable artifact identity;
- Product acceptance outcomes og research instrumentation needs;
- Architecture/Clinical Safety dispositions for affected semantics;
- syntetisk fixture og source-fidelity requirements;
- explicit non-scope, stopping rules og no-real-data boundary.

## 10. Product register disposition

| Register | Disposition |
|---|---|
| Product Decision Register | Registrér PDR-008 som DRAFT learning decision. |
| Product Issue Register | Registrér P01 prototypeprovenance og residual clinical-depth/workflow issues; opdater eksisterende evidence links. |
| Product Assumption Register | PA-017–PA-019 får limited formative support, forbliver OPEN; tilføj PA-020/PA-021. |
| Architecture–Product Interface Register | API-015 opdateres med PDR-008 som Product input, men status forbliver `PREPARED — NOT SUBMITTED`. |
| Product Research index | Registrér P01 evidence og dette learning contract med evidensgrænse. |

## 11. Open questions

1. Hvem har kompetent authority til at reviewe knæcaseindhold og attention scenarios?
2. Hvilke history/objective-informationer er case-relevante, og hvilke er generelle kliniske regler, Product ikke må fastlægge?
3. Hvilken comparator kan version-lockes uden at gøre untracked P01-state til falsk canonical baseline?
4. Hvordan måles meaning-changing journaledits konsistent mellem deltagere?
5. Hvilken attention-saliens er proportional uden at blive interruption eller falsk reassurance?
6. Hvornår er et structured suggestion en information prompt, en Recommendation eller en decision-support transition?
7. Skal recipient reviewers indgå i henvisningsstudiet, eller er det en separat learning cycle?
8. Hvilke accessibility needs skal repræsenteres i den lille formative population?

## 12. Traceability and exit condition

### Evidence chain

`P01 founder evidence → PDR-008 learning priorities → authorised Architecture/Clinical Safety disposition → version-locked comparators → external clinician research → learning report → Steering Product decision`

### Exit condition

Sprint 1.1 learning contract er beslutningsklart, når:

1. P0 LCQ-01–05 har direkte ekstern menneskeevidens eller eksplicit dokumenteret evidenshul;
2. H-S11-01 og H-S11-02 er supported, weakened, falsified eller unresolved med traceable evidence;
3. S11-AC01–10 er rapporteret uden at blande verification og clinical validation;
4. negative cases, authority misattribution, false reassurance og source-fidelity findings er særskilt disponeret;
5. Product kan anbefale næste retning uden at basere den på founderpræference, AI-konsensus eller teknisk convenience;
6. Architecture-, Governance-, Clinical Safety- og Build-dependencies er ejet eller carried som blockers.

Ingen eksisterende prototype, teknisk test eller intern walkthrough opfylder exit condition alene.
