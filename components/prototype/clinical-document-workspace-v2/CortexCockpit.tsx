import type { CockpitView, FocusTargetId } from "@/clinical/prototypes/clinical-document-workspace-v2/presentation";

import styles from "./ClinicalDocumentWorkspaceV2.module.css";

export function CortexCockpit({
  cockpit,
  onNavigate
}: {
  cockpit: CockpitView;
  onNavigate: (target: FocusTargetId) => void;
}) {
  return (
    <section className={styles.cockpit} aria-labelledby="v2-cockpit-title">
      <header>
        <p className={styles.eyebrow}>CORTEX OVERBLIK</p>
        <h2 id="v2-cockpit-title">Cockpit</h2>
      </header>

      <p className={styles.situationLine}>{cockpit.situation}</p>

      <div className={styles.cockpitBlock}>
        <strong>Registreret</strong>
        {cockpit.recorded.length ? (
          <div>
            {cockpit.recorded.map((item) => (
              <span className={styles.recordChip} key={item}>
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
            Ingen positive fund endnu — urørt er ikke det samme som normalt.
          </p>
        )}
      </div>

      <div className={styles.cockpitBlock}>
        <strong>Manglende</strong>
        {cockpit.gaps.length ? (
          <ul className={styles.cockpitList}>
            {cockpit.gaps.map((gap) => (
              <li key={gap.id}>
                <button
                  type="button"
                  className={styles.gapButton}
                  onClick={() => onNavigate(gap.focusTarget)}
                >
                  ○ {gap.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
            Ingen foreslåede mangler i Quick-orienteringen.
          </p>
        )}
      </div>

      <div className={styles.cockpitBlock}>
        <strong>Opmærksomhed</strong>
        {cockpit.attention.length ? (
          <ul className={styles.cockpitList}>
            {cockpit.attention.map((point) => (
              <li key={point.id}>
                <button
                  type="button"
                  className={styles.attentionButton}
                  onClick={() =>
                    onNavigate(
                      point.id === "fracture-screening" || point.id === "locking"
                        ? "history-function"
                        : "objective-exam"
                    )
                  }
                  title={point.detail}
                >
                  ⚠ {point.title}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
            Ingen aktive opmærksomhedspunkter.
          </p>
        )}
      </div>

      <div className={styles.cockpitBlock}>
        <strong>Klinikerens vurdering</strong>
        {cockpit.diagnoses.length ? (
          <ul className={styles.cockpitList}>
            {cockpit.diagnoses.map((label) => (
              <li key={label}>
                <button
                  type="button"
                  className={styles.assessButton}
                  onClick={() => onNavigate("assessment")}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>Ikke valgt.</p>
        )}
      </div>

      <div className={styles.cockpitJump}>
        <button type="button" onClick={() => onNavigate("assessment")}>
          Hop til vurdering
        </button>
        <button type="button" onClick={() => onNavigate("plan")}>
          Hop til plan
        </button>
        <button type="button" onClick={() => onNavigate("journal")}>
          Hop til journal
        </button>
      </div>

      <p className={styles.disclaimer}>
        Fravær af opmærksomhedspunkter bekræfter ikke klinisk sikkerhed. Cockpit navigerer — den
        beslutter ikke.
      </p>
    </section>
  );
}
