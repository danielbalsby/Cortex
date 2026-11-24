import { describe, expect, it } from "vitest";

import { INDHOLD } from "../indhold";
import type { Region } from "../indhold/typer";
import { kortTitel, planVisning } from "./visning";

const regioner = Object.values(INDHOLD).filter((r): r is Region => Boolean(r));
const ids = (punkter: { id: string }[]) => punkter.map((p) => p.id);

describe.each(regioner)("planVisning: $navn", (region) => {
  const tilfaelde: string[][] = [
    [],
    ...region.differentialdiagnoser.map((d) => [d.id]),
    [region.differentialdiagnoser[0]!.id, region.behandling.at(-1)!.id, region.henvisning.at(-1)!.id],
    [region.behandling[0]!.id] // P-punkt uden diagnose
  ];
  it.each(tilfaelde)("intet punkt forsvinder, og valgte punkter står altid fremme (%#)", (...valgte) => {
    const v = planVisning(region, valgte);
    for (const [alle, delt] of [
      [region.behandling, v.behandling],
      [region.henvisning, v.henvisning]
    ] as const) {
      // Samme punkter, samme rækkefølge, ingen dubletter.
      expect([...ids(delt.naer), ...ids(delt.oevrige)].sort()).toEqual(ids(alle).sort());
      expect(ids(delt.naer)).toEqual(ids(alle).filter((id) => ids(delt.naer).includes(id)));
      for (const id of valgte) expect(ids(delt.oevrige)).not.toContain(id);
    }
  });
  it("uden valgt diagnose står kun valgte punkter fremme", () => {
    const v = planVisning(region, []);
    expect(v.behandling.naer).toEqual([]);
    expect(v.henvisning.naer).toEqual([]);
  });
});

describe("planVisning: knæ", () => {
  const knae = INDHOLD.knae!;
  it("gonartrose: dens egen behandling og henvisning fremme, ikke korsbåndets", () => {
    const v = planVisning(knae, ["diff-artrose"]);
    expect(ids(v.henvisning.naer)).toContain("hen-artrose");
    expect(ids(v.henvisning.naer)).toContain("hen-fys");
    expect(v.behandling.naer.every((b) => !b.gaelderFor?.length || b.gaelderFor.includes("diff-artrose"))).toBe(true);
    expect(v.behandling.naer.length).toBeLessThan(knae.behandling.length / 2);
  });
});

describe("kortTitel", () => {
  it("bruger teksten før kolon og bevarer resten", () => {
    expect(kortTitel("Aflåst knæ: vridtraume.")).toEqual({ titel: "Aflåst knæ:", rest: "vridtraume." });
  });
  it("uden kolon: første sætning", () => {
    expect(kortTitel("Bursit med feber indikerer septisk bursit. Der bør henvises.")).toEqual({
      titel: "Bursit med feber indikerer septisk bursit.",
      rest: "Der bør henvises."
    });
  });
  it("ingen ord går tabt", () => {
    for (const region of regioner)
      for (const flag of region.roedeFlag) {
        const { titel, rest } = kortTitel(flag.tekst);
        expect([titel, rest].filter(Boolean).join(" ")).toBe(flag.tekst);
      }
  });
});
