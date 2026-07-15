import type {
  AssessmentSuggestion,
  ClinicalPathway,
  ConsultationAnswers,
  SuggestionDisplayPolicy
} from "@/clinical/types";
import {
  evaluateCondition,
  type EvaluatedCondition
} from "@/engine/rule-engine";

export interface SuggestionDisplayPolicyResult {
  displayed: boolean;
  supportThresholdSatisfied: boolean;
  requiredConditionsSatisfied: boolean;
  suppressed: boolean;
}

export interface EvaluatedAssessmentSuggestion extends AssessmentSuggestion {
  supportingConditions: EvaluatedCondition[];
  matchedSupportingConditions: EvaluatedCondition[];
  unmatchedSupportingConditions: EvaluatedCondition[];
  requiredConditions: EvaluatedCondition[];
  matchedSuppressingConditions: EvaluatedCondition[];
  suppressingConditions: EvaluatedCondition[];
  supportCount: number;
  totalSupportingConditions: number;
  displayPolicyResult: SuggestionDisplayPolicyResult;
}

function thresholdSatisfied(
  policy: SuggestionDisplayPolicy,
  supportCount: number,
  totalSupportingConditions: number
) {
  if (policy.requireAll) return supportCount === totalSupportingConditions;
  if (policy.minimumMatchedConditions !== undefined) {
    return supportCount >= policy.minimumMatchedConditions;
  }
  return false;
}

export function evaluateAssessmentSuggestion(
  suggestion: AssessmentSuggestion,
  answers: ConsultationAnswers
): EvaluatedAssessmentSuggestion {
  const supportingConditions = suggestion.conditions.map((condition) =>
    evaluateCondition(condition, answers)
  );
  const matchedSupportingConditions = supportingConditions.filter(
    (condition) => condition.matched
  );
  const unmatchedSupportingConditions = supportingConditions.filter(
    (condition) => !condition.matched
  );
  const requiredConditions = (suggestion.displayPolicy.requiredConditions ?? []).map(
    (condition) => evaluateCondition(condition, answers)
  );
  const suppressingConditions = (suggestion.displayPolicy.suppressWhen ?? []).map(
    (condition) => evaluateCondition(condition, answers)
  );
  const matchedSuppressingConditions = suppressingConditions.filter(
    (condition) => condition.matched
  );
  const supportCount = matchedSupportingConditions.length;
  const totalSupportingConditions = supportingConditions.length;
  const supportThresholdSatisfied = thresholdSatisfied(
    suggestion.displayPolicy,
    supportCount,
    totalSupportingConditions
  );
  const requiredConditionsSatisfied = requiredConditions.every(
    (condition) => condition.matched
  );
  const suppressed = matchedSuppressingConditions.length > 0;

  return {
    ...suggestion,
    supportingConditions,
    matchedSupportingConditions,
    unmatchedSupportingConditions,
    requiredConditions,
    suppressingConditions,
    matchedSuppressingConditions,
    supportCount,
    totalSupportingConditions,
    displayPolicyResult: {
      displayed: supportThresholdSatisfied && requiredConditionsSatisfied && !suppressed,
      supportThresholdSatisfied,
      requiredConditionsSatisfied,
      suppressed
    }
  };
}

export function evaluateAssessmentSuggestions(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): EvaluatedAssessmentSuggestion[] {
  return (pathway.assessmentSuggestions ?? []).map((suggestion) =>
    evaluateAssessmentSuggestion(suggestion, answers)
  );
}

export function rankAssessmentSuggestions(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): EvaluatedAssessmentSuggestion[] {
  return evaluateAssessmentSuggestions(pathway, answers)
    .filter((suggestion) => suggestion.displayPolicyResult.displayed)
    .sort(
      (left, right) =>
        right.supportCount - left.supportCount || left.label.localeCompare(right.label, "da")
    );
}

export function getPlanRecommendation(
  pathway: ClinicalPathway,
  assessmentValue: string
) {
  return pathway.planRecommendations?.find(
    (recommendation) => recommendation.assessmentValue === assessmentValue
  );
}
