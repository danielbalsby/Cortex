"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode
} from "react";

import type {
  PainProvocation,
  PalpationFinding,
  SprintOneOneHistory,
  SprintOneOneObjective
} from "@/clinical/prototypes/sprint-1-1/model";
import {
  C3_ASSESSMENT_FIXTURE,
  C3_FIXTURE_SHA256,
  C3_PHRASES
} from "@/clinical/prototypes/c3/fixtures";
import {
  createEmptyC3State,
  getActiveAssessments,
  getActivePhrases,
  type C3AssessmentRole,
  type C3DocumentProfile,
  type C3PhraseCategory,
  type C3State
} from "@/clinical/prototypes/c3/model";
import {
  deriveC3Completeness,
  projectC3Document
} from "@/clinical/prototypes/c3/projections";
import {
  applyC3FactAction,
  categoryLabel,
  continueC3ManualDraft,
  createC3Assessment,
  createC3FixtureState,
  discardC3ManualDraft,
  discardC3Recovery,
  editC3Phrase,
  getC3DraftStatus,
  removeC3Assessment,
  removeC3Phrase,
  restoreC3Recovery,
  reviseC3Assessment,
  selectC3Phrase,
  setC3ManualDraft,
  setC3Profile,
  type C3FactAction
} from "@/clinical/prototypes/c3/state";

import styles from "./C3CalmClinicalWorkflow.module.css";

type ModuleId = "history" | "objective" | "assessment" | "plan" | "documents";
type TaskId = `C3-T${`0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | "10"}`;

interface TraceEvent {
  readonly sequence: number;
  readonly taskId: TaskId;
  readonly kind: string;
  readonly target: string;
}

interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
}

const yesNoNotAssessed = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nej" },
  { value: "not-assessed", label: "Ikke vurderet" }
] as const;

const testResults = [
  { value: "negative", label: "Negativ" },
  { value: "positive", label: "Positiv" },
  { value: "not-performed", label: "Ikke udført" },
  { value: "not-assessable", label: "Ikke vurderbar" }
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

const modules: readonly { readonly id: ModuleId; readonly label: string; readonly eyebrow: string }[] = [
  { id: "history", label: "Anamnese", eyebrow: "Registrerede facts" },
  { id: "objective", label: "Objektivt", eyebrow: "Registrerede facts" },
  { id: "assessment", label: "Vurdering", eyebrow: "Klinikerens vurdering" },
  { id: "plan", label: "Plan", eyebrow: "Klinikerens commitments" },
  { id: "documents", label: "Dokumentation", eyebrow: "Afledte udkast" }
];

function extractSection(text: string, heading: string): string {
  return text.split("\n\n").find((part) => part.startsWith(`${heading}\n`))?.slice(heading.length + 1) ?? "";
}

function DirectChoice<T extends string>({
  legend,
  name,
  value,
  options,
  onChange
}: {
  readonly legend: string;
  readonly name: string;
  readonly value?: T;
  readonly options: readonly Option<T>[];
  readonly onChange: (value: T, trigger: HTMLElement) => void;
}) {
  return (
    <fieldset className={styles.directChoice}>
      <legend>{legend}</legend>
      <div>
        {options.map((option, index) => (
          <label key={option.value}>
            <input
              data-autofocus={index === 0 ? "true" : undefined}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(event) => onChange(option.value, event.currentTarget)}
            />
            <span>{option.label}</span>
          </label>
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
  readonly onChange: (value: T | undefined, trigger: HTMLElement) => void;
}) {
  return (
    <label className={styles.selectField}>
      <span>{label}</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange((event.currentTarget.value || undefined) as T | undefined, event.currentTarget)}
      >
        <option value="">Ikke afklaret</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function MultiChoice<T extends string>({
  legend,
  values,
  options,
  onToggle
}: {
  readonly legend: string;
  readonly values: readonly T[];
  readonly options: readonly Option<T>[];
  readonly onToggle: (value: T, trigger: HTMLElement) => void;
}) {
  return (
    <fieldset className={styles.multiChoice}>
      <legend>{legend}<small>Flere kan vælges</small></legend>
      <div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={(event) => onToggle(option.value, event.currentTarget)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CommitField({
  label,
  value,
  multiline = false,
  placeholder,
  onCommit
}: {
  readonly label: string;
  readonly value?: string;
  readonly multiline?: boolean;
  readonly placeholder?: string;
  readonly onCommit: (value: string | undefined, trigger: HTMLElement) => void;
}) {
  const [draft, setDraft] = useState(value ?? "");
  useEffect(() => setDraft(value ?? ""), [value]);

  function commit(trigger: HTMLElement) {
    const cleaned = draft.trim() || undefined;
    onCommit(cleaned, trigger);
  }

  function handleKey(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.key === "Enter" && !multiline) {
      event.preventDefault();
      commit(event.currentTarget);
    }
    if (event.key === "Escape") setDraft(value ?? "");
  }

  return (
    <label className={`${styles.commitField} ${multiline ? styles.wide : ""}`}>
      <span>{label}</span>
      {multiline
        ? <textarea value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKey} />
        : <input value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKey} />}
      <button type="button" onClick={(event) => commit(event.currentTarget)}>Gem</button>
    </label>
  );
}

function CommitNumber({
  label,
  value,
  onCommit
}: {
  readonly label: string;
  readonly value?: number;
  readonly onCommit: (value: number | undefined, trigger: HTMLElement) => void;
}) {
  const [draft, setDraft] = useState(value === undefined ? "" : String(value));
  useEffect(() => setDraft(value === undefined ? "" : String(value)), [value]);
  return (
    <label className={styles.commitField}>
      <span>{label}</span>
      <input
        inputMode="decimal"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setDraft(value === undefined ? "" : String(value));
          if (event.key === "Enter") {
            event.preventDefault();
            const parsed = Number(draft.replace(",", "."));
            onCommit(draft.trim() && Number.isFinite(parsed) ? parsed : undefined, event.currentTarget);
          }
        }}
      />
      <button type="button" onClick={(event) => {
        const parsed = Number(draft.replace(",", "."));
        onCommit(draft.trim() && Number.isFinite(parsed) ? parsed : undefined, event.currentTarget);
      }}>Gem</button>
    </label>
  );
}

function EditorSection({ title, children }: { readonly title: string; readonly children: ReactNode }) {
  return <section className={styles.editorSection}><h3>{title}</h3><div className={styles.editorFlow}>{children}</div></section>;
}

export function C3CalmClinicalWorkflow() {
  const [state, setState] = useState<C3State>(createEmptyC3State);
  const [activeModule, setActiveModule] = useState<ModuleId>();
  const [notice, setNotice] = useState<string>();
  const [trace, setTrace] = useState<readonly TraceEvent[]>([]);
  const moduleButtons = useRef<Partial<Record<ModuleId, HTMLButtonElement | null>>>({});
  const editorRef = useRef<HTMLDivElement>(null);
  const recoveryActionRef = useRef<HTMLButtonElement>(null);
  const recoveryTriggerRef = useRef<HTMLElement | null>(null);
  const focusAfterRecovery = useRef(false);

  const standardText = useMemo(() => projectC3Document(state, "standard"), [state]);
  const quickText = useMemo(() => projectC3Document(state, "quick"), [state]);
  const completeness = useMemo(() => deriveC3Completeness(state), [state]);
  const activeAssessments = getActiveAssessments(state);
  const activePhrases = getActivePhrases(state);
  const currentGenerated = state.outputProfile === "quick" ? quickText : standardText;
  const currentDraft = state.drafts[state.outputProfile];
  const draftStatus = getC3DraftStatus(state, state.outputProfile);

  function record(taskId: TaskId, kind: string, target: string) {
    setTrace((events) => [
      ...events,
      { sequence: events.length + 1, taskId, kind, target }
    ]);
  }

  useEffect(() => {
    if (!activeModule) return;
    editorRef.current?.querySelector<HTMLElement>("[data-autofocus], input, select, textarea, button")?.focus();
  }, [activeModule]);

  useEffect(() => {
    if (state.recovery) recoveryActionRef.current?.focus();
    if (!state.recovery && focusAfterRecovery.current) {
      const target = recoveryTriggerRef.current;
      if (target?.isConnected) target.focus();
      else moduleButtons.current.history?.focus();
      recoveryTriggerRef.current = null;
      focusAfterRecovery.current = false;
    }
  }, [state.recovery]);

  function toggleModule(module: ModuleId) {
    const closing = activeModule === module;
    setActiveModule(closing ? undefined : module);
    setNotice(undefined);
    record("C3-T01", closing ? "module-close" : "module-open", module);
    if (closing) requestAnimationFrame(() => moduleButtons.current[module]?.focus());
  }

  function closeActiveModule() {
    if (!activeModule) return;
    const closing = activeModule;
    setActiveModule(undefined);
    setNotice("Redigeringen blev lukket. Ikke-gemte tekstændringer er ikke registreret.");
    record("C3-T03", "escape-close", closing);
    requestAnimationFrame(() => moduleButtons.current[closing]?.focus());
  }

  function dispatchFact(action: C3FactAction, trigger: HTMLElement, taskId: TaskId = "C3-T02") {
    const transition = applyC3FactAction(state, action);
    if (transition.outcome === "blocked") {
      setNotice("Afklar den eksisterende recovery-kopi, før en ny ændring kan fjerne registrerede oplysninger.");
      recoveryActionRef.current?.focus();
      record("C3-T09", "recovery-collision-blocked", action.type);
      return;
    }
    if (transition.outcome === "applied") {
      if (transition.recoveryCreated) recoveryTriggerRef.current = trigger;
      setState(transition.state);
      setNotice(transition.recoveryCreated ? "Tidligere child-facts er bevaret som inaktiv recovery-kopi." : undefined);
      record(taskId, "fact-action", `${action.type}:${"key" in action ? String(action.key) : "value"}`);
    }
  }

  function loadFixture() {
    setState(createC3FixtureState());
    setActiveModule(undefined);
    setNotice("C3-FIX-001 facts er indlæst. Vurdering og planfraser forbliver tomme.");
    record("C3-T10", "fixture-load", "C3-SRC-KNEE-001-R1");
  }

  function resolveRecovery(kind: "restore" | "discard") {
    setState(kind === "restore" ? restoreC3Recovery(state) : discardC3Recovery(state));
    setNotice(kind === "restore" ? "Recovery-facts blev gendannet eksplicit." : "Recovery-kopien blev kasseret eksplicit.");
    focusAfterRecovery.current = true;
    record("C3-T09", `recovery-${kind}`, state.recovery?.kind ?? "none");
  }

  function handleEditorKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeActiveModule();
    }
  }

  const readText: Record<ModuleId, string> = {
    history: extractSection(standardText, "Anamnese") || "Ingen anamnestiske facts registreret.",
    objective: extractSection(standardText, "Objektivt") || "Ingen objektive facts registreret.",
    assessment: activeAssessments.length
      ? activeAssessments.map((entry) => `${entry.role === "primary" ? "Primær" : entry.role === "secondary" ? "Sekundær" : "Differential"}: ${entry.text}`).join(" ")
      : "Ingen klinikerejet vurdering registreret.",
    plan: activePhrases.length
      ? activePhrases.map((entry) => `${categoryLabel(entry.category)}: ${entry.currentText}`).join(" ")
      : "Ingen plan-, opfølgnings- eller safety-netfraser valgt.",
    documents: currentGenerated || "Intet dokumentudkast endnu."
  };

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/"><span>C</span><strong>Cortex</strong></a>
        <div><small>C3 · Calm Clinical Workflow</small><strong>Syntetisk learning prototype</strong></div>
        <nav aria-label="Comparatorer"><a href="/prototype/sprint-1-2-c2">C2 kontrol</a><a href="/prototype/sprint-1-2-c2-2">C2.2</a><strong>C3</strong></nav>
      </header>

      <section className={styles.context}>
        <div><span>Aktuelt problem</span><h1>Højre knæsmerter efter vridtraume</h1><p>34-årig mand · syntetisk case · ingen patientdata</p></div>
        <button type="button" onClick={loadFixture}>Indlæs C3-FIX-001 facts</button>
      </section>

      <div className={styles.boundary}>
        <strong>Klinikeren registrerer. Cortex organiserer og projicerer.</strong>
        <span>Ingen forslag, anbefalinger, referral eller klinisk godkendelse.</span>
      </div>

      {notice && <p className={styles.notice} role="status">{notice}</p>}

      {state.recovery && (
        <section className={styles.recovery} aria-label="Recovery kræver stillingtagen">
          <div>
            <strong>En tidligere registrering er inaktivt bevaret</strong>
            <p>Den indgår ikke i facts, completeness eller dokumenter. Afklar kopien før en ny pruning-ændring.</p>
          </div>
          <button ref={recoveryActionRef} type="button" onClick={() => resolveRecovery("restore")}>Gendan</button>
          <button type="button" onClick={() => resolveRecovery("discard")}>Kassér</button>
        </section>
      )}

      <div className={styles.workspace}>
        <article className={styles.modules} aria-label="Klinisk arbejdsflade">
          {modules.map((module) => {
            const isActive = activeModule === module.id;
            return (
              <section className={`${styles.module} ${isActive ? styles.activeModule : ""}`} key={module.id} aria-labelledby={`c3-${module.id}-heading`}>
                <header>
                  <div><span>{module.eyebrow}</span><h2 id={`c3-${module.id}-heading`}>{module.label}</h2></div>
                  <button
                    ref={(node) => { moduleButtons.current[module.id] = node; }}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`c3-${module.id}-editor`}
                    onClick={() => toggleModule(module.id)}
                  >
                    {isActive ? "Luk" : "Redigér"}
                  </button>
                </header>

                {!isActive && <p className={styles.readView}>{readText[module.id]}</p>}

                {isActive && (
                  <div
                    ref={editorRef}
                    id={`c3-${module.id}-editor`}
                    className={styles.editor}
                    aria-label={`${module.label} redigering`}
                    onKeyDown={handleEditorKey}
                  >
                    {module.id === "history" && <HistoryEditor state={state.factRoot.history} dispatch={dispatchFact} />}
                    {module.id === "objective" && <ObjectiveEditor state={state.factRoot.objective} dispatch={dispatchFact} />}
                    {module.id === "assessment" && (
                      <AssessmentEditor
                        state={state}
                        onState={(next, event) => {
                          setState(next);
                          record("C3-T05", event, "assessment");
                        }}
                      />
                    )}
                    {module.id === "plan" && (
                      <PhraseEditor
                        state={state}
                        onState={(next, event) => {
                          setState(next);
                          record("C3-T06", event, "phrase");
                        }}
                      />
                    )}
                    {module.id === "documents" && (
                      <DocumentEditor
                        state={state}
                        generated={currentGenerated}
                        draft={currentDraft?.text}
                        status={draftStatus}
                        onState={(next, event) => {
                          setState(next);
                          record(event === "profile-switch" ? "C3-T04" : "C3-T07", event, "document");
                        }}
                      />
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </article>

        <aside className={styles.overview} aria-label="Cortex Overblik">
          <span>Cortex Overblik</span>
          <strong>{completeness.domains.filter((domain) => domain.status === "complete").length} af {completeness.domains.length} områder belyst</strong>
          <p>Orientering over prototypefelter — ikke klinisk vurdering eller godkendelse.</p>
          <ul>{completeness.domains.map((domain) => <li key={domain.id}><i>{domain.status === "complete" ? "✓" : "○"}</i><div><strong>{domain.label}</strong><small>{domain.missing.length ? domain.missing.slice(0, 2).join(" · ") : "Belyst"}</small></div></li>)}</ul>
          <dl>
            <div><dt>Snapshot</dt><dd>{state.snapshotId}</dd></div>
            <div><dt>Revision</dt><dd>R{state.sourceRevision}</dd></div>
            <div><dt>Profil</dt><dd>{state.outputProfile === "quick" ? "Quick" : "Standard"}</dd></div>
          </dl>
          <details>
            <summary>Evalueringsspor</summary>
            <p>{trace.length} events · C3-T01–C3-T10</p>
            <ol>{trace.slice(-8).map((event) => <li key={event.sequence}>{event.taskId} · {event.kind} · {event.target}</li>)}</ol>
          </details>
          <small className={styles.fixtureHash}>Fixture SHA-256: {C3_FIXTURE_SHA256}</small>
        </aside>
      </div>
    </main>
  );
}

function HistoryEditor({
  state,
  dispatch
}: {
  readonly state: SprintOneOneHistory;
  readonly dispatch: (action: C3FactAction, trigger: HTMLElement, taskId?: TaskId) => void;
}) {
  return (
    <>
      <EditorSection title="Problem og forløb">
        <DirectChoice legend="Side" name="c3-side" value={state.side} options={[{ value: "right", label: "Højre" }, { value: "left", label: "Venstre" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "side", value }, trigger)} />
        <DirectChoice legend="Debut" name="c3-onset" value={state.onset} options={[{ value: "acute", label: "Akut" }, { value: "insidious", label: "Snigende" }, { value: "gradual", label: "Gradvis" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "onset", value }, trigger)} />
        <CommitField label="Varighed" value={state.duration} placeholder="fx siden i går" onCommit={(value, trigger) => dispatch({ type: "set-history", key: "duration", value }, trigger)} />
        <SelectField label="Smerteforløb" value={state.painCourse} options={[{ value: "constant", label: "Konstant" }, { value: "intermittent", label: "Intermitterende" }, { value: "increasing", label: "Tiltagende" }, { value: "decreasing", label: "Aftagende" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "painCourse", value }, trigger)} />
      </EditorSection>
      <EditorSection title="Traume og smerte">
        <DirectChoice legend="Traume" name="c3-trauma" value={state.trauma} options={[{ value: "yes", label: "Ja" }, { value: "no", label: "Nej" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "trauma", value }, trigger, "C3-T09")} />
        {state.trauma === "yes" && (
          <>
            <SelectField label="Traumemekanisme" value={state.traumaMechanism} options={[{ value: "twisting", label: "Vrid" }, { value: "direct-blow", label: "Direkte traume" }, { value: "fall", label: "Fald" }, { value: "other", label: "Andet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "traumaMechanism", value }, trigger)} />
            <CommitField label="Traumekontekst" value={state.traumaContext} placeholder="fx under fodbold" onCommit={(value, trigger) => dispatch({ type: "set-history", key: "traumaContext", value }, trigger)} />
          </>
        )}
        <SelectField label="Smerteplacering" value={state.painLocation} options={[{ value: "medial", label: "Medial" }, { value: "lateral", label: "Lateral" }, { value: "anterior", label: "Forreste" }, { value: "posterior", label: "Bageste" }, { value: "diffuse", label: "Diffus" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "painLocation", value }, trigger)} />
        <MultiChoice legend="Smerteprovokation" values={state.provocations} options={provocations} onToggle={(value: PainProvocation, trigger) => dispatch({ type: "toggle-provocation", value }, trigger)} />
      </EditorSection>
      <EditorSection title="Funktion og ledsagesymptomer">
        <SelectField label="Funktionsevne" value={state.function} options={[{ value: "unaffected", label: "Upåvirket" }, { value: "mildly-reduced", label: "Let nedsat" }, { value: "significantly-reduced", label: "Betydeligt nedsat" }, { value: "unable-to-bear-weight", label: "Kan ikke støtte" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "function", value }, trigger)} />
        <SelectField label="Hævelse" value={state.swelling} options={[{ value: "none", label: "Ingen" }, { value: "mild", label: "Let" }, { value: "persistent", label: "Vedvarende" }, { value: "marked", label: "Udtalt" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "swelling", value }, trigger, "C3-T09")} />
        {state.swelling && state.swelling !== "none" && <CommitField label="Hævelsens tidsforløb" value={state.swellingTiming} onCommit={(value, trigger) => dispatch({ type: "set-history", key: "swellingTiming", value }, trigger)} />}
        <DirectChoice legend="Aflåsning" name="c3-locking" value={state.locking} options={yesNoNotAssessed} onChange={(value, trigger) => dispatch({ type: "set-history", key: "locking", value }, trigger, "C3-T08")} />
        <DirectChoice legend="Instabilitet" name="c3-instability" value={state.instability} options={yesNoNotAssessed} onChange={(value, trigger) => dispatch({ type: "set-history", key: "instability", value }, trigger)} />
        <DirectChoice legend="Hvilesmerter" name="c3-rest-pain" value={state.restPain} options={yesNoNotAssessed} onChange={(value, trigger) => dispatch({ type: "set-history", key: "restPain", value }, trigger)} />
        <DirectChoice legend="Nattesmerter" name="c3-night-pain" value={state.nightPain} options={yesNoNotAssessed} onChange={(value, trigger) => dispatch({ type: "set-history", key: "nightPain", value }, trigger, "C3-T08")} />
      </EditorSection>
      <EditorSection title="Safety-facts">
        <DirectChoice legend="Feber" name="c3-fever" value={state.fever} options={yesNoNotAssessed} onChange={(value, trigger) => dispatch({ type: "set-history", key: "fever", value }, trigger)} />
        <DirectChoice legend="Almen påvirkning" name="c3-systemic" value={state.systemicIllness} options={yesNoNotAssessed} onChange={(value, trigger) => dispatch({ type: "set-history", key: "systemicIllness", value }, trigger)} />
        <DirectChoice legend="Rødt, varmt og akut hævet knæ" name="c3-red-hot" value={state.redHotSwollenJoint} options={yesNoNotAssessed} onChange={(value, trigger) => dispatch({ type: "set-history", key: "redHotSwollenJoint", value }, trigger)} />
      </EditorSection>
    </>
  );
}

function ObjectiveEditor({
  state,
  dispatch
}: {
  readonly state: SprintOneOneObjective;
  readonly dispatch: (action: C3FactAction, trigger: HTMLElement, taskId?: TaskId) => void;
}) {
  return (
    <>
      <EditorSection title="Basis og bevægelighed">
        <SelectField label="Gang" value={state.gait} options={[{ value: "normal", label: "Normal" }, { value: "limp", label: "Haltende" }, { value: "unable", label: "Kan ikke støtte" }, { value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "gait", value }, trigger)} />
        <SelectField label="Inspektion" value={state.inspection} options={[{ value: "no-specific-findings", label: "Uden særlige fund" }, { value: "swelling", label: "Hævelse" }, { value: "redness", label: "Rødme" }, { value: "deformity", label: "Deformitet" }, { value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "inspection", value }, trigger)} />
        <SelectField label="Effusion" value={state.effusion} options={[{ value: "none", label: "Ingen" }, { value: "mild", label: "Let" }, { value: "moderate", label: "Moderat" }, { value: "large", label: "Stor" }, { value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "effusion", value }, trigger)} />
        <CommitNumber label="Ekstension i grader" value={state.extensionDegrees} onCommit={(value, trigger) => dispatch({ type: "set-objective", key: "extensionDegrees", value }, trigger)} />
        <CommitNumber label="Fleksion i grader" value={state.flexionDegrees} onCommit={(value, trigger) => dispatch({ type: "set-objective", key: "flexionDegrees", value }, trigger)} />
        <label className={styles.singleCheck}><input type="checkbox" checked={Boolean(state.rangeNotAssessable)} onChange={(event) => dispatch({ type: "set-objective", key: "rangeNotAssessable", value: event.currentTarget.checked || undefined }, event.currentTarget, "C3-T08")} /><span>ROM ikke vurderbar</span></label>
      </EditorSection>
      <EditorSection title="Palpation">
        <SelectField label="Palpationsstatus" value={state.palpationStatus} options={[{ value: "no-focal-tenderness", label: "Ingen fokal ømhed" }, { value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "palpationStatus", value }, trigger, "C3-T08")} />
        <MultiChoice legend="Ømme strukturer" values={state.palpationFindings} options={palpations} onToggle={(value: PalpationFinding, trigger) => dispatch({ type: "toggle-palpation", value }, trigger)} />
      </EditorSection>
      <EditorSection title="Målrettede tests">
        <SelectField label="Lachman" value={state.lachman} options={testResults} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "lachman", value }, trigger, "C3-T08")} />
        <SelectField label="Valgusstres" value={state.valgus} options={[{ value: "stable", label: "Stabil" }, { value: "lax", label: "Laksitet" }, { value: "painful-no-laxity", label: "Smerte uden laksitet" }, { value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "valgus", value }, trigger)} />
        <SelectField label="Varusstres" value={state.varus} options={[{ value: "stable", label: "Stabil" }, { value: "lax", label: "Laksitet" }, { value: "painful-no-laxity", label: "Smerte uden laksitet" }, { value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "varus", value }, trigger)} />
        <SelectField label="Menisktest" value={state.meniscalTest} options={testResults} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "meniscalTest", value }, trigger)} />
        <SelectField label="Patellatest" value={state.patella} options={testResults} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "patella", value }, trigger)} />
        <SelectField label="Distal neurovaskulær" value={state.neurovascular} options={[{ value: "normal", label: "Normal" }, { value: "abnormal", label: "Afvigende" }, { value: "not-assessed", label: "Ikke vurderet" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "neurovascular", value }, trigger)} />
      </EditorSection>
    </>
  );
}

function AssessmentEditor({
  state,
  onState
}: {
  readonly state: C3State;
  readonly onState: (state: C3State, event: string) => void;
}) {
  const [role, setRole] = useState<C3AssessmentRole>();
  const [text, setText] = useState("");
  const active = getActiveAssessments(state);
  const primaryExists = active.some((entry) => entry.role === "primary");

  return (
    <div className={styles.commitmentEditor}>
      <p className={styles.editorLead}>Kun klinikerens egen tekst. Cortex foreslår, rangerer eller promoverer intet.</p>
      <div className={styles.entryList}>
        {active.map((entry) => <AssessmentRow key={entry.entryId} state={state} entryId={entry.entryId} onState={onState} />)}
      </div>
      <section className={styles.newEntry}>
        <h3>Tilføj vurdering</h3>
        <DirectChoice legend="Klassifikation" name="c3-new-assessment-role" value={role} options={[{ value: "primary", label: "Primær" }, { value: "secondary", label: "Sekundær" }, { value: "differential", label: "Differential" }]} onChange={(value) => setRole(value)} />
        {primaryExists && role !== "primary" && <small>Der findes allerede én aktiv primær vurdering.</small>}
        <label><span>Klinikerens formulering</span><textarea value={text} placeholder={C3_ASSESSMENT_FIXTURE} onChange={(event) => setText(event.target.value)} /></label>
        <button
          type="button"
          disabled={!role || !text.trim() || (role === "primary" && primaryExists)}
          onClick={() => {
            if (!role) return;
            const transition = createC3Assessment(state, role, text);
            if (transition.outcome === "applied") {
              onState(transition.state, "assessment-create");
              setText("");
            }
          }}
        >
          Tilføj eksplicit
        </button>
      </section>
    </div>
  );
}

function AssessmentRow({ state, entryId, onState }: { readonly state: C3State; readonly entryId: string; readonly onState: (state: C3State, event: string) => void }) {
  const entry = getActiveAssessments(state).find((item) => item.entryId === entryId)!;
  const [role, setRole] = useState(entry.role);
  const [text, setText] = useState(entry.text);
  useEffect(() => { setRole(entry.role); setText(entry.text); }, [entry.role, entry.text]);
  const otherPrimary = getActiveAssessments(state).some((item) => item.role === "primary" && item.entryId !== entryId);
  return (
    <article className={styles.versionedEntry} aria-label={`Vurdering ${entry.entryId}`}>
      <label><span>Klassifikation</span><select value={role} onChange={(event) => setRole(event.target.value as C3AssessmentRole)}><option value="primary" disabled={otherPrimary}>Primær</option><option value="secondary">Sekundær</option><option value="differential">Differential</option></select></label>
      <label><span>Formulering</span><textarea value={text} onChange={(event) => setText(event.target.value)} /></label>
      <div><button type="button" onClick={() => onState(reviseC3Assessment(state, entryId, role, text).state, "assessment-revise")}>Gem ændring</button><button type="button" className={styles.quietDanger} onClick={() => onState(removeC3Assessment(state, entryId).state, "assessment-remove")}>Fjern</button></div>
      <small>Klinikertekst · {entry.versionId}</small>
    </article>
  );
}

function PhraseEditor({ state, onState }: { readonly state: C3State; readonly onState: (state: C3State, event: string) => void }) {
  const active = getActivePhrases(state);
  const categories: readonly C3PhraseCategory[] = ["plan", "follow-up", "safety-net"];
  return (
    <div className={styles.commitmentEditor}>
      <p className={styles.editorLead}>Valg registrerer kun den aktuelle ordlyd. Det dokumenterer ikke information, aftale eller udført handling.</p>
      {categories.map((category) => (
        <EditorSection title={categoryLabel(category)} key={category}>
          <div className={styles.phraseLibrary}>
            {C3_PHRASES.filter((phrase) => phrase.category === category).map((phrase) => {
              const selected = active.some((entry) => entry.phraseId === phrase.id);
              return <button key={phrase.id} type="button" disabled={selected} onClick={() => onState(selectC3Phrase(state, phrase.id).state, "phrase-select")}><span>{phrase.text}</span><small>{selected ? "Valgt" : `${phrase.id} · vælg`}</small></button>;
            })}
          </div>
          {active.filter((entry) => entry.category === category).map((entry) => <PhraseRow key={entry.entryId} state={state} entryId={entry.entryId} onState={onState} />)}
        </EditorSection>
      ))}
    </div>
  );
}

function PhraseRow({ state, entryId, onState }: { readonly state: C3State; readonly entryId: string; readonly onState: (state: C3State, event: string) => void }) {
  const entry = getActivePhrases(state).find((item) => item.entryId === entryId)!;
  const [text, setText] = useState(entry.currentText);
  useEffect(() => setText(entry.currentText), [entry.currentText]);
  return (
    <article className={styles.versionedEntry} aria-label={`Commitment ${entry.phraseId}`}>
      <label><span>Aktuel klinikerformulering</span><textarea value={text} onChange={(event) => setText(event.target.value)} /></label>
      <div><button type="button" onClick={() => onState(editC3Phrase(state, entryId, text).state, "phrase-edit")}>Gem ændring</button><button type="button" className={styles.quietDanger} onClick={() => onState(removeC3Phrase(state, entryId).state, "phrase-remove")}>Fjern</button></div>
      <small>{entry.fixtureId}@{entry.fixtureVersion} · {entry.phraseId}@{entry.phraseVersion} · {entry.action} af kliniker · {entry.versionId}</small>
    </article>
  );
}

function DocumentEditor({
  state,
  generated,
  draft,
  status,
  onState
}: {
  readonly state: C3State;
  readonly generated: string;
  readonly draft?: string;
  readonly status: "generated" | "current" | "stale";
  readonly onState: (state: C3State, event: string) => void;
}) {
  const shown = draft ?? generated;
  return (
    <div className={styles.documentEditor}>
      <DirectChoice<C3DocumentProfile> legend="Dokumentprofil" name="c3-document-profile" value={state.outputProfile} options={[{ value: "quick", label: "Quick" }, { value: "standard", label: "Standard" }]} onChange={(value) => onState(setC3Profile(state, value), "profile-switch")} />
      <p className={styles.projectionIdentity}>Samme snapshot: {state.snapshotId} · revision R{state.sourceRevision}. Profilen ændrer ingen facts.</p>
      <label><span>{state.outputProfile === "quick" ? "Quick" : "Standard"} udkast</span><textarea aria-label={`${state.outputProfile === "quick" ? "Quick" : "Standard"} dokumentudkast`} value={shown} placeholder="Ingen registreringer at projicere" onChange={(event) => onState(setC3ManualDraft(state, state.outputProfile, generated, event.target.value), "manual-draft")} /></label>
      {status === "stale" && <div className={styles.stale} role="status"><strong>Manuelt udkast er stale</strong><p>Source revision er ændret. Teksten er bevaret og er ikke læst tilbage som facts.</p><div><button type="button" onClick={() => onState(continueC3ManualDraft(state, state.outputProfile, generated), "draft-continue")}>Fortsæt med teksten</button><button type="button" onClick={() => onState(discardC3ManualDraft(state, state.outputProfile), "draft-regenerate")}>Regenerér fra registreringer</button></div></div>}
      {status === "current" && <button type="button" className={styles.secondaryAction} onClick={() => onState(discardC3ManualDraft(state, state.outputProfile), "draft-discard")}>Kassér manuel redigering</button>}
      <p className={styles.draftStatus}>Status: {status === "generated" ? "Genereret udkast" : status === "current" ? "Manuelt udkast · aktuelt" : "Manuelt udkast · stale"}. Kræver altid klinikerens review.</p>
    </div>
  );
}
