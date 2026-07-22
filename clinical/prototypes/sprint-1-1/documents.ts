import { deriveSprintOneOneCompleteness } from "./derivations";
import type { DocumentationLevel, SprintOneOneHistory, SprintOneOneObjective, SprintOneOneState } from "./model";

export interface SprintOneOneJournal {
  readonly text: string;
  readonly missing: readonly string[];
  readonly status: "provisional" | "ready-for-review";
}

const onset = { acute: "akut indsættende", insidious: "snigende indsættende", gradual: "gradvist indsættende" } as const;
const pain = { medial: "mediale", lateral: "laterale", anterior: "forreste", posterior: "bageste", diffuse: "diffuse" } as const;
const course = { constant: "konstante", intermittent: "intermitterende", increasing: "tiltagende", decreasing: "aftagende" } as const;
const provocation = { walking: "gang", stairs: "trappegang", rotation: "rotation", running: "løb", jumping: "hop", "direction-change": "retningsskift" } as const;
const palpation = { "medial-joint-line": "mediale ledlinje", "lateral-joint-line": "laterale ledlinje", mcl: "MCL", lcl: "LCL", patella: "patella", "patellar-tendon": "patellasenen", "quadriceps-tendon": "quadricepssenen", "pes-anserinus": "pes anserinus" } as const;

function clean(value: string | undefined) { const result = value?.trim(); return result || undefined; }
function sentence(value: string) {
  const trimmed = value.trim();
  const capitalized = trimmed ? `${trimmed[0].toLocaleUpperCase("da-DK")}${trimmed.slice(1)}` : trimmed;
  return /[.!?]$/u.test(capitalized) ? capitalized : `${capitalized}.`;
}
function join(values: readonly string[]) { return values.length < 2 ? values[0] ?? "" : values.length === 2 ? `${values[0]} og ${values[1]}` : `${values.slice(0, -1).join(", ")} og ${values.at(-1)}`; }

function historyText(history: SprintOneOneHistory): string[] {
  const result: string[] = [];
  const opening = ["34-årig mand"];
  if (history.onset) opening.push(`med ${onset[history.onset]}`);
  if (history.side) opening.push(`${history.side === "right" ? "højresidige" : "venstresidige"} knæsmerter`);
  if (history.trauma === "yes") opening.push(history.traumaMechanism === "twisting" ? "efter vridtraume" : history.traumaMechanism === "direct-blow" ? "efter direkte traume" : history.traumaMechanism === "fall" ? "efter fald" : "efter traume");
  if (clean(history.traumaContext)) opening.push(clean(history.traumaContext)!);
  if (clean(history.duration)) opening.push(clean(history.duration)!);
  if (opening.length > 1) result.push(sentence(opening.join(" ")));

  const symptoms: string[] = [];
  if (history.painLocation) symptoms.push(`${pain[history.painLocation]} smerter`);
  if (history.painCourse) symptoms.push(`${course[history.painCourse]} smerter`);
  if (history.swelling === "none") symptoms.push("ingen hævelse");
  if (history.swelling === "mild") symptoms.push("let hævelse");
  if (history.swelling === "persistent") symptoms.push("vedvarende hævelse");
  if (history.swelling === "marked") symptoms.push("udtalt hævelse");
  if (symptoms.length) result.push(sentence(join(symptoms)));
  if (clean(history.swellingTiming)) result.push(sentence(`Hævelse ${clean(history.swellingTiming)!}`));

  if (history.provocations.length) result.push(sentence(`Smerterne provokeres ved ${join(history.provocations.map((value) => provocation[value]))}`));
  if (history.function === "unaffected") result.push("Funktionsevnen er upåvirket.");
  if (history.function === "mildly-reduced") result.push("Funktionsevnen er let nedsat.");
  if (history.function === "significantly-reduced") result.push("Funktionsevnen er betydeligt nedsat.");
  if (history.function === "unable-to-bear-weight") result.push("Kan ikke støtte på benet.");

  const mechanical: string[] = [];
  if (history.locking === "no") mechanical.push("ingen ægte aflåsning");
  if (history.locking === "yes") mechanical.push("aflåsning");
  if (history.instability === "no") mechanical.push("ingen instabilitetsfornemmelse");
  if (history.instability === "yes") mechanical.push("instabilitetsfornemmelse");
  if (mechanical.length) result.push(sentence(join(mechanical)));

  const restNight: string[] = [];
  if (history.restPain === "yes") restNight.push("hvilesmerter");
  if (history.restPain === "no") restNight.push("ingen hvilesmerter");
  if (history.nightPain === "yes") restNight.push("nattesmerter");
  if (history.nightPain === "no") restNight.push("ingen nattesmerter");
  if (restNight.length) result.push(sentence(join(restNight)));

  const safety: string[] = [];
  if (history.fever === "yes") safety.push("feber");
  if (history.fever === "no") safety.push("ingen feber");
  if (history.systemicIllness === "yes") safety.push("almen påvirkning");
  if (history.systemicIllness === "no") safety.push("ingen almen påvirkning");
  if (history.redHotSwollenJoint === "yes") safety.push("rødt, varmt og akut hævet knæ");
  if (history.redHotSwollenJoint === "no") safety.push("ikke rødt, varmt eller akut hævet knæ");
  if (safety.length) result.push(sentence(join(safety)));
  return result;
}

function testLabel(label: string, value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (value === "negative") return `${label} negativ`;
  if (value === "positive") return `${label} positiv`;
  if (value === "stable") return `${label} stabil`;
  if (value === "lax") return `laksitet ved ${label}`;
  if (value === "painful-no-laxity") return `smerte uden laksitet ved ${label}`;
  if (value === "not-performed") return `${label} ikke udført`;
  if (value === "not-assessable") return `${label} ikke vurderbar`;
  return undefined;
}

function objectiveText(objective: SprintOneOneObjective, level: DocumentationLevel): string[] {
  const result: string[] = [];
  const basics: string[] = [];
  if (objective.gait === "normal") basics.push("normal gang");
  if (objective.gait === "limp") basics.push("haltende gang");
  if (objective.gait === "unable") basics.push("kan ikke støtte på benet");
  if (objective.inspection === "no-specific-findings") basics.push("inspektion uden særlige fund");
  if (objective.inspection === "swelling") basics.push("synlig hævelse");
  if (objective.inspection === "redness") basics.push("rødme");
  if (objective.inspection === "deformity") basics.push("deformitet");
  if (objective.effusion === "none") basics.push("ingen effusion");
  if (objective.effusion === "mild") basics.push("let effusion");
  if (objective.effusion === "moderate") basics.push("moderat effusion");
  if (objective.effusion === "large") basics.push("stor effusion");
  if (basics.length) result.push(sentence(join(basics)));

  if (objective.extensionDegrees !== undefined && objective.flexionDegrees !== undefined) result.push(`ROM: ekstension ${objective.extensionDegrees}°, fleksion ${objective.flexionDegrees}°.`);
  if (objective.rangeNotAssessable) result.push("ROM ikke vurderbar.");
  if (objective.palpationStatus === "no-focal-tenderness") result.push("Ingen fokal palpationsømhed.");
  if (objective.palpationFindings.length) result.push(sentence(`Palpationsømhed ved ${join(objective.palpationFindings.map((value) => palpation[value]))}`));

  const tests = [testLabel("Lachman", objective.lachman), testLabel("valgusstres", objective.valgus), testLabel("varusstres", objective.varus), testLabel("menisktest", objective.meniscalTest), testLabel("patellatest", objective.patella)].filter((value): value is string => Boolean(value));
  const decisionRelevant = tests.filter((value) => !/negativ|stabil/u.test(value));
  const shownTests = level === "short" ? decisionRelevant : tests;
  if (shownTests.length) result.push(sentence(join(shownTests)));
  if (objective.neurovascular === "normal") result.push("Distal neurovaskulær status normal.");
  if (objective.neurovascular === "abnormal") result.push("Distal neurovaskulær status afvigende.");
  return result;
}

export function generateSprintOneOneJournal(state: SprintOneOneState): SprintOneOneJournal {
  const completeness = deriveSprintOneOneCompleteness(state);
  const history = historyText(state.history);
  const objective = objectiveText(state.objective, state.documentationLevel);
  const assessment = clean(state.assessment);
  const plan = [clean(state.plan.management) && sentence(`Plan: ${clean(state.plan.management)!}`), clean(state.plan.followUp) && sentence(`Opfølgning: ${clean(state.plan.followUp)!}`), clean(state.plan.safetyNet) && sentence(`Safety-net: ${clean(state.plan.safetyNet)!}`)].filter((value): value is string => Boolean(value));

  const sections = state.documentationLevel === "short"
    ? [...history, objective.length ? `Objektivt: ${objective.join(" ")}` : undefined, assessment ? sentence(`Vurdering: ${assessment}`) : undefined, ...plan].filter((value): value is string => Boolean(value))
    : [history.length ? `Anamnese\n${history.join(" ")}` : undefined, objective.length ? `Objektivt\n${objective.join(" ")}` : undefined, assessment ? `Vurdering\n${sentence(assessment)}` : undefined, plan.length ? `Plan\n${plan.join(" ")}` : undefined].filter((value): value is string => Boolean(value));

  if (state.documentationLevel === "extended" && sections.length) sections.push("Bemærkning\nUdvidet prototypeprofil med samme kliniske state og uden automatisk fortolkning.");
  return {
    text: sections.join(state.documentationLevel === "short" ? " " : "\n\n"),
    missing: completeness.domains.filter((domain) => domain.status !== "complete").map((domain) => `${domain.label}: ${domain.missing.join(", ")}`),
    status: completeness.technicallyReady ? "ready-for-review" : "provisional"
  };
}
