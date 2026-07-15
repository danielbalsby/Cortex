import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import { isFieldVisibleInSection } from "@/engine/visibility-engine";

export function createInitialAnswers(pathway: ClinicalPathway): ConsultationAnswers {
  const answers: ConsultationAnswers = {};
  for (const section of pathway.sections) {
    for (const field of section.fields) {
      answers[field.id] = field.type === "multi-choice" ? [] : "";
    }
  }
  return pruneHiddenAnswers(pathway, answers);
}

export function pruneHiddenAnswers(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): ConsultationAnswers {
  let changed = false;
  const next = { ...answers };

  for (const section of pathway.sections) {
    for (const field of section.fields) {
      if (!isFieldVisibleInSection(section, field, answers) && field.id in next) {
        delete next[field.id];
        changed = true;
      }
    }
  }

  return changed ? next : answers;
}

export function setConsultationAnswer(
  current: ConsultationAnswers,
  fieldId: string,
  value: string | string[],
  pathway?: ClinicalPathway
): ConsultationAnswers {
  const updated = { ...current, [fieldId]: value };
  return pathway ? pruneHiddenAnswers(pathway, updated) : updated;
}
