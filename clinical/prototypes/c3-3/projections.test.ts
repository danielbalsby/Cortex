import { describe, expect, it } from "vitest";

import { getActivePhrases } from "@/clinical/prototypes/c3/model";
import {
  createC3Assessment,
  selectC3PhraseDefinition
} from "@/clinical/prototypes/c3/state";

import {
  C33_PHRASES,
  C33_RED_FLAGS_NORMAL_TEXT,
  resolveC33PhraseText
} from "./fixtures";
import { createEmptyC33State } from "./model";
import { projectC33PsoapDocument } from "./projections";
import {
  applyC33FactAction,
  configureC33Problem,
  setC33RedFlagGroup,
  toggleC33RedFlagsNormal
} from "./state";

function baseState() {
  let state = configureC33Problem(createEmptyC33State(), "knee-trauma");
  state = applyC33FactAction(state, { type: "set-history", key: "side", value: "right" });
  return state;
}

describe("C3.3 PSOAP projection", () => {
  it("capitalizes the first word after every P/S/O/A/P marker", () => {
    let state = baseState();
    state = applyC33FactAction(state, {
      type: "set-objective",
      key: "gait",
      value: "limp"
    });

    const output = projectC33PsoapDocument(state, "standard");
    const objectiveLine = output.split("\n").find((line) => line.startsWith("O: "));

    expect(objectiveLine).toBeDefined();
    expect(objectiveLine).toMatch(/^O: [A-ZÆØÅ]/u);
    expect(objectiveLine).not.toMatch(/^O: [a-zæøå]/u);
  });

  it("writes a specific sentence for each positive red flag group, in both Quick and Standard", () => {
    let state = baseState();
    state = setC33RedFlagGroup(state, "malignancy", "yes");

    const quick = projectC33PsoapDocument(state, "quick");
    const standard = projectC33PsoapDocument(state, "standard");

    expect(quick).toContain(
      "Nattesmerte, uforklaret vægttab eller tidligere cancer (malignitetsmistanke)."
    );
    expect(standard).toContain(
      "Nattesmerte, uforklaret vægttab eller tidligere cancer (malignitetsmistanke)."
    );
  });

  it("only adds the aggregate negative red flag sentence to Standard, never to Quick", () => {
    let state = baseState();
    state = toggleC33RedFlagsNormal(state).state;

    const quick = projectC33PsoapDocument(state, "quick");
    const standard = projectC33PsoapDocument(state, "standard");

    expect(standard).toContain(C33_RED_FLAGS_NORMAL_TEXT);
    expect(quick).not.toContain(C33_RED_FLAGS_NORMAL_TEXT);
  });

  it("never lets 'Ingen red flags' add a sentence for a positive group", () => {
    let state = baseState();
    state = setC33RedFlagGroup(state, "infection", "yes");
    const transition = toggleC33RedFlagsNormal(state);
    state = transition.state;

    const standard = projectC33PsoapDocument(state, "standard");

    expect(transition.outcome).toBe("blocked");
    expect(standard).toContain(
      "Infektionsrisiko (feber, nylig ledinjektion/operation eller immunsuppression)."
    );
    expect(standard).not.toContain(C33_RED_FLAGS_NORMAL_TEXT);
  });

  it("keeps duration and trauma context (decisive facts, not Baggrund) in both Quick and Standard", () => {
    let state = baseState();
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "duration",
      value: "siden i går"
    });
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "trauma",
      value: "yes"
    });
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "traumaMechanism",
      value: "twisting"
    });
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "traumaContext",
      value: "under fodbold"
    });

    const quick = projectC33PsoapDocument(state, "quick");
    const standard = projectC33PsoapDocument(state, "standard");

    expect(standard).toContain("efter vridtraume under fodbold siden i går.");
    expect(quick).toContain("efter vridtraume under fodbold siden i går.");
  });

  it("keeps the new Baggrund fields (comorbidity/medication/etc.) out of Quick but includes them in Standard", () => {
    let state = baseState();
    state = { ...state, background: { ...state.background, priorKneeIssue: true, comorbidityChips: ["diabetes"], medicationChips: [] } };

    const quick = projectC33PsoapDocument(state, "quick");
    const standard = projectC33PsoapDocument(state, "standard");

    expect(standard).toContain("Baggrund:");
    expect(standard).toContain("Diabetes");
    expect(quick).not.toContain("Baggrund:");
  });

  it("strips Opfølgning/Safety-net phrases from Quick but keeps them in Standard", () => {
    let state = baseState();
    let c3 = selectC3PhraseDefinition(state.c32.c3, {
      id: "C33-FU-002",
      category: "follow-up",
      text: "Kontrol om 1–2 uger.",
      fixtureId: "C33-PHRASE-PACK-KNEE-001",
      fixtureVersion: "1.0",
      phraseVersion: "1.0"
    }).state;
    c3 = selectC3PhraseDefinition(c3, {
      id: "C33-SN-002",
      category: "safety-net",
      text: "Søg akut lægelig vurdering ved feber eller et tiltagende rødt, varmt og hævet knæ.",
      fixtureId: "C33-PHRASE-PACK-KNEE-001",
      fixtureVersion: "1.0",
      phraseVersion: "1.0"
    }).state;
    state = { ...state, c32: { ...state.c32, c3 } };

    const quick = projectC33PsoapDocument(state, "quick");
    const standard = projectC33PsoapDocument(state, "standard");

    expect(standard).toContain("Opfølgning:");
    expect(standard).toContain("Safety-net:");
    expect(quick).not.toContain("Opfølgning:");
    expect(quick).not.toContain("Safety-net:");
  });

  it("never lets stripRestNightPain remove the positive malignancy red-flag sentence, in either Quick or Standard", () => {
    let state = baseState();
    state = setC33RedFlagGroup(state, "malignancy", "yes");
    state = {
      ...state,
      c32: {
        ...state.c32,
        c3: {
          ...state.c32.c3,
          factRoot: {
            ...state.c32.c3.factRoot,
            history: {
              ...state.c32.c3.factRoot.history,
              restPain: "no",
              nightPain: "no"
            }
          }
        }
      }
    };

    for (const profile of ["quick", "standard"] as const) {
      const output = projectC33PsoapDocument(state, profile);
      expect(output).toContain(
        "Nattesmerte, uforklaret vægttab eller tidligere cancer (malignitetsmistanke)."
      );
      expect(output.toLocaleLowerCase("da-DK")).not.toContain("ingen hvilesmerter");
      expect(output.toLocaleLowerCase("da-DK")).not.toContain("ingen nattesmerter");
    }
  });

  it("never surfaces restPain/nightPain wording in the note, even for a stale factRoot set outside the C3.3 dispatcher", () => {
    let state = baseState();
    state = applyC33FactAction(state, { type: "set-history", key: "locking", value: "no" });
    state = applyC33FactAction(state, { type: "set-history", key: "instability", value: "no" });
    state = {
      ...state,
      c32: {
        ...state.c32,
        c3: {
          ...state.c32.c3,
          factRoot: {
            ...state.c32.c3.factRoot,
            history: {
              ...state.c32.c3.factRoot.history,
              restPain: "no",
              nightPain: "yes"
            }
          }
        }
      }
    };

    for (const profile of ["quick", "standard"] as const) {
      const output = projectC33PsoapDocument(state, profile).toLocaleLowerCase("da-DK");
      expect(output).not.toContain("hvilesmerter");
      expect(output).not.toContain("nattesmerter");
    }
    expect(projectC33PsoapDocument(state, "standard")).toContain(
      "Ingen ægte aflåsning eller instabilitetsfornemmelse."
    );
    expect(projectC33PsoapDocument(state, "quick")).not.toContain(
      "Ingen ægte aflåsning eller instabilitetsfornemmelse."
    );
  });

  it("keeps Quick shorter than Standard and free of Standard-only noise for the same state", () => {
    let state = baseState();
    state = applyC33FactAction(state, { type: "set-history", key: "swelling", value: "mild" });
    state = applyC33FactAction(state, {
      type: "set-history",
      key: "swellingTiming",
      value: "opstået straks"
    });
    state = toggleC33RedFlagsNormal(state).state;
    state = {
      ...state,
      background: {
        ...state.background,
        priorKneeIssue: true,
        comorbidityChips: ["diabetes"],
        sportOrWork: "fodbold",
        familyDisposition: "mor med artrose"
      }
    };
    let c3 = selectC3PhraseDefinition(state.c32.c3, {
      id: "C33-FU-002",
      category: "follow-up",
      text: "Kontrol om 1–2 uger.",
      fixtureId: "C33-PHRASE-PACK-KNEE-001",
      fixtureVersion: "1.0",
      phraseVersion: "1.0"
    }).state;
    c3 = selectC3PhraseDefinition(c3, {
      id: "C33-PLAN-001",
      category: "plan",
      text: "Fortsat observation af forløbet.",
      fixtureId: "C33-PHRASE-PACK-KNEE-001",
      fixtureVersion: "1.0",
      phraseVersion: "1.0"
    }).state;
    state = { ...state, c32: { ...state.c32, c3 } };

    const quick = projectC33PsoapDocument(state, "quick");
    const standard = projectC33PsoapDocument(state, "standard");

    expect(quick.length).toBeLessThan(standard.length);
    expect(quick).not.toContain("Baggrund:");
    expect(quick).not.toContain(C33_RED_FLAGS_NORMAL_TEXT);
    expect(quick).not.toContain("Hævelsen opstod");
    expect(quick).not.toContain("Opfølgning:");
    expect(quick).not.toContain("sport/arbejde");
    expect(quick).not.toContain("familiær disposition");
    expect(standard).toContain("Baggrund:");
    expect(standard).toContain(C33_RED_FLAGS_NORMAL_TEXT);
    expect(standard).toContain("Hævelsen opstod straks.");
    expect(standard).toContain("Opfølgning:");
    expect(standard).not.toContain("sport/arbejde");
    expect(standard).not.toContain("familiær disposition");
  });

  it("keeps unfinished analysis drafts out of A:", () => {
    let state = baseState();
    const unfinished = "Vridtraume i højre knæ med kliniske fund forenelige med ";
    const created = createC3Assessment(state.c32.c3, "primary", unfinished);
    state = {
      ...state,
      c32: { ...state.c32, c3: created.state }
    };

    const output = projectC33PsoapDocument(state, "standard");
    expect(output.split("\n")[3]).toBe("A:");
    expect(output).not.toContain("forenelige med");
  });

  it("writes exactly 'ROM normal.' for the normal-ROM values, never the raw degrees", () => {
    let state = baseState();
    state = applyC33FactAction(state, { type: "set-objective", key: "extensionDegrees", value: 0 });
    state = applyC33FactAction(state, { type: "set-objective", key: "flexionDegrees", value: 140 });

    const output = projectC33PsoapDocument(state, "standard");

    expect(output).toContain("ROM normal.");
    expect(output).not.toContain("ekstension 0°");
  });

  it("appends a distinct Aktiv ROM sentence alongside the passive/abnormal degrees", () => {
    let state = baseState();
    state = applyC33FactAction(state, { type: "set-objective", key: "extensionDegrees", value: 5 });
    state = applyC33FactAction(state, { type: "set-objective", key: "flexionDegrees", value: 110 });
    state = { ...state, workflow: { ...state.workflow, activeExtensionDegrees: 10, activeFlexionDegrees: 100 } };

    const output = projectC33PsoapDocument(state, "standard");

    expect(output).toContain("ekstension 5°, fleksion 110°");
    expect(output).toContain("Aktiv ROM: ekstension 10°, fleksion 100°.");
  });

  it("writes a standalone mechanical-block sentence without touching history.locking", () => {
    let state = baseState();
    state = { ...state, workflow: { ...state.workflow, movementFindings: ["mechanical-block"] } };

    const output = projectC33PsoapDocument(state, "standard");

    expect(output).toContain("Mekanisk blokering/strækkedeficit ved bevægelse.");
    expect(state.c32.c3.factRoot.history.locking).toBeUndefined();
  });

  it("writes the Bilaterale knæsmerter opening line when Bilateral is chosen, instead of Højre/Venstre", () => {
    let state = configureC33Problem(createEmptyC33State(), "knee-trauma");
    state = { ...state, workflow: { ...state.workflow, bilateralPain: true } };

    const output = projectC33PsoapDocument(state, "standard");

    expect(output.split("\n")[0]).toBe("P: Bilaterale knæsmerter");
  });

  it("resolves a side-dependent Plan phrase to the clinician's chosen side and never duplicates it", () => {
    let state = baseState();
    const xray = C33_PHRASES.find((entry) => entry.id === "C33-IMG-001")!;
    const resolvedText = resolveC33PhraseText(xray, state.c32.c3.factRoot.history.side);
    const resolvedPhrase = { ...xray, text: resolvedText };

    expect(resolvedText).toBe("Rp. røntgen af højre knæ.");

    let c3 = selectC3PhraseDefinition(state.c32.c3, resolvedPhrase).state;
    c3 = selectC3PhraseDefinition(c3, resolvedPhrase).state;
    state = { ...state, c32: { ...state.c32, c3 } };

    const output = projectC33PsoapDocument(state, "standard");
    const occurrences = output.split("Rp. røntgen af højre knæ.").length - 1;

    expect(occurrences).toBe(1);
    expect(getActivePhrases(state.c32.c3)).toHaveLength(1);
  });
});
