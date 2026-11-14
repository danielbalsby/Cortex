import type { Region } from "./typer";

// EKSEMPEL – IKKE KLINISK INDHOLD.
// Viser, hvordan beslutningsstøtten ser ud med kilder, status, manglende kilde
// og konflikt. Åbnes med tasten 0 på startskærmen. Kilderne her er opdigtede
// eksempler og må aldrig kopieres til en rigtig region.

export const eksempel: Region = {
  id: "eksempel",
  navn: "Eksempel (ikke klinisk indhold)",

  grupper: [
    {
      id: "anamnese",
      titel: "Eksempelfelter",
      felter: [
        {
          id: "eksempelfelt",
          label: "Udløs flag",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Eksempel: nej." },
            { id: "ja", label: "Ja", notat: "Eksempel: ja." }
          ]
        }
      ]
    }
  ],
  notat: [{ overskrift: "S", felter: ["eksempelfelt"] }],

  kilder: [
    {
      id: "eks-dansk",
      udgiver: "Eksempelkilde",
      dansk: true,
      titel: "Opdigtet dansk kilde til visning",
      aar: 2026,
      url: "https://example.com/dansk",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "eks-udenlandsk",
      udgiver: "Example Guideline",
      dansk: false,
      titel: "Opdigtet udenlandsk kilde til visning",
      aar: 2024,
      url: "https://example.com/udenlandsk",
      sidstTjekket: "2026-11-14"
    }
  ],

  roedeFlag: [
    {
      id: "eks-flag-fremhaevet",
      tekst: "EKSEMPEL: flag, der fremhæves, når 'Udløs flag' er Ja",
      handling: "EKSEMPEL: her står, hvad man gør",
      fremhaevHvis: [[{ felt: "eksempelfelt", er: "ja" }]],
      kilder: ["eks-dansk"],
      status: "UDKAST"
    },
    {
      id: "eks-flag-uden-kilde",
      tekst: "EKSEMPEL: flag uden kilde",
      handling: "EKSEMPEL: handling",
      kilder: [],
      status: "UDKAST"
    }
  ],
  differentialdiagnoser: [
    {
      id: "eks-diff-godkendt",
      navn: "EKSEMPEL: godkendt punkt",
      kendetegn: ["EKSEMPEL: kendetegn 1", "EKSEMPEL: kendetegn 2"],
      notat: "Eksempel på vurdering.",
      kilder: ["eks-dansk"],
      status: "GODKENDT",
      godkendtDato: "2026-11-14"
    },
    {
      id: "eks-diff-udkast",
      navn: "EKSEMPEL: udkast med udenlandsk kilde",
      kendetegn: ["EKSEMPEL: kendetegn"],
      notat: "Eksempel på vurdering.",
      kilder: ["eks-udenlandsk"],
      status: "UDKAST"
    }
  ],
  behandling: [
    {
      id: "eks-behandling-konflikt",
      tekst: "EKSEMPEL: behandling, hvor to kilder er uenige",
      gaelderFor: ["eks-diff-godkendt"],
      notat: "Eksempel på plan.",
      kilder: ["eks-dansk"],
      status: "UDKAST",
      konflikt: {
        beskrivelse: "EKSEMPEL: den danske kilde anbefaler A, den udenlandske anbefaler B.",
        kilder: ["eks-dansk", "eks-udenlandsk"]
      }
    }
  ],
  henvisning: [
    {
      id: "eks-henvisning",
      til: "EKSEMPEL: modtager",
      kriterier: "EKSEMPEL: kriterier for henvisning",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      kilder: ["eks-dansk"],
      status: "UDKAST"
    }
  ]
};
