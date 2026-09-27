# C3.2 PSOAP Fast Flow — Evaluation Baseline v1.0

**Status:** EVALUATION BASELINE — SYNTHETIC PROTOTYPE ONLY  
**Clinical/release claim:** None  
**Route:** `/prototype/c3-2-psoap-fast-flow`  
**Base/HEAD:** `01eb5dbf63a791b1e93913d8fb07ff8bf8148814`  
**Working-tree identity:** Uncommitted isolated artifacts on a pre-existing dirty worktree  
**Scenario:** `C32-FF-SCENARIO-001@1.0`  
**Field configuration:** `C32-FIELD-CONFIG-KNEE-001@1.0`  
**Batch configuration:** `C32-NORMAL-BATCH-KNEE-001@1.0`  
**Product handoff:** `C32-PBH-001 v1.0`, SHA-256 `b3d367430a002105739c52029ee14c39e40688296457a7e88da8a79b9583accf`

## Artifact checksums

| Artifact | SHA-256 |
|---|---|
| `app/prototype/c3-2-psoap-fast-flow/page.tsx` | `6cd027106bb28d9b4e35228c61d9b79676243ef22b3b7bb6f24aba2e4f221bbe` |
| `clinical/prototypes/c3-2/model.ts` | `2bb18f7924f31150e74177cdd0fa16d00759028e248ec2a68c7e5c31c4ec557b` |
| `clinical/prototypes/c3-2/state.ts` | `c0e6649ff40256871f6091adaf64e28ccac346b1399a80b05d76dab366e0e611` |
| `clinical/prototypes/c3-2/projections.ts` | `4448cecdfe282422d15ea33825eaf349281d0403c6afd33df250f4e4994a6031` |
| `clinical/prototypes/c3-2/state.test.ts` | `bb77dbd269180008c116996b8d7b0eea2881b1a78cef01ba0a52de3d52f494c5` |
| `components/prototype/c3-2/C32PsoapFastFlow.tsx` | `e2f708bec5d9045a2e5bc327d3a4b699cb892a07a21711af200fbb15ed4be005` |
| `components/prototype/c3-2/C32PsoapFastFlow.module.css` | `714a93d401d6b080d2c43c102a97e349ffe23e6585f3a2f3aeb69f5df2b23fa9` |
| `components/prototype/c3-2/README.md` | `2bb4f59feb7431cad44ba31686fc6030bfdf914f8000a09d8582545c34c7a300` |
| `e2e/c3-2-psoap-fast-flow.spec.ts` | `3680a254299eda308971cbd8d140ca20178ee46708cd29c7e36691a27b97483e` |

## Verification

- C3.2 state/projection tests: 12 passed.
- Relevant C3/C3.1 unit regression: 11 passed; combined focused total 23 passed.
- Full Vitest: 209 passed, 0 failed, 0 todo.
- Focused C3.2 Playwright: 11 passed, 0 failed, 0 skipped.
- Full Playwright regression: 99 passed, 0 failed.
- Typecheck: passed.
- Production build: passed.
- `git diff --check`: passed.
- Visual inspection: Chromium Desktop at `1440×900`, browser zoom `100%`.
- C3.1 comparator: all six C32-PBH-001 hashes match.

## Known limitations

- `C32-E12` remains a founder evaluation gate; Build has not demonstrated the `≤113` second target.
- Instrumentation is local synthetic presentation state and is neither persistent nor clinical evidence.
- The bounded inspection extension is prototype-local and not a canonical model change.
- Batch phrases and `Normal 0–140°` apply only to this reviewed synthetic knee prototype.
- The document editor is representation state; manual edits are not parsed back into clinical facts.
- No clinical validation, real patient data, decision support, referral, physiotherapy, codes, imaging recommendation, EHR or persistence is included.

**Technical classification:** TECHNICALLY PASSED — FAST FLOW NOT DEMONSTRATED
