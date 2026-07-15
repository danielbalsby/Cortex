Archived: 2026-07-15  
Status: Read-only historical record  
Reason: Superseded by current UX and clinical workspace guidance.  
Replacement: `docs/design/UX-GUIDELINES.md` and `docs/design/CLINICAL-WORKSPACE.md`

---

# RFC-005 — Den kliniske arbejdsflade og opmærksomhedsarkitektur

**Status:** Draft  

**Version:** 1.0  

**Type:** Produktdesign og UX-arkitektur  

**Afhænger af:** RFC-001, RFC-002, RFC-003 og RFC-004

---

# Resumé

Cortex skal være den mest rolige, intuitive og klinisk fokuserede arbejdsflade i almen praksis.

Arbejdsfladen skal understøtte lægens kliniske ræsonnering uden selv at blive centrum for opmærksomheden.

Lægens opmærksomhed er en begrænset ressource.

Cortex skal beskytte den.

---

# Formål

Den kliniske arbejdsflade skal:

- reducere kognitiv belastning

- reducere antallet af klik

- reducere antallet af beslutninger, som ikke handler om patienten

- skabe konstant overblik

- understøtte klinisk ræsonnering

- gøre dokumentation til en naturlig konsekvens af konsultationen

Software må aldrig konkurrere med patienten om lægens opmærksomhed.

---

# Grundprincip

> **Patienten er centrum. Cortex er assistenten.**

Lægen skal opleve, at systemet arbejder i baggrunden.

Når konsultationen afsluttes, skal journal, henvisninger og øvrige outputs allerede være klar.

---

# Attention Architecture

Cortex bygger på princippet om **Attention Architecture**.

Det betyder, at arbejdsfladen aktivt prioriterer lægens opmærksomhed.

Systemet skal hjælpe lægen med at fokusere på det vigtigste på det rigtige tidspunkt.

Attention Architecture bygger på fire principper.

## 1. Vis kun det relevante

Kun information med aktuel klinisk relevans skal være synlig.

Irrelevante felter må ikke skabe støj.

---

## 2. Vis information på det rigtige tidspunkt

Information skal introduceres gradvist.

Eksempel:

Traume = Nej

→ Traumemekanisme skjules.

Traume = Ja

→ Traumemekanisme vises.

→ Ottawa-regler bliver relevante.

→ Specialtests foreslås.

---

## 3. Skab visuelt hierarki

Ikke alle oplysninger er lige vigtige.

Arbejdsfladen skal tydeligt signalere prioritet.

### Niveau 1

Altid synligt.

Eksempler:

- patient

- hovedproblem

- røde flag

- vurdering

- plan

### Niveau 2

Relevante kliniske oplysninger.

### Niveau 3

Supplerende oplysninger.

### Niveau 4

Sjældent nødvendige detaljer.

Lægen skal intuitivt kunne se, hvor opmærksomheden bør være.

---

## 4. Reducér mental støj

Alt unødvendigt fjernes.

Arbejdsoverfladen skal føles rolig.

---

# Calm Software

Cortex følger princippet om **Calm Software**.

Software skal tale sjældent.

Men tydeligt.

Systemet må aldrig:

- vise unødvendige advarsler

- bruge farver uden klinisk betydning

- afbryde konsultationen uden tungtvejende grund

- skabe alarmtræthed

Når Cortex siger noget, skal lægen stole på, at det er vigtigt.

---

# Den kliniske arbejdsflade

Arbejdsfladen består af tre logiske områder.

## Konsultationsområdet

Her foregår den kliniske konsultation.

Dette område ændrer sig afhængigt af workflowet.

Det skal altid være arbejdsfladens primære fokus.

---

## Konsultationscockpit

Cockpittet er Cortex' faste informationspanel.

Det giver konstant overblik over konsultationens status.

Cockpittet kan blandt andet vise:

- journalstatus

- aktive røde flag

- klinisk kvalitet

- manglende kritiske oplysninger

- plan

- safety-net

- henvisninger

- patientinformation

- kopiér-status

Cockpittet skal kunne aflæses på få sekunder.

Det skal aldrig dominere konsultationen.

---

## Global navigation

Navigationen skal være stabil.

Lægen skal altid vide:

- hvor vedkommende er

- hvad næste handling er

- hvordan man kommer tilbage

Navigation må aldrig kræve mental oversættelse.

---

# Arbejdslovene

Alle dele af Cortex skal følge disse love.

## Lov 1

Patienten har altid førsteprioritet.

---

## Lov 2

Software må aldrig konkurrere om lægens opmærksomhed.

---

## Lov 3

Systemet viser kun det relevante.

---

## Lov 4

Information introduceres gradvist.

---

## Lov 5

Systemet arbejder mere end brugeren.

Lægen skal træffe kliniske beslutninger.

Cortex skal udføre administrative opgaver.

---

## Lov 6

Ét klinisk faktum registreres én gang.

Information genbruges automatisk.

---

## Lov 7

Beslutningsstøtte skal være forklarlig.

Alle anbefalinger skal kunne begrundes.

---

## Lov 8

Cockpittet giver konstant overblik.

Lægen skal altid kunne se konsultationens aktuelle status.

---

## Lov 9

Lægen bestemmer.

Cortex foreslår.

Lægen beslutter.

---

## Lov 10

Arbejdsfladen skal føles rolig.

Når noget virker komplekst, er det Cortex' ansvar.

Ikke lægens.

---

# Live Workspace

Arbejdsfladen er levende.

Når lægen registrerer ny information, opdateres automatisk:

- journal

- vurdering

- plan

- henvisninger

- patientinformation

- kvalitetstjek

- beslutningsstøtte

Der findes ingen:

- "Gem"

- "Opdater"

- "Generér journal"

Systemet arbejder kontinuerligt.

---

# Dokumentation er en konsekvens

Lægen skriver ikke journal.

Lægen gennemfører en konsultation.

Journalen er et resultat.

Dette princip gælder tilsvarende for:

- henvisninger

- attester

- patientinformation

- kontrolplaner

---

# Hvad Cortex aldrig må blive

Cortex må aldrig opleves som:

- et spørgeskema

- en formular

- en database

- en checkliste

- et traditionelt journalsystem

Lægen skal opleve en konsultation.

Ikke en dataregistrering.

---

# Succeskriterium

Den kliniske arbejdsflade er vellykket, når lægen oplever:

- ro

- overblik

- få klik

- høj patientsikkerhed

- minimal dokumentationsbyrde

Den største succes er, når lægen næsten glemmer, at der er software mellem lægen og patienten.

---

# Acceptkriterier

RFC-005 er opfyldt når:

- Arbejdsfladen reducerer kognitiv belastning.

- Attention Architecture anvendes konsekvent.

- Calm Software-principperne overholdes.

- Cockpittet giver konstant overblik.

- Dokumentation opdateres løbende.

- Beslutningsstøtte er diskret og forklarlig.

- Lægen bevarer fuld kontrol.

- Samme arbejdsflade fungerer på tværs af alle workflowfamilier.

# Afsluttende princip

> **Den bedste kliniske software er den software, lægen næsten ikke bemærker. Den frigør opmærksomhed til patienten, fordi den overtager alt det, der ikke kræver klinisk dømmekraft.**
