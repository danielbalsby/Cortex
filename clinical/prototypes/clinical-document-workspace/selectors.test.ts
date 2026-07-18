import { describe, expect, it } from "vitest";

import { createEmptyClinicalDocumentState } from "./model";
import { workspaceReducer, type WorkspaceAction } from "./reducer";
import {
  getClinicalOverview,
  getAssessmentContext,
  getHistoryContext,
  getImagingMissingInformation,
  getObjectiveContext,
  getPlanContext,
  getPrototypeAttentionPoints,
  getPrototypeSuggestions,
  getReferralDraftFoundations
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

  it("does not show a suggestion from trauma or gradual onset alone", () => {
    const state = workspaceReducer(createEmptyClinicalDocumentState(), {
      type: "set-fact",
      key: "precipitatingFactor",
      value: "trauma"
    });
    const gradual = workspaceReducer(createEmptyClinicalDocumentState(), {
      type: "set-fact",
      key: "onset",
      value: "gradual"
    });

    expect(getPrototypeSuggestions(state)).toEqual({ primary: [], additional: [] });
    expect(getPrototypeSuggestions(gradual)).toEqual({ primary: [], additional: [] });
    expect(state.workingDiagnoses).toEqual([]);
  });

  it("shows supported possibilities only after their explicit minimum support is met", () => {
    const actions: WorkspaceAction[] = [
      { type: "set-fact", key: "side", value: "right" },
      { type: "set-fact", key: "onset", value: "acute" },
      { type: "set-fact", key: "duration", value: "to dage" },
      { type: "set-fact", key: "precipitatingFactor", value: "trauma" },
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "twisting-planted-foot" },
      { type: "toggle-list-fact", key: "painLocations", value: "medial" },
      { type: "set-fact", key: "instability", value: "yes" }
    ];
    const state = actions.reduce(workspaceReducer, createEmptyClinicalDocumentState());
    const suggestions = getPrototypeSuggestions(state);

    expect(suggestions.primary.map((item) => item.id)).toEqual([
      "sprain",
      "meniscus",
      "ligament"
    ]);
    expect(suggestions.additional.map((item) => item.id)).toEqual(["nonspecific"]);
    expect(suggestions.primary.every((item) => item.reason.includes("ikke konklusion"))).toBe(
      true
    );
    expect(state.workingDiagnoses).toEqual([]);
  });

  it("derives document context from explicit facts without leaking facts between sections", () => {
    const history = workspaceReducer(createEmptyClinicalDocumentState(), {
      type: "set-fact",
      key: "duration",
      value: "  seks måneder  "
    });
    const objective = workspaceReducer(history, {
      type: "set-fact",
      key: "effusion",
      value: "mild"
    });
    const assessed = workspaceReducer(objective, {
      type: "add-diagnosis",
      diagnosis: { id: "manual", label: "Manuel hypotese", source: "free-text" }
    });
    const planned = workspaceReducer(assessed, {
      type: "toggle-plan-action",
      action: "activity"
    });

    expect(getHistoryContext(objective)).toBe("varighed: seks måneder.");
    expect(getHistoryContext(objective)).not.toContain("Effusion");
    expect(getObjectiveContext(objective)).toBe("Registrerede fund: Effusion.");
    expect(getAssessmentContext(assessed)).toBe("Valgte arbejdshypoteser: Manuel hypotese.");
    expect(getPlanContext(planned)).toBe("Registreret plan: Aktivitetstilpasning.");
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
    expect(
      getImagingMissingInformation({
        status: "planned",
        plannedAction: "prepare-referral",
        modality: "acute-x-ray",
        side: "right",
        indication: "   ",
        clinicalQuestion: "   "
      })
    ).toEqual(["Indikation", "Klinisk spørgsmål"]);
  });

  it("does not infer referral intent from generic physiotherapy planning", () => {
    const state = workspaceReducer(createEmptyClinicalDocumentState(), {
      type: "toggle-plan-action",
      action: "physiotherapy"
    });

    expect(getReferralDraftFoundations(state)).toEqual([]);
  });

  it("exposes an incomplete imaging foundation only after explicit referral intent", () => {
    const actions: WorkspaceAction[] = [
      { type: "toggle-plan-action", action: "imaging" },
      { type: "set-imaging-field", key: "status", value: "planned" },
      { type: "set-imaging-field", key: "plannedAction", value: "prepare-referral" }
    ];
    const state = actions.reduce(workspaceReducer, createEmptyClinicalDocumentState());
    const foundations = getReferralDraftFoundations(state);

    expect(foundations).toEqual([
      {
        id: "imaging-referral",
        label: "Billeddiagnostisk henvisning",
        status: "missing-information",
        detail: "Mangler struktureret grundlag: Modalitet, Side, Indikation, Klinisk spørgsmål."
      }
    ]);
  });

  it("marks the imaging foundation recorded only when its minimum inputs are present", () => {
    const actions: WorkspaceAction[] = [
      { type: "toggle-plan-action", action: "imaging" },
      { type: "set-imaging-field", key: "status", value: "planned" },
      { type: "set-imaging-field", key: "plannedAction", value: "prepare-referral" },
      { type: "set-imaging-field", key: "modality", value: "acute-x-ray" },
      { type: "set-imaging-field", key: "side", value: "right" },
      { type: "set-imaging-field", key: "indication", value: "Registreret indikation" },
      { type: "set-imaging-field", key: "clinicalQuestion", value: "Registreret spørgsmål" }
    ];
    const state = actions.reduce(workspaceReducer, createEmptyClinicalDocumentState());

    expect(getReferralDraftFoundations(state)).toEqual([
      {
        id: "imaging-referral",
        label: "Billeddiagnostisk henvisning",
        status: "foundation-recorded",
        detail:
          "Struktureret grundlag er registreret. Endelig regional henvisningstekst er ikke implementeret i prototypen."
      }
    ]);
  });
});
