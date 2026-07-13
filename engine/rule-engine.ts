import type { ClinicalPathway, ConsultationAnswers, RuleCondition } from "@/clinical/types";
function matches(c: RuleCondition, a: ConsultationAnswers) {
  const actual = a[c.fieldId];
  if (c.operator === "equals") return actual === c.value;
  if (c.operator === "includes") return Array.isArray(actual) && actual.includes(String(c.value));
  return Boolean(actual);
}
export function evaluateRules(pathway: ClinicalPathway, answers: ConsultationAnswers) {
  return pathway.rules.filter(rule => rule.all.every(c => matches(c, answers))).map(rule => rule.alert);
}
