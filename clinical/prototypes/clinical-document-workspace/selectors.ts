import {
  type ClinicalDocumentPrototypeState,
  type ImagingPlan,
  type NormalFindingDefinition,
  type PlanAction,
  type PrototypeFacts
} from "./model";

export interface ClinicalOverviewItem {
  readonly id: "positive-findings" | "attention-points" | "diagnoses" | "plan-actions";
  readonly label: string;
  readonly value: string;
}

export interface PrototypeSuggestion {
  readonly id: string;
  readonly label: string;
  readonly reason: string;
}

export interface PrototypeAttentionPoint {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
}

const PLAN_LABELS: Record<PlanAction, string> = {
  information: "Information",
  activity: "Aktivitetstilpasning",
  exercise: "Gradueret træning",
  physiotherapy: "Fysioterapi",
  imaging: "Billeddiagnostik",
  "follow-up": "Opfølgning",
  "safety-net": "Safety-netting"
};

const SIDE_LABELS = { right: "højre", left: "venstre", bilateral: "begge knæ" } as const;
const ONSET_LABELS = {
  acute: "akut debut",
  gradual: "gradvis debut",
  recurrent: "recidiverende forløb",
  unclear: "uklar debut",
  other: "anden debut"
} as const;
const IMAGING_STATUS_LABELS = {
  "not-indicated-now": "billeddiagnostik ikke indiceret aktuelt",
  planned: "billeddiagnostik planlagt",
  "ordered-or-referred": "billeddiagnostik bestilt eller henvist",
  "completed-known": "billeddiagnostik udført med kendt svar",
  deferred: "billeddiagnostik udskudt",
  unclear: "billeddiagnostisk status uklar"
} as const;

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

export function getPrototypeAttentionPoints(
  state: ClinicalDocumentPrototypeState
): readonly PrototypeAttentionPoint[] {
  const { facts } = state;
  const points: PrototypeAttentionPoint[] = [];
  if (facts.precipitatingFactor === "trauma" && facts.function === "cannot-four-steps") {
    points.push({
      id: "fracture-screening",
      title: "Afklar frakturscreening",
      detail:
        "Traume og manglende evne til fire vægtbærende skridt er registreret. Prototypen træffer ingen billeddiagnostisk beslutning."
    });
  }
  if (facts.locking === "yes") {
    points.push({
      id: "locking",
      title: "Afklar reel aflåsning",
      detail: "Reel aflåsning er registreret og kræver klinisk vurdering."
    });
  }
  if (facts.fever === "yes" && (facts.redness === "present" || facts.warmth === "present")) {
    points.push({
      id: "infection",
      title: "Infektiøs årsag skal overvejes",
      detail:
        "Feber sammen med rødme eller varme er registreret. Prototypen erstatter ikke akut klinisk vurdering."
    });
  }
  return points;
}

export function getPrototypeSuggestions(
  state: ClinicalDocumentPrototypeState
): { readonly primary: readonly PrototypeSuggestion[]; readonly additional: readonly PrototypeSuggestion[] } {
  const { facts } = state;
  const suggestions: PrototypeSuggestion[] = [];
  const hasJointLineSupport =
    facts.painLocations?.some((location) => location === "medial" || location === "lateral") ||
    facts.tenderness === "medial-joint-line" ||
    facts.tenderness === "lateral-joint-line";
  const hasMechanicalPainPattern = facts.painPatterns?.some((pattern) =>
    ["load-related", "start-up", "stairs"].includes(pattern)
  );

  if (facts.precipitatingFactor === "trauma" && facts.onset === "acute") {
    suggestions.push(
      {
        id: "sprain",
        label: "Knæforstuvning",
        reason: "2 af 2 definerede støttefund registreret: traume og akut debut. Mulighed – ikke konklusion."
      }
    );
  }
  if (
    facts.precipitatingFactor === "trauma" &&
    Boolean(hasJointLineSupport) &&
    (facts.traumaMechanisms?.includes("twisting-planted-foot") || facts.locking === "yes")
  ) {
    suggestions.push(
      {
        id: "meniscus",
        label: "Meniskrelaterede gener",
        reason: "3 definerede støttekategorier er registreret: traume, ledlinjerelation og mekanisk symptom eller vrid. Mulighed – ikke konklusion."
      }
    );
  }
  if (
    facts.precipitatingFactor === "trauma" &&
    (facts.instability === "yes" ||
      facts.traumaMechanisms?.some((mechanism) =>
        ["valgus-force", "varus-force", "hyperextension"].includes(mechanism)
      ))
  ) {
    suggestions.push(
      {
        id: "ligament",
        label: "Ligamentskade",
        reason: "2 definerede støttekategorier er registreret: traume og instabilitet eller relevant mekanisme. Mulighed – ikke konklusion."
      }
    );
  }
  if (facts.onset === "gradual" && facts.duration?.trim() && hasMechanicalPainPattern) {
    suggestions.push(
      {
        id: "oa",
        label: "Knæartrose",
        reason: "3 af 3 definerede støttekategorier er registreret: gradvis debut, varighed og mekanisk smertemønster. Mulighed – ikke konklusion."
      }
    );
  }
  if (facts.painLocations?.includes("anterior") && facts.painPatterns?.includes("stairs")) {
    suggestions.push(
      {
        id: "patellofemoral",
        label: "Patellofemorale smerter",
        reason: "2 af 2 definerede støttefund registreret: forreste smerter og trappeprovokation. Mulighed – ikke konklusion."
      }
    );
  }
  if (facts.side && facts.onset && facts.duration?.trim()) {
    suggestions.push(
      {
        id: "nonspecific",
        label: "Uspecifikke knæsmerter",
        reason: "Side, debut og varighed er registreret. Muligheden kræver fortsat klinikerens vurdering."
      }
    );
  }
  return { primary: suggestions.slice(0, 3), additional: suggestions.slice(3) };
}

export function getHistoryContext(state: ClinicalDocumentPrototypeState): string {
  const { facts } = state;
  const details: string[] = [];
  if (facts.side) details.push(`Gener fra ${SIDE_LABELS[facts.side]}`);
  if (facts.onset) details.push(ONSET_LABELS[facts.onset]);
  if (facts.duration?.trim()) details.push(`varighed: ${facts.duration.trim()}`);
  if (facts.precipitatingFactor === "trauma") details.push("traume registreret");
  if (facts.precipitatingFactor === "none") details.push("intet identificeret traume");
  if (facts.function === "limp") details.push("halten");
  if (facts.function === "cannot-four-steps") details.push("kan ikke tage fire skridt");
  return details.length ? `${details.join(" · ")}.` : "Ingen anamnestiske oplysninger registreret.";
}

export function getObjectiveContext(state: ClinicalDocumentPrototypeState): string {
  const positives = positiveFindings(state.facts);
  if (positives.length) return `Registrerede fund: ${positives.join(", ")}.`;
  if (state.normalGroup.confirmed) {
    return `${state.normalGroup.appliedKeys.length} urørte basisfund er eksplicit bekræftet som normale.`;
  }
  return "Ingen objektive fund registreret.";
}

export function getAssessmentContext(state: ClinicalDocumentPrototypeState): string {
  const diagnoses = state.workingDiagnoses.map((diagnosis) => diagnosis.label);
  return diagnoses.length
    ? `Valgte arbejdshypoteser: ${diagnoses.join(" · ")}.`
    : "Ingen arbejdshypoteser registreret.";
}

export function getPlanContext(state: ClinicalDocumentPrototypeState): string {
  const details = state.planActions.map((action) => PLAN_LABELS[action]);
  if (state.imaging?.status) details.push(IMAGING_STATUS_LABELS[state.imaging.status]);
  return details.length
    ? `Registreret plan: ${details.join(", ")}.`
    : "Ingen planhandlinger registreret.";
}

export function getNormalFindingStatus(
  state: ClinicalDocumentPrototypeState,
  finding: NormalFindingDefinition
): "untouched" | "confirmed" | "overridden" | "recorded-independently" {
  const current = state.facts[finding.key];
  if (current === undefined) return "untouched";
  if (state.normalGroup.appliedKeys.includes(finding.key)) return "confirmed";
  return current === finding.normalValue ? "recorded-independently" : "overridden";
}

export function getImagingMissingInformation(imaging: ImagingPlan | undefined): readonly string[] {
  if (!imaging) return ["Status", "Planlagt handling"];
  const missing: string[] = [];
  if (!imaging.status) missing.push("Status");
  if (!imaging.plannedAction) missing.push("Planlagt handling");
  if (imaging.status === "planned" || imaging.status === "ordered-or-referred") {
    if (!imaging.modality) missing.push("Modalitet");
    if (!imaging.side) missing.push("Side");
    if (!imaging.indication?.trim()) missing.push("Indikation");
    if (!imaging.clinicalQuestion?.trim()) missing.push("Klinisk spørgsmål");
  }
  return missing;
}

export function getClinicalOverview(
  state: ClinicalDocumentPrototypeState
): readonly ClinicalOverviewItem[] {
  const positives = positiveFindings(state.facts);
  const attention = getPrototypeAttentionPoints(state);
  const diagnoses = state.workingDiagnoses.map((item) => item.label);
  const plans = state.planActions.map((item) => PLAN_LABELS[item]);
  return [
    {
      id: "positive-findings",
      label: "Positive fund",
      value: positives.length ? positives.join(", ") : "Ikke registreret"
    },
    {
      id: "attention-points",
      label: "Opmærksomhedspunkter",
      value: attention.length ? attention.map((item) => item.title).join(", ") : "Ikke vurderet"
    },
    {
      id: "diagnoses",
      label: "Arbejdshypoteser",
      value: diagnoses.length ? diagnoses.join(" · ") : "Ikke registreret"
    },
    {
      id: "plan-actions",
      label: "Planlagte handlinger",
      value: plans.length ? plans.join(", ") : "Ikke registreret"
    }
  ];
}
