# Cortex Software Architecture Baseline v1.0

**Document ID:** TODO — afventer godkendt ID-standard, jf. GI-013

**Version:** 1.0

**Status:** Proposed

**Responsible author:** Chief Software Architect

**Governance owner:** TODO — jf. GI-012

**Approving body:** TODO — jf. GI-010–GI-012

**Date:** 2026-07-21

**Normative rank:** Foreslået arkitekturkontrakt under Constitution, Governance Framework og Cortex Specification

**Scope:** Arkitekturprincipper, drivere, systemkontekst, constraints, kvalitetsmål, beslutningsdomæner, risici og exit criteria. Ingen løsningsarkitektur eller implementering.

## 0. Formål, autoritet og kildeprotokol

Dette dokument er den første softwarearkitektoniske kontrakt for Cortex. Det omsætter de adopterede upstream-kilder til bindende grænser for efterfølgende arkitekturdesign, men er ikke en komplet softwarearkitektur og ratificerer ikke sine egne upstream-kilder.

Baseline må ikke bruges som releasegrundlag, regulatorisk godkendelse, Clinical Safety Case eller dokumentation for klinisk validitet. Dens status forbliver `Proposed`, indtil den kompetente governance-instans har behandlet de åbne governance-gates.

### Autoritative kilder

| Kode | Canonical artifact | Referencemetode |
|---|---|---|
| PHI | `docs/governance/canonical/Cortex-Philosophy.docx` | Kapitel og navngivet kerneprincip |
| CON | `docs/governance/canonical/Cortex-Constitution-Ratification-Report.docx` | Foreslået artikel 1–8, fortolkningsregel og anti-omgåelsesregel |
| GOV | `docs/governance/canonical/Cortex-Governance-Framework-v1.0.docx` | Afsnit og tabel |
| GST | `docs/governance/assurance/Cortex-Governance-Framework-Stress-Test-v1.0.docx` | Review, P0/P1-krav og endelig kommissionsdom |
| SPEC | `docs/specifications/Cortex-Specification-v1.0.docx` | Afsnit, capability- og requirement-ID |

Ved konflikt gælder upstream-hierarkiet. Constitutionens tekst har foreslået højeste rang; Governance Framework definerer proces og forrang; Specification definerer systemadfærd og grænser. Stress Test begrænser Frameworkets aktiveringsstatus. Philosophy er fortolkningsgrundlag og må ikke overtrumfe Constitutionen.

Kildestatus er fortsat omfattet af GI-010, GI-011 og GI-015. Dette dokument bruger kildernes indhold uden at ændre deres faktiske ratifikationsstatus.

## 1. Architecture Principles

Principperne nedenfor er afledt af upstream-kilderne. De er ikke nye normative principper. En senere ADR må præcisere deres realisering inden for sit scope, men må ikke svække dem.

### AP-001 — Patientformål og socioteknisk ansvar

**Kontrakt:** Cortex skal være et klinisk beslutningsstøttesystem, der tjener patientens sikre, forståelige og individuelt relevante hjælp. Systemet må ikke optimere tekniske, organisatoriske eller kommercielle mål på bekostning af dette formål, og ansvar kan ikke reduceres til softwareadfærd alene.

**Kilder:** PHI kapitel 26–27; CON artikel 1 og 7; GOV §1, §13 og §19; SPEC SYS-001, SYS-002, SYS-004, PRO-005, PRO-006 og BND-001.

### AP-002 — Epistemisk typeintegritet

**Kontrakt:** Fakta, observation, inferens, hypotese, forslag, norm, beslutning, handling og dokumentation skal bevare forskellige semantiske og autoritative tilstande. Relevant usikkerhed, uenighed, datamangler og aktualitet må ikke udglattes.

**Kilder:** PHI kapitel 3, 11 og 21; CON artikel 2; GOV §14; SPEC SYS-003, CAP-EVD-001–003, Information Architecture §18, PRO-001, PRO-002 og NFR-EXP-001.

### AP-003 — Eksplicit menneskelig beslutningsmyndighed

**Kontrakt:** Cortex kan syntetisere og foreslå. En klinisk beslutning opstår kun ved en eksplicit handling fra en identificeret og autoriseret aktør. Visning, stilhed, default eller timeout er aldrig accept.

**Kilder:** PHI kapitel 6, 13 og 22; CON artikel 4; GOV §11 og §13; SPEC SYS-004, SYS-011, SYS-012, CAP-DSU-001–003, Decision Architecture §20, PRO-003 og AT-003/AT-009.

### AP-004 — Ukendt forbliver ukendt

**Kontrakt:** Fravær af data må ikke fortolkes som normalitet, negativt fund eller anden klinisk kendsgerning. Cortex må ikke opfinde patientdata, kilder, observationer eller udførte handlinger. Ukendt, utilgængelig, modstridende og degraderet er gyldige tilstande.

**Kilder:** PHI kapitel 7, 16 og 17; CON artikel 2 og 5; GOV §14; SPEC CAP-CTX-001–003, capability failure-state-kontrakten, PRO-007, PRO-008 og AT-001.

### AP-005 — Proportional beskyttelse af opmærksomhed

**Kontrakt:** Enhver afbrydelse eller friktion skal have en dokumenteret beskyttelsesfunktion og være proportional med klinisk værdi samt risikoen ved både handling og tavshed. Stilhed kan være korrekt systemadfærd; høj risiko må ikke skjules af suppression.

**Kilder:** PHI kapitel 8, 10, 18 og 19; CON artikel 3; GOV §12, §15 og §17; SPEC CAP-ATT-001–003, Interaction Model §22 og AT-005.

### AP-006 — Sporbar og reproducerbar betydning

**Kontrakt:** Klinisk betydende outputs, beslutninger og handlinger skal kunne rekonstrueres fra de faktiske versionsbundne input, kilder, regler, modeller, policies og menneskelige handlinger. Transformationer må ikke bryde provenance eller autoritetsniveau.

**Kilder:** PHI kapitel 11 og 21; CON artikel 2, 5 og 8; GOV §4–6, §15 og §16; SPEC CAP-AUD-001–003, INF-002, NFR-REL-001, NFR-AUD-001, TRC-001–005 og AT-012.

### AP-007 — Bestridelighed, korrektion og reversibilitet

**Kontrakt:** Påstande og handlinger skal kunne udfordres og korrigeres uden tab af historik eller ansvarsspor. Klinisk betydende ændringer skal have rollback eller en eksplicit godkendt irreversibilitet.

**Kilder:** PHI kapitel 12 og 16; CON artikel 5 og 8; GOV §9, §15, §16 og §18; SPEC CAP-DOC-002, INF-003, INF-005, NFR-REV-001, EXT-003/004 og AT-006.

### AP-008 — Synlig, sikker degradering

**Kontrakt:** Fejl i data, retrieval, integration, audit eller anden kritisk afhængighed skal være synlige. Berørt funktion skal afgrænses, stoppes eller gå til en defineret sikker tilstand og må ikke fremstå normalt fungerende.

**Kilder:** CON artikel 2 og 8; GOV §13, §14 og §16; SPEC SYS-013, CAP-KNR-002, CAP-AUD-003, NFR-SAF-002, NFR-AVL-001, PRO-008 og AT-001.

### AP-009 — Capability-kontrakter før komponentform

**Kontrakt:** De definerede capabilities er logiske ansvarszoner. Senere arkitektur må samle eller splitte dem, men må ikke tabe kontrakter, failure states eller skabe skjult normativ adfærd. Cortex må ikke defineres af en bestemt model, leverandør, grænseflade eller journalteknologi.

**Kilder:** PHI kapitel 5 og 20; CON artikel 1 og Constitution Stress Test; GOV §3, §15 og §23; SPEC SYS-005, Capability Map §5, EXT-001/002 og Architecture Acceptance §30.

### AP-010 — Kontrolleret læring uden skjult selvændring

**Kontrakt:** Observation, analyse, ændringsforslag, godkendelse og produktionsændring skal være adskilte. Feedback er et signal, ikke automatisk sandhed. Klinisk betydende adfærd må ikke ændres uden version, evaluering, governance-gate og rollback.

**Kilder:** PHI kapitel 24–25; CON artikel 6 og 8; GOV §17–18; SPEC CAP-LRN-001–003, NFR-LRN-001, PRO-010 og AT-008.

### AP-011 — Organisatorisk og fordelingsmæssigt ansvar

**Kontrakt:** Arkitekturen skal kunne repræsentere, hvem der ejer systembetingelser og residualrisiko, og gøre påvirkning på patientforløb, arbejdsfællesskab, berørte grupper og downstream-aktører evaluerbar. Lokal effektivitet må ikke skjule flyttet byrde eller systematisk skade.

**Kilder:** PHI kapitel 14, 23 og 26; CON artikel 7; GOV §11–13 og §17; SPEC SYS-004, NFR-EQU-001, PRO-006 og AT-010.

### AP-012 — Formålsbegrænset data-, privacy- og security-kontrol

**Kontrakt:** Data skal have formål, ejer, provenance, klassifikation, adgangsregel og retention. Adgang skal følge autorisation og least privilege. Security, privacy og audit skal dække hele livscyklussen uden at gøre audit til skjult sekundær brug.

**Kilder:** CON artikel 1, 4, 7 og 8; GOV §13–14 og §16–18; SPEC Information Architecture §18, Datalifecycle §19, INF-001–005, CAP-AUD-002, NFR-PRI-001, NFR-SEC-001 og PRO-011.

## 2. Architectural Drivers

| Driver | Begrundelse | Upstream-reference | Arkitektonisk konsekvens |
|---|---|---|---|
| Patientsikkerhed | Fejl, tavshed, datamangler og automation bias kan påvirke diagnose, plan og opfølgning. | CON art. 1, 3 og 8; GOV §13; SPEC NFR-SAF-001/002, CAP-RSK | Alle designområder skal beskrive hazards, kontroller, failure states, fallback, monitoring og ansvar; accept af residualrisiko ligger uden for Build. |
| Beslutningsintegritet | Forslag må ikke blive til kliniske beslutninger gennem interfaceadfærd eller defaults. | CON art. 4; GOV §11; SPEC SYS-011/012, CAP-DSU, PRO-003/004 | Tilstande og overgang mellem forslag, beslutning og handling skal være eksplicitte, autoriserede og auditerbare. |
| Epistemisk integritet og forklarbarhed | Cortex må ikke foregive viden eller skjule begrænsninger. | CON art. 2; GOV §14; SPEC CAP-EVD, NFR-EXP-001, PRO-001/002/007 | Informations- og AI-design skal bevare type, provenance, scope, version, konflikt, usikkerhed og forklaringsgrundlag. |
| Bidirektionel sporbarhed | Legitimitet og effekt skal kunne følges både opstrøms og nedstrøms. | GOV §4–6; SPEC TRC-001–005 | Arkitekturartefakter skal have stabile relationer til krav, ADR’er, tests, releases og monitorering; brudte kritiske links er gate-fejl. |
| Auditabilitet og reproducerbarhed | En uafhængig reviewer skal kunne rekonstruere en klinisk betydende kæde. | CON art. 2, 5 og 8; SPEC CAP-AUD, NFR-AUD-001, NFR-REL-001, AT-012 | Hvert design skal definere versioner, identiteter, tidsrelationer, audit hooks, integrity-status og rekonstruktionsbevis. |
| Opmærksomhed og konsultationseffekt | Korrekt information kan stadig skade gennem timing, støj og arbejdsbyrde. | PHI kap. 8, 10, 18, 19 og 26; CON art. 3; SPEC CAP-ATT, §22 | Interaktionsdesign skal have attention budget, risikoproportionel modalitet, suppression-rationale og balancing metrics. |
| Modularitet og vedligeholdelse | Capability-kontrakter, regler, evidens og modeller skal kunne ændres uden skjult normativ drift. | GOV §15 og §23; SPEC Capability Map §5, NFR-MNT-001, EXT-001–003 | Senere komponentgrænser skal bevare capability-kontrakter og have ejer, version, dependencies, review-trigger og retirement-plan. |
| Robusthed og tilgængelighed | Systemmiljøet omfatter manglende, modstridende og forsinkede data samt nedetid og drift. | SPEC §2, SYS-013, NFR-ROB-001, NFR-AVL-001 | Arkitekturen skal definere eksplicitte degraded states, safe failure, continuity, recovery og manuelle fallback-veje. |
| Performance | Forsinkelse i et klinisk flow kan ændre betydning og skabe falsk normalitet. | CON art. 3; SPEC NFR-PER-001 | Hver use case skal have godkendte SLO’er og timeout/fallback-adfærd; tal fastsættes ikke i denne baseline. |
| Privacy og security | Kliniske data, identiteter, audit og integrationer kræver formålsbegrænsning og beskyttelse. | CON art. 1, 4 og 7; SPEC INF-001–005, NFR-PRI-001, NFR-SEC-001 | Data- og trust-boundary-design skal gøre adgang, formål, integritet, fortrolighed, retention og incident response testbare. |
| Regulatorisk og governance-håndhævelse | Governance er ikke et QMS eller conformity assessment, men klassifikation og gates er bindende før release. | GOV §3, §9 og §16; GST P0 Regulatory Gate; SPEC CAP-GOV, NFR-SAF-001, BND-001 | Design skal kunne kobles til applicability, risk tier, QMS og release-gates; klassifikation, jurisdiktion og QMS-ejer er åbne governance-input. |
| Livscyklus og korrigerbar læring | Ansvar slutter ikke ved release, og produktion må ikke lære skjult. | CON art. 5, 6 og 8; GOV §17–18; SPEC CAP-LRN, NFR-LRN-001 | Monitoring, change impact, rollback, incident learning og upstream-review skal indgå i alle senere arkitekturbaselines. |

## 3. System Context

### 3.1 Systemidentitet og grænse

Cortex er en socio-teknisk klinisk beslutningsstøttefunktion til forberedelse, gennemførelse og opfølgning af almenmedicinske konsultationer. Inden for systemgrænsen ligger kontekstsyntese, evidensformidling, risiko- og usikkerhedsrepræsentation, forslag, forklaring, dokumentationsudkast, patientkommunikationsstøtte, audit og governance-håndhævelse.

Cortex er ikke journalsystem, diagnosemaskine, autonom beslutningstager, generisk chatbot, administrationssystem, forskningsdatabase, guideline-portal eller compliance-certifikat. Endelig klinisk beslutning, juridisk ansvar, patientens værdighed og organisationens driftsansvar ligger uden for delegering til Cortex.

**Kilder:** SPEC §1–2, SYS-001–005, produktgrænser §28 og BND-001–003.

### 3.2 Aktører og brugergrupper

| Aktør/brugergruppe | Relation til Cortex | Myndighedsgrænse |
|---|---|---|
| Patient | Leverer mål, præferencer og rapporteret kontekst; modtager relevant forklaring og plan. | Er ikke en datapost eller optimeringsenhed; har værdighed, privatliv og legitim indflydelse. |
| Kliniker | Fortolker kontekst, vurderer forslag, træffer og godkender kliniske beslutninger inden for mandat. | Må ikke reduceres til symbolsk human oversight; beslutning kræver effektiv kontrol. |
| Praksisteam | Koordinerer opgaver, opfølgning og organisatoriske kontroller. | Har kun myndighed efter rolle, autorisation og scope. |
| Organisation/driftsansvarlige | Sikrer tid, kompetence, processer, fallback og lovlig drift. | Organisatorisk ansvar kan ikke overføres til Cortex eller den enkelte kliniker. |
| Cortex-ejer/provider | Ejer systemets intended purpose, kvalitet, sikkerhed, monitorering og ændringer. | Må ikke selv acceptere høj klinisk residualrisiko eller erklære regulatorisk conformity. |
| Governance-, safety-, evidence-, architecture-, product- og evaluation-roller | Klassificerer, prøver, godkender, bestrider eller stopper ændringer efter mandat. | Konkrete organer og navngivne ejere afventer GI-011/GI-012. |
| Patient-/offentlig repræsentation | Prøver værdighed, autonomi, lighed og legitimitet. | Bærer ikke juridisk safety-ansvar. |
| Uafhængig reviewer/auditor | Rekonstruerer beslutninger, kontroller og evidenskæder. | Må kun få autoriseret, formålsbegrænset adgang. |

### 3.3 Eksterne systemer og datakilder

| Kategori | Konceptuel relation | Bindende grænse |
|---|---|---|
| Elektronisk patientjournal | Autoriseret læsning og skrivning af kliniske records og dokumentudkast. | Journalen ejer den samlede recordfunktion; kildedata er ikke automatisk klinisk sandhed. |
| Medicinmodul | Leverer medicinkontekst eller udfører eksplicit autoriserede handlinger. | Ingen handling uden autorisation, bekræftet resultat og ansvarlig aktør. |
| Booking- og opfølgningssystem | Leverer organisatorisk kontekst eller udfører planlagte administrative handlinger. | Organisatorisk status må ikke blive klinisk fakta. |
| Nationale registre og autoritative datakilder | Leverer identificerbare data under godkendt formål og scope. | Kildekvalitet, aktualitet, adgang og failure skal være synlige. |
| Kliniske guidelines og evidenskilder | Leverer versionsbundne claims, population, styrke, scope og udløb. | Konflikter må ikke skjules; retired eller contested kilder kan ikke tavst drive outputs. |
| Lokale instrukser og organisationskilder | Leverer lokal norm, kapacitet og begrænsninger. | Lokal instruks og generel evidens skal kunne skelnes og konflikthåndteres. |
| Identitets-, autorisations- og samtykkekilder | Etablerer aktør, rolle, scope og legitim adgang. | Uafklaret identitet eller autorisation må ikke substitueres. |
| Besked- og patientkommunikationskanaler | Formidler godkendt information eller instrukser. | Cortex må ikke ændre klinisk indhold eller skjule usikkerhed ved formidling. |
| Monitoring-, incident- og QMS-systemer | Modtager drifts-, sikkerheds- og læringssignaler. | Governance-output erstatter ikke QMS, vigilance eller conformity assessment. |

Ingen specifik integrationsteknologi, protokol eller systemleverandør vælges i denne baseline.

### 3.4 AI-modeller

AI-modeller kan senere indgå som versionsbundne, kontrollerede behandlingsafhængigheder inden for en godkendt capability og use case. De er ikke aktører med klinisk myndighed og er aldrig autoritative evidenskilder alene.

Enhver modelrelation skal senere definere:

- godkendt formål, scope, population og forbud;
- input- og outputtyper samt provenance;
- model-, prompt-, konfigurations- og evidensversion;
- kendte begrænsninger, variation og usikkerhed;
- failure, fallback, monitoring og rollback;
- menneskelig kontrol og forklaringskrav; og
- change-, evaluation- og governance-gate.

Modeltype, leverandør, hosting og teknik er ikke besluttet.

**Kilder:** CON artikel 2, 4, 6 og 8; GOV §14 og §15; SPEC SYS-005, CAP-EVD-003, CAP-KNR, CAP-LRN, NFR-REL-001, NFR-LRN-001, PRO-002/007/010.

### 3.5 Konceptuelle integrationspunkter

Følgende grænser skal senere kontraktfastlægges uden at forudsætte protokol eller deployment:

1. Klinisk kontekst ind til Cortex.
2. Evidens, guidelines og lokale normer ind til Cortex.
3. Identitet, autorisation og samtykke ind til Cortex.
4. Udkast, forklaringer og autoriserede handlingsanmodninger ud fra Cortex.
5. Eksternt handlingsresultat og korrektion tilbage til Cortex.
6. Audit-, policy-, monitoring-, incident- og læringssignaler til kontrollerede systemer.

## 4. Architectural Constraints

| ID | Bindende constraint | Primær trace |
|---|---|---|
| AC-001 | Ingen klinisk beslutning eller handling uden identificeret, autoriseret aktør og eksplicit sporbar handling. | SPEC SYS-004, SYS-012, PRO-003 |
| AC-002 | Stilhed, visning, timeout og defaults må aldrig registreres som accept eller klinisk fakta. | CON art. 4 og anti-omgåelse; SPEC Decision invariant, AT-DSU-01 |
| AC-003 | Ubekræftede, manglende eller genererede oplysninger må ikke fremstilles som observerede fakta. | GOV §14; SPEC CAP-CTX, CAP-DOC, PRO-007 |
| AC-004 | Fakta, inferens, forslag, beslutning, handling og dokumentation må ikke dele autoritetsstatus gennem sammenblanding i tekst eller data. | CON art. 2; SPEC SYS-003, §18 |
| AC-005 | Kliniske påstande skal bevare kilde, version, scope, styrke, aktualitet, begrænsning og konfliktstatus. | GOV §14; SPEC CAP-EVD |
| AC-006 | Klinisk betydende outputs skal være reproducerbare i betydning eller forklare kontrolleret variation. | SPEC INF-002, NFR-REL-001 |
| AC-007 | Klinisk logik, normativ prioritering og suppression må ikke være skjult i generisk UI, modeloutput eller integration. | GOV anti-laundering; SPEC Capability rule, CAP-CTX-002, CAP-ATT |
| AC-008 | Alle capabilities og deres failure-state-kontrakter skal bevares uanset senere komponentdeling. | SPEC Capability Map §5, EXT-001 |
| AC-009 | Kritiske dependency-, retrieval-, audit- og datafejl skal være synlige og udløse defineret degradering/fallback. | SPEC SYS-013, NFR-SAF-002, PRO-008 |
| AC-010 | En lavere arkitektur- eller implementeringsbeslutning må ikke omgå højere normer eller manglende governance-gates. | GOV §3–5; SPEC CAP-GOV, PRO-012, TRC-004 |
| AC-011 | Alle klinisk betydende requirements skal have ubrudt bidirektionel trace til norm, arkitektur, test, release og monitorering. | GOV §5; SPEC TRC-001–005 |
| AC-012 | Klinisk betydende dokumentation er et udkast, indtil en autoriseret bruger godkender den; Cortex må ikke signere. | SPEC CAP-DOC-001–003 |
| AC-013 | Data skal være formålsbegrænsede og have ejer, provenance, klassifikation, adgang og retention; sekundær brug kræver særskilt governance. | SPEC INF-001–005, NFR-PRI-001, PRO-011 |
| AC-014 | Klinisk betydende produktionsadfærd må ikke lære eller ændre sig skjult. | GOV §18; SPEC CAP-LRN, PRO-010 |
| AC-015 | Højrisiko-use cases kan ikke frigives uden risikoproportionel Safety Case, Evaluation Protocol, Release Dossier og aktiv monitoring. | GOV §13 og §16; SPEC NFR-SAF-001 |
| AC-016 | Governance-godkendelse må ikke fremstilles som regulatorisk conformity, QMS eller myndighedsgodkendelse. | GST Regulatory Architecture Rule; SPEC CAP-GOV-grænse, produktgrænser §28 |
| AC-017 | Systemet må ikke bindes normativt til en bestemt model, leverandør, journal, interface, database, cloud eller deploymentform. | CON Constitution Stress Test; SPEC SYS-005 |
| AC-018 | Arkitekturens efterlevelse vurderes på faktiske og forudsigelige effekter, ikke dokumenttilstedeværelse eller et formelt sidste klik. | CON anti-omgåelsesregel; GOV executive rule 6; SPEC forbudsregel §25 |
| AC-019 | Ikke-trivielle vurderinger skal bevare relevante alternative hypoteser, støtte, modbevis og åbne spørgsmål; manglende mellemregning skal reducere sikkerhed eller skabe informationsbehov. | SPEC CAP-RSN-001–003 |
| AC-020 | Risiko må ikke reduceres til en skjult enkeltscore; alvor, sandsynlighed, tidshorisont, reversibilitet og risikobærer skal kunne repræsenteres, og safety-net skal have trigger, handling, ansvarlig og tid. | SPEC CAP-RSK-001–003 |
| AC-021 | Patientkommunikation skal bevare planens usikkerhed og betingelser, gøre kritiske handlinger entydige og være tilgængelig som systemegenskab. | SPEC CAP-PCM-001–003, NFR-ACC-001 |
| AC-022 | Knowledge retrieval må kun bruge identificerede, use-case- og versionsgodkendte kilder; lokale instrukser og generel evidens skal kunne skelnes. | SPEC CAP-KNR-001–003 |
| AC-023 | Enhver klinisk use case og betydende ændring skal klassificeres før design; risk tier bestemmer obligatoriske artifacts, gates og godkendelser. | GST P0 risk tailoring/regulatory gate; SPEC CAP-GOV-001–003 |

## 5. Quality Attribute Scenarios

Numeriske tærskler, som ikke findes i de normative kilder, opfindes ikke her. Hvor Specification kræver use-case-specifikke SLO’er eller stopgrænser, er godkendelsen af disse et exit-kriterium for det konkrete downstream-design.

### QA-001 — Safety

- **Scenarie:** En kritisk data- eller systemafhængighed svigter under en klinisk betydende vurdering.
- **Stimulus:** Manglende, forsinket, modstridende eller ugyldigt input, retrieval failure eller audit failure.
- **Respons:** Cortex viser berørt funktion som `DEGRADED` eller relevant ukendt/konflikttilstand, stopper eller afgrænser berørte outputs og viser en sikker manuel fallback.
- **Målbar succes:** Fault-injection og realistisk workflow-test viser ingen tavs substitution, ingen falsk normalitet og ingen uautoriseret fortsættelse.
- **Trace:** SPEC NFR-SAF-002, NFR-ROB-001, SYS-013, AT-001.

### QA-002 — Performance

- **Scenarie:** En klinisk interaktion eller integration svarer langsommere end tilladt i den godkendte use case.
- **Stimulus:** Belastning, netværkslatency eller langsom ekstern afhængighed.
- **Respons:** Systemet måler responstid, håndhæver timeout og viser degradering/fallback uden at præsentere forsinkelsen som normal funktion.
- **Målbar succes:** p50/p95/p99 og timeout/fallback-test opfylder den godkendte use-case-SLO; overskridelser er observerbare og klassificeres korrekt.
- **Trace:** CON art. 3; SPEC NFR-PER-001, NFR-AVL-001.

### QA-003 — Auditability

- **Scenarie:** En uafhængig reviewer undersøger en samplet klinisk betydende beslutning efter hændelsen.
- **Stimulus:** Autoriseret rekonstruktionsanmodning.
- **Respons:** Systemet fremfinder input, provenance, versionsbundne regler/evidens/modeller, output, menneskelig beslutning, ekstern handling og gældende policy.
- **Målbar succes:** Revieweren kan reproducere beslutningskæden uden mundtlig viden, og integrity-status er verificerbar.
- **Trace:** CON art. 2, 5 og 8; SPEC CAP-AUD-001–003, NFR-AUD-001, AT-012.

### QA-004 — Maintainability

- **Scenarie:** En regel, evidenskilde, model eller capability-kontrakt ændres.
- **Stimulus:** Godkendt change proposal eller upstream-review-trigger.
- **Respons:** Berørte dependencies, ejere, tests, risici, releases og retirement/rollback-forhold identificeres før ændring.
- **Målbar succes:** Registry-audit finder ejer, version, dependency map, review-trigger og retirement-plan; ingen berørt capability-kontrakt eller forbud er uallokeret.
- **Trace:** GOV §6, §9 og §15; SPEC NFR-MNT-001, EXT-003, Definition of Done §31.

### QA-005 — Testability

- **Scenarie:** En klinisk betydende requirement eller arkitekturkontrakt verificeres.
- **Stimulus:** Build-, release- eller change-gate.
- **Respons:** Testen identificerer requirement-version, systemversion, data/evidence-version, miljø, resultat og observerbart acceptance-kriterium.
- **Målbar succes:** Positive, negative, edge-, drift- og relevante subgroup-scenarier kan køres reproducerbart; kritiske orphan requirements og brudte links er nul for release-scope.
- **Trace:** GOV §4 og §16; SPEC TRC-001/002/004, Acceptance Catalogue §27, Definition of Done §31.

### QA-006 — Scalability and extensibility

- **Scenarie:** Cortex udvides med en ny use case, population, integration eller model inden for eller uden for eksisterende scope.
- **Stimulus:** Foreslået extension eller major change.
- **Respons:** Systemgrænse, capability-kontrakter og domænesemantik bevares; applicability/risk classification, normative diff, impact graph og migration/rollback-plan opdateres efter change class.
- **Målbar succes:** Ingen capability-kontrakt, semantisk type eller forbud mistes; change klassificeres korrekt som normal, major eller ratifikationskrævende.
- **Trace:** SPEC EXT-001–004, BND-002, produktudvidelsestabel §29.

### QA-007 — Robustness

- **Scenarie:** Cortex modtager manglende, fejlagtige, modstridende, forsinkede eller out-of-scope data.
- **Stimulus:** Adversarial eller realistisk edge-case input.
- **Respons:** Systemet bevarer konflikt/usikkerhed, afgrænser output, efterspørger information eller eskalerer; ingen irreversibel udglatning eller latest-wins-default.
- **Målbar succes:** Den godkendte edge-case suite viser korrekt eksplicit state og ingen opfundne facts eller skjulte højrisikosignaler.
- **Trace:** SPEC INF-002/003, NFR-ROB-001, PRO-007/008, AT-002/006.

### QA-008 — Explainability and decision integrity

- **Scenarie:** En kliniker vurderer, afviser eller ændrer et forslag.
- **Stimulus:** Bruger anmoder om rationale eller vælger et alternativ.
- **Respons:** Relevante input, kilder, rationale, usikkerhed, alternativer og begrænsninger vises proportionalt; forslag og menneskelig beslutning forbliver separate.
- **Målbar succes:** Fidelity- og comprehension-test viser, at begrundelsen svarer til den faktiske afledning, og at afvisning ikke registreres som accept eller mødes med skjult straf.
- **Trace:** CON art. 2, 4 og 5; SPEC NFR-EXP-001, SYS-012, CAP-DSU, AT-003.

### QA-009 — Security and privacy

- **Scenarie:** En aktør eller integration forsøger at læse, ændre, eksportere eller udføre handling uden gyldigt scope.
- **Stimulus:** Uautoriseret eller overdreven adgangsanmodning.
- **Respons:** Anmodningen afvises uden delvis udførelse, hændelsen auditeres og relevante alerts/incident flows aktiveres uden overdreven persondatalogning.
- **Målbar succes:** Autorisations-, integrity-, confidentiality- og access-tests viser least privilege, ingen delvis handling og korrekt audit/incident response.
- **Trace:** SPEC CAP-AUD-002, INF-001, NFR-PRI-001, NFR-SEC-001, AT-009.

### QA-010 — Availability and recovery

- **Scenarie:** En klinisk relevant Cortex-funktion eller ekstern afhængighed bliver utilgængelig.
- **Stimulus:** Nedetid, deploymentfejl eller dependency outage.
- **Respons:** Systemet viser præcist tabt funktion, bevarer autoriseret manuel arbejdsgang og følger godkendt recovery-, continuity- og downtime-procedure.
- **Målbar succes:** Use-case-SLO, recovery-mål og disaster-recovery-øvelse er godkendt og bestået uden falsk fuld funktion.
- **Trace:** SPEC NFR-AVL-001, SYS-013, interaction type `DEGRADED/fallback`.

### QA-011 — Accessibility

- **Scenarie:** En autoriseret bruger eller patient med relevante sensoriske, motoriske, sproglige eller kognitive behov anvender et kerneflow.
- **Stimulus:** Opgaven gennemføres med den relevante hjælpemiddel-, input- eller forståelseskontekst.
- **Respons:** Kernefunktion, klinisk betydning, usikkerhed, handling og fallback forbliver tilgængelige uden tab af autoritet eller sandhedsindhold.
- **Målbar succes:** Godkendt standardtest og realistisk brugertest viser, at målgruppen kan gennemføre kerneopgaven og korrekt forstå klinisk betydende information.
- **Trace:** CON artikel 1 og 7; SPEC CAP-PCM-003, NFR-ACC-001, AT-PCM-01.

### QA-012 — Equity and organizational impact

- **Scenarie:** En klinisk betydende funktion evalueres på tværs af relevante subgrupper og organisatoriske kontekster.
- **Stimulus:** Pre-release evaluation eller monitorering viser forskel i ydelse, skade eller byrde.
- **Respons:** Forskellen bevares som synligt signal, kobles til ejer og review-trigger og kan begrænse eller stoppe berørt drift efter godkendte tærskler.
- **Målbar succes:** Prædefinerede subgroup- og balancing metrics samt stopgrænser er evalueret; AT-010 kan demonstreres for relevant scope.
- **Trace:** CON artikel 7 og 8; GOV §17; SPEC NFR-EQU-001, CAP-LRN-002, AT-010.

## 6. Architecture Decision Domains

Domænerne beskriver, hvad senere design skal afgøre. De vælger ingen løsninger.

| Domæne | Afgrænsning for senere design | Obligatoriske upstream-input | Forventet arkitekturoutput |
|---|---|---|---|
| System Context & Trust Boundaries | Systemgrænse, aktører, myndighed, eksterne afhængigheder og tillidszoner. | SYS, BND, applicability og intended purpose | Detaljeret context- og trust-boundary-model |
| Domain Architecture | Kerneobjekter, semantiske typer, states, relationer, autoritet og invariants. | SPEC §3–4, §18–21; LEX når etableret | Domæneschema og state model |
| Application Architecture | Kliniske flows, use-case-orchestrering, session/konsultation og human-control-overgange. | Workflow, capability contracts, Interaction Model | Applikationsansvar og flowkontrakter |
| Capability & Service Architecture | Allokering af capabilities til ansvarsenheder uden kontrakttab. | CAP-EVD/CTX/RSN/RSK/ATT/DSU/DOC/PCM/KNR/LRN/AUD/GOV | Capability-to-component map og serviceansvar |
| Data Architecture | Provenance, lineage, lifecycle, correction, retention, deletion og separation af clinical/audit/learning data. | INF-001–005, privacy/QMS-input | Data- og information architecture |
| Integration Architecture | Kontrakter til journal, identity, evidens, lokale kilder, handlinger, messaging, audit og QMS. | System context, auth, failure og data semantics | API-/eventkontrakter og integration failure model |
| AI Architecture | Modellernes tilladte roller, provenance, variation, evaluation, monitoring, change og fallback. | Intended purpose, capability scope, evidence/model governance | Model boundary og AI control architecture |
| Security & Privacy Architecture | Identity, authorization, confidentiality, integrity, supply chain, retention, patientrettigheder og incident response. | Threat/privacy model og regulatory/QMS scope | Security/privacy architecture og control allocation |
| UX & Interaction Architecture | Passive, proactive, critical, explanation, documentation, patient og fallback states samt attention budget. | Consultation Impact Standard og use-case metrics | UX state model og interaction contracts |
| Deployment & Operations Architecture | Miljøer, availability, observability, release, rollback, continuity og operational ownership. | Kritikalitet, SLO’er, classification og QMS | Deployment-, runtime- og operationskontrakter |
| Governance & Traceability Architecture | IDs, registry, dependency graph, status, gates, normative diff og release blocking. | GOV §4–6, TRC-001–005 og GI-013/014 | Traceability graph og governance enforcement model |
| Verification Architecture | Testlag, replay, fault injection, acceptance catalogue, clinical evaluation, evidence og release proof. | Acceptance catalogue, EP/CSC/RD og risk tier | End-to-end verification architecture |

Domænerne må designes iterativt, men ingen må færdiggøres isoleret, hvor dens kontrakt afhænger af et andet domænes semantik, myndighed eller failure state.

## 7. Initial ADR Register

| ADR | Titel | Status | Formål | Record |
|---|---|---|---|---|
| ADR-001 | Repository Structure | Proposed | Fastlægge canonical placering, ejerskab og lifecycle for arkitektur-, governance-, specification-, implementation- og verification-artifacts. | `docs/architecture/decisions/ADR-001-Repository-Structure.md` |
| ADR-002 | Canonical Governance Sources | Proposed | Fastlægge hvordan arkitektur resolver og verificerer autoritative governance-kilder uden dublet canonicality. | `docs/architecture/decisions/ADR-002-Canonical-Governance-Sources.md` |
| ADR-003 | Traceability Model | Proposed | Fastlægge identitet, relationer, versionering og gate-adfærd for den bidirektionelle norm-til-effekt-kæde. | `docs/architecture/decisions/ADR-003-Traceability-Model.md` |

Ingen ADR er accepteret eller implementeret gennem denne baseline.

## 8. Architecture Risks

Risiciene registreres uden lokal accept eller løsningsvalg.

| ID | Klasse | Risiko | Konsekvens | Upstream/gap |
|---|---|---|---|---|
| AR-001 | Governance | Constitutionens endelige ratifikation er ikke dokumenteret. | Arkitekturens højeste normative autoritet kan ikke godkendes reproducerbart. | GI-010 |
| AR-002 | Governance | Governance Framework er ikke `ACTIVE`, og Stress Testens P0-gates er åbne. | Governance-håndhævelse og beslutningsrettigheder kan blive foreløbige eller ceremonielle. | GI-011; GST §9/12 |
| AR-003 | Governance | Navngivne ejere, godkendere og stable document IDs mangler. | ADR-, risk-, gate- og escalation-ansvar kan ikke udføres entydigt. | GI-012/013 |
| AR-004 | Governance | LEX, Position Papers, Design Principles og canonical trace registry mangler. | Arkitektur kan komme til at springe obligatoriske normative mellemled over. | GI-014 |
| AR-005 | Governance | Specificationens `RATIFIED BASELINE` er ikke konsistent med upstream-status. | Baselinens godkendelsesgrundlag kan bestrides. | GI-015 |
| AR-006 | Teknisk | Eksisterende kode og arkitektur er ikke allokeret mod Specification v1.0. | Genbrug kan skjule kontraktbrud og uallokerede forbud. | GI-017 |
| AR-007 | Teknisk | Capability-grænser kan forveksles med komponent- eller servicegrænser. | Skjulte normer, duplikeret ansvar eller tabte failure states. | SPEC Capability rule |
| AR-008 | Teknisk | Semantiske typer kan udglattes på tværs af tekst, API’er eller integrationer. | Forslag, inferens eller default kan fremstå som klinisk fakta eller beslutning. | SPEC SYS-003, §18, PRO-007 |
| AR-009 | Teknisk | Performance-, availability-, recovery- og capacity-tærskler er ikke fastsat pr. use case. | Safe timeout, fallback og driftsdimensionering kan ikke godkendes. | SPEC NFR-PER-001/NFR-AVL-001 |
| AR-010 | Teknisk | AI-modelrolle, variation, evaluation og failure-scope er endnu ikke afgrænset. | Modeloutput kan få skjult autoritet eller ikke-reproducerbar betydning. | SPEC SYS-005, NFR-REL-001; AI Architecture åben |
| AR-011 | Teknisk | Eksterne kilders kvalitet, latency og availability kan ikke kontrolleres af Cortex. | Forkerte eller manglende input kan påvirke outputs uden korrekt degraded state. | SPEC §2, CAP-KNR/CTX |
| AR-012 | Regulatorisk | Intended purpose, jurisdiktion, MDSW/MDR- og AI Act-klassifikation mangler. | Regulatory, safety, data, logging, evidence og releasekrav kan ikke fastlægges. | GI-016; GST P0 Regulatory Gate |
| AR-013 | Regulatorisk | QMS-ejer og crosswalk til governance-artifacts mangler. | Governance kan fejlagtigt behandles som compliance eller conformity evidence. | GI-016; GST Regulatory Architecture Rule |
| AR-014 | Regulatorisk | Retention, secondary use, patient rights og logging-conflicts er ikke use-case-afgjort. | Ulovlig retention, utilstrækkelig audit eller skjult sekundær brug. | SPEC INF/NFR-PRI; GST QMS gap |
| AR-015 | Organisatorisk | Kompetente governance-, safety-, evidence- og review-funktioner er ikke operationaliseret. | Selvgodkendelse, forsinkede gates eller manglende stopret. | GOV §10–11; GST minimal driftsmodel |
| AR-016 | Organisatorisk | Human oversight kan blive formelt uden tid, kompetence eller praktisk mulighed. | Klinikeren bliver symbolsk sidste sikkerhedsbarriere. | SPEC SYS-012, PRO-009; GST clinician review |
| AR-017 | Organisatorisk | Governance-processens byrde og risk-tier-tailoring er ikke afprøvet. | Shadow governance, bypass eller samme proces for alle ændringer. | GST P0 risk tailoring |
| AR-018 | Organisatorisk | Consultation Impact Standard og outcome/balancing metrics er ikke operationaliseret. | Teknisk korrekthed kan forbedres uden bedre klinisk arbejde eller med øget kognitiv byrde. | GST P0 Consultation Impact; SPEC §22 |
| AR-019 | Organisatorisk | Monitoring, incident learning, rollback og escalation er ikke øvet i drift. | Skade eller drift opdages og begrænses for sent. | CON art. 8; GOV §18; SPEC Definition of Done §31 |

## 9. Traceability Matrix

### 9.1 Baselineafsnit til normative kilder

| Baselineafsnit | Philosophy | Constitution | Governance Framework | Specification |
|---|---|---|---|---|
| 0. Formål og autoritet | Fortolkningsgrundlag | Artiklernes foreslåede forrang | §2–7 hierarchy, identity og lifecycle | Normativ protokol §0 |
| 1. Architecture Principles | Kap. 3–27, især kerneprincipper | Artikel 1–8 og anti-omgåelse | §3–5, §12–19, §22–23 | SYS, CAP, INF, NFR, PRO, TRC, BND og EXT |
| 2. Architectural Drivers | Opmærksomhed, kontekst, dømmekraft og konsultation | Værdighed, integritet, proportionalitet, autonomi, korrigerbarhed | Safety, epistemic, architecture, release og learning governance | Capability contracts og NFR-krav |
| 3. System Context | Cortex som kognitivt lag og konsultationen som primær enhed | Artikel 1, 4 og 7 | Scope, roller og ansvar | §1–2, aktørtabel, produktgrænser §28 |
| 4. Architectural Constraints | Ukendt, kontekst, forklaring, tilbageholdenhed | Artikel 2–5 og 8 | Executive rules, anti-laundering og no-jump | SYS/CAP/INF/NFR/PRO/TRC/BND |
| 5. Quality Attribute Scenarios | Pålidelighed, timing, forklaring og korrigerbarhed | Artikel 2–8 | §13–18 og health metrics | NFR, AT-001–012 og §31 |
| 6. Decision Domains | Kognitiv støtte frem for teknologiform | Teknologineutrale beskyttelsesfunktioner | §15 architecture governance | Implementeringsaflevering §30 |
| 7. Initial ADR Register | Ingen direkte beslutningskraft | Artikel 5 og 8 | §5–6 og ADR template §15 | TRC, EXT og §30 |
| 8. Architecture Risks | Begrænsninger, tillid og menneskelig rolle | Artikel 1–8 | §19–26 | Failure states, NFR, PRO og Definition of Done |
| 9. Traceability Matrix | Forståelig begrundelse | Artikel 2, 5 og 8 | §4–6 | TRC-001–005 |
| 10. Exit Criteria | Teknologi sekundær til konsultationen | Konflikt- og anti-omgåelsesregler | Gates og minimum viable governance | Architecture acceptance §30 og Definition of Done §31 |

### 9.2 Kravfamilier til downstream-design

| Upstream-familie | Primært downstream-domæne | Obligatorisk bevisretning |
|---|---|---|
| SYS/BND | System Context, Domain, Application | Aktør, scope, myndighed, intended purpose og ikke-formål |
| CAP | Capability & Service, Application, Integration | Kontrakt, dependencies, begrænsninger og failure state |
| INF | Data, Integration, Security/Privacy | Type, provenance, version, lifecycle, access og correction |
| NFR | Alle domæner; samlet i Verification | Kvalitetsscenarie, mål, test og driftsbevis |
| PRO | Alle ADR’er og komponentallokeringer | Negativ acceptance-test og release-blocking control |
| TRC | Governance & Traceability, Verification | Ubrudt bidirektionel relation og impact graph |
| EXT | Alle change- og migrationsdesigns | Normativ diff, classification, evaluation og rollback |
| AT | Verification Architecture | Reproducerbart testbevis med versionsmetadata |

## 10. Exit Criteria

### 10.1 Baseline exit criteria

Baseline v1.0 kan sendes til governance- og architecture review, når:

1. alle sektioner har upstream-trace og ingen kilde er omskrevet;
2. alle Architecture Principles er dokumenteret som afledte og ikke nye;
3. alle capability contracts, NFR-familier og absolutte forbud er repræsenteret eller eksplicit allokeret til senere design;
4. ADR-001–003 findes som `Proposed` records;
5. åbne governance-, tekniske, regulatoriske og organisatoriske risici er registreret uden lokal accept;
6. ingen database-, cloud-, leverandør-, model-, protokol-, komponent- eller teknologistakbeslutning er indført; og
7. den kompetente reviewer bekræfter, at dokumentet må fungere som kontrakt for det næste designtrin.

### 10.2 Readiness decision

**Cortex Build er klar til at begynde de første konkrete arkitekturdesigns i `Proposed` status.**

Følgende kan begynde uden at foregribe manglende governance-input:

- Domain Architecture med udgangspunkt i Specificationens kerneobjekter og semantiske tilstande;
- Governance & Traceability Architecture som model og conformance-inventory;
- Verification Architecture som allokering af krav, forbud og eksisterende acceptance tests;
- detaljeret System Context og Trust Boundary inventory; og
- capability-to-responsibility-analyse uden komponentvalg.

Følgende kan ikke færdiggøres eller godkendes endnu:

- regulatorisk, security-, privacy-, logging- og retention-design før GI-016 er afgjort;
- use-case-specifik safety-, performance-, availability- og outcome-accept før intended purpose, risk tier og mål er godkendt;
- endelig service-, data-, AI-, integration-, deployment- eller component architecture før Domain Architecture, capability-allokering og relevante PP/DP-mellemled findes;
- conformance-claim for eksisterende kode før GI-017 er behandlet; og
- release- eller clinical-use-godkendelse før Safety Case, Evaluation Protocol, Release Dossier, QMS-links og aktiv monitoring foreligger.

Det næste logiske Build-arbejde er derfor en Proposed Domain Architecture og en Proposed Traceability Architecture i parallel dokumentmæssig udvikling. Ingen implementering må påbegyndes alene på baggrund af denne baseline.
