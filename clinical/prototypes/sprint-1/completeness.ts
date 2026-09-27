import type { SprintOneState } from "./model";

export type CompletenessStatus = "recorded" | "partial" | "unresolved";
export type CompletenessDomainId =
  | "problem"
  | "history"
  | "objective"
  | "safety"
  | "assessment"
  | "plan";

export interface CompletenessDomain {
  readonly id: CompletenessDomainId;
  readonly label: string;
  readonly status: CompletenessStatus;
  readonly summary: string;
  readonly missing: readonly string[];
}

export interface ConsultationCompleteness {
  readonly domains: readonly CompletenessDomain[];
  readonly journalTechnicallyReady: boolean;
  readonly firstIncompleteDomain?: CompletenessDomainId;
  readonly disclaimer: string;
}

function domain(
  id: CompletenessDomainId,
  label: string,
  total: number,
  missing: readonly string[]
): CompletenessDomain {
  const completed = total - missing.length;
  return {
    id,
    label,
    status: missing.length === 0 ? "recorded" : completed > 0 ? "partial" : "unresolved",
    summary:
      missing.length === 0
        ? "De definerede prototypeområder er registreret."
        : completed > 0
          ? `${completed} af ${total} prototypeområder er registreret.`
          : "Området er ikke vurderet i prototypen.",
    missing
  };
}

function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function isExplicitAssessment(value: string | undefined): boolean {
  return Boolean(value && !["not-assessed", "not-performed", "not-assessable"].includes(value));
}

export function deriveConsultationCompleteness(
  state: SprintOneState
): ConsultationCompleteness {
  const historyMissing = [
    !state.history.trauma && "Traume ja/nej",
    state.history.trauma === "yes" && !state.history.traumaMechanism && "Traumemekanisme",
    !state.history.painLocation && "Smerteplacering",
    !state.history.swelling && "Hævelse",
    !isExplicitAssessment(state.history.locking) && "Aflåsning",
    !isExplicitAssessment(state.history.instability) && "Instabilitet",
    !isExplicitAssessment(state.history.weightBearing) && "Belastningsevne"
  ].filter((item): item is string => Boolean(item));
  const historyTotal = state.history.trauma === "yes" ? 7 : 6;

  const objectiveMissing = [
    !isExplicitAssessment(state.objective.gait) && "Gang",
    !isExplicitAssessment(state.objective.inspection) && "Inspektion",
    !isExplicitAssessment(state.objective.rangeOfMotion) && "ROM",
    !isExplicitAssessment(state.objective.effusion) && "Effusion",
    !isExplicitAssessment(state.objective.palpation) && "Palpation",
    !isExplicitAssessment(state.objective.lachman) && "Lachman",
    !isExplicitAssessment(state.objective.valgus) && "Valgusstabilitet",
    !isExplicitAssessment(state.objective.varus) && "Varusstabilitet",
    !isExplicitAssessment(state.objective.meniscalTest) && "Menisktest",
    !isExplicitAssessment(state.objective.patella) && "Patella",
    !isExplicitAssessment(state.objective.neurovascular) && "Distal neurovaskulær vurdering"
  ].filter((item): item is string => Boolean(item));

  const safetyMissing = [
    !isExplicitAssessment(state.history.fever) && "Feber",
    !isExplicitAssessment(state.history.systemicIllness) && "Almen påvirkning",
    !isExplicitAssessment(state.history.redHotSwollenJoint) && "Rødt, varmt og hævet led"
  ].filter((item): item is string => Boolean(item));

  const planMissing = [
    !hasText(state.plan.management) && "Plan",
    !hasText(state.plan.followUp) && "Opfølgning",
    !hasText(state.plan.safetyNet) && "Safety-net"
  ].filter((item): item is string => Boolean(item));

  const domains: readonly CompletenessDomain[] = [
    {
      id: "problem",
      label: "Problem",
      status: "recorded",
      summary: "Højre knæsmerter efter vridtraume (syntetisk kildekontekst).",
      missing: []
    },
    domain("history", "Anamnese", historyTotal, historyMissing),
    domain("objective", "Objektiv vurdering", 11, objectiveMissing),
    domain("safety", "Safety-vurdering", 3, safetyMissing),
    domain(
      "assessment",
      "Klinisk vurdering",
      1,
      hasText(state.assessment) ? [] : ["Klinikerens vurdering"]
    ),
    domain("plan", "Plan", 3, planMissing)
  ];

  return {
    domains,
    journalTechnicallyReady: domains.every((item) => item.status === "recorded"),
    firstIncompleteDomain: domains.find((item) => item.status !== "recorded")?.id,
    disclaimer:
      "Overblikket viser kun teknisk prototype-dækning. Det er ikke klinisk godkendelse eller dokumentation for, at vurderingen er korrekt."
  };
}
