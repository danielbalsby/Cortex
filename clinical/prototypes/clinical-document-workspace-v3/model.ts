/**
 * Isolated learning-prototype state model (v3).
 *
 * This is a self-contained refinement track. It does not import from and is
 * not imported by `engine/`, `clinical/pathways/`, `clinical/types/`, or the
 * production Encounter Engine. It borrows structural patterns (grouped
 * negative confirmation, positive-override, toggle-to-clear) from the
 * baseline `clinical-document-workspace` prototype and the PSOAP line-prefix
 * convention (`P:`/`S:`/`O:`/`A:`/`P:`) used by the production PSOAP
 * generator, without depending on either.
 *
 * Facts vs derivations vs clinician assessment remain distinct:
 * - `facts` — explicit clinician-recorded observations only.
 * - `negativeBundle` / `redFlags` — grouped *confirmation* bookkeeping, not
 *   new clinical rules; they only ever set explicit "no" facts on request.
 * - `assessmentNote` / `workingDiagnoses` — clinician-owned judgement only.
 *   No suggestion engine, no rule-based diagnosis, no acute action logic.
 */

export type Side = "right" | "left" | "bilateral";

export type ProblemProfileId = "knee-trauma" | "knee-gradual" | "knee-child";

export interface ProblemProfile {
  readonly id: ProblemProfileId;
  readonly label: string;
  readonly keywords: readonly string[];
  readonly hint: string;
}

/**
 * Problem profiles only steer prototype flow/emphasis (e.g. which group is
 * focused first). They are never written into `facts` and never appear as a
 * recorded clinical fact.
 */
export const PROBLEM_PROFILES: readonly ProblemProfile[] = [
  {
    id: "knee-trauma",
    label: "Knæsmerter – traume",
    keywords: ["knæ", "knæsmerte", "knæsmerter", "traume", "vrid", "skade"],
    hint: "Lægger vægt på traumemekanisme og akutte fund. Styrer kun visning — ikke kliniske facts."
  },
  {
    id: "knee-gradual",
    label: "Knæsmerter – snigende",
    keywords: [
      "knæ",
      "knæsmerte",
      "knæsmerter",
      "snig",
      "snigende",
      "gradvis",
      "artrose",
      "belastning"
    ],
    hint: "Lægger vægt på belastningsmønster og forløb over tid. Styrer kun visning — ikke kliniske facts."
  },
  {
    id: "knee-child",
    label: "Knæsmerter – barn",
    keywords: ["knæ", "knæsmerte", "knæsmerter", "barn", "børn", "ung"],
    hint: "Lægger vægt på vækst, aktivitetsniveau og forældreanamnese. Styrer kun visning — ikke kliniske facts."
  }
];

export function searchProblemProfiles(query: string): readonly ProblemProfile[] {
  const normalized = query.trim().toLocaleLowerCase("da");
  if (!normalized) return PROBLEM_PROFILES;
  return PROBLEM_PROFILES.filter((profile) =>
    profile.keywords.some(
      (keyword) => keyword.includes(normalized) || normalized.includes(keyword)
    )
  );
}

export type Onset = "acute" | "gradual" | "recurrent" | "unclear";
export type TraumaAnswer = "yes" | "no" | "unclear";
export type TraumaMechanism =
  | "twisting-planted-foot"
  | "direct-blow"
  | "fall"
  | "valgus-force"
  | "varus-force"
  | "hyperextension"
  | "sport-contact"
  | "other";
export type PainLocation = "medial" | "lateral" | "anterior" | "posterior" | "diffuse";
export type PainPattern = "load-related" | "start-up" | "stairs" | "constant" | "intermittent";
export type FunctionStatus = "normal" | "limp" | "cannot-four-steps";
export type YesNo = "yes" | "no";
export type InspectionFinding = "swelling" | "redness" | "warmth" | "deformity";
export type RomStatus = "normal" | "abnormal";
export type JointStatus = "full" | "reduced" | "blocked";
export type Tenderness = "none-focal" | "medial-joint-line" | "lateral-joint-line";
export type PainMedication = "paracetamol" | "nsaid";
export type PlanAction = "information" | "activity" | "exercise" | "physiotherapy" | "imaging";
export type RedFlagKey = "fever" | "generalImpact" | "hotSwollenKnee";
export type NegativeBundleKey = "locking" | "instability" | "restPain" | "nightPain";

export interface PrototypeFactsV3 {
  readonly side?: Side;
  readonly onset?: Onset;
  readonly duration?: string;
  readonly trauma?: TraumaAnswer;
  readonly traumaMechanisms?: readonly TraumaMechanism[];
  readonly traumaNote?: string;
  readonly painLocations?: readonly PainLocation[];
  readonly painPatterns?: readonly PainPattern[];
  readonly function?: FunctionStatus;
  readonly swelling?: YesNo;
  readonly locking?: YesNo;
  readonly instability?: YesNo;
  readonly restPain?: YesNo;
  readonly nightPain?: YesNo;
  readonly fever?: YesNo;
  readonly generalImpact?: YesNo;
  readonly hotSwollenKnee?: YesNo;
  readonly subjectiveNote?: string;
  readonly gait?: "normal" | "limp" | "unable";
  readonly inspection?: readonly InspectionFinding[];
  readonly rom?: RomStatus;
  readonly extension?: JointStatus;
  readonly flexion?: JointStatus;
  readonly tenderness?: Tenderness;
  readonly objectiveNote?: string;
}

export type FactKeyV3 = keyof PrototypeFactsV3;
export type ListFactKeyV3 = "traumaMechanisms" | "painLocations" | "painPatterns" | "inspection";

export interface WorkingDiagnosis {
  readonly id: string;
  readonly label: string;
}

export interface GroupConfirmationState<K extends string> {
  readonly confirmed: boolean;
  readonly appliedKeys: readonly K[];
}

export interface PrototypeStateV3 {
  readonly mode: "quick" | "standard";
  readonly problemProfile?: ProblemProfileId;
  readonly facts: PrototypeFactsV3;
  readonly negativeBundle: GroupConfirmationState<NegativeBundleKey>;
  readonly redFlags: GroupConfirmationState<RedFlagKey>;
  readonly assessmentNote: string;
  readonly workingDiagnoses: readonly WorkingDiagnosis[];
  readonly planActions: readonly PlanAction[];
  readonly painMedications: readonly PainMedication[];
  readonly followUpStandardPhrase: boolean;
  readonly safetyNetDiscussed: boolean;
  readonly safetyNetNote?: string;
}

export const NEGATIVE_BUNDLE_FINDINGS: readonly { readonly key: NegativeBundleKey; readonly label: string }[] = [
  { key: "locking", label: "Aflåsning" },
  { key: "instability", label: "Instabilitet" },
  { key: "restPain", label: "Hvilesmerter" },
  { key: "nightPain", label: "Nattesmerter" }
];

export const NEGATIVE_BUNDLE_LABEL = "Ingen aflåsning, instabilitet, hvile- eller nattesmerter";

export const RED_FLAG_FINDINGS: readonly { readonly key: RedFlagKey; readonly label: string }[] = [
  { key: "fever", label: "Feber" },
  { key: "generalImpact", label: "Almen påvirkning" },
  { key: "hotSwollenKnee", label: "Rødt/varmt/akut hævet knæ" }
];

export const NO_RED_FLAGS_LABEL = "Ingen red flags";

export function createEmptyStateV3(): PrototypeStateV3 {
  return {
    mode: "quick",
    facts: {},
    negativeBundle: { confirmed: false, appliedKeys: [] },
    redFlags: { confirmed: false, appliedKeys: [] },
    assessmentNote: "",
    workingDiagnoses: [],
    planActions: [],
    painMedications: [],
    followUpStandardPhrase: false,
    safetyNetDiscussed: false
  };
}
