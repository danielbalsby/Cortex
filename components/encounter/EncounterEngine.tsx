"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Clipboard,
  FileCheck2,
  FileText,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import type { ClinicalField, ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import { createInitialAnswers, setConsultationAnswer } from "@/engine/consultation-engine";
import { evaluateRules } from "@/engine/rule-engine";
import { getVisibleFields } from "@/engine/visibility-engine";
import { createEncounter, generateAllOutputs } from "@/engine/encounter-engine";
import { getPlanRecommendation, rankAssessmentSuggestions } from "@/engine/suggestion-engine";
import type { OutputKind } from "@/encounter/types";

const OUTPUT_ICONS = {
  journal: FileText,
  xray: ScanLine,
  "orthopedic-referral": Stethoscope
};

export function EncounterEngine({ pathway }: { pathway: ClinicalPathway }) {
  const [answers, setAnswers] = useState<ConsultationAnswers>(() => createInitialAnswers(pathway));
  const [activeOutput, setActiveOutput] = useState<OutputKind>("journal");
  const [copied, setCopied] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(pathway.sections.map((section) => [section.id, true]))
  );

  const encounter = useMemo(() => createEncounter(pathway, answers), [pathway, answers]);
  const outputs = useMemo(() => generateAllOutputs(encounter), [encounter]);
  const output = outputs.find((item) => item.kind === activeOutput) ?? outputs[0];
  const alerts = useMemo(() => evaluateRules(pathway, answers), [pathway, answers]);
  const assessmentSuggestions = useMemo(
    () => rankAssessmentSuggestions(pathway, answers).slice(0, 4),
    [pathway, answers]
  );
  const selectedAssessment = String(answers["assessment"] ?? "");
  const planRecommendation = useMemo(
    () => getPlanRecommendation(pathway, selectedAssessment),
    [pathway, selectedAssessment]
  );

  function update(fieldId: string, value: string | string[]) {
    setAnswers((current) => setConsultationAnswer(current, fieldId, value, pathway));
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  function applyAssessment(value: string) {
    setAnswers((current) => setConsultationAnswer(current, "assessment", value, pathway));
  }

  function applyRecommendedPlan() {
    if (!planRecommendation) return;
    setAnswers((current) =>
      setConsultationAnswer(current, "plan-actions", planRecommendation.actions, pathway)
    );
  }

  function toggleSection(sectionId: string) {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId]
    }));
  }

  return (
    <section className="encounterGrid">
      <div className="encounterForm">
        <div className="coreIntro">
          <div>
            <span>PATIENT ENCOUNTER</span>
            <h1>{pathway.title}</h1>
            <p>Dokumentér én gang. Genbrug oplysningerne i alle relevante outputs.</p>
          </div>
          <button className="secondaryButton" onClick={() => setAnswers(createInitialAnswers(pathway))}>
            <RotateCcw size={16} /> Nulstil
          </button>
        </div>


        <div className="clinicalCanvas">
          {pathway.sections.map((section) => {
            const isOpen = openSections[section.id];
            const isAssessment = section.kind === "assessment";

            return (
              <section
                key={section.id}
                className={`clinicalCard ${isOpen ? "open" : "collapsed"}`}
              >
                <button
                  className="clinicalCardHeader"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                >
                  <div>
                    <span>{section.kind.toUpperCase()}</span>
                    <h2>{section.title}</h2>
                  </div>
                  <div className="cardHeaderStatus">
                    <small>{isOpen ? "Åben" : "Skjult"}</small>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="clinicalCardBody">
                    {isAssessment && assessmentSuggestions.length > 0 && (
                      <div className="inlineSuggestionPanel">
                        <div className="suggestionHeading">
                          <div>
                            <span>KLINISK SPARRING</span>
                            <h3>Mulige arbejdsdiagnoser</h3>
                          </div>
                          <small>Forslag – aldrig automatisk valgt</small>
                        </div>
                        <div className="suggestionList">
                          {assessmentSuggestions.map((suggestion) => (
                            <button
                              key={suggestion.value}
                              className={`assessmentSuggestion ${selectedAssessment === suggestion.value ? "active" : ""}`}
                              onClick={() => applyAssessment(suggestion.value)}
                            >
                              <div>
                                <strong>{suggestion.label}</strong>
                                <p>{suggestion.reason}</p>
                              </div>
                              <span>{Math.round(suggestion.score * 100)}%</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="coreFields">
                      {getVisibleFields(section, answers).map((field) => (
                        <FieldRenderer
                          key={field.id}
                          field={field}
                          value={answers[field.id]}
                          onChange={(value) => update(field.id, value)}
                        />
                      ))}
                    </div>

                    {isAssessment && planRecommendation && (
                      <div className="recommendedPlan">
                        <div>
                          <strong>Forslag til plan</strong>
                          <p>{planRecommendation.rationale}</p>
                        </div>
                        <button className="secondaryButton" onClick={applyRecommendedPlan}>
                          Anvend planforslag
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <aside className="encounterOutput">
        <div className="cockpitHeader">
          <div>
            <span>KONSULTATION</span>
            <h2>{pathway.title}</h2>
          </div>
          <small>{output.text.split(/\s+/).filter(Boolean).length} ord</small>
        </div>

        <div className="outputsOverview">
          {outputs.map((item) => {
            const Icon = OUTPUT_ICONS[item.kind];
            const active = item.kind === activeOutput;
            return (
              <button
                key={item.kind}
                className={`outputTask ${active ? "active" : ""}`}
                onClick={() => setActiveOutput(item.kind)}
              >
                <Icon size={18} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.missing.length ? `${item.missing.length} mangler` : "Klar"}</span>
                </div>
                {item.missing.length ? <AlertTriangle size={15} /> : <FileCheck2 size={15} />}
              </button>
            );
          })}
        </div>

        <div className="cockpitScroll">
          <section className="cockpitSection">
            <div className="cockpitSectionHeader">
              <FileText size={17} />
              <strong>{output.title}</strong>
            </div>

            {output.missing.length > 0 && (
              <div className="missingPanel">
                <strong>Manglende eller utilstrækkeligt beskrevet</strong>
                <ul>{output.missing.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            )}

            <pre className="psoapPreview encounterPreview">{output.text}</pre>
            {output.rationale && <p className="outputRationale">{output.rationale}</p>}
          </section>

          <section className={`clinicalReviewPanel ${alerts.length ? "hasAlerts" : "clear"}`}>
            <div className="cockpitSectionHeader">
              {alerts.length ? <AlertTriangle size={17} /> : <ShieldCheck size={17} />}
              <strong>Klinisk kvalitetstjek</strong>
            </div>

            {alerts.length ? (
              <div className="reviewItems">
                {alerts.map((alert) => (
                  <div key={alert.title + alert.message} className={`reviewItem ${alert.severity}`}>
                    <strong>{alert.title}</strong>
                    <p>{alert.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="reviewClearText">
                Ingen regelbaserede akutte opmærksomhedspunkter udløst.
              </p>
            )}
          </section>

          <section className="administrativeReviewPanel">
            <div className="cockpitSectionHeader">
              <FileCheck2 size={17} />
              <strong>Administrative opgaver</strong>
            </div>
            <div className="administrativeList">
              {outputs.map((item) => (
                <button
                  key={item.kind}
                  onClick={() => setActiveOutput(item.kind)}
                  className={item.kind === activeOutput ? "active" : ""}
                >
                  <span>{item.missing.length ? "○" : "✓"}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.missing.length ? `${item.missing.length} oplysninger mangler` : "Klar til kontrol"}</small>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="cockpitActionBar">
          <button className="copyButton coreCopy" onClick={copyOutput}>
            {copied ? <Check size={18} /> : <Clipboard size={18} />}
            {copied ? "Kopieret" : `Kopiér ${output.title.toLowerCase()}`}
          </button>
          <p className="safetyNote">
            Kontrollér klinisk indhold, modtager og lokale krav før brug.
          </p>
        </div>
      </aside>
    </section>
  );
}

function FieldRenderer({ field, value, onChange }: { field: ClinicalField; value: string | string[]; onChange: (value: string | string[]) => void }) {
  if (field.type === "short-text") {
    const isAssessment = field.id === "assessment-note";
    return (
      <label className={`coreField textField ${isAssessment ? "assessmentTextField" : ""}`}>
        <span>{field.label}</span>
        {isAssessment ? (
          <textarea
            value={String(value ?? "")}
            maxLength={500}
            rows={3}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <input
            value={String(value ?? "")}
            maxLength={240}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
      </label>
    );
  }
  if (field.type === "multi-choice") {
    const selected = Array.isArray(value) ? value : [];
    return <div className="coreField"><span>{field.label}</span><div className="chipGroup">{field.options?.map((option) => {
      const active = selected.includes(option.value);
      return <button key={option.value} className={`clinicalChip ${active ? "selected" : ""}`} onClick={() => onChange(active ? selected.filter((item) => item !== option.value) : [...selected, option.value])}>{option.label}</button>;
    })}</div></div>;
  }
  return <div className="coreField"><span>{field.label}</span><div className="chipGroup">{field.options?.map((option) => <button key={option.value} className={`clinicalChip ${value === option.value ? "selected" : ""}`} onClick={() => onChange(option.value)}>{option.label}</button>)}</div></div>;
}
