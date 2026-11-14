import type { Region } from "./typer";

// SKULDER
//
// Sådan retter du: se vejledningen øverst i knae.ts – opbygningen er den samme.
//
// Felterne er nye og ikke gennemgået af dig. De følger den kliniske undersøgelse
// i Lægehåndbogen (aktiv/passiv bevægelighed, smertebue, Hawkins/Neer, kraft i
// rotator cuffen, AC-led) og de aldersgrænser, kilderne bruger (40 og 75 år).

export const skulder: Region = {
  id: "skulder",
  navn: "Skulder",

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
            { id: "hoejre", label: "Højre", notat: "Højresidige skuldersmerter." },
            { id: "venstre", label: "Venstre", notat: "Venstresidige skuldersmerter." },
            { id: "begge", label: "Begge", notat: "Bilaterale skuldersmerter." }
          ]
        },
        {
          id: "alder",
          label: "Alder",
          type: "enkelt",
          valg: [
            { id: "under40", label: "Under 40", notat: "Alder under 40 år." },
            { id: "40til75", label: "40–75", notat: "Alder 40–75 år." },
            { id: "over75", label: "Over 75", notat: "Alder over 75 år." }
          ]
        },
        {
          id: "debut",
          label: "Debut",
          type: "enkelt",
          valg: [
            { id: "spontan", label: "Spontant", notat: "Spontant opståede gener." },
            { id: "overbelastning", label: "Overbelastning", notat: "Opstået efter overbelastning." },
            { id: "traume", label: "Traume", notat: "Opstået efter traume." }
          ]
        },
        {
          id: "traumetype",
          label: "Traume",
          type: "enkelt",
          visHvis: [{ felt: "debut", er: "traume" }],
          valg: [
            { id: "fald", label: "Fald på arm/skulder", notat: "Fald på arm eller skulder." },
            { id: "loeft", label: "Tungt løft", notat: "Tungt løft." },
            { id: "luksation", label: "Ude af led", notat: "Skulderen var ude af led." },
            { id: "andet", label: "Andet", notat: "Anden skademekanisme." }
          ]
        },
        {
          id: "varighed",
          label: "Varighed",
          type: "enkelt",
          valg: [
            { id: "dage", label: "Dage", notat: "Varighed få dage." },
            { id: "uger", label: "Uger", notat: "Varighed flere uger." },
            { id: "maaneder", label: "Måneder", notat: "Varighed flere måneder." },
            { id: "over6", label: "Over 6 mdr.", notat: "Varighed over 6 måneder." }
          ]
        },
        {
          id: "nat",
          label: "Natlige smerter",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen natlige smerter." },
            { id: "liggende", label: "Ved liggen på skulderen", notat: "Natlige smerter ved liggen på skulderen." },
            { id: "hvile", label: "Også i hvile", notat: "Hvilesmerter og natlige smerter." }
          ]
        },
        {
          id: "luksationer",
          label: "Tidl. luksation",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen tidligere skulderluksation." },
            { id: "en", label: "Én", notat: "Én tidligere skulderluksation." },
            { id: "flere", label: "Flere", notat: "Flere tidligere skulderluksationer." }
          ]
        },
        {
          id: "nakke",
          label: "Nakke/udstråling",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen nakkesmerter eller udstråling." },
            { id: "ja", label: "Ja", notat: "Smerter også i nakke eller skulderbue, evt. med udstråling." }
          ]
        },
        {
          id: "arbejde",
          label: "Arbejde over skulderhøjde",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Intet skulderbelastende arbejde." },
            { id: "ja", label: "Ja", notat: "Skulderbelastende arbejde eller idræt over skulderhøjde." }
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
            { id: "ja", label: "Ja", notat: "Fejlstilling eller epauletskulder." }
          ]
        },
        {
          id: "axillaris",
          label: "Sens. lateralt (n. ax.)",
          type: "enkelt",
          visHvis: [{ felt: "debut", er: "traume" }],
          valg: [
            { id: "normal", label: "Normal", notat: "Normal sensibilitet lateralt på skulderen.", normal: true },
            { id: "nedsat", label: "Nedsat", notat: "Nedsat sensibilitet lateralt på skulderen." }
          ]
        },
        {
          id: "aktiv",
          label: "Aktiv bevægelighed",
          type: "enkelt",
          valg: [
            { id: "fuld", label: "Fuld", notat: "Fuld aktiv bevægelighed.", normal: true },
            { id: "nedsat", label: "Nedsat", notat: "Nedsat aktiv bevægelighed." }
          ]
        },
        {
          id: "passiv",
          label: "Passiv bevægelighed",
          type: "enkelt",
          valg: [
            { id: "fuld", label: "Fuld", notat: "Fuld passiv bevægelighed.", normal: true },
            { id: "kapsulaer", label: "Nedsat, især udadrot.", notat: "Nedsat passiv bevægelighed, især udadrotation." },
            { id: "nedsat", label: "Nedsat, andet", notat: "Nedsat passiv bevægelighed." }
          ]
        },
        {
          id: "smertebue",
          label: "Smertebue",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Ingen smertebue.", normal: true },
            { id: "pos", label: "Positiv", notat: "Positiv smertebue." }
          ]
        },
        {
          id: "impingement",
          label: "Hawkins/Neer",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negative", notat: "Negativ Hawkins' og Neer's test.", normal: true },
            { id: "pos", label: "Positive", notat: "Positiv Hawkins' og/eller Neer's test." }
          ]
        },
        {
          id: "kraft",
          label: "Kraft rotator cuff",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal kraft i rotator cuffen.", normal: true },
            { id: "abd", label: "↓ abduktion", notat: "Nedsat kraft ved isometrisk abduktion (supraspinatus)." },
            { id: "udad", label: "↓ udadrot.", notat: "Nedsat kraft ved isometrisk udadrotation (infraspinatus)." },
            { id: "indad", label: "↓ indadrot.", notat: "Nedsat kraft ved isometrisk indadrotation (subscapularis)." },
            { id: "flere", label: "↓ flere planer", notat: "Nedsat kraft i flere planer." }
          ]
        },
        {
          id: "acled",
          label: "AC-led",
          type: "enkelt",
          valg: [
            { id: "uoemt", label: "Uømt", notat: "AC-leddet uømt, negativ crossover-test.", normal: true },
            { id: "oemt", label: "Ømt/crossover +", notat: "Ømhed over AC-leddet og/eller positiv crossover-test." }
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
      felter: ["side", "alder", "debut", "traumetype", "varighed", "nat", "luksationer", "nakke", "arbejde", "anamnese-tekst"]
    },
    {
      overskrift: "O",
      felter: ["fejlstilling", "axillaris", "aktiv", "passiv", "smertebue", "impingement", "kraft", "acled", "objektivt-tekst"]
    }
  ],

  kilder: [],
  roedeFlag: [],
  differentialdiagnoser: [],
  behandling: [],
  henvisning: []
};
