import type { SprintOneAction } from "./reducer";

export const SPRINT_ONE_CASE = {
  id: "SYN-KNEE-034",
  title: "Højre knæsmerter efter vridtraume",
  demographics: "34-årig mand",
  source: [
    "Vridtraume under fodbold i går.",
    "Mediale knæsmerter og let hævelse.",
    "Patienten oplyser ingen aflåsning."
  ],
  uncertainty: [
    "Instabilitet og belastningsevne er ikke oplyst.",
    "Objektiv undersøgelse og røde flag er ikke vurderet.",
    "Menisk- eller ligamentskade er en arbejdshypotese, ikke en diagnose."
  ]
} as const;

export const SPRINT_ONE_CASE_ACTIONS: readonly SprintOneAction[] = [
  { type: "set-history", key: "side", value: "right" },
  { type: "set-history", key: "onset", value: "acute" },
  { type: "set-history", key: "duration", value: "siden i går" },
  { type: "set-history", key: "trauma", value: "yes" },
  { type: "set-history", key: "traumaMechanism", value: "twisting" },
  { type: "set-history", key: "painLocation", value: "medial" },
  { type: "set-history", key: "swelling", value: "mild" },
  { type: "set-history", key: "locking", value: "no" }
] as const;

