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

type SetFactAction = {
  [K in PrototypeFactKey]-?: {
    readonly type: "set-fact";
    readonly key: K;
    readonly value: PrototypeFacts[K] | undefined;
  };
}[PrototypeFactKey];

type ListFactItem<K extends ListFactKey> = NonNullable<PrototypeFacts[K]>[number];

type ToggleListFactAction = {
  [K in ListFactKey]: {
    readonly type: "toggle-list-fact";
    readonly key: K;
    readonly value: ListFactItem<K>;
  };
}[ListFactKey];

type SetImagingFieldAction = {
  [K in keyof ImagingPlan]-?: {
    readonly type: "set-imaging-field";
    readonly key: K;
    readonly value: ImagingPlan[K] | undefined;
  };
}[keyof ImagingPlan];

export function setFactAction<K extends PrototypeFactKey>(
  key: K,
  value: PrototypeFacts[K] | undefined
): SetFactAction {
  return { type: "set-fact", key, value } as SetFactAction;
}

export function toggleListFactAction<K extends ListFactKey>(
  key: K,
  value: ListFactItem<K>
): ToggleListFactAction {
  return { type: "toggle-list-fact", key, value } as ToggleListFactAction;
}

export function setImagingFieldAction<K extends keyof ImagingPlan>(
  key: K,
  value: ImagingPlan[K] | undefined
): SetImagingFieldAction {
  return { type: "set-imaging-field", key, value } as SetImagingFieldAction;
}

export type WorkspaceAction =
  | { readonly type: "set-mode"; readonly mode: PrototypeMode }
  | SetFactAction
  | ToggleListFactAction
  | { readonly type: "confirm-normal-group" }
  | { readonly type: "clear-normal-group" }
  | { readonly type: "add-diagnosis"; readonly diagnosis: WorkingDiagnosis }
  | { readonly type: "remove-diagnosis"; readonly id: string }
  | { readonly type: "move-diagnosis"; readonly id: string; readonly direction: -1 | 1 }
  | { readonly type: "toggle-plan-action"; readonly action: PlanAction }
  | SetImagingFieldAction
  | { readonly type: "clear-imaging" }
  | { readonly type: "reset" };

type MutableFacts = { -readonly [K in keyof PrototypeFacts]: PrototypeFacts[K] };
type MutableImagingPlan = { -readonly [K in keyof ImagingPlan]: ImagingPlan[K] };

function assignFact<K extends PrototypeFactKey>(
  facts: MutableFacts,
  key: K,
  value: PrototypeFacts[K] | undefined
) {
  facts[key] = value;
}

function assignImagingField<K extends keyof ImagingPlan>(
  imaging: MutableImagingPlan,
  key: K,
  value: ImagingPlan[K] | undefined
) {
  imaging[key] = value;
}

const NORMAL_KEYS = new Set<NormalFindingKey>(
  NORMAL_BASIC_FINDINGS.map((finding) => finding.key)
);

function normalizeValue<T>(value: T): T | undefined {
  if (typeof value === "string") {
    return (value === "" ? undefined : value) as T | undefined;
  }
  if (Array.isArray(value)) return (value.length === 0 ? undefined : value) as T | undefined;
  return value;
}

function setFact<K extends PrototypeFactKey>(
  state: ClinicalDocumentPrototypeState,
  key: K,
  rawValue: PrototypeFacts[K] | undefined
): ClinicalDocumentPrototypeState {
  const value = normalizeValue(rawValue);
  const facts: MutableFacts = { ...state.facts };
  if (value === undefined) delete facts[key];
  else assignFact(facts, key, value);

  if (key === "precipitatingFactor" && value !== "trauma") {
    delete facts.traumaMechanisms;
    delete facts.traumaMechanismNote;
  }

  const appliedKeys = NORMAL_KEYS.has(key as NormalFindingKey)
    ? state.normalGroup.appliedKeys.filter((item) => item !== key)
    : state.normalGroup.appliedKeys;

  return {
    ...state,
    facts,
    normalGroup: { ...state.normalGroup, appliedKeys }
  };
}

function toggleListFact<K extends ListFactKey>(
  state: ClinicalDocumentPrototypeState,
  key: K,
  value: ListFactItem<K>
): ClinicalDocumentPrototypeState {
  const current: readonly ListFactItem<ListFactKey>[] = state.facts[key] ?? [];
  let next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  if (key === "painPatterns" && value === "constant" && next.includes("constant")) {
    next = next.filter((item) => item !== "intermittent");
  }
  if (key === "painPatterns" && value === "intermittent" && next.includes("intermittent")) {
    next = next.filter((item) => item !== "constant");
  }
  return setFact(state, key, next as PrototypeFacts[K]);
}

function confirmNormalGroup(
  state: ClinicalDocumentPrototypeState
): ClinicalDocumentPrototypeState {
  const facts: MutableFacts = { ...state.facts };
  const appliedKeys = [...state.normalGroup.appliedKeys];
  for (const finding of NORMAL_BASIC_FINDINGS) {
    if (facts[finding.key] === undefined) {
      assignFact(facts, finding.key, finding.normalValue);
      if (!appliedKeys.includes(finding.key)) appliedKeys.push(finding.key);
    }
  }
  return {
    ...state,
    facts,
    normalGroup: { confirmed: true, appliedKeys }
  };
}

function clearNormalGroup(
  state: ClinicalDocumentPrototypeState
): ClinicalDocumentPrototypeState {
  const facts: MutableFacts = { ...state.facts };
  for (const key of state.normalGroup.appliedKeys) {
    const definition = NORMAL_BASIC_FINDINGS.find((finding) => finding.key === key);
    if (definition && facts[key] === definition.normalValue) delete facts[key];
  }
  return {
    ...state,
    facts,
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

function setImagingField<K extends keyof ImagingPlan>(
  state: ClinicalDocumentPrototypeState,
  key: K,
  rawValue: ImagingPlan[K] | undefined
): ClinicalDocumentPrototypeState {
  const value = normalizeValue(rawValue);
  const imaging: MutableImagingPlan = { ...state.imaging };
  if (value === undefined) delete imaging[key];
  else assignImagingField(imaging, key, value);

  if (
    !isImagingCombinationCompatible(
      imaging.status,
      imaging.plannedAction
    )
  ) {
    return state;
  }
  return { ...state, imaging };
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
      const facts: MutableFacts = { ...state.facts };
      if (active && action.action === "follow-up") delete facts.followUp;
      if (active && action.action === "safety-net") delete facts.safetyNet;
      return {
        ...state,
        facts,
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
