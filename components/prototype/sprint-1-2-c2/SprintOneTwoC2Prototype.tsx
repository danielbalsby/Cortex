"use client";

import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode
} from "react";

import {
  deriveSprintOneOneCompleteness,
  type DomainId
} from "@/clinical/prototypes/sprint-1-1/derivations";
import { generateSprintOneOneJournal } from "@/clinical/prototypes/sprint-1-1/documents";
import {
  SPRINT_ONE_ONE_CASE,
  SPRINT_ONE_ONE_CASE_ACTIONS
} from "@/clinical/prototypes/sprint-1-1/fixtures";
import {
  createEmptySprintOneOneState,
  type PainProvocation,
  type PalpationFinding,
  type SprintOneOneHistory,
  type SprintOneOneObjective
} from "@/clinical/prototypes/sprint-1-1/model";
import {
  sprintOneOneReducer,
  type SprintOneOneAction
} from "@/clinical/prototypes/sprint-1-1/reducer";

import styles from "./SprintOneTwoC2Prototype.module.css";

type DocumentSection = "history" | "objective" | "assessment" | "plan";

interface Option {
  readonly value: string;
  readonly label: string;
}

type RecoveryState =
  | {
      readonly kind: "trauma";
      readonly mechanism?: SprintOneOneHistory["traumaMechanism"];
      readonly context?: string;
    }
  | {
      readonly kind: "swelling";
      readonly swelling: Exclude<SprintOneOneHistory["swelling"], "none" | undefined>;
      readonly timing?: string;
    };

const yesNoUnknown = [
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

const sectionDomain: Record<DocumentSection, DomainId> = {
  history: "history",
  objective: "objective",
  assessment: "assessment",
  plan: "plan"
};

function extractSection(text: string, heading: string): string {
  return text.split("\n\n").find((part) => part.startsWith(`${heading}\n`))?.slice(heading.length + 1) ?? "";
}

function InlineSelect({
  label,
  value,
  options,
  onChange
}: {
  readonly label: string;
  readonly value?: string;
  readonly options: readonly Option[];
  readonly onChange: (value: string | undefined) => void;
}) {
  return (
    <label className={styles.inlineField}>
      <span>{label}</span>
      <select value={value ?? ""} onChange={(event) => onChange(event.target.value || undefined)}>
        <option value="">Ikke afklaret</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function CommittedText({
  label,
  value,
  placeholder,
  multiline = false,
  onCommit
}: {
  readonly label: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly multiline?: boolean;
  readonly onCommit: (value: string | undefined) => void;
}) {
  const [draft, setDraft] = useState(value ?? "");
  useEffect(() => setDraft(value ?? ""), [value]);
  const common = {
    value: draft,
    placeholder,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(event.target.value),
    onBlur: () => onCommit(draft)
  };
  return (
    <label className={`${styles.inlineField} ${multiline ? styles.wideField : ""}`}>
      <span>{label}</span>
      {multiline ? <textarea {...common} /> : <input {...common} />}
    </label>
  );
}

function DegreeField({ label, value, onCommit }: { readonly label: string; readonly value?: number; readonly onCommit: (value: number | undefined) => void }) {
  const [draft, setDraft] = useState(value === undefined ? "" : String(value));
  useEffect(() => setDraft(value === undefined ? "" : String(value)), [value]);
  return (
    <label className={styles.inlineField}>
      <span>{label}</span>
      <span className={styles.degreeInput}>
        <input aria-label={label} inputMode="decimal" value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={() => {
          const parsed = Number(draft.replace(",", "."));
          onCommit(draft.trim() && Number.isFinite(parsed) ? parsed : undefined);
        }} />
        <i>°</i>
      </span>
    </label>
  );
}

function ChoiceRow<T extends string>({
  label,
  options,
  selected,
  onToggle
}: {
  readonly label: string;
  readonly options: readonly { readonly value: T; readonly label: string }[];
  readonly selected: readonly T[];
  readonly onToggle: (value: T) => void;
}) {
  return (
    <fieldset className={styles.choiceRow}>
      <legend>{label} <small>Flere kan vælges</small></legend>
      <div>{options.map((option) => <button key={option.value} type="button" aria-pressed={selected.includes(option.value)} onClick={() => onToggle(option.value)}>{option.label}</button>)}</div>
    </fieldset>
  );
}

function EditorGroup({ title, children }: { readonly title: string; readonly children: ReactNode }) {
  return <section className={styles.editorGroup}><h3>{title}</h3><div className={styles.fieldFlow}>{children}</div></section>;
}

export function SprintOneTwoC2Prototype() {
  const [state, baseDispatch] = useReducer(sprintOneOneReducer, undefined, createEmptySprintOneOneState);
  const [activeSection, setActiveSection] = useState<DocumentSection>();
  const [recovery, setRecovery] = useState<RecoveryState>();
  const [journalOverride, setJournalOverride] = useState<{ readonly source: string; readonly text: string }>();
  const [interactionCount, setInteractionCount] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);

  const completeness = useMemo(() => deriveSprintOneOneCompleteness(state), [state]);
  const journal = useMemo(() => generateSprintOneOneJournal(state), [state]);
  const staleDraft = Boolean(journalOverride && journalOverride.source !== journal.text);
  const shownDraft = journalOverride?.text ?? journal.text;

  const sectionText: Record<DocumentSection, string> = {
    history: extractSection(journal.text, "Anamnese"),
    objective: extractSection(journal.text, "Objektivt"),
    assessment: extractSection(journal.text, "Vurdering"),
    plan: extractSection(journal.text, "Plan")
  };

  useEffect(() => {
    if (!activeSection) return;
    const firstControl = editorRef.current?.querySelector<HTMLElement>("select, input, textarea, button");
    firstControl?.focus();
  }, [activeSection]);

  function dispatchClinical(action: SprintOneOneAction) {
    if (action.type === "set-history" && action.key === "trauma" && action.value !== "yes" && (state.history.traumaMechanism || state.history.traumaContext)) {
      setRecovery({ kind: "trauma", mechanism: state.history.traumaMechanism, context: state.history.traumaContext });
    }
    if (action.type === "set-history" && action.key === "swelling" && action.value === "none" && state.history.swelling && state.history.swelling !== "none" && state.history.swellingTiming) {
      setRecovery({ kind: "swelling", swelling: state.history.swelling, timing: state.history.swellingTiming });
    }
    baseDispatch(action);
    setInteractionCount((count) => count + 1);
  }

  function setHistory<K extends Exclude<keyof SprintOneOneHistory, "provocations">>(key: K, value: SprintOneOneHistory[K] | undefined) {
    dispatchClinical({ type: "set-history", key, value } as SprintOneOneAction);
  }

  function setObjective<K extends Exclude<keyof SprintOneOneObjective, "palpationFindings">>(key: K, value: SprintOneOneObjective[K] | undefined) {
    dispatchClinical({ type: "set-objective", key, value } as SprintOneOneAction);
  }

  function recordFixture() {
    for (const action of SPRINT_ONE_ONE_CASE_ACTIONS) baseDispatch(action);
    setRecovery(undefined);
    setInteractionCount((count) => count + 1);
  }

  function restoreRecovery() {
    if (!recovery) return;
    if (recovery.kind === "trauma") {
      baseDispatch({ type: "set-history", key: "trauma", value: "yes" });
      if (recovery.mechanism) baseDispatch({ type: "set-history", key: "traumaMechanism", value: recovery.mechanism });
      if (recovery.context) baseDispatch({ type: "set-history", key: "traumaContext", value: recovery.context });
    } else {
      baseDispatch({ type: "set-history", key: "swelling", value: recovery.swelling });
      if (recovery.timing) baseDispatch({ type: "set-history", key: "swellingTiming", value: recovery.timing });
    }
    setRecovery(undefined);
    setActiveSection("history");
    setInteractionCount((count) => count + 1);
  }

  function openSection(section: DocumentSection) {
    setActiveSection(section);
  }

  const domains = completeness.domains;
  const nextDomain = completeness.firstIncomplete;
  const nextSection = nextDomain === "objective" || nextDomain === "safety" ? "objective" : nextDomain === "assessment" ? "assessment" : nextDomain === "plan" ? "plan" : "history";

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}><span>C</span><div><strong>Cortex</strong><small>Sprint 1.2 · narrative workspace comparator</small></div></div>
        <nav aria-label="Comparatorer"><a href="/prototype/sprint-1-1">C0 Baseline</a><a href="/prototype/sprint-1-2">C1 One-page</a><strong>C2 Narrative</strong></nav>
      </header>

      <div className={styles.safetyLine}><strong>Learning prototype · kun syntetiske data.</strong> Samme Sprint 1.1-state og dokumentgenerator. Ingen clinical attention, AI eller klinisk validering.</div>

      <section className={styles.patientContext}>
        <div><span>Aktuelt problem</span><h1>{SPRINT_ONE_ONE_CASE.title}</h1><p>{SPRINT_ONE_ONE_CASE.demographics} · {SPRINT_ONE_ONE_CASE.id}</p></div>
        <p>{SPRINT_ONE_ONE_CASE.source.join(" ")}</p>
        <button type="button" onClick={recordFixture}>Brug viste caseoplysninger</button>
      </section>

      {recovery && (
        <section className={styles.recovery} role="status">
          <div><strong>Tidligere oplysninger er bevaret til recovery</strong><p>{recovery.kind === "trauma" ? "Traumemekanisme og -kontekst blev fjernet fra aktiv clinical state af den låste reducer efter ændringen. De vises ikke som facts, men kan gendannes eksplicit." : "Hævelsens tidsforløb blev fjernet fra aktiv clinical state efter ændringen. Det vises ikke som fact, men kan gendannes eksplicit."}</p></div>
          <button type="button" onClick={restoreRecovery}>Gendan tidligere oplysninger</button>
          <button type="button" onClick={() => setRecovery(undefined)}>Kassér recovery-kopi</button>
        </section>
      )}

      <div className={styles.layout}>
        <article className={styles.document} aria-label="Klinisk dokument">
          <header className={styles.documentHeader}>
            <div><span>Klinisk arbejdsdokument</span><h2>Knækonsultation</h2></div>
            <p>Registrerede facts vises som journaltekst. Manglende information vises særskilt og bliver aldrig til kliniske udsagn.</p>
          </header>

          {([
            ["history", "Anamnese"],
            ["objective", "Objektivt"],
            ["assessment", "Vurdering"],
            ["plan", "Plan"]
          ] as const).map(([section, label]) => {
            const domain = domains.find((item) => item.id === sectionDomain[section]);
            const isActive = activeSection === section;
            return (
              <section className={`${styles.documentSection} ${isActive ? styles.activeSection : ""}`} aria-labelledby={`c2-heading-${section}`} key={section}>
                <header>
                  <div><span>{section === "assessment" || section === "plan" ? "Klinikerens registrering" : "Registrerede facts"}</span><h2 id={`c2-heading-${section}`}>{label}</h2></div>
                  <button type="button" aria-expanded={isActive} aria-controls={`c2-editor-${section}`} onClick={() => openSection(section)}>{isActive ? "Redigerer" : sectionText[section] ? "Redigér" : "Tilføj"}</button>
                </header>
                {sectionText[section] ? <p className={styles.clinicalNarrative}>{sectionText[section]}</p> : <p className={styles.emptyNarrative}>Afventer eksplicit registrering. <strong>Mangler: {domain?.missing.slice(0, 4).join(", ")}{domain && domain.missing.length > 4 ? ` +${domain.missing.length - 4}` : ""}.</strong></p>}

                {isActive && (
                  <div id={`c2-editor-${section}`} ref={editorRef} className={styles.contextEditor} aria-label={`${label} inline-redigering`}>
                    {section === "history" && <HistoryEditor state={state.history} setHistory={setHistory} dispatch={dispatchClinical} />}
                    {section === "objective" && <ObjectiveEditor state={state.objective} history={state.history} setHistory={setHistory} setObjective={setObjective} dispatch={dispatchClinical} />}
                    {section === "assessment" && <EditorGroup title="Klinikerens egen vurdering"><CommittedText label="Vurdering og usikkerhed" value={state.assessment} multiline placeholder="Formulér din vurdering. Cortex udfylder den ikke." onCommit={(value) => dispatchClinical({ type: "set-assessment", value })} /></EditorGroup>}
                    {section === "plan" && <PlanEditor state={state.plan} dispatch={dispatchClinical} />}
                  </div>
                )}
              </section>
            );
          })}

          <section className={styles.draftSection}>
            <header><div><span>Afledt dokument</span><h2>Journaludkast</h2></div><small>{journal.status === "ready-for-review" ? "Teknisk klar til gennemgang" : "Foreløbigt"}</small></header>
            <textarea aria-label="Redigerbart journaludkast" value={shownDraft} placeholder="Ingen journaltekst genereret endnu" onChange={(event) => setJournalOverride({ source: journalOverride?.source ?? journal.text, text: event.target.value })} />
            {staleDraft && <p className={styles.stale} role="status">Clinical state er ændret. Din redigerede draft er bevaret, men er nu markeret som stale.</p>}
            {journalOverride && <button type="button" onClick={() => setJournalOverride(undefined)}>Gendan tekst fra registrerede facts</button>}
          </section>
        </article>

        <aside className={styles.overview} aria-label="Cortex Overblik">
          <header><span>Cortex Overblik</span><strong>{domains.filter((domain) => domain.status === "complete").length} af {domains.length} områder belyst</strong></header>
          <p className={styles.overviewLead}>Orientering, ikke godkendelse. Overblikket ændrer ingen kliniske facts.</p>
          <ol>{domains.map((domain) => <li key={domain.id} className={domain.status === "complete" ? styles.complete : ""}><i aria-hidden="true">{domain.status === "complete" ? "✓" : "○"}</i><div><strong>{domain.label}</strong><p>{domain.missing.length ? domain.missing.slice(0, 3).join(" · ") + (domain.missing.length > 3 ? ` +${domain.missing.length - 3}` : "") : "Belyst i prototypegrundlaget"}</p></div></li>)}</ol>
          {!completeness.technicallyReady && <button type="button" className={styles.nextAction} onClick={() => openSection(nextSection)}>Fortsæt i {domains.find((domain) => domain.id === nextDomain)?.label ?? "konsultationen"}</button>}
          <p className={styles.disclaimer}>{completeness.disclaimer}</p>
          <dl className={styles.observation}><div><dt>Kliniske handlinger</dt><dd>{interactionCount}</dd></div><div><dt>Aktivt afsnit</dt><dd>{activeSection ? { history: "Anamnese", objective: "Objektivt", assessment: "Vurdering", plan: "Plan" }[activeSection] : "Ingen"}</dd></div></dl>
        </aside>
      </div>
    </main>
  );
}

function HistoryEditor({
  state,
  setHistory,
  dispatch
}: {
  readonly state: SprintOneOneHistory;
  readonly setHistory: <K extends Exclude<keyof SprintOneOneHistory, "provocations">>(key: K, value: SprintOneOneHistory[K] | undefined) => void;
  readonly dispatch: (action: SprintOneOneAction) => void;
}) {
  return <>
    <EditorGroup title="Debut og forløb">
      <InlineSelect label="Side" value={state.side} options={[{ value: "right", label: "Højre" }, { value: "left", label: "Venstre" }]} onChange={(value) => setHistory("side", value as SprintOneOneHistory["side"])} />
      <InlineSelect label="Debut" value={state.onset} options={[{ value: "acute", label: "Akut" }, { value: "insidious", label: "Snigende" }, { value: "gradual", label: "Gradvist indsættende" }]} onChange={(value) => setHistory("onset", value as SprintOneOneHistory["onset"])} />
      <CommittedText label="Varighed" value={state.duration} placeholder="fx siden i går" onCommit={(value) => setHistory("duration", value)} />
      <InlineSelect label="Smerteforløb" value={state.painCourse} options={[{ value: "constant", label: "Konstant" }, { value: "intermittent", label: "Intermitterende" }, { value: "increasing", label: "Tiltagende" }, { value: "decreasing", label: "Aftagende" }]} onChange={(value) => setHistory("painCourse", value as SprintOneOneHistory["painCourse"])} />
    </EditorGroup>
    <EditorGroup title="Traume og smerte">
      <InlineSelect label="Traume" value={state.trauma} options={[{ value: "yes", label: "Ja" }, { value: "no", label: "Nej" }]} onChange={(value) => setHistory("trauma", value as SprintOneOneHistory["trauma"])} />
      {state.trauma === "yes" && <><InlineSelect label="Traumemekanisme" value={state.traumaMechanism} options={[{ value: "twisting", label: "Vrid" }, { value: "direct-blow", label: "Direkte traume" }, { value: "fall", label: "Fald" }, { value: "other", label: "Andet" }]} onChange={(value) => setHistory("traumaMechanism", value as SprintOneOneHistory["traumaMechanism"])} /><CommittedText label="Traumekontekst" value={state.traumaContext} placeholder="fx under fodbold" onCommit={(value) => setHistory("traumaContext", value)} /></>}
      <InlineSelect label="Smerteplacering" value={state.painLocation} options={[{ value: "medial", label: "Medial" }, { value: "lateral", label: "Lateral" }, { value: "anterior", label: "Forreste" }, { value: "posterior", label: "Bageste" }, { value: "diffuse", label: "Diffus" }]} onChange={(value) => setHistory("painLocation", value as SprintOneOneHistory["painLocation"])} />
      <ChoiceRow label="Smerteprovokation" options={provocations} selected={state.provocations} onToggle={(value: PainProvocation) => dispatch({ type: "toggle-provocation", value })} />
    </EditorGroup>
    <EditorGroup title="Funktion og ledsagesymptomer">
      <InlineSelect label="Funktionsevne" value={state.function} options={[{ value: "unaffected", label: "Upåvirket" }, { value: "mildly-reduced", label: "Let nedsat" }, { value: "significantly-reduced", label: "Betydeligt nedsat" }, { value: "unable-to-bear-weight", label: "Kan ikke støtte" }]} onChange={(value) => setHistory("function", value as SprintOneOneHistory["function"])} />
      <InlineSelect label="Hævelse" value={state.swelling} options={[{ value: "none", label: "Ingen" }, { value: "mild", label: "Let" }, { value: "persistent", label: "Vedvarende" }, { value: "marked", label: "Udtalt" }]} onChange={(value) => setHistory("swelling", value as SprintOneOneHistory["swelling"])} />
      {state.swelling && state.swelling !== "none" && <CommittedText label="Hævelsens tidsforløb" value={state.swellingTiming} onCommit={(value) => setHistory("swellingTiming", value)} />}
      <InlineSelect label="Aflåsning" value={state.locking} options={yesNoUnknown} onChange={(value) => setHistory("locking", value as SprintOneOneHistory["locking"])} />
      <InlineSelect label="Instabilitet" value={state.instability} options={yesNoUnknown} onChange={(value) => setHistory("instability", value as SprintOneOneHistory["instability"])} />
      <InlineSelect label="Hvilesmerter" value={state.restPain} options={yesNoUnknown} onChange={(value) => setHistory("restPain", value as SprintOneOneHistory["restPain"])} />
      <InlineSelect label="Nattesmerter" value={state.nightPain} options={yesNoUnknown} onChange={(value) => setHistory("nightPain", value as SprintOneOneHistory["nightPain"])} />
    </EditorGroup>
  </>;
}

function ObjectiveEditor({
  state,
  history,
  setHistory,
  setObjective,
  dispatch
}: {
  readonly state: SprintOneOneObjective;
  readonly history: SprintOneOneHistory;
  readonly setHistory: <K extends Exclude<keyof SprintOneOneHistory, "provocations">>(key: K, value: SprintOneOneHistory[K] | undefined) => void;
  readonly setObjective: <K extends Exclude<keyof SprintOneOneObjective, "palpationFindings">>(key: K, value: SprintOneOneObjective[K] | undefined) => void;
  readonly dispatch: (action: SprintOneOneAction) => void;
}) {
  return <>
    <EditorGroup title="Basis og bevægelighed">
      <InlineSelect label="Gang" value={state.gait} options={[{ value: "normal", label: "Normal" }, { value: "limp", label: "Haltende" }, { value: "unable", label: "Kan ikke støtte" }, { value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value) => setObjective("gait", value as SprintOneOneObjective["gait"])} />
      <InlineSelect label="Inspektion" value={state.inspection} options={[{ value: "no-specific-findings", label: "Uden særlige fund" }, { value: "swelling", label: "Hævelse" }, { value: "redness", label: "Rødme" }, { value: "deformity", label: "Deformitet" }, { value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value) => setObjective("inspection", value as SprintOneOneObjective["inspection"])} />
      <InlineSelect label="Effusion" value={state.effusion} options={[{ value: "none", label: "Ingen" }, { value: "mild", label: "Let" }, { value: "moderate", label: "Moderat" }, { value: "large", label: "Stor" }, { value: "not-assessed", label: "Ikke vurderet" }]} onChange={(value) => setObjective("effusion", value as SprintOneOneObjective["effusion"])} />
      <DegreeField label="Ekstension i grader" value={state.extensionDegrees} onCommit={(value) => setObjective("extensionDegrees", value)} />
      <DegreeField label="Fleksion i grader" value={state.flexionDegrees} onCommit={(value) => setObjective("flexionDegrees", value)} />
      <label className={styles.booleanChoice}><input type="checkbox" checked={Boolean(state.rangeNotAssessable)} onChange={(event) => setObjective("rangeNotAssessable", event.target.checked || undefined)} /> ROM ikke vurderbar</label>
    </EditorGroup>
    <EditorGroup title="Palpation">
      <InlineSelect label="Palpationsstatus" value={state.palpationStatus} options={[{ value: "no-focal-tenderness", label: "Ingen fokal ømhed" }, { value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value) => setObjective("palpationStatus", value as SprintOneOneObjective["palpationStatus"])} />
      <ChoiceRow label="Ømme strukturer" options={palpations} selected={state.palpationFindings} onToggle={(value: PalpationFinding) => dispatch({ type: "toggle-palpation", value })} />
    </EditorGroup>
    <EditorGroup title="Målrettede tests">
      <InlineSelect label="Lachman" value={state.lachman} options={testResults} onChange={(value) => setObjective("lachman", value as SprintOneOneObjective["lachman"])} />
      <InlineSelect label="Valgusstres" value={state.valgus} options={[{ value: "stable", label: "Stabil" }, { value: "lax", label: "Laksitet" }, { value: "painful-no-laxity", label: "Smerte uden laksitet" }, { value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value) => setObjective("valgus", value as SprintOneOneObjective["valgus"])} />
      <InlineSelect label="Varusstres" value={state.varus} options={[{ value: "stable", label: "Stabil" }, { value: "lax", label: "Laksitet" }, { value: "painful-no-laxity", label: "Smerte uden laksitet" }, { value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value) => setObjective("varus", value as SprintOneOneObjective["varus"])} />
      <InlineSelect label="Menisktest" value={state.meniscalTest} options={testResults} onChange={(value) => setObjective("meniscalTest", value as SprintOneOneObjective["meniscalTest"])} />
      <InlineSelect label="Patellatest" value={state.patella} options={testResults} onChange={(value) => setObjective("patella", value as SprintOneOneObjective["patella"])} />
      <InlineSelect label="Distal neurovaskulær" value={state.neurovascular} options={[{ value: "normal", label: "Normal" }, { value: "abnormal", label: "Afvigende" }, { value: "not-assessed", label: "Ikke vurderet" }, { value: "not-assessable", label: "Ikke vurderbar" }]} onChange={(value) => setObjective("neurovascular", value as SprintOneOneObjective["neurovascular"])} />
    </EditorGroup>
    <EditorGroup title="Røde flag">
      <InlineSelect label="Feber" value={history.fever} options={yesNoUnknown} onChange={(value) => setHistory("fever", value as SprintOneOneHistory["fever"])} />
      <InlineSelect label="Almen påvirkning" value={history.systemicIllness} options={yesNoUnknown} onChange={(value) => setHistory("systemicIllness", value as SprintOneOneHistory["systemicIllness"])} />
      <InlineSelect label="Rødt, varmt og akut hævet knæ" value={history.redHotSwollenJoint} options={yesNoUnknown} onChange={(value) => setHistory("redHotSwollenJoint", value as SprintOneOneHistory["redHotSwollenJoint"])} />
    </EditorGroup>
  </>;
}

function PlanEditor({ state, dispatch }: { readonly state: { readonly management?: string; readonly followUp?: string; readonly safetyNet?: string; readonly imagingIntent?: boolean; readonly imagingModality?: "x-ray" | "mri" }; readonly dispatch: (action: SprintOneOneAction) => void }) {
  return <>
    <EditorGroup title="Klinikerens plan">
      <CommittedText label="Plan" value={state.management} multiline placeholder="Formulér plan eller intention" onCommit={(value) => dispatch({ type: "set-plan-text", key: "management", value })} />
      <CommittedText label="Opfølgning" value={state.followUp} placeholder="Eksplicit opfølgning" onCommit={(value) => dispatch({ type: "set-plan-text", key: "followUp", value })} />
      <CommittedText label="Safety-net" value={state.safetyNet} multiline placeholder="Eksplicit safety-net" onCommit={(value) => dispatch({ type: "set-plan-text", key: "safetyNet", value })} />
      <label className={styles.booleanChoice}><input type="checkbox" checked={Boolean(state.imagingIntent)} onChange={(event) => dispatch({ type: "set-imaging-intent", value: event.target.checked })} /> Billeddiagnostik indgår i klinikerens plan</label>
      {state.imagingIntent && <InlineSelect label="Klinikerens valgte modalitet" value={state.imagingModality} options={[{ value: "x-ray", label: "Røntgen" }, { value: "mri", label: "MR" }]} onChange={(value) => dispatch({ type: "set-imaging-modality", value: value as "x-ray" | "mri" | undefined })} />}
    </EditorGroup>
  </>;
}
