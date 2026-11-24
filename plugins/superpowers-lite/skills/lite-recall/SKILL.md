---
name: lite-recall
description: "Load when the user asks to recall recent work, rebuild working context across recent chats and Git/PR state, or find where they left off ('恢复上下文', '上次做到哪了')."
---

# Lite Recall

Before you start or resume work, rebuild the user's recent working context and hand back a tight capsule of where things stand and what to do next.

Keep it tight and on-topic. Read only what the in-scope threads need, then stop.

Working context lives in two records. Chat history holds what agents did and decided. The shared record holds what happened to the same code under other names: user-reported symptoms, shipped then reverted fixes, and errors still firing. That second record lives in source control, the issue tracker, chat and issue channels, long-form docs, and error tracking. A feature with a long bug tail keeps most of its story there, so do not reconstruct it from transcripts alone.

## Scope

1. Classify, then route. Resuming one named prior chat is out of scope for this skill. Turning habits into a durable personal skill is a different task. A human-readable summary of your work is a different task. Recall loads working context across recent chats before you act. If the user already gave a full state capsule (paths, branch, the change), use it and skip the mining.
2. Lock the scope before searching. Pin the window ("recent" is a real range, default the last 7 days), the topic if named, and the workspace (default the active one). Never read another project's transcripts without being asked. State the scope back. Never quietly turn "all" into "recent N".

## Mine chat history

Prefer the host's session or transcript tools when they expose the active workspace's history. On Cursor, transcripts often live at `~/.cursor/projects/<slug>/agent-transcripts/<uuid>/<uuid>.jsonl`, where `<slug>` is the workspace path with the leading slash dropped and each `/` turned into `-`. Other hosts may use different paths; use what the host documents or already provides for this workspace. Do not invent a path for another product, and do not scan unrelated projects.

Fan out across chat history when there are more than a couple of candidate chats. Spawn parallel subagents when the host can, each taking a slice. Tell every worker to order candidates by real modification time, never by UUID name; grep the topic first, then read only matching chats and only their relevant regions; skip the current chat plus obvious noise (subagent, eval, and test chats). Each returns the same schema, one block per chat: topic, the user's goal, decisions, open threads, struggles and corrections, and artifacts (PRs, tickets, branches), each citing a stable chat id. For one or two chats, skip the fan-out and search directly. Raw transcripts stay with the workers. The main thread gets only their findings.

If the host cannot delegate, search directly and say so. Prefer a fast, cheap available model for slice mining when the host exposes one; do not require a named Cursor model panel.

## Sweep the shared record

Whenever the topic names a feature, file, subsystem, area, or bug, sweep the shared record. This is the default, not a judgment call, and "my work on X" does not exempt it. Spawn one investigator per available source when the host can, and ask each for current state, what was tried and did not hold, and what users still report. Run them in parallel with chat-history mining when possible. Null results are findings. Skip an unavailable source or MCP and say so. Fold what comes back into the brief. Skip this step only for pure activity recall with no named target ("what did I do this week"), where chat history and live state are the entire answer.

## Verify against live state

Take the PRs, branches, and tickets that mining and the sweep surfaced and check them with `git` and the host's issue or PR tools when available. When the answer hinges on what an agent actually did (tools it ran, files it read, errors it hit), read the full transcript for that chat, not only a trimmed local copy.

## Output contract

Lead with the capsule, then the thread status, then the problems, then the next move. Deeper detail goes below or gets cut. Answer in the user's language. For a Chinese or English brief, run the wording through `superpowers-lite:lite-unslop` (or read and follow [lite-unslop](../lite-unslop/SKILL.md) when model invocation is unavailable).

- **Capsule.** At most 5 bullets. What this work is and where it stands overall.
- **Threads.** One line each, prefixed with one status tag. Use `[merged #N]`, `[open PR #N]`, `[in flight <branch>]`, `[committed, no PR]`, `[verified, uncommitted]`, `[verification blocked]`, `[reverted #N]`, or `[planned, not started]` when that tag matches. If none matches, including when the current state cannot be checked, put the actual state in brackets, such as `[committed locally on feature/search, no PR]` or `[verification blocked: CI credential missing]`. Do not force a tag that misstates the state.
- **Problems.** At most 5, the recurring ones. Include the symptoms users keep reporting and any fix that shipped and was reverted, so the next attempt starts where the last one failed.
- **Next move.** The single most useful next action, concrete.

An adjacent feature or ticket stays out unless it blocks this one. When the capsule and thread lines outgrow a screen, cut detail before you cut threads. Cite chat findings by chat id and shared-record findings by their source (PR #, ticket ID, chat permalink, error-tracker issue). Sanitize private context before any public output.

**Reply:** the brief, to the contract above.
