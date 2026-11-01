---
name: lite-writing-specs
description: Use when a non-trivial coding task has behavior, externally visible contracts, boundaries, or acceptance criteria that should be made explicit before implementation.
---

# Writing Lightweight Specs

Describe what the system must do. Do not design how the implementation will be organized.

## Confirm a Spec Adds Value

If the change is already obvious and has no meaningful behavior or contract to define, stop and return control to the router. SIMPLE changes such as typos, direct configuration edits, and narrow bug fixes usually need no spec.

If consequential architecture choices remain unresolved, stop and use `superpowers-lite:lite-brainstorming`. A spec records decided behavior; it does not choose the architecture.

## Resolve Only Material Unknowns

Gather only the project context needed to understand existing behavior and contracts. Follow an established project pattern when it resolves the question. Use a reasonable default only for non-contractual details that do not materially affect observable behavior, scope, or public contracts.

Ask the user only when an unknown would materially change behavior, an architecture boundary, scope, a public contract, or acceptance criteria. Do not ask questions merely to fill a template.

## Preserve the Requested Outcome

Keep the original brief or user-confirmed requirements traceable, and distinguish them from proposed solutions and acceptance methods. A requirements section inside the Spec can preserve that source, but an unconfirmed model summary is not an independent requirements baseline. Do not create a separate requirements file when the supplied brief already suffices.

Check each material requirement against the proposed scope. For work split across phases, make clear what the current phase delivers, what remains in later phases, and what establishes the overall outcome. Lower priority does not mean excluded; an exclusion or deferral that changes the requested delivery needs the user's agreement. Do not quietly narrow a report-wide task to a convenient subset.

Define success through the intended user or system flow, including the connections between components. Completing component inventories, migrations, or supporting tools does not establish the capability they were meant to enable. When generalization or extensibility is required, include an acceptance example that distinguishes that capability from support for only the original fixed cases.

Keep implementation completion, correctness checks, and final performance or operational acceptance distinct where the task separates them. Preserve the user's chosen order; proposed validation methods do not become mandatory requirements merely because the author writes them down.

## Write the Minimum Sufficient Spec

Include only the sections that constrain implementation or determine completion. Use whichever are useful and omit the rest:

- **Goal:** the intended outcome.
- **Required behavior:** observable behavior and state changes.
- **Inputs and outputs:** important data, validation, and results.
- **Important contracts:** public or cross-component interfaces and caller-visible error semantics.
- **Constraints and edge cases:** limits and boundaries that affect correctness.
- **Non-goals:** nearby work explicitly outside scope.
- **Acceptance criteria:** observable conditions that establish completion.

Do not add enterprise template sections such as stakeholders, personas, risk matrices, rollout strategy, business impact, success metrics, or decision logs unless the task explicitly requires them.

## Keep Contracts Separate from Implementation

Include externally visible behavior, public APIs, cross-component contracts, user-required interfaces, and error semantics that matter to callers.

Leave out private helper names, local variables and types, private function signatures, internal file organization, task decomposition, and algorithm details unless one is itself an explicit public or cross-component contract.

## Control Artifacts

A spec phase does not imply a spec file. Keep a short spec in the current session by default.

Persist it only when work spans sessions, delegation needs a durable contract, the user requests a file, the feature is sufficiently complex, or future maintenance clearly benefits.

When persisting a spec, use an explicit user-provided location first, then a clear existing project convention. If neither exists, use the repository-relative path:

```text
docs/specs/NNN-YYYY-MM-DD-slug.md
```

`NNN` is a repository-wide work-item number shared with persisted plans. If a plan already exists for the same work item, reuse its complete `NNN-YYYY-MM-DD-slug` stem. For a new work item, inspect the numeric prefixes in both `docs/specs/` and `docs/plans/`, take the highest allocated number, and increment it, starting at `001`. A work item with only a spec still reserves its number. Never reuse or renumber an allocated number; after `999`, continue with `1000`.

Use the date on which the work item was first documented and a short lowercase kebab-case slug. Recheck that the candidate number is still available immediately before creating the file so concurrent work does not silently reuse it. Create missing default directories only when the spec is actually being persisted.

## Stop at the Spec

Before delivery, compare the Spec with the supplied requirements as well as checking internal consistency and unsupported implementation decisions. This author check does not require another reviewer or approval gate. On revision, update the effective clauses and affected acceptance criteria together; remove or clearly supersede obsolete instructions rather than relying on appended corrections. Use Git history for old wording unless preserving it serves a concrete need. Then stop.

Do not write an implementation plan, create tasks, implement code, design tests, perform verification, operate Git, dispatch workers, or request review.

Do not introduce a mandatory spec-approval gate. Once the spec is complete, return control to `superpowers-lite:using-lite`.
