import type { ReactNode } from "react";

import {
  getFocusElementId,
  type FocusTargetId,
  type NarrativeBlock
} from "@/clinical/prototypes/clinical-document-workspace-v2/presentation";

import styles from "./ClinicalDocumentWorkspaceV2.module.css";

const SECTION_NUMBERS: Record<string, string> = {
  Anamnese: "01",
  Objektivt: "02",
  Vurdering: "03",
  Plan: "04"
};

export function NarrativeSection({
  block,
  focusId,
  children,
  actions
}: {
  block: NarrativeBlock;
  focusId: FocusTargetId;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section
      className={styles.documentSection}
      id={getFocusElementId(focusId)}
      tabIndex={-1}
      aria-labelledby={`${getFocusElementId(focusId)}-title`}
    >
      <div className={styles.sectionLabel}>
        <span aria-hidden="true">{SECTION_NUMBERS[block.title] ?? "·"}</span>
        <h2 id={`${getFocusElementId(focusId)}-title`}>{block.title}</h2>
      </div>
      <p className={styles.narrativeSentence} data-empty={block.isEmpty}>
        {block.sentence}
      </p>
      {actions ? <div className={styles.actionRow}>{actions}</div> : null}
      {children}
    </section>
  );
}

export type OpenPanel =
  | "situation"
  | "trauma"
  | "pain"
  | "function"
  | "exam"
  | "assessment"
  | "plan"
  | null;
