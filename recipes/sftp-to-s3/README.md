# Transfer an SFTP file to S3

Downloads one remote file into the isolated run directory, then uploads it to object storage.

## Prerequisites

- Dagu 2.13.0 or newer.
- Key-based SFTP access with host-key verification and an S3-compatible bucket.

## Inputs and secrets

Configure the SFTP connection, `remote_file`, `bucket`, and `object_key`. Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in the Dagu process environment.

## What it changes

Reads the SFTP file, writes a temporary local copy, and creates or replaces the selected S3 object. It does not delete the SFTP source.

## Verify

Compare file size or checksum between the SFTP source and the uploaded object before downstream processing.

## Recovery

Correct credentials or paths and rerun. Restore an overwritten object from bucket versioning when enabled.
