# Deploy Docker Compose with approval

Pulls images and starts a Compose project after a human task is completed. The final Compose status is stored as a run artifact.

## Prerequisites

- Dagu 2.13.0 or newer and Docker Compose v2.
- A reviewed Compose project whose images use immutable versions or digests.

## Inputs and secrets

Configure `project_dir` and `compose_file`. Keep registry credentials in Docker's credential store rather than the workflow.

## What it changes

Pulls images, creates or replaces containers, and removes orphaned containers after acknowledgement.

## Verify

Review `compose-status.txt`, container health checks, application logs, and the service endpoint.

## Recovery

Restore the prior image tags or digest in the Compose file and rerun the workflow after acknowledgement.
