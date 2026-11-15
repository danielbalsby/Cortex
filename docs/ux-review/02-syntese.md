# 02 – Syntese af de fire ekspertevalueringer

Dato: 2026-11-15 · Grundlag: `01-faktagrundlag.md` og de fire filer i `eksperter/`. Eksperterne er simulerede perspektiver og har arbejdet uden at se hinandens svar. Forkortelser: **EL** = erfaren læge, **YL** = yngre læge, **SU** = softwareudvikler, **PD** = produktdesigner.

To eksperter (EL og PD) blev afbrudt af en brugsgrænse og genoptaget; deres svar er fuldstændige.

## Svar på kernespørgsmålet

Alle fire svarer det samme, uafhængigt af hinanden: **venstre side frigiver overskud, højre side koster overskud.** Registrering af S og O er hurtig (14–21 tastetryk). Beslutningsstøtten er et opslagsværk på 6–10 skærmhøjder, som skal betjenes med mus, og som ikke fører fra et flag til en handling. EL går længst: notatet skal alligevel rettes, så i fire af fem scenarier koster Cortex samlet set overskud.

---

## 1. Konsensus (mindst to eksperter, uafhængigt)

| # | Fund | Hvem | Alvor |
|---|---|---|---|
| K1 | **`N` dokumenterer undersøgelser, der ikke er lavet, og det kan ikke ses bagefter.** EL viste, at det giver selvmodsigende notater: aflåst knæ, der "flekterer til 90 grader" og "går fire skridt" hos en patient, der ikke kan støtte | Alle fire | Kritisk |
| K2 | **"Ikke fremhævet" ligner en frikendelse.** I scenarie A fremhæves intet, hvis lægen svarer ærligt nej til "Hævelse straks" (hævelsen kom efter timer) og ikke tester stabilitet. Tre grunde til manglende fremhævning kan ikke skelnes | YL, SU, PD (EL via feltfejlen) | Kritisk |
| K3 | **Det fremhævede flag kan ligge uden for skærmen.** Ved 1366×768 er kun flag 1–2 synlige efter udfyldning; i A ligger det eneste fremhævede flag under skærmkanten. Ingen tæller, ingen pil | PD (målt), YL, faktagrundlag | Kritisk ved lille skærm |
| K4 | **Vejen fra flag til handling mangler.** Ca. 5.000 px fra "Indlægges akut" til det tilhørende henvisningspunkt. CVI er ikke forklaret, og der er ingen kontaktvej | Alle fire | Høj |
| K5 | **Scenarie D leder ikke mod hoften – skærmen beroliger.** Alder og halten kan ikke registreres; børneflaget er nr. 10 og kan ikke fremhæves; `N` giver et normalt knænotat | EL, YL, PD | Høj |
| K6 | **Konflikten ved aflåst knæ forvirrer.** "Akut eller subakut, se konflikt" er ikke en handling. Det regionale svar findes, men 5.500 px væk | EL, YL, PD | Høj (YL), middel (EL) |
| K7 | **Feltet "Hævelse straks" passer ikke til anamnesen** ("inden for få timer") og giver enten forkert notat eller manglende fremhævning | EL, YL, SU | Høj |
| K8 | **Metadata fylder mere end handling.** GODKENDT-mærke med dato på hvert flag, 95 kildelinks, statuslinjens optælling. Vis kun afvigelser i konsultationen; resten på gennemgangssiden | Alle fire | Middel |
| K9 | **Tavst datatab.** Klik på aktiv regionsknap rydder; skift af traume sletter svar; ingen fortryd | SU, PD, faktagrundlag | Høj |
| K10 | **"Alder 12–50 år." hører ikke hjemme i notatet** | EL, YL | Lav |
| K11 | **Patienten kan læse "sarkom", "leukæmi", "alkoholmisbrug"** ved et artroseknæ | EL, YL, PD | Kræver brugertest |
| K12 | **Vend højre panel om.** Tre eksperter foreslår uafhængigt samme retning: flag som korte linjer, handling og regional vej øverst, opslagsværket bagved | EL, YL, PD | – |

**Bevares (alle fire enige):** feltrækkerne med taltaster og automatisk fremrykning; notatet som ren funktion af valgene; at flag altid vises, og at der aldrig står "ingen røde flag"; at scenarie B er roligt; frakturflagets form (begge regler nævnt, handlingen siger hvad man gør); de regionale henvisningsveje; ingen lagring og ingen netværkskald.

---

## 2. Uenigheder og min stillingtagen

**U1. Er notatet en gevinst?**
EL: nej – det skal rettes, mangler opfølgning og sikkerhedsnet, og en frase er hurtigere. YL, SU, PD: ja – S/O er her, overskuddet kommer.
*Stilling:* Begge har ret om hver sin del. S/O-registreringen er hurtig; teksten er telegramstil og har fejl, der er billige at fjerne (aldersinterval, dobbeltsætninger). Om det samlet slår frase eller diktering, kan ingen af os afgøre. Det er den vigtigste brugertest (se rapporten). Indtil den er lavet: ret de billige tekstfejl, og byg ikke videre på V/P.

**U2. Tre tilstande pr. fund – ny model eller ej?**
Opgaven beder om tre tilstande. SU: modellen har dem allerede (valgt positivt / valgt normalt / fraværende); det, der mangler, er *oprindelsen*, og en ny model koster 5–8 timer med høj regressionsrisiko. EL: fjern `N` for de fund, der kræver en aktiv test.
*Stilling:* SU har ret teknisk, EL har ret klinisk. Der skal ikke bygges en ny model. Der skal (a) fjernes normalværdi fra de fund, der kræver en manøvre, (b) markeres, hvad `N` har sat, og (c) vises "ikke vurderet" på et flag, når de felter, det afhænger af, er tomme. Punkt (c) er det sted, hvor "ikke undersøgt" faktisk betyder noget for sikkerheden.

**U3. Skal matchende flag flyttes øverst?**
PD's mindste ændring: ja. PD's egen radikale idé og projektets princip (fast rækkefølge, kun fremhævning): nej.
*Stilling:* Nej. Fast rækkefølge gør, at skærmen kan aflæses i øjenkrogen, fordi den ser ens ud hver gang. Problemet løses ved, at alle ti flag er synlige på én gang (én linje hver), og at matchende folder sig ud på stedet. En tæller i overskriften er sikkerhedsnettet.

**U4. Er én linje pr. flag nok?**
EL og PD: ja, teksten er støj for den, der kan flagene. YL: jeg bruger teksten som tjekliste.
*Stilling:* Én linje som standard, fuld tekst ved match eller klik. Brugeren er én læge, som selv har godkendt teksterne. `[KRÆVER BRUGERTEST]`

**U5. Fingeraftrykstest (2 t) eller godkendelsesfil (3–4 t)?**
Begge er SU's forslag. *Stilling:* testen først. Den lukker hullet uden at røre fem indholdsfiler. Godkendelsesfilen er rigtigt tænkt, men kan vente, til testen har vist sin værdi.

**U6. Fjern GODKENDT-mærket – men opgaven kræver, at status siger præcist hvad, hvem og mod hvilken version.**
*Stilling:* Ingen modsætning. I konsultationen vises kun afvigelser (UDKAST, KILDE MANGLER). På gennemgangssiden vises den fulde proveniens. De to visninger har forskellige formål.

---

## 3. Fund, kun én ekspert har gjort

| Fund | Fra | Vurdering |
|---|---|---|
| Holdt `Esc` rydder alt, og holdt taltast besvarer felt efter felt (`event.repeat` tjekkes ikke) | SU | **Tages med.** Sikkerhedsfund, 30 minutter at rette. Simuleret, ikke prøvet på et rigtigt tastatur |
| Klik på det allerede valgte "Traume = Ja" sletter 9 svar | SU | **Tages med.** Løses af ét fortrydelsestrin |
| `N` giver indbyrdes modstridende fund i samme notat | EL | **Tages med.** Skærper K1 fra "udokumenteret" til "åbenlyst forkert" |
| Det fremhævede flag er GODKENDT, men det henvisningspunkt, lægen klikker i notatet, er UDKAST | YL | **Tages med.** De akutte henvisningspunkter bør gennemgås før alt andet indhold |
| Rød har fire betydninger, grøn seks; et matchende flag adskiller sig med kontrast 1,17:1. "✓ GODKENDT" under "Bakteriel artrit" kan læses som "i orden" | PD | **Tages med.** Ren CSS, lav risiko |
| Notatet vokser og skubber flaglisten 118 px ned, mens man taster | PD | **Tages med.** Løses af fast notathøjde |
| Fremhævningsreglen ligger i en komponent og er ikke testet | SU | **Tages med.** Én tabeltest med scenarie A–E |
| Claudes beslutningsnotat står i et godkendt flags tekst | SU | **Tages med.** Kræver, at lægen godkender flaget igen |
| Appen viser ikke, hvilken version der kører | SU | Tages med, lav prioritet |
| Notatet mangler opfølgning, information og sikkerhedsnet | EL | **Bygges ikke.** Det er lægens egen tekst og hører til i journalen. Bekræfter, at V/P ikke bør udbygges |
| "Feber: Nej" ved 37,9 står ved siden af fritekst "Tp 37,9" | YL | Spørgsmål til lægen (feltets udformning) |
| Felter for krepitation, morgenstivhed, igangsætningssmerter mangler | EL | **Bygges ikke nu.** Flere felter er flere tastetryk; afvent brugertest af notatet |
| Mønstertjek for CPR i fritekst | SU (i tvivl) | **Bygges ikke.** Giver falsk tryghed |
| `+V`/`+P` er 40×23 px | PD | Løses, hvis knapperne beholdes |
| Cortex som opslagskort, notat sekundært | EL | Bliver koncept 2 |

---

## 4. Hvor bryder arbejdsgangen mellem de fem funktioner?

| Overgang | Tilstand | Hvad der sker i dag |
|---|---|---|
| 1 Indsamling → 2 Notat (S/O) | **Hænger sammen** | Hvert valg bliver straks en sætning |
| 1 Indsamling → 4 Røde flag | **Halvt** | Fremhævning virker, men kan ligge uden for skærmen; manglende data og "ikke opfyldt" ser ens ud; fire flag kan ikke reagere |
| 4 Røde flag → 3 Handling | **Brudt** | Flaget siger "indlægges akut". Henvisningspunktet ligger 5.000 px væk. Lægen bygger selv broen |
| 3 Handling → 2 Notat/henvisning | **Brudt** | Én fast sætning via museklik. Ingen henvisningstekst, selv om felterne indeholder næsten alt, den regionale vejledning beder om |
| 5 Evidens → 3 Handling | **Brudt ved konflikt** | Konflikten citerer og konkluderer ikke |
| 2 Notat → journalsystem | **Uafklaret** | Skal redigeres ifølge EL. `[KRÆVER BRUGERTEST]` |

**Svar på spørgsmålet:** En handlingsanbefaling følges ikke op. Lægen skal selv finde henvisningspunktet, selv finde kontaktvejen og selv skrive henvisningen.

---

## 5. Beslutningsstøtte i tre niveauer

| Niveau | Hvad | Visning | Hvornår |
|---|---|---|---|
| **1. Generel sikkerhedsinformation** | Alle regionens røde flag | Én linje pr. flag (overskriften), fast rækkefølge, alle synlige uden at rulle. Neutral farve | Altid |
| **2. Situationsbestemt advarsel** | Flag, hvis betingelse er opfyldt af det registrerede | Linjen bliver rød og folder tekst og handling ud på stedet. Tæller i overskriften | Ved match |
| **3. Konkret handlingsanbefaling** | Det henvisningspunkt, der hører til flaget | Vises i det udfoldede flag med regional vej og ét tryk til notatet | Ved match, hvis lægen har godkendt koblingen |

**Prioritering uden at skjule:** Intet flag forsvinder nogensinde. Niveau 1 er altid fuldt synligt, fordi det kun fylder ti linjer. Rød bruges kun til niveau 2.

**Flag, der ikke kan vurderes, fordi data mangler:** Et flag med betingelse, hvor ingen af de felter, det afhænger af, er udfyldt, mærkes diskret "ikke vurderet". Flag uden betingelse mærkes "vurderes klinisk". Dermed er der fire synlige tilstande i stedet for to: *matcher* / *ikke opfyldt af det registrerede* / *ikke vurderet* / *vurderes klinisk*. Der står stadig aldrig "ingen røde flag", og "ikke opfyldt" formuleres aldrig som en afkræftelse.

Koblingen fra flag til henvisningspunkt er klinisk indhold. `[KRÆVER FAGLIG KILDEKONTROL]` Den skal skrives som UDKAST og godkendes af lægen punkt for punkt.

---

## 6. Dokumentation

**Tre tilstande:** Der bygges ikke en ny model (se U2). De tre tilstande opnås sådan:
- *Positivt* = valgt afvigende fund (findes).
- *Undersøgt og negativt* = valgt normalfund, **og det skal kunne ses, om lægen selv valgte det, eller `N` satte det** (mangler).
- *Ikke undersøgt* = fravær. Skrives ikke i notatet, men vises på de flag, det har betydning for (mangler).

`N` må kun sætte fund, der kan vurderes ved inspektion og almindelig palpation. Hvilke felter det er, er lægens faglige valg. `[KRÆVER FAGLIG KILDEKONTROL]`

**Løbende generering:** Ja, behold den. Den er forudsigelig og kræver ingen betjening. Notatets højde bør låses, så resten af skærmen ikke flytter sig.

**Hvornår gennemses notatet?** I dag aldrig tvunget. Forslag: `N`-satte sætninger vises afvigende i notatvisningen (ikke i den kopierede tekst), indtil lægen har rørt feltet eller kopieret. Kopiering er dermed det naturlige gennemsyn: det, der stadig er markeret, er det, lægen ikke selv har taget stilling til. Ingen ekstra bekræftelsesdialog – den ville blive klikket væk.

---

## 7. Klinisk troværdighed

**Godkendelsesstatus skal kunne svare på fire spørgsmål.** I dag svarer den på ét (dato).

| Spørgsmål | I dag | Forslag |
|---|---|---|
| Hvad er godkendt? | Uklart: tekst, handling, betingelse og konflikt under ét | Fingeraftryk af præcis de fire dele. Ændres én, fejler testen |
| Af hvem? | Står ikke | Kun lægen godkender; det skrives ét sted (gennemgangssiden), ikke på hvert punkt |
| Mod hvilken kildeversion? | Står ikke | Fingeraftrykket omfatter de brugte kilders `aar` og `sidstTjekket`. Opdateres en kilde, falder punktet tilbage til UDKAST |
| Hvornår? | Dato | Uændret |

Samlegodkendelsen af 37 flag knap to timer efter, at tre flag blev tilføjet, er et faktum fra git-historikken. Om hvert flag blev læst, ved kun lægen. Det er et åbent spørgsmål i rapporten, ikke en påstand om fejl.

**Kildekonflikter skal have fast form.** I dag ét fritekstfelt. Forslag til fire faste dele:
1. Hvad hver kilde siger (med artiklens titel, ikke kun "Lægehåndbogen 2026").
2. Den praktiske konsekvens af forskellen.
3. Hvad der gælder i Region Hovedstaden.
4. Lægens valg – og handlingen på flaget skal være dette valg, ikke "se konflikt".

Frakturflaget har allerede del 4. Aflåst knæ mangler del 2–4. Del 3 og 4 er klinisk indhold og skal skrives af eller godkendes af lægen. `[KRÆVER FAGLIG KILDEKONTROL]`

**Kildevisning:** Vis artiklens titel ved siden af år, så to artikler fra samme udgiver ikke ligner to udgaver af samme værk.
