import { CLINICAL_DOCUMENT_SECTIONS } from "@/clinical/prototypes/clinical-document-workspace/model";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function SectionNavigator() {
  return (
    <nav className={styles.sectionNavigator} aria-label="Dokumentsektioner">
      {CLINICAL_DOCUMENT_SECTIONS.map((section) => (
        <a key={section.id} href={`#prototype-${section.id}`}>
          <span aria-hidden="true">{section.number}</span>
          {section.label}
        </a>
      ))}
      <a href="#prototype-journal">
        <span aria-hidden="true">05</span>
        Journal
      </a>
    </nav>
  );
}
