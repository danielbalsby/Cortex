Archived: 2026-07-15  
Status: Read-only historical record  
Reason: Superseded by the canonical Cortex vision foundation.  
Replacement: `docs/vision/MANIFEST.md` and `docs/vision/CX-001-The-Perfect-Consultation.md`

---

# Cortex Product Principles

> **Build software that disappears, so clinicians can focus on patients.**

Version 1.0

---

# Purpose

Cortex exists to reduce administrative burden in Danish general practice.

Its purpose is not to replace clinical reasoning.

Its purpose is to remove unnecessary work surrounding clinical reasoning.

Every design decision should increase time spent with patients and decrease time spent on administration.

---

# Vision

The best clinical software is almost invisible.

Clinicians should think about their patients.

Never about Cortex.

---

# Core Principle

Clinical information should only be entered once.

Everything else is generated.

```
Clinical Encounter
        ↓
Structured Clinical Data
        ↓
Encounter Engine
        ↓
──────────────────────────────────────────
Journal
Referrals
Imaging
Patient Information
Certificates
Follow-up
Decision Support
```

Every feature in Cortex builds upon this principle.

---

# Product Values

## 1. Workflow Before Features

Excellent workflow always beats additional functionality.

Never add a feature that makes the consultation more complicated.

---

## 2. One Input → Many Outputs

Clinical information should only be documented once.

Everything else should be generated from the same structured encounter.

Duplicate documentation is considered a product failure.

---

## 3. The Consultation Is the Product

The consultation is primary.

Documentation is secondary.

Documentation should emerge naturally from the consultation.

Never design clinical workflows around documentation.

Always design documentation around clinical workflows.

---

## 4. The Clinician Is Always in Control

Cortex supports clinical reasoning.

It never replaces it.

AI may:

- organise
- summarise
- explain
- suggest
- identify missing information

AI never:

- diagnose
- prescribe
- refer
- order investigations

without explicit clinician confirmation.

Clinical responsibility always belongs to the clinician.

---

## 5. Clinical Relevance Over Completeness

Document what matters.

Avoid documenting information simply because it exists.

Prioritise:

- positive findings
- clinically meaningful negative findings
- diagnostic reasoning

Signal is more valuable than volume.

---

## 6. Simplicity Over Flexibility

Every additional:

- button
- field
- option
- dialog
- setting

adds cognitive load.

Every feature must justify its existence.

When uncertain:

remove complexity.

---

## 7. Calm Software

Cortex should feel:

- calm
- predictable
- fast
- trustworthy

Never:

- noisy
- distracting
- overwhelming

The software should reduce stress.

Never create it.

---

## 8. Live by Default

Everything should update continuously.

The clinician should never need to think about:

- Save
- Generate
- Refresh

Whenever possible, outputs should update automatically.

---

## 9. Reduce Cognitive Load

Every screen should reduce mental effort.

Never increase it.

The interface should always answer one question:

> "What does the clinician need right now?"

Nothing more.

---

## 10. Every Click Has a Cost

Every interaction consumes attention.

Every click should either:

- improve patient safety
- improve workflow
- reduce documentation
- improve clinical quality

Otherwise it probably should not exist.

---

## 11. Decision Support Should Be Supportive

Decision support should be:

- contextual
- evidence-based
- transparent
- dismissible
- non-blocking

Decision support assists.

It never controls.

---

## 12. Build Trust Before Intelligence

Clinicians trust software that is:

- understandable
- predictable
- transparent
- consistent

Trust is more valuable than automation.

Never sacrifice trust for sophistication.

---

# Non-Goals

Cortex is not designed to:

- replace clinical judgement
- maximise feature count
- automate clinical responsibility
- generate documentation for its own sake
- collect unnecessary information
- impress users with AI

Every feature that moves Cortex towards these goals should be rejected.

---

# Product Decision Framework

Before building any feature, ask:

1. Does this reduce administrative work?
2. Does this reduce clicks?
3. Does this reduce cognitive load?
4. Does this improve clinical quality?
5. Does this improve patient care?
6. Can existing information be reused instead of collected again?
7. Would clinicians genuinely miss this feature if it disappeared?

If the answer to the final question is **no**, the feature should probably not be built.

---

# Success Metrics

Cortex is **not** measured by:

- number of features
- amount of AI
- lines of code
- technical sophistication

Cortex is measured by:

- fewer clicks
- less documentation
- lower cognitive load
- faster consultations
- higher clinical quality
- more patient-facing time

---

# Product Philosophy

Technology is not the product.

Artificial intelligence is not the product.

Documentation is not the product.

The consultation is the product.

Everything else exists to support it.

---

# Final Principle

When uncertain, choose the solution that allows clinicians to spend less time using software and more time caring for patients.

If the software disappears into the consultation, Cortex has succeeded.
