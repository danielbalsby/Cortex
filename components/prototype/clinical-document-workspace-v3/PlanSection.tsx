"use client";

import type { Dispatch } from "react";

import type { PainMedication, PlanAction, PrototypeStateV3 } from "@/clinical/prototypes/clinical-document-workspace-v3/model";
import type { WorkspaceActionV3 } from "@/clinical/prototypes/clinical-document-workspace-v3/reducer";

import { MultiChoiceGroup } from "./ChoiceControls";
import styles from "./ClinicalDocumentWorkspaceV3.module.css";

const PLAN_OPTIONS = [
  { value: "information", label: "Information" },
  { value: "activity", label: "Aktivitet" },
  { value: "exercise", label: "Træning" },
  { value: "physiotherapy", label: "Fysioterapi" },
  { value: "imaging", label: "Billeddiagnostik" }
] as const;
const PAIN_MEDICATION_OPTIONS = [
  { value: "paracetamol", label: "Paracetamol p.n." },
  { value: "nsaid", label: "Kortvarig NSAID efter kontraindikationsvurdering" }
] as const;

export function PlanSection({
  state,
  dispatch
}: {
  state: PrototypeStateV3;
  dispatch: Dispatch<WorkspaceActionV3>;
}) {
  return (
    <section className={styles.documentSection} aria-labelledby="v3-plan-title">
      <div className={styles.sectionLabel}>
        <span aria-hidden="true">P</span>
        <h2 id="v3-plan-title">Plan</h2>
      </div>

      <div className={styles.linearGroups}>
        <MultiChoiceGroup<PlanAction>
          id="v3-plan-actions"
          label="Plan"
          values={state.planActions}
          options={PLAN_OPTIONS}
          onToggle={(action) => dispatch({ type: "toggle-plan-action", action })}
        />

        <MultiChoiceGroup<PainMedication>
          id="v3-pain-medication"
          label="Smertebehandling"
          values={state.painMedications}
          options={PAIN_MEDICATION_OPTIONS}
          onToggle={(medication) => dispatch({ type: "toggle-pain-medication", medication })}
        />

        <fieldset className={styles.choiceGroup} id="v3-follow-up">
          <legend>Opfølgning</legend>
          <div className={styles.chipRow}>
            <button
              type="button"
              aria-pressed={state.followUpStandardPhrase}
              onClick={() => dispatch({ type: "toggle-follow-up-phrase" })}
            >
              Ny klinisk vurdering ved vedvarende gener eller forværring
            </button>
          </div>
        </fieldset>

        <fieldset className={styles.choiceGroup} id="v3-safety-net">
          <legend>Safety-net</legend>
          <div className={styles.chipRow}>
            <button
              type="button"
              aria-pressed={state.safetyNetDiscussed}
              onClick={() => dispatch({ type: "toggle-safety-net-discussed" })}
            >
              Safety-net drøftet
            </button>
          </div>
          {state.safetyNetDiscussed && state.mode === "standard" ? (
            <label className={styles.textField}>
              <span>Uddyb (valgfrit)</span>
              <textarea
                value={state.safetyNetNote ?? ""}
                onChange={(event) => dispatch({ type: "set-safety-net-note", value: event.target.value })}
                rows={2}
              />
            </label>
          ) : null}
        </fieldset>
      </div>
    </section>
  );
}
