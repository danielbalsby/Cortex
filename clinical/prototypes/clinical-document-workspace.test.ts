import { describe, expect, it } from "vitest";

import {
  NORMAL_BASIC_FINDINGS,
  confirmNormalBasicFindings,
  createEmptyPrototypeState,
  generatePrototypeNote,
  getNormalFindingStatus,
  selectPrototypeScenario,
  setPrototypeFact,
  setPrototypeMode
} from "@/clinical/prototypes/clinical-document-workspace";

describe("clinical document workspace prototype state", () => {
  it("preserves one shared fact state while switching between Quick and Standard", () => {
    const quick = selectPrototypeScenario("gradual-oa");
    const before = structuredClone(quick.facts);
    const standard = setPrototypeMode(quick, "standard");
    const quickAgain = setPrototypeMode(standard, "quick");

    expect(standard.facts).toEqual(before);
    expect(quickAgain.facts).toEqual(before);
    expect(quickAgain.scenarioId).toBe("gradual-oa");
    expect(quick.facts).toEqual(before);
  });

  it("records grouped normal findings only after explicit activation", () => {
    const empty = createEmptyPrototypeState();

    expect(empty.normalGroupConfirmed).toBe(false);
    expect(empty.facts).toEqual({});
    expect(generatePrototypeNote(empty)).toBe("");

    const confirmed = confirmNormalBasicFindings(empty);

    expect(confirmed.normalGroupConfirmed).toBe(true);
    expect(confirmed.facts.gait).toBe("normal");
    expect(confirmed.facts.redness).toBe("none");
    expect(generatePrototypeNote(confirmed)).toContain("ingen rødme");
    expect(empty.facts).toEqual({});
  });

  it("lets a positive exception replace a conflicting grouped normal finding", () => {
    const confirmed = confirmNormalBasicFindings(createEmptyPrototypeState());
    const exception = setPrototypeFact(confirmed, "effusion", "moderate");
    const effusionFinding = NORMAL_BASIC_FINDINGS.find(
      (finding) => finding.key === "effusion"
    )!;
    const note = generatePrototypeNote(exception);

    expect(exception.facts.effusion).toBe("moderate");
    expect(getNormalFindingStatus(exception, effusionFinding)).toBe("overridden");
    expect(note).toContain("moderat effusion");
    expect(note).not.toContain("ingen betydende effusion");
  });

  it("omits every untouched clinical field from the generated note", () => {
    const sideOnly = setPrototypeFact(createEmptyPrototypeState(), "side", "right");
    const note = generatePrototypeNote(sideOnly);

    expect(note).toBe("Problem\nHøjresidige knæproblem.");
    expect(note).not.toContain("Anamnese");
    expect(note).not.toContain("Objektivt");
    expect(note).not.toContain("Vurdering");
    expect(note).not.toContain("Plan");
    expect(note).not.toMatch(/normal|ingen|negativ/i);
  });
});
