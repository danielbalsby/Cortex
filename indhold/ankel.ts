import { RH_MONOARTRIT } from "./faelles";
import type { Region } from "./typer";

// ANKEL
//
// Sådan retter du: se vejledningen øverst i knae.ts – opbygningen er den samme.
//
// Felterne er nye (ikke overført fra den gamle app) og ikke gennemgået af dig.
// De er valgt, så Ottawa-reglerne for ankel og fod kan registreres: knogleømhed
// på malleoler, os naviculare og basis af 5. metatars, samt evnen til at gå fire
// vægtbærende skridt umiddelbart efter skaden og ved undersøgelsen.
//
// Beslutningsstøtten nederst er UDKAST skrevet 2026-11-14 ud fra de anførte
// sider i Lægehåndbogen, som alle er læst den dag. Region Hovedstaden har ingen
// forløbsbeskrivelse for akutte ankelskader hos voksne (kun "Smertefuld fod",
// som handler om børn og unge, 2022). Kun du sætter status: "GODKENDT".

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
          id: "skridt-nu",
          label: "4 skridt nu",
          type: "enkelt",
          valg: [
            { id: "ja", label: "Går", notat: "Går fire vægtbærende skridt ved undersøgelsen." },
            { id: "nej", label: "Kan ikke", notat: "Kan ikke gå fire vægtbærende skridt ved undersøgelsen." }
          ]
        },
        {
          id: "fejlstilling",
          label: "Fejlstilling",
          type: "enkelt",
          valg: [
            { id: "nej", label: "Ingen", notat: "Ingen fejlstilling." },
            { id: "ja", label: "Ja", notat: "Fejlstilling." }
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
          id: "neurovaskulaer",
          label: "Cirk./sens. distalt",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Normal cirk. + sens.", notat: "Normal distal cirkulation og sensibilitet." },
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
            { id: "udtalt", label: "Udtalt", notat: "Udtalt hævelse." }
          ]
        },
        {
          id: "malleol",
          label: "Knogleømhed malleol",
          type: "enkelt",
          valg: [
            { id: "ingen", label: "Ingen", notat: "Ingen knogleømhed over malleolerne." },
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
            { id: "ingen", label: "Ingen (navic. + 5. mt.)", notat: "Ingen knogleømhed over os naviculare eller basis af 5. metatars." },
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
            { id: "uoem", label: "Uøm", notat: "Proksimale fibula uøm." },
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
            { id: "uoem", label: "Uøm, squeeze neg.", notat: "Syndesmosen uøm ved palpation og squeeze-test." },
            { id: "oem", label: "Øm/squeeze +", notat: "Ømhed over syndesmosen eller positiv squeeze-test." }
          ]
        },
        {
          id: "akilles",
          label: "Akillessene",
          type: "enkelt",
          valg: [
            { id: "normal", label: "Intakt, Thompson neg.", notat: "Akillessenen uden defekt; negativ Simmonds-Thompson-test." },
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
      felter: ["side", "mekanisme", "varighed", "skridt-straks", "tidligere", "disposition", "feber", "anamnese-tekst"]
    },
    {
      overskrift: "O",
      felter: [
        "skridt-nu",
        "fejlstilling",
        "roedme",
        "varme",
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

  kilder: [
    {
      id: "lh-ankelsmerter",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Ankelsmerter (symptomer og tegn)",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/symptomer-og-tegn/ankelsmerter/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-ankelskade-akut",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Ankelskade, akut",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/laeg-ankel-og-fod/ankelskade-akut/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-ankelfraktur",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Ankel, frakturer",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knoglebrud/ankel/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-akillesseneruptur",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Akillesseneruptur",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/laeg-ankel-og-fod/akillesseneruptur/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-ankel-ustabil",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Kronisk lateral ankelinstabilitet",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/laeg-ankel-og-fod/ankel-ustabil/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-ankel-brusk",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Ankel, bruskskader",
      aar: 2024,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/laeg-ankel-og-fod/ankel-bruskskader/",
      sidstTjekket: "2026-11-14"
    },
    RH_MONOARTRIT
  ],

  roedeFlag: [
    {
      id: "flag-straks",
      tekst:
        "Truet ben: åben skade med mistanke om dyb skade, fejlstilling med truet hud, kredsløbs- eller nervepåvirkning, eller hurtigt tiltagende, uforholdsmæssigt stærke smerter (mistanke om kompartmentsyndrom).",
      handling:
        "Straks til akut vurdering. Ved åbent brud dækkes såret sterilt, og patienten indlægges akut. Røntgen må ikke forsinke reponering, hvis hud eller kredsløb er truet.",
      fremhaevHvis: [[{ felt: "fejlstilling", er: "ja" }], [{ felt: "neurovaskulaer", er: "paavirket" }]],
      kilder: ["lh-ankelsmerter", "lh-ankelfraktur"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-fraktur",
      tekst:
        "Fraktur (Ottawa-reglerne): røntgen af anklen ved smerter i malleolområdet og knogleømhed over de nederste 6 cm af bagkanten eller spidsen af en malleol, eller manglende evne til at gå fire vægtbærende skridt både umiddelbart efter skaden og ved undersøgelsen. Røntgen af foden ved smerter i mellemfoden og knogleømhed over os naviculare eller basis af 5. metatars, eller samme manglende gangevne. Reglerne gælder voksne og børn fra 5 år, som var normalt gående før skaden og kan undersøges pålideligt.",
      handling:
        "Samme dag til røntgen eller akutmodtagelse. Ved anden klinisk frakturmistanke målrettet røntgen uanset Ottawa-reglerne. Reglerne udelukker ikke alle bagfodsfrakturer, syndesmose- eller seneskader.",
      fremhaevHvis: [
        [{ felt: "malleol", er: "lateral" }],
        [{ felt: "malleol", er: "medial" }],
        [{ felt: "malleol", er: "begge" }],
        [{ felt: "mellemfod", er: "naviculare" }],
        [{ felt: "mellemfod", er: "mt5" }],
        [{ felt: "mellemfod", er: "begge" }],
        [
          { felt: "skridt-straks", er: "nej" },
          { felt: "skridt-nu", er: "nej" }
        ]
      ],
      kilder: ["lh-ankelsmerter", "lh-ankelfraktur"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15",
      konflikt: {
        beskrivelse:
          "Ordlyden af Ottawa-reglerne er forskellig i to sider i Lægehåndbogen. \"Ankelsmerter\" (2026): knogleømhed over de nederste 6 cm af bagkanten eller spidsen af malleolen, og manglende evne til at gå fire vægtbærende skridt både umiddelbart og ved undersøgelsen. \"Ankelskade, akut\" (2025): knogleømhed ved palpation af malleol, og patienten kan ikke støtte på foden hverken umiddelbart eller ved senere undersøgelse. Teksten her følger den nyeste side.",
        kilder: ["lh-ankelsmerter", "lh-ankelskade-akut"]
      }
    },
    {
      id: "flag-akilles",
      tekst:
        "Akillesseneruptur: smæld eller følelse af spark bag på læggen ved afsæt, svækket afsæt, ofte palpabel defekt; positiv Simmonds-Thompson-test. Smerterne kan hurtigt aftage trods komplet ruptur, og bevaret aktiv plantarfleksion eller gangevne udelukker ikke ruptur.",
      handling:
        "Samme dag til skadestue/ortopædkirurgisk afdeling. Anklen holdes plantarflekteret i en egnet skinne; undgå dorsalfleksion og belastning indtil vurderingen. Ultralyd må ikke forsinke henvisning.",
      fremhaevHvis: [[{ felt: "mekanisme", er: "smaeld" }], [{ felt: "akilles", er: "positiv" }]],
      kilder: ["lh-ankelsmerter", "lh-akillesseneruptur"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-syndesmose",
      tekst:
        "Syndesmose- eller Maisonneuve-skade: smerter mellem distale tibia og fibula, ofte efter udadrotation. Samtidig medial ankelømhed eller ømhed over proksimale fibula skærper mistanken om en ustabil skade. Negative tests udelukker ikke skaden.",
      handling:
        "Samme dag ved mistanke om Maisonneuve-skade eller syndesmoseskade med udtalte belastningsproblemer eller samtidig medial skade. Ved mistanke om Maisonneuve-skade røntgen af hele underbenet.",
      fremhaevHvis: [
        [{ felt: "syndesmose", er: "oem" }],
        [{ felt: "fibula", er: "oem" }],
        [{ felt: "mekanisme", er: "udadrotation" }]
      ],
      kilder: ["lh-ankelsmerter", "lh-ankelskade-akut"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-artrit",
      tekst:
        "Akut artrit, herunder infektion: rødme, varme og udtalt bevægeømhed uden en passende skademekanisme.",
      handling: "Samme dag ved mistanke om ledinfektion (Region Hovedstaden: akut indlæggelse i ortopædkirurgisk regi via CVI).",
      // 2026-11-16 (review/GODKEND.md C2): rødme eller varme, som flagteksten nævner. Feber fremhæver ikke.
      fremhaevHvis: [[{ felt: "roedme", er: "ja" }], [{ felt: "varme", er: "ja" }]],
      kilder: ["lh-ankelsmerter", "rh-monoartrit"],
      // 2026-11-16: betingelsen blev ændret på generel tilladelse → UDKAST, til lægen godkender flaget enkeltvis.
      status: "UDKAST"
    },
    {
      id: "flag-neuropati",
      tekst:
        "Diabetes eller nedsat følesans: Ottawa-reglerne gælder ikke ved upålidelig undersøgelse, fx ved neuropati. Vær tilbageholdende med kulde og kompression ved nedsat cirkulation eller sensibilitet.",
      handling: "Vurder røntgen på klinisk mistanke uanset Ottawa-reglerne.",
      fremhaevHvis: [[{ felt: "disposition", er: "diabetes" }], [{ felt: "disposition", er: "foelesans" }]],
      kilder: ["lh-ankelsmerter"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-stressfraktur",
      tekst:
        "Stressfraktur: belastningssmerter og fokal knogleømhed, ofte efter øget aktivitet; kan opleves som akut opstået. Tidlige røntgenoptagelser kan være normale. Ottawa-reglerne gælder ikke ved overbelastningsskader.",
      handling:
        "Aflast; røntgen som første undersøgelse. Hurtig videre vurdering ved fortsat mistanke trods normal røntgen. Ved mistanke om stressfraktur i os naviculare må afklaringen ikke udskydes til et senere kontrolrøntgen.",
      fremhaevHvis: [[{ felt: "mekanisme", er: "overbelastning" }]],
      kilder: ["lh-ankelsmerter"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    }
  ],

  differentialdiagnoser: [
    {
      id: "diff-distorsion",
      navn: "Lateral ankeldistorsion",
      kendetegn: [
        "Typisk inversionstraume; ømhed foran og under laterale malleol",
        "Lig. talofibulare anterius rumperer oftest først, derefter lig. calcaneofibulare",
        "Grad I: partiel ruptur · Grad II: total ruptur af ATFL · Grad III: total ruptur af ATFL og CFL",
        "Hævelsens størrelse afgør ikke sværhedsgraden; skuffetest og talar tilt har begrænset værdi akut",
        "Ny undersøgelse efter 3–5 dage giver mere korrekt vurdering"
      ],
      notat: "Foreneligt med lateral ankeldistorsion.",
      kilder: ["lh-ankelsmerter", "lh-ankelskade-akut"],
      status: "UDKAST"
    },
    {
      id: "diff-fraktur",
      navn: "Fraktur (malleol, fod eller bagfod)",
      kendetegn: [
        "Fokal knogleømhed og belastningsbesvær",
        "Tænk ud over malleolerne: talus og calcaneus ved bagfodssmerter, basis af 5. metatars, proksimale fibula",
        "Fald på hælen giver mistanke om fraktur i calcaneus eller talus",
        "Frakturer er hyppigere hos ældre; nogle kan ligne en distorsion og være svære at se på første røntgen"
      ],
      notat: "Fraktur mistænkes.",
      kilder: ["lh-ankelsmerter", "lh-ankelfraktur", "lh-ankelskade-akut"],
      status: "UDKAST"
    },
    {
      id: "diff-syndesmose",
      navn: "Syndesmoseskade / Maisonneuve-skade",
      kendetegn: [
        "Ofte udadrotation (evt. kombineret med dorsalfleksion)",
        "Smerter mellem distale tibia og fibula; positiv squeeze-test eller smerter ved udadrotation",
        "Maisonneuve: proksimal fibulafraktur og skade på syndesmosen"
      ],
      notat: "Syndesmoseskade mistænkes.",
      kilder: ["lh-ankelsmerter", "lh-ankelskade-akut"],
      status: "UDKAST"
    },
    {
      id: "diff-medial",
      navn: "Medial ligamentskade (lig. deltoideum)",
      kendetegn: [
        "Eversionstraume, ofte med samtidig syndesmoseskade eller fraktur",
        "Isolerede mediale ligamentskader er sjældne (1–2 % af ligamentskaderne i anklen)"
      ],
      notat: "Medial ligamentskade overvejes.",
      kilder: ["lh-ankelskade-akut"],
      status: "UDKAST"
    },
    {
      id: "diff-akilles",
      navn: "Akillesseneruptur",
      kendetegn: [
        "Pludselige smerter og nedsat kraft ved forceret belastning; smæld",
        "Kan ikke stå på tæer; positiv Thompsons test; ofte palpabel defekt",
        "Aktiv plantarfleksion kan være mulig liggende uden modstand trods ruptur"
      ],
      notat: "Akillesseneruptur mistænkes.",
      kilder: ["lh-akillesseneruptur", "lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-sene",
      navn: "Anden seneskade / peroneusluksation",
      kendetegn: [
        "Smerter og hævelse langs en sene",
        "Smerter bag laterale malleol med klik eller sene, der springer frem over malleolen: peroneal seneluksation",
        "Mekanisme: supination i dorsalfleksion mod kontraheret peroneusmuskulatur"
      ],
      notat: "Seneskade overvejes.",
      kilder: ["lh-ankelsmerter", "lh-ankelskade-akut"],
      status: "UDKAST"
    },
    {
      id: "diff-stressfraktur",
      navn: "Stressfraktur",
      kendetegn: [
        "Belastningssmerter og fokal knogleømhed efter øget aktivitet",
        "Tidlige røntgenoptagelser kan være normale"
      ],
      notat: "Stressfraktur mistænkes.",
      kilder: ["lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-brusk",
      navn: "Osteokondral skade (bruskskade i anklen)",
      kendetegn: [
        "Efter ankeltraume: vedvarende dybe ledsmerter, stivhed, hævelse eller aflåsning",
        "Røntgen viser ofte et lille knoglefragment; ellers MR ved fortsat mistanke"
      ],
      notat: "Osteokondral skade overvejes.",
      kilder: ["lh-ankel-brusk", "lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-instabilitet",
      navn: "Kronisk lateral ankelinstabilitet",
      kendetegn: [
        "Tidligere distorsion; gentagne giv-way-episoder og usikkerhed på ujævnt underlag",
        "Omkring 20 % med lateral forstuvning udvikler kronisk instabilitet",
        "Mekanisk: positiv anterior drawer eller talar tilt (sideforskel > 5° eller tilt > 10°)",
        "Funktionel (proprioceptiv): negativ løshedsundersøgelse"
      ],
      notat: "Foreneligt med kronisk lateral ankelinstabilitet.",
      kilder: ["lh-ankel-ustabil"],
      status: "UDKAST"
    },
    {
      id: "diff-artrit",
      navn: "Akut artrit, herunder septisk",
      kendetegn: [
        "Rødme, varme og udtalt bevægeømhed uden passende skademekanisme",
        "Region Hovedstaden: hyppige differentialdiagnoser er urinsyregigt, pyrofosfatartrit, reaktiv artrit og sarkoidose (ofte ankelled og erythema nodosum)"
      ],
      notat: "Akut artrit overvejes.",
      kilder: ["lh-ankelsmerter", "rh-monoartrit"],
      status: "UDKAST"
    },
    // 2026-11-16: manglende indhold fra review (UDKAST til lægens godkendelse).
    {
      id: "diff-ikke-artikulaer",
      navn: "Ikke-artikulær hævelse (erysipelas, dyb venetrombose, senelidelse)",
      kendetegn: ["Region Hovedstaden: de vigtigste ikke-artikulære differentialdiagnoser til akut monoartrit er erysipelas, dyb venetrombose og senelidelser"],
      notat: "Ikke-artikulær årsag (erysipelas, dyb venetrombose, senelidelse) overvejes.",
      kilder: ["rh-monoartrit"],
      status: "UDKAST"
    }
  ],

  behandling: [
    {
      id: "beh-initial",
      tekst:
        "Første smertefulde fase: ro, aflastning, beskyttelse og elevation. RICE kan anvendes: kulde 10–15 minutter ad gangen med klæde mellem hud og kuldepakning, elastisk bind ved hævelse (må ikke kompromittere cirkulation eller følesans), elevation over hjertehøjde. Paracetamol efter behov. RICE må ikke forsinke akut henvisning.",
      notat: "Rådgivet om ro, aflastning, elevation og kulde. Paracetamol efter behov.",
      kilder: ["lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-fraktur-mistanke",
      tekst:
        "Ved mistanke om fraktur eller ustabil skade: aflast og immobiliser indtil akut vurdering; undgå unødig belastning, indtil røntgen og behandlingsplan foreligger.",
      gaelderFor: ["diff-fraktur", "diff-syndesmose"],
      notat: "Aflastet og immobiliseret indtil akut vurdering.",
      kilder: ["lh-ankelsmerter", "lh-ankelfraktur"],
      status: "UDKAST"
    },
    {
      id: "beh-akilles-skinne",
      tekst: "Ved mistanke om akillesseneruptur: anklen plantarflekteret i egnet skinne; undgå dorsalfleksion og belastning indtil vurderingen.",
      gaelderFor: ["diff-akilles"],
      notat: "Anklen plantarflekteret i skinne indtil vurdering.",
      kilder: ["lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-distorsion",
      tekst:
        "Ukompliceret lateral distorsion: behovet for ro er størst de første 1–2 døgn; derefter gradvis beskyttet belastning og bevægelse. Ved svær distorsion kan kortvarig immobilisering være nødvendig, typisk op til 10 dage. En stabiliserende ankelortose begrænser ny inversion; et elastisk bind giver ikke samme beskyttelse. Rutinemæssig tidlig henvisning til fysioterapeut anbefales ikke.",
      gaelderFor: ["diff-distorsion"],
      notat: "Gradvis beskyttet belastning og bevægelse. Stabiliserende ankelortose.",
      kilder: ["lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-distorsion-medicin",
      tekst:
        "Akut ankelskade: NSAID, evt. suppleret med paracetamol, de første dage – fx paracetamol 0,5 g 2 tabletter × 4 i 2–4 dage og NSAID i 5–7 dage.",
      gaelderFor: ["diff-distorsion"],
      notat: "NSAID og paracetamol de første dage.",
      kilder: ["lh-ankelskade-akut"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "\"Ankelskade, akut\" (2025) anbefaler NSAID evt. suppleret med paracetamol de første dage. Den nyere \"Ankelsmerter\" (2026) nævner kun paracetamol efter behov i den initiale behandling.",
        kilder: ["lh-ankelskade-akut", "lh-ankelsmerter"]
      }
    },
    {
      id: "beh-proprioceptiv",
      tekst:
        "Efter den akutte fase: mobilisering, ankeløvelser og proprioceptiv træning. Tape eller ortose anbefales i 6–12 måneder efter akut ankelskade som sekundær profylakse. Ultralydsbehandling anbefales ikke.",
      gaelderFor: ["diff-distorsion", "diff-instabilitet"],
      notat: "Instrueret i ankeløvelser og balancetræning. Tape eller ortose ved sport i 6–12 måneder.",
      kilder: ["lh-ankelskade-akut"],
      status: "UDKAST"
    },
    {
      id: "beh-instabilitet",
      tekst:
        "Kronisk lateral instabilitet: balance-, proprioceptions- og styrketræning af peronealmuskulaturen; velstøttende fodtøj eller ankelstøtte; undgå aktiviteter, der udløser nye distorsioner. Kirurgi ved mekanisk instabilitet trods 3–6 måneders struktureret fysioterapi.",
      gaelderFor: ["diff-instabilitet"],
      notat: "Henvist til struktureret balance- og peronealtræning.",
      kilder: ["lh-ankel-ustabil"],
      status: "UDKAST"
    },
    {
      id: "beh-overbelastning",
      tekst:
        "Overbelastning: den udløsende aktivitet standses eller reduceres. Ved mistanke om stressfraktur aflastes, og diagnosen afklares, før belastningen øges. Smerter efter overbelastning skal ikke automatisk behandles som en forstuvning.",
      gaelderFor: ["diff-stressfraktur", "diff-sene"],
      notat: "Udløsende aktivitet reduceret; aflastning indtil afklaring.",
      kilder: ["lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-brusk",
      tekst: "Mistanke om bruskskade: undgå kraftig belastning, indtil diagnosen er afklaret.",
      gaelderFor: ["diff-brusk"],
      notat: "Rådgivet om at undgå kraftig belastning indtil afklaring.",
      kilder: ["lh-ankel-brusk"],
      status: "UDKAST"
    },
    {
      id: "beh-vte",
      tekst:
        "Voksne med immobiliserende bandage eller markant nedsat mobilitet bør have en individuel vurdering af risikoen for venøs tromboemboli og blødning; farmakologisk profylakse efter lokal behandlingsplan.",
      gaelderFor: ["diff-fraktur", "diff-akilles"],
      notat: "VTE-risiko vurderet.",
      kilder: ["lh-ankelfraktur"],
      status: "UDKAST"
    },
    {
      id: "beh-opfoelgning",
      tekst:
        "Ny klinisk vurdering efter 3–5 dage ved usikker diagnose eller smertebegrænset første undersøgelse. Genvurder ved manglende tydelig bedring inden for 5–7 dage, fortsat manglende evne til at støtte, fokal knogleømhed, dybe ledsmerter eller aflåsning. Et normalt første røntgenbillede afslutter ikke udredningen ved fortsat klinisk mistanke.",
      notat: "Kontrol om 3–5 dage; tidligere ved forværring.",
      kilder: ["lh-ankelsmerter", "lh-ankelskade-akut"],
      status: "UDKAST"
    }
  ],

  henvisning: [
    {
      id: "hen-straks",
      til: "Akut vurdering / indlæggelse straks",
      kriterier:
        "Åben skade med mistanke om dyb skade, fejlstilling med truet hud, kredsløbs- eller nervepåvirkning, mistanke om kompartmentsyndrom.",
      hast: "akut",
      gyldighed: "national",
      notat: "Henvist straks til akut vurdering.",
      kilder: ["lh-ankelsmerter", "lh-ankelfraktur"],
      status: "UDKAST"
    },
    {
      id: "hen-samme-dag",
      til: "Røntgen eller akutmodtagelse samme dag",
      kriterier:
        "Mistanke om akut fraktur (Ottawa-reglerne eller anden klinisk mistanke), luksation, akillesseneruptur eller ledinfektion; mistanke om Maisonneuve-skade eller syndesmoseskade med udtalte belastningsproblemer eller samtidig medial skade.",
      hast: "akut",
      gyldighed: "national",
      notat: "Henvist samme dag til akut vurdering.",
      kilder: ["lh-ankelsmerter", "lh-ankelfraktur", "lh-akillesseneruptur"],
      status: "UDKAST"
    },
    {
      id: "hen-hurtig",
      til: "Billeddiagnostik eller ortopædkirurgisk vurdering (hurtigt)",
      kriterier:
        "Fortsat mistanke om syndesmoseskade, seneluksation eller stressfraktur trods normal røntgen. Aflast og beskyt skaden imens. CT eller MR kan være relevant ved fortsat mistanke om strukturel skade.",
      hast: "subakut",
      gyldighed: "national",
      notat: "Henvist til hurtig videre vurdering trods normal røntgen.",
      kilder: ["lh-ankelsmerter"],
      status: "UDKAST"
    },
    {
      id: "hen-langvarig",
      til: "Ortopædkirurg",
      kriterier:
        "Ankelskade, hvor patienten ikke er symptomfri efter 3 måneder (revurder om fraktur er overset), eller længerevarende ankelsmerter uden sikker årsag. Røntgen bør gentages efter 1 måned, hvis der fortsat er smerter ved almindelig gang.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurg pga. vedvarende gener efter ankelskade.",
      kilder: ["lh-ankelskade-akut", "lh-ankel-brusk"],
      status: "UDKAST"
    },
    {
      id: "hen-brusk",
      til: "Ortopædkirurg (bruskskade)",
      kriterier: "Klinisk mistanke om bruskskade og knogleavulsion, eller røntgenfund med mistanke om osteokondral fraktur.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurg mhp. osteokondral skade.",
      kilder: ["lh-ankel-brusk"],
      status: "UDKAST"
    },
    {
      id: "hen-instabilitet",
      til: "Ortopædkirurg (instabilitet)",
      kriterier:
        "Manglende bedring efter målrettet konservativ behandling; klinisk eller radiologisk påvist mekanisk løshed; ledsagende deformitet, bruskskade eller seneskade.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurg mhp. kronisk ankelinstabilitet.",
      kilder: ["lh-ankel-ustabil"],
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
