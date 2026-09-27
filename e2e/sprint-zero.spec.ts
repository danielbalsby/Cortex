import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/sprint-0";

async function openConsultation(page: Page) {
  await page.goto(route);
  await page.getByRole("button", { name: "Åbn ny konsultation" }).click();
}

async function recordCaseAndAssessment(page: Page) {
  await page.getByRole("button", { name: "Registrér kendte caseoplysninger" }).click();
  await page
    .getByLabel("Arbejdshypotese")
    .pressSequentially("Mistanke om menisk- eller ligamentskade");
  await page.getByRole("button", { name: "Registrér vurdering" }).click();
}

async function prepareBothReferrals(page: Page) {
  const plan = page.getByRole("group", { name: "Planhandlinger" });
  await plan.getByRole("button", { name: "Billeddiagnostik" }).click();
  await plan.getByRole("button", { name: "Fysioterapi" }).click();
  await page
    .getByRole("button", { name: "Forbered billeddiagnostisk henvisningsudkast" })
    .click();
  await page
    .getByRole("button", { name: "Forbered fysioterapihenvisningsudkast" })
    .click();
}

async function approveAndCopy(page: Page, title: string) {
  const draft = page.getByRole("region", { name: title });
  await draft.getByRole("button", { name: "Markér gennemgået" }).click();
  await expect(draft).toContainText("Reviewed");
  await draft.getByRole("button", { name: "Godkend til kopiering" }).click();
  await expect(draft).toContainText("Approved for copy");
  await draft.getByRole("button", { name: "Kopiér" }).click();
  await expect(draft).toContainText("Copied");
}

test("Sprint 0 opens a synthetic patient and keeps source, mock AI and clinician authority separate", async ({
  page
}) => {
  await page.goto(route);

  const patient = page.getByRole("complementary", {
    name: "Patientkontekst og mock AI"
  });
  await expect(patient.getByRole("heading", { name: "Syntetisk patient A" })).toBeVisible();
  await expect(patient).toContainText("Vridtraume under fodbold i går.");
  await expect(patient).toContainText("Instabilitet og belastningsevne er ikke oplyst");
  await expect(page.getByText("Ikke til klinisk brug.")).toBeVisible();

  await page.getByRole("button", { name: "Generér mock-resumé" }).click();
  await expect(page.getByText("deterministic-mock · sprint-0.mock-summary.v1")).toBeVisible();
  await expect(page.getByText(/ikke verificeret evidens, en klinisk vurdering eller en beslutning/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Klinikerens vurdering" })).toHaveCount(0);

  await page.getByRole("button", { name: "Afvis mock-resumé" }).click();
  await expect(page.getByText(/Mock-resumé afvist af klinikeren/)).toBeVisible();
  await expect(patient).toContainText("Vridtraume under fodbold i går.");
});

test("Sprint 0 records consultation facts explicitly and generates only recorded journal content", async ({
  page
}) => {
  await openConsultation(page);

  await expect(page.getByRole("group", { name: "Traume" }).getByRole("button", {
    name: "Ja, traume"
  })).toHaveAttribute("aria-pressed", "false");
  await recordCaseAndAssessment(page);

  const journal = page.getByRole("region", { name: "Journaludkast" });
  await expect(journal.getByLabel("Rediger journaludkast")).toHaveValue(
    /Traume registreret med vrid på fikseret fod/
  );
  await expect(journal.getByLabel("Rediger journaludkast")).toHaveValue(
    /Primær arbejdshypotese: Mistanke om menisk- eller ligamentskade\./
  );
  await expect(journal.getByLabel("Rediger journaludkast")).not.toHaveValue(
    /ingen instabilitet|normal gang|fuld ekstension/i
  );
});

test("Sprint 0 preserves manual journal edits and rejection never removes consultation facts", async ({
  page
}) => {
  await openConsultation(page);
  await recordCaseAndAssessment(page);

  const journal = page.getByRole("region", { name: "Journaludkast" });
  const editor = journal.getByLabel("Rediger journaludkast");
  await editor.fill("Klinikerens manuelt redigerede journaltekst.");
  await page
    .getByRole("group", { name: "Instabilitet" })
    .getByRole("button", { name: "Ja" })
    .click();
  await expect(editor).toHaveValue("Klinikerens manuelt redigerede journaltekst.");
  await expect(journal).toContainText("Klinikerens redigerede tekst er bevaret");

  await journal.getByRole("button", { name: "Afvis udkast" }).click();
  await expect(editor).toHaveValue("");
  await expect(journal).toContainText("Rejected");
  await expect(
    page
      .getByRole("group", { name: "Traumemekanisme" })
      .getByRole("button", { name: "Vrid på fikseret fod" })
  ).toHaveAttribute("aria-pressed", "true");

  await journal.getByRole("button", { name: "Gendan genereret" }).click();
  await expect(editor).toHaveValue(/vrid på fikseret fod/);
  await expect(journal).toContainText("Draft");
  await expect(
    page.getByText("Redigerede udkast").locator("..")
  ).toContainText("1");
});

test("Sprint 0 keeps referral intent and draft, review, approval and copy as separate states", async ({
  page,
  context
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await openConsultation(page);
  await recordCaseAndAssessment(page);

  const imaging = page.getByRole("region", { name: "Billeddiagnostisk henvisning" });
  const physiotherapy = page.getByRole("region", { name: "Fysioterapihenvisning" });
  await expect(imaging).toContainText("Eksplicit ønske om henvisningsudkast");
  await expect(physiotherapy).toContainText("Eksplicit ønske om henvisningsudkast");

  await prepareBothReferrals(page);
  await expect(imaging.getByLabel("Billeddiagnostisk henvisning")).toContainText(
    "Syntetisk prototypeudkast"
  );
  await expect(physiotherapy.getByLabel("Fysioterapihenvisning")).toContainText(
    "Plan: fysioterapeutisk vurdering."
  );
  await expect(imaging).toContainText("Draft");
  await expect(imaging.getByRole("button", { name: "Kopiér" })).toBeDisabled();

  await approveAndCopy(page, "Billeddiagnostisk henvisning");
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain(
    "billeddiagnostisk henvisning"
  );
  await approveAndCopy(page, "Fysioterapihenvisning");
  await approveAndCopy(page, "Journaludkast");

  const report = page.getByRole("region", { name: "Session report" });
  await expect(
    report.locator("dl").getByText("Scenario gennemført", { exact: true }).locator("..")
  ).toContainText("Ja");
  await expect(report).toContainText("Scenario gennemført");
});

test("Sprint 0 degraded AI state has a manual continuation and no dead end", async ({
  page
}) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Simulér AI-fejl" }).click();

  const degradedState = page.getByRole("alert").filter({
    hasText: "Mock-resuméet kunne ikke genereres"
  });
  await expect(degradedState).toContainText("AI Summary utilgængeligt");
  await expect(degradedState).toContainText("Fortsæt manuelt");
  await page.getByRole("button", { name: "Fortsæt manuelt" }).click();
  await expect(page.getByRole("heading", { name: "Konsultation" })).toBeVisible();

  await page.getByRole("button", { name: "Registrér kendte caseoplysninger" }).click();
  await expect(page.getByRole("region", { name: "Journaludkast" })).toContainText(
    "vrid på fikseret fod"
  );
  await expect(page.getByText("Fejltilstand løst").locator("..")).toContainText("Ja");
});
