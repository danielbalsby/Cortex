import { expect, test } from "@playwright/test";

const route = "/prototype/clinical-document-workspace";

test("Phase 1 renders an isolated document workspace with fixed problem context", async ({
  page
}) => {
  await page.goto(route);

  await expect(
    page.getByText("ISOLERET · SYNTETISK PROTOTYPE", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Knæsmerter", level: 1 })).toBeVisible();

  const document = page.getByRole("article", { name: "Knæsmerter" });
  await expect(document.getByText("Problem: Knæsmerte", { exact: true })).toBeVisible();
  const headings = await document.getByRole("heading", { level: 2 }).allTextContents();

  expect(headings).toEqual(["Anamnese", "Objektivt", "Vurdering", "Plan"]);
  await expect(page.getByRole("heading", { name: "Problem" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Problem|Knæskade/ })).toHaveCount(0);
});

test("Phase 1 section navigation and companion regions are structurally complete", async ({
  page
}) => {
  await page.goto(route);

  const navigation = page.getByRole("navigation", { name: "Dokumentsektioner" });
  await expect(navigation.getByRole("link")).toHaveCount(5);
  await expect(navigation.getByRole("link", { name: /Anamnese/ })).toHaveAttribute(
    "href",
    "#prototype-history"
  );
  await expect(navigation.getByRole("link", { name: /Journal/ })).toHaveAttribute(
    "href",
    "#prototype-journal"
  );

  const overview = page.getByRole("region", { name: "Klinisk overblik" });
  await expect(overview.getByRole("listitem")).toHaveCount(4);
  await expect(overview).toContainText("Ikke vurderet");

  await expect(page.getByLabel("Live journalnotat")).toHaveText("Problem: Knæsmerte");
  await expect(page.getByLabel("Live journalnotat")).not.toContainText(
    /Anamnese|Objektivt|Vurdering|Plan/
  );
});

test("Quick and Standard are presentation modes over the same empty journal state", async ({
  page
}) => {
  await page.goto(route);

  const quick = page.getByRole("button", { name: "Quick", exact: true });
  const standard = page.getByRole("button", { name: "Standard", exact: true });

  await expect(quick).toHaveAttribute("aria-pressed", "true");
  await standard.click();
  await expect(standard).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Aktiv visning").locator("..")).toContainText("Standard");
  await expect(page.getByLabel("Live journalnotat")).toHaveText("Problem: Knæsmerte");
});

test("production workflow remains available at the root route", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Knæsmerter", level: 1 })).toBeVisible();
  await expect(page.getByText("Cortex Encounter")).toBeVisible();
});
