# Cortex Domain Architecture v1.0

**Document ID:** TODO - afventer godkendt ID-standard, jf. GI-013

**Version:** 1.0

**Status:** Non-active working artifact pending GI-018 resolution

**Status rationale:** Dette er en eksplicit arbejdsmarkering, ikke en ny lifecycle-status. Governance Frameworkets kontrollerede lifecycle indeholder `REVIEW`, men GI-018 viser, at repositoryets eksisterende `Proposed`-artefakter endnu ikke har en godkendt statusmapping, og der foreligger ingen governancebeslutning, som placerer dette nye artefakt i lifecycle eller udpeger owner/approving body. Dokumentet må derfor ikke opfattes som `REVIEW`, `RATIFIED` eller `ACTIVE`.

**Responsible author:** Chief Software Architect

**Governance owner:** TODO - jf. GI-012

**Approving body:** TODO - jf. GI-010-GI-012

**Date:** 2026-07-21

**Normative rank:** Ikke-aktivt arkitekturartefakt under Constitution, Governance Framework, Cortex Specification v1.0, Cortex Software Architecture Baseline v1.0 og Governance & Traceability Architecture v1.0.

**Scope type:** Logisk domaenearkitektur. Ingen kode, API-design, database, servicearkitektur, cloud, deployment, UI-design eller AI-modeldesign.

## 0. Purpose, Authority And Source Protocol

Dette dokument etablerer et faelles domaenesprog, logiske bounded contexts, domaeneobjekter, aggregate-graenser, invariants, events, capability mapping og beslutningssemantik for Cortex.

Formaalet er at forhindre, at Cortex faar flere konkurrerende betydninger af centrale begreber som Evidence, Claim, Recommendation, Decision og Provenance. Dokumentet er ikke en LEX i Governance Frameworkets forstand, fordi LEX-artefaktet endnu ikke er etableret, jf. GI-014. Det er et review-klart arkitekturgrundlag, som senere kan bruges til at oprette eller udfylde LEX, ADR'er, capability-arkitekturer og verification architecture.

### 0.1 Source intake and authority

All files below were successfully read from their canonical repository paths. `Authoritative` means authoritative for the stated role; it does not upgrade an internally conditional or non-active status.

| Code | Source | Type/version/status | Authority and sections used | Domain relevance / constraints / issues |
|---|---|---|---|---|
| VIS | [Vision index](../vision/README.md), [Manifest](../vision/MANIFEST.md), [CX-001](../vision/CX-001-The-Perfect-Consultation.md), [MVP-001](../vision/MVP-001-The-First-Clinical-Product.md), [WF-001](../vision/WF-001-The-Consultation-Workflow.md) | Markdown; mixed Foundational Draft/v1.0 status | Product and experience vision; read in the prescribed order | Consultation purpose, human judgement, adaptive workflow, documentation as consequence. Adoption Report makes these subordinate to adopted governance sources where they overlap. |
| PHI | [Cortex Philosophy](../governance/canonical/Cortex-Philosophy.docx) | DOCX; version/status not stated | Authoritative interpretive foundation; identity, human judgement, uncertainty, attention and learning chapters | Cortex is decision/work support, not diagnosis authority. Metadata gaps: GI-012/GI-013. |
| CON | [Constitution Ratification Report](../governance/canonical/Cortex-Constitution-Ratification-Report.docx) | DOCX; proposed Constitution v1.0; conditional ratification | Highest proposed normative layer; proposed articles 1–8 | Dignity, epistemic integrity, proportional intervention, human authority, contestability and lifecycle responsibility. GI-010. |
| GOV | [Governance Framework v1.0](../governance/canonical/Cortex-Governance-Framework-v1.0.docx) | DOCX v1.0; `Foundational`, valid from ratification; not active | Authoritative governance framework; §§0–8, 11–18, 25–27 | Hierarchy, lifecycle, identity, evidence, decision rights, traceability and gates. GI-011–GI-014. |
| GST | [Governance Framework Stress Test v1.0](../governance/assurance/Cortex-Governance-Framework-Stress-Test-v1.0.docx) | DOCX; independent assurance; version/status not stated | Authoritative assurance beside GOV; P0 gates and final commission judgement | Requires provisional operation, regulatory/QMS boundary, pilots and audit before activation. GI-011/GI-016. |
| SPEC | [Cortex Specification v1.0](../specifications/Cortex-Specification-v1.0.docx) | DOCX v1.0; `RATIFIED BASELINE` with inconsistent upstream status | Authoritative system specification; §§0–5 and 18–31 | Core objects, 12 capabilities, authority, information lifecycle, prohibitions, acceptance and product boundaries. GI-015. |
| ENG | [Engineering Constitution](../governance/ENGINEERING-CONSTITUTION.md) | Markdown; no lifecycle metadata | Current engineering policy, subordinate to adopted Constitution/GOV/SPEC | One encounter engine, explicit input, no clinical reasoning in UI, AI never decides, explainable recommendations. Conformance status unassessed under GI-017. |
| CSP | [Clinical Safety Principles](../governance/CLINICAL-SAFETY-PRINCIPLES.md) | Markdown; no version/status metadata | Current repository safety constraint required by ENG; not demonstrated as an adopted canonical governance artifact | Outputs are drafts; clinician review; no automatic diagnosis; visible acute concerns; source-based and versioned referrals. Status/owner gap maps to GI-012–GI-014, but its absence from the adopted canonical set does not block this logical model. |
| RFC-005 | [Workflow Engine v1](./rfcs/RFC-005-Workflow-Engine-v1.md) | Markdown; Accepted; reviewed 2026-07-15 | Accepted pre-adoption technical RFC; used only where consistent with higher sources | Explicit information, deterministic derivation, shared condition semantics, generic engine/specific pathways, advisory outputs. Conformance remains unassessed under GI-017. |
| SAB | [Software Architecture Baseline v1.0](./CORTEX-SOFTWARE-ARCHITECTURE-BASELINE-v1.0.md) | Markdown v1.0; `Proposed` and non-active | Current architecture analysis; AP-001–AP-012 and AC-001–AC-023 | Derived system constraints. Status affected by GI-018; not an accepted ADR. |
| GTA | [Governance & Traceability Architecture v1.0](./GOVERNANCE-TRACEABILITY-ARCHITECTURE-v1.0.md) | Markdown v1.0; `Proposed` and non-active | Current cross-cutting architecture; §§1–8 and 10–11 | Separates provenance, traceability, evidence, verification and audit; defines GI-018. |
| CA-001 | [Knowledge Retrieval v1.0](./capabilities/CA-001-Knowledge-Retrieval-v1.0.md) | Markdown v1.0; `Proposed` and non-active | Capability reference case for CAP-KNR; §§0–10 | Retrieval Execution aggregate, source-policy boundary, retrieval/evidence separation and verification cases. Must not dominate the common model. |
| CA-T | [Capability Architecture Template](./capabilities/CAPABILITY-ARCHITECTURE-TEMPLATE.md) | Markdown template; no independent lifecycle status | Structural guidance only | Contract, domain, trust, verification and readiness completeness. |
| ADR-001–003 | [Architecture Decisions Index](./decisions/README.md) | Markdown; all three ADRs `Proposed` | Decision candidates only; not approved decisions | Repository, canonical-source and traceability proposals; status affected by GI-018. |
| GAR | [Governance Adoption Report v2.0](../governance/GOVERNANCE-ADOPTION-REPORT-v2.0.md) and [Artifact Register](../governance/GOVERNANCE-ARTIFACT-REGISTER.md) | Markdown; adoption control records | Canonicality and issue context, not new normative content | Confirms canonical paths and GI-010–GI-017. |

No requested source remained unreadable after path verification. The repository-wide title search also located CSP, ENG, the existing Domain Architecture and GI-018 in GTA §3.4.

### 0.2 Evidence Boundary

This document:

- derives logical domain structure from normative and architecture sources;
- records ambiguity as issues rather than resolving it by assumption;
- uses CAP-KNR as a validation case only;
- does not approve existing implementation conformance;
- does not create a release basis; and
- does not establish clinical validation, regulatory conformity or QMS compliance.

Open governance gates GI-010-GI-018 remain active constraints.

### 0.3 Classification protocol

Every central element uses one of these labels:

- **Direct source-derived:** wording or semantic boundary is stated by an upstream source.
- **Architecturally derived:** the element is a necessary organisation of multiple source obligations; sources and rationale are stated.
- **Candidate:** plausible but requires an ADR, LEX, governance decision or later validation.
- **Assumption:** temporary proposition without sufficient source support. No assumption in this document authorises downstream work.
- **Unresolved:** sources conflict or do not define the matter sufficiently.

Architecturally derived bounded contexts and aggregates are working model decisions inside this non-active artifact. They are not approved implementation boundaries.

## 1. Domain Scope

### 1.1 Domain Cortex Operates In

Cortex operates in the socio-technical domain of clinical decision support for preparation, execution and follow-up of general-practice consultations.

The domain includes:

- clinical context synthesis;
- information need articulation;
- controlled knowledge retrieval;
- evidence handling and claim formation;
- reasoning structure around hypotheses, risk and uncertainty;
- decision support under explicit human control;
- documentation drafts and communication support;
- governance, traceability, audit, verification and controlled learning.

Cortex is not the domain authority for final diagnosis, treatment, legal responsibility, organisational staffing, regulatory conformity or the patient's dignity and autonomy. These remain human, organisational, legal or external responsibilities.

### 1.2 Problems The Domain Model Must Solve

The domain model must solve these semantic problems:

1. Keep observation, source, evidence, claim, assertion, recommendation, human decision, action and documentation distinct.
2. Preserve provenance, uncertainty, version, authority, scope and conflicts across transformations.
3. Ensure AI output cannot masquerade as evidence, recommendation, human decision or clinical fact.
4. Make human decision authority explicit where it is required.
5. Make missing evidence, failed retrieval, incomplete context and degraded dependencies visible.
6. Allow future capability architectures to reuse the same terms and context boundaries.
7. Support bidirectional traceability from normative source to requirement, architecture, verification, release and learning.
8. Prevent CAP-KNR or any other first capability from dominating the whole domain model.

### 1.3 Out Of Domain

The domain model does not define:

- database schemas;
- API endpoints;
- service boundaries;
- deployment topology;
- model providers;
- UI layout or interaction design;
- journal-system ownership;
- final regulatory classification;
- QMS implementation; or
- clinical release approval.

### 1.4 Boundary Between Clinical Expertise, Product Logic And Software Engineering

| Area | Owns | Does not own |
|---|---|---|
| Clinical expertise | Clinical judgement, diagnosis, treatment choice, interpretation of patient context, acceptance/rejection of recommendations. | Software state semantics, hidden defaults, undocumented automation. |
| Product logic | Workflow purpose, user value, attention protection, capability scope, visible interaction obligations. | Clinical authority, evidence truth, regulatory classification by assumption. |
| Software engineering | Deterministic processing, state integrity, traceability, capability contracts, failure/degraded behavior, maintainability. | Clinical decision-making, source authority, governance approval. |
| Governance | Normative hierarchy, lifecycle, owners, gates, exceptions, release conditions. | Clinical truth in a concrete consultation or technical implementation details. |

### 1.5 Core Distinctions

| Concept | Domain meaning | Cortex may do | Cortex must not do |
|---|---|---|---|
| Documentation | A versioned representation of relevant observations, assessments, decisions and actions. | Draft, structure, summarize and prepare for review. | Treat a draft as signed clinical record without authorized approval. |
| Information processing | Typing, transforming, contextualizing and routing information. | Preserve semantics, provenance and limitations. | Turn missing data into negative evidence or normality. |
| Evidence handling | Managing source-bound support with scope, strength, currency and limits. | Retrieve, classify, preserve and expose evidence. | Treat generative text as authoritative evidence. |
| Decision support | Presenting options, rationale, uncertainty and alternatives. | Suggest and explain. | Decide, coerce, auto-accept or hide alternatives. |
| Clinical decision | Authorized human choice between clinically meaningful options. | Record and support it. | Create it autonomously. |
| Treatment | Human-authorized clinical plan and action. | Draft information, safety-net and administrative support. | Prescribe, refer or order without explicit authorization. |

## 2. Ubiquitous Language

This section is a controlled working vocabulary. It is not yet the formal LEX artifact required by GOV/GI-014.

| Term | Definition | Allowed synonyms | Avoid | Upstream source | Related terms |
|---|---|---|---|---|---|
| Actor | A person, organisation, external system or governance role that can participate in the domain with defined responsibility or authority. | Participant, role-bearing party | User as universal synonym | SPEC §1.3; SAB §3.2 | User, Human Decision, Audit Record |
| User | An authorized human interacting with Cortex in a defined role and scope. | Authorized user | Clinician when the user may be non-clinical | SPEC SYS-012; INF-001 | Actor, Human Decision |
| Subject | A role for the entity that an information item is about. In a clinical use case the subject may be the Patient, but the terms are not interchangeable. | Information subject | Patient as universal synonym | Candidate; SPEC §18 does not define `Subject` | Patient, Provenance |
| Patient | The person whose health, goals and life context are at stake. | Person in care | Data subject only, datapost | SPEC §3; PHI | Subject, Clinical Context |
| Case | A possible generic container for a bounded matter. No shared cross-clinical/governance/verification meaning is authorised in v1.0. | None | Encounter, Consultation, aggregate | Unresolved | Encounter, Verification Case |
| Consultation | A time-bounded clinical meeting and its related preparation and follow-up. | None established | Case, patient record | SPEC §3; WF-001 | Encounter, Patient, Clinical Context |
| Encounter | The current software architecture's representation of consultation state and derived outputs. It is not yet established as a normative synonym for Consultation. | None established | Consultation as automatic synonym | ENG invariant 3; RFC-005; current architecture | Consultation, Clinical Context, Workflow |
| Clinical Context | Purpose-limited, time-bound representation of patient, consultation, organisational and source context. | Context snapshot | Truth, complete patient state | CAP-CTX; SPEC §18 | Encounter, Information Need |
| Information Need | A declared gap or question whose answer is required for a purpose. | Retrieval query, knowledge need | Claim, evidence | CAP-KNR; CAP-RSN-003 | Knowledge Source, Source Policy |
| Knowledge Source | Identifiable external or local source that may contain relevant content. | Source | Evidence, truth | CAP-KNR; SPEC §18 | Source Policy, Evidence Item |
| Source Policy | Governance-owned rule set determining which sources/statuses may be used for a purpose, jurisdiction and time. | Source permission policy | Ranking rule, clinical guideline | CAP-KNR; CAP-GOV | Knowledge Source, Capability Contract |
| Evidence | Source-bound support with scope, strength, currency, limitations and conflict status. | Evidence object when formalized by CAP-EVD | Source, citation, AI output | CAP-EVD; SPEC §3 | Evidence Item, Claim |
| Evidence Item | A discrete source-bound unit used to support or contest a claim. | Evidence object, evidence artifact | Retrieved passage before CAP-EVD validation | CAP-EVD; CA-001 | Evidence, Claim |
| Claim | A typed assertion about clinical, organisational, source or system state with provenance and authority level. | Evidence claim, clinical claim | Evidence, decision | CAP-EVD; SPEC SYS-003 | Assertion, Recommendation |
| Assertion | A declared proposition before this architecture assigns it evidence-governed Claim semantics. The Claim/Assertion boundary requires LEX confirmation. | Statement, proposition | Fact; Claim as automatic synonym | Candidate derived from SPEC SYS-003 and CAP-EVD | Claim, Verification |
| Recommendation | A decision-support output proposing an option with rationale, uncertainty and alternatives. | Suggestion | Decision, order, instruction | CAP-DSU; Clinical Safety Principles | Decision, AI Output |
| Decision | An authorized choice between options with owner, rationale, time, alternatives and consequence. | Authorized choice | Recommendation, output | SPEC §20; DEC invariant | Human Decision, Action |
| Human Decision | A decision made or approved by an identified authorized human actor. | Clinician decision, authorized decision | Click-through, timeout | CON art. 4; SYS-011/012 | Decision, Audit Record |
| AI Output | Output generated by a model or AI-mediated process, with model/prompt/config/version context where applicable. | Generated output | Evidence, decision, clinical authority | SPEC SYS-005; PRO-002 | Claim, Recommendation |
| Uncertainty | Known or unknown limitation in data, evidence, model, interpretation or operational state. | Limitation, unknown state | Weakness to hide | SPEC §3; PRO-001 | Confidence, Evidence |
| Confidence | Stated degree of support within a defined method and scope. | Support level | Clinical truth, certainty | CAP-RSN; CAP-EVD | Uncertainty, Evidence |
| Provenance | Origin, transformation, version and authority lineage of information. | Lineage | Citation alone | SPEC §4; INF-001/002 | Transformation, Audit Record |
| Transformation | A meaning-relevant conversion, filtering, summarization, ranking or derivation from input to output. | Derivation | Implementation detail only | INF-002; SAB AP-006 | Provenance, Verification |
| Verification | The controlled comparison of observed behaviour or an artifact against an explicit requirement, invariant, contract or criterion under known conditions. | Verification activity | Clinical validation, approval | SPEC §27; TRC-002; GTA §4 | Verification Evidence, Audit Record, Capability Contract |
| Verification Evidence | An identified artifact recording what was verified, by which method, against which versioned criterion, and with what result and limitations. | Acceptance evidence where produced against acceptance criteria | Clinical evidence, clinical validation | SPEC TRC-002 and §27; GTA §4 | Verification, Evidence Item, Audit Record |
| Audit Record | Append-only, integrity-protected record sufficient to reconstruct clinically or governance-significant chains. | Audit event, audit trace | Log line, mutable history | CAP-AUD; NFR-AUD-001 | Provenance, Human Decision |
| Capability | Logical responsibility zone with contract, dependencies, limitations and failure states. | Capability area | Service, component, feature | SPEC Capability rule; SAB AP-009 | Capability Contract |
| Capability Contract | The defined inputs, outputs, preconditions, postconditions, invariants, limitations and failure behavior of a capability. | Logical contract | API schema | SPEC §5; CA-001 | Capability, Verification |

### 2.1 Terms That Must Not Be Collapsed

- Evidence is not a source.
- Retrieved passage is not evidence until CAP-EVD establishes it as evidence.
- Recommendation is not decision.
- Decision is not action.
- AI output is not human decision.
- Documentation draft is not signed record.
- Missing data is not negative data.
- Ranking is not authority.
- Audit record is not source of clinical truth.

### 2.2 Definition provenance

| Terms | Classification | Source and rationale |
|---|---|---|
| Patient, Consultation, Risk, Uncertainty, Evidence, Decision, Action, Documentation, Provenance | Direct source-derived | SPEC §§3–4 defines the objects and their key invariants. |
| Actor | Direct source-derived | SPEC §1.3 defines actor classes and their authority. |
| Capability | Direct source-derived | SPEC §5 explicitly defines capabilities as logical responsibility zones. |
| Recommendation, Human Decision | Direct source-derived boundary | SPEC CAP-DSU and §20 require proposal and authorised human decision to remain separate. |
| Knowledge Source, Source Policy, Information Need | Architecturally derived | SPEC CAP-KNR and CA-001 provide the semantics; the shared names generalise the capability vocabulary. |
| Clinical Context | Architecturally derived | SPEC CAP-CTX defines a purpose-limited, time-bound context snapshot. |
| Evidence Item | Architecturally derived | SPEC CAP-EVD defines evidence objects; CA-001 establishes that retrieved passages are not those objects. |
| Claim | Architecturally derived | SPEC CAP-EVD manages clinical statements with provenance; the term stabilises that responsibility without equating statement and evidence. |
| Assertion | Candidate | Sources do not define a stable lifecycle distinction from Claim; LEX must decide it. |
| Confidence | Candidate | Sources constrain fabricated confidence but do not define one repository-wide confidence scale or type. |
| Subject, Case | Unresolved | No authoritative shared definition exists. Neither term may organise aggregates or authority until resolved. |
| Encounter | Architecturally derived compatibility term | ENG, RFC-005 and current architecture use encounter semantics; SPEC and WF-001 use Consultation. A later LEX/ADR must decide whether one supersedes or specialises the other. |
| AI Output | Architecturally derived | SPEC SYS-005, PRO-002/003/007 and SAB AP-003 constrain generated output, but AI is technology-optional. |
| Transformation, Verification, Verification Evidence, Audit Record, Capability Contract | Architecturally derived | SPEC INF/TRC/CAP-AUD, GTA and CA-T require these distinct control concepts. |

### 2.3 Required semantic boundaries

| Boundary | Resolution in v1.0 | Classification |
|---|---|---|
| Source / Evidence | A Source is identifiable material that may be consulted. Evidence is source-bound support admitted and characterised for scope, strength, currency, limitation and conflict. Retrieval alone does not perform that transition. | Direct/architecturally derived from SPEC CAP-KNR/CAP-EVD and CA-001 |
| Evidence / Claim | Evidence supports or contests. A Claim is the typed proposition being supported or contested. Neither contains the other as untyped text. | Architecturally derived from SPEC SYS-003/CAP-EVD |
| Claim / Assertion | Not resolved. Assertion is retained only as a candidate pre-Claim proposition until LEX decides whether the distinction is useful. | Unresolved |
| Information / Recommendation | Information represents typed content and authority. A Recommendation proposes an option with rationale, alternatives and uncertainty. Mere display of information is not a recommendation. | Direct source-derived from SPEC §§18/20 and CAP-DSU |
| Recommendation / Decision | Recommendation is system decision support; Decision is an authorised choice with owner and consequence. | Direct source-derived from SPEC §20/CAP-DSU |
| AI Output / Human Decision | AI Output is a technology-mediated output whose authority is bounded by its capability. Human Decision requires an identified authorised person and explicit action. No automatic conversion exists. | Direct/architecturally derived from SPEC PRO-002/003 and SYS-004/005 |
| Confidence / Uncertainty | Uncertainty is a source-defined limitation state. Confidence is a candidate method-bound support statement and must never erase uncertainty or imply clinical truth. | Uncertainty direct; Confidence candidate |
| Provenance / Audit | Provenance travels with information as origin/transformation/version/authority lineage. Audit preserves integrity-protected historical reconstruction across significant facts. Audit consumes provenance but does not own or replace it. | Direct/architecturally derived from SPEC §4/INF/CAP-AUD and GTA §§1–2 |
| Verification Evidence / clinical evidence | Verification Evidence supports a claim about conformance to a requirement under a scenario. Clinical evidence supports or contests a clinical Claim for a population/scope. Neither proves the other's proposition. | Direct/architecturally derived from SPEC CAP-EVD/TRC/§27 and GTA §4 |
| Case / Encounter / Clinical Context | Case is unresolved and unused as a common aggregate. Consultation is the normative clinical meeting; Encounter is a current-architecture compatibility record; Clinical Context is a purpose- and time-bound representation used within a Consultation. | Mixed: direct, derived and unresolved as stated |

## 3. Bounded Contexts

Bounded contexts are logical domain boundaries. They are not services, deployables, modules or teams.

All contexts below are **architecturally derived**, not direct source objects or accepted deployment boundaries. The derivation uses changes in vocabulary, authoritative owner, invariants and lifecycle. Identity and Access is additionally a **boundary candidate** because SPEC treats identity/consent as an external dependency rather than a Cortex capability. The grouping of Workflow with Attention and Documentation with Patient Communication is deliberate: it avoids one-context-per-capability while preserving distinct owned objects and capability contracts.

### 3.1 Identity And Access

| Field | Description |
|---|---|
| Responsibility | Establish actor identity, role, authorization scope, purpose and legitimate access. |
| Owns | Actor identity references, authorization context, access decision semantics. |
| Does not own | Clinical truth, source authority, final clinical decision. |
| Core terms | Actor, User, Authorization Context, Capability Contract, Audit Record. |
| Inbound | Governance policy, organisational roles, external identity sources. |
| Outbound | Authorization context to all contexts. |
| Constraints | No action, retrieval or access may proceed on label alone; authorization failure must be visible and auditable. |

### 3.2 Clinical Context

| Field | Description |
|---|---|
| Responsibility | Create purpose-limited, time-bound clinical and organisational context without filling unknowns. |
| Owns | Clinical Context snapshot, context gaps, context conflicts, relevance rationale. |
| Does not own | Evidence strength, clinical decision, source policy. |
| Core terms | Patient, Encounter, Clinical Context, Uncertainty, Provenance. |
| Inbound | Patient/journal/source data, user input, organisational context, authorization. |
| Outbound | Context snapshots to Reasoning, Risk, Decision Support, Documentation. |
| Constraints | Absence is not normality; high-risk signals must not be filtered away silently. |

### 3.3 Knowledge And Sources

| Field | Description |
|---|---|
| Responsibility | Identify, qualify and retrieve from allowed sources under policy. |
| Owns | Information Need, Retrieval Execution, Source Policy Binding, Retrieved Passage, Coverage, Limitation. |
| Does not own | Evidence Objects, clinical claims, source governance policy. |
| Core terms | Information Need, Knowledge Source, Source Policy, Provenance. |
| Inbound | Query, context, source policy, jurisdiction, authorization, decision time. |
| Outbound | Retrieved passages, source results, coverage and limitations to Evidence. |
| Constraints | Ranking is retrieval relevance only; failure, no coverage and conflicts remain explicit. |

### 3.4 Evidence

| Field | Description |
|---|---|
| Responsibility | Convert allowed source material into evidence objects with strength, scope, currency and conflict status. |
| Owns | Evidence, Evidence Item, evidence strength, evidence currency, evidence conflict. |
| Does not own | Retrieval ranking, clinical decision, human acceptance. |
| Core terms | Evidence, Evidence Item, Claim, Knowledge Source, Source Policy. |
| Inbound | Retrieved passages and source metadata from Knowledge and Sources. |
| Outbound | Evidence objects to Claims and Reasoning, Risk, Decision Support. |
| Constraints | Generative output is never authoritative evidence; contested/expired evidence may not silently drive high-risk suggestions. |

### 3.5 Claims And Reasoning

| Field | Description |
|---|---|
| Responsibility | Structure problems, hypotheses, assertions, support, counterevidence, alternatives and rationale. |
| Owns | Claim, Assertion, Hypothesis, rationale, support/counterevidence relation. |
| Does not own | Evidence source authority, final decisions, treatment. |
| Core terms | Claim, Assertion, Confidence, Uncertainty, Transformation. |
| Inbound | Clinical context and evidence objects. |
| Outbound | Hypotheses, alternatives and open questions to Risk and Decision Support. |
| Constraints | Non-trivial reasoning must preserve alternatives; missing reasoning lowers confidence or creates information need. |

### 3.6 Risk And Uncertainty

| Field | Description |
|---|---|
| Responsibility | Represent multidimensional clinical/system risk, material uncertainty, safety-netting and escalation need. |
| Owns | Risk Profile, Uncertainty Assessment, Safety Net, escalation semantics. |
| Does not own | Claims, evidence strength, recommendation or clinical decision. |
| Core terms | Risk, Uncertainty, Safety Net, Clinical Context. |
| Inbound | Claims, context, evidence, organisational constraints and hazards. |
| Outbound | Risk/uncertainty assessments to Workflow and Attention, Decision Support and Human Decision. |
| Constraints | Risk is not one hidden score; absence of data is not low risk; safety-netting identifies trigger, action, responsible actor and time. |

**Derivation:** SPEC defines CAP-RSK with independent inputs, outputs, invariants and dependencies. Keeping it inside Claims or Decision Support would duplicate ownership of risk and make escalation authority ambiguous after many pathways.

### 3.7 Workflow And Attention

| Field | Description |
|---|---|
| Responsibility | Represent adaptive consultation progression and determine when information may request attention. |
| Owns | Workflow state, stage transition semantics, work-item timing, interaction priority and suppression rationale. |
| Does not own | Clinical truth, recommendation content, risk meaning or final action authority. |
| Core terms | Consultation, Encounter, Information Need, Attention, Risk Profile. |
| Inbound | Clinical context, risk, attention and user state. |
| Outbound | Timing, priority and task context to Decision Support, Documentation and Patient Communication. |
| Constraints | Workflow is adaptive and non-wizard; interruption requires a documented protection function and must not hide high risk. |

### 3.8 Decision Support

| Field | Description |
|---|---|
| Responsibility | Turn context, claims, evidence and risk into understandable options without acquiring decision authority. |
| Owns | Recommendation, option set, recommendation rationale, no-action alternative and presentation-ready limitations. |
| Does not own | Evidence authority, Human Decision, action authorisation or workflow acceptance. |
| Core terms | Recommendation, AI Output, Uncertainty, Confidence, Human Decision. |
| Inbound | Claims, evidence, risk, patient goals and attention constraints. |
| Outbound | Recommendations to Human Decision and approved representations. |
| Constraints | Alternatives and uncertainty remain visible; display, default, silence or timeout never creates acceptance. |

### 3.9 Human Decision

| Field | Description |
|---|---|
| Responsibility | Capture explicit authorized human choices, rejections, modifications and rationale. |
| Owns | Human Decision, decision owner, decision time, alternatives considered, decision rationale. |
| Does not own | AI output, evidence strength, external action result. |
| Core terms | Decision, Human Decision, Recommendation, Audit Record. |
| Inbound | Recommendations, evidence, risk, patient goals and authorization. |
| Outbound | Decisions to Documentation, Action execution contexts, Audit and Learning. |
| Constraints | Display, silence, default or timeout is never decision; clinician control must be effective. |

### 3.10 Documentation And Patient Communication

| Field | Description |
|---|---|
| Responsibility | Create audience-specific, traceable representations of context, decisions, actions and safety-netting. |
| Owns | Documentation Draft, Patient Communication Draft, representation status and human amendments. |
| Does not own | Clinical facts, claims, recommendations, Human Decision or the external journal record. |
| Core terms | Documentation, Patient Communication, Provenance, Human Decision, Transformation. |
| Inbound | Context, recorded Human Decisions, authorised actions, safety-netting and user corrections. |
| Outbound | Review-required drafts to authorised users, patients and external record/action systems. |
| Constraints | No invented facts; clinically significant text requires authorised review; patient text preserves the approved plan, uncertainty and conditions. |

The shared context owns representation semantics. CAP-DOC and CAP-PCM remain separate capability contracts because their audiences and acceptance evidence differ.

### 3.11 Controlled Learning

| Field | Description |
|---|---|
| Responsibility | Turn feedback, outcomes, overrides, incidents and evaluation into controlled learning signals and change proposals. |
| Owns | Feedback Signal, Learning Hypothesis and Change Proposal. |
| Does not own | Production self-modification, governance approval or upstream artifact mutation. |
| Core terms | Feedback, Learning, Provenance, Verification Evidence, Governance Decision. |
| Inbound | Audit, outcomes, verification, incidents, complaints and subgroup/drift signals. |
| Outbound | Identified change proposals and research priorities to Governance. |
| Constraints | Feedback is not truth; observation, analysis, approval and production change remain separate and versioned. |

### 3.12 Governance

| Field | Description |
|---|---|
| Responsibility | Own normative hierarchy, lifecycle, gates, source policies, risk tier, exception handling and status. |
| Owns | Source Policy authority, governance status, risk tier, gate decision, policy decision. |
| Does not own | Clinical truth in a consultation, technical implementation. |
| Core terms | Source Policy, Capability Contract, Verification, Audit Record. |
| Inbound | Artifacts, issues, changes, incidents, evidence and review requests. |
| Outbound | Policy decisions and status constraints to all contexts. |
| Constraints | Governance approval is not regulatory conformity; contested/missing upstream authority blocks affected release after policy. |

### 3.13 Traceability

| Field | Description |
|---|---|
| Responsibility | Maintain bidirectional relations among sources, terms, contexts, capabilities, requirements, architecture, tests, releases and learning. |
| Owns | Trace relationship semantics and impact graph meaning. |
| Does not own | Audit record storage, verification conclusions, normative approval. |
| Core terms | Provenance, Transformation, Capability Contract, Verification. |
| Inbound | IDs, versions, dependencies, changes and verification links. |
| Outbound | Impact and coverage relations to Governance, Verification and Audit. |
| Constraints | No direct norm-to-implementation jump may hide missing PP/DP/ADR/LEX links. |

### 3.14 Verification

| Field | Description |
|---|---|
| Responsibility | Define and record whether requirements, contracts, invariants and scenarios were tested or reviewed under known conditions. |
| Owns | Verification evidence, test result semantics, pass/fail/blocked/untested meaning. |
| Does not own | Audit history, clinical validation approval, release approval. |
| Core terms | Verification, Evidence Artifact, Capability Contract, Acceptance Criterion. |
| Inbound | Requirements, acceptance catalogue, scenarios, system versions, data/evidence versions. |
| Outbound | Verification evidence to Governance, Traceability, Audit and Release Dossier. |
| Constraints | Passing tests do not establish clinical validity or production readiness. |

### 3.15 Audit

| Field | Description |
|---|---|
| Responsibility | Preserve immutable, integrity-protected reconstruction records for clinically or governance-significant chains. |
| Owns | Audit Record, audit integrity status, reconstruction reference. |
| Does not own | Clinical decision content, source policy, verification conclusion. |
| Core terms | Audit Record, Provenance, Human Decision, Transformation. |
| Inbound | Events, decisions, versions, policy evaluations, outputs and changes. |
| Outbound | Reconstruction records to reviewers, Governance, Learning and incident processes. |
| Constraints | Audit records must not rewrite history, overcollect data or become hidden performance management. |

## 4. Context Map

### 4.1 Logical Map

```text
Identity and Access ───────────────────────────────────────────────┐
      │                                                            │
      ▼                                                            │
Clinical Context ──► Claims and Reasoning ──► Risk and Uncertainty │
      │                     ▲                        │               │
      ▼                     │                        ▼               │
Knowledge and Sources ──► Evidence             Decision Support    │
                                                   │               │
Workflow and Attention ◄───────────────────────────┤               │
                                                   ▼               │
                                             Human Decision ◄──────┘
                                                   │
                                                   ▼
                                 Documentation and Patient Communication
                                                   │
                                                   ▼
                                          Controlled Learning

Governance constrains every context.
Traceability relates every significant artifact and dependency.
Audit records significant facts without owning functional state.
Verification evaluates explicit requirements and capability contracts.
```

The functional spine is intentionally one-way in authority, not necessarily in interaction: context informs reasoning; evidence supports or contests claims; risk constrains options; Decision Support produces recommendations; only Human Decision creates the clinical decision record. Feedback may create a new version or information need, but never rewrite prior meaning.

### 4.2 Relation Classifications

| Relation | Classification | Meaning |
|---|---|---|
| Identity and Access -> all contexts | Published language | All contexts consume actor, role, authorization and purpose semantics without owning them. |
| Clinical Context -> Claims and Reasoning | Upstream/downstream | Reasoning consumes context snapshots; it may create information needs but not rewrite context history. |
| Knowledge and Sources -> Evidence | Anti-corruption boundary | Retrieved passages and ranking must not cross as evidence strength or clinical truth. |
| Evidence -> Claims and Reasoning | Published language | Evidence objects publish source-bound support, limits and conflicts. |
| Claims and Reasoning -> Risk and Uncertainty | Published language | Risk consumes typed hypotheses/support without owning them. |
| Risk and Uncertainty -> Decision Support | Upstream/downstream | Decision Support consumes risk and safety-net semantics but cannot redefine them. |
| Claims and Reasoning -> Decision Support | Upstream/downstream | Decision Support consumes hypotheses, alternatives and rationale to form options. |
| Decision Support -> Human Decision | Anti-corruption boundary | Recommendations must remain separate from recorded human decisions. |
| Workflow and Attention <-> Decision Support | Partnership | Timing and actionability depend on workflow and risk, while recommendation content remains owned by Decision Support. |
| Human Decision -> Documentation and Patient Communication | Published language | Approved decision semantics are rendered for distinct audiences without acquiring new authority. |
| Audit/Verification -> Controlled Learning -> Governance | Upstream/downstream | Operational facts may produce change proposals; only governance may authorise controlled change. |
| Governance -> all contexts | Upstream policy | Governance statuses, gates, source policies and prohibitions constrain all contexts. |
| Traceability -> Governance/Verification/Audit | Shared kernel candidate | Trace semantics must be shared, but the authoritative registry is unresolved by GI-014. |
| Verification -> Governance | Upstream/downstream | Governance consumes verification evidence but does not treat test pass as clinical approval. |
| Audit <- all contexts | Published language | Contexts publish auditable events; Audit owns reconstruction, not functional processing. |

### 4.3 Required Domain Flows

| Question | Domain answer |
|---|---|
| Where does clinical context come from? | Clinical Context synthesizes purpose-limited snapshots from patient/journal/user/organisational sources under Identity and Access constraints. |
| Where is evidence established? | Evidence context establishes Evidence Items from allowed source material. Knowledge and Sources only retrieves. |
| Where do claims arise? | Claims and Reasoning forms Claims and candidate Assertions from Clinical Context and Evidence, preserving uncertainty and alternatives. |
| Where does human decision authority live? | Human Decision context records explicit authorized human choices. It consumes recommendations but is not produced by them. |
| How does governance affect all contexts? | Governance publishes statuses, source policies, risk tier, gates, prohibitions and contested authority effects. |
| How are audit and traceability separated? | Traceability models relationships and impact. Audit preserves immutable reconstruction records. Neither performs functional clinical processing. |

## 5. Core Domain Model

### 5.1 Entities, Value Objects, Aggregates, Records And Artifacts

The `Type` column is a domain classification, not a persistence choice. Directly sourced objects retain SPEC meaning; aggregates and most records are architectural derivations used to protect that meaning.

| Name | Type | Responsibility | Identity | Key properties | Invariants | Lifecycle | Owner |
|---|---|---|---|---|---|---|---|
| Actor | Entity | Represents a responsible participant. | Stable actor/role reference. | Role, authorization scope, organisation, status. | Cannot be inferred from display label alone. | Created, active, changed, revoked. | Identity and Access. |
| Patient | Entity | Represents the person whose care is at stake. | Patient identity in external clinical context. | Goals, preferences, relevant context references. | Never merely data object or optimisation unit. | Context-dependent; external patient master not owned by Cortex. | Clinical Context, with external source authority. |
| Consultation | Aggregate | Bounds a clinical meeting and related preparation/follow-up. | Consultation reference. | Patient, participants, purpose, phase, problems, context refs, decision/action refs. | Clinical decision remains human; documentation is derived. | Prepared, active, closed, amended, reviewed. | Clinical Context, with Workflow transitions. |
| Encounter | Record | Compatibility representation used by current software for consultation state and derived behaviour. | Encounter reference linked to Consultation. | Pathway, explicit answers, derived outputs, validation state. | Must not become a competing source of clinical truth. | Created, validated, active, closed, superseded. | Current architecture; future ownership unresolved. |
| Clinical Context Snapshot | Record | Time-bound, purpose-limited context. | Snapshot reference and decision time. | Sources, data quality, gaps, conflicts, provenance. | Missing does not mean normal. | Created, superseded, contested, archived. | Clinical Context. |
| Information Need | Entity | Declares a knowledge or context gap. | Need reference. | Purpose, scope, requester, urgency, related claim/workflow. | Need is not claim or evidence. | Declared, refined, fulfilled, unresolved, retired. | Requesting context; often Claims/Workflow. |
| Knowledge Source | Entity | Identifiable source candidate. | Source identity and version. | Type, jurisdiction, status, publisher, validity. | Popularity is not authority. | Current, expired, contested, retired. | Governance/source owner. |
| Source Policy | Policy | Determines source eligibility by use case, jurisdiction and time. | Policy ID/version. | Allowed classes, statuses, validity, conflict rules. | No default-to-allow. | Draft, review, ratified/active, superseded, retired, contested. | Governance. |
| Retrieval Execution | Aggregate | One policy-bound knowledge retrieval invocation. | Execution reference. | Query, context, policy binding, sources, coverage, outcome. | Produces retrieval outcome, not evidence or decision. | Requested, qualified, executed, completed/degraded/failed, audited. | Knowledge and Sources. |
| Evidence Item | Evidence Artifact | Source-bound support for claims. | Evidence item reference. | Source, version, scope, strength, currency, limitation. | AI output is not authoritative evidence. | Draft/review/accepted/contested/retired according to evidence governance. | Evidence. |
| Claim | Entity | Typed proposition with support, authority and uncertainty. | Claim reference. | Type, assertion text, evidence links, confidence, status. | Cannot silently become decision. | Formed, revised, accepted, contested, retired. | Claims and Reasoning. |
| Risk Profile | Record | Represents multidimensional risk and relevant uncertainty for a purpose and time. | Profile reference/version. | Severity, probability, horizon, reversibility, bearer, uncertainty, escalation. | Missing data is not low risk; dimensions cannot be hidden in one score. | Assessed, revised, superseded, contested. | Risk and Uncertainty. |
| Recommendation | Entity | Proposed option with rationale and uncertainty. | Recommendation reference. | Options, rationale, strength, alternatives, no-action option. | Must remain distinct from Human Decision. | Generated, shown, accepted/rejected/modified by human, expired. | Decision Support. |
| Human Decision | Aggregate | Authorized human choice and rationale. | Decision reference. | Actor, time, option, rationale, alternatives, consequence. | Display/silence/default/timeout is not acceptance. | Drafted, recorded, amended, contested, superseded. | Human Decision. |
| Action | Entity | Represents an authorised, planned, performed, interrupted or delegated activity. | Action reference. | Actor, authority, status, deadline, safety net, result. | Recommendation is not authorisation; execution result must be confirmed. | Planned, authorised, requested, performed/failed/cancelled, reviewed. | Human Decision for authorisation; executing system owns outcome. |
| Documentation Draft | Record | Draft clinical or patient-facing representation. | Draft reference/version. | Content, source contributions, manual edits, review status. | Draft requires authorized review before final use. | Generated, edited, stale, reviewed, approved/exported, superseded. | Documentation context/CAP-DOC. |
| Patient Communication Draft | Record | Audience-specific representation of an approved plan, uncertainty and safety net. | Draft reference/version. | Audience needs, source decision, conditions, critical actions, review state. | Must not alter clinical meaning or create false assurance. | Generated, reviewed, approved, delivered, superseded. | Documentation and Patient Communication/CAP-PCM. |
| Transformation Record | Record | Identifies a meaning-relevant derivation from input to output. | Transformation reference. | Input refs, output refs, method/version, rationale, limitations. | Must preserve type/provenance/authority. | Recorded, replayed, contested, superseded. | Producing context; related by Traceability. |
| Verification Evidence | Evidence Artifact | Records observed verification against requirement/contract. | Verification evidence reference. | Requirement version, system version, data/evidence version, result. | Passing test is not clinical validation by default. | Planned, executed, passed/failed/blocked/untested, reviewed. | Verification. |
| Audit Record | Record | Append-only reconstruction record. | Audit reference. | Events, versions, actor, policy, integrity, retention scope. | Must not rewrite history. | Created, sealed, accessed, retained, disposed under policy. | Audit. |
| Feedback Signal | Record | Captures an observed correction, outcome, complaint, override, near miss or drift signal. | Signal reference. | Source, population, bias, maturity, related artifact/outcome. | Is not automatic truth or permission to change production. | Observed, qualified, analysed, closed/superseded. | Controlled Learning. |
| Change Proposal | Entity | Proposes a controlled change based on identified evidence and impact. | Proposal reference. | Rationale, affected artifacts, evidence, risk, rollback, required authority. | Cannot modify production or governance before approval. | Raised, reviewed, accepted/rejected, implemented, verified, closed. | Controlled Learning; approval by Governance. |
| Capability Contract | Record | Defines logical capability responsibility and failure behavior. | Capability ID/version. | Inputs, outputs, dependencies, invariants, limitations and failure states. | Components may split/merge only without contract loss. | Draft/review/ratified/active/superseded/contested. | Governance/Architecture. |

### 5.1.1 Model provenance

| Classification | Elements | Rationale |
|---|---|---|
| Direct source-derived | Patient, Consultation, Risk, Uncertainty, Evidence, Decision, Action, Documentation, Feedback, Learning, Provenance | SPEC §§3–4. |
| Architecturally derived | Clinical Context Snapshot, Information Need, Retrieval Execution, Evidence Item, Claim, Risk Profile, Recommendation, Human Decision, documentation/communication drafts, Transformation Record, Verification Evidence, Audit Record, Feedback Signal, Change Proposal, Capability Contract | Required to allocate SPEC capability contracts, authority, provenance and consistency boundaries. |
| Candidate | Assertion as a distinct object; Encounter as a durable common-domain object; Case as a universal container | Source semantics are insufficient or current-architecture terminology conflicts with SPEC/WF vocabulary. |
| Assumption | None used as an authorising model element | Unsupported propositions remain issues, not model facts. |

### 5.2 Core Value Objects

| Value Object | Responsibility | Key properties | Invariants | Used by |
|---|---|---|---|---|
| Purpose | Defines why information is processed or a capability is invoked. | Use case, clinical/organisational purpose, scope. | Cannot be widened silently after processing starts. | Identity, Clinical Context, Knowledge. |
| Authorization Scope | Defines what an actor may do for a purpose. | Actor ref, role, permission, scope, validity. | Label is not authority; invalid scope blocks or degrades. | Identity, Human Decision, Audit. |
| Decision Time | Time at which context, policy, source and evidence meaning must be reproducible. | Timestamp, time authority, effective interval. | Later source status cannot rewrite historical meaning. | Clinical Context, Retrieval, Audit. |
| Source Identity | Stable reference to a source independent of a retrieved passage. | Publisher, source ref, version/effective interval, status. | Popularity and ranking cannot create identity or authority. | Knowledge, Evidence. |
| Source Type | Semantic category of source authority. | Local instruction, general evidence, organisational norm, registry source. | Local and general sources must remain distinguishable. | Knowledge, Evidence, Governance. |
| Evidence Strength | Method- and scope-bound support level. | Strength, method, population, currency, limitation. | Not equivalent to recommendation strength or clinical truth. | Evidence, Claims, Decision Support. |
| Confidence Statement | Stated support for a claim or recommendation within a method. | Basis, confidence level, uncertainty, affected scope. | Must not hide missing evidence or conflict. | Claims, Decision Support. |
| Provenance Reference | Link to origin, transformation and authority lineage. | Source, actor/system, transformation, version, time. | Must survive summaries and formatting. | All contexts. |
| Governance Status | Controlled lifecycle or policy status. | Status, effective time, authority, affected scope. | Missing/contested/inactive status cannot be treated as active. | Governance, Knowledge, Traceability. |
| Verification Result | Observed outcome of a verification case. | Pass/fail/blocked/untested, method, versions, limitations. | Untested is not pass; pass is not clinical validation by default. | Verification, Governance. |

### 5.3 Core Relations

| Relation | Meaning | Authority rule |
|---|---|---|
| Patient participates in Consultation | Clinical work is organized around the person and consultation, not around data artifacts. | Patient dignity and clinical purpose outrank documentation convenience. |
| Consultation has Clinical Context Snapshots | Context is time- and purpose-bound. | Later context does not silently rewrite earlier decisions. |
| Clinical Context declares Information Need | Missing or unclear information becomes explicit. | Need is not evidence or claim. |
| Information Need triggers Retrieval Execution | Retrieval is scoped by purpose, policy, jurisdiction and time. | CAP-KNR may retrieve, not decide truth. |
| Retrieval Execution returns Retrieved Passages | Retrieved source material is available for evidence handling. | Passage is not Evidence Item until CAP-EVD validates it. |
| Evidence Item supports or contests Claim | Evidence is related to a typed proposition. | Support, conflict and limitation remain visible. |
| Claim informs Recommendation | Reasoning may produce options. | Recommendation is not decision. |
| Recommendation may be accepted, rejected or modified into Human Decision | Human authority changes recommendation state. | Only explicit authorized human action creates clinical decision. |
| Human Decision informs Documentation Draft and Actions | Documentation and execution follow authorized choice. | Draft or action cannot invent decision authority. |
| Verification Evidence evaluates Capability Contract or requirement | Review/test evidence links to a specified claim of behavior. | Verification scope must be explicit and traceable. |
| Audit Record reconstructs significant chains | Independent review can inspect what happened. | Audit is append-only and does not own functional truth. |

### 5.4 Domain events

The authoritative event inventory is maintained once in §8. Core objects reference those events; this section deliberately does not duplicate the inventory.

## 6. Aggregate Boundaries

Aggregates protect logical consistency. They are not database aggregates.

### 6.1 Consultation Aggregate

| Field | Description |
|---|---|
| Aggregate root | Consultation |
| Internal objects | Purpose, participant references, workflow phase, Clinical Context Snapshot references, active information needs, decision references and action references. Claims, evidence and drafts remain external aggregates/records. |
| Transactional invariants | Consultation cannot record a clinical decision without Human Decision reference; hidden defaults cannot create clinical facts; stale context must be visible or invalidated. |
| Allowed changes | Add explicit facts, update context snapshot, create information need, link recommendation, record human decision, generate draft. |
| Forbidden changes | Treat absence as normality, overwrite human decision with recommendation, silently remove contradictory context. |
| External references | Patient, Encounter compatibility record, claims/evidence, documentation drafts, external journal and audit records. |
| Trust boundaries | External clinical data into Cortex; user input into context; Cortex draft out to journal. |

### 6.2 Retrieval Execution Aggregate

| Field | Description |
|---|---|
| Aggregate root | Retrieval Execution |
| Internal objects | Retrieval Request, Source Policy Binding, Source Candidate, Retrieved Passage, Ranked Source Result, Coverage Assessment, Retrieval Limitation, Source Conflict Record, Retrieval Outcome. |
| Transactional invariants | Every result is policy-bound; no retired source as current; ranking is not authority; failure/no coverage is explicit. |
| Allowed changes | Qualify request, bind policy, consult eligible source, assemble outcome, publish trace. |
| Forbidden changes | Create Evidence Item, choose clinical truth, use unapproved source by fallback, hide dependency failure. |
| External references | Source Registry, Source Policy, CAP-AUD audit reference, downstream consumer. |
| Trust boundaries | External source content into retrieval; retrieval outcome to Evidence. |

### 6.3 Evidence Case Aggregate

| Field | Description |
|---|---|
| Aggregate root | Evidence Case |
| Internal objects | Evidence Items, source support, conflict records, evidence scope, currency, limitations. |
| Transactional invariants | Evidence must be source-bound; contested/expired evidence status must propagate; generative output cannot be source authority. |
| Allowed changes | Add evidence item, revise strength/scope/currency, mark conflict, retire evidence. |
| Forbidden changes | Collapse conflict into consensus without policy; convert retrieved passage to evidence without CAP-EVD validation. |
| External references | Knowledge Source, Retrieval Execution, Claims. |
| Trust boundaries | Retrieved material into evidence governance; evidence to reasoning. |

### 6.4 Claim Set Aggregate

| Field | Description |
|---|---|
| Aggregate root | Claim Set |
| Internal objects | Claims, assertions, supporting/refuting evidence refs, confidence, uncertainty, alternatives. |
| Transactional invariants | Claims are typed; support and uncertainty are preserved; recommendation and decision remain external. |
| Allowed changes | Form claim, revise claim, contest claim, link evidence, create information need. |
| Forbidden changes | Register clinical decision; hide missing support; delete alternatives in non-trivial reasoning without rationale. |
| External references | Clinical Context, Evidence Case, Recommendation. |
| Trust boundaries | Evidence into reasoning; reasoning to decision support. |

### 6.5 Risk Assessment Aggregate

| Field | Description |
|---|---|
| Aggregate root | Risk Assessment |
| Internal objects | Risk Profile, Uncertainty Assessment, hazards, Safety Net and escalation need. |
| Transactional invariants | Severity, probability, horizon, reversibility and bearer remain explicit; missing data is not low risk; material uncertainty may alter timing, recommendation or escalation. |
| Allowed changes | Assess, revise with new context/evidence, record uncertainty, create or revise safety net, supersede with preserved history. |
| Forbidden changes | Collapse risk to an unexplained scalar, suppress serious signals because confidence is low, create clinical decision. |
| External references | Claim Set, Evidence Case, Clinical Context Snapshot, Governance policy. |
| Trust boundaries | Claims/evidence into risk interpretation; risk semantics into attention and decision support. |

### 6.6 Recommendation Package Aggregate

| Field | Description |
|---|---|
| Aggregate root | Recommendation |
| Internal objects | Option set, rationale, benefits/harms, uncertainty, recommendation strength, next step and no-action alternative. |
| Transactional invariants | Recommendation remains distinguishable from Decision and Action; alternatives and material uncertainty remain available; no hidden autoaccept. |
| Allowed changes | Generate, revise on upstream change, present, expire, record human response reference. |
| Forbidden changes | Record itself as accepted, modify Human Decision, authorise external action. |
| External references | Claim Set, Risk Assessment, Evidence Items, Human Decision. |
| Trust boundaries | System/AI-supported proposal into human review. |

### 6.7 Human Decision Aggregate

| Field | Description |
|---|---|
| Aggregate root | Human Decision |
| Internal objects | Decision option, actor authorization reference, rationale, alternatives, decision time, consequence. |
| Transactional invariants | Authorized human actor required; recommendation may be input but not root; acceptance must be explicit and traceable. |
| Allowed changes | Record, amend, contest or supersede decision with audit trail. |
| Forbidden changes | Auto-create from display, silence, default, timeout or AI output. |
| External references | Recommendations, evidence, patient goals, audit. |
| Trust boundaries | Human authority into system record; system support into human decision. |

### 6.8 Representation Draft Aggregate

| Field | Description |
|---|---|
| Aggregate root | Representation Draft |
| Internal objects | Documentation Draft or Patient Communication Draft, source contribution references, human amendments and review status. |
| Transactional invariants | Draft content cannot create facts or decisions; provenance survives summarisation; clinically significant content requires authorised review before final use. |
| Allowed changes | Generate, edit, mark stale, review, approve for bounded use, supersede. |
| Forbidden changes | Sign automatically, convert text edits into clinical truth, hide system contribution or discarded content lineage. |
| External references | Clinical Context, Human Decision, Action, external journal/communication channel, Audit. |
| Trust boundaries | Derived system content to human; approved representation to external record or patient. |

### 6.9 Verification Case Aggregate

| Field | Description |
|---|---|
| Aggregate root | Verification Case |
| Internal objects | Requirement reference, scenario, expected result, observed result, environment, versions, reviewer, limitations. |
| Transactional invariants | Test evidence must identify requirement/system/data/evidence versions; untested is not passed; passing is not clinical validation unless the protocol says so. |
| Allowed changes | Plan scenario, execute, record result, mark blocked/untested, link issue. |
| Forbidden changes | Replace missing evidence with assumption; average away safety blockers. |
| External references | Requirements, capabilities, releases, audit. |
| Trust boundaries | Test environment evidence into governance/release reasoning. |

### 6.10 Audit Trail Aggregate

| Field | Description |
|---|---|
| Aggregate root | Audit Trail |
| Internal objects | Audit entries, integrity status, actor/time refs, reconstruction references, retention classification. |
| Transactional invariants | Append-only; no history rewrite; purpose-limited access; integrity/failure visible. |
| Allowed changes | Append entry, seal segment, record access, mark integrity/dependency failure. |
| Forbidden changes | Mutate past entries; overcollect by default; use audit silently for secondary performance management. |
| External references | All contexts, retention policy, identity authority. |
| Trust boundaries | Functional event to audit record; audit record to reviewer/governance. |

## 7. Domain Invariants

All invariants are **direct source-derived constraints** or conservative **architectural derivations** that combine the cited constraints. They have no new repository-wide IDs pending GI-013.

| Invariant | Classification | Upstream reference |
|---|---|---|
| Provenance must not be lost across transformations. | Direct source-derived | SPEC INF-001/002; SAB AP-006; GTA §2. |
| Source, Retrieved Passage, Evidence Item and Claim must remain distinct; each transition changes meaning and owner. | Architecturally derived | SPEC SYS-003, CAP-EVD and CAP-KNR; CA-001 §§2–3. |
| AI Output must not appear as Human Decision, Evidence or clinical authority. | Direct source-derived | SPEC PRO-002/003/007; SAB AP-003. |
| Uncertainty, conflict, missing context and degraded dependencies must remain representable and visible. | Direct source-derived | SPEC §21, PRO-001/008; SAB AP-004/AP-008. |
| Meaning-relevant Transformations must be identifiable, versioned and replayable or explicitly variable within an approved boundary. | Direct source-derived | SPEC INF-002, NFR-REL-001; SAB AP-006. |
| Audit Records are append-only reconstruction aids and must not rewrite functional history. | Architecturally derived | SPEC CAP-AUD, NFR-AUD-001 and INF-005; GTA §§1–2. |
| Verification Evidence must link to the requirement, contract, scenario and versions it claims to verify. | Direct source-derived | SPEC TRC-002 and §27; GTA §4. |
| Missing evidence, missing context or empty retrieval must not be represented as negative evidence or clinical absence. | Architecturally derived | SPEC PRO-007/008 and CAP-KNR; SAB AP-004; RFC-005 INV-001/007. |
| Human authority is explicit where required; display, silence, defaults and timeout are never acceptance. | Direct source-derived | SPEC decision invariant, CAP-DSU-001 and AT-DSU-01; SAB AC-001/002. |
| Recommendation, Decision and Action remain separate states with explicit authority transitions. | Direct source-derived | SPEC SYS-011, §20 and CAP-DSU; SAB AC-004. |
| Governance status constrains use; contested, expired, missing or inactive authority cannot silently drive release or high-risk output. | Direct source-derived | GOV §§3/6; SPEC CAP-GOV-003; GI-011/GI-018. |
| Capability contracts survive any later component or service allocation. | Direct source-derived | SPEC capability rule and EXT-001; SAB AP-009/AC-008. |
| Clinical documentation remains a draft until reviewed or approved by an authorised user under the relevant workflow. | Direct source-derived | SPEC CAP-DOC-001; CSP. |
| Clinical reasoning must not be hidden in generic UI, model output, retrieval ranking or integration plumbing. | Architecturally derived | ENG invariant 4; SPEC capability rule and PRO-012; SAB AC-007. |

## 8. Domain Events

The event list is **architecturally derived** from source-defined state transitions and the bounded contexts above. Event names are candidate published language pending LEX/ADR review. They do not choose an event bus, queue, schema or persistence technology.

| Event | Triggering occurrence | Meaning | Producing context | Potential receivers | Provenance required |
|---|---|---|---|---|---|
| InformationNeedDeclared | A gap must be answered for a bounded purpose. | A scoped question exists. | Clinical Context, Claims, Workflow. | Knowledge, Evidence, Audit. | Purpose, scope, actor/system, time, related case. |
| ContextSnapshotCreated | Relevant context is assembled. | A reproducible context state exists. | Clinical Context. | Claims, Risk, Decision Support, Documentation. | Sources, versions, missing/conflict status, decision time. |
| SourceDiscovered | A possible source is identified. | Candidate exists before eligibility. | Knowledge and Sources. | Governance, Audit. | Source identity candidate, discovery source, time. |
| SourceAccepted | Source is eligible under policy. | Source may be consulted for scope. | Knowledge and Sources. | Evidence, Audit. | Source identity/version/status, policy binding. |
| SourceRejected | Source cannot be used. | Source is excluded or degraded for scope. | Knowledge and Sources/Governance. | Traceability, Audit, Evidence. | Rejection reason, policy/status/integrity basis. |
| EvidenceExtracted | Evidence Item is created from allowed source material. | Source support is formalized. | Evidence. | Claims, Decision Support. | Source, method, reviewer/policy, scope. |
| ClaimFormed | A typed assertion is made. | Claim exists with support/uncertainty. | Claims and Reasoning. | Decision Support, Documentation, Audit. | Inputs, evidence refs, transformation, confidence. |
| ClaimRevised | Claim text, support, status or scope changes. | Downstream meaning may change. | Claims and Reasoning. | Traceability, Verification, Documentation. | Previous/new state, reason, actor/system, time. |
| UncertaintyRecorded | Unknown, conflict or limitation is identified. | Uncertainty is explicit. | Any context. | Risk, Decision Support, Documentation. | Type, affected scope, source, time. |
| RiskAssessmentRevised | New context, evidence or time changes a Risk Assessment. | Risk/uncertainty meaning changed and downstream artifacts may be stale. | Risk and Uncertainty. | Workflow and Attention, Decision Support, Traceability. | Previous/new profile refs, inputs, rationale, assessor/process, time. |
| RecommendationIssued | A suggestion or option is generated. | Recommendation exists, not decision. | Decision Support. | Human Decision, Audit. | Inputs, rationale, alternatives, uncertainty, version. |
| HumanReviewRequested | Human authority must evaluate. | Review is required before transition. | Decision Support, Governance, Verification. | Human Decision, Workflow. | Reason, required role, urgency, scope. |
| HumanDecisionRecorded | Authorized choice is explicitly captured. | Human Decision exists. | Human Decision. | Documentation, Audit, Workflow. | Actor, authorization, alternatives, rationale, time. |
| ActionAuthorized | A Human Decision authorises a bounded external or organisational action. | Permission to request execution exists; execution is not yet proved. | Human Decision. | Workflow, external action adapter, Documentation, Audit. | Decision ref, actor/mandate, action scope, time, constraints. |
| ActionOutcomeRecorded | An executing actor/system reports success, failure, interruption or delegation. | Action state changed; the clinical decision itself is not rewritten. | Executing boundary / Workflow. | Clinical Context, Documentation, Audit, Learning. | Action ref, executor, request/result time, status, failure/confirmation evidence. |
| RepresentationDraftPrepared | A clinical or patient-facing draft is derived. | Review-required representation exists. | Documentation and Patient Communication. | Authorised reviewer, Audit. | Inputs/versions, transformation, system contribution, uncertainty, intended audience/use. |
| VerificationCompleted | Scenario/test/review ends. | Verification evidence exists. | Verification. | Governance, Traceability, Audit. | Requirement, versions, method, result, limitations. |
| AuditEntryCreated | Auditable domain change is recorded. | Reconstruction chain updated. | Audit. | Governance, reviewer. | Source event, actor/time, integrity, retention. |
| ControlledChangeProposed | Qualified feedback/evidence indicates a possible controlled change. | A proposal exists; production behaviour has not changed. | Controlled Learning. | Governance, Architecture, Product, Verification. | Signal/evidence refs, affected artifacts, risk, proposed scope, author/time. |
| GovernanceStatusChanged | An authorised governance decision changes an artifact, policy or source status. | Use eligibility and downstream impact may have changed. | Governance. | Traceability, Knowledge and Sources, Evidence, Verification, Controlled Learning. | Previous/new status, authority, decision record, effective time, scope and rationale. |
| GovernanceIssueRaised | Ambiguity/gap/conflict needs governance resolution. | Issue constrains downstream work. | Any context/Governance. | Governance, Architecture, Traceability. | Issue scope, source, affected artifacts, severity. |

## 9. Capability Mapping

### 9.1 Capability To Bounded Contexts

| Capability | Primary bounded context and owned information | Reads / influences | Decision authority | Provenance and verification need |
|---|---|---|---|---|
| CAP-CTX — Context Engine | Clinical Context; snapshots, gaps and conflicts | Reads authorised clinical/organisational sources; informs RSN, RSK, DSU and DOC | May filter/structure under contract; cannot decide truth or clinical action | Reproducible source/time/relevance trace; CAP-CTX-001–003, AT-CTX-01 |
| CAP-KNR — Knowledge Retrieval | Knowledge and Sources; Retrieval Execution and source results | Reads Information Need, policy, context; supplies passages to EVD | May enforce source eligibility/ranking policy; cannot establish evidence strength or clinical meaning | Policy/source/version/coverage/failure trace; CAP-KNR-001–003, AT-KNR-01 |
| CAP-EVD — Evidence Service | Evidence; Evidence Items, strength, currency and conflict | Reads retrieval results and policy; supports Claims, Risk and DSU | May establish evidence status under governance; cannot decide patient care | Source/method/scope/strength/conflict trace; CAP-EVD-001–003, AT-EVD-01 |
| CAP-RSN — Reasoning Engine | Claims and Reasoning; Claim Set, hypotheses, rationale and alternatives | Reads Context and Evidence; informs Risk and DSU | May structure/prioritise hypotheses; has no clinical decision authority | Input/evidence/transformation/alternative trace; CAP-RSN-001–003, AT-RSN-01 |
| CAP-RSK — Risk & Uncertainty Service | Risk and Uncertainty; Risk Assessment and Safety Net | Reads Context, Claims and Evidence; constrains Attention and DSU | May classify risk/escalation under approved contract; cannot decide treatment | Dimension/rationale/uncertainty/bearer trace; CAP-RSK-001–003, AT-RSK-01 |
| CAP-ATT — Attention Manager | Workflow and Attention; timing, priority and suppression rationale | Reads risk, workflow and user state; influences interaction timing | May select permitted interaction timing; cannot suppress required protection or create clinical decision | Protection function, risk/input and suppression trace; CAP-ATT-001–003, AT-ATT-01 |
| CAP-DSU — Decision Support | Decision Support; Recommendation and option set | Reads Claims, Risk, Evidence and Attention; informs Human Decision | May generate suggestions; cannot accept, decide or authorise action | Rationale/evidence/risk/alternatives/uncertainty trace; CAP-DSU-001–003, AT-DSU-01 |
| CAP-DOC — Documentation Assistant | Documentation and Patient Communication; Documentation Draft | Reads Context, Human Decisions, Actions and relevant DSU output | May draft; authorised user approves clinically significant text | Contribution/transformation/edit/review trace; CAP-DOC-001–003, AT-DOC-01 |
| CAP-PCM — Patient Communication | Documentation and Patient Communication; Patient Communication Draft | Reads approved decision/plan, safety net, evidence and patient needs | May draft loyal explanation; clinical approval remains human | Decision/plan/audience/uncertainty/delivery trace; CAP-PCM-001–003, AT-PCM-01 |
| CAP-LRN — Learning Engine | Controlled Learning; Feedback Signal, Learning Hypothesis and Change Proposal | Reads Audit, Verification, outcomes and incidents; informs Governance | May propose change; cannot change production or approve itself | Signal/population/bias/evidence/impact trace; CAP-LRN-001–003, AT-LRN-01 |
| CAP-AUD — Audit Engine | Audit; Audit Records and reconstruction | Receives significant facts from all contexts; informs Governance/Learning | Records and exposes integrity status; does not approve functional truth | Actual-version reconstruction and failure evidence; CAP-AUD-001–003, AT-AUD-01 |
| CAP-GOV — Governance Engine | Governance; policy, status, risk tier, gates and prohibitions | Reads trace/issues/artifacts/audit; constrains all contexts | Competent human governance authority approves; engine may enforce but not self-ratify or claim conformity | Decision owner/rationale/status/effective-time/impact trace; CAP-GOV-001–003, AT-GOV-01 |

The mapping is **direct source-derived** for capability identity, contract and acceptance references. Bounded-context placement is **architecturally derived**. Identity and Access, Workflow, Human Decision, Traceability and Verification are necessary domain responsibilities without separate capability IDs in SPEC; this is a visible ownership gap, not permission to invent capabilities.

### 9.2 CAP-KNR Validation Case

CA-001 remains valid within this domain architecture if the following mappings hold:

| CA-001 concept | Domain placement | Validation result |
|---|---|---|
| Retrieval Execution | Knowledge and Sources aggregate. | Valid. |
| Retrieval Request | Information Need plus request qualification inside Retrieval Execution. | Valid, but Information Need is broader than CAP-KNR. |
| Source Policy Binding | Governance-owned policy reference consumed by Knowledge and Sources. | Valid. |
| Retrieved Passage | Knowledge and Sources output, not Evidence. | Valid and important anti-corruption boundary. |
| Ranked Source Result | Retrieval relevance under policy. | Valid; must not be Claim/Evidence/Recommendation. |
| Coverage/Limitation | Retrieval outcome semantics. | Valid; downstream must preserve no-coverage vs negative evidence. |
| Audit Trace Reference | Reference to Audit, not audit ownership. | Valid. |

### 9.3 Overlaps And Gaps

| Finding | Classification | Consequence | Resolution route |
|---|---|---|---|
| SPEC has capability IDs but no capabilities for Identity/Access, Workflow, Human Decision, Traceability or Verification. | Architecture issue | Responsibility could be hidden inside unrelated components or capabilities. | Logical responsibility architecture and later capability-gap review; do not invent capability IDs here. |
| Traceability and Audit are often conflated. | Architecture issue | Mutable impact relationships could be mistaken for immutable historical records. | ADR candidate: Traceability–Audit boundary. |
| Evidence and Claim are adjacent and CAP-EVD's wording says it manages clinical statements as evidence objects. | Domain issue | Retrieved/generated text may be upgraded too early, or Evidence may absorb Claim ownership. | LEX plus ADR candidate: Source–Evidence–Claim transitions. |
| Claim and Assertion lack a source-defined lifecycle boundary. | Domain issue | Two names may duplicate one concept or conceal different authority. | LEX decision before Assertion becomes a durable object. |
| Consultation and Encounter coexist across normative and current architecture. | Domain/Architecture issue | State and lifecycle may split into competing models. | LEX/ADR compatibility decision; retain explicit mapping meanwhile. |
| Governance and regulatory/QMS boundary is unresolved. | Governance issue | CAP-GOV cannot approve conformity or clinical release alone. | GI-016. |
| Human Decision and Workflow/Action state can be conflated. | Architecture issue | An action may appear authorised before an explicit human decision. | ADR candidate: Decision–Action transition semantics. |
| Capability IDs exist, but document/architecture IDs remain TODO. | Governance issue | Canonical bidirectional registry cannot be completed. | GI-013/GI-014. |
| Status `Proposed` remains unmapped. | Governance issue | Existing architecture artifacts have unclear lifecycle position. | GI-018. |

## 10. Decision Authority Model

Clinical Decision, Recommendation and Action authority is **direct source-derived** from SPEC §20 and PRO-003. System/AI output, workflow routing, verification conclusion and audit recording are **architecturally derived allocations**. Concrete owners and approving bodies remain unresolved under GI-012/GI-014.

| Decision-like type | Created by | Approved by | Changed by | Required provenance | Automatic? |
|---|---|---|---|---|---|
| System-generated information | Relevant capability under contract. | Not approved as truth; consumed under context. | Producing capability through versioned transformation. | Input refs, transformation, version, limitations. | Yes, if contract permits. |
| AI-generated output | Approved AI/model process within capability scope. | Human or governance review if clinically significant. | Controlled generation or human edit with audit. | Model/prompt/config/version, inputs, uncertainty. | Yes as output, never as decision. |
| Evidence claim | CAP-EVD/evidence process. | Unresolved evidence authority under GI-012/GI-014; must follow source/evidence policy. | Controlled evidence process with preserved history. | Source, version, method, scope, strength, conflict. | Partly, if an approved evidence policy permits; never a clinical decision. |
| Recommendation | CAP-DSU. | Not approved until human evaluates; high-risk may require governance/safety constraints. | DSU generation or human modification. | Evidence, reasoning, risk, alternatives, uncertainty. | Can be generated automatically; cannot auto-accept. |
| Workflow decision | Workflow/user depending on type. | Authorized user or workflow policy. | Authorized actor or workflow logic under contract. | Stage, actor/system, reason, time. | Low-risk workflow routing may be automatic if not clinical decision. |
| Clinical decision | Identified authorized clinician or role. | Same authorized human within mandate; possibly shared decision process. | Authorized human amendment with audit. | Actor, authorization, rationale, alternatives, time. | No. |
| Governance decision | Competent governance owner/body. | Approving body per GOV. | Controlled governance process. | Artifact, status, rationale, dissent, effective time. | No for approvals; automated checks may block. |
| Verification conclusion | Verification process/reviewer. | Verification owner or release gate as applicable. | Re-run or corrected review with history. | Scenario, requirement/system/data versions, environment, result. | Test execution may be automatic; conclusion scope must be explicit. |
| Audit record | Audit context from auditable event. | Not approved as truth; integrity controlled. | Append-only correction event, never rewrite. | Event source, actor/time, integrity, retention. | Yes, for recording. |

## 11. Trust And Boundary Analysis

| Boundary crossing | Risk | Required domain control |
|---|---|---|
| External clinical data -> Clinical Context | Source data may be stale, incomplete or wrong. | Preserve source, time, quality, conflict and missing state. |
| User input -> Clinical Context | User may enter hypothesis, note or patient-reported statement with different authority. | Type input by origin and clinical status; do not upgrade by placement. |
| External source -> Knowledge and Sources | Content is not trustworthy merely because available. | Source identity, version, policy and integrity assessment. |
| Knowledge and Sources -> Evidence | Retrieval relevance could become evidence strength. | Anti-corruption boundary: CAP-EVD must validate evidence. |
| Evidence -> Claims | Evidence support may be overstated. | Preserve scope, strength, currency, limitation and conflict. |
| Claims -> Recommendation | Reasoning may hide values or alternatives. | Show rationale, alternatives and uncertainty. |
| Recommendation -> Human Decision | Automation bias or UI defaults may create false acceptance. | Explicit human action and practical rejection/modification. |
| Human edit -> Documentation Draft | Manual wording may diverge from structured facts. | Stale/override tracking and audit signal. |
| Corrected input or Human Decision -> derived artifacts | Existing claims, recommendations or drafts may no longer be valid. | Identify affected artifacts; mark stale, invalidate or create a new version without rewriting history. |
| Documentation Draft -> External journal | Draft may be mistaken for signed record. | Authorized review/approval before final journal use. |
| Action request -> External system -> Action outcome | Request may be unauthorised, partly executed or falsely reported as complete. | Explicit authorisation, bounded request, confirmed outcome and visible failure/degraded state. |
| Output -> clinically or regulatorily significant use | Technical completion may be mistaken for clinical validation, release approval or conformity. | Preserve intended use, risk tier, verification scope and required human/governance/QMS gates; no significance by presentation alone. |
| Domain event -> Audit Record | Audit may overcollect or mutate meaning. | Purpose-limited append-only audit with integrity and retention policy. |
| Verification -> Governance | Passing test may be overread as clinical validation. | Evidence scope and N/E/untested status must remain explicit. |
| Governance -> All contexts | Missing/contested authority may be ignored. | Status constraints and release-blocking policy propagation. |

No security technology, cryptographic mechanism, integration protocol or deployment model is selected here.

## 12. Domain Risks And Open Questions

### 12.1 Domain Issues

These are issue statements, not a new ID namespace.

| Issue | Status | Impact | Required owner |
|---|---|---|---|
| Claim versus Assertion has no authoritative distinction or lifecycle. | Unresolved | Duplicate concepts or incorrect authority transitions. | Governance/LEX with Architecture and Evidence owners. |
| Subject has no source-defined relationship to Patient. | Candidate term | Privacy and identity semantics could be inferred incorrectly. | Information Architecture and Governance. |
| Case has no shared meaning across clinical, governance and verification work. | Unresolved | A generic `Case` aggregate would hide materially different invariants. | Architecture/LEX; default is not to use it. |
| Confidence lacks a common method, scale and relationship to Uncertainty. | Unresolved | Numeric or linguistic confidence may imply unsupported certainty. | Clinical Safety, Evidence and Risk owners. |
| Consultation versus Encounter terminology is not reconciled. | Unresolved | Normative workflow and current engine may evolve incompatible state models. | Architecture with Product/Clinical Workflow. |

### 12.2 Architecture Issues

| Issue | Status | Impact | Related governance issue |
|---|---|---|---|
| Traceability and Audit require an explicit semantic and ownership boundary in later implementation. | Candidate ADR | Mutable impact graph could corrupt audit expectations. | GI-014. |
| Workflow/Action state and Human Decision need explicit transition rules. | Candidate ADR | Actions may appear authorised without human decision. | GI-014/GI-016. |
| Evidence Item and Claim transitions need a formal handoff contract. | Candidate ADR | Capabilities may upgrade retrieval output or merge evidence and claims. | GI-013/GI-014. |
| Verification Evidence, clinical evidence, clinical validation and safety-case evidence need operational separation. | Candidate ADR | Passing technical tests may be overclaimed. | GI-016/GI-017. |
| CAP-ATT ownership depends on operationalising the Consultation Impact Standard. | Unresolved dependency | Attention optimisation could become informal UX preference. | GI-014/GI-016. |
| Current accepted RFC-005 uses a narrower Encounter/answer-state model than SPEC's broader Consultation model. | Conformance issue | Reuse without allocation may omit context, authority, provenance and lifecycle. | GI-017. |

### 12.3 Governance Issues To Preserve

| GI | Effect on Domain Architecture |
|---|---|
| GI-010 | Highest normative ratification state is incomplete; domain architecture cannot be ratified as active. |
| GI-011 | Framework is not ACTIVE; governance enforcement cannot be assumed operational. |
| GI-012 | Owners/approvers missing; context ownership cannot become formal accountability. |
| GI-013 | Stable document IDs missing; trace references remain path/section based. |
| GI-014 | LEX, PP, DP and registry missing; this document must not pretend to be formal LEX or registry. |
| GI-015 | Specification upstream status inconsistent; capability mapping remains review-grade, not final ratification proof. |
| GI-016 | Regulatory/QMS boundary unresolved; clinical release, retention, logging and risk classification cannot be finalized. |
| GI-017 | Existing implementation conformance unassessed; no current code is grandfathered. |
| GI-018 | `Proposed` lifecycle status remains unmapped; this document uses the explicit non-lifecycle working-artifact marker required by its commission and does not resolve older statuses. |

## 13. Traceability

### 13.1 Normative Sources To Domain Elements

| Source | Domain terms | Contexts | Aggregates | Invariant themes | Events | Capabilities / acceptance |
|---|---|---|---|---|---|---|
| SPEC SYS-001–005, SYS-010–013 | Actor, Decision, AI Output | All; especially Human Decision | Consultation, Human Decision | AI/output separation; explicit authority; visible degradation | HumanDecisionRecorded, ActionAuthorized | All capabilities; AT-001/003/009 |
| SPEC §§3–4 | Patient, Consultation, Evidence, Risk, Action, Provenance | Clinical Context, Evidence, Risk, Human Decision | Consultation, Evidence Case, Risk Assessment | Provenance; evidence/claim distinction; human authority | ContextSnapshotCreated, EvidenceExtracted, RiskAssessmentRevised | CAP-CTX/EVD/RSK; corresponding capability ATs |
| SPEC §§18–19, INF-001–005 | Clinical Context, Transformation, Audit Record | Clinical Context, Traceability, Audit | Context Snapshot, Audit Trail | Type/provenance preservation; correction without false history | TransformationApplied, AuditEntryCreated | CAP-CTX/AUD; AT-006/012 |
| SPEC §§20–21 and CAP-DSU | Recommendation, Decision, Human Decision, Action | Decision Support, Human Decision, Workflow | Recommendation Package, Human Decision | Explicit recommendation–decision–action transitions | RecommendationIssued, HumanDecisionRecorded, ActionAuthorized | CAP-DSU-001–003; AT-DSU-01/AT-003/009 |
| SPEC CAP-KNR | Information Need, Knowledge Source, Source Policy | Knowledge and Sources, Governance | Retrieval Execution | Source/retrieval/evidence separation; missing is not negative | SourceAccepted, SourceRejected | CAP-KNR-001–003; AT-KNR-01 |
| SPEC CAP-AUD and TRC-001–005 | Verification, Verification Evidence, Audit Record | Verification, Traceability, Audit | Verification Case, Audit Trail | Verification scope; immutable history; bidirectional trace | VerificationCompleted, AuditEntryCreated | CAP-AUD-001–003; AT-AUD-01/AT-011/012 |
| GOV §§2–7 | Capability Contract, Source Policy, Governance Status | Governance, Traceability | Capability Contract | Status constrains use; contract survives allocation | GovernanceStatusChanged | CAP-GOV-001–003; AT-GOV-01 |
| SAB AP-002/AP-006 | Claim, Provenance, Transformation | Evidence, Claims, Traceability | Claim Set | Epistemic type integrity; reproducible meaning | ClaimFormed, TransformationApplied | CAP-EVD/RSN |
| CA-001 §§2–7 | Information Need, Source Policy, Retrieved Passage, Provenance | Knowledge and Sources | Retrieval Execution | Ranking is not authority; passage is not evidence | SourcePolicyBound | CAP-KNR; KNR-V scenarios as local CA-001 evidence plan |

### 13.2 Capabilities To Acceptance Criteria

| Capability | Existing acceptance reference | Domain acceptance meaning |
|---|---|---|
| CAP-CTX | AT-CTX-01 | Context snapshot preserves source, missing/conflict state and decision time; missing context is not normality. |
| CAP-KNR | AT-KNR-01 | Retrieval returns only policy-allowed source results or explicit insufficient/unavailable/degraded outcome. |
| CAP-EVD | AT-EVD-01 | Evidence Items retain source, version, scope, strength, currency and conflict. |
| CAP-RSN | AT-RSN-01 | Claims preserve evidence links, alternatives, support, counterevidence and uncertainty. |
| CAP-RSK | AT-RSK-01 | Risk representation includes severity, probability, time horizon, reversibility, bearer and uncertainty. |
| CAP-ATT | AT-ATT-01 | Proactive interruption has protective function, timing rationale and suppression rationale. |
| CAP-DSU | AT-DSU-01 | Recommendation remains separate from Human Decision and includes alternatives/no-action where relevant. |
| CAP-DOC | AT-DOC-01 | Draft contains only recorded/typed content and remains review-required before final use. |
| CAP-PCM | AT-PCM-01 | Patient communication preserves approved plan, uncertainty, conditions and safety-net. |
| CAP-LRN | AT-LRN-01 | Feedback creates controlled signal/change proposal, not production self-change. |
| CAP-AUD | AT-AUD-01 | Independent reviewer can reconstruct clinically significant chain with actual versions. |
| CAP-GOV | AT-GOV-01 | Status, risk tier, missing authority and prohibitions block or constrain affected scope. |

## 14. Architecture Decision Candidates

These are candidate subjects only. They have no ADR IDs, are not accepted or implemented, and must enter the existing ADR process only when an owner and approving body exist.

| Candidate title | Why needed | Status |
|---|---|---|
| Bounded Context Structure | Confirm the derived context set and the deliberate grouping of Workflow/Attention and Documentation/Patient Communication. | Candidate |
| Source–Evidence–Claim Transitions | Establish the anti-corruption boundaries from source to retrieved passage to Evidence Item to Claim. | Candidate |
| Claim Versus Assertion | Decide whether both concepts are necessary and define their authority/lifecycle if retained. | Candidate; requires LEX input |
| Consultation–Encounter Compatibility | Prevent normative Consultation and current Encounter state from becoming competing concepts. | Candidate |
| AI Output–Recommendation–Human Decision Separation | Define allowed transitions, presentation obligations and audit duties. | Candidate |
| Provenance Ownership Model | Decide which context owns transformation records versus trace relations and audit records. | Candidate |
| Decision–Action And Event–State Semantics | Define state transitions and forbid implicit authorisation. | Candidate |
| Verification Evidence Semantics | Separate technical verification, clinical validation, safety-case evidence and audit reconstruction. | Candidate |
| Capability Contract To Component Allocation Rules | Prevent service/component design from losing logical contracts and failure semantics. | Candidate |

## 15. Validation Against CA-001

### 15.1 Can CA-001 Concepts Be Placed Unambiguously?

| CA-001 concept | Placement | Ambiguity |
|---|---|---|
| Retrieval Execution | Knowledge and Sources aggregate. | None. |
| Retrieval Request | Information Need plus request qualification. | Minor: Information Need is broader than retrieval. |
| Source Policy Binding | Governance policy reference inside Retrieval Execution. | None. |
| Source Candidate | Knowledge and Sources. | None. |
| Retrieved Passage | Knowledge and Sources output. | None; must not be Evidence Item. |
| Ranked Source Result | Knowledge and Sources output. | None; ranking is not authority. |
| Coverage Assessment | Retrieval Execution internal object. | None. |
| Source Conflict Record | Retrieval Execution internal object; later Evidence conflict may derive separately. | Needs CAP-EVD handoff contract. |
| Audit Trace Reference | External reference to Audit. | None. |

### 15.2 Does CA-001 Conflict With Shared Domain Definitions?

No semantic conflict was found in CAP-KNR's retrieval boundary. CA-001 aligns with these shared distinctions:

- Knowledge Source is not Evidence.
- Retrieved Passage is not Evidence Item.
- Ranking is not authority.
- Retrieval Outcome is not Claim, Recommendation or Decision.
- CAP-AUD owns audit record; CAP-KNR owns only trace reference.

Two non-domain conflicts remain: CA-001 uses the unresolved lifecycle label `Proposed`, and its local `KNR-*` labels are explicitly temporary pending GI-013. Its `Retrieval Request` should also be documented as a capability-specific qualification of the broader Information Need, not as a synonym.

### 15.3 Is CAP-KNR Aggregate Still Valid?

**Architectural conclusion:** `Retrieval Execution` is a valid logical aggregate candidate for CAP-KNR because it protects the consistency of request, policy binding, source eligibility, retrieved passages, coverage, limitations, conflicts, outcome and audit reference. This validates the boundary inside this working architecture; it does not ratify CA-001 or select a transaction/storage implementation.

It should not be generalized into an Evidence, Claim or Decision aggregate.

### 15.4 Should CA-001 Later Be Revised?

CA-001 should later be revised or supplemented when:

1. GI-018 resolves lifecycle status migration away from `Proposed`;
2. LEX provides formal definitions for Source, Evidence, Claim and Provenance;
3. CAP-KNR -> CAP-EVD semantic handoff contract is authored;
4. CAP-KNR -> CAP-GOV authority contract is authored;
5. CAP-KNR -> CAP-AUD trace contract is authored; and
6. the Traceability-versus-Audit architecture issue is resolved.

CA-001 must not be changed in this task.

## 16. Exit Criteria

### 16.1 Product-readiness assessment

`Ready to begin` below means only that a non-active artifact can be drafted without inventing a second domain language. It does not mean approved, implementation-ready or release-ready.

| Downstream area | Readiness | Rationale and remaining gate |
|---|---|---|
| Cortex Product Baseline | Ready to begin, non-active | System boundary, actors, capabilities and decision authority are placeable. Product must still select intended use/scope and cannot close GI-010–GI-016. |
| Cortex Experience Vision | Ready for reconciliation, not ratification | Vision and domain boundaries support attention, adaptive workflow and human control. It must reconcile any language implying that Cortex itself “decides” and operationalise the Consultation Impact Standard. |
| Clinical Workflow Architecture | Ready to begin with conditions | Workflow, Risk, Decision Support, Human Decision and Action are separated. Consultation/Encounter terminology and RFC-005 conformance must be resolved; no pathway-specific clinical policy may be invented. |
| Information Architecture | Ready to begin | Information types, provenance, transformation, evidence, decision, traceability and audit boundaries are defined. Schema, retention and privacy/security controls remain deliberately open. |
| CA-002 | Ready to begin only after capability selection and owner/scope declaration | All 12 SPEC capabilities map to contexts, objects, authority and acceptance references. CA-002 must use an existing CAP-ID, stay non-active and preserve capability contracts. |
| Verification Architecture | Ready to begin | Verification Evidence is separated from clinical evidence and mapped to requirements/versions. Evaluation Protocol, Safety Case, QMS and release gates remain unresolved. |
| Logical responsibility architecture | Ready to begin | Contexts and capability ownership provide logical boundaries without implying services, modules or deployment. Missing responsibilities must not become invented capabilities. |

### 16.2 What this Domain Architecture does not authorise

This artifact does **not** authorise:

- concrete screen design or interaction acceptance;
- API or integration contract design;
- persistence schemas, retention implementation or database choices;
- service, component, process or deployment architecture;
- AI model, provider, prompt or hosting selection;
- security or privacy implementation;
- cloud, environment or deployment decisions;
- regulatory classification, conformity or marketing claim;
- implementation acceptance, production operation or clinical release.

### 16.3 Exit gates for this artifact

Before this document can enter a controlled lifecycle state or become an approval basis:

1. GI-018 must define the valid status treatment and migration for existing `Proposed` architecture artifacts.
2. GI-012/GI-013 must provide owner, approving body and stable document identity.
3. LEX or an authorised equivalent must resolve Claim/Assertion, Subject/Patient, Case and Consultation/Encounter terminology.
4. Candidate bounded contexts and aggregate boundaries must be reviewed by Architecture, Product, Clinical Safety, Evidence and Governance owners.
5. The capability mapping must be checked against the complete Specification allocation and its acceptance catalogue.
6. GI-016 must define the regulatory/QMS boundary before any clinical or release claim.
7. GI-017 conformance work must evaluate current implementation and accepted RFC-005 against this model.

### 16.4 Formal exit conclusion

**The source-recovery and logical Domain Architecture work is complete enough to begin the listed downstream non-active architecture artifacts. It is not complete enough to approve this artifact, implement its candidate boundaries as services, or support clinical release.**

The next architecture work should preserve this chain:

`Normative sources -> Domain terms -> Bounded contexts -> Aggregates -> Invariants -> Events -> Capability contracts -> Verification evidence -> Audit and learning`

If a future design cannot place a concept in this chain without changing meaning, it must raise a Domain, Architecture or Governance Issue rather than add a private synonym.
