import { getRecipe } from '../storage';
import { escapeHtml, formatMinutes } from '../format';

export function renderDetail(app: HTMLElement, id: string): void {
  const recipe = getRecipe(id);
  if (!recipe) {
    app.innerHTML = `<h1>Recipe not found</h1><p><a href="#/">Back to all recipes</a></p>`;
    return;
  }

  const items = (lines: string[]) =>
    lines.map((line) => `<li>${escapeHtml(line)}</li>`).join('');

  app.innerHTML = `
    <article class="recipe">
      <p><a href="#/">&larr; All recipes</a></p>
      <h1>${escapeHtml(recipe.title)}</h1>
      <p class="lead">${escapeHtml(recipe.description)}</p>
      <p class="meta"><span>Cooking time: ${formatMinutes(recipe.cookingMinutes)}</span></p>
      <h2>Ingredients</h2>
      <ul>${items(recipe.ingredients)}</ul>
      <h2>Steps</h2>
      <ol>${items(recipe.steps)}</ol>
      <p><a class="button" href="#/recipe/${recipe.id}/edit">Edit recipe</a></p>
    </article>`;
}
