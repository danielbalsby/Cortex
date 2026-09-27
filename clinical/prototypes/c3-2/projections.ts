import type { C3DocumentProfile } from "@/clinical/prototypes/c3/model";
import { projectC3Document } from "@/clinical/prototypes/c3/projections";

import type { C32State } from "./model";

export interface C32PsoapSection {
  readonly key: "problem" | "subjective" | "objective" | "assessment" | "plan";
  readonly marker: "P" | "S" | "O" | "A";
  readonly text: string;
}

function extractStandard(text: string, heading: string): string {
  return text
    .split("\n\n")
    .find((part) => part.startsWith(`${heading}\n`))
    ?.slice(heading.length + 1)
    .trim() ?? "";
}

function extractQuick(text: string) {
  const objectiveMarker = " Objektivt: ";
  const assessmentMarker = " Vurdering: ";
  const planMarker = " Plan: ";
  const objectiveAt = text.indexOf(objectiveMarker);
  const assessmentAt = text.indexOf(assessmentMarker);
  const planAt = text.indexOf(planMarker);
  return {
    subjective: text.slice(0, objectiveAt >= 0 ? objectiveAt : text.length).trim(),
    objective: objectiveAt < 0
      ? ""
      : text.slice(objectiveAt + objectiveMarker.length, assessmentAt >= 0 ? assessmentAt : planAt >= 0 ? planAt : text.length).trim(),
    assessment: assessmentAt < 0
      ? ""
      : text.slice(assessmentAt + assessmentMarker.length, planAt >= 0 ? planAt : text.length).trim(),
    plan: planAt < 0 ? "" : text.slice(planAt + planMarker.length).trim()
  };
}

function problemText(state: C32State): string {
  if (state.c3.factRoot.history.side === "right") return "Højresidige knæsmerter";
  if (state.c3.factRoot.history.side === "left") return "Venstresidige knæsmerter";
  return "";
}

function inspectionText(state: C32State): string {
  if (state.inspection.status === "no-specific-findings") return "Inspektion uden særlige fund.";
  if (state.inspection.status === "not-assessed") return "Inspektion ikke vurderet.";
  const labels = state.inspection.findings.map((finding) =>
    finding === "swelling" ? "synlig hævelse" : finding === "redness" ? "rødme" : "deformitet"
  );
  if (!labels.length) return "";
  if (labels.length === 1) return `${labels[0][0].toLocaleUpperCase("da-DK")}${labels[0].slice(1)}.`;
  return `${labels.slice(0, -1).join(", ")} og ${labels.at(-1)}.`
    .replace(/^./u, (character) => character.toLocaleUpperCase("da-DK"));
}

function appendSentence(base: string, addition: string): string {
  return [base, addition].filter(Boolean).join(" ").trim();
}

export function getC32PsoapSections(
  state: C32State,
  profile: C3DocumentProfile
): readonly C32PsoapSection[] {
  const generated = projectC3Document(state.c3, profile);
  const source = profile === "quick"
    ? extractQuick(generated)
    : {
        subjective: extractStandard(generated, "Anamnese"),
        objective: extractStandard(generated, "Objektivt"),
        assessment: extractStandard(generated, "Vurdering"),
        plan: extractStandard(generated, "Plan").replace(/^Plan:\s*/u, "")
      };
  return [
    { key: "problem", marker: "P", text: problemText(state) },
    { key: "subjective", marker: "S", text: source.subjective },
    { key: "objective", marker: "O", text: appendSentence(source.objective, inspectionText(state)) },
    { key: "assessment", marker: "A", text: source.assessment },
    { key: "plan", marker: "P", text: source.plan.replace(/^Plan:\s*/u, "") }
  ];
}

export function projectC32PsoapDocument(
  state: C32State,
  profile: C3DocumentProfile
): string {
  return getC32PsoapSections(state, profile)
    .map((section) => `${section.marker}: ${section.text}`.trimEnd())
    .join("\n");
}

export function isC32CopyReadyPsoap(text: string): boolean {
  const lines = text.split("\n");
  return lines.length === 5
    && lines[0].startsWith("P:")
    && lines[1].startsWith("S:")
    && lines[2].startsWith("O:")
    && lines[3].startsWith("A:")
    && lines[4].startsWith("P:")
    && !lines[4].startsWith("P: Plan:");
}

export function deriveC32InspectionCompleteness(state: C32State) {
  return {
    status: state.inspection.status,
    findings: state.inspection.findings,
    answered: Boolean(state.inspection.status || state.inspection.findings.length)
  } as const;
}
