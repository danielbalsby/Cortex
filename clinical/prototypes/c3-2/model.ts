import type {
  SprintOneOneHistory,
  SprintOneOneObjective
} from "@/clinical/prototypes/sprint-1-1/model";
import { createEmptyC3State, type C3State } from "@/clinical/prototypes/c3/model";

export const C32_FIELD_CONFIG_VERSION = "C32-FIELD-CONFIG-KNEE-001@1.0";
export const C32_BATCH_CONFIG_VERSION = "C32-NORMAL-BATCH-KNEE-001@1.0";
export const C32_SCENARIO_VERSION = "C32-FF-SCENARIO-001@1.0";

export type C32ProblemProfile = "knee-pain";
export type C32InspectionFinding = "swelling" | "redness" | "deformity";
export type C32InspectionStatus = "no-specific-findings" | "not-assessed";
export type C32BatchId =
  | "C32-BATCH-REDFLAGS-NORMAL-001"
  | "C32-BATCH-ROM-NORMAL-001";

export type C32BatchFieldId =
  | "history.fever"
  | "history.systemicIllness"
  | "history.redHotSwollenJoint"
  | "objective.extensionDegrees"
  | "objective.flexionDegrees";

export interface C32InspectionState {
  readonly findings: readonly C32InspectionFinding[];
  readonly status?: C32InspectionStatus;
}

export interface C32BatchWrite {
  readonly fieldId: C32BatchFieldId;
  readonly value: "no" | 0 | 140;
  readonly writtenAtRevision: number;
  readonly superseded: boolean;
}

export interface C32BatchRecord {
  readonly transactionId: string;
  readonly batchId: C32BatchId;
  readonly configVersion: typeof C32_BATCH_CONFIG_VERSION;
  readonly sourceRevisionBefore: number;
  readonly sourceRevisionAfter: number;
  readonly writes: readonly C32BatchWrite[];
  readonly collisions: readonly C32BatchFieldId[];
  readonly status: "committed" | "undone";
}

export interface C32State {
  readonly c3: C3State;
  readonly workflow: {
    readonly problemProfile?: C32ProblemProfile;
    readonly configuredAtRevision?: number;
  };
  readonly inspection: C32InspectionState;
  readonly batchRecords: readonly C32BatchRecord[];
  readonly inspectionRevision: number;
}

export interface C32BatchPreviewItem {
  readonly fieldId: C32BatchFieldId;
  readonly currentValue: unknown;
  readonly proposedValue: "no" | 0 | 140;
  readonly collision: boolean;
}

export interface C32BatchPreview {
  readonly batchId: C32BatchId;
  readonly items: readonly C32BatchPreviewItem[];
}

export type C32HistoryFieldId = {
  [K in Exclude<keyof SprintOneOneHistory, "provocations">]: `history.${K}`;
}[Exclude<keyof SprintOneOneHistory, "provocations">];

export type C32ObjectiveFieldId = {
  [K in Exclude<keyof SprintOneOneObjective, "palpationFindings" | "inspection">]: `objective.${K}`;
}[Exclude<keyof SprintOneOneObjective, "palpationFindings" | "inspection">];

export function createEmptyC32State(): C32State {
  return {
    c3: createEmptyC3State(),
    workflow: {},
    inspection: { findings: [] },
    batchRecords: [],
    inspectionRevision: 0
  };
}
