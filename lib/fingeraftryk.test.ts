import { describe, expect, it } from "vitest";

import { GODKENDT_AFTRYK } from "../indhold/godkendt-fingeraftryk";
import { INDHOLD } from "../indhold/index";
import { knae } from "../indhold/knae";
import { fingeraftryk } from "./fingeraftryk";

type Punkt = Parameters<typeof fingeraftryk>[0] & { id: string };

const punkter = Object.entries(INDHOLD).flatMap(([rid, r]) =>
  r
    ? ([...r.roedeFlag, ...r.differentialdiagnoser, ...r.behandling, ...r.henvisning] as unknown as Punkt[]).map((p) => ({
        noegle: `${rid}/${p.id}`,
        p
      }))
    : []
);

describe("godkendte punkter er låst", () => {
  it("et GODKENDT punkt er uændret siden godkendelsen (tekst, handling, betingelser, kilder, konflikt)", () => {
    const fejl: string[] = [];
    for (const { noegle, p } of punkter) {
      if (p.status !== "GODKENDT") continue;
      const gemt = GODKENDT_AFTRYK[noegle];
      const nu = fingeraftryk(p);
      if (!gemt) fejl.push(`${noegle}: GODKENDT, men ikke i godkendt-fingeraftryk.ts`);
      else if (gemt.aftryk !== nu || gemt.dato !== p.godkendtDato)
        fejl.push(
          `${noegle}: ændret siden godkendelsen ${gemt.dato}. Sæt status til UDKAST – eller, efter lægens nye godkendelse: "${noegle}": { dato: "${p.godkendtDato}", aftryk: "${nu}" }`
        );
    }
    expect(fejl).toEqual([]);
  });

  it("fingeraftryksfilen indeholder kun punkter, der er GODKENDT", () => {
    const godkendte = new Set(punkter.filter(({ p }) => p.status === "GODKENDT").map(({ noegle }) => noegle));
    expect(Object.keys(GODKENDT_AFTRYK).filter((k) => !godkendte.has(k))).toEqual([]);
  });

  it("opdager en ændring af handling og af en betingelse; status indgår ikke", () => {
    const flag = knae.roedeFlag.find((f) => f.id === "flag-bakteriel-artrit")!;
    const foer = fingeraftryk(flag);
    expect(fingeraftryk({ ...flag, handling: flag.handling + " " })).not.toBe(foer);
    expect(fingeraftryk({ ...flag, fremhaevHvis: [[{ felt: "varme", er: "ingen" }]] })).not.toBe(foer);
    expect(fingeraftryk({ ...flag, status: "UDKAST", godkendtDato: undefined })).toBe(foer);
  });
});
