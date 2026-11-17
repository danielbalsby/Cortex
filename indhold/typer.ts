// Datamodel for én region. Indholdsfilerne (knae.ts osv.) indeholder kun data
// af disse typer – ingen logik.

export type Status = "UDKAST" | "GODKENDT";

export type Kilde = {
  id: string;
  udgiver: string; // fx "DSAM", "Lægehåndbogen", "SST", "Region Hovedstaden", "NICE"
  dansk: boolean; // false vises som "ikke-dansk kilde"
  titel: string;
  aar: number; // årstal for den version, der er læst
  url: string;
  sidstTjekket: string; // ÅÅÅÅ-MM-DD: hvornår kilden sidst er åbnet og sammenholdt
};

/** Fælles for ethvert klinisk punkt i beslutningsstøtten. */
export type Kildebelagt = {
  kilder: string[]; // kilde-id'er. Tom liste vises som "KILDE MANGLER"
  status: Status; // fødes altid som UDKAST. Kun lægen sætter GODKENDT
  godkendtDato?: string; // ÅÅÅÅ-MM-DD, sættes sammen med GODKENDT
  konflikt?: { beskrivelse: string; kilder: string[] }; // navngiven uenighed mellem kilder
};

/** Alle betingelser i en liste skal passe. */
export type Betingelse = { felt: string; er: string };

export type Valg = {
  id: string;
  label: string; // teksten på knappen
  notat: string; // sætningen, der skrives i notatet
  normal?: true; // normalfund: det, tasten N udfylder (fra trin 3)
};

export type Felt = {
  id: string;
  label: string;
  type: "enkelt" | "flere" | "tekst";
  valg?: Valg[]; // for "enkelt" og "flere"
  pladsholder?: string; // for "tekst"
  visHvis?: Betingelse[]; // feltet vises kun, når betingelserne passer
  kunTilFlag?: true; // feltet bruges kun til røde flag og skrives ikke i notatet (fx alder)
};

export type FeltGruppe = { id: string; titel: string; felter: Felt[] };

export type NotatAfsnit = { overskrift: string; felter: string[] };

export type RoedtFlag = Kildebelagt & {
  id: string;
  tekst: string;
  handling: string;
  // Flaget fremhæves, hvis mindst én af grupperne passer (alle betingelser i gruppen
  // skal passe). Må kun fremhæve, aldrig skjule eller afkræfte.
  fremhaevHvis?: Betingelse[][];
};

export type Differentialdiagnose = Kildebelagt & {
  id: string;
  navn: string;
  kendetegn: string[];
  notat: string; // sætning til V, hvis lægen vælger den
  // Fund, diagnosen er forenelig med (ELLER mellem grupper, OG inden for en gruppe), som kilden beskriver dem.
  // Kun til fremhævning ("Forenelig med dine fund"): ingen score, ingen rangering, intet skjules eller udelukkes.
  foreneligHvis?: Betingelse[][];
};

export type Behandling = Kildebelagt & {
  id: string;
  tekst: string;
  gaelderFor?: string[]; // differentialdiagnose-id'er; udeladt = generelt
  // Diagnoser, hvor punktet er med i "Forslag til plan" (ét tryk tager forslagene med i P).
  // Smallere end gaelderFor: kun det, kilden angiver som første tiltag.
  forslagVed?: string[];
  notat: string; // sætning til P, hvis lægen krydser den af
};

export type Henvisning = Kildebelagt & {
  id: string;
  til: string; // fx "Røntgen", "Fysioterapi", "Ortopædkirurgi", "Akut"
  kriterier: string;
  hast?: "akut" | "subakut" | "elektiv";
  gyldighed: "national" | "Region Hovedstaden";
  gaelderFor?: string[]; // differentialdiagnose-id'er, henvisningen hører til; udeladt = generelt
  // Diagnoser, hvor henvisningen foreslås – men kun når foreslaaHvis passer med lægens fund.
  // Uden foreslaaHvis foreslås henvisningen aldrig automatisk; den vises med sine kriterier.
  forslagVed?: string[];
  foreslaaHvis?: Betingelse[][];
  notat: string; // sætning til P, hvis lægen krydser den af
};

export type Region = {
  id: string;
  navn: string;
  grupper: FeltGruppe[]; // indtastning: rækkefølgen på skærmen
  notat: NotatAfsnit[]; // notatskabelon: rækkefølge og overskrifter i notatet
  kilder: Kilde[];
  roedeFlag: RoedtFlag[];
  differentialdiagnoser: Differentialdiagnose[];
  behandling: Behandling[];
  henvisning: Henvisning[];
};

/** Lægens valg i den aktuelle konsultation. Findes kun i hukommelsen. */
export type Svar = Record<string, string | string[]>;
