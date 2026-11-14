import { kneeOutputGenerators } from "@/clinical/pathways/knee-pain/output-generators";
import { createOutputGeneratorRegistry } from "@/engine/output-generator-registry";

export const cortexOutputGeneratorRegistry = createOutputGeneratorRegistry([
  ...kneeOutputGenerators
]);
