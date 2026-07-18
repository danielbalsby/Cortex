import {
  CLINICAL_DOCUMENT_CONTEXT,
  CLINICAL_DOCUMENT_SECTIONS,
  type PrototypeMode
} from "@/clinical/prototypes/clinical-document-workspace/model";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

const SECTION_GUIDANCE = {
  history: "Kliniske historikfelter tilføjes i Phase 2.",
  objective: "Grupperede normalfund og positive undtagelser tilføjes i Phase 2.",
  assessment: "Forslag og samtidige arbejdshypoteser tilføjes i Phase 2.",
  plan: "Planhandlinger og eksplicit billeddiagnostisk status tilføjes i Phase 2."
} as const;

export function ClinicalDocument({ mode }: { mode: PrototypeMode }) {
  return (
    <article className={styles.documentSurface} aria-labelledby="prototype-document-title">
      <header className={styles.documentHeader}>
        <div>
          <p className={styles.eyebrow}>KLINISK DOKUMENT</p>
          <h1 id="prototype-document-title">Knæsmerter</h1>
          <p className={styles.problemContext}>
            <strong>Problem:</strong> {CLINICAL_DOCUMENT_CONTEXT.problemLabel}
          </p>
        </div>
        <p className={styles.modeSummary}>
          <span>Aktiv visning</span>
          <strong>{mode === "quick" ? "Quick" : "Standard"}</strong>
        </p>
      </header>

      <p className={styles.foundationNotice}>
        Tomt prototypegrundlag. Urørte kliniske felter er ikke dokumenteret eller vurderet.
      </p>

      {CLINICAL_DOCUMENT_SECTIONS.map((section) => (
        <section
          className={styles.documentSection}
          id={`prototype-${section.id}`}
          key={section.id}
          aria-labelledby={`prototype-${section.id}-title`}
        >
          <header>
            <span aria-hidden="true">{section.number}</span>
            <h2 id={`prototype-${section.id}-title`}>{section.label}</h2>
          </header>
          <div className={styles.sectionNarrative}>
            <p>{section.placeholder}</p>
            <small>{SECTION_GUIDANCE[section.id]}</small>
          </div>
        </section>
      ))}
    </article>
  );
}
