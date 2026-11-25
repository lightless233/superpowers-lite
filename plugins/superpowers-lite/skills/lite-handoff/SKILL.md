---
name: lite-handoff
description: "Load when the user wants to hand off the current chat to a fresh session (writing a one-time handoff note) or pick up and clean up an existing handoff note in a new session ('写个交接', '开新对话前交接', '接手交接文档')."
---

# Lite Handoff

Transfer chat-only decisions, open tails, and exact stopping points cleanly across a deliberate session reset without creating durable stale docs or touching `AGENTS.md`. Answer in the user's language.

Keep scope distinct: use `superpowers-lite:lite-recall` to mine past chats when no handoff exists, and `superpowers-lite:lite-ketchup` for in-chat catch-up. Use `lite-handoff` only for same-workflow session resets—never to replace Elephant/Goldfish manual cross-role handoffs (`manual-handoff-contracts.md`), and never leak author-session context into blind review stages (`spec-clarity`). Never append `lite-handoff` automatically at task completion, and skip writing a handoff when work is already cleanly committed and captured in a Spec/Plan.

## Mode 1: Write Handoff (before closing an old session)

1. Keep product code untouched.
2. Honor an explicit user path first; otherwise default to `.runtime/handoff-<YYYYMMDD-HHMM>-<slug>.md`. When using the default `.runtime/` target inside a Git repo, verify `.runtime/` is ignored via `git check-ignore`; if not ignored (or if the user asks for no file), print the handoff block inline in chat instead of leaving an untracked file that pollutes `git status` (skip the gitignore check outside Git repos). Never create tracked `HANDOFF.md` files or edit `AGENTS.md`.
3. Keep it concise (**at most ~35 lines**; shorter is fine, never pad) and record only what a fresh session cannot infer from Git/code plus minimal pointers:
   - **Goal & Stop Point**: task goal, what is already completed and verified, and the exact next action or approval boundary.
   - **Settled & Rejected Decisions**: choices agreed in chat and rejected options with reasons so the next session does not re-propose dead ends.
   - **Open Tails & Gotchas**: deferred verbal follow-ups, environment quirks, live services/processes not to disturb, and pitfalls already hit.
   - **Anchors**: current branch, `HEAD` SHA, dirty/unpushed status, and relevant Spec/Plan/code paths. Never paste diffs, code dumps, long logs, or secrets/tokens/credentials.
4. **Reply**: state the written path (or show the inline block) and provide one short ready-to-paste prompt for the new session. Include the current host's explicit skill invocation syntax when known (e.g., `$superpowers-lite:lite-handoff`), or—when the host is unknown—plainly instruct the new session to verify live state first and delete the `.runtime/` file only if no blocking mismatch is found.

## Mode 2: Pick Up & Clean Up (at the start of a new session)

1. Accept the handoff from: (a) an inline handoff block pasted in chat, (b) a user-named file path, or (c) scanning `.runtime/handoff-*.md`. If multiple `.runtime/handoff-*.md` files exist, list them by modification time and ask which one to pick up instead of guessing; if none exist, say so and ask for a file path, an inline block, or whether to run `lite-recall` instead.
2. **Verify Against Live State**: treat the handoff as intent and decisions, not proof of current repo or runtime state. Run `git status --short --branch` and `git log -n 5 --oneline` (plus read-only live API/service checks when the next step depends on them) and flag any discrepancy before acting.
3. **Delete Only After Clean Absorption**: when picking up from a `.runtime/` file, delete that one-time file **only** if live-state verification found no blocking mismatch (wrong repo/branch/worktree, unexpected HEAD/dirty state, etc.), the content is fully absorbed in your reply, and the user did not ask to keep it. On any blocking mismatch, leave the file untouched and report the discrepancy first. Skip deletion for inline handoffs; never delete tracked files or files outside `.runtime/` without explicit user confirmation.
4. **Reply**: give a 3–5 bullet pickup confirmation (goal, key constraints/rejected paths, live-state check, and—when actually performed—the deleted `.runtime/` file; omit deletion status for inline handoffs or mismatch-preserved files), then proceed only if the user's message authorized action; otherwise wait for go-ahead.
