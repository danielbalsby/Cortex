import { useEffect, useRef, useState } from "react";

import { INDHOLD } from "../indhold";
import { eksempel } from "../indhold/eksempel";
import type { Svar } from "../indhold/typer";
import { kopier } from "../lib/kopier";
import { bygNotat, saetSvar, skjulteSvar, synligeSvar } from "../lib/notat";
import { optael } from "../lib/status";
import { naboFelt, udfyldNormale, vaelgMedTal } from "../lib/tastatur";
import { Beslutningsstoette, FlagStribe } from "./Beslutningsstoette";
import { Felter } from "./Felter";
import { Gennemgang } from "./Gennemgang";
import { Notat, type KopiStatus } from "./Notat";
import { REGIONER, type RegionId } from "./regioner";
import { tolkTast, type Fokus, type Skaerm } from "./tast";

const NULSTIL_VINDUE_MS = 1000;

// "eksempel" er ikke en klinisk region. Den viser kun, hvordan panelet ser ud (tast 0).
type Aaben = RegionId | "eksempel" | "gennemgang";

function hentIndhold(id: Aaben | undefined) {
  if (!id) return undefined;
  if (id === "gennemgang") return undefined;
  return id === "eksempel" ? eksempel : INDHOLD[id];
}

export function App() {
  const [region, setRegion] = useState<Aaben>();
  const [svar, setSvar] = useState<Svar>({});
  const [valgte, setValgte] = useState<string[]>([]); // diagnoser → V, behandling/henvisning → P
  const [aktivFelt, setAktivFelt] = useState<string>();
  const [kopiStatus, setKopiStatus] = useState<KopiStatus>("");
  const sidsteEsc = useRef(0);
  // Tidligere tilstande i den aktuelle region, så Ctrl+Z kan fortryde. Kun i hukommelsen.
  const [historik, setHistorik] = useState<{ svar: Svar; valgte: string[] }[]>([]);
  // Den konsultation, der blev ryddet ved Esc Esc eller regionsskift – kan hentes tilbage med Ctrl+Z.
  const ryddet = useRef<{ region: Aaben; svar: Svar; valgte: string[]; historik: { svar: Svar; valgte: string[] }[] } | null>(null);

  const indhold = hentIndhold(region);
  const aktiv = region === "eksempel" ? eksempel : REGIONER.find((item) => item.id === region);
  const status = indhold ? optael(indhold) : undefined;
  const notat = indhold ? bygNotat(indhold, svar, valgte) : "";
  const synlige = indhold ? synligeSvar(indhold, svar) : svar;
  const skjulte = indhold ? skjulteSvar(indhold, svar) : [];

  // Skift af region rydder altid svarene: et notat hører til én region.
  function vaelgRegion(id: Aaben | undefined) {
    const nyt = hentIndhold(id);
    if (region && (Object.keys(svar).length > 0 || valgte.length > 0)) ryddet.current = { region, svar, valgte, historik };
    setRegion(id);
    setSvar({});
    setValgte([]);
    setHistorik([]);
    setKopiStatus("");
    setAktivFelt(nyt ? naboFelt(nyt, {}, undefined, 1) : undefined);
  }

  function husk() {
    setHistorik((h) => [...h.slice(-49), { svar, valgte }]);
  }

  function fortryd() {
    const forrige = historik[historik.length - 1];
    if (!forrige) {
      const gammel = ryddet.current;
      if (!gammel) return;
      ryddet.current = null;
      setRegion(gammel.region);
      setSvar(gammel.svar);
      setValgte(gammel.valgte);
      setHistorik(gammel.historik);
      setKopiStatus("");
      const genskabt = hentIndhold(gammel.region);
      setAktivFelt(genskabt ? naboFelt(genskabt, gammel.svar, undefined, 1) : undefined);
      return;
    }
    setHistorik((h) => h.slice(0, -1));
    setSvar(forrige.svar);
    setValgte(forrige.valgte);
    setKopiStatus("");
  }

  function opdaterSvar(naeste: Svar) {
    if (naeste === svar) return;
    husk();
    setSvar(naeste);
    setKopiStatus(""); // kvitteringen gælder kun det notat, der blev kopieret
  }

  function vaelgPunkt(id: string) {
    husk();
    setValgte((nu) => (nu.includes(id) ? nu.filter((item) => item !== id) : [...nu, id]));
    setKopiStatus("");
  }

  async function kopierNotat() {
    if (!notat) return;
    setKopiStatus((await kopier(notat)) ? "ok" : "fejl");
  }

  useEffect(() => {
    function vedTast(event: KeyboardEvent) {
      const maal = event.target instanceof Element ? event.target : null;
      const fokus: Fokus =
        maal instanceof HTMLInputElement || maal instanceof HTMLTextAreaElement
          ? "tekst"
          : maal instanceof HTMLButtonElement || maal instanceof HTMLAnchorElement || maal?.tagName === "SUMMARY"
            ? "egen"
            : maal?.closest(".stoette")
              ? "panel"
              : "felt";
      const skaerm: Skaerm = region === "gennemgang" ? "gennemgang" : indhold ? "region" : "start";
      const handling = tolkTast(
        { key: event.key, ctrl: event.ctrlKey, meta: event.metaKey, alt: event.altKey, repeat: event.repeat },
        fokus,
        skaerm
      );
      if (handling.type === "ingen") return;
      if (handling.type !== "esc") event.preventDefault();

      switch (handling.type) {
        case "kopier":
          void kopierNotat();
          return;
        case "esc": {
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
        case "aabn":
          vaelgRegion(handling.maal as Aaben);
          return;
        case "flyt":
          if (indhold) setAktivFelt(naboFelt(indhold, svar, aktivFelt, handling.retning));
          return;
        case "tal": {
          if (!indhold || !aktivFelt) return;
          const resultat = vaelgMedTal(indhold, svar, aktivFelt, handling.tal);
          opdaterSvar(resultat.svar);
          if (resultat.rykFrem) setAktivFelt(naboFelt(indhold, resultat.svar, aktivFelt, 1));
          return;
        }
        case "fortryd":
          fortryd();
          return;
        case "normal":
          if (indhold) opdaterSvar(udfyldNormale(indhold, svar));
          return;
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
              onClick={() => {
                // Klik på den allerede åbne region rydder ikke notatet.
                if (item.id !== region) vaelgRegion(item.id);
              }}
            >
              {!region && <kbd>{index + 1}</kbd>} {item.navn}
            </button>
          ))}
        </nav>
        <span className="hint">
          <kbd>Esc</kbd> <kbd>Esc</kbd> = ryd · <kbd>Ctrl</kbd> <kbd>Z</kbd> = fortryd
        </span>
      </header>

      {aktiv && indhold && <FlagStribe region={indhold} svar={synlige} />}
      {aktiv && indhold ? (
        <main className="arbejdsflade">
          <section className="panel" aria-label="Indtastning">
            {skjulte.length > 0 && (
              <p className="skjultBesked" role="status">
                {skjulte.length} svar er skjult, fordi feltet ikke vises
                lige nu: {skjulte.map((s) => `${s.felt.label} (${s.tekst})`).join(", ")}. Det står ikke i notatet og
                kommer tilbage, hvis feltet vises igen.
                {historik.length > 0 && (
                  <button className="fortryd" onClick={fortryd}>
                    Fortryd <kbd>Ctrl</kbd>
                    <kbd>Z</kbd>
                  </button>
                )}
              </p>
            )}
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
            <Beslutningsstoette region={indhold} svar={synlige} valgte={valgte} onVaelg={vaelgPunkt} />
          </section>
        </main>
      ) : region === "gennemgang" ? (
        <Gennemgang />
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
            <kbd>G</kbd> gennemgang af røde flag og konflikter · <kbd>0</kbd> eksempel på beslutningsstøtten (ikke
            klinisk indhold)
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
