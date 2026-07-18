import {
  CLINICAL_DOCUMENT_CONTEXT,
  type ClinicalDocumentPrototypeState,
  type ImagingAction,
  type ImagingPlan,
  type ImagingStatus,
  type PlanAction,
  type PrototypeFacts,
  type WorkingDiagnosis
} from "./model";

export interface JournalSection {
  readonly id: "problem" | "history" | "objective" | "assessment" | "plan";
  readonly text: string;
}

export interface JournalDraftOverride {
  readonly text: string;
  readonly sourceJournal: string;
}

export interface ResolvedJournalDraft {
  readonly text: string;
  readonly isOverridden: boolean;
  readonly isStale: boolean;
}

const SECTION_HEADINGS: Record<Exclude<JournalSection["id"], "problem">, string> = {
  history: "Anamnese",
  objective: "Objektivt",
  assessment: "Vurdering",
  plan: "Plan"
};

const SIDE_ADJECTIVES = {
  right: "Højresidige",
  left: "Venstresidige",
  bilateral: "Bilaterale"
} as const;

const SIDE_PHRASES = {
  right: "højre knæ",
  left: "venstre knæ",
  bilateral: "begge knæ"
} as const;

const ONSET_PHRASES = {
  acute: "akut debut",
  gradual: "gradvis debut",
  recurrent: "recidiverende forløb",
  unclear: "uklar debut",
  other: "anden registreret debut"
} as const;

const TRAUMA_MECHANISM_LABELS = {
  "twisting-planted-foot": "vrid på fikseret fod",
  "direct-blow": "direkte slag",
  fall: "fald",
  "valgus-force": "valguskraft",
  "varus-force": "varuskraft",
  hyperextension: "hyperekstension",
  "forced-flexion": "tvungen fleksion",
  "patellar-displacement": "patellaforskydning",
  "sport-contact": "sport/kontakthændelse",
  traffic: "trafikhændelse",
  unclear: "uklar mekanisme",
  other: "anden mekanisme"
} as const;

const PAIN_LOCATION_LABELS = {
  medial: "medialt",
  lateral: "lateralt",
  anterior: "fortil",
  posterior: "bagtil",
  diffuse: "diffust"
} as const;

const PAIN_PATTERN_LABELS = {
  "load-related": "belastningsrelateret",
  "start-up": "ved igangsætning",
  stairs: "ved trapper",
  rest: "i hvile",
  night: "om natten",
  constant: "konstant",
  intermittent: "intermitterende",
  other: "med andet registreret mønster"
} as const;

const IMAGING_MODALITY_LABELS = {
  "acute-x-ray": "Akut røntgen",
  "standing-weight-bearing-x-ray": "Stående belastet røntgen",
  mri: "MR-skanning",
  ultrasound: "Ultralyd",
  other: "Anden billeddiagnostisk undersøgelse"
} as const;

const PLAN_OUTPUT_ORDER: readonly PlanAction[] = [
  "information",
  "activity",
  "exercise",
  "physiotherapy",
  "imaging",
  "follow-up",
  "safety-net"
];

function cleanText(value: string | undefined): string | undefined {
  const cleaned = value?.trim();
  return cleaned ? cleaned : undefined;
}

function stripTerminalPunctuation(value: string): string {
  return value.replace(/[.!?]+$/u, "");
}

function withPeriod(value: string): string {
  const cleaned = value.trim();
  return /[.!?]$/u.test(cleaned) ? cleaned : `${cleaned}.`;
}

function capitalise(value: string): string {
  return value.charAt(0).toLocaleUpperCase("da") + value.slice(1);
}

function joinDanish(values: readonly string[]): string {
  if (values.length <= 1) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} og ${values[1]}`;
  return `${values.slice(0, -1).join(", ")} og ${values.at(-1)}`;
}

function durationPhrase(duration: string): string {
  const cleaned = stripTerminalPunctuation(duration);
  return /^(siden|gennem|over|i)\b/iu.test(cleaned) ? cleaned : `gennem ${cleaned}`;
}

function buildHistory(state: ClinicalDocumentPrototypeState): JournalSection | undefined {
  const { facts } = state;
  const sentences: string[] = [];
  const duration = cleanText(facts.duration);

  if (facts.side || facts.onset || duration) {
    const subject = facts.side ? `${SIDE_ADJECTIVES[facts.side]} knæsmerter` : "Knæsmerter";
    const course = [
      facts.onset ? `med ${ONSET_PHRASES[facts.onset]}` : undefined,
      duration ? durationPhrase(duration) : undefined
    ].filter((item): item is string => Boolean(item));
    sentences.push(withPeriod([subject, ...course].join(" ")));
  }

  if (facts.precipitatingFactor === "trauma") {
    const mechanisms = (facts.traumaMechanisms ?? []).map(
      (mechanism) => TRAUMA_MECHANISM_LABELS[mechanism]
    );
    sentences.push(
      mechanisms.length
        ? `Traume registreret med ${joinDanish(mechanisms)}.`
        : "Traume registreret."
    );
    const traumaNote = cleanText(facts.traumaMechanismNote);
    if (traumaNote) sentences.push(withPeriod(`Supplerende traumebeskrivelse: ${traumaNote}`));
  } else if (facts.precipitatingFactor === "none") {
    sentences.push("Intet identificeret traume.");
  } else if (facts.precipitatingFactor === "unclear") {
    sentences.push("Udløsende faktor er uklar.");
  }

  const painLocations = (facts.painLocations ?? []).map(
    (location) => PAIN_LOCATION_LABELS[location]
  );
  if (painLocations.length) {
    sentences.push(`Smerterne er lokaliseret ${joinDanish(painLocations)}.`);
  }
  const painPatterns = (facts.painPatterns ?? []).map(
    (pattern) => PAIN_PATTERN_LABELS[pattern]
  );
  if (painPatterns.length) {
    sentences.push(`Smertemønstret er ${joinDanish(painPatterns)}.`);
  }

  if (facts.function === "normal") sentences.push("Funktion og gang er registreret som normale.");
  if (facts.function === "limp") sentences.push("Patienten halter.");
  if (facts.function === "cannot-four-steps") {
    sentences.push("Patienten kan ikke tage fire vægtbærende skridt.");
  }

  if (facts.swelling === "none") sentences.push("Ingen hævelse.");
  if (facts.swelling === "delayed-mild") sentences.push("Let hævelse opstod forsinket.");
  if (facts.swelling === "persistent-mild") sentences.push("Let vedvarende hævelse.");
  if (facts.swelling === "marked") sentences.push("Udtalt hævelse.");

  const negatives: string[] = [];
  if (facts.locking === "no") negatives.push("ingen reel aflåsning");
  if (facts.instability === "no") negatives.push("ingen subjektiv instabilitet");
  if (facts.fever === "no") negatives.push("ingen feber");
  if (negatives.length) {
    sentences.push(`Registrerede relevante negative fund: ${joinDanish(negatives)}.`);
  }
  if (facts.locking === "yes") sentences.push("Reel aflåsning er registreret.");
  if (facts.instability === "yes") sentences.push("Subjektiv instabilitet er registreret.");
  if (facts.fever === "yes") sentences.push("Feber er registreret.");

  const historyNote = cleanText(facts.historyNote);
  if (historyNote) sentences.push(withPeriod(historyNote));

  return sentences.length ? { id: "history", text: sentences.join(" ") } : undefined;
}

function buildObjective(state: ClinicalDocumentPrototypeState): JournalSection | undefined {
  const { facts } = state;
  const findings: string[] = [];

  if (facts.generalCondition === "unaffected") findings.push("upåvirket almentilstand");
  if (facts.generalCondition === "mildly-affected") findings.push("let påvirket almentilstand");
  if (facts.generalCondition === "clearly-affected") findings.push("tydeligt påvirket almentilstand");
  if (facts.gait === "normal") findings.push("normal gang");
  if (facts.gait === "limp") findings.push("haltende gang");
  if (facts.gait === "unable") findings.push("kan ikke støtte på benet");
  if (facts.deformity === "none") findings.push("ingen deformitet");
  if (facts.deformity === "present") findings.push("deformitet");
  if (facts.redness === "none") findings.push("ingen rødme");
  if (facts.redness === "present") findings.push("rødme");
  if (facts.warmth === "none") findings.push("ingen varmeøgning");
  if (facts.warmth === "present") findings.push("varmeøgning");
  if (facts.effusion === "none-significant") findings.push("ingen betydende effusion");
  if (facts.effusion === "mild") findings.push("let effusion");
  if (facts.effusion === "moderate") findings.push("moderat effusion");
  if (facts.effusion === "large") findings.push("stor eller spændt effusion");
  if (facts.extension === "full") findings.push("fuld ekstension");
  if (facts.extension === "reduced") findings.push("reduceret ekstension");
  if (facts.extension === "blocked") findings.push("mekanisk blokeret ekstension");
  if (facts.straightLegRaise === "intact") findings.push("intakt straight-leg raise");
  if (facts.straightLegRaise === "not-intact") findings.push("straight-leg raise er ikke intakt");
  if (facts.tenderness === "none-focal") findings.push("ingen fokal ledlinjeømhed");
  if (facts.tenderness === "medial-joint-line") findings.push("medial ledlinjeømhed");
  if (facts.tenderness === "lateral-joint-line") findings.push("lateral ledlinjeømhed");

  const sentences = findings.length ? [withPeriod(capitalise(joinDanish(findings)))] : [];
  const objectiveNote = cleanText(facts.objectiveNote);
  if (objectiveNote) sentences.push(withPeriod(objectiveNote));

  return sentences.length ? { id: "objective", text: sentences.join(" ") } : undefined;
}

function diagnosisText(diagnosis: WorkingDiagnosis): string {
  const qualifier = cleanText(diagnosis.qualifier);
  return qualifier ? `${diagnosis.label} (${qualifier})` : diagnosis.label;
}

function buildAssessment(state: ClinicalDocumentPrototypeState): JournalSection | undefined {
  if (!state.workingDiagnoses.length) return undefined;
  const [primary, ...concurrent] = state.workingDiagnoses.map(diagnosisText);
  const sentences = [`Primær arbejdshypotese: ${primary}.`];
  if (concurrent.length) {
    sentences.push(`Samtidige arbejdshypoteser: ${joinDanish(concurrent)}.`);
  }
  return { id: "assessment", text: sentences.join(" ") };
}

function hasCompletePlannedImaging(imaging: ImagingPlan): boolean {
  return Boolean(
    imaging.modality &&
      imaging.side &&
      cleanText(imaging.indication) &&
      cleanText(imaging.clinicalQuestion)
  );
}

function buildPlannedImagingSentence(imaging: ImagingPlan, action: ImagingAction): string | undefined {
  if (!hasCompletePlannedImaging(imaging) || !imaging.modality || !imaging.side) {
    return undefined;
  }
  const indication = stripTerminalPunctuation(cleanText(imaging.indication) ?? "");
  const question = stripTerminalPunctuation(cleanText(imaging.clinicalQuestion) ?? "");
  const base = `${IMAGING_MODALITY_LABELS[imaging.modality]} af ${SIDE_PHRASES[imaging.side]} planlægges på grund af ${indication} med spørgsmål om ${question}.`;
  if (action === "prepare-referral") return `${base} Henvisning forberedes.`;
  if (action === "reassess-before-decision") return `${base} Beslutningen revurderes før handling.`;
  if (action === "other") return `${base} Anden handling er registreret uden yderligere tekst.`;
  return undefined;
}

function buildOrderedImagingSentence(imaging: ImagingPlan, action: ImagingAction): string | undefined {
  if (!hasCompletePlannedImaging(imaging) || !imaging.modality || !imaging.side) {
    return undefined;
  }
  const indication = stripTerminalPunctuation(cleanText(imaging.indication) ?? "");
  const question = stripTerminalPunctuation(cleanText(imaging.clinicalQuestion) ?? "");
  const base = `${IMAGING_MODALITY_LABELS[imaging.modality]} af ${SIDE_PHRASES[imaging.side]} er registreret med indikation ${indication} og spørgsmål om ${question}.`;
  if (action === "send-referral") {
    return `${base} Bestilling eller henvisning er kun registreret som demotilstand; prototypen har ikke sendt noget eksternt.`;
  }
  if (action === "other") return `${base} Anden handling er registreret uden yderligere tekst.`;
  return undefined;
}

function buildImagingSentence(imaging: ImagingPlan | undefined): string | undefined {
  const status: ImagingStatus | undefined = imaging?.status;
  const action: ImagingAction | undefined = imaging?.plannedAction;
  if (!imaging || !status || !action) return undefined;

  if (status === "not-indicated-now" && action === "no-imaging-now") {
    return "Billeddiagnostik er ikke planlagt aktuelt.";
  }
  if (status === "planned") return buildPlannedImagingSentence(imaging, action);
  if (status === "ordered-or-referred") return buildOrderedImagingSentence(imaging, action);
  if (status === "completed-known" && action === "review-existing-result") {
    return "Billeddiagnostik er registreret som udført med kendt svar. Det eksisterende svar planlægges gennemgået.";
  }
  if (status === "deferred" && action === "reassess-before-decision") {
    return "Billeddiagnostik er udskudt og revurderes før beslutning.";
  }
  if (status === "unclear" && action === "reassess-before-decision") {
    return "Billeddiagnostisk status er uklar og skal afklares før beslutning.";
  }
  return undefined;
}

function buildPlan(state: ClinicalDocumentPrototypeState): JournalSection | undefined {
  const sentences: string[] = [];
  for (const action of PLAN_OUTPUT_ORDER) {
    if (!state.planActions.includes(action)) continue;
    if (action === "information") sentences.push("Information er givet.");
    if (action === "activity") sentences.push("Aktivitetstilpasning er aftalt.");
    if (action === "exercise") sentences.push("Gradueret træning er planlagt.");
    if (action === "physiotherapy") sentences.push("Henvisning til fysioterapi er planlagt.");
    if (action === "imaging") {
      const imagingSentence = buildImagingSentence(state.imaging);
      if (imagingSentence) sentences.push(imagingSentence);
    }
    if (action === "follow-up") {
      const followUp = cleanText(state.facts.followUp);
      sentences.push(followUp ? withPeriod(`Opfølgning ${followUp}`) : "Opfølgning er planlagt.");
    }
    if (action === "safety-net") {
      const safetyNet = cleanText(state.facts.safetyNet);
      sentences.push(
        safetyNet ? withPeriod(`Safety-netting: ${safetyNet}`) : "Safety-netting er planlagt."
      );
    }
  }
  return sentences.length ? { id: "plan", text: sentences.join(" ") } : undefined;
}

export function buildJournalSections(
  state: ClinicalDocumentPrototypeState
): readonly JournalSection[] {
  const clinicalSections = [
    buildHistory(state),
    buildObjective(state),
    buildAssessment(state),
    buildPlan(state)
  ].filter((section): section is JournalSection => Boolean(section));

  return [
    {
      id: "problem",
      text: `Problem: ${CLINICAL_DOCUMENT_CONTEXT.problemLabel}`
    },
    ...clinicalSections
  ];
}

export function formatJournalSections(sections: readonly JournalSection[]): string {
  return sections
    .map((section) =>
      section.id === "problem" ? section.text : `${SECTION_HEADINGS[section.id]}\n${section.text}`
    )
    .join("\n\n");
}

export function generatePrototypeJournal(state: ClinicalDocumentPrototypeState): string {
  return formatJournalSections(buildJournalSections(state));
}

export function createJournalDraftOverride(
  sourceJournal: string,
  text: string = sourceJournal
): JournalDraftOverride {
  return { sourceJournal, text };
}

export function resolveJournalDraft(
  generatedJournal: string,
  override: JournalDraftOverride | undefined
): ResolvedJournalDraft {
  if (!override) {
    return { text: generatedJournal, isOverridden: false, isStale: false };
  }
  return {
    text: override.text,
    isOverridden: true,
    isStale: override.sourceJournal !== generatedJournal
  };
}

export function hasJournalClinicalContent(sections: readonly JournalSection[]): boolean {
  return sections.some((section) => section.id !== "problem");
}
