# ADR-001 — Repository Structure

**Status:** Proposed

**Date:** 2026-07-21

**Decision owner:** TODO — jf. GI-012

**Approving body:** TODO — jf. GI-011/GI-012

## Context

Cortex Governance Framework kræver entydig dokumentidentitet, canonicality, lifecycle-status, bidirektionelle normative links og historik. Cortex Specification kræver en ubrudt kæde fra norm til arkitektur, implementation, test, release og monitoring. Repositoryet indeholder allerede disse artefakttyper, men deres samlede canonical struktur er ikke governance-godkendt.

## Proposed decision

Repositoryet skal have entydige canonical placeringer og ejerskabsgrænser for:

- governance og assurance;
- specifications;
- architecture og ADR’er;
- implementation;
- verification og release evidence; og
- archived eller superseded records.

Den konkrete mappe- og registry-model besluttes først efter inventory, linkanalyse og governance review. Denne ADR implementerer ingen flytning.

## Normative drivers

- GOV §5–7, metadata- og lifecycle-tabeller samt §15.
- SPEC TRC-001–005, NFR-MNT-001 og Implementeringsaflevering §30.
- Cortex Software Architecture Baseline AP-006, AP-009 og AC-010/011.

## Alternatives requiring review

1. Bevare den nuværende struktur og kun tilføje et canonical registry.
2. Reorganisere efter governance-lag.
3. Reorganisere efter produkt-/use-case scope med et tværgående registry.

Mindst ét enklere alternativ skal indgå i den endelige beslutning. Ingen præference fastlægges her.

## Risks and open inputs

- Godkendt document-ID-standard og navngivne ejere mangler, jf. GI-012/013.
- Obligatoriske PP/DP/CSC/EP/RD/ILR-placeringer er ikke operationaliseret, jf. GI-014.
- Flytninger kan bryde aktive links eller historisk sporbarhed.

## Acceptance before decision

- Komplet artifact- og linkinventory.
- Beskrevet migration og rollback.
- Ingen tvetydig canonical source.
- Review fra governance, architecture, verification og clinical safety.

## Implementation status

Ingen beslutning er accepteret eller implementeret.
