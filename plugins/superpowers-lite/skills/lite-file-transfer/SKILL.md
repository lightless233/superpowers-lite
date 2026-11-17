---
name: lite-file-transfer
description: Use when uploading, downloading, or copying files between a local machine, remote servers, or artifact storage. Covers transport selection, overwrite behavior, integrity checks, and interpretation of available security scans.
---

# File Transfer

Use the available authorized transfer tools, such as an artifact API, SFTP, SCP, or rsync. This skill does not require a particular storage provider or scanning service.

## Choose the Actual Data Path

Resolve the source and destination hosts, exact paths, file or directory scope, and overwrite policy. For a directory, use a supported recursive transfer or create an archive when the transport accepts only regular files. Make symlink and metadata handling explicit when they affect the requested result.

Prefer fetching a publicly available artifact from its authoritative source at the destination when practical. For private files, use an established authorized path and consider where the bytes transit: a direct host-to-host copy and a staged artifact upload expose data to different systems.

Inspect the chosen tool's current size limits, directory support, routing requirements, and transfer lifetime. Do not apply one transport's limits to another, assume a tool called "direct" avoids relays, or promise a direct route without evidence. If the selected path cannot handle the transfer, use another supported authorized path. Do not create a public file server, temporary tunnel, or listening service to bypass transfer limits or required checks.

## Verify the Bytes That Move

For artifacts that need integrity verification, hash the exact source file or completed archive with SHA-256 and compare against the received bytes or the transfer service's verified digest. When an authoritative publisher provides a trusted checksum or signature, verify against that as well. A matching digest proves byte equality, not provenance or safety.

An archive's digest describes the archive bytes, not its unpacked directory. For files that are changing during transfer, obtain a consistent copy or archive when needed; a digest mismatch is a failed integrity check, not a successful copy with a warning. Do not stop a live service solely to create a snapshot unless the task authorizes that interruption.

Use expected-digest and explicit no-overwrite or conditional-write options when the tool supports them. Prefer a temporary destination and atomic publication when a partial file would disrupt a consumer. For recursive synchronization, verify the requested file set and meaningful metadata using the tool's supported checks; do not require an archive solely to obtain one digest.

Follow asynchronous transfers to their terminal result. Before retrying a timed-out transfer, inspect its state and the destination so the retry does not publish partial content or overwrite a completed result unexpectedly.

## Interpret Security Results Precisely

Use reputation checks or scanners when required by the selected service, established policy, or the task. Apply results to the same exact bytes being transferred. Honor a known-malicious block; do not split or repackage a file to evade it.

When a pre-transfer reputation check is required, first hash the exact file or completed archive, check that digest's reputation, then pass the same digest as the expected value when the transfer tool supports it. Verify the received bytes against that digest. If the source bytes change, repeat the required check for the new bytes rather than reusing the old result.

"Not known malicious" means there was no matching malicious evidence at lookup time. "No detection" means that scan reported no detection. Neither establishes that a file is safe, and an indeterminate scan is not a negative result. If scanning is unavailable and not required, do not make it a new prerequisite for an ordinary transfer or claim that a scan occurred.

Later evidence or asynchronous scans may change an earlier assessment, revoke a download, or quarantine an artifact. Do not treat a negative result as permanent or describe a pending scan as complete.

Respect configured consent before optional scanning or submission to another service. Transfer or scan authorization does not authorize deletion, quarantine, or incident remediation. Report revocable download links and retention limits when they affect delivery, and keep bearer links or credentials out of public output.
