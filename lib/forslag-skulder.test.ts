import { describe, expect, it } from "vitest";

import { skulder } from "../indhold/skulder";
import { planForslag } from "./forslag";

// Fysioterapi er førstevalg ved impingement (LH Subakromielt smertesyndrom 2021); lægens ønske 2026-11-24.
describe("skulder: forslag til plan", () => {
  it("impingement: fysioterapeutisk træning foreslås med ét tryk", () => {
    expect(planForslag(skulder, {}, ["diff-impingement"]).forslag).toEqual(["beh-traening"]);
  });
  it("uden valgt diagnose foreslås intet", () => {
    expect(planForslag(skulder, {}, []).forslag).toEqual([]);
  });
});
