# Til Daniel

Status efter dine afgørelser 2026-11-16. Claude bygger ikke mere, før dit testresultat fra `docs/ux-review/test-frase-mod-cortex.md` foreligger. Halten hos børn og alloplastik står fortsat kun på listen (`review/MANGLER.md`). Vercel-henvisningerne er ikke rørt.

## Status

**Merget i dag (efter dine afgørelser):**
- [#49](https://github.com/danielbalsby/Cortex/pull/49): de 4 afvigelser rettet. NICE-punktet er stadig mærket ikke-dansk.
- [#50](https://github.com/danielbalsby/Cortex/pull/50): aflåst knæ subakut efter Region H.
- [#51](https://github.com/danielbalsby/Cortex/pull/51): albue – feber og varme; septisk artrit; septisk bursit også ved varme over bursa (din afgørelse 4).
- [#52](https://github.com/danielbalsby/Cortex/pull/52): knæ – alder 12–17 år; konflikten i børneflaget er løst.
- [#54](https://github.com/danielbalsby/Cortex/pull/54): skulder septisk, ankel artrit og knæ børn sat til UDKAST.
- [#55](https://github.com/danielbalsby/Cortex/pull/55): `review/KILDEKONTROL.md` præciseret (se nedenfor).
- Denne fil (PR "TIL-DANIEL: svar og afgørelser").

`cortex.html` og snapshots er genbygget mellem hver merge. `npm run check` er grøn på `main` (182 tests). **Alle flag forbliver UDKAST; merge er ikke godkendelse.**

**Kladde, der venter på dig:**
- [#56](https://github.com/danielbalsby/Cortex/pull/56): ankel – feber i flagteksten om akut artrit (Region H, Akut monoartritis 2025) og som ELLER-betingelse. Flaget er UDKAST.

## UDKAST-flag, du mangler at godkende (6) – læs dem i ét stræk

31 af 37 røde flag er GODKENDT. Disse 6 er UDKAST. Godkend enkeltvis, fx "godkend albue septisk-flag".

| # | Flag | Hvorfor UDKAST | Kilde at læse (titel, årstal, afsnit) |
|---|---|---|---|
| 1 | **Knæ – Aflåst knæ** (`flag-aflaast-knae`) | Ny handling (#50) | Region Hovedstaden, *Idrætsrelaterede traumatiske knæskader hos voksne* (opd. 10.03.2026), afsnit "Henvisning", punkt 2 "Subakut henvisning". Desuden LH *Meniskskade i knæet* (opd. 14.08.2026), afsnit "Håndtering i almen praksis", og LH *Knæsmerter* (opd. 12.08.2026), afsnit "Henvisninger" – de to angiver henholdsvis akut og subakut (navngivet konflikt) |
| 2 | **Knæ – Barn med knæsmerter** (`flag-boern`) | Betingelse tilføjet (C3, #52) | LH *Knæsmerter* (opd. 12.08.2026), afsnit "Diagnostiske faldgruber" og "Røntgenundersøgelser" ("Hos børn bør man også rekvirere røntgenundersøgelse af hofter …"). Kilden angiver ingen aldersgrænse; "under 18" (under 12 + 12–17) er dit valg |
| 3 | **Skulder – Septisk artrit** (`flag-septisk`) | Betingelse tilføjet (C1) | Region Hovedstaden, *Akut monoartritis* (opd. 10.04.2025), afsnit "Forløb i almen praksis": "Mistanke bestyrkes klinisk ved varmt, rødt, betydeligt hævet led eller ved feber og medtaget almen tilstand." LH *Skuldersmerter* (opd. 09.08.2019) nævner kun "Infektion" under "Andre tilstande" |
| 4 | **Ankel – Akut artrit, herunder infektion** (`flag-artrit`) | Betingelse tilføjet (C2); feber foreslået i kladde #56 | LH *Akutte ankelsmerter* (opd. 02.11.2026), afsnit "Diagnose" (differentialdiagnoser): "Rødme, varme og udtalt bevægeømhed uden en passende skademekanisme bør føre til overvejelse af akut artrit, herunder infektion." Region Hovedstaden, *Akut monoartritis* (opd. 10.04.2025), "Forløb i almen praksis" (se nr. 3) |
| 5 | **Albue – Septisk artrit eller hæmartrose efter traume** (`flag-septisk`) | Felter og betingelse ændret (#51) | LH *Albuesmerter* (opd. 08.02.2019), afsnit "Tiltag og råd → Henvisninger": "Hæmartrose efter traume og septisk artrit kræver hurtig henvisning til sygehus". Region Hovedstaden, *Akut monoartritis* (opd. 10.04.2025), "Forløb i almen praksis" (se nr. 3) |
| 6 | **Albue – Septisk bursitis olecrani** (`flag-septisk-bursit`) | Betingelse udvidet med varme (#51, din afgørelse 4) | LH *Bursitis olecrani* (opd. 21.08.2023), afsnit "Kliniske fund" (septisk: "Rødme eller varme over bursa, eventuelt forhøjet CRP, eventuelt feber") og "Henvisning" ("Hos patienter med albueprotese eller reumatoid artritis bør henvises …") |

## Svar på dine spørgsmål

**Albue – betingelserne ordret** (`indhold/albue.ts`, `main`). Grupperne er ELLER, betingelserne i en gruppe er OG.
- Septisk artrit (`flag-septisk`):
  ```
  fremhaevHvis: [
    [{ felt: "roedme", er: "ja" }, { felt: "haevelse", er: "led" }],
    [{ felt: "varme", er: "ja" }, { felt: "haevelse", er: "led" }],
    [{ felt: "feber", er: "ja" }]
  ]
  ```
  Feber alene udløser; feber er ikke et krav. Rødme eller varme udløser kun sammen med "hævelse af leddet".
- Septisk bursit (`flag-septisk-bursit`):
  ```
  fremhaevHvis: [
    [{ felt: "disposition", er: "protese" }, { felt: "haevelse", er: "bursa" }],
    [{ felt: "disposition", er: "ra" }, { felt: "haevelse", er: "bursa" }],
    [{ felt: "roedme", er: "ja" }, { felt: "haevelse", er: "bursa" }],
    [{ felt: "varme", er: "ja" }, { felt: "haevelse", er: "bursa" }]
  ]
  ```
  Feber indgår ikke i bursit-flagets betingelse.

**Ankel – betingelsen i `main`** (`flag-artrit`): `[[{ felt: "roedme", er: "ja" }], [{ felt: "varme", er: "ja" }]]`. Feber indgår ikke endnu; kladde #56 tilføjer `[{ felt: "feber", er: "ja" }]` som tredje ELLER-gruppe.

**#50 – aflåst knæ, hastegrad før og efter:**
- *Flagets handling før:* "Ortopædkirurgisk vurdering – akut eller subakut, se konflikt." (ingen hastegrad valgt).
- *Efter:* "Region Hovedstaden: subakut henvisning til CVI snarest muligt (< 1 uge) ved aflåst knæ med strækkemangel og mistanke om indeklemt ledpatologi, fx menisk. Lægehåndbogen angiver akut vurdering – se konflikt."
- Henvisningspunktet `hen-aflaast` var allerede "subakut" og er uændret.
- *Region Hovedstadens sætning, ordret* (Idrætsrelaterede traumatiske knæskader hos voksne, opd. 10.03.2026): "2. Subakut henvisning til CVI snarest muligt < 1 uge Aflåst knæ med strækkemangel – og mistanke om indeklemt ledpatologi fx menisk."

**Knæ – hvilke flag påvirker aldersgruppen 12–17 ud over børneflaget?** Ingen. Kun to flag bruger feltet Alder:
- `flag-boern`: under 12 ELLER 12–17.
- `flag-fraktur` (GODKENDT, uændret): traume = ja OG alder under 12 / 51–55 / over 55.

En 12–17-årig fremhæver ikke fraktur-flaget via alderen (tabeltest: "15-årig med vridtraume → børneflag, ikke fraktur").

**#49 – NICE-sætningen.** Cortex `ryg/beh-ikke-anbefalet`: "Anbefales ikke: traktion, TENS, ultralydsbehandling, korset/rygstøtte." Den bygger på tre sætninger i LH *Lændesmerter, lave rygsmerter* (opd. 15.01.2024), afsnit "Behandling", alle med reference 6 = NICE NG59 (2016):
- "Traktionsbehandling bør ikke tilbydes"
- "Anvend ikke transkutan/perkutan nervestimulering eller ultralyd"
- "NICE guideline fraråder brug af korset til lændesmerter"

Danske kilder at læse (ingen af dem kunne jeg åbne):
- Sundhedsstyrelsen, *Behandling af nyopståede lænderygsmerter. NKR* (2016): https://www.sst.dk/da/udgivelser/2016/nkr-laenderygsmerter
- DSAM, *Lændesmerter. Klinisk vejledning* (2006): https://www.dsam.dk/vejledninger/laendesmerter

## Kildekontrollen (`review/KILDEKONTROL.md`, #55)

- **Hvad hvert af de 168 punkter er læst mod:** lokalt dump af sundhed.dk-siderne, hentet 2026-11-15 20:51 UTC (`lh-pmr` 2026-11-16 06:25). Alle 45 sider er genhentet 2026-11-16 13:17 UTC og er identiske. Ingen citeret kilde er "ikke åbnet".
- **Hvor grundigt:** runde 1 (93 punkter) læste kun sætningerne under tærsklen; runde 2 (70 punkter) læste alle sætninger. Det står pr. punkt.
- **Hviler på spærrede kilder** (sst.dk, DSAM, NICE): 2 sikre og op til 10.
- **De 5 fra #47:** mærket "skrevet og kontrolleret af samme model".
- **Stikprøve:** 10 punkter side om side med det ordrette kildeafsnit.
- **Rettelse:** "65" var det tal, jeg skrev i går. Gruppen, der først blev læst i runde 2, var reelt 54 punkter, så stikprøven er trukket blandt de 54. Mine tidligere tal ("98" og "65 plus 5") var forkerte og er rettet i filen.

## Afgørelser

Truffet af dig 2026-11-16 og gennemført:
1. Kladder: #49–#52 er merget.
2. De tre flag forbliver UDKAST.
3. Ankel og feber: A, kladde #56.
4. Albue bursit: A, i #51.
5. N i ankel: A, behold (uændret).
6. Ryg aldersfelt: B, lad være (uændret).
7. Vercel: ikke rørt.
8. Testresultat: afventer.

Åbne for dig:
- **Kladde #56:** godkend og merge? *Anbefaling: ja.*
- **De 6 UDKAST-flag** i tabellen ovenfor: godkend enkeltvis, når du har læst kilden.
- **Dit testresultat** afgør, om notatdelen bygges videre.
- **Vercel:** skriv, når projektet er afbrudt.

## Det kunne jeg ikke verificere

- **Danske kilder til NICE-punktet og Sundhedsstyrelsens pakkeforløbstekst:** sst.dk viser en bot-spærring, DSAM og NICE er blokeret af netværket.
- **Ctrl+Enter-kopiering og den offentlige Vercel-side live.**

## Det skal du selv teste (1 minut, `cortex.html` fra `main`)

1. **Albue:** tryk Feber = Ja. "Septisk artrit …" skal stå som MATCHER. Vælg Hævelse "Over olecranon" og Varme = Ja: "Septisk bursitis olecrani" skal stå som MATCHER.
2. **Knæ:** Traume = Nej, Alder 12–17. Børneflaget skal stå som MATCHER, fraktur-flaget ikke.
3. **Lænderyg:** åbn Henvisning. Der skal stå "Akutmodtagelse" (akut) og "Pakkeforløb" (subakut) som to punkter.
4. **Ctrl+Enter** på klinik-pc'en.

## Regel fremover

Claude sætter aldrig noget til GODKENDT på en generel tilladelse, kun når du nævner det konkrete punkt (`CLAUDE.md`).
