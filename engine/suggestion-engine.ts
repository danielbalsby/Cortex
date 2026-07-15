import type {
  AssessmentSuggestion,
  ClinicalPathway,
  ConsultationAnswers
} from "@/clinical/types";
import { matchesCondition } from "@/engine/rule-engine";

export interface RankedAssessmentSuggestion extends AssessmentSuggestion {
  matchedConditions: number;
  score: number;
}

export function rankAssessmentSuggestions(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): RankedAssessmentSuggestion[] {
  return (pathway.assessmentSuggestions ?? [])
    .map((suggestion) => {
      const matches = suggestion.conditions.filter((condition) =>
        matchesCondition(condition, answers)
      ).length;

      return {
        ...suggestion,
        matchedConditions: matches,
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
