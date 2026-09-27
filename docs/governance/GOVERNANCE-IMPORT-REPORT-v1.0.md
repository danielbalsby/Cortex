# Governance Import Report v1.0

**Status:** Superseded — source availability assumption falsified

**Superseded by:** `docs/governance/GOVERNANCE-ADOPTION-REPORT-v2.0.md`

This report is retained as a historical intake record. Its conclusion was based on the then-unverified assumption that the deliverable sources were unavailable. Filesystem access was subsequently established, and the sources were adopted through Governance Adoption Report v2.0.

**Document type:** Governance artefact intake report

**Owner:** Cortex Build / Chief Software Architect

**Report date:** 2026-07-21

**Repository baseline:** `c002b93`

**Related baseline:** `docs/architecture/CORTEX-BUILD-BASELINE-v1.0.md`

## 1. Import decision

No authoritative governance document was imported.

The handover identifies five authoritative documents, but neither their content nor immutable source files are available in the repository, fetched remote branches or supplied attachments. Creating empty placeholders, copying similarly named legacy material or reconstructing content from titles would violate the instruction not to rewrite, interpret or invent governance material.

Import status: **0 of 5 documents imported**.

Build can identify the five intended document titles, but it cannot yet identify five official engineering artefacts. Software Architecture remains blocked.

## 2. Authoritative intake register

`TODO` means that the value must come from the authoritative source or a governance-approved document-control record. It is not inferred by Build.

| Title | Source located | Imported | Document ID | Version | Document status | Ratification status | Owner | Date | Depends on | Supersedes | Canonical path |
|---|---:|---:|---|---|---|---|---|---|---|---|---|
| Cortex Philosophy | No | No | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | Proposed only: `docs/governance/normative/CORTEX-PHILOSOPHY.md` |
| Cortex Constitution | No | No | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | Proposed only: `docs/governance/normative/CORTEX-CONSTITUTION.md` |
| Cortex Governance Framework | No | No | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | Proposed only: `docs/governance/normative/CORTEX-GOVERNANCE-FRAMEWORK.md` |
| Cortex Stress Test | No | No | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO pending confirmation of document role |
| Cortex Specification | No | No | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | Proposed only: `docs/specifications/CORTEX-SPECIFICATION.md` |

“Declared authoritative” in the handover is not converted into a document-level status or ratification value. Those are separate requested metadata fields and remain TODO until evidenced.

## 3. Repository structure

### 3.1 Current relevant structure

```text
docs/
├── architecture/
│   ├── decisions/
│   ├── reviews/
│   └── rfcs/
├── governance/
├── product/
├── clinical/
├── design/
├── vision/
└── archive/
```

There is currently no `docs/specifications/` or `docs/testing/` namespace. Architecture decisions are stored under `docs/architecture/decisions/`; there is no separate root `/adr` directory.

### 3.2 Proposed target structure

This structure is a placement proposal only. No canonical source file or empty placeholder has been created.

```text
docs/
├── governance/
│   └── normative/
│       ├── CORTEX-PHILOSOPHY.md
│       ├── CORTEX-CONSTITUTION.md
│       └── CORTEX-GOVERNANCE-FRAMEWORK.md
├── specifications/
│   └── CORTEX-SPECIFICATION.md
├── architecture/
│   ├── README.md
│   └── decisions/
└── testing/
```

The Cortex Stress Test is deliberately not assigned a canonical path. Its content and formal role are unavailable, so placing it under governance, specifications or testing would be an interpretation. Governance must confirm its role before Build establishes its path.

### 3.3 Proposed moves

No existing file should move during intake.

After the authoritative package is available and its crosswalk is approved, active documents with competing canonicality statements may need reclassification, metadata updates or archival. Those changes must be proposed from the approved crosswalk; they must not be inferred from similar titles.

## 4. Canonicality and duplicate register

### 4.1 Canonical-copy result

| Document | Authoritative copies found | Result |
|---|---:|---|
| Cortex Philosophy | 0 | Canonical copy not established |
| Cortex Constitution | 0 | Canonical copy not established |
| Cortex Governance Framework | 0 | Canonical copy not established |
| Cortex Stress Test | 0 | Canonical copy not established |
| Cortex Specification | 0 | Canonical copy not established |

There are therefore no authoritative duplicates to remove or register as exact copies.

### 4.2 Possible semantic overlaps — not classified as duplicates

The following files have related names or self-declared roles. Build does not classify them as duplicates, replacements or predecessors because the authoritative content is unavailable.

| Intended document | Existing related material | Required future decision |
|---|---|---|
| Cortex Philosophy | `docs/vision/MANIFEST.md`; `docs/archive/2026-foundation/RFC-001-Cortex-Clinical-Philosophy.md` | Map, subordinate, supersede or declare independent |
| Cortex Constitution | `docs/governance/ENGINEERING-CONSTITUTION.md` | Map, subordinate, supersede or declare independent |
| Cortex Governance Framework | `docs/governance/DEVELOPMENT-WORKFLOW.md`; `docs/governance/REVIEW-PROCESS.md` | Map, subordinate, supersede or declare independent |
| Cortex Stress Test | `docs/governance/TESTING-STRATEGY.md`; `docs/governance/REVIEW-PROCESS.md` | Determine whether either is related, then classify |
| Cortex Specification | `docs/vision/MVP-001-The-First-Clinical-Product.md`; `docs/vision/WF-001-The-Consultation-Workflow.md` | Map, subordinate, supersede or declare independent |

No listed file was deleted, moved, renamed or edited.

## 5. Document relationship chain

The requested engineering reference chain is recorded as the intended cross-layer model:

```text
Philosophy
    ↓
Constitution
    ↓
Governance
    ↓
Specification
    ↓
Architecture
    ↓
Implementation
    ↓
Verification
```

This report does not convert that model into document metadata. Exact `Depends on` and `Supersedes` values remain TODO until the documents themselves or a governance-approved relation register confirm them.

Cortex Stress Test is not placed in the chain because the requested model does not state its position and its contents are unavailable.

## 6. Proposed traceability ID system

No ID has been assigned to any document.

For governance review, Build proposes the following namespace pattern:

| Artefact class | Proposed pattern | Illustrative form only |
|---|---|---|
| Philosophy | `CTX-PHI-{number}` | `CTX-PHI-001` |
| Constitution | `CTX-CON-{number}` | `CTX-CON-001` |
| Governance | `CTX-GOV-{number}` | `CTX-GOV-001` |
| Stress Test | `CTX-ST-{number}` | `CTX-ST-001` |
| Specification | `CTX-SPEC-{number}` | `CTX-SPEC-001` |
| Specification requirement | `{document-id}-REQ-{number}` | `CTX-SPEC-001-REQ-0001` |
| Architecture decision | `ADR-{number}` | `ADR-0001` |
| Verification case | `VER-{number}` | `VER-0001` |

The examples are syntax proposals, not identifiers for the missing documents. Governance must approve or replace the scheme before any ID is introduced.

Required ID properties:

- stable across file moves;
- unique across the repository;
- independent of mutable titles and versions;
- suitable for section- and requirement-level traceability; and
- never reused after retirement.

These are requirements for the proposed scheme, not amendments to the normative documents.

## 7. Governance → Repository Crosswalk

The crosswalk below describes the intended repository connection. Rows marked “blocked” are not active mappings.

| Logical namespace | Repository path | Intended role | Governance connection | Current state |
|---|---|---|---|---|
| `/docs` | `docs/` | Documentation root and navigation | Indexes all controlled artefacts without becoming a normative source | Existing; crosswalk not approved |
| `/governance` | Proposed `docs/governance/normative/` | Canonical Philosophy, Constitution and Governance Framework | Source authority for lower layers | Blocked: sources unavailable |
| `/specifications` | Proposed `docs/specifications/` | Canonical behavioural and quality obligations | Receives constraints from governance and constrains architecture | Blocked: source unavailable |
| `/architecture` | `docs/architecture/` | Derived software architecture and reviews | Must trace to Specification and higher authority | Existing pre-handover material; conformance unassessed |
| `/adr` | `docs/architecture/decisions/` | Individual architecture decisions | Each ADR must cite specification and governance sources | Directory exists; no new-governance mapping |
| `/testing` | Proposed `docs/testing/` plus existing executable test locations | Verification architecture, test policy and evidence indexes | Must trace tests to requirements and audit evidence | Namespace absent; Stress Test role unresolved |
| `/implementation` | `app/`, `components/`, `clinical/`, `engine/`, `encounter/` and supporting source directories | Executable system | Must implement approved architecture allocations | Existing pre-handover implementation; conformance unassessed |

The crosswalk does not elevate current repository files into the missing normative package.

## 8. Missing metadata

The following remains TODO for every authoritative document unless a source-specific value is supplied:

- document ID;
- exact title as printed in the source;
- version;
- status;
- ratification status and ratification authority;
- owner;
- document date and effective date, if different;
- dependencies;
- superseded documents;
- canonical source path; and
- checksum or other immutable identity evidence.

Additionally required:

- complete document body;
- approved precedence placement for Cortex Stress Test;
- approved crosswalk to existing active documents; and
- confirmation of whether metadata may be added as a wrapper without modifying the normative body.

## 9. Remaining blockers

| Blocker | Effect |
|---|---|
| Authoritative bodies unavailable | Import cannot occur |
| Source identity and version unavailable | A canonical copy cannot be proven |
| Ratification evidence unavailable | Official status cannot be represented safely |
| Ownership unavailable | Review and change authority cannot be routed |
| Dependency and supersession metadata unavailable | Document hierarchy cannot be instantiated |
| Stress Test placement unresolved | Testing and verification crosswalk cannot be finalised |
| Existing-document crosswalk unapproved | Competing canonicality remains unresolved |
| Traceability ID scheme unapproved | Stable requirement references cannot be introduced |

The Governance Issues GI-001 through GI-009 in Cortex Build Baseline v1.0 remain open.

## 10. Build validation and readiness

The Build Baseline was **not rerun** because the explicit prerequisite—availability of all five authoritative documents—was not met.

The last valid readiness result remains in force:

| Area | Effective score |
|---|---:|
| Governance Readiness | 1/5 |
| Specification Readiness | 0/5 |
| Traceability Readiness | 1/5 |
| Architectural Readiness | 1/5 |
| Verification Readiness | 0/5 |
| **Total** | **3/25 — Not ready** |

This is an unchanged effective score, not a new review result.

## 11. Import completion gate

Governance intake may be declared complete only when:

1. all five complete source documents are available;
2. every requested metadata field is evidenced or explicitly marked TODO in an approved metadata wrapper;
3. each document has one canonical path;
4. duplicates and semantic predecessors are recorded without deletion;
5. the complete hierarchy, including Cortex Stress Test, is approved;
6. the repository crosswalk is approved;
7. the traceability ID approach is approved or replaced; and
8. Cortex Build Baseline is rerun against the imported sources.

Only after that gate passes may Build identify the five documents as official engineering artefacts and begin Software Architecture.
