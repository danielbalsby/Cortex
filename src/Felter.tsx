import { useEffect, useRef } from "react";

import type { Felt, Region, Svar } from "../indhold/typer";
import { lignerCpr } from "../lib/cpr";
import { erSynligt } from "../lib/notat";

type Props = {
  region: Region;
  svar: Svar;
  aktivFelt: string | undefined;
  onAktiv: (feltId: string) => void;
  onSvar: (feltId: string, vaerdi: string | string[]) => void;
  nSat?: readonly string[]; // felter udfyldt af N og ikke rørt siden
};

export function Felter({ region, svar, aktivFelt, onAktiv, onSvar, nSat = [] }: Props) {
  return (
    <>
      {region.grupper.map((gruppe) => (
        <div key={gruppe.id} className="gruppe">
          <h2>
            {gruppe.titel}
            {gruppe.felter.some((felt) => felt.valg?.some((valg) => valg.normal)) && (
              <span className="gruppeHint">
                <kbd>N</kbd> = normalfund i ubesvarede
              </span>
            )}
          </h2>
          {gruppe.felter
            .filter((felt) => erSynligt(felt, svar))
            .map((felt) => (
              <FeltRaekke
                key={felt.id}
                felt={felt}
                vaerdi={svar[felt.id]}
                aktiv={felt.id === aktivFelt}
                afN={nSat.includes(felt.id)}
                onAktiv={onAktiv}
                onSvar={onSvar}
              />
            ))}
        </div>
      ))}
    </>
  );
}

function FeltRaekke({
  felt,
  vaerdi,
  aktiv,
  afN,
  onAktiv,
  onSvar
}: {
  felt: Felt;
  vaerdi: string | string[] | undefined;
  aktiv: boolean;
  afN: boolean;
  onAktiv: Props["onAktiv"];
  onSvar: Props["onSvar"];
}) {
  const raekke = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const labelId = `felt-${felt.id}`;

  // Flyt fokus til det aktive felt, så tastaturet altid virker på det, der er fremhævet.
  useEffect(() => {
    if (!aktiv) return;
    const maal = felt.type === "tekst" ? input.current : raekke.current;
    if (maal && document.activeElement !== maal) maal.focus({ preventScroll: true });
    maal?.scrollIntoView({ block: "nearest" });
  }, [aktiv, felt.type]);

  if (felt.type === "tekst") {
    return (
      <label className={aktiv ? "felt aktiv" : "felt"}>
        <span className="feltLabel">{felt.label}</span>
        <input
          ref={input}
          type="text"
          value={typeof vaerdi === "string" ? vaerdi : ""}
          placeholder={felt.pladsholder}
          maxLength={200}
          autoComplete="off"
          // Browserens udvidede stavekontrol og stavekontrol-udvidelser kan sende tekst ud.
          spellCheck={false}
          autoCorrect="off"
          data-gramm="false"
          data-enable-grammarly="false"
          onFocus={() => onAktiv(felt.id)}
          onChange={(event) => onSvar(felt.id, event.target.value)}
        />
        {typeof vaerdi === "string" && lignerCpr(vaerdi) && (
          <span className="cprAdvarsel" role="status">
            Ligner et CPR-nummer – skriv ingen personhenførbare data i Cortex.
          </span>
        )}
      </label>
    );
  }

  const valgte = Array.isArray(vaerdi) ? vaerdi : vaerdi ? [vaerdi] : [];

  function klik(valgId: string) {
    onAktiv(felt.id);
    const valgt = valgte.includes(valgId);
    if (felt.type === "flere") {
      onSvar(felt.id, valgt ? valgte.filter((id) => id !== valgId) : [...valgte, valgId]);
    } else {
      // Klik på det valgte igen fravælger det.
      onSvar(felt.id, valgt ? "" : valgId);
    }
  }

  return (
    <div
      ref={raekke}
      className={aktiv ? "felt aktiv" : "felt"}
      role="group"
      aria-labelledby={labelId}
      tabIndex={0}
      onFocus={() => onAktiv(felt.id)}
    >
      <span className="feltLabel" id={labelId}>
        {felt.label}
        {felt.kunTilFlag && <span className="kunFlag">ikke i notat</span>}
      </span>
      <span className="valg">
        {(felt.valg ?? []).map((valg, index) => (
          <button
            key={valg.id}
            className={valgte.includes(valg.id) ? (afN ? "chip valgt afN" : "chip valgt") : "chip"}
            title={afN && valgte.includes(valg.id) ? "Sat med N – ikke bekræftet enkeltvis" : undefined}
            aria-pressed={valgte.includes(valg.id)}
            tabIndex={-1}
            // Fokus bliver på rækken, så tal og piletaster virker efter et museklik.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => klik(valg.id)}
          >
            {aktiv && index < 9 && <kbd>{index + 1}</kbd>}
            {valg.label}
            {afN && valgte.includes(valg.id) && <span className="nMaerke">N</span>}
          </button>
        ))}
      </span>
    </div>
  );
}
