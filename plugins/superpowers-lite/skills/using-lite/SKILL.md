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
                 planned acceptance evidence
                               │
                               ▼
               optional one-pass review gate
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

## Converge Optional Code Review

Code review is optional. When it adds value, use it as a bounded task-convergence gate, not an open-ended search-and-repair loop. The default automatic budget for one reviewed task is one pre-review acceptance correction wave, one broad review, one post-review batched fix wave, and one scoped re-review. If continuing would exceed any limit, trigger the breaker; never add another automatic attempt merely because it might help.

The bounded path is: implementation → frozen planned acceptance → at most one pre-review correction → one broad review → one batched fix wave → refresh invalidated acceptance evidence → one scoped re-review → complete or breaker.

### Gather Acceptance Evidence First

Before the first planned acceptance run, the Controller freezes a reasonable scope selected from the task's acceptance criteria and risk. Exercise the real CLI, API, or UI entry when the task changes externally observable behavior; focused integration checks may be sufficient for library or internal-only work. Do not invent an end-to-end test for ceremony.

Planned acceptance gathers evidence; it is not an open-ended repair loop. If it exposes implementation failures, collect the currently known failures and allow one batched pre-review correction wave. Then rerun only the failed checks and checks directly invalidated by that correction. If the planned acceptance criteria still do not pass, stop, report the remaining blockers, and ask the user whether to continue. Do not start another automatic correction or the broad review.

Do not grow acceptance scope through an acceptance → fix → invent-more-acceptance loop. After the first run, add a check only when the original criterion cannot actually prove the claimed behavior, existing evidence is shown invalid, or the correction directly changes explicitly required behavior that was not covered.

Give the reviewer the task requirements and acceptance criteria, implementation diff, implementer or worker report, focused test evidence, planned acceptance results, and known failures or concerns. Do not start the formal gate while planned task-acceptance evidence is missing.

### Review the Task Broadly Once

The first and only broad review covers the whole task rather than isolated changed files: requirements, acceptance criteria, the implementation diff, cross-file and cross-layer invariants, important failure paths, equivalent entry paths, integration boundaries, acceptance evidence, and regression risk. Stay within task scope; this is not a repository-wide architecture audit.

Report all reasonably discoverable substantive findings together. When one path violates an invariant, inspect the other task-relevant paths that share it now. A reviewer must not intentionally save discoverable blockers for later rounds.

Classify every finding:

- **BLOCKING:** it violates an explicit requirement or acceptance criterion; causes a correctness failure in a currently supported use; risks realistic data loss, corruption, or unrecoverable state; breaks compatibility promised by the task; directly introduces a security issue; breaks the task's main product flow; or invalidates the task's verification conclusion.
- **DEFERRED:** it is pre-existing, out of scope, speculative, future hardening, an architecture or optional refactor improvement, a style preference, relevant only to an unsupported model or future feature, or otherwise unrelated to the task.

Only BLOCKING findings enter repair. A real issue is not automatically a blocker for this task.

If the broad review has no BLOCKING findings, the gate is clean; complete the task without an empty fix wave or re-review.

### Fix Once, Then Re-review Once

Send the complete blocking batch to the same implementer or delegated worker in one fix wave. Fix the shared invariants rather than only the cited lines, check directly affected adjacent paths, and return one result with focused regression evidence for the whole batch without expanding into unrelated work or future tasks. Do not repair and review findings one at a time.

Before scoped re-review, identify acceptance evidence invalidated by the fix wave and refresh only the checks that cover changed behavior. Prefer the affected black-box, integration, or acceptance checks; rerun the complete acceptance set only when the fix's reach invalidates it all. Give the refreshed results to the scoped reviewer. Do not postpone this post-fix evidence refresh until after a clean re-review.

The single scoped re-review receives the focused fix evidence and any refreshed acceptance results, then:

1. marks each original blocker `ADDRESSED` or `NOT ADDRESSED`; and
2. checks only the fix diff, directly affected execution paths, and necessary adjacent paths sharing the original invariant for regressions introduced by the fix.

It is not a second broad review, repository scan, hardening pass, or reason to repeat all verification. Read applicable fix evidence and run only the minimum scoped check needed.

### Break the Loop

After scoped re-review, stop automatic repair:

- If clean, complete the task without inventing new verification scope. A clean scoped re-review should normally be the final automatic gate.
- If an original blocker remains, a fix introduced a blocking regression, or blocking status is disputed, report the unresolved finding, what the worker tried, the cause or impact, which fix introduced a regression when applicable, and whether further repair is recommended. Ask the user whether to continue; do not dispatch a second fix wave automatically.
- Record unrelated, pre-existing, or hardening observations as DEFERRED without reopening the task.

A task-scoped issue is a `REVIEWER MISS` when it already existed during broad review, was within that review's scope, was reasonably discoverable then, and is first raised during scoped re-review. A reviewer miss never starts another automatic repair wave. If it satisfies the existing BLOCKING admission rules, trigger the breaker and report the late blocker, why the broad review should have found it, and its impact; the user decides whether to authorize more repair. Otherwise classify it as DEFERRED without reopening the task.

After a clean gate, newly imagined tests or extra coverage are DEFERRED. Reopen only when an explicit acceptance criterion was not actually checked, existing evidence is shown invalid, or a critical correctness or data-corruption problem appears.

Trigger the same breaker early when elapsed time is clearly disproportionate, worker/reviewer traffic is abnormal, or the same invariant repeatedly fails to converge.

## Keep the Workflow Lightweight

Artifacts are a tool, not a requirement. A phase does not imply a file.

- SIMPLE: create no workflow artifacts.
- STANDARD: keep short work in the session by default.
- COMPLEX: persist only when durable context clearly helps.

Do not force worktrees, branches, commits, pull requests, reviewers, sub-agents, or orchestration. Use them only when they provide clear value for the current task and environment. The workflow serves the task.
