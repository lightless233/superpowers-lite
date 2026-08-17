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

Choose acceptance scope once from the task's risk and externally observable contracts. Prefer the real CLI, API, or UI entry when one is affected; focused integration checks are enough for internal-only work when they prove the contract. Do not manufacture end-to-end coverage or enumerate every possible check merely to make the plan look complete.

## Preserve Phase Boundaries

A plan may state how a task can be verified and what behavior needs coverage. Leave testing methodology and detailed test design to `superpowers-lite:lite-testing`, and completion evidence to `superpowers-lite:lite-verification`.

## Control Artifacts

A planning phase does not imply a plan file. Keep a short inline plan in the session, and pass a single delegated brief directly as worker context when practical.

Persist a plan or brief only when work spans sessions, multiple workers need stable shared context, compaction risk is meaningful, the user requests it, feature complexity justifies it, or future maintenance clearly benefits.

## Stop at the Plan

After writing the useful plan or brief, stop and return control to `superpowers-lite:using-lite`. Do not implement, dispatch workers, create sub-agents or reviewers, create worktrees or todos, operate Git, or start an execution loop.

Do not introduce a mandatory plan-approval gate. If a material choice remains, return it to the appropriate earlier phase instead.
