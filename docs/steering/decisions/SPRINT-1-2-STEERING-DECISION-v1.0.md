# Sprint 1.2 Steering Decision v1.0

## Document control

| Field | Value |
|---|---|
| Document ID | SPRINT-1-2-STEERING-DECISION-001 |
| Document type | Steering governance decision record |
| Version | 1.0 |
| Decision status | **APPROVED FOR LEARNING PHASE** |
| Decision date | 2026-07-22 |
| Effective date | 2026-07-22 |
| Decision owner | Cortex — Steering |
| Named approver / approving body | **OPEN — not identified in the available decision basis** |
| Administrative recorder | Cortex — Product; records the decision and its traceability without assuming Steering authority |
| Scope | Sprint 1.2 learning phase and the gate to Architecture light review |
| Supersedes | None |
| Build authorization | **None** |
| Clinical or regulatory approval | **None** |

## 1. Decision summary

Steering approves Sprint 1.2 as a controlled learning sprint.

> Sprint 1.2 may investigate whether Cortex can develop from a structured clinical form into a clinical workspace with lower cognitive load.

This approval:

- authorizes the learning direction and bounded evaluation scope defined below;
- accepts the Sprint 1.2 Product Learning Contract (PDR-009) as the governing Product learning basis;
- permits Product to prepare versioned comparison concepts and evaluation material within that contract;
- establishes an Architecture light review as the next cross-functional gate; and
- establishes an AI-agent evaluation gate after any subsequently authorized and implemented Sprint 1.2 prototype.

This approval does **not** approve a final Product solution, active Architecture, implementation, Build start, clinical evaluation, clinical release, or regulatory claim.

## 2. Upstream references and authority

| Reference | Role in this decision | Lifecycle effect |
|---|---|---|
| [Sprint 1.1 Founder Evaluation P02 v1.0](../../research/SPRINT-1.1-FOUNDER-EVALUATION-P02-v1.0.md) | Internal formative evidence and source of P02 findings | Does not constitute user research, clinical validation, clinical readiness, or Build authorization |
| [Sprint 1.2 Product Learning Contract v1.0 — PDR-009](../../product/research/SPRINT-1-2-PRODUCT-LEARNING-CONTRACT-v1.0.md) | Product decision basis, learning questions, guardrails, measures, and stop rules | Remains a Product learning contract; this record authorizes its bounded learning phase |
| [Sprint 1.1 Product Learning Contract v1.0 — PDR-008](../../product/research/SPRINT-1-1-PRODUCT-LEARNING-CONTRACT-v1.0.md) | Predecessor learning contract and continuity reference | Historical upstream for the P01-to-P02 learning cycle |
| [Product Research Index](../../product/research/README.md) | Index of Product learning artifacts and evidence relationships | Index only; no independent normative authority |
| [Sprint 1 Product Change Request v1.0 — PDR-007](../../product/SPRINT-1-PRODUCT-CHANGE-REQUEST-v1.0.md) | Product objective, boundaries, and prior prioritization | Continues to constrain the learning direction |
| [Cortex Experience Vision v1.0](../../product/experience/CORTEX-EXPERIENCE-VISION-v1.0.md) | Experience principles and evaluation lens | Continues to constrain experience hypotheses |
| [API-016](../../product/registers/architecture-product-interface-register.md) | Product–Architecture interface for the next light review | Identified interface; no Architecture acceptance or decision is implied here |

The Cortex governance hierarchy and all active normative sources remain controlling. No upstream lifecycle status is elevated by this record.

## 3. Purpose of Sprint 1.2

Sprint 1.2 shall reduce the uncertainty exposed by P02: greater clinical depth improved the prototype, but also increased length, scrolling, and mental navigation. The learning phase shall determine whether Cortex can preserve clinical completeness, explicit uncertainty, human decision authority, and traceability while reducing workspace burden.

The sprint is therefore concerned with the organization and behavior of a clinical workspace—not with adding more fields, selecting a final layout, or authorizing a production solution.

## 4. Approved learning scope

| Learning area | Approved investigation | Boundary |
|---|---|---|
| Information architecture experiments | Compare clinically coherent ways of organizing the consultation workspace | No navigation or final IA is selected by this decision |
| One-page workspace | Treat one-page as a testable hypothesis | It is not a requirement, preferred solution, or Architecture constraint |
| Alternative IA comparison | Compare one-page with at least one materially different IA | Comparators must preserve equivalent task and content coverage |
| Clinical selectivity | Explore adaptive presentation that reveals relevant depth without hiding required context | Adaptation must not decide, diagnose, or silently remove uncertainty |
| Uncertainty semantics | Test understandable treatment of blank, not relevant, not asked, not performed, and not assessable states | Product may test comprehension; final clinical semantics require Clinical Safety/Governance input and may require Architecture decisions |
| Finding model | Test cardinality, discoverability, correction, and continuity for simultaneous findings | Product must not redefine domain ownership or final LEX terms |
| Cortex Overview and next work | Test whether salience and one clear next action improve orientation | Must preserve attribution, uncertainty, and explicit human authority |
| Keyboard flow, accessibility, and recovery | Test continuity, focus behavior, safe recovery, and correction | No concrete control set or component library is approved |
| Documentation consequences | Observe downstream effects on journal and communication quality | This is not authorization to define new clinical documentation rules |

### 4.1 Existing behavior that is not a new requirement

- Function ability levels already present in the evaluated baseline shall not be restated as a new Product requirement.
- Palpation and provocation are already multi-select in repository baseline `01eb5dbf63a791b1e93913d8fb07ff8bf8148814`; the remaining question concerns residual cardinality and discoverability.
- “Remove not assessed” is not an approved direction. Hiding an unassessed state can suppress uncertainty and create false reassurance.
- One-page, Doctio-inspired organization, denser layout, and more narrative input remain hypotheses—not accepted solutions.

## 5. Guardrails and constraints

Sprint 1.2 must:

- preserve the Experience Vision principles, including calm before clever, context before controls, one clear next action, progressive disclosure, visible uncertainty, and explicit human authority;
- keep registered information, clinician assessment, and Cortex-generated or suggested material distinguishable;
- keep missing, unknown, unasked, unperformed, not applicable, and not assessable information from being silently collapsed where that distinction affects meaning or safety;
- present Cortex as decision support and documentation support, never as the decision-maker; and
- preserve traceability and correction paths for material states and outputs.

Sprint 1.2 may not:

- build or integrate a real AI model;
- integrate with an EHR or other production clinical system;
- automate diagnosis, treatment, referral, follow-up, or any other clinical decision;
- replace or obscure the clinician’s decision authority;
- make regulatory, clinical-performance, or safety claims;
- use real patient data;
- define new clinical rules, final LEX definitions, or domain ownership;
- introduce clinical-attention, diagnostic, or plan suggestions without the required Clinical Safety/Governance involvement;
- select frontend technology, APIs, databases, cloud services, AI models, or implementation architecture;
- change Governance or activate provisional Architecture; or
- initiate Build, code changes, or implementation from this decision alone.

## 6. Learning controls

The learning phase is subject to the following controls:

1. PDR-009 remains the Product learning contract and must not be silently expanded.
2. Each evaluated comparator must be versioned, reproducible, and linked to its evaluation evidence.
3. Founder observations, AI-agent evaluation, external user research, clinical validation, and release evidence must remain explicitly separated.
4. Clinical Safety/Governance participation is required before uncertainty semantics, clinical attention, diagnostic considerations, or plan support are specified beyond exploratory hypotheses.
5. Architecture light review must be completed before any Build handoff for the affected behavior.
6. Any later implementation requires a separate, explicit, repository-resident Build handoff after the Architecture gate.
7. External human research requires separate authorization, protocol, recruitment, consent, and data-handling controls.
8. PDR-009 stop rules apply. A comparator that obscures uncertainty, weakens authority boundaries, loses state, or produces unsupported specificity must not proceed as a preferred direction.
9. This record cannot be used retroactively to authorize work completed before its effective date.

## 7. AI evaluation gate

AI-agent evaluation shall take place **after** any subsequently authorized Sprint 1.2 prototype has been implemented, versioned, and locked for evaluation, and **before** Steering is asked to approve a subsequent Product direction based on that prototype.

The evaluation shall examine:

- clinical safety signals and failure modes;
- UX clarity, orientation, cognitive burden, and recovery;
- comprehension of states, attribution, provenance, and uncertainty;
- human-authority boundaries and risk of authority drift;
- unsupported reasoning, unsupported specificity, or implied clinical conclusions;
- loss, collision, or ambiguity in simultaneous findings and state transitions; and
- alignment with the Cortex Experience Vision.

The evaluation package shall identify the evaluated repository state, fixtures, browser or runtime conditions, reviewer roles, prompts, model/tool configuration, traces, negative and degraded cases, and links from findings to evidence. AI-agent agreement is not user validation, clinical validation, or clinical-readiness evidence.

## 8. Next gate — Architecture light review

The next decision point is a separate Architecture light review. This record authorizes Product to prepare and submit that review request; it is neither the Architecture request nor the Architecture response.

Architecture shall assess:

1. whether a one-page workspace hypothesis materially affects existing capability boundaries, bounded contexts, trust boundaries, or state ownership—or remains a Product representation choice;
2. whether adaptive IA and clinical selectivity can be isolated within the learning scope without creating hidden cross-capability coupling;
3. whether the proposed state, uncertainty, completeness, and output semantics require an Architecture decision or ADR;
4. how hidden or dormant state, invalidation, stale values, re-entry, and correction must behave if information is progressively disclosed or conditionally shown;
5. whether simultaneous-finding cardinality requires architectural invariants beyond the existing Product requirement;
6. which P1 hypotheses—fund-based considerations, neutral plan support, and compact source-based clinical attention—would require later, separate Clinical Safety/Governance and Architecture review; and
7. whether the learning implementation can remain isolated from CA-002 prioritization, production services, and technology selection.

Architecture is not asked at this gate to select UI, navigation, controls, technology, clinical rules, or a final solution; activate non-active Architecture; resolve unrelated governance issues; or authorize Build.

The Architecture response should classify the result as one of:

- **NO MATERIAL ARCHITECTURE IMPACT — bounded Product learning may proceed subject to a separate Build handoff**;
- **MATERIAL CONSTRAINTS — Product must incorporate stated constraints before any Build handoff**;
- **ARCHITECTURE DECISION REQUIRED — identified questions must be resolved before Build**; or
- **BLOCKED — named dependency and accountable owner required**.

## 9. Consequences

### Positive consequences

- The Research → Product → Steering → Architecture → Build chain is explicit.
- Sprint 1.2 has a bounded learning purpose rather than an implied final-solution mandate.
- One-page, adaptive IA, uncertainty, and finding-model work remain testable hypotheses.
- Architecture can review material boundaries before implementation authority is considered.

### Constraints introduced

- Product may prepare learning and review material but may not issue a Build handoff from this decision.
- Architecture review and any required Clinical Safety/Governance input can narrow or block the learning implementation.
- AI-agent evaluation cannot begin until a later prototype has separate authorization and a locked evaluation state.

### Known limitations and open items

- The named Steering approver or approving body is not identified in the available source set and must be recorded administratively without changing this decision’s content.
- The Experience Vision revisions referenced by the learning contracts remain subject to their own lifecycle and review.
- API-016 is identified but has not yet been submitted to or accepted by Architecture.
- The accountable Clinical Safety/Governance owner for uncertainty semantics and later clinical-attention hypotheses is not yet recorded here.
- No external user-research authorization or protocol is created.
- No Build handoff exists for Sprint 1.2.
- P02’s founder evidence does not close the underlying external-validity issue.

## 10. Next Steering decision

Steering shall consider a subsequent decision only after:

1. Architecture has returned a documented light-review outcome;
2. Product has reconciled any Architecture constraints with PDR-009;
3. required Clinical Safety/Governance ownership and dependencies are explicit;
4. any proposed Build handoff is separately documented and bounded; and
5. the proposed evaluation plan preserves evidence-type separation and repository traceability.

No later prototype result, AI evaluation, or founder walkthrough automatically authorizes the next phase.

## 11. Traceability summary

```text
P01 / PDR-008
        ↓
Sprint 1.1 prototype baseline 01eb5db
        ↓
P02 internal formative founder evidence
        ↓
PDR-009 Sprint 1.2 Product Learning Contract
        ↓
SPRINT-1-2-STEERING-DECISION-001
        ↓
API-016 / separate Architecture light review
        ↓
separate Build handoff, if later authorized
        ↓
versioned Sprint 1.2 prototype
        ↓
AI-agent evaluation and subsequent evidence gate
```

## 12. Recorded decision

**APPROVED FOR LEARNING PHASE**

Steering approves Sprint 1.2 as a controlled learning phase to investigate whether Cortex can move from a structured clinical form toward a clinical workspace with lower cognitive load. Steering does not approve a final Product solution, implementation, Build start, clinical use, or regulatory claim.
