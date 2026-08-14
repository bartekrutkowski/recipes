# Contributing a Recipe

Add one directory under `recipes/` containing:

```text
recipes/<slug>/
├── recipe.json
├── workflow.yaml
└── README.md
```

Use lowercase kebab-case for the directory and `id`. Copy an existing recipe as a starting point, then run:

```sh
node scripts/build-catalog.mjs
node --test tests/*.test.mjs
dagu validate recipes/<slug>/workflow.yaml
```

## Recipe requirements

- Solve one concrete operations job.
- Keep the workflow in one YAML file.
- Read credentials from Dagu secrets or the environment; never commit credentials.
- Pin external Actions, images, and tools to a released version.
- Do not download a script and pipe it directly to a shell.
- Default destructive operations to preview mode or require an explicit `human.task` acknowledgement.
- Document prerequisites, inputs, effects, verification, and recovery.

Opening a pull request confirms that the contribution is original or can be submitted under Apache-2.0. No separate contributor agreement is required.
