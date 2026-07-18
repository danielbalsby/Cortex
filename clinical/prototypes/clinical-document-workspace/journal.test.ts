import { describe, expect, it } from "vitest";

import {
  buildJournalSections,
  createJournalDraftOverride,
  generatePrototypeJournal,
  hasJournalClinicalContent,
  resolveJournalDraft
} from "./journal";
import { createEmptyClinicalDocumentState, setPrototypeMode } from "./model";
import { workspaceReducer, type WorkspaceAction } from "./reducer";

function reduce(actions: readonly WorkspaceAction[]) {
  return actions.reduce(workspaceReducer, createEmptyClinicalDocumentState());
}

const SCENARIO_A_ACTIONS: readonly WorkspaceAction[] = [
  { type: "set-mode", mode: "standard" },
  { type: "set-fact", key: "side", value: "right" },
  { type: "set-fact", key: "onset", value: "acute" },
  { type: "set-fact", key: "duration", value: "siden i går" },
  { type: "set-fact", key: "precipitatingFactor", value: "trauma" },
  { type: "toggle-list-fact", key: "traumaMechanisms", value: "twisting-planted-foot" },
  { type: "toggle-list-fact", key: "traumaMechanisms", value: "sport-contact" },
  {
    type: "set-fact",
    key: "traumaMechanismNote",
    value: "Vrid under fodbold med foden fikseret i græsset"
  },
  { type: "toggle-list-fact", key: "painLocations", value: "medial" },
  { type: "toggle-list-fact", key: "painPatterns", value: "constant" },
  { type: "set-fact", key: "function", value: "cannot-four-steps" },
  { type: "set-fact", key: "swelling", value: "delayed-mild" },
  { type: "set-fact", key: "fever", value: "no" },
  { type: "set-fact", key: "locking", value: "no" },
  { type: "set-fact", key: "gait", value: "limp" },
  { type: "set-fact", key: "effusion", value: "mild" },
  { type: "set-fact", key: "extension", value: "reduced" },
  { type: "set-fact", key: "straightLegRaise", value: "intact" },
  { type: "set-fact", key: "tenderness", value: "medial-joint-line" },
  {
    type: "add-diagnosis",
    diagnosis: { id: "meniscus", label: "Meniskrelaterede gener", source: "suggestion" }
  },
  {
    type: "add-diagnosis",
    diagnosis: { id: "sprain", label: "Knæforstuvning", source: "suggestion" }
  },
  {
    type: "add-diagnosis",
    diagnosis: { id: "ligament", label: "Ligamentskade", source: "suggestion" }
  },
  { type: "toggle-plan-action", action: "imaging" },
  { type: "set-imaging-field", key: "status", value: "planned" },
  { type: "set-imaging-field", key: "modality", value: "acute-x-ray" },
  { type: "set-imaging-field", key: "side", value: "right" },
  {
    type: "set-imaging-field",
    key: "indication",
    value: "Traume og manglende evne til fire vægtbærende skridt"
  },
  { type: "set-imaging-field", key: "clinicalQuestion", value: "Fraktur?" },
  { type: "set-imaging-field", key: "plannedAction", value: "prepare-referral" },
  { type: "toggle-plan-action", action: "follow-up" },
  { type: "set-fact", key: "followUp", value: "efter billeddiagnostik" }
];

const SCENARIO_B_ACTIONS: readonly WorkspaceAction[] = [
  { type: "set-fact", key: "side", value: "left" },
  { type: "set-fact", key: "onset", value: "gradual" },
  { type: "set-fact", key: "duration", value: "seks måneder" },
  { type: "set-fact", key: "precipitatingFactor", value: "none" },
  { type: "toggle-list-fact", key: "painLocations", value: "medial" },
  { type: "toggle-list-fact", key: "painLocations", value: "diffuse" },
  { type: "toggle-list-fact", key: "painPatterns", value: "load-related" },
  { type: "toggle-list-fact", key: "painPatterns", value: "start-up" },
  { type: "toggle-list-fact", key: "painPatterns", value: "stairs" },
  { type: "toggle-list-fact", key: "painPatterns", value: "intermittent" },
  { type: "set-fact", key: "function", value: "normal" },
  { type: "set-fact", key: "swelling", value: "none" },
  { type: "set-fact", key: "locking", value: "no" },
  { type: "set-fact", key: "fever", value: "no" },
  { type: "confirm-normal-group" },
  { type: "set-fact", key: "effusion", value: "mild" },
  {
    type: "add-diagnosis",
    diagnosis: { id: "oa", label: "Knæartrose", source: "suggestion" }
  },
  {
    type: "add-diagnosis",
    diagnosis: { id: "meniscus", label: "Meniskrelaterede gener", source: "suggestion" }
  },
  { type: "toggle-plan-action", action: "information" },
  { type: "toggle-plan-action", action: "exercise" },
  { type: "toggle-plan-action", action: "imaging" },
  { type: "set-imaging-field", key: "status", value: "not-indicated-now" },
  { type: "set-imaging-field", key: "plannedAction", value: "no-imaging-now" },
  { type: "toggle-plan-action", action: "follow-up" },
  { type: "set-fact", key: "followUp", value: "om 4–6 uger" }
];

describe("Clinical Document Workspace v2 Phase 3 journal", () => {
  it("always documents fixed problem context and omits untouched sections", () => {
    const state = createEmptyClinicalDocumentState();
    const sections = buildJournalSections(state);

    expect(sections).toEqual([{ id: "problem", text: "Problem: Knæsmerte" }]);
    expect(hasJournalClinicalContent(sections)).toBe(false);
    expect(generatePrototypeJournal(state)).toBe("Problem: Knæsmerte");
    expect(generatePrototypeJournal(state)).not.toMatch(
      /Anamnese|Objektivt|Vurdering|Plan|knæskade/i
    );
  });

  it("is deterministic and presentation-mode independent", () => {
    const quick = reduce(SCENARIO_B_ACTIONS);
    const standard = setPrototypeMode(quick, "standard");
    const first = generatePrototypeJournal(quick);

    expect(generatePrototypeJournal(quick)).toBe(first);
    expect(generatePrototypeJournal(standard)).toBe(first);
    expect(buildJournalSections(quick)).toEqual(buildJournalSections(quick));
  });

  it("changes generated output when an explicit clinical fact changes", () => {
    const right = reduce([{ type: "set-fact", key: "side", value: "right" }]);
    const left = reduce([{ type: "set-fact", key: "side", value: "left" }]);

    expect(generatePrototypeJournal(right)).toContain("Højresidige knæsmerter");
    expect(generatePrototypeJournal(left)).toContain("Venstresidige knæsmerter");
    expect(generatePrototypeJournal(right)).not.toBe(generatePrototypeJournal(left));
  });

  it("synthesises the acute trauma scenario without external-action claims", () => {
    const journal = generatePrototypeJournal(reduce(SCENARIO_A_ACTIONS));

    expect(journal).toBe(
      "Problem: Knæsmerte\n\n" +
        "Anamnese\n" +
        "Højresidige knæsmerter med akut debut siden i går. Traume registreret med vrid på fikseret fod og sport/kontakthændelse. Supplerende traumebeskrivelse: Vrid under fodbold med foden fikseret i græsset. Smerterne er lokaliseret medialt. Smertemønstret er konstant. Patienten kan ikke tage fire vægtbærende skridt. Let hævelse opstod forsinket. Registrerede relevante negative fund: ingen reel aflåsning og ingen feber.\n\n" +
        "Objektivt\n" +
        "Haltende gang, let effusion, reduceret ekstension, intakt straight-leg raise og medial ledlinjeømhed.\n\n" +
        "Vurdering\n" +
        "Primær arbejdshypotese: Meniskrelaterede gener. Samtidige arbejdshypoteser: Knæforstuvning og Ligamentskade.\n\n" +
        "Plan\n" +
        "Akut røntgen af højre knæ planlægges på grund af Traume og manglende evne til fire vægtbærende skridt med spørgsmål om Fraktur. Henvisning forberedes. Opfølgning efter billeddiagnostik."
    );
    expect(journal).not.toMatch(/henvisning (er )?sendt|resultat|knæskade/i);
  });

  it("synthesises the gradual scenario and lets the positive exception replace normal output", () => {
    const journal = generatePrototypeJournal(reduce(SCENARIO_B_ACTIONS));

    expect(journal).toContain(
      "Venstresidige knæsmerter med gradvis debut gennem seks måneder. Intet identificeret traume."
    );
    expect(journal).toContain(
      "Smertemønstret er belastningsrelateret, ved igangsætning, ved trapper og intermitterende."
    );
    expect(journal).toContain(
      "Upåvirket almentilstand, normal gang, ingen deformitet, ingen rødme, ingen varmeøgning, let effusion, fuld ekstension og intakt straight-leg raise."
    );
    expect(journal).toContain(
      "Primær arbejdshypotese: Knæartrose. Samtidige arbejdshypoteser: Meniskrelaterede gener."
    );
    expect(journal).toContain(
      "Information indgår i planen. Gradueret træning indgår i planen. Billeddiagnostik er ikke planlagt aktuelt. Opfølgning om 4–6 uger."
    );
    expect(journal).not.toMatch(/ingen betydende effusion|tredje diagnose|medicin|henvisning/i);
  });

  it("omits incomplete imaging rather than inventing a plan", () => {
    const incomplete = reduce([
      { type: "toggle-plan-action", action: "imaging" },
      { type: "set-imaging-field", key: "status", value: "planned" },
      { type: "set-imaging-field", key: "plannedAction", value: "prepare-referral" }
    ]);

    expect(generatePrototypeJournal(incomplete)).toBe("Problem: Knæsmerte");
    expect(generatePrototypeJournal(incomplete)).not.toMatch(/planlægges|henvisning/i);
  });

  it("keeps generic plan selections neutral about completion and referral intent", () => {
    const state = reduce([
      { type: "toggle-plan-action", action: "information" },
      { type: "toggle-plan-action", action: "activity" },
      { type: "toggle-plan-action", action: "exercise" },
      { type: "toggle-plan-action", action: "physiotherapy" }
    ]);
    const journal = generatePrototypeJournal(state);

    expect(journal).toContain(
      "Information indgår i planen. Aktivitetstilpasning indgår i planen. Gradueret træning indgår i planen. Fysioterapi indgår i planen."
    );
    expect(journal).not.toMatch(/er givet|er aftalt|fysioterapihenvisning|henvisning til fysioterapi/i);
  });

  it("preserves explicit diagnostic uncertainty and order", () => {
    const state = reduce([
      {
        type: "add-diagnosis",
        diagnosis: {
          id: "qualified",
          label: "Meniskrelaterede gener",
          qualifier: "foreløbig vurdering",
          source: "free-text"
        }
      },
      {
        type: "add-diagnosis",
        diagnosis: { id: "other", label: "Anden mulig årsag", source: "free-text" }
      }
    ]);

    expect(generatePrototypeJournal(state)).toContain(
      "Primær arbejdshypotese: Meniskrelaterede gener (foreløbig vurdering). Samtidige arbejdshypoteser: Anden mulig årsag."
    );
  });

  it("keeps suggestions and attention points out of journal output", () => {
    const state = reduce([
      { type: "set-fact", key: "precipitatingFactor", value: "trauma" },
      { type: "set-fact", key: "onset", value: "acute" },
      { type: "set-fact", key: "function", value: "cannot-four-steps" }
    ]);
    const journal = generatePrototypeJournal(state);

    expect(journal).not.toMatch(/Knæforstuvning|Afklar frakturscreening|forslag/i);
    expect(state.workingDiagnoses).toEqual([]);
  });

  it("represents manual editing as a separate stale-aware draft override", () => {
    const generated = generatePrototypeJournal(reduce(SCENARIO_B_ACTIONS));
    const override = createJournalDraftOverride(generated, "Manuelt redigeret udkast");

    expect(resolveJournalDraft(generated, override)).toEqual({
      text: "Manuelt redigeret udkast",
      isOverridden: true,
      isStale: false
    });
    expect(resolveJournalDraft(`${generated}\nNy registrering`, override)).toEqual({
      text: "Manuelt redigeret udkast",
      isOverridden: true,
      isStale: true
    });
    expect(resolveJournalDraft(generated, undefined)).toEqual({
      text: generated,
      isOverridden: false,
      isStale: false
    });
  });
});
