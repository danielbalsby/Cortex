import Link from "next/link";

import type { PrototypeMode } from "@/clinical/prototypes/clinical-document-workspace/model";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function WorkspaceHeader({
  mode,
  onModeChange,
  onReset
}: {
  mode: PrototypeMode;
  onModeChange: (mode: PrototypeMode) => void;
  onReset: () => void;
}) {
  return (
    <header className={styles.workspaceHeader}>
      <div className={styles.identity}>
        <span className={styles.brandMark} aria-hidden="true">
          C
        </span>
        <div>
          <p className={styles.eyebrow}>ISOLERET · SYNTETISK PROTOTYPE</p>
          <strong>Clinical Document Workspace v2</strong>
          <span>Phase 3 · Journal og output</span>
        </div>
      </div>

      <div className={styles.headerActions}>
        <div className={styles.modeSwitch} role="group" aria-label="Workspace-visning">
          {(["quick", "standard"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => onModeChange(value)}
            >
              {value === "quick" ? "Quick" : "Standard"}
            </button>
          ))}
        </div>
        <button className={styles.resetButton} type="button" onClick={onReset}>
          Nulstil
        </button>
        <Link className={styles.productionLink} href="/">
          Til produktionsarbejdsgangen
        </Link>
      </div>
    </header>
  );
}
