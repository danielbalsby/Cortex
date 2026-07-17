export type PrototypeMode = "quick" | "standard";
export type PrototypeScenarioId = "acute-twist" | "gradual-oa";

export interface PrototypeFacts {
  side?: "right" | "left" | "bilateral";
  problem?: "pain" | "injury";
  onset?: "acute" | "gradual";
  duration?: string;
  precipitatingFactor?: "trauma" | "none";
  mechanism?: "twist";
  painLocation?: "medial" | "diffuse";
  painPatterns?: string[];
  function?: "normal" | "limp" | "cannot-four-steps";
  swelling?: "none" | "delayed-mild" | "persistent-mild";
  locking?: "no" | "yes";
  fever?: "no" | "yes";
  gait?: "normal" | "limp";
  deformity?: "none" | "present";
  redness?: "none" | "present";
  warmth?: "none" | "present";
  effusion?: "none-significant" | "mild" | "moderate";
  extension?: "full" | "reduced";
  straightLegRaise?: "intact" | "not-intact";
  tenderness?: "medial-joint-line";
  assessment?: string;
  plan?: string[];
  historyNote?: string;
  objectiveNote?: string;
}

export interface ClinicalDocumentPrototypeState {
  mode: PrototypeMode;
  scenarioId?: PrototypeScenarioId;
  normalGroupConfirmed: boolean;
  facts: PrototypeFacts;
}

export interface NormalFindingDefinition {
  key: keyof PrototypeFacts;
  label: string;
  normalValue: string;
}

export interface PrototypeSuggestion {
  id: string;
  label: string;
  reason: string;
}

export interface PrototypeAttentionPoint {
  id: string;
  title: string;
  detail: string;
}

export const NORMAL_BASIC_FINDINGS: readonly NormalFindingDefinition[] = [
  { key: "gait", label: "Normal gang", normalValue: "normal" },
  { key: "deformity", label: "Ingen deformitet", normalValue: "none" },
  { key: "redness", label: "Ingen rødme", normalValue: "none" },
  { key: "warmth", label: "Ingen varmeøgning", normalValue: "none" },
  { key: "effusion", label: "Ingen betydende effusion", normalValue: "none-significant" },
  { key: "extension", label: "Fuld ekstension", normalValue: "full" },
  { key: "straightLegRaise", label: "Intakt straight-leg raise", normalValue: "intact" }
];

export const PROTOTYPE_SCENARIOS: Record<
  PrototypeScenarioId,
  { label: string; description: string; state: ClinicalDocumentPrototypeState }
> = {
  "acute-twist": {
    label: "Akut vridtraume",
    description: "Højre knæ efter vrid under fodbold.",
    state: {
      mode: "standard",
      scenarioId: "acute-twist",
      normalGroupConfirmed: false,
      facts: {
        side: "right",
        problem: "injury",
        onset: "acute",
        duration: "siden i går",
        precipitatingFactor: "trauma",
        mechanism: "twist",
        painLocation: "medial",
        function: "cannot-four-steps",
        swelling: "delayed-mild",
        locking: "no",
        fever: "no",
        gait: "limp",
        effusion: "mild",
        extension: "reduced",
        straightLegRaise: "intact",
        tenderness: "medial-joint-line"
      }
    }
  },
  "gradual-oa": {
    label: "Gradvis belastningssmerte",
    description: "Seks måneders højresidige, belastningsrelaterede smerter.",
    state: {
      mode: "quick",
      scenarioId: "gradual-oa",
      normalGroupConfirmed: false,
      facts: {
        side: "right",
        problem: "pain",
        onset: "gradual",
        duration: "gennem seks måneder",
        precipitatingFactor: "none",
        painLocation: "medial",
        painPatterns: ["load-related", "stairs", "start-up"],
        function: "limp",
        swelling: "persistent-mild",
        locking: "no",
        fever: "no",
        gait: "limp",
        effusion: "mild",
        extension: "full",
        straightLegRaise: "intact",
        tenderness: "medial-joint-line"
      }
    }
  }
};

export function createEmptyPrototypeState(): ClinicalDocumentPrototypeState {
  return {
    mode: "quick",
    normalGroupConfirmed: false,
    facts: {}
  };
}

export function selectPrototypeScenario(
  scenarioId: PrototypeScenarioId
): ClinicalDocumentPrototypeState {
  return structuredClone(PROTOTYPE_SCENARIOS[scenarioId].state);
}

export function setPrototypeMode(
  state: ClinicalDocumentPrototypeState,
  mode: PrototypeMode
): ClinicalDocumentPrototypeState {
  return { ...state, mode };
}

export function setPrototypeFact<K extends keyof PrototypeFacts>(
  state: ClinicalDocumentPrototypeState,
  key: K,
  value: PrototypeFacts[K] | undefined
): ClinicalDocumentPrototypeState {
  const facts = { ...state.facts };
  if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
    delete facts[key];
  } else {
    facts[key] = value;
  }
  return { ...state, facts };
}

export function togglePrototypeListFact(
  state: ClinicalDocumentPrototypeState,
  key: "painPatterns" | "plan",
  value: string
): ClinicalDocumentPrototypeState {
  const current = state.facts[key] ?? [];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return setPrototypeFact(state, key, next);
}

export function confirmNormalBasicFindings(
  state: ClinicalDocumentPrototypeState
): ClinicalDocumentPrototypeState {
  const facts = { ...state.facts } as Record<string, unknown>;
  for (const finding of NORMAL_BASIC_FINDINGS) {
    const current = facts[finding.key];
    if (current === undefined || current === finding.normalValue) {
      facts[finding.key] = finding.normalValue;
    }
  }
  return {
    ...state,
    normalGroupConfirmed: true,
    facts: facts as PrototypeFacts
  };
}

export function clearNormalBasicFindings(
  state: ClinicalDocumentPrototypeState
): ClinicalDocumentPrototypeState {
  const facts = { ...state.facts } as Record<string, unknown>;
  for (const finding of NORMAL_BASIC_FINDINGS) {
    if (facts[finding.key] === finding.normalValue) delete facts[finding.key];
  }
  return {
    ...state,
    normalGroupConfirmed: false,
    facts: facts as PrototypeFacts
  };
}

export function getNormalFindingStatus(
  state: ClinicalDocumentPrototypeState,
  finding: NormalFindingDefinition
): "pending" | "confirmed" | "overridden" {
  if (!state.normalGroupConfirmed) return "pending";
  const current = state.facts[finding.key];
  if (current === finding.normalValue) return "confirmed";
  return current === undefined ? "pending" : "overridden";
}

export function getPrototypeSuggestions(
  state: ClinicalDocumentPrototypeState
): { primary: PrototypeSuggestion[]; additional: PrototypeSuggestion[] } {
  if (!state.scenarioId) return { primary: [], additional: [] };
  if (state.scenarioId === "acute-twist") {
    return {
      primary: [
        {
          id: "meniscus",
          label: "Meniskrelaterede gener",
          reason: "Vridtraume og medial ledlinjeømhed er registreret."
        },
        {
          id: "sprain",
          label: "Knæforstuvning",
          reason: "Akut traumatisk debut er registreret."
        },
        {
          id: "ligament",
          label: "Ligamentskade",
          reason: "Traumemekanismen gør målrettet vurdering relevant."
        }
      ],
      additional: [
        {
          id: "nonspecific",
          label: "Uspecifikke knæsmerter",
          reason: "Kan vælges manuelt, hvis fundene ikke støtter en mere præcis vurdering."
        }
      ]
    };
  }
  return {
    primary: [
      {
        id: "oa",
        label: "Knæartrose",
        reason: "Gradvis, længerevarende belastningsrelateret smerte er registreret."
      },
      {
        id: "meniscus",
        label: "Meniskrelaterede gener",
        reason: "Medial smerte og ledlinjeømhed er registreret."
      },
      {
        id: "patellofemoral",
        label: "Patellofemorale smerter",
        reason: "Belastningsmønsteret kan vurderes i den kliniske kontekst."
      }
    ],
    additional: [
      {
        id: "nonspecific",
        label: "Uspecifikke knæsmerter",
        reason: "Kan vælges manuelt, hvis fundene ikke støtter en mere præcis vurdering."
      }
    ]
  };
}

export function getPrototypeAttentionPoints(
  state: ClinicalDocumentPrototypeState
): PrototypeAttentionPoint[] {
  const points: PrototypeAttentionPoint[] = [];
  const { facts } = state;
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
      detail: "Reel aflåsning er registreret og bør vurderes i den kliniske kontekst."
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

const SIDE_TEXT = {
  right: "Højresidige",
  left: "Venstresidige",
  bilateral: "Bilaterale"
} as const;

const PLAN_TEXT: Record<string, string> = {
  information: "Vurdering og forventet forløb er gennemgået.",
  activity: "Midlertidig reduktion af symptomprovokerende aktivitet er aftalt.",
  exercise: "Gradueret træning er drøftet.",
  physiotherapy: "Fysioterapi overvejes.",
  imaging: "Billeddiagnostik overvejes; indikation og klinisk spørgsmål skal afklares.",
  followup: "Klinisk opfølgning er planlagt."
};

function problemLine(facts: PrototypeFacts) {
  if (!facts.side && !facts.problem) return "";
  const problem = facts.problem === "injury" ? "knæskade" : facts.problem === "pain" ? "knæsmerter" : "knæproblem";
  return facts.side ? `${SIDE_TEXT[facts.side]} ${problem}.` : `${problem[0].toUpperCase()}${problem.slice(1)}.`;
}

function historyLine(facts: PrototypeFacts) {
  const parts: string[] = [];
  if (facts.onset === "acute") parts.push("Akut debut");
  if (facts.onset === "gradual") parts.push("Gradvis debut");
  if (facts.duration) parts.push(facts.duration);
  if (facts.precipitatingFactor === "trauma") {
    parts.push(facts.mechanism === "twist" ? "efter vridtraume" : "efter traume");
  }
  if (facts.precipitatingFactor === "none") parts.push("uden forudgående traume");
  if (facts.painLocation === "medial") parts.push("medialt lokaliserede smerter");
  if (facts.painLocation === "diffuse") parts.push("diffuse smerter");
  const patterns = facts.painPatterns ?? [];
  if (patterns.includes("load-related")) parts.push("belastningsrelaterede smerter");
  if (patterns.includes("stairs")) parts.push("gener ved trappegang");
  if (patterns.includes("start-up")) parts.push("kortvarig igangsætningsstivhed");
  if (facts.function === "limp") parts.push("let halten");
  if (facts.function === "cannot-four-steps") parts.push("kan ikke tage fire vægtbærende skridt");
  if (facts.swelling === "delayed-mild") parts.push("let hævelse udviklet efterfølgende");
  if (facts.swelling === "persistent-mild") parts.push("vedvarende let hævelse");
  if (facts.swelling === "none") parts.push("ingen hævelse");
  if (facts.locking === "no") parts.push("ingen reel aflåsning");
  if (facts.locking === "yes") parts.push("reel aflåsning");
  if (facts.fever === "no") parts.push("ingen feber");
  if (facts.fever === "yes") parts.push("feber");
  if (facts.historyNote) parts.push(facts.historyNote.trim());
  if (!parts.length) return "";
  return `${parts.join(", ")}.`;
}

function objectiveLine(facts: PrototypeFacts) {
  const parts: string[] = [];
  if (facts.gait === "normal") parts.push("Normal gang");
  if (facts.gait === "limp") parts.push("Haltende gang");
  if (facts.deformity === "none") parts.push("ingen deformitet");
  if (facts.deformity === "present") parts.push("deformitet");
  if (facts.redness === "none") parts.push("ingen rødme");
  if (facts.redness === "present") parts.push("rødme");
  if (facts.warmth === "none") parts.push("ingen varmeøgning");
  if (facts.warmth === "present") parts.push("varmeøgning");
  if (facts.effusion === "none-significant") parts.push("ingen betydende effusion");
  if (facts.effusion === "mild") parts.push("let effusion");
  if (facts.effusion === "moderate") parts.push("moderat effusion");
  if (facts.extension === "full") parts.push("fuld ekstension");
  if (facts.extension === "reduced") parts.push("nedsat ekstension");
  if (facts.straightLegRaise === "intact") parts.push("intakt straight-leg raise");
  if (facts.straightLegRaise === "not-intact") parts.push("straight-leg raise ikke intakt");
  if (facts.tenderness === "medial-joint-line") parts.push("medial ledlinjeømhed");
  if (facts.objectiveNote) parts.push(facts.objectiveNote.trim());
  if (!parts.length) return "";
  return `${parts.join(", ")}.`;
}

export function generatePrototypeNote(state: ClinicalDocumentPrototypeState): string {
  const sections = [
    ["Problem", problemLine(state.facts)],
    ["Anamnese", historyLine(state.facts)],
    ["Objektivt", objectiveLine(state.facts)],
    ["Vurdering", state.facts.assessment ? `${state.facts.assessment}.` : ""],
    [
      "Plan",
      (state.facts.plan ?? []).map((item) => PLAN_TEXT[item]).filter(Boolean).join(" ")
    ]
  ];
  return sections
    .filter(([, text]) => Boolean(text))
    .map(([heading, text]) => `${heading}\n${text}`)
    .join("\n\n");
}

export function getPrototypeHeading(state: ClinicalDocumentPrototypeState): string {
  const line = problemLine(state.facts);
  return line ? line.replace(/\.$/, "") : "Knækonsultation";
}
