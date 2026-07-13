# Cortex

> **Clinical Workflow Platform for Danish General Practice**

> *From consultation to documentation — not the other way around.*

---

## What is Cortex?

Cortex is a clinical workflow platform designed to reduce administrative burden in Danish general practice.

Rather than replacing existing Electronic Health Record (EHR) systems, Cortex sits alongside them and helps clinicians conduct structured consultations that automatically generate high-quality clinical documentation.

The consultation is the primary product.

Documentation is a consequence of the consultation—not its purpose.

---

## Mission

Cortex exists to help clinicians spend more time with patients and less time documenting.

Every feature should contribute to one or more of the following outcomes:

- Reduce administrative burden
- Reduce documentation time
- Reduce cognitive load
- Improve clinical quality
- Increase patient-facing time

If a feature does not contribute to these outcomes, it should not be built.

---

## Product Philosophy

Cortex follows a small set of fundamental principles.

- Workflow before features
- One structured consultation → many outputs
- Documentation should happen automatically
- Decision support should assist, never interrupt
- Clinicians remain in control
- Simplicity beats complexity

For more details see:

- `docs/PRODUCT_PRINCIPLES.md`
- `CONSTITUTION.md`

---

# Current MVP

The current development focus is a complete Knee Consultation workflow.

Outputs generated from a single consultation include:

- Structured Journal
- Clinical Review
- X-ray Referral
- Physiotherapy Referral
- Decision Support
- Patient Information

The Knee Consultation serves as the reference implementation for all future workflows.

---

# System Architecture

Every consultation follows the same architecture.

```text
                     Consultation
                           │
                           ▼
                 Structured Clinical Data
                           │
                           ▼
                  Clinical Composer
                           │
                           ▼
                   Encounter Engine
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
     Journal          Referrals       Decision Support
                           │
                           ▼
                  Patient Information
```

The platform remains constant.

Only the clinical workflow changes.

---

# Repository Structure

```text
app/                Next.js application

components/         Reusable UI components

clinical/           Clinical workflows
                    Decision rules
                    Evidence-based pathways

encounter/          Clinical data models

engine/             Encounter Engine
                    Clinical Composer
                    Output generation

data/               Shared phrases
                    Configuration

docs/
    AGENTS.md
    ARCHITECTURE.md
    CLINICAL_PRINCIPLES.md
    PRODUCT_PRINCIPLES.md
    PRODUCT_STRATEGY.md
    ROADMAP.md
```

---

# Technology

Current stack

- Next.js
- React
- TypeScript
- Tailwind CSS

Planned integrations

- FHIR
- Electronic Health Records
- Laboratory Systems
- Imaging Systems
- National Healthcare Infrastructure

---

# Development Workflow

Every feature follows the same lifecycle.

```text
Clinical Problem
        │
        ▼
Workflow Design (RFC)
        │
        ▼
UX Design
        │
        ▼
Implementation
        │
        ▼
Testing
        │
        ▼
Clinical Validation
        │
        ▼
Release
```

No feature skips any stage.

---

# Documentation

| Document | Purpose |
|-----------|---------|
| `CONSTITUTION.md` | Engineering principles and architectural rules |
| `docs/PRODUCT_PRINCIPLES.md` | Product philosophy |
| `docs/CLINICAL_PRINCIPLES.md` | Clinical design principles |
| `docs/ARCHITECTURE.md` | Technical architecture |
| `docs/PRODUCT_STRATEGY.md` | Long-term product strategy |
| `docs/ROADMAP.md` | Development roadmap |
| `docs/AGENTS.md` | Instructions for AI coding agents |

---

# Getting Started

Clone the repository.

```bash
git clone https://github.com/<your-username>/Cortex.git
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Open your browser.

```
http://localhost:3000
```

---

# Guiding Principle

Every workflow should feel like a natural clinical consultation.

The software should disappear into the background.

Clinicians should focus on patients.

Cortex takes care of the documentation.

---

# Long-Term Vision

Cortex is not another Electronic Health Record.

It is a reusable clinical workflow platform.

A clinician performs one structured consultation.

Cortex generates everything else.

One consultation.

One structured clinical model.

Many outputs.

Minimal administration.

Maximum patient care.

---

# Project Status

🚧 Active Development

Current milestone:

**RFC-001 — Clinical Composer**

---

# License

Not yet specified.
