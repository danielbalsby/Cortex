import { expect, test } from "@playwright/test";

const route = "/prototype/c3-2-psoap-fast-flow";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
});

test("C32-E01/E02 starts blank and configures workflow without creating facts", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "PSOAP Fast Flow" })).toBeVisible();
  await expect(page.getByText("Source revision", { exact: true }).locator("..").getByText("0", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Anamnese" })).toHaveCount(0);

  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  await expect(page.getByRole("button", { name: "Knæsmerter", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Source revision", { exact: true }).locator("..").getByText("0", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("profil");
  await page.getByRole("button", { name: "Højre" }).click();

  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Anamnese" })).toHaveCount(0);
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  await expect(page.getByRole("button", { name: "Højre" })).toHaveAttribute("aria-pressed", "true");
});

test("C32-E03 direct choices can return to blank", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  const right = page.getByRole("button", { name: "Højre" });
  await right.click();
  await expect(right).toHaveAttribute("aria-pressed", "true");
  await right.click();
  await expect(right).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("højresidige");
});

test("C32-E04 Red flags batch discloses exactly three writes and supports undo", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  await page.getByRole("button", { name: "Gennemse Normal", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("listitem")).toHaveCount(3);
  await expect(dialog).toContainText("history.fever");
  await expect(dialog).toContainText("history.systemicIllness");
  await expect(dialog).toContainText("history.redHotSwollenJoint");
  await dialog.getByRole("button", { name: "Bekræft de viste facts" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Ingen feber");

  await page.getByRole("button", { name: "Fortryd batch" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("Ingen feber");
});

test("C32-E04 batch collision preserves an existing positive value", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  const fever = page.getByRole("group", { name: "Feber" });
  await fever.getByRole("button", { name: "Ja" }).click();
  await page.getByRole("button", { name: "Gennemse Normal", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Kollision · bevares");
  await page.getByRole("button", { name: "Bekræft de viste facts" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Feber");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("Ingen feber");
});

test("C32-E05 inspection preserves simultaneous findings and clears only one", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  const inspection = page.getByRole("group", { name: /Inspektionsfund/ });
  await inspection.getByRole("button", { name: "Hævelse" }).click();
  await inspection.getByRole("button", { name: "Rødme" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Synlig hævelse og rødme");

  await inspection.getByRole("button", { name: "Hævelse" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Rødme");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("Synlig hævelse");
});

test("C32-E06 Normal ROM writes exact degrees and Abnorm exposes separate fields", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  await page.getByRole("button", { name: "Gennemse Normal 0–140°" }).click();
  await expect(page.getByRole("dialog")).toContainText("objective.extensionDegrees");
  await expect(page.getByRole("dialog")).toContainText("objective.flexionDegrees");
  await page.getByRole("button", { name: "Bekræft de viste facts" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("ekstension 0°, fleksion 140°");

  await page.getByRole("button", { name: "Abnorm" }).click();
  await expect(page.getByLabel("Ekstension °")).toBeVisible();
  await expect(page.getByLabel("Fleksion °")).toBeVisible();
  await page.getByLabel("Fleksion °").fill("125");
  await page.getByLabel("Fleksion °").press("Enter");
  await page.getByRole("button", { name: "Fortryd ROM-batch" }).click();
  await expect(page.getByLabel("Fleksion °")).toHaveValue("125");
});

test("C32-E07 explicit not-assessed remains distinct from blank", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  const inspectionStatus = page.getByRole("group", { name: "Inspektionsstatus" });
  await inspectionStatus.getByRole("button", { name: "Ikke vurderet" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Inspektion ikke vurderet");
  await inspectionStatus.getByRole("button", { name: "Ikke vurderet" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("Inspektion ikke vurderet");
});

test("C32-E08 keeps S and O continuous without micro-tabs and keyboard focus remains visible", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  await expect(page.getByRole("tab")).toHaveCount(0);
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Knæsmerter", exact: true })).toBeFocused();
});

test("C32-E09 manual drafts are profile-specific and become visibly stale", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  const document = page.getByLabel("Rediger PSOAP-dokument");
  await document.fill("Manuelt Standard-udkast");
  await page.getByRole("button", { name: "Quick" }).click();
  await expect(document).not.toHaveValue("Manuelt Standard-udkast");
  await page.getByRole("button", { name: "Standard" }).click();
  await expect(document).toHaveValue("Manuelt Standard-udkast");

  await page.getByRole("button", { name: "Højre" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Udkastet er ældre" })).toBeVisible();
});

test("C32-E10/E11 copy produces five PSOAP lines and records the action", async ({ page, context }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Kopiér PSOAP" }).click();
  await expect(page.getByText("PSOAP kopieret")).toBeVisible();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard.split("\n")).toHaveLength(5);
  expect(clipboard.split("\n").map((line) => line.slice(0, 2))).toEqual(["P:", "S:", "O:", "A:", "P:"]);
  expect(clipboard).not.toContain("P: Plan:");

  await page.getByText("Evalueringsspor").click();
  await expect(page.getByTestId("c32-instrumentation")).toContainText('"copies": 1');
});

test("C32 recovery remains explicit when a parent change prunes trauma details", async ({ page }) => {
  await page.getByRole("button", { name: "Knæsmerter", exact: true }).click();
  const trauma = page.getByRole("group", { name: "Traume" });
  await trauma.getByRole("button", { name: "Ja" }).click();
  await page.getByLabel("Mekanisme").selectOption("twisting");
  await page.getByLabel("Kontekst").fill("under fodbold");
  await page.getByLabel("Kontekst").press("Enter");
  await trauma.getByRole("button", { name: "Nej" }).click();
  await expect(page.getByText("Skjulte oplysninger er bevaret som recovery-kopi.")).toBeVisible();
  await page.getByRole("button", { name: "Gendan" }).click();
  await expect(page.getByLabel("Mekanisme")).toHaveValue("twisting");
  await expect(page.getByLabel("Kontekst")).toHaveValue("under fodbold");
});
