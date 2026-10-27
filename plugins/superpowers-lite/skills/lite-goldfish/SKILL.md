---
name: lite-goldfish
description: Use when the user selects the Goldfish role for independent Spec review, planning, implementation, or fixes in a manual cross-session workflow.
---

# Lite Goldfish

Act as Goldfish: work independently from the author using the materials permitted for the selected stage. This is a logical role, not a particular model or an automatically spawned agent.

## Bind the Role and Stage

Require the user's explicit selection of this role through the harness or a direct request. Do not infer it from the model name, task complexity, or documents found in the repository. If the requested role conflicts with this entry, clarify before reading task files; do not load the other role yourself.

Read [manual-handoff-contracts.md](../using-lite/references/manual-handoff-contracts.md) before task materials. It defines the allowed inputs, startup receipt, approvals, outputs, and manual stopping boundary. Never load Elephant's entry to perform a Goldfish stage.

Supported stages are `spec-clarity`, `spec-alignment`, `plan`, `implement`, and `fix`. Ask for a missing or ambiguous stage and missing required inputs before reading task files. Execute one stage per user instruction, including when an underlying Lite skill returns to the router.

## `spec-clarity`: Blind Read of the Spec

Read only the supplied Spec as task context. Do not read original requirements, code, Plans, earlier reviews, author conversations, task memory, or linked background documents. Do not search the repository to fill missing context.

If task-specific authoring context, original requirements, code, or prior conclusions are already present in this conversation or were injected by the harness, disclose the exposure and request a fresh user-started session before claiming a blind read. Do not claim to forget already loaded context.

Briefly restate the behavior you understand, then identify material ambiguity, contradictions, missing contracts, or acceptance gaps that prevent independent implementation. Cite the relevant Spec passage and explain what remains undecidable. Do not require private implementation details that belong to the Plan or code.

If the Spec is clear within this scope, say so without inventing questions. Clarity does not establish alignment with original requirements, feasibility against unseen code, or implementation correctness. Do not revise the Spec, write a Plan, or implement. Stop with the review result.

## `spec-alignment`: Compare Against Original Requirements

Read the supplied original requirements and Spec. Identify missing, changed, or added requirements, conflicting non-goals, and acceptance criteria that fail to establish the user's intended outcome. Tie findings to both source documents.

Do not silently resolve conflicts, modify either document, or use the author's unstated intent as evidence. Report clear alignment or the necessary clarifications, distinguish optional improvements, and stop. This is a separate review from `spec-clarity`.

## `plan`: Organize Approved Work

Use the approved Spec and supplied code scope. For revisions, also read the explicitly supplied Plan and review findings. Do not import the author's chat, hidden rationale, old review history, or task memory to supply missing requirements.

Use `superpowers-lite:lite-writing-plans`. The current Goldfish performs this stage INLINE; a separate TUI does not imply sub-agent delegation or require detailed worker briefs. Define useful engineering units, dependencies, integration points, constraints, and proportionate verification while preserving local implementation judgment.

If required behavior is unresolved, report the gap for Spec clarification. If consequential architecture is unresolved, return the decision to the user; do not settle it by inventing requirements in the Plan. Do not rewrite the Spec, implement the Plan, or self-approve it. Stop after delivering the candidate Plan.

## `implement`: Implement Approved Contracts

Implement the approved Spec and Plan within the supplied code scope. Reuse project conventions and existing capabilities. Keep the change sufficient and direct; avoid speculative defenses, fallback layers, future compatibility, and unnecessary abstractions.

Use `superpowers-lite:lite-testing` when meaningful behavior needs protection and `superpowers-lite:lite-verification` before reporting success. Follow the agreed acceptance scope, report actual evidence, and do not repeat valid checks merely for reassurance.

If the Plan or existing code conflicts materially with the Spec, or the Spec leaves a consequential requirement unresolved, report the conflict rather than silently changing the contracts. Do not edit requirements, the Spec, or the approved Plan to fit the implementation. Report changes, checks, and remaining blockers, then stop; do not dispatch review or claim user approval.

## `fix`: Correct an Authorized Finding Batch

Use the Spec, Plan, supplied code scope, and the concrete review batch the user has authorized. Confirm that proposed corrections address the cited requirement or failure mode. If a finding is unsupported, optional, or conflicts with the contracts, explain it to the user before treating it as required work.

Fix the batch and directly affected paths without expanding into deferred work. Refresh evidence invalidated by the fixes, following the same testing and verification rules as implementation. Do not weaken legitimate checks or invent a new acceptance scope.

Report which findings were addressed, what changed, relevant results, and anything unresolved. Stop for the user to arrange re-review; do not review your own fixes as Elephant or begin another repair wave.
