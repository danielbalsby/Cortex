import type { Dispatch } from "react";

import type {
  ClinicalDocumentPrototypeState,
  FunctionStatus,
  Onset,
  PainLocation,
  PainPattern,
  PrecipitatingFactor,
  Side,
  Swelling,
  TraumaMechanism
} from "@/clinical/prototypes/clinical-document-workspace/model";
import {
  setFactAction,
  toggleListFactAction,
  type WorkspaceAction
} from "@/clinical/prototypes/clinical-document-workspace/reducer";
import { getHistoryContext } from "@/clinical/prototypes/clinical-document-workspace/selectors";

import { ChoiceGroup, MultiChoiceGroup } from "./ChoiceGroup";
import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

const SIDE_OPTIONS = [
  { value: "right", label: "Højre" },
  { value: "left", label: "Venstre" },
  { value: "bilateral", label: "Begge" }
] as const;
const ONSET_OPTIONS = [
  { value: "acute", label: "Akut" },
  { value: "gradual", label: "Gradvis" },
  { value: "recurrent", label: "Recidiverende" },
  { value: "unclear", label: "Uklart" },
  { value: "other", label: "Andet" }
] as const;
const FACTOR_OPTIONS = [
  { value: "trauma", label: "Traume" },
  { value: "none", label: "Intet identificeret traume" },
  { value: "unclear", label: "Uklart" }
] as const;
const TRAUMA_OPTIONS = [
  { value: "twisting-planted-foot", label: "Vrid på fikseret fod" },
  { value: "direct-blow", label: "Direkte slag" },
  { value: "fall", label: "Fald" },
  { value: "valgus-force", label: "Valguskraft" },
  { value: "varus-force", label: "Varuskraft" },
  { value: "hyperextension", label: "Hyperekstension" },
  { value: "forced-flexion", label: "Tvungen fleksion" },
  { value: "patellar-displacement", label: "Patellaforskydning" },
  { value: "sport-contact", label: "Sport/kontakt" },
  { value: "traffic", label: "Trafikhændelse" },
  { value: "unclear", label: "Uklart" },
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
  { value: "rest", label: "Hvile" },
  { value: "night", label: "Nat" },
  { value: "constant", label: "Konstant" },
  { value: "intermittent", label: "Intermitterende" },
  { value: "other", label: "Andet" }
] as const;

export function HistorySection({
  state,
  dispatch
}: {
  state: ClinicalDocumentPrototypeState;
  dispatch: Dispatch<WorkspaceAction>;
}) {
  const { facts } = state;

  return (
    <div className={styles.clinicalControls}>
      <p className={styles.sectionLead}>{getHistoryContext(state)}</p>
      <div className={styles.controlGrid}>
        <ChoiceGroup<Side>
          label="Side"
          value={facts.side}
          options={SIDE_OPTIONS}
          onChange={(value) => dispatch(setFactAction("side", value))}
        />
        <ChoiceGroup<Onset>
          label="Debut"
          value={facts.onset}
          options={ONSET_OPTIONS}
          onChange={(value) => dispatch(setFactAction("onset", value))}
          description="Akut: pludselig eller tydeligt tidsafgrænset. Gradvis: tiltagende uden én klar starthændelse."
        />
        <label className={styles.textField}>
          <span>Varighed</span>
          <input
            value={facts.duration ?? ""}
            onChange={(event) => dispatch(setFactAction("duration", event.target.value))}
            placeholder="Fx siden i går eller seks måneder"
          />
        </label>
        <ChoiceGroup<PrecipitatingFactor>
          label="Udløsende faktor"
          value={facts.precipitatingFactor}
          options={FACTOR_OPTIONS}
          onChange={(value) => dispatch(setFactAction("precipitatingFactor", value))}
        />
      </div>

      {facts.precipitatingFactor === "trauma" ? (
        <div className={styles.contextBlock} aria-label="Traumeoplysninger">
          <MultiChoiceGroup<TraumaMechanism>
            label="Traumemekanisme"
            values={facts.traumaMechanisms ?? []}
            options={TRAUMA_OPTIONS}
            onToggle={(value) =>
              dispatch(toggleListFactAction("traumaMechanisms", value))
            }
          />
          <label className={styles.textField}>
            <span>Anden mekanisme eller beskrivelse</span>
            <input
              value={facts.traumaMechanismNote ?? ""}
              onChange={(event) =>
                dispatch(setFactAction("traumaMechanismNote", event.target.value))
              }
            />
          </label>
        </div>
      ) : null}

      <div className={styles.controlGrid}>
        <MultiChoiceGroup<PainLocation>
          label="Smertelokalisation"
          values={facts.painLocations ?? []}
          options={LOCATION_OPTIONS}
          onToggle={(value) =>
            dispatch(toggleListFactAction("painLocations", value))
          }
        />
        <MultiChoiceGroup<PainPattern>
          label="Smertemønster"
          values={facts.painPatterns ?? []}
          options={PATTERN_OPTIONS}
          onToggle={(value) =>
            dispatch(toggleListFactAction("painPatterns", value))
          }
        />
        <ChoiceGroup<FunctionStatus>
          label="Funktion"
          value={facts.function}
          options={[
            { value: "normal", label: "Normal" },
            { value: "limp", label: "Halten" },
            { value: "cannot-four-steps", label: "Kan ikke tage fire skridt" }
          ]}
          onChange={(value) => dispatch(setFactAction("function", value))}
        />
        <ChoiceGroup<Swelling>
          label="Hævelse"
          value={facts.swelling}
          options={[
            { value: "none", label: "Ingen" },
            { value: "delayed-mild", label: "Let, forsinket" },
            { value: "persistent-mild", label: "Let, vedvarende" },
            { value: "marked", label: "Udtalt" }
          ]}
          onChange={(value) => dispatch(setFactAction("swelling", value))}
        />
        {(["locking", "instability", "fever"] as const).map((key) => (
          <ChoiceGroup<"yes" | "no">
            key={key}
            label={key === "locking" ? "Reel aflåsning" : key === "instability" ? "Instabilitet" : "Feber"}
            value={facts[key]}
            options={[
              { value: "yes", label: "Ja" },
              { value: "no", label: "Nej" }
            ]}
            onChange={(value) => dispatch(setFactAction(key, value))}
          />
        ))}
      </div>

      {state.mode === "standard" ? (
        <label className={styles.textField}>
          <span>Supplerende anamnese</span>
          <textarea
            value={facts.historyNote ?? ""}
            onChange={(event) => dispatch(setFactAction("historyNote", event.target.value))}
            rows={2}
          />
        </label>
      ) : facts.historyNote ? (
        <p className={styles.preservedNotice}>Yderligere anamnestiske oplysninger er bevaret i Standard.</p>
      ) : null}
    </div>
  );
}
