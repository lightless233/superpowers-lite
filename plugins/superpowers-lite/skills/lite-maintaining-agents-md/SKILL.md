---
name: lite-maintaining-agents-md
description: Audit a project's root AGENTS.md or distill durable project instructions from the current session when the user requests AGENTS.md maintenance. A general recap or task completion does not authorize edits.
---

# Lite AGENTS.md Maintenance

Keep project instructions concise, useful, and supported by evidence. Capture stable guidance for future work, not a history of the current task.

## Interpret the Request

- A request to inspect, audit, or suggest improvements is read-only: report concrete issues and a proposed patch.
- A direct request to update the project's AGENTS.md, or to summarize durable lessons into it, authorizes the corresponding minimal edit. Do not ask for the same permission again when the scope is clear.
- Selecting this Skill alone, finishing a task, or asking for a general recap does not authorize an edit. If the intended operation is missing, ask what the user wants done.

This is a separate maintenance task, never an automatic final phase. Preserve the input and stopping boundaries of any active Elephant or Goldfish stage; do not use maintenance to retrieve excluded author context or store task answers for another model.

## Establish the Only Write Target

1. Identify the development project from the user's supplied path or the current Git working tree root. Without Git, use a clearly established project directory. Ask only when the project is ambiguous; do not select a project by searching for the nearest AGENTS.md.
2. State the project root and the sole permitted target: `<project-root>/AGENTS.md`. Resolve the real paths before editing. Do not treat a home directory, harness configuration directory, or installed plugin/cache directory as the development project.
3. Read applicable instructions as required, but keep global instructions, parent-directory files, nested AGENTS.md files, AGENTS.override.md, and other harness instruction files outside the write scope. Do not update them, create substitutes, or copy module-specific rules into a wider scope.
4. A known global-instruction template or mirror remains protected even when stored in a repository. Do not summarize project lessons into it. Reject a target that is a symbolic link, resolves outside the selected project, or is known to share the global instruction file. If its role or destination is unclear, report the ambiguity before editing.
5. If the root file is absent, report that and propose minimal content. Create it only when the user explicitly requests creating or initializing the project's AGENTS.md.

A request naming another location does not silently widen this Skill's project-root scope. These instructions constrain the workflow; they do not replace the harness's filesystem permissions.

## Select Durable Guidance

For a session-summary request, use the current session's confirmed decisions and relevant project evidence. For an audit, inspect only enough implementation, configuration, or existing documentation to assess the requested instructions. Do not retrieve unrelated conversations or task memory.

Useful candidates include:

- established build, test, or development commands and their non-obvious prerequisites;
- stable module boundaries, integration contracts, and project conventions that materially affect future edits;
- a recurring workflow trap or misleading default supported by the implementation; and
- project-specific constraints or engineering decisions the user has actually confirmed.

Keep a candidate only if it is likely to remain useful after this task and is not already covered. Record actionable guidance at its proper scope, not a narrative about how it was discovered. No useful durable lesson means no change.

Exclude task progress, completed-action lists, timestamps, commit or deployment history, current environment/service status, debugging transcripts, temporary workarounds, unresolved hypotheses, secrets, and personal or global preferences. Keep feature requirements, Specs, Plans, review findings, and session handoffs in their proper artifacts. An agent's proposed abstraction or preferred fallback does not become a project rule merely because it was suggested or implemented.

Check factual claims against the relevant code and configuration. Distinguish a command found in configuration from a command actually run successfully; do not claim broader validation than the evidence supports. Do not install dependencies, deploy, or run unrelated expensive checks merely to improve the document.

If existing instructions conflict with the implementation, identify whether they describe a stale fact or prescribe intended behavior. Correct established stale facts within an authorized update, but do not weaken a user constraint or decide an unresolved design conflict by following current code. Surface the conflicting sources and ask only for a consequential decision that is still missing.

## Make a Focused Update

Identify the exact additions, corrections, or removals and their evidence. For read-only requests, present the proposed patch and stop. For an authorized update, apply it without an extra approval ritual unless a material decision remains unresolved.

Preserve unrelated content, user edits, language, and structure. Merge overlapping guidance instead of appending duplicate sections. Use a short instruction or a link to authoritative project documentation when sufficient. Do not impose a quality score, fill a fixed template, or add generic engineering advice.

Immediately before writing, recheck the target and its current contents so concurrent changes are preserved. Afterward, inspect the diff to confirm that this maintenance task changed only the permitted project-root file and introduced no transient records. Check affected factual claims as needed; a prose-only edit does not require a full test suite.

Report the target, the material changes or proposed changes, supporting evidence, and unresolved conflicts. If nothing qualifies, say so. Stop after maintenance; do not synchronize global files, advance a manual role stage, or start a review-and-fix loop.

The maintenance idea is inspired by [Anthropic's CLAUDE.md management plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management); this Skill uses its own project-root scope and Lite workflow.
