# Browser-review protocol

## Secure setup

- Use synthetic data only in an isolated preview deployment.
- Enforce strict route isolation and temporary deployment-specific access.
- Never place secrets, production credentials, or production patient data in the preview or evidence.
- Record commit/build, URL, expiry, routes, browsers, supported viewports, scenarios, and cleanup owner.

## Execution

1. Begin from empty state and confirm the expected route and viewport.
2. Manually complete realistic positive, negative, incomplete, and correction scenarios.
3. Observe clicks, scrolling, focus, state transitions, errors, recovery, and unexpected persistence.
4. Test supported viewports, keyboard-only operation, visible focus, logical order, and responsive reflow.
5. Capture minimal synthetic screenshots and, where useful, DOM/state evidence with timestamps and scenario identifiers.
6. Inspect generated journal output after each meaningful variation, including omissions, overrides, diagnoses, plan, and referral language.
7. Separate direct observation from inference; record steps that another reviewer can reproduce.
8. Mark any untested area `N/E`.

HTTP success, build success, unit tests, and static inspection are not substitutes for browser interaction testing.

## Evidence and cleanup

Store evidence in the approved review location, redact accidental sensitive content, and link it from findings. After review, revoke temporary access, remove isolated routes/deployments, expire deployment credentials, and record completion in the report. Escalate any suspected data exposure immediately and stop the review.
