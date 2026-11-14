/**
 * Kopierer tekst til udklipsholderen. Bruger browserens moderne metode og
 * falder tilbage til den ældre, hvis den ikke er tilgængelig (fx når filen
 * er åbnet direkte fra disk i en låst browser). Returnerer om det lykkedes.
 */
export async function kopier(tekst: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // Prøv reservemetoden nedenfor.
  }

  const felt = document.createElement("textarea");
  felt.value = tekst;
  felt.setAttribute("readonly", "");
  felt.style.position = "fixed";
  felt.style.opacity = "0";
  document.body.appendChild(felt);
  felt.select();
  let lykkedes = false;
  try {
    lykkedes = document.execCommand("copy");
  } catch {
    lykkedes = false;
  }
  document.body.removeChild(felt);
  return lykkedes;
}
