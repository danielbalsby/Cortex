# Sprint 1 Product Change Request v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-007 |
| Dokumenttype | Product Change Request og Product Decision Record |
| Version | 1.0 |
| Status | DRAFT — Product-retning fastlagt; Architecture review og Steering gate udestår |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-22 |
| Product owner | TODO — navngiven ejer |
| Godkendende organ | TODO — kompetent Product-/Steering-organ |
| Beslutning | Sprint 1 skal flytte Cortex fra dokumentgenerering til klinisk konsultationsstøtte med en menneskeejet klinisk vurdering som centrum. |
| Implementationstatus | Ikke autoriseret; intet Build-handoff er frigivet |
| Reversibilitet | Høj på konceptniveau; retningen skal revurderes efter ekstern klinikertest |
| Upstream | CPB-001, PEV-001, PDR-005/006, kvalificerede Governance-/Specification-kilder |
| Evidens | P00 Research evidence, P00 Learning Report og Sprint 0 Multi-Agent AI Evaluation |
| Architecture relation | Domain Architecture som non-active arbejdsmodel; PEV-001-H01; PAC-001 |

## Classification model

| Klassifikation | Anvendelse i dette dokument |
|---|---|
| Product decision | Sprint 1-retning eller produktadfærd fastlagt af Product inden for DRAFT-scope. |
| Product hypothesis | Testbar påstand, som ikke må fremstilles som valideret. |
| Research question | Usikkerhed, der kræver direkte evidens. |
| Architecture dependency | Semantik, capability, state, provenance eller boundary, som Architecture skal reviewe/eje. |
| Governance dependency | Klinisk policy, authority, lifecycle, safety, privacy, regulatory eller approval, som Product ikke kan beslutte. |

En post kan have flere klassifikationer. Ingen Product decision i PDR-007 aktiverer Architecture, ændrer kliniske regler eller autoriserer implementation.

## Source qualification

| Kilde | Status og rolle | Anvendelse |
|---|---|---|
| [CPB-001](CORTEX-PRODUCT-BASELINE-v1.0.md) | `DRAFT`; Product-baseline | Mandat, ansvar, klassifikationer og prohibitions. |
| [PEV-001](experience/CORTEX-EXPERIENCE-VISION-v1.0.md) | `DRAFT`, non-active | Experience Principles og krav; ikke valideret design. |
| [P00 Learning Report](research/SPRINT-0-P00-LEARNING-REPORT-v1.0.md) | Intern, begrænset Product-evidens | Product-syntese og anbefalet næste learning slice. |
| [P00 Internal Evaluation](../research/SPRINT-0-INTERNAL-EVALUATION-P00-v1.0.md) | `FORMATIVE`; én founder/klinisk ekspert | Underliggende retrospektive observationer; ikke ekstern validering. |
| [Multi-Agent AI Evaluation](../research/SPRINT-0-MULTI-AGENT-AI-EVALUATION-v1.0.md) | Formativ AI-evaluering | Source- og live-review; ikke seks brugersessioner eller klinisk validering. |
| [Domain Architecture](../architecture/CORTEX-DOMAIN-ARCHITECTURE-v1.0.md) | Non-active working artifact | Kvalificeret semantik og invariants; ikke LEX eller implementationautorisation. |
| [Architecture Constraint Summary](architecture/architecture-constraint-summary-for-product.md) | `DRAFT` Product-summary | Review triggers og operationelle constraints. |
| [PEV-001-H01](../architecture/reviews/PEV-001-H01-ARCHITECTURE-REVIEW.md) | Completed, non-active review record | `CONFORMANT WITH REQUIRED PRODUCT REVISIONS`; fem material revisions udestår. |

P00-testens oplyste commit `19fd101` fastlåser ikke prototypefilerne. Den tidligere prototypeprovenance angiver `1b1b0bd…`. Findings med repository- og live-verifikation er anvendelige som formative signaler, men den testede P00-version er kun delvist reproducerbar. Det registreres som PI-030 og begrænser valideringsclaims, ikke den reversible Product-prioritering.

## 1. Executive Summary

Sprint 0 lærte, at Cortex allerede har et værdifuldt integritetsfundament: ukendte værdier bliver ikke automatisk facts, AI-output er adskilt fra klinikerens vurdering, menneskelige rettelser bevares, handling kræver eksplicit intention, og AI-fejl kan håndteres manuelt.

Sprint 0 viste samtidig et grundlæggende produktproblem. Prototypen organiserer arbejdet omkring felter, et særskilt “AI Summary”, tre dokumentudkast og deres statustrin. Journalen kan fremstå review- og copy-klar, før det kliniske vurderingsgrundlag er tilstrækkeligt. Safety-net, alvorlige differentialer, opfølgning og dokumenttype-specifikke mangler er ikke integreret. Journal og henvisninger ligner i for høj grad dataeksport, og systemets statusmekanik fylder mere end klinikerens vurdering.

Sprint 1 er nødvendig for at teste en ændret produktmodel før mere implementation:

> **Cortex skal bevæge sig fra dokumentgenerering til klinisk konsultationsstøtte.**

Det produktproblem, Sprint 1 løser, er ikke “bedre genereret tekst”. Det er at hjælpe klinikeren med at danne et komplet nok, eksplicit og menneskeejet klinisk billede og omsætte det loyalt til relevant dokumentation og kommunikation—uden at Cortex bliver klinisk autopilot, chatbot eller journalsystem med AI ovenpå.

**Product decision:** Byg videre på Sprint 0’s integritets- og authority-fundament, men ikke på den nuværende output- og statuscentrerede interaction model.

## 2. Sprint 1 Product Objective

### Objective

Sprint 1 skal demonstrere og evaluere, om Cortex kan støtte en knækonsultation omkring fire sammenhængende klinikerjobs:

1. danne et hurtigt og kildefast overblik over kendt, ukendt og uklart;
2. udvikle og eje en struktureret klinisk vurdering;
3. opdage relevante informations-, safety- og opfølgningshuller uden at få en systembeslutning;
4. skabe formålstilpasset journal og henvisning med lav dokumentations- og statusbyrde.

### Product outcome

Klinikeren skal opleve Cortex som:

> En rolig klinisk samarbejdspartner, der hjælper lægen med at tænke, dokumentere og kommunikere bedre.

### Product decisions

- Den kliniske konsultation og klinikerens vurdering er centrum; dokumenter er afledte repræsentationer.
- Human Decision forbliver eksplicit, identificerbar og praktisk korrigerbar eller afviselig.
- Cortex må vise mangler, overvejelser og uncertainty, men må ikke udlede acceptance fra display, stilhed, default eller timeout.
- Journal og henvisning skal være forskellige kliniske kommunikationsformer over et konsistent, menneskeligt autoriseret grundlag.
- Rutineflowet skal have én tydelig næste handling pr. reelt klinisk commitment; interne lifecycle states må ikke blive rutineadministration.
- Sprint 1 forbliver en kontrolleret læringsiteration med syntetiske data.

### Success definition

Sprint 1 er succesfuld, hvis den reducerer usikkerhed om den assessment-centrerede produktmodel og producerer direkte evidens til Steering. Succes er ikke antal features, outputvolumen, teknisk completion eller et positivt AI-review.

## 3. Prioriterede Product Problems

### P0-1 Clinical Completeness

**Klassifikation:** Product decision; Research question; Architecture dependency; Governance dependency.  
**Evidens:** P00-F01/F03, F-M01/F-M02, GP-01, DOC-02, SAFE-01.

#### Problem

Journaltekst kan fremstå færdig, selv om objektiv undersøgelse, klinisk vurdering, plan, opfølgning eller safety-net ikke er registreret eller afklaret. Teknisk readiness kan dermed ligne klinisk tilstrækkelighed.

#### Ønsket produktadfærd

Cortex skal ved relevante commitment-grænser hjælpe klinikeren med at forstå:

- **Hvad mangler?** Ikke registrerede eller ikke vurderede forhold, som er relevante for det aktuelle formål.
- **Hvad bør overvejes?** Kilde- og policy-bundne overvejelser, som kan påvirke vurdering eller plan.
- **Hvad er uklart?** Modstridende, usikkert, ikke vurderbart eller uafklaret materiale.

Støtten skal være kontekstuel og proportional, ikke en universel rigid checklist. Negativ, ikke udført, ikke vurderbar og ukendt må ikke sammenblandes. Klinikeren kan fortsat træffe en eksplicit beslutning under uncertainty, når kompetent policy tillader det; Cortex må ikke kalde beslutningen klinisk komplet alene, fordi tekst findes.

#### Produktkrav

- Teksteksistens, dokument-readiness, menneskelig review, Human Decision og klinisk tilstrækkelighed må ikke være én status.
- Relevante gaps skal være synlige før et dokumentcommitment og forblive sporbare efter klinikerens disposition.
- Gaps skal knyttes til dokumentets eller beslutningens formål, ikke til en stor generisk formular.
- Cortex må ikke kræve ikke-relevante dokumenter eller systemobjekter for at erklære brugerens valgte arbejde afsluttet.

#### Åben grænse

Product definerer experience outcome og researchbehov. Clinical Safety/Governance fastlægger klinisk obligatorisk indhold og thresholds. Architecture fastlægger state-semantik og ejerskab.

### P0-2 Clinical Safety Awareness

**Klassifikation:** Product decision; Product hypothesis; Research question; Architecture dependency; Governance dependency.  
**Evidens:** P00-F02/F08, F-M06, GP-02, SAFE-01, Domain CAP-RSK/CAP-ATT/CAP-DSU constraints.

#### Problem

Sprint 0 mangler integreret støtte til red flags, alvorlige differentialdiagnoser, safety-net, opfølgning og relevante behandlingsforhold. Fravær kan forsvinde som tavshed frem for at være synlig uncertainty.

#### Ønsket produktadfærd

Cortex skal kunne gøre klinikeren roligt opmærksom på et relevant uafklaret safety-forhold uden at beslutte diagnose, behandling, henvisning eller urgency.

Opmærksomhedsstøtte skal:

- være bundet til patientkontekst, formål og godkendt kilde/policy;
- forklare hvorfor forholdet vises og hvilken information der mangler eller er modstridende;
- være tydeligt markeret som Cortex-støtte, ikke klinikerens vurdering;
- tillade klinikeren at undersøge, registrere, afvise eller udsætte inden for autoriseret workflow;
- bevare clinician rationale og uncertainty uden at skabe falsk reassurance;
- være stille som default og kun afbryde ved en kompetent defineret protection function.

#### Safety boundary

- Cortex må ikke auto-acceptere, auto-lukke eller fremstille fravær af signal som lav risiko.
- Cortex må ikke opfinde kliniske thresholds eller lokale rules.
- Alvorlige differentialer er attention-/reasoning-input, ikke en systemdiagnose.
- Safety-net er en menneskeligt vurderet plan-/kommunikationsforpligtelse, ikke boilerplate, der automatisk gør dokumentet sikkert.

### P0-3 Clinical Documentation Quality

**Klassifikation:** Product decision; Product hypothesis; Research question; Architecture dependency; Governance dependency.  
**Evidens:** P00-F03–F05/F09, F-M02/F-M05, DOC-01–DOC-05, SAFE-04.

#### Problem

Journal og henvisninger følger i for høj grad inputmodellens rækkefølge og fremstår som dataeksport. De er ikke tilstrækkeligt prioriterede efter klinisk formål og modtager.

#### Product decision

Sprint 1 skal behandle dokumentation som klinisk kommunikation:

- Journalen skal loyalt repræsentere relevant anamnese, objektive fund, klinikerens vurdering, uncertainty, plan, opfølgning og safety-net i en klinisk sammenhæng.
- Henvisningen skal være et selvstændigt modtagerorienteret dokument med formål, relevant kontekst, klinisk spørgsmål, relevante fund/negative fund, klinikerens vurdering og ønsket modtagerhandling.
- Dokumenter må prioritere forskelligt, men må ikke være uenige om den autoriserede vurdering eller plan.
- Generering må aldrig øge specificitet, certainty eller attribution ud over input og eksplicit klinikerbekræftelse.

#### Dokumentationsniveauer i Sprint 1

`Kort`, `Standard` og `Udvidet` defineres som **arbejdsprofiler til et kontrolleret Product-eksperiment**, ikke som valideret permanent taxonomi.

| Profil | Arbejdsdefinition | Må ikke betyde |
|---|---|---|
| Kort | Kompakt, formålsdækkende kommunikation med nødvendige facts, vurdering, plan, uncertainty og relevant safety-net. | Ufuldstændig, kildefri eller uden obligatorisk sikkerhedsindhold. |
| Standard | Balanceret klinisk fortælling med tilstrækkelig kontekst til den almindelige konsultation og efterfølgende continuity. | Automatisk “korrekt” default for alle cases. |
| Udvidet | Mere rationale, relevante negative fund, differentialer, uncertainty og handoff-kontekst, når formål eller kompleksitet kræver det. | Mere sand, mere autoritativ eller en ukritisk dump af alle data. |

Fælles principper:

- Profilerne ændrer udtryk og detaljegrad, ikke source facts, Human Decision eller authority.
- Klinisk obligatorisk indhold og material uncertainty må ikke forsvinde i `Kort`.
- Brugeren skal kunne forudsige forskellen før commitment og kontrollere resultatet efter.
- En kontekstafledt profil uden eksplicit niveauvalg skal sammenlignes som alternativ.
- Product må ikke fastlægge klinisk obligatorisk indhold uden Clinical Safety/Governance.

### P0-4 Cortex Overblik

**Klassifikation:** Product decision; Product hypothesis; Research question; Architecture dependency.  
**Evidens:** P00-F07, F-M03/F-H03, UX-03, PH-02/PH-03.

#### Problem

“AI Summary” er ikke et intuitivt produktkoncept. Navnet beskriver teknologien, mens den kliniske opgave, input, limitations og relation til klinikerens arbejde er uklar.

#### Nyt Sprint 1-koncept

**Cortex Overblik** erstatter “AI Summary” som working Product concept i Sprint 1.

#### Formål

At give klinikeren hurtig, kildefast orientering i den aktuelle konsultation og vise beslutningsrelevante gaps eller konflikter uden at producere en skjult konklusion.

#### Brugerbehov

- forstå patientens aktuelle problem og tilgængelige kontekst hurtigt;
- se hvad der er registreret, mangler, er uklart eller modstridende;
- genfinde klinikerens egen vurdering og plan, når de findes;
- forstå hvilke dele Cortex har udvalgt, sammenfattet eller foreslået;
- få adgang til provenance og limitations, når tillid eller handling afhænger af dem.

#### Hvad vises

- formålsrelevant patient- og konsultationskontekst med source/time/status, hvor relevant;
- tydeligt adskilte kendte, manglende, uklare og modstridende forhold;
- klinikerens vurdering og Human Decision som menneskeejet information;
- Cortex attention- eller overvejelsespunkter med rationale, source/policy-status og uncertainty;
- stale/changed state, hvis upstream-information har ændret betydning.

#### Hvad vises ikke

- en færdig diagnose eller plan, som ikke er besluttet af klinikeren;
- ny specificitet, der ikke understøttes af kilden;
- AI-provider- eller modelteater i den primære oplevelse;
- rå interne lifecycle-, audit- eller verification-statusser;
- et generisk confidence-tal uden accepteret metode og mening;
- en fuld journal forklædt som orientering.

#### Attribution og uncertainty

Registreret information, klinikerens vurdering og Cortex-støtte skal kunne skelnes uden forklaring. Sammenfatning ændrer ikke informationens authority. Unknown må ikke blive negative. Cortex skal vise limitation, konflikt og manglende coverage proportionalt og give adgang til provenance ved behov.

**Research question:** Forstår eksterne klinikere `Cortex Overblik` som orienterings- og opmærksomhedsstøtte, eller skaber konceptet fortsat en forventning om AI-konklusion?

### P0-5 Trust & Provenance

**Klassifikation:** Product decision; Architecture dependency; Governance dependency.  
**Evidens:** Sprint 0 source-integrity finding, SAFE-02/03, PAC-001–004, Domain trust boundaries.

#### Problem

Sprint 0’s gruppehandling kan tilføre mere specifikke facts end den synlige kilde, og patientrapporteret information kan få stærkere klinisk formulering. Det bryder Cortex’ epistemiske grænse, selv om brugeren klikker eksplicit.

#### Produktkrav

- **Ingen hallucineret specificitet:** Cortex må ikke tilføje mekanisme, timing, severity, attribution, certainty eller klinisk klassifikation, som input ikke understøtter.
- **Ingen authority-upgrade gennem placering:** Information bliver ikke klinisk fact, fordi den vises i et struktureret felt eller genereret dokument.
- **Tre forståelige lag:** Registreret/source-bound information, klinikerens vurdering/Human Decision og Cortex-forslag/system contribution skal være tydeligt adskilt.
- **Transformation er sporbar:** Sammenfatning, udvælgelse, formulering og dokumentafledning skal kunne forklares tilbage til input og version.
- **Menneskelig bekræftelse er præcis:** En samlet bekræftelse må kun omfatte synligt præsenterede facts; nye fortolkninger kræver særskilt klinikerhandling.
- **Attribution bevares:** Patientrapporteret, observeret, målt, hentet, udledt og klinikervurderet information må ikke blandes tavst.
- **Correction propagates:** Ændring af source fact eller Human Decision skal gøre påvirkede afledte repræsentationer synligt stale, invalidated, superseded eller re-review-required efter relevant contract.

### P0-6 Consultation-Centred Flow

**Klassifikation:** Product decision; Product hypothesis; Research question; Architecture dependency.  
**Evidens:** P00-F06, F-M04/F-M07, UX-01–UX-04, PH-01/PH-04.

#### Problem

Tre dokumenter, 12 samtidige statusknapper og op til ni rutineklik gør systemobjekter til workflowets centrum. Optional outputs kan blokere completion.

#### Ønsket produktadfærd

- Det aktuelle kliniske job og relevant kontekst skal dominere; inaktive dokumentfamilier skal ikke ligne fejl eller pending work.
- Én tydelig primær handling skal repræsentere ét reelt klinisk commitment med forståelig actor og consequence.
- Redigering, afvisning, alternative handlinger og recovery skal forblive praktisk mulige.
- Review/authorization, copy/delivery og outcome skal forblive semantisk adskilt, selv når den synlige rutine forenkles.
- Completion skal følge klinikerens eksplicit valgte intention og nødvendige arbejde, ikke alle objekter systemet kan generere.
- Research-instrumentering skal holdes ude af klinikerens primære opmærksomhedsflade.

Den konkrete navigation, kontroltype og layout er ikke besluttet.

## 4. Sprint 1 Scope

### In scope

| Område | Sprint 1-afgrænsning | Klassifikation |
|---|---|---|
| Klinisk slice | Den eksisterende syntetiske knækonsultation anvendes som learning slice; klinisk indhold kræver faglig review. | Product decision; Governance dependency |
| Assessment-centred workflow | Kendt/ukendt, relevant negatives, objektiv undersøgelse, klinikerens vurdering, uncertainty, plan, opfølgning og safety-net som sammenhængende brugerbehov. | Product decision; Architecture dependency |
| Cortex Overblik | Working concept for kildefast orientering, gaps, konflikt og attribution. | Product decision; Research question |
| Clinical completeness support | Synlige formålsrelevante gaps uden rigid universal checklist eller false completion. | Product decision; Governance dependency |
| Safety awareness | Rolig, advisory og source-bounded opmærksomhedsstøtte. | Product hypothesis; Architecture/Governance dependency |
| Journal | Klinisk sammenhængende og formålsdækkende dokumentation. | Product decision |
| Henvisninger | Billeddiagnostik og fysioterapi som modtagerorienteret klinisk kommunikation. | Product decision; Governance dependency |
| Dokumentationsprofiler | Kort/Standard/Udvidet sammenlignet med et kontekstuelt alternativ. | Product hypothesis; Research question |
| Simplificeret flow | Én primær commitment-handling, relevant progressive disclosure og intention-baseret completion. | Product decision; Research question |
| Trust/provenance | Source fidelity, attribution, transformation og correction impact som acceptance outcomes. | Product decision; Architecture dependency |
| Evaluation | Intern pilot efterfulgt af kontrolleret test med fem eksterne klinikere, hvis governance tillader det. | Research question; Governance dependency |

### Out of scope

- reel AI-modelintegration eller valg af AI-model;
- EHR-, laboratoriesystem-, billeddiagnostik-, fysioterapi- eller delivery-integration;
- virkelige patientdata;
- clinical release, production readiness eller regulatoriske claims;
- automatisk diagnose, behandling, henvisning, urgency eller klinisk beslutning;
- fastlæggelse af clinical rules, thresholds, mandatory content eller regionale krav uden kompetent authority;
- ny capability, bounded context, LEX-definition eller domain ownership besluttet af Product;
- konkrete komponenter, navigation, farver, visuel identitet, API’er, database, cloud eller frontend-teknologi;
- generel journalplatform eller udvidelse til flere kliniske pathways;
- Build-start, implementation handoff eller releaseplan gennem dette dokument.

## 5. Experience Impact

| Experience Principle | Sprint 1-forpligtelse | Risiko og guardrail | Klassifikation |
|---|---|---|---|
| **Calm before clever** | Én klinisk arbejdsrepræsentation og proportional attention frem for samtidige AI-, output- og statusflader. | Calm må ikke skjule material uncertainty eller safety-relevant information. | Product decision |
| **Context before controls** | Relevant known/unknown/conflict vises sammen med det aktuelle klinikerjob. | Kontekst må ikke blive en skjult anbefaling eller generisk informationsdump. | Product decision |
| **One clear next action** | Én primær handling pr. reelt clinical commitment; alternativer og reject bevares. | Lav friktion må ikke fjerne reflection eller implicit skabe Human Decision. | Product decision; Architecture dependency |
| **Progressive disclosure** | Kun relevant dokument, detail, provenance og exception state får aktuel vægt. | Provenance, limitation, failure og authority skal være praktisk tilgængelige ved behov. | Product decision |
| **Explicit human authority** | Klinikerens vurdering, beslutning og autorisation kan identificeres og korrigeres; Cortex er støtte. | Display, stilhed, default og timeout er aldrig acceptance. | Product decision; Architecture dependency |
| **Visible uncertainty** | Missing, unclear, conflict, not assessed og degraded bevares som forskellige betydninger. | Fravær af signal må ikke se ud som fravær af risiko. | Product decision; Governance dependency |

### Experience anti-goals

Sprint 1 må ikke gøre Cortex til:

- et journalsystem med AI ovenpå;
- en tekstgenerator;
- en generisk chatbot;
- en klinisk autopilot;
- en checklistemaskine, hvor completion erstatter klinisk judgement;
- en systemkonsol, hvor statusadministration erstatter consultation.

## 6. Acceptance Criteria

Acceptance criteria er Product-evalueringskriterier, ikke release- eller clinical safety-claims. AC-01, AC-02, AC-06, AC-07, AC-08 og AC-10 kræver en gennemført test med fem eksterne klinikere; hvis fem ikke gennemfører, rapporteres evidenshul frem for en kunstig pass-rate.

| ID | Målbart kriterium | Evidensmetode | Klassifikation/dependency |
|---|---|---|---|
| AC-01 Purpose | Mindst 4/5 klinikere kan inden 30 sekunder og uden facilitatorforklaring beskrive Cortex som støtte til egen klinisk vurdering og dokumentation, ikke som beslutningstager. | Opgavetid og explain-back. | Research question |
| AC-02 Overblik | Mindst 4/5 kan lokalisere patientens problem, mindst tre bevidst indbyggede gaps/uncertainties og Cortex-bidragets rolle uden procedurehjælp. | Scenarioopgave og observationslog. | Research question |
| AC-03 Source fidelity | I alle godkendte syntetiske golden scenarios er der 0 nye specifics, authority upgrades eller negative facts uden source eller eksplicit klinikerbekræftelse. | Input-output-diff og clinical/source review. | Product decision; Architecture/Governance dependency |
| AC-04 Completeness | Et dokument kan ikke fremstå commitment-ready, mens et på forhånd defineret material gap er skjult. Hvert gap skal være synligt, afklaret eller eksplicit disponeret af klinikeren. | State-/scenarioinspektion med versioneret gap-set. | Architecture/Governance dependency |
| AC-05 Low-friction authority | Rutinevejen kræver højst én eksplicit klinisk commitment-handling pr. valgt dokument; copy/delivery forbliver separat, og ingen optional output blokerer completion. | Interaktionstælling og state explain-back. | Product decision; Architecture dependency |
| AC-06 Human authority | Mindst 4/5 kan korrekt skelne registreret information, egen vurdering/Human Decision og Cortex-forslag samt forklare konsekvensen af commitment. | Attribution-/comprehension-opgave. | Research question |
| AC-07 Documentation profiles | Mindst 4/5 kan forudsige forskellen mellem Kort, Standard og Udvidet; alle profiler bevarer samme facts, Human Decision og definerede obligatoriske safety-elementer. | Blind sammenligning, output-diff og redigeringsanalyse. | Product hypothesis; Governance dependency |
| AC-08 Clinical communication | Mindst 4/5 vurderer journal og relevante henvisninger som forståelige i formål og kan identificere modtagerens spørgsmål uden at læse konsultationsformularen. Klinisk kvalitet kræver separat expert review. | Document-only task og strukturret review. | Research question; Governance dependency |
| AC-09 Recovery | I alle failure-, missing- og stale-scenarier er tilstanden sandfærdig, menneskeligt arbejde bevares, og en sikker næste mulighed eller ærlig block er tilgængelig. | Reproducerbare scenario-tests. | Product decision; Architecture dependency |
| AC-10 Experience | Mindst 4/5 gennemfører kerneflowet uden procedurehjælp; kvalitative fund viser ingen systematisk konflikt med EP-01/02/03/04/05 og visible uncertainty. | Modereret test, task outcome og finding review. | Research question |
| AC-11 Traceability | Hver afledt repræsentation kan i review forklares tilbage til actual input/version, transformation, system contribution, klinikeredit og authorization state. | Architecture review og verification scenario. | Architecture dependency |
| AC-12 Evidence honesty | P00-, AI-review-, prototype- og klinikertestevidens rapporteres særskilt; teknisk pass eller AI-konsensus fremstilles ikke som clinical validation. | Research report review. | Product decision; Governance dependency |

## 7. Architecture Handoff

### Handoff state

**PREPARED BY PRODUCT — NOT ACCEPTED BY ARCHITECTURE — NO BUILD AUTHORIZATION.**

Architecture skal reviewe behovene, ikke implementere Product’s mulige løsning.

| ID | Reviewbehov | Product-behov | Architecture-spørgsmål |
|---|---|---|---|
| S1-AH-01 | Assessment → Decision → Documentation | En menneskeejet vurdering skal være fælles grundlag for dokumenter. | Hvilke eksisterende contexts/capabilities ejer facts, assessment, Recommendation, Human Decision og representation uden ny Product-defineret model? |
| S1-AH-02 | Completeness/readiness axes | Gaps skal være synlige uden false completion. | Hvordan adskilles processing, functional validity, document readiness, human review, Verification og clinical validation? |
| S1-AH-03 | Risk/Uncertainty/Attention | Advisory safety awareness med proportional interruption. | Hvilke CAP-RSK/CAP-ATT/CAP-DSU contracts, source-policy og failure semantics kræves? |
| S1-AH-04 | Source fidelity/provenance | Ingen øget specificitet eller authority gennem transformation. | Hvilke provenance- og transformation obligations sikrer source, attribution, version og correction impact? |
| S1-AH-05 | Document family consistency | Journal og henvisning skal være forskellige, men konsistente om assessment/plan. | Hvordan repræsenteres common authorised basis, intended audience/use og independent representation lifecycle? |
| S1-AH-06 | Simplified human action | Én synlig commitment-handling uden implicit decision eller sammenblandet execution. | Hvilke state transitions og authority checks kan forenkles i experience, men skal forblive semantisk separate? |
| S1-AH-07 | Cortex Overblik | Overblik samler source-bound orientation, gaps og Cortex contribution. | Er behovet dækket af CAP-CTX/RSK/DSU/DOC-handoffs, eller kræves en capability revision/candidate? Product opretter ikke capability-ID. |
| S1-AH-08 | Correction propagation | Human correction skal påvirke afledte dokumenter ærligt. | Hvordan identificeres downstream impact, stale/invalidation/re-review og audit facts uden history rewrite? |
| S1-AH-09 | PEV-001 revisions | Sprint 1 skal være kompatibel med Experience Vision. | Bekræft at PEV-001-H01 F-01–F-05 er indarbejdet eller eksplicit carried før detailed workflow/design. |
| S1-AH-10 | Documentation profiles | Samme truth/authority, forskellig formålsbestemt detaljegrad. | Er dette presentation/representation policy, og hvordan bevares mandatory information og provenance? |

### Architecture non-request

Product beder ikke Architecture om at vælge UI, teknologi, API, model, database eller deployment. Product beder heller ikke om oprettelse af CA-002 alene for at muliggøre Sprint 1. Architecture skal først vurdere, om eksisterende capability purposes ændres, eller om et dokumenteret capability-gap findes.

## 8. Build Handoff Preparation

### Handoff state

**NOT RELEASED. Build må ikke starte fra PDR-007.**

Et senere Product/Architecture-godkendt handoff skal beskrive følgende observerbare produktadfærd:

1. Den syntetiske konsultation kan opbygges med tydelig forskel mellem source facts, clinician-entered information, assessment, Human Decision og Cortex contribution.
2. Cortex Overblik orienterer om relevant context, gaps, conflict og uncertainty uden at skabe diagnose eller plan.
3. Material gaps er synlige ved relevant commitment; text presence ligner ikke clinical completeness.
4. Journal og valgte henvisninger afledes loyalt fra samme autoriserede vurderingsgrundlag, men kommunikerer efter forskelligt formål og modtager.
5. Kort/Standard/Udvidet kan sammenlignes uden ændring af facts, authority eller obligatorisk safety-indhold.
6. Rutineflowet har én tydelig commitment-handling; edit, reject, copy/delivery, failure og stale/recovery forbliver forståelige.
7. Optional outputs vises og påvirker completion kun efter klinikerens intention.
8. Menneskelige rettelser bevares, og påvirkede afledte repræsentationer ændrer validity ærligt.
9. Evaluation-instrumentering kan indsamle task outcome, edits, gaps, recovery og attribution uden at dominere klinikerens arbejdsflade.
10. Kun syntetiske data anvendes; ingen ekstern levering eller live-AI er nødvendig for læringsmålet.

Build-handoffet må ikke foreskrive komponenter, teknologi, API’er eller production contracts. Før frigivelse kræves mindst Product owner, Architecture response, PEV-revision disposition, clinical content/safety review scope, research protocol og Steering-beslutning.

## 9. Sprint 1 Prioriteringsliste

Prioriteringen følger patientsikkerhed og epistemisk integritet før klinisk værdi, kognitiv belastning og adoption.

| Prioritet | Ændring | Begrundelse | Klassifikation |
|---|---|---|---|
| P0 | Stop false completeness og synliggør formålsrelevante gaps | Et tyndt dokument må ikke ligne klinisk tilstrækkelighed. | Product decision; Architecture/Governance dependency |
| P0 | Garanter source fidelity og præcis attribution | Mere specifik eller mere sikker tekst end input bryder Cortex’ integritetsfundament. | Product decision; Architecture dependency |
| P0 | Gør klinikerens strukturerede vurdering til produktets centrum | Assessment skal bære Human Decision og afledte dokumenter. | Product decision; Architecture dependency |
| P0 | Definér advisory clinical safety awareness | Red flags, alvorlige alternativer, follow-up og safety-net skal kunne forblive synlige uden systembeslutning. | Product hypothesis; Architecture/Governance dependency |
| P0 | Forenkl authority- og completion-flow | Ni rutineklik og optional outputs skaber bureaukrati og svækker meningsfuldt commitment. | Product decision; Research question |
| P0 | Erstat AI Summary med Cortex Overblik som Sprint 1 working concept | Klinikerens job skal være forståeligt før teknologien. | Product decision; Research question |
| P0 | Gør journal og henvisninger modtager- og formålstilpassede | Klinisk kommunikation er et kerneproblem i Sprint 1 og reducerer efterredigering og uklare handoffs. | Product decision; Governance dependency |
| P1 | Test Kort/Standard/Udvidet mod et kontekstuelt alternativ | Niveauer kan reducere byrde, men kan også skabe valg og skjule information. | Product hypothesis; Research question |
| P1 | Indfør reel progressive disclosure | Kun aktuelt relevante controls, documents, provenance og exceptions skal konkurrere om attention. | Product decision; Research question |
| P1 | Adskil research-instrumentering fra klinikeroplevelsen | Synlig måling kan påvirke adfærd og øge støj. | Product decision |
| P2 | Optimér copy og lokal tekstfriktion | Må først prioriteres efter den kliniske arbejdsmodel og authority er forståelig. | Research question |

## 10. Product Decision, Consequences and Alternatives

### Decision

Product fastlægger Sprint 1 som en assessment-centreret learning iteration. Den nuværende Sprint 0 interaction model skal ikke poleres eller udvides featurevist. De bevarede invariants er source fidelity, explicit human authority, reversibility, no automatic delivery og honest degradation.

### Rationale

P00 og multi-agent-reviewet konvergerer om de samme syv materielle problemer. Source-/live-review tilføjer konkrete false-completeness- og source-fidelity-fund. Retningen er reversibel og kan testes i samme syntetiske slice uden at vælge teknologi eller ændre clinical rules.

### Fravalgte alternativer

| Alternativ | Disposition | Begrundelse |
|---|---|---|
| Polér Sprint 0 UI | Afvist som Sprint 1-retning | Ændrer ikke den outputcentrerede produktmodel eller false completeness. |
| Tilføj flere felter/checklister | Afvist som generel løsning | Kan øge kognitiv belastning og foregive clinical completeness uden authority. |
| Integrér en rigtig AI-model nu | Afvist/out of scope | Modelkvalitet løser ikke uklart klinisk job, source fidelity eller authority. |
| Start flere pathways | Udskudt | Udvider variation før kernearbejdsmodellen er forstået. |
| Fjern alle statusser | Afvist | Intern semantik, authority, copy/delivery og outcome skal fortsat kunne skelnes. |
| Automatisk generér safety-net/plan | Afvist | Kan skabe boilerplate, false reassurance og implicit clinical decision. |

### Consequences

- Clinical Workflow Architecture skal tage udgangspunkt i assessment-, decision- og document-relationship frem for den eksisterende skærmsekvens.
- PEV-001 kræver fortsat kontrolleret revision efter PEV-001-H01.
- Architecture review er obligatorisk før et detaljeret design- eller Build-handoff.
- Klinisk indhold og safety-policy kræver kompetente reviewere og sourcegrundlag.
- Sprint 1’s første værdi er læring; permanent produktbeslutning om Overblik, dokumentationsprofiler og safety-interaction afhænger af ekstern evidens.

## 11. Åbne spørgsmål og Dependencies

| ID | Spørgsmål/dependency | Klassifikation | Ejer |
|---|---|---|---|
| S1-Q01 | Hvilke informationstyper udgør et tilstrækkeligt assessment-grundlag i den syntetiske knæcase? | Research question; Governance dependency | Product Research + Clinical Safety |
| S1-Q02 | Hvilke red flags, alvorlige alternativer, follow-up- og safety-net-forhold er source- og policy-gyldige? | Governance dependency | Clinical Safety/Governance |
| S1-Q03 | Kan Cortex Overblik forstås uden at blive tillagt diagnostic authority? | Research question | Product Research |
| S1-Q04 | Kan én commitment-handling bevares adskilt fra copy/delivery/outcome i brugerens forståelse? | Research question; Architecture dependency | Product + Architecture |
| S1-Q05 | Reducerer dokumentationsprofiler redigering uden tab af vigtig information? | Product hypothesis; Research question | Product Research |
| S1-Q06 | Hvilket recipient review kræves for billeddiagnostik- og fysioterapikommunikation? | Governance dependency; Research question | Product + Clinical stakeholders |
| S1-Q07 | Hvordan løses PEV-001-H01 F-01–F-05 og registreres Steering-gatet? | Architecture/Governance dependency | Product + Steering |
| S1-Q08 | Kan fem eksterne klinikere testes under godkendt research/privacy/safety-ramme? | Governance dependency | Governance + Product Research |
| S1-Q09 | Hvilke eksisterende capabilities dækker Sprint 1, og er der et reelt capability-gap? | Architecture dependency | Architecture |
| S1-Q10 | Hvilken prototypeversion skal versionsfastlåses, så næste evidenskæde er reproducerbar? | Product/Build preparation issue | Product Research + Build custodian |

## 12. Traceability and Gate

### Traceability chain

`Sprint 0 P00 + AI review → PDR-007 Product direction → Architecture review → Clinical/Safety content review → Research protocol → Steering gate → bounded Build handoff → Sprint 1 evidence`

| Sprint 1 need | Upstream evidence | Downstream verification |
|---|---|---|
| Clinical completeness | P00-F01/F03; GP-01; DOC-02 | AC-02/04/09 |
| Safety awareness | P00-F02/F08; GP-02; SAFE-01 | AC-02/06/09 |
| Documentation quality | P00-F03–F05/F09; DOC-01–05 | AC-07/08 |
| Cortex Overblik | P00-F07; PH-02/03 | AC-01/02/06 |
| Trust/provenance | SAFE-02/03; PAC-001–004 | AC-03/11 |
| Simplified flow | P00-F06; UX-01–04 | AC-05/10 |

### Exit gate before Build

PDR-007 er **ikke** Build-ready. Steering kan først frigive et særskilt Build-handoff, når:

1. PDR-007 har navngiven Product owner og dokumenteret disposition;
2. Architecture har besvaret S1-AH-01–10 og registreret unresolved blockers;
3. PEV-001-H01 F-01–F-05 er indarbejdet eller eksplicit carried med owner;
4. Clinical Safety/Governance har afgrænset content-, policy- og evaluation authority;
5. researchprotokol, syntetiske scenarios, measures og stopping rules er versioneret;
6. prototypebaseline og source fixtures kan reproduceres;
7. Steering har registreret, at handoffet autoriserer et bounded learning build—ikke clinical use, release eller real patient data.

Ingen tavshed, eksisterende prototypekode, bestået test eller AI-konsensus kan erstatte dette gate.
