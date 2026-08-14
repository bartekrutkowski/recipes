# Back up MySQL to S3

Creates a compressed `mysqldump` with a consistent transactional snapshot and uploads it to object storage.

## Prerequisites

- Dagu 2.13.0 or newer, `mysqldump`, and `gzip`.
- An S3-compatible bucket and a MySQL user with the required read privileges.

## Inputs and secrets

Set `MYSQL_PASSWORD`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` in the Dagu process environment. Provide `database` and `bucket`; review the connection parameters.

## What it changes

Writes a compressed dump in the run work directory and uploads one new object. It does not delete backups or modify MySQL data.

## Verify

Download a recent object, run `gzip -t`, and test a restore into a disposable database.

## Recovery

Decompress the selected object and restore it with the `mysql` client. Delete unwanted objects only after confirming retention requirements.
