import type { ReactNode } from "react";

import type { Kilde, Kildebelagt, Region, Svar } from "../indhold/typer";
import { passer } from "../lib/notat";

// Viser regionens kliniske punkter præcis som de står i indholdsfilen.
// Komponenten indeholder ingen klinisk tekst og drager ingen konklusioner.
// Lægen kan selv krydse diagnoser (→ V) og behandling/henvisning (→ P) af.

type Props = {
  region: Region;
  svar: Svar;
  valgte: readonly string[];
  onVaelg: (id: string) => void;
};

export function Beslutningsstoette({ region, svar, valgte, onVaelg }: Props) {
  const kilder = new Map(region.kilder.map((kilde) => [kilde.id, kilde]));
  const diagnoseNavn = new Map(region.differentialdiagnoser.map((diff) => [diff.id, diff.navn]));
  const valgteDiagnoser = region.differentialdiagnoser.filter((diff) => valgte.includes(diff.id)).map((diff) => diff.id);

  // Når en diagnose er valgt, vises behandling for den (og generel behandling) først.
  // Resten ligger sammenfoldet – intet skjules helt.
  const relevant = (gaelderFor: string[] | undefined) =>
    valgteDiagnoser.length === 0 || !gaelderFor?.length || gaelderFor.some((id) => valgteDiagnoser.includes(id));
  const forrest = region.behandling.filter((beh) => relevant(beh.gaelderFor) || valgte.includes(beh.id));
  const oevrige = region.behandling.filter((beh) => !forrest.includes(beh));

  const behandlingPunkt = (beh: Region["behandling"][number]) => (
    <Punkt key={beh.id} punkt={beh} kilder={kilder} valg={{ label: "P", valgt: valgte.includes(beh.id), onVaelg: () => onVaelg(beh.id) }}>
      <span>{beh.tekst}</span>
      {beh.gaelderFor && beh.gaelderFor.length > 0 && (
        <span className="kendetegn">Gælder: {beh.gaelderFor.map((id) => diagnoseNavn.get(id) ?? id).join(", ")}</span>
      )}
    </Punkt>
  );

  return (
    <div className="stoette">
      <Sektion titel="Røde flag" tom={region.roedeFlag.length === 0}>
        {region.roedeFlag.map((flag) => {
          // En betingelse må kun fremhæve. Uden match vises flaget uændret.
          const fremhaevet = (flag.fremhaevHvis ?? []).some((gruppe) => gruppe.length > 0 && passer(gruppe, svar));
          return (
            <Punkt key={flag.id} punkt={flag} kilder={kilder} klasse={fremhaevet ? "flag fremhaevet" : "flag"}>
              <FlagTekst tekst={flag.tekst} />
              <span className="handling">→ {flag.handling}</span>
              {fremhaevet && <span className="match">Matcher dine valg</span>}
            </Punkt>
          );
        })}
      </Sektion>

      <Sektion titel="Differentialdiagnoser" hint="V = til vurdering i notatet" tom={region.differentialdiagnoser.length === 0}>
        {region.differentialdiagnoser.map((diff) => (
          <Punkt
            key={diff.id}
            punkt={diff}
            kilder={kilder}
            valg={{ label: "V", valgt: valgte.includes(diff.id), onVaelg: () => onVaelg(diff.id) }}
          >
            <strong>{diff.navn}</strong>
            {diff.kendetegn.length > 0 && <span className="kendetegn">{diff.kendetegn.join(" · ")}</span>}
          </Punkt>
        ))}
      </Sektion>

      <Sektion
        titel="Behandling"
        hint={valgteDiagnoser.length ? "Vist for valgt diagnose · P = til plan" : "P = til plan i notatet"}
        tom={region.behandling.length === 0}
      >
        {forrest.map(behandlingPunkt)}
        {oevrige.length > 0 && (
          <li className="oevrige">
            <details>
              <summary>Øvrig behandling ({oevrige.length})</summary>
              <ul className="punkter">{oevrige.map(behandlingPunkt)}</ul>
            </details>
          </li>
        )}
      </Sektion>

      <Sektion titel="Henvisning" hint="P = til plan i notatet" tom={region.henvisning.length === 0}>
        {region.henvisning.map((henvisning) => (
          <Punkt
            key={henvisning.id}
            punkt={henvisning}
            kilder={kilder}
            valg={{ label: "P", valgt: valgte.includes(henvisning.id), onVaelg: () => onVaelg(henvisning.id) }}
          >
            <strong>
              {henvisning.til}
              {henvisning.hast && <span className="hast"> · {henvisning.hast}</span>}
            </strong>
            <span>{henvisning.kriterier}</span>
            <span className="kendetegn">Gælder: {henvisning.gyldighed}</span>
          </Punkt>
        ))}
      </Sektion>
    </div>
  );
}

/** Fremhæver flagets overskrift (teksten før første kolon), så listen kan skimmes. */
function FlagTekst({ tekst }: { tekst: string }) {
  const kolon = tekst.indexOf(": ");
  if (kolon === -1) return <strong>{tekst}</strong>;
  return (
    <span>
      <strong>{tekst.slice(0, kolon + 1)}</strong>
      {tekst.slice(kolon + 1)}
    </span>
  );
}

function Sektion({ titel, hint, tom, children }: { titel: string; hint?: string; tom: boolean; children: ReactNode }) {
  return (
    <section>
      <h2>
        {titel}
        {hint && !tom && <span className="gruppeHint">{hint}</span>}
      </h2>
      {tom ? <p className="tom">Intet indhold endnu.</p> : <ul className="punkter">{children}</ul>}
    </section>
  );
}

function Punkt({
  punkt,
  kilder,
  klasse = "",
  valg,
  children
}: {
  punkt: Kildebelagt;
  kilder: Map<string, Kilde>;
  klasse?: string;
  valg?: { label: string; valgt: boolean; onVaelg: () => void };
  children: ReactNode;
}) {
  const godkendt = punkt.status === "GODKENDT";
  return (
    <li className={`punkt ${godkendt ? "godkendt" : "udkast"} ${valg?.valgt ? "valgtPunkt" : ""} ${klasse}`}>
      <div className="punktRaekke">
        <div className="punktTekst">{children}</div>
        {valg && (
          <button
            className={valg.valgt ? "tilNotat valgt" : "tilNotat"}
            aria-pressed={valg.valgt}
            title={valg.valgt ? "Fjern fra notatet" : `Skriv i notatet under ${valg.label}`}
            onClick={valg.onVaelg}
          >
            {valg.valgt ? `✓ ${valg.label}` : `+ ${valg.label}`}
          </button>
        )}
      </div>
      <div className="punktMeta">
        {punkt.kilder.length === 0 ? (
          <span className="maerke mangler">KILDE MANGLER</span>
        ) : (
          punkt.kilder.map((id) => <KildeLink key={id} kilde={kilder.get(id)} id={id} />)
        )}
        <span className={godkendt ? "maerke ok" : "maerke kladde"}>
          {godkendt ? `✓ GODKENDT ${punkt.godkendtDato ?? ""}` : "UDKAST"}
        </span>
      </div>
      {punkt.konflikt && (
        <details className="konflikt">
          <summary>⚠ Kilderne er uenige</summary>
          <p>{punkt.konflikt.beskrivelse}</p>
          <p>
            {punkt.konflikt.kilder.map((id) => (
              <KildeLink key={id} kilde={kilder.get(id)} id={id} />
            ))}
          </p>
        </details>
      )}
    </li>
  );
}

export function KildeLink({ kilde, id }: { kilde: Kilde | undefined; id: string }) {
  if (!kilde) return <span className="maerke mangler">UKENDT KILDE: {id}</span>;
  return (
    <a
      className="kilde"
      href={kilde.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${kilde.titel} – tjekket ${kilde.sidstTjekket}`}
    >
      {kilde.udgiver} {kilde.aar}
      {!kilde.dansk && <span className="ikkeDansk"> · ikke-dansk</span>}
    </a>
  );
}
