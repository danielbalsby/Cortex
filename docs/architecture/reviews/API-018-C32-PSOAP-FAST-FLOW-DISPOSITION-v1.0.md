# API-018 — C3.2 PSOAP Fast Flow Architecture/Clinical Safety Disposition v1.0

## Document control

| Felt | Værdi |
|---|---|
| Interface-ID | API-018 |
| Product artifact | PDR-011 — C3.2 PSOAP Fast Flow Product Learning Contract v1.0 |
| Dokumenttype | Afgrænset Architecture/Clinical Safety disposition for C32-G01–04 |
| Version | 1.0 |
| Dato | 2026-07-30 |
| Architecture-ejer | Principal Software Architect |
| Klinisk reviewer-kontekst | Daniel Balsby er registreret som `[læge og klinisk founder-reviewer]` for prototype-phrase/workflow review |
| Administrativ status | Non-active working artifact pending GI-018 resolution |
| Architecture-klassifikation | **MATERIAL CONSTRAINTS** |
| Steering-facing disposition | **CONDITIONALLY BUILDABLE AS ONE ISOLATED C3.2 PROTOTYPE** |
| Build-authoritet | Ingen. Product reconciliation, versionslåst scenario/fixture og separat Steering Build authority kræves fortsat. |
| Canonical effekt | Ingen canonical production-model-, capability-, LEX-, governance-, pathway- eller outputkontraktændring |

## 1. Scope og kilder

Denne disposition løser kun de fire PDR-011 gates C32-G01–04 for én isoleret syntetisk C3.2 PSOAP Fast Flow-prototype. Den implementerer ikke C3.2, ændrer ikke C3.1-comparatoren og autoriserer ikke Build.

Vurderingen er baseret på:

- `PDR-011` — C3.2 PSOAP Fast Flow Product Learning Contract v1.0;
- API-018-rækken i Cortex Architecture–Product Interface Register;
- `API-017-C3-ARCHITECTURE-DISPOSITION-v1.0.md`;
- C3/C3.1 state-, reducer- og projection-artefakter i `clinical/prototypes/c3/`, `clinical/prototypes/c3-1/` og `clinical/prototypes/sprint-1-1/`;
- C3.1 ROM-prototypeinteraktionen i `components/prototype/c3-1/C31CalmInteraction.tsx`;
- `KNEE-001-Knee-Pain.md`; og
- Engineering Constitution og Clinical Safety Principles.

Daniel Balsbys ønsker om Red flags Normal-interaktionen og `Normal 0–140°`-handlingen behandles som intern kliniker-/founder-review af prototypefrase og workflow. Det er ikke bred Clinical Safety-godkendelse af generel normalitet, clinical readiness, production use eller klinisk evidens.

## 2. Samlet disposition

**C3.2 kan fortsætte mod Product reconciliation som én isoleret prototype, men kun med en bounded C3.2 state/reducer-extension omkring C3 fact-rooten.**

C3.2 må ikke oprette en ny konkurrerende fact-model. De eksisterende C3/Sprint 1.1 `history`- og `objective`-facts forbliver eneste kliniske fact-root for de facts, de kan repræsentere. C3.2 må derimod tilføje prototype-lokal metadata for:

1. workflow configuration og problemprofil;
2. field configuration/cardinality;
3. Normal-batch preview, commit, provenance, collision og undo;
4. visible-scope/completeness metadata;
5. PSOAP representation drafts og stale-state; og
6. instrumentation/presentation state.

Hvis et C3.2-control ikke kan repræsenteres tabsløst i den eksisterende C3 fact-root, skal det enten:

- reduceres til et godkendt eksisterende fact/action-pattern;
- tilføjes som en navngivet, bounded C3.2 fact-extension med reducer-, projection-, completeness- og testkontrakt; eller
- fjernes fra C3.2-scope.

Et React-control må aldrig løse dette ved at holde kliniske values i lokal UI-state, skjult document-state eller en parallel map-struktur.

## 3. C32-G01 — Problemprofilens modelgrænse

**Disposition:** Problemprofil er tilladt som prototype-lokal workflow configuration. Den er ikke clinical fact, diagnose, Assessment, clinical context fact, capability ownership, pathway selection, normality assertion eller parallel source of truth.

Tilladt effekt:

- vælger C3.2-flowets rækkefølge, synlige grupper, label-variationer og hvilke controls der er tilgængelige i det syntetiske scenario;
- kan knyttes til source revision som presentation/workflow trace;
- kan påvirke prototype-completeness ved at definere hvilke visible fields der indgår i Fast Flow-evalueringen; og
- kan vises i instrumentering som research metadata.

Forbudt effekt:

- må ikke skrive til `factRoot.history`, `factRoot.objective`, Assessment, Plan, phrase commitments eller PSOAP-dokumenttekst;
- må ikke forudvælge diagnose, problemfaktum, normalitet eller røde flag;
- må ikke skjule uncertainty som om et område er klinisk komplet; og
- må ikke slette eller prune allerede registrerede facts ved profilskift.

Hvis en profilændring gør et tidligere registreret felt usynligt, skal værdien bevares og være inspicerbar som source-current/outside-current-profile. Fjernelse kræver en eksplicit clear-to-blank- eller field-edit-handling. Visibility er aldrig deletion.

## 4. C32-G02 — Field-specific cardinality og multi-select

**Disposition:** C3.2 skal have en versionslåst field configuration, hvor cardinality er deklareret per field og valideret mod reduceren. UI-formen må ikke definere clinical meaning.

### 4.1 Godkendt cardinality over nuværende C3 fact-root

| Feltgruppe | C3.2 cardinality | Reducer-kompatibilitet | Clear-to-blank og projection/completeness |
|---|---|---|---|
| Problemprofil | Én workflow-konfiguration ad gangen | Ikke en fact-action | Clear skifter kun workflow state. PSOAP og clinical completeness må ikke nævne profilen som clinical fact. |
| `history.side`, `onset`, `painCourse`, `trauma`, `painLocation`, `function`, `swelling`, `locking`, `instability`, `restPain`, `nightPain`, `fever`, `systemicIllness`, `redHotSwollenJoint` | Single-select | `set-history` kan sætte value eller `undefined` | `undefined` er blank og udelades/markeres manglende. `no` er eksplicit negativt fact. `not-assessed` forbliver separat der hvor value-settet tillader det. |
| `history.duration`, `traumaContext`, `swellingTiming` | Én tekstværdi | `set-history` renser tom tekst til `undefined` | Tom commit bliver blank. Projektion må ikke opfinde duration/kontekst/timing. |
| `history.provocations` | Multi-select | `toggle-provocation` er additive/removing | Ingen valgte provokationer er blank, ikke “ingen provokation”. Completeness kan markere manglende, men output må ikke angive fravær. |
| `objective.gait`, `inspection`, `effusion`, `lachman`, `valgus`, `varus`, `meniscalTest`, `patella`, `neurovascular` | Single-select | `set-objective` kan sætte value eller `undefined` | Clear giver blank og projektion udelader eller markerer manglende efter eksisterende regler. |
| ROM `extensionDegrees` + `flexionDegrees` | To eksplicitte gradfacts; C3.2 kan vise dem som én kompakt control | `set-objective` understøtter hver grad; `rangeNotAssessable=true` pruner grader via recovery | Begge grader kræves for ROM-completeness. Én blank grad må ikke projekteres som normal ROM. |
| `objective.palpationStatus` | Single status | `set-objective`; andre statusværdier end `findings-recorded` clearer `palpationFindings` | Status som `no-focal-tenderness`, `not-performed` og `not-assessable` er forskellige facts/states. |
| `objective.palpationFindings` | Multi-select | `toggle-palpation`; toggles sætter status til `findings-recorded` når mindst ét fund findes | Tom liste er blank, ikke “ingen fokal ømhed”. `no-focal-tenderness` er et separat eksplicit single-status fact. |

### 4.2 Inspection-grænse

Nuværende C3 fact-root kan kun repræsentere `objective.inspection` som single-select: `no-specific-findings`, `swelling`, `redness`, `deformity` eller `not-assessed`.

C3.2 må derfor ikke vise `inspection` som multi-select oven på den eksisterende field, fordi det ville skabe last-write-wins-tab eller skjult deletion. Hvis Product ønsker samtidig registrering af fx hævelse og rødme i inspection, kræver det en bounded C3.2 fact-extension med:

- navngivne nye field IDs;
- reducer-actions for add/remove/clear;
- explicit projection/completeness-effekt; og
- tests for clear-to-blank, collision og output.

Uden denne extension skal inspection forblive single-select i C3.2.

### 4.3 Clear-to-blank-regel

Clear-to-blank betyder, at det konkrete field vender tilbage til fravær af assertion. Det må ikke omsættes til `no`, normal, `none`, `not-assessed`, `not-performed`, `not-assessable` eller `not relevant`.

Hvis clear eller parent-correction udløser reducer-pruning af child-values, gælder API-017 recovery-reglen fortsat: de prunede værdier skal bevares som inaktiv recovery metadata, indtil klinikeren eksplicit restore/discard'er dem. C3.2 må ikke gemme prunede values i skjult aktiv UI-state.

## 5. C32-G03 — Explicit Normal-batchsemantik

**Disposition:** Normal-batches er tilladt som prototype-local convenience, men kun som eksplicitte batch transactions med visible scope, preview/commit, provenance, collision handling, single-action undo og senere field-level override.

### 5.1 Generel batchkontrakt

En C3.2 Normal-batch skal mindst have:

- batch ID, label, group ID, config version og source revision;
- preview med præcis liste over field IDs, nuværende values og values der vil blive skrevet;
- explicit commit eller en ækvivalent handling, hvor scope er synligt umiddelbart før commit;
- per-field provenance for de facts batchen faktisk skrev;
- collision list for facts den ikke må overskrive;
- single-action undo knyttet til batch ID; og
- audit/instrumentation som research metadata, ikke clinical fact.

Commit må som standard kun skrive til blanke fields. Positive, abnormal, `not-assessed`, `not-performed`, `not-assessable`, allerede udfyldte normal/negative values og manuelt redigerede values er collisions og må ikke overskrives af batchen. Hvis en senere C3.2-variant ønsker batch-overwrite, kræver det ny Architecture/Clinical Safety-disposition.

Undo må kun clear-to-blank'e de konkrete values, som batchen selv oprettede, og kun hvis de stadig er uændrede. Hvis klinikeren efter batchen har ændret et field, vinder den senere field-level edit, og undo må ikke overskrive den.

Blank må aldrig blive negativ, normal eller ikke relevant uden eksplicit commit af en synlig batch eller et synligt felt-control.

### 5.2 Red flags Normal

For C3.2 er den eneste tilladte Red flags Normal-scope over den nuværende C3 fact-root:

| Field ID | Batchværdi | Meaning |
|---|---|---|
| `history.fever` | `no` | Eksplicit oplyst/registreret ingen feber |
| `history.systemicIllness` | `no` | Eksplicit oplyst/registreret ingen almen påvirkning |
| `history.redHotSwollenJoint` | `no` | Eksplicit oplyst/registreret ikke rødt, varmt og akut hævet knæ |

Batchen må ikke registrere fravær af andre røde flag, må ikke skrive `not relevant`, må ikke hævde at red flags er klinisk komplette, og må ikke konkludere lav risiko eller fravær af alvorlig patologi. Dokumentprojektionen må kun beskrive de tre specifikt registrerede negative facts.

Hvis Product ønsker flere red-flag facts i denne batch, er C3.2 Build blokeret indtil de konkrete field IDs, value sets, clinical wording og projection/completeness-effekt er reviewet.

## 6. C32-G04 — Prototype-local `Normal ROM 0–140°`

**Disposition:** `Normal 0–140°` kan anvendes som C3.2 prototype-local kandidat-handling i det syntetiske knæ-learning scope, men kun med snæver mapping og uden canonical/general normalitetsclaim.

Regler:

1. Handlingen må først efter eksplicit klinikerhandling skrive:
   - `objective.extensionDegrees = 0`
   - `objective.flexionDegrees = 140`
2. Den må ikke skrive et separat `normal ROM` fact, Assessment, diagnose, “normal objektiv undersøgelse” eller generel klinisk normalitetsclaim.
3. Projektion bør gengive de eksplicitte grader, fx ROM ekstension `0°` og fleksion `140°`, frem for at gøre `normal` til journalens kliniske konklusion.
4. `Abnorm` skal vise separate gradfelter for ekstension og fleksion. Disse fields skriver samme explicit degree facts.
5. Clear-to-blank på ROM clear'er de relevante degree fields til `undefined`; blank er ikke normal.
6. Hvis `rangeNotAssessable=true` eller eksisterende grader allerede er registreret, er `Normal 0–140°` en collision og må ikke overskrive uden separat field-level edit eller ny disposition.
7. Senere field-level override vinder over batchen. Undo af ROM-batchen må kun fjerne `0`/`140`, hvis disse values stadig matcher batchens provenance.

Daniel Balsbys prototypeønske kan dermed afprøves som workflow-phrase i C3.2. Det må ikke generaliseres til production, andre anatomier, andre populationer eller klinisk valideret normalområde.

## 7. Build constraints

Hvis Steering senere autoriserer Build, skal Build følge disse constraints:

1. C3.2 oprettes som ny isoleret prototype-route og nye C3.2-artefakter.
2. C3.1-comparatorfiler og deres PDR-011-hashes må ikke ændres.
3. C3.2 skal komponere den eksisterende C3 fact-root; ingen parallel fact-root, document-source-of-truth eller hidden UI fact-state.
4. C3.2 må kun tilføje bounded extension for workflow configuration, field config, batch transactions, provenance/undo, PSOAP representation draft, recovery og instrumentation.
5. Field configuration skal versionslåses før Build og være testet mod reducerkompatibilitet.
6. Normal-batch preview/commit/undo/collision skal være reducer-level eller adapter-level semantics, ikke kun knaplogik i React.
7. Projection og completeness må kun afledes fra source snapshot plus godkendt prototype metadata; de må ikke læse dokumenttekst som source.
8. C3.2 skal have tests for:
   - problemprofil uden fact mutation;
   - single/multi cardinality;
   - `inspection` single-select eller bounded extension;
   - clear-to-blank;
   - no hidden deletion ved visibility/profile switch;
   - Red flags Normal exact scope;
   - batch collision, provenance, undo og later override;
   - ROM `0°/140°` mapping;
   - PSOAP projection uden unsupported blanks/normalitet; og
   - uændret C3.1 comparator.

Passing tests er teknisk verification under det syntetiske scope. Det er ikke clinical validation, Product success, release readiness eller generel tidsbesparelse.

## 8. Changes that remain blocked

Følgende er fortsat blokeret under API-018/PDR-011:

- C3.2 Build-start uden Product reconciliation, versionslåst scenario/fixture og separat Steering Build authority.
- Ændring af C3.1-comparatoren.
- Ny canonical clinical model, completeness model, capability model, pathway contract eller output contract.
- UI-only multi-select for `inspection` eller andre single fields uden bounded reducer/projection extension.
- Normal-batches der overskriver nonblank facts, skriver uviste facts eller hævder completeness.
- Red flags Normal med flere eller bredere negative facts end de tre reviewede fields.
- Brug af `Normal 0–140°` som generel klinisk normaldefinition eller productionregel.
- Reverse parsing fra PSOAP-dokumenttekst til facts, Assessment eller Plan.
- Clinical recommendations, diagnostic ranking, imaging/referral/physiotherapy actions, EHR-integration, real patient data, persistence eller release architecture.

## 9. API-018 closure

API-018 er arkitekturmæssigt og klinisk-sikkerhedsmæssigt disponeret for de fire navngivne gates:

- **C32-G01:** Løst med prototype-local workflow configuration boundary.
- **C32-G02:** Løst med field-specific cardinality og explicit `inspection`-grænse; bounded extension kræves for enhver ny multi-select-fact.
- **C32-G03:** Løst med explicit Normal-batch transaction semantics og Red flags exact scope.
- **C32-G04:** Løst med prototype-local ROM `0°/140°` degree mapping og forbud mod general normality claim.
- **Canonical decision required:** Nej, hvis constraints følges.
- **Targeted prototype model work:** Ja — bounded C3.2 state/reducer-extension for workflow/cardinality/batch/provenance/undo.
- **Remaining gate owners:** Product reconciliation; fixture/scenario version lock; Steering Build authority; Build verification.

Scopeudvidelse eller brud på constraints genåbner API-018 eller kræver en ny Architecture/Clinical Safety-interface.
