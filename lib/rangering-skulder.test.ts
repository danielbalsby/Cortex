import { describe, expect, it } from "vitest";

import { skulder } from "../indhold/skulder";
import type { Svar } from "../indhold/typer";
import { saetSvar, synligeSvar } from "./notat";
import { rangering } from "./rangering";

// Tabeltest for skulderens LR-rangering: "disse fund → denne rækkefølge". Ændres LR'er eller betingelser i
// indhold/skulder.ts, fejler testen med scenariets navn. Tallene er kildernes (se fund i skulder.ts).

const svar = (trin: [string, string][]): Svar =>
  synligeSvar(skulder, trin.reduce<Svar>((s, [felt, v]) => saetSvar(skulder, s, felt, v), {}));
const raekkefoelge = (trin: [string, string][]) => rangering(skulder, svar(trin)).map((r) => r.id);

const TABEL: { navn: string; trin: [string, string][]; forventet: string[] }[] = [
  { navn: "tomt input", trin: [], forventet: [] },
  { navn: "positiv smertebue", trin: [["smertebue", "pos"]], forventet: ["diff-impingement"] },
  {
    navn: "positiv Hawkins: impingement (1,64) før cuff-ruptur (1,44)",
    trin: [["hawkins", "pos"]],
    forventet: ["diff-impingement", "diff-degenerativ-cuff"]
  },
  {
    navn: "positiv Hawkins efter traume: traumatisk før degenerativ ved ligestilling",
    trin: [["debut", "traume"], ["hawkins", "pos"]],
    forventet: ["diff-impingement", "diff-traumatisk-cuff", "diff-degenerativ-cuff"]
  },
  { navn: "ER lag uden traume: kun degenerativ ruptur", trin: [["debut", "spontan"], ["erlag", "pos"]], forventet: ["diff-degenerativ-cuff"] },
  {
    navn: "ER lag + positiv smertebue: ruptur (2,8) før impingement (1,57)",
    trin: [["debut", "overbelastning"], ["smertebue", "pos"], ["erlag", "pos"]],
    forventet: ["diff-degenerativ-cuff", "diff-impingement"]
  },
  { navn: "negative impingementtests rangerer intet", trin: [["smertebue", "neg"], ["hawkins", "neg"], ["neer", "neg"]], forventet: [] },
  { navn: "positiv relocation", trin: [["apprehension", "pos"], ["relocation", "pos"]], forventet: ["diff-instabilitet"] },
  { navn: "apprehension alene har ingen LR", trin: [["apprehension", "pos"]], forventet: [] },
  { navn: "drop arm og belly press har ingen LR", trin: [["droparm", "pos"], ["bellypress", "pos"]], forventet: [] }
];

describe("skulder: rangering efter likelihood ratio", () => {
  for (const { navn, trin, forventet } of TABEL) {
    it(navn, () => expect(raekkefoelge(trin)).toEqual(forventet));
  }

  it("impingementtests i samme klynge: smertebue + Hawkins + Neer tæller kun den stærkeste", () => {
    const [imp] = rangering(skulder, svar([["smertebue", "pos"], ["hawkins", "pos"], ["neer", "pos"]]));
    expect(imp?.id).toBe("diff-impingement");
    expect(imp?.samlet).toBeCloseTo(1.64);
    expect(imp?.for).toHaveLength(1);
  });

  it("relocation vises kun ved positiv apprehension og tæller ikke uden", () => {
    expect(raekkefoelge([["relocation", "pos"]])).toEqual([]);
  });

  it("alle LR'er i skulder har population (ikke-danske kilder)", () => {
    for (const diff of skulder.differentialdiagnoser) {
      for (const f of diff.fund ?? []) expect(f.population, diff.id).toBeTruthy();
    }
  });
});
