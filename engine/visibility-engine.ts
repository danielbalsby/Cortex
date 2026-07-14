import type { ClinicalField, ClinicalSection, ConsultationAnswers } from "@/clinical/types";
import { matchesCondition } from "@/engine/rule-engine";

export function isFieldVisible(field: ClinicalField, answers: ConsultationAnswers): boolean {
  if (!field.visibleWhen?.length) return true;
  return field.visibleWhen.every((condition) => matchesCondition(condition, answers));
}

export function getVisibleFields(section: ClinicalSection, answers: ConsultationAnswers): ClinicalField[] {
  return section.fields.filter((field) => isFieldVisible(field, answers));
}
