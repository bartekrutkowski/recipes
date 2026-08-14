# Run a scheduled Kubernetes Job

Uses Dagu's scheduler and Kubernetes executor to create a Job, stream its logs, wait for completion, and clean it up.

## Prerequisites

- Dagu 2.13.0 or newer with access to the target cluster.
- A service account allowed to create, inspect, and delete Jobs and Pods.

## Inputs and secrets

Set `namespace`, a version-pinned `image`, and one `command`. Configure registry and application secrets through Kubernetes rather than embedding them in YAML.

## What it changes

Creates a Kubernetes Job and Pod on each scheduled run, then deletes them after completion.

## Verify

Review the Dagu run logs and confirm the expected external result of the batch command.

## Recovery

Suspend the Dagu workflow to stop future runs. Correct the image or command and rerun; completed Jobs are removed automatically.
