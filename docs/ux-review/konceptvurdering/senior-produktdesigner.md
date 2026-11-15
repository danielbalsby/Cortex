# Konceptvurdering – senior produktdesigner (UX og visuel)

Dato: 2026-11-15. Grundlag: `03-koncepter.md`, `01-faktagrundlag.md`, skærmbillede 04 (1366×768) og tekstlængder i `indhold/knae.ts`.

## 1. Valg: Koncept 3, bygget i to trin via koncept 1

Koncept 3 er det eneste, hvor alle ti flag har fast plads og kan aflæses med ét blik ved 1366×768, og hvor vejen flag → handling → P klares uden mus. Byg først koncept 1's sikkerhedsrettelser (N, markering, fortryd), derefter striben og "Næste skridt". Opslagslaget `O` kan vente; indtil da kan de foldede sektioner fra koncept 1 ligge under "Næste skridt". Skøn: 4–6 aftener i alt.

## 2. Største risiko pr. koncept

- **Koncept 1:** Højre panel har stadig variabel højde. Ét udfoldet flag fylder ca. 7 linjer (flagteksterne er 250–400 tegn, se skærmbillede 04); matcher to eller tre, skubbes de sidste flaglinjer og henvisningerne ud af billedet. Rulningen er dermed kun løst, når intet matcher.
- **Koncept 2:** Tastaturmodellen. Tal åbner flag (flag 10 kræver to cifre), bogstaver åbner veje, Skift+bogstav sætter P, og Tab skifter til felter, hvor tal igen betyder noget andet. Tre tilstande uden synlig modusangivelse giver fejltryk. Dertil hviler hele højre side på 12 henvisningspunkter, der alle er UDKAST.
- **Koncept 3:** Tegnet □ dækker både "ikke opfyldt" og "vurderes klinisk". De fire flag, der aldrig kan matche (bl.a. barn og læghævelse), vil altid ligne afkrydsede felter, der er afklaret. Det er i praksis "ingen røde flag" ad bagvejen. De skal have eget tegn, og ■/□/◌ skal desuden adskilles med farve og vægt, ikke kun form. `[KRÆVER BRUGERTEST]`

## 3. Hvad der mangler

- **Venstre kolonne ved traume.** Uden traume fylder felterne allerede ca. 715 af 768 px (skærmbillede 04). Ved traume = ja kommer 9 felter til, ca. 340 px (skøn). Ingen af wireframes viser det; "ingen rulning" gælder kun højre side.
- **Overløb i "Næste skridt".** Der er plads til ca. to match. Fraktur-flagets handling er omkring 150 tegn, og tre samtidige match ved traume er realistisk. Reglen for, hvad der sker da, mangler.
- **Talkonflikt.** `1` vælger feltværdi i venstre side og sætter P efter `H`. Fokus skal vises tydeligt (ramme om panelet og tallene kun synlige dér), og `H` bør kunne trykkes uden forudgående klik på et felt.
- **Bekræftelse af N-satte fund.** "Markeret, til lægen rører feltet" – men at trykke samme tal fravælger i dag. Der mangler en tast for "set og bekræftet", og det er uafklaret, om markeringen følger med ved kopiering.
- **Tom tilstand.** Hvad "Næste skridt" viser uden match, så den tomme flade ikke læses som frikendelse.
- **Patientens blik.** "Indlægges akut" står stort, før lægen har sagt det. `[KRÆVER BRUGERTEST]`
