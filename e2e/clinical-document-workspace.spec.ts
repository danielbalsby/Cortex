import { expect, test } from "@playwright/test";

const route = "/prototype/clinical-document-workspace";

test("Phase 2 renders an isolated document workspace with fixed problem context", async ({
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

test("Phase 2 section navigation and companion regions are structurally complete", async ({
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

test("history interactions preserve shared state without premature journal claims", async ({
  page
}) => {
  await page.goto(route);

  await page.getByRole("group", { name: "Side" }).getByRole("button", { name: "Højre" }).click();
  await page.getByRole("group", { name: "Debut" }).getByRole("button", { name: "Gradvis" }).click();
  const duration = page.getByLabel("Varighed");
  await duration.pressSequentially("seks måneder");
  await expect(duration).toHaveValue("seks måneder");
  await page
    .getByRole("group", { name: "Udløsende faktor" })
    .getByRole("button", { name: "Traume", exact: true })
    .click();
  await expect(page.getByLabel("Traumeoplysninger")).toBeVisible();
  await page
    .getByRole("group", { name: "Traumemekanisme" })
    .getByRole("button", { name: "Vrid på fikseret fod" })
    .click();
  await page.getByLabel("Anden mekanisme eller beskrivelse").fill("Vrid under sport");
  await page
    .getByRole("group", { name: "Udløsende faktor" })
    .getByRole("button", { name: "Intet identificeret traume" })
    .click();
  await expect(page.getByLabel("Traumeoplysninger")).toHaveCount(0);
  await page
    .getByRole("group", { name: "Udløsende faktor" })
    .getByRole("button", { name: "Traume", exact: true })
    .click();
  await expect(
    page
      .getByRole("group", { name: "Traumemekanisme" })
      .getByRole("button", { name: "Vrid på fikseret fod" })
  ).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByLabel("Anden mekanisme eller beskrivelse")).toHaveValue("");

  const pattern = page.getByRole("group", { name: "Smertemønster" });
  await pattern.getByRole("button", { name: "Konstant" }).click();
  await pattern.getByRole("button", { name: "Intermitterende" }).click();
  await expect(pattern.getByRole("button", { name: "Konstant" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );

  await page.getByRole("button", { name: "Standard", exact: true }).click();
  await page.getByLabel("Supplerende anamnese").fill("Tidligere lignende gener");
  await page.getByRole("button", { name: "Quick", exact: true }).click();
  await expect(page.getByText("Yderligere anamnestiske oplysninger er bevaret i Standard.")).toBeVisible();
  await page.getByRole("button", { name: "Standard", exact: true }).click();
  await expect(page.getByLabel("Supplerende anamnese")).toHaveValue("Tidligere lignende gener");

  await expect(page.getByLabel("Live journalnotat")).toHaveText("Problem: Knæsmerte");
});

test("grouped examination confirmation is explicit and a positive exception survives clearing", async ({
  page
}) => {
  await page.goto(route);

  await page.getByRole("button", { name: "Bekræft basisundersøgelse normal" }).click();
  await page.getByText("Vis hvilke fund handlingen bekræfter").click();
  await expect(page.getByText("Bekræftet af gruppen")).toHaveCount(8);

  await page.getByText("Registrér fund og undtagelser").click();
  const effusion = page.getByRole("group", { name: "Effusion" });
  await effusion.getByRole("button", { name: "Let", exact: true }).click();
  await expect(effusion.getByRole("button", { name: "Let", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(page.getByRole("region", { name: "Klinisk overblik" })).toContainText("Effusion");
  await expect(page.getByText("Erstattet af registreret fund")).toHaveCount(1);

  await page.getByRole("button", { name: "Fjern grupperet bekræftelse" }).click();
  await expect(effusion.getByRole("button", { name: "Let", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
});

test("suggestions remain separate until accepted and multiple diagnoses can be ordered", async ({
  page
}) => {
  await page.goto(route);
  await page
    .getByRole("group", { name: "Udløsende faktor" })
    .getByRole("button", { name: "Traume", exact: true })
    .click();
  await expect(page.getByLabel("Diagnostiske forslag")).toHaveCount(0);
  await page
    .getByRole("group", { name: "Debut" })
    .getByRole("button", { name: "Akut", exact: true })
    .click();
  await page.getByLabel("Varighed").pressSequentially("to dage");
  await page
    .getByRole("group", { name: "Side" })
    .getByRole("button", { name: "Højre", exact: true })
    .click();
  await page
    .getByRole("group", { name: "Traumemekanisme" })
    .getByRole("button", { name: "Vrid på fikseret fod" })
    .click();
  await page
    .getByRole("group", { name: "Smertelokalisation" })
    .getByRole("button", { name: "Medialt" })
    .click();
  await page
    .getByRole("group", { name: "Instabilitet" })
    .getByRole("button", { name: "Ja" })
    .click();

  const suggestions = page.getByLabel("Diagnostiske forslag");
  await expect(suggestions.getByRole("listitem")).toHaveCount(3);
  await expect(page.getByText("Ingen valgt.")).toBeVisible();

  const meniscus = suggestions.getByRole("listitem").filter({ hasText: "Meniskrelaterede gener" });
  const sprain = suggestions.getByRole("listitem").filter({ hasText: "Knæforstuvning" });
  await meniscus.getByRole("button", { name: "Tilføj", exact: true }).click();
  await sprain.getByRole("button", { name: "Tilføj", exact: true }).click();
  await expect(page.getByRole("region", { name: "Klinisk overblik" })).toContainText(
    "Meniskrelaterede gener · Knæforstuvning"
  );

  await page.getByRole("button", { name: "Flyt Knæforstuvning op" }).click();
  await expect(page.getByRole("region", { name: "Klinisk overblik" })).toContainText(
    "Knæforstuvning · Meniskrelaterede gener"
  );
  await suggestions.getByRole("button", { name: "Vis flere" }).click();
  await expect(suggestions.getByRole("listitem")).toHaveCount(4);
});

test("imaging requires explicit compatible detail and clears when deactivated", async ({ page }) => {
  await page.goto(route);
  await page
    .getByRole("group", { name: "Planhandlinger" })
    .getByRole("button", { name: "Billeddiagnostik" })
    .click();

  const imaging = page.getByLabel("Billeddiagnostisk plan");
  const imagingStatus = imaging.getByRole("combobox", { name: "Status", exact: true });
  const imagingAction = imaging.getByRole("combobox", {
    name: "Planlagt handling",
    exact: true
  });
  await expect(imaging).toContainText("Mangler: Status, Planlagt handling.");
  await expect(imagingAction).toBeDisabled();
  await expect(imaging).toContainText("Vælg status før planlagt handling.");
  await imagingStatus.selectOption("planned");
  await expect(imagingAction).toBeEnabled();
  await imagingAction.selectOption("prepare-referral");
  await expect(
    imagingStatus.getByRole("option", { name: "Ikke indiceret aktuelt" })
  ).toHaveAttribute("disabled", "");
  await expect(imaging).toContainText(
    "Ryd planlagt handling før skift til en inkompatibel status."
  );
  await imaging.getByRole("combobox", { name: "Modalitet", exact: true }).selectOption("acute-x-ray");
  await imaging.getByRole("combobox", { name: "Side", exact: true }).selectOption("right");
  await imaging
    .getByLabel("Indikation", { exact: true })
    .fill("Traume og manglende evne til fire skridt");
  await imaging.getByLabel("Klinisk spørgsmål", { exact: true }).fill("Fraktur?");
  await expect(imaging.getByText("Mangler oplysninger")).toHaveCount(0);

  await page
    .getByRole("group", { name: "Planhandlinger" })
    .getByRole("button", { name: "Billeddiagnostik" })
    .click();
  await expect(imaging).toHaveCount(0);

  await page
    .getByRole("group", { name: "Planhandlinger" })
    .getByRole("button", { name: "Billeddiagnostik" })
    .click();
  await expect(page.getByLabel("Billeddiagnostisk plan")).toContainText(
    "Mangler: Status, Planlagt handling."
  );
});

test("production workflow remains available at the root route", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Knæsmerter", level: 1 })).toBeVisible();
  await expect(page.getByText("Cortex Encounter")).toBeVisible();
});
