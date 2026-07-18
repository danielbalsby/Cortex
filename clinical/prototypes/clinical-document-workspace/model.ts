export type PrototypeMode = "quick" | "standard";
export type Side = "right" | "left" | "bilateral";
export type Onset = "acute" | "gradual" | "recurrent" | "unclear" | "other";
export type PrecipitatingFactor = "trauma" | "none" | "unclear";
export type TraumaMechanism =
  | "twisting-planted-foot"
  | "direct-blow"
  | "fall"
  | "valgus-force"
  | "varus-force"
  | "hyperextension"
  | "forced-flexion"
  | "patellar-displacement"
  | "sport-contact"
  | "traffic"
  | "unclear"
  | "other";
export type PainLocation = "medial" | "lateral" | "anterior" | "posterior" | "diffuse";
export type PainPattern =
  | "load-related"
  | "start-up"
  | "stairs"
  | "rest"
  | "night"
  | "constant"
  | "intermittent"
  | "other";
export type FunctionStatus = "normal" | "limp" | "cannot-four-steps";
export type Swelling = "none" | "delayed-mild" | "persistent-mild" | "marked";

export interface PrototypeFacts {
  readonly side?: Side;
  readonly onset?: Onset;
  readonly duration?: string;
  readonly precipitatingFactor?: PrecipitatingFactor;
  readonly traumaMechanisms?: readonly TraumaMechanism[];
  readonly traumaMechanismNote?: string;
  readonly painLocations?: readonly PainLocation[];
  readonly painPatterns?: readonly PainPattern[];
  readonly function?: FunctionStatus;
  readonly swelling?: Swelling;
  readonly locking?: "no" | "yes";
  readonly instability?: "no" | "yes";
  readonly fever?: "no" | "yes";
  readonly generalCondition?: "unaffected" | "mildly-affected" | "clearly-affected";
  readonly gait?: "normal" | "limp" | "unable";
  readonly deformity?: "none" | "present";
  readonly redness?: "none" | "present";
  readonly warmth?: "none" | "present";
  readonly effusion?: "none-significant" | "mild" | "moderate" | "large";
  readonly extension?: "full" | "reduced" | "blocked";
  readonly straightLegRaise?: "intact" | "not-intact";
  readonly tenderness?: "none-focal" | "medial-joint-line" | "lateral-joint-line";
  readonly historyNote?: string;
  readonly objectiveNote?: string;
  readonly followUp?: string;
  readonly safetyNet?: string;
}

export type PrototypeFactKey = keyof PrototypeFacts;
export type ListFactKey = "traumaMechanisms" | "painLocations" | "painPatterns";
export type NormalFindingKey =
  | "generalCondition"
  | "gait"
  | "deformity"
  | "redness"
  | "warmth"
  | "effusion"
  | "extension"
  | "straightLegRaise";

export type NormalFindingDefinition = {
  [K in NormalFindingKey]: {
    readonly key: K;
    readonly label: string;
    readonly normalValue: NonNullable<PrototypeFacts[K]>;
  };
}[NormalFindingKey];

export const NORMAL_BASIC_FINDINGS: readonly NormalFindingDefinition[] = [
  { key: "generalCondition", label: "Upåvirket almentilstand", normalValue: "unaffected" },
  { key: "gait", label: "Normal gang", normalValue: "normal" },
  { key: "deformity", label: "Ingen deformitet", normalValue: "none" },
  { key: "redness", label: "Ingen rødme", normalValue: "none" },
  { key: "warmth", label: "Ingen varmeøgning", normalValue: "none" },
  { key: "effusion", label: "Ingen betydende effusion", normalValue: "none-significant" },
  { key: "extension", label: "Fuld ekstension", normalValue: "full" },
  { key: "straightLegRaise", label: "Intakt straight-leg raise", normalValue: "intact" }
] as const;

export interface NormalGroupState {
  readonly confirmed: boolean;
  readonly appliedKeys: readonly NormalFindingKey[];
}

export interface WorkingDiagnosis {
  readonly id: string;
  readonly label: string;
  readonly source: "suggestion" | "free-text";
  readonly qualifier?: string;
}

export type PlanAction =
  | "information"
  | "activity"
  | "exercise"
  | "physiotherapy"
  | "imaging"
  | "follow-up"
  | "safety-net";

export type ImagingStatus =
  | "not-indicated-now"
  | "planned"
  | "ordered-or-referred"
  | "completed-known"
  | "deferred"
  | "unclear";
export type ImagingModality =
  | "acute-x-ray"
  | "standing-weight-bearing-x-ray"
  | "mri"
  | "ultrasound"
  | "other";
export type ImagingAction =
  | "no-imaging-now"
  | "prepare-referral"
  | "send-referral"
  | "review-existing-result"
  | "reassess-before-decision"
  | "other";

export interface ImagingPlan {
  readonly status?: ImagingStatus;
  readonly modality?: ImagingModality;
  readonly side?: Side;
  readonly indication?: string;
  readonly clinicalQuestion?: string;
  readonly plannedAction?: ImagingAction;
}

export interface ClinicalDocumentPrototypeState {
  readonly mode: PrototypeMode;
  readonly facts: PrototypeFacts;
  readonly normalGroup: NormalGroupState;
  readonly workingDiagnoses: readonly WorkingDiagnosis[];
  readonly planActions: readonly PlanAction[];
  readonly imaging?: ImagingPlan;
}

export interface ClinicalDocumentSectionDefinition {
  readonly id: "history" | "objective" | "assessment" | "plan";
  readonly number: string;
  readonly label: string;
}

export const CLINICAL_DOCUMENT_CONTEXT = {
  problemCode: "knee-pain",
  problemLabel: "Knæsmerte"
} as const;

export const CLINICAL_DOCUMENT_SECTIONS: readonly ClinicalDocumentSectionDefinition[] = [
  { id: "history", number: "01", label: "Anamnese" },
  { id: "objective", number: "02", label: "Objektivt" },
  { id: "assessment", number: "03", label: "Vurdering" },
  { id: "plan", number: "04", label: "Plan" }
] as const;

export function createEmptyClinicalDocumentState(): ClinicalDocumentPrototypeState {
  return {
    mode: "quick",
    facts: {},
    normalGroup: { confirmed: false, appliedKeys: [] },
    workingDiagnoses: [],
    planActions: []
  };
}

export function setPrototypeMode(
  state: ClinicalDocumentPrototypeState,
  mode: PrototypeMode
): ClinicalDocumentPrototypeState {
  if (state.mode === mode) return state;
  return { ...state, mode };
}
