---
name: lite-writing-plans
description: Use when a coding task with sufficiently clear requirements benefits from organizing multiple implementation units, dependencies, integration order, or delegated work before implementation.
---

# Writing Lightweight Plans

Organize decided implementation work. Do not invent missing requirements, choose architecture, or implement the plan.

## Confirm a Plan Adds Value

Do not create a plan when implementation is already one obvious unit of work. If planning will not materially reduce coordination cost or omission risk, stop and return control to `superpowers-lite:using-lite`.

Before planning, confirm that required behavior, important boundaries, public and cross-component contracts, and consequential architecture choices are sufficiently clear.

- Return unresolved behavior or contract questions to `superpowers-lite:lite-writing-specs`.
- Return unresolved architecture choices to `superpowers-lite:lite-brainstorming`.

Planning organizes decided work; it does not settle these questions itself.

## Match Detail to Execution

Task complexity determines workflow depth. Execution context determines planning detail.

| Complexity | Inline execution | Delegated execution |
|---|---|---|
| SIMPLE | Usually no plan | Short, self-contained brief |
| STANDARD | Brief plan when organization adds value | One short brief, or a high-level plan plus just-in-time briefs for coordinated tasks |
| COMPLEX | Brief or medium plan | High-level plan plus just-in-time detailed briefs |

Planning does not decide whether delegation must be used. It adapts to the execution mode chosen for the task and environment.

## Plan Inline Work Briefly

Describe meaningful engineering units that can each be understood, implemented, and verified. Include only what helps execution:

- implementation direction and each unit's goal
- dependencies and integration order
- important boundaries and existing contracts
- relevant integration points
- verification expectations, including the planned acceptance entry and scope when behavior is externally observable

Leave local engineering decisions to the implementing model. Usually omit private helper names and signatures, local types and variables, exact internal file decomposition, test function names, shell commands, code snippets, and step-by-step implementation instructions. Include such a detail only when it is an established public or cross-component contract or a required architecture constraint.

Do not decompose work into test/implement/run/commit micro-steps or size steps by minutes. A task is an independently understandable, implementable, and verifiable engineering unit, not a mechanical action.

## Plan Delegated Work in Layers

For one isolated delegated task, write one short self-contained brief. Do not create a high-level plan solely because a worker is involved.

For multiple coordinated tasks, use two layers:

1. Write a high-level plan covering task goals, dependencies, architecture boundaries, important shared contracts, integration order, and overall verification expectations.
2. Write only the next task's detailed brief. Create later briefs just-in-time from the repository's actual state and prior results.

Plan globally. Specify delegated tasks just-in-time. Do not define every future task at function-level detail before implementation begins.

Build each current brief from the current repository state, the decided requirements and contracts, any available spec or high-level plan, and prior actual implementation results. Include whichever fields are needed:

- goal and relevant context
- relevant files and dependencies
- existing contracts and required cross-task contracts
- constraints, scope boundaries, and caller-visible error semantics
- acceptance criteria and planned verification

Make the brief self-contained enough for a worker with no prior task context, even if the environment reuses an existing worker. Specify constraints and contracts, not every keystroke; leave private decomposition, local abstractions, algorithms, commands, and test names open unless they are contractually required.

Pass a short brief directly in worker context by default. If `superpowers-lite:using-lite` has activated a durable execution workspace because direct handoff is not reliable enough, place only the current just-in-time brief there and follow [delegated-execution-workspace.md](../using-lite/references/delegated-execution-workspace.md). Do not create every future brief in advance.

Choose acceptance scope once from the task's risk and externally observable contracts. Prefer the real CLI, API, or UI entry when one is affected; focused integration checks are enough for internal-only work when they prove the contract. Do not manufacture end-to-end coverage or enumerate every possible check merely to make the plan look complete.

## Preserve Phase Boundaries

A plan may state how a task can be verified and what behavior needs coverage. Leave testing methodology and detailed test design to `superpowers-lite:lite-testing`, and completion evidence to `superpowers-lite:lite-verification`.

## Control Artifacts

A planning phase does not imply a plan file. Keep a short inline plan in the session, and pass a single delegated brief directly as worker context when practical.

Persist an implementation plan only when work spans sessions, multiple workers need stable shared context, compaction risk is meaningful, the user requests it, feature complexity justifies it, or future maintenance clearly benefits.

A delegated brief does not become a durable project document merely because file-based handoff is useful. Keep it in direct worker context by default; when a durable execution workspace is already active, store the brief there as short-lived execution state rather than under `docs/plans/`. File-based handoff does not by itself justify persisting a plan or activating a workspace.

When persisting a plan, use an explicit user-provided location first, then a clear existing project convention. If neither exists, use the repository-relative path:

```text
docs/plans/NNN-YYYY-MM-DD-slug.md
```

`NNN` is a repository-wide work-item number shared with persisted specs. If a spec already exists for the same work item, reuse its complete `NNN-YYYY-MM-DD-slug` stem. For a new work item, inspect the numeric prefixes in both `docs/specs/` and `docs/plans/`, take the highest allocated number, and increment it, starting at `001`. A work item with only a plan still reserves its number. Never reuse or renumber an allocated number; after `999`, continue with `1000`.

Use the date on which the work item was first documented and a short lowercase kebab-case slug. Recheck that the candidate number is still available immediately before creating the file so concurrent work does not silently reuse it. Create missing default directories only when the plan is actually being persisted.

## Stop at the Plan

After writing the useful plan or brief, stop and return control to `superpowers-lite:using-lite`. Do not implement, dispatch workers, create sub-agents or reviewers, create worktrees or todos, operate Git, or start an execution loop.

Do not introduce a mandatory plan-approval gate. If a material choice remains, return it to the appropriate earlier phase instead.
