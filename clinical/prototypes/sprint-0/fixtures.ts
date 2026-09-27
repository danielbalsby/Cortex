import type { WorkspaceAction } from "@/clinical/prototypes/clinical-document-workspace/reducer";

export interface SyntheticPatientFixture {
  readonly id: string;
  readonly label: string;
  readonly demographics: string;
  readonly currentContact: readonly string[];
  readonly previousContext: readonly string[];
  readonly relevantNegatives: readonly string[];
  readonly missingOrUncertain: readonly string[];
}

export const SPRINT_ZERO_PATIENT: SyntheticPatientFixture = {
  id: "SYN-KNEE-034",
  label: "Syntetisk patient A",
  demographics: "Mand, 34 år",
  currentContact: [
    "Vridtraume under fodbold i går.",
    "Mediale smerter i højre knæ og let hævelse."
  ],
  previousContext: [
    "Tidligere knæoplysninger er ikke leveret i dette syntetiske testdatasæt."
  ],
  relevantNegatives: ["Patienten oplyser ingen låsning."],
  missingOrUncertain: [
    "Instabilitet og belastningsevne er ikke oplyst i patientkonteksten.",
    "Objektiv undersøgelse er endnu ikke registreret.",
    "Mistanken om menisk- eller ligamentskade er en arbejdshypotese, ikke en diagnose."
  ]
};

export const SPRINT_ZERO_CONSULTATION_ACTIONS: readonly WorkspaceAction[] = [
  { type: "set-fact", key: "side", value: "right" },
  { type: "set-fact", key: "onset", value: "acute" },
  { type: "set-fact", key: "duration", value: "siden i går" },
  { type: "set-fact", key: "precipitatingFactor", value: "trauma" },
  { type: "toggle-list-fact", key: "traumaMechanisms", value: "twisting-planted-foot" },
  { type: "toggle-list-fact", key: "painLocations", value: "medial" },
  { type: "set-fact", key: "swelling", value: "delayed-mild" },
  { type: "set-fact", key: "locking", value: "no" }
];
