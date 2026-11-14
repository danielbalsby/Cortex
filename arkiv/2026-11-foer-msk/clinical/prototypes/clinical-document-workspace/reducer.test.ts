import { describe, expect, it } from "vitest";

import { NORMAL_BASIC_FINDINGS, createEmptyClinicalDocumentState } from "./model";
import { workspaceReducer } from "./reducer";

function reduce(...actions: Parameters<typeof workspaceReducer>[1][]) {
  return actions.reduce(workspaceReducer, createEmptyClinicalDocumentState());
}

describe("Clinical Document Workspace v2 Phase 2 reducer", () => {
  it("preserves natural text entry, clears empty text and keeps mode changes presentation-only", () => {
    const withText = reduce({ type: "set-fact", key: "duration", value: "  seks måneder  " });
    const standard = workspaceReducer(withText, { type: "set-mode", mode: "standard" });
    const spaces = workspaceReducer(standard, { type: "set-fact", key: "duration", value: "  " });
    const cleared = workspaceReducer(spaces, { type: "set-fact", key: "duration", value: "" });

    expect(withText.facts.duration).toBe("  seks måneder  ");
    expect(standard.facts).toEqual(withText.facts);
    expect(spaces.facts.duration).toBe("  ");
    expect(cleared.facts.duration).toBeUndefined();
  });

  it("preserves every character while a controlled text value is entered sequentially", () => {
    const value = "seks måneder";
    const state = [...value].reduce(
      (current, character) =>
        workspaceReducer(current, {
          type: "set-fact",
          key: "duration",
          value: `${current.facts.duration ?? ""}${character}`
        }),
      createEmptyClinicalDocumentState()
    );

    expect(state.facts.duration).toBe(value);
  });

  it("toggles trauma mechanisms independently and keeps constant/intermittent exclusive", () => {
    const state = reduce(
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "fall" },
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "direct-blow" },
      { type: "toggle-list-fact", key: "painPatterns", value: "constant" },
      { type: "toggle-list-fact", key: "painPatterns", value: "intermittent" }
    );

    expect(state.facts.traumaMechanisms).toEqual(["fall", "direct-blow"]);
    expect(state.facts.painPatterns).toEqual(["intermittent"]);
  });

  it("prunes conditional trauma details when trauma is no longer recorded", () => {
    const trauma = reduce(
      { type: "set-fact", key: "precipitatingFactor", value: "trauma" },
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "fall" },
      { type: "set-fact", key: "traumaMechanismNote", value: "Fald på trappe" }
    );
    const atraumatic = workspaceReducer(trauma, {
      type: "set-fact",
      key: "precipitatingFactor",
      value: "none"
    });

    expect(atraumatic.facts.traumaMechanisms).toBeUndefined();
    expect(atraumatic.facts.traumaMechanismNote).toBeUndefined();
  });

  it("applies grouped normals only to untouched findings and tracks provenance", () => {
    const positive = reduce({ type: "set-fact", key: "effusion", value: "mild" });
    const confirmed = workspaceReducer(positive, { type: "confirm-normal-group" });

    expect(confirmed.facts.effusion).toBe("mild");
    expect(confirmed.normalGroup.appliedKeys).not.toContain("effusion");
    expect(confirmed.normalGroup.appliedKeys).toHaveLength(NORMAL_BASIC_FINDINGS.length - 1);
  });

  it("preserves positive exceptions when grouped normals are cleared and reapplied", () => {
    const confirmed = reduce({ type: "confirm-normal-group" });
    const overridden = workspaceReducer(confirmed, {
      type: "set-fact",
      key: "effusion",
      value: "mild"
    });
    const cleared = workspaceReducer(overridden, { type: "clear-normal-group" });
    const reapplied = workspaceReducer(cleared, { type: "confirm-normal-group" });

    expect(cleared.facts.effusion).toBe("mild");
    expect(cleared.facts.gait).toBeUndefined();
    expect(reapplied.facts.effusion).toBe("mild");
    expect(reapplied.facts.gait).toBe("normal");
  });

  it("adds unique diagnoses and supports independent reorder and removal", () => {
    const meniscus = {
      id: "meniscus",
      label: "Meniskrelaterede gener",
      source: "suggestion" as const
    };
    const sprain = { id: "sprain", label: "Knæforstuvning", source: "suggestion" as const };
    const selected = reduce(
      { type: "add-diagnosis", diagnosis: meniscus },
      { type: "add-diagnosis", diagnosis: sprain },
      { type: "add-diagnosis", diagnosis: meniscus },
      { type: "move-diagnosis", id: "sprain", direction: -1 }
    );
    const removed = workspaceReducer(selected, { type: "remove-diagnosis", id: "sprain" });

    expect(selected.workingDiagnoses.map((item) => item.id)).toEqual(["sprain", "meniscus"]);
    expect(removed.workingDiagnoses.map((item) => item.id)).toEqual(["meniscus"]);
  });

  it("rejects incompatible imaging status and action combinations", () => {
    const planned = reduce(
      { type: "toggle-plan-action", action: "imaging" },
      { type: "set-imaging-field", key: "status", value: "not-indicated-now" },
      { type: "set-imaging-field", key: "plannedAction", value: "no-imaging-now" }
    );
    const rejected = workspaceReducer(planned, {
      type: "set-imaging-field",
      key: "plannedAction",
      value: "send-referral"
    });

    expect(rejected).toBe(planned);
    expect(rejected.imaging?.plannedAction).toBe("no-imaging-now");
  });

  it("removing imaging also removes its draft details", () => {
    const state = reduce(
      { type: "toggle-plan-action", action: "imaging" },
      { type: "set-imaging-field", key: "status", value: "planned" }
    );
    const removed = workspaceReducer(state, { type: "toggle-plan-action", action: "imaging" });

    expect(removed.planActions).not.toContain("imaging");
    expect(removed.imaging).toBeUndefined();
  });

  it("removes conditional follow-up and safety-net text when their actions are cleared", () => {
    const state = reduce(
      { type: "toggle-plan-action", action: "follow-up" },
      { type: "set-fact", key: "followUp", value: "om fire uger" },
      { type: "toggle-plan-action", action: "safety-net" },
      { type: "set-fact", key: "safetyNet", value: "kontakt ved forværring" }
    );
    const noFollowUp = workspaceReducer(state, {
      type: "toggle-plan-action",
      action: "follow-up"
    });
    const cleared = workspaceReducer(noFollowUp, {
      type: "toggle-plan-action",
      action: "safety-net"
    });

    expect(cleared.facts.followUp).toBeUndefined();
    expect(cleared.facts.safetyNet).toBeUndefined();
  });
});
