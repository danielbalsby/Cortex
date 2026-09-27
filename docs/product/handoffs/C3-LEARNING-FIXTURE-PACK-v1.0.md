# C3 Learning Fixture Pack v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | C3-FIX-001 |
| Dokumenttype | Versionslåst Product learning fixture pack |
| Version | 1.0 |
| Status | **LOCKED CANDIDATE — CLINICAL PHRASE REVIEW REQUIRED BEFORE BUILD RELEASE** |
| Dato | 2026-07-30 |
| Product owner | TODO — navngiven ejer |
| Clinical content reviewer | **TODO — navngiven kompetent Clinical Safety/Governance-reviewer** |
| Architecture source | [API-017](../../architecture/reviews/API-017-C3-ARCHITECTURE-DISPOSITION-v1.0.md) — `MATERIAL CONSTRAINTS`; `BUILDABLE AS BOUNDED C3` |
| Product source | [PDR-010](../research/C3-CALM-CLINICAL-WORKFLOW-PRODUCT-LEARNING-CONTRACT-v1.0.md) |
| Fact-root | Uændrede Sprint 1.1/C2 `SprintOneOneHistory` og `SprintOneOneObjective` value sets og reducer-actions |
| Data | Kun syntetiske learning data; ingen patientdata |
| Clinical claim | Ingen. Indholdet er ikke valideret clinical guidance eller clinical correctness. |

## 1. Lock rule and fixture inventory

Alle ID'er, values, ordlyd og forventede outputs i denne version er immutable for en C3 Build-/evaluation-run. En ændring kræver ny fixtureversion, nyt hash og impact review. Build må ikke udfylde TODO-indhold, tilføje fraser eller “forbedre” klinisk ordlyd.

| Fixture-ID | Version | Formål | Build-status |
|---|---|---|---|
| C3-FX-INPUT-KNEE-001 | 1.0 | Syntetisk knee fact snapshot og source revision | LOCKED |
| C3-FX-MAP-KNEE-001 | 1.0 | Mapping intent til Sprint 1.1/C2 fact-root og C3-record partitions | LOCKED |
| C3-FX-ASMT-FREE-TEXT-001 | 1.0 | Clinician-owned Assessment uden vocabulary/suggestions | LOCKED |
| C3-FX-PHRASE-001 | 1.0 | Candidate Plan/Follow-up/Safety-net phrase set | **BLOCKED — named clinical review missing** |
| C3-FX-OUTPUT-QUICK-001 | 1.0 | Expected Quick output fra source revision C3-SRC-KNEE-001-R1 | **CONDITIONAL — phrase review required** |
| C3-FX-OUTPUT-STANDARD-001 | 1.0 | Expected Standard output fra samme source revision | **CONDITIONAL — phrase review required** |
| C3-FX-UNCERTAINTY-001 | 1.0 | Blank/negative/not-assessed/not-performed/not-assessable cases | LOCKED |
| C3-FX-RECOVERY-001 | 1.0 | Parent-change, recovery og collision cases | LOCKED |
| C3-FX-EVAL-TASKS-001 | 1.0 | Founder-/evaluation-task set | LOCKED |

Founderens STANDARD/QUICK-input anvendes alene som target-output-retning: kort versus mere udfoldet dokumentation fra samme state. P03 indeholder ikke den ordrette foundertekst. Denne fixture rekonstruerer den derfor ikke og inkluderer kun udsagn, som har en eksplicit source nedenfor.

## 2. C3-FX-INPUT-KNEE-001 v1.0

### Identity

| Field | Value |
|---|---|
| Fixture type | Synthetic input snapshot |
| Source snapshot ID | `C3-SRC-KNEE-001` |
| Source revision | `C3-SRC-KNEE-001-R1` |
| Base content pack | Knee; first learning pack only |
| Demographics fixture | `34-årig mand` |
| Comparator relation | Extends the synthetic Sprint 1.1 fixture for controlled C2/C3 tasks; it does not modify the existing fixture |

### Clinical facts — History partition

| Existing field | Locked value | Source/provenance intent |
|---|---|---|
| `side` | `right` | Synthetic fixture assertion; existing `set-history` action |
| `onset` | `acute` | Synthetic fixture assertion; existing action |
| `duration` | `siden i går` | Synthetic fixture free text; existing action |
| `painCourse` | `intermittent` | Synthetic fixture assertion; existing action |
| `trauma` | `yes` | Synthetic fixture assertion; existing action |
| `traumaMechanism` | `twisting` | Synthetic fixture child fact; only active while `trauma=yes` |
| `traumaContext` | `under fodbold` | Synthetic fixture child free text |
| `painLocation` | `medial` | Synthetic fixture assertion |
| `provocations` | `walking`, `stairs`, `rotation` | Three explicit existing toggle actions; multi-select |
| `function` | `mildly-reduced` | Synthetic fixture assertion |
| `swelling` | `mild` | Synthetic fixture assertion |
| `swellingTiming` | `opstået samme aften` | Synthetic fixture child free text; only active while swelling is not `none` |
| `locking` | `no` | Explicit negative fact |
| `instability` | `no` | Explicit negative fact |
| `restPain` | `no` | Explicit negative fact |
| `nightPain` | `no` | Explicit negative fact |
| `fever` | `no` | Explicit negative fact |
| `systemicIllness` | `no` | Explicit negative fact |
| `redHotSwollenJoint` | `no` | Explicit negative fact |

### Clinical facts — Objective partition

| Existing field | Locked value | Source/provenance intent |
|---|---|---|
| `gait` | `limp` | Synthetic fixture assertion; existing `set-objective` action |
| `inspection` | `swelling` | Synthetic fixture assertion |
| `extensionDegrees` | `0` | Synthetic numeric fact |
| `flexionDegrees` | `110` | Synthetic numeric fact |
| `rangeNotAssessable` | blank | No assertion; ROM degrees are explicit |
| `effusion` | `mild` | Synthetic fixture assertion |
| `palpationFindings` | `medial-joint-line`, `mcl` | Two explicit existing toggle actions; multi-select |
| `palpationStatus` | `findings-recorded` | Existing reducer consequence of explicit palpation toggles |
| `lachman` | `negative` | Explicit negative test result |
| `valgus` | `painful-no-laxity` | Synthetic test result |
| `varus` | `stable` | Explicit recorded stable result |
| `meniscalTest` | `positive` | Synthetic test result; not a diagnosis |
| `patella` | `negative` | Explicit negative test result |
| `neurovascular` | `normal` | Explicit recorded result |

No fact above may be inferred from Assessment, phrase selection, output text, visibility, default state or missing input.

## 3. C3-FX-MAP-KNEE-001 v1.0

| Partition | Locked mapping intent | Forbidden mapping |
|---|---|---|
| Facts | All History/Objective changes dispatch existing Sprint 1.1 reducer actions against the sole fact-root | Parallel `ClinicalDocumentPrototypeState`, `workspaceReducer`, generic fact-map or reverse parsing |
| Assessment | Prototype-local ordered records with explicit create/edit/reclassify/remove trace | `state.assessment` as a competing persistent source; suggestions or ranking |
| Phrase commitments | Prototype-local records with fixture/free-text origin, versions and explicit actions | `state.plan` as competing persistent source; action/communication inference |
| Output intent | `quick` or `standard` only | Clinical fact, approval, readiness or completeness mutation |
| Projection input | Short-lived immutable adapter input from one identified source revision | Persistence as clinical truth or acceptance back into facts |
| Manual drafts | Separate per-profile override with base hash/revision and current/stale status | Shared Quick/Standard override or reverse parsing |
| Recovery | Inactive metadata captured before existing reducer pruning | Active fact, output/completeness input or hidden fallback |
| Presentation | Open module, focus, keyboard roving, scroll and instrumentation | Clinical/projection state |

Every accepted fact, Assessment or phrase change increments a monotonic `sourceRevision`. Presentation-only actions do not. Quick and Standard at a given revision must reference the same snapshot ID and revision.

## 4. C3-FX-ASMT-FREE-TEXT-001 v1.0

Product chooses **clinician free text only** for C3 Assessment. There is no diagnostic vocabulary, suggestion set, ranking, auto-completion or Cortex-authored Assessment content.

### Record contract

| Field | Locked rule |
|---|---|
| Role | Clinician explicitly selects `primary`, `secondary` or `differential` |
| Text | Clinician enters and commits free text |
| Origin | Always `clinician-free-text` in C3 |
| Primary cardinality | Zero or one active `primary` entry |
| Other cardinality | Zero or more active secondary/differential entries for interaction testing |
| Lifecycle | Explicit create, edit, reclassify, remove; removed/superseded history retained |
| Cortex behavior | No entry creation, wording, ranking, promotion or selection |

### Deterministic evaluation entry

For output snapshot testing only, the clinician explicitly enters:

| Entry ID | Role | Locked text | Status |
|---|---|---|---|
| `C3-ASMT-001` | `primary` | `Traumatisk betingede højresidige knæsmerter med mediale kliniske fund; vurderingen er foreløbig.` | Active after explicit clinician commit |

This is synthetic clinician-authored test text, not a diagnosis recommendation or clinically validated assessment.

## 5. C3-FX-PHRASE-001 v1.0

### Review state

**These phrases are candidate synthetic learning content. They are not cleared for Build until a named competent Clinical Safety/Governance reviewer records phrase-by-phrase approval, rejection or required revision. API-017 Architecture review is semantic/structural review and does not substitute for clinical content review.**

| Phrase ID | Category | Candidate locked text | Permitted meaning of selection | Must not imply |
|---|---|---|---|---|
| `C3-PLAN-001` | Plan | `Fortsat observation af forløbet.` | Clinician commits this text as current plan wording | Treatment performed, patient informed, agreement or recommendation acceptance |
| `C3-PLAN-002` | Plan | `Belastning tilpasses efter symptomer.` | Clinician commits this text as current plan wording | Prescription, instruction delivered or patient agreement |
| `C3-FU-001` | Follow-up | `Ny klinisk vurdering ved vedvarende gener.` | Clinician commits intended follow-up wording | Appointment made, agreement or completed contact |
| `C3-FU-002` | Follow-up | `Ny klinisk vurdering ved forværring.` | Clinician commits intended follow-up wording | Appointment made or information delivered |
| `C3-SN-001` | Safety-net | `Søg lægelig vurdering ved forværring.` | Clinician commits current safety-net wording | Advice communicated, understood or agreed |
| `C3-SN-002` | Safety-net | `Søg akut lægelig vurdering ved feber eller et tiltagende rødt, varmt og hævet knæ.` | Clinician commits current safety-net wording | Clinical completeness, absence of other risk or communication performed |

Fixture-origin records preserve `C3-FIX-001`, phrase ID, version `1.0`, original text, current text, clinician actor attribution, selected/edited/removed/restored action, sequence and predecessor relation. Only active current versions enter outputs.

The expected outputs below use `C3-PLAN-001`, `C3-FU-001` and `C3-SN-001` after explicit clinician selection. Their inclusion is conditional on named content review.

## 6. C3-FX-OUTPUT-QUICK-001 v1.0

### Projection identity

| Field | Value |
|---|---|
| Profile | `quick` |
| Source snapshot | `C3-SRC-KNEE-001-R1` |
| Assessment input | Active `C3-ASMT-001` |
| Phrase inputs | Active `C3-PLAN-001`, `C3-FU-001`, `C3-SN-001` |
| Clinical status | Synthetic target output; not validated guidance |
| Build status | Conditional on phrase review |

### Expected text

```text
34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går. Mediale, intermitterende smerter og let hævelse. Hævelsen opstod samme aften. Smerterne provokeres ved gang, trappegang og rotation. Funktionsevnen er let nedsat. Ingen ægte aflåsning eller instabilitetsfornemmelse. Ingen hvile- eller nattesmerter. Ingen feber eller almen påvirkning; knæet er ikke registreret som rødt, varmt og akut hævet. Objektivt: haltende gang, synlig hævelse og let effusion. ROM: ekstension 0°, fleksion 110°. Palpationsømhed ved mediale ledlinje og MCL. Smerte uden laksitet ved valgusstres og positiv menisktest. Distal neurovaskulær status normal. Vurdering: Traumatisk betingede højresidige knæsmerter med mediale kliniske fund; vurderingen er foreløbig. Plan: Fortsat observation af forløbet. Opfølgning: Ny klinisk vurdering ved vedvarende gener. Safety-net: Søg lægelig vurdering ved forværring.
```

Quick omits the recorded negative/stable named tests `Lachman`, `varus` and `patella` from prose compression, but does not remove them from source state or present them as missing. The evaluation must test whether this omission is understood and acceptable; it is not pre-approved clinical adequacy.

## 7. C3-FX-OUTPUT-STANDARD-001 v1.0

### Projection identity

| Field | Value |
|---|---|
| Profile | `standard` |
| Source snapshot | `C3-SRC-KNEE-001-R1` |
| Assessment input | Active `C3-ASMT-001` |
| Phrase inputs | Active `C3-PLAN-001`, `C3-FU-001`, `C3-SN-001` |
| Clinical status | Synthetic target output; not validated guidance |
| Build status | Conditional on phrase review |

### Expected text

```text
Anamnese
34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går. Mediale, intermitterende smerter og let hævelse. Hævelsen opstod samme aften. Smerterne provokeres ved gang, trappegang og rotation. Funktionsevnen er let nedsat. Ingen ægte aflåsning eller instabilitetsfornemmelse. Ingen hvile- eller nattesmerter. Ingen feber eller almen påvirkning; knæet er ikke registreret som rødt, varmt og akut hævet.

Objektivt
Haltende gang, synlig hævelse og let effusion. ROM: ekstension 0°, fleksion 110°. Palpationsømhed ved mediale ledlinje og MCL. Lachman negativ, smerte uden laksitet ved valgusstres, varusstres stabil, menisktest positiv og patellatest negativ. Distal neurovaskulær status normal.

Vurdering
Traumatisk betingede højresidige knæsmerter med mediale kliniske fund; vurderingen er foreløbig.

Plan
Plan: Fortsat observation af forløbet. Opfølgning: Ny klinisk vurdering ved vedvarende gener. Safety-net: Søg lægelig vurdering ved forværring.
```

No sentence asserts that information was delivered, agreed, prescribed, referred, sent or performed.

## 8. C3-FX-UNCERTAINTY-001 v1.0

Each case starts from an identified copy of the same relevant source revision and changes only the named field.

| Case ID | Field/value | Expected workspace meaning | Expected completeness meaning | Expected output behavior |
|---|---|---|---|---|
| `C3-UNC-01` | `nightPain=undefined` | Blank; no assertion | Field remains missing/unresolved | No negative sentence; omission must not appear as normal |
| `C3-UNC-02` | `nightPain=no` | Explicit negative fact | Assessed for the existing derivation | Output may state no night pain |
| `C3-UNC-03` | `nightPain=not-assessed` | Explicit field-specific not-assessed state | Remains missing under existing derivation | Preserve state in workspace; output omission must not imply negative |
| `C3-UNC-04` | `lachman=not-performed` | Test was not performed | Remains missing under existing derivation | Output states `Lachman ikke udført` where profile contract represents it |
| `C3-UNC-05` | `lachman=not-assessable` | Meaningful result could not be established | Remains missing under existing derivation | Output states `Lachman ikke vurderbar` where represented |
| `C3-UNC-06` | `rangeNotAssessable=true` | ROM is explicitly not assessable; degrees are pruned by existing reducer | ROM remains incomplete under existing derivation | Output must not retain stale degrees and states ROM not assessable where represented |

C3 may not combine these values into a generic unknown state.

## 9. C3-FX-RECOVERY-001 v1.0

For the minimal C3 Build, Product selects the Architecture-permitted **block-before-second-recovery** policy rather than a recovery collection.

| Case ID | Starting facts | Parent change | Required outcome |
|---|---|---|---|
| `C3-REC-01` | `trauma=yes`, mechanism/context active | Set `trauma=no` | Capture mechanism/context as inactive recovery metadata before reducer action; active facts/output contain no stale trauma details; explicit restore or discard |
| `C3-REC-02` | `swelling=mild`, timing active | Set `swelling=none` | Capture timing as inactive recovery metadata; active output states no swelling and contains no timing; explicit restore or discard |
| `C3-REC-03` | REC-01 remains unresolved | Attempt REC-02 parent change | Block the second recovery-producing correction with truthful explanation and focus on the unresolved recovery disposition; no fact mutation |
| `C3-REC-04` | Any active manual Quick/Standard override | Accept fact, Assessment or phrase change | Increment source revision; preserve each profile override separately and mark stale; no reverse parsing |

Restore/discard is an explicit clinician action. Recovery metadata never contributes to completeness or output.

## 10. C3-FX-EVAL-TASKS-001 v1.0

| Task ID | Observable task | Required evidence |
|---|---|---|
| `C3-T01` | Open one module, edit one fact, toggle the same module closed and reopen it | One active module; read/edit non-competition; place/focus preserved |
| `C3-T02` | Use a 2–3 option mutually exclusive control, multi-select two palpation findings, and use one longer list/combobox | Correct cardinality; no defaults; explicit commits only |
| `C3-T03` | Complete forward/backward keyboard route and exercise arrows, Space, Enter and Escape | Event/action trace; no global arrow hijack, focus trap or ambiguous Enter commit |
| `C3-T04` | Switch Quick→Standard→Quick without editing | Same source revision; no fact/Assessment/phrase mutation; byte-stable return output |
| `C3-T05` | Create, edit, classify, reclassify and remove Assessment entries | Clinician-only actions; zero automatic/ranked entries; history retained |
| `C3-T06` | Select, edit and remove one phrase in each category | Fixture provenance, actor, versions and removal visible; no action/communication upgrade |
| `C3-T07` | Manually edit both profiles, change one upstream source, then resolve each stale draft separately | Per-profile overrides, stale status and explicit regeneration/discard |
| `C3-T08` | Explain and exercise UNC-01–06 | Correct state/completeness/output explain-back; no false negative/certainty |
| `C3-T09` | Execute REC-01, attempt REC-02 before disposition, then dispose and retry | Second change blocked before mutation; focus/recovery truthfulness; no loss |
| `C3-T10` | Compare C2 and C3 using the same fact fixture | No hidden content advantage; orientation, action burden, errors and comprehension recorded |

## 11. Clinical content review record

This section must be completed by a named competent human reviewer before Build release.

| Field | Required record |
|---|---|
| Reviewer name | TODO |
| Competence/mandate | TODO |
| Reviewing body | TODO |
| Review date | TODO |
| Phrase-by-phrase disposition | TODO — approve/reject/revise each C3-PLAN/FU/SN ID |
| Expected-output impact | TODO |
| Limitations | TODO |
| Signature/reference | TODO |

Until completed, C3-FX-PHRASE-001 and both expected-output fixtures remain blocked/conditional and the C3 Build handoff cannot be released.

