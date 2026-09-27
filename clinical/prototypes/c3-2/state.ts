import type {
  SprintOneOneHistory,
  SprintOneOneObjective
} from "@/clinical/prototypes/sprint-1-1/model";
import {
  applyC3FactAction,
  type C3FactAction
} from "@/clinical/prototypes/c3/state";

import {
  C32_BATCH_CONFIG_VERSION,
  type C32BatchFieldId,
  type C32BatchId,
  type C32BatchPreview,
  type C32BatchRecord,
  type C32InspectionFinding,
  type C32InspectionStatus,
  type C32ProblemProfile,
  type C32State
} from "./model";

const batchWrites = {
  "C32-BATCH-REDFLAGS-NORMAL-001": [
    { fieldId: "history.fever", value: "no" },
    { fieldId: "history.systemicIllness", value: "no" },
    { fieldId: "history.redHotSwollenJoint", value: "no" }
  ],
  "C32-BATCH-ROM-NORMAL-001": [
    { fieldId: "objective.extensionDegrees", value: 0 },
    { fieldId: "objective.flexionDegrees", value: 140 }
  ]
} as const satisfies Record<C32BatchId, readonly { fieldId: C32BatchFieldId; value: "no" | 0 | 140 }[]>;

function getField(state: C32State, fieldId: C32BatchFieldId): unknown {
  const [partition, key] = fieldId.split(".") as ["history" | "objective", string];
  return partition === "history"
    ? state.c3.factRoot.history[key as keyof SprintOneOneHistory]
    : state.c3.factRoot.objective[key as keyof SprintOneOneObjective];
}

function actionFor(fieldId: C32BatchFieldId, value: "no" | 0 | 140 | undefined): C3FactAction {
  switch (fieldId) {
    case "history.fever":
      return { type: "set-history", key: "fever", value: value as SprintOneOneHistory["fever"] };
    case "history.systemicIllness":
      return { type: "set-history", key: "systemicIllness", value: value as SprintOneOneHistory["systemicIllness"] };
    case "history.redHotSwollenJoint":
      return { type: "set-history", key: "redHotSwollenJoint", value: value as SprintOneOneHistory["redHotSwollenJoint"] };
    case "objective.extensionDegrees":
      return { type: "set-objective", key: "extensionDegrees", value: value as number | undefined };
    case "objective.flexionDegrees":
      return { type: "set-objective", key: "flexionDegrees", value: value as number | undefined };
  }
}

function actionFieldId(action: C3FactAction): C32BatchFieldId | undefined {
  if (action.type === "set-history") {
    if (action.key === "fever") return "history.fever";
    if (action.key === "systemicIllness") return "history.systemicIllness";
    if (action.key === "redHotSwollenJoint") return "history.redHotSwollenJoint";
  }
  if (action.type === "set-objective") {
    if (action.key === "extensionDegrees") return "objective.extensionDegrees";
    if (action.key === "flexionDegrees") return "objective.flexionDegrees";
  }
  return undefined;
}

function supersedeProvenance(
  records: readonly C32BatchRecord[],
  fieldId: C32BatchFieldId
): readonly C32BatchRecord[] {
  return records.map((record) => ({
    ...record,
    writes: record.writes.map((write) =>
      write.fieldId === fieldId && !write.superseded
        ? { ...write, superseded: true }
        : write
    )
  }));
}

export function configureC32Problem(
  state: C32State,
  problemProfile: C32ProblemProfile | undefined
): C32State {
  if (state.workflow.problemProfile === problemProfile) return state;
  return {
    ...state,
    workflow: {
      problemProfile,
      configuredAtRevision: state.c3.sourceRevision
    }
  };
}

export function applyC32FactAction(state: C32State, action: C3FactAction): C32State {
  const fieldId = actionFieldId(action);
  const transition = applyC3FactAction(state.c3, action);
  const batchRecords = fieldId
    ? supersedeProvenance(state.batchRecords, fieldId)
    : state.batchRecords;
  if (transition.outcome === "blocked") return state;
  return {
    ...state,
    c3: transition.state,
    batchRecords
  };
}

export function toggleC32InspectionFinding(
  state: C32State,
  finding: C32InspectionFinding
): C32State {
  const findings = state.inspection.findings.includes(finding)
    ? state.inspection.findings.filter((value) => value !== finding)
    : [...state.inspection.findings, finding];
  return {
    ...state,
    c3: { ...state.c3, sourceRevision: state.c3.sourceRevision + 1 },
    inspection: { findings },
    inspectionRevision: state.inspectionRevision + 1
  };
}

export function setC32InspectionStatus(
  state: C32State,
  status: C32InspectionStatus | undefined
): C32State {
  if (state.inspection.status === status && state.inspection.findings.length === 0) return state;
  return {
    ...state,
    c3: { ...state.c3, sourceRevision: state.c3.sourceRevision + 1 },
    inspection: { findings: [], status },
    inspectionRevision: state.inspectionRevision + 1
  };
}

export function previewC32Batch(state: C32State, batchId: C32BatchId): C32BatchPreview {
  return {
    batchId,
    items: batchWrites[batchId].map((write) => {
      const currentValue = getField(state, write.fieldId);
      return {
        fieldId: write.fieldId,
        proposedValue: write.value,
        currentValue,
        collision: currentValue !== undefined
      };
    })
  };
}

export function commitC32Batch(state: C32State, batchId: C32BatchId): C32State {
  const preview = previewC32Batch(state, batchId);
  let c3 = state.c3;
  const writes: C32BatchRecord["writes"][number][] = [];
  for (const item of preview.items) {
    if (item.collision) continue;
    const transition = applyC3FactAction(c3, actionFor(item.fieldId, item.proposedValue));
    if (transition.outcome !== "applied") continue;
    c3 = transition.state;
    writes.push({
      fieldId: item.fieldId,
      value: item.proposedValue,
      writtenAtRevision: c3.sourceRevision,
      superseded: false
    });
  }
  const sequence = state.batchRecords.length + 1;
  return {
    ...state,
    c3,
    batchRecords: [
      ...state.batchRecords,
      {
        transactionId: `C32-TX-${String(sequence).padStart(3, "0")}`,
        batchId,
        configVersion: C32_BATCH_CONFIG_VERSION,
        sourceRevisionBefore: state.c3.sourceRevision,
        sourceRevisionAfter: c3.sourceRevision,
        writes,
        collisions: preview.items.filter((item) => item.collision).map((item) => item.fieldId),
        status: "committed"
      }
    ]
  };
}

export function undoC32Batch(state: C32State, transactionId: string): C32State {
  const record = state.batchRecords.find(
    (entry) => entry.transactionId === transactionId && entry.status === "committed"
  );
  if (!record) return state;
  let c3 = state.c3;
  for (const write of record.writes) {
    if (write.superseded || getField({ ...state, c3 }, write.fieldId) !== write.value) continue;
    const transition = applyC3FactAction(c3, actionFor(write.fieldId, undefined));
    c3 = transition.state;
  }
  return {
    ...state,
    c3,
    batchRecords: state.batchRecords.map((entry) =>
      entry.transactionId === transactionId ? { ...entry, status: "undone" as const } : entry
    )
  };
}

export function latestActiveBatch(
  state: C32State,
  batchId: C32BatchId
): C32BatchRecord | undefined {
  return [...state.batchRecords]
    .reverse()
    .find((record) => record.batchId === batchId && record.status === "committed");
}
