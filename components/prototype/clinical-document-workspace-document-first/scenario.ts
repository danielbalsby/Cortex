import type { WorkspaceAction } from "@/clinical/prototypes/clinical-document-workspace/reducer";

export const ACUTE_RIGHT_TWIST_SCENARIO: readonly WorkspaceAction[] = [
  { type: "set-fact", key: "side", value: "right" },
  { type: "set-fact", key: "onset", value: "acute" },
  { type: "set-fact", key: "duration", value: "siden i går" },
  { type: "set-fact", key: "precipitatingFactor", value: "trauma" },
  { type: "toggle-list-fact", key: "traumaMechanisms", value: "twisting-planted-foot" },
  { type: "toggle-list-fact", key: "painLocations", value: "medial" },
  { type: "set-fact", key: "function", value: "cannot-four-steps" },
  { type: "set-fact", key: "swelling", value: "delayed-mild" },
  { type: "set-fact", key: "locking", value: "no" },
  { type: "set-fact", key: "instability", value: "no" },
  { type: "set-fact", key: "fever", value: "no" },
  { type: "set-fact", key: "gait", value: "limp" },
  { type: "set-fact", key: "effusion", value: "mild" },
  { type: "set-fact", key: "extension", value: "reduced" },
  { type: "set-fact", key: "straightLegRaise", value: "intact" },
  { type: "set-fact", key: "tenderness", value: "medial-joint-line" }
];
