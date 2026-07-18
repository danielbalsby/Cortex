# Clinical Design Review

Clinical Design Review (CDR) is Cortex's reusable process for evaluating whether a clinical user experience supports safe, efficient, and cognitively manageable work. It examines clinical workflow, interaction design, cognitive load, documentation output, clinical safety, information architecture, accessibility, visual design, and product maturity.

CDR complements—but does not replace—[architecture review](../architecture/README.md), code review, evidence review, formal clinical validation, automated testing, or evaluation with practising clinicians.

## Quick start

1. Confirm that the prototype meets the [review-readiness gate](lifecycle.md#review-readiness-gate).
2. Appoint a Review Chair and relevant [reviewers](reviewer-roles.md).
3. Agree scenarios, evidence requirements, preview expiry, and exclusions.
4. Run the [browser-review protocol](browser-review.md) using the [standard checklist](checklists/standard.md).
5. Record role findings using the [reviewer prompts](prompts/reviewer-prompts.md).
6. Consolidate evidence, scores, blockers, and the decision in the [report template](report-template.md).
7. Convert accepted findings into owned implementation work and repeat review where required.

## Documents

- [Framework and principles](framework.md)
- [Lifecycle and gates](lifecycle.md)
- [Reviewer roles](reviewer-roles.md)
- [Scoring and decisions](scoring.md)
- [Browser-review protocol](browser-review.md)
- [Standard checklist](checklists/standard.md)
- [Reusable reviewer prompts](prompts/reviewer-prompts.md)
- [Official report template](report-template.md)
- [Draft CDR-001: Clinical Document Workspace](examples/CDR-001-Clinical-Document-Workspace.md)

## Identifiers, ownership, and maintenance

Number reviews sequentially (`CDR-001`, `CDR-002`, …). A review keeps its identifier across iterations; record iteration and date in its metadata. The product/design owner maintains the prototype and resulting work, the Review Chair owns review integrity and the consolidated report, and named clinical and safety owners accept relevant decisions. Update this framework through normal documentation review whenever repeated reviews expose a process gap. Never rewrite historical evidence silently; append or clearly version material changes.
