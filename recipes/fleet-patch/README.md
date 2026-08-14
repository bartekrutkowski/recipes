# Patch a Linux server fleet in batches

Requires operator acknowledgement, then fans out a patch command to newline-separated SSH hosts with at most two concurrent child runs.

## Prerequisites

- Dagu 2.13.0 or newer.
- Key-based SSH access, verified host keys, passwordless sudo, and tested recovery procedures.

## Inputs and secrets

Review `hosts`, `user`, `key`, and `command` before every production use. The default command targets Debian-family systems.

## What it changes

Runs the configured package-manager command on every listed host after acknowledgement. Package upgrades can restart services or require a reboot.

## Verify

Inspect each child run, check package state and service health, and confirm whether any host requires a reboot.

## Recovery

Restore the affected host from its snapshot or package rollback procedure. Remove unhealthy hosts from the list before retrying.
