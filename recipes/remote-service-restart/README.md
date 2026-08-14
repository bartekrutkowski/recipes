# Restart a remote systemd service with approval

Pauses for operator acknowledgement, restarts one systemd service over SSH, and retries the status check until the service is active or the run fails.

## Prerequisites

- Dagu 2.13.0 or newer.
- Key-based SSH access with host-key verification and permission to run `systemctl`.

## Inputs and secrets

Configure `host`, `user`, `service`, and the SSH `key` path. No password is stored in the workflow.

## What it changes

Restarts the selected remote service only after a human task is completed.

## Verify

The final step runs `systemctl is-active`. Also verify the service health endpoint and recent journal entries.

## Recovery

Inspect `journalctl -u <service>`, restore the prior service configuration or release, and restart again after approval.
