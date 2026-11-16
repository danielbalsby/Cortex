# Til Daniel

Status efter dine afgørelser 2026-11-16 (anden runde). Claude bygger ikke mere, før dit testresultat fra `docs/ux-review/test-frase-mod-cortex.md` foreligger. Halten hos børn og alloplastik står fortsat kun på listen (`review/MANGLER.md`). Vercel-henvisningerne er ikke rørt.

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
