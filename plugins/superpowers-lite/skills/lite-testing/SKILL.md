---
name: lite-testing
description: Use when a coding change benefits from deliberate decisions about regression coverage, test scope, test level, or behavior-focused testing.
---

# Testing for Useful Protection

Tests should protect behavior, not satisfy ritual.

## Confirm the Skill Adds Value

A task may need testing without needing `superpowers-lite:lite-testing`. When the appropriate check is obvious—such as parsing a changed configuration—use it directly and return control to `superpowers-lite:using-lite`.

Use this skill when choosing regression coverage, valuable cases, test level, or behavior boundaries requires judgment. Do not create a test strategy whose cost approaches or exceeds the confidence it adds.

## Match the Approach to the Change

### Bug fixes

Understand and reproduce the failure when practical. When a bug can be stably and reasonably automated, strongly prefer to write a focused regression test first, confirm it fails because of the reported bug, fix the root cause, and confirm it passes.

Regression-test-first is a preference, not a law. For unstable external failures, timing or environment issues, configuration or operational problems, disproportionately costly reproduction, or projects without a reasonable test entry point, use meaningful focused reproduction, integration, instrumentation, or runtime checks instead. Do not manufacture a brittle or fake regression test.

### New features

Prefer test-first when isolated deterministic logic or a clear contract makes it improve design clarity or confidence. Parsers, serializers, validation, state transitions, and domain logic often benefit.

For glue code, framework configuration, UI wiring, generated code, dependency registration, or infrastructure plumbing, implementation followed by a meaningful integration or startup check may be more useful. Do not force low-value unit tests to claim TDD.

### Refactors

When behavior must remain unchanged, use sufficient existing coverage if present. If important behavior is weakly protected, add characterization tests before refactoring, then run relevant regression coverage. Protect existing contracts rather than the current internal structure.

## Test Behavior at the Right Level

Prioritize observable behavior, public contracts, meaningful state transitions, caller-visible errors, important boundaries, and regression-prone behavior.

Avoid coupling tests to private helpers, internal call counts, local execution order, or private data structures without contractual meaning. A useful test fails when meaningful behavior breaks, not merely when implementation structure changes.

Prefer real behavior over mock behavior when practical. Use mocks, fakes, or stubs for genuine boundaries such as networks, databases, clocks, filesystems, expensive dependencies, or nondeterministic services. A mock interaction alone provides weak behavioral protection when the user-visible behavior remains untested.

Test at the lowest level that reliably proves the behavior, but not below the level where the behavior exists. If a final CLI contract emerges from several components, serializer unit tests alone may not replace command-level or integration coverage.

Derive important expected results from requirements, independently checked examples, or an established reference, not by copying the implementation's assumptions into assertions. When semantic interpretation is the task, verify the values that determine correctness, such as identity, direction, amounts, or state transitions. A success status, record count, or printed diagnostic does not establish those values. Use existing representative positive and contrasting cases when available rather than selecting only a case that fits the proposed rule.

For stateful refactors, cover relevant failure transitions and their caller-visible effects, not just the successful helper result. When reducing repeated work is an explicit task requirement, a focused structural or operation-count check may establish that change; do not demand an isolated latency gain unless the acceptance contract requires one.

## Keep Scope Proportional

Choose scope from change reach, contract importance, regression risk, reuse, and affected boundaries. Protect the changed behavior and its meaningful blast radius; do not automatically require unit, integration, end-to-end, and full-suite coverage together.

Match checks to the workflow stage when review is used:

- implementation uses focused tests;
- checks needed for the declared review scope run before broad review, with a full suite only when task risk justifies it; a user-requested implementation/correctness review may precede final performance or operational acceptance;
- a batched review fix uses focused regression tests; and
- scoped re-review reads applicable evidence and runs only the minimum directly relevant checks.

Reserve full suites, race checks, cross-platform checks, and complete end-to-end coverage for task risk or milestone integration that warrants them. Do not automatically run them for every small fix or test-only change, duplicate a valid full-suite result from the same revision, or turn scoped re-review into full integration testing.

Add edge cases when justified by requirements, a known failure, a real boundary, the data model, a dependency contract, or plausible regression risk. Do not generate a generic edge-case matrix or pursue coverage percentage as an end in itself.

Distinguish an unavailable sample from a reproduced defect or an unimplemented requirement. Assess what existing evidence proves and what remains uncertain. Keep external sample searches bounded by the agreed scope; do not keep extending them or create fake evidence to fill the gap. If a required acceptance condition cannot be met, report it and propose a justified adjustment for the user's decision rather than silently weakening the condition or treating every missing sample as equally blocking.

When a test fails, distinguish the intended behavior failure from setup errors, wrong assumptions, unrelated existing failures, and actual regressions.

If an established contract is correctly expressed by a failing test, fix the implementation rather than weakening the expectation. If the expected behavior is materially unclear, return to `superpowers-lite:lite-writing-specs`; if a consequential architecture choice remains, return to `superpowers-lite:lite-brainstorming`.

## Preserve Phase Boundaries

`superpowers-lite:lite-testing` decides what behavior merits testing and what approach provides useful protection. `superpowers-lite:lite-verification` gathers fresh evidence for the specific completion claim being made.

Do not redefine requirements, reorganize implementation tasks, claim completion, perform code review, manage Git or worktrees, or orchestrate workers.

## Control Artifacts and Stop

Testing does not imply a test-plan, strategy, or coverage document. Keep the reasoning in the current context unless the user requests an artifact.

Once the valuable behaviors, test level, timing, and key cases are clear, apply that strategy in the current implementation flow and run the relevant tests or checks. Do not expand testing beyond the useful scope merely because more tests exist.

Final completion claims belong to `superpowers-lite:lite-verification`, which may reuse these results when they remain fresh and sufficient for the claim.
