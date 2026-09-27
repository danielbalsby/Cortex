# C3 Calm Clinical Workflow — Product-to-Build Handoff v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | C3-PBH-001 |
| Dokumenttype | Product-to-Build Handoff |
| Version | 1.0 |
| Status | **PRODUCT-RELEASED — READY FOR BOUNDED BUILD AUTHORIZATION; STEERING AUTHORITY PENDING** |
| Dato | 2026-07-30 |
| Product owner | TODO — navngiven ejer |
| Intended Build owner | TODO — navngiven Build owner |
| Product decision | [PDR-010](../research/C3-CALM-CLINICAL-WORKFLOW-PRODUCT-LEARNING-CONTRACT-v1.0.md) |
| Architecture disposition | [API-017 v1.0](../../architecture/reviews/API-017-C3-ARCHITECTURE-DISPOSITION-v1.0.md) — `BUILDABLE AS BOUNDED C3 — MATERIAL CONSTRAINTS` |
| Fixture pack | [C3-FIX-001 v1.1](C3-LEARNING-FIXTURE-PACK-v1.1.md) |
| Fixture pack SHA-256 | `d367710b3ed6decb44e7cdd9e8a2551e423aec05e7590751ba9de69317926ef9` |
| Predecessor fixture | C3-FIX-001 v1.0 candidate; SHA-256 `7c6b445339c03925fa1d21f92940b638a89d69c8f09185a9e1be0323373e4edd` |
| Steering Build authority | **OPEN — no repository-resident C3 Build authority supplied** |
| Clinical content review | **COMPLETED — Daniel Balsby; APPROVE WITHOUT CHANGES; synthetic C3 learning scope only** |
| Data/use boundary | Synthetic learning prototype only; no patient data, clinical use, release or validation claim |

## 1. Handoff decision and authority boundary

Product incorporates API-017's material constraints and prepares one bounded C3 scope for final pre-Build review. Architecture has established that the scope is buildable without canonical model change if its constraints are followed.

This record defines Product scope, content intent, observable behavior and verification expectations. It does not select technology or implementation architecture.

Product has released this handoff as the final bounded C3 scope for Steering authorization. Clinical content review is complete. **Build remains unauthorized until Steering issues a separate repository-resident C3 Build authority.**

Architecture's semantic-safety review is sufficient for the state, partition, projection, provenance and isolation boundaries. It is explicitly **not** sufficient for clinical phrase correctness under API-017 §11.

## 2. Product objective and learning question

> Build exactly one isolated C3 learning prototype to test whether a calmer, module-oriented clinical workflow reduces visual and cognitive burden compared with C2 while preserving explicit facts, uncertainty, clinician authority, correction/recovery and deterministic Quick/Standard documentation.

C2 is the control. C0–C2.2 remain untouched. C3 is a learning comparator, not a replacement baseline, clinical product or production architecture.

## 3. Exact P0 scope

The bounded Build slice contains only:

1. **One isolated C3 route and artifact set.** No modification of C0–C2.2 source, fixtures, reducers, generators or checksum records.
2. **Sprint 1.1/C2 fact-root only.** History/Objective facts and all fact mutations use the unchanged Sprint 1.1 value sets and reducer actions.
3. **One active edit module.** Each module has calm read-view, explicit toggle-open, toggle-close/cancel and one active edit context at a time.
4. **Bounded control grammar.** Direct 2–3 option mutually exclusive groups, existing meaning-aligned multi-select chips, and list/combobox for longer sets; no clinical defaults.
5. **Deterministic keyboard behavior.** Tab/Shift+Tab, local arrows, Space, unambiguous Enter, Escape close/cancel, visible focus and safe focus return.
6. **Clinician-owned Assessment records.** Free text only, explicitly classified primary/secondary/differential; create/edit/reclassify/remove only by clinician action; no suggestions or ranking.
7. **Clinician-selected phrase commitments.** Only the reviewed subset of C3-FX-PHRASE-001, with explicit select/edit/remove provenance and no communication/action upgrade.
8. **Quick and Standard projections.** Pure deterministic projections of one source snapshot/revision; profile switching mutates output intent only.
9. **Per-profile manual drafts.** Separate Quick/Standard overrides with base identity and current/stale state.
10. **Field-specific uncertainty.** Blank, explicit negative, not-assessed, not-performed and not-assessable remain distinct through workspace, existing completeness and outputs.
11. **Bounded recovery.** Capture inactive recovery metadata before existing reducer pruning; block a second recovery-producing parent change until the first is explicitly restored or discarded.
12. **Knee content pack only.** Candidate workflow-kernel concepts may be isolated, but no other MSK content or generalization claim is included.
13. **Evaluation instrumentation.** Task-, input-, focus-, correction-, recovery-, projection- and provenance-events necessary to evaluate C3-FX-EVAL-TASKS-001; instrumentation is presentation/research state, never clinical state.

## 4. Locked fixture/content identifiers

Build must consume exactly the reviewed, released version of [C3-FIX-001 v1.1](C3-LEARNING-FIXTURE-PACK-v1.1.md). The unchanged content identifiers are:

- `C3-FX-INPUT-KNEE-001@1.0` — source `C3-SRC-KNEE-001-R1`;
- `C3-FX-MAP-KNEE-001@1.0`;
- `C3-FX-ASMT-FREE-TEXT-001@1.0` — free text only, no Assessment vocabulary;
- `C3-FX-PHRASE-001@1.0` — approved without changes for synthetic C3 learning;
- `C3-FX-OUTPUT-QUICK-001@1.0` — same source revision; phrase review completed;
- `C3-FX-OUTPUT-STANDARD-001@1.0` — same source revision; phrase review completed;
- `C3-FX-UNCERTAINTY-001@1.0`;
- `C3-FX-RECOVERY-001@1.0`; and
- `C3-FX-EVAL-TASKS-001@1.0`.

Clinical review approved all six phrases and both affected outputs without textual changes. Product issued fixture package v1.1 to record that disposition while preserving the v1.0 candidate hash. Build may not patch fixture language locally.

## 5. Binding Architecture constraints

Build acceptance requires evidence that:

- Sprint 1.1/C2 History and Objective are the sole clinical fact source;
- no `ClinicalDocumentPrototypeState`, `workspaceReducer`, parallel fact-map or reverse parsing is used at runtime for C3 facts;
- Assessment, phrase commitments, output intent, representation drafts and recovery metadata are disjoint prototype-local partitions;
- presentation/focus/navigation/instrumentation state cannot create facts;
- legacy Sprint 1.1 `assessment`, `plan` and `documentationLevel` do not compete as persisted C3 sources;
- output adapter inputs are immutable and short-lived;
- profile switches cannot dispatch fact, Assessment or phrase mutations;
- no hidden/pruned facts remain current; recovery metadata never affects completeness or output;
- no diagnostic suggestion, ranking, plan recommendation, referral, physiotherapy, code, imaging/referral mapping, prescription or medication-ordering behavior exists; and
- no existing comparator artifact or checksum changes.

Scope expansion invalidates this handoff and reopens Architecture review.

## 6. Measurable acceptance tests

| ID | Product acceptance | Required observable evidence | Stop/fail condition |
|---|---|---|---|
| C3-AC01 | One active module | Toggle module open→closed→open; opening another closes/cancels according to visible behavior; exactly one edit context; read-view remains primary | Concurrent edit modules, hidden commit or lost place/work |
| C3-AC02 | Direct choices | Existing 2–3 option groups select exactly one only by explicit action; existing multi-select chips preserve simultaneous findings; long sets use list/combobox | Default fact, wrong cardinality, accidental selection or clinical values invented in UI |
| C3-AC03 | Tab route | Full forward and reverse route has visible focus, no trap, no skipped required control and deterministic focus return | Focus loss, trap, unrelated state change or pointer-only required action |
| C3-AC04 | Local key semantics | Arrows stay within current group/list; Space toggles current eligible option; Enter commits/advances only when unambiguous; Escape closes/cancels without silent commit | Global arrow hijack, ambiguous Enter mutation or Escape data loss |
| C3-AC05 | Projection identity | Quick and Standard expose the same snapshot ID/revision; switch Quick→Standard→Quick produces byte-stable return and zero source-state mutation | Revision drift, fact mutation, prune, unsupported specificity or false completeness |
| C3-AC06 | Assessment authority | Create, edit, classify, reclassify and remove occur only through explicit clinician actions; zero auto-created/promoted/ranked entries; max one active primary | Cortex-authored entry, suggestion source, hidden promotion or fact mutation |
| C3-AC07 | Phrase provenance | Select/edit/remove preserve fixture/free-text origin, original/current text, actor, sequence and predecessor; only active current text projects | Lost provenance, destructive history, silent fact or claim of information/agreement/action |
| C3-AC08 | Manual draft staleness | Quick and Standard overrides remain separate; source change marks both relevant overrides stale; text is preserved until explicit regenerate/discard/continue-edit | Cross-profile override, silent overwrite, current-looking stale draft or reverse parsing |
| C3-AC09 | Uncertainty | Execute C3-UNC-01–06; state, existing completeness and output match fixture; blank creates no assertion | Generic unknown collapse, blank→negative, stale degrees or simulated certainty |
| C3-AC10 | Recovery | Execute C3-REC-01–04; inactive child data is captured before prune; no stale output; second unresolved recovery event is blocked before mutation; focus moves to disposition and returns safely | Collision/overwrite, hidden active fact, output leak, completeness effect or unresolvable focus |
| C3-AC11 | Fact/output fidelity | C3-SRC-KNEE-001-R1 produces exact reviewed Quick/Standard expected output and same facts as the controlled C2 input mapping | Extra sentence without source, missing source revision or content advantage |
| C3-AC12 | Isolation/regression | C0–C2.2 checksums match; full existing regression plus C3 partition/projection/provenance/recovery/keyboard cases passes | Comparator modification, regression or parallel fact-root |

Passing tests establish technical conformance to this bounded handoff. They do not establish Product gain, usability, accessibility, clinical safety, clinical validity or release readiness.

## 7. Required evaluation package

The Build result must record:

- C3 artifact identity and checksums;
- branch/base/commit or explicit working-tree identity;
- fixture pack ID, version and hash;
- C2 control identity;
- route, browser/viewport and synthetic-only label;
- exact unit/browser/build verification results;
- event/instrumentation schema and fixture task linkage;
- known limitations and deviations; and
- proof that no real data, external action, referral/CDS output or production dependency is present.

The subsequent founder pilot and external clinician evaluation remain governed by PDR-010. Build does not interpret evaluation evidence or declare Product success.

## 8. Explicit out of scope

- Any C2.x modification or additional comparator.
- Clinical Document Workspace state/reducer as C3 fact source.
- New canonical state, completeness, uncertainty, domain, LEX, capability or production-output semantics.
- Diagnostic Assessment vocabulary, suggestions, ranking or auto-Assessment.
- Clinical decision support, clinical attention or treatment recommendations.
- Medication suggestions, prescriptions or ordering.
- Referral, physiotherapy or code output, mapping, generator or placeholder.
- Imaging/referral plan actions.
- EHR, persistence, billing, delivery, audit system or real patient data.
- Claims of clinical correctness, validation, generalized MSK support or production readiness.
- Implementation technology decisions in Product artifacts.

## 9. Isolated successor tracks

The following remain references only and must not leave code paths, placeholders or hidden mappings in C3:

1. **Output learning track:** referral, physiotherapy and code outputs, each with separate recipient, purpose, fields, provenance, transformation, review/approval and delivery contracts.
2. **CDS track:** source-based clinical decision support with separate Clinical Safety/Governance and Architecture review, uncertainty, false-positive/negative cases, rejection and explicit Human Decision authority.

Neither track is authorized or prepared by this handoff.

## 10. Completed clinical review and final Product scope reconciliation

### Human clinical review

Daniel Balsby, læge og klinisk founder-reviewer under Cortex founder clinical review, approved all six `C3-FX-PHRASE-001@1.0` phrases without changes on 2026-07-30. Review scope was phrase wording and clinical appropriateness for the synthetic C3 learning prototype only. It is not general clinical validation or production approval.

The review preserves the binding rule that selection commits wording only. It does not imply advice delivered, understood/agreed, appointment made, treatment performed, prescription, referral, completeness or absence of other risk. The complete phrase-by-phrase record is in C3-FIX-001 v1.1 §11.

### Final API-017 scope reconciliation

Product records the following final pre-Build result:

| API-017 boundary | Reconciliation result |
|---|---|
| Sprint 1.1/C2 sole fact-root | PASS — unchanged binding scope and C3-FX-MAP-KNEE-001 |
| No parallel Clinical Document Workspace fact-state | PASS — explicitly prohibited and covered by C3-AC12 |
| Separate Assessment/phrases/output/drafts/recovery partitions | PASS — fixture mapping and acceptance tests locked |
| Quick/Standard same source revision | PASS — both expected outputs reference `C3-SRC-KNEE-001-R1` |
| No auto-Assessment, suggestions or ranking | PASS — free text only; explicit clinician actions |
| Phrase provenance and no action/authority upgrade | PASS — reviewed text plus unchanged semantic constraints |
| No hidden/pruned facts; field-specific uncertainty | PASS — C3-FX-UNCERTAINTY-001 and C3-FX-RECOVERY-001 locked |
| No referral/physio/code/CDS/prescription | PASS — explicit non-scope and no placeholders/mappings authorized |
| C0–C2.2 untouched | PASS — binding isolation/regression acceptance |
| One bounded C3 prototype | PASS — no parallel C3 variant authorized |

### Product release decision

All Product-, Architecture- and human clinical-content prerequisites for requesting Steering Build authorization are satisfied. C3-PBH-001 is **PRODUCT-RELEASED — READY FOR BOUNDED BUILD AUTHORIZATION**.

The only remaining pre-Build condition is a separate Steering authority record naming the exact PDR-010, API-017 v1.0, C3-PBH-001 v1.0, C3-FIX-001 v1.1/hash and bounded Build owner/scope. Until that record exists, Build may not start.
