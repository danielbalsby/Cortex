"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";

import type {
  PainProvocation,
  PalpationFinding
} from "@/clinical/prototypes/sprint-1-1/model";
import {
  getActiveAssessments,
  getActivePhrases,
  type C3DocumentProfile
} from "@/clinical/prototypes/c3/model";
import {
  createC3Assessment,
  discardC3ManualDraft,
  discardC3Recovery,
  getC3DraftStatus,
  removeC3Phrase,
  restoreC3Recovery,
  reviseC3Assessment,
  selectC3PhraseDefinition,
  setC3ManualDraft,
  setC3Profile
} from "@/clinical/prototypes/c3/state";
import {
  commitC32Batch,
  latestActiveBatch,
  setC32InspectionStatus,
  toggleC32InspectionFinding,
  undoC32Batch
} from "@/clinical/prototypes/c3-2/state";
import type {
  C32InspectionFinding
} from "@/clinical/prototypes/c3-2/model";
import {
  C33_ACCOMPANYING_SYMPTOMS,
  C33_COMORBIDITY_CHIPS,
  C33_MEDICATION_CHIPS,
  C33_PHRASES,
  C33_RED_FLAG_GROUPS,
  C33_PROBLEM_PROFILES,
  C33_TRAUMA_MECHANISM_DETAILS,
  findMatchingC33ProblemProfiles,
  resolveC33PhraseText,
  type C33PhraseGroup,
  type C33ProblemProfile
} from "@/clinical/prototypes/c3-3/fixtures";
import {
  createEmptyC33State,
  C33_SCENARIO_VERSION,
  type C33AccompanyingSymptomId,
  type C33ComorbidityChip,
  type C33ExtraPalpationFinding,
  type C33MedicationChip,
  type C33MovementFinding,
  type C33RedFlagGroupId,
  type C33State,
  type C33TraumaMechanismDetail,
  type C33WeightBearingCapacity
} from "@/clinical/prototypes/c3-3/model";
import {
  isC33CopyReadyPsoap,
  projectC33PsoapDocument
} from "@/clinical/prototypes/c3-3/projections";
import {
  applyC33FactAction,
  C33_PROVOCATION_GROUPS,
  configureC33Problem,
  hasC33AccompanyingSymptomsNone,
  hasC33NegativeSymptomBatch,
  hasC33RedFlagsNormal,
  hasC33TestsNormalBatch,
  setC33ActiveRomDegrees,
  setC33Background,
  setC33RedFlagGroup,
  setC33Side,
  setC33TraumaMechanismDetail,
  setC33TraumaSnap,
  setC33WeightBearingCapacity,
  toggleC33AccompanyingSymptom,
  toggleC33AccompanyingSymptomsNone,
  toggleC33ComorbidityChip,
  toggleC33ExtraPalpationFinding,
  toggleC33MedicationChip,
  toggleC33MovementFinding,
  toggleC33NegativeSymptomBatch,
  toggleC33ProvocationGroup,
  toggleC33RedFlagsNormal,
  toggleC33TestsNormalBatch
} from "@/clinical/prototypes/c3-3/state";

import styles from "./C33CalmFastFlow.module.css";
import {
  buildC33AnalysisDraft,
  isC33UnfinishedAnalysisDraft
} from "@/clinical/prototypes/c3-3/analysis-draft";

import {
  focusAdjacentKeyboardGroup,
  handleCategoryArrowKey,
  handleConfirmAndAdvanceKey,
  handleExclusiveKey,
  handleMultiKey,
  handleNormalShortcut,
  handleWorkspaceKeyboardNavigation,
  KEYBOARD_GROUP_ATTR,
  refreshRovingGroups,
  scheduleFocusAdjacentKeyboardGroup,
  type C33KeyboardGroupId
} from "./keyboard";

interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
}

interface Instrumentation {
  readonly startedAt?: number;
  readonly copiedAt?: number;
  readonly clicks: number;
  readonly copies: number;
  readonly keyboardCommits: number;
  readonly batchSelections: number;
  readonly blockedBatches: number;
}

const initialInstrumentation: Instrumentation = {
  clicks: 0,
  copies: 0,
  keyboardCommits: 0,
  batchSelections: 0,
  blockedBatches: 0
};

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

const inspectionFindings = [
  { value: "swelling", label: "Hævelse" },
  { value: "redness", label: "Rødme" },
  { value: "deformity", label: "Deformitet" }
] as const;

const planGroups: readonly {
  readonly id: C33PhraseGroup;
  readonly label: string;
  readonly keyboardGroup: C33KeyboardGroupId;
}[] = [
  { id: "self-care", label: "Selvpleje", keyboardGroup: "plan-self-care" },
  { id: "plan", label: "Plan", keyboardGroup: "plan-plan" },
  { id: "analgesia", label: "Smertebehandling", keyboardGroup: "plan-analgesia" },
  { id: "imaging", label: "Billeddiagnostik", keyboardGroup: "plan-imaging" },
  { id: "referral", label: "Henvisning", keyboardGroup: "plan-referral" },
  { id: "follow-up", label: "Opfølgning", keyboardGroup: "plan-follow-up" },
  { id: "safety-net", label: "Safety-net", keyboardGroup: "plan-safety-net" },
  { id: "information", label: "Information", keyboardGroup: "plan-information" }
];

function keyboardGroupProps(id: C33KeyboardGroupId) {
  return { [KEYBOARD_GROUP_ATTR]: id } as const;
}

function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
  keyboardGroup,
  normalValue
}: {
  readonly label: string;
  readonly value?: T;
  readonly options: readonly Option<T>[];
  readonly onChange: (value: T | undefined) => void;
  readonly className?: string;
  readonly keyboardGroup: C33KeyboardGroupId;
  /** Marks the option activated by the contextual `n` shortcut. */
  readonly normalValue?: T;
}) {
  return (
    <fieldset className={`${styles.choice} ${className ?? ""}`} {...keyboardGroupProps(keyboardGroup)}>
      <legend>{label}</legend>
      <div role="radiogroup" aria-label={label} data-roving-group="true">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            data-c33-normal-action={normalValue === option.value ? "true" : undefined}
            onClick={() => onChange(value === option.value ? undefined : option.value)}
            onKeyDown={handleExclusiveKey}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  keyboardGroup
}: {
  readonly label: string;
  readonly value?: T;
  readonly options: readonly Option<T>[];
  readonly onChange: (value: T | undefined) => void;
  readonly keyboardGroup: C33KeyboardGroupId;
}) {
  return (
    <label className={styles.field} {...keyboardGroupProps(keyboardGroup)}>
      <span>{label}</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(
          (event.target.value || undefined) as T | undefined
        )}
        onKeyDown={(event) => {
          // Enter/Space confirm the current option and advance, matching exclusive
          // chip commit. Mouse-driven onChange never advances focus.
          if (event.key === "Enter" || event.key === " ") {
            const select = event.currentTarget;
            if (select.value) {
              event.preventDefault();
              scheduleFocusAdjacentKeyboardGroup(select, 1);
            }
            return;
          }
          // Select is not a text caret field: arrows move by clinical category.
          // Alt+Arrow keeps native option cycling when needed.
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            if (!event.altKey) {
              event.preventDefault();
              focusAdjacentKeyboardGroup(event.currentTarget, event.key === "ArrowUp" ? -1 : 1);
            }
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            if (!event.altKey) {
              event.preventDefault();
              focusAdjacentKeyboardGroup(
                event.currentTarget,
                event.key === "ArrowLeft" ? -1 : 1
              );
            }
          }
        }}
      >
        <option value="">Vælg…</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onCommit,
  onKeyboardCommit,
  keyboardGroup,
  ariaLabel
}: {
  readonly label: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly onCommit: (value: string | undefined) => void;
  readonly onKeyboardCommit?: () => void;
  readonly keyboardGroup?: C33KeyboardGroupId;
  readonly ariaLabel?: string;
}) {
  const [draft, setDraft] = useState(value ?? "");
  useEffect(() => setDraft(value ?? ""), [value]);
  const commit = () => onCommit(draft.trim() || undefined);
  return (
    <label
      className={styles.field}
      {...(keyboardGroup ? keyboardGroupProps(keyboardGroup) : {})}
    >
      <span>{label}</span>
      <input
        value={draft}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          const input = event.currentTarget;
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
            onKeyboardCommit?.();
            scheduleFocusAdjacentKeyboardGroup(input, 1);
          }
          if (event.key === "Escape") setDraft(value ?? "");
          if (!keyboardGroup) return;
          // Cross categories only at caret edges so mid-text editing stays native.
          if (
            (event.key === "ArrowUp" || event.key === "ArrowDown")
            && !event.altKey
          ) {
            const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
            const atEnd = input.selectionStart === input.value.length
              && input.selectionEnd === input.value.length;
            if (event.key === "ArrowUp" && atStart) {
              event.preventDefault();
              focusAdjacentKeyboardGroup(input, -1);
            }
            if (event.key === "ArrowDown" && atEnd) {
              event.preventDefault();
              focusAdjacentKeyboardGroup(input, 1);
            }
          }
        }}
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onCommit
}: {
  readonly label: string;
  readonly value?: number;
  readonly onCommit: (value: number | undefined) => void;
}) {
  const [draft, setDraft] = useState(value === undefined ? "" : String(value));
  useEffect(
    () => setDraft(value === undefined ? "" : String(value)),
    [value]
  );
  const commit = () => {
    const parsed = Number(draft.replace(",", "."));
    onCommit(draft.trim() && Number.isFinite(parsed) ? parsed : undefined);
  };
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input
        inputMode="decimal"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
          }
          if (event.key === "Escape") {
            setDraft(value === undefined ? "" : String(value));
          }
        }}
      />
    </label>
  );
}

function ClinicalSection({
  marker,
  title,
  children
}: {
  readonly marker: string;
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <section className={styles.clinicalSection}>
      <header>
        <span>{marker}</span>
        <h2>{title}</h2>
      </header>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function parsePsoap(text: string) {
  const markers = ["P:", "S:", "O:", "A:", "P:"] as const;
  const lines = text.split("\n");
  return markers.map((marker, index) => ({
    marker: marker[0],
    text: (lines[index] ?? marker).replace(/^[PSOAP]:\s*/u, "")
  }));
}

export function C33CalmFastFlow() {
  const [state, setState] = useState<C33State>(() => createEmptyC33State());
  const [problemQuery, setProblemQuery] = useState("");
  const [showAbnormalRom, setShowAbnormalRom] = useState(false);
  const [assessmentDraft, setAssessmentDraft] = useState("");
  const [assessmentConfirmed, setAssessmentConfirmed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [copySucceeded, setCopySucceeded] = useState(false);
  const [instrumentation, setInstrumentation] = useState(initialInstrumentation);
  const firstClinicalControl = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const copyResetTimer = useRef<number | null>(null);

  useEffect(() => {
    if (workspaceRef.current) refreshRovingGroups(workspaceRef.current);
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      handleWorkspaceKeyboardNavigation(event);
      handleNormalShortcut(event);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => {
    if (copyResetTimer.current !== null) {
      window.clearTimeout(copyResetTimer.current);
    }
  }, []);

  const c32 = state.c32;
  const c3 = c32.c3;
  const profile = c3.outputProfile;
  const activeAssessment = getActiveAssessments(c3)[0];

  useEffect(() => {
    const seed = buildC33AnalysisDraft(state);
    if (!seed) return;
    if (assessmentConfirmed) return;
    if (activeAssessment) return;
    setAssessmentDraft((current) => {
      if (!current.trim() || isC33UnfinishedAnalysisDraft(current)) {
        return seed;
      }
      return current;
    });
  }, [
    state,
    assessmentConfirmed,
    activeAssessment
  ]);
  const activePhrases = getActivePhrases(c3);
  const generated = useMemo(
    () => projectC33PsoapDocument(state, profile),
    [state, profile]
  );
  const draft = c3.drafts[profile];
  const draftStatus = getC3DraftStatus(c3, profile);
  const documentText = draft?.text ?? generated;
  const selectedProblem = C33_PROBLEM_PROFILES_BY_ID(state.workflow.problemProfile);
  const matchingProblems = useMemo(
    () => findMatchingC33ProblemProfiles(problemQuery),
    [problemQuery]
  );

  function updateC3(next: C33State["c32"]["c3"]) {
    setState((current) => ({
      ...current,
      c32: { ...current.c32, c3: next }
    }));
  }

  function applyFact(action: Parameters<typeof applyC33FactAction>[1]) {
    setState((current) => applyC33FactAction(current, action));
  }

  function chooseProblem(problem: C33ProblemProfile) {
    setState((current) => configureC33Problem(current, problem.id));
    setProblemQuery(problem.label);
    setInstrumentation((current) => ({
      ...current,
      startedAt: current.startedAt ?? Date.now()
    }));
    requestAnimationFrame(() => {
      firstClinicalControl.current?.querySelector<HTMLElement>("button")?.focus();
    });
  }

  function toggleNegativeSymptoms() {
    setState((current) => {
      const transition = toggleC33NegativeSymptomBatch(current);
      if (transition.outcome === "blocked") {
        setFeedback("Fjern et positivt symptom før samlet negativ registrering.");
      } else {
        setFeedback("");
      }
      setInstrumentation((metrics) => ({
        ...metrics,
        batchSelections: metrics.batchSelections + (
          transition.outcome === "blocked" ? 0 : 1
        ),
        blockedBatches: metrics.blockedBatches + (
          transition.outcome === "blocked" ? 1 : 0
        )
      }));
      return transition.state;
    });
  }

  function toggleAccompanyingSymptomsNone() {
    setState((current) => {
      const transition = toggleC33AccompanyingSymptomsNone(current);
      setFeedback(
        transition.outcome === "blocked"
          ? "Fjern et positivt ledsagesymptom før samlet negativ registrering."
          : ""
      );
      return transition.state;
    });
  }

  function toggleTestsNormal() {
    setState((current) => {
      const transition = toggleC33TestsNormalBatch(current);
      setFeedback(
        transition.outcome === "blocked"
          ? "Fjern en positiv testværdi før samlet negativ registrering."
          : ""
      );
      return transition.state;
    });
  }

  function toggleRedFlagGroup(group: C33RedFlagGroupId) {
    setState((current) => setC33RedFlagGroup(
      current,
      group,
      current.redFlagGroups[group] === "yes" ? undefined : "yes"
    ));
  }

  function toggleRedFlagsNormal() {
    setState((current) => {
      const transition = toggleC33RedFlagsNormal(current);
      if (transition.outcome === "blocked") {
        setFeedback("Fjern positive red flags før samlet negativ registrering.");
      } else {
        setFeedback("");
      }
      setInstrumentation((metrics) => ({
        ...metrics,
        batchSelections: metrics.batchSelections + (
          transition.outcome === "blocked" ? 0 : 1
        ),
        blockedBatches: metrics.blockedBatches + (
          transition.outcome === "blocked" ? 1 : 0
        )
      }));
      return transition.state;
    });
  }

  function toggleNormalRom() {
    setState((current) => {
      const objective = current.c32.c3.factRoot.objective;
      const active = latestActiveBatch(
        current.c32,
        "C32-BATCH-ROM-NORMAL-001"
      );
      const isNormal = objective.extensionDegrees === 0
        && objective.flexionDegrees === 140;
      if (
        !isNormal
        && (
          objective.extensionDegrees !== undefined
          || objective.flexionDegrees !== undefined
        )
      ) {
        setFeedback("Fjern eller redigér eksisterende ROM-værdier først.");
        setInstrumentation((metrics) => ({
          ...metrics,
          blockedBatches: metrics.blockedBatches + 1
        }));
        return current;
      }
      const nextC32 = active && isNormal
        ? undoC32Batch(current.c32, active.transactionId)
        : commitC32Batch(current.c32, "C32-BATCH-ROM-NORMAL-001");
      setFeedback("");
      setInstrumentation((metrics) => ({
        ...metrics,
        batchSelections: metrics.batchSelections + 1
      }));
      return { ...current, c32: nextC32 };
    });
  }

  function togglePhrase(phraseId: string) {
    setState((current) => {
      const active = getActivePhrases(current.c32.c3).find(
        (entry) => entry.phraseId === phraseId
      );
      const phrase = C33_PHRASES.find((entry) => entry.id === phraseId);
      if (!phrase) return current;
      const side = currentSide(current);
      if (phrase.sideDependent && !side) return current;
      const resolved = phrase.sideDependent
        ? { ...phrase, text: resolveC33PhraseText(phrase, side) }
        : phrase;
      const transition = active
        ? removeC3Phrase(current.c32.c3, active.entryId)
        : selectC3PhraseDefinition(current.c32.c3, resolved);
      return {
        ...current,
        c32: { ...current.c32, c3: transition.state }
      };
    });
  }

  function commitAssessment() {
    const text = assessmentDraft.trimEnd();
    if (!text || isC33UnfinishedAnalysisDraft(text)) {
      // Unfinished clinician draft must never become an A: fact.
      return;
    }
    setAssessmentConfirmed(true);
    setState((current) => {
      const currentAssessment = getActiveAssessments(current.c32.c3)[0];
      const transition = currentAssessment
        ? reviseC3Assessment(
          current.c32.c3,
          currentAssessment.entryId,
          "primary",
          text.trim()
        )
        : createC3Assessment(current.c32.c3, "primary", text.trim());
      return {
        ...current,
        c32: { ...current.c32, c3: transition.state }
      };
    });
  }

  function ensureManualDraft() {
    setState((current) => {
      const currentProfile = current.c32.c3.outputProfile;
      if (current.c32.c3.drafts[currentProfile]) return current;
      const baseText = projectC33PsoapDocument(current, currentProfile);
      return {
        ...current,
        c32: {
          ...current.c32,
          c3: setC3ManualDraft(
            current.c32.c3,
            currentProfile,
            baseText,
            baseText
          )
        }
      };
    });
  }

  function updateDocumentLine(index: number, text: string) {
    setState((current) => {
      const currentProfile = current.c32.c3.outputProfile;
      const baseText = projectC33PsoapDocument(current, currentProfile);
      const currentText = current.c32.c3.drafts[currentProfile]?.text ?? baseText;
      const markers = ["P:", "S:", "O:", "A:", "P:"];
      const lines = currentText.split("\n");
      lines[index] = `${markers[index]} ${text}`.trimEnd();
      return {
        ...current,
        c32: {
          ...current.c32,
          c3: setC3ManualDraft(
            current.c32.c3,
            currentProfile,
            baseText,
            lines.join("\n")
          )
        }
      };
    });
  }

  async function copyDocument() {
    if (!isC33CopyReadyPsoap(documentText)) {
      setFeedback("Bevar de fem P/S/O/A/P-linjer før kopiering.");
      return;
    }
    try {
      await navigator.clipboard.writeText(documentText);
    } catch {
      setFeedback("Kunne ikke kopiere — markér teksten manuelt.");
      return;
    }
    setFeedback("✓ Kopieret");
    setCopySucceeded(true);
    if (copyResetTimer.current !== null) {
      window.clearTimeout(copyResetTimer.current);
    }
    copyResetTimer.current = window.setTimeout(() => {
      setCopySucceeded(false);
      copyResetTimer.current = null;
    }, 1500);
    setInstrumentation((current) => ({
      ...current,
      copies: current.copies + 1,
      copiedAt: Date.now()
    }));
  }

  const elapsedSeconds = instrumentation.startedAt
    ? Math.round(
      ((instrumentation.copiedAt ?? Date.now()) - instrumentation.startedAt)
      / 1000
    )
    : 0;
  const normalRom = c3.factRoot.objective.extensionDegrees === 0
    && c3.factRoot.objective.flexionDegrees === 140;
  const psoapRows = parsePsoap(documentText);
  const side = currentSide(state);
  const trauma = c3.factRoot.history.trauma;
  const swelling = c3.factRoot.history.swelling;
  const analysisSeed = buildC33AnalysisDraft(state);
  const backgroundCount = [
    state.background.priorKneeIssue,
    state.background.priorKneeNote,
    state.background.jointDisease,
    state.background.comorbidityChips.length > 0,
    state.background.comorbidityNote,
    state.background.medicationChips.length > 0,
    state.background.medicationNote
  ].filter(Boolean).length;

  return (
    <main
      className={styles.page}
      onClickCapture={() => setInstrumentation((current) => ({
        ...current,
        clicks: current.clicks + 1
      }))}
    >
      <header className={styles.hero}>
        <div>
          <p>C3.3 · Calm Fast Flow</p>
          <h1>Knækonsultation</h1>
        </div>
        <div className={styles.heroMeta}>
          <span>Mål ≤ 90 sek.</span>
          <a href="/prototype/c3-2-psoap-fast-flow">C3.2 comparator</a>
        </div>
      </header>

      <details className={styles.keyboardHelp}>
        <summary>Tastaturhjælp</summary>
        <ul>
          <li>Tab / Shift+Tab flytter til næste / forrige kliniske kategori (ét fokuspunkt pr. kategori).</li>
          <li>Pil ned/op flytter mellem kategorier (aldrig i input, søgning eller textarea).</li>
          <li>Pil venstre/højre: enkeltvalg vælger naboværdi; ved første/sidste krydses kategori. Multi-select flytter kun fokus.</li>
          <li>Enter/Space: enkeltvalg committer og går videre; multi-select toggler og bliver i gruppen.</li>
          <li>N vælger den normale/negative genvej i den aktive kategori (ikke Side/Plan; aldrig i redigerbare felter).</li>
        </ul>
      </details>

      <div className={styles.workspace} ref={workspaceRef}>
        <ClinicalSection marker="P" title="Problem">
          <div className={styles.problemSearch}>
            <label {...keyboardGroupProps("problem")}>
              <span>Hvad handler konsultationen om?</span>
              <input
                type="search"
                aria-label="Søg klinisk problem"
                value={problemQuery}
                placeholder="Søg fx traumebaserede knæsmerter"
                onChange={(event) => setProblemQuery(event.target.value)}
                onFocus={(event) => event.currentTarget.select()}
              />
            </label>
            {!selectedProblem && problemQuery.trim().length > 0 && (
              <div className={styles.problemSuggestions} role="listbox" aria-label="Problemforslag">
                {matchingProblems.map((problem) => (
                  <button
                    key={problem.id}
                    type="button"
                    role="option"
                    onClick={() => chooseProblem(problem)}
                  >
                    {problem.label}
                    <span>Vælger kun arbejdsgang</span>
                  </button>
                ))}
                {!matchingProblems.length && (
                  <p>Ingen match. Søg på knæ, traume eller overbelastning.</p>
                )}
              </div>
            )}
            {selectedProblem && (
              <div className={styles.selectedProblem}>
                <span>{selectedProblem.label}</span>
                <button
                  type="button"
                  onClick={() => {
                    setProblemQuery("");
                    setState((current) => ({
                      ...current,
                      workflow: { ...current.workflow, problemProfile: undefined }
                    }));
                  }}
                >
                  Skift
                </button>
              </div>
            )}
          </div>
        </ClinicalSection>

        {selectedProblem && (
          <>
            <div ref={firstClinicalControl}>
              <ClinicalSection marker="S" title="Subjektivt">
                <div className={styles.compactGrid}>
                  <fieldset className={styles.choice} {...keyboardGroupProps("side")}>
                    <legend>Side</legend>
                    <div role="radiogroup" aria-label="Side" data-roving-group="true">
                      {(
                        [
                          ["right", "Højre"],
                          ["left", "Venstre"],
                          ["bilateral", "Bilateral"]
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={
                            value === "bilateral"
                              ? Boolean(state.workflow.bilateralPain)
                              : c3.factRoot.history.side === value
                          }
                          onClick={() => setState((current) => setC33Side(current, value))}
                          onKeyDown={handleExclusiveKey}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <SelectField
                    label="Lokalisation"
                    keyboardGroup="localisation"
                    value={c3.factRoot.history.painLocation}
                    options={[
                      { value: "medial", label: "Medial" },
                      { value: "lateral", label: "Lateral" },
                      { value: "anterior", label: "Anterior" },
                      { value: "posterior", label: "Posterior" },
                      { value: "diffuse", label: "Diffus" }
                    ]}
                    onChange={(value) => applyFact({
                      type: "set-history",
                      key: "painLocation",
                      value
                    })}
                  />
                  <Choice
                    label="Debut"
                    keyboardGroup="onset"
                    value={c3.factRoot.history.onset}
                    options={[
                      { value: "acute", label: "Akut" },
                      { value: "insidious", label: "Snigende" },
                      { value: "gradual", label: "Gradvis" }
                    ]}
                    onChange={(value) => applyFact({
                      type: "set-history",
                      key: "onset",
                      value
                    })}
                  />
                  <TextField
                    label="Varighed"
                    keyboardGroup="duration"
                    value={c3.factRoot.history.duration}
                    placeholder="Fx siden i går"
                    onCommit={(value) => applyFact({
                      type: "set-history",
                      key: "duration",
                      value
                    })}
                    onKeyboardCommit={() => setInstrumentation((current) => ({
                      ...current,
                      keyboardCommits: current.keyboardCommits + 1
                    }))}
                  />
                  <Choice
                    label="Smertemønster"
                    keyboardGroup="pain-course"
                    value={c3.factRoot.history.painCourse}
                    options={[
                      { value: "constant", label: "Konstant" },
                      { value: "intermittent", label: "Intermitterende" },
                      { value: "increasing", label: "Tiltagende" },
                      { value: "decreasing", label: "Aftagende" }
                    ]}
                    onChange={(value) => applyFact({
                      type: "set-history",
                      key: "painCourse",
                      value
                    })}
                  />
                </div>

                <div className={styles.clinicalRow}>
                  <Choice
                    label="Traume"
                    keyboardGroup="trauma"
                    normalValue="no"
                    value={trauma}
                    options={[
                      { value: "yes", label: "Ja" },
                      { value: "no", label: "Nej" }
                    ]}
                    onChange={(value) => applyFact({
                      type: "set-history",
                      key: "trauma",
                      value
                    })}
                  />
                  {trauma === "yes" && (
                    <div className={styles.conditionalGroup}>
                      <strong>Traumeoplysninger</strong>
                      <div
                        className={styles.traumaMechanisms}
                        role="radiogroup"
                        aria-label="Traumemekanisme"
                        data-roving-group="true"
                        {...keyboardGroupProps("trauma-mechanism")}
                      >
                        {C33_TRAUMA_MECHANISM_DETAILS.map((detail) => (
                          <button
                            key={detail.id}
                            type="button"
                            role="radio"
                            aria-checked={state.workflow.traumaMechanismDetail === detail.id}
                            onClick={() => setState((current) => setC33TraumaMechanismDetail(current, detail.id))}
                            onKeyDown={handleExclusiveKey}
                          >
                            {detail.label}
                          </button>
                        ))}
                      </div>
                      <div className={styles.traumaExtras} {...keyboardGroupProps("trauma-snap")}>
                        <button
                          type="button"
                          aria-pressed={Boolean(state.workflow.traumaSnap)}
                          onClick={() => setState((current) => setC33TraumaSnap(
                            current,
                            !current.workflow.traumaSnap
                          ))}
                          onKeyDown={handleExclusiveKey}
                        >
                          Mærket smæld
                        </button>
                      </div>
                      <div
                        className={styles.traumaExtras}
                        role="radiogroup"
                        aria-label="Vægtbærende skridt"
                        data-roving-group="true"
                        {...keyboardGroupProps("trauma-weight-bearing")}
                      >
                        {(
                          [
                            ["gte-4-steps", "≥4 skridt"],
                            ["lt-4-steps", "<4 skridt"]
                          ] as const satisfies readonly (readonly [C33WeightBearingCapacity, string])[]
                        ).map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={state.workflow.weightBearingCapacity === value}
                            onClick={() => setState((current) => setC33WeightBearingCapacity(current, value))}
                            onKeyDown={handleExclusiveKey}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <TextField
                        label="Supplerende"
                        keyboardGroup="trauma-supplementary"
                        value={c3.factRoot.history.traumaContext}
                        placeholder="Fx under fodbold"
                        onCommit={(value) => applyFact({
                          type: "set-history",
                          key: "traumaContext",
                          value
                        })}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.clinicalRow}>
                  <fieldset className={styles.choice} {...keyboardGroupProps("provocation")}>
                    <legend>Provokation</legend>
                    <div role="group" aria-label="Provokation" data-roving-group="true">
                      {C33_PROVOCATION_GROUPS.map((group) => {
                        const active = group.values.every((value: PainProvocation) =>
                          c3.factRoot.history.provocations.includes(value)
                        );
                        return (
                          <button
                            key={group.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setState((current) => toggleC33ProvocationGroup(current, group.id))}
                            onKeyDown={handleMultiKey}
                          >
                            {group.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <Choice
                    label="Funktion"
                    keyboardGroup="function"
                    normalValue="unaffected"
                    value={c3.factRoot.history.function}
                    options={[
                      { value: "unaffected", label: "Upåvirket" },
                      { value: "mildly-reduced", label: "Let nedsat" },
                      { value: "significantly-reduced", label: "Betydeligt nedsat" },
                      { value: "unable-to-bear-weight", label: "Kan ikke støtte" }
                    ]}
                    onChange={(value) => applyFact({
                      type: "set-history",
                      key: "function",
                      value
                    })}
                  />
                </div>

                <div className={styles.batchRow} {...keyboardGroupProps("accompanying")}>
                  <div>
                    <strong>Ledsagesymptomer</strong>
                    <span>Krepitation, morgenstivhed, snapping, andre led, udslæt, nylig infektion.</span>
                  </div>
                  <div className={styles.positiveChoices} role="group" aria-label="Ledsagesymptomer" data-roving-group="true">
                    <button
                      type="button"
                      data-c33-normal-action="true"
                      aria-pressed={hasC33AccompanyingSymptomsNone(state)}
                      onClick={toggleAccompanyingSymptomsNone}
                      onKeyDown={handleMultiKey}
                    >
                      Ingen ledsagesymptomer
                    </button>
                    {C33_ACCOMPANYING_SYMPTOMS.map((symptom) => (
                      <button
                        key={symptom.id}
                        type="button"
                        aria-pressed={state.workflow.accompanyingSymptoms.includes(symptom.id)}
                        onClick={() => setState((current) =>
                          toggleC33AccompanyingSymptom(current, symptom.id as C33AccompanyingSymptomId)
                        )}
                        onKeyDown={handleMultiKey}
                      >
                        {symptom.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.clinicalRow}>
                  <Choice
                    label="Hævelse"
                    keyboardGroup="swelling"
                    normalValue="none"
                    value={swelling}
                    options={[
                      { value: "none", label: "Ingen" },
                      { value: "mild", label: "Let" },
                      { value: "persistent", label: "Vedvarende" },
                      { value: "marked", label: "Udtalt" }
                    ]}
                    onChange={(value) => applyFact({
                      type: "set-history",
                      key: "swelling",
                      value
                    })}
                  />
                  {swelling && swelling !== "none" && (
                    <Choice
                      label="Hævelsen opstod"
                      keyboardGroup="swelling-onset"
                      value={
                        c3.factRoot.history.swellingTiming === "opstået straks"
                          ? "immediate"
                          : c3.factRoot.history.swellingTiming === "opstået senere"
                            ? "later"
                            : undefined
                      }
                      options={[
                        { value: "immediate", label: "Straks" },
                        { value: "later", label: "Senere" }
                      ]}
                      onChange={(value) => applyFact({
                        type: "set-history",
                        key: "swellingTiming",
                        value: value === "immediate"
                          ? "opstået straks"
                          : value === "later"
                            ? "opstået senere"
                            : undefined
                      })}
                    />
                  )}
                </div>

                <details className={styles.background}>
                  <summary {...keyboardGroupProps("background-trigger")} onKeyDown={handleCategoryArrowKey}>
                    Baggrund · valgfrit
                    {backgroundCount > 0 && (
                      <span className={styles.backgroundCount}>{backgroundCount}</span>
                    )}
                  </summary>
                  <div className={styles.backgroundGrid}>
                    <div
                      className={styles.backgroundChipGroup}
                      {...keyboardGroupProps("background-history")}
                    >
                      <span>
                        Tidligere relevant knæskade/operation/injektion
                      </span>
                      <div role="group" aria-label="Tidligere knæskade" data-roving-group="true">
                        <button
                          type="button"
                          className={styles.wideBatch}
                          aria-pressed={Boolean(state.background.priorKneeIssue)}
                          onClick={() => setState((current) =>
                            setC33Background(current, "priorKneeIssue", !current.background.priorKneeIssue)
                          )}
                          onKeyDown={handleMultiKey}
                        >
                          Ja
                        </button>
                      </div>
                      {state.background.priorKneeIssue && (
                        <TextField
                          label="Supplerende"
                          ariaLabel="Supplerende til tidligere knæskade"
                          value={state.background.priorKneeNote}
                          onCommit={(value) => setState((current) =>
                            setC33Background(current, "priorKneeNote", value)
                          )}
                        />
                      )}
                    </div>
                    <div className={styles.backgroundChipGroup} {...keyboardGroupProps("background-comorbidity")}>
                      <span>
                        Komorbiditet
                        <small>Relevant for red flags: infektion/malignitet</small>
                      </span>
                      <div role="group" aria-label="Komorbiditet" data-roving-group="true">
                        <button
                          type="button"
                          aria-pressed={Boolean(state.background.jointDisease)}
                          onClick={() => setState((current) =>
                            setC33Background(current, "jointDisease", !current.background.jointDisease)
                          )}
                          onKeyDown={handleMultiKey}
                        >
                          Kendt ledsygdom
                        </button>
                        {C33_COMORBIDITY_CHIPS.map((chip) => (
                          <button
                            key={chip.id}
                            type="button"
                            aria-pressed={state.background.comorbidityChips.includes(chip.id)}
                            onClick={() => setState((current) =>
                              toggleC33ComorbidityChip(current, chip.id as C33ComorbidityChip)
                            )}
                            onKeyDown={handleMultiKey}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                      <TextField
                        label="Supplerende"
                        ariaLabel="Supplerende komorbiditet"
                        value={state.background.comorbidityNote}
                        onCommit={(value) => setState((current) => setC33Background(current, "comorbidityNote", value))}
                      />
                    </div>
                    <div className={styles.backgroundChipGroup} {...keyboardGroupProps("background-medication")}>
                      <span>
                        Medicin
                        <small>Relevant for red flag: hurtig hævelse/infektion</small>
                      </span>
                      <div role="group" aria-label="Medicin" data-roving-group="true">
                        {C33_MEDICATION_CHIPS.map((chip) => (
                          <button
                            key={chip.id}
                            type="button"
                            aria-pressed={state.background.medicationChips.includes(chip.id)}
                            onClick={() => setState((current) =>
                              toggleC33MedicationChip(current, chip.id as C33MedicationChip)
                            )}
                            onKeyDown={handleMultiKey}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                      <TextField
                        label="Supplerende"
                        ariaLabel="Supplerende medicin"
                        value={state.background.medicationNote}
                        onCommit={(value) => setState((current) => setC33Background(current, "medicationNote", value))}
                      />
                    </div>
                  </div>
                </details>

                <div className={styles.batchRow} {...keyboardGroupProps("mechanical")}>
                  <div>
                    <strong>Mekaniske symptomer</strong>
                    <span>Ét klik registrerer aflåsning og instabilitet som negative.</span>
                  </div>
                  <div className={styles.positiveChoices} role="group" aria-label="Mekaniske symptomer" data-roving-group="true">
                    <button
                      type="button"
                      data-c33-normal-action="true"
                      data-c33-advance-on-normal="true"
                      aria-pressed={hasC33NegativeSymptomBatch(state)}
                      onClick={toggleNegativeSymptoms}
                      onKeyDown={handleConfirmAndAdvanceKey}
                    >
                      Ingen aflåsning eller instabilitetsfornemmelse
                    </button>
                    {([
                      ["locking", "Aflåsning"],
                      ["instability", "Instabilitet"]
                    ] as const).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={c3.factRoot.history[key] === "yes"}
                        onClick={() => applyFact({
                          type: "set-history",
                          key,
                          value: c3.factRoot.history[key] === "yes"
                            ? undefined
                            : "yes"
                        })}
                        onKeyDown={handleMultiKey}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.batchRow} {...keyboardGroupProps("red-flags")}>
                  <div>
                    <strong>Red flags</strong>
                    <span>Fem konsekvensgrupper. Kun valgte eller eksplicit afkræftede grupper skrives.</span>
                  </div>
                  <div className={styles.positiveChoices} role="group" aria-label="Red flags" data-roving-group="true">
                    <button
                      type="button"
                      data-c33-normal-action="true"
                      aria-pressed={hasC33RedFlagsNormal(state)}
                      onClick={toggleRedFlagsNormal}
                      onKeyDown={handleMultiKey}
                    >
                      Ingen red flags
                    </button>
                    {C33_RED_FLAG_GROUPS.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        aria-pressed={state.redFlagGroups[group.id] === "yes"}
                        onClick={() => toggleRedFlagGroup(group.id)}
                        onKeyDown={handleMultiKey}
                      >
                        {group.label}
                      </button>
                    ))}
                  </div>
                </div>
              </ClinicalSection>
            </div>

            <ClinicalSection marker="O" title="Objektivt">
              <div className={styles.clinicalRow}>
                <Choice
                  label="Gang"
                  keyboardGroup="gait"
                  normalValue="normal"
                  value={c3.factRoot.objective.gait}
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "limp", label: "Haltende" },
                    { value: "unable", label: "Kan ikke støtte" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "gait",
                    value
                  })}
                />
                <fieldset className={styles.choice} {...keyboardGroupProps("inspection")}>
                  <legend>Inspektion</legend>
                  <div role="group" aria-label="Inspektion" data-roving-group="true">
                    <button
                      type="button"
                      data-c33-normal-action="true"
                      aria-pressed={c32.inspection.status === "no-specific-findings"}
                      onClick={() => setState((current) => ({
                        ...current,
                        c32: setC32InspectionStatus(
                          current.c32,
                          current.c32.inspection.status === "no-specific-findings"
                            ? undefined
                            : "no-specific-findings"
                        )
                      }))}
                      onKeyDown={handleMultiKey}
                    >
                      Ingen særlige fund
                    </button>
                    {inspectionFindings.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={c32.inspection.findings.includes(option.value)}
                        onClick={() => setState((current) => ({
                          ...current,
                          c32: toggleC32InspectionFinding(
                            current.c32,
                            option.value as C32InspectionFinding
                          )
                        }))}
                        onKeyDown={handleMultiKey}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <Choice
                  label="Effusion"
                  keyboardGroup="effusion"
                  normalValue="none"
                  value={c3.factRoot.objective.effusion}
                  options={[
                    { value: "none", label: "Ingen" },
                    { value: "mild", label: "Let" },
                    { value: "moderate", label: "Moderat" },
                    { value: "large", label: "Stor" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "effusion",
                    value
                  })}
                />
              </div>

              <div className={styles.objectiveDivider} />

              <fieldset className={styles.choice} {...keyboardGroupProps("palpation")}>
                <legend>Palpationsømhed</legend>
                <div role="group" aria-label="Palpationsømhed" data-roving-group="true">
                  <button
                    type="button"
                    data-c33-normal-action="true"
                    aria-pressed={c3.factRoot.objective.palpationStatus === "no-focal-tenderness"}
                    onClick={() => applyFact({
                      type: "set-objective",
                      key: "palpationStatus",
                      value: c3.factRoot.objective.palpationStatus === "no-focal-tenderness"
                        ? undefined
                        : "no-focal-tenderness"
                    })}
                    onKeyDown={handleMultiKey}
                  >
                    Ingen fokal ømhed
                  </button>
                  {palpations.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={c3.factRoot.objective.palpationFindings.includes(option.value)}
                      onClick={() => applyFact({
                        type: "toggle-palpation",
                        value: option.value as PalpationFinding
                      })}
                      onKeyDown={handleMultiKey}
                    >
                      {option.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-pressed={state.workflow.extraPalpationFindings.includes("fibular-head")}
                    onClick={() => setState((current) =>
                      toggleC33ExtraPalpationFinding(current, "fibular-head" as C33ExtraPalpationFinding)
                    )}
                    onKeyDown={handleMultiKey}
                  >
                    Caput fibulae/knogleømhed
                  </button>
                </div>
              </fieldset>

              <div className={styles.objectiveDivider} />

              <div className={styles.batchRow} {...keyboardGroupProps("rom")}>
                <div>
                  <strong>Bevægelse (ROM)</strong>
                  <span>Normalværdierne står i selve valget.</span>
                </div>
                <div
                  className={styles.positiveChoices}
                  role="group"
                  aria-label="ROM"
                  data-roving-group="true"
                >
                  <button
                    type="button"
                    data-c33-normal-action="true"
                    aria-pressed={normalRom}
                    onClick={toggleNormalRom}
                    onKeyDown={handleMultiKey}
                  >
                    Normal ROM 0–140°
                  </button>
                  <button
                    type="button"
                    aria-pressed={showAbnormalRom}
                    aria-expanded={showAbnormalRom}
                    onClick={() => setShowAbnormalRom((current) => !current)}
                    onKeyDown={handleMultiKey}
                  >
                    Abnorm ROM/specificer
                  </button>
                  <button
                    type="button"
                    aria-pressed={state.workflow.movementFindings.includes("mechanical-block")}
                    onClick={() => setState((current) =>
                      toggleC33MovementFinding(current, "mechanical-block" as C33MovementFinding)
                    )}
                    onKeyDown={handleMultiKey}
                  >
                    Mekanisk blokering/strækkedeficit
                  </button>
                </div>
                {showAbnormalRom && (
                  <div className={styles.romFields}>
                    <NumberField
                      label="Aktiv ekstension °"
                      value={state.workflow.activeExtensionDegrees}
                      onCommit={(value) => setState((current) =>
                        setC33ActiveRomDegrees(current, "activeExtensionDegrees", value)
                      )}
                    />
                    <NumberField
                      label="Aktiv fleksion °"
                      value={state.workflow.activeFlexionDegrees}
                      onCommit={(value) => setState((current) =>
                        setC33ActiveRomDegrees(current, "activeFlexionDegrees", value)
                      )}
                    />
                    <NumberField
                      label="Passiv ekstension °"
                      value={c3.factRoot.objective.extensionDegrees}
                      onCommit={(value) => applyFact({
                        type: "set-objective",
                        key: "extensionDegrees",
                        value
                      })}
                    />
                    <NumberField
                      label="Passiv fleksion °"
                      value={c3.factRoot.objective.flexionDegrees}
                      onCommit={(value) => applyFact({
                        type: "set-objective",
                        key: "flexionDegrees",
                        value
                      })}
                    />
                  </div>
                )}
              </div>

              <div className={styles.objectiveDivider} />

              <h3 className={styles.testsHeading}>Tests</h3>
              <div data-c33-tests-scope="true">
              <div className={styles.testGrid}>
                <Choice
                  label="Lachman"
                  keyboardGroup="test-lachman"
                  value={c3.factRoot.objective.lachman}
                  options={[
                    { value: "negative", label: "Negativ" },
                    { value: "positive", label: "Positiv" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "lachman",
                    value
                  })}
                />
                <Choice
                  label="Valgusstres"
                  keyboardGroup="test-valgus"
                  value={c3.factRoot.objective.valgus}
                  options={[
                    { value: "stable", label: "Stabil" },
                    { value: "lax", label: "Laks" },
                    { value: "painful-no-laxity", label: "Smerte uden laksitet" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "valgus",
                    value
                  })}
                />
                <Choice
                  label="Varusstres"
                  keyboardGroup="test-varus"
                  value={c3.factRoot.objective.varus}
                  options={[
                    { value: "stable", label: "Stabil" },
                    { value: "lax", label: "Laks" },
                    { value: "painful-no-laxity", label: "Smerte uden laksitet" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "varus",
                    value
                  })}
                />
                <Choice
                  label="Menisktest"
                  keyboardGroup="test-meniscal"
                  value={c3.factRoot.objective.meniscalTest}
                  options={[
                    { value: "negative", label: "Negativ" },
                    { value: "positive", label: "Positiv" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "meniscalTest",
                    value
                  })}
                />
                <Choice
                  label="Patellatest"
                  keyboardGroup="test-patella"
                  value={c3.factRoot.objective.patella}
                  options={[
                    { value: "negative", label: "Negativ" },
                    { value: "positive", label: "Positiv" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "patella",
                    value
                  })}
                />
                <Choice
                  label="Neurovaskulær status"
                  keyboardGroup="test-neurovascular"
                  value={c3.factRoot.objective.neurovascular}
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "abnormal", label: "Afvigende" }
                  ]}
                  onChange={(value) => applyFact({
                    type: "set-objective",
                    key: "neurovascular",
                    value
                  })}
                />
              </div>
              <div className={styles.batchRow} {...keyboardGroupProps("tests-normal")}>
                <div>
                  <strong>Knæ-test normale</strong>
                  <span>Udfylder kun stadig blanke test som negative/stabile.</span>
                </div>
                <div className={styles.positiveChoices} role="group" aria-label="Knæ-test normale" data-roving-group="true">
                  <button
                    type="button"
                    data-c33-normal-action="true"
                    aria-pressed={hasC33TestsNormalBatch(state)}
                    onClick={toggleTestsNormal}
                    onKeyDown={handleMultiKey}
                  >
                    Knæ-test normale
                  </button>
                </div>
              </div>
              </div>
            </ClinicalSection>

            <ClinicalSection marker="A" title="Analyse">
              <label className={styles.assessment} {...keyboardGroupProps("analysis")}>
                <span>Klinikerens analyse</span>
                {analysisSeed && isC33UnfinishedAnalysisDraft(assessmentDraft) && (
                  <em className={styles.analysisDraftHint}>Klinikerejet udkast — afslut vurderingen før det indgår i A:</em>
                )}
                <textarea
                  value={assessmentDraft}
                  placeholder="Skriv din analyse. Cortex udfylder den ikke."
                  onChange={(event) => {
                    setAssessmentDraft(event.target.value);
                    if (!isC33UnfinishedAnalysisDraft(event.target.value)) {
                      setAssessmentConfirmed(true);
                    }
                  }}
                  onBlur={commitAssessment}
                  onKeyDown={(event) => {
                    const textarea = event.currentTarget;
                    if (
                      event.key === "Enter"
                      && (event.metaKey || event.ctrlKey)
                    ) {
                      event.preventDefault();
                      commitAssessment();
                      setInstrumentation((current) => ({
                        ...current,
                        keyboardCommits: current.keyboardCommits + 1
                      }));
                      scheduleFocusAdjacentKeyboardGroup(textarea, 1);
                    }
                    // ArrowUp/Down never leave Analyse — caret stays native.
                  }}
                />
                <small>
                  Gemmes ved fokus-skift · ⌘/Ctrl + Enter fortsætter
                  {activeAssessment ? " · registreret" : ""}
                </small>
              </label>
            </ClinicalSection>

            <ClinicalSection marker="P" title="Plan">
              <div className={styles.planGroups}>
                {planGroups.map((group) => {
                  const groupPhrases = C33_PHRASES.filter((phrase) => phrase.group === group.id);
                  if (!groupPhrases.length) return null;
                  return (
                    <fieldset key={group.id} {...keyboardGroupProps(group.keyboardGroup)}>
                      <legend>{group.label}</legend>
                      <div role="group" aria-label={group.label} data-roving-group="true">
                        {groupPhrases.map((phrase) => {
                          const disabled = Boolean(phrase.sideDependent) && !side;
                          return (
                            <button
                              key={phrase.id}
                              type="button"
                              disabled={disabled}
                              title={disabled ? "Vælg Side i Subjektivt først" : undefined}
                              aria-pressed={activePhrases.some(
                                (entry) => entry.phraseId === phrase.id
                              )}
                              onClick={() => togglePhrase(phrase.id)}
                              onKeyDown={handleMultiKey}
                            >
                              {resolveC33PhraseText(phrase, side)}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            </ClinicalSection>

            <ClinicalSection marker="→" title="Dokumentation">
              <div className={styles.documentToolbar}>
                <div
                  role="radiogroup"
                  aria-label="Dokumentprofil"
                  data-roving-group="true"
                  {...keyboardGroupProps("document-profile")}
                >
                  {(["quick", "standard"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      role="radio"
                      aria-checked={profile === item}
                      onClick={() => setState((current) => ({
                        ...current,
                        c32: {
                          ...current.c32,
                          c3: setC3Profile(current.c32.c3, item)
                        }
                      }))}
                      onKeyDown={handleExclusiveKey}
                    >
                      {item === "quick" ? "Quick" : "Standard"}
                    </button>
                  ))}
                </div>
                <span {...keyboardGroupProps("copy")}>
                  <button
                    type="button"
                    className={`${styles.copyButton} ${copySucceeded ? styles.copyButtonSuccess : ""}`}
                    data-keyboard-host="true"
                    onClick={copyDocument}
                    onKeyDown={handleCategoryArrowKey}
                  >
                    {copySucceeded ? "✓ Kopieret" : "Kopiér notat"}
                  </button>
                </span>
              </div>

              {draftStatus === "stale" && (
                <div className={styles.stale} role="status">
                  Notatet er redigeret før de seneste kliniske ændringer.
                  <button
                    type="button"
                    onClick={() => updateC3(
                      discardC3ManualDraft(c3, profile)
                    )}
                  >
                    Brug ny genereret tekst
                  </button>
                </div>
              )}

              <div
                className={styles.document}
                aria-label="Rediger PSOAP-dokument"
                onFocusCapture={ensureManualDraft}
              >
                {psoapRows.map((row, index) => (
                  <label key={`${row.marker}-${index}`}>
                    <span>{row.marker}</span>
                    <textarea
                      aria-label={`Rediger ${row.marker}${index + 1}`}
                      value={row.text}
                      rows={Math.max(
                        1,
                        Math.min(5, Math.ceil(row.text.length / 105))
                      )}
                      onChange={(event) => updateDocumentLine(
                        index,
                        event.target.value.replace(/\n/g, " ")
                      )}
                    />
                  </label>
                ))}
              </div>

              <div className={styles.copyStatus}>
                <span role="status">{feedback}</span>
                {instrumentation.copiedAt && (
                  <strong>{elapsedSeconds} sek. fra start til kopiering</strong>
                )}
              </div>
            </ClinicalSection>
          </>
        )}
      </div>

      {c3.recovery && (
        <div className={styles.recovery} role="alert">
          <div>
            <strong>Tidligere skjulte oplysninger er bevaret.</strong>
            <span>De er ikke aktive kliniske facts.</span>
          </div>
          <button
            type="button"
            onClick={() => updateC3(restoreC3Recovery(c3))}
          >
            Gendan
          </button>
          <button
            type="button"
            onClick={() => updateC3(discardC3Recovery(c3))}
          >
            Kassér
          </button>
        </div>
      )}

      <details className={styles.evaluation}>
        <summary>Evalueringsspor</summary>
        <pre data-testid="c33-instrumentation">
          {JSON.stringify({
            ...instrumentation,
            elapsedSeconds,
            scenario: C33_SCENARIO_VERSION,
            sourceRevision: c3.sourceRevision
          }, null, 2)}
        </pre>
      </details>
    </main>
  );
}

function currentSide(state: C33State): "right" | "left" | "bilateral" | undefined {
  if (state.workflow.bilateralPain) return "bilateral";
  return state.c32.c3.factRoot.history.side;
}

function C33_PROBLEM_PROFILES_BY_ID(id: C33State["workflow"]["problemProfile"]) {
  return C33_PROBLEM_PROFILES.find((problem) => problem.id === id);
}
