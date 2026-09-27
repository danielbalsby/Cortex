# PEV-001-H01 — Architecture Review of Cortex Experience Vision v1.0

## Review control

| Field | Value |
|---|---|
| Review ID | PEV-001-H01 |
| Subject | [Cortex Experience Vision v1.0](../../product/experience/CORTEX-EXPERIENCE-VISION-v1.0.md) (`PEV-001`) |
| Subject version/hash | v1.0; SHA-256 `e5d3aaf198d2e9d5acc2d33c430f9553c8e56f3d455deacc3d18d85795d422f2` |
| Request input | [Architecture Review Input — Experience Vision](../../product/handoffs/ARCHITECTURE-REVIEW-INPUT-EXPERIENCE-VISION-v1.0.md) |
| Request owner | Cortex — Product; named owner remains TODO under GI-012 |
| Review owner | Cortex — Architecture; named reviewer remains TODO under GI-012 |
| Date | 2026-07-21 |
| Review state | COMPLETED |
| Artifact lifecycle | Non-active review record; no lifecycle activation or governance approval is created |
| Overall result | **CONFORMANT WITH REQUIRED PRODUCT REVISIONS** |
| Blocking findings | 0 |
| Material findings | 5 |
| Advisory findings | 3 |
| No-issue findings | 4 |

Product retains ownership of PEV-001. This record evaluates architectural compatibility and does not rewrite Experience Principles, Product decisions or requirements.

## 1. Scope and non-scope

### In scope

- Compatibility with Cortex Domain Architecture.
- Domain-language discipline and unresolved LEX boundaries.
- Decision authority from system/AI output through Recommendation, Human Decision and Action.
- Source, Retrieved Passage, Evidence Item and Claim semantics.
- Provenance, Traceability, Audit and Verification Evidence boundaries.
- Uncertainty, Risk, failure and degraded-state obligations.
- Trust-boundary coverage.
- Mapping of PEV-001-R01–R18 to existing Specification capabilities and logical contexts.
- Experience quality attributes and accidental solution decisions.
- Readiness as a non-active Product basis for the next design phase.

### Out of scope

- Governance approval, lifecycle activation or Product approval.
- UI, visual design, usability validation or user-research conclusions.
- Implementation, code, API, persistence, service or deployment review.
- Clinical validation, regulatory classification, conformity or clinical release.
- Acceptance of an ADR, creation of CA-002 or transfer to Build.

## 2. Sources reviewed

### Product

- [Cortex Experience Vision v1.0](../../product/experience/CORTEX-EXPERIENCE-VISION-v1.0.md).
- [Architecture Review Input — Experience Vision](../../product/handoffs/ARCHITECTURE-REVIEW-INPUT-EXPERIENCE-VISION-v1.0.md).
- [Cortex Product Baseline v1.0](../../product/CORTEX-PRODUCT-BASELINE-v1.0.md).
- [Domain Architecture — Product Reconciliation v1.0](../../product/architecture/DOMAIN-ARCHITECTURE-PRODUCT-RECONCILIATION-v1.0.md).
- [Architecture Constraint Summary for Product](../../product/architecture/architecture-constraint-summary-for-product.md).
- [Product Issue Register](../../product/registers/product-issue-register.md), especially PI-018–PI-029.
- [Product Assumption Register](../../product/registers/product-assumption-register.md), especially PA-003, PA-005 and PA-008–PA-013.
- [Architecture–Product Interface Register](../../product/registers/architecture-product-interface-register.md), especially API-001–API-014.
- [PDR-006 — Cortex Experience Vision v1.0](../../product/decisions/PDR-006-experience-vision-v1.0.md).

### Architecture

- [Cortex Domain Architecture v1.0](../CORTEX-DOMAIN-ARCHITECTURE-v1.0.md).
- [Cortex Software Architecture Baseline v1.0](../CORTEX-SOFTWARE-ARCHITECTURE-BASELINE-v1.0.md).
- [Governance & Traceability Architecture v1.0](../GOVERNANCE-TRACEABILITY-ARCHITECTURE-v1.0.md).
- [CA-001 — Knowledge Retrieval v1.0](../capabilities/CA-001-Knowledge-Retrieval-v1.0.md).
- [RFC-005 — Workflow Engine v1](../rfcs/RFC-005-Workflow-Engine-v1.md), accepted pre-adoption and subject to GI-017 conformance.
- [ADR-001](../decisions/ADR-001-Repository-Structure.md), [ADR-002](../decisions/ADR-002-Canonical-Governance-Sources.md) and [ADR-003](../decisions/ADR-003-Traceability-Model.md), all `Proposed` and not accepted.

### Governance, specification and safety

- [Cortex Governance Framework v1.0](../../governance/canonical/Cortex-Governance-Framework-v1.0.docx).
- [Cortex Specification v1.0](../../specifications/Cortex-Specification-v1.0.docx).
- [Clinical Safety Principles](../../governance/CLINICAL-SAFETY-PRINCIPLES.md).
- [Governance Adoption Report v2.0](../../governance/GOVERNANCE-ADOPTION-REPORT-v2.0.md), including GI-010–GI-017.
- [Governance & Traceability Architecture §3.4](../GOVERNANCE-TRACEABILITY-ARCHITECTURE-v1.0.md), including GI-018.

## 3. Source integrity and hash check

The Product intake references Domain Architecture SHA-256:

`26bec902aa8e19ede9db0edac6f88b434b060247c98de9cc11d4bbe422a39d57`

The repository file produced the same full SHA-256 during this review. **No Domain Architecture source drift was found.**

All sources listed above were readable. All local links in this review were checked relative to `docs/architecture/reviews/`. The repository remains a dirty working tree with pre-existing modified and untracked files; this review makes no claim that untracked sources are durable in repository history.

## 4. Findings summary

| ID | Classification | Finding type | Affected PEV content | Required disposition |
|---|---|---|---|---|
| F-01 | MATERIAL | Product/Architecture boundary | §7 Flow vs verifiable completion; §13; §15; R09/R13 | Separate processing/completion state from Verification state and clinical-validation status. |
| F-02 | MATERIAL | Architecture problem | EP-08; R11; R12 | Clarify that functional state owners preserve/resume work, Traceability owns impact relations, and Audit records history without owning restoration or mutation. |
| F-03 | MATERIAL | Product problem with Architecture dependency | EP-09; R12 | Require downstream impact identification and stale/invalidation/re-review semantics after human correction or rejection. |
| F-04 | MATERIAL | Product problem | §8–9; R15 | Complete the patient-communication trust boundary: approved decision/plan version, approving actor, representation status and delivery/outcome must remain distinct. |
| F-05 | MATERIAL | Product document-control problem | §19–21; review-input control | Replace nonexistent `EV-AR-001`, link the actual API records, and update “prepared/not submitted/not started” state after this review is accepted into Product control. |
| F-06 | ADVISORY | Terminological clarification | §8–9; R04/R07 | Prefer full working terms `Knowledge Source` and `Retrieved Passage`; retain Source only where deliberately generic. |
| F-07 | ADVISORY | Missing dependency precision | R07/R08 | Add CAP-GOV/source-policy and producing-capability responsibility; “all capabilities” is an obligation, not an owner. |
| F-08 | ADVISORY | Non-blocking candidate | §12; R10; quality model | Keep Consultation Impact, interruption thresholds and suppression policy outside Product ownership until Architecture/Governance contracts exist. |
| F-09 | NO ISSUE | Domain compatibility | §§2, 8–10; R04–R07/R16 | Source/Evidence/Claim, Uncertainty/Confidence and clinical/Verification Evidence distinctions are preserved. |
| F-10 | NO ISSUE | Decision authority | §§7–8; EP-05; R03/R05/R12 | Cortex is not represented as clinical decision-maker; explicit human authority is preserved. |
| F-11 | NO ISSUE | Safety/quality balance | §§7, 10–13; R06/R08/R10/R13 | Calm, silence and low friction are explicitly bounded by material uncertainty, Risk, degraded state and necessary interruption. |
| F-12 | NO ISSUE | Unintended solution decision | §§1, 6–16 | No database, API, service, model, event technology, deployment or concrete screen/navigation solution is selected. |

There are no BLOCKING findings. The five MATERIAL findings require a Product-controlled revision or explicit clarification before Steering treats the Experience Vision gate as passed.

## 5. Domain compatibility

### 5.1 Assessment

PEV-001 is substantially compatible with the qualified working vocabulary in Domain Architecture. It explicitly treats unresolved terms as unresolved and does not silently turn them into Product-owned definitions.

| Term/boundary | Assessment | Classification |
|---|---|---|
| Source / Retrieved Passage | Correctly separated; use of generic `Source` should be tightened where `Knowledge Source` is intended. | Terminological clarification; F-06 |
| Evidence Item / Claim | Correctly separated as support versus proposition. | NO ISSUE |
| Claim / Assertion | PEV does not stabilise Assertion as a Product type. | NO ISSUE |
| Recommendation / Human Decision / Action | Correctly separated by authority and lifecycle meaning. | NO ISSUE |
| AI Output | Treated as system contribution, never evidence or authority by presentation alone. | NO ISSUE |
| Uncertainty / Risk | Kept visible and actionable without hidden score. | NO ISSUE |
| Confidence | Explicitly unresolved; no scale, score, wording or visualisation is selected. | NO ISSUE |
| Provenance / Traceability / Audit | Conceptually separated, but EP-08/R11/R12 leave operational ownership ambiguous. | Architecture problem; F-02 |
| Verification Evidence / clinical evidence | Explicitly separated. Generic `verified` status still needs correction. | Product/Architecture boundary; F-01 |
| Consultation / Encounter | Consultation is used for the human clinical experience; Encounter is not redefined. | NO ISSUE; later compatibility candidate remains |
| Case / Subject | Neither is made a stable Experience type. | NO ISSUE |

### 5.2 Required language discipline

PEV-001 must continue to treat Domain Architecture as non-active working language, not formal LEX. Product may test user-facing words, but a test label does not create domain authority. Any future need to define `Case`, `Subject`, `Assertion`, `Confidence` or Consultation/Encounter equivalence must return through API-013 and the appropriate Architecture/Governance path.

## 6. Decision authority assessment

PEV-001 respects the decision invariant:

`AI/system output → Recommendation → human assessment → Human Decision → authorised Action → observed outcome`

It correctly requires:

- an identified authorised actor;
- explicit choice and consequence;
- practical rejection and correction;
- no acceptance from display, silence, default or timeout;
- separation of action authorisation, execution and outcome;
- transparent system contribution without AI theatre.

The Product requirements are outcome-oriented and do not prescribe a control, screen or navigation model. R03 and R05 are therefore suitable inputs to later workflow/interaction work, subject to an Architecture-owned transition contract. **Assessment: NO ISSUE.**

## 7. Provenance, evidence and claim assessment

PEV-001 preserves the required chain:

`Knowledge Source → Retrieved Passage → Evidence Item → Claim`

It does not:

- treat retrieval ranking as evidence strength;
- let presentation increase Claim authority;
- make AI output an evidence source;
- collapse missing evidence into negative evidence;
- hide contested, expired, incomplete or conflicting support;
- collapse clinical evidence and Verification Evidence.

R04 is architecturally sound as a comprehension outcome. R07 should additionally acknowledge that source eligibility/status is governed through CAP-GOV/source policy and that Traceability/Audit do not own the source-to-evidence transformation. This is an allocation clarification, not a need for a new capability.

## 8. Uncertainty, Risk and degraded-state assessment

PEV-001 handles the tension between calm and safety correctly:

- material uncertainty remains visible;
- missing data, missing evidence, conflict, partial processing and degradation remain separate;
- absence is not low Risk;
- silence is a default only until a proportional protection function requires interruption;
- safe continuation is permitted only where semantic validity is preserved;
- honest blocking is allowed, so “no dead ends” does not override safety;
- no SLO or Risk threshold is invented.

R06, R08 and R10 require later contracts from CAP-RSK, CAP-ATT, CAP-GOV and the relevant producing capability. The Consultation Impact Standard, interruption thresholds and suppression/escalation policy remain unresolved dependencies. **Assessment: NO ISSUE with advisory dependency F-08.**

## 9. Traceability and Audit assessment

PEV-001 states the high-level difference correctly, but three later formulations need tightening:

1. EP-08 and R11 associate preservation/resumption with `Audit`. Audit is not the owner of operational state, restoration or continuity. The relevant functional context owns state; Traceability relates versions and affected artifacts; Audit records significant facts for reconstruction.
2. R12 requires correction without “history rewrite”, but does not explicitly require identification of affected downstream Claims, Recommendations, drafts or actions.
3. `verified` appears beside processing/completion states. Verification is evidence against a criterion under versioned conditions, not a generic step between partial and complete.

Required semantic axes:

| Axis | Examples | Owner/meaning |
|---|---|---|
| Processing state | requested, started, partial, complete, failed, degraded | Producing capability/workflow; says what processing occurred |
| Functional validity | current, stale, invalidated, superseded | Authoritative functional context plus impact relations |
| Verification state | untested, blocked, passed, failed, not applicable | Verification; always tied to criterion, method and versions |
| Clinical validation/release | not assessed, limited evidence, approved within scope, not approved | Clinical/Governance/QMS authority; never inferred from technical verification |
| Audit state | recorded, integrity status, retained/disposed under policy | Audit; reconstructs history without owning functional truth |

## 10. Trust-boundary assessment

| Trust boundary | PEV coverage | Required follow-up |
|---|---|---|
| External source → internal representation | Covered by source identity/status, currentness, coverage and failure requirements. | Source-policy contract via CAP-GOV/CAP-KNR. |
| Retrieved Passage → Evidence Item | Covered and explicitly not automatic. | CAP-KNR→CAP-EVD handoff remains Architecture/Evidence-owned. |
| Evidence Item → Claim | Covered as support/contest relation. | CAP-EVD→CAP-RSN handoff remains candidate contract. |
| AI Output → human presentation | Covered by attribution, limitation and no-authority rules. | Later comprehension testing; no new capability. |
| Recommendation → Human Decision | Covered by explicit actor, choice and reject/modify requirements. | Architecture-owned state/authority transition. |
| Human correction → derived artifacts | Partially covered. History is preserved, but downstream impact/staleness is not required clearly enough. | Required Product revision F-03 and later Traceability contract. |
| Human Decision/plan → patient communication | Partially covered. Loyalty is required, but exact approved version, approving actor, draft/approved/delivered state and outcome are not all explicit. | Required Product revision F-04. |
| System status → Verification/Audit | Partially covered. Failure and verification are visible, but their state axes/owners can be conflated. | Required Product revisions F-01/F-02. |

No security mechanism, storage model or interface pattern is selected by this analysis.

## 11. Capability dependency mapping

PEV requirements map to existing capabilities and logical responsibilities as follows. No new Specification capability is required.

| Requirement | Required capabilities / contexts | Boundary note |
|---|---|---|
| R01 | CAP-CTX; Workflow and Attention | Functional state owner supplies context/resumption; Audit is not restoration storage. |
| R02 | CAP-CTX, CAP-ATT, CAP-RSK; Workflow and Attention | Burden reduction cannot suppress required Risk/authority work. |
| R03 | CAP-CTX, CAP-DSU; Identity and Access; Human Decision | Context before choice; explicit actor/authority. |
| R04 | CAP-KNR, CAP-EVD, CAP-RSN, CAP-GOV; Traceability | Requires source-policy and semantic handoffs; no new capability. |
| R05 | CAP-DSU, CAP-AUD; Human Decision; executing boundary | Recommendation, decision, authorisation, execution and outcome remain separate. |
| R06 | CAP-CTX, CAP-EVD, CAP-RSN, CAP-RSK, CAP-ATT, CAP-DSU | Risk depends on typed context/evidence/reasoning; no hidden score. |
| R07 | CAP-KNR, CAP-EVD, CAP-RSN, CAP-GOV, CAP-AUD; Traceability | Provenance travels with information; Traceability/Audit do not own evidence transition. |
| R08 | Every producing capability as applicable; CAP-GOV, CAP-AUD; Workflow | Failure semantics are capability-specific; “all capabilities” is not a new owner. |
| R09 | Producing capability; Verification; CAP-GOV, CAP-AUD | Processing completion, Verification and clinical validation use separate axes. |
| R10 | CAP-RSK, CAP-ATT, CAP-GOV, CAP-AUD | Requires Consultation Impact and suppression/escalation policy. |
| R11 | CAP-CTX and relevant producing capability; Workflow; Traceability; CAP-AUD | Functional state is preserved by owner; Traceability marks impact; Audit reconstructs. |
| R12 | CAP-DSU, CAP-DOC and any corrected producing capability; Traceability; CAP-AUD | Correction must propagate staleness/impact without history rewrite. |
| R13 | Relevant producing capability; Workflow and Attention | Later latency/availability contract; no SLO selected here. |
| R14 | All capabilities under NFR-ACC-001; Identity and Access where relevant | Cross-cutting quality obligation, not a new Accessibility capability. |
| R15 | CAP-DSU, CAP-RSK, CAP-DOC, CAP-PCM; Human Decision | Approved-plan version, representation approval and delivery state must remain distinct. |
| R16 | CAP-EVD, CAP-LRN, CAP-AUD, CAP-GOV; Verification | Evidence type, claim scope, method, population and versions are explicit. |
| R17 | CAP-CTX, CAP-DSU, CAP-DOC, CAP-PCM; Workflow | Continuity does not make Documentation the aggregate or product centre. |
| R18 | CAP-GOV and CAP-LRN, with Product decision authority | Kill criteria govern Product continuation; exceptions require competent authority. |

### Dependency findings

- No circular runtime dependency is introduced by PEV-001.
- Feedback/learning must remain a versioned loop through CAP-LRN and CAP-GOV, not direct mutation of upstream state.
- Missing boundary contracts are CAP-KNR→CAP-EVD→CAP-RSN, CAP-RSN/RSK/EVD/ATT→CAP-DSU→Human Decision→Action, correction→Traceability impact, and Human Decision→CAP-DOC/CAP-PCM.
- Identity and Access, Workflow, Human Decision, Traceability and Verification remain logical responsibilities without invented CAP-IDs.

## 12. Quality-attribute assessment

| Tension | Assessment |
|---|---|
| Perceived performance vs actual status | Mostly conformant. Truthful acknowledgement and no false progress are required; F-01 must separate processing and Verification state. |
| Continuity vs consistency/safety | Conformant. Safe block, stale/changed state and semantic validity limit continued work. F-03 adds downstream impact after correction. |
| Reversibility vs Audit/irreversible action | Conformant in intent. EP-09 rejects universal undo; F-02 clarifies ownership and F-03 propagation. |
| Silence by default vs necessary interruption | Conformant. Protection function, urgency, consequence and Risk bound silence. |
| Low friction vs explicit authority | Conformant. Reflection and explicit decision may not be removed to reduce actions. |
| Progressive disclosure vs necessary visibility | Conformant. Material provenance, uncertainty, conflict, failure and authority must remain practically available at need. |
| Accessibility vs interaction specificity | Conformant. Keyboard, alternative input, screen reader, scaling and non-colour/motion meaning are legitimate cross-cutting constraints, not a concrete UI solution. |

No SLO values are established.

## 13. Unintended solution decisions

| PEV formulation | Classification | Assessment |
|---|---|---|
| Progressive disclosure | Acceptable interaction constraint | Describes staged information availability while preserving meaning; no control or layout selected. |
| One clear next action | Legitimate Product outcome | Explicitly conceptual, non-wizard and non-coercive. |
| Keyboard/screen reader/scaling requirements | Acceptable accessibility constraint | Defines operability/meaning, not component implementation. |
| Anti-goals concerning chatbot/dashboard/cards/alarms | Legitimate Product outcome guard | Rejects attention/authority failure, not every instance of a component type. |
| Preserve place/work | Legitimate quality outcome | Does not choose persistence technology; ownership clarification is required by F-02. |
| Requested/started/partial/degraded/verified/complete | Accidental state-model overlap | `verified` is not a processing state; F-01 requires separation without selecting implementation. |

No navigation, screen structure, database, API, service architecture, model type, event technology or deployment form is selected.

## 14. Required Product revisions

Product should issue a controlled PEV-001 revision or referenced clarification covering all five MATERIAL findings:

1. **State-axis separation:** revise §7, §13, §15 and R09/R13 so processing/completion, functional validity, Verification result and clinical validation cannot be read as one lifecycle.
2. **Ownership separation:** revise EP-08/R11/R12 relation text so functional contexts own work/state, Traceability owns affected-artifact relations and Audit owns reconstruction only.
3. **Correction impact:** extend R12 to require affected derived artifacts to be identifiable and visibly stale, invalidated, superseded or re-reviewed as appropriate.
4. **Patient-communication boundary:** extend R15 to preserve approved Human Decision/plan version, approving actor, representation review status and distinction between prepared, approved, delivered and acted upon.
5. **Control-record correction:** replace `EV-AR-001` with actual API interface records and update review/input/readiness state once Product/Steering records this completed response.

Advisory refinements F-06–F-08 may be handled in the same revision but do not independently block the gate.

## 15. Architecture issues

No new canonical Architecture Issue IDs or ADRs are created by this review. The following candidates are preserved for later Architecture ownership:

- orthogonal Processing, Functional Validity, Verification and Clinical Validation state semantics;
- operational-state/Traceability/Audit ownership for interruption and resumption;
- correction and invalidation propagation across derived artifacts;
- Human Decision/plan → CAP-DOC/CAP-PCM → delivery/outcome boundary;
- existing Source–Evidence–Claim and Decision–Action transition candidates.

These candidates must not become binding through Product wording or this review alone.

## 16. Governance dependencies

- GI-010/GI-011/GI-015 qualify upstream authority but do not prevent this non-active compatibility review.
- GI-012 prevents named owner/reviewer/approving-body completeness.
- GI-013/GI-014 leave stable document identity, formal LEX and traceability registry incomplete.
- GI-016 blocks regulatory, QMS, clinical-evaluation and release conclusions.
- GI-018 leaves `Proposed` migration and lifecycle treatment unresolved.
- Consultation Impact authority and any high-risk exception remain Governance/Clinical Safety dependencies.

No Governance issue is resolved or newly numbered here.

## 17. Review conclusion

**CONFORMANT WITH REQUIRED PRODUCT REVISIONS**

PEV-001 is architecturally coherent as a non-active Product Experience basis. It is compatible with Cortex Domain Architecture, preserves human decision authority, keeps Source/Evidence/Claim and clinical/Verification Evidence distinctions, handles uncertainty/degradation safely, and avoids concrete technical solution choices.

The five MATERIAL findings do not require rejection of the Experience Vision. They do require Product-controlled correction before Steering treats the Experience Vision gate as passed or uses PEV-001 as the settled basis for detailed Clinical Workflow/Information Architecture decisions.

This conclusion is not governance approval, lifecycle activation, implementation readiness, clinical validation or release authority.

## 18. Readiness recommendation and Steering exit gate

Return this result to **Cortex — Steering**.

Architecture recommends:

1. Product revises or formally clarifies PEV-001 for F-01–F-05.
2. Steering verifies that the revised text preserves Product ownership and does not silently resolve LEX/Governance questions.
3. Clinical Workflow Architecture may begin after Steering records the Experience Vision gate as passed with the required revisions incorporated or explicitly carried as owned blockers.
4. Information Architecture may perform non-binding classification work now, but must not finalise state semantics, Source→Evidence→Claim transitions or Audit ownership before F-01/F-02 and relevant interface contracts are resolved.
5. A separate Architecture design is required for state-axis semantics, correction propagation and capability handoffs before detailed interaction/implementation design.
6. CA-002 and Build remain out of scope and must not begin from this review.

**Recommended next owner:** Cortex — Product, to make the required revisions and return the controlled result to Steering. Steering retains the exit-gate decision.
