export type SectionKind =
  | "problem"
  | "history"
  | "objective"
  | "assessment"
  | "plan";

export type FieldType = "single-choice" | "multi-choice" | "short-text";
export type AlertSeverity = "info" | "warning" | "critical";

export interface ClinicalOption {
  value: string;
  label: string;
  output?: string;
}

export interface ClinicalField {
  id: string;
  label: string;
  type: FieldType;
  defaultValue?: string | string[];
  options?: ClinicalOption[];
  placeholder?: string;
  output?: {
    prefix?: string;
    suffix?: string;
  };
}

export interface ClinicalSection {
  id: string;
  title: string;
  kind: SectionKind;
  fields: ClinicalField[];
}

export interface RuleCondition {
  fieldId: string;
  operator: "equals" | "includes" | "truthy";
  value?: string;
}

export interface ClinicalRule {
  id: string;
  all: RuleCondition[];
  alert: {
    severity: AlertSeverity;
    title: string;
    message: string;
  };
}

export interface AssessmentSuggestion {
  value: string;
  label: string;
  reason: string;
  conditions: RuleCondition[];
}

export interface PlanRecommendation {
  assessmentValue: string;
  actions: string[];
  rationale: string;
}

export interface ClinicalPathway {
  id: string;
  title: string;
  category: string;
  version: string;
  description: string;
  sections: ClinicalSection[];
  rules: ClinicalRule[];
  assessmentSuggestions?: AssessmentSuggestion[];
  planRecommendations?: PlanRecommendation[];
}

export type ConsultationAnswers = Record<string, string | string[]>;
