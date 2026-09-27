# Sprint 0 Implementation Report v0.1

**Build Assignment:** BA-002  
**Status:** Implemented as an isolated learning prototype  
**Branch:** `prototype/sprint-0`  
**Data classification:** Synthetic test data only  
**Clinical status:** Not clinically validated and not for clinical use

## Baseline

- Baseline parent: `c002b93453d9fc97ca219053575bbfc6b885f480`
- Recovered Phase 4A baseline commit: `1b1b0bd` (`Recover Phase 4A prototype baseline`)
- Before-measurement: Vitest 159/159, Playwright Chromium 22/22, typecheck passed and production build passed.
- Existing unrelated working-tree changes were preserved and were not included in the baseline commit.
- No files were deleted and nothing was pushed.

## Phase 4A recovery result

Seven untracked Phase 4A files were found and secured in the local baseline commit. The route, workspace component, contextual completion panel, styles, scenario, browser test and experiment README were classified as relevant reference material. The scenario/state interaction was also necessary reuse input for Sprint 0. No recovered file was classified as irrelevant or deleted.

Sprint 0 reuses the Phase 3 prototype state model, reducer, journal generation and draft override rather than modifying the recovered experiment or the production workflow.

## AI-test recovery result

A repository-wide recovery check covered the working tree, local and remote refs, branches, worktrees, package scripts, Playwright fixtures and helpers, agent/model configuration, evaluator and scenario naming, Git reflog, dangling commits and sibling repository files.

No repository-resident AI evaluator, prompt test harness, model abstraction, automated agent runner or report generator was recoverable.

| Question | Result |
| --- | --- |
| Location | Not present in the repository or recoverable Git history inspected |
| Start command | None |
| Tests performed | None; no recovered implementation exists |
| Real model or deterministic simulation | Not applicable to the missing evaluator. Sprint 0 itself uses a deterministic mock provider |
| Browser control | No repository-resident AI browser controller was found |
| Structured findings | No recovered generator was found |
| CI/local use | Not available |
| Credentials/environment | No AI credential or model environment-variable contract was found |

This is a concrete Sprint 0 gap. A replacement AI evaluation framework was deliberately not implemented. To satisfy the assignment's verifiable agent check without expanding the repository, Codex' external in-app browser control was used once against the local prototype. This is an execution-time evaluation, not a repository capability and not CI-ready.

## Reused parts

- Next.js App Router, TypeScript configuration and existing build pipeline.
- Vitest and Playwright Chromium configuration.
- Clinical Document Workspace prototype model and immutable reducer.
- Existing deterministic journal generator and `JournalDraftOverride` behavior.
- Existing choice controls and design tokens where suitable.
- Existing separation between recorded facts, generated output and manual draft overrides.

## New parts

- Isolated route: `/prototype/sprint-0`.
- Synthetic patient fixture and explicit fixture-to-consultation actions.
- Deterministic local mock AI summary with a controlled failure mode.
- Patient Overview, consultation workspace and three reviewable draft surfaces.
- Prototype-only imaging and physiotherapy referral-draft generators.
- Explicit draft lifecycle: Draft → Reviewed → Approved for copy → Copied, plus Rejected.
- Local learning instrumentation and event log.
- Six unit tests and five Playwright flows.

## Mocked dependencies

Patient data, Patient Overview context, AI Summary, backend, persistence, EHR, referral destinations and external delivery are mocked or absent. No external request is made. No environment variable is required. Live-model mode is not implemented.

## Implemented flows

1. Open a clearly synthetic patient and review supplied, negative, missing and uncertain context.
2. Generate or reject a clearly labelled deterministic mock AI Summary.
3. Start an empty consultation and explicitly record only selected case information.
4. Record trauma mechanism, pain, swelling, locking, instability, weightbearing, objective findings, clinician assessment and neutral plan actions.
5. Review and manually edit the journal draft without changing recorded clinical facts.
6. Create imaging and physiotherapy drafts only after explicit referral intent and minimum prototype inputs.
7. Review, approve and copy drafts as separate human actions; no delivery exists.
8. Reject or restore generated content without losing consultation facts.
9. Continue manually after a simulated AI-summary failure.
10. Report completion, stopping stage, edited drafts, rejections and recovered failure state locally.

## Test results

Final verification on 2026-07-22:

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run test` | 12 files, 165/165 tests passed; 0 skipped; 0 failed |
| `npm run test:e2e` | Chromium 27/27 passed; 0 skipped; 0 failed |
| `npm run build` | Passed; `/prototype/sprint-0` statically generated |
| `npm run check` | Passed |
| `npm run check:release` | Passed, including all 27 browser tests |

The first sandboxed Playwright attempt could not bind to local port 3100 (`EPERM`). The identical command passed when granted local server access. This was an execution-environment restriction, not an application defect.

Direct unit coverage includes untouched-state omission, deterministic mock output, recoverable mock failure, explicit referral intent, fact-based referral generation and ordered draft transitions. Browser coverage includes authority separation, explicit clinical facts, preservation of manual journal edits, referral and copy lifecycle, clipboard behavior, instrumentation and degraded-state recovery. The 22 pre-existing browser flows continue to pass.

## AI-agent test results

Five browser-driven scenarios were executed against the local route using an external Codex agent. These observations supplement automated tests; they do not replace clinician testing.

| Scenario | Orientation | Completion/result | Safety observation |
| --- | --- | --- | --- |
| Happy path | Patient, consultation and draft stages were identifiable | Case facts, assessment, imaging intent and journal review/approval/copy were reachable | AI was not attributed decision authority; review, approval and copy remained distinct |
| Missing information | Missing and uncertain items were visible in Patient Overview and repeated in the mock summary | The agent identified instability, weightbearing and objective examination as unresolved | Uncertainty was not hidden and untouched values did not appear as normal/negative facts |
| Clinician disagrees with AI | AI Summary and clinician assessment were separate regions | Mock summary was rejected while patient context remained; a contrary clinician assessment was recorded independently | Rejection did not alter source data or silently create a decision |
| Clinician corrects journal | Journal editing was available within the draft region | A manual correction remained after a consultation update; rejection preserved consultation facts | No loss of clinical state; automated generation did not overwrite the human draft |
| Degraded AI state | Failure message named the unavailable AI Summary | `Fortsæt manuelt` opened the consultation and the session report recorded recovery | No dead end and no forced AI dependency |

Across the five scenarios: no erroneous attribution of AI authority, hidden uncertainty, dead end, loss of human edits or unclear approval/copy transition was observed. One usability limitation remains: the full consultation and three drafts form a long page at desktop height, so orientation should be checked with practising clinicians.

## Known limitations

- The content is a fixed synthetic learning case, not validated clinical pathway content.
- There is no real model, AI evaluator, backend, persistence, authentication, EHR integration or referral delivery.
- Referral wording is prototype-only and has not undergone clinical evidence or regional validation.
- The complete scenario currently requires copying all three relevant drafts before local instrumentation reports completion.
- Local instrumentation is session-only and is not an analytics or audit system.
- Chromium is the only configured browser project.
- AI-agent findings are an external one-time evaluation and cannot currently be rerun by a repository command or CI.
- Human factors, clinical plausibility, cognitive load and clinical authority comprehension still require testing with practising clinicians using no patient-identifiable data.

## Deviations from scope

No production route, Workflow Engine contract, KNEE-001 pathway, dependency, package script, backend or live provider was changed. The only deviation from the requested AI-test reuse is caused by the documented absence of the earlier AI-test capability. The prescribed five scenarios were therefore evaluated externally rather than by a recoverable repository runner.

The parallel Product test script is outside this Build assignment and was not created or modified by Build.

## Demo instruction

1. Run `npm run dev`.
2. Open `http://localhost:3000/prototype/sprint-0`.
3. Review the synthetic Patient Overview and generate the deterministic mock summary.
4. Open a new consultation and inspect the contents of the grouped case action before explicitly recording it.
5. Add a clinician assessment and plan actions.
6. Explicitly request both referral drafts.
7. Edit the journal, then mark each relevant draft reviewed, approve it for copying and copy it.
8. Reload and use `Simulér AI-fejl` followed by `Fortsæt manuelt` to demonstrate degraded operation.
9. Inspect the local Session report after each flow.

## Readiness for human testing

**Ready for bounded prototype usability testing with the founder and a small number of practising clinicians, using synthetic data only.**

This means the interaction model, human-control boundaries, draft lifecycle and degraded flow can be evaluated. It does not establish clinical validity, regulatory readiness, production readiness or approval for real patient data. The missing repository-resident AI evaluation capability remains the principal testing-infrastructure blocker, but it does not block a supervised synthetic-data usability session.
