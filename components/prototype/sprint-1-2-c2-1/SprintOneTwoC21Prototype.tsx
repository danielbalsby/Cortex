"use client";

import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode
} from "react";

import { deriveSprintOneOneCompleteness } from "@/clinical/prototypes/sprint-1-1/derivations";
import { generateSprintOneOneJournal } from "@/clinical/prototypes/sprint-1-1/documents";
import { SPRINT_ONE_ONE_CASE, SPRINT_ONE_ONE_CASE_ACTIONS } from "@/clinical/prototypes/sprint-1-1/fixtures";
import {
  createEmptySprintOneOneState,
  type PainProvocation,
  type PalpationFinding,
  type SprintOneOneHistory,
  type SprintOneOneObjective
} from "@/clinical/prototypes/sprint-1-1/model";
import { sprintOneOneReducer, type SprintOneOneAction } from "@/clinical/prototypes/sprint-1-1/reducer";

import styles from "./SprintOneTwoC21Prototype.module.css";

type CoreSection = "history" | "objective";

interface Option {
  readonly value: string;
  readonly label: string;
}

type RecoveryState =
  | { readonly kind: "trauma"; readonly mechanism?: SprintOneOneHistory["traumaMechanism"]; readonly context?: string }
  | { readonly kind: "swelling"; readonly swelling: Exclude<SprintOneOneHistory["swelling"], "none" | undefined>; readonly timing?: string };

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
  { value: "walking", label: "gang" },
  { value: "stairs", label: "trapper" },
  { value: "rotation", label: "rotation" },
  { value: "running", label: "løb" },
  { value: "jumping", label: "hop" },
  { value: "direction-change", label: "retningsskift" }
] as const;

const palpations = [
  { value: "medial-joint-line", label: "medial ledlinje" },
  { value: "lateral-joint-line", label: "lateral ledlinje" },
  { value: "mcl", label: "MCL" },
  { value: "lcl", label: "LCL" },
  { value: "patella", label: "patella" },
  { value: "patellar-tendon", label: "patellasene" },
  { value: "quadriceps-tendon", label: "quadricepssene" },
  { value: "pes-anserinus", label: "pes anserinus" }
] as const;

function extractSection(text: string, heading: string): string {
  return text.split("\n\n").find((part) => part.startsWith(`${heading}\n`))?.slice(heading.length + 1) ?? "";
}

function InlineSelect({ label, value, placeholder, options, onChange }: {
  readonly label: string;
  readonly value?: string;
  readonly placeholder: string;
  readonly options: readonly Option[];
  readonly onChange: (value: string | undefined) => void;
}) {
  function handleKeyDown(event: KeyboardEvent<HTMLSelectElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const values = ["", ...options.map((option) => option.value)];
    const currentIndex = Math.max(0, values.indexOf(event.currentTarget.value));
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = Math.min(values.length - 1, Math.max(0, currentIndex + direction));
    onChange(values[nextIndex] || undefined);
  }

  return (
    <label className={styles.slot}>
      <span className={styles.srOnly}>{label}</span>
      <select aria-label={label} value={value ?? ""} data-empty={!value} onKeyDown={handleKeyDown} onChange={(event) => onChange(event.target.value || undefined)}>
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function InlineText({ label, value, placeholder, onCommit }: {
  readonly label: string;
  readonly value?: string;
  readonly placeholder: string;
  readonly onCommit: (value: string | undefined) => void;
}) {
  const [draft, setDraft] = useState(value ?? "");
  useEffect(() => setDraft(value ?? ""), [value]);
  return <input className={styles.textSlot} aria-label={label} value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onBlur={() => onCommit(draft)} />;
}

function InlineDegree({ label, value, onCommit }: { readonly label: string; readonly value?: number; readonly onCommit: (value: number | undefined) => void }) {
  const [draft, setDraft] = useState(value === undefined ? "" : String(value));
  useEffect(() => setDraft(value === undefined ? "" : String(value)), [value]);
  return <input className={styles.degreeSlot} aria-label={label} inputMode="decimal" value={draft} placeholder="—" onChange={(event) => setDraft(event.target.value)} onBlur={() => {
    const parsed = Number(draft.replace(",", "."));
    onCommit(draft.trim() && Number.isFinite(parsed) ? parsed : undefined);
  }} />;
}

function MultiInline<T extends string>({ label, options, selected, onToggle }: {
  readonly label: string;
  readonly options: readonly { readonly value: T; readonly label: string }[];
  readonly selected: readonly T[];
  readonly onToggle: (value: T) => void;
}) {
  return (
    <span className={styles.multiInline} role="group" aria-label={label}>
      {options.map((option) => <button key={option.value} type="button" aria-pressed={selected.includes(option.value)} onClick={() => onToggle(option.value)}>{option.label}</button>)}
    </span>
  );
}

function NarrativeBlock({ eyebrow, title, children, generated }: { readonly eyebrow: string; readonly title: string; readonly children: ReactNode; readonly generated: string }) {
  return (
    <section className={styles.narrativeBlock} aria-labelledby={`c21-${title.toLocaleLowerCase("da-DK")}`}>
      <header><span>{eyebrow}</span><h2 id={`c21-${title.toLocaleLowerCase("da-DK")}`}>{title}</h2></header>
      <div className={styles.inlineNarrative} data-testid={`c21-inline-${title.toLocaleLowerCase("da-DK")}`}>{children}</div>
      <div className={styles.generatedFact}>
        <span>Aktuel journaltekst fra registrerede facts</span>
        {generated ? <p>{generated}</p> : <p className={styles.emptyFact}>Afventer eksplicit registrering.</p>}
      </div>
    </section>
  );
}

export function SprintOneTwoC21Prototype() {
  const [state, baseDispatch] = useReducer(sprintOneOneReducer, undefined, createEmptySprintOneOneState);
  const [activeSection, setActiveSection] = useState<CoreSection>("history");
  const [recovery, setRecovery] = useState<RecoveryState>();
  const [journalOverride, setJournalOverride] = useState<{ readonly source: string; readonly text: string }>();
  const sectionRef = useRef<HTMLElement>(null);

  const completeness = useMemo(() => deriveSprintOneOneCompleteness(state), [state]);
  const journal = useMemo(() => generateSprintOneOneJournal(state), [state]);
  const staleDraft = Boolean(journalOverride && journalOverride.source !== journal.text);
  const shownDraft = journalOverride?.text ?? journal.text;
  const historyText = extractSection(journal.text, "Anamnese");
  const objectiveText = extractSection(journal.text, "Objektivt");

  function dispatchClinical(action: SprintOneOneAction) {
    if (action.type === "set-history" && action.key === "trauma" && action.value !== "yes" && (state.history.traumaMechanism || state.history.traumaContext)) {
      setRecovery({ kind: "trauma", mechanism: state.history.traumaMechanism, context: state.history.traumaContext });
    }
    if (action.type === "set-history" && action.key === "swelling" && action.value === "none" && state.history.swelling && state.history.swelling !== "none" && state.history.swellingTiming) {
      setRecovery({ kind: "swelling", swelling: state.history.swelling, timing: state.history.swellingTiming });
    }
    baseDispatch(action);
  }

  function setHistory<K extends Exclude<keyof SprintOneOneHistory, "provocations">>(key: K, value: SprintOneOneHistory[K] | undefined) {
    dispatchClinical({ type: "set-history", key, value } as SprintOneOneAction);
  }

  function setObjective<K extends Exclude<keyof SprintOneOneObjective, "palpationFindings">>(key: K, value: SprintOneOneObjective[K] | undefined) {
    dispatchClinical({ type: "set-objective", key, value } as SprintOneOneAction);
  }

  function chooseSection(section: CoreSection) {
    setActiveSection(section);
    requestAnimationFrame(() => sectionRef.current?.focus());
  }

  function recordFixture() {
    for (const action of SPRINT_ONE_ONE_CASE_ACTIONS) baseDispatch(action);
    setRecovery(undefined);
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
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}><span>C</span><div><strong>Cortex</strong><small>Sprint 1.2 · C2.1 inline narrative comparator</small></div></div>
        <nav aria-label="Comparatorer"><a href="/prototype/sprint-1-1">C0</a><a href="/prototype/sprint-1-2">C1</a><a href="/prototype/sprint-1-2-c2">C2</a><strong>C2.1</strong></nav>
      </header>

      <div className={styles.safetyLine}><strong>Syntetisk learning prototype.</strong> Inline-slots skriver kun gennem Sprint 1.1-reduceren. Ingen AI, referral-output eller klinisk validering.</div>

      <section className={styles.caseHeader}>
        <div><span>Aktuelt problem</span><h1>{SPRINT_ONE_ONE_CASE.title}</h1><p>{SPRINT_ONE_ONE_CASE.demographics} · {SPRINT_ONE_ONE_CASE.id}</p></div>
        <p>{SPRINT_ONE_ONE_CASE.source.join(" ")}</p>
        <button type="button" onClick={recordFixture}>Brug viste caseoplysninger</button>
      </section>

      {recovery && <section className={styles.recovery} role="status"><div><strong>Tidligere information er bevaret som recovery-kopi</strong><p>Kopien er presentation state, ikke et aktivt fact. Den påvirker ikke journalen før eksplicit gendannelse.</p></div><button type="button" onClick={restoreRecovery}>Gendan</button><button type="button" onClick={() => setRecovery(undefined)}>Kassér</button></section>}

      <div className={styles.workspace}>
        <article className={styles.document} aria-label="C2.1 klinisk dokument">
          <header className={styles.documentHeader}>
            <div><span>Inline clinical completion</span><h2>Knækonsultation</h2></div>
            <nav aria-label="Kliniske afsnit"><button type="button" aria-pressed={activeSection === "history"} onClick={() => chooseSection("history")}>Anamnese</button><button type="button" aria-pressed={activeSection === "objective"} onClick={() => chooseSection("objective")}>Objektivt</button></nav>
          </header>

          <section ref={sectionRef} tabIndex={-1} aria-label={`${activeSection === "history" ? "Anamnese" : "Objektivt"} inline-arbejdsområde`}>
            {activeSection === "history" ? <HistoryNarrative state={state.history} generated={historyText} setHistory={setHistory} dispatch={dispatchClinical} /> : <ObjectiveNarrative state={state.objective} generated={objectiveText} setObjective={setObjective} dispatch={dispatchClinical} />}
          </section>

          <section className={styles.deferred} aria-label="Vurdering og Plan"><div><span>Klinikerens beslutning</span><h2>Vurdering</h2><p>Ikke udvidet i C2.1. Cortex udfylder ingen vurdering.</p></div><div><span>Klinikerens beslutning</span><h2>Plan</h2><p>Ikke udvidet i C2.1. Ingen plan- eller referralstøtte er implementeret.</p></div></section>

          <section className={styles.draft}>
            <header><div><span>Separat representation state</span><h2>Journaludkast</h2></div><small>{journal.status === "ready-for-review" ? "Teknisk klar til gennemgang" : "Foreløbigt"}</small></header>
            <textarea aria-label="Redigerbart journaludkast" value={shownDraft} placeholder="Ingen journaltekst genereret endnu" onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setJournalOverride({ source: journalOverride?.source ?? journal.text, text: event.target.value })} />
            {staleDraft && <p className={styles.stale} role="status">Clinical facts er ændret. Den manuelle draft er bevaret, men markeret stale og er ikke parsed tilbage til state.</p>}
            {journalOverride && <button type="button" onClick={() => setJournalOverride(undefined)}>Gendan genereret journaltekst</button>}
          </section>
        </article>

        <aside className={styles.overview} aria-label="Cortex Overblik">
          <header><span>Cortex Overblik</span><strong>{completeness.domains.filter((domain) => domain.status === "complete").length} af {completeness.domains.length} områder belyst</strong></header>
          <p>Rent afledt orientering. Overblikket registrerer, beslutter eller godkender intet.</p>
          <ol>{completeness.domains.map((domain) => <li key={domain.id}><i aria-hidden="true">{domain.status === "complete" ? "✓" : "○"}</i><div><strong>{domain.label}</strong><small>{domain.missing.length ? domain.missing.slice(0, 3).join(" · ") + (domain.missing.length > 3 ? ` +${domain.missing.length - 3}` : "") : "Belyst i prototypegrundlaget"}</small></div></li>)}</ol>
          <p className={styles.disclaimer}>{completeness.disclaimer}</p>
        </aside>
      </div>
    </main>
  );
}

function HistoryNarrative({ state, generated, setHistory, dispatch }: {
  readonly state: SprintOneOneHistory;
  readonly generated: string;
  readonly setHistory: <K extends Exclude<keyof SprintOneOneHistory, "provocations">>(key: K, value: SprintOneOneHistory[K] | undefined) => void;
  readonly dispatch: (action: SprintOneOneAction) => void;
}) {
  return <NarrativeBlock eyebrow="Registrering i klinisk kontekst" title="Anamnese" generated={generated}>
    <p>
      Debut <InlineSelect label="Debut" value={state.onset} placeholder="vælg debut…" options={[{ value: "acute", label: "akut" }, { value: "insidious", label: "snigende" }, { value: "gradual", label: "gradvist indsættende" }]} onChange={(value) => setHistory("onset", value as SprintOneOneHistory["onset"])} />
      med <InlineSelect label="Side" value={state.side} placeholder="vælg side…" options={[{ value: "right", label: "højre" }, { value: "left", label: "venstre" }]} onChange={(value) => setHistory("side", value as SprintOneOneHistory["side"])} /> knæsmerter gennem <InlineText label="Varighed" value={state.duration} placeholder="varighed…" onCommit={(value) => setHistory("duration", value)} />.
    </p>
    <p>
      Forløbet er <InlineSelect label="Smerteforløb" value={state.painCourse} placeholder="vælg forløb…" options={[{ value: "constant", label: "konstant" }, { value: "intermittent", label: "intermitterende" }, { value: "increasing", label: "tiltagende" }, { value: "decreasing", label: "aftagende" }]} onChange={(value) => setHistory("painCourse", value as SprintOneOneHistory["painCourse"])} />.
      Traume <InlineSelect label="Traume" value={state.trauma} placeholder="afklar traume…" options={[{ value: "yes", label: "ja" }, { value: "no", label: "nej" }]} onChange={(value) => setHistory("trauma", value as SprintOneOneHistory["trauma"])} />.
      {state.trauma === "yes" && <> Mekanisme <InlineSelect label="Traumemekanisme" value={state.traumaMechanism} placeholder="vælg mekanisme…" options={[{ value: "twisting", label: "vrid" }, { value: "direct-blow", label: "direkte traume" }, { value: "fall", label: "fald" }, { value: "other", label: "andet" }]} onChange={(value) => setHistory("traumaMechanism", value as SprintOneOneHistory["traumaMechanism"])} /> under <InlineText label="Traumekontekst" value={state.traumaContext} placeholder="kontekst…" onCommit={(value) => setHistory("traumaContext", value)} />.</>}
    </p>
    <p>
      Smerterne er <InlineSelect label="Smerteplacering" value={state.painLocation} placeholder="vælg placering…" options={[{ value: "medial", label: "mediale" }, { value: "lateral", label: "laterale" }, { value: "anterior", label: "forreste" }, { value: "posterior", label: "bageste" }, { value: "diffuse", label: "diffuse" }]} onChange={(value) => setHistory("painLocation", value as SprintOneOneHistory["painLocation"])} /> og provokeres ved <MultiInline label="Smerteprovokation" options={provocations} selected={state.provocations} onToggle={(value: PainProvocation) => dispatch({ type: "toggle-provocation", value })} />.
    </p>
    <p>
      Funktion <InlineSelect label="Funktionsevne" value={state.function} placeholder="afklar funktion…" options={[{ value: "unaffected", label: "upåvirket" }, { value: "mildly-reduced", label: "let nedsat" }, { value: "significantly-reduced", label: "betydeligt nedsat" }, { value: "unable-to-bear-weight", label: "kan ikke støtte" }]} onChange={(value) => setHistory("function", value as SprintOneOneHistory["function"])} />.
      Hævelse <InlineSelect label="Hævelse" value={state.swelling} placeholder="afklar hævelse…" options={[{ value: "none", label: "ingen" }, { value: "mild", label: "let" }, { value: "persistent", label: "vedvarende" }, { value: "marked", label: "udtalt" }]} onChange={(value) => setHistory("swelling", value as SprintOneOneHistory["swelling"])} />.
      {state.swelling && state.swelling !== "none" && <> Tidsforløb <InlineText label="Hævelsens tidsforløb" value={state.swellingTiming} placeholder="beskriv…" onCommit={(value) => setHistory("swellingTiming", value)} />.</>}
    </p>
    <p>
      Aflåsning <InlineSelect label="Aflåsning" value={state.locking} placeholder="afklar…" options={yesNoUnknown} onChange={(value) => setHistory("locking", value as SprintOneOneHistory["locking"])} />,
      instabilitet <InlineSelect label="Instabilitet" value={state.instability} placeholder="afklar…" options={yesNoUnknown} onChange={(value) => setHistory("instability", value as SprintOneOneHistory["instability"])} />,
      hvilesmerter <InlineSelect label="Hvilesmerter" value={state.restPain} placeholder="afklar…" options={yesNoUnknown} onChange={(value) => setHistory("restPain", value as SprintOneOneHistory["restPain"])} /> og
      nattesmerter <InlineSelect label="Nattesmerter" value={state.nightPain} placeholder="afklar…" options={yesNoUnknown} onChange={(value) => setHistory("nightPain", value as SprintOneOneHistory["nightPain"])} />.
    </p>
    <p className={styles.safetySentence}>
      Safety: feber <InlineSelect label="Feber" value={state.fever} placeholder="afklar…" options={yesNoUnknown} onChange={(value) => setHistory("fever", value as SprintOneOneHistory["fever"])} />,
      almen påvirkning <InlineSelect label="Almen påvirkning" value={state.systemicIllness} placeholder="afklar…" options={yesNoUnknown} onChange={(value) => setHistory("systemicIllness", value as SprintOneOneHistory["systemicIllness"])} /> og
      rødt, varmt, akut hævet knæ <InlineSelect label="Rødt, varmt og akut hævet knæ" value={state.redHotSwollenJoint} placeholder="afklar…" options={yesNoUnknown} onChange={(value) => setHistory("redHotSwollenJoint", value as SprintOneOneHistory["redHotSwollenJoint"])} />.
    </p>
  </NarrativeBlock>;
}

function ObjectiveNarrative({ state, generated, setObjective, dispatch }: {
  readonly state: SprintOneOneObjective;
  readonly generated: string;
  readonly setObjective: <K extends Exclude<keyof SprintOneOneObjective, "palpationFindings">>(key: K, value: SprintOneOneObjective[K] | undefined) => void;
  readonly dispatch: (action: SprintOneOneAction) => void;
}) {
  return <NarrativeBlock eyebrow="Registrering i klinisk kontekst" title="Objektivt" generated={generated}>
    <p>
      Gang <InlineSelect label="Gang" value={state.gait} placeholder="vurder gang…" options={[{ value: "normal", label: "normal" }, { value: "limp", label: "haltende" }, { value: "unable", label: "kan ikke støtte" }, { value: "not-assessed", label: "ikke vurderet" }]} onChange={(value) => setObjective("gait", value as SprintOneOneObjective["gait"])} />,
      inspektion <InlineSelect label="Inspektion" value={state.inspection} placeholder="vælg fund…" options={[{ value: "no-specific-findings", label: "uden særlige fund" }, { value: "swelling", label: "hævelse" }, { value: "redness", label: "rødme" }, { value: "deformity", label: "deformitet" }, { value: "not-assessed", label: "ikke vurderet" }]} onChange={(value) => setObjective("inspection", value as SprintOneOneObjective["inspection"])} /> og
      effusion <InlineSelect label="Effusion" value={state.effusion} placeholder="afklar effusion…" options={[{ value: "none", label: "ingen" }, { value: "mild", label: "let" }, { value: "moderate", label: "moderat" }, { value: "large", label: "stor" }, { value: "not-assessed", label: "ikke vurderet" }]} onChange={(value) => setObjective("effusion", value as SprintOneOneObjective["effusion"])} />.
    </p>
    <p>
      ROM: ekstension <InlineDegree label="Ekstension i grader" value={state.extensionDegrees} onCommit={(value) => setObjective("extensionDegrees", value)} />° og fleksion <InlineDegree label="Fleksion i grader" value={state.flexionDegrees} onCommit={(value) => setObjective("flexionDegrees", value)} />°.
      <label className={styles.inlineCheck}><input type="checkbox" checked={Boolean(state.rangeNotAssessable)} onChange={(event) => setObjective("rangeNotAssessable", event.target.checked || undefined)} /> Ikke vurderbar</label>
    </p>
    <p>
      Palpation <InlineSelect label="Palpationsstatus" value={state.palpationStatus} placeholder="afklar status…" options={[{ value: "no-focal-tenderness", label: "ingen fokal ømhed" }, { value: "not-performed", label: "ikke udført" }, { value: "not-assessable", label: "ikke vurderbar" }]} onChange={(value) => setObjective("palpationStatus", value as SprintOneOneObjective["palpationStatus"])} />.
      Ømme strukturer: <MultiInline label="Ømme strukturer" options={palpations} selected={state.palpationFindings} onToggle={(value: PalpationFinding) => dispatch({ type: "toggle-palpation", value })} />.
    </p>
    <p>
      Lachman <InlineSelect label="Lachman" value={state.lachman} placeholder="vælg…" options={testResults} onChange={(value) => setObjective("lachman", value as SprintOneOneObjective["lachman"])} />,
      valgusstres <InlineSelect label="Valgusstres" value={state.valgus} placeholder="vælg…" options={[{ value: "stable", label: "stabil" }, { value: "lax", label: "laksitet" }, { value: "painful-no-laxity", label: "smerte uden laksitet" }, { value: "not-performed", label: "ikke udført" }, { value: "not-assessable", label: "ikke vurderbar" }]} onChange={(value) => setObjective("valgus", value as SprintOneOneObjective["valgus"])} /> og
      varusstres <InlineSelect label="Varusstres" value={state.varus} placeholder="vælg…" options={[{ value: "stable", label: "stabil" }, { value: "lax", label: "laksitet" }, { value: "painful-no-laxity", label: "smerte uden laksitet" }, { value: "not-performed", label: "ikke udført" }, { value: "not-assessable", label: "ikke vurderbar" }]} onChange={(value) => setObjective("varus", value as SprintOneOneObjective["varus"])} />.
    </p>
    <p>
      Menisktest <InlineSelect label="Menisktest" value={state.meniscalTest} placeholder="vælg…" options={testResults} onChange={(value) => setObjective("meniscalTest", value as SprintOneOneObjective["meniscalTest"])} />,
      patellatest <InlineSelect label="Patellatest" value={state.patella} placeholder="vælg…" options={testResults} onChange={(value) => setObjective("patella", value as SprintOneOneObjective["patella"])} /> og
      distal neurovaskulær status <InlineSelect label="Distal neurovaskulær" value={state.neurovascular} placeholder="vælg…" options={[{ value: "normal", label: "normal" }, { value: "abnormal", label: "afvigende" }, { value: "not-assessed", label: "ikke vurderet" }, { value: "not-assessable", label: "ikke vurderbar" }]} onChange={(value) => setObjective("neurovascular", value as SprintOneOneObjective["neurovascular"])} />.
    </p>
  </NarrativeBlock>;
}
