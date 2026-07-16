import { expect, test } from "@playwright/test";

import { activeOutputs, choose, field, outputDraft } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Knæsmerter", level: 1 })).toBeVisible();
});

test("empty consultation contains no implicit clinical facts", async ({ page }) => {
  await expect(page.getByRole("group").getByRole("button", { pressed: true })).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Klinisk sparring" })).toHaveCount(0);

  const outputs = activeOutputs(page);
  await expect(outputs.getByRole("button")).toHaveCount(1);
  await expect(outputs.getByRole("button", { name: /^PSOAP-journal/ })).toContainText("3 mangler");
  await expect(outputs.getByRole("button", { name: /^PSOAP-journal/ })).not.toContainText("Klar");
  await expect(page.getByText("Manglende eller utilstrækkeligt beskrevet")).toBeVisible();
  await expect(outputDraft(page)).toHaveText("");
  await expect(page.getByText("Ingen regelbaserede akutte opmærksomhedspunkter udløst.")).toBeVisible();
  await expect(page.getByText("Kontrollér klinisk indhold, modtager og lokale krav før brug.")).toBeVisible();
});

test("trauma fields prune stale answers and reopen empty", async ({ page }) => {
  await choose(page, "Traume", "Ja");
  await expect(field(page, "Traumemekanisme")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Traumespor" })).toBeVisible();

  await choose(page, "Traumemekanisme", "Vrid");
  await choose(page, "Hævelse med det samme", "Ja");
  await expect(outputDraft(page)).toContainText("Traume ved vrid.");
  await expect(outputDraft(page)).toContainText("Hævelse opstod umiddelbart efter traumet.");

  await choose(page, "Traume", "Nej");
  await expect(field(page, "Traumemekanisme")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Traumespor" })).toHaveCount(0);
  await expect(outputDraft(page)).toContainText("Intet traume.");
  await expect(outputDraft(page)).not.toContainText("Traume ved vrid.");
  await expect(outputDraft(page)).not.toContainText("Hævelse opstod umiddelbart efter traumet.");

  await choose(page, "Traume", "Ja");
  await expect(field(page, "Traumemekanisme").getByRole("button", { name: "Vrid" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );
  await expect(
    field(page, "Hævelse med det samme").getByRole("button", { name: "Ja" })
  ).toHaveAttribute("aria-pressed", "false");
});

test("fracture suggestion requires both findings and explicit acceptance", async ({ page }) => {
  await choose(page, "Belastning", "Kan ikke støtte");
  await expect(page.getByRole("region", { name: "Klinisk sparring" })).toHaveCount(0);
  await expect(
    field(page, "Arbejdsdiagnose").getByRole("button", { name: "Frakturmistanke" })
  ).toHaveAttribute("aria-pressed", "false");

  await choose(page, "Traume", "Ja");
  const suggestionPanel = page.getByRole("region", { name: "Klinisk sparring" });
  const fractureSuggestion = suggestionPanel.getByRole("button", { name: /Frakturmistanke/ });
  await expect(fractureSuggestion).toBeVisible();
  await expect(fractureSuggestion).toContainText("2 af 2 støttende fund");
  await expect(
    field(page, "Arbejdsdiagnose").getByRole("button", { name: "Frakturmistanke" })
  ).toHaveAttribute("aria-pressed", "false");

  await fractureSuggestion.click();
  await expect(
    field(page, "Arbejdsdiagnose").getByRole("button", { name: "Frakturmistanke" })
  ).toHaveAttribute("aria-pressed", "true");

  await choose(page, "Traume", "Nej");
  await expect(page.getByRole("region", { name: "Klinisk sparring" })).toHaveCount(0);
});

test("Ottawa-related alert activates, clears, and remains non-blocking", async ({ page }) => {
  const alertText = page.getByText("Overvej relevansen af Ottawa Knee Rules og akut billeddiagnostik.");

  await choose(page, "Traume", "Ja");
  await expect(alertText).toHaveCount(0);
  await choose(page, "Belastning", "Kan ikke støtte");
  await expect(alertText).toBeVisible();

  await choose(page, "Side", "Højre");
  await expect(field(page, "Side").getByRole("button", { name: "Højre" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  await choose(page, "Traume", "Nej");
  await expect(alertText).toHaveCount(0);
});

test("dynamic outputs activate, deactivate, and coexist", async ({ page }) => {
  const outputs = activeOutputs(page);
  const plan = field(page, "Tiltag");
  const physioOutput = outputs.getByRole("button", { name: /^Fysioterapihenvisning/ });
  const xrayOutput = outputs.getByRole("button", { name: /^Røntgenhenvisning/ });
  const orthopedicOutput = outputs.getByRole("button", { name: /^Ortopædkirurgisk henvisning/ });

  await plan.getByRole("button", { name: "Fysioterapi" }).click();
  await expect(physioOutput).toBeVisible();
  await physioOutput.click();
  await plan.getByRole("button", { name: "Fysioterapi" }).click();
  await expect(physioOutput).toHaveCount(0);
  await expect(outputDraft(page)).toHaveText("");

  await plan.getByRole("button", { name: "Røntgen" }).click();
  await expect(xrayOutput).toBeVisible();
  await plan.getByRole("button", { name: "Røntgen" }).click();
  await expect(xrayOutput).toHaveCount(0);

  await plan.getByRole("button", { name: "Ortopædkirurgisk henvisning" }).click();
  await expect(orthopedicOutput).toBeVisible();
  await plan.getByRole("button", { name: "Ortopædkirurgisk henvisning" }).click();
  await expect(orthopedicOutput).toHaveCount(0);

  await plan.getByRole("button", { name: "Fysioterapi" }).click();
  await plan.getByRole("button", { name: "Røntgen" }).click();
  await plan.getByRole("button", { name: "Ortopædkirurgisk henvisning" }).click();
  await expect(outputs.getByRole("button")).toHaveCount(4);
  await expect(physioOutput).toBeVisible();
  await expect(xrayOutput).toBeVisible();
  await expect(orthopedicOutput).toBeVisible();
});

test("PSOAP groups history and trauma track into one subjective group", async ({ page }) => {
  await expect(outputDraft(page)).toHaveText("");

  await choose(page, "Traume", "Ja");
  await choose(page, "Traumemekanisme", "Vrid");
  await choose(page, "Hævelse med det samme", "Ja");

  const subjectiveGroups = await outputDraft(page).evaluate((element) =>
    element.textContent?.split("\n").filter((line) => line.startsWith("S:")) ?? []
  );
  expect(subjectiveGroups).toHaveLength(1);
  expect(subjectiveGroups[0]).toContain("Traume ved vrid.");
  expect(subjectiveGroups[0]).toContain("Hævelse opstod umiddelbart efter traumet.");

  await choose(page, "Traume", "Nej");
  const prunedText = await outputDraft(page).textContent();
  expect(prunedText?.split("\n").filter((line) => line.startsWith("S:"))).toHaveLength(1);
  expect(prunedText).toContain("Intet traume.");
  expect(prunedText).not.toContain("Traume ved vrid.");
  expect(prunedText).not.toContain("Hævelse opstod umiddelbart efter traumet.");
});

test("keyboard activation and clipboard copy work in Chromium", async ({ page }) => {
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Nulstil" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /PROBLEM Problem/ })).toBeFocused();
  await page.keyboard.press("Tab");
  const right = field(page, "Side").getByRole("button", { name: "Højre" });
  await expect(right).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(right).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Kopiér psoap-journal" }).click();
  await expect(page.getByRole("button", { name: "Kopieret" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Højresidige knæsmerter."
  );
});
