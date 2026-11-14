# Cortex

Personligt værktøj til konsultationen i almen praksis. Dækker bevægeapparatet: skulder, albue, lænderyg, knæ og ankel.

For den valgte region giver Cortex et kort journalnotat til at kopiere ind i journalsystemet og kildebelagt beslutningsstøtte (røde flag, differentialdiagnoser, behandling, henvisning).

Cortex gemmer ingen data og sender intet nogen steder hen.

## Brug

Hent `cortex.html` og åbn den med dobbeltklik. Der skal ikke installeres noget.

## Udvikling

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run check
```

`npm run check` kører typecheck, tests og build og opdaterer `cortex.html`.

- Regler og principper: [`CLAUDE.md`](CLAUDE.md)
- Plan og status: [`docs/plan.md`](docs/plan.md)
- Gennemgang af den tidligere udgave: [`docs/review.md`](docs/review.md)
- Tidligere kode og dokumenter: `arkiv/`
