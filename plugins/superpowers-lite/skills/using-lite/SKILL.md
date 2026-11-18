---
name: using-lite
description: Use for coding, remote server administration, remote diagnosis and recovery, or remote or artifact file transfers to select the lightest workflow that preserves confidence. Do not use for ordinary technical explanations or conceptual questions.
---

# Using Lite

Act as a thin task classifier and workflow router. Use the least process that still supports a reliable result.

Know when a skill is useful and what responsibility it owns; leave how it performs that work to the skill.

Within the host's permissions and applicable project constraints, the scope and stopping points the user explicitly sets take precedence over a skill's default workflow.

When an instruction in a `SKILL.md`, `AGENTS.md`, or another instruction file causes you to pause, ask for approval, or change course, identify the file, quote the relevant instruction, and explain how it applies. Distinguish an explicit requirement from your own interpretation. Apply the same rule when explaining a past run through [lite-help](../lite-help/SKILL.md).

References written as `superpowers-lite:<skill-name>` identify this package's Skill with that frontmatter name. Use the exact identifier exposed by the host: keep the plugin namespace where registered, and use `<skill-name>` with native unqualified loaders such as Pi or OpenCode.

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
| `superpowers-lite:lite-help` | Answer questions about Lite setup, skill selection, and workflow usage |
| `superpowers-lite:lite-elephant` | Author Specs and review Plans or code in a user-selected manual role |
| `superpowers-lite:lite-goldfish` | Independently review Specs, plan, implement, or fix in a user-selected manual role |
| `superpowers-lite:lite-brainstorming` | Resolve consequential design uncertainty |
| `superpowers-lite:lite-writing-specs` | Define required behavior and contracts |
| `superpowers-lite:lite-writing-plans` | Organize decided implementation work |
| `superpowers-lite:lite-debugging` | Investigate unclear root causes before choosing a fix |
| `superpowers-lite:lite-code-simplifier` | Simplify authorized code while preserving supported behavior |
| `superpowers-lite:lite-no-comments` | Delete unjustified comments; fix the problems they hide only when asked |
| `superpowers-lite:lite-bro` | Restate the previous reply in plain language without jargon |
| `superpowers-lite:lite-in-your-own-words` | Restate your understanding of the user's goals and problem |
| `superpowers-lite:lite-teach` | Explain a change or subsystem through lite-how and lite-why. Use lite-unslop for Chinese and English |
| `superpowers-lite:lite-how` | Explain current architecture and runtime behavior through read-only exploration |
| `superpowers-lite:lite-why` | Trace design decisions and tradeoffs through commits and discussions |
| `superpowers-lite:lite-unslop` | Remove AI writing patterns from Chinese and English while preserving meaning, tone, and established terms |
| `superpowers-lite:lite-technical-writing` | Write and review technical documents. Use Diátaxis in any language and lite-unslop for Chinese and English |
| `superpowers-lite:lite-testing` | Choose and run meaningful behavioral tests or checks |
| `superpowers-lite:lite-verification` | Determine what fresh evidence supports the completion claim |
| `superpowers-lite:lite-benchmark` | Vet a measured performance number before reporting it or choosing from it |
| `superpowers-lite:lite-blast-radius` | Find what a change can break outside the diff and prove the safety fact when cheap |
| `superpowers-lite:lite-arena` | Run multi-candidate contests for one artifact, pick a base, graft, and verify |
| `superpowers-lite:lite-swarm` | Partition or race parallel workers and return one consolidated report |
| `superpowers-lite:lite-recall` | Rebuild recent working context from chat history, live state, and the shared record |
| `superpowers-lite:lite-ketchup` | Catch the user up on this chat's new progress and waiting decisions |
| `superpowers-lite:lite-ketchup-video` | Catch the user up with a short subtitled progress video and waiting decisions as text |
| `superpowers-lite:lite-show-me-your-work` | Keep a reviewable append-only decision trail for long or unattended runs |
| `superpowers-lite:lite-automate-me` | Capture recurring working habits into a project-local -mode skill |
| `superpowers-lite:lite-reflect` | Mine this session for approved edits to existing in-project skills |
| `superpowers-lite:lite-correct` | Make repeated agent mistakes hard to repeat with in-repo constraints |
| `superpowers-lite:lite-maintaining-agents-md` | Audit or maintain durable instructions only in the project-root AGENTS.md |
| `superpowers-lite:lite-remote-operations` | Execute remote tasks with exact targets, existing access, and tracked outcomes |
| `superpowers-lite:lite-remote-recovery` | Diagnose remote failures and verify authorized host or service recovery |
| `superpowers-lite:lite-file-transfer` | Choose a transfer path and verify delivered artifacts |

## Respect Explicit Manual Roles

When the user explicitly selects `superpowers-lite:lite-elephant` or `superpowers-lite:lite-goldfish` through the harness or a direct request, load that entry before gathering task context. Follow its task interpretation, permitted inputs, human decisions, and manual stopping boundary. Require an explicit role, then resolve the stage from the human task using the shared contract: a stage code is optional, and Goldfish defaults an unqualified Spec review to Spec-only clarity review. Announce the scope and proceed when clear; ask only for a material scope ambiguity, conflict, or missing necessary input. Do not choose a role from the model name or an ordinary request to review a document outside this manual workflow.

Each manual role stage executes INLINE in its user-started session. Do not delegate any part of it. When an underlying phase skill returns here, return to the active role's stage boundary instead of proceeding to the next phase, switching roles, dispatching agents, or replacing an external handoff with work in the current session. Capability fallback does not authorize another stage. The user performs the handoff and supplies the next stage instruction.

The role entries share [manual-handoff-contracts.md](references/manual-handoff-contracts.md). Load that reference only for an explicitly selected manual workflow; it is not a general review requirement. Manual handoff adds an opt-in boundary, not a fourth execution mode or a mandatory pipeline. Ordinary Lite routing is unchanged.

## Maintain Project Instructions Only on Request

For a user request to audit or update the project-root AGENTS.md, use `superpowers-lite:lite-maintaining-agents-md` as a separate maintenance task. That Skill owns the target, evidence, and write-authorization boundaries. Do not add maintenance to task completion or manual role handoffs automatically. A general recap does not authorize an AGENTS.md edit, and an active manual role retains its permitted inputs and stopping boundary.

## Route Requested Code Simplification

Use `superpowers-lite:lite-code-simplifier` when the current task requests behavior-preserving code simplification or cleanup. It owns the cleanup scope and preservation checks; a request for suggestions remains read-only. Do not append it automatically after writing code or treat optional simplification as a blocking review finding. An active manual role retains its permitted inputs, writes, and stopping boundary.

## Route Requested Comment Cleanup

Use `superpowers-lite:lite-no-comments` when the user asks to remove comments, run no-comments, or clean comments in named files or a diff. It owns comment deletion and the keep-exception audit. Application-code fixes run only when the user asks to fix what the comments hide or approves a specific fix. It is not a substitute for `lite-code-simplifier`. Do not append it automatically after writing code or treat optional comment cleanup as a blocking review finding. An active manual role retains its permitted inputs, writes, and stopping boundary.

## Route Remote Administration and Transfers

Use `superpowers-lite:lite-remote-operations` for remote administrative execution, `superpowers-lite:lite-remote-recovery` for host or connectivity diagnosis and recovery, and `superpowers-lite:lite-file-transfer` for moving artifacts. They use the connection tools already available; no specific MCP provider is required.

Load only the relevant skills. These are operational workflows, not additional mandatory coding phases. A routine host inspection or file copy does not need a Spec, Plan, or code review. If the task also requires code changes, route that part through the coding workflow as usual. Preserve an active manual role's scope and stopping boundary.

The operational skills can be selected directly or through this router; loading `using-lite` first is not required. For an unknown remote failure, use recovery to locate the cause, apply operations discipline to any needed change, then verify recovery. A known routine operation does not require a diagnostic phase.

## Route Benchmark And Blast-Radius Checks

Use `superpowers-lite:lite-benchmark` when the user asks to produce, report, or choose from a measured performance number. A rough magnitude stays one run plus the error and work-happened checks.

Use `superpowers-lite:lite-blast-radius` when the user asks what else a change could break, when an authorized test still cannot tell the affected consumers or behaviors from ordinary inspection, or when a safety judgment depends on a fact not yet checked. The user can also invoke it directly. Both skills stay explicit: they do not load on their own, and they are not coding phases.

`superpowers-lite:lite-verification` invokes `lite-benchmark` only when the completion claim itself is a performance number. `superpowers-lite:lite-debugging` keeps an unclear performance failure until a number is ready to report. `lite-testing` decides coverage directly when ordinary inspection is enough, and invokes `lite-blast-radius` only for the remaining unknown.

The one broad review may use `lite-blast-radius` when one of its safety judgments depends on a fact not yet checked. Put the result in that same review. Reuse an investigation that already covers the change. Do not add a phase or another review.

A request that is only one of these checks stops coding-workflow routing. Do not open a spec, plan, or review for it. If the same task also changes code, route that part through the coding workflow as usual. Preserve an active manual role's scope and stopping boundary.

## Route Arena And Swarm

Use `superpowers-lite:lite-arena` when the user asks for an arena, a multi-candidate contest, or several independent attempts at the same non-trivial artifact so one base can absorb the strongest parts of the others.

Use `superpowers-lite:lite-swarm` when the user asks for a swarm, parallel coverage, a race, a gauntlet, or parallel exploration that should return one consolidated report.

Both stay explicit. They are not coding phases and they are not a substitute for ordinary `DELEGATED` or `MIXED` execution. Prefer ordinary delegation when one clear unit of work needs a worker. Prefer Arena when competing artifacts must be compared and grafted. Prefer Swarm when slices or identical race arms must return one evidence report.

Do not assume cloud agents, a fixed model panel, or worktrees. Follow each skill's host-capability rules. If the host cannot run the needed candidates or workers, stop and say so.

A request that is only Arena or Swarm stops coding-workflow routing after that skill finishes, unless the user also asked for implementation, specification, or review. Preserve an active manual role's scope and stopping boundary.

## Route Context Recovery And Progress

Use `superpowers-lite:lite-recall` when the user asks to recall recent work, catch up on a topic across chats, find where they left off, or rebuild working context before starting or resuming. It is not a catch-up of only this chat's new progress; that is ketchup.

Use `superpowers-lite:lite-ketchup` when the user asks for ketchup, a catch-up on this chat since their last message, or what is waiting on them now. Keep that turn read-only.

Use `superpowers-lite:lite-ketchup-video` when the user asks for ketchup-video or a short subtitled catch-up video. It follows ketchup, replaces the summary and visuals with a rendered video, and keeps waiting calls as text.

Use `superpowers-lite:lite-show-me-your-work` when the user asks to show your work, keep a decision trail, or leave a reviewable log for long-running, multi-phase, or unattended work. Other skills that need an audit trail should reference it rather than invent a format.

These stay explicit. They are not coding phases. Do not start them automatically at task completion or manual-role handoff. A general recap does not authorize an AGENTS.md edit. Preserve an active manual role's scope and stopping boundary.

A request that is only one of these stops coding-workflow routing after that skill finishes, unless the user also asked for implementation, specification, or review.

## Route Habit Capture And Mistake Hardening

Use `superpowers-lite:lite-automate-me` when the user asks to automate me, create or refresh a personal `-mode` skill, or capture working preferences into a skill. It writes only a project-local mode skill, defaulting to `.agents/skills/<handle>-mode/`.

Use `superpowers-lite:lite-reflect` when the user asks to reflect, or to turn this conversation into durable edits on existing skills. It reports Accepted / Rejected / Backlog and edits only after approval, only inside the project.

Use `superpowers-lite:lite-correct` when the user asks to correct repeated agent mistakes in this repo, or to make a recurring error hard to repeat. It changes architecture, types, lint/CI, or tests first; judgment-call instruction text goes through `superpowers-lite:lite-maintaining-agents-md`.

Keep `superpowers-lite:lite-maintaining-agents-md` as the only writer of the project-root `AGENTS.md`. Do not merge these three into that skill. All four stay explicit and project-scoped: do not write outside the project tree.

A request that is only one of these stops coding-workflow routing after that skill finishes, unless the user also asked for implementation, specification, or review. Preserve an active manual role's scope and stopping boundary.

## Route the Request

For questions about how to install or use Superpowers Lite, or which Lite skill to choose, use `superpowers-lite:lite-help`. If the host has no skill-invocation tool, read and follow [lite-help](../lite-help/SKILL.md). A help question ends with guidance. If the user also explicitly asks to do the work, continue only with that work under the existing workflow and scope.

1. Distinguish coding work from remote administration, remote diagnosis and recovery, and remote or artifact file transfers. Route operational requests as above; apply the coding classifications below only to coding work. For explanation or writing requests, honor any explicit selection of `superpowers-lite:lite-teach`, `superpowers-lite:lite-how`, `superpowers-lite:lite-why`, `superpowers-lite:lite-unslop`, or `superpowers-lite:lite-technical-writing` and their dependency calls, then stop coding-workflow routing. Otherwise answer ordinary explanation or conceptual questions directly. For a request that only vets a measured performance number or investigates what else a change breaks, honor `superpowers-lite:lite-benchmark` or `superpowers-lite:lite-blast-radius` and stop coding-workflow routing. For a request that only runs a multi-candidate contest or a parallel swarm report, honor `superpowers-lite:lite-arena` or `superpowers-lite:lite-swarm` and stop coding-workflow routing. For a request that only cleans comments in a named scope, honor `superpowers-lite:lite-no-comments` and stop coding-workflow routing. For a request that only rebuilds recent context, catches up on this chat, renders a catch-up video, or keeps a decision trail, honor `superpowers-lite:lite-recall`, `superpowers-lite:lite-ketchup`, `superpowers-lite:lite-ketchup-video`, or `superpowers-lite:lite-show-me-your-work` and stop coding-workflow routing. For a request that only captures a project-local mode skill, reflects into skill edits, hardens repeated mistakes, or maintains AGENTS.md, honor `superpowers-lite:lite-automate-me`, `superpowers-lite:lite-reflect`, `superpowers-lite:lite-correct`, or `superpowers-lite:lite-maintaining-agents-md` and stop coding-workflow routing.
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

For parallel work that writes, split units by the resources they actually modify. Give independent writes separate targets. If units must modify the same target, assign it to one writer or schedule those writes in sequence.

Use MIXED execution when different work units benefit from different modes. Execution mode may change as actual boundaries become clearer; adjust it without creating an orchestration workflow.

`superpowers-lite:using-lite` chooses the execution mode. Given that choice, `superpowers-lite:lite-writing-plans` decides how much planning detail is useful; it does not decide whether sub-agents should be used.

### Adapt to Host Capabilities

Treat execution mode as a portable preference, not a dependency on a particular coding agent or tool surface.

- Never assume that sub-agents, parallel execution, or specialized agent roles are available.
- If delegation is unavailable, execute the selected workflow INLINE without changing its workflow depth or skipping useful phases.
- If generic delegation is available but specialized roles are not, delegate only when a self-contained brief and the generic agent are sufficient for the work unit.
- Use specialized roles only when the host explicitly exposes them and their responsibilities match the task.
- Do not block the task, reduce confidence checks, or ask the user to install agents merely because optional delegation is unavailable.

A missing execution capability changes how the work is performed, not what reasoning, testing, or verification the task needs.

### Select Exploration Depth When Available

When read-only exploration would benefit from delegation, match the exploration depth to the available role:

- Prefer a fast, bounded exploration role for focused file or symbol discovery, tracing a known execution path, locating relevant tests, and finding an existing implementation pattern.
- Prefer a deeper-capability exploration role, or keep the work INLINE, when subsystem boundaries or the failure domain are unclear, the trace crosses multiple components, or the task involves consequential concurrency, lifecycle, security, persistence, or architectural concerns.
- If fast exploration returns contradictions or material evidence gaps, escalate to a deeper available role or continue the investigation INLINE instead of repeating shallow scans.

If the host exposes no specialized exploration role, perform the necessary exploration INLINE or use a generic delegated agent only when the task can be made self-contained.

| Complexity | Inline execution | Delegated execution |
|---|---|---|
| SIMPLE | Usually no plan | Short, self-contained task brief |
| STANDARD | Brief plan when organization adds value | One short brief, or a high-level plan plus just-in-time briefs for multiple coordinated tasks |
| COMPLEX | Brief or medium implementation plan | High-level plan plus just-in-time detailed briefs for multiple coordinated tasks |

For MIXED execution, apply the appropriate column to each work unit.

### Use Durable Delegated Handoffs Only When Needed

Direct prompts and short worker reports are the default handoff for DELEGATED and MIXED work. Do not create files merely because a sub-agent is involved.

Use a durable execution workspace only when direct handoff has a meaningful reliability or context cost: compaction or interruption could lose execution state, a brief or report is too large to pass cleanly in messages, the same handoff must be consumed by multiple agents, or several coordinated delegated units need stable shared results. Do not activate it for one short isolated delegated task or to preserve a process record.

When those conditions apply and the work already justifies a persisted implementation plan, read and follow [delegated-execution-workspace.md](references/delegated-execution-workspace.md). Do not persist a plan solely to enable the workspace; if the task does not independently justify a plan file, keep the handoff direct.

## Skip Unneeded Phases

Use `superpowers-lite:lite-brainstorming` only when consequential design uncertainty remains. Skip a spec for a trivial change and a plan when implementation is one obvious unit. Use meaningful testing where it protects behavior; a simple task may perform an obvious check without invoking `superpowers-lite:lite-testing`. Use `superpowers-lite:lite-verification` before making a completion claim.

## Converge Optional Code Review

Code review is optional. When it adds value, use it as a bounded task-convergence gate, not an open-ended search-and-repair loop. The default automatic budget for one reviewed task is one pre-review acceptance correction wave, one broad review, one post-review batched fix wave, and one scoped re-review. If continuing would exceed any limit, trigger the breaker; never add another automatic attempt merely because it might help.

The default bounded path is: implementation → frozen planned acceptance → at most one pre-review correction → one broad review → one batched fix wave → refresh invalidated acceptance evidence → one scoped re-review → complete or breaker. If the user requests code review before final performance or operational acceptance, keep that order: scope the review and evidence to implementation/correctness, then complete the already-planned acceptance before claiming the whole task complete. This does not add an automatic second broad review. Later acceptance failures use any remaining applicable correction/re-review budget; they do not reset it.

### Gather Acceptance Evidence First

Before the first planned acceptance run, the Controller freezes a reasonable scope selected from the task's acceptance criteria and risk. Exercise the real CLI, API, or UI entry when the task changes externally observable behavior; focused integration checks may be sufficient for library or internal-only work. Do not invent an end-to-end test for ceremony.

Planned acceptance gathers evidence; it is not an open-ended repair loop. If it exposes implementation failures, collect the currently known failures and allow one batched pre-review correction wave. Then rerun only the failed checks and checks directly invalidated by that correction. If the planned acceptance criteria still do not pass, stop, report the remaining blockers, and ask the user whether to continue. Do not start another automatic correction or the broad review.

Do not grow acceptance scope through an acceptance → fix → invent-more-acceptance loop. After the first run, add a check only when the original criterion cannot actually prove the claimed behavior, existing evidence is shown invalid, or the correction directly changes explicitly required behavior that was not covered.

Give the reviewer the task requirements and acceptance criteria, implementation diff, implementer or worker report, applicable test and acceptance evidence, and known failures or concerns. Identify any agreed later acceptance explicitly. Missing evidence required for the current review prevents a ready verdict for that scope; later-stage evidence does not prevent an earlier review the user requested.

### Review the Task Broadly Once

The first and only broad review covers the whole implementation within the declared review scope rather than isolated changed files: requirements, applicable acceptance criteria, the implementation diff, cross-file and cross-layer invariants, important failure paths, equivalent entry paths, integration boundaries, evidence, and regression risk. Check the requested outcome as well as local compliance with the Plan; inspect important semantic results rather than accepting completion labels. Stay within task scope; this is not a repository-wide architecture audit. If a safety judgment in this review depends on a fact not yet checked, use `superpowers-lite:lite-blast-radius` for that fact and include the result in this review. Reuse an existing result for the same change. Do not open a second review.

Report all reasonably discoverable substantive findings together. When one path violates an invariant, inspect the other task-relevant paths that share it now. A reviewer must not intentionally save discoverable blockers for later rounds.

Classify every finding:

- **BLOCKING:** it violates an explicit requirement or acceptance criterion; causes a correctness failure in a currently supported use; risks realistic data loss, corruption, or unrecoverable state; breaks compatibility promised by the task; directly introduces a security issue; breaks the task's main product flow; or invalidates the task's verification conclusion.
- **DEFERRED:** it is pre-existing and outside the requested work, otherwise out of scope, speculative, future hardening, an architecture or optional refactor improvement, a style preference, relevant only to an unsupported model or future feature, or otherwise unrelated to the task. A defect needed to fulfill the current task is not deferred merely because it predates the changes.

Only BLOCKING findings enter repair. A real issue is not automatically a blocker for this task.

Distinguish requirement violations, code defects, inaccurate reports, and proposed improvements. A reporting error does not retroactively strengthen the implementation contract. A material requirement ambiguity needs clarification, not a stricter interpretation introduced during review. Do not silently turn a scheduled item into an exclusion or an in-scope defect into optional residual work.

If the broad review has no BLOCKING findings, the review gate is clean; do not create an empty fix wave or re-review. Complete the task only when its remaining agreed acceptance is also satisfied.

### Fix Once, Then Re-review Once

Send the complete blocking batch to the same implementer or delegated worker in one fix wave. Fix the shared invariants rather than only the cited lines, check directly affected adjacent paths, and return one result with focused regression evidence for the whole batch without expanding into unrelated work or future tasks. Do not repair and review findings one at a time.

Before scoped re-review, identify acceptance evidence invalidated by the fix wave and refresh only the checks that cover changed behavior. Prefer the affected black-box, integration, or acceptance checks; rerun the complete acceptance set only when the fix's reach invalidates it all. Give the refreshed results to the scoped reviewer. Do not postpone this post-fix evidence refresh until after a clean re-review.

The single scoped re-review receives the focused fix evidence and any refreshed acceptance results, then:

1. marks each original blocker `ADDRESSED` or `NOT ADDRESSED`; and
2. checks only the fix diff, directly affected execution paths, and necessary adjacent paths sharing the original invariant for regressions introduced by the fix.

It is not a second broad review, repository scan, hardening pass, or reason to repeat all verification. Read applicable fix evidence and run only the minimum scoped check needed.

### Break the Loop

After scoped re-review, stop automatic repair:

- If clean, close the review and complete any already-agreed later acceptance within its authorization before claiming task completion. Do not invent new verification scope. A clean scoped re-review should normally be the final automatic review gate.
- If an original blocker remains, a fix introduced a blocking regression, or blocking status is disputed, report the unresolved finding, what the worker tried, the cause or impact, which fix introduced a regression when applicable, and whether further repair is recommended. Ask the user whether to continue; do not dispatch a second fix wave automatically.
- Record unrelated observations, pre-existing issues outside the requested work, and optional hardening as DEFERRED without reopening the task.

A task-scoped issue is a `REVIEWER MISS` when it already existed during broad review, was within that review's scope, was reasonably discoverable then, and is first raised during scoped re-review. A reviewer miss never starts another automatic repair wave. If it satisfies the existing BLOCKING admission rules, trigger the breaker and report the late blocker, why the broad review should have found it, and its impact; the user decides whether to authorize more repair. Otherwise classify it as DEFERRED without reopening the task.

After a clean gate, newly imagined tests or extra coverage are DEFERRED. Reopen only when an explicit acceptance criterion was not actually checked, existing evidence is shown invalid, or a critical correctness or data-corruption problem appears.

Trigger the same breaker early when elapsed time is clearly disproportionate, worker/reviewer traffic is abnormal, or the same invariant repeatedly fails to converge.

## Keep the Workflow Lightweight

Artifacts are a tool, not a requirement. A phase does not imply a file.

- SIMPLE: create no workflow artifacts.
- STANDARD: keep short work in the session by default.
- COMPLEX: persist only when durable context clearly helps.

When a spec or plan is persisted, place it predictably:

1. Follow an explicit user-provided location.
2. Otherwise, follow a clear existing project convention.
3. Otherwise, use these repository-relative defaults:
   - specs: `docs/specs/NNN-YYYY-MM-DD-slug.md`
   - plans: `docs/plans/NNN-YYYY-MM-DD-slug.md`

Treat `NNN` as a repository-wide work-item number shared by specs and plans, not as an independent sequence in each directory. Start at `001`; for a new work item, inspect both default directories and increment the highest existing numeric prefix. A spec and plan for the same work item reuse the same number, date, and slug. Never reuse or renumber an allocated number; continue with `1000` after `999`.

Use the date on which the work item was first documented and a short lowercase kebab-case slug. Recheck the candidate number immediately before creating a file so concurrent work does not silently reuse it. The phase-owning skills define how to apply these defaults without turning persistence into a requirement.

Do not force worktrees, branches, commits, pull requests, reviewers, sub-agents, or orchestration. Use them only when they provide clear value for the current task and environment. The workflow serves the task.
