import { getRecipe, saveRecipe } from '../storage';
import { escapeHtml } from '../format';
import type { RecipeInput } from '../types';

/** Splits a textarea into trimmed, non-empty lines. */
function toLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Turns raw form values into a recipe, or returns a list of problems. */
export function parseRecipeForm(
  values: Record<string, string>,
): { recipe: RecipeInput } | { errors: string[] } {
  const recipe: RecipeInput = {
    title: (values.title ?? '').trim(),
    description: (values.description ?? '').trim(),
    ingredients: toLines(values.ingredients ?? ''),
    steps: toLines(values.steps ?? ''),
    cookingMinutes: Number(values.cookingMinutes),
  };

  const errors: string[] = [];
  if (!recipe.title) errors.push('Give the recipe a title.');
  if (recipe.ingredients.length === 0) errors.push('Add at least one ingredient.');
  if (recipe.steps.length === 0) errors.push('Add at least one step.');
  if (!Number.isInteger(recipe.cookingMinutes) || recipe.cookingMinutes <= 0) {
    errors.push('Cooking time must be a whole number of minutes.');
  }
  return errors.length > 0 ? { errors } : { recipe };
}

export function renderForm(app: HTMLElement, id?: string): void {
  const existing = id ? getRecipe(id) : undefined;
  if (id && !existing) {
    app.innerHTML = `<h1>Recipe not found</h1><p><a href="#/">Back to all recipes</a></p>`;
    return;
  }
  const value = (text: string) => escapeHtml(text);

  app.innerHTML = `
    <h1>${existing ? 'Edit recipe' : 'Add a recipe'}</h1>
    <form class="recipe-form" novalidate>
      <label>Title <input name="title" value="${value(existing?.title ?? '')}" /></label>
      <label>Short description
        <input name="description" value="${value(existing?.description ?? '')}" />
      </label>
      <label>Cooking time (minutes)
        <input name="cookingMinutes" type="number" min="1" value="${existing?.cookingMinutes ?? ''}" />
      </label>
      <label>Ingredients (one per line)
        <textarea name="ingredients" rows="6">${value(existing?.ingredients.join('\n') ?? '')}</textarea>
      </label>
      <label>Steps (one per line)
        <textarea name="steps" rows="6">${value(existing?.steps.join('\n') ?? '')}</textarea>
      </label>
      <ul class="errors" role="alert"></ul>
      <div class="actions">
        <button type="submit" class="button">Save recipe</button>
        <a href="${existing ? `#/recipe/${existing.id}` : '#/'}">Cancel</a>
      </div>
    </form>`;

  const form = app.querySelector('form')!;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const result = parseRecipeForm(values);
    if ('errors' in result) {
      form.querySelector('.errors')!.innerHTML = result.errors
        .map((error) => `<li>${escapeHtml(error)}</li>`)
        .join('');
      return;
    }
    const saved = saveRecipe(result.recipe, existing?.id);
    location.hash = `#/recipe/${saved.id}`;
  });
}
