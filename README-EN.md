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

The diagram shows the default order. When the user requests code review before aggregate performance measurement or operational acceptance, preserve that order and require evidence appropriate to the current review scope. Later acceptance must still finish before whole-task completion; moving it later does not automatically add another broad review.

The broad review covers the whole implementation within its declared scope and batches the blockers that are reasonably discoverable now. Only requirement violations, correctness failures in supported use, data-safety risks, promised compatibility breaks, task-introduced security issues, broken main flows, or invalid verification block the task. Pre-existing issues outside the requested work, speculative risks, hardening, optional refactors, and out-of-scope observations are deferred.

The default automatic budget is one pre-review correction, one broad review, one post-review batched fix wave, and one scoped re-review. If a fix invalidates acceptance evidence, only affected checks are refreshed before re-review. A late reviewer miss triggers the breaker when it meets blocking admission and is otherwise deferred; it never starts a second automatic fix. A clean scoped re-review is normally the final automatic review gate; later acceptance does not reset the correction budget.

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
| `lite-code-simplifier` | Simplify scoped code while preserving existing behavior and contracts |
| `lite-bro` | Restate the previous reply in plain, coherent language |
| `lite-in-your-own-words` | Restate your understanding of the user's goals and problem |
| `lite-teach` | Explain mechanisms, reasons, and tradeoffs through lite-how and lite-why; clean English with lite-unslop |
| `lite-how` | Explain architecture, runtime flow, and code ownership through read-only exploration |
| `lite-why` | Trace design reasons and tradeoffs through commits and PR discussions |
| `lite-unslop` | Remove AI writing patterns from English while preserving meaning, tone, and established terms |
| `lite-technical-writing` | Write and review technical documents with Diátaxis in any language; English sentence rules and lite-unslop apply to English |
| `lite-testing` | Choose and run meaningful behavioral tests or checks |
| `lite-verification` | Determine what fresh evidence supports a completion claim |
| `lite-benchmark` | Vet a measured performance number before reporting it or choosing from it |
| `lite-blast-radius` | Find what a change can break outside the diff and prove the safety fact when cheap |
| `lite-arena` | Run multi-candidate contests, pick a base, graft, and verify |
| `lite-swarm` | Partition or race parallel workers and return one report |
| `lite-maintaining-agents-md` | Audit or maintain durable instructions in the project-root AGENTS.md |
| `lite-remote-operations` | Execute remote tasks with exact targets, existing access, and tracked outcomes |
| `lite-remote-recovery` | Diagnose remote failures and verify authorized host or service recovery |
| `lite-file-transfer` | Choose transfer paths, verify integrity, and interpret scan results |

The three remote operations Skills use the host's existing SSH, CLI, or MCP tools and do not depend on a particular remote execution service. Select a Skill directly or route through `using-lite`; they add no mandatory coding phases.

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

“Write a Plan from this Spec,” “implement the approved Plan,” and “fix these review findings” select their matching stages. Do not repeat an already clear authorization. A vague “continue” can only resume the current unfinished stage; after completion, clarify the next task.

Each stage ends with one copyable next-step handoff by default, filling known paths, relevant Reviews, change ranges, and acceptance evidence, and naming the recipient and whether to use a fresh or suitable existing session. The outcome determines whether to prepare review, revision, implementation, or re-review; a needed human decision is stated directly, and a clean final review closes the flow. Mark missing required inputs without reading beyond the current stage's boundaries. When the destination harness is unknown, name the role skill in natural language rather than assuming its command syntax. Sending the text supplies your next-stage instruction; the model never sends or executes it automatically. When multiple findings need round-trip tracking, retain their IDs and state each fix or re-review disposition, including disagreements.

Keep Specs and Plans in the development project, following their existing naming rules and persisting them when useful. Keep original requirements traceable; the Spec author and Plan reviewer check the overall outcome and coverage across phases. Lower priority does not mean excluded. Plans identify each material unit's concrete change and completion evidence. Reviews distinguish requirement violations, code defects, inaccurate reports, and new suggestions without turning an overstated report into a retroactive requirement.

In the manual role workflow, Goldfish's `spec-clarity` and `spec-alignment` and Elephant's `plan-review` and `code-review` save a Review file by default, including a short clean verdict when there are no blockers. Omit the file only on an explicit request for a chat-only review. Prefer the requested output location or a known project convention; otherwise use the development project's `docs/review/`.

Default filenames reuse the reviewed Spec or Plan's work-item number, original date, and slug, then append the stage and round, for example `docs/review/001-YYYY-MM-DD-feature-plan-review-r01.md`. Re-reviews advance to `r02` and preserve earlier reports. Create the directory only when saving a report. Name allocation uses only necessary path metadata and matching filenames; it does not widen Goldfish's blind-read context.

The review reply names the specific stage that passed or is blocked, gives the saved path, and includes the next useful handoff when applicable. The human passes that Review to the other role for Spec or Plan revisions or code fixes. A report neither starts the next stage nor replaces the user's decision.

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

When the open question is data shape, module boundaries, state ownership, or how much callers must know, sketch only enough structure to compare, and prefer the shape with one owner per state, one supported path per task, and the least caller knowledge. Follow an existing pattern when it fits. Do not invent a second shape merely for contrast.

It does not force multiple alternatives when an existing project pattern already fits.

It also allows small disposable probes when experimentation is the cheapest reliable way to resolve a design question.

A direct call to `lite-writing-specs` or `lite-writing-plans` still returns here when those structural choices remain unsettled, instead of choosing the structure inside the Spec or Plan. Competing artifacts that need a grafted result use `lite-arena`, not this skill.

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

Debugging still owns an unclear performance failure. Once a number is ready to report or to choose from, use `lite-benchmark`.

> **Do not stack speculative fixes.**

### `lite-code-simplifier`

Simplify specified code or changes already identified for the current task, reducing unnecessary nesting, duplication, and indirection while preserving behavior, interfaces, and failure semantics. Follow the project's conventions without fixing a model or language style. Fewer lines are not the goal.

For example: “Simplify the current task's code changes without changing behavior.” A request for review or suggestions is read-only; a direct simplification request authorizes scoped edits. Run verification relevant to the change and report the actual evidence. Leave already clear code unchanged.

This is an optional task, not an automatic pass after every code edit. Existing Elephant and Goldfish stage permissions still apply: simplification does not turn review into implementation or introduce another stage.

### `lite-bro`

When you ask “say it plainly” or “make it simpler,” restate the previous reply with less jargon while preserving its meaning, essential facts, and uncertainty. Return the rewritten reply directly. You can also invoke `$superpowers-lite:lite-bro` explicitly.

This is a standalone communication tool. It needs no coding workflow, particular model, or tools.

### `lite-in-your-own-words`

When you ask “restate my requirements” or “what do you understand I want?”, explain the user's goals and problem in your own words and return the restatement directly. You can also invoke `$superpowers-lite:lite-in-your-own-words` explicitly.

### `lite-teach`, `lite-how`, `lite-why`, and `lite-unslop`

These four Skills remain explicitly invoked, either by the user or by another Skill. They are not automatic stages for every coding task or reply. In Codex, use names such as `$superpowers-lite:lite-teach`; other hosts use their own Skill invocation mechanism.

`lite-teach` shapes an explanation around the reader's question and existing knowledge. It actually invokes `lite-how` for mechanisms and `lite-why` for historical reasons. English explanations then go through `lite-unslop`; other languages do not use its punctuation or article rules. A subsystem normally uses both how and why in parallel before combining their results; a small question may need only one. In a live conversation, lead with the conclusion and stop at the smallest complete answer. A one-shot reply delivers the full explanation the question needs, still leading with the conclusion. Preserve uncertainty in the evidence, and never quiz the reader or ask them to repeat the lesson. Build diagrams step by step for systems with several parts, and use image generation for spatial explanations.

The dependencies also work alone. For a narrow placement or layering question, `lite-how` explores read-only in the current session and answers directly. It delegates to one read-only subagent when the question covers a subsystem. The parent may rewrite for the user's language and for clarity, while keeping the explored facts. `lite-why` cites actual commits and discussions, separating recorded reasons, inferences, and unknowns. `lite-unslop` cleans English only and keeps terms the project already uses. When delegation, parallel execution, or image generation is unavailable, state the limitation and use the corresponding alternative without claiming a missing invocation or image happened.

### `lite-technical-writing`

Explicitly invoke `$superpowers-lite:lite-technical-writing`. Diátaxis applies in every language and separates tutorial, how-to, reference, and explanation. Google developer style, STE, and Global English sentence rules apply to English, which also uses `lite-unslop`. Code snippet indentation follows the repository's existing convention.

Use it for documents, RFCs, READMEs, PR descriptions, and commit messages. Diátaxis does not apply to PR descriptions and commit messages. English ones use the sentence rules and `lite-unslop`; other languages keep the real names and that language's own sentences. Product UI strings follow the product's own copy guidelines. Other Skills may also call it. It is not an automatic pass on every reply.

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

When the claim itself is a speedup, slowdown, throughput, latency, or a choice based on that number, use `lite-benchmark` before stating the verdict. Do not invoke it for a claim that is not a performance number.

### `lite-benchmark`

Use it when you will report or adopt a measured performance number: a speedup, slowdown, throughput, latency, or a choice based on that number. A comparison, or a difference you will act on, checks the limiter, whether each side matches the claim's configuration, physical and accounting limits, errors and output correctness, whether the gap exceeds run-to-run variation, the local result's share of the path a user waits on, and whether the work happened inside the timed region.

A requested rough magnitude is one run plus the error and work-happened checks, and you say that it is one run. Run another check when that run looks wrong. A choice, or a difference you will act on, is never a rough magnitude. A comparison alternates sides and reports the median and range. Judge configuration against the claim: defaults are the right setup when the claim is out-of-the-box behavior, and a side that does not match the claim cannot decide that comparison. A comparison is inconclusive when you cannot name the limiter, a side does not match the claim, or errors and work-happened were not checked. A rough magnitude does not become inconclusive merely because it has no limiter profile.

It is an explicit tool. It is not a coding phase and it is not part of review. You can also invoke `$superpowers-lite:lite-benchmark`.

### `lite-blast-radius`

Invoke it directly when you ask what else a change could break. The workflow also calls it when an authorized test still cannot tell the affected consumers or behaviors from ordinary inspection, or a safety judgment depends on a fact not yet checked. Shared state, persistence formats, external interfaces, and async lifecycles are places to look, not reasons to run it on their own.

It looks outside the diff and tries to prove the one or two facts the change's safety depends on. Run the real code when that is cheap, and keep the command and output. When a run is not cheap or you cannot run it, stop at the evidence level you reached and mark the fact unproven. The proof may be a focused test or a temporary script. Do not change product code.

It does not explain how the code runs now; that is `lite-how`. It does not decide test scope. `lite-testing` decides coverage directly when ordinary inspection is enough, and uses this skill only for the remaining unknown. The one broad review may use it for one unproven safety fact and include the result in that same review. Reuse an investigation that already covers the change. Do not add a phase or another review. You can also invoke `$superpowers-lite:lite-blast-radius`.

### `lite-arena`

Use it when you want several independent candidates for the same task, then one base that absorbs the strongest parts of the others. Define the artifact and 3–6 gradeable criteria, fan the same task into isolated outputs, cross-judge when a distinct available model can score, read every candidate before picking a base, graft by hand, and verify. Convergence needs no forced graft. Wild divergence means reframe and re-run, not a splice.

It does not depend on Cursor cloud agents, a fixed model panel, or a `pstack-models` rule. Run it only when the host can provide at least two isolated candidates; otherwise state the limit and stop. It is not `lite-brainstorming`, which settles design direction with sketches rather than competing artifacts. You can also invoke `$superpowers-lite:lite-arena`.

### `lite-swarm`

Use it when checks, exploration, or verification should be partitioned, or when identical briefs should race, and you need one consolidated report. Declare the done predicate and shape first: slices, a race, or both. For a race, declare `first pass`, `rank all`, or `best-of` before spawning. Each worker gets a self-contained brief, scope, verification method, and output requirements. Measurement briefs name exact SHAs and the method. Workers report `PASS`, `ISSUES`, or `BLOCKED`. Drop a result missing the required SHA or method, respawn once, then record a gap.

Use the host's existing delegation. Do not default to cloud agents. Require the user's machine only when the work needs something there. It does not pick a base or graft losers; that is `lite-arena`. Ordinary `DELEGATED` / `MIXED` execution remains enough for one clear work unit. You can also invoke `$superpowers-lite:lite-swarm`.

### `lite-remote-operations`

Executes remote administrative tasks with exact targets, existing privilege and secret channels, asynchronous job tracking, and result verification. For example: "Restart this server's specified service and confirm the application recovers." Inspect actual capabilities, prefer a matching typed tool, or reuse authorized SSH or CLI access. Do not repeat a mutation with an unknown outcome because a client wait timed out.

It owns execution discipline for remote changes. For an unknown failure, use `lite-remote-recovery` to locate the cause, then verify recovery after the change. A known routine operation does not need a full diagnostic phase.

### `lite-remote-recovery`

Diagnoses connectivity and service failures by separating DNS, TCP, SSH, authentication, privilege, and application health, and identifying whether a probe originated from the agent's execution environment or the target host. For example: "SSH works, but application requests fail; first locate the cause." Use bounded read-only checks; a diagnostic request does not authorize a restart.

It owns diagnosis and recovery verification; follow `lite-remote-operations` when changes are needed. For an authorized update or reboot, verify the actual job result and relevant service state; after a reboot, also verify reconnection and boot identity. An open port or restored SSH access alone does not establish application recovery.

### `lite-file-transfer`

Handles files moving between local machines, remote servers, and artifact storage with explicit paths, directory scope, overwrite behavior, and data transit. For example: "Copy this archive to another server and verify its integrity." Choose a path supported by the actual tool and verify the exact file or archive bytes.

When the service or policy requires reputation checks, follow digest calculation, reputation lookup, transfer, and receiver verification in that order. Do not interpret no malicious match or no detection as proof of safety, or impose a scanning service on an ordinary file copy.

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
│           ├── lite-code-simplifier/
│           ├── lite-bro/
│           ├── lite-in-your-own-words/
│           ├── lite-teach/
│           ├── lite-how/
│           ├── lite-why/
│           ├── lite-unslop/
│           ├── lite-technical-writing/
│           ├── lite-testing/
│           ├── lite-verification/
│           ├── lite-benchmark/
│           ├── lite-blast-radius/
│           ├── lite-arena/
│           ├── lite-swarm/
│           ├── lite-maintaining-agents-md/
│           ├── lite-remote-operations/
│           ├── lite-remote-recovery/
│           └── lite-file-transfer/
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
