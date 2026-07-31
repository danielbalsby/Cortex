"use client";

import Link from "next/link";
import { useReducer } from "react";

import { createEmptyStateV3 } from "@/clinical/prototypes/clinical-document-workspace-v3/model";
import { workspaceReducerV3 } from "@/clinical/prototypes/clinical-document-workspace-v3/reducer";

import { ActiveStepIndicator } from "./ActiveStepIndicator";
import { AssessmentSection } from "./AssessmentSection";
import { ObjectiveSection } from "./ObjectiveSection";
import { PlanSection } from "./PlanSection";
import { ProblemSearch } from "./ProblemSearch";
import { PsoapPreview } from "./PsoapPreview";
import { SubjectiveSection } from "./SubjectiveSection";
import styles from "./ClinicalDocumentWorkspaceV3.module.css";

export function ClinicalDocumentWorkspaceV3() {
  const [state, dispatch] = useReducer(workspaceReducerV3, undefined, createEmptyStateV3);

  return (
    <main className={styles.shell}>
      <header className={styles.workspaceHeader}>
        <div className={styles.identity}>
          <span className={styles.brandMark} aria-hidden="true">
            C
          </span>
          <div>
            <p className={styles.eyebrow}>ISOLERET · LEARNING-PROTOTYPE V3</p>
            <strong>Klinisk dokument — hurtigt flow</strong>
          </div>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.modeSwitch} role="group" aria-label="Workspace-visning">
            {(["quick", "standard"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={state.mode === value}
                onClick={() => dispatch({ type: "set-mode", mode: value })}
              >
                {value === "quick" ? "Quick" : "Standard"}
              </button>
            ))}
          </div>
          <button className={styles.resetButton} type="button" onClick={() => dispatch({ type: "reset" })}>
            Nulstil
          </button>
          <Link className={styles.linkButton} href="/">
            Produktionsflow
          </Link>
        </div>
      </header>

      <ActiveStepIndicator />

      <div className={styles.workspace}>
        <div className={styles.documentColumn}>
          <ProblemSearch
            activeProfileId={state.problemProfile}
            onSelectProfile={(id) => dispatch({ type: "set-problem-profile", id })}
          />
          <div data-testid="v3-clinical-sections" className={styles.clinicalSectionsWrapper}>
            <SubjectiveSection state={state} dispatch={dispatch} />
            <ObjectiveSection state={state} dispatch={dispatch} />
            <AssessmentSection state={state} dispatch={dispatch} />
            <PlanSection state={state} dispatch={dispatch} />
          </div>
        </div>

        <aside className={styles.companionPane} aria-label="PSOAP-panel">
          <PsoapPreview state={state} />
        </aside>
      </div>
    </main>
  );
}
