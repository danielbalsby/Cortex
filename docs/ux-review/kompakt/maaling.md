# Måling: kompakt højre side (knæ)

Målt i Chromium med `cortex.html` før (main) og efter. Scenarie A: vridtraume, hævelse straks, moderat hævelse, instabilitet. Scenarie C: akut, få dage, feber, rødme, varme (alloplastik kan ikke registreres, se rapport.md).

| Scenarie / skærm | Beslutningsstøtte før | efter | Røde flag synlige uden rulning før → efter | Sektionsoverskrifter synlige efter |
|---|---|---|---|---|
| A 1366×768 | 7.664 px | 498 px | 3 → 10 af 10 | 4 af 4 |
| C 1366×768 | 7.683 px | 498 px | 2 → 10 af 10 | 4 af 4 |
| A 1920×1080 | 6.554 px | 498 px | 6 → 10 af 10 | 4 af 4 |
| C 1920×1080 | 6.573 px | 498 px | 6 → 10 af 10 | 4 af 4 |

Højden er `.stoette` (beslutningsstøtten alene); notatet over den er uændret (127–149 px). Hele højre kolonne (notat + støtte) er efter 649–670 px mod 6.700–7.850 px før.

Skærmbilleder: `foer-*.png` og `efter-*.png` (begge scenarier og begge skærmstørrelser), `efter-udfoldet-C-*` (ét flag og henvisning udfoldet).


## Selvtest 2026-11-15 (Playwright, Chromium)

**Alle fem regioner, 1366×768 og 1920×1080, tomt skema:** alle flag og alle fire sektionsoverskrifter med antal er synlige uden rulning. Intet er udfoldet fra start, rød bruges ikke uden for flag, og der er ingen konsolfejl.

**Funktion:**
- Alle 37 flag udfoldet: teksten er identisk med indholdsfilen, `→ handling` står i samme punkt, og kilder og status vises.
- Regionsskift folder alt sammen igen.
- Scenarie C: 2 matchende flag står øverst under "Matcher dine valg", og de 8 øvrige følger i indholdsfilens rækkefølge.
- Bakteriel artrit: "ikke vurderet" ved tomt skema. Når feber, rødme og varme er besvaret negativt, er der ingen markering, og udfoldet står der "Det udelukker ikke flaget".
- Tastatur: tal åbner region og vælger, Enter og mellemrum folder sektion og flag, og Tab + Enter på `+ V` skriver i notatet. Tal og N med fokus i højre side ændrer ikke felterne.
- Kildekonflikter (6 i knæ) vises ved udfoldning i neutral farve.
- **Ikke verificeret:** Ctrl+Enter-kopiering, fordi udklipsholderen ikke findes i den headless browser.

**Langt notat, knæ, 1366×768 (notatet er ikke ændret):**

| Notat | Notathøjde | Flag synlige | Sektionsoverskrifter synlige |
|---|---|---|---|
| Alle felter udfyldt | 257 px | 10/10 | 3/4 (Henvisning under kanten) |
| Alle felter + 2 fulde fritekster | 366 px | 9/10 | 1/4 |

Matchende flag står øverst og er synlige i begge tilfælde. Målet kan kun holdes i ekstremtilfældet, hvis notatets maksimale højde sænkes (i dag 40 % af skærmhøjden). Det er en ændring af notatet og ikke foretaget.
