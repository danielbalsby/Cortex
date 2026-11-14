# Cortex MSK – plan

Dato: 2026-11-13 · Forudsætter `docs/review.md` · Status: **godkendt 2026-11-14**. Trin 1–3 er udført; næste er trin 4.

## 1. Målbillede

Én side. Fem regioner. Venstre side er indtastning, højre side er notat øverst og beslutningsstøtte nederst. Alt kan betjenes fra tastaturet.

### Brugerflow
1. Åbn Cortex. Fokus står på regionsvalget.
2. Tryk `1`–`5` (skulder, albue, ryg, knæ, ankel). Regionens felter, tomme notat og beslutningsstøtte vises med det samme. Beslutningsstøtten er brugbar allerede her – den kræver ingen indtastning.
3. Første felt er aktivt. Tryk et tal for at vælge en mulighed; fokus hopper selv til næste felt. `Tab`/`↓` springer over, `↑` går tilbage, samme tal igen fravælger.
4. Ved objektiv undersøgelse: `N` udfylder de fund, du ikke har angivet, med regionens normalværdier. Det er en aktiv handling, og notatet skriver de konkrete fund ud – aldrig "intet abnormt".
5. Notatet til højre opdateres ved hvert valg. Kun det, du har valgt, står der.
6. Valgfrit: markér en differentialdiagnose som arbejdsdiagnose og kryds behandlingspunkter af; så skrives Vurdering og Plan ind i notatet med punkternes egne formuleringer.
7. `Ctrl/⌘+Enter` kopierer notatet. Indsæt i journalsystemet.
8. `Esc` to gange nulstiller. Genindlæsning nulstiller også. Intet gemmes.

Hastighedsmål: regionsvalg → røde flag og henvisningskriterier på skærmen: 1 tastetryk. Regionsvalg → kopieret notat for en ukompliceret patient: ca. 8–12 tastetryk. "Under 10 sekunder" forstår jeg som tid til første brugbare output, ikke til et færdigt notat i en kompliceret sag.

### Skærmskitse
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ CORTEX   [1 Skulder] [2 Albue] [3 Ryg] [4 KNÆ] [5 Ankel]      Esc Esc = ryd  │
├───────────────────────────────────┬──────────────────────────────────────────┤
│ ANAMNESE                          │ NOTAT                 [Kopiér  Ctrl+⏎]   │
│ ▸ Side      1 Højre 2 Venstre 3 B │ ┌──────────────────────────────────────┐ │
│   Debut     1 Akut 2 Gradvis 3 Re │ │ S: Højresidige knæsmerter. Gradvis   │ │
│   Varighed  1 Dage 2 Uger 3 Mdr   │ │ debut, varighed uger. Intet traume.  │ │
│   Traume    1 Nej 2 Ja            │ │ O: Ingen hævelse. Medial ledlinje-   │ │
│   Låsning   1 Nej 2 Ja            │ │ ømhed. Fuld bevægelighed.            │ │
│   Suppl.    [fritekst__________]  │ │ V: …                                 │ │
│                                   │ │ P: …                                 │ │
│ OBJEKTIVT            N = normal   │ └──────────────────────────────────────┘ │
│   Hævelse   1 Ingen 2 Let 3 Mod.. ├──────────────────────────────────────────┤
│   Ledlinje  1 Ingen 2 Med. 3 Lat. │ RØDE FLAG                                │
│   Bevægel.  1 Fuld 2 Let ↓ 3 Svær │ ! <tekst> → <handling>                   │
│   Stabil.   1 Stabil 2 Instabil   │   Lægehåndbogen 2024 · UDKAST            │
│   Suppl.    [fritekst__________]  │ ! <tekst>          KILDE MANGLER · UDKAST│
│                                   │ DIFFERENTIALDIAGNOSER      [ ] = til V   │
│                                   │ [ ] <navn> – <kendetegn>   SST 20xx ✓    │
│                                   │ BEHANDLING                 [ ] = til P   │
│                                   │ [ ] <tekst>   DSAM 20xx ⚠ konflikt       │
│                                   │ HENVISNING                               │
│                                   │ → <til>: <kriterier>  Region H 20xx      │
├───────────────────────────────────┴──────────────────────────────────────────┤
│ Knæ: 14 punkter · 9 UDKAST · 2 kilde mangler · ældste kildetjek 2026-11      │
└──────────────────────────────────────────────────────────────────────────────┘
```
- `✓` = GODKENDT. UDKAST vises tydeligt afvigende (stiplet/grå), så du i konsultationen aldrig er i tvivl om, hvad du selv har godkendt.
- Kildenavnet er et link til kilden. `⚠ konflikt` folder den navngivne uenighed ud.
- Et rødt flag fremhæves, hvis dine valg matcher dets betingelse. Fravær af fremhævning betyder ingenting, og der står aldrig "ingen røde flag udløst".

## 2. Datamodel

Én indholdsfil pr. region i `indhold/` (`knae.ts`, `skulder.ts`, `albue.ts`, `ryg.ts`, `ankel.ts`). Filerne indeholder kun data, ingen logik. Jeg anbefaler TypeScript-datafiler frem for JSON, fordi en tastefejl eller et manglende felt så fanges af `npm run typecheck` med linjenummer, og fordi du kan skrive kommentarer i filen.

```ts
// indhold/typer.ts  (skitse)

type Status = "UDKAST" | "GODKENDT";

type Kilde = {
  id: string;              // "lh-artrit-bakteriel"
  udgiver: string;         // "DSAM", "Lægehåndbogen", "SST", "pro.medicin.dk", "Region Hovedstaden", "NICE" …
  dansk: boolean;          // false vises som "ikke-dansk kilde" i panelet
  titel: string;
  aar: number;             // årstal for den version, der er læst
  url: string;
  sidstTjekket: string;    // dato, hvor kilden sidst er åbnet og sammenholdt
};

// Fælles for ethvert klinisk punkt
type Kildebelagt = {
  kilder: string[];        // kilde-id'er. Tom liste vises som "KILDE MANGLER"
  status: Status;          // fødes altid som UDKAST
  godkendtDato?: string;   // sættes kun af dig, sammen med GODKENDT
  konflikt?: { beskrivelse: string; kilder: string[] };  // navngiven uenighed
};

type Betingelse = { felt: string; er: string };          // alle i en liste skal passe

type Felt = {
  id: string;
  label: string;
  sektion: "anamnese" | "objektivt";
  type: "enkelt" | "flere" | "tekst";
  valg?: { id: string; label: string; notat: string; normal?: true }[];
  visHvis?: Betingelse[];  // fx traumemekanisme kun ved traume
};

type RoedtFlag = Kildebelagt & {
  id: string; tekst: string; handling: string;
  fremhaevHvis?: Betingelse[];   // må kun fremhæve, aldrig skjule eller afkræfte
};

type Differentialdiagnose = Kildebelagt & {
  id: string; navn: string; kendetegn: string[];
  notat: string;                 // sætning til Vurdering, hvis du vælger den
};

type Behandling = Kildebelagt & {
  id: string; tekst: string;
  gaelderFor?: string[];         // differentialdiagnose-id'er; tom = generelt
  notat: string;                 // sætning til Plan, hvis du krydser den af
};

type Henvisning = Kildebelagt & {
  id: string;
  til: string;                   // "Røntgen", "Fysioterapi", "Ortopædkirurgi", "Akut"
  kriterier: string;
  hast?: "akut" | "subakut" | "elektiv";
  gyldighed: "national" | "Region Hovedstaden";
};

type Region = {
  id: "skulder" | "albue" | "ryg" | "knae" | "ankel";
  navn: string;
  felter: Felt[];
  notat: { overskrift: string; felter: string[] }[];   // skabelon: rækkefølge og overskrifter
  kilder: Kilde[];
  roedeFlag: RoedtFlag[];
  differentialdiagnoser: Differentialdiagnose[];
  behandling: Behandling[];
  henvisning: Henvisning[];
};
```

Regler, som håndhæves af en test (ikke af kode, der kører i konsultationen):
- Hvert klinisk punkt har `status`. GODKENDT kræver mindst én kilde og en `godkendtDato`.
- Alle kilde-id'er og felt-id'er, der refereres til, findes.
- Felter og notatfraser (ordlyden af det, *du* har observeret) er ikke kliniske anbefalinger og bærer derfor ikke kilde/status. Alt i de fire beslutningsstøtte-lister gør.

Regler for mig, skrevet ind i `CLAUDE.md`:
- Jeg sætter aldrig `status: "GODKENDT"` – heller ikke når jeg flytter eller omformulerer et punkt. En ændring af et godkendt punkts kliniske tekst sætter det tilbage til UDKAST.
- Ingen kilde: `kilder: []`, som vises "KILDE MANGLER". Aldrig et gæt.
- Uenige kilder: begge anføres, og uenigheden beskrives i `konflikt`. Ingen harmonisering. Danske retningslinjer vejer tungest; udenlandske kilder mærkes som ikke-danske.
- En kilde må kun anføres, hvis den er åbnet i sessionen og `sidstTjekket` er sat.

### Mappestruktur efter omlægning
```
src/            appen: App, regioner, komponenter, CSS
indhold/        typer.ts, knae.ts, skulder.ts, albue.ts, ryg.ts, ankel.ts
lib/            små hjælpefunktioner (notat, betingelser, kopiér) + tests
docs/           review.md, plan.md
arkiv/          alt det gamle (se trin 1)
cortex.html     den byggede app – den fil, du åbner på klinik-pc'en
CLAUDE.md
```

## 3. Byggerækkefølge

Hvert trin er højst ca. 2 timer, ender med en commit og en 1-minuts-test. Knæ bygges helt færdigt først.

| # | Trin | Resultat |
|---|---|---|
| 1 | **Oprydning og tom skal.** Flyt det gamle til `arkiv/` (liste nedenfor). Ny forside med regionsvælger (tast 1–5). Skift byggeværktøj til Vite med enkeltfil-output og afprøv dobbeltklik + kopiér (se afsnit 5). Skriv `CLAUDE.md`, og lad `AGENTS.md` pege på den. | Én HTML-fil, der åbner ved dobbeltklik og viser fem regioner |
| 2 | **Datamodel + knæ-felter → notat.** `typer.ts`, `knae.ts` med felter og notatskabelon (fra den gamle knæ-fil), `lib/notat.ts` med tests, herunder "tomt input giver tomt notat". | Klik chips, se notat |
| 3 | **Tastaturflow.** Talvalg med auto-fremrykning, `N` = normal, kopiér, nulstil. Ingen autofuldførelse i fritekst. | Hele knæ-notatet uden mus |
| 4 | **Beslutningsstøtte-panel.** Visning af røde flag, differentialdiagnoser, behandling og henvisning med kilde, årstal, status, "KILDE MANGLER" og konflikt. Statuslinje med optælling. Valideringstest af indholdsfiler. Fyldes med 2–3 tydeligt mærkede pladsholdere. | Panelet virker; indhold mangler |
| 5 | **Knæ-indhold A (UDKAST): røde flag og differentialdiagnoser.** Jeg åbner hver kilde, noterer årstal og dato, og skriver punkterne. Det, jeg ikke kan belægge, står som "KILDE MANGLER". | Du kan læse og rette i `knae.ts` |
| 6 | **Knæ-indhold B (UDKAST): behandling og henvisning**, inkl. Region Hovedstadens visitation, hvis den kan findes offentligt. Vurdering/Plan-afkrydsning kobles til notatet. | Knæ komplet som udkast |
| 7 | **Din gennemgang af knæ.** Du retter og siger punkt for punkt, hvad der er GODKENDT; jeg fører det ind. Justering af felter og fraser efter dine første rigtige konsultationer. | Knæ færdig = skabelon |
| — | **Pause: brug knæ i 1–2 uger**, før de næste regioner bygges. Det, du retter her, er billigt nu og dyrt ×5 senere. | |
| 8–9 | **Ankel**: felter + notat (8), indhold UDKAST + din gennemgang (9). | |
| 10–11 | **Skulder** (samme to trin). | |
| 12–13 | **Ryg** (samme to trin). | |
| 14–15 | **Albue** (samme to trin). | |

Rækkefølgen ankel → skulder → ryg → albue er mit forslag ud fra, at ankel ligner knæ mest (traume + billeddiagnostisk beslutningsregel), og at albue formentlig er sjældnest. Det er et gæt om din hverdag – byt gerne om.

Tidsestimat: knæ færdig efter 7 sessioner. Hver efterfølgende region 2 sessioner plus din review-tid. Jeg kan ikke estimere din review-tid; den er den reelle flaskehals.

### Trin 1 – flytteliste (intet slettes)
Alt flyttes til `arkiv/2026-11-foer-msk/` med uændret understruktur:

- Kode: `engine/`, `encounter/`, `clinical/`, `components/encounter/`, `components/prototype/`, `app/prototype/`, `data/`, `e2e/`, `playwright.config.ts`
- Dokumenter: `docs/vision/`, `docs/governance/`, `docs/architecture/`, `docs/design/`, `docs/design-review/`, `docs/product/`, `docs/clinical/`, `docs/archive/`, `docs/README.md`
- Rodfiler: `FIX-NOTE.md`, `FIRST-COMMIT.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, samt en kopi af den nuværende `AGENTS.md` og `README.md`

Udført som beskrevet, med én afvigelse: også `app/`, `next-env.d.ts` og `vitest.config.mts` er arkiveret, fordi skiftet til Vite gjorde dem overflødige. `README.md`, `AGENTS.md`, `package.json` og `tsconfig.json` er skrevet om; de gamle udgaver ligger som kopier i arkivet.

`arkiv/` udelukkes fra typecheck, tests og build, så det ikke koster noget at have liggende.

## 4. Bevidste fravalg

| Fravalg | Hvorfor |
|---|---|
| Backend, database, login, lagring | Løser intet problem her og ville bryde "intet gemmes" |
| AI/LLM-kald i selve appen | Ville sende data ud og give ræsonnement uden kilde. AI bruges kun til at udkaste indhold i udviklingen |
| Automatisk diagnoseforslag og score ("2 af 3 fund") | Ukildebelagt ræsonnement. Differentialdiagnoser vises som kildebelagt liste; du vælger |
| "Ingen røde flag"-melding | Falsk tryghed. Betingelser må kun fremhæve |
| Generering af henvisningstekster (fys, røntgen, ortopædkirurgi) | Uden for de to mål. Kan tilføjes senere som ekstra notatskabelon, hvis du savner det efter brug af knæ |
| Den generiske workflow-motor, registry og kørselsvalidering | Erstattes af typer + én test |
| Quick/Standard-tilstande, sammenfoldelige kort, sektionsnavigation | Ét kort skærmbillede er hurtigere end tilstande |
| Playwright-suite | Dyr at holde i live ved UI-ændringer. Notatlogikken testes med Vitest; UI testes af dig på 1 minut pr. trin |
| Mobil-/tabletlayout | Bruges ved skrivebordet i konsultationen |
| Flere regioner i samme konsultation, ICPC-koder, patientinformation, attester | Ikke efterspurgt; øger vedligeholdelse |
| Dokument-først-processen (RFC'er, review-rammeværk) | `CLAUDE.md` + denne plan er nok til én bruger |

## 5. Afklaringer (besvaret 2026-11-14)

1. **Kilder.** Bedste aktuelle evidens gælder. Danske retningslinjer vejer tungest; udenlandske kilder og alment accepterede beslutningsregler (fx Ottawa-reglerne) må bruges og mærkes som ikke-danske. Er en dansk og en udenlandsk kilde uenige, vises den danske anbefaling, og uenigheden navngives i `konflikt`. "KILDE MANGLER" bruges kun, når der ingen kilde er.
2. **Ryg** = lænderyg. Kan udvides senere.
3. **Notatformat:** `S: / O: / V: / P:`.
4. **Driftssted:** klinikkens arbejdscomputer. Se nedenfor.

### Konsekvens af punkt 4: én HTML-fil (besluttet og udført i trin 1)
Appen bygges med Vite til én selvstændig fil, `cortex.html`, der åbnes med dobbeltklik, virker uden netværk og ikke kræver installation. Next.js er arkiveret. React, TypeScript og Vitest er uændrede. Filen ligger i repoets rod og opdateres ved hvert trin.

Afprøvet i trin 1 i Chromium fra en lokalt åbnet fil: regionsvalg med tastatur, nulstilling og kopiering virker, og siden foretager ingen netværkskald. Ikke afprøvet: klinikkens egen browser – det er din 1-minuts-test.

Vercel-koblingen på repoet har fejlet siden juli og bruges ikke af denne løsning.

## 6. Hvad jeg ved, udleder og gætter i denne plan

- **Ved (fra koden):** stack, at build og tests er grønne, at intet gemmes eller sendes, indholdet af den gamle knæ-fil og evidensregistrets kildeliste.
- **Udleder:** at en ny lille kerne er billigere end ombygning; kodestørrelsen 600–900 linjer; antal tastetryk pr. notat.
- **Gætter:** regionsrækkefølgen, at klinik-pc'en ikke tillader installation, og hvor meget dansk kildemateriale der findes pr. region. Jeg har ikke åbnet nogen kliniske kilder i dag og nævner derfor ingen konkrete retningslinjer ud over dem, der allerede står i repoets evidensregister. Det sker først i trin 5.
