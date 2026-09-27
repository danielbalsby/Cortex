# Cortex Experience Vision Readiness v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PEVG-001 |
| Version | 1.0 |
| Status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-21 |
| Ejer | TODO — navngiven Product owner |
| Readiness | READY TO DRAFT — NOT READY FOR INTERACTION DESIGN OR PROTOTYPE |
| Basis | CPB-001; PDRC-001; PAIR-001; Product registers; canonical Governance/Specification |

## Gate decision

Cortex Experience Vision v1.0 må nu udarbejdes som et ikke-aktivt `DRAFT`. Det skal definere ønskede oplevelsesegenskaber, observable experience requirements, research questions og evaluation criteria. Det må ikke designe løsningen.

**Gate outcome 2026-07-21:** [PEV-001](CORTEX-EXPERIENCE-VISION-v1.0.md) er oprettet som `DRAFT`. Dette readiness-artefakt bevares som gate-evidens og begrænsning; det er ikke design-, prototype- eller implementation approval.

## Required experience outcomes

Experience Vision skal definere krav til:

1. ro og dokumenterbar reduktion af kognitiv belastning;
2. hurtig orientering i clinical context, system status og relevant næste arbejde;
3. context before controls;
4. progressive disclosure uden tab af provenance, uncertainty, limitation eller authority;
5. tydelig adskillelse mellem information, AI/system-output, recommendation og Human Decision;
6. synlig, proportional og roligt præsenteret uncertainty;
7. provenance ved behov og på det tidspunkt, hvor tillid eller handling afhænger af den;
8. failure experience med synlig status, konsekvens, recovery og eskalation;
9. accessibility og equity på tværs af relevante brugere og settings;
10. oplevet hastighed gennem kontinuitet, forudsigelighed og fravær af unødige stop;
11. minimale afbrydelser med dokumenteret protection function;
12. lav interaktionsfriktion uden implicit acceptance eller tab af klinisk fleksibilitet.

## Explicit design problems

Experience Vision skal behandle disse som åbne designproblemer, ikke som allerede løste principper:

- Hvordan vises provenance uden at skabe visuel støj?
- Hvordan kommunikeres uncertainty uden at skabe unødig alarm eller falsk sikkerhed?
- Hvordan adskilles AI-output fra menneskelig vurdering uden at gøre flowet tungt?
- Hvordan gør Cortex fejl, konflikt og manglende evidens synlige uden blindgyder?
- Hvordan sikres høj informationsværdi med få kontroller og lav kognitiv belastning?
- Hvordan undgår Cortex at føles som et journalsystem eller en generisk chatbot?

## Domain-sensitive experience boundaries

Experience Vision må beskrive, hvad brugeren skal kunne forstå og gøre, men må ikke definere:

- hvornår Retrieved Passage bliver Evidence Item eller Evidence bliver Claim;
- domain ownership eller bounded-contextgrænser;
- endelige LEX-definitioner for Case, Encounter, Consultation, Confidence eller andre åbne termer;
- risk-scoring, confidence-skala, authority transitions eller audit/traceability storage;
- capability-ID'er, services, components eller teknologi.

## Required research and evaluation questions

- Kan brugeren korrekt genkende source, passage, evidence, claim, recommendation og egen beslutning?
- Kan brugeren se material uncertainty og degraded state uden at overreagere eller overse dem?
- Kan brugeren finde provenance, når en vurdering eller handling kræver den, uden konstant metadataeksponering?
- Kan brugeren afvise, korrigere eller fortsætte efter failure uden unsafe workaround?
- Reduceres oplevet og observeret beslutnings-/hukommelsesbyrde uden at information skjules?
- Bevarer brugeren klinisk fleksibilitet og patientkontakt?
- Er oplevelsen anvendelig med keyboard, assistive technology, forskellige erfaringer og realistiske tids-/støjforhold?
- Opleves systemet stabilt og kontinuerligt under normal, langsom og degraded respons?

## Recommended Experience Vision v1.0 scope

1. Experience mandate og anti-goals.
2. Primary experience actors og contexts, tydeligt markeret som documented/hypothesized.
3. Experience principles og tensions.
4. Orientation model på konceptniveau, uden navigation eller layout.
5. Human authority og AI/system-contribution requirements.
6. Uncertainty-, provenance- og evidence-comprehension requirements.
7. Failure, degraded state, recovery og continuity requirements.
8. Attention/interruption og Consultation Impact hypotheses.
9. Accessibility/equity requirements.
10. Perceived performance requirements.
11. Research plan, outcome measures, failure criteria og kill criteria.
12. Dependencies, Architecture handoffs og non-authorisations.

## Prohibited in this delivery

- konkrete skærmbilleder, wireframes eller informationslayout;
- navigation eller konkrete interaktionskontroller;
- komponentbibliotek, farver, visuel identitet eller design tokens;
- prototype eller klinisk evaluation;
- frontend, API, database, cloud, AI-model eller implementationvalg;
- Build-handoff eller valg af CA-002.

## Exit criteria for the Experience Vision draft

Draften er review-ready, når hvert requirement har rationale, classification, observable consequence, research/evaluation method, failure condition og relation til CPB-001/PDRC-001. Review-ready er ikke ratified, design-ready, prototype-ready eller implementation-ready.
