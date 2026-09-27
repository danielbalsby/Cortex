# Sprint 1.2 C2.2 Evaluation Baseline v1.0

**Status:** EVALUATION BASELINE — SYNTHETIC PROTOTYPE ONLY  
**Recorded:** 2026-07-29  
**Branch:** `prototype/sprint-0`  
**Git base/HEAD:** `01eb5dbf63a791b1e93913d8fb07ff8bf8148814` (`Lock Sprint 1.1 prototype baseline`)  
**Route:** `/prototype/sprint-1-2-c2-2`

This record identifies the uncommitted local C2.2 evaluation artifacts. It is
not a release, clinical-validation, clinical-readiness or Build-completion
claim. Only synthetic data may be used.

## Comparator set

| Comparator | Route |
|---|---|
| C0 | `/prototype/sprint-1-1` |
| C1 | `/prototype/sprint-1-2` |
| C2 | `/prototype/sprint-1-2-c2` |
| C2.1 | `/prototype/sprint-1-2-c2-1` |
| C2.2 | `/prototype/sprint-1-2-c2-2` |

C2.2 imports the unchanged Sprint 1.1 clinical state, reducer, fixture,
completeness derivation and journal generator. Its only contextual clinical
control edits the existing `Smerteplacering` fact through the existing reducer
action. Narrative text remains display output and is never parsed into clinical
state.

## Artifact identity

| Artifact | SHA-256 |
|---|---|
| `app/prototype/sprint-1-2-c2-2/page.tsx` | `46c5a6773c62af26314d32c63ab8f1dee635b400df1359d519bba046874606a0` |
| `components/prototype/sprint-1-2-c2-2/README.md` | `fa0685016815301f0bc100b25b69c494e88fed3256f2019965e1ebd217171dc1` |
| `components/prototype/sprint-1-2-c2-2/SprintOneTwoC22Prototype.module.css` | `c657ce0a69fa54b59d738e84cd8ab122fb2d15941dfc7e1551a154e3ac8c2775` |
| `components/prototype/sprint-1-2-c2-2/SprintOneTwoC22Prototype.tsx` | `150c14593bc79fe16b82e45e097b147069e073578f973f3c9069de0c39925180` |
| `e2e/sprint-one-two-c2-2.spec.ts` | `94fa323a674160686778abfd0e5789fafda6a49e29e42a269ea71c426e9d22e2` |

This record is excluded from its own artifact checksum set.

## Verification

- Focused C2.2 Playwright: 10/10 passed without retry.
- Full Playwright regression: 72/72 passed.
- Vitest: 186/186 passed.
- Typecheck: passed.
- Production build: passed; C2.2 generated as static content.
- `git diff --check`: passed.
- C2, C2.1 and C2.2 routes: HTTP 200 on `127.0.0.1:3000`.
- All five checksum-locked C2 artifacts and all five C2.1 artifacts match
  their respective baseline records.

The initial focused run exposed a development-preview cold-start timeout while
loading the C2 control route. The product passed on retry; the C2.2 parity test
was given a route-specific 60-second navigation timeout, after which the focused
and complete suites passed without retries.

## Known limitations

- C2.2 tests one contextual correction only: `Smerteplacering`. All other
  clinical facts remain in the existing C2 editor.
- Recovery uses one local presentation-state copy. A second recovery-producing
  parent change is blocked until the clinician explicitly restores or discards
  the first copy; no recovery queue exists.
- The comparator uses one synthetic knee case and does not establish usability,
  reduced cognitive load, accessibility conformance, clinical safety or
  clinical validity.
- No clinical suggestions, plan support, referral output, AI, EHR integration
  or new clinical rules are included.
- The artifacts and this record remain uncommitted; reproducibility is local
  and checksum-based until a commit is separately authorised.
