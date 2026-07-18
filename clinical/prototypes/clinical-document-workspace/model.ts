export type PrototypeMode = "quick" | "standard";

export type PrototypeFacts = Readonly<Record<string, never>>;

export interface ClinicalDocumentPrototypeState {
  readonly mode: PrototypeMode;
  readonly facts: PrototypeFacts;
}

export interface ClinicalDocumentSectionDefinition {
  readonly id: "history" | "objective" | "assessment" | "plan";
  readonly number: string;
  readonly label: string;
  readonly placeholder: string;
}

export const CLINICAL_DOCUMENT_CONTEXT = {
  problemCode: "knee-pain",
  problemLabel: "Knæsmerte"
} as const;

export const CLINICAL_DOCUMENT_SECTIONS: readonly ClinicalDocumentSectionDefinition[] = [
  {
    id: "history",
    number: "01",
    label: "Anamnese",
    placeholder: "Ingen anamnestiske oplysninger registreret."
  },
  {
    id: "objective",
    number: "02",
    label: "Objektivt",
    placeholder: "Ingen objektive fund registreret."
  },
  {
    id: "assessment",
    number: "03",
    label: "Vurdering",
    placeholder: "Ingen arbejdshypoteser registreret."
  },
  {
    id: "plan",
    number: "04",
    label: "Plan",
    placeholder: "Ingen planhandlinger registreret."
  }
] as const;

export function createEmptyClinicalDocumentState(): ClinicalDocumentPrototypeState {
  return {
    mode: "quick",
    facts: {}
  };
}

export function setPrototypeMode(
  state: ClinicalDocumentPrototypeState,
  mode: PrototypeMode
): ClinicalDocumentPrototypeState {
  if (state.mode === mode) return state;
  return { ...state, mode };
}
