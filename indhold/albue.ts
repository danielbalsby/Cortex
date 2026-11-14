import type { Region } from "./typer";

// ALBUE
//
// Sådan retter du: se vejledningen øverst i knae.ts – opbygningen er den samme.
//
// Felterne er nye og ikke gennemgået af dig. De følger Lægehåndbogens opdeling
// efter lokalisation (lateral, medial, bagtil, fortil), albue-ekstensionstesten
// efter traume og den neurovaskulære undersøgelse ved fraktur og luksation.
//
// Beslutningsstøtten nederst er UDKAST skrevet 2026-11-14 ud fra de anførte
// sider i Lægehåndbogen, som alle er læst den dag. Region Hovedstaden har ingen
// forløbsbeskrivelse for albue; kun den generelle side om akut monoartrit er brugt.
// Lægehåndbogens oversigt "Albuesmerter" er fra 2019 og "Albueskader" fra 2021.
// Der er ikke fundet en dansk kilde specifikt om distal bicepsseneruptur.
// Kun du sætter "GODKENDT".

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

  kilder: [
    {
      id: "lh-albuesmerter",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Albuesmerter (symptomer og tegn)",
      aar: 2019,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/symptomer-og-tegn/albuesmerter/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-epikondylit",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Epikondylit",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/albue-og-underarm/epikondylit/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-bursitis-olecrani",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Bursitis olecrani",
      aar: 2023,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/fysmed-og-rehab/tilstande-og-sygdomme/albue-og-underarm/bursitis-olecrani/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-ulnarisneuropati",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Ulnarisneuropati",
      aar: 2025,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/neurologi/tilstande-og-sygdomme/neuropatier/ulnarisneuropati/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-albueskader",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Albueskader (frakturer, luksationer, muskel-seneskader)",
      aar: 2021,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knoglebrud/albue/",
      sidstTjekket: "2026-11-14"
    },
    {
      id: "lh-caput-radii",
      udgiver: "Lægehåndbogen",
      dansk: true,
      titel: "Caput radii frakturer",
      aar: 2024,
      url: "https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/ortopaedi/tilstande-og-sygdomme/knoglebrud/caput-radii-frakturer/",
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
      id: "flag-fraktur-luksation",
      tekst:
        "Fraktur eller luksation efter traume (ofte fald på strakt arm): smerter, hævelse/blødning, nedsat bevægelighed og kraft, evt. fejlstilling. Ved posterior luksation: betydelige smerter, forkortet underarm, olecranon prominerer bagtil. Albue-ekstensionstest: ved bilateral fuld ekstension er fraktur usandsynlig; ved reduceret ekstension røntgen.",
      handling:
        "Den akutte behandling kræver henvisning til akutmodtagelsen. Undersøg også skulder og håndled.",
      fremhaevHvis: [
        [{ felt: "fejlstilling", er: "ja" }],
        [{ felt: "ekstensionstest", er: "nedsat" }],
        [{ felt: "caputradii", er: "oem" }]
      ],
      kilder: ["lh-albueskader", "lh-caput-radii"],
      status: "UDKAST"
    },
    {
      id: "flag-neurovaskulaer",
      tekst:
        "Neurovaskulær påvirkning ved fraktur eller luksation: undersøg a. brachialis (puls ved håndleddet), n. ulnaris, n. medianus og n. radialis (drophånd).",
      handling: "Akut henvisning til akutmodtagelsen.",
      fremhaevHvis: [[{ felt: "neurovaskulaer", er: "paavirket" }]],
      kilder: ["lh-albueskader"],
      status: "UDKAST"
    },
    {
      id: "flag-muskelsene",
      tekst:
        "Muskel-seneskade efter hyperekstensions- eller hyperfleksionstraume: muskeldiskonfiguration og nedsat kraft. Totale læsioner behandles oftest operativt; tidlig diagnose og behandling er nødvendig for at undgå komplikationer.",
      handling: "Akutmodtagelsen (akut del); ved sen diagnose ortopædkirurgisk ambulatorium.",
      fremhaevHvis: [[{ felt: "mekanisme", er: "hyper" }]],
      kilder: ["lh-albueskader"],
      status: "UDKAST"
    },
    {
      id: "flag-septisk",
      tekst:
        "Septisk artrit eller hæmartrose efter traume: varmt, rødt, hævet led, feber eller medtaget almentilstand. Bakteriel infektion kræver akut behandling, ofte med kirurgisk intervention.",
      handling:
        "Hurtig henvisning til sygehus (Region Hovedstaden: ved mistanke om septisk artrit akut indlæggelse i ortopædkirurgisk regi via CVI). Ved mistanke om bakteriel infektion sendes bursa- eller ledvæske til dyrkning.",
      fremhaevHvis: [[{ felt: "roedme", er: "ja" }, { felt: "haevelse", er: "led" }]],
      kilder: ["lh-albuesmerter", "rh-monoartrit"],
      status: "UDKAST"
    },
    {
      id: "flag-septisk-bursit",
      tekst:
        "Septisk bursitis olecrani hos patient med albueprotese eller reumatoid artrit (ofte kommunikation til leddet), eller hos patient der er almen påvirket eller septisk, eller med sår eller fistel over bursa.",
      handling: "Henvis til ortopædkirurgisk afdeling – behandles som septisk artrit / proteseinfektion af specialist.",
      fremhaevHvis: [
        [{ felt: "disposition", er: "protese" }, { felt: "haevelse", er: "bursa" }],
        [{ felt: "disposition", er: "ra" }, { felt: "haevelse", er: "bursa" }],
        [{ felt: "roedme", er: "ja" }, { felt: "haevelse", er: "bursa" }]
      ],
      kilder: ["lh-bursitis-olecrani"],
      status: "UDKAST"
    },
    {
      id: "flag-faldgruber",
      tekst:
        "Diagnostiske faldgruber: fraktur og brusklæsion efter traume; skader i nakke, skulder og håndled kan vise sig som albuesmerter; tumor kan give irritation af nerver.",
      handling: "Undersøg også cervikalcolumna og resten af overekstremiteten; overvej røntgen efter traume.",
      kilder: ["lh-albuesmerter", "lh-epikondylit"],
      status: "UDKAST"
    }
  ],

  differentialdiagnoser: [
    {
      id: "diff-lateral-epikondylit",
      navn: "Lateral epikondylit (tennisalbue)",
      kendetegn: [
        "Hyppigste årsag til overbelastningsrelaterede albuesmerter",
        "Smerter lateralt med udstråling mod håndleddet; besvær med at skænke og løfte",
        "Distinkt ømhed fortil på laterale epikondyl; smerter ved isometrisk ekstension og radial deviation af håndleddet med strakt albue og åben hånd",
        "Ingen hævelse; passiv bevægelighed som regel normal",
        "De fleste er gode igen inden for 8–13 måneder"
      ],
      notat: "Foreneligt med lateral epikondylit.",
      kilder: ["lh-epikondylit", "lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-medial-epikondylit",
      navn: "Medial epikondylit (golfalbue)",
      kendetegn: [
        "Overbelastning; smerter medialt, hvor underarmens fleksorer udspringer",
        "Ømhed over mediale epikondyl; smerter ved isometrisk fleksion af håndleddet med strakt albue"
      ],
      notat: "Foreneligt med medial epikondylit.",
      kilder: ["lh-epikondylit", "lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-bursit",
      navn: "Bursitis olecrani (aseptisk eller septisk)",
      kendetegn: [
        "Hævet, væskefyldt bursa over olecranon",
        "Septisk: ømhed, smerter, rødme, evt. almensymptomer; oftest Staphylococcus aureus",
        "Tendens til recidiv ved tryk mod hårdt underlag; ved kroniske tilfælde 'gryn' i bursa"
      ],
      notat: "Foreneligt med bursitis olecrani.",
      kilder: ["lh-bursitis-olecrani", "lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-ulnaris",
      navn: "Ulnarisneuropati",
      kendetegn: [
        "Paræstesier og nedsat sensibilitet i 4. og 5. finger",
        "Nedsat kraft ved adduktion af 1. finger og abduktion af 5. finger; i udtalte tilfælde klohånd",
        "Ømhed eller positivt Tinels tegn over sulcus n. ulnaris",
        "Symptomerne kan også stamme fra cervikal radikulopati eller thoracic outlet syndrom"
      ],
      notat: "Foreneligt med ulnarisneuropati.",
      kilder: ["lh-ulnarisneuropati", "lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-radialis",
      navn: "Kompression af n. radialis (radialt tunnelsyndrom / supinatorsyndrom)",
      kendetegn: [
        "Sjælden; udstrålende smerter til dorsale underarm, ofte også i hvile og om natten",
        "Smerter ved supination mod modstand; evt. nedsat dorsalfleksionskraft over håndled og fingrenes grundled",
        "Fejldiagnosticeres ofte som lateral epikondylit"
      ],
      notat: "Kompression af n. radialis overvejes.",
      kilder: ["lh-albuesmerter", "lh-epikondylit"],
      status: "UDKAST"
    },
    {
      id: "diff-caput-radii",
      navn: "Caput radii fraktur",
      kendetegn: [
        "Fald på strakt arm med underarmen i pronation; hyppigste albuefraktur hos voksne (30 %)",
        "Smerter lateralt og ved rotation; hævelse og hæmatom lateralt; palpationsømhed over caput radii",
        "Undersøg også håndleddet (associerede skader, Essex-Lopresti)"
      ],
      notat: "Caput radii fraktur mistænkes.",
      kilder: ["lh-caput-radii"],
      status: "UDKAST"
    },
    {
      id: "diff-fraktur-luksation",
      navn: "Anden albuefraktur eller albueluksation",
      kendetegn: [
        "Distal humerus, capitulum, olecranon, processus coronoideus, collum radii",
        "Luksation: hyppigst posterior; se efter samtidig fraktur af coronoideus, caput/collum radii og olecranon",
        "Hos ældre ofte lav-energi traume, hos yngre høj-energi"
      ],
      notat: "Albuefraktur eller luksation mistænkes.",
      kilder: ["lh-albueskader"],
      status: "UDKAST"
    },
    {
      id: "diff-brusk",
      navn: "Bruskskade / osteochondritis dissecans / løst legeme",
      kendetegn: [
        "Stivhed, klikken, låsninger og laterale smerter, især ved valgusbelastning (kast)",
        "Osteochondritis dissecans: som regel 15–20 år",
        "Kan være svær at skelne fra lateral epikondylit"
      ],
      notat: "Intraartikulær bruskskade overvejes.",
      kilder: ["lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-biceps-tendinose",
      navn: "Biceps tendinose",
      kendetegn: [
        "Forreste albuesmerter efter gentagne albuefleksioner og supinationer",
        "Ømhed over distale bicepssene; smerter ved fleksion og supination mod modstand; evt. nedsat supinationskraft"
      ],
      notat: "Foreneligt med distal biceps tendinose.",
      kilder: ["lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "diff-medial-ligament",
      navn: "Medial ligamentskade (ulnare kollateralligament)",
      kendetegn: [
        "Kastere (fx håndbold); vage mediale smerter, værre ved aktivitet",
        "Smerte eller instabilitet ved valguspres og pronation"
      ],
      notat: "Medial ligamentskade overvejes.",
      kilder: ["lh-albuesmerter", "lh-epikondylit"],
      status: "UDKAST"
    },
    {
      id: "diff-henfoert",
      navn: "Henført smerte (cervikal radikulopati, skulder, håndled)",
      kendetegn: ["C7-radikulopati er differentialdiagnose til lateral epikondylit", "Karpaltunnelsyndrom bør også overvejes"],
      notat: "Henført smerte overvejes.",
      kilder: ["lh-epikondylit", "lh-albuesmerter"],
      status: "UDKAST"
    }
  ],

  behandling: [
    {
      id: "beh-generelt",
      tekst:
        "Undgå aktivitet, der giver smerter – specielt den belastning, der udløste dem. Is kan forsøges ved stærkere smerter. NSAID ved tendinit eller artrit er mest effektivt i den akutte fase. Billeddiagnostik er som regel ikke indiceret undtagen efter traume eller ved aflåsninger.",
      notat: "Rådgivet om aflastning af smertegivende aktivitet.",
      kilder: ["lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "beh-epik-aflastning-traening",
      tekst:
        "Epikondylit: aflastning (tilpasning af arbejde; håndledsortose ved stærke akutte smerter), aktive øvelser inden for smertegrænsen, udspænding og styrketræning. Excentrisk træning af håndleddets ekstensorer ved lateral epikondylit kan give smertereduktion og øget styrke (fx progressivt program over 24 uger). Bandage og tape har sparsom dokumentation.",
      gaelderFor: ["diff-lateral-epikondylit", "diff-medial-epikondylit"],
      notat: "Rådgivet om aflastning. Instrueret i excentriske øvelser og udspænding.",
      kilder: ["lh-epikondylit"],
      status: "UDKAST"
    },
    {
      id: "beh-epik-nsaid",
      tekst:
        "NSAID kan lindre i den akutte fase, men har ikke bedre effekt end placebo på opheling efter 4 uger. Lokal NSAID-salve kan give lindring ved korttidsbehandling.",
      gaelderFor: ["diff-lateral-epikondylit", "diff-medial-epikondylit"],
      notat: "NSAID kortvarigt, evt. som salve.",
      kilder: ["lh-epikondylit"],
      status: "UDKAST"
    },
    {
      id: "beh-epik-steroid",
      tekst:
        "Glukokortikoidinjektion (med lidokain) tenoperiostealt: bedre korttidseffekt, men dårligere prognose på længere sigt og mange recidiver. Kontrol efter ca. 10 dage. Højst tre injektioner samme sted på et år.",
      gaelderFor: ["diff-lateral-epikondylit", "diff-medial-epikondylit"],
      notat: "Glukokortikoidinjektion ved epikondyl. Kontrol om ca. 10 dage.",
      kilder: ["lh-epikondylit"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Samme side i Lægehåndbogen: resuméet anbefaler glukokortikoidinjektion ved længerevarende symptomer, mens behandlingsafsnittet gengiver en metaanalyse og et randomiseret studie med dårligere langtidsprognose og mange recidiver, og \"maner til forsigtighed\".",
        kilder: ["lh-epikondylit"]
      }
    },
    {
      id: "beh-epik-ikke",
      tekst: "Chokbølgebehandling, elektroterapi, ultralyd og injektion med blodpladekoncentrat har ikke dokumenteret effekt ved epikondylit.",
      gaelderFor: ["diff-lateral-epikondylit", "diff-medial-epikondylit"],
      notat: "Ikke indikation for chokbølge eller blodpladekoncentrat.",
      kilder: ["lh-epikondylit"],
      status: "UDKAST"
    },
    {
      id: "beh-bursit-aseptisk",
      tekst:
        "Aseptisk bursitis olecrani: trykaflastning (albuebeskytter, skift arbejdsstilling), let komprimerende bind, evt. NSAID lokalt eller systemisk. Aspiration og steroidinjektion frarådes pga. risiko for infektion; aspiration kan dog være indiceret for at skelne aseptisk fra septisk. Kræver ikke opfølgning.",
      gaelderFor: ["diff-bursit"],
      notat: "Rådgivet om trykaflastning og let kompression. Søg læge ved feber.",
      kilder: ["lh-bursitis-olecrani"],
      status: "UDKAST"
    },
    {
      id: "beh-bursit-septisk",
      tekst:
        "Septisk bursitis olecrani hos patient, der ikke er almen påvirket eller septisk: tablet dicloxacillin 1 g × 4 dagligt i 10 dage (agens oftest Staphylococcus aureus).",
      gaelderFor: ["diff-bursit"],
      notat: "Dicloxacillin 1 g × 4 i 10 dage for septisk bursitis olecrani.",
      kilder: ["lh-bursitis-olecrani"],
      status: "UDKAST"
    },
    {
      id: "beh-ulnaris",
      tekst: "Ulnarisneuropati: aflastning af albue og håndled, særligt ved skrivebordsarbejde; undgå direkte tryk. Behandles ikke medicinsk.",
      gaelderFor: ["diff-ulnaris"],
      notat: "Rådgivet om aflastning af albue og håndled.",
      kilder: ["lh-ulnarisneuropati"],
      status: "UDKAST"
    },
    {
      id: "beh-caput-radii",
      tekst:
        "Caput radii fraktur (konservativt behandlet): armslynge 1–2 uger og tidlig bevægetræning inden for smertegrænsen. Informér om, at selv mindre, udislocerede frakturer kan give bevægeindskrænkning; evt. fysioterapeut. Bevægeligheden kan bedres de første 6–9 måneder; forvent 6–12 måneder til restitution. Råd om anmeldelse til ulykkesforsikring.",
      gaelderFor: ["diff-caput-radii"],
      notat: "Informeret om flittig bevægetræning. Rådgivet om anmeldelse til ulykkesforsikring.",
      kilder: ["lh-caput-radii"],
      status: "UDKAST"
    },
    {
      id: "beh-efterforloeb",
      tekst:
        "Efterforløb efter albuefraktur, luksation eller opereret muskel-seneskade: ved smerter og let til moderat stivhed kan fys-/ergoterapi forsøges. Træning og tålmodighed – funktion kan vindes langt hen i forløbet.",
      gaelderFor: ["diff-fraktur-luksation", "diff-caput-radii"],
      notat: "Henvist til fys-/ergoterapi mhp. bevægetræning.",
      kilder: ["lh-albueskader"],
      status: "UDKAST"
    }
  ],

  henvisning: [
    {
      id: "hen-akut-traume",
      til: "Akutmodtagelsen",
      kriterier:
        "Albuetraume med mistanke om fraktur, luksation eller muskel-seneskade (den akutte del af behandlingen). Røntgen ved reduceret ekstension eller anden frakturmistanke.",
      hast: "akut",
      gyldighed: "national",
      notat: "Henvist akut til akutmodtagelsen efter albuetraume.",
      kilder: ["lh-albueskader", "lh-caput-radii"],
      status: "UDKAST"
    },
    {
      id: "hen-septisk",
      til: "Akut indlæggelse (ortopædkirurgi via CVI)",
      kriterier: "Mistanke om septisk artrit; hæmartrose efter traume kræver også hurtig henvisning til sygehus.",
      hast: "akut",
      gyldighed: "Region Hovedstaden",
      notat: "Henvist akut mhp. septisk artrit.",
      kilder: ["rh-monoartrit", "lh-albuesmerter"],
      status: "UDKAST"
    },
    {
      id: "hen-bursit",
      til: "Ortopædkirurgisk afdeling (bursitis olecrani)",
      kriterier:
        "Septisk: albueprotese eller reumatoid artrit, almen påvirket eller septisk, sår eller fistel over bursa, eller manglende effekt af antibiotika. Aseptisk: kun ved langvarig (måneder) behandlingsresistent bursit med væsentlige gener – vær opmærksom på komorbiditet og rygning, der øger risikoen for komplikationer.",
      hast: "subakut",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurgisk afdeling mhp. bursitis olecrani.",
      kilder: ["lh-bursitis-olecrani"],
      status: "UDKAST"
    },
    {
      id: "hen-epikondylit",
      til: "Ortopædkirurgi",
      kriterier: "Epikondylit med fortsat uacceptable gener efter nogle måneder.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurgisk vurdering mhp. epikondylit.",
      kilder: ["lh-epikondylit"],
      status: "UDKAST"
    },
    {
      id: "hen-ulnaris",
      til: "Neurolog",
      kriterier:
        "Vedvarende symptomer, særligt kraftnedsættelse, eller bestående sensibilitetstab eller parese. Operation (neuro- eller ortopædkirurg) med tilbageholdenhed pga. ringe succesrate.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til neurolog mhp. ulnarisneuropati.",
      kilder: ["lh-ulnarisneuropati"],
      status: "UDKAST"
    },
    {
      id: "hen-caput-radii-sen",
      til: "Albuespecialist / ortopædkirurgisk afdeling",
      kriterier:
        "Efter caput radii fraktur: aflåsninger af albuen, eller vedvarende bevægebegrænsning og smerter (mulig artroskopisk løsning af arvæv).",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurgisk vurdering efter caput radii fraktur.",
      kilder: ["lh-caput-radii"],
      status: "UDKAST",
      konflikt: {
        beskrivelse:
          "Samme side i Lægehåndbogen: resuméet og henvisningsafsnittet siger \"tidligst efter 6 måneder\", mens afsnittet om håndtering i almen praksis siger \"hvis der er smerter og nedsat bevægelighed efter 9 måneder\".",
        kilder: ["lh-caput-radii"]
      }
    },
    {
      id: "hen-komplikationer",
      til: "Ortopædkirurgisk ambulatorium",
      kriterier:
        "Sen diagnose af albueskade, eller komplikationer: moderat til svær stivhed, kronisk ustabilt led, aflåsninger og tiltagende smerter.",
      hast: "elektiv",
      gyldighed: "national",
      notat: "Henvist til ortopædkirurgisk ambulatorium mhp. komplikationer efter albueskade.",
      kilder: ["lh-albueskader"],
      status: "UDKAST"
    }
  ]
};
