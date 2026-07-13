# Cortex Product Principles

> Every design decision must reduce administrative burden and increase time for patient care.

---

# Purpose

Cortex exists to reduce administrative work in general practice.

It does **not** replace clinical reasoning.

It amplifies it.

---

# Core Principle

A clinician should only document information once.

Everything else is generated from that information.

```
Clinical input
        ↓
 Encounter Engine
        ↓
 Journal
 Referrals
 Imaging
 Patient information
 Follow-up
 Certificates
```

Everything in Cortex starts from this principle.

---

# Product Values

## 1. Workflow before features

Workflow always wins.

A smaller product with excellent workflow is better than a larger product with poor workflow.

---

## 2. One input — many outputs

Clinical information is entered once.

Never ask the clinician to document the same information twice.

---

## 3. Documentation is a by-product

The consultation is primary.

Documentation is secondary.

The consultation generates documentation.

Never design the consultation around the journal.

---

## 4. The clinician decides

Cortex suggests.

The clinician decides.

AI never:

- diagnoses
- orders investigations
- refers patients
- prescribes treatment

without explicit clinician confirmation.

---

## 5. Clinical relevance over completeness

Document what matters.

Avoid documenting normal findings unless clinically relevant.

Signal is more valuable than volume.

---

## 6. Reduce cognitive load

Every screen should reduce mental effort.

Never increase it.

---

## 7. Never interrupt the consultation

No unnecessary dialogs.

No unnecessary confirmations.

No unnecessary navigation.

The consultation should flow naturally.

---

## 8. Live by default

Everything updates continuously.

The clinician should never need to press:

- Generate
- Save
- Refresh

---

## 9. One click per decision

Every additional click requires justification.

If a workflow requires multiple clicks, redesign it.

---

## 10. Calm software

Cortex should feel:

- calm
- predictable
- fast
- trustworthy

Never noisy.

Never overwhelming.

---

# Decision Framework

Before implementing any feature ask:

1. Does this save time?
2. Does it reduce clicks?
3. Does it reduce cognitive load?
4. Does it improve clinical quality?
5. Can it be removed without reducing value?

If the answer to the last question is yes,

the feature should probably not exist.

---

# Success Metric

The success of Cortex is not measured by:

- number of features
- number of AI models
- lines of code

It is measured by one outcome:

> "This saved me time with my patient."

If a feature does not save time,

it should not be built.
