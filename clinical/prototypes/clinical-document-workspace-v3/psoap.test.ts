import { describe, expect, it } from "vitest";

import { createEmptyStateV3 } from "./model";
import { workspaceReducerV3, type WorkspaceActionV3 } from "./reducer";
import { formatPsoap, hasClinicalContent } from "./psoap";

function reduce(actions: readonly WorkspaceActionV3[]) {
  return actions.reduce(workspaceReducerV3, createEmptyStateV3());
}

describe("PSOAP formatting", () => {
  it("always renders exactly five P:/S:/O:/A:/P: lines, even when empty", () => {
    const text = formatPsoap(createEmptyStateV3());
    const lines = text.split("\n");
    expect(lines).toHaveLength(5);
    expect(lines[0]).toBe("P: Problem: Knæsmerte");
    expect(lines[1]).toBe("S: Ikke registreret");
    expect(lines[2]).toBe("O: Ikke registreret");
    expect(lines[3]).toBe("A: Ikke registreret");
    expect(lines[4]).toBe("P: Ikke registreret");
    expect(hasClinicalContent(createEmptyStateV3())).toBe(false);
  });

  it("never invents a fact for an untouched field", () => {
    const state = reduce([{ type: "set-fact", key: "side", value: "right" }]);
    const text = formatPsoap(state);
    expect(text).toContain("P: Problem: Knæsmerte (højre)");
    // Nothing else was recorded — subjective/objective/assessment/plan stay empty.
    expect(text.split("\n")[1]).toBe("S: Ikke registreret");
  });

  it("renders a complete document with all five sections populated", () => {
    const state = reduce([
      { type: "set-fact", key: "side", value: "right" },
      { type: "set-fact", key: "onset", value: "acute" },
      { type: "set-fact", key: "trauma", value: "yes" },
      { type: "toggle-list-fact", key: "traumaMechanisms", value: "twisting-planted-foot" },
      { type: "set-fact", key: "gait", value: "normal" },
      { type: "set-fact", key: "rom", value: "normal" },
      { type: "set-fact", key: "tenderness", value: "medial-joint-line" },
      { type: "set-assessment-note", value: "Mulig meniskpåvirkning, afventer forløb" },
      { type: "toggle-plan-action", action: "physiotherapy" },
      { type: "toggle-pain-medication", medication: "paracetamol" },
      { type: "toggle-follow-up-phrase" }
    ]);
    const text = formatPsoap(state);
    const [p1, s, o, a, p2] = text.split("\n");
    expect(p1).toBe("P: Problem: Knæsmerte (højre)");
    expect(s).toContain("Akut debut");
    expect(s).toContain("vrid på fikseret fod");
    expect(o).toContain("Normal gang");
    expect(o).toContain("Normal ROM 0–140°");
    expect(o).toContain("Medial ledlinjeømhed ved palpation");
    expect(a).toContain("Mulig meniskpåvirkning");
    expect(p2).toContain("Henvisning til fysioterapi");
    expect(p2).toContain("Paracetamol p.n.");
    expect(p2).toContain("Ny klinisk vurdering ved vedvarende gener eller forværring");
    expect(p2.startsWith("Plan:")).toBe(false);
    expect(hasClinicalContent(state)).toBe(true);
  });

  it("shows the direct-click normal ROM phrase without extension/flexion detail", () => {
    const state = reduce([{ type: "set-fact", key: "rom", value: "normal" }]);
    const text = formatPsoap(state);
    expect(text).toContain("Normal ROM 0–140°");
    expect(text).not.toContain("ekstension");
    expect(text).not.toContain("fleksion");
  });

  it("shows extension/flexion detail only when ROM is abnormal", () => {
    const state = reduce([
      { type: "set-fact", key: "rom", value: "abnormal" },
      { type: "set-fact", key: "extension", value: "reduced" },
      { type: "set-fact", key: "flexion", value: "full" }
    ]);
    const text = formatPsoap(state);
    expect(text).toContain("reduceret ekstension");
    expect(text).toContain("fuld fleksion");
    expect(text).not.toContain("Normal ROM 0–140°");
  });

  it("renders the single combined negative-bundle sentence instead of four separate ones", () => {
    const state = reduce([{ type: "confirm-negative-bundle" }]);
    const text = formatPsoap(state);
    expect(text).toContain("Ingen aflåsning, instabilitet, hvile- eller nattesmerter.");
    expect(text).not.toContain("Ingen aflåsning. Ingen instabilitet.");
  });

  it("renders 'Ingen red flags' as a single sentence when confirmed with no positives", () => {
    const state = reduce([{ type: "confirm-no-red-flags" }]);
    expect(formatPsoap(state)).toContain("Ingen red flags.");
  });

  it("renders individual positive red flags instead of the negative summary", () => {
    const state = reduce([
      { type: "confirm-no-red-flags" },
      { type: "set-fact", key: "fever", value: "yes" }
    ]);
    const text = formatPsoap(state);
    expect(text).toContain("Feber registreret.");
    expect(text).not.toContain("Ingen red flags.");
  });

  it("produces identical PSOAP text in Quick and Standard modes from the same facts", () => {
    const quick = reduce([
      { type: "set-fact", key: "side", value: "left" },
      { type: "set-fact", key: "onset", value: "gradual" },
      { type: "toggle-plan-action", action: "exercise" }
    ]);
    const standard = workspaceReducerV3(quick, { type: "set-mode", mode: "standard" });
    expect(formatPsoap(standard)).toBe(formatPsoap(quick));
    expect(standard.facts).toEqual(quick.facts);
  });
});
