import type { ReferralDraftFoundation } from "@/clinical/prototypes/clinical-document-workspace/selectors";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ReferralDraftFoundations({
  foundations
}: {
  foundations: readonly ReferralDraftFoundation[];
}) {
  if (!foundations.length) return null;

  return (
    <section
      className={styles.referralFoundations}
      aria-labelledby="prototype-referral-foundations-title"
    >
      <header>
        <p className={styles.eyebrow}>OUTPUT-FUNDAMENT</p>
        <h2 id="prototype-referral-foundations-title">Henvisningsudkast</h2>
        <p>Kun struktureret grundlag vises i Phase 3. Ingen henvisning genereres eller sendes.</p>
      </header>
      <ul>
        {foundations.map((foundation) => (
          <li key={foundation.id}>
            <div>
              <strong>{foundation.label}</strong>
              <span>{foundation.detail}</span>
            </div>
            <span data-status={foundation.status}>
              {foundation.status === "foundation-recorded"
                ? "Grundlag registreret"
                : "Mangler oplysninger"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
