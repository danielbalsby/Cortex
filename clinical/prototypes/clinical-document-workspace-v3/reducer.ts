/**
 * Isolated learning-prototype reducer (v3).
 *
 * Generalises the baseline `clinical-document-workspace` reducer's grouped
 * confirmation pattern (fill-only-untouched, positive-override, toggle-off)
 * for two negative-confirmation groups instead of one. No new clinical
 * rules are introduced: grouped actions only ever set explicit "no" on
 * fields the clinician has not already touched, and never overwrite an
 * existing positive finding.
 */

import {
  NEGATIVE_BUNDLE_FINDINGS,
  RED_FLAG_FINDINGS,
  createEmptyStateV3,
  type FactKeyV3,
  type ListFactKeyV3,
  type NegativeBundleKey,
  type PainMedication,
  type PlanAction,
  type ProblemProfileId,
  type PrototypeFactsV3,
  type PrototypeStateV3,
  type RedFlagKey,
  type WorkingDiagnosis
} from "./model";

type SetFactAction = {
  [K in FactKeyV3]-?: {
    readonly type: "set-fact";
    readonly key: K;
    readonly value: PrototypeFactsV3[K] | undefined;
  };
}[FactKeyV3];

type ListFactItem<K extends ListFactKeyV3> = NonNullable<PrototypeFactsV3[K]>[number];

type ToggleListFactAction = {
  [K in ListFactKeyV3]: {
    readonly type: "toggle-list-fact";
    readonly key: K;
    readonly value: ListFactItem<K>;
  };
}[ListFactKeyV3];

export function setFactAction<K extends FactKeyV3>(
  key: K,
  value: PrototypeFactsV3[K] | undefined
): SetFactAction {
  return { type: "set-fact", key, value } as SetFactAction;
}

export function toggleListFactAction<K extends ListFactKeyV3>(
  key: K,
  value: ListFactItem<K>
): ToggleListFactAction {
  return { type: "toggle-list-fact", key, value } as ToggleListFactAction;
}

export type WorkspaceActionV3 =
  | { readonly type: "set-mode"; readonly mode: "quick" | "standard" }
  | { readonly type: "set-problem-profile"; readonly id: ProblemProfileId | undefined }
  | SetFactAction
  | ToggleListFactAction
  | { readonly type: "confirm-negative-bundle" }
  | { readonly type: "clear-negative-bundle" }
  | { readonly type: "confirm-no-red-flags" }
  | { readonly type: "clear-no-red-flags" }
  | { readonly type: "set-assessment-note"; readonly value: string }
  | { readonly type: "add-diagnosis"; readonly diagnosis: WorkingDiagnosis }
  | { readonly type: "remove-diagnosis"; readonly id: string }
  | { readonly type: "toggle-plan-action"; readonly action: PlanAction }
  | { readonly type: "toggle-pain-medication"; readonly medication: PainMedication }
  | { readonly type: "toggle-follow-up-phrase" }
  | { readonly type: "toggle-safety-net-discussed" }
  | { readonly type: "set-safety-net-note"; readonly value: string }
  | { readonly type: "reset" };

type MutableFacts = { -readonly [K in keyof PrototypeFactsV3]: PrototypeFactsV3[K] };

const NEGATIVE_BUNDLE_KEYS = new Set<NegativeBundleKey>(
  NEGATIVE_BUNDLE_FINDINGS.map((finding) => finding.key)
);
const RED_FLAG_KEYS = new Set<RedFlagKey>(RED_FLAG_FINDINGS.map((finding) => finding.key));

function normalizeValue<T>(value: T): T | undefined {
  if (typeof value === "string") {
    return (value === "" ? undefined : value) as T | undefined;
  }
  if (Array.isArray(value)) return (value.length === 0 ? undefined : value) as T | undefined;
  return value;
}

function assignFact<K extends FactKeyV3>(
  facts: MutableFacts,
  key: K,
  value: PrototypeFactsV3[K] | undefined
) {
  facts[key] = value;
}

function setFact<K extends FactKeyV3>(
  state: PrototypeStateV3,
  key: K,
  rawValue: PrototypeFactsV3[K] | undefined
): PrototypeStateV3 {
  const value = normalizeValue(rawValue);
  const facts: MutableFacts = { ...state.facts };
  if (value === undefined) delete facts[key];
  else assignFact(facts, key, value);

  // Conditional pruning: never leave stale detail behind a now-hidden trigger.
  if (key === "trauma" && value !== "yes") {
    delete facts.traumaMechanisms;
    delete facts.traumaNote;
  }
  if (key === "rom" && value !== "abnormal") {
    delete facts.extension;
    delete facts.flexion;
  }

  let negativeBundle = state.negativeBundle;
  if (NEGATIVE_BUNDLE_KEYS.has(key as NegativeBundleKey)) {
    const appliedKeys = negativeBundle.appliedKeys.filter((item) => item !== key);
    const contradicts = value !== undefined && value !== "no";
    negativeBundle = {
      confirmed: contradicts ? false : negativeBundle.confirmed,
      appliedKeys
    };
  }

  let redFlags = state.redFlags;
  if (RED_FLAG_KEYS.has(key as RedFlagKey)) {
    const appliedKeys = redFlags.appliedKeys.filter((item) => item !== key);
    const contradicts = value !== undefined && value !== "no";
    redFlags = {
      confirmed: contradicts ? false : redFlags.confirmed,
      appliedKeys
    };
  }

  return { ...state, facts, negativeBundle, redFlags };
}

function toggleListFact<K extends ListFactKeyV3>(
  state: PrototypeStateV3,
  key: K,
  value: ListFactItem<K>
): PrototypeStateV3 {
  const current: readonly ListFactItem<ListFactKeyV3>[] = state.facts[key] ?? [];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return setFact(state, key, next as PrototypeFactsV3[K]);
}

function confirmNegativeBundle(state: PrototypeStateV3): PrototypeStateV3 {
  const facts: MutableFacts = { ...state.facts };
  const appliedKeys = [...state.negativeBundle.appliedKeys];
  for (const finding of NEGATIVE_BUNDLE_FINDINGS) {
    if (facts[finding.key] === undefined) {
      facts[finding.key] = "no";
      if (!appliedKeys.includes(finding.key)) appliedKeys.push(finding.key);
    }
  }
  return { ...state, facts, negativeBundle: { confirmed: true, appliedKeys } };
}

function clearNegativeBundle(state: PrototypeStateV3): PrototypeStateV3 {
  const facts: MutableFacts = { ...state.facts };
  for (const key of state.negativeBundle.appliedKeys) {
    if (facts[key] === "no") delete facts[key];
  }
  return { ...state, facts, negativeBundle: { confirmed: false, appliedKeys: [] } };
}

/**
 * "Ingen red flags" fills only untouched findings with "no" — it never
 * silently discards an already-recorded positive. If a positive is already
 * present, the group cannot honestly read as "confirmed none", so
 * `confirmed` stays false even though the remaining untouched findings are
 * still filled in. The inverse (selecting a positive afterwards) always
 * clears `confirmed` again (handled in `setFact`), giving the required
 * exclusivity: "Ingen red flags" and any positive can never both be true.
 */
function confirmNoRedFlags(state: PrototypeStateV3): PrototypeStateV3 {
  const facts: MutableFacts = { ...state.facts };
  const appliedKeys = [...state.redFlags.appliedKeys];
  for (const finding of RED_FLAG_FINDINGS) {
    if (facts[finding.key] === undefined) {
      facts[finding.key] = "no";
      if (!appliedKeys.includes(finding.key)) appliedKeys.push(finding.key);
    }
  }
  const anyPositive = RED_FLAG_FINDINGS.some((finding) => facts[finding.key] === "yes");
  return { ...state, facts, redFlags: { confirmed: !anyPositive, appliedKeys } };
}

function clearNoRedFlags(state: PrototypeStateV3): PrototypeStateV3 {
  const facts: MutableFacts = { ...state.facts };
  for (const key of state.redFlags.appliedKeys) {
    if (facts[key] === "no") delete facts[key];
  }
  return { ...state, facts, redFlags: { confirmed: false, appliedKeys: [] } };
}

export function workspaceReducerV3(
  state: PrototypeStateV3,
  action: WorkspaceActionV3
): PrototypeStateV3 {
  switch (action.type) {
    case "set-mode":
      return state.mode === action.mode ? state : { ...state, mode: action.mode };
    case "set-problem-profile":
      return { ...state, problemProfile: action.id };
    case "set-fact":
      return setFact(state, action.key, action.value);
    case "toggle-list-fact":
      return toggleListFact(state, action.key, action.value);
    case "confirm-negative-bundle":
      return confirmNegativeBundle(state);
    case "clear-negative-bundle":
      return clearNegativeBundle(state);
    case "confirm-no-red-flags":
      return confirmNoRedFlags(state);
    case "clear-no-red-flags":
      return clearNoRedFlags(state);
    case "set-assessment-note":
      return { ...state, assessmentNote: action.value };
    case "add-diagnosis":
      return state.workingDiagnoses.some((item) => item.id === action.diagnosis.id)
        ? state
        : { ...state, workingDiagnoses: [...state.workingDiagnoses, action.diagnosis] };
    case "remove-diagnosis":
      return {
        ...state,
        workingDiagnoses: state.workingDiagnoses.filter((item) => item.id !== action.id)
      };
    case "toggle-plan-action": {
      const active = state.planActions.includes(action.action);
      return {
        ...state,
        planActions: active
          ? state.planActions.filter((item) => item !== action.action)
          : [...state.planActions, action.action]
      };
    }
    case "toggle-pain-medication": {
      const active = state.painMedications.includes(action.medication);
      return {
        ...state,
        painMedications: active
          ? state.painMedications.filter((item) => item !== action.medication)
          : [...state.painMedications, action.medication]
      };
    }
    case "toggle-follow-up-phrase":
      return { ...state, followUpStandardPhrase: !state.followUpStandardPhrase };
    case "toggle-safety-net-discussed":
      return { ...state, safetyNetDiscussed: !state.safetyNetDiscussed };
    case "set-safety-net-note":
      return { ...state, safetyNetNote: action.value || undefined };
    case "reset":
      return createEmptyStateV3();
  }
}
