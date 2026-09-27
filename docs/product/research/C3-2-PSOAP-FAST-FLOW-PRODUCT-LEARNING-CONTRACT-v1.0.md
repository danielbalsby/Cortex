# C3.2 PSOAP Fast Flow — Product Learning Contract v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-011 |
| Dokumenttype | Product Learning Contract og Product Decision Record |
| Version | 1.0 |
| Status | **DRAFT — PRODUCT-RECONCILED; READY FOR BOUNDED STEERING BUILD AUTHORIZATION** |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-30 |
| Product owner | TODO — navngiven ejer |
| Founder-reviewer | Daniel Balsby — læge og klinisk founder-reviewer |
| Product-beslutning | Product definerer præcis én afgrænset C3.2 PSOAP Fast Flow-prototype som næste læringseksperiment. C3.1 bevares uændret som comparator. |
| Upstream | [PDR-010](C3-CALM-CLINICAL-WORKFLOW-PRODUCT-LEARNING-CONTRACT-v1.0.md); [API-017](../../architecture/reviews/API-017-C3-ARCHITECTURE-DISPOSITION-v1.0.md); [API-018](../../architecture/reviews/API-018-C32-PSOAP-FAST-FLOW-DISPOSITION-v1.0.md); [C3-PBH-001](../handoffs/C3-PRODUCT-TO-BUILD-HANDOFF-v1.0.md); [C3-FIX-001 v1.1](../handoffs/C3-LEARNING-FIXTURE-PACK-v1.1.md); [C3 Evaluation Baseline v1.0](../../build/C3-CALM-CLINICAL-WORKFLOW-EVALUATION-BASELINE-v1.0.md); direkte founder-evaluering 2026-07-30 |
| Product handoff | [C32-PBH-001](../handoffs/C3-2-PRODUCT-TO-BUILD-HANDOFF-v1.0.md) — Product-released; Steering authority pending |
| Product handoff SHA-256 | `b3d367430a002105739c52029ee14c39e40688296457a7e88da8a79b9583accf` |
| Build-status | Ingen Build-autorisation endnu. Architecture/Clinical Safety er reconciled; kun separat Steering Build authority udestår. |

## 1. Beslutning og evidenskvalifikation

Founder-evalueringen den 2026-07-30 registrerer:

- C3.1 er **visuelt bestået** som en roligere Product-retning;
- C3.1 er **ikke bestået på tidsbesparelse og flow**;
- observeret tid fra tom registrering til dokumentationsvisning er `226,285 sekunder` (`3:46,3`); og
- C3.1 skal bevares som comparator, ikke erstattes eller efterfølgende poleres under samme identitet.

Målingen er direkte intern founder-evidens fra Daniel Balsby i mandatet læge og klinisk founder-reviewer. Skærmoptagelsen og et selvstændigt C3.1-evalueringsdokument blev ikke fundet i repositoryet ved Product-intake. Målingen er derfor retningsgivende og egnet til at definere næste kontrollerede læringsgate, men er ikke ekstern usability evidence, clinical validation, clinical-readiness evidence eller releasegrundlag.

Product beslutter at teste én hypotese:

> En lineær PSOAP-arbejdsprogression med kompakte kontinuerlige sektioner, eksplicitte batchhandlinger og én redigerbar dokumentrepræsentation kan halvere gennemløbstiden i det samme founder-scenario uden at sammenblande blank, kliniske facts, klinikerens vurdering eller dokumentrepræsentation.

PDR-011 autoriserer læringsintention og afgrænset Product-scope. [API-018](../../architecture/reviews/API-018-C32-PSOAP-FAST-FLOW-DISPOSITION-v1.0.md) har efterfølgende disponeret C32-G01–04 som `CONDITIONALLY BUILDABLE AS ONE ISOLATED C3.2 PROTOTYPE`. Product accepterer alle materielle constraints uden scopeudvidelse og har released C32-PBH-001 til Steering. PDR-011 autoriserer fortsat ikke implementation eller Build-start uden separat Steering authority.

## 2. C3.1 comparator og repository-status

### Comparator

| Felt | Fastlåst comparatoridentitet |
|---|---|
| Navn | C3.1 Calm Interaction |
| Route | `/prototype/c3-1-calm-interaction` |
| Repository branch/HEAD ved intake | `prototype/sprint-0` / `01eb5dbf63a791b1e93913d8fb07ff8bf8148814` |
| Persistence | Untracked working-tree state; ikke reproducerbar fra HEAD alene |
| Product-resultat | Visuelt bestået; ikke bestået på tidsbesparelse og flow |
| Observeret baseline | `226,285 sekunder` fra tom registrering til dokumentationsvisning |

| Comparatorartefakt | SHA-256 ved Product-intake |
|---|---|
| `app/prototype/c3-1-calm-interaction/page.tsx` | `9d5a79c8b24ecabd9abf92c303468074d9ea69732819079d944ce8906f9c41f9` |
| `clinical/prototypes/c3-1/projections.ts` | `cd563554f965870496e5abd13efbead154847edfb6abd7a3041fe6e797af310f` |
| `clinical/prototypes/c3-1/projections.test.ts` | `41bb67e53add2d785e267362b670d02f77177219f2a28b1d3238f5dea4408473` |
| `components/prototype/c3-1/C31CalmInteraction.tsx` | `12603bf1e3d57d444af3be1a48677ef1f983b29ab20a4461a451e7dd18a53d42` |
| `components/prototype/c3-1/C31CalmInteraction.module.css` | `e62f27029ca52d7c73bc7101b0add031da8ae61952d107f351eaa0e74066d09f` |
| `e2e/c3-1-calm-interaction.spec.ts` | `391637ee7bcb719b7c47be9970f1072d7f8d2053321440793e93fca2c29be78b` |

Disse hashes identificerer comparatorens aktuelle working-tree state; de gør den ikke committed eller governance-aktiv. Ændring af en comparatorfil invaliderer den fastlåste sammenligning og kræver ny comparatoridentitet.

### C3-upstream

C3 Evaluation Baseline v1.0 dokumenterer C3 som syntetisk, uncommitted og checksum-baseret med C3-FIX-001 v1.1. API-017 tillader én bounded prototype over Sprint 1.1/C2 fact-root med adskilte Assessment-, phrase-, output-, draft-, recovery- og presentation-states. C3.2 må genbruge disse grænser, men må ikke behandle API-017 som godkendelse af nye problemprofil-, cardinality-, Normal-batch- eller ROM-semantikker.

Repositoryet var dirty ved intake med eksisterende modified og untracked Product-, Architecture-, Build- og prototypeartefakter. PDR-011 attesterer eller ændrer ikke dette øvrige arbejde.

## 3. Læringsmål og falsifikation

### Primært læringsmål

Kan samme founder-scenario gennemføres fra tom registrering til synlig, kopiklar PSOAP-dokumentation på højst `113 sekunder`, mens klinisk meaning og eksplicit menneskelig autoritet bevares?

### Sekundære læringsmål

1. Reducerer én lineær `problem → S → O → A → P → kopiér`-progression muse-retur, scroll og retningsskift sammenlignet med C3.1?
2. Kan eksplicit scoped Normal-batch og kompakt ROM øge hastigheden uden at gøre blank til negativ, normal eller ikke relevant?
3. Kan én direkte redigerbar PSOAP-flade gøre Quick/Standard og kopi mere forståeligt uden at gøre dokumentteksten til clinical source of truth?

### Falsifikation og stop

C3.2-hypotesen er falsificeret for denne iteration, hvis mindst ét af følgende forekommer:

- samme founder-scenario tager mere end `113 sekunder`;
- blank eller manglende input registreres som negativt, normalt eller ikke relevant uden eksplicit klinikerhandling;
- en Problemprofil opretter diagnose, Assessment eller clinical fact;
- en Normal-batch skjuler sine field effects, mangler fungerende undo eller overskriver tidligere værdier uden eksplicit disposition;
- Quick/Standard skifter eller dokumentredigering muterer facts, Assessment eller phrase commitments;
- C3.1-comparatoren ændres;
- output indeholder unsupported specificity, clinical recommendation eller handling, som source state ikke understøtter; eller
- klinikeren kan ikke forklare, hvad der er fact, klinikerejet vurdering og redigeret dokumentrepræsentation.

`60–90 sekunder` er en senere aspiration og er ikke acceptance threshold for C3.2.

## 4. Præcist P0-scope

C3.2 omfatter kun følgende Product-adfærd:

### 4.1 PSOAP-progression

- Én synlig progression: **klinikerens problemvalg → S → O → A → P → kopiér**.
- Problemvalget er en klinikerejet workflow-kontekst. Det må kun konfigurere rækkefølge, grupper og tilladte controls.
- Problemvalget må ikke registrere clinical facts, vælge diagnose, oprette Assessment, skjule uncertainty eller generere clinical recommendations.
- Systemet fører fokus frem efter en entydig, eksplicit handling; klinikeren kan altid gå tilbage uden tab eller skjult commit.

### 4.2 Kontinuerlige kompakte S- og O-sektioner

- C3.1's mikro-underfaner i Anamnese og Objektivt fjernes i C3.2.
- S og O vises som kontinuerlige, kompakte grupper på højst 1–2 tekstlinjer pr. gruppe i den fastlåste viewport.
- Progression og fokus fortsætter fremad uden nødvendig musebevægelse tilbage til navigation.
- Ingen sektion må skjule registrerede facts, aktive uncertainty-states eller unresolved recovery.

### 4.3 Direkte valg og cardinality

- Korte sæt vises som direkte valg.
- Et valgt chip kan ved et nyt eksplicit klik fravælges tilbage til blank, hvis den godkendte field-semantik tillader det.
- Multi-select anvendes kun, hvor fieldets kliniske cardinality kræver samtidige værdier.
- `history.provocations` og `objective.palpationFindings` bevarer deres eksisterende multi-select-semantik.
- `objective.inspection` får en bounded C3.2 reducer-/projection-extension til samtidige inspection-fund. Den må ikke implementeres som UI-only last-write-wins eller ændre andre single-select-fields.
- Der er ingen kliniske defaults, implicitte valg eller UI-afledte facts.

### 4.4 Scoped Normal-batch med undo

- En Normal-handling er altid eksplicit, lokalt scoped og navngiver gruppen.
- Før commit viser handlingen præcis de field IDs og negative/normal facts, der registreres.
- Batchen må kun ændre de viste fields og skal bevare provenance for samlet handling.
- Commit skriver kun til blanke fields. Enhver nonblank værdi er en synlig collision og overskrives ikke.
- Undo tilbagefører præcis de værdier, som den pågældende batch oprettede, uden at overskrive senere eksplicitte klinikerændringer.
- Blank forbliver blank, indtil klinikeren aktiverer en synlig Normal-handling.
- Red-flag-gruppen navngives **Red flags**. Dens Normal-handling må kun mappe til `history.fever=no`, `history.systemicIllness=no` og `history.redHotSwollenJoint=no` og skal vise disse tre writes før commit. Handlingen må ikke hævde fravær af andre risici eller klinisk completeness.

### 4.5 Kompakt ROM

- ROM viser den API-018-godkendte prototypehandling **Normal 0–140°** i det syntetiske knæ-learning scope.
- Først efter eksplicit aktivering registreres ekstension `0°` og fleksion `140°`.
- **Abnorm** viser separate inputs for ekstension og fleksion.
- Handlingen må kun mappe til `objective.extensionDegrees=0` og `objective.flexionDegrees=140`. Den må ikke skrive et separat normalitetsfact.
- Eksisterende grader eller `rangeNotAssessable=true` er collisions. Senere field-level edit vinder over batchen, og undo må kun fjerne uændrede batchværdier.
- `0–140°` er ikke en generel klinisk normaldefinition eller productionregel.

### 4.6 Én PSOAP-dokumentflade

- Én pæn dokumentflade viser og tillader direkte redigering af PSOAP som separat representation state.
- C3.1's konkurrerende dokument-`textarea` fjernes.
- Quick og Standard er begge synlige, fungerende projektioner af samme source revision; profilskift muterer ikke source state.
- Manuel dokumentredigering ændrer kun den valgte profils representation draft, bevarer base revision og bliver stale efter relevant sourceændring.
- Kopiér producerer præcis fem blokke med ny linje mellem `P`, `S`, `O`, `A` og sidste `P`.
- Sidste blok må være `P: <plantekst>` og må ikke blive `P: Plan: <plantekst>`.

### 4.7 Instrumentering

C3.2 registrerer for både C3.1-comparator og C3.2:

- total tid efter den fastlåste start-/stopdefinition;
- antal pointerklik;
- scroll-events og samlet scrollretning/-distance;
- retningsskift mellem fremadgående progression og tilbagegående korrektion;
- profilskift, document edits, undo og copy; og
- semantic violations og recovery events.

Instrumentering er research/presentation state og må ikke skabe eller ændre clinical facts.

## 5. Måleprotokol og acceptance

### Versionslåst founder-scenario

`C32-FF-SCENARIO-001@1.0` er fastlåst i [C32-PBH-001 §5](../handoffs/C3-2-PRODUCT-TO-BUILD-HANDOFF-v1.0.md). Det anvender C3-FX-INPUT-KNEE-001@1.0, C3-ASMT-001 og de tre aktive phrase commitments fra C3-FIX-001 v1.1 som identisk target state for C3.1 og C3.2.

- Begge starter med blank clinical state uden preload, fixture-load, defaults eller scriptet dataindsættelse.
- **C3.1 start:** første clinical registration action.
- **C3.2 start:** første eksplicitte problemprofilhandling; profilen må ikke skabe facts.
- **Stop:** Standard PSOAP er synlig, source-current og kopiklar efter sidste nødvendige klinikerhandling.
- Timed scenario bruger fixture-ROM `0°/110°` og ét inspection-fund (`swelling`) for comparatorparitet.
- Inspection multi-select og Normal ROM `0°/140°` verificeres i separate acceptance-cases og må ikke give C3.2 en skjult timed content-fordel.
- Browser, viewport, target facts, Assessment, phrases, outputsemantik og timinginstrument skal være identiske eller funktionelt ækvivalente efter handoffets låseregler.

### Ready-to-evaluate acceptance

| ID | Observerbart kriterium |
|---|---|
| C32-AC01 | Præcis én C3.2-prototype og den hashfastlåste C3.1-comparator kan køres med samme scenario. |
| C32-AC02 | Progressionen følger problem → S → O → A → P → kopiér uden mikro-underfaner i S/O og uden nødvendig muse-retur. |
| C32-AC03 | Direkte valg kan vælges og, hvor godkendt, fravælges eksplicit; multi-select matcher godkendt field cardinality. |
| C32-AC04 | Hver Normal-batch viser eksakt scope, registrerer kun viste facts og kan undo'es uden collateral overwrite. |
| C32-AC05 | Blank, negativ, normal, not-assessed, not-performed og not-assessable forbliver semantisk adskilte. |
| C32-AC06 | ROM Normal registrerer kun de reviewede grader efter eksplicit handling; Abnorm viser separate gradfelter. |
| C32-AC07 | Quick/Standard refererer samme source revision, og profilskift skaber ingen source mutation. |
| C32-AC08 | Manuel PSOAP-redigering ligger kun i representation draft; upstream correction gør relevant draft stale. |
| C32-AC09 | Kopieret tekst har fem P/S/O/A/P-blokke på nye linjer og ingen redundant `Plan:` efter sidste `P:`. |
| C32-AC10 | Tid, klik, scroll, retningsskift, undo og copy kan eksporteres som syntetisk evalueringsspor uden patientdata. |
| C32-AC11 | Founder gennemfører samme scenario på `≤113 sekunder` uden falsifikations- eller stophændelse. |

En teknisk bestået prototype uden `C32-AC11` er **TECHNICALLY PASSED — FAST FLOW NOT DEMONSTRATED**. En enkelt founder-gennemførsel på `≤113 sekunder` er kun intern formativ evidens og dokumenterer ikke ekstern usability, klinisk validitet eller generaliseret tidsbesparelse.

## 6. Authority- og stategrænser

| Informationsart | Ejer/source | C3.2-regel |
|---|---|---|
| Problemprofil | Klinikerens eksplicitte workflowvalg | Konfigurerer kun workflow; er ikke diagnose, Assessment eller fact |
| S/O facts | Eksisterende Sprint 1.1/C2 fact-root og godkendte actions | Må ikke opstå fra visibility, default, document text eller Problemprofil |
| Normal-batch | Eksplicit klinikerhandling med synligt scope | Opretter kun de reviewede facts, som vises før commit |
| Assessment | Klinikerens eksplicitte A-input | Ingen Cortex-diagnose, ranking eller forslag |
| Plan/Follow-up/Safety-net | Klinikerens eksplicitte valg/redigering med provenance | Ingen inference om information, agreement eller udført handling |
| Quick/Standard | Deterministiske projektioner | Samme source revision; ingen source mutation |
| Manuel PSOAP-tekst | Separat representation draft | Må aldrig reverse-parses til facts, Assessment eller plan |
| Instrumentering | Research/presentation state | Måler adfærd; har ingen klinisk betydning |

Human decision authority forbliver eksplicit. Cortex må organisere, vise, projektere og gøre konsekvenser synlige, men må ikke beslutte problem, normalitet, Assessment eller Plan.

## 7. API-018 Product reconciliation

Product accepterer API-018 som den bindende Architecture/Clinical Safety-disposition for C3.2:

| Gate | Product-disposition |
|---|---|
| C32-G01 | **ACCEPTED.** Problemprofil er prototype-local workflow configuration og må ikke skrive facts, Assessment, Plan eller dokumenttekst. Visibility er ikke deletion. |
| C32-G02 | **ACCEPTED.** Cardinality er field-specific. Existing multi-select bevares; inspection kræver bounded reducer-/projection-extension. Ingen UI-only last-write-wins eller generel all-fields multi-select. |
| C32-G03 | **ACCEPTED.** Normal er en preview/commit batch transaction med provenance, collision handling, single-action undo og later field override. Red flags-scope er præcis de tre reviewede negative facts. |
| C32-G04 | **ACCEPTED.** Normal ROM er prototype-local og skriver kun `extensionDegrees=0` og `flexionDegrees=140` efter eksplicit klinikerhandling. Ingen generel normalitetsclaim. |

API-017's øvrige constraints for sole fact-root, separate Assessment/phrase/draft states, pure projections, stale handling, recovery, uncertainty og comparator isolation forbliver bindende. API-018 tillader targeted prototype model work, men ingen canonical modelændring. Scopeudvidelse, nye Normal-facts, andre red-flag-writes eller generic multi-select genåbner Architecture/Clinical Safety-review.

## 8. Explicit out of scope

C3.2 indeholder ikke:

- guideline- eller evidensbaseret beslutningsstøtte;
- diagnostic suggestions, ranking eller automatiseret Assessment;
- behandlingsanbefalinger eller clinical attention;
- henvisninger, fysioterapi-output, ydelser/koder eller billeddiagnostiske anbefalinger;
- EHR-integration, real patient data, persistence, billing eller production release;
- ny canonical fact-, uncertainty-, completeness-, domain-, LEX- eller capabilitymodel;
- nye kliniske facts skabt af Problemprofil, layout, defaults eller dokumenttekst;
- flere C3.2-varianter, C3.1-ændringer eller visuelt redesign uden relation til Fast Flow-læringsmålet; eller
- claims om generaliseret MSK-anvendelse, klinisk validering eller dokumenteret tidsbesparelse.

De udelukkede output- og CDS-spor forbliver særskilte efterfølgere og må ikke efterlade placeholders, skjulte mappings eller konkurrerende flows i C3.2.

## 9. Næste gate og traceability

Den krævede rækkefølge er:

`Founder C3.1-evaluering → PDR-011 → API-018 → Product reconciliation + C32-PBH-001 + C32-FF-SCENARIO-001@1.0 → Steering Build authority → én C3.2 prototype → samme founder-scenario mod C3.1 → Product learning report → Steering disposition`

Architecture/Clinical Safety-review, Product reconciliation og scenario lock er gennemført. Næste gate er separat Steering Build authority for den eksakte handoff- og scenarioversion.

Build er først request-ready, når:

1. C32-G01–04 har navngivne, repository-residente dispositioner — **opfyldt gennem API-018**;
2. det samme founder-scenario og de forventede source/output fixtures er versionslåst — **opfyldt gennem C32-PBH-001**;
3. comparatorhashes er verificeret uændrede — **opfyldt ved Product reconciliation**;
4. Product har reconciled dispositionerne uden scopeudvidelse — **opfyldt i §7**;
5. et minimalt Product-to-Build-handoff navngiver præcis scope- og fixtureversion — **opfyldt gennem C32-PBH-001**; og
6. Steering udsteder separat Build authority med navngiven Build owner — **åben**.

Product anbefaler, at Steering kan udstede Build authority for præcis C32-PBH-001 v1.0 og C32-FF-SCENARIO-001@1.0. Indtil authority-recorden foreligger, er C3.2 **NOT BUILD-AUTHORIZED**. PDR-011 medfører ingen kodeændring, implementation, commit eller push.
