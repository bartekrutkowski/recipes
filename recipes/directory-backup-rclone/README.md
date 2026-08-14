# Back up a directory with rclone

Uses the official `rclone@v1` Action to copy files to a configured remote. The `copy` operation updates and adds files but does not mirror deletions.

## Prerequisites

- Dagu 2.13.0 or newer.
- An rclone configuration available to the Dagu user.

## Inputs and secrets

Set `source` to the local directory and `destination` to an rclone path such as `backup:data`. Credentials remain in the rclone configuration.

## What it changes

Creates or updates destination objects. It does not delete destination files that no longer exist locally.

## Verify

Run `rclone check <source> <destination>` or inspect the destination after the first run.

## Recovery

Restore files with an rclone copy in the opposite direction. Remove unwanted destination files manually after review.
