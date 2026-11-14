import type { Betingelse, Felt, Region, Svar } from "../indhold/typer";

export function alleFelter(region: Region): Felt[] {
  return region.grupper.flatMap((gruppe) => gruppe.felter);
}

export function passer(betingelser: Betingelse[] | undefined, svar: Svar): boolean {
  return (betingelser ?? []).every((betingelse) => {
    const vaerdi = svar[betingelse.felt];
    return Array.isArray(vaerdi) ? vaerdi.includes(betingelse.er) : vaerdi === betingelse.er;
  });
}

export function erSynligt(felt: Felt, svar: Svar): boolean {
  return passer(felt.visHvis, svar);
}

/**
 * Sætter ét svar og fjerner derefter svar i felter, der ikke længere vises
 * (fx traumemekanisme, når traume ændres til nej). Tom værdi fjerner svaret.
 */
export function saetSvar(region: Region, svar: Svar, feltId: string, vaerdi: string | string[]): Svar {
  let naeste: Svar = { ...svar };
  if (vaerdi.length === 0) delete naeste[feltId];
  else naeste[feltId] = vaerdi;

  const felter = alleFelter(region);
  for (let runde = 0; runde <= felter.length; runde += 1) {
    const skjulte = felter.filter((felt) => felt.id in naeste && !erSynligt(felt, naeste));
    if (skjulte.length === 0) break;
    naeste = { ...naeste };
    for (const felt of skjulte) delete naeste[felt.id];
  }
  return naeste;
}

function medPunktum(tekst: string): string {
  const ren = tekst.trim().replace(/\s+/g, " ");
  if (!ren) return "";
  return /[.!?]$/.test(ren) ? ren : `${ren}.`;
}

function feltTekst(felt: Felt, svar: Svar): string {
  const vaerdi = svar[felt.id];
  if (vaerdi === undefined || !erSynligt(felt, svar)) return "";
  if (felt.type === "tekst") return typeof vaerdi === "string" ? medPunktum(vaerdi) : "";

  const valgte = Array.isArray(vaerdi) ? vaerdi : [vaerdi];
  // Rækkefølgen følger indholdsfilen, ikke den rækkefølge der blev klikket i.
  return (felt.valg ?? [])
    .filter((valg) => valgte.includes(valg.id))
    .map((valg) => valg.notat)
    .join(" ");
}

/**
 * Bygger notatet ud fra lægens valg. Kun det, der aktivt er valgt eller
 * skrevet, kommer med. Tomme afsnit udelades; ingen valg giver tom tekst.
 */
export function bygNotat(region: Region, svar: Svar): string {
  const felter = new Map(alleFelter(region).map((felt) => [felt.id, felt]));
  return region.notat
    .map((afsnit) => {
      const tekst = afsnit.felter
        .map((id) => {
          const felt = felter.get(id);
          return felt ? feltTekst(felt, svar) : "";
        })
        .filter(Boolean)
        .join(" ");
      return tekst ? `${afsnit.overskrift}: ${tekst}` : "";
    })
    .filter(Boolean)
    .join("\n");
}
