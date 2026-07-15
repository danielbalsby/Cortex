import type {
  GeneratedOutputContent,
  OutputGeneratorContext,
  OutputGeneratorRegistration
} from "@/engine/output-generator-registry";
import { generatePSOAP } from "@/engine/output-engine";

export type PsoapReadinessEvaluator = (
  context: OutputGeneratorContext & { text: string }
) => Omit<GeneratedOutputContent, "text">;

export function createPsoapOutputGenerator(
  id: string,
  evaluateReadiness: PsoapReadinessEvaluator
): OutputGeneratorRegistration {
  return {
    id,
    generate(context) {
      const text = generatePSOAP(context.pathway, context.answers);
      return {
        text,
        ...evaluateReadiness({ ...context, text })
      };
    }
  };
}
