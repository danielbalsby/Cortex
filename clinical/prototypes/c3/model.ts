import {
  createEmptySprintOneOneState,
  type SprintOneOneState
} from "@/clinical/prototypes/sprint-1-1/model";

export type C3FactRoot = Pick<SprintOneOneState, "history" | "objective">;
export type C3DocumentProfile = "quick" | "standard";
export type C3AssessmentRole = "primary" | "secondary" | "differential";
export type C3PhraseCategory = "plan" | "follow-up" | "safety-net";

export interface C3AssessmentVersion {
  readonly versionId: string;
  readonly entryId: string;
  readonly role: C3AssessmentRole;
  readonly text: string;
  readonly origin: "clinician-free-text";
  readonly status: "active" | "superseded" | "removed";
  readonly sequence: number;
  readonly predecessorId?: string;
}

export interface C3PhraseVersion {
  readonly versionId: string;
  readonly entryId: string;
  readonly category: C3PhraseCategory;
  readonly origin: "fixture";
  readonly fixtureId: string;
  readonly fixtureVersion: string;
  readonly phraseId: string;
  readonly phraseVersion: string;
  readonly originalText: string;
  readonly currentText: string;
  readonly actor: "clinician";
  readonly action: "selected" | "edited" | "removed";
  readonly status: "active" | "superseded" | "removed";
  readonly sequence: number;
  readonly predecessorId?: string;
}

export interface C3ManualDraft {
  readonly profile: C3DocumentProfile;
  readonly sourceRevision: number;
  readonly baseText: string;
  readonly text: string;
}

export interface C3RecoveryField {
  readonly partition: "history" | "objective";
  readonly key: string;
  readonly value: unknown;
}

export interface C3RecoveryRecord {
  readonly id: string;
  readonly kind: "trauma" | "swelling" | "rom" | "palpation";
  readonly capturedAtRevision: number;
  readonly fields: readonly C3RecoveryField[];
}

export interface C3State {
  readonly snapshotId: "C3-SRC-KNEE-001";
  readonly sourceRevision: number;
  readonly factRoot: C3FactRoot;
  readonly assessments: readonly C3AssessmentVersion[];
  readonly phrases: readonly C3PhraseVersion[];
  readonly outputProfile: C3DocumentProfile;
  readonly drafts: Readonly<Partial<Record<C3DocumentProfile, C3ManualDraft>>>;
  readonly recovery?: C3RecoveryRecord;
}

export function createEmptyC3State(): C3State {
  const empty = createEmptySprintOneOneState();
  return {
    snapshotId: "C3-SRC-KNEE-001",
    sourceRevision: 0,
    factRoot: {
      history: empty.history,
      objective: empty.objective
    },
    assessments: [],
    phrases: [],
    outputProfile: "standard",
    drafts: {}
  };
}

export function getActiveAssessments(state: C3State): readonly C3AssessmentVersion[] {
  return state.assessments
    .filter((entry) => entry.status === "active")
    .sort((left, right) => left.sequence - right.sequence);
}

export function getActivePhrases(state: C3State): readonly C3PhraseVersion[] {
  return state.phrases
    .filter((entry) => entry.status === "active")
    .sort((left, right) => left.sequence - right.sequence);
}
