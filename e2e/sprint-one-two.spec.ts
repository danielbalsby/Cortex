import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/sprint-1-2";

async function select(page: Page, name: string, value: string) {
  await page.getByRole("combobox", { name, exact: true }).selectOption(value);
}

test("Sprint 1.2 starts blank and does not turn missing information into facts", async ({ page }) => {
  await page.goto(route);

  await expect(page.getByText("Sprint 1.2 · one-page IA comparator")).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Debut" })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Traume" })).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue("");
  await expect(page.getByRole("link", { name: "Åbn Sprint 1.1-baseline" })).toHaveAttribute("href", "/prototype/sprint-1-1");
  await expect(page.getByRole("tab", { name: /Anamnese/ })).toContainText("Ingen anamnese afklaret");
  await expect(page.getByRole("tab", { name: /Objektivt/ })).toContainText("Ingen objektive fund afklaret");
});

test("the shared Sprint 1.1 fixture produces the same bounded clinical narrative", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();

  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue(/34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går/);
  await expect(journal).toHaveValue(/Mediale smerter og let hævelse/);
  await expect(journal).toHaveValue(/Ingen ægte aflåsning/);
  await expect(journal).not.toHaveValue(/ingen instabilitet|normal gang|objektivt/i);
  await expect(page.getByRole("combobox", { name: "Smerteforløb" })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Funktionsevne" })).toHaveValue("");
});

test("clinical state survives navigation while all four domain summaries remain visible", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("textbox", { name: "Varighed" }).fill("tre dage");
  await page.getByRole("tab", { name: /Objektivt/ }).click();
  await select(page, "Gang", "limp");

  await expect(page.getByRole("tab", { name: /Anamnese/ })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Objektivt/ })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Vurdering/ })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Plan/ })).toBeVisible();

  await page.getByRole("tab", { name: /Anamnese/ }).click();
  await expect(page.getByRole("textbox", { name: "Varighed" })).toHaveValue("tre dage");
  await page.getByRole("tab", { name: /Objektivt/ }).click();
  await expect(page.getByRole("combobox", { name: "Gang" })).toHaveValue("limp");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(/34-årig mand tre dage\.\n\nObjektivt\nHaltende gang\./);
});

test("parent corrections expose recovery and retain the baseline pruning semantics", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveValue("twisting");

  await select(page, "Traume", "no");
  await expect(page.getByRole("status")).toContainText("Traumemekanisme og -kontekst blev fjernet");
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).not.toHaveValue(/vridtraume|under fodbold/i);

  await select(page, "Traume", "yes");
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Traumekontekst" })).toHaveValue("");
});

test("explicit uncertainty remains unresolved and absent from the generated journal", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("tab", { name: /Objektivt/ }).click();
  await select(page, "Gang", "not-assessed");

  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue("");
  await expect(page.getByRole("complementary", { name: "Cortex Overblik og journal" })).toContainText("Gang");
  await expect(page.getByRole("tab", { name: /Objektivt/ })).toContainText("uafklaret");
});

test("the comparator records navigation and revisits without changing clinical state", async ({ page }) => {
  await page.goto(route);
  const metrics = page.getByTestId("sprint-1-2-metrics");
  await expect(metrics).toContainText("Navigation 0");
  await expect(metrics).toContainText("Kliniske handlinger 0");
  await expect(metrics).toContainText("Sektionstilbagevendinger 0");

  await page.getByRole("tab", { name: /Objektivt/ }).click();
  await page.getByRole("tab", { name: /Vurdering/ }).click();
  await page.getByRole("tab", { name: /Objektivt/ }).click();
  await select(page, "Gang", "normal");

  await expect(metrics).toContainText("Navigation 3");
  await expect(metrics).toContainText("Kliniske handlinger 1");
  await expect(metrics).toContainText("Sektionstilbagevendinger 1");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(/Normal gang\./);
});

test("section navigation is keyboard operable", async ({ page }) => {
  await page.goto(route);
  const objective = page.getByRole("tab", { name: /Objektivt/ });
  await objective.focus();
  await page.keyboard.press("Enter");

  await expect(objective).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Basis og ROM");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("combobox", { name: "Gang" })).toBeFocused();
});
