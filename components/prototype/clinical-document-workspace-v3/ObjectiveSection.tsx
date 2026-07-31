"use client";

import type { Dispatch } from "react";

import type {
  InspectionFinding,
  JointStatus,
  PrototypeStateV3,
  RomStatus,
  Tenderness
} from "@/clinical/prototypes/clinical-document-workspace-v3/model";
import {
  setFactAction,
  toggleListFactAction,
  type WorkspaceActionV3
} from "@/clinical/prototypes/clinical-document-workspace-v3/reducer";

import { ChoiceGroup, MultiChoiceGroup } from "./ChoiceControls";
import { advanceFrom } from "./focusFlow";
import styles from "./ClinicalDocumentWorkspaceV3.module.css";

const GAIT_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "limp", label: "Haltende" },
  { value: "unable", label: "Kan ikke støtte" }
] as const;
const INSPECTION_OPTIONS = [
  { value: "swelling", label: "Hævelse" },
  { value: "redness", label: "Rødme" },
  { value: "warmth", label: "Varme" },
  { value: "deformity", label: "Deformitet" }
] as const;
const ROM_OPTIONS = [
  { value: "normal", label: "Normal ROM 0–140°" },
  { value: "abnormal", label: "Afvigende ROM" }
] as const;
const JOINT_STATUS_OPTIONS = [
  { value: "full", label: "Fuld" },
  { value: "reduced", label: "Reduceret" },
  { value: "blocked", label: "Blokeret" }
] as const;
const TENDERNESS_OPTIONS = [
  { value: "none-focal", label: "Ingen fokal ømhed" },
  { value: "medial-joint-line", label: "Medial ledlinje" },
  { value: "lateral-joint-line", label: "Lateral ledlinje" }
] as const;

function effectiveOrder(romStatus: RomStatus | undefined): readonly string[] {
  const base = [
    "v3-gait",
    "v3-inspection",
    "v3-rom",
    "v3-extension",
    "v3-flexion",
    "v3-tenderness",
    "v3-objective-note"
  ];
  return romStatus === "abnormal" ? base : base.filter((id) => id !== "v3-extension" && id !== "v3-flexion");
}

export function ObjectiveSection({
  state,
  dispatch
}: {
  state: PrototypeStateV3;
  dispatch: Dispatch<WorkspaceActionV3>;
}) {
  const { facts } = state;
  const order = effectiveOrder(facts.rom);
  const advance = (fromId: string) => advanceFrom(order, fromId);

  return (
    <section className={styles.documentSection} aria-labelledby="v3-objective-title">
      <div className={styles.sectionLabel}>
        <span aria-hidden="true">O</span>
        <h2 id="v3-objective-title">Objektivt</h2>
      </div>

      <div className={styles.linearGroups}>
        <ChoiceGroup<"normal" | "limp" | "unable">
          id="v3-gait"
          label="Gang"
          value={facts.gait}
          options={GAIT_OPTIONS}
          onChange={(value) => dispatch(setFactAction("gait", value))}
          onSelected={() => advance("v3-gait")}
        />
        <MultiChoiceGroup<InspectionFinding>
          id="v3-inspection"
          label="Inspektion"
          values={facts.inspection ?? []}
          options={INSPECTION_OPTIONS}
          onToggle={(value) => dispatch(toggleListFactAction("inspection", value))}
        />
        <ChoiceGroup<RomStatus>
          id="v3-rom"
          label="ROM"
          value={facts.rom}
          options={ROM_OPTIONS}
          onChange={(value) => dispatch(setFactAction("rom", value))}
          onSelected={() => advance("v3-rom")}
        />

        {facts.rom === "abnormal" ? (
          <div className={styles.subordinate} aria-label="ROM-detaljer">
            <ChoiceGroup<JointStatus>
              id="v3-extension"
              label="Ekstension"
              value={facts.extension}
              options={JOINT_STATUS_OPTIONS}
              onChange={(value) => dispatch(setFactAction("extension", value))}
              onSelected={() => advance("v3-extension")}
            />
            <ChoiceGroup<JointStatus>
              id="v3-flexion"
              label="Fleksion"
              value={facts.flexion}
              options={JOINT_STATUS_OPTIONS}
              onChange={(value) => dispatch(setFactAction("flexion", value))}
              onSelected={() => advance("v3-flexion")}
            />
          </div>
        ) : null}

        <ChoiceGroup<Tenderness>
          id="v3-tenderness"
          label="Palpationsømhed"
          value={facts.tenderness}
          options={TENDERNESS_OPTIONS}
          onChange={(value) => dispatch(setFactAction("tenderness", value))}
          onSelected={() => advance("v3-tenderness")}
        />

        {state.mode === "standard" ? (
          <label className={styles.textField} id="v3-objective-note">
            <span>Supplerende</span>
            <textarea
              value={facts.objectiveNote ?? ""}
              onChange={(event) => dispatch(setFactAction("objectiveNote", event.target.value))}
              rows={2}
            />
          </label>
        ) : null}
      </div>
    </section>
  );
}
