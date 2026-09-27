# PDR-003 — Architecture Foundation Intake

## Document control

| Field | Value |
|---|---|
| Document ID | PDR-003 |
| Version | 1.0 |
| Status | DRAFT |
| Date | 2026-07-21 |
| Decision owner | TODO — named Product owner |
| Required reviewers | Cortex – Architecture; Governance where upstream authority is disputed |

## Decision

Product will register and use the nine directly read Architecture foundation sources according to their actual documented lifecycle and authority:

1. `Proposed` Architecture sources and ADRs are non-active and are not treated as accepted, implemented or release-authorizing.
2. Domain Architecture v1.0, currently marked `Non-active working artifact pending GI-018 resolution`, is used as a qualified shared working vocabulary and boundary model for DRAFT Product work; it is not the formal LEX or active normative authority.
3. Architecture constraints that restate higher Governance or Specification obligations remain applicable through those upstream sources, subject to their separately documented lifecycle limitations.
4. Architecture-specific structures remain DRAFT working constraints and review triggers until accepted by a competent authority.
5. Product will maintain PAIR-001, PAC-001 and PREG-API-001 as the explicit evidence, constraint and coordination artifacts for this intake.
6. CPB-001 is established in the canonical repository through PDR-004 and incorporates the PAIR-001 integration delta without treating conversation memory as authority.

## Reasoning

File existence is not approval. The Architecture Decisions Index explicitly states that a `Proposed` ADR is neither accepted nor implemented, and the Architecture sources themselves identify GI-018 and other activation gaps. Treating them as already binding Architecture would erase the distinction among design proposal, accepted decision, implementation and release readiness.

At the same time, ignoring the sources would lose important semantic, authority, failure, provenance and traceability protections that derive from higher sources and are necessary for safe Product work. Qualified DRAFT use preserves those constraints without overstating authority.

## Alternatives considered

| Alternative | Disposition | Reason |
|---|---|---|
| Treat every repository Architecture file as binding and accepted. | Rejected | Contradicts the files’ lifecycle status and the ADR index. |
| Ignore all non-active Architecture until ratification. | Rejected | Would allow Product to create avoidable semantic and authority conflicts and lose useful review-grade constraints. |
| Rebuild the missing Product Baseline from conversation history. | Rejected | Conversation memory is not an authoritative persistent Product source. |
| Use qualified DRAFT integration with explicit blockers and review triggers. | Selected | Preserves evidence, enables bounded progress and avoids false conformance claims. |

## Consequences

- Experience Vision, workflow and Information Architecture may proceed as DRAFT work within PAC-001.
- Concrete UI, clinical prototyping and implementation handoff remain not ready.
- New or changed capability/domain/authority decisions require an explicit PREG-API-001 handoff.
- Product artifacts must distinguish documented constraints, Product decisions, hypotheses and open dependencies.
- Product cannot claim active Architecture conformance, accepted ADR coverage, implementation readiness or release readiness.

## Risks and reversibility

The principal risk is that working terminology or constraints change during Architecture review. This is mitigated by marking status, isolating assumptions and maintaining interface records. The decision is reversible: accepted Architecture may replace a working constraint through a new PDR and linked Architecture decision; historical records remain preserved.

## Open questions

- Who owns and approves each Architecture source and Product interface decision?
- How will `Proposed` map into the controlled lifecycle under GI-018?
- When will a formal LEX, stable ID policy and canonical registry exist?
- Which first clinical workflow and capability should Product prioritize?
- What regulatory/QMS, privacy/security and use-case SLO decisions constrain that workflow?
- Which competent owner and body will review and approve CPB-001?

## Relations

- Governance: authority hierarchy and GI-010–GI-018 recorded in Product source intake.
- Product: [PAIR-001](../architecture/cortex-product-architecture-intake-report-v1.0.md), [PAC-001](../architecture/architecture-constraint-summary-for-product.md), [PREG-API-001](../registers/architecture-product-interface-register.md), Product Decision Register and Product Issue Register.
- Architecture: Software Architecture Baseline, Governance & Traceability Architecture, Domain Architecture, CA-001, Capability Architecture Template and ADR-001–003.
- Build: no implementation instruction; future handoffs require accepted Architecture and verification evidence.
