# Architecture Review Input — Cortex Experience Vision v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PEV-001-H01 |
| Version | 1.0 |
| Status | DRAFT — PREPARED, NOT SUBMITTED |
| Dato | 2026-07-21 |
| Request owner | TODO — Product owner |
| Intended reviewer | Cortex – Architecture; named reviewer TODO |
| Steering status | Reported as prepared; review must not start automatically. |
| Subject | [PEV-001](../experience/CORTEX-EXPERIENCE-VISION-v1.0.md) |
| Domain source/hash | [Domain Architecture v1.0](../../architecture/CORTEX-DOMAIN-ARCHITECTURE-v1.0.md), `26bec902aa8e19ede9db0edac6f88b434b060247c98de9cc11d4bbe422a39d57` |

## Review request

Architecture bedes alene vurdere:

1. Om PEV-001 konflikter med Domain Architecture eller bruger domain terms som private definitioner.
2. Om PEV-001 konflikter med decision authority, især AI Output/Recommendation → Human Decision → Action.
3. Om provenance-, Source/Evidence/Claim-, Verification Evidence-, Traceability- eller Audit-krav er fejlagtigt sammenblandet.
4. Om PEV-001 utilsigtet vælger technical solution, component/service boundary, state model, SLO eller implementation architecture.
5. Om trust-boundary-konsekvenser eller capability dependencies mangler, især CAP-CTX/KNR/EVD/RSK/ATT/DSU/DOC/PCM/AUD/GOV.

## Specific interfaces to inspect

- API-001/009/010: authority og Source → Evidence → Claim.
- API-011/012: provenance/traceability/audit og clinical/verification evidence.
- API-013: Consultation/Encounter/Case/Confidence.
- PEV-001-R04–R13 og R15–R17.
- EP-04–EP-10.

## Requested response

For hver finding ønskes:

- source section/constraint;
- affected PEV principle/requirement;
- finding type: conflict, ambiguity, missing dependency eller no conflict;
- required Product clarification eller separate Architecture decision;
- blocker severity for Clinical Workflow Architecture og Information Architecture.

## Explicit non-scope

Architecture skal ikke:

- overtage eller omskrive Product vision/principles;
- vælge UI, layout, navigation eller controls;
- godkende prototype, Build eller release;
- løse Governance-owned lifecycle, owner, LEX eller regulatory/QMS-spørgsmål;
- starte CA-002 eller technical design.

## Submission gate

Steering/Product skal navngive request owner og Architecture reviewer samt registrere reviewstart. Indtil da er pakken kun `PREPARED, NOT SUBMITTED`.

