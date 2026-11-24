---
name: lite-remote-operations
description: Use when executing administrative changes or commands on remote servers through SSH, a remote CLI, or an MCP integration. Covers target selection, privileges, secrets, and asynchronous execution; diagnosis and file transfers have separate skills.
---

# Remote Operations

Use the connection mechanisms already available and authorized for the task. This skill supplies operating discipline, not a remote execution service.

## Resolve the Target and Capability

Inspect the current inventory or connection configuration and resolve the exact host, account, and platform. Distinguish personal and team namespaces when the provider uses them. Before changing a host, confirm its identity through the selected connection; a familiar alias or old deployment note is insufficient.

Prefer an available typed operation when it expresses the whole intended action. Otherwise use the established SSH or remote command path. Do not invent tool names, require a particular provider, or replace working project tooling merely to obtain a typed interface. Respect explicit connection restrictions when choosing an alternative path.

Use exact paths, service names, containers, and overwrite behavior. Complete read-only preflight checks (including real target data sizes and active write contention before backups or migrations) before mutating local tracked files or remote state, so failed preflights leave both sides clean and re-entrant. Isolate `stdin` (`</dev/null` or `DEVNULL`) on non-interactive remote commands and configure keepalives with bounded transient retries on cross-network reads and transfers. Bound command duration and output, and use dry-run or expected-state checks when available, especially when a concurrent edit could be overwritten.

## Use Existing Privilege and Secret Channels

Reuse configured SSH identities, credential helpers, secret stores, and privilege handling. If access fails, distinguish missing authorization from a failed command before retrying.

When the provider supports an authorization link or secret reference, use it and pass only the reference to later operations. With ordinary SSH, use the established SSH agent and sudo setup. If interactive access is required, let the user complete it through a trusted terminal or supported authorization interface. Do not request passwords, tokens, or private keys in chat, embed them in command arguments, or print credential files to discover their contents.

If a required authorization or secret is missing, wait for the user's confirmation or verify that the setup is ready before retrying. Honor the actual service's expiration and single-use rules; do not assume a secret reference remains usable after a job consumes it. Check whether the original operation ran before resubmitting it.

Do not turn a task-specific access problem into a permanent sudo rule, new credential, or changed SSH policy without authorization for that change. Never bypass host-key verification to recover connectivity.

## Follow Work to Its Actual Outcome

An accepted request, job ID, or successful submission is evidence that work started. Bound remote heavy or write-intensive jobs with explicit timeouts or session-tied lifecycle cleanup so a client timeout or dropped SSH connection never leaves a runaway orphan writer on the host. For asynchronous operations, retain the job or session handle and follow its status and incremental output to completion; a client wait timeout or disconnected session does not prove the remote work stopped.

Before retrying an uncertain mutation, inspect the original job or resulting state. Retry only when evidence shows that the operation did not run or can safely be repeated; do not duplicate an update, restart, or deployment because the client timed out.

Check the requested result at the affected boundary: an exit code can establish command success, while a service change also needs the relevant service or application observation. Report partial results and unresolved jobs as such.

If a service refuses or adjusts an operation because of plan or quota limits, report its user-visible constraint and supported remedies. Do not repeatedly retry the same refusal, silently reduce the requested scope, or change the account's plan without authorization.

## Related Work

For uncertain connectivity, host failures, updates, or reboot recovery, use `superpowers-lite:lite-remote-recovery`. For moving artifacts, use `superpowers-lite:lite-file-transfer`. Load only the skill needed for the task; routine remote execution does not require a coding workflow or a written plan.
