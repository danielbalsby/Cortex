import { useState, type Dispatch, type FormEvent } from "react";

import type { ClinicalDocumentPrototypeState } from "@/clinical/prototypes/clinical-document-workspace/model";
import type { WorkspaceAction } from "@/clinical/prototypes/clinical-document-workspace/reducer";
import { getPrototypeSuggestions } from "@/clinical/prototypes/clinical-document-workspace/selectors";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function AssessmentSection({
  state,
  dispatch
}: {
  state: ClinicalDocumentPrototypeState;
  dispatch: Dispatch<WorkspaceAction>;
}) {
  const [showMore, setShowMore] = useState(false);
  const [freeText, setFreeText] = useState("");
  const suggestions = getPrototypeSuggestions(state);
  const visible = showMore
    ? [...suggestions.primary, ...suggestions.additional]
    : suggestions.primary;

  function addFreeText(event: FormEvent) {
    event.preventDefault();
    const label = freeText.trim();
    if (!label) return;
    dispatch({
      type: "add-diagnosis",
      diagnosis: {
        id: `free-${label.toLocaleLowerCase("da").replace(/[^a-z0-9æøå]+/g, "-")}`,
        label,
        source: "free-text"
      }
    });
    setFreeText("");
  }

  return (
    <div className={styles.clinicalControls}>
      <p className={styles.sectionLead}>
        {state.workingDiagnoses.length
          ? "Arbejdshypoteser er klinikerens eksplicit valgte vurderinger."
          : "Ingen arbejdshypoteser registreret."}
      </p>

      {visible.length ? (
        <div className={styles.suggestionArea} aria-label="Diagnostiske forslag">
          <header>
            <div>
              <strong>Mulige arbejdshypoteser</strong>
              <p>Demonstrationsforslag – ikke sandsynligheder og ikke klinisk valideret.</p>
            </div>
            {suggestions.additional.length ? (
              <button type="button" onClick={() => setShowMore((current) => !current)}>
                {showMore ? "Vis færre" : "Vis flere"}
              </button>
            ) : null}
          </header>
          <ul>
            {visible.map((suggestion) => {
              const selected = state.workingDiagnoses.some(
                (diagnosis) => diagnosis.id === suggestion.id
              );
              return (
                <li key={suggestion.id}>
                  <div>
                    <strong>{suggestion.label}</strong>
                    <span>{suggestion.reason}</span>
                  </div>
                  <button
                    type="button"
                    disabled={selected}
                    onClick={() =>
                      dispatch({
                        type: "add-diagnosis",
                        diagnosis: {
                          id: suggestion.id,
                          label: suggestion.label,
                          source: "suggestion"
                        }
                      })
                    }
                  >
                    {selected ? "Tilføjet" : "Tilføj"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className={styles.emptySupport}>Ingen forslag vises uden relevante registrerede oplysninger.</p>
      )}

      <div className={styles.diagnosisList}>
        <h3>Valgte arbejdshypoteser</h3>
        {state.workingDiagnoses.length ? (
          <ol>
            {state.workingDiagnoses.map((diagnosis, index) => (
              <li key={diagnosis.id}>
                <div>
                  <span>{index === 0 ? "Primær arbejdshypotese" : "Samtidig arbejdshypotese"}</span>
                  <strong>{diagnosis.label}</strong>
                </div>
                <div className={styles.inlineActions}>
                  <button
                    type="button"
                    disabled={index === 0}
                    aria-label={`Flyt ${diagnosis.label} op`}
                    onClick={() =>
                      dispatch({ type: "move-diagnosis", id: diagnosis.id, direction: -1 })
                    }
                  >
                    Op
                  </button>
                  <button
                    type="button"
                    disabled={index === state.workingDiagnoses.length - 1}
                    aria-label={`Flyt ${diagnosis.label} ned`}
                    onClick={() =>
                      dispatch({ type: "move-diagnosis", id: diagnosis.id, direction: 1 })
                    }
                  >
                    Ned
                  </button>
                  <button
                    type="button"
                    aria-label={`Fjern ${diagnosis.label}`}
                    onClick={() => dispatch({ type: "remove-diagnosis", id: diagnosis.id })}
                  >
                    Fjern
                  </button>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p>Ingen valgt.</p>
        )}
        <form className={styles.inlineForm} onSubmit={addFreeText}>
          <label>
            <span>Anden arbejdshypotese</span>
            <input value={freeText} onChange={(event) => setFreeText(event.target.value)} />
          </label>
          <button type="submit">Tilføj</button>
        </form>
      </div>
    </div>
  );
}
