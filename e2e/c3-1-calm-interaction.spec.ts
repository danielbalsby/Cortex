import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/c3-1-calm-interaction";

function moduleRegion(page: Page, name: string) {
  return page.getByRole("region", { name });
}

async function openModule(page: Page, name: string) {
  const region = moduleRegion(page, name);
  await region.getByRole("button", { name: "Redigér" }).click();
  return region;
}

test("C3.1 keeps one calm edit surface and returns focus when completed", async ({ page }) => {
  await page.goto(route);
  const history = await openModule(page, "Anamnese");

  await expect(page.getByLabel(/redigering$/)).toHaveCount(1);
  await expect(history.getByRole("radio", { name: "Højre" })).toBeFocused();
  await history.getByRole("button", { name: "Færdig" }).click();
  await expect(page.getByLabel(/redigering$/)).toHaveCount(0);
  await expect(history.getByRole("button", { name: "Redigér" })).toBeFocused();
});

test("C3.1 uses direct short choices, local arrow navigation and commit-on-Enter", async ({ page }) => {
  await page.goto(route);
  const history = await openModule(page, "Anamnese");
  const right = history.getByRole("radio", { name: "Højre" });

  await right.check();
  await right.focus();
  await page.keyboard.press("Enter");
  await expect(history.getByRole("radio", { name: "Akut" })).toBeFocused();
  await history.getByRole("radio", { name: "Akut" }).check();

  const duration = history.getByRole("textbox", { name: /Varighed/ });
  await duration.fill("siden i går");
  await page.keyboard.press("Enter");
  await expect(history.getByRole("combobox", { name: "Smerteforløb" })).toBeFocused();
  await expect(history.getByText("Gem", { exact: true })).toHaveCount(0);

  const tabs = history.getByRole("tablist", { name: "Anamneseområder" });
  await tabs.getByRole("tab", { name: "Problem og forløb" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: "Traume og smerte" })).toBeFocused();
  await expect(tabs.getByRole("tab", { name: "Traume og smerte" })).toHaveAttribute("aria-selected", "true");
});

test("C3.1 keeps blank silent and places exceptional states behind secondary access", async ({ page }) => {
  await page.goto(route);
  const history = await openModule(page, "Anamnese");

  await expect(history.getByText("Ikke vurderet", { exact: true })).toHaveCount(0);
  await history.getByRole("tab", { name: "Funktion" }).click();
  await expect(history.getByRole("radio", { name: "Aflåsning" })).toHaveCount(0);
  await history.getByText("Særlige registreringer").click();
  await expect(history.getByRole("group", { name: "Aflåsning" }).getByRole("button", { name: "Ikke vurderet" })).toBeVisible();
});

test("C3.1 records normal ROM explicitly and keeps palpation mutually exclusive", async ({ page }) => {
  await page.goto(route);
  const objective = await openModule(page, "Objektivt");

  await objective.getByRole("button", { name: "Registrér normal ROM 0–140°" }).click();
  await expect(objective.getByRole("textbox", { name: /Ekstension/ })).toHaveValue("0");
  await expect(objective.getByRole("textbox", { name: /Fleksion/ })).toHaveValue("140");

  await objective.getByRole("tab", { name: "Palpation" }).click();
  const noTenderness = objective.getByRole("checkbox", { name: "Ingen fokal ømhed" });
  const mcl = objective.getByRole("checkbox", { name: "MCL" });
  await noTenderness.check();
  await mcl.check();
  await expect(mcl).toBeChecked();
  await expect(noTenderness).not.toBeChecked();
});

test("C3.1 presents compact plan commitments with provenance on demand", async ({ page }) => {
  await page.goto(route);
  const plan = await openModule(page, "Plan");

  await plan.getByRole("button", { name: /Fortsat observation af forløbet/ }).click();
  const entry = plan.getByRole("article", { name: "Commitment C3-PLAN-001" });
  await expect(entry).toContainText("Fortsat observation af forløbet.");
  await expect(entry.getByText(/C3-FIX-001/)).not.toBeVisible();
  await entry.getByText("Provenance").click();
  await expect(entry.getByText(/C3-FIX-001/)).toBeVisible();
});

test("C3.1 renders Quick and Standard as PSOAP views from the same revision", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Indlæs syntetisk case" }).click();
  const documents = await openModule(page, "Dokumentation");
  const standard = documents.getByRole("textbox", { name: "Standard dokumentudkast" });
  const standardText = await standard.inputValue();

  expect(standardText).toMatch(/^P:/u);
  expect(standardText).toContain("\n\nS:");
  expect(standardText).toContain("\n\nO:");
  expect(standardText).toContain("\n\nA:");
  expect(standardText.lastIndexOf("\n\nP:")).toBeGreaterThan(0);

  await documents.getByRole("radio", { name: "Quick" }).check();
  const quickText = await documents.getByRole("textbox", { name: "Quick dokumentudkast" }).inputValue();
  expect(quickText).not.toBe(standardText);
  expect(quickText).toMatch(/^P:/u);

  const trace = page.getByText("Teknisk evalueringsspor");
  await trace.click();
  await expect(page.getByText("Revision", { exact: true }).locator("..")).toContainText("R1");
  await expect(page.getByRole("complementary", { name: "Cortex Overblik" })).not.toContainText(/af 5 områder belyst/u);
});
