import type {
  DraftLifecycleEvent,
  DraftLifecycleStatus,
  SprintZeroDraft
} from "@/clinical/prototypes/sprint-0/drafts";

import styles from "./SprintZeroPrototype.module.css";

const STATUS_LABELS: Record<DraftLifecycleStatus, string> = {
  draft: "Draft",
  reviewed: "Reviewed",
  approved: "Approved for copy",
  copied: "Copied",
  rejected: "Rejected"
};

export function ReviewableDraft({
  draft,
  status,
  text,
  editable = false,
  isStale = false,
  onTextChange,
  onTransition,
  onRestore,
  onReject
}: {
  draft: SprintZeroDraft;
  status: DraftLifecycleStatus;
  text: string;
  editable?: boolean;
  isStale?: boolean;
  onTextChange?: (text: string) => void;
  onTransition: (event: DraftLifecycleEvent) => void;
  onRestore?: () => void;
  onReject?: () => void;
}) {
  const available = draft.missing.length === 0 && text.trim().length > 0;

  async function copy() {
    if (status !== "approved") return;
    await navigator.clipboard.writeText(text);
    onTransition("copy");
  }

  return (
    <section className={styles.draftCard} aria-labelledby={`sprint-0-${draft.id}-title`}>
      <header className={styles.draftHeader}>
        <div>
          <p>SYNTETISK PROTOTYPEUDKAST</p>
          <h3 id={`sprint-0-${draft.id}-title`}>{draft.title}</h3>
        </div>
        <span className={`${styles.statusBadge} ${styles[status]}`}>{STATUS_LABELS[status]}</span>
      </header>

      {draft.missing.length ? (
        <div className={styles.missingNotice}>
          <strong>Udkastet mangler:</strong>
          <span>{draft.missing.join(", ")}.</span>
        </div>
      ) : null}

      {editable ? (
        <textarea
          aria-label={`Rediger ${draft.title.toLowerCase()}`}
          className={styles.draftEditor}
          value={text}
          onChange={(event) => onTextChange?.(event.target.value)}
          rows={10}
        />
      ) : (
        <pre className={styles.draftText} aria-label={draft.title}>
          {text || "Udkastet genereres først, når de eksplicitte minimumsoplysninger er registreret."}
        </pre>
      )}

      {isStale ? (
        <p className={styles.staleWarning} role="status">
          Konsultationsoplysningerne er ændret. Klinikerens redigerede tekst er bevaret og er
          ikke blevet overskrevet automatisk.
        </p>
      ) : null}

      <div className={styles.draftActions}>
        <button
          type="button"
          disabled={!available || status !== "draft"}
          onClick={() => onTransition("review")}
        >
          Markér gennemgået
        </button>
        <button
          type="button"
          disabled={status !== "reviewed"}
          onClick={() => onTransition("approve")}
        >
          Godkend til kopiering
        </button>
        <button
          type="button"
          disabled={status !== "approved"}
          onClick={copy}
        >
          {status === "copied" ? "Kopieret" : "Kopiér"}
        </button>
        <button
          type="button"
          disabled={status === "copied" || status === "rejected"}
          onClick={() => {
            onReject?.();
            onTransition("reject");
          }}
        >
          Afvis udkast
        </button>
        {onRestore ? (
          <button type="button" onClick={onRestore}>
            Gendan genereret
          </button>
        ) : null}
        {status === "rejected" ? (
          <button type="button" onClick={() => onTransition("reset")}>
            Nulstil status
          </button>
        ) : null}
      </div>

      <p className={styles.draftBoundary}>
        Approval, copy og delivery er separate. Der foretages ingen afsendelse.
      </p>
    </section>
  );
}
