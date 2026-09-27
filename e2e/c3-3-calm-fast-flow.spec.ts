import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/c3-3-calm-fast-flow";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
});

async function chooseTraumaProfile(page: Page) {
  await page.getByLabel("Søg klinisk problem").fill("traume");
  await page.getByRole("option", { name: /Knæsmerter – traume/ }).click();
}

function radiogroup(page: Page, name: string) {
  return page.getByRole("radiogroup", { name });
}

function choiceGroup(page: Page, name: string) {
  return page.getByRole("group", { name });
}

/** Textarea values are not in parent innerText — read value properties. */
async function psoapDocumentText(page: Page) {
  return page
    .getByLabel("Rediger PSOAP-dokument")
    .locator("textarea")
    .evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLTextAreaElement).value).join("\n")
    );
}

test("C33 starts search-first, shows no suggestions before typing, and problem selection creates no clinical fact", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Knækonsultation" })).toBeVisible();
  await expect(page.getByLabel("Søg klinisk problem")).toBeVisible();
  await expect(page.getByRole("listbox", { name: "Problemforslag" })).toHaveCount(0);
  await expect(page.getByRole("navigation")).toHaveCount(0);

  await chooseTraumaProfile(page);
  await expect(page.getByRole("heading", { name: "Subjektivt" })).toBeVisible();
  await page.getByText("Evalueringsspor").click();
  await expect(page.getByTestId("c33-instrumentation")).toContainText('"sourceRevision": 0');
});

test("C33 search is token-order independent and hyphen/case-insensitive", async ({ page }) => {
  await page.getByLabel("Søg klinisk problem").fill("TRAUME knæsmerte");
  await expect(page.getByRole("option", { name: /Knæsmerter – traume/ })).toBeVisible();

  await page.getByLabel("Søg klinisk problem").fill("knæsmerte atraumatisk");
  await expect(page.getByRole("option", { name: /Knæsmerter – atraumatisk/ })).toBeVisible();

  await page.getByLabel("Søg klinisk problem").fill("knæsmerte overbelastning");
  await expect(page.getByRole("option", { name: /Knæsmerter – overbelastning/ })).toBeVisible();
});

test("C33 removes rare uncertainty controls from the primary fast flow", async ({ page }) => {
  await chooseTraumaProfile(page);
  await expect(page.getByText("Ikke vurderbar", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Ikke udført", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Ikke vurderet", { exact: true })).toHaveCount(0);
});

test("C33 offers Side incl. Bilateral, and Bilateral clears the canonical Højre/Venstre selection", async ({ page }) => {
  await chooseTraumaProfile(page);
  const sideGroup = radiogroup(page, "Side");
  await expect(sideGroup.getByRole("radio", { name: "Bilateral" })).toBeVisible();

  await sideGroup.getByRole("radio", { name: "Højre" }).click();
  await sideGroup.getByRole("radio", { name: "Bilateral" }).click();
  await expect(sideGroup.getByRole("radio", { name: "Højre" })).toHaveAttribute("aria-checked", "false");
  await expect(sideGroup.getByRole("radio", { name: "Bilateral" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Bilaterale knæsmerter");
});

test("C33 reveals Traumeoplysninger with mechanism, snap, weight-bearing and free text only when Traume=Ja", async ({ page }) => {
  await chooseTraumaProfile(page);
  await expect(page.getByRole("radio", { name: "Hyperekstension" })).toHaveCount(0);

  await radiogroup(page, "Traume").getByRole("radio", { name: "Ja" }).click();
  await expect(page.getByRole("radio", { name: "Hyperekstension" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Mærket smæld" })).toBeVisible();
  await expect(page.getByRole("radio", { name: "≥4 skridt" })).toBeVisible();
  await expect(page.getByLabel("Supplerende", { exact: true })).toBeVisible();
  await expect(page.getByText("Typisk traumeforløb", { exact: false })).toHaveCount(0);

  await page.getByRole("radio", { name: "Hyperekstension" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("efter traume");

  await radiogroup(page, "Traume").getByRole("radio", { name: "Nej" }).click();
  await expect(page.getByRole("radio", { name: "Hyperekstension" })).toHaveCount(0);
});

test("C33 groups Provokation into four combined controls", async ({ page }) => {
  await chooseTraumaProfile(page);
  const group = choiceGroup(page, "Provokation");
  await expect(group.getByRole("button", { name: "Belastning/gang" })).toBeVisible();
  await expect(group.getByRole("button", { name: "Rotation/retningsskift" })).toBeVisible();
  await expect(group.getByRole("button", { name: "Løb/hop" })).toBeVisible();
  await expect(group.getByRole("button")).toHaveCount(4);
});

test("C33 offers Ledsagesymptomer separately from Mekaniske symptomer, and 'Ingen ledsagesymptomer' never writes red flags", async ({ page }) => {
  await chooseTraumaProfile(page);
  const batch = page.getByRole("button", { name: "Ingen ledsagesymptomer" });
  await batch.click();
  await expect(batch).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Ingen ledsagesymptomer.");
  await expect(choiceGroup(page, "Red flags").getByRole("button", { name: "Ingen red flags" }))
    .toHaveAttribute("aria-pressed", "false");
});

test("C33 records only the two mechanical symptoms with one direct reversible choice, never rest/night pain", async ({ page }) => {
  await chooseTraumaProfile(page);
  const batch = page.getByRole("button", {
    name: "Ingen aflåsning eller instabilitetsfornemmelse"
  });
  await batch.click();
  await expect(batch).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText(
    "Ingen ægte aflåsning eller instabilitetsfornemmelse"
  );
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText(
    "nattesmerter"
  );

  await batch.click();
  await expect(batch).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText(
    "Ingen ægte aflåsning"
  );
});

test("C33 offers no Hvilesmerter/Nattesmerter control in Subjektivt; they exist only via the malignancy red-flag group", async ({ page }) => {
  await chooseTraumaProfile(page);
  await expect(page.getByRole("button", { name: "Hvilesmerter", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Nattesmerter", exact: true })).toHaveCount(0);
  await expect(page.locator('[role="group"][aria-label="Hvile- og nattesmerter"]')).toHaveCount(0);

  const malignancy = choiceGroup(page, "Red flags")
    .getByRole("button", { name: /Nattesmerte, uforklaret vægttab/ });
  await expect(malignancy).toBeVisible();
});

test("C33 applies normal ROM directly and writes 'ROM normal', never raw degrees", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("button", { name: "Normal ROM 0–140°" }).click();

  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("ROM normal.");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("ekstension 0°");
});

test("C33 reveals active+passive ROM fields and a standalone mechanical-block finding under Abnorm ROM/specificer", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("button", { name: "Abnorm ROM/specificer" }).click();
  await expect(page.getByLabel("Aktiv ekstension °")).toBeVisible();
  await expect(page.getByLabel("Passiv ekstension °")).toBeVisible();

  await page.getByRole("button", { name: "Mekanisk blokering/strækkedeficit" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText(
    "Mekanisk blokering/strækkedeficit ved bevægelse."
  );
});

test("C33 shows a visible Tests heading, individual tests first, then a reversible 'Knæ-test normale' batch", async ({ page }) => {
  await chooseTraumaProfile(page);
  await expect(page.getByRole("heading", { name: "Tests", exact: true })).toBeVisible();
  await radiogroup(page, "Lachman").getByRole("radio", { name: "Positiv" }).click();

  const batch = page.getByRole("button", { name: "Knæ-test normale" });
  await batch.click();
  await expect(page.getByText("Fjern en positiv testværdi før samlet negativ registrering.")).toBeVisible();

  await radiogroup(page, "Lachman").getByRole("radio", { name: "Positiv" }).click();
  await batch.click();
  await expect(batch).toHaveAttribute("aria-pressed", "true");
  await expect(radiogroup(page, "Valgusstres").getByRole("radio", { name: "Stabil" }))
    .toHaveAttribute("aria-checked", "true");
});

test("C33 unifies palpation (incl. caput fibulae) and exposes calm plan groups", async ({ page }) => {
  await chooseTraumaProfile(page);
  await expect(
    page.locator('[role="group"][aria-label="Palpationsømhed"]')
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Caput fibulae/knogleømhed" })).toBeVisible();
  await expect(page.getByText("Palpationsstatus", { exact: true })).toHaveCount(0);
  await expect(
    page.locator('[role="group"][aria-label="Smertebehandling"]')
  ).toBeVisible();
  await expect(page.getByRole("button", {
    name: "Kontrol ved vedvarende gener eller tidligere ved forværring."
  })).toBeVisible();
  await expect(page.getByRole("button", { name: "Is og let kompression efter behov de første døgn." })).toBeVisible();
  await expect(page.getByText(
    "Ny klinisk vurdering ved forværring.",
    { exact: true }
  )).toHaveCount(0);
  await expect(page.getByText("Røntgen indgår i klinikerens plan.")).toHaveCount(0);
});

test("C33 renames Vurdering to Analyse", async ({ page }) => {
  await chooseTraumaProfile(page);
  await expect(page.getByRole("heading", { name: "Analyse", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vurdering", exact: true })).toHaveCount(0);
  await expect(page.getByText("Klinikerens analyse")).toBeVisible();
});

test("C33 copies exactly five editable PSOAP lines with an immediate checkmark confirmation", async ({ page, context }) => {
  await chooseTraumaProfile(page);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("radio", { name: "Højre" }).click();
  const copyButton = page.getByRole("button", { name: "Kopiér notat" });
  await copyButton.click();

  await expect(page.getByRole("button", { name: "✓ Kopieret" })).toBeVisible();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard.split("\n")).toHaveLength(5);
  expect(clipboard.split("\n").map((line) => line.slice(0, 2))).toEqual([
    "P:",
    "S:",
    "O:",
    "A:",
    "P:"
  ]);
  await expect(page.getByRole("button", { name: "Kopiér notat" })).toBeVisible({ timeout: 2500 });
});

test("C33 offers a discrete collapsible keyboard help closed by default", async ({ page }) => {
  const details = page.locator("details", { hasText: "Tastaturhjælp" });
  await expect(details).toBeVisible();
  await expect(details).not.toHaveJSProperty("open", true);

  await details.locator("summary").click();
  await expect(details).toHaveJSProperty("open", true);
  await expect(details.getByText("Tab / Shift+Tab", { exact: false })).toBeVisible();
  await expect(details.getByText("Pil ned/op", { exact: false })).toBeVisible();
  await expect(details.getByText("Enter/Space", { exact: false })).toBeVisible();
  await expect(details.getByText("N vælger", { exact: false })).toBeVisible();
});

test("C33 exposes stable data-keyboard-group markers for the focus manager", async ({ page }) => {
  await chooseTraumaProfile(page);
  await expect(page.locator('[data-keyboard-group="side"]')).toHaveCount(1);
  await expect(page.locator('[data-keyboard-group="provocation"]')).toHaveCount(1);
  await expect(page.locator('[data-keyboard-group="plan-self-care"]')).toHaveCount(1);
  await expect(page.locator('[data-keyboard-group="copy"]')).toHaveCount(1);
});

test("C33 keeps one Tab stop per exclusive category and Tab/Shift+Tab move by category", async ({ page }) => {
  await chooseTraumaProfile(page);

  const sideGroup = radiogroup(page, "Side");
  await sideGroup.getByRole("radio", { name: "Højre" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(sideGroup.getByRole("radio", { name: "Venstre" })).toBeFocused();
  await expect(sideGroup.getByRole("radio", { name: "Venstre" })).toHaveAttribute(
    "aria-checked",
    "true"
  );

  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Lokalisation")).toBeFocused();
  // Native select typeahead (not selectOption + Tab as the commit path).
  await page.keyboard.type("m");
  await expect(page.getByLabel("Lokalisation")).toHaveValue("medial");
  await page.keyboard.press("Tab");
  const debutGroup = radiogroup(page, "Debut");
  await expect(debutGroup.getByRole("radio", { name: "Akut" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(debutGroup.getByRole("radio", { name: "Snigende" })).toBeFocused();
  await expect(debutGroup.getByRole("radio", { name: "Snigende" })).toHaveAttribute(
    "aria-checked",
    "true"
  );

  await page.keyboard.press("Shift+Tab");
  await expect(page.getByLabel("Lokalisation")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(sideGroup.getByRole("radio", { name: "Venstre" })).toBeFocused();

  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Venstresidige");
});

test("C33 Lokalisation Enter/Space confirm the chosen value and advance to Debut; mouse does not advance", async ({ page }) => {
  await chooseTraumaProfile(page);
  const localisation = page.getByLabel("Lokalisation");
  const debutAkut = radiogroup(page, "Debut").getByRole("radio", { name: "Akut" });

  await localisation.focus();
  await page.keyboard.type("m");
  await expect(localisation).toHaveValue("medial");
  await page.keyboard.press("Enter");
  await expect(localisation).toHaveValue("medial");
  await expect(debutAkut).toBeFocused();

  await localisation.focus();
  await page.keyboard.type("l");
  await expect(localisation).toHaveValue("lateral");
  await page.keyboard.press("Space");
  await expect(localisation).toHaveValue("lateral");
  await expect(debutAkut).toBeFocused();

  await localisation.focus();
  await localisation.selectOption("anterior");
  await expect(localisation).toHaveValue("anterior");
  await expect(localisation).toBeFocused();
  await expect(debutAkut).not.toBeFocused();
});

test("C33 moves between categories with ArrowDown/ArrowUp, not just Tab", async ({ page }) => {
  await chooseTraumaProfile(page);
  const sideGroup = radiogroup(page, "Side");
  await sideGroup.getByRole("radio", { name: "Højre" }).focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByLabel("Lokalisation")).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(sideGroup.getByRole("radio", { name: "Højre" })).toBeFocused();
});

test("C33 never intercepts ArrowUp/Down or n typing inside editable controls", async ({ page }) => {
  await chooseTraumaProfile(page);

  const duration = page.getByLabel("Varighed");
  await duration.fill("nat");
  await duration.focus();
  await duration.evaluate((el: HTMLInputElement) => {
    el.setSelectionRange(1, 1);
  });
  // Mid-text ArrowDown must keep caret editing, not jump category.
  await page.keyboard.press("ArrowDown");
  await expect(duration).toBeFocused();
  await expect(duration).toHaveValue("nat");

  await duration.fill("");
  await page.keyboard.type("n");
  await expect(duration).toHaveValue("n");

  await radiogroup(page, "Traume").getByRole("radio", { name: "Ja" }).click();
  const supplementary = page.getByLabel("Supplerende", { exact: true });
  await supplementary.fill("knæ");
  await supplementary.focus();
  await supplementary.evaluate((el: HTMLInputElement) => {
    el.setSelectionRange(1, 1);
  });
  await page.keyboard.press("ArrowDown");
  await expect(supplementary).toBeFocused();
  await page.keyboard.type("n");
  // Native single-line ArrowDown moves caret to end; category focus must stay.
  await expect(supplementary).toHaveValue("knæn");

  const analysis = page.getByPlaceholder("Skriv din analyse. Cortex udfylder den ikke.");
  await analysis.focus();
  await page.keyboard.type("n");
  await page.keyboard.press("ArrowDown");
  await expect(analysis).toBeFocused();
  await expect(analysis).toHaveValue("n");

  const search = page.getByLabel("Søg klinisk problem");
  await search.focus();
  await search.fill("knæ");
  await search.evaluate((el: HTMLInputElement) => {
    el.setSelectionRange(1, 1);
  });
  await page.keyboard.press("ArrowDown");
  await expect(search).toBeFocused();
  await page.keyboard.type("n");
  await expect(search).toHaveValue("knæn");
});

test("C33 lets 'n' select contextual normal shortcuts, never on Side or Plan", async ({ page }) => {
  await chooseTraumaProfile(page);

  await radiogroup(page, "Traume").getByRole("radio", { name: "Ja" }).focus();
  await page.keyboard.press("n");
  await expect(radiogroup(page, "Traume").getByRole("radio", { name: "Nej" }))
    .toHaveAttribute("aria-checked", "true");

  await radiogroup(page, "Funktion").getByRole("radio", { name: "Let nedsat" }).focus();
  await page.keyboard.press("n");
  await expect(radiogroup(page, "Funktion").getByRole("radio", { name: "Upåvirket" }))
    .toHaveAttribute("aria-checked", "true");

  await radiogroup(page, "Hævelse").getByRole("radio", { name: "Let" }).focus();
  await page.keyboard.press("n");
  await expect(radiogroup(page, "Hævelse").getByRole("radio", { name: "Ingen" }))
    .toHaveAttribute("aria-checked", "true");

  await choiceGroup(page, "Red flags").getByRole("button", { name: /Infektionsrisiko/ }).focus();
  await page.keyboard.press("n");
  await expect(choiceGroup(page, "Red flags").getByRole("button", { name: "Ingen red flags" }))
    .toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", {
    name: "Ingen aflåsning eller instabilitetsfornemmelse"
  }).focus();
  await page.keyboard.press("n");
  await expect(page.getByRole("button", {
    name: "Ingen aflåsning eller instabilitetsfornemmelse"
  })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Ingen ledsagesymptomer" }).focus();
  await page.keyboard.press("n");
  await expect(page.getByRole("button", { name: "Ingen ledsagesymptomer" }))
    .toHaveAttribute("aria-pressed", "true");

  await radiogroup(page, "Gang").getByRole("radio", { name: "Haltende" }).focus();
  await page.keyboard.press("n");
  await expect(radiogroup(page, "Gang").getByRole("radio", { name: "Normal" }))
    .toHaveAttribute("aria-checked", "true");

  await choiceGroup(page, "Inspektion").getByRole("button", { name: "Hævelse" }).focus();
  await page.keyboard.press("n");
  await expect(choiceGroup(page, "Inspektion").getByRole("button", { name: "Ingen særlige fund" }))
    .toHaveAttribute("aria-pressed", "true");

  await radiogroup(page, "Effusion").getByRole("radio", { name: "Let" }).focus();
  await page.keyboard.press("n");
  await expect(radiogroup(page, "Effusion").getByRole("radio", { name: "Ingen" }))
    .toHaveAttribute("aria-checked", "true");

  await choiceGroup(page, "Palpationsømhed").getByRole("button", { name: "MCL" }).focus();
  await page.keyboard.press("n");
  await expect(choiceGroup(page, "Palpationsømhed").getByRole("button", { name: "Ingen fokal ømhed" }))
    .toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Abnorm ROM/specificer" }).focus();
  await page.keyboard.press("n");
  await expect(page.getByRole("button", { name: "Normal ROM 0–140°" }))
    .toHaveAttribute("aria-pressed", "true");

  await radiogroup(page, "Lachman").getByRole("radio", { name: "Negativ" }).focus();
  await page.keyboard.press("n");
  await expect(page.getByRole("button", { name: "Knæ-test normale" }))
    .toHaveAttribute("aria-pressed", "true");

  const sideBefore = await radiogroup(page, "Side").getByRole("radio", { name: "Højre" })
    .getAttribute("aria-checked");
  await radiogroup(page, "Side").getByRole("radio", { name: "Højre" }).focus();
  await page.keyboard.press("n");
  await expect(radiogroup(page, "Side").getByRole("radio", { name: "Højre" }))
    .toHaveAttribute("aria-checked", sideBefore ?? "false");

  const planFirst = choiceGroup(page, "Plan").getByRole("button").first();
  const planPressed = await planFirst.getAttribute("aria-pressed");
  await planFirst.focus();
  await page.keyboard.press("n");
  await expect(planFirst).toHaveAttribute("aria-pressed", planPressed ?? "false");
});

test("C33 offers exactly the five red flag consequence groups plus the aggregate negative, with 'Ingen red flags' first", async ({ page }) => {
  await chooseTraumaProfile(page);
  const group = choiceGroup(page, "Red flags");
  const buttons = group.getByRole("button");
  await expect(buttons.first()).toHaveText("Ingen red flags");
  await expect(group.getByRole("button", { name: /Infektionsrisiko/ })).toBeVisible();
  await expect(group.getByRole("button", { name: /Kan ikke belaste knæet/ })).toBeVisible();
  await expect(group.getByRole("button", { name: /Hurtig hævelse efter traume/ })).toBeVisible();
  await expect(group.getByRole("button", { name: /malignitetsmistanke/ })).toBeVisible();
  await expect(group.getByRole("button", { name: /Højenergitraume/ })).toBeVisible();
  await expect(buttons).toHaveCount(6);
});

test("C33 writes a specific sentence for a positive red flag group and never overwrites it", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("radio", { name: "Højre" }).click();
  const group = choiceGroup(page, "Red flags");
  const malignancy = group.getByRole("button", { name: /malignitetsmistanke/ });
  await malignancy.click();
  await expect(malignancy).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText(
    "Nattesmerte, uforklaret vægttab eller tidligere cancer (malignitetsmistanke)."
  );

  await group.getByRole("button", { name: "Ingen red flags" }).click();
  await expect(page.getByText(
    "Fjern positive red flags før samlet negativ registrering."
  )).toBeVisible();
  await expect(malignancy).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText(
    "Ingen tegn på infektion"
  );
});

test("C33 keeps the aggregate red flag sentence out of Quick but present in Standard", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("radio", { name: "Højre" }).click();
  await choiceGroup(page, "Red flags")
    .getByRole("button", { name: "Ingen red flags" })
    .click();

  await page.getByRole("radio", { name: "Standard" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText(
    "Ingen tegn på infektion, fraktur/alvorlig ledskade, hæmartron, malignitetsmistanke eller højenergitraume."
  );

  await page.getByRole("radio", { name: "Quick" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText(
    "Ingen tegn på infektion"
  );
});

test("C33 keeps Baggrund content out of Quick but includes it in Standard, without ever writing a hidden red flag", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByText("Baggrund · valgfrit").click();
  await choiceGroup(page, "Komorbiditet").getByRole("button", { name: "Immunsuppression" }).click();

  await page.getByRole("radio", { name: "Standard" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Baggrund:");
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("Immunsuppression");

  await page.getByRole("radio", { name: "Quick" }).click();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("Baggrund:");

  const infection = choiceGroup(page, "Red flags")
    .getByRole("button", { name: /Infektionsrisiko/ });
  await expect(infection).toHaveAttribute("aria-pressed", "false");
});

test("C33 trauma detail controls are individually interactive with visible selected state", async ({ page }) => {
  await chooseTraumaProfile(page);
  await radiogroup(page, "Traume").getByRole("radio", { name: "Ja" }).click();

  const mechanisms = [
    "Vrid",
    "Direkte slag",
    "Hyperekstension",
    "Valgus-/varusbelastning",
    "Landing fra spring"
  ];
  for (const label of mechanisms) {
    const button = page.getByRole("radio", { name: label, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-checked", "true");
  }

  const snap = page.getByRole("button", { name: "Mærket smæld" });
  await expect(snap).toHaveAttribute("aria-pressed", "false");
  await snap.click();
  await expect(snap).toHaveAttribute("aria-pressed", "true");
  const snapBox = await snap.boundingBox();
  const mechanismBox = await page.getByRole("radio", { name: "Vrid", exact: true }).boundingBox();
  expect(snapBox?.height).toBeCloseTo(mechanismBox?.height ?? 0, 0);

  const gte4 = page.getByRole("radio", { name: "≥4 skridt" });
  const lt4 = page.getByRole("radio", { name: "<4 skridt" });
  await expect(gte4).toHaveAttribute("aria-checked", "false");
  await gte4.click();
  await expect(gte4).toHaveAttribute("aria-checked", "true");
  await lt4.click();
  await expect(gte4).toHaveAttribute("aria-checked", "false");
  await expect(lt4).toHaveAttribute("aria-checked", "true");

  await expect(page.getByLabel("Supplerende", { exact: true })).toBeVisible();
  await page.getByLabel("Supplerende", { exact: true }).fill("under håndbold");
  await page.getByLabel("Supplerende", { exact: true }).blur();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("under håndbold");
});

test("C33 renames the trauma free-text field to Supplerende and keeps it under Traumeoplysninger", async ({ page }) => {
  await chooseTraumaProfile(page);
  await radiogroup(page, "Traume").getByRole("radio", { name: "Ja" }).click();
  await expect(page.getByLabel("Supplerende traumebeskrivelse")).toHaveCount(0);
  await expect(page.getByText("Typisk traumeforløb", { exact: false })).toHaveCount(0);
  const traumaBlock = page.locator("div", { has: page.getByText("Traumeoplysninger", { exact: true }) }).first();
  await expect(traumaBlock.getByLabel("Supplerende", { exact: true })).toBeVisible();
  await page.getByLabel("Supplerende", { exact: true }).fill("under fodbold");
  await page.getByLabel("Supplerende", { exact: true }).blur();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("under fodbold");
});

test("C33 keyboard traverses the full Traumeoplysninger sequence without skipping smæld, load capacity or Supplerende", async ({ page }) => {
  await chooseTraumaProfile(page);
  const traumaGroup = radiogroup(page, "Traume");
  await traumaGroup.getByRole("radio", { name: "Ja" }).click();
  await traumaGroup.getByRole("radio", { name: "Ja" }).focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "Vrid" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Mærket smæld" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "≥4 skridt" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByLabel("Supplerende", { exact: true })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Belastning/gang" })).toBeFocused();
});

test("C33 keyboard does not skip Provokation after Traume=Nej", async ({ page }) => {
  await chooseTraumaProfile(page);
  const traumaGroup = radiogroup(page, "Traume");
  await traumaGroup.getByRole("radio", { name: "Nej" }).click();
  await traumaGroup.getByRole("radio", { name: "Nej" }).focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Belastning/gang" })).toBeFocused();
});

test("C33 keyboard Traume=Nej -> Provokation -> Funktion -> Ledsagesymptomer -> Red flags", async ({ page }) => {
  await chooseTraumaProfile(page);
  const traumaGroup = radiogroup(page, "Traume");
  await traumaGroup.getByRole("radio", { name: "Nej" }).click();
  await traumaGroup.getByRole("radio", { name: "Nej" }).focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Belastning/gang" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(radiogroup(page, "Funktion").getByRole("radio", { name: "Upåvirket" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Ingen ledsagesymptomer" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(radiogroup(page, "Hævelse").getByRole("radio", { name: "Ingen" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByText("Baggrund · valgfrit")).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", {
    name: "Ingen aflåsning eller instabilitetsfornemmelse"
  })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Red flags").getByRole("button", { name: "Ingen red flags" }))
    .toBeFocused();
});

test("C33 keyboard does not skip Provokation after Landing or after Supplerende", async ({ page }) => {
  await chooseTraumaProfile(page);
  await radiogroup(page, "Traume").getByRole("radio", { name: "Ja" }).click();

  const landing = page.getByRole("radio", { name: "Landing fra spring" });
  await landing.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Mærket smæld" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "≥4 skridt" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByLabel("Supplerende", { exact: true })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Belastning/gang" })).toBeFocused();

  await page.getByLabel("Supplerende", { exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Belastning/gang" })).toBeFocused();
  await expect(radiogroup(page, "Funktion").getByRole("radio", { name: "Upåvirket" }))
    .not.toBeFocused();
});

test("C33 keyboard Left/Right cycles exclusive choices and crosses at group boundaries", async ({ page }) => {
  await chooseTraumaProfile(page);
  const sideGroup = radiogroup(page, "Side");
  await sideGroup.getByRole("radio", { name: "Højre" }).focus();

  await page.keyboard.press("ArrowRight");
  await expect(sideGroup.getByRole("radio", { name: "Venstre" })).toBeFocused();
  await expect(sideGroup.getByRole("radio", { name: "Venstre" })).toHaveAttribute("aria-checked", "true");

  await page.keyboard.press("ArrowRight");
  await expect(sideGroup.getByRole("radio", { name: "Bilateral" })).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Lokalisation")).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(sideGroup.getByRole("radio", { name: "Bilateral" })).toBeFocused();
});

test("C33 multi-select Left/Right moves focus only and never changes selection", async ({ page }) => {
  await chooseTraumaProfile(page);
  const provocation = choiceGroup(page, "Provokation");
  const first = provocation.getByRole("button", { name: "Belastning/gang" });
  const second = provocation.getByRole("button", { name: "Trapper/dyb fleksion" });
  await first.focus();
  await expect(first).toHaveAttribute("aria-pressed", "false");

  await page.keyboard.press("ArrowRight");
  await expect(second).toBeFocused();
  await expect(first).toHaveAttribute("aria-pressed", "false");
  await expect(second).toHaveAttribute("aria-pressed", "false");
});

test("C33 Enter/Space auto-advances exclusive choices but never multi-select", async ({ page }) => {
  await chooseTraumaProfile(page);
  const debut = radiogroup(page, "Debut");
  await debut.getByRole("radio", { name: "Akut" }).focus();
  await page.keyboard.press("Enter");
  await expect(debut.getByRole("radio", { name: "Akut" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByLabel("Varighed")).toBeFocused();

  await radiogroup(page, "Debut").getByRole("radio", { name: "Akut" }).focus();
  await page.keyboard.press("Space");
  await expect(page.getByLabel("Varighed")).toBeFocused();

  const provocation = choiceGroup(page, "Provokation");
  await provocation.getByRole("button", { name: "Belastning/gang" }).focus();
  await page.keyboard.press("Enter");
  await expect(provocation.getByRole("button", { name: "Belastning/gang" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(provocation.getByRole("button", { name: "Belastning/gang" })).toBeFocused();

  await provocation.getByRole("button", { name: "Rotation/retningsskift" }).focus();
  await page.keyboard.press("Space");
  await expect(provocation.getByRole("button", { name: "Rotation/retningsskift" }))
    .toHaveAttribute("aria-pressed", "true");
  await expect(provocation.getByRole("button", { name: "Rotation/retningsskift" })).toBeFocused();
});

test("C33 keyboard moves Funktion -> Ledsagesymptomer -> Hævelse -> Baggrund trigger -> Mekaniske symptomer -> Red flags", async ({ page }) => {
  await chooseTraumaProfile(page);
  const funktionGroup = radiogroup(page, "Funktion");
  await funktionGroup.getByRole("radio", { name: "Upåvirket" }).focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Ingen ledsagesymptomer" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  const hævelseGroup = radiogroup(page, "Hævelse");
  await expect(hævelseGroup.getByRole("radio", { name: "Ingen" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  const baggrundTrigger = page.getByText("Baggrund · valgfrit");
  await expect(baggrundTrigger).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Ingen aflåsning eller instabilitetsfornemmelse" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Red flags").getByRole("button", { name: "Ingen red flags" }))
    .toBeFocused();
});

test("C33 keyboard includes Hævelsens onset only when swelling is positive", async ({ page }) => {
  await chooseTraumaProfile(page);
  const swelling = radiogroup(page, "Hævelse");
  await swelling.getByRole("radio", { name: "Ingen" }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByText("Baggrund · valgfrit")).toBeFocused();

  await swelling.getByRole("radio", { name: "Let" }).click();
  await swelling.getByRole("radio", { name: "Let" }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(radiogroup(page, "Hævelsen opstod").getByRole("radio", { name: "Straks" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByText("Baggrund · valgfrit")).toBeFocused();
});

test("C33 keyboard moves Gang -> Inspektion -> Effusion -> Palpationsømhed", async ({ page }) => {
  await chooseTraumaProfile(page);
  const gang = radiogroup(page, "Gang");
  await gang.getByRole("radio", { name: "Normal" }).focus();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Inspektion").getByRole("button", { name: "Ingen særlige fund" }))
    .toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(radiogroup(page, "Effusion").getByRole("radio", { name: "Ingen" }))
    .toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Palpationsømhed").getByRole("button", { name: "Ingen fokal ømhed" }))
    .toBeFocused();
});

test("C33 keyboard reaches Baggrund content once expanded, including the Komorbiditet chips", async ({ page }) => {
  await chooseTraumaProfile(page);
  const baggrundTrigger = page.getByText("Baggrund · valgfrit");
  await baggrundTrigger.click();
  await baggrundTrigger.focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("group", { name: "Tidligere knæskade" }).getByRole("button", { name: "Ja" }))
    .toBeFocused();

  await page.keyboard.press("ArrowDown");
  const komorbiditet = choiceGroup(page, "Komorbiditet");
  await expect(komorbiditet.getByRole("button", { name: "Kendt ledsygdom" })).toBeFocused();
  await expect(komorbiditet.getByRole("button", { name: "Artrose" })).toBeVisible();
  await expect(komorbiditet.getByRole("button", { name: "Inflammatorisk ledsygdom" })).toBeVisible();
  await komorbiditet.getByRole("button", { name: "Diabetes" }).click();
  await expect(komorbiditet.getByRole("button", { name: "Diabetes" })).toHaveAttribute("aria-pressed", "true");

  const diabetes = komorbiditet.getByRole("button", { name: "Diabetes" });
  const reference = radiogroup(page, "Funktion").getByRole("radio", { name: "Upåvirket" });
  const [diabetesBox, referenceBox] = await Promise.all([
    diabetes.boundingBox(),
    reference.boundingBox()
  ]);
  expect(diabetesBox?.height).toBeCloseTo(referenceBox?.height ?? 0, 0);

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Medicin").getByRole("button", { name: "Antikoagulantia" }))
    .toBeFocused();

  await expect(page.getByLabel("Sport/arbejde")).toHaveCount(0);
  await expect(page.getByLabel("Familiær disposition")).toHaveCount(0);
});

test("C33 keyboard reverse order from Red flags back through Mekaniske and Baggrund trigger", async ({ page }) => {
  await chooseTraumaProfile(page);
  await choiceGroup(page, "Red flags").getByRole("button", { name: "Ingen red flags" }).focus();
  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("button", {
    name: "Ingen aflåsning eller instabilitetsfornemmelse"
  })).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(page.getByText("Baggrund · valgfrit")).toBeFocused();
});

test("C33 gives Ledsagesymptomer and Mekaniske symptomer batch buttons the same compact chip height as other choices", async ({ page }) => {
  await chooseTraumaProfile(page);
  const ledsage = page.getByRole("button", { name: "Ingen ledsagesymptomer" });
  const mekaniske = page.getByRole("button", { name: "Ingen aflåsning eller instabilitetsfornemmelse" });
  const reference = radiogroup(page, "Funktion").getByRole("radio", { name: "Upåvirket" });

  const [ledsageBox, mekaniskeBox, referenceBox] = await Promise.all([
    ledsage.boundingBox(),
    mekaniske.boundingBox(),
    reference.boundingBox()
  ]);
  expect(ledsageBox?.height).toBeCloseTo(referenceBox?.height ?? 0, 0);
  expect(mekaniskeBox?.height).toBeCloseTo(referenceBox?.height ?? 0, 0);
});

test("C33 baseline-aligns the Side/Lokalisation/Debut/Varighed/Smertemønster headings regardless of Bilateral wrapping", async ({ page }) => {
  await chooseTraumaProfile(page);
  const headings = ["Side", "Lokalisation", "Debut", "Varighed", "Smertemønster"];
  const tops = await Promise.all(
    headings.map((text) => page.getByText(text, { exact: true }).first().evaluate(
      (el) => el.getBoundingClientRect().top
    ))
  );
  const [first, ...rest] = tops;
  for (const top of rest) {
    expect(top).toBeCloseTo(first, 0);
  }
});

test("C33 keyboard traverses Plan groups in visual order, then document profile, then Copy", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("radio", { name: "Højre" }).click();

  const selfCare = choiceGroup(page, "Selvpleje");
  await selfCare.getByRole("button").first().focus();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Plan").getByRole("button").first()).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(choiceGroup(page, "Plan").getByRole("button").nth(1)).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Smertebehandling").getByRole("button").first()).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Billeddiagnostik").getByRole("button").first()).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Henvisning").getByRole("button").first()).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Opfølgning").getByRole("button").first()).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Safety-net").getByRole("button").first()).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(choiceGroup(page, "Information").getByRole("button").first()).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "Standard" })).toBeFocused();
  await expect(page.getByRole("radio", { name: "Standard" })).toHaveAttribute("aria-checked", "true");

  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("radio", { name: "Quick" })).toBeFocused();
  await expect(page.getByRole("radio", { name: "Quick" })).toHaveAttribute("aria-checked", "true");

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Kopiér notat" })).toBeFocused();
});

test("C33 lets Plan phrase multi-select buttons keep focus without auto-advancing", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("radio", { name: "Højre" }).click();

  const planGroup = choiceGroup(page, "Plan");
  await planGroup.getByRole("button").first().focus();
  await page.keyboard.press("Enter");
  await expect(planGroup.getByRole("button").first()).toHaveAttribute("aria-pressed", "true");
  await expect(planGroup.getByRole("button").first()).toBeFocused();
});

test("C33 gates side-dependent Plan phrases on an explicit Side (incl. Bilateral) and never duplicates a chosen phrase", async ({ page }) => {
  await chooseTraumaProfile(page);
  const xray = page.getByRole("button", { name: /Rp\. røntgen af.*knæ\./ });
  await expect(xray).toBeDisabled();

  await radiogroup(page, "Side").getByRole("radio", { name: "Bilateral" }).click();
  await expect(xray).toBeEnabled();
  await expect(xray).toHaveText("Rp. røntgen af begge knæ.");

  await xray.click();
  await expect(xray).toHaveAttribute("aria-pressed", "true");

  const planSection = page.locator("section", {
    has: page.getByRole("heading", { name: "Plan" })
  });
  await expect(planSection.getByText("Rp. røntgen af begge knæ.", { exact: true }))
    .toHaveCount(1);
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText(
    "Rp. røntgen af begge knæ."
  );
});

test("C33 keyboard forward path Problem -> Side -> … -> Traume=Nej -> Provokation without skips", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByLabel("Søg klinisk problem").focus();
  await page.keyboard.press("Tab");
  await expect(radiogroup(page, "Side").getByRole("radio").first()).toBeFocused();

  const forward: Array<() => Promise<void>> = [
    async () => expect(page.getByLabel("Lokalisation")).toBeFocused(),
    async () => expect(radiogroup(page, "Debut").getByRole("radio").first()).toBeFocused(),
    async () => expect(page.getByLabel("Varighed")).toBeFocused(),
    async () => expect(radiogroup(page, "Smertemønster").getByRole("radio").first()).toBeFocused(),
    async () => expect(radiogroup(page, "Traume").getByRole("radio").first()).toBeFocused()
  ];
  for (const assertion of forward) {
    await page.keyboard.press("ArrowDown");
    await assertion();
  }

  await radiogroup(page, "Traume").getByRole("radio", { name: "Nej" }).click();
  await radiogroup(page, "Traume").getByRole("radio", { name: "Nej" }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Belastning/gang" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(radiogroup(page, "Funktion").getByRole("radio").first()).toBeFocused();
});

test("C33 multi-select categories expose a single Tab stop via roving tabindex", async ({ page }) => {
  await chooseTraumaProfile(page);
  const provocation = choiceGroup(page, "Provokation");
  await provocation.getByRole("button", { name: "Belastning/gang" }).focus();
  await page.keyboard.press("Tab");
  await expect(radiogroup(page, "Funktion").getByRole("radio").first()).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(provocation.getByRole("button", { name: "Belastning/gang" })).toBeFocused();
});

test("C33 mechanical negative confirmation advances to Red flags; positive chips stay in group", async ({ page }) => {
  await chooseTraumaProfile(page);
  const negative = page.getByRole("button", {
    name: "Ingen aflåsning eller instabilitetsfornemmelse"
  });
  await negative.focus();
  await page.keyboard.press("Enter");
  await expect(negative).toHaveAttribute("aria-pressed", "true");
  await expect(choiceGroup(page, "Red flags").getByRole("button", { name: "Ingen red flags" }))
    .toBeFocused();

  const locking = page.getByRole("button", { name: "Aflåsning", exact: true });
  await locking.focus();
  await page.keyboard.press("Enter");
  await expect(locking).toHaveAttribute("aria-pressed", "true");
  await expect(locking).toBeFocused();
});

test("C33 keyboard survives Enter through free-text without runtime focus errors", async ({ page }) => {
  await chooseTraumaProfile(page);
  const duration = page.getByLabel("Varighed");
  await duration.focus();
  await page.keyboard.type("2 dage");
  await page.keyboard.press("Enter");
  await expect(radiogroup(page, "Smertemønster").getByRole("radio").first()).toBeFocused();
  await expect(page.locator("body")).not.toContainText("Cannot read properties of null");
});

test("C33 seeds a clinician-owned unfinished Analyse draft that does not enter A:", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("radio", { name: "Højre" }).click();
  await radiogroup(page, "Traume").getByRole("radio", { name: "Ja" }).click();
  await page.getByRole("radio", { name: "Vrid" }).click();

  const analysis = page.getByPlaceholder("Skriv din analyse. Cortex udfylder den ikke.");
  await expect(analysis).toHaveValue("Vridtraume i højre knæ med kliniske fund forenelige med ");
  await expect(page.getByText("Klinikerejet udkast", { exact: false })).toBeVisible();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).not.toContainText("forenelige med");

  await analysis.focus();
  await page.keyboard.type("mistanke om menisklæsion.");
  await analysis.blur();
  await expect(page.getByLabel("Rediger PSOAP-dokument")).toContainText("forenelige med mistanke om menisklæsion");
});

test("C33 keyboard walks Traume to Dokumentation without skips after Traume=Nej", async ({ page }) => {
  await chooseTraumaProfile(page);
  await radiogroup(page, "Traume").getByRole("radio", { name: "Nej" }).click();
  await radiogroup(page, "Traume").getByRole("radio", { name: "Nej" }).focus();

  const steps: Array<() => Promise<void>> = [
    async () => expect(page.getByRole("button", { name: "Belastning/gang" })).toBeFocused(),
    async () => expect(radiogroup(page, "Funktion").getByRole("radio").first()).toBeFocused(),
    async () => expect(page.getByRole("button", { name: "Ingen ledsagesymptomer" })).toBeFocused(),
    async () => expect(radiogroup(page, "Hævelse").getByRole("radio").first()).toBeFocused(),
    async () => expect(page.getByText("Baggrund · valgfrit")).toBeFocused(),
    async () => expect(page.getByRole("button", {
      name: "Ingen aflåsning eller instabilitetsfornemmelse"
    })).toBeFocused(),
    async () => expect(choiceGroup(page, "Red flags").getByRole("button").first()).toBeFocused(),
    async () => expect(radiogroup(page, "Gang").getByRole("radio").first()).toBeFocused(),
    async () => expect(choiceGroup(page, "Inspektion").getByRole("button").first()).toBeFocused(),
    async () => expect(radiogroup(page, "Effusion").getByRole("radio").first()).toBeFocused(),
    async () => expect(choiceGroup(page, "Palpationsømhed").getByRole("button").first()).toBeFocused(),
    async () => expect(page.getByRole("button", { name: "Normal ROM 0–140°" })).toBeFocused(),
    async () => expect(radiogroup(page, "Lachman").getByRole("radio").first()).toBeFocused()
  ];
  for (const assertion of steps) {
    await page.keyboard.press("ArrowDown");
    await assertion();
  }
});

test("C33 Quick note is shorter than Standard and omits Standard-only content", async ({ page }) => {
  await chooseTraumaProfile(page);
  await page.getByRole("radio", { name: "Højre" }).click();
  await page.getByRole("button", {
    name: "Ingen aflåsning eller instabilitetsfornemmelse"
  }).click();
  await choiceGroup(page, "Red flags").getByRole("button", { name: "Ingen red flags" }).click();
  await page.getByText("Baggrund · valgfrit").click();
  await choiceGroup(page, "Komorbiditet").getByRole("button", { name: "Diabetes" }).click();
  await page.getByRole("button", {
    name: "Kontrol ved vedvarende gener eller tidligere ved forværring."
  }).click();

  await page.getByRole("radio", { name: "Standard" }).click();
  const standard = await psoapDocumentText(page);
  await page.getByRole("radio", { name: "Quick" }).click();
  const quick = await psoapDocumentText(page);

  expect(quick.length).toBeLessThan(standard.length);
  expect(quick).not.toContain("Baggrund:");
  expect(quick).not.toContain("Ingen tegn på infektion");
  expect(quick).not.toContain("Ingen ægte aflåsning");
  expect(quick).not.toContain("Opfølgning:");
  expect(standard).toContain("Baggrund:");
  expect(standard).toContain("Ingen tegn på infektion");
});
