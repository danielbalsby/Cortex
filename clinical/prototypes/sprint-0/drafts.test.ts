import { describe, expect, it } from "vitest";

import { createEmptyClinicalDocumentState } from "@/clinical/prototypes/clinical-document-workspace/model";
import {
  workspaceReducer,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace/reducer";

import { SPRINT_ZERO_CONSULTATION_ACTIONS, SPRINT_ZERO_PATIENT } from "./fixtures";
import { generateMockAiSummary } from "./mock-ai";
import {
  generateImagingReferralDraft,
  generatePhysiotherapyReferralDraft,
  generateSprintZeroJournal,
  transitionDraftStatus
} from "./drafts";

function apply(actions: readonly WorkspaceAction[]) {
  return actions.reduce(workspaceReducer, createEmptyClinicalDocumentState());
}

describe("Sprint 0 deterministic prototype services", () => {
  it("creates no clinical journal facts from untouched consultation state", () => {
    const draft = generateSprintZeroJournal(createEmptyClinicalDocumentState());

    expect(draft.text).toBe("Problem: Knæsmerte");
    expect(draft.missing).toEqual(["Konsultationsoplysninger"]);
  });

  it("produces deeply equal mock summaries for identical synthetic context", () => {
    const first = generateMockAiSummary(SPRINT_ZERO_PATIENT);
    const second = generateMockAiSummary(SPRINT_ZERO_PATIENT);

    expect(first).toEqual(second);
    expect(first.ok && first.text).toContain("kræver fortsat afklaring");
  });

  it("returns an explicit recoverable mock failure without clinical output", () => {
    expect(generateMockAiSummary(SPRINT_ZERO_PATIENT, "failure")).toEqual({
      ok: false,
      provider: "deterministic-mock",
      version: "sprint-0.mock-summary.v1",
      error: "mock-service-unavailable",
      message: "Mock-resuméet kunne ikke genereres. Fortsæt manuelt med kildeoplysningerne."
    });
  });

  it("requires explicit referral intent and recorded minimum information", () => {
    const state = apply(SPRINT_ZERO_CONSULTATION_ACTIONS);

    expect(generateImagingReferralDraft(state, false).text).toBe("");
    expect(generatePhysiotherapyReferralDraft(state, false).missing).toContain(
      "Eksplicit ønske om henvisningsudkast"
    );
  });

  it("generates referral drafts only from recorded facts and clinician assessment", () => {
    const state = workspaceReducer(apply(SPRINT_ZERO_CONSULTATION_ACTIONS), {
      type: "add-diagnosis",
      diagnosis: {
        id: "manual-assessment",
        label: "Mistanke om menisk- eller ligamentskade",
        source: "free-text"
      }
    });

    const imaging = generateImagingReferralDraft(state, true);
    const physiotherapy = generatePhysiotherapyReferralDraft(state, true);

    expect(imaging.missing).toEqual([]);
    expect(imaging.text).toContain("Mistanke om menisk- eller ligamentskade");
    expect(physiotherapy.missing).toEqual([]);
    expect(physiotherapy.text).toContain("Plan: fysioterapeutisk vurdering.");
  });

  it("keeps review, approval and copy as explicit ordered transitions", () => {
    expect(transitionDraftStatus("draft", "copy")).toBe("draft");
    expect(transitionDraftStatus("draft", "approve")).toBe("draft");
    expect(transitionDraftStatus("draft", "review")).toBe("reviewed");
    expect(transitionDraftStatus("reviewed", "approve")).toBe("approved");
    expect(transitionDraftStatus("approved", "copy")).toBe("copied");
    expect(transitionDraftStatus("reviewed", "reject")).toBe("rejected");
  });
});
