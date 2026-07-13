import type {
  AssessmentSuggestion,
  ClinicalPathway,
  ConsultationAnswers,
  RuleCondition
} from "@/clinical/types";

function conditionMatches(
  condition: RuleCondition,
  answers: ConsultationAnswers
): boolean {
  const actual = answers[condition.fieldId];

  switch (condition.operator) {
    case "equals":
      return actual === condition.value;
    case "includes":
      return Array.isArray(actual) && actual.includes(String(condition.value));
    case "truthy":
      return Boolean(actual);
    default:
      return false;
  }
}

export interface RankedAssessmentSuggestion extends AssessmentSuggestion {
  score: number;
}

export function rankAssessmentSuggestions(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): RankedAssessmentSuggestion[] {
  return (pathway.assessmentSuggestions ?? [])
    .map((suggestion) => {
      const matches = suggestion.conditions.filter((condition) =>
        conditionMatches(condition, answers)
      ).length;

      return {
        ...suggestion,
        score: suggestion.conditions.length
          ? matches / suggestion.conditions.length
          : 0
      };
    })
    .filter((suggestion) => suggestion.score > 0)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, "da"));
}

export function getPlanRecommendation(
  pathway: ClinicalPathway,
  assessmentValue: string
) {
  return pathway.planRecommendations?.find(
    (recommendation) => recommendation.assessmentValue === assessmentValue
  );
}
