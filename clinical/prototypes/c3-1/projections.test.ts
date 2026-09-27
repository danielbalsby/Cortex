import { describe, expect, it } from "vitest";

import {
  createC3Assessment,
  createC3FixtureState,
  selectC3Phrase
} from "@/clinical/prototypes/c3/state";

import {
  getC31PsoapSections,
  projectC31PsoapDocument
} from "./projections";

describe("C3.1 PSOAP presentation projection", () => {
  it("projects Quick and Standard from the same C3 source without inventing Assessment", () => {
    const state = createC3FixtureState();
    const revision = state.sourceRevision;

    const quick = projectC31PsoapDocument(state, "quick");
    const standard = projectC31PsoapDocument(state, "standard");

    expect(quick).toMatch(/^P: Højresidige knæsmerter\n\nS:/u);
    expect(quick).toContain("\n\nO:");
    expect(quick).toContain("\n\nA:\n\nP:");
    expect(standard).toMatch(/^P: Højresidige knæsmerter\n\nS:/u);
    expect(standard.length).toBeGreaterThan(quick.length);
    expect(state.sourceRevision).toBe(revision);
  });

  it("keeps clinician Assessment and selected Plan commitments in their own PSOAP sections", () => {
    let state = createC3FixtureState();
    const assessment = createC3Assessment(state, "primary", "Klinikerens vurdering.");
    expect(assessment.outcome).toBe("applied");
    state = assessment.state;
    state = selectC3Phrase(state, "C3-PLAN-001").state;

    const sections = getC31PsoapSections(state, "standard");
    expect(sections.find((section) => section.key === "assessment")?.text).toBe("Klinikerens vurdering.");
    expect(sections.find((section) => section.key === "plan")?.text).toContain("Fortsat observation af forløbet.");
  });
});
