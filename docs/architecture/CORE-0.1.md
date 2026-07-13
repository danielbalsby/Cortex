# Cortex Core 0.1 Architecture

Clinical content is data. Rendering and behavior are generic.

- `clinical/types`: domain contracts
- `clinical/pathways`: clinical data and rules
- `engine`: state, rules and PSOAP output
- `components/consultation`: generic renderer
- `app`: composition

No knee-specific clinical logic is allowed in UI components.
