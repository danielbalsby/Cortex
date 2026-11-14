# RC-001 – Architecture Review

**Status:** Approved with observations  
**Release:** Foundation 1.0  
**Owner:** Cortex  
**Last reviewed:** 2026-07-16

---

# Purpose

Perform the final architecture review of Workflow Engine v1 before Foundation 1.0.

This review evaluates architecture, maintainability and long-term scalability.

It does **not** evaluate clinical evidence.

---

# Scope

Included

- Workflow Engine
- Consultation Engine
- Validation
- Visibility
- Rule Engine
- Suggestion Engine
- Output Engine
- Output Registry
- Pathway model
- Testing architecture
- Repository structure

Excluded

- Clinical evidence
- Clinical pathways
- Regional applicability
- UI wording

---

# Review checklist

## Vision

- [ ] Consistent with MANIFEST
- [ ] Consistent with CX-001
- [ ] Consistent with MVP-001
- [ ] Consistent with WF-001

---

## Workflow Engine

- [ ] Deterministic
- [ ] Immutable
- [ ] Generic
- [ ] Pure derivation
- [ ] Explicit uncertainty
- [ ] No invented facts
- [ ] Stable validation boundary

---

## Architecture

- [ ] No disease-specific logic in generic engine
- [ ] Pathway-owned clinical behaviour
- [ ] Clear module boundaries
- [ ] No duplicated logic
- [ ] No hidden coupling

---

## API

- [ ] Stable contracts
- [ ] Consistent naming
- [ ] Predictable errors
- [ ] Pure interfaces

---

## Repository

- [ ] Folder structure coherent
- [ ] Documentation complete
- [ ] RFCs current
- [ ] Roadmap still valid

---

## Testing

- [ ] Vitest
- [ ] Playwright
- [ ] Browser regression
- [ ] Testing Strategy implemented

---

# Technical debt

| ID | Description | Priority | Action |
|----|-------------|----------|--------|
| TD-001 | Knee-specific readiness was registered as reusable `core.psoap`. | Important | Resolved: generic PSOAP rendering remains shared; the knee journal and readiness are registered as `knee.psoap`. |
| TD-002 | Generic encounter UI assumed `assessment`, `plan-actions` and `journal` IDs. | Important | Resolved: pathway-declared workflow roles are structurally validated and consumed by the UI. |
| TD-003 | Unused legacy consultation renderer bypassed the validated workflow boundary. | Important | Resolved: the component and empty directory were removed; the active route uses only `EncounterEngine`. |
| TD-004 | New output kinds require coordinated type, validation and icon changes. | Important | Track after Foundation 1.0; extend only when a real output requires it. |
| TD-005 | The condition model supports flat AND with `equals`, `includes` and `truthy`. | Observation | Let acute and chronic pathway work demonstrate the smallest required extension. |
| TD-006 | Release verification is not enforced by repository CI. | Important | Track after Foundation 1.0. |
| TD-007 | Runtime pathway misconfiguration currently surfaces as a React render error. | Minor | Track until operational error handling is defined. |
| TD-008 | `needs-review` exists in the encounter output type without active semantics. | Minor | Remove or define when a concrete workflow requires it. |
| TD-009 | Roadmap wording still lists completed Workflow Engine definition work as immediate. | Minor | Correct in the next approved roadmap revision. |
| TD-010 | Root README wording overstates documentation quality relative to prototype validation. | Minor | Qualify in a later documentation revision. |

---

# Findings

## Strengths

- Mandatory validated runtime derivation boundary.
- Deterministic, immutable workflow derivation and stable hidden-answer pruning.
- Pathway-owned clinical content and output composition.
- Shared condition semantics with explainable rules and non-probabilistic suggestions.
- Explicit workflow roles remove pathway field identifiers from the generic workspace.
- Vitest engine coverage and Chromium browser regression coverage.

---

## Weaknesses

- Output kinds and condition semantics remain intentionally narrow.
- Release verification is local rather than CI-enforced.
- Operational handling of invalid pathway configuration is not yet defined.

---

## Required changes

TD-001, TD-002 and TD-003 were the narrowly scoped cleanup required before the next pathway. They are resolved in the implementation under review. Remaining items are observations and follow-up work, not Foundation 1.0 approval blockers.

---

# Decision

- [ ] Approved
- [x] Approved with observations
- [ ] Changes required

---

# Sign-off

Architecture reviewer: Cortex Architecture Review

Date: 2026-07-16

Commit: 35e60e2

Tag: foundation-1.0
