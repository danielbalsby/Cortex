import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { cortexOutputGeneratorRegistry } from "@/clinical/output-generator-registry";
import { kneePainPathway } from "@/clinical/pathways/knee-pain";
import { KneeOutputGeneratorContractError } from "@/clinical/pathways/knee-pain/output-generators";
import type { ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import {
  createInitialAnswers,
  setConsultationAnswer,
  validateConsultationSnapshot
} from "@/engine/consultation-engine";
import {
  createEncounterFromValidatedAnswers,
  generateAllOutputsFromValidatedEncounter
} from "@/engine/encounter-engine";
import { deriveValidatedWorkflow } from "@/engine/workflow-engine";

function update(
  answers: ConsultationAnswers,
  fieldId: string,
  value: string | string[]
) {
  const result = setConsultationAnswer(answers, fieldId, value, kneePainPathway);
  if (!result.accepted) throw new Error(result.issue.message);
  return result.answers;
}

function populatedKneeAnswers() {
  let answers = createInitialAnswers(kneePainPathway);
  answers = update(answers, "side", "right");
  answers = update(answers, "onset", "acute");
  answers = update(answers, "duration", "days");
  answers = update(answers, "trauma", "no");
  answers = update(answers, "assessment", "uncertain");
  answers = update(answers, "plan-actions", ["xray"]);
  return answers;
}

function cascadingPathway(): ClinicalPathway {
  return {
    id: "snapshot-cascade",
    title: "Snapshot cascade",
    category: "test",
    version: "1",
    description: "Synthetic visibility cascade without clinical defaults.",
    workflowRoles: { primaryOutputId: "journal" },
    sections: [
      {
        id: "base",
        title: "Base",
        kind: "history",
        journalSection: "subjective",
        fields: [
          {
            id: "controller",
            label: "Controller",
            type: "single-choice",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" }
            ]
          },
          {
            id: "dependent",
            label: "Dependent",
            type: "single-choice",
            options: [{ value: "yes", label: "Yes" }],
            visibleWhen: [{ fieldId: "controller", operator: "equals", value: "yes" }]
          }
        ]
      },
      {
        id: "conditional-section",
        title: "Conditional",
        kind: "objective",
        journalSection: "objective",
        visibleWhen: [{ fieldId: "dependent", operator: "equals", value: "yes" }],
        fields: [
          {
            id: "section-answer",
            label: "Section answer",
            type: "single-choice",
            options: [{ value: "yes", label: "Yes" }]
          }
        ]
      }
    ],
    outputs: [
      {
        id: "journal",
        label: "Journal",
        type: "journal",
        generatorId: "test.journal",
        alwaysActive: true
      }
    ],
    rules: []
  };
}

describe("complete consultation snapshot validation", () => {
  it("accepts the current empty knee snapshot", () => {
    const answers = createInitialAnswers(kneePainPathway);

    expect(validateConsultationSnapshot(kneePainPathway, answers)).toEqual({
      valid: true,
      answers
    });
  });

  it("accepts a populated knee snapshot without mutating or aliasing its values", () => {
    const answers = populatedKneeAnswers();
    const before = structuredClone(answers);
    const result = validateConsultationSnapshot(kneePainPathway, answers);

    expect(result).toEqual({ valid: true, answers });
    expect(answers).toEqual(before);
    if (!result.valid) throw new Error("Expected a valid snapshot.");
    expect(result.answers).not.toBe(answers);
    expect(result.answers["plan-actions"]).not.toBe(answers["plan-actions"]);
  });

  it.each([
    ["unknown field", { unknown: "value" }, "answer.unknown-field"],
    ["invalid single choice", { side: "middle" }, "answer.invalid-option"],
    ["invalid multi choice", { "plan-actions": ["not-an-action"] }, "answer.invalid-option"],
    ["duplicate multi choice", { "plan-actions": ["xray", "xray"] }, "answer.duplicate-option"],
    ["invalid short text", { "history-note": 42 }, "answer.invalid-type"]
  ])("rejects %s", (_label, values, expectedCode) => {
    const result = validateConsultationSnapshot(
      kneePainPathway,
      values as unknown as ConsultationAnswers
    );

    expect(result).toEqual({
      valid: false,
      issues: [expect.objectContaining({ code: expectedCode })]
    });
  });

  it("prunes a structurally valid stale hidden field answer", () => {
    const answers = {
      ...createInitialAnswers(kneePainPathway),
      trauma: "no",
      "trauma-mechanism": "twist"
    };
    const before = structuredClone(answers);
    const result = validateConsultationSnapshot(kneePainPathway, answers);

    expect(answers).toEqual(before);
    expect(result).toEqual({
      valid: true,
      answers: expect.not.objectContaining({ "trauma-mechanism": expect.anything() })
    });
  });

  it("prunes stale hidden fields and sections until the snapshot is stable", () => {
    const pathway = cascadingPathway();
    const answers = { controller: "no", dependent: "yes", "section-answer": "yes" };

    expect(validateConsultationSnapshot(pathway, answers)).toEqual({
      valid: true,
      answers: { controller: "no" }
    });
  });
});

describe("validated workflow derivation boundary", () => {
  it("derives no rules, suggestions, activation, PSOAP, outputs, or readiness from an invalid snapshot", () => {
    const result = deriveValidatedWorkflow(
      kneePainPathway,
      {
        side: "middle",
        trauma: "yes",
        "weight-bearing": "none",
        "plan-actions": ["xray", "not-an-action"]
      },
      cortexOutputGeneratorRegistry
    );

    expect(result.valid).toBe(false);
    expect(result).not.toHaveProperty("workflow");
    expect(result).not.toHaveProperty("workflow.alerts");
    expect(result).not.toHaveProperty("workflow.suggestions");
    expect(result).not.toHaveProperty("workflow.activeOutputs");
    expect(result).not.toHaveProperty("workflow.outputs");
    if (result.valid) throw new Error("Expected validation failure.");
    expect(result.issues.map((issue) => issue.code)).toEqual([
      "answer.invalid-option",
      "answer.invalid-option"
    ]);
  });

  it("rejects an unknown generator before calculating inactive outputs", () => {
    const pathway = structuredClone(kneePainPathway);
    const inactiveReferral = pathway.outputs.find((output) => output.id === "xray-referral")!;
    inactiveReferral.generatorId = "missing.inactive-generator";

    const result = deriveValidatedWorkflow(
      pathway,
      createInitialAnswers(kneePainPathway),
      cortexOutputGeneratorRegistry
    );

    expect(result).toEqual({
      valid: false,
      issues: [expect.objectContaining({ code: "output.unknown-generator-id" })]
    });
  });

  it("matches the existing safe update path and is deterministic", () => {
    const answers = populatedKneeAnswers();
    const first = deriveValidatedWorkflow(
      kneePainPathway,
      answers,
      cortexOutputGeneratorRegistry
    );
    const second = deriveValidatedWorkflow(
      kneePainPathway,
      answers,
      cortexOutputGeneratorRegistry
    );
    const expectedOutputs = generateAllOutputsFromValidatedEncounter(
      createEncounterFromValidatedAnswers(kneePainPathway, answers),
      cortexOutputGeneratorRegistry
    );

    expect(first).toEqual(second);
    expect(first).toEqual(
      expect.objectContaining({
        valid: true,
        workflow: expect.objectContaining({ outputs: expectedOutputs })
      })
    );
  });

  it("removes stale hidden answers before every derived result", () => {
    const stale = {
      ...createInitialAnswers(kneePainPathway),
      trauma: "no",
      "trauma-mechanism": "twist",
      "trauma-immediate-swelling": "yes"
    };
    const clean = { ...createInitialAnswers(kneePainPathway), trauma: "no" };
    const staleResult = deriveValidatedWorkflow(
      kneePainPathway,
      stale,
      cortexOutputGeneratorRegistry
    );
    const cleanResult = deriveValidatedWorkflow(
      kneePainPathway,
      clean,
      cortexOutputGeneratorRegistry
    );

    expect(staleResult).toEqual(cleanResult);
    if (!staleResult.valid) throw new Error("Expected a valid pruned workflow.");
    expect(staleResult.workflow.encounter.answers).not.toHaveProperty("trauma-mechanism");
    expect(staleResult.workflow.encounter.answers).not.toHaveProperty(
      "trauma-immediate-swelling"
    );
    expect(staleResult.workflow.outputs.map((output) => output.text).join("\n")).not.toContain(
      "vrid"
    );
  });

  it("is the only derivation boundary used by the active encounter UI", () => {
    const source = readFileSync(
      new URL("../components/encounter/EncounterEngine.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("deriveValidatedWorkflow");
    expect(source).not.toContain("createEncounterFromValidatedAnswers");
    expect(source).not.toContain("generateAllOutputsFromValidatedEncounter");
    expect(source).not.toContain("evaluateRules(");
    expect(source).not.toContain("rankAssessmentSuggestions(");
  });

  it("keeps workflow field and primary-output roles out of generic UI constants", () => {
    const source = readFileSync(
      new URL("../components/encounter/EncounterEngine.tsx", import.meta.url),
      "utf8"
    );

    expect(source).not.toMatch(/["']assessment["']/);
    expect(source).not.toMatch(/["']plan-actions["']/);
    expect(source).not.toMatch(/useState\(["']journal["']\)/);
    expect(source).toContain("pathway.workflowRoles.primaryOutputId");
  });

  it("keeps the production consultation renderer out of the temporary preview entry point", () => {
    const appSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
    const middlewareSource = readFileSync(new URL("../middleware.ts", import.meta.url), "utf8");

    expect(appSource).toContain('notFound();');
    expect(appSource).not.toContain("components/encounter/EncounterEngine");
    expect(appSource).not.toContain("components/consultation/ConsultationEngine");
    expect(middlewareSource).toContain('const PROTOTYPE_PATH = "/prototype/clinical-document-workspace"');
    expect(
      existsSync(new URL("../components/consultation/ConsultationEngine.tsx", import.meta.url))
    ).toBe(false);
  });

  it("registers the knee journal under pathway-owned generator identity", () => {
    const journal = kneePainPathway.outputs.find((output) => output.id === "journal")!;

    expect(journal.generatorId).toBe("knee.psoap");
    expect(cortexOutputGeneratorRegistry.generatorIds).toContain("knee.psoap");
    expect(cortexOutputGeneratorRegistry.generatorIds).not.toContain("core.psoap");
    expect(() => cortexOutputGeneratorRegistry.resolve("knee.psoap")).not.toThrow();
  });
});

describe("output contract fallbacks", () => {
  it("throws a typed development error instead of echoing an unknown raw choice", () => {
    const generator = cortexOutputGeneratorRegistry.resolve("knee.xray-referral");
    const definition = kneePainPathway.outputs.find((output) => output.id === "xray-referral")!;

    expect(() =>
      generator({
        pathway: kneePainPathway,
        answers: { side: "middle", "plan-actions": ["xray"] },
        definition
      })
    ).toThrow(KneeOutputGeneratorContractError);
  });

  it("returns validation failure rather than an empty ready output for a missing generator", () => {
    const pathway = structuredClone(kneePainPathway);
    pathway.outputs[0].generatorId = "missing.journal";

    const result = deriveValidatedWorkflow(
      pathway,
      createInitialAnswers(kneePainPathway),
      cortexOutputGeneratorRegistry
    );

    expect(result.valid).toBe(false);
    expect(result).not.toHaveProperty("workflow");
  });
});
