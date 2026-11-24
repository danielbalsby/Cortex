# Til Daniel

Status 2026-11-17. Du har besluttet at starte fase 3 (forslag) før dit testresultat fra `docs/ux-review/test-frase-mod-cortex.md`; testen er stadig relevant for notatdelen. Halten hos børn og alloplastik står fortsat kun på listen (`review/MANGLER.md`). Vercel-henvisningerne er ikke rørt.

## Rolig konsultationsskærm (2026-11-24)

Højre side tager nu udgangspunkt i dine valg (progressive disclosure). Intet klinisk indhold er ændret, og intet punkt er fjernet.
- **Røde flag:** alle vises altid, nu som en rolig liste uden kasser. Et flag, der matcher, står øverst med rød baggrund og viser sin handling uden udfoldning.
- **Diagnose:** valgte diagnoser og forenelige forslag står fremme. Alle 15 ligger under "+ Alle differentialdiagnoser".
- **Plan:** vises først, når du har valgt en diagnose. Så står planforslaget (A) og den behandling og henvisning, der hører til diagnosen, fremme. Resten ligger under "+ Øvrig behandling" og "+ Øvrige henvisninger". Et punkt, du har valgt til notatet, ligger aldrig sammenfoldet (test i `lib/visning.test.ts`).
- **Korte titler uden "…":** behandling vises med den sætning, der kommer i P. Flag vises med teksten før kolon eller første sætning. Kildens fulde tekst, kilder og status vises ved udfoldning.
- **Mindre støj:** "+V/+P" er diskrete, indtil du peger på rækken (tasterne V/P virker som før). UDKAST står én gang pr. sektion i stedet for på hver linje.
- Før/efter: `docs/ux-review/rolig/foer-efter.png`.

## Fysioterapi-henvisning og "+P" uden for skærmen (2026-11-24)

- **"+P" uden for skærmen:** skyldtes en ældre `cortex.html`. Fejlen blev rettet i #65 (listen må ikke blive bredere end panelet). Målt 2026-11-24 i alle fem regioner ved 1366, 1024, 820 og 700 px: ingen knap uden for panelet. Ny test (`src/layout.test.ts`) fejler, hvis rettelsen fjernes. **Brug den nyeste `cortex.html` fra main.**
- **Fysioterapi** står nu som første henvisning i alle fem regioner (`hen-fys`), alt UDKAST. Kilder genlæst 2026-11-24: LH Subakromielt smertesyndrom 2021, LH Epikondylit 2025, LH Meniskskade 2026, LH Artrose knæ 2025, LH Kronisk lateral ankelinstabilitet 2025, LH Lændesmerter 2024 (+ LH Lumbal rodaffektion som før).
- **Ikke med:** regler for tilskud/egenbetaling (sundhed.dk's borgerside kunne ikke læses maskinelt). Vederlagsfri fysioterapi er kun for svært fysisk handicap og progressiv sygdom (Region H's side, 2017) og er derfor ikke lagt ind. Direkte adgang uden henvisning er kun et forsøg i Region Sjælland (31.3.2025–31.12.2026) og gælder ikke dine patienter.
- **Forslag (dit "ja" 2026-11-24):** ved valgt impingement foreslås fysioterapeutisk skuldertræning nu i "Tag med i P" (LH 2021: "De bør henvises til fysioterapeutisk træning"). Ved menisk var fysioterapi allerede med i forslaget (LH Meniskskade 2026). Fysioterapi-henvisningen selv står under "vurder kriterierne", så den ikke kommer dobbelt i P.

## Fase 3: forslag til diagnose og plan (2026-11-17)

Din beslutning: forslag med ét tryk, reglerne i `CLAUDE.md` er blødt op, og knæ er pilot.

**Merget (uden klinisk indhold):**
- [#60](https://github.com/danielbalsby/Cortex/pull/60): motoren. Den består af:
  - boksen "Forslag" under de røde flag
  - `D` går til forenelige diagnoser, `V` vælger en diagnose, og `A` tager planforslag med i P
  - Ctrl+Z fortryder A samlet
  - demo på tast 0
- [#61](https://github.com/danielbalsby/Cortex/pull/61): forslaget viser præcis den sætning, der skrives i P. Tastehjælpen giver ikke længere vandret scroll i smalle vinduer.

**Merget 2026-11-17 (din "merge"):** [#62](https://github.com/danielbalsby/Cortex/pull/62), knæ – forenelige diagnoser og planforslag. Alt er UDKAST, og ingen godkendte flag er rørt. Kilderne er genhentet 2026-11-17 og er identiske med 15.11.

| Diagnose | Fremhæves ved (ELLER) | Kilde |
|---|---|---|
| Gonartrose | intet traume + over 55 · medial ledlinjeømhed · lateral ledlinjeømhed | LH Knæsmerter 2026, LH Artrose knæ 2025 |
| Menisk | medial eller lateral ledlinjeømhed · låsning | LH Meniskskade 2026, LH Knæsmerter 2026 |
| Forreste korsbånd | hørt/følt knæk · hævelse straks · traume + instabilitet | LH Knæsmerter 2026, LH Korsbånd 2026 |
| MCL | traume + instabilitet | LH Kollateralligament medial 2026 |
| Bursit | rødme + varme | LH Knæsmerter 2026 |
| Bakteriel artrit | feber · varme + rødme + moderat/udtalt hævelse | Region H Akut monoartritis 2025, LH 2024 |
| Henført smerte | under 12 · 12–17 | LH Knæsmerter 2026 |
| Osteochondritis dissecans | 12–17 + låsning | LH Knæsmerter 2026 |
| Tendinopati | lateral ledlinjeømhed (løberknæ, popliteus) | LH Knæsmerter 2026 |

**Ikke fremhævet (vurderes klinisk):** patellofemoralt smertesyndrom, patellaluksation, Bakers cyste, artrit (krystal/reaktiv/reumatisk), Osgood-Schlatter og ikke-artikulær hævelse. Kendetegnene kan ikke registreres med de nuværende felter.

**Planforslag** (ét tryk på A, kun når diagnosen er valgt):
- **Gonartrose:** information/træning/vægttab og analgetika.
- **Menisk:** fysioterapi. Ved låsning + svært nedsat bevægelighed kommer også subakut henvisning til CVI.
- **Forreste korsbånd og MCL:** træning eller aflastning. Akut henvisning til CVI foreslås kun ved traume + udtalt hævelse, manglende strakt benløft eller instabilitet (Region H 2026).
- **Bakteriel artrit:** akut indlæggelse ved feber eller ved et varmt, rødt, hævet led.
- **Henvisninger med tidskriterier** (fx artrose efter 3–6 måneder) foreslås aldrig automatisk. De står under "vurder kriterierne".

**Mine fortolkninger, som du bør se på:**
- "Ældre" (artrose) er sat til over 55. Kilden angiver ingen grænse.
- 18–20 år ved OCD kan ikke registreres og er udeladt.
- "Betydeligt hævet" er oversat til Moderat eller Udtalt.
- "Akut stor ledansamling" er oversat til Udtalt.
- Ledlinjeømhed alene fremhæver både artrose og menisk. Det er bevidst: kilden nævner begge.

**Dine svar 2026-11-17:** "ja og merge".
- #62 er merget. Alt er fortsat UDKAST.
- Feltet "Smertested" er lavet som kladde (se nedenfor).

**Kladde til dig: knæ – Smertested** (Fortil/patella · Medialt · Lateralt · Knæhase). Det er et flervalgsfelt efter Varighed og skrives i S.

Nye fremhævninger (LH Knæsmerter 2026, LH Patellofemoralt syndrom 2026, LH Bakers cyste 2026):

| Diagnose | Fremhæves også ved |
|---|---|
| Patellofemoralt smertesyndrom | smerter fortil |
| Tendinopati | smerter fortil, lateralt eller i knæhasen, alle uden traume |
| Osgood-Schlatter / Sinding-Larsen | smerter fortil + under 12 eller 12–17 |
| Bakers cyste | smerter i knæhasen |
| Bursit | smerter fortil + rødme eller varme |

Bemærkninger:
- **Ingen kobling ved "Medialt"** (anserinus, menisk, artrose). Ledlinjeømhed dækker allerede menisk og artrose.
- **Aldersfelterne passer ikke præcist til Osgood-Schlatter** (10–15 år): 16–17 år og under 10 år kommer med.
- **Tastetryk:** feltet er flervalg og koster derfor 2 tryk (tal + Enter).

Test på 1 minut: tryk 4 og vælg Gradvis, Måneder, Smertested Fortil/patella (1, Enter), Traume Nej og Alder 12–17. Patellofemoralt smertesyndrom, tendinopati, henført smerte og Osgood-Schlatter skal stå som forenelige. Tryk så **D**, **V** og **A**. Skærmbilleder: `review/skaermbilleder-2026-11-17/`.

## Status

**Merget:**
- [#56](https://github.com/danielbalsby/Cortex/pull/56): ankel – feber i flagteksten (Region H, Akut monoartritis 2025) og som ELLER-betingelse. Merget som UDKAST, derefter godkendt (se nedenfor).
- [#58](https://github.com/danielbalsby/Cortex/pull/58): de seks flag sat til GODKENDT med fingeraftryk. Kun status og dato ændret.
- Denne PR: dine tre testscenarier i tabeltesten, browsertest med skærmbilleder og denne fil.

`cortex.html` og snapshots er genbygget. `npm run check` er grøn.

**Kladder:** ingen åbne.

## Godkendelser

Godkendt af dig enkeltvis 16.11.2026 (`review/GODKENDELSER.md`):
- skulder septisk artrit
- ankel akut artrit (med feber, efter #56)
- knæ børn
- knæ aflåst knæ
- albue septisk artrit
- albue septisk bursit

**Alle 37 røde flag er nu GODKENDT.** Ingen er sat på generel tilladelse. Differentialdiagnoser, behandling og henvisning er fortsat UDKAST.

## Testresultat (Claude, 16.11.2026)

Testet to steder:
1. **Tabeltesten** (`lib/scenarier.test.ts`). Scenarierne hedder "Lægens test …" og kører i `npm run check`.
2. **Chromium.** `cortex.html` er åbnet, og der er klikket præcis de fund, du beskrev. Skærmbillederne ligger i `review/skaermbilleder-2026-11-16/`, og scriptet er `browsertest.cjs`.

| Scenarie | Tabeltest | Skærm |
|---|---|---|
| Albue: Feber = Ja → "Septisk artrit eller hæmartrose efter traume" MATCHER | **ok** | **ok** – eneste fremhævede flag |
| Albue: Hævelse "Over olecranon" + Varme = Ja → "Septisk bursitis olecrani" MATCHER | **ok** | **ok** – eneste fremhævede flag; septisk artrit står "ikke vurderet" |
| Knæ: Traume = Nej + Alder 12–17 → børneflaget MATCHER, fraktur-flaget ikke | **ok** | **ok** – børneflaget MATCHER; "Akut knæskade" (fraktur) står "ikke vurderet", ikke fremhævet |
| Lænderyg: Henvisning har "Akutmodtagelse" (akut) og "Pakkeforløb" (subakut) som to punkter | **ok** | **ok** – "Akutmodtagelse · akut" og "Pakkeforløb · subakut" står som to særskilte punkter |

Ingen fejl, så ingen sikkerhedsrettelse.

**Lænderyg – hvad fanger malignitetsmistanke med neurologiske udfald eller tværsnitssymptomer?**

Flaget **`flag-cauda`** (GODKENDT), "Cauda equina eller betydende nyopstået parese". Det fremhæves ved én af disse:
- cauda-symptomer = ja
- sensibilitet = ridebukse
- rektal = nedsat
- kraft = betydende parese

Handlingen, ordret:
> "Indlægges akut via CVI (akutmodtagelsen i planområdet). Rektaleksploration: sfinktertonus, voluntær knibekraft, sensibilitet i ridebukseområdet. Ved mistanke om tværsnitssyndrom på malign eller traumatisk basis: Rigshospitalet, Traumecentret."

**Hastegrad: akut.** Flag har intet hastegradsfelt. Hastegraden står i handlingsteksten ("Indlægges akut") og i henvisningspunktet `hen-cauda`, "Akut indlæggelse via CVI · akut":
> "Sikre symptomer og fund på cauda equina, betydelig parese nyopstået inden for 2 uger og/eller progredierende parese (grad 3 eller mindre). Akutmodtagelsen i planområdet; ved tværsnitssyndrom på malign eller traumatisk basis Rigshospitalet, Traumecentret."

Tidligere kræft + betydende parese fremhæver tre flag (tabeltesten):
- `flag-malignitet`
- `flag-cauda`
- **`flag-udbredte-udfald`** (GODKENDT). Handling: "Hurtig henvisning til hospital ved røde flag; akut indlæggelse ved progredierende pareser."

`hen-malignitet` (Pakkeforløb, subakut) henviser i sin tekst selv til cauda-flaget ved tværsnit eller parese.

*Bemærk:* der er intet selvstændigt felt for "tværsnitssymptomer". Det fanges kun via felterne ovenfor.

## Åbne for dig

- **Ctrl+Enter-kopiering på klinik-pc'en.** Kan ikke testes herfra.
- **Dit testresultat** (`docs/ux-review/test-frase-mod-cortex.md`) afgør, om notatdelen bygges videre.
- **Vercel:** skriv, når projektet er afbrudt. Så fjerner jeg henvisningerne.

## Det kunne jeg ikke verificere

- **Ctrl+Enter på klinik-pc'en og den offentlige Vercel-side live.**
- **Danske kilder til NICE-punktet** (ryg, "anbefales ikke") **og Sundhedsstyrelsens pakkeforløbstekst.** sst.dk viser en bot-spærring, og DSAM og NICE er blokeret af netværket.

## Det skal du selv teste

1. **Ctrl+Enter** på klinik-pc'en: notatet skal ligge i udklipsholderen og kunne sættes ind i journalen.

## Regel fremover

Claude sætter aldrig noget til GODKENDT på en generel tilladelse, kun når du nævner det konkrete punkt (`CLAUDE.md`).
