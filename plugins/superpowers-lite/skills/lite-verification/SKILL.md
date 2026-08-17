---
name: lite-verification
description: Use when about to claim that coding work is complete, fixed, passing, buildable, or otherwise successful.
---

# Verifying Completion Claims

Evidence before claims. Make no completion claim without fresh verification evidence.

## Match Evidence to the Claim

State the exact claim, gather evidence against the current code state, inspect the result, and keep the claim within the evidence's breadth.

- **Bug fixed:** reproduce the original failing path successfully, run the focused regression test, or perform equivalent focused verification.
- **Tests pass:** run the relevant test command and inspect its current result. Claim that all project tests pass only after running the relevant full suite.
- **Build works:** run the relevant build command successfully; lint or type-check evidence does not prove a build claim.
- **Feature complete:** verify the relevant acceptance criteria or externally observable behavior, including integration behavior implied by the claim.
- **Configuration works:** parse or validate the configuration, exercise the affected startup path, or perform a focused runtime check.
- **Refactor preserves behavior:** gather relevant characterization or regression evidence; compilation alone is insufficient.

When the task changes a CLI, API, UI, or another external entry, prefer acceptance evidence through that real entry rather than relying only on internal package tests. Focused integration evidence may support a library or internal-only task. Do not create artificial end-to-end work where no meaningful external behavior exists.

Current file or diff inspection, search, or structural validation may be sufficient for a matching structural or textual claim. Code changes or inspection alone do not prove behavioral claims such as correctness, successful execution, or regression safety.

## Keep Evidence Fresh and Proportional

Fresh evidence must still apply to the code relevant to the claim. Do not rely on results from before relevant changes, from an old run whose applicability is uncertain, or from an unverified report. Re-run verification after changes relevant to the claim or evidence; unrelated edits do not automatically invalidate it.

Choose scope from the claim's breadth, the change's reach, regression risk, and affected contracts. Run enough verification to support the claim, not the maximum verification available. Do not require a full suite for a narrow claim when focused evidence is sufficient.

The breadth of the claim must not exceed the breadth of the evidence. If only one focused regression test ran, report that result rather than saying all tests pass.

## Freeze Acceptance Scope Before Review

When optional code review is used, the Controller selects and runs reasonable task-acceptance checks before the one broad review. The reviewer receives those results with the requirements, diff, implementation report, focused evidence, and known concerns; missing planned acceptance evidence means the formal gate is not ready.

After a clean review gate, do not add checks merely because more coverage can be imagined. Reopen the task only when an explicit acceptance criterion was skipped, the evidence used by the gate is shown invalid, or a critical correctness or data-corruption issue appears. Additional hardening and coverage are deferred.

## Report the Actual State

If verification fails, report the failure and do not claim completion. If evidence is incomplete, state what was verified and what remains unverified.

Treat worker or sub-agent reports as useful information, not automatically sufficient evidence for the Controller's claim. Check their revision and applicability; inspect the relevant diff, rerun a focused check, validate an integration path, or check acceptance criteria when claim and risk require it. Do not duplicate a valid full-suite run on the same relevant revision merely for reassurance, and do not turn this into a mandatory reviewer workflow.

## Preserve Phase Boundaries

`superpowers-lite:lite-testing` decides what behavior merits testing and what testing approach provides useful protection. `superpowers-lite:lite-verification` gathers evidence for the specific claim being made now.

Do not design tests, prescribe TDD, re-run brainstorming or planning, perform architecture or code review, or expand into unrelated checks. If planned verification before broad review reveals a real mismatch, return control to `superpowers-lite:using-lite`; after the review budget is exhausted, follow its circuit breaker instead of starting another automatic repair loop.

Verification does not imply a report file. Create an artifact only when the user requests one.

After sufficient verification, return control to the current flow. Do not commit, create a pull request, merge, dispatch reviewers, or run unrelated work.
