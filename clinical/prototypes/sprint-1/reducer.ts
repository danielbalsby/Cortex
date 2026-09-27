import {
  createEmptySprintOneState,
  type DocumentationLevel,
  type SprintOneHistory,
  type SprintOneObjective,
  type SprintOnePlan,
  type SprintOneState
} from "./model";

type SetHistoryAction = {
  [K in keyof SprintOneHistory]-?: {
    readonly type: "set-history";
    readonly key: K;
    readonly value: SprintOneHistory[K] | undefined;
  };
}[keyof SprintOneHistory];

type SetObjectiveAction = {
  [K in keyof SprintOneObjective]-?: {
    readonly type: "set-objective";
    readonly key: K;
    readonly value: SprintOneObjective[K] | undefined;
  };
}[keyof SprintOneObjective];

type SetPlanTextAction = {
  [K in "management" | "followUp" | "safetyNet"]: {
    readonly type: "set-plan-text";
    readonly key: K;
    readonly value: SprintOnePlan[K] | undefined;
  };
}["management" | "followUp" | "safetyNet"];

export type SprintOneAction =
  | SetHistoryAction
  | SetObjectiveAction
  | SetPlanTextAction
  | { readonly type: "set-assessment"; readonly value: string | undefined }
  | { readonly type: "set-documentation-level"; readonly value: DocumentationLevel }
  | { readonly type: "set-imaging-enabled"; readonly value: boolean }
  | {
      readonly type: "set-imaging-field";
      readonly key: "modality" | "indication" | "clinicalQuestion";
      readonly value: string | undefined;
    }
  | { readonly type: "set-physiotherapy-enabled"; readonly value: boolean }
  | { readonly type: "set-physiotherapy-purpose"; readonly value: string | undefined }
  | { readonly type: "reset" };

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function sprintOneReducer(
  state: SprintOneState,
  action: SprintOneAction
): SprintOneState {
  switch (action.type) {
    case "set-history": {
      const history = { ...state.history, [action.key]: action.value } as SprintOneHistory;
      if (action.key === "trauma" && action.value !== "yes") {
        delete (history as { traumaMechanism?: SprintOneHistory["traumaMechanism"] })
          .traumaMechanism;
      }
      return { ...state, history };
    }
    case "set-objective":
      return {
        ...state,
        objective: { ...state.objective, [action.key]: action.value }
      };
    case "set-assessment":
      return { ...state, assessment: clean(action.value) };
    case "set-plan-text":
      return { ...state, plan: { ...state.plan, [action.key]: clean(action.value) } };
    case "set-documentation-level":
      return { ...state, documentationLevel: action.value };
    case "set-imaging-enabled":
      return {
        ...state,
        plan: {
          ...state.plan,
          imaging: action.value ? state.plan.imaging ?? {} : undefined
        }
      };
    case "set-imaging-field":
      return {
        ...state,
        plan: {
          ...state.plan,
          imaging: {
            ...state.plan.imaging,
            [action.key]: clean(action.value)
          }
        }
      };
    case "set-physiotherapy-enabled":
      return {
        ...state,
        plan: {
          ...state.plan,
          physiotherapy: action.value ? state.plan.physiotherapy ?? {} : undefined
        }
      };
    case "set-physiotherapy-purpose":
      return {
        ...state,
        plan: {
          ...state.plan,
          physiotherapy: {
            ...state.plan.physiotherapy,
            purpose: clean(action.value)
          }
        }
      };
    case "reset":
      return createEmptySprintOneState();
  }
}

