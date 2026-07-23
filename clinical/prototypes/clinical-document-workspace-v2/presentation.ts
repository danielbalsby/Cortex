/**
 * Presentation helpers for UX experiment v2.
 * Derives narrative and cockpit views from the shared fact model.
 * Does not invent clinical facts or change fact meaning.
 */

import {
  CLINICAL_DOCUMENT_CONTEXT,
  type ClinicalDocumentPrototypeState,
  type PrototypeFacts
} from "./model";
import {
  getPrototypeAttentionPoints,
  getPrototypeSuggestions,
  getReferralDraftFoundations,
  type PrototypeAttentionPoint,
  type PrototypeSuggestion,
  type ReferralDraftFoundation
} from "../clinical-document-workspace/selectors";

export type FocusTargetId =
  | "history-situation"
  | "history-trauma"
  | "history-pain"
  | "history-function"
  | "objective-exam"
  | "assessment"
  | "plan"
  | "journal";

export interface NarrativeBlock {
  readonly id: FocusTargetId;
  readonly title: string;
  readonly sentence: string;
  readonly isEmpty: boolean;
}

export interface CockpitGap {
  readonly id: string;
  readonly label: string;
  readonly focusTarget: FocusTargetId;
}

export interface CockpitView {
  readonly situation: string;
  readonly recorded: readonly string[];
  readonly gaps: readonly CockpitGap[];
  readonly attention: readonly PrototypeAttentionPoint[];
  readonly diagnoses: readonly string[];
  readonly planActions: readonly string[];
}

const SIDE_LABELS = { right: "højre", left: "venstre", bilateral: "begge knæ" } as const;
const SIDE_ADJ = {
  right: "højresidigt",
  left: "venstresidigt",
  bilateral: "bilateralt"
} as const;
const ONSET_ADJ = {
  acute: "Akut",
  gradual: "Gradvist",
  recurrent: "Recidiverende",
  unclear: "Uklart",
  other: "Andet"
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
  medial: "medialt",
  lateral: "lateralt",
  anterior: "fortil",
  posterior: "bagtil",
  diffuse: "diffust"
} as const;
const PATTERN_LABELS = {
  "load-related": "belastningsrelateret",
  "start-up": "ved igangsætning",
  stairs: "ved trapper",
  rest: "i hvile",
  night: "om natten",
  constant: "konstant",
  intermittent: "intermitterende",
  other: "andet mønster"
} as const;
const PLAN_LABELS = {
  information: "Information",
  activity: "Aktivitetstilpasning",
  exercise: "Gradueret træning",
  physiotherapy: "Fysioterapi",
  imaging: "Billeddiagnostik",
  "follow-up": "Opfølgning",
  "safety-net": "Safety-netting"
} as const;

function joinDanish(values: readonly string[]): string {
  if (values.length <= 1) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} og ${values[1]}`;
  return `${values.slice(0, -1).join(", ")} og ${values.at(-1)}`;
}

function positiveFindings(facts: PrototypeFacts): string[] {
  const findings: string[] = [];
  if (facts.function === "limp") findings.push("Halten");
  if (facts.function === "cannot-four-steps") findings.push("Kan ikke tage fire skridt");
  if (facts.swelling && facts.swelling !== "none") findings.push("Hævelse");
  if (facts.locking === "yes") findings.push("Reel aflåsning");
  if (facts.instability === "yes") findings.push("Instabilitet");
  if (facts.fever === "yes") findings.push("Feber");
  if (facts.gait === "limp" || facts.gait === "unable") findings.push("Afvigende gang");
  if (facts.deformity === "present") findings.push("Deformitet");
  if (facts.redness === "present") findings.push("Rødme");
  if (facts.warmth === "present") findings.push("Varmeøgning");
  if (facts.effusion && facts.effusion !== "none-significant") findings.push("Effusion");
  if (facts.extension && facts.extension !== "full") findings.push("Ekstensionsdeficit");
  if (facts.straightLegRaise === "not-intact") findings.push("Straight-leg raise ikke intakt");
  if (facts.tenderness && facts.tenderness !== "none-focal") findings.push("Ledlinjeømhed");
  return [...new Set(findings)];
}

export function buildSituationSentence(state: ClinicalDocumentPrototypeState): string {
  const { facts } = state;
  const side = facts.side ? SIDE_ADJ[facts.side] : null;
  const onset = facts.onset ? ONSET_ADJ[facts.onset] : null;
  const duration = facts.duration?.trim();

  if (!side && !onset && !facts.precipitatingFactor) {
    return `Konsultation om ${CLINICAL_DOCUMENT_CONTEXT.problemLabel.toLocaleLowerCase("da")} — ingen kliniske oplysninger registreret endnu.`;
  }

  const subject = side
    ? `${onset ?? "Klinisk"} ${side} knæproblem`
    : `${onset ?? "Klinisk"} knæproblem`;

  if (facts.precipitatingFactor === "trauma") {
    const mechanisms = (facts.traumaMechanisms ?? []).map((m) => TRAUMA_LABELS[m]);
    const mechanismText = mechanisms.length
      ? ` efter ${joinDanish(mechanisms)}`
      : " efter traume";
    const durationText = duration ? ` (${duration})` : "";
    return `${subject}${mechanismText}${durationText}.`;
  }

  if (facts.precipitatingFactor === "none") {
    const durationText = duration ? ` gennem ${duration}` : "";
    return `${subject} uden identificeret traume${durationText}.`;
  }

  const durationText = duration ? ` · varighed ${duration}` : "";
  return `${subject}${durationText}.`;
}

export function buildHistoryNarrative(state: ClinicalDocumentPrototypeState): NarrativeBlock {
  const { facts } = state;
  const parts: string[] = [];

  if (facts.side || facts.onset || facts.duration?.trim() || facts.precipitatingFactor) {
    parts.push(buildSituationSentence(state).replace(/\.$/, ""));
  }

  const locations = (facts.painLocations ?? []).map((l) => LOCATION_LABELS[l]);
  const patterns = (facts.painPatterns ?? []).map((p) => PATTERN_LABELS[p]);
  if (locations.length || patterns.length) {
    const loc = locations.length ? `lokaliseret ${joinDanish(locations)}` : null;
    const pat = patterns.length ? joinDanish(patterns) : null;
    if (loc && pat) parts.push(`Smerter ${loc}, ${pat}`);
    else if (loc) parts.push(`Smerter ${loc}`);
    else if (pat) parts.push(`Smertemønster ${pat}`);
  }

  if (facts.function === "normal") parts.push("Funktion registreret som normal");
  if (facts.function === "limp") parts.push("Patienten halter");
  if (facts.function === "cannot-four-steps") {
    parts.push("Kan ikke tage fire vægtbærende skridt");
  }

  if (facts.swelling === "none") parts.push("ingen hævelse");
  if (facts.swelling === "delayed-mild") parts.push("let forsinket hævelse");
  if (facts.swelling === "persistent-mild") parts.push("let vedvarende hævelse");
  if (facts.swelling === "marked") parts.push("udtalt hævelse");

  const negatives: string[] = [];
  if (facts.locking === "no") negatives.push("ingen reel aflåsning");
  if (facts.instability === "no") negatives.push("ingen subjektiv instabilitet");
  if (facts.fever === "no") negatives.push("ingen feber");
  if (negatives.length) parts.push(joinDanish(negatives));

  if (facts.locking === "yes") parts.push("reel aflåsning registreret");
  if (facts.instability === "yes") parts.push("subjektiv instabilitet registreret");
  if (facts.fever === "yes") parts.push("feber registreret");

  const sentence = parts.length
    ? `${parts.join(". ").replace(/\.\./g, ".")}.`.replace(/\.+/g, ".").replace(/^\s*\./, "")
    : "Ingen anamnestiske oplysninger registreret. Orientér dig i situationen, før du tilføjer detaljer.";

  return {
    id: "history-situation",
    title: "Anamnese",
    sentence: sentence.charAt(0).toLocaleUpperCase("da") + sentence.slice(1),
    isEmpty: parts.length === 0
  };
}

export function buildObjectiveNarrative(state: ClinicalDocumentPrototypeState): NarrativeBlock {
  const { facts, normalGroup } = state;
  const positives = positiveFindings(facts);

  if (positives.length) {
    return {
      id: "objective-exam",
      title: "Objektivt",
      sentence: `Registrerede fund: ${positives.join(", ")}.`,
      isEmpty: false
    };
  }

  if (normalGroup.confirmed) {
    return {
      id: "objective-exam",
      title: "Objektivt",
      sentence: `Basisundersøgelse eksplicit bekræftet normal (${normalGroup.appliedKeys.length} fund). Undtagelser kan tilføjes.`,
      isEmpty: false
    };
  }

  return {
    id: "objective-exam",
    title: "Objektivt",
    sentence:
      "Ingen objektive fund registreret endnu. Bekræft basisundersøgelse eller registrér afvigelser.",
    isEmpty: true
  };
}

export function buildAssessmentNarrative(state: ClinicalDocumentPrototypeState): NarrativeBlock {
  if (!state.workingDiagnoses.length) {
    return {
      id: "assessment",
      title: "Vurdering",
      sentence:
        "Ingen arbejdshypotese valgt. Forslag er ikke beslutninger — tilføj eksplicit når du vurderer.",
      isEmpty: true
    };
  }
  const labels = state.workingDiagnoses.map((d) => d.label);
  const primary = labels[0];
  const rest = labels.slice(1);
  const sentence = rest.length
    ? `Klinikerens vurdering: ${primary}. Samtidige hypoteser: ${joinDanish(rest)}.`
    : `Klinikerens vurdering: ${primary}.`;
  return { id: "assessment", title: "Vurdering", sentence, isEmpty: false };
}

export function buildPlanNarrative(state: ClinicalDocumentPrototypeState): NarrativeBlock {
  if (!state.planActions.length) {
    return {
      id: "plan",
      title: "Plan",
      sentence: "Ingen planhandlinger registreret.",
      isEmpty: true
    };
  }
  const labels = state.planActions.map((a) => PLAN_LABELS[a]);
  return {
    id: "plan",
    title: "Plan",
    sentence: `Planlagt: ${joinDanish(labels)}.`,
    isEmpty: false
  };
}

export function buildCockpitView(state: ClinicalDocumentPrototypeState): CockpitView {
  const { facts } = state;
  const attention = getPrototypeAttentionPoints(state);
  const gaps: CockpitGap[] = [];

  if (!facts.side) {
    gaps.push({
      id: "gap-side",
      label: "Side ikke registreret",
      focusTarget: "history-situation"
    });
  }
  if (!facts.onset) {
    gaps.push({
      id: "gap-onset",
      label: "Debut ikke registreret",
      focusTarget: "history-situation"
    });
  }
  if (facts.precipitatingFactor === "trauma" && !(facts.traumaMechanisms?.length)) {
    gaps.push({
      id: "gap-trauma-mechanism",
      label: "Traumemekanisme mangler",
      focusTarget: "history-trauma"
    });
  }
  if (!facts.function && state.mode === "quick") {
    gaps.push({
      id: "gap-function",
      label: "Funktion ikke vurderet",
      focusTarget: "history-function"
    });
  }
  if (!state.normalGroup.confirmed && positiveFindings(facts).length === 0) {
    gaps.push({
      id: "gap-exam",
      label: "Objektiv undersøgelse ikke bekræftet",
      focusTarget: "objective-exam"
    });
  }
  if (!state.workingDiagnoses.length && (facts.side || facts.onset)) {
    gaps.push({
      id: "gap-assessment",
      label: "Arbejdshypotese ikke valgt",
      focusTarget: "assessment"
    });
  }
  if (!state.planActions.length && state.workingDiagnoses.length) {
    gaps.push({
      id: "gap-plan",
      label: "Plan ikke registreret",
      focusTarget: "plan"
    });
  }

  return {
    situation: buildSituationSentence(state),
    recorded: positiveFindings(facts),
    gaps,
    attention,
    diagnoses: state.workingDiagnoses.map((d) => d.label),
    planActions: state.planActions.map((a) => PLAN_LABELS[a])
  };
}

export function getFocusElementId(target: FocusTargetId): string {
  return `v2-focus-${target}`;
}

export {
  getPrototypeAttentionPoints,
  getPrototypeSuggestions,
  getReferralDraftFoundations
};
export type { PrototypeAttentionPoint, PrototypeSuggestion, ReferralDraftFoundation };
