````md
# Cortex Testing Strategy

**Status:** Active  
**Owner:** Cortex  
**Last reviewed:** 2026-07-16

---

## Purpose

This document defines how Cortex is verified.

Cortex combines deterministic software behavior, clinical workflows and clinical content. No single test method can validate all three.

The testing strategy therefore consists of four distinct verification layers:

1. Engine verification
2. Browser regression testing
3. Clinical Design Review
4. Clinical evidence and pathway validation

These layers complement each other. None of them replaces the others.

---

## Core principle

A passing automated test proves only that the tested behavior matches its defined technical expectation.

It does not prove that:

- the clinical content is correct
- the workflow is useful
- the interface is calm or intuitive
- a pathway is safe for clinical use
- a generated document is clinically sufficient

Technical verification and clinical validation must remain separate and explicit.

---

## Layer 1 — Vitest engine verification

Vitest verifies the deterministic contracts of the Cortex Workflow Engine without rendering the user interface.

It owns tests for:

- pathway validation
- answer validation
- complete consultation snapshot validation
- immutable state updates
- conditional field visibility
- conditional section visibility
- fixed-point pruning
- clinical-rule evaluation
- suggestion-policy evaluation
- output activation
- output generation
- PSOAP grouping
- readiness and missing-information results
- deterministic derivation
- generator-registry behavior

### Requirements

Engine tests must:

- run without a browser
- use explicit assertions rather than snapshots where possible
- avoid clinically meaningful defaults
- remain deterministic
- test public contracts rather than incidental implementation details
- include regression coverage for every corrected safety defect

### Vitest does not establish

Vitest does not establish:

- visual correctness
- usable keyboard navigation
- clipboard behavior
- consultation-flow quality
- clinical validity
- evidence quality
- regional applicability

---

## Layer 2 — Playwright browser regression testing

Playwright verifies that the implemented application behaves correctly in a real browser.

It owns tests for:

- interaction with consultation fields
- conditional fields and sections appearing and disappearing
- removal of stale hidden information
- visible alerts and suggestions
- explicit application of suggestions
- dynamic output activation and deactivation
- PSOAP rendering
- readiness feedback
- copy controls
- basic keyboard interaction
- integration between React and the Workflow Engine

### Locator policy

Browser tests should prefer:

1. Accessible roles
2. Accessible labels
3. Stable visible text
4. `data-testid` only when accessible selectors are insufficient

Tests must not depend on fragile CSS structure or arbitrary element positions.

### Browser scope

The initial regression suite uses Chromium.

Firefox and WebKit may be added later when the core suite is stable.

### Failure artifacts

Browser tests should provide:

- an HTML report
- a trace on retry or failure
- screenshots on failure
- enough information to reproduce the failed flow

### Playwright does not establish

Playwright does not establish:

- clinical correctness
- clinical usefulness
- acceptable cognitive load
- evidence validity
- approval for clinical evaluation

A browser flow can work exactly as implemented and still represent a poor clinical workflow.

---

## Layer 3 — Manual Clinical Design Review

Clinical Design Review evaluates whether Cortex supports real clinical work.

It is performed by a clinician and focuses on the experience of using the workflow, not merely whether controls function.

It evaluates:

- whether the consultation sequence feels clinically natural
- whether the interface supports non-linear clinical reasoning
- whether important information appears at the right time
- whether alerts help rather than interrupt
- whether suggestions are understandable and appropriately restrained
- whether generated documentation is useful in practice
- whether the number of clicks and decisions is reasonable
- whether uncertainty remains visible
- whether the workspace feels calm and coherent
- whether the clinician would use the workflow during a busy working day

Clinical Design Review must use synthetic or non-identifiable test information.

No CPR number or other direct patient identifier may be entered.

### Required output

A review should record:

- scenario tested
- observed friction
- clinical omissions
- unclear language
- unnecessary interactions
- output corrections required
- safety concerns
- decision: accepted, revision required or rejected

---

## Layer 4 — Clinical evidence and pathway validation

This layer evaluates the medical validity of pathway content.

It is separate from both engine testing and Clinical Design Review.

It owns verification of:

- clinical rules
- alert criteria
- assessment suggestions
- suggestion display policies
- plan recommendations
- referral requirements
- generated clinical wording
- missing-information requirements
- evidence sources
- guideline versions
- regional applicability
- named clinical review
- pathway-specific sign-off

### Clinical-use boundary

A pathway must not be described as clinically validated merely because:

- unit tests pass
- browser tests pass
- the interface works
- the generated output looks plausible
- a clinician informally tested the workflow

Controlled clinical evaluation requires the separate validation and sign-off defined by the pathway specification and clinical-safety governance.

---

## Pathway-specific acceptance scenarios

Every pathway must define its own acceptance scenarios in its active pathway specification.

For example:

```text
docs/clinical/pathways/KNEE-001-Knee-Pain.md
````

These scenarios should cover:

* empty consultation behavior
* conditional branches
* safety alerts
* assessment suggestions
* plan behavior
* generated outputs
* stale-data removal
* missing-information feedback
* known clinical limitations

Generic engine tests should not replace pathway-specific scenarios.

---

## Test execution

### Fast development verification

Run during normal implementation:

```bash
npm run test
npm run typecheck
```

### Standard code verification

Run before completing a code slice:

```bash
npm run check
```

This should include:

1. Type checking
2. Vitest
3. Production build

### Browser verification

Run when user-facing behavior changes:

```bash
npm run test:e2e
```

### Release-candidate verification

Before merging a significant milestone into `main`, run:

```bash
npm run check:release
```

The release command should include:

1. Type checking
2. Vitest
3. Production build
4. Playwright browser tests

The exact scripts are maintained in `package.json`.

---

## When tests are required

Tests must be added or updated when a change affects:

* engine contracts
* visibility
* consultation state
* validation
* rules
* suggestions
* outputs
* readiness
* pathway behavior
* user-facing workflow
* a previously corrected defect

A bug fix is incomplete until a regression test demonstrates the previous failure and the corrected behavior.

---

## Test data policy

All automated and manual test data must be synthetic.

Tests must not contain:

* CPR numbers
* names of real patients
* real contact information
* identifiable clinical narratives
* copied patient records

Synthetic clinical content should remain realistic enough to exercise the workflow without representing a real individual.

---

## Test design principles

Cortex tests should be:

* deterministic
* focused
* readable
* clinically explicit
* independent
* fast enough for their intended layer
* resistant to irrelevant UI refactoring
* sensitive to safety-relevant behavior changes

Avoid:

* broad snapshots with unclear meaning
* tests that merely repeat implementation structure
* sleeps and arbitrary timing assumptions
* shared mutable test state
* hidden test ordering dependencies
* weakening production behavior to make tests pass

---

## Failure handling

When a test fails:

1. Determine whether the implementation or the expectation is wrong.
2. Do not automatically change clinical behavior to satisfy the test.
3. Compare the failure with the relevant:

   * pathway specification
   * RFC
   * clinical-safety principles
   * acceptance scenario
4. Correct the implementation, test or governing document deliberately.
5. Record safety-relevant defects with regression coverage.

---

## Definition of verified

A significant Cortex change is verified only when:

* relevant Vitest tests pass
* relevant Playwright tests pass
* typecheck passes
* production build passes
* architecture review is complete
* manual Clinical Design Review is complete
* documentation reflects current behavior

Clinical content additionally requires evidence review and pathway-specific clinical sign-off before clinical evaluation.

---

## Relationship to the development workflow

This strategy supports:

```text
docs/governance/DEVELOPMENT-WORKFLOW.md
```

The development workflow defines when verification occurs.

This document defines what each verification layer is responsible for.

```
```
