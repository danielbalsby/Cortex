"use client";

import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ChangeEvent,
  type UIEvent
} from "react";

import {
  deriveSprintOneOneAttention,
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

import styles from "./SprintOneTwoPrototype.module.css";

type WorkspaceSection = "history" | "objective" | "assessment" | "plan";

interface Option {
  readonly value: string;
  readonly label: string;
}

interface WorkspaceMetrics {
  readonly navigationActions: number;
  readonly clinicalActions: number;
  readonly sectionRevisits: number;
  readonly maxScrollPercent: number;
  readonly scrollDirectionChanges: number;
}

const initialMetrics: WorkspaceMetrics = {
  navigationActions: 0,
  clinicalActions: 0,
  sectionRevisits: 0,
  maxScrollPercent: 0,
  scrollDirectionChanges: 0
};

const yesNoUnknown = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nej" },
  { value: "not-assessed", label: "Ikke vurderet" }
] as const;
const tests = [
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

function SelectField({
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
    <label className={styles.field}>
      <span>{label}</span>
      <select value={value ?? ""} onChange={(event) => onChange(event.target.value || undefined)}>
        <option value="">Ikke afklaret</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

function TextField({
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
  readonly onCommit: (value: string | undefined) => void;
}) {
  const [draft, setDraft] = useState(value ?? "");
  useEffect(() => setDraft(value ?? ""), [value]);
  const input = multiline ? (
    <textarea value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onBlur={() => onCommit(draft)} />
  ) : (
    <input value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onBlur={() => onCommit(draft)} />
  );
  return <label className={styles.field}><span>{label}</span>{input}</label>;
}

function NumberField({ label, value, onCommit }: { readonly label: string; readonly value?: number; readonly onCommit: (value: number | undefined) => void }) {
  const [draft, setDraft] = useState(value === undefined ? "" : String(value));
  useEffect(() => setDraft(value === undefined ? "" : String(value)), [value]);
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <span className={styles.degree}>
        <input aria-label={label} inputMode="decimal" value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={() => {
          const number = Number(draft.replace(",", "."));
          onCommit(draft.trim() && Number.isFinite(number) ? number : undefined);
        }} />
        <i>°</i>
      </span>
    </label>
  );
}

function MultiChoice<T extends string>({
  label,
  values,
  selected,
  onToggle
}: {
  readonly label: string;
  readonly values: readonly { readonly value: T; readonly label: string }[];
  readonly selected: readonly T[];
  readonly onToggle: (value: T) => void;
}) {
  return (
    <fieldset className={styles.multi}>
      <legend>{label} <small>Flere kan vælges</small></legend>
      <div>{values.map((item) => <button key={item.value} type="button" aria-pressed={selected.includes(item.value)} onClick={() => onToggle(item.value)}>{item.label}</button>)}</div>
    </fieldset>
  );
}

function extractSection(text: string, heading: string): string {
  return text.split("\n\n").find((part) => part.startsWith(`${heading}\n`))?.slice(heading.length + 1) ?? "";
}

export function SprintOneTwoPrototype() {
  const [state, baseDispatch] = useReducer(sprintOneOneReducer, undefined, createEmptySprintOneOneState);
  const [activeSection, setActiveSection] = useState<WorkspaceSection>("history");
  const [metrics, setMetrics] = useState(initialMetrics);
  const [recoveryNotice, setRecoveryNotice] = useState("");
  const [journalOverride, setJournalOverride] = useState<{ source: string; text: string }>();
  const visitedSections = useRef<Set<WorkspaceSection>>(new Set(["history"]));
  const lastScrollTop = useRef(0);
  const lastScrollDirection = useRef<"up" | "down" | undefined>(undefined);

  const completeness = useMemo(() => deriveSprintOneOneCompleteness(state), [state]);
  const attention = useMemo(() => deriveSprintOneOneAttention(state), [state]);
  const journal = useMemo(() => generateSprintOneOneJournal(state), [state]);
  const staleJournal = Boolean(journalOverride && journalOverride.source !== journal.text);
  const shownJournal = journalOverride?.text ?? journal.text;

  function dispatchClinical(action: SprintOneOneAction) {
    if (action.type === "set-history" && action.key === "trauma" && action.value !== "yes" && (state.history.traumaMechanism || state.history.traumaContext)) {
      setRecoveryNotice("Traumemekanisme og -kontekst blev fjernet af den uændrede Sprint 1.1-reducer, fordi traume blev ændret. Skift tilbage til ja for at registrere dem igen.");
    } else if (action.type === "set-history" && action.key === "swelling" && action.value === "none" && state.history.swellingTiming) {
      setRecoveryNotice("Hævelsens tidsforløb blev fjernet af den uændrede Sprint 1.1-reducer, fordi hævelse blev ændret til ingen.");
    } else {
      setRecoveryNotice("");
    }
    baseDispatch(action);
    setMetrics((current) => ({ ...current, clinicalActions: current.clinicalActions + 1 }));
  }

  function recordFixture() {
    for (const action of SPRINT_ONE_ONE_CASE_ACTIONS) baseDispatch(action);
    setMetrics((current) => ({ ...current, clinicalActions: current.clinicalActions + 1 }));
  }

  function navigate(section: WorkspaceSection) {
    if (section === activeSection) return;
    const revisit = visitedSections.current.has(section);
    visitedSections.current.add(section);
    setActiveSection(section);
    setMetrics((current) => ({
      ...current,
      navigationActions: current.navigationActions + 1,
      sectionRevisits: current.sectionRevisits + (revisit ? 1 : 0)
    }));
  }

  function trackWorkspaceScroll(event: UIEvent<HTMLElement>) {
    const element = event.currentTarget;
    const available = element.scrollHeight - element.clientHeight;
    const percent = available > 0 ? Math.round((element.scrollTop / available) * 100) : 0;
    const direction = element.scrollTop > lastScrollTop.current ? "down" : element.scrollTop < lastScrollTop.current ? "up" : lastScrollDirection.current;
    setMetrics((current) => ({
      ...current,
      maxScrollPercent: Math.max(current.maxScrollPercent, percent),
      scrollDirectionChanges: current.scrollDirectionChanges + (direction && lastScrollDirection.current && direction !== lastScrollDirection.current ? 1 : 0)
    }));
    lastScrollTop.current = element.scrollTop;
    lastScrollDirection.current = direction;
  }

  function setHistory<K extends Exclude<keyof SprintOneOneHistory, "provocations">>(key: K, value: SprintOneOneHistory[K] | undefined) {
    dispatchClinical({ type: "set-history", key, value } as SprintOneOneAction);
  }
  function setObjective<K extends Exclude<keyof SprintOneOneObjective, "palpationFindings">>(key: K, value: SprintOneOneObjective[K] | undefined) {
    dispatchClinical({ type: "set-objective", key, value } as SprintOneOneAction);
  }

  const sections: readonly { readonly id: WorkspaceSection; readonly domain: DomainId; readonly label: string; readonly summary: string }[] = [
    { id: "history", domain: "history", label: "Anamnese", summary: extractSection(journal.text, "Anamnese") || "Ingen anamnese afklaret" },
    { id: "objective", domain: "objective", label: "Objektivt", summary: extractSection(journal.text, "Objektivt") || "Ingen objektive fund afklaret" },
    { id: "assessment", domain: "assessment", label: "Vurdering", summary: state.assessment || "Klinikerens vurdering mangler" },
    { id: "plan", domain: "plan", label: "Plan", summary: [state.plan.management, state.plan.followUp, state.plan.safetyNet].filter(Boolean).join(" · ") || "Plan, opfølgning og safety-net mangler" }
  ];

  const activeDomain = sections.find((section) => section.id === activeSection)!;
  const activeCompleteness = completeness.domains.find((domain) => domain.id === activeDomain.domain);

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}><span>C</span><div><strong>Cortex</strong><small>Sprint 1.2 · one-page IA comparator</small></div></div>
        <div className={styles.prototypeLabel}>C1 · Learning prototype</div>
      </header>

      <div className={styles.safetyNotice}><strong>Kun syntetiske data.</strong> Samme kliniske state og dokumentgenerator som baseline `01eb5db`. Ingen klinisk validering.</div>

      <section className={styles.caseHeader}>
        <div><span>Aktuelt problem</span><h1>{SPRINT_ONE_ONE_CASE.title}</h1><p>{SPRINT_ONE_ONE_CASE.demographics} · {SPRINT_ONE_ONE_CASE.id} · <a href="/prototype/sprint-1-1">Åbn Sprint 1.1-baseline</a></p></div>
        <p>{SPRINT_ONE_ONE_CASE.source.join(" ")}</p>
        <button type="button" onClick={recordFixture}>Brug viste caseoplysninger</button>
      </section>

      <div className={styles.workspace}>
        <section className={styles.clinicalSurface} aria-label="Klinisk arbejdsflade">
          <div className={styles.sectionMap} role="tablist" aria-label="Kliniske arbejdsområder">
            {sections.map((section) => {
              const domain = completeness.domains.find((item) => item.id === section.domain);
              return (
                <button id={`s12-tab-${section.id}`} key={section.id} type="button" role="tab" aria-selected={activeSection === section.id} aria-controls="active-clinical-panel" onClick={() => navigate(section.id)}>
                  <span><i aria-hidden="true">{domain?.status === "complete" ? "✓" : "○"}</i>{section.label}<em>{domain?.missing.length ?? 0} uafklaret</em></span>
                  <small>{section.summary}</small>
                </button>
              );
            })}
          </div>

          {recoveryNotice && <div className={styles.recovery} role="status">{recoveryNotice}</div>}

          <section id="active-clinical-panel" role="tabpanel" aria-labelledby={`s12-tab-${activeSection}`} className={styles.editor} onScroll={trackWorkspaceScroll}>
            <header><div><span>Aktuelt arbejdsområde</span><h2>{activeDomain.label}</h2></div><p>{activeCompleteness?.summary}</p></header>

            {activeSection === "history" && <div className={styles.editorGroups}>
              <section><h3>Debut og forløb</h3><div className={styles.fields}><SelectField label="Side" value={state.history.side} options={[{value:"right",label:"Højre"},{value:"left",label:"Venstre"}]} onChange={(value) => setHistory("side", value as SprintOneOneHistory["side"])} /><SelectField label="Debut" value={state.history.onset} options={[{value:"acute",label:"Akut"},{value:"insidious",label:"Snigende"},{value:"gradual",label:"Gradvist indsættende"}]} onChange={(value) => setHistory("onset", value as SprintOneOneHistory["onset"])} /><TextField label="Varighed" value={state.history.duration} placeholder="fx siden i går" onCommit={(value) => setHistory("duration", value)} /><SelectField label="Smerteforløb" value={state.history.painCourse} options={[{value:"constant",label:"Konstant"},{value:"intermittent",label:"Intermitterende"},{value:"increasing",label:"Tiltagende"},{value:"decreasing",label:"Aftagende"}]} onChange={(value) => setHistory("painCourse", value as SprintOneOneHistory["painCourse"])} /></div></section>
              <section><h3>Traume og smerte</h3><div className={styles.fields}><SelectField label="Traume" value={state.history.trauma} options={[{value:"yes",label:"Ja"},{value:"no",label:"Nej"}]} onChange={(value) => setHistory("trauma", value as SprintOneOneHistory["trauma"])} />{state.history.trauma === "yes" && <><SelectField label="Traumemekanisme" value={state.history.traumaMechanism} options={[{value:"twisting",label:"Vrid"},{value:"direct-blow",label:"Direkte traume"},{value:"fall",label:"Fald"},{value:"other",label:"Andet"}]} onChange={(value) => setHistory("traumaMechanism", value as SprintOneOneHistory["traumaMechanism"])} /><TextField label="Traumekontekst" value={state.history.traumaContext} onCommit={(value) => setHistory("traumaContext", value)} /></>}<SelectField label="Smerteplacering" value={state.history.painLocation} options={[{value:"medial",label:"Medial"},{value:"lateral",label:"Lateral"},{value:"anterior",label:"Forreste"},{value:"posterior",label:"Bageste"},{value:"diffuse",label:"Diffus"}]} onChange={(value) => setHistory("painLocation", value as SprintOneOneHistory["painLocation"])} /></div><MultiChoice label="Smerteprovokation" values={provocations} selected={state.history.provocations} onToggle={(value: PainProvocation) => dispatchClinical({type:"toggle-provocation",value})} /></section>
              <section><h3>Funktion og ledsagesymptomer</h3><div className={styles.fields}><SelectField label="Funktionsevne" value={state.history.function} options={[{value:"unaffected",label:"Upåvirket"},{value:"mildly-reduced",label:"Let nedsat"},{value:"significantly-reduced",label:"Betydeligt nedsat"},{value:"unable-to-bear-weight",label:"Kan ikke støtte"}]} onChange={(value) => setHistory("function", value as SprintOneOneHistory["function"])} /><SelectField label="Hævelse" value={state.history.swelling} options={[{value:"none",label:"Ingen"},{value:"mild",label:"Let"},{value:"persistent",label:"Vedvarende"},{value:"marked",label:"Udtalt"}]} onChange={(value) => setHistory("swelling", value as SprintOneOneHistory["swelling"])} />{state.history.swelling && state.history.swelling !== "none" && <TextField label="Hævelsens tidsforløb" value={state.history.swellingTiming} onCommit={(value) => setHistory("swellingTiming", value)} />}<SelectField label="Aflåsning" value={state.history.locking} options={yesNoUnknown} onChange={(value) => setHistory("locking", value as SprintOneOneHistory["locking"])} /><SelectField label="Instabilitet" value={state.history.instability} options={yesNoUnknown} onChange={(value) => setHistory("instability", value as SprintOneOneHistory["instability"])} /><SelectField label="Hvilesmerter" value={state.history.restPain} options={yesNoUnknown} onChange={(value) => setHistory("restPain", value as SprintOneOneHistory["restPain"])} /><SelectField label="Nattesmerter" value={state.history.nightPain} options={yesNoUnknown} onChange={(value) => setHistory("nightPain", value as SprintOneOneHistory["nightPain"])} /></div></section>
            </div>}

            {activeSection === "objective" && <div className={styles.editorGroups}>
              <section><h3>Basis og ROM</h3><div className={styles.fields}><SelectField label="Gang" value={state.objective.gait} options={[{value:"normal",label:"Normal"},{value:"limp",label:"Haltende"},{value:"unable",label:"Kan ikke støtte"},{value:"not-assessed",label:"Ikke vurderet"}]} onChange={(value) => setObjective("gait", value as SprintOneOneObjective["gait"])} /><SelectField label="Inspektion" value={state.objective.inspection} options={[{value:"no-specific-findings",label:"Uden særlige fund"},{value:"swelling",label:"Hævelse"},{value:"redness",label:"Rødme"},{value:"deformity",label:"Deformitet"},{value:"not-assessed",label:"Ikke vurderet"}]} onChange={(value) => setObjective("inspection", value as SprintOneOneObjective["inspection"])} /><SelectField label="Effusion" value={state.objective.effusion} options={[{value:"none",label:"Ingen"},{value:"mild",label:"Let"},{value:"moderate",label:"Moderat"},{value:"large",label:"Stor"},{value:"not-assessed",label:"Ikke vurderet"}]} onChange={(value) => setObjective("effusion", value as SprintOneOneObjective["effusion"])} /><NumberField label="Ekstension i grader" value={state.objective.extensionDegrees} onCommit={(value) => setObjective("extensionDegrees", value)} /><NumberField label="Fleksion i grader" value={state.objective.flexionDegrees} onCommit={(value) => setObjective("flexionDegrees", value)} /><label className={styles.check}><input type="checkbox" checked={Boolean(state.objective.rangeNotAssessable)} onChange={(event) => setObjective("rangeNotAssessable", event.target.checked || undefined)} /> ROM ikke vurderbar</label></div></section>
              <section><h3>Palpation</h3><SelectField label="Palpationsstatus" value={state.objective.palpationStatus} options={[{value:"no-focal-tenderness",label:"Ingen fokal ømhed"},{value:"not-performed",label:"Ikke udført"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("palpationStatus", value as SprintOneOneObjective["palpationStatus"])} /><MultiChoice label="Ømme strukturer" values={palpations} selected={state.objective.palpationFindings} onToggle={(value: PalpationFinding) => dispatchClinical({type:"toggle-palpation",value})} /></section>
              <section><h3>Målrettede tests</h3><div className={styles.fields}><SelectField label="Lachman" value={state.objective.lachman} options={tests} onChange={(value) => setObjective("lachman", value as SprintOneOneObjective["lachman"])} /><SelectField label="Valgusstres" value={state.objective.valgus} options={[{value:"stable",label:"Stabil"},{value:"lax",label:"Laksitet"},{value:"painful-no-laxity",label:"Smerte uden laksitet"},{value:"not-performed",label:"Ikke udført"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("valgus", value as SprintOneOneObjective["valgus"])} /><SelectField label="Varusstres" value={state.objective.varus} options={[{value:"stable",label:"Stabil"},{value:"lax",label:"Laksitet"},{value:"painful-no-laxity",label:"Smerte uden laksitet"},{value:"not-performed",label:"Ikke udført"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("varus", value as SprintOneOneObjective["varus"])} /><SelectField label="Menisktest" value={state.objective.meniscalTest} options={tests} onChange={(value) => setObjective("meniscalTest", value as SprintOneOneObjective["meniscalTest"])} /><SelectField label="Patellatest" value={state.objective.patella} options={tests} onChange={(value) => setObjective("patella", value as SprintOneOneObjective["patella"])} /><SelectField label="Distal neurovaskulær" value={state.objective.neurovascular} options={[{value:"normal",label:"Normal"},{value:"abnormal",label:"Afvigende"},{value:"not-assessed",label:"Ikke vurderet"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("neurovascular", value as SprintOneOneObjective["neurovascular"])} /></div></section>
              <section><h3>Røde flag</h3><div className={styles.fields}><SelectField label="Feber" value={state.history.fever} options={yesNoUnknown} onChange={(value) => setHistory("fever", value as SprintOneOneHistory["fever"])} /><SelectField label="Almen påvirkning" value={state.history.systemicIllness} options={yesNoUnknown} onChange={(value) => setHistory("systemicIllness", value as SprintOneOneHistory["systemicIllness"])} /><SelectField label="Rødt, varmt og akut hævet knæ" value={state.history.redHotSwollenJoint} options={yesNoUnknown} onChange={(value) => setHistory("redHotSwollenJoint", value as SprintOneOneHistory["redHotSwollenJoint"])} /></div></section>
            </div>}

            {activeSection === "assessment" && <div className={styles.singleEditor}><p>Cortex’ opmærksomhedspunkter forbliver i sidepanelet og indsættes ikke automatisk som vurdering.</p><TextField label="Klinikerens vurdering og usikkerhed" value={state.assessment} multiline placeholder="Formulér klinikerens egen vurdering…" onCommit={(value) => dispatchClinical({type:"set-assessment",value})} /></div>}

            {activeSection === "plan" && <div className={styles.singleEditor}><p>Planen består kun af klinikerens eksplicitte tekst og intentioner.</p><TextField label="Plan" value={state.plan.management} multiline onCommit={(value) => dispatchClinical({type:"set-plan-text",key:"management",value})} /><TextField label="Opfølgning" value={state.plan.followUp} onCommit={(value) => dispatchClinical({type:"set-plan-text",key:"followUp",value})} /><TextField label="Safety-net" value={state.plan.safetyNet} multiline onCommit={(value) => dispatchClinical({type:"set-plan-text",key:"safetyNet",value})} /><label className={styles.check}><input type="checkbox" checked={Boolean(state.plan.imagingIntent)} onChange={(event) => dispatchClinical({type:"set-imaging-intent",value:event.target.checked})} /> Billeddiagnostik indgår i klinikerens plan</label>{state.plan.imagingIntent && <SelectField label="Klinikerens valgte modalitet" value={state.plan.imagingModality} options={[{value:"x-ray",label:"Røntgen"},{value:"mri",label:"MR"}]} onChange={(value) => dispatchClinical({type:"set-imaging-modality",value:value as "x-ray"|"mri"|undefined})} />}</div>}
          </section>
        </section>

        <aside className={styles.companion} aria-label="Cortex Overblik og journal">
          <section className={styles.overview}>
            <header><span>Cortex Overblik</span><strong>{completeness.domains.filter((domain) => domain.status === "complete").length} af {completeness.domains.length} områder belyst</strong></header>
            <ul>{completeness.domains.map((domain) => <li key={domain.id}><i aria-hidden="true">{domain.status === "complete" ? "✓" : "○"}</i><span><strong>{domain.label}</strong><small>{domain.missing.length ? domain.missing.slice(0, 2).join(" · ") + (domain.missing.length > 2 ? ` +${domain.missing.length - 2}` : "") : "Belyst"}</small></span></li>)}</ul>
            <p>{completeness.disclaimer}</p>
          </section>

          <section className={styles.attention}><header><span>Klinisk opmærksomhed</span><small>Cortex spørger · klinikeren beslutter</small></header>{attention.length ? <ul>{attention.map((item) => <li key={item.id}><strong>{item.question}</strong><span>{item.rationale}</span></li>)}</ul> : <p>Ingen yderligere punkter afledt. Det udelukker ikke klinisk risiko.</p>}</section>

          <section className={styles.journal}><header><span>Live journal</span><small>{journal.status === "ready-for-review" ? "Klar til gennemgang" : "Foreløbig"}</small></header><textarea aria-label="Redigerbart journaludkast" value={shownJournal} placeholder="Ingen klinisk tekst endnu" onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setJournalOverride({source:journalOverride?.source ?? journal.text,text:event.target.value})} />{staleJournal && <p className={styles.stale}>Clinical state er ændret. Den redigerede tekst er bevaret og skal sammenlignes eller gendannes.</p>}{journalOverride && <button type="button" onClick={() => setJournalOverride(undefined)}>Gendan genereret tekst</button>}</section>
        </aside>
      </div>

      <aside className={styles.metrics} aria-label="Prototypeobservation" data-testid="sprint-1-2-metrics">
        <strong>Prototypeobservation</strong>
        <span>Navigation <b>{metrics.navigationActions}</b></span>
        <span>Kliniske handlinger <b>{metrics.clinicalActions}</b></span>
        <span>Sektionstilbagevendinger <b>{metrics.sectionRevisits}</b></span>
        <span>Maks. intern scroll <b>{metrics.maxScrollPercent}%</b></span>
        <span>Scrollretningsskift <b>{metrics.scrollDirectionChanges}</b></span>
        <small>Tilbagevendinger er kun en proxy—not et mål for konteksttab.</small>
      </aside>
    </main>
  );
}
