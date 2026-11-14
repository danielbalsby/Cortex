import type { Region } from "./typer";

// ALBUE
//
// Sådan retter du: se vejledningen øverst i knae.ts – opbygningen er den samme.
//
// Felterne er nye og ikke gennemgået af dig. De følger Lægehåndbogens opdeling
// efter lokalisation (lateral, medial, bagtil, fortil), albue-ekstensionstesten
// efter traume og den neurovaskulære undersøgelse ved fraktur og luksation.

export const albue: Region = {
  id: "albue",
  navn: "Albue",

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
            { id: "hoejre", label: "Højre", notat: "Højresidige albuesmerter." },
            { id: "venstre", label: "Venstre", notat: "Venstresidige albuesmerter." }
          ]
        },
        {
          id: "debut",
          label: "Debut",
          type: "enkelt",
          valg: [
            { id: "traume", label: "Traume", notat: "Opstået efter traume." },
            { id: "overbelastning", label: "Overbelastning", notat: "Opstået efter overbelastning." },
            { id: "spontan", label: "Spontant", notat: "Opstået uden kendt årsag." }
          ]
        },
        {
          id: "mekanisme",
          label: "Mekanisme",
          type: "enkelt",
          visHvis: [{ felt: "debut", er: "traume" }],
          valg: [
            { id: "fald", label: "Fald på strakt arm", notat: "Fald på strakt arm." },
            { id: "hyper", label: "Over-stræk/-bøj", notat: "Kraftig overstrækning eller overbøjning af albuen." },
            { id: "slag", label: "Direkte slag", notat: "Direkte slag mod albuen." },
            { id: "andet", label: "Andet", notat: "Anden skademekanisme." }
          ]
        },
        {
          id: "lokalisation",
          label: "Lokalisation",
          type: "enkelt",
          valg: [
            { id: "lateral", label: "Lateralt", notat: "Smerter lateralt på albuen." },
            { id: "medial", label: "Medialt", notat: "Smerter medialt på albuen." },
            { id: "bagtil", label: "Bagtil", notat: "Smerter bagtil på albuen." },
            { id: "fortil", label: "Fortil", notat: "Smerter fortil på albuen." },
            { id: "diffus", label: "Diffust", notat: "Diffuse albuesmerter." }
          ]
        },
        {
          id: "varighed",
          label: "Varighed",
          type: "enkelt",
          valg: [
            { id: "dage", label: "Dage", notat: "Varighed få dage." },
            { id: "uger", label: "Uger", notat: "Varighed flere uger." },
            { id: "maaneder", label: "Måneder", notat: "Varighed flere måneder." }
          ]
        },
        {
          id: "paraestesier",
          label: "Paræstesier",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen paræstesier." },
            { id: "ulnar", label: "4.–5. finger", notat: "Paræstesier i 4. og 5. finger." },
            { id: "andet", label: "Andet område", notat: "Paræstesier i hånd eller underarm." }
          ]
        },
        {
          id: "laasning",
          label: "Låsning",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen låsning." },
            { id: "ja", label: "Ja", notat: "Låsninger af albuen." }
          ]
        },
        {
          id: "disposition",
          label: "Disposition",
          type: "flere",
          valg: [
            { id: "protese", label: "Albueprotese", notat: "Albueprotese." },
            { id: "ra", label: "Reumatoid artrit", notat: "Reumatoid artrit." }
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
          id: "fejlstilling",
          label: "Fejlstilling",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Ingen", notat: "Ingen fejlstilling.", normal: true },
            { id: "ja", label: "Ja", notat: "Fejlstilling af albuen." }
          ]
        },
        {
          id: "haevelse",
          label: "Hævelse",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen hævelse.", normal: true },
            { id: "bursa", label: "Over olecranon", notat: "Væskefyldt hævelse over olecranon." },
            { id: "led", label: "Leddet/hæmatom", notat: "Hævelse af leddet eller hæmatom." }
          ]
        },
        {
          id: "roedme",
          label: "Rødme/varme",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Ingen", notat: "Ingen rødme eller varmeøgning.", normal: true },
            { id: "ja", label: "Ja", notat: "Rødme og varmeøgning." }
          ]
        },
        {
          id: "ekstensionstest",
          label: "Ekstensionstest",
          type: "enkelt",
          visHvis: [{ felt: "debut", er: "traume" }],
          valg: [
            { id: "fuld", label: "Fuld bilateralt", notat: "Albue-ekstensionstest: fuld ekstension bilateralt.", normal: true },
            { id: "nedsat", label: "Nedsat", notat: "Albue-ekstensionstest: nedsat ekstension." }
          ]
        },
        {
          id: "bevaegelighed",
          label: "Bevægelighed",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal bevægelighed i albuen.", normal: true },
            { id: "nedsat", label: "Nedsat", notat: "Nedsat bevægelighed i albuen." },
            { id: "rotation", label: "Nedsat rotation", notat: "Nedsat og smertefuld pronation og supination." }
          ]
        },
        {
          id: "epikondyl",
          label: "Ømhed epikondyl",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen ømhed over epikondylerne.", normal: true },
            { id: "lateral", label: "Lateral", notat: "Ømhed over laterale epikondyl." },
            { id: "medial", label: "Medial", notat: "Ømhed over mediale epikondyl." }
          ]
        },
        {
          id: "isometrisk",
          label: "Isometrisk håndled",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Smertefri", notat: "Smertefri isometrisk ekstension og fleksion af håndleddet.", normal: true },
            {
              id: "ekstension",
              label: "Smerte ved ekstension",
              notat: "Smerter ved isometrisk ekstension og radial deviation af håndleddet med strakt albue."
            },
            { id: "fleksion", label: "Smerte ved fleksion", notat: "Smerter ved isometrisk fleksion af håndleddet med strakt albue." }
          ]
        },
        {
          id: "caputradii",
          label: "Caput radii",
          type: "enkelt",
          visHvis: [{ felt: "debut", er: "traume" }],
          valg: [
            { id: "uoem", label: "Uøm", notat: "Caput radii uøm.", normal: true },
            { id: "oem", label: "Øm", notat: "Palpationsømhed over caput radii." }
          ]
        },
        {
          id: "neurovaskulaer",
          label: "Neurovaskulært",
          type: "enkelt",
          visHvis: [{ felt: "debut", er: "traume" }],
          valg: [
            {
              id: "normal",
              label: "Normal",
              notat: "Palpabel radialispuls; normal sensibilitet og motorik svarende til n. ulnaris, medianus og radialis.",
              normal: true
            },
            { id: "paavirket", label: "Påvirket", notat: "Påvirket distal cirkulation eller nervefunktion." }
          ]
        },
        {
          id: "ulnaris",
          label: "N. ulnaris",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal sensibilitet i 4.–5. finger og normal kraft i ulnarisinnerverede muskler.", normal: true },
            { id: "sens", label: "↓ sensibilitet", notat: "Nedsat sensibilitet i 4.–5. finger." },
            { id: "kraft", label: "↓ kraft", notat: "Nedsat kraft ved adduktion af 1. finger og abduktion af 5. finger." }
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
      felter: ["side", "debut", "mekanisme", "lokalisation", "varighed", "paraestesier", "laasning", "disposition", "anamnese-tekst"]
    },
    {
      overskrift: "O",
      felter: [
        "fejlstilling",
        "haevelse",
        "roedme",
        "ekstensionstest",
        "bevaegelighed",
        "epikondyl",
        "isometrisk",
        "caputradii",
        "neurovaskulaer",
        "ulnaris",
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
