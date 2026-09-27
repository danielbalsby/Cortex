export type DocumentationLevel = "short" | "standard" | "extended";
export type ExplicitBoolean = "yes" | "no" | "not-assessed";
export type TestResult = "negative" | "positive" | "not-performed" | "not-assessable";

export interface SprintOneHistory {
  readonly side?: "right" | "left";
  readonly onset?: "acute" | "gradual" | "unclear";
  readonly duration?: string;
  readonly trauma?: "yes" | "no";
  readonly traumaMechanism?: "twisting" | "direct-blow" | "fall" | "other";
  readonly painLocation?: "medial" | "lateral" | "anterior" | "posterior" | "diffuse";
  readonly swelling?: "none" | "mild" | "persistent" | "marked";
  readonly locking?: ExplicitBoolean;
  readonly instability?: ExplicitBoolean;
  readonly weightBearing?: "normal" | "limp" | "cannot-four-steps" | "not-assessed";
  readonly fever?: ExplicitBoolean;
  readonly systemicIllness?: ExplicitBoolean;
  readonly redHotSwollenJoint?: ExplicitBoolean;
}

export interface SprintOneObjective {
  readonly gait?: "normal" | "limp" | "unable" | "not-assessed";
  readonly inspection?: "no-specific-findings" | "swelling" | "redness" | "deformity" | "not-assessed";
  readonly rangeOfMotion?: "full" | "reduced" | "blocked" | "not-assessed" | "not-assessable";
  readonly effusion?: "none" | "mild" | "moderate" | "large" | "not-assessed";
  readonly palpation?: "no-focal-tenderness" | "medial-joint-line" | "mcl" | "bony" | "not-assessed";
  readonly lachman?: TestResult;
  readonly valgus?: "stable" | "lax" | "painful-no-laxity" | "not-performed" | "not-assessable";
  readonly varus?: "stable" | "lax" | "painful-no-laxity" | "not-performed" | "not-assessable";
  readonly meniscalTest?: TestResult;
  readonly patella?: "no-specific-findings" | "abnormal" | "not-performed" | "not-assessable";
  readonly neurovascular?: "normal" | "abnormal" | "not-assessed" | "not-assessable";
}

export interface SprintOnePlan {
  readonly management?: string;
  readonly followUp?: string;
  readonly safetyNet?: string;
  readonly imaging?: {
    readonly modality?: "x-ray" | "mri";
    readonly indication?: string;
    readonly clinicalQuestion?: string;
  };
  readonly physiotherapy?: {
    readonly purpose?: string;
  };
}

export interface SprintOneState {
  readonly history: SprintOneHistory;
  readonly objective: SprintOneObjective;
  readonly assessment?: string;
  readonly plan: SprintOnePlan;
  readonly documentationLevel: DocumentationLevel;
}

export function createEmptySprintOneState(): SprintOneState {
  return {
    history: {},
    objective: {},
    plan: {},
    // Presentational only: it changes wording density, never clinical truth.
    documentationLevel: "standard"
  };
}

