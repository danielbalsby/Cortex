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
import { deriveC3Completeness } from "@/clinical/prototypes/c3/projections";
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
import {
  getC31PsoapSections,
  projectC31PsoapDocument
} from "@/clinical/prototypes/c3-1/projections";

import styles from "./C31CalmInteraction.module.css";

type ModuleId = "history" | "objective" | "assessment" | "plan" | "documents";
type TaskId = `C31-T${`0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | "10"}`;

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

const yesNo = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nej" }
] as const;

const primaryTestResults = [
  { value: "negative", label: "Negativ" },
  { value: "positive", label: "Positiv" }
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
  { id: "documents", label: "Dokumentation", eyebrow: "PSOAP fra samme state" }
];

function focusNextField(trigger: HTMLElement) {
  const editor = trigger.closest<HTMLElement>("[data-calm-editor]");
  const current = trigger.closest<HTMLElement>("[data-field]");
  if (!editor || !current) return;
  const fields = [...editor.querySelectorAll<HTMLElement>("[data-field]")].filter((field) => field.offsetParent !== null);
  const index = fields.indexOf(current);
  const next = fields[index + 1];
  next?.querySelector<HTMLElement>("input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])")?.focus();
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
    <fieldset className={styles.directChoice} data-field>
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
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  focusNextField(event.currentTarget);
                }
              }}
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
    <label className={styles.selectField} data-field>
      <span>{label}</span>
      <select
        data-autofocus
        value={value ?? ""}
        onChange={(event) => onChange((event.currentTarget.value || undefined) as T | undefined, event.currentTarget)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            focusNextField(event.currentTarget);
          }
        }}
      >
        <option value="">Vælg…</option>
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
    <fieldset className={`${styles.multiChoice} ${styles.wide}`} data-field>
      <legend>{legend}<small>Flere kan vælges</small></legend>
      <div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={(event) => onToggle(option.value, event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  focusNextField(event.currentTarget);
                }
              }}
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
  placeholder,
  onCommit
}: {
  readonly label: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly onCommit: (value: string | undefined, trigger: HTMLElement) => void;
}) {
  const [draft, setDraft] = useState(value ?? "");
  const lastCommitted = useRef(value ?? "");
  const skipBlur = useRef(false);

  useEffect(() => {
    setDraft(value ?? "");
    lastCommitted.current = value ?? "";
  }, [value]);

  function commit(trigger: HTMLElement, advance = false) {
    const cleaned = draft.trim();
    if (cleaned !== lastCommitted.current) {
      lastCommitted.current = cleaned;
      onCommit(cleaned || undefined, trigger);
    }
    if (advance) requestAnimationFrame(() => focusNextField(trigger));
  }

  return (
    <label className={styles.commitField} data-field>
      <span>{label}<small>Enter fortsætter</small></span>
      <input
        data-autofocus
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => {
          if (skipBlur.current) {
            skipBlur.current = false;
            return;
          }
          commit(event.currentTarget);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit(event.currentTarget, true);
          }
          if (event.key === "Escape") {
            skipBlur.current = true;
            setDraft(value ?? "");
          }
        }}
      />
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
  const lastCommitted = useRef(value === undefined ? "" : String(value));
  const skipBlur = useRef(false);

  useEffect(() => {
    const next = value === undefined ? "" : String(value);
    setDraft(next);
    lastCommitted.current = next;
  }, [value]);

  function commit(trigger: HTMLElement, advance = false) {
    const cleaned = draft.trim();
    if (cleaned !== lastCommitted.current) {
      const parsed = Number(cleaned.replace(",", "."));
      if (!cleaned || Number.isFinite(parsed)) {
        lastCommitted.current = cleaned;
        onCommit(cleaned ? parsed : undefined, trigger);
      }
    }
    if (advance) requestAnimationFrame(() => focusNextField(trigger));
  }

  return (
    <label className={styles.commitField} data-field>
      <span>{label}<small>grader</small></span>
      <input
        data-autofocus
        inputMode="decimal"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => {
          if (skipBlur.current) {
            skipBlur.current = false;
            return;
          }
          commit(event.currentTarget);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit(event.currentTarget, true);
          }
          if (event.key === "Escape") {
            skipBlur.current = true;
            setDraft(value === undefined ? "" : String(value));
          }
        }}
      />
    </label>
  );
}

function CalmTabs<T extends string>({
  label,
  items,
  active,
  onChange
}: {
  readonly label: string;
  readonly items: readonly Option<T>[];
  readonly active: T;
  readonly onChange: (value: T) => void;
}) {
  return (
    <div className={styles.calmTabs} role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={active === item.value}
          onClick={() => onChange(item.value)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const offset = event.key === "ArrowRight" ? 1 : -1;
            const nextIndex = (index + offset + items.length) % items.length;
            const next = items[nextIndex];
            const tablist = event.currentTarget.parentElement;
            onChange(next.value);
            requestAnimationFrame(() => {
              tablist?.querySelectorAll<HTMLButtonElement>("[role=tab]")[nextIndex]?.focus();
            });
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function EditorSection({ title, intro, children }: { readonly title: string; readonly intro?: string; readonly children: ReactNode }) {
  return (
    <section className={styles.editorSection}>
      <header><h3>{title}</h3>{intro && <p>{intro}</p>}</header>
      <div className={styles.editorFlow}>{children}</div>
    </section>
  );
}

function ExceptionalField<T extends string>({
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
    <fieldset className={styles.exceptionalField} data-field>
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={(event) => onChange(value === option.value ? undefined : option.value, event.currentTarget)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function PsoapPreview({ text }: { readonly text: string }) {
  const blocks = text.split("\n\n");
  return (
    <div className={styles.psoapPreview} aria-label="PSOAP-visning">
      {blocks.map((block, index) => {
        const match = block.match(/^([PSOA]):\s*([\s\S]*)$/u);
        if (!match) return <p key={`${index}-${block}`}>{block}</p>;
        return (
          <section key={`${index}-${match[1]}`}>
            <strong>{match[1]}</strong>
            <p>{match[2] || <span>Ikke registreret</span>}</p>
          </section>
        );
      })}
    </div>
  );
}

export function C31CalmInteraction() {
  const [state, setState] = useState<C3State>(createEmptyC3State);
  const [activeModule, setActiveModule] = useState<ModuleId>();
  const [notice, setNotice] = useState<string>();
  const [trace, setTrace] = useState<readonly TraceEvent[]>([]);
  const moduleButtons = useRef<Partial<Record<ModuleId, HTMLButtonElement | null>>>({});
  const editorRef = useRef<HTMLDivElement>(null);
  const recoveryActionRef = useRef<HTMLButtonElement>(null);
  const recoveryTriggerRef = useRef<HTMLElement | null>(null);
  const focusAfterRecovery = useRef(false);

  const standardText = useMemo(() => projectC31PsoapDocument(state, "standard"), [state]);
  const quickText = useMemo(() => projectC31PsoapDocument(state, "quick"), [state]);
  const standardSections = useMemo(() => getC31PsoapSections(state, "standard"), [state]);
  const completeness = useMemo(() => deriveC3Completeness(state), [state]);
  const activeAssessments = getActiveAssessments(state);
  const activePhrases = getActivePhrases(state);
  const currentGenerated = state.outputProfile === "quick" ? quickText : standardText;
  const currentDraft = state.drafts[state.outputProfile];
  const draftStatus = getC3DraftStatus(state, state.outputProfile);

  function record(taskId: TaskId, kind: string, target: string) {
    setTrace((events) => [...events, { sequence: events.length + 1, taskId, kind, target }]);
  }

  useEffect(() => {
    if (!activeModule) return;
    const editor = editorRef.current;
    const preferred = editor?.querySelector<HTMLElement>("[data-autofocus]");
    const fallback = editor?.querySelector<HTMLElement>("input, select, textarea, button");
    (preferred ?? fallback)?.focus();
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
    record("C31-T01", closing ? "module-close" : "module-open", module);
    if (closing) requestAnimationFrame(() => moduleButtons.current[module]?.focus());
  }

  function closeActiveModule() {
    if (!activeModule) return;
    const closing = activeModule;
    setActiveModule(undefined);
    setNotice("Redigeringen blev lukket. Ikke-bekræftet tekst blev ikke registreret.");
    record("C31-T03", "escape-close", closing);
    requestAnimationFrame(() => moduleButtons.current[closing]?.focus());
  }

  function dispatchFact(action: C3FactAction, trigger: HTMLElement, taskId: TaskId = "C31-T02") {
    const transition = applyC3FactAction(state, action);
    if (transition.outcome === "blocked") {
      setNotice("Afklar den bevarede registrering, før endnu en afhængig ændring foretages.");
      recoveryActionRef.current?.focus();
      record("C31-T09", "recovery-collision-blocked", action.type);
      return;
    }
    if (transition.outcome === "applied") {
      if (transition.recoveryCreated) recoveryTriggerRef.current = trigger;
      setState(transition.state);
      setNotice(undefined);
      record(taskId, "fact-action", `${action.type}:${"key" in action ? String(action.key) : "value"}`);
    }
  }

  function dispatchFacts(actions: readonly C3FactAction[], trigger: HTMLElement, taskId: TaskId = "C31-T02") {
    let nextState = state;
    for (const action of actions) {
      const transition = applyC3FactAction(nextState, action);
      if (transition.outcome === "blocked") {
        setNotice("Afklar den bevarede registrering, før endnu en afhængig ændring foretages.");
        recoveryActionRef.current?.focus();
        record("C31-T09", "recovery-collision-blocked", action.type);
        return;
      }
      nextState = transition.state;
      if (transition.recoveryCreated) recoveryTriggerRef.current = trigger;
    }
    if (nextState !== state) {
      setState(nextState);
      setNotice(undefined);
      record(taskId, "fact-batch", actions.map((action) => `${action.type}:${"key" in action ? String(action.key) : "value"}`).join(","));
    }
  }

  function loadFixture() {
    setState(createC3FixtureState());
    setActiveModule(undefined);
    setNotice("Syntetiske C3-facts er indlæst. Vurdering og plan forbliver klinikerejede.");
    record("C31-T10", "fixture-load", "C3-SRC-KNEE-001-R1");
  }

  function resolveRecovery(kind: "restore" | "discard") {
    setState(kind === "restore" ? restoreC3Recovery(state) : discardC3Recovery(state));
    setNotice(kind === "restore" ? "Den tidligere registrering blev gendannet." : "Den tidligere registrering blev fjernet.");
    focusAfterRecovery.current = true;
    record("C31-T09", `recovery-${kind}`, state.recovery?.kind ?? "none");
  }

  const subjective = standardSections.find((section) => section.key === "subjective")?.text || "Ingen anamnestiske facts registreret.";
  const objective = standardSections.find((section) => section.key === "objective")?.text || "Ingen objektive facts registreret.";
  const assessment = activeAssessments.length
    ? activeAssessments.map((entry) => entry.text).join(" ")
    : "Ingen klinikerejet vurdering registreret.";
  const phraseGroups = (["plan", "follow-up", "safety-net"] as const)
    .map((category) => ({
      category,
      text: activePhrases.filter((entry) => entry.category === category).map((entry) => entry.currentText).join(" ")
    }))
    .filter((group) => group.text);
  const plan = phraseGroups.length
    ? phraseGroups.map((group) => `${categoryLabel(group.category)}: ${group.text}`).join("\n")
    : "Ingen plan-, opfølgnings- eller safety-netfraser valgt.";

  const readText: Record<Exclude<ModuleId, "documents">, string> = {
    history: subjective,
    objective,
    assessment,
    plan
  };

  const overviewModule: Partial<Record<string, ModuleId>> = {
    history: "history",
    objective: "objective",
    safety: "history",
    assessment: "assessment",
    plan: "plan"
  };

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/"><span>C</span><strong>Cortex</strong></a>
        <div><small>C3.1 · Calm Interaction</small><strong>Syntetisk learning prototype</strong></div>
        <nav aria-label="Comparatorer"><a href="/prototype/c3-calm-clinical-workflow">C3</a><strong>C3.1</strong></nav>
      </header>

      <section className={styles.context}>
        <div><span>Aktuelt problem</span><h1>Knæsmerter</h1><p>34-årig mand · syntetisk case · ingen patientdata</p></div>
        <button type="button" onClick={loadFixture}>Indlæs syntetisk case</button>
      </section>

      <div className={styles.boundary}>
        <strong>Læs → tag stilling → fortsæt.</strong>
        <span>Samme C3-state. Ingen forslag, anbefalinger eller klinisk godkendelse.</span>
      </div>

      {notice && <p className={styles.notice} role="status">{notice}</p>}

      {state.recovery && (
        <section className={styles.recovery} aria-label="Tidligere registrering kræver stillingtagen">
          <div><strong>Tidligere registrering bevaret</strong><p>Den er inaktiv og indgår ikke i facts eller dokumentation.</p></div>
          <button ref={recoveryActionRef} type="button" onClick={() => resolveRecovery("restore")}>Gendan</button>
          <button type="button" onClick={() => resolveRecovery("discard")}>Fjern</button>
        </section>
      )}

      <div className={`${styles.workspace} ${activeModule ? styles.focusMode : ""}`}>
        <article className={styles.modules} aria-label="Klinisk arbejdsflade">
          {modules.map((module) => {
            const isActive = activeModule === module.id;
            return (
              <section className={`${styles.module} ${isActive ? styles.activeModule : ""}`} key={module.id} aria-labelledby={`c31-${module.id}-heading`}>
                <header>
                  <div><span>{module.eyebrow}</span><h2 id={`c31-${module.id}-heading`}>{module.label}</h2></div>
                  <button
                    ref={(node) => { moduleButtons.current[module.id] = node; }}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`c31-${module.id}-editor`}
                    onClick={() => toggleModule(module.id)}
                  >
                    {isActive ? "Færdig" : "Redigér"}
                  </button>
                </header>

                {!isActive && module.id !== "documents" && <p className={styles.readView}>{readText[module.id]}</p>}
                {!isActive && module.id === "documents" && <PsoapPreview text={currentDraft?.text ?? currentGenerated} />}

                {isActive && (
                  <div
                    ref={editorRef}
                    id={`c31-${module.id}-editor`}
                    className={styles.editor}
                    data-calm-editor
                    aria-label={`${module.label} redigering`}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        closeActiveModule();
                      }
                    }}
                  >
                    {module.id === "history" && <HistoryEditor state={state.factRoot.history} dispatch={dispatchFact} />}
                    {module.id === "objective" && <ObjectiveEditor state={state.factRoot.objective} dispatch={dispatchFact} dispatchBatch={dispatchFacts} />}
                    {module.id === "assessment" && <AssessmentEditor state={state} onState={(next, event) => { setState(next); record("C31-T05", event, "assessment"); }} />}
                    {module.id === "plan" && <PhraseEditor state={state} onState={(next, event) => { setState(next); record("C31-T06", event, "phrase"); }} />}
                    {module.id === "documents" && (
                      <DocumentEditor
                        state={state}
                        generated={currentGenerated}
                        draft={currentDraft?.text}
                        status={draftStatus}
                        onState={(next, event) => { setState(next); record(event === "profile-switch" ? "C31-T04" : "C31-T07", event, "document"); }}
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
          <strong>Konsultationen</strong>
          <p>Orientering—ikke en score eller klinisk godkendelse.</p>
          <ul>
            {completeness.domains.map((domain) => {
              const target = overviewModule[domain.id];
              const isCurrent = target === activeModule;
              return (
                <li key={domain.id} className={isCurrent ? styles.currentOverview : ""}>
                  <button type="button" onClick={() => target && toggleModule(target)} aria-current={isCurrent ? "step" : undefined}>
                    <i>{domain.status === "complete" ? "✓" : domain.status === "partial" ? "·" : "○"}</i>
                    <div><strong>{domain.label}</strong><small>{domain.status === "complete" ? "Registreret" : domain.status === "partial" ? "Delvist registreret" : "Ikke registreret"}</small></div>
                  </button>
                </li>
              );
            })}
          </ul>
          <details className={styles.evaluationTrace}>
            <summary>Teknisk evalueringsspor</summary>
            <dl><div><dt>Snapshot</dt><dd>{state.snapshotId}</dd></div><div><dt>Revision</dt><dd>R{state.sourceRevision}</dd></div><div><dt>Profil</dt><dd>{state.outputProfile === "quick" ? "Quick" : "Standard"}</dd></div></dl>
            <p>{trace.length} events · C31-T01–C31-T10</p>
            <small>Fixture SHA-256: {C3_FIXTURE_SHA256}</small>
          </details>
        </aside>
      </div>
    </main>
  );
}

function HistoryEditor({ state, dispatch }: { readonly state: SprintOneOneHistory; readonly dispatch: (action: C3FactAction, trigger: HTMLElement, taskId?: TaskId) => void }) {
  const [section, setSection] = useState<"course" | "trauma" | "function" | "safety">("course");
  return (
    <>
      <CalmTabs label="Anamneseområder" active={section} onChange={setSection} items={[{ value: "course", label: "Problem og forløb" }, { value: "trauma", label: "Traume og smerte" }, { value: "function", label: "Funktion" }, { value: "safety", label: "Sikkerhed" }]} />
      {section === "course" && <EditorSection title="Problem og forløb" intro="Det aktuelle problem—uden at gøre blanke felter til facts.">
        <DirectChoice legend="Side" name="c31-side" value={state.side} options={[{ value: "right", label: "Højre" }, { value: "left", label: "Venstre" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "side", value }, trigger)} />
        <DirectChoice legend="Debut" name="c31-onset" value={state.onset} options={[{ value: "acute", label: "Akut" }, { value: "insidious", label: "Snigende" }, { value: "gradual", label: "Gradvis" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "onset", value }, trigger)} />
        <CommitField label="Varighed" value={state.duration} placeholder="fx siden i går" onCommit={(value, trigger) => dispatch({ type: "set-history", key: "duration", value }, trigger)} />
        <SelectField label="Smerteforløb" value={state.painCourse} options={[{ value: "constant", label: "Konstant" }, { value: "intermittent", label: "Intermitterende" }, { value: "increasing", label: "Tiltagende" }, { value: "decreasing", label: "Aftagende" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "painCourse", value }, trigger)} />
      </EditorSection>}
      {section === "trauma" && <EditorSection title="Traume og smerte" intro="Kontekst vises kun, når traume er registreret.">
        <DirectChoice legend="Traume" name="c31-trauma" value={state.trauma} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "trauma", value }, trigger, "C31-T09")} />
        {state.trauma === "yes" && <><SelectField label="Traumemekanisme" value={state.traumaMechanism} options={[{ value: "twisting", label: "Vrid" }, { value: "direct-blow", label: "Direkte traume" }, { value: "fall", label: "Fald" }, { value: "other", label: "Andet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "traumaMechanism", value }, trigger)} /><CommitField label="Traumekontekst" value={state.traumaContext} placeholder="fx under fodbold" onCommit={(value, trigger) => dispatch({ type: "set-history", key: "traumaContext", value }, trigger)} /></>}
        <SelectField label="Smerteplacering" value={state.painLocation} options={[{ value: "medial", label: "Medial" }, { value: "lateral", label: "Lateral" }, { value: "anterior", label: "Forreste" }, { value: "posterior", label: "Bageste" }, { value: "diffuse", label: "Diffus" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "painLocation", value }, trigger)} />
        <MultiChoice legend="Smerteprovokation" values={state.provocations} options={provocations} onToggle={(value: PainProvocation, trigger) => dispatch({ type: "toggle-provocation", value }, trigger)} />
      </EditorSection>}
      {section === "function" && <EditorSection title="Funktion og ledsagesymptomer" intro="Kun aktivt registrerede svar indgår i journalen.">
        <SelectField label="Funktionsevne" value={state.function} options={[{ value: "unaffected", label: "Upåvirket" }, { value: "mildly-reduced", label: "Let nedsat" }, { value: "significantly-reduced", label: "Betydeligt nedsat" }, { value: "unable-to-bear-weight", label: "Kan ikke støtte" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "function", value }, trigger)} />
        <SelectField label="Hævelse" value={state.swelling} options={[{ value: "none", label: "Ingen" }, { value: "mild", label: "Let" }, { value: "persistent", label: "Vedvarende" }, { value: "marked", label: "Udtalt" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "swelling", value }, trigger, "C31-T09")} />
        {state.swelling && state.swelling !== "none" && <CommitField label="Hævelsens tidsforløb" value={state.swellingTiming} onCommit={(value, trigger) => dispatch({ type: "set-history", key: "swellingTiming", value }, trigger)} />}
        <DirectChoice legend="Aflåsning" name="c31-locking" value={state.locking === "not-assessed" ? undefined : state.locking} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "locking", value }, trigger)} />
        <DirectChoice legend="Instabilitet" name="c31-instability" value={state.instability === "not-assessed" ? undefined : state.instability} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "instability", value }, trigger)} />
        <DirectChoice legend="Hvilesmerter" name="c31-rest-pain" value={state.restPain === "not-assessed" ? undefined : state.restPain} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "restPain", value }, trigger)} />
        <DirectChoice legend="Nattesmerter" name="c31-night-pain" value={state.nightPain === "not-assessed" ? undefined : state.nightPain} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "nightPain", value }, trigger)} />
        <details className={styles.specialRegister}><summary>Særlige registreringer</summary><div><ExceptionalField label="Aflåsning" value={state.locking === "not-assessed" ? state.locking : undefined} options={[{ value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "locking", value }, trigger, "C31-T08")} /><ExceptionalField label="Instabilitet" value={state.instability === "not-assessed" ? state.instability : undefined} options={[{ value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "instability", value }, trigger, "C31-T08")} /><ExceptionalField label="Hvile-/nattesmerter" value={state.nightPain === "not-assessed" ? state.nightPain : undefined} options={[{ value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "nightPain", value }, trigger, "C31-T08")} /></div></details>
      </EditorSection>}
      {section === "safety" && <EditorSection title="Sikkerhed" intro="Positive og negative svar forbliver kliniske facts—Cortex konkluderer ikke.">
        <DirectChoice legend="Feber" name="c31-fever" value={state.fever === "not-assessed" ? undefined : state.fever} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "fever", value }, trigger)} />
        <DirectChoice legend="Almen påvirkning" name="c31-systemic" value={state.systemicIllness === "not-assessed" ? undefined : state.systemicIllness} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "systemicIllness", value }, trigger)} />
        <DirectChoice legend="Rødt, varmt og akut hævet knæ" name="c31-red-hot" value={state.redHotSwollenJoint === "not-assessed" ? undefined : state.redHotSwollenJoint} options={yesNo} onChange={(value, trigger) => dispatch({ type: "set-history", key: "redHotSwollenJoint", value }, trigger)} />
        <details className={styles.specialRegister}><summary>Særlige registreringer</summary><div><ExceptionalField label="Feber" value={state.fever === "not-assessed" ? state.fever : undefined} options={[{ value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "fever", value }, trigger, "C31-T08")} /><ExceptionalField label="Almen påvirkning" value={state.systemicIllness === "not-assessed" ? state.systemicIllness : undefined} options={[{ value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "systemicIllness", value }, trigger, "C31-T08")} /><ExceptionalField label="Rødt, varmt og akut hævet knæ" value={state.redHotSwollenJoint === "not-assessed" ? state.redHotSwollenJoint : undefined} options={[{ value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value, trigger) => dispatch({ type: "set-history", key: "redHotSwollenJoint", value }, trigger, "C31-T08")} /></div></details>
      </EditorSection>}
    </>
  );
}

function ObjectiveEditor({ state, dispatch, dispatchBatch }: { readonly state: SprintOneOneObjective; readonly dispatch: (action: C3FactAction, trigger: HTMLElement, taskId?: TaskId) => void; readonly dispatchBatch: (actions: readonly C3FactAction[], trigger: HTMLElement, taskId?: TaskId) => void }) {
  const [section, setSection] = useState<"basis" | "palpation" | "tests" | "special">("basis");
  return (
    <>
      <CalmTabs label="Objektive områder" active={section} onChange={setSection} items={[{ value: "basis", label: "Basis og bevægelighed" }, { value: "palpation", label: "Palpation" }, { value: "tests", label: "Målrettede tests" }, { value: "special", label: "Særlige" }]} />
      {section === "basis" && <EditorSection title="Basis og bevægelighed" intro="ROM registreres først som fact, når klinikeren bekræfter værdien.">
        <SelectField label="Gang" value={state.gait === "not-assessed" ? undefined : state.gait} options={[{ value: "normal", label: "Normal" }, { value: "limp", label: "Haltende" }, { value: "unable", label: "Kan ikke støtte" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "gait", value }, trigger)} />
        <SelectField label="Inspektion" value={state.inspection === "not-assessed" ? undefined : state.inspection} options={[{ value: "no-specific-findings", label: "Uden særlige fund" }, { value: "swelling", label: "Hævelse" }, { value: "redness", label: "Rødme" }, { value: "deformity", label: "Deformitet" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "inspection", value }, trigger)} />
        <SelectField label="Effusion" value={state.effusion === "not-assessed" ? undefined : state.effusion} options={[{ value: "none", label: "Ingen" }, { value: "mild", label: "Let" }, { value: "moderate", label: "Moderat" }, { value: "large", label: "Stor" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "effusion", value }, trigger)} />
        <CommitNumber label="Ekstension" value={state.extensionDegrees} onCommit={(value, trigger) => dispatch({ type: "set-objective", key: "extensionDegrees", value }, trigger)} />
        <CommitNumber label="Fleksion" value={state.flexionDegrees} onCommit={(value, trigger) => dispatch({ type: "set-objective", key: "flexionDegrees", value }, trigger)} />
        <button className={styles.normalRom} type="button" onClick={(event) => dispatchBatch([{ type: "set-objective", key: "extensionDegrees", value: 0 }, { type: "set-objective", key: "flexionDegrees", value: 140 }], event.currentTarget)}>Registrér normal ROM 0–140°</button>
      </EditorSection>}
      {section === "palpation" && <EditorSection title="Palpation" intro="Ingen fokal ømhed er gensidigt eksklusiv med anatomiske fund.">
        <fieldset className={`${styles.multiChoice} ${styles.wide}`} data-field><legend>Palpation<small>Flere fund kan vælges</small></legend><div>
          <label><input type="checkbox" checked={state.palpationStatus === "no-focal-tenderness"} onChange={(event) => dispatch({ type: "set-objective", key: "palpationStatus", value: event.currentTarget.checked ? "no-focal-tenderness" : undefined }, event.currentTarget, "C31-T09")} /><span>Ingen fokal ømhed</span></label>
          {palpations.map((option) => <label key={option.value}><input type="checkbox" checked={state.palpationFindings.includes(option.value)} onChange={(event) => dispatch({ type: "toggle-palpation", value: option.value as PalpationFinding }, event.currentTarget)} /><span>{option.label}</span></label>)}
        </div></fieldset>
      </EditorSection>}
      {section === "tests" && <EditorSection title="Målrettede tests" intro="De almindelige resultater står fremme. Afvigende registreringsforhold ligger under Særlige.">
        <SelectField label="Lachman" value={state.lachman === "not-performed" || state.lachman === "not-assessable" ? undefined : state.lachman} options={primaryTestResults} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "lachman", value }, trigger)} />
        <SelectField label="Valgusstres" value={state.valgus === "not-performed" || state.valgus === "not-assessable" ? undefined : state.valgus} options={[{ value: "stable", label: "Stabil" }, { value: "lax", label: "Laksitet" }, { value: "painful-no-laxity", label: "Smerte uden laksitet" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "valgus", value }, trigger)} />
        <SelectField label="Varusstres" value={state.varus === "not-performed" || state.varus === "not-assessable" ? undefined : state.varus} options={[{ value: "stable", label: "Stabil" }, { value: "lax", label: "Laksitet" }, { value: "painful-no-laxity", label: "Smerte uden laksitet" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "varus", value }, trigger)} />
        <SelectField label="Menisktest" value={state.meniscalTest === "not-performed" || state.meniscalTest === "not-assessable" ? undefined : state.meniscalTest} options={primaryTestResults} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "meniscalTest", value }, trigger)} />
        <SelectField label="Patellatest" value={state.patella === "not-performed" || state.patella === "not-assessable" ? undefined : state.patella} options={primaryTestResults} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "patella", value }, trigger)} />
        <SelectField label="Distal neurovaskulær" value={state.neurovascular === "not-assessed" || state.neurovascular === "not-assessable" ? undefined : state.neurovascular} options={[{ value: "normal", label: "Normal" }, { value: "abnormal", label: "Afvigende" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "neurovascular", value }, trigger)} />
      </EditorSection>}
      {section === "special" && <EditorSection title="Særlige registreringer" intro="Bruges kun, når undersøgelsen ikke er gennemført eller ikke kan vurderes.">
        <ExceptionalField label="ROM" value={state.rangeNotAssessable ? "not-assessable" : undefined} options={[{ value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "rangeNotAssessable", value: value ? true : undefined }, trigger, "C31-T08")} />
        <ExceptionalField label="Palpation" value={state.palpationStatus === "not-performed" || state.palpationStatus === "not-assessable" ? state.palpationStatus : undefined} options={[{ value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "palpationStatus", value }, trigger, "C31-T08")} />
        <ExceptionalField label="Lachman" value={state.lachman === "not-performed" || state.lachman === "not-assessable" ? state.lachman : undefined} options={[{ value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "lachman", value }, trigger, "C31-T08")} />
        <ExceptionalField label="Valgusstres" value={state.valgus === "not-performed" || state.valgus === "not-assessable" ? state.valgus : undefined} options={[{ value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "valgus", value }, trigger, "C31-T08")} />
        <ExceptionalField label="Varusstres" value={state.varus === "not-performed" || state.varus === "not-assessable" ? state.varus : undefined} options={[{ value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "varus", value }, trigger, "C31-T08")} />
        <ExceptionalField label="Menisktest" value={state.meniscalTest === "not-performed" || state.meniscalTest === "not-assessable" ? state.meniscalTest : undefined} options={[{ value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value, trigger) => dispatch({ type: "set-objective", key: "meniscalTest", value }, trigger, "C31-T08")} />
      </EditorSection>}
    </>
  );
}

function AssessmentEditor({ state, onState }: { readonly state: C3State; readonly onState: (state: C3State, event: string) => void }) {
  const [role, setRole] = useState<C3AssessmentRole>();
  const [text, setText] = useState("");
  const active = getActiveAssessments(state);
  const primaryExists = active.some((entry) => entry.role === "primary");
  return (
    <div className={styles.commitmentEditor}>
      <p className={styles.editorLead}>Kun klinikerens egen vurdering. Cortex foreslår eller rangerer intet.</p>
      <div className={styles.entryList}>{active.map((entry) => <AssessmentRow key={entry.entryId} state={state} entryId={entry.entryId} onState={onState} />)}</div>
      <section className={styles.newEntry}>
        <h3>Ny vurdering</h3>
        <DirectChoice legend="Rolle" name="c31-new-assessment-role" value={role} options={[{ value: "primary", label: "Primær" }, { value: "secondary", label: "Sekundær" }, { value: "differential", label: "Differential" }]} onChange={(value) => setRole(value)} />
        <label data-field><span>Klinikerens formulering</span><textarea data-autofocus value={text} placeholder={C3_ASSESSMENT_FIXTURE} onChange={(event) => setText(event.target.value)} /></label>
        <button type="button" disabled={!role || !text.trim() || (role === "primary" && primaryExists)} onClick={() => { if (!role) return; const transition = createC3Assessment(state, role, text); if (transition.outcome === "applied") { onState(transition.state, "assessment-create"); setText(""); } }}>Tilføj vurdering</button>
      </section>
    </div>
  );
}

function AssessmentRow({ state, entryId, onState }: { readonly state: C3State; readonly entryId: string; readonly onState: (state: C3State, event: string) => void }) {
  const entry = getActiveAssessments(state).find((item) => item.entryId === entryId)!;
  const [editing, setEditing] = useState(false);
  const [role, setRole] = useState(entry.role);
  const [text, setText] = useState(entry.text);
  useEffect(() => { setRole(entry.role); setText(entry.text); }, [entry.role, entry.text]);
  const otherPrimary = getActiveAssessments(state).some((item) => item.role === "primary" && item.entryId !== entryId);
  if (!editing) return <article className={styles.compactEntry} aria-label={`Vurdering ${entry.entryId}`}><div><small>{entry.role === "primary" ? "Primær" : entry.role === "secondary" ? "Sekundær" : "Differential"}</small><p>{entry.text}</p></div><div><button type="button" onClick={() => setEditing(true)}>Redigér</button><button type="button" className={styles.quietDanger} onClick={() => onState(removeC3Assessment(state, entryId).state, "assessment-remove")}>Fjern</button></div></article>;
  return <article className={styles.versionedEntry} aria-label={`Vurdering ${entry.entryId}`}><label><span>Rolle</span><select value={role} onChange={(event) => setRole(event.target.value as C3AssessmentRole)}><option value="primary" disabled={otherPrimary}>Primær</option><option value="secondary">Sekundær</option><option value="differential">Differential</option></select></label><label><span>Formulering</span><textarea value={text} onChange={(event) => setText(event.target.value)} /></label><div><button type="button" onClick={() => { onState(reviseC3Assessment(state, entryId, role, text).state, "assessment-revise"); setEditing(false); }}>Gem</button><button type="button" onClick={() => setEditing(false)}>Annullér</button></div></article>;
}

function PhraseEditor({ state, onState }: { readonly state: C3State; readonly onState: (state: C3State, event: string) => void }) {
  const [category, setCategory] = useState<C3PhraseCategory>("plan");
  const active = getActivePhrases(state);
  const available = C3_PHRASES.filter((phrase) => phrase.category === category && !active.some((entry) => entry.phraseId === phrase.id));
  return (
    <div className={styles.commitmentEditor}>
      <p className={styles.editorLead}>Valget registrerer klinikerens ordlyd—ikke at information eller behandling er udført.</p>
      <CalmTabs label="Plankategorier" active={category} onChange={setCategory} items={[{ value: "plan", label: "Plan" }, { value: "follow-up", label: "Opfølgning" }, { value: "safety-net", label: "Safety-net" }]} />
      <EditorSection title={categoryLabel(category)} intro="Vælg en frase; den bliver til en kompakt, redigerbar klinikerlinje.">
        <div className={styles.selectedPhrases}>{active.filter((entry) => entry.category === category).map((entry) => <PhraseRow key={entry.entryId} state={state} entryId={entry.entryId} onState={onState} />)}</div>
        <div className={styles.phraseLibrary}>{available.map((phrase) => <button key={phrase.id} type="button" onClick={() => onState(selectC3Phrase(state, phrase.id).state, "phrase-select")}><span>＋</span>{phrase.text}</button>)}{available.length === 0 && <p>Alle fraser i kategorien er valgt.</p>}</div>
      </EditorSection>
    </div>
  );
}

function PhraseRow({ state, entryId, onState }: { readonly state: C3State; readonly entryId: string; readonly onState: (state: C3State, event: string) => void }) {
  const entry = getActivePhrases(state).find((item) => item.entryId === entryId)!;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(entry.currentText);
  useEffect(() => setText(entry.currentText), [entry.currentText]);
  if (!editing) return <article className={styles.compactEntry} aria-label={`Commitment ${entry.phraseId}`}><p>{entry.currentText}</p><div><button type="button" onClick={() => setEditing(true)}>Redigér</button><button type="button" className={styles.quietDanger} onClick={() => onState(removeC3Phrase(state, entryId).state, "phrase-remove")}>Fjern</button></div><details><summary>Provenance</summary><small>{entry.fixtureId}@{entry.fixtureVersion} · {entry.phraseId}@{entry.phraseVersion} · {entry.action} af kliniker · {entry.versionId}</small></details></article>;
  return <article className={styles.versionedEntry} aria-label={`Commitment ${entry.phraseId}`}><label><span>Klinikerens formulering</span><textarea value={text} onChange={(event) => setText(event.target.value)} /></label><div><button type="button" onClick={() => { onState(editC3Phrase(state, entryId, text).state, "phrase-edit"); setEditing(false); }}>Gem</button><button type="button" onClick={() => setEditing(false)}>Annullér</button></div></article>;
}

function DocumentEditor({ state, generated, draft, status, onState }: { readonly state: C3State; readonly generated: string; readonly draft?: string; readonly status: "generated" | "current" | "stale"; readonly onState: (state: C3State, event: string) => void }) {
  const shown = draft ?? generated;
  return (
    <div className={styles.documentEditor}>
      <DirectChoice<C3DocumentProfile> legend="Dokumentprofil" name="c31-document-profile" value={state.outputProfile} options={[{ value: "quick", label: "Quick" }, { value: "standard", label: "Standard" }]} onChange={(value) => onState(setC3Profile(state, value), "profile-switch")} />
      <PsoapPreview text={shown} />
      <p className={styles.projectionIdentity}>Samme snapshot {state.snapshotId} · revision R{state.sourceRevision}. Profilen ændrer ingen facts.</p>
      <label><span>Redigér {state.outputProfile === "quick" ? "Quick" : "Standard"} udkast</span><textarea aria-label={`${state.outputProfile === "quick" ? "Quick" : "Standard"} dokumentudkast`} value={shown} onChange={(event) => onState(setC3ManualDraft(state, state.outputProfile, generated, event.target.value), "manual-draft")} /></label>
      {status === "stale" && <div className={styles.stale} role="status"><strong>Udkastet bygger på en tidligere revision</strong><p>Teksten er bevaret og er ikke læst tilbage som facts.</p><div><button type="button" onClick={() => onState(continueC3ManualDraft(state, state.outputProfile, generated), "draft-continue")}>Behold teksten</button><button type="button" onClick={() => onState(discardC3ManualDraft(state, state.outputProfile), "draft-regenerate")}>Regenerér</button></div></div>}
      {status === "current" && <button type="button" className={styles.secondaryAction} onClick={() => onState(discardC3ManualDraft(state, state.outputProfile), "draft-discard")}>Kassér manuel redigering</button>}
      <p className={styles.draftStatus}>Genereret udkast · kræver altid klinikerens review.</p>
    </div>
  );
}
