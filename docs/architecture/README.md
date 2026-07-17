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

The generic PSOAP renderer remains in `engine/`. A pathway registers its own journal generator when readiness depends on pathway-specific fields; the knee pathway therefore owns `knee.psoap`.

## Workflow roles

Each pathway declares `workflowRoles` for the field and output identities used by the generic workspace. `primaryOutputId` is required. `assessmentFieldId` and `planActionsFieldId` are optional unless the pathway defines suggestions or plan recommendations that require them. Structural validation checks every configured role before runtime derivation.

## Validated derivation boundary

The active application derives workflow behaviour only through `deriveValidatedWorkflow()`. This boundary validates the pathway against the injected generator registry, validates and clones the complete consultation snapshot, and prunes stale hidden answers to a stable fixed point before calculating visibility, alerts, suggestions, active outputs, draft text or readiness.

Invalid field IDs, answer values or generator references return structured validation issues and produce no derived clinical behaviour. Lower-level pure services remain available for composition and tests, but require already validated and stabilised answers.

`components/encounter/EncounterEngine.tsx` is the single active consultation renderer and consumes only the validated derivation boundary.

## Decision-support boundary

Rule evaluation returns structured matched and unmet condition evidence alongside the configured alert. Assessment suggestions declare their display policy in pathway content; the generic suggestion engine evaluates support counts, required conditions and suppressing conditions without producing diagnostic probability.

## Data flow

```text
ClinicalPathway
      ↓
ConsultationAnswers
      ↓
Mandatory pathway, registry and snapshot validation
      ↓
Stable hidden-answer pruning
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
- [`Clinical document workspace v1`](../design/CLINICAL-DOCUMENT-WORKSPACE-v1.md)
