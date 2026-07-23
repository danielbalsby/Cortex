import { describe, expect, it } from "vitest";

import {
  buildJournalSections,
  generatePrototypeJournal
} from "./journal";
import { createEmptyClinicalDocumentState } from "./model";
import {
  buildCockpitView,
  buildHistoryNarrative,
  buildSituationSentence,
  getFocusElementId
} from "./presentation";
import { workspaceReducer, type WorkspaceAction } from "./reducer";

function reduce(actions: readonly WorkspaceAction[]) {
  return actions.reduce(workspaceReducer, createEmptyClinicalDocumentState());
}

describe("clinical-document-workspace-v2 presentation", () => {
  it("reuses empty fact semantics and builds an orienting situation sentence", () => {
    const empty = createEmptyClinicalDocumentState();
    expect(empty.facts).toEqual({});
    expect(buildSituationSentence(empty)).toMatch(/ingen kliniske oplysninger/i);
    expect(buildHistoryNarrative(empty).isEmpty).toBe(true);
  });

  it("builds a narrative situation from the same facts without inventing mechanism", () => {
    const state = reduce([
      { type: "set-fact", key: "side", value: "right" },
      { type: "set-fact", key: "onset", value: "acute" },
      { type: "set-fact", key: "precipitatingFactor", value: "trauma" },
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "twisting-planted-foot" }
    ]);
    expect(buildSituationSentence(state)).toMatch(/akut højresidigt knæproblem/i);
    expect(buildSituationSentence(state)).toMatch(/vrid på fikseret fod/i);
  });

  it("cockpit exposes navigable gaps for missing trauma mechanism", () => {
    const state = reduce([
      { type: "set-fact", key: "side", value: "right" },
      { type: "set-fact", key: "onset", value: "acute" },
      { type: "set-fact", key: "precipitatingFactor", value: "trauma" }
    ]);
    const cockpit = buildCockpitView(state);
    const gap = cockpit.gaps.find((item) => item.id === "gap-trauma-mechanism");
    expect(gap?.label).toMatch(/traumemekanisme/i);
    expect(gap?.focusTarget).toBe("history-trauma");
    expect(getFocusElementId("history-trauma")).toBe("v2-focus-history-trauma");
  });

  it("preserves mode switch without discarding facts", () => {
    const state = reduce([
      { type: "set-fact", key: "side", value: "left" },
      { type: "set-mode", mode: "standard" },
      { type: "set-mode", mode: "quick" }
    ]);
    expect(state.mode).toBe("quick");
    expect(state.facts.side).toBe("left");
  });
});

describe("clinical-document-workspace-v2 journal", () => {
  it("writes clinical plan prose instead of field-label stubs", () => {
    const state = reduce([
      { type: "toggle-plan-action", action: "physiotherapy" },
      { type: "toggle-plan-action", action: "information" }
    ]);
    const journal = generatePrototypeJournal(state);
    expect(journal).toMatch(/fysioterapeutisk rehabilitering/i);
    expect(journal).toMatch(/informeres om den aktuelle vurdering/i);
    expect(journal).not.toMatch(/Fysioterapi indgår i planen/i);
    expect(journal).not.toMatch(/Information indgår i planen/i);
  });

  it("omits unrecorded clinical content from journal sections", () => {
    const sections = buildJournalSections(createEmptyClinicalDocumentState());
    expect(sections).toHaveLength(1);
    expect(sections[0]?.text).toBe("Problem: Knæsmerte");
  });
});
