import { C33_TRAUMA_MECHANISM_DETAILS } from "./fixtures";
import type { C33State, C33TraumaMechanismDetail } from "./model";

const MECHANISM_DRAFT_PREFIX: Record<C33TraumaMechanismDetail, string> = {
  twisting: "Vridtraume",
  "direct-blow": "Direkte slag-traume",
  hyperextension: "Hyperekstensionstraume",
  "valgus-varus": "Valgus-/varustraume",
  landing: "Landingstraume"
};

const UNFINISHED_DRAFT_SUFFIX = /med kliniske fund forenelige med\.?\s*$/u;

function sidePhrase(state: C33State): string | undefined {
  if (state.workflow.bilateralPain) return "begge";
  const side = state.c32.c3.factRoot.history.side;
  if (side === "right") return "højre";
  if (side === "left") return "venstre";
  return undefined;
}

/**
 * Neutral, clinician-owned draft seed. Only uses explicitly recorded side and
 * trauma-mechanism detail — never diagnoses or differentials.
 */
export function buildC33AnalysisDraft(state: C33State): string | undefined {
  const side = sidePhrase(state);
  const detail = state.workflow.traumaMechanismDetail;
  if (!side || !detail) return undefined;
  if (!C33_TRAUMA_MECHANISM_DETAILS.some((entry) => entry.id === detail)) return undefined;
  return `${MECHANISM_DRAFT_PREFIX[detail]} i ${side} knæ med kliniske fund forenelige med `;
}

/** Unfinished draft ends at the open “forenelige med ” clause and must not enter A:. */
export function isC33UnfinishedAnalysisDraft(text: string): boolean {
  const trimmed = text.trimEnd();
  if (!trimmed) return true;
  return UNFINISHED_DRAFT_SUFFIX.test(trimmed);
}
