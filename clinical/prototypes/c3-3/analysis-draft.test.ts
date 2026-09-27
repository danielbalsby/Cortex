import { describe, expect, it } from "vitest";

import {
  buildC33AnalysisDraft,
  isC33UnfinishedAnalysisDraft
} from "./analysis-draft";
import { createEmptyC33State } from "./model";
import { applyC33FactAction, configureC33Problem, setC33Side, setC33TraumaMechanismDetail } from "./state";

describe("C33 analysis draft", () => {
  it("builds a neutral unfinished draft only from explicit side and trauma mechanism", () => {
    let state = configureC33Problem(createEmptyC33State(), "knee-trauma");
    state = setC33Side(state, "right");
    state = applyC33FactAction(state, { type: "set-history", key: "trauma", value: "yes" });
    state = setC33TraumaMechanismDetail(state, "twisting");

    expect(buildC33AnalysisDraft(state)).toBe(
      "Vridtraume i højre knæ med kliniske fund forenelige med "
    );
    expect(isC33UnfinishedAnalysisDraft(buildC33AnalysisDraft(state)!)).toBe(true);
  });

  it("treats clinician-completed text as finished", () => {
    expect(isC33UnfinishedAnalysisDraft(
      "Vridtraume i højre knæ med kliniske fund forenelige med partial ACL-ruptur."
    )).toBe(false);
  });
});
