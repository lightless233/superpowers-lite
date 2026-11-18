---
name: lite-automate-me
description: "Use when the user asks to automate me, create or refresh a personal -mode skill, or capture their working preferences into a skill agents will follow. Drafts or revises a project-local <handle>-mode skill from recurring patterns in this project's history."
disable-model-invocation: true
---

# Lite Automate Me

Turn the user's working conventions into one project-local `-mode` skill agents will follow (for example `jay-mode`).

This skill owns mining, drafting, and landing that mode skill inside the current project. It does not replace ordinary task-specific skill authoring, and it does not edit the project-root `AGENTS.md`.

## Project scope

1. Identify the development project from the user's path or the current Git working tree root. Ask only when the project is ambiguous.
2. Write the mode skill only inside that project tree. Do not write home-directory skills, harness global skill folders, installed plugin caches, or another repository.
3. Mining may read host session or transcript records bound to this project, even when the host stores them outside the project tree. Do not mine another project's chats, and do not read unrelated personal skill directories.

## Placement

- If a matching `<handle>-mode` skill already exists under the project, update that path in place.
- Otherwise create `<project-root>/.agents/skills/<handle>-mode/SKILL.md`.
- If the project already has an established in-repo skills directory and an existing personal category for that handle, keep using that in-repo location. Still do not write outside the project.

Frontmatter defaults:

- `description` triggers on the handle, `/<handle>-mode`, and "work in their style", not on generic verbs like "write code".
- `disable-model-invocation: true` unless the user explicitly wants the mode on every turn.

## Flow

### 0. Check for an existing mode

Search the project for `**/SKILL.md` whose directory or name matches `<handle>-mode`. If one exists, confirm update versus start fresh unless the user already said to update. Update mode mines only history since that skill's last edit, asks what changed or is missing, and preserves sections the user has not contradicted.

### 1. Mine recurring patterns

Survey recent agent conversations for this project. When there are many chats and the host can delegate, fan out across time slices; otherwise search directly and say so. Cross-check before elevating a signal. Patterns in 2+ slices are high-confidence. Lone signals are usually dropped.

Default signals:

- Response preferences (length, tone, format, repeated "make it simpler" corrections)
- Autonomy and delegation habits
- Verification posture (what "done" means)
- Code and prose discipline
- Process conventions inside this repo (commits, PRs, review tooling)
- Meta preferences about fixing or proposing skills

### 2. Ask the user directly

Mining misses intent that has not come up. Ask one or two structured multi-choice questions with a few options each, then one short free-form catch-all. Do not dump a long questionnaire. Use the host's structured question tool when available; otherwise ask in chat.

### 3. Cluster and draft

Group combined signals into only the sections that apply. Common ones: response style, autonomy, understand-first habits, subagents, prose/code discipline, review and verify, process, skills. Skip empty sections.

Draft a short operational mode skill. Reference other skills by name or in-repo path; do not paste their contents. For Chinese or English prose, run wording through `superpowers-lite:lite-unslop`. Show the draft and iterate with the user. Cut ruthlessly. A mode skill is not a manual.

### 4. Land it

Write only the chosen project-local path after the user accepts the draft. Follow this repository's ordinary commit habits when the user asks to commit. Do not require a worktree or a pull request.

## Guardrails

- Do not overfit to one conversation. Prefer multiple instances before codifying a rule.
- Do not restate other skills, invent metaphors, or write poetic prose for an agent reader.
- Use "the user" or "the human" in imperatives, not the author's first name.
- A preference stated once and contradicted later is noise.
- Do not edit `AGENTS.md`. Project-level durable instructions belong to `superpowers-lite:lite-maintaining-agents-md`.
- Do not turn a one-off task workflow into a mode skill. That is ordinary skill authoring.

## When not to use

- The user wants a task-specific skill, not working conventions.
- The user wants only project-root `AGENTS.md` maintenance: use `superpowers-lite:lite-maintaining-agents-md`.
