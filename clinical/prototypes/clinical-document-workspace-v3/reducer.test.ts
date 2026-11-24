import { describe, expect, it } from "vitest";

import { toggleSingleChoice } from "./choiceToggle";
import { createEmptyStateV3 } from "./model";
import { workspaceReducerV3, type WorkspaceActionV3 } from "./reducer";

function reduce(actions: readonly WorkspaceActionV3[]) {
  return actions.reduce(workspaceReducerV3, createEmptyStateV3());
}

describe("toggleSingleChoice (pure toggle-off helper)", () => {
  it("selects an unselected option", () => {
    expect(toggleSingleChoice<string>(undefined, "right")).toBe("right");
  });

  it("clears the option when clicked a second time", () => {
    expect(toggleSingleChoice<string>("right", "right")).toBeUndefined();
  });

  it("switches to a different option in one click", () => {
    expect(toggleSingleChoice<string>("right", "left")).toBe("left");
  });
});

describe("empty state never carries implicit facts", () => {
  it("starts with a completely empty facts object", () => {
    const state = createEmptyStateV3();
    expect(state.facts).toEqual({});
    expect(state.negativeBundle.confirmed).toBe(false);
    expect(state.redFlags.confirmed).toBe(false);
  });

  it("does not record a fact for an untouched field after unrelated dispatches", () => {
    const state = reduce([
      { type: "set-fact", key: "side", value: "right" },
      { type: "set-mode", mode: "standard" }
    ]);
    expect(state.facts).toEqual({ side: "right" });
    expect(state.facts.rom).toBeUndefined();
    expect(state.facts.trauma).toBeUndefined();
    expect(state.facts.fever).toBeUndefined();
  });

  it("clearing a set-fact value back to undefined removes the key entirely", () => {
    const state = reduce([
      { type: "set-fact", key: "side", value: "right" },
      { type: "set-fact", key: "side", value: undefined }
    ]);
    expect(state.facts).toEqual({});
    expect("side" in state.facts).toBe(false);
  });
});

describe("conditional trauma detail", () => {
  it("prunes trauma mechanisms and note when trauma is answered No", () => {
    const withTrauma = reduce([
      { type: "set-fact", key: "trauma", value: "yes" },
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "twisting-planted-foot" },
      { type: "set-fact", key: "traumaNote", value: "Vrid under fodbold" }
    ]);
    expect(withTrauma.facts.traumaMechanisms).toEqual(["twisting-planted-foot"]);

    const cleared = workspaceReducerV3(withTrauma, {
      type: "set-fact",
      key: "trauma",
      value: "no"
    });
    expect(cleared.facts.traumaMechanisms).toBeUndefined();
    expect(cleared.facts.traumaNote).toBeUndefined();
    expect(cleared.facts.trauma).toBe("no");
  });

  it("re-selecting trauma yes starts mechanisms untouched again", () => {
    const state = reduce([
      { type: "set-fact", key: "trauma", value: "yes" },
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "fall" },
      { type: "set-fact", key: "trauma", value: "no" },
      { type: "set-fact", key: "trauma", value: "yes" }
    ]);
    expect(state.facts.traumaMechanisms).toBeUndefined();
  });
});

describe("conditional ROM detail", () => {
  it("keeps extension and flexion only while ROM is abnormal", () => {
    const abnormal = reduce([
      { type: "set-fact", key: "rom", value: "abnormal" },
      { type: "set-fact", key: "extension", value: "reduced" },
      { type: "set-fact", key: "flexion", value: "full" }
    ]);
    expect(abnormal.facts.extension).toBe("reduced");
    expect(abnormal.facts.flexion).toBe("full");

    const backToNormal = workspaceReducerV3(abnormal, {
      type: "set-fact",
      key: "rom",
      value: "normal"
    });
    expect(backToNormal.facts.extension).toBeUndefined();
    expect(backToNormal.facts.flexion).toBeUndefined();
    expect(backToNormal.facts.rom).toBe("normal");
  });
});

describe("negative bundle grouped confirmation", () => {
  it("fills only untouched keys and never overwrites a recorded positive", () => {
    const withPositive = reduce([{ type: "set-fact", key: "locking", value: "yes" }]);
    const confirmed = workspaceReducerV3(withPositive, { type: "confirm-negative-bundle" });

    expect(confirmed.facts.locking).toBe("yes");
    expect(confirmed.facts.instability).toBe("no");
    expect(confirmed.facts.restPain).toBe("no");
    expect(confirmed.facts.nightPain).toBe("no");
    expect(confirmed.negativeBundle.confirmed).toBe(true);
    expect(confirmed.negativeBundle.appliedKeys).toEqual(["instability", "restPain", "nightPain"]);
  });

  it("clearing the bundle only removes bundle-applied negatives, preserving independent values", () => {
    const state = reduce([
      { type: "set-fact", key: "locking", value: "yes" },
      { type: "confirm-negative-bundle" },
      { type: "clear-negative-bundle" }
    ]);
    expect(state.facts.locking).toBe("yes");
    expect(state.facts.instability).toBeUndefined();
    expect(state.facts.restPain).toBeUndefined();
    expect(state.facts.nightPain).toBeUndefined();
    expect(state.negativeBundle.confirmed).toBe(false);
  });

  it("setting a bundle key to yes after confirmation un-confirms the bundle", () => {
    const state = reduce([
      { type: "confirm-negative-bundle" },
      { type: "set-fact", key: "instability", value: "yes" }
    ]);
    expect(state.negativeBundle.confirmed).toBe(false);
    expect(state.facts.instability).toBe("yes");
    expect(state.facts.locking).toBe("no");
  });
});

describe("red flags exclusivity", () => {
  it("'Ingen red flags' sets all three findings to no in one action", () => {
    const state = reduce([{ type: "confirm-no-red-flags" }]);
    expect(state.facts.fever).toBe("no");
    expect(state.facts.generalImpact).toBe("no");
    expect(state.facts.hotSwollenKnee).toBe("no");
    expect(state.redFlags.confirmed).toBe(true);
  });

  it("a positive red flag clears the 'Ingen red flags' confirmation", () => {
    const state = reduce([
      { type: "confirm-no-red-flags" },
      { type: "set-fact", key: "fever", value: "yes" }
    ]);
    expect(state.redFlags.confirmed).toBe(false);
    expect(state.facts.fever).toBe("yes");
    // Other bundle-applied negatives set by the same grouped action remain.
    expect(state.facts.generalImpact).toBe("no");
    expect(state.facts.hotSwollenKnee).toBe("no");
  });

  it("clearing 'Ingen red flags' removes only the bundle-applied negatives", () => {
    const state = reduce([
      { type: "set-fact", key: "hotSwollenKnee", value: "yes" },
      { type: "confirm-no-red-flags" },
      { type: "clear-no-red-flags" }
    ]);
    expect(state.facts.hotSwollenKnee).toBe("yes");
    expect(state.facts.fever).toBeUndefined();
    expect(state.facts.generalImpact).toBeUndefined();
    expect(state.redFlags.confirmed).toBe(false);
  });

  it("never overwrites an already-recorded positive and cannot read as confirmed while it stands", () => {
    const state = reduce([
      { type: "set-fact", key: "fever", value: "yes" },
      { type: "confirm-no-red-flags" }
    ]);
    expect(state.facts.fever).toBe("yes");
    expect(state.facts.generalImpact).toBe("no");
    expect(state.facts.hotSwollenKnee).toBe("no");
    expect(state.redFlags.confirmed).toBe(false);
  });
});

describe("problem profile selection never becomes a clinical fact", () => {
  it("stores the profile choice outside facts", () => {
    const state = reduce([{ type: "set-problem-profile", id: "knee-trauma" }]);
    expect(state.problemProfile).toBe("knee-trauma");
    expect(state.facts).toEqual({});
  });
});

describe("mode switch preserves facts", () => {
  it("keeps recorded facts unchanged across Quick/Standard toggles", () => {
    const state = reduce([
      { type: "set-fact", key: "side", value: "right" },
      { type: "set-mode", mode: "standard" },
      { type: "set-mode", mode: "quick" }
    ]);
    expect(state.mode).toBe("quick");
    expect(state.facts.side).toBe("right");
  });
});
