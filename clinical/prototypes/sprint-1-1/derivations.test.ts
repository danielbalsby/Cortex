import { describe, expect, it } from "vitest";

import { deriveSprintOneOneAttention, deriveSprintOneOneCompleteness } from "./derivations";
import { SPRINT_ONE_ONE_CASE_ACTIONS } from "./fixtures";
import { createEmptySprintOneOneState } from "./model";
import { sprintOneOneReducer } from "./reducer";

describe("Sprint 1.1 clinical orientation", () => {
  it("starts without clinical facts or false completeness", () => {
    const state = createEmptySprintOneOneState();
    expect(state.history).toEqual({ provocations: [] });
    expect(state.objective).toEqual({ palpationFindings: [] });
    const result = deriveSprintOneOneCompleteness(state);
    expect(result.technicallyReady).toBe(false);
    expect(result.domains.find((domain) => domain.id === "history")?.summary).toBe("Ikke belyst endnu.");
  });

  it("records only displayed case facts and keeps new history dimensions unresolved", () => {
    const state = SPRINT_ONE_ONE_CASE_ACTIONS.reduce(sprintOneOneReducer, createEmptySprintOneOneState());
    expect(state.history).toMatchObject({ onset: "acute", traumaMechanism: "twisting", traumaContext: "under fodbold", locking: "no" });
    expect(state.history.painCourse).toBeUndefined();
    expect(state.history.provocations).toEqual([]);
    expect(deriveSprintOneOneCompleteness(state).domains.find((domain) => domain.id === "history")?.missing).toEqual(expect.arrayContaining(["Smerteforløb", "Smerteprovokation", "Funktionsevne", "Hvilesmerter", "Nattesmerter", "Hævelsens tidsforløb"]));
  });

  it("updates multi-value findings immutably and resolves contradictions", () => {
    const initial = createEmptySprintOneOneState();
    const withMedial = sprintOneOneReducer(initial, { type: "toggle-palpation", value: "medial-joint-line" });
    const withBoth = sprintOneOneReducer(withMedial, { type: "toggle-palpation", value: "mcl" });
    expect(initial.objective.palpationFindings).toEqual([]);
    expect(withBoth.objective.palpationFindings).toEqual(["medial-joint-line", "mcl"]);
    const negative = sprintOneOneReducer(withBoth, { type: "set-objective", key: "palpationStatus", value: "no-focal-tenderness" });
    expect(negative.objective.palpationFindings).toEqual([]);
  });

  it("keeps measured ROM and not assessable mutually exclusive", () => {
    let state = createEmptySprintOneOneState();
    state = sprintOneOneReducer(state, { type: "set-objective", key: "extensionDegrees", value: 0 });
    state = sprintOneOneReducer(state, { type: "set-objective", key: "flexionDegrees", value: 125 });
    state = sprintOneOneReducer(state, { type: "set-objective", key: "rangeNotAssessable", value: true });
    expect(state.objective.extensionDegrees).toBeUndefined();
    expect(state.objective.flexionDegrees).toBeUndefined();
    state = sprintOneOneReducer(state, { type: "set-objective", key: "extensionDegrees", value: 0 });
    expect(state.objective.rangeNotAssessable).toBeUndefined();
  });

  it("prunes trauma and swelling details when their parent meaning changes", () => {
    let state = SPRINT_ONE_ONE_CASE_ACTIONS.reduce(sprintOneOneReducer, createEmptySprintOneOneState());
    state = sprintOneOneReducer(state, { type: "set-history", key: "swellingTiming", value: "opstået over timer" });
    state = sprintOneOneReducer(state, { type: "set-history", key: "trauma", value: "no" });
    state = sprintOneOneReducer(state, { type: "set-history", key: "swelling", value: "none" });
    expect(state.history.traumaMechanism).toBeUndefined();
    expect(state.history.traumaContext).toBeUndefined();
    expect(state.history.swellingTiming).toBeUndefined();
  });

  it("derives explainable questions without changing state or implying a decision", () => {
    let state = SPRINT_ONE_ONE_CASE_ACTIONS.reduce(sprintOneOneReducer, createEmptySprintOneOneState());
    state = sprintOneOneReducer(state, { type: "set-imaging-intent", value: true });
    state = sprintOneOneReducer(state, { type: "set-imaging-modality", value: "mri" });
    const before = structuredClone(state);
    const result = deriveSprintOneOneAttention(state);
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "red-flags", basis: "missing-information" }),
      expect.objectContaining({ id: "swelling-course" }),
      expect.objectContaining({ id: "imaging-purpose", question: "Vil billeddiagnostik ændre håndteringen?" })
    ]));
    expect(result.map((item) => item.question).join(" ")).not.toMatch(/diagnose|anbefaler/i);
    expect(state).toEqual(before);
  });
});
