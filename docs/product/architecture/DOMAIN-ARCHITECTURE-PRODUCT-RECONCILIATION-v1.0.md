# Cortex Domain Architecture — Product Reconciliation v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDRC-001 |
| Version | 1.0 |
| Status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-21 |
| Ejer | TODO — navngiven Product owner |
| Architecture counterpart | TODO — Chief Software Architect / navngiven delegeret |
| Beslutningsrecord | [PDR-005](../decisions/PDR-005-domain-architecture-reconciliation.md) |
| Formål | Registrere Domain Architectures Product-konsekvenser uden at kopiere domænemodellen eller overtage Architecture-ejerskab. |

## 1. Source record

| Felt | Registrering |
|---|---|
| Kilde | [Cortex Domain Architecture v1.0](../../architecture/CORTEX-DOMAIN-ARCHITECTURE-v1.0.md) |
| Version | 1.0 |
| Status | `Non-active working artifact pending GI-018 resolution` |
| Statusbetydning | Administrativ arbejdsmarkering, ikke en lifecycle-status; ikke `REVIEW`, `RATIFIED` eller `ACTIVE`. |
| Dato | 2026-07-21 |
| Responsible author | Chief Software Architect |
| Governance owner / approving body | TODO — GI-010–GI-012 |
| SHA-256 ved reconciliation | `26bec902aa8e19ede9db0edac6f88b434b060247c98de9cc11d4bbe422a39d57` |
| Product-anvendelse | Kvalificeret arbejdsmodel for ikke-aktive Product-artefakter. |
| Må ikke anvendes som | Aktiv arkitektur, formel LEX, implementeringskontrakt, releasegrundlag, regulatorisk/QMS-evidens eller klinisk autorisation. |

## 2. Upstream-basis

Domain Architecture placerer sig under Philosophy, den foreslåede Constitution, Governance Framework, Specification, Software Architecture Baseline og Governance & Traceability Architecture. Den bruger desuden canonicality/assurance-kilder, eksisterende vision/workflow-kontekst, Engineering Constitution, Clinical Safety Principles, RFC-005, CA-001 og capability-template.

Product overtager ikke kildens authority claims. CPB-001 bevarer de særskilte lifecycle-kvalifikationer fra PDR-002 og PDR-003.

## 3. Bounded contexts — Product-læsning

De 15 bounded contexts er arkitektonisk afledte logiske ansvarszoner, ikke services, moduler, teams eller UI-områder:

| Gruppe | Bounded contexts | Product-konsekvens |
|---|---|---|
| Identitet og kontekst | Identity and Access; Clinical Context | Product beskriver rolle, formål, kontekstbehov og synlig autorisation; ejer ikke identitets- eller kontekstmodellen. |
| Viden til ræsonnering | Knowledge and Sources; Evidence; Claims and Reasoning | Product må bevare kæden Source → Retrieved Passage → Evidence Item → Claim og må ikke gøre ranking, passage eller AI-output til evidens/claim ved præsentation. |
| Risiko og flow | Risk and Uncertainty; Workflow and Attention | Product specificerer oplevelseskrav til risiko, unknown, timing og afbrydelser; Architecture ejer betydning og propagation. |
| Authority og repræsentation | Decision Support; Human Decision; Documentation and Patient Communication | Product gør forslag, menneskelig beslutning, handling og draft-status forståelige; ejer ikke authority transitions eller clinical truth. |
| Lifecycle og kontrol | Controlled Learning; Governance; Traceability; Verification; Audit | Product leverer rationale, acceptance og brugerbehov; ejer ikke governance, teknisk trace graph, verification conclusions eller audit records. |

Identity and Access er desuden boundary candidate. Bounded-contextstrukturen er ikke accepteret deployment- eller component architecture.

## 4. Beslutningsmyndighed

- Product ejer workflow purpose, user value, attention protection, capability scope og visible interaction obligations.
- Clinical expertise ejer klinisk vurdering, diagnose, behandlingsvalg og accept/afvisning af recommendations.
- Architecture/software engineering ejer systemsemantik, capability contracts, state integrity, failure/degraded behavior og senere allocation.
- Governance ejer normative hierarchy, lifecycle, gates, policies og exceptions.
- AI/system kan generere information og recommendation inden for kontrakt, men kan ikke skabe Human Decision eller clinical authority.
- Human Decision kræver identificeret autoriseret aktør og eksplicit handling. Display, default, stilhed og timeout er aldrig acceptance.

## 5. Centrale invariants med Product-konsekvens

| Invariant | Product-konsekvens |
|---|---|
| Provenance bevares gennem transformationer. | Progressive disclosure må ikke fjerne mulighed for at forstå oprindelse, version, transformation og limitation. |
| Source, Retrieved Passage, Evidence Item og Claim er forskellige. | Labels, sprog og informationshierarki må ikke opgradere et objekt semantisk. |
| AI Output er ikke Human Decision, Evidence eller clinical authority. | Experience Vision skal beskrive forståelig separation uden at gøre AI til centrum. |
| Unknown, conflict, missing og degraded er gyldige tilstande. | Failureoplevelsen skal vise betydning, konsekvens, recovery og menneskelig kontrol. |
| Recommendation, Decision og Action er separate states. | Product skal definere forståelighed ved overgange; Architecture skal reviewe selve transitionen. |
| Risk er multidimensionel og absence er ikke low risk. | Product må ikke reducere risk/uncertainty til en skjult score eller generisk confidence-indikator. |
| Verification Evidence er scope-bundet og ikke klinisk evidens. | Product claims og research/evaluation-resultater skal angive, hvad der faktisk blev verificeret eller valideret. |
| Traceability, provenance og audit har forskellige formål. | Experience Vision kan beskrive adgang og forståelighed, men må ikke samle dem i ét generisk “history”-begreb. |
| Clinical documentation er draft indtil autoriseret review/approval. | Draft-status og menneskelig authority skal være forståelige uden at gøre flowet til et journalsystem. |

## 6. Capability mapping — Product-betydning

Domain Architecture placerer Specificationens 12 capabilities i de logiske contexts: CAP-CTX, CAP-KNR, CAP-EVD, CAP-RSN, CAP-RSK, CAP-ATT, CAP-DSU, CAP-DOC, CAP-PCM, CAP-LRN, CAP-AUD og CAP-GOV.

Product må prioritere problemer og outcomes, men må ikke:

- opfinde nye capability-ID'er for Identity/Access, Workflow, Human Decision, Traceability eller Verification;
- vælge CA-002 alene ud fra teknisk bekvemmelighed;
- ændre capability ownership gennem Experience Vision eller PRD;
- bruge CA-001 som model for hele Cortex.

Et capabilityvalg kræver problem-/outcome-evidens, owner/scope, Architecture review og de relevante Governance-gates.

## 7. Product-relevante risici og åbne spørgsmål

| Område | Status | Product-risiko / handling |
|---|---|---|
| Claim vs Assertion | Uafklaret LEX-spørgsmål | Undgå at gøre Assertion til stabil Product-type; eskalér ved behov. |
| Subject vs Patient | Kandidat/uafklaret | Undgå synonymbrug, især i privacy/identity-sammenhæng. |
| Case | Uafklaret | Brug ikke som generisk Product-container. |
| Consultation vs Encounter | Uafklaret compatibility | Experience Vision bruger “consultation” om den menneskelige/kliniske oplevelse og kræver mapping før workflow-/IA-kontrakter. |
| Confidence vs Uncertainty | Uafklaret | Undgå fælles confidence-skala eller visuel sikkerhedsclaim; specificér uncertainty-behov kontekstuelt. |
| Source → Evidence → Claim | Candidate ADR/LEX contract | Product beskriver forståelighed; Architecture/Evidence/Governance ejer transition og policy. |
| Workflow/Action vs Human Decision | Candidate ADR | Product må ikke designe implicit acceptance eller action authority. |
| Traceability vs Audit | Candidate ADR | Product må ikke definere et samlet ownership- eller lagringsbegreb. |
| Clinical vs Verification Evidence | Candidate semantic decision | Experience research og tests må ikke præsenteres som klinisk evidens eller clinical validation. |
| CAP-ATT / Consultation Impact | Uafklaret dependency | Experience Vision skal definere krav og måleproblemer; Governance/Architecture skal afklare standard/authority. |

## 8. Product–Architecture conflicts

Der er ingen nødvendig konflikt mellem CPB-001 og Domain Architecture efter denne reconciliation. Følgende spændinger kræver eksplicit håndtering:

1. Predecessor-sprog kan sige, at Cortex “decides” eller beskrive Consultation/Encounter som samme ting; Domain Architecture tillader ikke implicit equivalence eller systemisk clinical decision authority.
2. Productmålet om få handlinger må ikke blive til default, silence eller timeout som acceptance.
3. Målet om ro må ikke skjule uncertainty, conflict, missing evidence eller degraded state.
4. Målet om diskret AI må ikke skjule systemets bidrag, provenance eller distinction fra Human Decision.
5. ROADMAP/implementation kan prioritere knæflowet, men CA-002 kan ikke vælges alene af sunk cost eller teknisk bekvemmelighed.

## 9. Handoffs krævet før senere Product-beslutninger

Handoffs registreres i PREG-API-001 for:

- Source → Retrieved Passage → Evidence Item → Claim transitions;
- Recommendation/AI Output → Human Decision → Action transitions;
- Risk/Uncertainty semantics og CAP-ATT/Consultation Impact;
- provenance/traceability/audit ownership boundaries;
- clinical evidence/verification evidence/clinical validation separation;
- Consultation/Encounter compatibility og enhver brug af Case eller Confidence;
- capability selection og scope for CA-002.

## 10. Readiness conclusion

CPB-001 er reconciled og forbliver `DRAFT`/non-active. Cortex Experience Vision v1.0 må udarbejdes som et ikke-aktivt `DRAFT` efter [PEVG-001](../experience/CORTEX-EXPERIENCE-VISION-READINESS-v1.0.md). Reconciliation autoriserer ikke interaction design, prototype eller Build-handoff.

## 11. Parallel Governance dependency

Steering/Governance bør etablere én afgrænset beslutningspakke for:

1. GI-018 og gyldig lifecycle-status/migration;
2. navngivne owners og approving bodies;
3. dokumentidentitet og effective dates;
4. triage af hvilke LEX-spørgsmål der faktisk kræver normativ afklaring.

Pakken må ikke udvides til at løse almindelige domænemodelleringsspørgsmål. Architecture beholder ansvar for modelleringsvalg; Governance afgør kun normative/lifecycle/authority-spørgsmål inden for sit mandat.
