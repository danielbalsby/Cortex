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
6. Generate non-probabilistic clinical suggestions.
7. Activate outputs declaratively from pathway definitions.
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
- edit every generated output

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
- identifying missing or contradictory findings where modelled
- presenting support without implying diagnostic probability

Raw rule-match percentages must not be shown as diagnostic confidence.

Prefer language such as:

- `2 of 3 supporting findings recorded`
- `Supporting findings present`
- `Further information required`

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
- returning editable draft text
- ensuring outputs contain only recorded information

The journal may be always active.

Other outputs should activate according to pathway-defined conditions or explicit physician choices.

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

Pruning must converge to a stable answer set.

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

If an answer does not match the field contract, the engine should reject or ignore it and expose a development error.

It must not silently convert the value into a clinical fact.

---

### Circular visibility dependencies

Pathways must not contain circular visibility rules that prevent stable evaluation.

A validation step should detect cycles where practical.

---

### Active output without generator

An active output without a registered generator must produce a clear development error rather than an empty or misleading clinical document.

---

### Empty generated output

An empty output must not be marked ready.

---

## 11. Validation requirements

Before a pathway can be used in controlled clinical evaluation, it must pass:

### Structural validation

- unique field, section, rule and output IDs
- valid condition references
- valid output generator references
- valid option values
- no unsupported defaults
- no unresolved circular visibility dependencies

### Automated engine tests

At minimum:

- empty state remains clinically empty
- explicit answer updates are immutable
- conditional fields show and hide correctly
- conditional sections show and hide correctly
- hidden answers are pruned
- hidden answers do not affect outputs
- rules require explicit matching data
- suggestions do not imply probability
- inactive outputs are not generated
- active outputs generate deterministically
- empty journals are not ready
- output missing-information checks are reproducible

### Manual browser tests

- changing earlier answers updates the workflow correctly
- removed plan actions deactivate outputs
- generated content contains no stale hidden information
- all outputs remain editable and copyable
- keyboard and focus behaviour remain usable
- safety alerts remain understandable and non-blocking

---

## 12. Migration from the current prototype

Workflow Engine v1 requires the following known improvements:

1. Add automated tests for state, visibility, rules, suggestions, outputs and readiness.
2. Remove knee-specific referral composition from the generic encounter engine.
3. Move pathway-specific output composition into pathway-owned definitions or registered pathway-specific generators.
4. Consolidate duplicated condition evaluation.
5. Stabilise encounter identity semantics or explicitly remove identity from the transient engine contract.
6. Add structural pathway validation.
7. Ensure all active clinical defaults have been removed.
8. Improve journal readiness validation.
9. Preserve the current dynamic field, section, PSOAP and output behaviour during refactoring.

These changes should be delivered incrementally through reviewable commits.

---

## 13. Acceptance criteria

Workflow Engine v1 is accepted when:

- the mandatory invariants are enforced
- the active knee pathway passes the agreed automated tests
- generic engine code contains no knee-specific clinical field IDs
- all clinical outputs derive only from explicitly recorded information
- rule and visibility condition semantics are shared and tested
- journal readiness is not unconditional
- the same input always produces the same derived result
- typecheck and production build pass
- the knee pathway continues to pass its documented browser acceptance tests

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

This RFC becomes the technical contract for the next implementation milestone.