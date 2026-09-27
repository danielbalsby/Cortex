"use client";

import { useEffect, useReducer, useRef, useState, type FormEvent } from "react";

import {
  createJournalDraftOverride,
  resolveJournalDraft,
  type JournalDraftOverride
} from "@/clinical/prototypes/clinical-document-workspace/journal";
import type {
  FunctionStatus,
  PainLocation,
  Swelling,
  TraumaMechanism
} from "@/clinical/prototypes/clinical-document-workspace/model";
import {
  createEmptyClinicalDocumentState
} from "@/clinical/prototypes/clinical-document-workspace/model";
import {
  setFactAction,
  toggleListFactAction,
  workspaceReducer,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace/reducer";
import {
  generateImagingReferralDraft,
  generatePhysiotherapyReferralDraft,
  generateSprintZeroJournal,
  transitionDraftStatus,
  type DraftLifecycleEvent,
  type DraftLifecycleStatus,
  type SprintZeroDraftId
} from "@/clinical/prototypes/sprint-0/drafts";
import {
  SPRINT_ZERO_CONSULTATION_ACTIONS,
  SPRINT_ZERO_PATIENT
} from "@/clinical/prototypes/sprint-0/fixtures";
import {
  generateMockAiSummary,
  type MockAiOutcome
} from "@/clinical/prototypes/sprint-0/mock-ai";
import {
  ChoiceGroup,
  MultiChoiceGroup
} from "@/components/prototype/clinical-document-workspace/ChoiceGroup";

import { ReviewableDraft } from "./ReviewableDraft";
import styles from "./SprintZeroPrototype.module.css";

type AiState =
  | { readonly status: "idle" | "loading" }
  | { readonly status: "ready"; readonly result: Extract<MockAiOutcome, { ok: true }> }
  | { readonly status: "error"; readonly result: Extract<MockAiOutcome, { ok: false }> }
  | { readonly status: "rejected"; readonly result: Extract<MockAiOutcome, { ok: true }> };

interface LearningEvent {
  readonly id: number;
  readonly type:
    | "patient-opened"
    | "consultation-started"
    | "case-recorded"
    | "ai-generated"
    | "ai-failed"
    | "ai-rejected"
    | "degraded-recovered"
    | "draft-edited"
    | "draft-reviewed"
    | "draft-approved"
    | "draft-copied"
    | "draft-rejected";
  readonly detail: string;
}

const DRAFT_IDS: readonly SprintZeroDraftId[] = ["journal", "imaging", "physiotherapy"];

function initialDraftStatuses(): Record<SprintZeroDraftId, DraftLifecycleStatus> {
  return { journal: "draft", imaging: "draft", physiotherapy: "draft" };
}

function applyActions(
  state: ReturnType<typeof createEmptyClinicalDocumentState>,
  actions: readonly WorkspaceAction[]
) {
  return actions.reduce(workspaceReducer, state);
}

export function SprintZeroPrototype() {
  const [screen, setScreen] = useState<"overview" | "consultation">("overview");
  const [state, dispatch] = useReducer(
    workspaceReducer,
    undefined,
    createEmptyClinicalDocumentState
  );
  const [aiState, setAiState] = useState<AiState>({ status: "idle" });
  const [assessment, setAssessment] = useState("");
  const [journalOverride, setJournalOverride] = useState<JournalDraftOverride>();
  const [referralIntents, setReferralIntents] = useState({
    imaging: false,
    physiotherapy: false
  });
  const [draftStatuses, setDraftStatuses] = useState(initialDraftStatuses);
  const [events, setEvents] = useState<readonly LearningEvent[]>([
    { id: 1, type: "patient-opened", detail: "Syntetisk patient åbnet." }
  ]);
  const eventId = useRef(2);

  const journal = generateSprintZeroJournal(state);
  const resolvedJournal = resolveJournalDraft(journal.text, journalOverride);
  const imaging = generateImagingReferralDraft(state, referralIntents.imaging);
  const physiotherapy = generatePhysiotherapyReferralDraft(
    state,
    referralIntents.physiotherapy
  );
  const generatedFingerprints = useRef({
    journal: journal.text,
    imaging: imaging.text,
    physiotherapy: physiotherapy.text
  });

  function record(type: LearningEvent["type"], detail: string) {
    setEvents((current) => [...current, { id: eventId.current++, type, detail }]);
  }

  useEffect(() => {
    const next = {
      journal: journal.text,
      imaging: imaging.text,
      physiotherapy: physiotherapy.text
    };
    for (const id of DRAFT_IDS) {
      if (generatedFingerprints.current[id] !== next[id]) {
        setDraftStatuses((current) =>
          current[id] === "draft" ? current : { ...current, [id]: "draft" }
        );
      }
    }
    generatedFingerprints.current = next;
  }, [journal.text, imaging.text, physiotherapy.text]);

  function startConsultation() {
    setScreen("consultation");
    record("consultation-started", "Ny lokal konsultation startet.");
  }

  function recordKnownCase() {
    for (const action of SPRINT_ZERO_CONSULTATION_ACTIONS) dispatch(action);
    record("case-recorded", "Kendte oplysninger fra den viste syntetiske case registreret.");
  }

  function runMockAi(behavior: "success" | "failure") {
    setAiState({ status: "loading" });
    window.setTimeout(() => {
      const result = generateMockAiSummary(SPRINT_ZERO_PATIENT, behavior);
      if (result.ok) {
        setAiState({ status: "ready", result });
        record("ai-generated", "Det deterministiske mock-resumé blev vist.");
      } else {
        setAiState({ status: "error", result });
        record("ai-failed", "Den testbare mock-fejl blev udløst.");
      }
    }, 180);
  }

  function rejectAiSummary() {
    if (aiState.status !== "ready") return;
    setAiState({ status: "rejected", result: aiState.result });
    record("ai-rejected", "Klinikeren afviste mock-resuméet; consultation state blev ikke ændret.");
  }

  function continueManually() {
    setScreen("consultation");
    record("degraded-recovered", "Klinikeren fortsatte manuelt efter mock-fejlen.");
  }

  function addAssessment(event: FormEvent) {
    event.preventDefault();
    const label = assessment.trim();
    if (!label) return;
    dispatch({
      type: "add-diagnosis",
      diagnosis: { id: "sprint-0-clinician-assessment", label, source: "free-text" }
    });
    setAssessment("");
  }

  function togglePlan(action: "imaging" | "physiotherapy") {
    dispatch({ type: "toggle-plan-action", action });
    if (state.planActions.includes(action)) {
      setReferralIntents((current) => ({ ...current, [action]: false }));
    }
  }

  function requestReferral(kind: "imaging" | "physiotherapy") {
    setReferralIntents((current) => ({ ...current, [kind]: true }));
  }

  function transition(id: SprintZeroDraftId, event: DraftLifecycleEvent) {
    const next = transitionDraftStatus(draftStatuses[id], event);
    if (next === draftStatuses[id]) return;
    setDraftStatuses((current) => ({ ...current, [id]: next }));
    const eventType = {
      review: "draft-reviewed",
      approve: "draft-approved",
      copy: "draft-copied",
      reject: "draft-rejected",
      reset: "draft-reviewed"
    }[event] as LearningEvent["type"];
    record(eventType, `${id}: ${next}.`);
  }

  function updateJournalDraft(text: string) {
    const sourceJournal = journalOverride?.sourceJournal ?? journal.text;
    setJournalOverride({ sourceJournal, text });
    if (!events.some((event) => event.type === "draft-edited" && event.detail.startsWith("journal"))) {
      record("draft-edited", "journal: manuelt udkast oprettet.");
    }
  }

  function rejectJournal() {
    setJournalOverride(createJournalDraftOverride(journal.text, ""));
  }

  function restoreJournal() {
    setJournalOverride(undefined);
    setDraftStatuses((current) => ({ ...current, journal: "draft" }));
  }

  const completed = DRAFT_IDS.every((id) =>
    draftStatuses[id] === "copied" || draftStatuses[id] === "rejected"
  );
  const stoppedAt = completed
    ? "Scenario gennemført"
    : screen === "overview"
      ? "Patient Overview"
      : events.some((event) => event.type === "draft-approved" || event.type === "draft-copied")
        ? "Udkast og beslutning"
        : "Konsultation";

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span aria-hidden="true">C</span>
          <div>
            <p>SPRINT 0 · LEARNING PROTOTYPE</p>
            <strong>Cortex</strong>
            <small>Kun syntetiske data · ingen integration eller afsendelse</small>
          </div>
        </div>
        <div className={styles.progress} aria-label="Prototypeforløb">
          <span className={screen === "overview" ? styles.activeStep : ""}>1 · Patient</span>
          <span className={screen === "consultation" ? styles.activeStep : ""}>2 · Konsultation</span>
          <span className={completed ? styles.completeStep : ""}>3 · Udkast</span>
        </div>
      </header>

      <div className={styles.prototypeNotice} role="note">
        <strong>Ikke til klinisk brug.</strong>
        <span>
          Læringsartefakt uden virkelige patientdata, klinisk validering, persistence eller
          ekstern delivery.
        </span>
      </div>

      <div className={styles.workspace}>
        <aside className={styles.contextColumn} aria-label="Patientkontekst og mock AI">
          <section className={styles.panel} aria-labelledby="sprint-0-patient-title">
            <header className={styles.panelHeader}>
              <p>PATIENT OVERVIEW · SYNTETISK FIXTURE</p>
              <h1 id="sprint-0-patient-title">{SPRINT_ZERO_PATIENT.label}</h1>
              <span>{SPRINT_ZERO_PATIENT.demographics} · {SPRINT_ZERO_PATIENT.id}</span>
            </header>

            <ContextList title="Aktuel henvendelse" items={SPRINT_ZERO_PATIENT.currentContact} />
            <ContextList title="Tidligere oplysninger" items={SPRINT_ZERO_PATIENT.previousContext} />
            <ContextList title="Relevante negative oplysninger" items={SPRINT_ZERO_PATIENT.relevantNegatives} />
            <ContextList
              title="Mangler og usikkerhed"
              items={SPRINT_ZERO_PATIENT.missingOrUncertain}
              attention
            />

            {screen === "overview" ? (
              <button className={styles.primaryButton} type="button" onClick={startConsultation}>
                Åbn ny konsultation
              </button>
            ) : null}
          </section>

          <section className={styles.panel} aria-labelledby="sprint-0-ai-title">
            <header className={styles.panelHeader}>
              <p>DETERMINISTISK MOCK-AI</p>
              <h2 id="sprint-0-ai-title">AI Summary</h2>
              <span>Separat fra kildedata og klinikerens vurdering</span>
            </header>

            {aiState.status === "idle" ? (
              <p className={styles.emptyText}>Intet resumé genereret.</p>
            ) : null}
            {aiState.status === "loading" ? (
              <p className={styles.emptyText} role="status">Mock-service arbejder…</p>
            ) : null}
            {aiState.status === "ready" ? (
              <div className={styles.aiResult}>
                <p>{aiState.result.text}</p>
                <ul>{aiState.result.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
                <small>{aiState.result.provider} · {aiState.result.version}</small>
              </div>
            ) : null}
            {aiState.status === "rejected" ? (
              <div className={styles.rejectedNotice} role="status">
                Mock-resumé afvist af klinikeren. Patientkontekst og konsultationsdata er bevaret.
              </div>
            ) : null}
            {aiState.status === "error" ? (
              <div className={styles.errorNotice} role="alert">
                <strong>AI Summary utilgængeligt</strong>
                <p>{aiState.result.message}</p>
                <button type="button" onClick={continueManually}>Fortsæt manuelt</button>
              </div>
            ) : null}

            <div className={styles.aiActions}>
              <button type="button" onClick={() => runMockAi("success")}>
                Generér mock-resumé
              </button>
              <button type="button" onClick={() => runMockAi("failure")}>
                Simulér AI-fejl
              </button>
              {aiState.status === "ready" ? (
                <button type="button" onClick={rejectAiSummary}>Afvis mock-resumé</button>
              ) : null}
            </div>
          </section>
        </aside>

        <section className={styles.mainColumn} aria-label="Konsultation og udkast">
          {screen === "overview" ? (
            <section className={styles.welcomePanel}>
              <p>STARTTILSTAND</p>
              <h2>Gennemgå konteksten før konsultationen</h2>
              <span>
                AI Summary er valgfrit. Den syntetiske patientkontekst er altid synlig og kan
                bruges manuelt, også hvis mock-servicen fejler.
              </span>
            </section>
          ) : (
            <>
              <section className={styles.consultationPanel} aria-labelledby="sprint-0-consultation-title">
                <header className={styles.consultationHeader}>
                  <div>
                    <p>KLINIKERENS REGISTRERING</p>
                    <h2 id="sprint-0-consultation-title">Konsultation</h2>
                    <span>Kun eksplicit valgte eller indtastede oplysninger bliver kliniske facts.</span>
                  </div>
                  <div>
                    <details>
                      <summary>Vis oplysninger i gruppehandlingen</summary>
                      <ul>
                        <li>Højre side, akut debut og varighed siden i går</li>
                        <li>Vrid på fikseret fod under traume</li>
                        <li>Mediale smerter, let forsinket hævelse og ingen låsning</li>
                      </ul>
                    </details>
                    <button type="button" onClick={recordKnownCase}>Registrér kendte caseoplysninger</button>
                  </div>
                </header>

                <div className={styles.controlSections}>
                  <section aria-labelledby="sprint-0-history-title">
                    <h3 id="sprint-0-history-title">Anamnese</h3>
                    <div className={styles.controlGrid}>
                      <ChoiceGroup
                        label="Traume"
                        value={state.facts.precipitatingFactor}
                        options={[
                          { value: "trauma", label: "Ja, traume" },
                          { value: "none", label: "Intet identificeret traume" },
                          { value: "unclear", label: "Uklart" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("precipitatingFactor", value))}
                      />
                      <MultiChoiceGroup<TraumaMechanism>
                        label="Traumemekanisme"
                        values={state.facts.traumaMechanisms ?? []}
                        options={[
                          { value: "twisting-planted-foot", label: "Vrid på fikseret fod" },
                          { value: "direct-blow", label: "Direkte slag" },
                          { value: "fall", label: "Fald" },
                          { value: "other", label: "Andet" }
                        ]}
                        onToggle={(value) =>
                          dispatch(toggleListFactAction("traumaMechanisms", value))
                        }
                      />
                      <MultiChoiceGroup<PainLocation>
                        label="Smerteplacering"
                        values={state.facts.painLocations ?? []}
                        options={[
                          { value: "medial", label: "Medialt" },
                          { value: "lateral", label: "Lateralt" },
                          { value: "anterior", label: "Fortil" },
                          { value: "posterior", label: "Bagtil" }
                        ]}
                        onToggle={(value) => dispatch(toggleListFactAction("painLocations", value))}
                      />
                      <ChoiceGroup<Swelling>
                        label="Hævelse"
                        value={state.facts.swelling}
                        options={[
                          { value: "none", label: "Ingen" },
                          { value: "delayed-mild", label: "Let, forsinket" },
                          { value: "persistent-mild", label: "Let, vedvarende" },
                          { value: "marked", label: "Udtalt" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("swelling", value))}
                      />
                      <ChoiceGroup<"yes" | "no">
                        label="Låsning"
                        value={state.facts.locking}
                        options={[
                          { value: "yes", label: "Ja" },
                          { value: "no", label: "Nej" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("locking", value))}
                      />
                      <ChoiceGroup<"yes" | "no">
                        label="Instabilitet"
                        value={state.facts.instability}
                        options={[
                          { value: "yes", label: "Ja" },
                          { value: "no", label: "Nej" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("instability", value))}
                      />
                      <ChoiceGroup<FunctionStatus>
                        label="Belastningsevne"
                        value={state.facts.function}
                        options={[
                          { value: "normal", label: "Normal" },
                          { value: "limp", label: "Halter" },
                          { value: "cannot-four-steps", label: "Kan ikke tage fire skridt" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("function", value))}
                      />
                    </div>
                  </section>

                  <section aria-labelledby="sprint-0-objective-title">
                    <h3 id="sprint-0-objective-title">Objektivt</h3>
                    <div className={styles.controlGrid}>
                      <ChoiceGroup
                        label="Gang"
                        value={state.facts.gait}
                        options={[
                          { value: "normal", label: "Normal" },
                          { value: "limp", label: "Haltende" },
                          { value: "unable", label: "Ikke mulig" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("gait", value))}
                      />
                      <ChoiceGroup
                        label="Effusion"
                        value={state.facts.effusion}
                        options={[
                          { value: "none-significant", label: "Ingen betydende" },
                          { value: "mild", label: "Let" },
                          { value: "moderate", label: "Moderat" },
                          { value: "large", label: "Udtalt" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("effusion", value))}
                      />
                      <ChoiceGroup
                        label="Ekstension"
                        value={state.facts.extension}
                        options={[
                          { value: "full", label: "Fuld" },
                          { value: "reduced", label: "Reduceret" },
                          { value: "blocked", label: "Blokeret" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("extension", value))}
                      />
                      <ChoiceGroup
                        label="Fokal ømhed"
                        value={state.facts.tenderness}
                        options={[
                          { value: "none-focal", label: "Ingen fokal" },
                          { value: "medial-joint-line", label: "Medial ledlinje" },
                          { value: "lateral-joint-line", label: "Lateral ledlinje" }
                        ]}
                        onChange={(value) => dispatch(setFactAction("tenderness", value))}
                      />
                    </div>
                  </section>

                  <section aria-labelledby="sprint-0-assessment-title">
                    <h3 id="sprint-0-assessment-title">Klinikerens vurdering</h3>
                    <p className={styles.boundaryText}>
                      Mock AI udfylder aldrig dette felt. Klinikerens arbejdshypotese registreres separat.
                    </p>
                    <form className={styles.assessmentForm} onSubmit={addAssessment}>
                      <label>
                        Arbejdshypotese
                        <input
                          value={assessment}
                          onChange={(event) => setAssessment(event.target.value)}
                          placeholder="Fx mistanke om menisk- eller ligamentskade"
                        />
                      </label>
                      <button type="submit">Registrér vurdering</button>
                    </form>
                    <ul className={styles.assessmentList}>
                      {state.workingDiagnoses.map((item) => (
                        <li key={item.id}>
                          <span>{item.label}</span>
                          <button
                            type="button"
                            onClick={() => dispatch({ type: "remove-diagnosis", id: item.id })}
                          >
                            Fjern
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section aria-labelledby="sprint-0-plan-title">
                    <h3 id="sprint-0-plan-title">Plan og eksplicit henvisningsintention</h3>
                    <MultiChoiceGroup<"imaging" | "physiotherapy">
                      label="Planhandlinger"
                      values={state.planActions.filter(
                        (item): item is "imaging" | "physiotherapy" =>
                          item === "imaging" || item === "physiotherapy"
                      )}
                      options={[
                        { value: "imaging", label: "Billeddiagnostik" },
                        { value: "physiotherapy", label: "Fysioterapi" }
                      ]}
                      onToggle={togglePlan}
                    />
                    <div className={styles.intentActions}>
                      <button
                        type="button"
                        disabled={!state.planActions.includes("imaging")}
                        aria-pressed={referralIntents.imaging}
                        onClick={() => requestReferral("imaging")}
                      >
                        Forbered billeddiagnostisk henvisningsudkast
                      </button>
                      <button
                        type="button"
                        disabled={!state.planActions.includes("physiotherapy")}
                        aria-pressed={referralIntents.physiotherapy}
                        onClick={() => requestReferral("physiotherapy")}
                      >
                        Forbered fysioterapihenvisningsudkast
                      </button>
                    </div>
                  </section>
                </div>
              </section>

              <section className={styles.outputsSection} aria-labelledby="sprint-0-outputs-title">
                <header>
                  <p>KLINIKERKONTROL</p>
                  <h2 id="sprint-0-outputs-title">Udkast</h2>
                  <span>Draft → Reviewed → Approved for copy → Copied. Ingen delivery.</span>
                </header>
                <ReviewableDraft
                  draft={journal}
                  status={draftStatuses.journal}
                  text={resolvedJournal.text}
                  editable
                  isStale={resolvedJournal.isStale}
                  onTextChange={updateJournalDraft}
                  onTransition={(event) => transition("journal", event)}
                  onRestore={journalOverride ? restoreJournal : undefined}
                  onReject={rejectJournal}
                />
                <div className={styles.referralGrid}>
                  <ReviewableDraft
                    draft={imaging}
                    status={draftStatuses.imaging}
                    text={imaging.text}
                    onTransition={(event) => transition("imaging", event)}
                  />
                  <ReviewableDraft
                    draft={physiotherapy}
                    status={draftStatuses.physiotherapy}
                    text={physiotherapy.text}
                    onTransition={(event) => transition("physiotherapy", event)}
                  />
                </div>
              </section>
            </>
          )}
        </section>
      </div>

      <section className={styles.learningPanel} aria-labelledby="sprint-0-learning-title">
        <header>
          <div>
            <p>LOKAL LÆRINGSINSTRUMENTERING</p>
            <h2 id="sprint-0-learning-title">Session report</h2>
          </div>
          <strong>{stoppedAt}</strong>
        </header>
        <dl>
          <div><dt>Scenario gennemført</dt><dd>{completed ? "Ja" : "Nej"}</dd></div>
          <div><dt>Redigerede udkast</dt><dd>{events.filter((event) => event.type === "draft-edited").length}</dd></div>
          <div><dt>Afvisninger</dt><dd>{events.filter((event) => event.type === "ai-rejected" || event.type === "draft-rejected").length}</dd></div>
          <div><dt>Fejltilstand løst</dt><dd>{events.some((event) => event.type === "degraded-recovered") ? "Ja" : "Nej"}</dd></div>
        </dl>
        <ol aria-label="Lokal hændelseslog">
          {events.slice(-8).map((event) => <li key={event.id}>{event.detail}</li>)}
        </ol>
      </section>
    </main>
  );
}

function ContextList({
  title,
  items,
  attention = false
}: {
  title: string;
  items: readonly string[];
  attention?: boolean;
}) {
  return (
    <section className={attention ? styles.contextAttention : styles.contextGroup}>
      <h2>{title}</h2>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
