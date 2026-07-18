import type { Dispatch } from "react";

import type {
  ClinicalDocumentPrototypeState,
  ImagingAction,
  ImagingStatus,
  PlanAction,
  Side
} from "@/clinical/prototypes/clinical-document-workspace/model";
import {
  isImagingCombinationCompatible,
  setFactAction,
  setImagingFieldAction,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace/reducer";
import {
  getImagingMissingInformation,
  getPlanContext
} from "@/clinical/prototypes/clinical-document-workspace/selectors";

import { MultiChoiceGroup } from "./ChoiceGroup";
import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

const PLAN_OPTIONS = [
  { value: "information", label: "Information" },
  { value: "activity", label: "Aktivitetstilpasning" },
  { value: "exercise", label: "Gradueret træning" },
  { value: "physiotherapy", label: "Fysioterapi" },
  { value: "imaging", label: "Billeddiagnostik" },
  { value: "follow-up", label: "Opfølgning" },
  { value: "safety-net", label: "Safety-netting" }
] as const;

const IMAGING_ACTIONS: readonly { value: ImagingAction; label: string }[] = [
  { value: "no-imaging-now", label: "Ingen billeddiagnostik nu" },
  { value: "prepare-referral", label: "Forbered henvisning" },
  {
    value: "send-referral",
    label: "Registrér kun demonstrationsstatus – ingen ekstern afsendelse"
  },
  { value: "review-existing-result", label: "Gennemgå eksisterende svar" },
  { value: "reassess-before-decision", label: "Revurdér før beslutning" },
  { value: "other", label: "Anden handling" }
];

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  disabled = false
}: {
  label: string;
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  options: readonly { value: T; label: string; disabled?: boolean }[];
  disabled?: boolean;
}) {
  return (
    <label className={styles.textField}>
      <span>{label}</span>
      <select
        value={value ?? ""}
        disabled={disabled}
        onChange={(event) =>
          onChange(options.find((option) => option.value === event.target.value)?.value)
        }
      >
        <option value="">Ikke registreret</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function PlanSection({
  state,
  dispatch
}: {
  state: ClinicalDocumentPrototypeState;
  dispatch: Dispatch<WorkspaceAction>;
}) {
  const imagingActive = state.planActions.includes("imaging");
  const missing = imagingActive ? getImagingMissingInformation(state.imaging) : [];

  return (
    <div className={styles.clinicalControls}>
      <p className={styles.sectionLead}>{getPlanContext(state)}</p>
      <MultiChoiceGroup<PlanAction>
        label="Planhandlinger"
        values={state.planActions}
        options={PLAN_OPTIONS}
        onToggle={(action) => dispatch({ type: "toggle-plan-action", action })}
      />

      {imagingActive ? (
        <div className={styles.contextBlock} aria-label="Billeddiagnostisk plan">
          <header>
            <div>
              <strong>Billeddiagnostik</strong>
              <p>Status og handling registreres eksplicit; prototypen sender intet eksternt.</p>
            </div>
            {missing.length ? <span className={styles.missingBadge}>Mangler oplysninger</span> : null}
          </header>
          {missing.length ? <p className={styles.missingText}>Mangler: {missing.join(", ")}.</p> : null}
          <div className={styles.controlGrid}>
            <SelectField<ImagingStatus>
              label="Status"
              value={state.imaging?.status}
              onChange={(value) => dispatch(setImagingFieldAction("status", value))}
              options={[
                {
                  value: "not-indicated-now",
                  label: "Ikke indiceret aktuelt",
                  disabled: !isImagingCombinationCompatible(
                    "not-indicated-now",
                    state.imaging?.plannedAction
                  )
                },
                {
                  value: "planned",
                  label: "Planlagt",
                  disabled: !isImagingCombinationCompatible(
                    "planned",
                    state.imaging?.plannedAction
                  )
                },
                {
                  value: "ordered-or-referred",
                  label: "Bestilling/henvisning som eksplicit demotilstand",
                  disabled: !isImagingCombinationCompatible(
                    "ordered-or-referred",
                    state.imaging?.plannedAction
                  )
                },
                {
                  value: "completed-known",
                  label: "Udført, svar kendt",
                  disabled: !isImagingCombinationCompatible(
                    "completed-known",
                    state.imaging?.plannedAction
                  )
                },
                {
                  value: "deferred",
                  label: "Udskudt",
                  disabled: !isImagingCombinationCompatible(
                    "deferred",
                    state.imaging?.plannedAction
                  )
                },
                {
                  value: "unclear",
                  label: "Uklart",
                  disabled: !isImagingCombinationCompatible(
                    "unclear",
                    state.imaging?.plannedAction
                  )
                }
              ]}
            />
            <SelectField<ImagingAction>
              label="Planlagt handling"
              value={state.imaging?.plannedAction}
              disabled={!state.imaging?.status}
              onChange={(value) => dispatch(setImagingFieldAction("plannedAction", value))}
              options={IMAGING_ACTIONS.map((option) => ({
                ...option,
                disabled: !isImagingCombinationCompatible(state.imaging?.status, option.value)
              }))}
            />
            <SelectField<"acute-x-ray" | "standing-weight-bearing-x-ray" | "mri" | "ultrasound" | "other">
              label="Modalitet"
              value={state.imaging?.modality}
              onChange={(value) => dispatch(setImagingFieldAction("modality", value))}
              options={[
                { value: "acute-x-ray", label: "Akut røntgen" },
                { value: "standing-weight-bearing-x-ray", label: "Stående belastet røntgen" },
                { value: "mri", label: "MR" },
                { value: "ultrasound", label: "Ultralyd" },
                { value: "other", label: "Andet" }
              ]}
            />
            <SelectField<Side>
              label="Side"
              value={state.imaging?.side}
              onChange={(value) => dispatch(setImagingFieldAction("side", value))}
              options={[
                { value: "right", label: "Højre" },
                { value: "left", label: "Venstre" },
                { value: "bilateral", label: "Begge" }
              ]}
            />
            <label className={styles.textField}>
              <span>Indikation</span>
              <input
                value={state.imaging?.indication ?? ""}
                onChange={(event) =>
                  dispatch(setImagingFieldAction("indication", event.target.value))
                }
              />
            </label>
            <label className={styles.textField}>
              <span>Klinisk spørgsmål</span>
              <input
                value={state.imaging?.clinicalQuestion ?? ""}
                onChange={(event) =>
                  dispatch(setImagingFieldAction("clinicalQuestion", event.target.value))
                }
              />
            </label>
          </div>
          {!state.imaging?.status ? (
            <p className={styles.constraintText} role="status">
              Vælg status før planlagt handling.
            </p>
          ) : state.imaging.plannedAction ? (
            <p className={styles.constraintText} role="status">
              Ryd planlagt handling før skift til en inkompatibel status.
            </p>
          ) : null}
        </div>
      ) : null}

      {state.planActions.includes("follow-up") ? (
        <label className={styles.textField}>
          <span>Opfølgning</span>
          <input
            value={state.facts.followUp ?? ""}
            onChange={(event) => dispatch(setFactAction("followUp", event.target.value))}
          />
        </label>
      ) : null}
      {state.planActions.includes("safety-net") ? (
        <label className={styles.textField}>
          <span>Safety-netting</span>
          <textarea
            value={state.facts.safetyNet ?? ""}
            onChange={(event) => dispatch(setFactAction("safetyNet", event.target.value))}
            rows={2}
          />
        </label>
      ) : null}
    </div>
  );
}
