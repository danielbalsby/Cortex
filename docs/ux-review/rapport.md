# Cortex – uafhængig ekspertevaluering og produktanalyse

Dato: 2026-11-15 · Grundlag: commit `973034f` · Kun analyse; ingen app-kode eller klinisk indhold er ændret.

Mærker: `[KODE]` verificeret i koden · `[APP]` observeret ved kørsel · `[UDLEDT]` vurdering · `[KRÆVER BRUGERTEST]` · `[KRÆVER FAGLIG KILDEKONTROL]`.
Eksperterne er simulerede perspektiver, ikke rigtige brugere. Alle tider og timetal er skøn.

## Konklusion

1. **Cortex flytter i dag mere arbejde, end det fjerner.** Registrering af S og O er hurtig (14–21 tastetryk). Men vurdering, plan og henvisning kræver mus og rulning gennem 6–10 skærmhøjder, og et flag fører ikke til en handling.
2. **Det største sikkerhedsproblem er `N`.** Ét tryk dokumenterer op til 11 fund som undersøgt og normale, bl.a. ligamenttest, gangtest og strakt benløft. Det kan ikke ses bagefter, og det giver selvmodsigende notater.
3. **Et flag, der ikke er fremhævet, ligner en frikendelse.** Manglende data, ikke-opfyldt betingelse og "flaget har ingen betingelse" ser ens ud. Ved 1366×768 kan det eneste fremhævede flag ligge uden for skærmen.
4. **GODKENDT er en håndskrevet tekst uden binding til det, der er godkendt.** Ingen test fanger, hvis et godkendt punkt ændres.
5. **Anbefaling: koncept 3 "Flagstriben", bygget trinvis oven på koncept 1's sikkerhedsrettelser.** De tre første trin er rene sikkerhedsrettelser og bør laves uanset hvad.
6. **Efter trin 3 skal du teste, om notatet slår din egen frase eller diktering.** Gør det ikke det, er det rigtige svar at bygge mindre: flag og regionale veje som opslag, og intet notat.

---

## 1. Anbefaling

**Byg koncept 3, men kun i den rækkefølge køreplanen angiver, og med et stop efter trin 3.**

Vigtigste begrundelse: Det er det eneste koncept, hvor alle røde flag er synlige på én gang ved 1366×768, og hvor vejen fra flag til plan kan gås uden mus og uden rulning. Det bevarer venstre side, som alle fire eksperter vurderer virker.

Tre forhold fra konceptvurderingen ændrer konceptet i forhold til skitsen i `03-koncepter.md`:

- **Tegnene i flagstriben skal være fire, ikke tre.** Tre af fire eksperter pegede uafhængigt på, at ét fælles tegn for "ikke opfyldt" og "vurderes klinisk" bliver "ingen røde flag" ad bagvejen. De fire flag, der aldrig kan matche (bl.a. barn med knæsmerter), skal have eget tegn. En tom "Næste skridt" må ikke være tom; den skal sige, at flagene stadig skal vurderes.
- **Markering af N-satte fund er ikke nok.** Markeringen findes kun på skærmen; i journalen står fundene som undersøgt. Den egentlige rettelse er at fjerne normalværdien fra de fund, der kræver en aktiv test. Markeringen er et supplement.
- **Koblingen fra flag til henvisning lægges på henvisningspunktet, ikke på flaget.** Henvisningspunkterne er i forvejen UDKAST. Lægges koblingen på flaget, ændres 37 godkendte punkter.

**Hvorfor ikke koncept 2?** Den erfarne læge foretrak det, og argumentet er stærkt: det, en rutineret læge slår op, er den regionale vej og fristen. Men hele værdien hviler på 12 henvisningspunkter, der alle er UDKAST, og konceptet fjerner den huskeliste for undersøgelsen, som felterne er. Det er en ny skærm ved siden af den gamle med to notatformer at vedligeholde. Koncept 2 er det rigtige svar, *hvis* testen efter trin 3 viser, at notatet ikke slår din frase.

**Hvorfor ikke kun koncept 1?** Højre panel har stadig variabel højde. Matcher to eller tre flag, skubbes resten ud af billedet, og P kræver stadig mus.

### Sammenligning

Skala: ++ klart bedre end i dag · + bedre · 0 som i dag · − dårligere. Tastetryk for koncepterne er skøn `[UDLEDT]`; "i dag" er målt `[APP]`.

| | I dag | Koncept 1 "Stram op" | Koncept 2 "Opslagskortet" | Koncept 3 "Flagstriben" |
|---|---|---|---|---|
| **Klinisk sikkerhed** | – | + (N begrænset, fortryd, tæller) | 0/+ (ingen N; men handler på UDKAST uden registrering) | ++ (alle flag synlige, fire tilstande) – forudsat fire tegn |
| **Brugervenlighed** | – | + | + for erfaren, − for urutineret | ++ |
| **Kognitiv belastning** | Høj i højre side | Lavere; panel hopper stadig ved match | Lavest ved opslag; notat skrives selv | Lav; fast flade |
| **A** (tast + klik) | 21 + 2 klik + rulning | ca. 27 + 1 klik | ca. 14, ufuldstændigt notat | ca. 29, 0 klik |
| **B** | 14 + 2–3 klik + rulning | ca. 14 + 2 klik | 1 (intet notat) | ca. 14; behandling bag `O` |
| **C** | 14 + 2 klik + 5.000 px | ca. 11 + 1 klik | 1–6 | ca. 13, 0 klik |
| **D** | 4, derefter mangler felter | Uændret; børneflag synligt som linje | 1; børneflag synligt | Uændret; børneflag synligt med eget tegn |
| **E** | 18 + 2 klik + rulning | ca. 20 + 1 klik | ca. 8 | ca. 22, 0 klik |
| **Tid pr. scenarie** | Skøn 30–150 s i Cortex | Ikke estimeret | Ikke estimeret | Ikke estimeret |
| **Implementering** (skøn, soloudvikler) | – | 10–14 t | 14–20 t | 18–26 t (inkl. koncept 1) |
| **Risiko for regression i klinisk indhold** | – | Lav (datafiler: kun `normal` fjernes) | Middel (ny tastaturmodel; to notatformer) | Middel (stikord er ny tekst på godkendte flag) |
| **Ekspertvalg, fase 5** | – | Udvikler (derefter dele af 3) | Erfaren læge (delvist) | Yngre læge, designer |

Flere tastetryk i koncept 1 og 3 er tilsigtet: hvert ekstra tryk er en stillingtagen til et fund, som `N` i dag sætter usynligt. Jeg har ikke estimeret tid for koncepterne; det ville være et gæt.

---

## 2. Køreplan

Hvert trin er højst ca. 2 timer og har effekt i sig selv. Timetal er skøn.

**Trin 0 – dine beslutninger, ingen kode (ca. 30 min)**
- Afgør, hvilke objektive fund `N` må sætte, i alle fem regioner. Mit forslag: kun fund, der ses eller mærkes uden at bede patienten gøre noget. `[KRÆVER FAGLIG KILDEKONTROL]`
- Tjek på klinik-pc'en: skærmopløsning og zoom, og om Windows' udklipshistorik (Win+V) er slået til.
- Beslut, om Vercel-udgaven skal være offentlig.

**Trin 1 – største sikkerhedsgevinst pr. time (1 aften, ca. 1,5 t)**
- Fjern normalværdien fra de fund, du valgte i trin 0. Det er én linje pr. felt i datafilerne; ingen logik ændres.
- Holdt tast gentages ikke (`Esc` og taltaster).
- Klik på den åbne regionsknap rydder ikke.
- Fjern "Alder x–y år." fra notatteksten.

**Trin 2 – fortryd og synlig N (1 aften, ca. 2 t)**
- Ét fortrydelsestrin (`Ctrl+Z`) for valg, rydning og regionsskift.
- Det, `N` har sat, vises afvigende på knapperne, til du rører feltet. Den kopierede tekst ændres ikke.

**Trin 3 – tests, der låser sikkerheden (1 aften, ca. 2 t)**
- Tabeltest: "disse fund → disse flag" for scenarie A–E. Du godkender tabellen én gang.
- Fingeraftrykstest: ændres tekst, handling, betingelse eller konflikt i et godkendt punkt, fejler `npm run check` med punktets id.

**Stop og test (10 minutter, se afsnit 6).** Slår notatet din frase? Hvis nej: gå til "plan B" nedenfor.

**Trin 4 – flag, der kan aflæses (1 aften, ca. 2 t)**
- Flag som én linje i fast rækkefølge; udfoldes ved match eller klik. Tæller i overskriften ved match.
- Fast notathøjde, så listen ikke flytter sig.
- Rød bruges kun til match. Konfliktmarkering bliver grå.
- GODKENDT-mærke, dato og statuslinjens optælling vises kun på gennemgangssiden. UDKAST og KILDE MANGLER vises fortsat.
- Linjens tekst er det, der står før første kolon i flaget. Flag uden kolon kræver, at du formulerer et stikord, og det sender flaget tilbage til UDKAST. `[KRÆVER FAGLIG KILDEKONTROL]`

**Trin 5 – fire tilstande (1 aften, ca. 2 t)**
- Hvert flag får ét af fire mærker: matcher / ikke opfyldt af det registrerede / ikke vurderet / vurderes klinisk.
- Først skal det defineres, hvornår et flag er "ikke vurderet" (flag har flere alternative betingelser, og traumefelter er skjult uden traume). Definitionen skal have en test.

**Trin 6 – fra flag til plan (1–2 aftener + din godkendelse)**
- Hvert henvisningspunkt får et valgfrit felt: hvilke flag det hører til. Skrives som UDKAST; du godkender. `[KRÆVER FAGLIG KILDEKONTROL]`
- "Næste skridt" under flagene: handling + henvisningspunkt med tydeligt UDKAST-mærke. `H` flytter fokus dertil, tal sætter P, `Esc` går tilbage til felterne.
- Differentialdiagnoser, behandling og øvrige henvisninger foldes sammen.

**Trin 7 – dit indhold (ingen kode, din tid)**
- Gennemgå de tre akutte henvisningspunkter i knæ først, derefter resten.
- Træf valget ved aflåst knæ, og skriv handlingen som valget (se afsnit 5).
- Flyt Claudes beslutningsnotat ud af frakturflagets tekst, og godkend flaget igen.

**Trin 8 – kun hvis du savner det efter brug (2 aftener)**
- Henvisningstekst dannet af de registrerede felter. Tre eksperter pegede på, at det er her, der er mest skrivearbejde at spare. Det er fravalgt i `docs/plan.md`; jeg foreslår ikke at ændre det, før trin 1–6 er i brug.

**Plan B, hvis notatet ikke slår din frase:** Behold trin 1–5. Byg i stedet for trin 6 koncept 2's kort: flag som stikord til venstre og de regionale veje sorteret efter hast til højre, uden rulning. Lad notatet ligge bag et opslag.

---

## 3. De vigtigste fund

Rækkefølge: klinisk sikkerhed, kognitiv belastning, hastighed, æstetik. Detaljer og referencer står i `01-faktagrundlag.md` og `02-syntese.md`.

### Klinisk sikkerhed

**F1. `N` dokumenterer undersøgelser, der ikke er lavet.** Kritisk. Alle fire eksperter.
- `N` sætter normalfund i alle synlige, ubesvarede objektive felter i hele regionen, uanset hvor fokus står. `[KODE]` `lib/tastatur.ts:45-53`
- Ved knætraume er det op til 11 fund, herunder de fem, der afgør akut røntgen og flaget om strækkeapparatet. `[APP]`
- Hverken notat eller skærm viser, hvad der er sat via `N`. `[KODE]` `indhold/typer.ts:92`
- I scenarie E gav det: "Svært nedsat bevægelighed … Kan flektere knæet til 90 grader. Går fire vægtbærende skridt" hos en patient registreret som "Kan ikke støtte på benet". `[APP]` (erfaren læge)
- Der er præcedens for at holde et felt ude: rektaleksploration i ryg har ingen normalværdi. `[KODE]`

**F2. "Ikke fremhævet" kan læses som "afkræftet".** Kritisk. Tre eksperter.
- Tre grunde til manglende fremhævning ser ens ud: betingelsen er ikke opfyldt, felterne er tomme, eller flaget har ingen betingelse. `[KODE]`
- 4 af 10 knæflag kan aldrig fremhæves, herunder barn med knæsmerter. `[KODE]` `indhold/knae.ts:547-593`
- Scenarie A: svarer lægen korrekt nej til "Hævelse straks" (hævelsen kom efter timer) og springer stabilitet over, fremhæves intet flag, selv om flagteksten siger "hæmartron i løbet af få timer". `[APP]`
- Scenarie E: låsning uden "svært nedsat bevægelighed" fremhæver intet. `[APP]`

**F3. Det fremhævede flag kan ligge uden for skærmen.** Kritisk ved lille skærm. `[APP]`
- Uden at rulle ses 6 af 10 flag ved 1920×1080 og 3 af 10 ved 1366×768; færre, når notatet vokser.
- I scenarie A ved 1366×768 ligger det eneste fremhævede flag 111 px under skærmkanten. Der er ingen tæller.
- Et matchende flag adskiller sig med en baggrund, der har kontrast 1,17:1 mod hvid.

**F4. Scenarie D leder ikke tanken mod hoften.** Høj. Tre eksperter.
- Alder kan kun registreres ved traume; halten har intet felt. `[KODE]` `indhold/knae.ts:108-111`
- Flaget om børn nævner hoftelidelse og røntgen af hofter, men er nr. 10, kan ikke fremhæves og er aldrig synligt uden rulning. `[APP]`
- `N` giver et normalt knænotat med "Stabilt ved klinisk ligamenttest". Skærmen beroliger.
- Indholdet findes; felterne mangler. Jeg har ikke tilføjet noget. `[KRÆVER FAGLIG KILDEKONTROL]`

**F5. GODKENDT er ikke bundet til den godkendte tekst.** Høj. `[KODE]`
- Status og dato er håndskrevne tekststrenge. De siger ikke hvem, mod hvilken kildeversion, eller hvilke dele af punktet.
- Ingen test håndhæver reglen "ændret tekst → tilbage til UDKAST". `indhold/indhold.test.ts:83-88`
- Alle 37 flag blev godkendt i ét commit, knap to timer efter et commit, der tilføjede tre flag og ændrede tekster. Om hvert flag blev læst, ved kun du.
- Det godkendte frakturflag indeholder "Beslutning (truffet af Claude …)" og "Originalstudierne … er ikke læst". `indhold/knae.ts:486`
- Fremhævningsbetingelserne er Claudes oversættelse og er ikke testet mod eksempler.

**F6. Tavst datatab.** Høj. `[APP]`
- Dobbelt-Esc rydder uden bekræftelse og uden fortryd. Holdt `Esc` gør det samme (simuleret).
- Ét klik på en regionsknap rydder alt, også på den region, der er åben.
- Klik på det allerede valgte "Traume = Ja" sletter 9 svar; de kommer ikke tilbage.

**F7. Det, lægen klikker i planen, er UDKAST.** Høj. Flagene er godkendt; alle 12 henvisningspunkter er UDKAST. Forskellen er let at overse.

### Kognitiv belastning

**F8. Vejen fra flag til handling mangler.** Høj. Alle fire eksperter.
- Scenarie C: "Indlægges akut" står øverst; henvisningspunktet ligger ca. 5.000 px nede (6.000 px ved 1366×768). `[APP]`
- CVI forklares ikke, og knæmodulet har ingen kontaktvej til CVI. `[KODE]`
- Der er ingen henvisningsfunktion. `+ P` sætter én fast sætning. `[KODE]`

**F9. Konflikten ved aflåst knæ konkluderer ikke.** Høj. Tre eksperter.
- Handlingen lyder "akut eller subakut, se konflikt". Udfoldet vises tre citater og "Lægehåndbogen 2026" to gange. `[APP]`
- Det regionale svar findes i et henvisningspunkt 5.500 px væk.
- Frakturflaget viser, hvordan det bør se ud: begge regler nævnt, og handlingen er valget.

**F10. Metadata fylder mere end handling.** Middel. Alle fire eksperter. 95 kildelinks, 53 statusmærker, ca. 2.200 ord i højre panel. Rød bruges til fire betydninger, grøn til seks. "✓ GODKENDT" under "Bakteriel artrit" kan læses som "i orden".

**F11. Notatet skal formentlig redigeres.** Høj ifølge den erfarne læge; ikke rejst af de andre. `[KRÆVER BRUGERTEST]`
- Dobbeltsætninger ("Forudgående traume. Traume ved vrid."), "Alder 12–50 år.", telegramstil.
- Notatet kan ikke rettes i Cortex, og der er ingen fritekst til V og P. `[KODE]`

### Hastighed

**F12. Tastaturet dækker registrering og kopiering, ikke vurdering og plan.** `+ V` og `+ P` har ingen genvej (32 og 44 Tab-tryk i scenarie A). Efter et klik i højre panel er tastaturet dødt, til man klikker på et felt. `[APP]`

**F13. Feltet "Hævelse straks" passer ikke til anamnesen** og giver enten forkert notat eller manglende fremhævning. Tre eksperter. `[KRÆVER FAGLIG KILDEKONTROL]`

### Det, der virker og skal bevares

- Feltrækkerne med taltaster og automatisk fremrykning.
- Notatet som ren funktion af valgene; tomt input giver tomt notat.
- Flag vises altid; der står aldrig "ingen røde flag".
- Scenarie B giver nul fremhævede flag.
- De regionale henvisningsveje – ifølge den erfarne læge appens største værdi.
- Ingen lagring og ingen netværkskald; CSP blokerer teknisk. `[APP]`
- Den lille kodebase: indhold adskilt fra kode, tastaturlogik som testet ren funktion.

---

## 4. Fjern eller byg ikke

**Fjern**
- `N` for fund, der kræver en aktiv test.
- GODKENDT-mærke, dato og statuslinjens optælling fra konsultationsskærmen.
- Rød kant på ikke-matchende flag og rød konflikttekst.
- "Alder x–y år." i notatet.
- Handlingen "se konflikt".
- Claudes beslutningsnotat i frakturflagets tekst.
- `+ V` på hovedskærmen, når trin 6 er bygget. Vurderingen skrives i journalen.

**Byg ikke**
- En ny tre-tilstands-datamodel. Modellen har tilstandene; det, der manglede, var oprindelsen og visningen. Ombygning: 5–8 timer med høj regressionsrisiko.
- Redigerbart notat og fritekst til V og P. Det er journalsystemets opgave.
- Opfølgning, sikkerhedsnet og sygemelding i notatet.
- Flere anamnesefelter (krepitation, morgenstivhed m.fl.), før notatet er testet mod din frase.
- Mønstertjek for CPR i fritekst. Det giver falsk tryghed.
- Godkendelsesfil med hash pr. punkt. God idé, men fingeraftrykstesten løser problemet for det halve.
- Bekræftelsesdialog ved kopiering eller rydning. Den bliver klikket væk; fortryd er bedre.
- Flere regioner, før trin 1–3 er lavet i de fem, der findes.

---

## 5. Åbne kliniske spørgsmål til dig

Alle er `[KRÆVER FAGLIG KILDEKONTROL]`. Jeg har ikke åbnet kliniske kilder i denne gennemgang.

1. **Hvilke objektive fund må `N` sætte?** I knæ er kandidaterne til at udgå: stabilitet, ømhed patella, ømhed caput fibulae, fleksion til 90°, 4 skridt og strakt benløft. Hvad med bevægelighed og ledlinjeømhed? Og i de fire andre regioner?
2. **Har du læst hvert af de 37 flag, eller bør nogle gennemgås igen?** Især de tre rygflag fra samme nat og fremhævningsbetingelserne.
3. **Aflåst knæ: hvad gør du?** Henviser du efter den regionale forløbsbeskrivelse (subakut, under 1 uge), og skal det stå som flagets handling?
4. **Hævelse efter traume:** Skal feltet kunne skelne "straks" fra "inden for få timer", og skal det sidste fremhæve ligamentflaget? Hvad siger kilderne om tidsbegrebet?
5. **Alder uden traume:** Skal alder altid kunne angives, og skal "under 12" fremhæve flaget om børn?
6. **Barn med knæsmerter:** Skal halten og hofteundersøgelse kunne registreres i knæmodulet? Hvilke fund ifølge kilderne?
7. **Alloplastik og andre risikofaktorer for infektion:** Skal de være felter, der fremhæver flaget om bakteriel artrit? Gælder en anden vej ved proteseinfektion end ved nativt led?
8. **Feber:** Er ja/nej tilstrækkeligt, når patienten er subfebril?
9. **CVI:** Findes der en kildebelagt kontaktvej, som kan stå ved de akutte henvisningspunkter?
10. **Kobling flag → henvisningspunkt:** Vil du godkende den punkt for punkt, når den er skrevet som UDKAST?
11. **Stikord til flag uden overskrift** (i knæ: septisk bursit og læghævelse; flere i de andre regioner): hvad skal de hedde?
12. **Patientens blik:** Er det i orden, at "sarkom", "leukæmi" og "alkoholmisbrug" kan læses på skærmen ved hvert knæ?

---

## 6. Test med rigtige læger på 10 minutter

**Test 1 – slår notatet frasen? (dig selv, 10 min, afgør plan A eller B)**
1. Tag fem rigtige knækonsultationer fra den seneste uge, uden patientdata foran dig.
2. Skriv notatet for hver, først som du plejer (frase eller diktering), så i Cortex. Tag tid med telefonen.
3. Tæl for Cortex-notatet: hvor mange sætninger slettede eller rettede du efter indsætning?
4. Kriterium: Cortex skal være hurtigere inkl. rettelser i mindst tre af fem. Ellers plan B.

**Test 2 – læses "ikke fremhævet" som "afkræftet"? (én kollega, 10 min)**
1. Giv en kollega scenarie A og D på papir, og lad vedkommende registrere i Cortex uden instruktion.
2. Spørg bagefter: "Hvad fortalte skærmen dig om røde flag?" Skriv svaret ned ordret.
3. Se efter: bruges `N`? Rulles der i højre side? Nævnes hoften i D?

**Test 3 – kun på klinik-pc'en (5 min)**
- Skærmopløsning og browserzoom. Hvor mange flag ses uden at rulle?
- Virker kopiering fra den lokale fil i klinikkens browser?
- Er udklipshistorik eller synkronisering slået til?
- Hvad sker der, hvis du holder `Esc` nede?

**Test 4 – patientens blik (løbende, en uge)**
- Notér, hver gang en patient kommenterer eller tydeligt læser på skærmen.

---

## 7. Forbehold

- Skærmbilledet `docs/screenshots/cortex-knae-2026-11-15.png` findes ikke i repoet. Jeg har brugt egne skærmbilleder.
- Afprøvet i Chromium fra en lokal fil. Klinikkens browser og journalsystem er ikke afprøvet.
- Testene er ikke kørt (afhængigheder er ikke installeret). At de er grønne, er udledt af seneste commit.
- Kun knæmodulet er gennemspillet. Fundene om `N`, flag og godkendelse gælder efter koden alle fem regioner; de øvrige regioners felter er ikke gennemgået.
- To eksperter i fase 2 blev afbrudt af en brugsgrænse og genoptaget. Deres svar er fuldstændige.
- `docs/plan.md` siger, at Vercel-koblingen ikke virker. Den virker; `cortex-phi-seven.vercel.app` leverer den aktuelle udgave offentligt. Jeg har ikke rettet planen, fordi jeg kun må skrive i `docs/ux-review/`.

## Bilag

| Fil | Indhold |
|---|---|
| `01-faktagrundlag.md` | Kortlægning af koden og afprøvning i browser |
| `eksperter/` | Fire uafhængige evalueringer (fase 2) |
| `02-syntese.md` | Konsensus, uenigheder, enkeltfund, tre niveauer, dokumentation, troværdighed |
| `03-koncepter.md` | Tre koncepter med wireframes og gennemspilning af A og C |
| `konceptvurdering/` | Fire uafhængige vurderinger af koncepterne (fase 5) |
| `skaermbilleder/` | Skærmbilleder af knæmodulet i scenarie A, B, C og E |
