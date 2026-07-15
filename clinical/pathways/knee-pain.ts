import type { ClinicalPathway } from "@/clinical/types";
export const kneePainPathway: ClinicalPathway = {
  id: "knee-pain", title: "Knæsmerter", category: "Muskuloskeletal", version: "0.3.0",
  description: "Kort PSOAP-flow til vurdering og dokumentation af knæsmerter.",
  sections: [
    { id: "problem", title: "Problem", kind: "problem", journalSection: "problem", fields: [
      { id: "side", label: "Side", type: "single-choice", options: [
        { value: "right", label: "Højre", output: "Højresidige knæsmerter." },
        { value: "left", label: "Venstre", output: "Venstresidige knæsmerter." },
        { value: "both", label: "Begge", output: "Bilaterale knæsmerter." }
      ]}
    ]},
    { id: "history", title: "Historie", kind: "history", journalSection: "subjective", fields: [
      { id: "onset", label: "Debut", type: "single-choice", options: [
        { value: "acute", label: "Akut", output: "Akut debut." }, { value: "gradual", label: "Gradvis", output: "Gradvist indsættende." }, { value: "recurrent", label: "Recidiv", output: "Recidiverende gener." }
      ]},
      { id: "duration", label: "Varighed", type: "single-choice", options: [
        { value: "hours", label: "Timer", output: "Varighed timer." }, { value: "days", label: "Dage", output: "Varighed få dage." }, { value: "weeks", label: "Uger", output: "Varighed flere uger." }, { value: "months", label: "Måneder", output: "Varighed flere måneder." }
      ]},
      { id: "trauma", label: "Traume", type: "single-choice", options: [
        { value: "no", label: "Nej", output: "Intet traume." }, { value: "yes", label: "Ja", output: "Forudgående traume." }
      ]},
      { id: "trauma-mechanism", label: "Traumemekanisme", type: "single-choice", visibleWhen: [
        { fieldId: "trauma", operator: "equals", value: "yes" }
      ], options: [
        { value: "twist", label: "Vrid", output: "Traume ved vrid." },
        { value: "fall", label: "Fald", output: "Traume ved fald." },
        { value: "direct", label: "Direkte slag", output: "Direkte traume mod knæ." },
        { value: "other", label: "Andet", output: "Anden traumemekanisme." }
      ]},
      { id: "weight-bearing", label: "Belastning", type: "single-choice", options: [
        { value: "normal", label: "Normal", output: "Kan belaste." }, { value: "reduced", label: "Reduceret", output: "Reduceret belastningsevne." }, { value: "none", label: "Kan ikke støtte", output: "Kan ikke støtte på benet." }
      ]},
      { id: "locking", label: "Låsning", type: "single-choice", options: [
        { value: "no", label: "Nej", output: "Ingen låsning." }, { value: "yes", label: "Ja", output: "Oplever aflåsning." }
      ]},
      { id: "fever", label: "Feber", type: "single-choice", options: [
        { value: "no", label: "Nej", output: "Ingen feber." }, { value: "yes", label: "Ja", output: "Feber." }
      ]},
      { id: "history-note", label: "Supplerende", type: "short-text", placeholder: "Kort supplerende anamnese", output: { suffix: "." } }
    ]},
    {
      id: "trauma-track",
      title: "Traumespor",
      kind: "history",
      journalSection: "subjective",
      visibleWhen: [{ fieldId: "trauma", operator: "equals", value: "yes" }],
      fields: [
        {
          id: "trauma-immediate-swelling",
          label: "Hævelse med det samme",
          type: "single-choice",
          options: [
            { value: "yes", label: "Ja", output: "Hævelse opstod umiddelbart efter traumet." },
            { value: "no", label: "Nej", output: "Ingen umiddelbar hævelse efter traumet." }
          ]
        },
        {
          id: "trauma-heard-pop",
          label: "Hørt/følt knæk",
          type: "single-choice",
          options: [
            { value: "yes", label: "Ja", output: "Hørt eller følt et knæk ved traumet." },
            { value: "no", label: "Nej", output: "Ingen knæklyd eller -følelse ved traumet." }
          ]
        }
      ]
    },
    { id: "objective", title: "Objektivt", kind: "objective", journalSection: "objective", fields: [
      { id: "swelling", label: "Hævelse", type: "single-choice", options: [
        { value: "none", label: "Ingen", output: "Ingen hævelse." }, { value: "mild", label: "Let", output: "Let hævelse." }, { value: "moderate", label: "Moderat", output: "Moderat hævelse." }, { value: "marked", label: "Udtalt", output: "Udtalt hævelse." }
      ]},
      { id: "redness", label: "Rødme", type: "single-choice", options: [ { value: "none", label: "Ingen", output: "Ingen rødme." }, { value: "yes", label: "Ja", output: "Rødme." } ]},
      { id: "warmth", label: "Varme", type: "single-choice", options: [ { value: "none", label: "Ingen", output: "Ingen varmeøgning." }, { value: "yes", label: "Ja", output: "Varmeøgning." } ]},
      { id: "joint-line", label: "Ledlinjeømhed", type: "single-choice", options: [ { value: "none", label: "Ingen", output: "Ingen ledlinjeømhed." }, { value: "medial", label: "Medial", output: "Medial ledlinjeømhed." }, { value: "lateral", label: "Lateral", output: "Lateral ledlinjeømhed." } ]},
      { id: "rom", label: "Bevægelighed", type: "single-choice", options: [ { value: "full", label: "Fuld", output: "Fuld bevægelighed." }, { value: "mild", label: "Let nedsat", output: "Let nedsat bevægelighed." }, { value: "marked", label: "Svært nedsat", output: "Svært nedsat bevægelighed." } ]},
      { id: "stability", label: "Stabilitet", type: "single-choice", options: [ { value: "stable", label: "Stabil", output: "Stabilt ved klinisk ligamenttest." }, { value: "unstable", label: "Instabilitet", output: "Klinisk mistanke om instabilitet." } ]}
    ]},
    { id: "assessment", title: "Vurdering", kind: "assessment", journalSection: "assessment", fields: [
      { id: "assessment", label: "Arbejdsdiagnose", type: "single-choice", options: [
        { value: "oa", label: "Gonartrose", output: "Foreneligt med gonartrose." },
        { value: "meniscus", label: "Meniskrelateret", output: "Foreneligt med meniskrelaterede gener." },
        { value: "pfps", label: "Patellofemoralt", output: "Foreneligt med patellofemoralt smertesyndrom." },
        { value: "ligament", label: "Ligamentskade", output: "Foreneligt med ligamentskade." },
        { value: "overuse", label: "Overbelastning", output: "Foreneligt med overbelastningsrelaterede gener." },
        { value: "tendinopathy", label: "Tendinopati", output: "Foreneligt med periartikulær tendinopati." },
        { value: "bursitis", label: "Bursit", output: "Foreneligt med bursit." },
        { value: "baker", label: "Baker-cyste", output: "Foreneligt med Baker-cyste." },
        { value: "inflammatory", label: "Inflammatorisk", output: "Inflammatorisk ledlidelse bør overvejes." },
        { value: "septic", label: "Septisk artrit", output: "Septisk artrit skal udelukkes akut." },
        { value: "fracture", label: "Frakturmistanke", output: "Fraktur skal overvejes." },
        { value: "referred", label: "Refereret smerte", output: "Refereret smerte fra hofte eller ryg bør overvejes." },
        { value: "nonspecific", label: "Uspecifikke smerter", output: "Uspecifikke knæsmerter uden sikker ætiologi." },
        { value: "uncertain", label: "Uafklaret", output: "Uafklaret ætiologi." }
      ]},
      { id: "differentials", label: "Differentialer", type: "multi-choice", options: [
        { value: "oa", label: "Gonartrose", output: "Differentialdiagnostisk overvejes gonartrose." },
        { value: "meniscus", label: "Menisk", output: "Differentialdiagnostisk overvejes meniskpatologi." },
        { value: "pfps", label: "Patellofemoralt", output: "Differentialdiagnostisk overvejes patellofemoral smertetilstand." },
        { value: "ligament", label: "Ligament", output: "Differentialdiagnostisk overvejes ligamentskade." },
        { value: "inflammatory", label: "Inflammatorisk", output: "Differentialdiagnostisk overvejes inflammatorisk ledlidelse." },
        { value: "referred", label: "Hofte/ryg", output: "Differentialdiagnostisk overvejes refereret smerte fra hofte eller ryg." }
      ]},
      { id: "diagnostic-confidence", label: "Sikkerhed", type: "single-choice", options: [
        { value: "high", label: "Høj", output: "Høj diagnostisk sikkerhed." },
        { value: "medium", label: "Middel", output: "Middel diagnostisk sikkerhed." },
        { value: "low", label: "Lav", output: "Lav diagnostisk sikkerhed; revurdering kan blive nødvendig." }
      ]},
      { id: "assessment-note", label: "Egen vurdering", type: "short-text", placeholder: "Kort klinisk ræsonnering eller nuancering", output: { prefix: "", suffix: "." } }
    ]},
    { id: "plan", title: "Plan", kind: "plan", journalSection: "plan", fields: [
      { id: "plan-actions", label: "Tiltag", type: "multi-choice", options: [
        { value: "information", label: "Information", output: "Information om forventet forløb." }, { value: "exercise", label: "Øvelser", output: "Øvelsesvejledning." }, { value: "analgesia", label: "Smertestillende", output: "Smertestillende efter behov." }, { value: "physio", label: "Fysioterapi", output: "Henvisning til fysioterapi." }, { value: "xray", label: "Røntgen", output: "Røntgen bestilles." }, { value: "follow-up", label: "Kontrol", output: "Kontrol ved manglende bedring." }, { value: "referral", label: "Ortopædkirurgisk henvisning", output: "Henvisning til ortopædkirurgisk vurdering." }
      ]},
      { id: "safety-net", label: "Safety-net", type: "multi-choice", options: [
        { value: "fever", label: "Feber", output: "Kontakt ved feber." }, { value: "worsening", label: "Tiltagende smerter", output: "Kontakt ved tiltagende smerter." }, { value: "no-weight-bearing", label: "Kan ikke støtte", output: "Kontakt ved manglende belastningsevne." }
      ]}
    ]}
  ],
  outputs: [
    {
      id: "journal",
      label: "PSOAP-journal",
      type: "journal",
      generatorId: "core.psoap",
      alwaysActive: true
    },
    {
      id: "physiotherapy-referral",
      label: "Fysioterapihenvisning",
      type: "physiotherapy-referral",
      generatorId: "knee.physiotherapy-referral",
      activeWhen: [{ fieldId: "plan-actions", operator: "includes", value: "physio" }]
    },
    {
      id: "xray-referral",
      label: "Røntgenhenvisning – knæ",
      type: "xray-referral",
      generatorId: "knee.xray-referral",
      activeWhen: [{ fieldId: "plan-actions", operator: "includes", value: "xray" }]
    },
    {
      id: "orthopedic-referral",
      label: "Ortopædkirurgisk henvisning",
      type: "orthopedic-referral",
      generatorId: "knee.orthopedic-referral",
      activeWhen: [{ fieldId: "plan-actions", operator: "includes", value: "referral" }]
    }
  ],
  rules: [
    { id: "possible-septic-arthritis", all: [ { fieldId: "fever", operator: "equals", value: "yes" }, { fieldId: "swelling", operator: "equals", value: "marked" }, { fieldId: "rom", operator: "equals", value: "marked" } ], alert: { severity: "critical", title: "Rødt flag", message: "Septisk artrit skal overvejes ved feber, udtalt hævelse og svært nedsat bevægelighed." } },
    { id: "ottawa-knee", all: [ { fieldId: "trauma", operator: "equals", value: "yes" }, { fieldId: "weight-bearing", operator: "equals", value: "none" } ], alert: { severity: "warning", title: "Billeddiagnostik", message: "Overvej relevansen af Ottawa Knee Rules og akut billeddiagnostik." } },
    { id: "locking-reminder", all: [ { fieldId: "locking", operator: "equals", value: "yes" } ], alert: { severity: "info", title: "Mekaniske symptomer", message: "Afklar reel aflåsning og behov for videre udredning." } }
  ],
  assessmentSuggestions: [
    {
      value: "oa",
      label: "Gonartrose",
      reason: "Atraumatisk, gradvis debut over uger eller måneder passer med et degenerativt mønster.",
      conditions: [
        { fieldId: "trauma", operator: "equals", value: "no" },
        { fieldId: "onset", operator: "equals", value: "gradual" },
        { fieldId: "duration", operator: "equals", value: "months" }
      ]
    },
    {
      value: "meniscus",
      label: "Meniskrelateret",
      reason: "Ledlinjeømhed og mekaniske symptomer kan være forenelige med meniskpatologi.",
      conditions: [
        { fieldId: "locking", operator: "equals", value: "yes" },
        { fieldId: "joint-line", operator: "equals", value: "medial" }
      ]
    },
    {
      value: "ligament",
      label: "Ligamentskade",
      reason: "Traume kombineret med klinisk instabilitet øger relevansen af ligamentskade.",
      conditions: [
        { fieldId: "trauma", operator: "equals", value: "yes" },
        { fieldId: "stability", operator: "equals", value: "unstable" }
      ]
    },
    {
      value: "septic",
      label: "Septisk artrit",
      reason: "Feber, udtalt hævelse og svært nedsat bevægelighed er en akut risikokombination.",
      conditions: [
        { fieldId: "fever", operator: "equals", value: "yes" },
        { fieldId: "swelling", operator: "equals", value: "marked" },
        { fieldId: "rom", operator: "equals", value: "marked" }
      ]
    },
    {
      value: "fracture",
      label: "Frakturmistanke",
      reason: "Traume og manglende belastningsevne kan gøre akut billeddiagnostik relevant.",
      conditions: [
        { fieldId: "trauma", operator: "equals", value: "yes" },
        { fieldId: "weight-bearing", operator: "equals", value: "none" }
      ]
    },
    {
      value: "inflammatory",
      label: "Inflammatorisk",
      reason: "Rødme, varmeøgning og hævelse bør give anledning til inflammatoriske eller infektiøse overvejelser.",
      conditions: [
        { fieldId: "redness", operator: "equals", value: "yes" },
        { fieldId: "warmth", operator: "equals", value: "yes" },
        { fieldId: "swelling", operator: "equals", value: "moderate" }
      ]
    }
  ],
  planRecommendations: [
    {
      assessmentValue: "oa",
      actions: ["information", "exercise", "analgesia", "physio", "follow-up"],
      rationale: "Konservativ behandling er udgangspunktet; billeddiagnostik bør kobles til et konkret klinisk formål."
    },
    {
      assessmentValue: "meniscus",
      actions: ["information", "exercise", "analgesia", "physio", "follow-up"],
      rationale: "Mange atraumatiske meniskrelaterede gener håndteres initialt konservativt med revurdering."
    },
    {
      assessmentValue: "pfps",
      actions: ["information", "exercise", "physio", "follow-up"],
      rationale: "Belastningsstyring, træning og eventuelt fysioterapi er centrale initiale tiltag."
    },
    {
      assessmentValue: "ligament",
      actions: ["information", "analgesia", "physio", "follow-up"],
      rationale: "Planen afhænger af traumemekanisme, instabilitet, funktionsniveau og behov for videre udredning."
    },
    {
      assessmentValue: "overuse",
      actions: ["information", "exercise", "analgesia", "follow-up"],
      rationale: "Belastningsjustering og gradueret genoptræning kan være relevant."
    },
    {
      assessmentValue: "tendinopathy",
      actions: ["information", "exercise", "physio", "follow-up"],
      rationale: "Gradueret belastning og målrettet træning er typiske første tiltag."
    },
    {
      assessmentValue: "bursitis",
      actions: ["information", "analgesia", "follow-up"],
      rationale: "Aflastning, symptomlindring og revurdering kan være relevant afhængigt af årsag."
    },
    {
      assessmentValue: "septic",
      actions: [],
      rationale: "Akut klinisk vurdering og håndtering må ikke erstattes af en standardplan i Cortex."
    },
    {
      assessmentValue: "fracture",
      actions: ["xray"],
      rationale: "Akut billeddiagnostik kan være relevant, men skal vurderes i klinisk kontekst."
    },
    {
      assessmentValue: "uncertain",
      actions: ["information", "follow-up"],
      rationale: "Ved uafklaret ætiologi bør planen afspejle usikkerheden og indeholde tydelig opfølgning."
    }
  ]
};
