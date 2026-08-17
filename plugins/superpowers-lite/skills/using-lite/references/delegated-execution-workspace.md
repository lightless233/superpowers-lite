# Delegated Execution Workspace

Use this reference only after `superpowers-lite:using-lite` has selected DELEGATED or MIXED execution and determined that direct messages are not reliable enough for the required handoffs or recovery state.

This workspace is short-lived, git-ignored execution state. It is not a workflow phase, project documentation, an audit log, or a reason to add delegation, planning, review, commits, or approval gates.

## Keep Direct Handoff as the Default

Do not create a workspace for one short isolated delegated task, for a brief and report that fit cleanly in direct messages, or merely because multiple agents exist.

Activate a workspace only when at least one material need exists:

- compaction, interruption, or cross-session continuation could lose execution state;
- a brief or report is too large to pass cleanly through direct messages;
- the same brief or report must be consumed by more than one implementer, reviewer, or fixer; or
- several coordinated delegated units need stable results from earlier work.

A workspace requires an implementation plan that was already worth persisting under the planning rules. Never persist a plan solely to obtain a workspace. If the work does not independently justify a plan file, use direct handoff.

## Scope the Workspace to the Plan

Use the persisted plan's filename without `.md` as the workspace name:

```text
docs/plans/001-YYYY-MM-DD-slug.md
.superpowers/execution/001-YYYY-MM-DD-slug/
```

Create `.superpowers/execution/.gitignore` containing `*` so the execution state remains outside `git status` and accidental commits without changing the repository's root `.gitignore`.

The workspace belongs to one exact plan. Record that plan's repository-relative path at the start of `progress.md`. Before reusing an existing workspace, confirm that the recorded path matches the current plan. If the same basename is already bound to a different plan, do not read, overwrite, or delete it; choose a distinct workspace name and record the exact mapping.

One controller owns a plan's workspace. Do not start two independent executions of the same plan in one working tree. Sub-agents dispatched by that controller may share the workspace as directed.

## Create Only Useful Files

When a workspace is activated, create:

```text
.superpowers/execution/<plan-stem>/
└── progress.md
```

Create these only when their handoffs require files:

```text
task-N-brief.md
task-N-report.md
```

Do not create review diff packages, complete test logs, TDD reports, chat transcripts, or speculative files for future tasks. Reviewers inspect the current repository and relevant Git diff directly.

### `progress.md`

Keep only the state needed to resume safely:

- exact plan path and overall `active`, `blocked`, or `complete` status;
- each work unit's `pending`, `in_progress`, `complete`, or `blocked` status;
- paths to any brief or report files that exist;
- concise decisions that affect downstream work; and
- concise blocker or verification summaries needed to resume.

Update it at meaningful transitions, not as a running transcript. Mark a unit `in_progress` before dispatch. Mark it `complete` only after the controller has inspected the worker result and the evidence appropriate to that point in the flow; a worker's completion claim alone is not sufficient.

### `task-N-brief.md`

Use a brief file only when the full task contract is too large for a clean direct dispatch or will be read by multiple agents. Make it the single source of the task requirements. The dispatch message should provide the path plus only the scene-setting, current interfaces, and rulings that are not already in the brief; do not duplicate the full brief in the message.

Create briefs just in time from the current repository state, plan, spec when present, and actual results of earlier work. Do not pre-create briefs for every future task.

### `task-N-report.md`

Use a report file only when detailed results must survive compaction or be consumed by the controller and another agent. Include only:

- what changed or was attempted;
- files changed;
- checks run and concise results;
- concerns, blockers, or incomplete work; and
- interfaces or decisions that affect downstream units.

The worker's direct response should then contain only its status, a short result summary, material concerns, and the report path. A report is handoff information, not completion evidence by itself.

## Resume Carefully

On resume, verify the recorded plan identity, inspect `progress.md`, and reconcile it with the current repository and relevant Git state before dispatching more work. Do not blindly trust stale task status or reports. Resume incomplete work from the smallest reliable boundary; do not re-dispatch units whose completion is supported by the current repository and applicable evidence.

If the workspace is missing or was cleaned, reconstruct state from the persisted plan, repository, Git history when available, and fresh inspection. Do not invent completion state from memory.

## Promote Durable Decisions and Clean Up

The workspace is not durable project history. Before cleanup, move any decision that permanently changes required behavior, a public or cross-component contract, or architecture into the appropriate spec, plan, or ADR. Report unresolved blockers and deferred concerns through the normal task completion path rather than leaving them only in scratch files.

After supported completion, remove only the exact workspace for the current plan and state that it was removed. Never delete `.superpowers/`, `.superpowers/execution/`, or sibling plan workspaces. Keep the current workspace when execution is interrupted, blocked, or awaiting user direction, and report its path so later work can resume.
