# Cortex Build Baseline v1.1

**Status:** Governance artifacts adopted; Architecture Readiness not achieved

**Owner:** Cortex Build / Chief Software Architect

**Assessment date:** 2026-07-21

**Repository baseline:** `c002b93` plus uncommitted governance adoption artifacts

**Supersedes:** `docs/architecture/CORTEX-BUILD-BASELINE-v1.0.md`

## Executive decision

The five mandated governance deliverables are now available as byte-identical canonical repository artifacts. Availability, source identity and hierarchy placement are established in `docs/governance/GOVERNANCE-ARTIFACT-REGISTER.md`.

The content review resolves the previous access blocker but reveals substantive readiness blockers:

- the Constitution text is proposed and conditionally recommended, not evidenced as finally ratified;
- Governance Framework v1.0 is Foundational and is kept at FOUNDATIONAL DRAFT/PROVISIONAL status by its Stress Test;
- required owners, stable document IDs and controlled registry infrastructure are missing;
- mandatory Position Papers, LEX, Design Principles and other traceability intermediates are not established;
- Specification v1.0 claims RATIFIED BASELINE status while its own stated upstream source statuses cannot be reproduced; and
- the regulatory applicability and QMS boundary remains unresolved.

Build therefore has enough information to understand the intended system and enumerate the required Software Architecture deliverables, but not enough governance activation to approve or claim compliance for an Architecture Baseline.

## 1. Authoritative document inventory

| Artifact | Canonical path | Source status | Authority |
|---|---|---|---|
| Cortex Philosophy | `docs/governance/canonical/Cortex-Philosophy.docx` | Status/version TODO | Authoritative interpretive foundation |
| Cortex Constitution ratification report | `docs/governance/canonical/Cortex-Constitution-Ratification-Report.docx` | Proposed v1.0 text; conditional ratification recommendation | Proposed highest normative authority and authoritative ratification record |
| Cortex Governance Framework v1.0 | `docs/governance/canonical/Cortex-Governance-Framework-v1.0.docx` | Foundational; provisional pending Stress Test gates | Authoritative governance framework |
| Governance Framework Stress Test | `docs/governance/assurance/Cortex-Governance-Framework-Stress-Test-v1.0.docx` | Independent review; recommends PROVISIONAL v1.0 | Authoritative assurance and activation gate |
| Cortex Specification v1.0 | `docs/specifications/Cortex-Specification-v1.0.docx` | RATIFIED BASELINE; ratifying record TODO | Authoritative system specification |

## 2. Hierarchy and precedence

```text
Philosophy (interpretive foundation)
        ↓
Constitution (highest normative authority when ratified)
        ↓
Governance Framework
        ↓
Position Papers / LEX / Design Principles / safety policy
        ↓
Cortex Specification and Product Requirements
        ↓
Software Architecture / ADR / Safety Case / Evaluation Protocol
        ↓
Implementation
        ↓
Verification / Release Dossier
        ↓
Monitoring / Incident & Learning Records / controlled revision
```

The Stress Test sits beside the Governance Framework as independent assurance and constrains its activation status. Lower layers may refine but may not overrule higher layers. A conflict makes the lower artifact CONTESTED and prevents its use as release basis until resolved by the competent higher-level owner.

## 3. Traceability baseline

The adopted documents define a complete conceptual traceability chain and the Specification provides stable capability, system, domain, information, non-functional, prohibition, traceability and acceptance-test identifiers.

The operational trace remains incomplete because:

- document-level IDs are absent;
- the canonical machine-readable registry is absent;
- required Position Papers, LEX and Design Principles are absent;
- existing ADRs, code and tests are not allocated against Specification v1.0; and
- no Release Dossier or runtime evidence chain exists for the adopted baseline.

No direct Constitution-to-code link may be used to hide missing mandatory intermediate artifacts.

## 4. Architecture mandate

Specification v1.0 explicitly permits the software architect to choose components, services, events, databases, models and APIs within the Specification.

Build may define, once the relevant governance gate is open:

- System Context and Trust Boundaries;
- domain schema, state semantics, provenance and authority rules;
- capability-to-component allocation;
- API and event contracts;
- data lifecycle architecture;
- threat, privacy, hazard and degraded-mode architecture;
- UX state model;
- traceability graph;
- regulatory/QMS crosswalk; and
- end-to-end acceptance architecture.

Build may not self-ratify upstream sources, invent missing intermediate norms, accept residual clinical risk, determine regulatory classification without the required gate or declare existing implementation compliant without evidence.

## 5. Governance Issue disposition

### Closed availability issues

- GI-001: source availability and canonical copies.
- GI-003: Philosophy and Stress Test hierarchy roles.
- GI-006: Stress Test purpose and acceptance role.
- GI-007: abstract decision-right model.
- GI-008: canonical precedence over overlapping repository material.

### Replaced or continuing issues

- GI-002 → GI-012: owners and controlled metadata remain incomplete.
- GI-004 → GI-013: document-level stable IDs remain incomplete.
- GI-005 → GI-014: required intermediate traceability artifacts and registry remain absent.
- GI-009 → GI-017: existing implementation conformance remains unassessed.

### New content-derived issues

- GI-010: Constitution ratification incomplete.
- GI-011: Governance Framework not ACTIVE.
- GI-015: Specification upstream status inconsistency.
- GI-016: Regulatory Applicability, classification and QMS boundary unresolved.

Issue definitions and required governance actions are recorded in `docs/governance/GOVERNANCE-ADOPTION-REPORT-v2.0.md`.

## 6. Architecture clarity

The adopted Specification provides sufficient functional, domain, information, decision, interaction, safety, operational and acceptance detail to scope Software Architecture.

However, the governance chain is not activation-complete. Build may analyse and prepare inventories, but the formal Architecture programme remains gated because architecture decisions would otherwise depend on a proposed Constitution, provisional Framework, missing intermediate normative artifacts and unresolved regulatory classification.

## 7. Architecture Readiness Review

### Scoring scale

| Score | Meaning |
|---:|---|
| 0 | Required source or capability unavailable |
| 1 | Intent declared without substantive evidence |
| 2 | Substantive material exists but authority or operational controls are incomplete |
| 3 | Sufficient to proceed with explicitly managed non-critical gaps |
| 4 | Ready, controlled and traceable |
| 5 | Ratified, complete and independently evidenced in operation |

Every area must score at least 3, and no source-authority or mandatory-gate blocker may remain, before Architecture Readiness is granted.

| Area | Score | Assessment |
|---|---:|---|
| Governance Readiness | 2/5 | Complete artifacts exist, but Constitution ratification and Framework activation are incomplete |
| Specification Readiness | 3/5 | Detailed RATIFIED BASELINE with IDs and acceptance catalogue, but upstream status and ratifying record are unresolved |
| Traceability Readiness | 2/5 | Conceptual model and requirement IDs exist; document IDs, intermediates, registry and implementation allocation do not |
| Architectural Readiness | 3/5 | System boundary, capability contracts and required architecture outputs are explicit; governance gates block approval-bound work |
| Verification Readiness | 2/5 | Stress Test and acceptance catalogue exist; P0 changes, pilots, QMS mapping and operational evidence are outstanding |
| **Total** | **12/25** | **Not ready** |

### Official decision

**Architecture Readiness Review: Changes required. Cortex Build is not cleared to begin approval-bound Software Architecture.**

Availability is resolved. The remaining blockers arise from the documents' actual status and requirements, not from missing access.

## 8. Readiness roadmap

Before the next review, Governance must:

1. record the final Constitution ratification state and owner;
2. define the authorised provisional scope for Framework v1.0 or complete its five P0 changes and activation process;
3. establish the canonical registry, stable document IDs and named owners;
4. resolve the Specification's upstream status inconsistency;
5. provide the minimum required Position Papers, LEX and Design Principles for the first architecture scope;
6. establish Regulatory Applicability & Classification and QMS ownership; and
7. authorise the conformance audit of existing architecture and implementation.

After those gates are met, Build can start the architecture document set explicitly required by Specification section 30 rather than inventing a parallel roadmap.
