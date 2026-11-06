import { describe, expect, it } from 'vitest';
import { getRecipe, listRecipes, saveRecipe } from '../src/storage';
import { seedRecipes } from '../src/seed';
import type { RecipeInput } from '../src/types';
import { memoryStorage } from './memory-storage';

const input: RecipeInput = {
  title: 'Garlic bread',
  description: 'Crisp and buttery.',
  ingredients: ['1 baguette', '60 g butter', '2 garlic cloves'],
  steps: ['Mix butter and garlic.', 'Spread on the bread and bake 10 minutes.'],
  cookingMinutes: 15,
};

describe('storage', () => {
  it('seeds the starter recipes on first use', () => {
    const store = memoryStorage();
    expect(listRecipes(store)).toHaveLength(seedRecipes.length);
    expect(store.length).toBe(1);
  });

  it('lists recipes newest first', () => {
    const dates = listRecipes(memoryStorage()).map((r) => r.createdAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('creates a new recipe with an id and created date', () => {
    const store = memoryStorage();
    const saved = saveRecipe(input, undefined, store);

    expect(saved.id).toBeTruthy();
    expect(Number.isNaN(Date.parse(saved.createdAt))).toBe(false);
    expect(getRecipe(saved.id, store)).toEqual(saved);
    expect(listRecipes(store)).toHaveLength(seedRecipes.length + 1);
  });

  it('updates an existing recipe and keeps its created date', () => {
    const store = memoryStorage();
    const original = saveRecipe(input, undefined, store);
    const updated = saveRecipe({ ...input, title: 'Cheesy garlic bread' }, original.id, store);

    expect(updated.id).toBe(original.id);
    expect(updated.createdAt).toBe(original.createdAt);
    expect(getRecipe(original.id, store)?.title).toBe('Cheesy garlic bread');
    expect(listRecipes(store)).toHaveLength(seedRecipes.length + 1);
  });

  it('refuses to update a recipe that does not exist', () => {
    expect(() => saveRecipe(input, 'missing', memoryStorage())).toThrow();
  });
});
