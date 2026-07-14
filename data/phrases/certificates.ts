/**
 * Fælles fraser og formatteringsfunktioner til attester og administrative
 * dokumenter i Cortex.
 *
 * Ansvar:
 * - Genbrugelige og dokumentuafhængige formuleringer
 * - Ensartet struktur for administrative udkast
 * - Sammensætning af tekst fra allerede registrerede kliniske fakta
 *
 * Må ikke indeholde:
 * - Juridisk vurdering
 * - Automatisk afgørelse om arbejdsevne eller rettigheder
 * - Automatisk udfyldelse af attestfelter uden lægelig bekræftelse
 * - Attestspecifikke myndighedskrav
 * - Automatisk afsendelse
 *
 * Den konkrete attest eller arbejdsgang afgør, hvilke oplysninger der er
 * relevante. Denne fil formaterer udelukkende oplysninger, som lægen aktivt
 * har registreret eller bekræftet.
 */

export type CertificateSection =
  | "purpose"
  | "healthCondition"
  | "symptoms"
  | "function"
  | "workCapacity"
  | "limitations"
  | "treatment"
  | "prognosis"
  | "duration"
  | "recommendations"
  | "additionalInformation";

export type CertificateType =
  | "sickLeave"
  | "fitnessForWork"
  | "possibilityStatement"
  | "durationStatement"
  | "drivingLicence"
  | "insurance"
  | "municipal"
  | "travel"
  | "other";

export type WorkCapacity =
  | "unaffected"
  | "partiallyReduced"
  | "significantlyReduced"
  | "temporarilyAbsent"
  | "notAssessed";

export type FunctionalImpact =
  | "none"
  | "mild"
  | "moderate"
  | "severe"
  | "notAssessed";

export type Prognosis =
  | "good"
  | "uncertain"
  | "prolonged"
  | "notAssessed";

export type CertificateEntry = string | null | undefined | false;

export interface CertificateSections {
  readonly purpose?: readonly CertificateEntry[];
  readonly healthCondition?: readonly CertificateEntry[];
  readonly symptoms?: readonly CertificateEntry[];
  readonly function?: readonly CertificateEntry[];
  readonly workCapacity?: readonly CertificateEntry[];
  readonly limitations?: readonly CertificateEntry[];
  readonly treatment?: readonly CertificateEntry[];
  readonly prognosis?: readonly CertificateEntry[];
  readonly duration?: readonly CertificateEntry[];
  readonly recommendations?: readonly CertificateEntry[];
  readonly additionalInformation?: readonly CertificateEntry[];
}

export interface ComposeCertificateOptions {
  /**
   * Viser sektionsoverskrifter i det færdige udkast.
   *
   * Standard: true
   */
  readonly includeSectionLabels?: boolean;

  /**
   * Separator mellem sektionerne.
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

export interface CertificatePhraseLibrary {
  readonly certificateTypes: Record<CertificateType, string>;

  readonly functionalImpact: Record<FunctionalImpact, string>;

  readonly workCapacity: Record<WorkCapacity, string>;

  readonly prognosis: Record<Prognosis, string>;

  readonly purpose: {
    readonly healthDocumentation: string;
    readonly functionalAssessment: string;
    readonly workCapacityAssessment: string;
    readonly durationAssessment: string;
    readonly fitnessAssessment: string;
  };

  readonly healthCondition: {
    readonly currentCondition: string;
    readonly clinicallyAssessedCondition: string;
    readonly diagnosticUncertainty: string;
    readonly relevantComorbidity: string;
  };

  readonly function: {
    readonly dailyActivitiesAffected: string;
    readonly occupationalFunctionAffected: string;
    readonly physicalLimitations: string;
    readonly cognitiveLimitations: string;
    readonly psychologicalLimitations: string;
    readonly noSignificantLimitation: string;
  };

  readonly work: {
    readonly dutiesReviewed: string;
    readonly demandsReviewed: string;
    readonly partialReturnPossible: string;
    readonly fullReturnPossible: string;
    readonly temporaryAbsenceRecommended: string;
    readonly accommodationsRecommended: string;
  };

  readonly treatment: {
    readonly treatmentInitiated: string;
    readonly treatmentOngoing: string;
    readonly treatmentPlanned: string;
    readonly responseObserved: string;
    readonly insufficientResponse: string;
  };

  readonly prognosisText: {
    readonly expectedImprovement: string;
    readonly uncertainCourse: string;
    readonly prolongedCoursePossible: string;
    readonly reassessmentRequired: string;
  };

  readonly administrative: {
    readonly basedOnConsultation: string;
    readonly basedOnAvailableInformation: string;
    readonly patientInformed: string;
    readonly patientConsents: string;
    readonly limitationsOfAssessment: string;
  };
}

/**
 * Fast rækkefølge i administrative dokumentudkast.
 */
export const certificateSectionOrder: readonly CertificateSection[] = [
  "purpose",
  "healthCondition",
  "symptoms",
  "function",
  "workCapacity",
  "limitations",
  "treatment",
  "prognosis",
  "duration",
  "recommendations",
  "additionalInformation",
];

export const certificateSectionLabels: Readonly<
  Record<CertificateSection, string>
> = {
  purpose: "Formål",
  healthCondition: "Helbredsmæssige forhold",
  symptoms: "Aktuelle symptomer",
  function: "Funktionsevne",
  workCapacity: "Arbejdsevne",
  limitations: "Begrænsninger og skånehensyn",
  treatment: "Behandling og opfølgning",
  prognosis: "Prognose",
  duration: "Forventet varighed",
  recommendations: "Anbefalinger",
  additionalInformation: "Supplerende oplysninger",
};

export const certificatePhrases: CertificatePhraseLibrary = {
  certificateTypes: {
    sickLeave: "Dokumentation ved sygefravær",
    fitnessForWork: "Vurdering af arbejdsdygtighed",
    possibilityStatement: "Mulighedserklæring",
    durationStatement: "Varighedserklæring",
    drivingLicence: "Helbredsmæssig vurdering til kørekort",
    insurance: "Forsikringsattest",
    municipal: "Kommunal helbredsattest",
    travel: "Dokumentation ved rejse eller afbestilling",
    other: "Andet administrativt dokument",
  },

  functionalImpact: {
    none: "Funktionsniveauet vurderes ikke væsentligt påvirket.",
    mild: "Funktionsniveauet vurderes let påvirket.",
    moderate: "Funktionsniveauet vurderes moderat påvirket.",
    severe: "Funktionsniveauet vurderes væsentligt påvirket.",
    notAssessed: "Funktionspåvirkningen er ikke fuldt vurderet.",
  },

  workCapacity: {
    unaffected: "Arbejdsevnen vurderes aktuelt bevaret.",
    partiallyReduced: "Arbejdsevnen vurderes aktuelt delvist nedsat.",
    significantlyReduced:
      "Arbejdsevnen vurderes aktuelt væsentligt nedsat.",
    temporarilyAbsent:
      "Arbejdsevnen vurderes aktuelt ikke forenelig med sædvanligt arbejde.",
    notAssessed: "Arbejdsevnen er ikke fuldt vurderet.",
  },

  prognosis: {
    good: "Der forventes bedring ved det planlagte forløb.",
    uncertain: "Det videre forløb er aktuelt usikkert.",
    prolonged: "Der kan være tale om et længerevarende forløb.",
    notAssessed: "Prognosen kan aktuelt ikke vurderes sikkert.",
  },

  purpose: {
    healthDocumentation:
      "Dokumentet udarbejdes med henblik på helbredsmæssig dokumentation.",
    functionalAssessment:
      "Dokumentet udarbejdes med henblik på vurdering af funktionsevnen.",
    workCapacityAssessment:
      "Dokumentet udarbejdes med henblik på vurdering af arbejdsevnen.",
    durationAssessment:
      "Dokumentet udarbejdes med henblik på vurdering af forventet varighed.",
    fitnessAssessment:
      "Dokumentet udarbejdes med henblik på vurdering af helbredsmæssig egnethed.",
  },

  healthCondition: {
    currentCondition: "Aktuel helbredstilstand",
    clinicallyAssessedCondition: "Klinisk vurdering",
    diagnosticUncertainty:
      "Tilstanden er aktuelt ikke endeligt diagnostisk afklaret.",
    relevantComorbidity: "Relevante øvrige helbredsmæssige forhold",
  },

  function: {
    dailyActivitiesAffected:
      "Helbredstilstanden påvirker daglige aktiviteter.",
    occupationalFunctionAffected:
      "Helbredstilstanden påvirker udførelsen af arbejdsrelaterede funktioner.",
    physicalLimitations:
      "Der foreligger aktuelle fysiske funktionsbegrænsninger.",
    cognitiveLimitations:
      "Der foreligger aktuelle kognitive funktionsbegrænsninger.",
    psychologicalLimitations:
      "Der foreligger aktuelle psykiske funktionsbegrænsninger.",
    noSignificantLimitation:
      "Der findes aktuelt ikke væsentlige funktionsbegrænsninger.",
  },

  work: {
    dutiesReviewed:
      "Patientens væsentligste arbejdsfunktioner er gennemgået.",
    demandsReviewed:
      "Relevante fysiske, psykiske og organisatoriske arbejdskrav er gennemgået.",
    partialReturnPossible:
      "Delvis tilbagevenden til arbejde vurderes mulig under relevante skånehensyn.",
    fullReturnPossible:
      "Fuld tilbagevenden til sædvanligt arbejde vurderes mulig.",
    temporaryAbsenceRecommended:
      "Midlertidigt fravær fra sædvanligt arbejde vurderes relevant.",
    accommodationsRecommended:
      "Midlertidige skånehensyn eller tilpasning af arbejdsopgaver vurderes relevant.",
  },

  treatment: {
    treatmentInitiated: "Relevant behandling er iværksat.",
    treatmentOngoing: "Behandling og klinisk opfølgning pågår.",
    treatmentPlanned: "Der foreligger en plan for videre behandling.",
    responseObserved:
      "Der beskrives effekt af den iværksatte behandling.",
    insufficientResponse:
      "Der beskrives utilstrækkelig effekt af den hidtidige behandling.",
  },

  prognosisText: {
    expectedImprovement:
      "Der forventes gradvis bedring under det planlagte forløb.",
    uncertainCourse:
      "Det videre kliniske forløb kan aktuelt ikke forudsiges sikkert.",
    prolongedCoursePossible:
      "Der kan være risiko for et længerevarende forløb.",
    reassessmentRequired:
      "Fornyet vurdering anbefales ved ændret tilstand eller manglende forventet bedring.",
  },

  administrative: {
    basedOnConsultation:
      "Vurderingen er baseret på den aktuelle konsultation.",
    basedOnAvailableInformation:
      "Vurderingen er baseret på de aktuelt tilgængelige kliniske oplysninger.",
    patientInformed:
      "Patienten er informeret om dokumentets formål og indhold.",
    patientConsents:
      "Patienten har samtykket til videregivelse af de beskrevne oplysninger.",
    limitationsOfAssessment:
      "Vurderingen er begrænset til de foreliggende kliniske oplysninger og den aktuelle problemstilling.",
  },
};

/**
 * Identificerer ikke-tomme tekstværdier.
 */
function isNonEmptyString(value: CertificateEntry): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Normaliserer mellemrum og linjeskift.
 */
export function normalizeCertificateText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Sikrer afsluttende tegnsætning.
 *
 * Punktum tilføjes, medmindre teksten allerede slutter med:
 * - punktum
 * - spørgsmålstegn
 * - udråbstegn
 * - kolon
 * - semikolon
 */
export function ensureCertificateSentenceEnding(value: string): string {
  const normalized = normalizeCertificateText(value);

  if (!normalized) {
    return "";
  }

  if (/[.!?:;]$/.test(normalized)) {
    return normalized;
  }

  return `${normalized}.`;
}

/**
 * Fjerner identiske gentagelser og bevarer oprindelig rækkefølge.
 */
export function removeDuplicateCertificateEntries(
  entries: readonly CertificateEntry[],
): string[] {
  const seen = new Set<string>();

  return entries.reduce<string[]>((result, entry) => {
    if (!isNonEmptyString(entry)) {
      return result;
    }

    const normalized = normalizeCertificateText(entry);
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
export function joinCertificateText(
  entries: readonly CertificateEntry[],
  separator = " ",
): string {
  return removeDuplicateCertificateEntries(entries)
    .join(separator)
    .trim();
}

/**
 * Formaterer én sektion i et attest- eller dokumentudkast.
 */
export function formatCertificateSection(
  section: CertificateSection,
  entries: readonly CertificateEntry[],
  options: {
    readonly includeLabel?: boolean;
    readonly entrySeparator?: string;
  } = {},
): string {
  const {
    includeLabel = true,
    entrySeparator = " ",
  } = options;

  const content = removeDuplicateCertificateEntries(entries)
    .map(ensureCertificateSentenceEnding)
    .filter(Boolean)
    .join(entrySeparator);

  if (!content) {
    return "";
  }

  if (!includeLabel) {
    return content;
  }

  return `${certificateSectionLabels[section]}:\n${content}`;
}

/**
 * Sammensætter et komplet administrativt dokumentudkast.
 *
 * Tomme sektioner udelades automatisk.
 */
export function composeCertificate(
  sections: CertificateSections,
  options: ComposeCertificateOptions = {},
): string {
  const {
    includeSectionLabels = true,
    sectionSeparator = "\n\n",
    entrySeparator = " ",
  } = options;

  return certificateSectionOrder
    .map((section) =>
      formatCertificateSection(section, sections[section] ?? [], {
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
 */
export function certificatePhraseWithValue(
  phrase: string,
  value: string | null | undefined,
): string {
  const normalizedPhrase = normalizeCertificateText(phrase);
  const normalizedValue = value
    ? normalizeCertificateText(value)
    : "";

  if (!normalizedPhrase || !normalizedValue) {
    return "";
  }

  const separator = normalizedPhrase.endsWith(":") ? " " : ": ";

  return ensureCertificateSentenceEnding(
    `${normalizedPhrase}${separator}${normalizedValue}`,
  );
}

/**
 * Returnerer standardtekst for attesttype.
 */
export function formatCertificateType(
  certificateType: CertificateType | null | undefined,
): string {
  if (!certificateType) {
    return "";
  }

  return certificatePhrases.certificateTypes[certificateType];
}

/**
 * Returnerer standardtekst for funktionspåvirkning.
 *
 * Værdien skal være aktivt valgt eller bekræftet af lægen.
 */
export function formatFunctionalImpact(
  functionalImpact: FunctionalImpact | null | undefined,
): string {
  if (!functionalImpact) {
    return "";
  }

  return certificatePhrases.functionalImpact[functionalImpact];
}

/**
 * Returnerer standardtekst for arbejdsevne.
 *
 * Værdien skal være aktivt valgt eller bekræftet af lægen.
 */
export function formatWorkCapacity(
  workCapacity: WorkCapacity | null | undefined,
): string {
  if (!workCapacity) {
    return "";
  }

  return certificatePhrases.workCapacity[workCapacity];
}

/**
 * Returnerer standardtekst for prognose.
 *
 * Værdien skal være aktivt valgt eller bekræftet af lægen.
 */
export function formatPrognosis(
  prognosis: Prognosis | null | undefined,
): string {
  if (!prognosis) {
    return "";
  }

  return certificatePhrases.prognosis[prognosis];
}

/**
 * Kontrollerer, om mindst én sektion indeholder tekst.
 */
export function hasCertificateContent(
  sections: CertificateSections,
): boolean {
  return certificateSectionOrder.some((section) =>
    (sections[section] ?? []).some(isNonEmptyString),
  );
}
