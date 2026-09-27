import { describe, expect, it } from "vitest";

import {
  C3_ASSESSMENT_FIXTURE,
  C3_PHRASES
} from "@/clinical/prototypes/c3/fixtures";
import {
  createC3Assessment,
  getC3DraftStatus,
  selectC3Phrase,
  setC3ManualDraft,
  setC3Profile
} from "@/clinical/prototypes/c3/state";

import { createEmptyC32State } from "./model";
import {
  deriveC32InspectionCompleteness,
  isC32CopyReadyPsoap,
  projectC32PsoapDocument
} from "./projections";
import {
  applyC32FactAction,
  commitC32Batch,
  configureC32Problem,
  previewC32Batch,
  setC32InspectionStatus,
  toggleC32InspectionFinding,
  undoC32Batch
} from "./state";

describe("C3.2 PSOAP Fast Flow state", () => {
  it("keeps the problem profile outside the clinical fact root", () => {
    const before = createEmptyC32State();
    const after = configureC32Problem(before, "knee-pain");

    expect(after.workflow.problemProfile).toBe("knee-pain");
    expect(after.c3).toBe(before.c3);
    expect(after.c3.sourceRevision).toBe(0);
    expect(projectC32PsoapDocument(after, "standard")).not.toContain("profil");
  });

  it("preserves single-select clear-to-blank without converting it to a negative", () => {
    let state = createEmptyC32State();
    state = applyC32FactAction(state, { type: "set-history", key: "trauma", value: "yes" });
    state = applyC32FactAction(state, { type: "set-history", key: "trauma", value: undefined });

    expect(state.c3.factRoot.history.trauma).toBeUndefined();
    expect(projectC32PsoapDocument(state, "standard")).not.toContain("ingen traume");
  });

  it("keeps provocation and palpation cardinality additive", () => {
    let state = createEmptyC32State();
    state = applyC32FactAction(state, { type: "toggle-provocation", value: "walking" });
    state = applyC32FactAction(state, { type: "toggle-provocation", value: "rotation" });
    state = applyC32FactAction(state, { type: "toggle-palpation", value: "medial-joint-line" });
    state = applyC32FactAction(state, { type: "toggle-palpation", value: "mcl" });

    expect(state.c3.factRoot.history.provocations).toEqual(["walking", "rotation"]);
    expect(state.c3.factRoot.objective.palpationFindings).toEqual(["medial-joint-line", "mcl"]);
  });

  it("represents simultaneous inspection findings and clears only the selected finding", () => {
    let state = createEmptyC32State();
    state = toggleC32InspectionFinding(state, "swelling");
    state = toggleC32InspectionFinding(state, "redness");

    expect(state.inspection.findings).toEqual(["swelling", "redness"]);
    expect(projectC32PsoapDocument(state, "standard")).toContain("Synlig hævelse og rødme.");

    state = toggleC32InspectionFinding(state, "swelling");
    expect(state.inspection.findings).toEqual(["redness"]);
    expect(projectC32PsoapDocument(state, "standard")).not.toContain("hævelse");
    expect(projectC32PsoapDocument(state, "standard")).toContain("Rødme.");
  });

  it("treats bounded inspection facts as source changes for draft staleness", () => {
    let state = createEmptyC32State();
    const generated = projectC32PsoapDocument(state, "standard");
    state = { ...state, c3: setC3ManualDraft(state.c3, "standard", generated, generated) };
    state = toggleC32InspectionFinding(state, "swelling");

    expect(state.c3.sourceRevision).toBe(1);
    expect(getC3DraftStatus(state.c3, "standard")).toBe("stale");
  });

  it("keeps inspection status mutually exclusive with findings and explicit in projection", () => {
    let state = toggleC32InspectionFinding(createEmptyC32State(), "deformity");
    state = setC32InspectionStatus(state, "not-assessed");

    expect(state.inspection.findings).toEqual([]);
    expect(deriveC32InspectionCompleteness(state)).toEqual({
      status: "not-assessed",
      findings: [],
      answered: true
    });
    expect(projectC32PsoapDocument(state, "standard")).toContain("Inspektion ikke vurderet.");
  });

  it("previews and commits exactly the three disclosed red-flag negatives", () => {
    const empty = createEmptyC32State();
    const preview = previewC32Batch(empty, "C32-BATCH-REDFLAGS-NORMAL-001");
    expect(preview.items.map((item) => [item.fieldId, item.proposedValue])).toEqual([
      ["history.fever", "no"],
      ["history.systemicIllness", "no"],
      ["history.redHotSwollenJoint", "no"]
    ]);

    const state = commitC32Batch(empty, "C32-BATCH-REDFLAGS-NORMAL-001");
    expect(state.c3.factRoot.history).toMatchObject({
      fever: "no",
      systemicIllness: "no",
      redHotSwollenJoint: "no"
    });
    expect(state.batchRecords[0].writes).toHaveLength(3);
    expect(state.batchRecords[0].configVersion).toBe("C32-NORMAL-BATCH-KNEE-001@1.0");
  });

  it("does not overwrite batch collisions", () => {
    let state = applyC32FactAction(
      createEmptyC32State(),
      { type: "set-history", key: "fever", value: "yes" }
    );
    const preview = previewC32Batch(state, "C32-BATCH-REDFLAGS-NORMAL-001");
    expect(preview.items.find((item) => item.fieldId === "history.fever")?.collision).toBe(true);

    state = commitC32Batch(state, "C32-BATCH-REDFLAGS-NORMAL-001");
    expect(state.c3.factRoot.history.fever).toBe("yes");
    expect(state.batchRecords[0].collisions).toEqual(["history.fever"]);
    expect(state.batchRecords[0].writes).toHaveLength(2);
  });

  it("undoes only unchanged batch values and preserves later field overrides", () => {
    let state = commitC32Batch(createEmptyC32State(), "C32-BATCH-REDFLAGS-NORMAL-001");
    const transactionId = state.batchRecords[0].transactionId;
    state = applyC32FactAction(state, { type: "set-history", key: "fever", value: "yes" });
    state = undoC32Batch(state, transactionId);

    expect(state.c3.factRoot.history.fever).toBe("yes");
    expect(state.c3.factRoot.history.systemicIllness).toBeUndefined();
    expect(state.c3.factRoot.history.redHotSwollenJoint).toBeUndefined();
    expect(state.batchRecords[0].status).toBe("undone");
  });

  it("normal ROM writes only 0 and 140 and supports collision-safe undo", () => {
    let state = commitC32Batch(createEmptyC32State(), "C32-BATCH-ROM-NORMAL-001");
    const transactionId = state.batchRecords[0].transactionId;
    expect(state.c3.factRoot.objective).toMatchObject({
      extensionDegrees: 0,
      flexionDegrees: 140
    });
    expect(Object.keys(state.c3.factRoot.objective)).not.toContain("normalRange");

    state = applyC32FactAction(state, { type: "set-objective", key: "flexionDegrees", value: 125 });
    state = undoC32Batch(state, transactionId);
    expect(state.c3.factRoot.objective.extensionDegrees).toBeUndefined();
    expect(state.c3.factRoot.objective.flexionDegrees).toBe(125);
  });

  it("keeps Quick and Standard on the same source revision with profile-specific drafts", () => {
    let state = createEmptyC32State();
    state = { ...state, c3: applyC32FactAction(state, { type: "set-history", key: "side", value: "right" }).c3 };
    const revision = state.c3.sourceRevision;
    const standard = projectC32PsoapDocument(state, "standard");
    let c3 = setC3ManualDraft(state.c3, "standard", standard, `${standard}\nManuel note`);
    c3 = setC3Profile(c3, "quick");

    expect(c3.sourceRevision).toBe(revision);
    expect(c3.drafts.standard?.text).toContain("Manuel note");
    expect(c3.drafts.quick).toBeUndefined();
  });

  it("produces five newline-delimited PSOAP blocks without a redundant Plan label", () => {
    let state = createEmptyC32State();
    state = { ...state, c3: createC3Assessment(state.c3, "primary", C3_ASSESSMENT_FIXTURE).state };
    for (const phrase of C3_PHRASES.filter((entry) =>
      ["C3-PLAN-001", "C3-FU-001", "C3-SN-001"].includes(entry.id)
    )) {
      state = { ...state, c3: selectC3Phrase(state.c3, phrase.id).state };
    }
    const output = projectC32PsoapDocument(state, "standard");
    expect(output.split("\n")).toHaveLength(5);
    expect(output.split("\n").map((line) => line.slice(0, 2))).toEqual(["P:", "S:", "O:", "A:", "P:"]);
    expect(output).not.toContain("P: Plan:");
    expect(isC32CopyReadyPsoap(output)).toBe(true);
    expect(isC32CopyReadyPsoap("Manuel tekst uden PSOAP-struktur")).toBe(false);
  });
});
