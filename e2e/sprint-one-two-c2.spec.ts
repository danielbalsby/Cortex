import { expect, test, type Page } from "@playwright/test";

const route = "/prototype/sprint-1-2-c2";

async function select(page: Page, name: string, value: string) {
  await page.getByRole("combobox", { name, exact: true }).selectOption(value);
}

test("C2 opens as a readable clinical document without implicit facts", async ({ page }) => {
  await page.goto(route);

  await expect(page.getByText("Sprint 1.2 · narrative workspace comparator")).toBeVisible();
  await expect(page.getByRole("article", { name: "Klinisk dokument" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Anamnese" })).toContainText("Afventer eksplicit registrering");
  await expect(page.getByRole("region", { name: "Objektivt" })).toContainText("Afventer eksplicit registrering");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue("");
  await expect(page.getByRole("combobox")).toHaveCount(0);
  await expect(page.getByRole("complementary", { name: "Cortex Overblik" })).toContainText("0 af 5 områder belyst");
});

test("the shared Sprint 1.1 fixture renders only its recorded facts", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();

  const history = page.getByRole("region", { name: "Anamnese" });
  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(history).toContainText("34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går");
  await expect(journal).toHaveValue(/Mediale smerter og let hævelse/);
  await expect(journal).toHaveValue(/Ingen ægte aflåsning/);
  await expect(journal).not.toHaveValue(/normal gang|ingen instabilitet|klinikerens vurdering/i);
});

test("contextual inline controls update the shared clinical state and document", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Fortsæt i Anamnese" }).click();
  await expect(page.getByRole("combobox", { name: "Side" })).toBeFocused();

  await select(page, "Side", "right");
  await select(page, "Debut", "acute");
  await page.getByRole("textbox", { name: "Varighed" }).pressSequentially("tre dage");
  await select(page, "Smerteforløb", "intermittent");
  await page.getByRole("button", { name: "Rotation", exact: true }).click();

  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await expect(journal).toHaveValue(/34-årig mand med akut indsættende højresidige knæsmerter tre dage/);
  await expect(journal).toHaveValue(/Intermitterende smerter/);
  await expect(journal).toHaveValue(/Smerterne provokeres ved rotation/);
});

test("free navigation preserves state and keyboard activation moves focus into context", async ({ page }) => {
  await page.goto(route);
  const objective = page.getByRole("region", { name: "Objektivt" });
  const objectiveButton = objective.getByRole("button", { name: "Tilføj" });
  await objectiveButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("combobox", { name: "Gang" })).toBeFocused();
  await select(page, "Gang", "limp");

  await page.getByRole("region", { name: "Anamnese" }).getByRole("button", { name: "Tilføj" }).click();
  await page.getByRole("region", { name: "Objektivt" }).getByRole("button", { name: "Redigér" }).click();
  await expect(page.getByRole("combobox", { name: "Gang" })).toHaveValue("limp");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(/Haltende gang/);
});

test("blank and explicit not-assessed remain unresolved and absent from output", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("region", { name: "Objektivt" }).getByRole("button", { name: "Tilføj" }).click();
  await select(page, "Gang", "not-assessed");

  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue("");
  await expect(page.getByRole("complementary", { name: "Cortex Overblik" })).toContainText("Gang");
  await expect(page.getByRole("region", { name: "Objektivt" })).toContainText("Afventer eksplicit registrering");
});

test("parent correction exposes an explicit recovery copy and never leaks stale trauma facts", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  await page.getByRole("region", { name: "Anamnese" }).getByRole("button", { name: "Redigér" }).click();
  await select(page, "Traume", "no");

  const status = page.getByRole("status");
  await expect(status).toContainText("Tidligere oplysninger er bevaret til recovery");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).not.toHaveValue(/vridtraume|under fodbold/i);
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveCount(0);

  await page.getByRole("button", { name: "Gendan tidligere oplysninger" }).click();
  await expect(page.getByRole("combobox", { name: "Traume", exact: true })).toHaveValue("yes");
  await expect(page.getByRole("combobox", { name: "Traumemekanisme" })).toHaveValue("twisting");
  await expect(page.getByRole("textbox", { name: "Traumekontekst" })).toHaveValue("under fodbold");
  await expect(page.getByRole("textbox", { name: "Redigerbart journaludkast" })).toHaveValue(/vridtraume under fodbold/);
});

test("a manual journal draft remains separate and is marked stale after fact changes", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "Brug viste caseoplysninger" }).click();
  const journal = page.getByRole("textbox", { name: "Redigerbart journaludkast" });
  await journal.fill("Klinikerens redigerede draft.");

  await page.getByRole("region", { name: "Anamnese" }).getByRole("button", { name: "Redigér" }).click();
  await select(page, "Smerteforløb", "increasing");

  await expect(page.getByRole("status")).toContainText("redigerede draft er bevaret");
  await expect(journal).toHaveValue("Klinikerens redigerede draft.");
  await page.getByRole("button", { name: "Gendan tekst fra registrerede facts" }).click();
  await expect(journal).toHaveValue(/tiltagende smerter/);
});
