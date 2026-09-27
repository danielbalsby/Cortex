# PDR-006 — Cortex Experience Vision v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-006 |
| Version | 1.0 |
| Status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-21 |
| Decision owner | TODO — navngiven Product owner |
| Required reviewers | Product; Architecture through PEV-001-H01; Governance/Safety for owned gates |

## Decision

1. PEV-001 etableres som samlet, ikke-aktivt Experience Vision-artefakt.
2. North Star er reduceret mental belastning; “pulsen falder” er Product vision/research hypothesis, ikke fysiologisk claim.
3. Tolv konsoliderede Experience Principles og 18 nested requirements (`PEV-001-Rxx`) udgør første Product-controlled Experience model.
4. Predecessor-materiale videreføres kun efter eksplicit disposition i PEV-001 §2.2.
5. Kill criteria er bindende Product-reviewkriterier for senere ideas/designs, men ikke regulatory approval.
6. PEV-001-H01 forberedes, men Architecture review startes ikke automatisk.
7. Experience Vision autoriserer ikke interaction design, prototype, CA-002, Build-handoff, clinical use eller release.

## Begrundelse

CPB-001 og Domain reconciliation gør Experience-arbejdet muligt uden at opfinde domain semantics. Et samlet visionartefakt er nødvendigt for at kunne reviewe workflows og senere design mod konsistente outcomes frem for æstetiske eller tekniske præferencer.

## Alternativer

| Alternativ | Disposition | Begrundelse |
|---|---|---|
| Fortsætte alene med CX-001/MVP/WF. | Afvist | Predecessors mangler current authority-, provenance-, failure- og readiness-reconciliation. |
| Udarbejde konkrete concepts/screens nu. | Afvist | Workflow, IA, Architecture review og research gates mangler. |
| Etablere PEV-001 som requirements/research vision uden solution design. | Valgt | Giver reviewbart Product-grundlag og bevarer ansvarssnit. |

## Konsekvenser

- Experience Vision er `DRAFT` og klar til afgrænset Architecture review request.
- Clinical Workflow Architecture er næste strukturelle leverance efter initial review.
- Product assumptions/researchagenda er eksplicitte; Visionen må ikke fremstilles som valideret brugerresearch.
- ROADMAP prototypeplan og predecessor real-use claims er ikke autoriserende.

## Risici og reversibilitet

Principper eller requirements kan være for generelle, indbyrdes spændte eller baseret på uvaliderede hypotheses. PEV-001 er reversibel gennem ny PDR og versionskontrolleret revision efter review/research; historik og rejected principles bevares.

## Åbne spørgsmål

- Product owner, Architecture reviewer og Governance/Safety owners.
- Experience Quality thresholds og første governed workflow-slice.
- Consultation Impact Standard, Source/Evidence/Claim transition og Consultation/Encounter compatibility.
- Approved research protocol og participant/data scope.

## Relationer

- Product: [PEV-001](../experience/CORTEX-EXPERIENCE-VISION-v1.0.md), [Research Agenda](../research/EXPERIENCE-RESEARCH-AGENDA-v1.0.md), registers og CPB-001.
- Architecture: [PEV-001-H01](../handoffs/ARCHITECTURE-REVIEW-INPUT-EXPERIENCE-VISION-v1.0.md), PDRC-001 og canonical Domain Architecture.
- Governance/Safety: GI-010–GI-018, Consultation Impact, intended use, research/clinical evaluation gates.
- Build: ingen handoff eller implementationautorisation.

