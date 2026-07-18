import {
  CLINICAL_DOCUMENT_CONTEXT,
  type ClinicalDocumentPrototypeState
} from "./model";

export interface JournalSection {
  readonly id: "problem" | "history" | "objective" | "assessment" | "plan";
  readonly text: string;
}

export function buildJournalSections(
  _state: ClinicalDocumentPrototypeState
): readonly JournalSection[] {
  return [
    {
      id: "problem",
      text: `Problem: ${CLINICAL_DOCUMENT_CONTEXT.problemLabel}`
    }
  ];
}

export function formatJournalSections(sections: readonly JournalSection[]): string {
  return sections.map((section) => section.text).join("\n\n");
}

export function generatePrototypeJournal(state: ClinicalDocumentPrototypeState): string {
  return formatJournalSections(buildJournalSections(state));
}
