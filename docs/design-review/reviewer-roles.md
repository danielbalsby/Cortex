# Reviewer roles

Use only roles relevant to scope and record omissions as `N/E`. Every reviewer delivers prioritised findings with observations separated from inference, evidence references, exclusions, and strengths to preserve.

| Role | Mandate and questions | Evidence expected | Exclusions |
|---|---|---|---|
| Senior General Practitioner | Test consultation fit, clinical narrative, decision burden, and usefulness: could this support a busy, safe consultation? | Completed realistic scenarios, workflow notes, generated record | Does not provide formal validation or specialty-wide consensus |
| Clinical Informatics Reviewer | Assess information model, terminology, structured data, provenance, and output fidelity | Input/output trace, terminology and omission examples | Does not approve architecture or evidence base |
| UX Reviewer | Assess comprehension, discoverability, cognitive load, error recovery, and end-to-end usability | Interaction observations and scenario evidence | Does not infer clinical correctness |
| Interaction Design Reviewer | Assess control behaviour, navigation, progressive disclosure, keyboard flow, and feedback | Reproduction steps, state changes, focus/DOM evidence | Does not certify accessibility |
| Accessibility Reviewer | Assess keyboard, focus, semantics, zoom/responsive behaviour, contrast, and assistive-technology risks | Browser/DOM evidence and named tools where used | No conformance claim without full scoped audit |
| Product Design Reviewer | Assess hierarchy, density, typography, consistency, and product coherence | Viewport screenshots and comparative states | Does not substitute aesthetic preference for workflow evidence |
| Clinical Safety Reviewer | Identify hazards, misleading output, omission, failure modes, and unsafe defaults | Hazard-linked scenarios, output and recovery evidence | Does not issue regulatory or organisational safety approval alone |
| Software/Performance Reviewer | Assess responsiveness, failure handling, state integrity, and observable performance risks | Browser/network traces and reproducible failures | Does not replace code, security, load, or architecture review |
| Patient Perspective Reviewer | Where relevant, assess understandable language, dignity, transparency, and likely patient impact | Scenario observations and participant context | Does not represent all patients or give clinical approval |
| Review Chair / Synthesiser | Define scope, check evidence, resolve duplication, preserve disagreement, apply gates, and own the report | Evidence register, scorecard, conflict log, decision record | Must not invent consensus or override a safety blocker by averaging |

Reviewers ask: what happened, under which conditions, what evidence supports it, why it matters, what remains unknown, and what should happen next?
