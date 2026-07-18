"use client";

import { useReducer, useState } from "react";

import {
  buildJournalSections,
  formatJournalSections,
  hasJournalClinicalContent,
  type JournalDraftOverride
} from "@/clinical/prototypes/clinical-document-workspace/journal";
import { createEmptyClinicalDocumentState } from "@/clinical/prototypes/clinical-document-workspace/model";
import { workspaceReducer } from "@/clinical/prototypes/clinical-document-workspace/reducer";
import {
  getClinicalOverview,
  getPrototypeAttentionPoints,
  getReferralDraftFoundations
} from "@/clinical/prototypes/clinical-document-workspace/selectors";

import { ClinicalDocument } from "./ClinicalDocument";
import { ClinicalOverview } from "./ClinicalOverview";
import { JournalPreview } from "./JournalPreview";
import { ReferralDraftFoundations } from "./ReferralDraftFoundations";
import { SectionNavigator } from "./SectionNavigator";
import { WorkspaceHeader } from "./WorkspaceHeader";
import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function ClinicalDocumentWorkspacePrototype() {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    undefined,
    createEmptyClinicalDocumentState
  );
  const [journalDraftOverride, setJournalDraftOverride] =
    useState<JournalDraftOverride>();

  const overview = getClinicalOverview(state);
  const attentionPoints = getPrototypeAttentionPoints(state);
  const referralFoundations = getReferralDraftFoundations(state);
  const journalSections = buildJournalSections(state);
  const journal = formatJournalSections(journalSections);

  return (
    <main className={styles.shell}>
      <WorkspaceHeader
        mode={state.mode}
        onModeChange={(mode) => dispatch({ type: "set-mode", mode })}
        onReset={() => {
          dispatch({ type: "reset" });
          setJournalDraftOverride(undefined);
        }}
      />
      <SectionNavigator />

      <div className={styles.workspace}>
        <ClinicalDocument state={state} dispatch={dispatch} />

        <aside className={styles.companionPane} aria-label="Klinisk overblik og journal">
          <ClinicalOverview items={overview} attentionPoints={attentionPoints} />
          <JournalPreview
            generatedJournal={journal}
            draftOverride={journalDraftOverride}
            hasClinicalContent={hasJournalClinicalContent(journalSections)}
            onDraftOverrideChange={setJournalDraftOverride}
          />
          <ReferralDraftFoundations foundations={referralFoundations} />
        </aside>
      </div>
    </main>
  );
}
