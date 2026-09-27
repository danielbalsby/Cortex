"use client";

import { useMemo, useReducer, useState, type ReactNode } from "react";

import { deriveClinicalAttention } from "@/clinical/prototypes/sprint-1/attention";
import { deriveConsultationCompleteness } from "@/clinical/prototypes/sprint-1/completeness";
import {
  generateImagingReferral,
  generateJournal,
  generatePhysiotherapyReferral,
  type PrototypeDocument
} from "@/clinical/prototypes/sprint-1/documents";
import {
  SPRINT_ONE_CASE,
  SPRINT_ONE_CASE_ACTIONS
} from "@/clinical/prototypes/sprint-1/fixtures";
import {
  createEmptySprintOneState,
  type SprintOneHistory,
  type SprintOneObjective
} from "@/clinical/prototypes/sprint-1/model";
import {
  sprintOneReducer,
  type SprintOneAction
} from "@/clinical/prototypes/sprint-1/reducer";

import styles from "./SprintOnePrototype.module.css";

interface Option {
  readonly value: string;
  readonly label: string;
}

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
        <option value="">Ikke registreret</option>
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
  const control = multiline ? (
    <textarea value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onBlur={() => onCommit(draft)} />
  ) : (
    <input value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onBlur={() => onCommit(draft)} />
  );
  return <label className={styles.field}><span>{label}</span>{control}</label>;
}

function Section({ id, eyebrow, title, children }: { readonly id: string; readonly eyebrow: string; readonly title: string; readonly children: ReactNode }) {
  return <section id={id} className={styles.section}><header><span>{eyebrow}</span><h2>{title}</h2></header>{children}</section>;
}

function DocumentDraft({ document }: { readonly document: PrototypeDocument }) {
  const [override, setOverride] = useState<{ source: string; text: string }>();
  const [feedback, setFeedback] = useState("");
  const isStale = Boolean(override && override.source !== document.text);
  const shownText = override?.text ?? document.text;

  async function copy() {
    if (document.status !== "ready-for-review" || !shownText.trim()) return;
    await navigator.clipboard.writeText(shownText.trim());
    setFeedback("Kopieret – ingen afsendelse er foretaget.");
  }

  return (
    <article className={styles.outputCard} data-output={document.id}>
      <header><div><span>{document.status === "ready-for-review" ? "Klar til klinikerens gennemgang" : "Foreløbigt udkast"}</span><h3>{document.title}</h3></div></header>
      {document.missing.length > 0 && <div className={styles.missing}><strong>Mangler før teknisk klarhed</strong><ul>{document.missing.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      {isStale && <p className={styles.stale}>Registrerede oplysninger er ændret. Dit redigerede udkast er bevaret; sammenlign eller gendan før kopiering.</p>}
      {document.text || override ? (
        <label className={styles.draftEditor}><span>Redigerbart udkast</span><textarea value={shownText} onChange={(event) => setOverride({ source: override?.source ?? document.text, text: event.target.value })} /></label>
      ) : <p className={styles.emptyOutput}>Der genereres ingen tekst, før minimumsoplysningerne er registreret.</p>}
      <div className={styles.outputActions}>
        {override && <button type="button" onClick={() => { setOverride(undefined); setFeedback("Det genererede udkast er gendannet."); }}>Gendan genereret tekst</button>}
        <button className={styles.primary} type="button" disabled={document.status !== "ready-for-review" || !shownText.trim() || isStale} onClick={copy}>Kopiér udkast</button>
      </div>
      {feedback && <p className={styles.feedback} role="status">{feedback}</p>}
      <small>Teksten er et udkast. Kliniske oplysninger ændres ikke ved tekstredigering.</small>
    </article>
  );
}

const yesNo = [{ value: "yes", label: "Ja" }, { value: "no", label: "Nej" }] as const;
const yesNoUnassessed = [...yesNo, { value: "not-assessed", label: "Ikke vurderet" }] as const;
const tests = [{ value: "negative", label: "Negativ" }, { value: "positive", label: "Positiv" }, { value: "not-performed", label: "Ikke udført" }, { value: "not-assessable", label: "Ikke vurderbar" }] as const;

export function SprintOnePrototype() {
  const [state, dispatch] = useReducer(sprintOneReducer, undefined, createEmptySprintOneState);
  const completeness = useMemo(() => deriveConsultationCompleteness(state), [state]);
  const attention = useMemo(() => deriveClinicalAttention(state), [state]);
  const journal = useMemo(() => generateJournal(state), [state]);
  const imaging = useMemo(() => generateImagingReferral(state), [state]);
  const physiotherapy = useMemo(() => generatePhysiotherapyReferral(state), [state]);

  function setHistory<K extends keyof SprintOneHistory>(key: K, value: SprintOneHistory[K] | undefined) {
    dispatch({ type: "set-history", key, value } as SprintOneAction);
  }
  function setObjective<K extends keyof SprintOneObjective>(key: K, value: SprintOneObjective[K] | undefined) {
    dispatch({ type: "set-objective", key, value } as SprintOneAction);
  }
  function recordSource() {
    for (const action of SPRINT_ONE_CASE_ACTIONS) dispatch(action);
  }
  const nextTarget = completeness.firstIncompleteDomain === "history" || completeness.firstIncompleteDomain === "problem" ? "anamnese" : completeness.firstIncompleteDomain === "objective" || completeness.firstIncompleteDomain === "safety" ? "objektivt" : completeness.firstIncompleteDomain === "assessment" ? "vurdering" : "plan";

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}><div className={styles.brand}><span>C</span><div><strong>Cortex</strong><small>Sprint 1 · learning prototype</small></div></div><nav aria-label="Konsultationsafsnit"><a href="#anamnese">Anamnese</a><a href="#objektivt">Objektivt</a><a href="#vurdering">Vurdering</a><a href="#plan">Plan</a><a href="#dokumentation">Dokumentation</a></nav></header>
      <div className={styles.notice}><strong>Kun syntetisk testdata.</strong> Prototypen træffer ikke kliniske beslutninger og er ikke klinisk valideret.</div>
      <div className={styles.layout}>
        <aside className={styles.overview} aria-label="Cortex Overblik">
          <header><span>Cortex Overblik</span><h1>{SPRINT_ONE_CASE.title}</h1><p>{SPRINT_ONE_CASE.demographics} · {SPRINT_ONE_CASE.id}</p></header>
          <section><h2>Registreret og mangler</h2><ul className={styles.completeness}>{completeness.domains.map((domain) => <li key={domain.id}><span aria-hidden="true">{domain.status === "recorded" ? "✓" : "○"}</span><div><strong>{domain.label}</strong><small>{domain.summary}</small>{domain.missing.length > 0 && <em>{domain.missing.slice(0, 3).join(" · ")}{domain.missing.length > 3 ? ` +${domain.missing.length - 3}` : ""}</em>}</div></li>)}</ul></section>
          <section className={styles.attention}><h2>Klinisk opmærksomhed</h2>{attention.length ? <ul>{attention.map((item) => <li key={item.id}><strong>{item.title}</strong><span>{item.reason}</span></li>)}</ul> : <p>Ingen opmærksomhedspunkter afledt af de registrerede prototypeoplysninger.</p>}<small>Cortex viser registrerede fund og huller; klinikeren beslutter.</small></section>
          <p className={styles.disclaimer}>{completeness.disclaimer}</p>
          <a className={styles.nextAction} href={`#${nextTarget}`}>Fortsæt med {completeness.domains.find((item) => item.id === completeness.firstIncompleteDomain)?.label.toLowerCase() ?? "klinikerens gennemgang"}</a>
        </aside>

        <div className={styles.document}>
          <header className={styles.documentHeader}><span>Problem</span><h1>Knæsmerter</h1><p>{SPRINT_ONE_CASE.source.join(" ")}</p><details><summary>Vis hvad casehandlingen registrerer</summary><ul>{SPRINT_ONE_CASE.source.map((item) => <li key={item}>{item}</li>)}</ul><strong>Registreres ikke:</strong><ul>{SPRINT_ONE_CASE.uncertainty.map((item) => <li key={item}>{item}</li>)}</ul></details><button type="button" onClick={recordSource}>Registrér viste caseoplysninger</button></header>

          <Section id="anamnese" eyebrow="01" title="Anamnese"><p className={styles.narrative}>{journal.text.split("\n\n").find((part) => part.startsWith("Anamnese"))?.replace("Anamnese\n", "") ?? "Ingen anamnese er registreret endnu."}</p><div className={styles.fields}>
            <SelectField label="Side" value={state.history.side} options={[{value:"right",label:"Højre"},{value:"left",label:"Venstre"}]} onChange={(value) => setHistory("side", value as SprintOneHistory["side"])} />
            <SelectField label="Traume" value={state.history.trauma} options={yesNo} onChange={(value) => setHistory("trauma", value as SprintOneHistory["trauma"])} />
            {state.history.trauma === "yes" && <SelectField label="Traumemekanisme" value={state.history.traumaMechanism} options={[{value:"twisting",label:"Vrid"},{value:"direct-blow",label:"Direkte traume"},{value:"fall",label:"Fald"},{value:"other",label:"Andet"}]} onChange={(value) => setHistory("traumaMechanism", value as SprintOneHistory["traumaMechanism"])} />}
            <SelectField label="Smerteplacering" value={state.history.painLocation} options={[{value:"medial",label:"Medial"},{value:"lateral",label:"Lateral"},{value:"anterior",label:"Forreste"},{value:"posterior",label:"Bageste"},{value:"diffuse",label:"Diffus"}]} onChange={(value) => setHistory("painLocation", value as SprintOneHistory["painLocation"])} />
            <SelectField label="Hævelse" value={state.history.swelling} options={[{value:"none",label:"Ingen"},{value:"mild",label:"Let"},{value:"persistent",label:"Vedvarende"},{value:"marked",label:"Udtalt"}]} onChange={(value) => setHistory("swelling", value as SprintOneHistory["swelling"])} />
            <SelectField label="Aflåsning" value={state.history.locking} options={yesNoUnassessed} onChange={(value) => setHistory("locking", value as SprintOneHistory["locking"])} />
            <SelectField label="Instabilitet" value={state.history.instability} options={yesNoUnassessed} onChange={(value) => setHistory("instability", value as SprintOneHistory["instability"])} />
            <SelectField label="Belastningsevne" value={state.history.weightBearing} options={[{value:"normal",label:"Normal"},{value:"limp",label:"Haltende"},{value:"cannot-four-steps",label:"Kan ikke tage fire skridt"},{value:"not-assessed",label:"Ikke vurderet"}]} onChange={(value) => setHistory("weightBearing", value as SprintOneHistory["weightBearing"])} />
          </div></Section>

          <Section id="objektivt" eyebrow="02" title="Objektiv vurdering"><p className={styles.narrative}>Registrér kun undersøgte fund. “Ikke udført” er synlig usikkerhed og tæller ikke som komplet vurdering.</p><div className={styles.fields}>
            <SelectField label="Gang" value={state.objective.gait} options={[{value:"normal",label:"Normal"},{value:"limp",label:"Haltende"},{value:"unable",label:"Kan ikke støtte"},{value:"not-assessed",label:"Ikke vurderet"}]} onChange={(value) => setObjective("gait", value as SprintOneObjective["gait"])} />
            <SelectField label="Inspektion" value={state.objective.inspection} options={[{value:"no-specific-findings",label:"Uden særlige fund"},{value:"swelling",label:"Hævelse"},{value:"redness",label:"Rødme"},{value:"deformity",label:"Deformitet"},{value:"not-assessed",label:"Ikke udført"}]} onChange={(value) => setObjective("inspection", value as SprintOneObjective["inspection"])} />
            <SelectField label="ROM" value={state.objective.rangeOfMotion} options={[{value:"full",label:"Fuld"},{value:"reduced",label:"Reduceret"},{value:"blocked",label:"Blokeret"},{value:"not-assessed",label:"Ikke vurderet"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("rangeOfMotion", value as SprintOneObjective["rangeOfMotion"])} />
            <SelectField label="Effusion" value={state.objective.effusion} options={[{value:"none",label:"Ingen"},{value:"mild",label:"Let"},{value:"moderate",label:"Moderat"},{value:"large",label:"Stor"},{value:"not-assessed",label:"Ikke vurderet"}]} onChange={(value) => setObjective("effusion", value as SprintOneObjective["effusion"])} />
            <SelectField label="Palpation" value={state.objective.palpation} options={[{value:"no-focal-tenderness",label:"Ingen fokal ømhed"},{value:"medial-joint-line",label:"Mediale ledlinje"},{value:"mcl",label:"MCL"},{value:"bony",label:"Knogleømhed"},{value:"not-assessed",label:"Ikke udført"}]} onChange={(value) => setObjective("palpation", value as SprintOneObjective["palpation"])} />
          </div><details className={styles.targeted}><summary>Målrettede knætests</summary><div className={styles.fields}>
            <SelectField label="Lachman" value={state.objective.lachman} options={tests} onChange={(value) => setObjective("lachman", value as SprintOneObjective["lachman"])} />
            <SelectField label="Valgusstresstest" value={state.objective.valgus} options={[{value:"stable",label:"Stabil"},{value:"lax",label:"Laksitet"},{value:"painful-no-laxity",label:"Smerte uden laksitet"},{value:"not-performed",label:"Ikke udført"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("valgus", value as SprintOneObjective["valgus"])} />
            <SelectField label="Varusstresstest" value={state.objective.varus} options={[{value:"stable",label:"Stabil"},{value:"lax",label:"Laksitet"},{value:"painful-no-laxity",label:"Smerte uden laksitet"},{value:"not-performed",label:"Ikke udført"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("varus", value as SprintOneObjective["varus"])} />
            <SelectField label="Menisktest" value={state.objective.meniscalTest} options={tests} onChange={(value) => setObjective("meniscalTest", value as SprintOneObjective["meniscalTest"])} />
            <SelectField label="Patella" value={state.objective.patella} options={[{value:"no-specific-findings",label:"Uden særlige fund"},{value:"abnormal",label:"Afvigende fund"},{value:"not-performed",label:"Ikke udført"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("patella", value as SprintOneObjective["patella"])} />
            <SelectField label="Distal neurovaskulær" value={state.objective.neurovascular} options={[{value:"normal",label:"Normal"},{value:"abnormal",label:"Afvigende"},{value:"not-assessed",label:"Ikke vurderet"},{value:"not-assessable",label:"Ikke vurderbar"}]} onChange={(value) => setObjective("neurovascular", value as SprintOneObjective["neurovascular"])} />
          </div></details><div className={styles.safety}><h3>Safety-vurdering</h3><div className={styles.fields}><SelectField label="Feber" value={state.history.fever} options={yesNoUnassessed} onChange={(value) => setHistory("fever", value as SprintOneHistory["fever"])} /><SelectField label="Almen påvirkning" value={state.history.systemicIllness} options={yesNoUnassessed} onChange={(value) => setHistory("systemicIllness", value as SprintOneHistory["systemicIllness"])} /><SelectField label="Rødt, varmt, akut hævet led" value={state.history.redHotSwollenJoint} options={yesNoUnassessed} onChange={(value) => setHistory("redHotSwollenJoint", value as SprintOneHistory["redHotSwollenJoint"])} /></div></div></Section>

          <Section id="vurdering" eyebrow="03" title="Klinisk vurdering"><p className={styles.narrative}>Formulér klinikerens egen vurdering. Cortex indsætter ikke opmærksomhedspunkter eller hypoteser som fakta.</p><TextField key={`assessment-${state.assessment ?? "empty"}`} label="Klinikerens vurdering" value={state.assessment} multiline placeholder="Skriv vurdering og bevaret usikkerhed…" onCommit={(value) => dispatch({type:"set-assessment", value})} /></Section>

          <Section id="plan" eyebrow="04" title="Plan"><p className={styles.narrative}>Planer beskrives neutralt som intentioner. Ingen handling eller afsendelse sker i prototypen.</p><div className={styles.textFields}><TextField label="Plan" value={state.plan.management} multiline onCommit={(value) => dispatch({type:"set-plan-text",key:"management",value})} /><TextField label="Opfølgning" value={state.plan.followUp} onCommit={(value) => dispatch({type:"set-plan-text",key:"followUp",value})} /><TextField label="Safety-net" value={state.plan.safetyNet} multiline onCommit={(value) => dispatch({type:"set-plan-text",key:"safetyNet",value})} /></div><div className={styles.intentRow}><label><input type="checkbox" checked={Boolean(state.plan.imaging)} onChange={(event) => dispatch({type:"set-imaging-enabled",value:event.target.checked})} /> Forbered billeddiagnostisk henvisningsudkast</label><label><input type="checkbox" checked={Boolean(state.plan.physiotherapy)} onChange={(event) => dispatch({type:"set-physiotherapy-enabled",value:event.target.checked})} /> Forbered fysioterapihenvisningsudkast</label></div>{state.plan.imaging && <div className={styles.intentFields}><SelectField label="Modalitet" value={state.plan.imaging.modality} options={[{value:"x-ray",label:"Røntgen"},{value:"mri",label:"MR"}]} onChange={(value) => dispatch({type:"set-imaging-field",key:"modality",value})} /><TextField label="Indikation" value={state.plan.imaging.indication} onCommit={(value) => dispatch({type:"set-imaging-field",key:"indication",value})} /><TextField label="Klinisk spørgsmål" value={state.plan.imaging.clinicalQuestion} onCommit={(value) => dispatch({type:"set-imaging-field",key:"clinicalQuestion",value})} /></div>}{state.plan.physiotherapy && <div className={styles.intentFields}><TextField label="Formål med fysioterapeutisk vurdering" value={state.plan.physiotherapy.purpose} onCommit={(value) => dispatch({type:"set-physiotherapy-purpose",value})} /></div>}</Section>

          <section id="dokumentation" className={styles.outputs}><header><span>05 · Dokumentation som output</span><h2>Udkast efter klinisk vurdering</h2><p>Vælg tekstlængde. Niveauet ændrer ikke registrerede kliniske fakta.</p><div className={styles.levels}>{(["short","standard","extended"] as const).map((level) => <label key={level}><input type="radio" name="documentation-level" checked={state.documentationLevel === level} onChange={() => dispatch({type:"set-documentation-level",value:level})} /> {level === "short" ? "Kort" : level === "standard" ? "Standard" : "Udvidet"}</label>)}</div></header><DocumentDraft document={journal} />{imaging && <DocumentDraft document={imaging} />}{physiotherapy && <DocumentDraft document={physiotherapy} />}</section>
        </div>
      </div>
    </main>
  );
}
