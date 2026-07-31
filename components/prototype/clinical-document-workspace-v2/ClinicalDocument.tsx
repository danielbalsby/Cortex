"use client";

import { useState, type Dispatch, type FormEvent } from "react";

import {
  NORMAL_BASIC_FINDINGS,
  type ClinicalDocumentPrototypeState,
  type FunctionStatus,
  type ImagingAction,
  type ImagingStatus,
  type Onset,
  type PainLocation,
  type PainPattern,
  type PlanAction,
  type PrecipitatingFactor,
  type Side,
  type Swelling,
  type TraumaMechanism
} from "@/clinical/prototypes/clinical-document-workspace-v2/model";
import {
  buildAssessmentNarrative,
  buildHistoryNarrative,
  buildObjectiveNarrative,
  buildPlanNarrative,
  getPrototypeSuggestions
} from "@/clinical/prototypes/clinical-document-workspace-v2/presentation";
import {
  isImagingCombinationCompatible,
  setFactAction,
  setImagingFieldAction,
  toggleListFactAction,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace-v2/reducer";

import { ChoiceGroup, MultiChoiceGroup } from "./ChoiceControls";
import { NarrativeSection, type OpenPanel } from "./NarrativeSection";
import styles from "./ClinicalDocumentWorkspaceV2.module.css";

const SIDE_OPTIONS = [
  { value: "right", label: "Højre" },
  { value: "left", label: "Venstre" },
  { value: "bilateral", label: "Begge" }
] as const;
const ONSET_OPTIONS = [
  { value: "acute", label: "Akut" },
  { value: "gradual", label: "Gradvis" },
  { value: "recurrent", label: "Recidiverende" },
  { value: "unclear", label: "Uklart" },
  { value: "other", label: "Andet" }
] as const;
const FACTOR_OPTIONS = [
  { value: "trauma", label: "Traume" },
  { value: "none", label: "Intet traume" },
  { value: "unclear", label: "Uklart" }
] as const;
const TRAUMA_OPTIONS = [
  { value: "twisting-planted-foot", label: "Vrid på fikseret fod" },
  { value: "direct-blow", label: "Direkte slag" },
  { value: "fall", label: "Fald" },
  { value: "valgus-force", label: "Valgus" },
  { value: "varus-force", label: "Varus" },
  { value: "hyperextension", label: "Hyperekstension" },
  { value: "sport-contact", label: "Sport/kontakt" },
  { value: "other", label: "Andet" }
] as const;
const LOCATION_OPTIONS = [
  { value: "medial", label: "Medialt" },
  { value: "lateral", label: "Lateralt" },
  { value: "anterior", label: "Fortil" },
  { value: "posterior", label: "Bagtil" },
  { value: "diffuse", label: "Diffust" }
] as const;
const PATTERN_OPTIONS = [
  { value: "load-related", label: "Belastning" },
  { value: "start-up", label: "Igangsætning" },
  { value: "stairs", label: "Trapper" },
  { value: "rest", label: "Hvile" },
  { value: "night", label: "Nat" },
  { value: "constant", label: "Konstant" },
  { value: "intermittent", label: "Intermitterende" }
] as const;
const PLAN_OPTIONS = [
  { value: "information", label: "Information" },
  { value: "activity", label: "Aktivitet" },
  { value: "exercise", label: "Træning" },
  { value: "physiotherapy", label: "Fysioterapi" },
  { value: "imaging", label: "Billeddiagnostik" },
  { value: "follow-up", label: "Opfølgning" },
  { value: "safety-net", label: "Safety-net" }
] as const;

function PanelToggle({
  label,
  open,
  panel,
  setOpen
}: {
  label: string;
  open: OpenPanel;
  panel: Exclude<OpenPanel, null>;
  setOpen: (value: OpenPanel) => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open === panel}
      data-active={open === panel}
      onClick={() => setOpen(open === panel ? null : panel)}
    >
      {label}
    </button>
  );
}

export function ClinicalDocument({
  state,
  dispatch,
  openPanel,
  setOpenPanel
}: {
  state: ClinicalDocumentPrototypeState;
  dispatch: Dispatch<WorkspaceAction>;
  openPanel: OpenPanel;
  setOpenPanel: (value: OpenPanel) => void;
}) {
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);
  const [freeText, setFreeText] = useState("");
  const { facts } = state;
  const history = buildHistoryNarrative(state);
  const objective = buildObjectiveNarrative(state);
  const assessment = buildAssessmentNarrative(state);
  const plan = buildPlanNarrative(state);
  const suggestions = getPrototypeSuggestions(state);
  const visibleSuggestions = showMoreSuggestions
    ? [...suggestions.primary, ...suggestions.additional]
    : suggestions.primary;
  const imagingActive = state.planActions.includes("imaging");

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
    <article className={styles.documentSurface} aria-labelledby="v2-document-title">
      <header className={styles.documentHeader}>
        <div>
          <p className={styles.eyebrow}>KLINISK DOKUMENT · UX-EKSPERIMENT</p>
          <h1 id="v2-document-title">Knæsmerter</h1>
          <p className={styles.problemContext}>
            <strong>Problem:</strong> Knæsmerte
          </p>
        </div>
        <p className={styles.problemContext}>
          Visning: <strong>{state.mode === "quick" ? "Quick" : "Standard"}</strong>
        </p>
      </header>

      <p className={styles.foundationNotice}>
        Narrativ først. Urørte felter er ikke dokumenteret. Controls understøtter teksten — ikke
        omvendt.
      </p>

      <NarrativeSection
        block={history}
        focusId="history-situation"
        actions={
          <>
            <PanelToggle label="Ændr situation" open={openPanel} panel="situation" setOpen={setOpenPanel} />
            <PanelToggle label="Tilføj traume" open={openPanel} panel="trauma" setOpen={setOpenPanel} />
            <PanelToggle label="Tilføj smerter" open={openPanel} panel="pain" setOpen={setOpenPanel} />
            <PanelToggle label="Tilføj funktion" open={openPanel} panel="function" setOpen={setOpenPanel} />
          </>
        }
      >
        <div
          className={styles.disclosure}
          hidden={openPanel !== "situation"}
          id="v2-focus-history-situation-panel"
        >
          <div className={styles.controlGrid}>
            <ChoiceGroup<Side>
              label="Side"
              value={facts.side}
              options={SIDE_OPTIONS}
              onChange={(value) => dispatch(setFactAction("side", value))}
            />
            <ChoiceGroup<Onset>
              label="Debut"
              value={facts.onset}
              options={ONSET_OPTIONS}
              onChange={(value) => dispatch(setFactAction("onset", value))}
              description="Akut: pludselig/tidsafgrænset. Gradvis: tiltagende uden én klar starthændelse."
            />
            <label className={styles.textField}>
              <span className={styles.fieldLabel}>Varighed</span>
              <input
                value={facts.duration ?? ""}
                onChange={(event) => dispatch(setFactAction("duration", event.target.value))}
                placeholder="Fx siden i går"
              />
            </label>
            <ChoiceGroup<PrecipitatingFactor>
              label="Udløsende faktor"
              value={facts.precipitatingFactor}
              options={FACTOR_OPTIONS}
              onChange={(value) => dispatch(setFactAction("precipitatingFactor", value))}
            />
          </div>
        </div>

        <div
          className={styles.disclosure}
          hidden={openPanel !== "trauma"}
          id="v2-focus-history-trauma"
          tabIndex={-1}
        >
          {facts.precipitatingFactor !== "trauma" ? (
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
              Vælg først traume under situation for at registrere mekanisme.
            </p>
          ) : (
            <div className={styles.controlGrid}>
              <MultiChoiceGroup<TraumaMechanism>
                label="Traumemekanisme"
                values={facts.traumaMechanisms ?? []}
                options={TRAUMA_OPTIONS}
                onToggle={(value) => dispatch(toggleListFactAction("traumaMechanisms", value))}
              />
              <label className={styles.textField}>
                <span className={styles.fieldLabel}>Beskrivelse</span>
                <input
                  value={facts.traumaMechanismNote ?? ""}
                  onChange={(event) =>
                    dispatch(setFactAction("traumaMechanismNote", event.target.value))
                  }
                />
              </label>
            </div>
          )}
        </div>

        <div className={styles.disclosure} hidden={openPanel !== "pain"}>
          <div className={styles.controlGrid}>
            <MultiChoiceGroup<PainLocation>
              label="Lokalisation"
              values={facts.painLocations ?? []}
              options={LOCATION_OPTIONS}
              onToggle={(value) => dispatch(toggleListFactAction("painLocations", value))}
            />
            <MultiChoiceGroup<PainPattern>
              label="Mønster"
              values={facts.painPatterns ?? []}
              options={PATTERN_OPTIONS}
              onToggle={(value) => dispatch(toggleListFactAction("painPatterns", value))}
            />
            <ChoiceGroup<Swelling>
              label="Hævelse"
              value={facts.swelling}
              options={[
                { value: "none", label: "Ingen" },
                { value: "delayed-mild", label: "Let, forsinket" },
                { value: "persistent-mild", label: "Let, vedvarende" },
                { value: "marked", label: "Udtalt" }
              ]}
              onChange={(value) => dispatch(setFactAction("swelling", value))}
            />
            {(["locking", "instability", "fever"] as const).map((key) => (
              <ChoiceGroup<"yes" | "no">
                key={key}
                label={
                  key === "locking" ? "Reel aflåsning" : key === "instability" ? "Instabilitet" : "Feber"
                }
                value={facts[key]}
                options={[
                  { value: "yes", label: "Ja" },
                  { value: "no", label: "Nej" }
                ]}
                onChange={(value) => dispatch(setFactAction(key, value))}
              />
            ))}
          </div>
        </div>

        <div
          className={styles.disclosure}
          hidden={openPanel !== "function"}
          id="v2-focus-history-function"
          tabIndex={-1}
        >
          <ChoiceGroup<FunctionStatus>
            label="Funktion"
            value={facts.function}
            options={[
              { value: "normal", label: "Normal" },
              { value: "limp", label: "Halten" },
              { value: "cannot-four-steps", label: "Kan ikke tage fire skridt" }
            ]}
            onChange={(value) => dispatch(setFactAction("function", value))}
          />
        </div>

        {state.mode === "standard" ? (
          <label className={styles.textField} style={{ marginTop: 10 }}>
            <span className={styles.fieldLabel}>Supplerende anamnese</span>
            <textarea
              value={facts.historyNote ?? ""}
              onChange={(event) => dispatch(setFactAction("historyNote", event.target.value))}
              rows={2}
            />
          </label>
        ) : null}
      </NarrativeSection>

      <NarrativeSection
        block={objective}
        focusId="objective-exam"
        actions={
          <>
            <button
              type="button"
              className={styles.primaryAction}
              onClick={() =>
                dispatch({
                  type: state.normalGroup.confirmed ? "clear-normal-group" : "confirm-normal-group"
                })
              }
            >
              {state.normalGroup.confirmed
                ? "Fjern normal-bekræftelse"
                : "Bekræft basisundersøgelse normal"}
            </button>
            <PanelToggle label="Registrér undtagelser" open={openPanel} panel="exam" setOpen={setOpenPanel} />
          </>
        }
      >
        <div className={styles.disclosure} hidden={openPanel !== "exam"}>
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
            <ChoiceGroup<"none-significant" | "mild" | "moderate" | "large">
              label="Effusion"
              value={facts.effusion}
              options={[
                { value: "none-significant", label: "Ingen betydende" },
                { value: "mild", label: "Let" },
                { value: "moderate", label: "Moderat" },
                { value: "large", label: "Stor" }
              ]}
              onChange={(value) => dispatch(setFactAction("effusion", value))}
            />
            <ChoiceGroup<"full" | "reduced" | "blocked">
              label="Ekstension"
              value={facts.extension}
              options={[
                { value: "full", label: "Fuld" },
                { value: "reduced", label: "Reduceret" },
                { value: "blocked", label: "Blokeret" }
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
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 12 }}>
            Grouped normal bekræfter:{" "}
            {NORMAL_BASIC_FINDINGS.map((finding) => finding.label).join("; ")}.
          </p>
        </div>
      </NarrativeSection>

      <NarrativeSection
        block={assessment}
        focusId="assessment"
        actions={
          <PanelToggle
            label="Vælg / redigér vurdering"
            open={openPanel}
            panel="assessment"
            setOpen={setOpenPanel}
          />
        }
      >
        <div className={styles.epistemicLane}>
          <div className={`${styles.lane} ${styles.laneAssessment}`}>
            <strong>Klinikerens vurdering</strong>
            {state.workingDiagnoses.length ? (
              <ol className={styles.diagnosisList}>
                {state.workingDiagnoses.map((diagnosis, index) => (
                  <li key={diagnosis.id}>
                    <div>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>
                        {index === 0 ? "Primær" : "Samtidig"}
                      </span>
                      <div>
                        <strong>{diagnosis.label}</strong>
                      </div>
                    </div>
                    <div className={styles.inlineActions}>
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() =>
                          dispatch({ type: "move-diagnosis", id: diagnosis.id, direction: -1 })
                        }
                      >
                        Op
                      </button>
                      <button
                        type="button"
                        disabled={index === state.workingDiagnoses.length - 1}
                        onClick={() =>
                          dispatch({ type: "move-diagnosis", id: diagnosis.id, direction: 1 })
                        }
                      >
                        Ned
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "remove-diagnosis", id: diagnosis.id })}
                      >
                        Fjern
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p>Ingen valgt endnu.</p>
            )}
          </div>
        </div>

        <div className={styles.disclosure} hidden={openPanel !== "assessment"}>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--muted)" }}>
            Forslag er ikke sandsynligheder og ikke klinisk valideret.
          </p>
          {visibleSuggestions.length ? (
            <ul className={styles.suggestionList} aria-label="Diagnostiske forslag">
              {visibleSuggestions.map((suggestion) => {
                const selected = state.workingDiagnoses.some((d) => d.id === suggestion.id);
                return (
                  <li key={suggestion.id}>
                    <div>
                      <strong>{suggestion.label}</strong>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{suggestion.reason}</div>
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
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
              Ingen forslag uden relevante registrerede oplysninger.
            </p>
          )}
          {suggestions.additional.length ? (
            <button
              type="button"
              className={styles.ghostButton}
              style={{ marginTop: 8 }}
              onClick={() => setShowMoreSuggestions((current) => !current)}
            >
              {showMoreSuggestions ? "Vis færre" : "Vis flere"}
            </button>
          ) : null}
          <form className={styles.inlineForm} onSubmit={addFreeText}>
            <label className={styles.textField}>
              <span className={styles.fieldLabel}>Anden arbejdshypotese</span>
              <input value={freeText} onChange={(event) => setFreeText(event.target.value)} />
            </label>
            <button type="submit" className={styles.primaryAction}>
              Tilføj
            </button>
          </form>
        </div>
      </NarrativeSection>

      <NarrativeSection
        block={plan}
        focusId="plan"
        actions={
          <PanelToggle label="Redigér plan" open={openPanel} panel="plan" setOpen={setOpenPanel} />
        }
      >
        <div className={styles.disclosure} hidden={openPanel !== "plan"}>
          <MultiChoiceGroup<PlanAction>
            label="Planhandlinger"
            values={state.planActions}
            options={PLAN_OPTIONS}
            onToggle={(action) => dispatch({ type: "toggle-plan-action", action })}
          />
          {imagingActive ? (
            <div className={styles.controlGrid} style={{ marginTop: 10 }}>
              <label className={styles.textField}>
                <span className={styles.fieldLabel}>Imaging-status</span>
                <select
                  value={state.imaging?.status ?? ""}
                  onChange={(event) =>
                    dispatch(
                      setImagingFieldAction(
                        "status",
                        (event.target.value || undefined) as ImagingStatus | undefined
                      )
                    )
                  }
                >
                  <option value="">Ikke registreret</option>
                  <option value="not-indicated-now">Ikke indiceret</option>
                  <option value="planned">Planlagt</option>
                  <option value="ordered-or-referred">Bestilt (demo)</option>
                  <option value="deferred">Udskudt</option>
                  <option value="unclear">Uklart</option>
                </select>
              </label>
              <label className={styles.textField}>
                <span className={styles.fieldLabel}>Planlagt handling</span>
                <select
                  value={state.imaging?.plannedAction ?? ""}
                  disabled={!state.imaging?.status}
                  onChange={(event) => {
                    const value = (event.target.value || undefined) as ImagingAction | undefined;
                    if (!isImagingCombinationCompatible(state.imaging?.status, value)) return;
                    dispatch(setImagingFieldAction("plannedAction", value));
                  }}
                >
                  <option value="">Ikke registreret</option>
                  <option value="no-imaging-now">Ingen billeddiagnostik nu</option>
                  <option value="prepare-referral">Forbered henvisning</option>
                  <option value="send-referral">Demo-afsendelse</option>
                  <option value="reassess-before-decision">Revurdér før beslutning</option>
                  <option value="other">Andet</option>
                </select>
              </label>
              <label className={styles.textField}>
                <span className={styles.fieldLabel}>Modalitet</span>
                <select
                  value={state.imaging?.modality ?? ""}
                  onChange={(event) =>
                    dispatch(
                      setImagingFieldAction(
                        "modality",
                        (event.target.value || undefined) as
                          | "acute-x-ray"
                          | "standing-weight-bearing-x-ray"
                          | "mri"
                          | "ultrasound"
                          | "other"
                          | undefined
                      )
                    )
                  }
                >
                  <option value="">Ikke registreret</option>
                  <option value="acute-x-ray">Akut røntgen</option>
                  <option value="standing-weight-bearing-x-ray">Stående røntgen</option>
                  <option value="mri">MR</option>
                  <option value="ultrasound">Ultralyd</option>
                </select>
              </label>
              <label className={styles.textField}>
                <span className={styles.fieldLabel}>Indikation</span>
                <input
                  value={state.imaging?.indication ?? ""}
                  onChange={(event) =>
                    dispatch(setImagingFieldAction("indication", event.target.value))
                  }
                />
              </label>
              <label className={styles.textField}>
                <span className={styles.fieldLabel}>Klinisk spørgsmål</span>
                <input
                  value={state.imaging?.clinicalQuestion ?? ""}
                  onChange={(event) =>
                    dispatch(setImagingFieldAction("clinicalQuestion", event.target.value))
                  }
                />
              </label>
              <ChoiceGroup<Side>
                label="Imaging-side"
                value={state.imaging?.side}
                options={SIDE_OPTIONS}
                onChange={(value) => dispatch(setImagingFieldAction("side", value))}
              />
            </div>
          ) : null}
          {state.planActions.includes("follow-up") ? (
            <label className={styles.textField} style={{ marginTop: 10 }}>
              <span className={styles.fieldLabel}>Opfølgning</span>
              <input
                value={facts.followUp ?? ""}
                onChange={(event) => dispatch(setFactAction("followUp", event.target.value))}
              />
            </label>
          ) : null}
          {state.planActions.includes("safety-net") ? (
            <label className={styles.textField} style={{ marginTop: 10 }}>
              <span className={styles.fieldLabel}>Safety-netting</span>
              <textarea
                value={facts.safetyNet ?? ""}
                onChange={(event) => dispatch(setFactAction("safetyNet", event.target.value))}
                rows={2}
              />
            </label>
          ) : null}
        </div>
      </NarrativeSection>
    </article>
  );
}
