import { describe, expect, it } from "vitest";

import {
  CLINICAL_DOCUMENT_CONTEXT,
  createEmptyClinicalDocumentState,
  setPrototypeMode
} from "./model";

describe("Clinical Document Workspace v2 Phase 1 state", () => {
  it("starts in empty Quick mode with fixed knee-pain context", () => {
    const state = createEmptyClinicalDocumentState();

    expect(state).toEqual({ mode: "quick", facts: {} });
    expect(CLINICAL_DOCUMENT_CONTEXT).toEqual({
      problemCode: "knee-pain",
      problemLabel: "Knæsmerte"
    });
  });

  it("changes presentation mode without creating clinical facts or mutating state", () => {
    const quick = createEmptyClinicalDocumentState();
    const standard = setPrototypeMode(quick, "standard");

    expect(standard).toEqual({ mode: "standard", facts: {} });
    expect(quick).toEqual({ mode: "quick", facts: {} });
  });
});
