import styles from "./ClinicalDocumentWorkspaceV3.module.css";

export interface ChoiceOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

/**
 * Short single-choice group (≤3–4 options), shown directly and toggled off
 * on a second click of the same option. Fires `onSelected` only when a new
 * value is actually chosen, used by callers to auto-advance focus.
 */
export function ChoiceGroup<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  onSelected,
  description
}: {
  id?: string;
  label: string;
  value: T | undefined;
  options: readonly ChoiceOption<T>[];
  onChange: (value: T | undefined) => void;
  onSelected?: () => void;
  description?: string;
}) {
  return (
    <fieldset className={styles.choiceGroup} id={id}>
      <legend>{label}</legend>
      {description ? <p className={styles.choiceDescription}>{description}</p> : null}
      <div className={styles.chipRow}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => {
              const cleared = value === option.value;
              onChange(cleared ? undefined : option.value);
              if (!cleared) onSelected?.();
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function MultiChoiceGroup<T extends string>({
  id,
  label,
  values,
  options,
  onToggle
}: {
  id?: string;
  label: string;
  values: readonly T[];
  options: readonly ChoiceOption<T>[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset className={styles.choiceGroup} id={id}>
      <legend>{label}</legend>
      <div className={styles.chipRow}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={values.includes(option.value)}
            onClick={() => onToggle(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
