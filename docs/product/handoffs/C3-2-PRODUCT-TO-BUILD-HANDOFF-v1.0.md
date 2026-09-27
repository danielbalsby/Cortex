# C3.2 PSOAP Fast Flow — Product-to-Build Handoff v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | C32-PBH-001 |
| Dokumenttype | Product-to-Build Handoff |
| Version | 1.0 |
| Status | **PRODUCT-RELEASED — READY FOR BOUNDED STEERING BUILD AUTHORIZATION** |
| Dato | 2026-07-30 |
| Product owner | TODO — navngiven ejer |
| Intended Build owner | TODO — skal navngives af Steering |
| Product decision | [PDR-011](../research/C3-2-PSOAP-FAST-FLOW-PRODUCT-LEARNING-CONTRACT-v1.0.md) |
| Architecture/Clinical Safety disposition | [API-018 v1.0](../../architecture/reviews/API-018-C32-PSOAP-FAST-FLOW-DISPOSITION-v1.0.md) — `CONDITIONALLY BUILDABLE AS ONE ISOLATED C3.2 PROTOTYPE` |
| Upstream Architecture | [API-017 v1.0](../../architecture/reviews/API-017-C3-ARCHITECTURE-DISPOSITION-v1.0.md) |
| Clinical fixture | [C3-FIX-001 v1.1](C3-LEARNING-FIXTURE-PACK-v1.1.md); SHA-256 `d367710b3ed6decb44e7cdd9e8a2551e423aec05e7590751ba9de69317926ef9` |
| Locked scenario | `C32-FF-SCENARIO-001@1.0` — §5 |
| Field/batch configuration | `C32-FIELD-CONFIG-KNEE-001@1.0`; `C32-NORMAL-BATCH-KNEE-001@1.0` |
| Steering Build authority | **OPEN — not supplied** |
| Data/use boundary | Synthetic learning prototype only; ingen patientdata, klinisk brug, validering eller releaseclaim |

## 1. Product release decision

Product accepterer API-018's materielle constraints og releaser præcis ét C3.2 PSOAP Fast Flow-scope til Steering-beslutning.

Handoffet beskriver Product-adfærd, content intent, locked evaluation scenario og observable acceptance. Det vælger ikke implementationsteknologi og giver ikke Build authority. Build må først starte, når Steering har udstedt et separat repository-resident authority record, der navngiver C32-PBH-001 v1.0, PDR-011, API-018, `C32-FF-SCENARIO-001@1.0` og en Build owner.

## 2. Product objective

> Byg én isoleret C3.2-prototype, der tester, om en lineær PSOAP Fast Flow-progression kan reducere founderens gennemløbstid fra den observerede baseline `226,285 sekunder` til `≤113 sekunder`, uden at svække clinical meaning, uncertainty, provenance eller eksplicit menneskelig beslutningsmyndighed.

C3.1 forbliver comparator. Tidsresultatet er intern formativ Product-evidens og må ikke fortolkes som clinical validation, generaliseret usability eller dokumenteret tidsbesparelse i klinisk drift.

## 3. Præcist P0 Build-scope

Build må implementere præcis følgende:

1. **Én ny isoleret C3.2-route og artefaktfamilie.** C3.1 og tidligere comparatorer ændres ikke.
2. **Eksisterende C3 fact-root som eneste primære clinical fact-root.** C3.2 komponerer Sprint 1.1/C3 History/Objective og må ikke skabe parallel document- eller UI-fact-state.
3. **Prototype-local workflow configuration.** Ét klinikerejet problemvalg konfigurerer rækkefølge, labels, visible groups og controls; det skriver ingen facts, Assessment, Plan eller dokumenttekst.
4. **Lineær Fast Flow-progression.** Problemvalg → S → O → A → P → kopiér, med automatisk, synlig fokusprogression og mulighed for tabsfri tilbagegående korrektion.
5. **Kontinuerlige S/O-sektioner.** Ingen mikro-underfaner; kompakte grupper på højst 1–2 linjer ved den låste viewport.
6. **Field-specific direct controls.** Single-select kan efter godkendt clear-handling returnere til blank. Existing provocation/palpation multi-select bevares. Ingen generel all-fields multi-select.
7. **Bounded inspection-extension.** C3.2 kan repræsentere samtidige `swelling`, `redness` og `deformity` inspection-fund gennem en reducer-/projection-/completeness-testet C3.2-extension. `no-specific-findings` og `not-assessed` er separate, gensidigt eksklusive statusværdier. Ingen UI-only last-write-wins.
8. **Scoped Normal-batches.** Preview, explicit commit, per-field provenance, collision handling, single-action undo og later field override implementeres som reducer-/adaptersemantik.
9. **Red flags Normal.** Eneste batchwrites er `history.fever=no`, `history.systemicIllness=no` og `history.redHotSwollenJoint=no`.
10. **Normal ROM 0–140°.** Eneste writes er `objective.extensionDegrees=0` og `objective.flexionDegrees=140` efter explicit commit. Abnorm viser separate gradfelter.
11. **Én PSOAP-dokumentflade.** Direkte redigering ligger i separat profile-specific representation draft; ingen konkurrerende textarea eller reverse parsing.
12. **Quick/Standard.** Begge er synlige, deterministiske projektioner af samme source revision. Switching muterer ikke source.
13. **Kopiér.** Output har fem blokke på nye linjer: `P`, `S`, `O`, `A`, `P`; sidste linje må ikke indeholde redundant `Plan:`.
14. **Instrumentering.** Tid, pointerklik, scroll, retningsskift, profile switches, undo, document edits, copy, recovery og semantic violations registreres som synthetic research/presentation state.

## 4. Binding configuration

### C32-FIELD-CONFIG-KNEE-001@1.0

| Felt/type | Binding |
|---|---|
| Existing single-select | Bevarer API-018 §4.1 cardinality; explicit clear sætter kun det konkrete field til blank |
| Existing text | Én værdi; tom commit bliver blank |
| `history.provocations` | Existing additive/removing multi-select |
| `objective.palpationFindings` | Existing additive/removing multi-select med eksisterende statusrelation |
| C3.2 inspection findings | Multi-select: `swelling`, `redness`, `deformity` |
| C3.2 inspection status | Single: `no-specific-findings` eller `not-assessed`; kan ikke være aktiv samtidig med findings |
| ROM | To degree facts; compact control ændrer ikke cardinality |
| Alle øvrige fields | Ingen cardinalityændring |

Blank er fravær af assertion. Clear må aldrig omsættes til `no`, normal, `none`, `not-assessed`, `not-performed`, `not-assessable` eller `not relevant`. Inspection-extensionen skal have navngivne reducer-actions, explicit projection og completeness-effekt og må kun eksistere som en bounded del af den komponerede C3.2 fact-state.

### C32-NORMAL-BATCH-KNEE-001@1.0

| Batch-ID | Synlig preview og eneste tilladte writes |
|---|---|
| `C32-BATCH-REDFLAGS-NORMAL-001` | `history.fever: blank→no`; `history.systemicIllness: blank→no`; `history.redHotSwollenJoint: blank→no` |
| `C32-BATCH-ROM-NORMAL-001` | `objective.extensionDegrees: blank→0`; `objective.flexionDegrees: blank→140` |

For begge batches:

- nonblank values er collisions og overskrives ikke;
- preview viser current value, proposed value og collisions før commit;
- provenance knyttes til batch ID, config version og source revision;
- undo clear'er kun uændrede values skrevet af samme batch;
- senere explicit field edit vinder og må ikke overskrives af undo; og
- batchen må ikke hævde completeness, diagnose, risk level eller generel normalitet.

## 5. C32-FF-SCENARIO-001@1.0 — locked founder comparison

### Identity og lock

| Felt | Locked value |
|---|---|
| Scenario-ID | `C32-FF-SCENARIO-001` |
| Version | `1.0` |
| Actor | Daniel Balsby — læge og klinisk founder-reviewer |
| Comparator | C3.1 Calm Interaction, checksum-set nedenfor |
| Intervention | Én C3.2 PSOAP Fast Flow-prototype |
| Clinical target | `C3-FX-INPUT-KNEE-001@1.0`, `C3-ASMT-001`, `C3-PLAN-001`, `C3-FU-001`, `C3-SN-001` fra C3-FIX-001 v1.1 |
| Start state | Blank clinical state; ingen problemprofil, facts, Assessment, phrases eller manual draft |
| Timed output profile | Standard |
| Browser/viewport | Chromium Desktop; `1440×900`; browser zoom `100%` |
| Existing baseline | `226,285 sekunder` (`3:46,3`) — direkte founder-evidens |
| C3.2 gate | `≤113 sekunder` |
| Later aspiration | `60–90 sekunder`; ikke C3.2 acceptance |

Ændring af target state, actor task, start/stop, viewport, comparatorhash, output profile eller assistance kræver `C32-FF-SCENARIO-001@1.1` eller senere og en ny Product impact review.

### Timed task

1. Start fra blank workspace uden preload, fixture-load, defaults, pasted source data eller scripted input.
2. C3.1 starter ved første clinical registration action. C3.2 starter ved første explicit problemprofilhandling.
3. Registrér manuelt alle History/Objective target facts fra `C3-FX-INPUT-KNEE-001@1.0`.
4. Opret den klinikerejede Assessment `C3-ASMT-001` gennem explicit clinician action.
5. Vælg `C3-PLAN-001`, `C3-FU-001` og `C3-SN-001` gennem explicit clinician actions.
6. Vis Standard PSOAP fra den aktuelle source revision.
7. Stop tiden, når dokumentet er synligt, source-current og copy-ready.

Timed scenario bevarer fixture-ROM `0°/110°` og ét inspection-fund (`swelling`) for comparatorparitet. Red flags Normal må anvendes, fordi dens tre negative facts matcher target state. Normal ROM og simultaneous inspection multi-select må ikke anvendes i den timed run; de verificeres særskilt i C32-E05/E06.

### C3.1 checksum lock

| Comparatorartefakt | SHA-256 |
|---|---|
| `app/prototype/c3-1-calm-interaction/page.tsx` | `9d5a79c8b24ecabd9abf92c303468074d9ea69732819079d944ce8906f9c41f9` |
| `clinical/prototypes/c3-1/projections.ts` | `cd563554f965870496e5abd13efbead154847edfb6abd7a3041fe6e797af310f` |
| `clinical/prototypes/c3-1/projections.test.ts` | `41bb67e53add2d785e267362b670d02f77177219f2a28b1d3238f5dea4408473` |
| `components/prototype/c3-1/C31CalmInteraction.tsx` | `12603bf1e3d57d444af3be1a48677ef1f983b29ab20a4461a451e7dd18a53d42` |
| `components/prototype/c3-1/C31CalmInteraction.module.css` | `e62f27029ca52d7c73bc7101b0add031da8ae61952d107f351eaa0e74066d09f` |
| `e2e/c3-1-calm-interaction.spec.ts` | `391637ee7bcb719b7c47be9970f1072d7f8d2053321440793e93fca2c29be78b` |

Comparatorfilerne er untracked working-tree artifacts på base `01eb5dbf63a791b1e93913d8fb07ff8bf8148814`. Hashlåsen gør dem identificerbare, ikke committed eller governance-active. Enhver checksumændring stopper sammenligningen.

## 6. Acceptance og evaluation

| ID | Required observable result | Stop/fail |
|---|---|---|
| C32-E01 | Præcis én isoleret C3.2-route; C3.1 hashes er uændrede | Comparatorændring eller parallel C3.2-variant |
| C32-E02 | Problemprofil ændrer kun workflow configuration/trace; profilskift bevarer facts også uden for current visibility | Fact/Assessment/Plan/document write, prune eller hidden deletion |
| C32-E03 | Field-specific select/clear/multi-select matcher C32-FIELD-CONFIG-KNEE-001@1.0 | UI-only last-write-wins, all-fields multi-select eller clear→nonblank |
| C32-E04 | Red flags preview viser præcis tre writes; commit, collisions, provenance, undo og later override følger config | Ekstra fact, overwrite, false completeness eller destructive undo |
| C32-E05 | Inspection kan bevare `swelling` + `redness` samtidigt og projektere begge; clear af ét bevarer det andet; status/fund collision er synlig | Tabt finding, hidden overwrite eller ambiguous completeness |
| C32-E06 | Normal ROM skriver kun `0`/`140`; Abnorm viser separate fields; collision/undo/later override består | Separat normal fact, overwrite eller general normality wording |
| C32-E07 | Blank, negative, not-assessed, not-performed og not-assessable forbliver adskilte gennem state, completeness og output | Semantic collapse eller false reassurance |
| C32-E08 | S/O er kontinuerlige uden mikro-underfaner; fokus kan gå frem og tilbage uden mouse-return, hidden commit eller lost place | Navigation loop, focus loss eller data loss |
| C32-E09 | Quick/Standard bruger samme source revision; manual drafts er profile-specific og bliver stale ved relevant sourceændring | Source mutation, shared override, reverse parsing eller current-looking stale draft |
| C32-E10 | Copy har fem P/S/O/A/P-blokke på nye linjer og ingen `P: Plan:` | Manglende block, unsupported content eller redundant label |
| C32-E11 | Instrumentering registrerer tid, clicks, scroll, direction changes, undo, edits, copy og violations uden clinical-state-effekt | Manglende måling, patientdata eller fact mutation |
| C32-E12 | Founder gennemfører C32-FF-SCENARIO-001@1.0 på `≤113 sekunder` uden semantic stop/fail | `>113 sekunder` eller enhver material semantic violation |
| C32-E13 | Existing C3/C3.1 state/projection tests og relevante regressions består | Regression eller ændret sole fact-root |

Teknisk beståelse uden C32-E12 klassificeres `TECHNICALLY PASSED — FAST FLOW NOT DEMONSTRATED`. C32-E12 alene er ikke clinical validation eller generaliseret Product success.

## 7. Explicit exclusions

C3.2 må ikke indeholde:

- guideline-/evidensbaseret beslutningsstøtte, diagnostic suggestions, ranking eller automatiseret Assessment;
- behandlings- eller billeddiagnostiske anbefalinger;
- henvisninger, fysioterapi-output, ydelser/koder eller output-placeholders til disse;
- EHR, persistence, billing, real patient data eller production integration;
- nye canonical fact-, completeness-, uncertainty-, domain-, pathway-, capability- eller outputkontrakter;
- Problemprofil som diagnose/fact eller source for PSOAP;
- generel all-fields multi-select eller inspection som UI-only state;
- bredere Red flags Normal end de tre reviewede fields;
- Normal ROM som generel normalitetsdefinition;
- reverse parsing fra document draft;
- mere end én C3.2-prototype; eller
- ændring af C3.1 eller andre comparatorer.

## 8. Build constraints og evidence package

Build skal:

- anvende reducer-/adapter-level semantics for inspection, batch, collisions, provenance og undo;
- holde workflow, field configuration, batch transactions, representation drafts og instrumentation i navngivne bounded partitions omkring den eksisterende C3 fact-root;
- bevare recovery og field-specific uncertainty fra API-017;
- levere tests for alle C32-E01–13;
- registrere route, base/HEAD, working-tree/commit identity, checksums, scenario/config versions og testresultater;
- dokumentere enhver deviation uden lokalt at ændre Product scope; og
- stoppe og returnere til Product/Architecture ved behov for canonical eller clinical scopeudvidelse.

Passing tests er verification evidence for dette syntetiske handoff, ikke clinical evidence.

## 9. Product recommendation og remaining authority

Product-, Architecture/Clinical Safety-, comparator- og scenarioforudsætningerne er opfyldt for at anmode om Steering Build authority.

**Product anbefaler, at Steering kan udstede Build authority for præcis én C3.2-prototype under C32-PBH-001 v1.0 og C32-FF-SCENARIO-001@1.0.**

Den eneste resterende præ-Build-betingelse er Steering authority med navngiven Build owner og eksakt reference til PDR-011, API-018, dette handoff, scenarioet og configuration-versionerne. Indtil da må Build ikke starte.
