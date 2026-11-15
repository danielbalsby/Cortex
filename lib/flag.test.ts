import { describe, expect, it } from "vitest";

import { knae } from "../indhold/knae";
import { INDHOLD } from "../indhold/index";
import type { Region } from "../indhold/typer";
import { flagStatus, sorterFlag } from "./flag";

const flag = (id: string) => knae.roedeFlag.find((item) => item.id === id)!;

describe("flagStatus", () => {
  it("tomt skema: flag med betingelse er 'ikke vurderet', aldrig 'ikke opfyldt'", () => {
    expect(flagStatus(flag("flag-bakteriel-artrit"), {})).toBe("ikke-vurderet");
  });

  it("matcher, når en gruppe passer", () => {
    expect(flagStatus(flag("flag-bakteriel-artrit"), { varme: "ja" })).toBe("matcher");
  });

  it("'ikke opfyldt' kræver, at alle betingelsens felter er besvaret uden match", () => {
    const svar = { varme: "ingen", roedme: "ingen", feber: "nej" };
    expect(flagStatus(flag("flag-bakteriel-artrit"), svar)).toBe("ikke-opfyldt");
    expect(flagStatus(flag("flag-bakteriel-artrit"), { varme: "ingen", roedme: "ingen" })).toBe("ikke-vurderet");
  });

  it("flag uden fremhævningsbetingelse har ingen status", () => {
    const uden = knae.roedeFlag.filter((item) => !item.fremhaevHvis?.length);
    expect(uden.length).toBeGreaterThan(0);
    for (const item of uden) expect(flagStatus(item, { varme: "ja" })).toBe("uden-betingelse");
  });

  it("flagStatus stemmer med den eksisterende fremhævning (matcher ⇔ passer)", () => {
    const regioner = Object.values(INDHOLD).filter((r): r is Region => Boolean(r));
    const svar = { traume: "ja", traumemekanisme: "vrid", varme: "ja", feber: "ja" };
    for (const region of regioner)
      for (const item of region.roedeFlag) {
        const gammel = (item.fremhaevHvis ?? []).some((g) => g.length > 0 && g.every((b) => svar[b.felt as keyof typeof svar] === b.er));
        expect(flagStatus(item, svar) === "matcher", `${region.id}/${item.id}`).toBe(gammel);
      }
  });
});

describe("sorterFlag", () => {
  it("matchende flag først, resten i indholdsfilens rækkefølge; ingen flag forsvinder", () => {
    const { matcher, oevrige } = sorterFlag(knae, { varme: "ja" });
    expect(matcher.length + oevrige.length).toBe(knae.roedeFlag.length);
    const rest = knae.roedeFlag.filter((item) => !matcher.some((m) => m.flag.id === item.id)).map((item) => item.id);
    expect(oevrige.map((item) => item.flag.id)).toEqual(rest);
  });
});
