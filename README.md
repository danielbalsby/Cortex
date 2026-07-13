# Cortex

Clinical workflow platform for Danish general practice.

## Current scope

The current release contains one reference workflow:

- Knee pain consultation
- Live clinical journal output
- Rule-based clinical review
- X-ray draft
- Orthopaedic referral draft
- Structured assessment support
- Sticky consultation cockpit

The product is an early clinical prototype and is not validated medical software.

## Product mission

Reduce administrative friction in general practice while preserving clinical
quality, transparency and patient safety.

## Core principles

- Document once.
- Workflow before features.
- Simplicity over flexibility.
- Clinical rules must be explainable.
- Cortex supports clinical judgement; it does not replace it.
- Patient data must not be entered into development builds.

## Local development

Requirements:

- Node.js LTS
- npm

Install and start:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build verification

```bash
npm run check
```

This runs TypeScript validation followed by a production build.

## Repository status

Current milestone: `v0.4.0-alpha`

The architecture is frozen until the first pilot. Development should focus on
small, testable improvements to the knee workflow.
