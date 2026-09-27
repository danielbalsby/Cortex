# Governance & Traceability Architecture v1.0

## Dokumentkontrol

| Felt | Værdi |
|---|---|
| Titel | Governance & Traceability Architecture v1.0 |
| Dokument-ID | TODO — afventer det formelle ID-system, jf. GI-013 |
| Version | 1.0 |
| Status | Proposed — ikke aktivt; statusrelationen til den kontrollerede lifecycle afventer GI-018 |
| Dato | 2026-07-21 |
| Ansvarlig forfatter | Chief Software Architect |
| Governance-ejer | TODO — navngiven person og godkendende organ, jf. GI-012 |
| Normativ placering | Tværgående arkitektur under de ratificerede governance-artefakter, Cortex Specification v1.0 og Software Architecture Baseline v1.0 |
| Referenceimplementering | [Capability Architecture CA-001 v1.0](./capabilities/CA-001-Knowledge-Retrieval-v1.0.md) |
| Officiel skabelon | [Capability Architecture Template](./capabilities/CAPABILITY-ARCHITECTURE-TEMPLATE.md) |

## Formål, mandat og afgrænsning

Dette dokument fastlægger den tværgående logiske arkitektur, som alle Cortex-capabilities skal anvende til governance, provenance, audit, traceability, evidence, capability contracts og verification.

Dokumentet:

- generaliserer allerede etablerede mønstre fra de autoritative governance-artefakter, Cortex Specification v1.0, Software Architecture Baseline v1.0 og CA-001;
- gør ikke CA-001's konkrete capability til en generel model og genbeskriver ikke dens domæne;
- introducerer ikke nye governanceprincipper;
- vælger ikke repositoryteknologi, database, cloud, API, komponenter eller UI;
- autoriserer ikke implementation, release, klinisk evaluering eller klinisk anvendelse;
- kan ikke tilsidesætte en upstream-kilde.

Ved konflikt gælder den dokumentrang og ændringskontrol, som er fastlagt i governance-baselinen. Et arkitekturvalg må ikke lokalt udfylde et normativt hul. Hullet registreres som et Governance Issue.

### Autoritative kilder

1. Cortex Philosophy.
2. Ratificeringsbetænkning for Cortex Constitution.
3. Cortex Governance Framework v1.0.
4. Stress Test — Cortex Governance Framework v1.0.
5. Cortex Specification v1.0.
6. [Cortex Software Architecture Baseline v1.0](./CORTEX-SOFTWARE-ARCHITECTURE-BASELINE-v1.0.md).
7. [ADR-003 — Traceability Model](./decisions/ADR-003-Traceability-Model.md), status Proposed.
8. [Capability Architecture CA-001 v1.0](./capabilities/CA-001-Knowledge-Retrieval-v1.0.md), som referenceimplementering.

## 1. Traceability Model

### 1.1 Den komplette sporbarhedskæde

```text
Philosophy
    ↓
Constitution
    ↓
Governance
    ↓
Specification
    ↓
Capability
    ↓
Architecture
    ↓
Implementation
    ↓
Evidence
    ↓
Verification
    ↓
Audit
```

Kæden er både fremadrettet og bagudrettet:

- Fremadrettet viser den, hvordan et princip bliver til kontrolleret og verificerbar systemadfærd.
- Bagudrettet viser den, hvorfor en implementation eksisterer, hvilket krav den realiserer, og hvilken autoritet kravet har.
- Tværgående relationer viser afhængigheder, konflikter, alternativer, undtagelser og dissent.
- Audit og organisatorisk læring kan udløse en kontrolleret ændring, men må ikke direkte omskrive et upstream-artefakt.

### 1.2 Sporbarhedsnoder

| Lag | Identificerbar node | Minimumsbetydning |
|---|---|---|
| Philosophy | Filosofisk udsagn eller afsnit | Fortolkningsramme; kan ikke alene fungere som implementeringskrav |
| Constitution | Artikel, pligt, rettighed eller ufravigeligt princip | Højeste bindende norm efter den ratificerede rangorden |
| Governance | LEX-, PP-, GOV- eller DP-artefakt og kontrolleret beslutning | Operationaliserer autoritet, proces, lifecycle og gate |
| Specification | Krav, capability, NFR, informationskrav eller prohibition | Definerer verificerbar systemforpligtelse |
| Capability | Versioneret capability-kontrakt | Afgrænser ansvar, input, output, invarians og fejl |
| Architecture | Baseline, capability architecture eller ADR | Allokerer logisk ansvar uden at ændre upstream-krav |
| Implementation | Kode, konfiguration, model, policy eller build-artefakt | Realiserer en accepteret arkitektonisk beslutning |
| Evidence | Identificeret evidensrecord | Dokumenterer kilde, beslutning, udførelse eller observeret resultat |
| Verification | Versioneret test, review, analyse eller gate-resultat | Sammenholder observeret adfærd med et eksplicit kriterium |
| Audit | Audit-event, rekonstruktion eller rapport | Vurderer sporbarhed, overholdelse og beslutningsintegritet |

Abstrakte normer må ikke forbindes direkte til kode på en måde, der skjuler manglende Specification-, Capability- eller Architecture-led.

### 1.3 Relationstyper

Alle relationer skal være eksplicitte, retningsbestemte og versionbundne. Minimumsrelationer er:

- `derives-from` — en kontrolleret afledning fra en upstream-kilde;
- `constrains` — en bindende begrænsning på et downstream-artefakt;
- `specifies` — et krav definerer forventet capability eller adfærd;
- `realizes` — arkitektur eller implementation realiserer et upstream-krav;
- `depends-on` — funktionel, informationsmæssig eller governance-mæssig afhængighed;
- `verified-by` — et krav eller en kontrakt verificeres af et defineret verification-artefakt;
- `produces-evidence` — en udførelse producerer en identificeret evidensrecord;
- `audited-by` — et artefakt, en beslutning eller en evidenskæde indgår i audit;
- `supersedes` — en version erstatter en tidligere version uden at slette historikken;
- `conflicts-with` — en uløst modstrid er synlig;
- `dissents-from` — dokumenteret faglig eller governance-mæssig dissent;
- `excepts` — en tids-, scope- og autoritetsafgrænset undtagelse.

Relationen skal mindst angive kilde-ID og -version, mål-ID og -version, relationstype, scope, status og registreringstidspunkt. Hvor relevant angives ejer, godkendende instans, begrundelse og ophørsbetingelse.

### 1.4 Sporbarhedsinvarianter

1. Enhver release-relevant implementation skal kunne spores bagud til et aktivt, gældende krav og en accepteret arkitektonisk beslutning.
2. Ethvert verificerbart krav skal kunne spores fremad til verification og evidens eller være eksplicit markeret som ikke implementeret.
3. En relation til en forældet, tilbagetrukket, omstridt eller manglende version skal være synlig og må ikke behandles som en gyldig aktiv relation.
4. En ændring af en node skal udløse impact-analyse af alle direkte og transitive downstream-relationer.
5. Historiske relationer må ikke overskrives. Rettelser sker ved ny version, korrektion eller supersession.
6. Ukendt, ikke vurderet og ikke relevant er forskellige semantiske tilstande.
7. En evidensrecord beviser kun det kriterium, den faktisk er produceret imod.
8. Sporbarhed beviser ikke i sig selv korrekthed, klinisk validitet eller governance-godkendelse.
9. Afvigelser, konflikter, undtagelser og dissent må ikke skjules i fritekst uden identificerbar relation.
10. Risikoafhængige release gates skal kunne blokere videre progression ved brudt eller utilstrækkelig sporbarhed.

### 1.5 Impact og rekonstruktion

En impact-analyse skal kunne besvare:

- Hvilke downstream-krav, capabilities, arkitekturbeslutninger, implementationer, tests, evidensrecords og audits påvirkes af denne ændring?
- Hvilke upstream-kilder legitimerer dette artefakt?
- Hvilke relationer er brudte, forældede, tvetydige eller ikke verificerede?
- Hvilken version var gældende på et bestemt beslutnings- eller udførelsestidspunkt?
- Hvem eller hvad foretog ændringen, under hvilken autoritet og med hvilket resultat?

Den konkrete lagring, grafrepræsentation og visualisering er et senere designvalg og må ikke fastlægges her.

## 2. Provenance Architecture

Provenance beskriver oprindelse og transformationshistorik. Traceability beskriver relationen til autoritative krav og downstream-realisering. Audit anvender begge til rekonstruktion og kontrol.

### 2.1 Fælles provenance-envelope

Ethvert provenance-relevant artefakt skal, proportionalt med risiko og type, kunne forbindes med:

- stabil identitet, artefakttype, version og status;
- oprindelig kilde, aktør eller system;
- aktørens rolle og autoritet;
- formål, scope, jurisdiktion og anvendelsesbegrænsning;
- registreringstid og, hvor relevant, effektiv tid;
- versionerede inputreferencer;
- transformationens identitet, version og konfiguration;
- outputtype og outputidentitet;
- usikkerhed, begrænsninger, konflikter og kendte mangler;
- samtykke, autorisation eller adgangsgrundlag, når relevant;
- relation til korrektion, tilbagetrækning eller supersession;
- integritetsstatus og korrelations-/trace-identitet.

Kravet er logisk. Det foreskriver ikke et bestemt dataschema eller lagringssystem.

### 2.2 Kildeprovenance

En kilde skal kunne vurderes ud fra identitet, version, oprindelse, aktualitet, scope, formål og integritet. Eksternt indhold er ikke betroet alene, fordi det kan hentes eller parses. Modtagende capability skal validere kildens kontrakt og bevare dens begrænsninger.

Klinisk eller epistemisk kildeevidens skal holdes semantisk adskilt fra verification-evidens produceret af softwaretests.

### 2.3 Beslutningsprovenance

En beslutningsrecord skal skelne mellem:

- observation eller input;
- maskinel transformation eller forslag;
- menneskelig vurdering;
- autoriseret beslutning;
- efterfølgende handling.

Recorden skal bevare beslutter, rolle, autoritet, tidspunkt, relevante alternativer, begrundelse, anvendt evidens, usikkerhed og eventuel dissent. Et forslag bliver aldrig en beslutning alene ved at blive vist, gemt eller accepteret af en teknisk proces.

### 2.4 Transformationsprovenance

Enhver transformation, der kan påvirke et beslutningsgrundlag, skal kunne reproduceres eller forklares fra:

- identificerede og versionerede input;
- transformationens regel-, policy-, model- eller procesversion;
- relevant konfiguration;
- ordnet transformationsforløb;
- fejl, fallback og degraded state;
- produceret output og dets begrænsninger.

Determinisme kræves, hvor capability-kontrakten kræver reproducerbar adfærd. Hvor variation er tilladt, skal variationen og dens kontrol være eksplicit.

### 2.5 AI-output

AI-output skal registreres som maskinelt produceret output — ikke som evidens, fakta, autoritet eller menneskelig beslutning. Provenance skal, hvor anvendeligt, omfatte:

- model- og modelversionsidentitet;
- prompt-, instruktion- og konfigurationsversion;
- anvendte data- og evidensreferencer;
- relevante værktøjs- og transformationskald;
- outputtidspunkt;
- kendt variation og reproducerbarhedsbegrænsning;
- efterfølgende menneskelig vurdering, redigering eller afvisning.

AI-output må ikke skjule sit kildegrundlag eller silently blive ophøjet til et mere autoritativt semantisk lag.

### 2.6 Menneskelige ændringer

En menneskelig ændring skal bevare:

- aktør og rolle;
- før- og eftertilstand eller tilsvarende verificerbar ændringsrecord;
- tidspunkt;
- begrundelse proportionalt med risiko;
- relation til det berørte artefakt og dets version;
- om ændringen er korrektion, draft override, beslutning, annotation eller godkendelse.

En redigeret tekst må ikke uden eksplicit autoriseret transition blive behandlet som registreret fakta. Den oprindelige maskinelle generering og den menneskelige ændring skal kunne skelnes.

### 2.7 Korrektion, supersession og retention

Provenance-relevant historik må ikke destruktivt overskrives. Korrektion og supersession skal bevare den tidligere record, den nye record, relationen mellem dem og den gældende status. Retention, adgang og sletning skal følge klassifikation, formål, juridiske krav og gældende governance; konkrete perioder kan ikke fastlægges uden en godkendt policy.

## 3. Capability Identity

### 3.1 Identitetsrecord

Hver capability skal have én autoritativ identitetsrecord med:

| Felt | Regel |
|---|---|
| Capability ID | Stabilt, unikt ID tildelt af den autoritative Specification; nuværende form er `CAP-<mnemonic>` |
| Titel | Den gældende capability-betegnelse fra Specification |
| Version | Semantisk version, bundet til den konkrete kontrakt |
| Status | En eksplicit status fra den kontrollerede lifecycle |
| Owner | Navngiven ansvarlig person og godkendende organ |
| Dependencies | Type-, retning-, scope-, versions- og statusbundne relationer |
| Upstream references | Gældende requirements, governance- og specification-referencer |
| Architecture reference | Identificeret Capability Architecture-version |
| Verification reference | Gældende acceptance- og verification-artefakter |

Architecture må ikke opfinde en ny capability-identitet. En ny capability kræver først en kontrolleret Specification-ændring efter den gældende ændringsproces.

### 3.2 Capability og Capability Architecture er forskellige identiteter

- `CAP-*` identificerer capabilityen og dens kontrakt.
- `CA-*` identificerer arkitekturdokumentet, der realiserer eller afgrænser capabilityen logisk.

Et CA-dokument må ikke blive den skjulte autoritative kilde for capabilityens eksistens eller scope. Det formelle ID-system for arkitekturartefakter afventer GI-013.

### 3.3 Version

Versionen skal:

- følge den governance-definerede semantiske versionering;
- være bundet til et eksplicit kontraktscope;
- udløse downstream impact-analyse ved ændring;
- bevare historiske relationer;
- skelne capabilityversion, arkitekturversion og implementationversion.

En implementation må kun hævde overensstemmelse med den capabilityversion, der faktisk er verificeret.

### 3.4 Status

Den autoritative governance-lifecycle anvender NOTE, DRAFT, REVIEW, RATIFIED, ACTIVE, SUPERSEDED, RETIRED og CONTESTED. Eksisterende Build-artefakter anvender også `Proposed`. Der findes ikke en ratificeret mapping mellem disse.

**GI-018 — Status `Proposed` er ikke defineret i den kontrollerede lifecycle**

- Beskrivelse: Architecture Baseline, ADR'er og capability-arkitektur anvender en status, som Governance Framework ikke definerer.
- Konsekvens: Artefakternes gate-position og godkendelsesbetydning kan ikke udledes entydigt.
- Governance-review: Beslut om `Proposed` skal indføres, mappes til en eksisterende status eller erstattes gennem kontrolleret migration.
- Midlertidig begrænsning: `Proposed` behandles som ikke-aktiv og kan ikke alene være releasegrundlag.

### 3.5 Owner og dependencies

Owner skal være en navngiven ansvarlig person kombineret med det organ, der har godkendelseskompetence. Et teamnavn alene opfylder ikke kravet.

En dependency-record skal mindst angive:

- upstream- og downstream-ID samt version;
- afhængighedstype;
- kontrakt og forventet status;
- failure effect og degraded behavior;
- ejer;
- om afhængigheden er release-blokerende.

Implicitte afhængigheder er arkitekturgæld og skal gøres synlige før acceptance.

## 4. Evidence Architecture

### 4.1 Evidenstyper må ikke sammenblandes

| Evidenstype | Formål | Må ikke påstå |
|---|---|---|
| Kilde-/epistemisk evidens | Understøtter faglige eller kliniske udsagn | At softwareimplementationen er korrekt |
| Design-/beslutningsevidens | Dokumenterer alternativer, rationale og godkendelse | At runtime-adfærd er verificeret |
| Verification-evidens | Dokumenterer udført test, review eller analyse mod kriterium | Klinisk validitet ud over testens scope |
| Operationel evidens | Dokumenterer observeret drift, hændelser og outcomes | At alle krav generelt er opfyldt |
| Governance-evidens | Dokumenterer gates, approvals, dissent og undtagelser | At et teknisk resultat i sig selv er fagligt korrekt |

### 4.2 Evidenskæden

```text
Acceptance Test
    ↓ defines expected criterion
Verification
    ↓ executes and records observation
Evidence
    ↓ preserves result, provenance and limitations
Audit
    ↓ reconstructs and assesses
Controlled governance or release decision
```

Acceptance Test er en versioneret definition. Verification er en konkret udførelse eller vurdering. Evidence er den uforanderlige record af udførelsen og dens resultat. Audit vurderer kæden; audit må ikke rekonstruere manglende evidens ved antagelse.

### 4.3 Minimum for en verification-evidensrecord

Recorden skal proportionalt med risiko indeholde:

- evidence-ID og version/status;
- requirement-, capability- og architecture-reference med version;
- system-, build-, model-, policy- og dataversioner, når relevante;
- environment og relevante konfigurationsværdier;
- inputdatasæt eller kontrolleret reference;
- forventet kriterium;
- observeret resultat;
- pass, fail, blocked eller not-run som særskilte tilstande;
- udførelsestidspunkt;
- udførende aktør eller system samt reviewer, når påkrævet;
- fejl, afvigelser, begrænsninger og usikkerhed;
- integritets- og provenance-referencer;
- relation til efterfølgende korrektion eller rerun.

### 4.4 Acceptance og gates

Acceptance kræver:

1. et identificeret upstream-krav;
2. et eksplicit, målbart kriterium;
3. en identificeret capability- og implementationversion;
4. en udført verification;
5. gyldig evidens med intakt provenance;
6. det krævede review eller gate efter risikoklasse;
7. ingen uafklaret release-blokerende konflikt.

Et grønt testresultat er ikke i sig selv en releasebeslutning. En releasebeslutning er en separat, autoriseret governance-handling.

### 4.5 Audit

Audit skal kunne rekonstruere:

- hvilken norm, specification og capabilitykontrakt der var gældende;
- hvilken architecture og implementation der blev vurderet;
- hvilken evidens og verification der blev anvendt;
- hvem der traf hvilke beslutninger under hvilken autoritet;
- hvilke konflikter, undtagelser, begrænsninger og dissent der eksisterede;
- om efterfølgende ændringer eller hændelser påvirker den tidligere konklusion.

Audit må være uafhængig af den capability, der producerer det primære output, og må ikke være afhængig af skjult eller flygtig state.

## 5. Governance Flow

### 5.1 Kontrolleret ændringsflow

```text
Observation, krav eller hændelse
    ↓
Klassifikation, risikovurdering og applicability
    ↓
Impact-analyse i traceability-modellen
    ↓
Korrekt upstream governance- eller specification-artefakt
    ↓
Capability-kontrakt
    ↓
Architecture og eventuel ADR
    ↓
Implementation
    ↓
Verification og evidence
    ↓
Uafhængig gate, audit og releasebeslutning
    ↓
Monitoring, hændelser og institutional learning
    ↺ kontrolleret ændringsforslag
```

En downstream-ændring må ikke omgå et nødvendigt upstream-led. Driftserfaring eller AI-output kan udløse et forslag, men ikke automatisk ændre governance, specification eller capabilitykontrakt.

### 5.2 Ændringskontrol

For enhver ændring skal processen:

1. identificere change owner og autoritet;
2. klassificere ændringstype og risiko;
3. fastslå berørte artefakter, versioner og relationer;
4. registrere proposal, rationale, alternativer og dissent;
5. opdatere det højeste nødvendige upstream-artefakt først;
6. kontrollere downstream-konsistens;
7. udføre proportional verification;
8. producere evidens;
9. indhente påkrævede approvals uden selv-godkendelse;
10. bevare tidligere versioner og rollback-/recovery-grundlag.

Emergency change og exception følger egne governance-processer og må ikke blive en uregistreret normalvej.

## 6. Cross-cutting Constraints

Følgende begrænsninger gælder for alle capabilities:

| ID | Bindende begrænsning |
|---|---|
| GTA-XC-001 | Ukendt, fraværende, ikke vurderet og negativt svar skal være forskellige tilstande. Ingen default må blive fakta. |
| GTA-XC-002 | Maskinelle forslag, menneskelige vurderinger, autoriserede beslutninger og udførte handlinger skal være semantisk adskilt. |
| GTA-XC-003 | Enhver beslutningsrelevant transformation skal have versionsbundet provenance og kunne forklares eller reproduceres inden for kontraktens krav. |
| GTA-XC-004 | Klinisk, juridisk eller normativ logik må ikke skjules i generiske komponenter, modeller eller uigennemsigtige defaults. |
| GTA-XC-005 | Alle inputs skal valideres ved trust boundary; tidligere gyldig state må ikke korrumperes af ugyldige updates. |
| GTA-XC-006 | Fejl, usikkerhed, konflikt, degraded state og manglende information skal være eksplicitte og må ikke præsenteres som succes. |
| GTA-XC-007 | En capability skal bevare sin godkendte kontrakt for input, output, preconditions, postconditions, invarians og fejltilstande. |
| GTA-XC-008 | Implementation og verification skal kunne spores bagud til gældende krav og fremad til evidens og audit. |
| GTA-XC-009 | Eksterne data, modeller og systemer er ikke implicit betroede; autoritet følger ikke automatisk med data. |
| GTA-XC-010 | AI-output må ikke fungere som selvstændig autoritet, evidens, fakta eller beslutning. |
| GTA-XC-011 | Menneskelig kontrol, autorisation og ansvar må ikke erstattes af convenience eller automatisering. |
| GTA-XC-012 | Privacy, security, purpose limitation, dataminimering og adgangskontrol skal håndhæves efter klassifikation og gældende policy. |
| GTA-XC-013 | Historik, dissent, undtagelser og korrektioner skal bevares auditabelt; de må ikke skjules gennem destruktiv overskrivning. |
| GTA-XC-014 | Læring fra drift må kun ændre systemadfærd gennem kontrolleret governance-, specification- og verification-flow. |
| GTA-XC-015 | Release gates og verification skal være proportionale med risiko og kunne blokere progression. |
| GTA-XC-016 | Capabilityafhængigheder skal være eksplicitte; downstream capability skal validere modtaget kontrakt og håndtere failure/degraded state. |
| GTA-XC-017 | En capability må ikke hævde klinisk validitet, regulatorisk godkendelse eller bredere scope end den identificerede evidens og autorisation understøtter. |
| GTA-XC-018 | Arkitektur skal forblive teknologineutral, indtil et teknologivalg er truffet i et autoriseret design eller ADR. |

ID'erne er dokumentlokale arkitekturhenvisninger og udgør ikke det manglende repository-wide ID-system, jf. GI-013.

## 7. Trust Model

### 7.1 Grundmodel

Trust er ikke binært og ikke transitivt. Hver grænse vurderes mindst på:

- identitet;
- autorisation;
- integritet;
- provenance;
- version og status;
- aktualitet;
- scope, formål og jurisdiktion;
- dataklassifikation;
- usikkerhed og konflikt;
- capability-kontrakt.

En upstream-validering fritager ikke en downstream-capability fra at validere sin egen kontrakt.

### 7.2 Generelle trust boundaries

| Grænse | Modtagers pligt | Tilladt indflydelse |
|---|---|---|
| Menneskelig aktør → Cortex | Autentificér rolle og autoritet; validér input og hensigt | Kun handlinger inden for autoriseret scope |
| Ekstern kilde/system → capability | Validér identitet, version, integritet, provenance og kontrakt | Data kan informere; autoritet skal komme fra særskilt governance |
| Capability → capability | Validér versioneret outputkontrakt og status | Kun det eksplicitte outputscope |
| Governance/control plane → capability | Validér aktiv policy, version, applicability og ikrafttræden | Bindende constraints inden for policyens autoritet |
| Capability → evidence/audit | Bevar provenance, relationer, fejl og begrænsninger | Producerer record; må ikke selvgodkende |
| Runtime → verification/monitoring | Adskil observation fra konklusion og beskyt integritet | Observation kan udløse verification eller change proposal |
| Menneskelig ændring → systemstate | Registrér actor, rolle, ændringstype og før/efter | Kun eksplicit autoriseret state-transition |
| AI/model → capability | Behandl output som ubetroet, probabilistisk eller begrænset input efter kontrakten | Forslag eller transformation; aldrig selvstændig beslutningsautoritet |

### 7.3 Beslutningsautoritet

Data, evidens, forslag og beslutningsautoritet er forskellige størrelser. En aktør eller et system må kun påvirke det beslutningspunkt, som dets eksplicitte rolle og capabilitykontrakt tillader. Ingen teknisk integration må udvide den autoritet.

## 8. Architecture Rules

Alle fremtidige Capability Architecture-dokumenter skal:

1. anvende den officielle skabelon i dette dokumentkompleks;
2. referere præcist til én eksisterende autoritativ Capability ID og version;
3. angive upstream governance-, specification- og requirement-referencer;
4. afgrænse formål, scope og non-scope uden at introducere nye principper;
5. definere typed inputs, outputs, preconditions, postconditions, invarians og fejltilstande;
6. beskrive domæneobjekter og autoritative aggregates logisk;
7. allokere ansvar til logiske komponenter uden skjulte service- eller teknologivalg;
8. beskrive informationsflow, transformationspunkter og beslutningsautoritet;
9. identificere alle trust boundaries og kontraktvalideringer;
10. beskrive dependencies, failure propagation og degraded behavior;
11. definere acceptance-scenarier, herunder positive, negative, edge-, konflikt-, replay- og failure-scenarier proportionalt med risiko;
12. forbinde hvert verification-scenarie til krav, capabilityversion og forventet evidens;
13. indeholde en versionsbundet traceability-matrix;
14. registrere capability-specifikke risici, Governance Issues og uløste afhængigheder uden lokale antagelser;
15. skelne design-readiness, implementation-readiness, release-readiness og klinisk/regulatorisk readiness;
16. bevare uncertainty, provenance, dissent og human decision authority;
17. dokumentere alle afvigelser fra Architecture Baseline gennem en autoriseret ADR eller Governance Issue;
18. undlade teknologi-, database-, cloud-, API- og UI-valg, medmindre dokumentets godkendte mandat og en accepteret beslutning eksplicit tillader dem;
19. undlade at påstå verification, acceptance eller validitet uden tilhørende evidens;
20. være reviewbart uafhængigt af implementeringskoden.

Et CA-dokument, der ikke opfylder disse regler, er ikke klar til architecture acceptance.

## 9. Officiel Capability Architecture-skabelon

Den officielle skabelon er [CAPABILITY-ARCHITECTURE-TEMPLATE.md](./capabilities/CAPABILITY-ARCHITECTURE-TEMPLATE.md).

Skabelonen er den obligatoriske struktur for CA-002, CA-003 og efterfølgende capability-arkitekturer. CA-001 er referenceimplementeringen for den første anvendelse af mønsteret; fremtidige dokumenter skal følge den generaliserede skabelon og dette dokuments tværgående constraints.

Skabelonen kræver:

- dokumentkontrol og capability identity;
- scope og upstream-traceability;
- capability contract;
- domain model;
- responsibility allocation;
- information flow og beslutningspunkter;
- trust boundaries;
- verification- og evidence-strategi;
- risks, Governance Issues og dependencies;
- særskilt readiness-vurdering;
- completion checklist.

En skabelonplaceholder må ikke udfyldes ved gæt. Ukendt metadata markeres TODO og registreres som issue, hvis den blokerer acceptance.

## 10. Readiness

### 10.1 Vurdering

| Område | Vurdering | Begrundelse |
|---|---|---|
| Governance-mønster | Tilstrækkeligt til logisk capability-design | Autoritets- og ændringsflow kan generaliseres, men governance-intermediates og ejerskab mangler fortsat |
| Traceability | Tilstrækkeligt til konsistent design | Node-, relations- og invariansmodel er fastlagt; register-/lagringsdesign og ADR-003 acceptance mangler |
| Provenance | Tilstrækkeligt til kontraktdesign | Obligatorisk informationsindhold er afgrænset; konkret schema og retention policy mangler |
| Evidence og verification | Tilstrækkeligt til at designe acceptance | Evidenskategorier og kæde er fastlagt; verificeringsarkitektur og QMS-gates mangler |
| Capability identity | Delvist klar | Specification giver Capability IDs; CA-ID-standard, owner og `Proposed`-status kræver governance-afklaring |
| Trust model | Tilstrækkeligt til logisk design | Generelle grænser og valideringspligt er fastlagt; security- og identity-arkitektur mangler |
| Implementation readiness | Ikke generelt opnået | Skal afgøres capability for capability efter risikoklasse og løste blockers |
| Release readiness | Ikke opnået | Kræver accepterede beslutninger, verification-evidens og governance gates |

### 10.2 Resterende blockers

Denne arkitektur lukker ikke de eksisterende Governance Issues GI-010–GI-017. Følgende forhold er fortsat relevante:

- manglende PP-/DP-intermediates og konkret capability-authority;
- uafklaret klinisk/regulatorisk klassifikation, QMS, gate- og sign-off-model;
- ufuldstændigt formelt ID- og traceability-register;
- manglende navngivne owners og approving bodies;
- manglende accepterede ADR'er for canonical sources og traceability;
- manglende konkrete security-, data-, verification- og deployment-arkitekturer;
- GI-018 om status `Proposed`.

### 10.3 Konklusion

**Cortex har nu en tilstrækkelig tværgående logisk arkitektur til, at CA-002, CA-003 og efterfølgende capabilities kan designes konsistent uden at genopfinde governance, provenance, audit eller traceability.**

Dette er design-readiness, ikke implementation- eller release-readiness. Hver capability skal fortsat dokumentere sin egen kontrakt, risikoklasse, dependencies, verification, evidens og nødvendige approvals. Capabilities må ikke implementeres eller aktiveres alene på grundlag af denne konklusion.

## 11. Kildesporbarhed

| Dette dokument | Upstream-grundlag |
|---|---|
| §1 Traceability Model | Governance Framework §§4–6 og §16; Specification TRC-001–TRC-005, NFR-AUD-001 og §18; Architecture Baseline §§2, 4, 7 og 9; ADR-003 |
| §2 Provenance Architecture | Constitutionens epistemiske og menneskelige integritetskrav; Governance Framework §§5–6 og §18; Specification CAP-EVD, CAP-AUD, INF-001–INF-005 og PRO-krav; Architecture Baseline §§1–5 |
| §3 Capability Identity | Governance Framework §6–7; Specification capability-register og §19; Architecture Baseline §§6–7; GI-012 og GI-013 |
| §4 Evidence Architecture | Governance Framework §§5, 16 og 18; Specification TRC-krav, CAP-EVD, CAP-AUD og verification-handoff; Architecture Baseline §§2, 5 og 9 |
| §5 Governance Flow | Governance Framework §§7, 15, 16 og 18; Specification CAP-GOV og lifecycle; Architecture Baseline §§4, 6 og 8 |
| §6 Cross-cutting Constraints | Philosophy, Constitution, Governance Framework, Specificationens capabilities/NFR/prohibitions og Architecture Baseline §§1–5 |
| §7 Trust Model | Constitutionens autoritets- og integritetskrav; Governance Frameworks rolle- og kontrollag; Specificationens information-, provenance-, security- og auditkrav; Architecture Baseline §§3–5 |
| §8 Architecture Rules | Architecture Baseline §§1, 4, 6, 7, 9 og 10 samt det generaliserbare dokumentmønster i CA-001 |
| §9 Template | Architecture Baseline og det generaliserbare strukturmønster i CA-001 |
| §10 Readiness | Build Baseline, Governance Adoption Report v2.0, Architecture Baseline §10 og åbne Governance Issues |

Hvor en upstream-reference endnu ikke har et stabilt repository-wide traceability-ID, er henvisningen dokument- og sektionsbaseret. Dette er en kendt begrænsning under GI-013.
