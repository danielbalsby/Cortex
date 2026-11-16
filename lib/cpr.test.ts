import { describe, expect, it } from "vitest";

import { lignerCpr } from "./cpr";

describe("lignerCpr", () => {
  it("genkender CPR med og uden bindestreg", () => {
    expect(lignerCpr("Jens 010100-0000")).toBe(true);
    expect(lignerCpr("0101000000")).toBe(true);
    expect(lignerCpr("010100 0000")).toBe(true);
  });

  it("giver ikke falsk alarm ved almindelige kliniske tal", () => {
    expect(lignerCpr("Feber 38,9 i 3 dage")).toBe(false);
    expect(lignerCpr("Fleksion 0-90 grader, 2 uger")).toBe(false);
    expect(lignerCpr("12345678901")).toBe(false); // 11 cifre
  });
});
