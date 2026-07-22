export type DocumentationLevel = "short" | "standard" | "extended";
export type ExplicitBoolean = "yes" | "no" | "not-assessed";
export type TestResult = "negative" | "positive" | "not-performed" | "not-assessable";

export type PainProvocation =
  | "walking"
  | "stairs"
  | "rotation"
  | "running"
  | "jumping"
  | "direction-change";

export type PalpationFinding =
  | "medial-joint-line"
  | "lateral-joint-line"
  | "mcl"
  | "lcl"
  | "patella"
  | "patellar-tendon"
  | "quadriceps-tendon"
  | "pes-anserinus";

export interface SprintOneOneHistory {
  readonly side?: "right" | "left";
  readonly onset?: "acute" | "insidious" | "gradual";
  readonly duration?: string;
  readonly painCourse?: "constant" | "intermittent" | "increasing" | "decreasing";
  readonly trauma?: "yes" | "no";
  readonly traumaMechanism?: "twisting" | "direct-blow" | "fall" | "other";
  readonly traumaContext?: string;
  readonly painLocation?: "medial" | "lateral" | "anterior" | "posterior" | "diffuse";
  readonly provocations: readonly PainProvocation[];
  readonly function?: "unaffected" | "mildly-reduced" | "significantly-reduced" | "unable-to-bear-weight";
  readonly swelling?: "none" | "mild" | "persistent" | "marked";
  readonly swellingTiming?: string;
  readonly locking?: ExplicitBoolean;
  readonly instability?: ExplicitBoolean;
  readonly restPain?: ExplicitBoolean;
  readonly nightPain?: ExplicitBoolean;
  readonly fever?: ExplicitBoolean;
  readonly systemicIllness?: ExplicitBoolean;
  readonly redHotSwollenJoint?: ExplicitBoolean;
}

export interface SprintOneOneObjective {
  readonly gait?: "normal" | "limp" | "unable" | "not-assessed";
  readonly inspection?: "no-specific-findings" | "swelling" | "redness" | "deformity" | "not-assessed";
  readonly extensionDegrees?: number;
  readonly flexionDegrees?: number;
  readonly rangeNotAssessable?: boolean;
  readonly effusion?: "none" | "mild" | "moderate" | "large" | "not-assessed";
  readonly palpationFindings: readonly PalpationFinding[];
  readonly palpationStatus?: "findings-recorded" | "no-focal-tenderness" | "not-performed" | "not-assessable";
  readonly lachman?: TestResult;
  readonly valgus?: "stable" | "lax" | "painful-no-laxity" | "not-performed" | "not-assessable";
  readonly varus?: "stable" | "lax" | "painful-no-laxity" | "not-performed" | "not-assessable";
  readonly meniscalTest?: TestResult;
  readonly patella?: "negative" | "positive" | "not-performed" | "not-assessable";
  readonly neurovascular?: "normal" | "abnormal" | "not-assessed" | "not-assessable";
}

export interface SprintOneOnePlan {
  readonly management?: string;
  readonly followUp?: string;
  readonly safetyNet?: string;
  readonly imagingIntent?: boolean;
  readonly imagingModality?: "x-ray" | "mri";
}

export interface SprintOneOneState {
  readonly history: SprintOneOneHistory;
  readonly objective: SprintOneOneObjective;
  readonly assessment?: string;
  readonly plan: SprintOneOnePlan;
  readonly documentationLevel: DocumentationLevel;
}

export function createEmptySprintOneOneState(): SprintOneOneState {
  return {
    history: { provocations: [] },
    objective: { palpationFindings: [] },
    plan: {},
    // Presentation only; it cannot create or change a clinical fact.
    documentationLevel: "standard"
  };
}
