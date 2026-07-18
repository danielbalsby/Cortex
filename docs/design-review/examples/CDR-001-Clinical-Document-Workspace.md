# CDR-001: Clinical Document Workspace (draft)

## Metadata and limitations

| Field | Value |
|---|---|
| Status | Draft; not a completed browser review |
| Iteration | 1 |
| Prototype / commit | N/E |
| Preview URL / expiry | N/E |
| Browser scenarios | N/E |
| Screenshot / DOM evidence | N/E |
| Practising-clinician validation | N/E |

This draft consolidates established observations supplied before a formal CDR. It contains no invented measurements, screenshots, click counts, accessibility results, or clinical-validation claims. All aspects not actually browser-tested are `N/E`.

## Review scope

Concept direction, reported interaction/design issues, and reported journal-output behaviour. Browser interaction, accessibility, performance, responsive behaviour, failure recovery, safety testing, and formal clinical validation are `N/E`.

## Strengths to preserve

- Generated journal output is substantially improved.
- Grouped confirmation of normal findings works well.
- Limiting visible diagnostic suggestions to three is useful.
- Quick and Standard modes are directionally useful.
- The core concept of the clinical document as workspace remains promising.

## Consolidated findings

| Priority | Established observation | Required direction |
|---|---|---|
| High | The interface feels like a form rather than a clinical document; hierarchy and clinical overview are weak. | Redesign around a readable clinical narrative and persistent overview. |
| High | Text is too small; excessive whitespace and separate cards reduce useful density. | Rework typography, density, grouping, and card use. |
| High | Too many small decisions and too much scrolling make the prototype unsuitable for a busy consultation. | Reduce decision granularity and redesign the interaction/navigation model, including fast keyboard navigation. |
| Medium | The `Problem` section is redundant. | Automatically document `Problem: Knæsmerte`. |
| Medium | Distinguishing `knæsmerte` from `knæskade` is not useful here. | Remove this decision from the reviewed flow. |
| Medium | Pain pattern lacks constant/intermittent options. | Add concise, clinically appropriate options. |
| Medium | Trauma mechanism is too constrained. | Add relevant options and free text. |
| Medium | Onset choices lack concise definitions. | Define choices such as acute and gradual. |
| High | Multiple concurrent working diagnoses cannot be selected. | Support multiple working diagnoses and faithful output. |
| High | Imaging output is too passive and vague. | Make recorded imaging intent/status explicit without inventing a plan. |

## Scorecard

| Dimension | Score | Rationale |
|---|---:|---|
| Clinical workflow | 2 | Established observations indicate excessive decisions/scrolling and poor consultation fit; browser verification remains required. |
| Interaction efficiency | 2 | Redesign and fast navigation are required; measured click/keyboard evidence is N/E. |
| Cognitive load | 2 | Decision granularity and weak hierarchy are material concerns. |
| Clinical overview | 2 | The interface is reported to read as a form rather than a document. |
| Documentation output | 4 | Reported as substantially improved; detailed output scenarios are N/E. |
| Safety | N/E | No completed safety/browser evaluation. |
| Accessibility | N/E | No accessibility evaluation. |
| Visual hierarchy | 2 | Small text, whitespace, cards, and weak hierarchy require redesign. |
| Product maturity | 2 | Not yet suitable for a busy consultation. |

## Decision

**Prototype iteration required**

Preserve the core workspace concept, journal generation, and grouped normal confirmation. Redesign the interaction model, density, hierarchy, navigation, and decision granularity before a repeat browser-based CDR.

This decision does not approve clinical validity, safety, accessibility, or production readiness. Those areas remain `N/E`.

## Next review

Run the [browser protocol](../browser-review.md) from empty state with realistic synthetic scenarios, multiple diagnoses, normal/positive overrides, incomplete fields, imaging and plan variations, keyboard navigation, supported viewports, and journal inspection. Capture evidence and replace `N/E` only where evaluation was actually completed.
