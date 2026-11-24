/**
 * Pure toggle-off helper used by single-choice chip groups: clicking the
 * already-selected option clears it instead of leaving it stuck selected.
 * Extracted as a pure function so the behaviour is unit-testable without a
 * browser.
 */
export function toggleSingleChoice<T>(current: T | undefined, clicked: T): T | undefined {
  return current === clicked ? undefined : clicked;
}
