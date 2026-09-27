# Cortex Product Decision Register

| Felt | Værdi |
|---|---|
| Dokument-ID | PREG-DEC-001 |
| Version | 1.0 |
| Status | DRAFT |
| Ejer | TODO — navngiven Product owner |
| Upstream-relation | CPB-001; Governance Framework decision controls; Specification traceability requirements |
| Sidst opdateret | 2026-07-30 |
| Formål | Indeksere væsentlige Product-beslutninger uden at erstatte den enkelte PDR. |

## Beslutninger

| ID | Titel | Status | Dato | Record | Aktuel betydning |
|---|---|---|---|---|---|
| PDR-002 | Autoritativt source intake og lifecycle-alignment | DRAFT | 2026-07-21 | [Åbn PDR](../decisions/PDR-002-authoritative-source-intake.md) | Kvalificerer Governance/Specification for Product. |
| PDR-003 | Architecture Foundation Intake | DRAFT | 2026-07-21 | [Åbn PDR](../decisions/PDR-003-architecture-foundation-intake.md) | Kvalificerer Architecture, constraints og readiness. |
| PDR-004 | Canonical Repository Adoption and Product Baseline Completion | DRAFT | 2026-07-21 | [Åbn PDR](../decisions/PDR-004-canonical-repository-adoption.md) | Etablerer repositoryet som Product-hukommelse og CPB-001 som baseline. |
| PDR-005 | Domain Architecture Reconciliation and Experience Vision Gate | DRAFT | 2026-07-21 | [Åbn PDR](../decisions/PDR-005-domain-architecture-reconciliation.md) | Reconciler Domain Architecture og åbner Experience Vision som ikke-aktivt DRAFT. |
| PDR-006 | Cortex Experience Vision v1.0 | DRAFT | 2026-07-21 | [Åbn PDR](../decisions/PDR-006-experience-vision-v1.0.md) | Etablerer PEV-001, principles, requirements, researchagenda, kill criteria og reviewpackage. |
| PDR-007 | Sprint 1 Product Change Request v1.0 | DRAFT | 2026-07-22 | [Åbn PDR](../SPRINT-1-PRODUCT-CHANGE-REQUEST-v1.0.md) | Fastlægger assessment-centreret Sprint 1-retning, prioritering, acceptance criteria og gated Architecture-/Build-handoffs; autoriserer ikke implementation. |
| PDR-008 | Sprint 1.1 Product Learning Contract v1.0 | DRAFT | 2026-07-22 | [Åbn PDR](../research/SPRINT-1-1-PRODUCT-LEARNING-CONTRACT-v1.0.md) | Prioriterer P01-opfølgning om clinical depth, journal communication, attention comprehension og målbar friktion; autoriserer ikke Architecture submission eller Build. |
| PDR-009 | Sprint 1.2 Product Learning Contract v1.0 | DRAFT | 2026-07-22 | [Åbn PDR](../research/SPRINT-1-2-PRODUCT-LEARNING-CONTRACT-v1.0.md) | Prioriterer IA-comparison, uncertainty-state-forståelse, cardinality/discoverability og adaptiv recovery; autoriserer ikke Architecture submission eller Build. |
| PDR-010 | C3 Calm Clinical Workflow — Product Learning Contract v1.0 | DRAFT — PRODUCT-READY FOR BOUNDED BUILD AUTHORIZATION | 2026-07-30 | [Åbn PDR](../research/C3-CALM-CLINICAL-WORKFLOW-PRODUCT-LEARNING-CONTRACT-v1.0.md) | API-017 constraints og human clinical phrase review er reconciled; C3-PBH-001 er Product-released med C3-FIX-001 v1.1. Kun separat Steering Build-authority udestår. |
| PDR-011 | C3.2 PSOAP Fast Flow — Product Learning Contract v1.0 | DRAFT — PRODUCT-RECONCILED; READY FOR BOUNDED STEERING BUILD AUTHORIZATION | 2026-07-30 | [Åbn PDR](../research/C3-2-PSOAP-FAST-FLOW-PRODUCT-LEARNING-CONTRACT-v1.0.md) | API-018 er accepteret, C32-PBH-001 er Product-released, og C32-FF-SCENARIO-001@1.0 er locked med C3.1 som comparator og `≤113 sekunder` som founder-gate. Kun separat Steering Build authority udestår. |

PDR-001 blev ikke fundet i det kanoniske repository. Registeret antager ikke dets indhold, status eller historiske autoritet.

## Vedligeholdelses- og closure-regel

En PDR fjernes aldrig, fordi beslutningen ændres. Den markeres kun `SUPERSEDED` eller anden tilladt status gennem en eksplicit efterfølger med links i begge retninger. `DRAFT` lukkes ikke ved tavshed, implementation eller filplacering; named owner, kompetent review og dokumenteret statusændring kræves.
