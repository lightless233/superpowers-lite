---
name: lite-blast-radius
description: "Load when the user asks what else a change could break outside the diff ('还会影响哪', '会影响别的模块吗'), or when testing or review cannot tell affected consumers or safety facts from ordinary inspection. Does not choose test scope or explain current architecture."
---

# Lite Blast Radius

Find what a change can break outside the diff. `superpowers-lite:lite-how` explains how the code runs now. `superpowers-lite:lite-why` explains why it is shaped that way. This skill asks what else breaks. Listing callers is not the job.

`superpowers-lite:lite-testing` decides which tests cover the change. A blast radius there means test scope. This skill does not choose tests. Testing calls it only when ordinary inspection still cannot tell which consumers or behaviors are affected, then decides coverage from the result. Reuse an investigation that already covers this change.

## Prove the safety fact

A written risk list is not proof. Find the one or two facts the change's safety depends on. For each fact, go as far down this ladder as is cheap, and say where you stopped.

1. You asserted it.
2. You cited a real `file:line`, or the library's own source.
3. You walked the bad case and showed it does not reach.
4. You ran a script or test that calls the real code and fails loudly if the fact is wrong.
5. You reproduced it in the running application.

Aim for a run when that is cheap. If you cannot run it, mark the fact unproven.

## Investigate

1. Read the change: the diff, the symbols it adds, changes, and deletes, and what it now does, including the part the diff does not spell out.
2. Find the safety fact. If it holds, most imagined risks clear at once.
3. Look where a symbol search stops. Read the library you call, including its pinned version and any local patch. Check when the code runs, including teardown and lifecycle. Follow data a search misses: an API payload, a database column, a wire format, another language reading the same bytes, a feature flag, and code several hops downstream.
4. Separate confirmed risks from risks you checked and cleared. Give a confirmed risk a real chance of happening and a real cost. Cite a real `file:line`. A search that finds nothing is still an answer. Do not invent a caller or an API.
5. When a run is cheap, prove the safety fact with a focused test or a temporary script. Run it and keep the command and output. Do not change product code. Do not keep the probe as a feature unless the user asks to keep it. When a run is not cheap or you cannot run it, stop at the ladder step you reached and mark the fact unproven.

Match the investigation to the change. For a removed entry point, trace configuration, registrations, and indirect callers that could still reach it. For concurrent writes, check whether different paths reach the same underlying resource. For a retry change, check whether partial completion leaves any effect that a retry could duplicate. Exercise a retry from that state when it is cheap and safe to do so.

## Reply

Answer in the user's language. Include what the change does, including the part that is not obvious. State the safety fact, the ladder step you reached, and the proof, or mark the fact unproven. List confirmed risks with how each breaks, the `file:line`, the likelihood, the cost, and the proof when you have it. List what you checked and cleared. Name the cheapest check that would catch the real bug before merge.

For a Chinese or English reply, run `superpowers-lite:lite-unslop`, or `lite-unslop` with native skill loaders. If the host has no skill-invocation tool or blocks model invocation for it, read and follow [lite-unslop](../lite-unslop/SKILL.md). Remove private material before the reply goes anywhere public.

Do not open a spec, plan, or review from this skill. Do not fix the product unless the user asks for a fix.
