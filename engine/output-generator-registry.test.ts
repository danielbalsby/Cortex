import { readFileSync } from "node:fs";

import { describe, expect, it, vi } from "vitest";

import type { ClinicalOutputDefinition, ClinicalPathway } from "@/clinical/types";
import { createEncounter, generateAllOutputs } from "@/engine/encounter-engine";
import {
  createOutputGeneratorRegistry,
  OutputGeneratorRegistryError,
  type OutputGeneratorRegistration
} from "@/engine/output-generator-registry";

function generated(text: string) {
  return { text, status: "ready" as const, missing: [] };
}

function registration(id: string, text = id): OutputGeneratorRegistration {
  return { id, generate: () => generated(text) };
}

function pathwayWith(outputs: ClinicalOutputDefinition[]): ClinicalPathway {
  return {
    id: "output-orchestration-fixture",
    title: "Output orchestration fixture",
    category: "Test",
    version: "1.0.0",
    description: "Non-clinical output registry fixture.",
    sections: [
      {
        id: "fixture",
        title: "Fixture",
        kind: "plan",
        journalSection: "plan",
        fields: [
          {
            id: "selected",
            label: "Selected",
            type: "multi-choice",
            options: [{ value: "extra", label: "Extra", output: "Extra." }]
          }
        ]
      }
    ],
    outputs,
    rules: []
  };
}

describe("output generator registry", () => {
  it("resolves generators by explicit ID independently of registration order", () => {
    const alpha = registration("test.alpha");
    const beta = registration("test.beta");
    const first = createOutputGeneratorRegistry([beta, alpha]);
    const second = createOutputGeneratorRegistry([alpha, beta]);

    expect(first.generatorIds).toEqual(["test.alpha", "test.beta"]);
    expect(second.generatorIds).toEqual(first.generatorIds);
    expect(first.resolve("test.alpha")).toBe(alpha.generate);
    expect(second.resolve("test.beta")).toBe(beta.generate);
  });

  it("rejects duplicate generator IDs with a development diagnostic", () => {
    expect(() =>
      createOutputGeneratorRegistry([registration("test.same"), registration("test.same")])
    ).toThrowError(
      expect.objectContaining({
        code: "output-generator.duplicate-id",
        generatorId: "test.same"
      })
    );
  });

  it("rejects an invalid empty registration ID", () => {
    expect(() => createOutputGeneratorRegistry([registration("  ")])).toThrowError(
      expect.objectContaining({ code: "output-generator.invalid-id" })
    );
  });

  it("fails clearly when an unknown generator is resolved", () => {
    const registry = createOutputGeneratorRegistry([]);

    expect(() => registry.resolve("test.missing")).toThrowError(
      expect.objectContaining({
        code: "output-generator.unknown-id",
        generatorId: "test.missing"
      })
    );
    expect(() => registry.resolve("test.missing")).toThrow(OutputGeneratorRegistryError);
  });
});

describe("generic output orchestration", () => {
  it("dispatches by generator ID rather than output type", () => {
    const outputs: ClinicalOutputDefinition[] = [
      {
        id: "first",
        label: "First",
        type: "journal",
        generatorId: "test.first",
        alwaysActive: true
      },
      {
        id: "second",
        label: "Second",
        type: "journal",
        generatorId: "test.second",
        alwaysActive: true
      }
    ];
    const pathway = pathwayWith(outputs);
    const registry = createOutputGeneratorRegistry([
      registration("test.first", "first generator"),
      registration("test.second", "second generator")
    ]);

    const encounter = createEncounter(pathway, { selected: [] });
    const first = generateAllOutputs(encounter, registry);
    const second = generateAllOutputs(encounter, registry);

    expect(first).toEqual([
      expect.objectContaining({ id: "first", kind: "journal", text: "first generator" }),
      expect.objectContaining({ id: "second", kind: "journal", text: "second generator" })
    ]);
    expect(second).toEqual(first);
  });

  it("invokes only generators for active output definitions", () => {
    const always = vi.fn(() => generated("always"));
    const conditional = vi.fn(() => generated("conditional"));
    const pathway = pathwayWith([
      {
        id: "always",
        label: "Always",
        type: "journal",
        generatorId: "test.always",
        alwaysActive: true
      },
      {
        id: "conditional",
        label: "Conditional",
        type: "xray-referral",
        generatorId: "test.conditional",
        activeWhen: [{ fieldId: "selected", operator: "includes", value: "extra" }]
      }
    ]);
    const registry = createOutputGeneratorRegistry([
      { id: "test.always", generate: always },
      { id: "test.conditional", generate: conditional }
    ]);

    expect(generateAllOutputs(createEncounter(pathway, { selected: [] }), registry)).toHaveLength(1);
    expect(always).toHaveBeenCalledOnce();
    expect(conditional).not.toHaveBeenCalled();
  });

  it("rejects an empty generated output marked ready", () => {
    const pathway = pathwayWith([
      {
        id: "empty",
        label: "Empty",
        type: "journal",
        generatorId: "test.empty",
        alwaysActive: true
      }
    ]);
    const registry = createOutputGeneratorRegistry([
      { id: "test.empty", generate: () => generated("") }
    ]);

    expect(() =>
      generateAllOutputs(createEncounter(pathway, { selected: [] }), registry)
    ).toThrow(/empty output marked ready/);
  });

  it("fails clearly when an active output references a missing generator", () => {
    const pathway = pathwayWith([
      {
        id: "missing",
        label: "Missing",
        type: "journal",
        generatorId: "test.missing",
        alwaysActive: true
      }
    ]);

    expect(() =>
      generateAllOutputs(
        createEncounter(pathway, { selected: [] }),
        createOutputGeneratorRegistry([])
      )
    ).toThrowError(
      expect.objectContaining({
        code: "output-generator.unknown-id",
        generatorId: "test.missing"
      })
    );
  });

  it("contains no knee-specific clinical field IDs in the generic encounter engine", () => {
    const source = readFileSync(new URL("./encounter-engine.ts", import.meta.url), "utf8");

    for (const fieldId of [
      "side",
      "trauma",
      "weight-bearing",
      "swelling",
      "rom",
      "joint-line"
    ]) {
      expect(source).not.toContain(`"${fieldId}"`);
      expect(source).not.toContain(`'${fieldId}'`);
    }
  });
});
