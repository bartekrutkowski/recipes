## Recipe

- What operations job does this recipe solve?
- What systems or credentials does it require?
- What does it change when run?

## Checks

- [ ] `node scripts/build-catalog.mjs` passes.
- [ ] `dagu validate recipes/<slug>/workflow.yaml` passes.
- [ ] The workflow contains no credentials or private endpoints.
- [ ] Destructive behavior is disabled by default or requires explicit acknowledgement.
- [ ] I can submit this contribution under Apache-2.0.
