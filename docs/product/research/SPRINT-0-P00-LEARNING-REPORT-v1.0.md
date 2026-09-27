# Sprint 0 P00 Learning Report v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | SPRINT-0-P00-LR-001 |
| Version | 1.0 |
| Lifecycle-status | DRAFT — non-active Product evidence artifact |
| Evalueringstilstand | P00 gennemført |
| Dato | 2026-07-22 |
| Evaluator | Founder i rollen som klinisk ekspert (`P00`) |
| Evidenstype | Intern, modereret founder walkthrough med repository-understøttelse |
| Dataklassifikation | Kun syntetiske data |
| Product owner | TODO — navngiven ejer |
| Beslutning | P00 accepteres som intern retningsgivende læring for næste Product-sprint; den accepteres ikke som ekstern brugervalidering, klinisk validering eller releaseevidens. |
| Relationer | [PEV-001](../experience/CORTEX-EXPERIENCE-VISION-v1.0.md); [Sprint 0 Test Plan](../../research/SPRINT-0-TEST-PLAN-v1.0.md); [Implementation Report](../../build/SPRINT-0-IMPLEMENTATION-REPORT-v0.1.md); [Domain Architecture](../../architecture/CORTEX-DOMAIN-ARCHITECTURE-v1.0.md) |

## 1. Executive summary

P00 viser, at Sprint 0-prototypen har brugbare sikkerheds- og kontrolfundamenter, men at produktets tyngdepunkt skal flyttes. Cortex bør ikke primært opleves som en tekstgenerator med efterfølgende godkendelsestrin. Det bør opleves som et roligt klinisk arbejdsredskab, der hjælper klinikeren med at strukturere sin vurdering og omsætter den autoriserede menneskelige vurdering til formålstilpasset dokumentation.

De vigtigste læringer er produkt- og kliniske designindsigter, ikke feature requests:

1. Klinisk vurdering skal være det bærende input; tekst er et afledt dokumentationsprodukt.
2. AI Summary mangler et intuitivt og klinisk afgrænset formål.
3. Den interne statusmodel er sikkerhedsmæssigt nyttig, men dens fulde mekanik skaber unødig brugerbyrde.
4. Henvisninger skal udformes som kommunikation til en klinisk modtager, ikke som et sekundært journaludtræk.
5. Safety-net, manglende information og kliniske opmærksomhedspunkter skal kunne understøttes uden at Cortex træffer eller foregiver at træffe en klinisk beslutning.
6. Variabelt dokumentationsniveau er en relevant hypotese, men må ikke ændre de kliniske facts eller skjule sikkerhedskritisk information.

P00 er tilstrækkelig til at prioritere næste læringsspørgsmål. Den er utilstrækkelig til at validere usability, clinical safety, klinisk effekt, adoption eller generaliserbarhed.

## 2. Prototypeversion og testforhold

| Felt | Registrering |
|---|---|
| Prototype | Sprint 0 Learning Prototype på `/prototype/sprint-0` |
| Implementeringsrapport | `SPRINT-0-IMPLEMENTATION-REPORT-v0.1.md` |
| Branch angivet af Build | `prototype/sprint-0` |
| Prototype-commit angivet i provenance | `1b1b0bdcac3b578016fa7e13417327f338c976df` |
| Baseline parent angivet af Build | `c002b93453d9fc97ca219053575bbfc6b885f480` |
| Case | Fast syntetisk knæcase: 34-årig mand, vridtraume under fodbold |
| AI | Deterministisk lokal mock-provider; ingen live-model |
| Eksterne integrationer | Ingen backend, persistence, EHR, referral delivery eller ekstern request |
| Evaluering | Intern founder walkthrough udført af én klinisk ekspert (`P00`) |
| Browser/viewport | Ikke registreret i det tilgængelige P00-grundlag |
| Sessionstid, varighed og rånoter | Ikke registreret i det tilgængelige P00-grundlag |
| Optagelse/instrumenteringsudtræk | Intet P00-specifikt råspor registreret; lokal sessioninstrumentering findes i prototypen, men er ikke et audit- eller researchsystem |

Build verificerede 2026-07-22 prototypen med typecheck, 165/165 unit tests, 27/27 Chromium-flows og production build. Det dokumenterer teknisk reproducerbarhed af de testede flows, ikke den kliniske eksperts oplevelse eller produktets kliniske egnethed.

## 3. Begrænsninger og evidensgrænse

- Evalueringen er en intern founder walkthrough, ikke en uafhængig usability-test.
- Der er ingen ekstern brugervalidering og ingen deltagere fra den planlagte population på 3–5 praktiserende læger.
- P00 er en intern pilot og opfylder ikke beslutningskriterierne i Sprint 0 Test Plan v1.0 for en fuld læringscyklus.
- Én ekspert, én syntetisk case og én prototypekontekst kan ikke dokumentere hyppighed eller generaliserbarhed.
- Der foreligger ikke tidsstemplede P00-observationsnoter, opgavemetrics, ordrette citater, browser/viewport eller fuldt sessionspor. Findings er derfor analytiske registreringer af evaluatorens sammenfattede læring, ikke rekonstruktioner af rå adfærd.
- Repository-verifikation kan vise, hvad prototypen gør, men ikke hvordan klinikere forstår eller bruger den.
- De fem tidligere AI-agentscenarier er legacy-understøttelse og ikke admissible Research-evidens, fordi fuld agent-/modelprovenance mangler.
- Der er ingen live-AI, klinisk pathway-validering, patientsikkerhedsvalidering, regulatory vurdering eller brug med virkelige patientdata.

Konsekvensen er, at rapporten kan styre, hvad Cortex bør lære næste gang, men ikke bevise, hvilken løsning der er korrekt.

## 4. Positive observationer, der skal bevares

Disse forhold er primært repository-verificerede styrker og er konsistente med P00-retningen. De må ikke fremstilles som ekstern brugervalidering.

1. **Klinikerens registrering er eksplicit.** Urørte eller ukendte værdier genereres ikke som normale eller negative kliniske facts.
2. **Menneskelig vurdering er separat.** AI-output, patientkontekst og klinikerens arbejdshypotese er adskilte tilstande.
3. **Menneskelig korrektion bevares.** Manuel journaltekst overskrives ikke automatisk, når konsultationsdata ændres; ændringen markeres som stale.
4. **Afvisning ændrer ikke kilden.** Et AI-resumé eller dokumentudkast kan afvises uden at slette konsultationsfakta eller skabe en beslutning.
5. **Handling og levering er ikke kollapset.** Review, approval, copy og delivery er logisk adskilt, og prototypen sender intet.
6. **Degraderet AI har recovery.** Brugeren kan fortsætte manuelt med den synlige patientkontekst; AI er ikke en obligatorisk vej gennem flowet.
7. **Manglende information er synlig.** Udkast opstår først, når definerede prototypeinput er til stede, og mangler vises frem for at blive udfyldt skjult.

Disse styrker bør bevares semantisk, selv hvis den synlige interaktion forenkles væsentligt.

## 5. Findings

### Critical

Der er **ingen bekræftede Critical findings** i P00-grundlaget. Det betyder ikke, at der ikke findes kritiske risici. Datagrundlaget er for begrænset til at frikende produktet. Hvis senere test viser, at manglende safety-net, skjult usikkerhed eller AI-formulering fører til falsk tryghed, uautoriseret handling eller manglende sikker recovery, skal forholdet genklassificeres som Critical.

### Material

#### F-M01 — Produktets centrum er tekst frem for klinisk vurdering

**Evidensstyrke:** Direkte intern ekspertfortolkning; understøttet af prototypens tre fremtrædende outputflader.  
**Observation:** Flowet kulminerer i journal- og henvisningstekster med gentagne review- og kopihandlinger. Det kan få Cortex til at opleves som tekstproduktion frem for klinisk arbejde.  
**Designindsigt:** Cortex skal bevæge sig fra tekstgenerering til **klinisk beslutningsstøttet dokumentation**. Systemet skal hjælpe med at gøre relevante facts, ukendte forhold, klinikerens vurdering, begrundelse, plan og opfølgning sammenhængende. Det må ikke overtage Human Decision.  
**Severity:** Material, fordi et forkert produktcentrum påvirker mental model, tillid, workflow og værdiforslag på tværs af hele oplevelsen.

#### F-M02 — Journalgeneratoren mangler en tydelig struktureret klinisk vurdering som grundlag

**Evidensstyrke:** Direkte intern ekspertfortolkning; repositoryet viser strukturerede facts og en fri arbejdshypotese, men ikke en samlet klinisk vurderingsmodel.  
**Observation:** Journalen kan genereres fra registrerede facts, mens klinisk syntese, relevante negative fund, usikkerhed, rationale, plan og safety-net ikke fremstår som én sammenhængende vurdering.  
**Designindsigt:** Journalen skal afledes af en struktureret klinisk vurdering. Struktur betyder ikke flere formularfelter; den betyder et eksplicit klinisk indholdsgrundlag, hvor known, unknown, relevant negative, assessment, rationale, plan og safety-net kan skelnes og genbruges loyalt.  
**Severity:** Material, fordi dokumentation uden tilstrækkelig vurderingsstruktur kan være velformuleret, men klinisk ufuldstændig eller misvisende.

#### F-M03 — “AI Summary” har ikke en intuitiv klinisk rolle

**Evidensstyrke:** Direkte intern ekspertobservation; P00-specifik adfærdssekvens er ikke bevaret.  
**Observation:** Funktionen hedder “AI Summary”, ligger som en særskilt AI-flade og kan genereres, afvises eller fejle, men dens kliniske job er ikke selvforklarende.  
**Designindsigt:** Funktionen skal redefineres ud fra det kliniske behov—eksempelvis orientering, identifikation af mangler/konflikter eller støtte til vurdering—før navn, placering eller interaktion vælges. “AI” er en fremstillingsmekanisme, ikke et tilstrækkeligt brugerformål.  
**Severity:** Material, fordi en uklar rolle kan skabe forkert forventning, unødig kontrolbyrde eller automation bias.

#### F-M04 — Den synlige statusmodel pålægger brugeren systemets interne mekanik

**Evidensstyrke:** Direkte intern ekspertfortolkning og repository-verificeret flow.  
**Observation:** Hvert udkast viser `Draft → Reviewed → Approved for copy → Copied`, med separate synlige handlinger for review, approval og copy. Sondringen er sporbarhedsmæssigt nyttig, men opleves som procesadministration.  
**Designindsigt:** Den interne tilstands- og autoritetsmodel skal bevares, men rutineflowet skal kunne gennemføres gennem én enkel, eksplicit menneskelig handling med forståelig konsekvens. Undtagelser, stale state, afvisning og manglende autorisation skal fortsat være synlige ved behov.  
**Severity:** Material, fordi gentaget statusarbejde øger kognitiv belastning og gør Cortex journalsystem-lignende. Den præcise én-handlingsmodel er fortsat en hypotese, der skal testes.

#### F-M05 — Henvisninger behandles som udkast, ikke fuldt som klinisk kommunikation

**Evidensstyrke:** Direkte intern ekspertfortolkning; understøttet af prototypegeneratorernes korte problem/vurdering/ønske-output.  
**Observation:** Prototypen genererer henvisningsudkast fra udvalgte facts og klinikerens vurdering. Modtagerens opgave, kliniske spørgsmål, relevante fund/negative fund, usikkerhed, allerede iværksat plan og forventet respons er kun delvist repræsenteret.  
**Designindsigt:** En henvisning er et formåls- og modtagerorienteret klinisk kommunikationsdokument. Dens indhold skal afledes af den samme autoriserede kliniske vurdering, men prioriteres efter modtager, spørgsmål, kontekst og ønsket handling—ikke blot kopiere journalen.  
**Severity:** Material, fordi en syntaktisk komplet tekst kan være kommunikativt utilstrækkelig og føre til ekstra arbejde eller uklart ansvar.

#### F-M06 — Safety-net og klinisk opmærksomhed er ikke et samlet oplevelsesansvar

**Evidensstyrke:** Direkte intern ekspertfortolkning; ingen klinisk safety-validering.  
**Observation:** Prototypen viser tekniske mangler og AI-fejl, men har ikke en samlet, klinisk afgrænset måde at håndtere relevante faresignaler, manglende vurderingsdata, opfølgningsbetingelser og safety-net.  
**Designindsigt:** Cortex skal kunne gøre klinisk relevante mangler, risici og opfølgningsbetingelser synlige proportionalt og roligt. Systemet kan støtte opmærksomhed og formulering, men klinikeren skal vurdere, vælge, ændre eller afvise indholdet og eje beslutningen. Fravær af et signal må aldrig fremstilles som fravær af risiko.  
**Severity:** Material i den nuværende syntetiske, recoverable prototype. Findingen bliver Critical, hvis en senere kontrolleret test viser falsk reassurance, overset akut risiko eller usikker recovery.

#### F-M07 — Den samlede UI-belastning er ikke tilstrækkeligt aligned med Experience Principles

**Evidensstyrke:** Intern ekspertfortolkning; understøttet af Build-rapportens observation af en lang side med konsultation og tre udkast.  
**Observation:** Mange samtidige områder, tre dokumentflader, separate statuskontroller og en fremtrædende AI-flade konkurrerer om opmærksomheden.  
**Designindsigt:** Informationsarkitektur og interaction flow skal tage udgangspunkt i klinikerens aktuelle beslutnings- og dokumentationsbehov, ikke i alle systemobjekter, der kan vises.  
**Severity:** Material, fordi den samlede belastning påvirker orientering og kerneflow, selv om lokale kontroller fungerer teknisk.

### Minor

Der registreres **ingen selvstændige Minor findings**. Blandede danske/engelske statuslabels og lokal tekstfriktion kan være kandidater, men P00-grundlaget indeholder ikke tilstrækkelig adfærdsevidens til at prioritere dem som egne findings. De bør heller ikke få lov at reducere de materielle indsigter til kosmetisk copy-editing.

### Hypothesis

#### F-H01 — Kort, standard og udvidet dokumentationsniveau kan reducere efterredigering

**Evidensstyrke:** Hypotese; ikke testet.  
**Antagelse:** Klinikeren kan have behov for forskellig detaljeringsgrad afhængigt af dokumentets formål, casekompleksitet og lokal kontekst.  
**Risiko:** Tre niveauer kan skabe endnu et valg, uforudsigelig tekst eller skjule relevant negative, uncertainty og safety-net.  
**Næste evidensbehov:** Test om klinikere forstår forskellen, kan forudsige resultatet og foretrækker et eksplicit niveau frem for kontekstuel default. Alle niveauer skal bygge på samme kliniske facts og bevare obligatorisk sikkerhedsindhold.

#### F-H02 — Én eksplicit brugerhandling kan skjule statuskompleksitet uden at svække authority

**Evidensstyrke:** Hypotese med stærk Product-rationale; ikke eksternt testet.  
**Antagelse:** Review og authorization kan opleves som én klar klinikerhandling, mens systemet registrerer nødvendige interne transitions.  
**Risiko:** Forenkling kan gøre konsekvensen uklar, sammenblande approval med execution eller reducere contestability.  
**Næste evidensbehov:** Comprehension-test af actor, consequence, edit/reject, stale state og forskellen mellem autorisation, kopiering/afsendelse og faktisk outcome.

#### F-H03 — AI-støtten har højere værdi som orienterings- og opmærksomhedsstøtte end som separat resumé

**Evidensstyrke:** Hypotese afledt af F-M01 og F-M03.  
**Antagelse:** Diskret støtte omkring mangler, konflikter, relevant kontekst og vurderingsstruktur skaber mere klinisk værdi end en særskilt AI Summary-flade.  
**Risiko:** Distribueret AI kan blive usynlig på en uansvarlig måde eller gøre provenance og system contribution vanskelig at forstå.  
**Næste evidensbehov:** Sammenlign mindst to teknologiuafhængige konceptmodeller og mål orientering, kontrol, source-checking og korrekt authority attribution.

## 6. Evaluering mod Experience Principles

| Experience Principle | P00-vurdering | Evidens og produktkonsekvens |
|---|---|---|
| **EP-01 Calm before clever** | Delvist opfyldt | Syntetisk kontekst, ærlig degradation og fravær af auto-delivery understøtter ro. Den lange side, mange samtidige flader, statusser og fremtrædende AI-sektion skaber konkurrerende støj. |
| **EP-03 One clear next action, low friction** | Ikke tilstrækkeligt opfyldt | Flere lige synlige handlinger og gentagne statusovergange gør næste relevante kliniske arbejde uklart. Forenkling må ikke blive et tvunget wizard-flow. |
| **EP-04 Progressive disclosure with evidence at need** | Delvist opfyldt | Gruppehandlingens indhold kan udfoldes, og missing/stale vises. Konsultation, AI og tre udkast er ellers i høj grad samtidige; systemtilstand er mere eksponeret end klinisk relevans kræver. |
| **EP-05 Invisible intelligence, explicit human authority** | Stærkest opfyldt semantisk; ikke fuldt opfyldt oplevelsesmæssigt | AI, kildedata og klinikervurdering er adskilt; afvisning og manuel fortsættelse findes. Den prominente “AI Summary” gør intelligensen mindre diskret, og statusbyrden gør authority tungere end nødvendigt. |

P00 understøtter, men validerer ikke, de fire principles. Især EP-03 og samspillet mellem EP-01, EP-04 og EP-05 bør være acceptance-linse for næste koncepttest.

## 7. Product implications

1. **Produktdefinition:** Cortex’ kerne skal beskrives som klinisk vurderings- og beslutningsstøttet dokumentation, ikke generativ tekstproduktion.
2. **Clinical content model:** Product skal definere de bruger- og dokumentationsbehov, en struktureret klinisk vurdering skal opfylde, uden at fastlægge bounded-context ownership eller LEX.
3. **AI Summary:** Funktionen må ikke videreføres uændret som antaget feature. Dens kliniske job, bruger, timing, input, limitations og relation til Human Decision skal først afklares.
4. **Dokumentfamilier:** Journal og henvisning skal behandles som forskellige formåls- og modtagerorienterede repræsentationer af et fælles autoriseret klinisk grundlag.
5. **Safety-net/attention:** Product skal definere comprehension-, authority- og recovery-outcomes for missing, risk, follow-up og safety-net; thresholds og clinical policy ejes ikke af Product alene.
6. **Statusoplevelse:** Product skal kræve en enkel primær brugerhandling og forståelig konsekvens, mens exception states og contestability forbliver tilgængelige.
7. **Dokumentationsniveau:** Kort/standard/udvidet forbliver en testbar hypotese, ikke et besluttet krav.
8. **Research-status:** P00 giver begrænset støtte til PEV-001 og relaterede assumptions, men lukker ingen Product assumption og erstatter ikke P01–P05-klinikertest.

## 8. Architecture implications

Dette er handoff-behov, ikke Product-beslutninger om domæneejerskab:

1. Architecture bør afklare en semantisk kæde fra registrerede kliniske facts og uncertainty via clinician assessment/Human Decision til afledte dokumentrepræsentationer.
2. Journal og henvisning kræver sporbar afledning og versionering uden at blive samme domæneobjekt eller samme teksttemplate.
3. Den interne lifecycle skal fortsat skelne processing state, functional validity, human authorization, execution og outcome, selv hvis experience viser én primær handling.
4. Human correction skal kunne markere afledte dokumenter stale/invalidated og identificere påvirkede downstream-artefakter uden automatisk omskrivning af godkendt mennesketekst.
5. Risk and Uncertainty samt attention/protection functions skal levere proportional støtte og safe failure uden at skabe implicit Human Decision.
6. Safety-net kræver afklaring af source/policy, actor, clinical authority, traceability og hvilke forhold der er recommendation, decision, documentation eller communication.
7. Dokumentationsniveau bør modelleres som en formåls-/repræsentationsvariation over samme autoriserede kliniske indhold, ikke som tre konkurrerende sandheder.
8. Provenance, Traceability og Audit skal forblive adskilt: provenance forklarer dokumentets afledning, traceability forbinder versioner og downstream impact, og audit registrerer betydende hændelser uden at eje funktionel state.

Architecture-review af PEV-001 er fortsat kvalificeret som non-active og indeholder fem krævede Product-revisioner. P00 ophæver ikke disse revisionsbehov eller GI-018.

## 9. Build implications

1. Rapporten er **ikke** et implementation handoff og autoriserer ingen kodeændring.
2. Den eksisterende P00-prototype skal bevares som versionsfast læringsbaseline, så næste slice kan sammenlignes med samme syntetiske case og kendte flows.
3. Build bør ikke omsætte findings én-til-én til backlogfeatures. Først skal Product specificere learning objectives og acceptance outcomes, og Architecture skal reviewe de semantiske transitions.
4. Et senere P01-build bør gøre klinisk vurderingsgrundlag, dokumentafledning, menneskelig autorisation og stale/recovery observerbare og instrumenterbare uden at kræve production architecture.
5. Test skal fortsat verificere, at ukendte værdier ikke bliver negative facts, at AI ikke skaber Human Decision, at menneskelige rettelser bevares, og at failure ikke simulerer completion.
6. Ingen live-model, real patient data, ekstern delivery eller production integration bør indgå i næste læringsslice uden særskilt governance-, safety- og privacy-autorisation.

## 10. Prioriteret anbefaling til næste sprint

### Anbefalet sprint: P01 — Structured Clinical Assessment to Clinical Communication

**Sprintmål:** Reducér den største produktusikkerhed: Kan Cortex støtte klinikeren i at skabe en eksplicit, autoriseret klinisk vurdering og derfra frembringe rolig, formålstilpasset journal- og henvisningsdokumentation uden at overtage beslutningen?

Prioriteret rækkefølge:

1. **Fastlæg Product learning contract.** Beskriv klinikerens job, nødvendige informationstyper, authority boundary, failure/recovery og målbare Experience outcomes. Undgå konkrete skærme og controls i denne fase.
2. **Architecture-handoff og PEV-revision.** Afklar assessment → Human Decision → document representation, stale/impact semantics og safety-net/attention-grænser. Indarbejd de fem material findings fra PEV-001-H01 før Steering behandler Experience Vision-gatet som passeret.
3. **Udform et afgrænset koncept-slice.** Sammenlign tekstcentreret baseline med en assessment-centreret model. Bevar én syntetisk case, tydelig menneskelig authority og manuel recovery.
4. **Test tre kritiske designspørgsmål sammen:** formålet med AI-støtten, én enkel autorisationshandling og henvisning som klinisk kommunikation.
5. **Behandl dokumentationsniveau som eksperiment.** Sammenlign kort/standard/udvidet eller en relevant alternativ model; mål forudsigelighed, efterredigering og risiko for tab af vigtigt indhold.
6. **Gennemfør intern P01-pilot og derefter 3–5 eksterne klinikere.** Brug det eksisterende testplansprincip med tidsstemplede observationer, opgaveresultater, hjælp, recovery og authority attribution. Founderdata holdes analytisk adskilt fra eksterne deltagere.
7. **Steering-gate efter evidenssyntese.** Vælg først derefter mellem iteration, delvist redesign, nyt slice eller start af næste sprint.

### Foreslåede acceptance outcomes for P01

- Klinikeren kan forklare Cortex’ støttefunktion uden at tillægge systemet beslutningsmyndighed.
- Klinikerens vurdering kan identificeres som grundlag for journal og henvisning.
- Journal og henvisning er klinisk loyale, men tydeligt forskellige i formål og modtager.
- Brugeren kan gennemføre rutineflowet med én tydelig primær handling pr. reelt klinisk commitment; systemtekniske transitions skaber ikke ekstra rutinearbejde.
- Missing, uncertainty, stale state og safety-net kan opdages og håndteres uden alarmstøj eller blindgyde.
- Dokumentationsniveau ændrer ikke facts, authority eller obligatorisk sikkerhedsindhold.
- Experience Principles EP-01, EP-03, EP-04 og EP-05 kan vurderes med direkte observationer frem for præferenceudsagn alene.

## 11. Åbne spørgsmål

1. Hvad er det mindste kliniske vurderingsgrundlag, der er tilstrækkeligt på tværs af journal og henvisning i den valgte case?
2. Hvilke dele er klinikerregistrering, systemafledning, recommendation, Human Decision og dokumentrepræsentation?
3. Hvilket konkret klinisk job skal en efterfølger til “AI Summary” udføre, og hvornår er funktionen overflødig?
4. Hvad skal den ene primære handling betyde, og hvilke konsekvenser kræver særskilt menneskelig commitment?
5. Hvilke safety-net- og attention-signaler kræver clinical policy eller source-evidence, og hvem ejer dem?
6. Hvilke oplysninger gør en henvisning nyttig for forskellige modtagere uden at skabe overdocumentation?
7. Er tre dokumentationsniveauer forståelige og forudsigelige, eller bør detaljeringsgrad afledes af formål og kontekst?
8. Hvilke P00-fund kan reproduceres hos eksterne praktiserende læger, og hvilke er founder-/ekspertbias?

## 12. Sporbarhed

| Finding | Primær kilde | Understøttende repositoryevidens | Evidensstatus |
|---|---|---|---|
| F-M01–F-M07 | P00 founder/klinisk ekspert-syntese, 2026-07-22 | Sprint 0 prototype og Implementation Report v0.1 | Begrænset intern evidens |
| F-H01–F-H03 | Analytisk afledning fra P00 | PEV-001, Test Plan v1.0 og prototype | Hypotese; ikke valideret |
| Positive observationer | Prototypeimplementation | Unit/e2e-resultater og Implementation Report v0.1 | Teknisk verificeret; ikke bruger-valideret |
| PEV-vurdering | P00-syntese + repositoryinspection | PEV-001 EP-01/03/04/05; PEV-001-H01 | Intern review; ikke external research |

## 13. Konklusion og disposition

**Konklusion:** P00 understøtter et delvist redesign af produktets kliniske arbejdsmodel før yderligere featureudvidelse. Cortex bør organiseres omkring struktureret klinisk vurdering, eksplicit menneskelig authority og formålstilpasset dokumentation. AI-resumé, statusflow, safety-net, henvisninger og dokumentationsniveau skal behandles som sammenhængende designproblemer, ikke separate feature requests.

**Konsekvenser:** Product skal eje næste learning contract og experience outcomes; Architecture skal afklare semantik og authority transitions; Build skal afvente et kontrolleret handoff og bevare P00 som baseline.

**Governance-afhængigheder:** Rapporten ændrer ingen lifecycle-status, lukker ingen GI, autoriserer ingen klinisk test med virkelige data og giver ingen release- eller implementationautorisation. Ekstern klinikertest kræver fortsat passende research-, privacy-, safety- og governancekontrol.
