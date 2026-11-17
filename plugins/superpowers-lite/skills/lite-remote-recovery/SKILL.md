---
name: lite-remote-recovery
description: Use when diagnosing remote server connectivity, service failures, package update problems, or recovery after a restart or reboot. Keeps probe origins, failure stages, and recovery evidence distinct.
---

# Remote Diagnosis and Recovery

Work through the available authorized SSH, CLI, or MCP connection. This skill owns diagnosis and recovery verification; follow `superpowers-lite:lite-remote-operations` for any changes needed during recovery. Select checks from the observed failure; do not run a full host audit for every incident.

Inspect available typed capabilities first and use one when it expresses the diagnostic step. Otherwise use a read-only diagnostic command with an exact target, bounded scope, explicit timeout, and bounded output. Follow asynchronous diagnostic jobs to completion; a wait timeout is not a diagnostic result.

## Locate the Failure Stage

Distinguish name resolution, routing or TCP connection, SSH negotiation and host-key trust, authentication, privilege escalation, command execution, and application health. A failure in one stage does not establish a failure in the others.

A TCP timeout is consistent with a routing or filtering problem, but does not identify a particular firewall or policy. Use current endpoint configuration and available connection diagnostics to narrow the cause. Check the actual source address when an allowlist may be involved; the agent's execution environment, a gateway, or an overlay network can use an exit address different from the local machine's address.

If authentication is refused, inspect the applicable account or key status before retrying. Do not repeat a permanently disabled password path. Use an already authorized console or access path to repair credentials when that repair is in scope. A changed host key needs an independently verified identity; do not silently replace trust.

## Gather Focused Host Evidence

- Bound file searches by root, depth, result count, per-file bytes, and total bytes. Follow symlinks only when the task requires it. If a paged read reports that the file changed, restart or obtain a stable snapshot rather than joining incompatible pages.
- For systemd, inspect the exact unit's status, recent logs, properties, and relevant dependencies. For Docker or Compose, resolve the exact container or project and inspect its state, logs, and relevant configuration. Read-only diagnosis does not authorize a restart.
- Keep probe origin explicit: a successful request from the agent's execution environment establishes that path; a request from the remote host tests its outbound path. An open TCP port does not prove SSH authentication or application readiness, and an HTTP response should be judged against the expected status and content.

Use the smallest check that separates the remaining plausible causes. For an unclear application defect, use `superpowers-lite:lite-debugging` rather than accumulating speculative host changes.

## Update and Reboot Within Scope

Inspect pending updates and restart requirements relevant to the requested maintenance. An authorized package update does not automatically authorize package removal or a reboot. If the actual transaction would exceed the requested scope, surface that concrete difference before proceeding.

For an authorized reboot, record the host's boot identity or platform equivalent and identify the affected services to check afterward. Follow any returned job to completion. Observe reconnect using established host-key trust, confirm a new boot identity, and check the relevant services or application path. Missing the brief offline interval does not itself prove the reboot failed.

If the connection times out, inspect any running job and use bounded reconnect attempts. Do not send a second reboot because the first call stopped responding. SSH availability alone establishes reconnection, not full service recovery.

Report the supported cause, action taken, and recovered behavior. If access is still unavailable, state the last verified failure stage and what evidence is missing; do not describe an unreachable host as healthy or permanently down.
