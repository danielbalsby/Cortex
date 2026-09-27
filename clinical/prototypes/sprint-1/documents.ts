import { deriveConsultationCompleteness } from "./completeness";
import type {
  DocumentationLevel,
  SprintOneHistory,
  SprintOneObjective,
  SprintOneState
} from "./model";

export interface PrototypeDocument {
  readonly id: "journal" | "imaging" | "physiotherapy";
  readonly title: string;
  readonly text: string;
  readonly missing: readonly string[];
  readonly status: "provisional" | "ready-for-review";
}

const SIDE = { right: "højre knæ", left: "venstre knæ" } as const;
const MECHANISM = {
  twisting: "vridtraume",
  "direct-blow": "direkte traume",
  fall: "faldtraume",
  other: "andet registreret traume"
} as const;
const PAIN = {
  medial: "mediale knæsmerter",
  lateral: "laterale knæsmerter",
  anterior: "forreste knæsmerter",
  posterior: "bageste knæsmerter",
  diffuse: "diffuse knæsmerter"
} as const;

function clean(value: string | undefined): string | undefined {
  const result = value?.trim();
  return result ? result : undefined;
}

function period(value: string): string {
  return /[.!?]$/u.test(value.trim()) ? value.trim() : `${value.trim()}.`;
}

function joinDanish(values: readonly string[]): string {
  if (values.length <= 1) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} og ${values[1]}`;
  return `${values.slice(0, -1).join(", ")} og ${values.at(-1)}`;
}

function historySentences(history: SprintOneHistory): string[] {
  const sentences: string[] = [];
  const opening: string[] = ["34-årig mand"];
  if (history.side) opening.push(`med gener fra ${SIDE[history.side]}`);
  if (history.trauma === "yes") {
    opening.push(
      history.traumaMechanism
        ? `efter ${MECHANISM[history.traumaMechanism]}`
        : "efter registreret traume"
    );
  } else if (history.trauma === "no") {
    opening.push("uden identificeret traume");
  }
  if (history.duration) opening.push(clean(history.duration) ?? "");
  if (opening.length > 1) sentences.push(period(opening.filter(Boolean).join(" ")));

  const symptomParts: string[] = [];
  if (history.painLocation) symptomParts.push(PAIN[history.painLocation]);
  if (history.swelling === "none") symptomParts.push("ingen hævelse");
  if (history.swelling === "mild") symptomParts.push("let hævelse");
  if (history.swelling === "persistent") symptomParts.push("vedvarende hævelse");
  if (history.swelling === "marked") symptomParts.push("udtalt hævelse");
  if (symptomParts.length) sentences.push(period(joinDanish(symptomParts)));

  const functionParts: string[] = [];
  if (history.locking === "no") functionParts.push("patienten oplyser ingen aflåsning");
  if (history.locking === "yes") functionParts.push("patienten oplyser aflåsning");
  if (history.locking === "not-assessed") functionParts.push("aflåsning er ikke vurderet");
  if (history.instability === "no") functionParts.push("patienten oplyser ingen instabilitet");
  if (history.instability === "yes") functionParts.push("patienten oplyser instabilitet");
  if (history.instability === "not-assessed") functionParts.push("instabilitet er ikke vurderet");
  if (history.weightBearing === "normal") functionParts.push("normal belastningsevne");
  if (history.weightBearing === "limp") functionParts.push("haltende belastning");
  if (history.weightBearing === "cannot-four-steps") {
    functionParts.push("kan ikke tage fire vægtbærende skridt");
  }
  if (history.weightBearing === "not-assessed") functionParts.push("belastningsevne er ikke vurderet");
  if (functionParts.length) sentences.push(period(joinDanish(functionParts)));

  const safetyParts: string[] = [];
  if (history.fever === "no") safetyParts.push("ingen feber oplyst");
  if (history.fever === "yes") safetyParts.push("feber oplyst");
  if (history.fever === "not-assessed") safetyParts.push("feber ikke vurderet");
  if (history.systemicIllness === "no") safetyParts.push("ingen almen påvirkning oplyst");
  if (history.systemicIllness === "yes") safetyParts.push("almen påvirkning oplyst");
  if (history.systemicIllness === "not-assessed") safetyParts.push("almen påvirkning ikke vurderet");
  if (history.redHotSwollenJoint === "no") {
    safetyParts.push("rødt, varmt og akut hævet led er afkræftet af klinikeren");
  }
  if (history.redHotSwollenJoint === "yes") {
    safetyParts.push("rødt, varmt og akut hævet led er registreret");
  }
  if (history.redHotSwollenJoint === "not-assessed") {
    safetyParts.push("rødt, varmt og akut hævet led er ikke vurderet");
  }
  if (safetyParts.length) sentences.push(`Safety-vurdering: ${period(joinDanish(safetyParts))}`);
  return sentences;
}

const OBJECTIVE_LABELS: {
  [K in keyof SprintOneObjective]: Record<NonNullable<SprintOneObjective[K]>, string>;
} = {
  gait: {
    normal: "normal gang",
    limp: "haltende gang",
    unable: "kan ikke støtte på benet",
    "not-assessed": "gang ikke vurderet"
  },
  inspection: {
    "no-specific-findings": "inspektion uden særlige fund",
    swelling: "synlig hævelse",
    redness: "rødme ved inspektion",
    deformity: "deformitet ved inspektion",
    "not-assessed": "inspektion ikke udført"
  },
  rangeOfMotion: {
    full: "fuld bevægelighed",
    reduced: "reduceret bevægelighed",
    blocked: "blokeret bevægelighed",
    "not-assessed": "ROM ikke vurderet",
    "not-assessable": "ROM ikke vurderbar"
  },
  effusion: {
    none: "ingen effusion",
    mild: "let effusion",
    moderate: "moderat effusion",
    large: "stor effusion",
    "not-assessed": "effusion ikke vurderet"
  },
  palpation: {
    "no-focal-tenderness": "ingen fokal ømhed ved palpation",
    "medial-joint-line": "ømhed ved mediale ledlinje",
    mcl: "ømhed svarende til MCL",
    bony: "fokal knogleømhed",
    "not-assessed": "palpation ikke udført"
  },
  lachman: {
    negative: "Lachman negativ",
    positive: "Lachman positiv",
    "not-performed": "Lachman ikke udført",
    "not-assessable": "Lachman ikke vurderbar"
  },
  valgus: {
    stable: "stabil ved valgusstresstest",
    lax: "laksitet ved valgusstresstest",
    "painful-no-laxity": "smerte uden laksitet ved valgusstresstest",
    "not-performed": "valgusstresstest ikke udført",
    "not-assessable": "valgusstresstest ikke vurderbar"
  },
  varus: {
    stable: "stabil ved varusstresstest",
    lax: "laksitet ved varusstresstest",
    "painful-no-laxity": "smerte uden laksitet ved varusstresstest",
    "not-performed": "varusstresstest ikke udført",
    "not-assessable": "varusstresstest ikke vurderbar"
  },
  meniscalTest: {
    negative: "målrettet menisktest negativ",
    positive: "målrettet menisktest positiv",
    "not-performed": "menisktest ikke udført",
    "not-assessable": "menisktest ikke vurderbar"
  },
  patella: {
    "no-specific-findings": "patellaundersøgelse uden særlige fund",
    abnormal: "afvigende patellafund",
    "not-performed": "patellaundersøgelse ikke udført",
    "not-assessable": "patellaundersøgelse ikke vurderbar"
  },
  neurovascular: {
    normal: "distal neurovaskulær status normal",
    abnormal: "distal neurovaskulær status afvigende",
    "not-assessed": "distal neurovaskulær status ikke vurderet",
    "not-assessable": "distal neurovaskulær status ikke vurderbar"
  }
};

function objectiveFindings(
  objective: SprintOneObjective,
  includeRoutine: boolean
): string[] {
  const routineValues = new Set(["normal", "no-specific-findings", "full", "none", "negative", "stable"]);
  return (Object.keys(OBJECTIVE_LABELS) as (keyof SprintOneObjective)[])
    .flatMap((key) => {
      const value = objective[key];
      if (!value || (!includeRoutine && routineValues.has(value))) return [];
      const labels = OBJECTIVE_LABELS[key] as Record<string, string>;
      return [labels[value]];
    });
}

function planSentences(state: SprintOneState): string[] {
  const sentences: string[] = [];
  if (clean(state.plan.management)) sentences.push(period(`Plan: ${clean(state.plan.management)!}`));
  if (state.plan.imaging?.modality) {
    sentences.push(
      `${state.plan.imaging.modality === "mri" ? "MR" : "Røntgen"} indgår som eksplicit valgt billeddiagnostisk intention.`
    );
  }
  if (state.plan.physiotherapy) {
    sentences.push(
      clean(state.plan.physiotherapy.purpose)
        ? period(`Fysioterapeutisk vurdering ønskes med formål: ${clean(state.plan.physiotherapy.purpose)!}`)
        : "Fysioterapeutisk vurdering er valgt; formål er endnu ikke registreret."
    );
  }
  if (clean(state.plan.followUp)) sentences.push(period(`Opfølgning: ${clean(state.plan.followUp)!}`));
  if (clean(state.plan.safetyNet)) sentences.push(period(`Safety-net: ${clean(state.plan.safetyNet)!}`));
  return sentences;
}

function journalText(state: SprintOneState, level: DocumentationLevel): string {
  const history = historySentences(state.history);
  const objective = objectiveFindings(state.objective, level !== "short");
  const assessment = clean(state.assessment);
  const plan = planSentences(state);

  if (level === "short") {
    return [
      ...history,
      objective.length ? `Objektivt: ${period(joinDanish(objective))}` : undefined,
      assessment ? period(`Vurdering: ${assessment}`) : undefined,
      ...plan
    ]
      .filter((item): item is string => Boolean(item))
      .join(" ");
  }

  const sections = [
    `Problem\nKnæsmerter`,
    history.length ? `Anamnese\n${history.join(" ")}` : undefined,
    objective.length ? `Objektivt\n${period(joinDanish(objective))}` : undefined,
    assessment ? `Vurdering\n${period(assessment)}` : undefined,
    plan.length ? `Plan\n${plan.join(" ")}` : undefined
  ].filter((item): item is string => Boolean(item));

  if (level === "extended") {
    sections.push(
      "Dokumentationsprofil\nUdvidet prototypeprofil. Teksten bygger fortsat kun på registrerede oplysninger."
    );
  }
  return sections.join("\n\n");
}

export function generateJournal(state: SprintOneState): PrototypeDocument {
  const completeness = deriveConsultationCompleteness(state);
  const missing = completeness.domains
    .filter((item) => item.status !== "recorded")
    .map((item) => `${item.label}: ${item.missing.join(", ")}`);
  return {
    id: "journal",
    title: `${state.documentationLevel === "short" ? "Kort" : state.documentationLevel === "extended" ? "Udvidet" : "Standard"} journaludkast`,
    text: journalText(state, state.documentationLevel),
    missing,
    status: completeness.journalTechnicallyReady ? "ready-for-review" : "provisional"
  };
}

function referralContext(state: SprintOneState): string {
  const history = historySentences(state.history).join(" ");
  const objective = objectiveFindings(state.objective, true);
  return [
    history ? `Relevant anamnese\n${history}` : undefined,
    objective.length ? `Objektive fund\n${period(joinDanish(objective))}` : undefined,
    state.assessment ? `Klinisk vurdering\n${period(state.assessment)}` : undefined
  ]
    .filter((item): item is string => Boolean(item))
    .join("\n\n");
}

export function generateImagingReferral(state: SprintOneState): PrototypeDocument | undefined {
  if (!state.plan.imaging) return undefined;
  const missing = [
    !state.plan.imaging.modality && "Modalitet",
    !clean(state.plan.imaging.indication) && "Indikation",
    !clean(state.plan.imaging.clinicalQuestion) && "Klinisk spørgsmål",
    !clean(state.assessment) && "Klinikerens vurdering"
  ].filter((item): item is string => Boolean(item));
  const text = missing.length
    ? ""
    : [
        `Henvisningsudkast – ${state.plan.imaging.modality === "mri" ? "MR" : "røntgen"}`,
        referralContext(state),
        `Indikation\n${period(clean(state.plan.imaging.indication)!)}`,
        `Klinisk spørgsmål\n${period(clean(state.plan.imaging.clinicalQuestion)!)}`,
        "Ingen afsendelse er foretaget."
      ].join("\n\n");
  return {
    id: "imaging",
    title: "Billeddiagnostisk henvisningsudkast",
    text,
    missing,
    status: missing.length ? "provisional" : "ready-for-review"
  };
}

export function generatePhysiotherapyReferral(
  state: SprintOneState
): PrototypeDocument | undefined {
  if (!state.plan.physiotherapy) return undefined;
  const missing = [
    !clean(state.plan.physiotherapy.purpose) && "Formål",
    !state.history.weightBearing && "Funktion/belastningsevne",
    !clean(state.assessment) && "Klinikerens vurdering"
  ].filter((item): item is string => Boolean(item));
  const text = missing.length
    ? ""
    : [
        "Henvisningsudkast – fysioterapeutisk vurdering",
        referralContext(state),
        `Funktion\n${period(historySentences({ weightBearing: state.history.weightBearing }).join(" "))}`,
        `Formål\n${period(clean(state.plan.physiotherapy.purpose)!)}`,
        "Ingen afsendelse er foretaget."
      ].join("\n\n");
  return {
    id: "physiotherapy",
    title: "Fysioterapihenvisningsudkast",
    text,
    missing,
    status: missing.length ? "provisional" : "ready-for-review"
  };
}

