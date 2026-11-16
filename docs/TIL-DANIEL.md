# Til Daniel

Samlede spørgsmål, afgørelser og status fra Claudes selvstændige arbejde (startet 2026-11-16). Nyeste øverst i hvert afsnit.

## 1. Status mod køreplanen (`docs/ux-review/rapport.md`) og dine to seneste opgaver

| Trin | Indhold | Status |
|---|---|---|
| 0 | Dine beslutninger (N-fund, klinik-pc, Vercel offentlig?) | N-fund: **færdig** (#41). Klinik-pc og Vercel: **din opgave** (se §2) |
| 1 | N begrænset · holdt tast gentages ikke · klik på åben region rydder ikke · "Alder x–y år." ud af notatet | **Færdig.** N (#41), holdt tast nu også for Esc, tal og Ctrl+Z (denne runde), regionsklik (#41), alder ud af notatet i knæ og skulder (#44 D; de andre regioner har intet aldersfelt) |
| 2 | Fortryd · synlig N | **Færdig.** Ctrl+Z med flere trin, også efter Esc Esc og regionsskift (#44). N-satte fund vises stiplet med "N", til du rører feltet (denne runde) |
| 3 | Tabeltest fund → flag (A–E) · fingeraftrykstest for godkendte punkter | **Færdig** (denne runde): `lib/scenarier.test.ts` (18 scenarier, alle regioner) og `lib/fingeraftryk.test.ts` + `indhold/godkendt-fingeraftryk.ts` |
| – | **Stop og test: frase mod Cortex** | **Din opgave** (i gang) |
| 4 | Flag som én linje, rød kun til match, konflikt grå | **Næsten færdig** (#42). Ikke gjort: fast notathøjde (du bad mig ikke røre notatet i #42). GODKENDT-mærke vises ved udfoldning frem for kun på gennemgangssiden (din spec i #42) |
| 5 | Fire tilstande | **Færdig**: matcher / ikke opfyldt af det registrerede / ikke vurderet / vurderes klinisk (sidste tilføjet denne runde) |
| 6 | Fra flag til plan | **Ikke påbegyndt** – venter på dit testresultat og kræver klinisk kobling |
| 7 | Dit indhold | **Delvist:** knæets fraktur-flag omformuleret og godkendt af dig (#44). Aflåst knæ (akut/subakut) mangler din afgørelse (§2). 163 UDKAST-punkter: se `review/KILDEKONTROL.md` |
| 8 | Henvisningstekst | Ikke påbegyndt (efter brug) |

Kompakt højre side (#42): **færdig**, plus UDKAST-antal i overskrifterne og flagstribe i smalt vindue (#44).
