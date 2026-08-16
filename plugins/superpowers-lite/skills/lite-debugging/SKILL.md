---
name: lite-debugging
description: Use when a bug, failure, performance issue, flaky test, or unexpected behavior has an unclear root cause that should be investigated before choosing a fix.
---

# Debugging Unclear Failures

Understand before changing when the cause is unclear. Choose only the investigation steps that reduce uncertainty; do not impose a fixed debugging workflow.

## Confirm Investigation Adds Value

Use debugging when the cause is uncertain, not merely because the task is labeled a bug. It adds value for intermittent, multi-component, integration, flaky, or performance failures; several plausible causes; and failures that survived speculative fixes.

If the diagnosis and fix path are already clear, stop and return control to `superpowers-lite:using-lite`. An obvious nil dereference, wrong constant, configuration typo, or off-by-one error does not need debugging ceremony.

## Characterize the Failure

Establish enough facts to distinguish the actual failure from assumptions about it:

- What fails, and under what conditions?
- What was expected, and what happened instead?
- Which input, component, environment, state, timing, or frequency is relevant?
- Is the failure deterministic?

Collect only information that can narrow the problem space. Do not require every possible log, trace, environment detail, or repository history.

## Reproduce or Gather Equivalent Evidence

When practical, obtain the smallest stable reproducer: a focused command, minimal input, single test, small script, request, or captured event.

Treat reproduction as valuable evidence, not a gate. For intermittent, production-only, timing, environment-specific, or external-service failures, use relevant logs, traces, metrics, captured state, focused instrumentation, or good-versus-bad run comparisons instead.

## Localize the Divergence

Find where observed behavior first differs from expected behavior. In a multi-component path, test boundaries until the fault domain is narrow rather than instrumenting every component.

When bad data or state appears deep in a call chain, trace it backward to the earliest meaningful causal boundary: who supplied it, where it originated, and which assumption first failed. Stop when the location and cause are sufficient to justify a fix; do not trace unrelated history.

For flaky or concurrency failures, investigate relevant ordering, shared state, synchronization, timing, environment, or external latency instead of masking uncertainty with a sleep, retry, or larger timeout. For performance failures, measure and localize before using a focused profile or benchmark to distinguish plausible causes.

## Test Concrete Hypotheses When Needed

When the evidence does not yet establish the cause, state one concrete evidence-based hypothesis at a time and use the smallest experiment that can distinguish it from alternatives. A breakpoint, temporary log, targeted probe, focused test, single-variable change, or good-versus-bad input comparison may be enough.

If localization already provides sufficient causal evidence, do not manufacture an extra hypothesis cycle.

Do not stack speculative fixes. If evidence contradicts the hypothesis, discard or revise it and form the next hypothesis from the new evidence rather than patching around the contradiction.

A small code change may test a hypothesis, but keep clear whether it is diagnostic or an intended fix. Do not let temporary guards, instrumentation, or speculative production changes silently become the final implementation.

Repeated failed hypotheses or patches are a signal to revisit assumptions, causal boundaries, or architecture, not a fixed-count escalation rule.

## Bound Diagnostic Work

Treat a root cause as a sufficiently supported causal explanation of where and why behavior becomes wrong and where a fix is justified. Do not pursue a unique philosophical cause beyond what the current failure requires.

Choose a minimal fix direction at the causal boundary when practical; do not merely hide a downstream symptom, and do not use root-cause language to justify unrelated redesign.

Temporary logs, assertions, instrumentation, scripts, and reproducers are disposable diagnostic tools. Remove them when no longer useful unless long-term observability is separately justified.

Distinguish a diagnostic reproducer from a regression test. If it deserves to become lasting behavioral protection, let `superpowers-lite:lite-testing` decide whether and how to retain it.

## Respect Phase Boundaries and Stop

If expected behavior or a public contract is undefined, return to `superpowers-lite:lite-writing-specs`. If the evidence exposes a consequential architecture choice, return to `superpowers-lite:lite-brainstorming` rather than redesigning architecture here.

Once the failure is sufficiently characterized, the causal location is identified, the cause is sufficiently supported by evidence, and the fix direction is justified, stop and return control to `superpowers-lite:using-lite`. Let it choose direct implementation or `superpowers-lite:lite-writing-plans` as needed.

Debugging explains why behavior is wrong. `superpowers-lite:lite-testing` chooses lasting behavioral protection, and `superpowers-lite:lite-verification` decides what fresh evidence supports a completion claim. Do not claim the bug is fixed during debugging.

Debugging does not imply a report artifact. Keep evidence, hypotheses, and results in the current context unless the user requests durable documentation or a long-running investigation clearly benefits from it.

Do not create an implementation plan, manage Git or worktrees, request review, or orchestrate workers.
