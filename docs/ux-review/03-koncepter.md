# 03 – Designkoncepter

Dato: 2026-11-15. Tre koncepter for Cortex, vist for knæmodulet. Wireframes er skitser og ikke koblet til appen.

**Forbehold, der gælder alle tre**
- Alle kliniske tekster i skitserne er taget fra den nuværende `indhold/knae.ts`. Intet klinisk indhold er tilføjet.
- Hvor et koncept kræver nyt klinisk indhold, står der `[KRÆVER FAGLIG KILDEKONTROL]`.
- Tastetryk og timer er skøn `[UDLEDT]`. Tallene for i dag er målt (`01-faktagrundlag.md`).
- Fælles for alle tre, fordi det er sikkerhedsrettelser og ikke design:
  - `N` sætter ikke længere fund, der kræver en aktiv test. Hvilke felter det er, afgør lægen. `[KRÆVER FAGLIG KILDEKONTROL]`
  - Det, `N` har sat, er markeret, til lægen rører feltet.
  - Ét fortrydelsestrin. Holdt tast gentages ikke. Klik på den åbne region rydder ikke.
  - Test, der fanger, hvis et godkendt punkt ændres uden at falde tilbage til UDKAST.

---

## Koncept 1 – "Stram op": den nuværende struktur, gjort sikker

**Kerneidé.** Skærmen er delt som i dag: felter til venstre, notat og beslutningsstøtte til højre. Intet flyttes rundt. De ændringer, der laves, er dem, der fjerner en konkret risiko: `N` begrænses og markeres, fremhævede flag kan ikke overses, og et fremhævet flag peger på sit henvisningspunkt. Resten af højre panel foldes sammen, så det ikke skubber henvisningerne 5.000 px ned.

**Wireframe (1366×768)**
```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ CORTEX  [Skulder][Albue][Lænderyg][KNÆ][Ankel]            Ctrl+Z fortryd · Esc Esc ryd │
├─────────────────────────────────────────┬────────────────────────────────────────────┤
│ ANAMNESE                                │ NOTAT (fast højde, ruller indeni) [Kopiér] │
│ ▸ Side      1 Højre 2 Venstre 3 Begge   │ ┌────────────────────────────────────────┐ │
│   Debut     Akut  Gradvis  Recidiv      │ │ S: Højresidige knæsmerter. Akut debut. │ │
│   Varighed  Timer Dage Uger Måneder     │ │ O: Moderat hævelse. ░Ingen rødme.░     │ │
│   Traume    Nej  Ja                     │ │    ░Ingen varmeøgning.░                │ │
│   …                                     │ └────────────────────────────────────────┘ │
│                                         │  ░ ░ = sat med N, ikke gennemset           │
│ OBJEKTIVT   N = normalfund ved          ├────────────────────────────────────────────┤
│             inspektion og palpation     │ RØDE FLAG   ● 1 matcher dine valg          │
│   Hævelse   Ingen Let [Moderat] Udtalt  │ ┌─ MATCHER ─────────────────────────────┐ │
│   Rødme     ░Ingen░ Ja                  │ │ Akut ligamentskade eller stor         │ │
│   Varme     ░Ingen░ Ja                  │ │ ledansamling: vridtraume, hvor knæet… │ │
│   Ledlinje  Ingen Medial Lateral        │ │ → Henvises akut (… Region H: CVI)     │ │
│   Bevægel.  Fuld Let nedsat Svært neds. │ │ Henvisning: CVI, akut   UDKAST  [+ P] │ │
│   Stabilit. Stabil Instabilitet  ← ikke │ └───────────────────────────────────────┘ │
│   Ømhed patella  Ingen Øm          af N │ ▸ Bakteriel artrit            ikke vurderet│
│   …                                     │ ▸ Akut knæskade: udeluk fraktur            │
│                                         │ ▸ Aflåst knæ                               │
│  ░ ░ = sat med N                        │ ▸ Strækkeapparat              ikke vurderet│
│                                         │ ▸ Akut patellaluksation   vurderes klinisk │
│                                         │ ▸ … (alle 10 synlige, én linje hver)       │
│                                         │ ▸ DIFFERENTIALDIAGNOSER (14)               │
│                                         │ ▸ BEHANDLING (17)                          │
│                                         │ ▸ HENVISNING (12)                          │
├─────────────────────────────────────────┴────────────────────────────────────────────┤
│ 1–9 vælg · ↑↓ felt · N normal · Ctrl+Z fortryd · Ctrl+⏎ kopiér          bygget 15-11  │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

**Hvad der ændres**
- Flag vises som én linje (overskriften). Et matchende flag folder sig ud på stedet. Rækkefølgen er fast.
- Tæller i overskriften: "1 matcher dine valg". Der står aldrig "0" eller "ingen"; uden match står der ingenting.
- Flag, hvis felter er tomme, mærkes "ikke vurderet". Flag uden betingelse mærkes "vurderes klinisk".
- Et matchende flag viser sit henvisningspunkt med `+ P`. Koblingen er nyt klinisk indhold. `[KRÆVER FAGLIG KILDEKONTROL]`
- Differentialdiagnoser, behandling og henvisning er foldet sammen som standard.
- Rød bruges kun til match. Konfliktmarkering bliver grå.
- GODKENDT-mærke og dato vises ikke; UDKAST og KILDE MANGLER vises.

**Scenarie A** (32 år, vridtraume, hævelse efter timer, kan støtte, føler sig ustabil)
1. `4`, derefter anamnesen med taltaster som i dag (ca. 11 tryk).
2. Objektivt: hævelse vælges. `N` sætter rødme, varme, ledlinje, bevægelighed – markeret som N-sat.
3. Stabilitet og de fem traumefund skal vælges aktivt (ca. 6 ekstra tryk). Springes de over, står de tomme, og flagene "fraktur" og "strækkeapparat" viser "ikke vurderet".
4. Ligamentflaget folder sig ud med "CVI, akut" og `+ P`. Ét klik.
5. `Ctrl+Enter`.
Skøn: ca. 27 tastetryk og 1 klik (i dag 21 tryk, 2 klik og ca. 5 skærmhøjders rulning). Flere tastetryk, men hvert af dem er en stillingtagen, som i dag sker uden at lægen ser den.
Uløst: "hævelse efter timer" kan stadig ikke registreres korrekt. `[KRÆVER FAGLIG KILDEKONTROL]`

**Scenarie C** (74 år, alloplastik, varmt og hævet, subfebril)
1. `4`, side, debut, varighed, traume nej, feber (ca. 7 tryk).
2. Hævelse, rødme, varme (3 tryk). Flaget "Bakteriel artrit" folder sig ud øverst med "Akut indlæggelse (ortopædkirurgi via CVI)" og `+ P`.
3. Ét klik, `Ctrl+Enter`.
Skøn: ca. 11 tastetryk og 1 klik, ingen rulning (i dag 14 tryk, 2 klik, ca. 5.000 px rulning).
Uløst: alloplastik kan kun stå i fritekst. Ingen kontaktvej til CVI. `[KRÆVER FAGLIG KILDEKONTROL]`

**Fjernes i forhold til i dag**
- `N` for fund, der kræver en test.
- GODKENDT-mærke og dato på hvert flag; statuslinjens optælling (flyttes til gennemgangssiden).
- Rød kant på ikke-matchende flag og rød konflikttekst.
- "Alder x–y år." i notatteksten.
- Rydning ved klik på åben region.

---

## Koncept 2 – "Opslagskortet": beslutningsstøtten først, notatet bagefter

**Kerneidé.** Cortex vendes om. Et tryk på regionen viser ét kort uden rulning: de røde flag som stikord og de regionale veje ("hvem, hvor hurtigt, hvad skal henvisningen indeholde"). Der registreres kun de fund, et flag afhænger af; de bliver til et kort notat. Resten af notatet skrives eller dikteres i journalsystemet, som lægen plejer.

Udgangspunktet er EL's vurdering: den erfarne læge mangler ikke hjælp til at skrive "medial ledlinjeømhed", men til at huske den regionale vej og fristen.

**Wireframe (1366×768)**
```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ CORTEX  [Skulder][Albue][Lænderyg][KNÆ][Ankel]                        Esc Esc = ryd  │
├───────────────────────────────────────┬──────────────────────────────────────────────┤
│ RØDE FLAG                             │ VEJE I REGION HOVEDSTADEN                    │
│  1 Bakteriel artrit                   │ AKUT                                         │
│  2 Akut knæskade: udeluk fraktur      │  a Akut indlæggelse (ortopædkirurgi via CVI) │
│  3 Aflåst knæ                         │    Mistanke om bakteriel (septisk) artrit    │
│  4 Akut ligamentskade / stor ansaml.  │  b CVI, akut                                 │
│  5 Strækkeapparat                     │    Efter knætraume: akut stor ledansamling;… │
│  6 Akut patellaluksation              │  c Akut røntgen af knæ                       │
│  7 Store og akutte knæskader          │ SUBAKUT                                      │
│  8 Septisk bursit                     │  d CVI, subakut (snarest, < 1 uge)           │
│  9 Hævelse i øvre læg                 │  e Reumatologisk hotline 38 16 41 90 / …     │
│ 10 Barn med knæsmerter                │  f Ortopædkirurgi (bursit)                   │
│  tal = vis tekst, handling og kilde   │ ELEKTIV  ▸ 6 veje                            │
├───────────────────────────────────────┤  bogstav = vis kriterier · Skift+bogstav = P │
│ AFGØRENDE FUND  (kun felter, et flag  ├──────────────────────────────────────────────┤
│ afhænger af)        Tab = hertil      │ NOTAT (kun afgørende fund)        [Kopiér]   │
│  Traume  Nej Ja   Feber  Nej Ja       │ O: Rødme. Varmeøgning. Feber.                │
│  Varme   Ingen Ja Rødme  Ingen Ja     │ P: Henvist akut til CVI mhp. septisk artrit. │
│  Låsning Nej Ja   Bevægel. …          │                                              │
│  (ved traume: 9 felter mere)          │ ▸ Fuldt notat (alle felter som i dag)        │
└───────────────────────────────────────┴──────────────────────────────────────────────┘
```

**Hvad der ændres**
- Ingen felter skal udfyldes for at få værdi. Kortet er færdigt ved ét tastetryk.
- "Afgørende fund" er de felter, der indgår i mindst ét flags betingelse. Listen udledes automatisk af data; der vælges ikke nye felter. Ingen `N`.
- Veje sorteres efter hast. Elektive er foldet sammen. Alle henvisningspunkter er i dag UDKAST; konceptet forudsætter, at lægen gennemgår dem først.
- Differentialdiagnoser og behandling findes kun bag et opslag (én tast). De indgår ikke i notatet.
- Det fulde notat som i dag findes bag "Fuldt notat" til de tilfælde, hvor lægen vil bruge det.

**Scenarie A**
1. `4`. Kortet vises.
2. `Tab` til afgørende fund. Traume ja folder traumefelterne ud: hævelse straks, knæk, alder, belastning, 4 skridt, patella, caput fibulae, fleksion 90°, strakt benløft, stabilitet (ca. 11 tryk).
3. Flag 4 bliver rødt; vej b markeres. `Skift+b` sætter P.
4. `Ctrl+Enter` kopierer et kort notat med de afgørende fund. Anamnese og øvrige fund dikteres i journalen.
Skøn: ca. 14 tastetryk, 0 klik. Men notatet er ufuldstændigt, og lægen skriver resten selv.

**Scenarie C**
1. `4`. "Bakteriel artrit" står øverst, og vej a står øverst til højre. Lægen kan handle uden at registrere noget.
2. Valgfrit: feber, varme, rødme (ca. 4 tryk) og `Skift+a` for et kort notat.
Skøn: 1 tastetryk til brugbart output; 6 med notat. Det er her, konceptet er stærkest.
Uløst: stadig ingen kontaktvej til CVI. `[KRÆVER FAGLIG KILDEKONTROL]`

**Fjernes i forhold til i dag**
- Det fulde S/O-notat som hovedfunktion (bevares bag et opslag).
- `N` helt.
- V-linjen og alle `+ V`-knapper.
- Behandlingspunkter som afkrydsning til P.
- Felter, intet flag afhænger af, fra hovedskærmen (side, debut, varighed, ledlinjeømhed m.fl.).

---

## Koncept 3 – "Flagstriben": mellemvejen

**Kerneidé.** Venstre side bevares uændret, fordi alle fire eksperter vurderer, at den virker. Højre side bygges om fra et dokument til tre faste dele uden rulning: notat, en stribe med alle flag, og "Næste skridt". Opslagsværket (differentialdiagnoser, behandling, alle henvisninger) åbnes med én tast og ligger ellers bagved.

Forskellen fra koncept 1: højre panel er ikke længere en liste, der foldes sammen, men en fast flade, der ser ens ud ved hver patient og kun ændrer sig, når noget matcher. Forskellen fra koncept 2: det fulde notat er stadig hovedfunktionen.

**Wireframe (1366×768)**
```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ CORTEX  [Skulder][Albue][Lænderyg][KNÆ][Ankel]            Ctrl+Z fortryd · Esc Esc ryd │
├─────────────────────────────────────────┬────────────────────────────────────────────┤
│ ANAMNESE                                │ NOTAT (fast højde)               [Kopiér]  │
│ ▸ Side      1 Højre 2 Venstre 3 Begge   │ ┌────────────────────────────────────────┐ │
│   Debut     Akut  Gradvis  Recidiv      │ │ S: Højresidige knæsmerter. Akut debut… │ │
│   Varighed  Timer Dage Uger Måneder     │ │ O: Moderat hævelse. Rødme. Varmeøgning.│ │
│   Traume    Nej  Ja                     │ │ P: Henvist akut til CVI mhp. septisk…  │ │
│   Belastn.  Normal Reduceret Kan ikke   │ └────────────────────────────────────────┘ │
│   Låsning   Nej  Ja                     ├────────────────────────────────────────────┤
│   Feber     Nej  [Ja]                   │ RØDE FLAG                    ● 2 matcher   │
│   Suppl.    [______________________]    │ ■ Bakteriel artrit          □ Patellaluks. │
│                                         │ □ Akut knæskade: fraktur    □ Store skader │
│ OBJEKTIVT   N = inspektion/palpation    │ □ Aflåst knæ                ■ Septisk burs.│
│   Hævelse   Ingen Let [Moderat] Udtalt  │ ◌ Akut ligamentskade        □ Hævelse læg  │
│   Rødme     Ingen [Ja]                  │ ◌ Strækkeapparat            □ Barn         │
│   Varme     Ingen [Ja]                  │  ■ matcher  □ ikke opfyldt/klinisk         │
│   Ledlinje  Ingen Medial Lateral        │  ◌ ikke vurderet (felter tomme)            │
│   Bevægel.  Fuld Let [Svært nedsat]     ├────────────────────────────────────────────┤
│   Stabilit. Stabil Instabilitet         │ NÆSTE SKRIDT                H = hertil     │
│   Suppl.    [______________________]    │ 1 Bakteriel artrit                         │
│                                         │   → Indlægges akut ved mistanke (Region    │
│                                         │     Hovedstaden: ortopædkirurgisk via CVI) │
│                                         │   Akut indlæggelse (ortopædkirurgi via CVI)│
│                                         │   UDKAST                      1 = til P ✓  │
│                                         │ 2 Septisk bursit                           │
│                                         │   → Henvises ved mistanke om septisk burs… │
├─────────────────────────────────────────┴────────────────────────────────────────────┤
│ 1–9 vælg · N normal · H næste skridt · O opslag · Ctrl+Z · Ctrl+⏎ kopiér  bygget 15-11│
└──────────────────────────────────────────────────────────────────────────────────────┘
```

**Hvad der ændres (ud over koncept 1)**
- Flagstriben: ti stikord i to kolonner, fast plads, altid synlige. Tre tegn: matcher / ikke opfyldt eller klinisk / ikke vurderet. Klik eller tast på et stikord viser fuld tekst, handling, kilde og evt. konflikt.
- "Næste skridt" er tom, når intet matcher. Ved match vises flagets handling og det koblede henvisningspunkt. `H` flytter fokus dertil; et tal sætter P. `Esc` eller `↑` går tilbage til felterne. Dermed kan hele forløbet klares uden mus.
- `O` åbner opslagsværket som et lag over højre side. Indholdet er det samme som i dag.
- Flagstriben viser stikord frem for fuld tekst, så patienten ikke læser "sarkom" og "leukæmi" ved hvert knæ.
- Ved kildekonflikt viser "Næste skridt" lægens valg og en diskret markering "kilder uenige"; citaterne ligger i opslaget. Det forudsætter, at lægen har truffet valget. `[KRÆVER FAGLIG KILDEKONTROL]`

**Scenarie A**
1. `4` og anamnese som i dag (ca. 11 tryk).
2. Objektivt: hævelse; `N` for inspektion og palpation; stabilitet og traumefund aktivt (ca. 10 tryk).
3. Striben viser ■ ved "Akut ligamentskade". "Næste skridt" viser handlingen og "CVI, akut". `H`, `1`.
4. `Ctrl+Enter`.
Skøn: ca. 29 tastetryk, 0 klik, ingen rulning. Blikket bliver på samme sted i højre side under hele forløbet.

**Scenarie C**
1. `4`, anamnese inkl. feber (ca. 7 tryk), hævelse, rødme, varme (3 tryk).
2. Striben viser ■ ved "Bakteriel artrit" og "Septisk bursit" – begge synlige, også ved 1366×768. "Næste skridt" viser akut indlæggelse.
3. `H`, `1`, `Ctrl+Enter`.
Skøn: ca. 13 tastetryk, 0 klik, ingen rulning.
Uløst som i koncept 1: alloplastik som fritekst; ingen kontaktvej til CVI.

**Fjernes i forhold til i dag**
- Alt det, koncept 1 fjerner.
- Den altid synlige liste over 14 differentialdiagnoser, 17 behandlingspunkter og 12 henvisninger (flyttes bag `O`).
- `+ V` og `+ P` som museknapper på hovedskærmen. V skrives i journalen; P sættes fra "Næste skridt".
- Fuld flagtekst som standardvisning.
- Kildelinks og statusmærker på hovedskærmen (vises i flagets detaljer og i opslaget).

---

## Oversigt

| | Koncept 1 "Stram op" | Koncept 2 "Opslagskortet" | Koncept 3 "Flagstriben" |
|---|---|---|---|
| Hovedfunktion | Notat + støtte som i dag | Opslag; notat sekundært | Notat + støtte, omvendt vægt i højre side |
| Rulning i konsultationen | Lidt (foldede sektioner) | Ingen | Ingen |
| Mus nødvendig | 1 klik pr. P | Nej | Nej |
| Fuldt S/O-notat | Ja | Kun bag opslag | Ja |
| Nyt klinisk indhold | Kobling flag → henvisning | Ingen nyt, men alle 12 henvisninger skal gennemgås | Kobling flag → henvisning |
| Bygger videre på forrige | – | Nej, ny skærm | Ja, på koncept 1 |
