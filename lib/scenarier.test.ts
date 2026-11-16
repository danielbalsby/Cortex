import { describe, expect, it } from "vitest";

import { INDHOLD } from "../indhold/index";
import type { Svar } from "../indhold/typer";
import { flagStatus } from "./flag";
import { saetSvar, synligeSvar } from "./notat";
import { udfyldNormale } from "./tastatur";

// Tabeltest: "disse fund → disse flag fremhæves". Lægen godkender tabellen; ændres
// fremhævningen i indholdsfilerne, fejler testen med scenariets navn.
// Knæ A–E er scenarierne fra docs/ux-review/01-faktagrundlag.md.

type Scenarie = { navn: string; region: string; trin: [string, string | string[]][]; flag: string[] };

const TABEL: Scenarie[] = [
  { navn: "Knæ A: vridtraume, straks hævelse, instabilitet", region: "knae", flag: ["flag-akut-ligamentskade"],
    trin: [["traume", "ja"], ["traumemekanisme", "vrid"], ["haevelse-straks", "ja"], ["alder", "18til50"], ["haevelse", "moderat"], ["stabilitet", "instabil"], ["skridt", "ja"]] },
  { navn: "Knæ B: gradvise mediale smerter i måneder", region: "knae", flag: [],
    trin: [["debut", "gradvis"], ["varighed", "maaneder"], ["traume", "nej"], ["ledlinje", "medial"]] },
  { navn: "Knæ C: akut, feber, rødme, varme", region: "knae", flag: ["flag-bakteriel-artrit", "flag-septisk-bursit"],
    trin: [["debut", "akut"], ["varighed", "dage"], ["traume", "nej"], ["feber", "ja"], ["roedme", "ja"], ["varme", "ja"]] },
  { navn: "Knæ D: barn under 12, gradvis, intet traume", region: "knae", flag: ["flag-boern"],
    trin: [["debut", "gradvis"], ["traume", "nej"], ["alder", "under12"]] },
  { navn: "Knæ: 12-årig uden traume → børneflag", region: "knae", flag: ["flag-boern"],
    trin: [["debut", "gradvis"], ["traume", "nej"], ["alder", "12til17"]] },
  { navn: "Knæ: 15-årig uden traume → børneflag", region: "knae", flag: ["flag-boern"],
    trin: [["debut", "gradvis"], ["varighed", "uger"], ["traume", "nej"], ["alder", "12til17"]] },
  { navn: "Knæ: 15-årig med traume → børneflag, men ikke fraktur (Pittsburgh: under 12)", region: "knae", flag: ["flag-boern"],
    trin: [["traume", "ja"], ["traumemekanisme", "vrid"], ["alder", "12til17"], ["skridt", "ja"]] },
  { navn: "Knæ: 30-årig med traume → hverken børneflag eller fraktur", region: "knae", flag: [],
    trin: [["traume", "ja"], ["traumemekanisme", "fald"], ["alder", "18til50"], ["skridt", "ja"]] },
  { navn: "Knæ E: vrid, låsning, svært nedsat bevægelighed", region: "knae", flag: ["flag-aflaast-knae"],
    trin: [["traume", "ja"], ["traumemekanisme", "vrid"], ["laasning", "ja"], ["bevaegelighed", "svaert"]] },
  { navn: "Knæ: traume, over 55 år → fraktur", region: "knae", flag: ["flag-fraktur"],
    trin: [["traume", "ja"], ["traumemekanisme", "fald"], ["alder", "over55"]] },
  { navn: "Knæ: over 55 år uden traume → ikke fraktur", region: "knae", flag: [],
    trin: [["traume", "nej"], ["alder", "over55"]] },

  { navn: "Skulder hverdag: impingement", region: "skulder", flag: [],
    trin: [["debut", "overbelastning"], ["varighed", "uger"], ["smertebue", "pos"], ["impingement", "pos"], ["kraft", "normal"]] },
  { navn: "Skulder tidskritisk: traume og nedsat udadrotationskraft", region: "skulder", flag: ["flag-traumatisk-cuff"],
    trin: [["alder", "40til75"], ["debut", "traume"], ["traumetype", "fald"], ["kraft", "udad"]] },
  { navn: "Skulder tidskritisk: luksation over 40 år", region: "skulder", flag: ["flag-luksation", "flag-cuff-efter-luksation"],
    trin: [["alder", "40til75"], ["debut", "traume"], ["traumetype", "luksation"]] },
  { navn: "Skulder tidskritisk: feber", region: "skulder", flag: ["flag-septisk"],
    trin: [["debut", "spontan"], ["feber", "ja"]] },

  { navn: "Albue hverdag: lateral epikondylit", region: "albue", flag: [],
    trin: [["debut", "overbelastning"], ["lokalisation", "lateral"], ["epikondyl", "lateral"], ["isometrisk", "ekstension"]] },
  { navn: "Albue tidskritisk: fald, nedsat ekstension", region: "albue", flag: ["flag-fraktur-luksation"],
    trin: [["debut", "traume"], ["mekanisme", "fald"], ["ekstensionstest", "nedsat"], ["neurovaskulaer", "normal"]] },

  { navn: "Albue: feber → septisk artrit", region: "albue", flag: ["flag-septisk"],
    trin: [["debut", "spontan"], ["feber", "ja"]] },
  { navn: "Albue: varm, hævet led → septisk artrit", region: "albue", flag: ["flag-septisk"],
    trin: [["debut", "spontan"], ["haevelse", "led"], ["varme", "ja"]] },

  { navn: "Albue: varme over bursa → septisk bursit (ikke septisk artrit)", region: "albue", flag: ["flag-septisk-bursit"],
    trin: [["debut", "spontan"], ["haevelse", "bursa"], ["varme", "ja"]] },

  { navn: "Ryg hverdag: akutte lændesmerter", region: "ryg", flag: [],
    trin: [["udbredning", "laend"], ["debut", "akut"], ["tidligere", "lignende"], ["cauda", "nej"], ["lasegue", "neg"], ["kraft", "normal"]] },
  { navn: "Ryg tidskritisk: cauda equina", region: "ryg", flag: ["flag-cauda"],
    trin: [["udbredning", "underknae"], ["cauda", "ja"], ["sensibilitet", "ridebukse"]] },

  // Lægens test 16.11.2026 (docs/TIL-DANIEL.md), præcis de fund, lægen beskrev:
  { navn: "Lægens test: albue Feber = Ja → septisk artrit", region: "albue", flag: ["flag-septisk"],
    trin: [["feber", "ja"]] },
  { navn: "Lægens test: albue Hævelse over olecranon + Varme = Ja → septisk bursit", region: "albue", flag: ["flag-septisk-bursit"],
    trin: [["haevelse", "bursa"], ["varme", "ja"]] },
  { navn: "Lægens test: knæ Traume = Nej + Alder 12–17 → børneflag, ikke fraktur", region: "knae", flag: ["flag-boern"],
    trin: [["traume", "nej"], ["alder", "12til17"]] },
  { navn: "Lægens test: ryg tidligere kræft + betydende parese → malignitet, cauda/parese og udbredte udfald", region: "ryg",
    flag: ["flag-malignitet", "flag-cauda", "flag-udbredte-udfald"],
    trin: [["roedeflag", "kraeft"], ["kraft", "betydende"]] },

  { navn: "Ankel hverdag: distorsion uden knogleømhed", region: "ankel", flag: [],
    trin: [["mekanisme", "inversion"], ["skridt-straks", "ja"], ["skridt-nu", "ja"], ["malleol", "ingen"], ["mellemfod", "ingen"], ["ledbaand", "oem"]] },
  { navn: "Ankel tidskritisk: Ottawa positiv (lateral malleol)", region: "ankel", flag: ["flag-fraktur"],
    trin: [["mekanisme", "inversion"], ["malleol", "lateral"]] },
  { navn: "Ankel: feber alene → akut artrit", region: "ankel", flag: ["flag-artrit"],
    trin: [["mekanisme", "andet"], ["feber", "ja"]] },
  { navn: "Ankel: rødme uden feber → akut artrit (feber er ikke et krav)", region: "ankel", flag: ["flag-artrit"],
    trin: [["mekanisme", "andet"], ["feber", "nej"], ["roedme", "ja"]] },
  { navn: "Ankel tidskritisk: smæld i læggen", region: "ankel", flag: ["flag-akilles"],
    trin: [["mekanisme", "smaeld"], ["akilles", "positiv"]] }
];

function koer(s: Scenarie): Svar {
  const region = INDHOLD[s.region]!;
  return s.trin.reduce<Svar>((svar, [felt, v]) => saetSvar(region, svar, felt, v), {});
}

describe.each(TABEL)("$navn", (s) => {
  it("fremhæver præcis de forventede flag", () => {
    const region = INDHOLD[s.region]!;
    const svar = synligeSvar(region, koer(s));
    const matcher = region.roedeFlag.filter((f) => flagStatus(f, svar) === "matcher").map((f) => f.id);
    expect(matcher.sort()).toEqual([...s.flag].sort());
  });

  it("N ændrer ikke, hvilke flag der fremhæves, og overskriver intet registreret fund", () => {
    const region = INDHOLD[s.region]!;
    const foer = koer(s);
    const efter = udfyldNormale(region, foer);
    for (const [k, v] of Object.entries(foer)) expect(efter[k]).toEqual(v);
    const m = (svar: Svar) => region.roedeFlag.filter((f) => flagStatus(f, synligeSvar(region, svar)) === "matcher").map((f) => f.id);
    expect(m(efter)).toEqual(m(foer));
  });
});

describe("Lægens test 16.11.2026: lænderyg, henvisning", () => {
  it('"Akutmodtagelse" (akut) og "Pakkeforløb" (subakut) er to særskilte punkter', () => {
    const h = INDHOLD.ryg!.henvisning;
    const inf = h.find((p) => p.id === "hen-infektion")!;
    const mal = h.find((p) => p.id === "hen-malignitet")!;
    expect([inf.til, inf.hast]).toEqual(["Akutmodtagelse", "akut"]);
    expect([mal.til, mal.hast]).toEqual(["Pakkeforløb", "subakut"]);
  });
});
