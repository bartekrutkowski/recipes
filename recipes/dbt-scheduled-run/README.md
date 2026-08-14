# Schedule a dbt build with artifacts

Runs `dbt build` through the official `dbt@v1` Action and stores dbt target and log directories with the Dagu run.

## Prerequisites

- Dagu 2.13.0 or newer.
- A dbt project, profiles directory, and warehouse credentials available to the worker.

## Inputs and secrets

Configure `project_dir`, `profiles_dir`, `target`, and `threads`. Supply warehouse credentials through environment variables referenced by `profiles.yml`.

## What it changes

Runs the dbt models, tests, snapshots, and seeds selected by the project. Warehouse effects depend on the dbt project.

## Verify

Review the Dagu step result, `dbt-target/run_results.json`, and the dbt logs stored as artifacts.

## Recovery

Use the project's rollback or model-restoration procedure, correct the dbt failure, and rerun the workflow.
