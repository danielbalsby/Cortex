import type { ReactNode } from "react";

import type { Kilde, Kildebelagt, Region, Svar } from "../indhold/typer";
import { passer } from "../lib/notat";

// Viser regionens kliniske punkter præcis som de står i indholdsfilen.
// Komponenten indeholder ingen klinisk tekst og drager ingen konklusioner.

export function Beslutningsstoette({ region, svar }: { region: Region; svar: Svar }) {
  const kilder = new Map(region.kilder.map((kilde) => [kilde.id, kilde]));
  const diagnoseNavn = new Map(region.differentialdiagnoser.map((diff) => [diff.id, diff.navn]));

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

      <Sektion titel="Differentialdiagnoser" tom={region.differentialdiagnoser.length === 0}>
        {region.differentialdiagnoser.map((diff) => (
          <Punkt key={diff.id} punkt={diff} kilder={kilder}>
            <strong>{diff.navn}</strong>
            {diff.kendetegn.length > 0 && <span className="kendetegn">{diff.kendetegn.join(" · ")}</span>}
          </Punkt>
        ))}
      </Sektion>

      <Sektion titel="Behandling" tom={region.behandling.length === 0}>
        {region.behandling.map((behandling) => (
          <Punkt key={behandling.id} punkt={behandling} kilder={kilder}>
            <span>{behandling.tekst}</span>
            {behandling.gaelderFor && behandling.gaelderFor.length > 0 && (
              <span className="kendetegn">
                Gælder: {behandling.gaelderFor.map((id) => diagnoseNavn.get(id) ?? id).join(", ")}
              </span>
            )}
          </Punkt>
        ))}
      </Sektion>

      <Sektion titel="Henvisning" tom={region.henvisning.length === 0}>
        {region.henvisning.map((henvisning) => (
          <Punkt key={henvisning.id} punkt={henvisning} kilder={kilder}>
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

function Sektion({ titel, tom, children }: { titel: string; tom: boolean; children: ReactNode }) {
  return (
    <section>
      <h2>{titel}</h2>
      {tom ? <p className="tom">Intet indhold endnu.</p> : <ul className="punkter">{children}</ul>}
    </section>
  );
}

function Punkt({
  punkt,
  kilder,
  klasse = "",
  children
}: {
  punkt: Kildebelagt;
  kilder: Map<string, Kilde>;
  klasse?: string;
  children: ReactNode;
}) {
  const godkendt = punkt.status === "GODKENDT";
  return (
    <li className={`punkt ${godkendt ? "godkendt" : "udkast"} ${klasse}`}>
      <div className="punktTekst">{children}</div>
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

function KildeLink({ kilde, id }: { kilde: Kilde | undefined; id: string }) {
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
