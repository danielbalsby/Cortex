import {
  type C3DocumentProfile,
  type C3State
} from "@/clinical/prototypes/c3/model";
import { projectC3Document } from "@/clinical/prototypes/c3/projections";

export interface C31PsoapSection {
  readonly key: "problem" | "subjective" | "objective" | "assessment" | "plan";
  readonly marker: "P" | "S" | "O" | "A";
  readonly label: string;
  readonly text: string;
}

function extractSection(text: string, heading: string): string {
  return text
    .split("\n\n")
    .find((part) => part.startsWith(`${heading}\n`))
    ?.slice(heading.length + 1)
    .trim() ?? "";
}

function problemText(state: C3State): string {
  if (state.factRoot.history.side === "right") return "Højresidige knæsmerter";
  if (state.factRoot.history.side === "left") return "Venstresidige knæsmerter";
  return "Knæsmerter";
}

export function getC31PsoapSections(
  state: C3State,
  profile: C3DocumentProfile
): readonly C31PsoapSection[] {
  const generated = projectC3Document(state, profile);
  return [
    { key: "problem", marker: "P", label: "Problem", text: problemText(state) },
    { key: "subjective", marker: "S", label: "Subjektivt", text: extractSection(generated, "Anamnese") },
    { key: "objective", marker: "O", label: "Objektivt", text: extractSection(generated, "Objektivt") },
    { key: "assessment", marker: "A", label: "Vurdering", text: extractSection(generated, "Vurdering") },
    { key: "plan", marker: "P", label: "Plan", text: extractSection(generated, "Plan") }
  ];
}

export function projectC31PsoapDocument(
  state: C3State,
  profile: C3DocumentProfile
): string {
  return getC31PsoapSections(state, profile)
    .map((section) => `${section.marker}: ${section.text}`.trimEnd())
    .join("\n\n");
}
