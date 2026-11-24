"use client";

import type { Dispatch } from "react";

import {
  NEGATIVE_BUNDLE_FINDINGS,
  NEGATIVE_BUNDLE_LABEL,
  NO_RED_FLAGS_LABEL,
  RED_FLAG_FINDINGS,
  type FunctionStatus,
  type Onset,
  type PainLocation,
  type PainPattern,
  type PrototypeStateV3,
  type Side,
  type TraumaAnswer,
  type TraumaMechanism
} from "@/clinical/prototypes/clinical-document-workspace-v3/model";
import {
  setFactAction,
  toggleListFactAction,
  type WorkspaceActionV3
} from "@/clinical/prototypes/clinical-document-workspace-v3/reducer";

import { ChoiceGroup, MultiChoiceGroup } from "./ChoiceControls";
import { advanceFrom } from "./focusFlow";
import styles from "./ClinicalDocumentWorkspaceV3.module.css";

const SIDE_OPTIONS = [
  { value: "right", label: "Højre" },
  { value: "left", label: "Venstre" },
  { value: "bilateral", label: "Begge" }
] as const;
const ONSET_OPTIONS = [
  { value: "acute", label: "Akut" },
  { value: "gradual", label: "Gradvis" },
  { value: "recurrent", label: "Recidiverende" },
  { value: "unclear", label: "Uklart" }
] as const;
const TRAUMA_OPTIONS = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nej" },
  { value: "unclear", label: "Uklart" }
] as const;
const TRAUMA_MECHANISM_OPTIONS = [
  { value: "twisting-planted-foot", label: "Vrid på fikseret fod" },
  { value: "direct-blow", label: "Direkte slag" },
  { value: "fall", label: "Fald" },
  { value: "valgus-force", label: "Valgus" },
  { value: "varus-force", label: "Varus" },
  { value: "hyperextension", label: "Hyperekstension" },
  { value: "sport-contact", label: "Sport/kontakt" },
  { value: "other", label: "Andet" }
] as const;
const LOCATION_OPTIONS = [
  { value: "medial", label: "Medialt" },
  { value: "lateral", label: "Lateralt" },
  { value: "anterior", label: "Fortil" },
  { value: "posterior", label: "Bagtil" },
  { value: "diffuse", label: "Diffust" }
] as const;
const PATTERN_OPTIONS = [
  { value: "load-related", label: "Belastning" },
  { value: "start-up", label: "Igangsætning" },
  { value: "stairs", label: "Trapper" },
  { value: "constant", label: "Konstant" },
  { value: "intermittent", label: "Intermitterende" }
] as const;
const FUNCTION_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "limp", label: "Halten" },
  { value: "cannot-four-steps", label: "Kan ikke tage fire skridt" }
] as const;
const YES_NO = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nej" }
] as const;

/**
 * Groups actually rendered right now, in clinical order. Used only to move
 * focus forward after a completing selection — never to compute Tab order,
 * which follows natural DOM order because hidden groups are not rendered.
 */
function effectiveOrder(traumaAnswer: TraumaAnswer | undefined): readonly string[] {
  const base = [
    "v3-side",
    "v3-onset",
    "v3-duration",
    "v3-trauma",
    "v3-trauma-mechanisms",
    "v3-function",
    "v3-pain-locations",
    "v3-pain-patterns",
    "v3-swelling",
    "v3-negative-bundle",
    "v3-red-flags",
    "v3-subjective-note"
  ];
  return traumaAnswer === "yes" ? base : base.filter((id) => id !== "v3-trauma-mechanisms");
}

export function SubjectiveSection({
  state,
  dispatch
}: {
  state: PrototypeStateV3;
  dispatch: Dispatch<WorkspaceActionV3>;
}) {
  const { facts } = state;
  const order = effectiveOrder(facts.trauma);
  const advance = (fromId: string) => advanceFrom(order, fromId);

  return (
    <section className={styles.documentSection} aria-labelledby="v3-subjective-title">
      <div className={styles.sectionLabel}>
        <span aria-hidden="true">S</span>
        <h2 id="v3-subjective-title">Subjektivt</h2>
      </div>

      <div className={styles.linearGroups}>
        <ChoiceGroup<Side>
          id="v3-side"
          label="Side"
          value={facts.side}
          options={SIDE_OPTIONS}
          onChange={(value) => dispatch(setFactAction("side", value))}
          onSelected={() => advance("v3-side")}
        />
        <ChoiceGroup<Onset>
          id="v3-onset"
          label="Debut"
          value={facts.onset}
          options={ONSET_OPTIONS}
          onChange={(value) => dispatch(setFactAction("onset", value))}
          onSelected={() => advance("v3-onset")}
        />
        <label className={styles.textField} id="v3-duration">
          <span>Varighed</span>
          <input
            value={facts.duration ?? ""}
            onChange={(event) => dispatch(setFactAction("duration", event.target.value))}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                advance("v3-duration");
              }
            }}
            placeholder="Fx siden i går"
          />
        </label>
        <ChoiceGroup<TraumaAnswer>
          id="v3-trauma"
          label="Traume"
          value={facts.trauma}
          options={TRAUMA_OPTIONS}
          onChange={(value) => dispatch(setFactAction("trauma", value))}
          onSelected={() => advance("v3-trauma")}
        />

        {facts.trauma === "yes" ? (
          <div className={styles.subordinate} id="v3-trauma-mechanisms" aria-label="Traumedetaljer">
            <MultiChoiceGroup<TraumaMechanism>
              label="Traumemekanisme"
              values={facts.traumaMechanisms ?? []}
              options={TRAUMA_MECHANISM_OPTIONS}
              onToggle={(value) => dispatch(toggleListFactAction("traumaMechanisms", value))}
            />
            <label className={styles.textField}>
              <span>Beskrivelse</span>
              <input
                value={facts.traumaNote ?? ""}
                onChange={(event) => dispatch(setFactAction("traumaNote", event.target.value))}
              />
            </label>
          </div>
        ) : null}

        <ChoiceGroup<FunctionStatus>
          id="v3-function"
          label="Funktion"
          value={facts.function}
          options={FUNCTION_OPTIONS}
          onChange={(value) => dispatch(setFactAction("function", value))}
          onSelected={() => advance("v3-function")}
        />
        <MultiChoiceGroup<PainLocation>
          id="v3-pain-locations"
          label="Smertelokalisation"
          values={facts.painLocations ?? []}
          options={LOCATION_OPTIONS}
          onToggle={(value) => dispatch(toggleListFactAction("painLocations", value))}
        />
        <MultiChoiceGroup<PainPattern>
          id="v3-pain-patterns"
          label="Smertemønster"
          values={facts.painPatterns ?? []}
          options={PATTERN_OPTIONS}
          onToggle={(value) => dispatch(toggleListFactAction("painPatterns", value))}
        />
        <ChoiceGroup<"yes" | "no">
          id="v3-swelling"
          label="Hævelse"
          value={facts.swelling}
          options={YES_NO}
          onChange={(value) => dispatch(setFactAction("swelling", value))}
          onSelected={() => advance("v3-swelling")}
        />

        <div className={styles.rollingGroup} id="v3-negative-bundle">
          <span className={styles.rollingGroupLabel}>Aflåsning / instabilitet / hvile / nat</span>
          <div className={styles.chipRow}>
            {NEGATIVE_BUNDLE_FINDINGS.map((finding) => (
              <button
                key={finding.key}
                type="button"
                aria-pressed={facts[finding.key] === "yes"}
                onClick={() =>
                  dispatch(
                    setFactAction(finding.key, facts[finding.key] === "yes" ? undefined : "yes")
                  )
                }
              >
                {finding.label}
              </button>
            ))}
            <button
              type="button"
              className={styles.bundleButton}
              aria-pressed={state.negativeBundle.confirmed}
              onClick={() =>
                dispatch({
                  type: state.negativeBundle.confirmed
                    ? "clear-negative-bundle"
                    : "confirm-negative-bundle"
                })
              }
            >
              {NEGATIVE_BUNDLE_LABEL}
            </button>
          </div>
        </div>

        <div className={styles.rollingGroup} id="v3-red-flags">
          <span className={styles.rollingGroupLabel}>Red flags</span>
          <div className={styles.chipRow}>
            {RED_FLAG_FINDINGS.map((finding) => (
              <button
                key={finding.key}
                type="button"
                aria-pressed={facts[finding.key] === "yes"}
                onClick={() =>
                  dispatch(
                    setFactAction(finding.key, facts[finding.key] === "yes" ? undefined : "yes")
                  )
                }
              >
                {finding.label}
              </button>
            ))}
            <button
              type="button"
              className={styles.bundleButton}
              aria-pressed={state.redFlags.confirmed}
              onClick={() =>
                dispatch({
                  type: state.redFlags.confirmed ? "clear-no-red-flags" : "confirm-no-red-flags"
                })
              }
            >
              {NO_RED_FLAGS_LABEL}
            </button>
          </div>
        </div>

        {state.mode === "standard" ? (
          <label className={styles.textField} id="v3-subjective-note">
            <span>Supplerende</span>
            <textarea
              value={facts.subjectiveNote ?? ""}
              onChange={(event) => dispatch(setFactAction("subjectiveNote", event.target.value))}
              rows={2}
            />
          </label>
        ) : null}
      </div>
    </section>
  );
}
