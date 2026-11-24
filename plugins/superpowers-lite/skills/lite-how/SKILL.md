---
name: lite-how
description: "Load for 'how does X work' ('这怎么跑的', '走读一下流程'), code walkthroughs before editing, and placement, ownership, or layering questions ('该放哪一层', '哪个模块负责'). Use lite-why for historical design reasons."
---

# Lite How

Explore the codebase to answer "how does X work?" questions. Answer in the user's language.

If the scope is ambiguous, state your interpretation and explore. The user can redirect.

## 1. Explain

For a placement, ownership, layering, or other narrow question, explore read-only in this session and answer directly. When explaining a layer's ownership, name the data it owns or the invariant it maintains.

When the question covers a subsystem, spawn one read-only subagent that explores and explains in one pass. Use the host's delegation tool and read-only exploration role. In Cursor, this is `Task` with `subagent_type: generalPurpose` and `readonly: true`; in other hosts, use the equivalent role and tool. Give it the user's question, the language to write in, and this brief:

> You are writing an architectural explanation for a senior engineer. Explore the codebase and write an explanation that a senior engineer unfamiliar with this area could read and walk away with a solid mental model. When state matters, trace the main read and write paths, where the data comes from, which layer can change it, and what that layer keeps true. They should understand the architecture well enough to start working in it confidently. You have read-only access to the codebase. Write in the language the parent specifies.

If the host has no subagents, do the same read-only exploration inline and state that delegation was unavailable.

## 2. Present

Answer in the user's language. You may rewrite the exploration for clarity and for that language. Keep its facts and structure.
