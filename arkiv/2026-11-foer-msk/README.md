# Cortex

> **Clinical Operating System for General Practice**

Cortex is an intelligent clinical workflow engine designed to reduce cognitive and administrative burden in general practice.

It supports physicians throughout the consultation by guiding clinical workflows, surfacing relevant decision support, and automatically generating high-quality documentation and administrative outputs.

Cortex is **not** an Electronic Health Record (EHR).

It is designed to work alongside existing clinical systems such as XMO, Clinea and other Danish primary care platforms.

---

## Mission

**Let physicians be physicians.**

Cortex protects the physician's attention by reducing cognitive load and administrative work, allowing more time and mental capacity for clinical reasoning and patient care.

---

## Start Here

The project is guided by four foundational documents.

Read them in this order:

1. `docs/vision/MANIFEST.md`
2. `docs/vision/CX-001-The-Perfect-Consultation.md`
3. `docs/vision/MVP-001-The-First-Clinical-Product.md`
4. `docs/vision/WF-001-The-Consultation-Workflow.md`

---

## Repository Structure

```
app/                Next.js application
components/         User interface
clinical/           Clinical pathways and medical knowledge
engine/             Generic workflow engine

docs/
    vision/         Canonical product foundation
    governance/     Engineering and clinical safety constraints
    product/        Requirements and product proposals
    architecture/   Current architecture, RFCs and decisions
    clinical/       Clinical pathway documentation
    design/         UX guidance and wireframes
    archive/        Read-only historical records
```

---

## Current Status

Cortex is under active development.

The current objective is a controlled prototype for supervised evaluation in Danish General Practice. The implemented knee pathway is not clinically validated.

See the current [`product roadmap`](docs/product/ROADMAP.md) and [`knee pathway specification`](docs/clinical/pathways/KNEE-001-Knee-Pain.md).

---

## License

Licensing has not yet been defined.
