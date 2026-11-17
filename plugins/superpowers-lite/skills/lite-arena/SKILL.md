---
name: lite-arena
description: "Use when the user asks for an arena, multi-candidate contest, or several independent attempts at the same non-trivial artifact so one base can absorb the strongest parts of the others. Defines a rubric, fans out isolated candidates, picks a base, grafts by hand, and verifies the result."
disable-model-invocation: true
---

# Lite Arena

Run the same task as several independent candidates. Pick one base. Fold in the strongest parts of the others by hand. Verify the result.

This is not `superpowers-lite:lite-brainstorming`. Brainstorming settles design direction with sketches when needed. Arena produces competing artifacts and synthesizes one. It is not `superpowers-lite:lite-swarm`. Swarm partitions work or races identical briefs and returns one report without grafting.

## Host requirements

Use the host's delegation tool and spawn candidates in parallel when the host allows it. Give each candidate its own writable output: a worktree when the host or environment supports one, otherwise a separate directory under `.runtime/arena-<slug>/candidate-<n>/`.

Do not assume Cursor cloud agents, a model rule file, or a fixed model panel. Prefer distinct available models when the host exposes them and the task is judgment-sensitive. Otherwise run candidates on the parent model or the host default, and say so. Keep at least two candidates. If a requested model is rejected, use the nearest valid option of the same family or drop that seat, keep at least two, and say so.

If the host cannot run at least two isolated candidates, stop. State that Arena needs multi-candidate delegation or isolation, and do not pretend a single inline attempt was an arena.

## Phases

Track Frame, Fan out, Cross-judge, Pick, Graft, and Verify. Do not launch candidates before Frame is set.

### Frame

1. State the artifact every candidate must produce.
2. Write 3–6 concrete, gradeable criteria for this task. Candidates see the task, not the rubric. The rubric is for picking.
3. Choose the runners and each candidate's output path.
4. Give every candidate the same task prompt, shared grounding paths, its own output path, and instructions to produce the artifact plus a short rationale of alternatives considered and rejected.

### Fan out

Spawn all candidates together when the host supports parallel spawn. If a candidate produces no output, continue with the rest and note the dropout.

### Cross-judge

After the candidates finish, spawn one read-only judge when the host can use a model different from the parent, or from a different vendor when that distinction is available. The judge scores each candidate by path label on each rubric criterion and recommends a base.

If no suitable distinct judge is available, skip this phase and say so. Do not invent a second vendor.

### Pick a base

Read every candidate end to end. Score each criterion against the rubric, not by overall feel. Compare with the cross-judge when one ran. Agreement supports the pick. Disagreement means bias or an ambiguous rubric; read both rationales before deciding.

Pick the base a future maintainer can extend most easily without breaking invariants. When two are tied, prefer the cleaner boundary or smaller API.

### Graft

Walk each losing candidate for what is worth porting, usually one or two things per candidate. Fold each graft in by hand so the result stays coherent. Do not paste mechanically.

If the candidates converge on one shape, note the agreement and ship that shape. No graft is required. If they diverge wildly, the Frame was under-specified. Reframe and re-run. Do not average the divergence.

### Verify

Verify the synthesized artifact with evidence appropriate to the claim. Use `superpowers-lite:lite-verification` when the claim is a completion claim, and `superpowers-lite:lite-benchmark` when the claim is a measured performance number. If verification finds a problem the arena missed, either reframe and re-run, or return to Graft for a missed piece. Do not paper over it.

## Reply

Return the synthesized artifact, or its location, plus a short note: the base and why, the cross-judge verdict or that it was skipped, each graft and its source, what was rejected and why, convergence or dropouts, and the verification result.
