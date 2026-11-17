import { describe, expect, it } from "vitest";

import { knae } from "../indhold/knae";
import type { Svar } from "../indhold/typer";
import { foreneligeDiagnoser, planForslag } from "./forslag";
import { saetSvar, synligeSvar } from "./notat";
import { udfyldNormale } from "./tastatur";

// Tabeltest: "disse fund → disse diagnoser fremhæves som forenelige" og "valgt diagnose → disse planforslag".
// Lægen godkender tabellen; ændres betingelserne i indhold/knae.ts, fejler testen med scenariets navn.

const svar = (trin: [string, string][]): Svar =>
  synligeSvar(knae, trin.reduce<Svar>((s, [felt, v]) => saetSvar(knae, s, felt, felt === "smertested" ? [v] : v), {}));
const forenelige = (trin: [string, string][]) => foreneligeDiagnoser(knae, svar(trin)).map((d) => d.id).sort();

const TABEL: { navn: string; trin: [string, string][]; diagnoser: string[] }[] = [
  { navn: "tomt input", trin: [], diagnoser: [] },
  { navn: "ældre uden traume", trin: [["traume", "nej"], ["alder", "over55"]], diagnoser: ["diff-artrose"] },
  { navn: "51–55 år uden traume (kilden angiver ikke grænsen for 'ældre')", trin: [["traume", "nej"], ["alder", "51til55"]], diagnoser: [] },
  { navn: "medial ledlinjeømhed", trin: [["ledlinje", "medial"]], diagnoser: ["diff-artrose", "diff-menisk"] },
  { navn: "lateral ledlinjeømhed", trin: [["ledlinje", "lateral"]], diagnoser: ["diff-artrose", "diff-menisk", "diff-tendinopati"] },
  { navn: "voksen med låsning", trin: [["alder", "18til50"], ["laasning", "ja"]], diagnoser: ["diff-menisk"] },
  { navn: "15-årig med låsning", trin: [["alder", "12til17"], ["laasning", "ja"]], diagnoser: ["diff-henfoert", "diff-menisk", "diff-ocd"] },
  { navn: "vridtraume med knæk og straks hævelse", trin: [["traume", "ja"], ["traumemekanisme", "vrid"], ["haevelse-straks", "ja"], ["knaek", "ja"]], diagnoser: ["diff-acl"] },
  { navn: "traume og instabilitet", trin: [["traume", "ja"], ["stabilitet", "instabil"]], diagnoser: ["diff-acl", "diff-mcl"] },
  { navn: "feber alene", trin: [["feber", "ja"]], diagnoser: ["diff-bakteriel-artrit"] },
  { navn: "rødme og varme uden hævelse", trin: [["roedme", "ja"], ["varme", "ja"]], diagnoser: ["diff-bursit"] },
  { navn: "rødme, varme og moderat hævelse", trin: [["roedme", "ja"], ["varme", "ja"], ["haevelse", "moderat"]], diagnoser: ["diff-bakteriel-artrit", "diff-bursit"] },
  { navn: "barn under 12", trin: [["alder", "under12"]], diagnoser: ["diff-henfoert"] },
  { navn: "smerter fortil, intet traume", trin: [["smertested", "fortil"], ["traume", "nej"]], diagnoser: ["diff-patellofemoralt", "diff-tendinopati"] },
  { navn: "smerter fortil efter traume", trin: [["smertested", "fortil"], ["traume", "ja"]], diagnoser: ["diff-patellofemoralt"] },
  { navn: "13-årig, smerter fortil, intet traume", trin: [["smertested", "fortil"], ["traume", "nej"], ["alder", "12til17"]], diagnoser: ["diff-apofysit", "diff-henfoert", "diff-patellofemoralt", "diff-tendinopati"] },
  { navn: "smerter i knæhasen", trin: [["smertested", "bagtil"]], diagnoser: ["diff-baker"] },
  { navn: "smerter lateralt, intet traume", trin: [["smertested", "lateralt"], ["traume", "nej"]], diagnoser: ["diff-tendinopati"] },
  { navn: "smerter medialt alene", trin: [["smertested", "medialt"]], diagnoser: [] },
  { navn: "smerter fortil med rødme", trin: [["smertested", "fortil"], ["roedme", "ja"]], diagnoser: ["diff-bursit", "diff-patellofemoralt"] }
];

describe.each(TABEL)("knæ, forenelige diagnoser: $navn", ({ trin, diagnoser }) => {
  it("fremhæver præcis de forventede diagnoser", () => {
    expect(forenelige(trin)).toEqual([...diagnoser].sort());
  });
});

describe("knæ: N skaber ingen diagnoseforslag", () => {
  it("normalfund alene fremhæver ingen diagnose", () => {
    expect(foreneligeDiagnoser(knae, synligeSvar(knae, udfyldNormale(knae, {})))).toEqual([]);
  });
});

describe("knæ: forslag til plan for valgt diagnose", () => {
  it("gonartrose: information/træning og analgetika; henvisninger kun til vurdering", () => {
    expect(planForslag(knae, svar([["traume", "nej"], ["alder", "over55"]]), ["diff-artrose"])).toEqual({
      forslag: ["beh-artrose-basis", "beh-artrose-medicin"],
      vurder: ["hen-non-traumatisk", "hen-artrose"]
    });
  });

  it("meniskskade uden aflåsning: fysioterapi; med aflåsning og svært nedsat bevægelighed også subakut henvisning", () => {
    expect(planForslag(knae, svar([["ledlinje", "medial"]]), ["diff-menisk"]).forslag).toEqual(["beh-menisk-fys"]);
    expect(planForslag(knae, svar([["laasning", "ja"], ["bevaegelighed", "svaert"]]), ["diff-menisk"]).forslag).toEqual([
      "beh-menisk-fys",
      "hen-aflaast"
    ]);
  });

  it("forreste korsbånd: træning; akut henvisning kun ved løshed, stor ansamling eller manglende strakt benløft", () => {
    expect(planForslag(knae, svar([["traume", "ja"], ["knaek", "ja"]]), ["diff-acl"]).forslag).toEqual(["beh-acl"]);
    expect(planForslag(knae, svar([["traume", "ja"], ["stabilitet", "instabil"]]), ["diff-acl"]).forslag).toEqual([
      "beh-acl",
      "hen-akut-traume"
    ]);
  });

  it("bakteriel artrit med feber: akut indlæggelse foreslås", () => {
    expect(planForslag(knae, svar([["feber", "ja"]]), ["diff-bakteriel-artrit"]).forslag).toEqual(["hen-septisk"]);
  });
});
