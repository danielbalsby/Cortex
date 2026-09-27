# ADR-003 — Traceability Model

**Status:** Proposed

**Date:** 2026-07-21

**Decision owner:** TODO — jf. GI-012

**Approving body:** TODO — jf. GI-011/GI-012

## Context

Governance Framework og Cortex Specification kræver bidirektionel sporbarhed fra norm og problem til arkitektur, kode, test, release, monitoring og læring. Specificationen har requirement- og acceptance-ID’er, men dokument-ID’er, obligatoriske mellemled og et canonical registry mangler.

## Proposed decision

Traceability skal modelleres som versionsbundne relationer mellem identificerede artifacts. Modellen skal kunne:

- følge legitimering opstrøms og realisering/bevis nedstrøms;
- bevare relationstype, scope, version, status og owner;
- finde orphan requirements, brudte eller retired dependencies og affected downstream artifacts;
- bevare alternativer, dissens og normative konflikter; og
- blokere berørt scope efter risk-tier-policy.

Den konkrete datastruktur, storage, build-integration og visualisering er ikke besluttet.

## Normative drivers

- GOV §4–6, pipeline- og referencetabeller.
- SPEC TRC-001–005, CAP-GOV-003, AT-011 og Implementeringsaflevering §30.
- Constitution artikel 2, 5 og 8.
- Architecture Baseline AP-006 og AC-010/011.

## Alternatives requiring review

1. Manuelt vedligeholdte links i dokumenter.
2. Centralt machine-readable registry med dokumentviews.
3. Distribuerede metadata med genereret dependency graph.

Ingen løsning vælges før krav til identity, lifecycle og governance-gates er godkendt.

## Risks and open inputs

- Document-ID-standard mangler, jf. GI-013.
- PP, DP og andre obligatoriske mellemled mangler, jf. GI-014.
- Risk-tier-policy og registry ownership er ikke aktivt operationaliseret.
- Et direkte Constitution-to-code-link må ikke skjule manglende mellemled.

## Acceptance before decision

- Alle artifact- og relationstyper har stabil identitet og version.
- Impact analysis kan identificere berørt downstream-scope.
- Kritiske broken links og orphan requirements kan gate release.
- Historik, dissens og supersession bevares.
- Modellen er testbar uden mundtlig organisationsviden.

## Implementation status

Ingen traceability-teknologi eller enforcement er valgt eller implementeret.
