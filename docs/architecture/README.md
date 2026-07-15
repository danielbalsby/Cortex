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
  Pathway definitions and domain types

engine/
  Consultation state, rule evaluation, suggestions and outputs

encounter/
  Encounter and output contracts

docs/
  Product and architecture documentation
```

## Architectural rule

Disease-specific logic must live in `clinical/`, not inside generic React
components.

## Known prototype exception

`engine/encounter-engine.ts` currently contains knee-specific referral generators and field identifiers. This limits pathway reuse and must be resolved before the architecture can be considered generic across acute and chronic pathways. The active limitation is documented in [`KNEE-001`](../clinical/pathways/KNEE-001-Knee-Pain.md).

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
Journal and referral drafts
```

## Related current documents

- [`Product roadmap`](../product/ROADMAP.md)
- [`UX guidelines`](../design/UX-GUIDELINES.md)
- [`Clinical workspace`](../design/CLINICAL-WORKSPACE.md)
