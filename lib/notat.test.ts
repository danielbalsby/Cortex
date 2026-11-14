import { describe, expect, it } from "vitest";

import { knae } from "../indhold/knae";
import type { Svar } from "../indhold/typer";
import { bygNotat, saetSvar } from "./notat";

function vaelg(svar: Svar, felt: string, vaerdi: string | string[]): Svar {
  return saetSvar(knae, svar, felt, vaerdi);
}

describe("bygNotat (knæ)", () => {
  it("giver tomt notat, når intet er valgt", () => {
    expect(bygNotat(knae, {})).toBe("");
  });

  it("skriver kun det valgte, i skabelonens rækkefølge", () => {
    let svar: Svar = {};
    svar = vaelg(svar, "ledlinje", "medial");
    svar = vaelg(svar, "debut", "gradvis");
    svar = vaelg(svar, "side", "hoejre");
    expect(bygNotat(knae, svar)).toBe(
      "S: Højresidige knæsmerter. Gradvist indsættende.\nO: Medial ledlinjeømhed."
    );
  });

  it("udelader afsnit uden indhold", () => {
    expect(bygNotat(knae, vaelg({}, "haevelse", "let"))).toBe("O: Let hævelse.");
  });

  it("sætter punktum efter fritekst og ignorerer tom fritekst", () => {
    expect(bygNotat(knae, vaelg({}, "anamnese-tekst", "  smerter ved trappegang "))).toBe(
      "S: smerter ved trappegang."
    );
    expect(bygNotat(knae, vaelg({}, "anamnese-tekst", "Løber 30 km/uge."))).toBe("S: Løber 30 km/uge.");
    expect(bygNotat(knae, { "anamnese-tekst": "   " })).toBe("");
  });
});

describe("saetSvar (knæ)", () => {
  it("fjerner svar i traumefelter, når traume ændres til nej", () => {
    let svar: Svar = {};
    svar = vaelg(svar, "traume", "ja");
    svar = vaelg(svar, "traumemekanisme", "vrid");
    svar = vaelg(svar, "knaek", "ja");
    expect(bygNotat(knae, svar)).toContain("Traume ved vrid.");

    svar = vaelg(svar, "traume", "nej");
    expect(svar).toEqual({ traume: "nej" });
    expect(bygNotat(knae, svar)).toBe("S: Intet traume.");

    // Felterne er tomme, når traume igen sættes til ja.
    svar = vaelg(svar, "traume", "ja");
    expect(svar).toEqual({ traume: "ja" });
  });

  it("fjerner et svar, når værdien er tom", () => {
    const svar = vaelg(vaelg({}, "side", "venstre"), "side", "");
    expect(svar).toEqual({});
  });

  it("ændrer ikke det oprindelige svar-objekt", () => {
    const foer: Svar = { side: "hoejre" };
    vaelg(foer, "side", "venstre");
    expect(foer).toEqual({ side: "hoejre" });
  });
});
