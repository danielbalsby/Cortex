import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import type {
  PathwayValidationOptions,
  ValidationIssue
} from "@/engine/pathway-validation-engine";
import {
  validateAnswerUpdate,
  validateClinicalPathway
} from "@/engine/pathway-validation-engine";
import { isFieldVisibleInSection } from "@/engine/visibility-engine";

export type AnswerUpdateResult =
  | { accepted: true; answers: ConsultationAnswers }
  | { accepted: false; answers: ConsultationAnswers; issue: ValidationIssue };

export type HiddenAnswerPruningResult =
  | { stable: true; answers: ConsultationAnswers }
  | { stable: false; answers: ConsultationAnswers; issue: ValidationIssue };

export interface HiddenAnswerPruningOptions {
  fallbackAnswers?: ConsultationAnswers;
  maxIterations?: number;
}

export function createInitialAnswers(
  pathway: ClinicalPathway,
  validationOptions: PathwayValidationOptions = {}
): ConsultationAnswers {
  const validation = validateClinicalPathway(pathway, validationOptions);
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
  const result = stabilizeHiddenAnswers(pathway, answers);
  if (!result.stable) throw new Error(result.issue.message);
  return result.answers;
}

export function stabilizeHiddenAnswers(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers,
  options: HiddenAnswerPruningOptions = {}
): HiddenAnswerPruningResult {
  const fieldCount = pathway.sections.reduce((count, section) => count + section.fields.length, 0);
  const maxIterations = options.maxIterations ?? fieldCount + 1;
  const fallbackAnswers = options.fallbackAnswers ?? answers;
  let current = answers;

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    let next = current;
    let changed = false;

    for (const section of pathway.sections) {
      for (const field of section.fields) {
        if (!isFieldVisibleInSection(section, field, current) && field.id in current) {
          if (!changed) next = { ...current };
          delete next[field.id];
          changed = true;
        }
      }
    }

    if (!changed) return { stable: true, answers: current };
    current = next;
  }

  return {
    stable: false,
    answers: fallbackAnswers,
    issue: {
      code: "answers.pruning-did-not-converge",
      message: `Hidden-answer pruning did not reach a stable fixed point within ${maxIterations} iterations.`,
      path: "answers"
    }
  };
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
  const pruning = stabilizeHiddenAnswers(pathway, updated, { fallbackAnswers: current });
  if (!pruning.stable) {
    return { accepted: false, answers: current, issue: pruning.issue };
  }
  return { accepted: true, answers: pruning.answers };
}
