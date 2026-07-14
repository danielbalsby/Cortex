/**
 * Fælles fraser og formatteringsfunktioner til henvisningsudkast i Cortex.
 *
 * Ansvar:
 * - Sygdomsuafhængige formuleringer
 * - Ensartet og læsbar struktur
 * - Sammensætning af henvisningstekst fra allerede valgte kliniske fakta
 *
 * Må ikke indeholde:
 * - Diagnostisk beslutningslogik
 * - Automatisk valg af undersøgelse, behandling eller modtager
 * - Sygdomsspecifikke kriterier
 * - Regionsspecifikke henvisningskrav
 * - Automatisk afsendelse
 *
 * Kliniske workflows afgør, hvilke oplysninger der skal med.
 * Denne fil formaterer udelukkende de valgte oplysninger.
 */

export type ReferralSection =
  | "reason"
  | "history"
  | "examination"
  | "investigations"
  | "assessment"
  | "treatment"
  | "request"
  | "additionalInformation";

export type ReferralType =
  | "specialist"
  | "hospital"
  | "imaging"
  | "physiotherapy"
  | "municipal"
  | "other";

export type ReferralPriority =
  | "routine"
  | "expedited"
  | "urgent"
  | "acute";

export type Laterality =
  | "right"
  | "left"
  | "bilateral"
  | "notApplicable"
  | "unspecified";

export type ReferralEntry = string | null | undefined | false;

export interface ReferralSections {
  readonly reason?: readonly ReferralEntry[];
  readonly history?: readonly ReferralEntry[];
  readonly examination?: readonly ReferralEntry[];
  readonly investigations?: readonly ReferralEntry[];
  readonly assessment?: readonly ReferralEntry[];
  readonly treatment?: readonly ReferralEntry[];
  readonly request?: readonly ReferralEntry[];
  readonly additionalInformation?: readonly ReferralEntry[];
}

export interface ComposeReferralOptions {
  /**
   * Viser sektionsoverskrifter i den færdige henvisning.
   *
   * Standard: true
   */
  readonly includeSectionLabels?: boolean;

  /**
   * Separator mellem henvisningens sektioner.
   *
   * Standard: to linjeskift.
   */
  readonly sectionSeparator?: string;

  /**
   * Separator mellem tekstdele i samme sektion.
   *
   * Standard: mellemrum.
   */
  readonly entrySeparator?: string;
}

export interface ReferralPhraseLibrary {
  readonly referralTypes: Record<ReferralType, string>;
  readonly priorities: Record<ReferralPriority, string>;
  readonly laterality: Record<Laterality, string>;

  readonly reason: {
    readonly assessment: string;
    readonly investigation: string;
    readonly treatment: string;
    readonly rehabilitation: string;
    readonly secondOpinion: string;
  };

  readonly assessment: {
    readonly workingDiagnosis: string;
    readonly differentialDiagnoses: string;
    readonly diagnosticUncertainty: string;
    readonly noAcuteConcern: string;
  };

  readonly treatment: {
    readonly conservativeTreatment: string;
    readonly medicationTried: string;
    readonly physiotherapyTried: string;
    readonly insufficientEffect: string;
    readonly treatmentNotTolerated: string;
  };

  readonly request: {
    readonly specialistAssessment: string;
    readonly imaging: string;
    readonly rehabilitation: string;
    readonly treatmentRecommendation: string;
    readonly diagnosticClarification: string;
  };

  readonly administrative: {
    readonly patientInformed: string;
    readonly patientConsents: string;
    readonly interpreterRequired: string;
    readonly transportConsideration: string;
  };
}

/**
 * Fast klinisk rækkefølge for henvisningssektionerne.
 */
export const referralSectionOrder: readonly ReferralSection[] = [
  "reason",
  "history",
  "examination",
  "investigations",
  "assessment",
  "treatment",
  "request",
  "additionalInformation",
];

export const referralSectionLabels: Readonly<
  Record<ReferralSection, string>
> = {
  reason: "Henvisningsårsag",
  history: "Anamnese",
  examination: "Objektive fund",
  investigations: "Undersøgelser",
  assessment: "Vurdering",
  treatment: "Tidligere og aktuel behandling",
  request: "Ønske til modtager",
  additionalInformation: "Supplerende oplysninger",
};

export const referralPhrases: ReferralPhraseLibrary = {
  referralTypes: {
    specialist: "Speciallægehenvisning",
    hospital: "Hospitalshenvisning",
    imaging: "Henvisning til billeddiagnostik",
    physiotherapy: "Henvisning til fysioterapi",
    municipal: "Henvisning til kommunalt tilbud",
    other: "Anden henvisning",
  },

  priorities: {
    routine: "Rutinemæssig henvisning.",
    expedited: "Fremskyndet vurdering ønskes.",
    urgent: "Hurtig vurdering ønskes.",
    acute: "Akut vurdering ønskes.",
  },

  laterality: {
    right: "Højresidig.",
    left: "Venstresidig.",
    bilateral: "Bilateralt.",
    notApplicable: "",
    unspecified: "Side ikke angivet.",
  },

  reason: {
    assessment: "Henvises med henblik på klinisk vurdering.",
    investigation: "Henvises med henblik på yderligere udredning.",
    treatment: "Henvises med henblik på behandlingsvurdering.",
    rehabilitation:
      "Henvises med henblik på vurdering, vejledning og rehabilitering.",
    secondOpinion:
      "Henvises med henblik på fornyet specialiseret vurdering.",
  },

  assessment: {
    workingDiagnosis: "Arbejdsdiagnose",
    differentialDiagnoses: "Differentialdiagnostisk overvejes",
    diagnosticUncertainty:
      "Problemstillingen er aktuelt ikke endeligt diagnostisk afklaret.",
    noAcuteConcern:
      "Der findes aktuelt ikke kliniske holdepunkter for akut alvorlig tilstand.",
  },

  treatment: {
    conservativeTreatment: "Konservativ behandling er iværksat.",
    medicationTried: "Relevant medicinsk behandling er afprøvet.",
    physiotherapyTried: "Fysioterapeutisk behandling er afprøvet.",
    insufficientEffect:
      "Der har været utilstrækkelig effekt af den hidtidige behandling.",
    treatmentNotTolerated:
      "Tidligere behandling er seponeret på grund af manglende tolerabilitet.",
  },

  request: {
    specialistAssessment:
      "Der ønskes specialiseret vurdering og forslag til videre plan.",
    imaging:
      "Der ønskes billeddiagnostisk vurdering af den beskrevne problemstilling.",
    rehabilitation:
      "Der ønskes vurdering, vejledning og relevant gradueret rehabilitering.",
    treatmentRecommendation:
      "Der ønskes vurdering af relevante behandlingsmuligheder.",
    diagnosticClarification:
      "Der ønskes diagnostisk afklaring og anbefaling til videre forløb.",
  },

  administrative: {
    patientInformed:
      "Patienten er informeret om henvisningens formål og det forventede videre forløb.",
    patientConsents: "Patienten har samtykket til henvisningen.",
    interpreterRequired: "Der er behov for tolk.",
    transportConsideration:
      "Der kan være behov for vurdering af transportforhold.",
  },
};

/**
 * Identificerer ikke-tomme tekstværdier.
 */
function isNonEmptyString(value: ReferralEntry): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Normaliserer mellemrum og linjeskift i en enkelt tekstværdi.
 */
export function normalizeReferralText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Sikrer afsluttende tegnsætning.
 *
 * Punktum tilføjes kun, hvis teksten ikke allerede slutter med:
 * - punktum
 * - spørgsmålstegn
 * - udråbstegn
 * - kolon
 * - semikolon
 */
export function ensureReferralSentenceEnding(value: string): string {
  const normalized = normalizeReferralText(value);

  if (!normalized) {
    return "";
  }

  if (/[.!?:;]$/.test(normalized)) {
    return normalized;
  }

  return `${normalized}.`;
}

/**
 * Fjerner identiske gentagelser og bevarer den oprindelige rækkefølge.
 *
 * Sammenligningen er:
 * - ikke følsom for store og små bogstaver
 * - baseret på normaliseret tekst
 */
export function removeDuplicateReferralEntries(
  entries: readonly ReferralEntry[],
): string[] {
  const seen = new Set<string>();

  return entries.reduce<string[]>((result, entry) => {
    if (!isNonEmptyString(entry)) {
      return result;
    }

    const normalized = normalizeReferralText(entry);
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
 * Samler tekstdele uden sektionsoverskrift.
 */
export function joinReferralText(
  entries: readonly ReferralEntry[],
  separator = " ",
): string {
  return removeDuplicateReferralEntries(entries).join(separator).trim();
}

/**
 * Formaterer én henvisningssektion.
 *
 * Eksempel:
 *
 * formatReferralSection("examination", [
 *   "Medial ledlinjeømhed",
 *   "Positiv Thessaly-test",
 * ]);
 *
 * Resultat:
 *
 * Objektive fund:
 * Medial ledlinjeømhed. Positiv Thessaly-test.
 */
export function formatReferralSection(
  section: ReferralSection,
  entries: readonly ReferralEntry[],
  options: {
    readonly includeLabel?: boolean;
    readonly entrySeparator?: string;
  } = {},
): string {
  const {
    includeLabel = true,
    entrySeparator = " ",
  } = options;

  const content = removeDuplicateReferralEntries(entries)
    .map(ensureReferralSentenceEnding)
    .filter(Boolean)
    .join(entrySeparator);

  if (!content) {
    return "";
  }

  if (!includeLabel) {
    return content;
  }

  return `${referralSectionLabels[section]}:\n${content}`;
}

/**
 * Sammensætter en komplet henvisning i fast klinisk rækkefølge.
 *
 * Tomme sektioner udelades automatisk.
 */
export function composeReferral(
  sections: ReferralSections,
  options: ComposeReferralOptions = {},
): string {
  const {
    includeSectionLabels = true,
    sectionSeparator = "\n\n",
    entrySeparator = " ",
  } = options;

  return referralSectionOrder
    .map((section) =>
      formatReferralSection(section, sections[section] ?? [], {
        includeLabel: includeSectionLabels,
        entrySeparator,
      }),
    )
    .filter(Boolean)
    .join(sectionSeparator)
    .trim();
}

/**
 * Kombinerer en fast label eller frase med en dynamisk værdi.
 *
 * Eksempel:
 *
 * referralPhraseWithValue(
 *   referralPhrases.assessment.workingDiagnosis,
 *   "gonartrose",
 * );
 *
 * Resultat:
 *
 * Arbejdsdiagnose: gonartrose.
 */
export function referralPhraseWithValue(
  phrase: string,
  value: string | null | undefined,
): string {
  const normalizedPhrase = normalizeReferralText(phrase);
  const normalizedValue = value
    ? normalizeReferralText(value)
    : "";

  if (!normalizedPhrase || !normalizedValue) {
    return "";
  }

  const separator = normalizedPhrase.endsWith(":") ? " " : ": ";

  return ensureReferralSentenceEnding(
    `${normalizedPhrase}${separator}${normalizedValue}`,
  );
}

/**
 * Returnerer en standardiseret sideangivelse.
 */
export function formatReferralLaterality(
  laterality: Laterality | null | undefined,
): string {
  if (!laterality) {
    return "";
  }

  return referralPhrases.laterality[laterality];
}

/**
 * Returnerer en standardiseret henvisningsprioritet.
 *
 * Prioriteten skal altid være aktivt valgt eller bekræftet af klinikeren.
 */
export function formatReferralPriority(
  priority: ReferralPriority | null | undefined,
): string {
  if (!priority) {
    return "";
  }

  return referralPhrases.priorities[priority];
}

/**
 * Returnerer en læsbar betegnelse for henvisningstypen.
 */
export function formatReferralType(
  referralType: ReferralType | null | undefined,
): string {
  if (!referralType) {
    return "";
  }

  return referralPhrases.referralTypes[referralType];
}

/**
 * Kontrollerer, om mindst én henvisningssektion indeholder tekst.
 */
export function hasReferralContent(
  sections: ReferralSections,
): boolean {
  return referralSectionOrder.some((section) =>
    (sections[section] ?? []).some(isNonEmptyString),
  );
}
