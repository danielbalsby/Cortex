# Cortex Product Roadmap

**Status:** Active  
**Owner:** Cortex  
**Last reviewed:** 2026-07-15

## Canonical basis

This roadmap executes the product direction defined by:

- [`MANIFEST.md`](../vision/MANIFEST.md)
- [`CX-001 – The Perfect Consultation`](../vision/CX-001-The-Perfect-Consultation.md)
- [`MVP-001 – The First Clinical Product`](../vision/MVP-001-The-First-Clinical-Product.md)
- [`WF-001 – The Consultation Workflow`](../vision/WF-001-The-Consultation-Workflow.md)

## Current milestone

Deliver a controlled, clinically reviewed prototype that demonstrates one reusable Workflow Engine across a coherent knee pathway, one acute pathway and one chronic-care pathway.

## Goal before 1 November 2026

Target milestone: Prototype 0.1

Prepare a prototype suitable for controlled evaluation by the founder and a small number of practising clinicians. It must be technically stable, explicit about uncertainty, safe against invented clinical facts, and useful enough to test consultation flow and output quality. It is not a production release or approval for unsupervised clinical use.

## Current validation goals

- Verify that an empty consultation remains clinically empty.
- Verify that adaptive visibility follows explicit recorded answers.
- Verify that journal and referral drafts reuse consultation information without inventing facts.
- Verify that alerts, suggestions and missing-information feedback are understandable and non-blocking.
- Measure consultation speed, editing burden, click burden and clinician-reported cognitive load.
- Establish whether the generic architecture can support distinct workflow patterns without disease-specific UI logic.

## Work completed

- Canonical vision and workflow foundation established.
- Generic pathway, visibility, rule, suggestion and output contracts implemented.
- Knee-pain prototype implemented with PSOAP output and dynamic referral drafts.
- Rule-based clinical alerts, assessment suggestions and output-readiness feedback implemented.
- Unconfirmed clinical defaults removed from initial consultation state.
- Documentation structure reorganised around vision, governance, architecture, product, clinical and design concerns.

Completion here describes implementation only; it does not imply clinical validation.

## Product sequence

1. Stabilise Workflow Engine v1.
2. Make the knee pathway clinically coherent and testable.
3. Validate the generic architecture with an acute pathway.
4. Validate it with a chronic-care pathway.
5. Improve consultation speed, output quality and usability.
6. Prepare a controlled clinical prototype.

## Required before prototype use

- Source and clinically review every knee alert, suggestion, plan recommendation and referral requirement.
- Define regional applicability and record source versions.
- Add repeatable tests for state integrity, visibility, clinical rules, suggestions, outputs and readiness checks.
- Resolve safety-critical known limitations in the knee specification.
- Establish a clinical review and sign-off record for each included pathway.
- Clinically review all generated journal and referral templates for accuracy, omission risk, tone and unsupported statements.
- Complete privacy, data-handling and operational risk review for the intended evaluation setting.
- Confirm that the workflow does not require CPR numbers or other direct patient identifiers.
- Confirm typecheck and production build stability.
- Run structured browser acceptance tests with no patient-identifiable data.

## Useful before prototype use

- Improve keyboard navigation and visible focus behavior.
- Measure output editing time and identify repeated manual corrections.
- Refine concise missing-information wording with clinician feedback.
- Document a lightweight pathway authoring and review workflow.
- Improve accessibility checks and responsive behavior.

## Immediate priorities

1. Clinically review and test `KNEE-001` against its implementation.
2. Define Workflow Engine v1 invariants and automated coverage.
3. Select a narrow acute pathway that tests a materially different consultation pattern.
4. Select a narrow chronic-care pathway only after the acute-pathway architecture review.
5. Define the controlled prototype evaluation protocol and success measures.

## Near-term milestones

### Workflow Engine v1 stable

State initialization, conditional visibility, rule evaluation, suggestions, dynamic outputs and readiness checks are deterministic, reproducible and covered by repeatable tests.

### Knee pathway review complete

Clinical content has named reviewers, documented sources, regional scope and passed safety-focused acceptance tests.

### Acute architecture validation

An acute pathway works without placing disease-specific clinical logic in generic React components or duplicating the engine.

### Chronic-care architecture validation

A chronic pathway demonstrates longitudinal or review-oriented workflow needs without weakening the universal workflow model.

### Controlled prototype ready

Included pathways, outputs, safety limitations, evaluation procedures and clinician responsibilities are documented and reviewed.

## Expansion gates

- Do not begin the acute pathway until Workflow Engine v1 behavior and knee-pathway risks are documented and testable.
- Do not begin the chronic-care pathway until the acute pathway has completed an architecture review.
- Do not add further pathways until the acute and chronic validations show that the shared architecture can be reused without major redesign.
- Do not use a pathway in clinical evaluation until its rules, recommendations, output requirements and regional applicability have been clinically reviewed.
- Do not describe the prototype as clinically ready until the controlled-use requirements above are complete.

## Deferred until after initial clinical learning

- Additional musculoskeletal pathways beyond those needed for architecture validation.
- Broad pathway coverage, mental-health pathways and preventive-care pathways.
- Advanced AI assistance or generative clinical decision support.
- Automated patient information, certificates and medication-plan expansion.
- Workflow optimisation based on larger-scale usage data.

## Out of scope

- Replacing the electronic health record.
- Patient database or longitudinal record ownership.
- Storage of CPR numbers or other direct patient identifiers.
- Scheduling, billing, prescribing or autonomous messaging.
- Autonomous diagnosis, investigation, treatment or referral decisions.
- Unsupervised real-world clinical deployment before validation and governance are complete.
