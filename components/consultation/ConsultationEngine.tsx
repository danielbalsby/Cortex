"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, Check, Clipboard, RotateCcw } from "lucide-react";
import type { ClinicalField, ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import { createInitialAnswers, setConsultationAnswer } from "@/engine/consultation-engine";
import { evaluateRules } from "@/engine/rule-engine";
import { generatePSOAP } from "@/engine/output-engine";

export function ConsultationEngine({ pathway }: { pathway: ClinicalPathway }) {
  const [answers, setAnswers] = useState<ConsultationAnswers>(() => createInitialAnswers(pathway));
  const [copied, setCopied] = useState(false);
  const note = useMemo(() => generatePSOAP(pathway, answers), [pathway, answers]);
  const alerts = useMemo(() => evaluateRules(pathway, answers), [pathway, answers]);
  const update = (fieldId: string, value: string | string[]) => setAnswers(current => setConsultationAnswer(current, fieldId, value));
  async function copy() { await navigator.clipboard.writeText(note); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }

  return <section className="coreGrid">
    <div className="coreForm">
      <div className="coreIntro"><div><span>CLINICAL PATHWAY</span><h1>{pathway.title}</h1><p>{pathway.description}</p></div><button className="secondaryButton" onClick={() => setAnswers(createInitialAnswers(pathway))}><RotateCcw size={16}/>Nulstil</button></div>
      {alerts.length > 0 && <div className="alertsStack">{alerts.map(alert => <div key={alert.title + alert.message} className={`clinicalAlert ${alert.severity}`}><AlertTriangle size={18}/><div><strong>{alert.title}</strong><p>{alert.message}</p></div></div>)}</div>}
      {pathway.sections.map(section => <section key={section.id} className="coreSection"><div className="coreSectionTitle"><span>{section.kind.toUpperCase()}</span><h2>{section.title}</h2></div><div className="coreFields">{section.fields.map(field => <FieldRenderer key={field.id} field={field} value={answers[field.id]} onChange={value => update(field.id, value)}/>)}</div></section>)}
    </div>
    <aside className="coreOutput"><div className="outputHeader"><div><span>LIVE PSOAP</span><h2>Journalnotat</h2></div><small>{note.split(/\s+/).filter(Boolean).length} ord</small></div><pre className="psoapPreview">{note}</pre><button className="copyButton coreCopy" onClick={copy}>{copied ? <Check size={18}/> : <Clipboard size={18}/>} {copied ? "Kopieret" : "Kopiér samlet journal"}</button><p className="safetyNote">Kontrollér altid notatet før indsættelse i journalen.</p></aside>
  </section>;
}

function FieldRenderer({ field, value, onChange }: { field: ClinicalField; value: string | string[]; onChange: (value: string | string[]) => void }) {
  if (field.type === "short-text") return <label className="coreField textField"><span>{field.label}</span><input value={String(value ?? "")} maxLength={150} placeholder={field.placeholder} onChange={event => onChange(event.target.value)}/></label>;
  if (field.type === "multi-choice") { const selected = Array.isArray(value) ? value : []; return <div className="coreField"><span>{field.label}</span><div className="chipGroup">{field.options?.map(option => { const active = selected.includes(option.value); return <button key={option.value} className={`clinicalChip ${active ? "selected" : ""}`} onClick={() => onChange(active ? selected.filter(item => item !== option.value) : [...selected, option.value])}>{option.label}</button>; })}</div></div>; }
  return <div className="coreField"><span>{field.label}</span><div className="chipGroup">{field.options?.map(option => <button key={option.value} className={`clinicalChip ${value === option.value ? "selected" : ""}`} onClick={() => onChange(option.value)}>{option.label}</button>)}</div></div>;
}
