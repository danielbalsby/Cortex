import type { Betingelse, Kildebelagt, Region } from "../indhold/typer";
import { alleFelter } from "./notat";

/** "Felt = Valg" i klartekst, fx "Traume = Ja". Ukendte id'er vises råt. */
export function betingelseTekst(region: Region, betingelse: Betingelse): string {
  const felt = alleFelter(region).find((item) => item.id === betingelse.felt);
  const valg = felt?.valg?.find((item) => item.id === betingelse.er);
  return `${felt?.label ?? betingelse.felt} = ${valg?.label ?? betingelse.er}`;
}

/** Fremhævningsbetingelser i klartekst: grupper adskilt af "ELLER", betingelser i en gruppe af "og". */
export function fremhaevTekst(region: Region, grupper: Betingelse[][] | undefined): string {
  if (!grupper?.length) return "Fremhæves aldrig (vises altid uændret)";
  return grupper.map((gruppe) => gruppe.map((b) => betingelseTekst(region, b)).join(" og ")).join("  ELLER  ");
}

export type KonfliktLinje = { id: string; type: string; titel: string; punkt: Kildebelagt };

/** Alle punkter med navngiven konflikt i en region, uanset type. */
export function konflikter(region: Region): KonfliktLinje[] {
  const linjer: KonfliktLinje[] = [];
  for (const flag of region.roedeFlag) if (flag.konflikt) linjer.push({ id: flag.id, type: "Rødt flag", titel: flag.tekst, punkt: flag });
  for (const diff of region.differentialdiagnoser) if (diff.konflikt) linjer.push({ id: diff.id, type: "Differentialdiagnose", titel: diff.navn, punkt: diff });
  for (const beh of region.behandling) if (beh.konflikt) linjer.push({ id: beh.id, type: "Behandling", titel: beh.tekst, punkt: beh });
  for (const hen of region.henvisning) if (hen.konflikt) linjer.push({ id: hen.id, type: "Henvisning", titel: hen.til, punkt: hen });
  return linjer;
}
