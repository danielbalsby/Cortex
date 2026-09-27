import {
  buildJournalSections,
  formatJournalSections
} from "@/clinical/prototypes/clinical-document-workspace/journal";
import type {
  ClinicalDocumentPrototypeState,
  PrototypeFacts
} from "@/clinical/prototypes/clinical-document-workspace/model";

export type SprintZeroDraftId = "journal" | "imaging" | "physiotherapy";
export type DraftLifecycleStatus =
  | "draft"
  | "reviewed"
  | "approved"
  | "copied"
  | "rejected";
export type DraftLifecycleEvent = "review" | "approve" | "copy" | "reject" | "reset";

export interface SprintZeroDraft {
  readonly id: SprintZeroDraftId;
  readonly title: string;
  readonly text: string;
  readonly missing: readonly string[];
  readonly generatedFromRecordedInformation: true;
}

const SIDE_LABELS = {
  right: "højre knæ",
  left: "venstre knæ",
  bilateral: "begge knæ"
} as const;

const TRAUMA_LABELS = {
  "twisting-planted-foot": "vrid på fikseret fod",
  "direct-blow": "direkte slag",
  fall: "fald",
  "valgus-force": "valguskraft",
  "varus-force": "varuskraft",
  hyperextension: "hyperekstension",
  "forced-flexion": "tvungen fleksion",
  "patellar-displacement": "patellaforskydning",
  "sport-contact": "sport/kontakt",
  traffic: "trafikhændelse",
  unclear: "uklar mekanisme",
  other: "anden mekanisme"
} as const;

const LOCATION_LABELS = {
  medial: "mediale smerter",
  lateral: "laterale smerter",
  anterior: "anteriore smerter",
  posterior: "posteriore smerter",
  diffuse: "diffuse smerter"
} as const;

const FUNCTION_LABELS = {
  normal: "normal belastningsevne",
  limp: "haltende funktion",
  "cannot-four-steps": "kan ikke tage fire vægtbærende skridt"
} as const;

const SWELLING_LABELS = {
  none: "ingen hævelse",
  "delayed-mild": "let forsinket hævelse",
  "persistent-mild": "let vedvarende hævelse",
  marked: "udtalt hævelse"
} as const;

function clean(value: string | undefined): string | undefined {
  const result = value?.trim();
  return result ? result : undefined;
}

function historySummary(facts: PrototypeFacts): string {
  const parts: string[] = [];
  if (facts.side) parts.push(SIDE_LABELS[facts.side]);
  if (facts.traumaMechanisms?.length) {
    parts.push(facts.traumaMechanisms.map((item) => TRAUMA_LABELS[item]).join(", "));
  } else if (clean(facts.traumaMechanismNote)) {
    parts.push(clean(facts.traumaMechanismNote)!);
  }
  if (facts.painLocations?.length) {
    parts.push(facts.painLocations.map((item) => LOCATION_LABELS[item]).join(", "));
  }
  if (facts.swelling) parts.push(SWELLING_LABELS[facts.swelling]);
  if (facts.function) parts.push(FUNCTION_LABELS[facts.function]);
  if (facts.locking === "no") parts.push("ingen låsning");
  if (facts.locking === "yes") parts.push("låsning");
  if (facts.instability === "no") parts.push("ingen instabilitet");
  if (facts.instability === "yes") parts.push("instabilitet");
  return parts.join("; ");
}

function assessmentSummary(state: ClinicalDocumentPrototypeState): string {
  return state.workingDiagnoses.map((item) => clean(item.label)).filter(Boolean).join("; ");
}

export function generateSprintZeroJournal(
  state: ClinicalDocumentPrototypeState
): SprintZeroDraft {
  const sections = buildJournalSections(state);
  const hasClinicalContent = sections.some((section) => section.id !== "problem");
  return {
    id: "journal",
    title: "Journaludkast",
    text: formatJournalSections(sections),
    missing: hasClinicalContent ? [] : ["Konsultationsoplysninger"],
    generatedFromRecordedInformation: true
  };
}

export function generateImagingReferralDraft(
  state: ClinicalDocumentPrototypeState,
  explicitIntent: boolean
): SprintZeroDraft {
  const missing: string[] = [];
  if (!explicitIntent) missing.push("Eksplicit ønske om henvisningsudkast");
  if (!state.facts.side) missing.push("Side");
  if (!state.facts.traumaMechanisms?.length && !clean(state.facts.traumaMechanismNote)) {
    missing.push("Traumemekanisme");
  }
  if (!state.facts.painLocations?.length) missing.push("Smerteplacering");
  if (!assessmentSummary(state)) missing.push("Klinikerens vurdering");

  const history = historySummary(state.facts);
  const assessment = assessmentSummary(state);
  const text = missing.length
    ? ""
    : [
        "Syntetisk prototypeudkast – billeddiagnostisk henvisning.",
        `Problem og registrerede oplysninger: ${history}.`,
        `Klinikerens vurdering: ${assessment}.`,
        "Ønske: billeddiagnostisk vurdering. Modalitet og regional destination er ikke fastlagt i prototypen."
      ].join("\n");

  return {
    id: "imaging",
    title: "Billeddiagnostisk henvisning",
    text,
    missing,
    generatedFromRecordedInformation: true
  };
}

export function generatePhysiotherapyReferralDraft(
  state: ClinicalDocumentPrototypeState,
  explicitIntent: boolean
): SprintZeroDraft {
  const missing: string[] = [];
  if (!explicitIntent) missing.push("Eksplicit ønske om henvisningsudkast");
  if (!state.facts.side) missing.push("Side");
  if (!state.facts.painLocations?.length) missing.push("Smerteplacering");
  if (!assessmentSummary(state)) missing.push("Klinikerens vurdering");

  const history = historySummary(state.facts);
  const assessment = assessmentSummary(state);
  const text = missing.length
    ? ""
    : [
        "Syntetisk prototypeudkast – fysioterapihenvisning.",
        `Problem og registrerede oplysninger: ${history}.`,
        `Klinikerens vurdering: ${assessment}.`,
        "Plan: fysioterapeutisk vurdering. Behandlingsmål og destination aftales af klinikeren."
      ].join("\n");

  return {
    id: "physiotherapy",
    title: "Fysioterapihenvisning",
    text,
    missing,
    generatedFromRecordedInformation: true
  };
}

export function transitionDraftStatus(
  current: DraftLifecycleStatus,
  event: DraftLifecycleEvent
): DraftLifecycleStatus {
  if (event === "reset") return "draft";
  if (event === "reject") return current === "copied" ? current : "rejected";
  if (event === "review") return current === "draft" ? "reviewed" : current;
  if (event === "approve") return current === "reviewed" ? "approved" : current;
  if (event === "copy") return current === "approved" ? "copied" : current;
  return current;
}
