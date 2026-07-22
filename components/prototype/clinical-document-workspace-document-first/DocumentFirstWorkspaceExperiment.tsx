"use client";

import Link from "next/link";
import { useReducer, useState, type MouseEvent } from "react";

import {
  buildJournalSections,
  type JournalSection
} from "@/clinical/prototypes/clinical-document-workspace/journal";
import { createEmptyClinicalDocumentState } from "@/clinical/prototypes/clinical-document-workspace/model";
import { workspaceReducer } from "@/clinical/prototypes/clinical-document-workspace/reducer";
import {
  getClinicalOverview,
  getImagingMissingInformation,
  getPrototypeAttentionPoints
} from "@/clinical/prototypes/clinical-document-workspace/selectors";

import {
  ContextualCompletionPanel,
  type CompletionTopic
} from "./ContextualCompletionPanel";
import styles from "./DocumentFirstWorkspaceExperiment.module.css";
import { ACUTE_RIGHT_TWIST_SCENARIO } from "./scenario";

type ClinicalSectionId = Exclude<JournalSection["id"], "problem">;

interface CompletionPrompt {
  readonly id: string;
  readonly label: string;
  readonly topic: CompletionTopic;
}

const SECTIONS: readonly {
  id: ClinicalSectionId;
  number: string;
  label: string;
  topic: CompletionTopic;
  emptyText: string;
}[] = [
  {
    id: "history",
    number: "01",
    label: "Anamnese",
    topic: "history-core",
    emptyText: "Ingen anamnestiske oplysninger registreret."
  },
  {
    id: "objective",
    number: "02",
    label: "Objektivt",
    topic: "objective",
    emptyText: "Ingen objektive fund registreret."
  },
  {
    id: "assessment",
    number: "03",
    label: "Vurdering",
    topic: "assessment",
    emptyText: "Ingen arbejdshypoteser registreret."
  },
  {
    id: "plan",
    number: "04",
    label: "Plan",
    topic: "plan",
    emptyText: "Ingen planhandlinger registreret."
  }
];

function getCompletionPrompts(
  sectionId: ClinicalSectionId,
  state: ReturnType<typeof createEmptyClinicalDocumentState>,
  hasSectionText: boolean
): readonly CompletionPrompt[] {
  if (sectionId === "history") {
    const prompts: CompletionPrompt[] = [];
    if (!state.facts.side) prompts.push({ id: "side", label: "Side", topic: "history-core" });
    if (!state.facts.onset) prompts.push({ id: "onset", label: "Debut", topic: "history-core" });
    if (!state.facts.duration?.trim()) {
      prompts.push({ id: "duration", label: "Varighed", topic: "history-core" });
    }
    if (!state.facts.precipitatingFactor) {
      prompts.push({ id: "factor", label: "Udløsende faktor", topic: "history-core" });
    }
    if (
      state.facts.precipitatingFactor === "trauma" &&
      !state.facts.traumaMechanisms?.length &&
      !state.facts.traumaMechanismNote?.trim()
    ) {
      prompts.push({ id: "mechanism", label: "Traumemekanisme", topic: "history-trauma" });
    }
    if (!state.facts.painLocations?.length) {
      prompts.push({ id: "location", label: "Smerteplacering", topic: "history-symptoms" });
    }
    if (!state.facts.function) {
      prompts.push({ id: "function", label: "Funktion", topic: "history-symptoms" });
    }
    return prompts;
  }

  if (sectionId === "objective") {
    return hasSectionText
      ? []
      : [{ id: "objective", label: "Undersøgelsesfund", topic: "objective" }];
  }

  if (sectionId === "assessment") {
    return state.workingDiagnoses.length
      ? []
      : [{ id: "assessment", label: "Arbejdshypotese", topic: "assessment" }];
  }

  if (!state.planActions.length) {
    return [{ id: "plan", label: "Planhandling", topic: "plan" }];
  }
  if (state.planActions.includes("imaging")) {
    const missing = getImagingMissingInformation(state.imaging);
    return missing.length
      ? [{ id: "imaging", label: `Billeddiagnostik · ${missing.length} mangler`, topic: "plan" }]
      : [];
  }
  return [];
}

export function DocumentFirstWorkspaceExperiment() {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    undefined,
    createEmptyClinicalDocumentState
  );
  const [activeTopic, setActiveTopic] = useState<CompletionTopic>("orientation");
  const [clickCount, setClickCount] = useState(0);

  const journalSections = buildJournalSections(state);
  const sectionText = new Map(journalSections.map((section) => [section.id, section.text]));
  const clinicalSectionCount = journalSections.filter((section) => section.id !== "problem").length;
  const journalWordCount = journalSections
    .map((section) => section.text)
    .join(" ")
    .trim()
    .split(/\s+/u)
    .filter(Boolean).length;
  const overview = getClinicalOverview(state);
  const attentionPoints = getPrototypeAttentionPoints(state);

  function countButtonClick(event: MouseEvent<HTMLElement>) {
    const target = event.target instanceof Element ? event.target.closest("button") : null;
    if (target && target.dataset.countClick !== "false") {
      setClickCount((current) => current + 1);
    }
  }

  function loadScenario() {
    dispatch({ type: "reset" });
    for (const action of ACUTE_RIGHT_TWIST_SCENARIO) dispatch(action);
    setActiveTopic("assessment");
    setClickCount(0);
  }

  function resetExperiment() {
    dispatch({ type: "reset" });
    setActiveTopic("orientation");
    setClickCount(0);
  }

  return (
    <main className={styles.shell} onClickCapture={countButtonClick}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span aria-hidden="true">C</span>
          <div>
            <p>ISOLERET UX-EKSPERIMENT · SYNTETISKE DATA</p>
            <strong>Clinical Document Workspace · Document-first</strong>
            <small>Phase 4A · CDR-002-forberedelse</small>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button type="button" data-count-click="false" onClick={loadScenario}>
            Indlæs akut vridscenarie
          </button>
          <button type="button" data-count-click="false" onClick={resetExperiment}>
            Nulstil
          </button>
          <Link href="/prototype/clinical-document-workspace">Se Phase 3</Link>
        </div>
      </header>

      <section className={styles.experimentPurpose} aria-label="Eksperimentets formål">
        <div>
          <strong>Hypotese</strong>
          <p>
            Kan lægen arbejde direkte i et klinisk dokument, mens Cortex kun viser det næste
            relevante kontrolsæt?
          </p>
        </div>
        <p>
          Dette sammenligner dokument-first med den eksisterende form-first prototype. Det er
          ikke en ny klinisk pathway og ikke en erstatning for Phase 3.
        </p>
      </section>

      <div className={styles.workspace}>
        <article className={styles.document} aria-labelledby="document-first-title">
          <header className={styles.documentHeader}>
            <p>KLINISK DOKUMENT</p>
            <h1 id="document-first-title">
              {state.facts.side === "right"
                ? "Højre knæsmerter"
                : state.facts.side === "left"
                  ? "Venstre knæsmerter"
                  : "Knæsmerter"}
            </h1>
            <span>Problem: Knæsmerte</span>
          </header>

          {SECTIONS.map((section) => {
            const text = sectionText.get(section.id);
            const prompts = getCompletionPrompts(section.id, state, Boolean(text));
            return (
              <section
                key={section.id}
                className={styles.documentSection}
                aria-labelledby={`document-first-${section.id}`}
              >
                <div className={styles.sectionIndex}>{section.number}</div>
                <div className={styles.sectionBody}>
                  <header>
                    <h2 id={`document-first-${section.id}`}>{section.label}</h2>
                    <button
                      type="button"
                      aria-pressed={activeTopic === section.topic}
                      onClick={() => setActiveTopic(section.topic)}
                    >
                      Redigér
                    </button>
                  </header>
                  <p className={text ? styles.narrative : styles.emptyNarrative}>
                    {text ?? section.emptyText}
                  </p>
                  {prompts.length ? (
                    <div className={styles.missingRow} aria-label={`Ikke registreret i ${section.label}`}>
                      <span>Ikke registreret</span>
                      {prompts.map((prompt) => (
                        <button
                          key={prompt.id}
                          type="button"
                          onClick={() => setActiveTopic(prompt.topic)}
                        >
                          + {prompt.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.recordedStatus}>Viser kun eksplicit registreret information.</p>
                  )}
                </div>
              </section>
            );
          })}
        </article>

        <aside className={styles.secondary} aria-label="Kontekstuel fuldførelse og sammenligning">
          <section className={styles.completionPanel} aria-labelledby="document-first-completion-title">
            <ContextualCompletionPanel topic={activeTopic} state={state} dispatch={dispatch} />
          </section>

          <section className={styles.metricsPanel} aria-labelledby="document-first-metrics-title">
            <header>
              <p>SAMMENLIGNINGSGRUNDLAG</p>
              <h2 id="document-first-metrics-title">Aktuel session</h2>
            </header>
            <dl>
              <div>
                <dt>Knapklik</dt>
                <dd>{clickCount}</dd>
              </div>
              <div>
                <dt>Aktive kliniske afsnit</dt>
                <dd>{clinicalSectionCount} / 4</dd>
              </div>
              <div>
                <dt>Ord i genereret dokument</dt>
                <dd>{journalWordCount}</dd>
              </div>
            </dl>
            <p>Scenarioindlæsning og nulstilling tælles ikke som konsultationsklik.</p>
          </section>

          <section className={styles.overviewPanel} aria-labelledby="document-first-overview-title">
            <header>
              <p>KLINISK OVERBLIK</p>
              <h2 id="document-first-overview-title">Samme strukturerede tilstand</h2>
            </header>
            <ul>
              {overview
                .filter((item) => item.id !== "attention-points")
                .map((item) => (
                <li key={item.id}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
                ))}
            </ul>
            {attentionPoints.length ? (
              <div className={styles.attentionArea}>
                {attentionPoints.map((point) => (
                  <div key={point.id}>
                    <strong>{point.title}</strong>
                    <span>{point.detail}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.safetyNote}>
                Fravær af opmærksomhedspunkter bekræfter ikke klinisk sikkerhed.
              </p>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
