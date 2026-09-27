# Cortex Product Baseline v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | CPB-001 |
| Version | 1.0 |
| Kontrolleret lifecycle-status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Statusnote | Den administrative markering er ikke en ny lifecycle-status. |
| Dato | 2026-07-21 |
| Product owner | TODO — navngiven ejer |
| Godkendende organ | TODO — kompetent Product-/Governance-organ |
| Formål | Vedvarende Product-baseline for mandat, scope, brugerbehov, principper, ansvar, artefakter, constraints, readiness og næste leverancer. |

## 1. Beslutning og autoritet

CPB-001 etablerer Cortex – Product som repository-baseret arbejdsspor under `docs/product/`. Baseline er et Product-artefakt under de kanoniske Governance- og Specification-kilder og over Product-detaljering, Architecture-handoffs og Build-implementation.

Baseline anvender følgende klassifikationer:

| Klassifikation | Betydning |
|---|---|
| Normativt dokumenteret | Direkte krav eller grænse fra canonical Governance/Specification, med kildens faktiske lifecycle-kvalifikation. |
| Arkitektonisk dokumenteret | Arbejdsconstraint eller model fra Architecture; ikke automatisk aktiv eller accepteret. |
| Product-besluttet | Beslutning truffet og registreret i Product-sporet. |
| Product-hypotese | Testbar Product-påstand uden tilstrækkelig evidens; registreres i Assumption Register. |
| Kandidat | Mulig domæne-, Product- eller løsningsretning, der kræver relevant beslutning/review og ikke må behandles som fastlagt. |
| Uafklaret | Manglende beslutning, evidens, ejer eller afhængighed; registreres som issue, når den påvirker arbejdet. |

En udledning er en analysemetode, ikke en autoritetsklasse. Resultatet klassificeres som arkitektonisk dokumenteret, Product-besluttet, Product-hypotese, kandidat eller uafklaret efter evidens og ejer.

Ingen formulering i denne baseline løfter en upstream-kildes status.

## 2. Product mandate

**Normativt dokumenteret:** Cortex skal støtte den kliniske konsultation i almen praksis ved at reducere kognitiv og administrativ belastning, beskytte klinisk dømmekraft og patientrelation samt bevare eksplicit menneskelig beslutningsmyndighed. AI er et middel, ikke produktet eller klinisk autoritet.

**Product-besluttet:** Når brugeren åbner Cortex, skal systemet reducere — ikke øge — den mentale belastning. Cortex skal opleves som et roligt, enkelt, flydende og forudsigeligt klinisk arbejdsredskab, aldrig som et tungt journalsystem.

## 3. Product scope og non-scope

### Scope

**Normativt dokumenteret:** Støtte før, under og efter konsultationen gennem capabilities for kontekst, viden/evidens, beslutningsstøtte, human decision, dokumentation, opfølgning, governance og audit inden for Specificationens systemgrænse.

**Product-besluttet:** Product ejer problemvalg, bruger- og workflowforståelse, Experience Vision, informationsbehov, prioritering, Product requirements, målbare acceptance criteria og synlige interaktionsforpligtelser.

### Non-scope

Cortex er ikke:

- elektronisk patientjournal, patientdatabase, booking-, fakturerings- eller ordinationssystem;
- autonom diagnostiker eller beslutningstager;
- chatbot, guideline-database eller dokumentgenerator som selvstændigt produkt;
- autoriseret til at sende, ordinere, henvise eller ændre klinisk sandhed uden eksplicit kompetent menneskelig handling;
- et Product-mandat til at vælge frontend, API, database, cloud, model eller anden implementationsteknologi.

## 4. Normative upstream-kilder

| Rækkefølge | Kilde | Faktisk anvendelse i Product |
|---|---|---|
| 1 | [Cortex Philosophy](../governance/canonical/Cortex-Philosophy.docx) | Autoritativt fortolkningsgrundlag; version/status/ejer fortsat uafklaret. |
| 2 | [Constitution Ratification Report](../governance/canonical/Cortex-Constitution-Ratification-Report.docx) | Højeste foreslåede normative lag; betinget anbefalet, ikke dokumenteret endeligt ratificeret. |
| 3 | [Governance Framework v1.0](../governance/canonical/Cortex-Governance-Framework-v1.0.docx) | Autoritativt framework; Foundational Draft/Provisional og ikke ACTIVE. |
| 4 | [Cortex Specification v1.0](../specifications/Cortex-Specification-v1.0.docx) | Autoritativ systemdefinition; `RATIFIED BASELINE`-claim er kvalificeret af GI-015. |
| Assurance | [Stress Test](../governance/assurance/Cortex-Governance-Framework-Stress-Test-v1.0.docx), [Adoption Report](../governance/GOVERNANCE-ADOPTION-REPORT-v2.0.md), [Artifact Register](../governance/GOVERNANCE-ARTIFACT-REGISTER.md), [Build Baseline v1.1](../architecture/CORTEX-BUILD-BASELINE-v1.1.md) | Status-, canonicality-, gap- og readiness-kontrol; kan ikke tilsidesætte normative kilder. |

[Governance Import Report v1.0](../governance/GOVERNANCE-IMPORT-REPORT-v1.0.md) er superseded og anvendes kun historisk.

## 5. Product–Architecture–Build responsibility map

| Område | Product | Architecture | Build |
|---|---|---|---|
| Brugerproblem og outcome | Ejer discovery, evidens, prioritering og Product-hypoteser. | Rådgiver om feasibility og systemgrænser. | Leverer ikke problemdefinition. |
| Klinisk workflow | Definerer formål, aktører, brugeroplevelse, synlige authority points og acceptance. | Ejer logiske workflow-, capability-, domæne- og failure-kontrakter. | Implementerer accepterede kontrakter og verificerer adfærd. |
| Information og mening | Definerer brugerens informationsbehov, orientering og progressive disclosure. | Ejer domænetyper, provenance, ownership og semantiske relationer. | Realiserer og tester accepterede modeller. |
| Menneskelig autoritet | Definerer, hvornår authority skal være forståelig og handlingsbar. | Ejer systemets authority/state transitions. | Må ikke opfinde eller ændre authority gennem implementation. |
| Prioritering | Ejer Product-roadmap og stop/fortsæt-anbefalinger. | Vurderer arkitekturrisiko og afhængigheder. | Estimerer og rapporterer implementationsevidens. |
| Teknologi og implementation | Definerer ikke løsningen. | Ejer teknologiuafhængige og senere tekniske beslutninger efter mandat. | Ejer kode, test og leverance inden for accepterede beslutninger. |
| Klinisk/regulatorisk autoritet | Ejer ikke klinisk sandhed, residual risiko eller klassifikation. | Ejer heller ikke disse alene. | Ejer ikke disse. Kompetente Governance-, clinical safety-, quality- og regulatory-roller kræves. |

Product må ikke overtage Architecture- eller Build-ansvar. Handoffs registreres i [Architecture–Product Interface Register](registers/architecture-product-interface-register.md).

## 6. Primære og øvrige brugergrupper

| Gruppe | Klassifikation | Aktuel Product-position |
|---|---|---|
| Praktiserende læge under konsultationen | Normativt dokumenteret | Primær bruger og eksplicit menneskelig klinisk beslutningsmyndighed inden for relevant rolle. |
| Patienten i konsultationen | Normativt dokumenteret som berørt menneske/participant | Product skal beskytte værdighed, nærvær, forståelse og relation; patientens direkte systembrug er ikke afklaret. |
| Klinisk personale omkring forberedelse/opfølgning | Dokumenteret som mulige aktører; konkret scope uafklaret | Må ikke antages at have samme authority som lægen. |
| Product, clinical governance, safety, quality og audit-roller | Dokumenteret som organisatoriske aktører | Sekundære brugere af sporbarhed, review og assurance; konkrete workflows mangler. |
| Danske praktiserende læger som første researchpopulation | Product-hypotese | Skal valideres mod intended purpose, variation i praksis og regulatorisk scope. PA-001. |

## 7. Centrale brugerproblemer

### Dokumenterede problemer

- Samtidig klinisk ræsonnering, kommunikation, hukommelsesarbejde, dokumentation og administration overbelaster begrænset opmærksomhed.
- Fragmenteret information og krav om at huske guidelines, røde flag, dokumentations- og henvisningskrav skaber risiko og arbejdsbyrde.
- Digitale værktøjer kan konkurrere med patientrelationen, skabe flere valg og flytte opmærksomhed fra konsultationen.
- Automatisering kan skjule usikkerhed, provenance, fejl eller authority og dermed skabe falsk tryghed.
- Dobbeltregistrering og efterfølgende dokumentationsarbejde reducerer tid og nærvær.

### Product-afledte problemer — klassificeret som Product-hypoteser

- Brugeren har behov for at forstå kontekst, status, provenance og næste relevante handling uden at overskue hele systemets kompleksitet.
- Failure og degraded states skal opleves som klare og håndterbare, ikke som tekniske afbrydelser eller skjult normalitet.
- Sporbarhed skal være tilgængelig uden at dominere den primære kliniske arbejdsflade.

### Uafklaret evidens

Problemstørrelse, variation mellem brugere/settings, nuværende coping-strategier, acceptable attention budgets og målbare baselineværdier mangler systematisk Product research.

## 8. Product hypotheses og research questions

Hypoteser vedligeholdes i [Product Assumption Register](registers/product-assumption-register.md). Centrale spørgsmål er:

- Hvilke øjeblikke i konsultationen skaber størst kognitiv belastning, og hvilke bør Cortex bevidst ikke støtte?
- Hvilken information giver orientation uden at skabe overvågning eller ekstra valg?
- Hvornår skal provenance, usikkerhed og begrænsninger være synlige straks, og hvad kan udfoldes progressivt?
- Hvordan genkender brugeren forskellen mellem information, forslag og egen beslutning?
- Hvordan skal systemet opføre sig ved manglende, modstridende eller utilgængelig information?
- Hvilke mål kan dokumentere mindre belastning uden at optimere klinisk arbejde til klik eller hastighed alene?
- Er knæ-workflowet fortsat det rigtige første governed Product-slice, eller er det primært et implementation-era referenceforløb?

## 9. Product principles

1. **Konsultationen er produktet.** Dokumentation og administrative outputs er konsekvenser.
2. **Reducer mental belastning.** En funktion skal fjerne eller beskytte opmærksomhed, ikke demonstrere systemets kompleksitet.
3. **Én tydelig primær handling.** Sekundære muligheder fremkommer efter behov.
4. **Kontekst før kontroller.** Brugeren skal forstå situationen før valg præsenteres.
5. **Progressive disclosure uden semantisk tab.** Enkelhed må ikke skjule provenance, usikkerhed, failure eller authority.
6. **Diskret AI.** AI må ikke være oplevelsens centrum eller fremstå som klinisk autoritet.
7. **Eksplicit menneskelig beslutningsmyndighed.** Stilhed, display, default eller timeout er ikke accept.
8. **Unknown forbliver unknown.** Manglende, konflikt og degraded er ærlige tilstande.
9. **Rolig, forudsigelig og flydende.** Oplevet hastighed, stabilitet og kontinuitet er Product-kvaliteter.
10. **Tilgængelighed og lighed fra start.** De er systemforpligtelser, ikke efterfølgende polish.
11. **Workflow før features.** Ingen feature uden et dokumenteret problem, outcome og workflowrelation.
12. **Målbar værdi og stopdisciplin.** Vigtigt problem, plausibel mekanisme, ansvarlig risiko, målbar værdi og bedre opportunity cost kræves.

## 10. Foreløbig Experience Vision

Cortex skal føles som et roligt klinisk arbejdsredskab, der holder konsultationens sammenhæng samlet og beskytter lægens opmærksomhed. Brugeren skal kunne orientere sig øjeblikkeligt, fortsætte med få handlinger og forstå systemets status uden at lære et softwareworkflow.

Oplevelsen skal:

- gøre den kliniske kontekst tydelig før kontroller;
- bevare én tydelig primær handling og anvende progressive disclosure;
- gøre menneskelig authority, provenance, usikkerhed og failure forståelig præcis når det har betydning;
- lade AI være diskret, begrænset og korrigerbar;
- bevare brugerens kontrol, fri navigation og mulighed for at afvise eller gå videre;
- være tilgængelig, robust og oplevet hurtig;
- reducere visuel, interaktionel og beslutningsmæssig støj.

Den fulde [Cortex Experience Vision v1.0](experience/CORTEX-EXPERIENCE-VISION-v1.0.md) operationaliserer nu denne baseline som DRAFT uden konkrete skærme.

## 11. Capability- og workflowrelationer

**Arkitektonisk dokumenteret:** Capability Architecture CA-001 viser Knowledge Retrieval som logisk reference. Ranking er ikke authority eller evidensstyrke; retrieval skal bevare kilde, coverage, begrænsning, konflikt og failure. Den aktuelle Domain Architecture bruger den administrative markering `Non-active working artifact pending GI-018 resolution` og giver en kvalificeret arbejdsmodel for Workflow, Human Decision, Evidence, Claims, Provenance og øvrige bounded contexts.

**Repositorykontekst:** [WF-001](../vision/WF-001-The-Consultation-Workflow.md), [Product Roadmap](ROADMAP.md) og [Workflow Families](proposals/WORKFLOW-FAMILIES.md) er eksisterende Product-/workflow-predecessors og arbejdsartefakter. De er ikke højere end de canonical upstream-kilder. Roadmappens knæ-, akut- og chronic-care-sekvens skal senere reconciles gennem Product research og en kontrolleret roadmapbeslutning.

**Product-besluttet:** Experience Vision, Clinical Workflow Architecture og Information Architecture kan fortsætte som DRAFT. Nye eller ændrede capabilities kræver et afgrænset Product–Architecture-handoff.

## 12. Product artifact hierarchy

```text
docs/product/
├── README.md                              Product-sporets indeks og onboarding
├── CORTEX-PRODUCT-BASELINE-v1.0.md       Vedvarende Product-baseline
├── architecture/                         Product-læsning af Architecture-constraints
├── decisions/                            Product Decision Records
├── experience/                           Experience Vision og senere experience-artefakter
├── workflows/                            Product-ejede kliniske workflowbeskrivelser
├── information-architecture/             Product-ejet informationsarkitektur
├── requirements/                         PRD'er og Product requirements
├── research/                             Researchplaner og evidens
├── registers/                            Beslutnings-, issue-, assumption- og interface-registre
├── handoffs/                             Product-to-Architecture/Build handoffs
└── proposals/                            Eksisterende ikke-accepterede Product-forslag
```

`docs/vision/`, `docs/design/`, `docs/clinical/`, `docs/architecture/` og implementation bevares som separate ansvarsspor. ADR-001 er `Proposed`; denne baseline flytter ingen eksisterende filer og etablerer ingen konkurrerende canonical kopi.

## 13. Product Decision Record-model

En væsentlig Product-beslutning skal have stabilt PDR-ID og mindst: titel, version, status, dato, owner, beslutning, kontekst/begrundelse, alternativer, konsekvenser, risici, reversibilitet, åbne spørgsmål samt relationer til Governance, Architecture og Build.

Beslutninger lukkes ikke ved tavshed. De supersedes kun af en eksplicit efterfølger med bidirektionelt link eller markeres gennem en kompetent lifecycle-beslutning. Indeks: [Product Decision Register](registers/product-decision-register.md).

## 14. Product Issue- og Assumption-model

- Et **issue** er en dokumenteret konflikt, blocker, manglende beslutning/evidens eller control gap. Det lukkes kun med verificerbar evidens og relation til den resolution, der fjernede konsekvensen.
- En **assumption** er en testbar påstand, som Product midlertidigt arbejder under. Den skal have ejer, evidensbehov, risiko ved fejl og review trigger. Den bliver `VALIDATED`, `INVALIDATED` eller `SUPERSEDED`; manglende svar er ikke validering.

Registre: [Product Issue Register](registers/product-issue-register.md) og [Product Assumption Register](registers/product-assumption-register.md).

## 15. Governance- og Architecture-constraints

Den operationelle Architecture-analyse findes i [Architecture Foundation Intake v1.0](architecture/cortex-product-architecture-intake-report-v1.0.md), [Architecture Constraint Summary](architecture/architecture-constraint-summary-for-product.md) og [Domain Architecture Product Reconciliation](architecture/DOMAIN-ARCHITECTURE-PRODUCT-RECONCILIATION-v1.0.md); domænemodellen duplikeres ikke her.

Følgende gælder for Product-arbejdet:

- Architecture-artefakter med `Proposed` er ikke aktive, accepterede, implementerede eller releasebasis.
- Domain Architecture er et non-active working artifact pending GI-018 resolution og en kvalificeret arbejdsmodel, ikke formel LEX.
- Source → Retrieved Passage → Evidence Item → Claim er separate betydnings- og ownership-overgange; Product må kun definere deres forståelighed.
- Decision Support/Recommendation er separat fra Human Decision og Action; menneskelig authority kræver eksplicit handling.
- Risk and Uncertainty er et særskilt arkitektonisk domæneområde; Product må ikke reducere det til en skjult score eller en udefineret Confidence-værdi.
- Provenance, Traceability og Audit har forskellige formål og owners; clinical evidence er forskellig fra Verification Evidence.
- Evidence, Claim, AI Output, Recommendation, Human Decision, Action og Documentation må ikke sammenblandes.
- Provenance, sporbarhed, uncertainty og failure må ikke fjernes gennem forenkling.
- Privacy, security, retention, regulatory/QMS, authority og clinical risk må ikke udfyldes gennem Product-antagelser.
- Product requirements skal have målbar adfærd og acceptance criteria uden at foreskrive teknologi.

## 16. Dependencies og blockers

### Governance

- Constitution og Governance Framework er ikke dokumenteret fuldt aktiverede.
- Owners, approval bodies, stable IDs, effective dates og canonical registry controls mangler flere steder.
- Specificationens ratifikationskæde har GI-015.
- Regulatory applicability, classification, QMS boundary og kompetente clinical safety-roller mangler.
- Consultation Impact Standard og Roadmap Decision Record-metode mangler.

### Architecture

- Software Architecture Baseline, Governance & Traceability Architecture, CA-001 og ADR-001–003 er `Proposed`.
- Domain Architecture har en administrativ non-active working-artifact-markering; formel LEX mangler.
- Case, Subject, Confidence og Consultation/Encounter-forholdet er uafklaret; Product må ikke definere dem endeligt.
- Ingen ADR er accepteret; traceability enforcement, use-case SLO'er og implementation prerequisites er uafklarede.

### Build

- Build Baseline v1.1 vurderer Architecture Readiness som ikke opnået.
- Eksisterende implementation og tests er evidens om teknisk adfærd, ikke klinisk validering eller Product-accept.
- Uvedkommende working-tree-ændringer og untracked adoption-/prototypeartefakter må ikke forveksles med Product-autorisation.

### Product

- Navngiven Product owner og approval body mangler.
- Systematisk brugerresearch, measurable cognitive-load baseline og Consultation Impact Standard mangler.
- Eksisterende roadmap, vision/workflow predecessors og ny canonical baseline er ikke endnu formelt reconciled.
- Første governed workflow-slice og dets research-/success criteria skal bekræftes.

## 17. Product readiness

| Område | Readiness | Beslutning |
|---|---|---|
| Product Baseline | Reconciled som DRAFT/non-active | CPB-001 er færdiggjort for nuværende Product-gate; ikke ratificeret og afhængig af source/review. |
| Experience Vision | ESTABLISHED AS DRAFT — ARCHITECTURE REVIEW READY | [PEV-001](experience/CORTEX-EXPERIENCE-VISION-v1.0.md) er oprettet; PEV-001-H01 er prepared, not submitted. Ikke design-/prototype-ready. |
| Clinical Workflow Architecture | PARTIALLY READY | Må fortsætte som DRAFT; workflowvalg, authority, risk og failure ownership kræver afklaring. |
| Information Architecture | READY TO BEGIN IN DRAFT | Brug den non-active Domain Architecture som kvalificeret model; formel LEX og ownership mangler. |
| Concrete UI/screens | NOT AUTHORIZED | Afventer Experience Vision, workflow- og informationskontrakter. |
| Klinisk prototyping | NOT AUTHORIZED | Eksisterende prototyper er implementation-era arbejde; ny Product-autorisation kræver governance og evalueringsramme. |
| Implementation handoff | NOT READY | Ingen accepteret Architecture-baseline/ADR og centrale Governance-gates er åbne. |

## 18. Næste Product-leverancer

1. **Afgrænset Architecture review af PEV-001** — Steering starter PEV-001-H01 eksplicit; ikke startet nu.
2. **Clinical Workflow Architecture v1.0** — efter initial Experience Architecture review og afklaring af første governed workflow-slice.
3. **Information Architecture v1.0** — efter eller i kontrolleret overlap med workflowarkitekturen, afhængig af Domain Architecture/formel LEX.
4. **Prioritering af CA-002** — først efter problem-/workflowevidens, owner/scope og handoff.
5. **Interaction design og kontrolleret prototype** — først efter relevante gates; ikke autoriseret nu.

Der må endnu ikke vælges konkrete skærme, navigation, interaktionskontroller, komponentbibliotek, farver, frontend, API, database, cloud eller AI-model.

## 19. Hvad baseline ikke autoriserer

CPB-001 autoriserer ikke:

- klinisk brug, evaluering med patienter, release eller production;
- Architecture acceptance, ADR acceptance eller implementation conformance;
- regulatoriske, privacy-, security-, QMS- eller safety claims;
- autonome kliniske beslutninger eller skjult human approval;
- konkrete UI-skærme, design tokens, komponenter eller teknologivalg;
- overskrivning af Governance, Specification, Architecture eller eksisterende Product-artefakter;
- at `Active`, `v1.0`, filplacering, testresultat eller implementation læses som klinisk validering.

## 20. Relationer

- Product-beslutninger: [PDR-002](decisions/PDR-002-authoritative-source-intake.md), [PDR-003](decisions/PDR-003-architecture-foundation-intake.md), [PDR-004](decisions/PDR-004-canonical-repository-adoption.md), [PDR-005](decisions/PDR-005-domain-architecture-reconciliation.md) og [PDR-006](decisions/PDR-006-experience-vision-v1.0.md).
- Product-status og onboarding: [README](README.md).
- Product-issues og assumptions: [Issue Register](registers/product-issue-register.md) og [Assumption Register](registers/product-assumption-register.md).
- Architecture-interface: [Interface Register](registers/architecture-product-interface-register.md).
