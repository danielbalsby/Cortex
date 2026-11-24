import { describe, expect, it } from "vitest";

import raa from "./styles.css?raw";

// Regressionstest for "+P/+V uden for synsfeltet" (lange behandlingslinjer gjorde listen
// bredere end panelet, så knappen kun kunne ses ved vandret scroll). Rettet i #65.
// Reglerne nedenfor er dem, der holder knappen inde i panelet; fjernes én, fejler testen.
// Målt i browser 2026-11-24 ved 1366×768, 1024, 820 og 700 px: ingen knap uden for panelet.

const css = raa.replace(/\s+/g, " ");
const regel = (selektor: string) => {
  const match = css.match(new RegExp(`(?:^|[}\\s])${selektor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\{([^}]*)\\}`));
  return match?.[1] ?? "";
};

describe("layout: punkter i beslutningsstøtten er aldrig bredere end panelet", () => {
  it("listen må krympe (grid-kolonne minmax(0, 1fr))", () => {
    expect(regel(".punkter")).toContain("grid-template-columns: minmax(0, 1fr)");
  });
  it("titlen må krympe og afkortes med …", () => {
    expect(regel(".punktDetaljer")).toContain("min-width: 0");
    const titel = regel(".titelLinje");
    for (const del of ["min-width: 0", "overflow: hidden", "text-overflow: ellipsis", "white-space: nowrap"]) {
      expect(titel).toContain(del);
    }
  });
  it("knappen +P/+V krymper aldrig", () => {
    expect(regel(".tilNotat")).toContain("flex: 0 0 auto");
  });
});
