/**
 * C3.3 Keyboard Mode — explicit focus manager.
 *
 * Category order is the stable `C33_KEYBOARD_GROUP_ORDER` contract, not
 * incidental DOM order. Visible groups are resolved via
 * `data-keyboard-group="<id>"`. Conditional groups (trauma details, swelling
 * onset, open Baggrund) appear/disappear in the DOM; missing or hidden groups
 * are skipped without reordering the contract.
 */

import type { KeyboardEvent as ReactKeyboardEvent } from "react";

export const KEYBOARD_GROUP_ATTR = "data-keyboard-group";

export const C33_KEYBOARD_GROUP_ORDER = [
  "problem",
  "side",
  "localisation",
  "onset",
  "duration",
  "pain-course",
  "trauma",
  "trauma-mechanism",
  "trauma-snap",
  "trauma-weight-bearing",
  "trauma-supplementary",
  "provocation",
  "function",
  "accompanying",
  "swelling",
  "swelling-onset",
  "background-trigger",
  "background-history",
  "background-comorbidity",
  "background-medication",
  "mechanical",
  "red-flags",
  "gait",
  "inspection",
  "effusion",
  "palpation",
  "rom",
  "test-lachman",
  "test-valgus",
  "test-varus",
  "test-meniscal",
  "test-patella",
  "test-neurovascular",
  "tests-normal",
  "analysis",
  "plan-self-care",
  "plan-plan",
  "plan-analgesia",
  "plan-imaging",
  "plan-referral",
  "plan-follow-up",
  "plan-safety-net",
  "plan-information",
  "document-profile",
  "copy"
] as const;

export type C33KeyboardGroupId = (typeof C33_KEYBOARD_GROUP_ORDER)[number];

const focusableSelector =
  "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [role='radio']:not([disabled])";

function isHiddenByClosedDetails(element: HTMLElement): boolean {
  const details = element.closest("details");
  if (!details || details.open) return false;
  const summary = details.querySelector("summary");
  return !(summary && summary.contains(element));
}

export function isVisible(element: HTMLElement): boolean {
  return element.offsetParent !== null && !isHiddenByClosedDetails(element);
}

export function isEditableControl(element: EventTarget | null): boolean {
  if (!(element instanceof HTMLElement)) return false;
  const tag = element.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (element.isContentEditable) return true;
  return false;
}

function groupSelector(id: string): string {
  return `[${KEYBOARD_GROUP_ATTR}="${id}"]`;
}

export function resolveVisibleKeyboardGroups(root: ParentNode = document): HTMLElement[] {
  const groups: HTMLElement[] = [];
  for (const id of C33_KEYBOARD_GROUP_ORDER) {
    const matches = [...root.querySelectorAll<HTMLElement>(groupSelector(id))]
      .filter(isVisible);
    if (matches[0]) groups.push(matches[0]);
  }
  return groups;
}

function focusTargetIn(category: HTMLElement): HTMLElement | undefined {
  if (category.matches(focusableSelector)) return category;
  return category.querySelector<HTMLElement>('[tabindex="0"]')
    ?? category.querySelector<HTMLElement>(focusableSelector)
    ?? undefined;
}

export function focusKeyboardGroup(group: HTMLElement): HTMLElement | undefined {
  const target = focusTargetIn(group);
  target?.focus();
  return target;
}

function isFocusTrigger(trigger: unknown): trigger is HTMLElement {
  return Boolean(
    trigger
    && typeof trigger === "object"
    && "closest" in trigger
    && typeof (trigger as HTMLElement).closest === "function"
  );
}

export function focusAdjacentKeyboardGroup(
  trigger: HTMLElement | null | undefined,
  direction: -1 | 1,
  root?: ParentNode
): HTMLElement | undefined {
  if (!isFocusTrigger(trigger)) return undefined;
  const scope = root ?? document;
  const groups = resolveVisibleKeyboardGroups(scope);
  const current = trigger.closest<HTMLElement>(`[${KEYBOARD_GROUP_ATTR}]`);
  const index = current ? groups.indexOf(current) : -1;
  if (index < 0 || !groups.length) return undefined;
  let cursor = index;
  for (let attempt = 0; attempt < groups.length; attempt += 1) {
    cursor = (cursor + direction + groups.length) % groups.length;
    const nextGroup = groups[cursor];
    if (!nextGroup) continue;
    const target = focusKeyboardGroup(nextGroup);
    if (target) return target;
  }
  return undefined;
}

/**
 * Capture a live DOM element synchronously, then advance after React commit.
 * Never read `event.currentTarget` inside the deferred callback.
 */
export function scheduleFocusAdjacentKeyboardGroup(
  trigger: HTMLElement | null | undefined,
  direction: -1 | 1 = 1
) {
  if (!isFocusTrigger(trigger)) return;
  const element = trigger;
  window.setTimeout(() => {
    focusAdjacentKeyboardGroup(element, direction);
  }, 0);
}

function optionButtons(group: Element): HTMLButtonElement[] {
  return [...group.querySelectorAll<HTMLButtonElement>("button:not([disabled])")];
}

function isOptionSelected(button: HTMLButtonElement): boolean {
  return button.getAttribute("aria-checked") === "true"
    || button.getAttribute("aria-pressed") === "true"
    || button.getAttribute("aria-expanded") === "true";
}

/** One Tab stop per clinical category (roving tabindex within the group). */
export function applyRovingTabIndex(group: Element) {
  const buttons = optionButtons(group);
  if (!buttons.length) return;
  const selectedIndex = buttons.findIndex(isOptionSelected);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  buttons.forEach((button, index) => {
    button.tabIndex = index === activeIndex ? 0 : -1;
  });
}

export function refreshRovingGroups(root: ParentNode) {
  root.querySelectorAll("[data-roving-group]").forEach(applyRovingTabIndex);
}

function moveWithinGroup(
  trigger: HTMLButtonElement,
  direction: -1 | 1,
  options: { select: boolean }
) {
  const group = trigger.closest("[data-roving-group], [role='radiogroup'], [role='group'], fieldset");
  const controls = group ? optionButtons(group) : [];
  const index = controls.indexOf(trigger);
  const next = index + direction;
  if (next < 0 || next >= controls.length) {
    focusAdjacentKeyboardGroup(trigger, direction);
    return;
  }
  const button = controls[next];
  if (!button) return;
  button.focus();
  if (options.select) button.click();
}

/** Exclusive: Left/Right select adjacent; at edge, cross category. Up/Down always cross. */
export function handleExclusiveKey(event: ReactKeyboardEvent<HTMLButtonElement>) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    focusAdjacentKeyboardGroup(event.currentTarget, event.key === "ArrowUp" ? -1 : 1);
    return;
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveWithinGroup(
      event.currentTarget,
      event.key === "ArrowLeft" ? -1 : 1,
      { select: true }
    );
    return;
  }
  if (event.key === "Enter" || event.key === " ") {
    scheduleFocusAdjacentKeyboardGroup(event.currentTarget, 1);
  }
}

/**
 * Multi-select: Left/Right move focus only (never change selection).
 * Enter/Space toggle via native button behaviour and stay in the group.
 * Up/Down cross category.
 */
export function handleMultiKey(event: ReactKeyboardEvent<HTMLButtonElement>) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    focusAdjacentKeyboardGroup(event.currentTarget, event.key === "ArrowUp" ? -1 : 1);
    return;
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveWithinGroup(
      event.currentTarget,
      event.key === "ArrowLeft" ? -1 : 1,
      { select: false }
    );
  }
}

/**
 * Negative/normal batch inside an otherwise multi-select group: arrows behave
 * like multi-select, but Enter/Space confirm and advance to the next category.
 */
export function handleConfirmAndAdvanceKey(event: ReactKeyboardEvent<HTMLButtonElement>) {
  handleMultiKey(event);
  if (event.key === "Enter" || event.key === " ") {
    scheduleFocusAdjacentKeyboardGroup(event.currentTarget, 1);
  }
}

/** Category-level Up/Down for non-chip controls (summary, copy). */
export function handleCategoryArrowKey(event: ReactKeyboardEvent<HTMLElement>) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    focusAdjacentKeyboardGroup(
      event.currentTarget,
      event.key === "ArrowUp" ? -1 : 1
    );
  }
}

/**
 * Tab / Shift+Tab move by logical keyboard-group, not native chip order.
 * ArrowUp/Down are handled by per-control handlers so editables keep caret
 * behaviour and category controls are not double-advanced.
 */
export function handleWorkspaceKeyboardNavigation(event: KeyboardEvent) {
  if (event.key !== "Tab") return;
  const active = document.activeElement;
  if (!(active instanceof HTMLElement)) return;
  if (!active.closest(`[${KEYBOARD_GROUP_ATTR}]`)) return;
  event.preventDefault();
  focusAdjacentKeyboardGroup(active, event.shiftKey ? -1 : 1);
}

/** `n` activates the category's normal/negative shortcut; never inside editables. */
export function handleNormalShortcut(event: KeyboardEvent) {
  if (event.key !== "n" || event.metaKey || event.ctrlKey || event.altKey) return;
  const active = document.activeElement;
  if (isEditableControl(active)) return;
  if (!(active instanceof HTMLElement)) return;
  const category = active.closest(`[${KEYBOARD_GROUP_ATTR}]`);
  const testsScope = active.closest("[data-c33-tests-scope]");
  const shortcut = category?.querySelector<HTMLButtonElement>(
    "[data-c33-normal-action]:not([disabled])"
  ) ?? testsScope?.querySelector<HTMLButtonElement>(
    "[data-c33-normal-action]:not([disabled])"
  );
  if (!shortcut) return;
  event.preventDefault();
  const trigger = shortcut;
  shortcut.click();
  if (shortcut.hasAttribute("data-c33-advance-on-normal")) {
    scheduleFocusAdjacentKeyboardGroup(trigger, 1);
  }
}
