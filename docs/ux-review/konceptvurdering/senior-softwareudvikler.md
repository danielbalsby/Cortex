# Konceptvurdering – senior softwareudvikler

Dato: 2026-11-15. Grundlag: `03-koncepter.md`, `01-faktagrundlag.md` og koden. Alle timetal er skøn for én ikke-udvikler med AI-assistent. Intet er bygget eller kørt.

## 1. Valg: Koncept 1 – og kun derefter udvalgte dele af koncept 3

Byg de fælles sikkerhedsrettelser først (skøn 4–6 t, 2–3 aftener), så resten af koncept 1 (skøn 6–8 t). Hvert trin virker for sig og rammer mest små, testede funktioner:

- `N` begrænses: fjern `normal: true` i datafilerne. Ingen kodeændring; `lib/tastatur.test.ts` skal rettes.
- N-markering og fortryd: ny tilstand ved siden af `svar` i `App.tsx` (hvilke felter `N` satte, ét snapshot). `Svar`-typen røres ikke, så `bygNotat` og dens tests er uberørte.
- "Ikke vurderet" / "vurderes klinisk": én ren funktion i `lib/` ud fra `fremhaevHvis`, med test.
- Foldede sektioner: `<details>` findes allerede i `Beslutningsstoette.tsx`.

Koncept 3's "Næste skridt" og `H` kan lægges ovenpå bagefter (skøn 8–12 t yderligere). Koncept 2 er en ny app ved siden af den gamle (skøn 14–20 t) med to notatformer at vedligeholde i fem regioner.

## 2. Største risiko pr. koncept

- **Koncept 1:** Koblingen flag → henvisning. Lægges den som nyt felt på de 37 godkendte flag, ændres godkendte punkter, og de bør falde til UDKAST. Læg den på henvisningspunktet (allerede UDKAST) i stedet. `[KRÆVER FAGLIG KILDEKONTROL]`
- **Koncept 2:** Tastaturet får to betydninger af tal (flag kontra feltvalg) plus bogstaver og Skift+bogstav. `tolkTast` har i dag ét enkelt skema med 62 linjers test; det bliver den dyreste regression. Og notatværdien kan kun afgøres i brug. `[KRÆVER BRUGERTEST]`
- **Koncept 3:** Stikordene findes ikke i data. Koden udleder en overskrift af teksten før første kolon, men flere flag har ingen (knæ: septisk bursit, læghævelse, neurovaskulær status; ryg: mindst fire). Wireframens "Septisk bursit" og "Hævelse læg" er altså ny tekst på godkendte flag i alle fem regioner. `[KRÆVER FAGLIG KILDEKONTROL]` Dertil et fast layout, der skal holde til 6–10 flag og lange handlingstekster ved 1366×768.

## 3. Hvad mangler

- **Definition af "ikke vurderet".** Flag har ELLER-grupper af OG-betingelser, og traumefelter er skjult, til traume er besvaret. Er et flag "ikke vurderet", når ét af tre felter mangler? Det skal afgøres og testes, før det vises – ellers lover mærket mere end det holder.
- **Test af fremhævning pr. region** (sæt fund → forventede flag). Findes ikke i dag for knæ; bør komme før enhver ombygning af højre side.
- **Fingeraftryk af godkendt tekst** (genereret fil + test). Nævnt som fælles punkt, men uden design; den er forudsætningen for at turde røre indholdsfilerne.
- **Kopieret tekst kontra vist tekst.** N-markering må ikke følge med i udklipsholderen; `Notat.tsx` viser i dag præcis den streng, der kopieres.
- **Rækkefølge og stopkriterium:** ingen af koncepterne siger, hvornår man måler og stopper. `[KRÆVER BRUGERTEST]`
