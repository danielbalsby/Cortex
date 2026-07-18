"use client";

import { useState } from "react";

import { generatePrototypeJournal } from "@/clinical/prototypes/clinical-document-workspace/journal";
import {
  createEmptyClinicalDocumentState,
  setPrototypeMode,
  type PrototypeMode
} from "@/clinical/prototypes/clinical-document-workspace/model";
import { getClinicalOverview } from "@/clinical/prototypes/clinical-document-workspace/selectors";

import { ClinicalDocument } from "./ClinicalDocument";
import { ClinicalOverview } from "./ClinicalOverview";
import { JournalPreview } from "./JournalPreview";
import { SectionNavigator } from "./SectionNavigator";
import { WorkspaceHeader } from "./WorkspaceHeader";
import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ClinicalDocumentWorkspacePrototype() {
  const [state, setState] = useState(createEmptyClinicalDocumentState);

  function changeMode(mode: PrototypeMode) {
    setState((current) => setPrototypeMode(current, mode));
  }

  const overview = getClinicalOverview(state);
  const journal = generatePrototypeJournal(state);

  return (
    <main className={styles.shell}>
      <WorkspaceHeader mode={state.mode} onModeChange={changeMode} />
      <SectionNavigator />

      <div className={styles.workspace}>
        <ClinicalDocument mode={state.mode} />

        <aside className={styles.companionPane} aria-label="Klinisk overblik og journal">
          <ClinicalOverview items={overview} />
          <JournalPreview journal={journal} />
        </aside>
      </div>
    </main>
  );
}
