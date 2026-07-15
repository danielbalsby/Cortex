Archived: 2026-07-15  
Status: Read-only historical record  
Reason: The prototype blueprint is obsolete and no longer matches the current knee workflow.  
Replacement: None; a current clinical pathway specification is pending.

---

# CB-001 — Knæsmerter

**Version:** 1.0  
**Status:** Draft  
**Workflowfamilie:** Muskuloskeletale konsultationer  
**Tilknyttet PRD:** PRD-001 – Knæsmerter

---

# 1. Formål

Dette Consultation Blueprint beskriver den ønskede brugeroplevelse for knækonsultationen i Cortex.

Dokumentet beskriver, hvordan konsultationen skal opleves af lægen, og hvordan Cortex skal understøtte den kliniske arbejdsgang.

Blueprintet beskriver ikke implementering, UI-design eller kliniske retningslinjer.

Ansvarsfordeling:

- RFC beskriver systemarkitekturen.
- PRD beskriver den kliniske funktionalitet.
- CB beskriver brugeroplevelsen.
- UX beskriver skærmene.
- Koden implementerer løsningen.

Målet er at reducere den administrative og mentale belastning under konsultationen, så lægen kan fokusere på patienten.

---

# 2. Brugeroplevelse

Knækonsultationen skal opleves som:

- rolig
- naturlig
- intuitiv
- hurtig
- uden unødige afbrydelser

Lægen skal opleve, at Cortex arbejder i baggrunden.

Systemet skal aldrig styre konsultationen.

Systemet skal understøtte lægens kliniske ræsonnering.

Journal, patientinformation og eventuelle henvisninger skal opstå som et naturligt resultat af konsultationen.

---

# 3. Succeskriterier

Workflowet er vellykket når:

- Journalen er færdig ved konsultationens afslutning.
- Patientinformationen er færdig ved konsultationens afslutning.
- Eventuel henvisning kræver minimal efterredigering.
- Lægen oplever færre kontekstskift end i et traditionelt EPJ-system.
- Ingen popup-vinduer afbryder konsultationen.
- Ingen obligatorisk fritekst kræves før vurderingsfasen.
- Dokumentationen opdateres løbende.
- Arbejdsgangen opleves hurtigere og mere intuitiv end eksisterende EPJ-systemer.

---

# 4. Konsultationsflow

| Fase | Lægen | Cortex |
|------|-------|---------|
| Fri fortælling | Lytter til patienten | Ingen forslag eller afbrydelser |
| Afklaring | Registrerer nøgleoplysninger | Viser relevante spørgsmål |
| Objektiv undersøgelse | Registrerer fund | Opdaterer journal og cockpit |
| Vurdering | Foretager klinisk vurdering | Opdaterer journal og relevante outputs |
| Plan | Aftaler behandling og opfølgning | Færdiggør dokumentationen |

Grundregel:

Cortex følger lægen.

Lægen følger aldrig Cortex.

---

# 5. Dynamisk adfærd

Information vises først, når den bliver klinisk relevant.

Eksempler:

| Situation | Cortex |
|-----------|---------|
| Traume = Ja | Vis traumemekanisme |
| Traume = Nej | Skjul traumefelter |
| Positiv Thessaly | Vis meniskrelaterede spørgsmål |
| Ingen traume | Ottawa Knee Rules vises ikke |
| Mistanke om alvorlig patologi | Vis relevante røde flag |

Grundregel:

Information følger klinisk ræsonnering.

---

# 6. Cockpit

Cockpittet er konstant synligt under konsultationen.

Cockpittet giver et hurtigt overblik over:

- Journalstatus
- Patientinformation
- Henvisning
- Manglende oplysninger
- Røde flag

Cockpittet må aldrig dominere brugerfladen.

Formålet er overblik – ikke kontrol.

---

# 7. Live outputs

Journal, patientinformation og henvisning opdateres løbende.

Der findes ingen "Generér"-knap.

Dokumentationen skal vokse i takt med konsultationen.

Når konsultationen afsluttes, skal dokumentationen være klar til brug.

---

# 8. Prototype Scope (v0.1)

Prototype 0.1 omfatter kun følgende registreringer:

- Debut
- Traume
- Lokalisation
- Hævelse
- Belastning
- Bevægeudslag (ROM)
- Palpation
- Thessaly-test

Prototype 0.1 omfatter ikke:

- AI
- Talegenkendelse
- EPJ-integration
- FMK
- CPR
- Booking
- Laboratorier
- Avanceret beslutningsstøtte
- Automatisk kodning

Formålet er udelukkende at validere arbejdsgangen.

---

# 9. Acceptkriterier

CB-001 betragtes som succesfuldt når:

- En praktiserende læge kan gennemføre workflowet uden instruktion.
- Journalen kræver minimal efterredigering.
- Patientinformationen kan udleveres direkte efter konsultationen.
- Testpersoner oplever mindre administrativ belastning end i deres nuværende EPJ.
- Workflowet vurderes som naturligt og understøttende frem for styrende.

---

# Dokumentansvar

Dette dokument beskriver udelukkende brugeroplevelsen.

Det må ikke indeholde:

- implementeringsdetaljer
- React-komponenter
- TypeScript
- databaser
- AI-arkitektur
- kliniske retningslinjer

Disse beskrives i henholdsvis RFC, PRD og kildekoden.
