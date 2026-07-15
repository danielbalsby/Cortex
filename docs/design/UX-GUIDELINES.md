# UX Guidelines

**Status:** Active  
**Owner:** Cortex  
**Last reviewed:** 2026-07-15

These rules translate the canonical consultation experience and workflow into concrete design constraints.

1. **Calm by default.** Use whitespace, restrained color and concise language; every emphasis must earn attention.
2. **Progressively disclose information.** Show a field, message or output only when the recorded consultation state makes it relevant.
3. **Keep one coherent workspace.** Clinical input, feedback and outputs should remain in one understandable context.
4. **Never force a wizard flow.** Clinicians must be able to revisit and change earlier information without completing artificial steps.
5. **Preserve physician control.** Suggestions are optional, reversible and never selected automatically.
6. **Minimise interruption.** Prefer inline, non-blocking feedback; reserve interruption for safety-critical needs.
7. **Use clinically meaningful hierarchy.** Safety-critical information comes first, active work second and supplementary detail last.
8. **Generate outputs from existing information.** Never request duplicate entry solely to populate a document.
9. **Represent uncertainty explicitly.** Distinguish missing, uncertain, suggested and confirmed information; never present rule matches as probability.
10. **Start clinically empty.** No clinical finding, negative answer, diagnosis, plan or safety-net advice may be preconfirmed.
11. **Keep status understandable.** Readiness and missing-information messages must explain what is incomplete without blocking clinical judgement.
12. **Support keyboard efficiency.** All controls require visible focus, logical tab order and keyboard activation.
13. **Meet accessibility basics.** Preserve semantic controls, readable contrast, scalable text and non-color status cues.
14. **Avoid unnecessary motion.** Animation may clarify a state change but must not decorate, distract or delay work.
15. **Prevent alarm fatigue.** Alerts must be clinically relevant, concise, explainable and visually proportional to severity.
16. **Keep copy actions deliberate.** Identify the selected output and remind the clinician that drafts require review before EHR use.
17. **Do not hide recorded consequences.** If changing an answer removes dependent information, the resulting state and outputs must update predictably.
18. **Test with clinical tasks.** Evaluate designs using complete consultation scenarios, including uncertainty, red flags and incomplete outputs.

See [`CLINICAL-WORKSPACE.md`](CLINICAL-WORKSPACE.md) for the prototype workspace model.

