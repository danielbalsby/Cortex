import type {
  ClinicalOutputDefinition,
  ClinicalPathway,
  ConsultationAnswers
} from "@/clinical/types";
import { matchesCondition } from "@/engine/rule-engine";

export function isOutputActive(
  output: ClinicalOutputDefinition,
  answers: ConsultationAnswers
): boolean {
  if (output.alwaysActive) return true;
  if (!output.activeWhen?.length) return false;
  return output.activeWhen.every((condition) => matchesCondition(condition, answers));
}

/** Low-level pure evaluation. `answers` must already be fully validated and stabilised. */
export function getActiveOutputs(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): ClinicalOutputDefinition[] {
  return pathway.outputs.filter((output) => isOutputActive(output, answers));
}
