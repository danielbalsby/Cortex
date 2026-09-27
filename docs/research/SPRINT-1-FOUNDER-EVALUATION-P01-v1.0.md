# Sprint 1 Founder Evaluation P01 v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | SPRINT-1-P01-RE-001 |
| Dokumenttype | Formativt Research evidence- og learning-artifact |
| Version | 1.0 |
| Status | FORMATIVE — intern founder evaluation |
| Dato | 22-07-2026 |
| Tester | Daniel |
| Testtype | Internal Founder Walkthrough (P01) |
| Prototype | Sprint 1 Learning Prototype |
| Route | `/prototype/sprint-1` |
| Repository branch ved Research-kontrol | `prototype/sprint-0` |
| Prototypeversion | Unversioned working-tree state; Sprint 1-filerne var untracked |
| Data | Kun syntetiske data |
| Research-ejer | Cortex Research |

## 1. Formål og evidensgrænse

P01 dokumenterer Daniel’s interne walkthrough af Sprint 1 Learning Prototype og omsætter observationerne til evidens, læringspunkter og prioriterede inputs til Product. Dokumentet skaber ikke produktkrav, vælger ikke arkitektur, autoriserer ikke implementation og er ikke et Build-handoff.

Evalueringen er:

- en intern founder evaluation;
- ikke en brugerundersøgelse;
- ikke usability-validering;
- ikke klinisk validering;
- ikke evidens for clinical readiness;
- ikke en effektivitetsmåling.

### Datagrundlag

Der er ikke leveret tidsstemplede rånoter, udfyldt observationsark, optagelse, sessionstid, klikdata, ordrette udsagn, browserinformation eller viewport. Observationerne er derfor tester-rapporterede, retrospektive ekspertobservationer fra Daniel. Repository-inspektion anvendes til at bekræfte, at relevante funktioner, felter og outputformuleringer findes; den kan ikke rekonstruere menneskelig adfærd, tidsforbrug eller forståelse.

### Versionsbegrænsning

Sprint 1-filerne under `app/prototype/sprint-1/`, `components/prototype/sprint-1/`, `clinical/prototypes/sprint-1/` og `e2e/sprint-one.spec.ts` var untracked ved Research-kontrollen. Repositoryets HEAD var `19fd101`, som ikke indeholder Sprint 1-prototypen. Den evaluerede prototype kan derfor ikke reproduceres entydigt fra en commit-SHA. Dette begrænser sammenlignelighed og senere audit.

## 2. Input og relationer

| Input | Rolle i P01 |
|---|---|
| Sprint 1 Learning Prototype | Evalueret artefakt og repository-understøttelse |
| Sprint 0 P00 Learning Report | Product-fortolkning af P00 og sammenligningsgrundlag |
| Sprint 0 Multi-Agent AI Evaluation | Formativt AI-review; ikke menneskelig brugerevidens |
| PDR-007 Sprint 1 Product Change Request | Product-intent og læringsmål; ikke bevis for at målene er opfyldt |
| Daniel’s P01 walkthrough-input | Primær kilde til tester-rapporterede P01-observationer |

## 3. Positive observationer

### P01-P01 — Cortex Overblik gav bedre orientering

**Observation**  
Daniel oplevede Cortex Overblik som en forbedring af orienteringen sammenlignet med Sprint 0’s separate AI Summary. Repositoryet viser et samlet overblik med konsultationsstatus, klinisk opmærksomhed og link til næste uafsluttede domæne.

**Fortolkning**  
Et klinisk navngivet og kildeafgrænset overblik kan passe bedre til orienteringsopgaven end en teknologicentreret AI-flade. Observationen viser ikke, at eksterne læger forstår overblikkets rolle uden forklaring.

### P01-P02 — Dokumentationsniveauer oplevedes som mindre belastende

**Observation**  
Daniel oplevede, at Kort, Standard og Udvidet gav bedre mulighed for at tilpasse dokumentationsmængden. Repositoryet viser, at niveauerne bygger på samme state og ændrer tekstpræsentation, ikke registrerede facts.

**Fortolkning**  
Valg af detaljeringsgrad kan reducere oplevet dokumentationsbyrde. P01 målte ikke tidsforbrug, antal redigeringer eller tab af klinisk information, så belastningsreduktion er endnu ikke dokumenteret som effekt.

### P01-P03 — Målrettede knætests forbedrede den kliniske struktur

**Observation**  
Daniel vurderede, at de målrettede knætests gjorde den objektive del mere klinisk struktureret end i Sprint 0. Prototypen indeholder blandt andet Lachman, valgus/varus, menisktest, patella og distal neurovaskulær status med eksplicitte ikke-udført/ikke-vurderbar-tilstande.

**Fortolkning**  
Sprint 1 kan repræsentere flere understøttende, modstridende og uafklarede fund end Sprint 0. P01 viser samtidig, at granulariteten fortsat ikke matcher testerens forventning.

### P01-P04 — Klinisk vurdering var tydeligere centrum end dokumentoutput

**Observation**  
Daniel oplevede konsultations- og vurderingsflowet som bedre end Sprint 0’s dokumentfokus. Repositoryet organiserer arbejdsfladen som Anamnese → Objektiv vurdering → Klinisk vurdering → Plan, hvorefter dokumentation vises som output.

**Fortolkning**  
Den ændrede rækkefølge er konsistent med P00-læringen om, at dokumenter bør være afledte. P01 dokumenterer ikke endnu, om flowet føles naturligt under en virkelig konsultation.

## 4. Findings

Der er ingen bekræftede **Critical** findings og ingen selvstændige **Minor** findings i det tilgængelige P01-grundlag. Det begrænsede interne datagrundlag kan ikke bruges til at udelukke Critical eller Minor problemer.

### P01-001 — Klinisk anamnese er stadig for overfladisk

**Område:** Clinical history / Clinical documentation  
**Klassifikation:** Material  
**Evidensgrundlag:** Tester-rapporteret observation; repository-verificeret mod historikmodellen.

**Observation**  
Sprint 1 har flere anamnesefelter end Sprint 0, men Daniel savnede centrale kliniske dimensioner: debut, forløb, smertekarakter, provokation, bredere funktionsevne samt hvile- og nattesmerter. Modellen har et onset-felt, men det er ikke eksponeret i den aktuelle UI; duration findes i modellen, men ikke i det viste anamneseafsnit. De øvrige nævnte dimensioner er ikke repræsenteret struktureret.

**Forventning**  
Testeren forventede at kunne danne og dokumentere en klinisk meningsfuld anamnese uden at bære centrale informationer i hukommelsen eller fri tekst uden for flowet.

**Fortolkning**  
Flere felter har forbedret bredden, men det kliniske beslutningsgrundlag kan fortsat være for tyndt. P01 kan ikke fastlægge, hvilke dimensioner der altid skal være synlige eller obligatoriske.

**Konsekvens**  
Cortex kan producere dokumentation uden et tilstrækkeligt anamnesegrundlag eller kræve kompenserende efterredigering.

**Testerens anbefaling**  
Udvid anamnesemodellen.

**Research-anbefaling**  
Product bør behandle anamnesedybde som P0-læringsinput og definere et testbart klinikerjob. Næste prototype bør gøre de identificerede dimensioner observerbare og måle, hvilke der anvendes, overses eller opleves som støj; Research beslutter ikke den endelige feltmodel.

### P01-002 — Objektiv undersøgelse mangler klinisk granularitet

**Område:** Objective examination  
**Klassifikation:** Material  
**Evidensgrundlag:** Tester-rapporteret observation; repository-verificeret.

**Observation**  
Daniel savnede ROM i grader, multi-select palpation, mere detaljeret ligamenttest og mere præcis meniskbeskrivelse. Prototypen registrerer ROM som fuld/reduceret/blokeret, palpation som ét valg, enkelte ligamenttests som kategoriske udfald og én generisk menisktest.

**Forventning**  
Testeren forventede at kunne registrere flere samtidige fund og tilstrækkelig undersøgelsesdetalje til at understøtte eller udfordre arbejdsvurderingen.

**Fortolkning**  
Sprint 1 har forbedret klinisk struktur, men den nuværende granularitet kan komprimere forskellige fund til samme repræsentation. Mere granularitet kan samtidig øge formularbyrden.

**Konsekvens**  
Journal og henvisninger kan blive mindre klinisk anvendelige, og nuancer kan flyttes til manuel tekst.

**Testerens anbefaling**  
Udbyg objektiv knæundersøgelse.

**Research-anbefaling**  
Product bør prioritere objektiv undersøgelsesmodel som P0-input og teste granularitet mod dokumentkvalitet, tidsforbrug og kognitiv belastning. Klinisk indhold skal reviewes særskilt; Research fastlægger ikke undersøgelsesbatteriet.

### P01-003 — Journaloutput skal bevæge sig fra registrering til klinisk kommunikation

**Område:** Clinical documentation / Language  
**Klassifikation:** Material  
**Evidensgrundlag:** Tester-rapporteret observation; konkrete outputformuleringer repository-verificeret.

**Observation**  
Daniel oplevede fortsat maskinprægede formuleringer, herunder “patienten oplyser”, “gener” og “Safety-vurdering”. Generatoren anvender disse formuleringer direkte og organiserer Standard/Extended i faste sektioner.

**Forventning**  
Testeren forventede en kort, naturlig og klinisk prioriteret fortælling, som kunne læses som kommunikation mellem sundhedsprofessionelle.

**Fortolkning**  
Outputtet bevarer attribution og struktur, men sproget kan fremstå som verbaliseret datamodel frem for klinisk narrativ. “Maskinproduceret” er en oplevelsesvurdering, ikke en målt sproglig fejlrate.

**Konsekvens**  
Klinikeren kan skulle omskrive teksten, og output kan opleves mindre professionelt eller mindre anvendeligt.

**Testerens anbefaling**  
Generér mere klinisk narrativ tekst.

**Research-anbefaling**  
Product bør prioritere journaltekstkvalitet som P0-input. Næste test bør indsamle alle ændringer, sletninger og omrokeringer samt begrundelsen for dem. En narrativ stil må ikke fjerne attribution, uncertainty eller sikkerhedsrelevant indhold.

### P01-004 — Cortex Overblik fungerer, men mangler visuel prioritet og klar næste handling

**Område:** Orientation / Experience / Workflow  
**Klassifikation:** Material  
**Evidensgrundlag:** Tester-rapporteret observation; layout og næste-handlingslink repository-verificeret.

**Observation**  
Daniel oplevede Cortex Overblik som værdifuldt, men pegede på lille tekst, placering og utilstrækkelig tydelighed i næste handling. Prototypen har et dynamisk “Fortsæt med …”-link, men P01 viser, at det ikke var tydeligt nok i den samlede visuelle prioritering.

**Forventning**  
Testeren forventede, at overblik og næste relevante kliniske handling kunne identificeres umiddelbart.

**Fortolkning**  
Konceptets informationsværdi og dets visuelle/operationelle tydelighed er to forskellige forhold. En funktion kan opleves relevant uden at lede workflowet effektivt.

**Konsekvens**  
Brugeren kan overse den tilsigtede orienteringsstøtte eller bruge ekstra opmærksomhed på at finde næste trin.

**Testerens anbefaling**  
Prioritér Cortex Overblik som central orienteringskomponent.

**Research-anbefaling**  
Product bør undersøge informationshierarki og næste-handlingsforståelse før et visuelt redesign besluttes. Mål tid til orientering, første handling, tilbage-navigation og forklaring af overblikkets rolle.

### P01-005 — Klinisk opmærksomhed er utilstrækkelig

**Område:** Clinical safety support  
**Klassifikation:** Material  
**Evidensgrundlag:** Tester-rapporteret observation; eksisterende attention-logik repository-verificeret.

**Observation**  
Sprint 1 har en advisory region kaldet “Klinisk opmærksomhed” og enkelte registreringer for feber, almen påvirkning og rødt/varmt/akut hævet led. Daniel savnede mere synlig støtte til red flags, infektion, fraktur og billeddiagnostiske overvejelser.

**Forventning**  
Testeren forventede rolig, forklarlig støtte til relevante uafklarede risici og overvejelser uden at Cortex traf en diagnose eller plan.

**Fortolkning**  
Sprint 1 har etableret et ikke-besluttende attention-koncept, men coverage og saliens opleves utilstrækkelig. P01 kan ikke fastlægge korrekte triggers, thresholds eller kliniske anbefalinger.

**Konsekvens**  
Systemet kan give mindre klinisk opmærksomhedsstøtte end forventet eller skabe falsk ro, hvis “ingen opmærksomhedspunkter” overfortolkes.

**Testerens anbefaling**  
Udbyg advisory “Klinisk opmærksomhed”.

**Research-anbefaling**  
Product bør prioritere safety/clinical attention som P0-læringsinput. Clinical Safety/Governance skal eje kildegrundlag og thresholds. Research bør teste forståelse, falsk reassurance, alarmstøj, clinician override og authority attribution.

### P01-006 — Dokumentationsflow har stadig for mange manuelle trin

**Område:** Workflow / Interaction friction  
**Klassifikation:** Material  
**Evidensgrundlag:** Tester-rapporteret observation; interaktionsflader repository-verificeret.

**Observation**  
Daniel ønskede færre klik ved åbning af sektioner, planhandlinger og henvisningsgenerering. Sprint 1 reducerer Sprint 0’s statussekvens til “Kopiér udkast”, men har fortsat progressive disclosures, checkbokse og efterfølgende felter for dokumentintentioner.

**Forventning**  
Testeren forventede, at det aktuelle kliniske arbejde kunne gennemføres med færre systemorienterede handlinger og en klarere fremdrift.

**Fortolkning**  
Sprint 1 har fjernet noget statusadministration, men friktion kan være flyttet til sektioner og intentionstrin. P01 har ikke målt klik, gennemførelsestid eller fejl.

**Konsekvens**  
Unødvendige handlinger kan øge mental belastning og reducere oplevet værdi, selv om hvert trin har en forståelig systemfunktion.

**Testerens anbefaling**  
Reducer interaktionsfriktion.

**Research-anbefaling**  
Product bør behandle flowfriktion som et tværgående input. Næste evaluering skal måle målrettede handlinger, tøven, disclosure-åbninger, navigation og nødvendige versus ceremonielle commitments før en konkret interaktionsmodel vælges.

## 5. Hypoteser

### H-P01-001 — En mere narrativ og mindre formularbaseret tilgang reducerer kognitiv belastning

**Status:** Hypothesis — kræver test.  
**Grundlag:** P01-001–P01-003 og P01-006.

En narrativ arbejdsrepræsentation kan reducere mental oversættelse mellem klinisk tanke, felter og output. Den kan også skjule struktur, gøre korrektion langsommere eller skabe tvetydig attribution. Test mod en struktureret alternativ model med observation af orientering, informationsmangler, redigering og mental indsats.

### H-P01-002 — Strukturerede kliniske forslag kan øge kvalitet uden at overtage beslutningen

**Status:** Hypothesis — kræver test.  
**Grundlag:** P01-002 og P01-005 samt Sprint 0 safety-/authority-fund.

Kontekstuelle forslag kan støtte klinisk opmærksomhed og vurderingskvalitet. De kan også skabe automation bias, alarmstøj eller skjult autoritet. Test forslag med kilde, rationale, uncertainty, mulighed for afvisning og negative cases; mål om lægen fortsat placerer beslutningsansvaret korrekt.

## 6. Prioriterede Product-inputs

Prioriteterne angiver, hvilken usikkerhed Product anbefales at behandle først. De er ikke backlogprioritet, implementeringsrækkefølge eller Build-autorisation.

### P0 — Beslutningskritiske læringsinputs

1. **Klinisk anamnesemodel:** Hvilke dimensioner er nødvendige for et tilstrækkeligt beslutnings- og dokumentationsgrundlag uden formularoverbelastning?
2. **Objektiv undersøgelsesmodel:** Hvilken granularitet og multi-select-adfærd bevarer relevante fund uden at skabe et obligatorisk testbatteri?
3. **Journaltekstkvalitet:** Hvilke sproglige og strukturelle ændringer foretager læger for at gøre output til klinisk kommunikation?
4. **Safety/Klinisk opmærksomhed:** Hvordan vises kildebaserede risici og uafklarede forhold uden falsk reassurance eller systembeslutning?

### P1 — Sekundære læringsinputs

1. **Plan-komponenter:** Hvordan repræsenteres plan, opfølgning og safety-net med lav interaktionsbyrde?
2. **Diagnostisk overvejelse:** Hvordan kan mulige differentialer og billeddiagnostiske overvejelser støtte vurderingen uden at blive diagnose eller anbefaling?
3. **Henvisningsforbedringer:** Hvilken information gør billeddiagnostik- og fysioterapihenvisninger nyttige for modtageren?

### P2 — Koncept- og visualiseringshypoteser

1. **Visuelt redesign:** Afprøv informationshierarki og saliens for Cortex Overblik og næste handling.
2. **Doctio-inspireret informationsarkitektur:** Behandles kun som inspirationshypotese. Test de konkrete informationsprincipper; kopier ikke en løsning eller æstetik uden evidens.

## 7. Anbefaling til næste prototypeiteration

Research-evidensen understøtter en afgrænset Sprint 1.1-læringsiteration, hvis Product prioriterer den. Iterationen bør reducere usikkerhed om det kliniske informationsgrundlag og dokumentkvaliteten før bredere visuel eller teknisk udbygning.

Anbefalet læringsrækkefølge:

1. gør de identificerede anamnese- og objektiv-dimensioner observerbare i samme syntetiske case;
2. sammenlign eksisterende journaloutput med mindst én mere klinisk narrativ repræsentation;
3. gør clinical attention-kilder, limitations og clinician authority observerbare;
4. mål det faktiske antal handlinger og steder, hvor disclosure eller dokumentintention skaber tøven;
5. test Cortex Overblik som orienteringspunkt uden at forklare dets rolle.

Product skal omsætte læringen til et learning contract og eventuelle krav. Architecture og Build involveres først gennem separate, autoriserede handoffs.

## 8. Ikke anbefalet endnu

P01 giver ikke evidens til at bygge eller claim’e:

- en rigtig AI-model;
- EHR-integration;
- automatisk diagnose;
- automatiske behandlingsanbefalinger;
- regulatoriske claims.

Disse områder vil udvide risici, afhængigheder og fortolkningsproblemer uden at løse P01’s dokumenterede informations- og workflowusikkerheder.

## 9. Research conclusion

Sprint 1 har forbedret orientering, assessment-centrering, dokumentationsfleksibilitet og den objektive struktur sammenlignet med Sprint 0. De positive signaler er konsistente med PDR-007’s intent, men er ikke validering af Product-retningen.

P01 viser samtidig seks materielle problemer: anamnesen og den objektive undersøgelse mangler fortsat klinisk dybde; journalen opleves stadig som maskinproduceret; Cortex Overblik er værdifuldt men ikke visuelt eller operationelt tydeligt nok; clinical attention har begrænset coverage; og dokumentationsflowet indeholder fortsat friktion.

Den samlede evidens understøtter, at Product prioriterer en Sprint 1.1-læringsiteration omkring klinisk informationsgrundlag, klinisk kommunikation, safety comprehension og målbar workflowfriktion. P01 kan ikke bevise usability, klinisk korrekthed, sikkerhed, tidsbesparelse eller readiness og autoriserer ingen kodeændring eller Build-handoff.

## 10. Downstream disposition

- **Product:** Modtager findings, hypoteser og prioriterede læringsinputs til prioritering af Sprint 1.1.
- **Architecture:** Ingen direkte handoff; afventer Product-afgrænsning.
- **Build:** Ingen handoff eller implementationautorisation.
- **Steering:** Kan bruge evidensgrænse og læringsprioriteter; træffer beslutningen.
