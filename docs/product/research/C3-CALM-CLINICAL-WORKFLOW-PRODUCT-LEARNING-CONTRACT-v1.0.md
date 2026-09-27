# C3 Calm Clinical Workflow — Product Learning Contract v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PDR-010 |
| Dokumenttype | Product Learning Contract og Product Decision Record |
| Version | 1.0 |
| Status | **DRAFT — PRODUCT-READY FOR BOUNDED BUILD AUTHORIZATION; STEERING AUTHORITY PENDING** |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Dato | 2026-07-30 |
| Product owner | TODO — navngiven ejer |
| Research owner | TODO — navngiven Research owner |
| Godkendende organ | TODO — kompetent Product-/Steering-organ |
| Beslutning | C2.2-læringsiterationen lukkes som `TECHNICALLY PASSED — NO MARKED PRODUCT GAIN`; Product prioriterer præcis én C3-prototype for at teste en roligere, modulorienteret klinisk arbejdsflade. |
| Kontrol | C2 Narrative workspace |
| Evidensgrundlag | [P03 Founder Evaluation](../../research/SPRINT-1.2-FOUNDER-EVALUATION-P03-v1.0.md); [C2.2 Evaluation Baseline](../../build/SPRINT-1-2-C2-2-EVALUATION-BASELINE-v1.0.md); [PDR-009](SPRINT-1-2-PRODUCT-LEARNING-CONTRACT-v1.0.md) |
| Architecture status | [API-017](../../architecture/reviews/API-017-C3-ARCHITECTURE-DISPOSITION-v1.0.md) er `BUILDABLE AS BOUNDED C3 — MATERIAL CONSTRAINTS`; constraints er indarbejdet gennem C3-PBH-001 og C3-FIX-001. |
| Build status | [C3-PBH-001](../handoffs/C3-PRODUCT-TO-BUILD-HANDOFF-v1.0.md) er Product-released; [C3-FIX-001 v1.1](../handoffs/C3-LEARNING-FIXTURE-PACK-v1.1.md) er human-reviewed og locked. Kun Steering Build-authority udestår. |

## 1. Product decision and evidence qualification

### Decision

Product registrerer Steering-dispositionen:

1. C2.2 er **CLOSED** med resultatet `TECHNICALLY PASSED — NO MARKED PRODUCT GAIN`.
2. C2 forbliver den stærkeste Product-reference og kontrolbaseline.
3. C2.1 og C2.2 bevares som læringsartefakter, ikke som nye baselines eller mønstre, der skal opskaleres.
4. Product autoriserer præcis ét C3-prototypescope til efterfølgende Architecture-/Steering-gating: **C3 Calm Clinical Workflow**. Dette er scope-autorisation, ikke Build-execution.
5. C3 er ikke endnu en C2.x-polering og autoriserer ikke implementation gennem dette dokument alene.

PDR-010 supplerer PDR-009 med en ny, smallere læringsbeslutning. Den ændrer ikke PDR-009's evidensgrænser, canonical semantics, Architecture-autoritet eller Build-gates.

### API-017 reconciliation

API-017 er afsluttet med `MATERIAL CONSTRAINTS` og dispositionen `BUILDABLE AS BOUNDED C3`. Product accepterer følgende som bindende C3-grænser:

- Sprint 1.1/C2 History og Objective er eneste fact-root;
- Assessment, phrase commitments, output intent, drafts og recovery er separate prototype-records;
- Quick/Standard er rene projektioner af samme source revision;
- C3 anvender clinician free text only for Assessment og ingen suggestions/ranking;
- clinical phrases kræver navngivet competent Clinical Safety/Governance review;
- no hidden/pruned facts, parallel Clinical Document Workspace fact-state, referrals, prescriptions, CDS eller comparator changes; og
- scope expansion genåbner Architecture review.

De indarbejdede constraints, locked fixtures og acceptance tests findes i [C3-PBH-001](../handoffs/C3-PRODUCT-TO-BUILD-HANDOFF-v1.0.md) og [C3-FIX-001](../handoffs/C3-LEARNING-FIXTURE-PACK-v1.0.md).

### Evidence boundary

P03 er én intern founder-walkthrough uden tidsstemplet observationsark, komplet think-aloud, kliklog eller repræsentativ sampling. Den kan prioritere næste læringsspørgsmål, men kan ikke dokumentere usability, reduceret kognitiv belastning, accessibility, clinical safety, clinical validity eller generaliserbare klinikerbehov.

C2.2-baselinen dokumenterer teknisk verifikation og artifact identity. Beståede tests dokumenterer ikke Product-effekt. C3 skal derfor måles mod C2 med direkte adfærds- og forståelsesevidens; teknisk pass alene er utilstrækkeligt.

Founderens STANDARD/QUICK-knætekst er en target-output fixture og et evalueringseksempel. Den er ikke valideret klinisk guidance, clinical rule eller kilde til automatiske facts. Ordlyden må ikke rekonstrueres eller udvides uden en versionslåst fixture og relevant klinisk review.

## 2. Mission and primary hypothesis

### Mission

> Test om en roligere, modulorienteret klinisk arbejdsflade kan reducere visuel og kognitiv belastning, mens klinisk klarhed, eksplicit uncertainty, menneskelig beslutningsmyndighed og pålidelig dokumentation bevares.

### Primary hypothesis — H-C3-01

En arbejdsflade med ét aktivt redigeringskontekst ad gangen, rolig read-view og en meaning-aligned control grammar kan reducere visuel og systemorienteret belastning sammenlignet med C2 uden at reducere orientering, clinical clarity, uncertainty-comprehension, keyboard-effektivitet eller dokumentfidelitet.

### Supporting hypotheses

- **H-C3-02 — Direct choices and keyboard:** Korte, meaning-aligned valg og deterministisk keyboard-adfærd kan reducere inputfriktion uden clinical defaults, forkert cardinality eller accidental state change.
- **H-C3-03 — Projection and authority:** Quick/Standard-projektioner, clinician-owned Assessment og eksplicit valgte fraser kan genbruge samme state, mens facts, human judgement, provenance og dokumentrepresentation forbliver forståeligt adskilte.

### Falsification criteria

H-C3-01–03 svækkes eller falsificeres, hvis C3 sammenlignet med C2 medfører ét eller flere af følgende:

- flere context-loss errors, oversete material gaps eller forkert næste handling;
- read-view og edit-view konkurrerer fortsat eller skaber mere navigation;
- korte valg eller chips skaber implicitte defaults, forkert cardinality eller accidental selection;
- keyboard-flow har focus traps, uforudsigelig rækkefølge eller global arrow-hijacking;
- Quick skjuler eller ændrer aktive facts, uncertainty eller safety-relevant information;
- Standard og Quick giver forskellige clinical facts fra samme state;
- assessment eller planfraser opfattes som Cortex-beslutninger frem for klinikerens valg;
- blank fortolkes som negativ, normal, ikke relevant eller vurderet;
- dokumenttekst angiver information, aftale eller handling, der ikke er eksplicit registreret; eller
- ro kan kun opnås ved nye canonical semantics, clinical rules eller skjult state.

## 3. Comparator contract

| Variant | Rolle | Kontrolkrav |
|---|---|---|
| C2 | Kontrolbaseline | Checksum-identificeret C2 Narrative workspace; samme syntetiske knæcase og sammenlignelige opgaver. |
| C3 | Intervention | Præcis én ny, versionsidentificeret prototype med rolig modulmodel, control grammar, Quick/Standard-projektioner og klinikerejede assessment-/planregistreringer. |

C3 må ikke opnå en fordel gennem mere clinical content, færre facts, skjult uncertainty, ændret case eller andre completeness-regler. Visuel polish må ikke være den eneste forskel. Samme input-state skal give deterministiske, reproducerbare outputs.

Knee er første content pack. Genbrugelige MSK-workflow concepts må identificeres som kandidater, men C3 må ikke hævde, at generalisering til andre anatomiske områder, professioner eller settings er valideret.

## 4. P0 scope — exactly one C3 prototype

### 4.1 Calm module presentation

- Klinisk information præsenteres primært som rolig read-view.
- Kun ét klinisk modul har aktivt redigeringskontekst ad gangen.
- Read-view og edit-view må ikke konkurrere visuelt om samme information.
- Cortex Overblik kan bevares som orienteringshypotese, men må ikke fremstå som clinical assessment, approval eller completeness claim.
- Module opening, correction, cancellation og return to read-view skal være forståelige og bevare place/work.

Dette er Product-adfærd, ikke en beslutning om konkret navigation, komponenter eller frontendteknologi.

### 4.2 Meaning-aligned choice grammar

- To eller tre korte, mutually exclusive værdier kan vises som direkte valg.
- Samtidige fund kan vises som eksplicitte multi-select-chips, når eksisterende clinical meaning og cardinality tillader det.
- Længere eller komplekse værdisæt anvender en liste eller combobox.
- Ingen værdi må være klinisk default alene på grund af synlighed, rækkefølge, åbning eller manglende handling.
- Selected, unselected, blank, unavailable og disabled må ikke sammenblandes.

Product vælger ikke nye clinical value sets eller cardinality-regler gennem denne kontrakt.

### 4.3 Deterministic keyboard flow

C3 skal gøre følgende observerbart og testbart:

- `Tab` og `Shift+Tab` flytter mellem controls i forståelig DOM-/arbejdsrækkefølge;
- piletaster flytter kun inden for den aktive choice group eller list/combobox;
- `Space` toggler et fokuseret checkbox-/multi-select-valg;
- `Enter` vælger eller går videre kun, når konsekvensen er entydig og synlig;
- `Escape` lukker eller annullerer den aktuelle lokale interaction uden silent commit;
- ingen global arrow handler må flytte mellem unrelated controls eller ændre clinical state;
- fokus er synligt, bevares ved correction/recovery og returnerer til et forståeligt sted.

### 4.4 Quick and Standard documents

- Quick og Standard er to deterministiske projektioner af samme clinical state.
- Valg af dokumentprofil er presentation/output-intent og må ikke skabe, ændre eller slette clinical facts.
- Skift mellem profiler skal være reversibelt og må ikke ændre state.
- Quick må komprimere repræsentation, men må ikke omskrive meaning eller skjule material uncertainty/safety på en måde, der ser komplet ud.
- Standard må ikke tilføje specificitet, der ikke understøttes af state.
- Begge outputs forbliver udkast til menneskelig review; ingen profile er klinisk godkendelse.

### 4.5 Clinician-owned structured Assessment

- Clinical facts forbliver adskilt fra Assessment.
- Primary, secondary og differential assessment entries er eksplicitte klinikervalg eller klinikertekst—aldrig Cortex-beslutninger.
- C3 må ikke generere, rangere eller foreslå assessment entries.
- Hvis derived considerations senere vises i et særskilt autoriseret spor, skal de være adskilte, kildeafgrænsede og tydeligt mærkede; de indgår ikke i C3.
- Ændring eller fjernelse kræver eksplicit klinikerhandling og må ikke omskrive source facts.

Kontrakten definerer ikke diagnostic taxonomy, clinical correctness eller canonical assessment model.

### 4.6 Clinician-selected Plan, Follow-up and Safety-net phrases

- En frase bliver først klinikerens registrering efter eksplicit valg eller eksplicit redigering.
- Provenance skal bevare, hvilken fixture/library-version frasen kom fra, samt at klinikeren valgte, ændrede eller fjernede den.
- En valgt frase må ikke tavst blive til patientfact, assessment, udført handling, afgivet information, indgået aftale eller accepteret recommendation.
- Ord som “informeret”, “accepteret”, “aftalt”, “henvist” eller “udført” må kun indgå som faktuelt udsagn, hvis den relevante handling er eksplicit registreret under en accepteret contract.
- Product kan teste selection, attribution, edit og removal. Clinical Safety/Governance skal reviewe indholdet før en Build-authorized fixture fastlåses.

### 4.7 Existing uncertainty distinctions

C3 skal bevare den eksisterende betydningsadskillelse mellem:

- blank;
- eksplicit negativ;
- ikke vurderet;
- ikke udført; og
- ikke vurderbar.

C3 må teste forståelse og presentation burden, men må ikke ændre canonical semantics eller lade fravær af handling skabe en assertion. Workspace, completeness og document representation skal fortsat behandles som separate observationsakser.

### 4.8 Reusable MSK concepts

C3 må identificere følgende som kandidat-genbrugelige workflow concepts:

- module/read/edit lifecycle;
- control grammar;
- explicit clinician commitment;
- uncertainty presentation;
- output projection;
- correction, provenance og stale impact.

Kandidaterne testes med knæ som første content pack. De er ikke valideret som universel MSK-model og må ikke aktivere nye pathways eller canonical domain changes.

## 5. Explicit non-goals and prohibited scope

C3 omfatter ikke:

- referrals, fysioterapi-output eller kodeforslag;
- clinical decision support, diagnostic suggestions, ranking eller treatment recommendations;
- automatisk udfyldning af Assessment, Plan, Follow-up eller Safety-net;
- EHR-integration, afsendelse, billing automation eller eksterne systemer;
- real patient data, clinical release, clinical validation eller regulatoriske claims;
- canonical production-model, LEX, domain ownership, capability eller Architecture-ændringer;
- nye clinical rules, thresholds, defaults, contraindications eller treatment content;
- generel validering af MSK-genbrug;
- mere end én C3-prototype eller parallelle UI-varianter;
- omfattende dokumentproduktion; eller
- Build-start, code authorization eller implementation handoff gennem PDR-010 alene.

## 6. Testable learning outcomes and measures

| ID | Learning outcome | Observable measures | Failure signal |
|---|---|---|---|
| C3-LO01 | Calm orientation | Tid til korrekt problem/aktuel module/next work; samtidige edit contexts; scroll; section revisits; context-loss errors; facilitatorhjælp; konkret burden-rating | Flere fejl/hjælp eller fortsat konkurrerende read/edit-flader mod C2 |
| C3-LO02 | Choice comprehension | Korrekt single-/multi-select; accidental input; cardinality explain-back; default attribution; correction | Implicit default, forkert cardinality eller missed simultaneous finding |
| C3-LO03 | Keyboard determinism | Fuld Tab/Shift+Tab-rute; arrow/Space/Enter/Escape-resultat; focus loss/traps; antal pointer-workarounds | State ændres fra unrelated key, focus trap eller uforudsigelig rækkefølge |
| C3-LO04 | Quick/Standard fidelity | Identisk source-state-ID; deterministic output snapshot; reversible profile switch; information-retention/diff; uncertainty explain-back | Fact drift, unsupported specificity eller misleading omission |
| C3-LO05 | Assessment authority | Actor/source explain-back; korrekt create/edit/remove af primary/secondary/differential entries; 0 auto-created entries | Cortex opfattes som assessor eller entry opstår uden clinician commitment |
| C3-LO06 | Phrase provenance | Selection/edit/removal trace; source/version synlig ved behov; output- og attribution-explain-back | Frase fremstår som recommendation/fact eller påstår unregistered communication/agreement |
| C3-LO07 | Uncertainty preservation | State- og output-explain-back for blank/negative/not assessed/not performed/not assessable | Blank læses som negativ/normal/complete, eller output simulerer certainty |
| C3-LO08 | Bounded reuse | Knee-specific versus candidate-generic elements kan identificeres uden universal claim | Knee content hardcodes en påstået generel MSK-model eller genbrug kræver hidden semantics |

Teknisk pass, præference eller lavere click count alene opfylder ikke learning outcomes.

## 7. Founder and evaluation tasks

### 7.1 Founder pilot

Founder gennemfører C2 og C3 med samme syntetiske case og sammenlignelige tasks:

1. Orientér dig, identificér current work og åbn præcis ét modul til redigering.
2. Registrér et kort mutually exclusive valg, et samtidigt multi-select-fund og en værdi fra et længere sæt; korrigér alle tre.
3. Gennemfør den fulde task med keyboard, inklusive backward navigation, cancel og correction.
4. Skift mellem Quick og Standard; forklar hvilke facts der er identiske, hvad der er komprimeret, og hvad profilen ikke betyder.
5. Registrér, omklassificér og fjern klinikerens primary/secondary/differential assessment entries uden systemforslag.
6. Vælg, redigér og fjern én Plan-, Follow-up- og Safety-net-frase; forklar source, actor og hvad der faktisk er registreret.
7. Håndtér cases med blank, eksplicit negativ, ikke vurderet, ikke udført og ikke vurderbar; forklar workspace-, completeness- og outputkonsekvens.
8. Ret en upstream fact og kontrollér begge dokumentprojektioner, assessment-separation, phrase provenance og stale/impact-status.

Registrér task outcome, tidsspænd, handlinger, keyboard events, scroll/revisits, fejl, hjælp, correction/recovery, explain-back og konkrete præferencebegrundelser. Founder-piloten er intern formativ evidens og kan stoppe eller afgrænse C3; den kan ikke validere C3.

### 7.2 Subsequent external clinician evaluation

Efter bestået founder-pilot og særskilt research-/governanceautorisation gennemfører 3–5 relevante klinikere en counterbalanced C2/C3-sammenligning med samme syntetiske fact-state og opgaver. Individuelle resultater rapporteres; founderdata og ekstern evidens blandes ikke.

Evalueringen skal mindst måle C3-LO01–07, accessibility needs, alternative input conditions og begrundede preference reversals. Den er formativ Product-/usability-evidens, ikke clinical validation eller clinical-readiness evidence.

## 8. Acceptance for “ready to build”

PDR-010 kan først klassificeres `READY FOR BOUNDED BUILD HANDOFF`, når følgende er repository-verificerbart:

1. Architecture har returneret en dokumenteret API-017-disposition for state reconciliation, output projections, assessment authority, phrase provenance og knee/MSK-boundary.
2. Product har indarbejdet alle material Architecture constraints uden at udvide scope.
3. Én C3-prototypeversion, én C2-control identity, én synthetic knee fixture og sammenlignelige tasks er fastlagt.
4. STANDARD/QUICK target-output fixtures er versionslåst, mærket synthetic og clinical-reviewed som evalueringsinput uden guidance-claim.
5. Plan-, Follow-up- og Safety-net-phrase fixture har navngiven competent Clinical Safety/Governance review eller er blokeret; Product opfinder ikke clinical content.
6. State mapping dokumenterer facts, uncertainty, clinician Assessment, selected phrases, provenance og output intent uden canonical production-model change.
7. Acceptance, negative cases, keyboard matrix, instrumentation og evidence-capture er specificeret.
8. Explicit no-real-data/no-clinical-use/no-referral/no-CDS scope er synligt.
9. Steering har autoriseret den afgrænsede Build-slice gennem et separat authority record.
10. Et repository-resident Product-to-Build-handoff refererer PDR-010, Architecture-responsen og den autoriserede scopeversion.

Før alle ti punkter er opfyldt, er C3 `NOT BUILD-AUTHORIZED`.

## 9. Architecture disposition — API-017

Product bad Architecture vurdere, ikke implementere:

1. Kan C3 isoleres som en learning projection over eksisterende prototype-state, og hvilke prototype-lokale state additions er eventuelt nødvendige for structured Assessment, phrase provenance og output intent uden canonical production-model change?
2. Hvilke invariants skal sikre, at facts, clinician-owned Assessment, selected phrases, derived considerations og document projections forbliver semantisk adskilte?
3. Hvordan skal Quick og Standard referere til samme state/version og propagere correction, stale, invalidation eller re-review uden history rewrite?
4. Hvilken minimal provenance skal følge en selected/edited/removed phrase, så output ikke fejlattribuerer source, actor, communication, agreement eller action?
5. Kan blank/negative/not assessed/not performed/not assessable bevares gennem workspace, completeness og begge outputprojektioner uden ny canonical semantics?
6. Hvilken isolation skal adskille kandidat-genbrugelige MSK workflow concepts fra det knee-specific content pack, så prototypen ikke fastlægger ny domain ownership eller generalization?

Architecture returnerede [API-017 v1.0](../../architecture/reviews/API-017-C3-ARCHITECTURE-DISPOSITION-v1.0.md) med `MATERIAL CONSTRAINTS` og `BUILDABLE AS BOUNDED C3`. Product har indarbejdet responsen i C3-PBH-001/C3-FIX-001. Architecture-responsen er ikke Build-authority eller clinical content approval.

## 10. Later isolated tracks

### Output learning track — after C3

Referrals, fysioterapi-output og kodeforslag forbliver et separat, senere Product/Architecture-spor. Hvert output kræver eget user job, recipient, purpose, source fields, provenance, transformation, missing-state, review/approval og delivery boundary. C3 må ikke forberede skjulte generators, mappings eller UI-pladsholdere til disse outputs.

### Clinical decision-support track — separate safety track

Clinical decision support, diagnostic suggestions og treatment recommendations kræver et særskilt kildebaseret spor med Clinical Safety/Governance- og Architecture-review, source provenance, uncertainty, false-positive/negative scenarios, rejection og explicit Human Decision authority. Intet CDS-indhold eller capability-design indgår i C3.

De to spor må ikke kombineres med C3-evalueringen eller bruges til at gøre C3 mere attraktiv i comparator-testen.

## 11. Build boundary and next gate

PDR-010 autoriserer ingen kodeændring, prototypeimplementation, commit, push eller Build-start.

Den næste gate er:

> **Separate Steering Build authority for the exact Product-released C3 scope and fixture version.**

Human clinical phrase review og final Product/API-017 reconciliation er gennemført. Product-to-Build-handoffet er released til Steering authorization. Build må først starte, når Steering har udstedt et separat authority record for den eksakte C3-scope- og fixtureversion.

## 12. Traceability and exit condition

### Evidence chain

`C2 control → C2.2 technical baseline → P03 internal founder evidence → Steering C2.2 closure/C3 direction → PDR-010 → API-017 Architecture review → separate Steering/Build authority → one version-locked C3 prototype → founder pilot → separately authorised external clinician evaluation → C3 learning report → Steering disposition`

### C3 learning exit

C3 er beslutningsklart, når:

1. H-C3-01 er supported, weakened, falsified eller unresolved med traceable evidence;
2. C3-LO01–08 er rapporteret med negative cases og evidensbegrænsninger;
3. C2/C3-comparisonen anvender samme fact-state og sammenlignelige tasks;
4. facts, Assessment, phrases, projections og authority attribution forbliver forståeligt adskilte;
5. uncertainty og correction impact er bevaret uden false reassurance;
6. external clinician evidence foreligger eller evidenshullet bæres eksplicit;
7. output- og CDS-spor fortsat er isoleret; og
8. Product kan anbefale proceed, revise eller stop uden at basere konklusionen på founderpræference eller teknisk pass alene.

Ingen founder-walkthrough, prototypebaseline eller bestået test opfylder exit condition alene.
