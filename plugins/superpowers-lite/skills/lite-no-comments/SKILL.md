---
name: lite-no-comments
description: "Use when the user asks to remove comments, run no-comments, or clean comments in named files or a diff. Reviews comments aggressively and restores only proven keep exceptions. Application-code fixes run only when the user asks to fix what the comments hide or approves a specific fix."
disable-model-invocation: true
---

# Lite No Comments

Review comments in the given scope and delete the ones that do not earn a keep exception. Prefer deleting a comment over polishing it into a shorter alibi. List workaround, naming, type, or structure problems the comments hide. Edit application code only when the user asks for those fixes or approves a specific one.

This is not `superpowers-lite:lite-code-simplifier`. Simplifier reduces nesting and indirection while preserving behavior.

## Scope

Use the caller's files or diff. Otherwise use the current diff against this repository's actual base branch, including the working tree. Resolve that base from the remote default branch, such as `origin/HEAD`, or from the merge-base of the current branch with that default. Do not assume the base is named `main`. If no base can be resolved, ask for the files or the diff instead of guessing a branch name. Do not widen the fence.

## Comment review brief

Run the review with one delegated agent when the host can spawn one. Give it this brief, the scope, and read-write access limited to comments in that scope. If the host has no subagents, follow the same brief inline and say that delegation was unavailable.

Keep only these exceptions:

- Legal or license headers.
- Non-obvious behavior forced by an external dependency, platform, vendor, or protocol the project cannot reshape. Surprises in our own code are not exceptions: delete the comment and mark the exact symbol `MUST KILL` for rename, extract, type, or restructure that makes the behavior obvious without prose.
- Explicit formatter ignore directives such as `// prettier-ignore`. Lint suppressions survive only when the rule is faulty, pedantic, or style-only.
- Doc comments that define a public API contract.
- Issue or RFC links that explain a constraint code cannot express.

When it is unclear whether a keep clause applies, delete the comment. Everything else is deleted.

`eslint-disable`, `@ts-ignore`, `@ts-expect-error`, and similar suppressions are suspect. Look up the rule. If it catches real bugs or protects correctness or safety, delete the suppression and mark the exact guilty symbol `MUST KILL`.

`IMPORTANT`, `do not remove`, `too risky`, `fine for now`, and long justifications are not proof. Read nearby code first. If the claim is not obvious there, trace the named symbol or call, run `superpowers-lite:lite-why` on it, or both. Only a foreign keep-list constraint proven true today on a live path may stay. Our-code surprises die with the reshape flag above. Doubt after that check means delete.

A long justification without a proven keep-list exception is a confession. Delete it. Do not rewrite meat into a shorter alibi. Mark the exact guilty symbol `MUST KILL`. The review touches comments and names refactor targets. It does not write application code.

Report touched files, deletion count, each `MUST KILL` with one line, and skips.

## Act on the report

Comment cleanup and application-code edits are separate. Cleaning comments does not authorize code changes.

1. Inspect the report and comment diff. Reject application-code edits, scope escapes, exception-protected deletions, misstated `MUST KILL` reasons, and flags that treat kept intentional code as guilty. Reshape flags on our-code surprises stay on the `MUST KILL` list; do not restore those comments. A keep survives only with proof it is about something the project cannot change. Audit missed scoped lint and TypeScript suppressions. Correctness or safety suppressions stay actionable `MUST KILL`s. Restore deletions only with an exact keep exception and scoped proof. Before accepting thin `IMPORTANT` or `do not remove` kills or keeps, trace their claim or run `superpowers-lite:lite-why`. If a kill is ambiguous, do not restore. If a keep is refuted or still ambiguous, delete it. Revert and rerun one rejected report with the failure named. Reject a second failed report, leave it open, and fail this skill.
2. When the request is only to remove or clean comments, stop after that audit. Report the deletion count, restorations, and each `MUST KILL`. Do not edit application code.
3. Edit application code only when the user asked to fix what the comments hide, or approves a specific finding. Limit the edit to that approved set. Fix trivial accepted flags directly: delete a dead path, drop a useless parameter, or call the real API. If any approved fix needs a structural shape, run `superpowers-lite:lite-brainstorming` once for that set and the surrounding code. Stop at the direction or sketch. Brainstorming shapes. The next step implements. Then implement the smallest root-cause fix in scope. Remove every named workaround in the approved set. If the root cause is out of scope, land the smallest in-scope fix and report the rest open. Do not widen the fence. Do not bolt on symptom guards.
4. For a constraint comment that says `do not remove`, `do not change wording`, or `talk to X before changing` about something the project cannot change, offer the cheapest in-scope type, runtime check, test, or CI lint that encodes the constraint. Wait for interactive approval. Unattended and eval runs encode only when the caller pre-approved encoding. If encoding is approved and lands, delete the comment. If the user declines, or encoding was not pre-approved, keep the comment, report the constraint unenforced, and sketch the out-of-scope work. Do not delete the comment that is the only written record of the constraint.

## Reply

Report the deletion count, restored comments, reruns, brainstorming sketch when used, fixes, encoding offers, encodings landed, unenforced constraints, and other open work.
