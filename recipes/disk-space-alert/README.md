# Alert when disk usage is high

Checks a filesystem every fifteen minutes and fails when utilization reaches the configured threshold. The failure handler sends a Slack message.

## Prerequisites

- Dagu 2.13.0 or newer with `df` and `awk`.
- A Slack incoming webhook.

## Inputs and secrets

Set `SLACK_WEBHOOK_URL` in the Dagu process environment. Configure `path` and `threshold_percent`.

## What it changes

Reads filesystem statistics and may send one Slack message. It never deletes files.

## Verify

Run once with the normal threshold, then temporarily lower it below current usage to test the notification.

## Recovery

Free or expand storage, restore the threshold, and rerun the check.
