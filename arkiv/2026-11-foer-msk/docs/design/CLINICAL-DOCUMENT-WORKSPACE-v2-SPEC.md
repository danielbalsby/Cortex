# Clinical Document Workspace Prototype v2 specification

**Status:** Proposed for Prototype v2 implementation and CDR-002 review

**Owner:** Cortex

**Document type:** Design and implementation specification

**Clinical validation status:** Not clinically validated

**Production implementation authorised:** No

**Last updated:** 2026-07-18

## Source basis and evidence boundary

This specification resolves the established observations in [CDR-001](../design-review/examples/CDR-001-Clinical-Document-Workspace.md) while preserving its reported strengths. It is subordinate to the [Clinical Design Review framework](../design-review/framework.md), [scoring model](../design-review/scoring.md), [standard checklist](../design-review/checklists/standard.md), [Clinical Document Workspace v1 direction](CLINICAL-DOCUMENT-WORKSPACE-v1.md), and [KNEE-001 pathway](../clinical/pathways/KNEE-001-Knee-Pain.md). It also reflects the implementation on `feature/clinical-document-workspace-prototype`.

CDR-001 is a draft consolidation, not a completed browser review. This document therefore defines intended behaviour and future evidence; it does not claim completed usability, accessibility, safety, browser, responsive, performance, or practising-clinician testing.

## 1. Product objective

Prototype v2 shall make the clinical document itself the primary working surface for a synthetic adult knee-pain consultation. A clinician shall be able to capture history, examination, concurrent working diagnoses, and plan while a coherent Danish journal note updates live beside the work.

The v2 objective is to preserve explicit clinical control and faithful documentation while materially improving consultation fit: fewer low-value decisions, less scrolling, denser readable presentation, stronger clinical overview, and a complete keyboard path. The prototype is an isolated design-review artifact, not a production clinical system.

## 2. Design principles

1. **Document first.** Anamnese, Objektivt, Vurdering, and Plan are continuous document sections; controls sit in the sentence or paragraph they affect.
2. **One fact model.** Quick and Standard are presentations of the same facts, rules, note generator, and safety constraints.
3. **Explicit facts only.** Untouched is a distinct state and never means absent, normal, assessed, or not relevant.
4. **Efficient explicitness.** Group confirmations and compact multi-selects reduce work without creating silent defaults.
5. **Positives dominate.** A recorded positive overrides a conflicting grouped normal in state, overview, and generated output.
6. **Clinical hierarchy.** Recorded positives, unresolved attention points, working diagnoses, and planned actions are more prominent than optional detail.
7. **Bounded support.** Show at most three primary diagnostic suggestions; suggestions remain unselected until accepted.
8. **Non-linear, keyboard-complete work.** The clinician may move among sections without losing data or being forced through a wizard.
9. **Faithful synthesis.** The live note contains only explicitly recorded facts and actions and preserves uncertainty.
10. **Prototype honesty.** Use synthetic data only and label outputs as drafts requiring clinician review.

## 3. Scope and non-goals

### In scope

- An isolated knee-pain workspace at the existing prototype route.
- Empty, Quick, Standard, acute-trauma, and gradual-atraumatic states.
- History, basic objective examination, grouped normals, positive overrides, assessment, plan, clinical attention points, and live journal output.
- Multiple concurrent working diagnoses.
- Explicit investigation status, requested imaging, indication, clinical question, and intended next action.
- Keyboard and supported responsive presentations.
- Synthetic scenario fixtures and automated behavioural checks.

### Non-goals

- Production pathway or shared workflow-engine changes.
- Patient persistence, EHR integration, real patient data, authentication, or audit certification.
- Autonomous diagnosis, triage, treatment, referral, or imaging decisions.
- Clinical validation, accessibility certification, regulatory approval, or production readiness.
- Final evidence rules, regional imaging criteria, medication prescribing, referral generation, or every KNEE-001 field.
- Speech input, generative AI output, or a universal pathway renderer.

## 4. Information architecture

The desktop workspace has one consultation header and two coordinated regions.

1. **Consultation header:** synthetic-context label, constant problem label `Knæsmerte`, side, Quick/Standard switch, scenario loader, reset, and section jump navigation.
2. **Clinical document:** one continuous surface containing Anamnese, Objektivt, Vurdering, and Plan. Section dividers replace separate section cards.
3. **Persistent clinical overview:** within the companion region, show recorded positives, active attention points, concurrent working diagnoses, and planned actions before the journal preview.
4. **Live journal:** a readable, continuously regenerated draft with copy action and review warning.
5. **Secondary outputs:** compact inactive placeholders only when needed to communicate prototype scope; they must not dominate or add a card stack.

There is no visible or editable `Problem` section. The clinical document heading uses side plus `knæsmerter` when side is known and `Knæsmerter` otherwise. The generated note always begins with `Problem: Knæsmerte`; side is documented in the history rather than creating a pain-versus-injury distinction.

## 5. Detailed interaction model

### 5.1 Entry and state

- Empty state opens in Quick mode with no clinical facts selected.
- `Problem: Knæsmerte` is fixed pathway context, not a selected clinical fact and not a user decision.
- Loading a scenario replaces current prototype state only after the scenario action is invoked; reset returns to empty Quick mode.
- Switching mode changes visibility only. It never removes, rewrites, or silently confirms a fact.

### 5.2 Document editing

- Each section begins with a concise narrative preview followed immediately by compact contextual controls.
- A control activation updates the narrative, overview, attention points, and journal in the same interaction cycle.
- Single-choice controls allow clearing the current value. Multi-choice controls toggle independent values.
- Free text is optional, visibly associated with its clinical concept, trimmed for output, and omitted when blank.
- Advanced details use inline disclosure (`Vis detaljer`) that does not move focus unexpectedly. Closing disclosure preserves values.
- Recorded Standard-only facts remain represented by a compact summary in Quick mode with `Redigér i Standard`.

### 5.3 Efficient grouping

- Common fields appear in compact rows; related options wrap within the same document paragraph rather than occupying separate cards.
- `Bekræft basisundersøgelse normal` is one explicit action. Its named contents are inspectable before and after confirmation.
- The grouped action fills only untouched included facts. Existing positives are never overwritten.
- Clearing the group removes only normal values added by the group and preserves positives and independently edited values.
- After confirmation, exceptions are available in place without opening another page or modal.

### 5.4 Onset and trauma

- Onset options are `Akut`, `Gradvis`, `Recidiverende`, `Uklart`, and `Andet`.
- Inline helper definitions are always available: **Akut** = sudden or clearly time-bounded onset; **Gradvis** = progressive onset without one clear starting event. These labels describe onset, not severity or duration.
- Precipitating factor includes trauma but there is no `knæskade` problem type.
- Selecting trauma reveals mechanism multi-select and trauma free text in context.
- Mechanisms are: twisting on planted foot, direct blow, fall, valgus force, varus force, hyperextension, forced flexion, patellar displacement, sport/contact event, traffic event, unclear, and other.
- `Anden mekanisme / beskrivelse` accepts concise free text. Structured mechanisms and free text may coexist and must both appear in the note.

### 5.5 Pain pattern

- Pain pattern is multi-select and includes load-related, start-up, stairs, rest, night, **constant**, **intermittent**, and other.
- Constant and intermittent are mutually exclusive. Selecting one replaces the other without affecting other pattern selections.
- The interface must not infer a pattern from duration, onset, or diagnosis.

### 5.6 Assessment and plan

- Up to three primary suggestions are visible. `Vis flere` reveals additional choices without changing their status.
- Accepting a suggestion adds it to an ordered working-diagnosis list; it does not replace existing diagnoses.
- A clinician can add multiple suggestions, remove them, reorder them, and add a free-text working diagnosis.
- Plan categories are compact multi-select actions with detail shown only when needed.
- Investigation wording must represent what was actually decided, not merely that imaging was “considered.” See section 11.

## 6. Quick mode

Quick mode is the default compact presentation for uncomplicated, coherent consultations. It shall expose:

- side; onset with definitions; duration; precipitating factor;
- compact pain location and pattern, including constant/intermittent;
- function, swelling, locking, instability, fever/systemic concern;
- optional trauma block when trauma is selected;
- grouped basic examination confirmation and prominent exceptions;
- up to three diagnostic suggestions and the current multi-diagnosis list;
- common plan actions, follow-up, and safety-net;
- an always-readable overview and live journal.

Quick mode should fit the core gradual-pain scenario without requiring expansion of Standard-only detail. If a Quick exclusion signal from KNEE-001 is recorded, display a non-blocking explanation and a focused `Skift til Standard` action. Attention points and existing abnormalities remain visible even if the clinician stays in Quick.

## 7. Standard mode

Standard mode adds progressive access to detailed trauma history, pain modifiers, swelling chronology, prior history, targeted examination, named tests, diagnosis qualification, investigation rationale, referral detail, and follow-up targets.

It must not render every possible field at once. Each added group begins collapsed unless triggered by a recorded fact or required to display an existing value. Standard uses the same document order and journal generator as Quick. Switching back to Quick leaves all Standard facts active and shows a concise `Yderligere oplysninger registreret` summary where necessary.

## 8. Keyboard interaction model

### 8.1 Baseline controls

- `Tab` and `Shift+Tab`: move through section navigation, clinical groups, free text, diagnoses, plan, and output actions in DOM/document order.
- Arrow keys: move within radio-like single-choice groups without leaving the group.
- `Space`: toggle a focused chip, checkbox-like option, grouped confirmation, or diagnosis.
- `Enter`: activate a focused action; in a single-line control it may select and advance to the next clinical group.
- `Escape`: close an open disclosure, suggestion list, or command surface and restore focus to its trigger.
- Text inputs preserve normal typing, selection, and editing behaviour.

### 8.2 Section and mode navigation

- A visible section navigator provides keyboard-accessible links to Anamnese, Objektivt, Vurdering, Plan, and Journal.
- Optional shortcuts, active only outside text-entry controls: `Alt+1` Anamnese, `Alt+2` Objektivt, `Alt+3` Vurdering, `Alt+4` Plan, `Alt+5` Journal; `Alt+Q` Quick; `Alt+S` Standard.
- Shortcut labels are visible in tooltips or the keyboard-help disclosure. No unmodified letter shortcut is permitted.
- Section jumps place focus on the section heading, not only scroll it into view.

### 8.3 Dynamic focus

- Revealing trauma details keeps focus on the triggering control; the new region follows it in tab order.
- Removing a diagnosis returns focus to the next diagnosis, or the add control when none remain.
- Switching modes returns focus to the mode control and announces the new mode and preserved-data summary.
- Every interactive element has a persistent, high-contrast `:focus-visible` indicator that is not clipped.

## 9. Field and data model changes

| Concept | Prototype v1 | Prototype v2 contract |
|---|---|---|
| Problem | `problem?: pain \| injury` | Remove field. Fixed pathway context `problemCode: knee-pain`; rendered text `Knæsmerte`. |
| Side | right/left/bilateral | Preserve; untouched allowed. |
| Onset | acute/gradual | Add recurrent/unclear/other and UI definitions. |
| Duration | free string | Preserve prototype string input; blank omitted. Do not derive onset. |
| Trauma mechanism | one value: twist | `traumaMechanisms: TraumaMechanism[]` plus `traumaMechanismNote?: string`. |
| Pain location | one value | Multi-select permitted by KNEE-001; v2 scenarios must support at least medial/diffuse. |
| Pain pattern | small string list | Typed list including constant/intermittent with mutual-exclusion rule. |
| Assessment | one string | `workingDiagnoses: WorkingDiagnosis[]`, ordered; each has id, label, source (`suggestion` or `free-text`), and optional qualifier. |
| Plan | string list | Typed `planActions[]`; investigation action carries explicit structured detail. |
| Imaging | vague plan token | `imaging.status`, `modality`, `side`, `indication`, `clinicalQuestion`, `plannedAction`, and optional prior-imaging text. |
| Normal group | one boolean plus facts | Preserve explicit group record; track included keys/provenance so clear removes only group-applied normals. |
| Touch state | absence in object | Preserve absence/`undefined` as untouched. Empty strings and empty arrays are removed before generation. |

Suggested imaging enums for the prototype:

- `status`: `not-indicated-now`, `planned`, `ordered-or-referred`, `completed-known`, `deferred`, `unclear`.
- `modality`: `acute-x-ray`, `standing-weight-bearing-x-ray`, `mri`, `ultrasound`, `other`.
- `plannedAction`: `no-imaging-now`, `prepare-referral`, `send-referral`, `review-existing-result`, `reassess-before-decision`, `other`.

Contradictory combinations must be prevented or surfaced inline; for example, `not-indicated-now` cannot coexist with `send-referral`. The prototype must not infer modality, indication, or action from a diagnosis.

## 10. Journal-generation rules

1. The note updates live and deterministically after every committed state change.
2. The first line is always `Problem: Knæsmerte`. There is no standalone Problem heading or pain/injury wording choice.
3. Remaining headings are `Anamnese`, `Objektivt`, `Vurdering`, and `Plan`; omit any heading whose body has no recorded content.
4. Side, onset, duration, trauma, mechanisms, free text, pain pattern, function, and relevant negatives are combined into natural Danish prose.
5. Acute and gradual wording follows the recorded onset only. Trauma does not turn the problem into `knæskade`.
6. Both structured trauma mechanisms and trauma free text are retained without duplication.
7. Constant/intermittent is documented only when selected.
8. Grouped normals are generated only after explicit confirmation. A positive exception replaces the conflicting normal phrase everywhere.
9. Working diagnoses are rendered in their displayed order, separated as concurrent provisional assessments. Multiple selections must not be collapsed into one or mislabeled as certainty.
10. Imaging text names status and action. It must not say “planned,” “ordered,” “referred,” or “completed” unless that exact state is recorded.
11. Suggestions, attention points, hidden options, scenario metadata, and UI helper text never enter the note unless explicitly accepted as facts/actions.
12. Blank free text, cleared selections, empty arrays, and every untouched field are omitted.
13. Mode changes do not change output for unchanged facts.
14. Output status is `Udkast – kræver klinisk gennemgang`; copy is allowed but does not imply approval.

Minimum imaging wording examples:

- Status `not-indicated-now` + action `no-imaging-now`: `Billeddiagnostik er ikke planlagt aktuelt.`
- Status `planned`, modality `standing-weight-bearing-x-ray`, with indication and question: `Stående belastet røntgen af højre knæ planlægges på grund af [indikation] med spørgsmål om [klinisk spørgsmål]. Henvisning forberedes.`
- Status `reassess-before-decision`: `Behov for billeddiagnostik revurderes ved klinisk opfølgning.`

## 11. Diagnosis and plan behaviour

### Diagnoses

- Zero, one, or multiple working diagnoses are valid.
- The first diagnosis is visually marked `Primær arbejdshypotese`; subsequent items are `Samtidig arbejdshypotese`. This is ordering, not certainty.
- Reordering changes display and journal order only.
- Suggestions explain why they are shown, remain visibly distinct from recorded diagnoses, and never auto-select.
- Serious threats remain attention points; selecting an ordinary diagnosis cannot dismiss them.
- Removing a diagnosis does not remove findings or plan actions.

### Plan and imaging

- Plan actions require explicit selection and are independently removable.
- Selecting `Billeddiagnostik` opens a compact required-detail row. A journal imaging sentence is not generated until a status/action is recorded.
- For `planned` or `ordered-or-referred`, modality, side, indication, clinical question, and action are visibly requested; missing values display `Mangler oplysninger` in the workspace, not invented note text.
- `ordered-or-referred` is available only as an explicit prototype state; the UI must not claim an external referral was actually sent.
- The prototype may show clinical attention prompts but must not decide whether imaging is indicated.
- Follow-up and safety-net actions remain separate from imaging so one does not imply the others.

## 12. Visual-density and typography requirements

- One dominant document surface; no separate card for each section or field group.
- Use rules, spacing, and typographic hierarchy for grouping. Nested cards are reserved for attention points or clearly bounded disclosures.
- Desktop clinical document body: minimum 16 px, line-height 1.45–1.6. Labels and controls: minimum 14 px. Supporting text: minimum 12 px and never the sole carrier of essential meaning.
- Journal preview: minimum 16 px, line-height 1.5, with a readable measure of approximately 60–78 characters.
- Primary section headings: 20–24 px; subsection headings: 16–18 px. Avoid 9–11 px uppercase labels for important clinical content.
- Interactive targets: at least 40 px high on desktop and 44 px on touch-oriented/narrow layouts, with at least 4 px separation where wrapping occurs.
- Default section vertical padding: 12–16 px; control-row gap: 6–10 px. Avoid decorative whitespace exceeding the spacing needed to establish hierarchy.
- At 1440 × 900, the initial viewport must show the consultation header, all four section names, the active section’s core controls, clinical overview, and the beginning of the journal without horizontal scrolling.
- Recorded positives use weight and placement, not colour alone. Attention points are visually distinct but do not compete with the journal heading.
- The companion region is sticky only when it remains fully operable; its internal scroll area must not trap keyboard or wheel navigation.

## 13. Accessibility requirements

- Use native headings, landmarks, fieldsets/legends, buttons, links, inputs, and lists wherever applicable.
- Single-choice groups implement radio semantics and roving arrow-key navigation; multi-choice chips expose selected state programmatically.
- Every input has an accessible name; helper and error text is programmatically associated.
- Live journal updates use a non-interruptive status strategy; do not announce the full note on every keystroke. Announce concise committed changes or provide an explicit review action.
- Mode changes, attention-point additions, validation errors, and grouped-confirmation results receive concise announcements.
- Focus order matches visual/document order, focus is visible at 200% zoom, and no focused element is obscured by sticky content.
- Text and icons meet WCAG 2.2 AA contrast targets; colour is never the only state indicator.
- Content reflows at 320 CSS px without two-dimensional scrolling except where an essential bounded control requires it.
- Support reduced motion. No animation is required to understand state changes.
- Automated checks are necessary but not sufficient; CDR-002 records manual keyboard, zoom/reflow, focus, name/role/state, and contrast evidence as evaluated or `N/E`.

## 14. Safety constraints

- Synthetic prototype data only; fixtures and UI must be clearly labelled synthetic.
- No real identifiers, persistence, network submission, or production write path.
- Untouched does not mean negative, normal, assessed, not relevant, or complete.
- Grouped normals require deliberate activation, list their scope, are reversible, and cannot overwrite positives.
- Suggestions never become diagnoses; attention points never become facts; diagnoses never become plans.
- Hidden Standard values remain active and inspectable; no mode switch may silently discard them.
- Contradictions are prevented or surfaced without inventing a resolution.
- Imaging and referral language must distinguish discussion, plan, preparation, external action, and known result.
- Output never claims external completion that the isolated prototype cannot perform.
- The prototype displays that it does not replace clinical judgement, acute assessment, evidence review, or regional requirements.
- Clinical safety, practising-clinician usefulness, and production readiness remain unevaluated until separately reviewed.

## 15. Responsive behaviour

- **≥1200 px:** document and companion region side by side; companion region may be sticky.
- **768–1199 px:** single document column with a compact sticky section/overview bar; journal follows Plan and is reachable from the section navigator.
- **320–767 px:** single column, stacked control choices, 44 px targets, non-sticky companion content, and no clipped focus indicators.
- Section order and clinical meaning are identical at every width. Responsive changes may relocate summaries but must not hide active attention points, positive findings, diagnoses, or planned actions.
- At all supported sizes, mode switch, reset, section navigation, grouped confirmation, exceptions, diagnosis list, imaging details, and journal copy remain operable by keyboard.
- CDR-002 shall use declared representative viewports and record the actual viewport values; this specification does not claim they have passed.

## 16. Acceptance criteria

Identifiers are used by the traceability table and implementation tests.

- **AC-01:** No visible Problem section or pain/injury choice exists; every generated note begins exactly `Problem: Knæsmerte`.
- **AC-02:** Trauma and atraumatic states both use the same `Knæsmerte` context and cannot produce `knæskade`.
- **AC-03:** Constant and intermittent pain are selectable, mutually exclusive, independently clearable, and omitted when untouched.
- **AC-04:** At least the twelve specified trauma mechanisms and a coexisting trauma free-text value are supported and faithfully generated.
- **AC-05:** Acute and gradual show concise definitions and are not inferred from trauma or duration.
- **AC-06:** At least three concurrent working diagnoses can be added, ordered, removed independently, and rendered without false certainty.
- **AC-07:** Imaging state captures explicit status, modality when relevant, indication, clinical question, and planned action; generated wording exactly reflects recorded state and never claims an external action.
- **AC-08:** Quick and Standard share state; round trips preserve Standard-only details, positives, diagnoses, and output.
- **AC-09:** Group confirmation requires activation, exposes its members, is reversible, preserves pre-existing positives, and positive overrides replace conflicting normal output.
- **AC-10:** Empty and partially completed states omit every untouched clinical field and empty section from the generated note, except fixed `Problem: Knæsmerte`.
- **AC-11:** No more than three primary suggestions are visible before `Vis flere`; none is selected by default.
- **AC-12:** The complete core path is operable using the keyboard model in section 8, with logical order, restored focus, and visible focus at every step.
- **AC-13:** At 1440 × 900 the information specified in section 12 is visible without horizontal scrolling; CDR-002 records actual screenshots and scroll observations.
- **AC-14:** Typography and target sizes meet section 12 requirements at all supported responsive tiers and at 200% zoom.
- **AC-15:** The interface uses one continuous document surface with section dividers; field-level card stacks and redundant output cards are absent.
- **AC-16:** Recorded positives, active attention points, concurrent diagnoses, and planned actions appear together in the persistent clinical overview.
- **AC-17:** Both complete scenarios in section 17 produce the exact semantic content specified, with no extra clinical claims.
- **AC-18:** Prototype fixtures, UI, and CDR evidence contain synthetic data only and are labelled accordingly.
- **AC-19:** Product code outside the isolated prototype is unchanged for v2 unless separately authorised.
- **AC-20:** Automated unit and browser tests cover state preservation, untouched omission, grouped-normal override, multi-diagnosis output, trauma free text, pain-pattern exclusivity, imaging wording, and keyboard focus order.

## 17. Two complete clinical test scenarios

These are prescribed synthetic review scenarios, not completed tests.

### Scenario A — acute twisting trauma with concurrent hypotheses and planned imaging

**Start:** Reset to empty state; switch to Standard. Synthetic adult, no identifying data.

**Record:** right side; acute onset (definition visible); since yesterday; trauma; twisting on planted foot plus sport/contact event; trauma note `Vrid under fodbold med foden fikseret i græsset`; medial pain; constant pain; cannot take four weight-bearing steps; delayed mild swelling; no fever; no true locking; limp; mild effusion; reduced extension; intact straight-leg raise; medial joint-line tenderness. Do not use grouped normal confirmation.

**Assessment:** add, in order, `Meniskrelaterede gener`, `Knæforstuvning`, and `Ligamentskade`. Verify all three remain editable and no suggestion is accepted implicitly.

**Plan:** imaging status `planned`; modality `acute-x-ray`; side right; indication `Traume og manglende evne til fire vægtbærende skridt`; clinical question `Fraktur?`; planned action `prepare-referral`; follow-up after imaging. The prototype must not claim that a referral was sent.

**Expected journal semantics:** fixed `Problem: Knæsmerte`; right-sided acute knee pain since yesterday; both structured mechanisms and trauma note without harmful duplication; constant medial pain; weight-bearing limitation; swelling; relevant negatives; objective positives; all three provisional working diagnoses in order; acute X-ray planned with indication, question, and preparation action; follow-up after imaging. No unrecorded normality, completed referral, or result.

**Review path:** complete by keyboard, switch Quick then Standard, verify all facts and journal semantics persist, inspect the fracture-screening attention point, then copy the draft.

### Scenario B — gradual intermittent load-related pain with grouped normals and no imaging now

**Start:** Reset to empty Quick mode. Synthetic adult, no identifying data.

**Record:** left side; gradual onset (definition visible); six months; no identified trauma; medial and diffuse locations; intermittent, load-related, stairs, and start-up patterns; normal function; no swelling; no true locking; no fever. Activate `Bekræft basisundersøgelse normal`, inspect its members, then override effusion to mild.

**Assessment:** add `Knæartrose` and `Meniskrelaterede gener`, in that order. Leave the third visible suggestion untouched.

**Plan:** information discussed; graded exercise; imaging status `not-indicated-now`; planned action `no-imaging-now`; follow-up in 4–6 weeks. Do not record medication or referral.

**Expected journal semantics:** fixed `Problem: Knæsmerte`; left-sided gradual symptoms through six months; intermittent load/stair/start-up pattern; explicit atraumatic history and recorded negatives; grouped normal findings except the effusion phrase is mild and the conflicting no-significant-effusion phrase is absent; two concurrent provisional diagnoses; no imaging currently planned; exercise and follow-up. No medication, referral, third diagnosis, or untouched fields.

**Review path:** complete in Quick by keyboard, inspect the live journal, switch to Standard and back, clear and reapply the normal group, and verify the positive effusion persists throughout.

## 18. CDR-002 review plan

CDR-002 is a fresh evidence-based browser review under the framework; it must not treat this specification or automated tests as proof of clinical usefulness.

1. Record commit, preview URL/expiry, browser/version, OS, viewport, reviewer role, scenario, and empty starting state.
2. Run both section 17 scenarios plus incomplete input, rapid correction, grouped-normal clearing, contradictory imaging attempt, mode round trip, refresh/back behaviour, and narrow viewport.
3. Capture screenshots or video, DOM/name-role-state evidence, generated journal text, focus order, focus restoration, keyboard completion, and scroll positions.
4. Record observed clicks, keystrokes, scroll events/distance, completion time, journal edits, and compensatory free text. Define counting rules before use; do not invent targets after observation.
5. Apply every item in the standard checklist and score each framework dimension independently. Use `N/E` for anything not evaluated.
6. Compare CDR-001 strengths for regression: live generation, grouped normals, positive overrides, Quick/Standard shared state, limited suggestions, and document-as-workspace direction.
7. Ask practising clinicians to evaluate workflow realism, language, and usefulness only in an appropriately governed separate activity. Until performed, mark this evidence `N/E`.
8. Give each finding scenario, steps, expected/observed result, evidence reference, effect, severity, confidence, disposition, owner, and acceptance criterion.
9. Do not calculate an average that conceals a blocker. Apply the scoring decision matrix and safety escalation rules.

### Planned evidence set

- `CDR-002-S01/S02`: desktop screenshots at defined milestones and initial/final scroll position.
- `CDR-002-K01`: uninterrupted keyboard recording with focus overlay and focus-order log.
- `CDR-002-O01/O02`: exact generated notes for the two scenarios plus state snapshots.
- `CDR-002-A01`: accessibility inspection covering semantics, focus, 200% zoom/reflow, and contrast.
- `CDR-002-R01`: representative tablet/narrow viewport evidence.
- `CDR-002-F01`: incomplete/contradictory/recovery-state evidence.
- `CDR-002-M01`: measured interaction counts and declared counting method.

Evidence identifiers are planned labels, not completed artifacts.

## 19. Migration guidance from Prototype v1

1. Preserve the isolated route, scenario-loader concept, shared immutable state helpers, deterministic generator, grouped-normal definitions, attention-point separation, and current unit/browser regression intent.
2. Remove `facts.problem` and all problem choice UI. Map both v1 fixture values (`pain`, `injury`) to fixed `problemCode: knee-pain`; do not retain `knæskade` in generated output.
3. Replace singular `mechanism` with `traumaMechanisms[]` and `traumaMechanismNote`; migrate `twist` to `twisting-planted-foot`.
4. Extend typed pain patterns and enforce constant/intermittent mutual exclusion in the state layer, not only the component.
5. Replace `assessment?: string` with ordered `workingDiagnoses[]`; migrate a non-empty assessment string as one free-text diagnosis.
6. Replace the `imaging` plan token and vague sentence with structured imaging state. Do not migrate it to `planned` without explicit fixture intent; legacy ambiguous state should be `unclear` and omitted from claims of action.
7. Add provenance to grouped normals so clearing a group cannot remove an independently recorded normal. Retain positive-override behaviour.
8. Refactor the component from section/card composition into one semantic document surface and one overview/journal companion region.
9. Increase typography and control sizes before density tuning; density must come from layout and reduced containers, not smaller text.
10. Add keyboard semantics to reusable choice primitives and automated focus tests.
11. Update synthetic fixtures and tests; do not reuse any real or copied patient data.
12. Keep changes confined to the isolated prototype and its tests unless an RFC and separate authorization approve shared-engine work.

## 20. Prioritised implementation slices

1. **P0 — State and generator safety:** fixed problem context, untouched omission, typed onset/pattern/trauma, multi-diagnosis model, structured imaging, grouped-normal provenance, and unit tests.
2. **P0 — Document architecture:** continuous semantic document, persistent overview, live journal, removal of redundant cards/problem controls, and responsive region order.
3. **P0 — Core interactions:** compact Quick flow, progressive Standard disclosures, trauma free text, constant/intermittent rule, multi-diagnosis ordering, and explicit imaging details.
4. **P0 — Keyboard and focus:** native semantics, roving group navigation, section/mode shortcuts, focus restoration, visible focus, and browser coverage.
5. **P1 — Visual system:** typography, target sizes, hierarchy, density, sticky behaviour, 200% zoom, and narrow-layout refinement.
6. **P1 — Safety and recovery:** contradiction handling, attention-point persistence, mode round trips, clear/reset behaviour, and incomplete-output states.
7. **P1 — Synthetic scenarios and regression:** implement both complete scenarios and exact semantic assertions; retain v1 strength regressions.
8. **P2 — CDR-002 evidence instrumentation:** stable scenario IDs, state/evidence capture hooks, declared interaction counting, and review build metadata.
9. **P2 — CDR-002 execution:** deploy isolated preview, run the protocol, record `N/E` honestly, score, triage findings, and decide the next iteration. This slice is review work, not an automated pass gate.

## CDR-001 traceability

| CDR-001 finding / preserved strength | Proposed v2 change | Acceptance criterion | Planned CDR-002 evidence |
|---|---|---|---|
| Interface feels like a form; hierarchy and overview are weak. | One continuous clinical document plus persistent overview of positives, attention points, diagnoses, and actions. | AC-15, AC-16 | S01/S02 screenshots, scroll observations, reviewer narrative; practising-clinician evidence remains `N/E` unless separately obtained. |
| Text too small. | Minimum type sizes, readable line heights, zoom requirements. | AC-14 | A01 computed-size, contrast, 200% zoom/reflow evidence. |
| Excess whitespace and separate cards reduce density. | Section dividers, compact rows, limited bounded containers, explicit spacing limits. | AC-13, AC-15 | S01/S02 viewport screenshots and M01 scroll measurements. |
| Too many small decisions and too much scrolling. | Group related controls, retain grouped normals, progressive disclosure, section navigation, compact Quick path. | AC-09, AC-13 | M01 declared click/keystroke/scroll counts for both scenarios; direct observation notes. |
| Fast keyboard navigation required. | Full keyboard contract, section/mode shortcuts, dynamic focus restoration. | AC-12 | K01 uninterrupted keyboard recording and focus-order log. |
| Redundant Problem section. | Remove section and control; fixed inline problem context. | AC-01 | S01/S02 workspace screenshots and O01/O02 exact first line. |
| Automatically document `Problem: Knæsmerte`. | Fixed first note line independent of touch state. | AC-01 | O01/O02 exact journal capture plus empty-state unit/browser assertion. |
| Knæsmerte versus knæskade distinction is not useful. | Remove `pain \| injury`; trauma is a history fact only. | AC-02 | F01 state inspection across trauma/atraumatic cases and O01/O02 text search. |
| Pain pattern lacks constant/intermittent. | Add both with mutual exclusion and untouched omission. | AC-03 | S01/S02 interaction capture and O01/O02 journal output. |
| Trauma mechanism too constrained. | Multi-select expanded mechanism set. | AC-04 | S01 control/state capture and O01 output. |
| Trauma free text absent. | Add coexisting contextual trauma note. | AC-04 | S01 entered value, state snapshot, and O01 output. |
| Acute versus gradual lacks concise definitions. | Always-available definitions separating onset from severity/duration. | AC-05 | S01/S02 screenshots and name/description inspection. |
| Multiple concurrent working diagnoses unsupported. | Ordered multi-diagnosis collection with primary/concurrent display and free text. | AC-06 | S01/S02 selection/reorder/remove recording, state snapshots, O01/O02 output. |
| Imaging output passive and vague. | Structured status, modality, indication, question, and planned action with contradiction rules. | AC-07 | O01/O02 exact wording and F01 contradictory/incomplete imaging evidence. |
| Generated journal output is substantially improved (preserve). | Retain deterministic live synthesis; tighten omission and explicit-action rules. | AC-10, AC-17 | O01/O02 exact notes and state-to-output comparison. |
| Grouped normal confirmation works well (preserve). | Retain explicit inspectable/reversible group with provenance. | AC-09 | S02 interaction recording, state snapshots, and output before/after confirmation. |
| Positive overrides work (preserve). | Positive remains authoritative through group clear/reapply and mode changes. | AC-09 | S02 override/clear/reapply recording and exact output comparison. |
| Quick and Standard are directionally useful (preserve). | Same state and generator; compact Quick, progressive Standard, visible preserved-detail summary. | AC-08 | S01/S02 round-trip recording and before/after state/output diff. |
| Limit visible diagnostic suggestions to three (preserve). | Three primary suggestions; additional choices behind `Vis flere`; none selected by default. | AC-11 | S01/S02 initial screenshot, DOM count, and selection-state inspection. |
| Clinical document as workspace remains promising (preserve). | Keep live document/note relationship as the central interaction model. | AC-15, AC-16 | S01/S02 end-to-end recording and framework clinical-overview/workflow scoring; no claim before review. |
| Untouched-field omission must be preserved. | Absence remains untouched; generator omits empty fields/sections except fixed problem context. | AC-10 | F01 partial-state matrix and O01/O02 plus unit/browser assertions. |

## Review gate

Prototype v2 may proceed to CDR-002 only after the P0 slices and relevant automated checks pass. Passing automated checks does not approve clinical validity, safety, accessibility, or production use. CDR-002 must report observed evidence and `N/E` separately and must not merge or deploy v2 into production pathways by implication.
