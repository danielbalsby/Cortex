# PDR-002 — Autoritativt source intake og lifecycle-alignment

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-002 |
| Version | 1.0 |
| Status | DRAFT |
| Dato | 2026-07-21 |
| Arbejdende custodian | Cortex – Product |
| Beslutningsmyndighed | TODO — kompetent Product-/Governance-organ |

## Beslutning

Product anvender de ni direkte læste repositorykilder efter den autoritet og lifecycle, deres indhold og engineering control records faktisk dokumenterer. Engineering-adoption må ikke ligestilles med normativ ratifikation eller activation. Product-arbejdsartefakter anvender den verificerede Governance-status `DRAFT`, indtil korrekt type, owner og godkendende organ er etableret.

## Kontekst

Det tidligere Product-grundlag byggede på et briefingbaseret source summary og en administrativ GI-018-markering. De faktiske kilder er nu tilgængelige. Governance Framework verificerer den kontrollerede statusliste og viser, at `PROPOSED` ikke findes, mens `DRAFT` gør. Adoption Report dokumenterer samtidig, at Constitution og Framework ikke er fuldt aktiverede, og at Specificationens upstream-status er inkonsistent.

## Alternativer

1. Bevare administrativ GI-018-markering efter kildeadgang — afvist, fordi en tilladt lifecycle-status nu er verificeret.
2. Markere Product-artefakter ACTIVE eller RATIFIED — afvist, fordi owner, artefakttype, godkendende organ og upstream-aktivering mangler.
3. Bruge DRAFT med eksplicit authority qualification — valgt.

## Begrundelse

Valget følger Frameworkets lifecycle uden at foregribe ratifikation. Det holder Product-arbejdet genoptageligt og sporbart, samtidig med at normative og readiness-claims forbliver blokerede.

## Konsekvenser

- Nye og eksisterende Product-arbejdsartefakter skal anvende `DRAFT`, når de er til stede og ikke har opnået højere status gennem kompetent godkendelse.
- CPB-001 og Product Issue Register registrerer, at kildeadgang er løst, mens et persistence-issue består, fordi intakefilerne fortsat er untracked.
- GI-018 behandles ikke længere som en repository-verificeret issue-ID. Dets substans — at `PROPOSED` ikke er en tilladt status — er verificeret direkte.
- Upstream-kildernes Product-konsekvenser integreres i CPB-001 uden et konkurrerende canonical source register.
- CPB-001 og Product-registre er nu etableret i repositoryet gennem PDR-004; de er ikke rekonstrueret alene fra samtalehukommelse.

## Risici

- `DRAFT` angiver lifecycle, men løser ikke manglende Product-artefakttype eller approval authority.
- De canonical engineering-filer kan gå tabt eller afvige, hvis working tree ikke gøres persistent gennem repositoryets kontrollerede proces.
- Specificationen kan blive overfortolket, hvis dens `RATIFIED BASELINE`-claim læses uden GI-015.

## Reversibilitet

Reversibel gennem ny PDR og kontrolleret statusændring, når owner, godkendende organ og aktiveringsbeslutning foreligger.

## Upstream-referencer

- [Cortex Product Baseline v1.0](../CORTEX-PRODUCT-BASELINE-v1.0.md)
- [Governance Artifact Register](../../governance/GOVERNANCE-ARTIFACT-REGISTER.md)
- Cortex Governance Framework v1.0, sections 6–8.
- Governance Adoption Report v2.0, GI-010–GI-017.
- Governance Artifact Register.

## Påvirkning på Architecture og Build

Ingen Architecture- eller Build-beslutning ændres. PDR’en viderefører Build Baseline v1.1’s `Not ready`-afgørelse og tillader alene ikke-bindende Product-analyse og discovery.

## Senere validering

- Etabler Product-artefakttype, navngiven owner og godkendende organ.
- Afklar Constitution/Framework activation og Specification GI-015.
- Bekræft repository-persistens for canonical sources.
- Review og godkend CPB-001 gennem en kompetent Product-/Governance-proces; repositoryet er nu den vedvarende Product-kilde.
