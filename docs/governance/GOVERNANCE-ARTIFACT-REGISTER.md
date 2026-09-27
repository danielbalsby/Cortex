# Cortex Governance Artifact Register

**Status:** Active engineering register

**Owner:** TODO — Governance Secretariat

**Established:** 2026-07-21

This register identifies the canonical repository copy of each adopted governance artifact. It is an engineering control record, not a normative source. The canonical DOCX files remain byte-identical to their authorised deliverable sources.

## Canonical artifacts

### Cortex Philosophy

- **Document ID:** TODO
- **Title in document:** Cortex filosofi
- **Version:** TODO
- **Document status:** TODO
- **Engineering adoption status:** Adopted as authoritative interpretive source
- **Ratification status:** TODO; the Constitution report states that the essayistic philosophy is interpretive history and must not compete with the Constitution
- **Owner:** TODO
- **Date:** 2026-07-21 in DOCX core metadata; effective document date TODO
- **Depends on:** None stated
- **Supersedes:** TODO
- **Authoritative deliverable source:** `/Users/danielbalsby/.codex/.chatgpt-projects/g-p-6a579b149fbc8191924b9f7056723d79/deliverables/Cortex filosofi - hovedredigeret med ændringer.docx`
- **Canonical path:** `docs/governance/canonical/Cortex-Philosophy.docx`
- **SHA-256:** `0d702ad15e1667c817fc41ec1f22d9d508b8d644aa96a5bba3eb2fadb9eea062`
- **Hierarchy role:** Interpretive foundation for the Constitution; not higher normative authority than the Constitution

### Cortex Constitution ratification report

- **Document ID:** TODO
- **Title in document:** Ratificering af Cortex Constitution
- **Embedded proposed Constitution version:** v1.0
- **Report version:** TODO
- **Document status:** Independent commission report containing proposed ratified text
- **Engineering adoption status:** Adopted as authoritative Constitution source package
- **Ratification status:** Conditional recommendation; interdisciplinary hearing and supporting Position Papers, ADRs and audit procedures remain prerequisites in the document
- **Owner:** TODO; commission composition is stated, but no document owner is named
- **Date:** July 2026; exact document date TODO
- **Depends on:** Cortex Philosophy
- **Supersedes:** TODO
- **Authoritative deliverable source:** `/Users/danielbalsby/.codex/.chatgpt-projects/g-p-6a579b149fbc8191924b9f7056723d79/deliverables/Ratificeringsbetænkning - Cortex Constitution.docx`
- **Canonical path:** `docs/governance/canonical/Cortex-Constitution-Ratification-Report.docx`
- **SHA-256:** `d4529d636b215d12857709a85d0f7ad05195d964db8c71af65ffae2741ec91de`
- **Hierarchy role:** Proposed highest normative authority; not recorded as finally ratified by its own text

### Cortex Governance Framework v1.0

- **Document ID:** TODO
- **Title in document:** Cortex Governance Framework v1.0
- **Version:** 1.0
- **Document status:** Foundational; valid from ratification
- **Engineering adoption status:** Adopted as authoritative governance framework
- **Ratification status:** PROVISIONAL/FOUNDATIONAL DRAFT according to the adopted Stress Test; not ACTIVE
- **Owner:** TODO
- **Date:** July 2026; exact effective date is contingent on ratification
- **Depends on:** Cortex Constitution; its own hierarchy also requires LEX and ratified Position Papers for downstream interpretation
- **Supersedes:** TODO
- **Authoritative deliverable source:** `/Users/danielbalsby/.codex/.chatgpt-projects/g-p-6a579b149fbc8191924b9f7056723d79/deliverables/Cortex Governance Framework v1.0.docx`
- **Canonical path:** `docs/governance/canonical/Cortex-Governance-Framework-v1.0.docx`
- **SHA-256:** `d0b4eed2fed4c8ccb13a4002598abed7690f01d812d31dce6545d6dc4b3557a4`
- **Hierarchy role:** Binding governance layer when ratified; subordinate to the Constitution and superior to derived design, architecture and product artifacts

### Stress Test — Cortex Governance Framework v1.0

- **Document ID:** TODO
- **Title in document:** Stress test af Cortex Governance Framework v1.0
- **Version:** TODO; it reviews Framework v1.0
- **Document status:** Independent review and assurance artifact
- **Engineering adoption status:** Adopted as authoritative governance assurance source
- **Ratification status:** TODO as a document; it recommends retaining Framework v1.0 as FOUNDATIONAL DRAFT and ratifying only PROVISIONAL v1.0 pending stated gates
- **Owner:** TODO; DOCX metadata names Cortex Independent Review Commission as creator, not owner
- **Date:** 2026-07-21
- **Depends on:** Cortex Governance Framework v1.0
- **Supersedes:** TODO
- **Authoritative deliverable source:** `/Users/danielbalsby/.codex/.chatgpt-projects/g-p-6a579b149fbc8191924b9f7056723d79/deliverables/Stress test - Cortex Governance Framework v1.0.docx`
- **Canonical path:** `docs/governance/assurance/Cortex-Governance-Framework-Stress-Test-v1.0.docx`
- **SHA-256:** `4489a845d47992dcad04dda233e1ac943063589f32bcecce0a0874c1da1aa4c6`
- **Hierarchy role:** Independent assurance and status gate for the Governance Framework; it does not outrank the Constitution

### Cortex Specification v1.0

- **Document ID:** TODO
- **Title in document:** Cortex Specification v1.0
- **Version:** 1.0
- **Document status:** RATIFIED BASELINE
- **Engineering adoption status:** Adopted as authoritative system specification
- **Ratification status:** Recorded as RATIFIED BASELINE; ratifying body and decision record TODO
- **Owner:** TODO; DOCX metadata names Cortex Chief Systems Architect as creator, not owner
- **Date:** 2026-07-21 deliverable timestamp; effective document date TODO
- **Depends on:** Cortex Philosophy, Cortex Constitution, Cortex Governance Framework v1.0 and what the document calls a ratified Stress Test
- **Supersedes:** TODO
- **Authoritative deliverable source:** `/Users/danielbalsby/.codex/.chatgpt-projects/g-p-6a579b149fbc8191924b9f7056723d79/deliverables/Cortex Specification v1.0.docx`
- **Canonical path:** `docs/specifications/Cortex-Specification-v1.0.docx`
- **SHA-256:** `1b45a5e6d52284a3dfaaba66d05a0a533b7370e9362ba946d602b65ba607685f`
- **Hierarchy role:** System specification subordinate to governance and superior to Software Architecture

## Governance hierarchy

```text
Cortex Philosophy
    ↓ interpretive source
Cortex Constitution
    ↓ highest proposed normative authority
Cortex Governance Framework
    ↓ governance policy and document control
Cortex Specification
    ↓ binding system requirements
Software Architecture
    ↓
Implementation
    ↓
Verification and audit evidence
```

The Stress Test is an independent assurance input beside the Governance Framework. It evaluates the Framework's readiness and imposes unresolved activation gates; it is not inserted as a higher normative layer.

## Canonicality rule

- Only the repository paths in this register are canonical engineering copies.
- The external deliverables remain the authorised import sources and hash reference.
- QA PDFs, work files, editorial reports and earlier repository documents are not canonical copies of these artifacts.
- No existing document is deleted solely because its subject overlaps an adopted artifact.
- Any future canonical replacement must preserve history, identify its predecessor and update this register.

## Known duplicate and overlap register

| Canonical artifact | Other located material | Classification |
|---|---|---|
| Cortex Philosophy | QA PDFs, original/work DOCX files, editorial reports, `docs/vision/MANIFEST.md`, archived `RFC-001-Cortex-Clinical-Philosophy.md` | Source variants, reviews or semantic predecessors; not canonical |
| Constitution report | QA PDF; `docs/governance/ENGINEERING-CONSTITUTION.md` | Rendered derivative or narrower engineering predecessor; not canonical |
| Governance Framework | QA PDF; `docs/governance/DEVELOPMENT-WORKFLOW.md`; `docs/governance/REVIEW-PROCESS.md` | Rendered derivative or subordinate pre-adoption governance material; not canonical |
| Stress Test | Two QA PDFs with different file sizes; `docs/governance/TESTING-STRATEGY.md` | Rendered/review variants or subordinate testing guidance; not canonical |
| Specification | QA PDF; `docs/vision/MVP-001-The-First-Clinical-Product.md`; `docs/vision/WF-001-The-Consultation-Workflow.md` | Rendered derivative or product/workflow predecessors; not canonical |

No duplicate or overlap was deleted.
