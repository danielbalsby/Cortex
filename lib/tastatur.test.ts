import { describe, expect, it } from "vitest";

import { knae } from "../indhold/knae";
import { bygNotat } from "./notat";
import { naboFelt, udfyldNormale, vaelgMedTal } from "./tastatur";

describe("vaelgMedTal (knæ)", () => {
  it("vælger med tal og rykker frem", () => {
    const resultat = vaelgMedTal(knae, {}, "side", 2);
    expect(resultat).toEqual({ svar: { side: "venstre" }, rykFrem: true });
  });

  it("fravælger ved samme tal igen og bliver stående", () => {
    const resultat = vaelgMedTal(knae, { side: "venstre" }, "side", 2);
    expect(resultat).toEqual({ svar: {}, rykFrem: false });
  });

  it("ignorerer tal uden for valgene og tal i tekstfelter", () => {
    expect(vaelgMedTal(knae, {}, "side", 9)).toEqual({ svar: {}, rykFrem: false });
    expect(vaelgMedTal(knae, {}, "anamnese-tekst", 1)).toEqual({ svar: {}, rykFrem: false });
  });

  it("ignorerer tal i et felt, der ikke vises", () => {
    expect(vaelgMedTal(knae, {}, "traumemekanisme", 1)).toEqual({ svar: {}, rykFrem: false });
  });
});

describe("naboFelt (knæ)", () => {
  it("springer skjulte traumefelter over", () => {
    expect(naboFelt(knae, {}, "traume", 1)).toBe("alder"); // alder vises altid (C3)
    expect(naboFelt(knae, {}, "alder", 1)).toBe("belastning");
    expect(naboFelt(knae, { traume: "ja" }, "traume", 1)).toBe("traumemekanisme");
  });

  it("bliver stående i enderne og starter i første felt", () => {
    expect(naboFelt(knae, {}, "side", -1)).toBe("side");
    expect(naboFelt(knae, {}, "objektivt-tekst", 1)).toBe("objektivt-tekst");
    expect(naboFelt(knae, {}, undefined, 1)).toBe("side");
  });
});

describe("udfyldNormale (knæ)", () => {
  it("udfylder kun ubesvarede felter med normalfund og rører ikke anamnesen", () => {
    const svar = udfyldNormale(knae, { side: "hoejre", haevelse: "moderat" });
    expect(svar.haevelse).toBe("moderat");
    expect(svar.side).toBe("hoejre");
    expect(svar.debut).toBeUndefined();
    expect(svar.ledlinje).toBe("ingen");
    expect(bygNotat(knae, svar)).toBe("S: Højresidige knæsmerter.\nO: Moderat hævelse. Ingen ledlinjeømhed.");
  });

  it("sætter kun ledlinjeømhed i knæ – aldrig funktionsfund, flagfund eller samlet 'normal'-frase", () => {
    const svar = udfyldNormale(knae, {});
    expect(svar).toEqual({ ledlinje: "ingen" });
    expect(bygNotat(knae, svar)).not.toMatch(/i\.a\.|intet abnormt|normale forhold/i);
  });
});
