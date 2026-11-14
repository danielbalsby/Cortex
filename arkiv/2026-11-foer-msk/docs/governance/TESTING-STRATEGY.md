# Cortex Testing Strategy

**Status:** Active  
**Owner:** Cortex  
**Last reviewed:** 2026-07-16

## Purpose

Cortex uses four separate verification layers. Passing one layer never substitutes for another, and automated success does not establish clinical validity.

## 1. Vitest engine tests

Vitest verifies deterministic, headless engine contracts, including pathway and answer validation, immutable state, visibility, fixed-point pruning, rules, suggestions, output activation, output generation, readiness and reproducibility.

Engine tests must use synthetic data, avoid clinical defaults and add regression coverage for corrected safety defects.

## 2. Playwright browser regression tests

Playwright verifies integration between React and the Workflow Engine in Chromium. It covers consultation interactions, conditional content, stale-data removal, alerts, suggestions, dynamic outputs, PSOAP rendering, copying and basic keyboard behavior.

Browser tests prefer accessible roles, labels and stable text. `data-testid` is reserved for cases where accessible locators are insufficient. Tests must remain isolated and must not depend on visual snapshots or arbitrary delays.

A successful browser test proves only that the implemented browser behavior matches its technical expectation. It does not approve clinical content or establish that the workflow is clinically useful.

## 3. Manual Clinical Design Review

A practising clinician reviews consultation flow, cognitive load, timing, interruptions, clarity, uncertainty, generated drafts and practical usefulness.

Manual review must use synthetic or non-identifiable information. CPR numbers and other direct patient identifiers must never be entered.

Automated tests cannot determine whether the workspace feels calm, whether wording is clinically appropriate or whether the workflow belongs in real practice.

## 4. Clinical evidence and pathway validation

Each pathway requires separate review of its rules, alerts, suggestion policies, plan recommendations, referral requirements, readiness checks, clinical wording, evidence sources and regional applicability.

Clinical evaluation requires documented evidence review, named clinical review and pathway-specific sign-off. Unit tests, browser tests and informal clinical use do not provide that approval.

## Pathway acceptance scenarios

Every pathway specification must define its own browser and clinical acceptance scenarios and must describe current behavior honestly. Generic tests do not replace pathway-specific scenarios.

The active knee scenarios are defined in [`KNEE-001-Knee-Pain.md`](../clinical/pathways/KNEE-001-Knee-Pain.md).

## Commands

Fast engine verification:

```bash
npm run test
npm run typecheck
```

Standard code verification:

```bash
npm run check
```

Chromium browser regression tests:

```bash
npm run test:e2e
```

Release verification:

```bash
npm run check:release
```

`check:release` runs typecheck, Vitest, the production build and Playwright. Playwright starts the Next.js development server through `webServer` so browser tests also work from a clean checkout; the production build is verified separately in the release command.
