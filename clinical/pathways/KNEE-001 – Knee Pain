# KNEE-001 – Knee Pain

**Status:** Proposed for clinical and product review  
**Owner:** Cortex  
**Document type:** Clinical pathway specification  
**Population:** Adults presenting with knee pain in Danish general practice  
**Last reviewed:** 2026-07-17  
**Clinical validation status:** Not clinically validated  
**Implementation authorised:** No  
**Evidence register required:** Yes  
**RC-002 retest required:** Yes

---

## 1. Purpose

This document defines the clinical content model and pathway requirements for adult knee pain in general practice.

It translates the product direction in `CLINICAL-DOCUMENT-WORKSPACE-v1.md` into a pathway-specific specification for:

- clinical history
- objective examination
- assessment
- management
- clinical attention points
- journal synthesis
- physiotherapy referral
- imaging referral
- specialist referral
- Quick and Standard workspace presentations

This document is intended to support natural clinical documentation, structured decision support, reduction of duplicated administrative work, safe generation of outputs and later evidence review.

It does not replace clinical judgement, local instructions, regional referral criteria or specialist assessment.

---

## 2. Relationship to other documents

This document is subordinate to:

- `docs/vision/MANIFEST.md`
- `docs/vision/CX-001-The-Perfect-Consultation.md`
- `docs/vision/MVP-001-The-First-Clinical-Product.md`
- `docs/vision/WF-001-The-Consultation-Workflow.md`
- `docs/governance/CLINICAL-SAFETY-PRINCIPLES.md`
- `docs/governance/ENGINEERING-CONSTITUTION.md`
- `docs/design/CLINICAL-DOCUMENT-WORKSPACE-v1.md`

It is informed by:

- `docs/product/reviews/RC-002-Clinical-Workspace-Review.md`
- current Danish guidance on meniscal pathology
- current Danish guidance on acute monoarthritis and septic arthritis
- applicable regional acute-knee and referral guidance
- current international osteoarthritis guidance

Where a clinical recommendation conflicts with current Danish or regional guidance, the applicable Danish or regional guidance takes precedence.

---

## 3. Scope

### Included

Adults presenting in general practice with:

- acute traumatic knee pain
- gradual atraumatic knee pain
- overuse-related knee pain
- suspected knee osteoarthritis
- suspected meniscal pathology
- suspected cruciate or collateral ligament injury
- patellofemoral pain
- suspected patellar instability
- tendinopathy
- bursitis
- Baker’s cyst
- inflammatory or infectious concern
- possible referred pain
- non-specific knee pain

### Excluded from primary pathway scope

The following require separate or adapted pathways:

- children and adolescents
- postoperative follow-up
- prosthetic knee complications
- confirmed fracture management
- established inflammatory arthritis follow-up
- tumour follow-up
- complex multisystem trauma
- inpatient management

The pathway may identify these presentations and direct the clinician toward appropriate escalation.

---

## 4. Core clinical design decision

KNEE-001 uses one shared clinical model with two workspace presentations:

- **Quick**
- **Standard**

These are not separate pathways.

They share the same clinical concepts, answer meanings, rules, safety constraints, output generators and evidence ownership.

Switching presentation must not discard or reinterpret recorded information.

---

## 5. Safety principles

The pathway must preserve the following rules:

1. No clinical fact is recorded without explicit clinician confirmation.
2. Unanswered does not mean absent, normal, negative or not relevant.
3. Not performed does not mean negative.
4. Not indicated does not mean negative.
5. Not assessable remains distinct from negative.
6. Grouped normal findings require an explicit clinician action.
7. Positive findings override contradictory grouped normal findings.
8. Hidden or no-longer-relevant answers are pruned safely.
9. Suggestions never become diagnoses or plans automatically.
10. Generated outputs contain only recorded information.
11. Technical completeness is not presented as clinical approval.
12. Serious attention points remain visible across Quick and Standard.
13. Regional referral and imaging requirements are versioned content.
14. Clinical validation requires separate review and sign-off.

---

## 6. Clinical objectives

The pathway should help the clinician determine:

- whether the presentation is traumatic or atraumatic
- whether urgent or time-sensitive pathology is possible
- whether fracture screening is required
- whether infection or inflammatory disease is possible
- whether true locking or extensor mechanism injury is possible
- whether objective instability is present
- whether symptoms are mainly mechanical, degenerative, inflammatory or referred
- whether management in general practice is appropriate
- whether imaging is indicated
- whether physiotherapy or specialist referral is indicated
- what follow-up and safety-net are appropriate

The pathway must not imply diagnostic certainty beyond the recorded findings.

---

## 7. High-value clinical information

The pathway should prioritise:

1. Side, onset, duration and development.
2. Trauma or load change, mechanism and possible pop.
3. Pain location and activity, start-up, rest or night pattern.
4. Gait and weight-bearing ability, including four steps when clinically relevant.
5. Swelling and timing.
6. True locking and persistent extension deficit.
7. Instability or giving-way symptoms.
8. Infectious, inflammatory and malignant warning symptoms.
9. Previous knee disease, injury, operation, prosthesis or injection.
10. General condition, gait and inspection for deformity, redness, warmth and swelling.
11. Active and passive movement and intact extensor mechanism.
12. Effusion and focal tenderness.
13. Targeted ligament examination.
14. Targeted meniscal or patellar examination when indicated.
15. Distal neurovascular status after relevant trauma.

Pain scores, broad pain adjectives, crepitus, routine blood tests and complete mandatory test batteries should not dominate the core workflow unless they change management.

---

# 8. Workspace entry

## 8.1 Heading

The pathway heading should combine problem and side.

Examples:

- `Right knee pain`
- `Left knee injury`
- `Bilateral knee pain`

A separate large “Problem” card is not required.

## 8.2 Side

Options:

- right
- left
- bilateral
- not yet established

Side must be available early and reused in all outputs.

---

# 9. History

## 9.1 Onset and course

### Required concepts

- onset
- exact duration
- development
- precipitating factor

### Onset

Options:

- acute
- gradual
- recurrent
- unclear
- other

### Duration

Support structured precision:

- number
- unit
- optional clinically natural shortcut

Units:

- hours
- days
- weeks
- months
- years

Shortcuts may include:

- today
- since yesterday
- 2–3 days
- one week
- other

Generated text should prefer natural wording such as:

> Symptoms since yesterday.

not:

> Duration: days.

### Development

Options:

- improving
- unchanged
- worsening
- fluctuating
- intermittent
- recurrent
- other

### Precipitating factor

Options:

- none identified
- increased or unusual load
- sport
- work-related activity
- trauma
- other

---

## 9.2 Trauma history

Shown when trauma is recorded or manually opened.

### Mechanism

Options may include:

- twisting on planted foot
- direct blow
- fall
- valgus force
- varus force
- hyperextension
- forced flexion
- patellar displacement
- unclear
- other

### Additional trauma findings

- audible or felt pop
- able to continue activity immediately
- able to weight-bear immediately
- able to walk four weight-bearing steps
- immediate swelling
- swelling within hours
- delayed swelling
- patellar dislocation or transient displacement
- subsequent giving way
- inability to extend
- visible deformity
- open injury
- distal sensory symptoms
- distal circulatory symptoms

Each item must retain an explicit state where relevant:

- present
- absent
- not assessed
- not applicable

---

## 9.3 Pain

Pain should be a dedicated clinical group.

### Location

Options:

- anterior
- medial
- lateral
- posterior
- diffuse
- peripatellar
- focal bony
- calf
- other

Multiple locations may be recorded.

### Pattern

Options may include:

- load-related
- start-up pain
- stairs
- prolonged walking
- squatting
- running
- jumping
- pivoting
- sitting with flexed knee
- rest pain
- night pain
- constant
- intermittent
- other

### Provoking and relieving factors

Structured common choices plus free text:

- activity
- stairs
- walking
- running
- kneeling
- squatting
- rest
- unloading
- movement
- analgesia
- other

### Previous self-management

- no treatment tried
- paracetamol
- topical NSAID
- oral NSAID
- rest or load reduction
- exercise
- physiotherapy
- brace or support
- ice or compression
- other

### Effect

- good effect
- partial effect
- no effect
- adverse effect
- unclear

The system must not assume medication safety has been assessed merely because prior use is recorded.

---

## 9.4 Function

Options:

- normal gait and function
- slight limp
- marked limp
- cannot weight-bear
- can walk four weight-bearing steps
- cannot walk four weight-bearing steps
- reduced walking distance
- difficulty with stairs
- difficulty rising from chair
- reduced work function
- reduced sports participation
- reduced daily activities
- other

“Load” must not be used as an isolated ambiguous label.

The UI should distinguish:

- weight-bearing ability
- symptom-provoking activity
- temporary activity modification
- graded reloading

---

## 9.5 Swelling

Options:

- none
- immediate
- within a few hours
- delayed
- intermittent
- persistent
- uncertain

The output generator must preserve chronology.

Example:

> No immediate swelling, but mild swelling developed later.

---

## 9.6 Mechanical symptoms

Options:

- none
- clicking
- catching
- true locking
- persistent extension deficit
- other

The pathway must distinguish true locking from clicking or transient catching.

A recorded true locking episode or persistent extension deficit should trigger a clinical attention point and possible Standard-mode recommendation.

---

## 9.7 Instability

Subjective instability belongs in History.

Options:

- none
- giving way
- rotational instability
- patellar instability
- uncertain
- situation or trigger
- other

This must remain separate from objective ligament testing.

---

## 9.8 Red flags and inflammatory features

The pathway should support individual findings and an explicit grouped confirmation.

### Possible findings

- fever
- systemic illness
- acutely red, hot and swollen joint
- severe atraumatic pain
- rapidly progressive swelling
- progressive rest pain
- progressive night pain
- unexplained weight loss
- known malignancy
- multiple swollen joints
- prolonged morning stiffness
- recent infection
- skin infection
- immunosuppression
- recent joint injection
- prosthetic joint
- calf swelling
- neurovascular symptoms
- other

### Grouped action

Working label:

> Confirm relevant warning symptoms absent

The included findings must be visible before confirmation, pathway-defined, reversible and appropriate to the current context.

The grouped action must not confirm findings that have not reasonably been assessed.

---

## 9.9 Previous history

Options:

- no relevant previous knee history
- previous similar symptoms
- previous knee injury
- known osteoarthritis
- inflammatory arthritis
- previous knee operation
- prosthetic knee
- recent joint injection
- previous imaging
- previous specialist assessment
- previous physiotherapy
- other

Additional fields:

- side
- year or approximate timing
- treatment
- effect
- relevant free text

---

## 9.10 Supplementary history

A free-text field must be available.

It should be used for nuance, not to compensate for missing common structured concepts.

---

# 10. Objective examination

## 10.1 General condition

Options:

- unaffected
- mildly affected
- clearly affected
- unable to assess

A clearly affected patient with possible infection, major trauma or neurovascular concern should trigger a clinical attention point.

## 10.2 Gait and weight-bearing

Options:

- normal
- antalgic
- limping
- unable to weight-bear
- not assessed

Optional:

- four weight-bearing steps possible
- four weight-bearing steps not possible
- not relevant
- not assessed

## 10.3 Inspection

Options:

- normal
- swelling
- redness
- warmth
- deformity
- muscle wasting
- bruising
- wound
- patella displaced
- patella alta or baja suspected
- other

Redness and warmth should remain distinct findings.

## 10.4 Range of motion

### Structured summary

- full
- mildly reduced
- markedly reduced
- pain-limited
- mechanically blocked
- not assessed

### Optional detail

- active extension in degrees
- passive extension in degrees
- active flexion in degrees
- passive flexion in degrees

### Extensor mechanism

- straight-leg raise intact
- straight-leg raise not possible
- not assessed
- not relevant

Inability to perform straight-leg raise after relevant trauma should trigger a clinical attention point.

## 10.5 Effusion

Options:

- none
- mild
- moderate
- large or tense
- uncertain
- not assessed

The pathway should not use “swelling” and “effusion” interchangeably.

## 10.6 Palpation

Multiple sites may be selected:

- no focal tenderness
- medial joint line
- lateral joint line
- MCL
- LCL
- patella
- patellar tendon
- quadriceps tendon
- tibial tuberosity
- pes anserinus
- prepatellar region
- popliteal region
- fibular head
- focal bony tenderness
- calf
- other

Free-text localisation must be available.

## 10.7 Objective stability

Objective stability must use named tests or clearly defined examination groups.

### Lachman

- negative
- positive
- not indicated
- not performed
- not assessable

### Posterior drawer

- negative
- positive
- not indicated
- not performed
- not assessable

### Valgus stress

- stable
- lax
- painful without laxity
- not indicated
- not performed
- not assessable

### Varus stress

- stable
- lax
- painful without laxity
- not indicated
- not performed
- not assessable

The pathway must not generate “stable ligament examination” unless the relevant named examinations have been explicitly recorded.

## 10.8 Meniscal examination

Targeted tests may include:

### Thessaly

- negative
- positive
- not indicated
- not performed
- not possible
- not assessable

### McMurray

- negative
- positive
- not indicated
- not performed
- not assessable

The clinician should not be required to perform both tests.

## 10.9 Patellar examination

Options may include:

- no relevant patellar findings
- focal patellar tenderness
- apprehension positive
- apprehension negative
- pain on patellofemoral provocation
- instability
- not indicated
- not performed
- not assessable
- other

## 10.10 Distal neurovascular status

Shown when relevant after significant trauma, deformity, dislocation, marked swelling or concerning symptoms.

Options:

- normal
- sensory deficit
- motor deficit
- impaired pulse or perfusion
- not assessed
- not assessable

Abnormal findings should trigger an urgent clinical attention point.

## 10.11 Hip and referred pain

Shown when symptoms are atypical, the knee examination is not explanatory, pain may originate from hip or back, or the clinician opens the group manually.

Options:

- hip examination normal
- reduced hip movement
- hip-provoked pain
- possible pain originating from hip
- possible pain originating from back
- not indicated
- not performed
- other

Avoid the isolated label “referred pain” without clinically meaningful wording.

## 10.12 Supplementary objective findings

A free-text field must be available within Objective examination.

## 10.13 Grouped basic examination confirmation

Working action:

> Confirm basic knee examination normal

Potential included findings:

- unaffected general condition
- normal gait
- no deformity
- no redness
- no warmth
- no significant effusion
- full extension
- intact straight-leg raise

The exact content must be visible and clinically reviewed.

It must not automatically confirm named ligament, meniscal, patellar or neurovascular tests.

---

# 11. Assessment

## 11.1 Primary working diagnosis

The interface should display no more than three primary relevant suggestions by default.

Possible diagnoses include:

- knee sprain
- overuse-related knee pain
- knee osteoarthritis
- suspected meniscal pathology
- ACL injury
- PCL injury
- MCL injury
- LCL injury
- patellofemoral pain
- patellar instability
- patellar tendinopathy
- quadriceps tendinopathy
- pes anserine pain or bursitis
- prepatellar bursitis
- Baker’s cyst
- inflammatory arthritis
- septic arthritis
- fracture concern
- extensor mechanism injury
- pain originating from hip or back
- non-specific knee pain
- other

The full diagnosis list must not be shown with equal visual weight.

## 11.2 Differential diagnoses

Differential diagnoses should be added separately from the primary working diagnosis.

Suggested interaction:

> Add differential diagnosis

The generator should preserve uncertainty.

## 11.3 Serious clinical threats

The assessment must support explicit consideration of:

- fracture
- infection
- true locking
- extensor mechanism injury
- major ligament injury
- patellar dislocation
- neurovascular compromise
- inflammatory arthritis
- malignancy or other atypical pathology

These belong primarily in Clinical attention points, not as ordinary equal-weight diagnosis chips.

## 11.4 Management level

Options:

- can be managed in general practice
- acute referral required
- subacute specialist assessment required
- elective referral appropriate
- reassessment required before decision
- unclear

Urgency must be tied to recorded findings and current applicable guidance.

## 11.5 Diagnostic uncertainty

The main workflow should not require a generic high, medium or low “certainty” field.

Uncertainty should instead be represented through:

- provisional wording
- differential diagnoses
- missing or non-assessable findings
- need for follow-up
- need for investigation
- free-text qualification

## 11.6 Own assessment

A free-text field must be available.

---

# 12. Clinical attention points

Working title:

> Clinical attention points

This region must not imply complete clinical quality approval.

Potential attention points include:

- possible septic arthritis or acute monoarthritis
- red, hot and swollen knee
- systemic illness
- possible fracture
- inability to weight-bear
- true locking
- persistent extension deficit
- extensor mechanism concern
- large acute effusion
- objective instability
- neurovascular abnormality
- atypical progressive night or rest pain
- malignancy concern
- inflammatory pattern
- insufficient information before imaging or referral
- contradiction between grouped normal and positive findings

Each item should state:

1. Trigger
2. Clinical relevance
3. Suggested consideration
4. Evidence or rule identifier
5. Whether the issue remains unresolved

Attention points remain advisory unless a separately approved design defines blocking behaviour.

---

# 13. Plan

## 13.1 Information and shared decision-making

Options:

- assessment explained
- expected course explained
- treatment options discussed
- self-management discussed
- patient agrees with plan
- patient preference recorded
- written information provided
- other

These must not be preselected automatically.

## 13.2 Activity and load

Options:

- activity as tolerated
- temporary reduction of provoking activity
- graded return to activity
- mobilisation as tolerated
- crutches as needed
- work modification
- sports restriction
- other

## 13.3 Acute symptom measures

When relevant:

- ice as needed
- compression
- elevation
- other

These should not appear as universal mandatory measures.

## 13.4 Analgesia

Options:

- no analgesic plan
- paracetamol as needed
- topical NSAID
- short course oral NSAID after contraindication assessment
- other

The pathway must distinguish medication discussed, medication recommended, contraindications assessed and medication already used.

No generated statement may imply a contraindication review unless explicitly recorded.

## 13.5 Exercise and rehabilitation

Options:

- home exercises
- therapeutic exercise
- supervised therapeutic exercise
- physiotherapy referral
- patient education
- graded strengthening
- aerobic activity
- weight-management support when relevant
- other

## 13.6 Investigation

Options:

- no investigation currently indicated
- acute X-ray
- standing weight-bearing X-ray
- blood tests for inflammatory or infectious concern
- ultrasound for selected extra-articular question
- MRI only when result is expected to change management
- other

Every investigation must have an indication.

The pathway must support, but not automatically decide:

- fracture screening after acute trauma
- standing weight-bearing radiographs when clinically relevant
- avoidance of routine imaging for typical uncomplicated osteoarthritis
- MRI only where the result has a meaningful management consequence
- regional variation in access and referral requirements

No imaging rule is clinically final until reviewed against the evidence register and applicable regional guidance.

## 13.7 Referral

Potential destinations:

- physiotherapy
- emergency department or acute service
- orthopaedic surgery
- rheumatology
- other

Required referral concepts:

- recipient
- urgency
- indication
- clinical question
- functional impact
- relevant examination
- prior treatment and effect
- imaging status
- unresolved concern

## 13.8 Follow-up

Options:

- as needed
- within 1–2 weeks
- within 4–6 weeks
- after exercise or physiotherapy course
- after imaging
- other interval

Reassessment targets may include:

- pain pattern
- gait
- weight-bearing
- range of motion
- extension
- effusion
- stability
- function
- response to treatment

## 13.9 Safety-net

Structured reasons may include:

- fever or systemic illness
- increasing redness or warmth
- rapidly increasing swelling
- inability to weight-bear
- inability to perform straight-leg raise
- new true locking
- progressive extension deficit
- cold, pale, numb or weak foot
- worsening pain
- no expected improvement
- other

The generator must combine selected reasons into one coherent sentence.

## 13.10 Standard conservative plan bundle

Working action:

> Apply standard conservative plan

The exact content must be visible before or immediately after application.

Possible elements:

- assessment and expected course discussed
- activity according to symptoms
- temporary reduction of provoking activity
- exercise guidance
- analgesia discussion
- follow-up
- safety-net

The bundle must require explicit acceptance, be reversible, permit exceptions and never imply medication safety assessment or patient information unless confirmed.

---

# 14. Quick presentation

## 14.1 Intended use

Quick is intended for uncomplicated, coherent presentations without major trauma, serious warning signs or substantial diagnostic uncertainty.

## 14.2 Core Quick content

### History

- side
- onset and precise duration
- precipitating factor
- pain location and pattern
- function
- swelling
- true locking
- instability
- key warning symptoms
- relevant previous history

### Objective

- general condition
- gait
- inspection
- movement and extension
- straight-leg raise
- effusion
- focal tenderness
- one or more targeted tests where indicated

### Assessment

- primary working diagnosis
- relevant differential
- serious concern absent or unresolved
- general-practice management appropriate or not

### Plan

- information
- activity
- analgesia
- exercise or physiotherapy
- investigation
- follow-up
- safety-net

## 14.3 Quick exclusion signals

The system should recommend Standard when recorded information includes:

- significant trauma
- possible fracture
- inability to weight-bear
- immediate large effusion
- red-hot swollen knee
- fever or systemic illness
- true locking
- persistent extension deficit
- extensor mechanism concern
- objective instability
- neurovascular concern
- diagnostic uncertainty
- detailed imaging or specialist referral need

The clinician retains control and should see why Standard is suggested.

---

# 15. Standard presentation

Standard should expose additional detail progressively.

It should support:

- detailed pain history
- precise trauma mechanism
- swelling chronology
- previous disease and treatment
- infection and inflammatory risk
- named targeted tests
- detailed differential diagnoses
- explicit management level
- imaging rationale
- referral urgency
- recipient-specific outputs

Standard must not become a mandatory complete examination battery.

---

# 16. Journal synthesis

## 16.1 Default structure

The default note should use clinically natural sections:

- Problem
- History
- Objective
- Assessment
- Plan

The visible output label should be `Note` or `Journal note`, not `PSOAP journal`.

## 16.2 Synthesis requirements

The generator must:

- use coherent Danish prose
- preserve chronology
- combine related findings
- avoid raw label concatenation
- avoid unnecessary repetition
- distinguish subjective and objective findings
- preserve uncertainty
- include only confirmed findings
- avoid broad normal conclusions unsupported by named examinations
- combine safety-net items grammatically
- avoid technical internal terminology

## 16.3 Example: acute trauma

Preferred:

> Right-sided knee pain after a twisting injury during football yesterday. The patient could continue briefly, but subsequently developed mild swelling, a limp and reduced weight-bearing ability. No fever or true locking.

Avoid:

> Acute. Duration days. Trauma. Twisting. Reduced load. Mild swelling. No fever. No locking.

## 16.4 Example: gradual degenerative presentation

Preferred:

> Gradually increasing medial right-knee pain over six months, mainly during stairs and prolonged walking, with brief stiffness after rest. No trauma, fever or true locking. Paracetamol has had limited effect.

Avoid:

> Gradual. Duration months. No trauma. Reduced load. Stairs. Walking. Paracetamol limited effect.

---

# 17. Physiotherapy referral synthesis

The referral should include:

1. reason for referral
2. onset and relevant course
3. trauma mechanism where relevant
4. functional limitation
5. key positive findings
6. relevant negative findings
7. working diagnosis and uncertainty
8. previous treatment and effect
9. imaging status
10. requested assessment or treatment objective

The output must not claim that a test, treatment or imaging result exists unless recorded.

---

# 18. Imaging referral synthesis

The imaging referral should include:

1. requested examination
2. side
3. clinical indication
4. relevant duration and course
5. trauma context
6. key objective findings
7. working diagnosis
8. clinical question
9. expected management consequence
10. prior imaging where known

The exact imaging request must comply with current regional requirements.

---

# 19. Specialist referral synthesis

The specialist referral should include:

- reason for referral
- urgency
- duration and course
- functional impact
- trauma mechanism where relevant
- objective findings
- serious concerns
- investigations
- treatment already attempted
- response to treatment
- working diagnosis and differentials
- specific specialist question

---

# 20. Output status

Preferred technical statuses:

- Missing information
- Draft ready for review

Avoid an unqualified `Ready`.

Every output must visibly state that the clinician must review clinical accuracy, wording, recipient, urgency, local requirements and patient-specific relevance.

---

# 21. Keyboard requirements

The pathway must support:

- `Tab` between clinical groups
- `Shift + Tab` backwards
- arrow keys within choice groups
- `Space` to select
- `Enter` to confirm and continue
- `Escape` to close expanded controls
- keyboard access to Quick and Standard
- keyboard access to grouped confirmations
- keyboard access to suggestions
- keyboard access to outputs
- keyboard access to free text

Potential shortcuts require usability testing and must not interfere with ordinary typing.

---

# 22. Visual requirements

The pathway should:

- show more clinically relevant information per screen
- use smaller section headings than the current prototype
- reduce vertical padding
- reduce unnecessary card boundaries
- integrate controls with the document
- limit equal-weight diagnosis chips
- keep serious attention points visually distinct
- preserve a calm and trustworthy appearance
- support rapid scanning
- reduce scrolling
- allow the output region to remain useful without dominating the workspace

---

# 23. Evidence ownership

Every clinically consequential element must be represented in:

`docs/clinical/pathways/evidence/KNEE-001-Evidence-Register.md`

The register should include:

| Clinical element | Source | Version/date | Geography | Status | Reviewer | Notes |
|---|---|---|---|---|---|---|

Required evidence topics include:

- acute fracture screening
- inability to weight-bear
- swelling timing
- true locking
- extension deficit
- extensor mechanism injury
- septic arthritis
- inflammatory arthritis
- meniscal examination
- ligament examination
- osteoarthritis diagnosis
- therapeutic exercise
- weight management
- analgesia
- standing radiographs
- MRI indications
- physiotherapy referral
- orthopaedic referral
- urgent and subacute referral thresholds
- regional imaging and referral requirements
- safety-net content

A clinical rule without an approved evidence record must not be treated as clinically validated.

---

# 24. Source status notes

At the time of drafting:

- Danish national guidance on meniscal pathology supports a simple clinical test, discourages ultrasound for meniscal investigation, limits MRI to situations where the result changes management, and supports standing radiography when osteoarthritis may explain symptoms
- that Danish meniscal guidance is currently marked as under review and must therefore be versioned carefully
- current osteoarthritis guidance supports clinical diagnosis in typical presentations, therapeutic exercise, relevant weight management and avoidance of routine imaging in uncomplicated cases
- suspected bacterial arthritis requires urgent clinical handling, and absence of fever alone must not be used to exclude it
- regional imaging and referral criteria may vary and must be reviewed before implementation

These statements remain subject to the evidence register and clinical sign-off.

---

# 25. Acceptance criteria

KNEE-001 is ready for implementation planning only when:

- [ ] Clinical Document Workspace v1 is approved
- [ ] the clinical concept model is reviewed
- [ ] Quick and Standard presentations are approved
- [ ] grouped confirmations are clinically reviewed
- [ ] serious attention points are clinically reviewed
- [ ] journal synthesis examples are approved
- [ ] physiotherapy referral synthesis is approved
- [ ] imaging referral synthesis is approved
- [ ] regional requirements are identified
- [ ] the evidence register is complete
- [ ] architecture impact is assessed
- [ ] an RFC is written if shared engine changes are required
- [ ] an isolated prototype has been tested
- [ ] RC-002 scenarios have been repeated on the prototype

---

# 26. Prototype test scenarios

The prototype must be tested against at least:

1. Acute twisting trauma
2. Gradual degenerative knee pain
3. Acute red-hot swollen knee
4. Possible true locking
5. Uncomplicated overuse-related pain
6. Significant trauma with inability to weight-bear
7. Possible extensor mechanism injury
8. Suspected ligament instability
9. Atypical pain with possible hip referral

Measures should include clicks, keystrokes, scrolling, completion time, missing information, compensatory free text, journal edits, referral edits, perceived cognitive load and willingness to use in routine practice.

---

# 27. Non-goals

KNEE-001 does not attempt to:

- replace clinical judgement
- establish a final diagnosis automatically
- provide autonomous triage
- replace emergency assessment
- create a complete orthopaedic examination textbook
- require every named test in every patient
- solve paediatric knee pain
- implement postoperative or prosthetic-knee care
- define medication prescribing without contraindication assessment
- override regional referral requirements
- establish clinical validation through automated tests

---

# 28. Implementation sequence

Recommended pathway-specific slices:

1. Shared knee concept model
2. Quick and Standard presentation metadata
3. Explicit grouped confirmations
4. Revised history
5. Revised objective examination
6. Targeted test groups
7. Assessment prioritisation
8. Plan categories
9. Clinical attention points
10. Journal synthesis
11. Physiotherapy referral synthesis
12. Imaging referral synthesis
13. Keyboard workflow
14. Vitest coverage
15. Playwright coverage
16. Architecture review
17. Clinical review
18. RC-002 retest

No single implementation task should attempt all slices at once.

---

# 29. Review decision

Current state:

- [ ] Approved
- [ ] Approved with observations
- [ ] Changes required
- [x] Proposed for review

No production implementation is authorised by this document alone.

---

# 30. Required next steps

1. Review and revise this document.
2. Create `KNEE-001-Evidence-Register.md`.
3. Resolve the remaining clinical content questions.
4. Assess shared architecture impact.
5. Write an RFC if engine contracts must change.
6. Create an isolated interactive prototype.
7. Test the prototype using the defined scenarios.
8. Approve the implementation plan.
9. Implement in small slices.
10. Repeat RC-002.

---

# 31. Sign-off

**Product owner:**  
**Clinical reviewer:**  
**Architecture reviewer:**  
**Evidence review completed:** No  
**Decision:** Proposed  
**Date:** 2026-07-17  
**Implementation authorised:** No  
**Prototype required:** Yes  
**RC-002 retest required:** Yes
