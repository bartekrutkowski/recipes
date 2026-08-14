# Monitor an HTTP endpoint and alert Slack

Checks an endpoint every five minutes. Dagu retries transient failures and sends one Slack webhook if the run still fails.

## Prerequisites

- Dagu 2.13.0 or newer.
- A Slack incoming webhook and network access to both endpoints.

## Inputs and secrets

Set `SLACK_WEBHOOK_URL` in the Dagu process environment. Override `url` and `timeout_seconds` for the monitored service.

## What it changes

Performs HTTP GET requests and, on failure, sends one message to Slack. It does not modify the monitored service.

## Verify

Run once against a healthy endpoint, then temporarily use a known failing URL and confirm the Slack notification.

## Recovery

Correct the endpoint or network issue and rerun the workflow. Remove the Slack webhook from the environment to disable notifications.
