import {
  createEmptySprintOneOneState,
  type DocumentationLevel,
  type PainProvocation,
  type PalpationFinding,
  type SprintOneOneHistory,
  type SprintOneOneObjective,
  type SprintOneOnePlan,
  type SprintOneOneState
} from "./model";

type HistoryAction = {
  [K in Exclude<keyof SprintOneOneHistory, "provocations">]-?: {
    readonly type: "set-history";
    readonly key: K;
    readonly value: SprintOneOneHistory[K] | undefined;
  };
}[Exclude<keyof SprintOneOneHistory, "provocations">];

type ObjectiveAction = {
  [K in Exclude<keyof SprintOneOneObjective, "palpationFindings">]-?: {
    readonly type: "set-objective";
    readonly key: K;
    readonly value: SprintOneOneObjective[K] | undefined;
  };
}[Exclude<keyof SprintOneOneObjective, "palpationFindings">];

type PlanTextAction = {
  [K in "management" | "followUp" | "safetyNet"]: {
    readonly type: "set-plan-text";
    readonly key: K;
    readonly value: SprintOneOnePlan[K] | undefined;
  };
}["management" | "followUp" | "safetyNet"];

export type SprintOneOneAction =
  | HistoryAction
  | ObjectiveAction
  | PlanTextAction
  | { readonly type: "toggle-provocation"; readonly value: PainProvocation }
  | { readonly type: "toggle-palpation"; readonly value: PalpationFinding }
  | { readonly type: "set-assessment"; readonly value: string | undefined }
  | { readonly type: "set-documentation-level"; readonly value: DocumentationLevel }
  | { readonly type: "set-imaging-intent"; readonly value: boolean }
  | { readonly type: "set-imaging-modality"; readonly value: SprintOneOnePlan["imagingModality"] }
  | { readonly type: "reset" };

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function toggle<T>(values: readonly T[], value: T): readonly T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function sprintOneOneReducer(state: SprintOneOneState, action: SprintOneOneAction): SprintOneOneState {
  switch (action.type) {
    case "set-history": {
      const history = { ...state.history, [action.key]: typeof action.value === "string" ? clean(action.value) : action.value } as SprintOneOneHistory;
      if (action.key === "trauma" && action.value !== "yes") {
        const mutable = { ...history } as { traumaMechanism?: SprintOneOneHistory["traumaMechanism"]; traumaContext?: string };
        delete mutable.traumaMechanism;
        delete mutable.traumaContext;
        return { ...state, history: mutable as SprintOneOneHistory };
      }
      if (action.key === "swelling" && action.value === "none") {
        const mutable = { ...history } as { swellingTiming?: string };
        delete mutable.swellingTiming;
        return { ...state, history: mutable as SprintOneOneHistory };
      }
      return { ...state, history };
    }
    case "toggle-provocation":
      return { ...state, history: { ...state.history, provocations: toggle(state.history.provocations, action.value) } };
    case "set-objective": {
      const objective = { ...state.objective, [action.key]: action.value };
      if (action.key === "rangeNotAssessable" && action.value === true) {
        delete objective.extensionDegrees;
        delete objective.flexionDegrees;
      }
      if ((action.key === "extensionDegrees" || action.key === "flexionDegrees") && action.value !== undefined) {
        delete objective.rangeNotAssessable;
      }
      if (action.key === "palpationStatus" && action.value !== "findings-recorded") {
        objective.palpationFindings = [];
      }
      return { ...state, objective };
    }
    case "toggle-palpation": {
      const findings = toggle(state.objective.palpationFindings, action.value);
      return { ...state, objective: { ...state.objective, palpationFindings: findings, palpationStatus: findings.length ? "findings-recorded" : undefined } };
    }
    case "set-assessment":
      return { ...state, assessment: clean(action.value) };
    case "set-plan-text":
      return { ...state, plan: { ...state.plan, [action.key]: clean(action.value) } };
    case "set-documentation-level":
      return { ...state, documentationLevel: action.value };
    case "set-imaging-intent":
      return { ...state, plan: { ...state.plan, imagingIntent: action.value || undefined, imagingModality: action.value ? state.plan.imagingModality : undefined } };
    case "set-imaging-modality":
      return { ...state, plan: { ...state.plan, imagingModality: action.value } };
    case "reset":
      return createEmptySprintOneOneState();
  }
}
