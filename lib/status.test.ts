import { describe, expect, it } from "vitest";

import { eksempel } from "../indhold/eksempel";
import { knae } from "../indhold/knae";
import { optael } from "./status";

describe("optael", () => {
  it("tæller udkast, manglende kilder og konflikter", () => {
    expect(optael(eksempel)).toEqual({
      punkter: 6,
      udkast: 5,
      kildeMangler: 1,
      konflikter: 1,
      aeldsteTjek: "2026-11-14"
    });
  });

  it("giver nul og ingen dato for en region uden klinisk indhold", () => {
    const tom = { ...knae, kilder: [], roedeFlag: [], differentialdiagnoser: [], behandling: [], henvisning: [] };
    expect(optael(tom)).toEqual({ punkter: 0, udkast: 0, kildeMangler: 0, konflikter: 0, aeldsteTjek: undefined });
  });
});
