# Sprint 0 Internal Evaluation P00 v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | SPRINT-0-P00-RE-001 |
| Dokumenttype | Research evidence artifact |
| Version | 1.0 |
| Status | FORMATIVE — intern, begrænset evidens |
| Dato | 22-07-2026 |
| Tester | Daniel |
| Testtype | Internal Founder Walkthrough (P00) |
| Prototype | Sprint 0 Learning Prototype |
| Branch | `prototype/sprint-0` |
| Commit oplyst for testen | `19fd101` |
| Browser | Chrome Version 150.0.7871.127 |
| Skærm/viewport | 1440 × 900 |
| Adresse | `http://localhost:3000/prototype/sprint-0` |
| Data | Kun syntetiske data |

## 1. Formål og evidensstatus

Dette dokument registrerer observationsgrundlaget fra P00-walkthroughen. Det er det underliggende Research-led mellem Sprint 0-prototypen og Products fortolkning i `docs/product/research/SPRINT-0-P00-LEARNING-REPORT-v1.0.md`.

Dokumentet er ikke en backlog, produktspecifikation, arkitekturbeslutning, implementationsautorisation eller klinisk validering.

### Evidensgrænse

Der foreligger ikke tidsstemplede P00-rånoter, udfyldt observationsark, optagelse, opgavemetrics, ordrette udsagn eller P00-specifikt instrumenteringsudtræk. De negative observationer nedenfor er derfor testerens retrospektive ekspertobservationer, som er registreret efter walkthroughen. Hvor prototypens aktuelle filer understøtter en observation, er dette markeret særskilt som repository-verifikation.

Der må ikke rekonstrueres klikrækkefølge, tøven, tidsforbrug, fejlrate eller deltagerudsagn ud fra Products rapport eller repositoryet.

### Commit-sporbarhed

`19fd101` er den oplyste commit. Repository-kontrol viser, at committen indeholder Research-pakken, men ikke Sprint 0-prototypefilerne under `app/prototype/sprint-0/`, `components/prototype/sprint-0/`, `clinical/prototypes/sprint-0/` eller `e2e/sprint-zero.spec.ts`; disse stod fortsat som untracked i arbejdsområdet ved kontrollen. SHA’en fastlåser derfor **ikke** den testede prototypeversion. Branch, adresse og de konkrete testmetadata bevares, men prototypeversionen er kun delvist reproducerbar.

## 2. Hvad og hvordan der blev evalueret

P00 var en intern klinisk ekspert-walkthrough af den syntetiske knæcase i Sprint 0 Learning Prototype. Evalueringen omfattede:

- patientoverblik og mock AI Summary;
- konsultationsflow og klinikerregistrering;
- journaludkast;
- billeddiagnostisk henvisningsudkast;
- fysioterapihenvisningsudkast;
- review-, approval- og copy-statusser;
- manuel redigering;
- degraderet AI-flow og manuel recovery.

Testeren gennemgik prototypen i Chrome ved 1440 × 900. Den tilgængelige dokumentation angiver ikke sessionens varighed, præcise opgaver, facilitatorinterventioner eller kronologiske hændelser. Efterfølgende repository-inspektion bruges kun til at verificere, om bestemte felter, output og tilstande findes; den bruges ikke som erstatning for observeret menneskelig adfærd.

## 3. Begrænsninger

- Kun én intern tester, som samtidig er Founder og klinisk ekspert.
- Ingen ekstern klinikertest.
- Ingen uafhængig facilitator- eller observatørregistrering.
- Ingen usability-validering.
- Ingen klinisk validering eller vurdering af klinisk korrekthed.
- Ingen effektivitetsmåling, tidsmåling eller sammenlignelig baseline.
- Én syntetisk knæcase og ingen virkelige patientdata.
- Ingen dokumenteret sessionstid eller råt adfærdsspor.
- Den oplyste commit fastlåser ikke prototypefilerne.
- Resultaterne er formative og hypotesegenererende; hyppighed og generaliserbarhed kan ikke estimeres.

## 4. Positive observationer

| ID | Observation | Evidensgrundlag | Research-fortolkning |
|---|---|---|---|
| P00-P01 | Testeren kunne gennemgå et ende-til-ende-flow med patientkontekst, konsultation og dokumentudkast. | Testerens sammenfattede walkthrough; flowets eksistens er repository-verificeret. | Prototypen er egnet som afgrænset læringsartefakt, men gennemførlighed for én intern ekspert dokumenterer ikke usability. |
| P00-P02 | Journal-, billeddiagnostik- og fysioterapihenvisningsudkast fandtes som separate output. | Repository-verificeret. | Forskellige dokumenttyper kan observeres og evalueres, men deres kliniske kvalitet er ikke valideret. |
| P00-P03 | AI-fejl kunne simuleres, og manuel fortsættelse fandtes. | Testerens walkthrough; repository-verificeret med “Simulér AI-fejl” og “Fortsæt manuelt”. | Der findes et observerbart recovery-koncept. Det viser ikke, om eksterne brugere opdager eller forstår det. |
| P00-P04 | Patientkontekst, mock AI-output og klinikerens vurdering var separate, og AI kunne afvises. | Repository-verificeret og konsistent med testerens vurdering. | Den semantiske adskillelse understøtter menneskelig kontrol; forståelsen af ansvar er ikke målt. |
| P00-P05 | Journaludkast kunne redigeres manuelt, og afvisning af udkast slettede ikke konsultationsfakta. | Repository-verificeret. | Menneskelig korrektion er teknisk mulig. Den praktiske redigeringsbyrde er ikke målt. |

## 5. Findings

Der er ingen bekræftede **Critical** findings. Det begrænsede datagrundlag kan ikke bruges til at konkludere, at Critical problemer ikke findes. Der registreres ingen selvstændige **Minor** findings, fordi P00-materialet ikke indeholder tilstrækkelig granularitet til sikker klassifikation af lokal friktion.

### P00-F01 — Utilstrækkeligt objektivt undersøgelsesgrundlag

**Område:** Clinical documentation  
**Klassifikation:** Material  
**Evidensgrundlag:** Retrospektiv testerobservation; delvist repository-verificeret.

**Observation**  
Testeren vurderede, at objektiv undersøgelse var utilstrækkelig, og at strukturerede knæundersøgelsespunkter manglede. Repositoryet viser en begrænset objektiv sektion, men P00 har ikke et tidsstemplet spor af hvilke informationer testeren søgte efter.

**Forventning**  
Testeren forventede at kunne registrere og genfinde relevante objektive knæfund med tilstrækkelig struktur til klinisk vurdering og dokumentation.

**Interpretation**  
Det tilgængelige undersøgelsesgrundlag kan begrænse klinisk syntese og gøre journal- eller henvisningsoutput ufuldstændigt. P00 kan ikke fastslå, hvilke konkrete undersøgelsespunkter der er nødvendige på tværs af brugere eller cases.

**Konsekvens**  
Klinikeren kan skulle kompensere med fri tekst eller arbejde uden for prototypen, og afledte dokumenter kan mangle relevante fund.

**Recommendation**  
Undersøg i næste læringscyklus, hvilke objektive informationer praktiserende læger faktisk søger, registrerer og forventer genbrugt i denne case. Klinisk indhold skal vurderes separat; Research specificerer ikke felter.

### P00-F02 — Red flags, safety-net og smertebehandling er ikke tilstrækkeligt repræsenteret

**Område:** Safety support / Clinical documentation  
**Klassifikation:** Material  
**Evidensgrundlag:** Retrospektiv testerobservation; fravær er delvist repository-verificeret.

**Observation**  
Testeren rapporterede manglende red flags, safety-net og smertebehandling i det gennemgåede flow og journalgrundlag. Der findes ikke P00-rådata, som viser hvornår manglerne blev opdaget eller hvilken handling de påvirkede.

**Forventning**  
Testeren forventede, at relevante sikkerheds- og behandlingsforhold kunne vurderes og dokumenteres uden at systemet overtog den kliniske beslutning.

**Interpretation**  
Fraværet kan skabe informationsmangel i vurdering, plan og dokumentation. Det er ikke evidens for, at bestemte alerts, defaults eller behandlingsforslag bør implementeres.

**Konsekvens**  
Arbejdsgangen kan kræve parallel hukommelse eller efterredigering og kan give et utilstrækkeligt grundlag for opfølgning.

**Recommendation**  
Test eksplicit, hvilke risici, opfølgningsbetingelser og behandlingsoplysninger læger forventer at kunne registrere, og hvordan de skelner systemets opmærksomhedsstøtte fra deres eget ansvar. Klinisk indhold kræver kilde- og faglig validering.

### P00-F03 — Journaloutput mangler tilstrækkelig klinisk struktur

**Område:** Clinical documentation  
**Klassifikation:** Material  
**Evidensgrundlag:** Retrospektiv testerobservation; outputgeneratoren er repository-verificeret.

**Observation**  
Testeren vurderede, at journaloutputtet ikke havde den forventede kliniske struktur. Den aktuelle generator kan producere tekst fra registrerede facts og arbejdshypotese, men P00-råmaterialet dokumenterer ikke en konkret før/efter-redigering.

**Forventning**  
Testeren forventede en journal, hvor anamnese, objektive fund, klinisk vurdering, plan og relevante sikkerhedsforhold fremstod klinisk sammenhængende.

**Interpretation**  
Et tekstoutput kan være teknisk genereret og redigerbart uden at være tilstrækkeligt som klinisk dokumentation.

**Konsekvens**  
Der kan opstå betydelig efterredigering eller risiko for, at relevante forhold ikke fremgår tydeligt.

**Recommendation**  
Indsaml direkte observationer af, hvad læger tilføjer, fjerner og omstrukturerer i journaludkastet. Brug ændringerne som evidens for informationsbehov, ikke som automatisk produktkrav.

### P00-F04 — Billeddiagnostisk henvisning mangler klinisk kommunikation

**Område:** Referral generation  
**Klassifikation:** Material  
**Evidensgrundlag:** Retrospektiv testerobservation; generatoroutput repository-verificeret.

**Observation**  
Testeren vurderede MR-/billeddiagnostikhenvisningen som utilstrækkelig klinisk kommunikation. Prototypeoutputtet indeholder et kort problemresumé, klinikerens vurdering og et generelt ønske om billeddiagnostisk vurdering; modalitet og destination er ikke fastlagt.

**Forventning**  
Testeren forventede, at en henvisning kommunikerede den kliniske indikation, relevante fund og det spørgsmål, modtageren skulle besvare.

**Interpretation**  
Et output kan ligne et udkast uden at fungere som formålsrettet kommunikation til en klinisk modtager. P00 kan ikke fastlægge korrekt modalitet eller regionalt indhold.

**Konsekvens**  
Henvisningen kan kræve omfattende omskrivning eller efterlade modtagerens opgave uklar.

**Recommendation**  
Observer i næste test, hvilke elementer læger efterspørger eller tilføjer, når de gør henvisningen klar. Vurdér indholdet mod relevante faglige og regionale kilder uden at antage MR som korrekt beslutning.

### P00-F05 — Fysioterapihenvisningen er for generisk

**Område:** Referral generation  
**Klassifikation:** Material  
**Evidensgrundlag:** Retrospektiv testerobservation; generatoroutput repository-verificeret.

**Observation**  
Testeren vurderede fysioterapihenvisningen som for generisk. Prototypeoutputtet angiver problemoplysninger, arbejdsvurdering og “fysioterapeutisk vurdering”, mens behandlingsmål og destination overlades til klinikeren.

**Forventning**  
Testeren forventede et klinisk meningsfuldt dokument, som gav modtageren relevant kontekst, funktionspåvirkning og formål.

**Interpretation**  
Den generiske formulering kan afspejle, at henvisningen primært er afledt tekst frem for modtagerorienteret kommunikation.

**Konsekvens**  
Klinikeren kan skulle supplere væsentligt, og modtageren kan mangle et klart arbejdsgrundlag.

**Recommendation**  
Undersøg med læger og relevante modtagere, hvilken information der faktisk anvendes, savnes eller opleves som overflødig. Research vælger ikke henvisningsskabelon.

### P00-F06 — Statusflowet eksponerer mange systeminterne beslutninger

**Område:** Workflow / Status model / Experience  
**Klassifikation:** Material  
**Evidensgrundlag:** Retrospektiv testerobservation; statusflow repository-verificeret.

**Observation**  
Testeren oplevede for mange statusknapper og brugerbeslutninger omkring systeminterne states. Hvert udkast har separate synlige trin for `Draft`, `Reviewed`, `Approved for copy` og `Copied`, samt afvisning.

**Forventning**  
Testeren forventede én tydelig næste handling knyttet til et reelt klinisk commitment frem for gentagen administration af udkaststilstande.

**Interpretation**  
Den eksplicitte statusmodel kan bevare sporbarhed og menneskelig kontrol, men samtidig pålægge brugeren systemets interne proces.

**Konsekvens**  
Flere rutinehandlinger kan øge kognitiv belastning og gøre næste relevante handling uklar.

**Recommendation**  
Test alternative, teknologiuafhængige handlingsmodeller på forståelse af aktør, konsekvens, redigering, afvisning og forskellen mellem godkendelse og faktisk afsendelse. Research beslutter ikke den konkrete interaktion.

### P00-F07 — AI Summary var ikke intuitivt forståelig

**Område:** AI interaction / Experience  
**Klassifikation:** Material  
**Evidensgrundlag:** Retrospektiv testerobservation; UI og funktion repository-verificeret.

**Observation**  
Testeren rapporterede, at funktionen “AI Summary” ikke var intuitivt forståelig, og at dens produktrolle var uklar. Der findes ingen bevaret adfærdssekvens eller ordret forklaring fra testeren.

**Forventning**  
Testeren forventede at kunne forstå funktionens kliniske formål, input, begrænsninger og relation til egen vurdering ud fra arbejdsfladen.

**Interpretation**  
En teknisk label beskriver fremstillingsmekanismen, men ikke nødvendigvis brugerens opgave. Uklarhed kan føre til ignorering, overfortolkning eller ekstra kontrolarbejde.

**Konsekvens**  
Funktionen kan øge usikkerhed om workflow og AI-authority, selv om den teknisk er adskilt fra klinikerens vurdering.

**Recommendation**  
Undersøg først hvilket klinisk informationsbehov funktionen skal opfylde. Test derefter forståelse, kildekontrol og authority attribution uden at forklare rollen under observationen.

### P00-F08 — Guideline- og risikobaseret opmærksomhed kan være et uafdækket behov

**Område:** Clinical support  
**Klassifikation:** Hypothesis  
**Evidensgrundlag:** Testerens ekspertvurdering; ikke observeret som reproduceret brugeradfærd.

**Observation**  
Testeren efterspurgte støtte til guideline-baseret opmærksomhed, billeddiagnostiske overvejelser og alvorlige differentialdiagnoser. P00 dokumenterer ikke en konkret overset beslutning eller klinisk hændelse.

**Forventning**  
Testeren forventede, at relevante kliniske overvejelser kunne gøres synlige uden at blive præsenteret som systembeslutninger.

**Interpretation**  
Der kan være et informations- og opmærksomhedsbehov, men P00 kan ikke fastlægge timing, tærskel, kilde, indhold eller UI-form.

**Konsekvens**  
Hvis behovet er reelt og ikke understøttes, kan klinikeren skulle bære mere hukommelsesarbejde. Hvis støtten er overdrevet, kan den skabe alarmtræthed eller authority-glidning.

**Recommendation**  
Design et særskilt comprehension- og attention-eksperiment med kildebaserede scenarier, inklusive falske positive og negative cases. Mål om klinikeren forstår støtten som input til egen vurdering.

### P00-F09 — Flere dokumentationsniveauer kan matche forskellige behov

**Område:** Documentation level / Experience  
**Klassifikation:** Hypothesis  
**Evidensgrundlag:** Testerens forslag; ikke afprøvet i P00.

**Observation**  
Testeren identificerede et muligt behov for kort, standard og eventuelt udvidet journal. Prototypen testede ikke flere dokumentationsniveauer.

**Forventning**  
Testeren forventede mulighed for at tilpasse detaljeringsgraden til kontekst og formål.

**Interpretation**  
Forskellige niveauer kan reducere efterredigering, men kan også indføre endnu et valg eller skjule relevant information.

**Konsekvens**  
En utestet niveau-model kan enten reducere eller øge kognitiv belastning og dokumentationsvariation.

**Recommendation**  
Sammenlign niveau-modellen med mindst ét alternativ. Mål forudsigelighed, redigeringsbehov og bevarelse af facts, usikkerhed og sikkerhedsrelevant indhold.

## 6. Findingsoversigt

| Klassifikation | Findings | Evidensstatus |
|---|---|---|
| Critical | Ingen bekræftede | Utilstrækkeligt grundlag til at udelukke Critical problemer |
| Material | P00-F01–P00-F07 | Intern retrospektiv ekspertobservation; flere forhold repository-verificeret |
| Minor | Ingen registrerede | Utilstrækkelig granularitet |
| Hypothesis | P00-F08–P00-F09 | Ikke afprøvet |

## 7. Modstridende og kvalificerende evidens

- Menneskelig kontrol er teknisk bevaret gennem adskilte tilstande og manuel redigering, mens testeren samtidig oplevede statusmekanikken som en workflowbelastning. Kontrol og enkelhed skal derfor undersøges sammen.
- Manuel AI-recovery findes, men AI Summary-funktionens normale produktrolle var uklar. Recovery-eksistens dokumenterer ikke forståelse af funktionen.
- Dokumentudkast kan genereres og redigeres, men dette modsiger ikke observationerne om utilstrækkelig klinisk struktur og kommunikation.
- Ingen Critical hændelse blev dokumenteret, men manglende råspor og én intern tester betyder, at fraværet ikke kan bruges som sikkerhedsevidens.

## 8. Sporbarhed

### Input

- Sprint 0 Learning Prototype, branch `prototype/sprint-0`
- P00 Internal Founder Walkthrough, 22-07-2026
- Testeroplyste metadata og retrospektive observationer
- Repository-inspektion af prototypeflader og generatorer
- `docs/build/SPRINT-0-IMPLEMENTATION-REPORT-v0.1.md`

### Downstream consumers

- Product Learning Report: `docs/product/research/SPRINT-0-P00-LEARNING-REPORT-v1.0.md`
- Product Baseline og efterfølgende Product-læringskontrakter
- Architecture review af klinisk semantik, authority og dokumentafledning
- Build planning efter eksplicit Product-/Architecture-handoff

### Evidenskæde

`P00 walkthrough → Research evidence → Product learning → Architecture impact → Build decision`

Downstream-artefakter må ikke opgradere P00 til ekstern usability-evidens, klinisk validering eller implementationsautorisation.

## 9. Research conclusion

P00 lærte, at Sprint 0 kan gennemføre de tilsigtede prototypeflows og bevarer flere vigtige kontrolmekanismer, men den interne eksperts gennemgang identificerede materielle informations-, dokumentations-, kommunikations- og workflowproblemer. De stærkeste signaler vedrører utilstrækkeligt klinisk indholdsgrundlag, henvisningernes kommunikative kvalitet, den synlige statusbyrde og AI Summary-funktionens uklare rolle.

Evalueringen kan ikke bevise usability, klinisk sikkerhed, effektivitet, adoption eller generaliserbarhed. Den kan heller ikke fastlægge konkrete UI-løsninger, kliniske regler eller dokumentationsniveauer.

Næste læringscyklus skal især afgøre:

1. hvilke kliniske informationer og sikkerhedsforhold eksterne læger faktisk behøver og søger;
2. hvordan AI-støttens formål og menneskelige ansvar forstås uden forklaring;
3. hvilke dele af journal og henvisninger der kræver efterredigering og hvorfor;
4. om statuskompleksitet kan reduceres uden at gøre autorisation eller konsekvens uklar;
5. om forskellige dokumentationsniveauer skaber værdi eller blot nye valg.

Research prioriterer ikke ændringerne og vælger ikke implementation. Steering træffer beslutning på baggrund af den samlede evidenskæde.
