# Clinical pathway documentation

This directory contains current, versioned specifications for implemented clinical pathways.

## Language

Clinical pathway specifications are written in Danish. English may be used for metadata, technical identifiers and links where it improves precision.

## Required metadata

Every specification must state status, owner, last-reviewed date, implementation version, clinical validation status, intended users and intended setting.

## Validation expectations

Rules, suggestions, plan recommendations and output requirements require documented sources, versioning, regional applicability, named clinical review and safety-focused acceptance tests before real use.

## Relationship to implementation

A pathway document must describe current behavior honestly and identify intended or future behavior separately. It must be reviewed when pathway content, shared rule behavior, output generation or UI behavior changes. Implementation remains authoritative for what the prototype currently does; the specification makes that behavior reviewable and records unresolved clinical requirements.

All pathways must follow [`WF-001`](../../vision/WF-001-The-Consultation-Workflow.md), the [clinical safety principles](../../governance/CLINICAL-SAFETY-PRINCIPLES.md) and the [current architecture](../../architecture/README.md).

## Current specifications

- [`KNEE-001 – Knæsmerter`](KNEE-001-Knee-Pain.md) — prototype, not clinically validated.
