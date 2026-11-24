import type { ReactNode } from "react";

import type { Kilde, Kildebelagt, Region, Svar } from "../indhold/typer";
import { sorterFlag, type FlagStatus } from "../lib/flag";
import { foreneligeDiagnoser, planForslag } from "../lib/forslag";
import { lrTekst, rangering, type Bidrag, type Rangeret } from "../lib/rangering";
import { kortTitel, planVisning } from "../lib/visning";

// Viser regionens kliniske punkter præcis som de står i indholdsfilen.
// Komponenten indeholder ingen klinisk tekst og drager ingen konklusioner.
// Lægen kan selv krydse diagnoser (→ V) og behandling/henvisning (→ P) af.

type Props = {
  region: Region;
  svar: Svar;
  valgte: readonly string[];
  onVaelg: (id: string) => void;
  onTagForslag: (ids: string[]) => void;
};

export function Beslutningsstoette({ region, svar, valgte, onVaelg, onTagForslag }: Props) {
  const kilder = new Map(region.kilder.map((kilde) => [kilde.id, kilde]));
  const diagnoseNavn = new Map(region.differentialdiagnoser.map((diff) => [diff.id, diff.navn]));

  // Progressive disclosure: skærmen tager udgangspunkt i lægens valg. Uden valgt diagnose vises
  // røde flag og diagnoser; behandling og henvisning ligger sammenfoldet. Med valgt diagnose vises
  // det, der hører til den – resten ligger sammenfoldet. Intet skjules helt (se lib/visning.ts).
  const visning = planVisning(region, valgte);
  const valgteDiagnoser = visning.diagnoser;
  const harDiagnose = valgteDiagnoser.length > 0;

  const { matcher, oevrige: oevrigeFlag } = sorterFlag(region, svar);
  const flagPunkt = ({ flag, status }: (typeof matcher)[number]) => {
    const { titel, rest } = kortTitel(flag.tekst);
    return (
      <Punkt
        key={flag.id}
        punkt={flag}
        kilder={kilder}
        klasse={status === "matcher" ? "flag fremhaevet" : "flag"}
        titel={<span className="flagTitel">{titel}</span>}
        markering={<FlagMaerke status={status} />}
        // Et flag, der matcher dine valg, viser sin handling uden udfoldning.
        under={status === "matcher" ? <span className="handling">→ {flag.handling}</span> : undefined}
      >
        {rest && <span>{rest}</span>}
        {status !== "matcher" && <span className="handling">→ {flag.handling}</span>}
        <span className="flagStatus">{FLAG_FORKLARING[status]}</span>
      </Punkt>
    );
  };

  // Rangering efter kildernes likelihood ratios (højst tre); øvrige forenelige diagnoser følger i filens rækkefølge.
  const rangerede = rangering(region, svar)
    .filter((r) => !valgte.includes(r.id))
    .slice(0, 3);
  const forenelige = foreneligeDiagnoser(region, svar).filter(
    (f) => !valgte.includes(f.id) && !rangerede.some((r) => r.id === f.id)
  );
  const plan = planForslag(region, svar, valgte);
  // Forslaget vises med den sætning, der kommer i P, så lægen ser præcis, hvad ét tryk skriver.
  const notatSaetning = (id: string) =>
    [...region.behandling, ...region.henvisning].find((punkt) => punkt.id === id)?.notat ?? id;

  const bidragTekst = (b: Bidrag) => `${b.fund} (${lrTekst(b.lr)})`;
  const diagnosePunkt = (
    diff: Region["differentialdiagnoser"][number],
    passerMed?: string[],
    klasse = "",
    rang?: Rangeret
  ) => (
    <Punkt
      key={diff.id}
      punkt={diff}
      kilder={kilder}
      klasse={klasse}
      titel={
        <span className="ombryd">
          <span className="navn">{diff.navn}</span>
          {passerMed && <span className="passerMed"> · {passerMed.join(", ")}</span>}
          {rang && (
            <span className="passerMed">
              {" "}
              · for: {rang.for.map(bidragTekst).join(", ")}
              {rang.imod.length > 0 && ` · imod: ${rang.imod.map(bidragTekst).join(", ")}`}
            </span>
          )}
        </span>
      }
      valg={{ label: "V", valgt: valgte.includes(diff.id), onVaelg: () => onVaelg(diff.id) }}
    >
      {diff.kendetegn.length > 0 && <span className="kendetegn">{diff.kendetegn.join(" · ")}</span>}
      {rang &&
        [...rang.for, ...rang.imod].map((b) => (
          <span key={b.fund} className="kendetegn">
            {bidragTekst(b)}
            {b.population && ` · ${b.population}`} ·{" "}
            {b.kilder.map((id) => (
              <KildeLink key={id} kilde={kilder.get(id)} id={id} />
            ))}
          </span>
        ))}
      {rang && (
        <span className="flagStatus">
          Forslag: rangeret efter kildernes likelihood ratios for dine fund – ikke en sandsynlighed. Forekomsten i
          almen praksis indgår ikke, og fund fra forskellige tests antages uafhængige. Andre diagnoser er ikke udelukket.
        </span>
      )}
      {passerMed && (
        <span className="flagStatus">
          Forslag: fremhævet, fordi dine fund passer med kildens beskrivelse. Andre diagnoser er ikke udelukket.
        </span>
      )}
    </Punkt>
  );

  // Behandling: titlen er den sætning, der skrives i P (kort og præcis); kildens fulde tekst ved udfoldning.
  const behandlingPunkt = (beh: Region["behandling"][number]) => (
    <Punkt
      key={beh.id}
      punkt={beh}
      kilder={kilder}
      titel={<span className="ombryd">{beh.notat}</span>}
      valg={{ label: "P", valgt: valgte.includes(beh.id), onVaelg: () => onVaelg(beh.id) }}
    >
      <span>{beh.tekst}</span>
      {beh.gaelderFor && beh.gaelderFor.length > 0 && (
        <span className="kendetegn">Gælder: {beh.gaelderFor.map((id) => diagnoseNavn.get(id) ?? id).join(", ")}</span>
      )}
    </Punkt>
  );

  const henvisningPunkt = (henvisning: Region["henvisning"][number]) => (
    <Punkt
      key={henvisning.id}
      punkt={henvisning}
      kilder={kilder}
      titel={
        <span className="ombryd">
          <span className="navn">{henvisning.til}</span>
          {henvisning.hast && <span className={`hast ${henvisning.hast}`}> · {henvisning.hast}</span>}
        </span>
      }
      valg={{ label: "P", valgt: valgte.includes(henvisning.id), onVaelg: () => onVaelg(henvisning.id) }}
    >
      <span>{henvisning.kriterier}</span>
      <span className="kendetegn">Gælder: {henvisning.gyldighed}</span>
    </Punkt>
  );

  // Planforslag vises én gang (som sætninger med ét tryk); de står derfor ikke også i listen nedenunder.
  const behandlingFremme = visning.behandling.naer.filter((b) => !plan.forslag.includes(b.id));
  const henvisningFremme = visning.henvisning.naer.filter((h) => !plan.forslag.includes(h.id));
  const valgtNavn = valgteDiagnoser.map((id) => diagnoseNavn.get(id)).join(" + ");

  return (
    <div className="stoette" key={region.id}>
      <section className="flagSektion">
        <h2>
          Røde flag <span className="antal">{region.roedeFlag.length}</span>
          {matcher.length > 0 && <span className="matchAntal">{matcher.length} matcher dine valg</span>}
        </h2>
        {region.roedeFlag.length === 0 ? (
          <p className="tom">Intet indhold endnu.</p>
        ) : (
          <ul className="punkter flagListe">
            {matcher.map(flagPunkt)}
            {oevrigeFlag.map(flagPunkt)}
          </ul>
        )}
      </section>

      <section className="forslag" aria-label="Diagnose">
        <h2>
          Diagnose <UdkastMaerke punkter={region.differentialdiagnoser} />
        </h2>
        <ul className="punkter">
          {region.differentialdiagnoser.filter((d) => valgte.includes(d.id)).map((d) => diagnosePunkt(d, undefined, "valgtDiagnose"))}
          {rangerede.length > 0 && <li className="gruppeTitel">Forslag · fundene taler mest for</li>}
          {rangerede.map((r) =>
            diagnosePunkt(region.differentialdiagnoser.find((d) => d.id === r.id)!, undefined, "forenelig rangeret", r)
          )}
          {forenelige.length > 0 && (
            <li className="gruppeTitel">
              Forslag · forenelig med dine fund
            </li>
          )}
          {forenelige.map((f) =>
            diagnosePunkt(region.differentialdiagnoser.find((d) => d.id === f.id)!, f.passerMed, "forenelig")
          )}
          {!harDiagnose && forenelige.length === 0 && rangerede.length === 0 && (
            <li className="tom">Vælg fund til venstre, eller vælg en diagnose på listen.</li>
          )}
          <Fold titel="Alle differentialdiagnoser" antal={region.differentialdiagnoser.length}>
            {region.differentialdiagnoser.map((d) => diagnosePunkt(d))}
          </Fold>
        </ul>
      </section>

      <section className="planSektion" aria-label="Plan">
        <h2>
          Plan{harDiagnose && <span className="forDiagnose"> · {valgtNavn}</span>}{" "}
          <UdkastMaerke punkter={[...region.behandling, ...region.henvisning]} />
        </h2>
        <ul className="punkter">
          {!harDiagnose && (
            <li className="tom">Vælg en diagnose (V) – så vises den behandling og henvisning, der hører til.</li>
          )}
          {plan.forslag.length > 0 && (
            <li className="planForslag">
              <span className="gruppeTitel">Forslag · skrives i P med ét tryk</span>
              <ul>
                {plan.forslag.map((id) => (
                  <li key={id}>{notatSaetning(id)}</li>
                ))}
              </ul>
              <button className="tagForslag" onClick={() => onTagForslag(plan.forslag)}>
                Tag med i P <kbd>A</kbd>
              </button>
            </li>
          )}
          {behandlingFremme.length > 0 && <li className="gruppeTitel">Behandling</li>}
          {behandlingFremme.map(behandlingPunkt)}
          {henvisningFremme.length > 0 && <li className="gruppeTitel">Henvisning</li>}
          {henvisningFremme.map(henvisningPunkt)}
          <Fold titel={harDiagnose ? "Øvrig behandling" : "Al behandling"} antal={visning.behandling.oevrige.length}>
            {visning.behandling.oevrige.map(behandlingPunkt)}
          </Fold>
          <Fold titel={harDiagnose ? "Øvrige henvisninger" : "Alle henvisninger"} antal={visning.henvisning.oevrige.length}>
            {visning.henvisning.oevrige.map(henvisningPunkt)}
          </Fold>
        </ul>
      </section>
    </div>
  );
}

/** Sammenfoldet liste. Alt, der ikke står fremme, ligger her og kan foldes ud; tom liste vises ikke. */
function Fold({ titel, antal, children }: { titel: string; antal: number; children: ReactNode }) {
  if (antal === 0) return null;
  return (
    <li className="oevrige">
      <details>
        <summary>
          {titel} <span className="antal">{antal}</span>
        </summary>
        <ul className="punkter stille">{children}</ul>
      </details>
    </li>
  );
}

/** Ét neutralt signal pr. sektion i stedet for et mærke på hver linje. Pr. punkt ses status ved udfoldning. */
function UdkastMaerke({ punkter }: { punkter: { status: string }[] }) {
  const udkast = punkter.filter((p) => p.status === "UDKAST").length;
  if (udkast === 0) return null;
  return (
    <span className="udkast" title="Ikke godkendt af dig. Status pr. punkt ses, når punktet foldes ud.">
      {udkast === punkter.length ? "udkast" : `${udkast} udkast`}
    </span>
  );
}

// Forklaring af flagets status, vist når flaget foldes ud. "Ikke fremhævet" er ikke "udelukket".
const FLAG_FORKLARING: Record<FlagStatus, string> = {
  matcher: "Matcher dine valg.",
  "ikke-vurderet": "Ikke vurderet: felter, fremhævningen afhænger af, er ikke udfyldt. Flaget er ikke udelukket.",
  "ikke-opfyldt": "Ikke fremhævet af de valg, du har registreret. Det udelukker ikke flaget.",
  "uden-betingelse": "Vurderes klinisk: ingen felter i Cortex kan fremhæve dette flag."
};

function FlagMaerke({ status }: { status: FlagStatus }) {
  if (status === "matcher") return <span className="match">Matcher</span>;
  if (status === "ikke-vurderet") return <span className="ikkeVurderet">ikke vurderet</span>;
  if (status === "uden-betingelse") return <span className="ikkeVurderet">vurderes klinisk</span>;
  return null;
}

/**
 * Smal stribe med alle røde flag (kun synlig i smalle vinduer, se styles.css):
 * matchende flag med fuld titel, øvrige med kort titel. Ingen flag udelades.
 */
export function FlagStribe({ region, svar }: { region: Region; svar: Svar }) {
  const { matcher, oevrige } = sorterFlag(region, svar);
  const titel = (tekst: string) => {
    const t = kortTitel(tekst).titel.replace(/:$/, "");
    return t.length > 45 ? `${t.slice(0, 44)}…` : t;
  };
  return (
    <aside className="flagStribe" aria-label="Røde flag (oversigt)">
      <span className="stribeTitel">
        Røde flag ({region.roedeFlag.length}){matcher.length > 0 && ` · ${matcher.length} matcher dine valg`}
      </span>
      {matcher.length > 0 && (
        <span className="stribeMatcher">
          {matcher.map(({ flag }) => (
            <span key={flag.id} className="stribeFlag">
              ! {titel(flag.tekst)}
            </span>
          ))}
        </span>
      )}
      <span className="stribeOevrige">{oevrige.map(({ flag }) => titel(flag.tekst)).join(" · ")}</span>
    </aside>
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
  under,
  children
}: {
  punkt: Kildebelagt;
  kilder: Map<string, Kilde>;
  klasse?: string;
  titel: ReactNode;
  markering?: ReactNode;
  valg?: { label: string; valgt: boolean; onVaelg: () => void };
  under?: ReactNode; // vises altid under titlen (kun til flag, der matcher)
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
      {under && <div className="under">{under}</div>}
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
