import type { Region } from "./typer";

// LÆNDERYG
//
// Sådan retter du: se vejledningen øverst i knae.ts – opbygningen er den samme.
//
// Felterne er nye og ikke gennemgået af dig. De følger Lægehåndbogens opdeling
// i uspecifikke lænderygsmerter, nerverodsaffektion og mulig alvorlig sygdom
// (røde flag), samt den neurologiske undersøgelse af L4, L5 og S1.
// Rektaleksploration vises kun, når der er registreret cauda equina-symptomer,
// og udfyldes aldrig af N.

export const ryg: Region = {
  id: "ryg",
  navn: "Lænderyg",

  grupper: [
    {
      id: "anamnese",
      titel: "Anamnese",
      felter: [
        {
          id: "udbredning",
          label: "Udbredning",
          type: "enkelt",
          valg: [
            { id: "laend", label: "Kun lænd", notat: "Smerter i lænden uden udstråling." },
            { id: "laar", label: "Til balde/lår", notat: "Smerter i lænden med udstråling til balde eller lår, ikke distalt for knæet." },
            { id: "underknae", label: "Under knæet", notat: "Udstrålende smerter distalt for knæet." }
          ]
        },
        {
          id: "udstraalingsside",
          label: "Udstråling, side",
          type: "enkelt",
          visHvis: [{ felt: "udbredning", er: "underknae" }],
          valg: [
            { id: "hoejre", label: "Højre", notat: "Udstråling i højre ben." },
            { id: "venstre", label: "Venstre", notat: "Udstråling i venstre ben." },
            { id: "begge", label: "Begge", notat: "Udstråling i begge ben." }
          ]
        },
        {
          id: "hoste",
          label: "Hoste/nys forværrer",
          type: "enkelt",
          visHvis: [{ felt: "udbredning", er: "underknae" }],
          valg: [
            { id: "nej", label: "Nej", notat: "Udstrålingen forværres ikke ved hoste eller nys." },
            { id: "ja", label: "Ja", notat: "Udstrålingen forværres ved hoste eller nys." }
          ]
        },
        {
          id: "debut",
          label: "Debut",
          type: "enkelt",
          valg: [
            { id: "akut", label: "Akut ved løft/vrid", notat: "Akut debut ved løft eller vrid." },
            { id: "gradvis", label: "Gradvis", notat: "Gradvist indsættende." },
            { id: "ukendt", label: "Uden kendt årsag", notat: "Opstået uden kendt årsag." }
          ]
        },
        {
          id: "varighed",
          label: "Varighed",
          type: "enkelt",
          valg: [
            { id: "dage", label: "Dage", notat: "Varighed få dage." },
            { id: "uger", label: "Under 6 uger", notat: "Varighed under 6 uger." },
            { id: "6til12", label: "6–12 uger", notat: "Varighed 6–12 uger." },
            { id: "over12", label: "Over 12 uger", notat: "Varighed over 12 uger." }
          ]
        },
        {
          id: "tidligere",
          label: "Tidligere episoder",
          type: "enkelt",
          valg: [
            { id: "foerste", label: "Første episode", notat: "Første episode med rygsmerter." },
            { id: "lignende", label: "Lignende før", notat: "Tidligere lignende episoder." },
            { id: "anderledes", label: "Anderledes end før", notat: "Ryggener, der opfattes anderledes end tidligere." }
          ]
        },
        {
          id: "cauda",
          label: "Blære/tarm/ridebukse",
          type: "enkelt",
          valg: [
            {
              id: "nej",
              label: "Ingen gener",
              notat: "Ingen vandladnings- eller afføringsforstyrrelser og ingen føleforstyrrelser i ridebukseområdet."
            },
            {
              id: "ja",
              label: "Gener",
              notat: "Vandladnings- eller afføringsforstyrrelser eller føleforstyrrelser i ridebukseområdet."
            }
          ]
        },
        {
          id: "claudicatio",
          label: "Gangbesvær",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Nej", notat: "Ingen ben- eller baldesmerter, der begrænser gangdistancen." },
            {
              id: "ja",
              label: "Ja",
              notat: "Ben- eller baldesmerter ved gang, der begrænser gangdistancen og lindres ved foroverbøjning."
            }
          ]
        },
        {
          id: "roedeflag",
          label: "Røde flag (anamnese)",
          type: "flere",
          valg: [
            { id: "kraeft", label: "Tidl. kræft", notat: "Tidligere kræftsygdom." },
            { id: "feber", label: "Feber/almen sygdom", notat: "Feber eller generel sygdomsfølelse." },
            { id: "vaegttab", label: "Vægttab", notat: "Vægttab." },
            { id: "konstant", label: "Konstante/hvilesmerter", notat: "Konstante, evt. tiltagende smerter og hvilesmerter." },
            { id: "traume", label: "Traume", notat: "Forudgående traume." },
            { id: "osteoporose", label: "Osteoporose/steroid", notat: "Osteoporose eller behandling med steroid." },
            { id: "immun", label: "Stofmisbrug/immunsupp.", notat: "Stofmisbrug eller immunsuppressiv behandling." },
            { id: "morgenstivhed", label: "Morgenstivhed > 1 t", notat: "Udtalt morgenstivhed over en time." }
          ]
        },
        {
          id: "guleflag",
          label: "Gule flag",
          type: "flere",
          valg: [
            { id: "arbejde", label: "Sygemelding/arbejde", notat: "Sygemelding eller arbejdsrelaterede problemer." },
            { id: "psyke", label: "Angst/depression", notat: "Emotionelle problemer (angst eller depression)." },
            { id: "udbredt", label: "Udbredte smerter/træthed", notat: "Generaliserede smerter, træthed eller andre tillægssymptomer." }
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
          id: "almen",
          label: "Almentilstand",
          type: "enkelt",
          valg: [
            { id: "upaavirket", label: "Upåvirket", notat: "Upåvirket almentilstand.", normal: true },
            { id: "paavirket", label: "Påvirket", notat: "Påvirket almentilstand." }
          ]
        },
        {
          id: "holdning",
          label: "Gang/holdning",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal gang og holdning.", normal: true },
            { id: "skoliose", label: "Aflastningsskoliose", notat: "Aflastningsskoliose og smertepræget gang." },
            { id: "deformitet", label: "Deformitet", notat: "Deformitet i rygsøjlen." }
          ]
        },
        {
          id: "bevaegelighed",
          label: "Bevægelighed",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal bevægelighed i lænderyggen.", normal: true },
            { id: "nedsat", label: "Nedsat", notat: "Nedsat bevægelighed i lænderyggen." }
          ]
        },
        {
          id: "lasegue",
          label: "Lasègue",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Negativ Lasègue bilateralt.", normal: true },
            { id: "hoejre", label: "Positiv højre", notat: "Positiv Lasègue højre (radikulære smerter distalt for knæet)." },
            { id: "venstre", label: "Positiv venstre", notat: "Positiv Lasègue venstre (radikulære smerter distalt for knæet)." },
            { id: "krydset", label: "Krydset positiv", notat: "Positiv krydset Lasègue." }
          ]
        },
        {
          id: "kraft",
          label: "Kraft",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal kraft i underekstremiteterne.", normal: true },
            { id: "l4", label: "↓ L4", notat: "Nedsat kraft ved knæekstension (L4)." },
            { id: "l5", label: "↓ L5", notat: "Nedsat kraft ved dorsalfleksion af fod og storetå / hælgang (L5)." },
            { id: "s1", label: "↓ S1", notat: "Nedsat kraft ved plantarfleksion / tågang (S1)." },
            { id: "betydende", label: "Betydende parese", notat: "Betydende parese (grad 3 eller mindre)." }
          ]
        },
        {
          id: "reflekser",
          label: "Reflekser",
          type: "enkelt",
          valg: [
            { id: "normale", label: "Normale", notat: "Normale og symmetriske patellar- og achillesreflekser.", normal: true },
            { id: "patellar", label: "↓ patellar", notat: "Afsvækket patellarrefleks." },
            { id: "achilles", label: "↓ achilles", notat: "Afsvækket achillesrefleks." }
          ]
        },
        {
          id: "sensibilitet",
          label: "Sensibilitet",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal sensibilitet i underekstremiteterne.", normal: true },
            { id: "dermatom", label: "↓ dermatomalt", notat: "Nedsat sensibilitet svarende til et dermatom." },
            { id: "ridebukse", label: "↓ ridebukseområdet", notat: "Nedsat sensibilitet i ridebukseområdet." }
          ]
        },
        {
          id: "rektal",
          label: "Rektaleksploration",
          type: "enkelt",
          visHvis: [{ felt: "cauda", er: "ja" }],
          valg: [
            {
              id: "normal",
              label: "Normal",
              notat: "Rektaleksploration: normal sfinktertonus og knibekraft, normal sensibilitet perianalt."
            },
            {
              id: "nedsat",
              label: "Nedsat tonus/sens.",
              notat: "Rektaleksploration: nedsat sfinktertonus, knibekraft eller perianal sensibilitet."
            },
            { id: "ikke", label: "Ikke udført", notat: "Rektaleksploration ikke udført." }
          ]
        },
        {
          id: "objektivt-tekst",
          label: "Supplerende",
          type: "tekst",
          pladsholder: "Kort supplerende fund (fx Lasègue-gradtal)"
        }
      ]
    }
  ],

  notat: [
    {
      overskrift: "S",
      felter: [
        "udbredning",
        "udstraalingsside",
        "hoste",
        "debut",
        "varighed",
        "tidligere",
        "cauda",
        "claudicatio",
        "roedeflag",
        "guleflag",
        "anamnese-tekst"
      ]
    },
    {
      overskrift: "O",
      felter: ["almen", "holdning", "bevaegelighed", "lasegue", "kraft", "reflekser", "sensibilitet", "rektal", "objektivt-tekst"]
    }
  ],

  kilder: [],
  roedeFlag: [],
  differentialdiagnoser: [],
  behandling: [],
  henvisning: []
};
