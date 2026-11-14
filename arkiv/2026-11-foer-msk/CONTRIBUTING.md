# Contributing

## Branches

- `main`: stable, testable releases
- `feature/<name>`: focused changes

A separate long-lived `develop` branch is intentionally avoided while the team
is small.

## Before review

For code changes, run:

```bash
npm run check
```

Documentation-only changes should verify internal links and confirm that canonical vision documents were not changed.

Confirm:

- No patient-identifiable data is committed
- Generic behavior is kept in engine code
- Disease-specific clinical logic is kept in pathway content or pathway-specific definitions, not generic React components
- The change does not add unnecessary clicks
- Generated clinical text remains concise
- Safety-critical behavior has a documented test scenario
- The review description lists changed files, checks performed and unresolved risks

## Commit style

Use short imperative commits, for example:

```text
Add physiotherapy referral output
Move clinical review above journal
Shorten normal knee examination output
```
