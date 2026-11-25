---
name: using-lite
description: "Primary workflow router. Load FIRST before non-trivial coding, bug fixing, refactoring, code review, performance benchmarking, blast-radius checks, remote server operations or recovery, file transfers, or Lite workflow tasks to classify depth, choose execution mode, and load the right leaf skills."
---

# Using Lite

Act as a thin task classifier and workflow router. Keep process light by skipping unnecessary artifacts, branches, sub-agents, and micro-steps—not by skipping the leaf skills that guard reasoning and verification.

Within the host's permissions and applicable project constraints, the scope and stopping points the user explicitly sets take precedence over a skill's default workflow.

When an instruction in a `SKILL.md`, `AGENTS.md`, or another instruction file causes you to pause, ask for approval, or change course, identify the file, quote the relevant instruction, and explain how it applies. Distinguish an explicit requirement from your own interpretation. Apply the same rule when explaining a past run through [lite-help](../lite-help/SKILL.md).

## Mandatory Leaf-Skill Loading Gate

This file routes work; it does **not** contain leaf execution checklists.

- Whenever a phase or standalone skill below applies, **LOAD its `SKILL.md` in full** before executing that step. Never rely on the one-line trigger summary in this router or claim a skill was applied without loading its `SKILL.md`.
- References written as `superpowers-lite:<skill-name>` identify this package's Skill with that frontmatter name. Use the exact identifier exposed by the host (`superpowers-lite:<skill-name>` in plugin hosts, `<skill-name>` in native loaders such as Pi or OpenCode). If the host has no skill-invocation tool or blocks model invocation for a referenced Skill, read and follow `../<skill-name>/SKILL.md` directly.

## Skill Map

| Skill | Load when |
|---|---|
| `superpowers-lite:lite-help` | User asks how to install, configure, or use Lite, pick a skill, or understand/steer a run |
| `superpowers-lite:lite-elephant` | User explicitly selects the Elephant role (`spec`, `plan-review`, `code-review`) |
| `superpowers-lite:lite-goldfish` | User explicitly selects the Goldfish role (`spec-clarity`, `spec-alignment`, `plan`, `implement`, `fix`) |
| `superpowers-lite:lite-brainstorming` | Consequential design choices remain unsettled: architecture, module boundaries, data shape, state ownership, or material requirement ambiguity |
| `superpowers-lite:lite-writing-specs` | Observable behavior, public/cross-component contracts, error/recovery semantics, or acceptance criteria need to be made explicit |
| `superpowers-lite:lite-writing-plans` | Decided implementation spans multiple coordinated units, migration ordering, or delegated worker briefs |
| `superpowers-lite:lite-debugging` | A bug, failure, flaky test, or performance regression lacks a proven fault location and mechanism |
| `superpowers-lite:lite-testing` | Adding or updating behavioral/regression tests, choosing test level or boundaries, or protecting changed behavior |
| `superpowers-lite:lite-verification` | Before claiming any coding, bug-fix, refactor, build, or config work is complete, fixed, or passing |
| `superpowers-lite:lite-benchmark` | Producing, reporting, comparing, or choosing from any measured performance number |
| `superpowers-lite:lite-blast-radius` | User asks what else a change breaks outside the diff, or testing/review depends on an unchecked cross-consumer safety fact |
| `superpowers-lite:lite-code-simplifier` | User requests behavior-preserving code simplification or cleanup |
| `superpowers-lite:lite-no-comments` | User asks to remove or audit comments in named files or a diff |
| `superpowers-lite:lite-bro` | User asks to restate the previous reply in plain language ("说人话", "讲简单点") |
| `superpowers-lite:lite-in-your-own-words` | User asks you to restate your understanding of their goals and problem |
| `superpowers-lite:lite-teach` | User wants a deep, plain-language explanation of a subsystem or change |
| `superpowers-lite:lite-how` | User asks how code/architecture currently runs or where logic belongs |
| `superpowers-lite:lite-why` | User asks why something was designed a certain way from commit/PR history |
| `superpowers-lite:lite-unslop` | User or another skill cleans AI writing patterns from Chinese or English prose |
| `superpowers-lite:lite-technical-writing` | User explicitly requests Diátaxis/technical-writing authoring or review |
| `superpowers-lite:lite-arena` | User asks for a multi-candidate contest with rubric scoring and manual grafting |
| `superpowers-lite:lite-swarm` | User asks for partitioned or raced parallel workers returning one consolidated report |
| `superpowers-lite:lite-recall` | User asks to rebuild recent working context across chats, Git, PRs, and issues |
| `superpowers-lite:lite-handoff` | User asks to write a one-time handoff note before starting a fresh session, or to pick up and clean up one in a new session |
| `superpowers-lite:lite-ketchup` | User asks what changed in this chat since their last message and what decisions await them |
| `superpowers-lite:lite-ketchup-video` | User asks for a short subtitled catch-up video |
| `superpowers-lite:lite-show-me-your-work` | User asks for an append-only decision trail for long or unattended runs |
| `superpowers-lite:lite-automate-me` | User asks to capture recurring working habits into a project-local `-mode` skill |
| `superpowers-lite:lite-reflect` | User asks to mine this session for approved edits to in-project skills |
| `superpowers-lite:lite-correct` | User asks to block repeated repo mistakes via architecture, types, lint/CI, or tests |
| `superpowers-lite:lite-maintaining-agents-md` | User asks to audit or update durable rules in `<project-root>/AGENTS.md` |
| `superpowers-lite:lite-remote-operations` | Executing remote server changes or commands with exact targets and tracked outcomes |
| `superpowers-lite:lite-remote-recovery` | Diagnosing remote connectivity/host/service failures or verifying reboot/update recovery |
| `superpowers-lite:lite-file-transfer` | Moving files across local, remote, or artifact storage with path and byte-integrity checks |

## Respect Explicit Manual Roles

When the user explicitly selects `superpowers-lite:lite-elephant` or `superpowers-lite:lite-goldfish`, load that role's `SKILL.md` (which loads [manual-handoff-contracts.md](references/manual-handoff-contracts.md)) before reading task materials. Never infer a manual role from the model name or an ordinary review request.

Each manual role stage executes INLINE in its current session. When an underlying phase skill returns here, stop at the active role's stage boundary—never advance stages, switch roles, or spawn agents.

## Route Standalone Non-Coding Requests

1. **Help**: For Lite setup, usage, or skill-selection questions, load `superpowers-lite:lite-help` (or read [lite-help](../lite-help/SKILL.md)). Stop after guidance unless the user also asked to execute the work.
2. **Remote & Transfers**: Load `superpowers-lite:lite-remote-operations`, `superpowers-lite:lite-remote-recovery`, or `superpowers-lite:lite-file-transfer` as needed. For an unknown remote failure, run recovery diagnosis first, apply operations discipline to any authorized change, then verify recovery; known routine operations skip diagnosis. Do not open coding Spec/Plan/review phases unless product code also changes.
3. **Standalone Tools & Maintenance**: When a request only explains code/history (`lite-teach`, `lite-how`, `lite-why`), edits prose/docs (`lite-unslop`, `lite-technical-writing`, `lite-bro`, `lite-in-your-own-words`), vets a number or blast radius (`lite-benchmark`, `lite-blast-radius`), runs `lite-arena` or `lite-swarm`, cleans scoped code/comments (`lite-code-simplifier`, `lite-no-comments`), recovers context, hands off sessions, or logs progress (`lite-recall`, `lite-handoff`, `lite-ketchup`, `lite-ketchup-video`, `lite-show-me-your-work`), or maintains habits/skills/rules (`lite-automate-me`, `lite-reflect`, `lite-correct`, `lite-maintaining-agents-md`), load that skill and stop coding-workflow routing afterward unless code changes were also requested.
4. **No Automatic Tail Tasks**: Never append `lite-maintaining-agents-md`, `lite-code-simplifier`, `lite-no-comments`, `lite-reflect`, `lite-correct`, `lite-automate-me`, `lite-handoff`, `lite-ketchup`, or `lite-show-me-your-work` automatically at task completion. Keep `lite-maintaining-agents-md` as the sole writer of `<project-root>/AGENTS.md`. Preserve any active manual role's input, write, and stopping boundaries.

## Route Coding Work by Objective Signals

Gather only enough repository context to classify the task. Classify by uncertainty and contract impact, never by file count.

```text
Coding / Bug Request → classify depth (SIMPLE | STANDARD | COMPLEX) + execution mode (INLINE | DELEGATED | MIXED)
  ├─ Unsettled architecture / boundaries / data shape?          → LOAD lite-brainstorming
  ├─ Observable behavior / contracts / error semantics unclear? → LOAD lite-writing-specs
  ├─ Failure mechanism & location not yet proven by evidence?   → LOAD lite-debugging
  ├─ Multi-unit coordination / migration / delegated briefs?    → LOAD lite-writing-plans
  ├─ Implement
  ├─ New/changed tests or non-trivial regression scope?         → LOAD lite-testing (→ lite-blast-radius if consumers unclear)
  ├─ Completion / fixed / passing claim?                        → LOAD lite-verification (→ lite-benchmark for perf numbers)
  └─ Optional bounded code review gate
```

Apply these objective triggers rather than assuming work is "obvious":

- **Brainstorming & Specs**: Load `lite-brainstorming` whenever consequential structure, state ownership, or requirement choices remain open. Load `lite-writing-specs` whenever caller-visible contracts, state transitions, or acceptance criteria are not already settled. Even COMPLEX tasks skip them only when those decisions and contracts are already explicitly established.
- **Bugs & Regressions**: Load `lite-debugging` unless concrete evidence (reproduction, stack trace, failing assertion, or direct code trace) already proves the exact fault location and mechanism. A plausible guess is not proof.
- **Planning**: Load `lite-writing-plans` when coordinating multiple units, migrations, or delegated briefs; skip for one obvious unit. If neither spec nor plan adds value on a STANDARD task, treat it as SIMPLE.
- **Testing & Verification**: Load `lite-testing` whenever writing or updating tests or judging regression reach; skip only when verification is a single self-evident command with no test edits. Load `lite-verification` before any completion, fix, build, or passing claim (skip only for pure prose/comment edits with no behavioral claim).
- **Reclassify as Needed**: Escalate if a local edit exposes new contracts or state changes; downgrade if an established repository pattern already settles the design. Ask the user only for choices that materially change behavior, architecture, scope, or safety—never for workflow classification approval.

## Choose Execution Mode

Task complexity governs workflow depth; execution mode (`INLINE`, `DELEGATED`, or `MIXED`) governs planning detail. Honor an explicit user preference.

- **INLINE**: Prefer when work is tightly coupled, boundaries are shifting, or handoff overhead approaches delegation benefit.
- **DELEGATED / MIXED**: Prefer when boundaries and contracts are clean and context isolation, parent-context preservation, or parallelism adds real value. Split parallel writers by modified resource; assign shared targets to one writer or sequence them. `lite-writing-plans` adapts detail to the chosen mode (direction for inline; self-contained briefs or high-level plan + just-in-time briefs for delegated).
- **Host Adaptation**: Never assume sub-agents, parallel execution, or specialized roles exist. Fall back to INLINE without reducing reasoning, testing, or verification depth. With specialized exploration roles, use fast bounded exploration for targeted file/call/test lookup and escalate to deep exploration or INLINE when boundaries or concurrency/lifecycle/security paths are unclear.
- **Durable Delegated Workspace**: Default to direct prompts and short worker reports. Activate [delegated-execution-workspace.md](references/delegated-execution-workspace.md) only when compaction/interruption risk, large handoffs, multi-consumer briefs, or coordinated unit state requires files **and** the task already justifies a persisted plan.

## Converge Optional Code Review

Code review is optional. When used, enforce a strict automatic budget for one reviewed task: **at most one pre-review acceptance correction wave, one broad review, one post-review batched fix wave, and one scoped re-review**. Exceeding any limit triggers the breaker for user direction—never start another automatic loop.

Default path: `implementation → frozen planned acceptance → (optional 1 pre-review correction) → 1 broad review → 1 batched fix wave → refresh invalidated acceptance evidence → 1 scoped re-review → complete or breaker`. If the user requests code review before final performance or operational acceptance, scope the review to implementation/correctness and keep agreed later acceptance pending before whole-task completion without adding a second broad review.

### Gather Acceptance Evidence First

Freeze acceptance scope from the acceptance criteria and risk before the first run, preferring real CLI, API, or UI entries for external behavior (focused integration checks suffice for internal work). On failure, batch known failures into at most one pre-review correction wave and rerun only failed or invalidated checks; if criteria still fail, stop and ask the user. Do not expand acceptance scope after the first run unless the original check cannot prove the claimed behavior, evidence is shown invalid, or the correction changes required behavior.

Pass the reviewer the requirements, acceptance criteria, diff, worker report, applicable evidence, known concerns, and any agreed pending acceptance.

### Review the Task Broadly Once

Cover the whole implementation within declared task scope: requirements, acceptance criteria, diff, cross-layer invariants, failure paths, equivalent entry paths, integration boundaries, evidence, and semantic outputs. Batch all reasonably discoverable findings now. If a safety judgment depends on an unchecked fact, load `superpowers-lite:lite-blast-radius` (or read [lite-blast-radius](../lite-blast-radius/SKILL.md)) and include the result in this same review.

For each substantive finding, state the trigger, consequence, evidence for likelihood in supported use (`inevitable`, `intermittent`, `rare`, `conditional`, or `unknown`; numeric probabilities only when measured), and the smallest effective fix's scope, complexity, and verification cost. Classify every finding:

- **BLOCKING**: Violates an explicit requirement or acceptance criterion; breaks correctness in supported use; risks realistic data loss, corruption, or unrecoverable state; breaks promised compatibility; introduces a security flaw; breaks the main flow; or invalidates verification.
- **DEFERRED**: Pre-existing and not needed to fulfill the current task, out of scope, speculative, future hardening, optional refactoring, or style preference. Recommend deferring optional items with rare triggers, limited impact, and disproportionate repair cost while preserving explicit contracts.

Distinguish requirement violations, code defects, inaccurate reports, and proposed improvements (an overstated report does not retroactively tighten the implementation contract). If no BLOCKING findings exist, close the review gate cleanly.

### Fix Once, Then Re-review Once

Before editing, the implementer verifies each blocker's trigger, impact, and cost, reporting unsupported or disproportionate items to the decision-maker while fixing the remaining authorized batch in one wave across shared invariants and directly affected adjacent paths.

Refresh acceptance checks invalidated by the fix wave **before** scoped re-review. The single scoped re-review marks each original blocker `ADDRESSED` or `NOT ADDRESSED` and checks only the fix diff and directly affected invariant paths for regressions.

### Break the Loop

After scoped re-review, stop automatic repair:
- If clean, complete any already-agreed pending acceptance before claiming whole-task completion.
- If an original blocker remains, a fix caused a blocking regression, or blocking status is disputed, report what was tried, the cause/impact, and whether further repair is recommended, then ask the user.
- A `REVIEWER MISS` (discoverable in broad review, first raised in scoped re-review) never starts a second automatic fix wave: trigger the breaker if it meets BLOCKING rules, otherwise mark DEFERRED. Trigger the breaker early on disproportionate elapsed time, abnormal traffic, or repeated failure on the same invariant.

## Keep Artifacts Lightweight

A phase never implies a file: SIMPLE creates none; STANDARD stays inline by default; COMPLEX persists only when cross-session or multi-agent context genuinely needs it.

When persisting a Spec or Plan, follow an explicit user path first, then an existing project convention, otherwise:
- specs: `docs/specs/NNN-YYYY-MM-DD-slug.md`
- plans: `docs/plans/NNN-YYYY-MM-DD-slug.md`

`NNN` is one shared sequence across `docs/specs/` and `docs/plans/` starting at `001` (continuing to `1000` after `999`, never reused or renumbered); a Spec and Plan for the same work item share the exact `NNN-YYYY-MM-DD-slug` stem, rechecking availability right before creation. Do not force worktrees, branches, commits, PRs, reviewers, or sub-agents unless they add clear value.
