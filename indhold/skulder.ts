import { RH_MONOARTRIT } from "./faelles";
import type { Region } from "./typer";

// SKULDER
//
// Sådan retter du: se vejledningen øverst i knae.ts – opbygningen er den samme.
//
// Felterne er nye og ikke gennemgået af dig. De følger den kliniske undersøgelse
// i Lægehåndbogen (aktiv/passiv bevægelighed, smertebue, Hawkins/Neer, kraft i
// rotator cuffen, AC-led) og de aldersgrænser, kilderne bruger (40 og 75 år).
//
// Beslutningsstøtten nederst er UDKAST skrevet 2026-11-14 ud fra de anførte
// sider i Lægehåndbogen og Region Hovedstadens forløbsbeskrivelser, som alle er
// læst den dag. Bemærk: Lægehåndbogens oversigt "Skuldersmerter" er fra 2019 og
// den ældste kilde her. SST's nationale kliniske retningslinje for skulderlidelser
// er ikke læst (sst.dk afviste automatisk adgang). Kun du sætter "GODKENDT".

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
          kunTilFlag: true, // bruges til røde flag; alderen står i journalen (review/GODKEND.md D)
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
          id: "fejlstilling",
          label: "Fejlstilling",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Ingen", notat: "Ingen fejlstilling." },
            { id: "ja", label: "Ja", notat: "Fejlstilling eller epauletskulder." }
          ]
        },
        {
          id: "roedme",
          label: "Rødme",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen rødme." },
            { id: "ja", label: "Ja", notat: "Rødme." }
          ]
        },
        {
          id: "varme",
          label: "Varme",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen varmeøgning." },
            { id: "ja", label: "Ja", notat: "Varmeøgning." }
          ]
        },
        {
          id: "axillaris",
          label: "Sens. lateralt (n. ax.)",
          type: "enkelt",
          visHvis: [{ felt: "debut", er: "traume" }],
          valg: [
            { id: "normal", label: "Normal", notat: "Normal sensibilitet lateralt på skulderen." },
            { id: "nedsat", label: "Nedsat", notat: "Nedsat sensibilitet lateralt på skulderen." }
          ]
        },
        {
          id: "aktiv",
          label: "Aktiv bevægelighed",
          type: "enkelt",
          valg: [
            { id: "fuld", label: "Fuld", notat: "Fuld aktiv bevægelighed." },
            { id: "nedsat", label: "Nedsat", notat: "Nedsat aktiv bevægelighed." }
          ]
        },
        {
          id: "passiv",
          label: "Passiv bevægelighed",
          type: "enkelt",
          valg: [
            { id: "fuld", label: "Fuld", notat: "Fuld passiv bevægelighed." },
            { id: "kapsulaer", label: "Nedsat, især udadrot.", notat: "Nedsat passiv bevægelighed, især udadrotation." },
            { id: "nedsat", label: "Nedsat, andet", notat: "Nedsat passiv bevægelighed." }
          ]
        },
        {
          id: "smertebue",
          label: "Smertebue",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Ingen smertebue." },
            { id: "pos", label: "Positiv", notat: "Positiv smertebue." }
          ]
        },
        // 2026-11-24: Hawkins/Neer delt i to felter og flere tests tilføjet til rangering efter likelihood ratio.
        {
          id: "hawkins",
          label: "Hawkins-Kennedy",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Hawkins-Kennedys test negativ." },
            { id: "pos", label: "Positiv", notat: "Hawkins-Kennedys test positiv." }
          ]
        },
        {
          id: "neer",
          label: "Neer",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Neers test negativ." },
            { id: "pos", label: "Positiv", notat: "Neers test positiv." }
          ]
        },
        {
          id: "jobe",
          label: "Jobe/empty can",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Jobes test (empty can) negativ." },
            { id: "pos", label: "Positiv", notat: "Jobes test (empty can) positiv." }
          ]
        },
        {
          id: "kraft",
          label: "Kraft rotator cuff",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal", notat: "Normal kraft i rotator cuffen." },
            { id: "abd", label: "↓ abduktion", notat: "Nedsat kraft ved isometrisk abduktion (supraspinatus)." },
            { id: "udad", label: "↓ udadrot.", notat: "Nedsat kraft ved isometrisk udadrotation (infraspinatus)." },
            { id: "indad", label: "↓ indadrot.", notat: "Nedsat kraft ved isometrisk indadrotation (subscapularis)." },
            { id: "flere", label: "↓ flere planer", notat: "Nedsat kraft i flere planer." }
          ]
        },
        {
          id: "erlag",
          label: "ER lag (arm ved siden)",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Intet udadrotations-lag (ER lag sign negativ)." },
            { id: "pos", label: "Positiv", notat: "Udadrotations-lag (ER lag sign positiv)." }
          ]
        },
        {
          id: "droparm",
          label: "Drop arm",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Drop arm-test negativ." },
            { id: "pos", label: "Positiv", notat: "Drop arm-test positiv." }
          ]
        },
        {
          id: "bellypress",
          label: "Belly press",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Belly press-test negativ." },
            { id: "pos", label: "Positiv", notat: "Belly press-test positiv." }
          ]
        },
        {
          id: "apprehension",
          label: "Apprehension",
          type: "enkelt",
          valg: [
            { id: "neg", label: "Negativ", notat: "Apprehension-test negativ." },
            { id: "pos", label: "Positiv", notat: "Apprehension-test positiv." }
          ]
        },
        {
          id: "relocation",
          label: "Relocation",
          type: "enkelt",
          visHvis: [{ felt: "apprehension", er: "pos" }],
          valg: [
            { id: "neg", label: "Uændret", notat: "Relokationstest negativ (apprehension uændret)." },
            { id: "pos", label: "Lindrer", notat: "Relokationstest positiv (apprehension forsvinder)." }
          ]
        },
        {
          id: "acled",
          label: "AC-led",
          type: "enkelt",
          valg: [
            { id: "uoemt", label: "Uømt, crossover neg.", notat: "AC-leddet uømt, negativ crossover-test." },
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
      felter: ["side", "debut", "traumetype", "varighed", "nat", "luksationer", "nakke", "arbejde", "feber", "anamnese-tekst"]
    },
    {
      overskrift: "O",
      felter: ["fejlstilling", "roedme", "varme", "axillaris", "aktiv", "passiv", "smertebue", "hawkins", "neer", "jobe", "kraft", "erlag", "droparm", "bellypress", "apprehension", "relocation", "acled", "objektivt-tekst"]
    }
  ],

  kilder: [
    {
      id: "lh-skuldersmerter",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Skuldersmerter (symptomer og tegn)",
      aar: 2019,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/symptomer-og-tegn/skuldersmerter/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-subacromielt",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Subacromielt smertesyndrom (impingement)",
      aar: 2021,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/skulder-og-overarm/subacromielt-smertesyndrom/",
      sidstTjekket: "2026-11-24"
    },
    {
      id: "lh-rotatorcuff",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Rotatorcuff-skade",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/skulder-og-overarm/rotatorcuff-skade/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-skulderluksation",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Skulderluksation",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/skulder-og-overarm/skulderluksation/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-kapsulit",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Kapsulit, skulder (frossen skulder)",
      aar: 2024,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/skulder-og-overarm/kapsulit-skulder/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-pmr",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Polymyalgia reumatica",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/reumatologi/tilstande-og-sygdomme/systemiske-inflammationer/polymyalgia-reumatica/",
      sidstTjekket: "2026-11-16"
    },
    {
      id: "lh-ac-artrose",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Acromioclaviculærleddet, artrose",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/skulder-og-overarm/acromioclaviculaerleddet-artrose/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-rotatorcuff",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Rotatorcuff lidelser",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/rotatorcuff/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-skulder-billed",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Skulder, billeddiagnostik af",
      aar: 2024,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/a-alment-og-uspecificeret/skanning-billeddiagnostik/skulder-billeddiagnostik-af/",
      sidstTjekket: "2026-11-14"
    },
    RH_MONOARTRIT,
    // Likelihood ratios til rangering (læst 2026-11-24). Ikke-danske; ingen af dem fra almen praksis.
    {
      id: "zhao-2024-skulder",
      udgiver: "BMC Musculoskelet Disord",
      dansk: false,
      titel: "Zhao Q m.fl. Evidence-based approach to the shoulder examination for subacromial bursitis and rotator cuff tears: a systematic review and meta-analysis (fuld tekst læst, tabel 2 og 3)",
      aar: 2024,
      url: "https://doi.org/10.1186/s12891-024-08144-z",
      sidstTjekket: "2026-11-24"
    },
    {
      id: "hermans-2013-cuff",
      udgiver: "JAMA (Rational Clinical Examination)",
      dansk: false,
      titel: "Hermans J m.fl. Does this patient with shoulder pain have rotator cuff disease? (kun resumé læst)",
      aar: 2013,
      url: "https://doi.org/10.1001/jama.2013.276187",
      sidstTjekket: "2026-11-24"
    },
    {
      id: "luime-2004-instabilitet",
      udgiver: "JAMA (Rational Clinical Examination)",
      dansk: false,
      titel: "Luime JJ m.fl. Does this patient have an instability of the shoulder or a labrum lesion? (kun resumé læst)",
      aar: 2004,
      url: "https://doi.org/10.1001/jama.292.16.1989",
      sidstTjekket: "2026-11-24"
    },
    {
      id: "laedermann-2021-subscapularis",
      udgiver: "Orthop J Sports Med",
      dansk: false,
      titel: "Lädermann A m.fl. Diagnostic Accuracy of Clinical Tests for Subscapularis Tears: A Systematic Review and Meta-analysis (fuld tekst læst)",
      aar: 2021,
      url: "https://doi.org/10.1177/23259671211042011",
      sidstTjekket: "2026-11-24"
    }
  ],

  roedeFlag: [
    {
      id: "flag-luksation",
      tekst:
        "Akut skulderluksation: armen immobiliseres, skulderen kan hverken bevæges aktivt eller passivt. Anterior: indhug i skulderbuen (epauletskulder), caput palpabelt fortil. Posterior: let at overse, armen ofte låst i indadrotation. N. axillaris undersøges (sensibilitet lateralt på skulderen).",
      handling:
        "Henvises til hospital. Reponer ikke i almen praksis før røntgen, som stiller diagnosen og udelukker fraktur (især hos ældre: proksimal humerusfraktur).",
      fremhaevHvis: [
        [{ felt: "traumetype", er: "luksation" }],
        [{ felt: "fejlstilling", er: "ja" }],
        [{ felt: "axillaris", er: "nedsat" }]
      ],
      kilder: ["lh-skulderluksation"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-fraktur",
      tekst:
        "Brud eller seneruptur efter kraftigt traume eller overbelastning: bevægeindskrænkning, fejlstilling, hævelse, misfarvning, eller betydelig kraftnedsættelse med kun lette til moderate smerter ved isometrisk test.",
      handling: "Røntgen af skulder ved traume med mistanke om fraktur eller luksation.",
      fremhaevHvis: [[{ felt: "debut", er: "traume" }, { felt: "fejlstilling", er: "ja" }]],
      kilder: ["lh-skuldersmerter", "rh-skulder-billed"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-traumatisk-cuff",
      tekst:
        "Traumatisk rotator cuff-ruptur (tidskritisk): relevant traume og nedsat kraft i et eller flere planer, ofte nedsat aktiv bevægelighed. Hos patienter over 40 år giver traume oftere rifter i rotator cuffen. Operation bør ske inden 3 måneder fra traumet.",
      handling:
        "Røntgen (fraktur udelukkes), hurtig ultralyd og henvisning til ortopædkirurgisk afdeling ved påvist gennemgående eller total læsion – se henvisning.",
      fremhaevHvis: [
        [{ felt: "debut", er: "traume" }, { felt: "kraft", er: "abd" }],
        [{ felt: "debut", er: "traume" }, { felt: "kraft", er: "udad" }],
        [{ felt: "debut", er: "traume" }, { felt: "kraft", er: "indad" }],
        [{ felt: "debut", er: "traume" }, { felt: "kraft", er: "flere" }]
      ],
      kilder: ["rh-rotatorcuff", "lh-rotatorcuff", "lh-skuldersmerter"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-cuff-efter-luksation",
      tekst:
        "Over 40 år efter skulderluksation: øget risiko for rotator cuff-skade. Nedsat styrke i rotator cuffen 2–4 uger efter luksationen.",
      handling: "Udredes med ultralyd eller hos ortopædkirurg.",
      fremhaevHvis: [
        [{ felt: "traumetype", er: "luksation" }, { felt: "alder", er: "40til75" }],
        [{ felt: "traumetype", er: "luksation" }, { felt: "alder", er: "over75" }]
      ],
      kilder: ["lh-skulderluksation"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-faldgruber",
      tekst:
        "Diagnostiske faldgruber: thoracic outlet syndrom, radikulopati, leukæmi, sarkom, lungetumor (Pancoast). Smerter også i nakke eller skulderbue skal primært give mistanke om cervikal lidelse.",
      handling:
        "Nakkesmerter med udstråling udredes for cervikal patologi. Røntgen af skulder ved mistanke om tumor eller metastase.",
      fremhaevHvis: [[{ felt: "nakke", er: "ja" }]],
      kilder: ["lh-skuldersmerter", "rh-skulder-billed"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-septisk",
      tekst:
        "Septisk artrit: varmt, rødt, betydeligt hævet led, feber eller medtaget almentilstand. Disponerende: diabetes, alkohol- eller i.v.-misbrug, immunsuppression, nylig ledinjektion, alloplastik.",
      handling: "Indlægges akut i ortopædkirurgisk regi via CVI.",
      // 2026-11-16 (review/GODKEND.md C1): fremhæves som knæets flag om bakteriel artrit.
      fremhaevHvis: [[{ felt: "feber", er: "ja" }], [{ felt: "roedme", er: "ja" }], [{ felt: "varme", er: "ja" }]],
      kilder: ["rh-monoartrit", "lh-skuldersmerter"],
      // 2026-11-16: betingelsen blev ændret på generel tilladelse → UDKAST. Godkendt af lægen enkeltvis 2026-11-16.
      status: "GODKENDT",
      godkendtDato: "2026-11-16"
    }
  ],

  differentialdiagnoser: [
    {
      id: "diff-impingement",
      navn: "Subacromielt smertesyndrom / rotator cuff-tendinopati (impingement)",
      kendetegn: [
        "Hyppigste årsag; oftest supraspinatus",
        "Positiv smertebue (hovedkriterium); positiv Hawkins/Neer",
        "Oftest normal passiv bevægelighed og normal kraft, evt. efter smertelindring",
        "Natlige smerter ved liggen på skulderen; udstråling til C5-dermatomet",
        "Arbejde og idræt over skulderhøjde disponerer"
      ],
      notat: "Foreneligt med subacromielt smertesyndrom.",
      kilder: ["lh-subacromielt", "lh-skuldersmerter", "rh-rotatorcuff"],
      // Likelihood ratios (læst 2026-11-24, Zhao 2024 tabel 3). Testene måler det samme: kun den stærkeste i klyngen tæller.
      fund: [
        { hvis: [{ felt: "smertebue", er: "pos" }], lr: 1.57, kilder: ["zhao-2024-skulder"], klynge: "sis-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: subakromielt smertesyndrom" },
        { hvis: [{ felt: "smertebue", er: "neg" }], lr: 0.63, kilder: ["zhao-2024-skulder"], klynge: "sis-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: subakromielt smertesyndrom" },
        { hvis: [{ felt: "hawkins", er: "pos" }], lr: 1.64, kilder: ["zhao-2024-skulder"], klynge: "sis-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: subakromielt smertesyndrom" },
        { hvis: [{ felt: "hawkins", er: "neg" }], lr: 0.53, kilder: ["zhao-2024-skulder"], klynge: "sis-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: subakromielt smertesyndrom" },
        { hvis: [{ felt: "neer", er: "pos" }], lr: 1.54, kilder: ["zhao-2024-skulder"], klynge: "sis-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: subakromielt smertesyndrom" },
        { hvis: [{ felt: "neer", er: "neg" }], lr: 0.47, kilder: ["zhao-2024-skulder"], klynge: "sis-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: subakromielt smertesyndrom" }
      ],
      konflikt: {
        beskrivelse:
          "Smertebue: Zhao 2024 (metaanalyse, 6 studier, subakromielt smertesyndrom) LR+ 1,57 / LR− 0,63; Hermans 2013 (JAMA, kun studier af høj kvalitet, rotator cuff-sygdom; kun resumé læst) LR+ 3,7 / LR− 0,36. Ingen af dem er fra almen praksis. Rangeringen bruger Zhao (nyeste og største, samme opgørelse som Hawkins og Neer). Lægehåndbogen (Subacromielt smertesyndrom, 2021) kalder smertebuen hovedkriteriet; den angiver ingen tal.",
        kilder: ["zhao-2024-skulder", "hermans-2013-cuff", "lh-subacromielt"]
      },
      status: "UDKAST"
    },
    {
      id: "diff-bursit",
      navn: "Akut bursit (evt. bursitis calcarea)",
      kendetegn: [
        "Meget akut indsættende smerter, der hindrer nattesøvn",
        "Stærke smerter ved aktiv og passiv elevation og passiv abduktion; ikke-kapsulært mønster",
        "Kalk kan ses på røntgen; akut bursit helbredes spontant inden 6 uger"
      ],
      notat: "Foreneligt med akut subacromiel bursit.",
      kilder: ["lh-skuldersmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-kapsulit",
      navn: "Kapsulit (frossen skulder)",
      kendetegn: [
        "Svære smerter dag og nat uden udløsende årsag; efter et par måneder stivhed",
        "Nedsat aktiv og passiv bevægelighed, særligt udadrotation (kapsulært mønster)",
        "Normal kraft inden for bevægeudslaget; isometrisk test giver ikke væsentlig smerteforværring",
        "Selvlimiterende; varer cirka 1–3 år; let at overdiagnosticere"
      ],
      notat: "Foreneligt med kapsulit (frossen skulder).",
      kilder: ["lh-kapsulit", "lh-skuldersmerter"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Varighed: Lægehåndbogen, Kapsulit (2024) skriver cirka 1–3 år; Lægehåndbogen, Skuldersmerter (2019) skriver, at kapsulit helbredes spontant i løbet af 1–2 år. Teksten følger den nyeste side.",
        kilder: ["lh-kapsulit", "lh-skuldersmerter"]
      }
    },
    {
      id: "diff-traumatisk-cuff",
      navn: "Traumatisk rotator cuff-ruptur",
      kendetegn: [
        "Relevant traume (fx fald på skulderen); oftere over 40 år",
        "Nedsat kraft svarende til den skadede sene; aktiv bevægelighed nedsat, passiv normal",
        "Smerter kan give falsk kraftnedsættelse: se an ca. 1 uge og gentag kraftundersøgelsen"
      ],
      notat: "Traumatisk rotator cuff-ruptur mistænkes.",
      kilder: ["rh-rotatorcuff", "lh-rotatorcuff"],
      // Likelihood ratios (læst 2026-11-24, Zhao 2024 tabel 2, rotator cuff-ruptur). Testene skelner ikke traumatisk fra degenerativ;
      // her tæller de kun ved debut efter traume (kendetegnet "relevant traume", Region H og LH).
      fund: [
        { hvis: [{ felt: "debut", er: "traume" }, { felt: "erlag", er: "pos" }], lr: 2.8, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "debut", er: "traume" }, { felt: "erlag", er: "neg" }], lr: 0.78, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "debut", er: "traume" }, { felt: "jobe", er: "pos" }], lr: 1.58, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "debut", er: "traume" }, { felt: "jobe", er: "neg" }], lr: 0.52, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "debut", er: "traume" }, { felt: "hawkins", er: "pos" }], lr: 1.44, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "debut", er: "traume" }, { felt: "hawkins", er: "neg" }], lr: 0.56, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" }
      ],
      konflikt: {
        beskrivelse:
          "Kilderne er uenige om testenes styrke, og ingen af dem er fra almen praksis. Zhao 2024 (metaanalyse, 20 studier, rotator cuff-ruptur): ER lag ved 0° LR+ 2,80 / LR− 0,78, ER lag ved 90° LR+ 6,91, drop arm ikke signifikant (LR+ 1,97 / LR− 1,24). Hermans 2013 (JAMA, kun studier af høj kvalitet; kun resumé læst): ER lag LR 7,2 og IR lag LR 5,6 for fuldtykkelsesruptur, drop arm LR 3,3 for rotator cuff-sygdom; abduktionsvinklen for ER lag fremgår ikke af resuméet. Rangeringen bruger Zhao (ER lag med armen ved siden, Jobe, Hawkins). Drop arm og belly press har ingen LR i Cortex: drop arm pga. konflikten, belly press fordi Lädermann 2021 kun angiver samlet specificitet (> 0,90) i teksten.",
        kilder: ["zhao-2024-skulder", "hermans-2013-cuff", "laedermann-2021-subscapularis"]
      },
      status: "UDKAST"
    },
    {
      id: "diff-degenerativ-cuff",
      navn: "Degenerativ (ikke-traumatisk) rotator cuff-skade",
      kendetegn: [
        "Gradvis debut, ofte over 40 år, gentagne belastninger eller tidligere injektioner",
        "Smerter med udstråling til overarmen ved abduktion og fleksion; positive impingementtests",
        "Evt. nedsat kraft og atrofi af supra-/infraspinatus (prominerende spina scapulae)"
      ],
      notat: "Foreneligt med degenerativ rotator cuff-lidelse.",
      kilder: ["lh-rotatorcuff", "rh-rotatorcuff", "lh-skuldersmerter"],
      // Likelihood ratios (læst 2026-11-24, Zhao 2024 tabel 2, rotator cuff-ruptur). Samme tal som traumatisk ruptur; ved traume står traumatisk først (filens rækkefølge).
      fund: [
        { hvis: [{ felt: "erlag", er: "pos" }], lr: 2.8, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "erlag", er: "neg" }], lr: 0.78, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "jobe", er: "pos" }], lr: 1.58, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "jobe", er: "neg" }], lr: 0.52, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "hawkins", er: "pos" }], lr: 1.44, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" },
        { hvis: [{ felt: "hawkins", er: "neg" }], lr: 0.56, kilder: ["zhao-2024-skulder"], klynge: "cuff-test", population: "specialiserede skulder- og ortopædklinikker, ikke almen praksis (metaanalyse, 20 studier, n=3438, lav evidenskvalitet); målsygdom: rotator cuff-ruptur" }
      ],
      konflikt: {
        beskrivelse:
          "Kilderne er uenige om testenes styrke, og ingen af dem er fra almen praksis. Zhao 2024 (metaanalyse, 20 studier, rotator cuff-ruptur): ER lag ved 0° LR+ 2,80 / LR− 0,78, ER lag ved 90° LR+ 6,91, drop arm ikke signifikant (LR+ 1,97 / LR− 1,24). Hermans 2013 (JAMA, kun studier af høj kvalitet; kun resumé læst): ER lag LR 7,2 og IR lag LR 5,6 for fuldtykkelsesruptur, drop arm LR 3,3 for rotator cuff-sygdom; abduktionsvinklen for ER lag fremgår ikke af resuméet. Rangeringen bruger Zhao (ER lag med armen ved siden, Jobe, Hawkins). Drop arm og belly press har ingen LR i Cortex: drop arm pga. konflikten, belly press fordi Lädermann 2021 kun angiver samlet specificitet (> 0,90) i teksten.",
        kilder: ["zhao-2024-skulder", "hermans-2013-cuff", "laedermann-2021-subscapularis"]
      },
      status: "UDKAST"
    },
    {
      id: "diff-instabilitet",
      navn: "Skulderluksation / posttraumatisk instabilitet",
      kendetegn: [
        "Under 40 år giver traume oftere luksation",
        "Tidligere luksation; øget forreste skuffe, positiv apprehension- og relokationstest",
        "Afrivning af labrum og glenohumerale ligamenter i over 80 % af tilfældene"
      ],
      notat: "Foreneligt med glenohumeral instabilitet.",
      kilder: ["lh-skuldersmerter", "lh-skulderluksation"],
      // Likelihood ratio (læst 2026-11-24, kun resumé). Apprehension alene har ingen LR: Luime 2004 kalder den "less useful" uden tal i resuméet.
      fund: [
        { hvis: [{ felt: "relocation", er: "pos" }], lr: 6.5, kilder: ["luime-2004-instabilitet"], klynge: "instabilitet-test", population: "ortopædisk praksis, udvalgte populationer, enkeltstudie (systematisk review; ingen studier fra almen praksis)" }
      ],
      status: "UDKAST"
    },
    {
      id: "diff-ac",
      navn: "AC-ledslidelse (artrose, artrit, ledbåndsskade)",
      kendetegn: [
        "Smerter over AC-leddet med udstråling til nakke-skulderbuen (C4)",
        "Positiv crossover-test (horisontal adduktion); ømhed mest udtalt posteriort på leddet",
        "Radiologisk AC-artrose ses hos flertallet over 40–50 år – vurder sammenhæng med symptomer"
      ],
      notat: "Foreneligt med AC-ledslidelse.",
      kilder: ["lh-ac-artrose", "lh-skuldersmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-gh-artrose",
      navn: "Artrose i glenohumeralleddet",
      kendetegn: [
        "Både aktiv og passiv bevægelighed nedsat (stivhed) gør artrose eller frossen skulder mere sandsynlig end cuff-skade",
        "Kan ses på røntgen"
      ],
      notat: "Glenohumeral artrose overvejes.",
      kilder: ["lh-rotatorcuff", "lh-skuldersmerter", "rh-skulder-billed"],
      status: "UDKAST"
    },
    {
      id: "diff-cervikal",
      navn: "Cervikal lidelse / radikulopati",
      kendetegn: [
        "Smerter også i nakke eller skulderbue; udstråling og evt. paræstesier",
        "Forekommer ofte samtidig med rotator cuff-lidelse"
      ],
      notat: "Cervikal årsag overvejes.",
      kilder: ["lh-skuldersmerter", "rh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "diff-suprascapularis",
      navn: "Indklemning af n. suprascapularis",
      kendetegn: [
        "Idrætsudøvere (fx volleyball, svømning, kast, tennis)",
        "Nedsat kraft i infraspinatus, evt. supraspinatus, og smerter bagtil; evt. atrofi"
      ],
      notat: "Indklemning af n. suprascapularis overvejes.",
      kilder: ["lh-skuldersmerter"],
      status: "UDKAST"
    },
    // 2026-11-16: manglende indhold fra review (UDKAST til lægens godkendelse).
    {
      id: "diff-pmr",
      navn: "Polymyalgia rheumatica",
      kendetegn: [
        "Ses hos personer ældre end 50 år",
        "Smerter og stivhed i muskulaturen omkring begge skuldre, evt. også hofterne; udtalt morgenstivhed",
        "Kan ikke løfte armene over vandret – kan det gøres uden besvær, har patienten næppe polymyalgi",
        "Udelukkelsesdiagnose; forhøjet akutfaserespons indgår i klassifikationskriterierne"
      ],
      notat: "Polymyalgia rheumatica overvejes.",
      kilder: ["lh-pmr"],
      status: "UDKAST"
    },
    {
      id: "diff-henfoert-organ",
      navn: "Henført smerte fra indre organer (hjerte, lunge, lever/galde)",
      kendetegn: ["Nævnt i Lægehåndbogen som differentialdiagnose til subacromielt smertesyndrom: hjerte, lungetumor, lever/galde"],
      notat: "Henført smerte fra indre organer overvejes.",
      kilder: ["lh-subacromielt"],
      status: "UDKAST"
    },
    {
      id: "diff-humerusfraktur",
      navn: "Proksimal humerusfraktur / tuberculum majus-fraktur",
      kendetegn: [
        "Differentialdiagnose til skulderluksation",
        "Hos ældre særligt vigtigt at udelukke før reposition; diagnosen stilles ved røntgen"
      ],
      notat: "Proksimal humerusfraktur overvejes.",
      kilder: ["lh-skulderluksation"],
      status: "UDKAST"
    }
  ],

  behandling: [
    {
      id: "beh-generelt",
      tekst:
        "De fleste skulderlidelser behandles konservativt i almen praksis. Råd om aflastning for at undgå smertefuld aktivitet; sygemelding om nødvendigt. Kontrol og ny undersøgelse efter 1–2 uger, hvis ikke bedre.",
      notat: "Rådgivet om aflastning af smertefuld aktivitet. Kontrol om 1–2 uger ved manglende bedring.",
      kilder: ["lh-skuldersmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-analgetika",
      tekst:
        "Smertestillende afpasses efter behov: paracetamol og/eller NSAID initialt; NSAID i lavest mulige dosis og kortest mulig tid.",
      notat: "Paracetamol, evt. NSAID kortvarigt, efter behov.",
      kilder: ["lh-skuldersmerter", "rh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "beh-traening",
      tekst:
        "Impingement og rotator cuff-lidelse: træning i mindst 3 måneder – holdningskorrektion samt stabiliserende og styrkende øvelser for skulderblad og skulder, som superviseret holdtræning eller vejledt egentræning. Patienten bør bede om en skulderinteresseret fysioterapeut. Langvarig træning har lige så god effekt som operation.",
      gaelderFor: ["diff-impingement", "diff-degenerativ-cuff"],
      // Forslag (læst 2026-11-24, lægens ønske samme dag): LH Subakromielt smertesyndrom (2021): "De bør henvises til fysioterapeutisk træning".
      forslagVed: ["diff-impingement"],
      notat: "Henvist til fysioterapeutisk skuldertræning i mindst 3 måneder.",
      kilder: ["lh-subacromielt", "rh-rotatorcuff", "lh-skuldersmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-subakromiel",
      tekst:
        "Subakromiel glukokortikoid (med lokalanæstesi) som hjælp til at komme i gang med træning – kun sammen med træning. Kan gentages 2–3 gange med 4–8 ugers mellemrum ved effekt. Ingen effekt på forløbet efter 6 måneder. Ved diabetes: overvej effekten på blodsukkeret.",
      gaelderFor: ["diff-impingement", "diff-degenerativ-cuff", "diff-bursit"],
      notat: "Subakromiel glukokortikoidinjektion som supplement til træning.",
      kilder: ["lh-subacromielt", "lh-skuldersmerter", "lh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "beh-ingen-effekt",
      tekst: "Shockwave, laser, ultralydsbehandling og lignende har ingen dokumenteret effekt ved rotator cuff-lidelser.",
      gaelderFor: ["diff-impingement", "diff-degenerativ-cuff"],
      notat: "Ikke indikation for shockwave, laser eller ultralydsbehandling.",
      kilder: ["lh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "beh-kapsulit",
      tekst:
        "Kapsulit: røntgen for at udelukke anden årsag; NSAID/paracetamol; intraartikulær blokade efter behov (kan lindre i 6–12 uger, ændrer ikke forløbet). Armen holdes i bevægelse inden for det smertefrie område. Fysioterapi, udspænding og træning frarådes, så længe der er smerter; udspænding når smerterne er væk.",
      gaelderFor: ["diff-kapsulit"],
      notat: "Smertestillende og bevægelse inden for smertegrænsen. Røntgen af skulder.",
      kilder: ["lh-kapsulit"],
      status: "UDKAST"
    },
    {
      id: "beh-luksation",
      tekst:
        "Efter reponeret luksation: amslynge 2–3 uger (hospitalets plan), tidlig bevægetræning, derefter skulderstabiliserende øvelser. Råd om at anmelde skaden til ulykkesforsikring.",
      gaelderFor: ["diff-instabilitet"],
      notat: "Bevægetræning og senere stabiliserende øvelser. Rådgivet om anmeldelse til ulykkesforsikring.",
      kilder: ["lh-skulderluksation"],
      status: "UDKAST"
    },
    {
      id: "beh-ac",
      tekst:
        "AC-ledsartrose: aktivitetstilpasning (tunge belastninger med albuerne ind til siden, undgå bænkpres), NSAID evt. som creme, evt. steroidinjektion i leddet. Skulderøvelser hjælper ikke, og fysioterapi anbefales ikke.",
      gaelderFor: ["diff-ac"],
      notat: "Rådgivet om aktivitetstilpasning. NSAID efter behov.",
      kilder: ["lh-ac-artrose"],
      status: "UDKAST"
    },
    {
      id: "beh-roentgen",
      tekst:
        "Billeddiagnostik er almindeligvis ikke indiceret initialt. Røntgen ved traume (fraktur/luksation), mistanke om rotator cuff-ruptur, mistanke om artrose (inkl. AC-led) eller tumor, og ved vedvarende smerter uden effekt af ikke-kirurgisk behandling. Røntgen før henvisning til ortopædkirurgisk vurdering af rotator cuff-skade.",
      notat: "Røntgen af skulder bestilt.",
      kilder: ["lh-skuldersmerter", "rh-skulder-billed", "lh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "beh-arbejde",
      tekst: "Ved arbejdsbetinget belastning: undgå ensidigt arbejde, find bedre arbejdsstilling, tag pauser, øvelser efter instruktion.",
      notat: "Rådgivet om arbejdsstilling, pauser og øvelser.",
      kilder: ["lh-skuldersmerter"],
      status: "UDKAST"
    }
  ],

  henvisning: [
    {
      // Fysioterapi står først i alle regioner: den hyppigste MSK-henvisning (lægens ønske 2026-11-24).
      id: "hen-fys",
      til: "Fysioterapi",
      kriterier:
        "Subakromielt smertesyndrom (impingement): henvis til fysioterapeutisk træning – formaliseret superviseret holdtræning eller vejledt egentræning – i mindst 3 måneder og gerne mere. Steroidinjektion kun samtidig med træning. Kirurgi først efter formaliseret træning uden effekt.",
      hast: "elektiv",
      gyldighed: "national",
      gaelderFor: ["diff-impingement"],
      notat: "Henvist til fysioterapeutisk skuldertræning i mindst 3 måneder.",
      kilder: ["lh-subacromielt"],
      status: "UDKAST"
    },
    {
      id: "hen-luksation-akut",
      til: "Hospital (skadestue)",
      kriterier: "Akut skulderluksation – røntgen og reposition.",
      hast: "akut",
      gyldighed: "national",
      notat: "Henvist akut til hospital mhp. røntgen og reposition.",
      kilder: ["lh-skulderluksation"],
      status: "UDKAST"
    },
    {
      id: "hen-traume-roentgen",
      til: "Røntgen af skulder",
      kriterier: "Relevant traume – for at afklare fraktur (og luksation).",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Røntgen af skulder efter traume.",
      kilder: ["lh-rotatorcuff", "rh-skulder-billed"],
      status: "UDKAST"
    },
    {
      id: "hen-ul",
      til: "Ultralydsscanning af skulder",
      kriterier:
        "Mistanke om traumatisk seneruptur (rotator cuff eller lange bicepssene), degenerative forandringer i rotator cuffen eller bicepssenen, subacromial bursitis, impingement. Ikke egnet til intraartikulære forhold. MR kan kun henvises af ortopædkirurger i Region Hovedstaden.",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til ultralydsscanning af skulder.",
      kilder: ["rh-skulder-billed"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogens oversigt (2019): det anses for god praksis at bruge MR i udredningen, medmindre man har særlig rutine i ultralyd. Region Hovedstaden (2024): MR af skulder kan kun henvises af ortopædkirurger.",
        kilder: ["lh-skuldersmerter", "rh-skulder-billed"]
      }
    },
    {
      id: "hen-traumatisk-cuff",
      til: "Ortopædkirurgisk afdeling (traumatisk rotator cuff-ruptur)",
      kriterier:
        "Traumatisk gennemgående eller total rotator cuff-ruptur. Diagnosen bør stilles inden for 6 uger og operation udføres inden for 3 måneder efter traumet. Ingen fast aldersgrænse; biologisk alder og genoptræningspotentiale vurderes.",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til ortopædkirurgisk afdeling mhp. traumatisk rotator cuff-ruptur.",
      kilder: ["rh-rotatorcuff", "lh-rotatorcuff"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Region Hovedstaden: kan ses an ca. 1 uge, hvis smerter mistænkes at give kraftnedsættelsen; ultralyd bør indgå hurtigt; henvis inden for 6 uger fra traumet ved påvist læsion. Lægehåndbogen: henvis til ultralyd eller ortopædkirurg, hvis førligheden ikke er genvundet 2–4 uger efter traumet. Lægehåndbogen: patienter over 75 år tilbydes meget sjældent sutur af senerne.",
        kilder: ["rh-rotatorcuff", "lh-rotatorcuff"]
      }
    },
    {
      id: "hen-cuff-efter-luksation",
      til: "Ultralyd eller ortopædkirurg",
      kriterier: "Over 40 år med nedsat styrke i rotator cuffen 2–4 uger efter skulderluksation.",
      hast: "subakut",
      gyldighed: "national",
      notat: "Henvist mhp. udredning for rotator cuff-skade efter luksation.",
      kilder: ["lh-skulderluksation"],
      status: "UDKAST"
    },
    {
      id: "hen-instabilitet",
      til: "Skulderspecialist (ortopædkirurg)",
      kriterier:
        "15–40 år: efter mindst 3 måneders genoptræning ved fortsatte instabilitetssymptomer eller smerter ved aktivitet. Flere luksationer.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til skulderspecialist mhp. instabilitet.",
      kilder: ["lh-skulderluksation"],
      status: "UDKAST"
    },
    {
      id: "hen-impingement",
      til: "Ortopædkirurgisk afdeling (impingement / ikke-traumatisk cuff-lidelse)",
      kriterier:
        "Utilstrækkelig bedring af smerter og funktion efter 3–6 måneders effektiv træning hos fysioterapeut, evt. kombineret med subakromiel glukokortikoid. Røntgen af skulder før henvisning. Henvisningen bør indeholde anamnese, fund, funktionsniveau, undersøgelsesresultater og træningseffekt.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til ortopædkirurgisk vurdering efter forgæves konservativ behandling.",
      kilder: ["rh-rotatorcuff", "lh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "hen-kapsulit",
      til: "Ortopædkirurg",
      kriterier:
        "Kapsulit uden tilstrækkelig effekt af ikke-kirurgisk behandling efter 6 måneder, uholdbar erhvervsmæssig situation, eller tvivl om diagnosen.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurgisk vurdering mhp. kapsulit.",
      kilder: ["lh-kapsulit"],
      status: "UDKAST"
    },
    {
      id: "hen-ac",
      til: "Ortopædkirurg (AC-ledsresektion)",
      kriterier: "Symptomgivende AC-ledsartrose over 6 måneder uden effekt af aktivitetstilpasning, smertestillende og evt. blokade.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurg mhp. AC-ledsartrose.",
      kilder: ["lh-ac-artrose"],
      status: "UDKAST"
    },
    {
      id: "hen-arbejdsmedicin",
      til: "Arbejdsmedicinsk afdeling",
      kriterier:
        "Skulderbelastende arbejde (nu eller tidligere): vurdering af arbejdsmæssig sammenhæng og arbejdsfastholdelse. Gerne før evt. operation; samtidig henvisning til ortopædkirurgi/reumatologi.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til arbejdsmedicinsk afdeling.",
      kilder: ["rh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "hen-idraet",
      til: "Idrætsmedicinsk afdeling",
      kriterier: "Skulderskade opstået ved idræt eller med betydende idrætsmæssig gene.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til idrætsmedicinsk afdeling.",
      kilder: ["rh-rotatorcuff"],
      status: "UDKAST"
    },
    {
      id: "hen-septisk",
      til: "Akut indlæggelse (ortopædkirurgi via CVI)",
      kriterier: "Mistanke om septisk artrit.",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist akut til CVI mhp. septisk artrit.",
      kilder: ["rh-monoartrit"],
      status: "UDKAST"
    }
  ]
};
