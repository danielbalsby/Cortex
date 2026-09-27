# Sprint 1.2 C2 Evaluation Baseline v1.0

**Status:** EVALUATION BASELINE — SYNTHETIC PROTOTYPE ONLY  
**Recorded:** 2026-07-23  
**Branch:** `prototype/sprint-0`  
**Git base/HEAD:** `01eb5dbf63a791b1e93913d8fb07ff8bf8148814` (`Lock Sprint 1.1 prototype baseline`)  
**C2 route:** `/prototype/sprint-1-2-c2`

This record identifies the uncommitted local C2 evaluation artifacts. It is not a release, clinical-validation, clinical-readiness or Build-completion claim. Only synthetic data may be used.

## Comparator set

| Comparator | Route | Purpose |
|---|---|---|
| C0 | `/prototype/sprint-1-1` | Version-locked Sprint 1.1 baseline |
| C1 | `/prototype/sprint-1-2` | Compact one-page/hybrid comparator |
| C2 | `/prototype/sprint-1-2-c2` | Narrative contextual workspace comparator |

C2 imports the Sprint 1.1 clinical state, reducer, fixture, completeness derivation and journal generator without modification. UI navigation, draft overrides and recovery copies remain separate presentation state.

## C2 artifact identity

SHA-256:

| Artifact | SHA-256 |
|---|---|
| `app/prototype/sprint-1-2-c2/page.tsx` | `74e1b1c3bee0eb7f563bf4cb7146b732b1a79de784ccf52c8e27931d2e5c91b1` |
| `components/prototype/sprint-1-2-c2/README.md` | `b9bab3ea684ae820b5283cc3ff70497f6bbf3715c9956c814bae0ee4605c0b5f` |
| `components/prototype/sprint-1-2-c2/SprintOneTwoC2Prototype.module.css` | `0e3f53c0230d4b7727cb8a4e9b815fddeee2d5254f2d8740a2b1d753e970fcec` |
| `components/prototype/sprint-1-2-c2/SprintOneTwoC2Prototype.tsx` | `54364ae63d8af2b58be7079b0ce2a14576944b6b86fc23b8a290c079aa0429ce` |
| `e2e/sprint-one-two-c2.spec.ts` | `04bd1b54a88e872afa406f3777a065463e6bd381878036b934b9659b798bd045` |

This baseline record is excluded from the artifact checksum set to avoid a self-referential checksum.

## Recorded verification

- Typecheck: passed.
- Vitest: 186/186 passed.
- Focused C2 Playwright: 7/7 passed.
- Full Playwright regression including C0, C1 and C2: 53/53 passed.
- Production build: passed; route generated as static content.
- `git diff --check`: passed.

## Known limitations

- C2 is an IA learning experiment using one synthetic knee case, not a product-direction decision.
- The locked Sprint 1.1 reducer prunes conditional trauma and swelling detail. C2 retains an explicit recovery copy in local UI state; the copy is not active clinical state or a recorded fact and requires explicit restoration.
- The prototype does not establish usability, reduced cognitive load, accessibility conformance, clinical safety or clinical validity.
- No real AI, EHR integration, P1 clinical suggestions, treatment support or clinical-attention rules are included.
- The C2 artifacts and this record remain uncommitted; reproducibility is local and checksum-based until Steering authorises a commit.
