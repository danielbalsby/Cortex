"use client";

import { useState, type Dispatch, type FormEvent } from "react";

import type { PrototypeStateV3 } from "@/clinical/prototypes/clinical-document-workspace-v3/model";
import type { WorkspaceActionV3 } from "@/clinical/prototypes/clinical-document-workspace-v3/reducer";

import styles from "./ClinicalDocumentWorkspaceV3.module.css";

/**
 * Assessment stays entirely clinician-owned. There is no suggestion engine,
 * no rule-based diagnosis and no acute action logic in this iteration. The
 * "clinical attention" note below is a static, clearly-scoped, non-deciding
 * prototype placeholder — it never reacts to facts and never recommends
 * anything.
 */
export function AssessmentSection({
  state,
  dispatch
}: {
  state: PrototypeStateV3;
  dispatch: Dispatch<WorkspaceActionV3>;
}) {
  const [freeText, setFreeText] = useState("");

  function addDiagnosis(event: FormEvent) {
    event.preventDefault();
    const label = freeText.trim();
    if (!label) return;
    dispatch({
      type: "add-diagnosis",
      diagnosis: {
        id: `dx-${label.toLocaleLowerCase("da").replace(/[^a-z0-9æøå]+/g, "-")}-${Date.now()}`,
        label
      }
    });
    setFreeText("");
  }

  return (
    <section className={styles.documentSection} aria-labelledby="v3-assessment-title">
      <div className={styles.sectionLabel}>
        <span aria-hidden="true">A</span>
        <h2 id="v3-assessment-title">Vurdering</h2>
      </div>

      <div className={styles.linearGroups}>
        <label className={styles.textField} id="v3-assessment-note">
          <span>Klinikerens vurdering</span>
          <textarea
            value={state.assessmentNote}
            onChange={(event) => dispatch({ type: "set-assessment-note", value: event.target.value })}
            rows={3}
            placeholder="Egen klinisk vurdering…"
          />
        </label>

        <div className={styles.diagnosisList}>
          <h3>Arbejdshypoteser</h3>
          {state.workingDiagnoses.length ? (
            <ul>
              {state.workingDiagnoses.map((diagnosis) => (
                <li key={diagnosis.id}>
                  <span>{diagnosis.label}</span>
                  <button
                    type="button"
                    aria-label={`Fjern ${diagnosis.label}`}
                    onClick={() => dispatch({ type: "remove-diagnosis", id: diagnosis.id })}
                  >
                    Fjern
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.mutedLine}>Ingen tilføjet.</p>
          )}
          <form className={styles.inlineForm} onSubmit={addDiagnosis}>
            <label>
              <span>Tilføj arbejdshypotese</span>
              <input value={freeText} onChange={(event) => setFreeText(event.target.value)} />
            </label>
            <button type="submit">Tilføj</button>
          </form>
        </div>

        <div className={styles.attentionPlaceholder} role="note">
          <strong>Klinisk opmærksomhed (prototype)</strong>
          <p>
            Denne prototype viser ingen automatiske kliniske forslag, regelbaserede alarmer eller
            akutte handlingsanbefalinger. Vurdering og opmærksomhed er alene lægens ansvar.
          </p>
        </div>
      </div>
    </section>
  );
}
