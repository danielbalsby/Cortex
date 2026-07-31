/**
 * Isolated PSOAP formatter (v3).
 *
 * Produces a five-line P:/S:/O:/A:/P: document from the same state
 * regardless of Quick or Standard mode. Does not depend on
 * `engine/output-engine.ts` — this is an independent, self-contained
 * formatter for the isolated learning-prototype track, borrowing only the
 * textual line-prefix convention already used by the production PSOAP
 * generator.
 *
 * Only explicitly recorded facts and clinician-authored assessment/plan text
 * are rendered. Untouched fields never appear as facts.
 */

import type { PrototypeStateV3, Tenderness } from "./model";

const SIDE_LABELS = { right: "højre", left: "venstre", bilateral: "begge knæ" } as const;
const ONSET_LABELS = {
  acute: "Akut debut",
  gradual: "Gradvis debut",
  recurrent: "Recidiverende forløb",
  unclear: "Uklar debut"
} as const;
const TRAUMA_MECHANISM_LABELS = {
  "twisting-planted-foot": "vrid på fikseret fod",
  "direct-blow": "direkte slag",
  fall: "fald",
  "valgus-force": "valguskraft",
  "varus-force": "varuskraft",
  hyperextension: "hyperekstension",
  "sport-contact": "sport/kontakt",
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
  constant: "konstant",
  intermittent: "intermitterende"
} as const;
const INSPECTION_LABELS = {
  swelling: "hævelse",
  redness: "rødme",
  warmth: "varmeøgning",
  deformity: "deformitet"
} as const;
const JOINT_STATUS_LABELS = { full: "fuld", reduced: "reduceret", blocked: "blokeret" } as const;
const TENDERNESS_LABELS: Record<Tenderness, string> = {
  "none-focal": "Ingen fokal palpationsømhed",
  "medial-joint-line": "Medial ledlinjeømhed ved palpation",
  "lateral-joint-line": "Lateral ledlinjeømhed ved palpation"
};

const NOT_RECORDED = "Ikke registreret";

function joinDanish(values: readonly string[]): string {
  if (values.length <= 1) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} og ${values[1]}`;
  return `${values.slice(0, -1).join(", ")} og ${values.at(-1)}`;
}

function withPeriod(value: string): string {
  const cleaned = value.trim();
  return cleaned && /[.!?]$/u.test(cleaned) ? cleaned : cleaned ? `${cleaned}.` : "";
}

function cleanText(value: string | undefined): string | undefined {
  const cleaned = value?.trim();
  return cleaned ? cleaned : undefined;
}

export function buildProblemLine(state: PrototypeStateV3): string {
  const side = state.facts.side ? SIDE_LABELS[state.facts.side] : undefined;
  return side ? `Problem: Knæsmerte (${side})` : "Problem: Knæsmerte";
}

export function buildSubjectiveText(state: PrototypeStateV3): string {
  const { facts } = state;
  const sentences: string[] = [];

  if (facts.onset) sentences.push(withPeriod(ONSET_LABELS[facts.onset]));
  const duration = cleanText(facts.duration);
  if (duration) sentences.push(withPeriod(`Varighed ${duration}`));

  if (facts.trauma === "yes") {
    const mechanisms = (facts.traumaMechanisms ?? []).map((m) => TRAUMA_MECHANISM_LABELS[m]);
    const note = cleanText(facts.traumaNote);
    if (mechanisms.length) sentences.push(withPeriod(`Traume med ${joinDanish(mechanisms)}`));
    else sentences.push("Traume registreret.");
    if (note) sentences.push(withPeriod(note));
  } else if (facts.trauma === "no") {
    sentences.push("Intet traume.");
  } else if (facts.trauma === "unclear") {
    sentences.push("Traume uklart.");
  }

  const locations = (facts.painLocations ?? []).map((l) => PAIN_LOCATION_LABELS[l]);
  const patterns = (facts.painPatterns ?? []).map((p) => PAIN_PATTERN_LABELS[p]);
  if (locations.length && patterns.length) {
    sentences.push(withPeriod(`Smerter lokaliseret ${joinDanish(locations)}, ${joinDanish(patterns)}`));
  } else if (locations.length) {
    sentences.push(withPeriod(`Smerter lokaliseret ${joinDanish(locations)}`));
  } else if (patterns.length) {
    sentences.push(withPeriod(`Smertemønster ${joinDanish(patterns)}`));
  }

  if (facts.function === "normal") sentences.push("Funktion og gang normale.");
  if (facts.function === "limp") sentences.push("Patienten halter.");
  if (facts.function === "cannot-four-steps") {
    sentences.push("Kan ikke tage fire vægtbærende skridt.");
  }

  if (facts.swelling === "yes") sentences.push("Hævelse registreret.");
  if (facts.swelling === "no") sentences.push("Ingen hævelse.");

  const bundleKeys = ["locking", "instability", "restPain", "nightPain"] as const;
  const allNo = bundleKeys.every((key) => facts[key] === "no");
  if (allNo) {
    sentences.push("Ingen aflåsning, instabilitet, hvile- eller nattesmerter.");
  } else {
    if (facts.locking === "yes") sentences.push("Aflåsning registreret.");
    if (facts.locking === "no") sentences.push("Ingen aflåsning.");
    if (facts.instability === "yes") sentences.push("Instabilitet registreret.");
    if (facts.instability === "no") sentences.push("Ingen instabilitet.");
    if (facts.restPain === "yes") sentences.push("Hvilesmerter registreret.");
    if (facts.restPain === "no") sentences.push("Ingen hvilesmerter.");
    if (facts.nightPain === "yes") sentences.push("Nattesmerter registreret.");
    if (facts.nightPain === "no") sentences.push("Ingen nattesmerter.");
  }

  const redFlagKeys = ["fever", "generalImpact", "hotSwollenKnee"] as const;
  const allRedFlagsNo = redFlagKeys.every((key) => facts[key] === "no");
  const anyRedFlagPositive = redFlagKeys.some((key) => facts[key] === "yes");
  if (allRedFlagsNo && !anyRedFlagPositive) {
    sentences.push("Ingen red flags.");
  } else {
    if (facts.fever === "yes") sentences.push("Feber registreret.");
    if (facts.generalImpact === "yes") sentences.push("Almen påvirkning registreret.");
    if (facts.hotSwollenKnee === "yes") sentences.push("Rødt, varmt og akut hævet knæ registreret.");
  }

  const note = cleanText(facts.subjectiveNote);
  if (note) sentences.push(withPeriod(note));

  return sentences.length ? sentences.join(" ") : NOT_RECORDED;
}

export function buildObjectiveText(state: PrototypeStateV3): string {
  const { facts } = state;
  const sentences: string[] = [];

  if (facts.gait === "normal") sentences.push("Normal gang.");
  if (facts.gait === "limp") sentences.push("Haltende gang.");
  if (facts.gait === "unable") sentences.push("Kan ikke støtte på benet.");

  const inspection = (facts.inspection ?? []).map((f) => INSPECTION_LABELS[f]);
  if (inspection.length) {
    sentences.push(withPeriod(`Inspektion: ${joinDanish(inspection)}`));
  }

  if (facts.rom === "normal") sentences.push("Normal ROM 0–140°.");
  if (facts.rom === "abnormal") {
    if (facts.extension) sentences.push(withPeriod(`${JOINT_STATUS_LABELS[facts.extension]} ekstension`));
    if (facts.flexion) sentences.push(withPeriod(`${JOINT_STATUS_LABELS[facts.flexion]} fleksion`));
    if (!facts.extension && !facts.flexion) sentences.push("Afvigende ROM registreret.");
  }

  if (facts.tenderness) sentences.push(withPeriod(TENDERNESS_LABELS[facts.tenderness]));

  const note = cleanText(facts.objectiveNote);
  if (note) sentences.push(withPeriod(note));

  return sentences.length ? sentences.join(" ") : NOT_RECORDED;
}

export function buildAssessmentText(state: PrototypeStateV3): string {
  const parts: string[] = [];
  const note = cleanText(state.assessmentNote);
  if (note) parts.push(withPeriod(note));
  if (state.workingDiagnoses.length) {
    parts.push(
      withPeriod(`Arbejdshypotese: ${joinDanish(state.workingDiagnoses.map((d) => d.label))}`)
    );
  }
  return parts.length ? parts.join(" ") : NOT_RECORDED;
}

export function buildPlanText(state: PrototypeStateV3): string {
  const sentences: string[] = [];

  if (state.planActions.includes("information")) {
    sentences.push("Patienten informeres om forventet forløb.");
  }
  if (state.planActions.includes("activity")) {
    sentences.push("Aktivitet tilpasses efter symptomer.");
  }
  if (state.planActions.includes("exercise")) {
    sentences.push("Gradueret hjemmetræning anbefales.");
  }
  if (state.planActions.includes("physiotherapy")) {
    sentences.push("Henvisning til fysioterapi.");
  }
  if (state.planActions.includes("imaging")) {
    sentences.push("Billeddiagnostik overvejes.");
  }

  if (state.painMedications.includes("paracetamol")) sentences.push("Paracetamol p.n.");
  if (state.painMedications.includes("nsaid")) {
    sentences.push("Kortvarig NSAID efter kontraindikationsvurdering.");
  }

  if (state.followUpStandardPhrase) {
    sentences.push("Ny klinisk vurdering ved vedvarende gener eller forværring.");
  }

  if (state.safetyNetDiscussed) {
    const note = cleanText(state.safetyNetNote);
    sentences.push(note ? withPeriod(`Safety-net drøftet: ${note}`) : "Safety-net drøftet.");
  }

  return sentences.length ? sentences.join(" ") : NOT_RECORDED;
}

export function formatPsoap(state: PrototypeStateV3): string {
  return [
    `P: ${buildProblemLine(state)}`,
    `S: ${buildSubjectiveText(state)}`,
    `O: ${buildObjectiveText(state)}`,
    `A: ${buildAssessmentText(state)}`,
    `P: ${buildPlanText(state)}`
  ].join("\n");
}

export function hasClinicalContent(state: PrototypeStateV3): boolean {
  return (
    buildSubjectiveText(state) !== NOT_RECORDED ||
    buildObjectiveText(state) !== NOT_RECORDED ||
    buildAssessmentText(state) !== NOT_RECORDED ||
    buildPlanText(state) !== NOT_RECORDED
  );
}
