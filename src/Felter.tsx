import type { Felt, Region, Svar } from "../indhold/typer";
import { erSynligt } from "../lib/notat";

type Props = {
  region: Region;
  svar: Svar;
  onSvar: (feltId: string, vaerdi: string | string[]) => void;
};

export function Felter({ region, svar, onSvar }: Props) {
  return (
    <>
      {region.grupper.map((gruppe) => (
        <div key={gruppe.id} className="gruppe">
          <h2>{gruppe.titel}</h2>
          {gruppe.felter
            .filter((felt) => erSynligt(felt, svar))
            .map((felt) => (
              <FeltRaekke key={felt.id} felt={felt} vaerdi={svar[felt.id]} onSvar={onSvar} />
            ))}
        </div>
      ))}
    </>
  );
}

function FeltRaekke({
  felt,
  vaerdi,
  onSvar
}: {
  felt: Felt;
  vaerdi: string | string[] | undefined;
  onSvar: Props["onSvar"];
}) {
  const labelId = `felt-${felt.id}`;

  if (felt.type === "tekst") {
    return (
      <label className="felt">
        <span className="feltLabel">{felt.label}</span>
        <input
          type="text"
          value={typeof vaerdi === "string" ? vaerdi : ""}
          placeholder={felt.pladsholder}
          maxLength={200}
          autoComplete="off"
          onChange={(event) => onSvar(felt.id, event.target.value)}
        />
      </label>
    );
  }

  const valgte = Array.isArray(vaerdi) ? vaerdi : vaerdi ? [vaerdi] : [];

  function klik(valgId: string) {
    const aktiv = valgte.includes(valgId);
    if (felt.type === "flere") {
      onSvar(felt.id, aktiv ? valgte.filter((id) => id !== valgId) : [...valgte, valgId]);
    } else {
      // Klik på det valgte igen fravælger det.
      onSvar(felt.id, aktiv ? "" : valgId);
    }
  }

  return (
    <div className="felt" role="group" aria-labelledby={labelId}>
      <span className="feltLabel" id={labelId}>
        {felt.label}
      </span>
      <span className="valg">
        {(felt.valg ?? []).map((valg) => (
          <button
            key={valg.id}
            className={valgte.includes(valg.id) ? "chip valgt" : "chip"}
            aria-pressed={valgte.includes(valg.id)}
            onClick={() => klik(valg.id)}
          >
            {valg.label}
          </button>
        ))}
      </span>
    </div>
  );
}
