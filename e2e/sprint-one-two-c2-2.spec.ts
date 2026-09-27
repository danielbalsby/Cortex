import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/sprint-1-2-c2-2";

async function select(page: Page, name: string, value: string) {
  await page.getByRole("combobox", { name, exact: true }).selectOption(value);
}

async function loadFixtureAndOpenHistory(page: Page) {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  await page.getByRole("region", { name: "Anamnese" }).getByRole("button", { name: "Redigér" }).click();
}

test("C2.2 begins blank and makes only the recorded pain-location value contextual", async ({ page }) => {
  await page.goto(route);

  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue("");
  await expect(page.getByRole("button", { name: /Ret smerteplacering/i })).toHaveCount(0);

  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const history = page.getByRole("region", { name: "Anamnese" });
  await expect(history.getByRole("button", { name: "Ret smerteplacering: Medial" })).toBeVisible();
  await expect(page.getByTestId("c22-history-narrative").getByRole("button")).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Objektivt" }).getByRole("button")).toHaveCount(1);
});

test("the same fixture produces byte-identical journal text in C2 and C2.2", async ({ page }) => {
  await page.goto("/prototype/sprint-1-2-c2", { timeout: 60_000 });
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const c2Journal = await page.getByRole("textbox", { name: "Redigerbart journaludkast" }).inputValue();

  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(c2Journal);
});

test("contextual pain-location correction uses the existing fact and updates journal output", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();

  await page.getByRole("button", { name: "Ret smerteplacering: Medial" }).click();
  await page.getByRole("combobox", { name: "Ret smerteplacering kontekstnært" }).selectOption("lateral");

  await expect(page.getByRole("button", { name: "Ret smerteplacering: Lateral" })).toBeFocused();
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(/Laterale smerter/);

  await page.getByRole("region", { name: "Anamnese" }).getByRole("button", { name: "Redigér" }).click();
  await expect(page.getByRole("combobox", { name: "Smerteplacering", exact: true })).toHaveValue("lateral");
});

test("contextual correction has deterministic keyboard opening, closing and continuation", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const correction = page.getByRole("button", { name: "Ret smerteplacering: Medial" });

  await correction.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("combobox", { name: "Ret smerteplacering kontekstnært" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(correction).toBeFocused();

  await page.keyboard.press("Tab");
  const forwardFocus = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent);
  expect(forwardFocus?.trim()).toBeTruthy();
  await page.keyboard.press("Shift+Tab");
  await expect(correction).toBeFocused();
});

test("blank, explicit negative and not-assessed retain canonical meaning", async ({ page }) => {
  await page.goto(route);
  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue("");

  await page.getByRole("region", { name: "Anamnese" }).getByRole("button", { name: "Tilføj" }).click();
  await select(page, "Hævelse", "none");
  await expect(journal).toHaveValue(/Ingen hævelse/i);

  await page.getByRole("region", { name: "Objektivt" }).getByRole("button", { name: "Tilføj" }).click();
  await select(page, "Gang", "not-assessed");
  await expect(journal).toHaveValue(/Ingen hævelse/i);
  await expect(journal).not.toHaveValue(/gang/i);
});

test("trauma recovery restores explicitly and returns focus to its triggering control", async ({ page }) => {
  await loadFixtureAndOpenHistory(page);
  await select(page, "Traume", "no");

  await expect(page.getByRole("button", { name: "Gendan tidligere oplysninger" })).toBeFocused();
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).not.toHaveValue(/vridtraume|under fodbold/i);
  await page.getByRole("button", { name: "Gendan tidligere oplysninger" }).click();

  await expect(page.getByRole("combobox", { name: "Traume", exact: true })).toBeFocused();
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveValue("twisting");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(/vridtraume under fodbold/);
});

test("trauma recovery can be discarded without restoring stale facts", async ({ page }) => {
  await loadFixtureAndOpenHistory(page);
  await select(page, "Traume", "no");
  await page.getByRole("button", { name: "Kassér recovery-kopi" }).click();

  await expect(page.getByRole("combobox", { name: "Traume", exact: true })).toBeFocused();
  await expect(page.getByRole("combobox", { name: "Traume", exact: true })).toHaveValue("no");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).not.toHaveValue(/vridtraume|under fodbold/i);
});

test("swelling recovery supports both explicit restore and explicit discard", async ({ page }) => {
  await loadFixtureAndOpenHistory(page);
  await page.getByRole("textbox", { name: "Hævelsens tidsforløb" }).fill("opstået over timer");
  await page.getByRole("textbox", { name: "Hævelsens tidsforløb" }).press("Tab");
  await select(page, "Hævelse", "none");
  await expect(page.getByRole("button", { name: "Gendan tidligere oplysninger" })).toBeFocused();
  await page.getByRole("button", { name: "Gendan tidligere oplysninger" }).click();
  await expect(page.getByRole("combobox", { name: "Hævelse", exact: true })).toBeFocused();
  await expect(page.getByRole("combobox", { name: "Hævelse", exact: true })).toHaveValue("mild");
  await expect(page.getByRole("textbox", { name: "Hævelsens tidsforløb" })).toHaveValue("opstået over timer");

  await select(page, "Hævelse", "none");
  await page.getByRole("button", { name: "Kassér recovery-kopi" }).click();
  await expect(page.getByRole("combobox", { name: "Hævelse", exact: true })).toBeFocused();
  await expect(page.getByRole("combobox", { name: "Hævelse", exact: true })).toHaveValue("none");
  await expect(page.getByRole("textbox", { name: "Hævelsens tidsforløb" })).toHaveCount(0);
});

test("an unresolved recovery copy blocks a second destructive parent change", async ({ page }) => {
  await loadFixtureAndOpenHistory(page);
  await page.getByRole("textbox", { name: "Hævelsens tidsforløb" }).fill("opstået over timer");
  await page.getByRole("textbox", { name: "Hævelsens tidsforløb" }).press("Tab");
  await select(page, "Traume", "no");
  await select(page, "Hævelse", "none");

  await expect(page.getByText("Afklar den eksisterende recovery-kopi", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Gendan tidligere oplysninger" })).toBeFocused();
  await expect(page.getByRole("combobox", { name: "Hævelse", exact: true })).toHaveValue("mild");

  await page.getByRole("button", { name: "Gendan tidligere oplysninger" }).click();
  await expect(page.getByRole("combobox", { name: "Hævelse", exact: true })).toHaveValue("mild");
  await expect(page.getByRole("textbox", { name: "Hævelsens tidsforløb" })).toHaveValue("opstået over timer");
});

test("the bounded comparator remains readable at both evaluation viewports", async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 720 }]) {
    await page.setViewportSize(viewport);
    await page.goto(route);
    await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
    await expect(page.getByRole("article", { name: "Klinisk dokument" })).toBeVisible();
    await expect(page.getByRole("complementary", { name: "Cortex Overblik" })).toBeVisible();
    await expect(page.getByTestId("c22-history-narrative")).toBeVisible();
  }
});
