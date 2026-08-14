import assert from "node:assert/strict";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const recipeRoot = path.join(root, "recipes");
const catalogPath = path.join(root, "catalog.json");

const categories = new Set([
  "backup-recovery",
  "monitoring-alerting",
  "server-maintenance",
  "deployment",
  "data-movement",
]);
const platforms = new Set(["linux", "macos", "windows"]);
const requiredHeadings = [
  "## Prerequisites",
  "## Inputs and secrets",
  "## What it changes",
  "## Verify",
  "## Recovery",
];

function nonEmptyString(value, field) {
  assert.equal(typeof value, "string", `${field} must be a string`);
  assert.ok(value.trim(), `${field} must not be empty`);
}

export function validateRecipe(recipe, directory, workflow, readme) {
  const allowedFields = new Set([
    "id",
    "title",
    "summary",
    "category",
    "tags",
    "author",
    "minDaguVersion",
    "platforms",
    "prerequisites",
  ]);
  for (const field of Object.keys(recipe)) {
    assert.ok(allowedFields.has(field), `${directory}: unknown metadata field ${field}`);
  }

  nonEmptyString(recipe.id, `${directory}.id`);
  assert.match(recipe.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${directory}.id is not kebab-case`);
  assert.equal(recipe.id, directory, `${directory}.id must match its directory`);
  nonEmptyString(recipe.title, `${directory}.title`);
  nonEmptyString(recipe.summary, `${directory}.summary`);
  assert.ok(categories.has(recipe.category), `${directory}.category is not supported`);
  assert.ok(Array.isArray(recipe.tags) && recipe.tags.length > 0, `${directory}.tags must not be empty`);
  recipe.tags.forEach((tag, index) => nonEmptyString(tag, `${directory}.tags[${index}]`));
  assert.match(recipe.author, /^[A-Za-z0-9-]+$/, `${directory}.author must be a GitHub handle`);
  assert.match(recipe.minDaguVersion, /^\d+\.\d+\.\d+$/, `${directory}.minDaguVersion must be semver`);
  assert.ok(Array.isArray(recipe.platforms) && recipe.platforms.length > 0, `${directory}.platforms must not be empty`);
  recipe.platforms.forEach((value) => assert.ok(platforms.has(value), `${directory}: unsupported platform ${value}`));
  assert.ok(Array.isArray(recipe.prerequisites), `${directory}.prerequisites must be an array`);
  recipe.prerequisites.forEach((value, index) => nonEmptyString(value, `${directory}.prerequisites[${index}]`));

  assert.match(workflow, /(^|\n)steps:\s*\n/, `${directory}: workflow.yaml must define steps`);
  assert.doesNotMatch(workflow, /AKIA[0-9A-Z]{16}/, `${directory}: workflow contains an AWS access key`);
  assert.doesNotMatch(workflow, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, `${directory}: workflow contains a private key`);
  assert.doesNotMatch(workflow, /curl[^\n|]*\|\s*(?:ba)?sh\b/i, `${directory}: pipe-to-shell downloads are not allowed`);
  assert.doesNotMatch(workflow, /action:\s+[^\s]+\/(?:[^\s@]+)@(main|master|latest)\b/i, `${directory}: remote actions must use a release`);
  assert.doesNotMatch(workflow, /(?:image|tools):[^\n]*(?::latest|@latest)\b/i, `${directory}: images and tools must be pinned`);

  for (const heading of requiredHeadings) {
    assert.ok(readme.includes(heading), `${directory}: README.md is missing ${heading}`);
  }
}

export async function buildCatalog(base = root) {
  const recipesDir = path.join(base, "recipes");
  const version = (await readFile(path.join(base, ".dagu-version"), "utf8")).trim();
  const directories = (await readdir(recipesDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const recipes = [];
  for (const directory of directories) {
    const current = path.join(recipesDir, directory);
    const [metadata, workflow, readme] = await Promise.all([
      readFile(path.join(current, "recipe.json"), "utf8").then(JSON.parse),
      readFile(path.join(current, "workflow.yaml"), "utf8"),
      readFile(path.join(current, "README.md"), "utf8"),
    ]);
    validateRecipe(metadata, directory, workflow, readme);
    recipes.push({
      ...metadata,
      validatedWith: version,
      workflow,
      readme,
      sourceUrl: `https://github.com/dagucloud/recipes/tree/main/recipes/${directory}`,
    });
  }

  return { schemaVersion: 1, recipes };
}

async function main() {
  const catalogData = await buildCatalog();
  const catalog = `${JSON.stringify(catalogData, null, 2)}\n`;
  if (process.argv.includes("--check")) {
    assert.equal(await readFile(catalogPath, "utf8"), catalog, "catalog.json is stale; run npm run catalog");
    return;
  }
  await writeFile(catalogPath, catalog);
  process.stdout.write(`Wrote ${catalogData.recipes.length} recipes to catalog.json\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
