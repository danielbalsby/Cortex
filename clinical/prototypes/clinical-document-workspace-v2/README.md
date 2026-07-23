# Clinical Document Workspace — UX Experiment v2

Isoleret prototype til Founder Evaluation. **Ikke** production Cortex.

## Route

`/prototype/clinical-document-workspace-v2`

## Hvad testes?

Fem hypoteser:

1. **Dokument før formular** — kan klinikeren orientere sig via narrativ tekst først?
2. **Cortex Overblik som cockpit** — orientering, prioritering og navigation (klikbare mangler/opmærksomhedspunkter)
3. **Quick som konsultation** — færre synlige beslutninger + tastaturflow (`1`–`5`, pile, Enter, `N`, Esc)
4. **Usikkerhed bevares** — urørt ≠ normal; mangler findes i cockpit uden at fylde UI med “ikke vurderet”-felter
5. **Output som klinisk kommunikation** — plan-journal bruger kliniske sætninger (fx fysioterapi-prosa)

## Hvad er nyt?

- Ny isoleret route og UI (narrative-first sektioner, progressive disclosure)
- Aktivt cockpit med navigation til fokusmål
- Keyboard Quick-path
- Visuel adskillelse: Registreret / Opmærksomhed / Klinikerens vurdering
- Forbedret plan-journaltekst (samme plan-actions, anden prosa)

## Hvad er ikke ændret?

- Production Encounter Engine (`/`)
- Workflow Engine, pathways, canonical clinical types
- Baseline prototype (`/prototype/clinical-document-workspace`) og dens tests
- Fact-model / reducer-semantik (genbrugt uændret)
- Ingen nye kliniske regler, AI, EHR eller persistence

## Semantik

```text
Facts → Derived attention → Clinician assessment → Plan → Documents
```

Presentation selectors må ændres. Fact-betydning må ikke.

## Manuel evaluering

Se Founder Evaluation v3 (Sprint 1.1 vs Workspace baseline vs denne v2) før multi-agent review.
