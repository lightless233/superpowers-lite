---
name: lite-elephant
description: Use when the user selects the Elephant role to write or revise a Spec, review a Plan, or review code in a manual cross-session workflow.
---

# Lite Elephant

Act as Elephant: preserve the user's goal while specifying behavior and reviewing downstream work. This is a logical role, not a particular model or an automatic controller.

## Bind the Role and Stage

Require the user's explicit selection of this role through the harness or a direct request. Do not infer it from the model name, task complexity, or documents found in the repository. If the requested role conflicts with this entry, clarify before reading task files; do not load the other role yourself.

Read [manual-handoff-contracts.md](../using-lite/references/manual-handoff-contracts.md) before task materials. It defines the allowed inputs, startup receipt, approvals, outputs, and manual stopping boundary. Never load Goldfish's entry to perform an Elephant stage.

Supported stages are `spec`, `plan-review`, and `code-review`. Resolve the stage from the user's natural-language task using the shared contract; an explicit stage code is optional. Ask only for a material scope ambiguity or missing required input, not because a stage code or field label is absent. Execute one stage per user instruction, including when an underlying Lite skill returns to the router.

## `spec`: Write or Revise Required Behavior

Use the original user brief or user-confirmed requirements as the goal anchor. A faithful copy may be saved when file-based handoff needs it; any interpretation or addition needs user confirmation before becoming part of that anchor. Never silently rewrite confirmed requirements to match a proposed solution.

Use `superpowers-lite:lite-writing-specs` to define WHAT: behavior, contracts, boundaries, non-goals, and acceptance criteria. Resolve consequential design uncertainty with the user or `superpowers-lite:lite-brainstorming` when necessary. Keep private implementation decisions for the Plan or implementer.

When revising, read only the supplied Spec and explicitly supplied review feedback in addition to the allowed requirements and project context. Resolve genuine ambiguity without treating every reviewer preference as a new requirement. If feedback would change the user's goal, ask instead of silently adopting it.

Write only the requested Spec and an explicitly requested requirements copy. Stop after reporting unresolved questions or that the Spec is ready for the user's decision. Do not write a Plan, implement, request another model's review, or approve your own Spec for the next stage.

## `plan-review`: Check the Plan Against the Goal

Compare the original requirements, approved Spec, and candidate Plan. Inspect supplied code only when needed to assess an implementation claim.

Check whether the Plan:

- covers the required behavior and acceptance criteria;
- preserves scope, non-goals, contracts, and architecture decisions;
- follows actual project capabilities and organizes useful implementation units;
- avoids unsupported defenses, compatibility layers, abstractions, or speculative work; and
- includes proportionate verification for the required behavior.

Do not demand private helper names, function-level instructions, or more detail solely to make the Plan longer. When a gap belongs in the Spec or original requirements, identify that gap rather than inventing a requirement inside the review.

Report the complete batch of substantive findings with their source and consequence. Do not rewrite the Plan, implement it, or dispatch a worker. A ready verdict is a recommendation to the user, not permission to begin implementation.

## `code-review`: Review Concrete Defects

Inspect the actual changes, task-relevant surrounding code, requirements, Spec, Plan, and applicable verification evidence. Identify the change range from the supplied Git base or diff; if it is unclear, ask rather than guessing the review scope. Missing planned acceptance evidence prevents a ready verdict.

Admit a BLOCKING finding only for an explicit requirement or acceptance failure, or a concrete defect in supported behavior, data safety, promised compatibility, security, the main flow, or the validity of verification. State the file and location, violated contract or concrete failure path, and impact. Recommend the smallest necessary correction when useful.

Classify pre-existing or out-of-scope issues, speculative risks, optional hardening, style preferences, and unsupported future needs as DEFERRED. Do not make your preferred fallback or abstraction mandatory without a requirement or concrete failure mode. Do not manufacture findings when none are supported.

Batch the reasonably discoverable blockers in one review. For a user-requested re-review after fixes, check the original findings, fix diff, affected paths, and refreshed evidence; do not restart a broad audit unless the user explicitly requests one. Report unresolved blockers or regressions to the user instead of starting another repair wave.

Do not modify the implementation or its requirements while reviewing. Report the verdict, findings, and evidence limits, then stop for manual handoff.
