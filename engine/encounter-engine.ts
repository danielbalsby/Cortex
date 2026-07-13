import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import type { EncounterOutput, EncounterState, OutputKind } from "@/encounter/types";
import { generatePSOAP } from "@/engine/output-engine";

function value(answers: ConsultationAnswers, id: string) {
  return answers[id];
}

function optionLabel(pathway: ClinicalPathway, fieldId: string, selected: string) {
  for (const section of pathway.sections) {
    const field = section.fields.find((item) => item.id === fieldId);
    const option = field?.options?.find((item) => item.value === selected);
    if (option) return option.label;
  }
  return selected;
}

function sentence(value: string) {
  const clean = value.trim().replace(/[.]+$/, "");
  return clean ? `${clean}.` : "";
}

function generateXray(encounter: EncounterState): EncounterOutput {
  const { pathway, answers } = encounter;
  const side = String(value(answers, "side") ?? "");
  const trauma = String(value(answers, "trauma") ?? "");
  const bearing = String(value(answers, "weight-bearing") ?? "");
  const duration = String(value(answers, "duration") ?? "");
  const swelling = String(value(answers, "swelling") ?? "");
  const rom = String(value(answers, "rom") ?? "");
  const assessment = String(value(answers, "assessment") ?? "");
  const extra = String(value(answers, "history-note") ?? "").trim();

  const missing: string[] = [];
  if (!side) missing.push("side");
  if (!duration) missing.push("varighed");
  if (!assessment || assessment === "uncertain") missing.push("klinisk spørgsmål/arbejdsdiagnose");

  const sideLabel = optionLabel(pathway, "side", side).toLowerCase();
  const parts = [
    `${optionLabel(pathway, "side", side)} knæ.`,
    trauma === "yes" ? "Forudgående traume." : "Atraumatiske gener.",
    optionLabel(pathway, "duration", duration) ? `Varighed: ${optionLabel(pathway, "duration", duration).toLowerCase()}.` : "",
    bearing === "none" ? "Kan ikke støtte på benet." : bearing === "reduced" ? "Reduceret belastningsevne." : "Kan belaste.",
    swelling !== "none" ? `${optionLabel(pathway, "swelling", swelling)} hævelse.` : "Ingen hævelse.",
    rom === "full" ? "Fuld bevægelighed." : `${optionLabel(pathway, "rom", rom)} bevægelighed.`,
    extra ? sentence(extra) : "",
    assessment && assessment !== "uncertain"
      ? `Klinisk vurdering: ${optionLabel(pathway, "assessment", assessment).toLowerCase()}.`
      : "",
    `Ønskes røntgen af ${sideLabel} knæ med henblik på relevant knogle-/ledpatologi og videre behandlingsplan.`
  ].filter(Boolean);

  return {
    kind: "xray",
    title: "Røntgenhenvisning – knæ",
    text: parts.join(" "),
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale: "Udkast genereret fra konsultationsdata. Klinisk indikation og lokal billeddiagnostisk vejledning skal bekræftes af lægen."
  };
}

function generateOrthopedicReferral(encounter: EncounterState): EncounterOutput {
  const { pathway, answers } = encounter;
  const assessment = String(value(answers, "assessment") ?? "");
  const actions = (value(answers, "plan-actions") as string[]) ?? [];
  const extra = String(value(answers, "history-note") ?? "").trim();
  const missing: string[] = [];

  if (!assessment || assessment === "uncertain") missing.push("klar vurdering/henvisningsårsag");
  if (!extra) missing.push("funktionspåvirkning eller supplerende anamnese");
  if (!actions.some((item) => ["exercise", "analgesia", "physio"].includes(item))) {
    missing.push("afprøvet konservativ behandling og effekt");
  }

  const history = pathway.sections.find((s) => s.kind === "history");
  const objective = pathway.sections.find((s) => s.kind === "objective");
  const historyText = history ? history.fields.map((f) => {
    const selected = answers[f.id];
    if (Array.isArray(selected)) return "";
    if (!selected) return "";
    if (f.type === "short-text") return sentence(String(selected));
    return f.options?.find((o) => o.value === selected)?.output ?? "";
  }).filter(Boolean).join(" ") : "";
  const objectiveText = objective ? objective.fields.map((f) => {
    const selected = answers[f.id];
    if (!selected || Array.isArray(selected)) return "";
    return f.options?.find((o) => o.value === selected)?.output ?? "";
  }).filter(Boolean).join(" ") : "";

  const treatment = actions
    .map((selected) => pathway.sections
      .flatMap((s) => s.fields)
      .find((f) => f.id === "plan-actions")?.options?.find((o) => o.value === selected)?.output ?? "")
    .filter(Boolean)
    .join(" ");

  const text = [
    `Henvisningsårsag: ${assessment && assessment !== "uncertain" ? optionLabel(pathway, "assessment", assessment) : "Vedvarende knægener til videre vurdering"}.`,
    `Anamnese: ${historyText}`,
    `Objektivt: ${objectiveText}`,
    treatment ? `Hidtidige tiltag: ${treatment}` : "Hidtidige tiltag: Ikke tilstrækkeligt beskrevet.",
    "Ønske: Ortopædkirurgisk vurdering med henblik på videre udredning og behandlingsmuligheder."
  ].join("\n");

  return {
    kind: "orthopedic-referral",
    title: "Ortopædkirurgisk henvisning",
    text,
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale: "Udkastet er visitationsorienteret, men opfyldelse af aktuelle regionale krav skal kontrolleres før brug."
  };
}

export function createEncounter(pathway: ClinicalPathway, answers: ConsultationAnswers): EncounterState {
  const now = new Date().toISOString();
  return {
    id: `encounter-${Date.now()}`,
    pathway,
    answers,
    startedAt: now,
    updatedAt: now
  };
}

export function generateEncounterOutput(encounter: EncounterState, kind: OutputKind): EncounterOutput {
  if (kind === "journal") {
    return {
      kind,
      title: "PSOAP-journal",
      text: generatePSOAP(encounter.pathway, encounter.answers),
      status: "ready",
      missing: []
    };
  }
  if (kind === "xray") return generateXray(encounter);
  return generateOrthopedicReferral(encounter);
}

export function generateAllOutputs(encounter: EncounterState): EncounterOutput[] {
  return [
    generateEncounterOutput(encounter, "journal"),
    generateEncounterOutput(encounter, "xray"),
    generateEncounterOutput(encounter, "orthopedic-referral")
  ];
}
