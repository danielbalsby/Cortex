# Sprint 1.1 Founder Evaluation P02 v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | SPRINT-1.1-P02-RE-001 |
| Dokumenttype | Formativt Research evidence- og learning-artifact |
| Version | 1.0 |
| Status | FORMATIVE — intern founder evaluation |
| Dato | 22-07-2026 |
| Tester | Daniel |
| Testtype | Internal Founder Walkthrough (P02) |
| Prototype | Sprint 1.1 Learning Prototype |
| Route | `/prototype/sprint-1-1` |
| Branch | `prototype/sprint-0` |
| Prototypecommit | `01eb5dbf63a791b1e93913d8fb07ff8bf8148814` — `Lock Sprint 1.1 prototype baseline` |
| Data | Kun syntetiske data |
| Upstream | P01 Founder Evaluation; Sprint 1.1 Product Learning Contract (`PDR-008`) |

## 1. Formål og evidensgrænse

P02 undersøger, om Sprint 1.1 bevæger Cortex tættere på **klinisk konsultationsstøtte med dokumentation som output**, og identificerer næste læringsretning.

Evalueringen er en intern founder walkthrough. Den er ikke en brugerundersøgelse, usability-validering, klinisk validering, effektivitetsmåling, clinical-readiness-evidens, produktkrav eller Build-handoff.

### Datagrundlag

Daniel har kombineret egne walkthrough-observationer med observationer fra en skærmoptagelse. Research har ikke fået selve skærmoptagelsen, et tidsstemplet observationsark, sessionstid, kliklog, browser-/viewportdata eller ordrette think-aloud-udsagn. Observationerne registreres derfor som tester-rapporterede, retrospektive observationer. Repository-inspektion bruges til at kontrollere, om relevante funktioner og tilstande findes i den versionslåste baseline; den kan ikke erstatte adfærdsevidens.

### Analyseprincip

Hvert finding skelner mellem:

- **Observation:** hvad testeren rapporterede, og hvad repositoryet kan verificere;
- **Fortolkning:** hvad observationen kan betyde;
- **Testerens anbefaling:** den foreslåede retning;
- **Research-disposition:** hvad Product bør undersøge, uden at Research vælger løsning.

## 2. Executive summary

Sprint 1.1 repræsenterer et tydeligt fremskridt fra Sprint 1. Anamnesen er mere klinisk dækkende, objektiv undersøgelse er mere præcis, ROM kan registreres i grader, målrettede knætests og multi-select findes, journalteksten er forbedret, Cortex Overblik er mere informativt, og tastaturbaseret interaktion opleves positivt.

P02 viser samtidig en ny spænding: mere klinisk indhold har øget sidens længde og den mentale navigationsbyrde. Den centrale usikkerhed er derfor ikke alene, om Cortex mangler flere felter, men hvordan systemet kan bevare klinisk dybde, kontekst og menneskelig kontrol i en mere effektiv arbejdsflade.

Den stærkeste læringsretning er:

> Hvordan skaber Cortex en klinisk arbejdsflade med høj beslutningsrelevant informationstæthed og lav administrativ belastning uden at skjule uncertainty eller overtage klinisk beslutning?

P02 understøtter, at Product afklarer en Sprint 1.2 learning contract og informationsarkitektur før yderligere Build-iteration. Den dokumenterer ikke, at en bestemt one-page-løsning er korrekt.

## 3. Positive observationer

### P02-POS-001 — Anamnesen er væsentligt forbedret

**Observation**  
Daniel oplevede anamnesen som markant mere klinisk dækkende. Baseline indeholder debut, varighed, smerteforløb, traume og mekanisme, smerteplacering, multiple provokationer, funktionsevne, hævelse og tidsforløb, aflåsning, instabilitet samt hvile- og nattesmerter.

**Fortolkning**  
Sprint 1.1 er bevæget fra enkel dataopsamling mod et mere klinisk relevant informationsgrundlag. P02 måler ikke, om alle elementer er relevante, korrekt prioriteret eller hurtige at anvende.

### P02-POS-002 — Objektiv undersøgelse er væsentligt forbedret

**Observation**  
Daniel oplevede positiv udvikling i ROM, knætests, palpation og ligamentundersøgelse. Baseline understøtter ROM i grader, multiple palpationsfund og særskilte resultater for Lachman, valgus, varus, menisk, patella og distal neurovaskulær status.

**Fortolkning**  
Objektiv-delen begynder at fungere som et klinisk undersøgelsesværktøj. Testnavn, samtidige fund og klinisk betydning er dog ikke fuldt repræsenteret alle steder.

### P02-POS-003 — Tastaturflow opleves stærkt

**Observation**  
Daniel vurderede brug af Enter, piletaster og Tab positivt.

**Fortolkning**  
Tastaturinteraktion kan reducere museskift og potentiel klinisk friktion. Der foreligger ingen tidsmåling, fejlregistrering eller accessibility-test fra P02, så effekten skal senere måles.

### P02-POS-004 — Cortex Overblik er værdifuldt

**Observation**  
Cortex Overblik viste status for kliniske domæner, manglende information, kliniske opmærksomhedspunkter og næste skridt. Daniel oplevede funktionen som værdifuld, men ønskede større tekst og højere visuel prioritet.

**Fortolkning**  
Konceptet kan hjælpe med orientering og kontekstbevaring. Dets saliens og næste-handlingsværdi er endnu ikke målt hos eksterne læger.

### P02-POS-005 — Funktionsevne er allerede implementeret som ønsket

**Observation**  
Baseline anvender labelen “Funktionsevne” med valgene upåvirket, let nedsat, betydeligt nedsat og kan ikke støtte.

**Fortolkning**  
Dette P02-forslag er allerede opfyldt i den versionslåste prototype og skal ikke videreføres som et nyt krav. Hvis skærmoptagelsen viste noget andet, indikerer det en versions- eller discoverability-afvigelse, som kræver råsporet for afklaring.

## 4. Findings

Der er ingen bekræftede **Critical** findings og ingen selvstændige **Minor** findings i P02-grundlaget. Fravær af Critical findings er ikke dokumentation for klinisk sikkerhed.

### P02-001 — Arbejdsfladen skalerer dårligt med øget klinisk dybde

**Område:** Information architecture / Workflow / Experience  
**Klassifikation:** Material — Product direction signal

**Observation**  
Sprint 1.1 indeholder mere klinisk information, men Daniel oplevede siden som lang og rapporterede gentagen scrolling, navigation mellem mange områder og behov for at holde overblik mentalt. Baseline viser en fast overblikskolonne og fem sekventielle dokumentsektioner på samme side.

**Fortolkning**  
Klinisk dybde har forbedret informationsgrundlaget, men øget den synlige og navigationsmæssige kompleksitet. Cortex risikerer at opleves som en forbedret formular frem for en sammenhængende klinisk arbejdsflade.

**Konsekvens**  
Brugeren kan bruge opmærksomhed på systemnavigation frem for klinisk vurdering og kan miste kontekst mellem sektioner.

**Testerens anbefaling**  
Undersøg en one-page clinical workspace med høj informationstæthed, tydelig prioritering og minimal scrolling. Brug professionelle systemer som inspirationskilder til scanning, progressive disclosure og kontekstbevaring; kopiér ikke Doctio.

**Research-disposition**  
One-page er en designhypotese, ikke et bevist krav. Product bør prioritere informationsarkitektur som P0-learning input og sammenligne mindst to arbejdsflademodeller på orientering, scroll, tilbage-navigation, konteksttab, fejl og oplevet belastning. “Alt vigtigt på én skærm” må ikke føre til informationsstøj eller utilgængelig tæthed.

### P02-002 — Eksplicitte uncertainty-statusser opleves som dokumentationsbyrde

**Område:** State semantics / Documentation / Safety  
**Klassifikation:** Material

**Observation**  
Daniel oplevede mange valg som “Ikke vurderet”, “Ikke afklaret” og “Ikke vurderbar” og vurderede, at de kunne skabe falsk dokumentationskomplethed. Baseline skelner mellem tomt felt, ikke vurderet, ikke udført og ikke vurderbar og udelader ikke alle disse tilstande fra journalen.

**Fortolkning**  
De eksplicitte tilstande kan både skabe friktion og bevare vigtig epistemisk betydning. Forslaget om, at intet valg blot skal betyde “ikke inkluderet”, kolliderer potentielt med sikkerhedsreglen om, at ubesvaret ikke automatisk må fortolkes som negativt, vurderet eller irrelevant.

**Konsekvens**  
For mange statushandlinger kan øge burden; for få kan skjule, om et forhold ikke blev spurgt, ikke var relevant, ikke blev udført eller ikke kunne vurderes.

**Testerens anbefaling**  
Fjern disse muligheder, så ingen aktiv registrering giver ingen journaltekst.

**Research-disposition**  
Må ikke omsættes direkte til krav. Product, Clinical Safety og Architecture bør teste to niveauer separat: hvad der vises i den kliniske arbejdsflade, og hvad der medtages i dokumentoutput. Sammenlign blank, ikke relevant, ikke spurgt, ikke udført og ikke vurderbar på forståelse, completeness, journaltekst og false reassurance.

### P02-003 — Klinisk selektivitet er utilstrækkelig

**Område:** Adaptive workflow / Progressive disclosure  
**Klassifikation:** Material

**Observation**  
Daniel oplevede, at Cortex fortsat antager en bred, ensartet spørge- og undersøgelsesramme. Baseline har enkelte betingede felter: traumemekanisme vises kun ved traume, og hævelsens tidsforløb kun ved registreret hævelse. Mange øvrige domæner indgår fortsat i den samme completeness-model for alle forløb.

**Fortolkning**  
Sprint 1.1 demonstrerer begyndende adaptivitet, men relevance og completeness er fortsat overvejende universelt modelleret inden for casen.

**Konsekvens**  
Irrelevante spørgsmål kan skabe støj og ceremonielle valg, mens klinisk relevante spor kan drukne i en fast struktur.

**Testerens anbefaling**  
Byg klinisk selektivitet, eksempelvis traumemodul ved traume og skjult traumemodul uden traume.

**Research-disposition**  
Product bør teste adaptiv progressive disclosure som P0-hypotese. Mål om skjulte elementer opdages ved behov, om skift i svar bevarer/korrigerer state sikkert, og om klinikeren kan åbne et ellers skjult relevant spor. Research specificerer ikke reglerne.

### P02-004 — Multi-select og discoverability matcher ikke alle kliniske fund

**Område:** Clinical input model  
**Klassifikation:** Material

**Observation**  
Daniel rapporterede, at samtidige fund ikke kan registreres flere steder og nævnte inspektion og palpation. Repositoryet viser, at palpation og smerteprovokation allerede er multi-select, mens inspektion er single-select. P02-signalet er derfor både reel modelbegrænsning og mulig manglende discoverability af eksisterende multi-select.

**Fortolkning**  
Single-select kan være klinisk utilstrækkeligt, hvor fund sameksisterer. Omvendt bør ikke alle felter automatisk være multi-select; cardinality skal følge klinisk betydning og brug.

**Konsekvens**  
Fund kan gå tabt, blive prioriteret kunstigt eller flyttes til fritekst. Utydelig multi-select-adfærd kan give samme resultat, selv hvor funktionen teknisk findes.

**Testerens anbefaling**  
Understøt multi-select for alle relevante kliniske fund.

**Research-disposition**  
Product bør identificere hvilke fund der faktisk sameksisterer og teste både datamodel og discoverability. “Alle relevante” kræver klinisk review og må ikke blive et generelt komponentkrav.

### P02-005 — Clinical Decision Support mangler fundbaserede overvejelser

**Område:** Clinical attention / Decision support / Authority  
**Klassifikation:** Material

**Observation**  
Daniel savnede forslag baseret på kombinationen af anamnese og objektive fund, eksempelvis vridtraume, akut hævelse og positiv Lachman som mulig ACL-påvirkning. Baseline viser spørgsmål om røde flag, hævelsesforløb og billeddiagnostisk formål, men har ikke denne type kombineret klinisk overvejelse.

**Fortolkning**  
Der kan være et behov for forklarlig, fundbaseret opmærksomhedsstøtte. P02 validerer ikke ACL-reglen, den kliniske formulering, threshold, kilde eller timing.

**Konsekvens**  
Uden relevant støtte kan Cortex give begrænset værdi for klinisk syntese. Med for stærke eller brede forslag kan systemet skabe automation bias, alarmstøj eller skjult diagnoseautoritet.

**Testerens anbefaling**  
Vis formuleringer som “Kliniske fund kan være forenelige med …”, aldrig “Patienten har …”.

**Research-disposition**  
Behandl som en P1-hypotese under PDR-008’s H-S11-02, ikke som implementeringskrav. Clinical Safety skal godkende kildegrundlag og scenarier. Test relevant, irrelevant og manglende-source conditions samt clinician rationale, afvisning og authority attribution.

### P02-006 — Planlægning mangler aktiv, ikke-besluttende støtte

**Område:** Plan / Clinical support  
**Klassifikation:** Material

**Observation**  
Plan, opfølgning og safety-net er fritekst, og billeddiagnostik har en eksplicit intention. Daniel savnede neutrale overvejelsesmuligheder som belastning efter evne, krykker, analgetiske overvejelser, fysioterapi og kontrolinterval.

**Fortolkning**  
Planstøtte kan reducere hukommelsesbyrde og mangler, men kan også opleves som behandlingsanbefaling eller blive klinisk forkert uden kontekst og kontraindikationsvurdering.

**Konsekvens**  
Klinikeren kan bære planens bredde i hukommelsen eller skrive alt manuelt. For stærk systemstøtte kan flytte beslutningsautoritet.

**Testerens anbefaling**  
Hjælp med “Har jeg tænkt det hele?” frem for “Dette skal du gøre.”

**Research-disposition**  
Product bør behandle planstøtte som P1-læringsinput. Test forslag som ikke-valgte, kildeafgrænsede overvejelser med eksplicit menneskelig selektion. Medicinske valg og formuleringer kræver Clinical Safety/Governance og kan ikke fastlægges af Research.

## 5. Klinisk kvalitets- og sikkerhedshypotese

### P02-CQ-001 — Komplekse fund kan kræve anden risikoprioritering

**Klassifikation:** Hypothesis med potentiel Critical konsekvens  
**Evidensgrundlag:** Testerens kliniske ekspertvurdering; ingen tidsstemplet reproduktion eller valideret clinical rule.

**Observation**  
Daniel vurderede, at kombinationen manglende vægtbæring, positiv Lachman og akut hævelse ikke må føre til primært fokus på MCL/menisk uden synlig overvejelse af fraktur og ACL-påvirkning. Baseline indeholder ikke en sådan kombinationsregel.

**Fortolkning**  
Hvis Cortex fremhæver mindre relevante overvejelser foran alvorlige eller management-ændrende muligheder, kan støtten give falsk prioritering. P02 dokumenterer ikke, at prototypen faktisk genererede en forkert konklusion, og kan ikke etablere den korrekte kliniske regel.

**Research-disposition**  
Opret et kontrolleret safety-scenarie med godkendt kildegrundlag og klinisk reviewer. Klassificér som Critical, hvis en bruger får falsk reassurance, overser akut vurdering eller tillægger Cortex beslutningsautoritet. Indtil da forbliver det en højprioriteret hypotese.

## 6. Kliniske detaljesignaler

Disse punkter er inputs til videre evidensarbejde, ikke direkte feltspecifikationer:

| Område | P02-signal | Repository-kontrol | Research-disposition |
|---|---|---|---|
| Funktion | Brug “Funktionsevne” med fire funktionsniveauer. | Allerede implementeret i `01eb5db`. | Ingen ny ændring; test forståelse og anvendelse. |
| Hævelse | Skeln straks, inden for timer og senere. | Tidsforløb er fritekst, ikke strukturerede tidskategorier. | Test om strukturerede kategorier forbedrer klinisk mening uden ekstra burden. |
| ROM | Normal samt ekstension/fleksion i grader. | Grader findes; særskilt “normal” status findes ikke. | Test om normalgenvej er sikker, forståelig og reducerer arbejde. |
| Menisktest | Navn og fund skal fremgå. | Output skriver generisk “menisktest positiv/negativ”. | Test navngivet test, respons og relevante nuancer; clinical review kræves. |

## 7. Prioriterede Product-inputs til Sprint 1.2

Prioriteterne angiver læringsrækkefølge, ikke backlog, krav eller implementationautorisation.

### P0 — Informationsarkitektur og state-forståelse

1. Sammenlign en one-page clinical workspace med mindst én alternativ klinisk arbejdsflade.
2. Afklar forskellen mellem blank, ikke relevant, ikke spurgt, ikke udført og ikke vurderbar — både i UI, completeness og journaloutput.
3. Afklar cardinality og discoverability for samtidige kliniske fund.
4. Test klinisk selektivitet og state-recovery ved betingede moduler.

### P1 — Klinisk støtte

5. Test fundbaserede kliniske overvejelser uden diagnoseautoritet.
6. Test neutral planstøtte med eksplicit klinikervalg.
7. Test et kompakt, kildebaseret red-flag-/attention-modul, inklusive false-positive og manglende-source cases.

### P2 — Efter informationsprioritet er afklaret

8. Visuelt redesign med målbar saliens, scanning og accessibility.
9. Mere avanceret decision support kun efter authority- og safety-hypoteser består.

## 8. Hvad bør ikke bygges endnu

P02 giver ikke evidens til:

- en rigtig AI-model;
- automatisk diagnose;
- automatisk behandlingsvalg;
- EHR-integration;
- automatiske henvisninger.

Den giver heller ikke grundlag for regulatoriske eller clinical-readiness claims.

## 9. Anbefaling til næste læringscyklus

Research anbefaler, at Product udarbejder et Sprint 1.2 Learning Contract, som først afklarer informationsarkitektur, state-semantik og klinisk selektivitet. Build bør ikke fortsætte ved blot at lægge flere komponenter eller felter oven på den nuværende struktur.

Et Sprint 1.2-eksperiment bør mindst indeholde:

1. versionslåste IA-comparatorer med samme syntetiske case og kliniske state;
2. en opgave, der kræver både hurtig scanning og korrektion af et uafklaret fund;
3. måling af scroll, første handling, konteksttab, tilbage-navigation, disclosure og systemceremoni;
4. explain-back af blank/ikke-vurderet/ikke-relevant og Cortex’ authority;
5. en kombination af kliniske fund, der tester attention-prioritering uden at Cortex diagnosticerer;
6. separate observationer af klinisk planstøtte og journaloutput.

## 10. Research conclusion

Sprint 1.1 har løst eller reduceret flere P01-problemer: anamnesen er dybere, objektiv undersøgelse er mere præcis, ROM og multiple palpationsfund kan registreres, journalen er forbedret, Cortex Overblik giver mere orientering, og tastaturflowet opleves positivt.

P02 viser samtidig, at tilføjelse af klinisk dybde ikke automatisk skaber en god klinisk arbejdsflade. Den næste beslutningskritiske usikkerhed er, hvordan Cortex organiserer relevant information og kliniske commitments med høj scanbarhed og lav burden, samtidig med at missing, not assessed, not relevant, uncertainty og menneskelig authority forbliver semantisk korrekte.

Evidensen understøtter Product-afklaring før Build. Den beviser ikke, at one-page er den rigtige løsning, at uncertainty-statusser bør fjernes, eller at de foreslåede kliniske regler er korrekte. Disse er hypoteser, som kræver kontrolleret sammenligning, clinical safety review og senere ekstern klinikertest.

## 11. Downstream disposition

- **Product:** Modtager P02-findings og prioriterede læringsinputs til Sprint 1.2 Learning Contract.
- **Architecture:** Intet direkte handoff; afventer Product-afklaring af IA- og state-spørgsmål.
- **Build:** Ingen handoff eller kodeautorisation.
- **Clinical Safety/Governance:** Skal involveres før clinical attention-, diagnose-/planforslag eller ændring af uncertainty-semantik specificeres.
- **Steering:** Træffer beslutning om næste læringsretning.
