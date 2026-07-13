import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";

export type OutputKind = "journal" | "xray" | "orthopedic-referral";
export type OutputStatus = "ready" | "needs-review" | "missing-data";

export interface EncounterOutput {
  kind: OutputKind;
  title: string;
  text: string;
  status: OutputStatus;
  missing: string[];
  rationale?: string;
}

export interface EncounterState {
  id: string;
  pathway: ClinicalPathway;
  answers: ConsultationAnswers;
  startedAt: string;
  updatedAt: string;
}
