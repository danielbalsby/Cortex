# Scoring and decision matrix

Score each evaluated dimension independently. Use `N/E` when not evaluated; never convert it to zero, three, or a pass.

| Score | Definition |
|---:|---|
| 1 | Unsafe or fundamentally unusable; core work fails or creates unacceptable risk. |
| 2 | Major problems materially impede work; substantial redesign is needed. |
| 3 | Direction is credible but significant changes and re-review are required. |
| 4 | Effective with bounded improvements; no unresolved blocker in the dimension. |
| 5 | Strong, evidenced performance for the reviewed scope; strengths should be preserved. |

Score: Clinical workflow; Interaction efficiency; Cognitive load; Clinical overview; Documentation output; Safety; Accessibility; Visual hierarchy; Product maturity.

## Blocking findings

A blocker is an evidenced condition that can cause serious clinical harm, misleading or missing documentation, loss/corruption of clinical state, exposure of sensitive information, inability to complete/recover a core task, or exclusion from a required access path. Severity and rationale are recorded separately from the numeric score.

No mean score can cancel a blocker. Do not calculate an overall average when it would conceal a low or unevaluated safety-relevant dimension.

## Decisions

| Outcome | Objective rule |
|---|---|
| Approve direction | No blocker; core direction is supported; lower-priority changes remain before production evaluation. |
| Approve with changes | No blocker; changes are bounded, owned, and can be verified without redesigning the core interaction. |
| Prototype iteration required | No production progression; one or more core dimensions score 2–3 or important evidence is missing, but the concept remains viable. |
| Major redesign required | A core interaction model is invalid, multiple core dimensions score 1–2, or risk cannot be resolved through bounded iteration. |
| Ready for production evaluation | No blocker; all required dimensions are evaluated at 4 or 5; required evidence and validation plans exist. This authorises evaluation, not launch. |

Any unresolved blocker prevents “Approve direction,” “Approve with changes,” and “Ready for production evaluation.” Safety score 1 or 2 requires at least prototype iteration and explicit Clinical Safety Reviewer disposition. Required `N/E` areas prevent production evaluation.
