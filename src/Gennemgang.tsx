import { INDHOLD } from "../indhold";
import type { Kilde, Kildebelagt, Region } from "../indhold/typer";
import { fremhaevTekst, konflikter } from "../lib/gennemgang";
import { optael } from "../lib/status";
import { KildeLink } from "./Beslutningsstoette";
import { REGIONER } from "./regioner";

// Samlet oversigt til lægens gennemgang: alle røde flag og alle konflikter på
// tværs af regionerne. Viser kun indholdsfilernes tekst; tilføjer intet klinisk.

export function Gennemgang() {
  const regioner = REGIONER.map((item) => INDHOLD[item.id]).filter((region): region is Region => Boolean(region));
  const total = regioner.map(optael).reduce(
    (sum, t) => ({ punkter: sum.punkter + t.punkter, udkast: sum.udkast + t.udkast, konflikter: sum.konflikter + t.konflikter }),
    { punkter: 0, udkast: 0, konflikter: 0 }
  );
  const flag = regioner.reduce((sum, region) => sum + region.roedeFlag.length, 0);

  return (
    <main className="gennemgang">
      <h1>Gennemgang af klinisk indhold</h1>
      <p className="lille">
        {total.punkter} punkter i alt · {total.udkast} UDKAST · {flag} røde flag · {total.konflikter} konflikter. Svar fx
        med regionen og id'et: "knæ flag-fraktur: godkendt" eller "ankel flag-neuropati: ret handlingen til …".
      </p>
      <p className="lille">
        "Fremhæves når" er Claudes oversættelse til appens felter – den står ikke i kilderne og skal også godkendes.
      </p>

      {regioner.map((region) => {
        const kilder = new Map(region.kilder.map((kilde) => [kilde.id, kilde]));
        const regionKonflikter = konflikter(region);
        return (
          <section key={region.id} className="gennemgangRegion">
            <h2>
              {region.navn} <span className="gruppeHint">{region.roedeFlag.length} røde flag · {regionKonflikter.length} konflikter</span>
            </h2>

            <h3>Røde flag</h3>
            <ol className="gennemgangListe">
              {region.roedeFlag.map((item) => (
                <li key={item.id}>
                  <Hoved id={item.id} punkt={item} kilder={kilder} />
                  <p>{item.tekst}</p>
                  <p>
                    <strong>Handling:</strong> {item.handling}
                  </p>
                  <p className="kendetegn">
                    <strong>Fremhæves når:</strong> {fremhaevTekst(region, item.fremhaevHvis)}
                  </p>
                </li>
              ))}
            </ol>

            {regionKonflikter.length > 0 && (
              <>
                <h3>Konflikter mellem kilder</h3>
                <ol className="gennemgangListe">
                  {regionKonflikter.map((linje) => (
                    <li key={linje.id}>
                      <Hoved id={linje.id} punkt={linje.punkt} kilder={kilder} type={linje.type} />
                      <p className="kendetegn">{linje.titel}</p>
                      <p>{linje.punkt.konflikt?.beskrivelse}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </section>
        );
      })}
    </main>
  );
}

function Hoved({ id, punkt, kilder, type }: { id: string; punkt: Kildebelagt; kilder: Map<string, Kilde>; type?: string }) {
  return (
    <div className="punktMeta">
      <code className="gennemgangId">{id}</code>
      {type && <span className="kendetegn">{type}</span>}
      {punkt.kilder.length === 0 ? (
        <span className="maerke mangler">KILDE MANGLER</span>
      ) : (
        punkt.kilder.map((kildeId) => <KildeLink key={kildeId} kilde={kilder.get(kildeId)} id={kildeId} />)
      )}
      <span className={punkt.status === "GODKENDT" ? "maerke ok" : "maerke kladde"}>
        {punkt.status === "GODKENDT" ? `✓ GODKENDT ${punkt.godkendtDato ?? ""}` : "UDKAST"}
      </span>
    </div>
  );
}
