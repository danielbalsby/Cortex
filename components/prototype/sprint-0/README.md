# Sprint 0 Learning Prototype

This isolated route is a synthetic learning artifact. It does not replace the root workflow or the existing Clinical Document Workspace prototypes.

## Run

```bash
npm run dev
```

Open `http://localhost:3000/prototype/sprint-0`.

## Verify

```bash
npm run test
npm run test:e2e -- e2e/sprint-zero.spec.ts
npm run typecheck
npm run build
```

## AI test command

No repository-resident AI/agent evaluator was recoverable from branches, worktrees, scripts, fixtures, configuration or dangling commits. There is therefore no honest AI-test command in Sprint 0. The deterministic mock provider is covered by Vitest and Playwright; these tests are not presented as AI-agent evaluation.

## Provider and environment

- Active mode: deterministic local mock only.
- Live mode: not implemented.
- Required environment variables: none.
- External requests: none.
- Data: synthetic fixture only; no CPR number or direct patient identifier.
