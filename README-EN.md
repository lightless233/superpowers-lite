<p align="center">
  <a href="./README.md">简体中文</a> | English
</p>

# Superpowers Lite

A lightweight engineering workflow for coding agents.

Superpowers Lite keeps the useful parts of structured agentic development—brainstorming, specification, planning, debugging, testing, and verification—without forcing every coding task through the same heavyweight process.

The core idea is simple:

> **Use the lightest workflow that preserves confidence.**

Superpowers Lite is designed for day-to-day coding work where strong models should retain engineering judgment instead of being forced through unnecessary ceremony.

## Why?

Structured workflows are useful. They help agents think before changing code, clarify ambiguous requirements, protect behavior with tests, and verify results before declaring success.

But a workflow becomes counterproductive when:

- a typo requires a design phase;
- every feature requires both a spec and a plan;
- every bug requires a full root-cause ceremony;
- every task gets split into tiny mechanical steps;
- sub-agents are used simply because they exist;
- every change requires worktrees, reviews, commits, and approval gates;
- planning costs more than implementation.

Superpowers Lite takes a different approach:

> **The workflow serves the task. The task does not serve the workflow.**

## Mental Model

Superpowers Lite makes two independent decisions:

1. **How much workflow does this task need?**
2. **How should this work be executed?**

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

This is a relationship map, **not a mandatory pipeline**.

Every phase can be skipped when it does not add meaningful confidence.

## Skills

| Skill | Responsibility |
|---|---|
| `using-lite` | Select useful workflow phases and execution mode |
| `lite-brainstorming` | Resolve consequential design uncertainty |
| `lite-writing-specs` | Define required behavior and contracts |
| `lite-writing-plans` | Organize decided implementation work |
| `lite-debugging` | Investigate unclear root causes before choosing a fix |
| `lite-testing` | Choose and run meaningful behavioral tests or checks |
| `lite-verification` | Determine what fresh evidence supports a completion claim |

### `using-lite`

The thin router for the entire workflow.

It classifies work as roughly:

```text
SIMPLE
STANDARD
COMPLEX / AMBIGUOUS
```

and independently chooses an execution mode:

```text
INLINE
DELEGATED
MIXED
```

Complexity determines workflow depth.

Execution mode determines planning detail.

A complex task does not automatically need sub-agents, and a standard task may still benefit from delegation when its boundaries are clean.

### `lite-brainstorming`

Used only when there is something consequential to decide.

It resolves material uncertainty such as:

- architecture choices;
- subsystem boundaries;
- meaningful requirement ambiguity;
- competing approaches with real trade-offs.

It does not force multiple alternatives when an existing project pattern already fits.

It also allows small disposable probes when experimentation is the cheapest reliable way to resolve a design question.

### `lite-writing-specs`

Defines **what the system must do**.

A lightweight spec may describe:

- required behavior;
- externally visible contracts;
- boundaries;
- important edge cases;
- non-goals;
- acceptance criteria.

It does not prescribe private helpers, internal file layout, or implementation details.

A spec phase does not imply a spec file.

### `lite-writing-plans`

Defines **how decided implementation work should be organized**.

Planning detail adapts to execution mode.

For inline execution:

```text
direction
+ boundaries
+ dependencies
+ verification expectations
```

is usually enough.

For delegated work:

```text
one isolated task
→ short self-contained brief

multiple coordinated tasks
→ high-level plan
→ just-in-time detailed task briefs
```

Future delegated tasks are not specified at function-level detail before earlier work has produced real interfaces.

> **Plan globally. Specify delegated tasks just-in-time.**

### `lite-debugging`

Used when a failure's root cause is actually unclear.

It is not automatically invoked for every bug.

The goal is to reduce uncertainty:

```text
characterize
→ reproduce or gather evidence
→ localize divergence
→ test concrete hypotheses when needed
→ establish a sufficiently supported cause
```

If the cause is already clear, debugging is skipped.

> **Do not stack speculative fixes.**

### `lite-testing`

Protects behavior without turning TDD into ritual.

General tendencies:

```text
Reproducible bug
→ strongly prefer regression-test-first

Isolated deterministic logic
→ prefer test-first when useful

Refactor with weak coverage
→ characterization tests

Glue / configuration / integration wiring
→ use meaningful integration or runtime checks
```

A task may need testing without needing the `lite-testing` Skill.

Tests should fail when meaningful behavior breaks—not merely when internal implementation changes.

### `lite-verification`

Prevents unsupported completion claims.

Its central rule is:

> **The breadth of the claim must not exceed the breadth of the evidence.**

Examples:

```text
one focused regression test passed
≠
all project tests pass
```

Structural claims may be supported by structural evidence such as inspection or search.

Behavioral claims require behavioral evidence such as tests, builds, runtime checks, or reproduction.

Verification should be sufficient for the claim, not maximal by default.

## Workflow Examples

### Tiny Change

```text
"Change the default timeout from 10 to 20."

SIMPLE
→ edit
→ obvious configuration check
→ verification
```

No brainstorm. No spec. No plan.

### Clear Multi-Step Feature

```text
"Add consistent JSON output to several existing CLI commands."

STANDARD
→ lightweight spec and/or plan when useful
→ implementation
→ meaningful tests
→ verification
```

### Ambiguous Architecture

```text
"Add a permission system, but we have not decided between RBAC and ABAC."

COMPLEX / AMBIGUOUS
→ brainstorming
→ spec
→ plan when useful
→ implementation
→ testing
→ verification
```

### Obvious Bug

```text
"Empty input hits an obvious nil dereference."

SIMPLE
→ direct fix
→ focused regression protection
→ verification
```

No debugging ceremony.

### Unclear Bug

```text
"Route updates are occasionally duplicated and the source is unknown."

→ lite-debugging
→ establish the cause
→ implementation
→ regression protection
→ verification
```

### Complex but Coupled

```text
"Refactor a tightly coupled state machine requiring continuous architecture judgment."

COMPLEX
+
INLINE
```

Complexity alone does not imply delegation.

### Standard but Delegatable

```text
"Implement five independent decoders behind an already stable interface."

STANDARD
+
DELEGATED
```

Clear boundaries can make delegation valuable even when the overall task is not architecturally complex.

## Inline vs Delegated Planning

Superpowers Lite intentionally gives inline and delegated execution different planning detail.

### Inline

The implementing model already holds the surrounding context.

Prefer:

```text
what changes
why
important boundaries
dependencies
verification expectations
```

Leave local engineering decisions to the implementing model.

### Delegated

A worker may not have the parent model's context.

A delegated brief should therefore carry enough:

```text
goal
relevant context
contracts
constraints
acceptance criteria
verification
```

to be understood independently.

For multiple coordinated tasks, detailed briefs are created just-in-time from the repository's actual current state and prior results.

## What Superpowers Lite Does Not Require

Superpowers Lite does not inherently require:

- Git worktrees;
- feature branches;
- commits after every task;
- pull requests;
- mandatory code reviewers;
- mandatory sub-agents;
- one fresh worker per task;
- strict test-first development;
- one-question-per-turn brainstorming;
- mandatory design/spec approval gates;
- persistent spec or plan files;
- fixed micro-step implementation plans.

These tools and practices may still be useful.

They are simply not part of the workflow unless they add clear value to the current task.

## Installation

Superpowers Lite is distributed as a skills-only plugin for both Codex and Claude Code. The platforms share the same `SKILL.md` files while using their own plugin manifests.

### Codex

Add the repository as a plugin marketplace:

```bash
codex plugin marketplace add lightless233/superpowers-lite --ref master
```

Then install the plugin:

```bash
codex plugin add superpowers-lite@lightless233-plugins
```

Start a new Codex session after installation so the installed Skills are available to the new context.

### Claude Code

Add the marketplace from Claude Code:

```text
/plugin marketplace add lightless233/superpowers-lite
```

Then install the plugin:

```text
/plugin install superpowers-lite@lightless233-plugins
```

Start a new Claude Code session after installation, or run `/reload-plugins` to reload the plugin.

In normal use, you should not need to invoke every Skill manually. `superpowers-lite:using-lite` acts as the router and selects only the phases that add value.

You can still invoke an individual Skill explicitly through its plugin namespace. Codex uses the `$` prefix:

```text
$superpowers-lite:using-lite
$superpowers-lite:lite-debugging
```

Claude Code uses the `/` prefix:

```text
/superpowers-lite:using-lite
/superpowers-lite:lite-debugging
```

## Repository Structure

```text
.
├── .agents/
│   └── plugins/
│       └── marketplace.json          # Codex marketplace
├── .claude-plugin/
│   └── marketplace.json              # Claude Code marketplace
├── plugins/
│   └── superpowers-lite/
│       ├── .codex-plugin/
│       │   └── plugin.json           # Codex manifest
│       ├── .claude-plugin/
│       │   └── plugin.json           # Claude Code manifest
│       └── skills/
│           ├── using-lite/
│           ├── lite-brainstorming/
│           ├── lite-writing-specs/
│           ├── lite-writing-plans/
│           ├── lite-debugging/
│           ├── lite-testing/
│           └── lite-verification/
├── README.md
├── README-EN.md
└── LICENSE
```

Each Skill's `SKILL.md` is shared by Codex and Claude Code. The `agents/openai.yaml` files provide Codex-specific interface metadata and are ignored by Claude Code.

## Design Principles

Superpowers Lite follows a few deliberately simple rules:

> **Use the lightest process that preserves confidence.**

> **Skip ceremony, not reasoning.**

> **Documentation should capture decisions, not manufacture them.**

> **Brainstorm only when there is something consequential to decide.**

> **Planning granularity should match both task complexity and execution context.**

> **Inline execution needs direction; delegated execution needs contracts.**

> **Plan globally. Specify delegated tasks just-in-time.**

> **Tests should protect behavior, not satisfy ritual.**

> **Understand before changing when the cause is unclear.**

> **Never claim completion beyond the available evidence.**

## Relationship to Superpowers

Superpowers Lite is inspired by the engineering discipline of Superpowers, but deliberately makes different trade-offs.

The goal is not to reproduce the full Superpowers workflow with fewer files.

The goal is to preserve high-value engineering reasoning while allowing strong coding agents to retain local judgment and skip workflow phases that provide little value for the current task.

In short:

```text
Superpowers:
process consistency first

Superpowers Lite:
minimum sufficient process first
```

## Status

Superpowers Lite is intentionally small.

Before adding another Skill or mandatory workflow step, ask:

> **Does this clearly improve coding quality enough to justify its coordination and context cost?**

If not, it probably does not belong here.

## License

MIT
