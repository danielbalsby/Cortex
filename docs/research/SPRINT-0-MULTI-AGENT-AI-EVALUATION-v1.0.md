# Sprint 0 Multi-Agent AI Evaluation v1.0

**Dato:** 2026-07-22  
**Prototype:** Sprint 0 Learning Prototype  
**Route:** `/prototype/sprint-0`  
**Case:** Fast syntetisk knæcase  
**Status:** Formativ AI-evaluering; ikke klinisk validering eller brugerforskning

## Executive summary

Seks AI-reviewerroller har vurderet samme syntetiske case ud fra almenmedicin, klinisk dokumentation, produktdesign, patientsikkerhed, Cortex-filosofi og founder-/adoptionsperspektiv.

Den samlede konklusion er:

> Sprint 0 har et stærkt integritets- og authority-fundament, men endnu ikke en klinikeroplevelse, som en travl læge intuitivt vil forstå og stole på.

Prototypen gør flere vigtige ting rigtigt:

- urørte værdier bliver ikke kliniske facts;
- patientkontekst, mock-AI og klinikerens vurdering er adskilt;
- AI skaber ikke automatisk vurdering eller plan;
- klinikerens journalrettelser overskrives ikke lydløst;
- henvisningsintention kræver en eksplicit handling;
- draft, kopiering og levering er semantisk adskilt;
- en AI-fejl kan håndteres manuelt uden blindgyde.

De stærkeste problemer er imidlertid tværgående:

1. **Falsk færdighed:** Journalen kan markeres gennemgået, godkendes til kopiering og kopieres efter kendt anamnese alene, selv om objektiv undersøgelse, safety-vurdering, plan, opfølgning og safety-net mangler.
2. **Manglende safety support:** Red flags, alvorlige differentialer, safety-net og opfølgning er ikke integreret i den synlige arbejdsgang.
3. **For tyndt klinisk grundlag:** Den objektive undersøgelse kan ikke udtrykke centrale fund for de viste menisk-/ligamenthypoteser.
4. **Statusadministration:** Tre dokumenter kræver op til ni rutinemæssige statusklik. Prototypen gør klinikerens authority tydelig, men bureaukratisk.
5. **Output frem for konsultation:** Tre dokumentflader og deres lifecycle bliver oplevelsens tyngdepunkt. Klinisk vurdering er et enkelt fritekstfelt blandt mange kontroller.
6. **Uklar AI-rolle:** “AI Summary” gentager primært allerede synlig information og beskriver teknologien bedre end klinikerens opgave.
7. **Svag klinisk kommunikation:** Journalen ligner sætningstilpasset dataeksport; henvisningerne mangler et tydeligt modtagerformål og klinisk spørgsmål.
8. **Kildeintegritetsrisiko:** Gruppehandlingen tilfører “vrid på fikseret fod” og “forsinket hævelse”, selv om den viste syntetiske kilde kun siger vridtraume og let hævelse.

### Sammenfald med Daniel P00

AI-reviewet bekræfter alle syv materielle P00-temaer:

- utilstrækkeligt objektivt undersøgelsesgrundlag;
- utilstrækkelig repræsentation af red flags, safety-net og smerte-/planforhold;
- utilstrækkelig journalstruktur;
- svag billeddiagnostisk henvisning;
- for generisk fysioterapihenvisning;
- for mange synlige statushandlinger;
- uklar rolle for AI Summary.

Det bekræfter også P00’s overordnede produktfortolkning: Cortex opleves i for høj grad som tekst- og outputproduktion frem for støtte til en eksplicit klinisk vurdering.

### Nye fund

AI-reviewet identificerede følgende konkrete forhold, som er skarpere eller nye i forhold til P00:

- journal-readiness aktiveres efter et vilkårligt klinisk afsnit;
- uregistrerede centrale journalafsnit forsvinder uden journal-specifik mangelinformation;
- gruppehandlingen kan registrere mere specifikke facts end den synlige kilde indeholder;
- patientrapporteret “ingen låsning” bliver til den stærkere formulering “ingen reel aflåsning”;
- en billeddiagnostisk henvisning kan genereres, mens journalens Plan ikke nævner billeddiagnostik;
- ubrugte henvisningsdokumenter skal kopieres eller afvises, før prototypen viser scenariet som gennemført;
- alle tre outputkort vises, før de er relevante;
- afvis/gendan/nulstil har uklare konsekvenser for menneskelig redigering;
- synlig research-instrumentering kan påvirke den adfærd, som prototypen forsøger at observere.

## Metode og evidensgrænse

Evalueringen anvendte seks uafhængige reviewerroller. Alle læste samme faste case og relevante P00-, pathway-, prototype- og generatorkilder.

Én fælles live-browsergennemgang blev gennemført i hovedsessionen mod den lokale route. Den omfattede:

- orientering i Patient Overview og AI Summary;
- åbning af konsultationen;
- eksplicit registrering af kendte caseoplysninger;
- registrering af klinikerens arbejdshypotese;
- aktivering af begge planhandlinger og henvisningsintentioner;
- læsning af journal- og henvisningsudkast;
- gennemførelse af statusflow for alle tre dokumenter.

Live-gennemgangen bekræftede blandt andet:

- journalens “Markér gennemgået” blev aktiv efter gruppehandlingen alene;
- journalen manglede objektivt afsnit og safety-net uden at vise disse som journalmangler;
- outputområdet viste 12 statusknapper samtidigt, hvoraf seks var aktive efter udkastsgenerering;
- hvert af de tre dokumenter krævede tre statusklik for at nå Copied;
- journalens Plan nævnte fysioterapi, men ikke den valgte billeddiagnostik;
- begge henvisninger var korte problemresuméer med generiske modtagerønsker.

De seks specialist-agenter havde ikke selv en tilgængelig browserbinding i deres child-sessioner. Deres vurderinger er derfor source-/P00-baserede og er ikke seks selvstændige interaktive brugersessioner. Denne begrænsning må ikke skjules i downstream-brug af rapporten.

Severity anvendes sådan:

- **Critical:** Skal adresseres før en senere klinikerrettet prototype kan signalere dokument- eller sikkerhedsmæssig færdighed.
- **Important:** Materielt problem for klinisk værdi, tillid, usability eller adoption.
- **Minor:** Lokal friktion uden selvstændig betydning for den centrale arbejdsmodel.

## Agentresultater

### AI-Agent 1 — Almenmedicinsk kliniker

**Rolle:** Speciallæge i almen medicin med 15 års erfaring.  
**Samlet vurdering:** Prototypen er lovende som læringsartefakt, men kan ikke endnu fremstå som et klinisk fuldstændigt arbejdsredskab.

#### GP-01 — Journalen kan fremstå færdig på utilstrækkeligt grundlag

**Severity:** Critical

- **Forventet:** Anamnese alene bør efterlade journalen tydeligt ufuldstændig.
- **Faktisk:** Gruppehandlingen gør journalen review-, approval- og copy-klar uden objektiv undersøgelse, klinikervurdering, plan eller safety-net.
- **Hvorfor vigtigt:** “Approved for copy” kan blive forstået som klinisk tilstrækkelighed, selv om det kun er en teknisk tilstand.
- **Bør ændres:** Gør minimale, formålsrelevante mangler synlige ved dokumentets beslutningsgrænse. Teknisk kopierbarhed må ikke ligne klinisk godkendelse.

#### GP-02 — Safety- og red-flag-grundlaget er utilstrækkeligt

**Severity:** Critical

- **Forventet:** Klinikeren skal kunne se, hvilke alvorlige alternativer og safety-domæner der endnu ikke er vurderet.
- **Faktisk:** Der er ingen synlig registrering af relevante systemiske/inflammatoriske forhold, ekstensorapparat, neurovaskulære forhold eller samlet safety-net.
- **Hvorfor vigtigt:** Fravær af registrering kan forsvinde i workflowet i stedet for at forblive synlig usikkerhed.
- **Bør ændres:** Afprøv en kort, eksplicit og reversibel safety-gennemgang, som støtter opmærksomhed uden at træffe beslutninger.

#### GP-03 — Objektiv undersøgelse er for snæver

**Severity:** Important

- **Forventet:** Den viste case kræver mulighed for at dokumentere relevante understøttende, modstridende og ikke-udførte fund.
- **Faktisk:** Kun gang, effusion, ekstension og fokal ømhed findes. ROM, målrettet ligament-/menisk-/patella- og neurovaskulær undersøgelse kan ikke udtrykkes.
- **Hvorfor vigtigt:** Arbejdshypotesen kan ikke underbygges eller udfordres inden for Cortex.
- **Bør ændres:** Test et lille, kontekststyret undersøgelsessæt med tydelig forskel på negativ, ikke udført og ikke vurderbar.

#### GP-04 — Vurdering og plan er klinisk for tynde

**Severity:** Important

- **Forventet:** Primær hypotese, differentialer, alvorlige trusler, usikkerhed, opfølgning og safety-net skal kunne holdes adskilt.
- **Faktisk:** Vurderingen er fri tekst, og planen består kun af billeddiagnostik og fysioterapi.
- **Hvorfor vigtigt:** Klinisk syntese og afslutning må bæres i hukommelsen eller efterredigeres uden for strukturen.
- **Bør ændres:** Gør klinikerens vurdering, usikkerhed, opfølgning og eksplicit plan til et sammenhængende, menneskeejet grundlag.

### AI-Agent 2 — Klinisk dokumentationsspecialist

**Samlet vurdering:** Journalen er nærmere struktureret dataeksport formuleret som sætninger end færdig klinisk kommunikation.

#### DOC-01 — Journalen følger datamodellen mere end klinisk fortælling

**Severity:** Important

- **Forventet:** Journalen skal være en sammenhængende, prioriteret klinisk kommunikation.
- **Faktisk:** Facts omsættes loyalt til standardsætninger i datamodellens rækkefølge.
- **Hvorfor vigtigt:** Korrekte sætninger kan stadig kræve omfattende klinisk omstrukturering.
- **Bør ændres:** Test klinisk læsbar syntese og mål, hvad læger flytter, sletter og tilføjer.

#### DOC-02 — Tomme afsnit skjules i stedet for at signalere ufuldstændighed

**Severity:** Critical

- **Forventet:** Uregistrerede facts skal udelades fra journalteksten, men manglende dokumentationsgrundlag skal være synligt før copy.
- **Faktisk:** Objektivt, Plan og safety-relaterede afsnit kan forsvinde helt uden journal-specifik mangelinformation.
- **Hvorfor vigtigt:** En kort note kan se bevidst kort ud, selv om den reelt er ufuldstændig.
- **Bør ændres:** Adskil tekstens indhold fra synlig completeness-feedback.

#### DOC-03 — Henvisningerne er ikke tilstrækkeligt modtagerorienterede

**Severity:** Important

- **Forventet:** Henvisningen skal kommunikere problem, relevant kontekst, klinisk spørgsmål og ønsket modtagerhandling.
- **Faktisk:** Billeddiagnostikudkastet beder generisk om vurdering, og fysioterapiudkastet mangler funktionelt mål og kontekst.
- **Hvorfor vigtigt:** Generering reducerer ikke nødvendigvis efterredigering eller forbedrer modtagerens arbejdsgrundlag.
- **Bør ændres:** Test dokumenterne som selvstændige kliniske kommunikationsformer, ikke som varianter af journalen.

#### DOC-04 — Samme state kan skabe semantisk drift mellem dokumenter

**Severity:** Important

- **Forventet:** Journal og henvisning bør være konsistente om klinikerens eksplicitte plan.
- **Faktisk:** Billeddiagnostisk henvisning kan eksistere, mens journalens Plan ikke nævner den valgte billeddiagnostik.
- **Hvorfor vigtigt:** Revieweren kan ikke stole på, at dokumentfamilien repræsenterer samme menneskelige intention.
- **Bør ændres:** Afprøv en fælles, eksplicit plansemantik på tværs af dokumenter uden at sammenblande intention, draft, copy eller levering.

#### DOC-05 — Kort/Standard/Udvidet er en hypotese, ikke et krav

**Severity:** Important hypothesis

- **Forventet:** Forskellig detaljegrad reducerer redigering uden at ændre facts eller skjule safety-indhold.
- **Faktisk:** Prototypen tilbyder ét niveau. P00 og AI-reviewet kan ikke afgøre, om tre niveauer hjælper eller blot skaber endnu et valg.
- **Hvorfor vigtigt:** “Kort” må ikke blive et synonym for ufuldstændig.
- **Bør ændres:** Sammenlign flere niveauer med et kontekstuelt alternativ og mål forudsigelighed, redigeringsbyrde og informationsbevarelse.

### AI-Agent 3 — UX / Product Designer

**Samlet vurdering:** Oplevelsen føles som en intern workflowkonsol med klinisk styling, ikke endnu som et roligt klinisk workspace.

#### UX-01 — Statusflowet gør authority til rutineadministration

**Severity:** Important

- **Forventet:** Én tydelig handling med forståelig klinikercommitment.
- **Faktisk:** Tre dokumenter kræver hver `Markér gennemgået → Godkend til kopiering → Kopiér`; yderligere afvis/gendan/nulstil vises efter state.
- **Hvorfor vigtigt:** Ceremonielle klik kan blive mekaniske og dermed svække den meningsfulde bekræftelse.
- **Bør ændres:** Test én naturlig rutinehandling og vis exception/recovery states kontekstuelt. Copy og delivery skal fortsat være semantisk adskilt.

#### UX-02 — Progressive disclosure brydes af inaktive outputs

**Severity:** Important

- **Forventet:** Journalen er primær; henvisninger vises først efter relevant plan og eksplicit intention.
- **Faktisk:** Alle tre dokumentkort og deres mangler/statuskontroller vises samtidigt.
- **Hvorfor vigtigt:** Mulige outputs konkurrerer med den aktuelle patientopgave og får inaktivitet til at ligne fejl.
- **Bør ændres:** Hold inaktive dokumentfamilier ude af den primære flade.

#### UX-03 — Kontekst duplikeres som kilde, gruppehandling og formular

**Severity:** Important

- **Forventet:** Én sammenhængende klinisk repræsentation med controls tæt på mangler og korrektioner.
- **Faktisk:** Patient Overview viser facts, en disclosure gentager gruppeindholdet, og en stor kontrolmatrix repræsenterer samme information igen.
- **Hvorfor vigtigt:** Klinikeren skal mentalt afstemme tre repræsentationer af den samme case.
- **Bør ændres:** Brug controls til bekræftelse og korrektion omkring én klinisk arbejdsrepræsentation.

#### UX-04 — Completion følger systemobjekter, ikke klinikerens intention

**Severity:** Important

- **Forventet:** Ubrugte dokumenter påvirker ikke completion.
- **Faktisk:** Alle tre dokumenter skal kopieres eller afvises, før Session report viser “Scenario gennemført”.
- **Hvorfor vigtigt:** Klinikeren skal afslutte systemobjekter, som ikke nødvendigvis er relevante.
- **Bør ændres:** Lad completion følge valgte intentioner og nødvendige outputs.

#### UX-05 — Research-instrumentering belaster deltageroplevelsen

**Severity:** Minor/Important

- **Forventet:** Måling er adskilt fra klinikerens primære arbejdsflade.
- **Faktisk:** Session report, stopsted, tællere og eventlog er permanent synlige.
- **Hvorfor vigtigt:** Instrumentering kan påvirke den adfærd, den forsøger at måle.
- **Bør ændres:** Hold evaluatorinformation uden for klinikerens primære opmærksomhedsflade.

### AI-Agent 4 — Clinical Safety Reviewer

**Samlet vurdering:** Den største risiko er ikke en automatisk forkert beslutning, men falsk completeness omkring tynde data.

#### SAFE-01 — Intet synligt safety-assessment- eller attention-flow

**Severity:** Critical

- **Forventet:** Uafklarede safety-domæner og alvorlige alternativer skal forblive synlige og advisory.
- **Faktisk:** Der findes ingen samlet safety-gennemgang eller Clinical attention points-region.
- **Hvorfor vigtigt:** Workflowet kan fortsætte, mens væsentlig usikkerhed er fraværende frem for eksplicit uafklaret.
- **Bør ændres:** Test proportional, ikke-besluttende attention support med dokumenteret source-review.

#### SAFE-02 — Gruppehandlingen overskrider den viste kildes præcision

**Severity:** Important

- **Forventet:** En gruppebekræftelse må kun registrere synlige, bekræftede facts.
- **Faktisk:** Kilden siger vridtraume og let hævelse; handlingen registrerer vrid på fikseret fod og let forsinket hævelse.
- **Hvorfor vigtigt:** Mere specifikke antagelser bliver efter eksplicit klik til journal- og henvisningsfacts.
- **Bør ændres:** Bring kilde og gruppeindhold i fuld overensstemmelse, eller vis tilføjelser som selvstændige klinikerbekræftelser.

#### SAFE-03 — Patientrapport bliver til stærkere klinisk formulering

**Severity:** Important

- **Forventet:** “Patienten oplyser ingen låsning” bevarer attribution og usikkerhed.
- **Faktisk:** Journalen formulerer “ingen reel aflåsning”.
- **Hvorfor vigtigt:** “Reel” kan læses som en klinisk klassifikation, der ikke er dokumenteret i kilden.
- **Bør ændres:** Bevar attribution eller kræv eksplicit klinisk klassifikation.

#### SAFE-04 — Henvisnings-readiness er for svag

**Severity:** Important

- **Forventet:** Formål, klinisk spørgsmål, relevante fund, funktionspåvirkning og uafklarede krav skal være tydelige.
- **Faktisk:** Henvisninger kan genereres fra meget få facts og fri arbejdshypotese.
- **Hvorfor vigtigt:** Et tyndt dokument kan stadig nå “Approved for copy”.
- **Bør ændres:** Vis dokumenttype-specifikke mangler og kræv eksplicit formål før copy-readiness. Kliniske og regionale krav kræver særskilt review.

### AI-Agent 5 — Cortex Philosophy Reviewer

**Samlet vurdering:** Sprint 0 har Cortex’ sikkerhedsmoral, men endnu ikke Cortex’ oplevelsesmæssige identitet.

#### PH-01 — Calm before clever er kun delvist opfyldt

**Severity:** Important

- **Forventet:** Systemet beskytter opmærksomheden og viser kun den aktuelle kliniske tanke.
- **Faktisk:** Patient, AI, konsultationsmatrix, tre outputs og Session report har samtidig visuel vægt.
- **Hvorfor vigtigt:** Rolige farver kan ikke kompensere for et systemtungt informationshierarki.
- **Bør ændres:** Reducér samtidig synlighed og gør én klinisk arbejdsflade dominerende.

#### PH-02 — Context before controls er organisatorisk, ikke kontekstuelt

**Severity:** Important

- **Forventet:** Kendt, ukendt og modstridende kontekst følger den aktuelle beslutning.
- **Faktisk:** Konteksten står i en venstre kolonne, mens handlingen sker i en separat kontrolflade.
- **Hvorfor vigtigt:** Klinikeren skal bære oversættelsen i arbejdshukommelsen.
- **Bør ændres:** Knyt relevant kontekst og usikkerhed direkte til den aktuelle kliniske sektion.

#### PH-03 — Invisible intelligence er ikke opfyldt

**Severity:** Important

- **Forventet:** Intelligens hjælper diskret med et tydeligt klinisk job.
- **Faktisk:** AI Summary er en permanent destination med generér-, fejl- og afvis-handlinger samt provider/version.
- **Hvorfor vigtigt:** Teknologien bliver et selvstændigt objekt, som klinikeren skal forstå og administrere.
- **Bør ændres:** Definér først det kliniske job og test derefter en diskret, source-bounded støtteform.

#### PH-04 — Konsultationen er ikke tydeligt produktets centrum

**Severity:** Important

- **Forventet:** Understand → Explore → Evaluate → Decide → Execute → Close organiserer oplevelsen; dokumenter opstår som konsekvens.
- **Faktisk:** Completion og synligt arbejde centrerer sig om tre dokumentobjekter.
- **Hvorfor vigtigt:** Produktets succes bliver implicit “outputs behandlet” frem for “konsultationen støttet”.
- **Bør ændres:** Gør den autoriserede kliniske vurdering og plan til centrum; vis kun relevante outputs efter intention.

**Logo-test:** Uden Cortex-logoet vil oplevelsen mest sandsynligt blive opfattet som et kontrolleret EMR-/dokumentgenerator-eksperiment, ikke som en stille klinisk assistent.

### AI-Agent 6 — Critical Founder Reviewer

#### Største styrke

**Den epistemiske grænse.** Cortex prioriterer sandhed, provenance og menneskelig kontrol før genereret tekst. Det er differentierende og bør bevares.

#### Største produktfejl

**Cortex er stadig et dokument- og statusadministrationssystem frem for et klinisk arbejdsredskab.** Brugeren administrerer Patient Overview, AI Summary, felter, tre dokumenter og lifecycle-statuser.

#### Hvad kan få en læge til aldrig at bruge det?

**Dobbeltarbejde uden tydelig klinisk gevinst.** Klinikeren registrerer strukturerede facts, formulerer vurdering, kontrollerer tekst, gennemfører statusser og kopierer dokumenter, mens AI Summary primært gentager den synlige case.

#### Hvad skal ændres før næste prototype?

- gør klinikerens vurdering til produktets centrum;
- reducer rutineflowet til én forståelig commitment-handling;
- definér AI-støttens konkrete kliniske job;
- gør completeness transparent før copy;
- test henvisninger som modtagerorienteret kommunikation;
- fjern systemadministration og researchinstrumentering fra kerneoplevelsen.

**Founder-beslutning:** Byg videre på integritetsfundamentet, men ikke på den nuværende interaction model.

## Consensus Matrix

| Finding | Daniel P00 | AI-agenter | Prioritet |
|---|---|---|---|
| AI Summary uklar | Ja — P00-F07 / F-M03 | 5/6 reviewerroller identificerede uklar klinisk opgave eller lav selvstændig værdi | Important |
| For mange statushandlinger | Ja — P00-F06 / F-M04 | 6/6; live-flow krævede ni statusklik for tre dokumenter | Important / adoption blocker |
| Journal mangelfuld | Ja — P00-F03 / F-M02 | 6/6; konkret nyt fund: review/copy aktiveres efter anamnese alene | Critical |
| Henvisninger svage | Ja — P00-F04/F05 / F-M05 | 5/6; output er generisk og ikke tilstrækkeligt modtagerorienteret | Important |
| Manglende safety support | Ja — P00-F02 / F-M06 | 5/6; ingen samlet safety-/attention-/follow-up-grænse | Critical |
| Manglende dokumentationsniveau | Hypotese — P00-F09 / F-H01 | 3/6 vurderede det som relevant, men uvalideret hypotese | Important hypothesis |
| Utilstrækkelig objektiv undersøgelse | Ja — P00-F01 | GP, safety, documentation og founder-review bekræfter | Important |
| Outputcentreret produktmodel | Ja — F-M01/F-M07 | 6/6 | Important / strategic |
| Kilde og gruppehandling stemmer ikke præcist | Ikke eksplicit | GP, safety og founder-review; source-verificeret | Important |
| Optional outputs blokerer completion | Ikke eksplicit | UX, philosophy og founder-review; source-verificeret | Important |
| Journal/henvisning kan have forskellig plansemantik | Ikke eksplicit | Documentation og safety; live/source-verificeret | Important |

## Product anbefaling — Top 10 ændringer til Sprint 1

Prioriteringen følger: patientsikkerhed → klinisk værdi → kognitiv belastning → adoption. Punkterne er learning- og produktmål, ikke tekniske løsninger eller kliniske behandlingsanbefalinger.

1. **Stop falsk completeness.** Adskil “tekst findes”, “teknisk komplet”, “menneskeligt gennemgået” og “klinisk tilstrækkeligt”. En substantielt ufuldstændig journal må ikke ligne et færdigt dokument.
2. **Gør uafklaret safety synlig.** Test en rolig, advisory repræsentation af uafklarede red flags, alvorlige alternativer, opfølgning og safety-net. Ingen automatisk beslutning eller falsk reassurance.
3. **Bring alle facts i fuld overensstemmelse med kilden.** Gruppehandlinger og genereret tekst må ikke øge præcision, attribution eller sikkerhed uden eksplicit klinikerbekræftelse.
4. **Gør klinikerens vurdering til det fælles autoriserede grundlag.** Facts, relevant negative, unknowns, differentialer, rationale, plan og safety-net skal kunne skelnes uden at blive en stor formular.
5. **Test et kontekststyret undersøgelsesgrundlag.** Giv adgang til de mindste klinisk reviewede informationstyper, som den akutte case kræver, inklusive forskellen på negativ, ikke udført og ikke vurderbar.
6. **Forenkl den synlige authority-handling.** Test én forståelig rutinehandling med tydelig konsekvens; bevar internt skel mellem review, authorization, copy, delivery og outcome.
7. **Definér AI-støttens kliniske job før næste UI.** Sammenlign separat resumé med diskret støtte til orientering, mangler eller konflikter. Hvis jobbet ikke kan forklares uden ordet “AI”, bør funktionen ikke være en selvstændig destination.
8. **Gør journal og henvisninger formålstilpassede.** De skal være forskellige, modtagerorienterede repræsentationer af samme menneskeligt autoriserede grundlag og være semantisk konsistente om planen.
9. **Indfør reel progressive disclosure.** Vis kun aktuelt relevante controls og outputs. Ubrugte henvisninger må ikke være synlige fejltilstande eller blokere completion.
10. **Test dokumentationsniveau som eksperiment.** Sammenlign Kort/Standard/Udvidet med mindst ét kontekstuelt alternativ. Mål redigeringsbyrde, forudsigelighed og bevarelse af facts, uncertainty og safety-relevant information.

## Hvad bør bevares

- Ingen klinisk meningsfulde defaults.
- Eksplicit og reversibel registrering.
- Adskillelse mellem kilde, AI-output, klinikerens vurdering og dokumentudkast.
- Bevarelse af menneskelige redigeringer og synlig stale-state.
- Eksplicit henvisningsintention.
- Ingen automatisk levering.
- Manuel recovery ved AI-fejl.
- Tydelig prototype-/syntetisk-datamærkning.

## Begrænsninger

- AI-evaluering er ikke brugerforskning.
- AI-evaluering er ikke klinisk validering.
- AI-evaluering er ikke evidens for regulatoriske claims.
- Evalueringen omfatter én syntetisk case og ingen virkelige patientdata.
- Ingen af reviewerrollerne kan fastlægge kliniske thresholds, korrekt behandling, korrekt billedmodalitet eller regionale henvisningskrav.
- Kun én fælles live-browsergennemgang blev gennemført. Specialistagenternes vurderinger var source-/P00-baserede, ikke seks uafhængige brugssessioner.
- Der er ingen tidsmåling, klikbaseline mod et eksisterende journalsystem eller observation af praktiserende lægers faktiske adfærd.
- Severity angiver risiko og prioritet for næste læringsiteration, ikke dokumenteret skade eller klinisk hændelse.
- Konsensus mellem AI-agenter er ikke uafhængig menneskelig evidens; agenterne læste samme case og flere af de samme dokumenter.
- Rapporten autoriserer ikke produktændringer, klinisk test, release eller brug med patientidentificerbare data.

## Samlet produktvurdering

Sprint 0 er et nyttigt læringsartefakt med et stærkt sikkerheds- og integritetsfundament. Det er endnu ikke et produkt, som en travl kliniker bør forventes intuitivt at forstå og stole på uden betydelig forklaring og efterkontrol.

Den næste prototype bør ikke være en polering af den nuværende skærm. Den bør teste, om Cortex kan flytte centrum fra formular, AI-resumé og dokumentstatus til en rolig, eksplicit, menneskeejet klinisk vurdering, hvor relevant dokumentation opstår som konsekvens.
