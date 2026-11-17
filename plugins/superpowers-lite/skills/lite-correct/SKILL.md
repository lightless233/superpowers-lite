---
name: lite-correct
description: "Use when the user asks to correct repeated agent mistakes in this repo, or to make a recurring error hard to repeat. Find mistake classes, fix them with architecture first, then types, lint/CI, tests, and docs last; prove each check on a real past mistake."
disable-model-invocation: true
---

# Lite Correct

The operator keeps correcting agents in this repo for the same mistakes. Change the repo so the next agent can't make them.

Assume every contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. Design the repo so a change that looks right from one file is right for the whole repo.

Stay inside this project. Do not write outside the project tree.

## Find the mistake classes

First, read recent commits, reverts, review comments, agent instruction files, and comments that explain workarounds. Group the mistakes into classes. A class counts once it has happened twice.

## Fix each class at the highest level that works

1. **Eliminate it with architecture.** Give each piece of state one owner and each task one supported way. Hide internals so the wrong import fails. Replace hand-synced lists with one source of truth. Delete old ways and dead code an agent would copy.
2. **Enforce it with types so the bad state can't be written.** If bad code still compiles, add a lint or CI check whose error names the file, type, or function to use instead. If the pattern is already common, fail only when a change adds more.
3. **Test the behavior.** Fix or delete any test that still passes when the behavior it checks breaks, or that fails when only the internals change.
4. **Write docs or agent rules last, only for judgment calls.** Nothing fails when an agent skips them.

The primary output is these in-repo changes: source, types, lint/CI config, and tests. There is no required report file.

## Fix and prove

Then fix the most frequent classes now, one commit each when the user wants commits. Prove each new check fails on a real past mistake. Run the same command locally and in CI when CI exists. Exceptions go on the offending line with a reason, an expiry date, and a human's approval.

## Agent instruction updates

If a judgment-call rule must be recorded, or a "rule ↔ enforcement" table must live in project instructions, do not edit `AGENTS.md` from this skill. Hand that part to `superpowers-lite:lite-maintaining-agents-md` with the exact rule text and what enforces it. If the rule was already in `AGENTS.md` and nothing enforces it, that is a repeat: fix enforcement at the highest level in the same change, then update the table through that maintenance skill.

Drop a rule once its mistake can't happen.

## Reply

For each class: evidence, the level you picked, why a higher level did not work, and what changed in the repo. Name any AGENTS.md update deferred to `lite-maintaining-agents-md`.
