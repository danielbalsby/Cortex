# CONSTITUTION.md

# Cortex Engineering Constitution

This document defines how Cortex is engineered.

It is the highest-level engineering document in the repository.

All contributors — human or AI — must follow these rules.

If implementation conflicts with this document, this document takes precedence.

---

# Mission

Build software that reduces administrative burden in Danish general practice.

The primary success metric is:

> More time with the patient.

Every implementation should move Cortex closer to this goal.

---

# Required Reading

Before changing code, read:

1. docs/PRODUCT_PRINCIPLES.md
2. docs/CLINICAL_PRINCIPLES.md
3. docs/ARCHITECTURE.md

These documents define the product philosophy, clinical philosophy and architecture.

---

# Engineering Priorities

When making decisions, always follow this order:

1. Patient safety
2. Clinical workflow
3. Simplicity
4. Maintainability
5. Performance
6. New functionality

Never sacrifice a higher priority to improve a lower one.

---

# Architectural Invariants

The following rules are absolute.

They are never intentionally violated.

---

## Invariant 0

### Software should disappear.

The clinician should think about the patient.

Never about Cortex.

Every feature should reduce attention paid to the software itself.

---

## Invariant 1

### The consultation is the product.

Documentation is a consequence.

Never design the consultation around documentation.

Always design documentation around the consultation.

---

## Invariant 2

### One clinical input.

Clinical information is entered exactly once.

Every other document is generated from the same structured encounter.

Never duplicate clinical state.

---

## Invariant 3

### One Encounter Engine.

All outputs originate from the Encounter Engine.

Never create workflow-specific generators.

Examples:

- Journal
- Imaging referral
- Physiotherapy referral
- Specialist referral
- Patient information
- Follow-up plan
- Certificates

---

## Invariant 4

### Clinical reasoning never belongs in UI.

React components render.

They never perform:

- diagnostic reasoning
- referral decisions
- guideline interpretation
- clinical scoring

Clinical reasoning belongs only inside:

clinical/
engine/

---

## Invariant 5

### AI never makes clinical decisions.

AI may:

- summarise
- structure
- explain
- suggest
- identify missing information

AI never:

- diagnose
- prescribe
- refer
- order investigations

without explicit clinician confirmation.

---

## Invariant 6

### Every recommendation must be explainable.

Clinical recommendations must always be transparent.

Every recommendation should be traceable to:

- clinical evidence
- explicit rules
- structured clinical findings

Avoid black-box behaviour.

---

## Invariant 7

### Workflow before features.

Never implement a feature because it is technically interesting.

Only implement features that improve the clinical workflow.

---

## Invariant 8

### Simplicity beats completeness.

Every added control increases cognitive load.

Always prefer:

- fewer clicks
- fewer fields
- fewer decisions

Over more flexibility.

---

# Repository Responsibilities

## app/

Application shell.

No clinical logic.

---

## components/

Reusable UI.

No clinical reasoning.

---

## clinical/

Clinical pathways.

Clinical models.

Evidence-based rules.

Decision criteria.

---

## engine/

Encounter Engine.

Output generation.

Rule evaluation.

Decision support.

Structured encounter processing.

---

## docs/

Documentation only.

---

# User Experience Rules

The consultation must never be interrupted.

Avoid:

- popup windows
- modal dialogs
- confirmation dialogs
- multi-step wizards

Prefer:

- inline editing
- collapsible sections
- sticky information
- progressive disclosure

Everything updates live.

The clinician should never press:

- Save
- Generate
- Refresh

---

# Clinical Decision Support

Decision support should be:

- evidence based
- transparent
- dismissible
- contextual
- non-blocking

Decision support assists.

It never controls.

---

# Coding Principles

Prefer:

- readable code
- deterministic behaviour
- explicit state
- small functions
- composition over complexity

Avoid:

- duplicated logic
- hidden state
- unnecessary abstractions
- premature optimisation

Delete complexity before adding features.

---

# No Feature Without Clinical Workflow

No implementation begins with code.

Every feature starts with a workflow specification.

Every specification must define:

## Clinical Problem

Which real problem in general practice is solved?

---

## User

Who performs the workflow?

GP?

Practice nurse?

Secretary?

---

## Workflow

Describe the complete consultation flow.

Patient arrives.

Consultation.

Assessment.

Outputs.

Completion.

---

## Clinical Inputs

Which structured information is collected?

Can existing inputs be reused?

Never collect the same information twice.

---

## Outputs

Which outputs are generated?

Examples:

- Journal
- Imaging referral
- Physiotherapy referral
- Specialist referral
- Patient information
- Follow-up
- Certificates

---

## Clinical Value

Explain how the feature reduces:

- administrative work
- clicks
- cognitive load
- documentation
- clinical risk

---

## Acceptance Criteria

Describe how a practising GP can verify that the feature improves workflow.

If this cannot be described, the feature should not be built.

---

# Testing Requirements

Every feature should include:

- Happy path
- Edge case
- Clinical safety case

Clinical rules should be independently testable.

Before completion:

npm run typecheck

npm run build

must pass without errors.

---

# Pull Requests

Every Pull Request must describe:

- Clinical problem
- Workflow impact
- Outputs affected
- Architectural impact
- Risks
- Test results

---

# Definition of Done

A feature is complete only when:

✓ PRODUCT_PRINCIPLES remain satisfied

✓ Architectural Invariants remain satisfied

✓ Clinical workflow is simpler than before

✓ No duplicate documentation has been introduced

✓ Build passes

✓ Type checking passes

✓ Documentation has been updated

✓ The feature can be explained to a GP in less than two minutes

---

# Final Rule

When uncertain, remove complexity.

The best feature is often the one that no longer needs to exist.
