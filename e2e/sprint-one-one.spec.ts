import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/sprint-1-1";

async function select(page: Page, name: string, value: string) {
  await page.getByRole("combobox", { name, exact: true }).selectOption(value);
}

async function completeCase(page: Page) {
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  await select(page, "Smerteforløb", "intermittent");
  await page.getByRole("button", { name: "Rotation", exact: true }).click();
  await page.getByRole("button", { name: "Retningsskift", exact: true }).click();
  await select(page, "Funktionsevne", "mildly-reduced");
  await page.getByRole("textbox", { name: "Hævelsens tidsforløb" }).fill("opstået gradvist over timer");
  await select(page, "Instabilitet", "no");
  await select(page, "Hvilesmerter", "no");
  await select(page, "Nattesmerter", "no");
  await select(page, "Gang", "limp");
  await select(page, "Inspektion", "swelling");
  await select(page, "Effusion", "mild");
  await page.getByRole("textbox", { name: "Ekstension i grader" }).fill("0");
  await page.getByRole("textbox", { name: "Fleksion i grader" }).fill("125");
  await page.getByRole("button", { name: "Medial ledlinje", exact: true }).click();
  await page.getByRole("button", { name: "MCL", exact: true }).click();
  await select(page, "Lachman", "negative");
  await select(page, "Valgusstres", "painful-no-laxity");
  await select(page, "Varusstres", "stable");
  await select(page, "Menisktest", "positive");
  await select(page, "Patellatest", "negative");
  await select(page, "Distal neurovaskulær", "normal");
  await select(page, "Feber", "no");
  await select(page, "Almen påvirkning", "no");
  await select(page, "Rødt, varmt og akut hævet knæ", "no");
  await page.getByRole("textbox", { name: "Klinikerens vurdering og usikkerhed" }).fill("Fund forenelige med medial knæskade; endelig diagnose ikke fastlagt");
  await page.getByRole("textbox", { name: "Plan", exact: true }).fill("aflastning efter symptomer");
  await page.getByRole("textbox", { name: "Opfølgning" }).fill("klinisk kontrol ved manglende bedring");
  await page.getByRole("textbox", { name: "Safety-net" }).fill("kontakt ved feber eller tiltagende symptomer");
  await page.getByRole("heading", { name: "Journal som klinisk kommunikation" }).click();
}

test("Sprint 1.1 begins without clinically meaningful defaults", async ({ page }) => {
  await page.goto(route);
  await expect(page.getByText("Sprint 1.1 · learning prototype")).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Debut" })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Smerteforløb" })).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue("");
  await expect(page.getByRole("button", { name: "Kopiér journaludkast" })).toBeDisabled();
});

test("the fixed source creates natural prose and leaves every unprovided dimension unresolved", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue(/34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går/);
  await expect(journal).toHaveValue(/Mediale smerter og let hævelse/);
  await expect(journal).toHaveValue(/Ingen ægte aflåsning/);
  await expect(journal).not.toHaveValue(/patienten oplyser|registrerede oplysninger|fikseret fod|ingen instabilitet/i);
  await expect(page.getByRole("combobox", { name: "Smerteforløb" })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Funktionsevne" })).toHaveValue("");
});

test("history supports multiple provocations without disclosure ceremony", async ({ page }) => {
  await page.goto(route);
  const rotation = page.getByRole("button", { name: "Rotation", exact: true });
  const stairs = page.getByRole("button", { name: "Trapper", exact: true });
  await rotation.click();
  await stairs.click();
  await expect(rotation).toHaveAttribute("aria-pressed", "true");
  await expect(stairs).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(/Smerterne provokeres ved trappegang og rotation|Smerterne provokeres ved rotation og trappegang/);
  await expect(page.getByText("Målrettede knætests", { exact: true })).toBeVisible();
});

test("measured ROM and multiple palpation findings remain precise and contradiction-free", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("textbox", { name: "Ekstension i grader" }).fill("0");
  await page.getByRole("textbox", { name: "Fleksion i grader" }).fill("125");
  await page.getByRole("button", { name: "Medial ledlinje", exact: true }).click();
  await page.getByRole("button", { name: "MCL", exact: true }).click();
  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue(/ROM: ekstension 0°, fleksion 125°/);
  await expect(journal).toHaveValue(/Palpationsømhed ved mediale ledlinje og MCL/);

  await select(page, "Palpationsstatus", "no-focal-tenderness");
  await expect(page.getByRole("button", { name: "Medial ledlinje", exact: true })).toHaveAttribute("aria-pressed", "false");
  await expect(journal).toHaveValue(/Ingen fokal palpationsømhed/);
  await expect(journal).not.toHaveValue(/mediale ledlinje|MCL/);
});

test("clinical attention exposes rationale and clinician authority without recommending a decision", async ({ page }) => {
  await page.goto(route);
  const overview = page.getByRole("complementary", { name: "Cortex Overblik" });
  await expect(overview).toContainText("Er relevante røde flag vurderet?");
  await expect(overview).toContainText("Grundlag: manglende information");
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  await expect(overview).toContainText("Er hævelsens tidsforløb afklaret?");
  await page.getByLabel("Billeddiagnostik indgår i klinikerens plan").check();
  await select(page, "Klinikerens valgte modalitet", "mri");
  await expect(overview).toContainText("Vil billeddiagnostik ændre håndteringen?");
  await expect(overview).toContainText("Cortex vurderer ikke indikationen");
  await expect(overview).toContainText("Klinikeren vurderer og beslutter");
});

test("a complete comparison case produces one editable and copyable journal draft", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(route);
  await completeCase(page);
  await expect(page.getByText("Klar til klinikerens gennemgang")).toBeVisible();
  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue(/ROM: ekstension 0°, fleksion 125°/);
  await expect(journal).toHaveValue(/endelig diagnose ikke fastlagt/);
  await page.getByRole("radio", { name: "Kort" }).check();
  await expect(journal).toHaveValue(/Safety-net/);
  await page.getByRole("button", { name: "Kopiér journaludkast" }).click();
  await expect(page.getByRole("status")).toContainText("Ingen afsendelse");
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain("endelig diagnose ikke fastlagt");
});
