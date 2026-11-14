import { useEffect, useRef, useState } from "react";

import { INDHOLD } from "../indhold";
import type { Svar } from "../indhold/typer";
import { kopier } from "../lib/kopier";
import { bygNotat, saetSvar } from "../lib/notat";
import { naboFelt, udfyldNormale, vaelgMedTal } from "../lib/tastatur";
import { Felter } from "./Felter";
import { Notat, type KopiStatus } from "./Notat";
import { REGIONER, regionFraTast, type RegionId } from "./regioner";

const NULSTIL_VINDUE_MS = 1000;

export function App() {
  const [region, setRegion] = useState<RegionId>();
  const [svar, setSvar] = useState<Svar>({});
  const [aktivFelt, setAktivFelt] = useState<string>();
  const [kopiStatus, setKopiStatus] = useState<KopiStatus>("");
  const sidsteEsc = useRef(0);

  const aktiv = REGIONER.find((item) => item.id === region);
  const indhold = region ? INDHOLD[region] : undefined;
  const notat = indhold ? bygNotat(indhold, svar) : "";

  // Skift af region rydder altid svarene: et notat hører til én region.
  function vaelgRegion(id: RegionId | undefined) {
    const nyt = id ? INDHOLD[id] : undefined;
    setRegion(id);
    setSvar({});
    setKopiStatus("");
    setAktivFelt(nyt ? naboFelt(nyt, {}, undefined, 1) : undefined);
  }

  function opdaterSvar(naeste: Svar) {
    setSvar(naeste);
    setKopiStatus(""); // kvitteringen gælder kun det notat, der blev kopieret
  }

  async function kopierNotat() {
    if (!notat) return;
    setKopiStatus((await kopier(notat)) ? "ok" : "fejl");
  }

  useEffect(() => {
    function vedTast(event: KeyboardEvent) {
      const iTekstfelt = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        void kopierNotat();
        return;
      }
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (event.key === "Escape") {
        const nu = Date.now();
        if (nu - sidsteEsc.current < NULSTIL_VINDUE_MS) {
          vaelgRegion(undefined);
          if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
          sidsteEsc.current = 0;
        } else {
          sidsteEsc.current = nu;
        }
        return;
      }

      if (!indhold) {
        // Ingen region åben: tal vælger region.
        const valgt = iTekstfelt ? undefined : regionFraTast(event.key);
        if (valgt) {
          event.preventDefault();
          vaelgRegion(valgt);
        }
        return;
      }

      // Knapper uden for felterne (regioner, Kopiér) beholder deres egen Enter/mellemrum.
      const paaKnap = event.target instanceof HTMLButtonElement;

      if (event.key === "ArrowDown" || (event.key === "Enter" && !paaKnap)) {
        event.preventDefault();
        setAktivFelt(naboFelt(indhold, svar, aktivFelt, 1));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setAktivFelt(naboFelt(indhold, svar, aktivFelt, -1));
        return;
      }

      if (iTekstfelt) return; // resten er almindelig skrivning

      if (/^[1-9]$/.test(event.key) && aktivFelt) {
        event.preventDefault();
        const resultat = vaelgMedTal(indhold, svar, aktivFelt, Number(event.key));
        opdaterSvar(resultat.svar);
        if (resultat.rykFrem) setAktivFelt(naboFelt(indhold, resultat.svar, aktivFelt, 1));
        return;
      }
      if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        opdaterSvar(udfyldNormale(indhold, svar));
      }
    }

    window.addEventListener("keydown", vedTast);
    return () => window.removeEventListener("keydown", vedTast);
  });

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
              {!region && <kbd>{index + 1}</kbd>} {item.navn}
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
              aktivFelt={aktivFelt}
              onAktiv={setAktivFelt}
              onSvar={(feltId, vaerdi) => opdaterSvar(saetSvar(indhold, svar, feltId, vaerdi))}
            />
          </section>
          <section className="panel" aria-label="Notat og beslutningsstøtte">
            <Notat tekst={notat} status={kopiStatus} onKopier={kopierNotat} />
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
        {indhold && (
          <span className="genveje">
            <kbd>1</kbd>–<kbd>9</kbd> vælg · <kbd>↑</kbd>
            <kbd>↓</kbd> felt · <kbd>⏎</kbd> næste · <kbd>N</kbd> normal · <kbd>Ctrl</kbd>
            <kbd>⏎</kbd> kopiér
          </span>
        )}
      </footer>
    </div>
  );
}
