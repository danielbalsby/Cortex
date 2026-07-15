import { describe, expect, it } from "vitest";

import { cortexOutputGeneratorRegistry } from "@/clinical/output-generator-registry";
import { kneePainPathway } from "@/clinical/pathways/knee-pain";
import type { ConsultationAnswers } from "@/clinical/types";
import { createInitialAnswers, setConsultationAnswer } from "@/engine/consultation-engine";
import { createEncounter, generateAllOutputs } from "@/engine/encounter-engine";

function update(
  answers: ConsultationAnswers,
  fieldId: string,
  value: string | string[]
) {
  const result = setConsultationAnswer(answers, fieldId, value, kneePainPathway);
  if (!result.accepted) throw new Error(result.issue.message);
  return result.answers;
}

function populatedAnswers(values: Record<string, string | string[]>) {
  let answers = createInitialAnswers(kneePainPathway);
  for (const [fieldId, value] of Object.entries(values)) {
    answers = update(answers, fieldId, value);
  }
  return answers;
}

function outputFor(answers: ConsultationAnswers, outputId: string) {
  const output = generateAllOutputs(
    createEncounter(kneePainPathway, answers),
    cortexOutputGeneratorRegistry
  ).find((item) => item.id === outputId);
  if (!output) throw new Error(`Expected active output "${outputId}".`);
  return output;
}

describe("knee output extraction regressions", () => {
  it("preserves exact PSOAP and X-ray text and readiness", () => {
    const answers = populatedAnswers({
      side: "right",
      onset: "acute",
      duration: "days",
      trauma: "no",
      "weight-bearing": "normal",
      swelling: "none",
      rom: "full",
      assessment: "oa",
      "plan-actions": ["xray"]
    });
    const previousAnswers = structuredClone(answers);

    expect(outputFor(answers, "journal")).toEqual({
      id: "journal",
      kind: "journal",
      title: "PSOAP-journal",
      text: [
        "P: Højresidige knæsmerter.",
        "S: Akut debut. Varighed få dage. Intet traume. Kan belaste.",
        "O: Ingen hævelse. Fuld bevægelighed.",
        "A: Foreneligt med gonartrose.",
        "P: Røntgen bestilles."
      ].join("\n"),
      status: "ready",
      missing: []
    });
    expect(outputFor(answers, "xray-referral")).toEqual({
      id: "xray-referral",
      kind: "xray-referral",
      title: "Røntgenhenvisning – knæ",
      text: "Højre knæ. Atraumatiske gener. Varighed: dage. Kan belaste. Ingen hævelse. Fuld bevægelighed. Klinisk vurdering: gonartrose. Ønskes røntgen af højre knæ med henblik på relevant knogle-/ledpatologi og videre behandlingsplan.",
      status: "ready",
      missing: [],
      rationale:
        "Udkast genereret fra konsultationsdata. Klinisk indikation og lokal billeddiagnostisk vejledning skal bekræftes af lægen."
    });
    expect(answers).toEqual(previousAnswers);
  });

  it("preserves exact physiotherapy text and readiness", () => {
    const answers = populatedAnswers({
      side: "right",
      onset: "acute",
      duration: "days",
      trauma: "no",
      "weight-bearing": "reduced",
      "history-note": "Gangbesvær",
      swelling: "moderate",
      rom: "mild",
      stability: "unstable",
      assessment: "oa",
      "plan-actions": ["physio"]
    });

    expect(outputFor(answers, "physiotherapy-referral")).toEqual({
      id: "physiotherapy-referral",
      kind: "physiotherapy-referral",
      title: "Fysioterapihenvisning",
      text: "Henvises til fysioterapi vedr. højre knæ. Akut. Varighed: dage. Ingen traumatisk debut. Reduceret belastningsevne. Gangbesvær. Moderat hævelse. Let nedsat bevægelighed. Klinisk mistanke om instabilitet. Arbejdsdiagnose: gonartrose. Formål: Ambulant fysioterapi med henblik på smertelindring, funktionsforbedring og gradueret genbelastning.",
      status: "ready",
      missing: [],
      rationale:
        "Udkast genereret fra konsultationsdata. Lokale henvisningskrav og mål for forløbet skal bekræftes af lægen."
    });
  });

  it("preserves exact orthopedic text and readiness", () => {
    const answers = populatedAnswers({
      side: "right",
      trauma: "no",
      "history-note": "Vedvarende funktionspåvirkning",
      swelling: "none",
      assessment: "oa",
      "plan-actions": ["exercise", "referral"]
    });

    expect(outputFor(answers, "orthopedic-referral")).toEqual({
      id: "orthopedic-referral",
      kind: "orthopedic-referral",
      title: "Ortopædkirurgisk henvisning",
      text: [
        "Problem: Højre knæ.",
        "Henvisningsårsag: Gonartrose.",
        "Anamnese: Intet traume. Vedvarende funktionspåvirkning.",
        "Objektivt: Ingen hævelse.",
        "Hidtidige tiltag: Øvelsesvejledning. Henvisning til ortopædkirurgisk vurdering.",
        "Ønske: Ortopædkirurgisk vurdering med henblik på videre udredning og behandlingsmuligheder."
      ].join("\n"),
      status: "ready",
      missing: [],
      rationale:
        "Udkastet er visitationsorienteret, men opfyldelse af aktuelle regionale krav skal kontrolleres før brug."
    });
  });

  it("preserves deterministic missing-information results for incomplete referrals", () => {
    const answers = populatedAnswers({
      "plan-actions": ["physio", "xray", "referral"]
    });

    expect(outputFor(answers, "physiotherapy-referral").missing).toEqual([
      "side",
      "varighed",
      "arbejdsdiagnose eller klinisk vurdering",
      "relevante funktionsoplysninger"
    ]);
    expect(outputFor(answers, "xray-referral").missing).toEqual([
      "side",
      "varighed",
      "klinisk spørgsmål/arbejdsdiagnose"
    ]);
    expect(outputFor(answers, "orthopedic-referral").missing).toEqual([
      "side",
      "klar vurdering/henvisningsårsag",
      "funktionspåvirkning eller supplerende anamnese"
    ]);
  });

  it("keeps pruned and rejected values out of generated output", () => {
    let answers = populatedAnswers({
      trauma: "yes",
      "trauma-mechanism": "twist",
      "trauma-immediate-swelling": "yes",
      "plan-actions": ["xray"]
    });
    answers = update(answers, "trauma", "no");
    const rejected = setConsultationAnswer(answers, "side", "middle", kneePainPathway);

    expect(rejected.accepted).toBe(false);
    expect(rejected.answers).toBe(answers);
    const generatedText = generateAllOutputs(
      createEncounter(kneePainPathway, rejected.answers),
      cortexOutputGeneratorRegistry
    )
      .map((output) => output.text)
      .join("\n");

    expect(generatedText).not.toContain("Traume ved vrid");
    expect(generatedText).not.toContain("Hævelse opstod umiddelbart");
    expect(generatedText).not.toContain("middle");
  });
});
