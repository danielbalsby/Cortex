# C3.2 PSOAP Fast Flow — Steering Build Authority v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | C32-SBA-001 |
| Dokumenttype | Steering Build authority |
| Version | 1.0 |
| Status | **APPROVED FOR BOUNDED BUILD** |
| Dato | 2026-07-30 |
| Decision owner | Cortex — Steering |
| Build owner | **Cortex – Build (repository)** — Codex task `019f667b-589f-72e1-92fd-e4f7868c9b1d` |
| Product decision | [PDR-011](../../product/research/C3-2-PSOAP-FAST-FLOW-PRODUCT-LEARNING-CONTRACT-v1.0.md) |
| Architecture/Clinical Safety disposition | [API-018 v1.0](../../architecture/reviews/API-018-C32-PSOAP-FAST-FLOW-DISPOSITION-v1.0.md) |
| Product-to-Build handoff | [C32-PBH-001 v1.0](../../product/handoffs/C3-2-PRODUCT-TO-BUILD-HANDOFF-v1.0.md), SHA-256 `b3d367430a002105739c52029ee14c39e40688296457a7e88da8a79b9583accf` |
| Locked scenario | `C32-FF-SCENARIO-001@1.0` |
| Locked configurations | `C32-FIELD-CONFIG-KNEE-001@1.0`; `C32-NORMAL-BATCH-KNEE-001@1.0` |
| Clinical reviewer context | Daniel Balsby — læge og klinisk founder-reviewer |
| Clinical/release authority | **Ingen** |

## 1. Steering decision

Steering autoriserer Build til at implementere præcis én isoleret C3.2 PSOAP Fast Flow learning prototype under C32-PBH-001 v1.0.

Autorisationen er en implementationstilladelse til et syntetisk læringseksperiment. Den er ikke en produktbeslutning, klinisk validering, releasegodkendelse eller tilladelse til patientdata eller klinisk brug.

## 2. Autoriseret scope

Build må implementere det P0-scope og de observable acceptance-kriterier, der er fastlåst i C32-PBH-001 §§3–8:

- én ny isoleret C3.2-route uden ændring af C3.1-comparatoren;
- PSOAP-progression med klinikerejet problemvalg og kontinuerlige S/O-sektioner uden mikro-underfaner;
- eksisterende C3 fact-root som eneste primære kliniske sandhedskilde;
- field-specific cardinality samt den bounded inspection reducer/projection-extension, API-018 tillader;
- eksplicit scoped Normal-batches med preview, commit, provenance, collision-handling, single-action undo og senere field override;
- Red flags Normal med præcis de tre godkendte negative facts;
- prototype-lokal Normal ROM-handling, der kun skriver `0°` og `140°` efter eksplicit klinikerhandling;
- én direkte redigerbar PSOAP-repræsentation, profile-specific Quick/Standard, stale/recovery-beskyttelse og Kopiér;
- output i fem linjeblokke `P`, `S`, `O`, `A`, `P` uden redundant `Plan:`; og
- instrumentering af tid, klik, scroll, retningsskift, undo, redigering, copy, recovery og semantic violations.

## 3. Bindende constraints

- C3.1-filer og de seks comparatorhashes i C32-PBH-001 må ikke ændres.
- Ingen parallel clinical fact-state, reverse parsing eller UI-only clinical state.
- Blank må ikke blive negativ, normal, ikke relevant, ikke vurderet, ikke udført eller ikke vurderbar.
- Problemprofilen må kun konfigurere workflow; den må ikke skrive facts, Assessment, Plan eller dokumenttekst.
- Multi-select er field-specific. Inspection må ikke implementeres som last-write-wins eller en generisk all-fields-løsning.
- Batch-collisions må ikke overskrive eksisterende nonblank facts.
- Manual document edits forbliver separat repræsentationsstate og må ikke skrive tilbage til clinical facts.
- Behov for canonical model-, completeness-, uncertainty-, domain-, capability- eller outputændring stopper Build og returneres til Product/Architecture.
- De eksplicitte exclusions i C32-PBH-001 §7 er bindende.

## 4. Verification og learning gate

Build skal:

1. levere målrettede state-, reducer-, projection-, recovery-, keyboard-, copy- og regressions-tests for C32-E01–13;
2. køre relevante eksisterende C3/C3.1-tests, typecheck og production build;
3. dokumentere route, repository state, checksums, scenario/config-versioner, testresultater og kendte begrænsninger;
4. levere prototypen copy-ready til founder-evaluering uden preload eller scripted input; og
5. ikke selv erklære Product- eller clinical success.

Den efterfølgende founder-gate er samme `C32-FF-SCENARIO-001@1.0`:

- baseline: `226,285 sekunder`;
- C3.2-gate: `≤113 sekunder`;
- samme actor, target state, start/stop-definition, Standard-profil og viewport.

Teknisk beståelse uden tidsgaten klassificeres `TECHNICALLY PASSED — FAST FLOW NOT DEMONSTRATED`.

## 5. Stop- og handoff-regler

Build skal stoppe og returnere til Steering/Product/Architecture ved:

- ændring af comparatorhash;
- behov for skjult deletion, semantic collapse eller parallel fact-state;
- scopebehov inden for beslutningsstøtte, henvisning, fysioterapi, ydelser/koder, billeddiagnostiske anbefalinger, EHR eller persistence;
- manglende isolation af multi-select, batch-transaktioner, provenance eller undo; eller
- material regression i C3/C3.1.

Efter teknisk levering følger:

1. Daniel founder evaluation mod det låste scenario;
2. relevant AI-agent-evaluering af clinical safety, workflow, human factors og dokumentation;
3. Research/Product synthesis; og
4. ny Steering-disposition.

## 6. Recorded decision

**APPROVED FOR BOUNDED BUILD**

Build owner `Cortex – Build (repository)` må nu implementere præcis C32-PBH-001 v1.0. Ingen bredere C3.2-, clinical decision support- eller outputudvidelse er autoriseret.
