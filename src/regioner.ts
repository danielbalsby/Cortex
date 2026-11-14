// De fem regioner, Cortex dækker. Rækkefølgen bestemmer tasten (1–5).
export const REGIONER = [
  { id: "skulder", navn: "Skulder" },
  { id: "albue", navn: "Albue" },
  { id: "ryg", navn: "Lænderyg" },
  { id: "knae", navn: "Knæ" },
  { id: "ankel", navn: "Ankel" }
] as const;

export type RegionId = (typeof REGIONER)[number]["id"];

/** Oversætter et tastetryk ("1"–"5") til en region. Alt andet giver undefined. */
export function regionFraTast(tast: string): RegionId | undefined {
  if (!/^[1-9]$/.test(tast)) return undefined;
  return REGIONER[Number(tast) - 1]?.id;
}
