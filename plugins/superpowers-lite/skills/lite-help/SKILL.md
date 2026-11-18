---
name: lite-help
description: "Answer questions about installing, configuring, and using Superpowers Lite, choosing a skill, or steering a Lite workflow. Give a source and a ready-to-send prompt when useful."
disable-model-invocation: true
---

# Lite Help

Answer questions about Superpowers Lite. Give the user the next action and, when it helps, one prompt they can send. Treat asking how to install, configure, or run something as a request for guidance. If the user explicitly asks Lite to perform an engineering task, hand it off to `superpowers-lite:using-lite` or read [using-lite](../using-lite/SKILL.md) if the host has no skill-invocation tool. When using-lite is already active, return control to it. Preserve the user's scope and stopping point in either case.

Infer what the user needs from the question and conversation. Ask a focused question only when a missing detail would materially change the answer. For example, the host matters for install commands and invocation syntax.

## Find the answer

Read the relevant source before answering. Use this map to find it.

| The user wants to | Read |
|---|---|
| Install, reload, find, or invoke Lite in a particular host | The matching host section of the [README](../../../../README.md) or [English README](../../../../README-EN.md). If the installed plugin omits the root README, use the [public repository README](https://github.com/lightless233/superpowers-lite#readme). |
| Start a task with Lite or choose between inline and delegated work | [using-lite](../using-lite/SKILL.md), especially workflow classification and host capabilities. An example task prompt states the goal, relevant context, evidence of success, and any stopping point. |
| Choose a skill or find out what one does | The responsibility table in [using-lite](../using-lite/SKILL.md) and the selected skill's own `SKILL.md`. For a skill missing from the table, check the frontmatter of the available skills. For a whole engineering task, `using-lite` selects the useful phases. |
| Understand model or reasoning settings | The host's settings and any Lite agent profile actually loaded. Distinguish defaults declared in a profile from active settings. Setups with only skills and setups with custom agent profiles can behave differently. |
| Understand why a run took a particular path or how to steer it | The applicable routing, evidence, or review rules in [using-lite](../using-lite/SKILL.md) and the skill involved. Ground explanations about this run in what the conversation shows. For questions about manual Elephant or Goldfish handoffs, start with the manual handoff section of the README. |
| Customize a project workflow | [lite-automate-me](../lite-automate-me/SKILL.md) for recurring working habits, [lite-reflect](../lite-reflect/SKILL.md) for improving an existing project skill, and [lite-correct](../lite-correct/SKILL.md) for recurring mistakes that need an enforceable fix. |

When choices sound similar, explain the distinction that matters to the current task. `lite-writing-specs` defines the required behavior, while `lite-writing-plans` organizes decided implementation work. `lite-testing` chooses meaningful coverage, while `lite-verification` checks the evidence for a completion claim. A product bug with an unclear cause goes to `lite-debugging`, and an unclear remote host or service failure goes to `lite-remote-recovery`.

## Reply

Lead with the answer. Give one context-specific prompt when it helps the user act, using the host's actual invocation syntax or plain language if the host is unknown. For a run that drifted, make the prompt state what to do now, what evidence to return, and where to stop. Link the source that supports the answer. Prefer a link the user can open, using the repository ref that matches the installed version when it is known.
