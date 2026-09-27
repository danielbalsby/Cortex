import type { SyntheticPatientFixture } from "./fixtures";

export type MockAiOutcome =
  | {
      readonly ok: true;
      readonly provider: "deterministic-mock";
      readonly version: "sprint-0.mock-summary.v1";
      readonly text: string;
      readonly limitations: readonly string[];
    }
  | {
      readonly ok: false;
      readonly provider: "deterministic-mock";
      readonly version: "sprint-0.mock-summary.v1";
      readonly error: "mock-service-unavailable";
      readonly message: string;
    };

export function generateMockAiSummary(
  patient: SyntheticPatientFixture,
  behavior: "success" | "failure" = "success"
): MockAiOutcome {
  if (behavior === "failure") {
    return {
      ok: false,
      provider: "deterministic-mock",
      version: "sprint-0.mock-summary.v1",
      error: "mock-service-unavailable",
      message: "Mock-resuméet kunne ikke genereres. Fortsæt manuelt med kildeoplysningerne."
    };
  }

  return {
    ok: true,
    provider: "deterministic-mock",
    version: "sprint-0.mock-summary.v1",
    text: [
      `${patient.demographics}.`,
      patient.currentContact.join(" "),
      patient.relevantNegatives.join(" "),
      "Tidligere knæoplysninger, instabilitet, belastningsevne og objektive fund kræver fortsat afklaring."
    ].join(" "),
    limitations: [
      "Resuméet er deterministisk mock-output baseret på de viste syntetiske oplysninger.",
      "Det er ikke verificeret evidens, en klinisk vurdering eller en beslutning."
    ]
  };
}
