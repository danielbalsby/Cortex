import type { ClinicalOutputDefinition, ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import type { EncounterOutput, EncounterState } from "@/encounter/types";
import { generatePSOAP } from "@/engine/output-engine";
import { getActiveOutputs } from "@/engine/output-visibility-engine";

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

function generateJournal(encounter: EncounterState): EncounterOutput {
  const text = generatePSOAP(encounter.pathway, encounter.answers);
  const { answers } = encounter;
  const missing: string[] = [];
  const recordedAnswerCount = Object.values(answers).filter((answer) =>
    Array.isArray(answer) ? answer.length > 0 : Boolean(answer.trim())
  ).length;

  const hasProblemDescription = Boolean(
    answers.side && (answers.onset || answers.duration || answers["history-note"])
  );

  if (!hasProblemDescription) missing.push("klinisk problem, side og forløb");
  if (!answers.assessment) missing.push("arbejdsdiagnose eller klinisk vurdering");
  if (!text.trim() || recordedAnswerCount < 3) {
    missing.push("tilstrækkeligt klinisk indhold");
  }

  return {
    id: "",
    kind: "journal",
    title: "PSOAP-journal",
    text,
    status: missing.length ? "missing-data" : "ready",
    missing
  };
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

  const sideLabel = side ? optionLabel(pathway, "side", side).toLowerCase() : "";
  const parts = [
    side ? `${optionLabel(pathway, "side", side)} knæ.` : "",
    trauma === "yes" ? "Forudgående traume." : trauma === "no" ? "Atraumatiske gener." : "",
    optionLabel(pathway, "duration", duration)
      ? `Varighed: ${optionLabel(pathway, "duration", duration).toLowerCase()}.`
      : "",
    bearing === "none"
      ? "Kan ikke støtte på benet."
      : bearing === "reduced"
        ? "Reduceret belastningsevne."
        : bearing === "normal" ? "Kan belaste." : "",
    swelling ? (swelling === "none" ? "Ingen hævelse." : `${optionLabel(pathway, "swelling", swelling)} hævelse.`) : "",
    rom ? (rom === "full" ? "Fuld bevægelighed." : `${optionLabel(pathway, "rom", rom)} bevægelighed.`) : "",
    extra ? sentence(extra) : "",
    assessment && assessment !== "uncertain"
      ? `Klinisk vurdering: ${optionLabel(pathway, "assessment", assessment).toLowerCase()}.`
      : "",
    sideLabel
      ? `Ønskes røntgen af ${sideLabel} knæ med henblik på relevant knogle-/ledpatologi og videre behandlingsplan.`
      : "Ønskes røntgen af knæ med henblik på relevant knogle-/ledpatologi og videre behandlingsplan."
  ].filter(Boolean);

  return {
    id: "",
    kind: "xray-referral",
    title: "Røntgenhenvisning – knæ",
    text: parts.join(" "),
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale:
      "Udkast genereret fra konsultationsdata. Klinisk indikation og lokal billeddiagnostisk vejledning skal bekræftes af lægen."
  };
}

function generatePhysiotherapyReferral(encounter: EncounterState): EncounterOutput {
  const { pathway, answers } = encounter;
  const side = String(value(answers, "side") ?? "");
  const onset = String(value(answers, "onset") ?? "");
  const duration = String(value(answers, "duration") ?? "");
  const trauma = String(value(answers, "trauma") ?? "");
  const bearing = String(value(answers, "weight-bearing") ?? "");
  const swelling = String(value(answers, "swelling") ?? "");
  const rom = String(value(answers, "rom") ?? "");
  const stability = String(value(answers, "stability") ?? "");
  const assessment = String(value(answers, "assessment") ?? "");
  const extra = String(value(answers, "history-note") ?? "").trim();
  const actions = (value(answers, "plan-actions") as string[]) ?? [];

  const missing: string[] = [];
  if (!side) missing.push("side");
  if (!duration) missing.push("varighed");
  if (!assessment || assessment === "uncertain") {
    missing.push("arbejdsdiagnose eller klinisk vurdering");
  }
  if (!extra && (!bearing || bearing === "normal")) {
    missing.push("relevante funktionsoplysninger");
  }
  if (!actions.includes("physio")) {
    missing.push("henvisningsformål i plan");
  }

  const parts = [
    side ? `Henvises til fysioterapi vedr. ${optionLabel(pathway, "side", side).toLowerCase()} knæ.` : "Henvises til fysioterapi vedr. knæ.",
    onset ? `${optionLabel(pathway, "onset", onset)}.` : "",
    duration ? `Varighed: ${optionLabel(pathway, "duration", duration).toLowerCase()}.` : "",
    trauma === "yes" ? "Forudgående traume." : trauma === "no" ? "Ingen traumatisk debut." : "",
    bearing === "none"
      ? "Kan ikke støtte på benet."
      : bearing === "reduced"
        ? "Reduceret belastningsevne."
        : bearing === "normal" ? "Kan belaste." : "",
    extra ? sentence(extra) : "",
    swelling && swelling !== "none" ? `${optionLabel(pathway, "swelling", swelling)} hævelse.` : "",
    rom && rom !== "full" ? `${optionLabel(pathway, "rom", rom)} bevægelighed.` : "",
    stability === "unstable" ? "Klinisk mistanke om instabilitet." : "",
    assessment && assessment !== "uncertain"
      ? `Arbejdsdiagnose: ${optionLabel(pathway, "assessment", assessment).toLowerCase()}.`
      : "",
    "Formål: Ambulant fysioterapi med henblik på smertelindring, funktionsforbedring og gradueret genbelastning."
  ].filter(Boolean);

  return {
    id: "",
    kind: "physiotherapy-referral",
    title: "Fysioterapihenvisning",
    text: parts.join(" "),
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale:
      "Udkast genereret fra konsultationsdata. Lokale henvisningskrav og mål for forløbet skal bekræftes af lægen."
  };
}

function generateOrthopedicReferral(encounter: EncounterState): EncounterOutput {
  const { pathway, answers } = encounter;
  const side = String(value(answers, "side") ?? "");
  const assessment = String(value(answers, "assessment") ?? "");
  const actions = (value(answers, "plan-actions") as string[]) ?? [];
  const extra = String(value(answers, "history-note") ?? "").trim();
  const missing: string[] = [];

  if (!side) missing.push("side");
  if (!assessment || assessment === "uncertain") missing.push("klar vurdering/henvisningsårsag");
  if (!extra) missing.push("funktionspåvirkning eller supplerende anamnese");
  if (!actions.some((item) => ["exercise", "analgesia", "physio"].includes(item))) {
    missing.push("afprøvet konservativ behandling og effekt");
  }

  const history = pathway.sections.find((s) => s.kind === "history");
  const objective = pathway.sections.find((s) => s.kind === "objective");
  const historyText = history
    ? history.fields
        .map((f) => {
          const selected = answers[f.id];
          if (Array.isArray(selected)) return "";
          if (!selected) return "";
          if (f.type === "short-text") return sentence(String(selected));
          return f.options?.find((o) => o.value === selected)?.output ?? "";
        })
        .filter(Boolean)
        .join(" ")
    : "";
  const objectiveText = objective
    ? objective.fields
        .map((f) => {
          const selected = answers[f.id];
          if (!selected || Array.isArray(selected)) return "";
          return f.options?.find((o) => o.value === selected)?.output ?? "";
        })
        .filter(Boolean)
        .join(" ")
    : "";

  const treatment = actions
    .map(
      (selected) =>
        pathway.sections
          .flatMap((s) => s.fields)
          .find((f) => f.id === "plan-actions")
          ?.options?.find((o) => o.value === selected)?.output ?? ""
    )
    .filter(Boolean)
    .join(" ");

  const text = [
    side ? `Problem: ${optionLabel(pathway, "side", side)} knæ.` : "",
    assessment && assessment !== "uncertain"
      ? `Henvisningsårsag: ${optionLabel(pathway, "assessment", assessment)}.`
      : "",
    `Anamnese: ${historyText}`,
    `Objektivt: ${objectiveText}`,
    treatment ? `Hidtidige tiltag: ${treatment}` : "Hidtidige tiltag: Ikke tilstrækkeligt beskrevet.",
    "Ønske: Ortopædkirurgisk vurdering med henblik på videre udredning og behandlingsmuligheder."
  ].join("\n");

  return {
    id: "",
    kind: "orthopedic-referral",
    title: "Ortopædkirurgisk henvisning",
    text,
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale:
      "Udkastet er visitationsorienteret, men opfyldelse af aktuelle regionale krav skal kontrolleres før brug."
  };
}

function generateOutputBody(
  encounter: EncounterState,
  definition: ClinicalOutputDefinition
): EncounterOutput {
  switch (definition.type) {
    case "journal":
      return generateJournal(encounter);
    case "xray-referral":
      return generateXray(encounter);
    case "physiotherapy-referral":
      return generatePhysiotherapyReferral(encounter);
    case "orthopedic-referral":
      return generateOrthopedicReferral(encounter);
  }
}

export function createEncounter(pathway: ClinicalPathway, answers: ConsultationAnswers): EncounterState {
  return {
    pathway,
    answers
  };
}

export function generateEncounterOutput(
  encounter: EncounterState,
  definition: ClinicalOutputDefinition
): EncounterOutput {
  const output = generateOutputBody(encounter, definition);
  return {
    ...output,
    id: definition.id,
    title: definition.label
  };
}

export function generateAllOutputs(encounter: EncounterState): EncounterOutput[] {
  return getActiveOutputs(encounter.pathway, encounter.answers).map((definition) =>
    generateEncounterOutput(encounter, definition)
  );
}
