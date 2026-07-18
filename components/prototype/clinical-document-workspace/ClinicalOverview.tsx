import type { ClinicalOverviewItem } from "@/clinical/prototypes/clinical-document-workspace/selectors";
import type { PrototypeAttentionPoint } from "@/clinical/prototypes/clinical-document-workspace/selectors";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ClinicalOverview({
  items,
  attentionPoints
}: {
  items: readonly ClinicalOverviewItem[];
  attentionPoints: readonly PrototypeAttentionPoint[];
}) {
  return (
    <section className={styles.overviewPanel} aria-labelledby="prototype-overview-title">
      <header>
        <p className={styles.eyebrow}>VEDVARENDE OVERBLIK</p>
        <h2 id="prototype-overview-title">Klinisk overblik</h2>
        <p>Afledt af den samme eksplicit registrerede prototypetilstand som dokumentet.</p>
      </header>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>

      {attentionPoints.length ? (
        <div className={styles.attentionArea} aria-label="Kliniske opmærksomhedspunkter">
          <strong>Kliniske opmærksomhedspunkter</strong>
          {attentionPoints.map((point) => (
            <div key={point.id}>
              <span>{point.title}</span>
              <p>{point.detail}</p>
            </div>
          ))}
        </div>
      ) : null}

      <p className={styles.overviewDisclaimer}>
        Fravær af opmærksomhedspunkter bekræfter ikke klinisk
        sikkerhed.
      </p>
    </section>
  );
}
