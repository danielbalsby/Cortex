# Architecture Constraint Summary for Product

## Document control

| Field | Value |
|---|---|
| Document ID | PAC-001 |
| Version | 1.0 |
| Status | DRAFT |
| Date | 2026-07-21 |
| Working custodian | Cortex – Product |
| Purpose | Give Product a concise operational view of architecture-derived constraints, freedoms, review triggers and maturity. |
| Non-scope | This summary does not activate Architecture, accept an ADR, define UI or technology, or authorize implementation or release. |
| Intake basis | [Cortex Product Architecture Intake Report v1.0](cortex-product-architecture-intake-report-v1.0.md) |

## Authority qualification

All architecture sources read for this intake are `Proposed`, `REVIEW`, informational, or an uncompleted template. No ADR is accepted. Accordingly:

- a constraint that restates Governance or Specification is applicable through that upstream authority, subject to its documented lifecycle qualifications;
- architecture-specific structures are working constraints for DRAFT Product work and require Architecture review;
- no item below is evidence of accepted implementation, production readiness or release authority.

## Operational constraints

| ID | Constraint for Product | Architecture source | Product effect | Review trigger |
|---|---|---|---|---|
| PAC-001 | Keep source, retrieved passage, evidence, claim, AI output, recommendation, Human Decision, action and documentation semantically distinct. | SAB AP-002/AC-004; GTA-XC-002/010; Domain Architecture §§2–3 | Information Architecture and requirements must name the actual information type and state. | A new term, relation, conversion or presentation could blur categories. |
| PAC-002 | AI output is never evidence, clinical authority or a Human Decision. Human authority requires an identified authorized actor and explicit action. | SAB AP-003/AC-001–002; GTA trust model; Domain Architecture §§3.8–3.9/10 | Experience and workflows must preserve visible human authority without using silence, display, default or timeout as acceptance. | A workflow creates, records or appears to infer a clinical decision. |
| PAC-003 | Provenance and traceability must survive transformation, summarization and progressive disclosure. | SAB AP-006; GTA §§1–3, 6 | Product requirements need stable identity, upstream rationale, observable acceptance and provenance expectations. | Information is condensed, ranked, combined, edited or handed across capabilities. |
| PAC-004 | Unknown, missing, conflicting, unavailable and degraded are distinct valid states; none may appear as normal success. | SAB AP-004/AP-008/AC-009; GTA-XC-001/006; CA-001 §2.6 | Workflows and requirements must include failure recognition, user meaning, recovery and escalation. | A dependency, source or capability can fail or provide incomplete/conflicting results. |
| PAC-005 | Product must supply traceable intermediates and may not jump directly from a high-level norm to implementation. | GTA §1; ADR-003 (`Proposed`) | Product requirements and decision records must link rationale, acceptance and intended verification without inventing a technical registry. | An item is prepared for Architecture or Build handoff. |
| PAC-006 | Capability purpose, authority, inputs/outputs, failure modes and acceptance precede components, services and UI assumptions. | SAB AP-009; GTA §8; Capability Architecture Template | Product defines the user problem and outcome; Architecture owns the logical capability contract. | A new capability is proposed or an existing capability’s contract changes. |
| PAC-007 | Use the non-active Domain Architecture vocabulary consistently; Product may not privately redefine authoritative terms or bounded contexts. | Domain Architecture §§2–5 | Experience, IA and workflows may use the vocabulary as a marked working model. | A new domain term, ownership boundary, aggregate or bounded context is needed. |
| PAC-008 | Attention, interruption, suppression and fallback require protective purpose, risk rationale and balancing measures. | SAB AP-005, AR-018; Domain Architecture §§3.6–3.7/12.2 | Experience and workflow requirements must state why attention is requested or protected and how harm is avoided. | A design interrupts, hides, defaults, prioritizes or defers clinical information. |
| PAC-009 | Privacy, security, source permission, retention and purpose limitation cannot be filled by Product assumptions. | SAB AC-013; GTA-XC-012; CA-001 source-policy boundary | Product records data/use hypotheses and blockers; competent owners decide controls. | A workflow introduces identifiable data, a new source, sharing, retention or secondary use. |
| PAC-010 | Retrieval ranking is not authority, truth, evidence strength or recommendation; a retrieved passage is not evidence by itself. | CA-001 CAP-KNR constraints; Domain Architecture Evidence/Claim definitions | Knowledge-retrieval experiences must disclose source, coverage, limitations and conflict without overstating meaning. | Product specifies retrieval, ranking, evidence use or user reliance. |
| PAC-011 | Learning and correction must be controlled, attributable and reversible; use does not silently change authority or clinical truth. | SAB AP-007/AP-010; GTA change flow | Product requirements must distinguish feedback, correction, approval and governed change. | Feedback, personalization or model/system learning is introduced. |
| PAC-012 | Accessibility, equity and organizational impact are system obligations, not optional polish. | SAB AP-011 and relevant quality scenarios; Domain Architecture context constraints | Research, acceptance criteria and prioritization must consider varied users, settings and failure burden. | A workflow or requirement changes who can use Cortex or how work is distributed. |

## Product freedoms within the constraints

Product may define and validate user needs, clinical workflow goals, desired outcomes, prioritization, conceptual progressive disclosure, research plans, measurable Product acceptance criteria and the Experience Vision. Product may also decide that a capability or feature should not proceed.

These freedoms do not include redefining domain meaning, clinical authority, evidence truth, regulatory classification, trust boundaries, data ownership, technical traceability or implementation architecture.

## Architecture-review triggers

Architecture review is required when Product proposes a change to any of the following:

- capability identity, purpose, contract or failure propagation;
- domain term, relation, bounded context or aggregate;
- information ownership, provenance type, evidence type or source boundary;
- human/AI authority or decision-state transition;
- external-system or organizational trust boundary;
- cross-cutting quality requirement or use-case SLO;
- traceability, audit, verification or runtime-evidence obligation;
- a Product flow whose validity relies on unresolved architecture placement.

The handoff must be recorded in the [Architecture–Product Interface Register](../registers/architecture-product-interface-register.md).

## Architecture maturity relevant to Product

| Area | Current maturity | Product use now |
|---|---|---|
| Software Architecture Baseline | `Proposed`; non-active | Constraint discovery and review framing only. |
| Governance & Traceability Architecture | `Proposed — not active` | DRAFT requirement and provenance discipline; not implementation conformance. |
| Domain Architecture | Administrative `Non-active working artifact pending GI-018 resolution`; not formal LEX | Shared working vocabulary for DRAFT IA/workflow work, with explicit qualification. |
| CA-001 Knowledge Retrieval | `Proposed`; review-complete logical reference | Shape Product questions and failure expectations; not a complete product or production contract. |
| Capability template | Working template with incomplete control metadata | Structure future Product-to-Architecture handoffs; do not infer mandatory active status. |
| ADR-001–003 | `Proposed`; neither accepted nor implemented | Identify unresolved decisions; do not cite as settled Architecture. |

## Blocking conditions

Implementation handoff remains blocked by non-active architecture, no accepted ADRs, missing owners and stable IDs, missing formal LEX, unresolved regulatory/QMS and privacy/security decisions, absent accepted SLOs, and the unresolved first workflow slice.

## Experience Design Problem

Product must make provenance, uncertainty, system status and explicit human authority understandable at the moment they matter, while preserving Cortex’s goal of calm, low cognitive load and few actions. Progressive disclosure may reduce visual burden, but it may not hide meaning, limitations, failure or authority.
