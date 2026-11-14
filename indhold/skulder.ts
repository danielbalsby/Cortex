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
      sidstTjekket: "2026-11-14"
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
    {
      id: "rh-monoartrit",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Akut monoartritis",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/akut-monoartritis/",
      sidstTjekket: "2026-11-14"
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
      status: "UDKAST"
    },
    {
      id: "flag-fraktur",
      tekst:
        "Brud eller seneruptur efter kraftigt traume eller overbelastning: bevægeindskrænkning, fejlstilling, hævelse, misfarvning, eller betydelig kraftnedsættelse med kun lette til moderate smerter ved isometrisk test.",
      handling: "Røntgen af skulder ved traume med mistanke om fraktur eller luksation.",
      fremhaevHvis: [[{ felt: "debut", er: "traume" }, { felt: "fejlstilling", er: "ja" }]],
      kilder: ["lh-skuldersmerter", "rh-skulder-billed"],
      status: "UDKAST"
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
      status: "UDKAST"
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
      status: "UDKAST"
    },
    {
      id: "flag-faldgruber",
      tekst:
        "Diagnostiske faldgruber: thoracic outlet syndrom, radikulopati, leukæmi, sarkom, lungetumor (Pancoast). Smerter også i nakke eller skulderbue skal primært give mistanke om cervikal lidelse.",
      handling:
        "Nakkesmerter med udstråling udredes for cervikal patologi. Røntgen af skulder ved mistanke om tumor eller metastase.",
      fremhaevHvis: [[{ felt: "nakke", er: "ja" }]],
      kilder: ["lh-skuldersmerter", "rh-skulder-billed"],
      status: "UDKAST"
    },
    {
      id: "flag-septisk",
      tekst:
        "Septisk artrit: varmt, rødt, betydeligt hævet led, feber eller medtaget almentilstand. Disponerende: diabetes, alkohol- eller i.v.-misbrug, immunsuppression, nylig ledinjektion, alloplastik.",
      handling: "Indlægges akut i ortopædkirurgisk regi via CVI.",
      kilder: ["rh-monoartrit", "lh-skuldersmerter"],
      status: "UDKAST"
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
        "Selvlimiterende over 1–2 år; let at overdiagnosticere"
      ],
      notat: "Foreneligt med kapsulit (frossen skulder).",
      kilder: ["lh-kapsulit", "lh-skuldersmerter"],
      status: "UDKAST"
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
