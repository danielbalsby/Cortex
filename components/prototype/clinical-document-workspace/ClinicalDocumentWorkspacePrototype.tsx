"use client";

import { useReducer } from "react";

import { generatePrototypeJournal } from "@/clinical/prototypes/clinical-document-workspace/journal";
import { createEmptyClinicalDocumentState } from "@/clinical/prototypes/clinical-document-workspace/model";
import { workspaceReducer } from "@/clinical/prototypes/clinical-document-workspace/reducer";
import {
  getClinicalOverview,
  getPrototypeAttentionPoints
} from "@/clinical/prototypes/clinical-document-workspace/selectors";

import { ClinicalDocument } from "./ClinicalDocument";
import { ClinicalOverview } from "./ClinicalOverview";
import { JournalPreview } from "./JournalPreview";
import { SectionNavigator } from "./SectionNavigator";
import { WorkspaceHeader } from "./WorkspaceHeader";
import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ClinicalDocumentWorkspacePrototype() {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    undefined,
    createEmptyClinicalDocumentState
  );

  const overview = getClinicalOverview(state);
  const attentionPoints = getPrototypeAttentionPoints(state);
  const journal = generatePrototypeJournal(state);

  return (
    <main className={styles.shell}>
      <WorkspaceHeader
        mode={state.mode}
        onModeChange={(mode) => dispatch({ type: "set-mode", mode })}
        onReset={() => dispatch({ type: "reset" })}
      />
      <SectionNavigator />

      <div className={styles.workspace}>
        <ClinicalDocument state={state} dispatch={dispatch} />

        <aside className={styles.companionPane} aria-label="Klinisk overblik og journal">
          <ClinicalOverview items={overview} attentionPoints={attentionPoints} />
          <JournalPreview journal={journal} />
        </aside>
      </div>
    </main>
  );
}
