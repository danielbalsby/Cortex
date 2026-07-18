import { useEffect, useRef, useState } from "react";

import {
  createJournalDraftOverride,
  resolveJournalDraft,
  type JournalDraftOverride
} from "@/clinical/prototypes/clinical-document-workspace/journal";

import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function JournalPreview({
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
  const [copyStatus, setCopyStatus] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const previousJournal = useRef(generatedJournal);
  const resolvedDraft = resolveJournalDraft(generatedJournal, draftOverride);

  useEffect(() => {
    if (previousJournal.current === generatedJournal) return;
    previousJournal.current = generatedJournal;
    setCopyStatus("");
    setUpdateStatus("");
    const timeout = window.setTimeout(
      () => setUpdateStatus("Journaludkast opdateret fra registrerede oplysninger."),
      350
    );
    return () => window.clearTimeout(timeout);
  }, [generatedJournal]);

  function toggleEditing() {
    if (!isEditing && !draftOverride) {
      onDraftOverrideChange(createJournalDraftOverride(generatedJournal));
    }
    setIsEditing((current) => !current);
  }

  function updateDraft(text: string) {
    const sourceJournal = draftOverride?.sourceJournal ?? generatedJournal;
    onDraftOverrideChange({ sourceJournal, text });
  }

  function restoreGeneratedDraft() {
    onDraftOverrideChange(undefined);
    setIsEditing(false);
    setUpdateStatus("");
    setCopyStatus("Det genererede udkast er gendannet.");
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(resolvedDraft.text);
      setUpdateStatus("");
      setCopyStatus("Udkast kopieret.");
    } catch {
      setUpdateStatus("");
      setCopyStatus("Udkastet kunne ikke kopieres automatisk.");
    }
  }

  return (
    <section
      className={styles.journalPanel}
      id="prototype-journal"
      aria-labelledby="prototype-journal-title"
    >
      <header>
        <div>
          <p className={styles.eyebrow}>LIVE JOURNAL</p>
          <h2 id="prototype-journal-title">Journalnotat</h2>
        </div>
        <span>{resolvedDraft.isOverridden ? "Manuelt udkast" : "Udkast"}</span>
      </header>

      <div className={styles.journalActions}>
        <button type="button" onClick={toggleEditing}>
          {isEditing ? "Afslut redigering" : "Redigér udkast"}
        </button>
        {resolvedDraft.isOverridden ? (
          <button type="button" onClick={restoreGeneratedDraft}>
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
          value={resolvedDraft.text}
          onChange={(event) => updateDraft(event.target.value)}
          rows={14}
        />
      ) : (
        <pre className={styles.journalPreview} aria-label="Live journalnotat">
          {resolvedDraft.text}
        </pre>
      )}

      {resolvedDraft.isStale ? (
        <p className={styles.draftWarning} role="status">
          Registrerede oplysninger er ændret. Det manuelle udkast er bevaret og er ikke
          automatisk blevet klinisk sandhed. Gendan det genererede udkast for at hente de
          aktuelle registreringer.
        </p>
      ) : null}

      <p className={styles.reviewReminder}>
        {hasClinicalContent
          ? "Udkast – kræver klinisk gennemgang før brug."
          : "Kun fast problemkontekst. Kliniske oplysninger er endnu ikke registreret."}
        {" "}
        Manuel tekst er en separat draft-override og ændrer aldrig de registrerede kliniske
        oplysninger.
      </p>
      <p className={styles.journalStatus} role="status" aria-live="polite" aria-atomic="true">
        {copyStatus || updateStatus}
      </p>
    </section>
  );
}
