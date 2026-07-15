import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import type { ValidationIssue } from "@/engine/pathway-validation-engine";
import {
  validateAnswerUpdate,
  validateClinicalPathway
} from "@/engine/pathway-validation-engine";
import { isFieldVisibleInSection } from "@/engine/visibility-engine";

export type AnswerUpdateResult =
  | { accepted: true; answers: ConsultationAnswers }
  | { accepted: false; answers: ConsultationAnswers; issue: ValidationIssue };

export function createInitialAnswers(pathway: ClinicalPathway): ConsultationAnswers {
  const validation = validateClinicalPathway(pathway);
  if (!validation.valid) {
    const summary = validation.issues
      .map((issue) => `${issue.code}${issue.path ? ` at ${issue.path}` : ""}`)
      .join("; ");
    throw new Error(`Invalid clinical pathway "${pathway.id}": ${summary}`);
  }

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
  value: unknown,
  pathway: ClinicalPathway
): AnswerUpdateResult {
  const validation = validateAnswerUpdate(pathway, fieldId, value);
  if (!validation.accepted) {
    return { accepted: false, answers: current, issue: validation.issue };
  }

  const updated = { ...current, [fieldId]: validation.value };
  return { accepted: true, answers: pruneHiddenAnswers(pathway, updated) };
}
