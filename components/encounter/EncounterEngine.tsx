"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Activity,
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
import type { ClinicalField, ClinicalOutputType, ClinicalPathway, ConsultationAnswers } from "@/clinical/types";
import { createInitialAnswers, setConsultationAnswer } from "@/engine/consultation-engine";
import { getVisibleFields } from "@/engine/visibility-engine";
import type { OutputGeneratorRegistry } from "@/engine/output-generator-registry";
import { getPlanRecommendation } from "@/engine/suggestion-engine";
import { deriveValidatedWorkflow } from "@/engine/workflow-engine";

const OUTPUT_ICONS: Record<ClinicalOutputType, typeof FileText> = {
  journal: FileText,
  "physiotherapy-referral": Activity,
  "xray-referral": ScanLine,
  "orthopedic-referral": Stethoscope
};

export function EncounterEngine({
  pathway,
  outputGeneratorRegistry
}: {
  pathway: ClinicalPathway;
  outputGeneratorRegistry: OutputGeneratorRegistry;
}) {
  const validationOptions = useMemo(
    () => ({ availableGeneratorIds: outputGeneratorRegistry.generatorIds }),
    [outputGeneratorRegistry]
  );
  const [answers, setAnswers] = useState<ConsultationAnswers>(() =>
    createInitialAnswers(pathway, validationOptions)
  );
  const [selectedOutputId, setSelectedOutputId] = useState(
    pathway.workflowRoles.primaryOutputId
  );
  const [copied, setCopied] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(pathway.sections.map((section) => [section.id, true]))
  );

  const workflow = useMemo(() => {
    const result = deriveValidatedWorkflow(pathway, answers, outputGeneratorRegistry);
    if (!result.valid) {
      const summary = result.issues
        .map((issue) => `${issue.code}${issue.path ? ` at ${issue.path}` : ""}`)
        .join("; ");
      throw new Error(`Invalid clinical workflow state for "${pathway.id}": ${summary}`);
    }
    return result.workflow;
  }, [pathway, answers, outputGeneratorRegistry]);
  const validatedAnswers = workflow.encounter.answers;
  const outputs = workflow.outputs;
  const activeOutputId = outputs.some((item) => item.id === selectedOutputId)
    ? selectedOutputId
    : outputs[0]?.id ?? pathway.workflowRoles.primaryOutputId;
  const output = outputs.find((item) => item.id === activeOutputId) ?? outputs[0];
  const alerts = workflow.alerts;
  const assessmentSuggestions = workflow.suggestions.slice(0, 4);
  const assessmentFieldId = pathway.workflowRoles.assessmentFieldId;
  const planActionsFieldId = pathway.workflowRoles.planActionsFieldId;
  const selectedAssessment = assessmentFieldId
    ? String(validatedAnswers[assessmentFieldId] ?? "")
    : "";
  const planRecommendation = useMemo(
    () => getPlanRecommendation(pathway, selectedAssessment),
    [pathway, selectedAssessment]
  );

  function update(fieldId: string, value: string | string[]) {
    setAnswers((current) => setConsultationAnswer(current, fieldId, value, pathway).answers);
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  function applyAssessment(value: string) {
    if (!assessmentFieldId) return;
    setAnswers((current) =>
      setConsultationAnswer(current, assessmentFieldId, value, pathway).answers
    );
  }

  function applyRecommendedPlan() {
    if (!planRecommendation || !planActionsFieldId) return;
    setAnswers((current) =>
      setConsultationAnswer(current, planActionsFieldId, planRecommendation.actions, pathway).answers
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
          <button
            className="secondaryButton"
            onClick={() => setAnswers(createInitialAnswers(pathway, validationOptions))}
          >
            <RotateCcw size={16} /> Nulstil
          </button>
        </div>


        <div className="clinicalCanvas">
          {workflow.visibleSections.map((section) => {
            const isOpen = openSections[section.id];
            const isAssessment = assessmentFieldId
              ? section.fields.some((field) => field.id === assessmentFieldId)
              : false;

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
                      <div className="inlineSuggestionPanel" role="region" aria-label="Klinisk sparring">
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
                              aria-pressed={selectedAssessment === suggestion.value}
                            >
                              <div>
                                <strong>{suggestion.label}</strong>
                                <p>{suggestion.reason}</p>
                              </div>
                              <span>{suggestion.supportCount} af {suggestion.totalSupportingConditions} støttende fund</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="coreFields">
                      {getVisibleFields(section, validatedAnswers).map((field) => (
                        <FieldRenderer
                          key={field.id}
                          field={field}
                          value={validatedAnswers[field.id]}
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
          <small>{output ? output.text.split(/\s+/).filter(Boolean).length : 0} ord</small>
        </div>

        <nav className="outputsOverview" aria-label="Aktive outputs">
          {outputs.map((item) => {
            const Icon = OUTPUT_ICONS[item.kind];
            const active = item.id === activeOutputId;
            return (
              <button
                key={item.id}
                className={`outputTask ${active ? "active" : ""}`}
                onClick={() => setSelectedOutputId(item.id)}
                aria-pressed={active}
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
        </nav>

        <div className="cockpitScroll">
          {output && (
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

            <pre className="psoapPreview encounterPreview" aria-label="Aktivt outputudkast">{output.text}</pre>
            {output.rationale && <p className="outputRationale">{output.rationale}</p>}
          </section>
          )}

          <section className={`clinicalReviewPanel ${alerts.length ? "hasAlerts" : "clear"}`}>
            <div className="cockpitSectionHeader">
              {alerts.length ? <AlertTriangle size={17} /> : <ShieldCheck size={17} />}
              <strong>Klinisk kvalitetstjek</strong>
            </div>

            {alerts.length ? (
              <div className="reviewItems">
                {alerts.map((evaluatedRule) => (
                  <div
                    key={evaluatedRule.ruleId}
                    className={`reviewItem ${evaluatedRule.alert.severity}`}
                  >
                    <strong>{evaluatedRule.alert.title}</strong>
                    <p>{evaluatedRule.alert.message}</p>
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
                  key={item.id}
                  onClick={() => setSelectedOutputId(item.id)}
                  className={item.id === activeOutputId ? "active" : ""}
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
          <button className="copyButton coreCopy" onClick={copyOutput} disabled={!output}>
            {copied ? <Check size={18} /> : <Clipboard size={18} />}
            {copied ? "Kopieret" : output ? `Kopiér ${output.title.toLowerCase()}` : "Kopiér output"}
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
  const labelId = `field-${field.id}-label`;
  if (field.type === "short-text") {
    const isAssessment = field.id === "assessment-note";
    return (
      <label className={`coreField textField ${isAssessment ? "assessmentTextField" : ""}`}>
        <span id={labelId}>{field.label}</span>
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
    return <div className="coreField" role="group" aria-labelledby={labelId}><span id={labelId}>{field.label}</span><div className="chipGroup">{field.options?.map((option) => {
      const active = selected.includes(option.value);
      return <button key={option.value} className={`clinicalChip ${active ? "selected" : ""}`} aria-pressed={active} onClick={() => onChange(active ? selected.filter((item) => item !== option.value) : [...selected, option.value])}>{option.label}</button>;
    })}</div></div>;
  }
  return <div className="coreField" role="group" aria-labelledby={labelId}><span id={labelId}>{field.label}</span><div className="chipGroup">{field.options?.map((option) => <button key={option.value} className={`clinicalChip ${value === option.value ? "selected" : ""}`} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}</div></div>;
}
