# Sprint 0 AI Scenario Provenance v1.0

**Research Assignment:** RA-002  
**Kontroldato:** 2026-07-22  
**Status:** Genfundet eksekveringsspor; **ikke admissible som Research-evidens endnu**

## 1. Recovery-resultat

Research har genfundet de fem tidligere eksterne browser-agentkørsler i Codex-tasken `Cortex – Build` (`thread 019f667b-589f-72e1-92fd-e4f7868c9b1d`) og i `docs/build/SPRINT-0-IMPLEMENTATION-REPORT-v0.1.md`.

Build dokumenterede samtidig, at der ikke fandtes en repository-resident evaluator, prompt-harness, modelkonfiguration eller genkørbar agent-runner. Kørselssporene stammer fra ekstern in-app browser control og er ikke CI-kørsler.

## 2. Fælles provenance

| Felt | Genfundet værdi |
|---|---|
| Kørselsdato | 2026-07-22 |
| Eksekverende task | `Cortex – Build`, thread `019f667b-589f-72e1-92fd-e4f7868c9b1d` |
| Agent-/modelidentifikation | **Ikke bevaret i tilgængeligt spor** |
| Browserværktøj | Ekstern Codex in-app browser control via Playwright-semantik |
| Prototype-route | `http://127.0.0.1:3100/prototype/sprint-0` |
| Branch | `prototype/sprint-0` |
| Prototype-commit | `1b1b0bdcac3b578016fa7e13417327f338c976df` |
| Data | Fast syntetisk knæcase |
| AI i prototypen | Deterministisk lokal mock-provider; ingen live-model |
| Rapportkilde | `docs/build/SPRINT-0-IMPLEMENTATION-REPORT-v0.1.md` |
| Råsporskilde | Tool calls og outputs i Build-tasken |

Da agent-/modelidentifikation mangler, opfylder de genfundne kørsler ikke RA-002’s fulde provenancekrav. De må ikke indgå i finding-tællinger eller sammenlignes som admissible agent-evidens. De kan bruges til at designe nye, tydeligt mærkede scenarier.

## 3. Genfundne scenarier

### Legacy-AS-01 — Happy path

**Faktisk opgave/handlinger:** Åbn ny konsultation; registrér kendte caseoplysninger; indtast arbejdshypotesen “Mistanke om medial meniskskade, fortsat usikker”; registrér vurdering; vælg billeddiagnostik; forbered billeddiagnostisk henvisningsudkast; markér journalen gennemgået; godkend til kopiering; kopiér.

**Resultatspor:** Første forsøg på samlet udkastshåndtering fejlede i browserautomationen; kørsel fortsatte ved kontrol af disabled-state og fuldførte review, approval og copy. Session report blev aflæst efter afslutning.

**Struktureret legacy-finding:** Patient-, konsultations- og udkaststrin kunne identificeres. Review, approval og copy var separate. Sporet viste ikke, at agenten tillagde AI beslutningsautoritet.

### Legacy-AS-02 — Manglende konsultationsoplysninger

**Faktisk opgave/handlinger:** Genindlæs starttilstanden; aktivér “Generér mock-resumé”; aflæs AI Summary-regionen uden først at åbne og udfylde konsultationen.

**Resultatspor:** AI-regionens tekst blev indsamlet.

**Struktureret legacy-finding:** Manglende/uklare oplysninger blev vist; Build-rapporten angiver instabilitet, vægtbæring og objektiv undersøgelse som uafklarede. Ingen ukendt værdi blev rapporteret som normal/negativ.

### Legacy-AS-03 — Uenighed med AI-resumé

**Faktisk opgave/handlinger:** Afvis mock-resumé; åbn konsultation; indtast “Kliniker er uenig; ingen arbejdshypotese kan fastlægges endnu”; registrér vurdering; aflæs AI Summary og Klinikerens vurdering.

**Resultatspor:** AI-resumé blev afvist; klinikervurdering blev registreret særskilt; patientkontekst forblev tilgængelig.

**Struktureret legacy-finding:** Afvisning ændrede ikke kildedata og skabte ikke automatisk en klinisk beslutning.

### Legacy-AS-04 — Rettelse af journaludkast

**Faktisk opgave/handlinger:** Genindlæs; åbn konsultation; registrér kendte caseoplysninger; tilføj “Klinikerens præcisering: undersøgelsen er endnu ikke gennemført.” til journaludkastet; vælg “Intet identificeret traume”; kontrollér om redigeringen er bevaret; afvis udkast; kontrollér konsultationstilstand og DOM.

**Resultatspor:** Programmatisk resultat angav bevaret præcisering, afvist draft-status og fortsat synlig konsultation. En efterfølgende isoleret DOM-kontrol fejlede, hvorefter hele DOM-snapshot blev indsamlet.

**Struktureret legacy-finding:** Manuel journaltekst blev bevaret efter konsultationsopdatering; afvisning slettede ikke konsultationsfakta.

### Legacy-AS-05 — Manuel recovery efter AI-fejl

**Faktisk opgave/handlinger:** Genindlæs; aktivér “Simulér AI-fejl”; aflæs AI Summary; aktivér “Fortsæt manuelt”; aflæs Session report.

**Resultatspor:** Fejlmeddelelse og manuel fortsættelseshandling var tilgængelige; session report registrerede recovery.

**Struktureret legacy-finding:** Kørsel nåede manuelt flow uden dead end eller tvungen AI-afhængighed.

## 4. Evidensgrænser

De genfundne kørsler kan ikke dokumentere:

- hvordan læger bruger eller forstår prototypen;
- klinisk korrekthed, sikkerhed eller effekt;
- kognitiv belastning eller tillid;
- at fravær af en observeret fejl er fravær af problemet;
- reproducerbar agentadfærd på tværs af modeller eller prompts;
- de tidligere kørsler som gyldige `AS-01`–`AS-05`, før agent-/modelidentifikation er dokumenteret.

Build-rapportens samlede formulering “ingen ... blev observeret” behandles som en afgrænset legacy-observation fra én eksekveringsrunde, ikke som validering.

## 5. Næste provenance-gate

Forsøg først at hente agent-/modelidentifikation fra task-/runtime-metadata. Hvis det ikke er muligt, bevar ovenstående som `Legacy-AS-01`–`Legacy-AS-05` og opret fem **nye** kørsler, eksempelvis `NEW-AS-01`–`NEW-AS-05`.

Hver ny kørsel skal før analyse indeholde:

- fuld faktisk prompt/opgave;
- agent- og modelidentifikation;
- kørselsdato og tidspunkt;
- prototypeversion og commit-SHA;
- starttilstand;
- kronologisk resultatspor, inklusive fejl;
- strukturerede observationer adskilt fra fortolkning;
- markering af, at kørslen er ny og ikke en rekonstruktion af tidligere test.

Nye agentkørsler holdes analytisk adskilt fra mennesketest og rapporteres i eget afsnit.
