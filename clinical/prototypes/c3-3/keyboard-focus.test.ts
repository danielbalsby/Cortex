import { describe, expect, it } from "vitest";

import {
  C33_KEYBOARD_GROUP_ORDER,
  focusAdjacentKeyboardGroup
} from "@/components/prototype/c3-3/keyboard";

describe("C33 keyboard group contract", () => {
  it("keeps the canonical forward clinical sequence without DOM dependence", () => {
    expect(C33_KEYBOARD_GROUP_ORDER).toEqual([
      "problem",
      "side",
      "localisation",
      "onset",
      "duration",
      "pain-course",
      "trauma",
      "trauma-mechanism",
      "trauma-snap",
      "trauma-weight-bearing",
      "trauma-supplementary",
      "provocation",
      "function",
      "accompanying",
      "swelling",
      "swelling-onset",
      "background-trigger",
      "background-history",
      "background-comorbidity",
      "background-medication",
      "mechanical",
      "red-flags",
      "gait",
      "inspection",
      "effusion",
      "palpation",
      "rom",
      "test-lachman",
      "test-valgus",
      "test-varus",
      "test-meniscal",
      "test-patella",
      "test-neurovascular",
      "tests-normal",
      "analysis",
      "plan-self-care",
      "plan-plan",
      "plan-analgesia",
      "plan-imaging",
      "plan-referral",
      "plan-follow-up",
      "plan-safety-net",
      "plan-information",
      "document-profile",
      "copy"
    ]);
  });

  it("omits removed Baggrund sport/family keyboard groups", () => {
    expect(C33_KEYBOARD_GROUP_ORDER).not.toContain("background-sport");
    expect(C33_KEYBOARD_GROUP_ORDER).not.toContain("background-family");
  });

  it("places Provokation immediately after trauma supplementary and before Funktion", () => {
    const traumaSupplementary = C33_KEYBOARD_GROUP_ORDER.indexOf("trauma-supplementary");
    const provocation = C33_KEYBOARD_GROUP_ORDER.indexOf("provocation");
    const funktion = C33_KEYBOARD_GROUP_ORDER.indexOf("function");
    expect(provocation).toBe(traumaSupplementary + 1);
    expect(funktion).toBe(provocation + 1);
  });

  it("places Gang before Inspektion before Effusion before Palpation", () => {
    const gait = C33_KEYBOARD_GROUP_ORDER.indexOf("gait");
    expect(C33_KEYBOARD_GROUP_ORDER.indexOf("inspection")).toBe(gait + 1);
    expect(C33_KEYBOARD_GROUP_ORDER.indexOf("effusion")).toBe(gait + 2);
    expect(C33_KEYBOARD_GROUP_ORDER.indexOf("palpation")).toBe(gait + 3);
  });

  it("keeps Plan groups in visual order before document profile and copy", () => {
    const planStart = C33_KEYBOARD_GROUP_ORDER.indexOf("plan-self-care");
    expect(C33_KEYBOARD_GROUP_ORDER.slice(planStart)).toEqual([
      "plan-self-care",
      "plan-plan",
      "plan-analgesia",
      "plan-imaging",
      "plan-referral",
      "plan-follow-up",
      "plan-safety-net",
      "plan-information",
      "document-profile",
      "copy"
    ]);
  });

  it("returns undefined without throwing when the focus trigger is null", () => {
    expect(focusAdjacentKeyboardGroup(null, 1)).toBeUndefined();
    expect(focusAdjacentKeyboardGroup(undefined, -1)).toBeUndefined();
  });
});
