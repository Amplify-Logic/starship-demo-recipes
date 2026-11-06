import type { Recipe, RecipeInput } from './types';
import { seedRecipes } from './seed';

const STORAGE_KEY = 'recipe-box:recipes';

function readAll(store: Storage): Recipe[] {
  const raw = store.getItem(STORAGE_KEY);
  if (raw === null) {
    writeAll(store, seedRecipes);
    return [...seedRecipes];
  }
  return JSON.parse(raw) as Recipe[];
}

function writeAll(store: Storage, recipes: Recipe[]): void {
  store.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

/** All recipes, newest first. Seeds the store on first use. */
export function listRecipes(store: Storage = localStorage): Recipe[] {
  return readAll(store).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getRecipe(id: string, store: Storage = localStorage): Recipe | undefined {
  return readAll(store).find((recipe) => recipe.id === id);
}

/**
 * Saves a recipe. Without an id it creates a new recipe with a fresh id and
 * created date; with an id it replaces the stored recipe and keeps its
 * original created date.
 */
export function saveRecipe(
  input: RecipeInput,
  id?: string,
  store: Storage = localStorage,
): Recipe {
  const recipes = readAll(store);
  const existing = id ? recipes.find((recipe) => recipe.id === id) : undefined;
  if (id && !existing) throw new Error(`No recipe with id ${id}`);

  const recipe: Recipe = {
    ...input,
    id: existing?.id ?? crypto.randomUUID(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };

  const others = recipes.filter((r) => r.id !== recipe.id);
  writeAll(store, [...others, recipe]);
  return recipe;
}
