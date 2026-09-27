# PDR-005 — Domain Architecture Reconciliation and Experience Vision Gate

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-005 |
| Version | 1.0 |
| Status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-21 |
| Decision owner | TODO — navngiven Product owner |
| Required reviewers | Product; Architecture for domain boundaries; Governance for lifecycle/LEX scope |

## Decision

1. Domain Architecture v1.0 anvendes som kvalificeret, non-active arbejdsmodel og registreres gennem PDRC-001; Product kopierer eller overtager ikke domænemodellen.
2. CPB-001 og Product-registre skal bevare Domain Architectures semantiske og authority-grænser.
3. Experience Vision v1.0 må nu udarbejdes som ikke-aktivt `DRAFT` efter PEVG-001.
4. Readiness gælder oplevelseskrav og research/evaluation, ikke skærme, navigation, kontroller, prototype, capabilityvalg eller Build-handoff.
5. Domain/LEX/authority-spørgsmål sendes gennem PREG-API-001 og relevante Governance-spor; Product fastlægger dem ikke.

## Begrundelse

Domain Architecture giver et tilstrækkeligt fælles arbejdssprog og adskiller de domæneområder, som Experience Vision skal gøre forståelige for brugeren. Samtidig er status non-active, flere terms/boundaries er candidates eller unresolved, og Governance-gates er åbne. En afgrænset Experience Vision kan derfor begynde, mens solution design fortsat er for tidligt.

## Konsekvenser

- Product kan specificere ønsket ro, orientation, authority comprehension, uncertainty, provenance, failure/recovery, accessibility og perceived performance.
- Product må ikke definere semantic transitions, bounded-context ownership eller LEX.
- Clinical Workflow Architecture følger efter Experience Vision; Information Architecture følger derefter eller i kontrolleret overlap.
- CA-002 prioriteres først efter problem-/workflowevidens og Architecture/Governance handoff.

## Konflikter og risici

Predecessor-sprog, ROADMAP og eksisterende implementation kan bruge “decide”, Consultation/Encounter eller evidence-lignende ord bredere end Domain Architecture. Reconciliation løser ikke disse ved omskrivning; PI-019–PI-023 og API-009–API-013 bærer dem frem til rette ejer.

## Reversibilitet

Experience Vision-gatet kan indsnævres eller suspenderes ved source drift, governancebeslutning eller Architecture-review. PDRC-001 og PEVG-001 bevarer den anvendte sourcehash og de aktuelle begrænsninger.

## Relationer

- Product: [CPB-001](../CORTEX-PRODUCT-BASELINE-v1.0.md), [PDRC-001](../architecture/DOMAIN-ARCHITECTURE-PRODUCT-RECONCILIATION-v1.0.md), [PEVG-001](../experience/CORTEX-EXPERIENCE-VISION-READINESS-v1.0.md), Product registers.
- Architecture: canonical Domain Architecture v1.0; PDR-003; Architecture Foundation Intake.
- Governance: GI-010–GI-018, især lifecycle, owners/IDs, LEX scope og regulatory/QMS.
- Build: ingen handoff eller implementationautorisation.

