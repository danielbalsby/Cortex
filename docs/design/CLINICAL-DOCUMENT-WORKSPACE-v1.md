# Clinical Document Workspace v1

**Status:** Proposed  
**Owner:** Cortex  
**Document type:** Product and interaction design  
**Last reviewed:** 2026-07-17

---

## Purpose

This document defines the product and interaction model for the next Cortex clinical workspace.

It responds directly to the findings from:

- `MANIFEST.md`
- `CX-001-The-Perfect-Consultation.md`
- `MVP-001-The-First-Clinical-Product.md`
- `WF-001-The-Consultation-Workflow.md`
- `RC-002-Clinical-Workspace-Review.md`

The purpose is to move Cortex from a dynamic form that generates a journal toward a clinical workspace where documentation, structured data, decision support and administrative outputs feel like one coherent activity.

This document defines product behavior and interaction principles.

It does not yet define:

- implementation architecture
- final pathway schemas
- clinical evidence
- regional referral requirements
- production readiness
- regulatory approval

Architecture changes required by this design must be specified separately before implementation.

---

## Core decision

The clinical document is the workspace.

The clinician should not experience Cortex as:

```text
complete a form
→ generate a journal
→ inspect outputs
````

The intended experience is:

```text
document the consultation
→ receive relevant support in context
→ obtain journal and administrative outputs automatically
```

Structured clinical data remains essential beneath the interface.

However, the data model must support the clinical document rather than dominate the visible experience.

---

## Product objective

The workspace should allow the clinician to:

* document a consultation naturally
* maintain a clinical overview
* record common normal findings efficiently
* describe abnormal findings precisely
* move non-linearly through the consultation
* use keyboard or mouse
* receive decision support without losing control
* generate coherent clinical documentation
* generate clinically useful referrals without duplicate work
* understand uncertainty and missing information
* complete the consultation with low cognitive and administrative burden

The intended subjective outcome remains:

> The clinician should feel their pulse fall while working in Cortex.

---

## Design principles

### 1. Documentation before form completion

The interface should resemble clinical documentation more than a questionnaire.

The clinician should see the consultation as:

* history
* examination
* assessment
* plan
* resulting documents

not as a long sequence of isolated fields.

---

### 2. One clinical model

Quick and Standard are two presentations of the same clinical model.

They must not become:

* separate pathways
* duplicated clinical content
* separate rule sets
* separate output generators
* divergent safety models

A recorded fact must have the same meaning in both modes.

---

### 3. Explicit confirmation

Cortex must never convert an untouched option into a clinical fact.

Unanswered does not mean:

* normal
* absent
* negative
* not relevant
* completed

Grouped confirmations are permitted only after a deliberate clinician action.

---

### 4. Progressive disclosure

The workspace should initially show the information needed for the likely consultation.

Additional detail appears when:

* the clinician requests it
* a recorded answer makes it relevant
* uncertainty increases
* trauma or red flags are identified
* a referral or investigation requires it

The clinician must remain able to open any relevant section manually.

---

### 5. Keyboard first, mouse friendly

Every core workflow should be usable efficiently without a mouse.

Mouse interaction must remain intuitive.

Keyboard support is a primary product capability, not a secondary accessibility enhancement.

---

### 6. Clinical hierarchy over visual equality

Not every option deserves equal visual prominence.

The workspace should distinguish between:

* core findings
* contextual details
* normal groups
* positive abnormalities
* clinical suggestions
* serious attention points
* optional details
* rarely used actions

---

### 7. Synthesised outputs

Journal notes and referrals must not read like concatenated field labels.

Cortex should transform recorded facts into:

* coherent sentences
* clinically meaningful paragraphs
* appropriate chronology
* recipient-specific communication
* concise but sufficient documentation

---

### 8. Physician control

Cortex may:

* suggest
* organise
* highlight
* draft
* identify missing information

Cortex must not:

* silently select a diagnosis
* silently add treatment
* silently document normal findings
* present technical completeness as clinical approval
* imply that clinical validity has been established

---

## Workspace model

The workspace contains five functional regions:

1. Clinical document
2. Contextual controls
3. Clinical suggestions
4. Clinical attention points
5. Generated outputs

These regions may appear beside, within or around the document, but they must feel like one workspace rather than separate applications.

---

## 1. Clinical document

The document is the primary working surface.

It is organised into:

* History
* Objective examination
* Assessment
* Plan

The problem description and side should be integrated naturally into the document heading or history rather than occupying a large isolated card.

Example:

```text
Right knee pain

History
Gradually increasing medial, load-related pain for six months...
```

The document should update continuously as information is recorded.

The clinician must be able to:

* add structured findings
* add free text
* edit generated wording where permitted
* expand detail
* remove findings
* move freely between sections

---

## 2. Contextual controls

Structured choices should appear in the context where they affect the document.

Examples:

* pain location appears within the pain history
* trauma mechanism appears within the trauma description
* targeted tests appear within the examination
* referral indication appears within the plan

Controls should not feel detached from the text they create.

Possible interaction patterns include:

* inline choice chips
* compact segmented controls
* command menus
* expandable clinical groups
* structured text tokens
* keyboard-selectable options

The final visual pattern may vary by clinical need.

---

## 3. Clinical suggestions

Suggestions should appear near the decision they support.

For example:

* diagnostic suggestions near Assessment
* plan suggestions directly below the selected assessment
* referral suggestions within Plan
* targeted examination suggestions beside the relevant clinical hypothesis

Suggestions must be:

* limited
* relevant
* understandable
* non-probabilistic unless a validated probability model exists
* explicitly accepted
* clearly separated from recorded facts

The workspace should normally show no more than three primary diagnostic suggestions.

Additional suggestions may appear under:

```text
Show more
```

Serious diagnoses that must be considered should not compete visually with ordinary working diagnoses.

They belong in Clinical attention points.

---

## 4. Clinical attention points

The current label:

```text
Clinical quality check
```

should be replaced.

Working name:

```text
Clinical attention points
```

This region should communicate that Cortex has identified specific rule-based issues requiring consideration.

It does not mean that Cortex has validated the complete quality of the consultation.

Clinical attention points may include:

* possible red flags
* missing safety-critical information
* conflicting recorded findings
* urgent referral criteria
* incomplete investigation requirements
* important uncertainty

Each attention point should state:

* what triggered it
* why it matters
* what the clinician may need to consider

It should remain non-blocking unless a future approved safety design explicitly defines otherwise.

---

## 5. Generated outputs

Generated outputs may include:

* journal note
* physiotherapy referral
* imaging referral
* specialist referral
* patient information
* certificates
* other pathway-defined documents

Outputs should appear automatically when relevant.

The clinician should not feel that a second document is being created manually.

The workspace should clearly show:

* which outputs are active
* which are technically complete
* which information is missing
* which output is currently viewed
* that all outputs require clinician review

The default label for the journal output should be:

```text
Note
```

or:

```text
Journal note
```

not `PSOAP journal`.

PSOAP may remain an internal structure.

---

## Quick and Standard modes

### Shared foundation

Both modes use:

* the same answers
* the same clinical meaning
* the same validation
* the same rules
* the same decision support
* the same outputs
* the same safety constraints

Switching mode must not discard recorded information.

---

## Quick mode

Quick mode is intended for uncomplicated and clinically coherent presentations.

It prioritises:

* speed
* overview
* keyboard interaction
* grouped normal confirmations
* a small number of high-value findings
* concise documentation
* minimal scrolling

Quick mode should normally include:

### History

* side
* onset and duration
* precipitating factor
* pain pattern
* function
* swelling
* locking
* instability
* key red flags
* relevant previous history

### Objective examination

* general appearance
* gait
* inspection
* range of motion
* extension and straight-leg raise
* effusion
* focal tenderness
* selected stability test
* selected meniscus or patellar test when indicated

### Assessment

* primary working diagnosis
* relevant differential diagnosis
* safety threats
* whether management in general practice is appropriate

### Plan

* information
* mobilisation or load modification
* analgesia
* exercise or physiotherapy
* investigation
* follow-up
* safety-net

Quick mode must not hide confirmed abnormal findings when switching from Standard mode.

---

## Quick mode exclusion signals

Cortex may recommend Standard mode when recorded information includes:

* significant trauma
* immediate large effusion
* inability to weight-bear
* possible fracture
* red or hot swollen joint
* fever or systemic illness
* true locking
* persistent extension deficit
* extensor mechanism concern
* objective instability
* neurovascular concern
* diagnostic uncertainty
* need for detailed referral or investigation

The clinician may still control the mode.

The system should explain why Standard mode is suggested.

---

## Standard mode

Standard mode supports consultations requiring more clinical detail.

It should allow structured recording of:

* detailed symptom pattern
* precise trauma mechanism
* swelling chronology
* previous injuries and operations
* infection and inflammatory risk
* targeted objective examination
* selected named clinical tests
* detailed differential diagnosis
* investigation rationale
* referral urgency
* recipient-specific outputs
* follow-up targets

Standard mode must still use progressive disclosure.

It must not present every available field as one continuous mandatory checklist.

---

## Explicit grouped confirmations

Grouped confirmations are a core interaction mechanism.

They reduce clicks without introducing unconfirmed defaults.

### Requirements

A grouped confirmation must:

* require an explicit clinician action
* clearly state what is being confirmed
* show which findings it will record
* be reversible
* permit individual exceptions
* never include findings that require a separate specific examination
* preserve the distinction between normal, negative, not performed and not relevant

---

## Example: Red flags absent

```text
Confirm relevant red flags absent
```

Before confirmation, the clinician can inspect the included findings:

* no fever or systemic illness
* no red-hot swollen joint
* no progressive rest or night pain
* no true locking
* no inability to weight-bear
* no neurovascular symptoms where relevant

The precise contents must be pathway-defined and clinically reviewed.

---

## Example: Basic knee examination normal

```text
Confirm basic knee examination normal
```

Possible contents:

* normal gait
* no deformity
* no redness
* no warmth
* no significant effusion
* full extension
* intact straight-leg raise

It should not automatically confirm:

* Lachman negative
* valgus and varus stability
* meniscus tests negative
* patellar tests negative
* distal neurovascular status normal

unless the clinician explicitly confirms a named examination group containing those tests.

---

## Example: Standard conservative plan

```text
Apply standard conservative plan
```

Possible contents may include:

* explanation of assessment
* activity according to symptoms
* temporary reduction of provoking load
* exercise guidance
* analgesia discussion
* follow-up
* safety-net

The clinician must be able to inspect and modify the contents before or after applying the plan.

---

## Positive exceptions

If a normal group has been confirmed and the clinician subsequently records an abnormal finding:

* the abnormal finding must override the normal group
* contradictory statements must not remain active
* affected outputs must update immediately
* Cortex may display a conflict warning if resolution is ambiguous

Example:

```text
Basic examination normal
```

followed by:

```text
Moderate effusion
```

must remove the previously recorded “no significant effusion”.

---

## Clinical content organisation

### History

The history should be grouped around clinical meaning.

#### Onset and course

* side
* onset
* exact duration
* progression
* episodic versus persistent course
* precipitating event
* load change
* trauma mechanism

#### Pain

* location
* load-related pattern
* start-up pain
* rest pain
* night pain
* stairs
* squatting
* running
* jumping
* provoking factors
* relieving factors

#### Function

* normal gait
* limp
* inability to weight-bear
* ability to take four weight-bearing steps
* work limitation
* sport limitation
* daily activity limitation

#### Mechanical symptoms

* clicking
* catching
* true locking
* persistent extension deficit
* giving way
* patellar instability

#### Swelling

* absent
* immediate
* within hours
* delayed
* intermittent
* persistent

#### Red flags

* fever
* systemic illness
* red-hot joint
* progressive rest or night pain
* weight loss
* known malignancy
* multiple swollen joints
* prolonged morning stiffness
* recent infection
* calf swelling
* other pathway-defined concerns

#### Previous history

* previous knee symptoms
* previous injury
* previous surgery
* prosthesis
* injection
* inflammatory disease
* relevant comorbidity
* prior treatment and effect

---

## Objective examination

### General

* unaffected
* affected
* gait
* ability to weight-bear

### Inspection

* normal
* swelling
* redness
* warmth
* deformity
* muscle wasting
* patellar abnormality

### Movement

* active extension
* passive extension
* active flexion
* passive flexion
* pain-limited movement
* persistent extension deficit
* straight-leg raise

Exact degrees may be available when clinically useful but should not always be required.

### Effusion

* none
* mild
* moderate
* large or tense

### Palpation

* medial joint line
* lateral joint line
* MCL
* LCL
* patella
* patellar tendon
* quadriceps tendon
* tibial tuberosity
* pes anserinus
* prepatellar region
* popliteal region
* focal bony tenderness
* other

### Stability

Subjective instability belongs in History.

Objective stability belongs here.

Available targeted tests may include:

* Lachman
* posterior drawer
* valgus stress
* varus stress

Each should distinguish:

* negative
* positive
* not indicated
* not performed
* not assessable

### Meniscus

Targeted tests may include:

* Thessaly
* McMurray

The clinician should not be required to perform both.

### Patella

Targeted findings may include:

* tenderness
* apprehension
* compression or provocation
* instability

### Neurovascular status

Shown when relevant after:

* significant trauma
* deformity
* dislocation
* major swelling
* concerning symptoms

### Supplementary findings

A free-text field must be available within the objective examination.

---

## Assessment design

The assessment region should be compact and clinically prioritised.

### Primary assessment

Show:

* selected working diagnosis
* up to three relevant suggestions
* why the suggestions are shown
* explicit clinician acceptance

### Differential diagnoses

Display separately from the primary assessment.

Possible interaction:

```text
Add differential diagnosis
```

The full list should not be visible by default.

### Safety threats

Show separately as clinical attention points:

* fracture concern
* infection concern
* true locking
* extensor mechanism injury
* neurovascular compromise
* urgent inflammatory condition

### Clinical uncertainty

Do not require a visible high, medium or low “certainty” field in the main workflow.

Uncertainty may instead be represented through:

* provisional assessment
* differential diagnoses
* free-text qualification
* need for review
* incomplete findings
* technical missing-information indicators

A future confidence model requires separate product and clinical justification.

### Management level

The assessment should support explicit classification of whether the patient:

* can be managed in general practice
* requires acute referral
* requires subacute specialist review
* requires elective referral
* requires reassessment before a decision

---

## Plan design

The Plan should be divided into clinical categories.

### Information

* explanation of assessment
* expected course
* shared decision-making
* patient agreement

### Activity and load

* mobilisation as tolerated
* temporary load reduction
* graded reloading
* crutches where relevant
* rest only when clinically appropriate

### Symptom treatment

* no medication
* paracetamol
* topical NSAID
* oral NSAID after contraindication review
* other pathway-defined treatment

Cortex must not imply that contraindications have been assessed unless they have been explicitly addressed.

### Exercise and rehabilitation

* home exercises
* supervised exercise
* physiotherapy
* patient education
* weight management when relevant

### Investigation

* no investigation
* blood tests
* acute X-ray
* standing weight-bearing X-ray
* ultrasound
* MRI only when justified
* other

The indication must be recorded.

### Referral

* no referral
* physiotherapy
* emergency department
* orthopaedic surgery
* rheumatology
* other

The following should be recorded:

* recipient
* urgency
* indication
* clinical question
* prior treatment
* relevant imaging
* known limitations

### Follow-up

* as needed
* fixed interval
* after treatment course
* after investigation
* specific reassessment targets

### Safety-net

Safety-net options should be structured but synthesised into one coherent sentence.

Example:

```text
Seek urgent assessment for fever, increasing redness or warmth, inability to weight-bear, new locking or neurovascular symptoms.
```

Repeated phrases such as:

```text
Contact for fever. Contact for worsening pain. Contact for swelling.
```

should not occur.

---

## Journal synthesis

The journal generator should synthesise information rather than list fragments.

### Requirements

The journal must:

* preserve chronology
* combine related findings
* distinguish current from historical findings
* avoid repetition
* avoid unsupported normal conclusions
* use natural clinical Danish
* retain visible uncertainty
* separate subjective and objective findings
* produce concise but meaningful plan wording

### Example transformation

Recorded data:

```text
acute
yesterday
twisting injury
football
no immediate swelling
mild swelling later
```

Preferred output:

```text
Right-sided knee pain after a twisting injury during football yesterday. No immediate swelling, but mild swelling developed subsequently.
```

Not:

```text
Acute. Duration days. Trauma. Twisting. No immediate swelling. Mild swelling.
```

---

## Referral synthesis

Referral outputs must be recipient-specific.

They must not merely reuse the journal unchanged.

### Physiotherapy referral structure

1. Reason for referral
2. Relevant onset and course
3. Functional limitation
4. Key positive findings
5. Key negative findings
6. Working diagnosis
7. Previous treatment and effect
8. Relevant imaging
9. Requested assessment or treatment goal

### Imaging referral structure

1. Requested examination
2. Side and anatomical region
3. Clinical indication
4. Relevant duration and course
5. Examination findings
6. Red flags or trauma context
7. Working diagnosis
8. Clinical question
9. Expected management consequence

### Specialist referral structure

1. Reason for referral
2. Urgency
3. Clinical history
4. Objective findings
5. Relevant investigations
6. Treatment attempted
7. Current functional impact
8. Diagnostic uncertainty
9. Specific specialist question

---

## Output completeness

Output status must describe technical completeness only.

Preferred labels may include:

* Missing information
* Draft ready for review

Avoid unqualified:

```text
Ready
```

when it could be understood as clinical approval.

Every output must retain a visible reminder that the clinician must review:

* clinical content
* recipient
* urgency
* local requirements
* wording
* patient-specific relevance

---

## Editing model

Generated documents should be editable before copying.

However, edited text must not silently become structured clinical truth.

The workspace should distinguish between:

* structured recorded facts
* generated draft text
* clinician-edited draft text

Editing an output must not automatically modify the underlying consultation unless the clinician explicitly chooses to update the clinical record.

The final technical model requires separate architectural clarification.

---

## Free-text model

Free text should be available where clinically useful.

Required locations include:

* supplementary history
* supplementary objective findings
* own assessment
* referral indication
* clinical question
* plan details

Free text should not be required merely because the structured model lacks common clinical information.

The goal is:

* structure for reusable high-value information
* free text for nuance
* no forced prose for routine facts
* no forced clicking for every possible detail

---

## Keyboard interaction

### Core controls

The workspace should support:

* `Tab` to move between clinical groups
* `Shift + Tab` to move backwards
* arrow keys to move within a choice group
* `Space` to select or toggle
* `Enter` to confirm and continue
* `Escape` to close expanded options
* keyboard access to all outputs
* keyboard access to clinical suggestions
* keyboard access to normal confirmations

### Potential shortcuts

Final shortcuts require usability testing.

Possible examples:

* `N` — confirm normal group
* `F` — open free text
* `S` — move to Standard mode
* `Q` — move to Quick mode
* `A` — jump to Assessment
* `P` — jump to Plan
* `/` — open clinical command search

Shortcuts must not interfere with ordinary typing.

---

## Visual density

The redesigned workspace should retain visual calm while becoming materially more compact.

Targets include:

* less vertical padding
* smaller section headers
* lower chip height
* tighter relationship between labels and controls
* less empty space
* more clinical information visible per screen
* reduced scrolling
* improved overview across History, Objective, Assessment and Plan

Visual simplicity must not be achieved by hiding important information without a clear access path.

Apple-inspired design should mean:

* clear hierarchy
* precise spacing
* minimal noise
* predictable interaction
* high-quality typography
* calm transitions
* intentional restraint

It should not mean oversized typography or excessive whitespace.

---

## Terminology

The active clinical workspace should use clear Danish clinical terminology.

Preferred working labels:

| Current               | Preferred                                    |
| --------------------- | -------------------------------------------- |
| PSOAP-journal         | Notat or Journalnotat                        |
| Klinisk kvalitetstjek | Kliniske opmærksomhedspunkter                |
| History               | Anamnese                                     |
| Objective             | Objektivt                                    |
| Assessment            | Vurdering                                    |
| Plan                  | Plan                                         |
| Refereret smerte      | More clinically precise Danish wording       |
| Sikkerhed             | Remove or redefine                           |
| Belastning            | Specify functional or weight-bearing meaning |

Internal technical terms may remain in code and architecture documentation.

---

## Data and safety behavior

The redesigned workspace must preserve all current Workflow Engine safety invariants.

### Required invariants

* no unconfirmed facts
* hidden answers remain inactive
* invalid answers never enter derivation
* stable fixed-point pruning
* deterministic outputs
* suggestions are not decisions
* one clinical source of truth
* outputs contain only recorded information
* uncertainty remains visible
* pathway-specific logic remains outside the generic engine

---

## Quick-to-Standard transition

When the clinician changes from Quick to Standard:

* all recorded facts remain
* additional detail becomes available
* no previous answer is silently reinterpreted
* grouped normal confirmations remain inspectable
* contradictions are surfaced or resolved safely

When moving from Standard to Quick:

* detailed data must not be deleted
* the compact view may summarise it
* the clinician must be able to return to Standard
* active safety concerns must remain visible

---

## Decision-support placement

Decision support should appear as close as possible to the relevant decision.

Examples:

* fracture concern near trauma and weight-bearing findings
* infection concern near red-hot joint findings
* targeted test suggestion near Objective
* working diagnoses near Assessment
* plan recommendation below selected assessment
* referral readiness near the relevant output

Avoid one large detached panel containing all possible support.

---

## Measurement framework

The redesigned workspace must be evaluated using observable measures.

### Efficiency

* number of clicks
* number of keystrokes
* scrolling distance
* time to complete consultation
* time to final reviewed output

### Clinical completeness

* missing high-value history elements
* missing high-value examination elements
* unsupported conclusions
* need for compensatory free text
* relevant safety information captured

### Output quality

* number of journal edits
* number of referral edits
* factual corrections required
* wording corrections required
* missing referral information
* clinician-rated usefulness

### User experience

* perceived cognitive load
* perceived calm
* confidence in documentation
* confidence in decision support
* willingness to use during a busy day

---

## Prototype requirements

Before production implementation, a prototype should demonstrate:

1. Empty Quick mode
2. Quick mode with explicit normal confirmation
3. Acute trauma in Standard mode
4. Degenerative knee pain in Standard mode
5. Red-hot swollen knee
6. Possible true locking
7. Assessment and plan interaction
8. Clinical attention points
9. Journal output
10. Physiotherapy referral
11. Imaging referral
12. Keyboard workflow

The prototype may be:

* Figma
* isolated frontend
* design system prototype
* non-production interactive mock-up

It must not modify the production pathway before design review.

---

## Prototype acceptance criteria

The prototype is acceptable for implementation planning when:

* the workspace feels document-oriented
* Quick and Standard modes are understandable
* grouped confirmations are explicit
* clinical detail remains accessible
* keyboard interaction is plausible
* diagnostic suggestions are prioritised
* plan actions are clinically grouped
* outputs are coherent
* the interface is materially more compact
* the reviewer can maintain a clinical overview
* no safety invariant is weakened

---

## Architecture questions

The following questions must be resolved before production implementation:

1. How are Quick and Standard presentations represented?
2. How are grouped confirmations encoded?
3. How are positive exceptions applied?
4. How does the document map to structured answers?
5. How is edited output text represented?
6. How are keyboard actions declared?
7. How are clinical groups defined in pathway data?
8. How are output synthesis templates structured?
9. How are targeted tests progressively disclosed?
10. Which changes belong in shared engine contracts versus pathway content?

A separate RFC is required if the design changes shared engine contracts.

---

## Non-goals

Clinical Document Workspace v1 does not attempt to:

* create a complete EHR
* persist patient records
* replace clinical judgement
* implement speech input
* introduce generative diagnosis
* add longitudinal patient history
* solve all clinical pathways
* support every output type
* implement a universal medical terminology system
* automate clinical sign-off
* remove the need for clinician review

---

## Implementation sequence

Implementation should not begin as one large task.

Recommended slices:

1. Workspace structure
2. Quick and Standard presentation model
3. Grouped confirmations
4. Keyboard interaction foundation
5. Revised knee history
6. Revised knee examination
7. Assessment and plan redesign
8. Journal synthesis
9. Physiotherapy referral synthesis
10. Imaging referral synthesis
11. Clinical attention points
12. Automated regression
13. RC-002 retest

Each slice must pass:

* Vitest
* Playwright where relevant
* architecture review
* product review where relevant

---

## Decision

Clinical Document Workspace v1 is the approved product direction for the redesign phase only after explicit review.

Current decision:

* [ ] Approved
* [ ] Approved with observations
* [ ] Changes required
* [x] Proposed for review

No production implementation is authorised by this document alone.

---

## Required next steps

1. Review and approve this document.
2. Create the revised knee clinical content model.
3. Create the knee evidence register.
4. Identify any shared architecture changes.
5. Write an RFC if shared engine changes are required.
6. Build an isolated prototype.
7. Test the prototype against RC-002 scenarios.
8. Approve the implementation plan.
9. Implement in small slices.
10. Repeat RC-002.

---

## Relationship to other documents

This document is subordinate to:

* `docs/vision/MANIFEST.md`
* `docs/vision/CX-001-The-Perfect-Consultation.md`
* `docs/vision/MVP-001-The-First-Clinical-Product.md`
* `docs/vision/WF-001-The-Consultation-Workflow.md`
* `docs/governance/CLINICAL-SAFETY-PRINCIPLES.md`
* `docs/governance/ENGINEERING-CONSTITUTION.md`

It is informed by:

* `docs/product/reviews/RC-002-Clinical-Workspace-Review.md`
* `docs/clinical/pathways/KNEE-001-Knee-Pain.md`
* `docs/design/CLINICAL-WORKSPACE.md`
* `docs/design/UX-GUIDELINES.md`

Where conflicts exist, the higher-authority document prevails.

---

## Sign-off

**Product owner:**
**Clinical reviewer:**
**Architecture reviewer:**
**Decision:** Proposed
**Date:** 2026-07-17
**Implementation authorised:** No
**Prototype required:** Yes
**RC-002 retest required:** Yes

```
```
