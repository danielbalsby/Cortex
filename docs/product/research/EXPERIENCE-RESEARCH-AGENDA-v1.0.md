# Cortex Experience Research Agenda v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PEV-001-RA01 |
| Version | 1.0 |
| Status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-21 |
| Ejer | TODO — Product Research owner |
| Parent | [PEV-001](../experience/CORTEX-EXPERIENCE-VISION-v1.0.md) |
| Formål | Prioritere Experience-hypoteser og foreslå validering uden at fremstille agendaen som research evidence. |

## Research controls

- Ingen hypotese er valideret ved at være registreret.
- Population, setting, consent/data governance, metode, limitations og analyseplan skal dokumenteres før execution.
- Clinical usability study eller patientdata kræver særskilt Governance/Safety/QMS-gate.
- Målinger af speed/clicks må aldrig stå alene som clinical usefulness eller cognitive-load evidence.

## Prioriteret agenda

| Assumption ID | Spørgsmål / hypotese | Berørt actor | Konsekvens hvis forkert | Foreslået valideringsmetode | Prioritet | Dependency | Status |
|---|---|---|---|---|---|---|---|
| PA-002 | Hvilke konkrete øjeblikke og arbejdsformer skaber størst unødvendig cognitive load? | Praktiserende læge; evt. staff | North Star optimerer forkert burden eller flytter arbejde. | Contextual inquiry, workflow/burden mapping, structured retrospective og baseline-mål. | P0 | Approved research protocol; workflow access. | OPEN |
| PA-011 | Hvilken information behøver brugeren først for orientation i forskellige contexts? | Praktiserende læge | For lidt giver usikkerhed; for meget giver støj. | Scenario ranking, explain-back og information-priority study. | P0 | Clinical Workflow input; Domain terms. | OPEN |
| PA-005 | Hvornår og hvordan forstås provenance bedst uden konstant metadataeksponering? | Clinician; reviewer | Hidden provenance eller primary-task overload. | Layered-information comprehension study med source/claim scenarios. | P0 | API-009/011; Architecture review. | OPEN |
| PA-003 | Hvordan kommunikeres uncertainty, missing/conflict/degraded proportionalt og roligt? | Clinician; patient where relevant | False certainty, alarm eller inappropriate reliance. | Scenario comprehension, think-aloud og decision-impact review. | P0 | CAP-RSK/ATT semantics; Safety. | OPEN |
| PA-009 | Kan AI/system-output og Human Decision attribueres korrekt uden tungt flow? | Clinician | Automation bias eller bureaucratic friction. | Authority attribution og reject/modify scenario study. | P0 | API-001/010; Architecture review. | OPEN |
| PA-012 | Hvilke interruptions opleves som legitime, og hvornår er silence unsafe? | Clinician | Alarm fatigue eller missed protection. | Incident/scenario sorting, interruption diary og consequence review. | P0 | CAP-ATT; Consultation Impact; Safety. | OPEN |
| PA-013 | Hvordan genoptager brugeren korrekt efter interruption eller degraded processing? | Clinician; staff | Duplicate/lost work, stale decisions eller memory burden. | Resume-from-state scenario study med changed/stale conditions. | P0 | Workflow/state architecture. | OPEN |
| PA-014 | Hvilke nuværende workflows/systemskift skaber mest friction og duplicate work? | Clinician; staff | Product løser antaget problem eller optimerer lokal prototype. | Field/context inquiry og artefact/workaround mapping. | P0 | Access to representative workflows. | OPEN |
| PA-015 | Hvad betyder “pulsen falder” faktisk i oplevelse og observerbar adfærd? | Primary clinician | Emotionel vision bliver tom slogan eller fysiologisk overclaim. | Semi-structured interviews, semantic elicitation og behavioral markers; ingen påstået pulse effect. | P1 | PA-002 baseline. | OPEN |
| PA-016 | Hvilke behov varierer mellem roller, erfaring, praksistype, accessibility needs og settings? | Clinician, staff, patient/reviewer as scoped | One-size experience ekskluderer eller skaber risiko. | Stratified sampling, accessibility review og comparative scenario study. | P0 | Intended purpose; recruitment/data governance. | OPEN |

## Evidence output

Hvert study-output skal linke til assumption-ID og angive actor/population, setting, method, source material, versions, findings, counterevidence, limitations og hvilken Product-beslutning det kan informere. Research evidence må ikke opgraderes til clinical evidence, clinical validation eller release evidence.

