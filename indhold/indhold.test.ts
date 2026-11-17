import { describe, expect, it } from "vitest";

import { eksempel } from "./eksempel";
import { INDHOLD } from "./index";
import type { Betingelse, Kildebelagt, Region } from "./typer";

// Kontrollerer, at indholdsfilerne hænger sammen. Fejler denne test efter en
// rettelse i en indholdsfil, fortæller fejlteksten hvilket id der er galt.

const regioner = [...Object.values(INDHOLD), eksempel].filter((region): region is Region => Boolean(region));
// Låser hvilke fund N-genvejen må sætte pr. region. Kun fund, der normalt afgøres ved
// inspektion/palpation, og som ikke indgår i en flagbetingelse eller beslutningsregel.
// Ændring kræver bevidst rettelse her OG klinisk vurdering (se docs/ux-review/rapport.md).
const N_FUND: Record<string, string[]> = {
  knae: ["ledlinje"],
  skulder: [],
  albue: ["epikondyl"],
  ryg: [],
  ankel: ["haevelse", "ledbaand"],
};
const DATO = /^\d{4}-\d{2}-\d{2}$/;

function unikke(ider: string[], hvad: string) {
  const dubletter = ider.filter((id, index) => ider.indexOf(id) !== index);
  expect(dubletter, `dubletter i ${hvad}`).toEqual([]);
}

describe.each(regioner)("indhold: $navn", (region) => {
  const felter = region.grupper.flatMap((gruppe) => gruppe.felter);
  const feltIder = felter.map((felt) => felt.id);

  function tjekBetingelser(betingelser: Betingelse[] | undefined, hvor: string) {
    for (const betingelse of betingelser ?? []) {
      const felt = felter.find((item) => item.id === betingelse.felt);
      expect(felt, `${hvor}: ukendt felt "${betingelse.felt}"`).toBeDefined();
      expect(
        felt?.valg?.some((valg) => valg.id === betingelse.er),
        `${hvor}: feltet "${betingelse.felt}" har ikke valget "${betingelse.er}"`
      ).toBe(true);
    }
  }

  it("har unikke felt-id'er og unikke valg i hvert felt", () => {
    unikke(feltIder, "felt-id'er");
    for (const felt of felter) unikke((felt.valg ?? []).map((valg) => valg.id), `valg i "${felt.id}"`);
  });

  it("har valg med notattekst i alle valgfelter og højst ét normalfund", () => {
    for (const felt of felter) {
      if (felt.type === "tekst") continue;
      expect(felt.valg?.length, `"${felt.id}" mangler valg`).toBeGreaterThan(0);
      for (const valg of felt.valg ?? []) {
        expect(valg.notat.trim(), `"${felt.id}/${valg.id}" mangler notattekst`).not.toBe("");
      }
      const normale = (felt.valg ?? []).filter((valg) => valg.normal);
      expect(normale.length, `"${felt.id}" har flere normalfund`).toBeLessThanOrEqual(1);
    }
  });

  it("N-genvejen sætter kun de fund, der er låst for regionen", () => {
    const nFund = felter.filter((felt) => (felt.valg ?? []).some((valg) => valg.normal)).map((felt) => felt.id);
    if (region.id in N_FUND) expect(nFund.sort()).toEqual([...N_FUND[region.id]].sort());
    else expect(nFund, "ny region uden låst N-liste").toEqual([]);
  });

  it("har visHvis-betingelser, der peger på eksisterende felter og valg", () => {
    for (const felt of felter) tjekBetingelser(felt.visHvis, `visHvis i "${felt.id}"`);
  });

  it("har en notatskabelon, hvor hvert felt indgår præcis én gang (undtagen felter kun til flag)", () => {
    const iNotat = region.notat.flatMap((afsnit) => afsnit.felter);
    unikke(iNotat, "notatskabelonen");
    const skalINotat = felter.filter((felt) => !felt.kunTilFlag).map((felt) => felt.id);
    expect([...iNotat].sort()).toEqual([...skalINotat].sort());
    for (const felt of felter.filter((item) => item.kunTilFlag)) {
      const brugt = region.roedeFlag.some((flag) => (flag.fremhaevHvis ?? []).flat().some((b) => b.felt === felt.id));
      expect(brugt, `"${felt.id}" er kun til flag, men fremhæver intet flag`).toBe(true);
    }
  });

  it("har kilder med årstal, adresse og tjekdato", () => {
    unikke(region.kilder.map((kilde) => kilde.id), "kilde-id'er");
    for (const kilde of region.kilder) {
      expect(kilde.url, `kilde "${kilde.id}"`).toMatch(/^https:\/\//);
      expect(kilde.sidstTjekket, `kilde "${kilde.id}"`).toMatch(DATO);
      expect(kilde.aar, `kilde "${kilde.id}"`).toBeGreaterThan(1990);
    }
  });

  it("har kliniske punkter med gyldige kilder og korrekt status", () => {
    const kildeIder = region.kilder.map((kilde) => kilde.id);
    const punkter: (Kildebelagt & { id: string })[] = [
      ...region.roedeFlag,
      ...region.differentialdiagnoser,
      ...region.behandling,
      ...region.henvisning
    ];
    unikke(punkter.map((punkt) => punkt.id), "kliniske punkter");

    for (const punkt of punkter) {
      for (const id of [...punkt.kilder, ...(punkt.konflikt?.kilder ?? [])]) {
        expect(kildeIder, `"${punkt.id}" henviser til ukendt kilde "${id}"`).toContain(id);
      }
      if (punkt.status === "GODKENDT") {
        expect(punkt.kilder.length, `"${punkt.id}" er GODKENDT uden kilde`).toBeGreaterThan(0);
        expect(punkt.godkendtDato ?? "", `"${punkt.id}" er GODKENDT uden dato`).toMatch(DATO);
      } else {
        expect(punkt.godkendtDato, `"${punkt.id}" er UDKAST, men har godkendtDato`).toBeUndefined();
      }
    }

    for (const punkt of [...region.differentialdiagnoser, ...region.behandling, ...region.henvisning]) {
      expect(punkt.notat.trim(), `"${punkt.id}" mangler notattekst`).not.toBe("");
    }
    for (const flag of region.roedeFlag) {
      for (const gruppe of flag.fremhaevHvis ?? []) tjekBetingelser(gruppe, `fremhaevHvis i "${flag.id}"`);
    }
    // Et valg i et felt med røde flag skal kunne fremhæve mindst ét rødt flag.
    const fremhaevende = new Set(
      region.roedeFlag.flatMap((flag) => (flag.fremhaevHvis ?? []).flat().map((b) => `${b.felt}=${b.er}`))
    );
    for (const felt of felter.filter((item) => item.id === "roedeflag")) {
      for (const valg of felt.valg ?? []) {
        expect(fremhaevende.has(`${felt.id}=${valg.id}`), `"${valg.label}" fremhæver intet rødt flag`).toBe(true);
      }
    }
    const diffIder = region.differentialdiagnoser.map((diff) => diff.id);
    for (const behandling of region.behandling) {
      for (const id of behandling.gaelderFor ?? []) {
        expect(diffIder, `"${behandling.id}" gælder for ukendt diagnose "${id}"`).toContain(id);
      }
    }
    // Forslag: betingelser skal pege på eksisterende felter og valg; forslag skal pege på eksisterende diagnoser.
    for (const diff of region.differentialdiagnoser) {
      for (const gruppe of diff.foreneligHvis ?? []) tjekBetingelser(gruppe, `foreneligHvis i "${diff.id}"`);
    }
    for (const behandling of region.behandling) {
      for (const id of behandling.forslagVed ?? []) {
        expect(behandling.gaelderFor ?? [], `"${behandling.id}" foreslås ved "${id}", men gælder ikke for den`).toContain(id);
      }
    }
    for (const henvisning of region.henvisning) {
      for (const id of [...(henvisning.gaelderFor ?? []), ...(henvisning.forslagVed ?? [])]) {
        expect(diffIder, `"${henvisning.id}" henviser til ukendt diagnose "${id}"`).toContain(id);
      }
      for (const gruppe of henvisning.foreslaaHvis ?? []) tjekBetingelser(gruppe, `foreslaaHvis i "${henvisning.id}"`);
      if (henvisning.forslagVed?.length)
        expect(henvisning.foreslaaHvis?.length ?? 0, `"${henvisning.id}" har forslagVed uden foreslaaHvis`).toBeGreaterThan(0);
    }
  });
});

describe("kilder på tværs af regioner", () => {
  it("har samme oplysninger, når samme kilde-id bruges i flere regioner", () => {
    const set = new Map<string, string>();
    for (const region of regioner) {
      for (const kilde of region.kilder) {
        const tekst = JSON.stringify(kilde);
        const tidligere = set.get(kilde.id);
        if (tidligere) expect(tekst, `kilden "${kilde.id}" er forskellig i ${region.navn} – flyt den til faelles.ts`).toBe(tidligere);
        else set.set(kilde.id, tekst);
      }
    }
  });
});
