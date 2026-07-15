# RFC-005 – Workflow Engine v1

**Status:** Proposed  
**Owner:** Cortex  
**Type:** Technical Architecture RFC  
**Last reviewed:** 2026-07-15  
**Target milestone:** Workflow Engine v1

---

## 1. Summary

This RFC defines the technical contract for Cortex Workflow Engine v1.

The engine transforms a clinical pathway and explicitly recorded consultation answers into deterministic derived behaviour:

- visible sections and fields
- active clinical rules
- assessment suggestions
- plan recommendations
- active administrative outputs
- readiness and missing-information feedback

The engine must remain independent of any specific disease, pathway or user interface.

Clinical content belongs in pathway definitions.

Generic behaviour belongs in the engine.

---

## 2. Motivation

Cortex must support many different consultation types without creating separate application logic for each condition.

A knee pathway, an acute cough pathway and a chronic-care pathway should use the same engine.

Adding a new pathway must not require:

- disease-specific conditions in generic React components
- disease-specific field identifiers in the shared engine
- duplicated rule-evaluation logic
- new navigation logic
- new consultation-state models
- hidden clinical defaults

Workflow Engine v1 establishes the reusable foundation required before Cortex expands beyond the first pathway.

---

## 3. Goals

Workflow Engine v1 must:

1. Use explicitly recorded consultation data as its only clinical input.
2. Produce deterministic and reproducible derived behaviour.
3. Support conditional field and section visibility.
4. Remove answers that are no longer clinically active.
5. Evaluate clinical rules through one shared condition model.
6. Generate non-probabilistic clinical suggestions under explicit, reviewed pathway display policies.
7. Activate outputs declaratively from pathway definitions and generate deterministic, copyable drafts.
8. Prevent generic engine code from depending on disease-specific field IDs.
9. Expose readiness and missing-information feedback without blocking the physician.
10. Be testable without rendering the user interface.

---

## 4. Non-goals

Workflow Engine v1 will not:

- diagnose patients autonomously
- choose treatment autonomously
- replace physician judgement
- generate clinical information that was not recorded
- retrieve or store CPR numbers
- persist patient records
- integrate with an EHR
- implement longitudinal patient history
- provide AI-generated clinical reasoning
- encode regional referral requirements without reviewed sources
- define visual design or component layout

These capabilities may be considered later through separate RFCs.

---

## 5. Architectural principles

### 5.1 Explicit information only

An unanswered field is unknown.

Values such as:

- no
- normal
- none
- right
- gradual
- stable

are clinical facts and must require explicit confirmation.

The engine must never treat a convenient default as an observed or recorded fact.

---

### 5.2 Deterministic derivation

The same pathway and the same answers must always produce the same:

- visible fields
- visible sections
- active alerts
- suggestions
- recommendations
- outputs
- missing-information results

Derived behaviour must not depend on render order, timestamps, random identifiers or hidden mutable state.

---

### 5.3 One condition model

Visibility, rules, suggestions and output activation should use one shared condition model wherever their semantics are equivalent.

A condition evaluator must have one authoritative implementation.

Parallel implementations with different semantics are not permitted.

---

### 5.4 Generic engine, specific pathway

The shared engine may understand generic concepts such as:

- fields
- sections
- conditions
- rules
- suggestions
- outputs
- readiness requirements

It must not understand disease-specific concepts such as:

- knee swelling
- joint-line tenderness
- cough duration
- blood-pressure targets

Those concepts belong in pathway content or pathway-specific output definitions.

---

### 5.5 Derived outputs

Journal drafts, referrals and other consultation artifacts must be generated from information already present in the consultation.

Outputs must not maintain separate clinical state.

No information should need to be recorded twice.

---

### 5.6 Physician control

Rules, suggestions and readiness feedback are advisory unless a later safety RFC explicitly defines otherwise.

The physician may:

- ignore a suggestion
- choose another assessment
- change an earlier answer
- proceed despite missing information
- copy every generated draft output

Workflow Engine v1 generates deterministic draft outputs from recorded consultation information.

Editing generated text inside Cortex is not required for Workflow Engine v1. If in-product editing is introduced later, edited text must be represented as an explicit draft override and must never silently become recorded clinical truth. Clinical answers remain the source of recorded facts.

The engine supports clinical work.

It does not control it.

---

## 6. Core domain contracts

### 6.1 Clinical pathway

A clinical pathway defines the disease- or problem-specific content consumed by the engine.

A pathway may contain:

- metadata
- sections
- fields
- field options
- visibility conditions
- clinical rules
- assessment suggestions
- plan recommendations
- output definitions
- readiness requirements

A pathway must not contain UI-component implementation details.

---

### 6.2 Consultation answers

Consultation answers contain only explicitly recorded values.

Conceptually:

```ts
type ConsultationAnswers = Record<
  string,
  string | readonly string[]
>;
```

An empty string or empty array represents unanswered information.

The exact TypeScript representation may evolve, but its semantics must remain explicit and unambiguous.

---

### 6.3 Consultation state

Workflow Engine v1 operates on a consultation state containing at minimum:

```ts
interface ConsultationState {
  pathwayId: string;
  answers: ConsultationAnswers;
}
```

Stable lifecycle metadata may be added later.

Derived information must not be stored as independent mutable truth when it can be recalculated from the pathway and answers.

---

### 6.4 Rule condition

A shared condition model must support the current prototype needs, including:

- equality
- membership in a multi-value answer
- explicit truthiness where clinically appropriate

Conceptually:

```ts
interface RuleCondition {
  fieldId: string;
  operator: "equals" | "includes" | "truthy";
  value?: string;
}
```

Conditions in an array use `AND` semantics unless another grouping model is introduced through a future RFC.

A missing or unanswered value must not satisfy a clinically meaningful condition.

The `truthy` operator means only that a field contains an explicit non-empty answer. It must never be interpreted as clinically positive. Values such as `no`, `normal` and `none` are truthy in this technical sense because they are explicit answers. Clinical positivity must use `equals` or `includes` with an explicit value.

---

### 6.5 Clinical output definition

Outputs are declared by the pathway.

Conceptually:

```ts
interface ClinicalOutputDefinition {
  id: string;
  label: string;
  type: string;
  alwaysActive?: boolean;
  activeWhen?: readonly RuleCondition[];
  generator?: string;
  requirements?: readonly OutputRequirement[];
}
```

The precise implementation may differ, but output activation and generation must be pathway-driven.

The generic encounter engine must not route outputs using disease-specific field IDs.

---

## 7. Engine responsibilities

Workflow Engine v1 is composed of small deterministic services.

### 7.1 State service

Responsible for:

- creating an empty answer state
- applying immutable answer updates
- pruning answers from hidden fields and sections
- resetting the consultation

It must not assign clinically meaningful defaults.

---

### 7.2 Visibility service

Responsible for:

- evaluating section visibility
- evaluating field visibility
- combining section- and field-level visibility
- returning visible sections and fields

A field inside a hidden section is always hidden.

---

### 7.3 Rule service

Responsible for:

- evaluating clinical alert rules
- returning matched alerts
- retaining enough metadata to explain why a rule matched

Rules must not modify answers or choose a clinical decision.

---

### 7.4 Suggestion service

Responsible for:

- evaluating pathway-defined assessment suggestions
- identifying supporting findings
- identifying missing or contradictory findings where defined by the pathway
- presenting support without implying diagnostic probability

Raw rule-match percentages must not be shown as diagnostic confidence.

Prefer language such as:

- `2 of 3 supporting findings recorded`
- `Supporting findings present`
- `Further information required`

Suggestion display policy must be explicit, configurable and clinically reviewed as pathway content. Display thresholds and clinical relevance belong to the reviewed pathway definition. One partial match must not automatically imply that a suggestion is appropriate to display.

---

### 7.5 Recommendation service

Responsible for:

- returning pathway-defined plan recommendations
- explaining their relationship to the selected assessment
- requiring explicit physician acceptance before modifying the plan

Recommendations must never be applied automatically.

---

### 7.6 Output service

Responsible for:

- determining active outputs
- generating only active outputs
- generating output-specific missing-information feedback
- returning deterministic, copyable draft text
- ensuring outputs contain only recorded information

The journal may be always active.

Other outputs should activate according to pathway-defined conditions or explicit physician choices.

Editing generated text inside Cortex is not required for Workflow Engine v1. Any later in-product editing must store edited text as an explicit draft override, separate from recorded clinical answers, and must not silently convert that text into clinical truth.

---

### 7.7 Readiness service

Responsible for:

- evaluating whether an active output has sufficient information
- returning specific missing-information items
- distinguishing `ready` from `missing-data`

Readiness feedback must be:

- concise
- understandable
- actionable
- non-blocking

A journal must not be considered ready merely because a string was generated.

`ready` means only that the configured technical completeness requirements are satisfied. It does not mean that the output has been clinically reviewed, is clinically correct or is approved for use. User-facing wording may later need to distinguish technical completeness from clinical approval.

---

## 8. Evaluation order

After an answer changes, the engine should conceptually perform:

```text
Apply answer
    ↓
Evaluate visibility
    ↓
Prune newly hidden answers
    ↓
Re-evaluate visibility until stable
    ↓
Evaluate rules and suggestions
    ↓
Determine active outputs
    ↓
Generate outputs
    ↓
Evaluate output readiness
```

The implementation must avoid render loops and unstable state.

Visibility pruning must continue until a stable fixed point is reached. The implementation must guarantee convergence and must not expose intermediate answer states as derived clinical behaviour.

---

## 9. Invariants

The following invariants are mandatory.

### INV-001 — No unconfirmed clinical facts

Unanswered fields must not contribute to:

- journals
- referrals
- alerts
- suggestions
- recommendations
- output activation
- readiness satisfaction

---

### INV-002 — Hidden answers are inactive

Answers belonging to hidden fields or hidden sections must be removed or otherwise made completely inactive.

They must not contribute to any derived behaviour.

---

### INV-003 — Outputs do not invent information

Generated output may reformat and combine recorded information.

It may not add unsupported symptoms, findings, diagnoses, treatment history or patient preferences.

---

### INV-004 — Generic code is pathway-independent

Generic engine and generic React components must not contain disease-specific clinical conditions or field identifiers.

---

### INV-005 — One source of clinical truth

Clinical answers are the source of recorded facts.

Outputs, alerts and suggestions are derived views.

They must not create separate competing clinical state.

---

### INV-006 — Suggestions are not decisions

A suggestion must never silently alter:

- assessment
- plan
- referral choice
- treatment
- follow-up

The physician must actively accept any change.

---

### INV-007 — Uncertainty remains visible

The engine must not convert incomplete information into false certainty.

Unknown, unanswered and unvalidated states must remain distinguishable.

---

### INV-008 — Behaviour is reproducible

Identical pathway definitions and identical answer sets must produce identical derived results.

---

### INV-009 — Clinical workflow before feature

No feature may be added unless it supports a defined clinical workflow and provides clear value within that workflow.

---

## 10. Error and edge-case behaviour

### Missing referenced field

If a condition references a nonexistent field, the engine must fail safely.

It must not treat the condition as matched.

Development-time validation should report the invalid reference.

---

### Invalid answer value

If an answer does not match the field contract, the update must be rejected. The previous valid consultation state must remain unchanged, and a development diagnostic must identify the field and invalid value.

Invalid values must never enter consultation state or derived outputs.

---

### Circular visibility dependencies

Pathways must not contain circular visibility rules that prevent stable evaluation.

Structural validation must reject circular visibility dependencies that cannot converge safely. Cycle detection or an equivalent mechanism that guarantees convergence is mandatory.

---

### Active output without generator

An active output without a registered generator must produce a clear development error rather than an empty or misleading clinical document.

---

### Empty generated output

An empty output must not be marked ready.

---

## 11. Validation requirements

The validation requirements in this RFC establish technical engine readiness only. Passing them does not authorize clinical evaluation or clinical use.

Before a pathway implementation can be considered technically ready, it must pass:

### Structural validation

- unique field, section, rule and output IDs
- valid condition references
- valid output generator references
- valid option values
- valid and explicit suggestion display policies
- no unsupported defaults
- no circular visibility dependencies that cannot be guaranteed to converge safely

### Automated engine tests

At minimum:

- empty state remains clinically empty
- explicit answer updates are immutable
- invalid answer updates are rejected without changing the previous valid state
- conditional fields show and hide correctly
- conditional sections show and hide correctly
- hidden answers are pruned to a stable fixed point
- hidden answers do not affect outputs
- rules require explicit matching data
- `truthy` detects an explicit non-empty answer without implying clinical positivity
- suggestions follow the configured pathway display policy and do not imply probability
- inactive outputs are not generated
- active outputs generate deterministically
- empty journals are not ready
- output missing-information checks are reproducible

### Manual browser tests

- changing earlier answers updates the workflow correctly
- removed plan actions deactivate outputs
- generated content contains no stale hidden information
- all generated outputs remain copyable
- keyboard and focus behaviour remain usable
- safety alerts remain understandable and non-blocking

Independently of technical engine acceptance, every pathway requires documented evidence review, regional applicability review, named clinical review and pathway-specific sign-off before clinical evaluation or clinical use.

---

## 12. Migration from the current prototype

Workflow Engine v1 requires the following known improvements:

1. Add automated tests for state, visibility, rules, suggestions, outputs and readiness.
2. Remove knee-specific referral composition from the generic encounter engine.
3. Move pathway-specific output composition into pathway-owned definitions or registered pathway-specific generators.
4. Stabilise encounter identity semantics or explicitly remove identity from the transient engine contract.
5. Add structural pathway validation.
6. Ensure all active clinical defaults have been removed.
7. Improve journal readiness validation.
8. Preserve the current dynamic field, section, PSOAP and output behaviour during refactoring.

These changes should be delivered incrementally through reviewable commits.

---

## 13. Acceptance criteria

Workflow Engine v1 is accepted when:

- the mandatory invariants are enforced
- the active knee pathway passes the agreed automated tests
- generic engine code contains no knee-specific clinical field IDs
- all clinical outputs derive only from explicitly recorded information
- generated draft outputs are deterministic and copyable; in-product editing is not required
- rule and visibility condition semantics are shared and tested
- journal readiness is not unconditional
- the same input always produces the same derived result
- typecheck and production build pass
- the knee pathway continues to pass its documented browser acceptance tests

Acceptance of RFC-005 establishes technical engine readiness only. It does not authorize clinical evaluation or clinical use. Each pathway remains subject to documented evidence review, regional applicability review, named clinical review and pathway-specific sign-off.

---

## 14. Consequences

### Positive

- New pathways can reuse the same engine.
- Clinical logic becomes easier to review.
- Safety-critical behaviour becomes testable.
- Outputs become easier to extend.
- The UI remains independent of disease-specific rules.
- Hidden or default information is less likely to contaminate documentation.

### Costs

- Existing knee-specific output code must be refactored.
- Pathway definitions require stronger validation.
- Automated tests become mandatory.
- Some current contracts may need to change.
- Development may temporarily slow while the engine is hardened.

These costs are accepted because they reduce clinical and architectural risk before pathway expansion.

---

## 15. Decision

Cortex will implement Workflow Engine v1 as a deterministic, pathway-driven and clinically explicit engine.

The engine will derive all workflow behaviour from:

- the active clinical pathway
- explicitly recorded consultation answers

It will not infer clinical facts from defaults.

It will not contain disease-specific clinical logic.

It will not replace physician judgement.

Acceptance of this RFC establishes technical readiness of the workflow engine only. It does not authorize clinical evaluation or clinical use of any pathway. Every pathway still requires documented evidence review, regional applicability review, named clinical review and pathway-specific sign-off.

This RFC becomes the technical contract for the next implementation milestone.
