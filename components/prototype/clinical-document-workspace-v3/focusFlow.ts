/**
 * Focus-flow helpers for the linear Subjective/Objective groups.
 *
 * Auto-advance only ever moves focus to the first focusable control inside
 * the *next currently rendered* group. Because hidden/irrelevant groups are
 * not rendered at all (conditional rendering, not CSS visibility), this can
 * never land focus on a hidden field, and native Tab order is unaffected —
 * this only fires on an explicit single-choice selection or Enter in a text
 * field, as a convenience on top of normal keyboard navigation.
 */
export function focusGroup(groupId: string): void {
  if (typeof window === "undefined") return;
  window.requestAnimationFrame(() => {
    const container = document.getElementById(groupId);
    if (!container) return;
    const focusable = container.querySelector<HTMLElement>(
      "button, input, textarea, select, [tabindex]"
    );
    focusable?.focus();
  });
}

export function nextGroupId(
  order: readonly string[],
  currentGroupId: string
): string | undefined {
  const index = order.indexOf(currentGroupId);
  if (index === -1) return undefined;
  return order[index + 1];
}

export function advanceFrom(order: readonly string[], currentGroupId: string): void {
  const next = nextGroupId(order, currentGroupId);
  if (next) focusGroup(next);
}
