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
  let suggestions: PrototypeSuggestion[] = [];
  if (facts.precipitatingFactor === "trauma") {
    suggestions = [
      {
        id: "meniscus",
        label: "Meniskrelaterede gener",
        reason: "Traumatisk debut er registreret; relevansen skal vurderes klinisk."
      },
      {
        id: "sprain",
        label: "Knæforstuvning",
        reason: "Akut eller traumatisk debut er registreret."
      },
      {
        id: "ligament",
        label: "Ligamentskade",
        reason: "Traumemekanismen gør målrettet vurdering relevant."
      },
      {
        id: "nonspecific",
        label: "Uspecifikke knæsmerter",
        reason: "Kan vælges, hvis klinikeren ikke kan angive en mere præcis hypotese."
      }
    ];
  } else if (facts.onset === "gradual") {
    suggestions = [
      {
        id: "oa",
        label: "Knæartrose",
        reason: "Gradvis debut er registreret; øvrige fund skal vurderes klinisk."
      },
      {
        id: "meniscus",
        label: "Meniskrelaterede gener",
        reason: "Kan være relevant ved det registrerede symptommønster."
      },
      {
        id: "patellofemoral",
        label: "Patellofemorale smerter",
        reason: "Kan være relevant ved det registrerede symptommønster."
      },
      {
        id: "nonspecific",
        label: "Uspecifikke knæsmerter",
        reason: "Kan vælges, hvis klinikeren ikke kan angive en mere præcis hypotese."
      }
    ];
  }
  return { primary: suggestions.slice(0, 3), additional: suggestions.slice(3) };
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
    if (!imaging.indication) missing.push("Indikation");
    if (!imaging.clinicalQuestion) missing.push("Klinisk spørgsmål");
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
