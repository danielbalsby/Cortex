import { useEffect, useState } from "react";

import { kopier } from "../lib/kopier";

export function Notat({ tekst }: { tekst: string }) {
  const [status, setStatus] = useState<"" | "ok" | "fejl">("");

  // Kvitteringen forsvinder, så snart notatet ændres.
  useEffect(() => setStatus(""), [tekst]);

  async function kopierNotat() {
    setStatus((await kopier(tekst)) ? "ok" : "fejl");
  }

  return (
    <div className="notat">
      <div className="notatTop">
        <h2>Notat</h2>
        <span className="notatHandling">
          {status === "ok" && <span role="status">Kopieret</span>}
          {status === "fejl" && (
            <span role="status" className="fejl">
              Kopiering afvist af browseren – markér teksten og kopiér manuelt
            </span>
          )}
          <button className="kopier" onClick={kopierNotat} disabled={!tekst}>
            Kopiér
          </button>
        </span>
      </div>
      {tekst ? (
        <pre className="notatTekst" aria-label="Notat">
          {tekst}
        </pre>
      ) : (
        <p className="tom">Tomt. Notatet indeholder kun det, du aktivt vælger.</p>
      )}
    </div>
  );
}
