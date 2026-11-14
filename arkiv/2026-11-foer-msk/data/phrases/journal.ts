/**
 * Fælles journalfraser og formatteringsfunktioner til Cortex.
 *
 * Ansvar:
 * - Genbrugelige, sygdomsuafhængige formuleringer
 * - Formatering af journalafsnit
 * - Sammensætning af et kort PSOAP-notat
 *
 * Må ikke indeholde:
 * - Diagnostisk logik
 * - Kliniske beslutningsregler
 * - Sygdomsspecifikke formuleringer
 * - Automatisk valg af vurdering eller behandling
 */

export type JournalSection =
  | "problem"
  | "subjective"
  | "objective"
  | "assessment"
  | "plan";

export type ConsultationType =
  | "inPerson"
  | "telephone"
  | "video"
  | "homeVisit"
  | "followUp";

export type DiagnosticConfidence = "low" | "moderate" | "high";

export type JournalEntry = string | null | undefined | false;

export interface JournalSectionLabels {
  readonly problem: string;
  readonly subjective: string;
  readonly objective: string;
  readonly assessment: string;
  readonly plan: string;
}

export interface JournalPhraseLibrary {
  readonly consultationTypes: Record<ConsultationType, string>;

  readonly assessment: {
    readonly workingDiagnosis: string;
    readonly differentialDiagnoses: string;
    readonly diagnosticConfidence: Record<DiagnosticConfidence, string>;
    readonly uncertainAssessment: string;
    readonly noAcuteConcern: string;
  };

  readonly plan: {
    readonly informationProvided: string;
    readonly sharedDecision: string;
    readonly conservativeTreatment: string;
    readonly medicationReviewed: string;
    readonly referralPlanned: string;
    readonly investigationPlanned: string;
    readonly followUpAsNeeded: string;
    readonly plannedFollowUp: string;
  };

  readonly safetyNet: {
    readonly general: string;
    readonly deterioration: string;
    readonly acuteDeterioration: string;
    readonly lackOfImprovement: string;
    readonly newSymptoms: string;
  };

  readonly followUp: {
    readonly improvement: string;
    readonly unchanged: string;
    readonly deterioration: string;
    readonly treatmentEffect: string;
    readonly insufficientTreatmentEffect: string;
  };
}

/**
 * Journalens faste rækkefølge.
 *
 * P: Problem
 * S: Subjektivt
 * O: Objektivt
 * A: Vurdering
 * P: Plan
 */
export const journalSectionOrder: readonly JournalSection[] = [
  "problem",
  "subjective",
  "objective",
  "assessment",
  "plan",
];

export const journalSectionLabels: JournalSectionLabels = {
  problem: "P:",
  subjective: "S:",
  objective: "O:",
  assessment: "A:",
  plan: "P:",
};

export const journalPhrases: JournalPhraseLibrary = {
  consultationTypes: {
    inPerson: "Fremmødekonsultation.",
    telephone: "Telefonkonsultation.",
    video: "Videokonsultation.",
    homeVisit: "Sygebesøg.",
    followUp: "Opfølgende konsultation.",
  },

  assessment: {
    workingDiagnosis: "Tilstanden vurderes mest forenelig med",
    differentialDiagnoses: "Differentialdiagnostisk overvejes",
    diagnosticConfidence: {
      low: "Diagnostisk sikkerhed vurderes lav.",
      moderate: "Diagnostisk sikkerhed vurderes moderat.",
      high: "Diagnostisk sikkerhed vurderes høj.",
    },
    uncertainAssessment:
      "Tilstanden er aktuelt ikke endeligt afklaret. Der aftales observation og klinisk revurdering efter behov.",
    noAcuteConcern:
      "Der findes aktuelt ikke kliniske holdepunkter for en akut alvorlig tilstand.",
  },

  plan: {
    informationProvided:
      "Patienten er informeret om vurdering, plan og forventet forløb.",
    sharedDecision: "Planen er aftalt i fællesskab med patienten.",
    conservativeTreatment: "Der aftales initial konservativ behandling.",
    medicationReviewed: "Aktuel medicinsk behandling er gennemgået.",
    referralPlanned: "Der aftales henvisning til videre vurdering.",
    investigationPlanned: "Der aftales relevant paraklinisk undersøgelse.",
    followUpAsNeeded: "Opfølgning efter klinisk behov.",
    plannedFollowUp: "Der aftales planlagt klinisk opfølgning.",
  },

  safetyNet: {
    general:
      "Patienten er informeret om at kontakte læge ved forværring, nye symptomer eller manglende forventet bedring.",
    deterioration:
      "Ny lægekontakt anbefales ved tiltagende symptomer eller funktionspåvirkning.",
    acuteDeterioration:
      "Ved akut forværring eller påvirket almentilstand anbefales akut lægelig vurdering.",
    lackOfImprovement:
      "Ny klinisk vurdering anbefales ved manglende bedring som forventet.",
    newSymptoms:
      "Patienten anbefales at reagere ved nye eller ændrede symptomer.",
  },

  followUp: {
    improvement: "Ved opfølgning beskrives klinisk bedring.",
    unchanged: "Tilstanden vurderes overordnet uændret siden seneste kontakt.",
    deterioration: "Der beskrives klinisk forværring siden seneste kontakt.",
    treatmentEffect:
      "Der beskrives relevant effekt af den iværksatte behandling.",
    insufficientTreatmentEffect:
      "Der beskrives utilstrækkelig effekt af den iværksatte behandling.",
  },
};

/**
 * Type guard, der fjerner tomme og ugyldige journaldele.
 */
function isNonEmptyString(value: JournalEntry): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Normaliserer mellemrum uden at ændre tekstens øvrige indhold.
 */
export function normalizeJournalText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Sikrer korrekt afslutning af en journalsætning.
 *
 * Der tilføjes punktum, medmindre teksten allerede slutter med:
 * - punktum
 * - spørgsmålstegn
 * - udråbstegn
 * - kolon
 */
export function ensureSentenceEnding(value: string): string {
  const normalized = normalizeJournalText(value);

  if (!normalized) {
    return "";
  }

  if (/[.!?:]$/.test(normalized)) {
    return normalized;
  }

  return `${normalized}.`;
}

/**
 * Samler flere tekstdele og udelader tomme værdier.
 */
export function joinJournalText(
  entries: readonly JournalEntry[],
  separator = " ",
): string {
  return entries
    .filter(isNonEmptyString)
    .map(normalizeJournalText)
    .join(separator)
    .trim();
}

/**
 * Fjerner identiske gentagelser, men bevarer den oprindelige rækkefølge.
 */
export function removeDuplicateEntries(
  entries: readonly JournalEntry[],
): string[] {
  const seen = new Set<string>();

  return entries.filter(isNonEmptyString).reduce<string[]>((result, entry) => {
    const normalized = normalizeJournalText(entry);
    const comparisonKey = normalized.toLocaleLowerCase("da-DK");

    if (seen.has(comparisonKey)) {
      return result;
    }

    seen.add(comparisonKey);
    result.push(normalized);

    return result;
  }, []);
}

/**
 * Formaterer ét journalafsnit.
 *
 * Eksempel:
 *
 * formatJournalSection("objective", [
 *   "Medial ledlinjeømhed",
 *   "Positiv Thessaly-test",
 * ]);
 *
 * Resultat:
 *
 * O: Medial ledlinjeømhed. Positiv Thessaly-test.
 */
export function formatJournalSection(
  section: JournalSection,
  entries: readonly JournalEntry[],
): string {
  const content = removeDuplicateEntries(entries)
    .map(ensureSentenceEnding)
    .filter(Boolean)
    .join(" ");

  if (!content) {
    return "";
  }

  return `${journalSectionLabels[section]} ${content}`;
}

/**
 * Sammensætter en komplet journal i fast PSOAP-rækkefølge.
 *
 * Tomme afsnit udelades automatisk.
 */
export function composeJournal(
  sections: Partial<Record<JournalSection, readonly JournalEntry[]>>,
): string {
  return journalSectionOrder
    .map((section) => formatJournalSection(section, sections[section] ?? []))
    .filter(Boolean)
    .join("\n");
}

/**
 * Hjælpefunktion til fraser, der skal efterfølges af et klinisk indhold.
 *
 * Eksempel:
 *
 * phraseWithValue(
 *   journalPhrases.assessment.workingDiagnosis,
 *   "gonartrose",
 * );
 *
 * Resultat:
 *
 * "Tilstanden vurderes mest forenelig med gonartrose."
 */
export function phraseWithValue(
  phrase: string,
  value: string | null | undefined,
): string {
  if (!value?.trim()) {
    return "";
  }

  return ensureSentenceEnding(`${phrase} ${value}`);
}
