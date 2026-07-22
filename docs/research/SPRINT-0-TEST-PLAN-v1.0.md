# Sprint 0 Test Plan v1.0

**Research Assignment:** RA-001  
**Status:** Klar til kontrolleret gennemførelse  
**Datagrundlag:** Kun syntetiske data

## 1. Formål

Studiet skal reducere usikkerhed om, hvordan læger orienterer sig, handler og placerer ansvar i Sprint 0-prototypens knæcase. Studiet måler ikke klinisk effekt og validerer ikke produktet.

## 2. Research questions

1. Kan deltageren finde og forstå relevant information i patientoverblikket?
2. Hvordan fortolker deltageren AI-resuméets funktion, begrænsninger og autoritet?
3. Kan konsultationsflowet gennemføres uden hjælp?
4. Kan journaludkast og henvisningsudkast findes, vurderes og redigeres?
5. Hvordan opdager og håndterer deltageren det degraderede AI-flow?
6. Er forskellen mellem AI-forslag og lægens ansvar forståelig uden facilitatorforklaring?
7. Hvor afviger menneskelig adfærd fra de fem eksisterende AI-agentscenarier?

## 3. Design

- **Metode:** Modereret, opgavebaseret usability-test med think-aloud og afsluttende semistruktureret interview.
- **Deltagere:** 3–5 praktiserende læger eller læger med dokumenteret erfaring fra almen praksis.
- **Varighed:** 30–45 minutter pr. deltager.
- **Bemanding:** Én facilitator; én observatør hvis muligt.
- **Setup:** Samme prototypeversion, browser, viewport, starttilstand og syntetiske knæcase for alle.
- **Optagelse:** Skærm og lyd kun efter udtrykkeligt samtykke. Ellers strukturerede noter.
- **Pilot:** Én intern pilot af script og instrumentering; pilotdata indgår ikke som deltagerdata.

### Rekrutteringsvariation

Søg variation i almen-praksis-erfaring og erfaring med kliniske AI-værktøjer. Registrér variationen; brug ikke den lille stikprøve til gruppesammenligninger.

### Testcase

34-årig mand med vridtraume under fodbold dagen før. Mediale knæsmerter, let hævelse, ingen låsning. Mistanke om menisk- eller ligamentskade. Deltageren skal behandle casen som syntetisk og ikke tilføje virkelige patientdata.

## 4. Hypoteser, der kan falsificeres

| ID | Arbejdshypotese | Falsificerende observation |
|---|---|---|
| H1 | Relevant patientinformation kan lokaliseres uden hjælp. | Deltageren overser kritisk caseinformation, søger gentagne gange eller kræver hjælp. |
| H2 | AI-resuméet forstås som et forslag, ikke som facit. | Deltageren tillægger det autoritet uden selvstændig kontrol eller kan ikke beskrive dets rolle. |
| H3 | Kerneflowet kan afsluttes uden facilitatorhjælp. | Deltageren går i stå, opgiver eller modtager procedurehjælp. |
| H4 | Udkast kan redigeres og vurderes før approval. | Deltageren kan ikke finde redigering, tror udkast er endelige eller approver uden vurdering. |
| H5 | AI-fejl kan opdages og håndteres uden tab af ansvarsklarhed. | Fejlen overses, stopper hele flowet eller fører til ukritisk accept/gentagelse. |

## 5. Forløb og tidsbudget

| Del | Tid |
|---|---:|
| Introduktion, samtykke og baggrund | 5 min. |
| Patientoverblik og AI-resumé | 6–8 min. |
| Konsultationsflow | 7–10 min. |
| Journal- og henvisningsudkast | 7–10 min. |
| Degraderet AI-flow | 4–6 min. |
| Interview og afrunding | 6–8 min. |

Testopgaver og neutral facilitatoradfærd fremgår af `SPRINT-0-TEST-SCRIPT-v1.0.md`.

## 6. Målinger

Måles pr. opgave fra facilitatorens oplæsning er afsluttet:

- **Tid til første handling:** sekunder til første målrettede klik, scroll eller tekstinput.
- **Tid til opgaveafslutning:** sekunder til deltagerens erklærede afslutning eller stopregel.
- **Opgaveresultat:** gennemført uden hjælp / gennemført med hjælp / ikke gennemført / fejlagtigt gennemført.
- **Facilitatorhjælp:** niveau 0–3: ingen; neutral gentagelse; generelt prompt; procedureforklaring. Niveau 2–3 betyder ikke gennemført uden hjælp.
- **Tøven:** pause på mindst 5 sekunder uden synlig målrettet handling; antal og placering.
- **Fejl:** handling med et observerbart resultat, der afviger fra deltagerens udtrykte mål.
- **Tilbage-navigation:** antal navigationer til tidligere visning eller tilstand.
- **Recovery:** selvstændig / efter neutral prompt / efter procedurehjælp / ingen recovery; samt tid fra synligt fejlresultat til ny målrettet handling.
- **AI-kontrolhandling:** eksplicit kontrol, ændring, afvisning eller accept af AI-output; registrér hvad der udløste handlingen.
- **Ansvarstilkendegivelse:** ordret udsagn eller handling, som placerer beslutningsansvar hos AI, læge, system eller uklart.

Klikdata fra instrumentering bruges som støtte. Ved konflikt har skærmoptagelse/tidsstemplede observationsnoter forrang, og konflikten dokumenteres.

## 7. Gennemførelse og kvalitetskontrol

### Før hver session

- Bekræft prototypeversion, testkonto, syntetisk case og starttilstand.
- Nulstil sessionen; kontrollér at instrumentering og AI-fejlscenarie kan udløses.
- Tildel anonymt deltager-ID (`P01`–`P05`).
- Klargør observationsark og tidtagning.
- Bekræft samtykke og forbud mod virkelige patientdata.

### Under sessionen

- Forklar ikke UI, fagligt indhold eller forventet arbejdsgang.
- Stil neutrale prompts og registrér al hjælp ordret.
- Skeln løbende mellem synlig adfærd og fortolkning.
- Stop ved risiko for eksponering af virkelige patientdata eller ved deltagerens ønske.

### Efter sessionen

- Gem noter under deltager-ID, ikke navn.
- Afstem facilitator- og observatørnoter samme dag.
- Markér manglende/uklare data; rekonstruér ikke hændelser fra hukommelsen som fakta.
- Slet eller håndtér optagelser efter den aftalte opbevaringsprocedure.

## 8. Analyse

1. Rekonstruér hver opgave som en tidslinje af observationer, udsagn og hændelser.
2. Kod data efter research question og finding-type.
3. Saml gentagne mønstre og negative cases; behold enkeltstående alvorlige hændelser.
4. Tildel severity ud fra konsekvens, recovery og evidensstyrke — ikke hyppighed alene.
5. Sammenlign menneskedata med AI-agentscenarier efter modellen i rapportskabelonen.
6. Beskriv konkurrerende fortolkninger og evidenshuller.

### Finding-klassifikation

- **Critical:** Observeret forhold kan medføre alvorlig klinisk/ansvarsmæssig risiko eller blokere kerneflowet, og deltageren kan ikke sikkert recovere. En enkelt veldokumenteret hændelse kan være tilstrækkelig.
- **Material:** Forholdet påvirker korrekt forståelse, beslutningsgrundlag eller opgavegennemførelse væsentligt, men recovery er mulig eller konsekvensen er mindre alvorlig.
- **Minor:** Lokal friktion med begrænset konsekvens; opgaven gennemføres korrekt uden væsentlig hjælp.
- **Hypothesis:** Plausibel forklaring eller risiko, hvor evidensen er utilstrækkelig, indirekte eller ikke reproduceret. Må ikke rapporteres som observeret problem.

## 9. Sammenligning med fem AI-agentscenarier

Før analysen registreres de eksisterende scenarier som `AS-01`–`AS-05` med version, prompt, starttilstand, tilgængelige handlinger og fuldt spor. AI-agenten vurderes på de samme opgaver og observerbare endepunkter som mennesker, men tidsmål sammenlignes ikke direkte som performance.

Analysér forskelle i:

- informationssøgning og rækkefølge
- oversete eller fejltolkede oplysninger
- navigation, loops og recovery
- kontrol, redigering eller accept af AI-output
- håndtering af degraderet AI
- eksplicit/implicit placering af ansvar
- succes, fejl og stopbetingelser

Interessante ligheder er især samme misforståelse, samme oversete information, samme fejlslutning, samme fastlåsningspunkt eller samme recovery-strategi på tværs af menneske og agent.

Der må **ikke** konkluderes, at AI-agenter repræsenterer læger, at fælles adfærd beviser korrekthed, at agenthastighed siger noget om menneskelig usability, eller at fem scenarier dokumenterer generaliserbarhed, klinisk sikkerhed eller klinisk effekt.

## 10. Tilstrækkelig læring til Steering

Læringscyklussen er beslutningsklar — ikke “valideret” — når:

- 3–5 kvalificerede deltagere har gennemført samme kernescenarie, eller frafald/manglende data er dokumenteret;
- alle syv research questions har mindst én direkte observation eller er markeret som evidenshul;
- alle kerneopgaver har resultat, hjælp-niveau og centrale hændelser registreret;
- AI-fejlflowet er observeret hos mindst tre deltagere;
- de fem AI-agentscenarier er kortlagt og sammenholdt med menneskedata, eller manglende spor er tydeligt angivet;
- findings er sporbare til data, severity-begrundede og adskilt fra fortolkning;
- negative cases, modstridende evidens og studiets begrænsninger er rapporteret;
- rapporten beskriver, hvilken usikkerhed hver af fire mulige retninger ville adressere: iteration af Sprint 0, start af Sprint 1, delvist redesign eller nyt prototype-slice.

Research anbefaler ikke en af de fire retninger. Hvis et kriterium ikke er opfyldt, rapporteres hvilken beslutningsrelevant usikkerhed der består.

## 11. Afgrænsninger

Studiet kan afdække usability- og ansvarssignaler i én syntetisk case. Det kan ikke dokumentere klinisk effekt, patientsikkerhed i drift, repræsentativitet, adoption, generaliserbarhed til andre cases eller korrekt produkt-/arkitekturretning.
