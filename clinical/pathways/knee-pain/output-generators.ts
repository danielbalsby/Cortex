import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import type {
  GeneratedOutputContent,
  OutputGeneratorRegistration
} from "@/engine/output-generator-registry";
import { createPsoapOutputGenerator } from "@/engine/output-generators/psoap-generator";

function value(answers: ConsultationAnswers, id: string) {
  return answers[id];
}

export class KneeOutputGeneratorContractError extends Error {
  readonly code = "knee-output.invalid-option";

  constructor(
    readonly fieldId: string,
    readonly optionValue: string
  ) {
    super(`Knee output generator received unknown option "${optionValue}" for field "${fieldId}".`);
    this.name = "KneeOutputGeneratorContractError";
  }
}

function optionLabel(pathway: ClinicalPathway, fieldId: string, selected: string) {
  for (const section of pathway.sections) {
    const field = section.fields.find((item) => item.id === fieldId);
    const option = field?.options?.find((item) => item.value === selected);
    if (option) return option.label;
  }
  throw new KneeOutputGeneratorContractError(fieldId, selected);
}

function sentence(value: string) {
  const clean = value.trim().replace(/[.]+$/, "");
  return clean ? `${clean}.` : "";
}

const psoapOutputGenerator = createPsoapOutputGenerator(
  "core.psoap",
  ({ answers, text }) => {
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
      status: missing.length ? "missing-data" : "ready",
      missing
    };
  }
);

function generateXray(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): GeneratedOutputContent {
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
  if (!assessment || assessment === "uncertain") {
    missing.push("klinisk spørgsmål/arbejdsdiagnose");
  }

  const sideLabel = side ? optionLabel(pathway, "side", side).toLowerCase() : "";
  const parts = [
    side ? `${optionLabel(pathway, "side", side)} knæ.` : "",
    trauma === "yes" ? "Forudgående traume." : trauma === "no" ? "Atraumatiske gener." : "",
    duration
      ? `Varighed: ${optionLabel(pathway, "duration", duration).toLowerCase()}.`
      : "",
    bearing === "none"
      ? "Kan ikke støtte på benet."
      : bearing === "reduced"
        ? "Reduceret belastningsevne."
        : bearing === "normal" ? "Kan belaste." : "",
    swelling
      ? swelling === "none"
        ? "Ingen hævelse."
        : `${optionLabel(pathway, "swelling", swelling)} hævelse.`
      : "",
    rom
      ? rom === "full"
        ? "Fuld bevægelighed."
        : `${optionLabel(pathway, "rom", rom)} bevægelighed.`
      : "",
    extra ? sentence(extra) : "",
    assessment && assessment !== "uncertain"
      ? `Klinisk vurdering: ${optionLabel(pathway, "assessment", assessment).toLowerCase()}.`
      : "",
    sideLabel
      ? `Ønskes røntgen af ${sideLabel} knæ med henblik på relevant knogle-/ledpatologi og videre behandlingsplan.`
      : "Ønskes røntgen af knæ med henblik på relevant knogle-/ledpatologi og videre behandlingsplan."
  ].filter(Boolean);

  return {
    text: parts.join(" "),
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale:
      "Udkast genereret fra konsultationsdata. Klinisk indikation og lokal billeddiagnostisk vejledning skal bekræftes af lægen."
  };
}

function generatePhysiotherapyReferral(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): GeneratedOutputContent {
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
    side
      ? `Henvises til fysioterapi vedr. ${optionLabel(pathway, "side", side).toLowerCase()} knæ.`
      : "Henvises til fysioterapi vedr. knæ.",
    onset ? `${optionLabel(pathway, "onset", onset)}.` : "",
    duration ? `Varighed: ${optionLabel(pathway, "duration", duration).toLowerCase()}.` : "",
    trauma === "yes" ? "Forudgående traume." : trauma === "no" ? "Ingen traumatisk debut." : "",
    bearing === "none"
      ? "Kan ikke støtte på benet."
      : bearing === "reduced"
        ? "Reduceret belastningsevne."
        : bearing === "normal" ? "Kan belaste." : "",
    extra ? sentence(extra) : "",
    swelling && swelling !== "none"
      ? `${optionLabel(pathway, "swelling", swelling)} hævelse.`
      : "",
    rom && rom !== "full" ? `${optionLabel(pathway, "rom", rom)} bevægelighed.` : "",
    stability === "unstable" ? "Klinisk mistanke om instabilitet." : "",
    assessment && assessment !== "uncertain"
      ? `Arbejdsdiagnose: ${optionLabel(pathway, "assessment", assessment).toLowerCase()}.`
      : "",
    "Formål: Ambulant fysioterapi med henblik på smertelindring, funktionsforbedring og gradueret genbelastning."
  ].filter(Boolean);

  return {
    text: parts.join(" "),
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale:
      "Udkast genereret fra konsultationsdata. Lokale henvisningskrav og mål for forløbet skal bekræftes af lægen."
  };
}

function generateOrthopedicReferral(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): GeneratedOutputContent {
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

  const history = pathway.sections.find((section) => section.kind === "history");
  const objective = pathway.sections.find((section) => section.kind === "objective");
  const historyText = history
    ? history.fields
        .map((field) => {
          const selected = answers[field.id];
          if (Array.isArray(selected) || !selected) return "";
          if (field.type === "short-text") return sentence(String(selected));
          return field.options?.find((option) => option.value === selected)?.output ?? "";
        })
        .filter(Boolean)
        .join(" ")
    : "";
  const objectiveText = objective
    ? objective.fields
        .map((field) => {
          const selected = answers[field.id];
          if (!selected || Array.isArray(selected)) return "";
          return field.options?.find((option) => option.value === selected)?.output ?? "";
        })
        .filter(Boolean)
        .join(" ")
    : "";

  const treatment = actions
    .map(
      (selected) =>
        pathway.sections
          .flatMap((section) => section.fields)
          .find((field) => field.id === "plan-actions")
          ?.options?.find((option) => option.value === selected)?.output ?? ""
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
    text,
    status: missing.length ? "missing-data" : "ready",
    missing,
    rationale:
      "Udkastet er visitationsorienteret, men opfyldelse af aktuelle regionale krav skal kontrolleres før brug."
  };
}

export const kneeOutputGenerators: readonly OutputGeneratorRegistration[] = [
  psoapOutputGenerator,
  {
    id: "knee.physiotherapy-referral",
    generate: ({ pathway, answers }) => generatePhysiotherapyReferral(pathway, answers)
  },
  {
    id: "knee.xray-referral",
    generate: ({ pathway, answers }) => generateXray(pathway, answers)
  },
  {
    id: "knee.orthopedic-referral",
    generate: ({ pathway, answers }) => generateOrthopedicReferral(pathway, answers)
  }
];
