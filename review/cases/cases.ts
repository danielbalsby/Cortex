// Fiktive konsultationer til regressionstest. Ingen rigtige patienter.
// `trin` anvendes i rækkefølge via saetSvar – præcis som når lægen klikker,
// så skjulte felter ryddes på samme måde som i appen.

export type Case = {
  id: string;
  region: "skulder" | "albue" | "ryg" | "knae" | "ankel";
  titel: string;
  type: "ukompliceret" | "rødt flag" | "rødt flag, kan ikke registreres" | "ret undervejs" | "patientdata";
  trin: [felt: string, vaerdi: string | string[]][];
  valgte?: string[]; // differentialdiagnoser (V), behandling/henvisning (P)
};

export const CASES: Case[] = [
  // ---------- Skulder ----------
  {
    id: "skulder-1-impingement",
    region: "skulder",
    titel: "Højresidige skuldersmerter i uger ved overbelastning, positiv smertebue",
    type: "ukompliceret",
    trin: [
      ["side", "hoejre"], ["alder", "40til75"], ["debut", "overbelastning"], ["varighed", "uger"],
      ["nat", "liggende"], ["luksationer", "nej"], ["nakke", "nej"], ["arbejde", "ja"],
      ["fejlstilling", "nej"], ["aktiv", "fuld"], ["passiv", "fuld"], ["smertebue", "pos"],
      ["impingement", "pos"], ["kraft", "normal"], ["acled", "uoemt"]
    ],
    valgte: ["diff-impingement", "beh-traening", "beh-analgetika"]
  },
  {
    id: "skulder-2-traumatisk-cuff",
    region: "skulder",
    titel: "Fald på skulderen for få dage siden, nedsat udadrotationskraft",
    type: "rødt flag",
    trin: [
      ["side", "venstre"], ["alder", "40til75"], ["debut", "traume"], ["traumetype", "fald"], ["varighed", "dage"],
      ["fejlstilling", "nej"], ["axillaris", "normal"], ["aktiv", "nedsat"], ["passiv", "fuld"], ["kraft", "udad"]
    ],
    valgte: ["diff-traumatisk-cuff", "hen-traume-roentgen", "hen-ul"]
  },
  {
    id: "skulder-3-septisk-kan-ikke-registreres",
    region: "skulder",
    titel: "Ældre med spontane hvilesmerter og nedsat bevægelighed; feber nævnt i fritekst",
    type: "rødt flag, kan ikke registreres",
    trin: [
      ["side", "hoejre"], ["alder", "over75"], ["debut", "spontan"], ["varighed", "dage"], ["nat", "hvile"],
      ["anamnese-tekst", "Feber siden i går"], ["aktiv", "nedsat"], ["passiv", "nedsat"]
    ]
  },
  {
    id: "skulder-4-venstresidig-uden-mekanisk-fund",
    region: "skulder",
    titel: "Venstresidige skuldersmerter i hvile, normal objektiv skulderundersøgelse (henført smerte?)",
    type: "rødt flag, kan ikke registreres",
    trin: [
      ["side", "venstre"], ["alder", "40til75"], ["debut", "spontan"], ["varighed", "dage"], ["nat", "hvile"],
      ["nakke", "nej"], ["aktiv", "fuld"], ["passiv", "fuld"], ["smertebue", "neg"], ["impingement", "neg"],
      ["kraft", "normal"], ["acled", "uoemt"]
    ]
  },

  // ---------- Albue ----------
  {
    id: "albue-1-lateral-epikondylit",
    region: "albue",
    titel: "Laterale albuesmerter i uger ved overbelastning",
    type: "ukompliceret",
    trin: [
      ["side", "hoejre"], ["debut", "overbelastning"], ["lokalisation", "lateral"], ["varighed", "uger"],
      ["paraestesier", "nej"], ["haevelse", "ingen"], ["bevaegelighed", "normal"], ["epikondyl", "lateral"],
      ["isometrisk", "ekstension"], ["ulnaris", "normal"]
    ],
    valgte: ["diff-lateral-epikondylit", "beh-epik-aflastning-traening"]
  },
  {
    id: "albue-2-fald-caput-radii",
    region: "albue",
    titel: "Fald på strakt arm, nedsat ekstension, øm caput radii",
    type: "rødt flag",
    trin: [
      ["side", "venstre"], ["debut", "traume"], ["mekanisme", "fald"], ["lokalisation", "lateral"], ["varighed", "dage"],
      ["fejlstilling", "nej"], ["haevelse", "led"], ["ekstensionstest", "nedsat"], ["caputradii", "oem"],
      ["neurovaskulaer", "normal"]
    ],
    valgte: ["diff-caput-radii", "hen-akut-traume"]
  },
  {
    id: "albue-3-septisk-bursit-ra",
    region: "albue",
    titel: "Reumatoid artrit, rød hævelse over olecranon",
    type: "rødt flag",
    trin: [
      ["side", "hoejre"], ["debut", "spontan"], ["lokalisation", "bagtil"], ["varighed", "dage"],
      ["disposition", ["ra"]], ["haevelse", "bursa"], ["roedme", "ja"]
    ],
    valgte: ["diff-bursit", "hen-bursit"]
  },

  // ---------- Ryg ----------
  {
    id: "ryg-1-uspecifik",
    region: "ryg",
    titel: "Akutte lændesmerter efter løft, ingen udstråling",
    type: "ukompliceret",
    trin: [
      ["udbredning", "laend"], ["debut", "akut"], ["varighed", "dage"], ["tidligere", "lignende"], ["cauda", "nej"],
      ["almen", "upaavirket"], ["holdning", "normal"], ["bevaegelighed", "nedsat"], ["lasegue", "neg"],
      ["kraft", "normal"], ["reflekser", "normale"], ["sensibilitet", "normal"]
    ],
    valgte: ["diff-uspecifik", "beh-aktivitet", "beh-medicin-akut"]
  },
  {
    id: "ryg-2-cauda",
    region: "ryg",
    titel: "Bilateral udstråling under knæet, blæregener, nedsat sensibilitet i ridebukseområdet",
    type: "rødt flag",
    trin: [
      ["udbredning", "underknae"], ["udstraalingsside", "begge"], ["debut", "gradvis"], ["varighed", "dage"],
      ["cauda", "ja"], ["almen", "upaavirket"], ["lasegue", "krydset"], ["kraft", "s1"], ["reflekser", "achilles"],
      ["sensibilitet", "ridebukse"], ["rektal", "nedsat"]
    ],
    valgte: ["diff-cauda", "hen-cauda"]
  },
  {
    id: "ryg-3-malignitet",
    region: "ryg",
    titel: "Tidligere kræft, vægttab, konstante smerter anderledes end før",
    type: "rødt flag",
    trin: [
      ["udbredning", "laend"], ["debut", "ukendt"], ["varighed", "6til12"], ["tidligere", "anderledes"], ["cauda", "nej"],
      ["roedeflag", ["kraeft", "vaegttab", "konstant"]], ["almen", "upaavirket"]
    ],
    valgte: ["diff-malignitet", "beh-blodprover", "hen-infektion-malignitet"]
  },
  {
    id: "ryg-4-ret-undervejs",
    region: "ryg",
    titel: "Udstråling under knæet registreres, rettes derefter til kun lænd",
    type: "ret undervejs",
    trin: [
      ["udbredning", "underknae"], ["udstraalingsside", "hoejre"], ["hoste", "ja"], ["debut", "akut"],
      ["udbredning", "laend"] // skjuler udstrålingsside og hoste – svarene ryddes uden besked
    ]
  },

  // ---------- Knæ ----------
  {
    id: "knae-1-degenerativ",
    region: "knae",
    titel: "Gradvise mediale knæsmerter i måneder uden traume",
    type: "ukompliceret",
    trin: [
      ["side", "hoejre"], ["debut", "gradvis"], ["varighed", "maaneder"], ["traume", "nej"], ["belastning", "normal"],
      ["laasning", "nej"], ["feber", "nej"], ["haevelse", "ingen"], ["roedme", "ingen"], ["varme", "ingen"],
      ["ledlinje", "medial"], ["bevaegelighed", "fuld"], ["stabilitet", "stabil"]
    ],
    valgte: ["diff-menisk", "beh-menisk-fys"]
  },
  {
    id: "knae-2-vridtraume",
    region: "knae",
    titel: "Vridtraume med straks hævelse og instabilitet (scenarie A)",
    type: "rødt flag",
    trin: [
      ["side", "venstre"], ["debut", "akut"], ["varighed", "dage"], ["traume", "ja"], ["traumemekanisme", "vrid"],
      ["haevelse-straks", "ja"], ["knaek", "ja"], ["alder", "12til50"], ["belastning", "reduceret"],
      ["haevelse", "moderat"], ["stabilitet", "instabil"], ["patellaoemhed", "nej"], ["fibulaoemhed", "nej"],
      ["fleksion90", "ja"], ["skridt", "ja"], ["benloeft", "ja"]
    ],
    valgte: ["diff-acl", "hen-akut-traume"]
  },
  {
    id: "knae-3-septisk",
    region: "knae",
    titel: "Akut varmt, rødt knæ med feber (scenarie C)",
    type: "rødt flag",
    trin: [
      ["side", "hoejre"], ["debut", "akut"], ["varighed", "dage"], ["traume", "nej"], ["feber", "ja"],
      ["haevelse", "moderat"], ["roedme", "ja"], ["varme", "ja"], ["bevaegelighed", "let"]
    ],
    valgte: ["diff-bakteriel-artrit", "hen-septisk"]
  },
  {
    id: "knae-4-barn-uden-traume",
    region: "knae",
    titel: "Barn med gradvise knæsmerter uden traume (alder kan ikke registreres)",
    type: "rødt flag, kan ikke registreres",
    trin: [
      ["side", "hoejre"], ["debut", "gradvis"], ["varighed", "uger"], ["traume", "nej"],
      ["anamnese-tekst", "Barn, halter"], ["haevelse", "ingen"], ["ledlinje", "ingen"], ["bevaegelighed", "fuld"]
    ]
  },
  {
    id: "knae-5-ret-traume",
    region: "knae",
    titel: "Traumefelter udfyldes, traume rettes derefter til nej",
    type: "ret undervejs",
    trin: [
      ["traume", "ja"], ["traumemekanisme", "fald"], ["alder", "over55"], ["patellaoemhed", "ja"], ["skridt", "nej"],
      ["traume", "nej"] // fraktursvarene ryddes uden besked, og fraktur-flaget mister fremhævningen
    ]
  },
  {
    id: "knae-6-cpr-i-fritekst",
    region: "knae",
    titel: "Navn og CPR skrevet ved en fejl i fritekst (fiktive data)",
    type: "patientdata",
    trin: [["side", "hoejre"], ["anamnese-tekst", "Jens Hansen 010100-0000"]]
  },

  // ---------- Ankel ----------
  {
    id: "ankel-1-distorsion",
    region: "ankel",
    titel: "Inversionstraume, går, ingen knogleømhed",
    type: "ukompliceret",
    trin: [
      ["side", "hoejre"], ["mekanisme", "inversion"], ["varighed", "dage"], ["skridt-straks", "ja"], ["tidligere", "nej"],
      ["skridt-nu", "ja"], ["fejlstilling", "nej"], ["neurovaskulaer", "normal"], ["haevelse", "lateral"],
      ["malleol", "ingen"], ["mellemfod", "ingen"], ["fibula", "uoem"], ["ledbaand", "oem"], ["syndesmose", "uoem"],
      ["akilles", "normal"]
    ],
    valgte: ["diff-distorsion", "beh-distorsion"]
  },
  {
    id: "ankel-2-ottawa-positiv",
    region: "ankel",
    titel: "Inversionstraume med knogleømhed over laterale malleol",
    type: "rødt flag",
    trin: [
      ["side", "venstre"], ["mekanisme", "inversion"], ["varighed", "timer"], ["skridt-straks", "nej"],
      ["skridt-nu", "ja"], ["haevelse", "lateral"], ["malleol", "lateral"]
    ],
    valgte: ["diff-fraktur", "hen-samme-dag"]
  },
  {
    id: "ankel-3-akilles",
    region: "ankel",
    titel: "Smæld i læggen ved afsæt, positiv Thompson",
    type: "rødt flag",
    trin: [["side", "hoejre"], ["mekanisme", "smaeld"], ["varighed", "timer"], ["skridt-nu", "ja"], ["akilles", "positiv"]],
    valgte: ["diff-akilles", "beh-akilles-skinne", "hen-samme-dag"]
  },
  {
    id: "ankel-4-artrit-kan-ikke-registreres",
    region: "ankel",
    titel: "Rød, varm ankel uden traume; artrit kan ikke registreres i felterne",
    type: "rødt flag, kan ikke registreres",
    trin: [
      ["side", "hoejre"], ["mekanisme", "andet"], ["varighed", "dage"], ["anamnese-tekst", "Ingen traume"],
      ["haevelse", "udtalt"]
    ]
  }
];
