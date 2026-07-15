# Clinical Workspace

**Status:** Active prototype guidance  
**Owner:** Cortex  
**Last reviewed:** 2026-07-15

This document describes the current prototype workspace. Universal consultation behavior remains defined by [`WF-001`](../vision/WF-001-The-Consultation-Workflow.md).

## Workspace model

The prototype uses one screen with a consultation input area and a persistent output area. The clinician records structured information once; visible summaries, feedback and active drafts update from that shared state.

## Current implemented behavior

### Consultation input area

- The active pathway is rendered as collapsible clinical sections.
- Single-choice, multi-choice and short-text fields are supported.
- All clinical answers begin empty.
- Sections and fields may appear or disappear when explicit answers satisfy pathway conditions.
- Answers belonging to newly hidden fields are removed from consultation state.

### Live clinical summary

- The always-active journal draft is grouped as PSOAP.
- Only visible fields with recorded values contribute text.
- The selected output and its current word count are shown in the output area.

### Quality and safety feedback

- Rule-based alerts appear in the consultation cockpit when every configured condition matches.
- When no rule matches, the UI states only that no configured acute rule-based concern was triggered; it does not certify clinical safety.
- Assessment suggestions show matched supporting findings and require explicit clinician selection.
- A selected assessment may expose an optional plan recommendation that the clinician must actively apply.

### Active administrative outputs

- The journal is always available.
- Physiotherapy, X-ray and orthopedic referral drafts appear only when their corresponding plan action is selected.
- Each active output is selectable in the same cockpit.

### Readiness and missing information

- Outputs show either readiness or a list of missing or insufficiently described information.
- Readiness is a prototype completeness signal, not clinical approval.
- Clinical alerts and administrative completeness are presented separately.

### Copying to the existing EHR

- The clinician can copy the currently selected draft to the clipboard.
- Cortex does not write directly to an EHR.
- The clinician must review clinical content, recipient and local requirements before pasting or using a draft.

## Intended near-term behavior

- More precise and clinically reviewed readiness requirements.
- Reliable keyboard navigation and visible focus throughout the workspace.
- Clearer distinction between missing, uncertain, suggested and confirmed information.
- Automated tests for visibility, alerts, suggestions, outputs and state pruning.
- Clinician-tested wording and hierarchy for safety and completeness feedback.
- Architecture validation with one acute and one chronic-care pathway.

These items are intentions, not current capabilities.

## Future possibilities

- Patient-information and certificate drafts.
- Controlled integration with clinic systems.
- Additional pathway families after architecture and clinical validation.
- More contextual assistance where sources, uncertainty and clinician control can remain explicit.

Future possibilities are not commitments and must pass the product roadmap's expansion gates.

## Workspace boundaries

- Cortex is not the permanent medical record.
- It does not currently persist consultations or patient identity.
- It does not prescribe, order, refer or send information automatically.
- It does not determine that a consultation is clinically complete.
- It must never convert an unanswered value into a clinical fact.

