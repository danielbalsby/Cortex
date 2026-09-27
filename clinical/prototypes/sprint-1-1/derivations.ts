import type { SprintOneOneState } from "./model";

export type DomainId = "history" | "objective" | "safety" | "assessment" | "plan";
export type DomainStatus = "complete" | "partial" | "unresolved";

export interface CompletenessDomain {
  readonly id: DomainId;
  readonly label: string;
  readonly status: DomainStatus;
  readonly missing: readonly string[];
  readonly summary: string;
}

export interface ClinicalAttentionItem {
  readonly id: string;
  readonly question: string;
  readonly rationale: string;
  readonly basis: "missing-information" | "recorded-information";
}

function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function assessed(value: string | undefined): boolean {
  return Boolean(value && !["not-assessed", "not-performed", "not-assessable"].includes(value));
}

function makeDomain(id: DomainId, label: string, total: number, missing: readonly string[]): CompletenessDomain {
  const completed = total - missing.length;
  return {
    id,
    label,
    status: missing.length === 0 ? "complete" : completed > 0 ? "partial" : "unresolved",
    missing,
    summary: missing.length === 0 ? "Belyst i prototypegrundlaget." : completed > 0 ? `${completed} af ${total} sammenligningsområder belyst.` : "Ikke belyst endnu."
  };
}

export function deriveSprintOneOneCompleteness(state: SprintOneOneState) {
  const historyMissing = [
    !state.history.onset && "Debut",
    !hasText(state.history.duration) && "Varighed",
    !state.history.painCourse && "Smerteforløb",
    !state.history.trauma && "Traume",
    state.history.trauma === "yes" && !state.history.traumaMechanism && "Traumemekanisme",
    !state.history.painLocation && "Smerteplacering",
    state.history.provocations.length === 0 && "Smerteprovokation",
    !state.history.function && "Funktionsevne",
    !state.history.swelling && "Hævelse",
    state.history.swelling !== undefined && state.history.swelling !== "none" && !hasText(state.history.swellingTiming) && "Hævelsens tidsforløb",
    !assessed(state.history.locking) && "Aflåsning",
    !assessed(state.history.instability) && "Instabilitet",
    !assessed(state.history.restPain) && "Hvilesmerter",
    !assessed(state.history.nightPain) && "Nattesmerter"
  ].filter((value): value is string => Boolean(value));
  const historyTotal = 12
    + (state.history.trauma === "yes" ? 1 : 0)
    + (state.history.swelling !== undefined && state.history.swelling !== "none" ? 1 : 0);

  const romComplete = state.objective.extensionDegrees !== undefined && state.objective.flexionDegrees !== undefined && !state.objective.rangeNotAssessable;
  const objectiveMissing = [
    !assessed(state.objective.gait) && "Gang",
    !assessed(state.objective.inspection) && "Inspektion",
    !romComplete && "ROM i grader",
    !assessed(state.objective.effusion) && "Effusion",
    !assessed(state.objective.palpationStatus) && "Palpation",
    !assessed(state.objective.lachman) && "Lachman",
    !assessed(state.objective.valgus) && "Valgusstres",
    !assessed(state.objective.varus) && "Varusstres",
    !assessed(state.objective.meniscalTest) && "Menisktest",
    !assessed(state.objective.patella) && "Patellatest",
    !assessed(state.objective.neurovascular) && "Distal neurovaskulær vurdering"
  ].filter((value): value is string => Boolean(value));

  const safetyMissing = [
    !assessed(state.history.fever) && "Feber",
    !assessed(state.history.systemicIllness) && "Almen påvirkning",
    !assessed(state.history.redHotSwollenJoint) && "Rødt, varmt og akut hævet knæ"
  ].filter((value): value is string => Boolean(value));

  const planMissing = [
    !hasText(state.plan.management) && "Plan",
    !hasText(state.plan.followUp) && "Opfølgning",
    !hasText(state.plan.safetyNet) && "Safety-net"
  ].filter((value): value is string => Boolean(value));

  const domains = [
    makeDomain("history", "Anamnese", historyTotal, historyMissing),
    makeDomain("objective", "Objektiv vurdering", 11, objectiveMissing),
    makeDomain("safety", "Røde flag", 3, safetyMissing),
    makeDomain("assessment", "Klinisk vurdering", 1, hasText(state.assessment) ? [] : ["Klinikerens vurdering"]),
    makeDomain("plan", "Plan", 3, planMissing)
  ] as const;

  return {
    domains,
    technicallyReady: domains.every((domain) => domain.status === "complete"),
    firstIncomplete: domains.find((domain) => domain.status !== "complete")?.id,
    disclaimer: "Overblikket orienterer om prototype-dækning. Det afgør ikke, om konsultationen er klinisk tilstrækkelig eller korrekt."
  };
}

export function deriveSprintOneOneAttention(state: SprintOneOneState): readonly ClinicalAttentionItem[] {
  const items: ClinicalAttentionItem[] = [];
  const completeness = deriveSprintOneOneCompleteness(state);
  const safety = completeness.domains.find((domain) => domain.id === "safety");

  if (safety && safety.status !== "complete") {
    items.push({ id: "red-flags", question: "Er relevante røde flag vurderet?", rationale: `Ikke afklaret i prototypen: ${safety.missing.join(", ")}.`, basis: "missing-information" });
  }
  if (state.history.swelling && state.history.swelling !== "none" && !hasText(state.history.swellingTiming)) {
    items.push({ id: "swelling-course", question: "Er hævelsens tidsforløb afklaret?", rationale: "Hævelse er angivet, men tidspunkt og udvikling er ikke beskrevet.", basis: "missing-information" });
  }
  if (state.plan.imagingIntent) {
    items.push({ id: "imaging-purpose", question: "Vil billeddiagnostik ændre håndteringen?", rationale: `${state.plan.imagingModality === "mri" ? "MR" : state.plan.imagingModality === "x-ray" ? "Røntgen" : "Billeddiagnostik"} er valgt som klinikerens intention; Cortex vurderer ikke indikationen.`, basis: "recorded-information" });
  }
  if (state.history.redHotSwollenJoint === "yes" || state.history.fever === "yes" || state.history.systemicIllness === "yes") {
    items.push({ id: "explicit-safety-finding", question: "Hvordan indgår det registrerede safety-relevante fund i vurderingen?", rationale: "Mindst ét eksplicit safety-relevant anamnestisk fund er angivet. Cortex træffer ingen konklusion.", basis: "recorded-information" });
  }
  return items;
}
