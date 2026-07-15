import { describe, expect, it } from "vitest";

import { kneePainPathway } from "@/clinical/pathways/knee-pain";
import { cortexOutputGeneratorRegistry } from "@/clinical/output-generator-registry";
import type {
  ClinicalField,
  ClinicalPathway,
  ConsultationAnswers,
  RuleCondition
} from "@/clinical/types";
import {
  createInitialAnswers,
  pruneHiddenAnswers,
  setConsultationAnswer,
  stabilizeHiddenAnswers
} from "@/engine/consultation-engine";
import { createEncounter, generateAllOutputs } from "@/engine/encounter-engine";
import { generatePSOAP } from "@/engine/output-engine";
import { getActiveOutputs } from "@/engine/output-visibility-engine";
import { validateClinicalPathway } from "@/engine/pathway-validation-engine";
import { evaluateRules } from "@/engine/rule-engine";
import { rankAssessmentSuggestions } from "@/engine/suggestion-engine";
import { getVisibleFields, getVisibleSections } from "@/engine/visibility-engine";

function choiceField(id: string, visibleWhen?: RuleCondition[]): ClinicalField {
  return {
    id,
    label: id,
    type: "single-choice",
    ...(visibleWhen ? { visibleWhen } : {}),
    options: [
      { value: "yes", label: "Yes", output: `${id} yes.` },
      { value: "no", label: "No", output: `${id} no.` }
    ]
  };
}

function cascadingPathway(): ClinicalPathway {
  return {
    id: "visibility-cascade",
    title: "Visibility cascade",
    category: "Test",
    version: "1.0.0",
    description: "Non-clinical fixed-point fixture.",
    sections: [
      {
        id: "main",
        title: "Main",
        kind: "problem",
        journalSection: "problem",
        fields: [
          choiceField("controller"),
          choiceField("first", [
            { fieldId: "controller", operator: "equals", value: "yes" }
          ]),
          choiceField("second", [{ fieldId: "first", operator: "equals", value: "yes" }]),
          choiceField("third", [{ fieldId: "second", operator: "equals", value: "yes" }]),
          choiceField("unrelated")
        ]
      },
      {
        id: "conditional-section",
        title: "Conditional section",
        kind: "history",
        journalSection: "subjective",
        visibleWhen: [{ fieldId: "third", operator: "equals", value: "yes" }],
        fields: [choiceField("section-answer")]
      }
    ],
    outputs: [
      {
        id: "journal",
        label: "Journal",
        type: "journal",
        generatorId: "core.psoap",
        alwaysActive: true
      },
      {
        id: "conditional-output",
        label: "Conditional output",
        type: "xray-referral",
        generatorId: "knee.xray-referral",
        activeWhen: [{ fieldId: "third", operator: "equals", value: "yes" }]
      }
    ],
    rules: [
      {
        id: "conditional-rule",
        all: [{ fieldId: "first", operator: "equals", value: "yes" }],
        alert: { severity: "info", title: "Fixture", message: "Non-clinical fixture." }
      }
    ],
    assessmentSuggestions: [
      {
        value: "conditional-suggestion",
        label: "Conditional suggestion",
        reason: "Non-clinical fixture.",
        conditions: [{ fieldId: "second", operator: "equals", value: "yes" }]
      }
    ]
  };
}

function accept(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers,
  fieldId: string,
  value: string | string[]
) {
  const result = setConsultationAnswer(answers, fieldId, value, pathway);
  if (!result.accepted) throw new Error(result.issue.message);
  return result.answers;
}

function populatedCascade(pathway: ClinicalPathway) {
  let answers = createInitialAnswers(pathway);
  answers = accept(pathway, answers, "controller", "yes");
  answers = accept(pathway, answers, "first", "yes");
  answers = accept(pathway, answers, "second", "yes");
  answers = accept(pathway, answers, "third", "yes");
  answers = accept(pathway, answers, "section-answer", "yes");
  answers = accept(pathway, answers, "unrelated", "yes");
  return answers;
}

function derive(pathway: ClinicalPathway, answers: ConsultationAnswers) {
  return {
    sections: getVisibleSections(pathway, answers),
    fields: getVisibleSections(pathway, answers).map((section) =>
      getVisibleFields(section, answers)
    ),
    rules: evaluateRules(pathway, answers),
    suggestions: rankAssessmentSuggestions(pathway, answers),
    activeOutputs: getActiveOutputs(pathway, answers),
    psoap: generatePSOAP(pathway, answers),
    outputs: generateAllOutputs(createEncounter(pathway, answers), cortexOutputGeneratorRegistry)
  };
}

describe("fixed-point hidden-answer pruning", () => {
  it("prunes one hidden answer", () => {
    const pathway = cascadingPathway();
    const answers = { controller: "no", first: "yes", unrelated: "yes" };

    expect(pruneHiddenAnswers(pathway, answers)).toEqual({
      controller: "no",
      unrelated: "yes"
    });
  });

  it("continues cascading pruning until fields and a newly hidden section are stable", () => {
    const pathway = cascadingPathway();
    const previous = populatedCascade(pathway);
    const previousSnapshot = structuredClone(previous);
    const result = setConsultationAnswer(previous, "controller", "no", pathway);

    expect(result.accepted).toBe(true);
    expect(result.answers).toEqual({ controller: "no", unrelated: "yes" });
    expect(result.answers).not.toHaveProperty("first");
    expect(result.answers).not.toHaveProperty("second");
    expect(result.answers).not.toHaveProperty("third");
    expect(result.answers).not.toHaveProperty("section-answer");
    expect(previous).toEqual(previousSnapshot);
    expect(previous).toHaveProperty("section-answer", "yes");
  });

  it("preserves unrelated visible answers", () => {
    const pathway = cascadingPathway();
    const result = setConsultationAnswer(populatedCascade(pathway), "controller", "no", pathway);

    expect(result.answers.unrelated).toBe("yes");
  });

  it("returns the original object for no-op pruning and remains idempotent", () => {
    const pathway = cascadingPathway();
    const stable = accept(pathway, createInitialAnswers(pathway), "controller", "no");
    const first = pruneHiddenAnswers(pathway, stable);
    const second = pruneHiddenAnswers(pathway, first);

    expect(first).toBe(stable);
    expect(second).toBe(first);
  });

  it("removes all influence from answers pruned during the cascade", () => {
    const pathway = cascadingPathway();
    const result = setConsultationAnswer(populatedCascade(pathway), "controller", "no", pathway);
    if (!result.accepted) throw new Error(result.issue.message);

    let baseline = createInitialAnswers(pathway);
    baseline = accept(pathway, baseline, "controller", "no");
    baseline = accept(pathway, baseline, "unrelated", "yes");

    expect(result.answers).toEqual(baseline);
    expect(derive(pathway, result.answers)).toEqual(derive(pathway, baseline));
    expect(evaluateRules(pathway, result.answers)).toEqual([]);
    expect(rankAssessmentSuggestions(pathway, result.answers)).toEqual([]);
    expect(getActiveOutputs(pathway, result.answers).map((output) => output.id)).toEqual([
      "journal"
    ]);
    expect(generatePSOAP(pathway, result.answers)).not.toContain("first yes");
  });

  it("terminates for the validated knee pathway", () => {
    const answers = createInitialAnswers(kneePainPathway);

    expect(validateClinicalPathway(kneePainPathway).valid).toBe(true);
    expect(pruneHiddenAnswers(kneePainPathway, answers)).toBe(answers);
  });

  it("rejects circular visibility before state creation", () => {
    const pathway = cascadingPathway();
    pathway.sections[0].fields.find((field) => field.id === "controller")!.visibleWhen = [
      { fieldId: "first", operator: "equals", value: "yes" }
    ];

    expect(validateClinicalPathway(pathway).issues.map((issue) => issue.code)).toContain(
      "visibility.circular-dependency"
    );
    expect(() => createInitialAnswers(pathway)).toThrow(/visibility\.circular-dependency/);
  });

  it("falls back to the previous valid state when the defensive bound is exhausted", () => {
    const pathway = cascadingPathway();
    const previous = populatedCascade(pathway);
    const proposed = { ...previous, controller: "no" };
    const result = stabilizeHiddenAnswers(pathway, proposed, {
      fallbackAnswers: previous,
      maxIterations: 1
    });

    expect(result.stable).toBe(false);
    expect(result.answers).toBe(previous);
    expect(result).toEqual(
      expect.objectContaining({
        issue: expect.objectContaining({
          code: "answers.pruning-did-not-converge",
          path: "answers"
        })
      })
    );
    expect(previous.controller).toBe("yes");
    expect(getActiveOutputs(pathway, previous).map((output) => output.id)).toContain(
      "conditional-output"
    );
  });
});

describe("deterministic consultation derivation", () => {
  it("returns deeply equal encounters and outputs for identical inputs", () => {
    let answers = createInitialAnswers(kneePainPathway);
    answers = accept(kneePainPathway, answers, "side", "right");
    answers = accept(kneePainPathway, answers, "duration", "days");
    answers = accept(kneePainPathway, answers, "assessment", "uncertain");

    const firstEncounter = createEncounter(kneePainPathway, answers);
    const secondEncounter = createEncounter(kneePainPathway, answers);

    expect(firstEncounter).toEqual(secondEncounter);
    expect(generateAllOutputs(firstEncounter, cortexOutputGeneratorRegistry)).toEqual(
      generateAllOutputs(secondEncounter, cortexOutputGeneratorRegistry)
    );
  });

  it("changes only answer-dependent derivation when an answer changes", () => {
    const empty = createInitialAnswers(kneePainPathway);
    const side = accept(kneePainPathway, empty, "side", "right");

    expect(getVisibleSections(kneePainPathway, side)).toEqual(
      getVisibleSections(kneePainPathway, empty)
    );
    expect(evaluateRules(kneePainPathway, side)).toEqual(evaluateRules(kneePainPathway, empty));
    expect(rankAssessmentSuggestions(kneePainPathway, side)).toEqual(
      rankAssessmentSuggestions(kneePainPathway, empty)
    );
    expect(getActiveOutputs(kneePainPathway, side)).toEqual(
      getActiveOutputs(kneePainPathway, empty)
    );
    expect(generatePSOAP(kneePainPathway, empty)).toBe("");
    expect(generatePSOAP(kneePainPathway, side)).toBe("P: Højresidige knæsmerter.");
  });

  it("produces deeply equal empty clinical state on every reset", () => {
    const first = createInitialAnswers(kneePainPathway);
    const second = createInitialAnswers(kneePainPathway);

    expect(first).toEqual(second);
    expect(first).not.toBe(second);
  });

  it("keeps pure derived results independent of call order", () => {
    let answers = createInitialAnswers(kneePainPathway);
    answers = accept(kneePainPathway, answers, "trauma", "yes");
    answers = accept(kneePainPathway, answers, "weight-bearing", "none");
    answers = accept(kneePainPathway, answers, "plan-actions", ["xray"]);

    const expected = derive(kneePainPathway, answers);

    generatePSOAP(kneePainPathway, answers);
    rankAssessmentSuggestions(kneePainPathway, answers);
    generateAllOutputs(createEncounter(kneePainPathway, answers), cortexOutputGeneratorRegistry);
    evaluateRules(kneePainPathway, answers);
    getVisibleSections(kneePainPathway, answers);

    expect(derive(kneePainPathway, answers)).toEqual(expected);
  });
});
