# Cortex Roadmap

> **Build one consultation so well that clinicians choose Cortex because it makes their work simpler.**

Version 1.0

---

# Product Strategy

Cortex is not built by adding features.

Cortex is built by perfecting one clinical workflow at a time on top of a reusable platform.

The platform matures.

Clinical workflows expand.

Every improvement should contribute to one or more of the following outcomes:

- Reduce administrative burden
- Reduce documentation time
- Reduce cognitive load
- Improve clinical quality
- Increase patient-facing time

Features that do not support these outcomes should not be built.

---

# Development Strategy

Cortex evolves along two dimensions.

## Platform Maturity

Improve the underlying platform.

Examples:

- Encounter Engine
- Clinical Composer
- Output Engine
- Decision Support
- Design System
- Performance
- Integrations

---

## Clinical Coverage

Expand the number of supported consultations.

Examples:

- Knee
- Shoulder
- Low Back Pain
- Diabetes
- Hypertension

Platform maturity always takes priority over clinical expansion.

---

# Current Focus

## Objective

Deliver the first production-quality clinical workflow.

### Workflow

**Knee Consultation**

### Deliverables

- Structured consultation workflow
- Live journal generation
- Clinical review
- X-ray referral
- Physiotherapy referral
- Positive Documentation Engine
- Ottawa Knee Rules
- Transparent clinical decision support

### Success Criteria

A GP should be able to complete a knee consultation:

- faster than using the EHR alone
- with fewer clicks
- with lower cognitive load
- without compromising clinical quality

Status:

🚧 In Progress

---

# Clinical Expansion

New workflows are added only after the previous workflow has been clinically validated.

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

Reuse the existing platform without architectural changes.

---

## Chronic Disease

Priority

1. Type 2 Diabetes
2. Hypertension
3. COPD
4. Asthma
5. Heart Failure

Goal

Generate complete chronic disease documentation from one structured consultation.

---

## Preventive Care

Examples

- Health checks
- Cardiovascular prevention
- Lifestyle counselling
- Vaccinations

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

Goal

Reduce administrative work outside the consultation.

---

# Platform Evolution

As the platform matures, Cortex will gradually support:

- Electronic Health Record integration
- FHIR interoperability
- Laboratory systems
- Imaging systems
- National healthcare infrastructure

Every integration should reuse the existing platform rather than introduce workflow-specific solutions.

---

# Expansion Criteria

A new workflow should only begin when the previous workflow demonstrates:

- Stable architecture
- Positive feedback from practising GPs
- Reduced documentation time
- Reduced cognitive load
- Improved workflow
- No major architectural redesign required

Clinical validation always precedes expansion.

---

# Development Process

Every feature follows the same lifecycle.

Clinical Problem

↓

Workflow Specification (RFC)

↓

UX Design

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

No feature should skip any stage.

---

# Success Metrics

Progress is measured by outcomes.

Not by output.

Primary metrics

- Administrative time saved
- Documentation time saved
- Click reduction
- Cognitive load reduction
- GP satisfaction
- Patient-facing time

Secondary metrics

- Build stability
- Test coverage
- Performance
- Maintainability

---

# Now

Current priorities:

- Complete the Knee Consultation MVP
- Refine Clinical Composer
- Finalise Encounter Engine
- Complete Output Engine
- Validate with practising GPs
- Iterate based on clinical feedback

---

# Next

After successful validation:

- Shoulder
- Low Back Pain
- Ankle

No new workflow begins before the Knee workflow is clinically validated.

---

# Later

Once the musculoskeletal platform is mature:

- Diabetes
- Hypertension
- COPD
- Asthma
- Mental Health
- Preventive Care
- Administrative Automation
- Platform Integrations

Expansion follows demonstrated clinical value, not feature ambition.

---

# Long-Term Vision

Cortex is not intended to become another electronic health record.

Its purpose is to become the clinical workflow layer that sits above existing systems.

Clinicians perform one structured consultation.

Cortex generates everything else.

One encounter.

One structured clinical model.

Many outputs.

Minimal administration.

Maximum patient care.

---

# Final Principle

Never expand faster than the platform matures.

Perfect one workflow.

Validate it in clinical practice.

Reuse the platform.

Repeat.
