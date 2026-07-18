import { describe, expect, it } from "vitest";

import { createEmptyClinicalDocumentState } from "./model";
import { getClinicalOverview } from "./selectors";

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
