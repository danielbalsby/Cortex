import { deriveSprintOneOneCompleteness } from "@/clinical/prototypes/sprint-1-1/derivations";
import { generateSprintOneOneJournal } from "@/clinical/prototypes/sprint-1-1/documents";
import { createEmptySprintOneOneState } from "@/clinical/prototypes/sprint-1-1/model";

import {
  getActiveAssessments,
  getActivePhrases,
  type C3AssessmentRole,
  type C3DocumentProfile,
  type C3State
} from "./model";

const roleLabels: Record<C3AssessmentRole, string> = {
  primary: "Primær",
  secondary: "Sekundær",
  differential: "Differential"
};

function assessmentText(state: C3State): string | undefined {
  const active = getActiveAssessments(state);
  if (!active.length) return undefined;
  if (active.length === 1 && active[0].role === "primary") return active[0].text;
  return active.map((entry) => `${roleLabels[entry.role]}: ${entry.text}`).join(" ");
}

function phraseText(state: C3State, category: "plan" | "follow-up" | "safety-net"): string | undefined {
  const text = getActivePhrases(state)
    .filter((entry) => entry.category === category)
    .map((entry) => entry.currentText)
    .join(" ");
  return text || undefined;
}

function generatorInput(state: C3State, profile: C3DocumentProfile) {
  const empty = createEmptySprintOneOneState();
  return {
    ...empty,
    history: state.factRoot.history,
    objective: state.factRoot.objective,
    assessment: assessmentText(state),
    plan: {
      management: phraseText(state, "plan"),
      followUp: phraseText(state, "follow-up"),
      safetyNet: phraseText(state, "safety-net")
    },
    documentationLevel: profile === "quick" ? "short" as const : "standard" as const
  };
}

function applyLockedC3Wording(text: string): string {
  return text
    .replace(
      "Mediale smerter, intermitterende smerter og let hævelse.",
      "Mediale, intermitterende smerter og let hævelse."
    )
    .replace("Hævelse opstået samme aften.", "Hævelsen opstod samme aften.")
    .replace(
      "Ingen ægte aflåsning og ingen instabilitetsfornemmelse.",
      "Ingen ægte aflåsning eller instabilitetsfornemmelse."
    )
    .replace(
      "Ingen hvilesmerter og ingen nattesmerter.",
      "Ingen hvile- eller nattesmerter."
    )
    .replace(
      "Ingen feber, ingen almen påvirkning og ikke rødt, varmt eller akut hævet knæ.",
      "Ingen feber eller almen påvirkning; knæet er ikke registreret som rødt, varmt og akut hævet."
    )
    .replace("Objektivt: Haltende gang", "Objektivt: haltende gang")
    .replace(
      "Smerte uden laksitet ved valgusstres og menisktest positiv.",
      "Smerte uden laksitet ved valgusstres og positiv menisktest."
    );
}

export function projectC3Document(state: C3State, profile: C3DocumentProfile): string {
  return applyLockedC3Wording(generateSprintOneOneJournal(generatorInput(state, profile)).text);
}

export function deriveC3Completeness(state: C3State) {
  return deriveSprintOneOneCompleteness(generatorInput(state, "standard"));
}

export function getC3ProjectionIdentity(state: C3State, profile: C3DocumentProfile) {
  return {
    snapshotId: state.snapshotId,
    sourceRevision: state.sourceRevision,
    profile,
    text: projectC3Document(state, profile)
  } as const;
}
