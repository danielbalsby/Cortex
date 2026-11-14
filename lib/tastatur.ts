import type { Felt, Region, Svar } from "../indhold/typer";
import { alleFelter, erSynligt, saetSvar } from "./notat";

export function synligeFelter(region: Region, svar: Svar): Felt[] {
  return alleFelter(region).filter((felt) => erSynligt(felt, svar));
}

/** Feltet før/efter det aktive blandt de synlige. Bliver stående i enderne. */
export function naboFelt(region: Region, svar: Svar, aktivId: string | undefined, retning: 1 | -1): string | undefined {
  const felter = synligeFelter(region, svar);
  if (felter.length === 0) return undefined;
  const index = felter.findIndex((felt) => felt.id === aktivId);
  if (index === -1) return felter[0].id;
  return felter[Math.min(felter.length - 1, Math.max(0, index + retning))].id;
}

/**
 * Tastetryk 1–9 i et valgfelt. Enkeltvalg: vælger og rykker frem; samme tal
 * igen fravælger og bliver stående. Flervalg: slår til/fra og bliver stående.
 */
export function vaelgMedTal(
  region: Region,
  svar: Svar,
  feltId: string,
  tal: number
): { svar: Svar; rykFrem: boolean } {
  const felt = alleFelter(region).find((item) => item.id === feltId);
  const valg = felt?.valg?.[tal - 1];
  if (!felt || !valg || felt.type === "tekst" || !erSynligt(felt, svar)) return { svar, rykFrem: false };

  const nu = svar[feltId];
  if (felt.type === "flere") {
    const valgte = Array.isArray(nu) ? nu : [];
    const naeste = valgte.includes(valg.id) ? valgte.filter((id) => id !== valg.id) : [...valgte, valg.id];
    return { svar: saetSvar(region, svar, feltId, naeste), rykFrem: false };
  }
  if (nu === valg.id) return { svar: saetSvar(region, svar, feltId, ""), rykFrem: false };
  return { svar: saetSvar(region, svar, feltId, valg.id), rykFrem: true };
}

/**
 * N-genvejen: udfylder normalfundet i de synlige felter, der har et
 * normalfund og endnu ikke er besvaret. Overskriver aldrig et eksisterende svar.
 */
export function udfyldNormale(region: Region, svar: Svar): Svar {
  let naeste = svar;
  for (const felt of alleFelter(region)) {
    const normal = felt.valg?.find((valg) => valg.normal);
    if (!normal || felt.id in naeste || !erSynligt(felt, naeste)) continue;
    naeste = saetSvar(region, naeste, felt.id, felt.type === "flere" ? [normal.id] : normal.id);
  }
  return naeste;
}
