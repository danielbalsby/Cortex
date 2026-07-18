import { describe, expect, it } from "vitest";

import { buildJournalSections, generatePrototypeJournal } from "./journal";
import { createEmptyClinicalDocumentState, setPrototypeMode } from "./model";

describe("Clinical Document Workspace v2 Phase 1 journal", () => {
  it("always documents the fixed problem and no untouched clinical sections", () => {
    const state = createEmptyClinicalDocumentState();

    expect(buildJournalSections(state)).toEqual([
      { id: "problem", text: "Problem: Knæsmerte" }
    ]);
    expect(generatePrototypeJournal(state)).toBe("Problem: Knæsmerte");
    expect(generatePrototypeJournal(state)).not.toMatch(
      /Anamnese|Objektivt|Vurdering|Plan|knæskade/i
    );
  });

  it("does not change output when only the presentation mode changes", () => {
    const quick = createEmptyClinicalDocumentState();
    const standard = setPrototypeMode(quick, "standard");

    expect(generatePrototypeJournal(standard)).toBe(generatePrototypeJournal(quick));
  });
});
