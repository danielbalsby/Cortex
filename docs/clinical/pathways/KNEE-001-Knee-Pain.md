# KNEE-001 – Knæsmerter

**Status:** Prototype  
**Owner:** Cortex  
**Last reviewed:** 2026-07-15  
**Implementation version:** `knee-pain` 0.3.0  
**Clinical validation status:** Not clinically validated

## Formål og relation til Cortex

Dokumentet beskriver den aktuelt implementerede knæsmerte-pathway. Det er en beskrivelse af prototypeadfærd, ikke en klinisk retningslinje eller godkendelse til patientbehandling.

Pathwayen skal følge [`WF-001`](../../vision/WF-001-The-Consultation-Workflow.md), de [kliniske sikkerhedsprincipper](../../governance/CLINICAL-SAFETY-PRINCIPLES.md) og den [aktuelle arkitektur](../../architecture/README.md).

## Tiltænkte brugere og setting

- Praktiserende læger og uddannelseslæger i dansk almen praksis.
- Udvikling, demonstration og kontrolleret evaluering uden patientidentificerbare data.
- Ikke godkendt til selvstændig klinisk anvendelse.

## Scope

Pathwayen understøtter struktureret registrering af udvalgte oplysninger om knæsmerter, regelbaserede opmærksomhedspunkter, forslag til arbejdsdiagnose og plan samt udkast til journal og udvalgte henvisninger.

## Ikke omfattet

- Fuld anamnese, komplet objektiv undersøgelse eller udtømmende differentialdiagnostik.
- Automatisk diagnose, behandling, billeddiagnostik eller henvisning.
- Medicinordination, dosering, parakliniske svar eller patientinformation.
- Dokumenteret guideline-compliance eller regional visitationsgodkendelse.
- Lagring af patientidentitet, konsultation eller permanent journal.
- Direkte integration eller afsendelse til EPJ, billeddiagnostik eller andre modtagere.

## Konsultationsworkflow

Alle kliniske felter starter ubesvarede. Kun eksplicit registrerede værdier kan påvirke synlighed, regler, forslag og outputs.

| Sektion | Aktuelle felter | PSOAP-gruppe |
|---|---|---|
| Problem | Side | P |
| Historie | Debut, varighed, traume, traumemekanisme, belastning, låsning, feber, supplerende anamnese | S |
| Traumespor | Umiddelbar hævelse, hørt/følt knæk | S |
| Objektivt | Hævelse, rødme, varme, ledlinjeømhed, bevægelighed, stabilitet | O |
| Vurdering | Arbejdsdiagnose, differentialer, diagnostisk sikkerhed, egen vurdering | A |
| Plan | Tiltag og safety-net | P |

Sektionerne vises som sammenklappelige kort. Lægen kan bevæge sig frit mellem dem; der er ingen tvungen trinvis rækkefølge.

## Betinget synlighed

### Feltniveau

`trauma-mechanism` vises kun, når `trauma = yes`.

### Sektionsniveau

Sektionen `trauma-track` vises kun, når `trauma = yes`.

Hvis traume ændres, så betingelsen ikke længere er opfyldt, skjules de afhængige felter, og deres tidligere svar fjernes fra konsultationsstate. Alle andre sektioner og felter er aktuelt altid synlige.

## Aktuelle kliniske alerts

Et alert vises kun, når alle dets betingelser er opfyldt.

| Rule ID | Betingelser | Severity | Aktuel besked |
|---|---|---|---|
| `possible-septic-arthritis` | Feber = ja, hævelse = udtalt, bevægelighed = svært nedsat | Critical | “Septisk artrit skal overvejes ved feber, udtalt hævelse og svært nedsat bevægelighed.” |
| `ottawa-knee` | Traume = ja, kan ikke støtte | Warning | “Overvej relevansen af Ottawa Knee Rules og akut billeddiagnostik.” |
| `locking-reminder` | Låsning = ja | Info | “Afklar reel aflåsning og behov for videre udredning.” |

Disse regler er prototypeindhold. Kilder, versionsdatoer, inklusionskriterier og klinisk formulering er ikke dokumenteret i repository og skal gennemgås før klinisk anvendelse.

Engine-resultatet bevarer regel-ID, alle konfigurerede betingelser samt matchede og ikke-matchede betingelser med den registrerede værdi. Det giver et struktureret grundlag for forklaring uden at ændre den aktuelle rolige alertvisning.

## Aktuelle vurderingsforslag

Hvert forslag har en eksplicit display-policy i pathwayen. Som konservativ midlertidig prototypepolitik kræver alle aktuelle forslag, at samtlige konfigurerede støttende fund er registreret. Der er ikke dokumenteret et klinisk grundlag for svagere delmatchgrænser. UI viser eksempelvis “2 af 2 støttende fund”; optællingen er ikke en sandsynlighed eller diagnostisk sikkerhed. Højst fire forslag vises.

| Forslag | Konfigurerede støttende fund | Aktuel display-policy |
|---|---|---|
| Gonartrose | Intet traume, gradvis debut, varighed måneder | Alle 3 skal matche |
| Meniskrelateret | Låsning, medial ledlinjeømhed | Begge skal matche |
| Ligamentskade | Traume, klinisk instabilitet | Begge skal matche |
| Septisk artrit | Feber, udtalt hævelse, svært nedsat bevægelighed | Alle 3 skal matche |
| Frakturmistanke | Traume, manglende belastningsevne | Begge skal matche |
| Inflammatorisk | Rødme, varmeøgning, moderat hævelse | Alle 3 skal matche |

Frakturmistanke vises derfor ikke ved manglende belastningsevne alene. Både eksplicit traume og manglende belastningsevne skal være registreret. Denne prototypepolitik er ikke klinisk valideret.

Et forslag vælges aldrig automatisk. Lægen skal aktivt vælge det, og lægen kan vælge enhver anden tilgængelig arbejdsdiagnose.

## Aktuelle planmuligheder

Lægen kan eksplicit vælge en eller flere handlinger:

- Information
- Øvelser
- Smertestillende
- Fysioterapi
- Røntgen
- Kontrol
- Ortopædkirurgisk henvisning

Safety-net kan eksplicit registreres for feber, tiltagende smerter og manglende belastningsevne. Intet plan- eller safety-net-valg er forudvalgt.

Pathwayen indeholder valgfrie planforslag for `oa`, `meniscus`, `pfps`, `ligament`, `overuse`, `tendinopathy`, `bursitis`, `septic`, `fracture` og `uncertain`. Forslaget vises efter valgt arbejdsdiagnose og anvendes kun efter et aktivt klik. Der er aktuelt ikke planforslag for `baker`, `inflammatory`, `referred` eller `nonspecific`.

Planforslagene er ikke klinisk valideret og mangler dokumenterede kilder.

## Dynamiske outputs

### PSOAP-journal

- Er altid synlig som et aktivt output.
- Samler kun tekst fra synlige felter med registrerede værdier.
- Grupperer indhold som P, S, O, A og P i fast rækkefølge.
- Ubesvarede felter bidrager ikke med tekst.

### Fysioterapihenvisning

Aktiveres kun, når `plan-actions` indeholder `physio`. Udkastet genbruger blandt andet side, debut, varighed, traume, belastning, udvalgte objektive fund, supplerende anamnese og arbejdsdiagnose.

### Røntgenhenvisning

Aktiveres kun, når `plan-actions` indeholder `xray`. Udkastet genbruger blandt andet side, varighed, traume, belastning, hævelse, bevægelighed, supplerende anamnese og arbejdsdiagnose.

### Ortopædkirurgisk henvisning

Aktiveres kun, når `plan-actions` indeholder `referral`. Udkastet samler side, historik, objektive fund, arbejdsdiagnose og valgte konservative tiltag.

Alle outputs er udkast. De kopieres til clipboard og skal kontrolleres af lægen før brug i klinikkens eksisterende EPJ. Cortex sender eller bestiller ikke noget.

Outputdefinitionerne angiver eksplicit en generator. PSOAP-generatoren er generisk, mens henvisningsgeneratorerne og deres knæspecifikke feltkoblinger ligger sammen med pathwayens kliniske implementering. Den generiske encounter engine vælger ikke output ud fra knæspecifikke felt-ID'er.

## Readiness og manglende oplysninger

Readiness er et teknisk komplethedssignal og ikke en klinisk godkendelse.

### Journal

Journalen markeres med mangler, hvis:

- problem, side og forløb ikke er beskrevet med side plus mindst én af debut, varighed eller supplerende anamnese;
- arbejdsdiagnose/vurdering er ubesvaret;
- outputtet er tomt, eller færre end tre svar indeholder registreret information.

Den eksplicit valgte værdi `uncertain` tæller aktuelt som en besvaret vurdering i journalens readiness-check.

### Røntgenhenvisning

Mangler rapporteres for side, varighed og ubesvaret eller `uncertain` arbejdsdiagnose.

### Fysioterapihenvisning

Mangler rapporteres for side, varighed, ubesvaret eller `uncertain` arbejdsdiagnose samt utilstrækkelige funktionsoplysninger. En normal belastningsevne uden supplerende funktionsbeskrivelse regnes aktuelt ikke som tilstrækkelig funktionsbeskrivelse.

### Ortopædkirurgisk henvisning

Mangler rapporteres for side, ubesvaret eller `uncertain` henvisningsårsag, manglende supplerende anamnese/funktionspåvirkning og manglende registrering af mindst ét af tiltagene øvelser, smertestillende eller fysioterapi.

## Sikkerhed og usikkerhed

- Cortex må aldrig opfinde eller udlede et ubesvaret klinisk faktum.
- Værdier som “nej”, “normal”, “ingen” og “højre” kræver eksplicit bekræftelse.
- Regler og henvisningskrav kræver dokumenteret kildegennemgang før klinisk evaluering.
- Alerts viser kun konfigurerede regelmatches og udelukker ikke andre alvorlige tilstande.
- Vurderingsforslag er sparring, ikke diagnoser eller sandsynligheder.
- Planforslag må ikke anvendes uden lægens aktive valg.
- Output-readiness må ikke fortolkes som klinisk komplethed eller korrekthed.
- Det kliniske ansvar og alle beslutninger forbliver hos lægen.

## Kendte prototypebegrænsninger

- Ingen regler, forslag, plananbefalinger eller henvisningskrav har dokumenterede evidenskilder i repository.
- Pathwayen er ikke gennemgået eller godkendt af navngivne kliniske reviewere.
- Ottawa-beskeden repræsenterer ikke en fuldt implementeret eller valideret Ottawa Knee Rule.
- Forslagenes konservative `requireAll`-politikker er ikke klinisk valideret eller testet for klinisk relevans og alarmtræthed.
- Ortopædkirurgisk anamnese samler kun den første history-sektion og medtager derfor ikke automatisk felter fra det separate traumespor.
- Automatiserede engine- og outputregressionstests kontrollerer teknisk adfærd, men udgør ikke klinisk validering.
- Readiness-kravene er prototypeheuristikker og ikke validerede dokumentationskrav.
- Der er ingen persistence, audit trail, brugeridentitet eller patientkontekst.
- Clipboard-kopiering er den eneste integration med klinikkens EPJ.
- UI viser ingen patientinformation, selv om dette indgår i den langsigtede MVP-definition.

## Evidens- og guidelinekrav

Før klinisk anvendelse skal følgende dokumenteres for hvert alert, forslag, planforslag og outputkrav:

- autoritativ kilde og direkte reference;
- version eller publiceringsdato;
- dato for lokal klinisk gennemgang;
- inklusions-, eksklusions- og anvendelseskriterier;
- begrænsninger og relevant safety-net;
- ansvarlig klinisk reviewer;
- plan for opdatering ved ændrede anbefalinger.

Der er aktuelt ingen tilstrækkelige evidensreferencer i repository. Dette er et uløst krav; der må ikke opfindes kilder.

## Regional anvendelighed

Henvisningskrav og visitationspraksis kan variere mellem danske regioner og modtagere. Pathwayen er ikke markeret med region, og outputs er ikke valideret mod aktuelle regionale krav. Region, modtager, kildeversion og gyldighed skal defineres før klinisk evaluering.

## Manuelle browser-accepttests

1. **Tom start:** Bekræft at ingen kliniske chips er valgt, journalen er tom, ingen henvisning er aktiv, og ingen regel eller forslag er udløst.
2. **Eksplicitte normalfund:** Vælg “nej”, “normal” eller “ingen” og bekræft, at teksten først vises efter valget og forsvinder efter nulstilling.
3. **Traumebetingelser:** Vælg traume = ja, udfyld traumesporet, skift til nej og bekræft, at afhængige svar fjernes fra UI, state og journal.
4. **Septisk alert:** Registrer feber, udtalt hævelse og svært nedsat bevægelighed; bekræft critical alert.
5. **Ottawa-påmindelse:** Registrer traume og manglende belastningsevne; bekræft warning uden automatisk valg af røntgen.
6. **Låsning:** Registrer låsning; bekræft info-alert.
7. **Forslag:** Bekræft at ét delmatch ikke viser et forslag, at alle konfigurerede fund viser det med “x af y støttende fund” uden procent, og at det aldrig vælges automatisk. Bekræft særskilt, at manglende belastningsevne uden traume ikke viser frakturmistanke.
8. **Planforslag:** Vælg en arbejdsdiagnose med planforslag; bekræft at planen først ændres efter aktiv anvendelse.
9. **Journal-readiness:** Test tom journal, side alene, side plus forløb og derefter eksplicit vurdering; bekræft de viste mangler.
10. **Dynamiske outputs:** Vælg og fjern fysioterapi, røntgen og ortopædkirurgisk henvisning; bekræft at de tilsvarende outputs vises og skjules.
11. **Ingen opdigtede fakta:** Aktivér hver henvisning med ubesvarede felter; bekræft at der ikke fremstår implicitte normal- eller negativfund.
12. **Clipboard:** Kopiér hvert aktivt output og bekræft, at det kopierede indhold svarer til det viste udkast.
13. **Nulstil:** Udfyld hele workflowet, nulstil og bekræft tom klinisk state, skjult traumespor og kun journaloutput.

## Krav før klinisk evaluering

- Mindst én navngiven praktiserende læge har gennemgået hvert felt, tekstoutput, alert, forslag og planforslag.
- Evidenskilder og regionale krav er dokumenteret, dateret og versionsstyret.
- Safety-critical kombinationer og relevante negative scenarier er testet reproducerbart.
- Læger kan skelne alerts, forslag, readiness og kliniske beslutninger uden tvivl.
- Journal- og henvisningsudkast er vurderet for klinisk korrekthed, relevans og risiko for fejltolkning.
- Kendte begrænsninger er enten afhjulpet eller accepteret skriftligt med passende anvendelsesgrænser.
- Evalueringens setting, ansvar, databeskyttelse og stopkriterier er godkendt.
- Pathwayens status ændres først efter dokumenteret klinisk sign-off.
