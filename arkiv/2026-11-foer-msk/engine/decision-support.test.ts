import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { kneePainPathway } from "@/clinical/pathways/knee-pain";
import type {
  AssessmentSuggestion,
  ClinicalRule,
  ConsultationAnswers,
  SuggestionDisplayPolicy
} from "@/clinical/types";
import { createInitialAnswers, setConsultationAnswer } from "@/engine/consultation-engine";
import { evaluateRule, evaluateRules } from "@/engine/rule-engine";
import {
  evaluateAssessmentSuggestion,
  evaluateAssessmentSuggestions,
  rankAssessmentSuggestions
} from "@/engine/suggestion-engine";

const fixtureRule: ClinicalRule = {
  id: "fixture-rule",
  all: [
    { fieldId: "first", operator: "equals", value: "yes" },
    { fieldId: "selected", operator: "includes", value: "item" }
  ],
  alert: { severity: "warning", title: "Fixture", message: "Fixture alert." }
};

function fixtureSuggestion(
  displayPolicy: SuggestionDisplayPolicy
): AssessmentSuggestion {
  return {
    value: "fixture-suggestion",
    label: "Fixture suggestion",
    reason: "Non-clinical fixture.",
    conditions: [
      { fieldId: "first", operator: "equals", value: "yes" },
      { fieldId: "second", operator: "equals", value: "yes" }
    ],
    displayPolicy
  };
}

function update(
  answers: ConsultationAnswers,
  fieldId: string,
  value: string | string[]
) {
  const result = setConsultationAnswer(answers, fieldId, value, kneePainPathway);
  if (!result.accepted) throw new Error(result.issue.message);
  return result.answers;
}

describe("explainable clinical rules", () => {
  it("retains rule identity, alert payload, and matched evidence for an active rule", () => {
    const evaluated = evaluateRule(fixtureRule, {
      first: "yes",
      selected: ["item"]
    });

    expect(evaluated).toEqual({
      ruleId: "fixture-rule",
      alert: fixtureRule.alert,
      active: true,
      evaluatedConditions: [
        {
          condition: fixtureRule.all[0],
          matched: true,
          actualValue: "yes"
        },
        {
          condition: fixtureRule.all[1],
          matched: true,
          actualValue: ["item"]
        }
      ],
      matchedConditions: expect.any(Array),
      unmetConditions: []
    });
    expect(evaluated.matchedConditions).toEqual(evaluated.evaluatedConditions);
  });

  it("represents unmet and unanswered conditions without treating them as evidence", () => {
    const evaluated = evaluateRule(fixtureRule, { first: "yes" });

    expect(evaluated.active).toBe(false);
    expect(evaluated.matchedConditions).toHaveLength(1);
    expect(evaluated.unmetConditions).toEqual([
      {
        condition: fixtureRule.all[1],
        matched: false,
        actualValue: undefined
      }
    ]);
  });

  it("deactivates when a required answer changes and remains deterministic and immutable", () => {
    const answers: ConsultationAnswers = { first: "yes", selected: ["item"] };
    const previous = structuredClone(answers);
    const first = evaluateRule(fixtureRule, answers);
    const second = evaluateRule(fixtureRule, answers);
    const changed = evaluateRule(fixtureRule, { ...answers, first: "no" });

    expect(second).toEqual(first);
    expect(changed.active).toBe(false);
    expect(answers).toEqual(previous);
    expect(first.evaluatedConditions[1].actualValue).not.toBe(answers.selected);
  });

  it.each([
    [
      "possible-septic-arthritis",
      { fever: "yes", swelling: "marked", rom: "marked" }
    ],
    ["ottawa-knee", { trauma: "yes", "weight-bearing": "none" }],
    ["locking-reminder", { locking: "yes" }]
  ])("preserves activation of %s under its documented explicit conditions", (ruleId, answers) => {
    expect(evaluateRules(kneePainPathway, answers)).toContainEqual(
      expect.objectContaining({ ruleId, active: true })
    );
  });
});

describe("pathway-defined suggestion display policy", () => {
  it("enforces minimumMatchedConditions without counting missing support", () => {
    const suggestion = fixtureSuggestion({ minimumMatchedConditions: 2 });
    const partial = evaluateAssessmentSuggestion(suggestion, { first: "yes" });
    const complete = evaluateAssessmentSuggestion(suggestion, {
      first: "yes",
      second: "yes"
    });

    expect(partial.supportCount).toBe(1);
    expect(partial.unmatchedSupportingConditions[0].actualValue).toBeUndefined();
    expect(partial.displayPolicyResult.displayed).toBe(false);
    expect(complete.displayPolicyResult.displayed).toBe(true);
  });

  it("enforces requireAll", () => {
    const suggestion = fixtureSuggestion({ requireAll: true });

    expect(
      evaluateAssessmentSuggestion(suggestion, { first: "yes" }).displayPolicyResult
        .displayed
    ).toBe(false);
    expect(
      evaluateAssessmentSuggestion(suggestion, {
        first: "yes",
        second: "yes"
      }).displayPolicyResult.displayed
    ).toBe(true);
  });

  it("requires every required condition before display", () => {
    const suggestion = fixtureSuggestion({
      minimumMatchedConditions: 1,
      requiredConditions: [{ fieldId: "gate", operator: "equals", value: "yes" }]
    });
    const withoutGate = evaluateAssessmentSuggestion(suggestion, { first: "yes" });
    const withGate = evaluateAssessmentSuggestion(suggestion, {
      first: "yes",
      gate: "yes"
    });

    expect(withoutGate.requiredConditions).toEqual([
      expect.objectContaining({ matched: false, actualValue: undefined })
    ]);
    expect(withoutGate.displayPolicyResult.requiredConditionsSatisfied).toBe(false);
    expect(withoutGate.displayPolicyResult.displayed).toBe(false);
    expect(withGate.displayPolicyResult.displayed).toBe(true);
  });

  it("keeps suppressing findings distinct and hides otherwise supported suggestions", () => {
    const suggestion = fixtureSuggestion({
      minimumMatchedConditions: 1,
      suppressWhen: [{ fieldId: "contradiction", operator: "equals", value: "yes" }]
    });
    const evaluated = evaluateAssessmentSuggestion(suggestion, {
      first: "yes",
      contradiction: "yes"
    });

    expect(evaluated.supportCount).toBe(1);
    expect(evaluated.matchedSuppressingConditions).toEqual([
      expect.objectContaining({ matched: true, actualValue: "yes" })
    ]);
    expect(evaluated.displayPolicyResult).toEqual(
      expect.objectContaining({ suppressed: true, displayed: false })
    );
  });

  it("returns deterministic structured support counts without probability fields", () => {
    const suggestion = fixtureSuggestion({ minimumMatchedConditions: 1 });
    const answers = { first: "yes" };
    const first = evaluateAssessmentSuggestion(suggestion, answers);
    const second = evaluateAssessmentSuggestion(suggestion, answers);

    expect(second).toEqual(first);
    expect(first).toEqual(
      expect.objectContaining({ supportCount: 1, totalSupportingConditions: 2 })
    );
    expect(first).not.toHaveProperty("score");
    expect(first).not.toHaveProperty("probability");
    expect(first).not.toHaveProperty("confidence");
  });

  it("does not expose the fracture suggestion from inability to bear weight alone", () => {
    let answers = createInitialAnswers(kneePainPathway);
    answers = update(answers, "weight-bearing", "none");
    const previous = structuredClone(answers);
    const evaluated = evaluateAssessmentSuggestions(kneePainPathway, answers).find(
      (suggestion) => suggestion.value === "fracture"
    )!;

    expect(evaluated.supportCount).toBe(1);
    expect(evaluated.totalSupportingConditions).toBe(2);
    expect(evaluated.displayPolicyResult.displayed).toBe(false);
    expect(rankAssessmentSuggestions(kneePainPathway, answers)).not.toContainEqual(
      expect.objectContaining({ value: "fracture" })
    );
    expect(answers.assessment).toBe("");
    expect(answers).toEqual(previous);

    answers = update(answers, "trauma", "yes");
    expect(rankAssessmentSuggestions(kneePainPathway, answers)).toContainEqual(
      expect.objectContaining({
        value: "fracture",
        supportCount: 2,
        totalSupportingConditions: 2
      })
    );
  });

  it("returns no unsupported suggestion from an empty consultation", () => {
    expect(
      rankAssessmentSuggestions(kneePainPathway, createInitialAnswers(kneePainPathway))
    ).toEqual([]);
  });

  it("keeps knee-specific suggestion policy out of generic React components", () => {
    const encounterSource = readFileSync(
      new URL("../components/encounter/EncounterEngine.tsx", import.meta.url),
      "utf8"
    );

    expect(encounterSource).not.toContain("requireAll");
    expect(encounterSource).not.toContain("minimumMatchedConditions");
    expect(encounterSource).not.toContain("suppressWhen");
    expect(encounterSource).not.toContain("fracture");
  });
});
