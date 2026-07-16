# Cortex Development Workflow

**Status:** Foundational  
**Owner:** Cortex  
**Last reviewed:** 2026-07-16

---

# Purpose

This document defines how Cortex is developed.

Its purpose is not to describe the software itself, but the process used to design, build, review and evolve it.

Every significant change to Cortex follows this workflow.

---

# Core Principle

Cortex is developed **document-first**.

Software follows architecture.

Architecture follows product design.

Product design follows the vision.

Code is never the source of truth.

---

# Canonical hierarchy

Development follows this order.

1. Vision
2. Product Design
3. Architecture
4. Implementation
5. Verification
6. Merge

Higher levels always override lower levels.

---

# Development lifecycle

Every meaningful feature follows the same sequence.
Idea
↓

Product discussion

↓

Architecture / RFC

↓

Implementation

↓

Automated verification

↓

Architecture review

↓

Manual clinical review

↓

Merge to main

No step may be skipped.

---

# Phase 1 — Product

Purpose:

Define **what** should be built.

Questions answered:

- Why does this feature exist?
- Which clinical problem does it solve?
- Does it support the Cortex vision?
- Is it MVP?
- Does it belong in Cortex?

Outputs:

- Product discussion
- Vision updates (rare)
- Roadmap changes
- Workflow decisions

No code is written during this phase.

---

# Phase 2 — Architecture

Purpose:

Define **how** the feature should be built.

Questions answered:

- Where does it belong?
- What abstractions are required?
- Which invariants must hold?
- Which technical debt is avoided?
- How is safety preserved?

Outputs:

- RFC
- Architecture updates
- Acceptance criteria

No implementation begins before architecture is approved.

---

# Phase 3 — Build

Purpose:

Implement the approved design.

Responsibilities:

- Write code
- Refactor
- Add tests
- Update implementation documentation
- Keep build green

Implementation must follow the approved RFC.

If implementation reveals architectural problems,
the work returns to Phase 2.

Build does not redefine architecture.

---

# Phase 4 — Automated Verification

Every implementation must pass:

- Unit tests
- Type checking
- Production build

Additional tests are added whenever appropriate.

The responsibilities of engine tests, browser regression tests, manual review and clinical validation are defined in the [Testing Strategy](./TESTING-STRATEGY.md).

A feature is not complete because it works.

It is complete when it is reproducibly verified.

---

# Phase 5 — Architecture Review

Every significant implementation receives an independent review.

The review evaluates:

- Simplicity
- Maintainability
- Technical debt
- Genericity
- Clinical safety
- Alignment with architecture

Passing tests do not imply approval.

Architecture remains the primary acceptance criterion.

---

# Phase 6 — Manual Clinical Review

Technical correctness is necessary.

Clinical usefulness must still be demonstrated.

Manual review evaluates:

- Workflow
- Cognitive load
- Documentation quality
- Consultation flow
- Clinical usefulness
- User experience

Only practising clinicians can approve this phase.

---

# Phase 7 — Merge

A branch may be merged only when:

- RFC is approved
- Tests pass
- Build passes
- Architecture review passes
- Manual workflow review passes

Only then may the feature enter main.

---

# Roles

## Product

Owns:

- Vision
- Product
- Clinical workflow
- Priorities

Decides:

"What should we build?"

---

## Architecture

Owns:

- Technical direction
- RFCs
- Long-term design
- Reviews

Decides:

"How should we build it?"

---

## Build

Owns:

- Implementation
- Tests
- Refactoring
- Build quality

Answers:

"Can we build it correctly?"

---

# Documentation-first development

Every significant feature should have:

- Purpose
- RFC
- Acceptance criteria
- Tests

before implementation begins.

---

# Branch strategy

One major milestone per feature branch.

Examples:

- Workflow Engine v1
- Acute Pathways
- Chronic Care
- AI Workspace

Each branch has one primary Build conversation.

Completed branches are merged and archived.

---

# Definition of Done

A feature is complete only when:

- Product goal is achieved.
- Architecture is respected.
- Tests pass.
- Browser behaviour is verified.
- Documentation is updated.
- Review is approved.

Completion is not measured by code written.

Completion is measured by confidence.

---

# Long-term philosophy

Cortex is intended to evolve for many years.

The development process must therefore prioritise:

- clarity over speed
- architecture over convenience
- simplicity over cleverness
- safety over novelty
- workflow over features

Every new contribution should make Cortex easier to extend,
not harder.
