import { describe, expect, it } from "vitest";

import { deriveClinicalAttention } from "./attention";
import { deriveConsultationCompleteness } from "./completeness";
import { SPRINT_ONE_CASE_ACTIONS } from "./fixtures";
import { createEmptySprintOneState, type SprintOneState } from "./model";
import { sprintOneReducer } from "./reducer";

function withCase(): SprintOneState {
  return SPRINT_ONE_CASE_ACTIONS.reduce(sprintOneReducer, createEmptySprintOneState());
}

describe("Sprint 1 consultation orientation", () => {
  it("starts without clinically meaningful defaults and remains incomplete", () => {
    const state = createEmptySprintOneState();
    expect(state).toEqual({ history: {}, objective: {}, plan: {}, documentationLevel: "standard" });
    expect(deriveConsultationCompleteness(state).journalTechnicallyReady).toBe(false);
  });

  it("records only the displayed synthetic case and keeps unknowns unresolved", () => {
    const state = withCase();
    expect(state.history).toMatchObject({ trauma: "yes", traumaMechanism: "twisting", painLocation: "medial", swelling: "mild", locking: "no" });
    expect(state.history.instability).toBeUndefined();
    expect(state.history.weightBearing).toBeUndefined();
    expect(deriveConsultationCompleteness(state).domains.find((item) => item.id === "history")?.missing).toEqual(["Instabilitet", "Belastningsevne"]);
  });

  it("does not treat not assessed or not performed as sufficient assessment", () => {
    let state = withCase();
    state = sprintOneReducer(state, { type: "set-history", key: "instability", value: "not-assessed" });
    state = sprintOneReducer(state, { type: "set-objective", key: "lachman", value: "not-performed" });
    const completeness = deriveConsultationCompleteness(state);
    expect(completeness.domains.find((item) => item.id === "history")?.missing).toContain("Instabilitet");
    expect(completeness.domains.find((item) => item.id === "objective")?.missing).toContain("Lachman");
  });

  it("prunes mechanism when trauma is explicitly changed to no", () => {
    const previous = withCase();
    const next = sprintOneReducer(previous, { type: "set-history", key: "trauma", value: "no" });
    expect(previous.history.traumaMechanism).toBe("twisting");
    expect(next.history.traumaMechanism).toBeUndefined();
  });

  it("derives attention deterministically without modifying state", () => {
    const state = withCase();
    const before = structuredClone(state);
    const first = deriveClinicalAttention(state);
    const second = deriveClinicalAttention(state);
    expect(first).toEqual(second);
    expect(first).toContainEqual(expect.objectContaining({ id: "safety-unresolved" }));
    expect(state).toEqual(before);
  });
});
