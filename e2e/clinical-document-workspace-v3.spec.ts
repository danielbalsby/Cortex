import { expect, test } from "@playwright/test";

const route = "/prototype/clinical-document-workspace-v3";

function group(page: import("@playwright/test").Page, name: string) {
  return page.getByRole("group", { name, exact: true });
}

test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole("heading", { name: "Subjektivt", level: 2 })).toBeVisible();
});

test("no top PSOAP step bar; only a single discreet active-step indicator", async ({ page }) => {
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await expect(page.getByText(/^Aktivt: /)).toBeVisible();
});

test("empty state records no implicit clinical facts", async ({ page }) => {
  await expect(
    page.getByTestId("v3-clinical-sections").getByRole("button", { pressed: true })
  ).toHaveCount(0);
  await expect(page.getByLabel("PSOAP-notat")).toHaveText(
    "P: Problem: Knæsmerte\nS: Ikke registreret\nO: Ikke registreret\nA: Ikke registreret\nP: Ikke registreret"
  );
});

test("problem search only steers flow, never a clinical fact", async ({ page }) => {
  await page.getByRole("textbox", { name: "Problem", exact: true }).fill("knæsmerte");
  await expect(page.getByRole("button", { name: "Knæsmerter – traume" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Knæsmerter – snigende" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Knæsmerter – barn" })).toBeVisible();

  await page.getByRole("button", { name: "Knæsmerter – traume" }).click();
  await expect(page.getByText(/styrer kun visning/i)).toBeVisible();
  await expect(page.getByLabel("PSOAP-notat")).toContainText("S: Ikke registreret");
});

test("short choice toggles off on a second click", async ({ page }) => {
  const right = group(page, "Side").getByRole("button", { name: "Højre" });
  await right.click();
  await expect(right).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Knæsmerte (højre)");

  await right.click();
  await expect(right).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByLabel("PSOAP-notat")).toContainText("P: Problem: Knæsmerte\n");
});

test("conditional trauma detail appears only after Traume=Ja and is subordinated", async ({
  page
}) => {
  await expect(group(page, "Traumemekanisme")).toHaveCount(0);

  await group(page, "Traume").getByRole("button", { name: "Ja" }).click();
  const mechanismGroup = group(page, "Traumemekanisme");
  await expect(mechanismGroup).toBeVisible();
  await mechanismGroup.getByRole("button", { name: "Vrid på fikseret fod" }).click();
  await expect(page.getByLabel("PSOAP-notat")).toContainText("vrid på fikseret fod");

  await group(page, "Traume").getByRole("button", { name: "Nej" }).click();
  await expect(group(page, "Traumemekanisme")).toHaveCount(0);
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Intet traume.");
  await expect(page.getByLabel("PSOAP-notat")).not.toContainText("vrid på fikseret fod");

  await group(page, "Traume").getByRole("button", { name: "Ja" }).click();
  await expect(
    group(page, "Traumemekanisme").getByRole("button", { name: "Vrid på fikseret fod" })
  ).toHaveAttribute("aria-pressed", "false");
});

test("conditional ROM detail appears only for Afvigende ROM", async ({ page }) => {
  await expect(group(page, "Ekstension")).toHaveCount(0);
  await expect(group(page, "Fleksion")).toHaveCount(0);

  await group(page, "ROM").getByRole("button", { name: "Normal ROM 0–140°" }).click();
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Normal ROM 0–140°");
  await expect(group(page, "Ekstension")).toHaveCount(0);

  await group(page, "ROM").getByRole("button", { name: "Afvigende ROM" }).click();
  await expect(group(page, "Ekstension")).toBeVisible();
  await expect(group(page, "Fleksion")).toBeVisible();
  await group(page, "Ekstension").getByRole("button", { name: "Reduceret" }).click();
  await expect(page.getByLabel("PSOAP-notat")).toContainText("reduceret ekstension");
  await expect(page.getByLabel("PSOAP-notat")).not.toContainText("Normal ROM 0–140°");

  await group(page, "ROM").getByRole("button", { name: "Normal ROM 0–140°" }).click();
  await expect(group(page, "Ekstension")).toHaveCount(0);
  await expect(page.getByLabel("PSOAP-notat")).not.toContainText("ekstension");
});

test("red flags exclusivity: 'Ingen red flags' and a positive can never both be active", async ({
  page
}) => {
  const noRedFlags = page.getByRole("button", { name: "Ingen red flags" });
  const fever = page.getByRole("button", { name: "Feber", exact: true });

  await noRedFlags.click();
  await expect(noRedFlags).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Ingen red flags.");

  await fever.click();
  await expect(fever).toHaveAttribute("aria-pressed", "true");
  await expect(noRedFlags).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Feber registreret.");
  await expect(page.getByLabel("PSOAP-notat")).not.toContainText("Ingen red flags.");

  await fever.click();
  await expect(fever).toHaveAttribute("aria-pressed", "false");
});

test("negative bundle fills only untouched findings and never overwrites a positive", async ({
  page
}) => {
  const locking = page.getByRole("button", { name: "Aflåsning", exact: true });
  const bundle = page.getByRole("button", {
    name: "Ingen aflåsning, instabilitet, hvile- eller nattesmerter"
  });

  await locking.click();
  await expect(locking).toHaveAttribute("aria-pressed", "true");

  await bundle.click();
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Aflåsning registreret.");
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Ingen instabilitet.");
  await expect(page.getByLabel("PSOAP-notat")).not.toContainText(
    "Ingen aflåsning, instabilitet, hvile- eller nattesmerter."
  );
});

async function focusedText(page: import("@playwright/test").Page) {
  return page.evaluate(() => document.activeElement?.textContent?.trim() ?? "");
}

test("Tab order follows clinical order and never lands on a hidden field", async ({ page }) => {
  const seen: string[] = [];
  for (let i = 0; i < 40; i += 1) {
    await page.keyboard.press("Tab");
    seen.push(await focusedText(page));
  }

  // Trauma mechanism chips are not rendered while Traume is unanswered, so
  // native Tab order can never land on them — regardless of how many
  // presses are used to get there.
  expect(seen).not.toContain("Vrid på fikseret fod");
  expect(seen).not.toContain("Direkte slag");

  // Clinical order: Side appears, then Debut, then Traume, then Funktion —
  // each strictly before the next.
  const sideIndex = seen.indexOf("Højre");
  const onsetIndex = seen.indexOf("Akut");
  const traumaIndex = seen.indexOf("Ja");
  const functionIndex = seen.indexOf("Normal");
  expect(sideIndex).toBeGreaterThanOrEqual(0);
  expect(onsetIndex).toBeGreaterThan(sideIndex);
  expect(traumaIndex).toBeGreaterThan(onsetIndex);
  expect(functionIndex).toBeGreaterThan(traumaIndex);
});

test("auto-advance focuses the next linear group after a completing selection", async ({
  page
}) => {
  await group(page, "Side").getByRole("button", { name: "Højre" }).click();
  await expect(group(page, "Debut").getByRole("button", { name: "Akut" })).toBeFocused();
});

test("auto-advance skips the hidden trauma group when Traume=Nej", async ({ page }) => {
  await group(page, "Traume").getByRole("button", { name: "Nej" }).click();
  await expect(group(page, "Funktion").getByRole("button", { name: "Normal" })).toBeFocused();
});

test("Quick and Standard render the exact same PSOAP facts", async ({ page }) => {
  await group(page, "Side").getByRole("button", { name: "Venstre" }).click();
  await group(page, "Debut").getByRole("button", { name: "Gradvis" }).click();
  await page.getByRole("button", { name: "Fysioterapi" }).click();

  const quickText = await page.getByLabel("PSOAP-notat").textContent();

  await page.getByRole("button", { name: "Standard", exact: true }).click();
  await expect(page.getByLabel("PSOAP-notat")).toHaveText(quickText ?? "");

  await page.getByRole("button", { name: "Quick", exact: true }).click();
  await expect(page.getByLabel("PSOAP-notat")).toHaveText(quickText ?? "");
});

test("PSOAP copy copies the full P/S/O/A/P text with line breaks", async ({ page }) => {
  await group(page, "Side").getByRole("button", { name: "Højre" }).click();
  await group(page, "Debut").getByRole("button", { name: "Akut" }).click();

  await page.getByRole("button", { name: "Kopiér PSOAP" }).click();
  await expect(page.getByRole("button", { name: "Kopieret" })).toBeVisible();

  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  const lines = clipboard.split("\n");
  expect(lines).toHaveLength(5);
  expect(lines[0]).toBe("P: Problem: Knæsmerte (højre)");
  expect(lines[1]).toContain("Akut debut");
  expect(lines[1].startsWith("S: ")).toBe(true);
});

test("assessment stays clinician-owned with a static, non-deciding attention placeholder", async ({
  page
}) => {
  await expect(page.getByText("Klinisk opmærksomhed (prototype)")).toBeVisible();
  await expect(page.getByRole("region", { name: "Klinisk sparring" })).toHaveCount(0);

  await page.getByLabel("Klinikerens vurdering").fill("Mulig meniskpåvirkning");
  await page.getByLabel("Tilføj arbejdshypotese").fill("Meniskpåvirkning");
  await page.getByRole("button", { name: "Tilføj", exact: true }).click();

  await expect(page.getByLabel("PSOAP-notat")).toContainText("Mulig meniskpåvirkning");
  await expect(page.getByLabel("PSOAP-notat")).toContainText("Arbejdshypotese: Meniskpåvirkning");
  // The static placeholder must not change based on recorded facts.
  await expect(page.getByText("Klinisk opmærksomhed (prototype)")).toBeVisible();
});

test("plan renders clinical prose without a redundant 'Plan:' prefix inside the P line", async ({
  page
}) => {
  await page.getByRole("button", { name: "Fysioterapi" }).click();
  await page.getByRole("button", { name: "Paracetamol p.n." }).click();
  await page
    .getByRole("button", { name: "Ny klinisk vurdering ved vedvarende gener eller forværring" })
    .click();

  const text = await page.getByLabel("PSOAP-notat").textContent();
  const planLine = text?.split("\n").at(-1) ?? "";
  expect(planLine.startsWith("P: ")).toBe(true);
  expect(planLine).not.toContain("Plan:");
  expect(planLine).toContain("Henvisning til fysioterapi.");
  expect(planLine).toContain("Paracetamol p.n.");
  expect(planLine).toContain("Ny klinisk vurdering ved vedvarende gener eller forværring.");
});

test("only one reviewable PSOAP surface exists — no duplicated editor", async ({ page }) => {
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveCount(0);
  await expect(page.getByLabel("PSOAP-notat")).toBeVisible();
});
