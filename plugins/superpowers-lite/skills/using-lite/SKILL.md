---
name: using-lite
description: Use for coding or engineering work—feature implementation, bug fixes, refactors, architecture changes, and repository modifications—to select the lightest workflow that preserves confidence. Do not use for ordinary technical explanations or conceptual questions.
---

# Using Lite

Act as a thin task classifier and workflow router. Use the least process that still supports a reliable result.

Know when a skill is useful and what responsibility it owns; leave how it performs that work to the skill.

## Workflow Map

```text
                         Coding Request
                               │
                               ▼
                           using-lite
                               │
               ┌───────────────┴───────────────┐
               │                               │
        Workflow Depth                  Execution Mode
               │                               │
     SIMPLE / STANDARD / COMPLEX    INLINE / DELEGATED / MIXED
               │                               │
               └───────────────┬───────────────┘
                               │
                    select only useful phases
                               │
      ┌────────────────┬────────────────┬────────────────┬────────────────┐
      │                │                │                │
    design        behavior/contracts   failure cause    implementation
 uncertainty?          unclear?          unclear?       needs organizing?
      │                │                │                │
      ▼                ▼                ▼                ▼
lite-brainstorming lite-writing-specs lite-debugging lite-writing-plans
      │                │                │                │
      └────────────────┴────────────────┴────────────────┘
                               │
                               ▼
                         implementation
                               │
                               ▼
                          lite-testing
                     meaningful tests/checks
                               │
                               ▼
                       lite-verification
                               │
                               ▼
                    supported completion claim
```

This is a relationship map, not a mandatory pipeline. `superpowers-lite:using-lite` skips phases that do not add value.

| Skill | Responsibility |
|---|---|
| `superpowers-lite:using-lite` | Choose useful workflow phases and execution mode |
| `superpowers-lite:lite-brainstorming` | Resolve consequential design uncertainty |
| `superpowers-lite:lite-writing-specs` | Define required behavior and contracts |
| `superpowers-lite:lite-writing-plans` | Organize decided implementation work |
| `superpowers-lite:lite-debugging` | Investigate unclear root causes before choosing a fix |
| `superpowers-lite:lite-testing` | Choose and run meaningful behavioral tests or checks |
| `superpowers-lite:lite-verification` | Determine what fresh evidence supports the completion claim |

## Route the Request

1. Decide whether the request is coding or engineering work. If it is only an explanation or conceptual question, answer directly and stop routing.
2. Gather only enough project context to make a correct workflow classification. Do not perform unnecessary exploration for simple tasks.
3. Classify by uncertainty and design complexity, not by the number of files changed.
4. Select only the phases that add confidence.

| Class | Signals | Default workflow |
|---|---|---|
| SIMPLE | Clear, local, one obvious implementation, no material design choice | inspect as needed → implement → meaningful check → `superpowers-lite:lite-verification` |
| STANDARD | Requirements are mostly clear, but behavior needs definition and/or implementation needs organization | optional `superpowers-lite:lite-writing-specs` and/or `superpowers-lite:lite-writing-plans` → implement → `superpowers-lite:lite-testing` when valuable → `superpowers-lite:lite-verification` |
| COMPLEX / AMBIGUOUS | Material requirements are unclear, several consequential designs are plausible, or a new subsystem/state model must be shaped | useful `superpowers-lite:lite-brainstorming`, `superpowers-lite:lite-writing-specs`, and/or `superpowers-lite:lite-writing-plans` → implement → `superpowers-lite:lite-testing` → `superpowers-lite:lite-verification` |

These defaults are starting points, not required pipelines. Even COMPLEX work should skip brainstorming or specification when those decisions or contracts are already settled.

A change touching multiple files may still be SIMPLE when it follows a clear existing pattern and introduces no material design decision. Never use a file-count threshold as a complexity rule.

## Select STANDARD Phases

- Use `superpowers-lite:lite-writing-specs` when required behavior, boundaries, or contracts need to be made explicit.
- Use `superpowers-lite:lite-writing-plans` when requirements are clear and organizing the implementation adds value.
- Use both only when both provide clear value. If neither does, downgrade to SIMPLE.

Do not create both a spec and a plan merely to satisfy the workflow.

## Route Bugs and Failures

For bugs, failures, flaky tests, performance regressions, or unexpected behavior, decide whether the cause and fix direction are already sufficiently clear.

- If existing evidence supports the diagnosis and fix direction, fix directly; use `superpowers-lite:lite-testing` when valuable and `superpowers-lite:lite-verification` before claiming completion.
- If the root cause is unclear, several causes remain plausible, the issue is intermittent or multi-component, or speculative fixes have failed, use `superpowers-lite:lite-debugging`.

Treat the cause as clear only when evidence supports it; a plausible guess is not enough. Diagnostic uncertainty selects debugging, not a complexity class. If expected behavior itself is undefined, use `superpowers-lite:lite-writing-specs`; if the unresolved question is a consequential design direction, use `superpowers-lite:lite-brainstorming`.

## Adjust to Reality

Reclassify after inspection or during implementation:

- Escalate when a local change reveals new contracts, broad state changes, or material design choices.
- Downgrade when the repository already contains a clear, established pattern.
- Do not ask the user to approve the classification or each phase.
- Ask only when an unresolved choice would materially change behavior, architecture, scope, or safety.

## Choose Execution Mode

`superpowers-lite:using-lite` answers two independent questions: how much workflow the task needs and how the work should be executed.

Task complexity determines workflow depth. Execution mode determines planning detail. Complexity does not imply delegation: do not delegate merely because a task is complex, and do not rule out delegation merely because it is SIMPLE or STANDARD.

Select INLINE, DELEGATED, or MIXED execution for the task or individual work units. Honor an explicit user preference for inline or delegated work.

Prefer INLINE when work is tightly coupled, continuous shared reasoning matters, boundaries are unstable, or context transfer and coordination cost approaches the benefit of delegation. If delegation provides only marginal benefit, stay inline.

Prefer DELEGATED execution when boundaries and contracts are clear, a unit can be understood independently, and context isolation, parent-context preservation, independent investigation, or parallelism provides real value. Delegation does not imply parallel execution.

Use MIXED execution when different work units benefit from different modes. Execution mode may change as actual boundaries become clearer; adjust it without creating an orchestration workflow.

`superpowers-lite:using-lite` chooses the execution mode. Given that choice, `superpowers-lite:lite-writing-plans` decides how much planning detail is useful; it does not decide whether sub-agents should be used.

| Complexity | Inline execution | Delegated execution |
|---|---|---|
| SIMPLE | Usually no plan | Short, self-contained task brief |
| STANDARD | Brief plan when organization adds value | One short brief, or a high-level plan plus just-in-time briefs for multiple coordinated tasks |
| COMPLEX | Brief or medium implementation plan | High-level plan plus just-in-time detailed briefs for multiple coordinated tasks |

For MIXED execution, apply the appropriate column to each work unit.

## Skip Unneeded Phases

Use `superpowers-lite:lite-brainstorming` only when consequential design uncertainty remains. Skip a spec for a trivial change and a plan when implementation is one obvious unit. Use meaningful testing where it protects behavior; a simple task may perform an obvious check without invoking `superpowers-lite:lite-testing`. Use `superpowers-lite:lite-verification` before making a completion claim.

## Keep the Workflow Lightweight

Artifacts are a tool, not a requirement. A phase does not imply a file.

- SIMPLE: create no workflow artifacts.
- STANDARD: keep short work in the session by default.
- COMPLEX: persist only when durable context clearly helps.

Do not force worktrees, branches, commits, pull requests, reviewers, sub-agents, or orchestration. Use them only when they provide clear value for the current task and environment. The workflow serves the task.
