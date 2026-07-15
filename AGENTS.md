# Agent instructions

Before changing the repository, read in this order:

1. `docs/vision/MANIFEST.md`
2. `docs/vision/CX-001-The-Perfect-Consultation.md`
3. `docs/vision/MVP-001-The-First-Clinical-Product.md`
4. `docs/vision/WF-001-The-Consultation-Workflow.md`
5. `docs/governance/ENGINEERING-CONSTITUTION.md`
6. `docs/governance/CLINICAL-SAFETY-PRINCIPLES.md`
7. `docs/architecture/README.md`
8. The relevant specification under `docs/clinical/pathways/`

## Working rules

- Clinical safety takes precedence over convenience, speed and feature scope.
- Never treat an unconfirmed default as a clinical fact.
- Never invent clinical information, evidence, requirements or source references.
- Generic behavior belongs in `engine/`.
- Disease-specific logic belongs in pathway content or pathway-specific definitions under `clinical/`.
- React components must not contain disease-specific clinical logic.
- Do not modify foundational documents under `docs/vision/` unless explicitly instructed.
- Preserve clinician control: suggestions and drafts never become clinical decisions automatically.
- Keep application, clinical and documentation claims aligned with current implementation.
- Run `npm run typecheck` and `npm run build` after code changes.
- Do not commit or push unless explicitly instructed.
- Report changed files, tests performed and unresolved risks at completion.
