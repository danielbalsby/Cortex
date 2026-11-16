import { regionFraTast } from "./regioner";

// Afgør, hvad et tastetryk skal gøre. Ren funktion uden DOM, så hele
// tastaturbetjeningen kan testes automatisk. App.tsx oversætter selve
// tastetrykket til input og udfører det svar, der kommer tilbage.

/** Hvor fokus står: et feltrække/siden, et tekstfelt, en knap/link/fold-ud, eller beslutningsstøtten. */
export type Fokus = "felt" | "tekst" | "egen" | "panel";

/** Hvad der vises: startskærm (eller region uden indhold), en region med felter, eller gennemgangssiden. */
export type Skaerm = "start" | "region" | "gennemgang";

export type Tast = { key: string; ctrl?: boolean; meta?: boolean; alt?: boolean; repeat?: boolean };

export type Handling =
  | { type: "ingen" }
  | { type: "kopier" }
  | { type: "esc" }
  | { type: "aabn"; maal: string }
  | { type: "flyt"; retning: 1 | -1 }
  | { type: "tal"; tal: number }
  | { type: "normal" }
  | { type: "fortryd" };

const INGEN: Handling = { type: "ingen" };

export function tolkTast(tast: Tast, fokus: Fokus, skaerm: Skaerm): Handling {
  if ((tast.ctrl || tast.meta) && tast.key === "Enter") return { type: "kopier" };
  // Ctrl/⌘+Z fortryder sidste ændring – også en nulstilling (Esc Esc) eller et regionsskift –
  // men ikke i tekstfelter, hvor browseren selv fortryder.
  if ((tast.ctrl || tast.meta) && (tast.key === "z" || tast.key === "Z") && skaerm !== "gennemgang" && fokus !== "tekst")
    return { type: "fortryd" };
  if (tast.ctrl || tast.meta || tast.alt) return INGEN;
  if (tast.key === "Escape") return { type: "esc" };

  if (skaerm === "gennemgang") return INGEN;

  if (skaerm === "start") {
    if (fokus === "tekst") return INGEN;
    if (tast.key === "0") return { type: "aabn", maal: "eksempel" };
    if (tast.key === "g" || tast.key === "G") return { type: "aabn", maal: "gennemgang" };
    const region = regionFraTast(tast.key);
    return region ? { type: "aabn", maal: region } : INGEN;
  }

  // Knapper, links og fold-ud-felter beholder deres egen Enter og piletaster, og i
  // beslutningsstøtten må tasterne aldrig ændre felterne til venstre.
  if (fokus === "egen" || fokus === "panel") return INGEN;

  if (tast.key === "ArrowDown" || tast.key === "Enter") return { type: "flyt", retning: 1 };
  if (tast.key === "ArrowUp") return { type: "flyt", retning: -1 };

  if (fokus === "tekst") return INGEN; // almindelig skrivning
  if (/^[1-9]$/.test(tast.key)) return { type: "tal", tal: Number(tast.key) };
  // Holdt N-tast må ikke gentage: ét tryk = én handling.
  if (tast.key === "n" || tast.key === "N") return tast.repeat ? INGEN : { type: "normal" };
  return INGEN;
}
