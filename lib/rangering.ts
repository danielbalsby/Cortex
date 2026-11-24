import type { Betingelse, Fundvaegt, Region, Svar } from "../indhold/typer";
import { alleFelter, passer } from "./notat";

// Rangering af differentialdiagnoser efter, hvor stærkt de registrerede fund taler for dem.
// Beslutningsstøtte, ikke en afgørelse. Det er bevidst IKKE en sandsynlighed:
// - kun kildernes likelihood ratios (Fundvaegt.lr) indgår – ingen egne vægte eller skøn,
// - forekomsten i almen praksis (prætest-sandsynlighed) indgår ikke; kilderne giver den sjældent,
// - fund i samme klynge tæller kun med det stærkeste; fund i forskellige klynger ganges
//   (antaget uafhængige – en kendt forenkling, som vises i panelet),
// - en diagnose uden fund-data rangeres ikke, og ingen diagnose skjules eller udelukkes.

export type Bidrag = { fund: string; lr: number; kilder: string[]; population?: string };

export type Rangeret = {
  id: string;
  navn: string;
  /** Produktet af de tællende LR'er. Kun til rækkefølgen; vises ikke som tal. */
  samlet: number;
  for: Bidrag[]; // LR > 1, stærkeste først
  imod: Bidrag[]; // LR < 1, stærkeste først
};

/** Lægens fund skrevet som "Felt: Valg" (samme form som forenelige diagnoser). */
function fundTekst(region: Region, betingelser: Betingelse[]): string {
  return betingelser
    .map((b) => {
      const felt = alleFelter(region).find((f) => f.id === b.felt);
      const valg = felt?.valg?.find((v) => v.id === b.er);
      return `${felt?.label ?? b.felt}: ${valg?.label ?? b.er}`;
    })
    .join(" + ");
}

const styrke = (lr: number) => Math.abs(Math.log(lr));

/** De fund, der tæller: dem, der passer med svarene, og kun det stærkeste pr. klynge. */
export function taellendeFund(fund: readonly Fundvaegt[], svar: Svar): Fundvaegt[] {
  const passende = fund.filter((f) => f.hvis.length > 0 && f.lr > 0 && passer(f.hvis, svar));
  const valgt = new Map<string, Fundvaegt>();
  passende.forEach((f, i) => {
    const noegle = f.klynge ?? `#${i}`;
    const tidligere = valgt.get(noegle);
    if (!tidligere || styrke(f.lr) > styrke(tidligere.lr)) valgt.set(noegle, f);
  });
  return [...valgt.values()];
}

/**
 * Diagnoser, som fundene samlet taler for (produkt af LR > 1), stærkeste først.
 * Ligestilling bevarer indholdsfilens rækkefølge. Diagnoser, fundene samlet taler imod,
 * eller som ikke har fund-data, er ikke med – de står uændret på den fulde liste.
 */
export function rangering(region: Region, svar: Svar): Rangeret[] {
  return region.differentialdiagnoser
    .map((diff, orden) => {
      const taeller = taellendeFund(diff.fund ?? [], svar);
      const bidrag = (f: Fundvaegt): Bidrag => ({
        fund: fundTekst(region, f.hvis),
        lr: f.lr,
        kilder: f.kilder,
        ...(f.population ? { population: f.population } : {})
      });
      const sorter = (a: Fundvaegt, b: Fundvaegt) => styrke(b.lr) - styrke(a.lr);
      return {
        orden,
        id: diff.id,
        navn: diff.navn,
        samlet: taeller.reduce((p, f) => p * f.lr, 1),
        for: taeller.filter((f) => f.lr > 1).sort(sorter).map(bidrag),
        imod: taeller.filter((f) => f.lr < 1).sort(sorter).map(bidrag)
      };
    })
    .filter((r) => r.for.length > 0 && r.samlet > 1)
    .sort((a, b) => b.samlet - a.samlet || a.orden - b.orden)
    .map(({ orden: _orden, ...r }) => r);
}

/** "LR 10" / "LR 0,4" – dansk decimaltegn, højst to betydende cifre under 10. */
export function lrTekst(lr: number): string {
  const tal = lr >= 10 ? Math.round(lr).toString() : String(Number(lr.toPrecision(2)));
  return `LR ${tal.replace(".", ",")}`;
}
