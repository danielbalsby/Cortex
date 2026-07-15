import type { ClinicalPathway, ConsultationAnswers, RuleCondition } from "@/clinical/types";

export function matchesCondition(condition: RuleCondition, answers: ConsultationAnswers): boolean {
  const actual = answers[condition.fieldId];
  if (condition.operator === "equals") return actual === condition.value;
  if (condition.operator === "includes") {
    return Array.isArray(actual) && actual.includes(String(condition.value));
  }
  return Array.isArray(actual) ? actual.length > 0 : Boolean(actual);
}

export function evaluateRules(pathway: ClinicalPathway, answers: ConsultationAnswers) {
  return pathway.rules
    .filter((rule) => rule.all.every((condition) => matchesCondition(condition, answers)))
    .map((rule) => rule.alert);
}
