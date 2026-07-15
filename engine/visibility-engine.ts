import type {
  ClinicalField,
  ClinicalPathway,
  ClinicalSection,
  ConsultationAnswers
} from "@/clinical/types";
import { matchesCondition } from "@/engine/rule-engine";

export function isSectionVisible(section: ClinicalSection, answers: ConsultationAnswers): boolean {
  if (!section.visibleWhen?.length) return true;
  return section.visibleWhen.every((condition) => matchesCondition(condition, answers));
}

export function getVisibleSections(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): ClinicalSection[] {
  return pathway.sections.filter((section) => isSectionVisible(section, answers));
}

export function isFieldVisible(field: ClinicalField, answers: ConsultationAnswers): boolean {
  if (!field.visibleWhen?.length) return true;
  return field.visibleWhen.every((condition) => matchesCondition(condition, answers));
}

export function isFieldVisibleInSection(
  section: ClinicalSection,
  field: ClinicalField,
  answers: ConsultationAnswers
): boolean {
  if (!isSectionVisible(section, answers)) return false;
  return isFieldVisible(field, answers);
}

export function getVisibleFields(section: ClinicalSection, answers: ConsultationAnswers): ClinicalField[] {
  if (!isSectionVisible(section, answers)) return [];
  return section.fields.filter((field) => isFieldVisible(field, answers));
}
