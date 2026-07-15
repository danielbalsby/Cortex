# WF-001 – The Consultation Workflow

**Status:** v1.0  
**Owner:** Cortex  
**Type:** Workflow Specification

---

# Purpose

WF-001 defines the universal clinical workflow used by Cortex.

It describes how every consultation progresses, regardless of diagnosis, specialty or clinical pathway.

Disease-specific knowledge belongs in Clinical Pathways.

Technical implementation belongs in RFCs.

WF-001 defines the consultation itself.

---

# Core Principle

The consultation is the product.

Everything Cortex does must improve the consultation.

Documentation, referrals and administrative work are consequences of the consultation—not its purpose.

---

# Design Goals

The workflow must:

- support clinical reasoning
- reduce cognitive load
- adapt continuously
- remain transparent
- remain physician-controlled
- minimise administrative work
- never interrupt patient care unnecessarily

---

# Workflow Overview

Every consultation progresses through the same universal workflow.

```
Understand
      ↓
Explore
      ↓
Evaluate
      ↓
Decide
      ↓
Execute
      ↓
Close
```

The workflow is adaptive.

The physician may move freely between stages whenever clinically appropriate.

---

# Stage 1 — Understand

## Purpose

Understand why the patient is seeking care.

The objective is not to establish a diagnosis.

The objective is to define the clinical problem.

Examples include:

- Knee pain
- Cough
- Hypertension review
- Diabetes follow-up
- Depression
- Medication review

### Outputs

- Consultation reason
- Selected Clinical Pathway

---

# Stage 2 — Explore

## Purpose

Collect relevant clinical information.

The workflow continuously adapts.

Each answer determines what becomes relevant next.

Examples include:

- history
- symptoms
- previous disease
- medication
- risk factors
- patient concerns
- physical examination

The physician should never be presented with unnecessary questions.

---

# Stage 3 — Evaluate

## Purpose

Transform collected information into clinical understanding.

Evaluation includes:

- working hypotheses
- differential diagnoses
- conflicting findings
- missing information
- clinical confidence
- safety assessment

Patient safety is evaluated continuously throughout the consultation.

Evaluation never replaces physician judgement.

---

# Stage 4 — Decide

## Purpose

Reach a clinical decision together with the patient.

Possible decisions include:

- reassurance
- observation
- investigation
- treatment
- referral
- follow-up

Shared decision making should be supported whenever appropriate.

---

# Stage 5 — Execute

## Purpose

Carry out the agreed clinical plan.

Examples include:

- prescribing medication
- requesting investigations
- creating referrals
- providing patient information
- planning follow-up
- issuing certificates

Administrative work should be generated automatically whenever possible.

---

# Stage 6 — Close

## Purpose

Ensure the consultation is complete.

Before completion Cortex should quietly verify whether important information appears to be missing.

Examples include:

- missing documentation
- missing safety-net advice
- incomplete referral
- missing examination findings
- unanswered clinical questions

Completion checks are recommendations.

The physician always decides whether further action is required.

---

# Adaptive Workflow

Consultations are not linear.

Physicians continuously move between exploration, evaluation and decision making.

Example:

```
Explore

↓

Evaluate

↓

Explore

↓

Evaluate

↓

Decide

↓

Explore

↓

Decide
```

Cortex must support this naturally.

The workflow should never behave like a wizard.

---

# Progressive Disclosure

Only information relevant to the current clinical situation should be visible.

Information should appear:

- when it becomes useful
- where it becomes useful
- only for as long as it remains useful

Progressive disclosure is a fundamental design principle.

---

# Physician Control

The physician remains in control at all times.

The physician may:

- ignore suggestions
- revisit earlier decisions
- change the consultation plan
- document exceptions
- override recommendations

Cortex assists.

The physician decides.

---

# Clinical Decision Support

Decision support exists to reduce uncertainty.

It should:

- highlight relevant evidence
- surface appropriate guidelines
- identify red flags
- identify missing information
- explain recommendations

Decision support must never:

- force decisions
- hide uncertainty
- fabricate confidence

---

# Administrative Outputs

Administrative outputs are generated from the consultation.

Examples include:

- clinical journal
- referrals
- certificates
- patient information
- medication plans
- follow-up plans

No information should require duplicate documentation.

---

# Completion

A consultation is complete when:

- the physician is satisfied with the clinical assessment
- the agreed management plan has been documented
- required outputs have been generated
- patient safety has been addressed

Completion is a clinical decision—not a software state.

---

# Workflow Responsibilities

The consultation workflow is responsible for:

- guiding progression
- adapting to new information
- supporting clinical reasoning
- reducing cognitive load
- coordinating consultation outputs

The workflow is not responsible for:

- disease-specific knowledge
- guideline content
- wording of documentation
- user interface design
- implementation details

---

# Workflow Principles

Every consultation in Cortex must follow these principles.

## 1. The consultation is the product.

Improve the consultation before improving the documentation.

---

## 2. Clinical reasoning belongs to the physician.

Cortex supports thinking.

It never replaces it.

---

## 3. The workflow is adaptive.

No consultation should feel predetermined.

---

## 4. Information appears when it becomes useful.

Never earlier.

Never later.

---

## 5. Administrative work is a consequence.

Documentation should emerge naturally from the consultation.

---

## 6. The physician remains in control.

Recommendations may always be ignored.

---

## 7. Patient safety is continuous.

Safety is evaluated throughout the consultation.

Never only at the end.

---

## 8. Simplicity is mandatory.

If a workflow step increases cognitive load without creating meaningful clinical value, it should be redesigned or removed.

---

# Definition of Success

WF-001 is successful when physicians experience consultations that are:

- calmer
- clearer
- more structured
- more clinically focused
- less administratively burdensome

The physician should finish the consultation feeling:

> "I spent my attention on the patient—not on the system."

---

# Final Principle

A physician should never have to learn the Cortex workflow.

It should feel like the way an experienced clinician naturally thinks.