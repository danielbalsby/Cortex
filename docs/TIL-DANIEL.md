# Til Daniel

Samlede spørgsmål, afgørelser og status fra Claudes selvstændige arbejde 2026-11-16. Svar gerne kort, fx "1 ja, 2 B, 3 ja …".

## Kort fortalt

- **Merget** (rører ikke klinisk indhold): [#45](https://github.com/danielbalsby/Cortex/pull/45) trin 1–3 færdige · [#46](https://github.com/danielbalsby/Cortex/pull/46) kildekontrol af de 163 udkastpunkter · [#48](https://github.com/danielbalsby/Cortex/pull/48) drift (robots.txt, plan.md, denne fil).
- **Kladde til dig** (klinisk indhold): [#47](https://github.com/danielbalsby/Cortex/pull/47) fem manglende differentialdiagnoser som UDKAST + listen `review/MANGLER.md`.
- **Intet** er sat til GODKENDT, og ingen godkendt tekst er ændret. Fingeraftrykstesten låser nu de 37 godkendte flag.
- **Notatdelen** er ikke bygget videre, mens dit testresultat mangler.

## 1. Status mod køreplanen (`docs/ux-review/rapport.md`) og dine to seneste opgaver

| Trin | Indhold | Status |
|---|---|---|
| 0 | Dine beslutninger (N-fund, klinik-pc, Vercel offentlig?) | N-fund: **færdig** (#41). Klinik-pc og Vercel: **din opgave** (afgørelse 8 nedenfor) |
| 1 | N begrænset · holdt tast gentages ikke · klik på åben region rydder ikke · "Alder x–y år." ud af notatet | **Færdig.** N (#41); holdt tast for N, Esc, tal og Ctrl+Z (#45); regionsklik (#41); alder ud af notatet i knæ og skulder (#44) – de andre regioner har intet aldersfelt |
| 2 | Fortryd · synlig N | **Færdig.** Ctrl+Z med flere trin, også efter Esc Esc og regionsskift (#44). N-satte fund vises stiplet med "N", til du rører feltet (#45) |
| 3 | Tabeltest fund → flag (A–E) · fingeraftrykstest | **Færdig** (#45): `lib/scenarier.test.ts` (18 scenarier i alle fem regioner) og `lib/fingeraftryk.test.ts` |
| – | **Stop og test: frase mod Cortex** | **Din opgave** (i gang) |
| 4 | Flag som én linje, rød kun til match, konflikt grå | **Næsten færdig** (#42). Ikke gjort: fast notathøjde (afgørelse 9) |
| 5 | Fire tilstande | **Færdig**: matcher / ikke opfyldt af det registrerede / ikke vurderet / vurderes klinisk (#45) |
| 6 | Fra flag til plan | **Ikke påbegyndt** – venter på dit testresultat og kræver klinisk kobling |
| 7 | Dit indhold | **Delvist:** fraktur-flaget godkendt (#44). Aflåst knæ mangler (afgørelse 4). De 163 udkastpunkter: `review/KILDEKONTROL.md` (159 stemmer, 4 afviger) |
| 8 | Henvisningstekst | Ikke påbegyndt (først efter brug) |

Kompakt højre side (#42): **færdig**, plus UDKAST-antal i overskrifterne og flagstribe i smalle vinduer (#44).

## 2. Afgørelser til dig (med min anbefaling)

1. **De 4 afvigelser i kildekontrollen** – skal jeg rette dem som foreslået i `review/KILDEKONTROL.md` (øverst)? Punkterne er UDKAST, så det ændrer ingen godkendt tekst. *Anbefaling: ja.*
   - knæ `beh-artrose-roentgen`: "let flekteret knæ" står i Region H's side, ikke i den citerede LH-side → tilføj kilden
   - skulder `diff-kapsulit`: "1–2 år" → "ca. 1–3 år" (LH Kapsulit 2024), konflikt med LH 2019 navngives
   - ryg `beh-ikke-anbefalet`: traktion, TENS, ultralyd og korset frarådes på grundlag af NICE (ikke-dansk) → mærkes
   - ryg `hen-infektion-malignitet`: deles i infektion (akut) og malignitet (pakkeforløb)
2. **Kladde-PR #47** – godkend de fem nye differentialdiagnoser (PMR, henført smerte fra indre organer, proksimal humerusfraktur, ikke-artikulær hævelse i knæ og ankel) som UDKAST i appen? *Anbefaling: ja* – de står som UDKAST, til du godkender dem enkeltvis.
3. **Fingeraftrykkets udgangspunkt** – fremhævningen af tre godkendte flag blev ændret 2026-11-16 under din delegerede godkendelse (skulder septisk artrit, ankel akut artrit, knæ børn). Fingeraftrykket er låst på den nuværende tilstand. Bekræfter du det? *Anbefaling: ja.*
4. **Aflåst knæ** – A: akut ortopædkirurgisk vurdering (LH Meniskskade) · B: subakut, CVI snarest og under 1 uge (Region H, LH Knæsmerter). *Anbefaling: B* – den regionale vejledning, og 2 af 3 kilder.
5. **N i ankel** – N sætter "Ingen hævelse" og "Laterale ledbånd uømme", som er hovedfundene efter et ankeltraume. A: behold (nu synligt markeret med "N") · B: fjern N i ankel. *Anbefaling: A* – det opfylder din regel (inspektion/palpation), og markeringen viser, hvad N har sat.
6. **Albue, septisk artrit** – flaget fremhæves kun ved rødme OG hævet led; teksten nævner også varme og feber, som albue ikke har felter til. A: tilføj feber og varme (som skulder og ankel) og udvid fremhævningen – det ændrer et GODKENDT flag og kræver din nye godkendelse · B: lad være. *Anbefaling: A.*
7. **Ryg, "øvrige alarmforhold"** (alder under 20 eller over 55) kan ikke fremhæves, fordi ryg ikke har et aldersfelt. A: tilføj alder (kun til flag) · B: lad være. *Anbefaling: B* – flaget står der altid, og gevinsten er lille.
8. **Den offentlige Vercel-side** – A: slå adgangsbeskyttelse til (vejledning nedenfor) · B: afbryd Vercel-projektet; klinikken bruger alligevel den lokale `cortex.html` · C: lad den være offentlig (den indekseres ikke). *Anbefaling: B* – mindst at vedligeholde, og ingen kan bruge en udkastversion ved en fejl.
9. **Fast notathøjde** (rest af trin 4) – A: lav den · B: lad være. *Anbefaling: B* – du bad mig ikke røre notatet, og det forstyrrer kun ved meget lange notater.
10. **Sletning:** jeg har ikke fundet noget, der bør slettes. `dist/` er ikke versioneret.

## 3. Sådan slår du adgangsbeskyttelse til på Vercel (ikke verificeret)

Jeg kunne ikke åbne Vercel eller deres dokumentation herfra (netværket blokerer), så tjek navnene i dashboardet:
1. Log ind på vercel.com og åbn projektet **cortex** (team "cortex18").
2. **Settings → Deployment Protection → Vercel Authentication.** "Standard Protection" kræver Vercel-login på alle forhåndsvisninger og deployment-adresser. Produktionsadressen beskyttes efter min viden kun med "All Deployments", som kræver en betalt plan.
3. "Password Protection" findes, men efter min viden kun på betalte planer.
4. Vil du helt af med den offentlige udgave (afgørelse 8 B): **Settings → Git → Disconnect** stopper nye udgaver. **Settings → Advanced → Delete Project** fjerner projektet og adressen. Begge kan ikke fortrydes uden at oprette projektet igen.

Siden frabeder sig allerede søgemaskiner tre steder: `X-Robots-Tag: noindex` (`vercel.json`), `<meta name="robots">` (`index.html`) og `robots.txt` (#48).

## 4. Det har jeg ikke kunnet verificere

- **Ctrl+Enter-kopiering:** den headless browser har ingen udklipsholder. Det er din test på klinik-pc'en.
- **Den offentlige Vercel-side:** proxyen her blokerer vercel.app, så jeg har ikke set de faktiske headers eller `robots.txt` live. Konfigurationen er i orden.
- **Vercels planer og menunavne** (afsnit 3).
- **Kildekontrollen:** 65 af de 163 punkter er tjekket maskinelt (hver sætning genfundet i kilden), ikke læst ord for ord. De øvrige 98 og alle 14 akutte henvisninger er læst. Region H's sider viser en opdateringsdato, men ingen versionshistorik.
- **De røde flags tekst:** alle 37 handlingslinjer er læst mod kilden. 26 flagtekster er kun tjekket for ordforråd (`review/TJEKLISTE.md`).
- **Klinikkens browser og skærm:** alt er afprøvet i Chromium ved 683, 800, 1366 og 1920 px bredde.

## 5. Øvrige regioner – gennemspillet (opgave 4)

To scenarier eller flere pr. region (hverdag og tidskritisk) er tabeltestet i `lib/scenarier.test.ts`, og alle 25 cases i `review/cases` er kørt med tastaturet i den byggede app: notaterne er identiske med snapshots, og de rigtige flag fremhæves. Ingen fejl i logik eller præsentation fundet. N kan ikke overskrive et registreret fund og ændrer aldrig, hvilke flag der fremhæves (testet). Fund i klinisk indhold er afgørelse 5–7 ovenfor og listen i `review/MANGLER.md`.
