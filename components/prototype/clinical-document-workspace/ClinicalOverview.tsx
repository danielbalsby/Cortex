import type { ClinicalOverviewItem } from "@/clinical/prototypes/clinical-document-workspace/selectors";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ClinicalOverview({ items }: { items: readonly ClinicalOverviewItem[] }) {
  return (
    <section className={styles.overviewPanel} aria-labelledby="prototype-overview-title">
      <header>
        <p className={styles.eyebrow}>VEDVARENDE OVERBLIK</p>
        <h2 id="prototype-overview-title">Klinisk overblik</h2>
        <p>Afledt af den samme tomme prototypetilstand som dokumentet og journalen.</p>
      </header>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>

      <p className={styles.overviewDisclaimer}>
        Fravær af opmærksomhedspunkter er ikke vurderet i Phase 1 og bekræfter ikke klinisk
        sikkerhed.
      </p>
    </section>
  );
}
