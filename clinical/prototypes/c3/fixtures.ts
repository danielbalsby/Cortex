import type { SprintOneOneAction } from "@/clinical/prototypes/sprint-1-1/reducer";

import type { C3PhraseCategory } from "./model";

export const C3_FIXTURE_ID = "C3-FIX-001";
export const C3_FIXTURE_VERSION = "1.1";
export const C3_FIXTURE_SHA256 = "d367710b3ed6decb44e7cdd9e8a2551e423aec05e7590751ba9de69317926ef9";
export const C3_SOURCE_SNAPSHOT = "C3-SRC-KNEE-001";
export const C3_SOURCE_REVISION = "C3-SRC-KNEE-001-R1";

type FixtureFactAction = Extract<
  SprintOneOneAction,
  {
    readonly type:
      | "set-history"
      | "set-objective"
      | "toggle-provocation"
      | "toggle-palpation";
  }
>;

export const C3_KNEE_FACT_ACTIONS: readonly FixtureFactAction[] = [
  { type: "set-history", key: "side", value: "right" },
  { type: "set-history", key: "onset", value: "acute" },
  { type: "set-history", key: "duration", value: "siden i går" },
  { type: "set-history", key: "painCourse", value: "intermittent" },
  { type: "set-history", key: "trauma", value: "yes" },
  { type: "set-history", key: "traumaMechanism", value: "twisting" },
  { type: "set-history", key: "traumaContext", value: "under fodbold" },
  { type: "set-history", key: "painLocation", value: "medial" },
  { type: "toggle-provocation", value: "walking" },
  { type: "toggle-provocation", value: "stairs" },
  { type: "toggle-provocation", value: "rotation" },
  { type: "set-history", key: "function", value: "mildly-reduced" },
  { type: "set-history", key: "swelling", value: "mild" },
  { type: "set-history", key: "swellingTiming", value: "opstået samme aften" },
  { type: "set-history", key: "locking", value: "no" },
  { type: "set-history", key: "instability", value: "no" },
  { type: "set-history", key: "restPain", value: "no" },
  { type: "set-history", key: "nightPain", value: "no" },
  { type: "set-history", key: "fever", value: "no" },
  { type: "set-history", key: "systemicIllness", value: "no" },
  { type: "set-history", key: "redHotSwollenJoint", value: "no" },
  { type: "set-objective", key: "gait", value: "limp" },
  { type: "set-objective", key: "inspection", value: "swelling" },
  { type: "set-objective", key: "extensionDegrees", value: 0 },
  { type: "set-objective", key: "flexionDegrees", value: 110 },
  { type: "set-objective", key: "effusion", value: "mild" },
  { type: "toggle-palpation", value: "medial-joint-line" },
  { type: "toggle-palpation", value: "mcl" },
  { type: "set-objective", key: "lachman", value: "negative" },
  { type: "set-objective", key: "valgus", value: "painful-no-laxity" },
  { type: "set-objective", key: "varus", value: "stable" },
  { type: "set-objective", key: "meniscalTest", value: "positive" },
  { type: "set-objective", key: "patella", value: "negative" },
  { type: "set-objective", key: "neurovascular", value: "normal" }
] as const;

export interface C3PhraseFixture {
  readonly id: string;
  readonly category: C3PhraseCategory;
  readonly text: string;
}

export const C3_PHRASES: readonly C3PhraseFixture[] = [
  { id: "C3-PLAN-001", category: "plan", text: "Fortsat observation af forløbet." },
  { id: "C3-PLAN-002", category: "plan", text: "Belastning tilpasses efter symptomer." },
  { id: "C3-FU-001", category: "follow-up", text: "Ny klinisk vurdering ved vedvarende gener." },
  { id: "C3-FU-002", category: "follow-up", text: "Ny klinisk vurdering ved forværring." },
  { id: "C3-SN-001", category: "safety-net", text: "Søg lægelig vurdering ved forværring." },
  { id: "C3-SN-002", category: "safety-net", text: "Søg akut lægelig vurdering ved feber eller et tiltagende rødt, varmt og hævet knæ." }
] as const;

export const C3_ASSESSMENT_FIXTURE =
  "Traumatisk betingede højresidige knæsmerter med mediale kliniske fund; vurderingen er foreløbig.";

export const C3_EXPECTED_QUICK = "34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går. Mediale, intermitterende smerter og let hævelse. Hævelsen opstod samme aften. Smerterne provokeres ved gang, trappegang og rotation. Funktionsevnen er let nedsat. Ingen ægte aflåsning eller instabilitetsfornemmelse. Ingen hvile- eller nattesmerter. Ingen feber eller almen påvirkning; knæet er ikke registreret som rødt, varmt og akut hævet. Objektivt: haltende gang, synlig hævelse og let effusion. ROM: ekstension 0°, fleksion 110°. Palpationsømhed ved mediale ledlinje og MCL. Smerte uden laksitet ved valgusstres og positiv menisktest. Distal neurovaskulær status normal. Vurdering: Traumatisk betingede højresidige knæsmerter med mediale kliniske fund; vurderingen er foreløbig. Plan: Fortsat observation af forløbet. Opfølgning: Ny klinisk vurdering ved vedvarende gener. Safety-net: Søg lægelig vurdering ved forværring.";

export const C3_EXPECTED_STANDARD = `Anamnese
34-årig mand med akut indsættende højresidige knæsmerter efter vridtraume under fodbold siden i går. Mediale, intermitterende smerter og let hævelse. Hævelsen opstod samme aften. Smerterne provokeres ved gang, trappegang og rotation. Funktionsevnen er let nedsat. Ingen ægte aflåsning eller instabilitetsfornemmelse. Ingen hvile- eller nattesmerter. Ingen feber eller almen påvirkning; knæet er ikke registreret som rødt, varmt og akut hævet.

Objektivt
Haltende gang, synlig hævelse og let effusion. ROM: ekstension 0°, fleksion 110°. Palpationsømhed ved mediale ledlinje og MCL. Lachman negativ, smerte uden laksitet ved valgusstres, varusstres stabil, menisktest positiv og patellatest negativ. Distal neurovaskulær status normal.

Vurdering
Traumatisk betingede højresidige knæsmerter med mediale kliniske fund; vurderingen er foreløbig.

Plan
Plan: Fortsat observation af forløbet. Opfølgning: Ny klinisk vurdering ved vedvarende gener. Safety-net: Søg lægelig vurdering ved forværring.`;
