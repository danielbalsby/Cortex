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
 * Sætter ét svar. Tom værdi fjerner svaret. Svar i felter, der skjules af
 * ændringen (fx traumemekanisme, når traume ændres til nej), slettes ikke –
 * de bevares, så en rettelse kan fortrydes, men indgår ikke i notat og flag
 * (se synligeSvar).
 */
export function saetSvar(_region: Region, svar: Svar, feltId: string, vaerdi: string | string[]): Svar {
  const naeste: Svar = { ...svar };
  if (vaerdi.length === 0) delete naeste[feltId];
  else naeste[feltId] = vaerdi;
  return naeste;
}

/** Kun svar i felter, der vises. Det er dem, notat og røde flag bygger på. */
export function synligeSvar(region: Region, svar: Svar): Svar {
  let naeste: Svar = svar;
  const felter = alleFelter(region);
  for (let runde = 0; runde <= felter.length; runde += 1) {
    const skjulte = felter.filter((felt) => felt.id in naeste && !erSynligt(felt, naeste));
    if (skjulte.length === 0) break;
    naeste = { ...naeste };
    for (const felt of skjulte) delete naeste[felt.id];
  }
  return naeste;
}

/** Felter med et bevaret svar, som ikke vises lige nu (til beskeden i appen). */
export function skjulteSvar(region: Region, svar: Svar): { felt: Felt; tekst: string }[] {
  const synlige = synligeSvar(region, svar);
  return alleFelter(region)
    .filter((felt) => felt.id in svar && !(felt.id in synlige))
    .map((felt) => {
      const v = svar[felt.id];
      const ider = Array.isArray(v) ? v : [v];
      const tekst = felt.type === "tekst" ? String(v) : (felt.valg ?? []).filter((valg) => ider.includes(valg.id)).map((valg) => valg.label).join(", ");
      return { felt, tekst };
    });
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
 *
 * `valgte` er id'er på differentialdiagnoser (→ V) og behandling/henvisning
 * (→ P), som lægen selv har krydset af. Rækkefølgen følger indholdsfilen.
 */
export function bygNotat(region: Region, alleSvar: Svar, valgte: readonly string[] = []): string {
  const svar = synligeSvar(region, alleSvar);
  const felter = new Map(alleFelter(region).map((felt) => [felt.id, felt]));
  const valgt = (punkt: { id: string }) => valgte.includes(punkt.id);
  const vurdering = region.differentialdiagnoser.filter(valgt).map((diff) => diff.notat);
  const plan = [...region.behandling.filter(valgt), ...region.henvisning.filter(valgt)].map((punkt) => punkt.notat);
  const beslutninger = [
    vurdering.length ? `V: ${vurdering.join(" ")}` : "",
    plan.length ? `P: ${plan.join(" ")}` : ""
  ];

  const fund = region.notat
    .map((afsnit) => {
      const tekst = afsnit.felter
        .map((id) => {
          const felt = felter.get(id);
          return felt ? feltTekst(felt, svar) : "";
        })
        .filter(Boolean)
        .join(" ");
      return tekst ? `${afsnit.overskrift}: ${tekst}` : "";
    });

  return [...fund, ...beslutninger].filter(Boolean).join("\n");
}
