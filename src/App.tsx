import { useEffect, useRef, useState } from "react";

import { kopier } from "../lib/kopier";
import { REGIONER, regionFraTast, type RegionId } from "./regioner";

const NULSTIL_VINDUE_MS = 1000;

function skriverITekstfelt(target: EventTarget | null): boolean {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
}

export function App() {
  const [region, setRegion] = useState<RegionId>();
  const [kopiStatus, setKopiStatus] = useState<"" | "ok" | "fejl">("");
  const sidsteEsc = useRef(0);

  useEffect(() => {
    function vedTast(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (event.key === "Escape") {
        const nu = Date.now();
        if (nu - sidsteEsc.current < NULSTIL_VINDUE_MS) {
          setRegion(undefined);
          setKopiStatus("");
          sidsteEsc.current = 0;
        } else {
          sidsteEsc.current = nu;
        }
        return;
      }

      // Tal vælger kun region, mens ingen region er valgt. Når en region er
      // åben, skal tallene (fra trin 3) vælge svarmuligheder i felterne.
      if (region || skriverITekstfelt(event.target)) return;
      const valgt = regionFraTast(event.key);
      if (valgt) {
        event.preventDefault();
        setRegion(valgt);
      }
    }

    window.addEventListener("keydown", vedTast);
    return () => window.removeEventListener("keydown", vedTast);
  }, [region]);

  async function testKopiering() {
    setKopiStatus((await kopier("Cortex: kopiering virker.")) ? "ok" : "fejl");
  }

  const aktiv = REGIONER.find((item) => item.id === region);

  return (
    <div className="skal">
      <header className="top">
        <strong className="logo">Cortex</strong>
        <nav className="regioner" aria-label="Region">
          {REGIONER.map((item, index) => (
            <button
              key={item.id}
              className={item.id === region ? "region aktiv" : "region"}
              aria-pressed={item.id === region}
              onClick={() => setRegion(item.id)}
            >
              <kbd>{index + 1}</kbd> {item.navn}
            </button>
          ))}
        </nav>
        <span className="hint">
          <kbd>Esc</kbd> <kbd>Esc</kbd> = ryd
        </span>
      </header>

      {aktiv ? (
        <main className="arbejdsflade">
          <section className="panel" aria-label="Indtastning">
            <h2>{aktiv.navn}</h2>
            <p className="tom">Felter til anamnese og objektive fund kommer i trin 2.</p>
          </section>
          <section className="panel" aria-label="Notat og beslutningsstøtte">
            <h2>Notat</h2>
            <p className="tom">Tomt. Notatet indeholder kun det, du aktivt vælger.</p>
            <h2>Beslutningsstøtte</h2>
            <p className="tom">Røde flag, differentialdiagnoser, behandling og henvisning kommer i trin 4–6.</p>
          </section>
        </main>
      ) : (
        <main className="start">
          <h1>Vælg region</h1>
          <p>Tryk 1–5, eller klik på en region ovenfor.</p>
        </main>
      )}

      <footer className="bund">
        <span>Ingen patientdata gemmes eller sendes. Genindlæsning rydder alt.</span>
        <span className="kopitest">
          <button onClick={testKopiering}>Test kopiering</button>
          {kopiStatus === "ok" && <span role="status">Kopieret – indsæt et sted for at kontrollere.</span>}
          {kopiStatus === "fejl" && <span role="status" className="fejl">Kopiering blev afvist af browseren.</span>}
        </span>
      </footer>
    </div>
  );
}
