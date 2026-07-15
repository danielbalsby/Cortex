Archived: 2026-07-15  
Status: Read-only historical record  
Reason: Superseded by the consolidated operational product roadmap.  
Replacement: `docs/product/ROADMAP.md`

---

# Cortex Roadmap

> *Build one consultation so well that clinicians choose Cortex because it makes their work simpler.*

Version 1.0

---

# Product Strategy

Cortex is not built by adding features.

Cortex is built by perfecting clinical workflows on top of a stable platform.

The platform is developed once.

Clinical workflows are added incrementally.

Every new workflow should reuse the same architecture.

---

# Strategic Objectives

Everything built in Cortex should contribute to one or more of these objectives:

- Reduce administrative work
- Reduce documentation time
- Reduce cognitive load
- Improve clinical quality
- Increase patient-facing time

Features that do not support these objectives should not be built.

---

# Platform Maturity

## Foundation

Objective

Establish a scalable platform.

Deliverables

- Repository architecture
- Engineering Constitution
- Product Principles
- Clinical Principles
- Design system
- Encounter Engine
- Output Engine
- Clinical data model

Success

The platform can support multiple clinical workflows without architectural changes.

Status

✓ Completed

---

## Clinical Workflow Engine

Objective

Create a reusable consultation framework.

Deliverables

- Clinical Composer
- Dynamic consultation cards
- Structured clinical data capture
- Live journal generation
- Clinical review
- Output generation

Success

Any consultation can be modelled using the same engine.

Status

🚧 In Progress

---

## Decision Support Platform

Objective

Integrate evidence-based clinical decision support.

Capabilities

- Red flag detection
- Guideline reminders
- Clinical quality review
- Missing information detection

Decision support remains transparent and non-blocking.

---

## Platform Integration

Objective

Connect Cortex with external clinical systems.

Examples

- Electronic Health Records
- FHIR
- Laboratory systems
- Imaging systems
- National infrastructure

---

## Intelligent Platform

Objective

Transform Cortex into a consultation assistant.

Capabilities

- Context-aware recommendations
- Documentation optimisation
- Intelligent quality assurance
- Workflow optimisation

Clinical responsibility always remains with the clinician.

---

# Clinical Coverage

Clinical workflows are added only after the previous workflow has been clinically validated.

---

## Musculoskeletal Medicine

Priority

1. Knee
2. Shoulder
3. Low Back Pain
4. Ankle
5. Hip
6. Elbow
7. Neck

Goal

Demonstrate that one platform can support multiple MSK consultations.

---

## Chronic Disease

Priority

1. Type 2 Diabetes
2. Hypertension
3. COPD
4. Asthma
5. Heart Failure

Goal

Generate complete annual review documentation from a single structured consultation.

---

## Preventive Care

Examples

- Health checks
- Cardiovascular prevention
- Vaccinations
- Lifestyle counselling

---

## Mental Health

Examples

- Depression
- Anxiety
- Stress
- ADHD follow-up

---

## Administrative Workflows

Examples

- Certificates
- Municipality forms
- Insurance documentation
- Medication renewals

---

# Current Focus

## Current Objective

Deliver the first production-quality workflow.

Workflow

Knee Consultation

Required Outputs

- Journal
- X-ray referral
- Physiotherapy referral
- Clinical review
- Patient information

Success Criteria

A GP can complete a knee consultation faster and with less cognitive effort than using the EHR alone.

---

# Development Process

Every workflow follows the same lifecycle.

Clinical Problem

↓

RFC

↓

Workflow Design

↓

Implementation

↓

Testing

↓

Clinical Validation

↓

Iteration

↓

Production

No workflow should skip any stage.

---

# Expansion Criteria

A new workflow should only begin when the previous workflow demonstrates:

- Stable architecture
- Positive GP feedback
- Reduced documentation time
- Reduced clicks
- Acceptable clinical quality
- No major architectural redesign required

---

# Success Metrics

Cortex is not measured by:

- Number of features
- Number of workflows
- Amount of AI
- Lines of code

Cortex is measured by:

- Administrative time saved
- Documentation time saved
- Click reduction
- Cognitive load reduction
- GP satisfaction
- Patient-facing time

---

# Long-Term Vision

The long-term goal is not to build another medical application.

The goal is to build a reusable clinical platform where every consultation follows the same principles:

One structured encounter.

One clinical model.

Many outputs.

Minimal administration.

Maximum patient care.

---

# Final Principle

Never expand faster than the platform matures.

A smaller platform with excellent workflows is always better than a larger platform with inconsistent quality.
