# Clinical Document Workspace Prototype v2 implementation plan

**Status:** Proposed plan; no implementation completed

**Target:** Isolated Clinical Document Workspace Prototype v2

**Planning branch:** `feature/clinical-document-workspace-v2-plan`

**Last updated:** 2026-07-18

## 1. Purpose, authority, and evidence boundary

This plan translates the [Prototype v2 specification](CLINICAL-DOCUMENT-WORKSPACE-v2-SPEC.md) into small implementation slices. It is informed by [CDR-001](../design-review/examples/CDR-001-Clinical-Document-Workspace.md), governed by the [Clinical Design Review framework](../design-review/framework.md), and based on static analysis of the existing prototype on `feature/clinical-document-workspace-prototype`.

The plan does not modify or authorise production code. It does not claim that Prototype v2 has been implemented, tested, clinically validated, accessibility-audited, or reviewed in a browser. All proposed checks and CDR-002 artifacts are future work.

## 2. Current implementation analysis

### 2.1 Repository and branch position

Prototype v1 is not present on current `main`. It is an isolated six-file addition on `feature/clinical-document-workspace-prototype`. The v2 implementation should start from current `main` and use that branch as a source reference; it should not merge the old branch wholesale because the visible architecture and state contracts require material v2 changes.

| Area | Current file | Current role |
|---|---|---|
| Route | `app/prototype/clinical-document-workspace/page.tsx` | Next.js App Router page and metadata; renders one client component. |
| State/domain | `clinical/prototypes/clinical-document-workspace.ts` | Types, fixtures, immutable update helpers, grouped normals, suggestions, attention points, and journal generator. |
| UI | `components/prototype/clinical-document-workspace/ClinicalDocumentWorkspacePrototype.tsx` | One 646-line client component containing the entire workspace and local helper components. |
| Styling | `components/prototype/clinical-document-workspace/ClinicalDocumentWorkspacePrototype.module.css` | One 770-line CSS module for layout, cards, controls, focus, and two responsive breakpoints. |
| Unit tests | `clinical/prototypes/clinical-document-workspace.test.ts` | Four Vitest tests for shared mode state, explicit grouped normals, positive override, and untouched omission. |
| Browser tests | `e2e/clinical-document-workspace.spec.ts` | Three Playwright tests for mode preservation, grouped-normal activation, and positive override. |

### 2.2 Route and isolation

The existing route is `/prototype/clinical-document-workspace`. The route imports only the prototype component, and the state module sits under `clinical/prototypes/`; this is a useful isolation boundary. The UI links back to `/`, uses local React state, and does not persist or submit data.

Reuse the route and isolation intent. Update the page metadata only if needed to distinguish v2. Do not move prototype state into production pathway or workflow-engine modules, add persistence, or connect external services.

### 2.3 Component structure

`ClinicalDocumentWorkspacePrototype` currently owns:

- local prototype state;
- scenario selection and reset;
- mode switching;
- clipboard feedback;
- standard-only detail counting;
- all four document sections;
- grouped normals and exceptions;
- diagnostic suggestions;
- plan actions;
- attention points, note preview, and output placeholders.

Local helper components are `ModeSwitch`, `DocumentSection`, `ChoiceGroup`, `MultiChoiceGroup`, and `OutputPlaceholder`. This proves the core flow but makes state transitions, focus restoration, semantics, and section-level testing tightly coupled to one file.

### 2.4 State handling and derived behavior

The prototype uses `useState(createEmptyPrototypeState)` and pure immutable helpers. `useMemo` derives the note, suggestions, and attention points. The current model includes:

- `mode`, optional `scenarioId`, `normalGroupConfirmed`, and `facts`;
- optional fields represented by absence/`undefined`;
- one `problem` value (`pain` or `injury`);
- only `acute` or `gradual` onset;
- one trauma mechanism (`twist`);
- one pain location and three pain-pattern strings;
- one assessment string;
- a flat list of plan strings;
- one boolean for grouped-normal confirmation.

Pure update helpers are reusable in principle, but v2 needs a typed action/reducer boundary because multi-diagnosis ordering, normal provenance, imaging validation, mutual exclusions, disclosures, and focus effects create more transitions than independent field setters can safely express.

### 2.5 Journal generation

`generatePrototypeNote` is deterministic and omits empty sections. It composes `Problem`, `Anamnese`, `Objektivt`, `Vurdering`, and `Plan` from state. Positive objective findings replace conflicting normal wording because only the current fact value is generated.

The generator should remain pure and deterministic. It must be rewritten to:

- emit fixed `Problem: Knæsmerte` even from otherwise empty state;
- remove pain-versus-injury wording;
- support structured and free-text trauma details;
- render typed pain patterns, multiple diagnoses, and explicit imaging status/action;
- preserve untouched omission and grouped-normal provenance;
- return structured sections as an intermediate representation before producing text.

### 2.6 Styling and responsive behavior

The current CSS has useful desktop/two-column and narrow/single-column breakpoints plus a visible `:focus-visible` outline. However, important labels and controls frequently use 8–11 px text, chips are 29 px high, and the layout creates many bordered cards and nested surfaces. These directly match the CDR-001 density/readability findings.

The stylesheet should be replaced around v2 layout tokens and semantic regions, not incrementally patched class by class. Preserve only useful color variables already defined elsewhere, the calm visual direction, and the focus-outline concept after verifying contrast and clipping.

### 2.7 Existing tests

The four unit tests and three Playwright tests are small but valuable regression seeds. Reuse their intent, not their current expected strings or selectors. They do not cover:

- fixed problem output;
- expanded onset/trauma/pain fields;
- grouped-normal provenance when an independent normal is cleared;
- multiple diagnoses and reordering;
- imaging validation and wording;
- full keyboard operation or focus restoration;
- Quick exclusion prompts;
- responsive/zoom behavior;
- the two complete v2 scenarios;
- contradiction and recovery behavior.

### 2.8 Reuse/replace decision

| Current part | Decision | Reason |
|---|---|---|
| Isolated route and metadata pattern | Reuse | Correct prototype boundary with no production integration. |
| Pure state/generator module location | Reuse | Keeps clinical prototype behavior testable outside React. |
| Immutable helper style | Reuse behind reducer actions | Deterministic and easy to unit-test, but current setters are too granular. |
| Scenario fixtures | Rewrite values, reuse fixture pattern | Synthetic scenarios are useful; v1 shapes conflict with v2. |
| Grouped-normal definitions/status | Extend | Explicit activation and positive override are strengths; add per-fact provenance. |
| Suggestion derivation | Extend | Three-primary limit and reasons are strengths; acceptance must add to a list. |
| Attention-point derivation | Reuse/extend | Correct separation from facts and diagnoses. |
| Journal generator | Rewrite around section model | Current composition cannot safely express v2 diagnoses/imaging contracts. |
| Main React component | Decompose/rewrite | Current monolith obstructs focus, semantics, and isolated testing. |
| Choice controls | Replace | `aria-pressed` buttons do not implement required radio semantics/arrow navigation. |
| CSS module | Replace substantially | Current small type, low targets, cards, and spacing conflict with v2. |
| Output placeholders | Remove or collapse | They add cards and do not support the v2 core review. |
| Unit/browser test files | Extend/restructure | Existing regression intent is valid but coverage is insufficient. |

## 3. Specification mapping

The table maps major v2 requirements to proposed implementation and evidence. File names under `components/prototype/clinical-document-workspace/` are proposed; exact names may be adjusted within a slice without changing responsibilities.

| Requirement | Affected files/components | Implementation approach | Testing approach | Primary risk |
|---|---|---|---|---|
| Fixed `Problem: Knæsmerte`; no Problem section or pain/injury choice | State module; `ClinicalDocumentWorkspacePrototype`; `ClinicalDocumentHeader`; journal generator | Remove `facts.problem`; introduce constant `problemCode: "knee-pain"`; render fixed context and fixed first line. | Unit: empty, trauma, and atraumatic output; browser: no Problem control and exact first line. | Old fixtures or UI paths continue producing `knæskade`. |
| One continuous document surface | `ClinicalDocumentWorkspacePrototype`; `ClinicalDocument`; section components; CSS | Use one document landmark with four ruled sections; contextual controls remain inside sections; avoid field cards. | Browser DOM/landmark assertions; 1440×900 screenshot/scroll evidence reserved for CDR-002. | Visual refactor recreates cards or hides overview. |
| Persistent clinical overview | `ClinicalOverview`; selectors in state module | Derive positives, attention points, ordered diagnoses, and plan actions from one state; render before note in companion region. | Unit selector tests; browser updates after each recorded change and mode switch. | Derived summaries diverge from journal/state. |
| Shared Quick/Standard facts | Reducer/state module; `ModeSwitch`; `PreservedDetailSummary` | Mode is presentation state only; never prune facts; derive Standard-only count and summary from active facts. | Unit round trips with deep equality; browser scenario edits across both modes. | Conditional rendering accidentally resets local child state. |
| Progressive Standard disclosures | Reducer UI state; `ClinicalDisclosure`; History/Objective/Plan sections | Keep clinical facts separate from disclosure state; auto-open a group only when it contains an existing fact; close without clearing. | Reducer tests; browser Escape/focus/preservation tests. | Hidden active data becomes undiscoverable. |
| Onset definitions and expanded values | Types/options; `OnsetGroup` | Typed enum with acute/gradual/recurrent/unclear/other; persistent descriptions via `aria-describedby`. | Unit output/untouched tests; browser accessible-description checks. | Definitions imply severity or clinical certainty. |
| Expanded trauma mechanisms and free text | State types/reducer; `TraumaHistory`; generator | Typed multi-select with twelve specified values plus trimmed optional note; structured values and note coexist. | Unit toggle/order/dedup/output; browser Scenario A. | Duplicate or awkward generated prose. |
| Constant/intermittent pain | State reducer; `PainPatternGroup`; generator | Typed list; reducer enforces mutual exclusion only for this pair. | Unit transition matrix and omission; browser keyboard selection in both scenarios. | UI-only exclusivity allows invalid fixture state. |
| Explicit grouped normals with provenance | State types/reducer; `NormalFindingGroup`; selectors; generator | Track group activation plus `normalProvenance` keys added by group. Apply only to untouched values; clear only provenance-owned normals; any positive removes group provenance for that key. | Unit exhaustive apply/edit/clear/reapply cases; browser Scenario B and positive override regression. | Clearing group deletes independently recorded facts. |
| Positive overrides | Reducer; normal status selector; overview; generator | Central conflict policy returns effective fact and status; positive is authoritative in every derived view. | Unit conflicting state assertions; browser note and visible status before/after mode changes. | Contradictory normal text remains in one output surface. |
| No more than three visible suggestions | Suggestion selector; `DiagnosisSuggestions` | Return `primary.slice(0, 3)` and additional collection; suggestions remain stateless until accepted. | Unit count/default selection; browser DOM count before/after `Vis flere`. | Suggestion accidentally becomes diagnosis through scenario load. |
| Multiple concurrent working diagnoses | State types/reducer; `WorkingDiagnosisList`; generator | Ordered `WorkingDiagnosis[]`; actions add/remove/move; reject duplicate IDs; support trimmed free-text diagnosis; label first as primary, rest concurrent. | Unit add/remove/reorder/duplicate/output; browser both scenarios and focus restoration. | Ordering is misread as certainty or removal mutates plan. |
| Explicit imaging status and action | State types/validation; `ImagingPlan`; `PlanSection`; generator | Structured `ImagingPlan`; compatibility validator prevents impossible pairs; incomplete UI state shows `Mangler oplysninger`; generator emits only sufficiently explicit recorded statements. | Table-driven unit tests for valid/invalid combinations and exact wording; browser incomplete, contradiction, and both scenarios. | Generated text claims referral/result not performed by prototype. |
| Untouched-field omission | Reducer normalization; journal section builders | Delete blank strings/empty arrays; represent untouched by absence; never derive negatives; fixed problem line is the sole exception. | Unit partial-state matrix and property-style transition cases; browser clear/reset checks. | Controlled inputs serialize empty values as facts. |
| Live deterministic journal | `journal.ts` or state module; `JournalPreview` | Build typed `JournalSection[]`, then format Danish text; memoize only as optimization; use same function in tests and UI. | Snapshot-free exact semantic unit assertions plus Scenario A/B output assertions. | Brittle concatenation or inconsistent punctuation/order. |
| Non-interruptive live announcements | `JournalPreview`; `WorkspaceStatus` | Do not put full note in assertive live region; announce concise committed state changes via polite status; provide explicit journal jump/review. | Browser accessibility checks for live-region contents and typing behavior. | Screen reader receives full note on every keystroke. |
| Full keyboard path | `useWorkspaceShortcuts`; `SectionNavigator`; radio/multi-choice primitives; disclosures; diagnosis list | Native radios/checkboxes where visual design allows; roving tabindex for custom radio groups; Alt shortcuts ignored in editable targets; explicit focus targets/refs. | Playwright keyboard-only Scenario A/B, arrow behavior, shortcut suppression in text fields, focus restoration. | Global shortcuts intercept typing or browser/OS commands. |
| Visible focus and semantics | All controls; CSS | Native elements, fieldset/legend, associated descriptions/errors, stable IDs, unclipped ≥3 px focus ring, programmatic selected/error state. | Playwright role/name/state assertions; automated accessibility tooling only if separately added; manual evidence in CDR-002. | Custom chips regress accessible semantics. |
| Density and typography | CSS; all layout components | Define local CSS custom properties for type, target, gap, and measure; ≥14 px controls, ≥16 px document/note, ≥40/44 px targets; use rules instead of cards. | CSS/static assertions where practical; viewport screenshots and measurements in CDR-002. | Density achieved by shrinking text instead of reducing containers. |
| Responsive tiers | CSS; `WorkspaceShell`; `SectionNavigator`; companion region | Two-column ≥1200; reordered single column 768–1199; non-sticky single column 320–767; keep positives/attention/diagnoses/actions visible. | Playwright representative viewports, no horizontal overflow, keyboard reachability; manual 200% zoom/reflow in CDR-002. | Sticky region traps scrolling/focus or obscures content. |
| Synthetic-only prototype | Route, fixtures, header, tests | Keep scenario data inline and synthetic; prominent synthetic/prototype label; no persistence or network submission. | Source inspection; browser label assertion; network expectations limited to static app assets. | Test fixtures resemble real identifiers or later integration escapes isolation. |
| CDR-002 evidence readiness | Fixtures; stable test IDs only when semantic locators cannot suffice; build metadata display | Stable scenario IDs, visible commit/build metadata if available without network calls, and deterministic review states; do not pre-create evidence claims. | Dry-run browser protocol after implementation; artifacts remain future CDR work. | Instrumentation changes user experience or is mistaken for completed evidence. |

## 4. Proposed architecture

### 4.1 File and component structure

Keep the route and prototype domain isolated while splitting responsibilities:

```text
app/prototype/clinical-document-workspace/
└── page.tsx

clinical/prototypes/clinical-document-workspace/
├── model.ts                 # typed facts, diagnoses, imaging, provenance, state
├── reducer.ts               # normalized clinical transitions and UI-independent rules
├── selectors.ts             # overview, suggestions, attention points, preserved detail
├── journal.ts               # section builders and deterministic formatter
├── scenarios.ts             # synthetic fixtures only
├── model.test.ts
├── reducer.test.ts
└── journal.test.ts

components/prototype/clinical-document-workspace/
├── ClinicalDocumentWorkspacePrototype.tsx  # composition and reducer wiring
├── WorkspaceHeader.tsx
├── SectionNavigator.tsx
├── ClinicalDocument.tsx
├── HistorySection.tsx
├── ObjectiveSection.tsx
├── AssessmentSection.tsx
├── PlanSection.tsx
├── ClinicalOverview.tsx
├── JournalPreview.tsx
├── controls/
│   ├── SingleChoiceGroup.tsx
│   ├── MultiChoiceGroup.tsx
│   └── ClinicalDisclosure.tsx
├── useWorkspaceShortcuts.ts
└── ClinicalDocumentWorkspacePrototype.module.css

e2e/
└── clinical-document-workspace.spec.ts
```

This is a proposed decomposition, not a mandate to create one file per visual fragment. Small leaf components may remain colocated when they have no independent state or test value. Domain rules must not move into JSX components.

### 4.2 State architecture

Use `useReducer` with a pure `workspaceReducer`. Keep clinical state and ephemeral UI state separate:

```ts
interface ClinicalDocumentState {
  mode: "quick" | "standard";
  scenarioId?: "acute-twist" | "gradual-load";
  facts: PrototypeFacts;
  workingDiagnoses: WorkingDiagnosis[];
  planActions: PlanAction[];
  imaging?: ImagingPlan;
  normalGroup: {
    confirmed: boolean;
    appliedKeys: NormalFindingKey[];
  };
}

interface WorkspaceUiState {
  openDisclosures: string[];
  showMoreSuggestions: boolean;
  copied: boolean;
  statusMessage?: string;
}
```

Clinical reducer actions should express intent rather than raw object mutation: `setSingleFact`, `togglePainPattern`, `toggleTraumaMechanism`, `confirmNormalGroup`, `clearNormalGroup`, `addDiagnosis`, `removeDiagnosis`, `moveDiagnosis`, `setImagingField`, `clearImaging`, `setMode`, `loadScenario`, and `reset`.

Reducer invariants:

- blank strings and empty lists are removed;
- constant/intermittent cannot coexist;
- diagnosis IDs are unique and order is explicit;
- grouped normals never overwrite positives;
- group clearing removes only group-owned values;
- invalid imaging status/action pairs cannot enter valid clinical state;
- changing mode never prunes clinical facts;
- scenario loading is the only bulk state replacement action.

### 4.3 Data model changes

Implement the types defined by the v2 specification rather than extending strings opportunistically:

- remove `problem` and use fixed `problemCode` context;
- expand `Onset`;
- use `TraumaMechanism[]` and `traumaMechanismNote`;
- use `PainLocation[]` and typed `PainPattern[]`;
- replace `assessment` with ordered `WorkingDiagnosis[]` including source and optional qualifier;
- replace `plan: string[]` with typed `PlanAction[]` and structured `ImagingPlan`;
- replace boolean-only normal tracking with `confirmed + appliedKeys` provenance;
- preserve optional/absent facts as the untouched representation.

Types and label maps should be colocated in the prototype domain. Do not add them to generic production engine contracts during this prototype.

### 4.4 Journal generation architecture

Generate in two pure steps:

1. `buildJournalSections(state): JournalSection[]` applies omission, conflict, ordering, and explicit-action rules.
2. `formatJournal(sections): string` produces stable Danish text.

Each clinical area gets a focused builder (`buildHistory`, `buildObjective`, `buildAssessment`, `buildPlan`). The fixed problem line is always first. Builders consume normalized state only and never inspect UI disclosures, suggestion visibility, focus, or scenario metadata.

Avoid direct snapshots as the only proof. Test exact clinical semantics and prohibited phrases, especially `knæskade`, conflicting normals, unaccepted suggestions, and unrecorded imaging actions.

### 4.5 Keyboard interaction architecture

- Prefer native radio inputs and checkboxes visually styled as compact controls. If custom behavior remains necessary, implement one shared roving-tabindex hook rather than per-section key handlers.
- Keep document order equal to DOM tab order; do not use positive `tabIndex`.
- `SectionNavigator` owns focusable heading refs and section jumps.
- `useWorkspaceShortcuts` registers `Alt+1`–`Alt+5`, `Alt+Q`, and `Alt+S`; it exits early for input, textarea, select, or contenteditable targets.
- Disclosures return focus to their trigger on Escape.
- Diagnosis removal determines the next focus target before dispatch, then restores focus after render.
- Mode switching focuses the activated mode control and emits a concise preserved-data message.

Focus operations are component effects driven by explicit UI events, not domain reducer side effects.

### 4.6 Accessibility approach

- Establish landmarks and heading order first; test by role/name rather than CSS selectors.
- Associate definitions, helper text, and validation errors with `aria-describedby`.
- Use `aria-invalid` only for an explicit invalid/incomplete interaction state, not for untouched optional fields.
- Use a polite status node for concise events. The journal text itself is not a continuously announced live region.
- Make focus visible on every interactive element at default and 200% zoom; ensure sticky content does not cover focus.
- Encode selected and override states in text and semantics, never color alone.
- Treat automated accessibility scans as supporting evidence only. Keyboard, zoom/reflow, semantics, and screen-reader behavior require recorded manual CDR-002 evaluation or `N/E`.

## 5. Migration strategy

### 5.1 Source-control strategy

Create future implementation branches from the then-current `main`. Use `feature/clinical-document-workspace-prototype` as a read-only source reference. Do not merge it wholesale: its six files are isolated, but the component, styles, and data model embody the CDR-001 problems. Transplant and adapt code in reviewed slices so each PR has a coherent v2 state.

If preserving file history is valuable, the first implementation branch may cherry-pick the v1 prototype commit locally and immediately refactor before opening the first PR. Do not open an intermediate PR that exposes v1 as if it satisfied v2.

### 5.2 Reuse

- route path and prototype-only module boundaries;
- scenario-loader/reset concept;
- pure immutable domain behavior;
- grouped-normal member definitions;
- suggestion reasons and three-primary rule;
- attention-point derivation and safety disclaimer;
- clipboard action and draft-review warning;
- test intent for mode preservation, explicit normals, overrides, and omission.

### 5.3 Rewrite or substantially refactor

- state types and transitions;
- journal section builders;
- monolithic workspace component;
- single- and multi-choice primitives;
- assessment and imaging interfaces;
- layout and CSS sizing/density;
- browser tests to use full keyboard and semantic assertions.

### 5.4 Keep isolated

- all prototype facts, rules, fixtures, and outputs under prototype namespaces;
- synthetic data only;
- no production workflow engine, clinical pathway runtime, persistence, referrals, network submission, or patient records;
- no claim that an imaging/referral action occurred outside the prototype;
- no production navigation replacement.

## 6. Implementation phases and PR-sized slices

Each slice should be independently reviewable, keep the prototype route usable, and include tests for its new domain rules. Exact PR boundaries may combine adjacent slices only when separating them would create an unusable or misleading state.

### Phase 1 — Foundation and layout

#### Slice 1.1: Prototype v2 skeleton and isolated route

- Introduce the isolated route, composition shell, synthetic label, and empty Quick state on current `main`.
- Add the prototype domain folder and typed base state.
- Render fixed `Problem: Knæsmerte` and the four document sections without implementing all controls.
- Add unit checks for empty state and fixed problem context.

#### Slice 1.2: Continuous document and companion region

- Implement the one-surface document, section navigator, overview placeholder backed by selectors, and journal region.
- Establish responsive region order and baseline typography/target tokens.
- Remove per-field card assumptions and secondary output card stack.
- Add structural browser checks for landmarks, headings, order, and one-file route isolation.

### Phase 2 — Clinical interaction model

#### Slice 2.1: History facts and reducer invariants

- Implement side, expanded onset/definitions, duration, precipitating factor, trauma mechanisms/note, pain locations/patterns, function, swelling, locking, instability, and fever.
- Enforce constant/intermittent exclusion and untouched normalization in reducer tests.
- Add Quick core controls and progressive Standard history disclosure.

#### Slice 2.2: Grouped examination and positive overrides

- Implement normal provenance, inspectable members, reversible confirmation, exception editing, and overview status.
- Preserve existing positive override behavior across clear/reapply and mode changes.
- Add exhaustive unit tests and focused Playwright regression cases.

#### Slice 2.3: Diagnoses and suggestions

- Implement three visible suggestions, `Vis flere`, ordered concurrent diagnoses, free text, remove, and reorder.
- Keep suggestions separate from facts and attention points.
- Add focus restoration and domain/browser tests.

#### Slice 2.4: Plan and imaging state

- Implement typed plan actions and structured imaging status, modality, indication, clinical question, and action.
- Add inline missing-information and contradiction handling.
- Do not add external submission behavior.
- Add table-driven imaging tests before UI integration.

### Phase 3 — Journal and output improvements

#### Slice 3.1: Structured journal builders

- Introduce `JournalSection[]` builders and formatter.
- Cover fixed problem, history chronology, objective conflict resolution, ordered diagnoses, explicit plans, and empty-section omission.
- Replace v1 string maps and exact old-note expectations.

#### Slice 3.2: Live preview, overview fidelity, and copy state

- Wire the same normalized selectors to overview and journal.
- Add draft status, non-interruptive update status, and copy feedback.
- Verify suggestions/attention/UI state never leak into output.
- Implement exact semantic assertions for both v2 scenarios.

### Phase 4 — Keyboard, accessibility, and visual completion

#### Slice 4.1: Semantic control primitives

- Replace pseudo-radio buttons with native/roving semantic controls.
- Add arrow, Space, Enter, and Escape behavior with associated names/descriptions/errors.
- Test control semantics and logical tab order.

#### Slice 4.2: Section shortcuts and dynamic focus

- Implement section/mode shortcuts, editable-target suppression, disclosure focus return, diagnosis removal focus, and mode announcements.
- Add uninterrupted keyboard-only browser scenarios.

#### Slice 4.3: Density, responsive, and focus refinement

- Complete type sizes, target sizes, spacing, focus ring, responsive tiers, sticky behavior, and no-overflow rules.
- Test representative viewports in Playwright.
- Reserve 200% zoom, contrast, focus visibility, and qualitative density conclusions for recorded manual review.

### Phase 5 — Testing and CDR-002 preparation

#### Slice 5.1: Safety, recovery, and regression matrix

- Add incomplete state, contradiction, rapid correction, reset, mode round trip, and refresh/back behavior.
- Confirm no persistence or external action claims.
- Run typecheck, unit tests, build, and browser suite.

#### Slice 5.2: Synthetic scenario fixtures and review readiness

- Finalize exact synthetic Scenario A and B fixtures from the specification.
- Add stable scenario IDs and visible review-build metadata where available locally.
- Dry-run the browser protocol to find setup defects; do not record a CDR decision as part of implementation.

#### Slice 5.3: CDR-002 execution (separate review work)

- Deploy an isolated, time-limited preview.
- Record browser, viewport, commit, scenarios, evidence, and cleanup ownership.
- Execute the specified manual scenarios and failure cases.
- Score only evaluated dimensions and use `N/E` elsewhere.
- Treat new findings as subsequent work; do not rewrite implementation history to imply a pass.

## 7. Testing strategy

### 7.1 Unit tests

Use Vitest for pure domain behavior. Organize by model/reducer/journal rather than one broad file.

Required coverage:

- empty state contains no clinical fact and produces only fixed problem context;
- blank/cleared values are removed;
- Quick/Standard round trips preserve all facts;
- trauma mechanisms toggle independently and free text coexists;
- constant/intermittent transition matrix;
- grouped normals apply only to untouched values;
- group provenance survives independent normal edits correctly;
- positives override normals and remain through clear/reapply;
- diagnoses add, reject duplicates, remove, reorder, and retain qualifiers;
- suggestion visibility and acceptance separation;
- imaging compatibility matrix and missing-information state;
- journal ordering, Danish wording semantics, prohibited claims, and untouched omission;
- attention points derive from facts without entering the journal;
- Scenario A and B state-to-output contracts.

Prefer table-driven tests for enumerated transitions and exact assertions for safety-relevant phrases. Avoid relying solely on broad snapshots.

### 7.2 Browser tests

Use Playwright against `/prototype/clinical-document-workspace` with role/name/state locators.

Required paths:

1. Empty Quick orientation and fixed problem output.
2. Quick/Standard state round trip including a Standard-only fact.
3. Group confirmation, positive override, clear, and reapply.
4. Three primary suggestions, additional disclosure, and multiple diagnoses.
5. Incomplete and valid imaging plans with exact output boundaries.
6. Full keyboard Scenario A.
7. Full keyboard Scenario B.
8. Shortcut suppression while typing and focus restoration after dynamic changes.
9. Representative ≥1200, 768–1199, and 320–767 viewports with no horizontal overflow and all critical regions reachable.
10. Reset and supported refresh/back behavior without false persistence claims.

Browser tests can prove deterministic UI behavior, not clinical usability, accessibility conformance, or consultation efficiency.

### 7.3 CDR-002 scenarios and evidence

Use the two complete synthetic scenarios in the v2 specification as the minimum end-to-end review set:

- acute right-sided twisting trauma with concurrent hypotheses and explicitly planned imaging;
- gradual left-sided intermittent load-related pain with grouped normals, a positive effusion override, concurrent hypotheses, and no imaging now.

Also review incomplete input, rapid corrections, contradictory imaging attempts, mode changes, grouped-normal reversal, refresh/back behavior, and narrow layout. Record actual screenshots/video, DOM/name-role-state evidence, generated notes, focus behavior, scroll positions, and declared interaction counts. Do not infer a pass from automated tests, and do not invent measurements or clinician feedback.

### 7.4 Quality gates per implementation PR

- changed scope remains under the isolated prototype route, prototype component/domain folders, and directly related tests;
- `npm run typecheck` passes;
- relevant Vitest tests pass;
- `npm run build` passes, subject to separately tracked dependency/security gates;
- relevant Playwright tests pass for interaction slices;
- no real patient data, persistence, external submission, or production pathway change;
- documentation updated when a contract changes;
- acceptance criteria addressed by the slice are named in the PR description.

These are proposed gates. No gate is claimed to have passed for Prototype v2 at the time of this plan.

## 8. Risk register and controls

| Risk | Control | Evidence before CDR-002 |
|---|---|---|
| v1 behavior is copied into v2 unintentionally | Start from current `main`; transplant only reviewed isolated parts; maintain requirement-to-test mapping. | One-file/slice diffs, reviewer checklist, removed-field tests. |
| Clinical facts and UI disclosure state diverge | Separate reducer state from ephemeral UI state; derive all views from clinical state. | Reducer and round-trip browser tests. |
| Group clearing removes valid data | Track per-key provenance and test all edit sequences. | Table-driven provenance tests and Scenario B. |
| Journal invents diagnosis or plan | Pure builders consume accepted facts/actions only; prohibited-phrase tests. | Exact output tests and state/output trace. |
| Imaging wording implies external completion | Typed status/action pairs; no external call; incomplete state omitted from claims. | Compatibility matrix and contradiction browser case. |
| Keyboard support is added too late | Build semantic primitives before final visual refinement; require keyboard tests in interaction slices. | Keyboard test suite before Phase 4 completion. |
| Accessibility is claimed from automation | Explicit evidence boundary; manual CDR-002 protocol or `N/E`. | Review report with named evidence and limitations. |
| Density regression hides information | Use layout/container reduction, not smaller type; enforce minimum sizes. | CSS review, viewport evidence, manual zoom/reflow. |
| Prototype leaks into production architecture | Keep imports one-way from route/component to prototype domain; no engine or pathway runtime edits. | Diff-scope checks on every PR. |
| Large PR becomes unreviewable | Use the slices above and require test coverage within each. | PR history and named acceptance criteria. |

## 9. Definition of implementation readiness

Implementation may begin when this plan is accepted and the first slice identifies its exact acceptance criteria. Prototype v2 is not ready for CDR-002 until all P0 behavior from the specification is implemented, relevant automated checks pass, an isolated preview is available, and the review-readiness gate in the CDR framework is met.

Implementation readiness is not clinical approval, production authorization, or evidence that the proposed experience is effective.
