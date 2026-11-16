# Cortex – gennemgang (fase 1)

Branch `review/fable`, startet 2026-11-15 fra `main` (9c451d5). Kun nye filer i `review/`. Intet eksisterende er ændret.

Mærkning: **[KØRT]** = verificeret ved at køre koden/appen. **[KODE]** = læst i koden. **[KILDE]** = slået op i kilden i dag. **[ANTAGET]** = min vurdering/antagelse.

> Arbejdsnoter skrives løbende nedenfor (afsnit "Noter"). De endelige afsnit 1–9 står øverst, når gennemgangen er færdig.

## Noter

### Trin 1: Systemet [KODE]
- **Struktur:** React 19 + TypeScript, Vite bygger én selvstændig `cortex.html` (≈380 kB). `src/` app (≈800 linjer), `lib/` logik med tests (≈260 linjer), `indhold/` kliniske data (≈4.000 linjer i 5 regionsfiler + `faelles.ts`), `docs/`, `arkiv/` (gammel Next.js-udgave, udelukket fra build).
- **Klinisk indhold er data, ikke kode.** Én TS-fil pr. region med typerne i `indhold/typer.ts`: felter (valg med fast notatsætning), notatskabelon, kilder (udgiver, år, url, `sidstTjekket`), røde flag (tekst, handling, `fremhaevHvis`), differentialdiagnoser, behandling, henvisning. Hvert klinisk punkt har `kilder[]`, `status` (UDKAST/GODKENDT), evt. `godkendtDato` og `konflikt`. `indhold/indhold.test.ts` validerer referencer, datoer, at GODKENDT har kilde og dato, og at hvert valg i et flag-felt fremhæver noget.
- **Logik:** `lib/notat.ts` (`bygNotat`, `saetSvar`, `passer`), `lib/flag.ts` (flagstatus: matcher / ikke vurderet / ikke opfyldt / uden betingelse), `lib/tastatur.ts` (tal, N, pile), `src/tast.ts` (tastetolkning, ren funktion).
- **Notatet:** genereres deterministisk. Hvert valgt svar bidrager med sin faste sætning fra indholdsfilen, i skabelonens rækkefølge (S/O). V og P er de faste `notat`-sætninger fra de diagnoser/behandlinger/henvisninger, lægen selv krydser af. Fritekst (2 felter, max 200 tegn) indsættes ordret. Ubesvarede felter udelades. Intet valgt = tomt notat.
- **LLM: ingen.** Ingen kald til nogen model eller ekstern tjeneste. `grep` efter fetch/XMLHttpRequest/WebSocket/sendBeacon/openai/anthropic i `src`, `lib`, `indhold`: 0 fund. CSP i `index.html`: `default-src 'none'` – browseren blokerer alle netværkskald. Planens fravalg (docs/plan.md §4) bekræftes. Differentialdiagnoser og anbefalinger er altså kuraterede lister pr. region med kilde – det, opgaven foreslår som "enkleste løsning", er allerede bygget.
- **Lagring: ingen.** Ingen localStorage/sessionStorage/IndexedDB/cookies/console-logning/analytics/fejlrapportering (0 fund). State lever kun i React-hukommelsen; genindlæsning rydder. Eneste udgang er udklipsholderen (`lib/kopier.ts`, med `execCommand`-reserve).
- **Deploy:** (1) `cortex.html` i repo-roden åbnes lokalt med dobbeltklik på klinik-pc'en (tiltænkt driftssted). (2) Vercel bygger hver branch og `main` til en offentlig adresse med `noindex`-header (`vercel.json`). Offentlig adresse betyder ikke datalæk (appen sender intet), men koden og det kliniske indhold er offentligt tilgængeligt, og en kollega kan finde og bruge en UDKAST-version.
- **Allerede gennemført før denne gennemgang:** UX-gennemgang (`docs/ux-review/rapport.md`), N-begrænsning (#41) og kompakt beslutningsstøtte (#42). Jeg genbruger fund derfra og henviser i stedet for at gentage.
