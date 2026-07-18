# Lifecycle and decision gates

`Prototype → review readiness gate → browser-based CDR → consolidated findings → prototype iteration → repeat review → production readiness decision → post-launch review`

## Prototype

Define the intended users, clinical task, scope, risks, and realistic synthetic scenarios. Record the commit or immutable build under review.

## Review-readiness gate

### Entry criteria

- Named owner and Review Chair
- Isolated, time-limited preview with synthetic data only
- Stable route and supported browsers/viewports identified
- Core scenario can be completed without known blocking build errors
- Intended behaviour, exclusions, and known limitations documented
- Generated documentation can be inspected

Build or HTTP checks may support readiness but do not prove interaction quality.

### Exit criteria

The Chair confirms reviewers, scenarios, access, evidence capture, expiry, and stopping rules. If unsafe data handling, route exposure, broken access control, or an unusable core path is found, stop and remediate before review.

## Browser-based CDR

Reviewers start from empty state, execute assigned scenarios, and capture evidence under the [browser protocol](browser-review.md). Untested dimensions are `N/E`; they must not be scored as neutral or passed.

## Consolidated findings

The Chair verifies evidence, preserves conflicts, applies [decision rules](scoring.md), identifies strengths, and assigns actions. Exit requires a complete report, explicit blockers, limitations, and an accountable decision record.

## Iteration and repeat review

The team changes the prototype and records finding dispositions. Re-review all blockers, changed flows, affected outputs, and regression-sensitive strengths. Stop iteration if the concept is invalidated, a blocker cannot be safely explored in the preview, or required clinical/evidence input is unavailable.

## Production-readiness decision

Production evaluation requires no unresolved blocking finding, required dimensions evaluated, traceable evidence, agreed clinical validation plan, and operational/security work appropriate to the product stage. Passing CDR is not production approval.

## Post-launch review

Review real-world feedback, safety signals, workflow outcomes, accessibility issues, and documentation quality under approved governance. Do not put production patient data into CDR artifacts.

## Cleanup

After evidence is retained appropriately, revoke deployment-specific access, remove temporary routes and preview infrastructure, expire credentials, and record cleanup owner/date. Cleanup failure is an open review action.
