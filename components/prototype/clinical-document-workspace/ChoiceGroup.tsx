import styles from "./ClinicalDocumentWorkspacePrototype.module.css";

export interface ChoiceOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

export function ChoiceGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  description
}: {
  label: string;
  value: T | undefined;
  options: readonly ChoiceOption<T>[];
  onChange: (value: T | undefined) => void;
  description?: string;
}) {
  return (
    <fieldset className={styles.choiceGroup}>
      <legend>{label}</legend>
      {description ? <p>{description}</p> : null}
      <div className={styles.choiceRow}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(value === option.value ? undefined : option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function MultiChoiceGroup<T extends string>({
  label,
  values,
  options,
  onToggle
}: {
  label: string;
  values: readonly T[];
  options: readonly ChoiceOption<T>[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset className={styles.choiceGroup}>
      <legend>{label}</legend>
      <div className={styles.choiceRow}>
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
