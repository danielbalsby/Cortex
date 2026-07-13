# Contributing

## Branches

- `main`: stable, testable releases
- `feature/<name>`: focused changes

A separate long-lived `develop` branch is intentionally avoided while the team
is small.

## Before merging

Run:

```bash
npm install
npm run check
```

Confirm:

- No patient-identifiable data is committed
- Clinical logic is kept outside generic UI components
- The change does not add unnecessary clicks
- Generated clinical text remains concise
- Safety-critical behavior has a documented test scenario

## Commit style

Use short imperative commits, for example:

```text
Add physiotherapy referral output
Move clinical review above journal
Shorten normal knee examination output
```
