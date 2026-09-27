# Repository Recovery & Reuse Assessment v1.0

**Assignment:** BA-001 — Prototype Sprint 0

**Date:** 2026-07-21

**Assessment basis:** Current working tree on `docs/cortex-product-thesis-and-evidence-architecture` at `c002b93`

**Scope:** Technical recovery and reuse assessment; not an architecture review

**Clinical status:** Existing knee content and prototypes are not clinically validated

## 1. Executive Summary

Cortex should run Prototype Sprint 0 on the existing Next.js platform, not on a new platform.

The repository already provides:

- a working Next.js 15 and React 19 application shell;
- a deterministic, pure TypeScript workflow engine with mandatory validation;
- an isolated Clinical Document Workspace prototype;
- local reducer state, deterministic journal generation and draft-override handling;
- 159 passing Vitest tests;
- 22 passing Chromium Playwright tests;
- a passing typecheck and production build.

The repository does **not** provide:

- AI provider integration, prompt engine, streaming, chat, tool calling or model abstraction;
- AI evaluators, prompt regression, simulation or benchmark infrastructure;
- patient identity/domain storage, authentication, persistence or external integrations;
- a reusable component library or complete design system.

The fastest path is therefore to reuse the platform, build pipeline, deterministic engine services, prototype state/journal model and test harness; mock patient data and AI responses; and build a new isolated Sprint 0 route from a small subset of the existing prototype components.

**Estimated Sprint 0 reuse:** **60% of the required technical foundation**. This is an effort estimate, not a percentage of repository lines. Platform/tooling and tests have high reuse; AI, patient persistence and backend have none.

### Steering recommendation

Proceed on the existing platform with a controlled reuse boundary:

1. Freeze a clean Sprint 0 baseline before development.
2. Reuse pure services and tests before reusing page components.
3. Treat AI as a new adapter with deterministic mock responses in Sprint 0.
4. Do not refactor the Workflow Engine or consolidate the two state models during the sprint.
5. Keep the sprint route isolated from `/` and the existing prototype route.

## 2. Repository Overview

### 2.1 Shape

The repository is a single-package application, not a monorepo.

| Area | Current role | State |
|---|---|---|
| `app/` | Next.js App Router entry points and global CSS | Active |
| `components/encounter/` | Current production consultation renderer | Active, monolithic |
| `components/prototype/clinical-document-workspace/` | Phase 3 document-workspace UI | Active isolated prototype |
| `components/prototype/clinical-document-workspace-document-first/` | Phase 4A experiment | Untracked experiment; not present in a clean checkout |
| `clinical/pathways/` | Knee pathway and pathway-owned generators | Active; not clinically validated |
| `clinical/prototypes/` | Prototype model, reducer, selectors and journal synthesis | Active prototype foundation |
| `clinical/types/` | Generic clinical pathway contracts | Active |
| `engine/` | Pure validation, visibility, state, rules, suggestions and output orchestration | Active and well tested |
| `encounter/` | Encounter/output contracts | Active, small |
| `data/phrases/` | Generic phrase composition libraries | Dormant; no runtime imports found |
| `e2e/` | Chromium browser regression suite | Active; one file is currently untracked |
| `docs/` | Vision, governance, product, architecture, clinical and archive material | Active documentation plus historical archive |

There are no `apps/`, `packages/`, workspace configuration, shared library package, API application or worker process.

### 2.2 Routes

| Route | Implementation | Status |
|---|---|---|
| `/` | [`app/page.tsx`](../../app/page.tsx) + [`EncounterEngine.tsx`](../../components/encounter/EncounterEngine.tsx) | Active production prototype |
| `/prototype/clinical-document-workspace` | [Phase 3 page](../../app/prototype/clinical-document-workspace/page.tsx) | Tracked isolated prototype |
| `/prototype/clinical-document-workspace-document-first` | Phase 4A page and components | Untracked experiment |

All routes are statically generated. There are no API routes or middleware.

### 2.3 Active, duplicate and obsolete material

**Active**

- root knee workflow;
- Phase 3 Clinical Document Workspace;
- generic engine and knee output generators;
- Vitest and Playwright suites;
- App Router/build setup.

**Experimental**

- the untracked document-first route, contextual panel, scenario and four Playwright tests;
- the prototype-only clinical model, reducer, selectors and journal generator.

**Duplicate responsibilities**

- the production consultation uses `ConsultationAnswers` and Workflow Engine services, while Phase 3 uses a separate `ClinicalDocumentPrototypeState` reducer;
- the production pathway generators and prototype journal generator both synthesize clinical text;
- Phase 3 and Phase 4A contain overlapping workspace controls and presentation logic;
- global CSS and both prototype CSS modules repeat palette and component styling.

**Dormant/obsolete**

- `data/phrases.ts` and the four `data/phrases/*` composition libraries have no runtime or test imports;
- the first portion of `app/globals.css` contains phrase-bank/search/editor selectors with no current component references;
- root metadata still describes Cortex as “Din personlige kliniske frasebank”;
- `docs/archive/` is historical by design and must not drive Sprint 0.

### 2.4 Working-tree recovery risk

The current branch points to the same commit as `main`, but the working tree contains:

- two modified tracked documentation files;
- multiple untracked governance, architecture and product artifacts;
- the complete Phase 4A document-first experiment as untracked application/test files.

Sprint 0 must not begin until Steering identifies which untracked artifacts belong in the baseline. A clean checkout currently loses the document-first experiment.

## 3. Reuse Matrix

Legend: ✅ reuse directly, ⚠️ reuse after narrow adaptation, ❌ build/replace for Sprint 0.

| Område | Genbrug | Kommentar |
|---|---:|---|
| UI Components | ⚠️ | Reuse document, overview, journal and choice patterns; most components are prototype-coupled and need extraction or composition |
| AI Infrastructure | ❌ | No AI runtime exists; introduce only a thin mockable boundary |
| AI Testing | ⚠️ | Vitest/Playwright infrastructure is reusable, but evaluator, fixture schema and AI assertions must be added |
| Playwright | ✅ | Stable Chromium setup, accessible locators, clipboard permissions and 22 passing flows |
| Build Pipeline | ✅ | Next build, strict typecheck, Vitest, Playwright and release script work locally |
| Design System | ⚠️ | Palette and visual direction are reusable; tokens and primitives are fragmented |
| Routing | ✅ | App Router supports a new isolated prototype route without changing `/` |
| State Management | ⚠️ | Phase 3 reducer is suitable for local mock state; do not merge it with Workflow Engine state during Sprint 0 |
| Backend | ❌ | None exists; mock data is sufficient for Sprint 0 |

### 3.1 Reuse by Sprint 0 capability

| Sprint 0 surface | Reuse assessment | Recommended source |
|---|---|---|
| Patient Overview | ⚠️ | Reuse visual pattern from `ClinicalOverview`; build a synthetic patient-facing view because no patient model exists |
| Consultation | ✅/⚠️ | Reuse Phase 3 reducer/model and document sections; compose a slimmer Sprint 0 UI |
| AI Summary | ❌ | New deterministic mock adapter and fixtures; no current AI service |
| Journal Draft | ✅ | Reuse prototype journal generation and explicit draft override |
| Referral Draft | ⚠️ | Reuse production referral generator concepts or prototype imaging foundation; keep it a reviewable, unsent draft |
| AI Testing | ⚠️ | Reuse Vitest and Playwright runners; add AI-specific fixture/evaluator layer |
| Playwright | ✅ | Reuse config, helpers and locator policy |
| Mock Data | ⚠️ | Reuse the untracked acute-twist scenario pattern; establish explicit synthetic patient/consultation fixtures |

## 4. Components

### 4.1 Component inventory

| Component/pattern | Decision | Reason |
|---|---|---|
| `ClinicalDocumentWorkspacePrototype` | ⚠️ Minor refactor | Good state composition root; coupled to one prototype and all companion panels |
| `ClinicalDocument` | ⚠️ Minor refactor | Strong four-section document shell; fixed knee labels and direct section imports |
| `ChoiceGroup` / `MultiChoiceGroup` | ✅ Within prototype / ⚠️ shared | Accessible, keyboard-focusable primitives; styling and props remain prototype-local |
| `WorkspaceHeader` | ⚠️ Minor refactor | Reusable shell/mode control; prototype wording and route link are fixed |
| `SectionNavigator` | ⚠️ Minor refactor | Useful pattern; destinations and labels are hard-coded |
| `ClinicalOverview` | ⚠️ Minor refactor | Suitable panel for Patient Overview/consultation status; types are prototype-specific |
| `JournalPreview` | ✅/⚠️ | Draft editing, stale-state warning, restore and copy are directly valuable; extract only if Sprint 0 needs different inputs |
| `ReferralDraftFoundations` | ⚠️ | Correctly framed as foundation, but supports only imaging and no final referral document |
| `HistorySection` | ⚠️ | Rich existing controls; knee-specific and too broad for a generic component |
| `ObjectiveSection` | ⚠️ | Explicit grouped confirmation and exceptions are valuable; knee-specific |
| `AssessmentSection` | ⚠️ | Preserves suggestion/decision separation; demonstration logic is not clinically validated |
| `PlanSection` | ⚠️ | Useful imaging contradiction UX; large and pathway-specific |
| `EncounterEngine` | ❌ for new UI / ✅ engine integration reference | Current root renderer is 365 lines and form-first; retain unchanged as regression reference |
| Phase 4A `DocumentFirstWorkspaceExperiment` | ⚠️ after baseline recovery | Demonstrates the target interaction, but is untracked and contains local metrics/state |
| Phase 4A `ContextualCompletionPanel` | ❌ direct reuse | Approximately 600 lines and duplicates many Phase 3 controls; use as interaction reference |

### 4.2 Requested primitives not present

| Primitive | Current state |
|---|---|
| Layouts | Page-specific CSS grids only |
| Cards/panels | Repeated CSS patterns; no shared component |
| Dialogs | No active dialog component; dormant overlay/editor CSS exists |
| Buttons | Native buttons styled per page/module; no primitive |
| Forms | Native fieldsets, buttons, inputs, selects and textareas |
| Typography | Repeated Georgia/system-font rules and partial CSS variables |
| Timeline | Not present |
| Markdown | Not present |
| Rich text | Not present; journal editing is plain textarea |
| Loading states | Dormant `.loadingScreen` CSS only |
| Notifications | Local inline copy/update status only |

Sprint 0 should not build a general UI kit. Extract only the two or three primitives used more than once in the new route.

## 5. AI Infrastructure

No implemented AI infrastructure was found.

| Capability | Current state | Sprint 0 decision |
|---|---|---|
| AI service/provider | Absent | Build a minimal interface with deterministic mock implementation |
| Prompt engine/templates | Absent | Add versioned test fixture prompts only if the prototype actually invokes a model |
| Streaming | Absent | Do not add unless required by the demonstrable interaction |
| Chat | Absent | Out of scope unless Product explicitly requires it |
| Tool calling | Absent | Do not add |
| Model abstraction | Absent | One narrow adapter; avoid multi-provider framework |
| Context handling | Structured clinical state exists, but no model context assembly | Build explicit projection from recorded mock facts |
| Evaluation | No AI evaluator | Add fixture-based evaluation separately from clinical validation |

The deterministic rule/suggestion engines are **not AI** and must not be presented as AI infrastructure. They are reusable as safety-preserving technical services only where the Sprint 0 interaction needs their existing contracts.

### Prototype-readiness

- **Workflow Engine:** prototype-ready and technically well tested.
- **Prototype journal synthesis:** prototype-ready for synthetic demonstrations.
- **AI runtime:** not present.
- **Production AI readiness:** not assessable and not claimed.

## 6. AI Testing

### 6.1 Existing assets

- 159 Vitest tests across 11 files.
- Pure-function coverage for validation, immutable updates, stable pruning, rules, suggestions, outputs, deterministic generation and prototype state/journal behavior.
- 22 Playwright tests across three files.
- No snapshots and no browser-global test state.
- No evaluator, simulation, benchmark, golden prompt set, model stub, semantic grader or model regression suite.

### 6.2 Direct Sprint 0 use

Reuse Vitest as the deterministic oracle for:

- input projection from explicit mock facts;
- omission of untouched facts;
- journal/referral draft determinism;
- preservation of uncertainty;
- separation of AI suggestions from recorded clinical facts;
- fixed mock response fixtures.

Reuse Playwright for:

- patient selection and consultation navigation;
- consultation fact entry;
- AI-summary loading/error/accept/reject presentation;
- journal/referral draft update and copy;
- stale information removal;
- keyboard/focus smoke tests.

Create an AI-specific test layer only when an AI boundary exists. It should record fixture ID, input version, prompt/model/mock version and expected properties. Automated AI tests must not claim clinical validity.

## 7. Playwright

### 7.1 Current setup

[`playwright.config.ts`](../../playwright.config.ts) provides:

- Chromium only;
- headless execution by default;
- one worker and deterministic serial resource use;
- one retry;
- HTML and list reports;
- trace on first retry;
- screenshot on failure;
- clipboard permissions;
- automatic Next.js development server on port 3100.

The helper file contains only a field locator and option selector. Tests primarily use accessible roles, labels and visible text.

### 7.2 Survival under a new prototype

| Test group | Survival |
|---|---|
| Eight root knee workflow tests | Keep unchanged as regression protection |
| Ten Phase 3 tests | Keep while Phase 3 remains; reuse interaction patterns, not route-specific assertions |
| Four Phase 4A tests | Recover into baseline first; adapt to the Sprint 0 route if Steering adopts that experiment |
| Exact layout/text assertions | Expect targeted updates if Sprint 0 wording changes |
| Engine behavior assertions | Keep; they are independent of the new route |

The current suite passed 22/22 in Chromium during this assessment.

## 8. Build Pipeline

### 8.1 Commands

| Command | Current behavior |
|---|---|
| `npm run dev` | Next.js development server |
| `npm run typecheck` | Strict TypeScript, no emit |
| `npm run test` | Vitest once |
| `npm run test:watch` | Vitest watch |
| `npm run build` | Production Next.js build |
| `npm run test:e2e` | Chromium Playwright |
| `npm run check` | Typecheck → unit tests → build |
| `npm run check:release` | Typecheck → unit tests → build → Playwright |

No lint command, CI workflow, coverage threshold, formatting check or production-server E2E configuration exists.

### 8.2 Assessment results

- `npm run typecheck`: passed.
- `npm run test`: 159/159 passed.
- `npm run build`: passed; all three routes generated statically.
- `npm run test:e2e`: 22/22 passed.

The build pipeline is directly reusable for Sprint 0. Adding CI is useful but not required to produce the five-day prototype.

## 9. Design System

### 9.1 Reusable assets

- calm earth/sage palette;
- paper/canvas visual hierarchy;
- Georgia headings with system-font body text;
- clear focus outlines in prototype styles;
- compact responsive two-column workspace patterns;
- `lucide-react` icons in the root renderer.

### 9.2 Limitations

- tokens exist globally in `:root` but Phase 4A redefines a separate token set inside `.shell`;
- component states, spacing and typography are repeated across large CSS files;
- there is no documented token scale or reusable primitive library;
- `app/globals.css` mixes obsolete phrase-bank UI and active encounter UI;
- CSS modules isolate prototypes but also duplicate visual rules.

**Decision:** preserve the visual language. Do not preserve every CSS rule. Sprint 0 should reuse existing variables where possible and add route-scoped styles; broad token consolidation waits.

## 10. Backend Dependencies

| Dependency | Exists | Sprint 0 treatment |
|---|---:|---|
| API routes/services | No | Mock in-process |
| Authentication/authorization | No | Irrelevant for supervised synthetic prototype; do not simulate production security |
| Persistence/database | No | Local React state and resettable fixtures |
| Cache/store | No | Irrelevant |
| Realtime/streaming | No | Mock only if needed for AI-progress UX |
| EHR integration | No | Copy-to-clipboard remains the boundary |
| External referrals | No | Generate copyable draft only; never send |
| Patient data integration | No | Synthetic patient fixtures only |
| Deployment metadata | Local ignored `.vercel/` link exists | Not required for local Sprint 0 |

No runtime `fetch`, environment access, browser storage, WebSocket, auth or persistence usage was found. The existing prototype is entirely local and resettable.

## 11. Technical Debt

Only Sprint 0-relevant items are listed.

1. **Unclean, unrecoverable baseline.** Phase 4A and many documents are untracked. This is the immediate recovery blocker.
2. **Two clinical state models.** Production Workflow Engine state and prototype reducer state can diverge. Do not consolidate during Sprint 0; choose one per route.
3. **Two document-generation paths.** Production pathway generators and prototype journal synthesis overlap.
4. **Large coupled UI files.** `EncounterEngine`, `PlanSection` and Phase 4A `ContextualCompletionPanel` hinder selective reuse.
5. **No generic UI primitives.** Similar buttons, cards, panels and controls are repeated.
6. **Fragmented CSS.** Three large style surfaces repeat tokens and interaction states; global CSS contains unused legacy selectors.
7. **Dormant phrase libraries.** Approximately 1,873 lines under `data/` have no imports.
8. **No AI boundary or AI evaluation.** Any AI claim in Sprint 0 requires new implementation and tests.
9. **No patient/backend model.** Patient Overview must be explicitly synthetic.
10. **No CI or lint command.** Local checks are strong but not automatically enforced by repository CI.

The 867-line pathway validator is complex, but it is heavily tested and should be reused unchanged rather than refactored during Sprint 0.

## 12. Sprint 0 Readiness

| Area | Ready? | Minimum action |
|---|---:|---|
| Existing platform | Yes | Establish clean baseline |
| Patient Overview | Partial | Add synthetic patient fixture and compact overview |
| Consultation | Yes | Reuse Phase 3 state/document patterns |
| AI Summary | No | Add deterministic mock adapter and explicit provenance label |
| Journal Draft | Yes | Reuse generator and draft override |
| Referral Draft | Partial | Reuse draft semantics; add only required prototype fields |
| AI Testing | Partial | Add fixture/evaluator contract on Vitest |
| Playwright | Yes | Add isolated Sprint 0 journeys |
| Mock Data | Partial | Formalize synthetic fixtures; never use identifiable data |

### Readiness boundary

The repository is ready to build and test a supervised synthetic prototype. It is not ready for real patient data, autonomous AI behavior, external actions, clinical evaluation approval or production deployment.

## 13. Risks

| Priority | Risk | Consequence | Sprint 0 control |
|---|---|---|---|
| Critical | Untracked Phase 4A source | Prototype may be lost or omitted from branch/PR | Steering selects and records a clean baseline before coding |
| Critical | Mock AI may be mistaken for working AI | Invalid product conclusions | Label every response as deterministic mock/demo output |
| Critical | Clinical demo content is not validated | Unsafe interpretation as clinical support | Synthetic data, explicit prototype notices, no clinical claims |
| Important | Prototype reducer diverges from Workflow Engine | Later migration cost and inconsistent semantics | Keep boundary explicit; do not mix state objects |
| Important | Reusing large page components accelerates initial work but increases coupling | Slower changes within the sprint | Reuse pure model/services first; compose a narrow new route |
| Important | No persistence/auth | Accidental use expectations | Reset on reload and state “no patient data is stored” |
| Important | Text-exact browser tests are sensitive to copy changes | False regressions | Prefer roles/state assertions for new tests |
| Minor | CSS duplication | Visual drift | Use one route-scoped stylesheet and existing root variables |
| Minor | No CI/lint | Quality depends on manual command execution | Run `check:release` before every demonstration |

## 14. Recommended Build Strategy

### 14.1 Reuse

Reuse directly:

- Next.js App Router, React, TypeScript and npm setup;
- Vitest, Playwright and release scripts;
- pure prototype model/reducer/selectors/journal functions;
- journal draft override, restore and copy behavior;
- accessible choice-group interaction;
- existing output-generation contracts where their current semantics match the demonstration;
- root workflow tests as regression protection.

Reuse after narrow adaptation:

- Clinical Document shell;
- Clinical Overview visual pattern;
- Workspace header/navigation;
- referral-draft presentation;
- Phase 4A document-first interaction, if it is first recovered into the baseline.

### 14.2 Mock

Mock:

- patient list and patient overview;
- encounter selection;
- AI summary response, latency and failure;
- any referral destination;
- any external EHR interaction beyond copy;
- all backend and persistence behavior.

Mocks must be deterministic, synthetic and clearly labelled. They must not include CPR numbers or other direct patient identifiers.

### 14.3 Replace or defer

Do not use for Sprint 0:

- dormant `data/phrases/` libraries;
- obsolete phrase-bank CSS;
- a new chat/tool/streaming framework;
- production auth, persistence, realtime or integrations;
- broad UI-kit, CSS or Workflow Engine refactoring.

Delete nothing during the five-day sprint. After the sprint baseline is safely recorded, a separate cleanup may remove confirmed unused phrase-bank code and CSS. Existing production and Phase 3 routes remain regression references.

### 14.4 Build order

1. Clean baseline and isolated `/prototype/sprint-0` route.
2. Synthetic Patient Overview and consultation selection.
3. Reused document consultation state and live journal draft.
4. Deterministic mock AI Summary with clear source/status and accept/reject separation.
5. Referral draft placeholder/copy flow.
6. Vitest AI fixture contract and Playwright end-to-end journeys.
7. Five-day demonstration hardening and manual clinical design review.

## 15. Immediate Next Steps

### Day 0 — recovery gate

1. Decide whether the untracked Phase 4A experiment is part of the Sprint 0 baseline.
2. Start from a clean, reproducible branch/worktree.
3. Record the baseline command results and prohibit identifiable patient data.

### Five-workday delivery

| Day | Deliverable |
|---|---|
| 1 | Isolated Sprint 0 route, synthetic patient fixtures and Patient Overview |
| 2 | Document-first consultation using reused local reducer/state and explicit inputs |
| 3 | Mock AI Summary, live journal draft and referral draft foundation |
| 4 | Vitest fixture/evaluator coverage and realistic Playwright journeys |
| 5 | Defect fixing, copy/focus polish, release checks and clinician demonstration |

### Explicit answers to Steering

**Hvad genbruges?**

Next.js-platformen, routing, TypeScript, Workflow Engine som uændret reference/service, Phase 3's lokale state- og journalfunktioner, relevante dokumentkomponenter, draft/copy-adfærd, Vitest og Playwright.

**Hvad mockes?**

Patient Overview-data, encountervalg, AI Summary, AI-latency/fejl, referral destination, backend, persistence og EHR-integration.

**Hvad slettes?**

Intet i Sprint 0. Dormante phrase libraries og legacy CSS markeres som senere cleanup efter en separat brugsbekræftelse.

**Hvad bygges først?**

En isoleret Sprint 0-rute med syntetisk Patient Overview og dokumentbaseret Consultation over den eksisterende lokale prototypestate.

**Hvad kan demonstreres efter fem arbejdsdage?**

Et syntetisk patientoverblik, valg af konsultation, dokument-first registrering, en tydeligt markeret mock AI Summary, live journal draft, referral draft placeholder, copy-flow, keyboardbasics og automatiserede Vitest/Playwright-regressioner. Demonstrationen vil ikke omfatte reel AI, persistence, auth, EHR-integration, afsendelse eller klinisk validering.

### Blockers

1. Steering skal beslutte, om de untracked Phase 4A-filer adopteres eller udelades fra baseline.
2. Et eventuelt krav om reel modelintegration kan ikke udledes af repositoryet og vil ændre femdages-scope, testbehov og risikoprofil.
3. Enhver test med praktiserende læger skal fortsat bruge syntetiske, ikke-identificerbare data og må ikke fremstilles som klinisk validering.
