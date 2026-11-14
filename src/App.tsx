import { useEffect, useRef, useState } from "react";

import { INDHOLD } from "../indhold";
import type { Svar } from "../indhold/typer";
import { bygNotat, saetSvar } from "../lib/notat";
import { Felter } from "./Felter";
import { Notat } from "./Notat";
import { REGIONER, regionFraTast, type RegionId } from "./regioner";

const NULSTIL_VINDUE_MS = 1000;

function skriverITekstfelt(target: EventTarget | null): boolean {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
}

export function App() {
  const [region, setRegion] = useState<RegionId>();
  const [svar, setSvar] = useState<Svar>({});
  const sidsteEsc = useRef(0);

  useEffect(() => {
    function vedTast(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (event.key === "Escape") {
        const nu = Date.now();
        if (nu - sidsteEsc.current < NULSTIL_VINDUE_MS) {
          setRegion(undefined);
          setSvar({});
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
        vaelgRegion(valgt);
      }
    }

    window.addEventListener("keydown", vedTast);
    return () => window.removeEventListener("keydown", vedTast);
  }, [region]);

  // Skift af region rydder altid svarene: et notat hører til én region.
  function vaelgRegion(id: RegionId) {
    setRegion(id);
    setSvar({});
  }

  const aktiv = REGIONER.find((item) => item.id === region);
  const indhold = region ? INDHOLD[region] : undefined;

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
              onClick={() => vaelgRegion(item.id)}
            >
              <kbd>{index + 1}</kbd> {item.navn}
            </button>
          ))}
        </nav>
        <span className="hint">
          <kbd>Esc</kbd> <kbd>Esc</kbd> = ryd
        </span>
      </header>

      {aktiv && indhold ? (
        <main className="arbejdsflade">
          <section className="panel" aria-label="Indtastning">
            <Felter
              region={indhold}
              svar={svar}
              onSvar={(feltId, vaerdi) => setSvar((nu) => saetSvar(indhold, nu, feltId, vaerdi))}
            />
          </section>
          <section className="panel" aria-label="Notat og beslutningsstøtte">
            <Notat tekst={bygNotat(indhold, svar)} />
            <h2>Beslutningsstøtte</h2>
            <p className="tom">Røde flag, differentialdiagnoser, behandling og henvisning kommer i trin 4–6.</p>
          </section>
        </main>
      ) : aktiv ? (
        <main className="start">
          <h1>{aktiv.navn}</h1>
          <p>Denne region har ikke indhold endnu. Knæ bygges færdig først.</p>
        </main>
      ) : (
        <main className="start">
          <h1>Vælg region</h1>
          <p>Tryk 1–5, eller klik på en region ovenfor.</p>
        </main>
      )}

      <footer className="bund">
        <span>Ingen patientdata gemmes eller sendes. Genindlæsning rydder alt.</span>
      </footer>
    </div>
  );
}
