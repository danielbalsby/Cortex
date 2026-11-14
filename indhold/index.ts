import { ankel } from "./ankel";
import { knae } from "./knae";
import { ryg } from "./ryg";
import { skulder } from "./skulder";
import type { Region } from "./typer";

// Regioner med indhold. Tilføj en region her, når dens fil er oprettet.
export const INDHOLD: Record<string, Region | undefined> = {
  skulder,
  ryg,
  knae,
  ankel
};
