import { useState, type Dispatch, type FormEvent } from "react";

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
  toggleListFactAction,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace/reducer";
import {
  getImagingMissingInformation,
  getPrototypeSuggestions
} from "@/clinical/prototypes/clinical-document-workspace/selectors";

import styles from "./DocumentFirstWorkspaceExperiment.module.css";

export type CompletionTopic =
  | "orientation"
  | "history-core"
  | "history-trauma"
  | "history-symptoms"
  | "objective"
  | "assessment"
  | "plan";

type Choice<T extends string> = { readonly value: T; readonly label: string };

function ChoiceButtons<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T | undefined;
  options: readonly Choice<T>[];
  onChange: (value: T | undefined) => void;
}) {
  return (
    <fieldset className={styles.choiceGroup}>
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(value === option.value ? undefined : option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function MultiChoiceButtons<T extends string>({
  label,
  values,
  options,
  onToggle
}: {
  label: string;
  values: readonly T[];
  options: readonly Choice<T>[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset className={styles.choiceGroup}>
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={values.includes(option.value)}
            onClick={() => onToggle(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled = false
}: {
  label: string;
  value: T | undefined;
  options: readonly (Choice<T> & { readonly disabled?: boolean })[];
  onChange: (value: T | undefined) => void;
  disabled?: boolean;
}) {
  return (
    <label className={styles.field}>
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

function PanelHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className={styles.panelHeader}>
      <p>{eyebrow}</p>
      <h2 id="document-first-completion-title">{title}</h2>
      <span>{description}</span>
    </header>
  );
}

function HistoryCore({ state, dispatch }: PanelProps) {
  return (
    <>
      <PanelHeader
        eyebrow="ANAMNESE"
        title="Supplér forløbet"
        description="Kun valgte eller indtastede oplysninger bliver en del af dokumentet."
      />
      <ChoiceButtons<Side>
        label="Side"
        value={state.facts.side}
        options={[
          { value: "right", label: "Højre" },
          { value: "left", label: "Venstre" },
          { value: "bilateral", label: "Begge" }
        ]}
        onChange={(value) => dispatch(setFactAction("side", value))}
      />
      <ChoiceButtons
        label="Debut"
        value={state.facts.onset}
        options={[
          { value: "acute", label: "Akut" },
          { value: "gradual", label: "Gradvis" },
          { value: "recurrent", label: "Recidiverende" },
          { value: "unclear", label: "Uklart" },
          { value: "other", label: "Andet" }
        ]}
        onChange={(value) => dispatch(setFactAction("onset", value))}
      />
      <label className={styles.field}>
        <span>Varighed</span>
        <input
          value={state.facts.duration ?? ""}
          placeholder="Fx siden i går"
          onChange={(event) => dispatch(setFactAction("duration", event.target.value))}
        />
      </label>
      <ChoiceButtons
        label="Udløsende faktor"
        value={state.facts.precipitatingFactor}
        options={[
          { value: "trauma", label: "Traume" },
          { value: "none", label: "Intet identificeret traume" },
          { value: "unclear", label: "Uklart" }
        ]}
        onChange={(value) => dispatch(setFactAction("precipitatingFactor", value))}
      />
    </>
  );
}

function HistoryTrauma({ state, dispatch }: PanelProps) {
  return (
    <>
      <PanelHeader
        eyebrow="ANAMNESE · TRAUME"
        title="Beskriv hændelsen"
        description="Strukturerede mekanismer og fri tekst kan kombineres."
      />
      {state.facts.precipitatingFactor !== "trauma" ? (
        <button
          className={styles.primaryButton}
          type="button"
          onClick={() => dispatch(setFactAction("precipitatingFactor", "trauma"))}
        >
          Registrér traume
        </button>
      ) : null}
      <MultiChoiceButtons
        label="Traumemekanisme"
        values={state.facts.traumaMechanisms ?? []}
        options={[
          { value: "twisting-planted-foot", label: "Vrid på fikseret fod" },
          { value: "direct-blow", label: "Direkte slag" },
          { value: "fall", label: "Fald" },
          { value: "sport-contact", label: "Sport/kontakt" },
          { value: "unclear", label: "Uklart" },
          { value: "other", label: "Andet" }
        ]}
        onToggle={(value) => dispatch(toggleListFactAction("traumaMechanisms", value))}
      />
      <label className={styles.field}>
        <span>Supplerende beskrivelse</span>
        <textarea
          rows={3}
          value={state.facts.traumaMechanismNote ?? ""}
          onChange={(event) =>
            dispatch(setFactAction("traumaMechanismNote", event.target.value))
          }
        />
      </label>
    </>
  );
}

function HistorySymptoms({ state, dispatch }: PanelProps) {
  return (
    <>
      <PanelHeader
        eyebrow="ANAMNESE · SYMPTOMER"
        title="Supplér symptombilledet"
        description="Fravær dokumenteres kun, når det vælges eksplicit."
      />
      <MultiChoiceButtons
        label="Smertelokalisation"
        values={state.facts.painLocations ?? []}
        options={[
          { value: "medial", label: "Medialt" },
          { value: "lateral", label: "Lateralt" },
          { value: "anterior", label: "Fortil" },
          { value: "posterior", label: "Bagtil" },
          { value: "diffuse", label: "Diffust" }
        ]}
        onToggle={(value) => dispatch(toggleListFactAction("painLocations", value))}
      />
      <ChoiceButtons
        label="Funktion"
        value={state.facts.function}
        options={[
          { value: "normal", label: "Normal" },
          { value: "limp", label: "Halten" },
          { value: "cannot-four-steps", label: "Kan ikke tage fire skridt" }
        ]}
        onChange={(value) => dispatch(setFactAction("function", value))}
      />
      <ChoiceButtons
        label="Hævelse"
        value={state.facts.swelling}
        options={[
          { value: "none", label: "Ingen" },
          { value: "delayed-mild", label: "Let, forsinket" },
          { value: "persistent-mild", label: "Let, vedvarende" },
          { value: "marked", label: "Udtalt" }
        ]}
        onChange={(value) => dispatch(setFactAction("swelling", value))}
      />
      <div className={styles.compactGrid}>
        {(["locking", "instability", "fever"] as const).map((key) => (
          <ChoiceButtons<"yes" | "no">
            key={key}
            label={key === "locking" ? "Aflåsning" : key === "instability" ? "Instabilitet" : "Feber"}
            value={state.facts[key]}
            options={[
              { value: "yes", label: "Ja" },
              { value: "no", label: "Nej" }
            ]}
            onChange={(value) => dispatch(setFactAction(key, value))}
          />
        ))}
      </div>
    </>
  );
}

function ObjectiveCompletion({ state, dispatch }: PanelProps) {
  return (
    <>
      <PanelHeader
        eyebrow="OBJEKTIVT"
        title="Registrér undersøgelsesfund"
        description="Gruppebekræftelse kræver eksplicit aktivering og overskriver ikke positive fund."
      />
      <button
        type="button"
        className={styles.primaryButton}
        onClick={() =>
          dispatch({
            type: state.normalGroup.confirmed ? "clear-normal-group" : "confirm-normal-group"
          })
        }
      >
        {state.normalGroup.confirmed
          ? "Fjern grupperet bekræftelse"
          : "Bekræft normale basisfund"}
      </button>
      <ChoiceButtons
        label="Gang"
        value={state.facts.gait}
        options={[
          { value: "normal", label: "Normal" },
          { value: "limp", label: "Haltende" },
          { value: "unable", label: "Kan ikke støtte" }
        ]}
        onChange={(value) => dispatch(setFactAction("gait", value))}
      />
      <ChoiceButtons
        label="Effusion"
        value={state.facts.effusion}
        options={[
          { value: "none-significant", label: "Ingen betydende" },
          { value: "mild", label: "Let" },
          { value: "moderate", label: "Moderat" },
          { value: "large", label: "Stor/spændt" }
        ]}
        onChange={(value) => dispatch(setFactAction("effusion", value))}
      />
      <ChoiceButtons
        label="Ekstension"
        value={state.facts.extension}
        options={[
          { value: "full", label: "Fuld" },
          { value: "reduced", label: "Reduceret" },
          { value: "blocked", label: "Mekanisk blokeret" }
        ]}
        onChange={(value) => dispatch(setFactAction("extension", value))}
      />
      <ChoiceButtons
        label="Ledlinjeømhed"
        value={state.facts.tenderness}
        options={[
          { value: "none-focal", label: "Ingen fokal" },
          { value: "medial-joint-line", label: "Medial" },
          { value: "lateral-joint-line", label: "Lateral" }
        ]}
        onChange={(value) => dispatch(setFactAction("tenderness", value))}
      />
    </>
  );
}

function AssessmentCompletion({ state, dispatch }: PanelProps) {
  const [freeText, setFreeText] = useState("");
  const suggestions = getPrototypeSuggestions(state);

  function addFreeText(event: FormEvent) {
    event.preventDefault();
    const label = freeText.trim();
    if (!label) return;
    dispatch({
      type: "add-diagnosis",
      diagnosis: {
        id: `document-first-${label.toLocaleLowerCase("da").replace(/[^a-z0-9æøå]+/g, "-")}`,
        label,
        source: "free-text"
      }
    });
    setFreeText("");
  }

  return (
    <>
      <PanelHeader
        eyebrow="VURDERING"
        title="Vælg arbejdshypoteser"
        description="Forslag bliver først en del af vurderingen efter eksplicit valg."
      />
      {suggestions.primary.length ? (
        <ul className={styles.suggestionList} aria-label="Dokumentbaserede forslag">
          {suggestions.primary.map((suggestion) => {
            const selected = state.workingDiagnoses.some((item) => item.id === suggestion.id);
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
      ) : (
        <p className={styles.quietMessage}>Ingen forslag uden relevante registrerede oplysninger.</p>
      )}
      {state.workingDiagnoses.length ? (
        <ol className={styles.selectedList} aria-label="Valgte arbejdshypoteser">
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
        </ol>
      ) : null}
      <form className={styles.inlineForm} onSubmit={addFreeText}>
        <label className={styles.field}>
          <span>Anden arbejdshypotese</span>
          <input value={freeText} onChange={(event) => setFreeText(event.target.value)} />
        </label>
        <button type="submit">Tilføj</button>
      </form>
    </>
  );
}

const PLAN_OPTIONS: readonly Choice<PlanAction>[] = [
  { value: "information", label: "Information" },
  { value: "activity", label: "Aktivitetstilpasning" },
  { value: "exercise", label: "Gradueret træning" },
  { value: "physiotherapy", label: "Fysioterapi" },
  { value: "imaging", label: "Billeddiagnostik" },
  { value: "follow-up", label: "Opfølgning" },
  { value: "safety-net", label: "Safety-netting" }
];

function PlanCompletion({ state, dispatch }: PanelProps) {
  const imagingActive = state.planActions.includes("imaging");
  const imagingMissing = imagingActive ? getImagingMissingInformation(state.imaging) : [];

  return (
    <>
      <PanelHeader
        eyebrow="PLAN"
        title="Supplér planen"
        description="Planvalg er intentioner. Eksterne handlinger udføres ikke af prototypen."
      />
      <MultiChoiceButtons
        label="Planhandlinger"
        values={state.planActions}
        options={PLAN_OPTIONS}
        onToggle={(action) => dispatch({ type: "toggle-plan-action", action })}
      />
      {imagingActive ? (
        <div className={styles.imagingPanel} aria-label="Dokumentbaseret billeddiagnostisk plan">
          <header>
            <strong>Billeddiagnostik</strong>
            <span>{imagingMissing.length ? `Mangler: ${imagingMissing.join(", ")}` : "Grundlag registreret"}</span>
          </header>
          <div className={styles.compactGrid}>
            <SelectField<ImagingStatus>
              label="Status"
              value={state.imaging?.status}
              onChange={(value) => dispatch(setImagingFieldAction("status", value))}
              options={[
                { value: "not-indicated-now", label: "Ikke indiceret aktuelt", disabled: !isImagingCombinationCompatible("not-indicated-now", state.imaging?.plannedAction) },
                { value: "planned", label: "Planlagt", disabled: !isImagingCombinationCompatible("planned", state.imaging?.plannedAction) },
                { value: "deferred", label: "Udskudt", disabled: !isImagingCombinationCompatible("deferred", state.imaging?.plannedAction) },
                { value: "unclear", label: "Uklart", disabled: !isImagingCombinationCompatible("unclear", state.imaging?.plannedAction) }
              ]}
            />
            <SelectField<ImagingAction>
              label="Planlagt handling"
              value={state.imaging?.plannedAction}
              disabled={!state.imaging?.status}
              onChange={(value) => dispatch(setImagingFieldAction("plannedAction", value))}
              options={[
                { value: "no-imaging-now", label: "Ingen billeddiagnostik nu", disabled: !isImagingCombinationCompatible(state.imaging?.status, "no-imaging-now") },
                { value: "prepare-referral", label: "Forbered henvisning", disabled: !isImagingCombinationCompatible(state.imaging?.status, "prepare-referral") },
                { value: "reassess-before-decision", label: "Revurdér før beslutning", disabled: !isImagingCombinationCompatible(state.imaging?.status, "reassess-before-decision") }
              ]}
            />
          </div>
          <div className={styles.compactGrid}>
            <SelectField
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
          </div>
          <label className={styles.field}>
            <span>Indikation</span>
            <input
              value={state.imaging?.indication ?? ""}
              onChange={(event) =>
                dispatch(setImagingFieldAction("indication", event.target.value))
              }
            />
          </label>
          <label className={styles.field}>
            <span>Klinisk spørgsmål</span>
            <input
              value={state.imaging?.clinicalQuestion ?? ""}
              onChange={(event) =>
                dispatch(setImagingFieldAction("clinicalQuestion", event.target.value))
              }
            />
          </label>
        </div>
      ) : null}
      {state.planActions.includes("follow-up") ? (
        <label className={styles.field}>
          <span>Opfølgning</span>
          <input
            value={state.facts.followUp ?? ""}
            onChange={(event) => dispatch(setFactAction("followUp", event.target.value))}
          />
        </label>
      ) : null}
      {state.planActions.includes("safety-net") ? (
        <label className={styles.field}>
          <span>Safety-netting</span>
          <textarea
            rows={3}
            value={state.facts.safetyNet ?? ""}
            onChange={(event) => dispatch(setFactAction("safetyNet", event.target.value))}
          />
        </label>
      ) : null}
    </>
  );
}

interface PanelProps {
  readonly state: ClinicalDocumentPrototypeState;
  readonly dispatch: Dispatch<WorkspaceAction>;
}

export function ContextualCompletionPanel({
  topic,
  state,
  dispatch
}: PanelProps & { readonly topic: CompletionTopic }) {
  if (topic === "history-core") return <HistoryCore state={state} dispatch={dispatch} />;
  if (topic === "history-trauma") return <HistoryTrauma state={state} dispatch={dispatch} />;
  if (topic === "history-symptoms") return <HistorySymptoms state={state} dispatch={dispatch} />;
  if (topic === "objective") return <ObjectiveCompletion state={state} dispatch={dispatch} />;
  if (topic === "assessment") return <AssessmentCompletion state={state} dispatch={dispatch} />;
  if (topic === "plan") return <PlanCompletion state={state} dispatch={dispatch} />;

  return (
    <>
      <PanelHeader
        eyebrow="KONTEKSTUEL FULDFØRELSE"
        title="Arbejd fra dokumentet"
        description="Vælg en manglende oplysning eller Redigér ved et afsnit. Kun det relevante kontrolsæt vises her."
      />
      <p className={styles.quietMessage}>
        Dokumentet er den primære flade. Kontrollerne er sekundære og ændrer den samme
        strukturerede prototypetilstand som Phase 3.
      </p>
    </>
  );
}
