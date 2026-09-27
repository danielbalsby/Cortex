# Cortex Product Architecture Intake Report v1.0

## Document control

| Field | Value |
|---|---|
| Document ID | PAIR-001 |
| Version | 1.0 |
| Status | DRAFT |
| Date | 2026-07-21 |
| Working custodian | Cortex – Product |
| Required owner | TODO — named Product owner and approving body |
| Purpose | Register the architecture foundation Product may use, its actual lifecycle, constraints, freedoms, review triggers and readiness implications. |
| Non-scope | This report does not accept or amend architecture, resolve GI-018, choose technology, claim implementation conformance or authorize release. |
| Decision record | [PDR-003](../decisions/PDR-003-architecture-foundation-intake.md) |

## Intake decision

Product will use the nine directly read architecture sources as follows:

1. Constraints that are direct restatements of higher Governance or Specification requirements remain applicable according to the authority of those upstream sources.
2. Architecture-specific structures and local IDs are working constraints only while their source is non-active.
3. A file with status `Proposed` is treated as non-active and is not an accepted decision, implemented architecture or release basis.
4. Domain Architecture v1.0 currently carries the administrative marking `Non-active working artifact pending GI-018 resolution`. It supplies a qualified working vocabulary and boundaries for DRAFT Product work, but is not a formal LEX or active normative authority.
5. Product will not infer implementation from architecture readiness.

## A. Sources read

All requested sources were readable. The latest Domain Architecture found under the requested repository area was `CORTEX-DOMAIN-ARCHITECTURE-v1.0.md`.

### ASRC-001 — Cortex Software Architecture Baseline v1.0

- **Path:** [`CORTEX-SOFTWARE-ARCHITECTURE-BASELINE-v1.0.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/CORTEX-SOFTWARE-ARCHITECTURE-BASELINE-v1.0.md)
- **Document ID:** TODO, pending GI-013.
- **Version/date:** 1.0 / 2026-07-21.
- **Status:** `Proposed`; non-active under GI-018.
- **Owner:** Responsible author: Chief Software Architect. Governance owner and approving body: TODO.
- **Architecture level:** Architecture baseline / proposed architecture contract.
- **Normative significance:** Below Constitution, Governance Framework and Specification. Its AP/AC constraints are derived, not new norms. It cannot ratify upstream sources.
- **Relation to Product:** Defines system scope, actors, AP-001–012, AC-001–023, quality scenarios, decision domains, risks and review boundaries Product must understand.
- **Relevant constraints:** semantic separation; explicit human authority; unknown remains unknown; proportional attention; provenance/reproducibility; correction; visible degradation; capability contracts before components; controlled learning; organizational/equity responsibility; purpose-limited privacy/security.
- **Relevant risks/issues:** AR-001–019; GI-010–GI-017; all ADRs non-accepted; use-case thresholds and regulatory/QMS inputs missing.
- **Affected Product artifacts:** Product Baseline, Experience Vision, Clinical Workflow Architecture, Information Architecture, requirements, capability briefs and Architecture handoffs.
- **Release basis:** No.
- **Repository state/hash:** Untracked at `HEAD c002b93`; SHA-256 `308ae4d8cbe09bf3a49f344ada154133375c82327eb0da1a75eae55d7f724d13`.

### ASRC-002 — Governance & Traceability Architecture v1.0

- **Path:** [`GOVERNANCE-TRACEABILITY-ARCHITECTURE-v1.0.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/GOVERNANCE-TRACEABILITY-ARCHITECTURE-v1.0.md)
- **Document ID:** TODO, pending GI-013.
- **Version/date:** 1.0 / 2026-07-21.
- **Status:** `Proposed — not active`; GI-018 explicitly unresolved.
- **Owner:** Responsible author: Chief Software Architect. Governance owner/approver: TODO.
- **Architecture level:** Cross-cutting governance, provenance, evidence, traceability and trust architecture.
- **Normative significance:** Derived logical architecture under upstream sources and the proposed Software Architecture Baseline. It cannot fill normative gaps or authorize release.
- **Relation to Product:** Defines the trace chain, provenance envelope, capability identity, evidence categories, trust model, change flow and architecture rules required by Product requirements and acceptance criteria.
- **Relevant constraints:** trace relations must be typed/versioned; no direct norm-to-code jump hiding missing intermediates; AI output is not evidence/fact/decision; human edits preserve before/after and actor; errors/degraded states remain explicit; Product requirements need stable identity and verification relation.
- **Relevant risks/issues:** GI-013/014/018; no accepted registry/storage/enforcement design; no named owners; no accepted ADR-003; implementation/release readiness absent.
- **Affected Product artifacts:** requirements, decision records, issue/assumption registers, workflow specifications, Information Architecture, capability briefs and handoffs.
- **Release basis:** No.
- **Repository state/hash:** Untracked; SHA-256 `fdd1bfa074198545ab3197ccc4516040e5ba0b576a9c0fe1e50a03df8f13b0d5`.

### ASRC-003 — Cortex Domain Architecture v1.0

- **Path:** [`CORTEX-DOMAIN-ARCHITECTURE-v1.0.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/CORTEX-DOMAIN-ARCHITECTURE-v1.0.md)
- **Document ID:** TODO, pending GI-013.
- **Version/date:** 1.0 / 2026-07-21.
- **Status:** Administrative `Non-active working artifact pending GI-018 resolution`; explicitly not `REVIEW`, `RATIFIED` or `ACTIVE`.
- **Owner:** Responsible author: Chief Software Architect. Governance owner/approver: TODO.
- **Architecture level:** Working logical Domain Architecture.
- **Normative significance:** Non-active review-grade working architecture below Governance, Specification, Software Architecture Baseline and Governance & Traceability Architecture. It is explicitly not the formal LEX required by GI-014.
- **Relation to Product:** Supplies shared working definitions, logical bounded contexts, authority boundaries, aggregates, invariants, events, capability mapping and Product/Architecture/clinical boundaries.
- **Relevant constraints:** Product owns workflow purpose, user value, attention protection, capability scope and visible interaction obligations—not clinical truth, evidence truth, regulatory classification, bounded contexts or technical implementation. Terms such as Evidence, Claim, Recommendation, Decision, Human Decision, AI Output and Provenance must not be privately redefined.
- **Relevant risks/issues:** GI-010–GI-018; formal LEX absent; Claim/Assertion, Subject/Patient, Case, Consultation/Encounter, Confidence/Uncertainty, Traceability/Audit, Evidence/Claim and Workflow/Human Decision boundaries need later decisions.
- **Affected Product artifacts:** Information Architecture, Experience Vision, Clinical Workflow Architecture, requirements, capability proposals and Product–Architecture handoffs.
- **Release basis:** No.
- **Repository state/hash:** Untracked; revalidated during canonical Product adoption at SHA-256 `26bec902aa8e19ede9db0edac6f88b434b060247c98de9cc11d4bbe422a39d57`. The earlier local intake hash `1842a9ade182acd9fd0a360ead7e3039eb68e86cc6bd8edc31e052bfb6702941` drifted before adoption; no Product patch modified the Architecture source.

### ASRC-004 — Capability Architecture CA-001 v1.0 — Knowledge Retrieval

- **Path:** [`CA-001-Knowledge-Retrieval-v1.0.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/capabilities/CA-001-Knowledge-Retrieval-v1.0.md)
- **Document ID:** Architecture ID `CA-001`; capability ID `CAP-KNR`.
- **Version/date:** 1.0 / 2026-07-21.
- **Status:** `Proposed`; non-active under GI-018.
- **Owner:** Responsible author: Chief Software Architect. Capability owner/approving body: TODO.
- **Architecture level:** Logical capability architecture / first vertical reference.
- **Normative significance:** Derives CAP-KNR from Specification and upstream constraints; does not define the whole product or authorize implementation.
- **Relation to Product:** Demonstrates how a Product information need becomes a typed, failure-aware, provenance-preserving and verifiable capability contract.
- **Relevant constraints:** CAP-KNR retrieves only from identified policy-allowed sources; ranking is not authority; a retrieved passage is not evidence; no patient identifiers in reference scope; no silent success; coverage, limitations, conflicts and dependency failure remain visible.
- **Relevant risks/issues:** KNR-R-01–14; GI-010–GI-017; source policy/registry, ownership, applicability, privacy/security, performance and accepted CAP-GOV/CAP-AUD/CAP-EVD contracts missing.
- **Affected Product artifacts:** knowledge-retrieval requirements, Information Architecture, evidence/provenance experience, workflow failure states and capability prioritization.
- **Release basis:** No. Complete for architecture review, not ready for clinical production implementation.
- **Repository state/hash:** Untracked; SHA-256 `13110a1a7110faa2e9f0af9d40b1be62b4c26d7e88ff48ad43dc0bc95c16b04f`.

### ASRC-005 — Capability Architecture Template

- **Path:** [`CAPABILITY-ARCHITECTURE-TEMPLATE.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/capabilities/CAPABILITY-ARCHITECTURE-TEMPLATE.md)
- **Document ID/version/status/date/owner:** The template contains placeholders; the template artifact itself has no completed control metadata.
- **Architecture level:** Official working architecture template for CA-002 and later, as designated by ASRC-002.
- **Normative significance:** Mandatory structure within the non-active Governance & Traceability Architecture; not an independent normative source.
- **Relation to Product:** Defines the minimum Product input Architecture will need: purpose, scope/non-scope, actors/use context, acceptance, authority, failure, dependencies and issues.
- **Relevant constraints:** Unknown values remain TODO; capabilities must come from authoritative Specification; no guessed metadata, technical design or hidden authority changes.
- **Relevant risks/issues:** Its mandatory status depends on non-active ASRC-002; formal ID standard, owners, risk classification and governance activation remain open.
- **Affected Product artifacts:** capability briefs and formal Product–Architecture handoffs.
- **Release basis:** No.
- **Repository state/hash:** Untracked; SHA-256 `18e3bf1d851eab475d041ac8a3141a8eb35f20ad119aa9d20fba41f698c02b25`.

### ASRC-006 — ADR-001 — Repository Structure

- **Path:** [`ADR-001-Repository-Structure.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/decisions/ADR-001-Repository-Structure.md)
- **Document ID/version/date:** ADR-001 / version not stated / 2026-07-21.
- **Status:** `Proposed`; Architecture Decisions Index confirms neither accepted nor implemented.
- **Owner:** Decision owner and approving body: TODO.
- **Architecture level:** Non-active architecture decision.
- **Normative significance:** Proposed placement/canonicality decision only. It performs no move and establishes no accepted repository structure.
- **Relation to Product:** Product must avoid competing canonicality, but cannot cite ADR-001 as an accepted placement rule.
- **Relevant constraints/risks:** Inventory, link analysis, governance review, migration and rollback are prerequisites; moving files may break traceability.
- **Affected Product artifacts:** Product artifact hierarchy and eventual repository placement.
- **Release basis:** No.
- **Repository state/hash:** Untracked; SHA-256 `b90b1ef66850d3f241394493b3e4604a26bcfbd40a912ca818d823124484a538`.

### ASRC-007 — ADR-002 — Canonical Governance Sources

- **Path:** [`ADR-002-Canonical-Governance-Sources.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/decisions/ADR-002-Canonical-Governance-Sources.md)
- **Document ID/version/date:** ADR-002 / version not stated / 2026-07-21.
- **Status:** `Proposed`; not accepted or implemented as enforcement.
- **Owner:** Decision owner and approving body: TODO.
- **Architecture level:** Non-active architecture decision.
- **Normative significance:** Proposes resolution through Governance Artifact Register and canonical hashes without changing source status. Canonicality itself is supported by the active engineering register, not by acceptance of this ADR.
- **Relation to Product:** Reinforces repository-first source use, but Product must not claim this ADR’s enforcement is implemented.
- **Relevant constraints/risks:** Upstream activation inconsistency, missing machine-readable registry and ID standard.
- **Affected Product artifacts:** source register, upstream references, requirements and decision records.
- **Release basis:** No.
- **Repository state/hash:** Untracked; SHA-256 `dee135b13d80d2c66bf762b6a644a6154e49fd450649116f0687a1ccc837481b`.

### ASRC-008 — ADR-003 — Traceability Model

- **Path:** [`ADR-003-Traceability-Model.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/decisions/ADR-003-Traceability-Model.md)
- **Document ID/version/date:** ADR-003 / version not stated / 2026-07-21.
- **Status:** `Proposed`; no traceability technology or enforcement selected or implemented.
- **Owner:** Decision owner and approving body: TODO.
- **Architecture level:** Non-active architecture decision.
- **Normative significance:** Proposes a versions-bound relation model; concrete data structure, storage, build integration and visualization remain undecided.
- **Relation to Product:** Product should supply stable requirement identity, upstream rationale and acceptance relations while avoiding a parallel technical traceability system.
- **Relevant constraints/risks:** GI-013/014; missing intermediates; no risk-tier policy/registry owner; direct Constitution-to-code links are forbidden as substitutes for missing layers.
- **Affected Product artifacts:** Product requirements, PDRs, handoffs and acceptance criteria.
- **Release basis:** No.
- **Repository state/hash:** Untracked; SHA-256 `da29f6fe19e4af79424adea51fa27d4a5b3485aa42766abb69d4a6bd422536b0`.

### ASRC-009 — Architecture Decisions Index

- **Path:** [`decisions/README.md`](/Users/danielbalsby/Documents/GitHub/Cortex/docs/architecture/decisions/README.md)
- **Document ID/version/status/date/owner:** Not stated.
- **Architecture level:** Decision index.
- **Normative significance:** Informational index; explicitly says `Proposed` ADRs are neither accepted nor implemented.
- **Relation to Product:** Prevents file-existence from being read as approval or implementation.
- **Relevant constraints/risks:** Index contains only ADR-001–003; no accepted ADR is listed. The file itself is modified in the working tree.
- **Affected Product artifacts:** Any Product artifact referencing an ADR.
- **Release basis:** No.
- **Repository state/hash:** Tracked but modified; SHA-256 `52a7c46b41981533fea96b0461c53e5cd3dc49cea250d6b5a72e2e4d1e01ac44`.

## B. Sources unavailable

None of the requested files was unavailable.

The source set nevertheless contains authority gaps: stable IDs, named owners, approving bodies, accepted ADRs, active Framework status, a formal LEX, regulatory/QMS decisions and repository persistence are missing. Availability does not close those issues.

## C. Binding constraints for Product

“Binding” below means either directly imposed by the upstream Governance/Specification source or a non-active architecture constraint Product must preserve pending review because it restates that upstream obligation. The operational index is [Architecture Constraint Summary for Product](architecture-constraint-summary-for-product.md).

1. Product must preserve semantic separation among source, retrieved passage, evidence, claim, AI output, recommendation, human decision, action and documentation.
2. AI output may be generated automatically but may never be presented as evidence, clinical authority or Human Decision.
3. Human clinical authority requires an identified authorized actor and explicit action; display, silence, default and timeout are not acceptance.
4. Provenance and traceability must survive simplification, transformation and progressive disclosure.
5. Unknown, missing, conflicting, unavailable and degraded are valid, distinct states and may not be rendered as normal success.
6. Product requirements require stable identity, upstream rationale, observable acceptance and a capability/verification relation.
7. Capability contracts and failure states must not be converted into UI assumptions or component/service boundaries.
8. Domain Architecture working terms must be used consistently in DRAFT Product work; competing Product definitions require Architecture review.
9. Attention, interruption, suppression and fallback require protective purpose, risk rationale and balancing measures.
10. Privacy, security, retention, source permissions and regulatory/QMS decisions cannot be filled by Product assumptions.
11. A passing test, a present document or a final human click does not establish clinical validity, acceptance or release readiness.
12. Product may not use CA-001 retrieval ranking as evidence strength, truth, recommendation or a complete product model.

## D. Product freedoms

Within the constraints above, Product remains free to:

- define and validate user problems, jobs and desired outcomes;
- prioritize workflows and capabilities by clinical value, burden, risk, learning and opportunity cost;
- define Experience Vision qualities such as calm, orientation, low cognitive load, accessibility and perceived control;
- decide what information the user needs at each workflow stage and how it is progressively disclosed at a conceptual level;
- define observable Product requirements, acceptance criteria and failure expectations without prescribing technology;
- specify when human authority, provenance, uncertainty and system status must be understandable to the user;
- determine research questions, validation plans and product kill criteria;
- create bounded Product–Architecture handoffs when logical ownership or capability change is required.

Architecture constrains meaning, authority and system obligations; it does not dictate visual style, product priority or validated user need.

## E. Product decisions requiring Architecture review

Architecture review is required before Product finalizes any decision that introduces or changes:

- a capability or capability contract;
- an authoritative domain term or relation;
- a bounded context or aggregate boundary;
- information ownership or a source/evidence/provenance type;
- decision authority or the transition from recommendation to Human Decision/action;
- a trust boundary or external system responsibility;
- capability failure propagation or degraded behavior;
- a cross-cutting quality attribute or use-case SLO;
- assumptions about traceability, audit, verification or runtime evidence;
- an interaction flow whose validity depends on unresolved architecture placement;
- a semantic contract between CAP-KNR, CAP-EVD, CAP-GOV, CAP-AUD or another capability.

The required handoff format is recorded in the [Architecture–Product Interface Register](../registers/architecture-product-interface-register.md).

## F. Current architecture readiness for Product work

| Product area | Readiness | Product interpretation |
|---|---|---|
| Product Baseline | **Integrated as DRAFT** | CPB-001 was established in the canonical repository through PDR-004 and references this intake without relabelling non-active Architecture. |
| Experience Vision | **Ready with caution** | Human authority, provenance, uncertainty, accessibility and failure semantics are sufficiently clear. Consultation Impact Standard and validated users/workflows are missing. |
| Clinical Workflow Architecture | **Partially ready** | Actor, Workflow and Human Decision boundaries exist. First workflow slice, transition rules, risk tier, failure ownership and Consultation Impact remain open. |
| Information Architecture | **Ready to begin in DRAFT** | Domain vocabulary and semantic separations exist in a non-active working artifact. Formal LEX, status authority, retention and information ownership details remain open. |
| Capability prioritization | **Ready at Product-outcome level** | Product may rank problems/capabilities. New capability identity or contract changes require Specification/Governance and Architecture review. CA-001 is reference only. |
| UI design | **Not ready** | Experience principles can proceed, but concrete screens/layout are premature before workflow, information and interaction contracts. Initial Product scope also excludes concrete UI. |
| Prototyping | **Not ready for concrete clinical flows** | Concept testing should wait for Experience Vision and a selected workflow. No prototype may imply resolved authority, safety or data contracts. |
| Implementation handoff | **Not ready** | No ADR is accepted; architecture sources are non-active; CA-001 lacks implementation prerequisites; GI-010–GI-018 and regulatory/QMS gates remain open. |

## G. Open issues

### Governance

- GI-010: Constitution ratification incomplete.
- GI-011: Governance Framework not ACTIVE.
- GI-012: named owners and approvers missing.
- GI-013: stable repository-wide IDs missing.
- GI-014: LEX, PP, DP and canonical registry/intermediates missing.
- GI-015: Specification upstream status inconsistent.
- GI-016: regulatory applicability, classification and QMS boundary unresolved.
- GI-017: existing implementation conformance unassessed.
- GI-018: `Proposed` unmapped to the controlled lifecycle.

### Architecture

- AR-001–AR-019 remain unaccepted risks in the proposed Software Architecture Baseline.
- Domain Architecture §12 issues and §14 decision candidates remain open in the non-active working artifact.
- CA-001 risks KNR-R-01–14 remain unaccepted.
- ADR-001–003 are neither accepted nor implemented.
- All architecture intake artifacts except the modified decision index are untracked relative to `HEAD c002b93`.

### Product

- CPB-001 now exists in the canonical repository; named owner, approval body and higher lifecycle status remain open.
- First target workflow slice remains unselected.
- The measurable Consultation Impact Standard and Roadmap Decision Record method are absent.
- Product does not yet have validated user research, risk classification or approved SLOs.

## H. Recommended Product sequence

1. **Produce Cortex Experience Vision v1.0 in DRAFT**, explicitly addressing the Experience Design Problem: make provenance, uncertainty, status and human authority clear without creating visual or cognitive noise.
2. **Select and research the first general-practice workflow slice**, using upstream value/risk/attention/opportunity-cost criteria.
3. **Produce Clinical Workflow Architecture v1.0 in DRAFT**, with actors, authority, capabilities, sources, trust crossings, failures, recovery, verification and audit needs.
4. **Produce Cortex Information Architecture v1.0 in DRAFT**, using the non-active Domain Architecture terminology and explicitly marking dependencies on formal LEX and Architecture review.
5. **Prioritize capability work and issue bounded handoffs**, using CA-001 and the official template as structural references only.
6. **Defer concrete UI, prototyping and implementation handoff** until the relevant workflow, information, authority and failure contracts have review-ready inputs.

## Product Baseline integration delta

CPB-001 now explicitly separates:

| Classification | Required baseline content |
|---|---|
| Documented by Governance | Human authority, epistemic integrity, proportional attention, contestability, lifecycle responsibility, traceability and Product/Architecture/Build gates—with actual activation qualifications. |
| Documented by Architecture | Non-active AP/AC constraints, non-active domain vocabulary/boundaries, traceability/provenance model and CA-001 capability reference. |
| Decided by Product | Product mandate, scope, prioritization method, Experience Vision, selected workflow and Product acceptance criteria. |
| Product hypotheses | User segments, burden mechanisms, workflow assumptions, experience model and measurable threshold hypotheses. |
| Open dependencies | GI-010–018, AR/DA/KNR risks, formal LEX, owners/IDs, regulatory/QMS, privacy/security, selected workflow, SLOs and accepted ADRs. |

The baseline must not relabel `Proposed` architecture as accepted, active or implemented.

## Acceptance criteria

| Criterion | Result |
|---|---|
| All requested sources and latest Domain Architecture were read directly. | Met |
| Status is separated from file existence and implementation state. | Met |
| Sources unavailable are reported without content assumptions. | Met; none unavailable |
| Product constraints, freedoms and Architecture-review triggers are explicit. | Met |
| Readiness is assessed separately for eight requested Product areas. | Met |
| No Architecture or Governance source was changed. | Met |
| No technology, UI, API, database, cloud or model decision was introduced. | Met |
| CPB-001 integrates the Architecture classification without duplicating this report. | Met through CPB-001 and PDR-004 |

## Readiness statement

Architecture intake is complete as a DRAFT Product evidence artifact. It supports DRAFT Experience, workflow, information and requirement work. It does not authorize architecture acceptance, implementation, production, release, clinical use or regulatory claims.
