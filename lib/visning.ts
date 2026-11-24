import type { Behandling, Henvisning, Region } from "../indhold/typer";

// Hvad beslutningsstøtten viser fremme, og hvad der ligger sammenfoldet (progressive disclosure).
// Ren visning: intet punkt fjernes, ændres eller rangeres – alt kan foldes ud, og
// indholdsfilens rækkefølge bevares inden for hver gruppe.

export type Delt<T> = { naer: T[]; oevrige: T[] };

export type PlanVisning = {
  /** De diagnoser, lægen har valgt (V), i indholdsfilens rækkefølge. */
  diagnoser: string[];
  behandling: Delt<Behandling>;
  henvisning: Delt<Henvisning>;
};

/**
 * Fremme ("naer") står:
 * - alt, lægen allerede har valgt til notatet (et valgt punkt ligger aldrig sammenfoldet),
 * - når en diagnose er valgt: behandling og henvisning, der hører til den (gaelderFor/forslagVed),
 *   samt generel behandling (uden gaelderFor).
 * Uden valgt diagnose står kun de valgte punkter fremme. Resten ligger under "øvrige".
 * Generelle henvisninger (uden gaelderFor) ligger under "øvrige"; de akutte veje følger
 * de røde flag, som altid vises med deres handling.
 */
export function planVisning(region: Region, valgte: readonly string[]): PlanVisning {
  const diagnoser = region.differentialdiagnoser.filter((d) => valgte.includes(d.id)).map((d) => d.id);
  const hoerer = (ids: string[] | undefined) => (ids ?? []).some((id) => diagnoser.includes(id));
  const del = <T extends { id: string }>(punkter: T[], fremme: (p: T) => boolean): Delt<T> => ({
    naer: punkter.filter((p) => valgte.includes(p.id) || fremme(p)),
    oevrige: punkter.filter((p) => !valgte.includes(p.id) && !fremme(p))
  });
  const harDiagnose = diagnoser.length > 0;
  return {
    diagnoser,
    behandling: del(
      region.behandling,
      (b) => harDiagnose && (!b.gaelderFor?.length || hoerer(b.gaelderFor) || hoerer(b.forslagVed))
    ),
    henvisning: del(region.henvisning, (h) => harDiagnose && (hoerer(h.gaelderFor) || hoerer(h.forslagVed)))
  };
}

/**
 * Kort titel til en linje: teksten før første ": " (kolon med), ellers første sætning.
 * Ordlyden ændres ikke – resten af teksten vises, når punktet foldes ud.
 */
export function kortTitel(tekst: string): { titel: string; rest: string } {
  const kolon = tekst.indexOf(": ");
  if (kolon !== -1) return { titel: tekst.slice(0, kolon + 1), rest: tekst.slice(kolon + 2) };
  const punktum = tekst.search(/\. (?=[A-ZÆØÅ])/);
  if (punktum !== -1) return { titel: tekst.slice(0, punktum + 1), rest: tekst.slice(punktum + 2) };
  return { titel: tekst, rest: "" };
}
