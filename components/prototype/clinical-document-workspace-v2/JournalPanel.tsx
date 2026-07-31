import { useEffect, useRef, useState } from "react";

import {
  createJournalDraftOverride,
  resolveJournalDraft,
  type JournalDraftOverride
} from "@/clinical/prototypes/clinical-document-workspace-v2/journal";
import { getFocusElementId } from "@/clinical/prototypes/clinical-document-workspace-v2/presentation";

import styles from "./ClinicalDocumentWorkspaceV2.module.css";

export function JournalPanel({
  generatedJournal,
  draftOverride,
  hasClinicalContent,
  onDraftOverrideChange
}: {
  generatedJournal: string;
  draftOverride: JournalDraftOverride | undefined;
  hasClinicalContent: boolean;
  onDraftOverrideChange: (override: JournalDraftOverride | undefined) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const previousJournal = useRef(generatedJournal);
  const resolved = resolveJournalDraft(generatedJournal, draftOverride);

  useEffect(() => {
    if (previousJournal.current === generatedJournal) return;
    previousJournal.current = generatedJournal;
    setStatus("Journaludkast opdateret fra registrerede oplysninger.");
  }, [generatedJournal]);

  function toggleEditing() {
    if (!isEditing && !draftOverride) {
      onDraftOverrideChange(createJournalDraftOverride(generatedJournal));
    }
    setIsEditing((current) => !current);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(resolved.text);
      setStatus("Udkast kopieret.");
    } catch {
      setStatus("Udkastet kunne ikke kopieres automatisk.");
    }
  }

  return (
    <section
      className={styles.journalPanel}
      id={getFocusElementId("journal")}
      tabIndex={-1}
      aria-labelledby="v2-journal-title"
    >
      <header>
        <p className={styles.eyebrow}>LIVE JOURNAL</p>
        <h2 id="v2-journal-title">Journalnotat</h2>
      </header>

      <div className={styles.journalActions}>
        <button type="button" onClick={toggleEditing}>
          {isEditing ? "Afslut redigering" : "Redigér udkast"}
        </button>
        {resolved.isOverridden ? (
          <button
            type="button"
            onClick={() => {
              onDraftOverrideChange(undefined);
              setIsEditing(false);
              setStatus("Det genererede udkast er gendannet.");
            }}
          >
            Gendan genereret
          </button>
        ) : null}
        <button type="button" onClick={copyDraft}>
          Kopiér udkast
        </button>
      </div>

      {isEditing ? (
        <textarea
          className={styles.journalEditor}
          aria-label="Redigerbart journaludkast"
          value={resolved.text}
          onChange={(event) =>
            onDraftOverrideChange({
              sourceJournal: draftOverride?.sourceJournal ?? generatedJournal,
              text: event.target.value
            })
          }
          rows={12}
        />
      ) : (
        <pre className={styles.journalPreview} aria-label="Live journalnotat">
          {resolved.text}
        </pre>
      )}

      {resolved.isStale ? (
        <p className={styles.draftWarning} role="status">
          Registrerede oplysninger er ændret. Det manuelle udkast er bevaret og er ikke automatisk
          blevet klinisk sandhed.
        </p>
      ) : null}

      <p className={styles.reviewReminder}>
        {hasClinicalContent
          ? "Udkast – kræver klinisk gennemgang før brug."
          : "Kun fast problemkontekst. Kliniske oplysninger er endnu ikke registreret."}{" "}
        Manuel tekst ændrer aldrig de registrerede facts.
      </p>
      <p className={styles.disclaimer} role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
