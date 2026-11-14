import { describe, expect, it } from "vitest";

import { REGIONER, regionFraTast } from "./regioner";

describe("regioner", () => {
  it("har præcis fem regioner med unikke id'er", () => {
    expect(REGIONER).toHaveLength(5);
    expect(new Set(REGIONER.map((region) => region.id)).size).toBe(5);
  });

  it("vælger region med tasterne 1–5 og ignorerer alt andet", () => {
    expect(regionFraTast("1")).toBe("skulder");
    expect(regionFraTast("4")).toBe("knae");
    expect(regionFraTast("5")).toBe("ankel");
    expect(regionFraTast("6")).toBeUndefined();
    expect(regionFraTast("0")).toBeUndefined();
    expect(regionFraTast("a")).toBeUndefined();
  });
});
