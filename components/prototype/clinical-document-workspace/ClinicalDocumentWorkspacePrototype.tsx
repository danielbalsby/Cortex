"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clipboard,
  FileText,
  Image,
  RotateCcw,
  Stethoscope
} from "lucide-react";

import {
  NORMAL_BASIC_FINDINGS,
  PROTOTYPE_SCENARIOS,
  clearNormalBasicFindings,
  confirmNormalBasicFindings,
  createEmptyPrototypeState,
  generatePrototypeNote,
  getNormalFindingStatus,
  getPrototypeAttentionPoints,
  getPrototypeHeading,
  getPrototypeSuggestions,
  selectPrototypeScenario,
  setPrototypeFact,
  setPrototypeMode,
  togglePrototypeListFact,
  type ClinicalDocumentPrototypeState,
  type PrototypeFacts,
  type PrototypeMode,
  type PrototypeScenarioId
} from "@/clinical/prototypes/clinical-document-workspace";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

interface Choice {
  value: string;
  label: string;
}

export function ClinicalDocumentWorkspacePrototype() {
  const [state, setState] = useState(createEmptyPrototypeState);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);
  const [copied, setCopied] = useState(false);

  const note = useMemo(() => generatePrototypeNote(state), [state]);
  const suggestions = useMemo(() => getPrototypeSuggestions(state), [state]);
  const attentionPoints = useMemo(() => getPrototypeAttentionPoints(state), [state]);

  function updateFact<K extends keyof PrototypeFacts>(
    key: K,
    value: PrototypeFacts[K] | undefined
  ) {
    setState((current) => setPrototypeFact(current, key, value));
  }

  function selectScenario(scenarioId: PrototypeScenarioId) {
    setState(selectPrototypeScenario(scenarioId));
    setShowMoreSuggestions(false);
  }

  function reset() {
    setState(createEmptyPrototypeState());
    setShowMoreSuggestions(false);
  }

  async function copyNote() {
    if (!note) return;
    await navigator.clipboard.writeText(note);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  const standardOnlyCount = [
    state.facts.mechanism,
    state.facts.painLocation,
    state.facts.painPatterns?.length ? state.facts.painPatterns : undefined,
    state.facts.tenderness,
    state.facts.historyNote,
    state.facts.objectiveNote
  ].filter(Boolean).length;

  return (
    <main className={styles.shell}>
      <div className={styles.reviewBanner} role="status">
        Temporary synthetic-data prototype — not for clinical use
      </div>
      <header className={styles.topbar}>
        <div className={styles.brandBlock}>
          <div className={styles.brandMark}>C</div>
          <div>
            <span className={styles.prototypeLabel}>ISOLERET PRODUKTPROTOTYPE</span>
            <strong>Cortex Clinical Document Workspace</strong>
          </div>
        </div>
      </header>

      <section className={styles.scenarioBar} aria-label="Demonstrationsscenarier">
        <div className={styles.scenarioIntro}>
          <span>DEMONSTRATION</span>
          <strong>Vælg et scenarie eller start tomt</strong>
          <small>Scenarier bruger den samme lokale model. Ingen patientdata gemmes.</small>
        </div>
        <div className={styles.scenarioChoices}>
          {(Object.entries(PROTOTYPE_SCENARIOS) as [PrototypeScenarioId, (typeof PROTOTYPE_SCENARIOS)[PrototypeScenarioId]][]).map(
            ([id, scenario]) => (
              <button
                key={id}
                className={state.scenarioId === id ? styles.scenarioActive : undefined}
                aria-pressed={state.scenarioId === id}
                onClick={() => selectScenario(id)}
              >
                <strong>{scenario.label}</strong>
                <span>{scenario.description}</span>
              </button>
            )
          )}
        </div>
        <button className={styles.resetButton} onClick={reset}>
          <RotateCcw size={15} /> Nulstil
        </button>
      </section>

      <section className={styles.workspace}>
        <div className={styles.documentPane}>
          <div className={styles.documentHeader}>
            <div>
              <span>KLINISK DOKUMENT</span>
              <h1>{getPrototypeHeading(state)}</h1>
              <p>Strukturerede valg opdaterer notatet direkte uden at blive valgt automatisk.</p>
            </div>
            <ModeSwitch
              mode={state.mode}
              onChange={(mode) => setState((current) => setPrototypeMode(current, mode))}
            />
          </div>

          {state.mode === "quick" && standardOnlyCount > 0 && (
            <p className={styles.preservedNotice}>
              {standardOnlyCount} detaljer er bevaret og kan redigeres i Standard.
            </p>
          )}

          <DocumentSection number="01" title="Anamnese">
            <ChoiceGroup
              label="Side"
              value={state.facts.side}
              choices={[
                { value: "right", label: "Højre" },
                { value: "left", label: "Venstre" },
                { value: "bilateral", label: "Begge" }
              ]}
              onChange={(value) => updateFact("side", value as PrototypeFacts["side"])}
            />
            <ChoiceGroup
              label="Problem"
              value={state.facts.problem}
              choices={[
                { value: "pain", label: "Knæsmerter" },
                { value: "injury", label: "Knæskade" }
              ]}
              onChange={(value) => updateFact("problem", value as PrototypeFacts["problem"])}
            />
            <div className={styles.inlinePair}>
              <ChoiceGroup
                label="Debut"
                value={state.facts.onset}
                choices={[
                  { value: "acute", label: "Akut" },
                  { value: "gradual", label: "Gradvis" }
                ]}
                onChange={(value) => updateFact("onset", value as PrototypeFacts["onset"])}
              />
              <label className={styles.textControl}>
                <span>Varighed</span>
                <input
                  value={state.facts.duration ?? ""}
                  placeholder="Fx siden i går"
                  onChange={(event) => updateFact("duration", event.target.value || undefined)}
                />
              </label>
            </div>
            <ChoiceGroup
              label="Udløsende faktor"
              value={state.facts.precipitatingFactor}
              choices={[
                { value: "trauma", label: "Traume" },
                { value: "none", label: "Ingen identificeret" }
              ]}
              onChange={(value) =>
                updateFact(
                  "precipitatingFactor",
                  value as PrototypeFacts["precipitatingFactor"]
                )
              }
            />

            {state.mode === "standard" && (
              <div className={styles.detailBlock} aria-label="Standarddetaljer i anamnesen">
                {state.facts.precipitatingFactor === "trauma" && (
                  <ChoiceGroup
                    label="Traumemekanisme"
                    value={state.facts.mechanism}
                    choices={[{ value: "twist", label: "Vrid på standben" }]}
                    onChange={(value) =>
                      updateFact("mechanism", value as PrototypeFacts["mechanism"])
                    }
                  />
                )}
                <ChoiceGroup
                  label="Smertelokalisation"
                  value={state.facts.painLocation}
                  choices={[
                    { value: "medial", label: "Medial" },
                    { value: "diffuse", label: "Diffus" }
                  ]}
                  onChange={(value) =>
                    updateFact("painLocation", value as PrototypeFacts["painLocation"])
                  }
                />
                <MultiChoiceGroup
                  label="Mønster"
                  values={state.facts.painPatterns ?? []}
                  choices={[
                    { value: "load-related", label: "Belastningsrelateret" },
                    { value: "stairs", label: "Trapper" },
                    { value: "start-up", label: "Igangsætningsstivhed" }
                  ]}
                  onToggle={(value) =>
                    setState((current) => togglePrototypeListFact(current, "painPatterns", value))
                  }
                />
                <ChoiceGroup
                  label="Funktion"
                  value={state.facts.function}
                  choices={[
                    { value: "normal", label: "Normal" },
                    { value: "limp", label: "Let halten" },
                    { value: "cannot-four-steps", label: "Kan ikke gå fire skridt" }
                  ]}
                  onChange={(value) =>
                    updateFact("function", value as PrototypeFacts["function"])
                  }
                />
                <ChoiceGroup
                  label="Aflåsning"
                  value={state.facts.locking}
                  choices={[
                    { value: "no", label: "Nej" },
                    { value: "yes", label: "Ja" }
                  ]}
                  onChange={(value) =>
                    updateFact("locking", value as PrototypeFacts["locking"])
                  }
                />
                <ChoiceGroup
                  label="Feber"
                  value={state.facts.fever}
                  choices={[
                    { value: "no", label: "Nej" },
                    { value: "yes", label: "Ja" }
                  ]}
                  onChange={(value) => updateFact("fever", value as PrototypeFacts["fever"])}
                />
                <label className={styles.textControl}>
                  <span>Supplerende anamnese</span>
                  <textarea
                    value={state.facts.historyNote ?? ""}
                    placeholder="Kun klinisk nuance, som ikke dækkes af de strukturerede valg"
                    onChange={(event) =>
                      updateFact("historyNote", event.target.value || undefined)
                    }
                  />
                </label>
              </div>
            )}
          </DocumentSection>

          <DocumentSection number="02" title="Objektivt">
            <div className={styles.groupConfirmation}>
              <div className={styles.groupConfirmationHeader}>
                <div>
                  <span>EKSPLICIT GRUPPERET HANDLING</span>
                  <h3>Bekræft normale basisfund</h3>
                  <p>Følgende fund registreres først, når handlingen aktiveres.</p>
                </div>
                <button
                  className={state.normalGroupConfirmed ? styles.confirmedButton : styles.confirmButton}
                  aria-pressed={state.normalGroupConfirmed}
                  onClick={() =>
                    setState((current) =>
                      current.normalGroupConfirmed
                        ? clearNormalBasicFindings(current)
                        : confirmNormalBasicFindings(current)
                    )
                  }
                >
                  {state.normalGroupConfirmed ? <Check size={16} /> : <CheckCircle2 size={16} />}
                  {state.normalGroupConfirmed ? "Fortryd bekræftelse" : "Bekræft fund"}
                </button>
              </div>
              <ul className={styles.findingList} aria-label="Fund i normale basisfund">
                {NORMAL_BASIC_FINDINGS.map((finding) => {
                  const status = getNormalFindingStatus(state, finding);
                  return (
                    <li key={finding.key} data-status={status}>
                      <span>{finding.label}</span>
                      <small>
                        {status === "confirmed"
                          ? "Bekræftet"
                          : status === "overridden"
                            ? "Overstyret af positivt fund"
                            : "Ikke registreret"}
                      </small>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.exceptionGrid}>
              <ChoiceGroup
                label="Gang"
                value={state.facts.gait}
                choices={[
                  { value: "normal", label: "Normal" },
                  { value: "limp", label: "Haltende" }
                ]}
                onChange={(value) => updateFact("gait", value as PrototypeFacts["gait"])}
              />
              <ChoiceGroup
                label="Rødme"
                value={state.facts.redness}
                choices={[
                  { value: "none", label: "Ingen" },
                  { value: "present", label: "Ja" }
                ]}
                onChange={(value) =>
                  updateFact("redness", value as PrototypeFacts["redness"])
                }
              />
              <ChoiceGroup
                label="Varme"
                value={state.facts.warmth}
                choices={[
                  { value: "none", label: "Ingen" },
                  { value: "present", label: "Ja" }
                ]}
                onChange={(value) => updateFact("warmth", value as PrototypeFacts["warmth"])}
              />
              <ChoiceGroup
                label="Effusion"
                value={state.facts.effusion}
                choices={[
                  { value: "none-significant", label: "Ingen betydende" },
                  { value: "mild", label: "Let" },
                  { value: "moderate", label: "Moderat" }
                ]}
                onChange={(value) =>
                  updateFact("effusion", value as PrototypeFacts["effusion"])
                }
              />
              <ChoiceGroup
                label="Ekstension"
                value={state.facts.extension}
                choices={[
                  { value: "full", label: "Fuld" },
                  { value: "reduced", label: "Nedsat" }
                ]}
                onChange={(value) =>
                  updateFact("extension", value as PrototypeFacts["extension"])
                }
              />
            </div>
            {state.mode === "standard" && (
              <label className={styles.textControl}>
                <span>Supplerende objektive fund</span>
                <textarea
                  value={state.facts.objectiveNote ?? ""}
                  placeholder="Målrettede test eller nuancerede fund"
                  onChange={(event) =>
                    updateFact("objectiveNote", event.target.value || undefined)
                  }
                />
              </label>
            )}
          </DocumentSection>

          <DocumentSection number="03" title="Vurdering">
            <div className={styles.suggestionHeader}>
              <div>
                <span>DEMONSTRATIONSFORSLAG</span>
                <p>Højst tre vises primært. Intet vælges automatisk.</p>
              </div>
              {suggestions.additional.length > 0 && (
                <button
                  className={styles.textButton}
                  aria-expanded={showMoreSuggestions}
                  onClick={() => setShowMoreSuggestions((current) => !current)}
                >
                  {showMoreSuggestions ? "Vis færre" : "Vis flere"}
                </button>
              )}
            </div>
            {suggestions.primary.length ? (
              <div className={styles.suggestionList}>
                {[...suggestions.primary, ...(showMoreSuggestions ? suggestions.additional : [])].map(
                  (suggestion) => (
                    <button
                      key={suggestion.id}
                      className={
                        state.facts.assessment === suggestion.label
                          ? styles.suggestionSelected
                          : styles.suggestion
                      }
                      aria-pressed={state.facts.assessment === suggestion.label}
                      onClick={() => updateFact("assessment", suggestion.label)}
                    >
                      <span>
                        <strong>{suggestion.label}</strong>
                        <small>{suggestion.reason}</small>
                      </span>
                      <span>{state.facts.assessment === suggestion.label ? "Valgt" : "Vælg"}</span>
                    </button>
                  )
                )}
              </div>
            ) : (
              <p className={styles.emptyHint}>Vælg et demonstrationsscenarie for at se forslag.</p>
            )}
          </DocumentSection>

          <DocumentSection number="04" title="Plan">
            <MultiChoiceGroup
              label="Planhandlinger"
              values={state.facts.plan ?? []}
              choices={[
                { value: "information", label: "Information" },
                { value: "activity", label: "Aktivitetstilpasning" },
                { value: "exercise", label: "Træning" },
                { value: "physiotherapy", label: "Fysioterapi" },
                { value: "imaging", label: "Billeddiagnostik" },
                { value: "followup", label: "Opfølgning" }
              ]}
              onToggle={(value) =>
                setState((current) => togglePrototypeListFact(current, "plan", value))
              }
            />
          </DocumentSection>
        </div>

        <aside className={styles.outputPane}>
          <section className={styles.attentionArea} aria-label="Kliniske opmærksomhedspunkter">
            <div className={styles.panelHeading}>
              <AlertTriangle size={16} />
              <div>
                <span>KLINISKE OPMÆRKSOMHEDSPUNKTER</span>
                <small>Regelbaseret prototypefeedback – ikke klinisk godkendelse</small>
              </div>
            </div>
            {attentionPoints.length ? (
              <div className={styles.attentionList}>
                {attentionPoints.map((point) => (
                  <article key={point.id}>
                    <strong>{point.title}</strong>
                    <p>{point.detail}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className={styles.clearAttention}>
                Ingen prototype-opmærksomhedspunkter udløst. Dette bekræfter ikke klinisk sikkerhed.
              </p>
            )}
          </section>

          <section className={styles.notePanel}>
            <div className={styles.noteHeader}>
              <div>
                <span>LIVE OUTPUT</span>
                <h2>Journalnotat</h2>
              </div>
              <small>{note ? `${note.split(/\s+/).length} ord` : "Tomt udkast"}</small>
            </div>
            <pre className={styles.notePreview} aria-label="Live journalnotat">
              {note || "Notatet er tomt. Registrér et fund eller vælg et demonstrationsscenarie."}
            </pre>
            <button className={styles.copyButton} disabled={!note} onClick={copyNote}>
              {copied ? <Check size={16} /> : <Clipboard size={16} />}
              {copied ? "Kopieret" : "Kopiér notat"}
            </button>
            <p className={styles.reviewReminder}>
              Udkastet kræver lægens kontrol af klinisk indhold og formulering.
            </p>
          </section>

          <section className={styles.outputPlaceholders} aria-label="Kommende outputs">
            <OutputPlaceholder
              icon={<Stethoscope size={17} />}
              title="Fysioterapihenvisning"
              active={(state.facts.plan ?? []).includes("physiotherapy")}
            />
            <OutputPlaceholder
              icon={<Image size={17} />}
              title="Billeddiagnostisk henvisning"
              active={(state.facts.plan ?? []).includes("imaging")}
            />
          </section>
        </aside>
      </section>
    </main>
  );
}

function ModeSwitch({
  mode,
  onChange
}: {
  mode: PrototypeMode;
  onChange: (mode: PrototypeMode) => void;
}) {
  return (
    <div className={styles.modeSwitch} role="group" aria-label="Workspace-visning">
      {(["quick", "standard"] as const).map((value) => (
        <button
          key={value}
          aria-pressed={mode === value}
          onClick={() => onChange(value)}
        >
          {value === "quick" ? "Quick" : "Standard"}
        </button>
      ))}
    </div>
  );
}

function DocumentSection({
  number,
  title,
  children
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.documentSection} aria-labelledby={`prototype-section-${number}`}>
      <header>
        <span>{number}</span>
        <h2 id={`prototype-section-${number}`}>{title}</h2>
      </header>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}

function ChoiceGroup({
  label,
  value,
  choices,
  onChange
}: {
  label: string;
  value?: string;
  choices: Choice[];
  onChange: (value: string | undefined) => void;
}) {
  return (
    <fieldset className={styles.choiceGroup}>
      <legend>{label}</legend>
      <div>
        {choices.map((choice) => {
          const selected = value === choice.value;
          return (
            <button
              key={choice.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? undefined : choice.value)}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function MultiChoiceGroup({
  label,
  values,
  choices,
  onToggle
}: {
  label: string;
  values: string[];
  choices: Choice[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className={styles.choiceGroup}>
      <legend>{label}</legend>
      <div>
        {choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            aria-pressed={values.includes(choice.value)}
            onClick={() => onToggle(choice.value)}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function OutputPlaceholder({
  icon,
  title,
  active
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
}) {
  return (
    <article className={active ? styles.placeholderActive : undefined}>
      {icon}
      <div>
        <strong>{title}</strong>
        <span>
          {active
            ? "Valgt i planen · generation er ikke implementeret"
            : "Placeholder · ikke aktiv"}
        </span>
      </div>
      <FileText size={15} />
    </article>
  );
}
