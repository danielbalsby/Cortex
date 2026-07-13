import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
export function createInitialAnswers(pathway: ClinicalPathway): ConsultationAnswers {
  const answers: ConsultationAnswers = {};
  for (const section of pathway.sections) for (const field of section.fields)
    answers[field.id] = field.defaultValue ?? (field.type === "multi-choice" ? [] : "");
  return answers;
}
export function setConsultationAnswer(current: ConsultationAnswers, fieldId: string, value: string | string[]): ConsultationAnswers {
  return { ...current, [fieldId]: value };
}
