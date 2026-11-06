import { listRecipes } from '../storage';
import { escapeHtml, formatDate, formatMinutes } from '../format';

export function renderList(app: HTMLElement): void {
  const recipes = listRecipes();
  const cards = recipes
    .map(
      (recipe) => `
      <li class="card">
        <a href="#/recipe/${recipe.id}">
          <h2>${escapeHtml(recipe.title)}</h2>
          <p>${escapeHtml(recipe.description)}</p>
          <p class="meta">
            <span>${formatMinutes(recipe.cookingMinutes)}</span>
            <span>Added ${formatDate(recipe.createdAt)}</span>
          </p>
        </a>
      </li>`,
    )
    .join('');

  app.innerHTML = `
    <h1>All recipes</h1>
    <ul class="recipe-list">${cards}</ul>`;
}
