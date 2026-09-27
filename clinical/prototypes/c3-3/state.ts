import type { PainProvocation } from "@/clinical/prototypes/sprint-1-1/model";
import type { C3FactAction } from "@/clinical/prototypes/c3/state";
import {
  applyC32FactAction,
  configureC32Problem
} from "@/clinical/prototypes/c3-2/state";

import type { C33ProblemProfileId } from "./fixtures";
import type {
  C33AccompanyingSymptomId,
  C33ComorbidityChip,
  C33ExtraPalpationFinding,
  C33MedicationChip,
  C33MovementFinding,
  C33NegativeSymptomField,
  C33RedFlagGroupId,
  C33RedFlagGroupStatus,
  C33State,
  C33TraumaMechanismDetail,
  C33WeightBearingCapacity
} from "./model";

const negativeSymptomFields: readonly C33NegativeSymptomField[] = [
  "locking",
  "instability"
];

export const C33_RED_FLAG_GROUP_IDS: readonly C33RedFlagGroupId[] = [
  "infection",
  "cannot-bear-weight",
  "rapid-swelling",
  "malignancy",
  "high-energy-trauma"
];

const testsNormalFields = [
  "lachman",
  "valgus",
  "varus",
  "meniscalTest",
  "patella"
] as const;

function testsNormalAction(
  field: (typeof testsNormalFields)[number],
  clear: boolean
): C3FactAction {
  switch (field) {
    case "lachman":
      return { type: "set-objective", key: "lachman", value: clear ? undefined : "negative" };
    case "meniscalTest":
      return { type: "set-objective", key: "meniscalTest", value: clear ? undefined : "negative" };
    case "patella":
      return { type: "set-objective", key: "patella", value: clear ? undefined : "negative" };
    case "valgus":
      return { type: "set-objective", key: "valgus", value: clear ? undefined : "stable" };
    case "varus":
      return { type: "set-objective", key: "varus", value: clear ? undefined : "stable" };
  }
}

export function configureC33Problem(
  state: C33State,
  profile: C33ProblemProfileId
): C33State {
  return {
    ...state,
    c32: configureC32Problem(state.c32, "knee-pain"),
    workflow: {
      problemProfile: profile,
      accompanyingSymptoms: [],
      extraPalpationFindings: [],
      movementFindings: []
    }
  };
}

/**
 * Hvilesmerter/nattesmerter (`restPain`/`nightPain`) are red-flag content in
 * C3.3 (see the "malignancy" consequence group in `C33_RED_FLAG_GROUPS`) and
 * must only ever be representable through that one explicit, reversible
 * group — never as a direct history fact. This wrapper blocks both fields at
 * the single dispatch point C3.3 uses to write facts, so no current or
 * future control in this prototype can write them, regardless of what the
 * shared C3/C3.2 fact model still allows. It also clears the local trauma
 * detail (mechanism detail, snap, weight-bearing capacity) whenever Traume
 * stops being "Ja", mirroring the canonical clearing of traumaMechanism.
 */
const blockedFactKeys: ReadonlySet<string> = new Set(["restPain", "nightPain"]);

export function applyC33FactAction(
  state: C33State,
  action: C3FactAction
): C33State {
  if (action.type === "set-history" && blockedFactKeys.has(action.key)) return state;
  const next: C33State = {
    ...state,
    c32: applyC32FactAction(state.c32, action)
  };
  if (action.type === "set-history" && action.key === "trauma" && action.value !== "yes") {
    return {
      ...next,
      workflow: {
        ...next.workflow,
        traumaMechanismDetail: undefined,
        traumaSnap: undefined,
        weightBearingCapacity: undefined
      }
    };
  }
  return next;
}

/**
 * Side is a three-way exclusive choice (Højre/Venstre/Bilateral). Bilateral
 * has no canonical `history.side` value, so it lives as a local workflow
 * flag that is always mutually exclusive with the canonical field: setting a
 * canonical side clears the flag, setting the flag clears the canonical
 * field. Selecting the same value again clears back to blank.
 */
export function setC33Side(
  state: C33State,
  value: "right" | "left" | "bilateral" | undefined
): C33State {
  if (value === "bilateral") {
    if (state.workflow.bilateralPain) {
      return { ...state, workflow: { ...state.workflow, bilateralPain: undefined } };
    }
    return {
      ...applyC33FactAction(state, { type: "set-history", key: "side", value: undefined }),
      workflow: { ...state.workflow, bilateralPain: true }
    };
  }
  const next = applyC33FactAction(state, {
    type: "set-history",
    key: "side",
    value: state.c32.c3.factRoot.history.side === value ? undefined : value
  });
  return next.workflow.bilateralPain
    ? { ...next, workflow: { ...next.workflow, bilateralPain: undefined } }
    : next;
}

export function setC33TraumaMechanismDetail(
  state: C33State,
  detail: C33TraumaMechanismDetail
): C33State {
  if (state.c32.c3.factRoot.history.trauma !== "yes") return state;
  const canonical = detail === "twisting" || detail === "direct-blow" ? detail : "other";
  const cleared = state.workflow.traumaMechanismDetail === detail;
  const withCanonical = applyC33FactAction(state, {
    type: "set-history",
    key: "traumaMechanism",
    value: cleared ? undefined : canonical
  });
  return {
    ...withCanonical,
    workflow: {
      ...withCanonical.workflow,
      traumaMechanismDetail: cleared ? undefined : detail
    }
  };
}

export function setC33TraumaSnap(state: C33State, felt: boolean): C33State {
  if (state.c32.c3.factRoot.history.trauma !== "yes") return state;
  return {
    ...state,
    workflow: {
      ...state.workflow,
      traumaSnap: felt ? true : undefined
    }
  };
}

export function setC33WeightBearingCapacity(
  state: C33State,
  value: C33WeightBearingCapacity
): C33State {
  if (state.c32.c3.factRoot.history.trauma !== "yes") return state;
  return {
    ...state,
    workflow: {
      ...state.workflow,
      weightBearingCapacity: state.workflow.weightBearingCapacity === value ? undefined : value
    }
  };
}

/**
 * Consolidated Provokation groups (C3.3-local UI grouping only). Each group
 * toggles one or two canonical `PainProvocation` values together as a single
 * clinician decision; the canonical enum itself is untouched.
 */
export const C33_PROVOCATION_GROUPS: readonly {
  readonly id: string;
  readonly label: string;
  readonly values: readonly PainProvocation[];
}[] = [
  { id: "loading-walking", label: "Belastning/gang", values: ["walking"] },
  { id: "stairs-deep-flexion", label: "Trapper/dyb fleksion", values: ["stairs"] },
  { id: "rotation-turning", label: "Rotation/retningsskift", values: ["rotation", "direction-change"] },
  { id: "running-jumping", label: "Løb/hop", values: ["running", "jumping"] }
];

export function toggleC33ProvocationGroup(state: C33State, groupId: string): C33State {
  const group = C33_PROVOCATION_GROUPS.find((entry) => entry.id === groupId);
  if (!group) return state;
  const active = group.values.every((value) =>
    state.c32.c3.factRoot.history.provocations.includes(value)
  );
  let next = state;
  for (const value of group.values) {
    const has = next.c32.c3.factRoot.history.provocations.includes(value);
    if (active && has) {
      next = applyC33FactAction(next, { type: "toggle-provocation", value });
    } else if (!active && !has) {
      next = applyC33FactAction(next, { type: "toggle-provocation", value });
    }
  }
  return next;
}

export function toggleC33AccompanyingSymptom(
  state: C33State,
  symptom: C33AccompanyingSymptomId
): C33State {
  const has = state.workflow.accompanyingSymptoms.includes(symptom);
  return {
    ...state,
    workflow: {
      ...state.workflow,
      accompanyingSymptoms: has
        ? state.workflow.accompanyingSymptoms.filter((entry) => entry !== symptom)
        : [...state.workflow.accompanyingSymptoms, symptom]
    }
  };
}

export function hasC33AccompanyingSymptomsNone(state: C33State): boolean {
  return Boolean(
    [...state.accompanyingSymptomBatches].reverse().find((record) => record.status === "active")
  ) && state.workflow.accompanyingSymptoms.length === 0;
}

/**
 * "Ingen ledsagesymptomer" only ever touches the local accompanying-symptom
 * list. It can never write a red flag or restPain/nightPain — there is no
 * code path from this function into `redFlagGroups` or the canonical
 * `history` fact fields at all.
 */
export function toggleC33AccompanyingSymptomsNone(
  state: C33State
): { readonly state: C33State; readonly outcome: "applied" | "undone" | "blocked" } {
  const active = [...state.accompanyingSymptomBatches]
    .reverse()
    .find((record) => record.status === "active");

  if (active && state.workflow.accompanyingSymptoms.length === 0) {
    return {
      outcome: "undone",
      state: {
        ...state,
        accompanyingSymptomBatches: state.accompanyingSymptomBatches.map((record) =>
          record.id === active.id ? { ...record, status: "undone" as const } : record
        )
      }
    };
  }

  if (state.workflow.accompanyingSymptoms.length > 0) {
    return { state, outcome: "blocked" };
  }

  return {
    outcome: "applied",
    state: {
      ...state,
      accompanyingSymptomBatches: [
        ...state.accompanyingSymptomBatches,
        {
          id: `C33-LS-${String(state.accompanyingSymptomBatches.length + 1).padStart(3, "0")}`,
          status: "active"
        }
      ]
    }
  };
}

export function setC33Background<K extends keyof Omit<
  C33State["background"],
  "comorbidityChips" | "medicationChips"
>>(
  state: C33State,
  key: K,
  value: C33State["background"][K]
): C33State {
  return { ...state, background: { ...state.background, [key]: value } };
}

export function toggleC33ComorbidityChip(state: C33State, chip: C33ComorbidityChip): C33State {
  const has = state.background.comorbidityChips.includes(chip);
  return {
    ...state,
    background: {
      ...state.background,
      comorbidityChips: has
        ? state.background.comorbidityChips.filter((entry) => entry !== chip)
        : [...state.background.comorbidityChips, chip]
    }
  };
}

export function toggleC33MedicationChip(state: C33State, chip: C33MedicationChip): C33State {
  const has = state.background.medicationChips.includes(chip);
  return {
    ...state,
    background: {
      ...state.background,
      medicationChips: has
        ? state.background.medicationChips.filter((entry) => entry !== chip)
        : [...state.background.medicationChips, chip]
    }
  };
}

export function setC33ActiveRomDegrees(
  state: C33State,
  key: "activeExtensionDegrees" | "activeFlexionDegrees",
  value: number | undefined
): C33State {
  return { ...state, workflow: { ...state.workflow, [key]: value } };
}

export function toggleC33ExtraPalpationFinding(
  state: C33State,
  finding: C33ExtraPalpationFinding
): C33State {
  const has = state.workflow.extraPalpationFindings.includes(finding);
  return {
    ...state,
    workflow: {
      ...state.workflow,
      extraPalpationFindings: has
        ? state.workflow.extraPalpationFindings.filter((entry) => entry !== finding)
        : [...state.workflow.extraPalpationFindings, finding]
    }
  };
}

/**
 * A standalone objective mechanical-block/extension-deficit finding. It never
 * writes the subjective `history.locking` fact and is never derived from ROM
 * degree values — it only exists once the clinician toggles it explicitly.
 */
export function toggleC33MovementFinding(
  state: C33State,
  finding: C33MovementFinding
): C33State {
  const has = state.workflow.movementFindings.includes(finding);
  return {
    ...state,
    workflow: {
      ...state.workflow,
      movementFindings: has
        ? state.workflow.movementFindings.filter((entry) => entry !== finding)
        : [...state.workflow.movementFindings, finding]
    }
  };
}

export function hasC33TestsNormalBatch(state: C33State): boolean {
  return testsNormalFields.every((field) => {
    const value = state.c32.c3.factRoot.objective[field];
    return field === "lachman" || field === "meniscalTest" || field === "patella"
      ? value === "negative"
      : value === "stable";
  });
}

/**
 * "Knæ-test normale": fills only the still-blank test fields with their
 * negative/stable value, never overwrites a positive/lax finding, and is
 * fully reversible — the same no-overwrite contract as every other batch in
 * C3.3.
 */
export function toggleC33TestsNormalBatch(
  state: C33State
): { readonly state: C33State; readonly outcome: "applied" | "undone" | "blocked" } {
  const active = [...state.testsNormalBatches].reverse().find((record) => record.status === "active");

  if (active && hasC33TestsNormalBatch(state)) {
    let next = state;
    for (const field of testsNormalFields) {
      next = applyC33FactAction(next, testsNormalAction(field, true));
    }
    return {
      outcome: "undone",
      state: {
        ...next,
        testsNormalBatches: next.testsNormalBatches.map((record) =>
          record.id === active.id ? { ...record, status: "undone" as const } : record
        )
      }
    };
  }

  const hasPositive = testsNormalFields.some((field) => {
    const value = state.c32.c3.factRoot.objective[field];
    return value !== undefined
      && value !== "negative"
      && value !== "stable";
  });
  if (hasPositive) return { state, outcome: "blocked" };

  let next = state;
  for (const field of testsNormalFields) {
    if (next.c32.c3.factRoot.objective[field] !== undefined) continue;
    next = applyC33FactAction(next, testsNormalAction(field, false));
  }

  return {
    outcome: "applied",
    state: {
      ...next,
      testsNormalBatches: [
        ...next.testsNormalBatches,
        {
          id: `C33-TN-${String(next.testsNormalBatches.length + 1).padStart(3, "0")}`,
          status: "active"
        }
      ]
    }
  };
}

export function hasC33NegativeSymptomBatch(state: C33State): boolean {
  return negativeSymptomFields.every(
    (field) => state.c32.c3.factRoot.history[field] === "no"
  );
}

export function toggleC33NegativeSymptomBatch(
  state: C33State
): { readonly state: C33State; readonly outcome: "applied" | "undone" | "blocked" } {
  const active = [...state.negativeSymptomBatches]
    .reverse()
    .find((record) => record.status === "active");

  if (active && hasC33NegativeSymptomBatch(state)) {
    let next = state;
    for (const field of active.fields) {
      if (next.c32.c3.factRoot.history[field] !== "no") continue;
      next = applyC33FactAction(next, {
        type: "set-history",
        key: field,
        value: undefined
      });
    }
    return {
      outcome: "undone",
      state: {
        ...next,
        negativeSymptomBatches: next.negativeSymptomBatches.map((record) =>
          record.id === active.id
            ? { ...record, status: "undone" as const }
            : record
        )
      }
    };
  }

  if (
    negativeSymptomFields.some(
      (field) => state.c32.c3.factRoot.history[field] === "yes"
        || state.c32.c3.factRoot.history[field] === "not-assessed"
    )
  ) {
    return { state, outcome: "blocked" };
  }

  let next = state;
  const written: C33NegativeSymptomField[] = [];
  for (const field of negativeSymptomFields) {
    if (next.c32.c3.factRoot.history[field] !== undefined) continue;
    next = applyC33FactAction(next, {
      type: "set-history",
      key: field,
      value: "no"
    });
    written.push(field);
  }

  return {
    outcome: "applied",
    state: {
      ...next,
      negativeSymptomBatches: [
        ...next.negativeSymptomBatches,
        {
          id: `C33-NEG-${String(next.negativeSymptomBatches.length + 1).padStart(3, "0")}`,
          fields: written,
          status: "active"
        }
      ]
    }
  };
}

function bumpC33SourceRevision(state: C33State): C33State {
  return {
    ...state,
    c32: {
      ...state.c32,
      c3: { ...state.c32.c3, sourceRevision: state.c32.c3.sourceRevision + 1 }
    }
  };
}

/**
 * Sets or clears a single red flag consequence group. Setting the group that
 * is already active clears it back to blank (same clear-to-blank contract as
 * every other reversible clinician choice in C3.3).
 */
export function setC33RedFlagGroup(
  state: C33State,
  group: C33RedFlagGroupId,
  status: C33RedFlagGroupStatus | undefined
): C33State {
  if (state.redFlagGroups[group] === status) return state;
  const redFlagGroups = { ...state.redFlagGroups };
  if (status === undefined) {
    delete redFlagGroups[group];
  } else {
    redFlagGroups[group] = status;
  }
  return bumpC33SourceRevision({ ...state, redFlagGroups });
}

export function hasC33RedFlagsNormal(state: C33State): boolean {
  return C33_RED_FLAG_GROUP_IDS.every((group) => state.redFlagGroups[group] === "no");
}

/**
 * "Ingen red flags": disconfirms only the groups that are still blank. It
 * never overwrites a positive group and never touches a group the clinician
 * already confirmed negative individually. The action is a single reversible
 * batch, mirroring `toggleC33NegativeSymptomBatch`.
 */
export function toggleC33RedFlagsNormal(
  state: C33State
): { readonly state: C33State; readonly outcome: "applied" | "undone" | "blocked" } {
  const active = [...state.redFlagBatches]
    .reverse()
    .find((record) => record.status === "active");

  if (active && hasC33RedFlagsNormal(state)) {
    const redFlagGroups = { ...state.redFlagGroups };
    for (const group of active.groups) {
      if (redFlagGroups[group] !== "no") continue;
      delete redFlagGroups[group];
    }
    return {
      outcome: "undone",
      state: bumpC33SourceRevision({
        ...state,
        redFlagGroups,
        redFlagBatches: state.redFlagBatches.map((record) =>
          record.id === active.id ? { ...record, status: "undone" as const } : record
        )
      })
    };
  }

  if (C33_RED_FLAG_GROUP_IDS.some((group) => state.redFlagGroups[group] === "yes")) {
    return { state, outcome: "blocked" };
  }

  const redFlagGroups = { ...state.redFlagGroups };
  const written: C33RedFlagGroupId[] = [];
  for (const group of C33_RED_FLAG_GROUP_IDS) {
    if (redFlagGroups[group] !== undefined) continue;
    redFlagGroups[group] = "no";
    written.push(group);
  }

  return {
    outcome: "applied",
    state: bumpC33SourceRevision({
      ...state,
      redFlagGroups,
      redFlagBatches: [
        ...state.redFlagBatches,
        {
          id: `C33-RF-${String(state.redFlagBatches.length + 1).padStart(3, "0")}`,
          groups: written,
          status: "active"
        }
      ]
    })
  };
}
