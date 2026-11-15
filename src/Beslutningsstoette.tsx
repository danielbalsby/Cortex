import type { ReactNode } from "react";

import type { Kilde, Kildebelagt, Region, Svar } from "../indhold/typer";
import { sorterFlag, type FlagStatus } from "../lib/flag";

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
    <Punkt
      key={beh.id}
      punkt={beh}
      kilder={kilder}
      titel={<span className="laangTitel">{beh.tekst}</span>}
      valg={{ label: "P", valgt: valgte.includes(beh.id), onVaelg: () => onVaelg(beh.id) }}
    >
      {beh.gaelderFor && beh.gaelderFor.length > 0 && (
        <span className="kendetegn">Gælder: {beh.gaelderFor.map((id) => diagnoseNavn.get(id) ?? id).join(", ")}</span>
      )}
    </Punkt>
  );

  const { matcher, oevrige: oevrigeFlag } = sorterFlag(region, svar);
  const flagPunkt = ({ flag, status }: (typeof matcher)[number]) => (
    <Punkt
      key={flag.id}
      punkt={flag}
      kilder={kilder}
      klasse={status === "matcher" ? "flag fremhaevet" : "flag"}
      titel={<FlagTitel tekst={flag.tekst} />}
      markering={<FlagMaerke status={status} />}
    >
      <FlagRest tekst={flag.tekst} />
      <span className="handling">→ {flag.handling}</span>
      <span className="flagStatus">{FLAG_FORKLARING[status]}</span>
    </Punkt>
  );

  return (
    <div className="stoette" key={region.id}>
      <section>
        <h2>
          Røde flag <span className="antal">({region.roedeFlag.length})</span>
        </h2>
        {region.roedeFlag.length === 0 ? (
          <p className="tom">Intet indhold endnu.</p>
        ) : (
          <ul className="punkter">
            {matcher.length > 0 && <li className="gruppeTitel fremhaevetTitel">Matcher dine valg ({matcher.length})</li>}
            {matcher.map(flagPunkt)}
            {matcher.length > 0 && oevrigeFlag.length > 0 && (
              <li className="gruppeTitel">Øvrige flag ({oevrigeFlag.length})</li>
            )}
            {oevrigeFlag.map(flagPunkt)}
          </ul>
        )}
      </section>

      <Sektion titel="Differentialdiagnoser" antal={region.differentialdiagnoser.length} hint="V = til vurdering i notatet">
        {region.differentialdiagnoser.map((diff) => (
          <Punkt
            key={diff.id}
            punkt={diff}
            kilder={kilder}
            titel={<strong>{diff.navn}</strong>}
            valg={{ label: "V", valgt: valgte.includes(diff.id), onVaelg: () => onVaelg(diff.id) }}
          >
            {diff.kendetegn.length > 0 && <span className="kendetegn">{diff.kendetegn.join(" · ")}</span>}
          </Punkt>
        ))}
      </Sektion>

      <Sektion
        titel="Behandling"
        antal={region.behandling.length}
        hint={valgteDiagnoser.length ? "Vist for valgt diagnose · P = til plan" : "P = til plan i notatet"}
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

      <Sektion titel="Henvisning" antal={region.henvisning.length} hint="P = til plan i notatet">
        {region.henvisning.map((henvisning) => (
          <Punkt
            key={henvisning.id}
            punkt={henvisning}
            kilder={kilder}
            titel={
              <strong>
                {henvisning.til}
                {henvisning.hast && <span className="hast"> · {henvisning.hast}</span>}
              </strong>
            }
            valg={{ label: "P", valgt: valgte.includes(henvisning.id), onVaelg: () => onVaelg(henvisning.id) }}
          >
            <span>{henvisning.kriterier}</span>
            <span className="kendetegn">Gælder: {henvisning.gyldighed}</span>
          </Punkt>
        ))}
      </Sektion>
    </div>
  );
}

// Forklaring af flagets status, vist når flaget foldes ud. "Ikke fremhævet" er ikke "udelukket".
const FLAG_FORKLARING: Record<FlagStatus, string> = {
  matcher: "Matcher dine valg.",
  "ikke-vurderet": "Ikke vurderet: felter, fremhævningen afhænger af, er ikke udfyldt. Flaget er ikke udelukket.",
  "ikke-opfyldt": "Ikke fremhævet af de valg, du har registreret. Det udelukker ikke flaget.",
  "uden-betingelse": ""
};

function FlagMaerke({ status }: { status: FlagStatus }) {
  if (status === "matcher") return <span className="match">Matcher</span>;
  if (status === "ikke-vurderet") return <span className="ikkeVurderet">ikke vurderet</span>;
  return null;
}

/** Flagets titel er teksten før første kolon; uden kolon er hele teksten titlen. */
function FlagTitel({ tekst }: { tekst: string }) {
  const kolon = tekst.indexOf(": ");
  return <strong className="flagTitel">{kolon === -1 ? tekst : tekst.slice(0, kolon + 1)}</strong>;
}

function FlagRest({ tekst }: { tekst: string }) {
  const kolon = tekst.indexOf(": ");
  return kolon === -1 ? null : <span>{tekst.slice(kolon + 2)}</span>;
}

function Sektion({ titel, antal, hint, children }: { titel: string; antal: number; hint?: string; children: ReactNode }) {
  return (
    <section>
      {antal === 0 ? (
        <>
          <h2>{titel} <span className="antal">(0)</span></h2>
          <p className="tom">Intet indhold endnu.</p>
        </>
      ) : (
        <details className="sektion">
          <summary>
            <h2>
              {titel} <span className="antal">({antal})</span>
              {hint && <span className="gruppeHint">{hint}</span>}
            </h2>
          </summary>
          <ul className="punkter">{children}</ul>
        </details>
      )}
    </section>
  );
}

/**
 * Ét kildebelagt punkt. Sammenfoldet vises kun titlen (og evt. markering);
 * fuld tekst, kilder, status og kildekonflikt vises, når punktet foldes ud.
 * Handlingsanbefalingen (children) følger altid med sit eget punkt.
 */
function Punkt({
  punkt,
  kilder,
  klasse = "",
  titel,
  markering,
  valg,
  children
}: {
  punkt: Kildebelagt;
  kilder: Map<string, Kilde>;
  klasse?: string;
  titel: ReactNode;
  markering?: ReactNode;
  valg?: { label: string; valgt: boolean; onVaelg: () => void };
  children: ReactNode;
}) {
  const godkendt = punkt.status === "GODKENDT";
  return (
    <li className={`punkt ${valg?.valgt ? "valgtPunkt" : ""} ${klasse}`}>
      <div className="punktRaekke">
        <details className="punktDetaljer">
          <summary>
            <span className="titelLinje">{titel}</span>
            {markering}
          </summary>
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
            <div className="konflikt">
              <strong>⚠ Kilderne er uenige</strong>
              <p>{punkt.konflikt.beskrivelse}</p>
              <p>
                {punkt.konflikt.kilder.map((id) => (
                  <KildeLink key={id} kilde={kilder.get(id)} id={id} />
                ))}
              </p>
            </div>
          )}
        </details>
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
