# Sprint 0 Test Script v1.0

**Session:** 30–45 min.  
**Case:** Kun syntetiske data  
**Regel:** Læs opgaver ordret. Tekst i `[klammer]` er facilitatorinstruktion og læses ikke højt.

## 1. Før deltageren ankommer

- [ ] Prototypeversion og starttilstand verificeret
- [ ] Syntetisk knæcase indlæst
- [ ] Instrumentering kontrolleret
- [ ] Degraderet AI-flow kan udløses på den aftalte måde
- [ ] Deltager-ID og observationsark klar
- [ ] Skærm-/lydoptagelse er slået fra, indtil samtykke er givet

## 2. Introduktion — 3 min.

> Tak fordi du deltager. Vi undersøger prototypen, ikke dig. Der findes ikke én rigtig vej gennem opgaverne. Casen og alle data er syntetiske; brug ikke oplysninger om virkelige patienter. Jeg vil ikke forklare brugerfladen undervejs, men jeg kan gentage en opgave. Sig gerne højt, hvad du leder efter, forventer og bliver i tvivl om. Du kan stoppe når som helst.

> Må vi tage skærm- og lydoptagelse til researchanalyse?

[Registrér ja/nej. Start kun godkendt optagelse.]

## 3. Kort baggrund — 2 min.

1. “Hvilken erfaring har du fra almen praksis?”
2. “Hvilken erfaring har du med digitale værktøjer, der genererer eller foreslår klinisk tekst?”

[Spørg ikke til holdning eller tilfredshed endnu.]

## 4. Opgaver

### Opgave 1 — Orientér dig i patientoverblikket

> Forestil dig, at patienten er mødt til konsultation. Orientér dig i patientens situation, som du normalt ville gøre. Fortæl, når du mener, du har nok overblik til at fortsætte.

[Observer: første handling, informationsrækkefølge, oversete oplysninger, scrolling, tilbage-navigation, tøven, samt hvad “nok overblik” betyder. Bed ikke deltageren finde bestemte felter.]

Efter opgaven:

- “Hvilke oplysninger lagde du mest vægt på?”
- “Var der noget, du forventede at finde, men ikke fandt?”

### Opgave 2 — Vurdér AI-resuméet

> Undersøg muligheden for at få et resumé, og brug det på den måde, der giver mening for dig. Fortæl, når du er klar til at fortsætte.

[Observer: om resuméfunktionen findes og aktiveres; om resuméet læses, kontrolleres mod kilden, accepteres, afvises eller ændrer deltagerens fokus. Forklar ikke hvordan funktionen aktiveres, eller at resuméet er et forslag.]

Efter opgaven:

- “Hvad opfattede du, at resuméets rolle var?”
- “Hvad, hvis noget, ville du kontrollere?”

### Opgave 3 — Gennemfør konsultationsflowet

> Gennemfør konsultationen i prototypen ud fra den syntetiske case. Stop, når du mener, konsultationsdelen er færdig.

[Observer: valg og rækkefølge, navigation, fejl, manglende information, tøven, hjælp, sikker/usikker afslutning. Giv ikke kliniske råd.]

Efter opgaven:

- “Hvad fik dig til at vurdere, at du var færdig?”
- “Hvad var du eventuelt i tvivl om undervejs?”

### Opgave 4 — Arbejd med journaludkastet

> Gennemgå journaludkastet, og gør det klar på den måde, du ville kræve, før du kunne stå inde for teksten. Fortæl, når du er færdig.

[Observer: om redigering findes, hvad der kontrolleres, konkrete ændringer, ukritisk accept, forståelse af status og ansvar. Gem original og sluttilstand hvis instrumenteringen tillader det.]

Efter opgaven:

- “Hvad kontrollerede du i udkastet?”
- “Hvad betyder den viste status for dig?”

### Opgave 5 — Vurdér henvisningsudkast

> Gennemgå de tilgængelige henvisningsudkast. Vurdér hvert udkast, og håndtér dem, som du finder fagligt og praktisk passende i denne syntetiske case.

[Observer begge udkast: billeddiagnostik og fysioterapi. Registrér adgang, informationskontrol, redigering/afvisning/approval og begrundelse. Deltagerens kliniske valg bedømmes ikke som facit i usability-testen.]

Efter opgaven:

- “Hvordan besluttede du, hvad der skulle ske med hvert udkast?”
- “Hvad opfatter du, at en approval betyder her?”

### Opgave 6 — Håndtér degraderet AI-flow

[Sæt prototypen i den aftalte reproducerbare fejltilstand uden at forklare fejlen.]

> Fortsæt arbejdet fra denne tilstand, som du ville gøre i praksis. Fortæl, når du enten er kommet videre eller ikke mener, du kan komme videre.

[Observer: opdages fejlen, fortolkning, gentagelser, alternative handlinger, recoverytid, stop, ansvar og tillid. Stop efter 5 minutter eller ved tydelig afslutning.]

Efter opgaven:

- “Hvad opfattede du, at der skete?”
- “Hvilke muligheder oplevede du, at du havde?”
- “Hvilket arbejde ville du være villig til at fortsætte med i denne tilstand?”

## 5. Semistruktureret interview — 6–8 min.

Brug spørgsmålene neutralt; følg op med “Kan du fortælle mere?” eller “Hvad skete der, som fik dig til at tænke det?”

1. “Hvordan oplevede du fordelingen af arbejde mellem dig og systemet?”
2. “Hvornår, hvis overhovedet, var det uklart, hvem der havde ansvaret for indhold eller handlinger?”
3. “Hvilke dele krævede mest opmærksomhed eller mental indsats?”
4. “Hvornår følte du dig mest og mindst sikker på din egen vurdering?”
5. “Hvordan ændrede systemets forslag eller fejl din tillid undervejs?”
6. “Var der information, du manglede for at kunne vurdere det viste?”
7. “Hvad overraskede dig?”
8. “Er der noget vigtigt ved din arbejdsgang, som testen ikke gav mulighed for at vise?”

Undgå spørgsmål som “Var AI-resuméet tydeligt?”, “Kunne du lide…?” og “Ville det være bedre, hvis…?”.

## 6. Afrunding — 1 min.

> Tak. Det, du har vist og fortalt, bruges til at identificere usikkerheder og læring. Vi vurderer ikke din kliniske præstation, og testen dokumenterer ikke klinisk effekt.

[Stop optagelse. Kontrollér at noter er gemt under deltager-ID.]

## 7. Tilladte facilitatorprompts

Brug i denne rækkefølge og registrér prompten ordret:

1. “Hvad tænker du lige nu?”
2. “Hvad ville du gøre, hvis jeg ikke var her?”
3. “Jeg kan gentage opgaven.” [Gentag ordret.]
4. “Prøv den mulighed, der virker mest sandsynlig for dig.”

Giv kun procedurehjælp, hvis deltageren ellers ikke kan fortsætte, og markér opgaven “gennemført med hjælp”. Forklar aldrig UI eller forsvar prototypen under observationen.

## 8. Stopregler

Stop eller spring en opgave over hvis:

- deltageren ønsker det;
- virkelige patientdata risikerer at blive indtastet eller vist;
- teknisk fejl gør opgaven umulig og ikke er det planlagte AI-fejlflow;
- opgaven har stået stille i 5 minutter efter neutrale prompts.

Registrér årsag, tidspunkt og sidste observerede handling. Klassificér ikke en teknisk afbrydelse som usability-fejl uden særskilt evidens.
