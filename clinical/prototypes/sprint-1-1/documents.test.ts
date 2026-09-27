import { describe, expect, it } from "vitest";

import { generateSprintOneOneJournal } from "./documents";
import { SPRINT_ONE_ONE_CASE_ACTIONS } from "./fixtures";
import { createEmptySprintOneOneState, type SprintOneOneState } from "./model";
import { sprintOneOneReducer, type SprintOneOneAction } from "./reducer";

function apply(state: SprintOneOneState, actions: readonly SprintOneOneAction[]) {
  return actions.reduce(sprintOneOneReducer, state);
}

function completeState() {
  return apply(createEmptySprintOneOneState(), [
    ...SPRINT_ONE_ONE_CASE_ACTIONS,
    { type: "set-history", key: "painCourse", value: "intermittent" },
    { type: "toggle-provocation", value: "rotation" },
    { type: "toggle-provocation", value: "direction-change" },
    { type: "set-history", key: "function", value: "mildly-reduced" },
    { type: "set-history", key: "swellingTiming", value: "opstået gradvist over timer" },
    { type: "set-history", key: "instability", value: "no" },
    { type: "set-history", key: "restPain", value: "no" },
    { type: "set-history", key: "nightPain", value: "no" },
    { type: "set-history", key: "fever", value: "no" },
    { type: "set-history", key: "systemicIllness", value: "no" },
    { type: "set-history", key: "redHotSwollenJoint", value: "no" },
    { type: "set-objective", key: "gait", value: "limp" },
    { type: "set-objective", key: "inspection", value: "swelling" },
    { type: "set-objective", key: "extensionDegrees", value: 0 },
    { type: "set-objective", key: "flexionDegrees", value: 125 },
    { type: "set-objective", key: "effusion", value: "mild" },
    { type: "toggle-palpation", value: "medial-joint-line" },
    { type: "toggle-palpation", value: "mcl" },
    { type: "set-objective", key: "lachman", value: "negative" },
    { type: "set-objective", key: "valgus", value: "painful-no-laxity" },
    { type: "set-objective", key: "varus", value: "stable" },
    { type: "set-objective", key: "meniscalTest", value: "positive" },
    { type: "set-objective", key: "patella", value: "negative" },
    { type: "set-objective", key: "neurovascular", value: "normal" },
    { type: "set-assessment", value: "Fund forenelige med medial knæskade; endelig diagnose ikke fastlagt" },
    { type: "set-plan-text", key: "management", value: "aflastning efter symptomer" },
    { type: "set-plan-text", key: "followUp", value: "klinisk kontrol ved manglende bedring" },
    { type: "set-plan-text", key: "safetyNet", value: "kontakt ved feber eller tiltagende symptomer" }
  ]);
}

describe("Sprint 1.1 clinical journal", () => {
  it("produces no clinical prose from untouched answers", () => {
    const journal = generateSprintOneOneJournal(createEmptySprintOneOneState());
    expect(journal.text).toBe("");
    expect(journal.status).toBe("provisional");
  });

  it("turns the fixed case into natural clinical language without invented facts", () => {
    const journal = generateSprintOneOneJournal(apply(createEmptySprintOneOneState(), SPRINT_ONE_ONE_CASE_ACTIONS));
    expect(journal.text).toContain("34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går");
    expect(journal.text).toContain("Mediale smerter og let hævelse");
    expect(journal.text).toContain("Ingen ægte aflåsning");
    expect(journal.text).not.toMatch(/patienten oplyser|gener|registrerede oplysninger|Safety-vurdering|fikseret fod/i);
    expect(journal.text).not.toMatch(/ingen instabilitet|normal gang|fuld bevægelighed/i);
  });

  it("renders precise ROM and every selected palpation finding", () => {
    const journal = generateSprintOneOneJournal(completeState());
    expect(journal.text).toContain("ROM: ekstension 0°, fleksion 125°");
    expect(journal.text).toContain("Palpationsømhed ved mediale ledlinje og MCL");
    expect(journal.text).toContain("menisktest positiv");
  });

  it("is deterministic and keeps uncertainty and neutral plan semantics", () => {
    const state = completeState();
    expect(generateSprintOneOneJournal(state)).toEqual(generateSprintOneOneJournal(state));
    const journal = generateSprintOneOneJournal(state);
    expect(journal.status).toBe("ready-for-review");
    expect(journal.text).toContain("endelig diagnose ikke fastlagt");
    expect(journal.text).toContain("Plan: aflastning efter symptomer");
    expect(journal.text).not.toMatch(/er givet|er iværksat|er udført/i);
  });

  it("changes presentation level without changing source state", () => {
    const state = completeState();
    const before = structuredClone(state);
    const short = generateSprintOneOneJournal(sprintOneOneReducer(state, { type: "set-documentation-level", value: "short" }));
    const extended = generateSprintOneOneJournal(sprintOneOneReducer(state, { type: "set-documentation-level", value: "extended" }));
    expect(short.text).not.toBe(extended.text);
    expect(short.text).toContain("endelig diagnose ikke fastlagt");
    expect(short.text).toContain("Safety-net");
    expect(state).toEqual(before);
  });
});
