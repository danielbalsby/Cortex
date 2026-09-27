"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";

import type {
  PainProvocation,
  PalpationFinding,
  SprintOneOneHistory,
  SprintOneOneObjective
} from "@/clinical/prototypes/sprint-1-1/model";
import {
  C3_PHRASES
} from "@/clinical/prototypes/c3/fixtures";
import {
  getActiveAssessments,
  getActivePhrases,
  type C3DocumentProfile
} from "@/clinical/prototypes/c3/model";
import {
  createC3Assessment,
  discardC3ManualDraft,
  discardC3Recovery,
  getC3DraftStatus,
  removeC3Assessment,
  removeC3Phrase,
  restoreC3Recovery,
  selectC3Phrase,
  setC3ManualDraft,
  setC3Profile
} from "@/clinical/prototypes/c3/state";
import {
  C32_SCENARIO_VERSION,
  createEmptyC32State,
  type C32BatchId,
  type C32InspectionFinding,
  type C32InspectionStatus,
  type C32State
} from "@/clinical/prototypes/c3-2/model";
import {
  isC32CopyReadyPsoap,
  projectC32PsoapDocument
} from "@/clinical/prototypes/c3-2/projections";
import {
  applyC32FactAction,
  commitC32Batch,
  configureC32Problem,
  latestActiveBatch,
  previewC32Batch,
  setC32InspectionStatus,
  toggleC32InspectionFinding,
  undoC32Batch
} from "@/clinical/prototypes/c3-2/state";
import type { C3FactAction } from "@/clinical/prototypes/c3/state";

import styles from "./C32PsoapFastFlow.module.css";

type StepId = "problem" | "subjective" | "objective" | "assessment" | "plan" | "document";

interface Instrumentation {
  readonly startedAt?: number;
  readonly clicks: number;
  readonly scrollEvents: number;
  readonly scrollDistance: number;
  readonly directionChanges: number;
  readonly profileSwitches: number;
  readonly undos: number;
  readonly documentEdits: number;
  readonly copies: number;
  readonly recoveryEvents: number;
  readonly semanticViolations: number;
}

interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
}

const initialInstrumentation: Instrumentation = {
  clicks: 0,
  scrollEvents: 0,
  scrollDistance: 0,
  directionChanges: 0,
  profileSwitches: 0,
  undos: 0,
  documentEdits: 0,
  copies: 0,
  recoveryEvents: 0,
  semanticViolations: 0
};

const yesNo = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nej" }
] as const;

const provocations = [
  { value: "walking", label: "Gang" },
  { value: "stairs", label: "Trapper" },
  { value: "rotation", label: "Rotation" },
  { value: "running", label: "Løb" },
  { value: "jumping", label: "Hop" },
  { value: "direction-change", label: "Retningsskift" }
] as const;

const palpations = [
  { value: "medial-joint-line", label: "Medial ledlinje" },
  { value: "lateral-joint-line", label: "Lateral ledlinje" },
  { value: "mcl", label: "MCL" },
  { value: "lcl", label: "LCL" },
  { value: "patella", label: "Patella" },
  { value: "patellar-tendon", label: "Patellasene" },
  { value: "quadriceps-tendon", label: "Quadricepssene" },
  { value: "pes-anserinus", label: "Pes anserinus" }
] as const;

const inspectionFindings = [
  { value: "swelling", label: "Hævelse" },
  { value: "redness", label: "Rødme" },
  { value: "deformity", label: "Deformitet" }
] as const;

const steps: readonly { id: StepId; marker: string; label: string }[] = [
  { id: "problem", marker: "P", label: "Problem" },
  { id: "subjective", marker: "S", label: "Anamnese" },
  { id: "objective", marker: "O", label: "Objektivt" },
  { id: "assessment", marker: "A", label: "Vurdering" },
  { id: "plan", marker: "P", label: "Plan" },
  { id: "document", marker: "→", label: "Kopiér" }
];

function moveWithinGroup(trigger: HTMLButtonElement, direction: -1 | 1) {
  const group = trigger.parentElement;
  const controls = group ? [...group.querySelectorAll<HTMLButtonElement>("button:not([disabled])")] : [];
  const index = controls.indexOf(trigger);
  controls[(index + direction + controls.length) % controls.length]?.focus();
}

function focusNextControl(trigger: HTMLElement) {
  const controls = [...document.querySelectorAll<HTMLElement>(
    "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])"
  )].filter((control) => control.offsetParent !== null);
  controls[controls.indexOf(trigger) + 1]?.focus();
}

function Choice<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  readonly label: string;
  readonly value?: T;
  readonly options: readonly Option<T>[];
  readonly onChange: (value: T | undefined) => void;
}) {
  return (
    <fieldset className={styles.choice}>
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(value === option.value ? undefined : option.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveWithinGroup(event.currentTarget, -1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveWithinGroup(event.currentTarget, 1);
              }
              if (event.key === "Enter") requestAnimationFrame(() => focusNextControl(event.currentTarget));
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function MultiChoice<T extends string>({
  label,
  values,
  options,
  onToggle
}: {
  readonly label: string;
  readonly values: readonly T[];
  readonly options: readonly Option<T>[];
  readonly onToggle: (value: T) => void;
}) {
  return (
    <fieldset className={styles.choice}>
      <legend>{label} <span>flere kan vælges</span></legend>
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={values.includes(option.value)}
            onClick={() => onToggle(option.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveWithinGroup(event.currentTarget, -1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveWithinGroup(event.currentTarget, 1);
              }
              if (event.key === "Enter") requestAnimationFrame(() => focusNextControl(event.currentTarget));
            }}
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
  onChange
}: {
  readonly label: string;
  readonly value?: T;
  readonly options: readonly Option<T>[];
  readonly onChange: (value: T | undefined) => void;
}) {
  return (
    <label className={styles.selectField}>
      <span>{label}</span>
      <select value={value ?? ""} onChange={(event) => onChange((event.target.value || undefined) as T | undefined)}>
        <option value="">Ikke registreret</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onCommit
}: {
  readonly label: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly onCommit: (value: string | undefined) => void;
}) {
  const [draft, setDraft] = useState(value ?? "");
  useEffect(() => setDraft(value ?? ""), [value]);
  return (
    <label className={styles.textField}>
      <span>{label}</span>
      <input
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => onCommit(draft.trim() || undefined)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onCommit(draft.trim() || undefined);
            const controls = [...document.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])")];
            controls[controls.indexOf(event.currentTarget) + 1]?.focus();
          }
          if (event.key === "Escape") setDraft(value ?? "");
        }}
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onCommit
}: {
  readonly label: string;
  readonly value?: number;
  readonly onCommit: (value: number | undefined) => void;
}) {
  const [draft, setDraft] = useState(value === undefined ? "" : String(value));
  useEffect(() => setDraft(value === undefined ? "" : String(value)), [value]);
  const commit = () => {
    const parsed = Number(draft.replace(",", "."));
    onCommit(draft.trim() && Number.isFinite(parsed) ? parsed : undefined);
  };
  return (
    <label className={styles.textField}>
      <span>{label}</span>
      <input
        inputMode="decimal"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
          }
          if (event.key === "Escape") setDraft(value === undefined ? "" : String(value));
        }}
      />
    </label>
  );
}

function FlowSection({
  id,
  marker,
  title,
  hidden,
  children
}: {
  readonly id: StepId;
  readonly marker: string;
  readonly title: string;
  readonly hidden?: boolean;
  readonly children: ReactNode;
}) {
  return (
    <section hidden={hidden} id={`c32-${id}`} className={styles.flowSection} aria-labelledby={`c32-${id}-title`}>
      <header>
        <span>{marker}</span>
        <h2 id={`c32-${id}-title`}>{title}</h2>
      </header>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}

export function C32PsoapFastFlow() {
  const [state, setState] = useState<C32State>(() => createEmptyC32State());
  const [batchPreview, setBatchPreview] = useState<C32BatchId>();
  const [showAbnormalRom, setShowAbnormalRom] = useState(false);
  const [assessmentDraft, setAssessmentDraft] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const [instrumentation, setInstrumentation] = useState(initialInstrumentation);
  const lastScroll = useRef({ y: 0, direction: 0 });

  const profile = state.c3.outputProfile;
  const generated = useMemo(
    () => projectC32PsoapDocument(state, profile),
    [state, profile]
  );
  const draft = state.c3.drafts[profile];
  const draftStatus = getC3DraftStatus(state.c3, profile);
  const documentText = draft?.text ?? generated;
  const activeAssessment = getActiveAssessments(state.c3)[0];
  const activePhrases = getActivePhrases(state.c3);

  useEffect(() => {
    function onScroll() {
      const delta = window.scrollY - lastScroll.current.y;
      if (!delta) return;
      const direction = Math.sign(delta);
      setInstrumentation((current) => ({
        ...current,
        scrollEvents: current.scrollEvents + 1,
        scrollDistance: current.scrollDistance + Math.abs(delta),
        directionChanges: current.directionChanges + (
          lastScroll.current.direction && lastScroll.current.direction !== direction ? 1 : 0
        )
      }));
      lastScroll.current = { y: window.scrollY, direction };
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function updateC3(update: C32State["c3"]) {
    setState((current) => ({ ...current, c3: update }));
  }

  function applyFact(action: C3FactAction) {
    setState((current) => applyC32FactAction(current, action));
  }

  function goTo(step: StepId) {
    document.getElementById(`c32-${step}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openBatch(batchId: C32BatchId) {
    setBatchPreview(batchId);
  }

  function commitBatch() {
    if (!batchPreview) return;
    setState((current) => commitC32Batch(current, batchPreview));
    setBatchPreview(undefined);
  }

  function togglePhrase(phraseId: string) {
    const active = activePhrases.find((entry) => entry.phraseId === phraseId);
    updateC3(active ? removeC3Phrase(state.c3, active.entryId).state : selectC3Phrase(state.c3, phraseId).state);
  }

  async function copyDocument() {
    if (!isC32CopyReadyPsoap(documentText)) {
      setCopyFeedback("Bevar de fem P/S/O/A/P-linjer før kopiering");
      setInstrumentation((current) => ({
        ...current,
        semanticViolations: current.semanticViolations + 1
      }));
      return;
    }
    await navigator.clipboard.writeText(documentText);
    setCopyFeedback("PSOAP kopieret");
    setInstrumentation((current) => ({ ...current, copies: current.copies + 1 }));
  }

  const preview = batchPreview ? previewC32Batch(state, batchPreview) : undefined;
  const elapsed = instrumentation.startedAt ? Math.round((Date.now() - instrumentation.startedAt) / 1000) : 0;

  return (
    <main
      className={styles.page}
      onClickCapture={() => setInstrumentation((current) => ({ ...current, clicks: current.clicks + 1 }))}
    >
      <header className={styles.hero}>
        <div>
          <p>C3.2 · syntetisk learning prototype</p>
          <h1>PSOAP Fast Flow</h1>
          <span>Én lineær registrering. Ingen kliniske defaults.</span>
        </div>
        <a href="/prototype/c3-1-calm-interaction">Åbn C3.1 comparator</a>
      </header>

      <nav className={styles.progress} aria-label="PSOAP progression">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            disabled={step.id !== "problem" && !state.workflow.problemProfile}
            onClick={() => goTo(step.id)}
          >
            <span>{step.marker}</span>{step.label}
          </button>
        ))}
      </nav>

      <div className={styles.workspace}>
        <div className={styles.flow}>
          <FlowSection id="problem" marker="P" title="Problem">
            <div className={styles.problemChoice}>
              <p>Problemprofilen styrer kun flowet og skriver ingen kliniske facts.</p>
              <button
                type="button"
                aria-pressed={state.workflow.problemProfile === "knee-pain"}
                onClick={() => {
                  setState((current) => configureC32Problem(current, current.workflow.problemProfile ? undefined : "knee-pain"));
                  setInstrumentation((current) => ({
                    ...current,
                    startedAt: current.startedAt ?? Date.now()
                  }));
                }}
              >
                Knæsmerter
              </button>
            </div>
          </FlowSection>

          <FlowSection hidden={!state.workflow.problemProfile} id="subjective" marker="S" title="Anamnese">
            <div className={styles.group}>
              <Choice label="Side" value={state.c3.factRoot.history.side} options={[
                { value: "right", label: "Højre" },
                { value: "left", label: "Venstre" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "side", value })} />
              <Choice label="Debut" value={state.c3.factRoot.history.onset} options={[
                { value: "acute", label: "Akut" },
                { value: "insidious", label: "Snigende" },
                { value: "gradual", label: "Gradvis" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "onset", value })} />
              <TextField label="Varighed" value={state.c3.factRoot.history.duration} placeholder="Fx siden i går" onCommit={(value) => applyFact({ type: "set-history", key: "duration", value })} />
              <Choice label="Traume" value={state.c3.factRoot.history.trauma} options={yesNo} onChange={(value) => applyFact({ type: "set-history", key: "trauma", value })} />
            </div>
            {state.c3.factRoot.history.trauma === "yes" && (
              <div className={styles.group}>
                <SelectField label="Mekanisme" value={state.c3.factRoot.history.traumaMechanism} options={[
                  { value: "twisting", label: "Vrid" },
                  { value: "direct-blow", label: "Direkte slag" },
                  { value: "fall", label: "Fald" },
                  { value: "other", label: "Andet" }
                ]} onChange={(value) => applyFact({ type: "set-history", key: "traumaMechanism", value })} />
                <TextField label="Kontekst" value={state.c3.factRoot.history.traumaContext} placeholder="Fx under fodbold" onCommit={(value) => applyFact({ type: "set-history", key: "traumaContext", value })} />
              </div>
            )}
            <div className={styles.group}>
              <SelectField label="Smerteplacering" value={state.c3.factRoot.history.painLocation} options={[
                { value: "medial", label: "Medial" },
                { value: "lateral", label: "Lateral" },
                { value: "anterior", label: "Anterior" },
                { value: "posterior", label: "Posterior" },
                { value: "diffuse", label: "Diffus" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "painLocation", value })} />
              <Choice label="Smerteforløb" value={state.c3.factRoot.history.painCourse} options={[
                { value: "constant", label: "Konstant" },
                { value: "intermittent", label: "Intermitterende" },
                { value: "increasing", label: "Tiltagende" },
                { value: "decreasing", label: "Aftagende" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "painCourse", value })} />
              <MultiChoice label="Provokation" values={state.c3.factRoot.history.provocations} options={provocations} onToggle={(value: PainProvocation) => applyFact({ type: "toggle-provocation", value })} />
            </div>
            <div className={styles.group}>
              <Choice label="Funktion" value={state.c3.factRoot.history.function} options={[
                { value: "unaffected", label: "Upåvirket" },
                { value: "mildly-reduced", label: "Let nedsat" },
                { value: "significantly-reduced", label: "Betydeligt nedsat" },
                { value: "unable-to-bear-weight", label: "Kan ikke støtte" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "function", value })} />
              <Choice label="Hævelse" value={state.c3.factRoot.history.swelling} options={[
                { value: "none", label: "Ingen" },
                { value: "mild", label: "Let" },
                { value: "persistent", label: "Vedvarende" },
                { value: "marked", label: "Udtalt" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "swelling", value })} />
              <TextField label="Hævelsens tidsforløb" value={state.c3.factRoot.history.swellingTiming} placeholder="Fx opstået samme aften" onCommit={(value) => applyFact({ type: "set-history", key: "swellingTiming", value })} />
            </div>
            <div className={styles.group}>
              {([
                ["Aflåsning", "locking"],
                ["Instabilitet", "instability"],
                ["Hvilesmerter", "restPain"],
                ["Nattesmerter", "nightPain"]
              ] as const).map(([label, key]) => (
                <Choice key={key} label={label} value={state.c3.factRoot.history[key]} options={[
                  ...yesNo,
                  { value: "not-assessed", label: "Ikke vurderet" }
                ]} onChange={(value) => applyFact({ type: "set-history", key, value })} />
              ))}
            </div>
            <div className={styles.batchGroup}>
              <div>
                <strong>Red flags</strong>
                <span>Kun tre specificerede oplysninger registreres.</span>
              </div>
              <button type="button" onClick={() => openBatch("C32-BATCH-REDFLAGS-NORMAL-001")}>Gennemse Normal</button>
              {latestActiveBatch(state, "C32-BATCH-REDFLAGS-NORMAL-001") && (
                <button type="button" onClick={() => {
                  const record = latestActiveBatch(state, "C32-BATCH-REDFLAGS-NORMAL-001");
                  if (record) setState((current) => undoC32Batch(current, record.transactionId));
                  setInstrumentation((current) => ({ ...current, undos: current.undos + 1 }));
                }}>Fortryd batch</button>
              )}
            </div>
            <div className={styles.group}>
              <Choice label="Feber" value={state.c3.factRoot.history.fever} options={[
                ...yesNo,
                { value: "not-assessed", label: "Ikke vurderet" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "fever", value })} />
              <Choice label="Almen påvirkning" value={state.c3.factRoot.history.systemicIllness} options={[
                ...yesNo,
                { value: "not-assessed", label: "Ikke vurderet" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "systemicIllness", value })} />
              <Choice label="Rødt, varmt og akut hævet knæ" value={state.c3.factRoot.history.redHotSwollenJoint} options={[
                ...yesNo,
                { value: "not-assessed", label: "Ikke vurderet" }
              ]} onChange={(value) => applyFact({ type: "set-history", key: "redHotSwollenJoint", value })} />
            </div>
          </FlowSection>

          <FlowSection hidden={!state.workflow.problemProfile} id="objective" marker="O" title="Objektivt">
            <div className={styles.group}>
              <Choice label="Gang" value={state.c3.factRoot.objective.gait} options={[
                { value: "normal", label: "Normal" },
                { value: "limp", label: "Haltende" },
                { value: "unable", label: "Kan ikke støtte" },
                { value: "not-assessed", label: "Ikke vurderet" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "gait", value })} />
              <MultiChoice label="Inspektionsfund" values={state.inspection.findings} options={inspectionFindings} onToggle={(value: C32InspectionFinding) => setState((current) => toggleC32InspectionFinding(current, value))} />
              <Choice label="Inspektionsstatus" value={state.inspection.status} options={[
                { value: "no-specific-findings", label: "Ingen særlige fund" },
                { value: "not-assessed", label: "Ikke vurderet" }
              ]} onChange={(value: C32InspectionStatus | undefined) => setState((current) => setC32InspectionStatus(current, value))} />
              <Choice label="Effusion" value={state.c3.factRoot.objective.effusion} options={[
                { value: "none", label: "Ingen" },
                { value: "mild", label: "Let" },
                { value: "moderate", label: "Moderat" },
                { value: "large", label: "Stor" },
                { value: "not-assessed", label: "Ikke vurderet" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "effusion", value })} />
            </div>
            <div className={styles.batchGroup}>
              <div><strong>ROM</strong><span>Normal skriver kun de viste grader.</span></div>
              <button type="button" onClick={() => openBatch("C32-BATCH-ROM-NORMAL-001")}>Gennemse Normal 0–140°</button>
              <button type="button" aria-expanded={showAbnormalRom} onClick={() => setShowAbnormalRom((value) => !value)}>Abnorm</button>
              {latestActiveBatch(state, "C32-BATCH-ROM-NORMAL-001") && (
                <button type="button" onClick={() => {
                  const record = latestActiveBatch(state, "C32-BATCH-ROM-NORMAL-001");
                  if (record) setState((current) => undoC32Batch(current, record.transactionId));
                  setInstrumentation((current) => ({ ...current, undos: current.undos + 1 }));
                }}>Fortryd ROM-batch</button>
              )}
              {showAbnormalRom && (
                <div className={styles.romFields}>
                  <NumberField label="Ekstension °" value={state.c3.factRoot.objective.extensionDegrees} onCommit={(value) => applyFact({ type: "set-objective", key: "extensionDegrees", value })} />
                  <NumberField label="Fleksion °" value={state.c3.factRoot.objective.flexionDegrees} onCommit={(value) => applyFact({ type: "set-objective", key: "flexionDegrees", value })} />
                </div>
              )}
            </div>
            <div className={styles.group}>
              <MultiChoice label="Palpationsfund" values={state.c3.factRoot.objective.palpationFindings} options={palpations} onToggle={(value: PalpationFinding) => applyFact({ type: "toggle-palpation", value })} />
              <Choice label="Palpationsstatus" value={state.c3.factRoot.objective.palpationStatus} options={[
                { value: "no-focal-tenderness", label: "Ingen fokal ømhed" },
                { value: "not-performed", label: "Ikke udført" },
                { value: "not-assessable", label: "Ikke vurderbar" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "palpationStatus", value })} />
            </div>
            <div className={styles.group}>
              <Choice label="Lachman" value={state.c3.factRoot.objective.lachman} options={[
                { value: "negative", label: "Negativ" },
                { value: "positive", label: "Positiv" },
                { value: "not-performed", label: "Ikke udført" },
                { value: "not-assessable", label: "Ikke vurderbar" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "lachman", value })} />
              <Choice label="Valgusstres" value={state.c3.factRoot.objective.valgus} options={[
                { value: "stable", label: "Stabil" },
                { value: "lax", label: "Laks" },
                { value: "painful-no-laxity", label: "Smerte uden laksitet" },
                { value: "not-performed", label: "Ikke udført" },
                { value: "not-assessable", label: "Ikke vurderbar" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "valgus", value })} />
              <Choice label="Varusstres" value={state.c3.factRoot.objective.varus} options={[
                { value: "stable", label: "Stabil" },
                { value: "lax", label: "Laks" },
                { value: "painful-no-laxity", label: "Smerte uden laksitet" },
                { value: "not-performed", label: "Ikke udført" },
                { value: "not-assessable", label: "Ikke vurderbar" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "varus", value })} />
              <Choice label="Menisktest" value={state.c3.factRoot.objective.meniscalTest} options={[
                { value: "negative", label: "Negativ" },
                { value: "positive", label: "Positiv" },
                { value: "not-performed", label: "Ikke udført" },
                { value: "not-assessable", label: "Ikke vurderbar" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "meniscalTest", value })} />
            </div>
            <div className={styles.group}>
              <Choice label="Patellatest" value={state.c3.factRoot.objective.patella} options={[
                { value: "negative", label: "Negativ" },
                { value: "positive", label: "Positiv" },
                { value: "not-performed", label: "Ikke udført" },
                { value: "not-assessable", label: "Ikke vurderbar" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "patella", value })} />
              <Choice label="Neurovaskulær status" value={state.c3.factRoot.objective.neurovascular} options={[
                { value: "normal", label: "Normal" },
                { value: "abnormal", label: "Afvigende" },
                { value: "not-assessed", label: "Ikke vurderet" },
                { value: "not-assessable", label: "Ikke vurderbar" }
              ]} onChange={(value) => applyFact({ type: "set-objective", key: "neurovascular", value })} />
            </div>
          </FlowSection>

          <FlowSection hidden={!state.workflow.problemProfile} id="assessment" marker="A" title="Vurdering">
            <div className={styles.assessment}>
              <label>
                <span>Klinikerens vurdering</span>
                <textarea value={assessmentDraft} onChange={(event) => setAssessmentDraft(event.target.value)} placeholder="Skriv egen vurdering…" />
              </label>
              <button type="button" onClick={() => {
                if (activeAssessment) {
                  updateC3(removeC3Assessment(state.c3, activeAssessment.entryId).state);
                  return;
                }
                const transition = createC3Assessment(state.c3, "primary", assessmentDraft);
                updateC3(transition.state);
              }}>{activeAssessment ? "Fjern vurdering" : "Registrer vurdering"}</button>
              {activeAssessment && <p>{activeAssessment.text}</p>}
            </div>
          </FlowSection>

          <FlowSection hidden={!state.workflow.problemProfile} id="plan" marker="P" title="Plan">
            <div className={styles.phrases}>
              {C3_PHRASES.map((phrase) => (
                <button
                  key={phrase.id}
                  type="button"
                  aria-pressed={activePhrases.some((entry) => entry.phraseId === phrase.id)}
                  onClick={() => togglePhrase(phrase.id)}
                >
                  <span>{phrase.category === "plan" ? "Plan" : phrase.category === "follow-up" ? "Opfølgning" : "Safety-net"}</span>
                  {phrase.text}
                </button>
              ))}
            </div>
          </FlowSection>

          <FlowSection hidden={!state.workflow.problemProfile} id="document" marker="→" title="PSOAP-dokument">
            <div className={styles.documentHeader}>
              <div role="group" aria-label="Dokumentationsprofil">
                {(["quick", "standard"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={profile === item}
                    onClick={() => {
                      setState((current) => ({ ...current, c3: setC3Profile(current.c3, item) }));
                      setInstrumentation((current) => ({ ...current, profileSwitches: current.profileSwitches + 1 }));
                    }}
                  >
                    {item === "quick" ? "Quick" : "Standard"}
                  </button>
                ))}
              </div>
              <span>Samme source revision {state.c3.sourceRevision}</span>
            </div>
            {draftStatus === "stale" && (
              <div className={styles.stale} role="status">
                Udkastet er ældre end de registrerede oplysninger.
                <button type="button" onClick={() => updateC3(discardC3ManualDraft(state.c3, profile))}>Brug ny genereret tekst</button>
              </div>
            )}
            <textarea
              className={styles.document}
              aria-label="Rediger PSOAP-dokument"
              value={documentText}
              onFocus={() => {
                setState((current) => {
                  const currentProfile = current.c3.outputProfile;
                  if (current.c3.drafts[currentProfile]) return current;
                  const baseText = projectC32PsoapDocument(current, currentProfile);
                  return {
                    ...current,
                    c3: setC3ManualDraft(current.c3, currentProfile, baseText, baseText)
                  };
                });
              }}
              onChange={(event) => {
                const text = event.target.value;
                setState((current) => ({
                  ...current,
                  c3: setC3ManualDraft(
                    current.c3,
                    current.c3.outputProfile,
                    projectC32PsoapDocument(current, current.c3.outputProfile),
                    text
                  )
                }));
                setInstrumentation((current) => ({ ...current, documentEdits: current.documentEdits + 1 }));
              }}
            />
            <div className={styles.copyRow}>
              <button type="button" onClick={copyDocument}>Kopiér PSOAP</button>
              <span role="status">{copyFeedback}</span>
            </div>
          </FlowSection>
        </div>

        <aside className={styles.companion}>
          <p>Cortex Overblik</p>
          <h2>Registreret, ikke fortolket</h2>
          <dl>
            <div><dt>Source revision</dt><dd>{state.c3.sourceRevision}</dd></div>
            <div><dt>Profil</dt><dd>{profile === "quick" ? "Quick" : "Standard"}</dd></div>
            <div><dt>Dokument</dt><dd>{draftStatus === "generated" ? "Genereret" : draftStatus === "current" ? "Redigeret" : "Forældet"}</dd></div>
            <div><dt>Scenario</dt><dd>{C32_SCENARIO_VERSION}</dd></div>
          </dl>
          <details>
            <summary>Evalueringsspor</summary>
            <pre data-testid="c32-instrumentation">{JSON.stringify({ ...instrumentation, elapsedSeconds: elapsed }, null, 2)}</pre>
          </details>
        </aside>
      </div>

      {preview && (
        <div className={styles.preview} role="dialog" aria-modal="true" aria-labelledby="c32-preview-title">
          <div>
            <h2 id="c32-preview-title">{preview.batchId === "C32-BATCH-ROM-NORMAL-001" ? "Normal ROM 0–140°" : "Red flags · Normal"}</h2>
            <p>Kun blanke felter skrives. Udfyldte felter vises som kollisioner.</p>
            <ul>
              {preview.items.map((item) => (
                <li key={item.fieldId}>
                  <code>{item.fieldId}</code>
                  <span>{String(item.currentValue ?? "blank")} → {String(item.proposedValue)}</span>
                  {item.collision && <strong>Kollision · bevares</strong>}
                </li>
              ))}
            </ul>
            <div>
              <button type="button" onClick={() => setBatchPreview(undefined)}>Annuller</button>
              <button type="button" onClick={commitBatch}>Bekræft de viste facts</button>
            </div>
          </div>
        </div>
      )}

      {state.c3.recovery && (
        <div className={styles.recovery} role="alert">
          <strong>Skjulte oplysninger er bevaret som recovery-kopi.</strong>
          <span>De er ikke aktive facts. Gendan eller kassér før en ny recovery-skabende ændring.</span>
          <div>
            <button type="button" onClick={() => {
              updateC3(restoreC3Recovery(state.c3));
              setInstrumentation((current) => ({ ...current, recoveryEvents: current.recoveryEvents + 1 }));
            }}>Gendan</button>
            <button type="button" onClick={() => {
              updateC3(discardC3Recovery(state.c3));
              setInstrumentation((current) => ({ ...current, recoveryEvents: current.recoveryEvents + 1 }));
            }}>Kassér</button>
          </div>
        </div>
      )}
    </main>
  );
}
