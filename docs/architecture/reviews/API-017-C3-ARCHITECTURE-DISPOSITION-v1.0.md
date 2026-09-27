# API-017 — C3 Calm Clinical Workflow Architecture Disposition v1.0

## Document control

| Felt | Værdi |
|---|---|
| Interface-ID | API-017 |
| Dokumenttype | Afgrænset Architecture state-reconciliation og boundary disposition |
| Version | 1.0 |
| Dato | 2026-07-30 |
| Architecture-ejer | Chief Software Architect |
| Administrativ status | Non-active working artifact pending GI-018 resolution |
| Architecture-klassifikation | **MATERIAL CONSTRAINTS** |
| Steering-facing disposition | **BUILDABLE AS BOUNDED C3** |
| Build-authoritet | Ingen. Separat Steering-authority og Product-to-Build-handoff kræves. |
| Canonical effekt | Ingen canonical production-model-, capability-, LEX-, governance- eller outputkontraktændring |

## 1. Scope og kilder

Denne disposition løser API-017 for præcis én syntetisk C3 learning prototype. Den vælger ikke UI, klinisk indhold eller produktionsteknologi og implementerer ikke C3.

Vurderingen er baseret på:

- `PDR-010` — C3 Calm Clinical Workflow Product Learning Contract v1.0;
- `SPRINT-1.2-P03-RE-001` — Founder Evaluation P03;
- den checksum-låste C2.2 Evaluation Baseline;
- Sprint 1.1/C2 state, reducer, fixture, completeness-derivation og journalgenerator;
- Clinical Document Workspace v2 specification, model, reducer, selectors og relevante Assessment-, Plan- og referral-komponenter;
- Engineering Constitution, Clinical Safety Principles, RFC-005, Domain Architecture, Software Architecture Baseline og Governance & Traceability Architecture.

C0–C2.2 er låste comparatorer og er ikke ændringsmål.

## 2. Disposition

**C3 er BUILDABLE AS BOUNDED C3 med de materielle constraints i dette dokument.**

En prototype-lokal komposition og adapter er tilstrækkelig. C3 kræver ikke en canonical ændring, hvis Build:

1. genbruger Sprint 1.1/C2 som eneste fact-model;
2. tilføjer Assessment, phrase commitments, output intent og draft metadata som semantisk adskilte prototype-records;
3. anvender rene, deterministiske projektioner;
4. holder presentation-, navigation-, focus- og recovery-state uden for clinical facts; og
5. isolerer output- og CDS-spor fuldstændigt.

Hvis C3 i stedet kræver ændring af canonical state semantics, Encounter Engine-kontrakt, capability ownership eller production output contracts, er denne disposition ugyldig, og Build er blokeret indtil særskilt Architecture-beslutning.

## 3. Én prototype source of truth

### 3.1 Autoritativ fact-root

For C3 er de eksisterende Sprint 1.1/C2-typer og reducer-semantikker for:

- `SprintOneOneHistory`; og
- `SprintOneOneObjective`

den autoritative source of truth for registrerede kliniske facts.

C3 må ikke instantiere `ClinicalDocumentPrototypeState` eller `workspaceReducer` som en parallel fact-state. Der må heller ikke oprettes et nyt generisk fact-map eller kopieres facts ind i en separat document-state.

Den eksisterende Sprint 1.1-model er valgt, fordi den:

- er source for C2/C2.2 og derfor bevarer comparator-paritet;
- repræsenterer ROM i grader, multiple palpationsfund og målrettede testresultater;
- adskiller blank, eksplicit negativ, `not-assessed`, `not-performed` og `not-assessable`; og
- allerede har deterministisk reducer-, completeness- og dokumentverifikation.

Clinical Document Workspace-modellens `PrototypeFacts` kan ikke erstatte denne root uden mappingtab, cardinality-forskelle og tab af eksisterende uncertainty-states.

### 3.2 Tilladt prototype-lokal komposition

C3 må have én samlet, prototype-lokal state-container med følgende disjunkte partitioner:

| Partition | Ejer og betydning | Må ikke være |
|---|---|---|
| Clinical facts | Uændrede Sprint 1.1 `history`- og `objective`-værdier | Kopieret document-state eller UI-derived facts |
| Clinician Assessment | Eksplicit oprettede, redigerede, omklassificerede og fjernede Assessment entries | Cortex suggestions, facts eller automatisk diagnose |
| Phrase commitments | Eksplicit klinikervalgte/redigerede Plan-, Follow-up- og Safety-net-frase-records | Udført handling, patientfact eller recommendation acceptance |
| Output intent | Valgt `quick` eller `standard` projection profile | Clinical fact eller approval |
| Representation drafts | Genererede projektioner og eksplicitte manual overrides med stale-metadata | Source for facts |
| Recovery metadata | Inaktive kopier af reducer-prunede child-values indtil eksplicit restore/discard | Aktive facts eller skjult fallback |

Navigation, åbent modul, keyboard-roving state, focus-return target, scroll og måleinstrumentering skal ligge i separat presentation state og må ikke indgå i denne clinical/projection container.

### 3.3 Eksisterende legacy-felter

Sprint 1.1-felterne `assessment`, `plan` og `documentationLevel` må ikke være konkurrerende C3-sources:

- C3 må ikke skrive Assessment eller phrases både til nye records og til legacy-felterne.
- En outputadapter må konstruere en kortlivet, immutable generator-inputstruktur fra C3-records.
- Den konstruerede struktur må aldrig persisteres eller accepteres tilbage som clinical truth.
- `quick` og `standard` er output/presentation intent; profilskift må ikke ændre clinical facts, Assessment eller phrase commitments.

## 4. Konsoliderings- og adaptervej

### 4.1 Genbrug fra Sprint 1.1/C2

Build skal genbruge uden ændring:

- history/objective value sets og cardinality;
- eksisterende fact-actions og reducer-invariants;
- knee fixture-facts;
- completeness-semantik for de eksisterende facts; og
- den eksisterende knee journalgenerator som formatteringsgrundlag, hvor dens kontrakt kan bære projektionen.

Adapteren må delegere fact-ændringer til den eksisterende reducer. C3 må ikke reimplementere reducer-regler i React-komponenter.

### 4.2 Selektiv adoption fra Clinical Document Workspace

Følgende concepts må adopteres semantisk, men ikke ved at tage Workspace-state som ny fact-root:

- ordered, clinician-owned Assessment entries;
- én mode-independent source-state med Quick/Standard projections;
- explicit selection, edit, removal og provenance;
- manual draft override adskilt fra facts; og
- grouped provenance-princippet: en afledt eller samlet handling må kun ophæve de værdier, den selv skabte.

Følgende må ikke adopteres i C3:

- `getPrototypeSuggestions` eller anden diagnostic suggestion/ranking;
- `source: "suggestion"` på Assessment entries;
- grouped-normal auto-application som nyt C3-inputmønster;
- imaging/referral state, plan-action rules eller `ReferralDraftFoundations`;
- output placeholders for senere tracks; eller
- Workspace-modellens alternative fact value sets.

### 4.3 Minimal Assessment-record

Hver C3 Assessment entry skal mindst have:

- stabil prototype-ID;
- rolle: `primary`, `secondary` eller `differential`;
- klinikerindtastet eller klinikervalgt tekst fra en versionslåst, reviewet fixture;
- origin: `clinician-free-text` eller identificeret fixture-entry;
- lifecycle-status: aktiv eller fjernet/superseded; og
- eksplicit create/edit/reclassify/remove action i prototype-trace.

Nul primary entries er tilladt og betyder blank Assessment. Højst én aktiv primary entry er en C3 workflow-invariant; flere secondary/differential entries må kun følge den versionslåste fixture- og testkontrakt. Cortex må ikke oprette, rangere eller promovere entries.

## 5. Phrase provenance og action semantics

### 5.1 Minimal phrase-record

En aktiv eller fjernet phrase commitment skal mindst bevare:

- stabil entry-ID og kategori: `plan`, `follow-up` eller `safety-net`;
- origin: fixture eller clinician free text;
- fixture-ID, phrase-ID og fixture-version, når origin er fixture;
- oprindelig tekst og gældende klinikerredigeret tekst;
- handling: selected, edited, removed eller restored;
- monoton prototype-sekvens og relation til foregående version; og
- actor attribution som eksplicit klinikerhandling i det syntetiske prototype-scope.

Fjernelse må ikke destruktivt omskrive historikken. Output anvender kun gældende aktive entries.

### 5.2 Forbud mod authority- og action-upgrade

Valg af en frase registrerer alene klinikerens aktuelle plan-/follow-up-/safety-net-tekst. Det dokumenterer ikke automatisk:

- at patienten er informeret;
- at patienten er enig eller har accepteret;
- at en aftale er indgået;
- at medicin er ordineret eller givet;
- at henvisning, bestilling eller behandling er udført; eller
- at en recommendation er accepteret.

Da C3 ikke indfører en separat action/communication contract, skal fraser med udsagn som `patient informeret`, `patienten accepterer`, `aftalt`, `ordineret`, `henvist`, `sendt` eller `udført` udgå af C3-fixturen. Neutral fremadrettet planformulering er tilladt efter kompetent content review.

## 6. Quick/Standard projection contract

Quick og Standard skal være rene, deterministiske funktioner af den samme versionsidentificerede C3 source snapshot:

`facts + Assessment + active phrase commitments + output intent -> document projection`

Følgende er bindende:

1. Profilskift ændrer kun output intent.
2. Samme snapshot og profil giver byte-stabilt output.
3. Begge profiler refererer samme source revision.
4. Quick må komprimere tekst, men ikke ændre fact meaning eller skabe normalitet.
5. Material uncertainty og safety-relevant state må ikke skjules som om arbejdet var komplet.
6. Standard må ikke tilføje specificitet, handling eller Assessment, der ikke findes i source snapshot.
7. Profilskift må ikke kalde reducer-actions, prune facts eller ændre Assessment/phrases.
8. En upstream correction regenererer begge projections fra den nye revision.

En kortlivet outputadapter må mappe:

- `quick` til den eksisterende korte generatorprofil; og
- `standard` til den eksisterende standardprofil,

men kun når locked target-output fixtures viser, at information, uncertainty og phrase semantics bevares. Ellers må C3 have prototype-lokale pure projectors over samme state; det er ikke en canonical generatorændring.

### 6.1 Correction identity og manual drafts

Hver accepteret ændring af facts, Assessment eller phrase commitments skal skabe en ny monoton `sourceRevision`. Presentation/focus-ændringer må ikke gøre det.

Et manual draft override skal mindst gemme:

- projection profile;
- source revision;
- den genererede basistekst eller dens stabile hash;
- redigeret tekst; og
- `current` eller `stale` status.

Quick og Standard har separate overrides. Et override fra den ene profil må ikke vises som den anden profils gældende draft. Når source revision ændres, bevares teksten, men markeres stale; klinikeren vælger eksplicit mellem fortsat redigering, discard eller regeneration. Teksten må aldrig reverse-parses til facts, Assessment eller phrases.

### 6.2 Hidden og recovery state

Quick/Standard må aldrig skjule ved at slette facts. Mode-switch er projection-only.

Når den eksisterende fact-reducer pruner child-values efter en parent correction, skal C3-adapteren før ændringen oprette en inaktiv recovery-record med de berørte field IDs, værdier og source revision. Recovery-records må ikke påvirke completeness eller output. Restore og discard kræver eksplicit handling.

C3 må ikke genbruge C2.2's single-slot-begrænsning på en måde, hvor en ny recovery-hændelse overskriver en uafklaret record. Build skal enten:

- blokere en ny recovery-producerende parent correction, indtil den første er disponeret; eller
- anvende en prototype-lokal keyed collection, hvor records ikke kolliderer.

Dette er workflow/recovery metadata, ikke en ny clinical fact-model.

## 7. Uncertainty og UI-grænser

- Blank er fravær af assertion.
- Eksplicit negativ er et registreret fact.
- `not-assessed`, `not-performed` og `not-assessable` bevarer deres feltspecifikke betydning.
- De må ikke samles i en generisk `unknown` enum eller få fælles outputtekst alene for UI-bekvemmelighed.
- Completeness og dokumentrepræsentation må afledes forskelligt, men skal begge bevare den oprindelige state-betydning.
- UI-controls må kun vise og dispatch'e eksisterende value sets og C3-record actions.
- Ingen React-komponent må definere clinical relevance, cardinality, phrase meaning, Assessment ranking eller dokumentsemantik.

Keyboard/focus state er presentation state. `Tab`, `Shift+Tab`, lokale piletaster, `Space`, `Enter`, `Escape`, focus restoration og ét aktivt edit-module må ikke skabe clinical commits uden den synlige, eksplicitte control-handling.

## 8. Prototype MSK-kernel og knee content pack

C3 må introducere en prototype-lokal, genbrugskandidat med denne boundary:

### Candidate MSK workflow kernel

- module read/edit/cancel/commit lifecycle;
- choice-control grammar uden clinical value sets;
- explicit clinician commitment actions;
- source revision, projection og stale contracts;
- phrase provenance record shape; og
- presentation-state focus/recovery orchestration.

### Knee content pack

- alle field IDs, value sets, labels og cardinalities;
- knee fact-actions og dependency/pruning relationer;
- completeness-regler;
- Assessment- og phrase-fixtures;
- Quick/Standard knee formatters og expected outputs; og
- synthetic knee scenarios.

Kernel må ikke importere knee field IDs eller clinical rules. Knee pack må ikke kaldes en valideret MSK-model. Ingen anden anatomi, profession, population eller setting aktiveres eller hævdes understøttet gennem C3.

## 9. Isolerede senere spor

### Output track

C3 må ikke indeholde referral, fysioterapi-output, code suggestions, skjulte generatorer, output mappings eller UI-placeholders. Et senere outputspor kræver egen recipient, purpose, source fields, provenance, transformation, missing-state, review/approval og delivery contract.

### CDS track

C3 må ikke importere eller kalde diagnostic suggestions, plan recommendations, ranking, clinical attention eller treatment logic. Et senere CDS-spor kræver identificerede kilder, Clinical Safety/Governance review, uncertainty, false-positive/negative scenarios, rejection og eksplicit Human Decision authority.

## 10. Compatibility og regression

Build skal:

1. implementere C3 på en ny isoleret route og i nye C3-artifacts;
2. undlade ændringer i Sprint 1.1/C0–C2.2 source, fixtures, reducer, generators og checksum-records;
3. undlade runtime-brug af Clinical Document Workspace fact-state/reducer;
4. bevare alle eksisterende comparator-checksums;
5. køre fuld eksisterende Vitest- og Playwright-regression;
6. tilføje C3-tests for partition ownership, uncertainty, projections, correction/stale, provenance, recovery collision og keyboard/focus; og
7. dokumentere, at samme locked knee fact fixture giver sammenlignelige C2/C3 facts uden skjult content advantage.

Passing tests er teknisk verification, ikke Product gain, clinical validation eller Build authority.

## 11. Pre-Build gates

Før et separat Build-handoff kan frigives, skal følgende være versionslåst og reviewet:

1. én synthetic knee fact fixture og dens mapping til Sprint 1.1 fact-root;
2. Quick- og Standard-expected-output fixtures fra samme source snapshot;
3. Assessment-fixture eller eksplicit beslutning om kun clinician free text;
4. Plan-, Follow-up- og Safety-net phrase fixture med navngiven competent Clinical Safety/Governance reviewer;
5. phrase-by-phrase kontrol for unsupported communication, agreement, prescription, referral og completed-action claims;
6. negative fixtures for blank, explicit negative, `not-assessed`, `not-performed` og `not-assessable`;
7. state ownership/mapping, keyboard matrix, recovery collision og manual-draft stale acceptance tests; og
8. separat Steering authority samt Product-to-Build-handoff, der refererer denne disposition.

Hvis clinical content/fixture review ikke foreligger, må C3 Build ikke substituere egen tekst. Det berørte content skal udgå eller Build forblive blokeret.

## 12. Explicit non-goals

C3:

- ændrer ikke canonical domain model, Encounter Engine eller production state;
- erstatter eller migrerer ikke Clinical Document Workspace;
- harmoniserer ikke alle prototype-modeller repository-wide;
- validerer ikke en generel MSK-kernel;
- definerer ikke clinical taxonomy, correctness, rules eller treatment content;
- implementerer ikke recommendations, referrals, fysioterapi, prescriptions, code suggestions eller external actions;
- indfører ikke real patient data, persistence, EHR-integration, audit-system eller release architecture;
- godkender ikke Product-retning, clinical safety, clinical validity, accessibility eller production use; og
- autoriserer ikke Build, commit, push eller release.

## 13. API-017 closure

API-017 er arkitekturmæssigt disponeret for det afgrænsede C3-scope:

- **Architecture classification:** `MATERIAL CONSTRAINTS`
- **Steering-facing disposition:** `BUILDABLE AS BOUNDED C3`
- **Canonical decision required:** Nej
- **Targeted prototype model work:** Ja — kun den komposition, metadata og de adapters, der er eksplicit beskrevet ovenfor
- **Remaining gate owners:** Product reconciliation; Clinical Safety/Governance content review; Steering Build authority; Build verification

Scopeudvidelse eller brud på constraints genåbner API-017 eller kræver en ny Architecture-interface.
