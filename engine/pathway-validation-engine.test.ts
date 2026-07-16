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
  setConsultationAnswer
} from "@/engine/consultation-engine";
import { generatePSOAP } from "@/engine/output-engine";
import { getActiveOutputs } from "@/engine/output-visibility-engine";
import {
  validateAnswerUpdate,
  validateClinicalPathway
} from "@/engine/pathway-validation-engine";
import { evaluateRules } from "@/engine/rule-engine";
import { rankAssessmentSuggestions } from "@/engine/suggestion-engine";

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

function syntheticPathway(): ClinicalPathway {
  return {
    id: "synthetic",
    title: "Synthetic",
    category: "Test",
    version: "1.0.0",
    description: "Non-clinical validation fixture.",
    workflowRoles: {
      assessmentFieldId: "trigger",
      primaryOutputId: "journal"
    },
    sections: [
      {
        id: "main",
        title: "Main",
        kind: "problem",
        journalSection: "problem",
        fields: [
          choiceField("trigger"),
          choiceField("dependent", [
            { fieldId: "trigger", operator: "equals", value: "yes" }
          ]),
          {
            id: "choices",
            label: "Choices",
            type: "multi-choice",
            options: [
              { value: "first", label: "First", output: "First." },
              { value: "second", label: "Second", output: "Second." }
            ]
          },
          { id: "note", label: "Note", type: "short-text" }
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
    rules: [
      {
        id: "explicit-trigger",
        all: [{ fieldId: "trigger", operator: "equals", value: "yes" }],
        alert: { severity: "info", title: "Fixture", message: "Fixture alert." }
      }
    ],
    assessmentSuggestions: [
      {
        value: "fixture-suggestion",
        label: "Fixture suggestion",
        reason: "Non-clinical fixture.",
        conditions: [{ fieldId: "trigger", operator: "equals", value: "yes" }],
        displayPolicy: { requireAll: true }
      }
    ]
  };
}

function issueCodes(pathway: ClinicalPathway) {
  return validateClinicalPathway(pathway).issues.map((issue) => issue.code);
}

function acceptedUpdate(
  answers: ConsultationAnswers,
  fieldId: string,
  value: unknown,
  pathway = kneePainPathway
) {
  const result = setConsultationAnswer(answers, fieldId, value, pathway);
  if (!result.accepted) throw new Error(result.issue.message);
  return result.answers;
}

describe("structural pathway validation", () => {
  it("accepts the current knee pathway", () => {
    expect(
      validateClinicalPathway(kneePainPathway, {
        availableGeneratorIds: cortexOutputGeneratorRegistry.generatorIds
      })
    ).toEqual({ valid: true, issues: [] });
  });

  it("rejects workflow roles that reference unknown fields or outputs", () => {
    const invalidAssessment = syntheticPathway();
    invalidAssessment.workflowRoles.assessmentFieldId = "missing-assessment";
    const invalidPlan = syntheticPathway();
    invalidPlan.workflowRoles.planActionsFieldId = "missing-plan";
    const invalidOutput = syntheticPathway();
    invalidOutput.workflowRoles.primaryOutputId = "missing-output";

    expect(issueCodes(invalidAssessment)).toContain(
      "workflow-roles.unknown-assessment-field"
    );
    expect(issueCodes(invalidPlan)).toContain("workflow-roles.unknown-plan-actions-field");
    expect(issueCodes(invalidOutput)).toContain("workflow-roles.unknown-primary-output");
  });

  it("requires the plan-actions role to reference a multi-choice field", () => {
    const pathway = syntheticPathway();
    pathway.workflowRoles.planActionsFieldId = "trigger";

    expect(issueCodes(pathway)).toContain("workflow-roles.incompatible-plan-actions-field");
  });

  it("requires the assessment role to reference a single-choice field", () => {
    const pathway = syntheticPathway();
    pathway.workflowRoles.assessmentFieldId = "choices";

    expect(issueCodes(pathway)).toContain(
      "workflow-roles.incompatible-assessment-field"
    );
  });

  it("rejects duplicate field-role assignment", () => {
    const pathway = syntheticPathway();
    pathway.workflowRoles.planActionsFieldId = "trigger";

    expect(issueCodes(pathway)).toContain("workflow-roles.duplicate-field-role");
  });

  it("requires assessment role only when suggestions use it", () => {
    const withSuggestions = syntheticPathway();
    delete withSuggestions.workflowRoles.assessmentFieldId;
    const withoutSuggestions = syntheticPathway();
    withoutSuggestions.assessmentSuggestions = [];
    delete withoutSuggestions.workflowRoles.assessmentFieldId;

    expect(issueCodes(withSuggestions)).toContain(
      "workflow-roles.assessment-required-for-suggestions"
    );
    expect(issueCodes(withoutSuggestions)).not.toContain(
      "workflow-roles.assessment-required-for-suggestions"
    );
  });

  it("requires both field roles for plan recommendations", () => {
    const pathway = syntheticPathway();
    pathway.assessmentSuggestions = [];
    pathway.planRecommendations = [
      { assessmentValue: "yes", actions: ["first"], rationale: "Fixture." }
    ];
    delete pathway.workflowRoles.assessmentFieldId;

    expect(issueCodes(pathway)).toEqual(
      expect.arrayContaining([
        "workflow-roles.assessment-required-for-plan-recommendations",
        "workflow-roles.plan-actions-required-for-plan-recommendations"
      ])
    );
  });

  it("rejects a duplicate section ID", () => {
    const pathway = syntheticPathway();
    pathway.sections.push({
      id: "main",
      title: "Duplicate",
      kind: "history",
      journalSection: "subjective",
      fields: [choiceField("other")]
    });

    expect(issueCodes(pathway)).toContain("section.duplicate-id");
  });

  it("rejects a duplicate field ID across sections", () => {
    const pathway = syntheticPathway();
    pathway.sections.push({
      id: "other-section",
      title: "Other",
      kind: "history",
      journalSection: "subjective",
      fields: [choiceField("trigger")]
    });

    expect(issueCodes(pathway)).toContain("field.duplicate-id");
  });

  it("rejects a duplicate rule ID", () => {
    const pathway = syntheticPathway();
    pathway.rules.push({ ...pathway.rules[0] });

    expect(issueCodes(pathway)).toContain("rule.duplicate-id");
  });

  it("rejects a duplicate output ID", () => {
    const pathway = syntheticPathway();
    pathway.outputs.push({ ...pathway.outputs[0] });

    expect(issueCodes(pathway)).toContain("output.duplicate-id");
  });

  it("rejects duplicate assessment suggestion values", () => {
    const pathway = syntheticPathway();
    pathway.assessmentSuggestions!.push({ ...pathway.assessmentSuggestions![0] });

    expect(issueCodes(pathway)).toContain("suggestion.duplicate-value");
  });

  it("rejects an assessment suggestion without an explicit display policy", () => {
    const pathway = syntheticPathway();
    delete (pathway.assessmentSuggestions![0] as {
      displayPolicy?: unknown;
    }).displayPolicy;

    expect(issueCodes(pathway)).toContain("suggestion.missing-display-policy");
  });

  it("rejects invalid minimum support counts", () => {
    const zero = syntheticPathway();
    zero.assessmentSuggestions![0].displayPolicy = { minimumMatchedConditions: 0 };
    const fractional = syntheticPathway();
    fractional.assessmentSuggestions![0].displayPolicy = {
      minimumMatchedConditions: 1.5
    };
    const excessive = syntheticPathway();
    excessive.assessmentSuggestions![0].displayPolicy = {
      minimumMatchedConditions: 2
    };

    expect(issueCodes(zero)).toContain("suggestion.policy.invalid-minimum");
    expect(issueCodes(fractional)).toContain("suggestion.policy.invalid-minimum");
    expect(issueCodes(excessive)).toContain("suggestion.policy.minimum-exceeds-support");
  });

  it("rejects missing, duplicate, and conflicting support thresholds", () => {
    const missing = syntheticPathway();
    missing.assessmentSuggestions![0].displayPolicy = {};

    const duplicate = syntheticPathway();
    duplicate.assessmentSuggestions![0].displayPolicy = {
      requireAll: true,
      minimumMatchedConditions: 1
    };

    const conflicting = syntheticPathway();
    conflicting.assessmentSuggestions![0].conditions.push({
      fieldId: "dependent",
      operator: "equals",
      value: "yes"
    });
    conflicting.assessmentSuggestions![0].displayPolicy = {
      requireAll: true,
      minimumMatchedConditions: 1
    };

    expect(issueCodes(missing)).toContain("suggestion.policy.missing-threshold");
    expect(issueCodes(duplicate)).toContain("suggestion.policy.duplicate-threshold");
    expect(issueCodes(conflicting)).toContain("suggestion.policy.conflicting-threshold");
  });

  it("validates required and suppressing policy conditions through the shared condition model", () => {
    const pathway = syntheticPathway();
    pathway.assessmentSuggestions![0].displayPolicy = {
      minimumMatchedConditions: 1,
      requiredConditions: [
        { fieldId: "missing", operator: "equals", value: "yes" }
      ],
      suppressWhen: [
        { fieldId: "trigger", operator: "equals", value: "missing" }
      ]
    };

    expect(issueCodes(pathway)).toEqual(
      expect.arrayContaining(["condition.unknown-field", "condition.invalid-option-value"])
    );
  });

  it("rejects duplicate, contradictory, and structurally impossible policy conditions", () => {
    const condition = { fieldId: "trigger", operator: "equals" as const, value: "yes" };
    const duplicate = syntheticPathway();
    duplicate.assessmentSuggestions![0].displayPolicy = {
      minimumMatchedConditions: 1,
      requiredConditions: [condition, { ...condition }]
    };

    const contradictory = syntheticPathway();
    contradictory.assessmentSuggestions![0].displayPolicy = {
      minimumMatchedConditions: 1,
      requiredConditions: [condition],
      suppressWhen: [{ ...condition }]
    };

    const impossible = syntheticPathway();
    impossible.assessmentSuggestions![0].displayPolicy = {
      requireAll: true,
      suppressWhen: [condition]
    };

    expect(issueCodes(duplicate)).toContain("suggestion.policy.duplicate-condition");
    expect(issueCodes(contradictory)).toContain(
      "suggestion.policy.contradictory-condition"
    );
    expect(issueCodes(impossible)).toContain("suggestion.policy.impossible-display");
  });

  it("rejects a condition that references an unknown field", () => {
    const pathway = syntheticPathway();
    pathway.rules[0].all[0].fieldId = "missing";

    expect(issueCodes(pathway)).toContain("condition.unknown-field");
  });

  it("rejects a condition that references an invalid choice value", () => {
    const pathway = syntheticPathway();
    pathway.rules[0].all[0].value = "missing";

    expect(issueCodes(pathway)).toContain("condition.invalid-option-value");
  });

  it("rejects an operator incompatible with the referenced field", () => {
    const pathway = syntheticPathway();
    pathway.rules[0].all[0].operator = "includes";

    expect(issueCodes(pathway)).toContain("condition.incompatible-operator");
  });

  it("rejects a clinically meaningful remaining default", () => {
    const pathway = syntheticPathway();
    const fieldWithDefault = pathway.sections[0].fields[0] as ClinicalField & {
      defaultValue?: unknown;
    };
    fieldWithDefault.defaultValue = "yes";

    expect(issueCodes(pathway)).toContain("field.clinical-default");
  });

  it("rejects incompatible field option contracts", () => {
    const pathway = syntheticPathway();
    pathway.sections[0].fields.find((field) => field.id === "note")!.options = [];
    pathway.sections[0].fields.find((field) => field.id === "choices")!.options = [];

    expect(issueCodes(pathway)).toEqual(
      expect.arrayContaining(["field.incompatible-options", "field.missing-options"])
    );
  });

  it("rejects contradictory and missing output activation contracts", () => {
    const contradictory = syntheticPathway();
    contradictory.outputs[0].activeWhen = [
      { fieldId: "trigger", operator: "equals", value: "yes" }
    ];
    const missing = syntheticPathway();
    missing.outputs[0].alwaysActive = false;

    expect(issueCodes(contradictory)).toContain("output.contradictory-activation");
    expect(issueCodes(missing)).toContain("output.missing-activation");
  });

  it("rejects a missing output generator ID", () => {
    const pathway = syntheticPathway();
    pathway.outputs[0].generatorId = "";

    expect(issueCodes(pathway)).toContain("output.missing-generator-id");
  });

  it("rejects an output generator ID that is absent from the supplied registry", () => {
    const pathway = syntheticPathway();

    expect(
      validateClinicalPathway(pathway, { availableGeneratorIds: ["test.other"] }).issues.map(
        (issue) => issue.code
      )
    ).toContain("output.unknown-generator-id");
  });

  it("accepts output generator IDs supplied by an explicit registry contract", () => {
    const pathway = syntheticPathway();

    expect(
      validateClinicalPathway(pathway, { availableGeneratorIds: ["test.journal"] })
    ).toEqual({ valid: true, issues: [] });
  });

  it("rejects a direct visibility cycle", () => {
    const pathway = syntheticPathway();
    const trigger = pathway.sections[0].fields.find((field) => field.id === "trigger")!;
    trigger.visibleWhen = [{ fieldId: "dependent", operator: "equals", value: "yes" }];

    expect(issueCodes(pathway)).toContain("visibility.circular-dependency");
  });

  it("rejects an indirect visibility cycle", () => {
    const pathway = syntheticPathway();
    const fields = pathway.sections[0].fields;
    fields.push(
      choiceField("third", [{ fieldId: "trigger", operator: "equals", value: "yes" }])
    );
    fields.find((field) => field.id === "trigger")!.visibleWhen = [
      { fieldId: "dependent", operator: "equals", value: "yes" }
    ];
    fields.find((field) => field.id === "dependent")!.visibleWhen = [
      { fieldId: "third", operator: "equals", value: "yes" }
    ];

    expect(issueCodes(pathway)).toContain("visibility.circular-dependency");
  });

  it("rejects a section controlled by one of its own fields", () => {
    const pathway = syntheticPathway();
    pathway.sections[0].visibleWhen = [
      { fieldId: "trigger", operator: "equals", value: "yes" }
    ];

    expect(issueCodes(pathway)).toContain("visibility.circular-dependency");
  });

  it("accepts a valid acyclic conditional pathway", () => {
    expect(validateClinicalPathway(syntheticPathway())).toEqual({ valid: true, issues: [] });
  });

  it("prevents an invalid pathway from creating consultation state", () => {
    const pathway = syntheticPathway();
    pathway.sections[0].id = "";

    expect(() => createInitialAnswers(pathway)).toThrow(/section\.empty-id/);
  });
});

describe("answer update validation", () => {
  it("accepts a valid single-choice update", () => {
    const result = validateAnswerUpdate(kneePainPathway, "side", "right");

    expect(result).toEqual({ accepted: true, value: "right" });
  });

  it("rejects an unknown field ID", () => {
    const result = validateAnswerUpdate(kneePainPathway, "missing", "value");

    expect(result).toEqual(
      expect.objectContaining({
        accepted: false,
        issue: expect.objectContaining({
          code: "answer.unknown-field",
          path: "missing",
          value: "value"
        })
      })
    );
  });

  it("rejects an invalid single-choice value", () => {
    const result = validateAnswerUpdate(kneePainPathway, "side", "middle");

    expect(result).toEqual(
      expect.objectContaining({
        accepted: false,
        issue: expect.objectContaining({ code: "answer.invalid-option", value: "middle" })
      })
    );
  });

  it("rejects an invalid multi-choice value", () => {
    const result = validateAnswerUpdate(kneePainPathway, "plan-actions", ["not-an-action"]);

    expect(result).toEqual(
      expect.objectContaining({
        accepted: false,
        issue: expect.objectContaining({
          code: "answer.invalid-option",
          value: ["not-an-action"]
        })
      })
    );
  });

  it("rejects an invalid value type", () => {
    expect(validateAnswerUpdate(kneePainPathway, "side", ["right"])).toEqual(
      expect.objectContaining({
        accepted: false,
        issue: expect.objectContaining({ code: "answer.invalid-type" })
      })
    );
    expect(validateAnswerUpdate(kneePainPathway, "history-note", 42)).toEqual(
      expect.objectContaining({
        accepted: false,
        issue: expect.objectContaining({ code: "answer.invalid-type" })
      })
    );
  });

  it("rejects duplicate multi-choice values deterministically", () => {
    const result = validateAnswerUpdate(kneePainPathway, "plan-actions", ["xray", "xray"]);

    expect(result).toEqual(
      expect.objectContaining({
        accepted: false,
        issue: expect.objectContaining({ code: "answer.duplicate-option" })
      })
    );
  });

  it("accepts empty values as unanswered", () => {
    expect(validateAnswerUpdate(kneePainPathway, "side", "")).toEqual({
      accepted: true,
      value: ""
    });
    expect(validateAnswerUpdate(kneePainPathway, "plan-actions", [])).toEqual({
      accepted: true,
      value: []
    });
    expect(validateAnswerUpdate(kneePainPathway, "history-note", "")).toEqual({
      accepted: true,
      value: ""
    });
  });

  it("preserves the exact previous state after rejection", () => {
    const previous = acceptedUpdate(createInitialAnswers(kneePainPathway), "side", "right");
    const result = setConsultationAnswer(previous, "side", "middle", kneePainPathway);

    expect(result.accepted).toBe(false);
    expect(result.answers).toBe(previous);
    expect(result.answers.side).toBe("right");
  });

  it("keeps a rejected value out of PSOAP", () => {
    const previous = createInitialAnswers(kneePainPathway);
    const result = setConsultationAnswer(previous, "side", "middle", kneePainPathway);

    expect(generatePSOAP(kneePainPathway, result.answers)).toBe("");
    expect(Object.values(result.answers)).not.toContain("middle");
  });

  it("keeps rejected values out of rules, suggestions, and output activation", () => {
    let answers = acceptedUpdate(
      createInitialAnswers(kneePainPathway),
      "weight-bearing",
      "none"
    );
    const beforeRejection = {
      rules: evaluateRules(kneePainPathway, answers),
      suggestions: rankAssessmentSuggestions(kneePainPathway, answers),
      outputs: getActiveOutputs(kneePainPathway, answers)
    };
    const rejectedTrauma = setConsultationAnswer(answers, "trauma", ["yes"], kneePainPathway);
    const rejectedOutput = setConsultationAnswer(
      rejectedTrauma.answers,
      "plan-actions",
      ["xray", "not-an-action"],
      kneePainPathway
    );
    answers = rejectedOutput.answers;

    expect({
      rules: evaluateRules(kneePainPathway, answers),
      suggestions: rankAssessmentSuggestions(kneePainPathway, answers),
      outputs: getActiveOutputs(kneePainPathway, answers)
    }).toEqual(beforeRejection);
  });

  it("continues to prune hidden answers after a valid update", () => {
    let answers = acceptedUpdate(createInitialAnswers(kneePainPathway), "trauma", "yes");
    answers = acceptedUpdate(answers, "trauma-mechanism", "twist");
    answers = acceptedUpdate(answers, "trauma-immediate-swelling", "yes");
    answers = acceptedUpdate(answers, "trauma", "no");

    expect(answers).not.toHaveProperty("trauma-mechanism");
    expect(answers).not.toHaveProperty("trauma-immediate-swelling");
  });
});
