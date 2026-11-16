import { describe, expect, it } from "vitest";

import { INDHOLD } from "../../indhold";
import type { Region, Svar } from "../../indhold/typer";
import { flagStatus } from "../../lib/flag";
import { alleFelter, bygNotat, erSynligt, saetSvar } from "../../lib/notat";
import { CASES, type Case } from "./cases";

// Regressionstest: kører hver fiktiv konsultation gennem den samme logik som appen
// og sammenligner med et læsbart snapshot i snapshots/<id>.md.
// Opdater bevidst med: npx vitest run --config review/vitest.config.ts -u

const STATUSTEKST = { matcher: "MATCHER", "ikke-vurderet": "ikke vurderet", "ikke-opfyldt": "ikke opfyldt af registreret", "uden-betingelse": "(ingen betingelse)" };

function koer(c: Case, region: Region): Svar {
  const felter = new Map(alleFelter(region).map((felt) => [felt.id, felt]));
  let svar: Svar = {};
  for (const [feltId, vaerdi] of c.trin) {
    const felt = felter.get(feltId);
    if (!felt) throw new Error(`${c.id}: ukendt felt ${feltId}`);
    if (!erSynligt(felt, svar)) throw new Error(`${c.id}: felt ${feltId} er ikke synligt, når det klikkes`);
    for (const v of Array.isArray(vaerdi) ? vaerdi : felt.type === "tekst" ? [] : [vaerdi])
      if (!felt.valg?.some((valg) => valg.id === v)) throw new Error(`${c.id}: ukendt valg ${feltId}=${v}`);
    svar = saetSvar(region, svar, feltId, vaerdi);
  }
  return svar;
}

function rapport(c: Case, region: Region): string {
  const svar = koer(c, region);
  const valgte = c.valgte ?? [];
  for (const id of valgte)
    if (![...region.differentialdiagnoser, ...region.behandling, ...region.henvisning].some((p) => p.id === id))
      throw new Error(`${c.id}: ukendt punkt ${id}`);
  const flag = region.roedeFlag.map((f) => ({ f, s: flagStatus(f, svar) }));
  const titel = (t: string) => (t.indexOf(": ") > 0 ? t.slice(0, t.indexOf(": ")) : t.slice(0, 70));
  return [
    `# ${c.id}`,
    "",
    `**${c.titel}** (${c.type})`,
    "",
    "## Input",
    "",
    ...c.trin.map(([f, v]) => `- ${f} = ${Array.isArray(v) ? v.join(", ") : v}`),
    ...(valgte.length ? ["", `Afkrydset (V/P): ${valgte.join(", ")}`] : []),
    "",
    "## Notat",
    "",
    "```",
    bygNotat(region, svar, valgte) || "(tomt)",
    "```",
    "",
    `## Røde flag (${flag.length}, alle vises altid)`,
    "",
    ...flag
      .sort((a, b) => Number(b.s === "matcher") - Number(a.s === "matcher"))
      .map(({ f, s }) => `- [${STATUSTEKST[s]}] ${titel(f.tekst)} (${f.id}, ${f.status})`),
    "",
    `## Differentialdiagnoser (${region.differentialdiagnoser.length}, statisk liste)`,
    "",
    ...region.differentialdiagnoser.map((d) => `- ${valgte.includes(d.id) ? "[V] " : ""}${d.navn} (${d.id})`),
    "",
    `## Henvisning (${region.henvisning.length}, statisk liste)`,
    "",
    ...region.henvisning.map((h) => `- ${valgte.includes(h.id) ? "[P] " : ""}${h.til}${h.hast ? ` · ${h.hast}` : ""} (${h.id})`),
    ""
  ].join("\n");
}

describe.each(CASES)("$id", (c) => {
  it("output svarer til snapshot", async () => {
    const region = INDHOLD[c.region];
    if (!region) throw new Error(`ukendt region ${c.region}`);
    await expect(rapport(c, region)).toMatchFileSnapshot(`snapshots/${c.id}.md`);
  });
});

it("mindst 3 cases pr. region, heraf mindst ét rødt flag og én ukompliceret", () => {
  for (const r of ["skulder", "albue", "ryg", "knae", "ankel"]) {
    const cs = CASES.filter((c) => c.region === r);
    expect(cs.length, r).toBeGreaterThanOrEqual(3);
    expect(cs.some((c) => c.type.startsWith("rødt flag")), r).toBe(true);
    expect(cs.some((c) => c.type === "ukompliceret"), r).toBe(true);
  }
});
