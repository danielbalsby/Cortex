import type {
  ClinicalOutputDefinition,
  ClinicalPathway,
  ConsultationAnswers
} from "@/clinical/types";

export interface OutputGeneratorContext {
  pathway: ClinicalPathway;
  answers: ConsultationAnswers;
  definition: ClinicalOutputDefinition;
}

export interface GeneratedOutputContent {
  text: string;
  status: "ready" | "missing-data";
  missing: string[];
  rationale?: string;
}

export type ClinicalOutputGenerator = (
  context: OutputGeneratorContext
) => GeneratedOutputContent;

export interface OutputGeneratorRegistration {
  id: string;
  generate: ClinicalOutputGenerator;
}

export interface OutputGeneratorRegistry {
  readonly generatorIds: readonly string[];
  resolve(generatorId: string): ClinicalOutputGenerator;
}

export class OutputGeneratorRegistryError extends Error {
  constructor(
    readonly code: "output-generator.invalid-id" | "output-generator.duplicate-id" | "output-generator.unknown-id",
    message: string,
    readonly generatorId: string
  ) {
    super(message);
    this.name = "OutputGeneratorRegistryError";
  }
}

export function createOutputGeneratorRegistry(
  registrations: readonly OutputGeneratorRegistration[]
): OutputGeneratorRegistry {
  const sorted = [...registrations].sort((left, right) =>
    left.id < right.id ? -1 : left.id > right.id ? 1 : 0
  );
  const generators = new Map<string, ClinicalOutputGenerator>();

  for (const registration of sorted) {
    if (!registration.id.trim()) {
      throw new OutputGeneratorRegistryError(
        "output-generator.invalid-id",
        "Output generator registrations require a non-empty ID.",
        registration.id
      );
    }
    if (generators.has(registration.id)) {
      throw new OutputGeneratorRegistryError(
        "output-generator.duplicate-id",
        `Duplicate output generator ID "${registration.id}".`,
        registration.id
      );
    }
    generators.set(registration.id, registration.generate);
  }

  const generatorIds = Object.freeze([...generators.keys()]);

  return Object.freeze({
    generatorIds,
    resolve(generatorId: string) {
      const generator = generators.get(generatorId);
      if (!generator) {
        throw new OutputGeneratorRegistryError(
          "output-generator.unknown-id",
          `No output generator is registered for ID "${generatorId}".`,
          generatorId
        );
      }
      return generator;
    }
  });
}
