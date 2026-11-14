import type { Region } from "./typer";

// ANKEL
//
// Sådan retter du: se vejledningen øverst i knae.ts – opbygningen er den samme.
//
// Felterne er nye (ikke overført fra den gamle app) og ikke gennemgået af dig.
// De er valgt, så Ottawa-reglerne for ankel og fod kan registreres: knogleømhed
// på malleoler, os naviculare og basis af 5. metatars, samt evnen til at gå fire
// vægtbærende skridt umiddelbart efter skaden og ved undersøgelsen.

export const ankel: Region = {
  id: "ankel",
  navn: "Ankel",

  grupper: [
    {
      id: "anamnese",
      titel: "Anamnese",
      felter: [
        {
          id: "side",
          label: "Side",
          type: "enkelt",
          valg: [
            { id: "hoejre", label: "Højre", notat: "Højresidige ankelsmerter." },
            { id: "venstre", label: "Venstre", notat: "Venstresidige ankelsmerter." },
            { id: "begge", label: "Begge", notat: "Bilaterale ankelsmerter." }
          ]
        },
        {
          id: "mekanisme",
          label: "Mekanisme",
          type: "enkelt",
          valg: [
            { id: "inversion", label: "Indadvrid", notat: "Indadvridningstraume (inversion)." },
            { id: "udadrotation", label: "Udadrotation", notat: "Udadrotations- eller eversionstraume." },
            { id: "hael", label: "Fald på hæl", notat: "Fald med landing på hælen." },
            { id: "smaeld", label: "Smæld i læg", notat: "Smæld eller følelse af spark bag på læggen ved afsæt." },
            { id: "overbelastning", label: "Overbelastning", notat: "Gener efter øget eller gentagen belastning uden enkeltstående traume." },
            { id: "andet", label: "Andet", notat: "Anden skademekanisme." }
          ]
        },
        {
          id: "varighed",
          label: "Varighed",
          type: "enkelt",
          valg: [
            { id: "timer", label: "Timer", notat: "Varighed timer." },
            { id: "dage", label: "Dage", notat: "Varighed få dage." },
            { id: "uger", label: "Uger", notat: "Varighed flere uger." },
            { id: "maaneder", label: "Måneder", notat: "Varighed flere måneder." }
          ]
        },
        {
          id: "skridt-straks",
          label: "4 skridt straks",
          type: "enkelt",
          valg: [
            { id: "ja", label: "Kunne", notat: "Kunne gå fire vægtbærende skridt umiddelbart efter skaden." },
            { id: "nej", label: "Kunne ikke", notat: "Kunne ikke gå fire vægtbærende skridt umiddelbart efter skaden." }
          ]
        },
        {
          id: "tidligere",
          label: "Tidligere vrid",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen tidligere ankelskader." },
            { id: "ja", label: "Ja", notat: "Tidligere ankelforstuvning." },
            { id: "giveway", label: "Gentagne/giv-way", notat: "Gentagne forstuvninger og giv-way-episoder." }
          ]
        },
        {
          id: "disposition",
          label: "Disposition",
          type: "flere",
          valg: [
            { id: "diabetes", label: "Diabetes", notat: "Diabetes." },
            { id: "foelesans", label: "Nedsat følesans", notat: "Nedsat følesans i foden." },
            { id: "osteoporose", label: "Osteoporose", notat: "Osteoporose." }
          ]
        },
        {
          id: "anamnese-tekst",
          label: "Supplerende",
          type: "tekst",
          pladsholder: "Kort supplerende anamnese (ingen navn/CPR)"
        }
      ]
    },
    {
      id: "objektivt",
      titel: "Objektivt",
      felter: [
        {
          id: "skridt-nu",
          label: "4 skridt nu",
          type: "enkelt",
          valg: [
            { id: "ja", label: "Går", notat: "Går fire vægtbærende skridt ved undersøgelsen.", normal: true },
            { id: "nej", label: "Kan ikke", notat: "Kan ikke gå fire vægtbærende skridt ved undersøgelsen." }
          ]
        },
        {
          id: "fejlstilling",
          label: "Fejlstilling",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Ingen", notat: "Ingen fejlstilling.", normal: true },
            { id: "ja", label: "Ja", notat: "Fejlstilling." }
          ]
        },
        {
          id: "neurovaskulaer",
          label: "Cirk./sens. distalt",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal distal cirkulation og sensibilitet.", normal: true },
            { id: "paavirket", label: "Påvirket", notat: "Påvirket distal cirkulation eller sensibilitet." }
          ]
        },
        {
          id: "haevelse",
          label: "Hævelse",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen hævelse.", normal: true },
            { id: "lateral", label: "Lateral", notat: "Hævelse lateralt." },
            { id: "medial", label: "Medial", notat: "Hævelse medialt." },
            { id: "udtalt", label: "Udtalt", notat: "Udtalt hævelse og hæmatom." }
          ]
        },
        {
          id: "malleol",
          label: "Knogleømhed malleol",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen knogleømhed over malleolerne.", normal: true },
            { id: "lateral", label: "Lateral", notat: "Knogleømhed over laterale malleol (bagkant/spids, nederste 6 cm)." },
            { id: "medial", label: "Medial", notat: "Knogleømhed over mediale malleol (bagkant/spids, nederste 6 cm)." },
            { id: "begge", label: "Begge", notat: "Knogleømhed over begge malleoler (bagkant/spids, nederste 6 cm)." }
          ]
        },
        {
          id: "mellemfod",
          label: "Knogleømhed fod",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen knogleømhed over os naviculare eller basis af 5. metatars.", normal: true },
            { id: "naviculare", label: "Naviculare", notat: "Knogleømhed over os naviculare." },
            { id: "mt5", label: "Basis 5. mt.", notat: "Knogleømhed over basis af 5. metatars." },
            { id: "begge", label: "Begge", notat: "Knogleømhed over os naviculare og basis af 5. metatars." }
          ]
        },
        {
          id: "fibula",
          label: "Proksimal fibula",
          type: "enkelt",
          valg: [
            { id: "uoem", label: "Uøm", notat: "Proksimale fibula uøm.", normal: true },
            { id: "oem", label: "Øm", notat: "Ømhed over proksimale fibula." }
          ]
        },
        {
          id: "ledbaand",
          label: "Laterale ledbånd",
          type: "enkelt",
          valg: [
            { id: "uoem", label: "Uømme", notat: "Laterale ledbånd uømme.", normal: true },
            { id: "oem", label: "Ømme", notat: "Ømhed over laterale ledbånd." }
          ]
        },
        {
          id: "syndesmose",
          label: "Syndesmose",
          type: "enkelt",
          valg: [
            { id: "uoem", label: "Uøm", notat: "Syndesmosen uøm ved palpation og squeeze-test.", normal: true },
            { id: "oem", label: "Øm/squeeze +", notat: "Ømhed over syndesmosen eller positiv squeeze-test." }
          ]
        },
        {
          id: "akilles",
          label: "Akillessene",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Akillessenen uden defekt; negativ Simmonds-Thompson-test.", normal: true },
            { id: "positiv", label: "Thompson +/defekt", notat: "Positiv Simmonds-Thompson-test eller palpabel defekt i akillessenen." }
          ]
        },
        {
          id: "objektivt-tekst",
          label: "Supplerende",
          type: "tekst",
          pladsholder: "Kort supplerende objektive fund"
        }
      ]
    }
  ],

  notat: [
    {
      overskrift: "S",
      felter: ["side", "mekanisme", "varighed", "skridt-straks", "tidligere", "disposition", "anamnese-tekst"]
    },
    {
      overskrift: "O",
      felter: [
        "skridt-nu",
        "fejlstilling",
        "neurovaskulaer",
        "haevelse",
        "malleol",
        "mellemfod",
        "fibula",
        "ledbaand",
        "syndesmose",
        "akilles",
        "objektivt-tekst"
      ]
    }
  ],

  kilder: [],
  roedeFlag: [],
  differentialdiagnoser: [],
  behandling: [],
  henvisning: []
};
