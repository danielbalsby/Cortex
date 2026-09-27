# Sprint 1.2 C2.1 Evaluation Baseline v1.0

**Status:** EVALUATION BASELINE — SYNTHETIC PROTOTYPE ONLY  
**Recorded:** 2026-07-23  
**Branch:** `prototype/sprint-0`  
**Git base/HEAD:** `01eb5dbf63a791b1e93913d8fb07ff8bf8148814` (`Lock Sprint 1.1 prototype baseline`)  
**Route:** `/prototype/sprint-1-2-c2-1`

This record identifies the uncommitted local C2.1 evaluation artifacts. It is not a release, clinical-validation, clinical-readiness or Build-completion claim. Only synthetic data may be used.

## Comparator set

| Comparator | Route |
|---|---|
| C0 | `/prototype/sprint-1-1` |
| C1 | `/prototype/sprint-1-2` |
| C2 | `/prototype/sprint-1-2-c2` |
| C2.1 | `/prototype/sprint-1-2-c2-1` |

C2.1 imports the unchanged Sprint 1.1 clinical state, reducer, fixture, completeness derivation and journal generator. Inline controls dispatch existing actions only. Manual journal overrides and recovery copies remain local presentation state and are never reverse-parsed into clinical state.

## Artifact identity

| Artifact | SHA-256 |
|---|---|
| `app/prototype/sprint-1-2-c2-1/page.tsx` | `1a54df55d397490ec780046e6a4df5e018d9f8043385719d669d8255d7c4130c` |
| `components/prototype/sprint-1-2-c2-1/README.md` | `7bb85b66f48a56e91bf704caa07af8582f1c87f6e97159e0aa08582e20e06f5f` |
| `components/prototype/sprint-1-2-c2-1/SprintOneTwoC21Prototype.module.css` | `81a5a143597ab54326ba9a6b77dc494c8878b887e73e0f412cdb13b4b82b1b1f` |
| `components/prototype/sprint-1-2-c2-1/SprintOneTwoC21Prototype.tsx` | `619bafafd0c00e3355e0f18ea85f1947405421511d5e79c5323e95189dba07ea` |
| `e2e/sprint-one-two-c2-1.spec.ts` | `1b938c1eba971816acbc2805e153a87cc113c263b07eb3c8e6c87650c7161c8a` |

This record is excluded from its own artifact checksum set.

## Verification

- Preview routes C2 and C2.1: HTTP 200 on `localhost:3000`.
- Focused C2.1 Playwright: 9/9 passed.
- Full Playwright regression: 62/62 passed.
- Vitest: 186/186 passed.
- Typecheck: passed.
- Production build: passed; C2.1 generated as static content.
- `git diff --check`: passed.
- Checksum-locked C2 artifacts: all five checksums match the C2 baseline record.

## Gate corrections

- The free-text test now commits through actual blur/Tab before asserting state output.
- C2.1 inline selects handle ArrowUp/ArrowDown deterministically and continue to dispatch the existing reducer action without changing option meaning or cardinality.

## Known limitations

- C2.1 covers Anamnese and Objektivt only; Vurdering and Plan are intentionally not expanded.
- Recovery copies are local presentation state, not active clinical facts, and require explicit restoration or dismissal.
- The prototype uses one synthetic knee case and does not establish usability, reduced cognitive load, accessibility conformance, clinical safety or clinical validity.
- No referral generator, referral inputs, recipient mapping, clinical suggestions, treatment support, AI or EHR integration is implemented.
- The artifacts and this record remain uncommitted; reproducibility is local and checksum-based until a commit is separately authorised.
