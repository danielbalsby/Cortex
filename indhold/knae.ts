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
// gennemgået af dig endnu.
//
// Beslutningsstøtten nederst (røde flag og differentialdiagnoser) er UDKAST
// skrevet 2026-11-14 ud fra de anførte sider i Lægehåndbogen, som alle er
// læst den dag. Teksten ligger tæt på kildens ordlyd. Kun du sætter
// status: "GODKENDT" (og godkendtDato). Behandling og henvisning kommer i trin 6.

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
      handling: "Indlægges akut ved mistanke.",
      fremhaevHvis: [
        [{ felt: "varme", er: "ja" }],
        [{ felt: "roedme", er: "ja" }],
        [{ felt: "feber", er: "ja" }]
      ],
      kilder: ["lh-artrit-bakteriel"],
      status: "UDKAST"
    },
    {
      id: "flag-fraktur",
      tekst:
        "Akut knæskade: udeluk fraktur, før stabiliteten testes. Følgende skal udløse røntgen af knæet: direkte ømhed på patella, ømhed på caput fibulae, kan ikke gå 4 skridt, alder over 55 år, kan ikke flektere over 90 grader.",
      handling: "Røntgen af knæ. Akut henvisning til ortopædkirurg ved mistanke om brud.",
      fremhaevHvis: [
        [
          { felt: "traume", er: "ja" },
          { felt: "belastning", er: "ingen" }
        ]
      ],
      kilder: ["lh-knaesmerter"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Lægehåndbogen skriver \"alder over 55 år\" og \"direkte patella-ømhed\". Det arkiverede evidensregister (KNEE-001) gengiver Ottawa-reglens kriterier som \"55 år eller ældre\" og \"isoleret\" patellaømhed. Originalstudiet er ikke læst ved dette tjek, så ordlyden her følger Lægehåndbogen.",
        kilder: ["lh-knaesmerter"]
      }
    },
    {
      id: "flag-aflaast-knae",
      tekst:
        "Aflåst knæ: vridtraume med efterfølgende udtalt nedsat bevægelighed, typisk låst mellem ca. 30 og 70 graders fleksion (indeklemt menisklæsion).",
      handling: "Akut ortopædkirurgisk vurdering.",
      fremhaevHvis: [
        [
          { felt: "laasning", er: "ja" },
          { felt: "bevaegelighed", er: "svaert" }
        ]
      ],
      kilder: ["lh-meniskskade", "lh-knaesmerter"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Siden om meniskskade skriver \"henvises til akut ortopædkirurgisk vurdering\" ved aflåst knæ (og \"subakut\" artroskopisk behandling). Siden om knæsmerter skriver \"subakut henvisning ved mistanke om instabilitet eller ved aflåsning\".",
        kilder: ["lh-meniskskade", "lh-knaesmerter"]
      }
    },
    {
      id: "flag-akut-ligamentskade",
      tekst:
        "Akut ligamentskade: vridtraume, hvor knæet knækker sammen, evt. med \"pop\" og hæmartron i løbet af få timer (forreste korsbånd), eller valgustraume med akut løshed (mediale kollaterale ligament).",
      handling: "Henvises akut til skadestue.",
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
          { felt: "stabilitet", er: "instabil" }
        ]
      ],
      kilder: ["lh-korsbaand-forreste", "lh-mcl"],
      status: "UDKAST"
    },
    {
      id: "flag-patellaluksation",
      tekst:
        "Akut patellaluksation: knæet \"gik af led\", ofte efter rotation på let flekteret knæ. Patella er som regel reponeret, når patienten ses; da ømhed medialt for patella og oftest hæmartron.",
      handling: "Henvises til skadestue mhp. røntgen og bandagering.",
      kilder: ["lh-patellaluksation"],
      status: "UDKAST"
    },
    {
      id: "flag-stor-akut-skade",
      tekst: "Stor akut knæskade.",
      handling: "Neurologisk og vaskulær status skal indgå i vurderingen.",
      kilder: ["lh-meniskskade"],
      status: "UDKAST"
    },
    {
      id: "flag-septisk-bursit",
      tekst:
        "Bursit med stærke smerter, varme, rødme, kraftig hævelse og feber indikerer septisk bursit. Den vigtigste differentialdiagnose til knæbursit er ansamling og infektion i selve knæleddet.",
      handling:
        "Henvises ved mistanke om septisk bursit. Akut henvisning ved tegn på involvering af hele knæleddet.",
      fremhaevHvis: [[{ felt: "feber", er: "ja" }]],
      kilder: ["lh-bursit", "lh-knaesmerter"],
      status: "UDKAST"
    },
    {
      id: "flag-laeg-haevelse",
      tekst:
        "Akut indsættende hævelse og evt. rødme i øvre læg kan være en bristet Bakers cyste. Er cysten ikke tidligere erkendt, omfatter differentialdiagnoserne DVT og infektion.",
      handling: "Ultralyd kan i tvivlstilfælde stille diagnosen og afkræfte differentialdiagnoser.",
      kilder: ["lh-baker"],
      status: "UDKAST"
    },
    {
      id: "flag-boern",
      tekst:
        "Barn med knæsmerter – diagnostiske faldgruber: hoftelidelse (projicerede smerter), osteosarkom og Ewings sarkom, artralgi pga. leukæmi.",
      handling:
        "Røntgen af hofter bør også rekvireres ved knæsmerter hos børn. MR-scanning ved længerevarende knæsmerter på mistanke om osteochondritis dissecans.",
      kilder: ["lh-knaesmerter"],
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
        "Infektion et andet sted øger sandsynligheden"
      ],
      notat: "Bakteriel artrit mistænkes.",
      kilder: ["lh-artrit-bakteriel"],
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
    }
  ],

  behandling: [],
  henvisning: []
};
