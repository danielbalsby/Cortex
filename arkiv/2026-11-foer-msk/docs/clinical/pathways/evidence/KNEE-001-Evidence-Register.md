# KNEE-001 – Evidence Register

**Status:** Draft for formal clinical review  
**Owner:** Cortex  
**Pathway:** `docs/clinical/pathways/KNEE-001-Knee-Pain.md`  
**Document type:** Clinical evidence and governance register  
**Population:** Adults presenting with knee pain in Danish general practice  
**Evidence search date:** 2026-07-17  
**Last reviewed:** 2026-07-17  
**Clinical validation status:** Not clinically validated  
**Implementation authorised:** No  
**Next scheduled evidence review:** Before implementation and no later than 2027-01-17  
**Clinical reviewer:** Not assigned  
**Regional scope:** Denmark; regional requirements unresolved  

---

## 1. Purpose

This register links clinically consequential content in `docs/clinical/pathways/KNEE-001-Knee-Pain.md` to identifiable evidence sources, guidance status, implementation constraints and review decisions.

Its purposes are to:

- make the evidentiary basis of the pathway inspectable
- prevent unsupported clinical rules from entering production
- distinguish national guidance from international supplementary guidance
- distinguish high-sensitivity safety rules from diagnostic suggestions
- identify content that depends on regional Danish referral or imaging criteria
- preserve uncertainty where evidence is limited, indirect or under revision
- define what may be implemented, what requires qualification and what remains blocked

This register is a governance artefact. It is not a substitute for clinical review.

---

## 2. Governing rule

A clinically consequential pathway element may be implemented only when:

1. the intended clinical behaviour is stated precisely
2. at least one appropriate source is identified
3. source date, geography and status are recorded
4. applicability to Danish general practice is assessed
5. limitations and exceptions are documented
6. a practising clinician approves the implementation wording
7. regional requirements are resolved where they affect access, urgency or referral content

Passing automated tests does not establish clinical validity.

---

## 3. Status vocabulary

| Status | Meaning |
|---|---|
| **Candidate – supported** | The proposed content is supported by a relevant source and may proceed to clinical wording review. |
| **Candidate – conditional** | The content is broadly supported but requires qualification, contextual constraints or local adaptation. |
| **Blocked – regional verification** | The content depends on current Danish regional rules that have not been verified for all intended users. |
| **Blocked – clinical review** | Evidence exists, but a practising clinician must determine exact pathway wording or thresholds. |
| **Unresolved – evidence gap** | No sufficiently authoritative or directly applicable source has yet been accepted. |
| **Rejected** | The proposed content should not be implemented in its current form. |
| **Approved** | Evidence, wording, regional applicability and clinical review are complete. No item in this draft has this status. |

---

## 4. Evidence hierarchy

Cortex should prefer sources in this order:

1. current Danish law, national recommendations and authoritative Danish clinical guidance
2. current Danish regional referral and imaging guidance
3. current national guidelines from comparable healthcare systems
4. specialty-society clinical practice guidelines
5. systematic reviews and validated clinical decision-rule studies
6. individual diagnostic or therapeutic studies
7. expert consensus, only when stronger evidence is unavailable and the limitation is explicit

International guidance may support clinical design, but it must not silently override Danish or regional practice.

---

## 5. Source register

### Danish and Nordic sources

| ID | Source | Issuer | Version / date | Geography | Current status | Main use in KNEE-001 |
|---|---|---|---|---|---|---|
| **S1** | [NKR: Meniskpatologi i knæet](https://www.sst.dk/udgivelser/2016/NKR-Meniskpatologi-i-knaeet) | Sundhedsstyrelsen | Page published/updated 2025-11-28; guideline originally developed earlier | Denmark | **Recommendations under review** | Simple clinical meniscus test; no ultrasound for meniscal investigation; MRI only when management-relevant; standing radiograph when osteoarthritis may explain symptoms; non-operative/supervised exercise options. |
| **S2** | [Artrit, bakteriel – Lægehåndbogen](https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/oevrige-sygdomme/artrit-bakteriel/) | sundhed.dk / Lægehåndbogen | Updated 2024-01-29 | Denmark | Current page; formal update cycle not stated | Acute monoarthritis, local inflammatory signs, risk factors, fever may be absent, acute hospital referral when suspected. |
| **S3** | [Knæskade – Patienthåndbogen](https://www.sundhed.dk/borger/patienthaandbogen/akutte-sygdomme/foerstehjaelp/ben-led-muskler/knaeskade/) | sundhed.dk / Patienthåndbogen | Updated 2024-09-23 | Denmark | Current patient guidance | General acute warning features: fracture concern, ligament rupture and locked knee require prompt assessment. Not sufficient alone for pathway thresholds. |

### International guidelines and decision rules

| ID | Source | Issuer | Version / date | Geography | Current status | Main use in KNEE-001 |
|---|---|---|---|---|---|---|
| **S4** | [Osteoarthritis in over 16s: diagnosis and management, NG226](https://www.nice.org.uk/guidance/ng226/chapter/recommendations) | NICE | Published 2022-10-19 | England / Wales context | Current; reviewed when new evidence warrants | Clinical OA diagnosis, imaging restraint, information, therapeutic exercise, weight management, topical/oral NSAIDs, referral for joint replacement. |
| **S5** | [Management of Acute Isolated Meniscal Pathology](https://www.aaos.org/quality/quality-programs/acute-isolated-meniscal-pathology/) | AAOS | Published 2024-06-10 | United States | Current specialty guideline | Joint-line tenderness, McMurray and Thessaly as components of acute meniscal examination; imaging and treatment context. Scope excludes chronic/degenerative and concomitant injuries. |
| **S6** | [Validation of the Ottawa Knee Rules](https://pubmed.ncbi.nlm.nih.gov/11574791/) | Prospective multicentre validation study | 2001 | Spain; emergency departments | Historical but foundational validation | High-sensitivity fracture-screening rule after acute knee injury. |
| **S7** | [Validation of the Ottawa knee rule in adults: a single-centre study](https://pmc.ncbi.nlm.nih.gov/articles/PMC7476189/) | Peer-reviewed validation study | 2020 | United Kingdom; emergency department | Supplementary validation | Restates five Ottawa criteria and supports high sensitivity. |
| **S8** | [Suspected cancer: recognition and referral, NG12](https://www.nice.org.uk/guidance/ng12) | NICE | Published 2015; last updated 2026-04-15 | England / Wales context | Current | General cancer-recognition context. Does not validate isolated night pain as a knee-specific cancer rule. |
| **S9** | [ACR Appropriateness Criteria – Acute Trauma to the Knee](https://acsearch.acr.org/list) | American College of Radiology | Current topic listing; exact narrative version must be captured before implementation | United States | Current source family; exact version unresolved | Imaging after acute knee trauma and use of validated decision rules. Requires exact topic/version verification. |

---

## 6. Evidence map

### 6.1 Acute fracture screening

| Field | Decision |
|---|---|
| **Clinical element** | Screen adults with acute knee trauma for fracture risk before deciding on radiography. |
| **Proposed pathway behaviour** | Ask about age, isolated patellar tenderness, fibular-head tenderness, ability to flex to 90°, and ability to take four weight-bearing steps immediately after injury and during assessment when an Ottawa Knee Rule workflow is used. |
| **Primary evidence** | S6 |
| **Supporting evidence** | S7, S9 |
| **Evidence strength** | Validated high-sensitivity clinical decision rule; implementation setting evidence is primarily emergency care. |
| **Geography** | International; not a Danish national rule in the sources accepted here. |
| **Status** | **Candidate – conditional** |
| **Implementation constraint** | The UI must present this as a fracture-screening aid, not as an autonomous diagnosis or radiography order. Eligibility and exclusions must be verified before coding. |
| **Required review** | Confirm intended adult population, acute-injury time window, applicability in Danish general practice, and whether all five Ottawa criteria should be implemented. |
| **Do not implement as** | “No fracture” when the rule is negative. |
| **Reviewer decision** | Pending |

**Ottawa criteria recorded in the accepted validation literature:**

- age 55 years or older
- isolated tenderness of patella
- tenderness at fibular head
- inability to flex knee to 90°
- inability to bear weight for four steps both immediately after injury and at assessment

The rule is designed to help determine the need for radiography after acute trauma. It does not exclude non-fracture serious injury.

---

### 6.2 Inability to weight-bear and four steps

| Field | Decision |
|---|---|
| **Clinical element** | Weight-bearing ability is a high-value functional and fracture-screening item. |
| **Evidence** | S6, S7 |
| **Status** | **Candidate – supported** |
| **Implementation wording** | Distinguish ordinary reduced function from inability to take four weight-bearing steps in the Ottawa context. |
| **Safety note** | Inability to weight-bear may have causes other than fracture and should remain clinically visible even when the complete Ottawa rule is not applicable. |
| **Reviewer decision** | Pending |

---

### 6.3 Swelling and timing

| Field | Decision |
|---|---|
| **Clinical element** | Record absent, immediate, early, delayed, intermittent or persistent swelling. |
| **Rationale** | Timing can help clinical pattern recognition and preserve an accurate trauma chronology. |
| **Accepted direct source** | No sufficiently authoritative source has yet been accepted for a deterministic timing-to-diagnosis rule in Danish general practice. |
| **Status** | **Blocked – clinical review** |
| **Permitted implementation** | Documentation field and chronology synthesis. |
| **Not yet permitted** | A rule that equates rapid swelling with a specific diagnosis or delayed swelling with meniscal injury. |
| **Required evidence work** | Identify a current guideline or high-quality diagnostic synthesis on traumatic haemarthrosis and swelling chronology. |
| **Reviewer decision** | Pending |

---

### 6.4 Audible or felt pop

| Field | Decision |
|---|---|
| **Clinical element** | Record audible or felt pop after relevant trauma. |
| **Evidence basis** | Common component of acute ligament/meniscal history, but no accepted source in this register supports using it alone diagnostically. |
| **Status** | **Candidate – conditional** |
| **Permitted implementation** | History documentation and contextual support for a trauma pathway. |
| **Not permitted** | Automatic diagnosis of ACL or meniscal injury from this finding alone. |
| **Reviewer decision** | Pending |

---

### 6.5 True locking and extension deficit

| Field | Decision |
|---|---|
| **Clinical element** | Distinguish true locking and persistent extension deficit from clicking or transient catching. |
| **Evidence** | S1, S3 |
| **Evidence limitation** | S1 distinguishes locked and non-locked meniscal presentations, but exact Danish urgency thresholds require current regional verification. S3 is patient guidance, not a full clinical referral standard. |
| **Status** | **Blocked – regional verification** |
| **Permitted implementation** | Documentation; clinical attention point; suggestion to consider urgent or subacute assessment. |
| **Not yet permitted** | Hard-coded “subacute within one week” threshold across Denmark. |
| **Required evidence work** | Obtain current referral guidance for every supported Danish region and define “true locked knee” operationally. |
| **Reviewer decision** | Pending |

---

### 6.6 Extensor mechanism injury

| Field | Decision |
|---|---|
| **Clinical element** | Assess active extension / straight-leg raise after relevant trauma or when tendon/patellar injury is suspected. |
| **Clinical intent** | Detect possible quadriceps tendon, patellar tendon or major patellar injury. |
| **Accepted direct source** | No pathway-grade Danish source has yet been accepted in this register. |
| **Status** | **Unresolved – evidence gap** |
| **Permitted implementation** | Record straight-leg raise as a targeted examination finding. |
| **Not yet permitted** | A specific referral urgency rule based solely on this register. |
| **Required evidence work** | Add current emergency/orthopaedic guidance on extensor mechanism disruption and imaging/referral. |
| **Reviewer decision** | Pending |

---

### 6.7 Septic arthritis

| Field | Decision |
|---|---|
| **Clinical element** | Treat suspected bacterial arthritis as an acute hospital problem. |
| **Primary evidence** | S2 |
| **Supported triggers** | Acute monoarthritis with local signs such as swelling, warmth, redness, pain and restricted movement; relevant infection risk factors. |
| **Important limitation** | Fever and chills are common but are not necessarily present. Absence of fever must not reassure the system sufficiently to dismiss infection. |
| **Recommended pathway behaviour** | Display a high-priority clinical attention point and suggest acute referral when clinical suspicion is recorded. |
| **Status** | **Candidate – supported** |
| **Implementation constraint** | Cortex must not calculate away clinical suspicion based on normal temperature or a single normal laboratory result. |
| **Required wording review** | Exact acute transport/referral wording must be adapted to current local organisation. |
| **Reviewer decision** | Pending |

---

### 6.8 Infection risk factors

| Field | Decision |
|---|---|
| **Clinical element** | Record relevant risk factors such as older age, skin infection, destructive joint disease, prosthesis, recent surgery or joint injection, and immunosuppression where clinically relevant. |
| **Evidence** | S2 |
| **Status** | **Candidate – supported** |
| **Implementation constraint** | Risk factors should raise attention but must not be scored as a validated probability model. |
| **Reviewer decision** | Pending |

---

### 6.9 Blood tests in possible infection

| Field | Decision |
|---|---|
| **Clinical element** | CRP and leukocytes may be obtained in general practice, but clinical suspicion still requires acute referral. |
| **Evidence** | S2 |
| **Status** | **Candidate – conditional** |
| **Safety constraint** | Tests must not delay acute referral where bacterial arthritis is suspected, and normal inflammatory markers must not be presented as excluding infection. |
| **Reviewer decision** | Pending |

---

### 6.10 Inflammatory arthritis pattern

| Field | Decision |
|---|---|
| **Clinical element** | Record prolonged morning stiffness, multiple swollen joints, recent infection and systemic features as possible inflammatory context. |
| **Evidence** | S2 supports differential diagnoses around acute arthritis; a dedicated current inflammatory-arthritis source has not yet been accepted. |
| **Status** | **Unresolved – evidence gap** |
| **Permitted implementation** | History documentation and non-specific clinical attention point. |
| **Not yet permitted** | Disease-specific referral thresholds or diagnostic scoring. |
| **Required evidence work** | Add current Danish rheumatology guidance for suspected inflammatory arthritis. |
| **Reviewer decision** | Pending |

---

### 6.11 Malignancy and atypical symptoms

| Field | Decision |
|---|---|
| **Clinical element** | Record progressive unexplained rest/night pain, weight loss, known malignancy or unexplained bony findings as atypical features. |
| **Evidence** | S4 identifies rapid worsening, deformity, hot swollen joint, infection or malignancy concern as atypical in an OA context. S8 provides general cancer-recognition guidance. |
| **Status** | **Candidate – conditional** |
| **Safety constraint** | Isolated night pain must not be treated as a validated knee-cancer rule. The pathway should encourage broader assessment rather than suggest a specific malignancy diagnosis. |
| **Reviewer decision** | Pending |

---

### 6.12 Clinical diagnosis of knee osteoarthritis

| Field | Decision |
|---|---|
| **Clinical element** | Typical osteoarthritis can often be diagnosed clinically without routine imaging. |
| **Primary evidence** | S4 |
| **Supported profile** | Age 45 or older, activity-related joint pain, and no morning stiffness or morning stiffness no longer than 30 minutes. |
| **Status** | **Candidate – supported** |
| **Implementation constraint** | This profile is supportive rather than an exclusive diagnostic definition. Atypical features require reconsideration of alternative or additional diagnoses. |
| **Output wording** | “Clinically consistent with knee osteoarthritis” is preferred to an unqualified definitive diagnosis when uncertainty remains. |
| **Reviewer decision** | Pending |

---

### 6.13 Routine imaging in typical osteoarthritis

| Field | Decision |
|---|---|
| **Clinical element** | Do not routinely use imaging to establish typical osteoarthritis or guide non-surgical management. |
| **Primary evidence** | S4 |
| **Status** | **Candidate – supported** |
| **Exceptions** | Atypical features, alternative diagnosis, trauma, rapid progression, deformity, hot swollen joint, infection/malignancy concern, or imaging required for a specific management decision. |
| **Danish caveat** | Regional orthopaedic referral requirements may require imaging before elective referral. |
| **Reviewer decision** | Pending |

---

### 6.14 Standing weight-bearing radiography

| Field | Decision |
|---|---|
| **Clinical element** | Standing radiography may be relevant when osteoarthritis could explain symptoms in a meniscal presentation or when needed for a specific management/referral decision. |
| **Evidence** | S1; S4 provides restraint on routine imaging. |
| **Status** | **Blocked – regional verification** |
| **Implementation constraint** | Do not make standing radiography a routine default for all suspected knee OA. The indication must be explicit. |
| **Required evidence work** | Verify exact projection requirements and referral indications in every supported Danish region. |
| **Reviewer decision** | Pending |

---

### 6.15 Therapeutic exercise for osteoarthritis

| Field | Decision |
|---|---|
| **Clinical element** | Offer therapeutic exercise tailored to the person; consider supervised exercise. |
| **Primary evidence** | S4 |
| **Status** | **Candidate – supported** |
| **Implementation wording** | Exercise should include relevant local strengthening and/or general aerobic activity and be framed as a core treatment. |
| **Patient-information point** | Initial discomfort may occur; regular adherence improves pain and function over time. |
| **Reviewer decision** | Pending |

---

### 6.16 Patient education and support for osteoarthritis

| Field | Decision |
|---|---|
| **Clinical element** | Provide individualised information about diagnosis, course, self-management and treatment options. |
| **Evidence** | S4 |
| **Status** | **Candidate – supported** |
| **Safety constraint** | “Information provided” may only enter the journal after explicit confirmation. |
| **Reviewer decision** | Pending |

---

### 6.17 Weight management

| Field | Decision |
|---|---|
| **Clinical element** | Discuss and support weight management when the person has overweight or obesity and knee OA. |
| **Evidence** | S4 |
| **Status** | **Candidate – supported** |
| **Implementation constraint** | Must be context-sensitive, respectful and not shown as universally relevant. |
| **Evidence detail** | Any weight loss may help; NICE states that 10% body-weight loss is likely to provide greater benefit than 5%. |
| **Reviewer decision** | Pending |

---

### 6.18 Topical NSAID for knee osteoarthritis

| Field | Decision |
|---|---|
| **Clinical element** | Consider/offer topical NSAID when pharmacological treatment is needed for knee OA. |
| **Evidence** | S4 |
| **Status** | **Candidate – conditional** |
| **Danish caveat** | Exact prescribing language must align with Danish medicines guidance, product information and individual contraindications. |
| **Implementation constraint** | Medication should support non-pharmacological treatment and be used at the lowest effective dose for the shortest appropriate period. |
| **Reviewer decision** | Pending |

---

### 6.19 Oral NSAID

| Field | Decision |
|---|---|
| **Clinical element** | Oral NSAID may be considered if topical treatment is ineffective or unsuitable, after individual risk assessment. |
| **Evidence** | S4 |
| **Status** | **Candidate – conditional** |
| **Required safety concepts** | Gastrointestinal, renal, hepatic and cardiovascular risk; age, pregnancy, current medication and comorbidity; gastroprotection where indicated. |
| **Implementation constraint** | Cortex must not generate “contraindications assessed” unless the relevant assessment is explicitly recorded. |
| **Danish caveat** | Exact medication advice requires Danish pharmacological review. |
| **Reviewer decision** | Pending |

---

### 6.20 Paracetamol

| Field | Decision |
|---|---|
| **Clinical element** | Paracetamol should not be assumed to be a universal standard OA plan. |
| **Evidence** | S4 recommends against routine paracetamol for OA except infrequent short-term use when other pharmacological options are contraindicated, not tolerated or ineffective. |
| **Status** | **Rejected** as an automatically preselected universal OA plan |
| **Permitted implementation** | Available as a clinician-selected option with context-appropriate wording. |
| **Implication for KNEE-001** | The generic plan wording “paracetamol as needed” requires diagnosis-specific and evidence-specific review. |
| **Reviewer decision** | Pending confirmation for Danish practice |

---

### 6.21 Meniscal clinical examination

| Field | Decision |
|---|---|
| **Clinical element** | Use a targeted clinical examination rather than a mandatory full battery. |
| **Evidence** | S1, S5 |
| **Supported components** | Joint-line tenderness and a simple clinical test; AAOS includes McMurray and Thessaly and notes that combined findings may improve diagnostic performance in acute isolated tears. |
| **Status** | **Candidate – supported** |
| **Implementation constraint** | Test result must remain one component of a clinical assessment. A positive or negative test must not automatically establish or exclude a tear. |
| **Scope caveat** | S5 applies to acute isolated meniscal pathology and excludes chronic/degenerative tears and concomitant injuries. |
| **Reviewer decision** | Pending |

---

### 6.22 Ultrasound for suspected meniscal pathology

| Field | Decision |
|---|---|
| **Clinical element** | Do not use ultrasound as the routine investigation for suspected meniscal injury. |
| **Evidence** | S1 |
| **Status** | **Candidate – supported** |
| **Constraint** | Ultrasound may still have a role for selected extra-articular questions; the UI must distinguish these indications. |
| **Reviewer decision** | Pending |

---

### 6.23 MRI for suspected meniscal pathology

| Field | Decision |
|---|---|
| **Clinical element** | MRI should be considered only when its result is expected to affect management, subject to regional access rules. |
| **Evidence** | S1 |
| **Status** | **Blocked – regional verification** |
| **Implementation constraint** | No automatic MRI suggestion solely because meniscal symptoms are present. |
| **Conflict note** | S5 regards MRI as the preferred modality for diagnosing acute isolated tears, but this does not override the more restrictive Danish pathway context or regional access criteria. |
| **Reviewer decision** | Pending |

---

### 6.24 Supervised rehabilitation for meniscal presentations

| Field | Decision |
|---|---|
| **Clinical element** | Non-operative management and supervised training may be appropriate for selected meniscal presentations. |
| **Evidence** | S1 |
| **Status** | **Candidate – conditional** |
| **Constraint** | Locked knee, displaced pathology, acute traumatic context, associated ligament injury and OA context require separate consideration. |
| **Reviewer decision** | Pending |

---

### 6.25 Lachman test

| Field | Decision |
|---|---|
| **Clinical element** | Lachman may be offered as a targeted ACL examination. |
| **Accepted source** | No current pathway-grade guideline source has yet been accepted in this register for exact diagnostic accuracy or primary-care implementation. |
| **Status** | **Blocked – clinical review** |
| **Permitted implementation** | Named examination result: negative, positive, not indicated, not performed or not assessable. |
| **Not permitted** | Automatic ACL diagnosis or exclusion. |
| **Required evidence work** | Add current ACL guideline or systematic diagnostic review. |
| **Reviewer decision** | Pending |

---

### 6.26 Valgus and varus stress testing

| Field | Decision |
|---|---|
| **Clinical element** | Valgus and varus stress may be offered as targeted collateral-ligament examinations. |
| **Accepted source** | No accepted source yet defines the exact angles, interpretation and urgency for this pathway. |
| **Status** | **Blocked – clinical review** |
| **Permitted implementation** | Named test and explicit result states. |
| **Required evidence work** | Add current collateral-ligament guidance and determine whether 0° and 20–30° distinctions belong in the Quick or Standard view. |
| **Reviewer decision** | Pending |

---

### 6.27 Posterior drawer test

| Field | Decision |
|---|---|
| **Clinical element** | Posterior drawer may be offered when PCL injury is clinically plausible. |
| **Accepted source** | Not yet accepted. |
| **Status** | **Unresolved – evidence gap** |
| **Implementation implication** | Keep as optional Standard-mode content only after evidence and clinical review. |
| **Reviewer decision** | Pending |

---

### 6.28 Patellofemoral and patellar examination

| Field | Decision |
|---|---|
| **Clinical element** | Provide targeted patellar examination when history suggests patellofemoral pain or instability. |
| **Accepted source** | Not yet accepted. |
| **Status** | **Unresolved – evidence gap** |
| **Permitted implementation** | Generic documentation of tenderness, apprehension, provocation and instability after clinical content review. |
| **Not permitted** | Automatic diagnosis from a single test. |
| **Reviewer decision** | Pending |

---

### 6.29 Distal neurovascular status

| Field | Decision |
|---|---|
| **Clinical element** | Record distal neurovascular status after major trauma, deformity, dislocation or concerning symptoms. |
| **Evidence basis** | Strong clinical safety rationale, but no accepted pathway-specific source is recorded yet. |
| **Status** | **Blocked – clinical review** |
| **Implementation intent** | Abnormal sensory, motor or perfusion findings should create a high-priority attention point. |
| **Required evidence work** | Add current trauma/dislocation guidance with explicit urgency. |
| **Reviewer decision** | Pending |

---

### 6.30 Referred pain and hip examination

| Field | Decision |
|---|---|
| **Clinical element** | Consider hip or spinal origin when symptoms are atypical or knee findings do not explain the complaint. |
| **Accepted source** | No accepted adult primary-care source yet. |
| **Status** | **Unresolved – evidence gap** |
| **Permitted implementation** | Optional history/examination documentation. |
| **Not permitted** | A rule-based diagnosis without additional evidence. |
| **Reviewer decision** | Pending |

---

### 6.31 Physiotherapy referral

| Field | Decision |
|---|---|
| **Clinical element** | Physiotherapy or supervised exercise may be relevant for OA, selected meniscal presentations, overuse and rehabilitation. |
| **Evidence** | S1, S4 |
| **Status** | **Candidate – conditional** |
| **Implementation constraint** | Referral must state the indication, functional limitation, relevant findings, prior treatment and explicit treatment/assessment objective. |
| **Important distinction** | Evidence supporting therapeutic exercise does not automatically establish that every patient requires a formal physiotherapy referral. |
| **Reviewer decision** | Pending |

---

### 6.32 Elective orthopaedic referral for osteoarthritis

| Field | Decision |
|---|---|
| **Clinical element** | Consider joint-replacement referral when symptoms substantially affect quality of life and non-surgical management is ineffective or unsuitable. |
| **Evidence** | S4 |
| **Status** | **Blocked – regional verification** |
| **Constraint** | Use clinical assessment rather than a numerical severity score alone. Danish regional referral prerequisites must be added. |
| **Reviewer decision** | Pending |

---

### 6.33 Acute and subacute orthopaedic referral thresholds

| Field | Decision |
|---|---|
| **Clinical element** | Define urgency for locked knee, major instability, extensor mechanism injury, fracture concern and other acute pathology. |
| **Evidence** | Partial support from S1 and S3; exact thresholds unresolved. |
| **Status** | **Blocked – regional verification** |
| **Required evidence work** | Current regional referral and visitation guidance for all intended Danish regions. |
| **Implementation prohibition** | Do not hard-code universal Danish deadlines such as “within one week” before verification. |
| **Reviewer decision** | Pending |

---

### 6.34 Safety-net content

| Field | Decision |
|---|---|
| **Clinical element** | Provide context-sensitive advice for deterioration or new safety features. |
| **Evidence basis** | Derived from the serious conditions mapped above, especially S2 and fracture/locking concepts in S3/S6. |
| **Status** | **Blocked – clinical review** |
| **Candidate reasons** | Fever/systemic illness; increasing redness, warmth or swelling; inability to weight-bear; loss of active extension; new true locking; distal neurovascular symptoms; unexpected deterioration or absent improvement. |
| **Implementation constraint** | Do not display every warning in every case. Safety-net must be tailored to the recorded presentation and phrased as one coherent statement. |
| **Reviewer decision** | Pending |

---

### 6.35 Routine follow-up intervals

| Field | Decision |
|---|---|
| **Clinical element** | Suggested intervals such as 1–2 weeks after acute injury or 4–6 weeks after conservative treatment. |
| **Accepted direct evidence** | No accepted source currently supports these as universal thresholds. |
| **Status** | **Unresolved – evidence gap** |
| **Permitted implementation** | Clinician-selected interval and reassessment targets. |
| **Not permitted** | Automatic universal interval presented as evidence-based. |
| **Reviewer decision** | Pending |

---

### 6.36 Ice, compression and elevation

| Field | Decision |
|---|---|
| **Clinical element** | Optional short-term symptom measures after selected acute injuries. |
| **Accepted direct evidence** | Not yet reviewed. |
| **Status** | **Unresolved – evidence gap** |
| **Implementation implication** | Do not place in a universal default plan. May remain optional after clinical review. |
| **Reviewer decision** | Pending |

---

## 7. Cross-cutting implementation decisions

### 7.1 Findings that may be recorded before full evidence approval

A field may sometimes be clinically reasonable to document even when its diagnostic meaning is unresolved.

Examples:

- swelling timing
- audible pop
- Lachman result
- patellar apprehension
- distal sensation

This does not authorise:

- diagnostic scoring
- automatic diagnosis
- automatic referral urgency
- claims of exclusion
- mandatory examination

Field availability and clinical decision rules must therefore be reviewed separately.

### 7.2 Negative findings

A negative finding may appear in output only when:

- explicitly selected by the clinician, or
- included in a clearly defined grouped confirmation that the clinician explicitly applies

The absence of a positive selection is not a negative finding.

### 7.3 “No red flags”

The phrase “no red flags” should not be generated as a global conclusion unless:

- the relevant warning-feature set is defined for the presentation
- each included item has been explicitly confirmed
- the phrase does not conceal unassessed items

Preferred output is often more specific:

> No fever, systemic illness, red-hot joint or true locking reported.

### 7.4 Diagnostic suggestions

Suggestions should be based on transparent recorded findings and should not use unvalidated probability percentages.

A suggestion may be shown when:

- supporting features are present
- critical contradictions are absent or visibly unresolved
- the suggestion is within the validated scope of the rule

Serious diagnoses should appear as attention points rather than ordinary equal-weight diagnosis options.

### 7.5 Output synthesis

Evidence supports clinical behaviours, not staccato wording.

The generator must preserve:

- chronology
- uncertainty
- subjective/objective distinction
- test identity
- whether a test was not performed or not assessable
- indication and clinical question in referrals

---

## 8. Regional evidence work required

The following cannot be considered implementation-ready until current requirements are collected for every region Cortex intends to support:

- acute knee referral destination
- definition and urgency of locked knee
- suspected extensor mechanism injury pathway
- suspected major ligament injury pathway
- acute fracture imaging access
- standing weight-bearing knee radiograph requirements
- required radiographic projections
- MRI access and prerequisites
- orthopaedic referral prerequisites
- physiotherapy referral arrangements
- septic arthritis acute routing and transport wording
- direct-access imaging rules
- required referral fields

### Regional matrix to complete

| Topic | Capital Region | Region Zealand | Region of Southern Denmark | Central Denmark Region | North Denmark Region |
|---|---|---|---|---|---|
| Acute fracture pathway | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |
| Locked knee | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |
| Extensor mechanism injury | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |
| Acute ligament injury | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |
| Weight-bearing knee X-ray | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |
| MRI access | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |
| Elective orthopaedic referral | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |
| Acute septic joint routing | Unresolved | Unresolved | Unresolved | Unresolved | Unresolved |

A single region’s guidance must not be presented as a national Danish rule.

---

## 9. Conflicts and cautions

### 9.1 Meniscal MRI

- S1: MRI only when the result affects further management.
- S5: MRI is the preferred imaging modality for diagnosing acute isolated meniscal tears.

**Cortex decision:** Follow the Danish pathway context and regional access rules. Do not expose “MRI for suspected meniscus” as a routine default. Retain S5 as supplementary diagnostic evidence, not as the governing access rule.

### 9.2 Osteoarthritis radiography

- S1 supports standing radiography when OA may explain symptoms in a meniscal context.
- S4 advises against routine imaging for typical OA diagnosis and non-surgical management.

**Cortex decision:** Imaging must be indication-specific. Typical uncomplicated OA should not automatically produce an X-ray referral. Standing radiography may be appropriate for atypical features, unresolved diagnosis, pre-referral requirements or another management consequence after local verification.

### 9.3 Paracetamol

The draft clinical template previously treated paracetamol as a common default option. S4 advises against routine paracetamol for OA because strong benefit is lacking.

**Cortex decision:** Paracetamol must not be automatically selected as a universal knee-pain plan. Diagnosis-specific Danish pharmacological review is required.

### 9.4 “No fever” and septic arthritis

S2 explicitly states that fever may be absent.

**Cortex decision:** Absence of fever must never suppress an infection attention point when local findings or clinical suspicion remain concerning.

---

## 10. Evidence gaps that block final clinical approval

The following topics remain insufficiently resolved:

1. Current regional acute-knee guidance for all five Danish regions.
2. Exact urgency for true locked knee.
3. Extensor mechanism injury assessment and referral.
4. ACL, PCL, MCL and LCL examination evidence for general-practice use.
5. Patellofemoral and patellar-instability examination.
6. Distal neurovascular assessment and escalation after knee trauma.
7. Current Danish inflammatory-arthritis referral guidance.
8. Adult referred-pain and hip-screening guidance.
9. Universal or diagnosis-specific follow-up intervals.
10. Evidence and wording for acute symptom measures.
11. Danish medication guidance for topical NSAID, oral NSAID and paracetamol.
12. Exact eligibility and exclusions for Ottawa Knee Rule use in Cortex.
13. Regional radiographic projections and referral content.
14. Pathway-specific safety-net validation.

---

## 11. Evidence review checklist

### Source integrity

- [x] Each currently used source has an identifiable issuer.
- [x] Publication or update dates have been recorded where available.
- [x] Danish guidance has been prioritised.
- [x] International guidance has been labelled as supplementary.
- [ ] All regional sources have been identified.
- [ ] Exact ACR acute-knee topic version has been captured.
- [ ] Superseded sources have been formally excluded.

### Clinical mapping

- [x] Osteoarthritis diagnosis and first-line management are mapped.
- [x] Septic arthritis is mapped.
- [x] Meniscal assessment and imaging restraint are mapped.
- [x] Ottawa fracture screening is mapped conditionally.
- [ ] Ligament examination is fully mapped.
- [ ] Extensor mechanism injury is fully mapped.
- [ ] Patellar disorders are fully mapped.
- [ ] Inflammatory arthritis is fully mapped.
- [ ] Regional referral urgency is fully mapped.
- [ ] Safety-net content is clinically approved.

### Governance

- [x] Unsupported rules are labelled unresolved or blocked.
- [x] Conflicting guidance has been documented.
- [x] No item has been marked clinically approved prematurely.
- [ ] Practising GP review completed.
- [ ] Relevant specialist review completed.
- [ ] Regional applicability approved.
- [ ] Implementation wording approved.
- [ ] Review date and owner assigned.

---

## 12. Minimum approval team

Final approval should include:

- one practising specialist in general medicine
- one clinician with relevant orthopaedic or musculoskeletal expertise
- one reviewer responsible for regional referral/imaging applicability
- product owner
- architecture reviewer for rule representation and safety invariants

The same person may hold more than one role only when conflicts of interest and review independence are explicitly accepted.

---

## 13. Change control

Every evidence-backed rule should have a stable identifier in implementation.

Suggested format:

- `KNEE-EV-FRACTURE-001`
- `KNEE-EV-INFECTION-001`
- `KNEE-EV-OA-001`
- `KNEE-EV-MENISCUS-001`
- `KNEE-EV-REFERRAL-001`

When a source changes:

1. mark the affected evidence item for review
2. identify dependent fields, rules, suggestions and generators
3. block release if a safety-critical rule may have changed
4. update this register
5. repeat clinical review
6. add regression tests for the approved behaviour

---

## 14. Monitoring plan

Before each release containing KNEE-001 clinical changes:

- check the status of S1
- check the update date of S2
- check the current version of S4
- check relevant regional referral and imaging guidance
- review changes in medicine guidance
- confirm no source has been withdrawn or superseded

Routine evidence surveillance should occur at least every six months while the pathway is active, and immediately when a relevant authority publishes a material update.

---

## 15. Current decision

- [ ] Approved
- [ ] Approved with observations
- [x] Changes required before implementation
- [ ] Rejected

### Rationale

The register supports several important pathway components:

- clinical diagnosis and core management of typical knee osteoarthritis
- targeted therapeutic exercise and relevant weight management
- restraint in routine OA imaging
- acute handling of suspected bacterial arthritis
- targeted meniscal examination
- management-dependent use of MRI in the Danish meniscal context
- conditional use of a validated fracture-screening rule

However, the pathway is not ready for clinical implementation because major safety and localisation topics remain unresolved, especially:

- regional acute and subacute referral thresholds
- extensor mechanism injury
- ligament examination and escalation
- patellar disorders
- distal neurovascular assessment
- inflammatory arthritis
- medication wording
- context-specific safety-net
- regional imaging requirements

---

## 16. Required next steps

1. Assign named clinical reviewers.
2. Complete the five-region guidance matrix.
3. Add accepted sources for ligament, extensor mechanism, patellar and neurovascular assessment.
4. Add current Danish inflammatory-arthritis guidance.
5. Complete Danish pharmacological review.
6. Decide the exact scope and eligibility of Ottawa Knee Rule implementation.
7. Review every grouped normal/negative confirmation against this register.
8. Convert approved clinical behaviours into stable evidence identifiers.
9. Perform architecture review before encoding rules.
10. Repeat clinical review after the interactive prototype is available.

---

## 17. Sign-off

**Product owner:**  
**General-practice reviewer:**  
**Musculoskeletal / orthopaedic reviewer:**  
**Regional applicability reviewer:**  
**Architecture reviewer:**  
**Decision:** Changes required before implementation  
**Date:** 2026-07-17  
**Next evidence review due:** 2027-01-17 or before implementation, whichever comes first  
**Implementation authorised:** No 
