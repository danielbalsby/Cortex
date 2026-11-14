# Vision

This folder contains the foundational documents that define Cortex.

These documents describe **why Cortex exists**, **how it should feel**, **what the first product must achieve**, and **how every consultation should flow**.

They should change very rarely.

Before making major product or architectural decisions, read these documents in order.

---

## Reading Order

1. **MANIFEST.md**

Defines the purpose, philosophy and guiding principles of Cortex.

---

2. **CX-001 – The Perfect Consultation**

Defines the intended consultation experience.

How should it feel to use Cortex?

---

3. **MVP-001 – The First Clinical Product**

Defines the minimum product that is worthy of real clinical use.

---

4. **WF-001 – The Consultation Workflow**

Defines the universal workflow followed by every consultation.

---

## Relationship Between The Documents

```
Manifest
        ↓
Consultation Experience (CX)
        ↓
Minimum Viable Product (MVP)
        ↓
Consultation Workflow (WF)
        ↓
Architecture (RFC)
        ↓
Implementation
```

Every architectural and implementation decision should align with these documents.

If implementation conflicts with the vision, the implementation should change—not the vision.