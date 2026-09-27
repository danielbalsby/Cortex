# Sprint 1 Prototype Implementation Plan v1.0

**Status:** Build preparation — implementation not started  
**Purpose:** Learning prototype  
**Theme:** From document generator to clinical consultation support  
**Timebox:** Five working days  
**Data:** Synthetic case data only

## 1. Objective

Sprint 1 will test whether Cortex can help a clinician understand what is known, what remains unresolved and what the next meaningful clinical action is—without turning the consultation into a checklist or transferring clinical authority to the system.

The prototype preserves Sprint 0's strongest controls: no untouched value becomes a fact; source, system contribution and clinician assessment remain distinct; outputs use only recorded information; human edits survive; uncertainty stays visible; and referral intent, copy and delivery remain separate.

Sprint 0 remains an unchanged comparison baseline. Sprint 1 will be a new isolated route, proposed as `/prototype/sprint-1`.

## 2. Learning questions

The build must make these questions observable rather than claim to answer them:

1. Can the clinician understand completeness and safety uncertainty without a checklist, score, alarm noise or barrier?
2. Does “Cortex Overblik” provide a clearer clinical job than “AI Summary”?
3. Can targeted examination support the case without becoming a mandatory test battery?
4. Do Short and Standard reduce editing while preserving the same facts and uncertainty?
5. Can one natural document action and purpose-specific outputs reduce administration without weakening clinician authority?

## 3. Planned experience

### 3.1 Primary workspace

Use one continuous consultation workspace with four clinical sections:

- Anamnese
- Objektivt
- Vurdering
- Plan

Patient context and recorded clinical content remain the primary surface. Controls are attached to the relevant section and progressively disclosed. Inactive referral documents and research instrumentation are not displayed as equal-weight clinical panels.

### 3.2 Cortex Overblik

Replace the separate “Deterministisk Mock-AI Summary” concept with a deterministic, source-bounded **Cortex Overblik**.

It presents the patient problem, central recorded findings, unresolved information by clinical domain and reviewed non-decisional considerations supported by recorded information. Missing never means absent; a consideration is not a diagnosis; and completeness is orientation, not clinical approval.

The overview updates deterministically from local prototype state. No final AI model is selected, and no generated content may add specificity beyond the source or clinician confirmation.

### 3.3 Consultation completeness

Create a pure derivation that classifies problem, history, objective assessment, safety assessment, clinician assessment, plan and follow-up as recorded, unresolved or not yet addressed. Use calm wording such as “Objektiv vurdering mangler”, never a pass/fail score. Orientation does not block navigation; document-specific readiness remains separate.

### 3.4 Knee interaction slice

Extend only the isolated prototype model. Do not change KNEE-001 or the production pathway.

History supports trauma status, conditional mechanism, swelling, locking, instability, weight-bearing ability and explicit safety/red-flag assessment. Objective assessment supports gait, range of motion, effusion, palpation, Lachman, varus/valgus, meniscal and patellar assessment, and distal neurovascular assessment.

Every clinically meaningful value begins unanswered. Negative, normal, not performed and not assessable remain distinct where the prototype exposes them. No grouped confirmation may record content that is not visible before activation. Trauma-dependent answers are removed if trauma is changed to no.

Clinical wording, attention mappings and document requirements require review against KNEE-001 and its evidence register before implementation. Sprint 1 does not claim those sources are clinically validated.

### 3.5 Clinical attention

Add a quiet **Klinisk opmærksomhed** region driven only by recorded findings and unresolved safety domains. It shows its trigger, stays advisory and non-blocking, never asserts a diagnosis and never changes assessment or plan.

### 3.6 Journal levels and document quality

Offer two presentations of the same recorded clinical truth:

- **Kort journal** — concise, decision-relevant representation;
- **Standard journal** — fuller clinical narrative.

Both levels preserve relevant positive and negative findings, uncertainty, clinician assessment, plan, follow-up, recorded safety-net and source fidelity.

Changing level must not change consultation state, create facts or discard manual edits. Missing domains remain visible outside the generated prose.

Journal and referral generation should produce purpose-specific clinical communication. The imaging path offers explicit clinician selection of MR or X-ray; selection is an intention, not a recommendation. Imaging drafts require an explicit purpose/clinical question. Physiotherapy drafts require explicit referral intent and recorded functional purpose. Regional requirements, modality indications and clinical thresholds are not invented.

### 3.7 Simplified document action

Replace the repeated visible `Reviewed → Approved for copy → Copied` sequence with one clearly labelled `Kopiér udkast` action after reading/editing. Copy remains an explicit human action, is not delivery and does not imply clinical completion. Stale, restore and rejection appear only when relevant. Unselected referrals do not block completion.

## 4. Planned files

Create:

- `app/prototype/sprint-1/page.tsx`
- `components/prototype/sprint-1/SprintOnePrototype.tsx`
- `components/prototype/sprint-1/CortexOverview.tsx`
- `components/prototype/sprint-1/ClinicalDocument.tsx`
- `components/prototype/sprint-1/DocumentDraft.tsx`
- `components/prototype/sprint-1/SprintOnePrototype.module.css`
- `components/prototype/sprint-1/README.md`
- `clinical/prototypes/sprint-1/model.ts`
- `clinical/prototypes/sprint-1/reducer.ts`
- `clinical/prototypes/sprint-1/completeness.ts`
- `clinical/prototypes/sprint-1/attention.ts`
- `clinical/prototypes/sprint-1/documents.ts`
- `clinical/prototypes/sprint-1/fixtures.ts`
- `clinical/prototypes/sprint-1/completeness.test.ts`
- `clinical/prototypes/sprint-1/documents.test.ts`
- `e2e/sprint-one.spec.ts`

Reuse without changing where possible:

- the Next.js prototype route pattern;
- `ChoiceGroup` and existing accessible button semantics;
- the immutable reducer approach;
- journal override/stale semantics;
- Vitest, Playwright and current build pipeline;
- synthetic Sprint 0 case facts, corrected so displayed source and recorded facts match exactly.

No production route, Workflow Engine file, KNEE-001 implementation, package file or dependency is expected to change. If reuse would require changing shared prototype behavior and risk regressing earlier baselines, Sprint 1 will use an isolated prototype implementation instead.

## 5. Test plan

### Unit tests

- empty state has no facts or false completeness;
- completeness is deterministic and distinguishes missing from negative;
- trauma visibility/pruning and unconfirmed safety/examination states are correct;
- attention requires explicit triggers or unresolved domains and never alters assessment;
- grouped actions record only their visible content;
- Short and Standard use the same facts, omit untouched fields and preserve uncertainty/safety;
- readiness stays incomplete when required domains remain unresolved;
- MR/X-ray and referral intent are explicit and consistent across outputs;
- edits survive source changes and become stale;
- copy does not imply delivery or clinical approval;
- identical derivations are deeply equal.

### Playwright scenarios

1. Empty consultation and Cortex Overblik orientation.
2. Fixed trauma case with conditional history, completeness updates and no automatic completion.
3. Targeted objective/safety input and explainable non-blocking attention.
4. Short/Standard switching without state or safety-information loss.
5. Manual journal edit, changed fact and preserved stale text.
6. Separate MR/X-ray runs with explicit clinician control and coherent outputs.
7. Purpose-specific referrals only after intent; inactive outputs do not block completion.
8. Simplified copy, degraded overview recovery and keyboard/focus smoke test.

All current Vitest and Playwright tests must continue to pass. No test may claim clinical validation.

## 6. Five-day sequence

| Day | Focus | Exit evidence |
|---|---|---|
| 1 | Confirm learning flow; create isolated route, state model, completeness derivation and low-fidelity workspace | Empty state, Cortex Overblik and one clear next action are testable |
| 2 | Add conditional history, expanded objective assessment, safety inputs and attention derivation | No defaults; visibility/pruning and attention unit tests pass |
| 3 | Implement Short/Standard journal, purpose-specific referral foundations and simplified copy interaction | Output determinism, source fidelity and stale-edit tests pass |
| 4 | Complete visual hierarchy, progressive disclosure, accessibility and full Playwright regression | Unit, typecheck, browser and build checks pass |
| 5 | Run P01 founder walkthrough plus the six-role AI evaluation against fixed scenarios; synthesize deltas from Sprint 0 | Structured findings with provenance and no clinical-readiness claim |

## 7. Acceptance criteria

Sprint 1 is ready for evaluation when:

- the route is isolated and Sprint 0 remains unchanged;
- the fixed case can be completed without invented or preselected facts;
- the overview distinguishes known, missing and unresolved information;
- incomplete journal content cannot appear silently complete;
- clinical attention remains advisory and explainable;
- objective and safety information can be recorded with explicit states;
- Short and Standard use one fact state and preserve uncertainty;
- journal and selected referral drafts are semantically consistent about the plan;
- only explicitly selected outputs appear in the routine flow;
- routine copy requires one explicit human action per selected document;
- AI/model choice, EHR, persistence and external delivery remain absent;
- all existing and new automated checks pass;
- evaluation uses synthetic data and distinguishes AI findings from clinician research.

## 8. Dependencies, risks and gates

- PEV-001 is still a non-active draft and explicitly does not itself authorize interaction design or Build. This plan is preparation only. Implementation requires an explicit Sprint 1 Build handoff or Steering authorization and must not be described as ratification of PEV-001.
- No separate artifact explicitly titled Product Feedback was identifiable. This plan uses the P00 Product Learning Report, the multi-agent evaluation, PEV-001 and the current Sprint 1 assignment; any additional feedback artifact must be reconciled before implementation.
- Clinical attention content, completeness requirements and referral minimums require named clinical/source review. Build must not invent thresholds or regional rules.
- “Kort” and “Standard” are hypotheses. They remain reversible and must not create competing clinical truths.
- Simplifying visible status must not collapse copy, delivery, clinical decision or outcome into one state.
- Adding examination fields can recreate a form-heavy workflow. Progressive disclosure and observed cognitive load are acceptance concerns, not cosmetic follow-ups.
- The current repository has unrelated uncommitted and untracked work. Sprint 1 implementation must begin from an explicitly recorded baseline and avoid incorporating unrelated files.

No new architecture, production service, AI provider or governance document is required for this five-day learning prototype unless implementation reveals a genuine shared-contract dependency. Such a dependency must be reported rather than solved by expanding Sprint 1 scope.
