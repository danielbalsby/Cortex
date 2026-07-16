import type { Page } from "@playwright/test";

export function field(page: Page, name: string) {
  return page.getByRole("group", { name, exact: true });
}

export async function choose(page: Page, fieldName: string, optionName: string) {
  await field(page, fieldName).getByRole("button", { name: optionName, exact: true }).click();
}

export function activeOutputs(page: Page) {
  return page.getByRole("navigation", { name: "Aktive outputs" });
}

export function outputDraft(page: Page) {
  return page.getByLabel("Aktivt outputudkast");
}
