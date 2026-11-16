# Til Daniel

Status efter dine afgørelser 2026-11-16. Claude bygger ikke mere, før dit testresultat fra `docs/ux-review/test-frase-mod-cortex.md` foreligger. Halten hos børn og alloplastik står fortsat kun på listen (`review/MANGLER.md`).

## Status

**Merget:**
- [#47](https://github.com/danielbalsby/Cortex/pull/47): 5 nye differentialdiagnoser som UDKAST.
- [#53](https://github.com/danielbalsby/Cortex/pull/53) (denne fil): alle 168 udkastpunkter læst mod kilden (`review/KILDEKONTROL.md`), listen over godkendelser (`review/GODKENDELSER.md`) og reglen om GODKENDT i `CLAUDE.md`.

**Kladder, der venter på din godkendelse** (klinisk indhold; Claude merger dem ikke):
| PR | Indhold | Status for flag |
|---|---|---|
| [#49](https://github.com/danielbalsby/Cortex/pull/49) | De 4 afvigelser rettet (knæ kilde, skulder kapsulit, ryg NICE mærket, ryg infektion/malignitet delt) | Kun UDKAST-punkter |
| [#50](https://github.com/danielbalsby/Cortex/pull/50) | Aflåst knæ: subakut efter Region H | Flaget bliver UDKAST |
| [#51](https://github.com/danielbalsby/Cortex/pull/51) | Albue: felterne feber og varme + betingelse på septisk artrit | Flaget bliver UDKAST |
| [#52](https://github.com/danielbalsby/Cortex/pull/52) | Knæ: alder 12–17 år; børneflaget fremhæves under 18 år | Flaget bliver UDKAST |

**Merge-rækkefølge:** de fire kladder er lavet hver for sig fra `main`. Når én er merget, får de næste konflikt i `cortex.html` og snapshots, fordi de er byggede filer. Skriv "merge kladderne", så genbygger og merger jeg dem i rækkefølge.

## De tre flag, der blev ændret på generel tilladelse – nu UDKAST (2026-11-16)

Alle tre fik deres betingelse i commit `02ff534` (PR #44, "C: feber/rødme/varme …", 2026-11-16) på din generelle tilladelse. Flagteksterne er ikke ændret. I denne PR er de sat til **UDKAST** og fjernet fra `indhold/godkendt-fingeraftryk.ts`.

**Hvad UDKAST ændrer i appen:** intet for, om flaget vises eller fremhæves. Røde flag vises altid, og fremhævningen afhænger kun af betingelsen, ikke af status (snapshots: kun statusmærket skifter). Synligt er kun "· 1 udkast" i overskriften "Røde flag" og mærket UDKAST, når flaget foldes ud. Derfor har jeg selv merget.

| Flag | Tekst | Betingelse før `02ff534` | Betingelse nu | Kilde du skal læse |
|---|---|---|---|---|
| Skulder `flag-septisk` | Uændret: "Septisk artrit: varmt, rødt, betydeligt hævet led, feber eller medtaget almentilstand. Disponerende: …" | Ingen – flaget kunne ikke fremhæves | feber = ja ELLER rødme = ja ELLER varme = ja (nye felter i skulder) | Region Hovedstaden, *Akut monoartritis* (forløbsbeskrivelse, opdateret 10.04.2025), afsnit "Forløb i almen praksis": "Mistanke bestyrkes klinisk ved varmt, rødt, betydeligt hævet led eller ved feber og medtaget almen tilstand." |
| Ankel `flag-artrit` | Uændret: "Akut artrit, herunder infektion: rødme, varme og udtalt bevægeømhed uden en passende skademekanisme." | Ingen | rødme = ja ELLER varme = ja (nye felter i ankel). Feber fremhæver ikke | Lægehåndbogen, *Akutte ankelsmerter* (opdateret 02.11.2026), afsnit "Diagnose" (differentialdiagnoser): "Rødme, varme og udtalt bevægeømhed uden en passende skademekanisme bør føre til overvejelse af akut artrit, herunder infektion." |
| Knæ `flag-boern` | Uændret: "Barn med knæsmerter – diagnostiske faldgruber: hoftelidelse …, osteosarkom og Ewings sarkom, artralgi pga. leukæmi." | Ingen – feltet Alder vistes kun ved traume | alder = under 12 (feltet Alder vises nu altid) | Lægehåndbogen, *Knæsmerter* (opdateret 12.08.2026), afsnit "Diagnostiske faldgruber" og "Røntgenundersøgelser" ("Hos børn bør man også rekvirere røntgenundersøgelse af hofter …"). **Bemærk:** kilden angiver ingen aldersgrænse for "barn". "Under 12" er Claudes genbrug af Pittsburgh-gruppen; kladde #52 udvider til under 18 |

Godkender du et af dem, så skriv fx "godkend skulder septisk-flag".

**Konsekvens for kladde #52:** den ændrer også `knae/flag-boern` og får derfor konflikt med denne ændring. Det løser jeg, når du nævner #52.

## Afgørelser, der stadig er dine

1. **Kladderne #49–#52:** godkend og merge? *Anbefaling: ja til alle fire.* Godkend derefter de tre flag enkeltvis, når du har læst kilden ("godkend knæ aflåst-flag", "godkend albue septisk-flag", "godkend knæ børneflag").
2. **De 3 flag, der blev ændret på generel tilladelse:** nu UDKAST (se afsnittet ovenfor). Godkend dem enkeltvis, når du har læst kilden.
3. **Ankel, feber og akut artrit:** LH Akutte ankelsmerter (2026), som flaget citerer, nævner ikke feber: "Rødme, varme og udtalt bevægeømhed uden en passende skademekanisme bør føre til overvejelse af akut artrit, herunder infektion." Region H's Akut monoartritis (2025), som flaget også citerer, siger: "Mistanke bestyrkes klinisk ved varmt, rødt, betydeligt hævet led eller ved feber og medtaget almen tilstand." A: tilføj feber til flagteksten (med Region H som kilde) og til betingelsen, som i knæ og skulder · B: lad være. *Anbefaling: A.* Det ændrer et godkendt flag og kræver din godkendelse.
4. **Albue, septisk bursit** (opstået ved #51): når "Rødme/varme" deles, fremhæves bursit-flaget kun ved rødme over bursa, ikke ved varme alene. A: tilføj varme + hævelse over bursa til bursit-flagets betingelse · B: lad være. *Anbefaling: A* (godkendt flag – kræver din godkendelse).
5. **N i ankel** (sætter "Ingen hævelse" og "Laterale ledbånd uømme"): A: behold, nu synligt markeret · B: fjern. *Anbefaling: A.*
6. **Ryg, "øvrige alarmforhold"** (alder under 20 eller over 55) kan ikke fremhæves: A: tilføj aldersfelt · B: lad være. *Anbefaling: B.*
7. **Vercel:** du afbryder projektet. Skriv, når det er gjort, så fjerner jeg henvisningerne til den offentlige adresse i `docs/plan.md`, `docs/TIL-DANIEL.md` og `README`.
8. **Dit testresultat** (frase mod Cortex): afgør, om notatdelen bygges videre.

Fulgt efter min egen anbefaling (rører ikke klinisk indhold): fast notathøjde er *ikke* lavet. Intet er slettet, og jeg har ikke fundet noget, der bør slettes.

## Det kunne jeg ikke verificere

- **Dansk kilde til frarådningen af traktion, TENS, ultralyd og korset:** Sundhedsstyrelsen (sst.dk viser en bot-spærring), DSAM og NICE (blokeret af netværket) kunne ikke åbnes. Punktet er mærket som ikke-dansk i #49.
- **Sundhedsstyrelsens ordlyd om pakkeforløb ved malignitet:** samme årsag. #49 bruger Region H og Lægehåndbogen.
- **Ctrl+Enter-kopiering og den offentlige Vercel-side live:** som før.

## Regel fremover

Claude sætter aldrig noget til GODKENDT på en generel tilladelse, kun når du nævner det konkrete punkt. Reglen står nu i `CLAUDE.md`.
