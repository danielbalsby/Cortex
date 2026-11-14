import { describe, expect, it } from "vitest";

import { knae } from "../indhold/knae";
import { ryg } from "../indhold/ryg";
import { fremhaevTekst, konflikter } from "./gennemgang";

describe("gennemgang", () => {
  it("skriver fremhævningsbetingelser i klartekst", () => {
    const flag = knae.roedeFlag.find((item) => item.id === "flag-fraktur");
    const tekst = fremhaevTekst(knae, flag?.fremhaevHvis);
    expect(tekst.startsWith("Traume = Ja og Belastning = Kan ikke støtte  ELLER  ")).toBe(true);
    expect(tekst).toContain("Fleksion til 90° = Kan ikke");
    expect(tekst).toContain("Alder = Over 55");
  });

  it("siger det tydeligt, når et flag aldrig fremhæves", () => {
    expect(fremhaevTekst(knae, undefined)).toMatch(/aldrig/);
  });

  it("finder konflikter på tværs af punkttyper", () => {
    const typer = new Set(konflikter(ryg).map((linje) => linje.type));
    expect(typer).toEqual(new Set(["Rødt flag", "Behandling", "Henvisning"]));
  });
});
