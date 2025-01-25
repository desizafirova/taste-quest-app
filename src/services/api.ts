import { type FetchedRecipesResponse, AnalyzedRecipe } from '../types/recipe';

const URL = 'https://api.spoonacular.com/recipes/';

export async function fetchRecipes(): Promise<FetchedRecipesResponse> {
  const res = await fetch(
    `${URL}complexSearch?apiKey=${import.meta.env.VITE_API_KEY}`
  );
  const data: FetchedRecipesResponse = await res.json();
  return data;
}

export async function fetchRecipe(id: string): Promise<AnalyzedRecipe> {
  const res = await fetch(
    `${URL}${id}/analyzedInstructions?apiKey=${import.meta.env.VITE_API_KEY}`
  );
  const data: AnalyzedRecipe = await res.json();
  console.log(data);

  return data;
}
