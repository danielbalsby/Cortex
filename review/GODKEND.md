# Til godkendelse – klinisk tekst og betingelser

> **Besluttet 2026-11-16:** lægen gav Claude lov til at godkende. Gennemført: **A2, B (med B9-alt), C1, C2, C3, D1, D2**; E: intet. Ét commit pr. bogstav på branch `fase2/fable`. Knæets fraktur-flag er nu **UDKAST** og venter på lægens egen godkendelse – Claude sætter ikke GODKENDT. F (manglende indhold) er ikke gjort: det kræver lægens formulering.

Alt her kræver din godkendelse, før jeg ændrer indholdsfilerne. Hvert punkt er færdigt formuleret. Svar fx: **"Godkend A2, B, C, D"** eller "Godkend B undtagen B5". Det, du godkender, implementerer jeg som ét trin pr. bogstav. Snapshots i `review/cases` ændres bevidst, og jeg viser forskellen.

---

## A. Knæ-frakturflagets handling (GODKENDT flag, afviger fra kilden)

Nu: *"Akut røntgen af knæ, hvis blot ét kriterie i én af reglerne er opfyldt. Akut henvisning ved mistanke om brud (Region Hovedstaden: CVI)."* – første sætning er Claudes beslutning (plan.md §7), ikke kildetekst.

- **A1 – behold.** Du godkender aktivt Claudes regel. Ingen ændring; konfliktteksten bliver stående.
- **A2 – kildetro (min anbefaling).** Ny handling: *"Lægehåndbogen: røntgen ved ét af knee rules-kriterierne. Region Hovedstaden: akut røntgen ved ét af Pittsburgh-kriterierne. Akut henvisning ved mistanke om brud (Region Hovedstaden: CVI)."* Klinisk samme effekt (begge regler står der, og ét kriterie er nok i hver), men ingen modelformuleret regel i et godkendt flag. Flaget går tilbage til **UDKAST**, til du godkender det igen. Fremhævningen ændres ikke.

## B. Knapper, der viser hele notatpåstanden (13 valg)

Kun knappens tekst ændres. Notatsætningen er uændret. (Alternativt kan notatsætningen forkortes – sig til pr. punkt.)

| # | Region · felt | Knap nu | Knap foreslået | Notatet skriver (uændret) |
|---|---|---|---|---|
| B1 | Skulder · AC-led | Uømt | Uømt, crossover neg. | AC-leddet uømt, negativ crossover-test. |
| B2 | Albue · Neurovaskulært | Normal | Puls + 3 nerver normale | Palpabel radialispuls; normal sensibilitet og motorik svarende til n. ulnaris, medianus og radialis. |
| B3 | Albue · Isometrisk | Smertefri | Smertefri ekst. + fleks. | Smertefri isometrisk ekstension og fleksion af håndleddet. |
| B4 | Albue · Ulnaris | Normal | Normal sens. + kraft | Normal sensibilitet i 4.–5. finger og normal kraft i ulnarisinnerverede muskler. |
| B5 | Ryg · Cauda | Ingen gener | Ingen blære-/tarm-/ridebuksegener | Ingen vandladnings- eller afføringsforstyrrelser og ingen føleforstyrrelser i ridebukseområdet. |
| B6 | Ryg · Reflekser | Normale | Patellar + achilles normale | Normale og symmetriske patellar- og achillesreflekser. |
| B7 | Ryg · Rektal | Normal | Normal tonus, kraft, sens. | Rektaleksploration: normal sfinktertonus og knibekraft, normal sensibilitet perianalt. |
| B8 | Knæ · Stabilitet | Stabil | Stabil ved ligamenttest | Stabilt ved klinisk ligamenttest. |
| B9 | Ankel · Hævelse | Udtalt | Udtalt + hæmatom | Udtalt hævelse og hæmatom. |
| B10 | Ankel · Syndesmose | Uøm | Uøm, squeeze neg. | Syndesmosen uøm ved palpation og squeeze-test. |
| B11 | Ankel · Akilles | Normal | Intakt, Thompson neg. | Akillessenen uden defekt; negativ Simmonds-Thompson-test. |
| B12 | Ankel · Mellemfod | Ingen | Ingen (navic. + 5. mt.) | Ingen knogleømhed over os naviculare eller basis af 5. metatars. |
| B13 | Ankel · Neurovaskulært | Normal | Normal cirk. + sens. | Normal distal cirkulation og sensibilitet. |

Alternativ til B9, som jeg foretrækker: notatsætningen ændres til *"Udtalt hævelse."* (hæmatom er et selvstændigt fund). Svar "B9-alt".

## C. Felter, så flag kan fremhæves og dokumenteres

Notatsætningerne er de samme, som knæ allerede bruger.

- **C1 – Skulder:** nyt felt *Feber* under anamnese (Nej → "Ingen feber." · Ja → "Feber.") og nye felter *Rødme* (Ingen → "Ingen rødme." · Ja → "Rødme.") og *Varme* (Ingen → "Ingen varmeøgning." · Ja → "Varmeøgning.") under objektivt. Flaget *Septisk artrit* (GODKENDT) fremhæves ved feber = ja ELLER rødme = ja ELLER varme = ja – som knæets flag om bakteriel artrit. Flagteksten nævner "varmt, rødt … feber", så betingelsen følger teksten.
- **C2 – Ankel:** samme tre felter. Flaget *Akut artrit, herunder infektion* (GODKENDT) fremhæves ved rødme = ja ELLER varme = ja. Feber kommer i notatet, men fremhæver ikke, fordi flagteksten ikke nævner feber. (Sig til, hvis feber også skal fremhæve.)
- **C3 – Knæ:** feltet *Alder* vises altid (i dag kun ved traume). Flaget *Barn med knæsmerter* fremhæves ved alder = under 12. Begrænsning: 12–17-årige fanges ikke, fordi aldersgrupperne følger Pittsburgh-reglen.
  Nødvendig følgeændring: i dag fremhæver alder alene (under 12, 51–55, over 55) fraktur-flaget – det er kun ufarligt, fordi feltet kun vises ved traume. Ved C3 tilføjes "og traume = ja" til de tre aldersbetingelser i fraktur-flaget, så en 60-årig med gonartrose ikke får fremhævet fraktur-flaget.

Ændring af fremhævning i et GODKENDT flag ændrer ikke flagets tekst; status forbliver GODKENDT, medmindre du siger andet.

## D. Notatskabelon: alder ud af notatet

Feltet *Alder* bruges til flag (Ottawa/Pittsburgh, børn, cuff efter luksation), men "Alder 12–50 år." / "Alder 40–75 år." er ikke noget, en læge skriver i et notat – alderen står i journalen.

- **D1 – Knæ:** alder fjernes fra notatskabelonen (feltet og flagene er uændrede).
- **D2 – Skulder:** samme.

"Forudgående traume. Traume ved vrid." lader jeg stå: at fjerne den første sætning kræver en betinget regel i koden, og gevinsten er lille.

## E. Sikkerhedsnet i P (trin 10) – forslag: gør ingenting nu

Jeg har søgt i kilderne efter formuleringer om opfølgning og genkontakt. Kun ryg og ankel har dem, og begge har allerede et punkt: ankel `beh-opfoelgning` ("Kontrol om 3–5 dage; tidligere ved forværring.") og ryg `beh-langvarig` ("genvurder efter 1–2 uger"). For skulder, albue og knæ fandt jeg ingen kildeformulering, så jeg foreslår ingen tekst. Vil du have et sikkerhedsnet dér, skal du give mig ordlyden eller pege på kilden.

## F. Indhold, der mangler (kræver din formulering og kilde)

Se `TJEKLISTE.md` → "Mangler i indholdet". Vigtigst: henført skuldersmerte (hjerte, lever/galde), som står i LH Subacromielt smertesyndrom (2021), som Cortex allerede citerer.
