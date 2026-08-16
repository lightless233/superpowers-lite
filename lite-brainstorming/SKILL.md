---
name: lite-brainstorming
description: Use when coding work has material requirement ambiguity, consequential architecture choices, unclear subsystem boundaries, or competing approaches that should be resolved before specification or implementation.
---

# Resolving Consequential Design Questions

Brainstorm only when there is something consequential to decide.

## Confirm Brainstorming Adds Value

Use this skill for unresolved choices that materially affect behavior, architecture, scope, public contracts, compatibility, cost, risk, or likely rework.

Do not brainstorm work whose meaningful decisions are already settled. Task size and file count are not triggers: a large feature with decided behavior and architecture should proceed to planning or implementation, while a small request with a consequential choice may benefit from brainstorming.

If an established project pattern clearly satisfies the requirement, follow it and return control to `using-lite`. Do not manufacture alternatives merely because this skill was invoked.

## Gather Focused Context

Gather only the context needed to resolve the material design questions. Inspect relevant project structure, nearby implementations, established patterns, constraints, and user-stated goals in proportion to the decision.

Prefer an existing pattern when it fits. If that pattern directly blocks the current requirement, consider the smallest targeted improvement that enables the work; do not turn it into an unrelated redesign.

Prefer stated requirements, repository evidence, established patterns, documentation or known contracts, and technical reasoning before experimenting. When a material design question still cannot be resolved reliably, a small disposable experiment is acceptable if it is the cheapest reliable way to obtain the missing fact.

Keep the experiment narrowly scoped to one question, cheap to create and discard, and free of production polish or broader feature scaffolding. Stop once the question is answered. Treat the result as design evidence, not as production code, regression protection, or completion evidence; remove or leave the probe uncommitted when practical rather than preserving it by default.

## Clarify Material Unknowns

Resolve questions from the repository, stated requirements, and established patterns when possible. Do not block on private helper names, local file layout, variables, or other implementation details.

Ask the user only when an unresolved answer would materially change behavior, architecture, scope, a public contract, acceptance criteria, compatibility, or meaningful cost or risk. A small batch of related questions is appropriate when it avoids repeated turns; do not enforce one question per message or send a generic questionnaire.

Use technical judgment when the constraints support a clear recommendation. Ask the user for choices that genuinely depend on product preference, business priority, an irreversible trade-off, or materially different cost or risk tolerance.

## Compare Only Real Approaches

Compare alternatives only when more than one approach is genuinely plausible. Use only the trade-offs relevant to this decision, such as complexity, maintainability, compatibility, operational cost, performance or latency, coupling, migration cost, failure modes, and future flexibility.

Recommend an approach when the available context supports one, with a brief explanation tied to current constraints. Do not force two or three options, and do not hand a technical decision back to the user merely because several approaches exist.

## Bound the Design

Design for the current requirement, not hypothetical future needs. Do not add generic frameworks, extension points, services, or abstractions for possibilities the current work does not require.

If the request contains multiple independent subsystems, identify the smallest coherent scope required now and separate deferrable work. Do not create a roadmap, epic, or milestone process.

## Produce a Short Direction

Record only the decisions needed to unblock specification or implementation. As useful, include:

- Goal
- Constraints
- Recommended approach
- Key decisions
- Open questions

Omit sections that add no value. Do not turn the result into a full behavior specification or an implementation task breakdown.

`lite-brainstorming` chooses the design direction. `lite-writing-specs` defines required behavior and contracts. `lite-writing-plans` organizes implementation work.

## Control Artifacts and Stop

A brainstorming phase does not imply a design document. Keep short results in the current session unless the user requests an artifact, work spans sessions, delegated work needs durable context, or complexity and future maintenance clearly justify persistence. Do not commit an artifact automatically.

Stop when the goal and material constraints are clear, consequential design choices are resolved, scope is sufficiently bounded, and no unresolved question blocks later work. Do not introduce a mandatory approval gate.

Return control to `using-lite`, which decides whether specification, planning, or direct implementation comes next.

Do not begin production implementation or scaffold the feature during brainstorming, and do not let a disposable probe grow into implementation. If a probe appears suitable for production, first finish the design decision and return control to `using-lite`.

Do not write a full spec, decompose tasks, design production tests, perform completion verification, manage Git or worktrees, request review, or orchestrate workers.
