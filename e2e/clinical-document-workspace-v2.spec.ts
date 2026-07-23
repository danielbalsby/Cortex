import { expect, test } from "@playwright/test";

const route = "/prototype/clinical-document-workspace-v2";

test("v2 renders narrative-first workspace with cockpit", async ({ page }) => {
  await page.goto(route);

  await expect(page.getByText("ISOLERET · UX-EKSPERIMENT V2", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Knæsmerter", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cockpit", level: 2 })).toBeVisible();
  await expect(page.getByText(/Narrativ først/i)).toBeVisible();
  await expect(
    page.getByText(/ingen kliniske oplysninger registreret endnu/i).first()
  ).toBeVisible();
});

test("cockpit gap navigates to trauma panel", async ({ page }) => {
  await page.goto(route);

  await page.getByRole("button", { name: "Ændr situation" }).click();
  await page.getByRole("group", { name: "Side" }).getByRole("button", { name: "Højre" }).click();
  await page.getByRole("group", { name: "Debut" }).getByRole("button", { name: "Akut" }).click();
  await page
    .getByRole("group", { name: "Udløsende faktor" })
    .getByRole("button", { name: "Traume", exact: true })
    .click();

  const gap = page.getByRole("button", { name: /Traumemekanisme mangler/i });
  await expect(gap).toBeVisible();
  await gap.click();

  await expect(page.getByRole("group", { name: "Traumemekanisme" })).toBeVisible();
  await expect(page.locator("#v2-focus-history-trauma")).toBeFocused();
});

test("keyboard shortcuts move between sections and confirm normals", async ({ page }) => {
  await page.goto(route);

  await page.locator("body").click();
  await page.keyboard.press("2");
  await expect(page.locator("#v2-focus-objective-exam")).toBeFocused();

  await page.keyboard.press("n");
  await expect(page.getByText(/Basisundersøgelse eksplicit bekræftet normal/i)).toBeVisible();

  await page.keyboard.press("3");
  await expect(page.locator("#v2-focus-assessment")).toBeFocused();
});

test("journal uses clinical plan prose and preserves state across mode switch", async ({
  page
}) => {
  await page.goto(route);

  await page.getByRole("button", { name: "Ændr situation" }).click();
  await page.getByRole("group", { name: "Side" }).getByRole("button", { name: "Højre" }).click();
  await page.getByRole("group", { name: "Debut" }).getByRole("button", { name: "Akut" }).click();

  await page.getByRole("button", { name: "Redigér plan" }).click();
  await page
    .getByRole("group", { name: "Planhandlinger" })
    .getByRole("button", { name: "Fysioterapi" })
    .click();

  const journal = page.getByLabel("Live journalnotat");
  await expect(journal).toContainText("fysioterapeutisk rehabilitering");
  await expect(journal).not.toContainText("Fysioterapi indgår i planen");

  await page.getByRole("button", { name: "Standard", exact: true }).click();
  await expect(page.getByText("Visning:").locator("..")).toContainText("Standard");
  await expect(journal).toContainText("Højresidige knæsmerter");
  await expect(journal).toContainText("fysioterapeutisk rehabilitering");

  await page.getByRole("button", { name: "Quick", exact: true }).click();
  await expect(journal).toContainText("Højresidige knæsmerter");
});

test("epistemic lanes keep assessment visually distinct from suggestions until accepted", async ({
  page
}) => {
  await page.goto(route);

  await page.getByRole("button", { name: "Ændr situation" }).click();
  await page.getByRole("group", { name: "Side" }).getByRole("button", { name: "Højre" }).click();
  await page.getByRole("group", { name: "Debut" }).getByRole("button", { name: "Akut" }).click();
  await page
    .getByRole("group", { name: "Udløsende faktor" })
    .getByRole("button", { name: "Traume", exact: true })
    .click();

  await page.getByRole("button", { name: "Vælg / redigér vurdering" }).click();
  await page.getByRole("button", { name: "Tilføj", exact: true }).first().click();

  await expect(page.getByText("Klinikerens vurdering").first()).toBeVisible();
  await expect(page.getByText("Primær", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Live journalnotat")).toContainText("Primær arbejdshypotese");
});
