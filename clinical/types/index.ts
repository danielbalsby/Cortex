export type SectionKind =
  | "problem"
  | "history"
  | "objective"
  | "assessment"
  | "plan";

/** PSOAP output group — independent of UI section layout and `kind`. */
export type JournalSection =
  | "problem"
  | "subjective"
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
  options?: ClinicalOption[];
  placeholder?: string;
  visibleWhen?: RuleCondition[];
  output?: {
    prefix?: string;
    suffix?: string;
  };
}

export interface ClinicalSection {
  id: string;
  title: string;
  kind: SectionKind;
  journalSection: JournalSection;
  fields: ClinicalField[];
  visibleWhen?: RuleCondition[];
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

export type ClinicalOutputType =
  | "journal"
  | "physiotherapy-referral"
  | "xray-referral"
  | "orthopedic-referral";

export interface ClinicalOutputDefinition {
  id: string;
  label: string;
  type: ClinicalOutputType;
  generatorId: string;
  alwaysActive?: boolean;
  activeWhen?: RuleCondition[];
}

export interface ClinicalPathway {
  id: string;
  title: string;
  category: string;
  version: string;
  description: string;
  sections: ClinicalSection[];
  outputs: ClinicalOutputDefinition[];
  rules: ClinicalRule[];
  assessmentSuggestions?: AssessmentSuggestion[];
  planRecommendations?: PlanRecommendation[];
}

export type ConsultationAnswers = Record<string, string | string[]>;
