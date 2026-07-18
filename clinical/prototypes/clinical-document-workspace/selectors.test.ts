import { describe, expect, it } from "vitest";

import { createEmptyClinicalDocumentState } from "./model";
import { workspaceReducer } from "./reducer";
import {
  getClinicalOverview,
  getImagingMissingInformation,
  getPrototypeAttentionPoints,
  getPrototypeSuggestions
} from "./selectors";

describe("Clinical Document Workspace v2 Phase 1 overview", () => {
  it("describes empty state without implying a clinical assessment", () => {
    const overview = getClinicalOverview(createEmptyClinicalDocumentState());

    expect(overview).toHaveLength(4);
    expect(overview.find((item) => item.id === "attention-points")?.value).toBe(
      "Ikke vurderet"
    );
    expect(overview.filter((item) => item.value === "Ikke registreret")).toHaveLength(3);
  });
});

describe("Clinical Document Workspace v2 Phase 2 selectors", () => {
  it("does not show unsupported suggestions from unanswered state", () => {
    expect(getPrototypeSuggestions(createEmptyClinicalDocumentState())).toEqual({
      primary: [],
      additional: []
    });
  });

  it("limits trauma suggestions to three primary items without selecting diagnoses", () => {
    const state = workspaceReducer(createEmptyClinicalDocumentState(), {
      type: "set-fact",
      key: "precipitatingFactor",
      value: "trauma"
    });
    const suggestions = getPrototypeSuggestions(state);

    expect(suggestions.primary).toHaveLength(3);
    expect(suggestions.additional).toHaveLength(1);
    expect(state.workingDiagnoses).toEqual([]);
  });

  it("derives attention without turning it into a fact", () => {
    const trauma = workspaceReducer(createEmptyClinicalDocumentState(), {
      type: "set-fact",
      key: "precipitatingFactor",
      value: "trauma"
    });
    const state = workspaceReducer(trauma, {
      type: "set-fact",
      key: "function",
      value: "cannot-four-steps"
    });

    expect(getPrototypeAttentionPoints(state).map((item) => item.id)).toEqual([
      "fracture-screening"
    ]);
    expect(state.facts).not.toHaveProperty("fracture-screening");
  });

  it("reports deterministic missing imaging information", () => {
    expect(getImagingMissingInformation(undefined)).toEqual(["Status", "Planlagt handling"]);
    expect(getImagingMissingInformation({ status: "planned" })).toEqual([
      "Planlagt handling",
      "Modalitet",
      "Side",
      "Indikation",
      "Klinisk spørgsmål"
    ]);
  });
});
