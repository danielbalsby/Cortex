import { describe, expect, it } from "vitest";

import type { Region } from "../indhold/typer";
import { foreneligeDiagnoser, planForslag } from "./forslag";
import { udfyldNormale } from "./tastatur";

// Syntetisk region – ikke klinisk indhold.
const kilde = { kilder: ["k"], status: "UDKAST" as const };
const R: Region = {
  id: "test",
  navn: "Test",
  grupper: [
    {
      id: "g",
      titel: "G",
      felter: [
        { id: "a", label: "Felt A", type: "enkelt", valg: [{ id: "ja", label: "Ja", notat: "A ja." }, { id: "nej", label: "Nej", notat: "A nej.", normal: true }] },
        { id: "b", label: "Felt B", type: "enkelt", valg: [{ id: "x", label: "X", notat: "B x." }, { id: "y", label: "Y", notat: "B y.", normal: true }] }
      ]
    }
  ],
  notat: [{ overskrift: "S", felter: ["a", "b"] }],
  kilder: [{ id: "k", udgiver: "T", dansk: true, titel: "T", aar: 2026, url: "https://example.com", sidstTjekket: "2026-11-17" }],
  roedeFlag: [],
  differentialdiagnoser: [
    { id: "d1", navn: "D1", kendetegn: [], notat: "D1.", foreneligHvis: [[{ felt: "a", er: "ja" }], [{ felt: "b", er: "x" }]], ...kilde },
    { id: "d2", navn: "D2", kendetegn: [], notat: "D2.", foreneligHvis: [[{ felt: "a", er: "ja" }, { felt: "b", er: "x" }]], ...kilde },
    { id: "d3", navn: "D3 uden betingelse", kendetegn: [], notat: "D3.", ...kilde }
  ],
  behandling: [
    { id: "b1", tekst: "B1", gaelderFor: ["d1"], forslagVed: ["d1"], notat: "B1.", ...kilde },
    { id: "b2", tekst: "B2 kun gaelderFor", gaelderFor: ["d1"], notat: "B2.", ...kilde },
    { id: "b3", tekst: "B3 generel", notat: "B3.", ...kilde }
  ],
  henvisning: [
    { id: "h1", til: "H1", kriterier: "", gyldighed: "national", forslagVed: ["d1"], foreslaaHvis: [[{ felt: "b", er: "x" }]], notat: "H1.", ...kilde },
    { id: "h2", til: "H2 uden betingelse", kriterier: "", gyldighed: "national", forslagVed: ["d1"], notat: "H2.", ...kilde },
    { id: "h3", til: "H3 gaelderFor", kriterier: "", gyldighed: "national", gaelderFor: ["d1"], notat: "H3.", ...kilde },
    { id: "h4", til: "H4 anden diagnose", kriterier: "", gyldighed: "national", gaelderFor: ["d2"], notat: "H4.", ...kilde }
  ]
};

describe("forenelige diagnoser", () => {
  it("tomt input giver ingen fremhævning", () => {
    expect(foreneligeDiagnoser(R, {})).toEqual([]);
  });

  it("ELLER mellem grupper, OG inden for en gruppe; fundene, der passer, vises som lægens egne valg", () => {
    expect(foreneligeDiagnoser(R, { a: "ja" })).toEqual([{ id: "d1", navn: "D1", passerMed: ["Felt A: Ja"] }]);
    expect(foreneligeDiagnoser(R, { a: "ja", b: "x" })).toEqual([
      { id: "d1", navn: "D1", passerMed: ["Felt A: Ja", "Felt B: X"] },
      { id: "d2", navn: "D2", passerMed: ["Felt A: Ja", "Felt B: X"] }
    ]);
  });

  it("indholdsfilens rækkefølge bevares – ingen sortering efter antal passende fund", () => {
    const ids = foreneligeDiagnoser(R, { a: "ja", b: "x" }).map((d) => d.id);
    expect(ids).toEqual(["d1", "d2"]);
  });

  it("en diagnose uden betingelse fremhæves aldrig", () => {
    expect(foreneligeDiagnoser(R, { a: "ja", b: "x" }).map((d) => d.id)).not.toContain("d3");
  });

  it("N (normalfund) skaber ingen fremhævning i sig selv", () => {
    expect(foreneligeDiagnoser(R, udfyldNormale(R, {}))).toEqual([]);
  });
});

describe("forslag til plan", () => {
  it("intet forslag uden en valgt diagnose", () => {
    expect(planForslag(R, { a: "ja", b: "x" }, [])).toEqual({ forslag: [], vurder: [] });
  });

  it("valgt diagnose: kun forslagVed-behandling, og henvisning kun når dens egen betingelse passer", () => {
    expect(planForslag(R, { a: "ja" }, ["d1"])).toEqual({ forslag: ["b1"], vurder: ["h1", "h2", "h3"] });
    expect(planForslag(R, { a: "ja", b: "x" }, ["d1"])).toEqual({ forslag: ["b1", "h1"], vurder: ["h2", "h3"] });
  });

  it("allerede valgte punkter foreslås ikke igen", () => {
    expect(planForslag(R, { b: "x" }, ["d1", "b1"]).forslag).toEqual(["h1"]);
  });
});
