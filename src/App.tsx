import { useEffect, useRef, useState } from "react";

import { INDHOLD } from "../indhold";
import { eksempel } from "../indhold/eksempel";
import type { Svar } from "../indhold/typer";
import { kopier } from "../lib/kopier";
import { bygNotat, saetSvar } from "../lib/notat";
import { optael } from "../lib/status";
import { naboFelt, udfyldNormale, vaelgMedTal } from "../lib/tastatur";
import { Beslutningsstoette } from "./Beslutningsstoette";
import { Felter } from "./Felter";
import { Notat, type KopiStatus } from "./Notat";
import { REGIONER, regionFraTast, type RegionId } from "./regioner";

const NULSTIL_VINDUE_MS = 1000;

// "eksempel" er ikke en klinisk region. Den viser kun, hvordan panelet ser ud (tast 0).
type Aaben = RegionId | "eksempel";

function hentIndhold(id: Aaben | undefined) {
  if (!id) return undefined;
  return id === "eksempel" ? eksempel : INDHOLD[id];
}

export function App() {
  const [region, setRegion] = useState<Aaben>();
  const [svar, setSvar] = useState<Svar>({});
  const [valgte, setValgte] = useState<string[]>([]); // diagnoser → V, behandling/henvisning → P
  const [aktivFelt, setAktivFelt] = useState<string>();
  const [kopiStatus, setKopiStatus] = useState<KopiStatus>("");
  const sidsteEsc = useRef(0);

  const indhold = hentIndhold(region);
  const aktiv = region === "eksempel" ? eksempel : REGIONER.find((item) => item.id === region);
  const status = indhold ? optael(indhold) : undefined;
  const notat = indhold ? bygNotat(indhold, svar, valgte) : "";

  // Skift af region rydder altid svarene: et notat hører til én region.
  function vaelgRegion(id: Aaben | undefined) {
    const nyt = hentIndhold(id);
    setRegion(id);
    setSvar({});
    setValgte([]);
    setKopiStatus("");
    setAktivFelt(nyt ? naboFelt(nyt, {}, undefined, 1) : undefined);
  }

  function opdaterSvar(naeste: Svar) {
    setSvar(naeste);
    setKopiStatus(""); // kvitteringen gælder kun det notat, der blev kopieret
  }

  function vaelgPunkt(id: string) {
    setValgte((nu) => (nu.includes(id) ? nu.filter((item) => item !== id) : [...nu, id]));
    setKopiStatus("");
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
        const valgt = iTekstfelt ? undefined : event.key === "0" ? "eksempel" : regionFraTast(event.key);
        if (valgt) {
          event.preventDefault();
          vaelgRegion(valgt);
        }
        return;
      }

      // Knapper, links og fold-ud-felter (fx "Kilderne er uenige") beholder deres egen
      // Enter og piletaster, og i beslutningsstøtten må tasterne aldrig ændre felterne.
      const maal = event.target instanceof Element ? event.target : null;
      const egenBetjening =
        maal instanceof HTMLButtonElement || maal instanceof HTMLAnchorElement || maal?.tagName === "SUMMARY";
      if (egenBetjening || maal?.closest(".stoette")) return;

      if (event.key === "ArrowDown" || event.key === "Enter") {
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
            <Beslutningsstoette region={indhold} svar={svar} valgte={valgte} onVaelg={vaelgPunkt} />
          </section>
        </main>
      ) : aktiv ? (
        <main className="start">
          <h1>{aktiv.navn}</h1>
          <p>Denne region har ikke indhold endnu.</p>
        </main>
      ) : (
        <main className="start">
          <h1>Vælg region</h1>
          <p>Tryk 1–5, eller klik på en region ovenfor.</p>
          <p className="lille">
            <kbd>0</kbd> viser et eksempel på beslutningsstøtten (ikke klinisk indhold).
          </p>
        </main>
      )}

      <footer className="bund">
        {indhold && status ? (
          <span>
            {indhold.navn}: {status.punkter} punkter · {status.udkast} UDKAST · {status.kildeMangler} kilde mangler
            {status.konflikter > 0 && ` · ${status.konflikter} konflikt`}
            {status.aeldsteTjek && ` · ældste kildetjek ${status.aeldsteTjek}`}
          </span>
        ) : (
          <span>Ingen patientdata gemmes eller sendes. Genindlæsning rydder alt.</span>
        )}
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
