import { expect, test } from "@playwright/test";

const route = "/prototype/clinical-document-workspace-document-first";

test("starts as a clinical document with contextual completion kept secondary", async ({
  page
}) => {
  await page.goto(route);

  await expect(
    page.getByText("ISOLERET UX-EKSPERIMENT · SYNTETISKE DATA", { exact: true })
  ).toBeVisible();

  const document = page.getByRole("article", { name: "Knæsmerter" });
  await expect(document.getByRole("heading", { level: 2 })).toHaveText([
    "Anamnese",
    "Objektivt",
    "Vurdering",
    "Plan"
  ]);
  await expect(document).toContainText("Ingen anamnestiske oplysninger registreret.");
  await expect(document).toContainText("Ingen objektive fund registreret.");
  await expect(document).toContainText("Ingen arbejdshypoteser registreret.");
  await expect(document).toContainText("Ingen planhandlinger registreret.");

  await expect(page.getByRole("group", { name: "Side" })).toHaveCount(0);
  await expect(page.getByRole("complementary", {
    name: "Kontekstuel fuldførelse og sammenligning"
  })).toBeVisible();
  await expect(page.getByText("Fravær af opmærksomhedspunkter bekræfter ikke klinisk sikkerhed.")).toBeVisible();
});

test("inline missing information opens focused controls and records only explicit facts", async ({
  page
}) => {
  await page.goto(route);

  const history = page.getByRole("region", { name: "Anamnese" });
  await history.getByRole("button", { name: "+ Side", exact: true }).click();
  const side = page.getByRole("group", { name: "Side" });
  await expect(side).toBeVisible();
  await side.getByRole("button", { name: "Højre", exact: true }).click();

  await expect(history).toContainText("Højresidige knæsmerter.");
  await expect(history.getByRole("button", { name: "+ Side", exact: true })).toHaveCount(0);
  await expect(history).not.toContainText(/ingen feber|ingen hævelse|normal funktion/i);
  await expect(page.getByText("Knapklik").locator("..")).toContainText("2");
});

test("the acute twisting scenario populates the shared model without choosing assessment or plan", async ({
  page
}) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Indlæs akut vridscenarie" }).click();

  await expect(page.getByRole("heading", { name: "Højre knæsmerter", level: 1 })).toBeVisible();
  const document = page.getByRole("article", { name: "Højre knæsmerter" });
  await expect(document).toContainText(
    "Højresidige knæsmerter med akut debut siden i går. Traume registreret med vrid på fikseret fod."
  );
  await expect(document).toContainText("Patienten kan ikke tage fire vægtbærende skridt.");
  await expect(document).toContainText("Haltende gang, let effusion, reduceret ekstension");
  await expect(document).toContainText("Ingen arbejdshypoteser registreret.");
  await expect(document).toContainText("Ingen planhandlinger registreret.");
  await expect(document).not.toContainText(/Primær arbejdshypotese|Plan:/);

  await expect(page.getByLabel("Dokumentbaserede forslag")).toBeVisible();
  await expect(page.getByText("Afklar frakturscreening").first()).toBeVisible();
  await expect(page.getByText("Knapklik").locator("..")).toContainText("0");
});

test("a suggestion remains outside the document until the clinician explicitly adds it", async ({
  page
}) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Indlæs akut vridscenarie" }).click();

  const suggestions = page.getByLabel("Dokumentbaserede forslag");
  const suggestionLabel = "Knæforstuvning";
  const suggestion = suggestions.getByRole("listitem").filter({ hasText: suggestionLabel });

  const assessment = page.getByRole("region", { name: "Vurdering" });
  await expect(assessment).not.toContainText(suggestionLabel);
  await suggestion.getByRole("button", { name: "Tilføj", exact: true }).click();
  await expect(assessment).toContainText(`Primær arbejdshypotese: ${suggestionLabel}.`);
});
