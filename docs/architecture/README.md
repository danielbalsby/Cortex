# Architecture

## Frozen foundation

The following foundation remains stable until the first pilot:

1. Structured clinical pathway data
2. Consultation and encounter engines
3. Rule-based clinical review
4. Output generation from a shared answer state
5. One-screen workflow
6. Sticky consultation cockpit
7. Clinical content separated from generic UI components

## Current layers

```text
app/
  Next.js entry points and global styling

components/
  Generic consultation and encounter UI

clinical/
  Pathway definitions, domain types and pathway-specific output generators

engine/
  Consultation state, rule evaluation, suggestions and generic output orchestration

encounter/
  Encounter and output contracts

docs/
  Product and architecture documentation
```

## Architectural rule

Disease-specific logic must live in `clinical/`, not inside generic React
components.

## Output generation boundary

Output definitions declare an explicit `generatorId`. The generic encounter engine resolves that ID through an injected immutable registry. Generic generators live under `engine/output-generators/`; pathway-specific generators and the configured registry assembly live under `clinical/`.

## Data flow

```text
ClinicalPathway
      ↓
ConsultationAnswers
      ↓
Rule and suggestion engines
      ↓
Encounter output engine
      ↓
Registered generic or pathway-specific generator
      ↓
Journal and referral drafts
```

## Related current documents

- [`Product roadmap`](../product/ROADMAP.md)
- [`UX guidelines`](../design/UX-GUIDELINES.md)
- [`Clinical workspace`](../design/CLINICAL-WORKSPACE.md)
