import { deriveConsultationCompleteness } from "./completeness";
import type { SprintOneState } from "./model";

export interface ClinicalAttentionItem {
  readonly id: string;
  readonly title: string;
  readonly reason: string;
  readonly source: "missing-information" | "recorded-finding";
}

export function deriveClinicalAttention(
  state: SprintOneState
): readonly ClinicalAttentionItem[] {
  const items: ClinicalAttentionItem[] = [];
  const completeness = deriveConsultationCompleteness(state);
  const safety = completeness.domains.find((item) => item.id === "safety");

  if (safety && safety.status !== "recorded") {
    items.push({
      id: "safety-unresolved",
      title: "Safety-vurdering er ikke afsluttet",
      reason: `Mangler stillingtagen til: ${safety.missing.join(", ")}.`,
      source: "missing-information"
    });
  }
  if (state.history.locking === "yes") {
    items.push({
      id: "locking-recorded",
      title: "Aflåsning er registreret",
      reason: "Fundet er registreret af klinikeren og kræver klinikerens egen vurdering.",
      source: "recorded-finding"
    });
  }
  if (state.history.instability === "yes") {
    items.push({
      id: "instability-recorded",
      title: "Instabilitet er registreret",
      reason: "Fundet er registreret af klinikeren og er ikke en systemdiagnose.",
      source: "recorded-finding"
    });
  }
  if (state.history.trauma === "yes" && state.history.weightBearing === "cannot-four-steps") {
    items.push({
      id: "weight-bearing-after-trauma",
      title: "Belastningsevne efter traume kræver stillingtagen",
      reason: "Traume og manglende evne til fire vægtbærende skridt er registreret.",
      source: "recorded-finding"
    });
  }
  if (
    state.history.fever === "yes" ||
    state.history.systemicIllness === "yes" ||
    state.history.redHotSwollenJoint === "yes"
  ) {
    items.push({
      id: "systemic-or-inflammatory-finding",
      title: "Et safety-relevant fund er registreret",
      reason: "Cortex viser fundet som opmærksomhedsstøtte og træffer ingen beslutning.",
      source: "recorded-finding"
    });
  }
  if (state.objective.neurovascular === "abnormal") {
    items.push({
      id: "neurovascular-abnormal",
      title: "Afvigende distal neurovaskulær vurdering er registreret",
      reason: "Fundet kræver klinikerens egen vurdering og plan.",
      source: "recorded-finding"
    });
  }
  return items;
}

