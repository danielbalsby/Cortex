import type { Kildebelagt } from "../indhold/typer";

/**
 * Fingeraftryk af et klinisk punkt: alt, hvad lægen har godkendt (tekst, handling,
 * betingelser, kilder, konflikt, notatsætning, hast). Ændres noget af det, ændres
 * fingeraftrykket. Status og godkendelsesdato indgår ikke.
 */
export function fingeraftryk(punkt: Kildebelagt & Record<string, unknown>): string {
  const { status: _status, godkendtDato: _dato, ...indhold } = punkt;
  const tekst = kanonisk(indhold);
  // FNV-1a, 32 bit: kort og deterministisk; det er en ændringsdetektor, ikke kryptografi.
  let h = 0x811c9dc5;
  for (let i = 0; i < tekst.length; i += 1) {
    h ^= tekst.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

/** JSON med sorterede nøgler på alle niveauer, så rækkefølgen af felter i filen er ligegyldig. */
function kanonisk(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(kanonisk).join(",")}]`;
  if (v && typeof v === "object")
    return `{${Object.keys(v as object)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${kanonisk((v as Record<string, unknown>)[k])}`)
      .join(",")}}`;
  return JSON.stringify(v);
}
