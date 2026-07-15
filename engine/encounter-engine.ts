import type {
  ClinicalOutputDefinition,
  ClinicalPathway,
  ConsultationAnswers
} from "@/clinical/types";
import type { EncounterOutput, EncounterState } from "@/encounter/types";
import type { OutputGeneratorRegistry } from "@/engine/output-generator-registry";
import { getActiveOutputs } from "@/engine/output-visibility-engine";

export function createEncounter(
  pathway: ClinicalPathway,
  answers: ConsultationAnswers
): EncounterState {
  return {
    pathway,
    answers
  };
}

export function generateEncounterOutput(
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

export function generateAllOutputs(
  encounter: EncounterState,
  registry: OutputGeneratorRegistry
): EncounterOutput[] {
  return getActiveOutputs(encounter.pathway, encounter.answers).map((definition) =>
    generateEncounterOutput(encounter, definition, registry)
  );
}
