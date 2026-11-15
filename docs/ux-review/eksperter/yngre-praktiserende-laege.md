# Ekspertevaluering: Yngre praktiserende læge (1–3 år i almen praksis)

Simuleret perspektiv, 2026-11-15. Grundlag: `cortex.html` kørt i Chromium (Playwright, 1920×1080 og 1366×768), koden og `01-faktagrundlag.md`. Jeg har ikke åbnet kliniske kilder og vurderer ikke, om indholdet er fagligt rigtigt.

## 1. Samlet dom

CORTEX frigiver overskud i registrering og notat (S/O på 14–21 tastetryk), men koster overskud netop dér, hvor jeg som yngre læge er usikker: fra "det ser alvorligt ud" til "hvem ringer jeg til, og hvad skriver jeg".
Beslutningsstøtten er et opslagsværk på 6–10 skærmhøjder, ikke en støtte; jeg slår stadig op uden for CORTEX i C, D og E.
Størst risiko: Jeg læser "ikke fremhævet" som "systemet har tjekket, og det er ikke relevant" – og det er ikke det, det betyder.

## 2. Top 5 problemer

**1. Fravær af fremhævning ligner en frikendelse – og afhænger af, hvordan jeg tolker et feltnavn. Kritisk. `[APP]` + `[KODE]`. Scenarie A, D, E.**
- A: Patienten fik hævelse "inden for få timer". Feltet hedder "Hævelse straks". Svarer jeg ærligt Nej, registrerer moderat hævelse og springer stabilitet over (smertende akut knæ), fremhæves **intet** flag `[APP]`. Svarer jeg Ja og "Instabilitet", fremhæves ligamentflaget. Flagteksten siger selv "hæmartron i løbet af få timer" (`knae.ts:513`), men betingelsen kræver `haevelse-straks = ja`, knæk, udtalt hævelse eller instabilitet (`knae.ts:515-532`). Patientens "føler sig ustabil" kan kun stå i fritekst og tæller ikke.
- E: Låsning = Ja med "Let nedsat" bevægelighed, eller før bevægelighed er udfyldt, fremhæver intet `[APP]` (`knae.ts:495-500`).
- D: Børneflaget kan aldrig fremhæves (`knae.ts:584-593`).
- Konsekvens: Som urutineret er det netop mig, der vil bruge den lyserøde boks som tjekliste. Tre forskellige grunde til "ikke fremhævet" kan ikke skelnes på skærmen (jf. faktagrundlag `[KODE]`).

**2. Vejen fra fremhævet flag til handling og notat mangler. Høj. `[APP]`. Scenarie C (tidskritisk), A, E.**
- C: Flaget siger "Indlægges akut … via CVI". Punktet, der kan skrives i planen, ligger 5.102 px nede (1920) hhv. 6.016 px (1366) `[APP]`. To museklik + lang rulning gav: `V: Bakteriel artrit mistænkes. P: Henvist akut til CVI mhp. septisk artrit.`
- Der står ikke, hvad CVI er, eller hvordan jeg får fat i dem; knæfilen har intet nummer til CVI, men har numre til reumatologisk hotline (jf. faktagrundlag `[KODE]`). Jeg ender med at slå op eller spørge en kollega, mens patienten venter.
- Det fremhævede flag er GODKENDT, men handlingen, jeg faktisk klikker i notatet, er UDKAST (`knae.ts:936-944`). Sagt lige ud: Jeg ville ikke opdage forskellen.

**3. Scenarie D: CORTEX leder ikke tanken mod hoften – notatet gør det modsatte. Høj. `[APP]` + `[KODE]`.**
- Alder kan ikke registreres uden traume (`knae.ts:111`), halten har intet felt. Jeg skrev "12 år. Halter" i fritekst og trykkede `N`: notatet blev seks normale knæfund inkl. "Stabilt ved klinisk ligamenttest", ingen fremhævning `[APP]`.
- Børneflaget ("Røntgen af hofter bør også rekvireres") er nr. 10, starter 1.404 px nede og er aldrig synligt uden rulning `[APP]`.
- Konsekvens: Et normalt knæ-notat og en rolig skærm bekræfter mig i "knæet fejler ikke noget" – præcis faldgruben. Om der bør være et aldersfelt uden traume og en hofteundersøgelse i modulet: `[KRÆVER FAGLIG KILDEKONTROL]` – spørgsmål til lægen, ikke et forslag til tekst.

**4. Kildekonflikten ved aflåst knæ efterlader mig uden svar. Høj. `[APP]`. Scenarie E.**
- Handlingen lyder "akut eller subakut, se konflikt". Udfoldet får jeg tre citater og linkene "Lægehåndbogen 2026 · Lægehåndbogen 2026 · Region Hovedstaden 2026" – ingen konklusion `[APP]`.
- Uden kendskab til koden ville jeg tro: (a) at "GODKENDT" betyder, at nogen har afgjort konflikten, (b) at to ens links er en fejl.
- Det regionale svar ("CVI, subakut < 1 uge") findes, men 5.597 px nede og som UDKAST `[APP]`. Jeg ville ringe til en kollega. Frakturflaget viser, at det kan gøres bedre: dér står beslutningen i handlingen.

**5. `N` dokumenterer undersøgelser, jeg som urutineret ikke nødvendigvis har lavet. Høj. `[APP]` + (jf. faktagrundlag `[KODE]`). Scenarie A, D.**
- A: Ét `N` skrev patella-ømhed, caput fibulae, fleksion 90°, fire skridt og strakt benløft som normale – de fund, der afgør røntgen og strækkeapparat-flaget `[APP]`. Jeg kan ikke bagefter se, hvad jeg selv valgte.
- Risikoen er større for mig end for en erfaren: Jeg kender ikke knæreglerne udenad og opdager derfor ikke, at jeg lige har "afkræftet" dem i journalen. Hvor ofte det sker i praksis: `[KRÆVER BRUGERTEST]`.

Mindre fund: I C svarer en samvittighedsfuld læge "Feber: Nej" ved 37,9; artritflaget fremhæves stadig via rødme/varme `[APP]` (godt), men notatet siger "Ingen feber" ved siden af min fritekst "Tp 37,9". Alloplastik kan kun stå i fritekst, selv om flaget nævner det som risikofaktor.

## 3. Måltal pr. scenarie

Tastetryk, museklik, rulleafstand og fremhævning er målt i appen `[APP]` (egen gennemspilning, 1920×1080; fritekst = 1 tryk). Opslag, blik og tid er **skøn** `[UDLEDT]` `[KRÆVER BRUGERTEST]`.

| Scenarie | Tastetryk S/O (målt) | Museklik V+P (målt) | Rulning til relevant P-punkt (målt) | Opslag uden for CORTEX (skøn) | Blik væk fra patienten (skøn) | Tid i CORTEX (skøn) |
|---|---|---|---|---|---|---|
| A | 21 (variant med "straks = nej": 19) | 2 | 5.276 px; 2.480 px efter `+ V` | 1 (hvordan henviser jeg akut til CVI?) | 4–6 | 1½–2½ min |
| B | 14 | 2 | 3.563 px; 2.338 px efter `+ V` | 0 | 2–3 | ca. 1 min |
| C | 15 | 2 | 5.102 px (1366: 6.016 px) | 1–2 (kontakt til CVI; evt. kollega) | 4–6 | 2–3 min – for meget, når det haster |
| D | 11 | 0 (intet oplagt at klikke) | Børneflag 1.404 px | 1–2 (Lægehåndbogen: barn, halten) | 3–5 | 1 min + opslag |
| E | 18 | 1 + 1 (fold konflikt ud) | 5.597 px | 1 (forløbsbeskrivelse eller kollega) | 4–6 | 2–3 min |

B er det eneste scenarie, hvor CORTEX klart er hurtigere end mit alternativ: ingen alarmer, og `+ V` på gonartrose bragte artrosebehandlingen tættere på.

## 4. Hvad der virker og skal bevares

- Notatet for S/O: hurtigt, forudsigeligt, konkrete sætninger. Det er her, jeg får overskud `[APP]`.
- Alle røde flag vises altid, og der står aldrig "ingen røde flag". Det er rigtigt tænkt – problemet er kun, hvordan fraværet af fremhævning læses.
- B forbliver rolig: 0 fremhævninger `[APP]`.
- Frakturflagets form: begge regler nævnt, og handlingen siger, hvad jeg gør. Det er skabelonen for de andre konflikter.
- Henvisningspunkter med "Gælder: Region Hovedstaden" og hotline-numre i reumatologipunktet – præcis den slags, jeg ellers slår op.
- At `+ V` filtrerer behandlingen.

## 5. Hvad der bør fjernes

- **Datoen på hvert GODKENDT-mærke** (10 gange på skærmen): Jeg kan ikke bruge den i konsultationen. Vis kun afvigelsen (UDKAST); behold datoen på gennemgangssiden.
- **De 14 differentialdiagnoser og 17 behandlingspunkter foldet ud som standard.** De skubber henvisningerne 5.000 px ned. Fold dem sammen, til jeg beder om dem.
- **"Alder 12–50 år." i notatet** – et beslutningsregel-interval hører ikke hjemme i journalen.
- **Handlingsteksten "se konflikt"** – en handling, der henviser til en uenighed, er ikke en handling.
- Overvej at tage de fem traumefund (røntgenkriterierne og strakt benløft) ud af `N`, ligesom rektaleksploration i ryg allerede er det.

## 6. Én radikal idé

**Vend højre panel om: "Næste skridt" øverst, opslagsværket nedenunder.** Når et flag fremhæves, vises lige under notatet én linje pr. flag: flagets handling + det tilhørende eksisterende henvisningspunkt med `+ P` og dets status. Alt andet er foldet sammen. Det kræver kun en kobling i data fra flag til henvisnings-id (fx bakteriel artrit → "Akut indlæggelse") – ingen ny klinisk tekst, men koblingen er klinisk og skal godkendes af lægen. Hvor der ikke er registreret nok til at vurdere et flag, skal linjen sige det ("ikke vurderet: mangler …") i stedet for at tie. Begrundelse for almen praksis: I en 15-minutters konsultation med patienten ved skærmen er det ét blik og ét klik, jeg har råd til – ikke seks skærmhøjders rulning.

Spørgsmål til lægen `[KRÆVER FAGLIG KILDEKONTROL]`: Findes der en kildebelagt kontaktvej til CVI, som kan stå ved de akutte punkter?

## 7. Usikkerhed og behov for brugertest

- Alle tids- og blikestimater er skøn; sammenligning med diktering/fraser i journalsystemet er ikke målt `[KRÆVER BRUGERTEST]`.
- Om yngre læger faktisk læser "ikke fremhævet" som "afkræftet", er min antagelse `[UDLEDT]` `[KRÆVER BRUGERTEST]`. Det samme gælder, om "Hævelse straks" tolkes som minutter eller timer.
- Om brugeren (én læge, der selv har skrevet indholdet) har samme behov som mig, er tvivlsomt: Vedkommende ved, hvad CVI er, og kender konflikten. Flere af mine fund vejer tungere, hvis andre nogensinde skal bruge CORTEX.
- Jeg har ikke afprøvet de andre regioner eller klinikkens faktiske skærmstørrelse.
- Hvordan patienten reagerer på "osteosarkom" og "leukæmi" på skærmen i scenarie D `[KRÆVER BRUGERTEST]`.
