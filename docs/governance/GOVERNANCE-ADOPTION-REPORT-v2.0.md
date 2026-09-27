# Governance Adoption Report v2.0

**Status:** Adoption complete; governance activation incomplete

**Owner:** Cortex Build / Chief Software Architect

**Date:** 2026-07-21

**Supersedes:** `docs/governance/GOVERNANCE-IMPORT-REPORT-v1.0.md`

## Adoption result

All five mandated deliverables have been adopted as official engineering artifacts. Each canonical DOCX is byte-identical to its deliverable source, and its SHA-256 identity is recorded in `GOVERNANCE-ARTIFACT-REGISTER.md`.

Adoption establishes availability and canonicality. It does not alter the document's internal status or convert a draft, conditional recommendation or provisional framework into a ratified active policy.

## Adopted artifacts

| Deliverable | Canonical repository path | Adopted role | Content verification |
|---|---|---|---|
| `Cortex filosofi - hovedredigeret med ændringer.docx` | `docs/governance/canonical/Cortex-Philosophy.docx` | Authoritative interpretive foundation | Byte-identical; SHA-256 registered |
| `Ratificeringsbetænkning - Cortex Constitution.docx` | `docs/governance/canonical/Cortex-Constitution-Ratification-Report.docx` | Authoritative Constitution source package and ratification record | Byte-identical; SHA-256 registered |
| `Cortex Governance Framework v1.0.docx` | `docs/governance/canonical/Cortex-Governance-Framework-v1.0.docx` | Authoritative governance framework | Byte-identical; SHA-256 registered |
| `Stress test - Cortex Governance Framework v1.0.docx` | `docs/governance/assurance/Cortex-Governance-Framework-Stress-Test-v1.0.docx` | Authoritative independent governance assurance | Byte-identical; SHA-256 registered |
| `Cortex Specification v1.0.docx` | `docs/specifications/Cortex-Specification-v1.0.docx` | Authoritative system specification | Byte-identical; SHA-256 registered |

## Deliverables → Repository → Governance Hierarchy crosswalk

| Source deliverable | Canonical path | Hierarchy position | Authority and dependency |
|---|---|---|---|
| Cortex Philosophy | `docs/governance/canonical/Cortex-Philosophy.docx` | Interpretive source before Constitution | Informs the Constitution; the commission report explicitly prevents it from competing with the Constitution |
| Constitution ratification report | `docs/governance/canonical/Cortex-Constitution-Ratification-Report.docx` | Highest proposed normative layer | Evaluates Philosophy and contains proposed Cortex Constitution v1.0; ratification remains conditional in the source |
| Governance Framework v1.0 | `docs/governance/canonical/Cortex-Governance-Framework-v1.0.docx` | Governance layer | Subordinate to Constitution; controls policies, design, architecture, requirements, release and learning when ratified |
| Governance Framework Stress Test | `docs/governance/assurance/Cortex-Governance-Framework-Stress-Test-v1.0.docx` | Independent assurance beside Governance | Reviews Framework v1.0 and defines unresolved P0 activation gates |
| Specification v1.0 | `docs/specifications/Cortex-Specification-v1.0.docx` | Specification layer | Subordinate to governance; constrains Software Architecture and provides requirement and acceptance-test IDs |

Downstream repository mapping:

| Logical layer | Repository location | Status after adoption |
|---|---|---|
| `/docs` | `docs/` | Documentation root; not itself normative |
| `/governance` | `docs/governance/canonical/`, `docs/governance/assurance/` | Canonical normative and assurance artifacts established |
| `/specifications` | `docs/specifications/` | Canonical system specification established |
| `/architecture` | `docs/architecture/` | Existing pre-adoption architecture; conformance not yet established |
| `/adr` | `docs/architecture/decisions/` | ADR namespace exists but lacks the new governance trace chain |
| `/testing` | Executable tests plus `docs/governance/TESTING-STRATEGY.md` | Existing verification assets; no governance-compliant evidence registry yet |
| `/implementation` | `app/`, `components/`, `clinical/`, `engine/`, `encounter/` and supporting source | Existing pre-adoption implementation; conformance audit outstanding |

## Canonicality and duplicates

There is one canonical engineering copy per adopted artifact. External deliverables remain the authoritative source for import verification, not a second repository copy.

QA PDFs, work-in-progress DOCX files, editorial reports and semantically related repository documents were registered as non-canonical variants or predecessors in the artifact register. None was deleted, moved or rewritten.

Existing repository claims are now subordinate as follows:

- `docs/vision/*` remains product/experience context but is not a substitute for the adopted Philosophy, Constitution or Specification.
- `docs/governance/ENGINEERING-CONSTITUTION.md` remains an engineering policy subordinate to the adopted Constitution and Governance Framework.
- `docs/governance/DEVELOPMENT-WORKFLOW.md`, `REVIEW-PROCESS.md` and `TESTING-STRATEGY.md` remain implementation-era policies subject to conformance review.
- Existing architecture, pathway and code artifacts retain their historical function but have not yet demonstrated compliance with the adopted Specification.

## Metadata result

Known title, version, internal status, source dependency, source location, canonical path and hash values are recorded where the documents support them. Unknown fields remain TODO.

Material TODOs include:

- stable document IDs for all five artifacts;
- Philosophy version, status, owner and ratification status;
- final Constitution ratification decision, owner and exact effective date;
- Governance Framework owner, ratification decision and effective date;
- Stress Test document version, owner and ratification status;
- Specification owner, ratification authority, decision record and effective date; and
- supersession metadata for every artifact.

## Governance Issues closed from Build Baseline v1.0

- **GI-001 closed:** all five authoritative sources are available and canonical copies exist.
- **GI-003 closed:** content establishes Philosophy as interpretive foundation and Stress Test as independent Framework assurance.
- **GI-006 closed:** Stress Test purpose, reviewed target, findings and activation recommendations are explicit.
- **GI-007 closed:** the Governance Framework provides roles, RACI and decision-right structures, although named role holders remain absent.
- **GI-008 closed for canonicality:** this report and artifact register establish the new sources' precedence over semantically overlapping repository material.

GI-002, GI-004, GI-005 and GI-009 were not availability-only issues and remain unresolved or are superseded by the content-derived issues below.

## New or continuing content-derived Governance Issues

### GI-010 — Constitution ratification is incomplete

The adopted Constitution artifact is a commission report containing “proposed ratified text”. It recommends ratification conditionally on interdisciplinary hearing and supporting Position Papers, ADRs and audit procedures.

**Consequence:** The highest normative layer is available but not evidenced as finally ratified.

**Required governance action:** Record the final ratification decision, article-level vote, owner, effective date and satisfied prerequisites—or retain an explicit draft status.

### GI-011 — Governance Framework is not ACTIVE

The Framework states `Foundational · Valid from ratification`. The authoritative Stress Test says to retain it as `FOUNDATIONAL DRAFT`, recommends only `PROVISIONAL v1.0`, and requires five P0 changes, two end-to-end pilots and an independent outcome audit before `ACTIVE`.

**Consequence:** Build can inspect and design against the framework, but cannot claim full active-governance conformance.

**Required governance action:** Resolve the five P0 items and record the authorised provisional operating scope or final activation decision.

### GI-012 — Required owners and control metadata are missing

The Framework requires a responsible person and approving body for controlled artifacts. The adopted files do not consistently name owners, approval bodies, effective dates, stable IDs or supersession records.

**Consequence:** Escalation, approval and change authority cannot be executed reliably.

**Required governance action:** Appoint the Governance Secretariat and publish the controlled metadata register.

### GI-013 — Document-level traceability identities are incomplete

Specification requirement IDs and acceptance IDs exist, but no approved document ID is present for Philosophy, Constitution, Framework, Stress Test or Specification. The Framework's type taxonomy does not clearly assign codes to Philosophy, Stress Test or the system Specification.

**Consequence:** Stable cross-document references cannot yet satisfy the Framework's own identity protocol.

**Required governance action:** Approve document type codes and stable IDs without changing normative bodies.

### GI-014 — Mandatory intermediate governance artifacts and registry are absent

The Framework and Specification require LEX, Position Papers, Design Principles, Safety Cases, Evaluation Protocols, Release Dossiers and a bidirectional registry. The Specification explicitly forbids silently jumping from abstract norms to implementation where required intermediates are missing.

**Consequence:** Requirement-level allocation to architecture cannot yet form a compliant trace chain.

**Required governance action:** Establish the minimum registry and approve the intermediate artifacts needed for the architecture scope.

### GI-015 — Specification upstream status is internally inconsistent

Specification v1.0 marks itself `RATIFIED BASELINE` and lists a “ratified stress-test” in its source set. The adopted Stress Test does not record itself as ratified and keeps the Framework at foundational/provisional status; the Constitution report also records conditional rather than completed ratification.

**Consequence:** The Specification's authority is identifiable, but its claimed upstream ratification chain cannot be reproduced.

**Required governance action:** Issue a governance decision confirming whether the Specification remains ratified under provisional upstream sources or update the source-status record through the controlled change process.

### GI-016 — Regulatory and QMS boundary is unresolved

The Stress Test requires a Regulatory Applicability & Classification Gate and a separate controlled QMS mapping for MDR/AI Act obligations. It explicitly states that governance is not a compliance system.

**Consequence:** Architecture cannot finalise intended-purpose, regulatory, safety, logging, retention or release controls.

**Required governance action:** Establish the applicability gate, QMS owner and product/use-case classification before approving architecture.

### GI-017 — Existing implementation conformance remains unassessed

The current code, tests and architecture predate adoption and lack the required bidirectional chain from the adopted Specification.

**Consequence:** Existing functionality cannot be grandfathered as compliant.

**Required governance action:** Perform requirement-, prohibition- and acceptance-test allocation before reuse approval.

## Architecture Readiness

Build Baseline v1.1 records the rerun in detail.

| Area | Score |
|---|---:|
| Governance Readiness | 2/5 |
| Specification Readiness | 3/5 |
| Traceability Readiness | 2/5 |
| Architectural Readiness | 3/5 |
| Verification Readiness | 2/5 |
| **Total** | **12/25 — Not ready** |

## Decision

The five normative documents are now identifiable as official engineering artifacts.

**Cortex Build is not yet cleared to begin an approval-bound Software Architecture programme.** The system boundary, capabilities, requirements and expected architecture deliverables are sufficiently defined for analysis, but the Constitution/Framework activation state, traceability intermediates, ownership and regulatory/QMS gates remain release-blocking governance conditions.

Build may prepare non-binding architecture inventories and conformance analysis. It may not approve an Architecture Baseline or claim normative compliance until the blocking Governance Issues are resolved or explicitly scoped by the competent governance authority.
