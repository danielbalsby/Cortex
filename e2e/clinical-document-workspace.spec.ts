import { expect, test } from "@playwright/test";

const route = "/prototype/clinical-document-workspace";

test("Quick and Standard share one preserved prototype state", async ({ page }) => {
  await page.goto(route);

  await page.getByRole("button", { name: /^Gradvis belastningssmerte/ }).click();
  await expect(page.getByRole("button", { name: "Quick", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  await page.getByRole("button", { name: "Standard", exact: true }).click();
  const location = page.getByRole("group", { name: "Smertelokalisation" });
  await location.getByRole("button", { name: "Diffus", exact: true }).click();

  await page.getByRole("button", { name: "Quick", exact: true }).click();
  await expect(location).toBeHidden();
  await page.getByRole("button", { name: "Standard", exact: true }).click();
  await expect(location.getByRole("button", { name: "Diffus", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(page.getByLabel("Live journalnotat")).toContainText("diffuse smerter");
});

test("grouped normal findings require activation and remain inspectable", async ({ page }) => {
  await page.goto(route);

  const note = page.getByLabel("Live journalnotat");
  const rednessFinding = page.getByRole("listitem").filter({ hasText: "Ingen rødme" });
  await expect(rednessFinding).toContainText("Ikke registreret");
  await expect(note).not.toContainText("Ingen rødme");

  await page.getByRole("button", { name: "Bekræft fund" }).click();

  await expect(rednessFinding).toContainText("Bekræftet");
  await expect(note).toContainText("ingen rødme");
});

test("a positive finding visibly overrides a conflicting grouped normal finding", async ({
  page
}) => {
  await page.goto(route);

  await page.getByRole("button", { name: "Bekræft fund" }).click();
  await page
    .getByRole("group", { name: "Effusion" })
    .getByRole("button", { name: "Moderat", exact: true })
    .click();

  const effusionFinding = page
    .getByRole("listitem")
    .filter({ hasText: "Ingen betydende effusion" });
  const note = page.getByLabel("Live journalnotat");

  await expect(effusionFinding).toContainText("Overstyret af positivt fund");
  await expect(note).toContainText("moderat effusion");
  await expect(note).not.toContainText("ingen betydende effusion");
});
