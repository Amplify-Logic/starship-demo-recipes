import { describe, expect, it } from 'vitest';
import { parseRecipeForm } from '../src/views/form';

describe('parseRecipeForm', () => {
  it('turns form values into a recipe', () => {
    const result = parseRecipeForm({
      title: '  Pesto pasta ',
      description: 'Quick green pasta.',
      ingredients: '200 g pasta\n\n  3 tbsp pesto  \n',
      steps: 'Boil the pasta.\nStir in the pesto.',
      cookingMinutes: '15',
    });

    expect(result).toEqual({
      recipe: {
        title: 'Pesto pasta',
        description: 'Quick green pasta.',
        ingredients: ['200 g pasta', '3 tbsp pesto'],
        steps: ['Boil the pasta.', 'Stir in the pesto.'],
        cookingMinutes: 15,
      },
    });
  });

  it('reports every missing field', () => {
    const result = parseRecipeForm({ title: '', ingredients: '', steps: '', cookingMinutes: '' });
    expect('errors' in result && result.errors).toHaveLength(4);
  });
});
