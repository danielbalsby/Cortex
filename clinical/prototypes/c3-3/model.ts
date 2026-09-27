import {
  createEmptyC32State,
  type C32State
} from "@/clinical/prototypes/c3-2/model";

import type { C33ProblemProfileId } from "./fixtures";

export const C33_SCENARIO_VERSION = "C33-CALM-FAST-FLOW-001@1.0";

/**
 * Restricted to the two mechanical symptoms (C33-RF-GROUPS-001@1.0). restPain
 * and nightPain are now red-flag content (see the "malignancy" consequence
 * group) and must only ever be written through an explicit, dedicated
 * clinician action — never bundled into this generic negative batch.
 */
export type C33NegativeSymptomField =
  | "locking"
  | "instability";

export interface C33NegativeSymptomBatchRecord {
  readonly id: string;
  readonly fields: readonly C33NegativeSymptomField[];
  readonly status: "active" | "undone";
}

/**
 * Five clinician-facing red flag consequence groups (C33-RF-GROUPS-001@1.0).
 * Each group is its own explicit, reversible clinician decision. There is no
 * shared or hidden fact behind a group: the group id and status are the only
 * record of what the clinician confirmed, so nothing is written silently to
 * any other field and nothing is inferred from unrelated answers.
 */
export type C33RedFlagGroupId =
  | "infection"
  | "cannot-bear-weight"
  | "rapid-swelling"
  | "malignancy"
  | "high-energy-trauma";

export type C33RedFlagGroupStatus = "yes" | "no";

export interface C33RedFlagBatchRecord {
  readonly id: string;
  readonly groups: readonly C33RedFlagGroupId[];
  readonly status: "active" | "undone";
}

/**
 * Local, bounded trauma detail. The canonical `history.traumaMechanism` enum
 * only distinguishes twisting/direct-blow/fall/other; these five buttons are
 * a prototype-local elaboration of "other" plus two independent facts
 * (a felt snap, weight-bearing capacity) that have no canonical field. None
 * of this is inferred — it only exists once the clinician picks it, and it is
 * cleared whenever Traume is set to anything other than "Ja".
 */
export type C33TraumaMechanismDetail =
  | "twisting"
  | "direct-blow"
  | "hyperextension"
  | "valgus-varus"
  | "landing";

export type C33WeightBearingCapacity = "gte-4-steps" | "lt-4-steps";

/**
 * Ledsagesymptomer (C3.3-local, no canonical equivalent). Purely additive —
 * never touches locking/instability/restPain/nightPain or any red flag.
 */
export type C33AccompanyingSymptomId =
  | "crepitus"
  | "morning-stiffness"
  | "snapping-or-clicking"
  | "other-joints"
  | "rash"
  | "recent-infection";

export interface C33AccompanyingSymptomBatchRecord {
  readonly id: string;
  readonly status: "active" | "undone";
}

/**
 * Baggrund · valgfrit — background only, never decision-critical on its own
 * and never a source of a red flag. Selecting a chip highlights a possibly
 * related red-flag group in the UI copy only; it never writes to
 * `redFlagGroups` and never adds a hidden sentence.
 */
export type C33ComorbidityChip =
  | "osteoarthritis"
  | "inflammatory-joint-disease"
  | "diabetes"
  | "immunosuppression"
  | "prior-cancer"
  | "coagulation-disorder";

export type C33MedicationChip = "anticoagulants" | "steroids";

export interface C33Background {
  readonly priorKneeIssue?: boolean;
  /** Optional free-text elaboration of prior knee issue (UI: Supplerende). */
  readonly priorKneeNote?: string;
  /**
   * Legacy boolean retained for upgrade safety. Shown under Komorbiditet as
   * “Kendt ledsygdom”; never deleted on upgrade.
   */
  readonly jointDisease?: boolean;
  readonly comorbidityChips: readonly C33ComorbidityChip[];
  readonly comorbidityNote?: string;
  readonly medicationChips: readonly C33MedicationChip[];
  readonly medicationNote?: string;
  /** Retained for upgrade safety; no longer shown or projected. */
  readonly sportOrWork?: string;
  /** Retained for upgrade safety; no longer shown or projected. */
  readonly familyDisposition?: string;
}

/** Caput fibulae/knogleømhed has no canonical `PalpationFinding` value. */
export type C33ExtraPalpationFinding = "fibular-head";

/** A standalone objective mechanical finding, never inferred from ROM degrees. */
export type C33MovementFinding = "mechanical-block";

export interface C33TestsNormalBatchRecord {
  readonly id: string;
  readonly status: "active" | "undone";
}

export interface C33State {
  readonly c32: C32State;
  readonly workflow: {
    readonly problemProfile?: C33ProblemProfileId;
    readonly bilateralPain?: boolean;
    readonly traumaMechanismDetail?: C33TraumaMechanismDetail;
    readonly traumaSnap?: boolean;
    readonly weightBearingCapacity?: C33WeightBearingCapacity;
    readonly accompanyingSymptoms: readonly C33AccompanyingSymptomId[];
    readonly activeExtensionDegrees?: number;
    readonly activeFlexionDegrees?: number;
    readonly extraPalpationFindings: readonly C33ExtraPalpationFinding[];
    readonly movementFindings: readonly C33MovementFinding[];
  };
  readonly background: C33Background;
  readonly negativeSymptomBatches: readonly C33NegativeSymptomBatchRecord[];
  readonly accompanyingSymptomBatches: readonly C33AccompanyingSymptomBatchRecord[];
  readonly redFlagGroups: Readonly<Partial<Record<C33RedFlagGroupId, C33RedFlagGroupStatus>>>;
  readonly redFlagBatches: readonly C33RedFlagBatchRecord[];
  readonly testsNormalBatches: readonly C33TestsNormalBatchRecord[];
}

export function createEmptyC33State(): C33State {
  return {
    c32: createEmptyC32State(),
    workflow: {
      accompanyingSymptoms: [],
      extraPalpationFindings: [],
      movementFindings: []
    },
    background: {
      comorbidityChips: [],
      medicationChips: []
    },
    negativeSymptomBatches: [],
    accompanyingSymptomBatches: [],
    redFlagGroups: {},
    redFlagBatches: [],
    testsNormalBatches: []
  };
}
