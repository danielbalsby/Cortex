import type { Dispatch } from "react";

import {
  NORMAL_BASIC_FINDINGS,
  type ClinicalDocumentPrototypeState
} from "@/clinical/prototypes/clinical-document-workspace/model";
import {
  setFactAction,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace/reducer";
import {
  getNormalFindingStatus,
  getObjectiveContext
} from "@/clinical/prototypes/clinical-document-workspace/selectors";

import { ChoiceGroup } from "./ChoiceGroup";
import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ObjectiveSection({
  state,
  dispatch
}: {
  state: ClinicalDocumentPrototypeState;
  dispatch: Dispatch<WorkspaceAction>;
}) {
  const { facts, normalGroup } = state;

  return (
    <div className={styles.clinicalControls}>
      <p className={styles.sectionLead}>{getObjectiveContext(state)}</p>

      <div className={styles.normalGroup}>
        <div>
          <strong>Basisundersøgelse</strong>
          <p>Bekræftelsen udfylder kun urørte fund og overskriver aldrig positive fund.</p>
        </div>
        <button
          type="button"
          className={styles.primaryAction}
          onClick={() =>
            dispatch({
              type: normalGroup.confirmed ? "clear-normal-group" : "confirm-normal-group"
            })
          }
        >
          {normalGroup.confirmed
            ? "Fjern grupperet bekræftelse"
            : "Bekræft basisundersøgelse normal"}
        </button>
        <details>
          <summary>Vis hvilke fund handlingen bekræfter</summary>
          <ul>
            {NORMAL_BASIC_FINDINGS.map((finding) => (
              <li key={finding.key}>
                {finding.label}
                <span data-status={getNormalFindingStatus(state, finding)}>
                  {getNormalFindingStatus(state, finding) === "confirmed"
                    ? "Bekræftet af gruppen"
                    : getNormalFindingStatus(state, finding) === "overridden"
                      ? "Erstattet af registreret fund"
                      : getNormalFindingStatus(state, finding) === "recorded-independently"
                        ? "Registreret særskilt"
                        : "Urørt"}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>

      <details className={styles.clinicalDisclosure}>
        <summary>Registrér fund og undtagelser</summary>
        <div className={styles.controlGrid}>
          <ChoiceGroup<"unaffected" | "mildly-affected" | "clearly-affected">
            label="Almentilstand"
            value={facts.generalCondition}
            options={[
              { value: "unaffected", label: "Upåvirket" },
              { value: "mildly-affected", label: "Let påvirket" },
              { value: "clearly-affected", label: "Tydeligt påvirket" }
            ]}
            onChange={(value) => dispatch(setFactAction("generalCondition", value))}
          />
          <ChoiceGroup<"normal" | "limp" | "unable">
            label="Gang"
            value={facts.gait}
            options={[
              { value: "normal", label: "Normal" },
              { value: "limp", label: "Haltende" },
              { value: "unable", label: "Kan ikke støtte" }
            ]}
            onChange={(value) => dispatch(setFactAction("gait", value))}
          />
          <ChoiceGroup<"none" | "present">
            label="Deformitet"
            value={facts.deformity}
            options={[
              { value: "none", label: "Ingen" },
              { value: "present", label: "Tilstede" }
            ]}
            onChange={(value) => dispatch(setFactAction("deformity", value))}
          />
          <ChoiceGroup<"none" | "present">
            label="Rødme"
            value={facts.redness}
            options={[
              { value: "none", label: "Ingen" },
              { value: "present", label: "Tilstede" }
            ]}
            onChange={(value) => dispatch(setFactAction("redness", value))}
          />
          <ChoiceGroup<"none" | "present">
            label="Varme"
            value={facts.warmth}
            options={[
              { value: "none", label: "Ingen" },
              { value: "present", label: "Tilstede" }
            ]}
            onChange={(value) => dispatch(setFactAction("warmth", value))}
          />
          <ChoiceGroup<"none-significant" | "mild" | "moderate" | "large">
            label="Effusion"
            value={facts.effusion}
            options={[
              { value: "none-significant", label: "Ingen betydende" },
              { value: "mild", label: "Let" },
              { value: "moderate", label: "Moderat" },
              { value: "large", label: "Stor/spændt" }
            ]}
            onChange={(value) => dispatch(setFactAction("effusion", value))}
          />
          <ChoiceGroup<"full" | "reduced" | "blocked">
            label="Ekstension"
            value={facts.extension}
            options={[
              { value: "full", label: "Fuld" },
              { value: "reduced", label: "Reduceret" },
              { value: "blocked", label: "Mekanisk blokeret" }
            ]}
            onChange={(value) => dispatch(setFactAction("extension", value))}
          />
          <ChoiceGroup<"intact" | "not-intact">
            label="Straight-leg raise"
            value={facts.straightLegRaise}
            options={[
              { value: "intact", label: "Intakt" },
              { value: "not-intact", label: "Ikke mulig" }
            ]}
            onChange={(value) => dispatch(setFactAction("straightLegRaise", value))}
          />
          <ChoiceGroup<"none-focal" | "medial-joint-line" | "lateral-joint-line">
            label="Ledlinjeømhed"
            value={facts.tenderness}
            options={[
              { value: "none-focal", label: "Ingen fokal" },
              { value: "medial-joint-line", label: "Medial" },
              { value: "lateral-joint-line", label: "Lateral" }
            ]}
            onChange={(value) => dispatch(setFactAction("tenderness", value))}
          />
        </div>
      </details>

      {state.mode === "standard" ? (
        <label className={styles.textField}>
          <span>Supplerende objektive fund</span>
          <textarea
            value={facts.objectiveNote ?? ""}
            onChange={(event) => dispatch(setFactAction("objectiveNote", event.target.value))}
            rows={2}
          />
        </label>
      ) : facts.objectiveNote ? (
        <p className={styles.preservedNotice}>Yderligere objektive oplysninger er bevaret i Standard.</p>
      ) : null}
    </div>
  );
}
