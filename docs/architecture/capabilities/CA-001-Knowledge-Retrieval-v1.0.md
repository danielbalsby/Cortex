# Capability Architecture CA-001 v1.0

## Knowledge Retrieval (CAP-KNR)

**Architecture ID:** CA-001

**Capability:** CAP-KNR — Knowledge Retrieval

**Version:** 1.0

**Status:** Proposed

**Responsible author:** Chief Software Architect

**Capability owner:** TODO — jf. GI-012

**Approving body:** TODO — jf. GI-011/GI-012

**Date:** 2026-07-21

**Depends on:** Cortex Software Architecture Baseline v1.0; Cortex Specification v1.0; ADR-002 and ADR-003, both Proposed

**Scope type:** Logical capability architecture. Ingen service-, API-, UI-, data storage-, cloud- eller teknologistakdesign.

## 0. Capability selection

### Valg

CA-001 anvender `CAP-KNR — Knowledge Retrieval`:

> Henter kun fra tilladte, identificerbare kilder under kontrolleret scope.

### Begrundelse

CAP-KNR er den bedst egnede første capability-reference af tre grunde:

1. **Færrest regulatoriske afhængigheder i et legitimt minimumsscope.** Capability’en kan afgrænses til retrieval af godkendte kilder uden direkte patientidentifikatorer, uden klinisk beslutning og uden autonom handling. Den er fortsat omfattet af applicability, source governance, privacy, security og audit, men kræver relativt færre kliniske og regulatoriske fortolkninger end Reasoning, Risk, Decision Support, Documentation eller Patient Communication.
2. **Ingen nødvendig teknologistak.** Specificationen definerer forespørgsel, kontekst, source policy, jurisdiction, tidspunkt, rangerede kilder, coverage, limitations og failure states uden at foreskrive søgeteknik, database, model, protokol eller deployment.
3. **Stærk demonstration af den godkendte baseline.** CAP-KNR gør AP-002, AP-004, AP-006, AP-008, AP-009 og AP-012 konkrete: kildeidentitet og status bevares, ukendt forbliver ukendt, failure er synlig, capability-kontrakten er uafhængig af komponentform, og hvert resultat er policy- og auditbundet.

### Fravalgte første kandidater

| Capability | Hvorfor den ikke vælges som CA-001 |
|---|---|
| CAP-EVD — Evidence Service | Skal forvalte kliniske claims, evidensstyrke, scope og guideline-konflikt. Det kræver mere moden evidence governance og klinisk review. |
| CAP-CTX — Context Engine | Behandler patient-, konsultations- og organisationskontekst og har derfor større privacy-, datakvalitets- og downstream-safety-afhængighed. |
| CAP-RSN / CAP-RSK / CAP-DSU | Påvirker direkte hypoteser, risiko, forslag og beslutningspunkt og kræver kliniske safety cases samt evidence- og evaluation-input. |
| CAP-ATT | Timing og suppression kan skjule eller afbryde kritiske signaler og kræver Consultation Impact Standard samt risikoproportionel safety-evaluering. |
| CAP-DOC / CAP-PCM | Producerer klinisk eller patientvendt tekst med godkendelses-, accessibility- og kommunikationsrisiko. |
| CAP-LRN | Kræver operationelle outcome-, subgroup-, incident-, governance- og change-control-sløjfer. |
| CAP-AUD | Kræver afklaret retention, privacy, identity, integrity og regulatory/QMS-boundary. |
| CAP-GOV | Er direkte afhængig af den uafklarede regulatory classification gate, risk-tier-policy og governance-aktivering. |

Valget betyder ikke, at CAP-KNR er regulatorisk neutralt eller produktionsklart. GI-010–GI-017 gælder fortsat.

## 1. Capability Scope

### 1.1 Formål

CAP-KNR skal, for en autoriseret og afgrænset forespørgsel, identificere og returnere relevante passager fra tilladte, identificerbare og versionsbundne kilder. Resultatet skal bevare source policy, jurisdiction, tidspunkt, coverage og retrieval-begrænsninger, så downstream-capabilities kan vurdere kilder uden at forveksle retrieval med klinisk sandhed.

### 1.2 Inden for scope

- Modtage en formåls- og use-case-afgrænset forespørgsel.
- Binde forespørgslen til en bestemt version af source policy og source registry.
- Identificere hvilke kilder der er tilladte for use case, jurisdiction og tidspunkt.
- Hente relevante passager fra identificerede kilder.
- Bevare source identity, version, status, type og jurisdiction.
- Rangere resultater inden for den godkendte policy.
- Angive coverage og retrieval-begrænsninger.
- Skelne lokale instrukser fra generel evidens.
- Bevare synlige konflikter mellem kilder eller scopes.
- Returnere eksplicit ukendt, utilgængelig, modstridende eller degraderet outcome.
- Publicere et tilstrækkeligt trace til CAP-AUD og berørte downstream-consumers.

### 1.3 Uden for scope

CAP-KNR må ikke:

- afgøre om en klinisk påstand er sand;
- skabe eller godkende et Evidence Object;
- fastsætte evidensstyrke eller klinisk anbefalingsstyrke;
- sammenfatte modstridende kilder til konsensus;
- skabe hypotese, risikovurdering, forslag, klinisk beslutning eller handling;
- skrive journal-, referral- eller patienttekst;
- tildele en kilde autoritet alene ud fra popularitet eller ranking;
- ændre source policy, source status eller governance-status;
- godkende nye kilder eller genaktivere retired kilder;
- bruge direkte patientidentifikatorer i CA-001-reference-scope;
- beslutte data storage, søgealgoritme, model, API, interface eller deployment; eller
- erklære regulatorisk conformity eller klinisk validitet.

CAP-EVD ejer den kliniske fortolkning af retrieved material. CAP-GOV og den autoritative source governance ejer applicability, source permission og status. CAP-AUD ejer audit-kontrakten.

### 1.4 Upstream-referencer

| Kilde | Bindende relevans |
|---|---|
| Constitution artikel 2 | Grundlag, styrke, begrænsninger, uenighed og aktualitet skal være rekonstruerbare; systemet må ikke foregive viden. |
| Constitution artikel 5 | Resultater og handlinger skal kunne udfordres og korrigeres uden tab af ansvarsspor. |
| Constitution artikel 8 | Klinisk betydende ændringer, fejl og drift kræver ejer, responstid og sikker begrænsning. |
| Governance Framework §3–6 | Forrang, no-jump, bidirektionel traceability, identity, metadata og versionering. |
| Governance Framework §14 | Provenance, scope, strength, currency, conflict og unknown-state; generative modeller er ikke autoritative kilder. |
| Governance Framework §15–16 | ADR-, build-, evaluation- og releasekrav. |
| Specification CAP-KNR | Primær capability-kontrakt. |
| CAP-KNR-001 | Source permission er versions- og use-case-specifik. |
| CAP-KNR-002 | Retrieval failure er synlig og må ikke skjules af plausibelt output. |
| CAP-KNR-003 | Lokal instruks og generel evidens skal kunne skelnes og konflikthåndteres. |
| AT-KNR-01 | Retired source anvendes ikke i nye beslutninger og udløser review af afhængigheder. |
| SPEC Information Architecture §18 og INF-001–003 | Type, provenance, authority, lifecycle og konflikter bevares. |
| SPEC NFR-REL-001, NFR-ROB-001, NFR-AUD-001, NFR-MNT-001, NFR-PRI-001 og NFR-SEC-001 | Reproducerbarhed, robusthed, audit, ownership, privacy og security. |
| Architecture Baseline | AP-002, AP-004, AP-006, AP-008, AP-009, AP-012 og AC-005/006/008–011/013/016/017/022/023. |

## 2. Capability Contract

### 2.1 Inputs

| Input | Semantik | Minimumsmetadata | Autoritet |
|---|---|---|---|
| Retrieval Query | Det spørgsmål eller informationsbehov, der skal søges efter. | Formål, use-case scope, sprog/terminologi hvor relevant, tidspunkt. | Requesting actor ejer formuleringen; query er ikke klinisk fakta. |
| Retrieval Context | Kun den kontekst der er nødvendig for relevans og scope. | Context type, provenance, aktualitet, dataminimeringsstatus. | Upstream context owner; CAP-KNR må ikke udvide konteksten. |
| Source Policy Reference | Angiver hvilke source classes, kilder og statuses der må anvendes. | Policy ID, version, status, use case, validity interval. | CAP-GOV/source governance. |
| Jurisdiction Context | Det geografiske og organisatoriske scope, som påvirker kildetilladelse og lokal instruks. | Jurisdiction identity, scope, effective time. | Autoritativ governance-/organisationskilde. |
| Decision Time | Det tidspunkt retrieval skal være reproducerbart for. | Timestamp og time authority. | Autoritativ tidskontekst. |
| Authorization Context | Identificerer requesterens rolle, tilladelse og formål. | Actor/role reference, permission scope, purpose. | Identity/authorization authority. |
| Trace Context | Binder invocation til use case, version og downstream-behov. | Correlation reference, requirement/use-case reference. | Calling capability og governance registry. |

Direkte patientidentifikatorer er ikke et legitimt input i CA-001-reference-scope. Hvis en senere use case kræver dem, ændres scope og kræver ny applicability-, privacy- og risk-classification.

### 2.2 Outputs

| Output | Semantik | Obligatorisk indhold |
|---|---|---|
| Retrieval Outcome | Den samlede eksplicitte outcome-state for forespørgslen. | Completed, insufficient, conflicting, unavailable eller degraded betydning; ingen tavs success. |
| Ranked Source Result | En identificeret source/passsage-kandidat rangeret under den bundne policy. | Source identity, version, source type, status, jurisdiction, passage reference og ranking rationale. |
| Coverage Assessment | Beskriver hvilken del af forespørgslen de retrieved resultater faktisk dækker. | Covered scope, uncovered scope og vurderingstidspunkt. |
| Retrieval Limitation | En begrænsning i kilde, query, policy, jurisdiction, aktualitet eller dependency. | Type, beskrivelse, affected scope og review/fallback-behov. |
| Source Conflict Record | Bevarer relevant konflikt mellem lokal/generel kilde, jurisdiction, version eller status. | Berørte sources, conflict type og uafgjort scope. |
| Policy Binding | Dokumenterer den policy og registry-version, der styrede retrieval. | Policy reference, registry snapshot reference og effective time. |
| Audit Trace Reference | Reference til det versionsbundne retrieval-spor. | Request, policy, consulted source identities, outcome og dependency status. |

Et Ranked Source Result er ikke et Evidence Object, en klinisk påstand, en anbefaling eller en beslutning.

### 2.3 Preconditions

Retrieval må først begynde, når:

1. use case og purpose er identificeret;
2. requesterens authorization context er valid for purpose og scope;
3. query og nødvendig retrieval context er tilstrækkeligt afgrænset;
4. jurisdiction og decision time er kendte eller eksplicit markeret ukendte;
5. en versionsbundet source policy og registry snapshot kan resolveres;
6. policy/status er anvendelig for den klassificerede use case;
7. nødvendige CAP-GOV- og CAP-AUD-dependencies har en kendt tilstand; og
8. inputtet opfylder CA-001-dataminimering og indeholder ingen direkte patientidentifikatorer.

En brudt precondition må ikke omfortolkes som et tomt, normalt eller succesfuldt retrieval-resultat.

### 2.4 Postconditions

Efter en afsluttet invocation gælder:

1. hvert returneret resultat har identificerbar source og version;
2. hvert resultat var tilladt under den registrerede policy ved decision time;
3. retired sources er ikke returneret som anvendelige nye resultater;
4. local instruction og general evidence bevarer forskellig source type og authority;
5. coverage og limitations er eksplicitte, også når resultatlisten er tom;
6. retrieval failure eller dependency failure er synlig i outcome;
7. ingen outputtype er blevet opgraderet til evidence, fact, recommendation eller decision;
8. ranking er forklaret inden for policy og er ikke lig autoritet;
9. request, policy binding, consulted source identities, outcome og failure status kan auditeres; og
10. der er ikke skabt eller ændret klinisk produktionsadfærd.

### 2.5 Invarianskrav

| ID | Invariant | Trace |
|---|---|---|
| KNR-I-01 | Source permission er bundet til use case, policyversion og decision time. | CAP-KNR-001 |
| KNR-I-02 | Ingen source uden stabil identity og version kan returneres som anvendelig. | CAP-KNR purpose; CAP-EVD-001; INF-001/002 |
| KNR-I-03 | Retrieval failure er en synlig outcome og kan ikke erstattes af plausibelt output. | CAP-KNR-002; PRO-008 |
| KNR-I-04 | Local instruction og general evidence bevarer type, jurisdiction og authority. | CAP-KNR-003; SYS-003 |
| KNR-I-05 | Konflikter bevares eller afgøres eksplicit af en autoriseret downstream-policy; CAP-KNR producerer ikke falsk konsensus. | INF-003; PRO-001 |
| KNR-I-06 | Ranking udtrykker retrieval relevance under policy, aldrig clinical truth eller epistemic authority. | CAP-KNR limitation; PRO-002/005 |
| KNR-I-07 | Empty result betyder kun no retrieved coverage under den bundne request—not fravær af relevant viden eller klinisk risiko. | AP-004; PRO-007/008 |
| KNR-I-08 | Semantik, provenance, source status og authority overlever alle capability-interne transformationer. | SPEC §18; AP-002/AP-006 |
| KNR-I-09 | Samme versionsbundne input giver reproducerbar betydning; kontrolleret variation skal være identificeret og forklaret. | NFR-REL-001 |
| KNR-I-10 | Retrieval skaber ingen klinisk beslutning, handling eller automatisk accept. | SYS-011; PRO-003 |
| KNR-I-11 | Data er formålsbegrænsede og minimerede; CA-001 behandler ikke direkte patientidentifikatorer. | INF-001; NFR-PRI-001; AP-012 |
| KNR-I-12 | Audit- eller governance-dependency failure kan ikke skjules som normal retrieval. | CAP-AUD-003; CAP-GOV-003; AP-008 |

KNR-I-labels er lokale labels i CA-001. De er ikke et nyt repository-wide ID-system og skal registreres efter den kommende ID-standard, jf. GI-013.

### 2.6 Fejltilstande

| Tilstand/betingelse | Påkrævet capability-respons | Forbudt respons |
|---|---|---|
| Query eller context er utilstrækkelig | Returnér eksplicit insufficient/unknown outcome med manglende scope. | Gæt query-intent eller lever plausibelt standardsvar. |
| Requester mangler authorization | Afvis invocation; ingen retrieval-resultater. | Delvist resultat eller implicit nedgradering af authorization. |
| Source policy eller registry kan ikke resolveres | Returnér unavailable/degraded outcome; ingen kilde behandles som tilladt pr. default. | Brug senest huskede eller hårdkodede sources uden policy. |
| Source er retired | Ekskludér den fra nye anvendelige resultater og registrér affected-dependency review. | Returnér den som current eller skjul retired status. |
| Source er expired eller contested | Bevar status og anvend CAP-GOV-policy for block/restriction/review. | Tavs anvendelse som current, uncontested source. |
| Ekstern source er utilgængelig | Vis coverage gap og dependency failure. | Konstruér passage, citation eller kildeindhold. |
| Ingen tilladt source dækker query | Returnér tomt resultatsæt med explicit no-coverage limitation. | Returnér ikke-godkendt eller populær source som erstatning. |
| Local instruction og general evidence konflikter | Returnér begge identificeret og typed, med synlig conflict record. | Sammenlæg til falsk konsensus eller vælg uden policy. |
| Source identity, version eller integrity kan ikke verificeres | Ekskludér eller degradér berørt scope efter policy. | Antag integritet ud fra plausibelt indhold. |
| Ranking kan ikke forklares under policy | Markér ranking/output som insufficient eller degraded. | Skjul ukendt ranking rationale. |
| CAP-AUD er utilgængelig | Vis audit dependency failure og anvend godkendt risk-tier-policy for block/degradation. | Udgiv normalt højrisikoresultat uden krævet audit. |
| Output varierer uden versionsændring eller forklaring | Klassificér som reproducibility failure og afgræns berørt anvendelse. | Behandl variation som normal og usporbar. |

## 3. Domain Model

### 3.1 Aggregate

#### Retrieval Execution

`Retrieval Execution` er capability’ens aggregate root. Det repræsenterer én formålsafgrænset retrieval invocation og beskytter sammenhængen mellem:

- request identity og purpose;
- authorization og jurisdiction;
- query og minimized context;
- source policy og registry snapshot;
- consulted source identities;
- retrieved passages;
- ranking rationale;
- coverage, limitations og conflicts;
- dependency states;
- outcome; og
- audit trace reference.

Aggregate-grænsen betyder ikke en database-, transaktions- eller servicebeslutning. Den fastlægger kun hvilke informationer der skal være konsistente for at kunne hævde, at ét retrieval outcome er gyldigt og reproducerbart.

En Retrieval Execution må ikke eje eller ændre Source Registry, Source Policy, Evidence Objects eller Audit Records.

### 3.2 Domæneobjekter

| Objekt | Ansvar | Ejes af |
|---|---|---|
| Retrieval Request | Samler query, purpose, use case, context, jurisdiction, time og requester. | Retrieval Execution |
| Source Policy Binding | Binder execution til præcis policy- og registry-version. | Retrieval Execution som immutable reference |
| Source Candidate | Repræsenterer en policy-tilladt source, der kan prøves. | Retrieval Execution; source truth ejes eksternt |
| Retrieved Passage | Repræsenterer en passage og dens source-reference uden at blive Evidence Object. | Retrieval Execution |
| Ranked Source Result | Forener passage, retrieval relevance og rationale. | Retrieval Execution |
| Coverage Assessment | Angiver covered og uncovered query scope. | Retrieval Execution |
| Retrieval Limitation | Angiver en eksplicit begrænsning og affected scope. | Retrieval Execution |
| Source Conflict Record | Bevarer konflikter uden at afgøre deres kliniske betydning. | Retrieval Execution |
| Retrieval Outcome | Repræsenterer samlet success/insufficiency/conflict/unavailability/degradation. | Retrieval Execution |
| Dependency Observation | Snapshot af registry-, source-, governance- og audit-dependency status. | Retrieval Execution |
| Audit Trace Reference | Binder execution til CAP-AUD’s autoritative record. | CAP-AUD; referenced by Retrieval Execution |

### 3.3 Value Objects

| Value Object | Semantisk funktion |
|---|---|
| Query Text/Intent | Formålsbundet informationsbehov; ikke en klinisk påstand. |
| Use Case Scope | Den capability-/produktkontekst source permission gælder for. |
| Purpose | Den godkendte grund til retrieval og databrug. |
| Jurisdiction | Geografisk/organisatorisk authority context. |
| Decision Time | Tidspunktet resultatet skal kunne reproduceres for. |
| Authorization Scope | Requesterens tilladte handling og datascape. |
| Source Identity | Stabil reference til identificerbar source. |
| Source Version | Version/effective interval for source content. |
| Source Type | Fx local instruction eller general evidence; typer må ikke sammenblandes. |
| Source Status | Current, expired, contested, retired eller anden governance-kontrolleret status. |
| Passage Reference | Identificerbar placering i en source-version. |
| Retrieval Relevance | Policy-bundet relation mellem query og source/passsage; ikke authority. |
| Ranking Rationale | De dokumenterede faktorer, der forklarer rækkefølgen. |
| Coverage | Hvilket query scope output faktisk dækker. |
| Limitation | Hvad output ikke kan understøtte og hvorfor. |
| Conflict Type | Den bevarede forskel i source, jurisdiction, version, scope eller status. |
| Dependency Status | Known, unavailable, conflicting eller degraded betydning ved execution time. |

Konkrete enums og serialiseringsformer fastlægges først i Domain/Data Architecture og må ikke ændre disse betydninger.

### 3.4 Relationer og authority

1. En Retrieval Request bindes til præcis én Source Policy Binding for execution.
2. En Source Policy Binding refererer til en governance-ejet policy og registry snapshot; CAP-KNR kan ikke ændre dem.
3. En Retrieval Execution kan konsultere nul eller flere Source Candidates.
4. En Source Candidate kan give nul eller flere Retrieved Passages.
5. En Ranked Source Result refererer til præcis én passage og source-version.
6. Coverage Assessment omfatter hele query scope, også dele uden resultater.
7. En Source Conflict Record forbinder mindst to resultater eller source contexts uden at skabe en klinisk afgørelse.
8. Retrieval Outcome sammenfatter execution-status, ikke source truth.
9. CAP-EVD kan senere konsumere resultater og skabe Evidence Objects under sin egen kontrakt.
10. CAP-AUD ejer det autoritative audit record; CA-001 bevarer kun referencen.

## 4. Responsibility Allocation

Følgende er logiske ansvar. De er ikke services, deployables, moduler, klasser eller API’er.

| Logisk ansvar | Skal | Må ikke |
|---|---|---|
| Request Qualification | Kontrollere purpose, scope, query completeness, jurisdiction, time, authorization og dataminimering. | Fortolke manglende input som default. |
| Policy Binding | Resolve præcis source policy- og registry-version for invocation. | Oprette eller ændre source permissions. |
| Source Eligibility | Identificere tilladte sources og afvise retired/forbudte sources efter policy. | Vælge popularitet som authority eller genaktivere source. |
| Retrieval Coordination | Udføre kontrolleret retrieval mod eligible sources og observere dependency status. | Skjule source failure eller skabe kildeindhold. |
| Result Identity & Normalization | Bevare source identity, version, type, jurisdiction, passage reference og status. | Udglatte semantik, conflict eller provenance. |
| Ranking & Rationale | Ordne resultater efter policy-bundet retrieval relevance og gøre rationale tilgængeligt. | Fremstille ranking som clinical truth eller recommendation. |
| Coverage & Limitation Assessment | Beskrive covered/uncovered scope og retrieval-begrænsninger. | Præsentere tomt eller partielt resultat som fuld dækning. |
| Conflict Preservation | Identificere lokal/generel, jurisdiction-, version-, scope- og statuskonflikt. | Foretage uautoriseret klinisk eller normativ konfliktresolution. |
| Outcome Assembly | Returnere eksplicit completed, insufficient, conflicting, unavailable eller degraded betydning. | Returnere tavs success eller plausibel substitution. |
| Trace Publication | Publicere execution-, policy-, source-, outcome- og dependency-trace til CAP-AUD/downstream scope. | Definere retention, ændre audit history eller skjule audit failure. |

En senere capability-to-component-allokering kan samle eller dele disse ansvar, men skal bevise, at ingen kontrakt eller separation of authority går tabt.

## 5. Information Flow

### 5.1 Logisk flow

1. **Request modtages.** Query, purpose, use case, minimized context, jurisdiction, decision time, authorization og trace context identificeres.
2. **Preconditions vurderes.** Manglende scope, unauthorized purpose eller direkte patientidentifikator stopper normal retrieval.
3. **Policy bindes.** Den relevante source policy og registry snapshot resolveres for use case og decision time.
4. **Eligible sources bestemmes.** Source identity, type, jurisdiction, version og governance-status prøves mod policy.
5. **Retrieval udføres.** Kun eligible sources konsulteres; alle dependency failures observeres.
6. **Resultater identificeres.** Passager bindes til source identity/version og bevarer original type/status.
7. **Relevance og coverage vurderes.** Resultater rangeres under policy; covered og uncovered scope dokumenteres.
8. **Konflikter og limitations bevares.** Lokal/generel forskel, competing sources, expired/contested status og manglende coverage gøres eksplicit.
9. **Outcome samles.** Normal, insufficient, conflicting, unavailable eller degraded betydning fastlægges uden klinisk fortolkning.
10. **Trace publiceres.** Request-, policy-, source-, result-, failure- og outcome-reference bindes til CAP-AUD og downstream consumer.

### 5.2 Beslutningspunkter

| Beslutningspunkt | Beslutningsmyndighed | Mulige konsekvenser |
|---|---|---|
| Er requester autoriseret til purpose/scope? | Identity/authorization policy; håndhæves ved Request Qualification. | Fortsæt eller afvis. |
| Er source policy anvendelig og aktiv for use case/time? | CAP-GOV/source governance. | Bind policy eller returnér unavailable/degraded. |
| Er source eligible? | Versionsbundet source policy. | Konsultér, ekskludér eller markér efter status. |
| Er source identity/version/integrity tilstrækkelig? | Source governance og integrity policy. | Bevar resultat eller afgræns berørt scope. |
| Er coverage tilstrækkelig til query scope? | CA-001 contract og policy; ikke klinisk vurdering. | Completed eller explicit incomplete outcome. |
| Findes source conflict? | CA-001 identificerer; downstream authorised policy/actor afgør betydning. | Conflict record; ingen falsk konsensus. |
| Kan ranking forklares? | Ranking & Rationale under source policy. | Returnér ranking eller insufficient/degraded outcome. |
| Kan auditkravet opfyldes? | CAP-AUD-status og CAP-GOV risk-tier-policy. | Publicér normalt trace eller block/degrade efter policy. |

### 5.3 Sporbarhed pr. execution

Hver Retrieval Execution skal kunne spores:

- op til use case, source policy, governance-status og relevante requirements;
- ind til query, context provenance, authorization, jurisdiction og time;
- gennem consulted source identities, versions, statuses og failures;
- ud til returned passages, ranking rationale, coverage, limitations og conflicts;
- ned til consumer, test evidence, release scope og monitoring; og
- tilbage fra retired/contested source eller incident til alle berørte downstream artifacts.

Ingen direct Constitution-to-implementation-link må skjule manglende PP/DP/ADR-led, jf. GI-014 og ADR-003.

## 6. Trust Boundaries

### 6.1 Data crossings

| Boundary | Data der krydser | Tillidsregel |
|---|---|---|
| Authorized caller → CAP-KNR | Query, purpose, context, jurisdiction, time, authorization og trace context. | Callerens label er ikke autoritet; authorization og scope skal verificeres. |
| Governance/source registry → CAP-KNR | Source identity, permission, type, status, validity og policy version. | Kun canonical, versionsbundet registry-state kan styre eligibility. |
| External source → CAP-KNR | Source metadata, content/passages, status/integrity evidence og failure. | External content er untrusted input indtil identity, version, permission og integrity er vurderet. |
| CAP-KNR → downstream consumer | Ranked results, provenance, coverage, limitations, conflict og outcome. | Consumer må ikke behandle ranking som evidence strength eller decision. |
| CAP-KNR → CAP-AUD | Request-, policy-, source-, failure- og outcome-trace. | Auditdata er formålsbegrænset; CAP-KNR ejer ikke retention eller audit mutation. |
| CAP-GOV/CAP-AUD → CAP-KNR | Policy/gate- og audit availability-status. | Failure eller contested status skal være synlig; ingen default-to-allow. |

### 6.2 Aktør- og beslutningsmyndighed

| Aktør/logisk ejer | Må påvirke | Må ikke påvirke |
|---|---|---|
| Authorized requester | Query, purpose og tilladt context inden for authorization. | Source permission, source status, authority eller ranking policy. |
| Source governance owner | Source identity, permission, type, status, jurisdiction og validity. | Klinisk beslutning i en konkret konsultation. |
| CAP-GOV | Applicability, risk tier, policy status og gate-effekt. | Erklære regulatorisk conformity alene eller skabe clinical truth. |
| External publisher | Udgive source content og versioner. | Bestemme at source er autoritativ i Cortex alene ved selvdeklaration. |
| CAP-KNR | Eligibility enforcement, retrieval, ranking, coverage, limitations og conflict preservation. | Evidence strength, clinical recommendation, decision eller action. |
| CAP-EVD | Fortolke retrieved sources som evidence objects under egen kontrakt. | Omskrive retrieval provenance eller skjule source status. |
| CAP-AUD | Bevare autoriseret auditspor og integrity-status. | Ændre retrieval outcome eller source policy. |
| Clinician | Vurdere downstream evidence/forslag og træffe klinisk beslutning inden for mandat. | Gøre retrieval ranking til automatisk systemautoritet. |

### 6.3 Patientdata

CA-001-reference-scope kræver ikke og accepterer ikke direkte patientidentifikatorer. Retrieval Context kan alene indeholde det minimum af afledt eller generel klinisk/organisatorisk kontekst, der er godkendt til retrieval-purpose.

En senere ændring, der indfører direkte identifikatorer, nye datakategorier eller bredere secondary use, er uden for CA-001 v1.0 og kræver:

- normativ diff;
- ny applicability- og risk classification;
- privacy/security-impact;
- opdateret trust-boundary- og data-lifecycle-design; og
- godkendt migration/rollback efter EXT-003.

## 7. Verification Strategy

### 7.1 Verifikationslag

CAP-KNR skal verificeres på fire logiske niveauer:

1. **Contract verification:** Inputs, outputs, preconditions, postconditions, invariants og failure responses.
2. **Policy conformance:** Use-case/version-specific permission, source status og jurisdiction.
3. **Semantic verification:** Source identity, provenance, type, conflict, coverage, limitations og ranking meaning bevares.
4. **End-to-end trace verification:** Request til outcome, audit og affected-dependency review kan rekonstrueres.

Ingen test alene etablerer klinisk validitet eller regulatorisk conformity.

### 7.2 Acceptance scenarios

Scenario-labels nedenfor er lokale i CA-001 og afventer canonical ID-standard, jf. GI-013.

| Scenario | Stimulus | Forventet observerbar respons | Primary trace |
|---|---|---|---|
| KNR-V-01 — Version-specific permission | Samme source er allowed i policy v1 og disallowed i policy v2. | Execution ved hver decision time følger korrekt policyversion; resultat og policy binding kan rekonstrueres. | CAP-KNR-001, INF-002 |
| KNR-V-02 — Retired source | En tidligere anvendt source sættes til retired før ny request. | Source returneres ikke som nyt anvendeligt resultat; alle berørte dependencies markeres til review. | AT-KNR-01, TRC-003 |
| KNR-V-03 — Retrieval failure | En eligible external source er utilgængelig. | Outcome viser failure og coverage gap; intet konstrueret eller plausibelt erstatningsoutput. | CAP-KNR-002, PRO-008 |
| KNR-V-04 — No authorized coverage | Ingen allowed source dækker query. | Tomt resultatsæt med explicit no-coverage limitation; ingen fallback til unapproved source. | CAP-KNR-001/002 |
| KNR-V-05 — Local/general conflict | Lokal instruks og generel evidenskilde giver uforenelige anvisninger. | Begge bevares med type, jurisdiction, scope og conflict record; ingen falsk consensus. | CAP-KNR-003, INF-003 |
| KNR-V-06 — Unauthorized requester | Requester mangler permission til purpose eller source class. | Invocation afvises uden delvist resultat; rejection er auditerbar. | NFR-SEC-001, INF-001 |
| KNR-V-07 — Popularity is not authority | En populær source rangerer højt efter ukontrolleret relevans, men er ikke policy-allowed. | Source ekskluderes; ranking kan ikke overtrumfe policy eller authority. | CAP-KNR limitation, PRO-002/005 |
| KNR-V-08 — Reproducible meaning | Identisk versionsbundet request, policy, registry og source state replayes. | Outcome, source identities, coverage og semantisk betydning reproduceres; variation er forklaret og versionsbundet. | NFR-REL-001 |
| KNR-V-09 — Audit reconstruction | Uafhængig reviewer sampler en execution. | Reviewer kan identificere request, actor scope, policy, consulted sources, failures, ranking rationale og outcome uden mundtlig viden. | NFR-AUD-001, AT-012 |
| KNR-V-10 — Data minimization | Request indeholder direkte patientidentifier eller overflødig patientkontekst. | Request afvises eller konteksten sendes til autoriseret upstream-correction; identifier bruges ikke i retrieval. | INF-001, NFR-PRI-001 |
| KNR-V-11 — Contested/expired source | Source er contested eller expired ved decision time. | Status bevares og CAP-GOV-policy anvendes synligt; source bliver ikke tavst current. | CAP-EVD-003, CAP-GOV-003 |
| KNR-V-12 — Governance/audit dependency failure | Source registry, CAP-GOV eller CAP-AUD er unavailable. | Outcome er unavailable/degraded eller blocked efter approved risk policy; ingen default-to-allow. | SYS-013, CAP-AUD-003, NFR-SAF-002 |
| KNR-V-13 — Semantic preservation | Resultater normaliseres og rangeres. | Source type, identity, version, jurisdiction, status og conflict bevares før og efter transformation. | SPEC §18, INF-002/003 |
| KNR-V-14 — Affected dependency review | En source-version ændres, retires eller contestes. | Berørte Evidence Objects, requirements, outputs eller releases kan identificeres gennem trace graph. | TRC-003/004, AT-KNR-01 |

### 7.3 Test evidence contract

Hvert verifikationsresultat skal registrere:

- CA-001-version og relevant requirement-version;
- system-/implementation-version;
- source policy- og registry-version;
- source/evidence-versioner;
- use case, jurisdiction, decision time og miljø;
- testinput uden direkte patientidentifikatorer;
- observeret output og failure/dependency-state;
- expected outcome og pass/fail;
- kendte limitations og reviewer; og
- links opstrøms til requirement og nedstrøms til affected implementation/release scope.

Dette følger TRC-002 og er uafhængigt af testframework.

### 7.4 Traceability matrix

| CA-001 element | Architecture Baseline | Specification | Verification |
|---|---|---|---|
| Source permission og policy binding | AP-006, AC-010/022/023 | CAP-KNR-001, CAP-GOV | KNR-V-01, V-04, V-06 |
| Visible retrieval failure | AP-004/AP-008, AC-009 | CAP-KNR-002, SYS-013, PRO-008 | KNR-V-03, V-12 |
| Local/general distinction | AP-002/AP-006, AC-004/005/022 | CAP-KNR-003, INF-003 | KNR-V-05, V-13 |
| Retired/contested source | AP-007/AP-010, AC-010/011 | AT-KNR-01, CAP-GOV-003, TRC-003/004 | KNR-V-02, V-11, V-14 |
| Provenance og semantic preservation | AP-002/AP-006, AC-005/006 | §18, INF-001–003 | KNR-V-08, V-09, V-13 |
| Ranking without authority | AP-002/AP-003, AC-004 | CAP-KNR limitation, PRO-002/005 | KNR-V-07 |
| Data minimization og access | AP-012, AC-013 | NFR-PRI-001, NFR-SEC-001 | KNR-V-06, V-10 |
| Audit og independent reconstruction | AP-006, AC-011 | CAP-AUD, NFR-AUD-001, AT-012 | KNR-V-09, V-14 |

## 8. Risks

### 8.1 Capability-specifikke risici

| ID | Risiko | Konsekvens | Afhængighed/trace |
|---|---|---|---|
| KNR-R-01 | Source registry mangler eller har tvetydig canonicality. | Eligibility og source identity kan ikke bestemmes reproducerbart. | GI-013/014; ADR-002/003 |
| KNR-R-02 | Source permissions mangler use-case-, jurisdiction- eller versionsscope. | For bred, forkert eller historisk irreproducerbar retrieval. | CAP-KNR-001 |
| KNR-R-03 | Ranking forveksles med authority eller evidence strength. | Popularitet eller teknisk relevance kan påvirke klinisk beslutning uden legitimt grundlag. | PRO-002/005; KNR-I-06 |
| KNR-R-04 | Partial coverage fremstår som komplet svar. | Downstream capability overser datamangler eller alternative sources. | CAP-KNR-002; PRO-008 |
| KNR-R-05 | Local instruction og general evidence udglattes. | Jurisdiction- eller normkonflikt skjules. | CAP-KNR-003; INF-003 |
| KNR-R-06 | Retired, expired eller contested source bruges gennem cache, race eller stale policy. | Forældet eller anfægtet source påvirker nye outputs. | AT-KNR-01; CAP-GOV-003 |
| KNR-R-07 | External source content eller metadata har ukendt integrity. | Forkert, manipuleret eller forkert versioneret passage returneres. | NFR-SEC-001; AP-006/AP-012 |
| KNR-R-08 | Retrieval failure maskeres af genereret eller tidligere output. | Plausibilitet erstatter viden, og failure bliver usynlig. | CAP-KNR-002; PRO-007/008 |
| KNR-R-09 | Query/context indeholder mere patientdata end nødvendigt. | Privacy-, purpose- og retention-brud. | INF-001/004; NFR-PRI-001 |
| KNR-R-10 | Audit failure håndteres som ikke-kritisk uden godkendt risk policy. | Retrieval-resultat kan ikke rekonstrueres eller ansvarliggøres. | CAP-AUD-003; NFR-AUD-001 |
| KNR-R-11 | Ekstern latency eller downtime påvirker klinisk timing. | Resultat kommer for sent eller skaber falsk normal funktion. | NFR-PER-001/NFR-AVL-001 |
| KNR-R-12 | Source licensing, permitted use eller content retention er uafklaret. | Retrieval eller opbevaring kan være ulovlig eller kontraktstridig. | GI-016; source governance/QMS gap |
| KNR-R-13 | CAP-EVD bruger retrieved result som evidens uden egen validering. | Retrieval relevance bliver tavst til clinical truth. | Capability boundary CAP-KNR → CAP-EVD |
| KNR-R-14 | Controlled variation kan ikke forklares eller replayes. | Samme request får betydningsmæssigt forskellige outputs uden trace. | NFR-REL-001 |

Risiciene er registreret; CA-001 accepterer dem ikke og vælger ingen teknisk mitigation.

### 8.2 Afhængighed til GI-010–GI-017

| Governance Issue | Betydning for CA-001 |
|---|---|
| GI-010 — Constitution ratification | CA-001 kan udledes og reviewes, men endelig normativ godkendelse mangler. |
| GI-011 — Framework not ACTIVE | Policy-, gate- og decision-right enforcement kan ikke antages operationelt. |
| GI-012 — Owners and control metadata | Capability owner, source policy owner, risk owner og approver er ikke navngivet. |
| GI-013 — Stable document IDs | CA-001-, invariant-, scenario-, policy- og source-identities kan ikke registreres i endeligt canonical format. |
| GI-014 — Missing intermediates and registry | LEX, PP/DP og machine-readable source/trace registry mangler; dette er den største direkte implementation blocker. |
| GI-015 — Specification upstream status | CAP-KNR-kontraktens godkendelsesgrundlag kan bestrides trods Specificationens interne status. |
| GI-016 — Regulatory/QMS boundary | Intended purpose, classification, jurisdiction, source use, retention, logging og QMS-owner er uafklaret. |
| GI-017 — Existing implementation conformance | Eventuel nuværende retrieval-kode eller dependency må ikke genbruges som compliant uden allocation og evidence. |

## 9. Readiness

### 9.1 Arkitektur-readiness

**CA-001 er komplet som logisk capability-arkitektur og klar til architecture, governance, evidence, security/privacy og verification review.**

Dokumentet fastlægger scope, kontrakt, domain semantics, responsibility, information flow, trust boundaries, verification og risks uden at vælge implementation.

### 9.2 Implementation readiness

**CA-001 er ikke klar til klinisk production implementation.**

Følgende inputs mangler:

1. Godkendt intended purpose og applicability/risk classification for den første retrieval-use case.
2. Navngiven capability owner, source governance owner, security/privacy owner, audit owner og approving body.
3. Canonical ID-standard, LEX og trace/source registry.
4. Godkendt source policy med source classes, permissions, jurisdictions, statuses, validity og conflict rules.
5. Godkendte source identities, versions, integrity expectations og retirement process.
6. Accepterede kontrakter for CAP-GOV, CAP-AUD og den efterfølgende CAP-EVD-boundary.
7. Privacy/security-afklaring af query context, purpose, access, logging, retention og source licensing.
8. Use-case-specifikke performance-, availability-, recovery- og auditkrav.
9. Godkendt verification plan med test data, policy fixtures, negative cases og acceptance evidence.
10. Godkendt ADR-002/ADR-003 eller kompetent beslutning om tilsvarende canonicality og traceability.

### 9.3 Tilladt næste designtrin

Når CA-001 er reviewet, kan Build uden teknologistakvalg udarbejde:

- Source Governance Domain definition;
- Source Policy og Source Registry logical contract;
- CAP-KNR ↔ CAP-GOV authority contract;
- CAP-KNR ↔ CAP-AUD trace contract;
- CAP-KNR → CAP-EVD semantic handoff contract; og
- CA-001 Verification Plan med operationaliserede KNR-V-scenarier.

API, storage, search/ranking technique, AI/model use, UI, cloud og deployment må først besluttes i separate ADR’er efter de nødvendige governance-input.

### 9.4 Exit decision

CA-001 opfylder succeskriteriet som første komplette reference for bevægelsen:

`Normative sources → Architecture Principles → CAP-KNR contract → Domain semantics → Logical responsibilities → Trust boundaries → Verification → Audit/learning`

Den kan bruges til at vurdere en fremtidig implementation, men autoriserer ikke implementation eller clinical use alene.
