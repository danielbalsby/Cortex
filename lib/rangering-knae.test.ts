import { describe, expect, it } from "vitest";

import { knae } from "../indhold/knae";
import type { Svar } from "../indhold/typer";
import { saetSvar, synligeSvar } from "./notat";
import { rangering } from "./rangering";

// Tabeltest for knæets LR-rangering: "disse fund → denne rækkefølge". Ændres LR'er eller betingelser i
// indhold/knae.ts, fejler testen med scenariets navn. Tallene er kildernes (se fund i knae.ts).

const flere = new Set(["smertested", "valgus30"]);
const svar = (trin: [string, string][]): Svar =>
  synligeSvar(knae, trin.reduce<Svar>((s, [felt, v]) => saetSvar(knae, s, felt, flere.has(felt) ? [v] : v), {}));
const raekkefoelge = (trin: [string, string][]) => rangering(knae, svar(trin)).map((r) => r.id);

const traume: [string, string][] = [["traume", "ja"]];

const TABEL: { navn: string; trin: [string, string][]; forventet: string[] }[] = [
  { navn: "tomt input", trin: [], forventet: [] },
  { navn: "kun traume", trin: traume, forventet: [] },
  { navn: "positiv Lachman", trin: [...traume, ["lachman", "pos"]], forventet: ["diff-acl"] },
  { navn: "negativ Lachman alene rangerer intet", trin: [...traume, ["lachman", "neg"]], forventet: [] },
  { navn: "knæk + negativ Lachman: samlet under 1", trin: [...traume, ["knaek", "ja"], ["lachman", "neg"]], forventet: [] },
  { navn: "smerte ved valgusstress", trin: [...traume, ["valgus30", "smerte"]], forventet: ["diff-mcl"] },
  {
    navn: "vrid + medial smerte + medial ledlinjeømhed",
    trin: [...traume, ["traumemekanisme", "vrid"], ["smertested", "medialt"], ["ledlinje", "medial"]],
    forventet: ["diff-menisk"]
  },
  {
    navn: "menisk-klynge + positiv Lachman: menisk (8,9) før korsbånd (5,65)",
    trin: [...traume, ["traumemekanisme", "vrid"], ["smertested", "medialt"], ["ledlinje", "medial"], ["lachman", "pos"]],
    forventet: ["diff-menisk", "diff-acl"]
  },
  {
    navn: "positiv pivot shift slår menisk-klyngen",
    trin: [...traume, ["traumemekanisme", "vrid"], ["smertested", "medialt"], ["ledlinje", "medial"], ["pivotshift", "pos"]],
    forventet: ["diff-acl", "diff-menisk"]
  },
  { navn: "uden traume vises ligamenttests ikke og tæller ikke", trin: [["traume", "nej"], ["lachman", "pos"]], forventet: [] }
];

describe("knæ: rangering efter likelihood ratio", () => {
  it.each(TABEL)("$navn", ({ trin, forventet }) => {
    expect(raekkefoelge(trin)).toEqual(forventet);
  });

  it("overlappende ACL-tests tæller kun den stærkeste (pivot shift 13,99, ikke × Lachman × skuffe)", () => {
    const [acl] = rangering(knae, svar([...traume, ["lachman", "pos"], ["skuffe", "pos"], ["pivotshift", "pos"]]));
    expect(acl?.id).toBe("diff-acl");
    expect(acl?.samlet).toBeCloseTo(13.99);
    expect(acl?.for).toHaveLength(1);
  });

  it("knæk (anamnese) og test ganges som uafhængige klynger", () => {
    const [acl] = rangering(knae, svar([...traume, ["knaek", "ja"], ["lachman", "pos"]]));
    expect(acl?.samlet).toBeCloseTo(2.3 * 5.65);
  });

  it("alle knæets LR'er har population og en ikke-dansk kilde mærket som sådan", () => {
    const kilder = new Map(knae.kilder.map((k) => [k.id, k]));
    for (const diff of knae.differentialdiagnoser) {
      for (const f of diff.fund ?? []) {
        expect(f.population, `${diff.id}: population mangler`).toBeTruthy();
        for (const id of f.kilder) expect(kilder.get(id)?.dansk, `${id} skal være mærket ikke-dansk`).toBe(false);
      }
    }
  });
});
