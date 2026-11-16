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
    trin: [["traume", "ja"], ["traumemekanisme", "vrid"], ["haevelse-straks", "ja"], ["alder", "12til50"], ["haevelse", "moderat"], ["stabilitet", "instabil"], ["skridt", "ja"]] },
  { navn: "Knæ B: gradvise mediale smerter i måneder", region: "knae", flag: [],
    trin: [["debut", "gradvis"], ["varighed", "maaneder"], ["traume", "nej"], ["ledlinje", "medial"]] },
  { navn: "Knæ C: akut, feber, rødme, varme", region: "knae", flag: ["flag-bakteriel-artrit", "flag-septisk-bursit"],
    trin: [["debut", "akut"], ["varighed", "dage"], ["traume", "nej"], ["feber", "ja"], ["roedme", "ja"], ["varme", "ja"]] },
  { navn: "Knæ D: barn under 12, gradvis, intet traume", region: "knae", flag: ["flag-boern"],
    trin: [["debut", "gradvis"], ["traume", "nej"], ["alder", "under12"]] },
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

  { navn: "Ryg hverdag: akutte lændesmerter", region: "ryg", flag: [],
    trin: [["udbredning", "laend"], ["debut", "akut"], ["tidligere", "lignende"], ["cauda", "nej"], ["lasegue", "neg"], ["kraft", "normal"]] },
  { navn: "Ryg tidskritisk: cauda equina", region: "ryg", flag: ["flag-cauda"],
    trin: [["udbredning", "underknae"], ["cauda", "ja"], ["sensibilitet", "ridebukse"]] },

  { navn: "Ankel hverdag: distorsion uden knogleømhed", region: "ankel", flag: [],
    trin: [["mekanisme", "inversion"], ["skridt-straks", "ja"], ["skridt-nu", "ja"], ["malleol", "ingen"], ["mellemfod", "ingen"], ["ledbaand", "oem"]] },
  { navn: "Ankel tidskritisk: Ottawa positiv (lateral malleol)", region: "ankel", flag: ["flag-fraktur"],
    trin: [["mekanisme", "inversion"], ["malleol", "lateral"]] },
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
