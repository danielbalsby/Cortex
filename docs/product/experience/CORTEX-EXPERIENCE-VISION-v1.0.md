# Cortex Experience Vision v1.0

## Document control

| Felt | Værdi |
|---|---|
| Dokument-ID | PEV-001 |
| Version | 1.0 |
| Status | DRAFT |
| Administrativ markering | Non-active working artifact pending GI-018 resolution |
| Statusnote | Markeringen er administrativ og ikke en ny lifecycle-status. |
| Dato | 2026-07-21 |
| Product owner | TODO — navngiven ejer |
| Godkendende organ | TODO — kompetent Product-/Governance-organ |
| Beslutningsrecord | [PDR-006](../decisions/PDR-006-experience-vision-v1.0.md) |
| Architecture review-input | [PEV-001-H01](../handoffs/ARCHITECTURE-REVIEW-INPUT-EXPERIENCE-VISION-v1.0.md) — prepared, not submitted |
| Domain sourcehash | `26bec902aa8e19ede9db0edac6f88b434b060247c98de9cc11d4bbe422a39d57` |

## Classification model

| Klassifikation | Betydning i dette dokument |
|---|---|
| Normativt dokumenteret | Direkte upstreamkrav med kildens faktiske lifecycle-kvalifikation. |
| Arkitektonisk dokumenteret | Constraint eller arbejdsmodel fra non-active Architecture; ikke implementationautorisation. |
| Product-besluttet | Product-retning eller krav registreret gennem PDR/PEV-001. |
| Product-hypotese | Testbar antagelse uden tilstrækkelig brugerresearch. |
| Kandidat | Mulig senere retning, som kræver review/beslutning. |
| Uafklaret | Manglende evidens, term, owner, threshold eller authority. |

## 1. Formål og mandat

PEV-001 styrer:

- den ønskede oplevelse af Cortex;
- konsoliderede Product experience-principper;
- teknologiuafhængige kvalitetsmål for interaktion og forståelse;
- brugerens oplevelse af AI/systembidrag, evidence, provenance, uncertainty og failure;
- krav til ro, orientering, continuity, accessibility og menneskelig authority;
- researchagenda, acceptance implications og Product kill criteria.

PEV-001 styrer ikke:

- konkrete skærme, wireframes, layout eller navigation;
- konkrete interaktionskontroller;
- komponenter, farver, typografi, animationstyper eller visuel identitet;
- design system eller frontend;
- API, database, cloud, AI-model eller anden teknologistak;
- bounded contexts, domain ownership, LEX, capability contracts eller implementeringsarkitektur;
- prototype, klinisk evaluation, release eller Build-handoff.

Experience Vision beskriver, hvad brugeren skal kunne opleve, forstå og gøre. Architecture ejer systemets semantik og kontrakter; Build ejer senere implementation inden for accepterede handoffs.

## 2. Source reconciliation

### 2.1 Source basis

| Lag | Kilde | Experience-anvendelse |
|---|---|---|
| Product | [CPB-001](../CORTEX-PRODUCT-BASELINE-v1.0.md) | Mandat, scope, klassifikationer, principper og readiness. |
| Product | [Domain Architecture Product Reconciliation](../architecture/DOMAIN-ARCHITECTURE-PRODUCT-RECONCILIATION-v1.0.md) | Domænegrænser oversat til experience obligations uden ownership takeover. |
| Product | [Experience Vision Readiness](CORTEX-EXPERIENCE-VISION-READINESS-v1.0.md) | Gate, krævet scope og prohibitions. |
| Product | [ROADMAP](../ROADMAP.md) | Eksisterende milestone- og workflowkontekst; ikke ny prototypeautorisation. |
| Product | [WORKFLOW-FAMILIES](../proposals/WORKFLOW-FAMILIES.md) | Draft-hypotese om genkendelighed og genbrug; ikke accepteret taxonomi. |
| Product control | [Decision](../registers/product-decision-register.md), [Issue](../registers/product-issue-register.md), [Assumption](../registers/product-assumption-register.md) og [Interface Register](../registers/architecture-product-interface-register.md) | Beslutninger, blockers, hypoteser og handoffs. |
| Predecessor | [CX-001](../../vision/CX-001-The-Perfect-Consultation.md) | Emotionel experience-retning og cognitive-load problem. |
| Predecessor | [MVP-001](../../vision/MVP-001-The-First-Clinical-Product.md) | Calm, trust, simplicity og end-to-end konsultationsambition. |
| Predecessor | [WF-001](../../vision/WF-001-The-Consultation-Workflow.md) | Adaptive, physician-controlled og non-wizard workflowkontekst. |
| Architecture | [Software Architecture Baseline](../../architecture/CORTEX-SOFTWARE-ARCHITECTURE-BASELINE-v1.0.md) | Human authority, attention, provenance, failure/degraded, accessibility og capability-first constraints. |
| Architecture | [Governance & Traceability Architecture](../../architecture/GOVERNANCE-TRACEABILITY-ARCHITECTURE-v1.0.md) | Provenance, traceability, evidence, verification og audit distinctions. |
| Architecture | [Domain Architecture](../../architecture/CORTEX-DOMAIN-ARCHITECTURE-v1.0.md) | Qualified working language, authority, risk/uncertainty og context boundaries. |
| Architecture | [CA-001](../../architecture/capabilities/CA-001-Knowledge-Retrieval-v1.0.md) | Retrieval/source/failure boundary; passage/ranking er ikke evidence/authority. |
| Product/Architecture | [Architecture Constraint Summary](../architecture/architecture-constraint-summary-for-product.md) | Operationelle Product-constraints og review triggers. |
| Governance | [Cortex Philosophy](../../governance/canonical/Cortex-Philosophy.docx) | Human judgement, consultation, cognitive load og AI som middel. |
| Governance | [Constitution Ratification Report](../../governance/canonical/Cortex-Constitution-Ratification-Report.docx) | Dignity, epistemic integrity, proportional attention, human authority og contestability; provisional. |
| Governance | [Governance Framework](../../governance/canonical/Cortex-Governance-Framework-v1.0.docx) | Lifecycle, evidence, decision rights, traceability og evaluation; non-active. |
| Specification | [Cortex Specification](../../specifications/Cortex-Specification-v1.0.docx) | System boundary, actors, capabilities, information/decision model, NFRs og prohibitions; GI-015 qualified. |
| Safety | [Clinical Safety Principles](../../governance/CLINICAL-SAFETY-PRINCIPLES.md) | Drafts require clinician review; relevant negatives, acute concerns og source-based output. |

Ingen source-listing løfter den pågældende kildes status.

### 2.2 Predecessor disposition

| Predecessor | Videreføres | Præciseres | Afvises/videreføres ikke | Uafklaret | Ejer |
|---|---|---|---|---|---|
| ROADMAP | Fokus på learning, safety, cognitive load og workflow evidence. | Milestones er portfolio-context under CPB/PDR, ikke selvautoriserende gates. | Nuværende prototypeplan autoriserer ikke ny prototype eller clinical study. | Første governed slice og roadmapstatus. | Product + Governance. |
| WORKFLOW-FAMILIES | Genkendelighed, consistency og genbrug som hypoteser. | Familier er Draft Product Architecture, ikke valideret mental model eller accepteret domain taxonomy. | Diagnoselister og familieinddeling bliver ikke Experience-fakta. | Om brugerne genkender familier; Architecture relation. | Product Research + Architecture. |
| CX-001 | Calm, consultation as product, invisible assistant, trust og reduction of cognitive load. | “Remove everything the physician should not have to think about” betyder reducér unødvendig byrde uden at skjule nødvendig reflection, uncertainty eller authority. | “Clinical Operating System” videreføres ikke som definerende experience-term; kan skabe platform-/authority-overclaim. | Hvad calm og reduced load konkret betyder. | Product Research. |
| MVP-001 | Trust, reliability, simplicity, end-to-end continuity og ordinary consultations. | Preference/daily-use statements er outcome hypotheses, ikke dokumenteret adoption eller clinical readiness. | “Worthy of real clinical use” og real-consultation use videreføres ikke som aktuel autorisation. | Intended use, success thresholds og evaluation permission. | Product + Governance/Safety. |
| WF-001 | Adaptive, transparent, physician-controlled, non-wizard consultation flow. | Consultation bruges som menneskelig/klinisk experience-term; Encounter kræver Architecture mapping. | En “universal” workflowsekvens er ikke valideret som invariant for alle contexts. | Consultation/Encounter, stage model og første governed workflow. | Product/Clinical Workflow + Architecture. |

## 3. Experience North Star

> Cortex skal reducere — ikke øge — brugerens mentale belastning.

Dette er **Product-besluttet** og den primære experience North Star.

> Brugeren skal mærke sin puls falde, når Cortex åbnes.

Dette er **produktvision og Product-hypotese**, ikke en dokumenteret fysiologisk effekt. Formuleringen betyder, at brugeren bør opleve mindre spænding, hurtigere orientering, større kontrol og færre konkurrerende mentale krav. Den skal valideres kvalitativt og adfærdsmæssigt; faktisk pulsændring er ikke et nødvendigt eller påstået outcome.

| Område | North Star-konsekvens |
|---|---|
| Orientering | Brugeren forstår hurtigt clinical context, systemstatus og relevant næste arbejde. |
| Informationsprioritering | Høj relevans og risiko fremstår uden at alt fremstår vigtigt. |
| Mentale skift | Cortex reducerer unødvendige skift mellem consultation, memory, administration og systemkontrol. |
| Afbrydelser | Kun en dokumenteret protection function må legitimere interruption. |
| Oplevet kontrol | Brugeren kan forstå, afvise, korrigere, udskyde eller fortsætte inden for sikkert mandat. |
| Statusforståelse | Påbegyndt, delvist, degraded, blocked og færdigt kan ikke forveksles. |
| Kontinuitet | Plads, arbejde, rationale og relevante unknowns bevares gennem consultation og afbrydelse. |
| Fejl/usikkerhed | Failure og uncertainty forklares proportionalt med sikker recovery; intet delresultat simulerer completion. |

## 4. Experience anti-goals

Cortex må ikke opleves som:

| Anti-goal | Senere reviewspørgsmål |
|---|---|
| Et tungt journalsystem | Dominerer dokumentation eller formularlogik consultation og clinical thinking? |
| En generisk chatbot | Kræver oplevelsen promptformulering, chatnavigation eller blind tillid til svar? |
| Et dashboard fyldt med kort og alarmer | Konkurrerer mange samtidige elementer om opmærksomhed uden prioriteret formål? |
| Mange klik for simple opgaver | Skaber systemet handlinger uden clinical, safety eller comprehension-værdi? |
| En AI, som overtager brugerens rolle | Er recommendation/output tvetydig med Human Decision eller Action? |
| En kildefri svarmaskine | Er source, limitation og transformation praktisk utilgængelig, når det betyder noget? |
| Et system, der skjuler degraded state | Ser failure, stale, missing eller partial ud som normal success? |
| Et system, der simulerer certainty eller completion | Fremstår unknown eller delresultat som sikkert/færdigt? |
| Et engagementprodukt | Optimeres tid i produktet, gentagen brug eller aktivitet frem for clinical usefulness? |

Et anti-goal-brud er reviewfinding og kan udløse kill criterion.

## 5. Experience actors og contexts

Der opfindes ingen validerede personas.

### 5.1 Praktiserende læge i konsultationen

| Felt | Værdi |
|---|---|
| Klassifikation | Dokumenteret actor; primær Experience-actor. |
| Mål | Forstå patientens problem, træffe ansvarlige valg og bevare relation/nærvær. |
| Ansvar/authority | Klinisk vurdering og Human Decision inden for mandat. |
| Tidspres/afbrydelser | Højt og varierende; patientdialog, kolleger, akut information, systemskift. |
| Informationsbehov | Relevant context, missing/conflict, evidence/limitations, risk, options, status og safe next work. |
| Fejlkonsekvens | Forkert, forsinket eller uautoriseret handling; tab af tillid/nærvær. |
| Provenance/forklaring | Højt ved clinically significant claim/recommendation; proportionalt ellers. |
| Genoptagelse | Skal kunne genfinde place, preserved work, changed/stale state og pending decision. |
| Researchbehov | Burden moments, interruption legitimacy, terminology, context variation og actual workflow. |

### 5.2 Patienten i konsultationen

| Felt | Værdi |
|---|---|
| Klassifikation | Dokumenteret berørt actor/participant; direkte systembrug er uafklaret. |
| Mål | Blive hørt, forstå plan/uncertainty og deltage i relevant shared decision. |
| Ansvar/authority | Egen værdier/præferencer; clinical/system authority må ikke antages. |
| Tidspres/afbrydelser | Consultationens tid og emotionelle/kliniske belastning. |
| Informationsbehov | Klar, loyal og context-appropriate forklaring, conditions og safety-net. |
| Fejlkonsekvens | Misforståelse, manglende follow-up, dignity/trust harm. |
| Provenance/forklaring | Behøver begrundelse og kildekontekst, når relevant; detaljeringsniveau er researchspørgsmål. |
| Genoptagelse | Patient communication skal bevare approved plan, uncertainty og conditions. |
| Researchbehov | Direkte brug, sprog, accessibility, shared-decision og comprehension. |

### 5.3 Klinisk personale omkring preparation/follow-up

| Felt | Værdi |
|---|---|
| Klassifikation | Udledt actor; rolle, scope og authority uafklaret. |
| Mål | Forberede, koordinere eller følge op uden at overtage clinical decision. |
| Ansvar/authority | Rolleafhængig; må ikke antages lig lægens. |
| Tidspres/afbrydelser | Handoffs, køer, telefoner, samtidige opgaver. |
| Informationsbehov | Tildelt work, scope, status, owner, dependency og escalation. |
| Fejlkonsekvens | Forkert routing, manglende follow-up eller implicit authority. |
| Provenance/forklaring | Højt ved delegation, source/action status og handoff. |
| Genoptagelse | Kræver klare pending/complete/failed boundaries. |
| Researchbehov | Faktiske roller, responsibility, workarounds og data access. |

### 5.4 Governance-, safety-, evidence- og verification-reviewer

| Felt | Værdi |
|---|---|
| Klassifikation | Dokumenteret organisatorisk actor; konkrete workflows uafklarede. |
| Mål | Vurdere authority, evidence, conformance, safety og impact. |
| Ansvar/authority | Afhænger af navngivet rolle/body; ikke clinical decision i consultation. |
| Tidspres/afbrydelser | Reviewcycles, incidents og release gates. |
| Informationsbehov | Actual versions, rationale, trace relations, evidence type/scope og audit reconstruction. |
| Fejlkonsekvens | False approval, overclaim, uopdaget impact eller manglende accountability. |
| Provenance/forklaring | Meget højt og detaljeret; må ikke forveksle clinical/verification evidence. |
| Genoptagelse | Review state, dissent, changed artifacts og unresolved issues bevares. |
| Researchbehov | Workflow, tooling og necessary detail efter Governance ownership. |

## 6. Kontrollerede Experience Principles

Overlappende kandidater er konsolideret til 12 principper.

| ID | Princip og formulering | Rationale / upstream | Ønsket brugerresultat | Product-konsekvens | Typiske brud | Acceptance implications | Vigtig spænding |
|---|---|---|---|---|---|---|---|
| EP-01 | **Calm before clever.** Systemet er stille som default og viser høj informationsværdi med lav støj. | CPB; CX; PHI; SAB AP-005. | Mere ro og fokus på consultation. | Alt synligt/afbrydende skal have tydeligt formål. | Feature theatre, kort/alarmer, AI-showcase. | Brugere kan udføre kernearbejde uden konkurrerende støj. | Ro vs uncertainty/required interruption. |
| EP-02 | **Context before controls, immediate orientation.** Brugeren forstår situation/status før valg. | CPB; WF; Domain Clinical Context. | Hurtig sikker genorientering. | Context og consequence beskrives før action request. | Kontrolflader uden mening, skjult status. | Bruger kan forklare hvor de er, hvad der er bevaret og hvad der mangler. | Information density vs load. |
| EP-03 | **One clear next action, low friction.** Relevant næste arbejde er tydeligt uden at låse workflowet. | CPB; WF adaptive/non-wizard. | Mindre decision overhead og bevaret fleksibilitet. | Primær handling er conceptual, ikke tvungen; alternativer/reject bevares. | Wizard, mange lige vigtige valg, implicit default. | Få nødvendige handlinger; fri navigation valideres senere. | Speed vs reflection. |
| EP-04 | **Progressive disclosure with evidence at need.** Detaljer udfoldes efter relevans uden semantisk tab. | SPEC INF; SAB AP-006; GTA; PAC-003. | Oversigt plus praktisk adgang til source/limitation. | Provenance, uncertainty og conflict kan ikke begraves. | Metadata overload eller utilgængelig kilde. | Relevant detail findes/forstås, når trust/action afhænger af den. | Simplicity vs transparency. |
| EP-05 | **Invisible intelligence, explicit human authority.** AI er diskret; bidrag og Human Decision er forståeligt adskilt. | PHI; Constitution art. 4; SPEC; Domain §10. | Oplevet støtte uden role displacement. | AI/output/recommendation må ikke ligne accept/decision. | Chatbotpersona, auto-accept, anthropomorphic authority. | Brugere attribuerer output og decision korrekt. | Discreet AI vs transparency. |
| EP-06 | **Uncertainty remains visible; never simulate certainty or completion.** | SPEC PRO; SAB; Domain Risk/Uncertainty. | Appropriate trust og bedre safe judgement. | Unknown/missing/conflict/degraded/partial er distinkte. | Generic confidence, green success for partial, hidden stale. | Brugeren genkender status og limitation. | Calm vs visible uncertainty. |
| EP-07 | **Graceful failure, no dead ends.** Failure viser meaning, preserved work og næste sikre mulighed. | SAB AP-008; CA-001; PAC-004. | Kontrol og recovery uden unsafe workaround. | Alle failure paths har recovery/escalation eller ærlig block. | Spinner uden status, lost work, technical dead end. | Scenarier viser forståelig status, consequence og recovery. | Continuity vs safety block. |
| EP-08 | **Preserve place and work.** Context, input, rationale og pending decisions overlever sikre afbrydelser. | NFR-REL; Domain transformation/audit; PEVG. | Hurtig og korrekt genoptagelse. | Stale/changed/unsaved state skal kunne forstås. | Reset, duplicate work, silent overwrite. | Brugeren kan genoptage og identificere ændringer. | Privacy/minimisation vs persistence. |
| EP-09 | **Reversible where safely possible.** Korrigering og afvisning bevarer historik og konsekvens. | Constitution contestability; SAB AP-007; GTA. | Reelt menneskeligt control og færre irreversible fejl. | Reversibility er risk-bounded, ikke universel undo. | Irreversible defaults, history rewrite. | Korrigering er mulig/forståelig; irreversible cases er eksplicitte. | Speed vs accountability. |
| EP-10 | **Purposeful interruption.** Afbryd kun for dokumenteret protection function; prioritet er proportional. | Constitution proportionality; CAP-ATT; SAB AP-005. | Færre, mere legitime afbrydelser. | Information, warning og critical block har forskellig consequence. | Alarmtræthed, interrupt-for-everything, skjult high risk. | Bruger forstår hvorfor interruption kræver attention. | Silence vs protection. |
| EP-11 | **Consistency over novelty, context over rigidity.** Samme betydning opfører sig genkendeligt, men clinical context kan ændre relevans. | WF; workflow-family hypothesis; Domain vocabulary. | Lav læringsbyrde uden wizard rigidity. | Nye patterns kræver dokumenteret need; terminology stabiliseres via owners. | Novelty, disease-specific UI logic, forced sameness. | Cross-context comprehension og exception-rationale testes. | Consistency vs adaptation. |
| EP-12 | **Accessibility is structural.** Alternative input, semantics, scaling og cognitive accessibility er experiencekrav fra start. | SPEC NFR-ACC; SAB AP-011; Constitution equity. | Relevant brug på tværs af evner/settings. | Ingen meaning kun via farve/motion/precision input. | Mouse-only, fixed text, visual-only status. | Accessibility indgår i hvert requirement og review. | Density/speed vs accessibility. |

## 7. Centrale Experience-spændinger

| Spænding | Beslutningsprincip |
|---|---|
| Enkelhed vs transparens | Fjern støj, ikke mening. Material source, limitation, transformation og authority skal være praktisk tilgængelig. |
| Hastighed vs nødvendig refleksion | Reducér venten og administrativ friktion; fjern aldrig reflection, review eller explicit decision, når risiko/authority kræver det. |
| Automation vs menneskelig authority | Automatisér preparation/transformation under contract; gør recommendation og decision separate og rejection praktisk mulig. |
| Informationsdensitet vs cognitive load | Prioritér efter context/risk og brug progressive disclosure; ingen fast maksimal densitet uden research. |
| Ro vs visible uncertainty | Vis material uncertainty proportionalt og handlingsrettet; hverken alarmistisk eller skjult. |
| Stilhed vs nødvendig interruption | Stilhed er default; protection function, urgency og consequence legitimerer interruption. |
| Consistency vs contextual adaptation | Bevar semantik og interaction expectations; adaptér relevance/timing uden private synonyms. |
| Discreet AI vs transparency | Undgå AI theatre, men skjul aldrig source, system contribution, limitation eller authority. |
| Flow vs verifiable completion | Bevar continuity, men markér påbegyndt/partial/verified/complete korrekt; et klik er ikke completion evidence. |

Ingen spænding løses gennem et konkret UI-valg i PEV-001.

## 8. Authority experience

Brugeren skal kunne forstå forskel og relation mellem:

| Type | Experience-obligation |
|---|---|
| External source | Identitet, type, status, aktualitet og relevant scope kan forstås. |
| Retrieved Passage | Fremstår som hentet sourceindhold, ikke Evidence Item. |
| Evidence Item | Fremstår som source-bound support med scope, strength/currency/limits under relevant policy. |
| Claim | Fremstår som proposition, som evidence kan støtte eller contestere. |
| Recommendation | Fremstår som foreslået option med rationale, uncertainty og alternativer; ikke decision. |
| AI Output | System contribution og limitation er forståelig; ikke evidence/authority i sig selv. |
| Menneskelig vurdering | Actor og status kan skelnes fra system output. |
| Human Decision | Identificeret authorized actor, explicit choice og consequence er forståelig. |
| Action | Authorization, execution og outcome er separate; requested er ikke completed. |
| Verification conclusion | Scope, criterion, version og limitation er forståelig; ikke clinical evidence/validation. |

Authority skal være tydelig uden bureaukratisk flow: informationen skal være proportional med consequence og tilgængelig ved decision point, mens rutinemæssig metadata ikke må dominere. Hvordan dette realiseres er senere interaction design og Architecture review.

## 9. Provenance- og evidence experience

Experience skal gøre følgende forståeligt, når det påvirker trust eller action:

- source identity, type, status, jurisdiction og version/aktualitet;
- meaning-relevant transformations og system contribution;
- source quality/eligibility inden for kendt policy uden at fremstille popularitet som authority;
- conflict, contested/expired status, coverage og limitations;
- hvilken Evidence Item der støtter eller contestere hvilken Claim;
- om information er source, passage, evidence, claim, recommendation eller decision;
- adgang til uddybende detail gennem progressive disclosure;
- bevaret consultation/context omkring det viste materiale.

Provenance må hverken være så skjult, at den ikke har praktisk værdi, eller så dominerende, at primary work drukner. Source → Retrieved Passage → Evidence Item → Claim forbliver API-009 Architecture-handoff; PEV-001 fastlægger kun comprehension-outcome.

## 10. Uncertainty, risk og confidence

Brugeren skal kunne forstå:

- known uncertainty og dens source/scope;
- unknown eller ikke-vurderet status;
- insufficient evidence, missing evidence og missing data som forskellige forhold;
- conflicting evidence og unresolved claim;
- degraded dependency eller stale context;
- risk, der legitimt kræver attention, samt hvem/hvad der kan handle;
- at absence ikke er low risk;
- at recommendation/decision kan ændres, hvis context/evidence/risk ændres.

`Confidence` er uafklaret domain language. PEV-001 fastlægger ingen score, skala, beregning, wording eller visualisering. Product-behovet er, at graden og begrænsningen af support kan forstås uden at simulere clinical certainty. Det kræver API-013/LEX-Architecture triage.

## 11. Failure, degraded state og recovery

I alle situationer skal brugeren kunne forstå: hvad der skete; hvad der er bevaret; hvad der er sikkert kendt; hvad der ikke er færdigt; betydningen; og næste sikre handling eller ærlige block.

| Situation | Experience requirement | Må aldrig ske |
|---|---|---|
| Manglende source access | Vis unavailable source, coverage impact og retry/escalation boundary. | Konstrueret eller cached content fremstilles som current uden status. |
| Partial retrieval | Vis consulted scope, gaps, limitation og partial state. | Delresultat fremstilles som complete. |
| Manglende Evidence | Vis at passage/source ikke er evidence eller at support mangler. | Missing evidence bliver negative evidence. |
| Evidence conflict | Bevar konflikter, scope og unresolved consequence. | Falsk konsensus eller tavst kildevalg. |
| AI failure | Afgræns berørt output og bevar valid input/work. | Plausibelt erstatningsoutput eller skjult fallback. |
| Langsom processing | Anerkend handling, vis meningsfuld status og tillad sikkert fortsat arbejde. | Arbejdsteater, falsk procent eller blocking uden grund. |
| Connection loss | Skeln lokal/bevaret/pending/unsynced state og recovery. | Silent data loss eller false submission. |
| Incomplete transformation | Markér berørte outputs som partial/stale og inputs som bevaret. | Draft/summary ser verified/complete ud. |
| Missing Verification | Vis untested/not evaluated og scope. | “Passed”, safe eller validated uden evidence. |
| Missing authorization | Forklar required role/scope og safe escalation. | Default allow eller clinical action gennem label alene. |
| Interrupted consultation | Bevar place, rationale, pending work og changed state proportionalt. | Reset eller implicit completion. |
| Resumption | Gør preservation, changes, stale items og next safe work forståeligt. | Brugeren forventes at huske systemets tidligere state. |

## 12. Attention og interruption

- Cortex er stille som default.
- Interruption kræver dokumenteret protection function, urgency, affected actor og consequence of delay.
- Information, warning og critical block er forskellige experience categories; endelig semantik/contract ejes ikke af Product alene.
- High risk må ikke skjules for at bevare ro; low-value information må ikke få alarmkarakter.
- Suppression, deferral og escalation kræver rationale og må ikke ændre clinical authority.
- Brugerens mental context og place skal bevares før, under og efter interruption.
- Alarm burden, override, ignored signal og recovery skal kunne evalueres uden performance surveillance af individet.

CAP-ATT og Consultation Impact Standard er dependencies via API-004/API-010. PEV-001 løser ikke deres contracts eller thresholds.

## 13. Perceived performance

Experience kræver:

- umiddelbar, sandfærdig acknowledgment af brugerhandling;
- forståelig status under længere behandling;
- kontinuerligt arbejde, hvor det er sikkert og semantisk gyldigt;
- bevaret fokus, place og context;
- progressive presentation kun af information, hvis status/validation er tydelig;
- intet unødvendigt work theatre;
- recovery uden silent loss;
- tydelig forskel mellem requested, started, partial, degraded, verified og complete.

PEV-001 fastlægger ingen tekniske SLO'er. Clinical Workflow Architecture og senere Architecture review skal identificere workflows, der kræver latency-, availability-, timeout- og degraded-mode-krav. Timeout må aldrig skabe Human Decision eller completion.

## 14. Accessibility og equity

Experience requirements skal fra start omfatte:

- keyboard use og alternative input;
- skærmlæsersemantik og meningsfuld reading order;
- zoom, text scaling og reflow;
- læsbarhed og sproglig præcision;
- farveuafhængig meaning;
- reduced animation og ingen motion-afhængig meaning;
- begrænset motorisk belastning og tolerance for imprecision;
- cognitive accessibility, clear status og genkendelige concepts;
- operation under time pressure, noise og interruptions;
- preservation/resumption uden memory dependence;
- equity review for forskellige roller, erfaringer, settings og relevante impairments.

Accessibility kan ikke udskydes til compliance-check. Konkrete WCAG-mappings, platform patterns og controls tilhører senere requirements/design/Build-review.

## 15. Experience Quality Model

Thresholds er `TODO` indtil relevant research, workflow og Architecture input foreligger.

| Dimension | Definition / ønsket outcome | Observerbar indikator | Relevante workflows | Researchbehov | Architecture-afhængighed | Build-afhængighed | Threshold |
|---|---|---|---|---|---|---|---|
| Orientation | Forstår context, status og next work hurtigt. | Correct explain-back; time/hesitation. | Alle; især resumption. | Context priority. | State/context semantics. | Later instrumentation/accessibility. | TODO |
| Cognitive load | Færre unødvendige memory/decision demands. | Observed switching, errors, validated self-report. | Consultation end-to-end. | Baseline/variation. | Workflow/attention. | Later measurement. | TODO |
| Action clarity | Relevant next work og consequence forstås. | Correct action/consequence attribution. | Decision/action/failure. | Terminology. | Authority transitions. | Later implementation. | TODO |
| Task continuity | Place/work/rationale bevares. | Successful resume; duplicate/lost work. | Interrupted/long tasks. | Interruption patterns. | State/version semantics. | Persistence/recovery later. | TODO |
| Interruption burden | Kun legitimate interruptions kræver focus. | Frequency, relevance, ignored/override reason. | Risk/attention. | Consultation Impact. | CAP-ATT/CAP-RSK. | Telemetry governance later. | TODO |
| Provenance comprehension | Source/transformation/limits forstås ved behov. | Correct source/lineage explain-back. | Evidence/recommendation/review. | Detail timing. | Provenance contract. | Later availability. | TODO |
| Uncertainty comprehension | Unknown/missing/conflict/degraded forstås. | Correct state interpretation/action. | Retrieval, risk, failure. | Calm wording. | Risk/uncertainty semantics. | Later state fidelity. | TODO |
| Authority comprehension | System, recommendation og Human Decision adskilles. | Correct attribution; no false acceptance. | DSU/decision/action. | AI attribution. | Authority transitions. | Later audit/state. | TODO |
| Error prevention | Experience reducerer avoidable unsafe action. | Near-error/error pattern under scenarios. | High-consequence workflows. | Hazard-led research. | Safety invariants. | Verification later. | TODO |
| Recoverability | Failure har forståelig safe recovery/block. | Successful recovery; no data loss/workaround. | Alle failure states. | Failure scenarios. | Failure propagation. | Reliability later. | TODO |
| Perceived responsiveness | Systemet føles kontinuerligt og ærligt. | Abandonment, repeated action, wait interpretation. | Processing/retrieval/output. | Latency perception. | Workflow-specific SLO need. | Performance later. | TODO |
| Accessibility | Relevant brug uden unnecessary exclusion. | Keyboard/AT/task completion and comprehension. | Alle. | Diverse users/settings. | Semantic contracts. | Platform implementation later. | TODO |
| Appropriate trust | Trust matcher capability/evidence/limits. | Calibrated reliance/rejection. | Evidence, DSU, failure. | Longitudinal trust. | Evidence/authority. | Consistent behavior later. | TODO |
| Workflow efficiency | Mindre waste uden tab af reflection/safety. | Actions, switches, time plus quality. | Governed slices. | Current workflow baseline. | Workflow contracts. | Later task instrumentation. | TODO |

## 16. Experience Requirements

Requirement IDs er under-ID'er til `PEV-001`, ikke et nyt repository-wide ID-system.

| ID | Actor/context | Teknologiuafhængigt krav | Rationale/upstream | Acceptance implications | Failure implications | Relation | Status / research / Architecture review |
|---|---|---|---|---|---|---|---|
| PEV-001-R01 | Primary clinician; entry/resumption | Cortex skal gøre relevant consultation context, systemstatus, preserved work og next work forståeligt uden systemtræning. | EP-02; CPB; WF. | Explain-back og resumption scenarios. | Disorientation, duplicate/unsafe work. | CAP-CTX; Workflow. | DRAFT; research required; Architecture review context/state. |
| PEV-001-R02 | Primary clinician; routine work | Cortex skal minimere unødvendige mental shifts og actions uden at fjerne nødvendig reflection/authority. | North Star; PHI; EP-01/03. | Burden mapping og task comparison. | More load or unsafe shortcut. | Workflow; CAP-ATT. | DRAFT; high research; Architecture review. |
| PEV-001-R03 | Any authorized user; information/action point | Context og consequence skal være forståelige før brugeren anmodes om et valg. | EP-02; CPB. | User can state why action matters. | Blind/system-led action. | Workflow/Human Decision. | DRAFT; research; Architecture review if transition. |
| PEV-001-R04 | Clinician; source/evidence use | Source, passage, Evidence Item og Claim skal kunne skelnes i experience uden at Product redefinerer dem. | Domain §§2/7; API-009. | Correct categorization in scenarios. | Semantic upgrade/overreliance. | CAP-KNR/EVD/RSN. | DRAFT; research; mandatory Architecture review. |
| PEV-001-R05 | Clinician; recommendation/decision | AI Output/Recommendation, human assessment, Human Decision og Action skal være forståeligt separate. | SPEC; Domain §10; EP-05. | Correct authority attribution; explicit decision. | Automation bias/implicit approval. | CAP-DSU; Human Decision. | DRAFT; high-priority research; mandatory Architecture review. |
| PEV-001-R06 | Clinician; uncertainty/risk | Known/unknown, missing/conflict/degraded og material risk skal være forståelige og proportionale. | Domain Risk; EP-06. | State/action comprehension under scenarios. | False certainty/alarm. | CAP-RSK/ATT/DSU. | DRAFT; research; Architecture review. |
| PEV-001-R07 | Clinician/reviewer; provenance need | Source identity, version, transformation og limitations skal være practically accessible when trust/action depends on them. | SPEC INF; GTA; EP-04. | Find/interpret lineage within scenario. | Hidden or overwhelming provenance. | KNR/EVD/Traceability. | DRAFT; research; Architecture review. |
| PEV-001-R08 | Any user; failure/degraded | Failure skal vise occurrence, preserved work, known/unknown, incomplete consequence og safe next possibility/block. | SAB AP-008; EP-07. | Recovery scenario success. | Dead end, unsafe workaround, lost work. | All capabilities. | DRAFT; research; Architecture review failure propagation. |
| PEV-001-R09 | Any user; partial processing | Delresultat må aldrig fremstå som complete, verified eller clinically validated. | Domain Verification; EP-06. | Correct partial/complete attribution. | False completion. | Verification/Workflow. | DRAFT; research; Architecture/Governance review. |
| PEV-001-R10 | Clinician; interruption | Interruption skal have proportional protection function, urgency og consequence; silence er default. | Constitution; CAP-ATT; EP-10. | Legitimacy/recognition testing. | Alarm fatigue or missed risk. | CAP-ATT/RSK. | DRAFT; high research; blocked on Consultation Impact. |
| PEV-001-R11 | Any user; interrupted work | Cortex skal bevare place, valid work, rationale og pending decisions samt synliggøre stale/changed state ved resume. | EP-08; NFR-REL. | Resume without memory/duplication. | Silent reset/overwrite. | Workflow/Context/Audit. | DRAFT; research; Architecture review. |
| PEV-001-R12 | Any user; correction/rejection | Useren skal kunne afvise/korrigere systembidrag, hvor sikkert muligt, uden history rewrite eller skjult consequence. | Constitution contestability; EP-09. | Correction/rejection scenarios. | Symbolic control or corrupted history. | DSU/DOC/Audit. | DRAFT; research; Architecture review. |
| PEV-001-R13 | Any user; processing delay | Handling skal anerkendes sandfærdigt; status og safe continued work skal være forståelige uden false progress. | EP-07; perceived performance. | No duplicate action; correct status. | Repeated actions/false completion. | Workflow/capability-specific. | DRAFT; thresholds TODO; Architecture SLO review later. |
| PEV-001-R14 | Relevant users; all contexts | Meaning og core work skal være operable/understandable with keyboard, alternative input, screen reader, scaling and without color/motion dependence. | SPEC ACC; EP-12. | Accessibility scenario coverage. | Exclusion or missed meaning. | Cross-cutting. | DRAFT; diverse-user research; Build review later. |
| PEV-001-R15 | Patient/clinician; patient communication | Patient-facing representation skal loyalt bevare approved plan, uncertainty, conditions og safety-net. | Domain DOC/PCM; CSP. | Comprehension/loyalty review. | Misunderstanding/invented plan. | CAP-PCM/DOC. | DRAFT; patient research; clinical/Architecture review. |
| PEV-001-R16 | Reviewer/Product; evaluation | Product skal type og scope evaluation evidence, så verification ikke fremstilles som clinical evidence/validation. | Domain Verification; API-012. | Claims link to method/population/version/limits. | Overclaim of safety/readiness. | Verification/Governance. | DRAFT; Governance review. |
| PEV-001-R17 | Primary clinician; end-to-end consultation | Experience skal bevare continuity på tværs af preparation, consultation og follow-up uden at gøre documentation til produktets centrum. | PHI; CX; MVP; CPB. | Workflow study and burden distribution. | Journalsystemoplevelse/work shifted. | Workflow/DOC/PCM. | DRAFT; first-slice research; Architecture review. |
| PEV-001-R18 | Product portfolio; future designs | Experience-ideer skal afvises, når et kill criterion udløses og ingen proportional safety rationale dokumenteres. | Stress Test Product gates; §18. | Review record cites criterion/evidence. | Sunk-cost continuation. | Product/Governance. | DRAFT; Product-owned; Governance for risk exceptions. |

## 17. Experience Research Agenda

Den prioriterede agenda findes i [Experience Research Agenda v1.0](../research/EXPERIENCE-RESEARCH-AGENDA-v1.0.md) og Product Assumption Register. Visionen er ikke brugerresearch; alle outcome- og comprehensionclaims forbliver hypotheses, indtil de er valideret med defineret population, method og limitations.

## 18. Product kill criteria

En Experience-idé eller et senere design afvises eller stoppes, hvis det:

1. øger cognitive load uden dokumenteret proportional safety/clinical benefit;
2. skjuler eller praktisk utilgængeliggør material provenance;
3. gør AI/system-output tvetydigt med Evidence, Recommendation eller Human Decision;
4. reducerer forståelsen eller realiteten af menneskelig authority;
5. simulerer certainty, verification, completion eller clinical validation;
6. skjuler missing/conflict/degraded/failure eller fremstiller partial som complete;
7. skaber alarm fatigue eller interruption uden protection function;
8. kræver unødvendige handlinger eller system-memory;
9. skaber dead ends, silent loss eller vanskelig recovery;
10. diskriminerer gennem utilgængelig interaction eller meaning;
11. optimerer engagement, feature visibility eller AI novelty frem for clinical usefulness;
12. kræver private domain definitions, implicit capability ownership eller uautoriseret Architecture/Build-beslutning.

Kill criteria er Product-kriterier, ikke regulatorisk approval eller clinical safety sign-off. En påstået exception kræver dokumenteret rationale, owner og relevant Governance/Safety review.

## 19. Reconciliation og registre

- Product Decision Register: PDR-006 registrerer Experience Vision.
- Product Issue Register: predecessor conflicts, thresholds, research og review blockers registreres.
- Product Assumption Register: Experience hypotheses er prioriteret og linket til researchagenda.
- Architecture–Product Interface Register: EV-AR-001 og domain-sensitive handoffs registreres.
- ROADMAP, CX-001, MVP-001 og WF-001 er ikke tavst sat i bero; dispositioner står i §2.2.

## 20. Architecture review package

[PEV-001-H01](../handoffs/ARCHITECTURE-REVIEW-INPUT-EXPERIENCE-VISION-v1.0.md) er forberedt til Steering. Det er ikke sendt eller startet. Reviewet spørger kun om:

- konflikt med Domain Architecture;
- konflikt med decision authority;
- konflikt med provenance/evidence/traceability;
- utilsigtede technical solution choices;
- manglende trust-boundary/capability dependencies.

Architecture skal ikke overtage Experience Vision eller omskrive Product-principper.

## 21. Readiness

| Næste område | Readiness | Betingelse / ikke-autorisation |
|---|---|---|
| Architecture review | READY TO REQUEST, NOT STARTED | Steering sender PEV-001-H01; named reviewer og response record kræves. |
| Clinical Workflow Architecture | READY TO BEGIN AFTER INITIAL ARCHITECTURE REVIEW | Første governed slice, Consultation/Encounter og authority/failure handoffs er åbne. |
| Information Architecture | READY TO BEGIN WITH CONDITIONS | Kan klassificere information/meaning; LEX og Source→Evidence→Claim handoff mangler. |
| Første governed workflow-slice | READY FOR PRODUCT DECISION RESEARCH | Knæ er PA-006, ikke automatisk valgt; mindst ét enklere alternativ kræves. |
| Interaction architecture | NOT READY | Afventer Architecture review, workflow og IA. |
| Design system principles | NOT READY | Accessibility/consistency principles findes, men concrete design foundations er ude af scope. |
| Low-fidelity prototype | NOT AUTHORIZED | Afventer interaction gate og research/evaluation permissions. |
| Brugerresearch | READY TO PLAN; EXECUTION REQUIRES APPROVED PROTOCOL | Ikke-patientidentificerende discovery kan planlægges; setting/participants/data governance skal godkendes. |
| Clinical usability study | NOT READY | Intended use, workflow, protocol, safety/QMS og clinical approvals mangler. |
| Build-handoff | NOT READY | Ingen concrete requirements/design/accepted Architecture allocation. |

## 22. Sekvens

```text
Experience Vision Architecture review
        ↓
Clinical Workflow Architecture
        ↓
Information Architecture
        ↓
Prioritering af CA-002
        ↓
Interaction architecture/design
        ↓
Kontrolleret prototype — kun efter særskilt gate
```

PEV-001 autoriserer ikke implementation, clinical use eller release.
