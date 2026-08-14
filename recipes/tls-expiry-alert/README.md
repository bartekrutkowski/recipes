# Alert before a TLS certificate expires

Uses `openssl` to verify that a remote certificate remains valid for the configured number of days. A failed check triggers a Slack webhook.

## Prerequisites

- Dagu 2.13.0 or newer and `openssl`.
- A Slack incoming webhook.

## Inputs and secrets

Set `SLACK_WEBHOOK_URL` in the Dagu process environment. Configure `host`, `port`, and `minimum_days`.

## What it changes

Opens a TLS connection and may send one Slack message. It does not alter the certificate or endpoint.

## Verify

Run against the production hostname, then raise `minimum_days` temporarily to confirm that the alert path works.

## Recovery

Renew or replace the certificate, verify the served certificate chain, and rerun the workflow.
