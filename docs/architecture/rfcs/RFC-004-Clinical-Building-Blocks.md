# RFC-004 — Kliniske byggesten

**Status:** Draft  
**Version:** 1.0  
**Type:** Produktarkitektur  
**Afhænger af:** `docs/vision/CX-001-The-Perfect-Consultation.md`, `docs/vision/WF-001-The-Consultation-Workflow.md` og `docs/product/proposals/WORKFLOW-FAMILIES.md`

---

# Resumé

Alle kliniske workflows i Cortex skal bygges ved at kombinere et begrænset antal genbrugelige kliniske byggesten.

En klinisk byggesten repræsenterer én afgrænset del af den kliniske konsultation.

Byggestenene er uafhængige af diagnoser, workflows og brugergrænseflade.

De beskriver *hvad* lægen arbejder med – ikke *hvordan* det vises på skærmen.

---

# Motivation

Praktiserende læger løser ikke problemer ved at udfylde formularer.

De arbejder med de samme kliniske elementer igen og igen.

Eksempel:

Ved knæsmerter vurderes blandt andet:

- smerter
- funktion
- traume
- palpation
- bevægelighed
- røde flag

Ved skuldersmerter vurderes:

- smerter
- funktion
- traume
- palpation
- bevægelighed
- røde flag

Selvom sygdommene er forskellige, er store dele af konsultationen de samme.

Cortex skal derfor genbruge de kliniske byggesten frem for at bygge nye formularer for hver problemstilling.

---

# Hvad er en klinisk byggesten?

En klinisk byggesten er den mindste meningsfulde kliniske enhed, som kan genbruges på tværs af workflows.

En byggesten beskriver ét klinisk emne.

Eksempler:

- Smerter
- Traume
- Funktion
- Feber
- Medicin
- Allergi
- Vitalparametre
- Palpation
- Bevægelighed
- Psykisk status
- Plan
- Safety-net

En byggesten er ikke en diagnose.

En byggesten er ikke et workflow.

En byggesten er ikke et UI-element.

---

# Hvad indeholder en byggesten?

En byggesten beskriver:

- dens kliniske formål
- hvilke oplysninger der typisk indsamles
- hvilke andre byggesten den relaterer til
- hvilke kliniske regler den kan aktivere
- hvilke outputs den kan påvirke

Byggestenen beskriver ikke:

- layout
- farver
- knapper
- React-komponenter
- database

---

# Eksempel

## Byggesten: Traume

Kan indeholde:

- Traume ja/nej
- Traumemekanisme
- Debut
- Belastningsevne
- Umiddelbar hævelse
- Neurovaskulære symptomer

Den samme byggesten kan anvendes ved:

- knæ
- ankel
- skulder
- håndled
- albue

Indholdet er det samme.

Kun konteksten ændrer sig.

---

# Sammensætning

Et workflow opstår ved at kombinere flere byggesten.

Eksempel:

Knæsmerter

=

- Problem
- Smerter
- Traume
- Funktion
- Palpation
- Bevægelighed
- Knæspecifikke tests
- Vurdering
- Plan

Hoste

=

- Problem
- Varighed
- Feber
- Dyspnø
- Brystsmerter
- Risikofaktorer
- Lungestatus
- Vurdering
- Plan

Byggestenene er genbrugelige.

Sammensætningen er forskellig.

---

# Designprincipper

En klinisk byggesten skal være:

- klinisk meningsfuld
- afgrænset
- genbrugelig
- uafhængig
- let at forstå
- let at teste
- let at udvide

En byggesten bør kun have ét klart ansvar.

---

# Byggesten er ikke brugergrænseflade

En byggesten kan vises på forskellige måder.

Eksempel:

Byggestenen "Smerter" kan vises som:

- et kort
- en sektion
- et sidepanel
- en kompakt visning

Det er stadig den samme byggesten.

Brugergrænsefladen må derfor aldrig definere den kliniske logik.

---

# Progressiv visning

En byggesten må ændre indhold afhængigt af den kliniske kontekst.

Eksempel:

Traume = Nej

↓

Traumemekanisme skjules.

Traume = Ja

↓

Traumemekanisme vises.

↓

Ottawa-regler bliver relevante.

↓

Yderligere spørgsmål vises.

Progressiv visning skal reducere støj.

Den må aldrig skjule vigtig patientsikkerhed.

---

# Bibliotek af byggesten

Over tid skal Cortex opbygge et fælles bibliotek af kliniske byggesten.

Eksempler:

Historie

- Debut
- Varighed
- Lokalisation
- Karakter
- Ledsagesymptomer

Objektivt

- Inspektion
- Funktion
- Palpation
- Bevægelighed
- Vitalparametre

Plan

- Behandling
- Kontrol
- Henvisning
- Patientinformation
- Safety-net

Alle nye workflows skal så vidt muligt genbruge eksisterende byggesten.

---

# Ikke omfattet

Denne RFC beskriver ikke:

- Workflowfamilier
- Informationsmodellen
- Clinical Composer
- Encounter Engine
- Output Engine
- React-komponenter
- Databasestruktur

Disse beskrives i senere RFC'er.

---

# Acceptkriterier

RFC-004 er opfyldt når:

- Alle workflows kan beskrives som en kombination af byggesten.
- Byggesten kan genbruges på tværs af workflows.
- Byggesten er uafhængige af brugergrænsefladen.
- Hver byggesten har ét klart klinisk formål.
- Nye workflows kan bygges ved at kombinere eksisterende byggesten og få nye, når det er klinisk nødvendigt.

---

# Afsluttende princip

> Cortex bygges af genbrugelige kliniske byggesten – ikke af formularer.
