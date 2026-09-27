import type { C3PhraseCategory } from "@/clinical/prototypes/c3/model";
import type { C3SelectablePhrase } from "@/clinical/prototypes/c3/state";

import type {
  C33AccompanyingSymptomId,
  C33ComorbidityChip,
  C33MedicationChip,
  C33RedFlagGroupId,
  C33TraumaMechanismDetail
} from "./model";

export const C33_PHRASE_PACK_ID = "C33-PHRASE-PACK-KNEE-001";
export const C33_PHRASE_PACK_VERSION = "1.0";

/**
 * The five clinician-facing red flag consequence groups (C33-RF-GROUPS-001@1.0).
 * `label` is both the button text and the documented sentence when the group
 * is positive, so the record never says more than what the clinician chose.
 */
export interface C33RedFlagGroup {
  readonly id: C33RedFlagGroupId;
  readonly label: string;
}

export const C33_RED_FLAG_GROUPS: readonly C33RedFlagGroup[] = [
  {
    id: "infection",
    label: "Infektionsrisiko (feber, nylig ledinjektion/operation eller immunsuppression)"
  },
  {
    id: "cannot-bear-weight",
    label: "Kan ikke belaste knæet (fraktur/alvorlig ledskade)"
  },
  {
    id: "rapid-swelling",
    label: "Hurtig hævelse efter traume (hæmartron)"
  },
  {
    id: "malignancy",
    label: "Nattesmerte, uforklaret vægttab eller tidligere cancer (malignitetsmistanke)"
  },
  {
    id: "high-energy-trauma",
    label: "Højenergitraume (kar-/nerveskade, kompleks fraktur)"
  }
] as const;

export const C33_RED_FLAGS_NORMAL_TEXT =
  "Ingen tegn på infektion, fraktur/alvorlig ledskade, hæmartron, malignitetsmistanke eller højenergitraume.";

export type C33ProblemProfileId =
  | "knee-trauma"
  | "knee-atraumatic"
  | "knee-overuse";

export interface C33ProblemProfile {
  readonly id: C33ProblemProfileId;
  readonly label: string;
  readonly searchTerms: readonly string[];
}

export const C33_PROBLEM_PROFILES: readonly C33ProblemProfile[] = [
  {
    id: "knee-trauma",
    label: "Knæsmerter – traume",
    searchTerms: ["knæ", "knæsmerter", "traume", "vrid", "akut"]
  },
  {
    id: "knee-atraumatic",
    label: "Knæsmerter – atraumatisk",
    searchTerms: ["knæ", "knæsmerter", "atraumatisk", "snigende", "gradvis"]
  },
  {
    id: "knee-overuse",
    label: "Knæsmerter – overbelastning",
    searchTerms: ["knæ", "knæsmerter", "overbelastning", "sport", "belastning"]
  }
] as const;

/**
 * Danish/case/hyphen-insensitive, token-order-independent search. Every
 * whitespace/hyphen-separated token in the query must match somewhere in the
 * profile's label or search terms — the order the clinician types them in
 * never matters. A profile only ever configures the flow; matching it never
 * creates a clinical fact.
 */
function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase("da-DK")
    .replace(/[-–—]/gu, " ")
    .trim();
}

export function findMatchingC33ProblemProfiles(
  query: string
): readonly C33ProblemProfile[] {
  const tokens = normalizeSearchText(query).split(/\s+/u).filter(Boolean);
  if (!tokens.length) return [];
  return C33_PROBLEM_PROFILES.filter((problem) => {
    const haystack = normalizeSearchText(
      [problem.label, ...problem.searchTerms].join(" ")
    );
    return tokens.every((token) => haystack.includes(token));
  });
}

export type C33PhraseGroup =
  | "self-care"
  | "plan"
  | "analgesia"
  | "imaging"
  | "referral"
  | "follow-up"
  | "safety-net"
  | "information";

export interface C33Phrase extends C3SelectablePhrase {
  readonly group: C33PhraseGroup;
  /**
   * When true, `text` contains a literal "{side}" token that must be
   * resolved to the clinician's explicitly chosen side (including Bilateral)
   * before the phrase can be selected. The phrase is never offered while
   * side is unknown.
   */
  readonly sideDependent?: boolean;
}

function phrase(
  id: string,
  group: C33PhraseGroup,
  category: C3PhraseCategory,
  text: string,
  sideDependent?: boolean
): C33Phrase {
  return {
    id,
    group,
    category,
    text,
    sideDependent,
    fixtureId: C33_PHRASE_PACK_ID,
    fixtureVersion: C33_PHRASE_PACK_VERSION,
    phraseVersion: "1.0"
  };
}

export const C33_SIDE_TOKEN = "{side}";

const C33_SIDE_LABELS: Record<"right" | "left" | "bilateral", string> = {
  right: "højre",
  left: "venstre",
  bilateral: "begge"
};

/**
 * Resolves the literal "{side}" token in a side-dependent phrase to the
 * clinician's explicitly chosen side, including the grammatically-resolved
 * Bilateral case ("begge knæ"). Returns the unresolved template when no side
 * has been chosen yet, so callers must gate selection separately (see
 * `sideDependent`) rather than ever guessing a side.
 */
export function resolveC33PhraseText(
  phrase: C33Phrase,
  side: "right" | "left" | "bilateral" | undefined
): string {
  return side ? phrase.text.replace(C33_SIDE_TOKEN, C33_SIDE_LABELS[side]) : phrase.text;
}

export const C33_PHRASES: readonly C33Phrase[] = [
  phrase(
    "C33-CARE-001",
    "self-care",
    "plan",
    "Is og let kompression efter behov de første døgn."
  ),
  phrase(
    "C33-CARE-002",
    "self-care",
    "plan",
    "Lette bevægeøvelser og gradvis genoptagelse af aktivitet."
  ),
  phrase("C33-PLAN-001", "plan", "plan", "Fortsat observation af forløbet."),
  phrase("C33-PLAN-002", "plan", "plan", "Belastning tilpasses efter symptomer."),
  phrase("C33-PLAN-003", "plan", "plan", "Midlertidig pause fra sport og provokerende aktivitet."),
  phrase("C33-PAIN-001", "analgesia", "plan", "Rp. paracetamol 1000 mg p.n., maks. x 4."),
  phrase(
    "C33-IMG-001",
    "imaging",
    "plan",
    `Rp. røntgen af ${C33_SIDE_TOKEN} knæ.`,
    true
  ),
  phrase(
    "C33-IMG-002",
    "imaging",
    "plan",
    `MR-scanning af ${C33_SIDE_TOKEN} knæ.`,
    true
  ),
  phrase(
    "C33-REF-001",
    "referral",
    "plan",
    "Henvisning til ortopædkirurgisk vurdering."
  ),
  phrase(
    "C33-REF-002",
    "referral",
    "plan",
    "Henvisning til fysioterapeutisk vurdering."
  ),
  phrase(
    "C33-FU-001",
    "follow-up",
    "follow-up",
    "Kontrol ved vedvarende gener eller tidligere ved forværring."
  ),
  phrase("C33-FU-002", "follow-up", "follow-up", "Kontrol om 1–2 uger."),
  phrase(
    "C33-SN-001",
    "safety-net",
    "safety-net",
    "Søg lægelig vurdering ved forværring, manglende støtteevne, instabilitet eller aflåsning."
  ),
  phrase(
    "C33-SN-002",
    "safety-net",
    "safety-net",
    "Søg akut lægelig vurdering ved feber eller et tiltagende rødt, varmt og hævet knæ."
  ),
  phrase(
    "C33-INFO-001",
    "information",
    "plan",
    "Patienten er informeret og enig i planen."
  )
] as const;

export const C33_TRAUMA_MECHANISM_DETAILS: readonly {
  readonly id: C33TraumaMechanismDetail;
  readonly label: string;
}[] = [
  { id: "twisting", label: "Vrid" },
  { id: "direct-blow", label: "Direkte slag" },
  { id: "hyperextension", label: "Hyperekstension" },
  { id: "valgus-varus", label: "Valgus-/varusbelastning" },
  { id: "landing", label: "Landing fra spring" }
];

export const C33_ACCOMPANYING_SYMPTOMS: readonly {
  readonly id: C33AccompanyingSymptomId;
  readonly label: string;
  readonly sentence: string;
}[] = [
  { id: "crepitus", label: "Krepitation/knasen", sentence: "Krepitation/knasen." },
  {
    id: "morning-stiffness",
    label: "Morgenstivhed <30 min",
    sentence: "Morgenstivhed under 30 minutter."
  },
  {
    id: "snapping-or-clicking",
    label: "Snapping/klik",
    sentence: "Snapping- eller klikfornemmelse."
  },
  { id: "other-joints", label: "Andre led", sentence: "Symptomer også fra andre led." },
  { id: "rash", label: "Udslæt", sentence: "Udslæt." },
  { id: "recent-infection", label: "Nylig infektion", sentence: "Nylig infektion." }
];

export const C33_COMORBIDITY_CHIPS: readonly { readonly id: C33ComorbidityChip; readonly label: string }[] = [
  { id: "osteoarthritis", label: "Artrose" },
  { id: "inflammatory-joint-disease", label: "Inflammatorisk ledsygdom" },
  { id: "diabetes", label: "Diabetes" },
  { id: "immunosuppression", label: "Immunsuppression" },
  { id: "prior-cancer", label: "Tidligere cancer" },
  { id: "coagulation-disorder", label: "Koagulationsforstyrrelse" }
];

export const C33_MEDICATION_CHIPS: readonly { readonly id: C33MedicationChip; readonly label: string }[] = [
  { id: "anticoagulants", label: "Antikoagulantia" },
  { id: "steroids", label: "Steroider" }
];
