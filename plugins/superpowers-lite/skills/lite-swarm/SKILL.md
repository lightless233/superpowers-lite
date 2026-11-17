---
name: lite-swarm
description: "Use when the user asks for a swarm, parallel coverage, a race, a gauntlet, or parallel exploration that should return one consolidated report. Partitions work, races identical briefs, or mixes both; does not pick a base artifact and graft losers into it."
disable-model-invocation: true
---

# Lite Swarm

Fan out workers, drain them, and return one report.

This is not `superpowers-lite:lite-arena`. Arena runs the same artifact task as competing candidates, picks a base, and grafts. Swarm covers slices, races identical briefs, or mixes both, then aggregates evidence into one report.

## Host requirements

Use the host's delegation tool. Spawn workers in parallel when the host allows it. Prefer the host default or parent model unless the user asks for a model race and the host exposes the named models. Do not assume Cursor cloud agents or a model rule file.

Give a worker its own writable output when it writes. Use a worktree when available, otherwise a separate directory under `.runtime/swarm-<slug>/worker-<n>/`. Use the user's machine only when the work needs something there, such as a local service, GPU, or private file.

If the host cannot run the needed workers, stop. State the missing capability, and do not invent parallel results from one inline pass.

## Phases

Track Frame, Fan out, Aggregate, and Report. Do not launch workers before Frame is set.

### Frame

1. State the done predicate and the artifact or report the swarm must return.
2. Choose the shape: partition into slices, race N workers on identical briefs, or mix both. For a race or mixed shape, declare `first pass`, `rank all`, or `best-of` before spawning.
3. Choose the worker models. For a model race, name each arm's model up front. If a slug is rejected, use the nearest valid option or the parent model and say so.
4. Write a self-contained brief for every worker: goal, scope, exact slice or race arm, how to verify, and what to report. When workers verify or measure commits, each brief names the exact SHAs. A measurement brief also names the method: sample count, what one sample is, and order. The worker records both in its result.

### Fan out

Spawn all workers together when the host supports parallel spawn. Reports use `PASS`, `ISSUES`, or `BLOCKED` with evidence. A worker that can prove a defect reports `ISSUES` and lists every issue it can prove, not only the first.

If a worker drops out, continue with the rest and note it.

### Aggregate

Read the terminal results. Drop a result that does not record the SHAs and method its brief names, and respawn that worker once. After a second miss, record a gap. A gap is not a pass.

For coverage, every required slice needs a result. For a race, apply the selection rule declared up front: `first pass`, `rank all`, or `best-of`. Do not paste raw worker dumps.

### Report

Return one consolidated report with a result table, issue one-liners, gaps or dropouts, and the race rule when used. Keep the report in the reply unless the user asks for a file.
