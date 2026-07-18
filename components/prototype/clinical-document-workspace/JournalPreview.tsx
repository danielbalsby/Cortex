import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export function JournalPreview({ journal }: { journal: string }) {
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
        <span>Udkast</span>
      </header>

      <pre className={styles.journalPreview} aria-label="Live journalnotat">
        {journal}
      </pre>

      <p className={styles.reviewReminder}>
        Udkast – kræver klinisk gennemgang. Phase 1 genererer kun den faste problemkontekst.
      </p>
    </section>
  );
}
