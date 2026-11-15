# Senior produktdesigner (UX og visuel) – evaluering af Cortex, knæ

Grundlag: commit `973034f`, `cortex.html` kørt i Chromium (Playwright) ved 1920×1080 og 1366×768, 2026-11-15. Simuleret perspektiv, ikke en rigtig bruger. Mærker: `[KODE]`, `[APP]` (egne målinger, medmindre "jf. faktagrundlag"), `[UDLEDT]`.

## 1. Samlet dom

Venstre halvdel (felter → notat) frigiver overskud: den er hurtig, rolig og forudsigelig, og S/O-notatet er færdigt på 14–21 tastetryk.
Højre halvdel koster overskud: ca. 2.200 ord, 95 kildelinks og 53 statusmærker i ét panel på 6–10 skærmhøjder, hvor det ene signal, der betyder noget ("dette flag matcher"), er svagt og ofte ligger uden for skærmen.
Samlet: dokumentationen er en gevinst, beslutningsstøtten er i sin nuværende form et opslagsværk, der skal betjenes – ikke et signal, der kan aflæses med et blik.

## 2. Top 5 problemer

**1. Det fremhævede flag er usynligt, når det gælder – KRITISK · `[APP]` · A, C, E**
Ved 1366×768 er kun flag 1–2 synlige efter udfyldning. I scenarie A ligger det eneste fremhævede flag (nr. 4, akut ligamentskade) 111 px under skærmkanten (top 879 af 768). I E er "Aflåst knæ" skåret af i bunden (top 720). I C er flag nr. 8 skjult i begge skærmstørrelser. Intet tæller eller peger ("1 flag matcher ↓"). Flagene flyttes ikke op (`Beslutningsstoette.tsx:41-51`), og hvert flag fylder 102–230 px. Dertil vokser notatet og skubber flag 1 ned fra y=194 til y=312 (118 px) i løbet af A – målet flytter sig, mens man taster. Konsekvens: lægen kan afslutte A uden at have set, at Cortex reagerede. Skærmen ser ud som i scenarie B.

**2. Rød og grøn har mistet signalværdi – HØJ · `[KODE]`/`[APP]` · alle, især B**
`--advarsel` bruges til fire forskellige betydninger: kategori (venstrekant på alle 10 flag, altid – `styles.css:175`), match (`:176`, `:197`), "kilderne er uenige" (redaktionel note – `:206`) og fejl/kilde mangler (`:92`, `:204`). I scenarie B, hvor intet er galt, viser skærmen 6 røde kanter og 2 røde "⚠ Kilderne er uenige". Forskellen på et matchende og et ikke-matchende flag er en flade med kontrast 1,17:1 mod hvid, en 1 px kant og en 12 px tekstlinje – det ses ikke i øjenkrogen. Tilstandene "ikke opfyldt", "ikke udfyldt" og "har ingen betingelse" ser ens ud (4 af 10 flag kan aldrig fremhæves). `--accent` (grøn) bærer tilsvarende seks roller: valgt svar, aktivt felt, kildelink, GODKENDT, Kopiér og valgt +V/+P. Et grønt "✓ GODKENDT" lige under "Bakteriel artrit" læses som "i orden" – også af patienten.

**3. Redaktionel metadata fylder mere end klinisk handling – HØJ · `[APP]` · alle**
Hvert af de 53 punkter har kildelinks (95 i alt), statusmærke (43 UDKAST, 10 GODKENDT) og evt. konflikt. Handlingslinjen ("→ Indlægges akut") har samme vægt som brødteksten og drukner i den; sektionsoverskriften "RØDE FLAG" er 12 px grå og er panelets svageste element. Linjelængden er 125 tegn ved 1920 px (86 ved 1366) – for langt til at skimme. Metadata er nødvendig, når lægen redigerer indhold om aftenen, ikke i konsultationen. Konsekvens: det, der skal læses på 2 sekunder, kræver 20.

**4. Flag fører ikke til handling; V og P er en museopgave langt væk – HØJ · `[APP]` (afstande jf. faktagrundlag) · C, E, A**
Fra "Indlægges akut" til det tilhørende henvisningspunkt er der ca. 5.000 px. `+V`/`+P` er 40×23 px (under WCAG 2.2's 24×24) med 12 px tekst og er de eneste kontroller uden genvej. Efter et klik dér er tastaturet dødt, til man klikker tilbage i et felt (egen måling: `1` og `↓` gør intet; fokus står på knappen). I E siger handlingen "se konflikt"; konflikten er foldet sammen, sat i panelets mindste brødtekst (12,75 px), viser "Lægehåndbogen 2026" to gange og konkluderer ikke. Den forvirrer mere, end den hjælper: lægen får at vide, at der er et problem, men ikke hvad der gælder i egen region.

**5. Lydløse, irreversible tilstandsskift – MIDDEL (N: høj) · `[APP]`/`[KODE]`**
`N` udfylder op til 11 fund uden nogen markering af, hvad der blev sat (identisk udseende med egne valg). Klik på den allerede aktive regionsknap tømmer alt (egen måling). Ét `Esc` giver ingen synlig reaktion, det andet rydder. Skift af traume fra ja til nej sletter svar uden besked. "Kopieret" er 12,75 px grøn tekst ved siden af knappen – korrekt og vedvarende, men let at overse, når blikket allerede er på vej til journalsystemet.

Mindre fund `[APP]`: kanten på ikke-valgte knapper har kontrast 1,36:1 (under 3:1 for kontroller; teksten bærer dog). Tekstkontrast er i orden overalt (4,8–13,7:1). `kbd` er 10,2 px.

## 3. Måltal pr. scenarie

Tastetryk er målt i appen (egen gennemspilning, inkl. regionsvalg og `N`, fritekst = 1). Resten er skøn fra et simuleret perspektiv.

| | Tastetryk (målt) | Museklik V+P (skøn) | Fremhævet flag synligt uden rulning ved 1366×768 (målt) | Opslag uden for Cortex (skøn) | Blik væk fra patienten (skøn) | Tid (skøn) |
|---|---|---|---|---|---|---|
| A | 21 | 2 + rulning ca. 5 skærme | Nej (0 af 1) | 0–1 (CVI-kontakt) | 4–6 | 60–90 s |
| B | 14 | 2–3 + rulning | Ingen fremhævet (korrekt) | 0 | 2–3 | 30–45 s |
| C | 14 | 1–2 + rulning | 1 af 2 | 1 (telefonnummer/visitation) | 3–4 | 45–60 s; flaget ses straks |
| D | 5, derefter mangler felter | – | Ingen; børneflag er nr. 10 | 1+ | – | Ikke meningsfuldt |
| E | 19 | 1–2 + udfold konflikt + rulning | Delvist (afskåret i bunden) | 1 (afgøre akut/subakut) | 4–6 | 75–120 s |

D: Cortex leder ikke tanken mod hoften. Alder og halten kan ikke registreres uden traume (jf. faktagrundlag), og flaget om børn kan ikke fremhæves og ligger altid under skærmkanten. Indholdet findes i flagteksten; et aldersfelt uden for traume og en betingelse på flaget er `[KRÆVER FAGLIG KILDEKONTROL]` – spørgsmål til lægen: skal alder kunne angives altid, og skal "under 12" fremhæve børneflaget?

## 4. Bevares

- Feltrækkerne: én række pr. felt, fast etiket-kolonne, tal på knapperne kun i det aktive felt, automatisk fremrykning. Tæt, roligt og lærbart. `[APP]`
- Notatet bygges løbende og står fast øverst til højre; Ctrl+Enter virker fra alle fokus.
- "Tomt. Notatet indeholder kun det, du aktivt vælger." – god tomtilstand.
- Flag skjules aldrig, og der står aldrig "ingen røde flag".
- Den afdæmpede palet og systemskrift: ligner et arbejdsredskab, ikke en app. Scenarie B er roligt i venstre side.
- "Vist for valgt diagnose" (filtrering af behandling efter +V) – det rigtige princip; bør udvides, ikke fjernes.

## 5. Fjernes (fra konsultationsvisningen)

- Statusmærker og kildelinks på hvert punkt. Vis kun afvigelsen (UDKAST, KILDE MANGLER) som et lille gråt mærke; resten hører hjemme på gennemgangssiden (`G`).
- Den røde venstrekant på ikke-matchende flag og rød farve på "Kilderne er uenige" (gør den grå). Rød = "matcher dine valg" og intet andet.
- Statuslinjens optælling ("53 punkter · 43 UDKAST …") – redaktørinformation.
- Rydning ved klik på den aktive regionsknap.
- "se konflikt" som handling. En handling skal kunne udføres. `[KRÆVER FAGLIG KILDEKONTROL]`: hvad gør lægen selv i Region Hovedstaden ved aflåst knæ?

Mindste ændringer med størst effekt, i rækkefølge: (a) matchende flag øverst i listen plus en tæller i sektionsoverskriften; (b) flag foldet til én linje (overskrift + handling), udfoldes ved match eller klik – så er alle 10 synlige ved 1366×768 `[UDLEDT]`; (c) rød forbeholdt match; (d) notatets højde låst, så listen ikke hopper.

## 6. Én radikal idé

Vend højre panel om: fra dokument til **statuslinje med opslag bagved**. Under notatet står kun én fast "Røde flag"-stribe med ti enlinjede navne i fast rækkefølge; matchende bliver røde og folder handling + regional henvisning ud på stedet med ét `+P`. Differentialdiagnoser, behandling og henvisning vises først, når lægen beder om dem (én tast), og da filtreret efter valg. Begrundelse for almen praksis: lægen ser 20–30 patienter om dagen på samme skærm; et panel, der ser ens ud hver gang og kun ændrer sig, når noget matcher, kan aflæses perifert uden at læse – og patienten, der kigger med, ser ti neutrale stikord frem for "alkoholmisbrug", "sarkom" og "leukæmi". Det kræver intet nyt klinisk indhold og intet nyt framework.

## 7. Usikkerhed og brugertest

- Om rulning i højre panel faktisk sker i en konsultation, eller om V/P bare skrives i journalsystemet (så er halvdelen af panelet ubrugt). `[KRÆVER BRUGERTEST]`
- Klinik-pc'ens skærmstørrelse og zoom: fund 1 er værst ved 1366×768; ved 1920×1080 er A's flag synligt. Skal måles på stedet.
- Om enlinjede flag er nok til at vække den rette tanke, eller om kriterieteksten skal være synlig. `[KRÆVER BRUGERTEST]`
- Patientens reaktion på flagteksterne og på ordet GODKENDT. `[KRÆVER BRUGERTEST]`
- Om `N` uden markering føles trygt efter en uges brug – eller om lægen holder op med at stole på notatet. `[KRÆVER BRUGERTEST]`
- Alle tider og blik-tal i tabellen er skøn. Jeg har ikke vurderet det kliniske indholds rigtighed.
