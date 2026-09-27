import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/sprint-1-2-c2-1";

async function select(page: Page, name: string, value: string) {
  await page.getByRole("combobox", { name, exact: true }).selectOption(value);
}

test("blank inline slots remain absent and create no journal facts", async ({ page }) => {
  await page.goto(route);

  await expect(page.getByText("Sprint 1.2 · C2.1 inline narrative comparator")).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Debut" })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Side" })).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue("");
  await expect(page.getByText("Afventer eksplicit registrering.", { exact: true })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Cortex Overblik" })).toContainText("0 af 5 områder belyst");
});

test("identical fixture state produces text-identical journals in C2 and C2.1", async ({ page }) => {
  await page.goto("/prototype/sprint-1-2-c2");
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const c2Journal = await page.getByRole("textbox", { name: "Redigerbart journaludkast" }).inputValue();

  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(c2Journal);
});

test("one explicit negative creates only the existing matching negative fact", async ({ page }) => {
  await page.goto(route);
  await select(page, "Aflåsning", "no");

  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue("Anamnese\nIngen ægte aflåsning.");
  await expect(journal).not.toHaveValue(/ingen feber|ingen instabilitet|ingen hævelse|normal/i);
});

test("existing multi-valued concepts remain multi-select in narrative context", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("group", { name: "Smerteprovokation" }).getByRole("button", { name: "trapper" }).click();
  await page.getByRole("group", { name: "Smerteprovokation" }).getByRole("button", { name: "rotation" }).click();
  await page.getByRole("button", { name: "Objektivt" }).click();
  await page.getByRole("group", { name: "Ømme strukturer" }).getByRole("button", { name: "medial ledlinje" }).click();
  await page.getByRole("group", { name: "Ømme strukturer" }).getByRole("button", { name: "MCL" }).click();

  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue(/Smerterne provokeres ved trappegang og rotation/);
  await expect(journal).toHaveValue(/Palpationsømhed ved mediale ledlinje og MCL/);
});

test("inline free text commits only to its existing matching clinical field", async ({ page }) => {
  await page.goto(route);
  await select(page, "Traume", "yes");
  await select(page, "Traumemekanisme", "twisting");
  await page.getByRole("textbox", { name: "Traumekontekst" }).pressSequentially("under håndboldtræning");
  await page.keyboard.press("Tab");
  await select(page, "Smerteplacering", "medial");

  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue(/efter vridtraume under håndboldtræning/);
  await expect(journal).toHaveValue(/Mediale smerter/);
  await expect(journal).not.toHaveValue(/fodbold|siden i går/);
});

test("manual draft text is never reverse-parsed and becomes stale after fact changes", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await journal.fill("Ingen feber. Manuel drafttekst.");

  await expect(page.getByRole("combobox", { name: "Feber" })).toHaveValue("");
  await select(page, "Smerteforløb", "increasing");
  await expect(page.getByRole("status")).toContainText("ikke parsed tilbage til state");
  await expect(journal).toHaveValue("Ingen feber. Manuel drafttekst.");
  await expect(page.getByRole("combobox", { name: "Feber" })).toHaveValue("");
});

test("keyboard can choose an inline value and move freely between core sections", async ({ page }) => {
  await page.goto(route);
  const onset = page.getByRole("combobox", { name: "Debut" });
  await onset.focus();
  await page.keyboard.press("ArrowDown");
  await expect(onset).toHaveValue("acute");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("combobox", { name: "Side" })).toBeFocused();

  const objective = page.getByRole("button", { name: "Objektivt" });
  await objective.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("region", { name: "Objektivt inline-arbejdsområde" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("combobox", { name: "Gang" })).toBeFocused();
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 720 }]) {
  test(`core narrative remains readable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(route);
    const fontSize = await page.getByTestId("c21-inline-anamnese").evaluate((element) => Number.parseFloat(getComputedStyle(element.querySelector("p")!).fontSize));
    const controlSize = await page.getByRole("combobox", { name: "Debut" }).evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    await expect(fontSize).toBeGreaterThanOrEqual(18);
    await expect(controlSize).toBeGreaterThanOrEqual(16);
    await expect(page.getByRole("complementary", { name: "Cortex Overblik" })).toBeVisible();
  });
}
