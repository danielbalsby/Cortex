import type { ClinicalOutputType, ClinicalPathway, ConsultationAnswers } from "@/clinical/types";

export type OutputKind = ClinicalOutputType;
export type OutputStatus = "ready" | "needs-review" | "missing-data";

export interface EncounterOutput {
  id: string;
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
