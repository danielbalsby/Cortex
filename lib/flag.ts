import type { Region, RoedtFlag, Svar } from "../indhold/typer";
import { passer } from "./notat";

/**
 * Hvordan et rødt flag står i forhold til lægens registrerede valg. Kun til
 * visning: flaget vises altid, og ingen status kan skjule eller afkræfte det.
 *
 * - matcher: mindst én fremhævningsgruppe passer.
 * - ikke-vurderet: ingen gruppe passer, men mindst én kunne stadig komme til det,
 *   fordi et felt, den afhænger af, er tomt (eller skjult).
 * - ikke-opfyldt: alle grupper er afgjort af registrerede svar uden match.
 *   Det betyder IKKE, at flaget er udelukket.
 * - uden-betingelse: flaget har ingen fremhævningsbetingelse.
 */
export type FlagStatus = "matcher" | "ikke-vurderet" | "ikke-opfyldt" | "uden-betingelse";

export function flagStatus(flag: RoedtFlag, svar: Svar): FlagStatus {
  const grupper = (flag.fremhaevHvis ?? []).filter((gruppe) => gruppe.length > 0);
  if (grupper.length === 0) return "uden-betingelse";
  if (grupper.some((gruppe) => passer(gruppe, svar))) return "matcher";
  const aaben = grupper.some((gruppe) =>
    gruppe.every((betingelse) => {
      const vaerdi = svar[betingelse.felt];
      if (vaerdi === undefined) return true; // ikke besvaret (eller skjult): kan stadig blive til match
      return Array.isArray(vaerdi) ? vaerdi.includes(betingelse.er) : vaerdi === betingelse.er;
    })
  );
  return aaben ? "ikke-vurderet" : "ikke-opfyldt";
}

/** Matchende flag først; øvrige beholder indholdsfilens rækkefølge. */
export function sorterFlag(region: Region, svar: Svar) {
  const med = region.roedeFlag.map((flag) => ({ flag, status: flagStatus(flag, svar) }));
  return {
    matcher: med.filter((item) => item.status === "matcher"),
    oevrige: med.filter((item) => item.status !== "matcher")
  };
}
