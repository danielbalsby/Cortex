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
};

export type FeltGruppe = { id: string; titel: string; felter: Felt[] };

export type NotatAfsnit = { overskrift: string; felter: string[] };

export type RoedtFlag = Kildebelagt & {
  id: string;
  tekst: string;
  handling: string;
  fremhaevHvis?: Betingelse[]; // må kun fremhæve, aldrig skjule eller afkræfte
};

export type Differentialdiagnose = Kildebelagt & {
  id: string;
  navn: string;
  kendetegn: string[];
  notat: string; // sætning til V, hvis lægen vælger den
};

export type Behandling = Kildebelagt & {
  id: string;
  tekst: string;
  gaelderFor?: string[]; // differentialdiagnose-id'er; udeladt = generelt
  notat: string; // sætning til P, hvis lægen krydser den af
};

export type Henvisning = Kildebelagt & {
  id: string;
  til: string; // fx "Røntgen", "Fysioterapi", "Ortopædkirurgi", "Akut"
  kriterier: string;
  hast?: "akut" | "subakut" | "elektiv";
  gyldighed: "national" | "Region Hovedstaden";
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
