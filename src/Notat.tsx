export type KopiStatus = "" | "ok" | "fejl";

type Props = { tekst: string; status: KopiStatus; onKopier: () => void };

export function Notat({ tekst, status, onKopier }: Props) {
  return (
    <div className="notat">
      <div className="notatTop">
        <h2>Notat</h2>
        <span className="notatHandling">
          {status === "ok" && <span role="status">Kopieret</span>}
          {status === "fejl" && (
            <span role="status" className="fejl">
              Kopiering afvist af browseren – markér teksten og kopiér manuelt
            </span>
          )}
          <button className="kopier" onClick={onKopier} disabled={!tekst}>
            Kopiér <kbd>Ctrl</kbd>
            <kbd>⏎</kbd>
          </button>
        </span>
      </div>
      {tekst ? (
        <pre className="notatTekst" aria-label="Notat">
          {tekst}
        </pre>
      ) : (
        <p className="tom">Tomt. Notatet indeholder kun det, du aktivt vælger.</p>
      )}
    </div>
  );
}
