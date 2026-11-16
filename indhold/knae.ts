import { RH_MONOARTRIT, RH_VISITATION_REUMATOLOGI } from "./faelles";
import type { Region } from "./typer";

// KNÆ
//
// Sådan retter du:
// - "label" er teksten på knappen. "notat" er sætningen, der havner i notatet.
// - Rækkefølgen af felter her er rækkefølgen på skærmen.
// - "notat" nederst bestemmer rækkefølgen i selve notatet.
// - normal: true markerer et fund, N-genvejen må sætte; kun inspektions-/palpationsfund uden for flagbetingelser (se indhold.test.ts).
//
// Felter og fraser er overført fra den tidligere knæ-formular og er ikke
// gennemgået af dig endnu.
//
// Beslutningsstøtten nederst er UDKAST skrevet 2026-11-14 ud fra de anførte
// sider i Lægehåndbogen og Region Hovedstadens forløbsbeskrivelser, som alle
// er læst den dag. Teksten ligger tæt på kildens ordlyd. Kun du sætter
// status: "GODKENDT" (og godkendtDato).
//
// SST's nationale kliniske retningslinjer (knæartrose 2012, meniskpatologi
// 2016) kunne ikke åbnes 2026-11-14 (sst.dk afviste automatisk adgang). De er
// derfor ikke anført som kilde, selvom Lægehåndbogen og regionen henviser til dem.

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
          // Aldersgrupper valgt, så både Ottawa (over 55 år) og Pittsburgh (under 12 eller
          // over 50 år) kan aflæses. Grænsen ved præcis 55 år er en navngiven konflikt.
          id: "alder",
          label: "Alder",
          type: "enkelt",
          kunTilFlag: true, // bruges til røde flag; alderen står i journalen (review/GODKEND.md D)
          // Vises altid (review/GODKEND.md C3): bruges også til flaget om børn.
          valg: [
            { id: "under12", label: "Under 12", notat: "Alder under 12 år." },
            { id: "12til50", label: "12–50", notat: "Alder 12–50 år." },
            { id: "51til55", label: "51–55", notat: "Alder 51–55 år." },
            { id: "over55", label: "Over 55", notat: "Alder over 55 år." }
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
            { id: "ingen", label: "Ingen", notat: "Ingen hævelse." },
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
            { id: "fuld", label: "Fuld", notat: "Fuld bevægelighed." },
            { id: "let", label: "Let nedsat", notat: "Let nedsat bevægelighed." },
            { id: "svaert", label: "Svært nedsat", notat: "Svært nedsat bevægelighed." }
          ]
        },
        {
          id: "stabilitet",
          label: "Stabilitet",
          type: "enkelt",
          valg: [
            { id: "stabil", label: "Stabil ved ligamenttest", notat: "Stabilt ved klinisk ligamenttest." },
            { id: "instabil", label: "Instabilitet", notat: "Klinisk mistanke om instabilitet." }
          ]
        },
        {
          id: "patellaoemhed",
          label: "Ømhed patella",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "nej", label: "Ingen", notat: "Ingen direkte ømhed på patella." },
            { id: "ja", label: "Øm", notat: "Direkte ømhed på patella." }
          ]
        },
        {
          id: "fibulaoemhed",
          label: "Ømhed caput fibulae",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "nej", label: "Ingen", notat: "Ingen ømhed på caput fibulae." },
            { id: "ja", label: "Øm", notat: "Ømhed på caput fibulae." }
          ]
        },
        {
          id: "fleksion90",
          label: "Fleksion til 90°",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "ja", label: "Kan", notat: "Kan flektere knæet til 90 grader." },
            { id: "nej", label: "Kan ikke", notat: "Kan ikke flektere knæet til 90 grader." }
          ]
        },
        {
          id: "skridt",
          label: "4 skridt nu",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "ja", label: "Går", notat: "Går fire vægtbærende skridt ved undersøgelsen." },
            { id: "nej", label: "Kan ikke", notat: "Kan ikke gå fire vægtbærende skridt ved undersøgelsen." }
          ]
        },
        {
          id: "benloeft",
          label: "Strakt benløft",
          type: "enkelt",
          visHvis: [{ felt: "traume", er: "ja" }],
          valg: [
            { id: "ja", label: "Kan", notat: "Kan løfte strakt ben mod tyngdekraften." },
            { id: "nej", label: "Kan ikke", notat: "Kan ikke løfte strakt ben mod tyngdekraften." }
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
      felter: [
        "haevelse",
        "roedme",
        "varme",
        "ledlinje",
        "bevaegelighed",
        "stabilitet",
        "patellaoemhed",
        "fibulaoemhed",
        "fleksion90",
        "skridt",
        "benloeft",
        "objektivt-tekst"
      ]
    }
  ],

  kilder: [
    {
      id: "lh-knaesmerter",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Knæsmerter (symptomer og tegn)",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/symptomer-og-tegn/knaesmerter/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-artrit-bakteriel",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Artrit, bakteriel",
      aar: 2024,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/oevrige-sygdomme/artrit-bakteriel/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-meniskskade",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Meniskskade i knæet",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knae/meniskskade-i-knaeet/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-korsbaand-forreste",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Korsbåndskade, forreste",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knae/korsbaandskade-forreste/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-mcl",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Kollateralligamentskade, medial",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knae/kollateralligamentskade-medial/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-artrose-knae",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Artrose, knæ",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knae/artrose-knae/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-patellofemoralt",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Patellofemoralt syndrom",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/knae/patellofemoralt-syndrom/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-patellaluksation",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Patellaluksation",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knae/patellaluksation/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-bursit",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Bursit, præpatellar",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knae/bursit-praepatellar/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-patellar-tendinopati",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Patellar tendinopati",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/knae/patellar-tendinopati/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-traumatisk",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Idrætsrelaterede traumatiske knæskader hos voksne",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/idraetsrel-traumatiske-knaeskader-voksne/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-non-traumatisk",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Idrætsrelaterede non-traumatiske knæskader hos voksne",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/idraetsrel-non-traumatiske-knaelidelser-voksne/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "rh-knaeartrose",
      udgiver: "Region Hovedstaden",
      dansk: true,
      titel: "Forløbsbeskrivelse: Knæartrose",
      aar: 2024,
      url: "https://www.sundhed.dk/sundhedsfaglig/information-til-praksis/hovedstaden/almen-praksis/patientbehandling/patientforloeb/forloebsbeskrivelser-icpc/l-muskel-skelet-system/knaeartrose/",
      sidstTjekket: "2026-11-14"
    },
    RH_MONOARTRIT,
    RH_VISITATION_REUMATOLOGI,
    {
      id: "lh-baker",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Bakers cyste",
      aar: 2026,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/knae/bakers-cyste/",
      sidstTjekket: "2026-11-14"
    }
  ],

  roedeFlag: [
    {
      id: "flag-bakteriel-artrit",
      tekst:
        "Bakteriel artrit: akut monoartrit med hævelse, varme, rødme, smerte og bevægeindskrænkning. Feber og kulderystelser er almindelige, men ikke nødvendigvis til stede. Risikofaktorer: høj alder, hudinfektion, leddestruktion (fx reumatoid artrit), ledalloplastik, nylig ledkirurgi eller ledinjektion, immunsuppression, diabetes, alkoholmisbrug.",
      handling: "Indlægges akut ved mistanke (Region Hovedstaden: i ortopædkirurgisk regi via CVI).",
      fremhaevHvis: [
        [{ felt: "varme", er: "ja" }],
        [{ felt: "roedme", er: "ja" }],
        [{ felt: "feber", er: "ja" }]
      ],
      kilder: ["lh-artrit-bakteriel", "rh-monoartrit"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-fraktur",
      tekst:
        "Akut knæskade: udeluk fraktur, før stabiliteten testes. Lægehåndbogen (knee rules): røntgen ved direkte ømhed på patella, ømhed på caput fibulae, kan ikke gå 4 skridt, alder over 55 år, kan ikke flektere over 90 grader. Region Hovedstaden (Pittsburgh): akut røntgen ved alder under 12 eller over 50 år, eller kan ikke gå 4 vægtbelastede skridt.",
      handling:
        "Lægehåndbogen: røntgen ved ét af knee rules-kriterierne. Region Hovedstaden: akut røntgen ved ét af Pittsburgh-kriterierne. Akut henvisning ved mistanke om brud (Region Hovedstaden: CVI).",
      // Fremhæves, hvis blot ét kriterie fra Ottawa (Lægehåndbogen) ELLER Pittsburgh
      // (Region Hovedstaden) er registreret. Det afgør ikke konflikten mellem reglerne.
      fremhaevHvis: [
        [
          { felt: "traume", er: "ja" },
          { felt: "belastning", er: "ingen" }
        ],
        [{ felt: "skridt", er: "nej" }],
        [{ felt: "patellaoemhed", er: "ja" }],
        [{ felt: "fibulaoemhed", er: "ja" }],
        [{ felt: "fleksion90", er: "nej" }],
        [
          { felt: "traume", er: "ja" },
          { felt: "alder", er: "under12" }
        ],
        [
          { felt: "traume", er: "ja" },
          { felt: "alder", er: "51til55" }
        ],
        [
          { felt: "traume", er: "ja" },
          { felt: "alder", er: "over55" }
        ]
      ],
      kilder: ["lh-knaesmerter", "rh-traumatisk"],
      // 2026-11-16: handlingen omformuleret efter kilderne (review/GODKEND.md A2) og godkendt af lægen samme dag.
      status: "GODKENDT",
      godkendtDato: "2026-11-16",
      konflikt: {
        beskrivelse:
          "Lægehåndbogen bruger \"Knee-rules\" (at kriterierne svarer til Ottawa Knee Rule, er Claudes identifikation); Region Hovedstadens forløbsbeskrivelse for traumatiske knæskader bruger Pittsburgh Knee Rules. Begge er danske kilder, og begge regler vises. Ingen af kilderne kombinerer reglerne. Fremhævningen sker, hvis ét kriterie fra én af reglerne er registreret. Originalstudierne bag reglerne er ikke læst.",
        kilder: ["lh-knaesmerter", "rh-traumatisk"]
      }
    },
    {
      id: "flag-aflaast-knae",
      tekst:
        "Aflåst knæ: vridtraume med efterfølgende udtalt nedsat bevægelighed, typisk låst mellem ca. 30 og 70 graders fleksion (indeklemt menisklæsion).",
      handling: "Region Hovedstaden: subakut henvisning til CVI snarest muligt (< 1 uge) ved aflåst knæ med strækkemangel og mistanke om indeklemt ledpatologi, fx menisk. Lægehåndbogen angiver akut vurdering – se konflikt.",
      fremhaevHvis: [
        [
          { felt: "laasning", er: "ja" },
          { felt: "bevaegelighed", er: "svaert" }
        ]
      ],
      kilder: ["lh-meniskskade", "lh-knaesmerter", "rh-traumatisk"],
      // 2026-11-16: handlingen følger Region Hovedstaden efter lægens afgørelse. UDKAST, til lægen har læst kilden og godkender.
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogens side om meniskskade skriver \"henvises til akut ortopædkirurgisk vurdering\" ved aflåst knæ. Lægehåndbogens side om knæsmerter skriver \"subakut henvisning ... ved aflåsning\". Region Hovedstaden angiver \"subakut henvisning til CVI snarest muligt < 1 uge\" ved aflåst knæ med strækkemangel.",
        kilder: ["lh-meniskskade", "lh-knaesmerter", "rh-traumatisk"]
      }
    },
    {
      id: "flag-akut-ligamentskade",
      tekst:
        "Akut ligamentskade eller stor ledansamling: vridtraume, hvor knæet knækker sammen, evt. med \"pop\" og hæmartron i løbet af få timer (forreste korsbånd), valgustraume med akut løshed (mediale kollaterale ligament), eller akut stor ledansamling efter traume.",
      handling: "Henvises akut (Lægehåndbogen: skadestue; Region Hovedstaden: CVI).",
      fremhaevHvis: [
        [
          { felt: "traume", er: "ja" },
          { felt: "haevelse-straks", er: "ja" }
        ],
        [
          { felt: "traume", er: "ja" },
          { felt: "knaek", er: "ja" }
        ],
        [
          { felt: "traume", er: "ja" },
          { felt: "haevelse", er: "udtalt" }
        ],
        [
          { felt: "traume", er: "ja" },
          { felt: "stabilitet", er: "instabil" }
        ]
      ],
      kilder: ["lh-korsbaand-forreste", "lh-mcl", "rh-traumatisk"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-straekkeapparat",
      tekst:
        "Strækkeapparat: efter traume kan benet ikke løftes mod tyngdekraften (strakt benløft) – mistanke om ruptur af strækkeapparatet.",
      handling: "Akut henvisning til CVI.",
      fremhaevHvis: [[{ felt: "benloeft", er: "nej" }]],
      kilder: ["rh-traumatisk"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-patellaluksation",
      tekst:
        "Akut patellaluksation: knæet \"gik af led\", ofte efter rotation på let flekteret knæ. Patella er som regel reponeret, når patienten ses; da ømhed medialt for patella og oftest hæmartron.",
      handling: "Henvises akut mhp. røntgen og bandagering (Lægehåndbogen: skadestue; Region Hovedstaden: CVI ved førstegangsluksation).",
      kilder: ["lh-patellaluksation", "rh-traumatisk"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-stor-akut-skade",
      tekst: "Store og akutte knæskader: neurologisk og vaskulær status skal indgå i vurderingen.",
      handling: "Undersøg og notér neurologisk og vaskulær status. Ved den akutte vurdering kan smerter og hævelse vanskeliggøre undersøgelsen; revurdering efter ca. 2 uger.",
      kilder: ["lh-meniskskade"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-septisk-bursit",
      tekst:
        "Bursit med stærke smerter, varme, rødme, kraftig hævelse og feber indikerer septisk bursit. Den vigtigste differentialdiagnose til knæbursit er ansamling og infektion i selve knæleddet.",
      handling:
        "Henvises ved mistanke om septisk bursit. Akut henvisning ved tegn på involvering af hele knæleddet.",
      fremhaevHvis: [[{ felt: "feber", er: "ja" }]],
      kilder: ["lh-bursit", "lh-knaesmerter"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-laeg-haevelse",
      tekst:
        "Akut indsættende hævelse og evt. rødme i øvre læg kan være en bristet Bakers cyste. Er cysten ikke tidligere erkendt, omfatter differentialdiagnoserne DVT og infektion.",
      handling: "Ultralyd kan i tvivlstilfælde stille diagnosen og afkræfte differentialdiagnoser.",
      kilder: ["lh-baker"],
      status: "GODKENDT",
      godkendtDato: "2026-11-15"
    },
    {
      id: "flag-boern",
      tekst:
        "Barn med knæsmerter – diagnostiske faldgruber: hoftelidelse (projicerede smerter), osteosarkom og Ewings sarkom, artralgi pga. leukæmi.",
      handling:
        "Røntgen af hofter bør også rekvireres ved knæsmerter hos børn. MR-scanning ved længerevarende knæsmerter på mistanke om osteochondritis dissecans.",
      // 2026-11-16 (review/GODKEND.md C3): under 12 år. 12–17-årige fanges ikke af aldersgrupperne.
      fremhaevHvis: [[{ felt: "alder", er: "under12" }]],
      kilder: ["lh-knaesmerter"],
      // 2026-11-16: betingelsen blev ændret på generel tilladelse → UDKAST, til lægen godkender flaget enkeltvis.
      status: "UDKAST"
    }
  ],

  differentialdiagnoser: [
    {
      id: "diff-artrose",
      navn: "Gonartrose",
      kendetegn: [
        "Belastningsrelaterede smerter, igangsætningssmerter",
        "Stivhed efter hvile; morgenstivhed sjældent over ½ time",
        "Krepitation, bevægeindskrænkning, knoglefortykkelse, ømme ledspalter",
        "Hvile- og natlige smerter ved udtalt artrose",
        "Klinisk diagnose; kan stilles uden røntgen"
      ],
      notat: "Foreneligt med gonartrose.",
      kilder: ["lh-artrose-knae", "lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-menisk",
      navn: "Meniskskade / meniskdegeneration",
      kendetegn: [
        "Ledlinjerelaterede smerter, ofte efter vridtraume; hos 30–50-årige også ved mindre traume",
        "Klik, aflåsninger, knæsvigt",
        "Ledlinjeømhed (hyppigt, men uspecifikt) sammen med rotationssmerter",
        "Hydartron ofte først efter 12–24 timer; recidiverende",
        "Ingen enkelt test stiller diagnosen"
      ],
      notat: "Foreneligt med meniskrelaterede gener.",
      kilder: ["lh-meniskskade", "lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-acl",
      navn: "Forreste korsbåndsskade",
      kendetegn: [
        "Vridtraume, hvor knæet knækker sammen; evt. \"pop\"",
        "Hæmartron i løbet af få timer",
        "Ekstensionsdefekt på 10–15 grader ses ofte tidligt",
        "Positiv Lachmans test; stabilitetstest må ofte gentages efter 10–14 døgn",
        "Kronisk skade: knæet \"giver efter\""
      ],
      notat: "Foreneligt med skade på forreste korsbånd.",
      kilder: ["lh-korsbaand-forreste", "lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-mcl",
      navn: "Skade på mediale kollaterale ligament",
      kendetegn: [
        "Smerter og instabilitetsfølelse efter valgustraume",
        "Ømhed langs ligamentet; ofte ikke hæmartron",
        "Valgusløshed ved test på strakt og 20–30 grader flekteret knæ",
        "Løshed i strakt stilling tyder på kombineret skade (korsbånd, kapsel)"
      ],
      notat: "Foreneligt med skade på mediale kollaterale ligament.",
      kilder: ["lh-mcl"],
      status: "UDKAST"
    },
    {
      id: "diff-patellofemoralt",
      navn: "Patellofemoralt smertesyndrom",
      kendetegn: [
        "Gradvis udvikling; smerter bag, omkring eller under patella",
        "Værst ved trapper og bakker, hugsiddende og ved rejsning efter langvarig sidden",
        "Pseudolåsninger og følelse af knæsvigt",
        "Få eller ingen specifikke objektive fund; eksklusionsdiagnose"
      ],
      notat: "Foreneligt med patellofemoralt smertesyndrom.",
      kilder: ["lh-patellofemoralt", "lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-patellaluksation",
      navn: "Patellaluksation (akut eller recidiverende)",
      kendetegn: [
        "Opstår ofte efter rotation på let flekteret knæ; \"knæet gik af led\"",
        "Efter reponering: ømhed medialt for patella, oftest hæmartron, normal stabilitet",
        "Recidiverende: positiv apprehension-test"
      ],
      notat: "Foreneligt med patellaluksation.",
      kilder: ["lh-patellaluksation"],
      status: "UDKAST"
    },
    {
      id: "diff-tendinopati",
      navn: "Tendinopati / overbelastning",
      kendetegn: [
        "Patellatendinit: smerter og ømhed ved patellas nedre pol; hop- og springidræt",
        "Løberknæ (tractus iliotibialis): laterale knæsmerter efter kort tids løb, lokaliseret ømhed",
        "Anserinustendinit: smerter medialt, lokaliseret ømhed over sene og bursa",
        "Popliteustendinit: bageste knæsmerter, ømhed over popliteussenen"
      ],
      notat: "Foreneligt med overbelastningsbetinget tendinopati.",
      kilder: ["lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-bursit",
      navn: "Knæbursit (præpatellar / infrapatellar)",
      kendetegn: [
        "Ofte langvarigt knæliggende arbejde eller enkelttraume",
        "Hævelse, ømhed, varme og rødme foran eller neden for patella",
        "Nedsat fleksion ved akut bursit; generaliseret hydartron er sjældent",
        "Svært at skelne septisk fra aseptisk; aspiration og blodprøver kan hjælpe"
      ],
      notat: "Foreneligt med bursit.",
      kilder: ["lh-bursit", "lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-baker",
      navn: "Bakers cyste",
      kendetegn: [
        "Stramning og evt. smerter i knæhasen; evt. smerter i læggen",
        "Blød, fluktuerende udfyldning i fossa poplitea; ses bedst med strakt knæ",
        "Associeret med inflammatoriske knælidelser, menisklæsioner og artrose"
      ],
      notat: "Foreneligt med Bakers cyste.",
      kilder: ["lh-baker"],
      status: "UDKAST"
    },
    {
      id: "diff-bakteriel-artrit",
      navn: "Bakteriel artrit",
      kendetegn: [
        "Akut hævelse, varme, rødme, smerter og bevægeindskrænkning i ét led",
        "Feber og kulderystelser almindelige, men kan mangle",
        "Infektion et andet sted øger sandsynligheden",
        "Region Hovedstaden: mistanken svækkes ved normal CRP (<10 mg/l), faldende CRP uden antibiotika/glukokortikoid, tidligere lignende anfald (fx kendt urinsyregigt) eller lokalisation til små led"
      ],
      notat: "Bakteriel artrit mistænkes.",
      kilder: ["lh-artrit-bakteriel", "rh-monoartrit"],
      status: "UDKAST"
    },
    {
      id: "diff-artrit",
      navn: "Artrit (krystalartrit, reaktiv, reumatisk)",
      kendetegn: [
        "Smerter i andre led; reumatisk sygdom hos patienten eller i slægten",
        "Reaktiv artrit: forudgående uretrit, vaginit, halsinfektion og/eller konjunktivit",
        "Blodprøver: SR, CRP, leukocyt- og differentialtælling, reumaserologi",
        "Ledpunktur ved hydartron: bakterier, leukocytter, krystaller"
      ],
      notat: "Inflammatorisk ledlidelse overvejes.",
      kilder: ["lh-knaesmerter", "lh-artrit-bakteriel"],
      status: "UDKAST"
    },
    {
      id: "diff-henfoert",
      navn: "Henført smerte fra hofte eller ryg",
      kendetegn: [
        "Hofte: overført smerte til forreste mediale del af låret ned mod knæet",
        "Iskias: L4-affektion giver forreste, L5–S1-affektion bageste knæsmerter",
        "Hos børn kan knæsmerter være projicerede fra hoften"
      ],
      notat: "Henført smerte fra hofte eller ryg overvejes.",
      kilder: ["lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-ocd",
      navn: "Osteochondritis dissecans",
      kendetegn: [
        "Som regel 12–20 år, ofte meget idrætsaktive",
        "Aflåsningstilfælde, knæsmerter, følelse af knæsvigt, hævelse",
        "Diagnosen stilles ved MR-scanning"
      ],
      notat: "Osteochondritis dissecans overvejes.",
      kilder: ["lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-apofysit",
      navn: "Osgood-Schlatter / Sinding-Larsen",
      kendetegn: [
        "Osgood-Schlatter i 10–15-årsalderen, Sinding-Larsen nogle år tidligere",
        "Aktivitetsrelaterede smerter; palpationsømhed og ofte hævelse ved tuberositas tibiae eller apex patellae"
      ],
      notat: "Foreneligt med traktionsapofysit.",
      kilder: ["lh-knaesmerter"],
      status: "UDKAST"
    },
    // 2026-11-16: manglende indhold fra review (UDKAST til lægens godkendelse).
    {
      id: "diff-ikke-artikulaer",
      navn: "Ikke-artikulær hævelse (erysipelas, dyb venetrombose, senelidelse)",
      kendetegn: [
        "Region Hovedstaden: de vigtigste ikke-artikulære differentialdiagnoser til akut monoartrit er erysipelas, dyb venetrombose og senelidelser",
        "Akut hævelse og evt. rødme i øvre læg uden kendt Bakers cyste: overvej DVT og infektion"
      ],
      notat: "Ikke-artikulær årsag (erysipelas, dyb venetrombose, senelidelse) overvejes.",
      kilder: ["rh-monoartrit", "lh-baker"],
      status: "UDKAST"
    }
  ],

  behandling: [
    {
      id: "beh-aflastning",
      tekst: "Aflastning fra uhensigtsmæssige arbejds- og sportsbelastninger. Instruktion i quadricepsøvelser.",
      notat: "Rådgivet om aflastning og instrueret i quadricepsøvelser.",
      kilder: ["lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-analgetika",
      tekst: "Smertestillende: paracetamol er oftest førstevalg, evt. NSAID.",
      notat: "Paracetamol, evt. NSAID, efter behov.",
      kilder: ["lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-akut-traume",
      tekst:
        "Akut knæskade: hvile, afkøling, kompression og elevation (RICE). NSAID kan give smertelindring i akutfasen. Kontrol efter 1–2 uger mhp. ny vurdering af ligamenter og menisker.",
      gaelderFor: ["diff-acl", "diff-mcl", "diff-menisk", "diff-patellaluksation"],
      notat: "RICE og evt. NSAID. Kontrol om 1–2 uger mhp. fornyet vurdering af ligamenter og menisker.",
      kilder: ["lh-knaesmerter", "lh-korsbaand-forreste", "lh-mcl", "lh-meniskskade"],
      status: "UDKAST"
    },
    {
      id: "beh-lettere-skade",
      tekst:
        "Lettere knæskade (fx forstuvning af MCL): afventende holdning i ca. 6 uger, mobilisering efter evne, evt. henvisning til fysioterapeut.",
      gaelderFor: ["diff-mcl", "diff-menisk"],
      notat: "Afventende holdning ca. 6 uger med mobilisering efter evne.",
      kilder: ["rh-traumatisk"],
      status: "UDKAST"
    },
    {
      id: "beh-artrose-basis",
      tekst:
        "Knæartrose: skriftlig og mundtlig information og undervisning. Superviseret træning og patientuddannelse i 8–12 uger hos praktiserende fysioterapeut eller kiropraktor eller i kommunalt tilbud (fx GLA:D). Vægttab: mindst 5 % ved BMI over 25.",
      gaelderFor: ["diff-artrose"],
      notat: "Informeret om knæartrose. Henvist til superviseret træning og patientuddannelse. Vægttab drøftet.",
      kilder: ["lh-artrose-knae", "rh-knaeartrose"],
      status: "UDKAST"
    },
    {
      id: "beh-artrose-medicin",
      tekst:
        "Knæartrose, medicin: paracetamol som førstevalg i perioder med smerter. NSAID giver lidt bedre smertelindring, men er dårligt egnet som langtidsbehandling; stop efter 1 uge uden væsentlig effekt. Opioider så vidt muligt undgås. Glukosamin er ikke effektivt.",
      gaelderFor: ["diff-artrose"],
      notat: "Smertestillende efter behov; paracetamol som førstevalg, evt. NSAID i kortere perioder.",
      kilder: ["lh-artrose-knae", "rh-knaeartrose"],
      status: "UDKAST"
    },
    {
      id: "beh-artrose-steroid",
      tekst:
        "Intraartikulær glukokortikoid giver kortvarig lindring (få uger) ved opblussen med inflammatorisk præg. Afstå fra blokade umiddelbart før henvisning mhp. protese (øget infektionsrisiko kan udskyde operation).",
      gaelderFor: ["diff-artrose"],
      notat: "Intraartikulær glukokortikoid.",
      kilder: ["lh-artrose-knae", "rh-knaeartrose"],
      status: "UDKAST"
    },
    {
      id: "beh-artrose-roentgen",
      tekst:
        "Røntgen ved mistanke om artrose: stående optagelse med let flekteret knæ. Lægehåndbogen (artrose): kun ved manglende effekt af behandling mhp. operationsvurdering eller ved mistanke om anden sygdom. Diagnosen kan stilles klinisk.",
      gaelderFor: ["diff-artrose", "diff-menisk"],
      notat: "Stående røntgen af knæ bestilt.",
      // 2026-11-16: "let flekteret knæ" står i Region Hovedstadens forløb (review/KILDEKONTROL.md).
      kilder: ["lh-artrose-knae", "rh-non-traumatisk"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogens artroseside siger både \"Sikre diagnostik ved klinisk undersøgelse og røntgen\" og \"Røntgen foretages kun ved manglende effekt af behandling ... eller ved mistanke om anden sygdom\". Lægehåndbogens menisk-side: god praksis at tilbyde stående røntgen til patienter over 40 år med mistanke om både artrose og meniskpatologi. Region Hovedstaden (non-traumatiske knælidelser): artrose bør indtænkes hos alle over 35 år, og røntgen er her indiceret som primært udredningsværktøj, ikke MR eller artroskopi.",
        kilder: ["lh-artrose-knae", "lh-meniskskade", "rh-non-traumatisk"]
      }
    },
    {
      id: "beh-ingen-mr-artroskopi",
      tekst:
        "MR af knæ ordineres ikke fra almen praksis i Region Hovedstaden. Artroskopi har ingen plads ved knæartrose, og patienter med smerter relateret til artrose eller degenerative menisklæsioner skal generelt ikke artroskoperes.",
      gaelderFor: ["diff-artrose", "diff-menisk"],
      notat: "Ikke indikation for MR eller artroskopi aktuelt.",
      kilder: ["rh-non-traumatisk", "lh-artrose-knae"],
      status: "UDKAST"
    },
    {
      id: "beh-menisk-fys",
      tekst:
        "Menisklæsion uden traume (degenerativ) og traumatisk menisklæsion uden aflåsning eller væsentlige mekaniske symptomer: fysioterapi som initial behandling. Over 40 år: sundhedsfagligt vejledt træning, ofte længere end 3 måneder.",
      gaelderFor: ["diff-menisk"],
      notat: "Henvist til fysioterapi som initial behandling.",
      kilder: ["lh-meniskskade", "rh-non-traumatisk"],
      status: "UDKAST"
    },
    {
      id: "beh-acl",
      tekst: "Forreste korsbåndsskade: fysioterapeutisk vejledt træningsforløb; rekonstruktion vurderes i ortopædkirurgisk regi.",
      gaelderFor: ["diff-acl"],
      notat: "Fysioterapeutisk vejledt træning.",
      kilder: ["lh-korsbaand-forreste"],
      status: "UDKAST"
    },
    {
      id: "beh-mcl",
      tekst:
        "MCL-læsion uden løshed: aflastning og smertebehandling. Med løshed: hængslet bandage i 5–6 uger. Træning kan startes 1–2 uger efter skaden, når de akutte smerter er aftaget.",
      gaelderFor: ["diff-mcl"],
      notat: "Aflastning og smertebehandling. Træning når de akutte smerter er aftaget.",
      kilder: ["lh-mcl"],
      status: "UDKAST"
    },
    {
      id: "beh-pfs",
      tekst:
        "Patellofemoralt smertesyndrom: aflastning og aktivitetsmodifikation (undgå hugsiddende, spring, løb på hårdt underlag), træning af hofte- og knæmuskulatur, evt. fodindlæg. Paracetamol eller NSAID kan være til nogen nytte tidligt. Kirurgi kun ved påvist korrigerbar årsag.",
      gaelderFor: ["diff-patellofemoralt"],
      notat: "Rådgivet om aktivitetsmodifikation og træning af hofte- og knæmuskulatur.",
      kilder: ["lh-patellofemoralt"],
      status: "UDKAST"
    },
    {
      id: "beh-patellaluksation",
      tekst:
        "Akut patellaluksation: reponeres, hvis den ikke er gået på plads; stabiliseres med ortose, elastisk bandage eller tape i 2 uger. Medial quadricepstræning. Råd om forsigtighed ved sport med vridbelastning.",
      gaelderFor: ["diff-patellaluksation"],
      notat: "Stabiliserende bandage. Rådgivet om quadricepstræning og forsigtighed ved vridbelastning.",
      kilder: ["lh-patellaluksation"],
      status: "UDKAST"
    },
    {
      id: "beh-patellatendinopati",
      tekst:
        "Patellar tendinopati: afstå fra smerteprovokerende aktivitet; langsom, tung styrketræning (fysioterapeutvejledt 3 gange om ugen i 3 måneder, mindst 12 uger). NSAID kun i akut fase i 7–10 dage; langtidsbehandling anbefales ikke.",
      gaelderFor: ["diff-tendinopati"],
      notat: "Rådgivet om aflastning og tung, langsom styrketræning.",
      kilder: ["lh-patellar-tendinopati"],
      status: "UDKAST"
    },
    {
      id: "beh-bursit",
      tekst:
        "Bursit: minimér knæliggende aktivitet, brug knæbeskytter; evt. is og kompression. NSAID i akutfasen. Steroidinjektion efter aspiration kan forsøges – ikke ved mistanke om infektion, og nålen må ikke nå knæleddet.",
      gaelderFor: ["diff-bursit"],
      notat: "Rådgivet om aflastning og knæbeskyttelse. NSAID efter behov.",
      kilder: ["lh-bursit"],
      status: "UDKAST"
    },
    {
      id: "beh-baker",
      tekst:
        "Bakers cyste: ved mistanke om DVT eller anden alvorlig lidelse iværksættes relevante undersøgelser. Ved vedvarende gener udredes bagvedliggende årsag. NSAID kan måske dæmpe inflammation og ledvæskeproduktion.",
      gaelderFor: ["diff-baker"],
      notat: "Bakers cyste; udredning af bagvedliggende årsag ved vedvarende gener.",
      kilder: ["lh-baker"],
      status: "UDKAST"
    }
  ],

  henvisning: [
    {
      id: "hen-septisk",
      til: "Akut indlæggelse (ortopædkirurgi via CVI)",
      kriterier: "Mistanke om bakteriel (septisk) artrit.",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist akut til CVI mhp. septisk artrit.",
      kilder: ["rh-monoartrit", "lh-artrit-bakteriel"],
      status: "UDKAST"
    },
    {
      id: "hen-akut-traume",
      til: "CVI, akut",
      kriterier:
        "Efter knætraume: akut stor ledansamling; akut førstegangs patellaluksation; kan ikke løfte benet mod tyngdekraften (strækkeapparat); mistanke om fraktur eller løshed (side- eller skuffeløshed).",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist akut til CVI.",
      kilder: ["rh-traumatisk"],
      status: "UDKAST"
    },
    {
      id: "hen-akut-roentgen",
      til: "Akut røntgen af knæ",
      kriterier:
        "Region Hovedstaden (Pittsburgh Knee Rules): alder under 12 eller over 50 år, eller kan ikke gå 4 vægtbelastede skridt.",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Akut røntgen af knæ.",
      kilder: ["rh-traumatisk"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogen bruger i stedet \"Knee-rules\" (svarer til Ottawa Knee Rule): direkte patellaømhed, ømhed på caput fibulae, kan ikke gå 4 skridt, alder over 55 år, kan ikke flektere over 90 grader. Begge regler vises i det røde flag om fraktur.",
        kilder: ["rh-traumatisk", "lh-knaesmerter"]
      }
    },
    {
      id: "hen-aflaast",
      til: "CVI, subakut (snarest, < 1 uge)",
      kriterier: "Aflåst knæ med strækkemangel og mistanke om indeklemt ledpatologi, fx menisk.",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist subakut til CVI mhp. aflåst knæ.",
      kilder: ["rh-traumatisk", "lh-meniskskade"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogens side om meniskskade angiver akut ortopædkirurgisk vurdering ved aflåst knæ; Region Hovedstaden angiver subakut (< 1 uge).",
        kilder: ["lh-meniskskade", "rh-traumatisk"]
      }
    },
    {
      id: "hen-lettere-traume",
      til: "CVI, elektiv",
      kriterier:
        "Lettere knæskade med vedvarende symptomer over ca. 6 uger. Henvisningen bør indeholde skadetidspunkt, mekanisme, subjektive klager, side, lokaliseret ømhed, ledhævelse, strakt benløft, strækkemangel og side-/skuffeløshed.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist elektivt til CVI pga. vedvarende symptomer efter knæskade.",
      kilder: ["rh-traumatisk"],
      status: "UDKAST"
    },
    {
      id: "hen-non-traumatisk",
      til: "CVI eller praktiserende ortopædkirurg, elektiv",
      kriterier:
        "Non-traumatisk: pludselig opstået strækkedefekt over 1 uge, eller vedvarende/tiltagende uacceptable smerter trods ADL-ændringer, vægttab og superviseret træning i mindst 3–6 måneder. Over 35 år og efter tidligere knætraume skal stående røntgen (let bøjet knæ) foreligge. MR ordineres ikke fra almen praksis.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist elektivt til ortopædkirurgisk vurdering efter gennemført ikke-operativt forløb.",
      kilder: ["rh-non-traumatisk"],
      status: "UDKAST"
    },
    {
      id: "hen-artrose",
      til: "Ortopædkirurgisk afdeling (knæartrose)",
      kriterier:
        "Symptomer i mindst 3–6 måneder, gennemført ikke-operativt behandlingsprogram, og røntgen inden for 12 måneder med påvist artrose. Undgå blokade umiddelbart før henvisning. Hospitalerne tilbyder et 3-måneders non-operativt program (holdtræning; vægttabsforløb ved BMI over 30).",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til ortopædkirurgisk afdeling mhp. knæartrose.",
      kilder: ["rh-knaeartrose", "lh-artrose-knae"],
      status: "UDKAST"
    },
    {
      id: "hen-menisk",
      til: "Ortopædkirurgisk vurdering (menisk)",
      kriterier:
        "Traumatisk menisklæsion med vedvarende generende klik og aflåsninger, eller degenerativ læsion efter svigt af fysioterapi. Over 40 år: fortsatte svært generende symptomer efter mere end 3 måneders træning. MR-fund af menisklæsion er ikke i sig selv grund til henvisning uden aflåsning og/eller invaliderende smerter.",
      hast: "elektiv",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist til ortopædkirurgisk vurdering mhp. menisklæsion.",
      kilder: ["lh-meniskskade", "rh-non-traumatisk"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogen: henvisning efter svigt af fysioterapi i mindst 3–4 måneder. Region Hovedstaden (over 40 år): træning ofte længere end 3 måneder; henvis ved fortsatte svært generende symptomer efter mere end 3 måneder.",
        kilder: ["lh-meniskskade", "rh-non-traumatisk"]
      }
    },
    {
      id: "hen-ligament-kronisk",
      til: "Ortopædkirurgisk vurdering (kronisk instabilitet)",
      kriterier:
        "Objektiv løshed af forreste korsbånd ved kronisk skade, eller valgusløshed efter ældre traume (kronisk valgusinstabilitet).",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurgisk vurdering mhp. kronisk instabilitet.",
      kilder: ["lh-korsbaand-forreste", "lh-mcl"],
      status: "UDKAST"
    },
    {
      id: "hen-patellaluksation-recidiv",
      til: "Ortopædkirurgisk vurdering",
      kriterier: "Gentagen (recidiverende) patellaluksation.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurgisk vurdering mhp. recidiverende patellaluksation.",
      kilder: ["lh-patellaluksation"],
      status: "UDKAST"
    },
    {
      id: "hen-bursit",
      til: "Ortopædkirurgi",
      kriterier:
        "Bursit med manglende effekt af konservativ behandling eller mistanke om septisk bursit. Akut ved tegn på involvering af hele knæleddet.",
      hast: "subakut",
      gyldighed: "national",
      notat: "Henvist mhp. bursit.",
      kilder: ["lh-bursit"],
      status: "UDKAST"
    },
    {
      id: "hen-reumatolog",
      til: "Reumatologisk hotline / reumatolog",
      kriterier:
        "Akut monoartrit (ikke septisk mistanke) med betydelige smerter eller funktionsbegrænsning: konference mhp. akut/subakut vurdering, ledpunktur og krystalmikroskopi, evt. glukokortikoidinjektion. Hotline kl. 08–15: Bispebjerg/Frederiksberg Hospital 38 16 41 90 (planområde Midt, Byen, Bornholm); Rigshospitalet, Valdemar Hansens Vej 38 63 42 47 (Nord og Syd).",
      hast: "subakut",
      gyldighed: "Region Hovedstaden",
      notat: "Konfereret med reumatologisk hotline.",
      kilder: ["rh-monoartrit", "rh-visitation-reumatologi"],
      status: "UDKAST"
    }
  ]
};
