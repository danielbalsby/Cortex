import type { Kilde } from "./typer";

// Kilder, der bruges i flere regioner. Ret dem her, så gælder rettelsen alle
// steder. Kilder, der kun bruges i én region, står i regionens egen fil.

export const RH_MONOARTRIT: Kilde = {
  id: "rh-monoartrit",
  udgiver: "Region Hovedstaden",
  dansk: true,
  titel: "Forløbsbeskrivelse: Akut monoartritis",
  aar: 2025,
  url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/akut-monoartritis/",
  sidstTjekket: "2026-11-14"
};

export const RH_VISITATION_REUMATOLOGI: Kilde = {
  id: "rh-visitation-reumatologi",
  udgiver: "Region Hovedstaden",
  dansk: true,
  titel: "Visitationsmeddelelse: Reumatologi (hotlines og henvisning efter 1.1.2025)",
  aar: 2025,
  url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/visitation-hovedside/visitationsmeddelelser-ny/reumatologi/",
  sidstTjekket: "2026-11-15"
};
