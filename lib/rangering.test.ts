import { describe, expect, it } from "vitest";

import type { Region } from "../indhold/typer";
import { lrTekst, rangering } from "./rangering";

// Syntetisk region – ikke klinisk indhold, og LR-tallene er opdigtede testværdier.
const kilde = { kilder: ["k"], status: "UDKAST" as const };
const valg = (...ider: string[]) => ider.map((id) => ({ id, label: id.toUpperCase(), notat: `${id}.` }));
const R: Region = {
  id: "test",
  navn: "Test",
  grupper: [
    {
      id: "g",
      titel: "G",
      felter: [
        { id: "a", label: "Test A", type: "enkelt", valg: valg("neg", "pos") },
        { id: "b", label: "Test B", type: "enkelt", valg: valg("neg", "pos") },
        { id: "c", label: "Test C", type: "enkelt", valg: valg("neg", "pos") }
      ]
    }
  ],
  notat: [{ overskrift: "O", felter: ["a", "b", "c"] }],
  kilder: [{ id: "k", udgiver: "T", dansk: false, titel: "T", aar: 2026, url: "https://example.com", sidstTjekket: "2026-11-24" }],
  roedeFlag: [],
  differentialdiagnoser: [
    {
      id: "d1",
      navn: "D1",
      kendetegn: [],
      notat: "D1.",
      fund: [
        { hvis: [{ felt: "a", er: "pos" }], lr: 4, kilder: ["k"], klynge: "ab" },
        { hvis: [{ felt: "b", er: "pos" }], lr: 8, kilder: ["k"], klynge: "ab" },
        { hvis: [{ felt: "c", er: "neg" }], lr: 0.5, kilder: ["k"] }
      ],
      ...kilde
    },
    {
      id: "d2",
      navn: "D2",
      kendetegn: [],
      notat: "D2.",
      fund: [
        { hvis: [{ felt: "a", er: "pos" }], lr: 3, kilder: ["k"] },
        { hvis: [{ felt: "c", er: "pos" }], lr: 3, kilder: ["k"] }
      ],
      ...kilde
    },
    { id: "d3", navn: "D3 uden fund-data", kendetegn: [], notat: "D3.", ...kilde },
    {
      id: "d4",
      navn: "D4 samme styrke som D2",
      kendetegn: [],
      notat: "D4.",
      fund: [{ hvis: [{ felt: "a", er: "pos" }], lr: 3, kilder: ["k"] }, { hvis: [{ felt: "c", er: "pos" }], lr: 3, kilder: ["k"] }],
      ...kilde
    }
  ],
  behandling: [],
  henvisning: []
};

describe("rangering", () => {
  it("tomt input giver ingen rangering", () => {
    expect(rangering(R, {})).toEqual([]);
  });

  it("i samme klynge tæller kun det stærkeste fund (ingen dobbelttælling)", () => {
    const [d1] = rangering(R, { a: "pos", b: "pos" });
    expect(d1.id).toBe("d1");
    expect(d1.samlet).toBe(8);
    expect(d1.for.map((b) => b.fund)).toEqual(["Test B: POS"]);
  });

  it("fund i forskellige klynger ganges, og fund imod vises", () => {
    const d1 = rangering(R, { b: "pos", c: "neg" }).find((r) => r.id === "d1")!;
    expect(d1.samlet).toBe(4);
    expect(d1.imod.map((b) => b.fund)).toEqual(["Test C: NEG"]);
  });

  it("stærkeste først; ligestilling bevarer indholdsfilens rækkefølge", () => {
    expect(rangering(R, { a: "pos", c: "pos" }).map((r) => r.id)).toEqual(["d2", "d4", "d1"]);
  });

  it("en diagnose, fundene samlet taler imod, eller uden fund-data, rangeres ikke", () => {
    expect(rangering(R, { c: "neg" })).toEqual([]);
    const ider = rangering(R, { a: "pos", c: "neg" }).map((r) => r.id);
    expect(ider).toContain("d1"); // 4 × 0,5 = 2 > 1
    expect(ider).not.toContain("d3");
  });

  it("lrTekst bruger dansk decimaltegn", () => {
    expect(lrTekst(10.2)).toBe("LR 10");
    expect(lrTekst(0.45)).toBe("LR 0,45");
    expect(lrTekst(3.5)).toBe("LR 3,5");
  });
});
