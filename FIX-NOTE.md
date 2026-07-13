# Build fix

This package fixes the missing TypeScript domain types for:

- Assessment suggestions
- Plan recommendations
- Ranked clinical suggestions

The previous package contained the implementation but not the corresponding
type declarations, which caused 15 TypeScript errors.
