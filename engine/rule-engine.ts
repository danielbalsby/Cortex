import type {
  ClinicalAlert,
  ClinicalPathway,
  ClinicalRule,
  ConsultationAnswers,
  RuleCondition
} from "@/clinical/types";

export interface EvaluatedCondition {
  condition: RuleCondition;
  matched: boolean;
  actualValue: string | readonly string[] | undefined;
}

export interface EvaluatedRule {
  ruleId: string;
  alert: ClinicalAlert;
  active: boolean;
  evaluatedConditions: EvaluatedCondition[];
  matchedConditions: EvaluatedCondition[];
  unmetConditions: EvaluatedCondition[];
}

export function matchesCondition(
  condition: RuleCondition,
  answers: ConsultationAnswers
): boolean {
  const actual = answers[condition.fieldId];
  if (condition.operator === "equals") return actual === condition.value;
  if (condition.operator === "includes") {
    return Array.isArray(actual) && actual.includes(String(condition.value));
  }
  return Array.isArray(actual) ? actual.length > 0 : Boolean(actual);
}

export function evaluateCondition(
  condition: RuleCondition,
  answers: ConsultationAnswers
): EvaluatedCondition {
  const actual = answers[condition.fieldId];
  return {
    condition,
    matched: matchesCondition(condition, answers),
    actualValue: Array.isArray(actual) ? [...actual] : actual
  };
}

export function evaluateRule(
  rule: ClinicalRule,
  answers: ConsultationAnswers
): EvaluatedRule {
  const evaluatedConditions = rule.all.map((condition) =>
    evaluateCondition(condition, answers)
  );
  const matchedConditions = evaluatedConditions.filter((condition) => condition.matched);
  const unmetConditions = evaluatedConditions.filter((condition) => !condition.matched);

  return {
    ruleId: rule.id,
    alert: rule.alert,
    active: evaluatedConditions.length > 0 && unmetConditions.length === 0,
    evaluatedConditions,
    matchedConditions,
    unmetConditions
  };
}

export function evaluateRules(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): EvaluatedRule[] {
  return pathway.rules
    .map((rule) => evaluateRule(rule, answers))
    .filter((rule) => rule.active);
}
