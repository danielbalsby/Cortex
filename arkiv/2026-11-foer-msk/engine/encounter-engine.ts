import type {
  ClinicalOutputDefinition,
  ClinicalPathway,
  ConsultationAnswers
} from "@/clinical/types";
import type { EncounterOutput, EncounterState } from "@/encounter/types";
import type { OutputGeneratorRegistry } from "@/engine/output-generator-registry";
import { getActiveOutputs } from "@/engine/output-visibility-engine";

/** Low-level constructor. `answers` must already be fully validated and stabilised. */
export function createEncounterFromValidatedAnswers(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): EncounterState {
  return {
    pathway,
    answers
  };
}

/** Low-level generator. The encounter and definition must already be runtime validated. */
export function generateEncounterOutputFromValidatedEncounter(
  encounter: EncounterState,
  definition: ClinicalOutputDefinition,
  registry: OutputGeneratorRegistry
): EncounterOutput {
  const generator = registry.resolve(definition.generatorId);
  const content = generator({
    pathway: encounter.pathway,
    answers: encounter.answers,
    definition
  });

  if (content.status === "ready" && !content.text.trim()) {
    throw new Error(
      `Output generator "${definition.generatorId}" returned an empty output marked ready for "${definition.id}".`
    );
  }

  return {
    ...content,
    id: definition.id,
    kind: definition.type,
    title: definition.label
  };
}

/** Low-level generator. The encounter and registry references must already be validated. */
export function generateAllOutputsFromValidatedEncounter(
  encounter: EncounterState,
  registry: OutputGeneratorRegistry
): EncounterOutput[] {
  return getActiveOutputs(encounter.pathway, encounter.answers).map((definition) =>
    generateEncounterOutputFromValidatedEncounter(encounter, definition, registry)
  );
}
