Archived: 2026-07-15  
Status: Read-only historical record  
Reason: Superseded architecture snapshot retained for historical context.  
Replacement: `docs/architecture/README.md`

---

# Cortex Core 0.1 Architecture

Clinical content is data. Rendering and behavior are generic.

- `clinical/types`: domain contracts
- `clinical/pathways`: clinical data and rules
- `engine`: state, rules and PSOAP output
- `components/consultation`: generic renderer
- `app`: composition

No knee-specific clinical logic is allowed in UI components.
