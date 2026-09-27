import { describe, expect, it } from "vitest";

import {
  C3_ASSESSMENT_FIXTURE,
  C3_EXPECTED_QUICK,
  C3_EXPECTED_STANDARD
} from "./fixtures";
import { createEmptyC3State, getActiveAssessments, getActivePhrases } from "./model";
import { deriveC3Completeness, projectC3Document } from "./projections";
import {
  applyC3FactAction,
  continueC3ManualDraft,
  createC3Assessment,
  createC3FixtureState,
  discardC3ManualDraft,
  discardC3Recovery,
  editC3Phrase,
  getC3DraftStatus,
  removeC3Assessment,
  removeC3Phrase,
  restoreC3Recovery,
  reviseC3Assessment,
  selectC3Phrase,
  setC3ManualDraft,
  setC3Profile
} from "./state";

function completeFixtureRecords() {
  let state = createC3FixtureState();
  state = createC3Assessment(state, "primary", C3_ASSESSMENT_FIXTURE).state;
  state = selectC3Phrase(state, "C3-PLAN-001").state;
  state = selectC3Phrase(state, "C3-FU-001").state;
  state = selectC3Phrase(state, "C3-SN-001").state;
  return state;
}

describe("C3 bounded prototype state", () => {
  it("starts without clinical facts, assessment, phrases or draft assertions", () => {
    const state = createEmptyC3State();
    expect(state.factRoot.history).toEqual({ provocations: [] });
    expect(state.factRoot.objective).toEqual({ palpationFindings: [] });
    expect(getActiveAssessments(state)).toEqual([]);
    expect(getActivePhrases(state)).toEqual([]);
    expect(projectC3Document(state, "quick")).toBe("");
    expect(projectC3Document(state, "standard")).toBe("");
  });

  it("uses the unchanged fact reducer and increments revision only for accepted fact changes", () => {
    const initial = createEmptyC3State();
    const selected = applyC3FactAction(initial, {
      type: "set-history",
      key: "side",
      value: "right"
    });
    expect(selected.outcome).toBe("applied");
    expect(selected.state.factRoot.history.side).toBe("right");
    expect(selected.state.sourceRevision).toBe(1);

    const unchanged = applyC3FactAction(selected.state, {
      type: "set-history",
      key: "side",
      value: "right"
    });
    expect(unchanged.outcome).toBe("unchanged");
    expect(unchanged.state).toBe(selected.state);
  });

  it("produces the locked Quick and Standard texts from one source revision", () => {
    const state = completeFixtureRecords();
    expect(projectC3Document(state, "quick")).toBe(C3_EXPECTED_QUICK);
    expect(projectC3Document(state, "standard")).toBe(C3_EXPECTED_STANDARD);
    expect(state.sourceRevision).toBe(5);
  });

  it("switches projection profile without mutating facts, records or source revision", () => {
    const state = completeFixtureRecords();
    const quick = setC3Profile(state, "quick");
    const standard = setC3Profile(quick, "standard");
    const returned = setC3Profile(standard, "quick");

    expect(returned.factRoot).toBe(state.factRoot);
    expect(returned.assessments).toBe(state.assessments);
    expect(returned.phrases).toBe(state.phrases);
    expect(returned.sourceRevision).toBe(state.sourceRevision);
    expect(projectC3Document(returned, "quick")).toBe(C3_EXPECTED_QUICK);
  });

  it("preserves clinician-owned assessment create, edit, reclassify and removal history", () => {
    let state = createEmptyC3State();
    state = createC3Assessment(state, "secondary", "Første formulering").state;
    const entryId = getActiveAssessments(state)[0].entryId;
    state = reviseC3Assessment(state, entryId, "primary", "Revideret formulering").state;

    expect(getActiveAssessments(state)).toMatchObject([
      { entryId, role: "primary", text: "Revideret formulering", origin: "clinician-free-text" }
    ]);
    expect(state.assessments).toHaveLength(2);

    const blocked = createC3Assessment(state, "primary", "Anden primær");
    expect(blocked.outcome).toBe("blocked");
    expect(blocked.state).toBe(state);

    state = removeC3Assessment(state, entryId).state;
    expect(getActiveAssessments(state)).toEqual([]);
    expect(state.assessments).toHaveLength(3);
    expect(state.assessments.at(-1)?.status).toBe("removed");
  });

  it("retains phrase fixture provenance through selection, editing and removal", () => {
    let state = createEmptyC3State();
    state = selectC3Phrase(state, "C3-PLAN-001").state;
    const selected = getActivePhrases(state)[0];
    expect(selected).toMatchObject({
      phraseId: "C3-PLAN-001",
      fixtureId: "C3-FIX-001",
      fixtureVersion: "1.1",
      originalText: "Fortsat observation af forløbet.",
      actor: "clinician",
      action: "selected"
    });

    state = editC3Phrase(state, selected.entryId, "Fortsat observation af det kliniske forløb.").state;
    expect(getActivePhrases(state)[0]).toMatchObject({
      currentText: "Fortsat observation af det kliniske forløb.",
      action: "edited",
      predecessorId: selected.versionId
    });

    state = removeC3Phrase(state, selected.entryId).state;
    expect(getActivePhrases(state)).toEqual([]);
    expect(state.phrases).toHaveLength(3);
    expect(state.phrases.at(-1)?.status).toBe("removed");
  });

  it("keeps Quick and Standard manual drafts separate and marks both stale after source changes", () => {
    let state = completeFixtureRecords();
    state = setC3ManualDraft(state, "quick", C3_EXPECTED_QUICK, "Quick manuel");
    state = setC3ManualDraft(state, "standard", C3_EXPECTED_STANDARD, "Standard manuel");
    expect(getC3DraftStatus(state, "quick")).toBe("current");
    expect(getC3DraftStatus(state, "standard")).toBe("current");

    state = applyC3FactAction(state, {
      type: "set-history",
      key: "painLocation",
      value: "lateral"
    }).state;
    expect(state.drafts.quick?.text).toBe("Quick manuel");
    expect(state.drafts.standard?.text).toBe("Standard manuel");
    expect(getC3DraftStatus(state, "quick")).toBe("stale");
    expect(getC3DraftStatus(state, "standard")).toBe("stale");

    state = continueC3ManualDraft(state, "quick", projectC3Document(state, "quick"));
    expect(getC3DraftStatus(state, "quick")).toBe("current");
    expect(getC3DraftStatus(state, "standard")).toBe("stale");
    state = discardC3ManualDraft(state, "standard");
    expect(getC3DraftStatus(state, "standard")).toBe("generated");
  });

  it("preserves field-specific uncertainty and prunes stale ROM degrees through the existing reducer", () => {
    let state = createC3FixtureState();
    state = applyC3FactAction(state, {
      type: "set-history",
      key: "nightPain",
      value: undefined
    }).state;
    expect(projectC3Document(state, "standard")).not.toContain("nattesmerter");
    expect(deriveC3Completeness(state).domains.find((domain) => domain.id === "history")?.missing)
      .toContain("Nattesmerter");

    state = applyC3FactAction(state, {
      type: "set-objective",
      key: "lachman",
      value: "not-performed"
    }).state;
    expect(projectC3Document(state, "standard")).toContain("Lachman ikke udført");

    state = applyC3FactAction(state, {
      type: "set-objective",
      key: "rangeNotAssessable",
      value: true
    }).state;
    expect(state.factRoot.objective.extensionDegrees).toBeUndefined();
    expect(state.factRoot.objective.flexionDegrees).toBeUndefined();
    expect(projectC3Document(state, "standard")).toContain("ROM ikke vurderbar");
    expect(projectC3Document(state, "standard")).not.toContain("ekstension 0°");
  });

  it("captures recovery before pruning and blocks a second collision without fact mutation", () => {
    let state = createC3FixtureState();
    const trauma = applyC3FactAction(state, {
      type: "set-history",
      key: "trauma",
      value: "no"
    });
    expect(trauma.outcome).toBe("applied");
    expect(trauma.recoveryCreated?.kind).toBe("trauma");
    expect(trauma.state.factRoot.history.traumaMechanism).toBeUndefined();
    expect(projectC3Document(trauma.state, "standard")).not.toContain("vridtraume");

    const collision = applyC3FactAction(trauma.state, {
      type: "set-history",
      key: "swelling",
      value: "none"
    });
    expect(collision.outcome).toBe("blocked");
    expect(collision.state).toBe(trauma.state);
    expect(collision.state.factRoot.history.swelling).toBe("mild");

    state = restoreC3Recovery(trauma.state);
    expect(state.factRoot.history.trauma).toBe("yes");
    expect(state.factRoot.history.traumaMechanism).toBe("twisting");
    expect(state.recovery).toBeUndefined();

    const swelling = applyC3FactAction(state, {
      type: "set-history",
      key: "swelling",
      value: "none"
    }).state;
    expect(swelling.recovery?.kind).toBe("swelling");
    const discarded = discardC3Recovery(swelling);
    expect(discarded.factRoot.history.swelling).toBe("none");
    expect(discarded.factRoot.history.swellingTiming).toBeUndefined();
  });
});
