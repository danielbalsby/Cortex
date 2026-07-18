import {
  NORMAL_BASIC_FINDINGS,
  createEmptyClinicalDocumentState,
  type ClinicalDocumentPrototypeState,
  type ImagingAction,
  type ImagingPlan,
  type ImagingStatus,
  type ListFactKey,
  type NormalFindingKey,
  type PlanAction,
  type PrototypeFactKey,
  type PrototypeFacts,
  type PrototypeMode,
  type WorkingDiagnosis
} from "./model";

export type WorkspaceAction =
  | { readonly type: "set-mode"; readonly mode: PrototypeMode }
  | { readonly type: "set-fact"; readonly key: PrototypeFactKey; readonly value: unknown }
  | { readonly type: "toggle-list-fact"; readonly key: ListFactKey; readonly value: string }
  | { readonly type: "confirm-normal-group" }
  | { readonly type: "clear-normal-group" }
  | { readonly type: "add-diagnosis"; readonly diagnosis: WorkingDiagnosis }
  | { readonly type: "remove-diagnosis"; readonly id: string }
  | { readonly type: "move-diagnosis"; readonly id: string; readonly direction: -1 | 1 }
  | { readonly type: "toggle-plan-action"; readonly action: PlanAction }
  | { readonly type: "set-imaging-field"; readonly key: keyof ImagingPlan; readonly value: unknown }
  | { readonly type: "clear-imaging" }
  | { readonly type: "reset" };

const NORMAL_KEYS = new Set<NormalFindingKey>(
  NORMAL_BASIC_FINDINGS.map((finding) => finding.key)
);

function normalizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }
  if (Array.isArray(value)) return value.length === 0 ? undefined : value;
  return value;
}

function setFact(
  state: ClinicalDocumentPrototypeState,
  key: PrototypeFactKey,
  rawValue: unknown
): ClinicalDocumentPrototypeState {
  const value = normalizeValue(rawValue);
  const facts = { ...state.facts } as Record<string, unknown>;
  if (value === undefined) delete facts[key];
  else facts[key] = value;

  if (key === "precipitatingFactor" && value !== "trauma") {
    delete facts.traumaMechanisms;
    delete facts.traumaMechanismNote;
  }

  const appliedKeys = NORMAL_KEYS.has(key as NormalFindingKey)
    ? state.normalGroup.appliedKeys.filter((item) => item !== key)
    : state.normalGroup.appliedKeys;

  return {
    ...state,
    facts: facts as PrototypeFacts,
    normalGroup: { ...state.normalGroup, appliedKeys }
  };
}

function toggleListFact(
  state: ClinicalDocumentPrototypeState,
  key: ListFactKey,
  value: string
): ClinicalDocumentPrototypeState {
  const current = (state.facts[key] ?? []) as readonly string[];
  let next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  if (key === "painPatterns" && value === "constant" && next.includes("constant")) {
    next = next.filter((item) => item !== "intermittent");
  }
  if (key === "painPatterns" && value === "intermittent" && next.includes("intermittent")) {
    next = next.filter((item) => item !== "constant");
  }
  return setFact(state, key, next);
}

function confirmNormalGroup(
  state: ClinicalDocumentPrototypeState
): ClinicalDocumentPrototypeState {
  const facts = { ...state.facts } as Record<string, unknown>;
  const appliedKeys = [...state.normalGroup.appliedKeys];
  for (const finding of NORMAL_BASIC_FINDINGS) {
    if (facts[finding.key] === undefined) {
      facts[finding.key] = finding.normalValue;
      if (!appliedKeys.includes(finding.key)) appliedKeys.push(finding.key);
    }
  }
  return {
    ...state,
    facts: facts as PrototypeFacts,
    normalGroup: { confirmed: true, appliedKeys }
  };
}

function clearNormalGroup(
  state: ClinicalDocumentPrototypeState
): ClinicalDocumentPrototypeState {
  const facts = { ...state.facts } as Record<string, unknown>;
  for (const key of state.normalGroup.appliedKeys) {
    const definition = NORMAL_BASIC_FINDINGS.find((finding) => finding.key === key);
    if (definition && facts[key] === definition.normalValue) delete facts[key];
  }
  return {
    ...state,
    facts: facts as PrototypeFacts,
    normalGroup: { confirmed: false, appliedKeys: [] }
  };
}

export function isImagingCombinationCompatible(
  status: ImagingStatus | undefined,
  action: ImagingAction | undefined
): boolean {
  if (!status || !action) return true;
  const allowed: Record<ImagingStatus, readonly ImagingAction[]> = {
    "not-indicated-now": ["no-imaging-now"],
    planned: ["prepare-referral", "reassess-before-decision", "other"],
    "ordered-or-referred": ["send-referral", "other"],
    "completed-known": ["review-existing-result", "other"],
    deferred: ["reassess-before-decision", "other"],
    unclear: ["reassess-before-decision", "other"]
  };
  return allowed[status].includes(action);
}

function setImagingField(
  state: ClinicalDocumentPrototypeState,
  key: keyof ImagingPlan,
  rawValue: unknown
): ClinicalDocumentPrototypeState {
  const value = normalizeValue(rawValue);
  const imaging = { ...state.imaging } as Record<string, unknown>;
  if (value === undefined) delete imaging[key];
  else imaging[key] = value;

  if (
    !isImagingCombinationCompatible(
      imaging.status as ImagingStatus | undefined,
      imaging.plannedAction as ImagingAction | undefined
    )
  ) {
    return state;
  }
  return { ...state, imaging: imaging as ImagingPlan };
}

export function workspaceReducer(
  state: ClinicalDocumentPrototypeState,
  action: WorkspaceAction
): ClinicalDocumentPrototypeState {
  switch (action.type) {
    case "set-mode":
      return state.mode === action.mode ? state : { ...state, mode: action.mode };
    case "set-fact":
      return setFact(state, action.key, action.value);
    case "toggle-list-fact":
      return toggleListFact(state, action.key, action.value);
    case "confirm-normal-group":
      return confirmNormalGroup(state);
    case "clear-normal-group":
      return clearNormalGroup(state);
    case "add-diagnosis":
      return state.workingDiagnoses.some((item) => item.id === action.diagnosis.id)
        ? state
        : { ...state, workingDiagnoses: [...state.workingDiagnoses, action.diagnosis] };
    case "remove-diagnosis":
      return {
        ...state,
        workingDiagnoses: state.workingDiagnoses.filter((item) => item.id !== action.id)
      };
    case "move-diagnosis": {
      const index = state.workingDiagnoses.findIndex((item) => item.id === action.id);
      const target = index + action.direction;
      if (index < 0 || target < 0 || target >= state.workingDiagnoses.length) return state;
      const workingDiagnoses = [...state.workingDiagnoses];
      [workingDiagnoses[index], workingDiagnoses[target]] = [
        workingDiagnoses[target],
        workingDiagnoses[index]
      ];
      return { ...state, workingDiagnoses };
    }
    case "toggle-plan-action": {
      const active = state.planActions.includes(action.action);
      const planActions = active
        ? state.planActions.filter((item) => item !== action.action)
        : [...state.planActions, action.action];
      const facts = { ...state.facts } as Record<string, unknown>;
      if (active && action.action === "follow-up") delete facts.followUp;
      if (active && action.action === "safety-net") delete facts.safetyNet;
      return {
        ...state,
        facts: facts as PrototypeFacts,
        planActions,
        imaging: action.action === "imaging" && active ? undefined : state.imaging
      };
    }
    case "set-imaging-field":
      return setImagingField(state, action.key, action.value);
    case "clear-imaging":
      return { ...state, imaging: undefined };
    case "reset":
      return createEmptyClinicalDocumentState();
  }
}
