import type { ClinicalField, ClinicalPathway, ClinicalSection, ConsultationAnswers } from "@/clinical/types";
import { getVisibleFields } from "@/engine/visibility-engine";

export function renderField(field: ClinicalField, value: string | string[]) {
  if (!value || (Array.isArray(value) && !value.length)) return "";
  if (field.type === "multi-choice") {
    return (value as string[])
      .map((v) => field.options?.find((o) => o.value === v)?.output ?? "")
      .filter(Boolean)
      .join(" ");
  }
  if (field.type === "short-text") {
    const text = String(value).trim();
    return text ? `${field.output?.prefix ?? ""}${text}${field.output?.suffix ?? ""}`.trim() : "";
  }
  return field.options?.find((o) => o.value === value)?.output ?? "";
}

export function renderSection(section: ClinicalSection, answers: ConsultationAnswers) {
  return getVisibleFields(section, answers)
    .map((field) => renderField(field, answers[field.id]))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function generatePSOAP(pathway: ClinicalPathway, answers: ConsultationAnswers) {
  const labels: Record<ClinicalSection["kind"], string> = {
    problem: "P",
    history: "S",
    objective: "O",
    assessment: "A",
    plan: "P"
  };

  return pathway.sections
    .map((section) => {
      const body = renderSection(section, answers);
      return body ? `${labels[section.kind]}: ${body}` : "";
    })
    .filter(Boolean)
    .join("\n");
}
