Archived: 2026-07-15  
Status: Read-only historical record  
Reason: Clinical philosophy is now defined by the canonical vision and workflow documents.  
Replacement: `docs/vision/CX-001-The-Perfect-Consultation.md` and `docs/vision/WF-001-The-Consultation-Workflow.md`

---

# RFC-001 — Konsultationsmodellen

**Status:** Draft  
**Version:** 1.0  
**Type:** Fundamentalt designprincip  
**Ejere:** Cortex

---

# Resumé

Cortex bygger på én grundlæggende overbevisning:

> **En konsultation er en klinisk beslutningsproces – ikke en dokumentationsopgave.**

Journalen er vigtig.

Henvisninger er vigtige.

Patientinformation er vigtig.

Men ingen af disse er konsultationens egentlige formål.

Konsultationens formål er at hjælpe en patient gennem en struktureret klinisk beslutningsproces, der fører til en sikker, velbegrundet og forståelig plan.

Cortex skal derfor bygges omkring konsultationen.

Ikke omkring dokumentationen.

---

# Motivation

De fleste journalsystemer er designet med dokumentation som udgangspunkt.

Lægen udfører en konsultation.

Derefter dokumenteres konsultationen.

Dette skaber en kunstig adskillelse mellem det kliniske arbejde og den administrative opgave.

Konsekvensen er:

- dobbeltarbejde
- mange klik
- høj kognitiv belastning
- dokumentation frem for patientkontakt

Cortex vender denne tankegang om.

Lægen gennemfører én struktureret konsultation.

Dokumentationen bliver en automatisk konsekvens.

---

# Konsultationens formål

Alle konsultationer forsøger grundlæggende at besvare fem spørgsmål.

## 1.

Hvad er patientens problem?

## 2.

Er der tegn på alvorlig eller tidskritisk sygdom?

## 3.

Hvad er den mest sandsynlige kliniske forklaring?

## 4.

Hvad er den bedste plan lige nu?

## 5.

Hvordan sikres et trygt videre forløb?

Disse spørgsmål gælder uanset om patienten kommer med:

- hoste
- knæsmerter
- depression
- diabetes
- hududslæt

Det kliniske indhold ændrer sig.

Den kliniske proces gør ikke.

---

# Hvordan læger tænker

Klinik er hypotesedrevet.

Lægen indsamler ikke oplysninger for informationens skyld.

Hvert spørgsmål har et formål.

Hvert objektivt fund ændrer sandsynligheder.

Hvert svar påvirker den videre retning.

En konsultation er derfor ikke en formular.

Den er en dynamisk beslutningsproces.

Cortex skal understøtte denne proces.

Ikke erstatte den.

---

# Konsultationen er ikke lineær

En erfaren praktiserende læge arbejder sjældent i en fast rækkefølge.

Ny information ændrer løbende den kliniske retning.

Lægen kan:

- vende tilbage til anamnesen
- undersøge tidligere end planlagt
- ændre hypotese
- ændre plan
- opdage nye problemstillinger

Derfor må Cortex aldrig fungere som en tvungen wizard.

Navigation skal være fri.

Systemet skal tilpasse sig konsultationen.

Ikke omvendt.

---

# Workflowfamilier

Selvom sygdommene er forskellige, ligner mange konsultationer hinanden.

Cortex organiserer derfor kliniske problemstillinger i workflowfamilier.

Eksempler:

- Akutte symptomer
- Akutte infektioner
- Muskuloskeletale problemstillinger
- Kroniske sygdomme
- Psykiatri
- Hud
- Børn og unge
- Gynækologi
- Urologi
- Kliniske procedurer
- Attester og administration

Alle workflows inden for samme familie skal opleves ens.

Det reducerer den mentale belastning og gør Cortex let at lære.

---

# Den fælles konsultationsskal

Alle workflows bygger på den samme struktur.

```text
Historie

↓

Objektivt

↓

Vurdering

↓

Plan

↓

Klinisk kvalitetstjek

↓

Outputs
```

Denne struktur ændrer sig ikke.

Det kliniske indhold gør.

---

# Ét klinisk faktum registreres én gang

Et klinisk fund må aldrig dokumenteres flere steder.

Når et fund registreres, skal Cortex kunne genbruge det til:

- journal
- henvisninger
- patientinformation
- attester
- kontrolplaner

Lægen skal aldrig skrive det samme to gange.

---

# Klinisk relevans frem for komplethed

Målet er ikke at producere mest mulig tekst.

Målet er at dokumentere det, der har klinisk betydning.

Som udgangspunkt prioriteres:

- positive fund
- afvigende fund
- klinisk relevante negative fund
- vurdering
- plan

Rutinemæssige normale fund skal som udgangspunkt udelades.

Kortere dokumentation kan være bedre dokumentation.

---

# Patientsikkerhed er integreret

Patientsikkerhed er ikke et separat modul.

Den skal være til stede gennem hele konsultationen.

Cortex skal kunne:

- identificere røde flag
- minde om relevante beslutningsregler
- gøre opmærksom på manglende kritiske oplysninger

Systemet skal støtte lægen.

Ikke overtage lægens ansvar.

---

# AI's rolle

AI er et hjælpeværktøj.

Ikke fundamentet.

Platformen skal fungere uden AI.

AI kan:

- forbedre formuleringer
- opsummere
- foreslå forbedringer
- identificere mulig manglende information

AI må aldrig være eneste mekanisme bag:

- patientsikkerhed
- røde flag
- kliniske regler
- obligatoriske henvisningsoplysninger

Deterministiske regler kommer altid først.

---

# Designprincipper

Alle workflows skal følge de samme principper.

- Samme brugeroplevelse.
- Samme navigation.
- Samme konsultationsstruktur.
- Ingen tvungen rækkefølge.
- Ingen popup-baserede arbejdsgange.
- Live opdatering af outputs.
- Ét klinisk faktum registreres én gang.
- Klinisk kvalitetstjek før afslutning.

---

# Konsekvenser

Denne model betyder, at Cortex ikke udvikles som en samling formularer.

Platformen består af:

- én fælles konsultationsmodel
- flere workflowfamilier
- genbrugelige komponenter
- én fælles dokumentationsmotor

Nye kliniske workflows skal som udgangspunkt genbruge platformen.

Ikke opfinde deres egen.

---

# Ikke omfattet af denne RFC

Denne RFC beskriver ikke:

- teknisk implementering
- React-komponenter
- datamodeller
- AI-arkitektur
- outputmotor
- kliniske regler for specifikke sygdomme

Disse beskrives i senere RFC'er.

---

# Acceptkriterier

RFC-001 er opfyldt, når Cortex bygger på følgende principper:

- Konsultationen er centrum for platformen.
- Dokumentation er et resultat af konsultationen.
- Alle workflows deler samme grundlæggende struktur.
- Workflowfamilier giver ensartede brugeroplevelser.
- Ét klinisk faktum registreres én gang.
- Outputs genereres automatisk.
- Patientsikkerhed er integreret.
- AI er understøttende – aldrig styrende.
- Lægen bevarer altid kontrollen.

---

# Afsluttende princip

> **Cortex skal understøtte den måde, praktiserende læger tænker på – ikke tvinge dem til at tænke som et journalsystem.**
