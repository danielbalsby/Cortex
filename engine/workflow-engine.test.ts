import { describe, expect, it } from "vitest";

import { kneePainPathway } from "@/clinical/pathways/knee-pain";
import { cortexOutputGeneratorRegistry } from "@/clinical/output-generator-registry";
import type { ConsultationAnswers } from "@/clinical/types";
import {
  createInitialAnswers,
  setConsultationAnswer
} from "@/engine/consultation-engine";
import {
  createEncounterFromValidatedAnswers,
  generateAllOutputsFromValidatedEncounter,
  generateEncounterOutputFromValidatedEncounter
} from "@/engine/encounter-engine";
import { generatePSOAP } from "@/engine/output-engine";
import { getActiveOutputs } from "@/engine/output-visibility-engine";
import { evaluateRules, matchesCondition } from "@/engine/rule-engine";
import { rankAssessmentSuggestions } from "@/engine/suggestion-engine";
import {
  getVisibleFields,
  getVisibleSections,
  isFieldVisibleInSection
} from "@/engine/visibility-engine";

function update(
  answers: ConsultationAnswers,
  fieldId: string,
  value: string | string[]
) {
  const result = setConsultationAnswer(answers, fieldId, value, kneePainPathway);
  if (!result.accepted) throw new Error(result.issue.message);
  return result.answers;
}

function encounterFor(answers: ConsultationAnswers) {
  return createEncounterFromValidatedAnswers(kneePainPathway, answers);
}

function activeOutputIds(answers: ConsultationAnswers) {
  return getActiveOutputs(kneePainPathway, answers).map((output) => output.id);
}

describe("initial consultation state", () => {
  it("contains no clinically meaningful facts", () => {
    const answers = createInitialAnswers(kneePainPathway);

    for (const section of kneePainPathway.sections) {
      for (const field of section.fields) {
        if (!isFieldVisibleInSection(section, field, answers)) {
          expect(answers).not.toHaveProperty(field.id);
        } else if (field.type === "multi-choice") {
          expect(answers[field.id]).toEqual([]);
        } else {
          expect(answers[field.id]).toBe("");
        }
      }
    }
  });

  it("produces no clinical output text from an empty consultation", () => {
    const answers = createInitialAnswers(kneePainPathway);

    expect(generatePSOAP(kneePainPathway, answers)).toBe("");
    expect(generateAllOutputsFromValidatedEncounter(encounterFor(answers), cortexOutputGeneratorRegistry)).toEqual([
      expect.objectContaining({ id: "journal", text: "" })
    ]);
  });
});

describe("consultation answer updates", () => {
  it("updates immutably and preserves unrelated answers", () => {
    const previous = update(createInitialAnswers(kneePainPathway), "side", "right");
    const next = update(previous, "onset", "acute");

    expect(next).not.toBe(previous);
    expect(previous.onset).toBe("");
    expect(previous.side).toBe("right");
    expect(next.onset).toBe("acute");
    expect(next.side).toBe("right");
  });
});

describe("conditional visibility", () => {
  const historySection = kneePainPathway.sections.find((section) => section.id === "history")!;

  it("shows the trauma mechanism only after explicit trauma = yes", () => {
    const empty = createInitialAnswers(kneePainPathway);
    const traumaYes = update(empty, "trauma", "yes");
    const traumaNo = update(traumaYes, "trauma", "no");

    expect(getVisibleFields(historySection, empty).map((field) => field.id)).not.toContain(
      "trauma-mechanism"
    );
    expect(getVisibleFields(historySection, traumaYes).map((field) => field.id)).toContain(
      "trauma-mechanism"
    );
    expect(getVisibleFields(historySection, traumaNo).map((field) => field.id)).not.toContain(
      "trauma-mechanism"
    );
  });

  it("shows the trauma section only after explicit trauma = yes", () => {
    const empty = createInitialAnswers(kneePainPathway);
    const traumaYes = update(empty, "trauma", "yes");

    expect(getVisibleSections(kneePainPathway, empty).map((section) => section.id)).not.toContain(
      "trauma-track"
    );
    expect(getVisibleSections(kneePainPathway, traumaYes).map((section) => section.id)).toContain(
      "trauma-track"
    );
  });
});

describe("hidden-answer pruning", () => {
  it("removes answers from a hidden field and section and excludes their output", () => {
    let answers = update(createInitialAnswers(kneePainPathway), "trauma", "yes");
    answers = update(answers, "trauma-mechanism", "twist");
    answers = update(answers, "trauma-immediate-swelling", "yes");

    expect(generatePSOAP(kneePainPathway, answers)).toContain("Traume ved vrid.");
    expect(generatePSOAP(kneePainPathway, answers)).toContain(
      "Hævelse opstod umiddelbart efter traumet."
    );

    const traumaNo = update(answers, "trauma", "no");
    const text = generatePSOAP(kneePainPathway, traumaNo);
    const journal = generateAllOutputsFromValidatedEncounter(
      encounterFor(traumaNo),
      cortexOutputGeneratorRegistry
    )[0];

    expect(traumaNo).not.toHaveProperty("trauma-mechanism");
    expect(traumaNo).not.toHaveProperty("trauma-immediate-swelling");
    expect(text).not.toContain("Traume ved vrid.");
    expect(text).not.toContain("Hævelse opstod umiddelbart efter traumet.");
    expect(journal.text).toBe(text);
  });
});

describe("clinical rules", () => {
  it("does not trigger rules from unanswered data", () => {
    expect(evaluateRules(kneePainPathway, createInitialAnswers(kneePainPathway))).toEqual([]);
  });

  it("triggers the Ottawa-related rule only while both explicit conditions are satisfied", () => {
    const empty = createInitialAnswers(kneePainPathway);
    const traumaOnly = update(empty, "trauma", "yes");
    const matched = update(traumaOnly, "weight-bearing", "none");
    const noLongerMatched = update(matched, "trauma", "no");

    expect(evaluateRules(kneePainPathway, traumaOnly)).toEqual([]);
    expect(evaluateRules(kneePainPathway, matched)).toContainEqual(
      expect.objectContaining({
        ruleId: "ottawa-knee",
        alert: expect.objectContaining({
          severity: "warning",
          title: "Billeddiagnostik"
        })
      })
    );
    expect(evaluateRules(kneePainPathway, noLongerMatched)).toEqual([]);
  });
});

describe("shared condition semantics", () => {
  const truthyCondition = { fieldId: "finding", operator: "truthy" as const };

  it("does not treat missing, empty text, or an empty multi-choice answer as truthy", () => {
    expect(matchesCondition(truthyCondition, {})).toBe(false);
    expect(matchesCondition(truthyCondition, { finding: "" })).toBe(false);
    expect(matchesCondition(truthyCondition, { finding: [] })).toBe(false);
  });

  it.each(["no", "normal", "none"])(
    "treats the explicit answer %s as technically truthy without interpreting positivity",
    (answer) => {
      expect(matchesCondition(truthyCondition, { finding: answer })).toBe(true);
    }
  );
});

describe("assessment suggestions", () => {
  it("does not create unsupported suggestions from unanswered or unrelated data", () => {
    const empty = createInitialAnswers(kneePainPathway);
    const unrelated = update(empty, "side", "right");

    expect(rankAssessmentSuggestions(kneePainPathway, empty)).toEqual([]);
    expect(rankAssessmentSuggestions(kneePainPathway, unrelated)).toEqual([]);
  });

  it("returns support-match information without modifying assessment", () => {
    let answers = update(createInitialAnswers(kneePainPathway), "trauma", "no");
    answers = update(answers, "onset", "gradual");
    answers = update(answers, "duration", "months");
    const suggestions = rankAssessmentSuggestions(kneePainPathway, answers);
    const osteoarthritis = suggestions.find((suggestion) => suggestion.value === "oa");

    expect(answers.assessment).toBe("");
    expect(osteoarthritis).toEqual(
      expect.objectContaining({
        supportCount: 3,
        totalSupportingConditions: 3,
        displayPolicyResult: expect.objectContaining({ displayed: true })
      })
    );
    expect(osteoarthritis).not.toHaveProperty("score");
    expect(osteoarthritis).not.toHaveProperty("probability");
  });
});

describe("dynamic outputs", () => {
  it("keeps only the journal active by default", () => {
    const answers = createInitialAnswers(kneePainPathway);

    expect(activeOutputIds(answers)).toEqual(["journal"]);
    expect(
      generateAllOutputsFromValidatedEncounter(encounterFor(answers), cortexOutputGeneratorRegistry).map(
        (output) => output.id
      )
    ).toEqual([
      "journal"
    ]);
  });

  it.each([
    ["physio", "physiotherapy-referral"],
    ["xray", "xray-referral"],
    ["referral", "orthopedic-referral"]
  ])("activates only the %s output when explicitly selected", (action, outputId) => {
    const selected = update(createInitialAnswers(kneePainPathway), "plan-actions", [action]);
    const removed = update(selected, "plan-actions", []);

    expect(activeOutputIds(selected)).toEqual(["journal", outputId]);
    expect(
      generateAllOutputsFromValidatedEncounter(encounterFor(selected), cortexOutputGeneratorRegistry).map(
        (output) => output.id
      )
    ).toEqual([
      "journal",
      outputId
    ]);
    expect(activeOutputIds(removed)).toEqual(["journal"]);
    expect(
      generateAllOutputsFromValidatedEncounter(encounterFor(removed), cortexOutputGeneratorRegistry).map(
        (output) => output.id
      )
    ).toEqual([
      "journal"
    ]);
  });
});

describe("PSOAP grouping", () => {
  it("combines history and trauma-track content into one subjective group", () => {
    let answers = update(createInitialAnswers(kneePainPathway), "trauma", "yes");
    answers = update(answers, "trauma-mechanism", "twist");
    answers = update(answers, "trauma-immediate-swelling", "yes");

    const subjectiveGroups = generatePSOAP(kneePainPathway, answers)
      .split("\n")
      .filter((line) => line.startsWith("S:"));

    expect(subjectiveGroups).toHaveLength(1);
    expect(subjectiveGroups[0]).toContain("Traume ved vrid.");
    expect(subjectiveGroups[0]).toContain("Hævelse opstod umiddelbart efter traumet.");
  });

  it("omits hidden trauma content after trauma changes to no", () => {
    let answers = update(createInitialAnswers(kneePainPathway), "trauma", "yes");
    answers = update(answers, "trauma-mechanism", "fall");
    answers = update(answers, "trauma-heard-pop", "yes");
    answers = update(answers, "trauma", "no");

    const text = generatePSOAP(kneePainPathway, answers);

    expect(text).toContain("Intet traume.");
    expect(text).not.toContain("Traume ved fald.");
    expect(text).not.toContain("Hørt eller følt et knæk");
  });

  it("omits empty PSOAP groups", () => {
    const empty = createInitialAnswers(kneePainPathway);
    const sideOnly = update(empty, "side", "right");

    expect(generatePSOAP(kneePainPathway, empty)).toBe("");
    expect(generatePSOAP(kneePainPathway, sideOnly)).toBe("P: Højresidige knæsmerter.");
  });
});

describe("output readiness", () => {
  const journalDefinition = kneePainPathway.outputs.find((output) => output.id === "journal")!;

  it("marks an empty journal as missing data with deterministic messages", () => {
    const answers = createInitialAnswers(kneePainPathway);
    const first = generateEncounterOutputFromValidatedEncounter(
      encounterFor(answers),
      journalDefinition,
      cortexOutputGeneratorRegistry
    );
    const second = generateEncounterOutputFromValidatedEncounter(
      encounterFor(answers),
      journalDefinition,
      cortexOutputGeneratorRegistry
    );

    expect(first.status).toBe("missing-data");
    expect(first.text).toBe("");
    expect(first.missing).toEqual([
      "klinisk problem, side og forløb",
      "arbejdsdiagnose eller klinisk vurdering",
      "tilstrækkeligt klinisk indhold"
    ]);
    expect(second.missing).toEqual(first.missing);
  });

  it("marks a substantively incomplete journal as missing data", () => {
    const sideOnly = update(createInitialAnswers(kneePainPathway), "side", "right");
    const journal = generateEncounterOutputFromValidatedEncounter(
      encounterFor(sideOnly),
      journalDefinition,
      cortexOutputGeneratorRegistry
    );

    expect(journal.status).toBe("missing-data");
    expect(journal.missing).toContain("klinisk problem, side og forløb");
    expect(journal.missing).toContain("arbejdsdiagnose eller klinisk vurdering");
    expect(journal.missing).toContain("tilstrækkeligt klinisk indhold");
  });

  it("uses ready as technical completeness rather than clinical validation", () => {
    let answers = update(createInitialAnswers(kneePainPathway), "side", "right");
    answers = update(answers, "onset", "acute");
    answers = update(answers, "assessment", "uncertain");

    const journal = generateEncounterOutputFromValidatedEncounter(
      encounterFor(answers),
      journalDefinition,
      cortexOutputGeneratorRegistry
    );

    expect(journal.status).toBe("ready");
    expect(journal.missing).toEqual([]);
    expect(journal).not.toHaveProperty("clinicallyValidated");
  });
});

describe("determinism of pure derived services", () => {
  it("returns deeply equal derived behavior for identical pathway and answers", () => {
    let answers = update(createInitialAnswers(kneePainPathway), "side", "right");
    answers = update(answers, "trauma", "yes");
    answers = update(answers, "trauma-mechanism", "twist");
    answers = update(answers, "weight-bearing", "none");
    answers = update(answers, "assessment", "fracture");
    answers = update(answers, "plan-actions", ["xray"]);

    function derive() {
      return {
        visibleSections: getVisibleSections(kneePainPathway, answers),
        visibleFields: getVisibleSections(kneePainPathway, answers).map((section) =>
          getVisibleFields(section, answers)
        ),
        alerts: evaluateRules(kneePainPathway, answers),
        suggestions: rankAssessmentSuggestions(kneePainPathway, answers),
        activeOutputs: getActiveOutputs(kneePainPathway, answers),
        clinicalText: generatePSOAP(kneePainPathway, answers),
        generatedOutputs: generateAllOutputsFromValidatedEncounter(encounterFor(answers), cortexOutputGeneratorRegistry)
      };
    }

    expect(derive()).toEqual(derive());
  });

  it("keeps transient encounter derivation stable for identical inputs", () => {
    const answers = createInitialAnswers(kneePainPathway);
    const first = createEncounterFromValidatedAnswers(kneePainPathway, answers);
    const second = createEncounterFromValidatedAnswers(kneePainPathway, answers);

    expect(first).toEqual(second);
    expect(first).toEqual({ pathway: kneePainPathway, answers });
    expect(first).not.toHaveProperty("id");
    expect(first).not.toHaveProperty("startedAt");
    expect(first).not.toHaveProperty("updatedAt");
  });
});
