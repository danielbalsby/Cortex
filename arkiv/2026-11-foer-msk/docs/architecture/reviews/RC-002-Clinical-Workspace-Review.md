````md
# RC-002 – Clinical Workspace Review

**Status:** Changes required  
**Release:** Foundation 1.0  
**Owner:** Cortex  
**Review type:** Product and Clinical Design Review  
**Last reviewed:** 2026-07-17

---

## Purpose

This review evaluates whether the Cortex clinical workspace supports natural, efficient and trustworthy work in general practice.

The review focuses on:

- consultation flow
- cognitive load
- information hierarchy
- clinical completeness
- documentation quality
- referral quality
- interaction burden
- perceived usefulness
- clinician confidence

This review does not assess:

- source validity of individual clinical recommendations
- regional referral requirements
- formal clinical validation
- production readiness
- regulatory compliance

Those matters require separate clinical evidence review and pathway-specific sign-off.

---

## Review question

The primary question is:

> Would a general practitioner realistically choose to use Cortex during a busy clinical day?

A secondary question is:

> Does the current workspace realise the Cortex principle that documentation, decision support and administrative outputs should be created as one coherent clinical workflow?

---

## Review method

The review was performed using synthetic clinical scenarios with no patient-identifiable information.

The reviewer used the current local Cortex prototype as a clinician rather than as a software developer.

The review considered:

- where the clinician naturally begins
- whether the sequence reflects clinical reasoning
- whether relevant information can be recorded
- how many explicit interactions are required
- how often free text is needed
- whether suggestions appear at the right time
- whether outputs are clinically coherent
- whether the workspace feels calm
- whether the generated documents reduce administrative work

No production changes were made during the review.

---

## Scenarios reviewed

### Scenario 1 — Acute knee trauma

A 24-year-old man with right-sided knee pain after a twisting injury during football.

Relevant findings included:

- acute onset
- twisting trauma
- subsequent mild swelling
- reduced weight-bearing ability
- medial joint-line tenderness
- mildly reduced range of motion
- no fever
- no locking
- no obvious clinical instability

The clinical working diagnosis was meniscus-related symptoms, with ligament injury as a differential diagnosis.

Outputs reviewed:

- PSOAP journal
- physiotherapy referral
- plan recommendation
- safety-net wording

### Scenario 2 — Gradual degenerative knee pain

A 67-year-old woman with gradually increasing right-sided knee pain over six months.

Relevant findings included:

- no trauma
- load-related pain
- pain on stairs and prolonged walking
- short-lived stiffness after rest
- medial joint-line tenderness
- mild varus alignment
- crepitus
- mildly reduced flexion
- no fever
- no red, hot or markedly swollen joint
- limited effect from paracetamol

The clinical working diagnosis was gonarthrosis.

Outputs reviewed:

- PSOAP journal
- physiotherapy referral
- X-ray referral
- plan recommendation
- clinical attention panel

---

## Overall assessment

The central Cortex value proposition was strongly confirmed.

The reviewer experienced clear value in documenting a consultation once and having the system derive relevant outputs automatically.

The transition from journal documentation to completed referral drafts felt effortless. The reviewer described the experience as one where the referral was “simply there” without the administrative work being felt.

This is the strongest positive finding from RC-002.

However, the current clinical workspace does not yet realise this value proposition sufficiently well.

The interface remains too similar to a separate questionnaire that subsequently generates clinical documents.

The next version should instead make the clinical document itself feel like the primary workspace, with structured choices, decision support and output generation integrated directly into the act of documentation.

---

## Strengths

### Clear value proposition

The combination of:

- one-time documentation
- automatic journal generation
- automatic referral generation
- plan suggestions
- decision support

was experienced as highly valuable.

The administrative burden appears capable of being reduced substantially.

### Intuitive initial use

The reviewer was generally not in doubt about:

- where to begin
- how to select answers
- how to progress through the consultation
- how the live journal updates
- how additional outputs become active

The overall interaction model was easy to understand without training.

### Calm visual foundation

The interface was experienced as:

- visually coherent
- pleasant
- simple
- trustworthy
- calmer than typical clinical software

The selected-state styling was clear, and the distinction between documentation and outputs was understandable.

### Useful live outputs

The live journal was experienced as meaningful and motivating.

Automatic activation of physiotherapy and X-ray referral drafts demonstrated the intended reuse of consultation information.

### Explicit physician control

Plan recommendations required explicit acceptance.

Clinical suggestions did not automatically change the physician’s assessment.

This supported trust and preserved clinical responsibility.

### Useful safety concept

The panel currently named “Klinisk kvalitetstjek” was regarded as a valuable idea.

The underlying function should remain, although its name and scope need clarification.

---

## Principal findings

### 1. The workspace feels too much like a form

The current interaction is dominated by rows of labels and selectable chips.

The clinician experiences:

```text
form completion
→ generated journal
````

rather than:

```text
clinical documentation
with integrated structure and assistance
```

This distinction is central.

The next version should make the clinical document feel like the actual workspace.

Structured data collection should remain under the surface, but should not dominate the clinician’s experience.

---

### 2. Too many clicks are required

Common negative and normal findings require repeated individual selections.

This creates unnecessary interaction burden in consultations where most findings are normal.

The solution must not be clinically meaningful preselected defaults.

Unconfirmed clinical facts must never be recorded automatically.

Instead, Cortex should support explicit grouped confirmations such as:

* confirm relevant red flags absent
* confirm baseline knee examination normal
* apply standard conservative plan
* confirm standard safety-net discussed

One deliberate physician action may record several findings when the meaning is explicit and reversible.

---

### 3. The history is clinically incomplete

The current pathway does not capture several high-value elements adequately.

Missing or insufficiently represented areas include:

* precise duration
* progression over time
* pain location
* constant versus intermittent pain
* load-related pattern
* start-up pain
* rest pain
* night pain
* provoking factors
* relieving factors
* previous similar symptoms
* previous injury
* previous surgery
* previous treatment
* self-treatment
* analgesic effect
* functional impact
* ability to walk four weight-bearing steps
* instability or giving-way symptoms
* swelling timing
* true locking
* persistent loss of extension

The reviewer therefore had to compensate too often with free text. 

---

### 4. The objective examination is not sufficiently clinically specific

The current objective section is too coarse.

The field “Stabilitet” is particularly ambiguous because it does not state:

* whether the finding is subjective or objective
* which ligament was assessed
* which test was performed
* whether the examination was complete
* whether a structure was not examined

The current pathway lacks documentation of targeted knee tests such as:

* Lachman
* valgus stress
* varus stress
* posterior drawer where relevant
* Thessaly or McMurray
* patellar examination
* straight-leg raise
* effusion
* distal neurovascular status after relevant trauma

The system must distinguish clearly between:

* normal
* abnormal
* not indicated
* not performed
* not assessable

Absence of a recorded abnormality must not be interpreted as a normal examination.

---

### 5. The assessment area is overloaded

Too many working diagnoses are displayed simultaneously with similar visual prominence.

This creates unnecessary cognitive load.

The clinician found the number of diagnoses distracting in both reviewed scenarios.

The interface does not clearly distinguish between:

* the most relevant suggestions
* common alternative diagnoses
* serious diagnoses that must be considered
* the full manual diagnosis list

A better model would show:

* a small number of relevant suggestions
* additional choices under “Show more”
* serious attention diagnoses in a separate safety context
* differential diagnoses as a secondary action

---

### 6. “Sikkerhed” feels system-driven

The field asking the clinician to select high, medium or low diagnostic confidence did not feel clinically natural or useful.

It appeared to exist primarily for the system rather than for the consultation.

The reviewer would not normally document “medium diagnostic certainty” in this form.

This field should therefore be:

* removed from the primary workflow
* made optional
* replaced by a more clinically natural expression of uncertainty
* or used internally without requiring a visible choice

No final solution is decided in this review.

---

### 7. “Problem” is not a useful separate section

The reviewer found that the standalone Problem section added little value.

Side could be integrated into the clinical history or document heading.

A separate large card for one field increases scrolling and fragments the consultation.

---

### 8. The trauma track is underdeveloped

The dynamic trauma track is conceptually useful, but currently contains too little information relative to its visual weight.

Relevant trauma content should include more of the following when indicated:

* mechanism
* planted-foot rotation
* direct blow
* valgus or varus force
* hyperextension
* immediate ability to continue
* immediate ability to weight-bear
* timing of swelling
* audible or felt pop
* patellar dislocation
* subsequent instability
* inability to extend
* neurovascular concerns

The trauma track should either become clinically complete or be integrated more compactly into the history.

---

### 9. The plan is not sufficiently structured

The current Plan section presents many different actions as one flat chip group.

It does not clearly distinguish:

* information
* analgesia
* exercise
* activity modification
* investigation
* referral
* follow-up
* safety-net

The next version should organise the plan into meaningful clinical categories.

---

### 10. Keyboard-first interaction is missing

The reviewer explicitly requested a workflow that can be operated efficiently by keyboard.

Desired interaction includes:

* Tab between clinical groups
* arrow keys between choices
* Space to select
* Enter to confirm and move forward
* shortcuts for normal groups
* shortcuts for free text
* efficient progression without mouse use

Keyboard operation should be treated as a core product requirement rather than an accessibility-only enhancement.

---

### 11. The workspace is too vertically spacious

The visual design is calm, but the typography, padding, chips and section headers are too large for rapid clinical use.

Too little clinical information is visible within one screen height.

This creates:

* excessive scrolling
* loss of clinical overview
* separation between history, examination, assessment and plan
* slower visual scanning

The next design should retain visual calm while becoming materially more compact.

---

### 12. Language and terminology need refinement

Examples include:

* “PSOAP-journal” feels technical and unnatural
* “Notat” or “Journalnotat” would be more natural
* “Klinisk kvalitetstjek” may imply a broader validation than the system performs
* “Kliniske opmærksomhedspunkter” is a more accurate working title
* “Refereret smerte” feels translated and unnatural
* English section labels mixed with Danish clinical headings reduce coherence
* “Belastning” is ambiguous and should be described more precisely
* “Stabilitet” is clinically underspecified

Terminology should be understandable without knowledge of the internal architecture.

---

## Output review

### Journal output

The journal structure is understandable and the live update is useful.

However, the generated text is too often:

* fragmentary
* label-like
* generic
* temporally disconnected
* clinically underspecified

Examples include phrases such as:

* “Akut debut”
* “Varighed timer”
* “Forudgående traume”
* “Traume ved vrid”

These represent recorded data correctly but do not form natural clinical prose.

The journal should synthesise facts into coherent statements.

It should also preserve chronology.

For example, immediate absence of swelling and later development of swelling should not appear as apparently conflicting isolated statements.

The journal should not make broad normal claims such as stable ligament testing unless the specific relevant examination has been recorded.

Safety-net choices should be combined into one grammatically coherent sentence rather than repeated as separate “Kontakt ved…” statements.

---

### Physiotherapy referral

The reviewed physiotherapy referrals were not sufficiently clinically useful.

Problems included:

* staccato language
* no coherent clinical narrative
* insufficient explanation of why the patient is referred
* insufficient description of the triggering event
* insufficient description of functional impact
* missing specific examination findings
* missing named tests
* no clear treatment question
* generic treatment goals
* insufficient information about prior treatment and effect
* no clear mention of relevant imaging status

The referral generator should produce a clinical communication document, not a sequence of field fragments.

A useful structure should include:

1. reason for referral
2. relevant course and mechanism
3. functional impact
4. central positive findings
5. relevant negative findings
6. working diagnosis and uncertainty
7. previous treatment and effect
8. imaging or investigation status
9. concrete treatment or assessment request

---

### X-ray referral

The X-ray referral was also considered insufficiently coherent.

Problems included:

* fragmentary language
* limited clinical justification
* weak connection between symptoms, examination and imaging request
* no explicit indication logic
* insufficiently precise question to radiology
* no distinction between standing load-bearing imaging and other imaging contexts
* no clear account of how the result will affect management

The referral must communicate both:

* why imaging is justified
* what clinical question the image should answer

Regional requirements must be reviewed separately.

---

## Key product insight

The most important conclusion from RC-002 is:

> The clinical document should become the workspace.

The next version should not expose the clinician primarily to a separate form that later becomes a journal.

Instead, it should provide a journal-oriented workspace where:

* structured selections feel integrated into documentation
* free text and structured input coexist naturally
* clinical detail appears progressively
* decision support appears in context
* outputs are derived without duplicated work
* the clinician retains full control
* the data model remains structured beneath the interface

This direction applies beyond the knee pathway.

---

## Quick and Standard workspace modes

The review supports one shared clinical pathway model with two workspace presentations.

### Quick mode

For uncomplicated presentations.

Expected characteristics:

* compact
* keyboard-first
* explicit confirmation of relevant normal or negative groups
* focus on high-value positive findings
* limited scrolling
* concise journal output
* easy escalation to Standard mode

Quick mode must not use unconfirmed defaults.

It should not be used when there is:

* significant trauma
* large acute effusion
* red or hot knee
* true locking
* extension deficit
* objective instability
* major uncertainty
* serious red flags

### Standard mode

For:

* trauma
* red flags
* diagnostic uncertainty
* complex examination
* detailed decision support
* imaging
* referral
* specialist consideration

Standard mode should expose more detail progressively without forcing a complete battery of tests.

The clinician must be able to switch between Quick and Standard without losing recorded information.

---

## Proposed core clinical structure

The revised knee workspace should be based on a clinically stronger model.

### History

High-value elements include:

* side
* onset
* exact duration
* progression
* precipitating event
* trauma mechanism
* pain location
* load/start/rest/night pattern
* function and gait
* ability to walk four steps
* swelling and timing
* true locking
* extension deficit
* instability or giving way
* infectious, inflammatory and malignant red flags
* previous disease
* previous injury
* previous surgery
* prosthesis or injection
* previous treatment and effect

### Objective examination

High-value elements include:

* general condition
* gait
* inspection
* deformity
* redness
* warmth
* swelling
* active and passive range of motion
* extension
* straight-leg raise
* effusion
* focal tenderness
* selected ligament tests
* selected meniscus tests
* selected patellar tests
* distal neurovascular status after relevant trauma
* supplementary findings

Special tests should be targeted, not mandatory as one complete test battery. 

### Assessment

The assessment should include:

* most likely diagnosis
* relevant differential diagnoses
* red flags
* fracture concern
* infection concern
* locking concern
* extensor mechanism concern
* urgency
* whether management in general practice is appropriate

### Plan

The plan should include:

* explanation and expected course
* activity and mobilisation
* analgesia
* exercises
* supervised training
* physiotherapy
* weight management where relevant
* investigation
* imaging
* referral
* follow-up interval
* reassessment targets
* coherent safety-net
* patient agreement

---

## Safety principles

The redesign must preserve these rules:

* no clinical facts are recorded without explicit clinician confirmation
* unanswered does not mean normal
* not performed does not mean negative
* grouped normal findings require one explicit confirmation
* positive findings can override a grouped normal confirmation
* changing earlier answers must remove stale dependent data
* outputs must contain only recorded information
* suggestions must not become decisions automatically
* automated success does not establish clinical validity
* pathway content requires evidence review and sign-off

---

## Product requirements for the next version

The next workspace should support:

* journal-oriented interaction
* Quick and Standard modes
* explicit grouped confirmation of normal and negative findings
* keyboard-first operation
* progressive disclosure
* clinically meaningful field grouping
* precise duration
* structured pain history
* targeted knee tests
* supplementary history and objective text
* prioritised diagnostic suggestions
* clearer separation of assessment, differentials and safety threats
* structured plan categories
* coherent journal synthesis
* clinically usable referral synthesis
* clearer terminology
* more compact visual density
* preserved validated Workflow Engine behavior

---

## Success measures for the redesign

The redesigned workspace should be tested against the same scenarios.

Measures should include:

* total clicks
* total keystrokes
* scrolling distance
* time to complete the consultation
* number of free-text compensations
* journal edits required after generation
* referral edits required after generation
* number of missing clinically important elements
* clinician-rated cognitive load
* clinician confidence
* overall willingness to use the system

The redesign should demonstrate:

* materially fewer interactions
* less scrolling
* better clinical completeness
* more natural documentation
* clinically useful referrals
* reduced editing burden
* preserved safety
* preserved physician control

---

## Review checklist

### Consultation flow

* [x] Starting point is understandable
* [x] General section order is clinically recognisable
* [ ] The interaction feels like clinical documentation rather than form completion
* [ ] Quick and Standard workflows are supported
* [ ] Complex and simple consultations are both handled efficiently

### Cognitive load

* [ ] Minimal unnecessary clicking
* [ ] Diagnosis choices are sufficiently prioritised
* [ ] Normal and negative findings can be confirmed efficiently
* [ ] The clinician can maintain an overview across the consultation
* [ ] System-driven fields do not interrupt clinical thinking

### Workspace design

* [x] Visual foundation is calm and coherent
* [ ] Information density is suitable for rapid clinical work
* [ ] Scrolling is acceptable
* [ ] Clinical groups have appropriate visual hierarchy
* [ ] Output and data entry balance is optimal

### Clinical content

* [ ] History is sufficiently complete
* [ ] Objective examination is sufficiently precise
* [ ] Targeted tests can be documented
* [ ] Relevant uncertainty is represented naturally
* [ ] Plan options are sufficiently structured

### Outputs

* [x] Outputs are generated without duplicate administrative work
* [ ] Journal prose is coherent
* [ ] Physiotherapy referral is clinically useful
* [ ] X-ray referral is clinically useful
* [ ] Safety-net language is coherent
* [ ] Outputs require only minor editing

### Interaction

* [ ] Keyboard-first use is supported
* [ ] Common uncomplicated cases are fast
* [ ] Group confirmations remain explicit and safe
* [ ] Free text is available in the right places
* [ ] The workspace can be used realistically during a busy clinical day

---

## Decision

* [ ] Approved
* [ ] Approved with observations
* [x] Changes required

---

## Decision rationale

The review confirms that the central Cortex concept is valuable and compelling.

The automatic reuse of documentation for journals and referrals has the potential to reduce administrative burden significantly.

However, the current workspace is still too form-based, interaction-heavy and clinically incomplete.

Journal and referral outputs are not yet sufficiently coherent or useful for routine clinical use.

The clinical workspace therefore requires redesign before Foundation 1.0 can be considered product-approved.

This decision does not reject:

* the Workflow Engine
* the documentation-once principle
* automatic outputs
* decision support
* plan suggestions
* clinical attention points

It requires that these capabilities be presented through a more natural, clinically complete and journal-oriented workspace.

---

## Required next steps

1. Define Clinical Document Workspace v1.
2. Preserve one structured clinical model with Quick and Standard workspace modes.
3. Redesign the knee clinical content around high-value history, examination, assessment and plan elements.
4. Establish explicit grouped confirmation for normal and negative findings.
5. Define keyboard-first interaction.
6. Improve journal synthesis.
7. Improve referral synthesis.
8. Create a pathway-specific evidence register.
9. Build a static or isolated prototype before modifying production behavior.
10. Repeat RC-002 using the redesigned workspace.

---

## Retest plan

RC-002 remains open.

The review should be repeated using at least:

1. acute twisting trauma
2. gradual degenerative pain
3. acute red and hot swollen knee
4. possible true locking
5. uncomplicated overuse presentation

The retest should compare the redesigned workspace with the current version using the success measures defined above.

---

## Sign-off

**Reviewer:** Clinical Product Review
**Decision:** Changes required
**Date:** 2026-07-17
**Version reviewed:** Foundation 1.0 prototype
**Clinical validation status:** Not clinically validated
**Retest required:** Yes

```
```
