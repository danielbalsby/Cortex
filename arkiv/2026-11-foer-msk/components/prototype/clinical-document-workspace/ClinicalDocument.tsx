import type { Dispatch } from "react";

import {
  CLINICAL_DOCUMENT_CONTEXT,
  CLINICAL_DOCUMENT_SECTIONS,
  type ClinicalDocumentPrototypeState
} from "@/clinical/prototypes/clinical-document-workspace/model";
import type { WorkspaceAction } from "@/clinical/prototypes/clinical-document-workspace/reducer";

import { AssessmentSection } from "./AssessmentSection";
import { HistorySection } from "./HistorySection";
import { ObjectiveSection } from "./ObjectiveSection";
import { PlanSection } from "./PlanSection";
import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ClinicalDocument({
  state,
  dispatch
}: {
  state: ClinicalDocumentPrototypeState;
  dispatch: Dispatch<WorkspaceAction>;
}) {
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
          <strong>{state.mode === "quick" ? "Quick" : "Standard"}</strong>
        </p>
      </header>

      <p className={styles.foundationNotice}>
        Urørte kliniske felter er ikke dokumenteret eller vurderet. Alle registreringer kræver eksplicit handling.
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
            {section.id === "history" ? <HistorySection state={state} dispatch={dispatch} /> : null}
            {section.id === "objective" ? <ObjectiveSection state={state} dispatch={dispatch} /> : null}
            {section.id === "assessment" ? <AssessmentSection state={state} dispatch={dispatch} /> : null}
            {section.id === "plan" ? <PlanSection state={state} dispatch={dispatch} /> : null}
          </div>
        </section>
      ))}
    </article>
  );
}
