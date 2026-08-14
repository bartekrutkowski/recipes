# Back up PostgreSQL to S3

Creates a custom-format `pg_dump` and uploads it to an S3-compatible bucket. Configure retention with the bucket lifecycle policy so the workflow never deletes backups itself.

## Prerequisites

- Dagu 2.13.0 or newer and `pg_dump` on the Dagu host.
- An S3-compatible bucket.

## Inputs and secrets

Set `DATABASE_URL`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` in the Dagu process environment. Provide `bucket`; optionally override `database_name` and `prefix`.

## What it changes

Writes a temporary dump in the run work directory and uploads one new object. It does not delete local or remote backups.

## Verify

Confirm that the uploaded object exists and periodically test a restore with `pg_restore --list` or a disposable database.

## Recovery

Download the selected object and restore it with `pg_restore`. Remove failed or unwanted objects through the storage provider after confirming they are not needed.
