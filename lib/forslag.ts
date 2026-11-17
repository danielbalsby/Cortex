import type { Betingelse, Region, Svar } from "../indhold/typer";
import { betingelsesStatus } from "./flag";
import { alleFelter, passer } from "./notat";

// Beslutningsstøtte som forslag. Lægen vurderer og har det fulde ansvar.
// - Forenelige diagnoser: de differentialdiagnoser, hvis kildebelagte betingelser passer med de
//   registrerede fund. Indholdsfilens rækkefølge bevares; der tælles, scores og rangeres ikke,
//   og en diagnose, der ikke fremhæves, er ikke udelukket.
// - Forslag til plan: for de diagnoser, lægen selv har valgt (V). Intet kommer i notatet,
//   før lægen trykker – ét tryk tager forslagene med.

export type ForeneligDiagnose = { id: string; navn: string; passerMed: string[] };

/** Lægens egne fund, som en betingelse refererer til, skrevet som "Felt: Valg". */
function fundTekst(region: Region, betingelse: Betingelse): string {
  const felt = alleFelter(region).find((f) => f.id === betingelse.felt);
  const valg = felt?.valg?.find((v) => v.id === betingelse.er);
  return `${felt?.label ?? betingelse.felt}: ${valg?.label ?? betingelse.er}`;
}

export function foreneligeDiagnoser(region: Region, svar: Svar): ForeneligDiagnose[] {
  return region.differentialdiagnoser
    .filter((diff) => betingelsesStatus(diff.foreneligHvis, svar) === "matcher")
    .map((diff) => ({
      id: diff.id,
      navn: diff.navn,
      passerMed: [
        ...new Set(
          (diff.foreneligHvis ?? [])
            .filter((gruppe) => gruppe.length > 0 && passer(gruppe, svar))
            .flat()
            .map((b) => fundTekst(region, b))
        )
      ]
    }));
}

export type PlanForslag = {
  /** Behandling og henvisning, som ét tryk tager med i P (dem, der allerede er valgt, er udeladt). */
  forslag: string[];
  /** Henvisninger, der hører til de valgte diagnoser, men kun vises med deres kriterier. */
  vurder: string[];
};

export function planForslag(region: Region, svar: Svar, valgte: readonly string[]): PlanForslag {
  const diagnoser = region.differentialdiagnoser.filter((d) => valgte.includes(d.id)).map((d) => d.id);
  const ved = (ids: string[] | undefined) => (ids ?? []).some((id) => diagnoser.includes(id));
  const behandling = region.behandling.filter((b) => ved(b.forslagVed)).map((b) => b.id);
  const henvisning = region.henvisning
    .filter((h) => ved(h.forslagVed) && betingelsesStatus(h.foreslaaHvis, svar) === "matcher")
    .map((h) => h.id);
  const forslag = [...behandling, ...henvisning];
  const vurder = region.henvisning
    .filter((h) => (ved(h.gaelderFor) || ved(h.forslagVed)) && !forslag.includes(h.id))
    .map((h) => h.id);
  return { forslag: forslag.filter((id) => !valgte.includes(id)), vurder };
}
