import { expect, test, type Locator, type Page } from "@playwright/test";

const route = "/prototype/c3-calm-clinical-workflow";

function moduleRegion(page: Page, name: string) {
  return page.getByRole("region", { name });
}

async function openModule(page: Page, name: string) {
  const region = moduleRegion(page, name);
  await region.getByRole("button", { name: "Redigér" }).click();
  return region;
}

async function loadFixture(page: Page) {
  await page.goto(route);
  await page.getByRole("button", { name: "Indlæs C3-FIX-001 facts" }).click();
}

async function selectCommitments(page: Page) {
  const plan = await openModule(page, "Plan");
  await plan.getByRole("button", { name: /Fortsat observation af forløbet/ }).click();
  await plan.getByRole("button", { name: /Ny klinisk vurdering ved vedvarende gener/ }).click();
  await plan.getByRole("button", { name: /Søg lægelig vurdering ved forværring/ }).click();
}

async function removePeriodAndSave(article: Locator) {
  const textarea = article.getByRole("textbox", { name: "Aktuel klinikerformulering" });
  const current = await textarea.inputValue();
  await textarea.fill(current.replace(/\.$/u, ""));
  await article.getByRole("button", { name: "Gem ændring" }).click();
}

test("C3-T01 keeps one calm edit module and toggles it with stable focus", async ({ page }) => {
  await page.goto(route);
  const history = moduleRegion(page, "Anamnese");
  const toggle = history.getByRole("button", { name: "Redigér" });

  await expect(page.getByLabel(/redigering$/)).toHaveCount(0);
  await toggle.click();
  await expect(page.getByLabel("Anamnese redigering")).toBeVisible();
  await expect(page.getByRole("radio", { name: "Højre" })).toBeFocused();
  await history.getByRole("button", { name: "Luk" }).click();
  await expect(page.getByLabel("Anamnese redigering")).toHaveCount(0);
  await expect(history.getByRole("button", { name: "Redigér" })).toBeFocused();

  await history.getByRole("button", { name: "Redigér" }).click();
  await moduleRegion(page, "Objektivt").getByRole("button", { name: "Redigér" }).click();
  await expect(page.getByLabel("Anamnese redigering")).toHaveCount(0);
  await expect(page.getByLabel("Objektivt redigering")).toBeVisible();
  await expect(page.getByLabel(/redigering$/)).toHaveCount(1);
});

test("C3-T02 uses explicit single choices, multi-select chips and longer lists without defaults", async ({ page }) => {
  await page.goto(route);
  const history = await openModule(page, "Anamnese");

  await expect(history.getByRole("radio", { name: "Højre" })).not.toBeChecked();
  await expect(history.getByRole("radio", { name: "Venstre" })).not.toBeChecked();
  await expect(history.getByRole("combobox", { name: "Smerteplacering" })).toHaveValue("");

  await history.getByRole("radio", { name: "Højre" }).check();
  await history.getByRole("combobox", { name: "Smerteplacering" }).selectOption("medial");
  await history.getByRole("checkbox", { name: "Gang" }).check();
  await history.getByRole("checkbox", { name: "Trapper" }).check();
  await expect(history.getByRole("checkbox", { name: "Gang" })).toBeChecked();
  await expect(history.getByRole("checkbox", { name: "Trapper" })).toBeChecked();

  const objective = await openModule(page, "Objektivt");
  await objective.getByRole("checkbox", { name: "Medial ledlinje" }).check();
  await objective.getByRole("checkbox", { name: "MCL" }).check();
  await objective.getByRole("combobox", { name: "Lachman" }).selectOption("not-performed");
  await expect(objective.getByRole("checkbox", { name: "Medial ledlinje" })).toBeChecked();
  await expect(objective.getByRole("checkbox", { name: "MCL" })).toBeChecked();
  await expect(objective.getByRole("combobox", { name: "Lachman" })).toHaveValue("not-performed");
});

test("C3-T03 keeps keyboard actions local and Escape cancels uncommitted text", async ({ page }) => {
  await page.goto(route);
  const history = moduleRegion(page, "Anamnese");
  const toggle = history.getByRole("button", { name: "Redigér" });
  await toggle.focus();
  await page.keyboard.press("Enter");

  const right = history.getByRole("radio", { name: "Højre" });
  await expect(right).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(history.getByRole("radio", { name: "Venstre" })).toBeFocused();
  await expect(history.getByRole("radio", { name: "Venstre" })).toBeChecked();
  await expect(page.getByLabel("Anamnese redigering")).toBeVisible();

  const walking = history.getByRole("checkbox", { name: "Gang" });
  await walking.focus();
  await page.keyboard.press("Space");
  await expect(walking).toBeChecked();

  const duration = history.getByRole("textbox", { name: "Varighed" });
  await duration.fill("ikke gemt");
  await page.keyboard.press("Escape");
  await expect(page.getByLabel("Anamnese redigering")).toHaveCount(0);
  await expect(history.getByRole("button", { name: "Redigér" })).toBeFocused();

  await history.getByRole("button", { name: "Redigér" }).click();
  await expect(history.getByRole("textbox", { name: "Varighed" })).toHaveValue("");
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(":focus")).not.toBe(page.locator("body"));
});

test("C3-T04 switches Quick and Standard without source mutation and returns byte-stably", async ({ page }) => {
  await loadFixture(page);
  const documents = await openModule(page, "Dokumentation");
  const standard = documents.getByRole("textbox", { name: "Standard dokumentudkast" });
  const standardText = await standard.inputValue();
  const overview = page.getByRole("complementary", { name: "Cortex Overblik" });
  await expect(overview.getByText("Revision", { exact: true }).locator("..")).toContainText("R1");

  await documents.getByRole("radio", { name: "Quick" }).check();
  const quick = documents.getByRole("textbox", { name: "Quick dokumentudkast" });
  const quickText = await quick.inputValue();
  expect(quickText).not.toBe(standardText);

  await documents.getByRole("radio", { name: "Standard" }).check();
  await expect(documents.getByRole("textbox", { name: "Standard dokumentudkast" })).toHaveValue(standardText);
  await documents.getByRole("radio", { name: "Quick" }).check();
  await expect(documents.getByRole("textbox", { name: "Quick dokumentudkast" })).toHaveValue(quickText);
  await expect(overview.getByText("Revision", { exact: true }).locator("..")).toContainText("R1");
});

test("C3-T05 assessment is clinician-created, editable, reclassifiable and removable", async ({ page }) => {
  await page.goto(route);
  const assessment = await openModule(page, "Vurdering");
  await expect(assessment.getByRole("radio", { name: "Primær" })).not.toBeChecked();
  await expect(assessment.getByRole("article")).toHaveCount(0);

  await assessment.getByRole("radio", { name: "Primær" }).check();
  await assessment.getByRole("textbox", { name: "Klinikerens formulering" }).fill("Klinikerens foreløbige vurdering.");
  await assessment.getByRole("button", { name: "Tilføj eksplicit" }).click();

  const entry = assessment.getByRole("article", { name: "Vurdering C3-ASMT-001" });
  await expect(entry).toBeVisible();
  await entry.getByRole("combobox", { name: "Klassifikation" }).selectOption("secondary");
  await entry.getByRole("textbox", { name: "Formulering" }).fill("Klinikerens reviderede vurdering.");
  await entry.getByRole("button", { name: "Gem ændring" }).click();
  await expect(entry.getByRole("combobox", { name: "Klassifikation" })).toHaveValue("secondary");
  await expect(entry).toContainText("C3-ASMT-001-V2");

  await entry.getByRole("button", { name: "Fjern" }).click();
  await expect(assessment.getByRole("article", { name: "Vurdering C3-ASMT-001" })).toHaveCount(0);
});

test("C3-T06 phrase commitments preserve visible provenance through select, edit and remove", async ({ page }) => {
  await page.goto(route);
  await selectCommitments(page);
  const plan = moduleRegion(page, "Plan");
  const entries = [
    plan.getByRole("article", { name: "Commitment C3-PLAN-001" }),
    plan.getByRole("article", { name: "Commitment C3-FU-001" }),
    plan.getByRole("article", { name: "Commitment C3-SN-001" })
  ];

  for (const entry of entries) {
    await expect(entry).toContainText("C3-FIX-001@1.1");
    await removePeriodAndSave(entry);
    await expect(entry).toContainText("edited af kliniker");
    await entry.getByRole("button", { name: "Fjern" }).click();
    await expect(entry).toHaveCount(0);
  }
});

test("C3-T07 keeps profile drafts separate and resolves stale state explicitly", async ({ page }) => {
  await loadFixture(page);
  let documents = await openModule(page, "Dokumentation");
  await documents.getByRole("textbox", { name: "Standard dokumentudkast" }).fill("Standard manuel draft.");
  await documents.getByRole("radio", { name: "Quick" }).check();
  await documents.getByRole("textbox", { name: "Quick dokumentudkast" }).fill("Quick manuel draft.");

  const history = await openModule(page, "Anamnese");
  await history.getByRole("combobox", { name: "Smerteplacering" }).selectOption("lateral");

  documents = await openModule(page, "Dokumentation");
  await expect(documents.getByRole("status")).toContainText("stale");
  await expect(documents.getByRole("textbox", { name: "Quick dokumentudkast" })).toHaveValue("Quick manuel draft.");
  await documents.getByRole("button", { name: "Fortsæt med teksten" }).click();
  await expect(documents.getByRole("status")).toHaveCount(0);

  await documents.getByRole("radio", { name: "Standard" }).check();
  await expect(documents.getByRole("status")).toContainText("stale");
  await expect(documents.getByRole("textbox", { name: "Standard dokumentudkast" })).toHaveValue("Standard manuel draft.");
  await documents.getByRole("button", { name: "Regenerér fra registreringer" }).click();
  await expect(documents.getByRole("textbox", { name: "Standard dokumentudkast" })).toHaveValue(/Laterale/);

  await documents.getByRole("radio", { name: "Quick" }).check();
  await expect(documents.getByRole("textbox", { name: "Quick dokumentudkast" })).toHaveValue("Quick manuel draft.");
});

test("C3-T08 preserves not-assessed, not-performed and not-assessable as distinct states", async ({ page }) => {
  await loadFixture(page);
  const history = await openModule(page, "Anamnese");
  await history.getByRole("group", { name: "Nattesmerter" }).getByRole("radio", { name: "Ikke vurderet" }).check();

  const objective = await openModule(page, "Objektivt");
  await objective.getByRole("combobox", { name: "Lachman" }).selectOption("not-performed");
  await objective.getByRole("checkbox", { name: "ROM ikke vurderbar" }).check();

  const documents = await openModule(page, "Dokumentation");
  const draft = documents.getByRole("textbox", { name: "Standard dokumentudkast" });
  await expect(draft).toHaveValue(/Lachman ikke udført/);
  await expect(draft).toHaveValue(/ROM ikke vurderbar/);
  await expect(draft).not.toHaveValue(/nattesmerter/);
  await expect(page.getByText("Nattesmerter", { exact: true }).first()).toBeVisible();
});

test("C3-T09 blocks a second recovery event and requires explicit restore or discard", async ({ page }) => {
  await loadFixture(page);
  const history = await openModule(page, "Anamnese");
  await history.getByRole("group", { name: "Traume" }).getByRole("radio", { name: "Nej" }).check();
  await expect(page.getByRole("button", { name: "Gendan" })).toBeFocused();
  await expect(moduleRegion(page, "Dokumentation")).not.toContainText(/vridtraume under fodbold/);

  await history.getByRole("combobox", { name: "Hævelse" }).selectOption("none");
  await expect(page.getByRole("status")).toContainText("Afklar den eksisterende recovery-kopi");
  await expect(history.getByRole("combobox", { name: "Hævelse" })).toHaveValue("mild");
  await expect(page.getByRole("button", { name: "Gendan" })).toBeFocused();

  await page.getByRole("button", { name: "Gendan" }).click();
  await expect(history.getByRole("group", { name: "Traume" }).getByRole("radio", { name: "Nej" })).toBeFocused();
  await expect(history.getByRole("group", { name: "Traume" }).getByRole("radio", { name: "Ja" })).toBeChecked();

  await history.getByRole("combobox", { name: "Hævelse" }).selectOption("none");
  await page.getByRole("button", { name: "Kassér" }).click();
  await expect(history.getByRole("combobox", { name: "Hævelse" })).toHaveValue("none");
  await expect(history.getByRole("textbox", { name: "Hævelsens tidsforløb" })).toHaveCount(0);
});

test("C3-T10 retains the controlled C2 facts and labels the additional C3 fixture explicitly", async ({ page }) => {
  await page.goto("/prototype/sprint-1-2-c2");
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const c2 = await page.getByRole("textbox", { name: "Redigerbart journaludkast" }).inputValue();
  expect(c2).toContain("vridtraume under fodbold");
  expect(c2).toContain("Mediale smerter og let hævelse");
  expect(c2).toContain("Ingen ægte aflåsning");

  await loadFixture(page);
  const c3 = moduleRegion(page, "Dokumentation");
  await expect(c3).toContainText("vridtraume under fodbold");
  await expect(c3).toContainText("Mediale, intermitterende smerter og let hævelse");
  await expect(c3).toContainText("Ingen ægte aflåsning");
  await expect(page.getByText("C3 · Calm Clinical Workflow")).toBeVisible();
  await expect(page.getByText(/syntetisk case/)).toBeVisible();
});
