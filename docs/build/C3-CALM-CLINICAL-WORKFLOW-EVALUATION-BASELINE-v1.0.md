# C3 Calm Clinical Workflow Evaluation Baseline v1.0

**Status:** EVALUATION BASELINE — SYNTHETIC PROTOTYPE ONLY  
**Recorded:** 2026-07-30  
**Branch:** `prototype/sprint-0`  
**Git base/HEAD:** `01eb5dbf63a791b1e93913d8fb07ff8bf8148814`  
**Route:** `/prototype/c3-calm-clinical-workflow`  
**Fixture:** `C3-FIX-001 v1.1`  
**Fixture SHA-256:** `d367710b3ed6decb44e7cdd9e8a2551e423aec05e7590751ba9de69317926ef9`

This record identifies the uncommitted local C3 evaluation artifacts. It is not
a Product-success, usability, accessibility, clinical-validation,
clinical-readiness or release claim. Only synthetic data may be used.

## Implementation boundary

C3 uses the unchanged Sprint 1.1 History/Objective types and reducer as its sole
clinical fact-root. Clinician Assessment, reviewed phrase commitments, output
intent, profile-specific manual drafts and inactive recovery metadata are
separate prototype-local partitions. Presentation, focus and evaluation events
remain separate UI state.

C3 contains no Clinical Document Workspace fact-state, reverse parsing,
suggestions, ranking, clinical decision support, referral, physiotherapy,
prescription, code output, EHR integration or persistence.

## Artifact identity

| Artifact | SHA-256 |
|---|---|
| `app/prototype/c3-calm-clinical-workflow/page.tsx` | `4ca7a592d5c689362761bfa46a2535c62f5e2fba3aa52d328ee77729dc1d5062` |
| `components/prototype/c3/README.md` | `8cdfc5d3809c9db6007af2a5ebe41238d9121d765bce61af7b8ee090c60b7956` |
| `components/prototype/c3/C3CalmClinicalWorkflow.module.css` | `14b15759d0c86cf304b168953772c790a9f3437263b63e26efcc6f1284f18241` |
| `components/prototype/c3/C3CalmClinicalWorkflow.tsx` | `f13ca22313def1f6dd02a81891cee2767716dbeb4ff3a04cfe822762096c1f57` |
| `clinical/prototypes/c3/fixtures.ts` | `bab06cc4af47a654ab2a09aef73badb4907b838595700791b651d756610fdb8f` |
| `clinical/prototypes/c3/model.ts` | `68348d6ac39b87db6ad875739d0667298d4e4b679a92e787a3c28ded92ceca43` |
| `clinical/prototypes/c3/projections.ts` | `90227f90ecd88bdaa39eccd66b07af209663aafbada6b7e4cd0b33b8879d0cd8` |
| `clinical/prototypes/c3/state.ts` | `9bce6db59d4a69e6642c1a8e25ebdeff1cca0681459b34532289fd4d5990cf96` |
| `clinical/prototypes/c3/state.test.ts` | `2a808e15d50e068e761bc38c9505d217683cdbe0b70bfe3cac96f8bd825d9401` |
| `e2e/c3-calm-clinical-workflow.spec.ts` | `26c753dcf78d07394e6347614e6e44c2a68fb2053d3ffcf64e977301fa03fd4a` |

This record is excluded from its own artifact checksum set.

## Verification

- C3 pure state/projection tests: 9/9 passed.
- Focused C3 Playwright tasks C3-T01–C3-T10: 10/10 passed without retry.
- Full Vitest suite: 195/195 passed.
- Full Chromium Playwright regression: 82/82 passed.
- Typecheck: passed.
- Production build: passed; C3 generated as static content.
- `git diff --check`: passed.
- C2 control, C2.2 and C3 routes: HTTP 200 on `127.0.0.1:3000`.
- Fixture-pack checksum matches the released Product handoff.
- Checksum-locked C2, C2.1 and C2.2 artifacts match their baseline records.

The first focused browser run had one test-only ambiguous locator for the
displayed source revision. The assertion was scoped to Cortex Overblik; all ten
tasks and the complete regression then passed.

## Evaluation instrumentation

Local, non-clinical trace events contain:

- monotonic event sequence;
- fixture task ID `C3-T01`–`C3-T10`;
- interaction kind; and
- target identifier.

The trace covers module lifecycle, fact input, keyboard cancellation,
projection switching, Assessment lifecycle, phrase provenance, draft
staleness, uncertainty, recovery and comparator fixture loading. It contains
no patient identifiers and is not persisted.

## Known limitations

- Calmness, cognitive burden and Product gain require the authorized founder
  comparison; technical tests cannot establish them.
- C3 uses one synthetic knee content pack and does not validate a generic MSK
  model or clinical correctness.
- Recovery intentionally permits one unresolved inactive copy and blocks a
  second recovery-producing parent change.
- Quick compresses selected recorded test findings according to the locked
  fixture; adequacy of that compression remains an evaluation question.
- Assessment is clinician free text only. Phrase editing is clinician-owned and
  does not imply information delivered, agreement or completed action.
- No referral, physiotherapy, medication, code, CDS, EHR or persistence track is
  present.
- Artifacts remain uncommitted; reproducibility is local and checksum-based.
