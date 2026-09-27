import type { C3DocumentProfile } from "@/clinical/prototypes/c3/model";
import {
  isC32CopyReadyPsoap,
  projectC32PsoapDocument
} from "@/clinical/prototypes/c3-2/projections";

import { isC33UnfinishedAnalysisDraft } from "./analysis-draft";
import {
  C33_ACCOMPANYING_SYMPTOMS,
  C33_COMORBIDITY_CHIPS,
  C33_MEDICATION_CHIPS,
  C33_RED_FLAGS_NORMAL_TEXT,
  C33_RED_FLAG_GROUPS
} from "./fixtures";
import type { C33State } from "./model";
import { hasC33RedFlagsNormal, hasC33TestsNormalBatch } from "./state";

function sentenceCase(value: string): string {
  return value
    ? `${value[0].toLocaleUpperCase("da-DK")}${value.slice(1)}`
    : value;
}

function inspectionClause(state: C33State): string {
  if (state.c32.inspection.status === "no-specific-findings") {
    return "ingen særlige inspektionsfund";
  }
  const labels = state.c32.inspection.findings.map((finding) =>
    finding === "swelling"
      ? "synlig hævelse"
      : finding === "redness"
        ? "rødme"
        : "deformitet"
  );
  if (labels.length < 2) return labels[0] ?? "";
  return `${labels.slice(0, -1).join(", ")} og ${labels.at(-1)}`;
}

function removeC32InspectionSentence(text: string, state: C33State): string {
  const clause = inspectionClause(state);
  if (!clause) return text;
  const sentence = `${sentenceCase(clause)}.`;
  return text.endsWith(` ${sentence}`)
    ? text.slice(0, -(sentence.length + 1))
    : text;
}

function integrateInspection(text: string, state: C33State): string {
  const clause = inspectionClause(state);
  if (!clause) return text;
  const base = removeC32InspectionSentence(text, state);
  const firstSentence = base.match(/^([^.]*)\.(.*)$/u);
  if (!firstSentence) return `${sentenceCase(clause)}. ${base}`.trim();
  const [, first, rest] = firstSentence;
  const withClause = first.includes(" og ")
    ? first.replace(/ og ([^,]+)$/u, `, ${clause} og $1`)
    : `${first}, ${clause}`;
  return `${withClause}.${rest}`.trim();
}

function calmSubjective(text: string): string {
  return text
    .replace(
      /([A-ZÆØÅ][a-zæøå]+) smerter, (konstante|intermitterende) smerter/u,
      "$1, $2 smerter"
    )
    .replace("Hævelse opstået straks.", "Hævelsen opstod straks.")
    .replace("Hævelse opstået senere.", "Hævelsen opstod senere.")
    .replace(
      "knæet er ikke registreret som rødt, varmt og akut hævet.",
      "knæet er ikke rødt, varmt eller akut hævet."
    );
}

/**
 * Hvilesmerter/nattesmerter are red-flag content in C3.3 (see the
 * "malignancy" consequence group) and must never appear as their own
 * generic negative/positive sentence, regardless of how the underlying
 * canonical history fields were populated. C3.3 no longer offers any control
 * that writes `restPain`/`nightPain`, but this strips any sentence
 * mentioning them defensively, so a stale or externally-constructed state
 * can never leak the wording into the note.
 */
function stripRestNightPain(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/u);
  return sentences
    .filter((sentence) => !/hvilesmerter|nattesmerter/iu.test(sentence))
    .join(" ")
    .replace(/\s{2,}/gu, " ")
    .trim();
}

/**
 * Ledsagesymptomer (C3.3-local; no canonical equivalent). Positive selections
 * are listed individually; "Ingen ledsagesymptomer" only ever appends the one
 * fixed sentence and never touches red flags or restPain/nightPain.
 * Quick omits the aggregate negative sentence.
 */
function accompanyingSymptomsClause(
  state: C33State,
  profile: C3DocumentProfile
): string | undefined {
  if (state.workflow.accompanyingSymptoms.length) {
    return state.workflow.accompanyingSymptoms
      .map((id) => C33_ACCOMPANYING_SYMPTOMS.find((entry) => entry.id === id)?.sentence)
      .filter((value): value is string => Boolean(value))
      .join(" ");
  }
  if (profile === "quick") return undefined;
  const activeNoneBatch = [...state.accompanyingSymptomBatches]
    .reverse()
    .find((record) => record.status === "active");
  return activeNoneBatch ? "Ingen ledsagesymptomer." : undefined;
}

/**
 * "Baggrund · valgfrit" (C3.3-local). Standard-only elaboration that is
 * never decision-critical on its own and never writes or implies a red flag
 * — a chip may be visually related to a red-flag group in the UI, but this
 * projection only ever states the chip the clinician selected.
 * Legacy sport/arbejde and familiær disposition are retained in state but
 * no longer projected.
 */
function backgroundClause(state: C33State): string | undefined {
  const background = state.background;
  const clauses: string[] = [];
  if (background.priorKneeIssue) {
    const note = background.priorKneeNote?.trim();
    clauses.push(
      note
        ? `tidligere knæskade, -operation eller -injektion (${note})`
        : "tidligere knæskade, -operation eller -injektion"
    );
  }
  const comorbidityParts: string[] = [];
  if (background.jointDisease) comorbidityParts.push("kendt ledsygdom");
  if (background.comorbidityChips.length) {
    comorbidityParts.push(
      ...background.comorbidityChips.map(
        (id) => C33_COMORBIDITY_CHIPS.find((chip) => chip.id === id)?.label ?? id
      )
    );
  }
  if (comorbidityParts.length) {
    const note = background.comorbidityNote?.trim();
    clauses.push(
      `komorbiditet: ${comorbidityParts.join(", ")}${note ? ` (${note})` : ""}`
    );
  }
  if (background.medicationChips.length) {
    const labels = background.medicationChips.map(
      (id) => C33_MEDICATION_CHIPS.find((chip) => chip.id === id)?.label ?? id
    );
    const note = background.medicationNote?.trim();
    clauses.push(`medicin: ${labels.join(", ")}${note ? ` (${note})` : ""}`);
  }
  if (!clauses.length) return undefined;
  return sentenceCase(`Baggrund: ${clauses.join("; ")}.`);
}

function redFlagSentences(state: C33State, profile: C3DocumentProfile): readonly string[] {
  const positive = C33_RED_FLAG_GROUPS
    .filter((group) => state.redFlagGroups[group.id] === "yes")
    .map((group) => `${group.label}.`);
  if (profile === "standard" && hasC33RedFlagsNormal(state)) {
    return [...positive, C33_RED_FLAGS_NORMAL_TEXT];
  }
  return positive;
}

/**
 * Quick keeps decision-critical positives only: omit aggregate negatives,
 * swelling timing, and complete normal-test series wording.
 */
function stripQuickNoise(text: string, profile: C3DocumentProfile, state: C33State): string {
  if (profile !== "quick") return text;
  const sentences = text.split(/(?<=[.!?])\s+/u);
  return sentences
    .filter((sentence) => {
      const value = sentence.trim();
      if (!value) return false;
      if (/^Ingen ledsagesymptomer\./u.test(value)) return false;
      if (/Ingen ægte aflåsning eller instabilitetsfornemmelse/u.test(value)) return false;
      if (/^Hævelsen opstod\b/u.test(value)) return false;
      if (/^(Opfølgning|Safety-net):/u.test(value)) return false;
      if (
        hasC33TestsNormalBatch(state)
        && /^(Lachman|Valgus|Varus|Menisk|Patella|Neurovaskulær)/u.test(value)
      ) {
        return false;
      }
      if (
        hasC33TestsNormalBatch(state)
        && /negativ|stabil|normal/iu.test(value)
        && /(Lachman|valgus|varus|menisk|patella|neurovaskulær)/iu.test(value)
      ) {
        return false;
      }
      return true;
    })
    .join(" ")
    .replace(/\s{2,}/gu, " ")
    .trim();
}

function buildSubjectiveLine(base: string, state: C33State, profile: C3DocumentProfile): string {
  let text = stripRestNightPain(calmSubjective(base));
  if (profile === "quick") {
    text = text
      .replace(/\s*Hævelsen opstod straks\./gu, "")
      .replace(/\s*Hævelsen opstod senere\./gu, "")
      .replace(/\s*Ingen ægte aflåsning eller instabilitetsfornemmelse\./gu, "")
      .replace(/\s{2,}/gu, " ")
      .trim();
  }
  const accompanying = accompanyingSymptomsClause(state, profile);
  if (accompanying) text = [text, accompanying].filter(Boolean).join(" ").trim();
  if (profile === "standard") {
    const background = backgroundClause(state);
    if (background) text = [text, background].filter(Boolean).join(" ").trim();
  }
  const flags = redFlagSentences(state, profile);
  if (flags.length) text = [text, ...flags].filter(Boolean).join(" ").trim();
  return stripQuickNoise(text, profile, state);
}

const NORMAL_ROM_SENTENCE = "ROM: ekstension 0°, fleksion 140°.";

/**
 * "Normal ROM 0–140°" must write exactly "ROM normal." — never the raw
 * degree values — while abnormal/specified ROM keeps the literal passive
 * degrees plus, when recorded, a separate active-ROM sentence.
 */
function buildObjectiveLine(
  base: string,
  state: C33State,
  profile: C3DocumentProfile
): string {
  let text = integrateInspection(base, state);
  if (text.includes(NORMAL_ROM_SENTENCE)) {
    text = text.replace(NORMAL_ROM_SENTENCE, "ROM normal.");
  }
  const workflow = state.workflow;
  if (
    workflow.activeExtensionDegrees !== undefined
    && workflow.activeFlexionDegrees !== undefined
  ) {
    text = [
      text,
      `Aktiv ROM: ekstension ${workflow.activeExtensionDegrees}°, fleksion ${workflow.activeFlexionDegrees}°.`
    ].filter(Boolean).join(" ").trim();
  }
  if (workflow.movementFindings.includes("mechanical-block")) {
    text = [text, "Mekanisk blokering/strækkedeficit ved bevægelse."].filter(Boolean).join(" ").trim();
  }
  if (workflow.extraPalpationFindings.includes("fibular-head")) {
    text = [text, "Palpationsømhed over caput fibulae."].filter(Boolean).join(" ").trim();
  }
  return stripQuickNoise(text, profile, state);
}

/**
 * Quick keeps only the selected immediate plan; it never includes the
 * standard follow-up/safety-net wording, which is Standard-only.
 */
function stripFollowUpAndSafetyNetForQuick(text: string, profile: C3DocumentProfile): string {
  if (profile !== "quick") return text;
  const sentences = text.split(/(?<=[.!?])\s+/u);
  return sentences
    .filter((sentence) => !/^(Opfølgning|Safety-net):/u.test(sentence.trim()))
    .join(" ")
    .replace(/\s{2,}/gu, " ")
    .trim();
}

function capitalizeMarkerLine(line: string): string {
  const match = line.match(/^([PSOA]: )(.*)$/u);
  if (!match) return line;
  const [, marker, body] = match;
  return `${marker}${sentenceCase(body)}`;
}

function resolveAssessmentLine(assessmentLine: string): string {
  const body = assessmentLine.replace(/^A:\s*/u, "");
  if (!body.trim() || isC33UnfinishedAnalysisDraft(body)) {
    return "A:";
  }
  return `A: ${sentenceCase(body)}`;
}

const BILATERAL_PROBLEM_TEXT = "Bilaterale knæsmerter";

export function projectC33PsoapDocument(
  state: C33State,
  profile: C3DocumentProfile
): string {
  const lines = projectC32PsoapDocument(state.c32, profile).split("\n");
  const [problemLine, subjectiveLine, objectiveLine, assessmentLine, planLine] = lines;

  const resolvedProblemLine = state.workflow.bilateralPain
    ? `P: ${BILATERAL_PROBLEM_TEXT}`
    : problemLine;
  const resolvedSubjectiveLine = `S: ${buildSubjectiveLine(
    subjectiveLine.slice(3),
    state,
    profile
  )}`;
  const resolvedObjectiveLine = `O: ${buildObjectiveLine(
    objectiveLine.slice(3),
    state,
    profile
  )}`;
  const resolvedAssessmentLine = resolveAssessmentLine(assessmentLine);
  const resolvedPlanLine = `P: ${stripFollowUpAndSafetyNetForQuick(planLine.slice(3), profile)}`;

  return [
    resolvedProblemLine,
    resolvedSubjectiveLine,
    resolvedObjectiveLine,
    resolvedAssessmentLine,
    resolvedPlanLine
  ]
    .map(capitalizeMarkerLine)
    .join("\n");
}

export function isC33CopyReadyPsoap(text: string): boolean {
  return isC32CopyReadyPsoap(text);
}
