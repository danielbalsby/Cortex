import type {
  ClinicalField,
  ClinicalPathway,
  ClinicalSection,
  ConsultationAnswers,
  JournalSection
} from "@/clinical/types";
import { getVisibleFields, getVisibleSections } from "@/engine/visibility-engine";

const JOURNAL_ORDER: JournalSection[] = [
  "problem",
  "subjective",
  "objective",
  "assessment",
  "plan"
];

const JOURNAL_LABELS: Record<JournalSection, string> = {
  problem: "P",
  subjective: "S",
  objective: "O",
  assessment: "A",
  plan: "P"
};

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

/** Low-level pure renderer. `answers` must already be fully validated and stabilised. */
export function generatePSOAP(pathway: ClinicalPathway, answers: ConsultationAnswers) {
  const grouped = new Map<JournalSection, string[]>();

  for (const section of getVisibleSections(pathway, answers)) {
    const body = renderSection(section, answers);
    if (!body) continue;

    const journalKey = section.journalSection;
    const parts = grouped.get(journalKey) ?? [];
    parts.push(body);
    grouped.set(journalKey, parts);
  }

  return JOURNAL_ORDER.map((journalKey) => {
    const parts = grouped.get(journalKey);
    if (!parts?.length) return "";

    const body = parts.join(" ").replace(/\s+/g, " ").trim();
    return body ? `${JOURNAL_LABELS[journalKey]}: ${body}` : "";
  })
    .filter(Boolean)
    .join("\n");
}
