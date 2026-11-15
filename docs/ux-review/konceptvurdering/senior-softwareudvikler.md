# Konceptvurdering – senior softwareudvikler

2026-11-15. Grundlag: `03-koncepter.md`, `01-faktagrundlag.md` og koden. Timetal er skøn for én ikke-udvikler med AI-assistent. Intet er bygget eller kørt.

## 1. Valg: Koncept 1, derefter evt. "Næste skridt" fra koncept 3

Koncept 1 kan leveres i trin på én aften, som hver virker for sig og mest rammer små, testede funktioner:

- Sikkerhedsrettelserne (skøn 4–6 t): `N` begrænses ved at fjerne `normal: true` i datafilerne; N-markering og fortryd bliver ny tilstand ved siden af `svar` i `App.tsx`, så `Svar`-typen, `bygNotat` og dens tests er uberørte.
- Resten (skøn 6–8 t): "ikke vurderet" som én ren funktion i `lib/` med test; foldning med `<details>`, som `Beslutningsstoette.tsx` allerede bruger.

"Næste skridt" og `H` kan lægges ovenpå senere (skøn 8–12 t). Koncept 2 er reelt en ny app ved siden af den gamle (skøn 14–20 t) med to notatformer at vedligeholde i fem regioner.

## 2. Største risiko pr. koncept

- **Koncept 1:** Koblingen flag → henvisning. Som nyt felt på de 37 godkendte flag ændrer den godkendte punkter, som så bør falde til UDKAST. Læg den på henvisningspunktet, der allerede er UDKAST. `[KRÆVER FAGLIG KILDEKONTROL]`
- **Koncept 2:** Tal får to betydninger (flag kontra feltvalg), plus bogstaver og Skift+bogstav. `tolkTast` har i dag ét enkelt skema; her ligger den dyreste regression. Om det korte notat sparer arbejde: `[KRÆVER BRUGERTEST]`
- **Koncept 3:** Stikordene findes ikke i data. Koden udleder en overskrift af teksten før første kolon, men tre flag har ingen (knæ: bursit og læghævelse; ryg: neurologiske udfald), og mange er for lange til en stribe. Wireframens "Septisk bursit" og "Hævelse læg" er ny tekst på godkendte flag, i alle fem regioner. `[KRÆVER FAGLIG KILDEKONTROL]` Koncept 1's énlinjevisning har samme problem i mildere grad.

## 3. Hvad mangler

- **Definition af "ikke vurderet".** Flag har ELLER-grupper af OG-betingelser, og traumefelter er skjult, til traume er besvaret. Hvad vises, når ét af tre felter mangler? Skal afgøres og testes først.
- **Test af fremhævning pr. region** (fund → forventede flag). Findes ikke for knæ i dag; bør komme før ombygning af højre side.
- **Fingeraftryk af godkendt tekst.** Nævnt som fælles punkt, men uden design; forudsætning for at turde røre indholdsfilerne.
- **Kopieret kontra vist notat.** N-markeringen må ikke følge med i udklipsholderen; `Notat.tsx` viser i dag præcis den streng, der kopieres.
- **Stopkriterium:** hvornår måles der, og hvornår stoppes? `[KRÆVER BRUGERTEST]`
