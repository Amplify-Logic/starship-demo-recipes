export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookingMinutes: number;
  createdAt: string; // ISO 8601 timestamp
}

/** The fields a person fills in on the recipe form. */
export type RecipeInput = Omit<Recipe, 'id' | 'createdAt'>;
