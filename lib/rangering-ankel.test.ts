import { describe, expect, it } from "vitest";

import { ankel } from "../indhold/ankel";
import type { Svar } from "../indhold/typer";
import { saetSvar, synligeSvar } from "./notat";
import { rangering } from "./rangering";

// Tabeltest for anklens LR-rangering: "disse fund → denne rækkefølge". Ændres LR'er eller betingelser i
// indhold/ankel.ts, fejler testen med scenariets navn. Tallene er kildens (se fund i ankel.ts).
// Fraktur, syndesmose og akillesseneruptur rangeres ikke: de dækkes af røde flag (som fraktur i knæ),
// og de læste kilder giver ingen LR, der passer til de eksisterende (godkendte) felter.

const svar = (trin: [string, string][]): Svar =>
  synligeSvar(ankel, trin.reduce<Svar>((s, [felt, v]) => saetSvar(ankel, s, felt, v), {}));
const raekkefoelge = (trin: [string, string][]) => rangering(ankel, svar(trin)).map((r) => r.id);

const inversion: [string, string][] = [["mekanisme", "inversion"]];

const TABEL: { navn: string; trin: [string, string][]; forventet: string[] }[] = [
  { navn: "tomt input", trin: [], forventet: [] },
  { navn: "kun indadvrid", trin: inversion, forventet: [] },
  { navn: "positiv forreste skuffe", trin: [...inversion, ["forskuffe", "pos"]], forventet: ["diff-distorsion"] },
  { navn: "negativ forreste skuffe rangerer intet", trin: [...inversion, ["forskuffe", "neg"]], forventet: [] },
  { navn: "forreste skuffe vises kun ved indadvrid og tæller ikke uden", trin: [["mekanisme", "udadrotation"], ["forskuffe", "pos"]], forventet: [] },
  {
    navn: "Ottawa-fund rangerer ikke fraktur (rødt flag)",
    trin: [...inversion, ["malleol", "lateral"], ["skridt-straks", "nej"], ["skridt-nu", "nej"]],
    forventet: []
  },
  { navn: "positiv Thompson rangerer ikke (rødt flag)", trin: [["mekanisme", "smaeld"], ["akilles", "positiv"]], forventet: [] }
];

describe("ankel: rangering efter likelihood ratio", () => {
  for (const { navn, trin, forventet } of TABEL) {
    it(navn, () => expect(raekkefoelge(trin)).toEqual(forventet));
  }

  it("positiv forreste skuffe bruger kildens LR+ 3,97", () => {
    const [d] = rangering(ankel, svar([...inversion, ["forskuffe", "pos"]]));
    expect(d?.samlet).toBeCloseTo(3.97);
  });

  it("alle LR'er i ankel har population (ikke-danske kilder)", () => {
    for (const diff of ankel.differentialdiagnoser) {
      for (const f of diff.fund ?? []) expect(f.population, diff.id).toBeTruthy();
    }
  });
});
