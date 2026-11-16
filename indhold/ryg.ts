import { RH_VISITATION_REUMATOLOGI } from "./faelles";
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
//
// Beslutningsstøtten nederst er UDKAST skrevet 2026-11-14 ud fra de anførte
// sider i Lægehåndbogen og Region Hovedstadens forløbsbeskrivelser, som alle er
// læst den dag. Lægehåndbogen gengiver flere anbefalinger fra SST's nationale
// kliniske retningslinjer (NKR) for lænderygsmerter og lumbal nerverodspåvirkning;
// selve NKR er ikke læst (sst.dk afviste automatisk adgang). Kun du sætter "GODKENDT".

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
              label: "Ingen blære-/tarm-/ridebuksegener",
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
            { id: "upaavirket", label: "Upåvirket", notat: "Upåvirket almentilstand." },
            { id: "paavirket", label: "Påvirket", notat: "Påvirket almentilstand." }
          ]
        },
        {
          id: "holdning",
          label: "Gang/holdning",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal gang og holdning." },
            { id: "skoliose", label: "Aflastningsskoliose", notat: "Aflastningsskoliose og smertepræget gang." },
            { id: "deformitet", label: "Deformitet", notat: "Deformitet i rygsøjlen." }
          ]
        },
        {
          id: "bevaegelighed",
          label: "Bevægelighed",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal bevægelighed i lænderyggen." },
            { id: "nedsat", label: "Nedsat", notat: "Nedsat bevægelighed i lænderyggen." }
          ]
        },
        {
          id: "lasegue",
          label: "Lasègue",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Negativ Lasègue bilateralt." },
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
            { id: "normal", label: "Normal", notat: "Normal kraft i underekstremiteterne." },
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
            { id: "normale", label: "Patellar + achilles normale", notat: "Normale og symmetriske patellar- og achillesreflekser." },
            { id: "patellar", label: "↓ patellar", notat: "Afsvækket patellarrefleks." },
            { id: "achilles", label: "↓ achilles", notat: "Afsvækket achillesrefleks." }
          ]
        },
        {
          id: "sensibilitet",
          label: "Sensibilitet",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal sensibilitet i underekstremiteterne." },
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
              label: "Normal tonus, kraft, sens.",
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

  kilder: [
    {
      id: "lh-laendesmerter",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Lændesmerter – lave rygsmerter",
      aar: 2024,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/ryg-nakke-og-bryst/laendesmerter-lave-rygsmerter/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-rygsmerter",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Rygsmerter",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/symptomer-og-tegn/rygsmerter/",
      sidstTjekket: "2026-11-15"
    },
    {
      id: "lh-rodaffektion",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Lumbal rodaffektion",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/neurologi/tilstande-og-sygdomme/muskelskelet/lumbal-rodaffektion/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-spinalstenose",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Spinalstenose",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/neurologi/tilstande-og-sygdomme/rygmarv/spinalstenose/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-uden-udstraaling",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Nakke- og lænderygsmerter uden radikulære symptomer",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/nakke-laende-ryg-smerter-uden-udstraaling/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-cauda",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Cauda equina og nyopstået parese",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/cauda-equina/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-spondylartrit",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Spondylartrit",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/spondylartrit/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-billed",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Columna thoracalis og lumbalis, billeddiagnostik af",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/a-alment-og-uspecificeret/skanning-billeddiagnostik/columna-lumbalis-thoracalis-billeddiagnostik-af/",
      sidstTjekket: "2026-11-14"
    },
    RH_VISITATION_REUMATOLOGI
  ],

  roedeFlag: [
    {
      id: "flag-cauda",
      tekst:
        "Cauda equina eller betydende nyopstået parese: blæretømningsbesvær, afføringsinkontinens, nedsat sensibilitet i ridebukseområdet, erektil dysfunktion – kan forekomme uden sensomotoriske udfald i benene. Betydelig parese (grad 3 eller mindre) nyopstået inden for 2 uger og/eller progredierende parese. Ved rodinkarceration kan smerterne være forsvundet, så kun paresen er tilbage.",
      handling:
        "Indlægges akut via CVI (akutmodtagelsen i planområdet). Rektaleksploration: sfinktertonus, voluntær knibekraft, sensibilitet i ridebukseområdet. Ved mistanke om tværsnitssyndrom på malign eller traumatisk basis: Rigshospitalet, Traumecentret.",
      fremhaevHvis: [
        [{ felt: "cauda", er: "ja" }],
        [{ felt: "sensibilitet", er: "ridebukse" }],
        [{ felt: "rektal", er: "nedsat" }],
        [{ felt: "kraft", er: "betydende" }]
      ],
      kilder: ["rh-cauda", "lh-rodaffektion", "lh-laendesmerter"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-malignitet",
      tekst:
        "Mulig malignitet: tidligere kræftsygdom, ryggener der debuterer eller opfattes anderledes end tidligere, konstante og evt. tiltagende smerter eller hvilesmerter, vægttab. Røde flag har lav sensitivitet og specificitet for alvorlig lændepatologi.",
      handling: "Udredes for underliggende sygdom – se konflikt om henvisningsvej.",
      fremhaevHvis: [
        [{ felt: "roedeflag", er: "kraeft" }],
        [{ felt: "roedeflag", er: "vaegttab" }],
        [{ felt: "roedeflag", er: "konstant" }],
        [{ felt: "tidligere", er: "anderledes" }]
      ],
      kilder: ["lh-laendesmerter", "rh-uden-udstraaling"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15",
      konflikt: {
        beskrivelse:
          "Lægehåndbogen (lændesmerter, 2024): ved mistanke om malignitet henvises i pakkeforløb. Region Hovedstaden (lænderygsmerter uden radikulære symptomer, 2025): infektion eller malignitet indlægges på lokal akutmodtagelse. Region Hovedstadens billeddiagnostiske vejledning (2025): ved mistanke om cancer/metastaser bør udredning foregå i pakkeforløb.",
        kilder: ["lh-laendesmerter", "rh-uden-udstraaling", "rh-billed"]
      }
    },
    {
      id: "flag-infektion",
      tekst:
        "Mulig infektion (spondylodiscitis): feber, generel sygdomsfølelse, stofmisbrug, immunsuppressiv behandling.",
      handling: "Udredes via specialafdeling – se konflikt om henvisningsvej.",
      fremhaevHvis: [[{ felt: "roedeflag", er: "feber" }], [{ felt: "roedeflag", er: "immun" }], [{ felt: "almen", er: "paavirket" }]],
      kilder: ["lh-laendesmerter", "rh-uden-udstraaling", "rh-billed"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15",
      konflikt: {
        beskrivelse:
          "Lægehåndbogen (2024): ved mistanke om infektion henvises til medicinsk eller rygkirurgisk afdeling. Region Hovedstaden (2025): infektion eller malignitet indlægges på lokal akutmodtagelse.",
        kilder: ["lh-laendesmerter", "rh-uden-udstraaling"]
      }
    },
    {
      id: "flag-fraktur",
      tekst:
        "Mulig fraktur: traume, osteoporose, brug af steroid. Ved spondylartrit med ankylosering kan selv lette traumer give atypiske, instabile columnafrakturer.",
      handling:
        "Røntgen ved traume med mistanke om fraktur. Osteoporotiske og traumatiske sammenfald behandles konservativt i primærsektoren; ved akutte svære smerter evt. indlæggelse. Ved mistanke om instabil fraktur konfereres med vagthavende på Rygsektionen, Rigshospitalet.",
      fremhaevHvis: [[{ felt: "roedeflag", er: "traume" }], [{ felt: "roedeflag", er: "osteoporose" }], [{ felt: "holdning", er: "deformitet" }]],
      kilder: ["lh-laendesmerter", "rh-uden-udstraaling", "rh-billed", "rh-spondylartrit"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-udbredte-udfald",
      tekst: "Udbredte og evt. progredierende neurologiske udfald, eller deformitet i rygsøjlen.",
      handling: "Hurtig henvisning til hospital ved røde flag; akut indlæggelse ved progredierende pareser.",
      fremhaevHvis: [[{ felt: "holdning", er: "deformitet" }], [{ felt: "kraft", er: "betydende" }]],
      kilder: ["lh-laendesmerter"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-inflammatorisk",
      tekst: "Mulig inflammatorisk rygsygdom: udtalt morgenstivhed over en time, høj SR.",
      handling:
        "Henvisning til reumatolog ved mistanke om Bechterews sygdom eller anden inflammatorisk ryglidelse. Region Hovedstaden: rygsmerter i over 3 måneder debuteret før 45-årsalderen med ét eller flere SpA-kendetegn kan henvises til reumatologisk hospitalsafdeling eller speciallægepraksis – se spondylartrit under differentialdiagnoser.",
      fremhaevHvis: [[{ felt: "roedeflag", er: "morgenstivhed" }]],
      kilder: ["lh-laendesmerter", "lh-rygsmerter", "rh-spondylartrit"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-indre-organer",
      tekst:
        "Smerter fra indre organer: aortaaneurisme (også dissekerende), pankreatit, ulcus perforans, pyelonefrit, prostatit, nyresten, herpes zoster, endometriose. Torakale smerter er et alarmsymptom.",
      handling: "Patienten udredes med tanke på mulig underliggende sygdom. Hurtig henvisning til hospital ved røde flag.",
      kilder: ["lh-laendesmerter", "lh-rygsmerter", "lh-rodaffektion"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-oevrige-alarm",
      tekst:
        "Øvrige forhold i anamnesen ved akutte rygsmerter: alder under 20 eller over 55 år, nylig spinalpunktur, nyopståede vandladningsproblemer.",
      handling: "Indgår i vurderingen af, om der er underliggende sygdom. Ved urinretention: se cauda equina.",
      kilder: ["lh-rygsmerter"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    }
  ],

  differentialdiagnoser: [
    {
      id: "diff-uspecifik",
      navn: "Uspecifikke lænderygsmerter",
      kendetegn: [
        "Den klart største gruppe (80–90 %)",
        "Smerter i lænderyg, nates og lår; varierende intensitet, ofte bedre i ro; god almentilstand",
        "Akutte: ofte pludseligt efter løft eller vrid; udstråling højst til knæet",
        "God prognose ved grønne flag og fravær af røde og gule flag"
      ],
      notat: "Foreneligt med uspecifikke lænderygsmerter.",
      kilder: ["lh-laendesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-rod",
      navn: "Lumbal rodaffektion / diskusprolaps",
      kendetegn: [
        "Bensmerter i dermatomalt mønster dominerer over lændesmerter; forværres ved hoste/bugpresse",
        "Positiv Lasègue: radikulære smerter distalt for knæet før 60° (L5/S1); omvendt Lasègue ved L4",
        "L4: forside lår/medialt underben, ↓ knæekstension, ↓ patellarrefleks",
        "L5: lateralt underben/storetå, ↓ dorsalfleksion og hælgang",
        "S1: bagside underben/lateral fodrand, ↓ plantarfleksion og tågang, ↓ achillesrefleks",
        "Hyppigst 20–40 år; de fleste bedres gradvist over uger til måneder"
      ],
      notat: "Foreneligt med lumbal rodaffektion.",
      kilder: ["lh-rodaffektion", "lh-laendesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-cauda",
      navn: "Cauda equina-syndrom",
      kendetegn: [
        "Median prolaps med tryk på flere nerverødder",
        "Nedsat sensibilitet i ridebukseområdet; påvirket blære-, anal- og erektil funktion",
        "Kan forekomme uden sensomotoriske symptomer i benene"
      ],
      notat: "Cauda equina-syndrom mistænkes.",
      kilder: ["lh-rodaffektion", "rh-cauda"],
      status: "UDKAST"
    },
    {
      id: "diff-stenose",
      navn: "Lumbal spinalstenose",
      kendetegn: [
        "Særligt hos ældre",
        "Tiltagende ben- eller baldesmerter ved gang med reduceret gangdistance (neurogen claudicatio)",
        "Lindring ved foroverbøjning"
      ],
      notat: "Foreneligt med lumbal spinalstenose.",
      kilder: ["lh-spinalstenose", "lh-laendesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-sammenfald",
      navn: "Vertebralt kompressionsbrud",
      kendetegn: ["Som følge af osteoporose eller metastase", "Under 5 % af alle med rygsmerter"],
      notat: "Vertebralt kompressionsbrud overvejes.",
      kilder: ["lh-laendesmerter", "rh-uden-udstraaling"],
      status: "UDKAST"
    },
    {
      id: "diff-spa",
      navn: "Spondylartrit / Bechterews sygdom",
      kendetegn: [
        "Debut før 45 år; smerter i glutealregion og/eller ryg over 3 måneder; stivhed",
        "Inflammatorisk præg: natlige og morgensmerter, bedring ved aktivitet, ingen lindring i hvile, god effekt af NSAID",
        "Perifer artrit, daktylit, entesopati, psoriasis, inflammatorisk tarmsygdom, uveit, forhøjet CRP, familiær disposition",
        "Lægehåndbogen: udtalt morgenstivhed over en time og høj SR er røde flag"
      ],
      notat: "Spondylartrit overvejes.",
      kilder: ["rh-spondylartrit", "lh-laendesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-malignitet",
      navn: "Malignitet (metastaser, myelomatose, spinal tumor)",
      kendetegn: [
        "Tidligere kræft, nyt smertemønster, konstante smerter, vægttab",
        "Ved langvarige gener: overvej prostata- og brystkræft"
      ],
      notat: "Malign årsag overvejes.",
      kilder: ["lh-laendesmerter", "lh-rodaffektion"],
      status: "UDKAST"
    },
    {
      id: "diff-infektion",
      navn: "Infektion (spondylodiscitis)",
      kendetegn: ["Feber, almen sygdomsfølelse, stofmisbrug, immunsuppression", "Røntgen er ikke tilstrækkeligt; udredes via specialafdeling"],
      notat: "Spinal infektion overvejes.",
      kilder: ["lh-laendesmerter", "rh-billed"],
      status: "UDKAST"
    },
    {
      id: "diff-spondylolistese",
      navn: "Spondylolistese",
      kendetegn: ["Kan give kroniske lænderygsmerter", "Røntgen er indiceret ved mistanke"],
      notat: "Spondylolistese overvejes.",
      kilder: ["lh-laendesmerter", "rh-billed"],
      status: "UDKAST"
    },
    {
      id: "diff-andet",
      navn: "Anden årsag til ben- og lændesmerter",
      kendetegn: [
        "Hofte- og knæartrose, sygdom i hofteled eller bækken",
        "Sygdom i plexus lumbosacralis, n. peroneus-læsion",
        "Dissekerende aortaaneurisme, arteriosklerose og andre karsygdomme",
        "Referred smerte fra indre organer"
      ],
      notat: "Anden årsag til smerterne overvejes.",
      kilder: ["lh-rodaffektion", "lh-laendesmerter"],
      status: "UDKAST"
    }
  ],

  behandling: [
    {
      id: "beh-aktivitet",
      tekst:
        "Patientuddannelse: tryghedsskabende dialog om den gode prognose. Fortsæt vanlig aktivitet frem for aflastning og sengeleje (sengeleje kun hvis patienten ikke magter at være oppe, højst 2 dage). Sygemelding så kort som mulig med opfølgning efter 1–2 uger, evt. gradueret.",
      notat: "Informeret om den gode prognose. Opfordret til at fortsætte vanlig aktivitet. Opfølgning om 1–2 uger.",
      kilder: ["lh-laendesmerter", "rh-uden-udstraaling"],
      status: "UDKAST"
    },
    {
      id: "beh-medicin-akut",
      tekst:
        "Nyopståede lænderygsmerter: paracetamol og NSAID, hvis der ikke er kontraindikationer. Opioider kun efter nøje overvejelse; svage opioider kun ved kontraindikation for eller manglende effekt af NSAID. Anvend ikke SSRI, TCA eller neuroleptika. Kroniske lændesmerter: medicin bør kun spille en mindre rolle; anvend ikke opioider.",
      gaelderFor: ["diff-uspecifik"],
      notat: "Paracetamol og NSAID efter behov.",
      kilder: ["lh-laendesmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-medicin-rod",
      tekst:
        "Lumbal rodaffektion: paracetamol 1 g × 4 dagligt alene eller med NSAID (fx ibuprofen 400–600 mg × 3 dagligt i perioder på 1–2 uger, hvis det tåles). Opioider kun kortvarigt ved meget stærke smerter. Ved neuropatiske smerter evt. gabapentin eller pregabalin.",
      gaelderFor: ["diff-rod"],
      notat: "Paracetamol, evt. med NSAID i 1–2 uger.",
      kilder: ["lh-rodaffektion"],
      status: "UDKAST"
    },
    {
      id: "beh-manuel-traening",
      tekst:
        "Overvej manuel ledmobilisering og superviseret fysisk træning i tillæg til vanlig behandling ved nyopståede lænderygsmerter (NKR, gengivet i Lægehåndbogen). Træning har ikke bedre effekt end andre tiltag i akutfasen (0–4 uger), men anbefales ved langvarige gener og for at forebygge recidiv.",
      gaelderFor: ["diff-uspecifik"],
      notat: "Henvist til fysioterapeut/kiropraktor mhp. træning og evt. manuel behandling.",
      kilder: ["lh-laendesmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-rod-traening",
      tekst:
        "Lumbal rodaffektion: let aktivitet frem for sengeleje; superviseret øvelsesterapi, evt. retningsspecifikke øvelser eller neuromuskulær træning, og manuel ledmobilisering i tillæg til vanlig behandling. Ikke-kirurgisk behandling bør afprøves før kirurgisk vurdering, medmindre der er vedvarende meget stærke smerter, svære pareser eller cauda equina. Akupunktur har ingen dokumenteret effekt.",
      gaelderFor: ["diff-rod"],
      notat: "Rådgivet om let aktivitet. Henvist til superviseret øvelsesterapi.",
      kilder: ["lh-rodaffektion"],
      status: "UDKAST"
    },
    {
      id: "beh-ikke-anbefalet",
      tekst:
        "Anbefales ikke: traktion, TENS, ultralydsbehandling, korset/rygstøtte. Ikke-dansk kilde: Lægehåndbogen bygger her på NICE guideline 2016 (ikke læst direkte); ingen dansk kilde fundet. Akupunktur: se konflikt.",
      gaelderFor: ["diff-uspecifik", "diff-rod"],
      notat: "Ikke indikation for traktion, TENS eller korset.",
      kilder: ["lh-laendesmerter"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Akupunktur: NKR (gengivet i Lægehåndbogen) – tilbyd kun efter nøje overvejelse, da den gavnlige effekt er usikker. NICE (gengivet i Lægehåndbogen, ikke-dansk) – frarådes. NICE-dokumentet er ikke læst direkte.",
        kilder: ["lh-laendesmerter"]
      }
    },
    {
      id: "beh-billed",
      tekst:
        "Ingen rutinemæssig røntgen eller MR ved nyopståede lænderygsmerter eller initialt ved nerverodsaffektion uden røde flag; degenerative fund korrelerer dårligt med symptomer. Røntgen ved traume med frakturmistanke, spondylolistese, skoliose; ikke ved recidiv, hvis der findes røntgen under 5 år gammel. Røntgen er ikke tilstrækkeligt ved mistanke om metastaser, prolaps, spinalstenose eller spondylodiscitis.",
      notat: "Ikke indikation for billeddiagnostik aktuelt.",
      kilder: ["lh-laendesmerter", "rh-billed", "lh-rodaffektion"],
      status: "UDKAST"
    },
    {
      id: "beh-blodprover",
      tekst:
        "Ved usikkerhed om underliggende sygdom: Hb, leukocytter med differentialtælling, SR, CRP. Ved langvarige eller recidiverende gener: HLA-B27; overvej basisk fosfatase, calcium, fosfat, PSA.",
      notat: "Blodprøver taget mhp. underliggende sygdom.",
      kilder: ["lh-laendesmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-stenose",
      tekst:
        "Spinalstenose: nedsæt smerteprovokerende aktiviteter og erstat med anden aktivitet; paracetamol, evt. NSAID kortvarigt; medicin mod neuropatiske smerter kun efter nøje overvejelse. Aktive øvelser individuelt eller på hold; kiropraktor i pakkeforløb.",
      gaelderFor: ["diff-stenose"],
      notat: "Rådgivet om aktivitetstilpasning og aktive øvelser.",
      kilder: ["lh-spinalstenose"],
      status: "UDKAST"
    },
    {
      id: "beh-spa",
      tekst: "Sandsynliggjort spondylartrit: NSAID og evt. fysioterapi kan iværksættes forud for henvisning til reumatolog.",
      gaelderFor: ["diff-spa"],
      notat: "NSAID-behandlingsforsøg forud for henvisning.",
      kilder: ["rh-spondylartrit"],
      status: "UDKAST"
    },
    {
      id: "beh-langvarig",
      tekst:
        "Langvarige gener: genvurder efter 1–2 uger, identificér gule flag og komorbiditet tidligt. Tilrettelæg arbejdssituationen i samarbejde med arbejdsgiver. Sekundærforebyggende træning. Tværfaglige teams ved varighed over 4–8 uger.",
      notat: "Gule flag drøftet. Plan for arbejdsfastholdelse og træning.",
      kilder: ["lh-laendesmerter"],
      status: "UDKAST"
    }
  ],

  henvisning: [
    {
      id: "hen-cauda",
      til: "Akut indlæggelse via CVI",
      kriterier:
        "Sikre symptomer og fund på cauda equina, betydelig parese nyopstået inden for 2 uger og/eller progredierende parese (grad 3 eller mindre). Akutmodtagelsen i planområdet; ved tværsnitssyndrom på malign eller traumatisk basis Rigshospitalet, Traumecentret.",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist akut via CVI mhp. cauda equina / betydende parese.",
      kilder: ["rh-cauda", "lh-rodaffektion"],
      status: "UDKAST"
    },
    {
      id: "hen-hotline",
      til: "Reumatologisk hotline",
      kriterier:
        "Tvivlstilfælde ved mulig cauda equina eller parese, og meget svære smerter i kort tid: drøft i dagtid med reumatologisk funktion. Ryg (degenerativ, hele regionen): Rigshospitalet, Valdemar Hansens Vej, hotline kl. 08–15: 38 63 42 47. Rygkirurgisk bagvagt (Rigshospitalet, Valdemar Hansens Vej): 38 63 04 80.",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      notat: "Drøftet med reumatologisk hotline.",
      kilder: ["rh-visitation-reumatologi", "rh-cauda"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Forløbsbeskrivelsen for cauda equina (februar 2025) angiver de lokale reumatologiske funktioner med Frederiksberg 3816 4049 for Midt og vagthavende VRR 3863 3863 uden for dagtid. Visitationsmeddelelsen for reumatologi (september 2025, nyest) angiver, at degenerativ ryg er samlet på Rigshospitalet, Valdemar Hansens Vej (38 63 42 47), og Frederiksberg-hotlinen som 38 16 41 90. Nummeret 3816 4049 er ikke fundet i andre kilder. Teksten følger visitationsmeddelelsen (beslutning truffet af Claude 2026-11-15 efter lægens anmodning).",
        kilder: ["rh-cauda", "rh-visitation-reumatologi"]
      }
    },
    {
      // 2026-11-16: delt i infektion (akut) og malignitet (pakkeforløb) efter lægens afgørelse.
      id: "hen-infektion",
      til: "Akutmodtagelse",
      kriterier:
        "Mistanke om infektion (obs. spondylodiscitis): indlægges på lokal akutmodtagelse (Region Hovedstaden). Patienten skal udredes via specialafdeling.",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist akut mhp. udredning for infektion.",
      kilder: ["rh-uden-udstraaling", "rh-billed", "lh-laendesmerter"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Region Hovedstaden (lænderygsmerter uden udstråling, 2025): \"Infektion eller malignitet: Indlægges på lokal akutmodtagelse.\" Lægehåndbogen (lændesmerter, 2024): \"Ved mistanke om infektion henvises til medicinsk eller rygkirurgisk afdeling.\"",
        kilder: ["rh-uden-udstraaling", "lh-laendesmerter"]
      }
    },
    {
      id: "hen-malignitet",
      til: "Pakkeforløb",
      kriterier:
        "Mistanke om malignitet (cancer/metastaser): udredning i pakkeforløb. Tegn på tværsnitssyndrom eller betydende nyopstået parese: se det røde flag om cauda equina (akut).",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist i pakkeforløb mhp. udredning for malignitet.",
      kilder: ["rh-billed", "lh-laendesmerter"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Region Hovedstaden (billeddiagnostik af columna, 2025): \"Ved mistanke om cancer/metastaser bør udredning foregå i pakkeforløb.\" Lægehåndbogen (lændesmerter, 2024): \"Ved mistanke om malignitet henvises i pakkeforløb.\" Men Region Hovedstaden (lænderygsmerter uden udstråling, 2025): \"Infektion eller malignitet: Indlægges på lokal akutmodtagelse.\" Sundhedsstyrelsens pakkeforløbsbeskrivelse kunne ikke åbnes (sst.dk blokeret) og er ikke brugt.",
        kilder: ["rh-billed", "lh-laendesmerter", "rh-uden-udstraaling"]
      }
    },
    {
      id: "hen-fraktur",
      til: "Rygsektionen, Rigshospitalet (konference) / Akut Modtagelse",
      kriterier:
        "Mistanke om instabil fraktur: konferer med vagthavende på Rygsektionen. Osteoporotisk eller traumatisk sammenfald med akutte svære smerter: evt. indlæggelse på Akut Modtagelse.",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Konfereret mhp. mulig columnafraktur.",
      kilder: ["rh-uden-udstraaling"],
      status: "UDKAST"
    },
    {
      id: "hen-fys",
      til: "Fysioterapeut eller kiropraktor",
      kriterier:
        "Lumbal rodaffektion inden for de første 12 uger: rådgivning om adfærd, fysisk aktivitet, øvelsesterapi og evt. manuel behandling (evt. pakkeforløb).",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til fysioterapeut/kiropraktor.",
      kilder: ["lh-rodaffektion"],
      status: "UDKAST"
    },
    {
      id: "hen-mr",
      til: "MR af columna lumbalis (fra almen praksis)",
      kriterier:
        "Rodpåvirkning uden tilfredsstillende fremgang efter 8 ugers konservativ behandling; mistanke om diskusprolaps, spinalstenose eller spredning af kendt malign lidelse. Afklar først, om patienten er potentiel operationskandidat (MR skal være under 1 år gammel ved rygkirurgisk vurdering). Dynamisk henvisning \"MR henvisning i Region Hovedstaden\", sendes som REF 02 til radiologisk afdeling. MR af columna thoracalis kan ikke henvises fra almen praksis.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til MR af columna lumbalis.",
      kilder: ["rh-billed"],
      status: "UDKAST"
    },
    {
      id: "hen-rod-kirurgi",
      til: "Rygkirurgisk vurdering",
      kriterier: "Lumbal rodaffektion uden klar bedring på ikke-kirurgisk behandling. Akut kirurgisk vurdering ved svær og/eller progredierende parese og sfinkterforstyrrelser.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til rygkirurgisk vurdering mhp. lumbal rodaffektion.",
      kilder: ["lh-rodaffektion"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogens side om lumbal rodaffektion (2026) angiver tre forskellige tidsrammer: resuméet siger \"ikke klar bedring inden for 8 uger\", henvisningsafsnittet siger \"inden for 12 uger\", og kirurgiafsnittet siger \"efter 8–12 uger\". Region Hovedstaden: efter 8 uger uden fremgang kan MR bestilles fra almen praksis.",
        kilder: ["lh-rodaffektion", "rh-billed"]
      }
    },
    {
      id: "hen-reumatologi",
      til: "Reumatologisk rygfunktion, Rigshospitalet, Valdemar Hansens Vej (elektiv)",
      kriterier:
        "Siden 1.1.2025 sendes alle elektive henvisninger med degenerativ rygsygdom fra hele regionen til visitationen på Rigshospitalet, Valdemar Hansens Vej. Svære uspecifikke lænderygsmerter i mere end 8 uger og under 6 måneder uden tilfredsstillende fremgang. Over 60 år: røntgen af columna lumbalis skal foreligge. Kroniske symptomer (over 6 måneder): kun hvis operation skønnes relevant og ønskes, og der foreligger MR efter symptomdebut og inden for det sidste år.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist elektivt til reumatologisk rygfunktion, Rigshospitalet.",
      kilder: ["rh-uden-udstraaling", "rh-visitation-reumatologi"],
      status: "UDKAST"
    },
    {
      id: "hen-stenose",
      til: "Lokal neurologisk eller rygmedicinsk afdeling",
      kriterier: "Mistanke om spinalstenose med manglende bedring på konservativ behandling, udtalte gener og behandlingsønske. Akut ved betydelig parese, myelopati eller cauda equina.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist mhp. spinalstenose.",
      kilder: ["lh-spinalstenose"],
      status: "UDKAST"
    },
    {
      id: "hen-spa",
      til: "Reumatolog (hospital eller speciallægepraksis)",
      kriterier:
        "Rygsmerter i mere end 3 måneder, debut før 45 år, og ét eller flere spondylartrit-kendetegn. Henvisningen bør omfatte ryganamnese, familieanamnese, fund, parakliniske fund og NSAID-behandlingsforsøg. Planområde Midt, Byen og Bornholm: Frederiksberg Hospital; Nord og Syd: Rigshospitalet, Valdemar Hansens Vej.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til reumatolog mhp. spondylartrit.",
      kilder: ["rh-spondylartrit", "rh-visitation-reumatologi"],
      status: "UDKAST"
    },
    {
      id: "hen-recidiv",
      til: "Rygkirurgisk funktion, Glostrup",
      kriterier: "Recidiv inden for 3 måneder efter lumbal prolaps- eller stenoseoperation (ved recidiv efter instrumenteret dese: inden for 2 år).",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til rygkirurgisk funktion mhp. recidiv efter operation.",
      kilder: ["rh-uden-udstraaling"],
      status: "UDKAST"
    }
  ]
};
