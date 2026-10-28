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
                 planned acceptance evidence
                               │
                               ▼
               optional one-pass review gate
                               │
                               ▼
                    supported completion claim
```

This is a relationship map, **not a mandatory pipeline**.

Every phase can be skipped when it does not add meaningful confidence.

## Bounded Review Convergence

Code review remains optional. When used, it should converge the current task rather than create an unbounded repair loop:

```text
IMPLEMENT
   ↓
RUN PLANNED ACCEPTANCE / BLACK-BOX / E2E
   ↓
IF NEEDED: ONE PRE-REVIEW CORRECTION / BREAKER
   ↓
ONE BROAD TASK REVIEW
   ↓
BATCH ALL BLOCKING FINDINGS
   ↓
ONE FIX WAVE
   ↓
REFRESH INVALIDATED ACCEPTANCE EVIDENCE
   ↓
ONE SCOPED RE-REVIEW
   ↓
CLEAN → COMPLETE
STILL BLOCKED → BREAKER / USER
```

Freeze acceptance scope from the acceptance criteria and risk before its first run. Prefer the real CLI, API, or UI entry for external behavior; focused integration evidence may be enough for internal work, and no end-to-end test is created for ceremony. Failure permits one batched correction and reruns only failed or invalidated evidence; another failure triggers the breaker.

The broad review covers the whole task once and batches the blockers that are reasonably discoverable now. Only requirement violations, correctness failures in supported use, data-safety risks, promised compatibility breaks, task-introduced security issues, broken main flows, or invalid verification block the task. Pre-existing issues, speculative risks, hardening, optional refactors, and out-of-scope observations are deferred.

The default automatic budget is one pre-review correction, one broad review, one post-review batched fix wave, and one scoped re-review. If a fix invalidates acceptance evidence, only affected checks are refreshed before re-review. A late reviewer miss triggers the breaker when it meets blocking admission and is otherwise deferred; it never starts a second automatic fix. A clean scoped re-review is normally the final automatic gate.

> **Review should converge a task, not create an unbounded repair loop.**

## Installation

Superpowers Lite is a skills-only package for Codex, Claude Code, CodeBuddy Code, WorkBuddy, Kimi Code, Pi, OpenCode, and Qoder. All hosts share the same `SKILL.md` files, loaded through the appropriate plugin, package, or native Skills mechanism.

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

### CodeBuddy Code

Add the marketplace and install from CodeBuddy Code:

```text
/plugin marketplace add lightless233/superpowers-lite
/plugin install superpowers-lite@lightless233-plugins
/reload-plugins
```

For local development, run `/plugin marketplace add .` from the repository root, then install the same plugin name. The marketplace is `.codebuddy-plugin/marketplace.json`; the plugin manifest is `plugins/superpowers-lite/.codebuddy-plugin/plugin.json`. See the [CodeBuddy marketplace documentation](https://www.codebuddy.cn/docs/cli/plugin-marketplaces).

### WorkBuddy

Open WorkBuddy's plugin marketplace, choose add marketplace (`+`), and enter:

```text
https://github.com/lightless233/superpowers-lite
```

Find `superpowers-lite` in the added `lightless233-plugins` marketplace, install it, and enable it. The repository provides `.workbuddy-plugin/marketplace.json` and `plugins/superpowers-lite/.workbuddy-plugin/plugin.json`, sharing the same Skills as the CodeBuddy entry. See the [WorkBuddy plugin documentation](https://www.workbuddy.cn/docs/workbuddy/Plugins).

In a new task, explicitly select `using-lite` through WorkBuddy's skill mechanism, or choose `lite-elephant` / `lite-goldfish` and describe the task naturally with the necessary input paths for manual handoff.

### Kimi Code

Install directly from GitHub in Kimi Code:

```text
/plugins install https://github.com/lightless233/superpowers-lite/tree/master
```

Run `/reload` or `/new` after installation. `using-lite` loads at session start, and the other Skills load on demand.

### Pi

Install directly from GitHub with Pi:

```bash
pi install https://github.com/lightless233/superpowers-lite
```

You can also pin the package to a specific ref:

```bash
pi install git:github.com/lightless233/superpowers-lite@master
```

Start a new Pi session after installation, or run `/reload` in interactive mode to discover the Skills.

### OpenCode

OpenCode loads this package through native Agent Skills. After cloning, run the following from the repository root on Linux, macOS, or WSL:

```bash
mkdir -p "$HOME/.config/opencode/skills"
for skill in "$PWD"/plugins/superpowers-lite/skills/*; do
  ln -s "$skill" "$HOME/.config/opencode/skills/"
done
```

This links each complete Skill directory. You can also copy those directories to the same location; preserve their relative layout and `references/` so the shared handoff contracts remain accessible. Start a new OpenCode session afterward. See the native discovery locations in the [OpenCode Agent Skills documentation](https://opencode.ai/docs/skills/).

Native OpenCode names are `using-lite`, `lite-elephant`, `lite-goldfish`, and so on. Explicitly request the matching name through the `skill` tool, then describe the task naturally and provide the input paths. Package references written as `superpowers-lite:<skill-name>` resolve to `<skill-name>` in this native installation.

### Qoder

After cloning the repository, open the plugins page in Qoder IDE, choose **Create Plugin → Import from local folder**, and import:

```text
plugins/superpowers-lite
```

For Qoder CLI or Agent SDK development, pass the same directory as a local plugin. The corresponding CLI option is:

```bash
qodercli --plugin-dir ./plugins/superpowers-lite
```

In normal use, you should not need to invoke every Skill manually. `superpowers-lite:using-lite` acts as the router and selects only the phases that add value.

You can still invoke an individual Skill explicitly through its plugin namespace. Codex uses the `$` prefix:

```text
$superpowers-lite:using-lite
$superpowers-lite:lite-debugging
```

Claude Code and CodeBuddy Code use the `/` prefix:

```text
/superpowers-lite:using-lite
/superpowers-lite:lite-debugging
```

Kimi Code uses plugin-qualified Skill names:

```text
/skill:superpowers-lite:using-lite
/skill:superpowers-lite:lite-debugging
```

Pi uses its Skill command:

```text
/skill:using-lite
/skill:lite-debugging
```

Qoder plugin Skills use plugin-qualified names:

```text
/superpowers-lite:using-lite
/superpowers-lite:lite-debugging
```

## Skills

| Skill | Responsibility |
|---|---|
| `using-lite` | Select useful workflow phases and execution mode |
| `lite-elephant` | Author Specs and review Plans or code in a manual role workflow |
| `lite-goldfish` | Independently review Specs, plan, implement, and fix in a manual role workflow |
| `lite-brainstorming` | Resolve consequential design uncertainty |
| `lite-writing-specs` | Define required behavior and contracts |
| `lite-writing-plans` | Organize decided implementation work |
| `lite-debugging` | Investigate unclear root causes before choosing a fix |
| `lite-testing` | Choose and run meaningful behavioral tests or checks |
| `lite-verification` | Determine what fresh evidence supports a completion claim |
| `lite-maintaining-agents-md` | Audit or maintain durable instructions in the project-root AGENTS.md |

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

Execution mode adapts to the capabilities exposed by the current host. When sub-agents or parallel execution are unavailable, Lite preserves the same workflow depth and falls back to INLINE execution; missing optional delegation never blocks the task or removes necessary testing or verification.

When the host exposes specialized exploration roles, Lite can use a fast role for bounded file discovery, call-path tracing, and test discovery, then select deeper exploration for unclear boundaries, cross-component work, or high-consequence investigations. With only a generic sub-agent, Lite delegates only work that can be understood from a self-contained brief; otherwise the current agent performs it INLINE.

### Manual Elephant / Goldfish Handoffs (Optional)

For independent cross-model work, explicitly select `lite-elephant` or `lite-goldfish` through the harness, then describe the task naturally and provide the necessary input paths. These are logical roles, not model assignments. The user starts independent sessions, performs handoffs, and chooses the next task. The stage names below are internal identifiers and optional precise `Stage:` values; users do not need to memorize them. Each instruction runs one stage.

| Entry | Supported stages |
|---|---|
| `lite-elephant` | `spec`: write or revise a Spec; `plan-review`: review a Plan; `code-review`: review code |
| `lite-goldfish` | `spec-clarity`: blind Spec review; `spec-alignment`: check against original requirements; `plan`: write or revise a Plan; `implement`: implement; `fix`: correct user-authorized findings |

A typical handoff is: Elephant Spec → Goldfish independent review → Goldfish Plan → Elephant Plan review → Goldfish implementation → Elephant code review → Goldfish fixes when needed. Select only useful stages. A model's ready verdict still leaves the next decision and handoff to the user.

For example, explicitly select Goldfish in Codex and request a Spec review naturally:

```text
$superpowers-lite:lite-goldfish
Review this Spec: docs/specs/001-YYYY-MM-DD-feature.md
```

Exact stage codes are also supported, for example for a Plan review:

```text
$superpowers-lite:lite-elephant
Stage: plan-review
Requirements: path/to/requirements.md
Spec: docs/specs/001-YYYY-MM-DD-feature.md
Plan: docs/plans/001-YYYY-MM-DD-feature.md
```

Replace example paths with the project's actual paths. Other harnesses use their own Skill selection mechanism; role assignment does not rely on implicit matching. The entry briefly states the role, task interpretation, and input scope, then proceeds when clear; a missing stage code alone never triggers a question. Ask only for a missing necessary path or a material scope ambiguity or conflict. Each role stage runs INLINE in the current session and stops without launching another agent or advancing to a later stage.

An unqualified Goldfish request to review a Spec defaults to `spec-clarity`, reading only the Spec for independent understanding and internal consistency. An explicit request to compare with original requirements for omissions or goal drift selects `spec-alignment` and reads the necessary requirements. Extra paths alone do not broaden the review. Blind review needs a fresh session without the relevant background; a Skill cannot remove task context or external memory already injected by a harness or provide actual environmental isolation.

“Write a Plan from this Spec,” “implement the approved Plan,” and “fix these review findings” select their matching stages. Do not repeat an already clear authorization. A vague “continue” can only resume the current unfinished stage; after completion, clarify the next task. Agent-prepared handoff text still uses fixed stage codes and path templates.

Keep Specs, Plans, and necessary Review files in the development project, following existing conventions and creating them only when useful. Never silently rewrite original requirements. Reviews distinguish evidence-backed requirement violations or concrete defects from optional improvements.

See the [manual handoff contracts](plugins/superpowers-lite/skills/using-lite/references/manual-handoff-contracts.md) for stage inputs, outputs, and fixed handoff templates.

### `lite-maintaining-agents-md`

Audit project instructions on request, or distill durable, evidence-backed project guidance from the current session into `<project-root>/AGENTS.md`. “Check whether the project's AGENTS.md is stale and suggest changes” is read-only; “add the project conventions we confirmed to the project's AGENTS.md” authorizes a minimal update.

A general recap or task completion does not authorize writing. Global instructions and their known templates or mirrors, parent-directory files, and nested instruction files are outside the write scope; symbolic links cannot redirect the edit. If the file is absent, propose content and create it only on an explicit request to create or initialize it.

Keep stable commands, project conventions, and confirmed constraints. Exclude progress, temporary conclusions, runtime status, and handoff memory. This is a separate optional maintenance task, never an automatic tail to an Elephant or Goldfish stage.

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

## Repository Structure

```text
.
├── AGENTS.md                          # Version-controlled engineering instructions
├── .agents/
│   └── plugins/
│       └── marketplace.json          # Codex marketplace
├── .claude-plugin/
│   └── marketplace.json              # Claude Code marketplace
├── .codebuddy-plugin/
│   └── marketplace.json              # CodeBuddy marketplace
├── .workbuddy-plugin/
│   └── marketplace.json              # WorkBuddy marketplace
├── agents/                            # Optional Codex sub-agent profiles
│   ├── explorer.toml                  # Fast, bounded read-only exploration
│   ├── deep_explorer.toml             # Deep, cross-component exploration
│   ├── worker.toml                    # General implementation worker
│   └── reviewer.toml                  # Independent review gate
├── kimi.plugin.json                  # Kimi Code manifest
├── package.json                      # Pi package manifest
├── plugins/
│   └── superpowers-lite/
│       ├── .codex-plugin/
│       │   └── plugin.json           # Codex manifest
│       ├── .claude-plugin/
│       │   └── plugin.json           # Claude Code manifest
│       ├── .codebuddy-plugin/
│       │   └── plugin.json           # CodeBuddy manifest
│       ├── .workbuddy-plugin/
│       │   └── plugin.json           # WorkBuddy manifest
│       ├── .qoder-plugin/
│       │   └── plugin.json           # Qoder manifest
│       └── skills/
│           ├── using-lite/
│           ├── lite-elephant/
│           ├── lite-goldfish/
│           ├── lite-brainstorming/
│           ├── lite-writing-specs/
│           ├── lite-writing-plans/
│           ├── lite-debugging/
│           ├── lite-testing/
│           ├── lite-verification/
│           └── lite-maintaining-agents-md/
├── README.md
├── README-EN.md
└── LICENSE
```

Each Skill's `SKILL.md` is shared by all supported hosts. Skills do not depend on the top-level `agents/` directory; those files are optional accelerators for Codex environments that support them. The `agents/openai.yaml` files inside each Skill provide Codex-specific interface metadata and are ignored by the other platforms.

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

Superpowers Lite is intentionally small. Before adding another Skill or mandatory workflow step, ask:

> **Does this clearly improve coding quality enough to justify its coordination and context cost?**

If not, it probably does not belong here.

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

## License

MIT
