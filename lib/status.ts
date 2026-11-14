import type { Kildebelagt, Region } from "../indhold/typer";

export type Optaelling = {
  punkter: number;
  udkast: number;
  kildeMangler: number;
  konflikter: number;
  aeldsteTjek: string | undefined; // ældste "sidstTjekket" blandt regionens kilder
};

export function kliniskePunkter(region: Region): Kildebelagt[] {
  return [...region.roedeFlag, ...region.differentialdiagnoser, ...region.behandling, ...region.henvisning];
}

/** Tal til statuslinjen: hvor meget af regionens indhold er udkast eller uden kilde. */
export function optael(region: Region): Optaelling {
  const punkter = kliniskePunkter(region);
  const datoer = region.kilder.map((kilde) => kilde.sidstTjekket).sort();
  return {
    punkter: punkter.length,
    udkast: punkter.filter((punkt) => punkt.status === "UDKAST").length,
    kildeMangler: punkter.filter((punkt) => punkt.kilder.length === 0).length,
    konflikter: punkter.filter((punkt) => punkt.konflikt).length,
    aeldsteTjek: datoer[0]
  };
}
