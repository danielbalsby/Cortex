/**
 * Genkender tekst, der ligner et CPR-nummer (6 cifre, evt. bindestreg/mellemrum, 4 cifre).
 * Bruges kun til en advarsel i fritekstfeltet. Teksten gemmes eller sendes aldrig.
 */
export function lignerCpr(tekst: string): boolean {
  return /(?<!\d)\d{6}[-\s]?\d{4}(?!\d)/.test(tekst);
}
