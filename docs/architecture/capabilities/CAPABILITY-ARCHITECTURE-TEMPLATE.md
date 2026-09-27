# Capability Architecture <CA-ID> v<version>

## <Capability title> (<CAP-ID>)

> Officiel skabelon for Cortex Capability Architecture. Fjern instruktionstekst ved udfyldelse. Ukendte forhold markeres TODO og må ikke udfyldes ved antagelse.

## Dokumentkontrol

| Felt | Værdi |
|---|---|
| Architecture ID | <CA-ID> |
| Capability ID | <CAP-ID fra autoritativ Specification> |
| Capability version | <semantisk version> |
| Architecture version | <semantisk version> |
| Status | <kontrolleret lifecycle-status> |
| Dato | <YYYY-MM-DD> |
| Ansvarlig forfatter | <navn og rolle> |
| Capability owner | <navngiven person> |
| Godkendende organ | <organ> |
| Dependencies | <versionerede capability-/governance-referencer> |
| Erstatter | <ID og version eller Ingen> |
| Canonical path | <repository-path> |
| Risk classification | <gældende klassifikation eller TODO med issue> |

Dokumentet er underordnet de autoritative governance-artefakter, Cortex Specification v1.0, [Cortex Software Architecture Baseline v1.0](../CORTEX-SOFTWARE-ARCHITECTURE-BASELINE-v1.0.md) og [Governance & Traceability Architecture v1.0](../GOVERNANCE-TRACEABILITY-ARCHITECTURE-v1.0.md).

## 0. Capability Context

### 0.1 Valg og begrundelse

Beskriv hvorfor denne eksisterende Specification-capability designes nu. Begrundelsen må ikke skabe nyt scope eller nye principper.

### 0.2 Upstream-referencer

| Reference | Version/status | Bindende betydning for capabilityen |
|---|---|---|
| Philosophy | <afsnit> | <betydning> |
| Constitution | <artikel/afsnit> | <betydning> |
| Governance | <ID/afsnit> | <betydning> |
| Specification | <CAP-/REQ-/NFR-/PRO-/INF-/TRC-ID> | <betydning> |
| Architecture Baseline | <afsnit> | <betydning> |
| ADR | <ID/status eller Ingen> | <betydning> |

### 0.3 Autoritet og åbne Governance Issues

Angiv capabilityens normative autoritet og alle åbne issues, der begrænser scope, acceptance, implementation eller release.

## 1. Capability Scope

### 1.1 Formål

<Hvilket autoritativt formål capabilityen opfylder.>

### 1.2 In scope

- <Logisk ansvar.>

### 1.3 Out of scope

- <Ansvar, beslutning eller adfærd som capabilityen ikke ejer.>

### 1.4 Aktører og use context

| Aktør | Rolle | Autoritet | Begrænsning |
|---|---|---|---|
| <aktør> | <rolle> | <tilladt indflydelse> | <må ikke> |

## 2. Capability Contract

### 2.1 Inputs

| Input | Type/semantik | Kilde | Validation | Provenance | Hvis ugyldig/mangler |
|---|---|---|---|---|---|
| <input> | <typed tilstand> | <aktør/system> | <kontrakt> | <krav> | <failure/degraded behavior> |

### 2.2 Outputs

| Output | Type/semantik | Modtager | Autoritetsniveau | Provenance | Begrænsning |
|---|---|---|---|---|---|
| <output> | <typed tilstand> | <aktør/capability> | <fakta/forslag/beslutning/record> | <krav> | <må ikke påstå> |

### 2.3 Preconditions

1. <Betingelse der skal være eksplicit opfyldt før capabilityen må udføre kontrakten.>

### 2.4 Postconditions

1. <Observerbar tilstand efter gyldig udførelse.>

### 2.5 Invarianskrav

1. <Krav der altid skal være sandt, også ved fejl og degraded state.>

Indarbejd alle relevante cross-cutting constraints fra Governance & Traceability Architecture.

### 2.6 Fejltilstande

| Fejltilstand | Detektion | Sikker respons | Synlighed | Audit/evidence |
|---|---|---|---|---|
| <fejl> | <hvordan> | <state bevares/afvises/degraderes> | <bruger/system> | <record> |

### 2.7 Beslutningsautoritet

Skeln eksplicit mellem observation, transformation, forslag, menneskelig vurdering, autoriseret beslutning og handling.

## 3. Domain Model

### 3.1 Domæneobjekter

| Objekt | Formål | Identitet | Invarians |
|---|---|---|---|
| <objekt> | <formål> | <stabil identitet> | <krav> |

### 3.2 Aggregates

| Aggregate | Autoritativt ansvar | Boundary | Tilladte transitions |
|---|---|---|---|
| <aggregate> | <hvad det ejer> | <hvad der er inde/ude> | <kontrollerede transitions> |

### 3.3 Value Objects

| Value Object | Semantik | Validering | Ukendt/fraværende |
|---|---|---|---|
| <value object> | <betydning> | <regler> | <eksplicit repræsentation> |

### 3.4 Relationer og livscyklus

Beskriv versionerede relationer, lifecycle-tilstande og bevaringskrav uden at vælge lagringsteknologi.

## 4. Responsibility Allocation

| Logisk komponent | Ejer | Ansvar | Må ikke | Input/output-kontrakt |
|---|---|---|---|---|
| <komponent> | <logisk owner> | <ansvar> | <forbud> | <reference> |

Komponenterne er logiske ansvarsgrænser, ikke konkrete services, processer eller deployments.

## 5. Information Flow

### 5.1 Hovedflow

Beskriv det ordnede informationsflow fra valideret input til output, verification-evidence og audit.

### 5.2 Beslutningspunkter

| Punkt | Input | Beslutningsautoritet | Output | Sporbarhedsrecord |
|---|---|---|---|---|
| <punkt> | <input> | <menneske/system/governance> | <resultat> | <relation/evidence> |

### 5.3 Transformationer

| Transformation | Inputversion | Regel/model/policy-version | Output | Reproducerbarhed/usikkerhed |
|---|---|---|---|---|
| <transformation> | <version> | <version> | <output> | <krav/begrænsning> |

### 5.4 Traceability

Vis fremadrettede og bagudrettede relationer for alle release-relevante flows. Beskriv håndtering af brudte, superseded, contested og manglende relationer.

## 6. Trust Boundaries

| Grænse | Data/handling | Afsenderens autoritet | Modtagers validation | Failure/degraded behavior | Audit |
|---|---|---|---|---|---|
| <fra → til> | <indhold> | <scope> | <identitet, integritet, provenance, version, kontrakt> | <sikker respons> | <record> |

### 6.1 Human control

Beskriv hvilke beslutninger kun en autoriseret menneskelig aktør må træffe, og hvordan forslag holdes adskilt fra beslutninger.

### 6.2 External systems and AI

Beskriv data som ubetroet ved grænsen. AI-output må ikke opnå implicit autoritet, faktastatus eller evidensstatus.

## 7. Verification Strategy

### 7.1 Acceptance criteria

| AC-ID | Upstream-krav | Kriterium | Verification-metode | Forventet evidens | Gate |
|---|---|---|---|---|---|
| <AC-ID> | <versioneret reference> | <måleligt kriterium> | <test/review/analyse> | <evidence-record> | <krævet approval> |

### 7.2 Obligatoriske scenarietyper

Definér proportionalt med risiko:

- normal flow;
- ugyldigt og manglende input;
- negative og edge cases;
- konflikt og uncertainty;
- dependency failure;
- degraded state;
- replay/reproduktion;
- authorization failure;
- provenance- og traceability-brud;
- recovery, rollback eller supersession.

### 7.3 Evidence plan

Angiv hvordan Acceptance Test → Verification → Evidence → Audit forbindes. Skeln kildeevidens, beslutningsevidens, verification-evidens, operationel evidens og governance-evidens.

### 7.4 Traceability matrix

| Upstream reference | Capability contract | Architecture element | Fremtidig implementation | Verification | Evidence/audit |
|---|---|---|---|---|---|
| <reference/version> | <afsnit> | <afsnit/ADR> | <TODO indtil designet> | <AC-ID> | <forventet record> |

## 8. Risks, Dependencies and Issues

### 8.1 Capability-specifikke risici

| Risk ID | Kategori | Beskrivelse | Konsekvens | Upstream-reference | Krævet review |
|---|---|---|---|---|---|
| <ID> | <governance/teknisk/regulatorisk/organisatorisk> | <risiko> | <konsekvens> | <reference> | <organ> |

Registrér risici uden at indføre lokale løsninger, når løsningen kræver governancebeslutning.

### 8.2 Dependencies

| Dependency | Version/status | Kontrakt | Failure effect | Release-blokerende | Owner |
|---|---|---|---|---|---|
| <ID> | <version/status> | <forventning> | <effekt> | <ja/nej> | <navn> |

### 8.3 Governance Issues

| GI-ID | Beskrivelse | Konsekvens | Forslag til governance-review |
|---|---|---|---|
| <GI-ID> | <uløst normativt forhold> | <hvad det blokerer> | <beslutning, ikke lokal løsning> |

## 9. Readiness

Vurder særskilt:

| Readiness-niveau | Status | Begrundelse | Mangler |
|---|---|---|---|
| Architecture design | <klar/delvist/ikke klar> | <evidens> | <forudsætning> |
| Implementation | <klar/delvist/ikke klar> | <evidens> | <forudsætning> |
| Verification | <klar/delvist/ikke klar> | <evidens> | <forudsætning> |
| Release | <klar/delvist/ikke klar> | <evidens> | <forudsætning> |
| Klinisk/regulatorisk anvendelse | <klar/delvist/ikke klar/ikke relevant> | <evidens> | <forudsætning> |

Afslut med en eksplicit beslutning om, hvad der må begynde, og hvad der fortsat er blokeret. Design-readiness må ikke formuleres som implementation-, release- eller klinisk readiness.

## 10. Completion Checklist

- [ ] Capability ID og version findes i den autoritative Specification.
- [ ] Status, owner og approving body er eksplicitte.
- [ ] Upstream-referencer er versionerede og gældende.
- [ ] Scope og non-scope er entydige.
- [ ] Inputs, outputs, preconditions, postconditions, invarians og fejltilstande er defineret.
- [ ] Ukendt, fraværende og negativt svar er semantisk adskilt.
- [ ] Domæneobjekter og autoritative aggregates er defineret.
- [ ] Logiske ansvar og beslutningsautoritet er allokeret.
- [ ] Information flow, transformationer og provenance er beskrevet.
- [ ] Trust boundaries og dependency failures er dækket.
- [ ] Acceptance-kriterier er målbare og kan producere identificeret evidens.
- [ ] Traceability-matrixen er komplet i begge retninger.
- [ ] Risici, Governance Issues, dissent og antagelsesforbud er synlige.
- [ ] Readiness-niveauerne er vurderet separat.
- [ ] Ingen skjulte teknologi-, API-, data-, cloud- eller UI-valg er indført.
- [ ] Ingen påstand om acceptance eller validitet mangler evidens.
