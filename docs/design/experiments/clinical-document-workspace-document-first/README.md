# Clinical Document Workspace — document-first experiment

This is an isolated UX experiment for Phase 4A. It does not replace the approved Phase 3 prototype or change production workflow behavior.

The experiment tests whether the generated clinical document can be the primary working surface while structured completion controls remain contextual and secondary. It reuses the existing prototype state model, reducer, selectors, validation, and journal generator without adding clinical rules.

The route is `/prototype/clinical-document-workspace-document-first`. Its acute right-knee twisting scenario is synthetic and must not be interpreted as clinical validation.

For CDR-002 preparation, the interface exposes session-level comparison signals for button clicks, active clinical sections, generated-document word count, and the existing clinical overview. These signals describe the current browser session; they are not usability conclusions or clinical evidence.
