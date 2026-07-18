import type { ClinicalDocumentPrototypeState } from "./model";

export interface ClinicalOverviewItem {
  readonly id: "positive-findings" | "attention-points" | "diagnoses" | "plan-actions";
  readonly label: string;
  readonly value: string;
}

export function getClinicalOverview(
  _state: ClinicalDocumentPrototypeState
): readonly ClinicalOverviewItem[] {
  return [
    {
      id: "positive-findings",
      label: "Positive fund",
      value: "Ikke registreret"
    },
    {
      id: "attention-points",
      label: "Opmærksomhedspunkter",
      value: "Ikke vurderet"
    },
    {
      id: "diagnoses",
      label: "Arbejdshypoteser",
      value: "Ikke registreret"
    },
    {
      id: "plan-actions",
      label: "Planlagte handlinger",
      value: "Ikke registreret"
    }
  ];
}
