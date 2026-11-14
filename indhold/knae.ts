import type { Region } from "./typer";

// KNÆ
//
// Sådan retter du:
// - "label" er teksten på knappen. "notat" er sætningen, der havner i notatet.
// - Rækkefølgen af felter her er rækkefølgen på skærmen.
// - "notat" nederst bestemmer rækkefølgen i selve notatet.
// - normal: true markerer normalfundet (bruges af N-genvejen fra trin 3).
//
// Felter og fraser er overført fra den tidligere knæ-formular og er ikke
// gennemgået af dig endnu. Beslutningsstøtten (røde flag, differential-
// diagnoser, behandling, henvisning) er tom, indtil trin 5–6.

export const knae: Region = {
  id: "knae",
  navn: "Knæ",

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
            { id: "hoejre", label: "Højre", notat: "Højresidige knæsmerter." },
            { id: "venstre", label: "Venstre", notat: "Venstresidige knæsmerter." },
            { id: "begge", label: "Begge", notat: "Bilaterale knæsmerter." }
          ]
        },
        {
          id: "debut",
          label: "Debut",
          type: "enkelt",
          valg: [
            { id: "akut", label: "Akut", notat: "Akut debut." },
            { id: "gradvis", label: "Gradvis", notat: "Gradvist indsættende." },
            { id: "recidiv", label: "Recidiv", notat: "Recidiverende gener." }
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
          id: "traume",
          label: "Traume",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Intet traume." },
            { id: "ja", label: "Ja", notat: "Forudgående traume." }
          ]
        },
        {
          id: "traumemekanisme",
          label: "Mekanisme",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "vrid", label: "Vrid", notat: "Traume ved vrid." },
            { id: "fald", label: "Fald", notat: "Traume ved fald." },
            { id: "slag", label: "Direkte slag", notat: "Direkte traume mod knæ." },
            { id: "andet", label: "Andet", notat: "Anden traumemekanisme." }
          ]
        },
        {
          id: "haevelse-straks",
          label: "Hævelse straks",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "ja", label: "Ja", notat: "Hævelse opstod umiddelbart efter traumet." },
            { id: "nej", label: "Nej", notat: "Ingen umiddelbar hævelse efter traumet." }
          ]
        },
        {
          id: "knaek",
          label: "Hørt/følt knæk",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "ja", label: "Ja", notat: "Hørt eller følt et knæk ved traumet." },
            { id: "nej", label: "Nej", notat: "Ingen knæklyd eller -følelse ved traumet." }
          ]
        },
        {
          id: "belastning",
          label: "Belastning",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Kan belaste." },
            { id: "reduceret", label: "Reduceret", notat: "Reduceret belastningsevne." },
            { id: "ingen", label: "Kan ikke støtte", notat: "Kan ikke støtte på benet." }
          ]
        },
        {
          id: "laasning",
          label: "Låsning",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen låsning." },
            { id: "ja", label: "Ja", notat: "Oplever aflåsning." }
          ]
        },
        {
          id: "feber",
          label: "Feber",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen feber." },
            { id: "ja", label: "Ja", notat: "Feber." }
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
          id: "haevelse",
          label: "Hævelse",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen hævelse.", normal: true },
            { id: "let", label: "Let", notat: "Let hævelse." },
            { id: "moderat", label: "Moderat", notat: "Moderat hævelse." },
            { id: "udtalt", label: "Udtalt", notat: "Udtalt hævelse." }
          ]
        },
        {
          id: "roedme",
          label: "Rødme",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen rødme.", normal: true },
            { id: "ja", label: "Ja", notat: "Rødme." }
          ]
        },
        {
          id: "varme",
          label: "Varme",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen varmeøgning.", normal: true },
            { id: "ja", label: "Ja", notat: "Varmeøgning." }
          ]
        },
        {
          id: "ledlinje",
          label: "Ledlinjeømhed",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen ledlinjeømhed.", normal: true },
            { id: "medial", label: "Medial", notat: "Medial ledlinjeømhed." },
            { id: "lateral", label: "Lateral", notat: "Lateral ledlinjeømhed." }
          ]
        },
        {
          id: "bevaegelighed",
          label: "Bevægelighed",
          type: "enkelt",
          valg: [
            { id: "fuld", label: "Fuld", notat: "Fuld bevægelighed.", normal: true },
            { id: "let", label: "Let nedsat", notat: "Let nedsat bevægelighed." },
            { id: "svaert", label: "Svært nedsat", notat: "Svært nedsat bevægelighed." }
          ]
        },
        {
          id: "stabilitet",
          label: "Stabilitet",
          type: "enkelt",
          valg: [
            { id: "stabil", label: "Stabil", notat: "Stabilt ved klinisk ligamenttest.", normal: true },
            { id: "instabil", label: "Instabilitet", notat: "Klinisk mistanke om instabilitet." }
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
      felter: [
        "side",
        "debut",
        "varighed",
        "traume",
        "traumemekanisme",
        "haevelse-straks",
        "knaek",
        "belastning",
        "laasning",
        "feber",
        "anamnese-tekst"
      ]
    },
    {
      overskrift: "O",
      felter: ["haevelse", "roedme", "varme", "ledlinje", "bevaegelighed", "stabilitet", "objektivt-tekst"]
    }
  ],

  kilder: [],
  roedeFlag: [],
  differentialdiagnoser: [],
  behandling: [],
  henvisning: []
};
