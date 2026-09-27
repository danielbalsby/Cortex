# PDR-004 — Canonical Repository Adoption and Product Baseline Completion

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-004 |
| Version | 1.0 |
| Status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-21 |
| Decision owner | TODO — navngiven Product owner |
| Required reviewers | Product; Governance for lifecycle/owner; Architecture for interfaces |

## Beslutning

1. `docs/product/` er permanent Product-hukommelse; samtalehistorik og lokalt workspace er ikke authoritative efter adoption.
2. CPB-001 etableres som `DRAFT` med en administrativ GI-018-markering, som ikke er en lifecycle-status.
3. Eksisterende Product-filer bevares uændret og kvalificeres via CPB-001/issues; ingen fil flyttes under den `Proposed` ADR-001.
4. Lokale arbejdsudkast adopteres selektivt efter dispositionstabellen.
5. Concrete UI, klinisk prototyping og implementation handoff forbliver ikke autoriseret.

## Repository-inventory før oprettelse

| Fil/artefakt | Fundet status | Beslutning |
|---|---|---|
| `docs/product/ROADMAP.md` | `Active`; owner `Cortex`; reviewed 2026-07-15 | Bevaret uændret; reconciliation åbnet som PI-015. |
| `docs/product/proposals/WORKFLOW-FAMILIES.md` | v1.0; `Draft` | Bevaret uændret som proposal. |
| `docs/product/requirements/README.md` | Ingen kontrolleret metadata | Bevaret uændret som requirements-konvention. |
| CPB-001 og Product-registre | Ikke fundet | Nye repositoryartefakter oprettet. |
| Cortex Experience Vision v1.0 under `docs/product/` | Ikke fundet | Ikke oprettet; næste leverance. |
| `docs/vision/CX-001`, `MVP-001`, `WF-001` | Foundational Draft v2.0 / v1.0 / v1.0 | Bevaret som predecessor/Product-kontekst; PI-016. |

## Disposition af lokale arbejdsudkast

| Arbejdsudkast | Ækvivalent før adoption | Disposition | Begrundelse |
|---|---|---|---|
| Architecture Intake Report | Ingen | Adopteret; CPB-fraværsafsnit rebaselinet. | Vedvarende evidence/readiness. |
| Architecture Constraint Summary | Ingen | Adopteret. | Operationelt constraint-/reviewindeks. |
| Architecture–Product Interface Register | Ingen | Adopteret. | Vedvarende koordinering/ownership. |
| PDR-003 | Ingen | Adopteret og rebaselinet. | Væsentlig Product-beslutning. |
| Product State Summary | Ingen | Integreret i `docs/product/README.md`. | Undgår parallel statusfil. |
| Decision Register | Ingen | Adopteret og rebaselinet. | Vedvarende beslutningsindeks. |
| Issue Register | Ingen | Adopteret/rebaselinet med aktive/lukkede issues. | Vedvarende blocker-/closurefunktion. |
| PDR-002 | Ingen | Adopteret og integreret med CPB-001. | Bevarer source/lifecycle-beslutning. |
| Product Authoritative Source Register | Upstream Artifact Register findes | Ikke adopteret separat; konklusioner integreret i CPB-001/PDR-002. | Undgår dobbelt canonical source register. |
| Lokal Domain Architecture-fil | Repositoryversion findes | Afvist. | Ikke source of truth; forældet availability-basis. |

## Begrundelse og konsekvenser

Repositoryadoption gør Product-beslutninger genoptagelige uden chat-/workspacehukommelse. Eksisterende ROADMAP, proposal og requirements-guide overskrives eller ratificeres ikke. Repositorykopierne er nu de vedligeholdte Product-artefakter; de lokale filer er kun arbejds-/historikmateriale. Experience Vision kan begynde som DRAFT med caution.

Under valideringen ændrede den untracked Domain Architecture sig fra den hash/status, som den første intake havde registreret, til hash `26bec902aa8e19ede9db0edac6f88b434b060247c98de9cc11d4bbe422a39d57` og den administrative non-active marking. Product-artefakterne blev revalideret mod den aktuelle fil; Architecture-kilden blev ikke ændret af Product. Driften er registreret som PI-018.

## Risici og reversibilitet

ADR-001 er ikke accepteret, og Product-strukturens endelige approval mangler. Strukturen følger eksisterende `docs/product/` uden flytning og kan senere migreres gennem en accepteret ADR med linkinventory og rollback. Historik slettes ikke.

## Åbne spørgsmål

- Hvem ejer og godkender Product-sporet?
- Hvornår gøres untracked Governance-/Architecture-kilder persistent?
- Hvordan reconciles ROADMAP, CX-001, MVP-001 og WF-001 med CPB-001?
- Hvilket workflow er første governed research- og delivery-slice?

## Relationer

- Governance: Artifact Register, Adoption Report v2.0 og GI-010–GI-018.
- Product: [CPB-001](../CORTEX-PRODUCT-BASELINE-v1.0.md), [README](../README.md), [Decision Register](../registers/product-decision-register.md), [Issue Register](../registers/product-issue-register.md), [Assumption Register](../registers/product-assumption-register.md).
- Architecture: ADR-001 er `Proposed`; PDR-003 og PREG-API-001 bevarer reviewgrænser.
- Build: ingen implementation, commit, push eller releaseautorisation følger af adoptionen.
