/**
 * Fælles patientrettede fraser og formattering til Cortex.
 *
 * Denne fil indeholder:
 * - sygdomsuafhængige patientfraser
 * - strukturering af patientinformation
 * - generel safety-net-formatering
 *
 * Denne fil må ikke indeholde:
 * - diagnostisk logik
 * - automatisk valg af behandling
 * - lægemiddeldoser
 * - sygdomsspecifik rådgivning
 * - automatisk afsendelse
 *
 * Kliniske workflows vælger indholdet.
 * Denne fil formaterer kun oplysninger, som lægen har valgt eller bekræftet.
 */

export type PatientInformationSection =
  | "summary"
  | "assessment"
  | "plan"
  | "selfCare"
  | "medication"
  | "investigations"
  | "referral"
  | "followUp"
  | "safetyNet"
  | "practicalInformation";

export type PatientInformationType =
  | "consultationSummary"
  | "selfCareAdvice"
  | "medicationInformation"
  | "investigationInformation"
  | "referralInformation"
  | "followUpPlan"
  | "safetyNet"
  | "procedureAftercare"
  | "other";

export type FollowUpTiming =
  | "asNeeded"
  | "withinDays"
  | "withinWeeks"
  | "planned"
  | "afterResults"
  | "notSpecified";

export type UrgencyLevel = "routine" | "sameDay" | "urgent" | "acute";

export type PatientEntry = string | null | undefined | false;

export type PatientInformationSections = Partial<
  Record<PatientInformationSection, readonly PatientEntry[]>
>;

export interface ComposePatientInformationOptions {
  readonly includeSectionLabels?: boolean;
  readonly sectionSeparator?: string;
  readonly entrySeparator?: string;
  readonly includeGeneralClosing?: boolean;
}

export interface ComposeSafetyNetOptions {
  readonly urgency?: UrgencyLevel;
  readonly introduction?: string;
}

export const patientInformationSectionOrder: readonly PatientInformationSection[] =
  [
    "summary",
    "assessment",
    "plan",
    "selfCare",
    "medication",
    "investigations",
    "referral",
    "followUp",
    "safetyNet",
    "practicalInformation",
  ];

export const patientInformationSectionLabels: Readonly<
  Record<PatientInformationSection, string>
> = {
  summary: "Kort opsummering",
  assessment: "Lægens vurdering",
  plan: "Plan",
  selfCare: "Det kan du selv gøre",
  medication: "Medicin",
  investigations: "Undersøgelser",
  referral: "Henvisning",
  followUp: "Opfølgning",
  safetyNet: "Søg læge igen hvis",
  practicalInformation: "Praktisk information",
};

export const patientPhrases = {
  informationTypes: {
    consultationSummary: "Opsummering af konsultationen",
    selfCareAdvice: "Råd om egenomsorg",
    medicationInformation: "Information om medicin",
    investigationInformation: "Information om undersøgelser",
    referralInformation: "Information om henvisning",
    followUpPlan: "Plan for opfølgning",
    safetyNet: "Hvornår du skal søge læge igen",
    procedureAftercare: "Information efter behandling eller procedure",
    other: "Patientinformation",
  } satisfies Record<PatientInformationType, string>,

  summary: {
    consultationCompleted:
      "Vi har i dag gennemgået dine symptomer og lagt en plan for det videre forløb.",
    assessmentDiscussed:
      "Lægens vurdering og de vigtigste overvejelser er gennemgået med dig.",
    planAgreed: "Planen er aftalt sammen med dig.",
    uncertaintyExplained:
      "Det er forklaret, at årsagen til symptomerne endnu ikke er endeligt afklaret.",
  },

  assessment: {
    mostLikelyExplanation: "Symptomerne vurderes mest sandsynligt at skyldes",
    notFinallyClarified:
      "Årsagen til symptomerne er endnu ikke endeligt afklaret.",
    noCurrentAcuteConcern:
      "Der er ved dagens vurdering ikke tegn på en akut alvorlig tilstand.",
    furtherAssessmentNeeded:
      "Der er behov for yderligere vurdering eller undersøgelser.",
  },

  plan: {
    observation:
      "Vi har aftalt at følge udviklingen i symptomerne.",
    conservativeManagement:
      "Vi starter med en enkel og skånsom behandling.",
    treatmentStarted: "Der er iværksat behandling.",
    treatmentContinued: "Den nuværende behandling fortsættes som aftalt.",
    treatmentAdjusted: "Behandlingen er justeret efter aftale.",
  },

  selfCare: {
    followAgreedAdvice: "Følg de råd, som er aftalt ved konsultationen.",
    gradualActivity:
      "Øg aktiviteten gradvist og inden for det, symptomerne tillader.",
    avoidAggravatingActivity:
      "Undgå midlertidigt aktiviteter, som tydeligt forværrer symptomerne.",
    maintainActivityAsTolerated:
      "Forsøg at holde dig i gang i det omfang, det føles forsvarligt.",
    restAsNeeded:
      "Hold pauser og aflast efter behov, men undgå unødvendig langvarig inaktivitet.",
    symptomDiary:
      "Det kan være nyttigt at notere udviklingen i symptomerne frem mod næste vurdering.",
  },

  medication: {
    useAsAgreed: "Tag medicinen som aftalt.",
    followInstructions:
      "Følg anvisningen på medicinlisten eller den udleverede vejledning.",
    contactOnAdverseEffects:
      "Kontakt læge ved nye eller generende bivirkninger.",
    doNotChangeWithoutAgreement:
      "Ændr ikke behandlingen uden aftale med en læge.",
    medicationReviewed:
      "Din aktuelle medicin er gennemgået ved konsultationen.",
  },

  investigations: {
    testRequested: "Der er bestilt en undersøgelse.",
    awaitResults:
      "Det videre forløb afhænger helt eller delvist af undersøgelsens resultat.",
    resultsCommunicated:
      "Du får besked om resultatet efter den aftalte procedure.",
    contactIfNoResult:
      "Kontakt klinikken, hvis du ikke har fået svar inden for den aftalte tid.",
  },

  referral: {
    referralPrepared: "Der er udarbejdet en henvisning.",
    awaitAppointment:
      "Du vil blive indkaldt eller kontaktet af det sted, du er henvist til.",
    purposeExplained:
      "Formålet med henvisningen er gennemgået med dig.",
    contactIfNoAppointment:
      "Kontakt klinikken, hvis du ikke modtager information om henvisningen som forventet.",
  },

  followUp: {
    asNeeded: "Bestil en ny tid ved behov.",
    planned: "Der er aftalt planlagt opfølgning.",
    afterResults:
      "Der følges op, når resultaterne af de planlagte undersøgelser foreligger.",
    ifNoImprovement:
      "Bestil en ny vurdering, hvis du ikke får den forventede bedring.",
    ifSymptomsPersist:
      "Bestil en ny vurdering, hvis symptomerne fortsætter.",
  },

  safetyNet: {
    deterioration: "symptomerne bliver tydeligt værre",
    newSymptoms: "der kommer nye eller ændrede symptomer",
    rapidDeterioration: "tilstanden forværres hurtigt",
    affectedGeneralCondition:
      "du bliver tydeligt alment påvirket eller usædvanligt medtaget",
    breathingDifficulty: "du får åndenød eller vejrtrækningsbesvær",
    severePain: "du får stærke eller hurtigt tiltagende smerter",
    neurologicalSymptoms:
      "du udvikler ny kraftnedsættelse, føleforstyrrelser eller andre neurologiske symptomer",
    bleeding: "du får betydelig eller vedvarende blødning",
    uncertainty:
      "du bliver utryg ved udviklingen eller er i tvivl om, hvad du skal gøre",
  },

  practical: {
    writtenInformationProvided:
      "Du har fået skriftlig information om det aftalte forløb.",
    patientUnderstandsPlan:
      "Du har haft mulighed for at gennemgå og forstå planen.",
    questionsAnswered: "Dine spørgsmål er så vidt muligt besvaret.",
    interpreterUsed: "Der er anvendt tolk ved konsultationen.",
    contactPractice:
      "Du kan kontakte klinikken ved spørgsmål til det aftalte forløb.",
  },

  urgency: {
    routine: "Kontakt egen læge i almindelig åbningstid.",
    sameDay: "Kontakt egen læge eller lægevagt samme dag.",
    urgent: "Søg hurtig lægelig vurdering.",
    acute: "Ring 112 ved alvorlige eller hurtigt forværrede symptomer.",
  } satisfies Record<UrgencyLevel, string>,

  followUpTiming: {
    asNeeded: "Opfølgning efter behov.",
    withinDays: "Opfølgning inden for få dage.",
    withinWeeks: "Opfølgning inden for de kommende uger.",
    planned: "Opfølgning på det aftalte tidspunkt.",
    afterResults: "Opfølgning, når undersøgelsesresultaterne foreligger.",
    notSpecified: "",
  } satisfies Record<FollowUpTiming, string>,
} as const;

/**
 * Identificerer tekstværdier med reelt indhold.
 */
function isNonEmptyString(value: PatientEntry): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Normaliserer mellemrum og linjeskift.
 */
export function normalizePatientText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Sikrer afsluttende tegnsætning.
 */
export function ensurePatientSentenceEnding(value: string): string {
  const normalized = normalizePatientText(value);

  if (!normalized || /[.!?:;]$/.test(normalized)) {
    return normalized;
  }

  return `${normalized}.`;
}

/**
 * Fjerner tomme værdier og identiske gentagelser.
 */
export function removeDuplicatePatientEntries(
  entries: readonly PatientEntry[],
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const entry of entries) {
    if (!isNonEmptyString(entry)) {
      continue;
    }

    const normalized = normalizePatientText(entry);
    const comparisonKey = normalized.toLocaleLowerCase("da-DK");

    if (seen.has(comparisonKey)) {
      continue;
    }

    seen.add(comparisonKey);
    result.push(normalized);
  }

  return result;
}

/**
 * Samler tekstdele uden sektionsoverskrift.
 */
export function joinPatientText(
  entries: readonly PatientEntry[],
  separator = " ",
): string {
  return removeDuplicatePatientEntries(entries).join(separator);
}

/**
 * Formaterer én sektion i patientinformationen.
 */
export function formatPatientInformationSection(
  section: PatientInformationSection,
  entries: readonly PatientEntry[],
  options: {
    readonly includeLabel?: boolean;
    readonly entrySeparator?: string;
  } = {},
): string {
  const { includeLabel = true, entrySeparator = " " } = options;

  const content = removeDuplicatePatientEntries(entries)
    .map(ensurePatientSentenceEnding)
    .join(entrySeparator);

  if (!content) {
    return "";
  }

  return includeLabel
    ? `${patientInformationSectionLabels[section]}:\n${content}`
    : content;
}

/**
 * Sammensætter komplet patientinformation i fast rækkefølge.
 *
 * Tomme sektioner udelades automatisk.
 */
export function composePatientInformation(
  sections: PatientInformationSections,
  options: ComposePatientInformationOptions = {},
): string {
  const {
    includeSectionLabels = true,
    sectionSeparator = "\n\n",
    entrySeparator = " ",
    includeGeneralClosing = false,
  } = options;

  const formattedSections = patientInformationSectionOrder
    .map((section) =>
      formatPatientInformationSection(section, sections[section] ?? [], {
        includeLabel: includeSectionLabels,
        entrySeparator,
      }),
    )
    .filter(Boolean);

  if (includeGeneralClosing) {
    formattedSections.push(patientPhrases.practical.contactPractice);
  }

  return formattedSections.join(sectionSeparator).trim();
}

/**
 * Kombinerer en fast frase eller label med en dynamisk værdi.
 */
export function patientPhraseWithValue(
  phrase: string,
  value: string | null | undefined,
): string {
  const normalizedPhrase = normalizePatientText(phrase);
  const normalizedValue = value ? normalizePatientText(value) : "";

  if (!normalizedPhrase || !normalizedValue) {
    return "";
  }

  const separator = normalizedPhrase.endsWith(":") ? " " : ": ";

  return ensurePatientSentenceEnding(
    `${normalizedPhrase}${separator}${normalizedValue}`,
  );
}

/**
 * Sammensætter en læsbar opremsning med kommaer og "eller".
 */
function joinSafetyNetReasons(reasons: readonly string[]): string {
  if (reasons.length === 0) {
    return "";
  }

  if (reasons.length === 1) {
    return reasons[0];
  }

  if (reasons.length === 2) {
    return `${reasons[0]} eller ${reasons[1]}`;
  }

  return `${reasons.slice(0, -1).join(", ")} eller ${
    reasons[reasons.length - 1]
  }`;
}

/**
 * Sammensætter et patientvenligt safety-net.
 *
 * Hastigheden skal være valgt eller bekræftet af lægen.
 */
export function composeSafetyNet(
  reasons: readonly PatientEntry[],
  options: ComposeSafetyNetOptions = {},
): string {
  const uniqueReasons = removeDuplicatePatientEntries(reasons);

  if (uniqueReasons.length === 0) {
    return "";
  }

  const {
    urgency = "routine",
    introduction = "Søg læge igen, hvis",
  } = options;

  const instruction = ensurePatientSentenceEnding(
    `${introduction} ${joinSafetyNetReasons(uniqueReasons)}`,
  );

  return `${instruction} ${patientPhrases.urgency[urgency]}`.trim();
}

/**
 * Returnerer betegnelsen for informationstypen.
 */
export function formatPatientInformationType(
  informationType: PatientInformationType | null | undefined,
): string {
  return informationType
    ? patientPhrases.informationTypes[informationType]
    : "";
}

/**
 * Returnerer standardtekst for opfølgningstidspunkt.
 */
export function formatFollowUpTiming(
  timing: FollowUpTiming | null | undefined,
): string {
  return timing ? patientPhrases.followUpTiming[timing] : "";
}

/**
 * Returnerer standardtekst for anbefalet hastighed.
 *
 * Hastigheden skal være valgt eller bekræftet af lægen.
 */
export function formatUrgencyLevel(
  urgency: UrgencyLevel | null | undefined,
): string {
  return urgency ? patientPhrases.urgency[urgency] : "";
}

/**
 * Kontrollerer, om mindst én sektion indeholder tekst.
 */
export function hasPatientInformationContent(
  sections: PatientInformationSections,
): boolean {
  return patientInformationSectionOrder.some((section) =>
    (sections[section] ?? []).some(isNonEmptyString),
  );
}
