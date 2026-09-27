# Cortex Build Baseline v1.0

**Status:** Blocked — governance source package unavailable

**Document type:** Build programme baseline and Architecture Readiness Review

**Owner:** Cortex Build / Chief Software Architect

**Assessment date:** 2026-07-21

**Repository baseline:** `c002b93`

## Executive decision

Cortex Build is established as a separate engineering programme, but it is **not authorised to begin a new software architecture from the governance handover**.

The handover names five documents as authoritative:

1. Cortex Philosophy
2. Cortex Constitution
3. Cortex Governance Framework
4. Cortex Stress Test
5. Cortex Specification

None of those five documents is present in the repository under that title, and no versioned crosswalk identifies existing files as their ratified equivalents. Their contents, versions, owners, ratification records and stable references therefore cannot be verified.

The repository does contain earlier vision, engineering-governance, architecture and verification material. Those documents are relevant context, but Build must not silently substitute them for the five authoritative documents. In particular, active repository documents make existing canonicality claims that cannot be reconciled with the new handover without a governance decision.

This baseline consequently establishes:

- the document-control state at handover;
- the required authority hierarchy;
- the traceability contract Build will use;
- the boundary of Build's decision authority;
- the Governance Issues blocking architecture work; and
- the gate for a renewed Architecture Readiness Review.

It does not reconstruct missing governance content or resolve governance questions locally.

## 1. Document inventory

### 1.1 Declared authoritative package

The following inventory records only what is established by the handover. “Not assessable” means that the document itself was not available for review; it is not a maturity judgement.

| Document | Repository identity | Purpose | Maturity | Normative status | Owner | Decisions governed | Dependencies |
|---|---|---|---|---|---|---|---|
| Cortex Philosophy | Not located | Not assessable from source | Not assessable | Declared authoritative by the handover | Not stated | Not assessable | Not assessable |
| Cortex Constitution | Not located | Constitutional position is named in the required hierarchy; substantive purpose is not assessable | Not assessable | Declared authoritative by the handover | Not stated | Precedence over Governance is explicit; other decisions are not assessable | Not assessable |
| Cortex Governance Framework | Not located | Governance position is named in the required hierarchy; substantive purpose is not assessable | Not assessable | Declared authoritative by the handover | Not stated | Precedence over Specification is explicit; other decisions are not assessable | Cortex Constitution, by the supplied hierarchy |
| Cortex Stress Test | Not located | Not assessable from source | Not assessable | Declared authoritative by the handover | Not stated | Not assessable | Not assessable |
| Cortex Specification | Not located | Specification position is named in the required hierarchy; substantive purpose is not assessable | Not assessable | Declared authoritative by the handover | Not stated | Constrains Software Architecture, by the supplied hierarchy | Cortex Governance Framework, by the supplied hierarchy |

No content-level dependency, compatibility or contradiction finding can be made for an unavailable document.

### 1.2 Handover instruction

The Build mandate supplied with this assignment is an operational handover instruction, not one of the five normative documents. It establishes that:

- the five named documents are the normative truth;
- Build must not rewrite them, introduce new principles or alter their meaning;
- ambiguity, insufficiency and contradiction must become Governance Issues;
- Build may make implementation choices within the normative solution space; and
- Build may not fill governance gaps by assumption.

The handover instruction does not provide the missing normative content and cannot replace it.

### 1.3 Related active repository material

The following active files were inspected because they currently claim foundational, governance, architectural or verification relevance. They are **not mapped to the five authoritative documents** by this baseline.

| Repository document | Current self-declared role | Why it cannot be substituted without review |
|---|---|---|
| `docs/vision/MANIFEST.md` | Cortex purpose, philosophy and principles | It is titled “Cortex Manifest”, not “Cortex Philosophy”, and no ratified equivalence or version mapping is present |
| `docs/vision/CX-001-The-Perfect-Consultation.md` | Foundational consultation experience draft | It is an experience document and self-identifies as a draft |
| `docs/vision/MVP-001-The-First-Clinical-Product.md` | Product definition | It defines an earlier product milestone, not the handed-over Cortex Specification by explicit identity |
| `docs/vision/WF-001-The-Consultation-Workflow.md` | Workflow specification | It is a workflow specification, but no crosswalk makes it the handed-over Cortex Specification |
| `docs/vision/README.md` | Existing foundation hierarchy | It declares a Manifest → CX → MVP → WF hierarchy that differs from the new handover hierarchy |
| `docs/governance/ENGINEERING-CONSTITUTION.md` | Highest-level engineering document in the repository | Its scope is engineering; no ratification record identifies it as the handed-over Cortex Constitution |
| `docs/governance/CLINICAL-SAFETY-PRINCIPLES.md` | Active clinical safety constraints | It contains no status, owner, version or mapping to the new governance package |
| `docs/governance/DEVELOPMENT-WORKFLOW.md` | Foundational development process | Its canonical hierarchy is Vision → Product Design → Architecture → Implementation → Verification → Merge, which requires governance reconciliation |
| `docs/governance/REVIEW-PROCESS.md` | Review types and decision states | It does not identify itself as the Cortex Governance Framework or Cortex Stress Test |
| `docs/governance/TESTING-STRATEGY.md` | Active four-layer verification strategy | It is implementation-era verification guidance, not an identified normative Stress Test |
| `docs/architecture/README.md` | Current implemented architecture | It describes the pre-handover system and cannot prove compliance with unavailable normative sources |

Archived documents were not treated as candidate normative sources because `docs/README.md` explicitly states that archived documents are not authoritative.

## 2. Document hierarchy

### 2.1 Authorised backbone

The handover explicitly supplies this precedence chain:

```text
Cortex Constitution
        ↓
Cortex Governance Framework
        ↓
Cortex Specification
        ↓
Software Architecture
        ↓
Implementation
        ↓
Verification
```

An arrow means “constrains and has precedence over”. A lower layer may refine how a higher-layer requirement is realised, but may not contradict, weaken or redefine it.

When two decisions conflict:

1. the higher layer prevails;
2. a lower-layer artefact must change; and
3. if the conflict exists within or between normative layers, Build records a Governance Issue and stops the affected decision.

### 2.2 Unresolved placement

The handover does not place Cortex Philosophy or Cortex Stress Test in the supplied hierarchy.

Build will not assume that:

- Philosophy is above, below or part of the Constitution; or
- Stress Test is a governance input, a specification-validation artefact, a verification method or ratification evidence.

Their placement and precedence require governance review (GI-003).

### 2.3 Existing repository hierarchy

The repository currently declares other canonical chains, including:

```text
Manifest → Consultation Experience → MVP → Workflow → Architecture → Implementation
```

and:

```text
Vision → Product Design → Architecture → Implementation → Verification → Merge
```

Build does not merge these chains into the new hierarchy. Governance must either provide a crosswalk, supersede them explicitly or define their continuing subordinate role (GI-008).

## 3. Traceability

### 3.1 Required end-to-end model

Every implemented behaviour must eventually support this evidence chain:

```text
Constitution
      ↓ constrains
Governance
      ↓ operationalises
Specification
      ↓ is realised by
Architecture
      ↓ is allocated to
Components
      ↓ exposes or consumes
API
      ↓ is implemented in
Code
      ↓ is verified by
Tests
      ↓ produces
Audit evidence
```

Reverse traceability is equally mandatory: every component, API operation, code unit and test must point back to an authorised requirement or an explicitly recorded engineering need within an authorised architecture decision.

### 3.2 Traceability record

Build will use one trace record per specification obligation.

| Field | Required content |
|---|---|
| Source authority | Exact normative document identity, version and section |
| Governance interpretation | Exact governance rule or approved interpretation; never a Build-authored substitute |
| Specification requirement | Stable requirement ID and verbatim or lossless requirement reference |
| Architecture allocation | Architecture decision ID and affected quality attributes |
| Components | Stable component or service identifiers |
| API | Operation, event or internal contract identifier; “not applicable” requires a reason |
| Code | Repository path and stable symbol or module boundary |
| Tests | Automated, manual and negative/safety verification identifiers |
| Audit evidence | Immutable build/test/review evidence and decision record |
| Status | Proposed, implemented, verified, blocked or retired |
| Exceptions | Approved deviation reference; Build cannot self-approve a normative deviation |

### 3.3 Relationship rules

- One normative source may constrain many specification requirements.
- Every specification requirement must map to at least one architecture allocation.
- Every architecture allocation must map to one or more components or explicitly state that it is cross-cutting.
- Every externally observable API behaviour must map to a specification requirement and verification evidence.
- Code without a specification or approved architecture rationale is untraceable and cannot be declared conformant.
- Tests must show what requirement they verify; test success alone does not establish normative compliance.
- Audit evidence must identify the exact source revision, architecture revision, code revision and test execution.
- A missing link blocks conformance for that requirement; it must not be inferred from naming similarity.

### 3.4 Current traceability state

The traceability **model** is established, but no compliant traceability **records** can be populated because the source documents, stable requirement anchors and version identities are unavailable.

Existing code and tests therefore remain implementation evidence for the pre-handover system. They are not evidence of compliance with the new normative package.

## 4. Architecture mandate

### 4.1 Decisions Build may make

Build may decide implementation means only where all applicable normative and specification requirements leave a genuine solution space. This includes, subject to traceable constraints:

- software decomposition and component boundaries;
- programming language, framework and library choices;
- database technology and physical data representation;
- internal and external API shapes;
- deployment topology and infrastructure tooling;
- build, test, observability and developer tooling;
- performance, reliability and maintainability techniques; and
- sequencing of implementation work.

These choices are provisional until they can be traced to the complete normative package. Build choosing a technology does not create a new product, clinical, ethical, governance or risk principle.

### 4.2 Decisions Build may not make

Build may not:

- rewrite, reinterpret away, weaken or extend normative principles;
- change the meaning or precedence of an authoritative document;
- define epistemic integrity where governance is silent or change it where governance has spoken;
- invent product obligations, clinical policy, acceptable risk or evidence thresholds;
- decide who may accept normative, clinical, privacy, security or operational risk unless governance delegates that authority;
- treat an implementation convenience as an implied governance decision;
- declare clinical, legal, security or governance approval from technical test success;
- substitute an older repository document for an authoritative source without a governance-approved crosswalk; or
- resolve a contradiction between normative documents.

### 4.3 Decision test

Before Build makes an architecture decision, all answers below must be “yes”:

1. Are every applicable source and version available?
2. Is the decision inside an explicitly unconstrained implementation space?
3. Can the decision be traced to specification obligations or approved quality requirements?
4. Does it preserve every higher-level constraint?
5. Is the acceptance evidence and reviewer authority known?

Any “no” produces or links to a Governance Issue before the decision proceeds.

## 5. Governance Issues

| ID | Description | Consequence | Proposed governance review |
|---|---|---|---|
| GI-001 | The five declared authoritative documents are not present or addressable in the repository | No content-level review, dependency analysis, conflict analysis or compliant architecture derivation is possible | Deliver the ratified, read-only source package at stable repository paths or provide immutable accessible references |
| GI-002 | Version, ratification status, owner and stable section identity are unavailable for every declared authoritative document | Trace references cannot be durable, and Build cannot know which revision governs | Approve a document-control register containing canonical title, ID, version, status, owner, ratification date and location |
| GI-003 | Cortex Philosophy and Cortex Stress Test are not placed in the supplied precedence hierarchy | Build cannot determine their authority, dependencies or conflict-resolution role | Ratify a complete hierarchy including both documents and define tie-breaking rules |
| GI-004 | No stable normative or specification requirement identifiers are available | End-to-end traceability cannot be populated or audited | Approve stable anchors or a non-invasive external requirement-ID register; do not rewrite normative meaning |
| GI-005 | The relationship between governance obligations and specification requirements cannot be inspected | Completeness, overreach and omitted requirements cannot be assessed | Provide or approve a Governance-to-Specification conformance matrix |
| GI-006 | Cortex Stress Test content and its relation to verification are unavailable | Build cannot derive verification architecture, acceptance evidence or failure gates | Clarify whether the Stress Test is normative input, validation evidence, a reusable test protocol or another artefact, and identify its acceptance authority |
| GI-007 | Build's delegated authority is expressed as a principle and one example, not as a complete decision-rights model | Architecture decisions involving security, privacy, data, deployment and risk acceptance may cross an unknown governance boundary | Approve a decision-rights matrix covering Build, Governance, Product, Clinical, Security/Privacy and release authority |
| GI-008 | Active repository documents claim a different canonical foundation and hierarchy from the new handover | Competing sources of truth could cause silent semantic drift | Ratify a crosswalk that marks each active document as mapped, subordinate, superseded or independent; identify which canonicality statements remain valid |
| GI-009 | The current implementation predates the unavailable normative package and has no conformance mapping to it | Existing architecture, code and tests cannot be grandfathered as compliant | After source recovery, commission a requirement-by-requirement conformance audit before reuse decisions |

No issue above is resolved by this baseline.

## 6. Architecture clarity

### Decision

Build does **not** have enough information to start a governance-derived software architecture.

### Missing information

The minimum missing information is:

1. complete content of all five authoritative documents;
2. canonical title, ID, version, status, owner and ratification metadata for each;
3. the full precedence placement of Philosophy and Stress Test;
4. an approved mapping or supersession decision for existing repository foundations;
5. stable requirement anchors in the normative and specification layers;
6. explicit delegated decision rights and escalation owners;
7. specification coverage sufficient to identify required system behaviour and qualities;
8. Stress Test purpose, expected evidence and pass/fail authority; and
9. the acceptance process for architecture and verification artefacts.

Until those items are available, Build may preserve the repository, inspect it and prepare non-normative tooling. It may not claim that a new architecture, implementation or verification design conforms to the completed Governance programme.

## 7. Architecture Readiness Review

### 7.1 Scoring method

Each area is scored from 0 to 5:

| Score | Meaning |
|---:|---|
| 0 | Required source or capability is unavailable |
| 1 | Intent is declared, but substantive evidence is unavailable |
| 2 | Material is partial or has unresolved authority gaps |
| 3 | Sufficient to proceed with explicitly managed, non-critical gaps |
| 4 | Ready, controlled and traceable |
| 5 | Ratified, complete and independently evidenced |

A release to architecture work requires every area to score at least 3, with no open issue that blocks source authority, precedence or requirement identity.

### 7.2 Scores

| Area | Score | Assessment |
|---|---:|---|
| Governance Readiness | 1/5 | The authoritative set is named, but content, ownership, versions, ratification and complete precedence are unavailable |
| Specification Readiness | 0/5 | The authoritative Cortex Specification is unavailable and cannot be safely substituted |
| Traceability Readiness | 1/5 | The required chain and record model are established, but no authoritative records can be populated |
| Architectural Readiness | 1/5 | Build's role is declared, but constraints, qualities and complete decision rights cannot be derived |
| Verification Readiness | 0/5 | The Stress Test, normative acceptance criteria and verification authority are unavailable |
| **Total** | **3/25** | **Not ready** |

### 7.3 Official review outcome

**Architecture Readiness Review decision: Changes required — architecture start is blocked.**

The blocking issues are GI-001, GI-002, GI-003, GI-004, GI-006 and GI-008. A new review is required after governance has addressed them. Technical implementation success in the current repository does not change this decision.

## 8. Roadmap

### 8.1 Active recovery roadmap

Because readiness is below the required threshold, Build does not authorise a software-architecture document set yet.

The active sequence is:

1. Governance supplies the five immutable authoritative sources.
2. Governance approves document control, precedence and the active-document crosswalk.
3. Governance provides stable requirement anchors and decision rights.
4. Build populates the first normative-to-specification traceability records.
5. Build performs conflict, coverage and architectural-input analysis.
6. Build issues Cortex Build Baseline v1.1 and repeats the Architecture Readiness Review.

### 8.2 Architecture documents held behind the readiness gate

The supplied hierarchy makes a Software Architecture artefact necessary once readiness passes. A Verification Architecture is also necessary to close the required traceability chain to evidence.

The following additional artefacts are **candidates, not yet authorised deliverables**, because their need and scope must be derived from the missing governance and specification content:

- Domain Architecture
- Service Architecture
- Data Architecture
- API Architecture
- Security Architecture
- Deployment Architecture

After the renewed readiness review, each candidate must either:

- be authorised with explicit source requirements and scope;
- be incorporated into another architecture artefact with traceable coverage; or
- be marked not applicable with a recorded rationale.

Build will not create empty architecture documents merely to complete a checklist.

## Baseline control rule

All subsequent Build decisions must cite this baseline and the authoritative source references relevant to the decision. While this baseline remains blocked, it authorises only source recovery, traceability preparation, repository inspection and governance escalation—not a claim of normative architecture or implementation conformance.

The normative documents remain authoritative. This baseline records their engineering consequences; it does not alter their meaning.
