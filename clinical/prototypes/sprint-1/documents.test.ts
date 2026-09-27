import { describe, expect, it } from "vitest";

import { generateImagingReferral, generateJournal, generatePhysiotherapyReferral } from "./documents";
import { SPRINT_ONE_CASE_ACTIONS } from "./fixtures";
import { createEmptySprintOneState, type SprintOneState } from "./model";
import { sprintOneReducer, type SprintOneAction } from "./reducer";

function apply(state: SprintOneState, actions: readonly SprintOneAction[]) {
  return actions.reduce(sprintOneReducer, state);
}

function completeState(): SprintOneState {
  return apply(createEmptySprintOneState(), [
    ...SPRINT_ONE_CASE_ACTIONS,
    { type: "set-history", key: "instability", value: "no" },
    { type: "set-history", key: "weightBearing", value: "normal" },
    { type: "set-history", key: "fever", value: "no" },
    { type: "set-history", key: "systemicIllness", value: "no" },
    { type: "set-history", key: "redHotSwollenJoint", value: "no" },
    { type: "set-objective", key: "gait", value: "normal" },
    { type: "set-objective", key: "inspection", value: "swelling" },
    { type: "set-objective", key: "rangeOfMotion", value: "full" },
    { type: "set-objective", key: "effusion", value: "mild" },
    { type: "set-objective", key: "palpation", value: "medial-joint-line" },
    { type: "set-objective", key: "lachman", value: "negative" },
    { type: "set-objective", key: "valgus", value: "painful-no-laxity" },
    { type: "set-objective", key: "varus", value: "stable" },
    { type: "set-objective", key: "meniscalTest", value: "positive" },
    { type: "set-objective", key: "patella", value: "no-specific-findings" },
    { type: "set-objective", key: "neurovascular", value: "normal" },
    { type: "set-assessment", value: "Fund forenelige med medial knæskade; endelig diagnose ikke fastlagt" },
    { type: "set-plan-text", key: "management", value: "aflastning efter symptomer" },
    { type: "set-plan-text", key: "followUp", value: "klinisk kontrol ved manglende bedring" },
    { type: "set-plan-text", key: "safetyNet", value: "kontakt ved feber eller tiltagende symptomer" }
  ]);
}

describe("Sprint 1 draft generation", () => {
  it("omits untouched clinical information from an empty consultation", () => {
    const document = generateJournal(createEmptySprintOneState());
    expect(document.status).toBe("provisional");
    expect(document.text).toBe("Problem\nKnæsmerter");
    expect(document.text).not.toMatch(/normal|ingen|højre|traume|vurdering|plan/i);
  });

  it("communicates the source case naturally without adding unrecorded specificity", () => {
    const state = apply(createEmptySprintOneState(), SPRINT_ONE_CASE_ACTIONS);
    const text = generateJournal(state).text;
    expect(text).toContain("34-årig mand med gener fra højre knæ efter vridtraume siden i går");
    expect(text).toContain("mediale knæsmerter og let hævelse");
    expect(text).toContain("patienten oplyser ingen aflåsning");
    expect(text).not.toMatch(/fikseret fod|ingen instabilitet|normal belastning/i);
  });

  it("generates deterministic journal text and changes density without changing facts", () => {
    const standardState = completeState();
    const shortState = sprintOneReducer(standardState, { type: "set-documentation-level", value: "short" });
    expect(generateJournal(standardState)).toEqual(generateJournal(standardState));
    expect(generateJournal(shortState).text).not.toBe(generateJournal(standardState).text);
    for (const fact of ["mediale knæsmerter", "let hævelse", "Vurdering", "Safety-net"]) {
      expect(generateJournal(shortState).text).toContain(fact);
      expect(generateJournal(standardState).text).toContain(fact);
    }
  });

  it("uses neutral plan wording and only becomes technically ready after all configured areas", () => {
    const document = generateJournal(completeState());
    expect(document.status).toBe("ready-for-review");
    expect(document.text).toContain("Plan: aflastning efter symptomer.");
    expect(document.text).not.toMatch(/er givet|er udført|er iværksat/i);
  });

  it("creates referral drafts only from explicit intent and required recorded inputs", () => {
    const state = completeState();
    expect(generateImagingReferral(state)).toBeUndefined();
    expect(generatePhysiotherapyReferral(state)).toBeUndefined();

    const imaging = apply(state, [
      { type: "set-imaging-enabled", value: true },
      { type: "set-imaging-field", key: "modality", value: "mri" },
      { type: "set-imaging-field", key: "indication", value: "vedvarende klinisk mistanke" },
      { type: "set-imaging-field", key: "clinicalQuestion", value: "tegn til medial strukturel skade" }
    ]);
    expect(generateImagingReferral(imaging)).toMatchObject({ status: "ready-for-review" });
    expect(generateImagingReferral(imaging)?.text).toContain("Ingen afsendelse er foretaget");

    const physio = sprintOneReducer(state, { type: "set-physiotherapy-enabled", value: true });
    expect(generatePhysiotherapyReferral(physio)).toMatchObject({ status: "provisional", text: "" });
  });
});
