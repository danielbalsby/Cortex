import { describe, expect, it } from "vitest";

import {
  getActivePhrases
} from "@/clinical/prototypes/c3/model";
import {
  selectC3PhraseDefinition
} from "@/clinical/prototypes/c3/state";

import {
  C33_PHRASES,
  findMatchingC33ProblemProfiles
} from "./fixtures";
import {
  createEmptyC33State
} from "./model";
import {
  projectC33PsoapDocument
} from "./projections";
import {
  applyC33FactAction,
  configureC33Problem,
  hasC33AccompanyingSymptomsNone,
  hasC33NegativeSymptomBatch,
  hasC33RedFlagsNormal,
  hasC33TestsNormalBatch,
  setC33RedFlagGroup,
  setC33Side,
  setC33TraumaMechanismDetail,
  setC33TraumaSnap,
  setC33WeightBearingCapacity,
  toggleC33AccompanyingSymptom,
  toggleC33AccompanyingSymptomsNone,
  toggleC33NegativeSymptomBatch,
  toggleC33ProvocationGroup,
  toggleC33RedFlagsNormal,
  toggleC33TestsNormalBatch
} from "./state";

describe("C3.3 Calm Fast Flow state", () => {
  it("configures a problem profile without creating a clinical fact", () => {
    const before = createEmptyC33State();
    const after = configureC33Problem(before, "knee-trauma");

    expect(after.workflow.problemProfile).toBe("knee-trauma");
    expect(after.c32.workflow.problemProfile).toBe("knee-pain");
    expect(after.c32.c3.sourceRevision).toBe(0);
    expect(after.c32.c3.factRoot).toEqual(before.c32.c3.factRoot);
  });

  it("records exactly the two mechanical symptoms with one reversible choice, never rest/night pain", () => {
    let state = createEmptyC33State();
    const applied = toggleC33NegativeSymptomBatch(state);
    state = applied.state;

    expect(applied.outcome).toBe("applied");
    expect(state.c32.c3.factRoot.history).toMatchObject({
      locking: "no",
      instability: "no"
    });
    expect(state.c32.c3.factRoot.history.restPain).toBeUndefined();
    expect(state.c32.c3.factRoot.history.nightPain).toBeUndefined();
    expect(state.negativeSymptomBatches[0].fields).toEqual([
      "locking",
      "instability"
    ]);
    expect(hasC33NegativeSymptomBatch(state)).toBe(true);

    const undone = toggleC33NegativeSymptomBatch(state);
    expect(undone.outcome).toBe("undone");
    expect(undone.state.c32.c3.factRoot.history.locking).toBeUndefined();
    expect(undone.state.c32.c3.factRoot.history.instability).toBeUndefined();
  });

  it("blocks restPain and nightPain at the C3.3 fact dispatcher, even though the shared C3 model still allows the field", () => {
    let state = createEmptyC33State();
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "nightPain",
      value: "yes"
    });
    expect(state.c32.c3.factRoot.history.nightPain).toBeUndefined();

    state = applyC33FactAction(state, {
      type: "set-history",
      key: "restPain",
      value: "no"
    });
    expect(state.c32.c3.factRoot.history.restPain).toBeUndefined();

    const applied = toggleC33NegativeSymptomBatch(state);
    expect(applied.outcome).toBe("applied");
    expect(applied.state.c32.c3.factRoot.history.nightPain).toBeUndefined();
    expect(applied.state.c32.c3.factRoot.history.locking).toBe("no");
    expect(applied.state.c32.c3.factRoot.history.instability).toBe("no");
  });

  it("does not overwrite a positive symptom with a negative batch", () => {
    let state = createEmptyC33State();
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "locking",
      value: "yes"
    });
    const transition = toggleC33NegativeSymptomBatch(state);

    expect(transition.outcome).toBe("blocked");
    expect(transition.state.c32.c3.factRoot.history.locking).toBe("yes");
    expect(transition.state.c32.c3.factRoot.history.instability).toBeUndefined();
  });

  it("stores C3.3 phrases in the existing clinician-owned phrase state", () => {
    const state = createEmptyC33State();
    const phrase = C33_PHRASES.find((entry) => entry.id === "C33-FU-001")!;
    const c3 = selectC3PhraseDefinition(state.c32.c3, phrase).state;
    const active = getActivePhrases(c3);

    expect(active).toHaveLength(1);
    expect(active[0]).toMatchObject({
      category: "follow-up",
      fixtureId: "C33-PHRASE-PACK-KNEE-001",
      currentText: "Kontrol ved vedvarende gener eller tidligere ved forværring.",
      actor: "clinician"
    });
  });

  it("keeps PSOAP to five lines and removes technical negative wording", () => {
    let state = configureC33Problem(createEmptyC33State(), "knee-trauma");
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "side",
      value: "right"
    });
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "fever",
      value: "no"
    });
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "systemicIllness",
      value: "no"
    });
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "redHotSwollenJoint",
      value: "no"
    });
    const output = projectC33PsoapDocument(state, "standard");

    expect(output.split("\n")).toHaveLength(5);
    expect(output).toContain("P: Højresidige knæsmerter");
    expect(output).toContain("knæet er ikke rødt, varmt eller akut hævet");
    expect(output).not.toContain("ikke registreret som");
  });

  it("sets a single red flag group and clears it back to blank on repeat", () => {
    let state = createEmptyC33State();
    state = setC33RedFlagGroup(state, "malignancy", "yes");
    expect(state.redFlagGroups.malignancy).toBe("yes");
    expect(state.c32.c3.sourceRevision).toBe(1);

    state = setC33RedFlagGroup(state, "malignancy", undefined);
    expect(state.redFlagGroups.malignancy).toBeUndefined();
    expect(state.c32.c3.sourceRevision).toBe(2);
  });

  it("disconfirms only the five still-blank red flag groups and reverses only its own writes", () => {
    let state = createEmptyC33State();
    const applied = toggleC33RedFlagsNormal(state);
    state = applied.state;

    expect(applied.outcome).toBe("applied");
    expect(hasC33RedFlagsNormal(state)).toBe(true);
    expect(state.redFlagGroups).toEqual({
      infection: "no",
      "cannot-bear-weight": "no",
      "rapid-swelling": "no",
      malignancy: "no",
      "high-energy-trauma": "no"
    });

    const undone = toggleC33RedFlagsNormal(state);
    expect(undone.outcome).toBe("undone");
    expect(undone.state.redFlagGroups).toEqual({});
  });

  it("never overwrites a positive red flag group with the negative batch", () => {
    let state = createEmptyC33State();
    state = setC33RedFlagGroup(state, "infection", "yes");
    const transition = toggleC33RedFlagsNormal(state);

    expect(transition.outcome).toBe("blocked");
    expect(transition.state.redFlagGroups.infection).toBe("yes");
    expect(transition.state.redFlagGroups["cannot-bear-weight"]).toBeUndefined();
  });

  it("finds problem profiles regardless of token order, hyphens or case", () => {
    expect(
      findMatchingC33ProblemProfiles("knæsmerte traume").map((p) => p.id)
    ).toContain("knee-trauma");
    expect(
      findMatchingC33ProblemProfiles("TRAUME KNÆSMERTE").map((p) => p.id)
    ).toContain("knee-trauma");
    expect(
      findMatchingC33ProblemProfiles("knæsmerte atraumatisk").map((p) => p.id)
    ).toContain("knee-atraumatic");
    expect(
      findMatchingC33ProblemProfiles("knæsmerte overbelastning").map((p) => p.id)
    ).toContain("knee-overuse");
    expect(findMatchingC33ProblemProfiles("")).toHaveLength(0);
  });

  it("makes Side a three-way exclusive choice where Bilateral clears the canonical side and vice versa", () => {
    let state = createEmptyC33State();
    state = setC33Side(state, "right");
    expect(state.c32.c3.factRoot.history.side).toBe("right");
    expect(state.workflow.bilateralPain).toBeUndefined();

    state = setC33Side(state, "bilateral");
    expect(state.c32.c3.factRoot.history.side).toBeUndefined();
    expect(state.workflow.bilateralPain).toBe(true);

    state = setC33Side(state, "left");
    expect(state.c32.c3.factRoot.history.side).toBe("left");
    expect(state.workflow.bilateralPain).toBeUndefined();

    state = setC33Side(state, "left");
    expect(state.c32.c3.factRoot.history.side).toBeUndefined();
  });

  it("clears the local trauma mechanism detail whenever Traume stops being Ja", () => {
    let state = createEmptyC33State();
    state = applyC33FactAction(state, { type: "set-history", key: "trauma", value: "yes" });
    state = setC33TraumaMechanismDetail(state, "hyperextension");
    expect(state.workflow.traumaMechanismDetail).toBe("hyperextension");
    expect(state.c32.c3.factRoot.history.traumaMechanism).toBe("other");

    state = applyC33FactAction(state, { type: "set-history", key: "trauma", value: "no" });
    expect(state.workflow.traumaMechanismDetail).toBeUndefined();
  });

  it("toggles trauma snap and weight-bearing capacity only while Traume is Ja", () => {
    let state = createEmptyC33State();
    state = setC33TraumaSnap(state, true);
    expect(state.workflow.traumaSnap).toBeUndefined();

    state = applyC33FactAction(state, { type: "set-history", key: "trauma", value: "yes" });
    state = setC33TraumaSnap(state, true);
    expect(state.workflow.traumaSnap).toBe(true);
    state = setC33TraumaSnap(state, false);
    expect(state.workflow.traumaSnap).toBeUndefined();

    state = setC33WeightBearingCapacity(state, "gte-4-steps");
    expect(state.workflow.weightBearingCapacity).toBe("gte-4-steps");
    state = setC33WeightBearingCapacity(state, "lt-4-steps");
    expect(state.workflow.weightBearingCapacity).toBe("lt-4-steps");
    state = setC33WeightBearingCapacity(state, "lt-4-steps");
    expect(state.workflow.weightBearingCapacity).toBeUndefined();

    state = applyC33FactAction(state, { type: "set-history", key: "trauma", value: "no" });
    expect(state.workflow.traumaSnap).toBeUndefined();
    expect(state.workflow.weightBearingCapacity).toBeUndefined();
  });

  it("toggles a combined Provokation group as one clinician decision over two canonical values", () => {
    let state = createEmptyC33State();
    state = toggleC33ProvocationGroup(state, "rotation-turning");
    expect(state.c32.c3.factRoot.history.provocations).toEqual(
      expect.arrayContaining(["rotation", "direction-change"])
    );

    state = toggleC33ProvocationGroup(state, "rotation-turning");
    expect(state.c32.c3.factRoot.history.provocations).toHaveLength(0);
  });

  it("records Ledsagesymptomer positively or as one reversible 'Ingen ledsagesymptomer', never touching red flags or rest/night pain", () => {
    let state = createEmptyC33State();
    const applied = toggleC33AccompanyingSymptomsNone(state);
    state = applied.state;

    expect(applied.outcome).toBe("applied");
    expect(hasC33AccompanyingSymptomsNone(state)).toBe(true);
    expect(state.redFlagGroups).toEqual({});
    expect(state.c32.c3.factRoot.history.restPain).toBeUndefined();
    expect(state.c32.c3.factRoot.history.nightPain).toBeUndefined();

    const undone = toggleC33AccompanyingSymptomsNone(state);
    expect(undone.outcome).toBe("undone");

    state = toggleC33AccompanyingSymptom(undone.state, "crepitus");
    const blocked = toggleC33AccompanyingSymptomsNone(state);
    expect(blocked.outcome).toBe("blocked");
  });

  it("fills only blank knee tests as normal, never overwrites a positive finding, and is reversible", () => {
    let state = createEmptyC33State();
    state = applyC33FactAction(state, { type: "set-objective", key: "lachman", value: "positive" });
    const blocked = toggleC33TestsNormalBatch(state);
    expect(blocked.outcome).toBe("blocked");

    state = createEmptyC33State();
    const applied = toggleC33TestsNormalBatch(state);
    state = applied.state;
    expect(applied.outcome).toBe("applied");
    expect(hasC33TestsNormalBatch(state)).toBe(true);
    expect(state.c32.c3.factRoot.objective.valgus).toBe("stable");

    const undone = toggleC33TestsNormalBatch(state);
    expect(undone.outcome).toBe("undone");
    expect(undone.state.c32.c3.factRoot.objective.lachman).toBeUndefined();
  });

  it("leaves an individually-confirmed negative group untouched by the batch undo", () => {
    let state = createEmptyC33State();
    state = setC33RedFlagGroup(state, "infection", "no");
    const applied = toggleC33RedFlagsNormal(state);
    state = applied.state;

    expect(applied.outcome).toBe("applied");
    expect(state.redFlagBatches[0].groups).not.toContain("infection");
    expect(hasC33RedFlagsNormal(state)).toBe(true);

    const undone = toggleC33RedFlagsNormal(state);
    expect(undone.outcome).toBe("undone");
    expect(undone.state.redFlagGroups.infection).toBe("no");
    expect(undone.state.redFlagGroups["cannot-bear-weight"]).toBeUndefined();
  });
});
