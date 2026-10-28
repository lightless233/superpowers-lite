---
name: lite-code-simplifier
description: Use for requested behavior-preserving code simplification or cleanup within specified code or a known task diff. Not a mandatory post-implementation step or a substitute for debugging, feature work, or performance optimization.
---

# Lite Code Simplifier

Make the identified code easier to understand and maintain where a concrete reduction in complexity is useful. Already clear code can remain unchanged. Fewer lines or a different personal style are not goals by themselves.

This is a model-agnostic Skill, not an automatically dispatched agent. In a manual Elephant or Goldfish workflow, the current stage's input, write, and stopping boundaries still govern. Review and planning stages do not gain permission to edit implementation. Goldfish's `implement` or `fix` may use simplification only within the authorized work; an optional cleanup suggestion does not become a required fix.

## Establish the Task and Scope

A request to assess code or propose simplifications is read-only. A direct request to simplify or clean up code authorizes useful edits within the stated scope; do not add a second approval ritual when the task is clear.

Use the supplied files, symbols, snippet, or diff range. Otherwise use only changes that are already clearly identified as part of the current task. An unspecified "recent changes" does not justify guessing the latest commit or scanning and rewriting the whole repository. Ask for the missing scope or Git base only when it cannot be established from the user's request and current task. For a supplied snippet, return the revised snippet rather than inventing a project file.

Read applicable project instructions and relevant callers, interfaces, types, and tests as needed to understand the scoped code. Modify only the authorized surface and preserve unrelated user edits. A materially broader refactor needs a separate scope decision, not an automatic expansion of cleanup.

## Preserve the Contract

Keep supported behavior and public interfaces intact, including input/output meaning, failure semantics, relevant side effects and evaluation order, asynchronous or resource lifecycles, and promised compatibility. Follow the project's actual language, framework, and style conventions; do not impose a preferred model, JavaScript module style, function syntax, or React pattern on unrelated projects.

Remove a guard, fallback, branch, or abstraction only when contracts, types, or relevant execution paths support its redundancy. A missing requirement or an unfamiliar abstraction alone does not establish that removing existing behavior is safe. Keep useful domain boundaries and required validation or error handling.

A discovered bug or desired behavior change is separate from a behavior-preserving cleanup. Report it without silently fixing it unless the user's broader task already authorizes that correction. Do not add new defenses, compatibility branches, features, dependencies, or extension points under the name of simplification.

## Prefer Useful Local Changes

- Make control flow easier to follow while preserving meaningful execution order and conditions.
- Remove demonstrated duplication, dead work, and indirection that does not serve an actual contract.
- Use clear domain names and cohesive responsibilities; extract or retain a helper when it earns its place through clarity or real reuse.
- Favor understandable expressions over dense chains or nested conditional expressions. Preserve concise code that is already clear.

Avoid broad formatting churn, speculative consolidation, and new abstraction layers that merely relocate complexity. If a candidate's behavioral consequences remain unclear, leave that candidate unchanged and explain the limit while completing other justified changes.

## Verify and Return

Complete a coherent set of edits, then use the smallest relevant existing behavioral checks. Use `superpowers-lite:lite-testing` when additional regression protection is useful and `superpowers-lite:lite-verification` before claiming preserved behavior or success. Compilation or a smaller diff alone does not establish behavior preservation. Refresh evidence invalidated by the edits and reuse checks whose evidence remains applicable.

Report the material simplifications, the actual verification and its limits, and any separate defects or unresolved scope decisions. Keep the result in the reply unless a file is requested or the active manual review stage requires its normal Review report. If no useful simplification is supported, say so without manufacturing edits.

Return to the current task or active manual stage after sufficient verification. Do not append another cleanup pass merely to produce more changes, advance a manual stage, launch another model, or create an automatic review-and-fix loop.

The idea is inspired by [Anthropic's code-simplifier](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-simplifier/agents/code-simplifier.md); these instructions are written for Lite's portable scope and workflow.
