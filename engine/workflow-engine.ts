import type {
  ClinicalOutputDefinition,
  ClinicalPathway,
  ClinicalSection,
  ConsultationAnswers
} from "@/clinical/types";
import type { EncounterOutput, EncounterState } from "@/encounter/types";
import {
  validateConsultationSnapshot,
  type ConsultationSnapshotValidationResult
} from "@/engine/consultation-engine";
import {
  createEncounterFromValidatedAnswers,
  generateAllOutputsFromValidatedEncounter
} from "@/engine/encounter-engine";
import type { OutputGeneratorRegistry } from "@/engine/output-generator-registry";
import { getActiveOutputs } from "@/engine/output-visibility-engine";
import {
  validateClinicalPathway,
  type ValidationIssue
} from "@/engine/pathway-validation-engine";
import { evaluateRules, type EvaluatedRule } from "@/engine/rule-engine";
import {
  rankAssessmentSuggestions,
  type EvaluatedAssessmentSuggestion
} from "@/engine/suggestion-engine";
import { getVisibleSections } from "@/engine/visibility-engine";

export interface ValidatedWorkflowDerivation {
  encounter: EncounterState;
  visibleSections: ClinicalSection[];
  alerts: EvaluatedRule[];
  suggestions: EvaluatedAssessmentSuggestion[];
  activeOutputs: ClinicalOutputDefinition[];
  outputs: EncounterOutput[];
}

export type ValidatedWorkflowResult =
  | { valid: true; workflow: ValidatedWorkflowDerivation }
  | { valid: false; issues: ValidationIssue[] };

/**
 * The mandatory runtime boundary for clinical workflow derivation.
 * No visibility, decision support, output activation, generation, or readiness
 * work occurs until the pathway, registry references, and complete answer snapshot
 * have passed validation and hidden answers have reached a stable fixed point.
 */
export function deriveValidatedWorkflow(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers,
  registry: OutputGeneratorRegistry
): ValidatedWorkflowResult {
  const pathwayValidation = validateClinicalPathway(pathway, {
    availableGeneratorIds: registry.generatorIds
  });
  if (!pathwayValidation.valid) {
    return { valid: false, issues: pathwayValidation.issues };
  }

  const snapshotValidation: ConsultationSnapshotValidationResult =
    validateConsultationSnapshot(pathway, answers);
  if (!snapshotValidation.valid) return snapshotValidation;

  const encounter = createEncounterFromValidatedAnswers(pathway, snapshotValidation.answers);
  const visibleSections = getVisibleSections(pathway, encounter.answers);
  const alerts = evaluateRules(pathway, encounter.answers);
  const suggestions = rankAssessmentSuggestions(pathway, encounter.answers);
  const activeOutputs = getActiveOutputs(pathway, encounter.answers);
  const outputs = generateAllOutputsFromValidatedEncounter(encounter, registry);

  return {
    valid: true,
    workflow: {
      encounter,
      visibleSections,
      alerts,
      suggestions,
      activeOutputs,
      outputs
    }
  };
}
