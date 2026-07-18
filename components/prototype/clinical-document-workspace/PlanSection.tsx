import type { Dispatch } from "react";

import type {
  ClinicalDocumentPrototypeState,
  ImagingAction,
  ImagingPlan,
  ImagingStatus,
  PlanAction,
  Side
} from "@/clinical/prototypes/clinical-document-workspace/model";
import {
  isImagingCombinationCompatible,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace/reducer";
import { getImagingMissingInformation } from "@/clinical/prototypes/clinical-document-workspace/selectors";

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
  options
}: {
  label: string;
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  options: readonly { value: T; label: string; disabled?: boolean }[];
}) {
  return (
    <label className={styles.textField}>
      <span>{label}</span>
      <select value={value ?? ""} onChange={(event) => onChange((event.target.value || undefined) as T | undefined)}>
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
  const setImaging = (key: keyof ImagingPlan, value: unknown) =>
    dispatch({ type: "set-imaging-field", key, value });
  const setFact = (key: "followUp" | "safetyNet", value: string) =>
    dispatch({ type: "set-fact", key, value });

  return (
    <div className={styles.clinicalControls}>
      <p className={styles.sectionLead}>
        {state.planActions.length
          ? "Kun eksplicit valgte handlinger er registreret i planen."
          : "Ingen planhandlinger registreret."}
      </p>
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
              onChange={(value) => setImaging("status", value)}
              options={[
                { value: "not-indicated-now", label: "Ikke indiceret aktuelt" },
                { value: "planned", label: "Planlagt" },
                {
                  value: "ordered-or-referred",
                  label: "Bestilling/henvisning som eksplicit demotilstand"
                },
                { value: "completed-known", label: "Udført, svar kendt" },
                { value: "deferred", label: "Udskudt" },
                { value: "unclear", label: "Uklart" }
              ]}
            />
            <SelectField<ImagingAction>
              label="Planlagt handling"
              value={state.imaging?.plannedAction}
              onChange={(value) => setImaging("plannedAction", value)}
              options={IMAGING_ACTIONS.map((option) => ({
                ...option,
                disabled: !isImagingCombinationCompatible(state.imaging?.status, option.value)
              }))}
            />
            <SelectField<"acute-x-ray" | "standing-weight-bearing-x-ray" | "mri" | "ultrasound" | "other">
              label="Modalitet"
              value={state.imaging?.modality}
              onChange={(value) => setImaging("modality", value)}
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
              onChange={(value) => setImaging("side", value)}
              options={[
                { value: "right", label: "Højre" },
                { value: "left", label: "Venstre" },
                { value: "bilateral", label: "Begge" }
              ]}
            />
            <label className={styles.textField}>
              <span>Indikation</span>
              <input value={state.imaging?.indication ?? ""} onChange={(event) => setImaging("indication", event.target.value)} />
            </label>
            <label className={styles.textField}>
              <span>Klinisk spørgsmål</span>
              <input value={state.imaging?.clinicalQuestion ?? ""} onChange={(event) => setImaging("clinicalQuestion", event.target.value)} />
            </label>
          </div>
        </div>
      ) : null}

      {state.planActions.includes("follow-up") ? (
        <label className={styles.textField}>
          <span>Opfølgning</span>
          <input value={state.facts.followUp ?? ""} onChange={(event) => setFact("followUp", event.target.value)} />
        </label>
      ) : null}
      {state.planActions.includes("safety-net") ? (
        <label className={styles.textField}>
          <span>Safety-netting</span>
          <textarea value={state.facts.safetyNet ?? ""} onChange={(event) => setFact("safetyNet", event.target.value)} rows={2} />
        </label>
      ) : null}
    </div>
  );
}
