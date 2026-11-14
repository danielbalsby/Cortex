# Framework and vision

> CDR evaluates whether the clinical interface supports safe, efficient and cognitively manageable clinical work. It does not merely determine whether the software functions.

## Why Cortex needs CDR

Functionally correct software can still fragment a clinical narrative, hide risk, create unnecessary decisions, or generate misleading documentation. CDR provides a repeatable bridge between prototype implementation and credible clinical product evaluation.

## Principles

1. **Clinical work first.** Judge the end-to-end task, not isolated controls.
2. **Safety outranks polish.** A severe safety finding cannot be averaged away.
3. **Evidence before assertion.** Separate observed behaviour, reviewer interpretation, and recommendation.
4. **Real interaction matters.** Browser use is required for interaction claims.
5. **Preserve strengths.** Record what an iteration must not regress.
6. **Proportionate scope.** Review the relevant roles and scenarios; mark the rest `N/E`.
7. **Traceable action.** Every accepted finding receives an owner, priority, and disposition.

## Evidence discipline

Each finding states the scenario, starting state, reproduction steps, expected and observed result, evidence reference, effect, severity, and confidence. Screenshots, DOM state, generated output, keyboard/focus observations, and session notes are evidence when captured without sensitive data. Assumptions and inference must be labelled. Missing evidence is not positive evidence; use `N/E` for not evaluated.

## Boundaries

CDR does not replace code review, architecture review, evidence review, security testing, formal clinical validation, or testing with practising clinicians. AI reviewers may help apply checklists, identify inconsistencies, and synthesise evidence, but cannot claim lived clinical experience, accessibility conformance, safety approval, or clinical validity. Their output is advisory and must disclose its basis and limitations.

Practising clinicians validate clinical usefulness, language, workflow realism, and unintended consequences in an appropriately governed study. A CDR may recommend that evaluation; it cannot stand in for it.

## From finding to implementation

The Review Chair deduplicates findings without erasing disagreement, confirms evidence and severity, and records accepted, rejected, deferred, or research-needed dispositions. Accepted work enters the normal delivery system with an owner, acceptance criteria, safety relevance, and link to the CDR finding. Blocking findings must be resolved and re-reviewed before the relevant gate can pass.
