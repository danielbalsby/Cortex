import { describe, expect, it } from "vitest";

import { ankel } from "../indhold/ankel";
import { knae } from "../indhold/knae";
import { ryg } from "../indhold/ryg";
import { skulder } from "../indhold/skulder";
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

describe("bygNotat med valgte punkter (knæ)", () => {
  it("skriver valgte diagnoser under V og behandling/henvisning under P i indholdsfilens rækkefølge", () => {
    const svar = vaelg({}, "side", "hoejre");
    const notat = bygNotat(knae, svar, ["hen-menisk", "diff-menisk", "beh-menisk-fys"]);
    expect(notat).toBe(
      "S: Højresidige knæsmerter.\nV: Foreneligt med meniskrelaterede gener.\nP: Henvist til fysioterapi som initial behandling. Henvist til ortopædkirurgisk vurdering mhp. menisklæsion."
    );
  });

  it("skriver intet, når kun ukendte eller ingen punkter er valgt", () => {
    expect(bygNotat(knae, {}, [])).toBe("");
    expect(bygNotat(knae, {}, ["findes-ikke"])).toBe("");
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

describe("bygNotat (ankel)", () => {
  it("giver tomt notat, når intet er valgt", () => {
    expect(bygNotat(ankel, {})).toBe("");
  });

  it("skriver Ottawa-relevante fund i notatet", () => {
    let svar: Svar = {};
    svar = saetSvar(ankel, svar, "side", "venstre");
    svar = saetSvar(ankel, svar, "mekanisme", "inversion");
    svar = saetSvar(ankel, svar, "skridt-straks", "ja");
    svar = saetSvar(ankel, svar, "malleol", "ingen");
    expect(bygNotat(ankel, svar)).toBe(
      "S: Venstresidige ankelsmerter. Indadvridningstraume (inversion). Kunne gå fire vægtbærende skridt umiddelbart efter skaden.\nO: Ingen knogleømhed over malleolerne."
    );
  });
});

describe("bygNotat (skulder)", () => {
  it("giver tomt notat, når intet er valgt", () => {
    expect(bygNotat(skulder, {})).toBe("");
  });

  it("viser og rydder traumefelter afhængigt af debut", () => {
    let svar: Svar = {};
    svar = saetSvar(skulder, svar, "debut", "traume");
    svar = saetSvar(skulder, svar, "traumetype", "luksation");
    svar = saetSvar(skulder, svar, "axillaris", "normal");
    expect(bygNotat(skulder, svar)).toBe(
      "S: Opstået efter traume. Skulderen var ude af led.\nO: Normal sensibilitet lateralt på skulderen."
    );
    svar = saetSvar(skulder, svar, "debut", "spontan");
    expect(svar).toEqual({ debut: "spontan" });
  });
});

describe("bygNotat (lænderyg)", () => {
  it("giver tomt notat, når intet er valgt", () => {
    expect(bygNotat(ryg, {})).toBe("");
  });

  it("N udfylder ikke rektaleksploration", async () => {
    const { udfyldNormale } = await import("./tastatur");
    const svar = udfyldNormale(ryg, saetSvar(ryg, {}, "cauda", "ja"));
    expect(svar.rektal).toBeUndefined();
    expect(svar.lasegue).toBe("neg");
  });

  it("rydder udstrålingsfelter, når udbredningen ændres", () => {
    let svar: Svar = {};
    svar = saetSvar(ryg, svar, "udbredning", "underknae");
    svar = saetSvar(ryg, svar, "udstraalingsside", "venstre");
    expect(bygNotat(ryg, svar)).toBe("S: Udstrålende smerter distalt for knæet. Udstråling i venstre ben.");
    svar = saetSvar(ryg, svar, "udbredning", "laend");
    expect(svar).toEqual({ udbredning: "laend" });
  });
});
