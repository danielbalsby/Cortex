import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/sprint-1";

async function select(page: Page, label: string, value: string) {
  await page.getByRole("combobox", { name: label, exact: true }).selectOption(value);
}

async function completeConsultation(page: Page) {
  await page.getByRole("button", { name: "Registrér viste caseoplysninger" }).click();
  await select(page, "Instabilitet", "no");
  await select(page, "Belastningsevne", "normal");
  await select(page, "Gang", "normal");
  await select(page, "Inspektion", "swelling");
  await select(page, "ROM", "full");
  await select(page, "Effusion", "mild");
  await select(page, "Palpation", "medial-joint-line");
  await page.getByText("Målrettede knætests", { exact: true }).click();
  await select(page, "Lachman", "negative");
  await select(page, "Valgusstresstest", "painful-no-laxity");
  await select(page, "Varusstresstest", "stable");
  await select(page, "Menisktest", "positive");
  await select(page, "Patella", "no-specific-findings");
  await select(page, "Distal neurovaskulær", "normal");
  await select(page, "Feber", "no");
  await select(page, "Almen påvirkning", "no");
  await select(page, "Rødt, varmt, akut hævet led", "no");
  await page.getByLabel("Klinikerens vurdering").fill("Fund forenelige med medial knæskade; endelig diagnose ikke fastlagt");
  await page.getByLabel("Plan", { exact: true }).fill("aflastning efter symptomer");
  await page.getByLabel("Opfølgning").fill("klinisk kontrol ved manglende bedring");
  await page.getByLabel("Safety-net").fill("kontakt ved feber eller tiltagende symptomer");
  await page.getByRole("heading", { name: "Udkast efter klinisk vurdering" }).click();
}

test("Sprint 1 starts as consultation support without clinical defaults or finished output", async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole("complementary", { name: "Cortex Overblik" })).toBeVisible();
  await expect(page.getByText("Deterministic Mock AI Summary")).toHaveCount(0);
  await expect(page.getByRole("combobox", { name: "Traume", exact: true })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Gang", exact: true })).toHaveValue("");
  await expect(page.getByText("Foreløbigt udkast")).toBeVisible();
  await expect(page.getByText("Klar til klinikerens gennemgang")).toHaveCount(0);
  const editor = page.getByLabel("Redigerbart udkast");
  await expect(editor).toHaveValue("Problem\nKnæsmerter");
  await expect(editor).not.toHaveValue(/normal|ingen|højre|traume/i);
  await expect(page.getByRole("button", { name: "Kopiér udkast" })).toBeDisabled();
});

test("the source action records only visible case facts and leaves uncertainty visible", async ({ page }) => {
  await page.goto(route);
  await page.getByText("Vis hvad casehandlingen registrerer").click();
  await expect(page.getByText("Instabilitet og belastningsevne er ikke oplyst.")).toBeVisible();
  await page.getByRole("button", { name: "Registrér viste caseoplysninger" }).click();
  await expect(page.getByRole("combobox", { name: "Traume", exact: true })).toHaveValue("yes");
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveValue("twisting");
  await expect(page.getByRole("combobox", { name: "Instabilitet" })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Belastningsevne" })).toHaveValue("");
  await expect(page.getByLabel("Redigerbart udkast")).toHaveValue(/mediale knæsmerter og let hævelse/);
  await expect(page.getByLabel("Redigerbart udkast")).not.toHaveValue(/fikseret fod|ingen instabilitet/i);
});

test("trauma changes prune hidden mechanism and stale text", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Registrér viste caseoplysninger" }).click();
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toBeVisible();
  await select(page, "Traume", "no");
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveCount(0);
  await expect(page.getByLabel("Redigerbart udkast")).not.toHaveValue(/vridtraume/i);
  await select(page, "Traume", "yes");
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveValue("");
});

test("clinical attention and technical completeness remain advisory", async ({ page }) => {
  await page.goto(route);
  await select(page, "Traume", "yes");
  await select(page, "Belastningsevne", "cannot-four-steps");
  const overview = page.getByRole("complementary", { name: "Cortex Overblik" });
  await expect(overview).toContainText("Belastningsevne efter traume kræver stillingtagen");
  await expect(overview).toContainText("Overblikket viser kun teknisk prototype-dækning");
  await expect(overview).toContainText("klinikeren beslutter");
});

test("a completed consultation creates readable, copyable draft while levels preserve facts", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(route);
  await completeConsultation(page);
  await expect(page.getByText("Klar til klinikerens gennemgang")).toBeVisible();
  const editor = page.getByLabel("Redigerbart udkast");
  await expect(editor).toHaveValue(/34-årig mand med gener fra højre knæ efter vridtraume/);
  await expect(editor).toHaveValue(/Vurdering\nFund forenelige med medial knæskade; endelig diagnose ikke fastlagt/);
  await page.getByLabel("Kort").check();
  await expect(editor).toHaveValue(/mediale knæsmerter/);
  await expect(editor).toHaveValue(/Safety-net/);
  await page.getByRole("button", { name: "Kopiér udkast" }).click();
  await expect(page.getByRole("status")).toContainText("Kopieret – ingen afsendelse");
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain("mediale knæsmerter");
});

test("referral drafts require explicit intent and do not imply external action", async ({ page }) => {
  await page.goto(route);
  await expect(page.locator('[data-output="imaging"]')).toHaveCount(0);
  await expect(page.locator('[data-output="physiotherapy"]')).toHaveCount(0);
  await page.getByLabel("Forbered billeddiagnostisk henvisningsudkast").check();
  await expect(page.locator('[data-output="imaging"]')).toContainText("Foreløbigt udkast");
  await expect(page.locator('[data-output="imaging"]')).toContainText("Modalitet");
  await expect(page.locator('[data-output="imaging"]')).not.toContainText("Ingen afsendelse er foretaget");
  await page.getByLabel("Forbered billeddiagnostisk henvisningsudkast").uncheck();
  await expect(page.locator('[data-output="imaging"]')).toHaveCount(0);
});
