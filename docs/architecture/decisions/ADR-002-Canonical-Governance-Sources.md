# ADR-002 — Canonical Governance Sources

**Status:** Proposed

**Date:** 2026-07-21

**Decision owner:** TODO — jf. GI-012

**Approving body:** TODO — jf. GI-010–GI-012

## Context

Fem governance-deliverables er adopteret som byte-identiske repository-artifacts og registreret i `docs/governance/GOVERNANCE-ARTIFACT-REGISTER.md`. Semantisk overlappende dokumenter findes fortsat. Arkitekturarbejde kræver en reproducerbar metode til at afgøre kilde, version, rang, status og konflikt uden at omskrive de normative dokumenter.

## Proposed decision

Softwarearkitektur skal resolve normative referencer gennem Governance Artifact Register og de registrerede canonical paths. Hash, intern status, hierarchy role og kendte konflikter skal bevares. En dublet eller afledt repository-tekst må ikke overtrumfe den registrerede canonical source.

Denne ADR ændrer ingen governance-kilde og gør ikke en provisional eller conditionally ratified kilde aktiv.

## Normative drivers

- GOV §3, §5–7 og anti-laundering-reglen.
- SPEC normativ protokol §0, CAP-GOV-003, TRC-003/004 og PRO-012.
- Governance Adoption Report v2.0 og Architecture Baseline AP-006/AC-010.

## Alternatives requiring review

1. Resolve direkte fra canonical DOCX paths uden register.
2. Resolve gennem et menneskeligt læsbart register med hash-verifikation.
3. Resolve gennem et senere machine-readable registry med genererede views.

Den endelige beslutning må ikke foregribe GI-013/014.

## Risks and open inputs

- Constitution og Framework har uafklaret aktiveringsstatus.
- Specificationens upstream-status er inkonsistent, jf. GI-015.
- Machine-readable registry og ID-standard mangler.

## Acceptance before decision

- Governance bekræfter canonicality, hierarchy og konfliktadfærd.
- Alle aktive normative links kan resolveres reproducerbart.
- Broken, contested, superseded og retired status har defineret gate-effekt.

## Implementation status

Adoption artifacts eksisterer, men denne arkitekturdecision er ikke accepteret eller implementeret som enforcement.
