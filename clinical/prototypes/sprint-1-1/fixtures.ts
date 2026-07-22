import type { SprintOneOneAction } from "./reducer";

export const SPRINT_ONE_ONE_CASE = {
  id: "SYN-KNEE-034-S11",
  title: "Højre knæsmerter efter vridtraume",
  demographics: "34-årig mand",
  source: [
    "Vridtraume under fodbold i går.",
    "Mediale knæsmerter og let hævelse.",
    "Ingen aflåsning oplyst."
  ],
  notProvided: [
    "Smerteforløb, provokation, funktion, hvile- og nattesmerter er ikke oplyst.",
    "Hævelsens tidsforløb er ikke oplyst.",
    "Objektiv undersøgelse, røde flag, vurdering og plan er ikke udført."
  ]
} as const;

export const SPRINT_ONE_ONE_CASE_ACTIONS: readonly SprintOneOneAction[] = [
  { type: "set-history", key: "side", value: "right" },
  { type: "set-history", key: "onset", value: "acute" },
  { type: "set-history", key: "duration", value: "siden i går" },
  { type: "set-history", key: "trauma", value: "yes" },
  { type: "set-history", key: "traumaMechanism", value: "twisting" },
  { type: "set-history", key: "traumaContext", value: "under fodbold" },
  { type: "set-history", key: "painLocation", value: "medial" },
  { type: "set-history", key: "swelling", value: "mild" },
  { type: "set-history", key: "locking", value: "no" }
] as const;
