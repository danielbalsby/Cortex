import {
  createEmptySprintOneOneState,
  type SprintOneOneHistory,
  type SprintOneOneObjective,
  type SprintOneOneState
} from "@/clinical/prototypes/sprint-1-1/model";
import {
  sprintOneOneReducer,
  type SprintOneOneAction
} from "@/clinical/prototypes/sprint-1-1/reducer";

import { C3_KNEE_FACT_ACTIONS, C3_PHRASES } from "./fixtures";
import {
  createEmptyC3State,
  getActiveAssessments,
  type C3AssessmentRole,
  type C3DocumentProfile,
  type C3FactRoot,
  type C3PhraseCategory,
  type C3RecoveryRecord,
  type C3State
} from "./model";

export type C3FactAction = Extract<
  SprintOneOneAction,
  {
    readonly type:
      | "set-history"
      | "set-objective"
      | "toggle-provocation"
      | "toggle-palpation";
  }
>;

export interface C3Transition {
  readonly state: C3State;
  readonly outcome: "applied" | "unchanged" | "blocked";
  readonly recoveryCreated?: C3RecoveryRecord;
}

function clean(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed || undefined;
}

function toSprintState(factRoot: C3FactRoot): SprintOneOneState {
  const empty = createEmptySprintOneOneState();
  return {
    ...empty,
    history: factRoot.history,
    objective: factRoot.objective
  };
}

function reduceFactRoot(factRoot: C3FactRoot, action: C3FactAction): C3FactRoot {
  const next = sprintOneOneReducer(toSprintState(factRoot), action);
  return { history: next.history, objective: next.objective };
}

function recoveryCandidate(
  state: C3State,
  action: C3FactAction
): C3RecoveryRecord | undefined {
  const { history, objective } = state.factRoot;
  const base = {
    id: `C3-REC-${String(state.sourceRevision + 1).padStart(3, "0")}`,
    capturedAtRevision: state.sourceRevision
  };

  if (
    action.type === "set-history"
    && action.key === "trauma"
    && action.value !== "yes"
    && (history.traumaMechanism || history.traumaContext)
  ) {
    return {
      ...base,
      kind: "trauma",
      fields: [
        { partition: "history" as const, key: "trauma", value: history.trauma },
        { partition: "history" as const, key: "traumaMechanism", value: history.traumaMechanism },
        { partition: "history" as const, key: "traumaContext", value: history.traumaContext }
      ].filter((field) => field.value !== undefined)
    };
  }

  if (
    action.type === "set-history"
    && action.key === "swelling"
    && action.value === "none"
    && history.swelling
    && history.swelling !== "none"
    && history.swellingTiming
  ) {
    return {
      ...base,
      kind: "swelling",
      fields: [
        { partition: "history", key: "swelling", value: history.swelling },
        { partition: "history", key: "swellingTiming", value: history.swellingTiming }
      ]
    };
  }

  if (
    action.type === "set-objective"
    && action.key === "rangeNotAssessable"
    && action.value === true
    && (objective.extensionDegrees !== undefined || objective.flexionDegrees !== undefined)
  ) {
    return {
      ...base,
      kind: "rom",
      fields: [
        { partition: "objective" as const, key: "extensionDegrees", value: objective.extensionDegrees },
        { partition: "objective" as const, key: "flexionDegrees", value: objective.flexionDegrees }
      ].filter((field) => field.value !== undefined)
    };
  }

  if (
    action.type === "set-objective"
    && action.key === "palpationStatus"
    && action.value !== "findings-recorded"
    && objective.palpationFindings.length
  ) {
    return {
      ...base,
      kind: "palpation",
      fields: objective.palpationFindings.map((value) => ({
        partition: "objective" as const,
        key: "palpationFindings",
        value
      }))
    };
  }

  return undefined;
}

export function createC3FixtureState(): C3State {
  let factRoot = createEmptyC3State().factRoot;
  for (const action of C3_KNEE_FACT_ACTIONS) {
    factRoot = reduceFactRoot(factRoot, action);
  }
  return {
    ...createEmptyC3State(),
    sourceRevision: 1,
    factRoot
  };
}

export function applyC3FactAction(
  state: C3State,
  action: C3FactAction
): C3Transition {
  const candidate = recoveryCandidate(state, action);
  if (candidate && state.recovery) {
    return { state, outcome: "blocked" };
  }

  const factRoot = reduceFactRoot(state.factRoot, action);
  if (JSON.stringify(factRoot) === JSON.stringify(state.factRoot)) {
    return { state, outcome: "unchanged" };
  }

  const next = {
    ...state,
    sourceRevision: state.sourceRevision + 1,
    factRoot,
    recovery: candidate ?? state.recovery
  };
  return {
    state: next,
    outcome: "applied",
    recoveryCreated: candidate
  };
}

function fieldValue<T>(record: C3RecoveryRecord, key: string): T | undefined {
  return record.fields.find((field) => field.key === key)?.value as T | undefined;
}

export function restoreC3Recovery(state: C3State): C3State {
  const recovery = state.recovery;
  if (!recovery) return state;

  let factRoot = state.factRoot;
  if (recovery.kind === "trauma") {
    factRoot = reduceFactRoot(factRoot, { type: "set-history", key: "trauma", value: "yes" });
    const mechanism = fieldValue<SprintOneOneHistory["traumaMechanism"]>(recovery, "traumaMechanism");
    const context = fieldValue<string>(recovery, "traumaContext");
    if (mechanism) factRoot = reduceFactRoot(factRoot, { type: "set-history", key: "traumaMechanism", value: mechanism });
    if (context) factRoot = reduceFactRoot(factRoot, { type: "set-history", key: "traumaContext", value: context });
  }
  if (recovery.kind === "swelling") {
    const swelling = fieldValue<SprintOneOneHistory["swelling"]>(recovery, "swelling");
    const timing = fieldValue<string>(recovery, "swellingTiming");
    if (swelling) factRoot = reduceFactRoot(factRoot, { type: "set-history", key: "swelling", value: swelling });
    if (timing) factRoot = reduceFactRoot(factRoot, { type: "set-history", key: "swellingTiming", value: timing });
  }
  if (recovery.kind === "rom") {
    const extension = fieldValue<number>(recovery, "extensionDegrees");
    const flexion = fieldValue<number>(recovery, "flexionDegrees");
    if (extension !== undefined) factRoot = reduceFactRoot(factRoot, { type: "set-objective", key: "extensionDegrees", value: extension });
    if (flexion !== undefined) factRoot = reduceFactRoot(factRoot, { type: "set-objective", key: "flexionDegrees", value: flexion });
  }
  if (recovery.kind === "palpation") {
    for (const field of recovery.fields) {
      factRoot = reduceFactRoot(factRoot, {
        type: "toggle-palpation",
        value: field.value as SprintOneOneObjective["palpationFindings"][number]
      });
    }
  }

  return {
    ...state,
    sourceRevision: state.sourceRevision + 1,
    factRoot,
    recovery: undefined
  };
}

export function discardC3Recovery(state: C3State): C3State {
  return state.recovery ? { ...state, recovery: undefined } : state;
}

function nextAssessmentSequence(state: C3State): number {
  return Math.max(0, ...state.assessments.map((entry) => entry.sequence)) + 1;
}

export function createC3Assessment(
  state: C3State,
  role: C3AssessmentRole,
  text: string
): C3Transition {
  const cleaned = clean(text);
  if (!cleaned) return { state, outcome: "unchanged" };
  if (role === "primary" && getActiveAssessments(state).some((entry) => entry.role === "primary")) {
    return { state, outcome: "blocked" };
  }
  const sequence = nextAssessmentSequence(state);
  const entryId = `C3-ASMT-${String(sequence).padStart(3, "0")}`;
  return {
    outcome: "applied",
    state: {
      ...state,
      sourceRevision: state.sourceRevision + 1,
      assessments: [
        ...state.assessments,
        {
          versionId: `${entryId}-V1`,
          entryId,
          role,
          text: cleaned,
          origin: "clinician-free-text",
          status: "active",
          sequence
        }
      ]
    }
  };
}

export function reviseC3Assessment(
  state: C3State,
  entryId: string,
  role: C3AssessmentRole,
  text: string
): C3Transition {
  const current = getActiveAssessments(state).find((entry) => entry.entryId === entryId);
  const cleaned = clean(text);
  if (!current || !cleaned) return { state, outcome: "unchanged" };
  if (
    role === "primary"
    && getActiveAssessments(state).some((entry) => entry.role === "primary" && entry.entryId !== entryId)
  ) {
    return { state, outcome: "blocked" };
  }
  if (current.role === role && current.text === cleaned) return { state, outcome: "unchanged" };
  const sequence = nextAssessmentSequence(state);
  return {
    outcome: "applied",
    state: {
      ...state,
      sourceRevision: state.sourceRevision + 1,
      assessments: [
        ...state.assessments.map((entry) =>
          entry.versionId === current.versionId ? { ...entry, status: "superseded" as const } : entry
        ),
        {
          ...current,
          versionId: `${entryId}-V${sequence}`,
          role,
          text: cleaned,
          status: "active",
          sequence,
          predecessorId: current.versionId
        }
      ]
    }
  };
}

export function removeC3Assessment(state: C3State, entryId: string): C3Transition {
  const current = getActiveAssessments(state).find((entry) => entry.entryId === entryId);
  if (!current) return { state, outcome: "unchanged" };
  const sequence = nextAssessmentSequence(state);
  return {
    outcome: "applied",
    state: {
      ...state,
      sourceRevision: state.sourceRevision + 1,
      assessments: [
        ...state.assessments.map((entry) =>
          entry.versionId === current.versionId ? { ...entry, status: "superseded" as const } : entry
        ),
        {
          ...current,
          versionId: `${entryId}-V${sequence}`,
          status: "removed",
          sequence,
          predecessorId: current.versionId
        }
      ]
    }
  };
}

function nextPhraseSequence(state: C3State): number {
  return Math.max(0, ...state.phrases.map((entry) => entry.sequence)) + 1;
}

export interface C3SelectablePhrase {
  readonly id: string;
  readonly category: C3PhraseCategory;
  readonly text: string;
  readonly fixtureId: string;
  readonly fixtureVersion: string;
  readonly phraseVersion: string;
}

export function selectC3PhraseDefinition(
  state: C3State,
  fixture: C3SelectablePhrase
): C3Transition {
  const alreadyActive = state.phrases.some(
    (entry) => entry.status === "active" && entry.phraseId === fixture.id
  );
  if (alreadyActive) return { state, outcome: "unchanged" };
  const sequence = nextPhraseSequence(state);
  const entryId = `C3-PH-${String(sequence).padStart(3, "0")}`;
  return {
    outcome: "applied",
    state: {
      ...state,
      sourceRevision: state.sourceRevision + 1,
      phrases: [
        ...state.phrases,
        {
          versionId: `${entryId}-V1`,
          entryId,
          category: fixture.category,
          origin: "fixture",
          fixtureId: fixture.fixtureId,
          fixtureVersion: fixture.fixtureVersion,
          phraseId: fixture.id,
          phraseVersion: fixture.phraseVersion,
          originalText: fixture.text,
          currentText: fixture.text,
          actor: "clinician",
          action: "selected",
          status: "active",
          sequence
        }
      ]
    }
  };
}

export function selectC3Phrase(state: C3State, phraseId: string): C3Transition {
  const fixture = C3_PHRASES.find((phrase) => phrase.id === phraseId);
  if (!fixture) return { state, outcome: "unchanged" };
  return selectC3PhraseDefinition(state, {
    ...fixture,
    fixtureId: "C3-FIX-001",
    fixtureVersion: "1.1",
    phraseVersion: "1.0"
  });
}

function activePhrase(state: C3State, entryId: string) {
  return state.phrases.find((entry) => entry.entryId === entryId && entry.status === "active");
}

export function editC3Phrase(state: C3State, entryId: string, text: string): C3Transition {
  const current = activePhrase(state, entryId);
  const cleaned = clean(text);
  if (!current || !cleaned || current.currentText === cleaned) return { state, outcome: "unchanged" };
  const sequence = nextPhraseSequence(state);
  return {
    outcome: "applied",
    state: {
      ...state,
      sourceRevision: state.sourceRevision + 1,
      phrases: [
        ...state.phrases.map((entry) =>
          entry.versionId === current.versionId ? { ...entry, status: "superseded" as const } : entry
        ),
        {
          ...current,
          versionId: `${entryId}-V${sequence}`,
          currentText: cleaned,
          action: "edited",
          status: "active",
          sequence,
          predecessorId: current.versionId
        }
      ]
    }
  };
}

export function removeC3Phrase(state: C3State, entryId: string): C3Transition {
  const current = activePhrase(state, entryId);
  if (!current) return { state, outcome: "unchanged" };
  const sequence = nextPhraseSequence(state);
  return {
    outcome: "applied",
    state: {
      ...state,
      sourceRevision: state.sourceRevision + 1,
      phrases: [
        ...state.phrases.map((entry) =>
          entry.versionId === current.versionId ? { ...entry, status: "superseded" as const } : entry
        ),
        {
          ...current,
          versionId: `${entryId}-V${sequence}`,
          action: "removed",
          status: "removed",
          sequence,
          predecessorId: current.versionId
        }
      ]
    }
  };
}

export function setC3Profile(state: C3State, profile: C3DocumentProfile): C3State {
  return state.outputProfile === profile ? state : { ...state, outputProfile: profile };
}

export function setC3ManualDraft(
  state: C3State,
  profile: C3DocumentProfile,
  baseText: string,
  text: string
): C3State {
  return {
    ...state,
    drafts: {
      ...state.drafts,
      [profile]: {
        profile,
        sourceRevision: state.sourceRevision,
        baseText,
        text
      }
    }
  };
}

export function continueC3ManualDraft(
  state: C3State,
  profile: C3DocumentProfile,
  currentBaseText: string
): C3State {
  const draft = state.drafts[profile];
  if (!draft) return state;
  return {
    ...state,
    drafts: {
      ...state.drafts,
      [profile]: {
        ...draft,
        sourceRevision: state.sourceRevision,
        baseText: currentBaseText
      }
    }
  };
}

export function discardC3ManualDraft(state: C3State, profile: C3DocumentProfile): C3State {
  if (!state.drafts[profile]) return state;
  const drafts = { ...state.drafts };
  delete drafts[profile];
  return { ...state, drafts };
}

export function getC3DraftStatus(
  state: C3State,
  profile: C3DocumentProfile
): "generated" | "current" | "stale" {
  const draft = state.drafts[profile];
  if (!draft) return "generated";
  return draft.sourceRevision === state.sourceRevision ? "current" : "stale";
}

export function categoryLabel(category: C3PhraseCategory): string {
  return category === "plan" ? "Plan" : category === "follow-up" ? "Opfølgning" : "Safety-net";
}
